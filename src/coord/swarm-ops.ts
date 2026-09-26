/**
 * Swarm operations: the fleet board and the turn protocol.
 *
 * The owner's fleet is heterogeneous: Freebuff tabs on the Codex subscription,
 * Freebuff tabs on single NVIDIA or Gemini keys, Freebuff's built-in GLM, AGY,
 * the Codex app and Claude Code. None of these can be pushed to. What they all
 * can do is run a command at the start and end of a turn, so that is the
 * contract: a worker checks in, and the Brain answers with everything waiting
 * for it — unread messages, the next task, and whether the host has room.
 *
 * Rules this module enforces:
 *  - every worker is one agent row, whatever surface hosts it;
 *  - a BYOK key (`resourceKey`) carries exactly one active worker, while a
 *    subscription account may carry many tabs;
 *  - account labels are names, never credentials;
 *  - the board reports who is writing where from what can be observed (leases,
 *    worktree branch and uncommitted files) and never infers liveness.
 */
import { execFileSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireAgent, requireWorkspace } from '../access.ts'
import { claimNextTask, ensureQueueSchema } from '../queue.ts'
import { coordEvents } from './events.ts'
import { ensureInboxSchema, sendMessage } from './inbox.ts'
import { listActiveLeases } from './leases.ts'
import { ensureCoordSchema, getAgentPresence } from './registry.ts'
import type { InboxMessage, PresenceState } from './types.ts'
import {
  admitWork, assertNotCredential, hostSnapshot, listQuotas,
  type Admission, type HostSnapshot,
} from './resources.ts'

export type WorkerSurface = 'freebuff' | 'agy' | 'codex-app' | 'claude-code' | 'native' | 'other'
export const WORKER_SURFACES: readonly WorkerSurface[] = ['freebuff', 'agy', 'codex-app', 'claude-code', 'native', 'other']

export type TurnState =
  | 'working' | 'needs-task' | 'awaiting-commit' | 'commit-approved' | 'blocked' | 'paused' | 'offline'
export type TurnEndState = 'needs-task' | 'awaiting-commit' | 'blocked' | 'paused'
export const TURN_END_STATES: readonly TurnEndState[] = ['needs-task', 'awaiting-commit', 'blocked', 'paused']

export type AttentionFlag = 'awaiting-commit' | 'needs-task' | 'blocked' | 'quota-exhausted' | 'stale-turn'

const DEFAULT_STALE_TURN_MS = 30 * 60_000
const MAX_SUMMARY = 2000

export function ensureSwarmOpsSchema(db: DatabaseSync): void {
  ensureCoordSchema(db)
  const columns = db.prepare('PRAGMA table_info(agents)').all() as unknown as Array<{ name: string }>
  const has = (name: string) => columns.some(column => column.name === name)
  if (!has('surface')) db.exec('ALTER TABLE agents ADD COLUMN surface TEXT')
  if (!has('account')) db.exec('ALTER TABLE agents ADD COLUMN account TEXT')
  if (!has('resource_key')) db.exec('ALTER TABLE agents ADD COLUMN resource_key TEXT')
  if (!has('turn_state')) db.exec('ALTER TABLE agents ADD COLUMN turn_state TEXT')
  if (!has('turn_state_at')) db.exec('ALTER TABLE agents ADD COLUMN turn_state_at TEXT')
  if (!has('turn_summary')) db.exec('ALTER TABLE agents ADD COLUMN turn_summary TEXT')
  if (!has('worktrees')) db.exec('ALTER TABLE agents ADD COLUMN worktrees TEXT')
  if (!has('retired_at')) db.exec('ALTER TABLE agents ADD COLUMN retired_at TEXT')
  ensureInboxSchema(db)
  ensureQueueSchema(db)
}

