import { useEffect, useRef, useState } from 'react'
import { askQuestion } from '../lib/brain-client'
import type { AskResponse, AskSource } from '../types'
import { Icon, ICON } from '../ui/Icon'

export interface AskModalProps {
  workspaceId: string
  isOpen: boolean
  onClose: () => void
  onOpenSource: (path: string, line?: number | null) => void
  onNavigateToSearch?: (query: string) => void
  initialQuestion?: string
}

export default function AskModal({
  workspaceId,
  isOpen,
  onClose,
  onOpenSource,
  onNavigateToSearch,
  initialQuestion = '',
}: AskModalProps) {
  const [query, setQuery] = useState(initialQuestion)
  const [busy, setBusy] = useState(false)
  const [response, setResponse] = useState<AskResponse | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuestion)
      setResponse(null)
      setUnavailable(false)
      setError(null)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, initialQuestion])

  if (!isOpen) return null

  const handleAsk = async (questionText: string) => {
    const q = questionText.trim()
    if (!q || busy) return

    setBusy(true)
    setError(null)
    setUnavailable(false)

    try {
      const res = await askQuestion(workspaceId, q)
      if ('unavailable' in res && res.unavailable) {
        setUnavailable(true)
        setResponse(null)
      } else {
        setResponse(res as AskResponse)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void handleAsk(query)
  }

  const handleFollowUp = (followUp: string) => {
    setQuery(followUp)
    void handleAsk(followUp)
  }

  const handleSourceClick = (src: AskSource) => {
    onOpenSource(src.path, src.line)
    onClose()
  }

  const handleFallbackSearch = () => {
    if (onNavigateToSearch) {
      onNavigateToSearch(query)
      onClose()
    }
  }

  return (
    <div className="brain-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="brain-modal ask-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <header className="ask-modal__header">
          <div className="ask-modal__input-wrap">
            <span className="ask-modal__search-icon">
              <Icon path={ICON.search} />
            </span>
            <input
              ref={inputRef}
              id="ask-modal-title"
              type="text"
              className="ask-modal__input"
              placeholder="Frag das Projekt … (z. B. 'Wo ist workspaceIdFor definiert?')"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') onClose()
              }}
            />
            {query && (
              <button
                type="button"
                className="ask-modal__clear-btn"
                onClick={() => { setQuery(''); setResponse(null); inputRef.current?.focus() }}
                aria-label="Eingabe leeren"
              >
                ✕
              </button>
            )}
          </div>
          <button type="button" className="brain-modal__close" onClick={onClose} aria-label="Dialog schließen">
            ✕
          </button>
        </header>

        <div className="ask-modal__body">
          {busy && (
            <div className="ask-modal__state ask-modal__state--busy" role="status">
              <p>Durchsuche Wissensgraphen und Code …</p>
            </div>
          )}

          {unavailable && !busy && (
            <div className="ask-modal__state ask-modal__state--unavailable" role="status">
              <div className="ask-modal__state-icon">
                <Icon path={ICON.info} />
              </div>
              <h4>Frag-Funktion in dieser Version noch nicht verfügbar</h4>
              <p>
                Die Backend-Route <code>POST /api/ask</code> ist auf diesem Kern noch nicht aktiv (wird in Lane ASK-01 bereitgestellt).
              </p>
              {onNavigateToSearch && query && (
                <button
                  type="button"
                  className="pb-button pb-button--primary"
                  onClick={handleFallbackSearch}
                  style={{ marginTop: '12px' }}
                >
                  <Icon path={ICON.search} /> Suche nach „{query}“ öffnen
                </button>
              )}
            </div>
          )}

          {error && !busy && (
            <div className="ask-modal__state ask-modal__state--error" role="alert">
              <h4>Fehler bei der Abfrage</h4>
              <p>{error}</p>
            </div>
          )}

          {!busy && !unavailable && !error && !response && (
            <div className="ask-modal__empty">
              <p className="ask-modal__hint">Typische Fragen an den Brain:</p>
              <div className="ask-modal__suggestions">
                <button
                  type="button"
                  className="ask-modal__suggestion-chip"
                  onClick={() => {
                    const q = 'Wo ist workspaceIdFor definiert?'
                    setQuery(q)
                    void handleAsk(q)
                  }}
                >
                  „Wo ist workspaceIdFor definiert?“
                </button>
                <button
                  type="button"
                  className="ask-modal__suggestion-chip"
                  onClick={() => {
                    const q = 'Welche Einstiegspunkte hat das Projekt?'
                    setQuery(q)
                    void handleAsk(q)
                  }}
                >
                  „Welche Einstiegspunkte hat das Projekt?“
                </button>
                <button
                  type="button"
                  className="ask-modal__suggestion-chip"
                  onClick={() => {
                    const q = 'Was hat sich zuletzt geändert?'
                    setQuery(q)
                    void handleAsk(q)
                  }}
                >
                  „Was hat sich zuletzt geändert?“
                </button>
              </div>
            </div>
          )}

          {response && !busy && (
            <div className="ask-modal__response">
              {/* Antwortsatz */}
              <div className="ask-modal__answer-box">
                <p className="ask-modal__answer">{response.answer}</p>
                <div className="ask-modal__meta">
                  <span
                    className={`ask-modal__confidence ask-modal__confidence--${response.confidence}`}
                    title={`Konfidenz: ${response.confidence}`}
                  >
                    Konfidenz: {response.confidence}
                  </span>
                  {response.intent && (
                    <span className="ask-modal__intent-badge">Fokus: {response.intent}</span>
                  )}
                </div>
              </div>

              {/* Quellen */}
              {response.sources && response.sources.length > 0 && (
                <div className="ask-modal__sources">
                  <h5>Gefundene Quellen ({response.sources.length}):</h5>
                  <div className="ask-modal__sources-list">
                    {response.sources.map((src, idx) => (
                      <button
                        key={`${src.path}-${src.line}-${idx}`}
                        type="button"
                        className="ask-modal__source-card"
                        onClick={() => handleSourceClick(src)}
                      >
                        <div className="ask-modal__source-top">
                          <Icon path={ICON.file} />
                          <strong className="ask-modal__source-path">{src.path}</strong>
                          <span className="ask-modal__source-line">Zeile {src.line}</span>
                        </div>
                        {src.symbol && (
                          <span className="ask-modal__source-symbol">Symbol: <code>{src.symbol}</code></span>
                        )}
                        {src.why && (
                          <span className="ask-modal__source-why">{src.why}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Niedrige Konfidenz: Fallback-Suche anbieten */}
              {response.confidence === 'low' && onNavigateToSearch && (
                <div className="ask-modal__low-conf-alert">
                  <p>Die Antwort hat eine niedrige Konfidenz.</p>
                  <button
                    type="button"
                    className="pb-button"
                    onClick={handleFallbackSearch}
                  >
                    Reguläre Code-Suche öffnen
                  </button>
                </div>
              )}

              {/* Folgefragen */}
              {response.followUps && response.followUps.length > 0 && (
                <div className="ask-modal__followups">
                  <h5>Folgefragen:</h5>
                  <div className="ask-modal__followup-list">
                    {response.followUps.map(fu => (
                      <button
                        key={fu}
                        type="button"
                        className="ask-modal__followup-btn"
                        onClick={() => handleFollowUp(fu)}
                      >
                        ↳ {fu}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="ask-modal__footer">
          <span><kbd>Enter</kbd> Fragen absenden</span>
          <span><kbd>Esc</kbd> Schließen</span>
          <span><kbd>Strg+K</kbd> Immer verfügbar</span>
        </footer>
      </div>
    </div>
  )
}
