import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { indexWorkspace } from '../src/indexer/index.ts'
import { openStore } from '../src/store/schema.ts'

const write = (root: string, rel: string, content: string): void => {
  const path = join(root, ...rel.split('/'))
  mkdirSync(join(path, '..'), { recursive: true })
  writeFileSync(path, content)
}

test('L2: bare workspace imports cross only declared exports, and test calls map to the exported symbol', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-l2-package-'))
  const root = join(dir, 'workspace')
  const db = openStore(join(dir, 'brain.db'))
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
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})
