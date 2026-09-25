import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createGraphEngine, type GraphEngine, type LabelMode } from '../graph/forceGraph'
import {
  buildGraphModel, matchesQuery, rankNodes, OTHER_GROUP,
  type GraphModel, type GraphNode, type NodeKind,
} from '../graph/model'
import { Icon, ICON } from '../ui/Icon'
import { TimelineControl, type Timeline } from '../ui/TimelineControl'

/** How many rows the side list renders; the rest are reached by searching. */
const LIST_LIMIT = 120
/** Zoom step for the toolbar buttons and the + / - keys. */
const ZOOM_STEP = 1.25

const KIND_LABEL: Record<NodeKind, string> = {
  file: 'Dateien', class: 'Klassen', interface: 'Interfaces', note: 'Notizen', other: 'Sonstige',
}
const KIND_SINGULAR: Record<NodeKind, string> = {
  file: 'Datei', class: 'Klasse', interface: 'Interface', note: 'Notiz', other: 'Objekt',
}
const RELATION_LABEL: Record<string, [outgoing: string, incoming: string]> = {
  imports: ['Importiert', 'Wird importiert von'],
  defines: ['Definiert', 'Definiert in'],
  links: ['Verweist auf', 'Verwiesen von'],
}

export interface GraphCoverage {
  shownFiles: number
  totalFiles: number
  indexComplete: boolean
  staleFiles?: number
}

export interface GraphViewProps {
  graph: { nodes: unknown[]; edges: unknown[] } | null
  coverage: GraphCoverage | null
  error: string
  onRetry(): void
  onOpenSource(path: string): void
  timeline: Timeline | null
}

const numberFormat = new Intl.NumberFormat('de-DE')

/* ── The view ───────────────────────────────────────────────────────────── */

