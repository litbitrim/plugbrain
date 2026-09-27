/**
 * The watchdog: who went quiet, and where a finished turn goes next.
 *
 * Two failures of 26.09.2026 are the reason this module exists. First, nv03
 * hung in an output loop and nv04 never got an answer again; both sat on the
 * board as `working` for hours, because a single worker heartbeat is valid for
 * six hours and nothing else asked whether a `working` worker had been in
 * touch since. Second, when a worker ended with `awaiting-commit`, the
 * integrator had to hand-place the review (R-BR3, INT-R6) and nudge the
 * reviewer — the Brain could queue work but not route it.
 *
 * So the reading here is deliberately about *observed contact*, not about
 * liveness: a worker is `still` when it has been `working` for longer than a
 * per-workspace threshold (default 45 minutes) and has not touched the Brain
 * since — claim, release, ack, message, quota, delivery, or the turn itself.
 * The Brain never declares a worker dead; it says how long the room has been
 * silent and tells the integrator once per case.
 *
 * Alongside that sits the reviewer pool: a per-workspace, ordered list of
 * reviewers, and a switch (off by default) that turns a finished turn into a
 * review task only when registered account and model family both differ.
 * Neither a distinct account nor a distinct model label alone proves an
 * independent review.
 */
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireAgent, requireWorkspace } from '../access.ts'
import { enqueueTask } from '../queue.ts'
import { syncDependencies } from './dependencies.ts'
import { coordEvents } from './events.ts'
import { ensureSystemAgent } from './inbox.ts'
import { handleFleetAutomationEvent } from './fleet-automation.ts'
import { resolveReviewIndependence } from './model-family.ts'

export const DEFAULT_SILENT_AFTER_MINUTES = 45

const SCHEMA = `
CREATE TABLE IF NOT EXISTS watchdog_settings (
  workspace_id         TEXT PRIMARY KEY,
  silent_after_minutes INTEGER NOT NULL DEFAULT ${DEFAULT_SILENT_AFTER_MINUTES},
  review_auto          INTEGER NOT NULL DEFAULT 0,
  updated_at           TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS review_pool (
  workspace_id TEXT NOT NULL,
  agent_id     TEXT NOT NULL,
  position     INTEGER NOT NULL,
  PRIMARY KEY (workspace_id, agent_id)
);
CREATE TABLE IF NOT EXISTS review_routes (
  workspace_id   TEXT NOT NULL,
  author_id      TEXT NOT NULL,
  source_task_id TEXT NOT NULL DEFAULT '',
  reviewer_id    TEXT NOT NULL,
  task_id        TEXT NOT NULL,
  created_at     TEXT NOT NULL,
  PRIMARY KEY (workspace_id, author_id, source_task_id)
);
`

/** Add the observations the watchdog needs to the agents table. */
export function ensureWatchdogSchema(db: DatabaseSync): void {
  db.exec(SCHEMA)
  const columns = db.prepare('PRAGMA table_info(agents)').all() as unknown as Array<{ name: string }>
  const has = (name: string) => columns.some(column => column.name === name)
  if (!has('last_contact_at')) db.exec('ALTER TABLE agents ADD COLUMN last_contact_at TEXT')
  if (!has('silence_alerted_at')) db.exec('ALTER TABLE agents ADD COLUMN silence_alerted_at TEXT')
}

/**
 * Record that an agent touched the Brain just now.
 *
 * This is what makes the still-reading meaningful: `turn_state_at` alone says
 * when a turn *started*, so a worker that claimed a path or acknowledged a
 * message in between was still reported as quiet. Every CLI operation that
 * stands for "the process is alive" calls this. It is metadata, never a
 * liveness proof — nothing here reaps a worker.
 */
export function touchAgentContact(db: DatabaseSync, agentId: string, at: Date = new Date()): void {
  ensureWatchdogSchema(db)
  const row = db.prepare('SELECT id FROM agents WHERE id = ?').get(agentId) as { id: string } | undefined
  if (row === undefined) return
  const nowIso = at.toISOString()
  db.prepare(`UPDATE agents SET last_contact_at = ?
               WHERE id = ? AND (last_contact_at IS NULL OR last_contact_at < ?)`)
    .run(nowIso, agentId, nowIso)
}

