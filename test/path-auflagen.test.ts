/**
 * PATH-02 — the follow-ups left by the R-PATH01 review of "one folder, one
 * spelling".
 *
 *   A1  a checkout is matched through `canonicalPath`, not a raw string compare,
 *       so a junction/8.3 spelling of the same directory still selects it.
 *   A2  the workspace upsert is spelling-idempotent: a legacy root written in
 *       another spelling is recognized and rewritten in place instead of
 *       colliding on the primary key or becoming a second row.
 *   A3  `isNoisePath` memoizes its verdict, so an event burst does not run a
 *       realpath per event.
 *
 * Everything runs against temporary stores and temporary repositories; the
 * owner's store, config and live brain are never touched.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, sep } from 'node:path'
import { test } from 'node:test'
import type { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import {
  canonicalPath, discoverCheckouts, listPlanet, registerPlanet,
  setPlanetIndexSelection, workspaceIdFor,
} from '../src/planet.ts'
import { detectChanges } from '../src/intel/changes.ts'
import { isNoisePath } from '../src/daemon.ts'
import { generationCache } from '../src/store/count-cache.ts'
import { findRegisteredWorkspace, registerWorkspaceRoot } from '../src/setup/workspace-from-cwd.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

function gitInit(path: string): void {
  mkdirSync(path, { recursive: true })
  git(path, ['init', '-q'])
}

/** A real, committed git repository under `codeDir`. */
function makeRepo(codeDir: string, name: string, files: Record<string, string>): string {
  const root = join(codeDir, name)
  mkdirSync(root, { recursive: true })
  git(root, ['init', '-q'])
  for (const [rel, content] of Object.entries(files)) {
    const abs = join(root, rel)
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content)
  }
  git(root, ['add', '.'])
  git(root, ['commit', '-q', '-m', 'init'])
  git(root, ['branch', '-M', 'main'])
  return root
}

interface Fixture { dir: string; db: DatabaseSync; cleanup: () => void }

