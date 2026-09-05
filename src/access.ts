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
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import type { Action } from './store/schema.ts'

export interface Workspace { id: string; name: string; root: string }
export interface AgentIdentity { id: string; name: string; color: string; hue: number }

/** Golden-angle hue stepping: consecutive agents are maximally distinguishable. */
const GOLDEN_ANGLE = 137.508

export class AccessDenied extends Error {}

/** Look up a registered workspace, or throw — an unregistered folder is not reachable. */
export function requireWorkspace(db: DatabaseSync, workspaceId: string): Workspace {
  const row = db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').get(workspaceId) as
    Workspace | undefined
  if (!row) throw new AccessDenied(`unknown workspace: ${workspaceId}`)
  return row
}

/**
 * Register an agent (idempotent) and return its identity including the colour
 * every surface paints its files in. The hue is derived from how many agents
 * came before, so colours are stable and never reused while an agent lives.
 */
export function ensureAgent(db: DatabaseSync, agentId: string, name?: string): AgentIdentity {
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
 * Resolve a workspace-relative path to an absolute one, refusing anything that
 * escapes the workspace root. This is the containment boundary: a traversal
 * like `../../etc/passwd` must not resolve, or "agents only see the workspace"
 * would be a comment rather than a guarantee.
 */
function resolveInside(workspace: Workspace, relPath: string): string {
  if (isAbsolute(relPath)) {
    const rel = relative(workspace.root, relPath)
    if (rel.startsWith('..') || isAbsolute(rel)) {
      throw new AccessDenied(`path is outside the workspace: ${relPath}`)
    }
    return resolve(relPath)
  }
  const abs = resolve(join(workspace.root, relPath))
  const rel = relative(workspace.root, abs)
  if (rel.startsWith('..') || isAbsolute(rel)) {
    throw new AccessDenied(`path escapes the workspace: ${relPath}`)
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
  ensureAgent(db, agentId)
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
): WriteResult {
  const workspace = requireWorkspace(db, workspaceId)
  const agent = ensureAgent(db, agentId)
  const abs = resolveInside(workspace, relPath)
  const rel = toRel(workspace, abs)
  const created = !existsSync(abs)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, content, 'utf8')

  // Keep the file row usable immediately; full re-index is the daemon's job.
  const st = statSync(abs)
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 16)
  const loc = content.length === 0 ? 0 : content.split('\n').length
  db.prepare(
    `INSERT INTO files (workspace_id, path, ext, lang, size, mtime, hash, loc, indexed_at)
     VALUES (?, ?, ?, NULL, ?, ?, ?, ?, NULL)
     ON CONFLICT(workspace_id, path) DO UPDATE SET
       size = excluded.size, mtime = excluded.mtime, hash = excluded.hash,
       loc = excluded.loc, indexed_at = NULL`
  ).run(workspace.id, rel, rel.includes('.') ? `.${rel.split('.').pop()}` : '',
    st.size, st.mtime.toISOString(), hash, loc)

  record(db, workspace, rel, agentId, created ? 'create' : 'write')
  return { path: rel, created, bytes: Buffer.byteLength(content), agent }
}

export interface SearchHit { name: string; path: string; kind: string; line: number | null }

/** Search the index. This is how an agent finds code instead of walking a disk. */
export function search(
  db: DatabaseSync, workspaceId: string, agentId: string, query: string, limit = 40,
): SearchHit[] {
  const workspace = requireWorkspace(db, workspaceId)
  ensureAgent(db, agentId)
  const cleaned = query.trim().replace(/["']/g, '')
  if (cleaned === '') return []
  const rows = db.prepare(
    `SELECT s.name, s.path, s.kind, sym.line
       FROM search s
       LEFT JOIN symbols sym ON sym.id = s.symbol_id
      WHERE s.workspace_id = ? AND search MATCH ?
      LIMIT ?`
  ).all(workspace.id, `${cleaned}*`, limit) as SearchHit[]
  record(db, workspace, `search:${cleaned}`, agentId, 'search', `${rows.length} hits`)
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
