/**
 * M4 Coordination and Swarm Tests.
 *
 * Requirements (FB-BRAIN-01 M4 Abnahme):
 * 1. Integrationstest mit zwei echten Agenten-Prozessen gegen den laufenden Server:
 *    - A beansprucht src/x.ts.
 *    - B will schreiben und bekommt 409 mit Halterinfo.
 *    - B schickt A eine Nachricht.
 *    - A liest sie im selben laufenden Loop, ohne zu beenden, und gibt den Claim frei.
 *    - B schreibt erfolgreich.
 *    - Die Queue zeigt „delivered“, und die Chronik enthält alle Schritte.
 * 2. MCP-Toolaufrufe getestet (alle 13 Tools, Auth, Schema).
 * 3. Ein toter Agent (Heartbeat abgelaufen) blockiert nicht dauerhaft.
 * 4. Ein abgelaufener Lease kann keinen Schreibzugriff mehr ausführen (Fencing).
 * 5. Awareness meldet Überschneidungen über Abhängigkeiten.
 * 6. Live-Ereignisse (SSE) fuer Registry, Claims und Nachrichten.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { spawn } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { PassThrough } from 'node:stream'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { registerAgent } from '../src/access.ts'
import * as coord from '../src/coord/index.ts'
import { McpServer, MCP_TOOLS } from '../src/mcp/server.ts'
import { createAwarenessPort } from '../src/projections/awareness.ts'

interface TestContext {
  dir: string
  root: string
  dbPath: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  serverHandle: ServerHandle
  baseUrl: string
  authKey: string
  cleanup: () => Promise<void>
}

async function createCoordFixture(): Promise<TestContext> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-coord-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  mkdirSync(join(root, 'src'), { recursive: true })

  writeFileSync(join(root, 'src', 'x.ts'), 'export const x = 1\n')

  const dbPath = join(dir, 'brain.db')
  const db = openStore(dbPath)
  const workspaceId = 'ws-coord-test'

  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Coordination Test WS', root, new Date().toISOString())

  const authKey = 'secret-coord-token'
  const serverHandle = await serve({ db, uiRoot: null, authKey }, 0)
  const baseUrl = `http://127.0.0.1:${serverHandle.port}`

  return {
    dir,
    root,
    dbPath,
    db,
    workspaceId,
    serverHandle,
    baseUrl,
    authKey,
    cleanup: async () => {
      await serverHandle.close()
      db.close()
      rmSync(dir, { recursive: true, force: true })
    },
  }
}

test('M4: two real agent processes interact, conflict 409, message handoff, and queue delivery', async () => {
  const f = await createCoordFixture()
  try {
    const fixtureDir = join(import.meta.dirname, 'fixtures')
    const agentAPath = join(fixtureDir, 'agent-a.ts')
    const agentBPath = join(fixtureDir, 'agent-b.ts')

    // 1. Spawn Agent A process
    const procA = spawn(process.execPath, [
      '--experimental-strip-types',
      agentAPath,
      '--url', f.baseUrl,
      '--workspace', f.workspaceId,
      '--auth', f.authKey,
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    })

    const stdoutA: string[] = []
    const stderrA: string[] = []
    procA.stdout.on('data', (d) => stdoutA.push(d.toString()))
    procA.stderr.on('data', (d) => stderrA.push(d.toString()))

    // Wait until Agent A claims src/x.ts and begins waiting for message
    const waitForA = async () => {
      for (let i = 0; i < 50; i++) {
        const out = stdoutA.join('')
        if (out.includes('AGENT_A_WAITING_FOR_MESSAGE')) return
        await new Promise((r) => setTimeout(r, 100))
      }
      throw new Error(`Agent A did not reach waiting state: out=${stdoutA.join('')} err=${stderrA.join('')}`)
    }
    await waitForA()

    // 2. Spawn Agent B process
    const procB = spawn(process.execPath, [
      '--experimental-strip-types',
      agentBPath,
      '--url', f.baseUrl,
      '--workspace', f.workspaceId,
      '--auth', f.authKey,
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    })

    const stdoutB: string[] = []
    const stderrB: string[] = []
    procB.stdout.on('data', (d) => stdoutB.push(d.toString()))
    procB.stderr.on('data', (d) => stderrB.push(d.toString()))

    // Wait for both processes to complete
    const [codeA, codeB] = await Promise.all([
      new Promise<number | null>((resolve) => procA.on('close', resolve)),
      new Promise<number | null>((resolve) => procB.on('close', resolve)),
    ])

    const fullOutA = stdoutA.join('')
    const fullOutB = stdoutB.join('')

    assert.equal(codeA, 0, `Agent A exited with code ${codeA}: ${stderrA.join('')}`)
    assert.equal(codeB, 0, `Agent B exited with code ${codeB}: ${stderrB.join('')}`)

    // Verify interaction sequence in outputs
    assert.ok(fullOutA.includes('AGENT_A_CLAIMED: src/x.ts'), 'Agent A claimed src/x.ts')
    assert.ok(fullOutA.includes('AGENT_A_MESSAGE_RECEIVED'), 'Agent A received message')
    assert.ok(fullOutA.includes('AGENT_A_RELEASED: src/x.ts'), 'Agent A released claim')

    assert.ok(fullOutB.includes('AGENT_B_CONFLICT_VERIFIED: holder agent-a'), 'Agent B verified 409 conflict naming holder agent-a')
    assert.ok(fullOutB.includes('AGENT_B_MESSAGE_SENT: to agent-a'), 'Agent B sent message to agent-a')
    assert.ok(fullOutB.includes('AGENT_B_WRITE_SUCCESS: src/x.ts'), 'Agent B successfully wrote src/x.ts after release')
    assert.ok(fullOutB.includes('AGENT_B_DELIVERED'), 'Agent B delivered the queue task')

    // Verify Queue status in DB
    const queueRow = f.db.prepare(
      `SELECT state, claimed_by, delivered_path FROM queue_tasks WHERE workspace_id = ?`,
    ).get(f.workspaceId) as { state: string; claimed_by: string; delivered_path: string }
    assert.equal(queueRow.state, 'delivered')
    assert.equal(queueRow.claimed_by, 'agent-b')
    assert.equal(queueRow.delivered_path, 'src/x.ts')

    // Verify Chronicle trace events contain all audit steps
    const traceEvents = f.db.prepare(
      `SELECT type, agent_id FROM trace_events WHERE workspace_id = ? ORDER BY id ASC`,
    ).all(f.workspaceId) as Array<{ type: string; agent_id: string }>
    const types = traceEvents.map((t) => t.type)
    assert.ok(types.includes('file.claimed'), 'Chronicle recorded file.claimed')
    assert.ok(types.includes('worker.completed'), 'Chronicle recorded worker.completed (release)')
  } finally {
    await f.cleanup()
  }
})

test('M4: dead agent (expired heartbeat) does not block claims or writes permanently', async () => {
  const f = await createCoordFixture()
  try {
    // Register agent dead-1 with short TTL (500ms)
    coord.registerSwarmAgent(f.db, {
      agentId: 'agent-dead-1',
      workspaceId: f.workspaceId,
      heartbeatTtlMs: 500,
    })

    // Acquire lease
    const claimRes = coord.acquireLease(f.db, f.workspaceId, {
      agentId: 'agent-dead-1',
      taskId: 'task-dead-1',
      paths: ['src/stuck.ts'],
      mode: 'write',
      ttlMs: 60000,
    })
    assert.equal(claimRes.acquired, true)

    // Register active agent
    coord.registerSwarmAgent(f.db, {
      agentId: 'agent-alive-2',
      workspaceId: f.workspaceId,
      heartbeatTtlMs: 60000,
    })

    // Immediate attempt to claim by alive agent should conflict
    const blockedRes = coord.acquireLease(f.db, f.workspaceId, {
      agentId: 'agent-alive-2',
      taskId: 'task-alive-2',
      paths: ['src/stuck.ts'],
      mode: 'write',
    })
    assert.equal(blockedRes.acquired, false)
    assert.equal(blockedRes.conflict?.holder.agentId, 'agent-dead-1')

    // Wait 600ms for agent-dead-1 heartbeat to expire
    await new Promise((r) => setTimeout(r, 600))

    // Verify presence is dead
    const presences = coord.getAgentPresence(f.db, { agentId: 'agent-dead-1' })
    assert.equal(presences[0].presence, 'dead')
    assert.equal(presences[0].isExpired, true)

    // Now alive agent tries to claim: dead agent does NOT block!
    const unblockedClaim = coord.acquireLease(f.db, f.workspaceId, {
      agentId: 'agent-alive-2',
      taskId: 'task-alive-2',
      paths: ['src/stuck.ts'],
      mode: 'write',
    })
    assert.equal(unblockedClaim.acquired, true, 'dead agent must not block new claim')

    // Write check also passes
    assert.doesNotThrow(() => {
      coord.checkWriteFencing(f.db, f.workspaceId, 'agent-alive-2', 'src/stuck.ts', {
        taskId: 'task-alive-2',
      })
    })
  } finally {
    await f.cleanup()
  }
})

test('M4: scoped presence excludes unbound agents and never treats last_seen as a heartbeat', async () => {
  const f = await createCoordFixture()
  try {
    // This gives the legacy rows below all M4 columns without giving either a
    // real heartbeat. `registerAgent` represents old identity metadata only.
    coord.registerSwarmAgent(f.db, { agentId: 'scoped-agent', workspaceId: f.workspaceId })
    registerAgent(f.db, 'legacy-unbound', 'Legacy Unbound')
    registerAgent(f.db, 'legacy-no-heartbeat', 'Legacy No Heartbeat')
    const recent = new Date().toISOString()
    f.db.prepare(`
      UPDATE agents
         SET workspace_id = NULL, task_id = 'historic-task', last_heartbeat = NULL, last_seen = ?
       WHERE id = 'legacy-unbound'
    `).run(recent)
    f.db.prepare(`
      UPDATE agents
         SET workspace_id = ?, task_id = 'historic-task', last_heartbeat = NULL, last_seen = ?
       WHERE id = 'legacy-no-heartbeat'
    `).run(f.workspaceId, recent)

    const scoped = coord.getAgentPresence(f.db, { workspaceId: f.workspaceId })
    assert.equal(scoped.some(agent => agent.id === 'legacy-unbound'), false,
      'an unbound legacy identity must not leak into every workspace roster')

    const legacy = scoped.find(agent => agent.id === 'legacy-no-heartbeat')
    assert.ok(legacy, 'the exact workspace row should remain inspectable')
    assert.equal(legacy?.lastHeartbeat, null)
    assert.equal(legacy?.presence, 'unproven',
      'recent last_seen must not be misrepresented as a heartbeat or live process')
    assert.equal(legacy?.isExpired, false, 'absence of a heartbeat is not proof that the agent died')
  } finally {
    await f.cleanup()
  }
})

test('M4: expired lease cannot write (fencing violation)', async () => {
  const f = await createCoordFixture()
  try {
    coord.registerSwarmAgent(f.db, {
      agentId: 'agent-fencing',
      workspaceId: f.workspaceId,
      heartbeatTtlMs: 60000,
    })

    // Acquire lease with 60ms TTL
    const leaseRes = coord.acquireLease(f.db, f.workspaceId, {
      agentId: 'agent-fencing',
      taskId: 'task-fence',
      paths: ['src/fenced.ts'],
      mode: 'write',
      ttlMs: 60,
    })
    assert.equal(leaseRes.acquired, true)
    const lease = leaseRes.lease!

    // Valid write before expiration
    assert.doesNotThrow(() => {
      coord.checkWriteFencing(f.db, f.workspaceId, 'agent-fencing', 'src/fenced.ts', {
        leaseId: lease.id,
        epoch: lease.epoch,
        taskId: 'task-fence',
      })
    })

    // Wait for lease to expire
    await new Promise((r) => setTimeout(r, 100))

    // Write after expiration must throw FencingError
    assert.throws(() => {
      coord.checkWriteFencing(f.db, f.workspaceId, 'agent-fencing', 'src/fenced.ts', {
        leaseId: lease.id,
        epoch: lease.epoch,
        taskId: 'task-fence',
      })
    }, (err: unknown) => {
      return err instanceof coord.FencingError && err.message.includes('expired')
    })
  } finally {
    await f.cleanup()
  }
})

test('M4: awareness pack reports dependency overlap when another task claims an interface', async () => {
  const f = await createCoordFixture()
  try {
    // Create two files: iface.ts and consumer.ts
    writeFileSync(join(f.root, 'src', 'iface.ts'), 'export interface Database { query(): void }\n')
    writeFileSync(join(f.root, 'src', 'consumer.ts'), 'import { Database } from "./iface.ts"\nexport function run(db: Database) { db.query() }\n')

    // Index files into db
    f.db.prepare(`
      INSERT INTO files (workspace_id, path, ext, size, mtime, loc)
      VALUES (?, 'src/iface.ts', '.ts', 50, ?, 1),
             (?, 'src/consumer.ts', '.ts', 80, ?, 2)
    `).run(f.workspaceId, new Date().toISOString(), f.workspaceId, new Date().toISOString())

    const ifaceFile = f.db.prepare(`SELECT id FROM files WHERE workspace_id = ? AND path = 'src/iface.ts'`).get(f.workspaceId) as { id: number }
    const consumerFile = f.db.prepare(`SELECT id FROM files WHERE workspace_id = ? AND path = 'src/consumer.ts'`).get(f.workspaceId) as { id: number }

    f.db.prepare(`
      INSERT INTO symbols (file_id, name, kind, line, exported)
      VALUES (?, 'Database', 'interface', 1, 1)
    `).run(ifaceFile.id)
    const symId = f.db.prepare(`SELECT id FROM symbols WHERE file_id = ?`).get(ifaceFile.id) as { id: number }

    // Edge: consumer.ts references iface.ts
    f.db.prepare(`
      INSERT INTO edges (workspace_id, kind, src_file, dst_file, dst_symbol, resolved, line)
      VALUES (?, 'references', ?, ?, ?, 1, 1)
    `).run(f.workspaceId, consumerFile.id, ifaceFile.id, symId.id)

    // Agent A claims src/iface.ts
    coord.registerSwarmAgent(f.db, { agentId: 'agent-dev-a', workspaceId: f.workspaceId })
    coord.acquireLease(f.db, f.workspaceId, {
      agentId: 'agent-dev-a',
      taskId: 'task-modify-interface',
      paths: ['src/iface.ts'],
      mode: 'write',
    })

    // Agent B checks awareness for intended path src/consumer.ts
    const port = createAwarenessPort(f.db)
    const pack = port({
      workspaceId: f.workspaceId,
      taskId: 'task-use-consumer',
      agentId: 'agent-dev-b',
      intendedPaths: ['src/consumer.ts'],
      mode: 'write',
    })

    // Verify dependency overlap warning is present
    const depWarning = pack.collisionWarnings.find((w) => w.includes('DEPENDENCY:') && w.includes('src/iface.ts'))
    assert.ok(depWarning, `Expected dependency warning in awareness pack: ${JSON.stringify(pack.collisionWarnings)}`)

    const related = pack.activeRelatedTasks.find((t) => t.taskId === 'task-modify-interface')
    assert.ok(related, 'task-modify-interface should be in activeRelatedTasks')
    assert.equal(related?.dependencyRelation, 'dependency-overlap')
  } finally {
    await f.cleanup()
  }
})

test('M4: MCP server lists all 26 tools and executes tool calls over JSON-RPC', async () => {
  const f = await createCoordFixture()
  try {
    const inStream = new PassThrough()
    const outStream = new PassThrough()

    const mcp = new McpServer({
      db: f.db,
      workspaceId: f.workspaceId,
      authKey: f.authKey,
      inStream,
      outStream,
    })
    mcp.start()

    const responses: Array<{ id: string | number; result?: any; error?: any }> = []
    let outBuf = ''
    outStream.on('data', (chunk) => {
      outBuf += chunk.toString()
      while (outBuf.includes('\n')) {
        const idx = outBuf.indexOf('\n')
        const line = outBuf.slice(0, idx).trim()
        outBuf = outBuf.slice(idx + 1)
        if (line) {
          try { responses.push(JSON.parse(line)) } catch {}
        }
      }
    })

    const sendRpc = async (req: { id: string | number; method: string; params?: any }) => {
      inStream.write(JSON.stringify({ jsonrpc: '2.0', ...req }) + '\n')
      for (let i = 0; i < 30; i++) {
        const hit = responses.find((r) => r.id === req.id)
        if (hit) return hit
        await new Promise((r) => setTimeout(r, 50))
      }
      throw new Error(`Timeout waiting for RPC response to ${req.method} (id=${req.id})`)
    }

    // 1. initialize
    const initRes = await sendRpc({ id: 1, method: 'initialize' })
    assert.equal(initRes.result.serverInfo.name, 'plugbrain')

    // 2. tools/list: coordination tools plus the Brain parity read tools and
    //    the hygiene/machine lanes (git guard and hardware awareness).
    const listRes = await sendRpc({ id: 2, method: 'tools/list' })
    const tools = listRes.result.tools as Array<{ name: string }>
    assert.equal(tools.length, 26, `Expected 26 tools, found ${tools.length}`)
    const toolNames = tools.map((t) => t.name)
    const expected = [
      'search', 'read', 'context_pack', 'query', 'context', 'impact',
      'detect_changes', 'claim', 'release', 'awareness', 'inbox_read',
      'message_send', 'heartbeat', 'cypher', 'rename_preview',
      'swarm_turn', 'swarm_board', 'swarm_resources',
      'plan', 'notes_search', 'notes_read', 'notes_query', 'notes_backlinks',
      'hygiene', 'machine', 'repos',
    ]
    for (const exp of expected) {
      assert.ok(toolNames.includes(exp), `Missing MCP tool: ${exp}`)
    }

    // 3. tools/call: heartbeat
    const hbRes = await sendRpc({
      id: 3,
      method: 'tools/call',
      params: {
        name: 'heartbeat',
        arguments: { agentId: 'mcp-tester', taskId: 'test-task' },
      },
    })
    const hbContent = JSON.parse(hbRes.result.content[0].text)
    assert.equal(hbContent.ok, true)
    assert.equal(hbContent.agentId, 'mcp-tester')

    // 4. tools/call: claim
    const claimRes = await sendRpc({
      id: 4,
      method: 'tools/call',
      params: {
        name: 'claim',
        arguments: {
          agentId: 'mcp-tester',
          taskId: 'test-task',
          paths: ['src/x.ts'],
          authKey: f.authKey,
        },
      },
    })
    const claimContent = JSON.parse(claimRes.result.content[0].text)
    assert.equal(claimContent.ok, true)
    assert.ok(claimContent.lease?.id)

    // 5. tools/call: message_send
    const sendRes = await sendRpc({
      id: 5,
      method: 'tools/call',
      params: {
        name: 'message_send',
        arguments: {
          fromAgent: 'mcp-tester',
          toAgent: 'mcp-tester',
          body: 'Hello via MCP',
          authKey: f.authKey,
        },
      },
    })
    const sendContent = JSON.parse(sendRes.result.content[0].text)
    assert.equal(sendContent.ok, true)
    assert.equal(sendContent.message.body, 'Hello via MCP')

    // 6. tools/call: inbox_read
    const inboxRes = await sendRpc({
      id: 6,
      method: 'tools/call',
      params: {
        name: 'inbox_read',
        arguments: { agentId: 'mcp-tester' },
      },
    })
    const inboxContent = JSON.parse(inboxRes.result.content[0].text)
    assert.equal(inboxContent.ok, true)
    assert.ok(inboxContent.messages.length >= 1)

    // 7. tools/call: release
    const relRes = await sendRpc({
      id: 7,
      method: 'tools/call',
      params: {
        name: 'release',
        arguments: {
          agentId: 'mcp-tester',
          leaseId: claimContent.lease.id,
          authKey: f.authKey,
        },
      },
    })
    const relContent = JSON.parse(relRes.result.content[0].text)
    assert.equal(relContent.ok, true)
    assert.equal(relContent.released, true)
  } finally {
    await f.cleanup()
  }
})

test('M4: SSE stream delivers live events for register, claim, and message', async () => {
  const f = await createCoordFixture()
  try {
    const sseEvents: Array<{ type: string; data: any }> = []

    // Connect to /api/live/events
    const controller = new AbortController()
    const res = await fetch(`${f.baseUrl}/api/live/events`, {
      signal: controller.signal,
    })
    assert.equal(res.status, 200)

    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let streamText = ''

    const readLoop = async () => {
      try {
        while (true) {
          const { done, value } = await reader!.read()
          if (done) break
          streamText += decoder.decode(value, { stream: true })
          const blocks = streamText.split('\n\n')
          streamText = blocks.pop() ?? ''
          for (const block of blocks) {
            const eventMatch = block.match(/event:\s*([^\r\n]+)/)
            const dataMatch = block.match(/data:\s*([^\r\n]+)/)
            if (eventMatch && dataMatch) {
              try {
                sseEvents.push({ type: eventMatch[1].trim(), data: JSON.parse(dataMatch[1].trim()) })
              } catch {}
            }
          }
        }
      } catch (err: unknown) {
        // AbortError expected on cleanup
      }
    }
    void readLoop()

    // Trigger actions that emit SSE events
    await fetch(`${f.baseUrl}/api/agent/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${f.authKey}` },
      body: JSON.stringify({ agentId: 'sse-agent', workspaceId: f.workspaceId }),
    })

    await fetch(`${f.baseUrl}/api/agent/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${f.authKey}` },
      body: JSON.stringify({ agentId: 'sse-agent', workspaceId: f.workspaceId, paths: ['src/x.ts'] }),
    })

    await fetch(`${f.baseUrl}/api/agent/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${f.authKey}` },
      body: JSON.stringify({ fromAgent: 'sse-agent', toAgent: 'sse-agent', workspaceId: f.workspaceId, body: 'sse test message' }),
    })

    // Wait for events to arrive
    for (let i = 0; i < 30; i++) {
      if (sseEvents.some((e) => e.type === 'message.sent')) break
      await new Promise((r) => setTimeout(r, 100))
    }

    controller.abort()

    const eventTypes = sseEvents.map((e) => e.type)
    assert.ok(eventTypes.includes('agent.registered'), 'SSE should receive agent.registered')
    assert.ok(eventTypes.includes('claim.acquired'), 'SSE should receive claim.acquired')
    assert.ok(eventTypes.includes('message.sent'), 'SSE should receive message.sent')
  } finally {
    await f.cleanup()
  }
})
