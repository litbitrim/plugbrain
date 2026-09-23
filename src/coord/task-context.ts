/**
 * Harness-bound task context packs.
 *
 * Harness owns task/run/lane transitions. This module deliberately consumes a
 * task identity and projects Brain-owned knowledge for it; it never creates a
 * task, claims a lane, or changes a Harness state.
 */
import { randomUUID } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'
import { buildAwarenessPack, type AwarenessLimits, type TaskAwarenessPack } from '../projections/awareness.ts'

export interface RevisionVector {
  workspaceId: string
  generation: number
  gitHead: string | null
  checkoutId: string | null
  checkoutRevision: string | null
}

export interface TaskContextRequest {
  workspaceId: string
  taskId: string
  agentId?: string
  checkoutId?: string | null
  scopePaths: readonly string[]
  requirementIds: readonly string[]
  tokenBudget?: number
  limits?: AwarenessLimits
}

export interface TaskContextPack {
  schema: 1
  id: string
  taskId: string
  requirementIds: string[]
  scopePaths: string[]
  revision: RevisionVector
  freshness: 'current'
  tokenBudget: number
  files: Array<{ path: string; hash: string | null; generation: number; checkoutId: string | null }>
  notes: Array<{ path: string; hash: string | null; generation: number }>
  decisions: Array<{ path: string; key: string; value: string }>
  awareness: TaskAwarenessPack
  generatedAt: string
}

