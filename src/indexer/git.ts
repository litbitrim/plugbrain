/**
 * Git graph — branches, worktrees, commits, and which files each commit touched.
 *
 * The contract binds a workspace to exactly one canonical folder AND one
 * authoritative main, and requires that every mission run in its own isolated
 * worktree. None of that is checkable unless the brain actually knows the
 * repository's shape, so this reads it directly from git rather than inferring
 * it from paths.
 *
 * Everything here is read-only. The brain observes the repository; it never
 * mutates it — that belongs to the change pipeline, under review gates.
 */
import { execFileSync } from 'node:child_process'
import type { DatabaseSync } from 'node:sqlite'

export interface GitWorktree { path: string; branch: string | null; head: string | null; bare: boolean }
export interface GitCommit { sha: string; author: string; at: string; subject: string; files: string[] }

export interface GitSnapshot {
  isRepo: boolean
  root: string | null
  /**
   * True when the workspace root IS the repository root. The contract says one
   * workspace is one repository with one authoritative main; a workspace that
   * is merely a subfolder of some other repo silently violates that, so it is
   * surfaced rather than smoothed over.
   */
  isRepoRoot: boolean
  branch: string | null
  head: string | null
  /** Uncommitted paths — the brain must never claim a clean tree that isn't. */
  dirty: string[]
  worktrees: GitWorktree[]
  commits: GitCommit[]
  error: string | null
}

/* Control characters as delimiters: a commit subject can contain anything a
   human types, including newlines and pipes, but never these. */
const REC = String.fromCharCode(1)
const SEP = String.fromCharCode(2)

