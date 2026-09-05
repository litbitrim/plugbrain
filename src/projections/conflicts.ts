/**
 * Path conflict and ownership gates.
 *
 * PlugBrain does not own leases - the Operator and `@plug/work` do. What Brain
 * owns is the ANSWER to "would this edit collide with work someone else is
 * already doing", derived entirely from the append-only trace. That answer has
 * to exist before a spawn, not after a merge conflict.
 *
 * Three degrees of collision, deliberately distinct, because collapsing them
 * into one boolean is what makes a conflict warning useless:
 *
 *   hard-conflict      another live task is WRITING a path this request wants
 *                      to write. Serialise, re-scope, or hand the claim over.
 *   soft-overlap       another live task is writing a DIFFERENT path in the
 *                      same module. Not blocking, but the two will meet in
 *                      review, so both sides should know.
 *   read-only-overlap  another live task has only READ a path this request
 *                      wants to write. Informational: their context pack is
 *                      about to go stale.
 *
 * A claim is never invented. It exists because an authority-confirmed
 * `file.claimed` event exists, and it stops existing because a terminal worker
 * or integration event for the same task exists.
 */
import type { DatabaseSync } from 'node:sqlite'
import { ensureTraceSchema } from '../trace.ts'

export type OverlapKind = 'hard-conflict' | 'soft-overlap' | 'read-only-overlap'

/** Claim modes an authority may report. */
export type ClaimMode = 'write' | 'read'

export interface LiveClaim {
  taskId: string
  agentId: string | null
  workerId: string | null
  worktreeId: string | null
  path: string
  mode: ClaimMode
  /** The event that opened this claim. */
  eventId: string
  claimedAt: string
}

export interface Overlap {
  kind: OverlapKind
  path: string
  /** The requested path that collided. Equal to `path` for file-level hits. */
  requestedPath: string
  holder: LiveClaim
  /** Plain words for a UI. Never a bare boolean. */
  reason: string
}

export interface ClaimRequest {
  taskId: string
  agentId?: string
  worktreeId?: string
  /** Workspace-relative paths this task intends to touch. */
  paths: readonly string[]
  mode: ClaimMode
}

export interface ConflictVerdict {
  /** True when nothing blocks the request. Soft and read-only do NOT block. */
  admissible: boolean
  hardConflicts: Overlap[]
  softOverlaps: Overlap[]
  readOnlyOverlaps: Overlap[]
  /** Every task id involved, for a UI that must name who is in the way. */
  involvedTaskIds: string[]
  involvedAgentIds: string[]
}

/** Terminal events that release everything a task or worker held. */
const RELEASING_TYPES = [
  'worker.completed', 'worker.failed', 'worker.cancelled',
  'integration.accepted', 'integration.rejected',
]

/** The module a path belongs to: its directory. */
export function moduleOf(path: string): string {
  const slash = path.lastIndexOf('/')
  return slash === -1 ? '' : path.slice(0, slash)
}

interface ClaimRow {
  event_id: string
  task_id: string | null
  agent_id: string | null
  worker_id: string | null
  worktree_id: string | null
  file_refs: string
  payload: string
  occurred_at: string
}

/**
 * Every claim still held in this workspace.
 *
 * Derived, never stored: a claim opened by `file.claimed` is live until a
 * terminal event for its task or worker appears. Deriving it means a replayed
 * or out-of-order trace produces the same answer as a live one.
 */
export function liveClaims(db: DatabaseSync, workspaceId: string): LiveClaim[] {
  ensureTraceSchema(db)

  // Tasks and workers that have finished. Their claims are gone.
  const releasedTasks = new Set<string>()
  const releasedWorkers = new Set<string>()
  for (const row of db.prepare(
    `SELECT task_id, worker_id FROM trace_events
      WHERE workspace_id = ? AND type IN (${RELEASING_TYPES.map(() => '?').join(',')})`)
    .all(workspaceId, ...RELEASING_TYPES) as unknown as Array<{ task_id: string | null; worker_id: string | null }>) {
    if (row.task_id !== null) releasedTasks.add(row.task_id)
    if (row.worker_id !== null) releasedWorkers.add(row.worker_id)
  }

  const rows = db.prepare(
    `SELECT event_id, task_id, agent_id, worker_id, worktree_id, file_refs, payload, occurred_at
       FROM trace_events
      WHERE workspace_id = ? AND type = 'file.claimed'
      ORDER BY occurred_at ASC, COALESCE(source_sequence, 0) ASC, event_id ASC`)
    .all(workspaceId) as unknown as ClaimRow[]

  const claims: LiveClaim[] = []
  for (const row of rows) {
    if (row.task_id === null) continue                       // a claim with no task owns nothing
    if (releasedTasks.has(row.task_id)) continue
    if (row.worker_id !== null && releasedWorkers.has(row.worker_id)) continue
    let paths: string[] = []
    try { paths = JSON.parse(row.file_refs) as string[] } catch { paths = [] }
    let mode: ClaimMode = 'write'
    try {
      const payload = JSON.parse(row.payload) as { mode?: unknown }
      if (payload.mode === 'read') mode = 'read'
    } catch { /* default write: the safer assumption for a claim */ }
    for (const path of paths) {
      claims.push({
        taskId: row.task_id,
        agentId: row.agent_id,
        workerId: row.worker_id,
        worktreeId: row.worktree_id,
        path,
        mode,
        eventId: row.event_id,
        claimedAt: row.occurred_at,
      })
    }
  }
  return claims
}

