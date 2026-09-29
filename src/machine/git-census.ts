/**
 * Hardware awareness, step 2: every git repository on this machine.
 *
 * The owner's 25.09. lesson was that the brain only watched the 49 checkouts it
 * had registered, while unbacked-up work also sat in repositories nobody had
 * registered at all. This module walks the configured roots, finds every `.git`,
 * and reports the same honest facts the per-checkout guard does — dirt,
 * unpushed branches, worktrees, stashes, age, size — plus the one thing only a
 * machine-wide view can answer: is this repository known to the brain at all?
 *
 * It is bounded on purpose: a time budget, a directory cap, a depth limit and a
 * denylist for the folders (node_modules, Temp, caches) that are never a
 * repository worth reporting. When a limit is hit the result says so through
 * `complete: false` rather than pretending the disk ended.
 *
 * The last result is cached and refreshed in the background, so the API answers
 * from the previous scan instead of making a request wait for a whole disk walk.
 */
import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { canonicalPath } from '../planet.ts'
import {
  boundedSizeMb, gitText, isOrphan, staleDays, statusCounts, stashCount, unpushedBranches,
  type HygieneUnpushedBranch,
} from '../hygiene/collect.ts'

export interface CensusRepo {
  path: string
  registered: boolean
  branch: string | null
  dirtyFiles: number | null
  untrackedFiles: number | null
  unpushed: HygieneUnpushedBranch[]
  worktrees: number
  orphanWorktrees: number
  stashes: number | null
  lastCommitDays: number | null
  gitSizeMb: number | null
  workTreeSizeMb: number | null
}

export interface CensusReport {
  scannedAt: string
  roots: string[]
  complete: boolean
  repos: CensusRepo[]
  totals: { repos: number; dirty: number; unpushedBranches: number; orphanWorktrees: number }
  unavailable: string[]
}

export interface CensusOptions {
  /** Where to walk. Defaults to the home directory and the drive roots. */
  roots?: string[]
  /** Directories whose every path segment is skipped. */
  deny?: string[]
  maxDepth?: number
  maxDirs?: number
  maxRepos?: number
  budgetMs?: number
  perRepoTimeoutMs?: number
  sizeBudgetMs?: number
  sizeMaxEntries?: number
  now?: Date
  /** Recompute even when a fresh cached result exists. */
  refresh?: boolean
}

const DEFAULTS = {
  maxDepth: 6,
  maxDirs: 120_000,
  maxRepos: 500,
  budgetMs: 20_000,
  perRepoTimeoutMs: 4_000,
  sizeBudgetMs: 1_500,
  sizeMaxEntries: 60_000,
  cacheTtlMs: 10 * 60 * 1000,
}

/**
 * Folders that are never a repository a human wants reported: dependency trees,
 * temp dirs, OS folders and package caches. Compared case-insensitively on the
 * segment name, so `node_modules` is skipped wherever it appears.
 */
const DENY = new Set([
  'node_modules', 'appdata', 'temp', 'tmp', '$recycle.bin', 'system volume information',
  '.cache', '.npm', '.gradle', '.m2', '.cargo', '.rustup', '.nuget', '.pnpm-store',
  '.vscode', '.cursor', '.cursor-server', '.vscode-server', '.git', 'library',
  '.trash', 'lost+found', 'proc', 'sys', 'dev', 'run', 'snap',
])

/** Windows SystemDrive plus every lettered drive, or `/` elsewhere. */
export function defaultCensusRoots(): string[] {
  if (process.platform !== 'win32') return [homedir(), '/']
  const roots = [homedir()]
  for (let code = 'C'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code += 1) {
    const root = `${String.fromCharCode(code)}:\\`
    if (existsSync(root)) roots.push(root)
  }
  return roots
}

