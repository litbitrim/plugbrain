import { appendFileSync, existsSync, mkdirSync, readdirSync, realpathSync, type Dirent } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { basename, dirname, join, relative, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { storeHome } from '../index/runs.ts'
import { ensureLeaseSchema } from './leases.ts'

export interface ReapOptions { repo?: string; target?: string; apply?: boolean; now?: Date; gracePeriodMs?: number }
export interface ReapCandidate {
  path: string; branch: string | null; commit: string | null; target: string | null
  eligible: boolean; reason: string; restoreCommand?: string
  error?: string
}
export interface ReapResult {
  dryRun: boolean; candidates: ReapCandidate[]; removed: ReapCandidate[]
  missing: Array<{ path: string; quarantinedAt: string | null }>; pruneCommand: string | null; pruneReport: string[]
}

interface Worktree { path: string; head: string | null; branch: string | null; locked: boolean }

/** Canonicalize a path using fs.realpathSync.native (resolves symlinks, junctions, 8.3 names).
 *  Non-existent paths fall back to resolve()+lowercase without throwing. */
const normalize = (path: string): string => {
  try { return realpathSync.native(path).replace(/[\\/]+$/, '').toLowerCase() }
  catch { return resolve(path).replace(/[\\/]+$/, '').toLowerCase() }
}
const git = (cwd: string, ...args: string[]): string => execFileSync('git', ['-C', cwd, ...args], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 15000, windowsHide: true,
}).trim()

