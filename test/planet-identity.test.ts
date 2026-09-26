import { execFileSync } from 'node:child_process'
import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { test } from 'node:test'
import { canonicalPath, pinWorkspaceId, workspaceIdFor } from '../src/planet.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

function makeRepo(dir: string): string {
  mkdirSync(dir, { recursive: true })
  git(dir, ['init'])
  writeFileSync(join(dir, 'README.md'), 'identity fixture\n', 'utf8')
  git(dir, ['add', '.'])
  git(dir, ['commit', '-m', 'init'])
  return dir
}

function tempDir(name: string): { dir: string; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-identity-${name}-`))
  const cleanup = (): void => {
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* best effort */ }
  }
  return { dir, cleanup }
}

test('the workspace id derivation is stable across path spellings', () => {
  const { dir, cleanup } = tempDir('spelling')
  try {
    // The id is minted from the canonical path hash: registration of a root —
    // CLI or HTTP API — must land on the SAME row, which means the derivation
    // must still reproduce this exact string.
    const base = canonicalPath(dir)
    const derived = `ws-${createHash('sha256').update(canonicalPath(base).toLowerCase()).digest('hex').slice(0, 12)}`
    assert.equal(workspaceIdFor(base), derived)
    // Same folder spelled with a different case and separator style: Windows
    // paths are case-insensitive, so all spellings are the same folder.
    assert.equal(workspaceIdFor(base.toUpperCase()), derived)
    assert.equal(workspaceIdFor(base.toLowerCase().split('\\').join('/')), derived)
  } finally {
    cleanup()
  }
})

test('a pinned marker survives a folder move and worktrees share it', { skip: skipGit }, () => {
  const { dir, cleanup } = tempDir('move')
  try {
    const repo = makeRepo(join(dir, 'origin'))
    const PINNED = 'ws-0123456789ab'

    pinWorkspaceId(repo, PINNED)
    const marker = join(repo, '.git', 'plugbrain-workspace-id')
    assert.ok(existsSync(marker), 'marker written into the git common dir')
    assert.equal(readFileSync(marker, 'utf8').trim(), PINNED)
    assert.equal(workspaceIdFor(repo), PINNED, 'the pinned id wins over the path hash')

    // MOVE: the folder relocates carrying its .git along. The new path hashes
    // differently, but the marker travels with the common dir — same identity.
    // A real rename, not a copy of .git: copying raced with git's background
    // housekeeping on the macOS runner (ENOENT inside .git/objects).
    const moved = join(dir, 'renamed-elsewhere')
    renameSync(repo, moved)
    assert.notEqual(workspaceIdFor(moved), workspaceIdFor(join(dir, 'unrelated-name')))
    assert.equal(workspaceIdFor(moved), PINNED, 'a moved folder keeps its pinned id')

    // WORKTREE: a linked worktree shares the repository's common dir, so it
    // shares the workspace — one brain, not a second brain per worktree.
    const worktree = join(dir, 'side-worktree')
    git(moved, ['worktree', 'add', '-b', 'side', worktree])
    assert.equal(workspaceIdFor(worktree), PINNED, 'a worktree lands on the same workspace')
  } finally {
    cleanup()
  }
})

test('an unpinned or corrupt marker falls back to the canonical path hash', { skip: skipGit }, () => {
  const { dir, cleanup } = tempDir('fallback')
  try {
    const repo = makeRepo(dir)
    const derived = workspaceIdFor(repo)
    assert.equal(derived, `ws-${createHash('sha256').update(canonicalPath(repo).toLowerCase()).digest('hex').slice(0, 12)}`,
      'without a marker the id is the canonical-path hash')

    // Corrupt marker: not a ws-<12 hex> value — ignored, not propagated.
    writeFileSync(join(repo, '.git', 'plugbrain-workspace-id'), 'not-an-id\n', 'utf8')
    assert.equal(workspaceIdFor(repo), derived, 'a corrupt marker falls back to the path hash')

    // Deleted marker: back to the same path-derived id.
    rmSync(join(repo, '.git', 'plugbrain-workspace-id'))
    assert.equal(workspaceIdFor(repo), derived, 'a missing marker falls back to the path hash')
  } finally {
    cleanup()
  }
})

test('pinning a folder that is not a git checkout is a no-op', () => {
  const { dir, cleanup } = tempDir('nongit')
  try {
    // No .git anywhere: there is no common dir to attach a marker to. The pin
    // must not throw and must not invent one — registration still succeeds.
    assert.doesNotThrow(() => pinWorkspaceId(dir, 'ws-0123456789ab'))
    assert.ok(!existsSync(join(dir, 'plugbrain-workspace-id')), 'no marker invented in the folder')
    const derived = workspaceIdFor(dir)
    assert.ok(/^ws-[0-9a-f]{12}$/.test(derived), 'identity stays path-derived')
  } finally {
    cleanup()
  }
})
