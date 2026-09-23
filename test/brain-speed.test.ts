/**
 * B-SPEED: bounded Brain reads on a large Planet-shaped store.
 *
 * The fixture inserts indexed facts directly because indexing 50,000 source
 * files measures parsers and disk throughput, not the read routes under test.
 * Every route still uses the production SQLite schema and HTTP server.
 */
import { strict as assert } from 'node:assert'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { openStore } from '../src/store/schema.ts'
import { ensureTraceSchema, ingestTraceEvents } from '../src/trace.ts'

const FILES = 50_000
const TRACE_EVENTS = 2_000
const WS = 'ws-speed-fixture'

const elapsed = async (read: () => Promise<Response>): Promise<number> => {
  const start = process.hrtime.bigint()
  const response = await read()
  assert.equal(response.status, 200)
  await response.arrayBuffer()
  return Number(process.hrtime.bigint() - start) / 1e6
}

const percentile = (values: number[], p: number): number => {
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * p) - 1))
  return sorted[index] ?? 0
}

test('B-SPEED: status, paginated files and Mesh stay inside the 1s Core budget at 50k files', async (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-speed-'))
  const db = openStore(join(dir, 'brain.db'))
  let server: ServerHandle | null = null
  try {
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(WS, 'speed fixture', join(dir, 'planet'), new Date().toISOString())
    db.prepare(
      `INSERT INTO workspace_index_state
         (workspace_id, generation, file_count, symbol_count, edge_count)
       VALUES (?, 7, ?, 0, 0)`,
    ).run(WS, FILES)

    const insertFile = db.prepare(
      `INSERT INTO files
         (workspace_id, path, ext, lang, size, mtime, loc, indexed_at, generation, created_generation)
       VALUES (?, ?, '.ts', 'typescript', 32, ?, 1, ?, 7, 7)`,
    )
    const now = new Date().toISOString()
    db.exec('BEGIN')
    try {
      for (let i = 0; i < FILES; i += 1) {
        insertFile.run(WS, `Code/repo-${String(i % 20).padStart(2, '0')}/src/mod-${String(i).padStart(5, '0')}.ts`, now, now)
      }
      db.exec('COMMIT')
    } catch (error) {
      db.exec('ROLLBACK')
      throw error
    }

    ensureTraceSchema(db)
    const insertTrace = db.prepare(
      `INSERT INTO trace_events
        (event_id, source, source_sequence, runtime_instance_id, workspace_id, task_id, worker_id,
         agent_id, type, occurred_at, observed_at, file_refs, symbol_refs, artifact_refs, receipt_refs,
         payload, provenance_mode, authority_ref, confidence)
       VALUES (?, 'operator', ?, 'runtime-speed', ?, ?, ?, ?, 'worker.started', ?, ?, '[]', '[]', '[]', '[]', '{}', 'live', 'bench', 'authoritative')`,
    )
    db.exec('BEGIN')
    try {
      for (let i = 0; i < TRACE_EVENTS; i += 1) {
        const at = new Date(Date.UTC(2026, 8, 23, 0, 0, i)).toISOString()
        insertTrace.run(`speed-${i}`, i, WS, `task-${i}`, `worker-${i}`, `agent-${i}`, at, at)
      }
      db.exec('COMMIT')
    } catch (error) {
      db.exec('ROLLBACK')
      throw error
    }

    const filePlan = db.prepare(
      'EXPLAIN QUERY PLAN SELECT id, path FROM files WHERE workspace_id = ? ORDER BY path LIMIT ? OFFSET ?',
    ).all(WS, 200, 0) as Array<{ detail: string }>
    const meshPlan = db.prepare(
      'EXPLAIN QUERY PLAN SELECT event_id FROM trace_events WHERE workspace_id = ? ORDER BY occurred_at, COALESCE(source_sequence, 0), event_id',
    ).all(WS) as Array<{ detail: string }>
    assert.match(filePlan.map(row => row.detail).join('\n'), /idx_files_ws_path/)
    assert.match(meshPlan.map(row => row.detail).join('\n'), /idx_trace_ws/)

    server = await serve({ db, uiRoot: null }, 0)
    const base = `http://127.0.0.1:${server.port}`
    const reads = {
      status: () => fetch(`${base}/api/intel/status?workspace=${WS}`),
      files: () => fetch(`${base}/api/files?workspace=${WS}&limit=200&offset=1000`),
      mesh: () => fetch(`${base}/api/mesh?workspace=${WS}`),
    }
    const p95ByRoute: Record<string, number> = {}
    for (const [route, read] of Object.entries(reads)) {
      const runs: number[] = []
      for (let i = 0; i < 5; i += 1) runs.push(await elapsed(read))
      const p95 = percentile(runs, 95)
      p95ByRoute[route] = Number(p95.toFixed(1))
      assert.ok(p95 < 1000, `${route} p95 ${p95.toFixed(1)} ms exceeds the 1s Core budget`)
    }
    const mesh = await (await reads.mesh()).json() as {
      mesh: { nodes: unknown[]; edges: unknown[]; page: { totalNodes: number; returnedNodes: number; nodesTruncated: boolean } }
    }
    assert.equal(mesh.mesh.nodes.length, 500)
    assert.equal(mesh.mesh.page.returnedNodes, 500)
    assert.ok(mesh.mesh.page.totalNodes > mesh.mesh.page.returnedNodes)
    assert.equal(mesh.mesh.page.nodesTruncated, true)
    ingestTraceEvents(db, [{
      schema: 1,
      eventId: 'speed-after-cache',
      source: 'operator',
      runtimeInstanceId: 'runtime-speed',
      workspaceId: WS,
      taskId: 'task-after-cache',
      workerId: 'worker-after-cache',
      agentId: 'agent-after-cache',
      type: 'worker.started',
      occurredAt: '2026-09-24T00:00:00.000Z',
      observedAt: '2026-09-24T00:00:00.000Z',
      provenance: { mode: 'live', authorityRef: 'bench-after-cache', confidence: 'authoritative' },
    }], { knownWorkspaceIds: new Set([WS]) })
    const refreshed = await (await reads.mesh()).json() as {
      mesh: { page: { totalNodes: number } }
    }
    assert.ok(refreshed.mesh.page.totalNodes > mesh.mesh.page.totalNodes,
      'a committed trace event invalidates the cached Mesh projection')
    t.diagnostic(`B-SPEED p95 ms (5 local requests, 50k files): ${JSON.stringify(p95ByRoute)}`)
  } finally {
    if (server !== null) await server.close()
    db.close()
    rmSync(dir, { recursive: true, force: true, maxRetries: 5 })
  }
})
