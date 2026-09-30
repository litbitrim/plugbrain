/**
 * M1 — one planet, many repos, many checkouts.
 *
 * Every case here is an acceptance criterion of the milestone, and each one is
 * checked against real git repositories on a real disk and the real SQLite
 * store: no fixture stands in for the indexer, no stub stands in for git. The
 * properties that matter are the ones a plausible-looking implementation gets
 * wrong:
 *
 *   - nine worktrees of one repo must be ONE repo and NINE checkouts, never
 *     nine repos or one checkout;
 *   - two files with the same content in two checkouts must be two rows, and
 *     a rename must not "move" a file from one checkout into another;
 *   - a deleted file must leave the search index AND leave a record;
 *   - credentials, keys and build noise must never be indexed at all;
 *   - a junction pointing out of the planet must stay a wall, not a door.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import {
  existsSync, mkdirSync, mkdtempSync, renameSync, rmSync, symlinkSync,
  unlinkSync, utimesSync, writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'
import * as access from '../src/access.ts'
import { openStore } from '../src/store/schema.ts'
import { isSecretPath, isSkippedDir, walk } from '../src/indexer/scan.ts'
import {
  canonicalPath, checkoutIdFor, discoverCheckouts, getPlanetIndexSelection, indexPlanetWorkspace, listPlanet, planetHistory,
  planetIdFor, readCheckout, registerPlanet as registerPlanetRaw, repoIdFor, scopeRoots,
  setPlanetIndexSelection, workspaceIdFor,
} from '../src/planet.ts'
import { refreshFile } from '../src/indexer/index.ts'
import { getIntelStatus } from '../src/intel/status.ts'
import { detectChanges } from '../src/intel/changes.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

interface PlanetFixture {
  dir: string
  planetRoot: string
  codeDir: string
  outside: string
  dbFile: string
  db: DatabaseSync
  workspaceId: string
  planetId: string
  cleanup: () => void
}

function planetFixture(name: string): PlanetFixture {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-${name}-`))
  const planetRoot = join(dir, 'plugpt')
  const codeDir = join(planetRoot, 'Code')
  const outside = join(dir, 'outside')
  mkdirSync(codeDir, { recursive: true })
  mkdirSync(outside, { recursive: true })
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  return {
    dir, planetRoot, codeDir, outside, dbFile, db,
    workspaceId: workspaceIdFor(planetRoot),
    planetId: planetIdFor(planetRoot),
    cleanup: () => { try { db.close() } catch { /* already closed */ } rmSync(dir, { recursive: true, force: true }) },
  }
}

/** A real, committed git repository under the planet's Code/ folder. */
function makeRepo(codeDir: string, name: string, files: Record<string, string>): string {
  const root = join(codeDir, name)
  mkdirSync(root, { recursive: true })
  git(root, ['init', '-q'])
  for (const [rel, content] of Object.entries(files)) write(root, rel, content)
  git(root, ['add', '.'])
  git(root, ['commit', '-q', '-m', 'init'])
  git(root, ['branch', '-M', 'main'])
  return root
}

/** Write a file and push its mtime forward so a same-second edit is still seen. */
function write(root: string, rel: string, content: string): void {
  const abs = join(root, rel)
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, content)
  const future = new Date(Date.now() + 2000)
  utimesSync(abs, future, future)
}

/** Write a file and push its mtime FORWARD again, for a second edit. */
function edit(root: string, rel: string, content: string): void {
  writeFileSync(join(root, rel), content)
  const later = new Date(Date.now() + 4000)
  utimesSync(join(root, rel), later, later)
}

