/**
 * `plugbrain swarm report` — the whole fleet state in one model-free read.
 *
 * A lead cycle needs a handful of facts, not a language model: what was just
 * delivered, what can run next, which lane is waiting and why, which reviews
 * are still open, what is delivered but not integrated, whether the supervisor
 * retried anything on its own, and how long it has been since a human last
 * touched the queue. `Code/tools/wave-plan/lead-digest.mjs` proved the shape
 * outside the product; this module is the same reading from the Brain's own
 * store, so `plugbrain swarm report` answers it without a gateway or a model.
 *
 * The reading is read-only: every optional table is probed before it is used,
 * so a store that only ever ran the queue still produces a report instead of a
 * "no such table" error.
 */
import type { DatabaseSync } from 'node:sqlite'
import { UNBLOCKED_TASK_SQL } from './dependencies.ts'

const DEFAULT_SINCE_MS = 60 * 60_000
const MAX_LIST = 20

export interface ReportDelivery {
  taskId: string
  title: string
  deliveredBy: string
  deliveredAt: string
  deliveredPath: string
  reviewJudgment: string | null
  reviewedCommit: string | null
  sourceRevision: string | null
}

export interface ReportTask {
  id: string
  title: string
  state: string
  addressedTo: string | null
  priority: number
  createdAt: string
  updatedAt: string
  waitingOn: string[]
}

export interface ReportLane {
  agentId: string
  turnState: string | null
  turnSummary: string | null
  supervisorActive: boolean
  currentTaskId: string | null
  claimedTaskId: string | null
  readyTasks: number
  blockedTasks: number
  waiting: boolean
  reason: string
}

export interface ReportRerun {
  taskId: string
  agentId: string
  attempt: number
  startedAt: string
  endedAt: string | null
  outcome: string | null
}

export interface ReportManualInput {
  at: string | null
  ageMinutes: number | null
  operation: string | null
  byAgent: string | null
  taskId: string | null
}

export interface SwarmReport {
  workspaceId: string
  generatedAt: string
  since: string
  lastDelivery: ReportDelivery | null
  nextTask: ReportTask | null
  lanes: ReportLane[]
  openReviews: ReportDelivery[]
  integrationBacklog: ReportTask[]
  automaticReruns: ReportRerun[]
  lastManualInput: ReportManualInput
  counts: {
    pending: number
    claimed: number
    delivered: number
    openReviews: number
    integrationBacklog: number
    automaticReruns: number
  }
}

