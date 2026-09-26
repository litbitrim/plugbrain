import { useEffect, useState } from 'react'
import {
  searchAgent, searchNoteText, queryNotes,
  type SearchHit, type NoteQueryResult, type NoteTextHit,
} from '../lib/brain-client'
import { Icon, ICON } from '../ui/Icon'

interface SearchViewProps {
  workspaceId: string
  onSelectHit: (path: string, line?: number | null) => void
}

type SearchMode = 'all' | 'code' | 'notes' | 'prose'

interface UnifiedHit {
  id: string
  type: 'code' | 'note'
  name: string
  kind: string
  path: string
  line: number | null
  snippet?: string | null
  stand?: string | null
}

export default function SearchView({ workspaceId, onSelectHit }: SearchViewProps) {
  const [mode, setMode] = useState<SearchMode>(() => {
    const wanted = new URLSearchParams(window.location.search).get('mode')
    if (wanted === 'code' || wanted === 'notes' || wanted === 'prose') return wanted
    return 'all'
  })
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '')
  const [unifiedHits, setUnifiedHits] = useState<UnifiedHit[]>([])
  const [noteHits, setNoteHits] = useState<NoteQueryResult['notes']>([])
  const [elapsedMs, setElapsedMs] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')
  const [searchCopyFeedback, setSearchCopyFeedback] = useState('')

  const handleCopySearchContext = () => {
    let md = `# Suchtreffer-Kontext: "${searchedQuery}"\nWorkspace: ${workspaceId}\n\n`
    if (mode === 'notes') {
      md += `Gefundene Notizen (${noteHits.length}):\n`
      for (const n of noteHits) {
        md += `- **${n.title}** (\`${n.path}\`)${n.stand ? ` [${n.stand}]` : ''}\n`
      }
    } else {
      md += `Gefundene Treffer (${unifiedHits.length}):\n`
      for (const h of unifiedHits) {
        md += `- **${h.name}** (${h.kind}) — \`${h.path}${h.line ? `:${h.line}` : ''}\`\n`
        if (h.snippet) {
          md += `  > ${h.snippet.replace(/\n/g, ' ')}\n`
        }
      }
    }
    navigator.clipboard.writeText(md).then(() => {
      setSearchCopyFeedback('✓ Suchergebnisse als Kontext kopiert (bereit für ChatGPT, Claude & Co.)')
      setTimeout(() => setSearchCopyFeedback(''), 3000)
    }).catch(() => {
      setSearchCopyFeedback('Fehler beim Kopieren in die Zwischenablage')
    })
  }

  const handleSearch = async (e?: React.FormEvent, overrideQ?: string, overrideMode?: SearchMode) => {
    if (e) e.preventDefault()
    const activeMode = overrideMode ?? mode
    const q = (overrideQ ?? query).trim()
    if (!q) return

    setLoading(true)
    setError('')
    setElapsedMs(null)
    const started = performance.now()
    try {
      if (activeMode === 'all') {
        const [codeResults, noteResults] = await Promise.allSettled([
          searchAgent(workspaceId, q),
          searchNoteText(workspaceId, q),
        ])
        const list: UnifiedHit[] = []
        if (codeResults.status === 'fulfilled') {
          for (const c of codeResults.value) {
            list.push({
              id: `code-${c.path}-${c.name}-${c.line ?? 0}`,
              type: 'code',
              name: c.name,
              kind: c.kind,
              path: c.path,
              line: c.line,
            })
          }
        }
        if (noteResults.status === 'fulfilled') {
          for (const n of noteResults.value.hits || []) {
            list.push({
              id: `note-${n.path}-${n.line ?? 0}`,
              type: 'note',
              name: n.title,
              kind: 'Notiz',
              path: n.path,
              line: n.line,
              snippet: n.snippet,
            })
          }
        }
        setUnifiedHits(list)
        setNoteHits([])
      } else if (activeMode === 'code') {
        const results = await searchAgent(workspaceId, q)
        setUnifiedHits(results.map((c, i) => ({
          id: `code-${c.path}-${c.name}-${c.line ?? i}`,
          type: 'code',
          name: c.name,
          kind: c.kind,
          path: c.path,
          line: c.line,
        })))
        setNoteHits([])
      } else if (activeMode === 'prose') {
        const result = await searchNoteText(workspaceId, q)
        setUnifiedHits((result.hits || []).map((n, i) => ({
          id: `note-${n.path}-${n.line ?? i}`,
          type: 'note',
          name: n.title,
          kind: 'Notiz',
          path: n.path,
          line: n.line,
          snippet: n.snippet,
        })))
        setNoteHits([])
      } else {
        const noteResult = await queryNotes(workspaceId, q)
        setNoteHits(noteResult.notes || [])
        setUnifiedHits([])
      }
      setElapsedMs(Math.round(performance.now() - started))
      setSearchedQuery(q)
    } catch (err: any) {
      setError(err?.message || `Fehler bei der Suche (${activeMode})`)
      setUnifiedHits([])
      setNoteHits([])
    } finally {
      setLoading(false)
    }
  }

  // Auto-search on mount if query in URL
  useEffect(() => {
    const qFromUrl = new URLSearchParams(window.location.search).get('q')
    if (qFromUrl && workspaceId) {
      void handleSearch(undefined, qFromUrl, mode)
    }
  }, [workspaceId])

  return (
    <div className="search-view">
      <div className="search-view__header">
        <div className="search-view__title">
          <Icon path={ICON.search} />
          <strong>
            {mode === 'all' ? 'Suche über Notizen & Code'
              : mode === 'code' ? 'Code- & Symbolsuche'
              : mode === 'prose' ? 'Notiz-Volltextsuche'
              : 'Notizen- & Property-Filter'}
          </strong>
          <span className="search-view__endpoint mono">
            {mode === 'all' ? 'Notizen + Code'
              : mode === 'code' ? '/api/agent/search'
              : mode === 'prose' ? '/api/notes/search'
              : '/api/notes/query'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          <button
            type="button"
            className={`tb ${mode === 'all' ? 'on' : ''}`}
            onClick={() => {
              setMode('all')
              if (query.trim()) handleSearch(undefined, query, 'all')
            }}
          >
            Alle
          </button>
          <button
            type="button"
            className={`tb ${mode === 'code' ? 'on' : ''}`}
            onClick={() => {
              setMode('code')
              if (query.trim()) handleSearch(undefined, query, 'code')
            }}
          >
            Code &amp; Symbole
          </button>
          <button
            type="button"
            className={`tb ${mode === 'prose' ? 'on' : ''}`}
            onClick={() => {
              setMode('prose')
              if (query.trim()) handleSearch(undefined, query, 'prose')
            }}
          >
            Notizen-Volltext
          </button>
          <button
            type="button"
            className={`tb ${mode === 'notes' ? 'on' : ''}`}
            onClick={() => {
              setMode('notes')
              const q = query.trim() || 'typ=gate UND stand=offen'
              setQuery(q)
              handleSearch(undefined, q, 'notes')
            }}
          >
            Properties (Bases)
          </button>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch} style={{ marginTop: '10px' }}>
        <div className="search-input-group">
          <input
            type="search"
            className="search-input"
            placeholder={
              mode === 'all'
                ? 'Symbol, Datei oder Notiztext (z. B. workspaceIdFor, Brain) …'
                : mode === 'code'
                  ? 'Symbol, Variable, Klasse, Datei (z. B. authKey) …'
                  : mode === 'prose'
                    ? 'Satz oder Stichwörter aus dem Notiztext …'
                    : 'Bases-Filter: typ=gate UND stand=offen …'
            }
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-submit-btn pb-button pb-button--primary" disabled={loading || !query.trim()}>
            {loading ? 'Suche …' : 'Suchen'}
          </button>
        </div>
      </form>

      {error && (
        <div className="search-error-alert" role="alert">
          {error}
        </div>
      )}

      <div className="search-results">
        {searchedQuery && (
          <div className="search-results-summary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              {mode === 'notes' ? (
                noteHits.length === 0
                  ? `Keine Notizen entsprechen dem Filter "${searchedQuery}"`
                  : `${noteHits.length} Notiz(en) gefunden für "${searchedQuery}":`
              ) : (
                unifiedHits.length === 0
                  ? `Keine Treffer für "${searchedQuery}" im Brain-Index`
                  : `${unifiedHits.length} Treffer für "${searchedQuery}":`
              )}
              {elapsedMs !== null && (
                <span className="search-results-time mono" style={{ marginLeft: '8px', opacity: .7 }}>
                  {elapsedMs} ms
                </span>
              )}
            </div>

            {((mode === 'notes' && noteHits.length > 0) || (mode !== 'notes' && unifiedHits.length > 0)) && (
              <button
                type="button"
                className="pb-button pb-button--secondary"
                onClick={() => handleCopySearchContext()}
                title="Alle Suchtreffer als Markdown-Kontext kopieren"
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                📋 Als Kontext kopieren
              </button>
            )}
          </div>
        )}

        {searchCopyFeedback && (
          <div style={{
            margin: '8px 0',
            padding: '6px 12px',
            background: 'var(--accent-soft)',
            border: '1px solid var(--pos)',
            borderRadius: 'var(--r)',
            fontSize: '12px',
            color: 'var(--ink)',
            fontFamily: 'var(--mono)',
          }}>
            {searchCopyFeedback}
          </div>
        )}

        {mode === 'notes' ? (
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
                  {note.path}
                </div>
                {(note.inLinks !== undefined || note.outLinks !== undefined) && (
                  <div style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '4px' }}>
                    Verlinkungen: → {note.outLinks ?? 0} ausgehend · ← {note.inLinks ?? 0} Rückverweise
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="search-hits-list">
            {unifiedHits.map(hit => (
              <div
                key={hit.id}
                className="search-hit-card"
                onClick={() => onSelectHit(hit.path, hit.line)}
              >
                <div className="search-hit-card__head">
                  <span className="search-hit-name mono">{hit.name}</span>
                  <span className={`search-hit-kind search-hit-kind--${hit.kind.toLowerCase()}`}>{hit.kind}</span>
                  {hit.line !== null && (
                    <span className="search-hit-line mono">Zeile {hit.line}</span>
                  )}
                </div>
                {hit.snippet && <div className="search-hit-snippet">{hit.snippet}</div>}
                <div className="search-hit-path mono" title={hit.path} style={{ marginTop: '4px' }}>
                  {hit.path}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