const count = (db: DatabaseSync, table: string): number =>
  Number((db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n)

const pathCount = (db: DatabaseSync, workspaceId: string, path: string): number =>
  Number((db.prepare('SELECT COUNT(*) AS n FROM files WHERE workspace_id = ? AND path = ?')
    .get(workspaceId, path) as { n: number }).n)

const fileRow = (db: DatabaseSync, workspaceId: string, path: string): {
  id: number; repo_id: string | null; checkout_id: string | null
} | undefined => db.prepare(
  'SELECT id, repo_id, checkout_id FROM files WHERE workspace_id = ? AND path = ?')
  .get(workspaceId, path) as { id: number; repo_id: string | null; checkout_id: string | null } | undefined

const symbolIds = (db: DatabaseSync, workspaceId: string, path: string): number[] =>
  (db.prepare(
    `SELECT s.id AS id FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE f.workspace_id = ? AND f.path = ? ORDER BY s.line, s.name`).all(workspaceId, path) as
    Array<{ id: number }>).map(row => Number(row.id))

const searchHits = (db: DatabaseSync, workspaceId: string, term: string): string[] =>
  (db.prepare(
    `SELECT r.path AS path FROM search m JOIN search_rows r ON r.id = m.rowid
      WHERE m.search MATCH ? AND r.workspace_id = ?`).all(`${term}*`, workspaceId) as
    Array<{ path: string }>).map(row => row.path)

/** Existing index tests opt into every checkout they create; production never does this implicitly. */
function registerPlanet(db: DatabaseSync, root: string, name?: string) {
  const registered = registerPlanetRaw(db, root, name)
  const allCheckoutIds = discoverCheckouts(join(registered.root, 'Code'), registered.planetId)
    .map(checkout => checkout.checkoutId)
  setPlanetIndexSelection(db, registered.workspaceId, allCheckoutIds)
  return registered
}

// ─────────────────────────────────────────────────────────────────────────────
// Identity
// ─────────────────────────────────────────────────────────────────────────────

test('the same planet registered twice is one identity, not two', { skip: skipGit }, () => {
  const fx = planetFixture('planet-id')
  try {
    makeRepo(fx.codeDir, 'alpha', { 'src/a.ts': 'export const a = 1\n' })

    const first = registerPlanet(fx.db, fx.planetRoot)
    const second = registerPlanet(fx.db, fx.planetRoot, 'plugpt')

    assert.equal(first.created, true, 'the first registration creates the planet')
    assert.equal(second.created, false, 'the second recognises it')
    assert.equal(first.planetId, second.planetId)
    assert.equal(first.workspaceId, second.workspaceId)
    // Derived, not minted: a fresh derivation over the same root agrees.
    assert.equal(first.workspaceId, workspaceIdFor(fx.planetRoot))
    assert.equal(first.planetId, planetIdFor(fx.planetRoot))

    assert.equal(second.repos, 1)
    assert.equal(second.checkouts, 1)
    for (const table of ['workspaces', 'planets', 'repos', 'checkouts']) {
      assert.equal(count(fx.db, table), 1, `${table} must hold exactly one row`)
    }
  } finally { fx.cleanup() }
})

test('alias, Junction and clone paths keep one writable identity with revision overlays', { skip: skipGit }, () => {
  const fx = planetFixture('planet-physical-identity')
  try {
    const main = makeRepo(fx.codeDir, 'alpha', { 'src/a.ts': 'export const a = 1\n' })
    // A nested Junction must not invent an alias checkout for the same files.
    symlinkSync(main, join(fx.codeDir, 'alpha-alias'), 'junction')
    const aliasRoot = join(fx.dir, 'plugpt-alias')
    symlinkSync(fx.planetRoot, aliasRoot, 'junction')

    const first = registerPlanet(fx.db, fx.planetRoot)
    const throughAlias = registerPlanetRaw(fx.db, aliasRoot)
    assert.equal(throughAlias.workspaceId, first.workspaceId)
    assert.equal(throughAlias.planetId, first.planetId)
    assert.equal(throughAlias.root, canonicalPath(fx.planetRoot))
    assert.equal(throughAlias.checkouts, 1, 'the alias checkout does not become writable inventory')
    assert.equal(count(fx.db, 'workspaces'), 1)
    assert.equal(count(fx.db, 'planets'), 1)
    assert.equal(count(fx.db, 'checkouts'), 1)

    const before = listPlanet(fx.db, first.workspaceId).checkouts[0]!
    write(main, 'src/a.ts', 'export const a = 2\n')
    const refreshed = registerPlanetRaw(fx.db, aliasRoot)
    const after = listPlanet(fx.db, refreshed.workspaceId).checkouts[0]!
    assert.equal(after.id, before.id, 'a dirty revision is an overlay on the same checkout')
    assert.notEqual(after.revision, before.revision, 'the revision vector changes without a second checkout')

    // A real clone has a different git common directory and is therefore a
    // distinct checkout/repository even when its files and branch match.
    git(fx.codeDir, ['clone', '-q', main, 'alpha-clone'])
    const cloned = registerPlanetRaw(fx.db, fx.planetRoot)
    assert.equal(cloned.checkouts, 2)
    assert.equal(cloned.repos, 2)
  } finally { fx.cleanup() }
})

test('linked worktrees of one repo are one repo and separate checkouts', { skip: skipGit }, () => {
  const fx = planetFixture('planet-worktrees')
  try {
    const main = makeRepo(fx.codeDir, 'alpha', { 'src/x.ts': 'export function run() { return 1 }\n' })
    git(main, ['worktree', 'add', '-q', '-b', 'feature', join(fx.codeDir, 'alpha--feature')])

    const registered = registerPlanet(fx.db, fx.planetRoot)
    assert.equal(registered.repos, 1, 'two checkouts, one repository')
    assert.equal(registered.checkouts, 2)

    const view = listPlanet(fx.db, fx.workspaceId)
    const [primary, linked] = view.checkouts
    assert.equal(primary.repoId, linked.repoId, 'same repo id')
    assert.notEqual(primary.id, linked.id, 'different checkout ids')
    assert.equal(primary.id, checkoutIdFor(fx.planetId, join(fx.codeDir, 'alpha')))
    assert.equal(linked.id, checkoutIdFor(fx.planetId, join(fx.codeDir, 'alpha--feature')))
    // The repo id is the git COMMON directory's, which is what makes the two
    // checkouts one repo rather than two.
    const commonDir = readCheckout(main).commonDir
    assert.ok(commonDir, 'the main worktree has a common dir')
    assert.equal(primary.repoId, repoIdFor(fx.planetId, commonDir!))
    assert.equal(linked.repoId, repoIdFor(fx.planetId, commonDir!))
    assert.equal(primary.isPrimary, true, 'the main worktree is the primary checkout')
    assert.equal(linked.isPrimary, false)
    assert.deepEqual(
      [primary.branch, linked.branch].sort(), ['feature', 'main'].sort())

    // The revision vector tracks the uncommitted patch, not just the commit.
    assert.equal(primary.dirtyHash, null, 'a fresh checkout is clean')
    const dirtyRevision = primary.revision
    write(main, 'src/dirty.ts', 'export const dirty = true\n')
    const after = readCheckout(main)
    assert.notEqual(after.dirtyHash, null, 'an untracked file makes the checkout dirty')
    assert.notEqual(after.revision, dirtyRevision, 'the revision vector moves with it')
    // Same commit, different state: the two checkouts must not collapse.
    assert.notEqual(after.revision, readCheckout(join(fx.codeDir, 'alpha--feature')).revision)
  } finally { fx.cleanup() }
})

test('a planet inventories every checkout but indexes only a persisted explicit selection', { skip: skipGit }, () => {
  const fx = planetFixture('planet-selection')
  let reopened: DatabaseSync | null = null
  try {
    const main = makeRepo(fx.codeDir, 'alpha', { 'src/x.ts': 'export const live = true\n' })
    const historic = join(fx.codeDir, 'alpha--historic')
    git(main, ['worktree', 'add', '-q', '-b', 'historic', historic])

    const registered = registerPlanetRaw(fx.db, fx.planetRoot)
    assert.equal(registered.checkouts, 2, 'both on-disk checkouts are inventoried')
    assert.equal(registered.selectionConfigured, false)
    assert.equal(registered.selectedCheckouts, 0)
    assert.deepEqual(getPlanetIndexSelection(fx.db, fx.workspaceId), {
      configured: false, checkoutIds: [], updatedAt: null,
    })
    assert.deepEqual(scopeRoots(fx.db, fx.workspaceId), [], 'unconfigured Code is never an implicit index root')
    assert.throws(() => indexPlanetWorkspace(fx.db, fx.workspaceId), /no persisted canonical selection/)

    const inventory = listPlanet(fx.db, fx.workspaceId)
    const primary = inventory.checkouts.find(checkout => checkout.relPrefix === 'Code/alpha')
    const old = inventory.checkouts.find(checkout => checkout.relPrefix === 'Code/alpha--historic')
    assert.ok(primary && old)
    assert.equal(primary!.indexSelected, false)
    assert.equal(old!.indexSelected, false)

    // Select both once to create historic graph data, then explicitly narrow to
    // the primary. The stale row must not be reactivated through refresh,
    // status, or default change detection before the next full index removes it.
    setPlanetIndexSelection(fx.db, fx.workspaceId, [primary!.id, old!.id])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })
    assert.equal(pathCount(fx.db, fx.workspaceId, 'Code/alpha--historic/src/x.ts'), 1)

    const selected = setPlanetIndexSelection(fx.db, fx.workspaceId, [primary!.id])
    assert.equal(selected.configured, true)
    assert.deepEqual(selected.checkoutIds, [primary!.id])
    assert.deepEqual(scopeRoots(fx.db, fx.workspaceId)!.map(root => root.prefix), ['Code/alpha'])
    const narrowed = listPlanet(fx.db, fx.workspaceId)
    const narrowedOld = narrowed.checkouts.find(checkout => checkout.id === old!.id)!
    assert.equal(narrowedOld.indexSelected, false)
    assert.equal(narrowedOld.selectedAt, null, 'deselection is distinct from checkout retirement')

    write(historic, 'src/x.ts', 'export const historicChange = true\n')
    assert.equal(refreshFile(fx.db, fx.workspaceId, 'Code/alpha--historic/src/x.ts'), false,
      'a stale unselected row cannot re-enter through single-file refresh')
    const status = getIntelStatus(fx.db, fx.workspaceId)
    assert.equal(status.checkouts, 1)
    assert.equal(status.files, 1, 'status excludes stale graph rows from deselected checkouts')
    assert.equal(status.dirtyCheckouts, 0, 'unselected dirt cannot make the active Brain stale')
    assert.throws(() => detectChanges(fx.db, { workspaceId: fx.workspaceId, checkoutPath: historic }),
      /checkout is not in the active selection/, 'explicit historical path is not a selection bypass')
    assert.throws(() => detectChanges(fx.db, {
      workspaceId: fx.workspaceId, checkoutId: old!.id, diffText: 'diff --git a/src/x.ts b/src/x.ts',
    }), /checkout is not in the active selection/, 'explicit historical id is not a selection bypass')

    // A restart reads the same persisted vector. No live daemon or production
    // store is involved: this is a temporary test database only.
    fx.db.close()
    reopened = openStore(fx.dbFile)
    assert.deepEqual(getPlanetIndexSelection(reopened, fx.workspaceId).checkoutIds, [primary!.id])
    assert.deepEqual(scopeRoots(reopened, fx.workspaceId)!.map(root => root.prefix), ['Code/alpha'])
    const reconciled = indexPlanetWorkspace(reopened, fx.workspaceId)
    assert.equal(reconciled.changed.deleted, 1, 'the next selected scan tombstones the old graph row')
    assert.equal(pathCount(reopened, fx.workspaceId, 'Code/alpha--historic/src/x.ts'), 0)
  } finally {
    try { reopened?.close() } catch { /* already closed */ }
    fx.cleanup()
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Indexing a planet
// ─────────────────────────────────────────────────────────────────────────────

test('one planet indexes many repos, and equal names in two repos stay apart',
  { skip: skipGit }, () => {
    const fx = planetFixture('planet-index')
    try {
      const alpha = makeRepo(fx.codeDir, 'alpha', { 'src/x.ts': 'export function run() { return 1 }\n' })
      makeRepo(fx.codeDir, 'beta', { 'src/x.ts': 'export function run() { return 2 }\n' })
      git(alpha, ['worktree', 'add', '-q', '-b', 'feature', join(fx.codeDir, 'alpha--feature')])

      const registered = registerPlanet(fx.db, fx.planetRoot)
      assert.equal(registered.repos, 2)
      const result = indexPlanetWorkspace(fx.db, fx.workspaceId)

      assert.equal(result.mode, 'full')
      assert.equal(result.scanned, 3, 'three checkouts, three files')
      assert.equal(result.files, 3)
      assert.ok(result.ms >= 0 && Number.isFinite(result.ms), 'duration is reported')

      const alphaRow = fileRow(fx.db, fx.workspaceId, 'Code/alpha/src/x.ts')
      const betaRow = fileRow(fx.db, fx.workspaceId, 'Code/beta/src/x.ts')
      const featureRow = fileRow(fx.db, fx.workspaceId, 'Code/alpha--feature/src/x.ts')
      assert.ok(alphaRow && betaRow && featureRow, 'all three files are indexed')

      // Attribution: same repo for both alpha checkouts, different checkouts.
      assert.equal(alphaRow!.repo_id, featureRow!.repo_id)
      assert.notEqual(alphaRow!.checkout_id, featureRow!.checkout_id)
      assert.notEqual(alphaRow!.repo_id, betaRow!.repo_id, 'beta is a different repo')

      // Three files define `run`; none of them may be merged into another.
      const runs = fx.db.prepare(
        `SELECT s.id AS id, f.path AS path FROM symbols s JOIN files f ON f.id = s.file_id
          WHERE f.workspace_id = ? AND s.name = 'run'`).all(fx.workspaceId) as
        Array<{ id: number; path: string }>
      assert.equal(runs.length, 3, 'a same-named symbol in each repo/checkout')
      assert.equal(new Set(runs.map(r => r.id)).size, 3)
      assert.equal(new Set(runs.map(r => r.path)).size, 3)
      assert.deepEqual(searchHits(fx.db, fx.workspaceId, 'run').sort(),
        ['Code/alpha--feature/src/x.ts', 'Code/alpha/src/x.ts', 'Code/beta/src/x.ts'])

      // Scoping a query to one checkout returns exactly that checkout's symbol.
      const scoped = fx.db.prepare(
        `SELECT COUNT(*) AS n FROM symbols s JOIN files f ON f.id = s.file_id
          WHERE f.workspace_id = ? AND f.checkout_id = ? AND s.name = 'run'`)
        .get(fx.workspaceId, betaRow!.checkout_id) as { n: number }
      assert.equal(Number(scoped.n), 1)

      // One planet, one brain: no second store was created inside a checkout.
      for (const dir of ['alpha', 'beta', 'alpha--feature']) {
        assert.equal(existsSync(join(fx.codeDir, dir, '.plugbrain')), false,
          `${dir} must not grow its own brain`)
      }
    } finally { fx.cleanup() }
  })

test('a one-file edit reparses one file and leaves the rest alone', { skip: skipGit }, () => {
  const fx = planetFixture('planet-incremental')
  try {
    const alpha = makeRepo(fx.codeDir, 'alpha', {
      'src/x.ts': 'export function run() { return 1 }\n',
      'src/other.ts': 'export function untouched() { return 0 }\n',
    })
    registerPlanet(fx.db, fx.planetRoot)
    const first = indexPlanetWorkspace(fx.db, fx.workspaceId)
    assert.equal(first.mode, 'full')
    assert.equal(first.reparsed, 2)

    const otherIds = symbolIds(fx.db, fx.workspaceId, 'Code/alpha/src/other.ts')
    const untouchedFileId = fileRow(fx.db, fx.workspaceId, 'Code/alpha/src/other.ts')!.id

    edit(alpha, 'src/x.ts', 'export function run() { return 1 }\nexport function added() { return 2 }\n')
    const second = indexPlanetWorkspace(fx.db, fx.workspaceId)

    assert.equal(second.mode, 'incremental')
    assert.equal(second.scanned, 2)
    assert.deepEqual(second.changed,
      { added: 0, modified: 1, renamed: 0, deleted: 0, unchanged: 1 })
    assert.equal(second.reparsed, 1, 'exactly one file was re-parsed')
    assert.ok(second.reresolved >= 1 && second.reresolved <= 2, 'resolution is scoped, not global')

    // The untouched file kept its row and its symbols.
    assert.equal(fileRow(fx.db, fx.workspaceId, 'Code/alpha/src/other.ts')!.id, untouchedFileId)
    assert.deepEqual(symbolIds(fx.db, fx.workspaceId, 'Code/alpha/src/other.ts'), otherIds)
    assert.equal(symbolIds(fx.db, fx.workspaceId, 'Code/alpha/src/x.ts').length, 2)

    // Nothing moved at all: the next pass does no work and burns no generation.
    const third = indexPlanetWorkspace(fx.db, fx.workspaceId)
    assert.equal(third.mode, 'unchanged')
    assert.equal(third.reparsed, 0)
    assert.equal(third.generation, second.generation)
    assert.equal(third.scanned, 2, 'the walk still reports what it looked at')
  } finally { fx.cleanup() }
})

test('new, renamed and deleted files are recognised after a restart', { skip: skipGit }, () => {
  const fx = planetFixture('planet-delta')
  let reopened: DatabaseSync | null = null
  try {
    const alpha = makeRepo(fx.codeDir, 'alpha', {
      'src/keep.ts': 'export const keep = 1\n',
      'src/mover.ts': 'export function mover() { return "unique-mover"\n }\n',
      'src/gone.ts': 'export function vanished() { return 3 }\n',
    })
    registerPlanet(fx.db, fx.planetRoot)
    indexPlanetWorkspace(fx.db, fx.workspaceId)

    const moverId = fileRow(fx.db, fx.workspaceId, 'Code/alpha/src/mover.ts')!.id
    const goneRow = fileRow(fx.db, fx.workspaceId, 'Code/alpha/src/gone.ts')
    assert.ok(goneRow, 'the future deletion is indexed first')

    write(alpha, 'src/fresh.ts', 'export function fresh() { return 4 }\n')
    renameSync(join(alpha, 'src/mover.ts'), join(alpha, 'src/moved.ts'))
    unlinkSync(join(alpha, 'src/gone.ts'))

    // RESTART: the process forgets everything; the database does not.
    fx.db.close()
    reopened = openStore(fx.dbFile)
    const result = indexPlanetWorkspace(reopened, fx.workspaceId)

    assert.equal(result.mode, 'incremental')
    assert.deepEqual(result.changed,
      { added: 1, modified: 0, renamed: 1, deleted: 1, unchanged: 1 })

    assert.equal(pathCount(reopened, fx.workspaceId, 'Code/alpha/src/fresh.ts'), 1)
    assert.equal(pathCount(reopened, fx.workspaceId, 'Code/alpha/src/moved.ts'), 1)
    assert.equal(pathCount(reopened, fx.workspaceId, 'Code/alpha/src/mover.ts'), 0)
    assert.equal(pathCount(reopened, fx.workspaceId, 'Code/alpha/src/gone.ts'), 0)
    assert.equal(fileRow(reopened, fx.workspaceId, 'Code/alpha/src/moved.ts')!.id, moverId,
      'a rename moves the row, so it keeps its id and its history')

    // The deleted file is gone from the search index...
    assert.equal(searchHits(reopened, fx.workspaceId, 'vanished').length, 0)
    // ...and it is on the record, with the reason it disappeared.
    const history = planetHistory(reopened, fx.workspaceId)
    const deleted = history.find(row => row.path === 'Code/alpha/src/gone.ts')
    assert.ok(deleted, 'the deletion left a tombstone')
    assert.equal(deleted!.reason, 'deleted')
    assert.ok(deleted!.generation > 1)
    assert.equal(history.find(row => row.path === 'Code/alpha/src/mover.ts')?.reason, 'renamed')

    // The new file arrived with its checkout and repo attached.
    const fresh = fileRow(reopened, fx.workspaceId, 'Code/alpha/src/fresh.ts')!
    assert.ok(fresh.repo_id && fresh.checkout_id)
  } finally {
    try { reopened?.close() } catch { /* already closed */ }
    fx.cleanup()
  }
})

test('a checkout that disappears is retired and its files tombstone', { skip: skipGit }, () => {
  const fx = planetFixture('planet-retire')
  try {
    const main = makeRepo(fx.codeDir, 'alpha', { 'src/x.ts': 'export function run() { return 1 }\n' })
    const linked = join(fx.codeDir, 'alpha--temp')
    git(main, ['worktree', 'add', '-q', '-b', 'temp', linked])
    registerPlanet(fx.db, fx.planetRoot)
    indexPlanetWorkspace(fx.db, fx.workspaceId)
    assert.equal(pathCount(fx.db, fx.workspaceId, 'Code/alpha--temp/src/x.ts'), 1)

    rmSync(linked, { recursive: true, force: true })
    const registered = registerPlanet(fx.db, fx.planetRoot)
    assert.equal(registered.checkouts, 1, 'the vanished checkout is no longer active')

    const view = listPlanet(fx.db, fx.workspaceId)
    const retired = view.checkouts.find(c => c.relPrefix === 'Code/alpha--temp')
    assert.ok(retired?.retiredAt, 'it is retired, not forgotten')
    assert.equal(view.totals.activeCheckouts, 1)

    const result = indexPlanetWorkspace(fx.db, fx.workspaceId)
    assert.equal(result.changed.deleted, 1)
    assert.equal(pathCount(fx.db, fx.workspaceId, 'Code/alpha--temp/src/x.ts'), 0)
    assert.ok(planetHistory(fx.db, fx.workspaceId)
      .some(row => row.path === 'Code/alpha--temp/src/x.ts' && row.reason === 'deleted'))
    // The retired checkout is no longer an index root.
    assert.deepEqual(scopeRoots(fx.db, fx.workspaceId)!.map(r => r.prefix), ['Code/alpha'])
  } finally { fx.cleanup() }
})

// ─────────────────────────────────────────────────────────────────────────────
// Exclusions
// ─────────────────────────────────────────────────────────────────────────────

test('credentials, keys and build noise are never indexed', { skip: skipGit }, () => {
  const fx = planetFixture('planet-secrets')
  try {
    const alpha = makeRepo(fx.codeDir, 'alpha', { 'src/ok.ts': 'export const ok = true\n' })
    const blocked = [
      'node_modules/pkg/dep.ts',
      'src/node_modules/deep.ts',            // never source at any depth
      'dist/bundle.js',
      'build/out.ts',                        // a root-level output folder
      '.plugbrain/index.ts',
      '.plugbrain-test/index.ts',
      '.env',
      '.env.production',
      // Textual extensions, blocked by the SECRET rule alone: without it these
      // would be indexed like any other JSON. This is the case the extension
      // allow-list cannot catch.
      'config/.env.json',
      'config/service-account.json',
      'security/credentials.json',
      'security/credentials.yaml',
      'tls/server.pem',
      'tls/private.key',
      '.ssh/id_rsa',
      'id_ed25519',
      'signing/release.ppk',
    ]
    for (const rel of blocked) write(alpha, rel, 'SECRET_MATERIAL_SHOULD_NOT_BE_INDEXED\n')
    // Files that a naive "skip anything with a dot or a suspicious name" rule
    // would throw away, and which are real content of this workspace: agent
    // notes under `.agents`, workflows, a root-level `lib/` (PlugMil-Web has
    // real TypeScript there) and a source file that merely LOOKS credential-like.
    const allowed = [
      'src/credentials.ts',
      '.github/workflows/ci.yml',
      '.agents/notes/proposed/feature/idea.md',
      'lib/globe.ts',
      'packages/plug/gateway/lib/handler.ts',
    ]
    for (const rel of allowed) write(alpha, rel, 'export const allowed = 1\n')

    registerPlanet(fx.db, fx.planetRoot)
    const result = indexPlanetWorkspace(fx.db, fx.workspaceId)

    for (const rel of blocked) {
      assert.equal(pathCount(fx.db, fx.workspaceId, `Code/alpha/${rel}`), 0,
        `${rel} must not be indexed`)
    }
    for (const rel of allowed) {
      assert.equal(pathCount(fx.db, fx.workspaceId, `Code/alpha/${rel}`), 1,
        `${rel} is real content and must be indexed`)
    }
    assert.equal(
      Number((fx.db.prepare(
        `SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?
           AND (path LIKE '%node_modules%' OR path LIKE '%/dist/%' OR path LIKE '%/.git/%'
                OR path LIKE '%/.plugbrain%')`)
        .get(fx.workspaceId) as { n: number }).n), 0)
    assert.equal(result.files, 1 + allowed.length, 'exactly the real sources')
    // The secret material never reached the store in any table the index owns.
    const leaked = fx.db.prepare(
      `SELECT COUNT(*) AS n FROM search_rows WHERE workspace_id = ? AND name LIKE 'SECRET%'`)
      .get(fx.workspaceId) as { n: number }
    assert.equal(Number(leaked.n), 0)

    assert.equal(isSecretPath('src/credentials.ts'), false)
    assert.equal(isSecretPath('.env'), true)
    assert.equal(isSkippedDir('.git', 1), true)
    assert.equal(isSkippedDir('node_modules', 4), true)
    assert.equal(isSkippedDir('.plugbrain-test', 1), true)
    assert.equal(isSkippedDir('build', 1), true)
    assert.equal(isSkippedDir('build', 2), false, 'a nested build/ is a source folder')
    assert.equal(isSkippedDir('.agents', 1), false, 'agent notes are content')
    assert.equal(isSkippedDir('lib', 1), false)
    assert.equal(isSecretPath('a/b/.env.local'), true)
    assert.equal(isSecretPath('keys/service.key'), true)
    assert.equal(isSecretPath('id_rsa'), true)
  } finally { fx.cleanup() }
})

test('a junction, a symlink and `..` cannot escape the planet', { skip: skipGit }, () => {
  const fx = planetFixture('planet-escape')
  let fileLink = false
  try {
    const alpha = makeRepo(fx.codeDir, 'alpha', { 'src/ok.ts': 'export const ok = true\n' })
    writeFileSync(join(fx.outside, 'secret.ts'), 'export const stolen = true\n')

    // A junction inside the checkout pointing out of the planet. This one is a
    // hard requirement, not an optional extra: junctions need no elevation on
    // Windows, so an implementation that only blocks textual `..` is simply
    // open, and a skipped case here would hide exactly the bug this checks.
    symlinkSync(fx.outside, join(alpha, 'escape'), 'junction')
    assert.ok(existsSync(join(alpha, 'escape')), 'the junction exists')

    // A file symlink needs elevation when Developer Mode is off, so this half
    // is reported honestly rather than demanded.
    try {
      symlinkSync(join(fx.outside, 'secret.ts'), join(alpha, 'link-file.ts'), 'file')
      fileLink = true
    } catch { fileLink = false }

    // The walker itself never follows a reparse point, link or no link.
    assert.equal(walk(alpha).some(f => f.rel.includes('escape')), false)
    if (fileLink) assert.equal(walk(alpha).some(f => f.rel.includes('link-file')), false)

    registerPlanet(fx.db, fx.planetRoot)
    const result = indexPlanetWorkspace(fx.db, fx.workspaceId)

    assert.ok(result.files > 0)
    for (const path of ['Code/alpha/escape/secret.ts', 'Code/alpha/link-file.ts']) {
      assert.equal(pathCount(fx.db, fx.workspaceId, path), 0, `${path} must not be indexed`)
    }
    assert.equal(
      Number((fx.db.prepare(
        `SELECT COUNT(*) AS n FROM files WHERE workspace_id = ? AND path LIKE '%escape%'`)
        .get(fx.workspaceId) as { n: number }).n), 0)
    assert.equal(searchHits(fx.db, fx.workspaceId, 'stolen').length, 0)

    // The same wall holds for the agent-facing access path, which is the only
    // sanctioned way to touch a workspace.
    access.registerAgent(fx.db, 'agent-escape')
    assert.throws(
      () => access.readFile(fx.db, fx.workspaceId, 'agent-escape', '../../outside/secret.ts'),
      access.AccessDenied, 'a textual traversal must be refused')
    assert.throws(
      () => access.writeFile(fx.db, fx.workspaceId, 'agent-escape', '../escaped.txt', 'x', 'task-x'),
      access.AccessDenied)
    assert.throws(
      () => access.readFile(fx.db, fx.workspaceId, 'agent-escape', 'Code/alpha/escape/secret.ts'),
      access.AccessDenied, 'a junction out of the planet must be refused')
    assert.throws(
      () => access.writeFile(fx.db, fx.workspaceId, 'agent-escape', 'Code/alpha/escape/written.ts', 'x', 'task-x'),
      access.AccessDenied)
    if (fileLink) {
      assert.throws(
        () => access.readFile(fx.db, fx.workspaceId, 'agent-escape', 'Code/alpha/link-file.ts'),
        access.AccessDenied, 'a symlinked file out of the planet must be refused')
    }
    // Nothing was written outside the planet by any of the attempts above.
    assert.equal(existsSync(join(fx.outside, 'escaped.txt')), false)
    assert.equal(existsSync(join(fx.outside, 'written.ts')), false)
  } finally { fx.cleanup() }
})

test('a folder inside Code/ that is not a checkout is not a repo', { skip: skipGit }, () => {
  const fx = planetFixture('planet-noncheckout')
  try {
    makeRepo(fx.codeDir, 'alpha', { 'src/x.ts': 'export const x = 1\n' })
    mkdirSync(join(fx.codeDir, 'notes-only'), { recursive: true })
    write(join(fx.codeDir, 'notes-only'), 'readme.md', '# not a repo\n')

    const registered = registerPlanet(fx.db, fx.planetRoot)
    assert.equal(registered.repos, 1)
    assert.equal(registered.checkouts, 1)
    assert.deepEqual(discoverCheckouts(fx.codeDir, fx.planetId).map(c => c.relPrefix), ['Code/alpha'])

    indexPlanetWorkspace(fx.db, fx.workspaceId)
    assert.equal(pathCount(fx.db, fx.workspaceId, 'Code/notes-only/readme.md'), 0,
      'a planet only indexes what it can attribute')
  } finally { fx.cleanup() }
})

test('a plain workspace is still a plain workspace', { skip: skipGit }, () => {
  const fx = planetFixture('planet-plain')
  try {
    const root = join(fx.dir, 'plain')
    write(root, 'src/a.ts', 'export const a = 1\n')
    const workspaceId = workspaceIdFor(root)
    fx.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(workspaceId, 'plain', root, new Date().toISOString())

    assert.equal(scopeRoots(fx.db, workspaceId), null, 'not a planet')
    const result = indexPlanetWorkspace(fx.db, workspaceId)
    assert.equal(result.files, 1)
    assert.equal(fileRow(fx.db, workspaceId, 'src/a.ts')!.checkout_id, null,
      'no checkout, no invented attribution')
    assert.throws(() => listPlanet(fx.db, workspaceId), /not a planet/)
  } finally { fx.cleanup() }
})
