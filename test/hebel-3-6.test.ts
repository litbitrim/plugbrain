/**
 * Tests for BENCH-03 Q3 (Hebel 3 bis 6):
 * - Hebel 3: Impact fallback (import graph & raw_target edges when call edges unresolved)
 * - Hebel 4: Config & Environment variables indexed as symbols
 * - Hebel 5: Universal Markdown document lookup in any workspace
 * - Hebel 6: File path, entrypoint and barrel boosting
 */
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { getBlastRadius } from '../src/intel/impact.ts'
import { conceptSearch } from '../src/intel/query.ts'
import { extractFromSource } from '../src/indexer/ast.ts'
import { parseFile } from '../src/indexer/scan.ts'

const write = (root: string, rel: string, content: string): void => {
  const file = join(root, ...rel.split('/'))
  mkdirSync(join(file, '..'), { recursive: true })
  writeFileSync(file, content, 'utf8')
}

test('Q3 Hebel 3: Impact fallback catches unresolved call edges and module imports', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-q3-impact-'))
  const root = join(dir, 'workspace')
  const db = openStore(join(dir, 'brain.db'))
  const ws = 'ws-q3-impact'
  try {
    write(root, 'src/service.ts', `
      export function computeServiceHash(input: string): string {
        return "hash_" + input;
      }
    `)
    // Caller imports the module and calls computeServiceHash dynamically/unresolved
    write(root, 'src/consumer.ts', `
      import { computeServiceHash } from './service';
      export function runConsumer() {
        return computeServiceHash('test');
      }
    `)
    // Indirect importer that only imports the module
    write(root, 'src/importerOnly.ts', `
      import './service';
      export const active = true;
    `)

    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)').run(ws, 'Q3 impact', root, new Date().toISOString())
    indexWorkspace(db, ws, root)

    const blast = getBlastRadius(db, 'computeServiceHash', { workspaceId: ws })
    assert.ok(blast.totalImpacted >= 1, 'Must find at least 1 impacted node via call or import fallback')
    const files = Object.values(blast.nodes).flat().map(n => n.file)
    assert.ok(files.some(f => f.includes('consumer.ts') || f.includes('importerOnly.ts')), 'Impact must report consumer or importer file')
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('Q3 Hebel 4: Config and Env variable keys extracted as symbols', () => {
  // TS process.env
  const tsContent = `
    const port = process.env.PLUGMEDIA_TEST_PORT || 3000;
    const dbKey = process.env['DATABASE_SECRET_KEY'];
  `
  const tsExtract = extractFromSource('src/config.ts', tsContent, '.ts')
  const tsEnvNames = tsExtract.symbols.map(s => s.name)
  assert.ok(tsEnvNames.includes('PLUGMEDIA_TEST_PORT'), 'Must extract process.env.PLUGMEDIA_TEST_PORT')
  assert.ok(tsEnvNames.includes('DATABASE_SECRET_KEY'), 'Must extract process.env["DATABASE_SECRET_KEY"]')

  // Python os.environ
  const pyContent = `
import os
port = os.environ['SERVER_PORT']
token = os.getenv('API_AUTH_TOKEN')
  `
  const pyExtract = extractFromSource('src/server.py', pyContent, '.py')
  const pyEnvNames = pyExtract.symbols.map(s => s.name)
  assert.ok(pyEnvNames.includes('SERVER_PORT'), 'Must extract SERVER_PORT from python')
  assert.ok(pyEnvNames.includes('API_AUTH_TOKEN'), 'Must extract API_AUTH_TOKEN from python')

  // JSON top-level keys
  const jsonContent = JSON.stringify({
    name: 'test-package',
    scripts: { test: 'node --test' },
    customSetting: 'enabled',
  }, null, 2)
  const jsonParsed = parseFile('package.json', '.json', jsonContent)
  const jsonKeys = jsonParsed.symbols.map(s => s.name)
  assert.ok(jsonKeys.includes('name'), 'JSON must extract name key')
  assert.ok(jsonKeys.includes('scripts'), 'JSON must extract scripts key')
  assert.ok(jsonKeys.includes('customSetting'), 'JSON must extract customSetting key')
})

test('Q3 Hebel 5 & 6: Markdown document search and entrypoint/barrel boosting', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-q3-docs-'))
  const root = join(dir, 'workspace')
  const db = openStore(join(dir, 'brain.db'))
  const ws = 'ws-q3-docs'
  try {
    write(root, 'CANON.md', '# Project Canon\nThis is the core architectural canon.\n')
    write(root, 'src/server.ts', 'export function startServer() { return "listening" }\n')
    write(root, 'src/utils/helper.ts', 'export function startServerMock() { return "mock" }\n')

    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)').run(ws, 'Q3 docs', root, new Date().toISOString())
    indexWorkspace(db, ws, root)

    // Hebel 5: Markdown document lookup
    const canonRes = conceptSearch(db, 'CANON.md', { workspaceId: ws })
    assert.ok(canonRes.symbols.length > 0 || canonRes.notes.length > 0, 'Must find CANON.md in concept search')
    const canonHit = canonRes.symbols.find(s => s.file.includes('CANON.md')) || canonRes.notes.find(n => n.path.includes('CANON.md'))
    assert.ok(canonHit !== undefined, 'CANON.md must appear in search results')

    // Hebel 6: Entrypoint boosting (server.ts should rank above helper.ts for query "server")
    const serverRes = conceptSearch(db, 'server', { workspaceId: ws })
    assert.ok(serverRes.symbols.length > 0)
    assert.ok(serverRes.symbols[0].file.includes('server.ts'), 'server.ts entrypoint must outrank internal helper')
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})
