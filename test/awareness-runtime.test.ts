/**
 * FO-4 Runtime Verification: Awareness Port & Conflict Gate
 *
 * Requirements:
 * 1. createAwarenessPort is bound to the runtime surface (/api/awareness and /api/agent/attach).
 * 2. Three-Tier Proof:
 *    - Tier 1 (Generated): Deterministic TaskAwarenessPack with valid SHA256 digest.
 *    - Tier 2 (Delivered/Accepted): Agent attaches or calls /api/awareness, receiving the pack.
 *    - Tier 3 (Behaviourally Effective): Active conflicting file claims block mutations with 409 Conflict.
 *      When released, the mutation succeeds.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import * as access from '../src/access.ts'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { ingestTraceEvents } from '../src/trace.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import type { TaskAwarenessPack } from '../src/projections/awareness.ts'
import { writeSnapshot } from '../src/chronicle.ts'

interface Fixture {
  dir: string
  root: string
  db: DatabaseSync
  workspaceId: string
  serverHandle: ServerHandle
  baseUrl: string
  authKey: string
  cleanup: () => Promise<void>
}

async function createFixture(): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-awr-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  mkdirSync(join(root, 'src'), { recursive: true })

  writeFileSync(join(root, 'src', 'service.ts'), 'export const service = { status: "active" }\n')
  writeFileSync(join(root, 'src', 'helper.ts'), 'export const helper = { ready: true }\n')

  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = 'ws-awr-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Awareness Test Workspace', root, new Date().toISOString())

  // Run initial index
  indexWorkspace(db, workspaceId, root)

  const authKey = 'secret-token-plug-42'
  const serverHandle = await serve({ db, uiRoot: null, authKey }, 0)
  const baseUrl = `http://127.0.0.1:${serverHandle.port}`

  return {
    dir,
    root,
    db,
    workspaceId,
    serverHandle,
    baseUrl,
    authKey,
    cleanup: async () => {
      await serverHandle.close()
      try { db.close() } catch { /* ignore */ }
      try { rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }) } catch { /* ignore */ }
    },
  }
}

test('FO-4 Tier 1 (Generated): /api/awareness builds deterministic pack with SHA256 digest', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    const res = await fetch(`${fx.baseUrl}/api/awareness`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspaceId: fx.workspaceId,
        taskId: 'task-audit-01',
        intendedPaths: ['src/service.ts'],
        mode: 'read',
      }),
    })
    assert.strictEqual(res.status, 200)
    const body = await res.json() as { ok: boolean; pack: TaskAwarenessPack }
    assert.strictEqual(body.ok, true)
    const pack = body.pack

    assert.strictEqual(pack.schema, 1)
    assert.strictEqual(pack.workspaceId, fx.workspaceId)
    assert.strictEqual(pack.taskId, 'task-audit-01')
    assert.ok(typeof pack.packDigest === 'string' && pack.packDigest.length === 16, 'packDigest must be 16-char sha256 slice')
    assert.strictEqual(pack.verdict.admissible, true)
    assert.strictEqual(pack.forbiddenPaths.length, 0)
    assert.ok(pack.relevantSymbols.some(s => s.name === 'service'), 'pack should identify relevant symbol')

    // Determinism test: identical call produces identical digest
    const res2 = await fetch(`${fx.baseUrl}/api/awareness`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspaceId: fx.workspaceId,
        taskId: 'task-audit-01',
        intendedPaths: ['src/service.ts'],
        mode: 'read',
      }),
    })
    const body2 = await res2.json() as { ok: boolean; pack: TaskAwarenessPack }
    assert.strictEqual(body2.pack.packDigest, pack.packDigest, 'identical inputs must produce identical packDigest')
  } finally {
    await fx.cleanup()
  }
})

test('FO-4 Tier 2 (Delivered/Accepted): Agent attach delivers awareness and ingests trace event', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    // Attach agent with intended task and paths
    const attachRes = await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-contractor-01',
        taskId: 'task-contractor-01',
        intendedPaths: ['src/helper.ts'],
        mode: 'write',
      }),
    })
    assert.strictEqual(attachRes.status, 200)
    const attachData = await attachRes.json() as {
      ok: boolean
      briefing: unknown
      awareness?: TaskAwarenessPack
    }
    assert.strictEqual(attachData.ok, true)
    assert.ok(attachData.awareness, 'attach response must include awareness pack when intendedPaths provided')
    assert.strictEqual(attachData.awareness.taskId, 'task-contractor-01')
    assert.strictEqual(attachData.awareness.verdict.admissible, true)

    // Verify awareness generation is called on /api/awareness and traces event
    await fetch(`${fx.baseUrl}/api/awareness`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspaceId: fx.workspaceId,
        taskId: 'task-contractor-01',
        agentId: 'agent-contractor-01',
        intendedPaths: ['src/helper.ts'],
        mode: 'write',
      }),
    })

    const packEvents = fx.db.prepare(
      "SELECT type, task_id, agent_id FROM trace_events WHERE workspace_id = ? AND type = 'context.pack.created'"
    ).all(fx.workspaceId) as Array<{ type: string; task_id: string; agent_id: string }>
    assert.ok(packEvents.length >= 1, 'context.pack.created trace event must be ingested')
    assert.strictEqual(packEvents[0].task_id, 'task-contractor-01')
  } finally {
    await fx.cleanup()
  }
})

