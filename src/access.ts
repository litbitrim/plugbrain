/**
 * The agent access layer — Vertical 2 of the PlugBrain contract.
 *
 * Agents never touch the raw filesystem. Every read, write and search goes
 * through here, which is precisely why provenance is complete rather than
 * best-effort: there is no second path that could bypass the ledger. Invariant
 * 5 ("every observable file/symbol/tool access is logged") is enforced by
 * construction, not by asking agents to remember to report.
 *
 * Every agent gets a stable colour on first contact. That colour is what the
 * Explorer, the City and the Planet paint a file in, so a colour on screen
 * always identifies an author, in every surface, without a lookup.
 */
import { createHash } from 'node:crypto'
import { existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { evaluateClaim, type ConflictVerdict } from './projections/conflicts.ts'
import { checkWriteFencing } from './coord/leases.ts'
import { searchWorkspace } from './store/search.ts'
import type { Action } from './store/schema.ts'

export interface Workspace { id: string; name: string; root: string }
export interface AgentIdentity { id: string; name: string; color: string; hue: number }

/** Golden-angle hue stepping: consecutive agents are maximally distinguishable. */
const GOLDEN_ANGLE = 137.508

export class AccessDenied extends Error {}

/**
 * A write was refused by the same live-claim projection used by the HTTP API.
 * Keeping this error in the access layer is deliberate: CLI and library users
 * must not get a weaker mutation path than agents speaking HTTP.
 */
export class WriteConflictError extends AccessDenied {
  readonly verdict: ConflictVerdict

  constructor(verdict: ConflictVerdict) {
    const first = verdict.hardConflicts[0]
    super(first
      ? `hard conflict: path '${first.requestedPath}' is held by another active task`
      : 'hard conflict: write is not admissible')
    this.verdict = verdict
    this.name = 'WriteConflictError'
  }
}

/** Look up a registered workspace, or throw — an unregistered folder is not reachable. */
export function requireWorkspace(db: DatabaseSync, workspaceId: string): Workspace {
  if (!workspaceId || typeof workspaceId !== 'string') throw new AccessDenied(`invalid workspace: ${workspaceId}`)
  const row = db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').get(workspaceId) as
    Workspace | undefined
  if (!row) throw new AccessDenied(`unknown workspace: ${workspaceId}`)
  return row
}

/**
 * Require a previously registered agent, or throw.
 * Identity creation and identity authorization are strictly separate operations (FO-3).
 * An unauthenticated or unauthorized caller cannot mint an agent row simply by passing an ID.
 */
export function requireAgent(db: DatabaseSync, agentId: string): AgentIdentity {
  if (!agentId || typeof agentId !== 'string') throw new AccessDenied(`invalid agentId: ${agentId}`)
  const existing = db.prepare('SELECT id, name, color, hue FROM agents WHERE id = ?').get(agentId) as
    AgentIdentity | undefined
  if (!existing) throw new AccessDenied(`unknown or unauthorized agent: ${agentId}`)
  const now = new Date().toISOString()
  db.prepare('UPDATE agents SET last_seen = ? WHERE id = ?').run(now, agentId)
  return existing
}

/**
 * Register an agent (idempotent) and return its identity including the colour
 * every surface paints its files in. Must only be invoked by authenticated/authorized
 * registration flows (e.g. authenticated attach), NEVER as a fallback on read/write/search.
 */
export function registerAgent(db: DatabaseSync, agentId: string, name?: string): AgentIdentity {
  if (!agentId || typeof agentId !== 'string') throw new AccessDenied(`invalid agentId: ${agentId}`)
  const now = new Date().toISOString()
  const existing = db.prepare('SELECT id, name, color, hue FROM agents WHERE id = ?').get(agentId) as
    AgentIdentity | undefined
  if (existing) {
    db.prepare('UPDATE agents SET last_seen = ? WHERE id = ?').run(now, agentId)
    return existing
  }
  const count = (db.prepare('SELECT COUNT(*) c FROM agents').get() as { c: number }).c
  const hue = Math.round((count * GOLDEN_ANGLE) % 360)
  const color = `hsl(${hue} 68% 62%)`
  db.prepare(
    `INSERT INTO agents (id, name, color, hue, first_seen, last_seen) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(agentId, name ?? agentId, color, hue, now, now)
  return { id: agentId, name: name ?? agentId, color, hue }
}

/**
 * Register an agent (legacy alias). Kept for backward compatibility with explicit registration calls.
 */
export const ensureAgent = registerAgent

/**
 * Resolve a workspace-relative path to an absolute one, refusing anything that
 * escapes the workspace root. This is the containment boundary: a traversal
 * like `../../etc/passwd` must not resolve, or "agents only see the workspace"
 * would be a comment rather than a guarantee.
 */
function resolveInside(workspace: Workspace, relPath: string): string {
  let abs: string
  if (isAbsolute(relPath)) {
    const rel = relative(workspace.root, relPath)
    if (rel.startsWith('..') || isAbsolute(rel)) {
      throw new AccessDenied(`path is outside the workspace: ${relPath}`)
    }
    abs = resolve(relPath)
  } else {
    abs = resolve(join(workspace.root, relPath))
    const rel = relative(workspace.root, abs)
    if (rel.startsWith('..') || isAbsolute(rel)) {
      throw new AccessDenied(`path escapes the workspace: ${relPath}`)
    }
  }

  // Symlink, Junction and Dangling Symlink containment check (B06 / FO-3 / REV2-D03 / R3-CHAINED-DANGLING-SYMLINK)
  if (existsSync(workspace.root)) {
    const realRoot = realpathSync(workspace.root)
    const relFromRoot = relative(realRoot, abs)
    if (relFromRoot.startsWith('..') || isAbsolute(relFromRoot)) {
      throw new AccessDenied(`path escapes the workspace: ${relPath}`)
    }

    const resolveSymlinkChain = (startPath: string, maxHops = 40): string => {
      let curr = startPath
      let hops = 0
      const visited = new Set<string>()

      while (hops < maxHops) {
        let st
        try {
          st = lstatSync(curr, { throwIfNoEntry: false })
        } catch {
          break
        }
        if (!st || !st.isSymbolicLink()) {
          break
        }
        if (visited.has(curr)) {
          throw new AccessDenied(`symlink cycle detected: ${startPath}`)
        }
        visited.add(curr)
        hops++

        let linkTarget: string
        try {
          linkTarget = readlinkSync(curr)
        } catch (err) {
          throw new AccessDenied(`cannot read symlink ${curr}: ${(err as Error).message}`)
        }

        const nextPath = isAbsolute(linkTarget) ? resolve(linkTarget) : resolve(dirname(curr), linkTarget)
        const rel = relative(realRoot, nextPath)
        if (rel.startsWith('..') || isAbsolute(rel)) {
          throw new AccessDenied(`path escapes workspace via symlink chain: ${relPath} -> ${nextPath}`)
        }
        curr = nextPath
      }

      if (hops >= maxHops) {
        throw new AccessDenied(`too many symlink hops (potential cycle): ${startPath}`)
      }

      if (existsSync(curr)) {
        const realTarget = realpathSync(curr)
        const relReal = relative(realRoot, realTarget)
        if (relReal.startsWith('..') || isAbsolute(relReal)) {
          throw new AccessDenied(`path escapes workspace via symlink chain: ${relPath} -> ${realTarget}`)
        }
        return realTarget
      }

      return curr
    }

    // Check each segment from realRoot to abs for symlinks (including chained and dangling links)
    const segments = relFromRoot.split(/[\\/]/).filter(Boolean)
    let current = realRoot
    for (const seg of segments) {
      current = join(current, seg)
      current = resolveSymlinkChain(current)
    }

    // For any existing leaf or path, ensure final realpath does not escape
    if (existsSync(abs)) {
      const realCur = realpathSync(abs)
      const realRel = relative(realRoot, realCur)
      if (realRel.startsWith('..') || isAbsolute(realRel)) {
        throw new AccessDenied(`path escapes workspace via symlink or junction: ${relPath}`)
      }
    }
  }

  return abs
}

const toRel = (workspace: Workspace, abs: string): string =>
  relative(workspace.root, abs).split('\\').join('/')

/** Append one ledger entry and refresh the denormalised owner of the file. */
function record(
  db: DatabaseSync, workspace: Workspace, path: string,
  agentId: string | null, action: Action, detail?: string,
): void {
  const now = new Date().toISOString()
  const file = db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
    .get(workspace.id, path) as { id: number } | undefined
  db.prepare(
    `INSERT INTO activity (workspace_id, file_id, path, agent_id, action, detail, at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(workspace.id, file?.id ?? null, path, agentId, action, detail ?? null, now)

  // Reads do not change ownership: the colour of a file means "who last
  // CHANGED this", otherwise every file would drift to whoever browsed last.
  if (file && agentId && (action === 'write' || action === 'create')) {
    db.prepare(
      `INSERT INTO file_owner (file_id, agent_id, action, at) VALUES (?, ?, ?, ?)
       ON CONFLICT(file_id) DO UPDATE SET agent_id = excluded.agent_id,
         action = excluded.action, at = excluded.at`
    ).run(file.id, agentId, action, now)
  }
}

export interface ReadResult { path: string; content: string; bytes: number; lang: string | null }

/** Read a file through the brain. The access is logged before the content is returned. */
export function readFile(
  db: DatabaseSync, workspaceId: string, agentId: string, relPath: string,
): ReadResult {
  const workspace = requireWorkspace(db, workspaceId)
  requireAgent(db, agentId)
  const abs = resolveInside(workspace, relPath)
  const rel = toRel(workspace, abs)
  if (!existsSync(abs)) {
    record(db, workspace, rel, agentId, 'read', 'missing')
    throw new AccessDenied(`no such file in workspace: ${rel}`)
  }
  const content = readFileSync(abs, 'utf8')
  record(db, workspace, rel, agentId, 'read')
  const row = db.prepare('SELECT lang FROM files WHERE workspace_id = ? AND path = ?')
    .get(workspace.id, rel) as { lang: string | null } | undefined
  return { path: rel, content, bytes: Buffer.byteLength(content), lang: row?.lang ?? null }
}

export interface WriteResult { path: string; created: boolean; bytes: number; agent: AgentIdentity }

/**
 * Write a file through the brain. The ledger entry and the ownership colour
 * are updated in the same call that touches the disk, so a written file can
 * never exist without an author.
 */
export function writeFile(
  db: DatabaseSync, workspaceId: string, agentId: string, relPath: string, content: string,
  taskId = `task-${agentId}`,
  options?: { leaseId?: string; epoch?: number },
): WriteResult {
  const workspace = requireWorkspace(db, workspaceId)
  const agent = requireAgent(db, agentId)
  const abs = resolveInside(workspace, relPath)
  const rel = toRel(workspace, abs)

  checkWriteFencing(db, workspaceId, agentId, rel, { taskId, leaseId: options?.leaseId, epoch: options?.epoch })

  // This is the mutation boundary for every client, not just the HTTP route.
  // The route still returns the richer 409 payload, while CLI/library callers
  // receive the same authoritative verdict as an exception before disk I/O.
  const claimVerdict = evaluateClaim(db, workspaceId, {
    taskId: taskId.trim() || `task-${agentId}`,
    agentId,
    paths: [rel],
    mode: 'write',
  })
  if (!claimVerdict.admissible && claimVerdict.hardConflicts.length > 0) {
    throw new WriteConflictError(claimVerdict)
  }

  const created = !existsSync(abs)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, content, 'utf8')

  // Keep the file row usable immediately; full re-index is the daemon's job.
  const st = statSync(abs)
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 16)
  const loc = content.length === 0 ? 0 : content.split('\n').length
  const state = db.prepare(
    'SELECT generation FROM workspace_index_state WHERE workspace_id = ?')
    .get(workspace.id) as { generation: number } | undefined
  const generation = state?.generation ?? 0
  const createdGen = created ? generation : undefined
  db.prepare(
    `INSERT INTO files (workspace_id, path, ext, lang, size, mtime, hash, loc, indexed_at, generation, created_generation)
     VALUES (?, ?, ?, NULL, ?, ?, ?, ?, NULL, ?, ?)
     ON CONFLICT(workspace_id, path) DO UPDATE SET
       size = excluded.size, mtime = excluded.mtime, hash = excluded.hash,
       loc = excluded.loc, indexed_at = NULL, generation = excluded.generation`
  ).run(workspace.id, rel, rel.includes('.') ? `.${rel.split('.').pop()}` : '',
    st.size, st.mtime.toISOString(), hash, loc, generation, createdGen ?? generation)

  record(db, workspace, rel, agentId, created ? 'create' : 'write')
  return { path: rel, created, bytes: Buffer.byteLength(content), agent }
}

export interface SearchHit { name: string; path: string; kind: string; line: number | null }

/**
 * Search the index. This is how an agent finds code instead of walking a disk.
 *
 * The query shape lives in `store/search.ts` and is the whole point of it: the
 * obvious join here (`FROM search JOIN search_rows ON … WHERE MATCH …`) plans as
 * an index scan over every row of the workspace with an FTS probe per row, and
 * on the real planet that is 60 seconds in the daemon's event loop — during
 * which nothing else is answered. Routing through the canonical search keeps
 * the FTS match first and takes 19 ms on the same data.
 */
export function search(
  db: DatabaseSync, workspaceId: string, agentId: string, query: string, limit = 40,
): SearchHit[] {
  const workspace = requireWorkspace(db, workspaceId)
  requireAgent(db, agentId)
  // An empty query matches nothing and is not worth a row in the ledger.
  if (query.trim() === '') return []
  const hits = searchWorkspace(db, workspace.id, query, { limit })
  const rows: SearchHit[] = hits.map(hit => ({
    name: hit.name, path: hit.path, kind: hit.kind, line: hit.line,
  }))
  record(db, workspace, `search:${query.trim()}`, agentId, 'search', `${rows.length} hits`)
  return rows
}

/** Everything the ledger knows about one file — the "why was this changed?" answer. */
export function fileProvenance(db: DatabaseSync, workspaceId: string, relPath: string) {
  const workspace = requireWorkspace(db, workspaceId)
  const owner = db.prepare(
    `SELECT a.id, a.name, a.color, o.action, o.at
       FROM file_owner o JOIN agents a ON a.id = o.agent_id
       JOIN files f ON f.id = o.file_id
      WHERE f.workspace_id = ? AND f.path = ?`
  ).get(workspace.id, relPath) ?? null
  const history = db.prepare(
    `SELECT ac.action, ac.at, ac.detail, ac.agent_id, ag.name, ag.color
       FROM activity ac LEFT JOIN agents ag ON ag.id = ac.agent_id
      WHERE ac.workspace_id = ? AND ac.path = ?
      ORDER BY ac.id DESC LIMIT 50`
  ).all(workspace.id, relPath)
  return { path: relPath, owner, history }
}
