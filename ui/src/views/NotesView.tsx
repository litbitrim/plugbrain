import { useEffect, useMemo, useRef, useState } from 'react'
import {
  attachmentUrl, exportNotesUrl, listNoteAttachments, listNotes, readNote, searchNoteText,
  uploadNoteAttachment, writeNote, type NoteAttachment, type NoteDocument, type NoteListItem,
} from '../lib/brain-client'

type UndoState = { path: string; content: string; savedHash: string }

export default function NotesView({ workspaceId }: { workspaceId: string }) {
  const [notes, setNotes] = useState<NoteListItem[]>([])
  const [active, setActive] = useState<NoteDocument | null>(null)
  const [draft, setDraft] = useState('')
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')
  const [searchHits, setSearchHits] = useState<Array<{ path: string; title: string; line: number | null; snippet: string | null }>>([])
  const [attachments, setAttachments] = useState<NoteAttachment[]>([])
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [conflict, setConflict] = useState('')
  const [undo, setUndo] = useState<UndoState | null>(null)
  const upload = useRef<HTMLInputElement>(null)

  const refreshList = async (): Promise<NoteListItem[]> => {
    const listed = await listNotes(workspaceId)
    setNotes(listed)
    return listed
  }

  const open = async (path: string): Promise<void> => {
    setBusy(true); setConflict(''); setNotice('')
    try {
      const note = await readNote(workspaceId, path)
      setActive(note); setDraft(note.content)
      setAttachments(await listNoteAttachments(workspaceId, note.path))
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  useEffect(() => {
    void refreshList().then(listed => { if (listed[0]) return open(listed[0].path) }).catch(error => setNotice(String(error)))
  }, [workspaceId])

  const tags = useMemo(() => [...new Set(notes.flatMap(note => note.tags || []))].sort(), [notes])
  const filtered = useMemo(() => notes.filter(note => !tag || note.tags?.includes(tag)), [notes, tag])

  const save = async (): Promise<void> => {
    if (!active || busy) return
    setBusy(true); setConflict(''); setNotice('')
    try {
      const before = active.content
      const result = await writeNote(workspaceId, active.path, draft, active.hash)
      setUndo({ path: active.path, content: before, savedHash: result.hash })
      const fresh = await readNote(workspaceId, active.path)
      setActive(fresh); setDraft(fresh.content)
      await refreshList()
      setNotice(result.created ? 'Notiz angelegt und im Brain indiziert.' : 'Gespeichert und im Brain indiziert.')
    } catch (error: any) {
      setConflict(error?.conflict ? `${error.message} Bitte neu laden und die Änderungen zusammenführen.` : '')
      setNotice(error?.conflict ? '' : (error instanceof Error ? error.message : String(error)))
    } finally { setBusy(false) }
  }

  const undoSave = async (): Promise<void> => {
    if (!undo || !active || undo.path !== active.path || busy) return
    setBusy(true); setConflict('')
    try {
      await writeNote(workspaceId, undo.path, undo.content, undo.savedHash)
      const fresh = await readNote(workspaceId, undo.path)
      setActive(fresh); setDraft(fresh.content); setUndo(null)
      await refreshList(); setNotice('Letzte Speicherung rückgängig gemacht.')
    } catch (error: any) {
      setConflict(error?.conflict ? `${error.message} Rückgängig wurde nicht erzwungen.` : '')
      setNotice(error?.conflict ? '' : String(error))
    } finally { setBusy(false) }
  }

  const create = (): void => {
    const path = `Notizen/Notiz-${new Date().toISOString().slice(0, 10)}.md`
    const note: NoteDocument = { path, title: 'Neue Notiz', tags: [], inLinks: 0, outLinks: 0, content: '# Neue Notiz\n\n', hash: '', links: [], backlinks: [] }
    setActive(note); setDraft(note.content); setAttachments([]); setConflict(''); setNotice('Neue Notiz: Namen oder Inhalt bearbeiten und speichern.')
  }

  const attach = async (file: File | undefined): Promise<void> => {
    if (!file || !active) return
    setBusy(true); setNotice('')
    try {
      const saved = await uploadNoteAttachment(workspaceId, active.path, file)
      setAttachments(current => [...current.filter(item => item.name !== saved.name), saved].sort((a, b) => a.name.localeCompare(b.name)))
      setNotice(`Anhang ${saved.name} gespeichert.`)
    } catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false); if (upload.current) upload.current.value = '' }
  }

  const runSearch = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault(); if (!search.trim()) return
    setBusy(true); setNotice('')
    try { setSearchHits((await searchNoteText(workspaceId, search.trim())).hits) }
    catch (error) { setNotice(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }

  return <main className="notes-workbench">
    <aside className="notes-sidebar">
      <div className="notes-sidebar__head"><strong>Wissen</strong><button type="button" onClick={create}>Neue Notiz</button></div>
      <form className="notes-search" onSubmit={runSearch}><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Volltext suchen …" /><button disabled={busy}>Suchen</button></form>
      <div className="notes-tags"><button type="button" className={!tag ? 'on' : ''} onClick={() => setTag('')}>Alle</button>{tags.map(value => <button type="button" className={tag === value ? 'on' : ''} key={value} onClick={() => setTag(value)}>#{value}</button>)}</div>
      {searchHits.length > 0 && <div className="notes-results">{searchHits.map(hit => <button type="button" key={`${hit.path}:${hit.line}`} onClick={() => void open(hit.path)}><strong>{hit.title}</strong><span>{hit.path}{hit.line ? `:${hit.line}` : ''}</span>{hit.snippet && <small>{hit.snippet}</small>}</button>)}</div>}
      <div className="notes-list">{filtered.map(note => <button type="button" key={note.path} className={active?.path === note.path ? 'on' : ''} onClick={() => void open(note.path)}><strong>{note.title}</strong><span>{note.path}</span><small>{(note.tags || []).map(value => `#${value}`).join(' ')} {note.inLinks ? `←${note.inLinks}` : ''}</small></button>)}</div>
    </aside>
    <section className="notes-editor">
      {active ? <>
        <header className="notes-editor__head"><div><strong>{active.title}</strong><span>{active.path}</span></div><div><a href={exportNotesUrl(workspaceId, active.path)}>Notiz exportieren</a><a href={exportNotesUrl(workspaceId)}>Vault exportieren</a><button type="button" disabled={busy || !undo || undo.path !== active.path} onClick={() => void undoSave()}>Rückgängig</button><button type="button" className="primary" disabled={busy} onClick={() => void save()}>Speichern</button></div></header>
        {conflict && <p className="notes-conflict" role="alert">{conflict}</p>}{notice && <p className="notes-notice" role="status">{notice}</p>}
        <textarea aria-label="Notizinhalt" value={draft} onChange={event => setDraft(event.target.value)} spellCheck={false} />
        <footer className="notes-editor__meta">
          <section><h3>Links</h3>{active.links.length ? active.links.map(link => <button type="button" disabled={!link.path} key={`${link.target}:${link.line}`} onClick={() => link.path && void open(link.path)}>{link.alias || link.target}{link.path ? '' : ' (nicht aufgelöst)'}</button>) : <span>Keine Wiki-Links.</span>}</section>
          <section><h3>Backlinks</h3>{active.backlinks.length ? active.backlinks.map(link => <button type="button" key={`${link.path}:${link.line}`} onClick={() => void open(link.path)}>← {link.title} · Zeile {link.line}</button>) : <span>Keine Rückverweise.</span>}</section>
          <section><h3>Anhänge</h3><input ref={upload} type="file" hidden onChange={event => void attach(event.target.files?.[0])}/><button type="button" disabled={busy} onClick={() => upload.current?.click()}>Datei anhängen</button>{attachments.map(file => <a key={file.path} href={attachmentUrl(workspaceId, active.path, file.name)}>{file.name} · {file.bytes} B</a>)}</section>
        </footer>
      </> : <p className="notes-empty">Keine Notiz im gewählten Vault.</p>}
    </section>
  </main>
}
