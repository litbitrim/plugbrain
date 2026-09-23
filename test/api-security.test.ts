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
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync, symlinkSync, readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { DatabaseSync } from 'node:sqlite'
import * as access from '../src/access.ts'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { indexPlanetWorkspace } from '../src/planet.ts'

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

    // Re-index to populate search.
    //
    // This fixture is served WITHOUT a store path, where a request may no
    // longer index in line: doing so blocks every route for the length of the
    // run, which is exactly the hang the busy contract exists to end. The
    // refusal is typed (501) and the index is then run through the same entry
    // point the worker uses, so the search below still has a real generation.
    const reindexRes = await fetch(`${fx.baseUrl}/api/reindex`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ workspace: fx.workspaceId }),
    })
    assert.strictEqual(reindexRes.status, 501)
    const inLineIndex = indexPlanetWorkspace(fx.db, fx.workspaceId)
    assert.ok(inLineIndex.files > 0, 'the fixture must hold an indexed generation')

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

test('FO-3 / B06: Symlink, junction and traversal escape outside workspace is strictly rejected', async () => {
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
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agent-escape-probe' }),
    })

    // 1. Direct lexical traversal outside workspace
    const lexicalRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        workspace: fx.workspaceId,
        agentId: 'agent-escape-probe',
        path: '../escaped-canary.txt',
        content: 'ESCAPED_CANARY',
      }),
    })
    assert.strictEqual(lexicalRes.status, 403)
    const lexicalData = await lexicalRes.json() as { ok: boolean; error: string }
    assert.strictEqual(lexicalData.ok, false)
    assert.match(lexicalData.error, /escapes|outside/i)

    // 2. Symlink / Junction traversal outside workspace
    const outsideDir = join(fx.dir, 'outside-target')
    mkdirSync(outsideDir, { recursive: true })
    let symlinkCreated = false
    try {
      symlinkSync(outsideDir, join(fx.root, 'escape-link'), 'dir')
      symlinkCreated = true
    } catch {
      // Non-elevated Windows environment may disallow creating new symlinks;
      // realpath check remains active for existing junctions/links
    }

    if (symlinkCreated) {
      const symlinkRes = await fetch(`${fx.baseUrl}/api/agent/write`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          workspace: fx.workspaceId,
          agentId: 'agent-escape-probe',
          path: 'escape-link/canary.txt',
          content: 'ESCAPED_CANARY',
        }),
      })
      assert.strictEqual(symlinkRes.status, 403)
      const symlinkData = await symlinkRes.json() as { ok: boolean; error: string }
      assert.strictEqual(symlinkData.ok, false)
      assert.match(symlinkData.error, /escapes.*symlink|junction/i)
    }
  } finally {
    await fx.cleanup()
  }
})

test('REV2-D01: Unconfigured server strictly rejects mutating routes (attach/write) with 401 and creates zero state', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-d01-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  writeFileSync(join(root, 'readme.md'), '# D01 Test\n')
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-d01', 'D01 Test', root, new Date().toISOString())

  // Server without authKey or requireAuth
  const handle = await serve({ db, uiRoot: null }, 0)
  try {
    const url = `http://127.0.0.1:${handle.port}`
    // 1. Attempt to attach agent
    const attachRes = await fetch(`${url}/api/agent/attach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspace: 'ws-d01', agentId: 'unauth-probe' }),
    })
    assert.strictEqual(attachRes.status, 401, 'unconfigured attach must return 401')

    // 2. Attempt to write file
    const writeRes = await fetch(`${url}/api/agent/write`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspace: 'ws-d01', agentId: 'unauth-probe', path: 'unauth.txt', content: 'MALICIOUS' }),
    })
    assert.strictEqual(writeRes.status, 401, 'unconfigured write must return 401')

    // 3. Database state invariant: 0 agents minted, file does not exist
    const agentCount = (db.prepare('SELECT count(*) c FROM agents').get() as { c: number }).c
    assert.strictEqual(agentCount, 0, 'no agent rows may be minted')
    assert.strictEqual(existsSync(join(root, 'unauth.txt')), false, 'file must not be written')
  } finally {
    await handle.close()
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('REV2-D02: Configured authKey is never stored verbatim in trace_events runtime_instance_id', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-d02-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  writeFileSync(join(root, 'doc.md'), '# Doc\n')
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-d02', 'D02 Test', root, new Date().toISOString())

  const secretCanary = 'secret-canary-key-99999-alpha'
  const handle = await serve({ db, uiRoot: null, authKey: secretCanary, requireAuth: true }, 0)
  try {
    const url = `http://127.0.0.1:${handle.port}`
    const res = await fetch(`${url}/api/awareness`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretCanary}`,
      },
      body: JSON.stringify({ workspaceId: 'ws-d02', taskId: 'task-d02', intendedPaths: ['doc.md'], mode: 'read' }),
    })
    assert.strictEqual(res.status, 200)

    // Check trace_events table
    const rows = db.prepare('SELECT type, runtime_instance_id FROM trace_events').all() as { type: string; runtime_instance_id: string }[]
    assert.ok(rows.length > 0, 'trace event was logged')
    for (const row of rows) {
      assert.notStrictEqual(row.runtime_instance_id, secretCanary, 'secret canary key must never appear in runtime_instance_id')
    }
  } finally {
    await handle.close()
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('REV2-D03: Dangling symlinks pointing outside workspace are strictly blocked from writing', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-d03-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  const outside = join(dir, 'outside')
  mkdirSync(outside, { recursive: true })

  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-d03', 'D03 Test', root, new Date().toISOString())
  access.registerAgent(db, 'agent-d03')

  const targetFile = join(outside, 'escaped-target.txt')
  const linkPath = join(root, 'dangling-link.txt')

  let symlinkCreated = false
  try {
    symlinkSync(targetFile, linkPath)
    symlinkCreated = true
  } catch {
    // Non-elevated Windows may disallow creating symlinks without Developer Mode
  }

  try {
    if (symlinkCreated) {
      assert.throws(
        () => access.writeFile(db, 'ws-d03', 'agent-d03', 'dangling-link.txt', 'ESCAPED_DATA', 'task-d03'),
        (err: unknown) => err instanceof access.AccessDenied
      )
      assert.strictEqual(existsSync(targetFile), false, 'outside target file must not be created by write')
    }
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('REV3-D01: Public instance ID header never satisfies authentication on mutating routes', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-r3d01-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  writeFileSync(join(root, 'doc.md'), '# Doc\n')
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-r3d01', 'R3D01 Test', root, new Date().toISOString())

  process.env.PLUG_INSTANCE_ID = 'public-instance-' + randomUUID()
  delete process.env.PLUG_BRAIN_AUTH_KEY

  const handle = await serve({ db, uiRoot: null }, 0)
  const url = `http://127.0.0.1:${handle.port}`

  try {
    const headers = { 'Content-Type': 'application/json', 'x-plug-instance': process.env.PLUG_INSTANCE_ID! }
    const attachRes = await fetch(`${url}/api/agent/attach`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ workspace: 'ws-r3d01', agentId: 'agent-unauth' }),
    })
    assert.strictEqual(attachRes.status, 401, 'attach must be rejected with 401 when only x-plug-instance is supplied')

    const writeRes = await fetch(`${url}/api/agent/write`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ workspace: 'ws-r3d01', agentId: 'agent-unauth', path: 'bad.txt', content: 'MALICIOUS' }),
    })
    assert.strictEqual(writeRes.status, 401, 'write must be rejected with 401 when only x-plug-instance is supplied')
    assert.strictEqual(existsSync(join(root, 'bad.txt')), false, 'file must not be written')
  } finally {
    await handle.close()
    db.close()
    delete process.env.PLUG_INSTANCE_ID
    rmSync(dir, { recursive: true, force: true })
  }
})

