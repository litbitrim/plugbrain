/**
 * Pruning the rows of checkouts that left the selection.
 *
 * Real git repositories on a real disk and the real store, as in planet.test.ts.
 * The properties that matter are the ones a plausible prune gets wrong:
 *
 *   - every row a cascade would have removed is gone, and nothing of the kept
 *     checkouts or the notes is touched;
 *   - no tombstone is written, because nothing was deleted from disk;
 *   - attribution survives and comes back when the checkout is selected again;
 *   - a missing selection, or a child table the prune cannot reach by index,
 *     is refused instead of guessed around.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'
import * as access from '../src/access.ts'
import { openStore } from '../src/store/schema.ts'
import {
  discoverCheckouts, indexPlanetWorkspace, listPlanet, registerPlanet, setPlanetIndexSelection, workspaceIdFor,
} from '../src/planet.ts'
import { compactStore, planPrune, prunePlanet } from '../src/index/prune.ts'
import { readRunState } from '../src/index/runs.ts'

const home = mkdtempSync(join(tmpdir(), 'plugbrain-prune-home-'))
process.env.PLUGBRAIN_HOME = home
process.on('exit', () => { rmSync(home, { recursive: true, force: true }) })

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

function write(root: string, rel: string, content: string): void {
  const abs = join(root, rel)
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, content)
  const future = new Date(Date.now() + 2000)
  utimesSync(abs, future, future)
}

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

const n = (db: DatabaseSync, sql: string, ...params: string[]): number =>
  Number((db.prepare(sql).get(...params) as { n: number }).n)

const REPO_FILES = (name: string): Record<string, string> => ({
  'src/core.ts': `export function ${name}Core(x: number) { return x + 1 }\nexport class ${name}Store { run() { return ${name}Core(1) } }\n`,
  'src/use.ts': `import { ${name}Core, ${name}Store } from './core'\nexport const ${name}Value = ${name}Core(2) + new ${name}Store().run()\n`,
})

interface Fixture {
  dir: string
  root: string
  codeDir: string
  dbFile: string
  db: DatabaseSync
  ws: string
  alpha: string
  beta: string
  cleanup: () => void
}

/** Two repos and a vault note, all selected and indexed. */
function fixture(name: string): Fixture {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-${name}-`))
  const root = join(dir, 'plugpt')
  const codeDir = join(root, 'Code')
  mkdirSync(codeDir, { recursive: true })
  makeRepo(codeDir, 'alpha', REPO_FILES('alpha'))
  makeRepo(codeDir, 'beta', REPO_FILES('beta'))
  write(root, 'Planung/Plan.md', '---\ntyp: plan\n---\n# Plan\nSiehe [[Ziel]] und #roadmap\n')
  write(root, 'Planung/Ziel.md', '# Ziel\nZurück zum [[Plan]]\n')
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const registered = registerPlanet(db, root)
  const checkouts = discoverCheckouts(codeDir, registered.planetId)
  const alpha = checkouts.find(c => c.relPrefix === 'Code/alpha')!.checkoutId
  const beta = checkouts.find(c => c.relPrefix === 'Code/beta')!.checkoutId
  setPlanetIndexSelection(db, registered.workspaceId, [alpha, beta])
  indexPlanetWorkspace(db, registered.workspaceId)
  return {
    dir, root, codeDir, dbFile, db, ws: registered.workspaceId, alpha, beta,
    cleanup: () => { try { db.close() } catch { /* closed */ } rmSync(dir, { recursive: true, force: true }) },
  }
}

/** Every row that belongs to one checkout, table by table. */
function footprint(db: DatabaseSync, ws: string, checkoutId: string): Record<string, number> {
  const files = `SELECT id FROM files WHERE workspace_id = '${ws}' AND checkout_id = '${checkoutId}'`
  const symbols = `SELECT id FROM symbols WHERE file_id IN (${files})`
  return {
    files: n(db, `SELECT COUNT(*) AS n FROM (${files})`),
    symbols: n(db, `SELECT COUNT(*) AS n FROM (${symbols})`),
    edges: n(db, `SELECT COUNT(*) AS n FROM edges WHERE src_file IN (${files}) OR dst_file IN (${files})
      OR src_symbol IN (${symbols}) OR dst_symbol IN (${symbols})`),
    refs: n(db, `SELECT COUNT(*) AS n FROM file_refs WHERE file_id IN (${files})`),
    imports: n(db, `SELECT COUNT(*) AS n FROM file_imports WHERE file_id IN (${files})`),
    search: n(db, `SELECT COUNT(*) AS n FROM search_rows WHERE file_id IN (${files})`),
  }
}

test('a prune removes a deselected checkout completely and leaves the rest as it was', { skip: skipGit }, () => {
  const fx = fixture('prune-deselected')
  try {
    access.ensureAgent(fx.db, 'nv01')
    access.writeFile(fx.db, fx.ws, 'nv01', 'Code/beta/src/owned.ts', 'export const owned = 1\n')
    const written = fx.db.prepare('SELECT checkout_id AS checkoutId FROM files WHERE workspace_id = ? AND path = ?')
      .get(fx.ws, 'Code/beta/src/owned.ts') as { checkoutId: string | null }
    assert.equal(written.checkoutId, fx.beta, 'a write through the brain names its checkout at once')
    indexPlanetWorkspace(fx.db, fx.ws)
    const betaBefore = footprint(fx.db, fx.ws, fx.beta)
    const alphaBefore = footprint(fx.db, fx.ws, fx.alpha)
    assert.ok(betaBefore.symbols > 0 && betaBefore.edges > 0 && betaBefore.search > 0, 'beta was really indexed')
    const notesBefore = n(fx.db, 'SELECT COUNT(*) AS n FROM note_links')
    const tombstonesBefore = n(fx.db, 'SELECT COUNT(*) AS n FROM file_tombstones')

    setPlanetIndexSelection(fx.db, fx.ws, [fx.alpha])
    const plan = planPrune(fx.db, fx.ws)
    assert.deepEqual(plan.candidates.map(c => [c.relPrefix, c.reason, c.files]),
      [['Code/beta', 'deselected', betaBefore.files]])
    assert.deepEqual(plan.keptCheckouts, [fx.alpha])

    const ticks: number[] = []
    const result = prunePlanet(fx.db, fx.ws, { batchFiles: 1, onProgress: tick => ticks.push(tick.overallDone) })
    assert.equal(result.files, betaBefore.files)
    assert.equal(result.orphans, 0)
    assert.deepEqual(ticks, Array.from({ length: betaBefore.files }, (_, i) => i + 1), 'one tick per batch')
    assert.equal(result.deleted.files, betaBefore.files)
    assert.equal(result.deleted.symbols, betaBefore.symbols)

    assert.deepEqual(footprint(fx.db, fx.ws, fx.beta),
      { files: 0, symbols: 0, edges: 0, refs: 0, imports: 0, search: 0 })
    assert.deepEqual(footprint(fx.db, fx.ws, fx.alpha), alphaBefore, 'the kept checkout is untouched')
    assert.equal(n(fx.db, 'SELECT COUNT(*) AS n FROM note_links'), notesBefore, 'notes are untouched')
    assert.equal(n(fx.db, 'SELECT COUNT(*) AS n FROM file_tombstones'), tombstonesBefore,
      'nothing was deleted from disk, so nothing is tombstoned')
    assert.equal(n(fx.db, "SELECT COUNT(*) AS n FROM search WHERE search MATCH 'betaCore*'"), 0,
      'the full-text index forgot beta')
    assert.ok(n(fx.db, "SELECT COUNT(*) AS n FROM search WHERE search MATCH 'alphaCore*'") > 0)
    assert.equal((fx.db.prepare('PRAGMA foreign_key_check').all() as unknown[]).length, 0)
    assert.equal(n(fx.db, 'SELECT foreign_keys AS n FROM pragma_foreign_keys'), 1, 'foreign keys are back on')

    const owner = fx.db.prepare(
      "SELECT agent_id AS agent FROM path_owner WHERE workspace_id = ? AND path = 'Code/beta/src/owned.ts'")
      .get(fx.ws) as { agent: string } | undefined
    assert.equal(owner?.agent, 'nv01', 'attribution is kept by path')
    const state = fx.db.prepare('SELECT file_count AS files FROM workspace_index_state WHERE workspace_id = ?')
      .get(fx.ws) as { files: number }
    assert.equal(Number(state.files), n(fx.db, 'SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?', fx.ws))
    const log = fx.db.prepare('SELECT files, detail FROM index_prunes').all() as Array<{ files: number; detail: string }>
    assert.equal(log.length, 1)
    assert.equal(Number(log[0]!.files), betaBefore.files)
    assert.equal(readRunState(fx.ws), null, 'the run lock is released and the previous state restored')

    // Selecting beta again brings it back, attribution included.
    setPlanetIndexSelection(fx.db, fx.ws, [fx.alpha, fx.beta])
    indexPlanetWorkspace(fx.db, fx.ws)
    assert.deepEqual(footprint(fx.db, fx.ws, fx.beta), betaBefore)
    const restored = fx.db.prepare(
      `SELECT o.agent_id AS agent FROM file_owner o JOIN files f ON f.id = o.file_id
        WHERE f.workspace_id = ? AND f.path = 'Code/beta/src/owned.ts'`).get(fx.ws) as { agent: string } | undefined
    assert.equal(restored?.agent, 'nv01', 'the owner comes back with the file')
  } finally { fx.cleanup() }
})

test('a retired checkout is pruned with its reason, and an unchanged selection prunes nothing', { skip: skipGit }, () => {
  const fx = fixture('prune-retired')
  try {
    assert.equal(planPrune(fx.db, fx.ws).files, 0, 'everything indexed is selected')
    rmSync(join(fx.codeDir, 'beta'), { recursive: true, force: true })
    registerPlanet(fx.db, fx.root)
    const betaRow = listPlanet(fx.db, fx.ws).checkouts.find(c => c.id === fx.beta)
    assert.ok(betaRow?.retiredAt, 'the vanished checkout is retired, not deleted')
    const plan = planPrune(fx.db, fx.ws)
    assert.deepEqual(plan.candidates.map(c => [c.relPrefix, c.reason]), [['Code/beta', 'retired']])
    const result = prunePlanet(fx.db, fx.ws)
    assert.equal(result.files, plan.files)
    assert.equal(planPrune(fx.db, fx.ws).files, 0)
    assert.equal(prunePlanet(fx.db, fx.ws).files, 0, 'a second prune has nothing to do')
  } finally { fx.cleanup() }
})

test('a prune refuses a missing or empty selection and an unreachable child table', { skip: skipGit }, () => {
  const fx = fixture('prune-refusals')
  try {
    fx.db.exec('DELETE FROM planet_index_checkout_selections; DELETE FROM planet_index_selections')
    assert.throws(() => planPrune(fx.db, fx.ws), /no persisted selection/)
    setPlanetIndexSelection(fx.db, fx.ws, [])
    assert.throws(() => prunePlanet(fx.db, fx.ws), /selects no checkout/)
    assert.equal(planPrune(fx.db, fx.ws, { allowEmptySelection: true }).candidates.length, 2)

    setPlanetIndexSelection(fx.db, fx.ws, [fx.alpha])
    fx.db.exec(`CREATE TABLE unindexed_child (
      id INTEGER PRIMARY KEY, file_id INTEGER REFERENCES files(id) ON DELETE CASCADE)`)
    const before = n(fx.db, 'SELECT COUNT(*) AS n FROM files')
    assert.throws(() => prunePlanet(fx.db, fx.ws), /unindexed_child\.file_id has no index/)
    assert.equal(n(fx.db, 'SELECT COUNT(*) AS n FROM files'), before, 'a refusal removes nothing')
    fx.db.exec('CREATE INDEX idx_unindexed_child_file ON unindexed_child(file_id)')
    const betaFile = fx.db.prepare(
      "SELECT id FROM files WHERE workspace_id = ? AND checkout_id = ? LIMIT 1").get(fx.ws, fx.beta) as { id: number }
    fx.db.prepare('INSERT INTO unindexed_child (file_id) VALUES (?)').run(betaFile.id)
    const result = prunePlanet(fx.db, fx.ws)
    assert.equal(result.deleted.unindexed_child, 1, 'a table added later is covered without being named')
  } finally { fx.cleanup() }
})

test('compaction gives the pages back and refuses when the disk cannot hold the copy', { skip: skipGit }, () => {
  const fx = fixture('prune-compact')
  try {
    setPlanetIndexSelection(fx.db, fx.ws, [fx.alpha])
    prunePlanet(fx.db, fx.ws)
    assert.throws(() => compactStore(fx.db, fx.dbFile, 1024 ** 5), /compaction needs about/)
    const result = compactStore(fx.db, fx.dbFile)
    assert.ok(result.afterBytes <= result.beforeBytes, `${result.afterBytes} <= ${result.beforeBytes}`)
    assert.equal(n(fx.db, 'SELECT freelist_count AS n FROM pragma_freelist_count'), 0)
    assert.ok(n(fx.db, "SELECT COUNT(*) AS n FROM search WHERE search MATCH 'alphaCore*'") > 0,
      'the full-text index still answers after optimize and vacuum')
    assert.equal(workspaceIdFor(fx.root), fx.ws)
  } finally { fx.cleanup() }
})