export default function GraphView({ graph, coverage, error, onRetry, onOpenSource, timeline }: GraphViewProps) {
  const model: GraphModel | null = useMemo(() => (graph ? buildGraphModel(graph) : null), [graph])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const zoomRef = useRef<HTMLSpanElement>(null)
  const engineRef = useRef<GraphEngine | null>(null)
  const [engineError, setEngineError] = useState('')

  const [query, setQuery] = useState('')
  const [hiddenKinds, setHiddenKinds] = useState<ReadonlySet<NodeKind>>(new Set())
  const [hiddenGroups, setHiddenGroups] = useState<ReadonlySet<string>>(new Set())
  const [labelMode, setLabelMode] = useState<LabelMode>('auto')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const openNode = useCallback((id: string) => {
    const node = model?.byId.get(id)
    if (node?.path) onOpenSource(node.path)
  }, [model, onOpenSource])
  const openRef = useRef(openNode)
  openRef.current = openNode

  // One engine for the life of the view. Callbacks go through refs so the
  // engine never has to be rebuilt because a closure changed.
  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (canvas === null || stage === null) return
    let engine: GraphEngine
    try {
      engine = createGraphEngine(canvas, {
        onHover: () => {},
        onSelect: id => setSelectedId(id),
        onOpen: id => openRef.current(id),
        onZoom: k => { if (zoomRef.current) zoomRef.current.textContent = `${Math.round(k * 100)} %` },
      })
    } catch (cause) {
      setEngineError(cause instanceof Error ? cause.message : String(cause))
      return
    }
    engineRef.current = engine
    const observer = new ResizeObserver(() => engine.resize())
    observer.observe(stage)
    engine.resize()
    // The theme is the data-theme attribute on <html>; the canvas reads its
    // colours from CSS, so it has to repaint when that attribute flips.
    const themeObserver = new MutationObserver(() => engine.refreshColours())
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      themeObserver.disconnect()
      observer.disconnect()
      engine.dispose()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    if (model !== null) engineRef.current?.setModel(model)
  }, [model])

  useEffect(() => {
    engineRef.current?.setHidden(node => hiddenKinds.has(node.kind) || hiddenGroups.has(bucketOf(model, node)))
  }, [hiddenKinds, hiddenGroups, model])

  const matchIds = useMemo(() => {
    if (model === null || query.trim() === '') return new Set<string>()
    return new Set(model.nodes.filter(node => matchesQuery(node, query)).map(node => node.id))
  }, [model, query])
  useEffect(() => { engineRef.current?.setQuery(matchIds) }, [matchIds])
  useEffect(() => { engineRef.current?.setLabelMode(labelMode) }, [labelMode])
  useEffect(() => { engineRef.current?.setSelected(selectedId) }, [selectedId])

  const select = useCallback((id: string, centre = true) => {
    setSelectedId(id)
    if (centre) engineRef.current?.focusNode(id)
  }, [])

  const rows = useMemo(() => {
    if (model === null) return []
    const pool = query.trim() === '' ? model.nodes : model.nodes.filter(node => matchIds.has(node.id))
    return rankNodes(pool.filter(node => !hiddenKinds.has(node.kind) && !hiddenGroups.has(bucketOf(model, node))))
  }, [model, query, matchIds, hiddenKinds, hiddenGroups])

  const selected = selectedId !== null ? model?.byId.get(selectedId) ?? null : null

  // Keyboard: "/" search, "f" fit, "+"/"-" zoom, Escape clears then deselects.
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement | null
      const typing = target !== null && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (event.key === 'Escape') {
        if (typing && target === searchRef.current && query !== '') { setQuery(''); return }
        if (selectedId !== null) { setSelectedId(null); return }
        if (typing) (target as HTMLInputElement).blur()
        return
      }
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === '/') { event.preventDefault(); searchRef.current?.focus() }
      else if (event.key === 'f' || event.key === 'F') engineRef.current?.fit()
      else if (event.key === '+' || event.key === '=') engineRef.current?.zoomBy(ZOOM_STEP)
      else if (event.key === '-') engineRef.current?.zoomBy(1 / ZOOM_STEP)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query, selectedId])

  const toggle = <T,>(set: ReadonlySet<T>, value: T): Set<T> => {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    return next
  }

  const onListKey = (event: React.KeyboardEvent<HTMLOListElement>): void => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button')]
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const next = buttons[Math.max(0, Math.min(buttons.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)))]
    next?.focus()
  }

  const onSearchKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && rows[0]) select(rows[0].id)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      document.querySelector<HTMLButtonElement>('.pb-graph__list button')?.focus()
    }
  }

  const state: 'offline' | 'loading' | 'empty' | 'ready' =
    error ? 'offline' : model === null ? 'loading' : model.nodes.length === 0 ? 'empty' : 'ready'

  const colouredGroups = model?.groups.filter(group => group.slot >= 0) ?? []
  const otherGroups = model?.groups.filter(group => group.slot < 0) ?? []
  const otherCount = otherGroups.reduce((sum, group) => sum + group.count, 0)

  return (
    <section className="pb-graph" data-inspector={selected ? 'open' : 'closed'} aria-label="Wissensgraph">
      <aside className="pb-graph__side" aria-label="Objekte im Graph">
        <label className="pb-search">
          <Icon path={ICON.search} />
          <input
            ref={searchRef}
            type="search"
            value={query}
            placeholder="Datei oder Symbol suchen"
            aria-label="Datei oder Symbol im Graph suchen"
            spellCheck={false}
            autoComplete="off"
            onChange={event => setQuery(event.target.value)}
            onKeyDown={onSearchKey}
          />
          <kbd aria-hidden="true">/</kbd>
        </label>

        {model !== null && (
          <>
            <div className="pb-chips" role="group" aria-label="Objektarten anzeigen">
              {(Object.keys(KIND_LABEL) as NodeKind[])
                .filter(kind => model.kindCounts[kind] > 0)
                .map(kind => (
                  <button key={kind} type="button" className="pb-chip"
                    aria-pressed={!hiddenKinds.has(kind)}
                    onClick={() => setHiddenKinds(current => toggle(current, kind))}>
                    {KIND_LABEL[kind]} <span className="pb-num">{numberFormat.format(model.kindCounts[kind])}</span>
                  </button>
                ))}
            </div>

            <h2 className="pb-heading">Bereiche</h2>
            <ul className="pb-groups" aria-label="Bereiche anzeigen oder ausblenden">
              {colouredGroups.map(group => (
                <li key={group.name}>
                  <button type="button" aria-pressed={!hiddenGroups.has(group.name)}
                    onClick={() => setHiddenGroups(current => toggle(current, group.name))}>
                    <i className="pb-dot" data-slot={group.slot} aria-hidden="true" />
                    <span className="pb-groups__name" title={group.name}>{group.name}</span>
                    <span className="pb-num">{numberFormat.format(group.count)}</span>
                  </button>
                </li>
              ))}
              {otherGroups.length > 0 && (
                <li>
                  <button type="button" aria-pressed={!hiddenGroups.has(OTHER_GROUP)}
                    onClick={() => setHiddenGroups(current => toggle(current, OTHER_GROUP))}>
                    <i className="pb-dot" data-slot="-1" aria-hidden="true" />
                    <span className="pb-groups__name">{OTHER_GROUP} · {otherGroups.length} Bereiche</span>
                    <span className="pb-num">{numberFormat.format(otherCount)}</span>
                  </button>
                </li>
              )}
            </ul>

            <h2 className="pb-heading">
              {query.trim() === '' ? 'Am stärksten vernetzt' : `${numberFormat.format(rows.length)} Treffer`}
            </h2>
            {rows.length === 0 ? (
              <p className="pb-quiet">{query.trim() === '' ? 'Alle Objekte sind ausgeblendet.' : 'Kein Objekt passt zur Suche.'}</p>
            ) : (
              <ol className="pb-graph__list" onKeyDown={onListKey}>
                {rows.slice(0, LIST_LIMIT).map(node => (
                  <li key={node.id}>
                    <button type="button" aria-current={node.id === selectedId ? 'true' : undefined}
                      onClick={() => select(node.id)}
                      onDoubleClick={() => openNode(node.id)}
                      onMouseEnter={() => engineRef.current?.setHovered(node.id)}
                      onMouseLeave={() => engineRef.current?.setHovered(null)}
                      onFocus={() => engineRef.current?.setHovered(node.id)}
                      onBlur={() => engineRef.current?.setHovered(null)}>
                      <i className="pb-dot" data-slot={slotOf(model, node)} aria-hidden="true" />
                      <span className="pb-row__text">
                        <span className="pb-row__label">{node.label}</span>
                        {node.path && <span className="pb-row__path">{parentOf(node.path)}</span>}
                      </span>
                      <span className="pb-num" title={`${node.degree} Verbindungen`}>{node.degree}</span>
                    </button>
                  </li>
                ))}
                {rows.length > LIST_LIMIT && (
                  <li className="pb-quiet">{numberFormat.format(rows.length - LIST_LIMIT)} weitere — Suche verfeinern</li>
                )}
              </ol>
            )}
          </>
        )}
      </aside>

      <div className="pb-graph__stage" ref={stageRef}>
        <canvas ref={canvasRef} className="pb-graph__canvas"
          role="img"
          aria-label={model ? `Graph mit ${model.nodes.length} Objekten und ${model.edges.length} Kanten. Die Liste links ist die Tastaturansicht.` : 'Graph'}
          data-state={state} />

        {state === 'ready' && (
          <div className="pb-toolbar" role="toolbar" aria-label="Graph-Ansicht">
            <button type="button" className="pb-tool" onClick={() => engineRef.current?.fit()} title="Alles einpassen (F)">
              <Icon path={ICON.fit} /><span>Einpassen</span>
            </button>
            <span className="pb-toolbar__sep" aria-hidden="true" />
            <button type="button" className="pb-tool pb-tool--icon" onClick={() => engineRef.current?.zoomBy(1 / ZOOM_STEP)}
              aria-label="Herauszoomen" title="Herauszoomen (−)"><Icon path={ICON.minus} /></button>
            <span className="pb-toolbar__zoom pb-num" ref={zoomRef} aria-live="off">100 %</span>
            <button type="button" className="pb-tool pb-tool--icon" onClick={() => engineRef.current?.zoomBy(ZOOM_STEP)}
              aria-label="Hineinzoomen" title="Hineinzoomen (+)"><Icon path={ICON.plus} /></button>
            <span className="pb-toolbar__sep" aria-hidden="true" />
            <div className="pb-segmented" role="radiogroup" aria-label="Beschriftungen">
              {([['auto', 'Auto'], ['always', 'Alle'], ['off', 'Aus']] as [LabelMode, string][]).map(([mode, label]) => (
                <button key={mode} type="button" role="radio" aria-checked={labelMode === mode}
                  onClick={() => setLabelMode(mode)}>{label}</button>
              ))}
            </div>
            {timeline && (
              <>
                <span className="pb-toolbar__sep" aria-hidden="true" />
                <TimelineControl timeline={timeline} />
              </>
            )}
          </div>
        )}

        {state === 'ready' && model && (
          <p className="pb-graph__status" role="status">
            <span className="pb-num">{numberFormat.format(model.nodes.length)}</span> Objekte ·{' '}
            <span className="pb-num">{numberFormat.format(model.edges.length)}</span> Kanten
            {coverage && coverage.totalFiles > coverage.shownFiles && (
              <span title="Der Graph zeigt die am stärksten vernetzten Dateien; Suche und Explorer umfassen den ganzen Index.">
                {' '}· Ausschnitt aus <span className="pb-num">{numberFormat.format(coverage.totalFiles)}</span> Dateien
              </span>
            )}
            {coverage && !coverage.indexComplete && (
              <span className="pb-graph__stale"> · {numberFormat.format(coverage.staleFiles ?? 0)} Dateien warten auf den Index</span>
            )}
          </p>
        )}

        {state !== 'ready' && (
          <div className="pb-state" role={state === 'offline' ? 'alert' : 'status'}>
            {state === 'loading' && <>
              <div className="pb-state__bar" aria-hidden="true"><span /></div>
              <h2>Graph wird geladen</h2>
              <p>Der aktuelle Stand wird aus dem Brain gelesen.</p>
            </>}
            {state === 'empty' && <>
              <h2>Noch keine indizierten Objekte</h2>
              <p>Sobald der Index Dateien enthält, erscheinen sie hier.</p>
            </>}
            {state === 'offline' && <>
              <h2>PlugBrain ist nicht erreichbar</h2>
              <p>{error}</p>
              <button type="button" className="pb-button pb-button--primary" onClick={onRetry}>Erneut verbinden</button>
            </>}
          </div>
        )}
        {engineError && (
          <div className="pb-state" role="alert">
            <h2>Der Graph kann hier nicht gezeichnet werden</h2>
            <p>{engineError} Die Liste links bleibt vollständig nutzbar.</p>
          </div>
        )}
      </div>

      {selected && model && (
        <Inspector
          node={selected}
          model={model}
          onClose={() => setSelectedId(null)}
          onSelect={id => select(id)}
          onOpen={() => openNode(selected.id)}
          onCentre={() => engineRef.current?.focusNode(selected.id)}
        />
      )}
    </section>
  )
}

