import { useEffect, useMemo, useState } from 'react'
import { fetchNoteGraph, type NoteGraph, type NoteGraphNode } from '../lib/brain-client'

/**
 * The accessible counterpart to a knowledge graph.  It deliberately renders
 * the same bounded node set as buttons: canvas/WebGL are optional views, but
 * browsing and inspecting relationships must work with keyboard alone.
 */
export default function KnowledgeGraphView({ workspaceId, focus, onOpenNote }: {
  workspaceId: string
  focus?: string
  onOpenNote: (path: string) => void
}) {
  const [depth, setDepth] = useState(1)
  const [limit, setLimit] = useState(120)
  const [graph, setGraph] = useState<NoteGraph | null>(null)
  const [selected, setSelected] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    let live = true
    setError('')
    void fetchNoteGraph(workspaceId, { focus, depth, limit })
      .then(next => { if (live) { setGraph(next); setSelected(0) } })
      .catch(cause => { if (live) { setGraph(null); setError(cause instanceof Error ? cause.message : String(cause)) } })
    return () => { live = false }
  }, [workspaceId, focus, depth, limit])

  const rows = useMemo(() => (graph?.nodes ?? []).slice().sort((a, b) =>
    Number(b.focus) - Number(a.focus) || b.inLinks + b.outLinks - (a.inLinks + a.outLinks) || a.path.localeCompare(b.path)), [graph])
  const current = rows[selected] ?? null
  const related = useMemo(() => !current || !graph ? [] : graph.edges
    .filter(edge => edge.source === current.id || edge.target === current.id)
    .map(edge => rows.find(row => row.id === (edge.source === current.id ? edge.target : edge.source)))
    .filter((node): node is NoteGraphNode => node !== undefined), [current, graph, rows])

  const move = (step: number): void => setSelected(value => Math.max(0, Math.min(rows.length - 1, value + step)))
  const onKeys = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (!rows.length) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); move(1) }
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    else if (event.key === 'Home') { event.preventDefault(); setSelected(0) }
    else if (event.key === 'End') { event.preventDefault(); setSelected(rows.length - 1) }
    else if (event.key === 'Enter' && current) { event.preventDefault(); onOpenNote(current.path) }
  }

  return <section className="knowledge-graph" aria-label="Wissensgraph" onKeyDown={onKeys} tabIndex={0}>
    <header className="knowledge-graph__head">
      <div><h2>Wissensgraph</h2><p>Aus den indizierten Wiki-Links; keine berechneten Ersatzknoten.</p></div>
      <label>Tiefe <select value={depth} onChange={event => setDepth(Number(event.target.value))}><option value={0}>Nur Fokus</option><option value={1}>1 Hop</option><option value={2}>2 Hops</option><option value={3}>3 Hops</option></select></label>
      <label>LOD <select value={limit} onChange={event => setLimit(Number(event.target.value))}><option value={60}>Kompakt (60)</option><option value={120}>Standard (120)</option><option value={300}>Detail (300)</option></select></label>
    </header>
    {error && <p className="notes-conflict" role="alert">{error}</p>}
    {!error && graph && <p className="knowledge-graph__coverage" role="status">{graph.coverage.selected} von {graph.coverage.notesInScope} Notizen · {graph.edges.length} Verweise{graph.coverage.truncated ? ' · für diese LOD begrenzt' : ''}</p>}
    <div className="knowledge-graph__body">
      <ol className="knowledge-graph__list" aria-label="Graphknoten, Pfeiltasten wählen, Eingabe öffnen">
        {rows.map((node, index) => <li key={node.id}><button type="button" className={index === selected ? 'on' : ''} onFocus={() => setSelected(index)} onClick={() => onOpenNote(node.path)}><i style={{ background: graph?.groups.find(group => group.name === node.group)?.color }}></i><span><strong>{node.title}</strong><small>{node.path}</small></span><b>{node.inLinks + node.outLinks}</b></button></li>)}
        {!rows.length && <li className="knowledge-graph__empty">Keine Knoten für diese Auswahl.</li>}
      </ol>
      <aside className="knowledge-graph__inspector" aria-live="polite">
        {current ? <><h3>Inspector</h3><strong>{current.title}</strong><code>{current.path}</code><dl><div><dt>Typ</dt><dd>{current.properties.typ ?? '—'}</dd></div><div><dt>Status</dt><dd>{current.properties.stand ?? '—'}</dd></div><div><dt>Tags</dt><dd>{current.properties.tags.map(tag => `#${tag}`).join(' ') || '—'}</dd></div><div><dt>Verweise</dt><dd>{current.outLinks} hinaus · {current.inLinks} herein</dd></div></dl><button type="button" className="primary" onClick={() => onOpenNote(current.path)}>Notiz öffnen</button>{related.length > 0 && <section><h4>Verknüpft</h4>{related.map(node => <button type="button" key={node.id} onClick={() => onOpenNote(node.path)}>{node.title}</button>)}</section>}</> : <p>Wähle einen Knoten aus der Liste.</p>}
      </aside>
    </div>
  </section>
}
