import { useEffect, useState } from 'react'
import { searchAgent, queryNotes, type SearchHit, type NoteQueryResult } from '../lib/brain-client'

interface SearchViewProps {
  workspaceId: string
  onSelectHit: (path: string, line?: number | null) => void
}

type SearchMode = 'code' | 'notes'

export default function SearchView({ workspaceId, onSelectHit }: SearchViewProps) {
  const [mode, setMode] = useState<SearchMode>('code')
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [noteHits, setNoteHits] = useState<NoteQueryResult['notes']>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')

  const handleSearch = async (e?: React.FormEvent, overrideQ?: string, overrideMode?: SearchMode) => {
    if (e) e.preventDefault()
    const activeMode = overrideMode ?? mode
    const q = (overrideQ ?? query).trim()
    if (!q) return

    setLoading(true)
    setError('')
    try {
      if (activeMode === 'code') {
        const results = await searchAgent(workspaceId, q)
        setHits(results)
        setNoteHits([])
      } else {
        const noteResult = await queryNotes(workspaceId, q)
        setNoteHits(noteResult.notes || [])
        setHits([])
      }
      setSearchedQuery(q)
    } catch (err: any) {
      setError(err?.message || `Fehler bei der Suche (${activeMode})`)
      setHits([])
      setNoteHits([])
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
          <strong>{mode === 'code' ? 'Agent Code- & Symbolsuche' : 'Notizen- & Property-Abfrage'}</strong>
          <span className="search-view__endpoint mono">
            {mode === 'code' ? '/api/agent/search' : '/api/notes/query'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          <button
            type="button"
            className={`tb ${mode === 'code' ? 'on' : ''}`}
            onClick={() => {
              setMode('code')
              if (query.trim()) handleSearch(undefined, query, 'code')
            }}
          >
            Code & Symbole
          </button>
          <button
            type="button"
            className={`tb ${mode === 'notes' ? 'on' : ''}`}
            onClick={() => {
              setMode('notes')
              if (!query.trim()) setQuery('typ=gate UND stand=offen')
              handleSearch(undefined, query.trim() || 'typ=gate UND stand=offen', 'notes')
            }}
          >
            Notizen & Properties (Bases)
          </button>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch} style={{ marginTop: '10px' }}>
        <div className="search-input-group">
          <input
            type="search"
            className="search-input"
            placeholder={
              mode === 'code'
                ? 'Symbol, Variable, Klasse, Datei (z. B. authKey) …'
                : 'Bases-Filter: typ=gate UND stand=offen oder typ=mission …'
            }
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
            {mode === 'code' ? (
              hits.length === 0
                ? `Keine Code-Treffer für "${searchedQuery}" im Brain-Index`
                : `${hits.length} Treffer für "${searchedQuery}":`
            ) : (
              noteHits.length === 0
                ? `Keine Notizen entsprechen dem Filter "${searchedQuery}"`
                : `${noteHits.length} Notiz(en) gefunden für "${searchedQuery}":`
            )}
          </div>
        )}

        {mode === 'code' ? (
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
        ) : (
          <div className="search-hits-list">
            {noteHits.map(note => (
              <div
                key={note.path}
                className="search-hit-card"
                onClick={() => onSelectHit(note.path)}
              >
                <div className="search-hit-card__head">
                  <span className="search-hit-name">{note.title}</span>
                  {note.typ && <span className="search-hit-kind search-hit-kind--class">{note.typ}</span>}
                  {note.stand && (
                    <span className="source-badge" style={{ fontSize: '11px', marginLeft: '6px' }}>
                      {note.stand}
                    </span>
                  )}
                </div>
                <div className="search-hit-path mono" title={note.path} style={{ marginTop: '4px' }}>
                  📝 {note.path}
                </div>
                {(note.inLinks !== undefined || note.outLinks !== undefined) && (
                  <div style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '4px' }}>
                    Verlinkungen: → {note.outLinks ?? 0} ausgehend · ← {note.inLinks ?? 0} Rückverweise
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
