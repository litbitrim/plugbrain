/**
 * The read routes the Board contract needs, over HTTP, against a real index.
 *
 * `packages/contracts/src/brain.ts` asks for a file list with LOC, the symbols
 * and edges of ONE file, an open search, the delta between two generations and
 * the City projection. Each of them is checked here in two ways: that it names
 * the fact it publishes, and that it REFUSES (rather than invents) what the
 * store cannot answer — an unknown file id, a workspace that does not exist, an
 * unknown API path.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { indexPlanetWorkspace, workspaceIdFor } from '../src/planet.ts'
import { removeRunState } from '../src/index/runs.ts'

const home = mkdtempSync(join(tmpdir(), 'plugbrain-brain-reads-home-'))
process.env.PLUGBRAIN_HOME = home

interface Fixture {
  dir: string
  root: string
  workspaceId: string
  db: ReturnType<typeof openStore>
  handle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

async function createFixture(): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-brain-reads-'))
  const root = join(dir, 'ws')
  mkdirSync(join(root, 'src', 'nested'), { recursive: true })
  writeFileSync(join(root, 'src', 'lib.ts'),
    'export interface Shape { id: number }\n' +
    'export class Widget implements Shape {\n  id = 1\n  render(): string { return String(this.id) }\n}\n' +
    'export function makeWidget(): Widget { return new Widget() }\n', 'utf8')
  writeFileSync(join(root, 'src', 'app.ts'),
    "import { makeWidget, Widget } from './lib'\n" +
    'export function start(): number { const w: Widget = makeWidget(); return w.id }\n' +
    'export const started = start()\n', 'utf8')
  writeFileSync(join(root, 'src', 'nested', 'deep.ts'),
    "export const deep = 'needleInTheDeep' + String(1)\n", 'utf8')
  writeFileSync(join(root, 'README.md'), '# fixture\n\nA vault note about PLUG.\n', 'utf8')

  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = workspaceIdFor(root)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'brain-reads', root, new Date().toISOString())
  // The same entry point the worker uses, so what is read back is a real
  // generation and not a hand-written row.
  indexPlanetWorkspace(db, workspaceId)

  const handle = await serve({ db, dbFile, uiRoot: null, authKey: 'read-token' }, 0)
  return {
    dir, root, workspaceId, db, handle,
    baseUrl: `http://127.0.0.1:${handle.port}`,
    cleanup: async () => {
      await handle.close()
      try { db.close() } catch { /* ignore */ }
      removeRunState(workspaceId)
      try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* ignore */ }
    },
  }
}

const get = (fx: Fixture, path: string): Promise<Response> =>
  fetch(`${fx.baseUrl}${path}${path.includes('?') ? '&' : '?'}` +
    `workspace=${encodeURIComponent(fx.workspaceId)}`)