export interface MissionChanges {
  packId: string
  taskId: string
  checkoutId: string | null
  fromGeneration: number
  toGeneration: number
  /** Includes a sibling-worktree change to the same repository-relative file. */
  changed: Array<{ path: string; hash: string | null; generation: number; sourceCheckoutId: string | null }>
  deleted: Array<{ path: string; generation: number; reason: string }>
  stale: boolean
  checkoutChanged: boolean
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS task_context_packs (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  checkout_id TEXT,
  scope_paths_json TEXT NOT NULL,
  requirement_ids_json TEXT NOT NULL,
  generation INTEGER NOT NULL,
  git_head TEXT,
  checkout_revision TEXT,
  token_budget INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_task_context_packs_task ON task_context_packs(workspace_id, task_id, created_at DESC);
`

export function ensureTaskContextSchema(db: DatabaseSync): void { db.exec(SCHEMA) }

const normalisePaths = (paths: readonly string[]): string[] => [...new Set(paths
  .map(path => path.trim().replaceAll('\\', '/').replace(/^\/+/, ''))
  .filter(Boolean))].sort()

const normaliseIds = (ids: readonly string[]): string[] => [...new Set(ids.map(id => id.trim()).filter(Boolean))].sort()

function stateVector(db: DatabaseSync, workspaceId: string, requestedCheckoutId?: string | null): RevisionVector {
  const state = db.prepare('SELECT generation, git_head FROM workspace_index_state WHERE workspace_id = ?')
    .get(workspaceId) as { generation: number; git_head: string | null } | undefined
  const checkoutId = requestedCheckoutId ?? null
  let checkoutRevision: string | null = null
  if (checkoutId !== null) {
    const checkout = db.prepare('SELECT revision FROM checkouts WHERE id = ?').get(checkoutId) as { revision: string | null } | undefined
    if (!checkout) throw new Error(`unknown checkout: ${checkoutId}`)
    checkoutRevision = checkout.revision
  }
  return { workspaceId, generation: Number(state?.generation ?? 0), gitHead: state?.git_head ?? null, checkoutId, checkoutRevision }
}

function scopePredicate(paths: string[], column = 'path'): { sql: string; params: string[] } {
  if (paths.length === 0) return { sql: '1 = 0', params: [] }
  const clauses = paths.map(() => `(${column} = ? OR ${column} LIKE ? ESCAPE '\\')`)
  const params = paths.flatMap(path => [path, `${path.replaceAll('%', '\\%').replaceAll('_', '\\_')}/%`])
  return { sql: clauses.join(' OR '), params }
}

interface LogicalPathRow {
  path: string
  repoId: string | null
  relPrefix: string | null
}

/**
 * Worktree spellings differ, but `repo_id + path below checkout prefix` names
 * one source file. Context from a linked worktree must therefore become stale
 * when its sibling changes that file, even before a merge transports the bytes.
 */
function logicalPathKey(row: LogicalPathRow): string {
  if (row.repoId !== null && row.relPrefix !== null && row.path.startsWith(row.relPrefix + '/')) {
    return `repo:${row.repoId}:${row.path.slice(row.relPrefix.length + 1)}`
  }
  return `path:${row.path}`
}

function logicalScopeKeys(db: DatabaseSync, workspaceId: string, paths: string[]): Set<string> {
  const lookup = db.prepare(`SELECT f.path, f.repo_id AS repoId, c.rel_prefix AS relPrefix
    FROM files f LEFT JOIN checkouts c ON c.id = f.checkout_id
    WHERE f.workspace_id = ? AND f.path = ?`)
  return new Set(paths.map(path => {
    const row = lookup.get(workspaceId, path) as LogicalPathRow | undefined
    return row === undefined ? `path:${path}` : logicalPathKey(row)
  }))
}

export function createTaskContextPack(db: DatabaseSync, request: TaskContextRequest): TaskContextPack {
  ensureTaskContextSchema(db)
  requireWorkspace(db, request.workspaceId)
  const taskId = request.taskId.trim()
  if (!taskId) throw new Error('taskId required')
  const scopePaths = normalisePaths(request.scopePaths)
  if (scopePaths.length === 0) throw new Error('scopePaths required')
  const requirementIds = normaliseIds(request.requirementIds)
  const revision = stateVector(db, request.workspaceId, request.checkoutId)
  const tokenBudget = Math.max(256, Math.min(32_000, Math.floor(request.tokenBudget ?? 3_000)))
  const scope = scopePredicate(scopePaths, 'f.path')
  const checkoutSql = revision.checkoutId === null ? '' : ' AND f.checkout_id = ?'
  const checkoutParams = revision.checkoutId === null ? [] : [revision.checkoutId]
  const files = db.prepare(`SELECT f.path, f.hash, f.generation, f.checkout_id AS checkoutId
      FROM files f WHERE f.workspace_id = ? AND (${scope.sql})${checkoutSql}
      ORDER BY f.path LIMIT 200`)
    .all(request.workspaceId, ...scope.params, ...checkoutParams) as TaskContextPack['files']
  const notes = files.filter(file => /\.md$/i.test(file.path)).map(file => ({ path: file.path, hash: file.hash, generation: file.generation }))
  const decisions = db.prepare(`SELECT f.path, p.key, p.value FROM note_properties p
      JOIN files f ON f.id = p.file_id WHERE p.workspace_id = ?
      AND lower(p.key) IN ('decision', 'entscheidung', 'adr') AND (${scope.sql})${checkoutSql}
      ORDER BY f.path, p.key, p.ordinal LIMIT 100`)
    .all(request.workspaceId, ...scope.params, ...checkoutParams) as TaskContextPack['decisions']
  const awareness = buildAwarenessPack(db, {
    workspaceId: request.workspaceId, taskId, agentId: request.agentId,
    intendedPaths: scopePaths, mode: 'write',
    limits: { ...(request.limits ?? {}), maxChars: Math.min((request.limits?.maxChars ?? tokenBudget * 4), tokenBudget * 4) },
  })
  const generatedAt = new Date().toISOString()
  const id = `task-pack-${randomUUID().slice(0, 12)}`
  db.prepare(`INSERT INTO task_context_packs
      (id, workspace_id, task_id, checkout_id, scope_paths_json, requirement_ids_json, generation, git_head, checkout_revision, token_budget, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, request.workspaceId, taskId, revision.checkoutId, JSON.stringify(scopePaths), JSON.stringify(requirementIds),
      revision.generation, revision.gitHead, revision.checkoutRevision, tokenBudget, generatedAt)
  return { schema: 1, id, taskId, requirementIds, scopePaths, revision, freshness: 'current', tokenBudget, files, notes, decisions, awareness, generatedAt }
}

export function changesSinceTaskContextPack(db: DatabaseSync, packId: string): MissionChanges {
  ensureTaskContextSchema(db)
  const pack = db.prepare('SELECT * FROM task_context_packs WHERE id = ?').get(packId) as {
    id: string; workspace_id: string; task_id: string; checkout_id: string | null; scope_paths_json: string
    generation: number; checkout_revision: string | null
  } | undefined
  if (!pack) throw new Error(`unknown task context pack: ${packId}`)
  const scopePaths = JSON.parse(pack.scope_paths_json) as string[]
  const scope = scopePredicate(scopePaths, 'f.path')
  const checkoutSql = pack.checkout_id === null ? '' : ' AND f.checkout_id = ?'
  const checkoutParams = pack.checkout_id === null ? [] : [pack.checkout_id]
  const state = stateVector(db, pack.workspace_id, pack.checkout_id)
  const scopeKeys = logicalScopeKeys(db, pack.workspace_id, scopePaths)
  const changedRows = db.prepare(`SELECT f.path, f.hash, f.generation, f.checkout_id AS sourceCheckoutId,
      f.repo_id AS repoId, c.rel_prefix AS relPrefix FROM files f
      LEFT JOIN checkouts c ON c.id = f.checkout_id
      WHERE f.workspace_id = ? AND f.generation > ? ORDER BY f.path LIMIT 5000`)
    .all(pack.workspace_id, pack.generation) as Array<MissionChanges['changed'][number] & LogicalPathRow>
  const changed = changedRows.filter(row => scopeKeys.has(logicalPathKey(row)))
  const tombstoneScope = scopePredicate(scopePaths)
  const deleted = db.prepare(`SELECT path, generation, reason FROM file_tombstones
      WHERE workspace_id = ? AND (${tombstoneScope.sql}) AND generation > ? ORDER BY path`)
    .all(pack.workspace_id, ...tombstoneScope.params, pack.generation) as MissionChanges['deleted']
  const checkoutChanged = state.checkoutRevision !== pack.checkout_revision
  return { packId, taskId: pack.task_id, checkoutId: pack.checkout_id, fromGeneration: pack.generation,
    toGeneration: state.generation, changed, deleted, stale: changed.length > 0 || deleted.length > 0 || checkoutChanged,
    checkoutChanged }
}
