/**
 * M3 Tests: Code Intelligence Subsystem (GitNexus Parity).
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { McpServer } from '../src/mcp/server.ts'
import * as intel from '../src/intel/index.ts'

interface IntelFixture {
  dir: string
  root: string
  db: DatabaseSync
  workspaceId: string
  serverHandle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

async function createIntelFixture(): Promise<IntelFixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-intel-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })

  // Initialize git repo for checkout tests
  execFileSync('git', ['init', '-b', 'main', root], { stdio: 'ignore', windowsHide: true })
  execFileSync('git', ['-C', root, 'config', 'user.name', 'test'], { stdio: 'ignore', windowsHide: true })
  execFileSync('git', ['-C', root, 'config', 'user.email', 'test@example.com'], { stdio: 'ignore', windowsHide: true })
  writeFileSync(join(root, 'README.md'), '# test repo\n')
  execFileSync('git', ['-C', root, 'add', 'README.md'], { stdio: 'ignore', windowsHide: true })
  execFileSync('git', ['-C', root, 'commit', '-m', 'initial commit'], { stdio: 'ignore', windowsHide: true })

  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = 'ws-intel-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Intel Test Workspace', root, new Date().toISOString())

  // Insert test files
  db.prepare(
    `INSERT INTO files (id, workspace_id, path, repo_id, checkout_id, ext, size, mtime)
     VALUES (1, ?, 'src/gateway.ts', 'repo-engine', 'co-engine', '.ts', 500, '2026-09-17T00:00:00Z'),
            (2, ?, 'src/server.ts', 'repo-engine', 'co-engine', '.ts', 400, '2026-09-17T00:00:00Z'),
            (3, ?, 'src/client.ts', 'repo-engine', 'co-engine', '.ts', 300, '2026-09-17T00:00:00Z')`
  ).run(workspaceId, workspaceId, workspaceId)

  // Insert test symbols
  db.prepare(
    `INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported, container)
     VALUES (10, 1, 'startGateway', 'function', 10, 25, 1, null),
            (11, 1, 'dispatchRequest', 'function', 30, 50, 1, null),
            (12, 2, 'handleRequest', 'function', 5, 20, 1, null),
            (13, 3, 'sendQuery', 'function', 15, 30, 1, null)`
  ).run()

  // Insert test edges (call graph: sendQuery -> handleRequest -> dispatchRequest -> startGateway)
  db.prepare(
    `INSERT INTO edges (id, workspace_id, kind, src_symbol, src_file, dst_symbol, dst_file, resolved, line)
     VALUES (100, ?, 'calls', 13, 3, 12, 2, 1, 20),
            (101, ?, 'calls', 12, 2, 11, 1, 1, 15),
            (102, ?, 'calls', 11, 1, 10, 1, 1, 40)`
  ).run(workspaceId, workspaceId, workspaceId)

  const serverHandle = await serve({ db, uiRoot: null }, 0)
  const baseUrl = `http://127.0.0.1:${serverHandle.port}`

  return {
    dir,
    root,
    db,
    workspaceId,
    serverHandle,
    baseUrl,
    cleanup: async () => {
      await serverHandle.close()
      db.close()
      try { rmSync(dir, { recursive: true, force: true }) } catch { /* ignore */ }
    },
  }
}

test('M3: vendor classification identifies own code vs upstream and vendor dirs', () => {
  // PlugHarness native code
  const ownPlug = intel.classifyVendor('Code/PlugHarness/packages/plug/src/index.ts', 'PlugHarness')
  assert.equal(ownPlug.isVendor, false)

  // PlugHarness upstream DeepSeek code (base 99f6f02)
  const upstreamHarness = intel.classifyVendor('Code/PlugHarness/packages/core/src/agent.ts', 'PlugHarness')
  assert.equal(upstreamHarness.isVendor, true)
  assert.match(upstreamHarness.vendorReason ?? '', /deepseek-harness/)

  // Generic vendor folder
  const genericVendor = intel.classifyVendor('src/vendor/lib.js')
  assert.equal(genericVendor.isVendor, true)
  assert.match(genericVendor.vendorReason ?? '', /vendor/)

  // Normal first party code in other repo
  const normalCode = intel.classifyVendor('Code/PlugBrain-Core/src/server/api.ts')
  assert.equal(normalCode.isVendor, false)
})

