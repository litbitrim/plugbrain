/**
 * Task dependencies: work that waits for work.
 *
 * A queue that only knows "the next free agent takes the next task" cannot
 * express "after this lands". The fleet needed exactly that on 26.09.2026:
 * a review (R-BR3) had to follow cx01's delivery, INT-R6 had to follow another
 * hand-in, and both orderings lived only in the integrator's head — so the
 * integrator had to re-queue and nudge by hand every time.
 *
 * A task may therefore name the task it waits for (`swarm enqueue --after`).
 * It stays out of every offer — the turn ping and the atomic claim — until the
 * predecessor is handed in (`delivered`) or its holder ended a turn with
 * `awaiting-commit` or `needs-task`, the two states in which a worker has done
 * all it can do alone. The release is persisted the first time it is observed,
 * so a later turn start by the holder cannot take it back, and the addressee
 * is told once ("Deine Aufgabe … ist jetzt frei"), so a task waiting behind
 * someone else becomes visible at the next turn boundary even when nobody
 * looked at the queue in between.
 *
 * Reconciliation is both event-driven (`deliver`, turn end) and state-driven
 * (every turn start, and the watchdog scan): a missed event must never strand
 * a task behind a predecessor that is already gone.
 */
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied } from '../access.ts'
import { coordEvents } from './events.ts'
import { ensureSystemAgent, sendMessage } from './inbox.ts'

const SCHEMA = `
CREATE TABLE IF NOT EXISTS task_dependencies (
  task_id       TEXT PRIMARY KEY,
  after_task_id TEXT NOT NULL,
  released_at   TEXT,
  announced_at  TEXT,
  created_at    TEXT NOT NULL
);
`

export function ensureDependencySchema(db: DatabaseSync): void { db.exec(SCHEMA) }

/**
 * The predicate every offer of pending work must carry.
 *
 * It is written against the bare table name `queue_tasks` on purpose: both the
 * candidate query in `queue.ts` and the turn ping in `swarm-ops.ts` select from
 * the table unaliased, so one fragment keeps the two paths from drifting apart
 * — a task blocked in the ping but claimable, or the reverse, is exactly the
 * kind of split the queue exists to prevent.
 */
export const UNBLOCKED_TASK_SQL =
  `NOT EXISTS (SELECT 1 FROM task_dependencies d WHERE d.task_id = queue_tasks.id AND d.released_at IS NULL)`

interface DependencyRow {
  task_id: string
  after_task_id: string
  task_title: string
  task_state: string
  addressed_to: string | null
  after_workspace_id: string | null
  after_title: string | null
  after_state: string | null
  after_attempt: number | null
  holder_state: string | null
}

/**
 * Record that `taskId` must wait for `afterTaskId`.
 *
 * The predecessor is validated now: a typo must fail where a human can see it,
 * not silently block the task forever. The immediate reconciliation below also
 * covers enqueueing behind a predecessor that is already released — there is
 * nothing to wait for, so the task is free at once.
 */
export function addTaskDependency(db: DatabaseSync, taskId: string, afterTaskId: string): void {
  ensureDependencySchema(db)
  if (taskId === afterTaskId) throw new AccessDenied('a task cannot wait for itself')
  const after = db.prepare('SELECT id, workspace_id FROM queue_tasks WHERE id = ?').get(afterTaskId) as
    { id: string; workspace_id: string } | undefined
  if (after === undefined) throw new AccessDenied(`unknown task to wait for: ${afterTaskId}`)
  const task = db.prepare('SELECT id, workspace_id FROM queue_tasks WHERE id = ?').get(taskId) as
    { id: string; workspace_id: string } | undefined
  if (task === undefined) throw new AccessDenied(`unknown task: ${taskId}`)
  if (after.workspace_id !== task.workspace_id) throw new AccessDenied('task dependencies must stay within the same workspace')

  const closesCycle = db.prepare(`
    WITH RECURSIVE ancestors(id) AS (
      SELECT after_task_id FROM task_dependencies WHERE task_id = ? AND released_at IS NULL
      UNION
      SELECT d.after_task_id FROM task_dependencies d JOIN ancestors a ON d.task_id = a.id
       WHERE d.released_at IS NULL
    ) SELECT 1 AS found FROM ancestors WHERE id = ? LIMIT 1
  `).get(afterTaskId, taskId)
  if (closesCycle !== undefined) throw new AccessDenied('task dependency would create a cycle')

  db.prepare(`INSERT INTO task_dependencies (task_id, after_task_id, released_at, announced_at, created_at)
              VALUES (?, ?, NULL, NULL, ?)`)
    .run(taskId, afterTaskId, new Date().toISOString())
  syncDependencies(db, task.workspace_id)
}