test('REV3-D02: Server restart produces distinct runtime_instance_id across lifetimes', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-r3d02-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  writeFileSync(join(root, 'doc.md'), '# Doc\n')
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-r3d02', 'R3D02 Test', root, new Date().toISOString())

  const secretKey = 'secret-' + randomUUID()
  const payload = { workspaceId: 'ws-r3d02', taskId: 'task-1', intendedPaths: ['doc.md'], mode: 'read' }
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${secretKey}` }

  // Lifetime 1
  const h1 = await serve({ db, uiRoot: null, authKey: secretKey, requireAuth: true }, 0)
  try {
    const res1 = await fetch(`http://127.0.0.1:${h1.port}/api/awareness`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    assert.strictEqual(res1.status, 200)
    const inst1 = (db.prepare('SELECT runtime_instance_id FROM trace_events ORDER BY rowid DESC LIMIT 1').get() as any).runtime_instance_id
    assert.ok(inst1 && inst1.startsWith('inst-'), 'instance 1 must be formatted inst-*')
    assert.notStrictEqual(inst1, secretKey, 'instance 1 must not contain secret')

    await h1.close()

    // Lifetime 2 with same secretKey
    const h2 = await serve({ db, uiRoot: null, authKey: secretKey, requireAuth: true }, 0)
    try {
      const res2 = await fetch(`http://127.0.0.1:${h2.port}/api/awareness`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...payload, taskId: 'task-2' }),
      })
      assert.strictEqual(res2.status, 200)
      const inst2 = (db.prepare('SELECT runtime_instance_id FROM trace_events ORDER BY rowid DESC LIMIT 1').get() as any).runtime_instance_id
      assert.ok(inst2 && inst2.startsWith('inst-'), 'instance 2 must be formatted inst-*')
      assert.notStrictEqual(inst2, secretKey, 'instance 2 must not contain secret')
      assert.notStrictEqual(inst1, inst2, 'server restart must produce a distinct runtime_instance_id')
    } finally {
      await h2.close()
    }
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('REV3-D03: Chained dangling symlinks escaping workspace boundary are blocked', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-r3d03-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  const outside = join(dir, 'outside')
  mkdirSync(outside, { recursive: true })
  const target = join(outside, 'new-chained.txt')

  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-r3d03', 'R3D03 Test', root, new Date().toISOString())
  access.registerAgent(db, 'agent-r3d03')

  let linksCreated = false
  try {
    symlinkSync(target, join(root, 'second-link'))
    symlinkSync('second-link', join(root, 'first-link'))
    linksCreated = true
  } catch {
    // Skip assertion if platform permissions forbid symlink creation
  }

  try {
    if (linksCreated) {
      assert.throws(
        () => access.writeFile(db, 'ws-r3d03', 'agent-r3d03', 'first-link', 'CHAINED-PAYLOAD', 'task-r3d03'),
        (err: unknown) => err instanceof access.AccessDenied
      )
      assert.strictEqual(existsSync(target), false, 'chained target file must not be written')
    }

    // Ensure normal non-escaping file still writes cleanly
    access.writeFile(db, 'ws-r3d03', 'agent-r3d03', 'valid/sub/new.txt', 'LEGITIMATE', 'task-r3d03')
    assert.strictEqual(readFileSync(join(root, 'valid/sub/new.txt'), 'utf8'), 'LEGITIMATE')
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})

