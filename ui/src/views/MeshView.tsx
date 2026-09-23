import { useEffect, useMemo, useState } from 'react'
import { fetchMeshTimeline } from '../lib/brain-client'
import type { MeshNode, MeshSnapshot, MeshTimelineEntry } from '../types'

interface MeshViewProps {
  mesh: MeshSnapshot | null
  workspaceId?: string
  onSelectFile?: (path: string) => void
  /** A linked knowledge record can focus a trace-backed agent run. */
  focusAgentId?: string | null
}

const KIND_LABEL: Record<MeshNode['kind'], string> = {
  agent: 'Agent', task: 'Aufgabe', worker: 'Worker', worktree: 'Worktree',
  file: 'Datei', artifact: 'Artefakt', route: 'Route',
}

const PROVENANCE_LABEL: Record<MeshNode['provenance'], string> = {
  live: 'Live-Ereignis',
  recovered: 'wiederhergestelltes Ereignis',
  'historical-import': 'historischer Import',
}

function formatTime(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
}

function workerProof(node: MeshNode): string | null {
  if (node.kind !== 'worker') return null
  switch (node.proof) {
    case 'process-started':
      return 'Start im Trace beobachtet — keine Aussage über den aktuellen Prozesszustand.'
    case 'finished':
      return 'Abschluss im Trace beobachtet.'
    case 'proof-unavailable':
      return 'Kein beobachteter Prozessstart; dieser Worker wird nicht als laufend dargestellt.'
    default:
      return 'Kein Prozessbeweis vorhanden.'
  }
}

function timelineFilter(node: MeshNode): { agentId?: string; taskId?: string; workerId?: string } | null {
  const rawId = node.id.slice(node.id.indexOf(':') + 1)
  if (node.kind === 'agent') return { agentId: rawId }
  if (node.kind === 'task') return { taskId: rawId }
  if (node.kind === 'worker') return { workerId: rawId }
  return null
}

function nodeName(nodes: MeshNode[], id: string): string {
  return nodes.find(node => node.id === id)?.label ?? id
}

/**
 * A read-only rendering of the Core's trace-backed Mesh projection.
 *
 * This view intentionally contains no canvas, simulated fleet, registry
 * presence, or historical activity fallback. A blank projection is evidence
 * that the current workspace has no observed trace activity, not a rendering
 * failure to conceal with invented agents.
 */
