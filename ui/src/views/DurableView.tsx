import type { SwarmSnapshot } from '../types'

function age(value: string | null): string {
  if (!value) return 'kein Lebenszeichen erfasst'
  const elapsed = Math.max(0, Date.now() - Date.parse(value))
  if (!Number.isFinite(elapsed)) return 'Zeitstempel ungültig'
  if (elapsed < 60_000) return `vor ${Math.floor(elapsed / 1000)} s`
  if (elapsed < 3_600_000) return `vor ${Math.floor(elapsed / 60_000)} min`
  return `vor ${Math.floor(elapsed / 3_600_000)} h`
}

export default function DurableView({ data, onRefresh }: { data: SwarmSnapshot | null; onRefresh: () => void }) {
  const workers = data?.board.agents.filter(worker => /^cx\d\d$/.test(worker.id)) ?? []
  return <section className="pb-domain-view" aria-label="Dauerbetrieb und Nachtschicht">
    <header className="pb-view-header"><h2>Dauerbetrieb / Nachtschicht</h2><p>Fleet-Zustand aus dem Brain-Koordinationstrace</p>
      <button className="pb-button pb-button--primary" type="button" onClick={onRefresh}>Fleet aktualisieren</button>
    </header>
    {!data ? <p role="status">Fleet-Daten werden geladen oder sind nicht verfügbar.</p> : <>
      <section className="pb-domain-card"><h3>Codex-Lanes cx01–cx15</h3>
        {workers.length ? <div className="pb-table-wrap"><table className="pb-data-table"><thead><tr><th>Lane</th><th>Turn</th><th>Letztes Lebenszeichen</th><th>Aufgabe</th><th>Bedarf</th></tr></thead><tbody>
          {workers.map(worker => <tr key={worker.id}><th scope="row">{worker.id}</th><td>{worker.turnState ?? worker.presence}</td><td>{age(worker.lastHeartbeat)}</td>
            <td>{worker.task ? `${worker.task.id}: ${worker.task.title}` : 'Keine aktive Aufgabe'}</td><td>{worker.unread ? `${worker.unread} neue Nachricht(en)` : worker.leases.length ? `${worker.leases.length} Claim(s)` : '—'}</td></tr>)}
        </tbody></table></div> : <p>Die Brain-Projektion enthält derzeit keine cx01–cx15-Worker.</p>}
      </section>
      <section className="pb-domain-card"><h3>Queue und letzte Ereignisse</h3>
        <p>{data.tasks.length} Queue-Aufgaben · {data.turns.length} gespeicherte Turns · {data.messages.length} Nachrichten · {data.approvals.length} Freigaben</p>
        {!data.historyAvailable && <p className="pb-domain-note">Ältere Turns sind in dieser Brain-Version nicht vollständig gespeichert.</p>}
        {data.tasks.length ? <ul className="pb-domain-list">{data.tasks.slice(0, 12).map(task => <li key={task.id}><strong>{task.state}</strong><span>{task.id}: {task.title} · {task.claimed_by ?? task.addressed_to ?? 'nicht zugewiesen'}</span></li>)}</ul> : <p>Die Brain-Queue ist leer.</p>}
      </section>
      <section className="pb-domain-card"><h3>Supervisor-Belege</h3>
        <p>HALT-Zustand, Aussetzer, utilization.log und Morgenbericht sind noch nicht über eine authentifizierte UI-Projektion angebunden. Diese Bereiche werden deshalb als nicht verfügbar angezeigt.</p>
        <ul><li>HALT-Status: nicht über die API verfügbar</li><li>fleetd utilization.log: nicht über die API verfügbar</li><li>Aussetzer und Morgenbericht: nicht über die API verfügbar</li></ul>
      </section>
    </>}
  </section>
}
