import { useEffect, useRef, useState } from 'react'
import {
  readAgentFile,
  fetchGitState,
  fetchProvenance,
  fetchBacklinks,
  type FileReadResult,
  type GitState,
  type FileProvenance,
  type BacklinkItem,
} from '../lib/brain-client'
import { sourceReadWithin } from './source-load'

interface SourceViewProps {
  workspaceId: string
  path: string
  highlightLine?: number | null
  onClose?: () => void
  onNavigateFile?: (path: string, line?: number) => void
}

export default function SourceView({
  workspaceId,
  path,
  highlightLine,
  onClose,
  onNavigateFile,
}: SourceViewProps) {
  const [loading, setLoading] = useState(true)
  const [fileData, setFileData] = useState<FileReadResult | null>(null)
  const [gitState, setGitState] = useState<GitState | null>(null)
  const [prov, setProv] = useState<FileProvenance | null>(null)
  const [backlinks, setBacklinks] = useState<BacklinkItem[]>([])
  const targetLineRef = useRef<HTMLTableRowElement | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setFileData(null)
    setGitState(null)
    setProv(null)
    setBacklinks([])

    // The file is the primary user action. Git/provenance/backlink snapshots
    // enrich it, but a slow repository inspection must never leave the source
    // pane in a permanent loading state after the file itself is available.
    void sourceReadWithin(readAgentFile(workspaceId, path))
      .then(result => {
        if (!alive) return
        setFileData(result)
        setLoading(false)
      })
      .catch(reason => {
        if (!alive) return
        setFileData({
          ok: false,
          path,
          content: '',
          bytes: 0,
          lang: null,
          error: String(reason?.message ?? reason),
        })
        setLoading(false)
      })

    void fetchGitState(workspaceId).then(result => {
      if (alive) setGitState(result)
    }).catch(() => {
      // Git metadata is optional. The source file remains actionable without it.
    })
    void fetchProvenance(workspaceId, path).then(result => {
      if (alive) setProv(result)
    }).catch(() => {
      // The source pane shows the file even when no provenance has been recorded.
    })
    void fetchBacklinks(workspaceId, path).then(result => {
      if (alive) setBacklinks(result)
    }).catch(() => {
      // Notes can be unavailable for a code file without invalidating the source.
    })

    return () => {
      alive = false
    }
  }, [workspaceId, path])

  useEffect(() => {
    if (!loading && targetLineRef.current) {
      targetLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [loading, highlightLine])

  if (loading) {
    return (
      <div className="source-container source-container--loading">
        <div className="source-spinner" />
        <p>Lade Dateiinhalt aus dem Brain ({path}) …</p>
      </div>
    )
  }

  // Negativprüfung: Ungültiger Pfad oder Fehler beim Lesen
  if (!fileData || !fileData.ok) {
    return (
      <div className="source-container source-container--error" role="alert">
        <div className="source-header">
          <span className="source-header__path mono">{path}</span>
          {onClose && (
            <button type="button" className="source-close-btn" onClick={onClose} title="Schließen">
              ✕
            </button>
          )}
        </div>
        <div className="source-error-box">
          <div className="source-error-icon" aria-hidden="true">!</div>
          <h3>Fehler beim Laden der Datei</h3>
          <p className="source-error-msg">
            {fileData?.error || 'Die Datei existiert nicht im Workspace oder der Pfad ist ungültig.'}
          </p>
          <div className="source-error-details mono">
            Workspace: {workspaceId}<br />
            Pfad: {path}
          </div>
        </div>
      </div>
    )
  }

  const lines = fileData.content.split(/\r?\n/)
  const lineCount = lines.length
  const headSha = gitState?.head ? gitState.head.slice(0, 8) : null

  return (
    <div className="source-container">
      <div className="source-header">
        <div className="source-header__meta">
          <span className="source-header__path mono" title={fileData.path}>
            {fileData.path}
          </span>
          {fileData.lang && <span className="source-badge source-badge--lang">{fileData.lang}</span>}
          <span className="source-badge source-badge--info">
            {lineCount} Zeilen · {fileData.bytes} B
          </span>
          {headSha && (
            <span className="source-badge source-badge--git" title={`Git Revision: ${gitState?.head}`}>
              git: {headSha} ({gitState?.branch ?? 'detached'})
            </span>
          )}
          {prov?.owner && (
            <span
              className="source-badge source-badge--agent"
              style={{ borderColor: prov.owner.color }}
              title={`Zuletzt geändert durch ${prov.owner.name} (${prov.owner.at})`}
            >
              <i style={{ background: prov.owner.color }} />
              {prov.owner.name}
            </span>
          )}
        </div>
        <div className="source-header__actions">
          {highlightLine && (
            <span className="source-badge source-badge--highlight">
              Fokus: Zeile {highlightLine}
            </span>
          )}
          {onClose && (
            <button type="button" className="source-close-btn" onClick={onClose} title="Quellansicht schließen">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="source-body">
        <div className="source-code-view">
          <table className="source-table">
            <tbody>
              {lines.map((lineText, idx) => {
                const lineNum = idx + 1
                const isHighlighted = highlightLine === lineNum
                return (
                  <tr
                    key={lineNum}
                    ref={isHighlighted ? targetLineRef : undefined}
                    className={`source-line-row ${isHighlighted ? 'source-line-row--highlight' : ''}`}
                  >
                    <td className="source-line-num mono" data-line={lineNum}>
                      {lineNum}
                    </td>
                    <td className="source-line-code mono">
                      <pre>{lineText || ' '}</pre>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {backlinks.length > 0 && (
          <div className="source-backlinks" style={{ padding: '12px 16px', borderTop: '1px solid var(--line)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
              ← Rückverweise / Backlinks ({backlinks.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {backlinks.map((bl, i) => (
                <div
                  key={i}
                  className="search-hit-card"
                  style={{ padding: '6px 10px', fontSize: '11px', cursor: 'pointer' }}
                  onClick={() => onNavigateFile?.(bl.path, bl.line)}
                  title={`Zeile ${bl.line} in ${bl.path}`}
                >
                  <span className="mono" style={{ color: 'var(--accent)' }}>{bl.path}</span>
                  <span style={{ color: 'var(--faint)', marginLeft: '6px' }}>:{bl.line}</span>
                  {bl.alias && <span style={{ marginLeft: '4px', fontStyle: 'italic' }}>({bl.alias})</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
