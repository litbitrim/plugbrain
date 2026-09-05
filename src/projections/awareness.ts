/**
 * The task awareness pack: what one agent must know about everybody else's
 * live work before it is allowed to start.
 *
 * This is the anti-collision surface. Without it two workers happily edit the
 * same file in two worktrees and discover it at merge time. With it, the
 * Operator can refuse, re-scope or serialise BEFORE spawning, and the reason
 * is a concrete list of task ids rather than a warning colour.
 *
 * Three properties make it usable rather than merely present:
 *
 *   BOUNDED.        A history dump is not awareness. Every section has a hard
 *                   cap and the whole pack has a character budget; what did not
 *                   fit is COUNTED, so a reader can tell "nothing else" from
 *                   "40 more you cannot see".
 *
 *   DETERMINISTIC.  Same database and same request produce a byte-identical
 *                   pack. Ranking is total - score, then a stable tiebreak -
 *                   so a receipt naming a pack version means something.
 *
 *   SECRET-FREE.    It is assembled only from the index and the already
 *                   redacted trace, and it is redacted again on the way out.
 *                   A pack is copied into a prompt, so it is the last place a
 *                   credential should be able to reach.
 */
import type { DatabaseSync } from 'node:sqlite'
import { createHash } from 'node:crypto'
import { redactText } from '../trace.ts'
import { evaluateClaim, liveClaims, moduleOf, pathOwnership, type ConflictVerdict } from './conflicts.ts'

export interface AwarenessLimits {
  /** Whole-pack character budget. Sections are filled in priority order. */
  maxChars?: number
  maxRelevantSymbols?: number
  maxFileClaims?: number
  maxRecentChanges?: number
  maxHandoffs?: number
  maxRelatedTasks?: number
}

const DEFAULTS: Required<AwarenessLimits> = {
  maxChars: 12_000,
  maxRelevantSymbols: 40,
  maxFileClaims: 40,
  maxRecentChanges: 30,
  maxHandoffs: 15,
  maxRelatedTasks: 20,
}

export interface RelevantSymbol {
  symbolId: number
  path: string
  name: string
  kind: string
  line: number
  /** Why this symbol is in the pack. Never decorative. */
  reason: string
}

export interface FileClaimView {
  path: string
  ownerAgentId: string | null
  taskId: string
  worktreeId: string | null
  mode: string
  state: 'live'
  claimedAt: string
  eventId: string
}

export interface RelatedTask {
  taskId: string
  agentId: string | null
  state: string
  dependencyRelation: 'same-file' | 'same-module' | 'handoff-upstream' | 'handoff-downstream'
}

export interface RecentChange {
  eventId: string
  agentId: string | null
  taskId: string | null
  type: string
  summary: string
  artifactRefs: string[]
  occurredAt: string
}

export interface AvailableHandoff {
  handoffId: string
  sourceAgentId: string | null
  sourceTaskId: string | null
  intendedTaskId: string | null
  artifactRefs: string[]
  state: 'requested' | 'accepted'
  occurredAt: string
}

export interface TaskAwarenessPack {
  schema: 1
  workspaceId: string
  /** The brain generation this pack describes. Belongs in the worker receipt. */
  brainGeneration: number
  taskId: string
  baselineCommit: string | null
  generatedAt: string
  /** Stable digest of the CONTENT. Two identical packs share it. */
  packDigest: string
  relevantSymbols: RelevantSymbol[]
  activeRelatedTasks: RelatedTask[]
  fileClaims: FileClaimView[]
  recentRelevantChanges: RecentChange[]
  availableHandoffs: AvailableHandoff[]
  collisionWarnings: string[]
  /** Paths this task must not write, because someone else holds them. */
  forbiddenPaths: string[]
  ownership: Array<{ path: string; agentId: string | null; at: string }>
  evidenceRefs: string[]
  /** What did not fit, per section. Absent counts are zero. */
  truncated: Record<string, number>
  /**
   * The conflict verdict, with its overlap lists CAPPED. The raw verdict is
   * unbounded by nature - one task touching a busy module can produce a
   * hundred soft overlaps - and embedding it whole let it eat the budget that
   * the claims and warnings needed.
   */
  verdict: BoundedVerdict
}

export interface BoundedVerdict {
  admissible: boolean
  hardConflicts: ConflictVerdict['hardConflicts']
  softOverlaps: ConflictVerdict['softOverlaps']
  readOnlyOverlaps: ConflictVerdict['readOnlyOverlaps']
  involvedTaskIds: string[]
  involvedAgentIds: string[]
  /** How many of each kind existed before capping. */
  counts: { hardConflicts: number; softOverlaps: number; readOnlyOverlaps: number }
}

