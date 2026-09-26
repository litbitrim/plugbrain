/**
 * S1 acceptance: a bare `plugbrain mcp` finds its workspace from the folder it
 * was started in. Every case runs against a temp store and temp repositories —
 * never the owner's config or live brain.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { workspaceIdFor } from '../src/planet.ts'
import {
  findGitRoot, findRegisteredWorkspace, pathContains, registerWorkspaceRoot,
  resolveMcpWorkspace,
} from '../src/setup/workspace-from-cwd.ts'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-wscwd-'))
  const db = openStore(join(dir, 'brain.db'))
  return {
    dir,
    db,
    cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) },
  }
}

function gitInit(path: string): void {
  mkdirSync(path, { recursive: true })
  execFileSync('git', ['init', '-q', path], { stdio: 'ignore' })
}

test('pathContains treats a root as containing itself and its descendants', () => {
  assert.equal(pathContains('/work/app', '/work/app'), true)
  assert.equal(pathContains('/work/app', '/work/app/src/x.ts'), true)
  assert.equal(pathContains('/work/app', '/work/application'), false)
  assert.equal(pathContains('/work/app', '/work'), false)
})

test('a registered root containing the cwd wins, longest match first', () => {
  const f = fixture()
  try {
    const parent = join(f.dir, 'planet')
    const child = join(parent, 'repo')
    mkdirSync(child, { recursive: true })
    const parentRecord = registerWorkspaceRoot(f.db, parent, 'planet')
    const childRecord = registerWorkspaceRoot(f.db, child, 'repo')

    const picked = findRegisteredWorkspace(f.db, join(child, 'src', 'deep'))
    assert.ok(picked)
    assert.equal(picked.id, childRecord.id)
    assert.notEqual(picked.id, parentRecord.id)
  } finally {
    f.cleanup()
  }
})

test('PLUGBRAIN_WORKSPACE pins a workspace by id and by folder', () => {
  const f = fixture()
  try {
    const root = join(f.dir, 'pinned')
    const record = registerWorkspaceRoot(f.db, root, 'pinned')

    const byId = resolveMcpWorkspace({
      db: f.db, cwd: f.dir, env: { PLUGBRAIN_WORKSPACE: record.id },
    })
    assert.equal(byId.workspaceId, record.id)
    assert.equal(byId.source, 'env')

    const byPath = resolveMcpWorkspace({
      db: f.db, cwd: f.dir, env: { PLUGBRAIN_WORKSPACE: root },
    })
    assert.equal(byPath.workspaceId, record.id)
    assert.equal(byPath.source, 'env')
  } finally {
    f.cleanup()
  }
})

test('a git root is registered on first use and reused afterwards', () => {
  const f = fixture()
  try {
    const repo = join(f.dir, 'fresh-clone')
    gitInit(repo)
    mkdirSync(join(repo, 'src'), { recursive: true })

    const first = resolveMcpWorkspace({ db: f.db, cwd: join(repo, 'src'), env: {} })
    assert.equal(first.source, 'git')
    assert.equal(first.needsIndex, true)
    assert.equal(first.workspaceId, workspaceIdFor(findGitRoot(repo)!))

    const row = f.db.prepare('SELECT root FROM workspaces WHERE id = ?').get(first.workspaceId) as
      { root: string } | undefined
    assert.ok(row, 'the git root must have been registered')

    const second = resolveMcpWorkspace({ db: f.db, cwd: repo, env: {} })
    assert.equal(second.source, 'registered')
    assert.equal(second.needsIndex, false)
    assert.equal(second.workspaceId, first.workspaceId)
  } finally {
    f.cleanup()
  }
})

test('an explicit --workspace override beats the registered cwd', () => {
  const f = fixture()
  try {
    const a = registerWorkspaceRoot(f.db, join(f.dir, 'a'), 'a')
    const b = registerWorkspaceRoot(f.db, join(f.dir, 'b'), 'b')

    const resolved = resolveMcpWorkspace({ db: f.db, cwd: join(f.dir, 'a'), override: b.id, env: {} })
    assert.equal(resolved.workspaceId, b.id)
    assert.equal(resolved.source, 'flag')
    assert.notEqual(resolved.workspaceId, a.id)
  } finally {
    f.cleanup()
  }
})

test('nothing registered and not a git repo is a clear refusal, not a throw', () => {
  const f = fixture()
  try {
    const plain = join(f.dir, 'plain-folder')
    mkdirSync(plain, { recursive: true })
    assert.equal(findGitRoot(plain), null, 'temp folders are expected to be outside any repo')

    const resolved = resolveMcpWorkspace({ db: f.db, cwd: plain, env: {} })
    assert.equal(resolved.workspaceId, null)
    assert.equal(resolved.source, 'none')
    assert.match((resolved as { reason: string }).reason, /not a registered folder/)
  } finally {
    f.cleanup()
  }
})
