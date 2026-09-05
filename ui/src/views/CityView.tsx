import { useEffect, useReducer, useRef, useState } from 'react'
import { FMAP, colorOf, edges, feed, files, setHeightMode, subscribe, workspaces, wsColor } from '../lib/city/repo.js'
import { createCity } from '../lib/city/city.js'

interface File { path: string; name: string; dir: string; top: string; loc: number
                 deps: string[]; usedBy: string[]; note?: string }
interface Ws { id: string; name: string; ki: number; load: number; events: number
               createdAt: Date; dying: boolean; sim: boolean }
interface City {
  setFlow: (v: boolean) => void; setHatch: (v: boolean) => void; setSpin: (v: boolean) => void
  onSpinChange: (fn: (v: boolean) => void) => void
  dolly: (f: number) => void; reset: () => void
  setSel: (f: File | null) => void; setRailHover: (f: File | null) => void
  setQuery: (q: string) => void; setFocusTop: (t: string | null) => void
}

import { feedCity } from '../lib/city-feed.js'
import type { Snapshot } from '../types.js'

/**
 * The Codebase City view. Districts are registered workspaces, buildings are
 * indexed objects; both come from the same authoritative snapshot the Atlas
 * renders, so the two views can never disagree about what is indexed.
 */
export default function CityView({ snapshot }: { snapshot: Snapshot | null }) {
  // Apply every snapshot the shell polls. feedCity skips what it already grew,
  // so an unchanged workspace produces no churn on the map.
  const [coverage, setCoverage] = useState<{ buildings: number; total: number; truncated: boolean } | null>(null)
  useEffect(() => {
    if (!snapshot) return
    const result = feedCity(snapshot)
    setCoverage({ buildings: result.buildings, total: result.total ?? result.buildings, truncated: Boolean(result.truncated) })
  }, [snapshot])

  const [ok, setOk] = useState(true)
  const [hMode, setHMode] = useState('loc')
  const [flow, setFlow] = useState(true)
  const [hatch, setHatch] = useState(true)
  const [spin, setSpin] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [sel, setSelS] = useState<File | null>(null)
  const [query, setQuery] = useState('')
  const [focusWs, setFocusWs] = useState<string | null>(null)
  const [feedOn, setFeedOn] = useState(true)
  const [, force] = useReducer(x => x + 1, 0)

  const cv = useRef<HTMLCanvasElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const tip = useRef<HTMLDivElement>(null)
  const city = useRef<City | null>(null)

  useEffect(() => {
    const c: City | null = createCity(cv.current, stage.current, tip.current, {
      onSelect: (f: File | null) => setSelS(f),
      onZoom: (z: number) => setZoom(z),
    })
    if (!c) { setOk(false); return }
    city.current = c
    c.onSpinChange((v: boolean) => setSpin(v))
  }, [])

  // the runtime model notifies; panels re-read the live collections
  useEffect(() => subscribe(() => force()), [])

  useEffect(() => { city.current?.setSel(sel) }, [sel])
  useEffect(() => { city.current?.setQuery(query) }, [query])
  useEffect(() => { city.current?.setFocusTop(focusWs) }, [focusWs])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (/^(INPUT|TEXTAREA)$/.test(t.tagName)) { if (e.key === 'Escape') t.blur(); return }
      if (e.key === 'Escape') { setSelS(null); setFocusWs(null) }
      else if (e.key === '=' || e.key === '+') city.current?.dolly(1 / 1.18)
      else if (e.key === '-' || e.key === '_') city.current?.dolly(1.18)
      else if (e.key === 'e' || e.key === 'E') setFeedOn(v => !v)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const TOTAL = files.reduce((a: number, f: File) => a + f.loc, 0)
  const TOTAL_EV = workspaces.reduce((a: number, w: Ws) => a + w.events, 0)

  const list = (title: string, arr: string[]) => arr.length ? (
    <>
      <h3>{title + ' '}<span style={{ color: 'var(--faint)' }}>{arr.length}</span></h3>
      {arr.map(p => FMAP[p] && (
        <div className="dep" data-p={p} key={p} onClick={() => setSelS(FMAP[p])}>
          <span className="sw" style={{ background: colorOf(FMAP[p]) }} />
          <span>{p}</span>
        </div>
      ))}
    </>
  ) : null

  const truncationNote = coverage?.truncated
    ? `Karte zeigt ${coverage.buildings} von ${coverage.total} indexierten Objekten — die Stadt-Engine rendert aus einem festen Pool.`
    : null

  return (
    <div id="app" className={sel ? undefined : 'closed'}>
      {truncationNote && <div className="brain-note">{truncationNote}</div>}
      <aside>
        <div className="hd">
          <h1>PlugBrain City</h1>
          <div className="repo" id="repo">runtime addon · workspaces grow here</div>
          <div className="kpis">
            <div><b id="k-ws">{workspaces.length}</b><i>workspaces</i></div>
            <div><b id="k-bld">{files.length}</b><i>buildings</i></div>
            <div><b id="k-ev">{TOTAL_EV}</b><i>events</i></div>
          </div>
        </div>
        <div className="q">
          <input id="q" type="search" placeholder="Search module…" spellCheck={false}
                 onChange={e => setQuery(e.target.value.trim().toLowerCase())} />
        </div>
        <div className="tree" id="tree">
          {workspaces.length ? workspaces.map((ws: Ws) => {
            const own = files.filter((f: File) => f.dir === ws.id)
            const loc = own.reduce((a: number, f: File) => a + f.loc, 0)
            return (
              <div className={'ws' + (focusWs === ws.id ? ' on' : '') + (ws.dying ? ' dying' : '')}
                   key={ws.id}
                   onClick={() => setFocusWs(f => f === ws.id ? null : ws.id)}>
                <div className="wsrow">
                  <span className="sw" style={{ background: wsColor(ws) }} />
                  <span className="nm">{ws.name}</span>
                  {ws.sim ? <span className="tag">sim</span> : null}
                  <span className="lc">{own.length} bld · {loc}</span>
                </div>
                <div className="loadbar"><i style={{ width: Math.round(ws.load * 100) + '%', background: wsColor(ws) }} /></div>
              </div>
            )
          }) : <div className="empty">No workspaces registered.<br /><br />
            <code>PlugBrainCity.register({'{'} id, name {'}'})</code></div>}
        </div>
      </aside>

      <div id="stage" ref={stage}>
        <canvas id="cv" ref={cv} />
        <div id="tip" ref={tip} />
        <div id="crumb">PLUGBRAIN / <b id="crumb-t">
          {sel ? sel.path.toUpperCase() : focusWs ? focusWs.toUpperCase() : 'CITY OVERVIEW'}</b></div>

        {feedOn && (
          <div id="feed">
            {feed.slice(0, 9).map((e: any) => (
              <div className="fe" key={e.id}>
                <span className="ft">{e.t.toLocaleTimeString('en-GB', { hour12: false })}</span>
                <span className="fw" style={{ color: 'var(--accent)' }}>{e.ws}</span>
                <span className="fm">{e.msg}</span>
              </div>
            ))}
          </div>
        )}

        <div id="legend">
          <div style={{ color: 'var(--faint)' }}>
            {`district = workspace · building = module · height = ${hMode === 'loc' ? 'size' : 'references'} · flashes = activity`}
          </div>
        </div>

        <div id="bar">
          {[['loc', 'Height = size'], ['dep', 'Height = references']].map(([v, label]) => (
            <button key={v} className={'tb' + (hMode === v ? ' on' : '')} data-h={v} type="button"
                    onClick={() => { setHeightMode(v as string); setHMode(v as string) }}>{label}</button>
          ))}
          <div className="vsep" />
          <button className={'tb' + (flow ? ' on' : '')} id="t-flow" type="button"
                  onClick={() => { setFlow(v => { city.current?.setFlow(!v); return !v }) }}>Flow</button>
          <button className={'tb' + (hatch ? ' on' : '')} id="t-hatch" type="button"
                  onClick={() => { setHatch(v => { city.current?.setHatch(!v); return !v }) }}>Hatching</button>
          <button className={'tb' + (spin ? ' on' : '')} id="t-spin" type="button"
                  onClick={() => { setSpin(v => { city.current?.setSpin(!v); return !v }) }}>Orbit</button>
          <button className={'tb' + (feedOn ? ' on' : '')} id="t-feed" type="button" title="Toggle feed (E)"
                  onClick={() => setFeedOn(v => !v)}>Feed</button>
          <div className="vsep" />
          <button className="tb" id="zout" type="button" title="Zoom out"
                  onClick={() => city.current?.dolly(1.18)}>−</button>
          <button className="tb" id="zlvl" type="button" title="Reset zoom"
                  onClick={() => city.current?.reset()}>{zoom + '%'}</button>
          <button className="tb" id="zin" type="button" title="Zoom in"
                  onClick={() => city.current?.dolly(1 / 1.18)}>＋</button>
          <div className="vsep" />
          <button className="tb" id="t-reset" type="button"
                  onClick={() => { city.current?.reset(); setSelS(null); setFocusWs(null) }}>Reset</button>
        </div>
        <div id="gate" style={ok ? undefined : { display: 'grid' }}>
          WebGL is unavailable on this device.<br />The workspace registry remains available.</div>
      </div>

      <div id="side"><div id="dt">
        {sel && (
          <div className="dt">
            <div className="kind">{sel.dir + '/'}</div>
            <h2>{sel.name}</h2>
            {sel.note ? <div className="note">{sel.note}</div> : null}
            <dl>
              <dt>Size</dt><dd>{sel.loc}</dd>
              <dt>References</dt><dd>{sel.deps.length}</dd>
              <dt>Referenced by</dt><dd>{sel.usedBy.length}</dd>
              <dt>Share of total</dt><dd>{TOTAL ? (sel.loc / TOTAL * 100).toFixed(1) + '%' : '—'}</dd>
            </dl>
            {list('References', sel.deps)}
            {list('Referenced by', sel.usedBy)}
          </div>
        )}
      </div></div>
    </div>
  )
}