export interface AwarenessRequest {
  workspaceId: string
  taskId: string
  agentId?: string
  /** Paths this task intends to touch. Drives relevance AND the verdict. */
  intendedPaths: readonly string[]
  mode?: 'write' | 'read'
  limits?: AwarenessLimits
  /** Fixed clock for deterministic output in tests and receipts. */
  now?: () => Date
}

interface SymbolRow {
  id: number; name: string; kind: string; line: number; path: string
}

/** Stable digest over the meaningful content, excluding the timestamp. */
function digestOf(pack: Omit<TaskAwarenessPack, 'packDigest' | 'generatedAt'>): string {
  return createHash('sha256').update(JSON.stringify(pack)).digest('hex').slice(0, 16)
}

/**
 * Build one task's awareness pack.
 *
 * Deterministic for a fixed database: every query is ordered, every list is
 * sliced after a total sort, and nothing samples or randomises.
 */
export function buildAwarenessPack(db: DatabaseSync, request: AwarenessRequest): TaskAwarenessPack {
  const limits = { ...DEFAULTS, ...(request.limits ?? {}) }
  const now = request.now ?? (() => new Date())
  const workspaceId = request.workspaceId
  const intended = [...new Set(request.intendedPaths)].sort()
  const intendedModules = new Set(intended.map(moduleOf))
  const truncated: Record<string, number> = {}

  const state = db.prepare(
    `SELECT generation, git_head FROM workspace_index_state WHERE workspace_id = ?`)
    .get(workspaceId) as { generation: number; git_head: string | null } | undefined

  // -- symbols in and around the intended paths -----------------------------
  const relevantSymbols: RelevantSymbol[] = []
  if (intended.length > 0) {
    const holes = intended.map(() => '?').join(',')
    const direct = db.prepare(
      `SELECT s.id, s.name, s.kind, s.line, f.path
         FROM symbols s JOIN files f ON f.id = s.file_id
        WHERE f.workspace_id = ? AND f.path IN (${holes}) AND s.exported = 1
        ORDER BY f.path ASC, s.line ASC`)
      .all(workspaceId, ...intended) as unknown as SymbolRow[]
    for (const row of direct) {
      relevantSymbols.push({
        symbolId: row.id, path: row.path, name: row.name, kind: row.kind, line: row.line,
        reason: 'exported by a file this task intends to touch',
      })
    }
    // Symbols that DEPEND on the intended files: changing them is what breaks
    // somebody else, so they belong in the pack more than siblings do.
    const dependants = db.prepare(
      `SELECT DISTINCT s.id, s.name, s.kind, s.line, f.path
         FROM edges e
         JOIN symbols s ON s.id = e.src_symbol
         JOIN files f ON f.id = s.file_id
        WHERE e.workspace_id = ? AND e.resolved = 1
          AND e.dst_symbol IN (
            SELECT s2.id FROM symbols s2 JOIN files f2 ON f2.id = s2.file_id
             WHERE f2.workspace_id = ? AND f2.path IN (${holes}))
        ORDER BY f.path ASC, s.line ASC`)
      .all(workspaceId, workspaceId, ...intended) as unknown as SymbolRow[]
    for (const row of dependants) {
      if (relevantSymbols.some(existing => existing.symbolId === row.id)) continue
      relevantSymbols.push({
        symbolId: row.id, path: row.path, name: row.name, kind: row.kind, line: row.line,
        reason: 'references a symbol defined in an intended path',
      })
    }
  }
  if (relevantSymbols.length > limits.maxRelevantSymbols) {
    truncated.relevantSymbols = relevantSymbols.length - limits.maxRelevantSymbols
    relevantSymbols.length = limits.maxRelevantSymbols
  }

  // -- live claims held by OTHER tasks --------------------------------------
  const verdict = evaluateClaim(db, workspaceId, {
    taskId: request.taskId,
    ...(request.agentId === undefined ? {} : { agentId: request.agentId }),
    paths: intended,
    mode: request.mode ?? 'write',
  })

  const claims = liveClaims(db, workspaceId)
    .filter(claim => claim.taskId !== request.taskId)
    .filter(claim => intended.includes(claim.path) || intendedModules.has(moduleOf(claim.path)))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : a.taskId < b.taskId ? -1 : 1))
  const fileClaims: FileClaimView[] = claims.slice(0, limits.maxFileClaims).map(claim => ({
    path: claim.path,
    ownerAgentId: claim.agentId,
    taskId: claim.taskId,
    worktreeId: claim.worktreeId,
    mode: claim.mode,
    state: 'live',
    claimedAt: claim.claimedAt,
    eventId: claim.eventId,
  }))
  if (claims.length > limits.maxFileClaims) truncated.fileClaims = claims.length - limits.maxFileClaims

  // -- related tasks, by why they are related -------------------------------
  const relatedMap = new Map<string, RelatedTask>()
  for (const overlap of [...verdict.hardConflicts, ...verdict.readOnlyOverlaps]) {
    relatedMap.set(overlap.holder.taskId, {
      taskId: overlap.holder.taskId, agentId: overlap.holder.agentId,
      state: 'live', dependencyRelation: 'same-file',
    })
  }
  for (const overlap of verdict.softOverlaps) {
    if (relatedMap.has(overlap.holder.taskId)) continue
    relatedMap.set(overlap.holder.taskId, {
      taskId: overlap.holder.taskId, agentId: overlap.holder.agentId,
      state: 'live', dependencyRelation: 'same-module',
    })
  }

  // -- handoffs prepared FOR this task --------------------------------------
  const handoffRows = db.prepare(
    `SELECT event_id, agent_id, task_id, artifact_refs, payload, type, occurred_at
       FROM trace_events
      WHERE workspace_id = ? AND type IN ('work.prepared_for','handoff.requested','handoff.accepted')
      ORDER BY occurred_at ASC, COALESCE(source_sequence, 0) ASC, event_id ASC`)
    .all(workspaceId) as unknown as Array<{
      event_id: string; agent_id: string | null; task_id: string | null
      artifact_refs: string; payload: string; type: string; occurred_at: string
    }>
  const availableHandoffs: AvailableHandoff[] = []
  for (const row of handoffRows) {
    let intendedTaskId: string | null = null
    try {
      const payload = JSON.parse(row.payload) as { intendedTaskId?: unknown; forTaskId?: unknown }
      const candidate = payload.intendedTaskId ?? payload.forTaskId
      if (typeof candidate === 'string') intendedTaskId = candidate
    } catch { /* payload is optional */ }
    if (intendedTaskId !== request.taskId) continue
    let artifactRefs: string[] = []
    try { artifactRefs = JSON.parse(row.artifact_refs) as string[] } catch { artifactRefs = [] }
    availableHandoffs.push({
      handoffId: row.event_id,
      sourceAgentId: row.agent_id,
      sourceTaskId: row.task_id,
      intendedTaskId,
      artifactRefs,
      state: row.type === 'handoff.accepted' ? 'accepted' : 'requested',
      occurredAt: row.occurred_at,
    })
    if (row.task_id !== null && !relatedMap.has(row.task_id)) {
      relatedMap.set(row.task_id, {
        taskId: row.task_id, agentId: row.agent_id,
        state: row.type === 'handoff.accepted' ? 'accepted' : 'requested',
        dependencyRelation: 'handoff-upstream',
      })
    }
  }
  if (availableHandoffs.length > limits.maxHandoffs) {
    truncated.availableHandoffs = availableHandoffs.length - limits.maxHandoffs
    availableHandoffs.length = limits.maxHandoffs
  }

  const activeRelatedTasks = [...relatedMap.values()]
    .sort((a, b) => (a.taskId < b.taskId ? -1 : a.taskId > b.taskId ? 1 : 0))
  if (activeRelatedTasks.length > limits.maxRelatedTasks) {
    truncated.activeRelatedTasks = activeRelatedTasks.length - limits.maxRelatedTasks
    activeRelatedTasks.length = limits.maxRelatedTasks
  }

  // -- recent changes that touch the intended paths or modules --------------
  const changeRows = db.prepare(
    `SELECT event_id, agent_id, task_id, type, file_refs, artifact_refs, payload, occurred_at
       FROM trace_events
      WHERE workspace_id = ?
        AND type IN ('file.changed','file.renamed','file.deleted','commit.created',
                     'test.completed','review.completed','artifact.created')
      ORDER BY occurred_at DESC, COALESCE(source_sequence, 0) DESC, event_id DESC
      LIMIT 500`)
    .all(workspaceId) as unknown as Array<{
      event_id: string; agent_id: string | null; task_id: string | null; type: string
      file_refs: string; artifact_refs: string; payload: string; occurred_at: string
    }>
  const recentRelevantChanges: RecentChange[] = []
  let changeOverflow = 0
  for (const row of changeRows) {
    if (row.task_id === request.taskId) continue
    let files: string[] = []
    try { files = JSON.parse(row.file_refs) as string[] } catch { files = [] }
    const relevant = files.length === 0
      ? row.type === 'commit.created'
      : files.some(path => intended.includes(path) || intendedModules.has(moduleOf(path)))
    if (!relevant) continue
    if (recentRelevantChanges.length >= limits.maxRecentChanges) { changeOverflow += 1; continue }
    let summary = row.type
    try {
      const payload = JSON.parse(row.payload) as { summary?: unknown }
      if (typeof payload.summary === 'string') summary = payload.summary.slice(0, 240)
    } catch { /* payload optional */ }
    let artifactRefs: string[] = []
    try { artifactRefs = JSON.parse(row.artifact_refs) as string[] } catch { artifactRefs = [] }
    recentRelevantChanges.push({
      eventId: row.event_id, agentId: row.agent_id, taskId: row.task_id,
      type: row.type, summary: redactText(summary), artifactRefs, occurredAt: row.occurred_at,
    })
  }
  if (changeOverflow > 0) truncated.recentRelevantChanges = changeOverflow

  // -- ownership of the intended paths --------------------------------------
  const ownership = pathOwnership(db, workspaceId, intended)
    .map(row => ({ path: row.path, agentId: row.agentId, at: row.at }))

  // Hard conflicts are never capped: they are the reason the pack exists and
  // each one names a path this task must not write. The advisory kinds are.
  const SOFT_CAP = 12
  const READ_CAP = 12
  const collisionWarnings = [
    ...verdict.hardConflicts.map(overlap => `HARD: ${overlap.reason}`),
    ...verdict.softOverlaps.slice(0, SOFT_CAP).map(overlap => `SOFT: ${overlap.reason}`),
    ...verdict.readOnlyOverlaps.slice(0, READ_CAP).map(overlap => `READ: ${overlap.reason}`),
  ]
  if (verdict.softOverlaps.length > SOFT_CAP) {
    truncated.softOverlaps = verdict.softOverlaps.length - SOFT_CAP
  }
  if (verdict.readOnlyOverlaps.length > READ_CAP) {
    truncated.readOnlyOverlaps = verdict.readOnlyOverlaps.length - READ_CAP
  }
  const boundedVerdict: BoundedVerdict = {
    admissible: verdict.admissible,
    hardConflicts: verdict.hardConflicts,
    softOverlaps: verdict.softOverlaps.slice(0, SOFT_CAP),
    readOnlyOverlaps: verdict.readOnlyOverlaps.slice(0, READ_CAP),
    involvedTaskIds: verdict.involvedTaskIds.slice(0, 50),
    involvedAgentIds: verdict.involvedAgentIds.slice(0, 50),
    counts: {
      hardConflicts: verdict.hardConflicts.length,
      softOverlaps: verdict.softOverlaps.length,
      readOnlyOverlaps: verdict.readOnlyOverlaps.length,
    },
  }
  const forbiddenPaths = [...new Set(verdict.hardConflicts.map(overlap => overlap.path))].sort()

  const evidenceRefs = [...new Set([
    ...fileClaims.map(claim => `trace:${claim.eventId}`),
    ...recentRelevantChanges.map(change => `trace:${change.eventId}`),
    ...availableHandoffs.map(handoff => `trace:${handoff.handoffId}`),
    ...(state === undefined ? [] : [`brain:generation:${state.generation}`]),
  ])].sort()

  const core = {
    schema: 1 as const,
    workspaceId,
    brainGeneration: state?.generation ?? 0,
    taskId: request.taskId,
    baselineCommit: state?.git_head ?? null,
    relevantSymbols, activeRelatedTasks, fileClaims,
    recentRelevantChanges, availableHandoffs,
    collisionWarnings, forbiddenPaths, ownership, evidenceRefs,
    truncated, verdict: boundedVerdict,
  }
  const pack: TaskAwarenessPack = {
    ...core,
    generatedAt: now().toISOString(),
    packDigest: digestOf(core),
  }
  return enforceBudget(pack, limits.maxChars)
}

