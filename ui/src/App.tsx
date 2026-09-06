import { useEffect, useMemo, useRef, useState } from 'react'
import { createAtlasModel } from './lib/atlas.js'
import CityView from './views/CityView'
import MeshView from './views/MeshView'
import type { BoardTask, Snapshot, ViewId } from './types'

/** The three renderings of one brain. Order is the order of the switcher. */
const VIEWS: { id: ViewId; label: string; hint: string }[] = [
  { id: 'atlas', label: 'Atlas', hint: 'Wissensgraph der indexierten Objekte' },
  { id: 'city', label: 'City', hint: 'Workspaces als Distrikte, Objekte als Gebäude' },
  { id: 'mesh', label: 'Mesh', hint: 'Agenten und Zustände aus dem PlugBoard-Ledger' },
]

/** Remember the chosen view across reloads without inventing a backend. */
/**
 * A workspace label, never a path.
 *
 * Rows registered before the name fallback was fixed carry their whole root as
 * the name, and a lane header is not the place to render `C:\...\...`. Taking
 * the last segment repairs the display for those rows without a migration.
 */
function shortLabel(value: string): string {
  const parts = value.split(/[\/]/).filter(Boolean)
  return parts.length > 0 ? (parts[parts.length - 1] as string) : value
}

function initialView(): ViewId {
  const fromUrl = new URLSearchParams(location.search).get('view')
  const stored = (() => { try { return localStorage.getItem('plugbrain.view') } catch { return null } })()
  const candidate = fromUrl || stored
  return VIEWS.some(v => v.id === candidate) ? candidate as ViewId : 'atlas'
}

