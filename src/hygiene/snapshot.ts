/**
 * Git-Chaos-Schutz, step 4: rescue work into a git object, on explicit command only.
 *
 * The collector only shows what is at risk; it must never touch a repository.
 * This module is the one place allowed to write, and only because a human asked
 * for it by name (`plugbrain hygiene --wip-snapshot`). It follows the W1 method:
 *
 *   - a TEMP index (`GIT_INDEX_FILE`) is filled with `read-tree HEAD` + `add -A`,
 *   - the tree is committed with `commit-tree` under `refs/wip/<date>/<name>`.
 *
 * The working tree, the real index and HEAD are never the target: `add` writes
 * to the temp index, `commit-tree` writes an object, `update-ref` writes the
 * ref. All three are read back before and after and compared, so the guarantee
 * is proven per checkout instead of asserted.
 *
 * Nothing is ever pushed, deleted or pruned. A checkout with no unsaved work is
 * skipped — a WIP ref that holds the same tree as HEAD would be noise.
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, isAbsolute, join, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'

export interface WipSnapshotEntry {
  checkout: string
  /** Branch that was checked out when the snapshot was taken. */
  branch: string | null
  /** The ref the rescue landed on, or null when nothing could be written. */
  ref: string | null
  /** The commit written to `ref`, or null on failure. */
  commit: string | null
  /** Paths the WIP commit holds. */
  files: number
  /** Proof that the snapshot did not alter the working tree. */
  treeUnchanged: boolean
  /** Proof that the snapshot did not alter the real index. */
  indexUnchanged: boolean
  /** Proof that the snapshot did not move HEAD. */
  headUnchanged: boolean
  /** Why the rescue failed, when it did. */
  error: string | null
}

export interface WipSnapshotResult {
  workspace: string
  date: string
  /** Checkouts that got a WIP ref. */
  created: number
  /** Checkouts that had nothing to rescue. */
  skipped: number
  entries: WipSnapshotEntry[]
  unavailable: string[]
}

export interface SnapshotOptions {
  /** The date half of `refs/wip/<date>/<name>`. Defaults to today, UTC. */
  date?: string
  /** Injected clock so tests do not depend on the wall time. */
  now?: Date
  /** Per-git-command time limit, milliseconds. */
  timeoutMs?: number
}

const DEFAULT_TIMEOUT_MS = 15_000

const MB = 1024 * 1024

/** `2026-09-26` in UTC, the shape the W1 method uses. */
const utcDate = (now: Date): string => now.toISOString().slice(0, 10)

/**
 * A ref component safe for git: no spaces, no `..`, no leading dash. Slashes
 * become dashes so every checkout gets one flat, readable name under the date.
 */
function slug(text: string, fallback: string): string {
  const cleaned = text
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/\.\.+/g, '.')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
  return cleaned === '' ? fallback : cleaned
}

/** Git the way this module needs it: never interactive, never on the real index. */
function git(
  cwd: string,
  args: string[],
  env: NodeJS.ProcessEnv,
  timeoutMs: number,
): string {
  return execFileSync('git', ['--no-optional-locks', '-C', cwd, ...args], {
    encoding: 'utf8',
    timeout: timeoutMs,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env,
    maxBuffer: 16 * MB,
  }).trim()
}

/** The same, but "git did not answer" is a value instead of an exception. */
function gitTry(
  cwd: string,
  args: string[],
  env: NodeJS.ProcessEnv,
  timeoutMs: number,
): string | null {
  try {
    return git(cwd, args, env, timeoutMs)
  } catch {
    return null
  }
}

interface CheckoutRow {
  id: string
  path: string
  branch: string | null
  relPrefix: string
  repo: string
}

/** A stable fingerprint of what must not change: tree, index and HEAD. */
interface Fingerprint {
  status: string | null
  head: string | null
  indexHash: string | null
}

/** Hash a file's bytes, or "absent" — a missing index is itself a fact. */
function fileHash(path: string): string | null {
  if (!existsSync(path)) return 'absent'
  try {
    return createHash('sha1').update(readFileSync(path)).digest('hex')
  } catch {
    return null
  }
}

