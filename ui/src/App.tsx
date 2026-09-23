import { useEffect, useMemo, useRef, useState } from 'react'
import { createAtlasModel } from './lib/atlas.js'
import { folderName } from './lib/workspace-name.js'
import {
  describeProgress, galaxy, lastWorkspace, nextDaemonProgress, rememberWorkspace, openVault, reindexWorkspace,
  workspaceIdForRoot,
} from './lib/workspaces.js'
import {
  fetchMesh, fetchPlanetInventory, getStoredToken, setStoredToken, getStoredAgentId, setStoredAgentId,
  resetAgentAttachments, setPlanetCheckoutSelection, fetchGitState, type GitState, type PlanetInventory,
} from './lib/brain-client'
import CityView from './views/CityView'
import MeshView from './views/MeshView'
import QueueView from './views/QueueView'
import SourceView from './views/SourceView'
import ExplorerView from './views/ExplorerView'
import SearchView from './views/SearchView'
import NotesView from './views/NotesView'
import ContextPackView from './views/ContextPackView'
import type { MeshSnapshot, QueueTask, Snapshot, ViewId } from './types'

type Planet = { id: string; name: string; root: string; indexedAt: string | null }

const VIEWS: { id: ViewId; label: string; hint: string }[] = [
  { id: 'atlas', label: 'Atlas', hint: 'Wissensgraph der indexierten Objekte' },
  { id: 'notes', label: 'Wissen', hint: 'Notizen, Links, Backlinks, Tags und Anhänge' },
  { id: 'explorer', label: 'Explorer', hint: 'Echter Quellbaum aus dem Brain' },
  { id: 'search', label: 'Suche', hint: 'Code- & Symbolsuche über /api/agent/search' },
  { id: 'packs', label: 'Packs', hint: 'Context-Pack-Inspector' },
  { id: 'city', label: 'City', hint: 'Workspaces als Distrikte, Objekte als Gebäude' },
  { id: 'mesh', label: 'Mesh', hint: 'Nachweisbare Arbeit und Übergaben aus dem Core-Trace' },
  { id: 'queue', label: 'Queue', hint: 'Wartende Arbeit; der erste freie Agent nimmt sie' },
]

const shortLabel = folderName
const SNAPSHOT_FILE_LIMIT = 2000

function initialView(): ViewId {
  const fromUrl = new URLSearchParams(location.search).get('view')
  const stored = (() => { try { return localStorage.getItem('plugbrain.view') } catch { return null } })()
  const candidate = fromUrl || stored
  return VIEWS.some(v => v.id === candidate) ? candidate as ViewId : 'atlas'
}

function initialWorkspace(): string {
  const params = new URLSearchParams(location.search)
  // An explicit id is authoritative. A root has to be resolved against the
  // actual galaxy below; it must never leak into an API `workspace` argument.
  if (params.has('workspace')) return params.get('workspace') ?? ''
  if (params.has('workspaceRoot')) return ''
  return lastWorkspace()
}