test('M3: getSymbolContext returns 360-degree view (callers, callees, execution flows)', async () => {
  const fix = await createIntelFixture()
  try {
    // 1. Existing symbol with incoming & outgoing calls
    const res = intel.getSymbolContext(fix.db, 'handleRequest')
    assert.equal(res.status, 'found')
    assert.ok(res.symbol)
    assert.equal(res.symbol.name, 'handleRequest')
    assert.equal(res.incoming.calls.length, 1)
    assert.equal(res.incoming.calls[0].name, 'sendQuery')
    assert.equal(res.outgoing.calls.length, 1)
    assert.equal(res.outgoing.calls[0].name, 'dispatchRequest')
    assert.ok(res.processes.length > 0)
    assert.match(res.processes[0].label, /sendQuery -> handleRequest -> dispatchRequest/)

    fix.db.prepare(`INSERT INTO edges (workspace_id, kind, src_symbol, src_file, raw_target, resolved, line)
      VALUES (?, 'calls', 12, 2, 'unknownExternal', 0, 18)`).run(fix.workspaceId)
    const unresolved = intel.getSymbolContext(fix.db, 'handleRequest', { workspaceId: fix.workspaceId })
    assert.ok(unresolved.outgoing.calls.some(call => call.rawTarget === 'unknownExternal'))

    // 2. Negative case: symbol not found
    const missing = intel.getSymbolContext(fix.db, 'nonExistentSymbol')
    assert.equal(missing.status, 'not_found')
    assert.equal(missing.symbol, null)
    assert.equal(missing.incoming.calls.length, 0)
    assert.equal(missing.outgoing.calls.length, 0)
  } finally {
    await fix.cleanup()
  }
})

test('M3: getBlastRadius calculates upstream and downstream impact with depth and confidence', async () => {
  const fix = await createIntelFixture()
  try {
    // Upstream impact of startGateway (who depends on it directly and transitively)
    const upstream = intel.getBlastRadius(fix.db, 'startGateway', { direction: 'upstream', maxDepth: 3 })
    assert.equal(upstream.target.name, 'startGateway')
    assert.equal(upstream.direction, 'upstream')
    assert.ok(upstream.totalImpacted >= 2)
    assert.ok(upstream.nodes[1].length > 0)
    assert.equal(upstream.nodes[1][0].name, 'dispatchRequest')
    assert.ok(upstream.nodes[2].length > 0)
    assert.equal(upstream.nodes[2][0].name, 'handleRequest')

    // Downstream impact of sendQuery
    const downstream = intel.getBlastRadius(fix.db, 'sendQuery', { direction: 'downstream', maxDepth: 3 })
    assert.ok(downstream.totalImpacted >= 2)
    assert.equal(downstream.nodes[1][0].name, 'handleRequest')

    // Negative case: unknown target
    const missing = intel.getBlastRadius(fix.db, 'unknownTarget')
    assert.equal(missing.totalImpacted, 0)
    assert.equal(missing.risk, 'low')
  } finally {
    await fix.cleanup()
  }
})