/** Where the real index of a checkout lives (a worktree keeps its own). */
function indexPath(cwd: string, env: NodeJS.ProcessEnv, timeoutMs: number): string | null {
  const dir = gitTry(cwd, ['rev-parse', '--absolute-git-dir'], env, timeoutMs)
    ?? gitTry(cwd, ['rev-parse', '--git-dir'], env, timeoutMs)
  if (dir === null || dir === '') return null
  const absolute = isAbsolute(dir) ? dir : resolve(cwd, dir)
  return join(absolute, 'index')
}

function fingerprint(cwd: string, env: NodeJS.ProcessEnv, timeoutMs: number): Fingerprint {
  const index = indexPath(cwd, env, timeoutMs)
  return {
    status: gitTry(cwd, ['status', '--porcelain=v1', '--untracked-files=all'], env, timeoutMs),
    head: gitTry(cwd, ['rev-parse', 'HEAD'], env, timeoutMs),
    indexHash: index === null ? null : fileHash(index),
  }
}

/** The three proofs a rescue must produce, check by check. */
function unchanged(before: Fingerprint, after: Fingerprint): {
  treeUnchanged: boolean
  indexUnchanged: boolean
  headUnchanged: boolean
} {
  return {
    treeUnchanged: before.status !== null && before.status === after.status,
    indexUnchanged: before.indexHash !== null && before.indexHash === after.indexHash,
    headUnchanged: before.head === after.head,
  }
}

/**
 * The checkouts of a workspace that currently hold work only this disk has.
 *
 * This is deliberately the collector's own question, asked the same way, so the
 * fix command can never act on a different set than the finding named.
 */