// ---------------------------------------------------------------------------
// Per-workspace settings and the reviewer pool
// ---------------------------------------------------------------------------

export interface WatchdogSettings {
  workspaceId: string
  silentAfterMinutes: number
  reviewAuto: boolean
}

interface SettingsRow {
  workspace_id: string
  silent_after_minutes: number
  review_auto: number
  updated_at: string
}

export function watchdogSettings(db: DatabaseSync, workspaceId: string): WatchdogSettings {
  ensureWatchdogSchema(db)
  requireWorkspace(db, workspaceId)
  const row = db.prepare('SELECT * FROM watchdog_settings WHERE workspace_id = ?').get(workspaceId) as unknown as SettingsRow | undefined
  return {
    workspaceId,
    silentAfterMinutes: row?.silent_after_minutes ?? DEFAULT_SILENT_AFTER_MINUTES,
    reviewAuto: (row?.review_auto ?? 0) !== 0,
  }
}

function writeSettings(db: DatabaseSync, workspaceId: string, patch: { silentAfterMinutes?: number; reviewAuto?: boolean }): WatchdogSettings {
  const current = watchdogSettings(db, workspaceId)
  const silentAfterMinutes = patch.silentAfterMinutes ?? current.silentAfterMinutes
  const reviewAuto = patch.reviewAuto ?? current.reviewAuto
  db.prepare(`INSERT INTO watchdog_settings (workspace_id, silent_after_minutes, review_auto, updated_at)
              VALUES (?, ?, ?, ?)
              ON CONFLICT(workspace_id) DO UPDATE SET
                silent_after_minutes = excluded.silent_after_minutes,
                review_auto = excluded.review_auto,
                updated_at = excluded.updated_at`)
    .run(workspaceId, silentAfterMinutes, reviewAuto ? 1 : 0, new Date().toISOString())
  return { workspaceId, silentAfterMinutes, reviewAuto }
}

/** How long a `working` worker may go without Brain contact before it is called still. */
export function setSilentAfterMinutes(db: DatabaseSync, workspaceId: string, minutes: number): WatchdogSettings {
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 24 * 60) {
    throw new AccessDenied('silent-after must be a whole number of minutes between 1 and 1440')
  }
  return writeSettings(db, workspaceId, { silentAfterMinutes: minutes })
}

export interface ReviewPoolEntry { agentId: string; account: string | null; retired: boolean }

interface PoolRow { agent_id: string; position: number; account: string | null; retired_at: string | null }

export function readReviewPool(db: DatabaseSync, workspaceId: string): ReviewPoolEntry[] {
  ensureWatchdogSchema(db)
  requireWorkspace(db, workspaceId)
  const rows = db.prepare(`
    SELECT p.agent_id, p.position, a.account, a.retired_at
      FROM review_pool p LEFT JOIN agents a ON a.id = p.agent_id
     WHERE p.workspace_id = ? ORDER BY p.position ASC
  `).all(workspaceId) as unknown as PoolRow[]
  return rows.map(row => ({ agentId: row.agent_id, account: row.account, retired: row.retired_at !== null }))
}

/** Replace the workspace's reviewer list, in the order given. */
export function setReviewPool(db: DatabaseSync, workspaceId: string, agentIds: string[]): ReviewPoolEntry[] {
  ensureWatchdogSchema(db)
  requireWorkspace(db, workspaceId)
  const unique = [...new Set(agentIds.map(id => id.trim()).filter(id => id !== ''))]
  for (const agentId of unique) requireAgent(db, agentId)
  db.exec('BEGIN IMMEDIATE')
  try {
    db.prepare('DELETE FROM review_pool WHERE workspace_id = ?').run(workspaceId)
    unique.forEach((agentId, position) => {
      db.prepare('INSERT INTO review_pool (workspace_id, agent_id, position) VALUES (?, ?, ?)')
        .run(workspaceId, agentId, position)
    })
    db.exec('COMMIT')
  } catch (error: unknown) {
    db.exec('ROLLBACK')
    throw error
  }
  coordEvents.emitLive('review.pool.set', { workspaceId, reviewers: unique })
  return readReviewPool(db, workspaceId)
}