test('M3: import fallback reports only the named symbol from its resolved module', async () => {
  const fix = await createIntelFixture()
  try {
    fix.db.prepare(`INSERT INTO files (id, workspace_id, path, repo_id, checkout_id, ext, size, mtime)
      VALUES (4, ?, 'src/target-user.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (5, ?, 'src/other-user.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (6, ?, 'src/unrelated-user.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (7, ?, 'other/gateway.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (8, ?, 'src/barrel.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (9, ?, 'src/barrel-user.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (10, ?, 'src/shadow-barrel.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z'),
             (11, ?, 'src/shadow-user.ts', 'repo-engine', 'co-engine', '.ts', 10, '2026-09-17T00:00:00Z')`
    ).run(...Array(8).fill(fix.workspaceId))
    fix.db.prepare(`INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported, container)
      VALUES (14, 1, 'startGateway', 'method', 60, 65, 0, 'PrivateGateway'),
             (15, 10, 'startGateway', 'function', 1, 1, 1, null)`).run()
    fix.db.prepare(`INSERT INTO file_imports (workspace_id, file_id, specifier, local_name, imported_name, line)
      VALUES (?, 4, './gateway', 'start', 'startGateway', 1),
             (?, 4, './gateway', 'startAgain', 'startGateway', 2),
             (?, 5, './gateway', 'dispatchRequest', 'dispatchRequest', 1),
             (?, 6, '../other/gateway', 'startGateway', 'startGateway', 1),
             (?, 8, './gateway', '*', '*', 1),
             (?, 9, './barrel', 'startGateway', 'startGateway', 1),
             (?, 10, './gateway', '*', '*', 1),
             (?, 11, './shadow-barrel', 'startGateway', 'startGateway', 1)`
    ).run(...Array(8).fill(fix.workspaceId))
    fix.db.prepare(`INSERT INTO edges (workspace_id, kind, src_file, dst_file, raw_target, resolved, line)
      VALUES (?, 'imports', 4, 1, './gateway', 1, 1),
             (?, 'imports', 5, 1, './gateway', 1, 1),
             (?, 'imports', 6, 7, '../other/gateway', 1, 1),
             (?, 'imports', 8, 1, './gateway', 1, 1),
             (?, 'imports', 9, 8, './barrel', 1, 1),
             (?, 'imports', 10, 1, './gateway', 1, 1),
             (?, 'imports', 11, 10, './shadow-barrel', 1, 1)`
    ).run(...Array(7).fill(fix.workspaceId))

    const result = intel.getBlastRadius(fix.db, { name: 'startGateway', id: 10 }, {
      workspaceId: fix.workspaceId, direction: 'upstream', maxDepth: 2,
    })
    assert.equal(result.status, 'found')
    const imports = result.nodes[1].filter(node => node.relationType === 'imports')
    assert.deepEqual(imports.map(node => ({ id: node.id, file: node.file, kind: node.kind })).sort((a, b) => a.id - b.id), [
      { id: -8, file: 'src/barrel.ts', kind: 'file' },
      { id: -4, file: 'src/target-user.ts', kind: 'file' },
    ])
    assert.deepEqual(result.nodes[2].filter(node => node.relationType === 'imports').map(node => node.file),
      ['src/barrel-user.ts'])

    const privateMethod = intel.getBlastRadius(fix.db, { name: 'startGateway', id: 14 }, {
      workspaceId: fix.workspaceId, direction: 'upstream', maxDepth: 1,
    })
    assert.deepEqual(privateMethod.nodes[1].filter(node => node.relationType === 'imports'), [])

    fix.db.prepare(`INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported, container)
      VALUES (16, 9, 'useBarrel', 'function', 2, 3, 1, null)`).run()
    fix.db.prepare(`INSERT INTO edges (workspace_id, kind, src_symbol, src_file, raw_target, resolved, line)
      VALUES (?, 'calls', 16, 9, 'startGateway', 0, 2)`).run(fix.workspaceId)
    const calledThroughBarrel = intel.getBlastRadius(fix.db, { name: 'startGateway', id: 10 }, {
      workspaceId: fix.workspaceId, direction: 'upstream', maxDepth: 2,
    })
    assert.ok(calledThroughBarrel.nodes[1].some(node => node.name === 'useBarrel'))
    assert.deepEqual(calledThroughBarrel.nodes[2].filter(node => node.relationType === 'imports'), [],
      'a caller already represents the importing file at a shallower depth')

    fix.db.prepare(`INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported, container)
      VALUES (17, 4, 'lateCaller', 'function', 3, 4, 1, null),
             (18, 4, 'downstreamCallee', 'function', 5, 6, 1, null)`).run()
    fix.db.prepare(`INSERT INTO edges (workspace_id, kind, src_symbol, src_file, dst_symbol, dst_file, resolved, line)
      VALUES (?, 'calls', 17, 4, 11, 1, 1, 3),
             (?, 'calls', 10, 1, 18, 4, 1, 5)`).run(fix.workspaceId, fix.workspaceId)
    const mixed = intel.getBlastRadius(fix.db, { name: 'startGateway', id: 10 }, {
      workspaceId: fix.workspaceId, direction: 'both', maxDepth: 2,
    })
    assert.ok(mixed.nodes[1].some(node => node.id === -4 && node.relationType === 'imports'),
      'a direct import remains visible beside later upstream and same-depth downstream symbols')
    assert.ok(mixed.nodes[1].some(node => node.name === 'downstreamCallee'))
    assert.ok(mixed.nodes[2].some(node => node.name === 'lateCaller'))
  } finally {
    await fix.cleanup()
  }
})

