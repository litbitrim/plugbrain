/** Shared contracts between the PlugBrain shell and its three views. */

/** One authoritative workspace snapshot, exactly as /api/atlas/snapshot returns it. */
export type Snapshot = {
  workspace: { id: string; name: string; canonicalPath: string }
  graph: { nodes: any[]; edges: any[] }
  coverage?: { complete: boolean; truncated: boolean; errors: string[] }
  updatedAt: string
}

/** A PlugBoard ledger task, as /api/plugboard/tasks returns it. */
export type BoardTask = {
  id: string
  title?: string
  status: 'PLANNED' | 'RUNNING' | 'BLOCKED' | 'REVIEW' | 'REPAIR' | 'VERIFIED' | 'MERGED' | 'DONE'
  assignedAgentId?: string
  activeMissionId?: string
}

/** Which of the three renderings of the same brain is on screen. */
export type ViewId = 'atlas' | 'city' | 'mesh' | 'queue'

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
