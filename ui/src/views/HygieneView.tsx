import { useEffect, useState, useCallback } from 'react'
import { fetchHygiene, fetchMachine, fetchRepos } from '../lib/brain-client'
import type { HygieneData, HygieneCheckout, HygieneFinding, MachineData, ReposData } from '../types'

interface HygieneViewProps {
  workspaceId: string
}

type HygieneTab = 'workspace' | 'machine' | 'repos'
type LoadState = 'loading' | 'unavailable' | 'unreachable' | 'error' | 'ready'

function levelClass(level: 'ok' | 'attention' | 'risk'): string {
  if (level === 'risk') return 'hygiene-risk'
  if (level === 'attention') return 'hygiene-attention'
  return 'hygiene-ok'
}

function levelLabel(level: 'ok' | 'attention' | 'risk'): string {
  if (level === 'risk') return '● Risiko'
  if (level === 'attention') return '◌ Achtung'
  return '● Ok'
}

function CopyableCommand({ cmd, label }: { cmd: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }, [cmd])
  return (
    <div className="hygiene-cmd-row">
      <code className="hygiene-cmd">{cmd}</code>
      <button
        type="button"
        className="hygiene-copy-btn"
        onClick={handleCopy}
        title={label ?? "Befehl in Zwischenablage kopieren"}
        aria-label={label ?? "Befehl kopieren"}
      >
        {copied ? 'Kopiert' : 'Kopieren'}
      </button>
    </div>
  )
}

