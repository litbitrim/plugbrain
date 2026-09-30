/** Shared contracts between the PlugBrain shell and its three views. */

/** One authoritative workspace snapshot, exactly as /api/atlas/snapshot returns it. */
export type Snapshot = {
  workspace: { id: string; name: string; canonicalPath: string }
  /** Moves only when the index publishes a new generation; the stable change signal. */
  indexGeneration?: number | string | null
  graph: { nodes: any[]; edges: any[] }
  coverage?: {
    /** The snapshot shows every file of the index (false = a sample of it). */
    complete: boolean
    /** Every file the index holds is indexed (false = the brain is behind). */
    indexComplete: boolean
    totalFiles: number
    shownFiles: number
    staleFiles: number
    truncated: boolean
    errors: string[]
  }
  updatedAt: string
}

/**
 * The trace-only Mesh projection returned by `/api/mesh`.
 *
 * These types deliberately contain no inferred process state. A worker has a
 * proof only when the trace supplied one, and an empty projection stays empty.
 */
export type MeshNodeKind = 'agent' | 'task' | 'worker' | 'worktree' | 'file' | 'artifact' | 'route'
export type MeshEdgeKind =
  | 'assigned' | 'leased' | 'claimed' | 'changed' | 'read'
  | 'produced' | 'prepared-for' | 'reviewed' | 'routed' | 'ran'
export type MeshProvenance = 'live' | 'recovered' | 'historical-import'
export type WorkerProof = 'process-started' | 'proof-unavailable' | 'finished'

export type MeshNode = {
  id: string
  kind: MeshNodeKind
  label: string
  firstSeen: string
  lastSeen: string
  provenance: MeshProvenance
  proof?: WorkerProof
  detail: Record<string, string | number | null>
  eventCount: number
}

export type MeshEdge = {
  id: string
  kind: MeshEdgeKind
  from: string
  to: string
  firstSeen: string
  lastSeen: string
  provenance: MeshProvenance
  evidence: string[]
  count: number
}

export type MeshSnapshot = {
  schema: 1
  workspaceId: string
  nodes: MeshNode[]
  edges: MeshEdge[]
  totals: Record<string, number>
  unprovenWorkers: Array<{ workerId: string; taskId: string | null; reason: string }>
  legend: Record<string, string>
}

export type MeshTimelineEntry = {
  eventId: string
  type: string
  occurredAt: string
  agentId: string | null
  taskId: string | null
  workerId: string | null
  fileRefs: string[]
  provenance: MeshProvenance
  summary: string
}

/** A PlugBoard ledger task, as /api/plugboard/tasks returns it. */
export type BoardTask = {
  id: string
  title?: string
  status: 'PLANNED' | 'RUNNING' | 'BLOCKED' | 'REVIEW' | 'REPAIR' | 'VERIFIED' | 'MERGED' | 'DONE'
  assignedAgentId?: string
  activeMissionId?: string
}

/** Which of the renderings or tools of the same brain is on screen. */
export type ViewId = 'briefing' | 'atlas' | 'notes' | 'explorer' | 'search' | 'packs' | 'city' | 'mesh' | 'queue' | 'turns' | 'hygiene' | 'disk' | 'durable' | 'plan'

export type SwarmWorker = {
  id: string; name: string; color: string; surface: string | null; account: string | null
  model: string | null; presence: string; lastHeartbeat: string | null; turnState: string | null
  turnStateAt: string | null; turnSummary: string | null; retired: boolean; unread: number
  silentMinutes?: number | null; attention?: string[]
  task: { id: string; title: string; body: string } | null
  leases: Array<{ id: string; taskId: string; paths: string[]; symbols: string[]; mode: 'write' | 'read'; createdAt: string; expiresAt: string }>
  worktrees: Array<{ path: string; branch: string | null; head: string | null; dirtyFiles: number | null; error: string | null }>
}
export type SwarmTurn = { id: string; agentId: string; taskId: string | null; startedAt: string; endedAt: string | null; state: string | null; summary: string | null }
export type SwarmMessage = { id: string; fromAgent: string; toAgent: string | null; subject: string; body: string; createdAt: string; deliveredAt: string | null; readAt: string | null }
export type SwarmApproval = { id: string; byAgent: string; agentId: string | null; subject: string; body: string; approvedAt: string; acknowledgedAt: string | null }
export type SwarmQueueTask = QueueTask & { body?: string; created_at?: string; claimed_at?: string }
export type SwarmSnapshot = {
  board: { agents: SwarmWorker[] }
  turns: SwarmTurn[]; historyAvailable: boolean; messages: SwarmMessage[]
  approvals: SwarmApproval[]; tasks: SwarmQueueTask[]
}

