/**
 * The workspace task queue — work is pulled, not routed.
 *
 * The agent model this serves: agents are interchangeable generalists. Each
 * takes one large task through every stage itself — plan, research, read,
 * edit, write, review, deliver — in its own session. There is little
 * stage-to-stage handoff between agents, so a push-router addressed at
 * specific agents would model collaboration that mostly does not happen.
 *
 * So: one queue per workspace, and the first free agent claims the next task.
 * Addressing exists as an *optional narrowing* on the same queue, for the
 * cases where capability genuinely differs (a job only Freebuff can do) — not
 * as a second mechanism with its own table and its own bugs.
 *
 * A task may additionally wait for another task (`afterTaskId`). Ordering is
 * the one thing pull alone cannot express, and on 26.09.2026 the integrator
 * was the ordering mechanism by hand. The waiting itself lives in
 * `coord/dependencies.ts`; this module only keeps its offers honest.
 *
 * Leases: PlugBrain deliberately does not own them (see projections/conflicts.ts
 * — "PlugBrain does not own leases, the Operator and @plug/work do"). This
 * module therefore *reports* that a claim has gone quiet and never reaps one.
 * Deciding an agent is dead is a liveness judgement, and inferring liveness is
 * precisely what the Brain avoids everywhere else.
 */
import { randomUUID } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireAgent, requireWorkspace } from './access.ts'
import { addTaskDependency, ensureDependencySchema, syncDependencies, UNBLOCKED_TASK_SQL } from './coord/dependencies.ts'
import { assertNotCredential } from './coord/resources.ts'
import { rowAs, rowsAs } from './store/rows.ts'
import { coordEvents } from './coord/events.ts'

export type QueueState = 'pending' | 'claimed' | 'delivered' | 'cancelled'

export interface QueueTask {
  id: string
  workspace_id: string
  title: string
  body: string
  /** NULL means anyone may claim it. */
  addressed_to: string | null
  requested_by: string | null
  state: QueueState
  claimed_by: string | null
  claimed_at: string | null
  delivered_path: string | null
  delivered_summary: string | null
  decomposition_key?: string | null
  created_at: string
  updated_at: string
}