interface DependencyEdge { task_id: string; after_task_id: string }

function dependencyCycles(db: DatabaseSync, workspaceId: string): string[][] {
  const edges = db.prepare(`
    SELECT d.task_id, d.after_task_id FROM task_dependencies d
      JOIN queue_tasks q ON q.id = d.task_id
     WHERE q.workspace_id = ? AND d.released_at IS NULL
  `).all(workspaceId) as unknown as DependencyEdge[]
  const next = new Map(edges.map(edge => [edge.task_id, edge.after_task_id]))
  const finished = new Set<string>()
  const cycles: string[][] = []
  for (const start of next.keys()) {
    if (finished.has(start)) continue
    const path: string[] = []
    const pathIndex = new Map<string, number>()
    let current: string | undefined = start
    while (current !== undefined && next.has(current) && !finished.has(current)) {
      const seenAt = pathIndex.get(current)
      if (seenAt !== undefined) { cycles.push(path.slice(seenAt)); break }
      pathIndex.set(current, path.length)
      path.push(current)
      current = next.get(current)
    }
    for (const taskId of path) finished.add(taskId)
  }
  return cycles
}

function cancelBrokenDependency(
  db: DatabaseSync,
  workspaceId: string,
  taskId: string,
  afterTaskId: string,
  title: string,
  addressedTo: string | null,
  reason: string,
  nowIso: string,
): void {
  db.exec('BEGIN IMMEDIATE')
  try {
    const updated = db.prepare(`UPDATE queue_tasks SET state = 'cancelled', body =
        CASE WHEN body = '' THEN ? ELSE body || char(10) || char(10) || ? END, updated_at = ?
      WHERE id = ? AND state IN ('pending', 'claimed')`)
      .run(reason, reason, nowIso, taskId)
    db.prepare('UPDATE task_dependencies SET released_at = ? WHERE task_id = ? AND released_at IS NULL')
      .run(nowIso, taskId)
    let messageId: string | null = null
    if (Number(updated.changes) > 0 && addressedTo !== null) {
      ensureSystemAgent(db, workspaceId)
      messageId = sendMessage(db, {
        workspaceId, fromAgent: 'integrator', toAgent: addressedTo,
        subject: `Aufgabe ${title} wurde blockiert`,
        body: `${reason} Die Aufgabe wurde sichtbar abgebrochen; bitte Integrator informieren.`,
      }).id
    }
    db.exec('COMMIT')
    if (Number(updated.changes) > 0) {
      coordEvents.emitLive('task.dependency.failed', { taskId, afterTaskId, messageId, at: nowIso })
    }
  } catch (error: unknown) {
    db.exec('ROLLBACK')
    throw error
  }
}

/**
 * Release every waiting task in the workspace whose predecessor has arrived,
 * and tell each addressee once. Returns the ids of tasks released by this pass.
 */
