import { useCallback, useEffect, useState } from 'react'
import { fetchPlan } from '../lib/brain-client'

export default function PlanView({ workspaceId }: { workspaceId: string }) {
  const [plan, setPlan] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState('')
  const refresh = useCallback(async () => {
    try { setPlan(await fetchPlan(workspaceId)); setError('') }
    catch (cause) { setPlan(null); setError(cause instanceof Error ? cause.message : String(cause)) }
  }, [workspaceId])
  useEffect(() => { void refresh() }, [refresh])
  const progress = plan?.progress
  return <section className="pb-domain-view" aria-label="Plan und Master">
    <header className="pb-view-header"><h2>Plan / Master</h2><p>Projektion aus dem Master-Ledger und der Brain-Queue</p>
      <button className="pb-button pb-button--primary" type="button" onClick={() => void refresh()}>Plan aktualisieren</button>
    </header>
    {error && <p className="pb-domain-error" role="alert">Plan nicht verfügbar: {error}</p>}
    {!plan && !error && <p role="status">Plan-Daten werden geladen …</p>}
    {plan && <>
      <section className="pb-domain-card"><h3>{plan.ledger?.master ?? 'Master-Ledger'}</h3>
        <p>Stand: {plan.ledger?.updated ?? 'unbekannt'} · {plan.ledger?.ageHours == null ? 'Alter unbekannt' : `${plan.ledger.ageHours.toFixed(1)} Stunden alt`} · Gesamtstatus: {plan.ledger?.statusOverall ?? 'nicht gesetzt'}</p>
        <div className="pb-metric-grid"><article><strong>{progress?.tasksDone ?? 0} / {progress?.tasksTotal ?? 0}</strong><span>Aufgaben abgeschlossen</span></article><article><strong>{progress?.tasksInProgress ?? 0}</strong><span>in Arbeit</span></article><article><strong>{progress?.gatesVerified ?? 0} / {progress?.gatesTotal ?? 0}</strong><span>Gates verifiziert</span></article><article><strong>{progress?.gatesPartial ?? 0}</strong><span>teilweise verifiziert</span></article></div>
      </section>
      <section className="pb-domain-card"><h3>Nächste startbare Master-Aufgaben</h3>
        {plan.next?.length ? <ol className="pb-domain-list">{plan.next.map((task: any) => <li key={task.id}><strong>{task.id} · {task.status}</strong><span>{task.title} {task.queue?.length ? `· Queue: ${task.queue.map((q: any) => q.taskId).join(', ')}` : ''}</span></li>)}</ol> : <p>Das Ledger meldet aktuell keine startbaren Aufgaben.</p>}
      </section>
      <section className="pb-domain-card"><h3>Gates</h3>
        {plan.gates?.length ? <ul className="pb-domain-list">{plan.gates.map((gate: any) => <li key={gate.id}><strong>{gate.id} · {gate.status}</strong><span>{gate.title} · {gate.owner ?? 'ohne Owner'}</span></li>)}</ul> : <p>Das Ledger enthält keine Gate-Einträge.</p>}
      </section>
      <section className="pb-domain-card"><h3>Fortschrittsdimensionen und offene Entscheidungen</h3>
        {plan.dimensions?.length ? <ul>{plan.dimensions.map((item: any) => <li key={item.dimension}><strong>{item.dimension}:</strong> {item.current}</li>)}</ul> : <p>Keine Fortschrittsdimensionen im Ledger.</p>}
        {plan.openDecisions?.length ? <ul>{plan.openDecisions.map((item: any) => <li key={item.ref}><strong>{item.ref}:</strong> {item.decision}</li>)}</ul> : <p>Keine offenen Entscheidungen im Ledger.</p>}
        {plan.unplanned?.length > 0 && <p>{plan.unplanned.length} Queue-Aufgabe(n) ohne Master-Referenz.</p>}
      </section>
    </>}
  </section>
}