/** A queue row with the staleness reading applied — never a decision. */
export interface QueueRow extends QueueTask {
  stale: boolean
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS queue_tasks (
  id             TEXT PRIMARY KEY,
  workspace_id   TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  body           TEXT NOT NULL DEFAULT '',
  addressed_to   TEXT,
  requested_by   TEXT,
  state          TEXT NOT NULL,
  claimed_by     TEXT REFERENCES agents(id) ON DELETE SET NULL,
  claimed_at     TEXT,
  delivered_path TEXT,
  delivered_summary TEXT,
  decomposition_key TEXT,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);
-- The claim query filters on exactly this, and it runs on every idle agent.
CREATE INDEX IF NOT EXISTS idx_queue_ws_state ON queue_tasks(workspace_id, state, created_at);
CREATE TABLE IF NOT EXISTS queue_deliveries (
  task_id TEXT PRIMARY KEY REFERENCES queue_tasks(id) ON DELETE CASCADE,
  delivered_by TEXT NOT NULL,
  delivery_attempt INTEGER NOT NULL,
  source_revision TEXT,
  delivered_path TEXT NOT NULL,
  delivered_sha256 TEXT NOT NULL,
  review_judgment TEXT,
  reviewed_commit TEXT,
  delivered_at TEXT NOT NULL
);
`

// The candidates every offer reads are filtered by the dependency table, so it
// belongs to the queue schema: a store that only ever touched the queue must
// still be able to answer "who is next" without a missing-table error.
export function ensureQueueSchema(db: DatabaseSync): void {
  db.exec(SCHEMA)
  const columns = db.prepare('PRAGMA table_info(queue_tasks)').all() as unknown as Array<{ name: string }>
  if (!columns.some(column => column.name === 'delivered_summary')) {
    db.exec('ALTER TABLE queue_tasks ADD COLUMN delivered_summary TEXT')
  }
  if (!columns.some(column => column.name === 'decomposition_key')) {
    db.exec('ALTER TABLE queue_tasks ADD COLUMN decomposition_key TEXT')
  }
  db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_queue_decomposition_key ON queue_tasks(decomposition_key) WHERE decomposition_key IS NOT NULL')
  ensureDependencySchema(db)
}

const load = (db: DatabaseSync, id: string): QueueTask => {
  const row = rowAs<QueueTask>(db.prepare('SELECT * FROM queue_tasks WHERE id = ?').get(id))
  if (!row) throw new AccessDenied(`unknown task: ${id}`)
  return row
}

/**
 * Put a task on the workspace queue.
 *
 * `addressedTo` narrows who may claim it; leaving it null is the normal case
 * and means "whoever is free". A named addressee is validated now rather than
 * at claim time, so a request addressed at an agent that does not exist fails
 * where somebody can still see it instead of sitting pending forever.
 */
export function enqueueTask(
  db: DatabaseSync,
  workspaceId: string,
  input: { title: string; body?: string; addressedTo?: string; requestedBy?: string; afterTaskId?: string; decompositionKey?: string },
): QueueTask {
  ensureQueueSchema(db)
  requireWorkspace(db, workspaceId)

  const title = input.title.trim()
  if (title === '') throw new AccessDenied('a task needs a title')
  if (input.addressedTo !== undefined) requireAgent(db, input.addressedTo)
  if (input.requestedBy !== undefined) requireAgent(db, input.requestedBy)

  const now = new Date().toISOString()
  const id = `task-${randomUUID().slice(0, 12)}`
  db.prepare(
    `INSERT INTO queue_tasks
       (id, workspace_id, title, body, addressed_to, requested_by, state,
        claimed_by, claimed_at, delivered_path, created_at, updated_at, decomposition_key)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', NULL, NULL, NULL, ?, ?, ?)`,
  ).run(
    id, workspaceId, title, input.body ?? '',
    input.addressedTo ?? null, input.requestedBy ?? null, now, now, input.decompositionKey ?? null,
  )
  if (input.afterTaskId !== undefined) addTaskDependency(db, id, input.afterTaskId)
  const task = load(db, id)
  coordEvents.emitLive('task.enqueued', {
    taskId: task.id,
    title: task.title,
    addressedTo: task.addressed_to,
    requestedBy: task.requested_by,
    createdAt: task.created_at,
  })
  return task
}

/**
 * Claim the next task this agent is allowed to take, or null.
 *
 * The compare-and-set is the entire point. Selecting a candidate and then
 * updating it unconditionally would let two idle agents read the same row and
 * both proceed — every write that followed would be duplicated, by two authors
 * who each believed they owned the work. The UPDATE therefore re-asserts
 * `state = 'pending'` and the claim counts only if it changed exactly one row,
 * all inside one immediate transaction so no other writer interleaves.
 */
export function claimNextTask(
  db: DatabaseSync,
  workspaceId: string,
  agentId: string,
): QueueTask | null {
  ensureQueueSchema(db)
  requireWorkspace(db, workspaceId)
  requireAgent(db, agentId)

  db.exec('BEGIN IMMEDIATE')
  try {
    const candidate = db.prepare(
      `SELECT id FROM queue_tasks
        WHERE workspace_id = ? AND state = 'pending'
          AND (addressed_to IS NULL OR addressed_to = ?)
          AND ${UNBLOCKED_TASK_SQL}
        ORDER BY created_at ASC, rowid ASC
        LIMIT 1`,
    ).get(workspaceId, agentId) as { id: string } | undefined

    if (candidate === undefined) { db.exec('COMMIT'); return null }

    const now = new Date().toISOString()
    const result = db.prepare(
      `UPDATE queue_tasks
          SET state = 'claimed', claimed_by = ?, claimed_at = ?, updated_at = ?
        WHERE id = ? AND state = 'pending'`,
    ).run(agentId, now, now, candidate.id)

    if (Number(result.changes) !== 1) { db.exec('ROLLBACK'); return null }
    const claimed = load(db, candidate.id)
    db.exec('COMMIT')
    return claimed
  } catch (error: unknown) {
    db.exec('ROLLBACK')
    throw error
  }
}

/**
 * Record that the holder finished and where the output went.
 *
 * Only the holder may deliver: accepting a delivery from anyone else would
 * attribute work to an agent that did not do it, which is the same falsehood
 * the write gate exists to prevent one level down.
 */
