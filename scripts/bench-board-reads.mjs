#!/usr/bin/env node
/**
 * N2.1 budget measurement: the Board read routes against a synthetic big
 * fixture (>= 50k files) in a Temp-Home, live GET only.
 *
 * The five routes the brief names — /api/atlas/snapshot, /api/galaxy,
 * /api/intel/status, /api/planet and /api/graph — were polled by the UI with a
 * recount of the same per-generation sums on every request, and each poll cost
 * seconds on a real Planet. This script pins what they cost after the fix:
 *
 *   1. a synthetic fixture with at least 50k files (plus symbols and edges in
 *      the same proportion a real Planet carries), built in a Temp-Home,
 *   2. every route measured by live GET against a local server — cold (first
 *      call) and warm (repeat, the polling pattern),
 *   3. EXPLAIN QUERY PLAN for the hot queries, read back from SQLite, not
 *      assumed.
 *
 * Read-only against the store: no write route is called, nothing is indexed.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'
import { serve } from '../src/server/api.ts'

const FILE_COUNT = Number(process.env.BENCH_FILES ?? 50000)
const SYMBOLS_PER_FILE = 4
const EDGES_PER_FILE = 12

/** The five routes the brief names; graph and atlas name the workspace. */
function routesFor(ws) {
  return [
    '/api/galaxy',
    '/api/planet',
    `/api/graph?limit=200&workspace=${encodeURIComponent(ws)}`,
    `/api/atlas/snapshot?limit=200&workspace=${encodeURIComponent(ws)}`,
    '/api/intel/status',
  ]
}

/** The hot queries, the access path each one must be served by (the named
 * index or its covering/uniqueness equivalent — the planner may pick either),
 * and the bind parameters. */
const HOT_QUERIES = [
  { index: 'idx_files_ws_path', accept: ['idx_files_ws_path', 'sqlite_autoindex_files_1', 'idx_activity_ws_path'], params: ['WS'], sql: 'SELECT COUNT(*) FROM activity ac JOIN files f ON f.workspace_id = ac.workspace_id AND f.path = ac.path WHERE ac.workspace_id = ?' },
  { index: 'idx_files_ws_unindexed', accept: ['idx_files_ws_unindexed', 'idx_files_ws_created_gen', 'idx_files_ws'], params: ['WS'], sql: 'SELECT COUNT(*) FROM files f WHERE f.workspace_id = ? AND f.indexed_at IS NULL' },
  { index: 'idx_files_ws', accept: ['idx_files_ws', 'idx_files_ws_created_gen'], params: ['WS'], sql: 'SELECT COUNT(*) FROM files f WHERE f.workspace_id = ?' },
  { index: 'idx_symbols_file', accept: ['idx_symbols_file'], params: ['WS'], sql: 'SELECT COUNT(*) FROM symbols s JOIN files f ON f.id = s.file_id WHERE f.workspace_id = ?' },
  { index: 'idx_edges_ws_src_file', accept: ['idx_edges_ws_src_file'], params: ['WS', 'WS'], sql: 'SELECT dst_file FROM edges e WHERE e.workspace_id = ? AND e.src_file = ? AND e.kind = \'imports\' AND e.resolved = 1' },
]

function buildFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-bench-'))
  const root = join(dir, 'plugpt')
  mkdirSync(root, { recursive: true })

  const db = openStore(join(dir, 'brain.db'))
  const planet = registerPlanet(db, root, 'plugpt')
  const ws = planet.workspaceId
  // Notes-only selection: the fixture's 50k files are written knowledge with
  // no checkout, the same scope a real notes-only Planet publishes.
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
  const fileIds = []
  for (let i = 0; i < FILE_COUNT; i += 1) {
    const rel = `Notes/bench-${Math.floor(i / 500)}/note-${i}.md`
    // Real files on disk too: the fixture is a folder, not only rows.
    const abs = join(root, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, `---\ntyp: "notiz"\n---\n\nBench note ${i}.\n`, 'utf8')
    const info = insertFile.run(ws, rel, '.md', '3', now, 2, now)
    fileIds.push(Number(info.lastInsertRowid))
  }
  for (let i = 0; i < FILE_COUNT; i += 1) {
    const id = fileIds[i]
    for (let s = 0; s < SYMBOLS_PER_FILE; s += 1) {
      insertSymbol.run(id, `symbol-${i}-${s}`, 'function', s + 1, s + 2)
    }
  }
  for (let i = 1; i < FILE_COUNT; i += 1) {
    // Each file imports from a few earlier ones — a real import shape.
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

  return {
    dir, db, ws,
    files: FILE_COUNT,
    cleanup: () => {
      try { db.close() } catch { /* already closed */ }
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
}

async function timeRoute(base, route, tries = 3) {
  const times = []
  let status = 0
  for (let i = 0; i < tries; i += 1) {
    const t0 = performance.now()
    const res = await fetch(`${base}${route}`)
    status = res.status
    await res.arrayBuffer()
    times.push((performance.now() - t0) / 1000)
  }
  return { status, times }
}

const fx = buildFixture()
let exitCode = 0
try {
  const handle = await serve({ db: fx.db, uiRoot: null, authKey: 'bench', requireAuth: false }, 0)
  const base = `http://127.0.0.1:${handle.port}`
  console.log(`fixture: ${fx.files} files, ${fx.files * SYMBOLS_PER_FILE} symbols, ~${fx.files * EDGES_PER_FILE} edges · server on ${base}`)

  for (const route of routesFor(fx.ws)) {
    const { status, times } = await timeRoute(base, route)
    const verdict = times[0] < 1 ? 'PASS' : 'OVER BUDGET'
    if (times[0] >= 1) exitCode = 1
    console.log(`${route.padEnd(28)} cold ${times[0].toFixed(3)}s · warm ${times.slice(1).map(t => t.toFixed(3)).join(' / ')}s · ${status} · ${verdict}`)
  }

  console.log('\nEXPLAIN QUERY PLAN (the plan is read back from SQLite, not assumed):')
  for (const { index, accept, sql, params } of HOT_QUERIES) {
    const binds = params.map(p => (p === 'WS' ? fx.ws : p))
    const plan = fx.db.prepare(`EXPLAIN QUERY PLAN ${sql}`)
      .all(...binds)
      .map(row => row.detail).join(' | ')
    const uses = accept.some(name => plan.includes(name))
    if (!uses) exitCode = 1
    console.log(`${index}: ${uses ? 'INDEX-SERVED' : 'NOT INDEX-SERVED'} — ${plan}`)
  }

  handle.close()
} finally {
  fx.cleanup()
}
process.exit(exitCode)
