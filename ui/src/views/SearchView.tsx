import { useEffect, useState } from 'react'
import { searchAgent, type SearchHit } from '../lib/brain-client'

interface SearchViewProps {
  workspaceId: string
  onSelectHit: (path: string, line?: number | null) => void
}

export default function SearchView({ workspaceId, onSelectHit }: SearchViewProps) {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')

  const handleSearch = async (e?: React.FormEvent, overrideQ?: string) => {
    if (e) e.preventDefault()
    const q = (overrideQ ?? query).trim()
    if (!q) return

    setLoading(true)
    setError('')
    try {
      const results = await searchAgent(workspaceId, q)
      setHits(results)
      setSearchedQuery(q)
    } catch (err: any) {
      setError(err?.message || 'Fehler bei der Suche über /api/agent/search')
      setHits([])
    } finally {
      setLoading(false)
    }
  }

  // Auto-search on mount if query in URL
  useEffect(() => {
    const qFromUrl = new URLSearchParams(window.location.search).get('q')
    if (qFromUrl && workspaceId) {
      void handleSearch(undefined, qFromUrl)
    }
  }, [workspaceId])

  return (
    <div className="search-view">
      <div className="search-view__header">
        <div className="search-view__title">
          <span className="search-view__icon">🔍</span>
          <strong>Agent Code- & Symbolsuche</strong>
          <span className="search-view__endpoint mono">/api/agent/search</span>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-group">
          <input
            type="search"
            className="search-input"
            placeholder="Symbol, Variable, Klasse, Datei (z. B. authKey) …"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-submit-btn" disabled={loading || !query.trim()}>
            {loading ? 'Suche …' : 'Suchen'}
          </button>
        </div>
      </form>

      {error && (
        <div className="search-error-alert" role="alert">
          ⚠️ {error}
        </div>
      )}

      <div className="search-results">
        {searchedQuery && (
          <div className="search-results-summary">
            {hits.length === 0
              ? `Keine Treffer für "${searchedQuery}" im Brain-Index`
              : `${hits.length} Treffer für "${searchedQuery}":`}
          </div>
        )}

        <div className="search-hits-list">
          {hits.map((hit, idx) => (
            <div
              key={`${hit.path}-${hit.name}-${hit.line ?? idx}`}
              className="search-hit-card"
              onClick={() => onSelectHit(hit.path, hit.line)}
            >
              <div className="search-hit-card__head">
                <span className="search-hit-name mono">{hit.name}</span>
                <span className={`search-hit-kind search-hit-kind--${hit.kind}`}>{hit.kind}</span>
                {hit.line !== null && (
                  <span className="search-hit-line mono">Zeile {hit.line}</span>
                )}
              </div>
              <div className="search-hit-path mono" title={hit.path}>
                📄 {hit.path}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
