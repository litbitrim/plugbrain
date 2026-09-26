import { useEffect, useState } from 'react'
import { fetchBriefing } from '../lib/brain-client'
import type { BriefingData } from '../types'
import { Icon, ICON } from '../ui/Icon'

export interface BriefingViewProps {
  workspaceId: string
  workspaceName?: string
  onOpenFile: (path: string, line?: number | null) => void
  onOpenNotes?: () => void
  initialData?: BriefingData | null
}

export default function BriefingView({
  workspaceId,
  workspaceName,
  onOpenFile,
  onOpenNotes,
  initialData,
}: BriefingViewProps) {
  const [data, setData] = useState<BriefingData | null>(initialData ?? null)
  const [loading, setLoading] = useState(!initialData)
  const [unavailable, setUnavailable] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setData(initialData)
      setLoading(false)
      setUnavailable(false)
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    fetchBriefing(workspaceId).then(res => {
      if (!active) return
      setLoading(false)
      if ('unavailable' in res && res.unavailable) {
        setUnavailable(true)
      } else {
        setData(res as BriefingData)
      }
    }).catch(err => {
      if (!active) return
      setLoading(false)
      setError(err instanceof Error ? err.message : String(err))
    })

    return () => { active = false }
  }, [workspaceId, initialData])

  return (
    <div className="briefing-view">
      <div className="pb-view-header">
        <h2>Projekt-Briefing</h2>
        <p>Projektüberblick, Kennzahlen, Einstiegspunkte und Hotspots</p>
      </div>

      <div className="briefing-body">
        {loading && (
          <div className="briefing-card briefing-card--loading" role="status">
            <p>Briefing wird geladen …</p>
          </div>
        )}

        {unavailable && !loading && (
          <div className="briefing-card briefing-card--unavailable" role="status">
            <div className="briefing-unavailable-icon">
              <Icon path={ICON.info} />
            </div>
            <h3>Briefing in dieser Version noch nicht verfügbar</h3>
            <p>
              Die Route <code>GET /api/briefing</code> ist im angebundenen Kern noch nicht aktiv.
              Sobald Lane ASK-01 bereitgestellt ist, erscheinen hier automatisch Projekt-Zusammenfassung,
              Kennzahlen, Einstiegspunkte und Code-Hotspots.
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="briefing-card briefing-card--error" role="alert">
            <h3>Fehler beim Laden des Briefings</h3>
            <p>{error}</p>
          </div>
        )}

        {data && !loading && (
          <div className="briefing-grid">
            {/* Zusammenfassung */}
            <section className="briefing-card briefing-card--summary">
              <header className="briefing-card__head">
                <h3>{data.name || workspaceName || 'Workspace'}</h3>
              </header>
              <p className="briefing-summary-text">{data.summary || 'Keine Beschreibung hinterlegt.'}</p>
            </section>

            {/* Kennzahlen */}
            <section className="briefing-card briefing-card--stats">
              <header className="briefing-card__head">
                <h3>Kennzahlen</h3>
              </header>
              <div className="briefing-stats-row">
                <div className="briefing-stat">
                  <span className="briefing-stat__num">{data.stats?.repos ?? 0}</span>
                  <span className="briefing-stat__label">Repos</span>
                </div>
                <div className="briefing-stat">
                  <span className="briefing-stat__num">{data.stats?.files ?? 0}</span>
                  <span className="briefing-stat__label">Dateien</span>
                </div>
                <div className="briefing-stat">
                  <span className="briefing-stat__num">{data.stats?.symbols ?? 0}</span>
                  <span className="briefing-stat__label">Symbole</span>
                </div>
                <div className="briefing-stat">
                  <span className="briefing-stat__num">{data.stats?.notes ?? 0}</span>
                  <span className="briefing-stat__label">Notizen</span>
                </div>
              </div>
              {data.stats?.languages && data.stats.languages.length > 0 && (
                <div className="briefing-languages">
                  <strong className="briefing-subhead">Sprachen:</strong>
                  <div className="briefing-lang-chips">
                    {data.stats.languages.map(l => (
                      <span key={l.name} className="briefing-lang-chip">
                        {l.name} ({l.files})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Einstiegspunkte */}
            <section className="briefing-card briefing-card--entrypoints">
              <header className="briefing-card__head">
                <h3>Einstiegspunkte</h3>
              </header>
              {(!data.entrypoints || data.entrypoints.length === 0) ? (
                <p className="briefing-empty">Keine Einstiegspunkte erkannt.</p>
              ) : (
                <ul className="briefing-list">
                  {data.entrypoints.map(ep => (
                    <li key={ep.path} className="briefing-list-item">
                      <button
                        type="button"
                        className="briefing-link-btn"
                        onClick={() => onOpenFile(ep.path)}
                      >
                        <Icon path={ICON.file} />
                        <span className="briefing-path">{ep.path}</span>
                      </button>
                      {ep.why && <span className="briefing-desc">{ep.why}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Zuletzt geändert */}
            <section className="briefing-card briefing-card--changes">
              <header className="briefing-card__head">
                <h3>Zuletzt geändert</h3>
              </header>
              {(!data.recentChanges || data.recentChanges.length === 0) ? (
                <p className="briefing-empty">Keine aktuellen Änderungen verzeichnet.</p>
              ) : (
                <ul className="briefing-list">
                  {data.recentChanges.map(ch => (
                    <li key={ch.path + ch.when} className="briefing-list-item">
                      <button
                        type="button"
                        className="briefing-link-btn"
                        onClick={() => onOpenFile(ch.path)}
                      >
                        <span className="briefing-path">{ch.path}</span>
                      </button>
                      <div className="briefing-change-meta">
                        <span className="briefing-kind-badge">{ch.kind}</span>
                        <time className="briefing-time">{new Date(ch.when).toLocaleString()}</time>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Hotspots */}
            <section className="briefing-card briefing-card--hotspots">
              <header className="briefing-card__head">
                <h3>Code-Hotspots (hohe Vernetzung)</h3>
              </header>
              {(!data.hotspots || data.hotspots.length === 0) ? (
                <p className="briefing-empty">Keine Hotspots identifiziert.</p>
              ) : (
                <ul className="briefing-list">
                  {data.hotspots.map(hs => (
                    <li key={hs.path} className="briefing-list-item">
                      <button
                        type="button"
                        className="briefing-link-btn"
                        onClick={() => onOpenFile(hs.path)}
                      >
                        <Icon path={ICON.code} />
                        <span className="briefing-path">{hs.path}</span>
                      </button>
                      <span className="briefing-degree-badge">Grad {hs.degree}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