/**
 * Trim to the character budget, cheapest sections first.
 *
 * Order matters: a collision warning is why the pack exists, so it is the last
 * thing dropped. Whatever is removed is counted in `truncated`, so a reader is
 * never silently shown a partial picture.
 */
function enforceBudget(pack: TaskAwarenessPack, maxChars: number): TaskAwarenessPack {
  const size = (value: unknown): number => JSON.stringify(value).length
  const order: Array<keyof TaskAwarenessPack> = [
    'recentRelevantChanges', 'relevantSymbols', 'availableHandoffs',
    'activeRelatedTasks', 'fileClaims',
  ]
  for (const key of order) {
    if (size(pack) <= maxChars) break
    const list = pack[key] as unknown[]
    while (list.length > 0 && size(pack) > maxChars) {
      list.pop()
      pack.truncated[key] = (pack.truncated[key] ?? 0) + 1
    }
  }
  return pack
}

/**
 * The seam the Operator calls before a native spawn.
 *
 * Deliberately a plain function type rather than a class: the Operator owns the
 * decision, Brain only supplies the facts. A `false` here is advice backed by
 * named task ids, not an enforcement point - enforcement belongs to whoever
 * owns the lease.
 */
export type AwarenessPort = (request: AwarenessRequest) => TaskAwarenessPack

export function createAwarenessPort(db: DatabaseSync): AwarenessPort {
  return (request: AwarenessRequest) => buildAwarenessPack(db, request)
}
