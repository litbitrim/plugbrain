/**
 * PlugBrain Core HTTP Client for Atlas V1.
 * Connects directly to PlugBrain-Core daemon endpoints.
 * Handles bearer token authentication and error states.
 */
import type { MeshSnapshot, MeshTimelineEntry } from '../types'

export interface GalaxyPlanet {
  id: string
  name: string
  root: string
  indexedAt: string | null
  files: number
  symbols: number
  edges: number
  stale: number
  agents: Array<{ id: string; name: string; color: string }>
}

export interface GitCommit {
  hash: string
  author: string
  message: string
  date: string
}

export interface GitState {
  ok: boolean
  isRepo: boolean
  isRepoRoot: boolean
  root?: string
  branch?: string
  head?: string
  dirtyCount?: number
  worktrees?: Array<{ path: string; branch: string; head: string }>
  commits?: GitCommit[]
  contractWarning?: string | null
  error?: string | null
  readAt?: string | null
}

export interface SearchHit {
  name: string
  path: string
  kind: string
  line: number | null
}

export interface FileReadResult {
  ok: boolean
  path: string
  content: string
  bytes: number
  lang: string | null
  error?: string
}

export interface FileProvenance {
  path: string
  owner: { id: string; name: string; color: string; action: string; at: string } | null
  history: Array<{ action: string; at: string; detail: string | null; agent_id: string | null; name: string | null; color: string | null }>
}

export interface ContextPackResult {
  ok: boolean
  id: string
  version: number
  sources: number
  body: string
  error?: string
}

export interface PackStalenessResult {
  ok: boolean
  packId: string
  stale: boolean
  changed: string[]
  missing: string[]
  error?: string
}

const TOKEN_KEY = 'plugbrain.auth_token'
const AGENT_KEY = 'plugbrain.agent_id'

// The daemon hands the shell its own session when it serves index.html, so the
// vault works on first load without anyone pasting a key. An explicit URL token
// is a one-load override; otherwise the current daemon session beats any stale
// browser-local token left behind by an earlier Core.
declare global {
  interface Window { __PLUGBRAIN__?: { token?: string } }
}

function injectedToken(): string {
  try {
    return window.__PLUGBRAIN__?.token?.trim() ?? ''
  } catch {
    return ''
  }
}

export function getStoredToken(): string {
  let fromUrl = ''
  try {
    fromUrl = new URLSearchParams(window.location.search).get('token')?.trim() ?? ''
  } catch {
    // A static/offline shell may not expose window.location. It can still use
    // an injected local session or an intentionally saved manual token.
  }
  if (fromUrl) {
    setStoredToken(fromUrl)
    return fromUrl
  }

  const injected = injectedToken()
  if (injected) return injected

  try {
    return localStorage.getItem(TOKEN_KEY)?.trim() ?? ''
  } catch {
    return ''
  }
}

/** Inventory is intentionally broader than the active Code selection. */
export interface PlanetCheckoutInventory {
  id: string
  relPrefix: string
  branch: string | null
  head: string | null
  retiredAt: string | null
  indexSelected: boolean
}

export interface PlanetInventory {
  workspaceId: string
  planetId: string
  indexSelection: {
    configured: boolean
    checkoutIds: string[]
    updatedAt: string | null
  }
  checkouts: PlanetCheckoutInventory[]
}

/** True while the page is running on the daemon's own injected session. */
export function hasInjectedSession(): boolean {
  return injectedToken() !== ''
}

export function setStoredToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // private browsing
  }
}

export function getStoredAgentId(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('agent')
    if (fromUrl) {
      localStorage.setItem(AGENT_KEY, fromUrl)
      return fromUrl
    }
    return localStorage.getItem(AGENT_KEY) || 'agy'
  } catch {
    return 'agy'
  }
}

export function setStoredAgentId(agentId: string): void {
  try {
    localStorage.setItem(AGENT_KEY, agentId)
  } catch {
    // private browsing
  }
}

function authHeaders(): Record<string, string> {
  const token = getStoredToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    headers['x-plug-auth-token'] = token
  }
  return headers
}

export async function fetchGalaxy(): Promise<GalaxyPlanet[]> {
  const res = await fetch('/api/galaxy')
  if (!res.ok) throw new Error(`Galaxie HTTP ${res.status}`)
  const data = await res.json()
  if (!data?.ok || !Array.isArray(data.planets)) throw new Error('Galaxie unvollständig')
  return data.planets
}

