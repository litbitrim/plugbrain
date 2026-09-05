/**
 * Regression tests for the PlugBrain core index gates.
 *
 * Every test here exists because the behaviour it checks was WRONG before:
 * ownership was destroyed by a successful reindex, every run rebuilt the whole
 * workspace, and name resolution took a global first match. A test that only
 * asserted "indexing produced some rows" would have passed against all three
 * defects, so each case below asserts the specific property that was broken.
 *
 * No fixture stands in for the indexer: these run the real indexer over a real
 * temporary workspace on disk and read the real SQLite database back.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, unlinkSync, renameSync, utimesSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { indexWorkspace } from '../src/indexer/index.ts'

interface Fixture {
  dir: string
  dbFile: string
  db: DatabaseSync
  workspaceId: string
  cleanup: () => void
}

function fixture(name: string): Fixture {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-${name}-`))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = 'ws-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, name, root, new Date().toISOString())
  return {
    dir: root, dbFile, db, workspaceId,
    cleanup: () => { try { db.close() } catch { /* already closed */ } rmSync(dir, { recursive: true, force: true }) },
  }
}

/** Write a file and push its mtime forward so a same-second edit is still seen. */
function write(root: string, rel: string, content: string): void {
  const abs = join(root, rel)
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, content)
  const future = new Date(Date.now() + 2000)
  utimesSync(abs, future, future)
}