/** Measure one repository directory. Read-only git only, everything bounded. */
export function measureRepo(
  path: string,
  registered: boolean,
  options: CensusOptions,
  now: Date,
): CensusRepo {
  const timeout = options.perRepoTimeoutMs ?? DEFAULTS.perRepoTimeoutMs
  const sizeBudget = options.sizeBudgetMs ?? DEFAULTS.sizeBudgetMs
  const sizeMax = options.sizeMaxEntries ?? DEFAULTS.sizeMaxEntries
  const counts = statusCounts(path, timeout)
  const worktrees = listWorktrees(path, timeout)
  const gitDir = join(path, '.git')
  return {
    path,
    registered,
    branch: currentBranch(path, timeout),
    dirtyFiles: counts?.dirty ?? null,
    untrackedFiles: counts?.untracked ?? null,
    unpushed: unpushedBranches(path, timeout),
    worktrees: worktrees.total,
    orphanWorktrees: worktrees.orphans,
    stashes: stashCount(path, timeout),
    lastCommitDays: staleDays(path, timeout, now),
    gitSizeMb: boundedSizeMb(gitDir, sizeBudget, sizeMax),
    workTreeSizeMb: boundedSizeMb(path, sizeBudget, sizeMax),
  }
}

function currentBranch(cwd: string, timeoutMs: number): string | null {
  const out = gitText(cwd, ['rev-parse', '--abbrev-ref', 'HEAD'], timeoutMs)
  if (out === null) return null
  const branch = out.trim()
  return branch === '' || branch === 'HEAD' ? null : branch
}

interface WorktreeRow { path: string; orphan: boolean }

/**
 * The linked worktrees of a repository, with those whose directory is gone.
 *
 * `git worktree list --porcelain` prints one block per worktree; a block whose
 * `worktree` path no longer exists is exactly the orphan the owner wants seen,
 * because its registration would otherwise be pruned and its files forgotten.
 */
export function listWorktrees(cwd: string, timeoutMs: number): { total: number; orphans: number; rows: WorktreeRow[] } {
  const out = gitText(cwd, ['worktree', 'list', '--porcelain'], timeoutMs)
  if (out === null) return { total: 0, orphans: 0, rows: [] }
  const rows: WorktreeRow[] = []
  for (const block of out.split(/\r?\n\r?\n/)) {
    const line = block.split(/\r?\n/).find(entry => entry.startsWith('worktree '))
    if (line === undefined) continue
    const path = line.slice('worktree '.length).trim()
    if (path === '') continue
    rows.push({ path, orphan: isOrphan(path) })
  }
  return { total: rows.length, orphans: rows.filter(row => row.orphan).length, rows }
}

/** Walk the roots and return every repository found, within the limits. */
export function scanGitRepos(
  registeredPaths: Set<string>,
  options: CensusOptions = {},
): { repos: CensusRepo[]; complete: boolean; roots: string[] } {
  const now = options.now ?? new Date()
  const roots = (options.roots ?? defaultCensusRoots()).map(root => canonicalPath(root))
  const deny = options.deny ?? []
  const maxDepth = options.maxDepth ?? DEFAULTS.maxDepth
  const maxDirs = options.maxDirs ?? DEFAULTS.maxDirs
  const maxRepos = options.maxRepos ?? DEFAULTS.maxRepos
  const deadline = Date.now() + (options.budgetMs ?? DEFAULTS.budgetMs)
  const denyNames = new Set([...DENY, ...deny.map(name => name.toLowerCase())])
  const normalizedRegisteredPaths = new Set([...registeredPaths].map(norm))

  const repos: CensusRepo[] = []
  let complete = true
  let dirs = 0
  const seen = new Set<string>()
  const stack: { dir: string; depth: number }[] = roots.map(root => ({ dir: root, depth: 0 }))

  while (stack.length > 0) {
    if (dirs >= maxDirs || repos.length >= maxRepos || Date.now() > deadline) { complete = false; break }
    const { dir, depth } = stack.pop()!
    if (seen.has(dir)) continue
    seen.add(dir)
    dirs += 1

    let children: string[]
    try {
      children = readdirSync(dir)
    } catch {
      continue
    }

    if (children.includes('.git')) {
      repos.push(measureRepo(dir, normalizedRegisteredPaths.has(norm(dir)), options, now))
      // Do not descend into a repository's working tree: its size is measured
      // by the bounded walk above, and the tree itself is not a place to look
      // for independent repositories.
      continue
    }

    if (depth >= maxDepth) { complete = false; continue }
    for (const name of children) {
      if (denyNames.has(name.toLowerCase())) continue
      if (name.startsWith('.')) continue
      stack.push({ dir: join(dir, name), depth: depth + 1 })
    }
  }

  return { repos, complete, roots }
}

