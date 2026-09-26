/**
 * The workspace search has to be FAST and it has to be SAFE, on the planet the
 * owner actually has.
 *
 * What this pins: the obvious join (`FROM search JOIN search_rows … WHERE MATCH`)
 * plans as an index scan over every row of the workspace with an FTS probe per
 * row. On the real planet — 183 428 files, 3 380 220 rows — that measured
 * 60 215 ms inside the daemon's event loop, i.e. a minute in which /api/health,
 * the UI and every agent request went unanswered. The FTS-first shape measures
 * 19 ms on the same data. A shape that only a comment defends is a shape that
 * comes back, so the plan itself is asserted here.
 *
 * What this also pins: a query a human types. `foo(`, `a-b`, `"quote` are not
 * FTS5 syntax errors to be turned into a 500 — they are searches for those
 * characters.
 */
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import * as access from '../src/access.ts'
import { indexPlanetWorkspace, workspaceIdFor } from '../src/planet.ts'
import { openStore } from '../src/store/schema.ts'
import { searchSql, searchWorkspace, toMatchExpression } from '../src/store/search.ts'

const AGENT = 'shape-reader'

interface Fixture {
  dir: string
  root: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  cleanup: () => void
}

/**
 * A plain workspace, not a planet: these tests are about the query and the
 * index, and a workspace is the smaller thing that still has all three.
 */
function fixture(
  files: Record<string, string>, home = 'plugpt', shared?: { db: ReturnType<typeof openStore>; dir: string },
): Fixture {
  const dir = shared?.dir ?? mkdtempSync(join(tmpdir(), 'plugbrain-shape-'))
  const root = join(dir, home)
  for (const [rel, content] of Object.entries(files)) {
    const abs = join(root, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content, 'utf8')
  }
  const db = shared?.db ?? openStore(join(dir, 'brain.db'))
  const workspaceId = workspaceIdFor(root)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, home, root, new Date().toISOString())
  indexPlanetWorkspace(db, workspaceId, { full: true })
  access.registerAgent(db, AGENT, 'shape reader')
  return {
    dir, root, db, workspaceId,
    cleanup: () => {
      if (shared === undefined) {
        try { db.close() } catch { /* already closed */ }
        rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
      }
    },
  }
}

const planOf = (fx: Fixture, query: string): string =>
  (fx.db.prepare(`EXPLAIN QUERY PLAN ${searchSql()}`)
    .all(query, 320, fx.workspaceId, 40) as unknown as Array<{ detail: string }>)
    .map(row => row.detail).join(' | ')

test('the plan of the workspace search starts at the FTS match', () => {
  const fx = fixture({ 'src/alpha.ts': 'export function alphaOne() { return 1 }\n' })
  try {
    const plan = planOf(fx, '"alphaOne"*')
    assert.match(plan, /SCAN search VIRTUAL TABLE/, 'the FTS index must be the driver')
    assert.match(plan, /MATERIALIZE hits/, 'the match must be materialized before the join')
    // The regression this exists for: driving from the ordinary table and probing
    // the FTS index once per row of the workspace.
    assert.doesNotMatch(
      plan, /^SEARCH r USING INDEX idx_search_rows_ws/,
      'the workspace index must never drive the search — that is the 60-second plan')
  } finally { fx.cleanup() }
})

test('hits carry the line of the definition, and the limit and kind are honoured', () => {
  const fx = fixture({
    'src/alpha.ts': 'export function alphaOne() { return 1 }\n\nexport function alphaTwo() { return 2 }\n',
    'src/beta.ts': 'export const alphaThree = 3\n',
  })
  try {
    const hits = searchWorkspace(fx.db, fx.workspaceId, 'alpha', { limit: 2 })
    assert.equal(hits.length, 2, 'the limit is the caller\'s, not the index\'s')
    for (const hit of hits) {
      if (hit.symbolId === null) continue
      assert.ok(hit.line !== null, `${hit.name} is a symbol and must carry its line`)
    }

    const onlyFiles = searchWorkspace(fx.db, fx.workspaceId, 'alpha', { kinds: ['file'] })
    assert.ok(onlyFiles.length > 0)
    assert.ok(onlyFiles.every(hit => hit.kind === 'file'), 'a kind filter returns only that kind')
  } finally { fx.cleanup() }
})

test('punctuation a human types is searched for, never thrown back as a 500', () => {
  const fx = fixture({ 'src/alpha.ts': 'export function alphaOne() { return 1 } // a-b\n' })
  try {
    for (const query of ['alpha(', 'a-b', '"alpha', 'alpha', '()', '***', 'NEAR', 'alpha AND']) {
      assert.doesNotThrow(
        () => searchWorkspace(fx.db, fx.workspaceId, query),
        `'${query}' must be a search, not a syntax error`)
    }
    assert.deepEqual(searchWorkspace(fx.db, fx.workspaceId, '   '), [],
      'an empty query matches nothing rather than everything')
    assert.equal(toMatchExpression(''), null)
    assert.equal(toMatchExpression('   '), null)
  } finally { fx.cleanup() }
})

test('one workspace never sees another workspace\'s rows', () => {
  // Both vaults live in ONE store on purpose: the workspace filter is applied to
  // the matched rows, which is exactly what the candidates window is sized for.
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-shape-two-'))
  const db = openStore(join(dir, 'brain.db'))
  const shared = { db, dir }
  const first = fixture({ 'src/share.ts': 'export function sharedNameFirst() { return 1 }\n' }, 'first', shared)
  const second = fixture({ 'src/share.ts': 'export function sharedNameSecond() { return 2 }\n' }, 'second', shared)
  try {
    const hits = searchWorkspace(db, first.workspaceId, 'sharedName')
    assert.ok(hits.length > 0, 'the first vault has a hit')
    const ownerOf = db.prepare(
      'SELECT f.workspace_id AS ws FROM symbols s JOIN files f ON f.id = s.file_id WHERE s.id = ?')
    for (const hit of hits) {
      if (hit.symbolId === null) continue
      const owner = ownerOf.get(hit.symbolId) as { ws: string } | undefined
      assert.equal(owner?.ws, first.workspaceId,
        `${hit.name} must be a symbol of the asked-for workspace`)
    }
    // The negative case: the other vault's symbol is not reachable from here, and
    // its file row may share the basename — the names are what must not leak.
    assert.ok(!hits.some(hit => hit.name === 'sharedNameSecond'))
    assert.deepEqual(searchWorkspace(db, first.workspaceId, 'sharedNameSecond'), [])
    assert.ok(searchWorkspace(db, second.workspaceId, 'sharedNameSecond').length > 0)
  } finally {
    try { db.close() } catch { /* already closed */ }
    rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
  }
})