const hasTable = (db: DatabaseSync, name: string): boolean =>
  db.prepare("SELECT 1 AS yes FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) !== undefined

function blockersOf(db: DatabaseSync, workspaceId: string, taskIds: string[]): Map<string, string[]> {
  const out = new Map<string, string[]>()
  if (!hasTable(db, 'task_dependencies')) return out
  for (const taskId of taskIds) {
    const rows = db.prepare(`SELECT after_task_id FROM task_dependencies
      WHERE task_id = ? AND released_at IS NULL`).all(taskId) as Array<{ after_task_id: string }>
    out.set(taskId, rows.map(row => row.after_task_id))
  }
  return out
}

/** Build the report. Pure read: nothing here writes to the store. */
export function buildSwarmReport(
  db: DatabaseSync,
  workspaceId: string,
  options: { since?: string; now?: Date } = {},
): SwarmReport {
  const now = options.now ?? new Date()
  const generatedAt = now.toISOString()
  const since = options.since ?? new Date(now.getTime() - DEFAULT_SINCE_MS).toISOString()
  const sinceMs = Date.parse(since)
  if (!Number.isFinite(sinceMs)) throw new Error(`--since is not a valid ISO timestamp: ${since}`)

  const openReviews = hasTable(db, 'queue_deliveries')
    ? (db.prepare(`SELECT d.task_id, t.title, d.delivered_by, d.delivered_at, d.delivered_path,
        d.review_judgment, d.reviewed_commit, d.source_revision
      FROM queue_deliveries d JOIN queue_tasks t ON t.id = d.task_id
      WHERE t.workspace_id = ? AND (d.review_judgment IS NULL OR d.review_judgment = '')
      ORDER BY d.delivered_at ASC`).all(workspaceId) as unknown as DeliveryRow[]).map(rowAsDelivery)
    : []

  const lastDeliveryRow = hasTable(db, 'queue_deliveries')
    ? (db.prepare(`SELECT d.task_id, t.title, d.delivered_by, d.delivered_at, d.delivered_path,
        d.review_judgment, d.reviewed_commit, d.source_revision
      FROM queue_deliveries d JOIN queue_tasks t ON t.id = d.task_id
      WHERE t.workspace_id = ? AND d.delivered_path IS NOT NULL AND d.delivered_path <> ''
      ORDER BY d.delivered_at DESC LIMIT 1`).get(workspaceId) as unknown as DeliveryRow | undefined)
    : undefined
  const lastDelivery = lastDeliveryRow === undefined ? null : rowAsDelivery(lastDeliveryRow)

  const nextRow = (db.prepare(`SELECT * FROM queue_tasks
    WHERE workspace_id = ? AND state = 'pending' AND superseded_by IS NULL
      AND ${UNBLOCKED_TASK_SQL}
    ORDER BY priority DESC, created_at ASC, rowid ASC LIMIT 1`).get(workspaceId) as unknown as TaskRow | undefined)
  const nextTask = nextRow === undefined ? null : rowAsTask(nextRow)

  const backlogRows = db.prepare(`SELECT * FROM queue_tasks
    WHERE workspace_id = ? AND state = 'delivered'
    ORDER BY updated_at ASC`).all(workspaceId) as unknown as TaskRow[]
  const integrationBacklog = backlogRows.map(rowAsTask)
  const backlogBlockers = blockersOf(db, workspaceId, backlogRows.map(row => row.id))
  for (const task of integrationBacklog) task.waitingOn = backlogBlockers.get(task.id) ?? []

  const automaticReruns = hasTable(db, 'worker_task_attempts')
    ? (db.prepare(`SELECT a.task_id, a.agent_id, a.attempt, a.started_at, a.ended_at, a.outcome
      FROM worker_task_attempts a JOIN queue_tasks t ON t.id = a.task_id
      WHERE t.workspace_id = ? AND a.attempt > 1 AND a.started_at >= ?
      ORDER BY a.started_at DESC LIMIT ${MAX_LIST}`).all(workspaceId, since) as unknown as RerunRow[]).map(rowAsRerun)
    : []
  const rerunCount = hasTable(db, 'worker_task_attempts')
    ? Number((db.prepare(`SELECT COUNT(*) AS n FROM worker_task_attempts a JOIN queue_tasks t ON t.id = a.task_id
        WHERE t.workspace_id = ? AND a.attempt > 1 AND a.started_at >= ?`).get(workspaceId, since) as { n: number }).n)
    : 0

  const manualRow = hasTable(db, 'queue_task_events')
    ? (db.prepare(`SELECT operation, by_agent, task_id, occurred_at FROM queue_task_events
      WHERE workspace_id = ? ORDER BY occurred_at DESC, rowid DESC LIMIT 1`).get(workspaceId) as unknown as ManualRow | undefined)
    : undefined
  const lastManualInput = manualRow === undefined ? emptyManualInput() : manualInput(manualRow, now)

  const lanes = buildLanes(db, workspaceId)

  const pending = countTasks(db, workspaceId, 'pending')
  const claimed = countTasks(db, workspaceId, 'claimed')
  const delivered = countTasks(db, workspaceId, 'delivered')

  return {
    workspaceId, generatedAt, since,
    lastDelivery, nextTask, lanes,
    openReviews, integrationBacklog,
    automaticReruns,
    lastManualInput,
    counts: {
      pending, claimed, delivered,
      openReviews: openReviews.length,
      integrationBacklog: integrationBacklog.length,
      automaticReruns: rerunCount,
    },
  }
}

interface TaskRow {
  id: string
  title: string
  state: string
  addressed_to: string | null
  priority: number
  created_at: string
  updated_at: string
}
interface DeliveryRow {
  task_id: string
  title: string
  delivered_by: string
  delivered_at: string
  delivered_path: string
  review_judgment: string | null
  reviewed_commit: string | null
  source_revision: string | null
}
interface RerunRow {
  task_id: string
  agent_id: string
  attempt: number
  started_at: string
  ended_at: string | null
  outcome: string | null
}
interface ManualRow { operation: string; by_agent: string; task_id: string | null; occurred_at: string }
interface LaneRow {
  id: string
  turn_state: string | null
  turn_summary: string | null
  current_task_id: string | null
  supervisor_active: number | null
}

const rowAsTask = (row: TaskRow): ReportTask => ({
  id: row.id, title: row.title, state: row.state, addressedTo: row.addressed_to,
  priority: row.priority, createdAt: row.created_at, updatedAt: row.updated_at, waitingOn: [],
})

const rowAsDelivery = (row: DeliveryRow): ReportDelivery => ({
  taskId: row.task_id, title: row.title, deliveredBy: row.delivered_by,
  deliveredAt: row.delivered_at, deliveredPath: row.delivered_path,
  reviewJudgment: row.review_judgment, reviewedCommit: row.reviewed_commit,
  sourceRevision: row.source_revision,
})

const rowAsRerun = (row: RerunRow): ReportRerun => ({
  taskId: row.task_id, agentId: row.agent_id, attempt: row.attempt,
  startedAt: row.started_at, endedAt: row.ended_at, outcome: row.outcome,
})

function countTasks(db: DatabaseSync, workspaceId: string, state: string): number {
  return Number((db.prepare('SELECT COUNT(*) AS n FROM queue_tasks WHERE workspace_id = ? AND state = ?')
    .get(workspaceId, state) as { n: number }).n)
}

function emptyManualInput(): ReportManualInput {
  return { at: null, ageMinutes: null, operation: null, byAgent: null, taskId: null }
}

function manualInput(row: ManualRow, now: Date): ReportManualInput {
  const atMs = Date.parse(row.occurred_at)
  return {
    at: row.occurred_at,
    ageMinutes: Number.isFinite(atMs) ? Math.max(0, Math.round((now.getTime() - atMs) / 60_000)) : null,
    operation: row.operation,
    byAgent: row.by_agent,
    taskId: row.task_id,
  }
}

/**
 * One row per active worker: what it holds, what it could take, what is
 * blocked, and a plain-language reason for a lane that is not running.
 */
function buildLanes(db: DatabaseSync, workspaceId: string): ReportLane[] {
  const supervisorJoin = hasTable(db, 'worker_supervisors')
    ? 'LEFT JOIN worker_supervisors s ON s.agent_id = a.id'
    : ''
  const supervisorSelect = hasTable(db, 'worker_supervisors')
    ? 's.active AS supervisor_active, s.current_task_id AS current_task_id'
    : 'NULL AS supervisor_active, NULL AS current_task_id'
  const agents = db.prepare(`SELECT a.id, a.turn_state, a.turn_summary, ${supervisorSelect}
    FROM agents a ${supervisorJoin}
    WHERE a.workspace_id = ? AND a.retired_at IS NULL ORDER BY a.id`).all(workspaceId) as unknown as LaneRow[]

  const claimedRows = db.prepare(`SELECT claimed_by, id FROM queue_tasks
    WHERE workspace_id = ? AND state = 'claimed' AND superseded_by IS NULL`).all(workspaceId) as
    Array<{ claimed_by: string | null; id: string }>
  const claimedByAgent = new Map(claimedRows.filter(row => row.claimed_by !== null).map(row => [row.claimed_by!, row.id]))

  const pendingReady = db.prepare(`SELECT addressed_to, COUNT(*) AS n FROM queue_tasks
    WHERE workspace_id = ? AND state = 'pending' AND superseded_by IS NULL
      AND addressed_to IS NOT NULL AND ${UNBLOCKED_TASK_SQL}
    GROUP BY addressed_to`).all(workspaceId) as Array<{ addressed_to: string; n: number }>
  const pendingBlocked = db.prepare(`SELECT q.addressed_to, COUNT(*) AS n FROM queue_tasks q
    WHERE q.workspace_id = ? AND q.state = 'pending' AND q.superseded_by IS NULL
      AND q.addressed_to IS NOT NULL
      AND EXISTS (SELECT 1 FROM task_dependencies d WHERE d.task_id = q.id AND d.released_at IS NULL)
    GROUP BY q.addressed_to`).all(workspaceId) as Array<{ addressed_to: string; n: number }>
  const readyByAgent = new Map(pendingReady.map(row => [row.addressed_to, Number(row.n)]))
  const blockedByAgent = new Map(pendingBlocked.map(row => [row.addressed_to, Number(row.n)]))

  return agents.map(agent => {
    const claimedTaskId = claimedByAgent.get(agent.id) ?? null
    const readyTasks = readyByAgent.get(agent.id) ?? 0
    const blockedTasks = blockedByAgent.get(agent.id) ?? 0
    const running = agent.supervisor_active === 1
    const reason = describeLane(agent, claimedTaskId, readyTasks, blockedTasks, running)
    return {
      agentId: agent.id,
      turnState: agent.turn_state,
      turnSummary: agent.turn_summary,
      supervisorActive: running,
      currentTaskId: agent.current_task_id,
      claimedTaskId,
      readyTasks,
      blockedTasks,
      waiting: claimedTaskId === null && !(running && agent.current_task_id !== null),
      reason,
    }
  })
}

function describeLane(
  agent: LaneRow,
  claimedTaskId: string | null,
  readyTasks: number,
  blockedTasks: number,
  running: boolean,
): string {
  if (claimedTaskId !== null) return `arbeitet an ${claimedTaskId}`
  if (agent.turn_state === 'blocked') {
    return `blockiert: ${(agent.turn_summary ?? 'kein Grund angegeben').split('\n')[0]}`
  }
  if (agent.turn_state === 'paused') return 'pausiert'
  if (running && agent.current_task_id !== null) return `Supervisor läuft an ${agent.current_task_id}`
  if (readyTasks > 0) return `${readyTasks} bereite Aufgabe(n) warten`
  if (blockedTasks > 0) return `wartet auf Voraufgabe(n) (${blockedTasks})`
  return 'keine passende Aufgabe'
}