function listWorktrees(repo: string): Worktree[] {
  const raw = git(repo, 'worktree', 'list', '--porcelain')
  return raw.split(/\r?\n\r?\n/).filter(Boolean).map(block => {
    const lines = block.split(/\r?\n/)
    const field = (prefix: string): string | null => lines.find(line => line.startsWith(prefix))?.slice(prefix.length) ?? null
    return { path: field('worktree ' ) ?? '', head: field('HEAD '), branch: field('branch ')?.replace(/^refs\/heads\//, '') ?? null,
      locked: lines.some(line => line === 'locked' || line.startsWith('locked ')) }
  })
}

function ensureReaperSchema(db: DatabaseSync): void {
  const agentColumns = db.prepare('PRAGMA table_info(agents)').all() as unknown as Array<{ name: string }>
  const hasAgent = (name: string) => agentColumns.some(column => column.name === name)
  if (!hasAgent('workspace_id')) db.exec('ALTER TABLE agents ADD COLUMN workspace_id TEXT')
  if (!hasAgent('turn_state')) db.exec('ALTER TABLE agents ADD COLUMN turn_state TEXT')
  if (!hasAgent('turn_state_at')) db.exec('ALTER TABLE agents ADD COLUMN turn_state_at TEXT')
  if (!hasAgent('worktrees')) db.exec('ALTER TABLE agents ADD COLUMN worktrees TEXT')
  if (!hasAgent('retired_at')) db.exec('ALTER TABLE agents ADD COLUMN retired_at TEXT')
  const columns = db.prepare('PRAGMA table_info(checkouts)').all() as unknown as Array<{ name: string }>
  if (columns.length > 0 && !columns.some(column => column.name === 'disk_state')) {
    db.exec("ALTER TABLE checkouts ADD COLUMN disk_state TEXT NOT NULL DEFAULT 'present'")
  }
  db.exec(`CREATE TABLE IF NOT EXISTS worktree_reap_receipts (
    id INTEGER PRIMARY KEY, workspace_id TEXT NOT NULL, path TEXT NOT NULL, branch TEXT NOT NULL,
    commit_hash TEXT NOT NULL, target TEXT NOT NULL, removed_at TEXT NOT NULL, restore_command TEXT NOT NULL
  )`)
  db.exec(`CREATE TABLE IF NOT EXISTS reap_settings (
    workspace_id TEXT PRIMARY KEY, auto_enabled INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL
  )`)
  ensureLeaseSchema(db)
}

export function setReapAuto(db: DatabaseSync, workspaceId: string, enabled: boolean): void {
  ensureReaperSchema(db)
  db.prepare(`INSERT INTO reap_settings (workspace_id, auto_enabled, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(workspace_id) DO UPDATE SET auto_enabled = excluded.auto_enabled, updated_at = excluded.updated_at`)
    .run(workspaceId, enabled ? 1 : 0, new Date().toISOString())
}

export function isReapAutoEnabled(db: DatabaseSync, workspaceId: string): boolean {
  ensureReaperSchema(db)
  return (db.prepare('SELECT auto_enabled FROM reap_settings WHERE workspace_id = ?').get(workspaceId) as { auto_enabled?: number } | undefined)
    ?.auto_enabled === 1
}

export function runAutoReap(db: DatabaseSync, workspaceId: string): ReapResult | null {
  if (!isReapAutoEnabled(db, workspaceId)) return null
  // Grace period: protect worktrees of workers who ended their turn recently
  return reapWorktrees(db, workspaceId, { apply: true, gracePeriodMs: 5 * 60_000 })
}

/** Report missing paths; an explicit apply updates disk state without retiring recoverable bindings. */
export function synchronizeMissingWorktrees(db: DatabaseSync, workspaceId: string, apply = false): ReapResult['missing'] {
  ensureReaperSchema(db)
  const rows = db.prepare(`SELECT c.id, c.path FROM checkouts c JOIN planets p ON p.id = c.planet_id
    WHERE p.workspace_id = ? AND c.retired_at IS NULL`).all(workspaceId) as unknown as Array<{ id: string; path: string }>
  const missing: ReapResult['missing'] = []
  const quarantineMatches = new Map<string, string>()
  const quarantineRoot = resolve(process.env.PLUGBRAIN_QUARANTINE_ROOT ?? 'C:/PLUG/_quarantaene')
  if (process.platform === 'win32' && rows.some(row => !existsSync(row.path)) && existsSync(quarantineRoot)) {
    try {
      const roots = execFileSync('powershell', ['-NoProfile', '-Command',
        `Get-ChildItem -LiteralPath '${quarantineRoot.replace(/'/g, "''")}' -Directory -Recurse -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName }`],
      { encoding: 'utf8', timeout: 5000, windowsHide: true }).split(/\r?\n/)
      for (const path of roots) {
        const leaf = basename(path).toLowerCase()
        if (path && !quarantineMatches.has(leaf)) quarantineMatches.set(leaf, path)
      }
    } catch { /* quarantine lookup is informational only */ }
  }
  for (const row of rows) {
    if (existsSync(row.path)) {
      if (apply) db.prepare("UPDATE checkouts SET disk_state = 'present' WHERE id = ?").run(row.id)
      continue
    }
    const quarantinedAt = quarantineMatches.get(basename(row.path).toLowerCase()) ?? null
    if (apply) db.prepare("UPDATE checkouts SET disk_state = 'fehlt' WHERE id = ?").run(row.id)
    missing.push({ path: row.path, quarantinedAt })
  }
  const bindings = db.prepare('SELECT id, worktrees FROM agents WHERE workspace_id = ? AND retired_at IS NULL')
    .all(workspaceId) as unknown as Array<{ id: string; worktrees: string | null }>
  for (const agent of bindings) {
    let paths: string[] = []
    try { paths = JSON.parse(agent.worktrees ?? '[]') as string[] } catch { continue }
    for (const path of paths) {
      if (existsSync(path)) continue
      if (!missing.some(row => normalize(row.path) === normalize(path))) missing.push({ path, quarantinedAt: null })
    }
  }
  return missing
}

function workspaceRoot(db: DatabaseSync, workspaceId: string): string {
  const row = db.prepare('SELECT root FROM workspaces WHERE id = ?').get(workspaceId) as { root: string } | undefined
  if (!row) throw new Error(`unknown workspace: ${workspaceId}`)
  return row.root
}

function repositories(root: string, requested?: string): string[] {
  if (requested) return [resolve(requested)]
  const found: string[] = []
  const stack = [resolve(root)]
  while (stack.length > 0) {
    const dir = stack.pop()!
    let entries: Dirent[]
    try { entries = readdirSync(dir, { withFileTypes: true }) } catch { continue }
    if (entries.some(entry => entry.name === '.git')) { found.push(dir); continue }
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name.toLowerCase() !== 'node_modules') stack.push(join(dir, entry.name))
    }
  }
  return found
}

