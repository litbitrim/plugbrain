/**
 * Leases, claims and fencing epochs (M4).
 * Enforces mutual exclusion on workspace paths and symbols with TTL and liveness checks.
 */
import { randomUUID } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { requireAgent, requireWorkspace } from '../access.ts'
import { ingestTraceEvents } from '../trace.ts'
import { coordEvents } from './events.ts'
import { isAgentDead, getAgentPresence } from './registry.ts'
import type { AcquireLeaseResult, Lease } from './types.ts'

export class FencingError extends Error {
  readonly leaseId?: string
  readonly epoch?: number

  constructor(message: string, leaseId?: string, epoch?: number) {
    super(message)
    this.name = 'FencingError'
    this.leaseId = leaseId
    this.epoch = epoch
  }
}

export class ClaimConflictError extends Error {
  readonly conflict: NonNullable<AcquireLeaseResult['conflict']>

  constructor(conflict: NonNullable<AcquireLeaseResult['conflict']>) {
    super(conflict.reason)
    this.name = 'ClaimConflictError'
    this.conflict = conflict
  }
}

interface LeaseDbRow {
  id: string
  workspace_id: string
  agent_id: string
  task_id: string
  paths_json: string
  symbols_json: string
  mode: string
  epoch: number
  created_at: string
  expires_at: string
  released_at: string | null
  ttl_ms: number
}

/**
 * A path fence is logical within one repository, not merely a spelling on
 * disk. Two linked worktrees have different `Code/...` prefixes but the same
 * repository-relative file. The index supplies that identity when available;
 * an unindexed/plain workspace safely falls back to its workspace path.
 */
function fenceKey(db: DatabaseSync, workspaceId: string, path: string): string {
  const normalized = path.split('\\').join('/').replace(/^\/+/, '')
  try {
    const row = db.prepare(`SELECT f.repo_id AS repoId, c.rel_prefix AS relPrefix
        FROM files f LEFT JOIN checkouts c ON c.id = f.checkout_id
        WHERE f.workspace_id = ? AND f.path = ?`).get(workspaceId, normalized) as
      { repoId: string | null; relPrefix: string | null } | undefined
    if (row?.repoId && row.relPrefix && normalized.startsWith(row.relPrefix + '/')) {
      return `repo:${row.repoId}:${normalized.slice(row.relPrefix.length + 1)}`
    }
  } catch { /* a legacy store without planet tables remains path-scoped */ }
  return `path:${normalized}`
}

function sameFencePath(db: DatabaseSync, workspaceId: string, left: string, right: string): boolean {
  return fenceKey(db, workspaceId, left) === fenceKey(db, workspaceId, right)
}

const LEASE_SCHEMA = `
CREATE TABLE IF NOT EXISTS leases (
  id           TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  agent_id     TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  task_id      TEXT NOT NULL,
  paths_json   TEXT NOT NULL,
  symbols_json TEXT NOT NULL DEFAULT '[]',
  mode         TEXT NOT NULL DEFAULT 'write',
  epoch        INTEGER NOT NULL,
  created_at   TEXT NOT NULL,
  expires_at   TEXT NOT NULL,
  released_at  TEXT,
  ttl_ms       INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leases_ws ON leases(workspace_id, released_at);
CREATE INDEX IF NOT EXISTS idx_leases_agent ON leases(agent_id);
`

export function ensureLeaseSchema(db: DatabaseSync): void {
  db.exec(LEASE_SCHEMA)
}

function parseLease(row: LeaseDbRow): Lease {
  let paths: string[] = []
  let symbols: string[] = []
  try { paths = JSON.parse(row.paths_json) } catch { paths = [] }
  try { symbols = JSON.parse(row.symbols_json) } catch { symbols = [] }
  const isExpired = Date.now() > Date.parse(row.expires_at)

  return {
    id: row.id,
    workspaceId: row.workspace_id,
    agentId: row.agent_id,
    taskId: row.task_id,
    paths,
    symbols,
    mode: row.mode === 'read' ? 'read' : 'write',
    epoch: row.epoch,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
    releasedAt: row.released_at,
    ttlMs: row.ttl_ms,
    isExpired,
  }
}

export interface AcquireLeaseInput {
  agentId: string
  taskId: string
  paths?: string[]
  symbols?: string[]
  mode?: 'write' | 'read'
  ttlMs?: number
}