test('M3: conceptSearch searches across symbols, notes, and call flows', async () => {
  const fix = await createIntelFixture()
  try {
    const res = intel.conceptSearch(fix.db, 'dispatchRequest')
    assert.ok(res.total > 0)
    assert.ok(res.symbols.some(s => s.name === 'dispatchRequest'))
    assert.ok(res.timingMs >= 0)

    // Negative case: non-matching query
    const empty = intel.conceptSearch(fix.db, 'xyzTotallyUnknownToken1234')
    assert.equal(empty.total, 0)
    assert.equal(empty.symbols.length, 0)
  } finally {
    await fix.cleanup()
  }
})

test('M3: detectChanges maps diff hunks to affected symbols and execution flows', async () => {
  const fix = await createIntelFixture()
  try {
    // Synthetic diff modifying lines 15-20 of src/gateway.ts (inside startGateway lines 10-25)
    const syntheticDiff = `
diff --git a/src/gateway.ts b/src/gateway.ts
index 1111111..2222222 100644
--- a/src/gateway.ts
+++ b/src/gateway.ts
@@ -15,5 +15,6 @@
+ // modified line inside startGateway
`
    const res = intel.detectChanges(fix.db, { workspaceId: fix.workspaceId, diffText: syntheticDiff })
    assert.equal(res.changedFiles, 1)
    assert.ok(res.changedSymbols.length > 0)
    assert.equal(res.changedSymbols[0].name, 'startGateway')
    assert.equal(res.changedSymbols[0].changeType, 'modified')

    // Clean diff returns 0 changed symbols
    const clean = intel.detectChanges(fix.db, { workspaceId: fix.workspaceId, diffText: '' })
    assert.equal(clean.changedFiles, 0)
    assert.equal(clean.changedSymbols.length, 0)
    assert.equal(clean.riskLevel, 'low')
  } finally {
    await fix.cleanup()
  }
})

test('M3: executeCypherQuery parses and executes Cypher and JSON-DSL queries', async () => {
  const fix = await createIntelFixture()
  try {
    // 1. Cypher node count
    const countRes = intel.executeCypherQuery(fix.db, 'MATCH (n:Function) RETURN count(n)')
    assert.equal(countRes.rowCount, 1)
    assert.ok(Number(countRes.rows[0].count) >= 4)
    assert.ok(countRes.markdown.includes('| count |'))

    // 2. Cypher node with WHERE
    const nodeRes = intel.executeCypherQuery(
      fix.db,
      "MATCH (s:Symbol) WHERE s.name = 'startGateway' RETURN s.name, s.kind"
    )
    assert.equal(nodeRes.rowCount, 1)
    assert.equal(nodeRes.rows[0]['s.name'], 'startGateway')

    // 3. Cypher edge query
    const edgeRes = intel.executeCypherQuery(
      fix.db,
      'MATCH (a:Symbol)-[:CALLS]->(b:Symbol) RETURN a.name, b.name'
    )
    assert.ok(edgeRes.rowCount >= 3)

    // 4. JSON-DSL query
    const dslRes = intel.executeCypherQuery(fix.db, {
      match: {
        source: { type: 'Symbol', where: { name: 'handleRequest' } },
        relation: 'CALLS',
        target: { type: 'Symbol' },
      },
      return: ['source_name', 'target_name'],
    })
    assert.equal(dslRes.rowCount, 1)
    assert.equal(dslRes.rows[0].source_name, 'handleRequest')
    assert.equal(dslRes.rows[0].target_name, 'dispatchRequest')

    // 5. Negative case: malformed query returns honest error and does not throw
    const badRes = intel.executeCypherQuery(fix.db, 'INVALID QUERY SYNTAX !!!')
    assert.ok(badRes.columns.length > 0)
  } finally {
    await fix.cleanup()
  }
})

