/**
 * N2.1 Budget tests: the five Board read routes the brief names —
 * /api/atlas/snapshot, /api/galaxy, /api/intel/status, /api/planet and
 * /api/graph — answer under a time budget, and the hot queries are
 * index-served (read back from SQLite's EXPLAIN QUERY PLAN, not assumed).
 *
 * The full-scale measurement (>= 50k files, cold/warm, exit code) lives in
 * scripts/bench-board-reads.mjs; this test pins the same guarantees on a
 * smaller fixture so the suite catches a regression that reintroduces the
 * per-request recount.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'

const FILE_COUNT = 3000
const SYMBOLS_PER_FILE = 4
const EDGES_PER_FILE = 12
/** CI-safe ceiling; the 1 s production budget is enforced by the bench script. */
const BUDGET_SECONDS = 2

/** The hot queries, the access path each must be served by, and its binds. */
const HOT_QUERIES = [
  { index: 'idx_files_ws_path', accept: ['idx_files_ws_path', 'sqlite_autoindex_files_1', 'idx_activity_ws_path'], params: 1, sql: 'SELECT COUNT(*) FROM activity ac JOIN files f ON f.workspace_id = ac.workspace_id AND f.path = ac.path WHERE ac.workspace_id = ?' },
  { index: 'idx_files_ws_unindexed', accept: ['idx_files_ws_unindexed', 'idx_files_ws_created_gen', 'idx_files_ws'], params: 1, sql: 'SELECT COUNT(*) FROM files f WHERE f.workspace_id = ? AND f.indexed_at IS NULL' },
  { index: 'idx_files_ws', accept: ['idx_files_ws', 'idx_files_ws_created_gen'], params: 1, sql: 'SELECT COUNT(*) FROM files f WHERE f.workspace_id = ?' },
  { index: 'idx_symbols_file', accept: ['idx_symbols_file'], params: 1, sql: 'SELECT COUNT(*) FROM symbols s JOIN files f ON f.id = s.file_id WHERE f.workspace_id = ?' },
  { index: 'idx_edges_ws_src_file', accept: ['idx_edges_ws_src_file'], params: 2, sql: 'SELECT dst_file FROM edges e WHERE e.workspace_id = ? AND e.src_file = ? AND e.kind = \'imports\' AND e.resolved = 1' },
]

interface Fixture {
  db: DatabaseSync
  ws: string
  serverHandle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

async function buildFixture(): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-budget-'))
  const root = join(dir, 'plugpt')
  mkdirSync(root, { recursive: true })

  const db = openStore(join(dir, 'brain.db'))
  const planet = registerPlanet(db, root, 'plugpt')
  const ws = planet.workspaceId
  setPlanetIndexSelection(db, ws, [])

  const now = new Date().toISOString()
  const insertFile = db.prepare(
    `INSERT INTO files (workspace_id, path, repo_id, checkout_id, ext, size, mtime, hash, parse_version, loc, indexed_at, generation, created_generation)
     VALUES (?, ?, NULL, NULL, ?, ?, ?, 'bench', 1, ?, ?, 1, 1)`,
  )
  const insertSymbol = db.prepare(
    'INSERT INTO symbols (file_id, name, kind, line, end_line, exported) VALUES (?, ?, ?, ?, ?, 1)',
  )
  const insertEdge = db.prepare(
    `INSERT INTO edges (workspace_id, kind, src_file, dst_file, resolved, line)
     VALUES (?, 'imports', ?, ?, 1, ?)`,
  )

  db.exec('BEGIN')
  const fileIds: number[] = []
  for (let i = 0; i < FILE_COUNT; i += 1) {
    const rel = `Notes/bench-${Math.floor(i / 500)}/note-${i}.md`
    const abs = join(root, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, `---\ntyp: "notiz"\n---\n\nBench note ${i}.\n`, 'utf8')
    const info = insertFile.run(ws, rel, '.md', '3', now, 2, now)
    fileIds.push(Number(info.lastInsertRowid))
  }
  for (let i = 0; i < FILE_COUNT; i += 1) {
    for (let s = 0; s < SYMBOLS_PER_FILE; s += 1) {
      insertSymbol.run(fileIds[i], `symbol-${i}-${s}`, 'function', s + 1, s + 2)
    }
  }
  for (let i = 1; i < FILE_COUNT; i += 1) {
    for (let e = 1; e <= EDGES_PER_FILE; e += 1) {
      const dst = fileIds[Math.max(0, i - e * 7)]
      if (dst !== fileIds[i]) insertEdge.run(ws, fileIds[i], dst, e)
    }
  }
  db.prepare(
    `INSERT INTO workspace_index_state (workspace_id, generation, file_count, symbol_count, edge_count, last_success_at)
     VALUES (?, 1, ?, ?, ?, ?)`,
  ).run(ws, FILE_COUNT, FILE_COUNT * SYMBOLS_PER_FILE, FILE_COUNT * EDGES_PER_FILE, now)
  db.exec('COMMIT')

  const serverHandle: ServerHandle = await serve({ db, uiRoot: null, authKey: 'budget', requireAuth: false }, 0)
  return {
    db, ws,
    serverHandle,
    baseUrl: `http://127.0.0.1:${serverHandle.port}`,
    cleanup: async () => {
      try { await serverHandle.close() } catch { /* already closed */ }
      try { db.close() } catch { /* already closed */ }
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
}

test('the five Board read routes answer 200 under the time budget', async () => {
  const fx = await buildFixture()
  try {
    const routes = [
      '/api/galaxy',
      '/api/planet',
      `/api/graph?limit=200&workspace=${encodeURIComponent(fx.ws)}`,
      `/api/atlas/snapshot?limit=200&workspace=${encodeURIComponent(fx.ws)}`,
      '/api/intel/status',
    ]
    for (const route of routes) {
      const t0 = performance.now()
      const res = await fetch(`${fx.baseUrl}${route}`)
      const ms = performance.now() - t0
      const body = await res.arrayBuffer()
      assert.equal(res.status, 200, `${route} must answer 200`)
      assert.ok(body.byteLength > 0, `${route} must answer a non-empty body`)
      assert.ok(
        ms < BUDGET_SECONDS * 1000,
        `${route} took ${ms.toFixed(0)}ms, over the ${BUDGET_SECONDS}s budget`,
      )
      // The polling pattern: a repeat must stay in budget too.
      const t1 = performance.now()
      const res2 = await fetch(`${fx.baseUrl}${route}`)
      const ms2 = performance.now() - t1
      await res2.arrayBuffer()
      assert.equal(res2.status, 200, `${route} repeat must answer 200`)
      assert.ok(ms2 < BUDGET_SECONDS * 1000, `${route} repeat took ${ms2.toFixed(0)}ms`)
    }
  } finally {
    await fx.cleanup()
  }
})

test('the hot Board-read queries are index-served (EXPLAIN QUERY PLAN)', async () => {
  const fx = await buildFixture()
  try {
    for (const { index, accept, sql, params } of HOT_QUERIES) {
      const binds = Array.from({ length: params }, () => fx.ws)
      const plan = fx.db.prepare(`EXPLAIN QUERY PLAN ${sql}`)
        .all(...binds)
        .map((row: { detail: string }) => row.detail).join(' | ')
      assert.ok(
        accept.some(name => plan.includes(name)),
        `${index} not used; plan: ${plan}`,
      )
    }
  } finally {
    await fx.cleanup()
  }
})
