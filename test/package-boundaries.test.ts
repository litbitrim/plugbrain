import { strict as assert } from 'node:assert'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { indexWorkspace } from '../src/indexer/index.ts'
import { openStore } from '../src/store/schema.ts'
import { getImpactSlice, getPackageEntryPoints, getTestCoverage } from '../src/intel/boundaries.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { PackageResolver } from '../src/indexer/packages.ts'
import { walk } from '../src/indexer/scan.ts'

const write = (root: string, rel: string, content: string): void => {
  const path = join(root, ...rel.split('/'))
  mkdirSync(join(path, '..'), { recursive: true })
  writeFileSync(path, content)
}

test('L2: bare workspace imports cross only declared exports, and test calls map to the exported symbol', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-l2-package-'))
  const root = join(dir, 'workspace')
  const db = openStore(join(dir, 'brain.db'))
  let server: ServerHandle | null = null
  try {
    write(root, 'pnpm-workspace.yaml', 'packages:\n  - packages/*\n')
    write(root, 'packages/provider/package.json', JSON.stringify({
      name: '@plug/provider', exports: { '.': './src/index.ts', './public': './src/public.ts' },
    }))
    write(root, 'packages/provider/src/index.ts', 'export function api() { return 1 }\n')
    write(root, 'packages/provider/src/public.ts', 'export function publicApi() { return api() }\n')
    write(root, 'packages/provider/src/internal.ts', 'export function secret() { return 1 }\n')
    write(root, 'packages/consumer/package.json', JSON.stringify({
      name: '@plug/consumer', dependencies: { '@plug/provider': 'workspace:*' },
    }))
    write(root, 'packages/consumer/src/use.ts', [
      "import { api } from '@plug/provider'",
      "import { secret } from '@plug/provider/internal'",
      'export function use() { return api() + secret() }',
    ].join('\n'))
    write(root, 'packages/consumer/test/use.test.ts', "import { api } from '@plug/provider'\nexport const covers = () => api()\n")
    write(root, 'packages/stranger/package.json', JSON.stringify({ name: '@plug/stranger' }))
    write(root, 'packages/stranger/src/no-dependency.ts', "import { api } from '@plug/provider'\nexport const bad = () => api()\n")

    const workspaceId = 'l2-package-boundary'
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(workspaceId, 'L2', root, new Date().toISOString())
    indexWorkspace(db, workspaceId, root)

    const imports = db.prepare(`
      SELECT f.path, e.raw_target AS specifier, target.path AS target
        FROM edges e JOIN files f ON f.id = e.src_file
        LEFT JOIN files target ON target.id = e.dst_file
       WHERE e.workspace_id = ? AND e.kind = 'imports' ORDER BY f.path, e.raw_target
    `).all(workspaceId) as Array<{ path: string; specifier: string; target: string | null }>
    assert.deepEqual(imports.map(row => ({ ...row })), [
      { path: 'packages/consumer/src/use.ts', specifier: '@plug/provider', target: 'packages/provider/src/index.ts' },
      { path: 'packages/consumer/src/use.ts', specifier: '@plug/provider/internal', target: null },
      { path: 'packages/consumer/test/use.test.ts', specifier: '@plug/provider', target: 'packages/provider/src/index.ts' },
      { path: 'packages/stranger/src/no-dependency.ts', specifier: '@plug/provider', target: null },
    ])
    const tested = db.prepare(`
      SELECT COUNT(*) AS n FROM edges e JOIN symbols dst ON dst.id = e.dst_symbol
       JOIN files src ON src.id = e.src_file
       WHERE e.workspace_id = ? AND e.kind = 'calls' AND dst.name = 'api' AND src.path LIKE '%/test/%'
    `).get(workspaceId) as { n: number }
    assert.equal(tested.n, 1, 'the graph maps a real test call to its exported symbol')

    const entries = getPackageEntryPoints(db, workspaceId)
    assert.deepEqual(entries.map(entry => ({ ...entry, symbols: entry.symbols.map(symbol => ({ ...symbol })) })), [{
      packageName: '@plug/provider', path: 'packages/provider/src/index.ts',
      symbols: [{ id: entries[0].symbols[0].id, name: 'api', kind: 'function', line: 1 }],
    }], 'only an explicit package export becomes an entry point')
    const coverage = getTestCoverage(db, { name: 'api', file: 'provider/src/index.ts' })
    assert.equal(coverage.status, 'found')
    assert.deepEqual(coverage.tests.map(item => item.path), ['packages/consumer/test/use.test.ts'])
    const slice = getImpactSlice(db, { name: 'api', file: 'provider/src/index.ts' }, { direction: 'upstream', maxDepth: 2 })
    assert.equal(slice.coverage.tests.length, 1)
    assert.ok(slice.impact.totalImpacted >= 1, 'the review slice retains resolved reverse dependants')
    server = await serve({ db, uiRoot: null }, 0)
    const base = `http://127.0.0.1:${server.port}/api/intel`
    const entryResponse = await fetch(`${base}/entry-points?workspace=${workspaceId}`)
    assert.equal(entryResponse.status, 200)
    const entryBody = await entryResponse.json() as { ok: boolean; entries: Array<{ packageName: string }> }
    assert.equal(entryBody.ok, true)
    assert.deepEqual(entryBody.entries.map(entry => entry.packageName), ['@plug/provider'])
    const sliceResponse = await fetch(`${base}/impact-slice?workspace=${workspaceId}&target=api&file=provider%2Fsrc%2Findex.ts`)
    assert.equal(sliceResponse.status, 200)
    const sliceBody = await sliceResponse.json() as { ok: boolean; result: { coverage: { tests: unknown[] } } }
    assert.equal(sliceBody.ok, true)
    assert.equal(sliceBody.result.coverage.tests.length, 1)
  } finally {
    if (server !== null) await server.close()
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('L2 gold corpus: PlugBoard never turns an absent package build or undeclared dependency into an edge', {
  skip: process.env.PLUGPT_CODE_ROOT === undefined ? 'set PLUGPT_CODE_ROOT to run against the PLUG corpus' : false,
}, () => {
  const root = join(process.env.PLUGPT_CODE_ROOT as string, 'PlugBoard')
  assert.equal(existsSync(root), true)
  const known = new Set(walk(root).map(file => file.rel))
  const resolver = new PackageResolver(root, known)
  // `plugboard` declares @plug/design-system, but its export points at a
  // missing dist artifact. Mapping that to source would cross the build fence.
  assert.equal(resolver.resolve('src/renderer/appearance/AppearanceProvider.tsx', '@plug/design-system'), null)
  // The launcher imports the same package but does not declare it at all.
  assert.equal(resolver.resolve('packages/plug-launcher/src/App.tsx', '@plug/design-system'), null)
})
