import { useEffect, useMemo, useState } from 'react'
import type { SwarmMessage, SwarmSnapshot, SwarmTurn, SwarmWorker } from '../types'
import { approveAgentCommit, enqueueSwarmTask, getStoredAgentId, sendSwarmMessage, type HostResources } from '../lib/brain-client'
import { contactInWindow, isTurnStill, isWorkerStill, percentAt, staleDuration, sortTimelineWorkers, timelineBucket, timelineCounts, turnColor, workerMatchesFilters } from '../lib/turn-timeline'

type Span = { id: string; agentId: string; taskId: string | null; startedAt: string; endedAt: string | null; state: string | null; summary: string | null; legacy?: boolean }
const ZOOMS = [{ label: '1 Std.', hours: 1 }, { label: '6 Std.', hours: 6 }, { label: '24 Std.', hours: 24 }]
const STATE_LABEL: Record<string, string> = {
  working: 'Läuft', 'needs-task': 'Braucht Aufgabe', 'awaiting-commit': 'Wartet auf Freigabe',
  'commit-approved': 'Freigegeben', blocked: 'Blockiert', paused: 'Pausiert', offline: 'Offline',
}

export default function TurnsView({ workspaceId, data, resources, onRefresh }: {
  workspaceId: string; data: SwarmSnapshot | null; resources: HostResources | null; onRefresh: () => void
}) {
  const [zoom, setZoom] = useState(6)
  const [scrub, setScrub] = useState(100)
  const [clock, setClock] = useState(Date.now())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [composer, setComposer] = useState<'message' | 'task' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [busy, setBusy] = useState(false)
  const [approving, setApproving] = useState(false)
  const [filters, setFilters] = useState<Set<'working' | 'awaiting' | 'still' | 'unread'>>(() => new Set())
  const [restingOpen, setRestingOpen] = useState(false)

  useEffect(() => { const timer = window.setInterval(() => setClock(Date.now()), 30_000); return () => clearInterval(timer) }, [])

  const workers = useMemo(() => data?.board.agents ?? [], [data])
  const spans = useMemo(() => {
    if (!data) return []
    const rows: Span[] = data.turns.map((turn: SwarmTurn) => ({ ...turn }))
    const byAgent = new Set(rows.filter(row => row.endedAt === null).map(row => row.agentId))
    for (const worker of workers) {
      if (worker.turnState === 'working' && worker.turnStateAt && !byAgent.has(worker.id)) rows.push({
        id: `current-${worker.id}`, agentId: worker.id, taskId: worker.task?.id ?? null,
        startedAt: worker.turnStateAt, endedAt: null, state: 'working', summary: worker.turnSummary,
        legacy: true,
      })
    }
    return rows
  }, [data, workers])

  const selected = useMemo(() => spans.find(turn => turn.id === selectedId) ?? null, [spans, selectedId])
  const selectedWorker = selected ? workers.find(worker => worker.id === selected.agentId) ?? null : null
  const selectedTask = selected?.taskId ? data?.tasks.find(task => task.id === selected.taskId) ?? null : null
  const actorId = getStoredAgentId()
  const selectedQuota = selectedWorker?.account ? resources?.quotas.find(quota => quota.account === selectedWorker.account) : null
  const profileTurns = spans.filter(span => span.legacy).length
  const end = clock - ((100 - scrub) / 100) * zoom * 60 * 60_000
  const start = end - zoom * 60 * 60_000
  const orderedWorkers = sortTimelineWorkers(workers, start, end, clock)
  const counts = timelineCounts(workers, start, end, clock)
  const visibleWorkers = orderedWorkers.filter(worker => timelineBucket(worker, start, end, clock) !== 'resting'
    && workerMatchesFilters(worker, filters, start, end, clock))
  const restingWorkers = orderedWorkers.filter(worker => timelineBucket(worker, start, end, clock) === 'resting')
  const matchingResting = restingWorkers.filter(worker => workerMatchesFilters(worker, filters, start, end, clock))
  const buckets = ['blocked', 'still', 'awaiting-commit', 'working', 'needs-task'] as const
  const workerIndex = new Map(visibleWorkers.map((worker, index) => [worker.id, index]))

  const toggleFilter = (filter: 'working' | 'awaiting' | 'still' | 'unread') => {
    setFilters(current => {
      const next = new Set(current)
      if (next.has(filter)) next.delete(filter)
      else next.add(filter)
      return next
    })
  }

  const renderWorker = (worker: SwarmWorker, index: number) => {
    const bucket = timelineBucket(worker, start, end, clock)
    const workerSpans = spans.filter(span => span.agentId === worker.id && contactInWindow(worker, start, end)
      && Date.parse(span.startedAt) <= end && (span.endedAt === null || Date.parse(span.endedAt) >= start))
    const claims = worker.leases.filter(lease => Date.parse(lease.createdAt) <= end && Date.parse(lease.expiresAt) >= start)
    const messages = messagesFor(worker.id).filter(message => Date.parse(message.createdAt) >= start && Date.parse(message.createdAt) <= end)
    const approvals = approvalsFor(worker.id).filter(approval => Date.parse(approval.approvedAt) >= start && Date.parse(approval.approvedAt) <= end)
    const stale = isWorkerStill(worker, clock)
    const expired = worker.turnState === 'working' && !contactInWindow(worker, start, end)
    return <div className="turns-lane" key={worker.id} data-priority={bucket}>
      <div className="turns-worker"><strong>{worker.name}</strong><span>{worker.surface ?? 'Oberfläche offen'} · {worker.model ?? 'Modell offen'}</span>
        <small>{expired ? `Zustand veraltet seit ${staleDuration(worker.lastHeartbeat, clock)}` : stale ? `still? seit ${staleDuration(worker.lastHeartbeat, clock)}` : worker.turnState ? STATE_LABEL[worker.turnState] ?? worker.turnState : 'Kein Turn-Status'}</small></div>
      <div className="turns-track" style={{'--row': index} as React.CSSProperties}>
        {Array.from({ length: 6 }, (_, i) => <i className="turns-gridline" key={i} style={{left: `${i * 20}%`}} />)}
        {workerSpans.map(span => {
          const left = percentAt(span.startedAt, start, end)
          const right = span.endedAt ? percentAt(span.endedAt, start, end) : 100
          const state = span.endedAt ? span.state : 'working'
          return <button type="button" id={`turn-${span.id}`} key={span.id} className="turns-block" data-state={turnColor(state)} data-still={stale ? 'true' : undefined} data-selected={selectedId === span.id ? 'true' : undefined} style={{left: `${left}%`, width: `${Math.max(0.65, right - left)}%`}} onClick={() => { setSelectedId(span.id); setComposer(null); setFeedback('') }} aria-label={`${worker.name}, ${STATE_LABEL[state ?? ''] ?? 'laufend'}${stale ? ', still?' : ''}`} title={`${span.taskId ?? 'Ohne Aufgabe'} · ${new Date(span.startedAt).toLocaleString()}${stale ? ` · still? seit ${staleDuration(worker.lastHeartbeat, clock)}` : ''}`}>
            {stale && <span className="turns-still">still? seit {staleDuration(worker.lastHeartbeat, clock)}</span>}
          </button>
        })}
        {claims.map(claim => <i key={claim.id} className="turns-claim" style={{left: `${percentAt(claim.createdAt, start, end)}%`, width: `${Math.max(.8, percentAt(claim.expiresAt, start, end) - percentAt(claim.createdAt, start, end))}%`}} title={`Claim: ${claim.paths.join(', ')}`} />)}
        {messages.map(message => <button type="button" key={message.id} className="turns-mark turns-mark--message" style={{left: `${percentAt(message.createdAt, start, end)}%`}} onClick={() => { const span = spans.find(item => item.agentId === worker.id); if (span) setSelectedId(span.id) }} aria-label={`Nachricht ${message.fromAgent} an ${message.toAgent ?? 'alle'}: ${message.subject}`} title={`${message.fromAgent} → ${message.toAgent ?? 'alle'}: ${message.subject}`} />)}
        {approvals.map(approval => <button type="button" key={approval.id} className="turns-mark turns-mark--approval" style={{left: `${percentAt(approval.approvedAt, start, end)}%`}} onClick={() => { const span = spans.find(item => item.agentId === worker.id); if (span) setSelectedId(span.id) }} aria-label={`Freigabe von ${approval.byAgent}`} title={`Freigabe von ${approval.byAgent}`} />)}
      </div>
    </div>
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches('input,textarea,select,[contenteditable=true]')) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Enter') return
      const list = spans.filter(span => Date.parse(span.startedAt) <= end && (span.endedAt === null || Date.parse(span.endedAt) >= start))
      if (list.length === 0) return
      if (event.key === 'Enter') { if (selectedId) { event.preventDefault(); document.getElementById(`turn-${selectedId}`)?.focus() } return }
      event.preventDefault()
      const current = list.findIndex(span => span.id === selectedId)
      const step = event.key === 'ArrowRight' ? 1 : -1
      const next = list[(current + step + list.length) % list.length]
      if (next) setSelectedId(next.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [end, selectedId, spans, start])

  if (!data) return <section className="turns-empty" role="status">Fleet-Daten werden geladen oder sind nicht erreichbar.</section>

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedWorker) return
    const form = new FormData(event.currentTarget)
    setBusy(true); setFeedback('')
    try {
      if (composer === 'message') await sendSwarmMessage({
        workspace: workspaceId, fromAgent: actorId,
        toAgent: String(form.get('toAgent') ?? ''), subject: String(form.get('subject') ?? ''), body: String(form.get('body') ?? ''),
      })
      else if (composer === 'task') {
        const title = String(form.get('title') ?? '').trim()
        const duplicate = data.tasks.find(task =>
          (task.state === 'pending' || task.state === 'claimed')
          && task.addressed_to === selectedWorker.id
          && task.title.trim().toLocaleLowerCase() === title.toLocaleLowerCase(),
        )
        if (duplicate) {
          setFeedback(`Nicht eingereiht: ${duplicate.id} ist bereits ${duplicate.state} für ${selectedWorker.id} („${duplicate.title}“). Prüfe die bestehende Aufgabe in der Queue.`)
          return
        }
        const task = await enqueueSwarmTask({
          workspace: workspaceId, requestedBy: actorId, addressedTo: selectedWorker.id,
          title, body: String(form.get('body') ?? ''),
        })
        setComposer(null)
        setFeedback(`Brain-Aufgabe ${task.id} · ${task.state} · an ${selectedWorker.id}`)
        onRefresh()
        return
      }
      setComposer(null); setFeedback('Gespeichert.'); onRefresh()
    } catch (error) { setFeedback(error instanceof Error ? error.message : 'Aktion fehlgeschlagen.') }
    finally { setBusy(false) }
  }

  const approveCommit = async () => {
    if (!selectedWorker || selectedWorker.turnState !== 'awaiting-commit') return
    setApproving(true); setFeedback('')
    try {
      await approveAgentCommit({ workspaceId, agentId: selectedWorker.id, by: actorId })
      setFeedback(`Commit für ${selectedWorker.id} freigegeben.`)
      onRefresh()
    } catch (error) { setFeedback(error instanceof Error ? error.message : 'Commit-Freigabe fehlgeschlagen.') }
    finally { setApproving(false) }
  }

  const messagesFor = (agentId: string): SwarmMessage[] => data.messages.filter(message => message.fromAgent === agentId || message.toAgent === agentId)
  const approvalsFor = (agentId: string) => data.approvals.filter(approval => approval.agentId === agentId)
  const tickLabels = Array.from({ length: 7 }, (_, index) => new Date(start + (zoom * 60 * 60_000 * index / 6)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

  return <section className="turns-view" aria-label="Agenten-Turn-Zeitleiste">
    <header className="turns-toolbar">
      <div><h2>Turns</h2><p>Agenten, Aufgaben und Übergaben nach tatsächlichem Brain-Stand</p></div>
      <div className="turns-zoom" aria-label="Zeitfenster">
        {ZOOMS.map(item => <button type="button" key={item.hours} aria-pressed={zoom === item.hours} onClick={() => { setZoom(item.hours); setScrub(100) }}>{item.label}</button>)}
        <button type="button" onClick={onRefresh}>Aktualisieren</button>
      </div>
    </header>

    <div className="turns-summary" aria-label="Fleet-Zusammenfassung">
      <button type="button" aria-pressed={filters.has('working')} onClick={() => toggleFilter('working')}>{counts.working} arbeiten</button>
      <button type="button" aria-pressed={filters.has('awaiting')} onClick={() => toggleFilter('awaiting')}>{counts.awaiting} warten auf Freigabe</button>
      <button type="button" aria-pressed={filters.has('still')} onClick={() => toggleFilter('still')}>{counts.still} still?</button>
      <button type="button" aria-pressed={filters.has('unread')} onClick={() => toggleFilter('unread')}>{counts.unread} ungelesen</button>
    </div>

    <p className="turns-history-note" role="status">Turn-Paare werden ab diesem Upgrade gespeichert. Ältere Starts und Enden wurden nicht erfasst; laufende Profile ohne Turn-Eintrag sind separat markiert.</p>
    <div className="turns-key" aria-label="Zeitleisten-Legende">
      {['working','needs-task','awaiting-commit','blocked','paused'].map(state => <span key={state}><i data-state={turnColor(state)} />{STATE_LABEL[state]}</span>)}
      <span><i data-mark="claim" />Claim</span><span><i data-mark="message" />Nachricht</span><span><i data-mark="approval" />Freigabe</span>
    </div>

    <label className="turns-scrubber">Zeitpunkt durchsuchen
      <input aria-label="Zeitpunkt durchsuchen" type="range" min="0" max="100" value={scrub} onChange={event => setScrub(Number(event.target.value))} />
      <span>{new Date(end).toLocaleString()}</span>
    </label>

    <div className="turns-layout">
      <div className="turns-scroll" aria-label="Worker-Spuren">
        <div className="turns-ruler"><span>Konto / Worker</span><div>{tickLabels.map((label, index) => <span key={index}>{label}</span>)}</div></div>
        {visibleWorkers.length === 0 && restingWorkers.length === 0 && <p className="turns-empty">Keine registrierten Worker in diesem Workspace.</p>}
        {buckets.map(bucket => {
          const bucketWorkers = visibleWorkers.filter(worker => timelineBucket(worker, start, end, clock) === bucket)
          if (bucketWorkers.length === 0) return null
          return <section className="turns-priority" key={bucket} data-priority={bucket}>
            <h3>{bucket === 'still' ? 'still?' : STATE_LABEL[bucket] ?? bucket}</h3>
            {Array.from(new Set(bucketWorkers.map(worker => worker.account ?? 'Ohne Konto'))).map(account => <section className="turns-account" key={account}>
              <h4>{account}</h4>
              {bucketWorkers.filter(worker => (worker.account ?? 'Ohne Konto') === account).map(worker => renderWorker(worker, workerIndex.get(worker.id) ?? 0))}
            </section>)}
          </section>
        })}
        {restingWorkers.length > 0 && <section className="turns-resting">
          <button className="turns-resting__toggle" type="button" aria-expanded={restingOpen || (filters.size > 0 && matchingResting.length > 0)} onClick={() => setRestingOpen(value => !value)}>
            {restingWorkers.length} ruhende Worker {restingOpen ? '−' : '+'}
          </button>
          {(restingOpen || (filters.size > 0 && matchingResting.length > 0)) && <div>
            {restingWorkers.filter(worker => filters.size === 0 || matchingResting.includes(worker)).map((worker, index) => <div className="turns-resting__worker" key={worker.id}>
              <strong>{worker.name}</strong><span>{worker.turnState === 'working' ? `Zustand veraltet seit ${staleDuration(worker.lastHeartbeat, clock)}` : STATE_LABEL[worker.turnState ?? ''] ?? worker.turnState ?? 'Kein Status'} · {worker.unread} ungelesen</span>
              {worker.turnState === 'working' && <i className="turns-stale-hatch" aria-label="Veralteter Status" />}
            </div>)}
          </div>}
        </section>}
      </div>

      <aside className="turns-detail" aria-label="Turn-Details" aria-live="polite">
        {selected && selectedWorker ? <>
          <div className="turns-detail__head"><div><span>TURN</span><h3>{selectedWorker.name}</h3></div><button type="button" onClick={() => setSelectedId(null)} aria-label="Details schließen">Schließen</button></div>
          <dl><dt>Zustand</dt><dd><span className="turns-state" data-state={turnColor(selected.endedAt ? selected.state : 'working')}>{selected.endedAt ? STATE_LABEL[selected.state ?? ''] ?? selected.state : 'Läuft'}</span>{isTurnStill(selectedWorker.lastHeartbeat, selected.endedAt, clock) && <b className="turns-still-label">still? seit {staleDuration(selectedWorker.lastHeartbeat, clock)}</b>}</dd>
            <dt>Beginn</dt><dd>{new Date(selected.startedAt).toLocaleString()}</dd><dt>Ende</dt><dd>{selected.endedAt ? new Date(selected.endedAt).toLocaleString() : 'Noch offen'}</dd>
            <dt>Aufgabe</dt><dd>{selectedTask?.title ?? selectedWorker.task?.title ?? selected.taskId ?? 'Keine aktuelle Aufgabe'}</dd>
            <dt>Handlungsbedarf</dt><dd>{selectedWorker.attention?.length ? selectedWorker.attention.join(', ') : 'Keiner gemeldet'}</dd>
            <dt>Kontingent</dt><dd>{selectedQuota ? `${selectedQuota.remaining} ${selectedQuota.unit}${selectedQuota.resetsAt ? ` · Reset ${new Date(selectedQuota.resetsAt).toLocaleString()}` : ''}` : selectedWorker.account ? `Für ${selectedWorker.account} kein Kontingent gemeldet` : 'Konto nicht bekannt'}</dd>
            {selectedTask?.body && <><dt>Aufgabenbeschreibung</dt><dd>{selectedTask.body}</dd></>}
            <dt>Zusammenfassung</dt><dd>{selected.summary ?? selectedWorker.turnSummary ?? 'Keine Zusammenfassung gespeichert.'}</dd>
          </dl>
          {selected.legacy && <p className="turns-history-note">Dieser laufende Status stammt aus dem Worker-Profil; die Start-/Ende-Paarung liegt noch nicht in der neuen Historie.</p>}
          <h4>Claims</h4><ul>{selectedWorker.leases.length ? selectedWorker.leases.flatMap(lease => lease.paths.map(path => <li key={`${lease.id}:${path}`}>{path}</li>)) : <li>Keine aktiven Claims.</li>}</ul>
          <h4>Nachrichten dieses Workers</h4><ul>{messagesFor(selected.agentId).slice(-8).map(message => <li key={message.id}><b>{message.fromAgent} → {message.toAgent ?? 'alle'}</b><span>{message.subject} · {message.readAt ? 'quittiert' : message.deliveredAt ? 'zugestellt' : 'offen'}</span></li>)}</ul>
          <h4>Branch / Commit</h4><ul>{selectedWorker.worktrees.length ? selectedWorker.worktrees.map(tree => <li key={tree.path}><b>{tree.branch ?? 'Branch nicht lesbar'} · {tree.head ?? 'Commit nicht lesbar'}</b><span>{tree.path}</span></li>) : <li>Kein Worktree registriert.</li>}</ul>
          <div className="turns-actions"><button type="button" onClick={() => { setComposer(composer === 'message' ? null : 'message'); setFeedback('') }}>Nachricht senden</button><button type="button" onClick={() => { setComposer(composer === 'task' ? null : 'task'); setFeedback('') }}>Aufgabe einreihen</button>
            {selectedWorker.turnState === 'awaiting-commit' && <button type="button" disabled={approving} onClick={() => void approveCommit()}>{approving ? 'Gebe frei …' : `Commit für ${selectedWorker.id} freigeben`}</button>}
          </div>
          {composer && <form className="turns-composer" onSubmit={submitAction}>
            <h4>{composer === 'message' ? 'Nachricht an Worker' : 'Aufgabe einreihen'}</h4>
            {composer === 'message' ? <><label>Absender (Shell-Profil)<input value={actorId} readOnly /></label><label>Empfänger-ID<input name="toAgent" required /></label><label>Betreff<input name="subject" required /></label><label>Nachricht<textarea name="body" required /></label></> : <><p>Auftraggeber (Shell-Profil): <strong>{actorId}</strong> · Ziel-Lane: <strong>{selectedWorker.id}</strong></p><label>Titel<input name="title" required /></label><label>Beschreibung<textarea name="body" /></label></>}
            <button type="submit" disabled={busy}>{busy ? 'Wird gesendet …' : 'Senden'}</button>
          </form>}
          {feedback && <p role="status">{feedback}</p>}
        </> : <div className="turns-detail__empty"><h3>Turn auswählen</h3><p>Wähle einen Block, um Zusammenfassung, Claims, Nachrichten, Branch und Commit zu sehen.</p><p>Pfeiltasten wechseln zwischen sichtbaren Turns, Enter fokussiert den ausgewählten Turn.</p>
          <p>{data.turns.length} gespeicherte Turns · {profileTurns} laufende Profilstatus · {workers.length} Worker · {data.messages.length} Nachrichten · {data.approvals.length} Freigaben</p>
        </div>}
      </aside>
    </div>
  </section>
}