export function syncDependencies(
  db: DatabaseSync,
  workspaceId: string,
  options: { now?: Date } = {},
): string[] {
  ensureDependencySchema(db)
  const now = options.now ?? new Date()
  const nowIso = now.toISOString()
  const cycleTaskIds = dependencyCycles(db, workspaceId).flat()
  for (const taskId of cycleTaskIds) {
    const row = db.prepare(`SELECT d.after_task_id, q.title, q.addressed_to FROM task_dependencies d
      JOIN queue_tasks q ON q.id = d.task_id WHERE d.task_id = ?`).get(taskId) as
      { after_task_id: string; title: string; addressed_to: string | null } | undefined
    if (row !== undefined) {
      cancelBrokenDependency(db, workspaceId, taskId, row.after_task_id, row.title, row.addressed_to,
        `Blocked: dependency cycle includes task ${taskId}.`, nowIso)
    }
  }
  const state = holderStateSql(db)
  const ready = db.prepare(`
    SELECT d.task_id, d.after_task_id, q.title AS task_title, q.state AS task_state, q.addressed_to,
           p.workspace_id AS after_workspace_id, p.title AS after_title, p.state AS after_state,
           COALESCE(receipt.delivery_attempt, 1) AS after_attempt, ${state.select}
      FROM task_dependencies d
      JOIN queue_tasks q ON q.id = d.task_id
      LEFT JOIN queue_tasks p ON p.id = d.after_task_id
      LEFT JOIN queue_deliveries receipt ON receipt.task_id = p.id
      LEFT JOIN agents holder ON holder.id = p.claimed_by
     WHERE d.released_at IS NULL AND q.workspace_id = ?
       AND (p.id IS NULL OR p.workspace_id <> q.workspace_id OR ${state.arrived})
     ORDER BY d.created_at ASC, d.rowid ASC
  `).all(workspaceId) as unknown as DependencyRow[]

  const released: string[] = []
  for (const row of ready) {
    if (row.after_title === null || row.after_workspace_id !== workspaceId) {
      const reason = row.after_title === null
        ? `Blocked: predecessor ${row.after_task_id} no longer exists.`
        : `Blocked: predecessor ${row.after_task_id} belongs to another workspace.`
      cancelBrokenDependency(db, workspaceId, row.task_id, row.after_task_id, row.task_title, row.addressed_to, reason, nowIso)
      continue
    }
    const marked = db.prepare(
      'UPDATE task_dependencies SET released_at = ? WHERE task_id = ? AND released_at IS NULL',
    ).run(nowIso, row.task_id)
    if (Number(marked.changes) === 0) continue
    released.push(row.task_id)
    coordEvents.emitLive('task.released', {
      taskId: row.task_id, afterTaskId: row.after_task_id, afterState: row.after_state, at: nowIso,
    })

    // Only a pending, addressed task needs the message: an unaddressed task is
    // visible to whoever checks in next, and a task already claimed has an owner.
    if (row.task_state !== 'pending' || row.addressed_to === null) continue
    const announced = db.prepare(
      'UPDATE task_dependencies SET announced_at = ? WHERE task_id = ? AND announced_at IS NULL',
    ).run(nowIso, row.task_id)
    if (Number(announced.changes) === 0) continue
    ensureSystemAgent(db, workspaceId)
    sendMessage(db, {
      workspaceId,
      fromAgent: 'integrator',
      toAgent: row.addressed_to,
      subject: 'Deine Aufgabe ist jetzt frei',
      body: `Deine Aufgabe "${row.task_title}" (${row.task_id}) ist jetzt frei: ` +
        `"${row.after_title}" (${row.after_task_id}) ist ${describePredecessor(row)}.\n` +
        `Nimm sie beim nächsten Turn-Start mit: plugbrain swarm turn <agent> start --claim`,
      deliveryKey: `task.delivered:${row.after_task_id}:${row.after_attempt}`,
    })
  }
  return released
}

/**
 * The holder's turn state decides whether a predecessor has arrived. The turn
 * columns belong to `ensureSwarmOpsSchema`; a store that only ever ran the
 * queue has none, and nothing in such a store ever ended a turn — so the
 * reading is honestly "no holder state" instead of a missing-column error.
 */
function holderStateSql(db: DatabaseSync): { select: string; arrived: string } {
  const columns = db.prepare('PRAGMA table_info(agents)').all() as unknown as Array<{ name: string }>
  return columns.some(column => column.name === 'turn_state')
    ? {
      select: 'holder.turn_state AS holder_state',
      arrived: `(p.state = 'delivered' OR holder.turn_state IN ('awaiting-commit', 'needs-task'))`,
    }
    : { select: 'NULL AS holder_state', arrived: `p.state = 'delivered'` }
}

/** One plain-language reason for the release, for the message body. */
function describePredecessor(row: DependencyRow): string {
  if (row.after_state === 'delivered') return 'geliefert'
  return `beim Halter ${row.holder_state ?? 'unbekannt'} (Turn beendet)`
}