function agent(fx: Fixture, id: string): void {
  fx.db.prepare(
    'INSERT INTO agents (id, name, color, hue, first_seen, last_seen) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, id, '#123456', 200, new Date().toISOString(), new Date().toISOString())
}

function own(fx: Fixture, path: string, agentId: string): void {
  const row = fx.db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
    .get(fx.workspaceId, path) as { id: number } | undefined
  assert.ok(row, `expected an indexed file row for ${path}`)
  fx.db.prepare('INSERT INTO file_owner (file_id, agent_id, action, at) VALUES (?, ?, ?, ?)')
    .run(row.id, agentId, 'write', new Date().toISOString())
}

function ownerOf(fx: Fixture, path: string): string | null {
  const row = fx.db.prepare(
    `SELECT o.agent_id AS agentId FROM file_owner o
       JOIN files f ON f.id = o.file_id
      WHERE f.workspace_id = ? AND f.path = ?`).get(fx.workspaceId, path) as { agentId: string | null } | undefined
  return row?.agentId ?? null
}

// ---------------------------------------------------------------------------
// Gate 1 — a successful reindex must not destroy attribution
// ---------------------------------------------------------------------------

test('gate 1: two files with two different owners keep their owners across an incremental reindex', () => {
  const fx = fixture('own-inc')
  try {
    write(fx.dir, 'alpha.ts', 'export function alpha() { return 1 }\n')
    write(fx.dir, 'beta.ts', 'export function beta() { return 2 }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    agent(fx, 'agent-one')
    agent(fx, 'agent-two')
    own(fx, 'alpha.ts', 'agent-one')
    own(fx, 'beta.ts', 'agent-two')

    // Change only alpha; beta is untouched.
    write(fx.dir, 'alpha.ts', 'export function alpha() { return 11 }\n')
    const second = indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    assert.equal(second.mode, 'incremental')
    assert.equal(ownerOf(fx, 'alpha.ts'), 'agent-one', 'modified file lost its owner')
    assert.equal(ownerOf(fx, 'beta.ts'), 'agent-two', 'untouched file lost its owner')
  } finally { fx.cleanup() }
})

test('gate 1: a FORCED full rebuild still restores both owners in the same transaction', () => {
  const fx = fixture('own-full')
  try {
    write(fx.dir, 'alpha.ts', 'export function alpha() { return 1 }\n')
    write(fx.dir, 'beta.ts', 'export function beta() { return 2 }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    agent(fx, 'agent-one')
    agent(fx, 'agent-two')
    own(fx, 'alpha.ts', 'agent-one')
    own(fx, 'beta.ts', 'agent-two')

    // A full rebuild deletes and recreates every file row, which is exactly
    // the path that used to cascade file_owner away.
    const rebuilt = indexWorkspace(fx.db, fx.workspaceId, fx.dir, { full: true })
    assert.equal(rebuilt.mode, 'full')
    assert.equal(ownerOf(fx, 'alpha.ts'), 'agent-one', 'full rebuild dropped an owner')
    assert.equal(ownerOf(fx, 'beta.ts'), 'agent-two', 'full rebuild dropped an owner')
  } finally { fx.cleanup() }
})

// ---------------------------------------------------------------------------
// Gates 2 + 3 — incremental generations, checkpoints and tombstones
// ---------------------------------------------------------------------------

test('gate 3: an unchanged workspace does no work and does not burn a generation', () => {
  const fx = fixture('unchanged')
  try {
    write(fx.dir, 'a.ts', 'export const a = 1\n')
    const first = indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    assert.equal(first.mode, 'full')
    assert.equal(first.generation, 1)

    const second = indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    assert.equal(second.mode, 'unchanged', 'a quiet workspace triggered real work')
    assert.equal(second.reparsed, 0, 'a quiet workspace re-parsed files')
    assert.equal(second.generation, 1, 'a no-op run advanced the generation')
  } finally { fx.cleanup() }
})

test('gate 2: editing one file of many re-parses exactly that one file', () => {
  const fx = fixture('one-file')
  try {
    for (let i = 0; i < 12; i += 1) {
      write(fx.dir, `mod${i}.ts`, `export function fn${i}() { return ${i} }\n`)
    }
    const first = indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    assert.equal(first.reparsed, 12)

    write(fx.dir, 'mod7.ts', 'export function fn7() { return 700 }\n')
    const second = indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    assert.equal(second.mode, 'incremental')
    assert.equal(second.reparsed, 1, 'an edit to one file re-parsed more than one file')
    assert.equal(second.changed.modified, 1)
    assert.equal(second.changed.unchanged, 11)
    assert.equal(second.generation, 2)
  } finally { fx.cleanup() }
})

test('gate 2: a delete removes the file and leaves a tombstone', () => {
  const fx = fixture('delete')
  try {
    write(fx.dir, 'keep.ts', 'export const keep = 1\n')
    write(fx.dir, 'gone.ts', 'export const gone = 2\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    unlinkSync(join(fx.dir, 'gone.ts'))
    const second = indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    assert.equal(second.changed.deleted, 1)
    const remaining = fx.db.prepare('SELECT path FROM files WHERE workspace_id = ?')
      .all(fx.workspaceId) as unknown as Array<{ path: string }>
    assert.deepEqual(remaining.map(r => r.path), ['keep.ts'])
    const tomb = fx.db.prepare(
      'SELECT path, reason, generation FROM file_tombstones WHERE workspace_id = ?')
      .all(fx.workspaceId) as unknown as Array<{ path: string; reason: string; generation: number }>
    assert.equal(tomb.length, 1)
    assert.equal(tomb[0].path, 'gone.ts')
    assert.equal(tomb[0].reason, 'deleted')
  } finally { fx.cleanup() }
})

test('gate 2: a rename keeps the file row, and therefore keeps the owner and history', () => {
  const fx = fixture('rename')
  try {
    write(fx.dir, 'old-name.ts', 'export function stable() { return 1 }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    agent(fx, 'agent-renamer')
    own(fx, 'old-name.ts', 'agent-renamer')
    const before = fx.db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
      .get(fx.workspaceId, 'old-name.ts') as { id: number }

    renameSync(join(fx.dir, 'old-name.ts'), join(fx.dir, 'new-name.ts'))
    const future = new Date(Date.now() + 2000)
    utimesSync(join(fx.dir, 'new-name.ts'), future, future)
    const second = indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    assert.equal(second.changed.renamed, 1, 'rename was not detected as a rename')
    assert.equal(second.changed.added, 0)
    assert.equal(second.changed.deleted, 0)
    const after = fx.db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
      .get(fx.workspaceId, 'new-name.ts') as { id: number }
    assert.equal(after.id, before.id, 'rename replaced the row instead of moving it')
    assert.equal(ownerOf(fx, 'new-name.ts'), 'agent-renamer', 'rename lost the owner')
    const tomb = fx.db.prepare(
      'SELECT reason FROM file_tombstones WHERE workspace_id = ? AND path = ?')
      .get(fx.workspaceId, 'old-name.ts') as { reason: string } | undefined
    assert.equal(tomb?.reason, 'renamed')
  } finally { fx.cleanup() }
})

test('gate 2: a failure mid-build leaves the previous generation completely intact', () => {
  const fx = fixture('rollback')
  try {
    write(fx.dir, 'a.ts', 'export const a = 1\n')
    write(fx.dir, 'b.ts', 'export const b = 2\n')
    const first = indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    const filesBefore = fx.db.prepare('SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
      .get(fx.workspaceId) as { n: number }
    const edgesBefore = fx.db.prepare('SELECT COUNT(*) AS n FROM edges WHERE workspace_id = ?')
      .get(fx.workspaceId) as { n: number }

    // Force the write half to fail: a NOT NULL violation on symbols during the
    // build, triggered by a trigger that only fires inside the next run.
    fx.db.exec(`CREATE TRIGGER boom BEFORE INSERT ON symbols BEGIN
                  SELECT RAISE(ABORT, 'injected failure');
                END;`)
    write(fx.dir, 'c.ts', 'export const c = 3\n')
    assert.throws(() => indexWorkspace(fx.db, fx.workspaceId, fx.dir), /injected failure/)
    fx.db.exec('DROP TRIGGER boom')

    const filesAfter = fx.db.prepare('SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
      .get(fx.workspaceId) as { n: number }
    const edgesAfter = fx.db.prepare('SELECT COUNT(*) AS n FROM edges WHERE workspace_id = ?')
      .get(fx.workspaceId) as { n: number }
    assert.equal(filesAfter.n, filesBefore.n, 'a failed build changed the published file set')
    assert.equal(edgesAfter.n, edgesBefore.n, 'a failed build changed the published edge set')

    const state = fx.db.prepare(
      'SELECT generation, failure_reason FROM workspace_index_state WHERE workspace_id = ?')
      .get(fx.workspaceId) as { generation: number; failure_reason: string | null }
    assert.equal(state.generation, first.generation, 'a failed build advanced the generation')
    assert.match(String(state.failure_reason), /injected failure/)
  } finally { fx.cleanup() }
})

test('gate 3: the checkpoint survives a close and reopen; only the delta is processed', () => {
  const fx = fixture('restart')
  try {
    for (let i = 0; i < 6; i += 1) write(fx.dir, `f${i}.ts`, `export const v${i} = ${i}\n`)
    const first = indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    assert.equal(first.generation, 1)
    fx.db.close()

    // A brand new process opening the same database must not rebuild.
    const reopened = openStore(fx.dbFile)
    const quiet = indexWorkspace(reopened, fx.workspaceId, fx.dir)
    assert.equal(quiet.mode, 'unchanged', 'restart triggered a full reindex')
    assert.equal(quiet.reparsed, 0)

    write(fx.dir, 'f3.ts', 'export const v3 = 333\n')
    const delta = indexWorkspace(reopened, fx.workspaceId, fx.dir)
    assert.equal(delta.mode, 'incremental')
    assert.equal(delta.reparsed, 1, 'restart delta re-parsed more than the changed file')
    assert.equal(delta.generation, 2)
    reopened.close()
  } finally { fx.cleanup() }
})

// ---------------------------------------------------------------------------
// Gate 4 — module-scoped resolution, no global first match
// ---------------------------------------------------------------------------

interface EdgeRow {
  raw_target: string
  resolved: number
  ambiguous: number
  candidates: number
  dst_symbol: number | null
}

function callEdges(fx: Fixture, fromPath: string, target: string): EdgeRow[] {
  return fx.db.prepare(
    `SELECT e.raw_target, e.resolved, e.ambiguous, e.candidates, e.dst_symbol
       FROM edges e JOIN files f ON f.id = e.src_file
      WHERE f.workspace_id = ? AND f.path = ? AND e.kind = 'calls' AND e.raw_target = ?`)
    .all(fx.workspaceId, fromPath, target) as unknown as EdgeRow[]
}

function fileOfSymbol(fx: Fixture, symbolId: number): string {
  const row = fx.db.prepare(
    'SELECT f.path AS path FROM symbols s JOIN files f ON f.id = s.file_id WHERE s.id = ?')
    .get(symbolId) as { path: string }
  return row.path
}

test('gate 4: the same symbol name in two modules resolves per importing module', () => {
  const fx = fixture('scoped')
  try {
    write(fx.dir, 'alpha.ts', 'export function run() { return "alpha" }\n')
    write(fx.dir, 'beta.ts', 'export function run() { return "beta" }\n')
    write(fx.dir, 'usesAlpha.ts', 'import { run } from "./alpha.ts"\nexport function go() { return run() }\n')
    write(fx.dir, 'usesBeta.ts', 'import { run } from "./beta.ts"\nexport function go() { return run() }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    const fromAlpha = callEdges(fx, 'usesAlpha.ts', 'run')
    assert.equal(fromAlpha.length, 1)
    assert.equal(fromAlpha[0].resolved, 1, 'an explicitly imported name did not resolve')
    assert.equal(fileOfSymbol(fx, fromAlpha[0].dst_symbol as number), 'alpha.ts')

    const fromBeta = callEdges(fx, 'usesBeta.ts', 'run')
    assert.equal(fromBeta.length, 1)
    assert.equal(fromBeta[0].resolved, 1)
    assert.equal(fileOfSymbol(fx, fromBeta[0].dst_symbol as number), 'beta.ts',
      'resolution picked a global first match instead of the imported module')
  } finally { fx.cleanup() }
})

test('gate 4: an unimportable ambiguous name is marked ambiguous, never guessed', () => {
  const fx = fixture('ambiguous')
  try {
    write(fx.dir, 'alpha.ts', 'export function run() { return "alpha" }\n')
    write(fx.dir, 'beta.ts', 'export function run() { return "beta" }\n')
    // No import at all: two plausible definitions and nothing to choose with.
    write(fx.dir, 'blind.ts', 'export function go() { return run() }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    const edges = callEdges(fx, 'blind.ts', 'run')
    assert.equal(edges.length, 1)
    assert.equal(edges[0].resolved, 0, 'an ambiguous name was reported as resolved')
    assert.equal(edges[0].ambiguous, 1, 'an ambiguous name was not marked ambiguous')
    assert.equal(edges[0].candidates, 2, 'the candidate count was not recorded')
    assert.equal(edges[0].dst_symbol, null, 'an ambiguous edge still picked a target')
  } finally { fx.cleanup() }
})

test('gate 4: a namespace receiver pins the call to the imported module', () => {
  const fx = fixture('namespace')
  try {
    write(fx.dir, 'alpha.ts', 'export function run() { return "alpha" }\n')
    write(fx.dir, 'beta.ts', 'export function run() { return "beta" }\n')
    write(fx.dir, 'viaNs.ts', 'import * as beta from "./beta.ts"\nexport function go() { return beta.run() }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    const edges = callEdges(fx, 'viaNs.ts', 'run')
    assert.equal(edges.length, 1)
    assert.equal(edges[0].resolved, 1, 'a namespace call did not resolve')
    assert.equal(fileOfSymbol(fx, edges[0].dst_symbol as number), 'beta.ts')
  } finally { fx.cleanup() }
})

test('gate 4: a rename re-resolves dependants, and a delete un-resolves them honestly', () => {
  const fx = fixture('reresolve')
  try {
    write(fx.dir, 'target.ts', 'export function only() { return 1 }\n')
    write(fx.dir, 'caller.ts', 'import { only } from "./target.ts"\nexport function go() { return only() }\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    assert.equal(callEdges(fx, 'caller.ts', 'only')[0].resolved, 1)

    // Delete the definition. The caller is untouched on disk, but its edge must
    // stop claiming to be resolved.
    unlinkSync(join(fx.dir, 'target.ts'))
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)
    const after = callEdges(fx, 'caller.ts', 'only')
    assert.equal(after.length, 1, 'the caller lost its edge entirely instead of un-resolving it')
    assert.equal(after[0].resolved, 0, 'an edge still pointed at a deleted definition')
  } finally { fx.cleanup() }
})

// ---------------------------------------------------------------------------
// Gate 6 — legacy FTS rows are reconciled away against a COPY of a real db
// ---------------------------------------------------------------------------

test('gate 6: orphaned search rows are reconciled away by a successful index', () => {
  const fx = fixture('reconcile')
  try {
    write(fx.dir, 'live.ts', 'export const live = 1\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    // Simulate exactly what the legacy migration leaves behind: search rows
    // whose file and symbol no longer exist anywhere.
    fx.db.prepare(
      `INSERT INTO search_rows (workspace_id, name, path, kind, symbol_id, file_id)
       VALUES (?, 'ghost', 'ghost.ts', 'file', NULL, 999999)`).run(fx.workspaceId)
    fx.db.prepare(
      `INSERT INTO search_rows (workspace_id, name, path, kind, symbol_id, file_id)
       VALUES (?, 'ghostSymbol', 'ghost.ts', 'function', 999999, NULL)`).run(fx.workspaceId)
    const before = fx.db.prepare(
      'SELECT COUNT(*) AS n FROM search_rows WHERE workspace_id = ?')
      .get(fx.workspaceId) as { n: number }

    write(fx.dir, 'live.ts', 'export const live = 2\n')
    indexWorkspace(fx.db, fx.workspaceId, fx.dir)

    const ghosts = fx.db.prepare(
      `SELECT COUNT(*) AS n FROM search_rows
        WHERE workspace_id = ? AND path = 'ghost.ts'`).get(fx.workspaceId) as { n: number }
    assert.equal(ghosts.n, 0, 'legacy orphan search rows survived a successful index')
    assert.ok(before.n > 0)

    // The live rows are still searchable through the FTS index.
    const hit = fx.db.prepare(
      `SELECT r.path AS path FROM search s JOIN search_rows r ON r.id = s.rowid
        WHERE search MATCH 'live' AND r.workspace_id = ?`).all(fx.workspaceId) as unknown as Array<{ path: string }>
    assert.ok(hit.some(row => row.path === 'live.ts'), 'the live file fell out of the search index')
  } finally { fx.cleanup() }
})

test('gate 6: migration + reconcile run against a COPY, leaving the original file untouched', () => {
  const fx = fixture('legacy-copy')
  try {
    // Build a database in the OLD shape: a six-column all-in-one FTS table.
    const legacyFile = join(fx.dir, '..', 'legacy-original.db')
    const legacy = new DatabaseSync(legacyFile)
    legacy.exec(`
      CREATE TABLE workspaces (id TEXT PRIMARY KEY, name TEXT NOT NULL, root TEXT NOT NULL UNIQUE,
                               created_at TEXT NOT NULL, indexed_at TEXT);
      CREATE VIRTUAL TABLE search USING fts5(name, path, kind, workspace_id UNINDEXED,
                                             symbol_id UNINDEXED, file_id UNINDEXED);
    `)
    legacy.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run('ws-legacy', 'legacy', join(fx.dir, 'legacy-root'), new Date().toISOString())
    for (let i = 0; i < 25; i += 1) {
      legacy.prepare(
        `INSERT INTO search (name, path, kind, workspace_id, symbol_id, file_id)
         VALUES (?, ?, 'function', 'ws-legacy', NULL, NULL)`).run(`legacySymbol${i}`, `legacy/file${i}.ts`)
    }
    const legacyCount = (legacy.prepare('SELECT COUNT(*) AS n FROM search').get() as { n: number }).n
    legacy.close()
    assert.equal(legacyCount, 25)

    // Work on a COPY. The original must never be opened for migration.
    const workingCopy = join(fx.dir, '..', 'legacy-copy.db')
    copyFileSync(legacyFile, workingCopy)
    const migrated = openStore(workingCopy)
    const rows = migrated.prepare(
      "SELECT COUNT(*) AS n FROM search_rows WHERE workspace_id = 'ws-legacy'").get() as { n: number }
    assert.equal(rows.n, 25, 'legacy FTS rows were lost by the migration')
    const searchable = migrated.prepare(
      "SELECT COUNT(*) AS n FROM search WHERE search MATCH 'legacySymbol7'").get() as { n: number }
    assert.equal(searchable.n, 1, 'migrated rows are not searchable')
    migrated.close()

    // The original is still in the legacy shape: untouched.
    const verify = new DatabaseSync(legacyFile)
    const definition = verify.prepare(
      "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'search'").get() as { sql: string }
    assert.ok(!/content\s*=/.test(definition.sql), 'the ORIGINAL legacy database was modified')
    assert.equal((verify.prepare('SELECT COUNT(*) AS n FROM search').get() as { n: number }).n, 25)
    verify.close()
  } finally { fx.cleanup() }
})
