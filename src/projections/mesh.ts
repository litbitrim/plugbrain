/**
 * Agent Mesh: who is doing what, to which files, for whom.
 *
 * Built ONLY from the append-only trace, so every node and edge is backed by
 * an authority-confirmed event with a provenance mode. There is no second
 * source and no inference from timestamps, file mtimes or registry rows.
 *
 * The honesty rule that shapes this whole module: a worker is `running` only
 * when a real `worker.started` event exists. A task assignment, a lease, a
 * heartbeat without a start, or a fleet row is NOT a running process, and a
 * worker in that state is reported as `proofUnavailable` with the reason. A
 * mesh that renders a registry entry as a live agent is worse than an empty
 * mesh, because it is confidently wrong.
 */
import type { DatabaseSync } from 'node:sqlite'
import { ensureTraceSchema, type ProvenanceMode } from '../trace.ts'

export type MeshNodeKind =
  | 'agent' | 'task' | 'worker' | 'worktree' | 'file' | 'artifact' | 'route'

export type MeshEdgeKind =
  | 'assigned'      // agent  -> task
  | 'leased'        // task   -> worktree
  | 'claimed'       // agent  -> file
  | 'changed'       // agent  -> file
  | 'read'          // agent  -> file
  | 'produced'      // worker -> artifact
  | 'prepared-for'  // agent  -> agent
  | 'reviewed'      // agent  -> task
  | 'routed'        // route  -> worker
  | 'ran'           // task   -> worker

/** What the trace can actually prove about a worker. */
export type WorkerProof =
  | 'process-started'     // a real worker.started event exists
  | 'proof-unavailable'   // referenced, but no start event was ever observed
  | 'finished'

export interface MeshNode {
  id: string
  kind: MeshNodeKind
  label: string
  /** First and last time this node was mentioned by an event. */
  firstSeen: string
  lastSeen: string
  /** Strongest provenance any contributing event carried. */
  provenance: ProvenanceMode
  /** Worker nodes only. */
  proof?: WorkerProof
  /** Free but BOUNDED facts a detail panel can show. */
  detail: Record<string, string | number | null>
  eventCount: number
}

export interface MeshEdge {
  id: string
  kind: MeshEdgeKind
  from: string
  to: string
  firstSeen: string
  lastSeen: string
  provenance: ProvenanceMode
  /** The events that justify this edge. Bounded. */
  evidence: string[]
  count: number
}

export interface MeshSnapshot {
  schema: 1
  workspaceId: string
  nodes: MeshNode[]
  edges: MeshEdge[]
  totals: Record<string, number>
  /** Workers referenced by the trace with no observed process start. */
  unprovenWorkers: Array<{ workerId: string; taskId: string | null; reason: string }>
  legend: Record<string, string>
}

export const MESH_LEGEND: Record<string, string> = {
  agent: 'an agent identity that appeared in an authority-confirmed event',
  task: 'a unit of work the Operator assigned',
  worker: 'a worker handle; running ONLY with an observed worker.started event',
  worktree: 'an isolated checkout leased to a task',
  file: 'a workspace-relative path referenced by an event',
  'prepared-for': 'agent A prepared work explicitly intended for agent B',
  'proof-unavailable': 'the worker was referenced but no process start was ever observed',
  provenance: 'live, recovered, or historical-import; imports are never shown as live',
}

const MAX_EVIDENCE = 8

interface EventRow {
  event_id: string; type: string; occurred_at: string
  agent_id: string | null; task_id: string | null; worker_id: string | null
  worktree_id: string | null; route_id: string | null; session_id: string | null
  file_refs: string; artifact_refs: string; receipt_refs: string
  payload: string; provenance_mode: string
}

const parseList = (raw: string): string[] => {
  try { const value = JSON.parse(raw) as unknown; return Array.isArray(value) ? value.map(String) : [] }
  catch { return [] }
}

/** live beats recovered beats historical-import. */
function strongest(a: ProvenanceMode, b: ProvenanceMode): ProvenanceMode {
  const rank: Record<ProvenanceMode, number> = {
    'live': 3, 'recovered': 2, 'historical-import': 1,
  }
  return rank[a] >= rank[b] ? a : b
}

class MeshBuilder {
  public readonly nodes = new Map<string, MeshNode>()
  public readonly edges = new Map<string, MeshEdge>()

