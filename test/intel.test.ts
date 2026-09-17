/**
 * M3 Tests: Code Intelligence Subsystem (GitNexus Parity).
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
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
    const res = intel.detectChanges(fix.db, { diffText: syntheticDiff })
    assert.equal(res.changedFiles, 1)
    assert.ok(res.changedSymbols.length > 0)
    assert.equal(res.changedSymbols[0].name, 'startGateway')
    assert.equal(res.changedSymbols[0].changeType, 'modified')

    // Clean diff returns 0 changed symbols
    const clean = intel.detectChanges(fix.db, { diffText: '' })
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
    const status = intel.getIntelStatus(fix.db)
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
