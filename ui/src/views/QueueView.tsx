import type { QueueTask } from '../types'

/**
 * The workspace queue.
 *
 * Work is pulled here, not routed: the first free agent claims the next task.
 * So the reading that matters is depth — how much is waiting — and who is
 * holding what, for how long.
 *
 * A held task that has gone quiet is marked stale. That is a reading and
 * nothing more: PlugBrain does not own leases and never reaps a claim, because
 * deciding an agent is dead is a liveness judgement it deliberately avoids.
 */
export default function QueueView({ tasks, depth }: { tasks: QueueTask[]; depth: number }) {
  if (tasks.length === 0) {
    return (
      <div className="brain-empty">
        Die Queue ist leer. Nichts wartet, und nichts wird erfunden.
      </div>
    )
  }

  const pending = tasks.filter(t => t.state === 'pending')
  const claimed = tasks.filter(t => t.state === 'claimed')
  const delivered = tasks.filter(t => t.state === 'delivered')
  const stale = claimed.filter(t => t.stale)

  return (
    <div className="queue">
      <div className="queue__figures">
        <Figure value={depth} label="WARTEND" tone={depth > 8 ? 'hot' : undefined} />
        <Figure value={claimed.length} label="IN ARBEIT" />
        <Figure value={delivered.length} label="GELIEFERT" />
        <Figure value={stale.length} label="STILL" tone={stale.length > 0 ? 'hot' : undefined} />
      </div>

      <ol className="queue__list">
        {tasks.map(task => (
          <li key={task.id} className={`queue__row queue__row--${task.state}`}>
            <span className="queue__state">{LABEL[task.state] ?? task.state}</span>
            <span className="queue__title" title={task.title}>{task.title}</span>
            <span className="queue__holder">
              {task.claimed_by
                ? task.claimed_by
                : task.addressed_to
                  ? `nur ${task.addressed_to}`
                  : 'für alle offen'}
            </span>
            {task.stale && <span className="queue__stale" title="Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.">still</span>}
            {task.delivered_path && <span className="queue__path" title={task.delivered_path}>{task.delivered_path}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

const LABEL: Record<string, string> = {
  pending: 'WARTET', claimed: 'IN ARBEIT', delivered: 'GELIEFERT', cancelled: 'ABGEBROCHEN',
}

function Figure({ value, label, tone }: { value: number; label: string; tone?: 'hot' }) {
  return (
    <div className={`queue__figure${tone === 'hot' ? ' queue__figure--hot' : ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}