/** Turn the automatic review routing on or off. Off is the default. */
export function setReviewAuto(db: DatabaseSync, workspaceId: string, on: boolean): WatchdogSettings {
  const settings = writeSettings(db, workspaceId, { reviewAuto: on })
  coordEvents.emitLive('review.auto', { workspaceId, on })
  return settings
}

// ---------------------------------------------------------------------------
// Still-Erkennung (the silence reading)
// ---------------------------------------------------------------------------

export interface SilenceReading {
  agentId: string
  account: string | null
  /** Whole minutes since the last observed Brain contact in this working turn. */
  minutes: number
  workingSince: string
  lastContactAt: string | null
  /** When the integrator was last told about this case, if ever. */
  alertedAt: string | null
}

interface SilenceRow {
  id: string
  account: string | null
  turn_state_at: string | null
  last_contact_at: string | null
  silence_alerted_at: string | null
}

/**
 * How many silent minutes a `working` agent has, or null while it is not still.
 *
 * Pure on purpose: the board and the scan answer the same question with the
 * same arithmetic, and a test can move the clock by passing `now` instead of
 * waiting 45 real minutes.
 */
export function silenceMinutesFor(
  now: Date,
  turnStateAt: string | null,
  lastContactAt: string | null,
  silentAfterMinutes: number,
): number | null {
  if (turnStateAt === null) return null
  const startedAt = Date.parse(turnStateAt)
  if (!Number.isFinite(startedAt)) return null
  const contactAt = lastContactAt === null ? Number.NEGATIVE_INFINITY : Date.parse(lastContactAt)
  const lastActivity = Number.isFinite(contactAt) ? Math.max(startedAt, contactAt) : startedAt
  const elapsedMs = now.getTime() - lastActivity
  if (elapsedMs <= silentAfterMinutes * 60_000) return null
  return Math.floor(elapsedMs / 60_000)
}

/** Every agent of the workspace that is `working` and quiet past the threshold. */
export function silentWorkers(
  db: DatabaseSync,
  workspaceId: string,
  options: { now?: Date; silentAfterMinutes?: number } = {},
): SilenceReading[] {
  ensureWatchdogSchema(db)
  requireWorkspace(db, workspaceId)
  const now = options.now ?? new Date()
  const threshold = options.silentAfterMinutes ?? watchdogSettings(db, workspaceId).silentAfterMinutes
  const rows = db.prepare(`
    SELECT id, account, turn_state_at, last_contact_at, silence_alerted_at
      FROM agents
     WHERE workspace_id = ? AND retired_at IS NULL AND turn_state = 'working' AND turn_state_at IS NOT NULL
     ORDER BY turn_state_at ASC
  `).all(workspaceId) as unknown as SilenceRow[]

  const readings: SilenceReading[] = []
  for (const row of rows) {
    const minutes = silenceMinutesFor(now, row.turn_state_at, row.last_contact_at, threshold)
    if (minutes === null) continue
    readings.push({
      agentId: row.id,
      account: row.account,
      minutes,
      workingSince: row.turn_state_at as string,
      lastContactAt: row.last_contact_at,
      alertedAt: row.silence_alerted_at,
    })
  }
  return readings
}

/**
 * Is this case still unannounced?
 *
 * A case is one working turn with no contact. Any contact after the previous
 * alert, or a new turn start, opens a new case — so a worker that came back and
 * went quiet again is reported again, while a worker that stays quiet is
 * reported exactly once.
 */
function caseIsUnannounced(reading: SilenceReading): boolean {
  if (reading.alertedAt === null) return true
  const alerted = Date.parse(reading.alertedAt)
  if (!Number.isFinite(alerted)) return true
  const started = Date.parse(reading.workingSince)
  const contact = reading.lastContactAt === null ? Number.NEGATIVE_INFINITY : Date.parse(reading.lastContactAt)
  const lastActivity = Number.isFinite(contact) ? Math.max(started, contact) : started
  return lastActivity > alerted
}