test('M3: getIntelStatus reports index counts and checkout staleness', async () => {
  const fix = await createIntelFixture()
  try {
    const status = intel.getIntelStatus(fix.db, fix.workspaceId)
    assert.equal(status.workspaceId, fix.workspaceId)
    assert.equal(status.files, 3)
    assert.equal(status.symbols, 4)
    assert.equal(status.edges, 3)
    assert.equal(typeof status.staleness.isStale, 'boolean')
  } finally {
    await fix.cleanup()
  }
})

test('M3: HTTP API routes /api/intel/* serve real data', async () => {
  const fix = await createIntelFixture()
  try {
    // 1. GET /api/intel/status
    const statusRes = await fetch(`${fix.baseUrl}/api/intel/status`)
    assert.equal(statusRes.status, 200)
    const statusJson = await statusRes.json() as any
    assert.equal(statusJson.ok, true)
    assert.equal(statusJson.status.files, 3)

    // 2. GET /api/intel/context?name=handleRequest
    const ctxRes = await fetch(`${fix.baseUrl}/api/intel/context?name=handleRequest`)
    assert.equal(ctxRes.status, 200)
    const ctxJson = await ctxRes.json() as any
    assert.equal(ctxJson.ok, true)
    assert.equal(ctxJson.result.symbol.name, 'handleRequest')

    // 3. POST /api/intel/impact
    const impactRes = await fetch(`${fix.baseUrl}/api/intel/impact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'startGateway', direction: 'upstream' }),
    })
    assert.equal(impactRes.status, 200)
    const impactJson = await impactRes.json() as any
    assert.equal(impactJson.ok, true)
    assert.ok(impactJson.result.totalImpacted > 0)

    // 4. POST /api/intel/query
    const queryRes = await fetch(`${fix.baseUrl}/api/intel/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'startGateway' }),
    })
    assert.equal(queryRes.status, 200)
    const queryJson = await queryRes.json() as any
    assert.equal(queryJson.ok, true)
    assert.ok(queryJson.result.total > 0)

    // 5. POST /api/intel/cypher
    const cypherRes = await fetch(`${fix.baseUrl}/api/intel/cypher`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'MATCH (n:Function) RETURN count(n)' }),
    })
    assert.equal(cypherRes.status, 200)
    const cypherJson = await cypherRes.json() as any
    assert.equal(cypherJson.ok, true)
    assert.equal(cypherJson.result.rowCount, 1)

    // 6. Negative case: missing name parameter on context returns 400
    const badContext = await fetch(`${fix.baseUrl}/api/intel/context`)
    assert.equal(badContext.status, 400)
  } finally {
    await fix.cleanup()
  }
})

