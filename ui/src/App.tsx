import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import GraphView from './views/GraphView'
import { Icon, ICON } from './ui/Icon'
import { TimelineControl, TIMELINE_STEPS, type Timeline } from './ui/TimelineControl'
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
    if (view === 'city' || view === 'mesh' || view === 'queue') {
      setSelectedSource(null)
    }
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
    let step = until ? Math.round(((new Date(until).getTime() - from) / span) * TIMELINE_STEPS) : 0
    const id = setInterval(() => {
      step += 1
      if (step >= TIMELINE_STEPS) { setUntil(null); setPlaying(false); return }
      setUntil(new Date(from + (span * step) / TIMELINE_STEPS).toISOString())
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
        // updatedAt is stamped per request, so keying on it rebuilt the whole graph
        // on every poll. The index generation only moves when the index does.
        const signature = `${next.workspace.id}:${next.indexGeneration ?? ''}:${until ?? ''}:${next.graph.nodes.length}:${next.graph.edges.length}`
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

  // "Is the brain current?" is a question about the INDEX, not about how much of
  // it the graph happens to draw.
  const indexBehind = snapshot?.coverage ? !snapshot.coverage.indexComplete : false
  const staleFiles = snapshot?.coverage?.staleFiles ?? 0
  const status: { tone: 'ok' | 'warn' | 'bad' | 'idle'; text: string; title: string } = error
    ? { tone: 'bad', text: 'Offline', title: error }
    : !snapshot
      ? { tone: 'idle', text: 'Verbinde …', title: 'Der aktuelle Stand wird aus dem Brain gelesen.' }
      : indexBehind
        ? { tone: 'warn', text: `${staleFiles} warten`, title: `${staleFiles} Datei(en) warten auf den Index` }
        : { tone: 'ok', text: 'Aktuell', title: 'Der Index ist auf dem neuesten Stand.' }

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

  const retry = useCallback(() => setAttempt(value => value + 1), [])

  // A node opened from the graph lands in the Explorer: a full source view with
  // line numbers beats a panel painted over the graph it came from.
  const openFromGraph = useCallback((path: string) => {
    setSelectedRevision(null)
    setSelectedSource({ path, line: null })
    setView('explorer')
  }, [])

  const timeline = useMemo<Timeline | null>(() => {
    if (!bounds || !(view === 'atlas' || view === 'city')) return null
    const from = new Date(bounds.first).getTime()
    const span = Math.max(1, new Date(bounds.last).getTime() - from)
    const step = until ? Math.round(((new Date(until).getTime() - from) / span) * TIMELINE_STEPS) : TIMELINE_STEPS
    return {
      playing,
      step,
      label: until
        ? new Date(until).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
        : 'jetzt',
      onTogglePlay: () => setPlaying(current => !current),
      onScrub: next => {
        setPlaying(false)
        if (next >= TIMELINE_STEPS) { setUntil(null); return }
        setUntil(new Date(from + (span * next) / TIMELINE_STEPS).toISOString())
      },
    }
  }, [bounds, until, playing])

  const sourceOverlay = selectedSource && workspaceId ? (
    <div className="atlas-source-overlay">
      <SourceView
        workspaceId={workspaceId}
        path={selectedSource.path}
        highlightLine={selectedSource.line}
        onClose={() => setSelectedSource(null)}
        onNavigateFile={(p, l) => handleOpenSource(p, l)}
      />
    </div>
  ) : null

  const sourcePane = (placeholder: React.ReactNode) => selectedSource && workspaceId ? (
    <SourceView
      workspaceId={workspaceId}
      path={selectedSource.path}
      highlightLine={selectedSource.line}
      onClose={() => setSelectedSource(null)}
      onNavigateFile={(p, l) => handleOpenSource(p, l)}
    />
  ) : placeholder

  const workspaceName = snapshot
    ? shortLabel(snapshot.workspace.name)
    : (planets.find(p => p.id === workspaceId)?.name ?? '')

  return (
    <div className="pb-app">
      <header className="pb-topbar">
        <div className="pb-topbar__brand">
          <span className="pb-logo" aria-hidden="true" />
          <span className="pb-topbar__product">PlugBrain</span>
          {workspaceId && planets.length > 1 ? (
            <label className="pb-select" title="Vault wechseln">
              <span className="pb-sr">Vault</span>
              <select value={workspaceId} onChange={event => { const id = event.target.value; if (id) applyWorkspace(id) }}>
                {planets.map(p => <option key={p.id} value={p.id}>{shortLabel(p.name)}</option>)}
              </select>
              <Icon path={ICON.chevron} />
            </label>
          ) : workspaceName !== '' && (
            <span className="pb-topbar__workspace" title={snapshot?.workspace.canonicalPath ?? ''}>{workspaceName}</span>
          )}
        </div>

        {workspaceId && (
          <nav className="pb-tabs" aria-label="Ansicht">
            {VIEWS.map(v => (
              <button key={v.id} type="button" className="pb-tab" title={v.hint}
                aria-current={v.id === view ? 'page' : undefined}
                onClick={() => setView(v.id)}>
                {v.label}
              </button>
            ))}
          </nav>
        )}

        <div className="pb-topbar__actions">
          {workspaceId && (
            <span className="pb-status" data-tone={status.tone} role="status" title={status.title}>
              <i aria-hidden="true" /><span>{status.text}</span>
            </span>
          )}
          {workspaceId && (
            <button type="button" className="pb-tool"
              aria-expanded={vaultOpen}
              onClick={() => { setVaultOpen(v => !v); setVaultError(''); setVaultDone('') }}
              title="Einen Ordner als neuen Vault öffnen (O)">
              <Icon path={ICON.folder} /><span>{vaultOpen ? 'Schließen' : 'Vault öffnen'}</span>
            </button>
          )}
          {workspaceId && (
            <button type="button" className="pb-tool"
              onClick={() => void openSelection()}
              disabled={selectionBusy}
              title="Aktive Code-Checkouts aus dem Planet-Inventar auswählen">
              <span>{selectionBusy ? 'Lädt …' : 'Code-Auswahl'}</span>
            </button>
          )}
          <button type="button" className="pb-tool pb-tool--icon" onClick={() => setShortcutsOpen(true)}
            aria-label="Tastenkürzel anzeigen" title="Tastenkürzel (?)">
            <Icon path={ICON.keyboard} />
          </button>
          <button type="button" className="pb-tool pb-tool--icon" onClick={() => setTokenModalOpen(true)}
            aria-label="Zugang konfigurieren" title="Auth-Token und Agent-ID">
            <Icon path={ICON.key} />
          </button>
        </div>
      </header>

      {error && (
        <div className="pb-banner" role="alert">
          <strong>Server nicht erreichbar.</strong>
          <span>{error} — läuft <code>plugbrain serve</code>?</span>
          <button type="button" className="pb-button" onClick={retry}>
            <Icon path={ICON.refresh} /> Erneut verbinden
          </button>
        </div>
      )}

      {vaultOpen && workspaceId && <div className="pb-drawer">{vaultForm}</div>}

      <main className="pb-main">
        {!workspaceId ? (
          <div className="brain-landing">
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
        ) : <>
          {view === 'atlas' && (
            <div className="pb-view">
              <div id="app" className="atlas-app">
                <GraphView
                  graph={snapshot?.graph ?? null}
                  coverage={snapshot?.coverage ?? null}
                  error={snapshot ? '' : error}
                  onRetry={retry}
                  onOpenSource={openFromGraph}
                  timeline={timeline}
                />
              </div>
            </div>
          )}

          {view === 'notes' && (
            <NotesView
              workspaceId={workspaceId}
              onOpenSource={openKnowledgeSource}
              onOpenRevision={openKnowledgeRevision}
              onOpenAgentRun={openKnowledgeAgentRun}
              onNavigateTab={tab => setView(tab)}
            />
          )}

          {view === 'explorer' && (
            <div className="pb-view">
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
                  {selectedRevision && !selectedSource ? (
                    <RevisionInspector workspaceId={workspaceId} revision={selectedRevision} onClose={() => setSelectedRevision(null)} />
                  ) : sourcePane(
                    <div className="source-placeholder">
                      <div className="source-placeholder__icon"><Icon path={ICON.folder} /></div>
                      <h3>Datei im Explorer auswählen</h3>
                      <p>Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen.</p>
                    </div>,
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'search' && (
            <div className="pb-view">
              <div className="workbench-split">
                <div className="workbench-pane workbench-pane--side">
                  <SearchView workspaceId={workspaceId} onSelectHit={(path, line) => handleOpenSource(path, line)} />
                </div>
                <div className="workbench-pane workbench-pane--main">
                  {sourcePane(
                    <div className="source-placeholder">
                      <div className="source-placeholder__icon"><Icon path={ICON.search} /></div>
                      <h3>Code- und Symbolsuche</h3>
                      <p>Gib einen Suchbegriff ein, zum Beispiel <code>authKey</code>. Ein Klick auf einen Treffer öffnet die Quelle.</p>
                    </div>,
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'packs' && (
            <div className="pb-view">
              <div className="workbench-split">
                <div className="workbench-pane workbench-pane--side">
                  <ContextPackView workspaceId={workspaceId} onSelectSource={path => handleOpenSource(path)} />
                </div>
                <div className="workbench-pane workbench-pane--main">
                  {sourcePane(
                    <div className="source-placeholder">
                      <div className="source-placeholder__icon"><Icon path={ICON.open} /></div>
                      <h3>Context-Pack-Inspector</h3>
                      <p>Erzeuge einen Context Pack für eine Aufgabe. Ein Klick auf eine extrahierte Quelle zeigt ihren Inhalt.</p>
                    </div>,
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'city' && (
            <div className="pb-view">
              <div className="pb-city">
                <CityView snapshot={snapshot} onSelectFile={handleOpenSource} />
                {timeline && <div className="pb-overlay-tools"><TimelineControl timeline={timeline} /></div>}
                {sourceOverlay}
              </div>
            </div>
          )}

          {view === 'queue' && (
            <div className="pb-view pb-view--scroll">
              <QueueView tasks={queue.tasks} depth={queue.depth} />
            </div>
          )}

          {view === 'mesh' && (
            <div className="pb-view">
              <div className="pb-mesh">
                <MeshView mesh={mesh} workspaceId={workspaceId} onSelectFile={handleOpenSource} focusAgentId={meshFocusAgent} />
                {sourceOverlay}
              </div>
            </div>
          )}

        </>}
      </main>

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
      {shortcutsOpen && <div className="brain-modal-backdrop" onClick={() => setShortcutsOpen(false)}>
        <section className="brain-modal brain-shortcuts" role="dialog" aria-modal="true" aria-labelledby="shortcut-title" onClick={event => event.stopPropagation()}>
          <div className="brain-modal__header"><h3 id="shortcut-title">Tastenkürzel</h3><button type="button" className="brain-modal__close" onClick={() => setShortcutsOpen(false)} aria-label="Tastenkürzel schließen">✕</button></div>
          <dl><div><dt><kbd>?</kbd></dt><dd>Diese Übersicht öffnen</dd></div><div><dt><kbd>O</kbd></dt><dd>Ordner als Vault öffnen</dd></div><div><dt><kbd>Esc</kbd></dt><dd>Übersicht oder Dialog schließen</dd></div><div><dt><kbd>/</kbd></dt><dd>Im Graph suchen</dd></div><div><dt><kbd>F</kbd></dt><dd>Graph einpassen</dd></div><div><dt><kbd>+</kbd><kbd>−</kbd></dt><dd>Graph zoomen</dd></div><div><dt><kbd>↑</kbd><kbd>↓</kbd><kbd>Enter</kbd></dt><dd>In der Liste auswählen und zentrieren</dd></div></dl>
          <p>In Eingabefeldern bleiben alle Zeichen Eingabe und lösen keine Kurzbefehle aus.</p>
        </section>
      </div>}
    </div>
  )
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
    <div className="source-placeholder__icon"><Icon path={ICON.refresh} /></div><h3>Revision-Inspector</h3>
    <p><code>{revision}</code></p>
    {error && <p role="alert">{error}</p>}
    {!error && !state && <p>Prüfe die reale Git-Historie …</p>}
    {state && !state.isRepo && <p>Dieser Wissensordner ist absichtlich kein Git-Workspace; für diese Revision gibt es keine Git-Historie.</p>}
    {state?.isRepo && hit && <dl><div><dt>Hash</dt><dd><code>{hit.hash}</code></dd></div><div><dt>Autor</dt><dd>{hit.author}</dd></div><div><dt>Zeit</dt><dd>{hit.date}</dd></div><div><dt>Nachricht</dt><dd>{hit.message}</dd></div></dl>}
    {state?.isRepo && !hit && <p>Die geladene Historie enthält diese Revision nicht. Der Link bleibt unverändert; keine Ersatzrevision wird behauptet.</p>}
    <button type="button" onClick={onClose}>Inspector schließen</button>
  </section>
}
