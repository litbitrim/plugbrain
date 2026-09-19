import { useEffect, useRef, useState, type RefObject } from 'react'
import { createSwarm } from '../lib/mesh/swarm.js'
import { createAgentMesh } from '../lib/mesh/mesh.js'
import {
  fetchAgentPresence,
  fetchActiveLeases,
  fetchAgentInspect,
  type AgentPresenceItem,
  type LeaseItem,
  type AgentInspectResult,
} from '../lib/brain-client'
import type { BoardTask } from '../types.js'

const SPEEDS = [[0, '⏸'], [1, '1×'], [2, '2×'], [4, '4×']] as const

interface MeshViewProps {
  tasks: BoardTask[]
  workspaceId?: string
  onSelectFile?: (path: string) => void
}

/**
 * The Agent Mesh view (M4/M5: Live Swarm).
 * Visualizes real swarm agents, active leases, collisions, messages, and handoffs.
 * Clicking an agent displays their current task, checkout, active claims,
 * and latest tool and file events.
 */
/**
 * The panels the swarm ENGINE paints into.
 *
 * They are deliberately NOT on screen. The engine is a visualiser and its
 * readouts are simulated: throughput, lead time, utilisation per stage and
 * "messages in transit" are computed from the fleet it is animating, not from
 * the ledger. Showing them beside a roster of REAL agents made the two
 * indistinguishable — the headline numbers of this view were invented.
 *
 * So the engine keeps painting (it needs somewhere to write), that somewhere is
 * hidden, and everything a reader sees is rendered from the daemon below.
 */
function EnginePanels({ tally, stats, verdict }: {
  tally: RefObject<HTMLDivElement | null>
  stats: RefObject<HTMLDivElement | null>
  verdict: RefObject<HTMLDivElement | null>
}) {
  return (
    <div aria-hidden="true" data-engine-panels="hidden-simulated-metrics" style={{ display: 'none' }}>
      <div id="tally" ref={tally}></div>
      <div id="stats" ref={stats}></div>
      <div id="verdict" ref={verdict}></div>
    </div>
  )
}

