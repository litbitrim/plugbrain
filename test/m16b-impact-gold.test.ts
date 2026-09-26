/**
 * M16b Gold corpus: review questions, not parser trivia. Each class names the
 * expected answer shape so the impact slice can distinguish proven test calls
 * from a merely imported test module and never leak a same-named symbol from a
 * different workspace.
 */
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { indexWorkspace } from '../src/indexer/index.ts'
import { getImpactSlice, getTestCoverage } from '../src/intel/boundaries.ts'
import { openStore } from '../src/store/schema.ts'

const write = (root: string, relative: string, content: string): void => {
  const file = join(root, ...relative.split('/'))
  mkdirSync(join(file, '..'), { recursive: true })
  writeFileSync(file, content, 'utf8')
}

test('M16b Gold: impact slices and test mapping answer each review question class', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-m16b-gold-'))
  const root = join(dir, 'workspace-a')
  const otherRoot = join(dir, 'workspace-b')
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'm16b-workspace-a'
  const otherWorkspaceId = 'm16b-workspace-b'
  try {
    write(root, 'src/direct.ts', 'export function direct() { return 1 }\n')
    write(root, 'src/module.ts', 'export function moduleOnly() { return 2 }\n')
    write(root, 'src/duplicate-a.ts', 'export function duplicate() { return 3 }\n')
    write(root, 'src/duplicate-b.ts', 'export function duplicate() { return 4 }\n')
    write(root, 'test/direct.test.ts', "import { direct } from '../src/direct'\nexport const provesDirect = () => direct()\n")
    // There is no call to moduleOnly: this is a module-level candidate only.
    write(root, 'test/module-import.test.ts', "import { moduleOnly } from '../src/module'\nexport const loadsModule = () => Boolean(moduleOnly)\n")
    write(otherRoot, 'src/direct.ts', 'export function direct() { return 99 }\n')
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(workspaceId, 'M16b A', root, new Date().toISOString())
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(otherWorkspaceId, 'M16b B', otherRoot, new Date().toISOString())
    indexWorkspace(db, workspaceId, root)
    indexWorkspace(db, otherWorkspaceId, otherRoot)

    const direct = getTestCoverage(db, 'direct', { workspaceId })
    assert.equal(direct.status, 'found')
    assert.deepEqual(direct.tests.map(row => [row.path, row.relation]), [['test/direct.test.ts', 'calls']])

    const moduleImport = getTestCoverage(db, 'moduleOnly', { workspaceId })
    assert.equal(moduleImport.status, 'found')
    assert.deepEqual(moduleImport.tests.map(row => [row.path, row.relation]), [['test/module-import.test.ts', 'module_import']])
    // Baseline is the former direct-calls/references-only predicate. It is
    // intentionally retained in the corpus measurement to prove the new
    // module_import class is an improvement rather than an unmeasured claim.
    const moduleId = moduleImport.symbol!.id
    const directOnlyBefore = db.prepare(`
      SELECT COUNT(*) AS n FROM edges e JOIN files f ON f.id = e.src_file
       WHERE e.dst_symbol = ? AND e.kind IN ('calls', 'references')
         AND f.workspace_id = ? AND f.path LIKE '%test%'
    `).get(moduleId, workspaceId) as { n: number }
    assert.equal(Number(directOnlyBefore.n), 0)

    const ambiguous = getTestCoverage(db, 'duplicate', { workspaceId })
    assert.equal(ambiguous.status, 'ambiguous')
    const missing = getTestCoverage(db, 'missingSymbol', { workspaceId })
    assert.equal(missing.status, 'not_found')

    const slice = getImpactSlice(db, { name: 'direct', file: 'src/direct.ts' }, {
      workspaceId, direction: 'upstream', maxDepth: 2,
    })
    assert.equal(slice.coverage.status, 'found')
    assert.equal(slice.coverage.tests[0]?.relation, 'calls')
    assert.ok(slice.impact.totalImpacted >= 1, 'the upstream slice retains the direct test caller')

    const classes = {
      direct_symbol: direct.tests.length,
      module_import_before: Number(directOnlyBefore.n),
      module_import_candidate: moduleImport.tests.length,
      impact_upstream: slice.impact.totalImpacted,
      ambiguous_symbol: ambiguous.tests.length,
      absent_symbol: missing.tests.length,
    }
    assert.deepEqual(classes, {
      direct_symbol: 1, module_import_before: 0, module_import_candidate: 1, impact_upstream: 1,
      ambiguous_symbol: 0, absent_symbol: 0,
    })
    t.diagnostic(`M16b Gold question classes: ${JSON.stringify(classes)}`)
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
  }
})