function CheckoutCard({ co }: { co: HygieneCheckout }) {
  const [open, setOpen] = useState(false)
  const hasIssues = co.dirtyFiles > 0 || co.untrackedFiles > 0 || co.stashes > 0 || co.unpushed.length > 0 || co.orphan
  const cardLevel = co.orphan || co.dirtyFiles > 5 ? 'risk' : hasIssues ? 'attention' : 'ok'

  return (
    <div className={`hygiene-checkout-card ${levelClass(cardLevel)}`}>
      <button
        type="button"
        className="hygiene-checkout-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={`hygiene-badge hygiene-badge-${cardLevel}`}>{levelLabel(cardLevel)}</span>
        <span className="hygiene-checkout-path">{co.path}</span>
        <span className="hygiene-checkout-meta">
          {co.repo} · {co.branch}
        </span>
        <span className="hygiene-toggle">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="hygiene-checkout-detail">
          <div className="hygiene-stat-grid">
            <div className="hygiene-stat">
              <span className="hygiene-stat-label">Geänderte Dateien</span>
              <span className={`hygiene-stat-value ${co.dirtyFiles > 0 ? 'hygiene-stat-warn' : ''}`}>{co.dirtyFiles}</span>
            </div>
            <div className="hygiene-stat">
              <span className="hygiene-stat-label">Unverfolgte Dateien</span>
              <span className={`hygiene-stat-value ${co.untrackedFiles > 0 ? 'hygiene-stat-warn' : ''}`}>{co.untrackedFiles}</span>
            </div>
            <div className="hygiene-stat">
              <span className="hygiene-stat-label">Stashes</span>
              <span className={`hygiene-stat-value ${co.stashes > 0 ? 'hygiene-stat-warn' : ''}`}>{co.stashes}</span>
            </div>
            <div className="hygiene-stat">
              <span className="hygiene-stat-label">Größe</span>
              <span className="hygiene-stat-value">{co.sizeMb.toFixed(0)} MB</span>
            </div>
            <div className="hygiene-stat">
              <span className="hygiene-stat-label">Zuletzt aktiv</span>
              <span className={`hygiene-stat-value ${co.staleDays > 30 ? 'hygiene-stat-warn' : ''}`}>{co.staleDays} Tage</span>
            </div>
            {co.orphan && (
              <div className="hygiene-stat hygiene-stat-full">
                <span className="hygiene-badge hygiene-badge-risk">Verwaister Checkout / Worktree</span>
              </div>
            )}
          </div>

          {co.unpushed.length > 0 && (
            <div className="hygiene-section">
              <div className="hygiene-section-title">Ungepushte Branches</div>
              {co.unpushed.map((u, i) => (
                <div key={i} className="hygiene-unpushed-row">
                  <span className="hygiene-branch">{u.branch}</span>
                  <span className="hygiene-ahead">{u.ahead} Commits voraus</span>
                  {u.upstream ? (
                    <span className="hygiene-upstream">→ {u.upstream}</span>
                  ) : (
                    <span className="hygiene-no-upstream">Kein Upstream konfiguriert</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {co.claims && co.claims.length > 0 && (
            <div className="hygiene-section">
              <div className="hygiene-section-title">Aktive Sperren (Claims)</div>
              {co.claims.map((c, i) => (
                <div key={i} className="hygiene-claim-row">
                  <span className="hygiene-agent">{c.agent}</span>
                  <span className="hygiene-claim-paths">{c.paths.join(', ')}</span>
                  {c.conflictsWith.length > 0 && (
                    <span className="hygiene-conflicts">Konflikt mit: {c.conflictsWith.join(', ')}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {(co.dirtyFiles > 0 || co.stashes > 0) && (
            <div className="hygiene-section">
              <div className="hygiene-section-title">WIP sichern — Befehl zum Kopieren</div>
              <CopyableCommand cmd={`cd "${co.path}" && git stash push -m "wip-$(date +%Y%m%d-%H%M%S)"`} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function FindingRow({ f }: { f: HygieneFinding }) {
  return (
    <div className={`hygiene-finding-row ${levelClass(f.level)}`}>
      <span className={`hygiene-badge hygiene-badge-${f.level}`}>{levelLabel(f.level)}</span>
      <div className="hygiene-finding-body">
        <div className="hygiene-finding-text">{f.text}</div>
        {f.paths.length > 0 && (
          <div className="hygiene-finding-paths">{f.paths.join(', ')}</div>
        )}
        {f.fix && (
          <CopyableCommand cmd={f.fix} />
        )}
      </div>
    </div>
  )
}

export default function HygieneView({ workspaceId }: HygieneViewProps) {
  const [activeTab, setActiveTab] = useState<HygieneTab>('workspace')
  const [hygieneData, setHygieneData] = useState<HygieneData | null>(null)
  const [hygieneState, setHygieneState] = useState<LoadState>('loading')
  const [hygieneError, setHygieneError] = useState('')

  const [machineData, setMachineData] = useState<MachineData | null>(null)
  const [machineState, setMachineState] = useState<LoadState>('loading')

  const [reposData, setReposData] = useState<ReposData | null>(null)
  const [reposState, setReposState] = useState<LoadState>('loading')

  const [wipModalOpen, setWipModalOpen] = useState(false)

  const loadHygiene = useCallback(() => {
    if (!workspaceId) {
      setHygieneState('unavailable')
      return
    }
    setHygieneState('loading')
    fetchHygiene(workspaceId).then(result => {
      if ('routeMissing' in result) {
        setHygieneState('unavailable')
      } else if ('unreachable' in result) {
        setHygieneError('Brain nicht erreichbar — läuft plugbrain serve?')
        setHygieneState('unreachable')
      } else if ('serverError' in result) {
        setHygieneError(`Fehler ${result.status}: ${result.error}`)
        setHygieneState('error')
      } else {
        setHygieneData(result as HygieneData)
        setHygieneState('ready')
      }
    }).catch(err => {
      setHygieneError(err?.message ?? 'Unbekannter Fehler')
      setHygieneState('error')
    })
  }, [workspaceId])

  const loadMachine = useCallback(() => {
    setMachineState('loading')
    fetchMachine().then(result => {
      if ('routeMissing' in result) {
        setMachineState('unavailable')
      } else if ('unreachable' in result) {
        setMachineState('unreachable')
      } else if ('serverError' in result) {
        setMachineState('error')
      } else {
        setMachineData(result as MachineData)
        setMachineState('ready')
      }
    }).catch(() => {
      setMachineState('unreachable')
    })
  }, [])

  const loadRepos = useCallback(() => {
    setReposState('loading')
    fetchRepos().then(result => {
      if ('routeMissing' in result) {
        setReposState('unavailable')
      } else if ('unreachable' in result) {
        setReposState('unreachable')
      } else if ('serverError' in result) {
        setReposState('error')
      } else {
        setReposData(result as ReposData)
        setReposState('ready')
      }
    }).catch(() => {
      setReposState('unreachable')
    })
  }, [])

  useEffect(() => {
    loadHygiene()
    loadMachine()
    loadRepos()
  }, [loadHygiene, loadMachine, loadRepos])

  return (
    <div className="hygiene-view">
      <div className="view-header">
        <div className="view-header-text">
          <h2 className="view-title">Aufräumen</h2>
          <p className="view-subtitle">Checkouts, ungepushte Branches und ungesicherte Arbeit auf einen Blick</p>
        </div>
        <div className="view-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setWipModalOpen(true)}
            title="Befehl zum Sichern ungesicherter Arbeit anzeigen"
          >
            WIP sichern
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => { loadHygiene(); loadMachine(); loadRepos(); }}
            title="Hygiene-Status neu laden"
          >
            ↻ Aktualisieren
          </button>
        </div>
      </div>

      {/* Subtabs */}
      <div className="hygiene-subnav" role="tablist" aria-label="Hygiene-Bereiche">
        <button
          type="button"
          role="tab"
          className={`hygiene-subnav-btn ${activeTab === 'workspace' ? 'active' : ''}`}
          aria-selected={activeTab === 'workspace'}
          onClick={() => setActiveTab('workspace')}
        >
          Workspace-Checkouts
        </button>
        <button
          type="button"
          role="tab"
          className={`hygiene-subnav-btn ${activeTab === 'machine' ? 'active' : ''}`}
          aria-selected={activeTab === 'machine'}
          onClick={() => setActiveTab('machine')}
        >
          System & Festplatten
        </button>
        <button
          type="button"
          role="tab"
          className={`hygiene-subnav-btn ${activeTab === 'repos' ? 'active' : ''}`}
          aria-selected={activeTab === 'repos'}
          onClick={() => setActiveTab('repos')}
        >
          Globale Git-Inventur
        </button>
      </div>

      {/* WIP Modal / Info dialog */}
      {wipModalOpen && (
        <div className="hygiene-modal-backdrop" onClick={() => setWipModalOpen(false)}>
          <div className="hygiene-modal-content" onClick={e => e.stopPropagation()}>
            <div className="hygiene-modal-header">
              <h3 className="hygiene-modal-title">WIP sichern (Ungesicherte Arbeit)</h3>
              <button
                type="button"
                className="hygiene-modal-close"
                onClick={() => setWipModalOpen(false)}
                aria-label="Schließen"
              >
                ✕
              </button>
            </div>
            <div className="hygiene-modal-body">
              <p>
                Der folgende Befehl legt automatisch WIP-Snapshots über einen temporären Index an.
                <strong> Dein Arbeitsbaum und Index bleiben unverändert</strong>:
              </p>
              <CopyableCommand cmd="plugbrain hygiene --wip-snapshot" label="CLI-Befehl kopieren" />
              <div className="hygiene-modal-note">
                <p className="hygiene-note-title">Was bewirkt dieser Befehl?</p>
                <p>
                  Er erstellt WIP-Commits unter <code>refs/wip/&lt;datum&gt;/&lt;name&gt;</code> für alle
                  schmutzigen Checkouts. Deine lokalen Dateien und uncommitted Changes werden dabei nicht berührt.
                </p>
              </div>
            </div>
            <div className="hygiene-modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setWipModalOpen(false)}>
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Workspace */}
      {activeTab === 'workspace' && (
        <div className="hygiene-tab-content">
          {hygieneState === 'loading' && (
            <div className="hygiene-status-box">
              <div className="hygiene-spinner" aria-label="Wird geladen…" />
              <p className="hygiene-status-text">Hygiene-Daten werden abgerufen…</p>
            </div>
          )}

          {hygieneState === 'unavailable' && (
            <div className="hygiene-status-box hygiene-offline">
              <p className="hygiene-status-title">Hygiene-Daten nicht verfügbar</p>
              <p className="hygiene-status-text">
                {workspaceId
                  ? 'Die Route /api/hygiene ist auf diesem Kern noch nicht aktiv (Lane HYG-01).'
                  : 'Kein Workspace ausgewählt. Öffne zunächst einen Vault.'}
              </p>
              {workspaceId && (
                <button type="button" className="btn btn-secondary" onClick={loadHygiene}>Erneut versuchen</button>
              )}
            </div>
          )}

          {hygieneState === 'unreachable' && (
            <div className="hygiene-status-box hygiene-error">
              <p className="hygiene-status-title">Brain nicht erreichbar</p>
              <p className="hygiene-status-text">Keine Verbindung zum Brain-Server — läuft <code>plugbrain serve</code>?</p>
              <button type="button" className="btn btn-secondary" onClick={loadHygiene}>Erneut versuchen</button>
            </div>
          )}

          {hygieneState === 'error' && (
            <div className="hygiene-status-box hygiene-error">
              <p className="hygiene-status-title">Fehler beim Laden</p>
              <p className="hygiene-status-text">{hygieneError}</p>
              <button type="button" className="btn btn-secondary" onClick={loadHygiene}>Erneut versuchen</button>
            </div>
          )}

          {hygieneState === 'ready' && hygieneData && (
            <>
              {/* Summary banner */}
              <div className={`hygiene-summary-banner ${levelClass(hygieneData.summary.level)}`}>
                <span className={`hygiene-badge hygiene-badge-${hygieneData.summary.level}`}>{levelLabel(hygieneData.summary.level)}</span>
                <span className="hygiene-summary-text">{hygieneData.summary.text}</span>
                <span className="hygiene-summary-meta">
                  Freier Speicher: {hygieneData.diskFreeGb.toFixed(1)} GB ·
                  Geprüft: {new Date(hygieneData.checkedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Findings */}
              {hygieneData.findings.length > 0 && (
                <section className="hygiene-section-container">
                  <h3 className="hygiene-section-heading">Befunde ({hygieneData.findings.length})</h3>
                  <div className="hygiene-findings-list">
                    {hygieneData.findings.map((f, i) => <FindingRow key={i} f={f} />)}
                  </div>
                </section>
              )}

              {/* Checkouts */}
              <section className="hygiene-section-container">
                <h3 className="hygiene-section-heading">Checkouts ({hygieneData.checkouts.length})</h3>
                {hygieneData.checkouts.length === 0 ? (
                  <div className="hygiene-empty">
                    <p>Keine Checkouts im aktuellen Workspace gefunden.</p>
                  </div>
                ) : (
                  <div className="hygiene-checkouts-list">
                    {hygieneData.checkouts.map((co, i) => <CheckoutCard key={i} co={co} />)}
                  </div>
                )}
              </section>

              {/* Unavailable fields */}
              {hygieneData.unavailable && hygieneData.unavailable.length > 0 && (
                <div className="hygiene-unavailable-note">
                  <span>Teile der Daten nicht verfügbar: {hygieneData.unavailable.join(', ')}</span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Tab: System & Festplatten (/api/machine) */}
      {activeTab === 'machine' && (
        <div className="hygiene-tab-content">
          {machineState === 'loading' && (
            <div className="hygiene-status-box">
              <div className="hygiene-spinner" aria-label="Wird geladen…" />
              <p className="hygiene-status-text">System-Ressourcen werden ermittelt…</p>
            </div>
          )}

          {machineState === 'unavailable' && (
            <div className="hygiene-status-box hygiene-offline">
              <p className="hygiene-status-title">System-Status nicht verfügbar</p>
              <p className="hygiene-status-text">
                Die Schnittstelle <code>/api/machine</code> ist in dieser Version des Kerns noch nicht aktiv (Lane HYG-02).
              </p>
            </div>
          )}

          {machineState === 'unreachable' && (
            <div className="hygiene-status-box hygiene-error">
              <p className="hygiene-status-title">Brain nicht erreichbar</p>
              <p className="hygiene-status-text">Keine Verbindung zum Brain-Server — läuft <code>plugbrain serve</code>?</p>
              <button type="button" className="btn btn-secondary" onClick={loadMachine}>Erneut versuchen</button>
            </div>
          )}

          {machineState === 'error' && (
            <div className="hygiene-status-box hygiene-error">
              <p className="hygiene-status-title">Fehler beim Laden</p>
              <p className="hygiene-status-text">System-Daten konnten nicht geladen werden.</p>
              <button type="button" className="btn btn-secondary" onClick={loadMachine}>Erneut versuchen</button>
            </div>
          )}

          {machineState === 'ready' && machineData && (
            <div className="hygiene-machine-container">
              {machineData.drives && machineData.drives.length > 0 && (
                <section className="hygiene-section-container">
                  <h3 className="hygiene-section-heading">Festplatten & Partitionen</h3>
                  <div className="hygiene-drives-grid">
                    {machineData.drives.map((d, i) => (
                      <div key={i} className={`hygiene-drive-card ${levelClass(d.level)}`}>
                        <div className="hygiene-drive-header">
                          <span className="hygiene-drive-mount">{d.mount}</span>
                          <span className={`hygiene-badge hygiene-badge-${d.level}`}>{levelLabel(d.level)}</span>
                        </div>
                        <div className="hygiene-drive-numbers">
                          <span className="hygiene-drive-free">{d.freeGb.toFixed(1)} GB frei</span>
                          <span className="hygiene-drive-total">von {d.totalGb.toFixed(0)} GB</span>
                        </div>
                        <div className="hygiene-progress-bar">
                          <div
                            className="hygiene-progress-fill"
                            style={{ width: `${Math.min(100, Math.max(0, ((d.totalGb - d.freeGb) / d.totalGb) * 100))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {machineData.forecast && machineData.forecast.length > 0 && (
                <section className="hygiene-section-container">
                  <h3 className="hygiene-section-heading">Speicher-Prognose</h3>
                  <div className="hygiene-forecast-list">
                    {machineData.forecast.map((fc, i) => (
                      <div key={i} className="hygiene-forecast-card">
                        <span className="hygiene-forecast-mount">{fc.mount}</span>
                        <span className="hygiene-forecast-text">
                          Voll in ca. <strong>{fc.fullInHours.toFixed(1)} Stunden</strong> ({fc.trendGbPerHour > 0 ? '+' : ''}{fc.trendGbPerHour.toFixed(1)} GB/h, Basis: {fc.basis})
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {machineData.findings && machineData.findings.length > 0 && (
                <section className="hygiene-section-container">
                  <h3 className="hygiene-section-heading">System-Befunde</h3>
                  <div className="hygiene-findings-list">
                    {machineData.findings.map((f, i) => (
                      <div key={i} className={`hygiene-finding-row ${levelClass(f.level)}`}>
                        <span className={`hygiene-badge hygiene-badge-${f.level}`}>{levelLabel(f.level)}</span>
                        <div className="hygiene-finding-body">
                          <div className="hygiene-finding-text">{f.text}</div>
                          {f.fix && <CopyableCommand cmd={f.fix} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Globale Repos (/api/repos) */}
      {activeTab === 'repos' && (
        <div className="hygiene-tab-content">
          {reposState === 'loading' && (
            <div className="hygiene-status-box">
              <div className="hygiene-spinner" aria-label="Wird geladen…" />
              <p className="hygiene-status-text">Globale Git-Inventur wird abgerufen…</p>
            </div>
          )}

          {reposState === 'unavailable' && (
            <div className="hygiene-status-box hygiene-offline">
              <p className="hygiene-status-title">Globale Git-Inventur nicht verfügbar</p>
              <p className="hygiene-status-text">
                Die Schnittstelle <code>/api/repos</code> ist in dieser Version des Kerns noch nicht aktiv (Lane HYG-02).
              </p>
            </div>
          )}

          {reposState === 'unreachable' && (
            <div className="hygiene-status-box hygiene-error">
              <p className="hygiene-status-title">Brain nicht erreichbar</p>
              <p className="hygiene-status-text">Keine Verbindung zum Brain-Server — läuft <code>plugbrain serve</code>?</p>
              <button type="button" className="btn btn-secondary" onClick={loadRepos}>Erneut versuchen</button>
            </div>
          )}

          {reposState === 'error' && (
            <div className="hygiene-status-box hygiene-error">
              <p className="hygiene-status-title">Fehler beim Laden</p>
              <p className="hygiene-status-text">Globale Git-Inventur konnte nicht geladen werden.</p>
              <button type="button" className="btn btn-secondary" onClick={loadRepos}>Erneut versuchen</button>
            </div>
          )}

          {reposState === 'ready' && reposData && (
            <div className="hygiene-repos-container">
              <div className="hygiene-summary-banner hygiene-ok">
                <span className="hygiene-summary-text">
                  Gefunden: {reposData.totals.repos} Repositories ({reposData.totals.dirty} mit Änderungen, {reposData.totals.unpushedBranches} ungepushte Branches, {reposData.totals.orphanWorktrees} verwaiste Worktrees)
                </span>
                <span className="hygiene-summary-meta">
                  Geprüfte Roots: {reposData.roots.join(', ')}
                </span>
              </div>

              <section className="hygiene-section-container">
                <h3 className="hygiene-section-heading">Gefundene Repositories ({reposData.repos.length})</h3>
                <div className="hygiene-checkouts-list">
                  {reposData.repos.map((r, i) => (
                    <div key={i} className={`hygiene-checkout-card ${r.dirtyFiles > 0 ? 'hygiene-attention' : 'hygiene-ok'}`}>
                      <div className="hygiene-checkout-header">
                        <span className={`hygiene-badge ${r.dirtyFiles > 0 ? 'hygiene-badge-attention' : 'hygiene-badge-ok'}`}>
                          {r.dirtyFiles > 0 ? '◌ Achtung' : '● Ok'}
                        </span>
                        <span className="hygiene-checkout-path">{r.path}</span>
                        <span className="hygiene-checkout-meta">{r.branch}</span>
                      </div>
                      <div className="hygiene-checkout-detail" style={{ display: 'block' }}>
                        <div className="hygiene-stat-grid">
                          <div className="hygiene-stat">
                            <span className="hygiene-stat-label">Geändert</span>
                            <span className="hygiene-stat-value">{r.dirtyFiles}</span>
                          </div>
                          <div className="hygiene-stat">
                            <span className="hygiene-stat-label">Worktrees</span>
                            <span className="hygiene-stat-value">{r.worktrees}</span>
                          </div>
                          <div className="hygiene-stat">
                            <span className="hygiene-stat-label">Größe</span>
                            <span className="hygiene-stat-value">{(r.gitSizeMb + r.workTreeSizeMb).toFixed(0)} MB</span>
                          </div>
                          <div className="hygiene-stat">
                            <span className="hygiene-stat-label">Letzter Commit vor</span>
                            <span className="hygiene-stat-value">{r.lastCommitDays} Tagen</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