  public node(
    kind: MeshNodeKind, rawId: string, label: string,
    at: string, provenance: ProvenanceMode, detail: Record<string, string | number | null> = {},
  ): string {
    const id = `${kind}:${rawId}`
    const existing = this.nodes.get(id)
    if (existing === undefined) {
      this.nodes.set(id, {
        id, kind, label, firstSeen: at, lastSeen: at,
        provenance, detail, eventCount: 1,
      })
      return id
    }
    if (at < existing.firstSeen) existing.firstSeen = at
    if (at > existing.lastSeen) existing.lastSeen = at
    existing.provenance = strongest(existing.provenance, provenance)
    existing.eventCount += 1
    for (const [key, value] of Object.entries(detail)) {
      if (existing.detail[key] === undefined || existing.detail[key] === null) existing.detail[key] = value
    }
    return id
  }

  public edge(
    kind: MeshEdgeKind, from: string, to: string,
    at: string, provenance: ProvenanceMode, eventId: string,
  ): void {
    const id = `${kind}:${from}=>${to}`
    const existing = this.edges.get(id)
    if (existing === undefined) {
      this.edges.set(id, {
        id, kind, from, to, firstSeen: at, lastSeen: at,
        provenance, evidence: [eventId], count: 1,
      })
      return
    }
    if (at < existing.firstSeen) existing.firstSeen = at
    if (at > existing.lastSeen) existing.lastSeen = at
    existing.provenance = strongest(existing.provenance, provenance)
    existing.count += 1
    if (existing.evidence.length < MAX_EVIDENCE) existing.evidence.push(eventId)
  }
}

/**
 * Fold the whole trace into a mesh.
 *
 * Events are read in the trace's own deterministic order, so the same events
 * in any arrival order build the same mesh.
 */
export function meshSnapshot(db: DatabaseSync, workspaceId: string): MeshSnapshot {
  ensureTraceSchema(db)
  const rows = db.prepare(
    `SELECT event_id, type, occurred_at, agent_id, task_id, worker_id, worktree_id,
            route_id, session_id, file_refs, artifact_refs, receipt_refs, payload, provenance_mode
       FROM trace_events WHERE workspace_id = ?
      ORDER BY occurred_at ASC, COALESCE(source_sequence, 0) ASC, event_id ASC`)
    .all(workspaceId) as unknown as EventRow[]

  const builder = new MeshBuilder()
  const startedWorkers = new Set<string>()
  const finishedWorkers = new Set<string>()
  const referencedWorkers = new Map<string, string | null>()

  for (const row of rows) {
    const at = row.occurred_at
    const mode = row.provenance_mode as ProvenanceMode
    const agent = row.agent_id === null ? null : builder.node('agent', row.agent_id, row.agent_id, at, mode)
    const task = row.task_id === null ? null : builder.node('task', row.task_id, row.task_id, at, mode)
    const worktree = row.worktree_id === null
      ? null : builder.node('worktree', row.worktree_id, row.worktree_id, at, mode)
    const route = row.route_id === null ? null : builder.node('route', row.route_id, row.route_id, at, mode)

    let worker: string | null = null
    if (row.worker_id !== null) {
      referencedWorkers.set(row.worker_id, row.task_id)
      if (row.type === 'worker.started') startedWorkers.add(row.worker_id)
      if (row.type === 'worker.completed' || row.type === 'worker.failed' || row.type === 'worker.cancelled') {
        finishedWorkers.add(row.worker_id)
      }
      worker = builder.node('worker', row.worker_id, row.worker_id, at, mode, {
        taskId: row.task_id, agentId: row.agent_id, sessionId: row.session_id,
      })
    }

    if (agent !== null && task !== null && row.type === 'task.assigned') {
      builder.edge('assigned', agent, task, at, mode, row.event_id)
    }
    if (task !== null && worktree !== null
      && (row.type === 'worktree.leased' || row.type === 'worktree.recovered')) {
      builder.edge('leased', task, worktree, at, mode, row.event_id)
    }
    if (task !== null && worker !== null) {
      builder.edge('ran', task, worker, at, mode, row.event_id)
    }
    if (route !== null && worker !== null) {
      builder.edge('routed', route, worker, at, mode, row.event_id)
    }
    if (agent !== null) {
      for (const path of parseList(row.file_refs)) {
        const file = builder.node('file', path, path, at, mode)
        if (row.type === 'file.claimed') builder.edge('claimed', agent, file, at, mode, row.event_id)
        else if (row.type === 'file.read') builder.edge('read', agent, file, at, mode, row.event_id)
        else if (row.type === 'file.changed' || row.type === 'file.renamed' || row.type === 'file.deleted') {
          builder.edge('changed', agent, file, at, mode, row.event_id)
        }
      }
    }
    if (worker !== null) {
      for (const artifact of parseList(row.artifact_refs)) {
        const node = builder.node('artifact', artifact, artifact, at, mode)
        builder.edge('produced', worker, node, at, mode, row.event_id)
      }
    }
    if (agent !== null && task !== null && row.type === 'review.completed') {
      builder.edge('reviewed', agent, task, at, mode, row.event_id)
    }
    // agent -> agent handoff: the target is named in the payload, never guessed.
    if (agent !== null && (row.type === 'work.prepared_for' || row.type === 'handoff.requested')) {
      try {
        const payload = JSON.parse(row.payload) as { targetAgentId?: unknown; forAgentId?: unknown }
        const target = payload.targetAgentId ?? payload.forAgentId
        if (typeof target === 'string' && target !== '') {
          const to = builder.node('agent', target, target, at, mode)
          builder.edge('prepared-for', agent, to, at, mode, row.event_id)
        }
      } catch { /* a handoff with no named target contributes no edge */ }
    }
  }

  // Worker honesty pass.
  const unprovenWorkers: MeshSnapshot['unprovenWorkers'] = []
  for (const [workerId, taskId] of referencedWorkers) {
    const node = builder.nodes.get(`worker:${workerId}`)
    if (node === undefined) continue
    if (finishedWorkers.has(workerId)) { node.proof = 'finished'; continue }
    if (startedWorkers.has(workerId)) { node.proof = 'process-started'; continue }
    node.proof = 'proof-unavailable'
    unprovenWorkers.push({
      workerId, taskId,
      reason: 'referenced by the trace but no worker.started event was ever observed; '
        + 'a registry entry is not a running process',
    })
  }

  const nodes = [...builder.nodes.values()].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  const edges = [...builder.edges.values()].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  const totals: Record<string, number> = { nodes: nodes.length, edges: edges.length }
  for (const node of nodes) totals[node.kind] = (totals[node.kind] ?? 0) + 1
  for (const edge of edges) totals[edge.kind] = (totals[edge.kind] ?? 0) + 1

  return { schema: 1, workspaceId, nodes, edges, totals, unprovenWorkers, legend: MESH_LEGEND }
}

