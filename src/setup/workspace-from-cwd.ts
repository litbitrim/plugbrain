/**
 * Which workspace does `plugbrain mcp` mean when nobody says?
 *
 * A vibe coder should be able to point their client at `plugbrain mcp` once and
 * forget it: the editor starts the server in the project folder, so the folder
 * IS the statement of intent. This module turns that folder into a workspace
 * without ever asking the human for an id or a token.
 *
 * The order is deliberate and each step is weaker than the one before it:
 *
 *   1. `PLUGBRAIN_WORKSPACE` — an explicit environment override wins because a
 *      machine that states its workspace must not be second-guessed.
 *   2. a registered root that CONTAINS the cwd, longest match first — an
 *      already-known project is authoritative, and a nested workspace (a repo
 *      inside a planet) must beat its parent.
 *   3. the git root of the cwd, registered on the spot — the common case: a
 *      fresh clone the brain has never seen.
 *   4. a clear refusal — returned as a value, so the caller can surface it as a
 *      tool error instead of crashing the stdio server.
 *
 * Everything here is filesystem and database only: no indexing. A resolution
 * says WHICH workspace; whether its index is warm is a separate concern, so
 * `needsIndex` is reported rather than acted on.
 */
import type { DatabaseSync } from 'node:sqlite'
import { basename, resolve, sep } from 'node:path'
import { canonicalPath, workspaceIdFor } from '../planet.ts'
import { gitText } from '../indexer/git.ts'

/** The environment variable that pins a workspace, by id or by root. */
export const PLUGBRAIN_WORKSPACE_ENV = 'PLUGBRAIN_WORKSPACE'

export interface WorkspaceCandidate {
  id: string
  root: string
}

/**
 * Fold a path for containment: absolute, forward slashes, no trailing
 * separator, lowercase. Windows is case-insensitive, so comparing raw strings
 * would make `C:\Proj` and `C:\proj\src` look like strangers.
 */
function fold(path: string): string {
  let value = resolve(path).split(sep).join('/')
  while (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1)
  return value.toLowerCase()
}

/** True when `child` is `root` itself or lives underneath it. */
export function pathContains(root: string, child: string): boolean {
  const r = fold(root)
  const c = fold(child)
  return c === r || c.startsWith(`${r}/`)
}

/**
 * The registered workspace whose root contains the cwd, longest root first.
 *
 * A planet folder and a checkout inside it can both be registered; the cwd
 * decides, and the longest matching root is the most specific answer. Identity
 * is compared through `canonicalPath`, so a junction or a differently-cased
 * spelling of the same directory is still one workspace.
 */
export function findRegisteredWorkspace(db: DatabaseSync, cwd: string): WorkspaceCandidate | null {
  const rows = db.prepare('SELECT id, root FROM workspaces').all() as WorkspaceCandidate[]
  let best: WorkspaceCandidate | null = null
  let bestLength = -1
  for (const row of rows) {
    if (!pathContains(row.root, cwd)) continue
    const length = fold(row.root).length
    if (length > bestLength) {
      best = row
      bestLength = length
    }
  }
  return best
}

/**
 * The git repository root above (or at) `cwd`.
 *
 * `git rev-parse --show-toplevel` is authoritative: it already knows about
 * worktrees, submodules and a `.git` file rather than a directory. A folder
 * that is not a repository is a normal answer, not an error.
 */
export function findGitRoot(cwd: string): string | null {
  const top = gitText(cwd, ['rev-parse', '--show-toplevel'])
  if (top === null || top === '') return null
  return canonicalPath(top)
}

export interface WorkspaceRecord {
  id: string
  name: string
  /** Not registered yet, so this call would be the one that creates it. */
  created: boolean
}

/**
 * What `registerWorkspaceRoot` WOULD write, without writing it.
 *
 * `init --dry-run` needs to name the workspace and say whether it is new while
 * changing nothing, so the decision is split from the write.
 */
export function planWorkspaceRoot(db: DatabaseSync, root: string, name?: string): WorkspaceRecord {
  const absolute = resolve(root)
  const id = workspaceIdFor(absolute)
  const existing = db.prepare('SELECT id FROM workspaces WHERE root = ?').get(absolute) as
    { id: string } | undefined
  const label = name ?? basename(absolute) ?? id
  return { id, name: label, created: existing === undefined }
}

