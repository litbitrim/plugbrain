import { useEffect, useMemo, useRef, useState } from 'react'
import {
  attachmentUrl, exportNotesUrl, listNoteAttachments, listNotes, readNote, searchNoteText,
  searchAgent, uploadNoteAttachment, writeNote, type NoteAttachment, type NoteDocument,
  type NoteListItem, type SearchHit,
} from '../lib/brain-client'
import KnowledgeGraphView from './KnowledgeGraphView'
import MarkdownPreview from '../components/MarkdownPreview'
import type { ViewId } from '../types'

type UndoState = { path: string; content: string; savedHash: string }
type SaveStatus = 'saved' | 'saving' | 'dirty' | 'conflict'
type ViewMode = 'edit' | 'split' | 'lesen'

export interface NotesViewProps {
  workspaceId: string
  onOpenSource?: (path: string, line?: number | null) => void
  onOpenRevision?: (revision: string) => void
  onOpenAgentRun?: (agentId: string) => void
  onNavigateTab?: (tab: ViewId) => void
}

function parseCodeTarget(raw: string): { path: string; line: number | null } {
  const trimmed = raw.trim()
  const colonMatch = trimmed.match(/^([^:#]+):(\d+)(?::\d+)?$/)
  if (colonMatch) {
    return { path: colonMatch[1], line: parseInt(colonMatch[2], 10) }
  }
  const hashMatch = trimmed.match(/^([^:#]+)#(\d+)$/)
  if (hashMatch) {
    return { path: hashMatch[1], line: parseInt(hashMatch[2], 10) }
  }
  return { path: trimmed, line: null }
}

export default function NotesView({
  workspaceId,
  onOpenSource,
  onOpenRevision,
  onOpenAgentRun,
  onNavigateTab,
}: NotesViewProps) {
  const [notes, setNotes] = useState<NoteListItem[]>([])
  const [active, setActive] = useState<NoteDocument | null>(null)
  const [draft, setDraft] = useState('')
  const [tag, setTag] = useState('')
  const [tagDrawerOpen, setTagDrawerOpen] = useState(false)
  const [tagSearch, setTagSearch] = useState('')
  const [backlinkTag, setBacklinkTag] = useState('')
  const [search, setSearch] = useState('')
  const [searchHits, setSearchHits] = useState<Array<{ path: string; title: string; line: number | null; snippet: string | null }>>([])
  const [symbolHits, setSymbolHits] = useState<SearchHit[]>([])
  const [attachments, setAttachments] = useState<NoteAttachment[]>([])
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [conflict, setConflict] = useState('')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const [autosaveEnabled, setAutosaveEnabled] = useState(true)
  const [showBacklinks, setShowBacklinks] = useState(true)
  const [showDiff, setShowDiff] = useState(false)
  const [undo, setUndo] = useState<UndoState | null>(null)
  const [mode, setMode] = useState<'editor' | 'graph'>('editor')
  const [viewMode, setViewMode] = useState<ViewMode>('edit')
  const [newType, setNewType] = useState<'notiz' | 'entscheidung' | 'widerspruch'>('notiz')
  const [newStatus, setNewStatus] = useState('entwurf')
  const upload = useRef<HTMLInputElement>(null)

  const refreshList = async (): Promise<NoteListItem[]> => {
    const listed = await listNotes(workspaceId)
    setNotes(listed)
    return listed
  }

  const open = async (path: string): Promise<void> => {
    setBusy(true); setConflict(''); setNotice(''); setShowDiff(false)
    try {
      const note = await readNote(workspaceId, path)
      setActive(note); setDraft(note.content)
      setSaveStatus('saved')
      setAttachments(await listNoteAttachments(workspaceId, note.path))
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  useEffect(() => {
    void refreshList().then(listed => { if (listed[0]) return open(listed[0].path) }).catch(error => setNotice(String(error)))
  }, [workspaceId])

  const tags = useMemo(() => [...new Set(notes.flatMap(note => note.tags || []))].sort(), [notes])
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of notes) {
      if (n.tags) {
        for (const t of n.tags) counts[t] = (counts[t] || 0) + 1
      }
    }
    return counts
  }, [notes])

  const filteredTags = useMemo(() => {
    if (!tagSearch.trim()) return tags
    const q = tagSearch.toLowerCase()
    return tags.filter(t => t.toLowerCase().includes(q))
  }, [tags, tagSearch])

  const filtered = useMemo(() => notes.filter(note => !tag || note.tags?.includes(tag)), [notes, tag])

  // Track dirty state when draft changes
  useEffect(() => {
    if (!active) return
    if (draft !== active.content) {
      if (saveStatus !== 'conflict' && saveStatus !== 'saving') {
        setSaveStatus('dirty')
      }
    } else {
      if (saveStatus === 'dirty') {
        setSaveStatus('saved')
      }
    }
  }, [draft, active?.content, saveStatus])

  // Save implementation (manual or autosave)
  const save = async (isAutosave = false): Promise<void> => {
    if (!active || busy) return
    setBusy(true); setConflict(''); setNotice('')
    setSaveStatus('saving')
    try {
      const before = active.content
      const result = await writeNote(workspaceId, active.path, draft, active.hash || undefined, undefined, active.hash === '')
      setUndo({ path: active.path, content: before, savedHash: result.hash })
      const fresh = await readNote(workspaceId, active.path)
      setActive(fresh); setDraft(fresh.content)
      setSaveStatus('saved')
      await refreshList()
      setNotice(isAutosave
        ? 'Automatisch gespeichert und im Brain indiziert.'
        : (result.created ? 'Notiz angelegt und im Brain indiziert.' : 'Gespeichert und im Brain indiziert.'))
    } catch (error: any) {
      if (error?.conflict || error?.status === 409) {
        setConflict(error?.conflict ? `${error.message} Bitte neu laden und die Änderungen zusammenführen.` : 'Konflikt beim Speichern: Die Notiz wurde extern geändert.')
        setSaveStatus('conflict')
      } else {
        setNotice(error instanceof Error ? error.message : String(error))
        setSaveStatus('dirty')
      }
    } finally { setBusy(false) }
  }

  // Force overwrite when user resolves conflict intentionally
  const forceSave = async (): Promise<void> => {
    if (!active || busy) return
    setBusy(true); setConflict(''); setNotice('')
    setSaveStatus('saving')
    try {
      const before = active.content
      const result = await writeNote(workspaceId, active.path, draft, undefined, undefined, false)
      setUndo({ path: active.path, content: before, savedHash: result.hash })
      const fresh = await readNote(workspaceId, active.path)
      setActive(fresh); setDraft(fresh.content)
      setSaveStatus('saved')
      setShowDiff(false)
      await refreshList()
      setNotice('Änderungen erzwungen und im Brain indiziert.')
    } catch (error: any) {
      setNotice(error instanceof Error ? error.message : String(error))
      setSaveStatus('conflict')
    } finally { setBusy(false) }
  }

  // Debounced optimistic autosave: 1200ms after user pauses typing
  useEffect(() => {
    if (!autosaveEnabled || !active || active.hash === '' || busy || conflict) return
    if (draft === active.content) return

    const timer = setTimeout(() => {
      if (!busy && !conflict && draft !== active.content && active && active.hash !== '') {
        void save(true)
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [draft, active, autosaveEnabled, busy, conflict])

  const undoSave = async (): Promise<void> => {
    if (!undo || !active || undo.path !== active.path || busy) return
    setBusy(true); setConflict(''); setNotice('')
    try {
      const result = await writeNote(workspaceId, undo.path, undo.content, undo.savedHash)
      const fresh = await readNote(workspaceId, undo.path)
      setActive(fresh); setDraft(fresh.content)
      setUndo(null)
      setSaveStatus('saved')
      await refreshList()
      setNotice('Wiederhergestellt.')
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  const create = async (): Promise<void> => {
    const raw = prompt('Dateiname der neuen Notiz (z.B. Architektur.md):')
    if (!raw) return
    const path = raw.endsWith('.md') ? raw : `${raw}.md`
    const title = path.replace(/\.md$/, '').split('/').pop() || path

    const kind = newType === 'notiz' ? '' : newType
    const initialContent = kind
      ? (kind === 'entscheidung'
          ? `---\ntyp: ${kind}\nstand: ${newStatus}\nbezug: \ncode: \nrevision: \n---\n\n# ${title}\n\n## Kontext\n\n## Entscheidung\n\n## Konsequenzen\n`
          : `---\ntyp: ${kind}\nstand: ${newStatus}\nbezug: \ncode: \n---\n\n# ${title}\n\n## Befund\n\n## Ursache\n\n## Lösungsvorschlag\n`)
      : `# ${title}\n\n`

    setBusy(true)
    try {
      await writeNote(workspaceId, path, initialContent, undefined, undefined, true)
      await refreshList()
      await open(path)
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  const insertTemplate = (typ: 'entscheidung' | 'widerspruch') => {
    const title = active?.title || 'Notiz'
    let template = ''
    if (typ === 'entscheidung') {
      template = `---\ntyp: entscheidung\nstand: entwurf\nbezug: \ncode: \nrevision: \n---\n\n# ${title}\n\n## Kontext\n\n## Entscheidung\n\n## Konsequenzen\n\n`
    } else {
      template = `---\ntyp: widerspruch\nstand: offen\nbezug: \ncode: \n---\n\n# ${title}\n\n## Befund\n\n## Ursache\n\n## Lösungsvorschlag\n\n`
    }
    setDraft(prev => template + prev)
  }

  const handleOpenCode = (rawTarget: string) => {
    const { path, line } = parseCodeTarget(rawTarget)
    onOpenSource?.(path, line)
  }

  const handleNavigateNote = (noteName: string) => {
    const target = noteName.trim()
    const found = notes.find(n =>
      n.path === target ||
      n.path === `Notizen/${target}.md` ||
      n.path.replace(/\.md$/, '').endsWith(target) ||
      n.title.toLowerCase() === target.toLowerCase()
    )
    if (found) {
      void open(found.path)
    } else {
      void open(`Notizen/${target}.md`)
    }
  }

  const runSearch = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (!search.trim()) { setSearchHits([]); setSymbolHits([]); return }
    setBusy(true)
    try {
      const res = await searchNoteText(workspaceId, search)
      setSearchHits(res.hits || [])
      try {
        const syms = await searchAgent(workspaceId, search)
        setSymbolHits(syms)
      } catch { setSymbolHits([]) }
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  const attach = async (file?: File): Promise<void> => {
    if (!file || !active) return
    setBusy(true)
    try {
      await uploadNoteAttachment(workspaceId, active.path, file)
      setAttachments(await listNoteAttachments(workspaceId, active.path))
      setNotice(`Anhang ${file.name} hochgeladen.`)
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      void save(false)
    }
  }

  const relation = (key: string): string | null => active?.properties.find(property => property.key.toLowerCase() === key)?.value.trim() || null
  const linkedNote = relation('bezug')
  const linkedCode = relation('code')
  const linkedRevision = relation('revision')
  const linkedAgentRun = relation('agentenlauf')

  // Live parsed frontmatter from draft with fallback to active
  const parsedFrontmatter = useMemo(() => {
    if (!draft) return null
    const fmMatch = draft.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!fmMatch) {
      if (!active?.properties?.length) return null
      const getProp = (k: string) => active.properties.find(p => p.key.toLowerCase() === k)?.value.trim() || null
      return {
        typ: active.typ || getProp('typ'),
        stand: active.stand || getProp('stand'),
        bezug: getProp('bezug'),
        code: getProp('code'),
        revision: getProp('revision'),
        agentenlauf: getProp('agentenlauf'),
      }
    }

    const lines = fmMatch[1].split(/\r?\n/)
    const data: Record<string, string> = {}
    for (const l of lines) {
      const m = l.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/)
      if (m) {
        data[m[1].toLowerCase()] = m[2].trim().replace(/^['"]|['"]$/g, '')
      }
    }

    return {
      typ: data.typ || active?.typ || null,
      stand: data.stand || active?.stand || null,
      bezug: data.bezug || relation('bezug'),
      code: data.code || relation('code'),
      revision: data.revision || relation('revision'),
      agentenlauf: data.agentenlauf || relation('agentenlauf'),
    }
  }, [draft, active])


  // Live parsed outbound Wiki-links from draft text
  const liveOutboundLinks = useMemo(() => {
    if (!draft) return []
    const matches = [...draft.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g)]
    return matches.map(m => {
      const target = m[1].trim()
      const alias = m[2]?.trim() || null
      const found = notes.find(n =>
        n.path === target ||
        n.path === `Notizen/${target}.md` ||
        n.path.replace(/\.md$/, '').endsWith(target) ||
        n.title.toLowerCase() === target.toLowerCase()
      )
      return {
        target,
        alias,
        resolvedPath: found ? found.path : null,
      }
    })
  }, [draft, notes])

  // Live incoming backlinks with tag filtering
  const allBacklinkTags = useMemo(() => {
    if (!active?.backlinks) return []
    const tagSet = new Set<string>()
    for (const bl of active.backlinks) {
      const src = notes.find(n => n.path === bl.path)
      if (src?.tags) {
        for (const t of src.tags) tagSet.add(t)
      }
    }
    return [...tagSet].sort()
  }, [active?.backlinks, notes])

  const filteredBacklinks = useMemo(() => {
    if (!active?.backlinks) return []
    if (!backlinkTag) return active.backlinks
    return active.backlinks.filter(bl => {
      const src = notes.find(n => n.path === bl.path)
      return src?.tags?.includes(backlinkTag)
    })
  }, [active?.backlinks, notes, backlinkTag])

  return (
    <main className="notes-workbench">
      <aside className="notes-sidebar">
        <div className="notes-sidebar__head">
          <strong>Wissen</strong>
          <span>
            <button type="button" className={mode === 'editor' ? 'on' : ''} onClick={() => setMode('editor')}>Editor</button>
            <button type="button" className={mode === 'graph' ? 'on' : ''} onClick={() => setMode('graph')} aria-label="Wissensgraph">Graph-Ansicht</button>
          </span>
        </div>

        <div className="notes-create">
          <select aria-label="Typ der neuen Wissensnotiz" value={newType} onChange={event => setNewType(event.target.value as typeof newType)}>
            <option value="notiz">Notiz</option>
            <option value="entscheidung">Entscheidung</option>
            <option value="widerspruch">Widerspruch</option>
          </select>
          {newType !== 'notiz' && (
            <select aria-label="Status der neuen Wissensnotiz" value={newStatus} onChange={event => setNewStatus(event.target.value)}>
              <option value="entwurf">Entwurf</option>
              <option value="offen">Offen</option>
              <option value="entschieden">Entschieden</option>
              <option value="geklärt">Geklärt</option>
            </select>
          )}
          <button type="button" onClick={create}>Neu</button>
        </div>

        <form className="notes-search" onSubmit={runSearch}>
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Notizen & Code suchen …" />
          <button disabled={busy} type="submit">Suchen</button>
        </form>

        {/* Collapsible, Searchable Tag Drawer */}
        <div className="notes-tag-drawer">
          <div className="notes-tag-drawer__head">
            <button
              type="button"
              className="notes-tag-drawer__toggle"
              onClick={() => setTagDrawerOpen(o => !o)}
            >
              <span>{tagDrawerOpen ? '▾' : '▸'} Tags ({tags.length})</span>
            </button>
            {tag && (
              <div className="notes-tag-drawer__active">
                <span className="notes-tag-chip">#{tag}</span>
                <button
                  type="button"
                  className="notes-tag-clear"
                  onClick={() => setTag('')}
                  title="Tag-Filter aufheben"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {tagDrawerOpen && (
            <div className="notes-tag-drawer__body">
              <input
                type="search"
                className="notes-tag-search"
                placeholder="Tags filtern..."
                value={tagSearch}
                onChange={e => setTagSearch(e.target.value)}
              />
              <div className="notes-tags notes-tag-drawer__list">
                <button type="button" className={!tag ? 'on' : ''} onClick={() => setTag('')}>
                  Alle ({notes.length})
                </button>
                {filteredTags.map(value => (
                  <button
                    type="button"
                    className={tag === value ? 'on' : ''}
                    key={value}
                    onClick={() => setTag(tag === value ? '' : value)}
                  >
                    #{value} ({tagCounts[value] || 0})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Backward compatibility: Keep inline active tags visible when drawer is closed */}
          {!tagDrawerOpen && (
            <div className="notes-tags notes-tags--compact">
              <button type="button" className={!tag ? 'on' : ''} onClick={() => setTag('')}>Alle</button>
              {tags.slice(0, 8).map(value => (
                <button type="button" className={tag === value ? 'on' : ''} key={value} onClick={() => setTag(value)}>
                  #{value}
                </button>
              ))}
              {tags.length > 8 && (
                <button type="button" className="notes-tags-more" onClick={() => setTagDrawerOpen(true)}>
                  +{tags.length - 8} weitere …
                </button>
              )}
            </div>
          )}
        </div>

        {(searchHits.length > 0 || symbolHits.length > 0) && (
          <div className="notes-results">
            {searchHits.length > 0 && (
              <div>
                <div className="notes-results__section-head">
                  Notizen ({searchHits.length})
                </div>
                {searchHits.map(hit => (
                  <button type="button" key={`${hit.path}:${hit.line}`} onClick={() => void open(hit.path)}>
                    <strong>{hit.title}</strong>
                    <span>{hit.path}{hit.line ? `:${hit.line}` : ''}</span>
                    {hit.snippet && <small>{hit.snippet}</small>}
                  </button>
                ))}
              </div>
            )}
            {symbolHits.length > 0 && (
              <div>
                <div className="notes-results__section-head">
                  Code-Symbole ({symbolHits.length})
                </div>
                {symbolHits.map((sym, i) => (
                  <button
                    type="button"
                    key={`${sym.path}:${sym.line}:${i}`}
                    onClick={() => handleOpenCode(`${sym.path}${sym.line ? `:${sym.line}` : ''}`)}
                  >
                    <div className="notes-results__sym-row">
                      <strong>{sym.name}</strong>
                      <span className="notes-results__sym-kind">{sym.kind}</span>
                    </div>
                    <span>{sym.path}{sym.line ? `:${sym.line}` : ''}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="notes-list">
          {filtered.map(note => (
            <button type="button" key={note.path} className={active?.path === note.path ? 'on' : ''} onClick={() => void open(note.path)}>
              <strong>{note.title}</strong>
              <span>{note.path}</span>
              <small>{(note.tags || []).map(value => `#${value}`).join(' ')} {note.inLinks ? `←${note.inLinks}` : ''}</small>
            </button>
          ))}
        </div>
      </aside>

      <section className="notes-editor">
        {mode === 'graph' && <KnowledgeGraphView workspaceId={workspaceId} focus={active?.path} onOpenNote={path => { setMode('editor'); void open(path) }} />}
        {mode === 'editor' && (active ? <>
          <header className="notes-editor__head">
            <div className="notes-editor__title">
              <strong title={active.title}>{active.title}</strong>
              <span>{active.path}</span>
              {active.typ && <small>{active.typ}{active.stand ? ` · ${active.stand}` : ''}</small>}
            </div>

            <div className="notes-editor__actions" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
              {/* 3-Way Segmented View Mode Toggle: [Edit] [Split] [Lesen] */}
              <div className="notes-view-mode-toggle" role="group" aria-label="Editor-Ansichtsmodus">
                <button
                  type="button"
                  className={`notes-toggle-btn ${viewMode === 'edit' ? 'on' : ''}`}
                  onClick={() => setViewMode('edit')}
                  title="Reiner Texteditor"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`notes-toggle-btn ${viewMode === 'split' ? 'on' : ''}`}
                  onClick={() => setViewMode('split')}
                  title="Editor und Live-Vorschau nebeneinander"
                >
                  Split
                </button>
                <button
                  type="button"
                  className={`notes-toggle-btn ${viewMode === 'lesen' ? 'on' : ''}`}
                  onClick={() => setViewMode('lesen')}
                  title="Reine Leseansicht (Markdown)"
                >
                  Lesen
                </button>
              </div>

              <span
                className={`pb-status notes-save-status notes-save-status--${saveStatus}`}
                data-status={saveStatus}
              >
                {saveStatus === 'saving' ? 'Speichert...' : saveStatus === 'dirty' ? 'Ungespeicherte Änderungen' : saveStatus === 'conflict' ? 'Konflikt' : 'Gespeichert'}
              </span>

              <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--muted)' }} title="Automatisches Speichern nach 1.2s Pause">
                <input type="checkbox" checked={autosaveEnabled} onChange={e => setAutosaveEnabled(e.target.checked)} />
                Autosave
              </label>

              <button
                type="button"
                className={showBacklinks ? 'on' : ''}
                onClick={() => setShowBacklinks(v => !v)}
                title="Wissensnetz-Seitenleiste ein-/ausblenden"
                style={{ fontSize: '11px' }}
              >
                Netz ({active.backlinks.length + liveOutboundLinks.length})
              </button>

              <a href={exportNotesUrl(workspaceId, active.path)}>Notiz exportieren</a>
              <a href={exportNotesUrl(workspaceId)}>Vault exportieren</a>
              <button type="button" disabled={busy || !undo || undo.path !== active.path} onClick={() => void undoSave()}>Rückgängig</button>
              <button type="button" className="primary" disabled={busy} onClick={() => void save(false)}>Speichern</button>
            </div>
          </header>

          {/* Interactive YAML Frontmatter Chips */}
          {parsedFrontmatter && (parsedFrontmatter.typ || parsedFrontmatter.stand || parsedFrontmatter.bezug || parsedFrontmatter.code || parsedFrontmatter.revision) && (
            <div className="notes-frontmatter-bar">
              {parsedFrontmatter.typ && (
                <span className={`notes-fm-pill notes-fm-pill--${parsedFrontmatter.typ.toLowerCase()}`}>
                  TYP: {parsedFrontmatter.typ.toUpperCase()}
                </span>
              )}
              {parsedFrontmatter.stand && (
                <span className="notes-fm-pill notes-fm-pill--stand">
                  STATUS: {parsedFrontmatter.stand.toUpperCase()}
                </span>
              )}
              {parsedFrontmatter.bezug && (
                <button
                  type="button"
                  className="notes-fm-btn notes-fm-btn--link"
                  onClick={() => handleNavigateNote(parsedFrontmatter.bezug!.replace(/^\[\[|\]\]$/g, ''))}
                  title={`Notiz öffnen: ${parsedFrontmatter.bezug}`}
                >
                  BEZUG: {parsedFrontmatter.bezug} ↗
                </button>
              )}
              {parsedFrontmatter.code && (
                <button
                  type="button"
                  className="notes-fm-btn notes-fm-btn--code"
                  onClick={() => handleOpenCode(parsedFrontmatter.code!)}
                  title={`Datei im Editor öffnen: ${parsedFrontmatter.code}`}
                >
                  CODE: {parsedFrontmatter.code} ↗
                </button>
              )}
              {parsedFrontmatter.revision && (
                <button
                  type="button"
                  className="notes-fm-btn notes-fm-btn--rev"
                  onClick={() => onOpenRevision?.(parsedFrontmatter.revision!)}
                  title={`Revision prüfen: ${parsedFrontmatter.revision}`}
                >
                  GIT: {parsedFrontmatter.revision.slice(0, 8)} ↗
                </button>
              )}
            </div>
          )}


          {conflict && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.15)', padding: '6px 12px', borderRadius: '4px', margin: '4px 0' }}>
              <p className="notes-conflict" role="alert" style={{ margin: 0, flex: 1 }}>{conflict}</p>
              <button type="button" style={{ fontSize: '11px', padding: '2px 8px' }} onClick={() => active && void open(active.path)}>Neu laden</button>
              <button type="button" style={{ fontSize: '11px', padding: '2px 8px' }} onClick={() => void forceSave()}>Trotzdem überschreiben</button>
              <button type="button" style={{ fontSize: '11px', padding: '2px 8px' }} onClick={() => setShowDiff(d => !d)}>{showDiff ? 'Diff schließen' : 'Diff anzeigen'}</button>
            </div>
          )}

          {showDiff && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '8px 12px', background: 'var(--panel)', borderBottom: '1px solid var(--border)', maxHeight: '180px', overflowY: 'auto', fontSize: '11px', fontFamily: 'var(--mono)' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--faint)', marginBottom: '4px' }}>Server-Version ({active.path}):</strong>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--neg)' }}>{active.content}</pre>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--faint)', marginBottom: '4px' }}>Lokale Version (Entwurf):</strong>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--pos)' }}>{draft}</pre>
              </div>
            </div>
          )}

          {notice && <p className="notes-notice" role="status">{notice}</p>}

          {!draft.startsWith('---') && (
            <div style={{ display: 'flex', gap: '6px', margin: '4px 0', flex: 'none' }}>
              <button type="button" style={{ fontSize: '10.5px', padding: '2px 7px' }} onClick={() => insertTemplate('entscheidung')}>+ Vorlage: Entscheidung</button>
              <button type="button" style={{ fontSize: '10.5px', padding: '2px 7px' }} onClick={() => insertTemplate('widerspruch')}>+ Vorlage: Widerspruch</button>
            </div>
          )}

          {/* Main Content Area: Edit / Split / Lesen */}
          <div
            className="notes-content-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: showBacklinks
                ? (viewMode === 'split' ? '1fr 1fr 280px' : '1fr 280px')
                : (viewMode === 'split' ? '1fr 1fr' : '1fr'),
              height: '100%',
              minHeight: 0,
              overflow: 'hidden',
            }}
          >
            {/* Editor Pane (Visible in 'edit' and 'split', offscreen/hidden in 'lesen' to keep aria-label in DOM) */}
            <div
              className="notes-editor-pane"
              style={{
                display: viewMode === 'lesen' ? 'none' : 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: 0,
                overflow: 'hidden',
                borderRight: (viewMode === 'split' || showBacklinks) ? '1px solid var(--border)' : 'none',
              }}
            >
              <textarea
                aria-label="Notizinhalt"
                value={draft}
                onChange={event => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                style={{
                  height: '100%',
                  width: '100%',
                  boxSizing: 'border-box',
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                }}
              />
            </div>

            {/* In Lesen mode, keep an accessible textarea in the DOM so locators work */}
            {viewMode === 'lesen' && (
              <textarea
                aria-label="Notizinhalt"
                value={draft}
                onChange={event => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
              />
            )}

            {/* Live Markdown Preview Pane (Visible in 'split' and 'lesen') */}
            {(viewMode === 'split' || viewMode === 'lesen') && (
              <div
                className="notes-preview-pane"
                style={{
                  height: '100%',
                  minHeight: 0,
                  overflowY: 'auto',
                  padding: '16px 20px',
                  background: 'var(--bg)',
                  borderRight: showBacklinks ? '1px solid var(--border)' : 'none',
                }}
              >
                <MarkdownPreview
                  content={draft}
                  onNavigateNote={handleNavigateNote}
                  onOpenSource={handleOpenCode}
                />
              </div>
            )}

            {/* Backlinks & Wissensnetz Sidebar */}
            {showBacklinks && (
              <aside
                className="notes-backlinks-pane"
                aria-label="Wissensnetz & Backlinks"
                style={{
                  overflowY: 'auto',
                  padding: '12px',
                  background: 'var(--panel)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)' }}>
                      Rückverweise ({filteredBacklinks.length})
                    </strong>
                    {allBacklinkTags.length > 0 && (
                      <select
                        value={backlinkTag}
                        onChange={e => setBacklinkTag(e.target.value)}
                        style={{ fontSize: '11px', padding: '1px 4px', background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border)', borderRadius: '3px' }}
                        aria-label="Backlinks nach Tag filtern"
                      >
                        <option value="">Alle Tags</option>
                        {allBacklinkTags.map(t => <option key={t} value={t}>#{t}</option>)}
                      </select>
                    )}
                  </div>
                  {filteredBacklinks.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {filteredBacklinks.map(bl => (
                        <button
                          type="button"
                          key={`${bl.path}:${bl.line}`}
                          onClick={() => void open(bl.path)}
                          style={{
                            textAlign: 'left',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '6px 8px',
                            color: 'var(--fg)',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontWeight: 600, color: 'var(--info)' }}>← {bl.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--faint)', display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                            <span>{bl.path}</span>
                            <span>Z. {bl.line}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--faint)', fontStyle: 'italic', fontSize: '11px' }}>Keine Rückverweise für aktuelle Auswahl.</div>
                  )}
                </div>

                <div>
                  <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', marginBottom: '6px' }}>
                    Ausgehende Wiki-Links ({liveOutboundLinks.length})
                  </strong>
                  {liveOutboundLinks.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {liveOutboundLinks.map((wl, i) => (
                        <button
                          type="button"
                          key={`${wl.target}:${i}`}
                          disabled={!wl.resolvedPath}
                          onClick={() => wl.resolvedPath && void open(wl.resolvedPath)}
                          style={{
                            textAlign: 'left',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '6px 8px',
                            color: wl.resolvedPath ? 'var(--fg)' : 'var(--faint)',
                            cursor: wl.resolvedPath ? 'pointer' : 'default',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600 }}>{wl.alias || wl.target}</span>
                            <span style={{ fontSize: '10px', color: wl.resolvedPath ? 'var(--pos)' : 'var(--faint)' }}>
                              {wl.resolvedPath ? 'im Vault' : 'unaufgelöst'}
                            </span>
                          </div>
                          {wl.resolvedPath && (
                            <div style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '2px' }}>{wl.resolvedPath}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--faint)', fontStyle: 'italic', fontSize: '11px' }}>Keine [[Wiki-Links]] im Text.</div>
                  )}
                </div>

                {linkedCode && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', marginBottom: '6px' }}>Code-Bindung</strong>
                    <button
                      type="button"
                      disabled={!onOpenSource}
                      onClick={() => handleOpenCode(linkedCode)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'color-mix(in srgb, var(--info) 8%, transparent)',
                        border: '1px solid color-mix(in srgb, var(--info) 30%, transparent)',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        color: 'var(--info)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>{linkedCode}</span>
                      <span style={{ fontSize: '11px' }}>Quelle öffnen →</span>
                    </button>
                  </div>
                )}
              </aside>
            )}
          </div>

          <footer className="notes-editor__meta">
            <section><h3>Links</h3>{active.links.length ? active.links.map(link => <button type="button" disabled={!link.path} key={`${link.target}:${link.line}`} onClick={() => link.path && void open(link.path)}>{link.alias || link.target}{link.path ? '' : ' (nicht aufgelöst)'}</button>) : <span>Keine Wiki-Links.</span>}</section>
            <section><h3>Backlinks</h3>{active.backlinks.length ? active.backlinks.map(link => <button type="button" key={`${link.path}:${link.line}`} onClick={() => void open(link.path)}>← {link.title} · Zeile {link.line}</button>) : <span>Keine Rückverweise.</span>}</section>
            {(linkedNote || linkedCode || linkedRevision || linkedAgentRun) && <section><h3>Verknüpfungen</h3>{linkedNote && <button type="button" onClick={() => void open(linkedNote.replace(/^\[\[|\]\]$/g, ''))}>Entscheidung/Widerspruch: {linkedNote}</button>}{linkedCode && <button type="button" disabled={!onOpenSource} onClick={() => handleOpenCode(linkedCode)}>Datei: {linkedCode}</button>}{linkedRevision && <button type="button" disabled={!onOpenRevision} onClick={() => onOpenRevision?.(linkedRevision)}>Revision: {linkedRevision}</button>}{linkedAgentRun && <button type="button" disabled={!onOpenAgentRun} onClick={() => onOpenAgentRun?.(linkedAgentRun)}>Agentenlauf: {linkedAgentRun}</button>}</section>}
            <section><h3>Anhänge</h3><input ref={upload} type="file" hidden onChange={event => void attach(event.target.files?.[0])}/><button type="button" disabled={busy || active.hash === ''} title={active.hash === '' ? 'Die Notiz zuerst speichern' : undefined} onClick={() => upload.current?.click()}>Datei anhängen</button>{active.hash === '' && <span>Notiz zuerst speichern.</span>}{attachments.map(file => <a key={file.path} href={attachmentUrl(workspaceId, active.path, file.name)}>{file.name} · {file.bytes} B</a>)}</section>
          </footer>
        </> : <p className="notes-empty">Keine Notiz im gewählten Vault.</p>)}
      </section>
    </main>
  )
}
