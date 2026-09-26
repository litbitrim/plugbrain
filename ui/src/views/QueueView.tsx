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
  return (
    <div className="queue">
      <div className="queue__intro" style={{ padding: '12px 16px', background: 'var(--panel)', borderBottom: '1px solid var(--line)', fontSize: '13px', color: 'var(--muted)' }}>
        Warteschlange für Workspace-Aufgaben — freie Agenten beanspruchen Aufgaben selbstständig (First-In-First-Out).
      </div>

      {tasks.length === 0 ? (
        <div className="brain-empty" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>Keine Aufgaben in der Warteschlange.</p>
          <small style={{ color: 'var(--faint)', display: 'block', marginTop: '6px' }}>
            Nichts wartet und nichts wird erfunden. Neue Aufgaben erscheinen hier automatisch.
          </small>
        </div>
      ) : (
        <>
          <div className="queue__figures">
            <Figure value={depth} label="WARTEND" tone={depth > 8 ? 'hot' : undefined} />
            <Figure value={tasks.filter(t => t.state === 'claimed').length} label="IN ARBEIT" />
            <Figure value={tasks.filter(t => t.state === 'delivered').length} label="GELIEFERT" />
            <Figure value={tasks.filter(t => t.state === 'claimed' && t.stale).length} label="STILL" tone={tasks.some(t => t.stale) ? 'hot' : undefined} />
          </div>

          <ol className="queue__list">
            {tasks.map(task => (
              <li key={task.id} className={`queue__row queue__row--${task.state}`}>
                <span className="queue__state">{LABEL[task.state] ?? task.state}</span>
                <span className="queue__title" title={task.title}>{task.title}</span>
                <span className="queue__holder">
                  {task.claimed_by
                    ? `Wird bearbeitet von Agent: ${task.claimed_by}`
                    : task.addressed_to
                      ? `Zugewiesen an: Agent ${task.addressed_to}`
                      : 'Frei für den nächsten verfügbaren Agenten'}
                </span>
                {task.stale && (
                  <span className="queue__stale" title="Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.">
                    still
                  </span>
                )}
                {task.delivered_path && (
                  <span className="queue__path" title={`Geliefert nach: ${task.delivered_path}`}>
                    Ergebnis: {task.delivered_path}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
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
