import { useEffect, useRef, useState } from 'react'
import {
  readAgentFile,
  fetchGitState,
  fetchProvenance,
  type FileReadResult,
  type GitState,
  type FileProvenance,
} from '../lib/brain-client'

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
}: SourceViewProps) {
  const [loading, setLoading] = useState(true)
  const [fileData, setFileData] = useState<FileReadResult | null>(null)
  const [gitState, setGitState] = useState<GitState | null>(null)
  const [prov, setProv] = useState<FileProvenance | null>(null)
  const targetLineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setFileData(null)

    // Parallel fetch: file content, git info, and provenance
    Promise.allSettled([
      readAgentFile(workspaceId, path),
      fetchGitState(workspaceId),
      fetchProvenance(workspaceId, path),
    ]).then(([readRes, gitRes, provRes]) => {
      if (!alive) return
      if (readRes.status === 'fulfilled') {
        setFileData(readRes.value)
      } else {
        setFileData({
          ok: false,
          path,
          content: '',
          bytes: 0,
          lang: null,
          error: String(readRes.reason?.message ?? readRes.reason),
        })
      }

      if (gitRes.status === 'fulfilled') {
        setGitState(gitRes.value)
      }
      if (provRes.status === 'fulfilled') {
        setProv(provRes.value)
      }
      setLoading(false)
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
          <div className="source-error-icon">⚠️</div>
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
          <span className="source-header__icon">📄</span>
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
      </div>
    </div>
  )
}
