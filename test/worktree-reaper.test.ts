import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerSwarmAgent, acquireLease } from '../src/coord/index.ts'
import { registerWorkerProfile, recordTurn } from '../src/coord/swarm-ops.ts'
import { isReapAutoEnabled, reapWorktrees, setReapAuto, synchronizeMissingWorktrees } from '../src/coord/reaper.ts'

function git(cwd: string, ...args: string[]): string {
  return execFileSync('git', ['-C', cwd, ...args], { encoding: 'utf8' }).trim()
}

const samePath = (a: string, b: string): boolean => {
  const real = (path: string) => {
    const value = realpathSync.native(path)
    return process.platform === 'win32' ? value.toLowerCase() : value
  }
  return real(a) === real(b)
}

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-reaper-'))
  const repo = join(dir, 'repo')
  mkdirSync(repo)
  git(dir, 'init', '-b', 'main', repo)
  git(repo, 'config', 'user.email', 'reaper@test.invalid')
  git(repo, 'config', 'user.name', 'Reaper Test')
  writeFileSync(join(repo, 'base.txt'), 'base\n')
  git(repo, 'add', '.')
  git(repo, 'commit', '-m', 'base')
  const db = openStore(join(dir, 'brain.db'))
  const ws = 'ws-reaper-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(ws, 'reaper-test', dir, new Date().toISOString())
  const addMerged = (name: string) => {
    const path = join(dir, name)
    git(repo, 'worktree', 'add', '-b', name, path)
    writeFileSync(join(path, `${name}.txt`), name)
    git(path, 'add', '.')
    git(path, 'commit', '-m', name)
    git(repo, 'merge', '--no-ff', name, '-m', `merge ${name}`)
    return path
  }
  return { dir, repo, db, ws, addMerged, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('dry-run is read only, and apply removes a merged clean tree with a recovery receipt', () => {
  const f = fixture()
  try {
    const path = f.addMerged('clean')
    const preview = reapWorktrees(f.db, f.ws, { repo: f.repo })
    assert.equal(existsSync(path), true)
    assert.equal(preview.removed.length, 0)
    assert.equal(preview.candidates.find(row => samePath(row.path, path))?.eligible, true)
    const applied = reapWorktrees(f.db, f.ws, { repo: f.repo, apply: true })
    assert.equal(existsSync(path), false)
    assert.equal(applied.removed.length, 1)
    assert.match(applied.removed[0]?.restoreCommand ?? '', /git worktree add/)
    assert.ok(applied.removed[0]?.commit)
    git(f.repo, 'worktree', 'add', path, 'clean')
    assert.equal(existsSync(path), true, 'the recorded branch and path restore the removed worktree')
  } finally { f.cleanup() }
})

test('dirty and untracked merged worktrees stay in place with distinct reasons', () => {
  const f = fixture()
  try {
    const dirty = f.addMerged('dirty')
    const untracked = f.addMerged('untracked')
    writeFileSync(join(dirty, 'base.txt'), 'changed\n')
    writeFileSync(join(untracked, 'extra.txt'), 'new\n')
    const result = reapWorktrees(f.db, f.ws, { repo: f.repo, apply: true })
    assert.equal(result.removed.length, 0)
    assert.match(result.candidates.find(row => samePath(row.path, dirty))?.reason ?? '', /uncommitted: 1 file/)
    assert.match(result.candidates.find(row => samePath(row.path, untracked))?.reason ?? '', /untracked/)
  } finally { f.cleanup() }
})

test('unmerged and locked worktrees remain in place', () => {
  const f = fixture()
  try {
    const path = join(f.dir, 'unmerged')
    git(f.repo, 'worktree', 'add', '-b', 'unmerged', path)
    writeFileSync(join(path, 'new.txt'), 'new')
    git(path, 'add', '.')
    git(path, 'commit', '-m', 'unmerged')
    const locked = f.addMerged('locked')
    git(f.repo, 'worktree', 'lock', locked, '--reason', 'test hold')
    const result = reapWorktrees(f.db, f.ws, { repo: f.repo, apply: true })
    assert.equal(existsSync(path), true)
    assert.equal(existsSync(locked), true)
    assert.match(result.candidates.find(row => samePath(row.path, path))?.reason ?? '', /not merged/)
    assert.match(result.candidates.find(row => samePath(row.path, locked))?.reason ?? '', /locked/)
  } finally { f.cleanup() }
})

test('an active worker lease prevents reaping its bound worktree', () => {
  const f = fixture()
  try {
    const path = f.addMerged('leased')
    registerSwarmAgent(f.db, { agentId: 'worker', workspaceId: f.ws })
    registerWorkerProfile(f.db, { agentId: 'worker', surface: 'other', account: 'owner:chatgpt', worktrees: [path] })
    acquireLease(f.db, f.ws, { agentId: 'worker', taskId: 'reaper-test', paths: ['leased/leased.txt'] })
    recordTurn(f.db, { workspaceId: f.ws, agentId: 'worker', phase: 'end', state: 'needs-task' })
    const result = reapWorktrees(f.db, f.ws, { repo: f.repo, apply: true })
    assert.equal(existsSync(path), true)
    assert.match(result.candidates.find(row => samePath(row.path, path))?.reason ?? '', /active lease/)
  } finally { f.cleanup() }
})

test('missing checkouts stay bound and return to present when their path reappears', () => {
  const f = fixture()
  try {
    const missingPath = join(f.dir, 'moved-checkout')
    f.db.prepare('INSERT INTO planets (id, workspace_id, name, root, created_at) VALUES (?, ?, ?, ?, ?)')
      .run('planet-reaper', f.ws, 'reaper-test', f.dir, new Date().toISOString())
    f.db.prepare('INSERT INTO repos (id, planet_id, name, common_dir, remote_url, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run('repo-reaper', 'planet-reaper', 'repo', null, null, new Date().toISOString())
    f.db.prepare(`INSERT INTO checkouts (id, planet_id, repo_id, name, path, rel_prefix, seen_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`).run('checkout-reaper', 'planet-reaper', 'repo-reaper', 'moved-checkout', missingPath, 'Code/moved-checkout', new Date().toISOString())
    registerSwarmAgent(f.db, { agentId: 'missing-worker', workspaceId: f.ws })
    registerWorkerProfile(f.db, { agentId: 'missing-worker', surface: 'other', account: 'owner:chatgpt', worktrees: [missingPath] })
    const preview = synchronizeMissingWorktrees(f.db, f.ws)
    assert.equal(preview.some(row => row.path === missingPath), true)
    assert.equal((f.db.prepare('SELECT disk_state FROM checkouts WHERE id = ?').get('checkout-reaper') as { disk_state: string }).disk_state, 'present')
    const missing = synchronizeMissingWorktrees(f.db, f.ws, true)
    assert.equal(missing.some(row => row.path === missingPath), true)
    const row = f.db.prepare('SELECT disk_state, retired_at FROM checkouts WHERE id = ?').get('checkout-reaper') as { disk_state: string; retired_at: string | null }
    assert.equal(row.disk_state, 'fehlt')
    assert.equal(row.retired_at, null)
    assert.deepEqual(JSON.parse((f.db.prepare('SELECT worktrees FROM agents WHERE id = ?').get('missing-worker') as { worktrees: string }).worktrees), [missingPath])
    mkdirSync(missingPath)
    assert.deepEqual(synchronizeMissingWorktrees(f.db, f.ws, true), [])
    assert.equal((f.db.prepare('SELECT disk_state FROM checkouts WHERE id = ?').get('checkout-reaper') as { disk_state: string }).disk_state, 'present')
  } finally { f.cleanup() }
})

test('dry-run reports missing checkout rows without changing the registry', () => {
  const f = fixture()
  try {
    const missingPath = join(f.dir, 'not-on-disk')
    f.db.prepare('INSERT INTO planets (id, workspace_id, name, root, created_at) VALUES (?, ?, ?, ?, ?)')
      .run('planet-reaper-preview', f.ws, 'reaper-test', f.dir, new Date().toISOString())
    f.db.prepare('INSERT INTO repos (id, planet_id, name, common_dir, remote_url, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run('repo-reaper-preview', 'planet-reaper-preview', 'repo', null, null, new Date().toISOString())
    f.db.prepare(`INSERT INTO checkouts (id, planet_id, repo_id, name, path, rel_prefix, seen_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`).run('checkout-reaper-preview', 'planet-reaper-preview', 'repo-reaper-preview', 'missing', missingPath, 'Code/missing', new Date().toISOString())
    const result = reapWorktrees(f.db, f.ws, { repo: f.repo })
    assert.equal(result.missing.some(row => row.path === missingPath), true)
    const row = f.db.prepare('SELECT disk_state, retired_at FROM checkouts WHERE id = ?').get('checkout-reaper-preview') as { disk_state: string; retired_at: string | null }
    assert.equal(row.disk_state, 'present')
    assert.equal(row.retired_at, null)
  } finally { f.cleanup() }
})

test('automatic reap stays off until the workspace setting is explicitly enabled', () => {
  const f = fixture()
  try {
    assert.equal(isReapAutoEnabled(f.db, f.ws), false)
    setReapAuto(f.db, f.ws, true)
    assert.equal(isReapAutoEnabled(f.db, f.ws), true)
    setReapAuto(f.db, f.ws, false)
    assert.equal(isReapAutoEnabled(f.db, f.ws), false)
  } finally { f.cleanup() }
})