function ensureTurnHistorySchema(db: DatabaseSync): void {
  db.exec(`CREATE TABLE IF NOT EXISTS swarm_turn_history (
    id TEXT PRIMARY KEY,
    workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    task_id TEXT,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    end_state TEXT,
    summary TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_swarm_turn_history_workspace ON swarm_turn_history(workspace_id, started_at);`)
}

interface ProfileRow {
  id: string
  model: string | null
  surface: string | null
  account: string | null
  resource_key: string | null
  turn_state: string | null
  turn_state_at: string | null
  turn_summary: string | null
  worktrees: string | null
  retired_at: string | null
}

export interface WorkerProfile {
  agentId: string
  surface: WorkerSurface | null
  account: string | null
  resourceKey: string | null
  model: string | null
  worktrees: string[]
  turnState: TurnState | null
  retired: boolean
}

const parseWorktrees = (raw: string | null): string[] => {
  if (raw === null || raw === '') return []
  try {
    const value = JSON.parse(raw) as unknown
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch { return [] }
}

const profileOf = (row: ProfileRow): WorkerProfile => ({
  agentId: row.id,
  surface: row.surface as WorkerSurface | null,
  account: row.account,
  resourceKey: row.resource_key,
  model: row.model,
  worktrees: parseWorktrees(row.worktrees),
  turnState: row.turn_state as TurnState | null,
  retired: row.retired_at !== null,
})

const loadProfile = (db: DatabaseSync, agentId: string): ProfileRow =>
  db.prepare(`SELECT id, model, surface, account, resource_key, turn_state, turn_state_at, turn_summary, worktrees, retired_at
                FROM agents WHERE id = ?`).get(agentId) as unknown as ProfileRow

export interface RegisterWorkerInput {
  agentId: string
  surface: WorkerSurface
  /** A name for the account the worker spends, e.g. `owner:chatgpt` or `nvidia:key-01`. */
  account: string
  /** An exclusive resource such as one BYOK key. At most one active worker carries it. */
  resourceKey?: string
  model?: string
  worktrees?: string[]
  /** Move the resource key from its current holder, which is retired. */
  takeover?: boolean
}

/** Bind a registered agent to its surface, account, key and worktrees. */
export function registerWorkerProfile(db: DatabaseSync, input: RegisterWorkerInput): WorkerProfile {
  ensureSwarmOpsSchema(db)
  requireAgent(db, input.agentId)
  if (!WORKER_SURFACES.includes(input.surface)) throw new AccessDenied(`unknown surface: ${String(input.surface)}`)

  const account = input.account.trim()
  if (account === '' || account.length > 80) throw new AccessDenied('a worker needs an account label of at most 80 characters')
  assertNotCredential('account', account)

  const resourceKey = input.resourceKey === undefined ? null : input.resourceKey.trim().toLowerCase()
  if (resourceKey !== null) {
    if (resourceKey === '' || resourceKey.length > 80) throw new AccessDenied('a resource key needs 1 to 80 characters')
    assertNotCredential('resourceKey', resourceKey)
  }
  const worktrees = (input.worktrees ?? []).map(path => resolve(path))
  const now = new Date().toISOString()
  db.exec('BEGIN IMMEDIATE')
  try {
    if (resourceKey !== null) {
      const holder = db.prepare(
        'SELECT id FROM agents WHERE resource_key = ? AND id <> ? AND retired_at IS NULL',
      ).get(resourceKey, input.agentId) as { id: string } | undefined
      if (holder !== undefined) {
        if (input.takeover !== true) {
          throw new AccessDenied(`${resourceKey} is already carried by ${holder.id}; one key, one worker (use takeover to move it)`)
        }
        db.prepare(`UPDATE agents SET resource_key = NULL, retired_at = ?, turn_state = 'offline', turn_state_at = ? WHERE id = ?`)
          .run(now, now, holder.id)
        coordEvents.emitLive('agent.retired', { agentId: holder.id, resourceKey, by: input.agentId })
      }
    }
    db.prepare(`
      UPDATE agents
         SET surface = ?, account = ?, resource_key = ?, model = COALESCE(?, model),
             worktrees = ?, retired_at = NULL, last_seen = ?
       WHERE id = ?
    `).run(input.surface, account, resourceKey, input.model ?? null, JSON.stringify(worktrees), now, input.agentId)
    db.exec('COMMIT')
  } catch (error: unknown) {
    db.exec('ROLLBACK')
    throw error
  }

  const profile = profileOf(loadProfile(db, input.agentId))
  coordEvents.emitLive('agent.profile', profile)
  return profile
}

/**
 * Take a worker off the fleet: it keeps its history and identity, frees its
 * resource key, and no longer counts as a worker on the board.
 */
export function retireWorker(db: DatabaseSync, input: { agentId: string; reason: string }): WorkerProfile {
  ensureSwarmOpsSchema(db)
  requireAgent(db, input.agentId)
  const reason = input.reason.trim().slice(0, MAX_SUMMARY)
  if (reason === '') throw new AccessDenied('retiring a worker needs a reason')
  assertNotCredential('reason', reason)
  const now = new Date().toISOString()
  db.prepare(`
    UPDATE agents
       SET retired_at = ?, resource_key = NULL, turn_state = 'offline', turn_state_at = ?, turn_summary = ?
     WHERE id = ?
  `).run(now, now, `retired: ${reason}`, input.agentId)
  coordEvents.emitLive('agent.retired', { agentId: input.agentId, reason })
  return profileOf(loadProfile(db, input.agentId))
}

// ---------------------------------------------------------------------------
// Turn protocol
// ---------------------------------------------------------------------------

export interface TurnInput {
  workspaceId: string
  agentId: string
  phase: 'start' | 'end'
  /** Required meaning for `end`; ignored for `start`, which always means working. */
  state?: TurnEndState
  summary?: string
  /** Claim the next task this worker may take, atomically. */
  claimNext?: boolean
}

export interface QueueTaskRef { id: string; title: string; body: string }

export interface TurnPing {
  agentId: string
  state: TurnState
  /** Unread messages. They keep pinging until acknowledged. */
  inbox: InboxMessage[]
  /** The task this worker could claim next; offered, never taken implicitly. */
  nextTask: QueueTaskRef | null
  /** The task claimed during this call, when `claimNext` was set. */
  claimedTask: QueueTaskRef | null
  /** The task this worker currently holds, if any. */
  currentTask: QueueTaskRef | null
  admission: Admission[]
}

interface InboxRow {
  id: string; workspace_id: string; from_agent: string; to_agent: string | null; channel: string | null
  subject: string; body: string; created_at: string; delivered_at: string | null; read_at: string | null
}

function unreadInbox(db: DatabaseSync, workspaceId: string, agentId: string): InboxMessage[] {
  const rows = db.prepare(`
    SELECT * FROM inbox_messages
     WHERE workspace_id = ? AND (to_agent = ? OR to_agent IS NULL) AND read_at IS NULL
     ORDER BY created_at ASC
  `).all(workspaceId, agentId) as unknown as InboxRow[]
  const now = new Date().toISOString()
  return rows.map(row => {
    if (row.delivered_at === null) {
      db.prepare('UPDATE inbox_messages SET delivered_at = ? WHERE id = ?').run(now, row.id)
      row.delivered_at = now
      coordEvents.emitLive('message.delivered', { messageId: row.id, agentId, deliveredAt: now })
    }
    return {
      id: row.id, workspaceId: row.workspace_id, fromAgent: row.from_agent, toAgent: row.to_agent,
      channel: row.channel, subject: row.subject, body: row.body,
      createdAt: row.created_at, deliveredAt: row.delivered_at, readAt: row.read_at,
    }
  })
}

const taskRef = (row: { id: string; title: string; body: string } | undefined): QueueTaskRef | null =>
  row === undefined ? null : { id: row.id, title: row.title, body: row.body }

function nextTaskFor(db: DatabaseSync, workspaceId: string, agentId: string): QueueTaskRef | null {
  return taskRef(db.prepare(`
    SELECT id, title, body FROM queue_tasks
     WHERE workspace_id = ? AND state = 'pending' AND (addressed_to IS NULL OR addressed_to = ?)
     ORDER BY created_at ASC, rowid ASC LIMIT 1
  `).get(workspaceId, agentId) as { id: string; title: string; body: string } | undefined)
}

function currentTaskOf(db: DatabaseSync, workspaceId: string, agentId: string): QueueTaskRef | null {
  return taskRef(db.prepare(`
    SELECT id, title, body FROM queue_tasks
     WHERE workspace_id = ? AND state = 'claimed' AND claimed_by = ?
     ORDER BY claimed_at DESC LIMIT 1
  `).get(workspaceId, agentId) as { id: string; title: string; body: string } | undefined)
}

/**
 * Check a worker in at a turn boundary and return what is waiting for it.
 *
 * `start` marks the worker working. `end` records why it stopped: it needs a
 * task, it waits for the integrator's commit approval, it is blocked, or it is
 * paused. Either way the answer is the ping — the worker cannot be pushed to,
 * so this is the moment it learns about new input.
 */
export function recordTurn(db: DatabaseSync, input: TurnInput, options: { host?: HostSnapshot } = {}): TurnPing {
  ensureSwarmOpsSchema(db)
  requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.agentId)
  const profile = loadProfile(db, input.agentId)
  if (profile.retired_at !== null) throw new AccessDenied(`${input.agentId} is retired; register it again to resume`)

  let state: TurnState
  if (input.phase === 'start') {
    state = 'working'
  } else {
    const wanted = input.state ?? 'needs-task'
    if (!TURN_END_STATES.includes(wanted)) throw new AccessDenied(`unknown turn end state: ${String(wanted)}`)
    state = wanted
  }
  const summary = input.summary === undefined ? null : input.summary.slice(0, MAX_SUMMARY)
  if (summary !== null) assertNotCredential('summary', summary)

  const now = new Date().toISOString()
  const previous = db.prepare('SELECT turn_state, turn_summary FROM agents WHERE id = ?').get(input.agentId) as
    { turn_state: string | null; turn_summary: string | null } | undefined
  db.prepare(`
    UPDATE agents
       SET turn_state = ?, turn_state_at = ?, turn_summary = COALESCE(?, turn_summary),
           last_heartbeat = ?, last_seen = ?
     WHERE id = ?
  `).run(state, now, summary, now, now, input.agentId)

  let claimedTask: QueueTaskRef | null = null
  if (input.claimNext === true) {
    const claimed = claimNextTask(db, input.workspaceId, input.agentId)
    if (claimed !== null) {
      claimedTask = { id: claimed.id, title: claimed.title, body: claimed.body }
      db.prepare('UPDATE agents SET task_id = ? WHERE id = ?').run(claimed.id, input.agentId)
    }
  }

  if (input.phase === 'start') {
    ensureTurnHistorySchema(db)
    const task = currentTaskOf(db, input.workspaceId, input.agentId)
    db.prepare(`INSERT INTO swarm_turn_history (id, workspace_id, agent_id, task_id, started_at)
      VALUES (?, ?, ?, ?, ?)`)
      .run(`turn-${randomUUID().slice(0, 12)}`, input.workspaceId, input.agentId, task?.id ?? null, now)
  } else {
    ensureTurnHistorySchema(db)
    db.prepare(`UPDATE swarm_turn_history SET ended_at = ?, end_state = ?, summary = ?
      WHERE id = (SELECT id FROM swarm_turn_history
        WHERE workspace_id = ? AND agent_id = ? AND ended_at IS NULL
        ORDER BY started_at DESC LIMIT 1)`)
      .run(now, state, summary, input.workspaceId, input.agentId)
  }

  const host = options.host ?? hostSnapshot()
  const ping: TurnPing = {
    agentId: input.agentId,
    state,
    inbox: unreadInbox(db, input.workspaceId, input.agentId),
    nextTask: claimedTask === null ? nextTaskFor(db, input.workspaceId, input.agentId) : null,
    claimedTask,
    currentTask: currentTaskOf(db, input.workspaceId, input.agentId),
    admission: (['test', 'build', 'worktree'] as const).map(kind => admitWork(kind, host)),
  }
  coordEvents.emitLive('agent.turn', {
    agentId: input.agentId,
    phase: input.phase,
    previousState: previous?.turn_state ?? null,
    state,
    summary: summary ?? (input.phase === 'end' ? previous?.turn_summary : null) ?? null,
    at: now,
  })
  return ping
}