export interface WatchdogReport {
  workspaceId: string
  measuredAt: string
  silentAfterMinutes: number
  silent: Array<SilenceReading & { alerted: boolean }>
  /** Agents the integrator was told about in this scan. */
  alerted: string[]
  /** Waiting tasks this scan released because their predecessor had arrived. */
  released: string[]
}

/**
 * One watchdog cycle: read who is still, tell the integrator once per case,
 * and reconcile dependencies that a missed event left waiting.
 *
 * The alert is a message, not a state change: the Brain still does not touch
 * another agent's turn. The integrator decides what to do with a quiet tab.
 */
export function scanWatchdog(
  db: DatabaseSync,
  workspaceId: string,
  options: { now?: Date; alert?: boolean } = {},
): WatchdogReport {
  const now = options.now ?? new Date()
  const settings = watchdogSettings(db, workspaceId)
  const silent = silentWorkers(db, workspaceId, { now, silentAfterMinutes: settings.silentAfterMinutes })
  const alerted: string[] = []

  if (options.alert !== false) {
    for (const reading of silent) {
      if (!caseIsUnannounced(reading)) continue
      db.exec('BEGIN IMMEDIATE')
      try {
        const current = silentWorkers(db, workspaceId, { now, silentAfterMinutes: settings.silentAfterMinutes })
          .find(item => item.agentId === reading.agentId)
        if (current === undefined || !caseIsUnannounced(current)) { db.exec('COMMIT'); continue }
        db.exec('COMMIT')
      } catch (error: unknown) {
        db.exec('ROLLBACK')
        throw error
      }
      const heldTask = db.prepare(`SELECT id FROM queue_tasks
        WHERE workspace_id = ? AND claimed_by = ? AND state = 'claimed'
        ORDER BY claimed_at DESC LIMIT 1`).get(workspaceId, reading.agentId) as { id: string } | undefined
      const event = coordEvents.emitLive('watchdog.silent', {
        workspaceId, agentId: reading.agentId, minutes: reading.minutes,
        workingSince: reading.workingSince, lastContactAt: reading.lastContactAt,
        heldTaskId: heldTask?.id ?? null, at: now.toISOString(),
      })
      const automation = handleFleetAutomationEvent(db, workspaceId, event)
      if (automation.action === 'lead-decision-required') {
        alerted.push(reading.agentId)
      }
    }
  }

  const released = syncDependencies(db, workspaceId, { now })
  return {
    workspaceId,
    measuredAt: now.toISOString(),
    silentAfterMinutes: settings.silentAfterMinutes,
    silent: silent.map(reading => ({ ...reading, alerted: alerted.includes(reading.agentId) })),
    alerted,
    released,
  }
}

// ---------------------------------------------------------------------------
// Review routing
// ---------------------------------------------------------------------------

export interface ReviewRoute {
  routed: boolean
  reason: string
  reviewer?: string
  taskId?: string
}

interface AuthorTaskRow {
  id: string
  title: string
  state: string
  delivered_path: string | null
}

/**
 * Queue a review for a turn that ended with `awaiting-commit`.
 *
 * Only when the workspace has switched this on. The reviewer is the first
 * pool entry that is not the author, not retired, has a different known
 * account, and has current registered model metadata resolving to a different
 * family. Unknown, stale, or same-family metadata is skipped.
 *
 * One review per author and source task: ending the same turn again (or the
 * integrator reopening it) must not pile up duplicate review tasks.
 */