test('the Board read routes publish the projection they promise', async () => {
  const fx = await createFixture()
  try {
    // ── /api/files: the file list with LOC, paginated, scoped by prefix ────
    const all = await (await get(fx, '/api/files')).json() as {
      ok: boolean; indexState: string; indexGeneration: number
      files: {
        total: number; returned: number; truncated: boolean; prefix: string
        entries: Array<{ fileId: number; path: string; ext: string; lang: string | null; loc: number; generation: number; ownerAgentId: string | null }>
        tombstones: unknown[]
        gitMainCommit: string | null
        activeWorktree: unknown
        selection: { configured: boolean; checkoutIds: string[] }
      }
      workspaceRoot: string
    }
    assert.equal(all.ok, true)
    assert.equal(all.indexState, 'ready')
    assert.equal(all.indexGeneration, 1)
    assert.equal(all.files.total, 4, 'every indexed file is listed')
    assert.equal(all.files.returned, 4)
    assert.equal(all.files.truncated, false)
    assert.deepEqual(all.files.tombstones, [])
    assert.equal(all.files.gitMainCommit, null, 'a folder that is not a repository has no mainline commit')
    assert.equal(all.files.activeWorktree, null)
    assert.equal(all.files.selection.configured, false)
    assert.equal(all.workspaceRoot, fx.root)
    const app = all.files.entries.find(entry => entry.path === 'src/app.ts')
    assert.ok(app !== undefined, 'src/app.ts must be listed')
    assert.ok(app!.loc > 0, 'the list must carry the measured LOC, not zero')
    assert.equal(app!.generation, 1)
    assert.equal(app!.ownerAgentId, null)
    assert.equal(app!.ext, '.ts')
    assert.equal(app!.lang, 'typescript')

    // Pagination is real: a second page holds different rows, and the total
    // stays the count of the whole scope.
    const firstPage = await (await get(fx, '/api/files?prefix=src&limit=2')).json() as {
      files: { total: number; returned: number; truncated: boolean; entries: Array<{ path: string }> }
    }
    assert.equal(firstPage.files.total, 3)
    assert.equal(firstPage.files.returned, 2)
    assert.equal(firstPage.files.truncated, true, 'a page that is not the last says so')
    const secondPage = await (await get(fx, '/api/files?prefix=src&limit=2&offset=2')).json() as {
      files: { total: number; returned: number; truncated: boolean; entries: Array<{ path: string }> }
    }
    assert.equal(secondPage.files.returned, 1)
    assert.equal(secondPage.files.truncated, false)
    const firstPaths = firstPage.files.entries.map(entry => entry.path)
    const secondPaths = secondPage.files.entries.map(entry => entry.path)
    assert.deepEqual([...new Set([...firstPaths, ...secondPaths])].length, 3, 'the pages do not overlap')

    // A prefix that matches nothing is an honest empty page, not everything.
    const none = await (await get(fx, '/api/files?prefix=no/such')).json() as {
      files: { total: number; returned: number }
    }
    assert.equal(none.files.total, 0)
    assert.equal(none.files.returned, 0)

    // ── /api/symbols?fileId=: symbols of ONE file, by stable id ────────────
    const byId = await (await get(fx, `/api/symbols?fileId=${app!.fileId}`)).json() as {
      ok: boolean; path: string | null; fileId: number; known: boolean
      symbols: Array<{ name: string; kind: string; line: number; endLine: number | null; exported: number; container: string | null }>
      calls: unknown[]
    }
    assert.equal(byId.ok, true)
    assert.equal(byId.known, true)
    assert.equal(byId.path, 'src/app.ts')
    assert.equal(byId.fileId, app!.fileId)
    const startSymbol = byId.symbols.find(symbol => symbol.name === 'start')
    assert.ok(startSymbol !== undefined, 'the file id names the file its symbols belong to')
    assert.equal(startSymbol!.kind, 'function')
    assert.ok(startSymbol!.endLine !== null && startSymbol!.endLine! >= startSymbol!.line)

    // The old handle still works, and an id that names nothing is REFUSED as
    // unknown instead of returned as a file without symbols.
    const byPath = await (await get(fx, '/api/symbols?path=src/app.ts')).json() as
      { fileId: number; known: boolean; symbols: unknown[] }
    assert.equal(byPath.known, true)
    assert.equal(byPath.fileId, app!.fileId)
    const unknown = await (await get(fx, '/api/symbols?fileId=99999999')).json() as
      { known: boolean; symbols: unknown[]; fileId: number }
    assert.equal(unknown.known, false, 'an unknown file id must not look like an indexed empty file')
    assert.equal(unknown.fileId, 99999999)

    // ── /api/edges: the edges of one file, both directions ────────────────
    const out = await (await get(fx, `/api/edges?fileId=${app!.fileId}&direction=out`)).json() as {
      ok: boolean
      edges: {
        known: boolean; fileId: number; total: number; returned: number
        edges: Array<{
          edgeId: number; kind: string; srcSymbol: number | null; srcFile: number | null
          dstSymbol: number | null; dstFile: number | null; rawTarget: string | null
          resolved: number; ambiguous: number; candidates: number; line: number | null
        }>
      }
    }
    assert.equal(out.ok, true)
    assert.equal(out.edges.known, true)
    assert.ok(out.edges.total > 0, 'src/app.ts imports src/lib.ts, so it has outgoing edges')
    const importEdge = out.edges.edges.find(edge => edge.kind === 'imports')
    assert.ok(importEdge !== undefined, 'the import edge must be published')
    assert.equal(importEdge!.srcFile, app!.fileId)
    assert.equal(importEdge!.rawTarget, './lib')

    const into = await (await get(fx, `/api/edges?fileId=${app!.fileId}&direction=in`)).json() as {
      edges: { total: number; edges: Array<{ srcFile: number | null; dstFile: number | null }> }
    }
    assert.equal(into.edges.total, 0, 'nothing imports src/app.ts')
    const both = await (await get(fx, `/api/edges?fileId=${app!.fileId}&direction=both&kind=imports&resolved=1`))
      .json() as { edges: { total: number } }
    assert.ok(both.edges.total >= 1, 'the filtered view still holds the import edge')
    assert.ok(both.edges.total <= out.edges.total,
      'a filtered view cannot hold more edges than the unfiltered one')

    const unknownEdges = await (await get(fx, '/api/edges?fileId=99999999')).json() as
      { edges: { known: boolean; edges: unknown[] } }
    assert.equal(unknownEdges.edges.known, false)
    const noHandle = await get(fx, '/api/edges')
    assert.equal(noHandle.status, 400)
    assert.match(String((await noHandle.json() as { error: string }).error), /fileId or path is required/)

    // ── /api/search: an open read, no agent identity needed ───────────────
    const search = await (await get(fx, '/api/search?q=makeWidget&limit=5')).json() as {
      ok: boolean; query: string
      hits: Array<{ name: string; path: string; kind: string; symbolId: number | null; fileId: number | null }>
    }
    assert.equal(search.ok, true)
    assert.equal(search.query, 'makeWidget')
    assert.ok(search.hits.some(hit => hit.name === 'makeWidget' && hit.path === 'src/lib.ts'))

    // A file row is in the index under its own name (basename and path), so a
    // path segment finds it without any symbol matching.
    const deep = await (await get(fx, '/api/search?q=nested')).json() as
      { hits: Array<{ path: string; kind: string }> }
    assert.ok(deep.hits.some(hit => hit.path === 'src/nested/deep.ts' && hit.kind === 'file'),
      'a file row is found by its own path')

    const kindFiltered = await (await get(fx, '/api/search?q=Widget&kind=class')).json() as
      { hits: Array<{ name: string; kind: string }> }
    assert.equal(kindFiltered.hits.every(hit => hit.kind === 'class'), true)
    assert.equal((await get(fx, '/api/search?q=')).status, 400, 'an empty query is refused, not answered')

    // ── /api/changes: what a generation wrote, with added vs modified split ─
    const changes = await (await get(fx, '/api/changes?from=0')).json() as {
      ok: boolean; indexState: string
      changes: {
        fromGeneration: number; toGeneration: number
        changed: Array<{ fileId: number; path: string; generation: number; loc: number }>
        added: Array<{ fileId: number; path: string; generation: number; loc: number }>
        modified: Array<{ fileId: number; path: string; generation: number; loc: number }>
        deleted: string[]; renamed: Array<{ from: string; to: string | null; resolved: boolean }>
        tombstones: Array<{ path: string; reason: string; generation: number; deletedAt: string }>
        unavailable: null
      }
    }
    assert.equal(changes.ok, true)
    assert.equal(changes.indexState, 'ready')
    assert.equal(changes.changes.fromGeneration, 0)
    assert.equal(changes.changes.toGeneration, 1)
    assert.deepEqual(changes.changes.changed.map(row => row.path).sort(),
      ['README.md', 'src/app.ts', 'src/lib.ts', 'src/nested/deep.ts'])
    // All files are newly added in the first generation
    assert.deepEqual(changes.changes.added.map(row => row.path).sort(),
      ['README.md', 'src/app.ts', 'src/lib.ts', 'src/nested/deep.ts'])
    assert.deepEqual(changes.changes.modified, [])
    assert.deepEqual(changes.changes.deleted, [])
    assert.deepEqual(changes.changes.renamed, [])
    assert.equal(changes.changes.unavailable, null)

    // The delta between the FIRST generation and the CURRENT one is empty: this
    // fixture indexed once.
    const none2 = await (await get(fx, '/api/changes?from=1')).json() as
      { changes: { changed: unknown[]; toGeneration: number } }
    assert.deepEqual(none2.changes.changed, [])
    assert.equal(none2.changes.toGeneration, 1)

    // ── /api/city and /api/city/delta ─────────────────────────────────────
    const city = await (await get(fx, '/api/city')).json() as {
      ok: boolean
      city: {
        schema: number; generation: number; gitHead: string | null; heightMetric: string
        districts: Array<{ id: string; name: string; buildings: number; symbols: number; loc: number }>
        buildings: Array<{ id: string; fileId: number; path: string; district: string; loc: number; symbolCount: number; generation: number }>
        roads: Array<{ id: string; fromFileId: number; toFileId: number; weight: number }>
        totals: { buildings: number; districts: number; roads: number; symbols: number }
        legend: Record<string, string>
      }
    }
    assert.equal(city.ok, true)
    assert.equal(city.city.generation, 1)
    assert.equal(city.city.totals.buildings, 4)
    assert.equal(city.city.buildings.length, 4)
    assert.deepEqual(city.city.districts.map(district => district.name).sort(),
      ['(root)', 'src'])
    assert.equal(city.city.districts.reduce((sum, district) => sum + district.buildings, 0) === 4, true)
    const districtOfApp = city.city.buildings.find(building => building.path === 'src/app.ts')?.district
    assert.equal(districtOfApp, 'src', 'a file is placed in the district of its first path segment')
    assert.ok(city.city.buildings.every(building => building.symbolCount >= 0))
    assert.ok(city.city.totals.symbols > 0)
    assert.equal(city.city.roads.length, 1, 'src/app.ts imports src/lib.ts, which is one road')
    assert.equal(city.city.roads[0].fromFileId, app!.fileId)
    assert.ok(Object.keys(city.city.legend).length > 0)

    const loc = await (await get(fx, '/api/city?height=loc')).json() as
      { city: { heightMetric: string } }
    assert.equal(loc.city.heightMetric, 'loc')

    const delta = await (await get(fx, '/api/city/delta?from=0')).json() as {
      ok: boolean
      delta: { fromGeneration: number; toGeneration: number; changed: unknown[]; removed: string[]; unchangedBuildings: number }
    }
    assert.equal(delta.ok, true)
    assert.equal(delta.delta.fromGeneration, 0)
    assert.equal(delta.delta.toGeneration, 1)
    assert.equal(delta.delta.changed.length, 4)
    assert.equal(delta.delta.unchangedBuildings, 0)
    assert.equal((await get(fx, '/api/city/delta')).status, 400)

    // ── Refusals that must not look like success ──────────────────────────
    const unknownRoute = await fetch(`${fx.baseUrl}/api/nope`)
    assert.equal(unknownRoute.status, 404, 'an unknown API path is a 404, never the UI shell')
    assert.equal(unknownRoute.headers.get('content-type'), 'application/json; charset=utf-8')
    assert.match(String((await unknownRoute.json() as { error: string }).error), /no route: \/api\/nope/)

    const foreign = await fetch(`${fx.baseUrl}/api/files?workspace=ws-not-registered`)
    assert.equal(foreign.status, 403, 'another workspace is not readable')

    const unnamed = await fetch(`${fx.baseUrl}/api/files`)
    assert.equal(unnamed.status, 403, 'an unnamed workspace is refused, not guessed')
  } finally { await fx.cleanup() }
})