/** The integrator approves a worker's pending commit. The approval reaches it as a message. */
export function approveCommit(
  db: DatabaseSync,
  input: { workspaceId: string; agentId: string; by: string; note?: string },
): InboxMessage {
  ensureSwarmOpsSchema(db)
  requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.agentId)
  requireAgent(db, input.by)
  const profile = loadProfile(db, input.agentId)
  if (profile.turn_state !== 'awaiting-commit') {
    throw new AccessDenied(`${input.agentId} is not awaiting a commit (state: ${profile.turn_state ?? 'unknown'})`)
  }
  const message = sendMessage(db, {
    workspaceId: input.workspaceId,
    fromAgent: input.by,
    toAgent: input.agentId,
    subject: 'Commit freigegeben',
    body: input.note ?? 'Commit freigegeben: jetzt committen, dann den Turn mit needs-task beenden.',
  })
  const now = new Date().toISOString()
  db.prepare(`UPDATE agents SET turn_state = 'commit-approved', turn_state_at = ? WHERE id = ?`).run(now, input.agentId)
  coordEvents.emitLive('agent.commit.approved', { agentId: input.agentId, by: input.by, at: now })
  return message
}

// ---------------------------------------------------------------------------
// The board
// ---------------------------------------------------------------------------

export interface WorktreeState {
  path: string
  branch: string | null
  head: string | null
  dirtyFiles: number | null
  lastCommitAt: string | null
  error: string | null
}