export default function MeshView({ tasks, workspaceId, onSelectFile }: MeshViewProps) {
  const glow = useRef<HTMLCanvasElement>(null)
  const field = useRef<HTMLCanvasElement>(null)
  const roster = useRef<HTMLDivElement>(null)
  const tally = useRef<HTMLDivElement>(null)
  const stats = useRef<HTMLDivElement>(null)
  const verdict = useRef<HTMLDivElement>(null)
  const api = useRef<ReturnType<typeof createSwarm> | null>(null)

  const [speed, setSpeed] = useState(1)
  const [agents, setAgents] = useState<AgentPresenceItem[]>([])
  const [leases, setLeases] = useState<LeaseItem[]>([])
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const selectedAgentIdRef = useRef<string | null>(null)
  selectedAgentIdRef.current = selectedAgentId
  const [inspectData, setInspectData] = useState<AgentInspectResult | null>(null)
  const [inspectLoading, setInspectLoading] = useState(false)
  const [liveLog, setLiveLog] = useState<Array<{ id: string; time: string; text: string; color?: string }>>([])

  // Load real swarm state
  const refreshSwarm = async () => {
    try {
      const [presenceList, leaseList] = await Promise.all([
        fetchAgentPresence(workspaceId),
        fetchActiveLeases(workspaceId),
      ])
      setAgents(presenceList)
      setLeases(leaseList)
      if (!selectedAgentIdRef.current && presenceList.length > 0) {
        void handleSelectAgent(presenceList[0].id)
      }
    } catch {
      // Swarm server may be starting or offline
    }
  }

  useEffect(() => {
    void refreshSwarm()
    const interval = setInterval(refreshSwarm, 3000)
    return () => clearInterval(interval)
  }, [workspaceId])

  // Connect to live SSE events from /api/live/events
  useEffect(() => {
    let sse: EventSource | null = null
    try {
      sse = new EventSource('/api/live/events')
      sse.addEventListener('agent.registered', (e: any) => {
        try {
          const data = JSON.parse(e.data)
          setLiveLog(prev => [{
            id: `reg-${Date.now()}-${Math.random()}`,
            time: new Date().toLocaleTimeString(),
            text: `Agent registriert: ${data.name || data.agentId}`,
            color: 'var(--accent)',
          }, ...prev.slice(0, 8)])
          void refreshSwarm()
        } catch {}
      })
      sse.addEventListener('agent.heartbeat', () => {
        void refreshSwarm()
      })
      sse.addEventListener('lease.acquired', (e: any) => {
        try {
          const data = JSON.parse(e.data)
          setLiveLog(prev => [{
            id: `claim-${Date.now()}-${Math.random()}`,
            time: new Date().toLocaleTimeString(),
            text: `Claim: ${data.agentId} sperrt ${Array.isArray(data.paths) ? data.paths.join(', ') : 'Ressource'}`,
            color: '#e0a355',
          }, ...prev.slice(0, 8)])
          void refreshSwarm()
        } catch {}
      })
      sse.addEventListener('lease.released', (e: any) => {
        try {
          const data = JSON.parse(e.data)
          setLiveLog(prev => [{
            id: `rel-${Date.now()}-${Math.random()}`,
            time: new Date().toLocaleTimeString(),
            text: `Claim freigegeben: ${data.agentId}`,
            color: '#8ac1a0',
          }, ...prev.slice(0, 8)])
          void refreshSwarm()
        } catch {}
      })
      sse.addEventListener('message.sent', (e: any) => {
        try {
          const data = JSON.parse(e.data)
          setLiveLog(prev => [{
            id: `msg-${Date.now()}-${Math.random()}`,
            time: new Date().toLocaleTimeString(),
            text: `Nachricht: ${data.fromAgent} → ${data.toAgent || 'Kanal'} (${data.subject || 'Info'})`,
            color: '#8ab2d1',
          }, ...prev.slice(0, 8)])
          void refreshSwarm()
        } catch {}
      })
    } catch {}

    return () => {
      if (sse) sse.close()
    }
  }, [])

  // Initialize Swarm visualizer
  useEffect(() => {
    const s = createSwarm({
      els: {
        glow: glow.current!, field: field.current!, roster: roster.current!,
        tally: tally.current!, stats: stats.current!, verdict: verdict.current!,
      },
      emit: {
        card: (c: any) => {
          if (c?.tk) {
            // Match agent by task or name
            const match = agents.find(a => a.taskId === c.tk || a.name === c.cn || a.id === c.cn)
            if (match) handleSelectAgent(match.id)
          }
        },
        speed: setSpeed,
      },
    })
    api.current = s
    const meshMod = createAgentMesh({ mesh: s.mesh })
    return () => { meshMod.dispose(); s.dispose(); api.current = null }
  }, [agents])

  // Adopt real swarm agents in visualization
  useEffect(() => {
    if (agents.length > 0) {
      api.current?.setFleet(agents.map(a => ({
        id: a.id,
        label: `${a.name} (${a.presence.toUpperCase()})`,
        status: a.presence === 'active' ? 'RUNNING' : a.presence === 'idle' ? 'REVIEW' : 'PLANNED',
      })))
    } else {
      api.current?.setFleet(tasks.map(t => ({
        id: t.id,
        label: t.assignedAgentId || t.title || t.id,
        status: t.status,
      })))
    }
  }, [agents, tasks])

  // Select and inspect agent
  const handleSelectAgent = async (agentId: string) => {
    setSelectedAgentId(agentId)
    setInspectLoading(true)
    try {
      const data = await fetchAgentInspect(agentId, workspaceId)
      setInspectData(data)
    } catch {
      setInspectData(null)
    } finally {
      setInspectLoading(false)
    }
  }

  const activeCount = agents.filter(a => a.presence === 'active').length
  const idleCount = agents.filter(a => a.presence === 'idle').length
  const deadCount = agents.filter(a => a.presence === 'dead').length

  return (
    <>
      <canvas id="glow" ref={glow} aria-hidden="true"></canvas>
      <canvas id="field" ref={field} aria-hidden="true"></canvas>

      {/* The engine writes its simulated readouts here; nothing of it is shown. */}
      <EnginePanels tally={tally} stats={stats} verdict={verdict} />

      <div className="ov" id="hud">
        <h1><i></i>Agent Mesh<em>Swarm Coordination</em></h1>
        {/* Real numbers, or an honest statement that there is nothing to show. */}
        <div className="tally" id="swarm-tally">
          {agents.length > 0 ? (
            <span style={{ fontSize: '13px', color: 'var(--text)' }}>
              <b style={{ color: 'var(--accent)' }}>{agents.length} Agenten</b> ({activeCount} aktiv · {idleCount} idle · {deadCount} tot) ·{' '}
              <b style={{ color: '#e0a355' }}>{leases.length} Claims</b> ·{' '}
              <b>{tasks.length} Tasks in der Queue</b>
            </span>
          ) : (
            'Keine aktiven Swarm-Agenten registriert'
          )}
        </div>
      </div>

      {/* Swarm Roster list overlay */}
      <div
        className="ov"
        style={{
          position: 'absolute',
          top: '70px',
          left: '20px',
          width: '260px',
          maxHeight: 'calc(100vh - 160px)',
          overflowY: 'auto',
          background: 'rgba(18, 20, 24, 0.88)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: '12px',
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--faint)', marginBottom: '8px' }}>
          Swarm Agenten ({agents.length})
        </div>

        {agents.length === 0 ? (
          <div style={{ fontSize: '12px', color: 'var(--faint)', padding: '8px 0' }}>
            Warte auf Agent-Registrierung über <code>/api/agent/register</code> oder MCP …
          </div>
        ) : (
          agents.map(a => {
            const isSel = selectedAgentId === a.id
            const stateColor = a.presence === 'active' ? '#8ac1a0' : a.presence === 'idle' ? '#e0a355' : '#d1a3a3'
            return (
              <div
                key={a.id}
                onClick={() => handleSelectAgent(a.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  background: isSel ? 'rgba(138, 178, 209, 0.16)' : 'rgba(255,255,255,0.02)',
                  border: isSel ? '1px solid var(--accent)' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: a.color || 'var(--accent)',
                      display: 'inline-block',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
                      {a.name || a.id}
                    </div>
                    <div className="mono" style={{ fontSize: '10px', color: 'var(--faint)' }}>
                      {a.taskId || 'kein aktiver Task'}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: stateColor,
                    background: `${stateColor}22`,
                  }}
                >
                  {a.presence}
                </span>
              </div>
            )
          })
        )}

        {liveLog.length > 0 && (
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--faint)', marginBottom: '6px' }}>
              Live-Ereignisse (SSE)
            </div>
            {liveLog.slice(0, 5).map(evt => (
              <div key={evt.id} style={{ fontSize: '11px', marginBottom: '4px', color: evt.color || 'var(--text)' }}>
                <span className="mono" style={{ color: 'var(--faint)', marginRight: '6px' }}>{evt.time}</span>
                {evt.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden engine roster ref */}
      <div id="roster" ref={roster} style={{ display: 'none' }}></div>

      {/* Agent Full Inspector Drawer (M5 Requirement) */}
      <div
        className={'ov' + (selectedAgentId ? ' on' : '')}
        id="inspect"
        style={{
          width: '380px',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          background: 'rgba(18, 20, 24, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: '16px',
          zIndex: 20,
        }}
      >
        {inspectLoading && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--faint)' }}>
            Lade Agent-Details …
          </div>
        )}

        {inspectData?.agent && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: inspectData.agent.color || 'var(--accent)',
                    display: 'inline-block',
                  }}
                />
                <h3 style={{ margin: 0, fontSize: '15px' }}>
                  {inspectData.agent.name} <span className="mono" style={{ fontSize: '12px', color: 'var(--faint)' }}>({inspectData.agent.id})</span>
                </h3>
              </div>
              <button
                className="x"
                type="button"
                onClick={() => { setSelectedAgentId(null); setInspectData(null) }}
                title="Schließen"
              >
                ✕
              </button>
            </div>

            <div className="kv" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '6px 12px', fontSize: '12px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--faint)' }}>Status</span>
              <b style={{ color: inspectData.agent.state === 'active' ? '#8ac1a0' : inspectData.agent.state === 'idle' ? '#e0a355' : '#d1a3a3' }}>
                {inspectData.agent.state.toUpperCase()}
              </b>

              <span style={{ color: 'var(--faint)' }}>Modell</span>
              <b className="mono">{inspectData.agent.model || '—'}</b>

              <span style={{ color: 'var(--faint)' }}>Host</span>
              <b className="mono">{inspectData.agent.host || 'local'}</b>

              <span style={{ color: 'var(--faint)' }}>Aktiver Task</span>
              <b className="mono">{inspectData.agent.taskId || 'kein Task aktiv'}</b>

              <span style={{ color: 'var(--faint)' }}>Mission</span>
              <b>{inspectData.agent.missionId || '—'}</b>

              <span style={{ color: 'var(--faint)' }}>Checkout</span>
              <b className="mono">{inspectData.agent.checkoutId || '—'}</b>

              <span style={{ color: 'var(--faint)' }}>Heartbeat</span>
              <b className="mono">
                {inspectData.agent.lastHeartbeat ? new Date(inspectData.agent.lastHeartbeat).toLocaleTimeString() : '—'}
              </b>
            </div>

            {/* Aktive Claims / Leases */}
            <div style={{ marginBottom: '14px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
                Aktive Claims / Leases ({inspectData.claims.length})
              </div>
              {inspectData.claims.length === 0 ? (
                <div style={{ fontSize: '11px', color: 'var(--faint)' }}>Keine aktiven Claims gehalten</div>
              ) : (
                inspectData.claims.map((claim, idx) => (
                  <div
                    key={claim.id || idx}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--line)',
                      borderRadius: '4px',
                      padding: '6px 8px',
                      marginBottom: '6px',
                      fontSize: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 600, color: claim.mode === 'write' ? '#e0a355' : 'var(--accent)' }}>
                        {claim.mode.toUpperCase()} LEASE
                      </span>
                      <span className="mono" style={{ color: 'var(--faint)' }}>Epoch {claim.epoch}</span>
                    </div>
                    {claim.paths.map(p => (
                      <div
                        key={p}
                        className="mono"
                        style={{ color: 'var(--text)', cursor: onSelectFile ? 'pointer' : 'default', textDecoration: onSelectFile ? 'underline' : 'none' }}
                        onClick={() => onSelectFile?.(p)}
                        title={onSelectFile ? 'In Quellansicht öffnen' : p}
                      >
                        📄 {p}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Letzte Dateiereignisse */}
            <div style={{ marginBottom: '14px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
                Letzte Dateiereignisse ({inspectData.dateiereignisse.length})
              </div>
              {inspectData.dateiereignisse.length === 0 ? (
                <div style={{ fontSize: '11px', color: 'var(--faint)' }}>Keine Dateizugriffe protokolliert</div>
              ) : (
                inspectData.dateiereignisse.slice(0, 6).map(evt => (
                  <div
                    key={evt.id}
                    style={{
                      fontSize: '11px',
                      padding: '4px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      className="mono"
                      style={{ cursor: onSelectFile ? 'pointer' : 'default', color: 'var(--text)' }}
                      onClick={() => onSelectFile?.(evt.path)}
                      title={onSelectFile ? 'In Quellansicht öffnen' : evt.path}
                    >
                      <b style={{ color: evt.action === 'write' ? '#e0a355' : '#8ac1a0', marginRight: '6px' }}>
                        {evt.action.toUpperCase()}
                      </b>
                      {evt.path}
                    </div>
                    <span className="mono" style={{ color: 'var(--faint)', fontSize: '10px' }}>
                      {new Date(evt.at).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Letzte Tool- / Trace-Ereignisse */}
            <div style={{ marginBottom: '14px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
                Letzte Tool- & Trace-Ereignisse ({inspectData.toolereignisse.length})
              </div>
              {inspectData.toolereignisse.length === 0 ? (
                <div style={{ fontSize: '11px', color: 'var(--faint)' }}>Keine Trace-Ereignisse</div>
              ) : (
                inspectData.toolereignisse.slice(0, 5).map(te => (
                  <div key={te.id} style={{ fontSize: '11px', padding: '3px 0' }}>
                    <span className="mono" style={{ color: '#8ab2d1', marginRight: '6px' }}>{te.type}</span>
                    <span className="mono" style={{ color: 'var(--faint)', fontSize: '10px' }}>
                      {new Date(te.occurred_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Nachrichten & Handoffs */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
                Nachrichten & Handoffs ({inspectData.messages.length})
              </div>
              {inspectData.messages.length === 0 ? (
                <div style={{ fontSize: '11px', color: 'var(--faint)' }}>Keine Nachrichten im Posteingang</div>
              ) : (
                inspectData.messages.slice(0, 4).map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--line)',
                      borderRadius: '4px',
                      padding: '6px 8px',
                      marginBottom: '6px',
                      fontSize: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <b style={{ color: 'var(--text)' }}>{msg.subject || 'Nachricht'}</b>
                      <span className="mono" style={{ color: msg.deliveredAt ? '#8ac1a0' : '#e0a355' }}>
                        {msg.deliveredAt ? 'delivered' : 'pending'}
                      </span>
                    </div>
                    <div style={{ color: 'var(--faint)', marginBottom: '2px' }}>
                      Von: {msg.fromAgent} {msg.toAgent ? `→ An: ${msg.toAgent}` : ''}
                    </div>
                    <div style={{ color: 'var(--text)' }}>{msg.body}</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <div className="ov" id="ctl">
        <div className="seg" id="spd">
          {SPEEDS.map(([s, label]) => (
            <button key={s} className={speed === s ? 'on' : ''} data-s={s} type="button"
              onClick={() => api.current?.setSpeed(s)}>{label}</button>
          ))}
        </div>
        <span className="sp"></span>
        {/* The ledger has no throughput or lead-time measurement, and inventing
            one next to real agents is exactly the confusion this view had. */}
        <div id="swarm-stats" style={{ fontSize: '11px', color: 'var(--faint)', lineHeight: 1.5 }}>
          Durchsatz, Lead Time und Auslastung: <b>nicht vorhanden</b> — das Ledger
          misst sie nicht. Was gemessen ist: Agenten, Claims, Tasks und die
          Dateiereignisse unten.
        </div>
        <div id="swarm-verdict" style={{ fontSize: '11px', color: 'var(--faint)' }}>
          {leases.length === 0 ? 'Keine offenen Claims' : `${leases.length} offene Claims`}
        </div>
      </div>

      <div id="tip">Klicke auf einen Agenten in der Liste oder im Mesh, um Tasks, Claims und Chronik anzuzeigen</div>
    </>
  )
}