const norm = (path: string): string => {
  const canonical = canonicalPath(path).replace(/\\/g, '/').replace(/\/+$/, '')
  return process.platform === 'win32' ? canonical.toLowerCase() : canonical
}

/** Paths of every non-retired checkout the brain knows, as a comparison set. */
export function registeredCheckoutPaths(db: DatabaseSync): Set<string> {
  const rows = db.prepare('SELECT path FROM checkouts WHERE retired_at IS NULL').all() as unknown as { path: string }[]
  return new Set(rows.map(row => norm(row.path)))
}

// ---------------------------------------------------------------------------
// Cache: answer from the last scan, refresh in the background
// ---------------------------------------------------------------------------

interface CacheEntry { report: CensusReport; atMs: number }

let cache: CacheEntry | null = null
let refreshing = false

/**
 * The machine-wide census.
 *
 * First call scans synchronously (bounded). After that a cached result younger
 * than the TTL is returned instantly, and a stale result is returned while a
 * background scan replaces it — so a request never waits for a disk walk once
 * one answer exists.
 */
export function gitCensus(db: DatabaseSync, options: CensusOptions = {}): CensusReport {
  const now = options.now ?? new Date()
  const nowMs = now.getTime()
  const ttl = DEFAULTS.cacheTtlMs
  if (options.refresh !== true && cache !== null && nowMs - cache.atMs < ttl) return cache.report

  if (cache !== null && options.refresh !== true) {
    refreshInBackground(db, options)
    return cache.report
  }

  const report = runCensus(db, options)
  cache = { report, atMs: nowMs }
  return report
}

function runCensus(db: DatabaseSync, options: CensusOptions): CensusReport {
  const now = options.now ?? new Date()
  const { repos, complete, roots } = scanGitRepos(registeredCheckoutPaths(db), options)
  return {
    scannedAt: now.toISOString(),
    roots,
    complete,
    repos: repos.sort((a, b) => a.path.localeCompare(b.path)),
    totals: {
      repos: repos.length,
      dirty: repos.filter(repo => (repo.dirtyFiles ?? 0) > 0 || (repo.untrackedFiles ?? 0) > 0).length,
      unpushedBranches: repos.reduce((sum, repo) => sum + repo.unpushed.length, 0),
      orphanWorktrees: repos.reduce((sum, repo) => sum + repo.orphanWorktrees, 0),
    },
    unavailable: [],
  }
}

/** Scan off the request path. Never throws into the caller, never keeps the process alive. */
export function refreshInBackground(db: DatabaseSync, options: CensusOptions = {}): void {
  if (refreshing) return
  refreshing = true
  const timer = setTimeout(() => {
    try {
      cache = { report: runCensus(db, options), atMs: Date.now() }
    } catch {
      // A failed background scan leaves the previous answer in place.
    } finally {
      refreshing = false
    }
  }, 0)
  timer.unref?.()
}

/** An honest empty answer for a census that has not run yet. */
function emptyCensus(roots: string[]): CensusReport {
  return {
    scannedAt: new Date().toISOString(),
    roots,
    complete: false,
    repos: [],
    totals: { repos: 0, dirty: 0, unpushedBranches: 0, orphanWorktrees: 0 },
    unavailable: ['census'],
  }
}

/**
 * The census WITHOUT ever blocking on a cold scan.
 *
 * An HTTP request must not wait 20 s for a disk walk. This returns the last
 * scan at once, starts a background one when the cache is cold or stale, and
 * on the very first call answers `complete: false` with `unavailable: ['census']`
 * rather than pretending the machine has no repositories. Call it from routes;
 * call `gitCensus` only when a human typed a command and expects to wait.
 */
export function gitCensusCached(db: DatabaseSync, options: CensusOptions = {}): CensusReport {
  const ttl = DEFAULTS.cacheTtlMs
  if (cache !== null) {
    if (Date.now() - cache.atMs >= ttl) refreshInBackground(db, options)
    return cache.report
  }
  const roots = (options.roots ?? defaultCensusRoots()).map(root => resolve(root))
  refreshInBackground(db, options)
  return emptyCensus(roots)
}

/** Test hook: forget the cached scan so the next call walks again. */
export function resetCensusCache(): void {
  cache = null
  refreshing = false
}