export interface BoardRow {
  id: string
  name: string
  color: string
  surface: WorkerSurface | null
  account: string | null
  resourceKey: string | null
  model: string | null
  presence: PresenceState
  lastHeartbeat: string | null
  turnState: TurnState | null
  turnStateAt: string | null
  turnSummary: string | null
  retired: boolean
  unread: number
  task: QueueTaskRef | null
  leases: Array<{ id: string; paths: string[]; symbols: string[]; mode: 'write' | 'read'; expiresAt: string }>
  worktrees: WorktreeState[]
  attention: AttentionFlag[]
}

export interface BoardOptions {
  host?: HostSnapshot
  /** Read branch, HEAD and uncommitted files of every registered worktree. */
  gitStatus?: boolean
  staleTurnMs?: number
}

export interface SwarmBoard {
  workspaceId: string
  measuredAt: string
  agents: BoardRow[]
  /** Worktrees registered by more than one active worker. */
  overlaps: Array<{ worktree: string; agents: string[] }>
  host: HostSnapshot
  admission: Admission[]
}

const normalizePath = (path: string): string => resolve(path).replace(/[\\/]+$/, '').toLowerCase()

function git(cwd: string, args: string[]): string {
  return execFileSync('git', ['-C', cwd, ...args], { encoding: 'utf8', timeout: 5000, windowsHide: true }).trim()
}

