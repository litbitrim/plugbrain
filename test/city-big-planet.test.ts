/**
 * /api/city on a real planet failed with SQLite's "too many SQL variables":
 * the projection built one IN-list per workspace's WHOLE file list, and a
 * planet carries far more files than SQLite's bound-variable limit (32766 in
 * current builds, 999 in older ones). The projection now serves its IN-lists
 * in chunks - `countSymbols` for the symbol counts, a chunked seek with a
 * MAX-fold for the roads - and this test pins the fix on a fixture with more
 * than 50,000 files, both through the projection functions and through the
 * /api/city and /api/city/delta routes.
 *
 * The road fixture puts most edges ACROSS a 500-file chunk boundary and
 * duplicates every 25th edge, so the chunked seek's fold is exercised on both
 * sides of a boundary and with multi-row pairs: MAX must return the true
 * weight (SUM would double the pairs that span a boundary).
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'
import { cityDelta, citySnapshot } from '../src/projections/city.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'

/** Strictly more than 50,000 files, as the closeout asks. */
const FILE_COUNT = 51_000
const SYMBOLS_PER_FILE = 2
/** One edge every 5th file, to the file 499 places earlier - that lands in
 *  the previous 500-file chunk for almost every i, so the chunked roads seek
 *  folds pairs that span a chunk boundary. */
const ROAD_STEP = 5
/** Every 25th edge is inserted twice: a multi-row pair, weight 2. */
const DUP_EVERY = 25

interface Fixture {
  db: Awaited<ReturnType<typeof openStore>>
  ws: string
  fileIds: number[]
  serverHandle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

async function buildFixture(): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-city-big-'))
  const root = join(dir, 'plugpt')
  mkdirSync(root, { recursive: true })

  const db = await openStore(join(dir, 'brain.db'))
  const planet = registerPlanet(db, root, 'plugpt')
  const ws = planet.workspaceId
  setPlanetIndexSelection(db, ws, [])

  const now = new Date().toISOString()
  const insertFile = db.prepare(
    `INSERT INTO files (workspace_id, path, repo_id, checkout_id, ext, size, mtime, hash, parse_version, loc, indexed_at, generation, created_generation)
     VALUES (?, ?, NULL, NULL, ?, ?, ?, 'test', 1, ?, ?, 1, 1)`,
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
    const info = insertFile.run(ws, `Notes/bulk-${Math.floor(i / 500)}/note-${i}.md`, '.md', '3', now, 2, now)
    fileIds.push(Number(info.lastInsertRowid))
  }
  for (let i = 0; i < FILE_COUNT; i += 1) {
    for (let s = 0; s < SYMBOLS_PER_FILE; s += 1) {
      insertSymbol.run(fileIds[i], `symbol-${i}-${s}`, 'function', s + 1, s + 2)
    }
  }
  for (let i = Math.max(ROAD_STEP, 500); i < FILE_COUNT; i += ROAD_STEP) {
    const src = fileIds[i]
    const dst = fileIds[i - 499]
    insertEdge.run(ws, src, dst, 1)
    if (i % DUP_EVERY === 0) insertEdge.run(ws, src, dst, 2)
  }
  db.prepare(
    `INSERT INTO workspace_index_state (workspace_id, generation, file_count, symbol_count, edge_count, last_success_at)
     VALUES (?, 1, ?, ?, 0, ?)`,
  ).run(ws, FILE_COUNT, FILE_COUNT * SYMBOLS_PER_FILE, now)
  db.exec('COMMIT')

  const serverHandle: ServerHandle = await serve({ db, uiRoot: null, authKey: 'city-big', requireAuth: false }, 0)
  return {
    db, ws, fileIds,
    serverHandle,
    baseUrl: `http://127.0.0.1:${serverHandle.port}`,
    cleanup: async () => {
      try { await serverHandle.close() } catch { /* already closed */ }
      try { db.close() } catch { /* already closed */ }
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
}

test('citySnapshot answers a workspace with more than 50,000 files (no too-many-SQL-variables)', async () => {
  const fx = await buildFixture()
  try {
    assert.ok(fx.fileIds.length > 50_000, `fixture must carry more than 50k files, has ${fx.fileIds.length}`)
    const snap = citySnapshot(fx.db, fx.ws)
    assert.equal(snap.totals.buildings, FILE_COUNT)
    assert.equal(snap.totals.districts > 0, true)
    // The symbol counts come from the chunked countSymbols seek.
    const sample = snap.buildings[100]
    assert.equal(sample.symbolCount, SYMBOLS_PER_FILE, 'chunked symbol counts must be right')
    // The whole-workspace roads: one row per distinct (src, dst) pair.
    const distinctPairs = Math.floor((FILE_COUNT - 1 - 500) / ROAD_STEP) + 1
    assert.equal(snap.roads.length, distinctPairs)
    // A duplicated edge whose endpoints span a chunk boundary keeps its true
    // weight of 2.
    const spanning = snap.roads.find(r => r.weight === 2)
    assert.ok(spanning !== undefined, 'a duplicated spanning edge must keep weight 2')
  } finally {
    await fx.cleanup()
  }
})

test('cityDelta with a full file list folds the chunked road seeks to the true weights', async () => {
  const fx = await buildFixture()
  try {
    // from=0 is the worst case: every file is "changed", so buildingsFrom and
    // roadsFor both see the workspace's whole 50k+ id list.
    const delta = cityDelta(fx.db, fx.ws, 0)
    assert.equal(delta.changed.length, FILE_COUNT)
    assert.ok(delta.unchangedBuildings === 0)
    // The chunked seek with a 50k+ file list must fold to exactly the
    // whole-workspace roads.
    const snap = citySnapshot(fx.db, fx.ws)
    assert.equal(delta.roads.length, snap.roads.length)
    const byId = new Map(delta.roads.map(r => [r.id, r]))
    for (const road of snap.roads) {
      const folded = byId.get(road.id)
      assert.ok(folded !== undefined, `road ${road.id} missing from the chunked seek`)
      assert.equal(folded.weight, road.weight, `road ${road.id} must fold to its true weight`)
    }
  } finally {
    await fx.cleanup()
  }
})

test('/api/city and /api/city/delta answer 200 on the big fixture', async () => {
  const fx = await buildFixture()
  try {
    const res = await fetch(`${fx.baseUrl}/api/city?workspace=${encodeURIComponent(fx.ws)}`)
    assert.equal(res.status, 200, '/api/city must answer 200 on a 50k+ workspace')
    const body = await res.json() as { city: { totals: { buildings: number } } }
    assert.equal(body.city.totals.buildings, FILE_COUNT)

    const res2 = await fetch(`${fx.baseUrl}/api/city/delta?workspace=${encodeURIComponent(fx.ws)}&from=0`)
    assert.equal(res2.status, 200, '/api/city/delta must answer 200 on a 50k+ workspace')
    const body2 = await res2.json() as { delta: { changed: unknown[] } }
    assert.equal(body2.delta.changed.length, FILE_COUNT)
  } finally {
    await fx.cleanup()
  }
})