/**
 * Would this request collide with live work?
 *
 * Only a WRITE request can be blocked. A read request never blocks, because
 * reading a file somebody else is editing is a staleness problem, not a
 * correctness one - and the awareness pack is where that is reported.
 */
export function evaluateClaim(
  db: DatabaseSync,
  workspaceId: string,
  request: ClaimRequest,
): ConflictVerdict {
  const held = liveClaims(db, workspaceId).filter(claim => claim.taskId !== request.taskId)
  const wanted = new Set(request.paths)
  const wantedModules = new Set([...wanted].map(moduleOf))

  const hardConflicts: Overlap[] = []
  const softOverlaps: Overlap[] = []
  const readOnlyOverlaps: Overlap[] = []

  for (const claim of held) {
    if (wanted.has(claim.path)) {
      if (request.mode === 'write' && claim.mode === 'write') {
        hardConflicts.push({
          kind: 'hard-conflict', path: claim.path, requestedPath: claim.path, holder: claim,
          reason: `task ${claim.taskId} is already writing ${claim.path}`
            + (claim.worktreeId === null ? '' : ` in worktree ${claim.worktreeId}`),
        })
        continue
      }
      if (claim.mode === 'read') {
        readOnlyOverlaps.push({
          kind: 'read-only-overlap', path: claim.path, requestedPath: claim.path, holder: claim,
          reason: `task ${claim.taskId} has read ${claim.path}; its context goes stale if this write lands`,
        })
        continue
      }
      // request.mode === 'read' against a live writer.
      readOnlyOverlaps.push({
        kind: 'read-only-overlap', path: claim.path, requestedPath: claim.path, holder: claim,
        reason: `task ${claim.taskId} is writing ${claim.path}; reading it now may capture a half-finished state`,
      })
      continue
    }
    if (claim.mode === 'write' && wantedModules.has(moduleOf(claim.path))) {
      const requested = [...wanted].find(path => moduleOf(path) === moduleOf(claim.path)) ?? claim.path
      softOverlaps.push({
        kind: 'soft-overlap', path: claim.path, requestedPath: requested, holder: claim,
        reason: `task ${claim.taskId} is writing ${claim.path} in the same module`
          + ` (${moduleOf(claim.path) === '' ? 'repository root' : moduleOf(claim.path)})`,
      })
    }
  }

  const all = [...hardConflicts, ...softOverlaps, ...readOnlyOverlaps]
  const involvedTaskIds = [...new Set(all.map(overlap => overlap.holder.taskId))].sort()
  const involvedAgentIds = [...new Set(
    all.map(overlap => overlap.holder.agentId).filter((id): id is string => id !== null))].sort()

  return {
    // Only a hard conflict blocks. A soft overlap that blocked would stop all
    // parallel work in a module, which is the whole point of worktrees.
    admissible: hardConflicts.length === 0,
    hardConflicts, softOverlaps, readOnlyOverlaps,
    involvedTaskIds, involvedAgentIds,
  }
}

export interface PathOwnership {
  path: string
  agentId: string | null
  action: string
  at: string
}

/**
 * Who last wrote each path, from the index's own attribution.
 *
 * This reads `path_owner`, not `file_owner`, deliberately: `file_owner` is
 * keyed by a file row id that a rebuild can recreate, while `path_owner` is
 * what survives one. A renamed file carries its owner to the new path because
 * the indexer moves the row rather than replacing it.
 */
export function pathOwnership(
  db: DatabaseSync,
  workspaceId: string,
  paths?: readonly string[],
): PathOwnership[] {
  if (paths !== undefined && paths.length === 0) return []
  const filter = paths === undefined ? '' : ` AND path IN (${paths.map(() => '?').join(',')})`
  return db.prepare(
    `SELECT path, agent_id AS agentId, action, at FROM path_owner
      WHERE workspace_id = ?${filter} ORDER BY path`)
    .all(workspaceId, ...(paths ?? [])) as unknown as PathOwnership[]
}