function worktreeState(path: string, readGit: boolean): WorktreeState {
  if (!readGit) return { path, branch: null, head: null, dirtyFiles: null, lastCommitAt: null, error: null }
  try {
    const status = git(path, ['status', '--porcelain'])
    return {
      path,
      branch: git(path, ['rev-parse', '--abbrev-ref', 'HEAD']),
      head: git(path, ['rev-parse', '--short', 'HEAD']),
      dirtyFiles: status === '' ? 0 : status.split('\n').length,
      lastCommitAt: git(path, ['log', '-1', '--format=%cI']) || null,
      error: null,
    }
  } catch (error: unknown) {
    const detail = error instanceof Error ? (error.message.split('\n')[0] ?? error.message) : String(error)
    return { path, branch: null, head: null, dirtyFiles: null, lastCommitAt: null, error: detail }
  }
}

/** One row per worker: identity, account, turn, what it holds, and where it writes. */
export function agentsBoard(db: DatabaseSync, workspaceId: string, options: BoardOptions = {}): SwarmBoard {
  ensureSwarmOpsSchema(db)
  requireWorkspace(db, workspaceId)
  const host = options.host ?? hostSnapshot()
  const staleTurnMs = options.staleTurnMs ?? DEFAULT_STALE_TURN_MS
  const now = Date.now()
  const exhausted = new Set(listQuotas(db).filter(quota => quota.exhausted).map(quota => quota.account))
  const leases = listActiveLeases(db, workspaceId)

  const agents: BoardRow[] = getAgentPresence(db, { workspaceId }).map(presence => {
    const profile = loadProfile(db, presence.id)
    const retired = profile.retired_at !== null
    const turnState = profile.turn_state as TurnState | null
    const unread = (db.prepare(`
      SELECT COUNT(*) AS n FROM inbox_messages
       WHERE workspace_id = ? AND (to_agent = ? OR to_agent IS NULL) AND read_at IS NULL
    `).get(workspaceId, presence.id) as { n: number }).n

    const attention: AttentionFlag[] = []
    if (!retired) {
      if (turnState === 'awaiting-commit') attention.push('awaiting-commit')
      if (turnState === 'needs-task') attention.push('needs-task')
      if (turnState === 'blocked') attention.push('blocked')
      if (profile.account !== null && exhausted.has(profile.account)) attention.push('quota-exhausted')
      const at = profile.turn_state_at === null ? Number.NaN : Date.parse(profile.turn_state_at)
      if (turnState === 'working' && Number.isFinite(at) && now - at > staleTurnMs) attention.push('stale-turn')
    }

    return {
      id: presence.id,
      name: presence.name,
      color: presence.color,
      surface: profile.surface as WorkerSurface | null,
      account: profile.account,
      resourceKey: profile.resource_key,
      model: profile.model,
      presence: presence.presence,
      lastHeartbeat: presence.lastHeartbeat,
      turnState,
      turnStateAt: profile.turn_state_at,
      turnSummary: profile.turn_summary,
      retired,
      unread: Number(unread),
      task: currentTaskOf(db, workspaceId, presence.id),
      leases: leases.filter(lease => lease.agentId === presence.id).map(lease => ({
        id: lease.id, taskId: lease.taskId, paths: lease.paths, symbols: lease.symbols,
        mode: lease.mode, createdAt: lease.createdAt, expiresAt: lease.expiresAt,
      })),
      worktrees: parseWorktrees(profile.worktrees).map(path => worktreeState(path, options.gitStatus === true)),
      attention,
    }
  })

  const byWorktree = new Map<string, { worktree: string; agents: string[] }>()
  for (const row of agents) {
    if (row.retired) continue
    for (const worktree of row.worktrees) {
      const key = normalizePath(worktree.path)
      const entry = byWorktree.get(key) ?? { worktree: worktree.path, agents: [] }
      if (!entry.agents.includes(row.id)) entry.agents.push(row.id)
      byWorktree.set(key, entry)
    }
  }
  const overlaps = [...byWorktree.values()].filter(entry => entry.agents.length > 1)

  return {
    workspaceId,
    measuredAt: new Date().toISOString(),
    agents,
    overlaps,
    host,
    admission: (['test', 'build', 'worktree'] as const).map(kind => admitWork(kind, host)),
  }
}