/**
 * Register a folder as a workspace, idempotently.
 *
 * Mirrors the CLI's `register`: same id derivation, same `ON CONFLICT(root)`,
 * so a folder registered here and one registered by `plugbrain register` land
 * on one row rather than two.
 */
export function registerWorkspaceRoot(
  db: DatabaseSync, root: string, name?: string,
): WorkspaceRecord {
  const absolute = resolve(root)
  const record = planWorkspaceRoot(db, root, name)
  db.prepare(
    `INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(root) DO UPDATE SET name = excluded.name`
  ).run(record.id, record.name, absolute, new Date().toISOString())
  return record
}

export type WorkspaceSource = 'flag' | 'env' | 'registered' | 'git'

export interface McpWorkspaceResolution {
  workspaceId: string
  root: string | null
  source: WorkspaceSource
  /** Newly registered in this call, so its index is cold and wants a run. */
  needsIndex: boolean
}

export interface McpWorkspaceRefusal {
  workspaceId: null
  source: 'none'
  reason: string
}

export interface ResolveMcpWorkspaceOptions {
  db: DatabaseSync
  cwd?: string
  env?: NodeJS.ProcessEnv
  /** An explicit `--workspace` value; it wins over everything, unvalidated. */
  override?: string | null
  /** Register a git root that is not known yet. Default true. */
  register?: boolean
}

/** Where a workspace id points, if it is registered at all. */
function rootOf(db: DatabaseSync, workspaceId: string): string | null {
  const row = db.prepare('SELECT root FROM workspaces WHERE id = ?').get(workspaceId) as
    { root: string } | undefined
  return row?.root ?? null
}

/**
 * Resolve the workspace for `plugbrain mcp`, or explain why there is none.
 *
 * The refusal is a value, never a throw: the stdio server still has to start
 * and answer `initialize` so the client can read the reason as a tool error.
 */
export function resolveMcpWorkspace(
  options: ResolveMcpWorkspaceOptions,
): McpWorkspaceResolution | McpWorkspaceRefusal {
  const { db, cwd = process.cwd(), env = process.env } = options

  if (options.override !== undefined && options.override !== null && options.override.trim() !== '') {
    const workspaceId = options.override.trim()
    return { workspaceId, root: rootOf(db, workspaceId), source: 'flag', needsIndex: false }
  }

  const pinned = env[PLUGBRAIN_WORKSPACE_ENV]?.trim()
  if (pinned !== undefined && pinned !== '') {
    // The variable may name a workspace id or a folder; both are friendlier
    // than failing, and a folder is what a human is most likely to paste.
    const byId = rootOf(db, pinned)
    if (byId !== null) return { workspaceId: pinned, root: byId, source: 'env', needsIndex: false }
    const absolute = resolve(pinned)
    const id = workspaceIdFor(absolute)
    if (rootOf(db, id) !== null) {
      return { workspaceId: id, root: absolute, source: 'env', needsIndex: false }
    }
    // Unknown on purpose: the caller validates it and reports it as a tool error.
    return { workspaceId: pinned, root: null, source: 'env', needsIndex: false }
  }

  const registered = findRegisteredWorkspace(db, cwd)
  if (registered !== null) {
    return { workspaceId: registered.id, root: registered.root, source: 'registered', needsIndex: false }
  }

  const gitRoot = findGitRoot(cwd)
  if (gitRoot !== null) {
    if (options.register === false) {
      return { workspaceId: workspaceIdFor(gitRoot), root: gitRoot, source: 'git', needsIndex: false }
    }
    const record = registerWorkspaceRoot(db, gitRoot)
    return { workspaceId: record.id, root: gitRoot, source: 'git', needsIndex: record.created }
  }

  return {
    workspaceId: null,
    source: 'none',
    reason:
      `no workspace for ${resolve(cwd)}: it is not a registered folder and not inside a git ` +
      `repository. Register it with \`plugbrain register ${resolve(cwd)}\` or run ` +
      `\`plugbrain mcp --workspace <workspaceId>\`.`,
  }
}
