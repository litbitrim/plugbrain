import { useEffect, useRef, useState } from 'react'
import { createSwarm } from '../lib/mesh/swarm.js'
import { createAgentMesh } from '../lib/mesh/mesh.js'

type Card = {
  n: number; color: string; cn: string; prog: string; off: boolean
  st: string; md: string; tk: string; q: number; u: string; hist: boolean[]
}

const SPEEDS = [[0, '⏸'], [1, '1×'], [2, '2×'], [4, '4×']] as const

import type { BoardTask } from '../types.js'

/**
 * The Agent Mesh view. Orbs are real PlugBoard tasks and their state is the
 * ledger's, not a simulation's — `setFleet` switches the engine's own arrival
 * stream off. With an empty board the engine keeps simulating so the page is
 * never blank, and the shell says so in plain words.
 */
export default function MeshView({ tasks }: { tasks: BoardTask[] }) {

  const glow = useRef<HTMLCanvasElement>(null)
  const field = useRef<HTMLCanvasElement>(null)
  const roster = useRef<HTMLDivElement>(null)
  const tally = useRef<HTMLDivElement>(null)
  const stats = useRef<HTMLDivElement>(null)
  const verdict = useRef<HTMLDivElement>(null)
  const api = useRef<ReturnType<typeof createSwarm> | null>(null)

  const [card, setCard] = useState<Card | null>(null)
  const [lam, setLam] = useState(20)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    const s = createSwarm({
      els: {
        glow: glow.current!, field: field.current!, roster: roster.current!,
        tally: tally.current!, stats: stats.current!, verdict: verdict.current!,
      },
      emit: { card: setCard, speed: setSpeed },
    })
    api.current = s
    const meshMod = createAgentMesh({ mesh: s.mesh })
    return () => { meshMod.dispose(); s.dispose(); api.current = null }
  }, [])

  // Adopt the real board. Orbs are keyed by task id inside the engine, so a
  // poll returning the same tasks keeps their positions.
  useEffect(() => {
    api.current?.setFleet(tasks.map(t => ({
      id: t.id,
      label: t.assignedAgentId || t.title || t.id,
      status: t.status,
    })))
  }, [tasks])

  return (
    <>
      <canvas id="glow" ref={glow}></canvas>
      <canvas id="field" ref={field}></canvas>

      <div className="ov" id="hud">
        <h1><i></i>Agent Mesh<em>Workflow</em></h1>
        <div className="tally" id="tally" ref={tally}>—</div>
      </div>

      {/* each roster row carries a mini canvas repainted every frame; the engine owns it entirely */}
      <div className="ov" id="roster" ref={roster}></div>
      <div className={'ov' + (card ? ' on' : '')} id="inspect">
        {card && <>
          <h3><i style={{ background: card.color }}></i>A{card.n} · {card.cn}
            <button className="x" type="button" onClick={() => api.current?.closeCard()}>✕</button></h3>
          <div className="kv">
            <span>Current state</span><b id="i-st">{card.st}</b>
            <span>State visualization</span><b id="i-md">{card.md}</b>
            <span>Task</span><b id="i-tk">{card.tk}</b>
            <span>Queue</span><b id="i-q">{card.q}</b>
            <span>Utilization</span><b id="i-u">{card.u}</b>
            <span>State program</span><b>{card.prog}</b>
          </div>
          <div className="hist">
            {card.hist.map((v, i) => (
              <i key={i} style={{ height: v ? '100%' : '16%', background: v ? card.color : 'var(--line)' }}></i>
            ))}
          </div>
          <div className="note">The strip shows busy and idle time over the last 28 seconds. Long gaps mean spare capacity; a full strip marks a constraint.</div>
          <div className="act">
            <button className={'btn' + (card.off ? ' on' : '')} data-act="off" type="button"
              onClick={() => api.current?.cardAct('off')}>{card.off ? 'Bring online' : 'Take offline'}</button>
            <button className="btn" data-act="kick" type="button"
              onClick={() => api.current?.cardAct('kick')}>Interrupt and reassign</button>
          </div>
        </>}
      </div>

      <div className="ov" id="ctl">
        <div className="fld">Arrival rate <b id="lamv">{lam} /min</b>
          <input type="range" id="lam" min="4" max="46" step="1" value={lam}
            onChange={e => { setLam(+e.target.value); api.current?.setLam(+e.target.value) }} /></div>
        <div className="seg" id="spd">
          {SPEEDS.map(([s, label]) => (
            <button key={s} className={speed === s ? 'on' : ''} data-s={s} type="button"
              onClick={() => api.current?.setSpeed(s)}>{label}</button>
          ))}
        </div>
        <span className="sp"></span>
        <div id="stats" ref={stats}></div>
        <div id="verdict" ref={verdict}>—</div>
      </div>

      <div id="tip">Move cursor near agents to call them · click to inspect · hold to interrupt and reassign · Space to pause</div>
    </>
  )
}