test('FO-4 Tier 3 (Behaviourally Effective): Conflicting file claim blocks write with 409; release allows write', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    // 1. Register two agents
    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-lead', name: 'Lead Agent' }),
    })
    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-junior', name: 'Junior Agent' }),
    })

    // 2. Simulate Task A (agent-lead) claiming exclusive write lock on 'src/service.ts'
    const now = new Date().toISOString()
    ingestTraceEvents(fx.db, [{
      schema: 1,
      eventId: 'evt-claim-lead-service',
      source: 'work',
      runtimeInstanceId: 'rt-test-1',
      workspaceId: fx.workspaceId,
      taskId: 'task-lead-refactor',
      agentId: 'agent-lead',
      type: 'file.claimed',
      occurredAt: now,
      observedAt: now,
      fileRefs: ['src/service.ts'],
      payload: { mode: 'write' },
      provenance: { mode: 'live', authorityRef: 'operator:lease', confidence: 'authoritative' },
    }])

    // 3. Junior agent attempts to write to 'src/service.ts' under different task 'task-junior-patch'
    const conflictWriteRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-junior',
        taskId: 'task-junior-patch',
        path: 'src/service.ts',
        content: 'export const service = { status: "corrupted" }\n',
      }),
    })
    assert.strictEqual(conflictWriteRes.status, 409, 'write on actively claimed file must return 409 Conflict')
    const conflictData = await conflictWriteRes.json() as {
      ok: boolean
      error: string
      hardConflicts: Array<{ path: string; holder: { taskId: string } }>
    }
    assert.strictEqual(conflictData.ok, false)
    assert.match(conflictData.error, /hard conflict/i)
    assert.strictEqual(conflictData.hardConflicts[0].holder.taskId, 'task-lead-refactor')

    // Check that disk file was NOT modified
    const originalContent = (await (await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-lead', path: 'src/service.ts' }),
    })).json() as { content: string }).content
    assert.match(originalContent, /"active"/, 'blocked write must not touch file content on disk')

    // 4. Junior agent writes to UNCLAIMED file 'src/helper.ts' -> succeeds 200
    const nonConflictWriteRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-junior',
        taskId: 'task-junior-patch',
        path: 'src/helper.ts',
        content: 'export const helper = { ready: true, patched: true }\n',
      }),
    })
    assert.strictEqual(nonConflictWriteRes.status, 200, 'write to unclaimed path must succeed')

    // 5. Lead agent finishes task (releases claims via worker.completed event)
    const releaseTime = new Date().toISOString()
    ingestTraceEvents(fx.db, [{
      schema: 1,
      eventId: 'evt-complete-lead-task',
      source: 'operator',
      runtimeInstanceId: 'rt-test-1',
      workspaceId: fx.workspaceId,
      taskId: 'task-lead-refactor',
      agentId: 'agent-lead',
      type: 'worker.completed',
      occurredAt: releaseTime,
      observedAt: releaseTime,
      provenance: { mode: 'live', authorityRef: 'operator:lifecycle', confidence: 'authoritative' },
    }])

    // 6. Junior agent re-attempts write to 'src/service.ts' -> now succeeds 200!
    const unblockedWriteRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-junior',
        taskId: 'task-junior-patch',
        path: 'src/service.ts',
        content: 'export const service = { status: "updated-cleanly" }\n',
      }),
    })
    assert.strictEqual(unblockedWriteRes.status, 200, 'write after claim release must succeed')
    const updatedContent = (await (await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-junior', path: 'src/service.ts' }),
    })).json() as { content: string }).content
    assert.match(updatedContent, /"updated-cleanly"/, 'unblocked write must update disk content')
  } finally {
    await fx.cleanup()
  }
})