const git = (root: string, args: string[]): string =>
  execFileSync('git', ['-C', root, ...args], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()

/**
 * Run git and return its trimmed stdout, or `null` when git refuses.
 *
 * Callers that read a repository's SHAPE (does this folder have an origin?
 * which worktree is the main one?) ask many small questions, most of which are
 * legitimately unanswerable: not a repository, unborn branch, no remote, no
 * worktrees. A throw per question would make "not a repo" indistinguishable
 * from "git is broken", so the refusal is returned as a value.
 */
export function gitText(root: string, args: string[]): string | null {
  try { return git(root, args) } catch { return null }
}

/**
 * Read the repository state for a workspace root. A folder that is not a git
 * repository is a normal answer, not an error — plenty of useful workspaces
 * are not versioned, and saying so is more useful than throwing.
 */
export function readGit(root: string, commitLimit = 60): GitSnapshot {
  const empty: GitSnapshot = {
    isRepo: false, root: null, isRepoRoot: false, branch: null, head: null,
    dirty: [], worktrees: [], commits: [], error: null,
  }
  try {
    const top = git(root, ['rev-parse', '--show-toplevel'])
    if (!top) return empty

    // Path comparison without regex: backslash escaping here is a trap.
    const normalise = (value: string): string => {
      let v = value.split(String.fromCharCode(92)).join('/').toLowerCase()
      while (v.endsWith('/')) v = v.slice(0, -1)
      return v
    }
    const snapshot: GitSnapshot = {
      ...empty, isRepo: true, root: top,
      isRepoRoot: normalise(top) === normalise(root),
    }

    try { snapshot.branch = git(root, ['rev-parse', '--abbrev-ref', 'HEAD']) } catch { /* unborn branch */ }
    try { snapshot.head = git(root, ['rev-parse', 'HEAD']) } catch { /* no commits yet */ }

    try {
      snapshot.dirty = git(root, ['status', '--porcelain'])
        .split('\n').filter(Boolean)
        .map(line => line.slice(3).trim())
    } catch { /* leave empty */ }

    // `git worktree list --porcelain` is the only reliable source: a mission's
    // isolated checkout is invisible to anything that only looks at branches.
    try {
      let current: Partial<GitWorktree> = {}
      for (const line of git(root, ['worktree', 'list', '--porcelain']).split('\n')) {
        if (line.startsWith('worktree ')) {
          if (current.path) snapshot.worktrees.push(current as GitWorktree)
          current = { path: line.slice('worktree '.length), branch: null, head: null, bare: false }
        } else if (line.startsWith('HEAD ')) current.head = line.slice('HEAD '.length)
        else if (line.startsWith('branch ')) current.branch = line.slice('branch '.length).replace('refs/heads/', '')
        else if (line === 'bare') current.bare = true
      }
      if (current.path) snapshot.worktrees.push(current as GitWorktree)
    } catch { /* older git, or no worktrees */ }

    try {
      // A record separator keeps subjects containing newlines from splitting a commit.
      const raw = git(root, [
        'log', `-${commitLimit}`, '--name-only', '--no-merges',
        `--pretty=format:${REC}%H${SEP}%an${SEP}%aI${SEP}%s`,
      ])
      for (const chunk of raw.split(REC)) {
        if (!chunk.trim()) continue
        const [header, ...rest] = chunk.split('\n')
        const [sha, author, at, subject] = header.split(SEP)
        if (!sha) continue
        snapshot.commits.push({
          sha, author: author ?? '', at: at ?? '', subject: subject ?? '',
          files: rest.map(f => f.trim()).filter(Boolean),
        })
      }
    } catch { /* shallow clone or empty history */ }

    return snapshot
  } catch (error) {
    // Not a repository is the common case; anything else is worth reporting.
    const message = error instanceof Error ? error.message : String(error)
    return /not a git repository/i.test(message) ? empty : { ...empty, error: message }
  }
}

/**
 * Attribute files to their last commit, so the Surface level can answer
 * "which commit did this land in" without shelling out per file.
 */
export function lastCommitByFile(snapshot: GitSnapshot): Map<string, GitCommit> {
  const map = new Map<string, GitCommit>()
  for (const commit of snapshot.commits) {
    for (const file of commit.files) {
      if (!map.has(file)) map.set(file, commit)   // commits are newest-first
    }
  }
  return map
}

/** Persist the git view so surfaces read it from the store like everything else. */
export function storeGit(db: DatabaseSync, workspaceId: string, snapshot: GitSnapshot): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS git_state (
      workspace_id TEXT PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,
      is_repo INTEGER NOT NULL, is_repo_root INTEGER NOT NULL DEFAULT 0,
      root TEXT, branch TEXT, head TEXT,
      dirty_count INTEGER NOT NULL DEFAULT 0,
      worktrees_json TEXT NOT NULL DEFAULT '[]',
      commits_json TEXT NOT NULL DEFAULT '[]',
      error TEXT, read_at TEXT NOT NULL
    );
  `)
  // The table may predate this column; adding it in place keeps an existing
  // brain usable instead of demanding the database be thrown away.
  const columns = (db.prepare(`PRAGMA table_info(git_state)`).all() as { name: string }[])
    .map(c => c.name)
  if (!columns.includes('is_repo_root')) {
    db.exec(`ALTER TABLE git_state ADD COLUMN is_repo_root INTEGER NOT NULL DEFAULT 0`)
  }

  db.prepare(
    `INSERT INTO git_state
       (workspace_id, is_repo, is_repo_root, root, branch, head, dirty_count, worktrees_json, commits_json, error, read_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(workspace_id) DO UPDATE SET
       is_repo = excluded.is_repo, is_repo_root = excluded.is_repo_root,
       root = excluded.root, branch = excluded.branch,
       head = excluded.head, dirty_count = excluded.dirty_count,
       worktrees_json = excluded.worktrees_json, commits_json = excluded.commits_json,
       error = excluded.error, read_at = excluded.read_at`
  ).run(
    workspaceId, snapshot.isRepo ? 1 : 0, snapshot.isRepoRoot ? 1 : 0,
    snapshot.root, snapshot.branch, snapshot.head,
    snapshot.dirty.length,
    JSON.stringify(snapshot.worktrees),
    // Commit file lists are the bulk; keep the most recent ones addressable
    // without turning one row into megabytes.
    JSON.stringify(snapshot.commits.slice(0, 40)),
    snapshot.error, new Date().toISOString(),
  )
}
