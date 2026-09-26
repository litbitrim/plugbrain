import { useEffect, useState } from 'react'
import {
  createContextPack,
  checkPackStaleness,
  type ContextPackResult,
  type PackStalenessResult,
} from '../lib/brain-client'
import { Icon, ICON } from '../ui/Icon'

interface ContextPackViewProps {
  workspaceId: string
  onSelectSource: (path: string) => void
}

interface ParsedSource {
  path: string
  reasons: string
}

function parseSourcesFromBody(body: string): ParsedSource[] {
  const sources: ParsedSource[] = []
  const lines = body.split('\n')
  for (const line of lines) {
    // Matches: - `path` — reasons
    const match = line.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/)
    if (match) {
      sources.push({ path: match[1], reasons: match[2] })
    }
  }
  return sources
}

export default function ContextPackView({ workspaceId, onSelectSource }: ContextPackViewProps) {
  const [goal, setGoal] = useState(() => new URLSearchParams(window.location.search).get('goal') || 'authKey security tests')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pack, setPack] = useState<ContextPackResult | null>(null)
  const [staleness, setStaleness] = useState<PackStalenessResult | null>(null)
  const [stalenessLoading, setStalenessLoading] = useState(false)
  const [showRaw, setShowRaw] = useState(false)

  // Auto-create pack on mount if goal provided in URL
  useEffect(() => {
    const goalFromUrl = new URLSearchParams(window.location.search).get('goal')
    if (goalFromUrl && workspaceId) {
      setLoading(true)
      createContextPack(workspaceId, goalFromUrl)
        .then(res => {
          setPack(res)
          if (res.id) checkStaleness(res.id)
        })
        .catch(err => setError(err?.message || 'Fehler beim Erzeugen'))
        .finally(() => setLoading(false))
    }
  }, [workspaceId])

  const handleCreate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const g = goal.trim()
    if (!g) return

    setLoading(true)
    setError('')
    setPack(null)
    setStaleness(null)
    try {
      const result = await createContextPack(workspaceId, g)
      setPack(result)
      // Automatically check staleness right after creation
      if (result.id) {
        checkStaleness(result.id)
      }
    } catch (err: any) {
      setError(err?.message || 'Fehler beim Erzeugen des Context Packs')
    } finally {
      setLoading(false)
    }
  }

  const checkStaleness = async (packId: string) => {
    setStalenessLoading(true)
    try {
      const res = await checkPackStaleness(packId)
      setStaleness(res)
    } catch (err: any) {
      console.error('Staleness check error:', err)
    } finally {
      setStalenessLoading(false)
    }
  }

  const [copyFeedback, setCopyFeedback] = useState('')

  const handleCopyContext = (format: 'full' | 'chatgpt' = 'chatgpt') => {
    if (!pack?.body) return
    let textToCopy = pack.body
    if (format === 'chatgpt') {
      textToCopy = `# Kontext-Paket für Agenten / LLM\nZiel: ${goal}\nWorkspace-ID: ${workspaceId}\nVersion: ${pack.version}\nQuellen: ${pack.sources}\n\n${pack.body}`
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyFeedback('✓ Als Kontext kopiert (bereit für ChatGPT, Claude & Co.)')
      setTimeout(() => setCopyFeedback(''), 3000)
    }).catch(() => {
      setCopyFeedback('Fehler beim Kopieren in die Zwischenablage')
    })
  }

  const sources = pack?.body ? parseSourcesFromBody(pack.body) : []

  return (
    <div className="pack-view">
      <div className="pack-view__header">
        <div className="pack-view__title">
          <Icon path={ICON.open} />
          <strong>Context-Pack-Inspector</strong>
          <span className="pack-view__endpoint mono">/api/context/pack</span>
        </div>
        <p className="pack-view__lead" style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
          Stellt einen deterministischen Kontext-Ausschnitt aus Code und Notizen für eine Agenten-Aufgabe zusammen.
        </p>
      </div>

      <form className="pack-form" onSubmit={handleCreate}>
        <div className="pack-form__field">
          <label htmlFor="pack-goal-input">Aufgabe / Ziel für den Agenten:</label>
          <div className="pack-input-row">
            <input
              id="pack-goal-input"
              type="text"
              className="pack-input"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="z. B. authKey security tests"
            />
            <button type="submit" className="pack-create-btn pb-button pb-button--primary" disabled={loading || !goal.trim()}>
              {loading ? 'Erzeuge …' : 'Pack erzeugen'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="pack-error-alert" role="alert">
          {error}
        </div>
      )}

      {pack && (
        <div className="pack-details">
          <div className="pack-card">
            <div className="pack-card__header">
              <div className="pack-card__meta">
                <span className="pack-id mono">{pack.id}</span>
                <span className="pack-badge pack-badge--version">v{pack.version}</span>
                <span className="pack-badge pack-badge--sources">{pack.sources} Quellen</span>
              </div>
              <div className="pack-card__actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="pb-button pb-button--primary"
                  onClick={() => handleCopyContext('chatgpt')}
                  title="Markdown-Kontext für ChatGPT oder Claude in die Zwischenablage kopieren"
                  aria-label="Als Kontext kopieren"
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                >
                  📋 Als Kontext kopieren
                </button>
                <div className="pack-card__staleness">
                  {stalenessLoading ? (
                    <span className="pack-staleness-badge pack-staleness-badge--loading">Prüfe …</span>
                  ) : staleness ? (
                    <span
                      className="pb-status"
                      data-tone={staleness.stale ? 'bad' : 'ok'}
                      style={{ marginRight: '8px' }}
                    >
                      <i aria-hidden="true" />
                      <span>{staleness.stale ? 'VERALTET' : 'AKTUELL'}</span>
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className="pack-staleness-btn"
                    onClick={() => checkStaleness(pack.id)}
                    disabled={stalenessLoading}
                    title="Staleness gegen aktuellen Brain-Index prüfen"
                  >
                    Neu prüfen
                  </button>
                </div>
              </div>
            </div>

            {copyFeedback && (
              <div className="pack-copy-feedback" style={{
                margin: '10px 0',
                padding: '8px 12px',
                background: 'var(--accent-soft)',
                border: '1px solid var(--pos)',
                borderRadius: 'var(--r)',
                fontSize: '12px',
                color: 'var(--ink)',
                fontFamily: 'var(--mono)',
              }}>
                {copyFeedback}
              </div>
            )}

            {staleness && staleness.stale && (
              <div className="pack-stale-warning">
                <strong>Quellen haben sich geändert:</strong>
                {staleness.changed.length > 0 && (
                  <div>Geändert: {staleness.changed.join(', ')}</div>
                )}
                {staleness.missing.length > 0 && (
                  <div>Fehlt: {staleness.missing.join(', ')}</div>
                )}
              </div>
            )}

            <div className="pack-sources-section">
              <h4>Extrahierte Quellen aus dem Index:</h4>
              {sources.length === 0 ? (
                <div className="pack-sources-empty">
                  Keine spezifischen Quelltreffer für dieses Ziel gefunden.
                </div>
              ) : (
                <div className="pack-sources-list">
                  {sources.map(s => (
                    <div
                      key={s.path}
                      className="pack-source-item"
                      onClick={() => onSelectSource(s.path)}
                      title={`Klicken, um ${s.path} in Quellansicht zu öffnen`}
                    >
                      <div className="pack-source-path mono">{s.path}</div>
                      <div className="pack-source-why">{s.reasons}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pack-body-toggle">
              <button
                type="button"
                className="pack-toggle-raw-btn"
                onClick={() => setShowRaw(r => !r)}
              >
                {showRaw ? 'Markdown-Text verbergen' : 'Vollständigen Pack-Markdown anzeigen'}
              </button>
            </div>

            {showRaw && (
              <div className="pack-raw-markdown mono">
                <pre>{pack.body}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