export default function App() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [tasks, setTasks] = useState<BoardTask[]>([])
  const [boardReachable, setBoardReachable] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [view, setView] = useState<ViewId>(initialView)
  // Timelapse. `until` pins every projection to an instant, so Atlas, City and
  // Mesh all show the same moment rather than three different presents.
  const [bounds, setBounds] = useState<{ first: string; last: string } | null>(null)
  const [until, setUntil] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => { try { localStorage.setItem('plugbrain.view', view) } catch { /* private mode */ } }, [view])

  // One poller feeds all three views, so they can never disagree about what
  // the brain currently holds.
  const untilRef = useRef<string | null>(null)
  useEffect(() => { untilRef.current = until }, [until])

  // The replay range comes from the ledger: it starts at the first thing an
  // agent actually did, which is exactly "since the prompt".
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('workspace')
    void fetch('/api/timeline' + (requested ? '?workspace=' + encodeURIComponent(requested) : ''))
      .then(r => r.json())
      .then(payload => { if (payload?.bounds?.first) setBounds(payload.bounds) })
      .catch(() => { /* a missing ledger simply means no replay to offer */ })
  }, [])

  // Playback walks the range in 60 steps and stops at the live present.
  useEffect(() => {
    if (!playing || !bounds) return
    const from = new Date(bounds.first).getTime()
    const to = new Date(bounds.last).getTime()
    const span = Math.max(1, to - from)
    let step = until ? Math.round(((new Date(until).getTime() - from) / span) * 60) : 0
    const id = setInterval(() => {
      step += 1
      if (step >= 60) { setUntil(null); setPlaying(false); return }
      setUntil(new Date(from + (span * step) / 60).toISOString())
    }, 220)
    return () => clearInterval(id)
  }, [playing, bounds])

  useEffect(() => {
    const controller = new AbortController()
    let timer: ReturnType<typeof setTimeout>
    let previous = ''
    let previousTasks = ''
    const requested = new URLSearchParams(location.search).get('workspace')
    async function refresh() {
      try {
        const params = new URLSearchParams()
        if (requested) params.set('workspace', requested)
        if (untilRef.current) params.set('until', untilRef.current)
        const response = await fetch('/api/atlas/snapshot' + (params.toString() ? `?${params}` : ''), { signal: controller.signal })
        if (!response.ok) throw new Error(`Brain-Verbindung: HTTP ${response.status}`)
        const next: Snapshot = await response.json()
        if (!next.workspace?.canonicalPath || !Array.isArray(next.graph?.nodes) || !Array.isArray(next.graph?.edges)) throw new Error('Der Brain-Snapshot ist unvollständig.')
        const signature = JSON.stringify([next.workspace, next.graph, next.coverage])
        if (signature !== previous) { setSnapshot(next); previous = signature }
        setError('')
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : String(cause))
      }
      // The board is a separate authority: it may be absent while the index is
      // healthy, and that must never be reported as a broken brain.
      try {
        // The Mesh shows the REAL swarm: one orb per agent that has actually
        // touched this workspace, its state derived from what the ledger says
        // it last did. No simulated fleet stands in for that.
        const board = await fetch(
          '/api/agents' + (requested ? '?workspace=' + encodeURIComponent(requested) : ''),
          { signal: controller.signal })
        if (!board.ok) throw new Error(String(board.status))
        const payload = await board.json()
        const roster: { id: string; name: string; color: string; actions: number; filesTouched: number }[] =
          Array.isArray(payload?.agents) ? payload.agents : []
        const next: BoardTask[] = roster.map(a => ({
          id: a.id,
          title: a.name,
          assignedAgentId: a.name,
          // An agent that has written is executing; one that only read is
          // still gathering context. Both are honest readings of the ledger.
          status: a.filesTouched > 0 ? 'RUNNING' : a.actions > 0 ? 'REVIEW' : 'PLANNED',
        }))
        const signature = JSON.stringify(next)
        if (signature !== previousTasks) { setTasks(next); previousTasks = signature }
        setBoardReachable(true)
      } catch {
        if (!controller.signal.aborted) setBoardReachable(false)
      }
      if (!controller.signal.aborted) timer = setTimeout(refresh, 3000)
    }
    void refresh()
    return () => { controller.abort(); clearTimeout(timer) }
  }, [attempt, until])

  const indexed = snapshot?.graph.nodes.length ?? 0
  const edgeCount = snapshot?.graph.edges.length ?? 0
  /**
   * One word, not a sentence.
   *
   * The header used to carry the full status prose plus the canonical path,
   * and at lane width that wrapped into four rows before the visualisation
   * even began. The path is still reachable — it is the title of the name —
   * but it is not what anyone reads while watching a graph.
   */
  const state = error ? 'getrennt' : snapshot ? (snapshot.coverage?.complete ? 'live' : 'Index unvollständig') : 'lädt …'

  return <>
    <div className="live-status" role="status">
      <strong className="live-status__name" title={snapshot?.workspace.canonicalPath ?? ''}>
        {snapshot ? shortLabel(snapshot.workspace.name) : 'PlugBrain'}
      </strong>
      <span className="live-status__figures">
        <b>{indexed}</b> Objekte <b>{edgeCount}</b> Kanten
      </span>
      <span className={error ? 'live-status__state is-bad' : 'live-status__state'}>{state}</span>
      <nav className="brain-views" aria-label="Ansicht">
        {VIEWS.map(v => (
          <button key={v.id} type="button" title={v.hint}
            className={v.id === view ? 'on' : undefined}
            aria-pressed={v.id === view}
            onClick={() => setView(v.id)}>{v.label}</button>
        ))}
      </nav>
      {error && <button type="button" onClick={() => setAttempt(value => value + 1)}>Erneut verbinden</button>}
    </div>

    {bounds && (
      <div className="brain-timelapse">
        <button type="button" onClick={() => setPlaying(p => !p)} title="Wachstum abspielen">
          {playing ? '❚❚' : '▶'}
        </button>
        <input
          type="range" min={0} max={60} step={1}
          value={until && bounds
            ? Math.round(((new Date(until).getTime() - new Date(bounds.first).getTime()) /
                Math.max(1, new Date(bounds.last).getTime() - new Date(bounds.first).getTime())) * 60)
            : 60}
          onChange={event => {
            setPlaying(false)
            const step = Number(event.target.value)
            if (step >= 60) { setUntil(null); return }
            const from = new Date(bounds.first).getTime()
            const to = new Date(bounds.last).getTime()
            setUntil(new Date(from + ((to - from) * step) / 60).toISOString())
          }}
        />
        <span>{until ? new Date(until).toLocaleTimeString() : 'jetzt'}</span>
      </div>
    )}

    {view === 'atlas' && (
      snapshot && indexed > 0
        ? <AtlasGraph graph={snapshot.graph} />
        : <div className="brain-empty">{error || (snapshot ? 'Dieser Workspace enthält noch keine indexierten Objekte.' : 'Echten Workspace-Graphen laden …')}</div>
    )}

    {view === 'city' && <div className="brain-view brain-view-city"><CityView snapshot={snapshot} /></div>}

    {view === 'mesh' && <div className="brain-view brain-view-mesh">
      {!boardReachable && <div className="brain-note">Agenten-Register nicht erreichbar — es werden keine echten Agenten angezeigt.</div>}
      {boardReachable && tasks.length === 0 && <div className="brain-note">Noch kein Agent hat diesen Workspace angefasst. Die Engine läuft in Eigensimulation — das sind keine echten Agenten.</div>}
      <MeshView tasks={tasks} />
    </div>}
  </>
}

