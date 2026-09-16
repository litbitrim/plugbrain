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