export default function App() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [mesh, setMesh] = useState<MeshSnapshot | null>(null)
  const [queue, setQueue] = useState<{ depth: number; tasks: QueueTask[] }>({ depth: 0, tasks: [] })
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [view, setView] = useState<ViewId>(initialView)
  const [workspaceId, setWorkspaceId] = useState<string>(initialWorkspace)
  const urlWorkspaceRoot = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.has('workspace') ? null : params.get('workspaceRoot')
  }, [])
  const [planets, setPlanets] = useState<Planet[]>([])
  const [vaultOpen, setVaultOpen] = useState(false)
  const [vaultPath, setVaultPath] = useState('')
  const [vaultBusy, setVaultBusy] = useState(false)
  const [vaultError, setVaultError] = useState('')
  const [vaultDone, setVaultDone] = useState('')
  // Live counters of a running index. Empty means "nothing is running", which
  // is a different statement from "0 of 0 files".
  const [vaultProgress, setVaultProgress] = useState('')
  const [bounds, setBounds] = useState<{ first: string; last: string } | null>(null)
  const [until, setUntil] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  // Direct fast graph files
  const [graphFiles, setGraphFiles] = useState<any[]>([])

  // Source View state
  const [selectedSource, setSelectedSource] = useState<{ path: string; line?: number | null } | null>(() => {
    const f = new URLSearchParams(location.search).get('file')
    const l = Number(new URLSearchParams(location.search).get('line'))
    return f ? { path: f, line: Number.isFinite(l) ? l : null } : null
  })
  const [selectedRevision, setSelectedRevision] = useState<string | null>(null)
  const [meshFocusAgent, setMeshFocusAgent] = useState<string | null>(null)

  // Token Modal state
  const [tokenModalOpen, setTokenModalOpen] = useState(false)
  const [tokenInput, setTokenInput] = useState(getStoredToken())
  const [agentInput, setAgentInput] = useState(getStoredAgentId())
  const [selectionModalOpen, setSelectionModalOpen] = useState(false)
  const [planetInventory, setPlanetInventory] = useState<PlanetInventory | null>(null)
  const [selectionDraft, setSelectionDraft] = useState<string[]>([])
  const [selectionBusy, setSelectionBusy] = useState(false)
  const [selectionError, setSelectionError] = useState('')
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === '?' || (event.key === '/' && event.shiftKey)) {
        event.preventDefault(); setShortcutsOpen(true)
      } else if (event.key === 'Escape') {
        setShortcutsOpen(false)
      } else if (event.key.toLowerCase() === 'o') {
        event.preventDefault(); setVaultOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    try { localStorage.setItem('plugbrain.view', view) } catch { /* private mode */ }
  }, [view])

  useEffect(() => {
    if (view !== 'mesh') return
    // Mesh has a current trace contract, not a historical-snapshot contract.
    // Do not leave a global time cursor implying that its current evidence is
    // a reconstruction of a past point in time.
    setPlaying(false)
    setUntil(null)
  }, [view])

  const untilRef = useRef<string | null>(null)
  useEffect(() => { untilRef.current = until }, [until])

  const applyWorkspace = (id: string): void => {
    setWorkspaceId(id)
    rememberWorkspace(id)
    const url = new URL(location.href)
    if (id) url.searchParams.set('workspace', id)
    else url.searchParams.delete('workspace')
    if (id) url.searchParams.delete('workspaceRoot')
    history.replaceState(null, '', url.toString())
  }

  // Fast load of graph files for Explorer
  useEffect(() => {
    if (!workspaceId) return
    let alive = true
    fetch(`/api/graph?workspace=${encodeURIComponent(workspaceId)}&limit=5000`)
      .then(r => r.json())
      .then(data => {
        if (!alive || !data?.nodes) return
        const files = data.nodes
          .filter((n: any) => n.type === 'file' && (n.path || n.properties?.path))
          .map((n: any) => ({
            id: n.id,
            path: n.path || n.properties?.path,
            label: n.label || n.path,
            lang: n.lang || n.properties?.lang,
            loc: n.loc ?? n.properties?.lines ?? 0,
            agent: n.agent || (n.properties?.agentId ? {
              id: n.properties.agentId,
              name: n.properties.agentName,
              color: n.properties.agentColor,
            } : null),
          }))
        setGraphFiles(files)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [workspaceId, attempt])

  useEffect(() => {
    let alive = true
    void galaxy()
      .then(list => {
        if (!alive) return
        setPlanets(list)
        if (!workspaceId && urlWorkspaceRoot !== null) {
          const resolved = workspaceIdForRoot(list, urlWorkspaceRoot)
          // A supplied root only ever opens its exact registered planet. An
          // unmatched root deliberately stays on the known-vault landing view
          // instead of registering a path or substituting another workspace.
          if (resolved) applyWorkspace(resolved)
          return
        }
        if (!workspaceId && list.length > 0) {
          const newest = [...list].sort((a, b) =>
            (b.indexedAt ?? '').localeCompare(a.indexedAt ?? ''))[0]
          if (newest) applyWorkspace(newest.id)
        }
      })
      .catch(() => {
        if (alive) setVaultError('Die Galaxie ist nicht erreichbar — läuft plugbrain serve?')
      })
    return () => { alive = false }
  }, [])

  const submitVault = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    const root = vaultPath.trim()
    if (root === '') return
    setVaultBusy(true)
    setVaultError('')
    setVaultDone('')
    setVaultProgress('Vault registriert — Indexlauf wird vorbereitet …')
    try {
      const id = await openVault(root, undefined, report => setVaultProgress(describeProgress(report)))
      void galaxy().then(list => { if (list.length > 0) setPlanets(list) }).catch(() => {})
      setVaultDone('Vault registriert und indiziert.')
      setVaultPath('')
      setVaultOpen(false)
      applyWorkspace(id)
      setAttempt(a => a + 1)
    } catch (cause) {
      setVaultError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setVaultBusy(false)
      setVaultProgress('')
    }
  }

  const reindexNow = async (): Promise<void> => {
    if (!workspaceId || vaultBusy) return
    setVaultBusy(true)
    setVaultError('')
    setVaultDone('')
    setVaultProgress('Indexlauf wird vorbereitet …')
    try {
      const result = await reindexWorkspace(
        workspaceId, report => setVaultProgress(describeProgress(report)))
      setVaultDone(`Neu indiziert: ${result?.files ?? 0} Dateien, ${result?.symbols ?? 0} Symbole, ${result?.edges ?? 0} Kanten.`)
      setAttempt(a => a + 1)
    } catch (cause) {
      setVaultError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setVaultBusy(false)
      setVaultProgress('')
    }
  }

  // Show what the brain is doing even when the run was not started here.
  //
  // The daemon indexes on its own after a burst of changes; a user who edits a
  // note and sees nothing happen has no way to tell "saved and indexed" from
  // "nothing happened". The daemon publishes its progress, so it is displayed —
  // and only while it is real: no run means no line, not a zero.
  useEffect(() => {
    if (!workspaceId) return
    let alive = true
    let timer: ReturnType<typeof setTimeout>
    const poll = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/index/progress?workspace=${encodeURIComponent(workspaceId)}`)
        if (response.ok) {
          const report = await response.json()
          if (!alive) return
          setVaultProgress(current => nextDaemonProgress(report, current))
        }
      } catch { /* the next tick tries again */ }
      if (alive) timer = setTimeout(() => void poll(), 1500)
    }
    void poll()
    return () => { alive = false; clearTimeout(timer) }
  }, [workspaceId])

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault()
    setStoredToken(tokenInput.trim())
    setStoredAgentId(agentInput.trim())
    resetAgentAttachments()
    setAttempt(value => value + 1)
    setTokenModalOpen(false)
  }

  const openSelection = async (): Promise<void> => {
    if (!workspaceId || selectionBusy) return
    setSelectionBusy(true)
    setSelectionError('')
    try {
      const inventory = await fetchPlanetInventory(workspaceId)
      setPlanetInventory(inventory)
      // An empty draft is intentional when the operator has not selected any
      // code roots yet. The UI never turns inventory into a select-all default.
      setSelectionDraft([...inventory.indexSelection.checkoutIds])
      setSelectionModalOpen(true)
    } catch (cause) {
      setSelectionError(cause instanceof Error ? cause.message : String(cause))
      setSelectionModalOpen(true)
    } finally {
      setSelectionBusy(false)
    }
  }

  const toggleCheckout = (checkoutId: string): void => {
    setSelectionDraft(current => current.includes(checkoutId)
      ? current.filter(id => id !== checkoutId)
      : [...current, checkoutId])
  }

  const saveSelection = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (!workspaceId || selectionBusy) return
    setSelectionBusy(true)
    setSelectionError('')
    try {
      const inventory = await setPlanetCheckoutSelection(workspaceId, selectionDraft)
      setPlanetInventory(inventory)
      setSelectionDraft([...inventory.indexSelection.checkoutIds])
      setVaultDone(
        inventory.indexSelection.checkoutIds.length === 0
          ? 'Code-Auswahl gespeichert: bewusst keine Code-Checkouts aktiv.'
          : `Code-Auswahl gespeichert: ${inventory.indexSelection.checkoutIds.length} Checkout(s) aktiv.`,
      )
      setSelectionModalOpen(false)
      setAttempt(value => value + 1)
    } catch (cause) {
      setSelectionError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setSelectionBusy(false)
    }
  }

  const vaultForm = (
    <form className="brain-vault" onSubmit={submitVault}>
      <div className="brain-vault__row">
        <input
          className="brain-vault__path"
          value={vaultPath}
          onChange={event => setVaultPath(event.target.value)}
          placeholder={'Pfad eines Ordners (auch ohne .git), z. B. C:\\Notizen\\vault'}
          spellCheck={false}
          aria-label="Vault-Pfad"
        />
        <button type="submit" className="brain-vault__open" disabled={vaultBusy || vaultPath.trim() === ''}>
          {vaultBusy ? 'Indiziere …' : 'Als Vault öffnen'}
        </button>
      </div>
      {workspaceId && (
        <div className="brain-vault__row brain-vault__row--tools">
          <button type="button" className="brain-vault__reindex" disabled={vaultBusy} onClick={() => void reindexNow()}>
            {vaultBusy ? 'läuft …' : 'Neu indizieren'}
          </button>
        </div>
      )}
      {vaultProgress && (
        <p className="brain-vault__progress" role="status" aria-live="polite">{vaultProgress}</p>
      )}
      {vaultError && <p className="brain-vault__error" role="alert">{vaultError}</p>}
      {vaultDone && <p className="brain-vault__done" role="status">{vaultDone}</p>}
    </form>
  )

  useEffect(() => {
    const requested = workspaceId || undefined
    void fetch('/api/timeline' + (requested ? '?workspace=' + encodeURIComponent(requested) : ''))
      .then(r => r.json())
      .then(payload => { if (payload?.bounds?.first) setBounds(payload.bounds) })
      .catch(() => {})
  }, [workspaceId])

  useEffect(() => {
    if (!playing || !bounds) return
    const from = new Date(bounds.first).getTime()
    const to = new Date(bounds.last).getTime()
    const span = Math.max(1, to - from)
    let step = until ? Math.round(((new Date(until).getTime() - from) / span) * 60) : 0
    const id = setInterval(() => {
      step += 1
      if (step >= 60) { setUntil(null); setPlaying(false); return }
      setUntil(new Date(from + (span * step) / 60).toISOString())
    }, 220)
    return () => clearInterval(id)
  }, [playing, bounds])

  useEffect(() => {
    const controller = new AbortController()
    let timer: ReturnType<typeof setTimeout>
    let previous = ''
    const requested = workspaceId || undefined
    async function refresh() {
      try {
        const params = new URLSearchParams()
        if (requested) params.set('workspace', requested)
        params.set('limit', String(SNAPSHOT_FILE_LIMIT))
        if (untilRef.current) params.set('until', untilRef.current)
        const response = await fetch('/api/atlas/snapshot' + (params.toString() ? `?${params}` : ''), { signal: controller.signal })
        if (!response.ok) throw new Error(`Brain-Verbindung: HTTP ${response.status}`)
        const next: Snapshot = await response.json()
        if (!next.workspace?.canonicalPath || !Array.isArray(next.graph?.nodes) || !Array.isArray(next.graph?.edges)) {
          throw new Error('Der Brain-Snapshot ist unvollständig.')
        }
        const signature = `${next.workspace.id}:${next.updatedAt ?? ''}:${next.graph.nodes.length}:${next.graph.edges.length}`
        if (signature !== previous) { setSnapshot(next); previous = signature }
        setError('')
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : String(cause))
      }

      // Mesh is a direct Core projection, not an activity-derived Board roster.
      // In particular, a historical file count never becomes a running task.
      if (requested) {
        try {
          const next = await fetchMesh(requested)
          if (!controller.signal.aborted) setMesh(next)
        } catch {
          // Do not retain or substitute an old roster when the projection is
          // unavailable. The Mesh view states that its evidence is unavailable.
          if (!controller.signal.aborted) setMesh(null)
        }
      } else if (!controller.signal.aborted) {
        setMesh(null)
      }

      try {
        const response = await fetch(
          '/api/queue' + (requested ? '?workspace=' + encodeURIComponent(requested) : ''),
          { signal: controller.signal })
        if (response.ok) {
          const payload = await response.json()
          if (payload?.ok === true && Array.isArray(payload.tasks)) {
            setQueue({ depth: Number(payload.depth ?? 0), tasks: payload.tasks as QueueTask[] })
          }
        }
      } catch {}
      if (!controller.signal.aborted) timer = setTimeout(refresh, 3000)
    }
    void refresh()
    return () => { controller.abort(); clearTimeout(timer) }
  }, [attempt, until, workspaceId])

  const indexed = snapshot?.graph.nodes.length ?? graphFiles.length
  const edgeCount = snapshot?.graph.edges.length ?? 0
  // "Is the brain current?" is a question about the INDEX, not about how much of
  // it this view happens to draw. A cropped picture used to be labelled
  // "Index unvollständig", which reads as a broken brain on every large vault.
  const indexBehind = snapshot?.coverage ? !snapshot.coverage.indexComplete : false
  const state = error
    ? 'getrennt (offline)'
    : (snapshot || graphFiles.length > 0)
      ? (indexBehind ? `${snapshot?.coverage?.staleFiles ?? 0} Datei(en) warten auf den Index` : 'live')
      : 'lädt …'

  // Extract real files for Explorer (graphFiles prioritized for instant responsiveness)
  const fileNodes = useMemo(() => {
    if (graphFiles.length > 0) return graphFiles
    if (!snapshot?.graph?.nodes) return []
    return snapshot.graph.nodes
      .filter((n: any) => n.type === 'file' && (n.properties?.path || n.path))
      .map((n: any) => {
        const relPath = n.properties?.path || n.path || ''
        return {
          id: n.id,
          path: relPath,
          label: n.label || n.name || relPath,
          lang: n.properties?.lang ?? n.lang ?? null,
          loc: n.properties?.lines ?? n.loc ?? 0,
          agent: n.properties?.agentId ? {
            id: n.properties.agentId,
            name: n.properties.agentName || n.properties.agentId,
            color: n.properties.agentColor || '#60a5fa',
          } : null,
        }
      })
  }, [graphFiles, snapshot])

  const handleOpenSource = (path: string, line?: number | null) => {
    if (!path) return
    setSelectedRevision(null)
    setSelectedSource({ path, line })
  }

  const openKnowledgeSource = (path: string) => { handleOpenSource(path); setView('explorer') }
  const openKnowledgeRevision = (revision: string) => {
    setSelectedSource(null)
    setSelectedRevision(revision)
    setView('explorer')
  }
  const openKnowledgeAgentRun = (agentId: string) => {
    setMeshFocusAgent(agentId)
    setView('mesh')
  }

  return <>
    {/* Negativprüfung: Bei gestopptem Server erscheint ein Offline-Zustand */}
    {error && (
      <div className="brain-offline-banner" role="alert">
        <div className="brain-offline-banner__inner">
          <span className="brain-offline-badge">OFFLINE</span>
          <span className="brain-offline-text">
            <strong>Server nicht erreichbar:</strong> {error} — läuft <code>plugbrain serve</code>?
          </span>
          <button type="button" className="brain-offline-btn" onClick={() => setAttempt(v => v + 1)}>
            Erneut verbinden
          </button>
        </div>
      </div>
    )}

    <div className="live-status" role="status">
      <strong className="live-status__name" title={snapshot?.workspace.canonicalPath ?? ''}>
        {snapshot ? shortLabel(snapshot.workspace.name) : (planets.find(p => p.id === workspaceId)?.name || 'PlugBrain')}
      </strong>
      {workspaceId && planets.length > 0 && (
        <label className="brain-switcher" title="Zu einem anderen Vault wechseln">
          <select value={workspaceId} onChange={event => { const id = event.target.value; if (id) applyWorkspace(id) }}>
            {planets.map(p => (
              <option key={p.id} value={p.id}>{shortLabel(p.name)}</option>
            ))}
          </select>
        </label>
      )}
      {workspaceId && (
        <button type="button" className="brain-vault-toggle"
          onClick={() => { setVaultOpen(v => !v); setVaultError(''); setVaultDone('') }}
          title="Einen Ordner als neuen Vault öffnen">
          {vaultOpen ? 'Schließen' : 'Vault öffnen'}
        </button>
      )}
      <button type="button" className="brain-vault-toggle" onClick={() => setShortcutsOpen(true)} title="Tastenkürzel anzeigen (?)">?</button>
      {workspaceId && (
        <button type="button" className="brain-vault-toggle"
          onClick={() => void openSelection()}
          disabled={selectionBusy}
          title="Aktive Code-Checkouts aus dem Planet-Inventar auswählen">
          {selectionBusy ? 'Lade Code …' : 'Code-Auswahl'}
        </button>
      )}
      <span className="live-status__figures">
        <b>{indexed}</b> Objekte <b>{edgeCount}</b> Kanten
        {snapshot?.coverage && snapshot.coverage.totalFiles > snapshot.coverage.shownFiles && (
          <span className="live-status__sample"
            title={`Ausschnitt: ${snapshot.coverage.shownFiles} von ${snapshot.coverage.totalFiles} Dateien des Index`}>
            {' '}· Ausschnitt aus {snapshot.coverage.totalFiles} Dateien
          </span>
        )}
      </span>
      <span className={error ? 'live-status__state is-bad' : 'live-status__state'}>{state}</span>

      <nav className="brain-views" aria-label="Ansicht">
        {VIEWS.map(v => (
          <button key={v.id} type="button" title={v.hint}
            className={v.id === view ? 'on' : undefined}
            aria-pressed={v.id === view}
            onClick={() => { setView(v.id); }}>
            {v.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="brain-auth-btn"
        onClick={() => setTokenModalOpen(true)}
        title="Auth-Token konfigurieren"
      >
        🔑 Auth
      </button>

      {error && <button type="button" onClick={() => setAttempt(value => value + 1)}>Erneut verbinden</button>}
    </div>

    {tokenModalOpen && (
      <div className="brain-modal-backdrop" onClick={() => setTokenModalOpen(false)}>
        <div className="brain-modal" onClick={e => e.stopPropagation()}>
          <div className="brain-modal__header">
            <h3>PlugBrain Authentifizierung</h3>
            <button type="button" className="brain-modal__close" onClick={() => setTokenModalOpen(false)}>✕</button>
          </div>
          <form onSubmit={handleSaveToken}>
            <div className="brain-modal__field">
              <label>Bearer Token (aus <code>auth.token</code>):</label>
              <input
                type="text"
                className="brain-modal__input mono"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                placeholder="plug-..."
              />
            </div>
            <div className="brain-modal__field">
              <label>Agent ID:</label>
              <input
                type="text"
                className="brain-modal__input mono"
                value={agentInput}
                onChange={e => setAgentInput(e.target.value)}
                placeholder="agy"
              />
            </div>
            <div className="brain-modal__actions">
              <button type="button" onClick={() => setTokenModalOpen(false)}>Abbrechen</button>
              <button type="submit" className="primary">Speichern</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {selectionModalOpen && (
      <div className="brain-modal-backdrop" onClick={() => !selectionBusy && setSelectionModalOpen(false)}>
        <div className="brain-modal brain-selection-modal" onClick={e => e.stopPropagation()}>
          <div className="brain-modal__header">
            <h3>Aktive Code-Checkouts</h3>
            <button type="button" className="brain-modal__close" disabled={selectionBusy}
              onClick={() => setSelectionModalOpen(false)}>✕</button>
          </div>
          <p className="brain-selection-modal__hint">
            Das Inventar bleibt vollständig sichtbar. Nur die hier bewusst markierten Checkout-IDs
            werden beim nächsten Scan als aktiver Code indexiert.
          </p>
          <form onSubmit={saveSelection}>
            {selectionError && <p className="brain-vault__error" role="alert">{selectionError}</p>}
            {planetInventory === null ? (
              <p className="brain-selection-modal__hint">Planet-Inventar wird geladen …</p>
            ) : planetInventory.checkouts.length === 0 ? (
              <p className="brain-selection-modal__hint">Dieser Workspace hat keine discoverbaren Code-Checkouts.</p>
            ) : (
              <fieldset className="brain-selection-list" disabled={selectionBusy}>
                <legend>Checkout-Inventar</legend>
                {planetInventory.checkouts.map(checkout => (
                  <label key={checkout.id} className={checkout.retiredAt ? 'is-retired' : undefined}>
                    <input
                      type="checkbox"
                      checked={selectionDraft.includes(checkout.id)}
                      disabled={checkout.retiredAt !== null}
                      onChange={() => toggleCheckout(checkout.id)}
                    />
                    <span>
                      <strong>{checkout.relPrefix}</strong>
                      <small>{checkout.id} · {checkout.branch ?? 'detached'}{checkout.retiredAt ? ' · retired' : ''}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
            <p className="brain-selection-modal__hint">
              Keine Auswahl ist ausdrücklich „notes only“; sie startet keinen leeren Code-Scan.
            </p>
            <div className="brain-modal__actions">
              <button type="button" disabled={selectionBusy} onClick={() => setSelectionModalOpen(false)}>Abbrechen</button>
              <button type="submit" className="primary" disabled={selectionBusy || planetInventory === null}>
                {selectionBusy ? 'Speichert …' : 'Auswahl speichern'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {bounds && (view === 'atlas' || view === 'city') && (
      <div className="brain-timelapse">
        <button type="button" onClick={() => setPlaying(p => !p)} title="Wachstum abspielen">
          {playing ? '❚❚' : '▶'}
        </button>
        <input
          type="range" min={0} max={60} step={1}
          value={until && bounds
            ? Math.round(((new Date(until).getTime() - new Date(bounds.first).getTime()) /
                Math.max(1, new Date(bounds.last).getTime() - new Date(bounds.first).getTime())) * 60)
            : 60}
          onChange={event => {
            setPlaying(false)
            const step = Number(event.target.value)
            if (step >= 60) { setUntil(null); return }
            const from = new Date(bounds.first).getTime()
            const to = new Date(bounds.last).getTime()
            setUntil(new Date(from + ((to - from) * step) / 60).toISOString())
          }}
        />
        <span>{until ? new Date(until).toLocaleTimeString() : 'jetzt'}</span>
      </div>
    )}

    {vaultOpen && workspaceId && vaultForm}

    {!workspaceId ? (
      <div className="brain-landing" role="main">
        <h1 className="brain-landing__title">PlugBrain</h1>
        <p className="brain-landing__lead">
          Einen Ordner als Vault öffnen — auch einen Wissensordner ohne <code>.git</code>. Der Brain indiziert ihn einmal und hält ihn über den
          Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu
          einem durchsuchbaren Graphen.
        </p>
        <ol className="brain-first-run" aria-label="Erste Schritte">
          <li><strong>Ordner wählen</strong><span>Notiz- oder Projektordner angeben; Git ist nicht erforderlich.</span></li>
          <li><strong>Index abwarten</strong><span>Der echte Fortschritt bleibt sichtbar, bis Suche und Graph bereit sind.</span></li>
          <li><strong>Wissen öffnen</strong><span>Leere Vaults bleiben ehrlich leer und können direkt mit einer Notiz beginnen.</span></li>
        </ol>
        {vaultForm}
        {planets.length > 0 && (
          <div className="brain-vault__known">
            <span>Oder einen bekannten Vault öffnen:</span>
            {planets.map(p => (
              <button key={p.id} type="button" className="brain-vault__known-item"
                onClick={() => applyWorkspace(p.id)}>
                {shortLabel(p.name)} <em title={p.root}>{p.indexedAt ? 'indiziert' : 'nicht indiziert'}</em>
              </button>
            ))}
          </div>
        )}
      </div>
    ) : (
      <div className="brain-workspace-layout">
        {view === 'atlas' && (
          snapshot && indexed > 0 ? (
            <div className="atlas-wrapper">
              <AtlasGraph graph={snapshot.graph} onOpenSource={handleOpenSource} />
              {selectedSource && (
                <div className="atlas-source-overlay">
                  <SourceView
                    workspaceId={workspaceId}
                    path={selectedSource.path}
                    highlightLine={selectedSource.line}
                    onClose={() => setSelectedSource(null)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="brain-empty">
              {error ? (
                <div className="brain-empty--offline-box">
                  <div className="offline-icon">🔌</div>
                  <h3>Server getrennt (Offline-Zustand)</h3>
                  <p>Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt.</p>
                  <button type="button" className="btn primary" onClick={() => setAttempt(a => a + 1)}>
                    Erneut verbinden
                  </button>
                </div>
              ) : (
                snapshot ? 'Dieser Workspace enthält noch keine indexierten Objekte.' : 'Echten Workspace-Graphen laden …'
              )}
            </div>
          )
        )}

        {view === 'notes' && <NotesView workspaceId={workspaceId} onOpenSource={openKnowledgeSource} onOpenRevision={openKnowledgeRevision} onOpenAgentRun={openKnowledgeAgentRun} />}

        {view === 'explorer' && (
          <div className="workbench-split">
            <div className="workbench-pane workbench-pane--side">
              <ExplorerView
                workspaceName={snapshot?.workspace.name ?? (planets.find(p => p.id === workspaceId)?.name || 'Workspace')}
                files={fileNodes}
                activePath={selectedSource?.path}
                onSelectFile={path => handleOpenSource(path)}
              />
            </div>
            <div className="workbench-pane workbench-pane--main">
              {selectedSource ? (
                <SourceView
                  workspaceId={workspaceId}
                  path={selectedSource.path}
                  highlightLine={selectedSource.line}
                  onClose={() => setSelectedSource(null)}
                />
              ) : selectedRevision ? (
                <RevisionInspector workspaceId={workspaceId} revision={selectedRevision} onClose={() => setSelectedRevision(null)} />
              ) : (
                <div className="source-placeholder">
                  <div className="source-placeholder__icon">📂</div>
                  <h3>Datei im Explorer auswählen</h3>
                  <p>Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'search' && (
          <div className="workbench-split">
            <div className="workbench-pane workbench-pane--side">
              <SearchView
                workspaceId={workspaceId}
                onSelectHit={(path, line) => handleOpenSource(path, line)}
              />
            </div>
            <div className="workbench-pane workbench-pane--main">
              {selectedSource ? (
                <SourceView
                  workspaceId={workspaceId}
                  path={selectedSource.path}
                  highlightLine={selectedSource.line}
                  onClose={() => setSelectedSource(null)}
                />
              ) : (
                <div className="source-placeholder">
                  <div className="source-placeholder__icon">🔍</div>
                  <h3>Code- und Symbolsuche über <code>/api/agent/search</code></h3>
                  <p>Gib einen Suchbegriff ein (z. B. <code>authKey</code>). Ein Klick auf einen Treffer öffnet direkt die Quelle.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'packs' && (
          <div className="workbench-split">
            <div className="workbench-pane workbench-pane--side">
              <ContextPackView
                workspaceId={workspaceId}
                onSelectSource={path => handleOpenSource(path)}
              />
            </div>
            <div className="workbench-pane workbench-pane--main">
              {selectedSource ? (
                <SourceView
                  workspaceId={workspaceId}
                  path={selectedSource.path}
                  highlightLine={selectedSource.line}
                  onClose={() => setSelectedSource(null)}
                />
              ) : (
                <div className="source-placeholder">
                  <div className="source-placeholder__icon">📦</div>
                  <h3>Context-Pack-Inspector</h3>
                  <p>Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'city' && (
          <div className="brain-view brain-view-city">
            <CityView snapshot={snapshot} onSelectFile={handleOpenSource} />
            {selectedSource && (
              <div className="atlas-source-overlay">
                <SourceView
                  workspaceId={workspaceId}
                  path={selectedSource.path}
                  highlightLine={selectedSource.line}
                  onClose={() => setSelectedSource(null)}
                  onNavigateFile={(p, l) => handleOpenSource(p, l)}
                />
              </div>
            )}
          </div>
        )}

        {view === 'queue' && (
          <div className="brain-view brain-view-queue">
            <QueueView tasks={queue.tasks} depth={queue.depth} />
          </div>
        )}

        {view === 'mesh' && (
          <div className="brain-view brain-view-mesh">
            <MeshView mesh={mesh} workspaceId={workspaceId} onSelectFile={handleOpenSource} focusAgentId={meshFocusAgent} />
            {selectedSource && (
              <div className="atlas-source-overlay">
                <SourceView
                  workspaceId={workspaceId}
                  path={selectedSource.path}
                  highlightLine={selectedSource.line}
                  onClose={() => setSelectedSource(null)}
                  onNavigateFile={(p, l) => handleOpenSource(p, l)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    )}
    {shortcutsOpen && <div className="brain-modal-backdrop" onClick={() => setShortcutsOpen(false)}>
      <section className="brain-modal brain-shortcuts" role="dialog" aria-modal="true" aria-labelledby="shortcut-title" onClick={event => event.stopPropagation()}>
        <div className="brain-modal__header"><h3 id="shortcut-title">Tastenkürzel</h3><button type="button" className="brain-modal__close" onClick={() => setShortcutsOpen(false)} aria-label="Tastenkürzel schließen">✕</button></div>
        <dl><div><dt><kbd>?</kbd></dt><dd>Diese Übersicht öffnen</dd></div><div><dt><kbd>O</kbd></dt><dd>Ordner als Vault öffnen</dd></div><div><dt><kbd>Esc</kbd></dt><dd>Übersicht oder Dialog schließen</dd></div><div><dt><kbd>↑</kbd><kbd>↓</kbd><kbd>Enter</kbd></dt><dd>Im Wissensgraphen auswählen und öffnen</dd></div></dl>
        <p>In Eingabefeldern bleiben alle Zeichen Eingabe und lösen keine Kurzbefehle aus.</p>
      </section>
    </div>}
  </>
}

function RevisionInspector({ workspaceId, revision, onClose }: { workspaceId: string; revision: string; onClose: () => void }) {
  const [state, setState] = useState<GitState | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let live = true
    setState(null); setError('')
    void fetchGitState(workspaceId).then(next => {
      if (live) setState(next)
    }).catch(cause => {
      if (live) setError(cause instanceof Error ? cause.message : String(cause))
    })
    return () => { live = false }
  }, [workspaceId, revision])

  const hit = state?.commits?.find(commit => commit.hash === revision || commit.hash.startsWith(revision))
  return <section className="source-placeholder revision-inspector" aria-live="polite">
    <div className="source-placeholder__icon">⌁</div><h3>Revision-Inspector</h3>
    <p><code>{revision}</code></p>
    {error && <p role="alert">{error}</p>}
    {!error && !state && <p>Prüfe die reale Git-Historie …</p>}
    {state && !state.isRepo && <p>Dieser Wissensordner ist absichtlich kein Git-Workspace; für diese Revision gibt es keine Git-Historie.</p>}
    {state?.isRepo && hit && <dl><div><dt>Hash</dt><dd><code>{hit.hash}</code></dd></div><div><dt>Autor</dt><dd>{hit.author}</dd></div><div><dt>Zeit</dt><dd>{hit.date}</dd></div><div><dt>Nachricht</dt><dd>{hit.message}</dd></div></dl>}
    {state?.isRepo && !hit && <p>Die geladene Historie enthält diese Revision nicht. Der Link bleibt unverändert; keine Ersatzrevision wird behauptet.</p>}
    <button type="button" onClick={onClose}>Inspector schließen</button>
  </section>
}

type Cluster = { id: string; name: string; color: string }
type Row = { i: number; name: string; color: string; deg: number; on: boolean }

type AtlasNode = { i: number; cid: string; name: string; meta?: any }
type AtlasEngine = {
  setView(view: string): void; toggleFlow(): void; toggleLabel(): void; toggleSpin(): void
  reset(): void; toggleTheme(): void; dolly(factor: number): void; zoomReset(): void
  toggleCluster(id: string): void; selectAt(index: number): void; hoverAt(index: number | null): void
  setQuery(query: string): void; clearPath(): void; centerOn(index: number): void; startPath(index: number): void
  dispose(): void
}
type AtlasModel = {
  CLUSTERS: Cluster[]
  nodes: AtlasNode[]
  edges: unknown[]
  createAtlas(options: { els: Record<string, HTMLElement>; emit: Record<string, (value: any) => void> }): AtlasEngine
}
type Drawer = {
  i: number; name: string; desc: string; cname: string; color: string
  deg: number; depth: number; kind: string; path: string; line?: number | null; status: string; prov: string
  groups: any[]
}

function mark(name: string, q: string) {
  if (!q) return name
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return name.split(re).map((part, i) => i % 2 ? <mark key={i}>{part}</mark> : part)
}

export function AtlasGraph({
  graph,
  onOpenSource,
}: {
  graph: { nodes: unknown[]; edges: unknown[] }
  onOpenSource: (path: string, line?: number | null) => void
}) {
  const { CLUSTERS, nodes, edges, createAtlas } = useMemo(
    () => createAtlasModel(graph) as unknown as AtlasModel,
    [graph]
  )
  const COUNT = Object.fromEntries(CLUSTERS.map((c: Cluster) => [c.id, nodes.filter((n: { cid: string }) => n.cid === c.id).length]))
  const stage = useRef<HTMLDivElement>(null)
  const labels = useRef<HTMLDivElement>(null)
  const hudMode = useRef<HTMLElement>(null)
  const hudSel = useRef<HTMLDivElement>(null)
  const pathbar = useRef<HTMLDivElement>(null)
  const chain = useRef<HTMLSpanElement>(null)
  const zlvl = useRef<HTMLButtonElement>(null)
  const sNode = useRef<HTMLDivElement>(null)
  const sEdge = useRef<HTMLDivElement>(null)
  const sDeg = useRef<HTMLDivElement>(null)
  const sFps = useRef<HTMLDivElement>(null)
  const q = useRef<HTMLInputElement>(null)
  const api = useRef<AtlasEngine | null>(null)

  const [gate, setGate] = useState(false)
  const [list, setList] = useState<{ q: string; rows: Row[] }>({ q: '', rows: [] })
  const [tools, setTools] = useState({ flow: true, label: true, spin: false })
  const [view, setView] = useState('atlas')
  const [theme, setTheme] = useState('dark')
  const [off, setOff] = useState<string[]>([])

  // Requirement 4: "Graph aus /api/graph bzw. /api/atlas/snapshot; ein Knoten-Klick öffnet die richtige Quelle, keine Infobox."
  const handleDrawer = (d: Drawer | null) => {
    if (d?.path) {
      onOpenSource(d.path, d.line ?? null)
    }
  }

  useEffect(() => {
    const a = createAtlas({
      els: {
        stage: stage.current!, labels: labels.current!, hudMode: hudMode.current!,
        hudSel: hudSel.current!, pathbar: pathbar.current!, chain: chain.current!,
        zlvl: zlvl.current!, sNode: sNode.current!, sEdge: sEdge.current!,
        sDeg: sDeg.current!, sFps: sFps.current!, q: q.current!,
      },
      emit: { gate: setGate, list: setList, drawer: handleDrawer, tools: setTools, theme: setTheme },
    })
    api.current = a
    return () => { a.dispose(); api.current = null }
  }, [createAtlas])

  const toggleCluster = (id: string) => {
    setOff(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id])
    api.current?.toggleCluster(id)
  }

  return (
    <div id="app" className="atlas-app">
      <aside>
        <div className="brand">
          <h1><span className="dot"></span>PlugBrain</h1>
          <p>Dein Workspace. Seine Dateien und Zusammenhänge.<br />
            Aktueller Graph aus PlugBrain.</p>
        </div>

        <div className="searchbox">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" /></svg>
          <input id="q" type="search" placeholder="Datei, Symbol im Graph suchen…" autoComplete="off" spellCheck={false} ref={q}
            onChange={e => api.current?.setQuery(e.target.value)} />
        </div>

        <div className="legend" id="legend">
          {CLUSTERS.map((c: Cluster) => (
            <button key={c.id} className={'cl' + (off.includes(c.id) ? ' off' : '')} type="button"
              onClick={() => toggleCluster(c.id)}>
              <i style={{ background: c.color }}></i>{c.name}<b>{COUNT[c.id]}</b></button>
          ))}
        </div>
        <div className="listwrap" id="list">
          {list.rows.length ? list.rows.map(n => (
            <div key={n.i} className={'lrow' + (n.on ? ' on' : '')} data-i={n.i}
              onClick={() => {
                api.current?.selectAt(n.i)
                const nodeObj = nodes[n.i]
                if (nodeObj?.meta?.path) {
                  onOpenSource(nodeObj.meta.path, nodeObj.meta.line)
                }
              }}
              onMouseOver={() => api.current?.hoverAt(n.i)}
              onMouseLeave={() => api.current?.hoverAt(null)}>
              <i style={{ background: n.color }}></i><span>{mark(n.name, list.q)}</span><b>{n.deg}</b>
            </div>
          )) : <div style={{ padding: '14px 16px', color: 'var(--faint)', fontSize: '12px' }}>Keine passenden Objekte im System-of-Record</div>}
        </div>

        <div className="foot">
          <div><div className="k" id="s-node" ref={sNode}>—</div><div className="l">Objekte</div></div>
          <div><div className="k" id="s-edge" ref={sEdge}>—</div><div className="l">Kanten</div></div>
          <div><div className="k" id="s-deg" ref={sDeg}>—</div><div className="l">Ø-Grad</div></div>
          <div><div className="k" id="s-fps" ref={sFps}>—</div><div className="l">FPS</div></div>
        </div>
      </aside>

      <div id="stage" ref={stage}>
        <div id="labels" ref={labels}></div>

        <div id="hud">
          <div><b id="hud-mode" ref={hudMode}>GALAXIE · FREIER ORBIT</b></div>
          <div id="hud-sel" ref={hudSel}>Knoten anklicken, um Quelle direkt zu öffnen</div>
          <div id="hud-sys">{nodes.length} VON {graph.nodes.length} OBJEKTEN · {edges.length} VON {graph.edges.length} KANTEN</div>
        </div>

        <div id="pathbar" ref={pathbar}>
          <span className="chain" id="chain" ref={chain}></span>
          <button className="x" id="path-x" type="button" onClick={() => api.current?.clearPath()}>✕</button>
        </div>

        <div id="tools">
          {[['atlas', 'Galaxie'], ['shell', 'Planet'], ['tier', 'Pipeline']].map(([v, label]) => (
            <button key={v} className={'tb' + (view === v ? ' on' : '')} data-view={v} type="button"
              onClick={() => { setView(v); api.current?.setView(v) }}>{label}</button>
          ))}
          <span className="sep"></span>
          <button className={'tb' + (tools.flow ? ' on' : '')} id="t-flow" type="button"
            onClick={() => api.current?.toggleFlow()}>Signalfluss</button>
          <button className={'tb' + (tools.label ? ' on' : '')} id="t-label" type="button"
            onClick={() => api.current?.toggleLabel()}>Labels</button>
          <button className={'tb' + (tools.spin ? ' on' : '')} id="t-spin" type="button"
            onClick={() => api.current?.toggleSpin()}>Auto-Orbit</button>
          <span className="sep"></span>
          <button className="tb" id="zout" type="button" title="Rauszoomen" onClick={() => api.current?.dolly(1.18)}>−</button>
          <button className="tb" id="zlvl" type="button" title="Zoom zurücksetzen" ref={zlvl}
            onClick={() => api.current?.zoomReset()}>100%</button>
          <button className="tb" id="zin" type="button" title="Reinzoomen" onClick={() => api.current?.dolly(1 / 1.18)}>＋</button>
          <span className="sep"></span>
          <button className="tb" id="t-theme" type="button" title="Theme wechseln"
            onClick={() => api.current?.toggleTheme()}>{theme === 'light' ? 'Nacht' : 'Tag'}</button>
          <button className="tb" id="t-reset" type="button" onClick={() => api.current?.reset()}>Reset</button>
        </div>

        <div id="hint">
          Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt
        </div>

        <div id="gate" style={gate ? { display: 'grid' } : undefined}>WebGL ist auf diesem Gerät nicht verfügbar.<br />Suche und Objekt-Inspector bleiben nutzbar.</div>
      </div>
    </div>
  )
}