export function routeReviewForAuthor(
  db: DatabaseSync,
  workspaceId: string,
  authorId: string,
  options: { now?: Date } = {},
): ReviewRoute {
  const now = options.now ?? new Date()
  const settings = watchdogSettings(db, workspaceId)
  if (!settings.reviewAuto) return { routed: false, reason: 'review routing is off' }
  requireAgent(db, authorId)

  const author = db.prepare('SELECT account, worktrees FROM agents WHERE id = ?').get(authorId) as
    { account: string | null; worktrees: string | null } | undefined
  const sourceTask = db.prepare(`
    SELECT id, title, state, delivered_path FROM queue_tasks
     WHERE workspace_id = ? AND claimed_by = ? ORDER BY claimed_at DESC LIMIT 1
  `).get(workspaceId, authorId) as unknown as AuthorTaskRow | undefined
  const sourceTaskId = sourceTask?.id ?? ''

  const already = db.prepare(`
    SELECT r.task_id, r.reviewer_id, reviewer.account AS reviewer_account, reviewer.retired_at
      FROM review_routes r JOIN agents reviewer ON reviewer.id = r.reviewer_id
     WHERE r.workspace_id = ? AND r.author_id = ? AND r.source_task_id = ?
  `).get(workspaceId, authorId, sourceTaskId) as {
    task_id: string; reviewer_id: string; reviewer_account: string | null; retired_at: string | null
  } | undefined
  if (already !== undefined) {
    const current = resolveReviewIndependence(db, authorId, already.reviewer_id)
    if (already.retired_at !== null || !already.reviewer_account || !author?.account
      || already.reviewer_account === author.account || 'reason' in current) {
      return { routed: false, reason: 'existing review route independence cannot be proven' }
    }
    return { routed: false, reason: `already routed (${already.task_id})`, reviewer: already.reviewer_id, taskId: already.task_id }
  }

  const reviewer = readReviewPool(db, workspaceId).find(entry => {
    if (entry.agentId === authorId || entry.retired) return false
    if (entry.account === null || entry.account.trim() === '' || author?.account == null || author.account.trim() === '') return false
    if (entry.account === author.account) return false
    return resolveReviewIndependence(db, authorId, entry.agentId).independent
  })
  if (reviewer === undefined) return { routed: false, reason: 'no reviewer with a different account and known different model family in the pool' }

  const independence = resolveReviewIndependence(db, authorId, reviewer.agentId)
  if ('reason' in independence) return { routed: false, reason: `reviewer independence cannot be proven: ${independence.reason}` }

  ensureSystemAgent(db, workspaceId)
  const task = enqueueTask(db, workspaceId, {
    title: sourceTask === undefined ? `Review: Turn of ${authorId}` : `Review: ${sourceTask.title}`,
    body: [
      `Author: ${authorId}${author?.account == null ? '' : ` (${author.account})`}`,
      `Model families: ${independence.authorFamily} (${independence.authorModel}) -> ${independence.reviewerFamily} (${independence.reviewerModel})`,
      sourceTask === undefined ? 'Task: none claimed' : `Task: ${sourceTask.id}: ${sourceTask.title} (${sourceTask.state})`,
      `Evidence: ${sourceTask?.delivered_path ?? '—'}`,
      `Worktree: ${parseWorktrees(author?.worktrees).join(', ') || '—'}`,
      '',
      'Review this independently, then report the result to integrator.',
    ].join('\n'),
    addressedTo: reviewer.agentId,
    requestedBy: 'integrator',
  })
  db.prepare(`INSERT INTO review_routes (workspace_id, author_id, source_task_id, reviewer_id, task_id, created_at)
              VALUES (?, ?, ?, ?, ?, ?)`)
    .run(workspaceId, authorId, sourceTaskId, reviewer.agentId, task.id, now.toISOString())
  coordEvents.emitLive('review.routed', {
    workspaceId, authorId, reviewer: reviewer.agentId, taskId: task.id, at: now.toISOString(),
  })
  return { routed: true, reason: 'queued', reviewer: reviewer.agentId, taskId: task.id }
}

const parseWorktrees = (raw: string | null | undefined): string[] => {
  if (raw === null || raw === undefined || raw === '') return []
  try {
    const value = JSON.parse(raw) as unknown
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch { return [] }
}

/**
 * The turn-end half of the watchdog: a worker stopped because its candidate is
 * ready (`awaiting-commit`) or because it needs work. Either way a task waiting
 * on it may now proceed, and a finished turn may need a reviewer.
 */
export function watchTurnEnd(
  db: DatabaseSync,
  workspaceId: string,
  agentId: string,
  state: 'needs-task' | 'awaiting-commit' | 'blocked' | 'paused',
): { released: string[]; review: ReviewRoute | null } {
  const released = syncDependencies(db, workspaceId)
  const review = state === 'awaiting-commit' ? routeReviewForAuthor(db, workspaceId, agentId) : null
  return { released, review }
}