export default function MeshView({ mesh, workspaceId, onSelectFile, focusAgentId }: MeshViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [timeline, setTimeline] = useState<MeshTimelineEntry[]>([])
  const [timelineLoading, setTimelineLoading] = useState(false)
  const [timelineError, setTimelineError] = useState('')

  const selected = useMemo(
    () => mesh?.nodes.find(node => node.id === selectedId) ?? null,
    [mesh, selectedId],
  )

  useEffect(() => {
    if (!focusAgentId) return
    const id = `agent:${focusAgentId}`
    if (mesh?.nodes.some(node => node.id === id)) setSelectedId(id)
  }, [focusAgentId, mesh])

  useEffect(() => {
    if (selectedId !== null && selected === null) setSelectedId(null)
  }, [selected, selectedId])

  useEffect(() => {
    const filter = selected ? timelineFilter(selected) : null
    if (!workspaceId || filter === null) {
      setTimeline([])
      setTimelineError('')
      setTimelineLoading(false)
      return
    }

    let alive = true
    setTimelineLoading(true)
    setTimelineError('')
    void fetchMeshTimeline(workspaceId, { ...filter, limit: 12 })
      .then(entries => {
        if (alive) setTimeline(entries)
      })
      .catch(() => {
        if (alive) {
          setTimeline([])
          setTimelineError('Die Trace-Zeitleiste ist derzeit nicht verfügbar.')
        }
      })
      .finally(() => {
        if (alive) setTimelineLoading(false)
      })
    return () => { alive = false }
  }, [selected, workspaceId])

  if (!workspaceId) {
    return (
      <section className="mesh-trace mesh-trace--empty" aria-live="polite">
        <h2>Agent Mesh</h2>
        <p>Wähle einen registrierten Workspace. Ohne Workspace kann keine Trace-Projektion behauptet werden.</p>
      </section>
    )
  }

  if (mesh === null || mesh.workspaceId !== workspaceId) {
    return (
      <section className="mesh-trace mesh-trace--empty" aria-live="polite">
        <h2>Agent Mesh</h2>
        <p>Die Core-Trace-Projektion ist für diesen Workspace noch nicht verfügbar.</p>
        <p className="mesh-trace__muted">Es werden weder Registry-Einträge noch historische Aktivitätszähler als Ersatz angezeigt.</p>
      </section>
    )
  }

  const empty = mesh.nodes.length === 0 && mesh.edges.length === 0
  if (empty) {
    return (
      <section className="mesh-trace mesh-trace--empty" aria-live="polite">
        <h2>Agent Mesh</h2>
        <p>Für diesen Workspace wurde noch keine trace-gestützte Arbeit beobachtet.</p>
        <p className="mesh-trace__muted">Keine simulierten Agenten, keine Roster-Fallbacks und kein daraus abgeleiteter Prozessstatus.</p>
      </section>
    )
  }

  return (
    <section className="mesh-trace" aria-label="Trace-backed Agent Mesh">
      <header className="mesh-trace__header">
        <div>
          <h2>Agent Mesh <span>Trace-backed</span></h2>
          <p>Jeder Knoten und jede Kante stammt aus einem autoritätsbestätigten Trace-Ereignis.</p>
        </div>
        <dl className="mesh-trace__totals">
          <div><dt>Knoten</dt><dd>{mesh.totals.nodes ?? mesh.nodes.length}</dd></div>
          <div><dt>Kanten</dt><dd>{mesh.totals.edges ?? mesh.edges.length}</dd></div>
          <div><dt>ohne Startbeweis</dt><dd>{mesh.unprovenWorkers.length}</dd></div>
        </dl>
      </header>

      {mesh.unprovenWorkers.length > 0 && (
        <aside className="mesh-trace__notice" aria-label="Unproven workers">
          <strong>Unbelegte Worker werden nicht als laufend angezeigt.</strong>
          <ul>
            {mesh.unprovenWorkers.map(worker => (
              <li key={worker.workerId}>
                <code>{worker.workerId}</code>{worker.taskId ? <> · Aufgabe <code>{worker.taskId}</code></> : ''} — {worker.reason}
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mesh-trace__grid">
        <section className="mesh-trace__panel" aria-label="Trace nodes">
          <h3>Knoten <span>{mesh.nodes.length}</span></h3>
          <ol className="mesh-trace__nodes">
            {mesh.nodes.map(node => {
              const proof = workerProof(node)
              const selectedNode = node.id === selectedId
              return (
                <li key={node.id}>
                  <button
                    type="button"
                    className={selectedNode ? 'mesh-trace__node is-selected' : 'mesh-trace__node'}
                    onClick={() => setSelectedId(node.id)}
                    aria-pressed={selectedNode}
                  >
                    <span className="mesh-trace__kind">{KIND_LABEL[node.kind]}</span>
                    <span className="mesh-trace__label" title={node.label}>{node.label}</span>
                    <span className="mesh-trace__events">{node.eventCount} Ereignis{node.eventCount === 1 ? '' : 'se'}</span>
                    <span className="mesh-trace__provenance" title="Ereignis-Provenienz, nicht aktueller Prozessstatus">
                      {PROVENANCE_LABEL[node.provenance]}
                    </span>
                    {proof && <span className="mesh-trace__proof">{proof}</span>}
                  </button>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="mesh-trace__panel" aria-label="Trace edges">
          <h3>Kanten <span>{mesh.edges.length}</span></h3>
          <ol className="mesh-trace__edges">
            {mesh.edges.map(edge => (
              <li key={edge.id}>
                <span className="mesh-trace__edge-kind">{edge.kind}</span>
                <span title={edge.from}>{nodeName(mesh.nodes, edge.from)}</span>
                <span aria-hidden="true">→</span>
                <span title={edge.to}>{nodeName(mesh.nodes, edge.to)}</span>
                <small>{edge.count} Ereignis{edge.count === 1 ? '' : 'se'} · Belege: {edge.evidence.join(', ')}</small>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {selected && (
        <aside className="mesh-trace__detail" aria-label={'Details for ' + selected.label}>
          <div className="mesh-trace__detail-head">
            <div>
              <span className="mesh-trace__kind">{KIND_LABEL[selected.kind]}</span>
              <h3>{selected.label}</h3>
            </div>
            <button type="button" onClick={() => setSelectedId(null)} aria-label="Detailansicht schließen">×</button>
          </div>
          <dl>
            <div><dt>Erstmals</dt><dd>{formatTime(selected.firstSeen)}</dd></div>
            <div><dt>Zuletzt</dt><dd>{formatTime(selected.lastSeen)}</dd></div>
            <div><dt>Provenienz</dt><dd>{PROVENANCE_LABEL[selected.provenance]}</dd></div>
            {workerProof(selected) && <div><dt>Worker-Beweis</dt><dd>{workerProof(selected)}</dd></div>}
            {Object.entries(selected.detail).map(([key, value]) => (
              <div key={key}><dt>{key}</dt><dd>{value ?? '—'}</dd></div>
            ))}
          </dl>
          {selected.kind === 'file' && onSelectFile && (
            <button type="button" className="mesh-trace__source" onClick={() => onSelectFile(selected.label)}>
              Datei im Source-View öffnen
            </button>
          )}
          <section className="mesh-trace__timeline" aria-label="Trace timeline">
            <h4>Beobachtete Ereignisse</h4>
            {timelineLoading && <p>Lade Trace-Ereignisse …</p>}
            {timelineError && <p role="status">{timelineError}</p>}
            {!timelineLoading && !timelineError && timeline.length === 0 && (
              <p>Für diesen Knotentyp gibt es keine gefilterte Zeitleiste.</p>
            )}
            <ol>
              {timeline.map(entry => (
                <li key={entry.eventId}>
                  <code>{entry.type}</code> <time dateTime={entry.occurredAt}>{formatTime(entry.occurredAt)}</time>
                  <span>{entry.summary}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      )}
    </section>
  )
}