function dirtyCheckouts(db: DatabaseSync, workspaceId: string): CheckoutRow[] {
  const rows = db.prepare(
    `SELECT c.id, c.path, c.branch, c.rel_prefix AS relPrefix, r.name AS repo
       FROM checkouts c
       JOIN planets p ON p.id = c.planet_id
       JOIN repos r ON r.id = c.repo_id
      WHERE p.workspace_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(workspaceId) as unknown as CheckoutRow[]
  return rows.filter(row => {
    if (!existsSync(row.path)) return false
    const status = gitTry(row.path, ['status', '--porcelain=v1', '--untracked-files=all'],
      process.env, DEFAULT_TIMEOUT_MS)
    return status !== null && status !== ''
  })
}

/**
 * Rescue the uncommitted work of one checkout into `refs/wip/<date>/<name>`.
 *
 * Returns an entry whose `treeUnchanged`/`indexUnchanged`/`headUnchanged` are
 * the proof (or the refutation) that nothing outside the WIP ref moved.
 */
function snapshotOne(
  row: CheckoutRow,
  date: string,
  timeoutMs: number,
): WipSnapshotEntry {
  const name = slug(row.relPrefix === '' ? row.repo : row.relPrefix, slug(row.repo, 'checkout'))
  const ref = `refs/wip/${date}/${name}`

  // The temp index must not live inside the checkout: a `git status` in another
  // terminal would otherwise see it as an untracked file and panic a human.
  const indexDir = mkdtempSync(join(tmpdir(), 'plugbrain-wip-'))
  const tempIndex = join(indexDir, 'index')
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    GIT_INDEX_FILE: tempIndex,
    // A rescue must succeed on a machine with no git identity configured;
    // otherwise the one command that saves the work would be the one that fails.
    GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME ?? 'PlugBrain',
    GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? 'plugbrain@localhost',
    GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME ?? 'PlugBrain',
    GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL ?? 'plugbrain@localhost',
  }

  const base = {
    checkout: row.path,
    branch: row.branch,
    ref: null as string | null,
    commit: null as string | null,
    files: 0,
    treeUnchanged: false,
    indexUnchanged: false,
    headUnchanged: false,
    error: null as string | null,
  }

  try {
    const before = fingerprint(row.path, process.env, timeoutMs)

    // Temp index starts from HEAD so the WIP commit is a real child of history.
    // A checkout with no commits yet has no HEAD; an empty tree is then right.
    if (gitTry(row.path, ['read-tree', 'HEAD'], env, timeoutMs) === null) {
      git(row.path, ['read-tree', '--empty'], env, timeoutMs)
    }
    git(row.path, ['add', '-A'], env, timeoutMs)
    const tree = git(row.path, ['write-tree'], env, timeoutMs)
    const head = gitTry(row.path, ['rev-parse', 'HEAD'], env, timeoutMs)

    const message = `wip(${date}): uncommitted work of ${name} ` +
      '(plugbrain hygiene --wip-snapshot)'
    const parentArgs = head === null ? [] : ['-p', head]
    const commit = git(row.path, ['commit-tree', tree, ...parentArgs, '-m', message], env, timeoutMs)

    // Only now is anything outside the temp directory touched: exactly one ref.
    git(row.path, ['update-ref', ref, commit], env, timeoutMs)

    const files = gitTry(row.path, ['diff-tree', '--no-commit-id', '--name-only', '-r', commit],
      env, timeoutMs)?.split(/\r?\n/).filter(line => line.trim() !== '').length
      ?? gitTry(row.path, ['ls-tree', '-r', '--name-only', commit], env, timeoutMs)
        ?.split(/\r?\n/).filter(line => line.trim() !== '').length
      ?? 0

    const after = fingerprint(row.path, process.env, timeoutMs)
    return { ...base, ref, commit, files, ...unchanged(before, after) }
  } catch (error) {
    const after = fingerprint(row.path, process.env, timeoutMs)
    const before = after // best effort: whatever is true now is what we report
    return {
      ...base,
      ...unchanged(before, after),
      error: error instanceof Error ? error.message.split('\n')[0]! : String(error),
    }
  } finally {
    try { rmSync(indexDir, { recursive: true, force: true }) } catch { /* best effort */ }
  }
}

/**
 * Rescue the uncommitted work of ONE repository path, registered or not.
 *
 * The machine-wide census finds dirt in repositories the brain never registered
 * (the owner's 25.09. case: 49 checkouts the brain knew plus others it did not),
 * and the honest fix for those has to name the path. This is the same rescue as
 * the per-workspace one — same temp index, same proofs — for a single path, so
 * `plugbrain hygiene --wip-snapshot --repo <pfad>` can save work outside the
 * brain without first registering the repository.
 *
 * Only call this from an explicit command.
 */
export function snapshotRepo(path: string, options: SnapshotOptions = {}): WipSnapshotEntry {
  const now = options.now ?? new Date()
  const date = options.date ?? utcDate(now)
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const resolved = resolve(path)
  const branch = gitTry(resolved, ['rev-parse', '--abbrev-ref', 'HEAD'], process.env, timeoutMs)
  const name = basename(resolved) || 'repo'
  return snapshotOne({ id: 'external', path: resolved, branch, relPrefix: name, repo: name }, date, timeoutMs)
}

/**
 * Rescue every checkout of a workspace that holds uncommitted work.
 *
 * Only call this from an explicit command: it is the single function in the
 * hygiene lane that writes to a repository.
 */
export function createWipSnapshots(
  db: DatabaseSync,
  workspaceId: string,
  options: SnapshotOptions = {},
): WipSnapshotResult {
  const now = options.now ?? new Date()
  const date = options.date ?? utcDate(now)
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS

  const workspace = db.prepare('SELECT id FROM workspaces WHERE id = ?').get(workspaceId)
  if (workspace === undefined) throw new Error(`unknown workspace: ${workspaceId}`)

  const all = db.prepare(
    `SELECT c.id, c.path, c.branch, c.rel_prefix AS relPrefix, r.name AS repo
       FROM checkouts c
       JOIN planets p ON p.id = c.planet_id
       JOIN repos r ON r.id = c.repo_id
      WHERE p.workspace_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(workspaceId) as unknown as CheckoutRow[]
  const dirty = dirtyCheckouts(db, workspaceId)

  const unavailable: string[] = []
  const entries: WipSnapshotEntry[] = []
  for (const row of dirty) {
    const entry = snapshotOne(row, date, timeoutMs)
    if (entry.error !== null) unavailable.push(`wip-snapshot for ${row.path}: ${entry.error}`)
    entries.push(entry)
  }

  return {
    workspace: workspaceId,
    date,
    created: entries.filter(entry => entry.ref !== null && entry.error === null).length,
    skipped: all.length - dirty.length,
    entries,
    unavailable,
  }
}