export function acquireLease(
  db: DatabaseSync,
  workspaceId: string,
  input: AcquireLeaseInput,
): AcquireLeaseResult {
  ensureLeaseSchema(db)
  requireWorkspace(db, workspaceId)
  requireAgent(db, input.agentId)

  const paths = (input.paths ?? []).map(p => p.split('\\').join('/').replace(/^\/+/, ''))
  const symbols = input.symbols ?? []
  const mode = input.mode ?? 'write'
  const ttlMs = input.ttlMs && input.ttlMs > 0 ? input.ttlMs : 60000
  const nowMs = Date.now()
  const nowIso = new Date(nowMs).toISOString()

  db.exec('BEGIN IMMEDIATE')
  try {
    // Find all active unexpired leases in this workspace
    const activeRows = db.prepare(`
      SELECT * FROM leases
       WHERE workspace_id = ?
         AND released_at IS NULL
         AND expires_at > ?
    `).all(workspaceId, nowIso) as unknown as LeaseDbRow[]

    for (const row of activeRows) {
      // If held by the same agent and same task, it is re-entrant
      if (row.agent_id === input.agentId && row.task_id === input.taskId) {
        continue
      }

      // Check if holder agent is dead
      if (isAgentDead(db, row.agent_id)) {
        // Dead agent does not block: auto-release its dead lease
        db.prepare('UPDATE leases SET released_at = ? WHERE id = ?').run(nowIso, row.id)
        continue
      }

      let heldPaths: string[] = []
      let heldSymbols: string[] = []
      try { heldPaths = JSON.parse(row.paths_json) } catch { heldPaths = [] }
      try { heldSymbols = JSON.parse(row.symbols_json) } catch { heldSymbols = [] }

      // Check path conflicts
      for (const p of paths) {
        if (heldPaths.some(held => sameFencePath(db, workspaceId, held, p))) {
          const presences = getAgentPresence(db, { agentId: row.agent_id })
          const holderHb = presences[0]?.lastHeartbeat ?? row.created_at
          db.exec('COMMIT')
          return {
            acquired: false,
            conflict: {
              holder: {
                agentId: row.agent_id,
                taskId: row.task_id,
                claimedAt: row.created_at,
                lastHeartbeat: holderHb,
              },
              path: p,
              reason: `path '${p}' is held by agent '${row.agent_id}' for task '${row.task_id}' since ${row.created_at}`,
            },
          }
        }
      }

      // Check symbol conflicts
      for (const s of symbols) {
        if (heldSymbols.includes(s)) {
          const presences = getAgentPresence(db, { agentId: row.agent_id })
          const holderHb = presences[0]?.lastHeartbeat ?? row.created_at
          db.exec('COMMIT')
          return {
            acquired: false,
            conflict: {
              holder: {
                agentId: row.agent_id,
                taskId: row.task_id,
                claimedAt: row.created_at,
                lastHeartbeat: holderHb,
              },
              symbol: s,
              reason: `symbol '${s}' is held by agent '${row.agent_id}' for task '${row.task_id}' since ${row.created_at}`,
            },
          }
        }
      }
    }

    // No conflict: increment epoch and create lease
    const epochRow = db.prepare(
      'SELECT COALESCE(MAX(epoch), 0) + 1 AS next_epoch FROM leases WHERE workspace_id = ?',
    ).get(workspaceId) as { next_epoch: number }
    const epoch = Number(epochRow.next_epoch)

    const leaseId = `lease-${randomUUID().slice(0, 12)}`
    const expiresAt = new Date(nowMs + ttlMs).toISOString()

    db.prepare(`
      INSERT INTO leases (id, workspace_id, agent_id, task_id, paths_json, symbols_json, mode, epoch, created_at, expires_at, released_at, ttl_ms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)
    `).run(
      leaseId,
      workspaceId,
      input.agentId,
      input.taskId,
      JSON.stringify(paths),
      JSON.stringify(symbols),
      mode,
      epoch,
      nowIso,
      expiresAt,
      ttlMs,
    )

    const lease: Lease = {
      id: leaseId,
      workspaceId,
      agentId: input.agentId,
      taskId: input.taskId,
      paths,
      symbols,
      mode,
      epoch,
      createdAt: nowIso,
      expiresAt,
      releasedAt: null,
      ttlMs,
      isExpired: false,
    }

    db.exec('COMMIT')

    // Ingest trace event for chronicle consistency (outside transaction)
    if (paths.length > 0) {
      try {
        ingestTraceEvents(db, [{
          schema: 1,
          eventId: `evt-claim-${leaseId}`,
          source: 'brain',
          runtimeInstanceId: 'coord-leases',
          workspaceId,
          taskId: input.taskId,
          agentId: input.agentId,
          type: 'file.claimed',
          occurredAt: nowIso,
          observedAt: nowIso,
          fileRefs: paths,
          payload: { leaseId, epoch, mode, ttlMs, expiresAt },
          provenance: { mode: 'live', authorityRef: 'brain:acquireLease', confidence: 'authoritative' },
        }])
      } catch {
        // Trace event ingestion non-blocking
      }
    }

    coordEvents.emitLive('claim.acquired', lease)
    return { acquired: true, lease }
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

export interface ReleaseLeaseInput {
  leaseId?: string
  agentId: string
  workspaceId?: string
  taskId?: string
  paths?: string[]
}

export function releaseLease(db: DatabaseSync, input: ReleaseLeaseInput): { released: boolean; count: number } {
  ensureLeaseSchema(db)
  requireAgent(db, input.agentId)

  const nowIso = new Date().toISOString()
  let count = 0

  if (input.leaseId) {
    const row = db.prepare('SELECT * FROM leases WHERE id = ?').get(input.leaseId) as LeaseDbRow | undefined
    if (!row) return { released: false, count: 0 }
    if (row.agent_id !== input.agentId) {
      throw new Error(`lease ${input.leaseId} belongs to ${row.agent_id}, not ${input.agentId}`)
    }
    const res = db.prepare('UPDATE leases SET released_at = ? WHERE id = ? AND released_at IS NULL').run(nowIso, input.leaseId)
    count = Number(res.changes)
    if (count > 0) {
      try {
        ingestTraceEvents(db, [{
          schema: 1,
          eventId: `evt-release-${input.leaseId}-${Date.now()}`,
          source: 'brain',
          runtimeInstanceId: 'coord-leases',
          workspaceId: row.workspace_id,
          taskId: row.task_id,
          agentId: input.agentId,
          type: 'worker.completed',
          occurredAt: nowIso,
          observedAt: nowIso,
          fileRefs: JSON.parse(row.paths_json || '[]'),
          payload: { leaseId: input.leaseId },
          provenance: { mode: 'live', authorityRef: 'brain:releaseLease', confidence: 'authoritative' },
        }])
      } catch {}
      coordEvents.emitLive('claim.released', { leaseId: input.leaseId, agentId: input.agentId, releasedAt: nowIso })
    }
    return { released: count > 0, count }
  }

  // Release by agentId and optionally workspaceId or taskId
  let querySql = 'SELECT * FROM leases WHERE agent_id = ? AND released_at IS NULL'
  const queryParams: unknown[] = [input.agentId]
  if (input.workspaceId) {
    querySql += ' AND workspace_id = ?'
    queryParams.push(input.workspaceId)
  }
  if (input.taskId) {
    querySql += ' AND task_id = ?'
    queryParams.push(input.taskId)
  }
  const matching = db.prepare(querySql).all(...queryParams) as unknown as LeaseDbRow[]

  let sql = 'UPDATE leases SET released_at = ? WHERE agent_id = ? AND released_at IS NULL'
  const params: unknown[] = [nowIso, input.agentId]
  if (input.workspaceId) {
    sql += ' AND workspace_id = ?'
    params.push(input.workspaceId)
  }
  if (input.taskId) {
    sql += ' AND task_id = ?'
    params.push(input.taskId)
  }

  const res = db.prepare(sql).run(...params)
  count = Number(res.changes)
  if (count > 0) {
    for (const lease of matching) {
      try {
        ingestTraceEvents(db, [{
          schema: 1,
          eventId: `evt-release-${lease.id}-${Date.now()}`,
          source: 'brain',
          runtimeInstanceId: 'coord-leases',
          workspaceId: lease.workspace_id,
          taskId: lease.task_id,
          agentId: input.agentId,
          type: 'worker.completed',
          occurredAt: nowIso,
          observedAt: nowIso,
          fileRefs: JSON.parse(lease.paths_json || '[]'),
          payload: { leaseId: lease.id, taskId: lease.task_id },
          provenance: { mode: 'live', authorityRef: 'brain:releaseLease', confidence: 'authoritative' },
        }])
      } catch {}
    }
    coordEvents.emitLive('claim.released', { agentId: input.agentId, taskId: input.taskId, releasedAt: nowIso, count })
  }
  return { released: count > 0, count }
}

export function checkWriteFencing(
  db: DatabaseSync,
  workspaceId: string,
  agentId: string,
  relPath: string,
  options?: { leaseId?: string; epoch?: number; taskId?: string },
): void {
  ensureLeaseSchema(db)
  const normPath = relPath.split('\\').join('/').replace(/^\/+/, '')
  const nowMs = Date.now()
  const nowIso = new Date(nowMs).toISOString()

  // 1. If explicit leaseId is provided, check fencing validity
  if (options?.leaseId) {
    const row = db.prepare('SELECT * FROM leases WHERE id = ?').get(options.leaseId) as LeaseDbRow | undefined
    if (!row) {
      throw new FencingError(`fencing violation: unknown lease '${options.leaseId}'`, options.leaseId)
    }
    if (row.agent_id !== agentId) {
      throw new FencingError(`fencing violation: lease '${options.leaseId}' belongs to '${row.agent_id}', not '${agentId}'`, options.leaseId)
    }
    if (row.workspace_id !== workspaceId) {
      throw new FencingError(`fencing violation: lease '${options.leaseId}' belongs to another workspace`, options.leaseId)
    }
    if (options.taskId !== undefined && row.task_id !== options.taskId) {
      throw new FencingError(`fencing violation: lease '${options.leaseId}' belongs to task '${row.task_id}', not '${options.taskId}'`, options.leaseId)
    }
    if (row.released_at !== null) {
      throw new FencingError(`fencing violation: lease '${options.leaseId}' was already released at ${row.released_at}`, options.leaseId)
    }
    if (nowMs > Date.parse(row.expires_at)) {
      throw new FencingError(`fencing violation: lease '${options.leaseId}' expired at ${row.expires_at} (current time: ${nowIso})`, options.leaseId)
    }
    if (options.epoch !== undefined && options.epoch !== row.epoch) {
      throw new FencingError(`fencing violation: epoch mismatch (expected ${row.epoch}, received ${options.epoch})`, options.leaseId, row.epoch)
    }
    let leasedPaths: string[] = []
    try { leasedPaths = JSON.parse(row.paths_json) as string[] } catch { /* invalid persisted lease is never a write permit */ }
    if (!leasedPaths.some(held => sameFencePath(db, workspaceId, held, normPath))) {
      throw new FencingError(`fencing violation: lease '${options.leaseId}' does not fence '${normPath}'`, options.leaseId, row.epoch)
    }
    return
  }

  // 2. Check if another agent holds an unexpired write lease on this file
  const activeRows = db.prepare(`
    SELECT * FROM leases
     WHERE workspace_id = ?
       AND agent_id != ?
       AND released_at IS NULL
       AND expires_at > ?
  `).all(workspaceId, agentId, nowIso) as unknown as LeaseDbRow[]

  for (const row of activeRows) {
    if (isAgentDead(db, row.agent_id)) {
      // Dead agent does not block
      continue
    }

    let heldPaths: string[] = []
    try { heldPaths = JSON.parse(row.paths_json) } catch { heldPaths = [] }

    if (heldPaths.some(held => sameFencePath(db, workspaceId, held, normPath))) {
      const presences = getAgentPresence(db, { agentId: row.agent_id })
      const holderHb = presences[0]?.lastHeartbeat ?? row.created_at
      throw new ClaimConflictError({
        holder: {
          agentId: row.agent_id,
          taskId: row.task_id,
          claimedAt: row.created_at,
          lastHeartbeat: holderHb,
        },
        path: normPath,
        reason: `hard conflict: path '${normPath}' is held by another active task (${row.task_id} by ${row.agent_id})`,
      })
    }
  }

  // 3. Check if the current agent holds an EXPIRED lease for this path without having any active lease
  const myLeases = db.prepare(`
    SELECT * FROM leases
     WHERE workspace_id = ?
       AND agent_id = ?
     ORDER BY epoch DESC
  `).all(workspaceId, agentId) as unknown as LeaseDbRow[]

  let hadMatchingLease = false
  let hadActiveMatchingLease = false

  for (const row of myLeases) {
    let heldPaths: string[] = []
    try { heldPaths = JSON.parse(row.paths_json) } catch { heldPaths = [] }
    if (heldPaths.some(held => sameFencePath(db, workspaceId, held, normPath))) {
      hadMatchingLease = true
      const isExpired = nowMs > Date.parse(row.expires_at)
      if (!isExpired && row.released_at === null) {
        hadActiveMatchingLease = true
        break
      }
    }
  }

  if (hadMatchingLease && !hadActiveMatchingLease) {
    throw new FencingError(
      `fencing violation: lease on '${normPath}' for agent '${agentId}' has expired`,
    )
  }
}

export function listActiveLeases(db: DatabaseSync, workspaceId: string): Lease[] {
  ensureLeaseSchema(db)
  const nowIso = new Date().toISOString()
  const rows = db.prepare(`
    SELECT * FROM leases
     WHERE workspace_id = ?
       AND released_at IS NULL
       AND expires_at > ?
     ORDER BY epoch DESC
  `).all(workspaceId, nowIso) as unknown as LeaseDbRow[]

  return rows.map(parseLease)
}