/* ── Inspector ──────────────────────────────────────────────────────────── */

function Inspector({ node, model, onClose, onSelect, onOpen, onCentre }: {
  node: GraphNode
  model: GraphModel
  onClose(): void
  onSelect(id: string): void
  onOpen(): void
  onCentre(): void
}) {
  const sections = useMemo(() => {
    const out = new Map<string, GraphNode[]>()
    const add = (title: string, other: GraphNode | undefined): void => {
      if (other === undefined) return
      const list = out.get(title) ?? []
      list.push(other)
      out.set(title, list)
    }
    for (const edge of model.edges) {
      const [outgoing, incoming] = RELATION_LABEL[edge.kind] ?? ['Verbunden mit', 'Verbunden mit']
      if (edge.source === node.id) add(outgoing, model.byId.get(edge.target))
      else if (edge.target === node.id) add(incoming, model.byId.get(edge.source))
    }
    return [...out.entries()].map(([title, nodes]) => [title, rankNodes(nodes)] as const)
  }, [node, model])

  const group = model.groups.find(g => g.name === node.group)

  return (
    <aside className="pb-inspector" aria-label={`Details zu ${node.label}`}>
      <header className="pb-inspector__head">
        <div className="pb-inspector__kicker">
          <i className="pb-dot" data-slot={group?.slot ?? -1} aria-hidden="true" />
          <span>{KIND_SINGULAR[node.kind]}</span>
          <span aria-hidden="true">·</span>
          <span className="pb-inspector__group" title={node.group}>{node.group}</span>
        </div>
        <button type="button" className="pb-tool pb-tool--icon" onClick={onClose} aria-label="Details schließen" title="Schließen (Esc)">
          <Icon path={ICON.close} />
        </button>
      </header>
      <h2 className="pb-inspector__title">{node.label}</h2>
      {node.path && <p className="pb-inspector__path">{node.path}</p>}

      <dl className="pb-facts">
        <div><dt>Verbindungen</dt><dd className="pb-num">{node.degree}</dd></div>
        {node.lines !== null && <div><dt>Zeilen</dt><dd className="pb-num">{numberFormat.format(node.lines)}</dd></div>}
        {node.lang && <div><dt>Sprache</dt><dd>{node.lang}</dd></div>}
      </dl>

      <div className="pb-inspector__actions">
        {node.path && (
          <button type="button" className="pb-button pb-button--primary" onClick={onOpen}>
            <Icon path={ICON.open} /> Quelle öffnen
          </button>
        )}
        <button type="button" className="pb-button" onClick={onCentre}>
          <Icon path={ICON.centre} /> Zentrieren
        </button>
      </div>

      {sections.length === 0 ? (
        <p className="pb-quiet">Dieses Objekt hat im gezeigten Ausschnitt keine Verbindungen.</p>
      ) : sections.map(([title, nodes]) => (
        <section key={title} className="pb-inspector__section">
          <h3 className="pb-heading">{title} <span className="pb-num">{nodes.length}</span></h3>
          <ul>
            {nodes.slice(0, 40).map(other => (
              <li key={other.id}>
                <button type="button" onClick={() => onSelect(other.id)}>
                  <i className="pb-dot" data-slot={slotOf(model, other)} aria-hidden="true" />
                  <span className="pb-row__label">{other.label}</span>
                </button>
              </li>
            ))}
            {nodes.length > 40 && <li className="pb-quiet">{nodes.length - 40} weitere</li>}
          </ul>
        </section>
      ))}
    </aside>
  )
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

function slotOf(model: GraphModel, node: GraphNode): number {
  return model.groups.find(group => group.name === node.group)?.slot ?? -1
}

/** Coloured groups hide individually; every other group hides as one bucket. */
function bucketOf(model: GraphModel | null, node: GraphNode): string {
  if (model === null) return node.group
  return slotOf(model, node) >= 0 ? node.group : OTHER_GROUP
}

function parentOf(path: string): string {
  const parts = path.split('/')
  parts.pop()
  return parts.slice(-3).join('/')
}
