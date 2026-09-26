/**
 * Git-Chaos-Schutz, step 1: the collector.
 *
 * On 25.09. 49 checkouts with unsaved work sat around unnoticed until the disk
 * was full. This module is the honest inventory that makes that visible BEFORE
 * it hurts: per registered checkout it reports dirt, stashes, branches nobody
 * pushed, staleness, orphaned worktrees, size and the free disk space.
 *
 * Three rules shape every line here:
 *
 *   - READ ONLY. Only `git` subcommands that cannot change the working tree or
 *     the index are run, and every one of them gets `--no-optional-locks` so
 *     git never refreshes the index behind our back. Nothing is ever deleted,
 *     pruned, stashed or pushed.
 *   - BOUNDED. Every repo gets a time limit, and the size walk has both a time
 *     budget and an entry cap. When a limit is hit the answer is `unavailable`,
 *     never a made-up number.
 *   - PLATFORM HONEST. Anything the store or git cannot answer (a checkout
 *     whose path is gone, a git that does not answer) is reported as missing.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, lstatSync, readFileSync, readdirSync, statfsSync } from 'node:fs'
import { isAbsolute, join, relative, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { liveClaims, type LiveClaim } from '../projections/conflicts.ts'
import { canonicalPath } from '../planet.ts'

/** Level of a finding, worst-first. `ok` is the absence of any finding. */
export type HygieneLevel = 'ok' | 'attention' | 'risk'

/** A branch that lives only on this disk: no upstream, or commits ahead of it. */
export interface HygieneUnpushedBranch {
  branch: string
  ahead: number
  upstream: string | null
}

/** Live brain claims that touch a checkout, grouped per agent. */
export interface HygieneClaim {
  agent: string
  paths: string[]
  /** Other agents holding a live claim on one of the same paths. */
  conflictsWith: string[]
}

/** One registered checkout, as far as the brain can see it right now. */
export interface HygieneCheckout {
  path: string
  repo: string
  branch: string | null
  dirtyFiles: number | null
  untrackedFiles: number | null
  stashes: number | null
  unpushed: HygieneUnpushedBranch[]
  /** Days since the last commit; null when there is no commit or no answer. */
  staleDays: number | null
  /** Size in MB, capped walk; null when the budget ran out. */
  sizeMb: number | null
  /** `.git` points at a git directory that no longer exists. */
  orphan: boolean
  claims: HygieneClaim[]
}

export interface HygieneReport {
  workspace: string
  checkedAt: string
  diskFreeGb: number | null
  summary: { level: HygieneLevel; text: string }
  checkouts: HygieneCheckout[]
  findings: HygieneFinding[]
  unavailable: string[]
}

export interface HygieneFinding {
  level: HygieneLevel
  text: string
  fix: string
  paths: string[]
}

export interface CollectOptions {
  /** Time limit for the git calls of a single checkout. */
  perRepoTimeoutMs?: number
  /** Time budget for the capped size walk of a single checkout. */
  sizeBudgetMs?: number
  /** Entry cap for the size walk, so a huge checkout cannot stall the run. */
  sizeMaxEntries?: number
  /** Injected clock, so tests do not depend on the wall time. */
  now?: Date
}

const DEFAULTS = {
  perRepoTimeoutMs: 4_000,
  sizeBudgetMs: 1_500,
  sizeMaxEntries: 60_000,
}

const MB = 1024 * 1024

/**
 * Run a read-only git command in a checkout.
 *
 * `execFileSync` with an explicit timeout is the only lock we hold: no shell,
 * no `git` config change, no index refresh. A failing command (not a repo, path
 * gone, timeout) answers `null` instead of throwing, because "git did not
 * answer" is a fact about the checkout, not a crash of the brain.
 *
 * Exported so the machine-wide census (src/machine/git-census.ts) reads git
 * through exactly this path — the same flags, the same timeout, the same
 * read-only guarantee — instead of growing a second, subtly different copy.
 */
export function gitText(
  cwd: string,
  args: string[],
  timeoutMs: number,
  env?: NodeJS.ProcessEnv,
): string | null {
  try {
    return execFileSync('git', ['--no-optional-locks', '-C', cwd, ...args], {
      encoding: 'utf8',
      timeout: timeoutMs,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'ignore'],
      env: env === undefined ? process.env : { ...process.env, ...env },
      maxBuffer: 16 * MB,
    })
  } catch {
    return null
  }
}

/** Count dirty (tracked) and untracked paths in one `git status` pass. */
export function statusCounts(cwd: string, timeoutMs: number): { dirty: number; untracked: number } | null {
  const out = gitText(cwd, ['status', '--porcelain=v1', '--untracked-files=all'], timeoutMs)
  if (out === null) return null
  let dirty = 0
  let untracked = 0
  for (const line of out.split(/\r?\n/)) {
    if (line.trim() === '') continue
    if (line.startsWith('??')) untracked += 1
    else dirty += 1
  }
  return { dirty, untracked }
}

export function stashCount(cwd: string, timeoutMs: number): number | null {
  const out = gitText(cwd, ['stash', 'list', '--format=%gd'], timeoutMs)
  if (out === null) return null
  return out.split(/\r?\n/).filter(line => line.trim() !== '').length
}