function fixture(name: string): Fixture {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-${name}-`))
  const db = openStore(join(dir, 'brain.db'))
  return {
    dir,
    db,
    cleanup: () => { try { db.close() } catch { /* already closed */ } rmSync(dir, { recursive: true, force: true }) },
  }
}

/** A workspace row exactly as a pre-fix writer would have left it. */
function insertLegacyWorkspace(db: DatabaseSync, id: string, name: string, root: string): void {
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(id, name, root, new Date().toISOString())
}

const workspaceCount = (db: DatabaseSync): number =>
  Number((db.prepare('SELECT COUNT(*) AS n FROM workspaces').get() as { n: number }).n)

const storedRoot = (db: DatabaseSync, id: string): string | null =>
  (db.prepare('SELECT root FROM workspaces WHERE id = ?').get(id) as { root: string } | undefined)?.root ?? null

/**
 * A spelling of `path` that names the same directory but is not the canonical
 * string: a trailing `.` segment, which `resolve`/`canonicalPath` folds away.
 * It is exactly the shape a pre-fix `WHERE root = ?` lookup failed to match.
 */
const legacySpelling = (path: string): string => `${path}${sep}.`

// ─────────────────────────────────────────────────────────────────────────────
// A1 — checkout match is canonical, not a raw string compare
// ─────────────────────────────────────────────────────────────────────────────

test('A1: a checkout is selected through a junction spelling, not only its raw path',
  { skip: skipGit }, () => {
    const fx = fixture('path-a1')
    try {
      const planetRoot = join(fx.dir, 'plugpt')
      const main = makeRepo(join(planetRoot, 'Code'), 'alpha', { 'src/a.ts': 'export const a = 1\n' })
      const registered = registerPlanet(fx.db, planetRoot)
      const selected = discoverCheckouts(join(registered.root, 'Code'), registered.planetId)
        .map(checkout => checkout.checkoutId)
      setPlanetIndexSelection(fx.db, registered.workspaceId, selected)

      const checkout = listPlanet(fx.db, registered.workspaceId).checkouts
        .find(row => row.path === canonicalPath(main))
      assert.ok(checkout, 'the checkout must be persisted')

      // One and the same directory, reached under a junction name. The raw
      // compare cannot see that; `canonicalPath` can.
      const alias = join(fx.dir, 'alpha-alias')
      symlinkSync(checkout!.path, alias, 'junction')

      const throughAlias = detectChanges(fx.db, {
        workspaceId: registered.workspaceId,
        checkoutPath: alias,
        diffText: 'diff --git a/src/a.ts b/src/a.ts\n',
      })
      assert.equal(throughAlias.checkoutId, checkout!.id,
        'a junction spelling of the checkout path must select the persisted checkout')

      // No behaviour change for a caller that already passes the canonical path.
      const direct = detectChanges(fx.db, {
        workspaceId: registered.workspaceId,
        checkoutPath: checkout!.path,
        diffText: 'diff --git a/src/a.ts b/src/a.ts\n',
      })
      assert.equal(direct.checkoutId, checkout!.id)
    } finally {
      fx.cleanup()
    }
  })

// ─────────────────────────────────────────────────────────────────────────────
// A2 — spelling-idempotent workspace upsert
// ─────────────────────────────────────────────────────────────────────────────

test('A2: re-registering a legacy root that carries a git marker updates in place', () => {
  const fx = fixture('path-a2-marker')
  try {
    const repo = join(fx.dir, 'repo')
    gitInit(repo)
    // A pinned identity makes the legacy row carry TODAY'S id, so a raw INSERT
    // collides on the primary key instead of on `root`.
    const pinned = 'ws-0123456789ab'
    writeFileSync(join(repo, '.git', 'plugbrain-workspace-id'), `${pinned}\n`)
    assert.equal(workspaceIdFor(repo), pinned, 'the marker pins the derived id')
    insertLegacyWorkspace(fx.db, pinned, 'legacy', legacySpelling(repo))

    const record = registerWorkspaceRoot(fx.db, repo) // must not throw
    assert.equal(record.created, false)
    assert.equal(record.id, pinned, 'identity is never renumbered')
    assert.equal(workspaceCount(fx.db), 1)
    assert.equal(storedRoot(fx.db, pinned), canonicalPath(repo))
  } finally {
    fx.cleanup()
  }
})

test('A2: a legacy root without a marker is folded in, never duplicated', () => {
  const fx = fixture('path-a2-nomarker')
  try {
    const repo = join(fx.dir, 'repo')
    gitInit(repo)
    const legacyId = 'ws-ffffffffffff'
    assert.notEqual(workspaceIdFor(repo), legacyId, 'no marker, so the derived id differs')
    insertLegacyWorkspace(fx.db, legacyId, 'legacy', legacySpelling(repo))

    // Reading already folds legacy spellings onto the canonical folder.
    assert.equal(findRegisteredWorkspace(fx.db, repo)?.id, legacyId)

    const record = registerWorkspaceRoot(fx.db, repo)
    assert.equal(record.created, false)
    assert.equal(workspaceCount(fx.db), 1, 'the same folder must not become a second row')
    assert.equal(storedRoot(fx.db, legacyId), canonicalPath(repo))
  } finally {
    fx.cleanup()
  }
})

test('A2: registering through a junction alias stays one canonical row', { skip: skipGit }, () => {
  const fx = fixture('path-a2-junction')
  try {
    const repo = join(fx.dir, 'repo')
    gitInit(repo)
    const first = registerWorkspaceRoot(fx.db, repo)

    const alias = join(fx.dir, 'repo-alias')
    symlinkSync(repo, alias, 'junction')
    const second = registerWorkspaceRoot(fx.db, alias)

    assert.equal(second.id, first.id)
    assert.equal(second.created, false)
    assert.equal(workspaceCount(fx.db), 1)
    assert.equal(storedRoot(fx.db, first.id), canonicalPath(repo))
  } finally {
    fx.cleanup()
  }
})

test('A2: an already canonical root is still updated, not inserted twice', () => {
  const fx = fixture('path-a2-canonical')
  try {
    const repo = join(fx.dir, 'repo')
    mkdirSync(repo, { recursive: true })
    const first = registerWorkspaceRoot(fx.db, repo, 'first')
    const second = registerWorkspaceRoot(fx.db, repo, 'second')

    assert.equal(second.id, first.id)
    assert.equal(second.created, false)
    assert.equal(second.name, 'second')
    assert.equal(workspaceCount(fx.db), 1)
    assert.equal(storedRoot(fx.db, first.id), canonicalPath(repo))
  } finally {
    fx.cleanup()
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// A3 — the noise-path verdict is memoized
// ─────────────────────────────────────────────────────────────────────────────

test('A3: isNoisePath memoizes its verdict, bounded, keyed by store home', () => {
  const cache = generationCache('daemon-noise')
  cache.clear()
  try {
    const home = join(tmpdir(), 'plugbrain-noise-home')
    const inside = join(home, 'runs', 'state.json')

    assert.equal(isNoisePath(inside, home), true)
    assert.equal(cache.size, 1, 'the store verdict is memoized')
    assert.equal(isNoisePath(inside, home), true)
    assert.equal(cache.size, 1, 'a repeated path does not grow the memo')

    // A different store home must never read the first home's answer.
    const other = join(tmpdir(), 'plugbrain-noise-other')
    assert.equal(isNoisePath(inside, other), false)
    assert.equal(cache.size, 2)

    // The memo stays bounded under an event burst.
    for (let i = 0; i < 100; i++) isNoisePath(join(home, 'runs', `f${i}.json`), home)
    assert.ok(cache.size <= 64, 'the memo must not grow without bound')
  } finally {
    cache.clear()
  }
})