type Cluster = { id: string; name: string; color: string }
type Row = { i: number; name: string; color: string; deg: number; on: boolean }
type Item = { i: number; name: string; color: string }

/* The rendering engine lives in src/lib/atlas.js (untyped on purpose); these
   declarations pin the boundary contract the engine has always honoured so the
   app strict-typechecks without touching engine or design. */
type AtlasNode = { i: number; cid: string; name: string }
type AtlasEngine = {
  setView(view: string): void; toggleFlow(): void; toggleLabel(): void; toggleSpin(): void
  reset(): void; toggleTheme(): void; dolly(factor: number): void; zoomReset(): void
  toggleCluster(id: string): void; selectAt(index: number): void; hoverAt(index: number | null): void
  setQuery(query: string): void; clearPath(): void; centerOn(index: number): void; startPath(index: number): void
  dispose(): void
}
type AtlasModel = {
  CLUSTERS: Cluster[]
  nodes: AtlasNode[]
  edges: unknown[]
  createAtlas(options: { els: Record<string, HTMLElement>; emit: Record<string, (value: any) => void> }): AtlasEngine
}
type Drawer = {
  i: number; name: string; desc: string; cname: string; color: string
  deg: number; depth: number; kind: string; path: string; status: string; prov: string
  groups: { title: string; tag: string; items: Item[] }[]
}


/* Störungen bleiben die einzigen roten Dinge im System */
const isBad = (s: string) => /✗|STALE|REPAIR|Quarantäne|secret|offen/i.test(s)

/* Escape regex metacharacters, then wrap the matched parts in <mark> */
function mark(name: string, q: string) {
  if (!q) return name
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return name.split(re).map((part, i) => i % 2 ? <mark key={i}>{part}</mark> : part)
}

