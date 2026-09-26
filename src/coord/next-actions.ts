import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'
import { ensureQueueSchema } from '../queue.ts'
import { ensureLeaseSchema } from './leases.ts'
import { admitWork, ensureQuotaSchema, hostSnapshot, listQuotas, type HostSnapshot } from './resources.ts'
import { ensureSwarmOpsSchema } from './swarm-ops.ts'

export interface SwarmNextAction {
  id: string
  priority: number
  title: string
  reason: string
  command: string
}

interface WorkerRow { id: string; turn_state: string | null; account: string | null; retired_at: string | null }
interface TaskRow { id: string; title: string; body: string; state: string; claimed_by: string | null; addressed_to: string | null }

/** Calculate suggested operator actions. This function never executes them. */
export function getSwarmNextActions(
  db: DatabaseSync,
  workspaceId: string,
  options: { host?: HostSnapshot } = {},
): SwarmNextAction[] {
  ensureSwarmOpsSchema(db)
  ensureQueueSchema(db)
  ensureLeaseSchema(db)
  ensureQuotaSchema(db)
  requireWorkspace(db, workspaceId)
  const workers = db.prepare('SELECT id, turn_state, account, retired_at FROM agents WHERE workspace_id = ? ORDER BY id')
    .all(workspaceId) as unknown as WorkerRow[]
  const active = workers.filter(worker => worker.retired_at === null)
  const tasks = db.prepare('SELECT id, title, body, state, claimed_by, addressed_to FROM queue_tasks WHERE workspace_id = ? ORDER BY created_at, rowid')
    .all(workspaceId) as unknown as TaskRow[]
  const actions: SwarmNextAction[] = []

  for (const worker of active) {
    if (worker.turn_state === 'awaiting-commit') {
      const hasReview = tasks.some(task => task.state === 'pending' || task.state === 'claimed'
        ? /review|prüf/i.test(`${task.title} ${task.body}`)
          && (task.addressed_to === worker.id || `${task.title} ${task.body}`.toLowerCase().includes(worker.id.toLowerCase()))
        : false)
      if (!hasReview) actions.push({
        id: `review:${worker.id}`, priority: 1,
        title: `Review für ${worker.id} einreihen`,
        reason: `${worker.id} wartet auf Commit-Freigabe und hat keine offene Review-Aufgabe.`,
        command: `plugbrain swarm enqueue "Review ${worker.id}" --to <reviewer>`,
      })
    }
    if (worker.turn_state === 'needs-task') {
      const held = tasks.find(task => task.state === 'claimed' && task.claimed_by === worker.id)
      if (held) actions.push({
        id: `deliver:${held.id}`, priority: 2,
        title: `Lieferung von ${worker.id} prüfen`,
        reason: `Die Aufgabe ${held.id} ist noch claimed, obwohl ${worker.id} needs-task meldet; möglicherweise fehlt swarm deliver.`,
        command: `plugbrain swarm deliver ${worker.id} ${held.id} --path <beleg>`,
      })
      else if (tasks.some(task => task.state === 'pending' && (task.addressed_to === null || task.addressed_to === worker.id))) actions.push({
        id: `offer:${worker.id}`, priority: 5,
        title: `Offene Aufgabe ${worker.id} anbieten`,
        reason: `${worker.id} braucht eine Aufgabe und mindestens eine passende Queue-Aufgabe wartet.`,
        command: `plugbrain swarm turn ${worker.id} start`,
      })
    }
  }

  const unread = (db.prepare(`SELECT COUNT(*) AS count FROM inbox_messages
    WHERE workspace_id = ? AND (to_agent = 'integrator' OR to_agent IS NULL) AND read_at IS NULL`).get(workspaceId) as { count: number }).count
  if (Number(unread) > 0) actions.push({
    id: 'inbox:integrator', priority: 1,
    title: 'Nachrichten an den Integrator lesen',
    reason: `${Number(unread)} ungelesene Nachricht(en) warten im Integrator-Postfach.`,
    command: 'plugbrain swarm turn integrator start',
  })

  for (const quota of listQuotas(db).filter(item => item.exhausted)) actions.push({
    id: `quota:${quota.account}`, priority: 2,
    title: `Kontingent ${quota.account} erschöpft`,
    reason: `Gemeldet sind ${quota.remaining} ${quota.unit}${quota.resetsAt ? `; Reset ${quota.resetsAt}` : ''}.`,
    command: 'plugbrain swarm resources',
  })

  const host = options.host ?? hostSnapshot()
  for (const kind of ['test', 'build', 'install', 'worktree'] as const) {
    const admission = admitWork(kind, host)
    if (!admission.allowed) {
      actions.push({
        id: `admission:${kind}`, priority: 3,
        title: `${kind} wegen knapper Ressourcen zurückstellen`,
        reason: `${kind} ist aktuell nicht zugelassen: ${admission.reasons.join('; ')}.`,
        command: `plugbrain swarm admit ${kind}`,
      })
    }
  }

  return actions.sort((left, right) => left.priority - right.priority || left.id.localeCompare(right.id))
}