function safetyReason(db: DatabaseSync, workspaceId: string, root: string, candidate: Worktree, primary: Worktree, target: string, gracePeriodMs?: number): string | null {
  if (normalize(candidate.path) === normalize(primary.path)) return 'primary checkout'
  if (candidate.locked) return 'worktree locked'
  if (!candidate.branch || !candidate.head) return 'detached branch'
  try { git(candidate.path, 'merge-base', '--is-ancestor', candidate.head, target) }
  catch { return `not merged into ${target}` }
  const status = git(candidate.path, 'status', '--porcelain')
  if (status !== '') {
    const lines = status.split(/\r?\n/).filter(Boolean)
    const hasUntracked = lines.some(line => line.startsWith('??'))
    return hasUntracked ? `untracked: ${lines.filter(line => line.startsWith('??')).length} file(s)`
      : `uncommitted: ${lines.length} file(s)`
  }
  const profiles = db.prepare(`SELECT id, turn_state, turn_state_at, worktrees FROM agents
    WHERE workspace_id = ? AND retired_at IS NULL`).all(workspaceId) as unknown as Array<{ id: string; turn_state: string | null; turn_state_at: string | null; worktrees: string | null }>
  const bound = profiles.filter(profile => {
    try { return (JSON.parse(profile.worktrees ?? '[]') as string[]).some(path => normalize(path) === normalize(candidate.path)) }
    catch { return false }
  })
  const activeLeases = db.prepare(`SELECT agent_id FROM leases WHERE workspace_id = ? AND released_at IS NULL AND expires_at > ?`)
    .all(workspaceId, new Date().toISOString()) as unknown as Array<{ agent_id: string }>
  if (bound.some(profile => profile.turn_state === 'working')) return 'running turn bound to worktree'
  if (bound.some(profile => activeLeases.some(lease => lease.agent_id === profile.id))) return 'active lease bound to worktree'
  // Grace period: protect worktrees of workers who recently ended their turn
  if (gracePeriodMs !== undefined && gracePeriodMs > 0) {
    const graceCutoff = Date.now() - gracePeriodMs
    for (const profile of bound) {
      if (profile.turn_state_at) {
        const turnEndTime = Date.parse(profile.turn_state_at)
        if (!Number.isNaN(turnEndTime) && turnEndTime >= graceCutoff) {
          return 'worker turn ended recently (grace period)'
        }
      }
    }
  }
  const leasePaths = db.prepare(`SELECT paths_json FROM leases WHERE workspace_id = ? AND released_at IS NULL AND expires_at > ?`)
    .all(workspaceId, new Date().toISOString()) as unknown as Array<{ paths_json: string }>
  const prefix = relative(root, candidate.path).replace(/\\/g, '/').replace(/\/$/, '').toLowerCase()
  for (const row of leasePaths) {
    try {
      const paths = JSON.parse(row.paths_json) as string[]
      if (paths.some(path => {
        const value = path.replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase()
        return value === prefix || value.startsWith(prefix + '/')
      })) return 'active lease on worktree paths'
    } catch { /* malformed lease data cannot be mapped to this worktree */ }
  }
  return null
}

