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
export type ViewId = 'atlas' | 'notes' | 'explorer' | 'search' | 'packs' | 'city' | 'mesh' | 'queue' | 'roadmap'

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