/** Read discoverable checkout inventory; this never activates a checkout. */
export async function fetchPlanetInventory(workspaceId: string): Promise<PlanetInventory> {
  const res = await fetch(`/api/planet?workspace=${encodeURIComponent(workspaceId)}`)
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Planet inventory HTTP ${res.status}`)
  }
  const data = await res.json()
  if (!data?.ok || !data.planet || !Array.isArray(data.planet.checkouts)) {
    throw new Error('Planet-Inventar unvollständig')
  }
  return data.planet as PlanetInventory
}

/** Persist exactly the IDs consciously checked by the operator. */
export async function setPlanetCheckoutSelection(
  workspaceId: string,
  checkoutIds: string[],
): Promise<PlanetInventory> {
  const res = await fetch('/api/planet/selection', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ workspace: workspaceId, checkoutIds }),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data?.ok || !data.planet) {
    throw new Error(data?.error ?? `Code-Auswahl HTTP ${res.status}`)
  }
  return data.planet as PlanetInventory
}

export async function fetchGitState(workspaceId: string): Promise<GitState> {
  const res = await fetch(`/api/git?workspace=${encodeURIComponent(workspaceId)}`)
  if (!res.ok) throw new Error(`Git-Status HTTP ${res.status}`)
  return res.json()
}

export async function fetchGraph(workspaceId: string, limit = 2000): Promise<any> {
  const res = await fetch(`/api/graph?workspace=${encodeURIComponent(workspaceId)}&limit=${limit}`)
  if (!res.ok) throw new Error(`Graph HTTP ${res.status}`)
  return res.json()
}

/**
 * Read the one authoritative Mesh projection. This intentionally has no
 * roster, agent-presence, or historical-activity fallback: absent trace
 * evidence must remain absent in the UI.
 */
export async function fetchMesh(workspaceId: string): Promise<MeshSnapshot> {
  const res = await fetch(`/api/mesh?workspace=${encodeURIComponent(workspaceId)}`)
  if (!res.ok) throw new Error(`Mesh HTTP ${res.status}`)
  const data = await res.json()
  const mesh = data?.mesh as MeshSnapshot | undefined
  if (!data?.ok || !mesh || mesh.workspaceId !== workspaceId
    || !Array.isArray(mesh.nodes) || !Array.isArray(mesh.edges)) {
    throw new Error('Mesh-Projektion unvollständig oder für einen anderen Workspace')
  }
  return mesh
}

export async function fetchMeshTimeline(
  workspaceId: string,
  filter: { agentId?: string; taskId?: string; workerId?: string; limit?: number } = {},
): Promise<MeshTimelineEntry[]> {
  const params = new URLSearchParams({ workspace: workspaceId })
  if (filter.agentId) params.set('agentId', filter.agentId)
  if (filter.taskId) params.set('taskId', filter.taskId)
  if (filter.workerId) params.set('workerId', filter.workerId)
  if (filter.limit !== undefined) params.set('limit', String(filter.limit))
  const res = await fetch(`/api/mesh/timeline?${params}`)
  if (!res.ok) throw new Error(`Mesh-Zeitleiste HTTP ${res.status}`)
  const data = await res.json()
  if (!data?.ok || !Array.isArray(data.timeline)) throw new Error('Mesh-Zeitleiste unvollständig')
  return data.timeline as MeshTimelineEntry[]
}

export async function fetchProvenance(workspaceId: string, path: string): Promise<FileProvenance> {
  const res = await fetch(`/api/provenance?workspace=${encodeURIComponent(workspaceId)}&path=${encodeURIComponent(path)}`)
  if (!res.ok) throw new Error(`Provenance HTTP ${res.status}`)
  return res.json()
}

export async function attachAgent(workspaceId: string, agentId = getStoredAgentId(), name = 'AGY'): Promise<any> {
  const res = await fetch('/api/agent/attach', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ workspace: workspaceId, agentId, name }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Agent Attach HTTP ${res.status}`)
  }
  return res.json()
}

// Reads require a *registered* agent (FO-3): a read must never mint an identity.
// The local page therefore attaches its own agent once per workspace, memoised
// so a view that opens ten files does not attach ten times. A failure is not
// fatal here — the read itself reports the server's reason.
const attached = new Map<string, Promise<void>>()

export function ensureAgentAttached(workspaceId: string, agentId = getStoredAgentId()): Promise<void> {
  const key = `${workspaceId}\u0000${agentId}`
  const pending = attached.get(key)
  if (pending) return pending
  const run = attachAgent(workspaceId, agentId)
    .then(() => undefined)
    .catch(() => {
      // Allow a later retry, e.g. once a token has been entered in the dialog.
      attached.delete(key)
    })
  attached.set(key, run)
  return run
}

/** Forget every attachment, e.g. after the operator changed token or agent id. */
export function resetAgentAttachments(): void {
  attached.clear()
}

export async function searchAgent(workspaceId: string, query: string, agentId = getStoredAgentId()): Promise<SearchHit[]> {
  await ensureAgentAttached(workspaceId, agentId)
  const res = await fetch('/api/agent/search', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ workspace: workspaceId, agentId, query }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Search HTTP ${res.status}`)
  }
  const data = await res.json()
  return Array.isArray(data?.hits) ? data.hits : []
}

export async function readAgentFile(workspaceId: string, path: string, agentId = getStoredAgentId()): Promise<FileReadResult> {
  await ensureAgentAttached(workspaceId, agentId)
  const res = await fetch('/api/agent/read', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ workspace: workspaceId, agentId, path }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    const message = err?.error ?? `HTTP ${res.status}`
    return { ok: false, path, content: '', bytes: 0, lang: null, error: message }
  }
  const data = await res.json()
  return {
    ok: true,
    path: data.path ?? path,
    content: data.content ?? '',
    bytes: data.bytes ?? 0,
    lang: data.lang ?? null,
  }
}

export async function createContextPack(workspaceId: string, goal: string, agentId = getStoredAgentId()): Promise<ContextPackResult> {
  const res = await fetch('/api/context/pack', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ workspaceId, goal, agentId }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Context Pack HTTP ${res.status}`)
  }
  return res.json()
}

