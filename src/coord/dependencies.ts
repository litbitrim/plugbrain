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
  after_title: string
  after_state: string
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
  const after = db.prepare('SELECT id FROM queue_tasks WHERE id = ?').get(afterTaskId) as { id: string } | undefined
  if (after === undefined) throw new AccessDenied(`unknown task to wait for: ${afterTaskId}`)
  const task = db.prepare('SELECT id, workspace_id FROM queue_tasks WHERE id = ?').get(taskId) as
    { id: string; workspace_id: string } | undefined
  if (task === undefined) throw new AccessDenied(`unknown task: ${taskId}`)

  db.prepare(`INSERT INTO task_dependencies (task_id, after_task_id, released_at, announced_at, created_at)
              VALUES (?, ?, NULL, NULL, ?)`)
    .run(taskId, afterTaskId, new Date().toISOString())
  syncDependencies(db, task.workspace_id)
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
  const state = holderStateSql(db)
  const ready = db.prepare(`
    SELECT d.task_id, d.after_task_id, q.title AS task_title, q.state AS task_state, q.addressed_to,
           p.title AS after_title, p.state AS after_state, ${state.select}
      FROM task_dependencies d
      JOIN queue_tasks q ON q.id = d.task_id
      JOIN queue_tasks p ON p.id = d.after_task_id
      LEFT JOIN agents holder ON holder.id = p.claimed_by
     WHERE d.released_at IS NULL AND q.workspace_id = ?
       AND ${state.arrived}
     ORDER BY d.created_at ASC, d.rowid ASC
  `).all(workspaceId) as unknown as DependencyRow[]

  const released: string[] = []
  for (const row of ready) {
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