/**
 * Branches whose only copy is this disk: no upstream, or commits the upstream
 * does not have. `%(upstream:track)` prints `[ahead 3, behind 1]` when there is
 * an upstream and an empty string when there is none.
 */
export function unpushedBranches(cwd: string, timeoutMs: number): HygieneUnpushedBranch[] {
  const out = gitText(
    cwd,
    ['for-each-ref', '--format=%(refname:short)%09%(upstream:short)%09%(upstream:track)', 'refs/heads'],
    timeoutMs,
  )
  if (out === null) return []
  const branches: HygieneUnpushedBranch[] = []
  for (const line of out.split(/\r?\n/)) {
    if (line.trim() === '') continue
    const [branch = '', upstream = '', track = ''] = line.split('\t')
    if (branch === '') continue
    const upstreamShort = upstream.trim() === '' ? null : upstream.trim()
    const aheadMatch = track.match(/ahead\s+(\d+)/)
    const ahead = aheadMatch ? Number(aheadMatch[1]) : 0
    if (upstreamShort === null || ahead > 0) {
      branches.push({ branch: branch.trim(), ahead, upstream: upstreamShort })
    }
  }
  return branches
}

/** Days since the last commit on the currently checked-out branch. */
export function staleDays(cwd: string, timeoutMs: number, now: Date): number | null {
  const out = gitText(cwd, ['log', '-1', '--format=%ct'], timeoutMs)
  if (out === null || out.trim() === '') return null
  const seconds = Number(out.trim())
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  return Math.floor((now.getTime() - seconds * 1000) / 86_400_000)
}

/**
 * A linked worktree whose `.git` file points at a git directory that is gone.
 *
 * Also true when the checkout path itself disappeared: then nothing on this
 * disk can be read from it at all, and calling that "clean" would be a lie.
 */
export function isOrphan(path: string): boolean {
  if (!existsSync(path)) return true
  const dotGit = join(path, '.git')
  if (!existsSync(dotGit)) return true
  try {
    if (lstatSync(dotGit).isDirectory()) return false
    if (!lstatSync(dotGit).isFile()) return true
    const match = readFileSync(dotGit, 'utf8').match(/gitdir:\s*(.+)/i)
    if (match === null) return true
    const target = match[1]!.trim()
    const resolved = isAbsolute(target) ? target : resolve(path, target)
    return !existsSync(resolved)
  } catch {
    return true
  }
}

/**
 * Size of a checkout in MB, bounded.
 *
 * The walk stops at the first deadline or entry cap and returns `null`: for a
 * 66 GB wasteland a partial sum is worse than no number, because a human would
 * read it as the size. `.git` is included — it is exactly the part that grows
 * without anybody noticing.
 */
export function boundedSizeMb(
  root: string,
  budgetMs: number,
  maxEntries: number,
): number | null {
  // A path that is gone has no size. Returning 0 here would read as "empty",
  // which is the one thing an orphaned checkout is not.
  if (!existsSync(root)) return null
  const deadline = Date.now() + budgetMs
  let bytes = 0
  let entries = 0
  const stack: string[] = [root]
  while (stack.length > 0) {
    const dir = stack.pop()!
    let children: string[]
    try {
      children = readdirSync(dir)
    } catch {
      continue
    }
    for (const name of children) {
      entries += 1
      if (entries > maxEntries || Date.now() > deadline) return null
      const child = join(dir, name)
      let stat
      try {
        stat = lstatSync(child)
      } catch {
        continue
      }
      if (stat.isSymbolicLink()) continue
      if (stat.isDirectory()) stack.push(child)
      else if (stat.isFile()) bytes += stat.size
    }
  }
  return Math.round((bytes / MB) * 10) / 10
}

/** Free GB on the volume that holds a path; null when the OS will not say. */
function diskFreeGb(path: string): number | null {
  try {
    const holder = existsSync(path) ? path : resolve(path, '..')
    const stats = statfsSync(holder)
    const free = Number(stats.bavail) * Number(stats.bsize)
    if (!Number.isFinite(free)) return null
    return Math.round((free / (1024 * MB)) * 10) / 10
  } catch {
    return null
  }
}

/** Normalise a path for comparison: forward slashes, no trailing slash. */
function norm(path: string): string {
  return path.replace(/\\/g, '/').replace(/\/+$/, '')
}

interface CheckoutRow {
  id: string
  path: string
  branch: string | null
  relPrefix: string
  repo: string
}

interface AggregateClaim {
  agent: string
  path: string
}

/**
 * Group live brain claims into the per-checkout shape of the contract.
 *
 * A claim belongs to a checkout when the trace names that worktree, or when the
 * claimed path lies inside it. The second rule exists because most claims are
 * workspace-relative and name no worktree: without it, the one finding that
 * matters — two agents about to touch the same module — would never appear.
 */