export async function checkPackStaleness(packId: string): Promise<PackStalenessResult> {
  const res = await fetch(`/api/context/pack/${encodeURIComponent(packId)}/staleness`)
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Staleness HTTP ${res.status}`)
  }
  return res.json()
}

export interface NoteQueryResult {
  ok: boolean
  total: number
  notes: Array<{
    path: string
    title: string
    typ?: string | null
    stand?: string | null
    outLinks?: number
    inLinks?: number
  }>
  error?: string
}

export async function queryNotes(workspaceId: string, filter: string): Promise<NoteQueryResult> {
  const res = await fetch(`/api/notes/query?workspace=${encodeURIComponent(workspaceId)}&q=${encodeURIComponent(filter)}`, {
    headers: authHeaders(),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Notes Query HTTP ${res.status}`)
  }
  return res.json()
}

export interface NoteTextHit {
  path: string
  title: string
  snippet: string | null
  /** Line of the first matching passage when the daemon was asked for it. */
  line: number | null
  score: number
}

export interface NoteTextResult {
  ok: boolean
  query: string
  total: number
  returned: number
  hits: NoteTextHit[]
  error?: string
}

/**
 * Prose search over the notes: "where did we write that down?".
 *
 * `lines=1` makes each hit landable — the daemon opens the note to say where
 * the passage is, which is what "click opens the note at the match" needs.
 */
export async function searchNoteText(
  workspaceId: string, query: string, limit = 30,
): Promise<NoteTextResult> {
  const res = await fetch(
    `/api/notes/search?workspace=${encodeURIComponent(workspaceId)}` +
    `&q=${encodeURIComponent(query)}&limit=${limit}&lines=1`,
    { headers: authHeaders() })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error ?? `Notizsuche HTTP ${res.status}`)
  }
  return res.json()
}

export interface BacklinkItem {
  path: string
  line: number
  alias?: string | null
}

export async function fetchBacklinks(workspaceId: string, path: string): Promise<BacklinkItem[]> {
  const res = await fetch(`/api/notes/backlinks?workspace=${encodeURIComponent(workspaceId)}&path=${encodeURIComponent(path)}`)
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data?.backlinks) ? data.backlinks : []
}

export interface AgentPresenceItem {
  id: string
  name: string
  color: string
  hue?: number
  model?: string | null
  host?: string | null
  workspaceId: string
  checkoutId?: string | null
  taskId?: string | null
  missionId?: string | null
  lastHeartbeat: string | null
  heartbeatTtlMs: number
  presence: 'active' | 'idle' | 'dead' | 'unproven'
  isExpired: boolean
}

export async function fetchAgentPresence(workspaceId?: string): Promise<AgentPresenceItem[]> {
  const query = workspaceId ? `?workspace=${encodeURIComponent(workspaceId)}` : ''
  const res = await fetch(`/api/agent/presence${query}`)
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data?.agents) ? data.agents : []
}

export interface LeaseItem {
  id: string
  workspaceId: string
  agentId: string
  taskId: string
  paths: string[]
  symbols: string[]
  mode: 'read' | 'write'
  epoch: number
  createdAt: string
  expiresAt: string
  ttlMs: number
}

export async function fetchActiveLeases(workspaceId?: string): Promise<LeaseItem[]> {
  const query = workspaceId ? `?workspace=${encodeURIComponent(workspaceId)}` : ''
  const res = await fetch(`/api/agent/leases${query}`)
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data?.leases) ? data.leases : []
}

export interface AgentInspectResult {
  ok: boolean
  agent: {
    id: string
    name: string
    color: string
    hue?: number
    model?: string | null
    host?: string | null
    workspaceId?: string
    checkoutId?: string | null
    taskId?: string | null
    missionId?: string | null
    state: 'active' | 'idle' | 'dead' | 'unproven'
    lastHeartbeat?: string | null
    heartbeatTtlMs?: number
  }
  claims: LeaseItem[]
  dateiereignisse: Array<{ id: number; path: string; action: string; at: string; detail?: string | null }>
  toolereignisse: Array<{ id: number; type: string; occurred_at: string; task_id?: string | null; payload: string }>
  messages: Array<{
    id: string
    fromAgent: string
    toAgent: string | null
    channel: string | null
    subject: string
    body: string
    createdAt: string
    deliveredAt: string | null
    readAt: string | null
  }>
  error?: string
}

export async function fetchAgentInspect(agentId: string, workspaceId?: string): Promise<AgentInspectResult | null> {
  const query = `?agentId=${encodeURIComponent(agentId)}${workspaceId ? `&workspace=${encodeURIComponent(workspaceId)}` : ''}`
  const res = await fetch(`/api/agent/inspect${query}`)
  if (!res.ok) return null
  return res.json()
}