test('FO-4 shared mutation boundary: direct library/CLI writes obey the same claim gate', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-direct-lead' }),
    })
    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-direct-junior' }),
    })

    const now = new Date().toISOString()
    ingestTraceEvents(fx.db, [{
      schema: 1,
      eventId: 'evt-claim-direct-service',
      source: 'work',
      runtimeInstanceId: 'rt-direct-gate',
      workspaceId: fx.workspaceId,
      taskId: 'task-direct-lead',
      agentId: 'agent-direct-lead',
      type: 'file.claimed',
      occurredAt: now,
      observedAt: now,
      fileRefs: ['src/service.ts'],
      payload: { mode: 'write' },
      provenance: { mode: 'live', authorityRef: 'operator:direct-gate', confidence: 'authoritative' },
    }])

    assert.throws(
      () => access.writeFile(
        fx.db, fx.workspaceId, 'agent-direct-junior', 'src/service.ts',
        'export const service = { status: "bypassed" }\n',
      ),
      (error: unknown) => error instanceof access.WriteConflictError
        && error.verdict.hardConflicts[0]?.holder.taskId === 'task-direct-lead',
      'the shared write layer must reject a direct write before touching disk',
    )
    assert.match(
      (await (await fetch(`${fx.baseUrl}/api/agent/read`, {
        method: 'POST', headers: authHeaders,
        body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-direct-lead', path: 'src/service.ts' }),
      })).json() as { content: string }).content,
      /"active"/,
      'the rejected direct write must leave the file unchanged',
    )

    const releaseTime = new Date().toISOString()
    ingestTraceEvents(fx.db, [{
      schema: 1,
      eventId: 'evt-release-direct-service',
      source: 'operator',
      runtimeInstanceId: 'rt-direct-gate',
      workspaceId: fx.workspaceId,
      taskId: 'task-direct-lead',
      agentId: 'agent-direct-lead',
      type: 'worker.completed',
      occurredAt: releaseTime,
      observedAt: releaseTime,
      provenance: { mode: 'live', authorityRef: 'operator:direct-release', confidence: 'authoritative' },
    }])

    const result = access.writeFile(
      fx.db, fx.workspaceId, 'agent-direct-junior', 'src/service.ts',
      'export const service = { status: "direct-ok" }\n',
    )
    assert.equal(result.path, 'src/service.ts')
    assert.match(
      (await (await fetch(`${fx.baseUrl}/api/agent/read`, {
        method: 'POST', headers: authHeaders,
        body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-direct-junior', path: 'src/service.ts' }),
      })).json() as { content: string }).content,
      /"direct-ok"/,
      'the same direct path must work after authoritative release',
    )
  } finally {
    await fx.cleanup()
  }
})

test('CP01-014 & CP01-018: Context pack build, staleness detection, and durable pre-compression snapshot', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    // Register agent
    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-pack', name: 'Pack Agent' }),
    })

    // 1. Build context pack via API
    const packRes = await fetch(`${fx.baseUrl}/api/context/pack`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspaceId: fx.workspaceId,
        goal: 'audit service status',
        agentId: 'agent-pack',
        missionId: 'mis-101',
      }),
    })
    assert.strictEqual(packRes.status, 200)
    const packData = await packRes.json() as { ok: boolean; id: string; version: number; sources: number; body: string }
    assert.strictEqual(packData.ok, true)
    assert.ok(packData.id.startsWith('pack-'))

    // 2. Query staleness -> clean (not stale)
    const staleRes1 = await fetch(`${fx.baseUrl}/api/context/pack/${packData.id}/staleness`)
    assert.strictEqual(staleRes1.status, 200)
    const staleData1 = await staleRes1.json() as { ok: boolean; stale: boolean }
    assert.strictEqual(staleData1.ok, true)
    assert.strictEqual(staleData1.stale, false)

    // 3. Mutate file -> pack becomes stale
    await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-pack',
        path: 'src/service.ts',
        content: 'export const service = { status: "mutated" }\n',
      }),
    })

    const staleRes2 = await fetch(`${fx.baseUrl}/api/context/pack/${packData.id}/staleness`)
    const staleData2 = await staleRes2.json() as { ok: boolean; stale: boolean; changed: string[] }
    assert.strictEqual(staleData2.stale, true)
    assert.ok(staleData2.changed.includes('src/service.ts'))

    // 4. CP01-018: Pre-compression checkpoint / snapshot survives and records full state
    const snapshot = writeSnapshot(fx.db, fx.workspaceId, 'turn-42', 'pre_compression', {
      mission: 'mis-101',
      goal: 'audit service status',
      done: ['read service.ts', 'identified status variable'],
      open: ['update helper.ts'],
      filesChanged: ['src/service.ts'],
      nextAction: 'verify changes',
    }, { agentId: 'agent-pack', missionId: 'mis-101' })

    assert.ok(snapshot.id.startsWith('snap-'))
    assert.ok(snapshot.path.endsWith('.md'))

    const snapRow = fx.db.prepare('SELECT id, reason, entries FROM snapshots WHERE id = ?').get(snapshot.id) as {
      id: string; reason: string; entries: number
    }
    assert.strictEqual(snapRow.reason, 'pre_compression')
  } finally {
    await fx.cleanup()
  }
})
