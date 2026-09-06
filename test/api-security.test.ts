/**
 * FO-3 Security Tests: Protected Brain Mutations
 *
 * Requirements:
 * 1. Unauthenticated mutating requests reject with 401 Unauthorized across all routes.
 * 2. Unauthenticated requests never mint an agent identity row or activity log row.
 * 3. Identity creation and authorization are strictly separate: calling read/write/search
 *    with an invented/unregistered agentId returns 403 Forbidden without creating an agent.
 * 4. Mission gates reject invented reviewers/verifiers and strictly reject string-false values.
 * 5. Authenticated requests with valid tokens succeed.
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
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-sec-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  
  // Initialize git repo for mission routes
  execFileSync('git', ['init', '-b', 'main', root], { stdio: 'ignore', windowsHide: true })
  execFileSync('git', ['-C', root, 'config', 'user.name', 'test'], { stdio: 'ignore', windowsHide: true })
  execFileSync('git', ['-C', root, 'config', 'user.email', 'test@example.com'], { stdio: 'ignore', windowsHide: true })
  writeFileSync(join(root, 'README.md'), '# test repo\n')
  execFileSync('git', ['-C', root, 'add', 'README.md'], { stdio: 'ignore', windowsHide: true })
  execFileSync('git', ['-C', root, 'commit', '-m', 'initial commit'], { stdio: 'ignore', windowsHide: true })

  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = 'ws-sec-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Security Test Workspace', root, new Date().toISOString())

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

test('FO-3: Unauthenticated mutating routes reject with 401 and produce zero DB state', async () => {
  const fx = await createFixture()
  try {
    const routes: Array<{ path: string; body: Record<string, unknown> }> = [
      { path: '/api/agent/attach', body: { workspace: fx.workspaceId, agentId: 'intruder' } },
      { path: '/api/agent/read', body: { workspace: fx.workspaceId, agentId: 'intruder', path: 'README.md' } },
      { path: '/api/agent/write', body: { workspace: fx.workspaceId, agentId: 'intruder', path: 'bad.txt', content: 'hack' } },
      { path: '/api/agent/search', body: { workspace: fx.workspaceId, agentId: 'intruder', query: 'test' } },
      { path: '/api/awareness', body: { workspaceId: fx.workspaceId, taskId: 'task-1' } },
      { path: '/api/mission/start', body: { workspace: fx.workspaceId, agentId: 'intruder', title: 'hacked' } },
      { path: '/api/mission/submit', body: { missionId: 'm-fake' } },
      { path: '/api/mission/review', body: { missionId: 'm-fake', agentId: 'intruder', passed: true } },
      { path: '/api/mission/commit', body: { missionId: 'm-fake', message: 'fake' } },
      { path: '/api/mission/verify', body: { missionId: 'm-fake', agentId: 'intruder', passed: true } },
      { path: '/api/mission/merge', body: { missionId: 'm-fake' } },
      { path: '/api/mission/close', body: { missionId: 'm-fake' } },
      { path: '/api/reindex', body: { workspace: fx.workspaceId } },
    ]

    for (const r of routes) {
      const res = await fetch(`${fx.baseUrl}${r.path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(r.body),
      })
      assert.strictEqual(res.status, 401, `route ${r.path} without auth must return 401, got ${res.status}`)
      const data = await res.json() as { ok: boolean; error: string }
      assert.strictEqual(data.ok, false)
      assert.match(data.error, /unauthorized/i)
    }

    // Invariant: Unauthenticated requests mint NO agent rows and NO activity rows
    const agentCount = (fx.db.prepare('SELECT COUNT(*) c FROM agents').get() as { c: number }).c
    const activityCount = (fx.db.prepare('SELECT COUNT(*) c FROM activity').get() as { c: number }).c
    assert.strictEqual(agentCount, 0, 'unauthenticated requests must never mint an agent identity row')
    assert.strictEqual(activityCount, 0, 'unauthenticated requests must never record an activity row')
  } finally {
    await fx.cleanup()
  }
})

test('FO-3: Invented agentId is rejected with 403 on read/write/search and does not mint identity', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    // Attempt to read with invented agentId
    const readRes = await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'ghost-agent', path: 'README.md' }),
    })
    assert.strictEqual(readRes.status, 403, 'reading with invented agentId must return 403')
    const readData = await readRes.json() as { ok: boolean; error: string }
    assert.strictEqual(readData.ok, false)
    assert.match(readData.error, /unknown or unauthorized agent/)

    // Database check: agent was NOT minted by read attempt
    let count = (fx.db.prepare('SELECT COUNT(*) c FROM agents WHERE id = ?').get('ghost-agent') as { c: number }).c
    assert.strictEqual(count, 0, 'read attempt must not mint agent row')

    // Attempt to write with invented agentId
    const writeRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'ghost-agent', path: 'evil.txt', content: 'test' }),
    })
    assert.strictEqual(writeRes.status, 403, 'writing with invented agentId must return 403')

    count = (fx.db.prepare('SELECT COUNT(*) c FROM agents WHERE id = ?').get('ghost-agent') as { c: number }).c
    assert.strictEqual(count, 0, 'write attempt must not mint agent row')

    // Attempt to search with invented agentId
    const searchRes = await fetch(`${fx.baseUrl}/api/agent/search`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'ghost-agent', query: 'test' }),
    })
    assert.strictEqual(searchRes.status, 403, 'searching with invented agentId must return 403')

    count = (fx.db.prepare('SELECT COUNT(*) c FROM agents WHERE id = ?').get('ghost-agent') as { c: number }).c
    assert.strictEqual(count, 0, 'search attempt must not mint agent row')
  } finally {
    await fx.cleanup()
  }
})

test('FO-3: Mission gates reject invented reviewer/verifier and reject string-false', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    // 1. Explicitly register agent 'agent-worker' via attach
    const attachRes = await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-worker', name: 'Worker Alpha' }),
    })
    assert.strictEqual(attachRes.status, 200)

    // 2. Start mission with invented agent -> rejected 403
    const badStart = await fetch(`${fx.baseUrl}/api/mission/start`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'ghost-creator', title: 'Ghost Mission' }),
    })
    assert.strictEqual(badStart.status, 403)

    // 3. Start mission with legitimate registered agent -> succeeds 200
    const startRes = await fetch(`${fx.baseUrl}/api/mission/start`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-worker', title: 'Valid Mission' }),
    })
    assert.strictEqual(startRes.status, 200)
    const missionData = await startRes.json() as { ok: boolean; mission: { id: string; state: string } }
    const missionId = missionData.mission.id
    assert.strictEqual(missionData.mission.state, 'running')

    // Submit for review
    const submitRes = await fetch(`${fx.baseUrl}/api/mission/submit`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ missionId }),
    })
    assert.strictEqual(submitRes.status, 200)

    // 4. Review with invented reviewer -> rejected 403
    const fakeReview = await fetch(`${fx.baseUrl}/api/mission/review`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ missionId, agentId: 'ghost-reviewer', passed: true }),
    })
    assert.strictEqual(fakeReview.status, 403, 'review with invented reviewer must return 403')

    // 5. Review with same agent (self-approval) -> rejected 409
    const selfReview = await fetch(`${fx.baseUrl}/api/mission/review`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ missionId, agentId: 'agent-worker', passed: true }),
    })
    assert.strictEqual(selfReview.status, 409, 'self-approval must return 409')

    // Register legitimate independent reviewer
    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-reviewer', name: 'Reviewer Beta' }),
    })

    // 6. Review with string "false" -> must be rejected with 400 (strict boolean required)
    const stringFalseReview = await fetch(`${fx.baseUrl}/api/mission/review`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ missionId, agentId: 'agent-reviewer', passed: 'false' }),
    })
    assert.strictEqual(stringFalseReview.status, 400, 'string-false must be rejected with 400')
    const sfData = await stringFalseReview.json() as { ok: boolean; error: string }
    assert.match(sfData.error, /string-false/i)

    // 7. Legitimate review with boolean false -> succeeds (transitions to repair)
    const legitFailReview = await fetch(`${fx.baseUrl}/api/mission/review`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ missionId, agentId: 'agent-reviewer', passed: false, notes: 'needs fixes' }),
    })
    assert.strictEqual(legitFailReview.status, 200)
    const failData = await legitFailReview.json() as { ok: boolean; mission: { state: string } }
    assert.strictEqual(failData.mission.state, 'repair')
  } finally {
    await fx.cleanup()
  }
})

test('FO-3: Authenticated authorized agent lifecycle: attach -> write -> read -> search succeeds', async () => {
  const fx = await createFixture()
  try {
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fx.authKey}`,
    }

    // Attach agent
    const attachRes = await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-alpha', name: 'Alpha Worker' }),
    })
    assert.strictEqual(attachRes.status, 200)
    const attachData = await attachRes.json() as { ok: boolean; briefing: { live: unknown[] } }
    assert.strictEqual(attachData.ok, true)

    // Write file through brain
    const writeRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-alpha',
        path: 'src/calculator.ts',
        content: 'export function add(a: number, b: number): number { return a + b }\n',
      }),
    })
    assert.strictEqual(writeRes.status, 200)
    const writeData = await writeRes.json() as { ok: boolean; path: string; created: boolean }
    assert.strictEqual(writeData.created, true)
    assert.strictEqual(writeData.path, 'src/calculator.ts')

    // Read back file
    const readRes = await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-alpha', path: 'src/calculator.ts' }),
    })
    assert.strictEqual(readRes.status, 200)
    const readData = await readRes.json() as { ok: boolean; content: string }
    assert.match(readData.content, /function add/)

    // Re-index to populate search
    const reindexRes = await fetch(`${fx.baseUrl}/api/reindex`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId }),
    })
    assert.strictEqual(reindexRes.status, 200)

    // Search for symbol
    const searchRes = await fetch(`${fx.baseUrl}/api/agent/search`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-alpha', query: 'add' }),
    })
    assert.strictEqual(searchRes.status, 200)
    const searchData = await searchRes.json() as { ok: boolean; hits: Array<{ name: string; path: string }> }
    assert.ok(searchData.hits.some(h => h.name === 'add' || h.path.includes('calculator.ts')))
  } finally {
    await fx.cleanup()
  }
})