function detachReapedPath(db: DatabaseSync, workspaceId: string, path: string): void {
  db.prepare("UPDATE checkouts SET disk_state = 'reaped', retired_at = ? WHERE path = ?")
    .run(new Date().toISOString(), path)
  const agents = db.prepare('SELECT id, worktrees FROM agents WHERE workspace_id = ? AND retired_at IS NULL')
    .all(workspaceId) as unknown as Array<{ id: string; worktrees: string | null }>
  for (const agent of agents) {
    try {
      const paths = JSON.parse(agent.worktrees ?? '[]') as string[]
      const kept = paths.filter(item => normalize(item) !== normalize(path))
      if (kept.length !== paths.length) db.prepare('UPDATE agents SET worktrees = ? WHERE id = ?').run(JSON.stringify(kept), agent.id)
    } catch { /* malformed bindings are retained for manual repair */ }
  }
}

/** Shared plan/apply core. Destructive git removal is always without --force. */
export function reapWorktrees(db: DatabaseSync, workspaceId: string, options: ReapOptions = {}): ReapResult {
  ensureReaperSchema(db)
  const missing = synchronizeMissingWorktrees(db, workspaceId, options.apply === true)
  const wsRoot = workspaceRoot(db, workspaceId)
  const codeRoot = join(wsRoot, 'Code')
  const roots = repositories(existsSync(codeRoot) ? codeRoot : wsRoot, options.repo)
  const candidates: ReapCandidate[] = []
  const removed: ReapCandidate[] = []
  const at = (options.now ?? new Date()).toISOString()
  for (const repo of roots) {
    const trees = listWorktrees(repo)
    const primary = trees[0]
    if (!primary) continue
    const target = options.target ?? primary.branch
    if (!target) {
      // No valid target (primary is detached and no --target given): mark all as ineligible
      for (const tree of trees) {
        candidates.push({
          path: tree.path,
          branch: tree.branch,
          commit: tree.head,
          target: null,
          eligible: false,
          reason: 'no merge target (primary checkout detached; use --target)',
        })
      }
      continue
    }
    for (const tree of trees) {
      const reason = safetyReason(db, workspaceId, wsRoot, tree, primary, target, options.gracePeriodMs)
      const item: ReapCandidate = {
        path: tree.path, branch: tree.branch, commit: tree.head, target,
        eligible: reason === null, reason: reason ?? 'reapable',
      }
      if (reason === null) item.restoreCommand = `git worktree add "${tree.path}" "${tree.branch}"`
      candidates.push(item)
      if (reason !== null || options.apply !== true) continue
      try {
        git(repo, 'worktree', 'remove', tree.path)
      } catch (error: unknown) {
        const detail = error instanceof Error ? error.message : String(error)
        item.eligible = false
        item.reason = `git worktree remove failed: ${detail}`
        item.error = detail
        continue
      }
      detachReapedPath(db, workspaceId, tree.path)
      const receipt = { path: tree.path, branch: tree.branch!, commit: tree.head!, target, removedAt: at,
        restoreCommand: item.restoreCommand! }
      try {
        db.prepare(`INSERT INTO worktree_reap_receipts (workspace_id, path, branch, commit_hash, target, removed_at, restore_command)
          VALUES (?, ?, ?, ?, ?, ?, ?)`).run(workspaceId, receipt.path, receipt.branch, receipt.commit, receipt.target, at, receipt.restoreCommand)
        const file = join(storeHome(), 'worktree-reap-receipts.jsonl')
        mkdirSync(dirname(file), { recursive: true })
        appendFileSync(file, `${JSON.stringify(receipt)}\n`, 'utf8')
      } catch (error: unknown) {
        const detail = error instanceof Error ? error.message : String(error)
        item.error = (item.error ? item.error + '; ' : '') + `receipt write failed: ${detail}`
      }
      removed.push(item)
    }
  }
  const pruneCommand = roots.length === 0 ? null : `git -C "${roots[0]}" worktree prune --dry-run`
  let pruneReport: string[] = []
  if (roots.length > 0) {
    try { pruneReport = git(roots[0]!, 'worktree', 'prune', '--dry-run', '--verbose').split(/\r?\n/).filter(Boolean) }
    catch { pruneReport = ['prune dry-run unavailable'] }
  }
  return { dryRun: options.apply !== true, candidates, removed, missing, pruneCommand, pruneReport }
}
