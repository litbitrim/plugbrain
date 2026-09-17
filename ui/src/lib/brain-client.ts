/**
 * PlugBrain Core HTTP Client for Atlas V1.
 * Connects directly to PlugBrain-Core daemon endpoints.
 * Handles bearer token authentication and error states.
 */

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

export function getStoredToken(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('token')
    if (fromUrl) {
      localStorage.setItem(TOKEN_KEY, fromUrl)
      return fromUrl
    }
    return localStorage.getItem(TOKEN_KEY) || 'plug-atlas-test-token-20260917'
  } catch {
    return 'plug-atlas-test-token-20260917'
  }
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

export async function searchAgent(workspaceId: string, query: string, agentId = getStoredAgentId()): Promise<SearchHit[]> {
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
  lastHeartbeat: string
  heartbeatTtlMs: number
  presence: 'active' | 'idle' | 'dead'
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
    state: 'active' | 'idle' | 'dead'
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