export function deliverTask(
  db: DatabaseSync,
  taskId: string,
  agentId: string,
  deliveredPath: string,
  deliveredSummary?: string,
  receipt?: { workspaceId: string; deliveredBy: string; sourceRevision: string | null; sha256: string; reviewJudgment: string | null; reviewedCommit: string | null },
): QueueTask {
  ensureQueueSchema(db)
  const summary = deliveredSummary === undefined ? null : deliveredSummary.slice(0, 2000)
  if (summary !== null) assertNotCredential('delivery summary', summary)
  const now = new Date().toISOString()
  db.exec('BEGIN IMMEDIATE')
  try {
    const task = load(db, taskId)
    if (receipt && task.workspace_id !== receipt.workspaceId) {
      throw new AccessDenied(`task ${taskId} belongs to another workspace`)
    }
    if (task.state !== 'claimed') throw new AccessDenied(`task ${taskId} is ${task.state}, not claimed`)
    if (task.claimed_by !== agentId) {
      throw new AccessDenied(`task ${taskId} is held by ${task.claimed_by ?? 'nobody'}, not ${agentId}`)
    }
    const changed = db.prepare(
      `UPDATE queue_tasks SET state = 'delivered', delivered_path = ?, delivered_summary = ?, updated_at = ?
        WHERE id = ? AND state = 'claimed' AND claimed_by = ? AND (? IS NULL OR workspace_id = ?)`,
    ).run(deliveredPath, summary, now, taskId, agentId, receipt?.workspaceId ?? null, receipt?.workspaceId ?? null)
    if (Number(changed.changes) !== 1) throw new AccessDenied(`task ${taskId} changed before delivery`)
    if (receipt) {
      db.prepare(`INSERT INTO queue_deliveries
        (task_id, delivered_by, delivery_attempt, source_revision, delivered_path, delivered_sha256,
         review_judgment, reviewed_commit, delivered_at)
        VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?)`)
        .run(taskId, receipt.deliveredBy, receipt.sourceRevision, deliveredPath, receipt.sha256,
          receipt.reviewJudgment, receipt.reviewedCommit, now)
    }
    // The delivery may be exactly the event another task was waiting for.
    syncDependencies(db, task.workspace_id)
    const delivered = load(db, taskId)
    db.exec('COMMIT')
    coordEvents.emitLive('task.delivered', {
      taskId: delivered.id,
      title: delivered.title,
      agentId: delivered.claimed_by,
      addressedTo: delivered.addressed_to,
      evidence: delivered.delivered_path,
      deliveredAt: delivered.updated_at,
    })
    return delivered
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

/** How many tasks are waiting. The one number that predicts trouble. */
export function queueDepth(db: DatabaseSync, workspaceId: string): number {
  ensureQueueSchema(db)
  const row = db.prepare(
    `SELECT COUNT(*) AS n FROM queue_tasks WHERE workspace_id = ? AND state = 'pending'`,
  ).get(workspaceId) as { n: number }
  return Number(row.n)
}

const DEFAULT_STALE_AFTER_MS = 15 * 60_000

/**
 * The queue as it stands, with a staleness reading on each held task.
 *
 * `stale` says a claim has been quiet longer than the caller's threshold. It
 * is a reading, not a verdict, and nothing here acts on it.
 */
export function listQueue(
  db: DatabaseSync,
  workspaceId: string,
  options: { staleAfterMs?: number } = {},
): QueueRow[] {
  ensureQueueSchema(db)
  requireWorkspace(db, workspaceId)
  const threshold = options.staleAfterMs ?? DEFAULT_STALE_AFTER_MS
  const now = Date.now()
  const rows = rowsAs<QueueRow>(db.prepare(
    `SELECT * FROM queue_tasks WHERE workspace_id = ? ORDER BY created_at ASC`,
  ).all(workspaceId))

  return rows.map(row => {
    const at = row.claimed_at === null ? null : Date.parse(row.claimed_at)
    const stale = row.state === 'claimed' && at !== null && Number.isFinite(at)
      && now - at > threshold
    return { ...row, stale }
  })
}