function claimsByCheckout(
  rows: CheckoutRow[],
  claims: LiveClaim[],
  workspaceRoot: string,
): Map<string, HygieneClaim[]> {
  const byPath = new Map<string, Set<string>>()
  for (const claim of claims) {
    if (claim.agentId === null) continue
    const key = norm(claim.path)
    const agents = byPath.get(key) ?? new Set<string>()
    agents.add(claim.agentId)
    byPath.set(key, agents)
  }

  const result = new Map<string, HygieneClaim[]>()
  for (const row of rows) {
    const rel = norm(relative(canonicalPath(workspaceRoot), canonicalPath(row.path)))
    const dirPrefix = rel === '.' ? '' : rel
    const storedPrefix = norm(row.relPrefix)
    const byAgent = new Map<string, HygieneClaim>()
    for (const claim of claims) {
      if (claim.agentId === null) continue
      const path = norm(claim.path)
      const covered = (prefix: string): boolean =>
        prefix !== '' && (path === prefix || path.startsWith(`${prefix}/`))
      const owned =
        claim.worktreeId === row.id ||
        dirPrefix === '' ||
        covered(dirPrefix) ||
        covered(storedPrefix)
      if (!owned) continue
      const entry = byAgent.get(claim.agentId) ?? { agent: claim.agentId, paths: [], conflictsWith: [] }
      if (!entry.paths.includes(claim.path)) entry.paths.push(claim.path)
      const others = byPath.get(path)
      if (others !== undefined) {
        for (const other of others) {
          if (other !== claim.agentId && !entry.conflictsWith.includes(other)) entry.conflictsWith.push(other)
        }
      }
      byAgent.set(claim.agentId, entry)
    }
    result.set(row.id, [...byAgent.values()])
  }
  return result
}

/**
 * The whole inventory for one workspace.
 *
 * Throws only when the workspace itself is unknown: every per-checkout failure
 * is data (`unavailable`), not an exception, because one broken repo must never
 * hide the state of the other forty-eight.
 */
export function collectHygiene(
  db: DatabaseSync,
  workspaceId: string,
  options: CollectOptions = {},
): HygieneReport {
  const now = options.now ?? new Date()
  const timeout = options.perRepoTimeoutMs ?? DEFAULTS.perRepoTimeoutMs
  const sizeBudget = options.sizeBudgetMs ?? DEFAULTS.sizeBudgetMs
  const sizeMax = options.sizeMaxEntries ?? DEFAULTS.sizeMaxEntries

  const workspace = db.prepare('SELECT id, root FROM workspaces WHERE id = ?')
    .get(workspaceId) as { id: string; root: string } | undefined
  if (workspace === undefined) throw new Error(`unknown workspace: ${workspaceId}`)

  const rows = db.prepare(
    `SELECT c.id, c.path, c.branch, c.rel_prefix AS relPrefix, r.name AS repo
       FROM checkouts c
       JOIN planets p ON p.id = c.planet_id
       JOIN repos r ON r.id = c.repo_id
      WHERE p.workspace_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(workspaceId) as unknown as CheckoutRow[]

  const claims = liveClaims(db, workspaceId)
  const claimsFor = claimsByCheckout(rows, claims, workspace.root)

  const unavailable: string[] = []
  const checkouts: HygieneCheckout[] = []
  const drives = new Set<string>()

  for (const row of rows) {
    const checkoutPath = resolve(row.path)
    const physicalPath = canonicalPath(checkoutPath)
    const counts = statusCounts(physicalPath, timeout)
    if (counts === null) unavailable.push(`git status for ${checkoutPath}`)
    const stashes = stashCount(physicalPath, timeout)
    if (stashes === null) unavailable.push(`stashes for ${checkoutPath}`)
    const sizeMb = boundedSizeMb(physicalPath, sizeBudget, sizeMax)
    if (sizeMb === null) unavailable.push(`sizeMb for ${checkoutPath}`)
    if (existsSync(physicalPath)) drives.add(physicalPath)
    checkouts.push({
      path: checkoutPath,
      repo: row.repo,
      branch: row.branch,
      dirtyFiles: counts?.dirty ?? null,
      untrackedFiles: counts?.untracked ?? null,
      stashes,
      unpushed: unpushedBranches(physicalPath, timeout),
      staleDays: staleDays(physicalPath, timeout, now),
      sizeMb,
      orphan: isOrphan(physicalPath),
      claims: claimsFor.get(row.id) ?? [],
    })
  }

  // One number for the whole report: the fullest volume decides, because that
  // is the one that stops the work first.
  const candidates = [...drives].map(diskFreeGb)
  const workspaceRoot = canonicalPath(workspace.root)
  if (existsSync(workspaceRoot)) candidates.push(diskFreeGb(workspaceRoot))
  const freeSpaces = candidates.filter((gb): gb is number => gb !== null)
  const freeGb = freeSpaces.length === 0
    ? null
    : Math.round(Math.min(...freeSpaces) * 10) / 10
  if (freeGb === null) unavailable.push('diskFreeGb')

  return {
    workspace: workspaceId,
    checkedAt: now.toISOString(),
    diskFreeGb: freeGb,
    summary: { level: 'ok', text: '' },
    checkouts,
    findings: [],
    unavailable,
  }
}

/** Re-export so callers do not have to reach into the projections module. */
export type { LiveClaim }