export function AtlasGraph({ graph }: { graph: { nodes: unknown[]; edges: unknown[] } }) {
  const { CLUSTERS, nodes, edges, createAtlas } = useMemo(
    () => createAtlasModel(graph) as unknown as AtlasModel,
    [graph]
  )
  const COUNT = Object.fromEntries(CLUSTERS.map((c: Cluster) => [c.id, nodes.filter((n: { cid: string }) => n.cid === c.id).length]))
  const stage = useRef<HTMLDivElement>(null)
  const labels = useRef<HTMLDivElement>(null)
  const hudMode = useRef<HTMLElement>(null)
  const hudSel = useRef<HTMLDivElement>(null)
  const pathbar = useRef<HTMLDivElement>(null)
  const chain = useRef<HTMLSpanElement>(null)
  const zlvl = useRef<HTMLButtonElement>(null)
  const sNode = useRef<HTMLDivElement>(null)
  const sEdge = useRef<HTMLDivElement>(null)
  const sDeg = useRef<HTMLDivElement>(null)
  const sFps = useRef<HTMLDivElement>(null)
  const q = useRef<HTMLInputElement>(null)
  const api = useRef<AtlasEngine | null>(null)

  const [gate, setGate] = useState(false)
  const [list, setList] = useState<{ q: string; rows: Row[] }>({ q: '', rows: [] })
  const [drawer, setDrawer] = useState<Drawer | null>(null)
  const [tools, setTools] = useState({ flow: true, label: true, spin: false })
  const [view, setView] = useState('atlas')
  const [theme, setTheme] = useState('dark')
  const [off, setOff] = useState<string[]>([])

  useEffect(() => {
    const a = createAtlas({
      els: {
        stage: stage.current!, labels: labels.current!, hudMode: hudMode.current!,
        hudSel: hudSel.current!, pathbar: pathbar.current!, chain: chain.current!,
        zlvl: zlvl.current!, sNode: sNode.current!, sEdge: sEdge.current!,
        sDeg: sDeg.current!, sFps: sFps.current!, q: q.current!,
      },
      emit: { gate: setGate, list: setList, drawer: setDrawer, tools: setTools, theme: setTheme },
    })
    api.current = a
    return () => { a.dispose(); api.current = null }
  }, [createAtlas])

  const toggleCluster = (id: string) => {
    setOff(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id])
    api.current?.toggleCluster(id)
  }

  return (
    <div id="app" className={drawer ? 'open' : ''}>
      <aside>
        <div className="brand">
          <h1><span className="dot"></span>PlugBrain</h1>
          <p>Dein Workspace. Seine Dateien und Zusammenhänge.<br />
            Aktueller Graph aus PlugBrain.</p>
        </div>

        <div className="searchbox">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" /></svg>
          <input id="q" type="search" placeholder="Datei, Symbol, Mission, Pack suchen…" autoComplete="off" spellCheck={false} ref={q}
            onChange={e => api.current?.setQuery(e.target.value)} />
        </div>

        <div className="legend" id="legend">
          {CLUSTERS.map((c: Cluster) => (
            <button key={c.id} className={'cl' + (off.includes(c.id) ? ' off' : '')} type="button"
              onClick={() => toggleCluster(c.id)}>
              <i style={{ background: c.color }}></i>{c.name}<b>{COUNT[c.id]}</b></button>
          ))}
        </div>
        <div className="listwrap" id="list">
          {list.rows.length ? list.rows.map(n => (
            <div key={n.i} className={'lrow' + (n.on ? ' on' : '')} data-i={n.i}
              onClick={() => api.current?.selectAt(n.i)}
              onMouseOver={() => api.current?.hoverAt(n.i)}
              onMouseLeave={() => api.current?.hoverAt(null)}>
              <i style={{ background: n.color }}></i><span>{mark(n.name, list.q)}</span><b>{n.deg}</b>
            </div>
          )) : <div style={{ padding: '14px 16px', color: 'var(--faint)', fontSize: '12px' }}>Keine passenden Objekte im System-of-Record</div>}
        </div>

        <div className="foot">
          <div><div className="k" id="s-node" ref={sNode}>—</div><div className="l">Objekte</div></div>
          <div><div className="k" id="s-edge" ref={sEdge}>—</div><div className="l">Kanten</div></div>
          <div><div className="k" id="s-deg" ref={sDeg}>—</div><div className="l">Ø-Grad</div></div>
          <div><div className="k" id="s-fps" ref={sFps}>—</div><div className="l">FPS</div></div>
        </div>
      </aside>

      <div id="stage" ref={stage}>
        {/* Labels are projected every frame and drawn from a fixed div pool; React is not involved */}
        <div id="labels" ref={labels}></div>

        <div id="hud">
          <div><b id="hud-mode" ref={hudMode}>GALAXIE · FREIER ORBIT</b></div>
          <div id="hud-sel" ref={hudSel}>Nichts ausgewählt</div>
          <div id="hud-sys">{nodes.length} VON {graph.nodes.length} OBJEKTEN · {edges.length} VON {graph.edges.length} KANTEN</div>
        </div>

        <div id="pathbar" ref={pathbar}>
          <span className="chain" id="chain" ref={chain}></span>
          <button className="x" id="path-x" type="button" onClick={() => api.current?.clearPath()}>✕</button>
        </div>

        <div id="tools">
          {[['atlas', 'Galaxie'], ['shell', 'Planet'], ['tier', 'Pipeline']].map(([v, label]) => (
            <button key={v} className={'tb' + (view === v ? ' on' : '')} data-view={v} type="button"
              onClick={() => { setView(v); api.current?.setView(v) }}>{label}</button>
          ))}
          <span className="sep"></span>
          <button className={'tb' + (tools.flow ? ' on' : '')} id="t-flow" type="button"
            onClick={() => api.current?.toggleFlow()}>Signalfluss</button>
          <button className={'tb' + (tools.label ? ' on' : '')} id="t-label" type="button"
            onClick={() => api.current?.toggleLabel()}>Labels</button>
          <button className={'tb' + (tools.spin ? ' on' : '')} id="t-spin" type="button"
            onClick={() => api.current?.toggleSpin()}>Auto-Orbit</button>
          <span className="sep"></span>
          <button className="tb" id="zout" type="button" title="Rauszoomen" onClick={() => api.current?.dolly(1.18)}>−</button>
          <button className="tb" id="zlvl" type="button" title="Zoom zurücksetzen" ref={zlvl}
            onClick={() => api.current?.zoomReset()}>100%</button>
          <button className="tb" id="zin" type="button" title="Reinzoomen" onClick={() => api.current?.dolly(1 / 1.18)}>＋</button>
          <span className="sep"></span>
          <button className="tb" id="t-theme" type="button" title="Theme wechseln"
            onClick={() => api.current?.toggleTheme()}>{theme === 'light' ? 'Nacht' : 'Tag'}</button>
          <button className="tb" id="t-reset" type="button" onClick={() => api.current?.reset()}>Reset</button>
        </div>

        <div id="hint">
          Ziehen rotiert · Scrollen oder <kbd>+</kbd>/<kbd>−</kbd> zoomt · Klick fokussiert ein Objekt<br />{' '}
          <kbd>Shift</kbd>+Klick auf ein zweites Objekt zeigt die kürzeste Kausalkette · <kbd>Esc</kbd> löst die Auswahl
        </div>

        <div id="gate" style={gate ? { display: 'grid' } : undefined}>WebGL ist auf diesem Gerät nicht verfügbar.<br />Suche und Objekt-Inspector bleiben nutzbar.</div>
      </div>

      <div id="drawer"><div className="dr" id="dr">
        {drawer && <>
          <div className="dr-head">
            <div className="kind"><i style={{ background: drawer.color }}></i>{drawer.cname} · Grad {drawer.deg} · Ebene {drawer.depth}</div>
            <h2>{drawer.name}</h2>
            <p>{drawer.desc}</p>
            <dl className="prov">
              {drawer.kind && <><dt>Typ</dt><dd>{drawer.kind}</dd></>}
              {drawer.path && <><dt>Pfad</dt><dd className="mono">{drawer.path}</dd></>}
              {drawer.status && <><dt>Status</dt><dd className={isBad(drawer.status) ? 'bad' : ''}>{drawer.status}</dd></>}
              {drawer.prov && <><dt>Provenienz</dt><dd>{drawer.prov}</dd></>}
            </dl>
          </div>
          <div className="dr-body">
            {drawer.groups.map(g => (
              <div className="dr-sec" key={g.tag}>
                <h3>{g.title} <b style={{ color: 'var(--faint)', opacity: .6 }}>{g.items.length}</b></h3>
                {g.items.map(m => (
                  <div className="nb" data-i={m.i} key={m.i} onClick={() => api.current?.selectAt(m.i)}>
                    <i style={{ background: m.color }}></i>
                    <span>{m.name}</span><u>{g.tag}</u></div>
                ))}
              </div>
            ))}
          </div>
          <div className="dr-act">
            <button className="btn" id="a-center" type="button" onClick={() => api.current?.centerOn(drawer.i)}>Hier zentrieren</button>
            <button className="btn primary" id="a-path" type="button" onClick={() => api.current?.startPath(drawer.i)}>Kausalkette ab hier</button>
          </div>
        </>}
      </div></div>
    </div>
  )
}
