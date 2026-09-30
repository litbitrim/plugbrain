/** B-MCP acceptance: analysis tools are scoped, revisioned, and read-only. */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { McpServer } from '../src/mcp/server.ts'
import { setPlanetIndexSelection } from '../src/planet.ts'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-mcp-parity-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-mcp-parity'
  const planetId = 'pl-mcp-parity'
  const repoId = 'repo-mcp-parity'
  const checkoutId = 'co-mcp-parity'
  const now = '2026-09-23T00:00:00.000Z'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Brain corpus', join(dir, 'brain-corpus'), now)
  db.prepare('INSERT INTO planets (id, workspace_id, name, root, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(planetId, workspaceId, 'Brain corpus', join(dir, 'brain-corpus'), now)
  db.prepare('INSERT INTO repos (id, planet_id, name, created_at) VALUES (?, ?, ?, ?)')
    .run(repoId, planetId, 'PlugBrain-Core', now)
  db.prepare(`INSERT INTO checkouts
      (id, planet_id, repo_id, name, path, rel_prefix, branch, head, revision, is_primary, seen_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`)
    .run(checkoutId, planetId, repoId, 'PlugBrain-Core', join(dir, 'brain-corpus'), 'Code/PlugBrain-Core', 'main', 'abc123', 'rev-abc123', now)
  setPlanetIndexSelection(db, workspaceId, [checkoutId])
  db.prepare(`INSERT INTO workspace_index_state
      (workspace_id, generation, git_head, file_count, symbol_count, edge_count, unresolved_count, ambiguous_count)
      VALUES (?, 7, 'abc123', 2, 2, 1, 0, 0)`)
    .run(workspaceId)
  db.prepare(`INSERT INTO files (id, workspace_id, path, repo_id, checkout_id, ext, size, mtime)
      VALUES (1, ?, 'Code/PlugBrain-Core/src/gateway.ts', ?, ?, '.ts', 120, ?),
             (2, ?, 'Code/PlugBrain-Core/src/client.ts', ?, ?, '.ts', 120, ?)`)
    .run(workspaceId, repoId, checkoutId, now, workspaceId, repoId, checkoutId, now)
  db.prepare(`INSERT INTO symbols (id, file_id, name, kind, line, end_line, exported)
      VALUES (10, 1, 'startGateway', 'function', 4, 8, 1),
             (11, 2, 'bootClient', 'function', 3, 6, 1)`).run()
  db.prepare(`INSERT INTO edges (workspace_id, kind, src_symbol, src_file, dst_symbol, dst_file, raw_target, resolved, line)
      VALUES (?, 'calls', 11, 2, 10, 1, 'startGateway', 1, 4),
             (?, 'references', 11, 2, NULL, NULL, 'startGateway', 0, 5)`)
    .run(workspaceId, workspaceId)
  return {
    db, workspaceId, repoId, checkoutId,
    cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) },
  }
}

function assertProvenance(value: any, tool: string, workspaceId: string, checkoutId: string): void {
  assert.equal(value.ok, true)
  assert.deepEqual(value.provenance.source, { system: 'plugbrain', corpus: 'indexed-workspace', tool })
  assert.deepEqual(value.provenance.scope.workspaceIds, [workspaceId])
  assert.ok(value.provenance.scope.checkoutIds.includes(checkoutId))
  assert.equal(value.provenance.revisionVector[0].generation, 7)
  assert.equal(value.provenance.revisionVector[0].checkouts[0].revision, 'rev-abc123')
}

test('B-MCP: GitNexus parity tools report source, scope, and revision vector', async () => {
  const f = fixture()
  try {
    const mcp = new McpServer({ db: f.db, workspaceId: f.workspaceId })
    const cases: Array<[string, Record<string, unknown>]> = [
      ['query', { query: 'startGateway', workspaceId: f.workspaceId, repoId: f.repoId, checkoutId: f.checkoutId }],
      ['context', { name: 'startGateway', workspaceId: f.workspaceId, repoId: f.repoId, checkoutId: f.checkoutId }],
      ['impact', { target: 'startGateway', workspaceId: f.workspaceId, repoId: f.repoId }],
      ['detect_changes', { workspaceId: f.workspaceId, checkoutId: f.checkoutId, diffText: 'diff --git a/src/gateway.ts b/src/gateway.ts\n@@ -4 +4 @@\n-export function startGateway() {}\n+export function startGateway() {}' }],
      ['cypher', { workspaceId: f.workspaceId, query: 'MATCH (n:Function) RETURN count(n)' }],
      ['rename_preview', { workspaceId: f.workspaceId, symbolId: 10, newName: 'startServer' }],
    ]
    for (const [tool, args] of cases) {
      const result = await mcp.executeTool(tool, args)
      assertProvenance(result, tool, f.workspaceId, f.checkoutId)
    }
    const cypher = await mcp.executeTool('cypher', { workspaceId: f.workspaceId, query: 'MATCH (n:Function) RETURN count(n)' })
    assert.equal((cypher.result as { rows: Array<{ count: number }> }).rows[0].count, 2)
    const rename = await mcp.executeTool('rename_preview', { workspaceId: f.workspaceId, symbolId: 10, newName: 'startServer' })
    assert.equal((rename.result as { status: string }).status, 'ready')
    assert.equal((rename.result as { edits: unknown[] }).edits.length, 2)
    assert.equal((rename.result as { requiresManualReview: boolean }).requiresManualReview, true)
  } finally {
    f.cleanup()
  }
})
