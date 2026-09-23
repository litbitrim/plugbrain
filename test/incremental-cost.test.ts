/**
 * What one saved file costs.
 *
 * The owner's complaint was not a wrong number, it was five seconds of nothing
 * after every save. The cause was not one bug but a set of lookups that had no
 * usable index: a file's edges were looked up by (workspace, src_file) while the
 * only edge index was on src_symbol, its rows in the search index by
 * (workspace, file_id) while the index was on workspace alone, and its refs the
 * same way. Each one degraded into a scan of the whole workspace — on the real
 * planet that was 955 ms + 677 ms + 1 468 ms, per save.
 *
 * Two things are pinned here, because either can be undone by accident:
 *   1. the indexes exist and the per-file statements USE them (the plan is read
 *      back from SQLite, not assumed), and
 *   2. the planet counters keep telling the truth once they are moved by a
 *      difference instead of being recounted on every save.
 */
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import * as access from '../src/access.ts'
import { indexPlanetWorkspace, registerPlanet, setPlanetIndexSelection, workspaceIdFor } from '../src/planet.ts'
import { openStore } from '../src/store/schema.ts'
import { readNote, writeNote } from '../src/notes/vault.ts'

const AGENT = 'cost-writer'

/** The indexes a single-file refresh depends on, and the query each one serves. */
const PER_FILE_LOOKUPS: ReadonlyArray<{ index: string; sql: string }> = [
  {
    index: 'idx_edges_src_file',
    sql: 'SELECT COUNT(*) FROM edges WHERE workspace_id = ? AND src_file = ?',
  },
  {
    index: 'idx_edges_dst_file',
    sql: 'SELECT COUNT(*) FROM edges WHERE workspace_id = ? AND dst_file = ?',
  },
  {
    index: 'idx_search_rows_ws_file',
    sql: 'SELECT COUNT(*) FROM search_rows WHERE workspace_id = ? AND file_id = ?',
  },
  {
    index: 'idx_file_refs_ws_file',
    sql: 'SELECT COUNT(*) FROM file_refs WHERE workspace_id = ? AND file_id = ?',
  },
  {
    index: 'idx_file_imports_ws_file',
    sql: 'SELECT COUNT(*) FROM file_imports WHERE workspace_id = ? AND file_id = ?',
  },
]

interface Fixture {
  dir: string
  root: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  cleanup: () => void
}

function fixture(): Fixture {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-cost-'))
  const root = join(dir, 'plugpt')
  const write = (rel: string, content: string): void => {
    const abs = join(root, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content, 'utf8')
  }
  write('Master/Notiz.md', '---\ntyp: "notiz"\nstand: "offen"\n---\n\nErste Fassung.\n')
  write('Master/Andere.md', '---\ntyp: "notiz"\nstand: "offen"\n---\n\nSiehe [[Notiz]].\n')
  write('Auftrag/Bericht.md', '# Bericht\n\nEin Bericht.\n')

  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = workspaceIdFor(root)
  const planet = registerPlanet(db, root, 'plugpt')
  // This fixture deliberately indexes only written knowledge, not Code.
  setPlanetIndexSelection(db, planet.workspaceId, [])
  indexPlanetWorkspace(db, workspaceId, { full: true })
  access.registerAgent(db, AGENT, 'cost writer')
  return {
    dir, root, db, workspaceId,
    cleanup: () => {
      try { db.close() } catch { /* already closed */ }
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
}

/** The stored counters and a fresh recount of the same three numbers. */
function counters(fx: Fixture): { stored: number[]; counted: number[] } {
  const stored = fx.db.prepare(
    `SELECT file_count AS files, symbol_count AS symbols, edge_count AS edges
       FROM workspace_index_state WHERE workspace_id = ?`).get(fx.workspaceId) as
    { files: number; symbols: number; edges: number }
  const counted = fx.db.prepare(
    `SELECT (SELECT COUNT(*) FROM files WHERE workspace_id = ?) AS files,
            (SELECT COUNT(*) FROM symbols s JOIN files f ON f.id = s.file_id
              WHERE f.workspace_id = ?) AS symbols,
            (SELECT COUNT(*) FROM edges WHERE workspace_id = ?) AS edges`)
    .get(fx.workspaceId, fx.workspaceId, fx.workspaceId) as
    { files: number; symbols: number; edges: number }
  return {
    stored: [stored.files, stored.symbols, stored.edges],
    counted: [counted.files, counted.symbols, counted.edges],
  }
}

test('the per-file lookups have their own indexes and actually use them', () => {
  const fx = fixture()
  try {
    const known = new Set((fx.db.prepare(
      "SELECT name FROM sqlite_master WHERE type = 'index'").all() as Array<{ name: string }>)
      .map(row => row.name))
    for (const { index, sql } of PER_FILE_LOOKUPS) {
      assert.ok(known.has(index), `${index} must exist — without it every save scans the workspace`)
      const plan = (fx.db.prepare(`EXPLAIN QUERY PLAN ${sql}`)
        .all(fx.workspaceId, 1) as unknown as Array<{ detail: string }>)
        .map(row => row.detail).join(' | ')
      assert.match(plan, new RegExp(index),
        `the per-file lookup must USE ${index}, plan was: ${plan}`)
    }
  } finally { fx.cleanup() }
})

test('a save moves the counters by exactly what it changed, and a recount agrees', () => {
  const fx = fixture()
  try {
    const before = counters(fx)
    const note = readNote(fx.db, fx.workspaceId, AGENT, 'Master/Notiz.md')
    assert.deepEqual(before.stored, before.counted, 'the fixture starts consistent')

    // A save that adds a link: one new edge, no new file, no new symbol.
    const saved = writeNote(fx.db, fx.workspaceId, AGENT, 'Master/Notiz.md',
      `${note.content}\nVerweist jetzt auf [[Andere]].\n`, { expectedHash: note.hash })
    assert.equal(saved.indexed, true)

    const after = counters(fx)
    assert.deepEqual(after.stored, after.counted,
      'the counters must still equal a fresh recount after a save')

    // Several saves in a row must not drift: the delta is applied, not accumulated.
    for (let i = 0; i < 3; i += 1) {
      const current = readNote(fx.db, fx.workspaceId, AGENT, 'Master/Notiz.md')
      writeNote(fx.db, fx.workspaceId, AGENT, 'Master/Notiz.md',
        `${current.content}\nZeile ${i}.\n`, { expectedHash: current.hash })
    }
    const settled = counters(fx)
    assert.deepEqual(settled.stored, settled.counted)
    assert.equal(settled.stored[0], before.stored[0], 'no file was added or removed')
  } finally { fx.cleanup() }
})