/** A row of the workspace queue, as the Brain reports it. */
export type QueueTask = {
  id: string
  title: string
  state: 'pending' | 'claimed' | 'delivered' | 'cancelled'
  addressed_to: string | null
  claimed_by: string | null
  claimed_at: string | null
  delivered_path: string | null
  /** A claim that has gone quiet. A reading, never a decision. */
  stale: boolean
}

/* ── UX-02 Contracts (ASK-01 & HYG-01) ────────────────────────────────── */

export type BriefingStats = {
  repos: number
  files: number
  symbols: number
  notes: number
  languages: Array<{ name: string; files: number }>
}

export type BriefingEntrypoint = {
  path: string
  why: string
}

export type BriefingRecentChange = {
  path: string
  when: string
  kind: string
}

export type BriefingHotspot = {
  path: string
  degree: number
}

export type BriefingData = {
  workspace: string
  name: string
  summary: string
  stats: BriefingStats
  entrypoints: BriefingEntrypoint[]
  recentChanges: BriefingRecentChange[]
  hotspots: BriefingHotspot[]
  unavailable?: string[]
}

export type AskIntent = 'definition' | 'usage' | 'impact' | 'changes' | 'overview' | 'notes' | 'search'

export type AskSource = {
  path: string
  line: number
  symbol?: string
  why?: string
}

export type AskResponse = {
  question: string
  intent: AskIntent
  answer: string
  sources: AskSource[]
  tool: string
  confidence: 'high' | 'medium' | 'low'
  followUps: string[]
  unavailable?: string[]
}

export type HygieneCheckout = {
  path: string
  repo: string
  branch: string
  dirtyFiles: number
  untrackedFiles: number
  stashes: number
  unpushed: Array<{ branch: string; ahead: number; upstream: string | null }>
  staleDays: number
  sizeMb: number
  orphan: boolean
  claims: Array<{ agent: string; paths: string[]; conflictsWith: string[] }>
}

export type HygieneFinding = {
  level: 'ok' | 'attention' | 'risk'
  text: string
  fix: string
  paths: string[]
}

export type HygieneData = {
  workspace: string
  checkedAt: string
  diskFreeGb: number
  summary: {
    level: 'ok' | 'attention' | 'risk'
    text: string
  }
  checkouts: HygieneCheckout[]
  findings: HygieneFinding[]
  unavailable?: string[]
}

export type MachineDrive = {
  mount: string
  freeGb: number
  totalGb: number
  level: 'ok' | 'attention' | 'risk'
}

export type MachineForecast = {
  mount: string
  fullInHours: number
  trendGbPerHour: number
  basis: string
}

export type MachineData = {
  checkedAt: string
  drives: MachineDrive[]
  pagefile?: { sizeGb: number }
  memory?: { freeGb: number; totalGb: number }
  cpu?: { load: number }
  forecast?: MachineForecast[]
  findings?: Array<{ level: 'ok' | 'attention' | 'risk'; text: string; fix?: string }>
  unavailable?: string[]
}

export type RepoInventory = {
  path: string
  registered: boolean
  branch: string
  dirtyFiles: number
  untrackedFiles: number
  unpushed: Array<{ branch: string; ahead: number; upstream: string | null }>
  worktrees: number
  orphanWorktrees: number
  stashes: number
  lastCommitDays: number
  gitSizeMb: number
  workTreeSizeMb: number
}

export type ReposData = {
  scannedAt: string
  roots: string[]
  complete: boolean
  repos: RepoInventory[]
  totals: {
    repos: number
    dirty: number
    unpushedBranches: number
    orphanWorktrees: number
  }
  unavailable?: string[]
}

/** Route not mounted: HTTP 404 or 501 only. */
export type RouteMissing = {
  routeMissing: true
}

/** Network-level failure (fetch threw — server unreachable, DNS, timeout). */
export type ApiNetworkError = {
  unreachable: true
  error: string
}

/** Server replied with a non-OK status that is not 404/501 (e.g. 500, 503). */
export type ApiServerError = {
  serverError: true
  status: number
  error: string
}

/** Union of all client-side error results from the five API wrappers. */
export type ApiError = RouteMissing | ApiNetworkError | ApiServerError