test('HTTP Cypher requires an unambiguous workspace and never reads another workspace', async () => {
  const fix = await createIntelFixture()
  try {
    const second = 'ws-intel-private'
    fix.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(second, 'Private', join(fix.dir, 'private'), new Date().toISOString())
    fix.db.prepare(`INSERT INTO files (id, workspace_id, path, ext, size, mtime)
      VALUES (90, ?, 'src/private.ts', '.ts', 30, '2026-09-30T00:00:00Z')`).run(second)
    fix.db.prepare(`INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported)
      VALUES (90, 90, 'privateOnly', 'function', 1, 1, 1)`).run()

    const ask = (workspace?: string, query = 'MATCH (n:Function) RETURN n.name') => fetch(`${fix.baseUrl}/api/intel/cypher`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query, ...(workspace ? { workspace } : {}) }),
    })
    const missing = await ask()
    assert.equal(missing.status, 400)
    const first = await ask(fix.workspaceId)
    assert.equal(first.status, 200)
    const firstBody = await first.json() as { result: { rows: Array<Record<string, unknown>> } }
    assert.equal(JSON.stringify(firstBody.result.rows).includes('privateOnly'), false)
    const privateResponse = await ask(second)
    assert.equal(privateResponse.status, 200)
    const privateBody = await privateResponse.json() as { result: { rows: Array<Record<string, unknown>> } }
    assert.equal(JSON.stringify(privateBody.result.rows).includes('privateOnly'), true)
    assert.equal(JSON.stringify(privateBody.result.rows).includes('startGateway'), false)
    const hostile = "MATCH (n:Function) WHERE n.name = 'x') OR 1=1 OR (1=1 RETURN n.name"
    const hostileHttp = await ask(fix.workspaceId, hostile)
    assert.equal(hostileHttp.status, 200)
    const hostileHttpBody = await hostileHttp.json() as { result: { rowCount: number; rows: Array<Record<string, unknown>> } }
    assert.equal(hostileHttpBody.result.rowCount, 0)
    assert.equal(JSON.stringify(hostileHttpBody).includes('privateOnly'), false)
    const hostileMcp = await new McpServer({ db: fix.db, workspaceId: fix.workspaceId })
      .executeTool('cypher', { workspaceId: fix.workspaceId, query: hostile })
    assert.equal((hostileMcp.result as { rowCount: number }).rowCount, 0)
    assert.equal(JSON.stringify(hostileMcp).includes('privateOnly'), false)
    const dslInjection = JSON.stringify({ where: { name: 'startGateway' },
      limit: "(SELECT CASE WHEN EXISTS(SELECT 1 FROM symbols s JOIN files f ON f.id=s.file_id WHERE f.workspace_id='ws-intel-private' AND s.name='privateOnly') THEN 1 ELSE 0 END)" })
    const dslHttp = await ask(fix.workspaceId, dslInjection)
    // HTTP supplies an explicit numeric outer limit, which overrides the DSL value.
    const dslHttpBody = await dslHttp.json() as { result: { rowCount: number; rows: unknown[] } }
    assert.equal(dslHttpBody.result.rowCount, 1)
    assert.equal(JSON.stringify(dslHttpBody).includes('privateOnly'), false)
    const hostileLimitHttp = await fetch(`${fix.baseUrl}/api/intel/cypher`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: dslInjection, workspace: fix.workspaceId, limit: '(SELECT 1)' }),
    })
    assert.equal((await hostileLimitHttp.json() as { result: { rowCount: number } }).result.rowCount, 0)
    const dslMcp = await new McpServer({ db: fix.db, workspaceId: fix.workspaceId })
      .executeTool('cypher', { workspaceId: fix.workspaceId, query: dslInjection })
    assert.equal((dslMcp.result as { rowCount: number }).rowCount, 0)
  } finally {
    await fix.cleanup()
  }
})

test('HTTP impact refuses an ambiguous name and accepts an explicit symbol ID', async () => {
  const fix = await createIntelFixture()
  try {
    fix.db.prepare(`INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported)
      VALUES (91, 3, 'startGateway', 'function', 60, 61, 1)`).run()
    const ask = (symbolId?: number) => fetch(`${fix.baseUrl}/api/intel/impact`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ target: 'startGateway', ...(symbolId ? { symbolId } : {}) }),
    })
    const ambiguous = await ask()
    assert.equal(ambiguous.status, 409)
    const body = await ambiguous.json() as { ok: boolean; candidates: Array<{ id: number }> }
    assert.equal(body.ok, false)
    assert.deepEqual(body.candidates.map(row => row.id), [10, 91])
    const selected = await ask(10)
    assert.equal(selected.status, 200)
    const selectedBody = await selected.json() as { result: { target: { id: number }; status: string } }
    assert.equal(selectedBody.result.target.id, 10)
    assert.equal(selectedBody.result.status, 'found')
  } finally {
    await fix.cleanup()
  }
})