export interface TimelineEntry {
  eventId: string
  type: string
  occurredAt: string
  agentId: string | null
  taskId: string | null
  workerId: string | null
  fileRefs: string[]
  provenance: ProvenanceMode
  summary: string
}

/** A bounded, ordered track for one agent, task or worker. */
export function meshTimeline(
  db: DatabaseSync,
  workspaceId: string,
  filter: { agentId?: string; taskId?: string; workerId?: string; limit?: number } = {},
): TimelineEntry[] {
  ensureTraceSchema(db)
  const where: string[] = ['workspace_id = ?']
  const params: unknown[] = [workspaceId]
  if (filter.agentId !== undefined) { where.push('agent_id = ?'); params.push(filter.agentId) }
  if (filter.taskId !== undefined) { where.push('task_id = ?'); params.push(filter.taskId) }
  if (filter.workerId !== undefined) { where.push('worker_id = ?'); params.push(filter.workerId) }
  const limit = Math.min(2000, Math.max(1, filter.limit ?? 200))

  return (db.prepare(
    `SELECT event_id, type, occurred_at, agent_id, task_id, worker_id,
            file_refs, payload, provenance_mode
       FROM trace_events WHERE ${where.join(' AND ')}
      ORDER BY occurred_at ASC, COALESCE(source_sequence, 0) ASC, event_id ASC
      LIMIT ?`).all(...params, limit) as unknown as Array<EventRow & { payload: string }>)
    .map(row => {
      let summary = row.type
      try {
        const payload = JSON.parse(row.payload) as { summary?: unknown }
        if (typeof payload.summary === 'string') summary = payload.summary.slice(0, 240)
      } catch { /* payload optional */ }
      return {
        eventId: row.event_id, type: row.type, occurredAt: row.occurred_at,
        agentId: row.agent_id, taskId: row.task_id, workerId: row.worker_id,
        fileRefs: parseList(row.file_refs),
        provenance: row.provenance_mode as ProvenanceMode,
        summary,
      }
    })
}
