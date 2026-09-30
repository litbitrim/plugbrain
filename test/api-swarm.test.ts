import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { registerWorkerProfile, recordTurn, approveCommit } from '../src/coord/swarm-ops.ts'
import { registerSwarmAgent } from '../src/coord/registry.ts'
import { sendMessage } from '../src/coord/inbox.ts'
import { enqueueTask } from '../src/queue.ts'

test('swarm read routes require auth and return the real scoped coordination records', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-api-swarm-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-api-swarm'
  const root = join(dir, 'workspace')
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Swarm API', root, new Date().toISOString())
  registerSwarmAgent(db, {
    agentId: 'worker-a', name: 'Worker A', model: 'fixture-model', workspaceId,
  })
  registerWorkerProfile(db, { agentId: 'worker-a', surface: 'other', account: 'fixture-account', model: 'fixture-model' })
  registerSwarmAgent(db, { agentId: 'integrator', name: 'Integrator', workspaceId })
  enqueueTask(db, workspaceId, { title: 'Timeline fixture', requestedBy: 'worker-a' })
  recordTurn(db, { workspaceId, agentId: 'worker-a', phase: 'start', claimNext: true })
  recordTurn(db, { workspaceId, agentId: 'worker-a', phase: 'end', state: 'awaiting-commit', summary: 'Fixture turn summary' })
  sendMessage(db, { workspaceId, fromAgent: 'worker-a', toAgent: 'integrator', subject: 'Handoff', body: 'Fixture message' })
  approveCommit(db, { workspaceId, agentId: 'worker-a', by: 'integrator' })

  const authKey = 'fixture-' + 'x'.repeat(24)
  const server: ServerHandle = await serve({ db, uiRoot: null, authKey, requireAuth: true }, 0)
  const base = `http://127.0.0.1:${server.port}`
  const routes = ['board', 'turns', 'messages', 'approvals', 'queue']
  try {
    for (const route of routes) {
      const response = await fetch(`${base}/api/swarm/${route}?workspace=${workspaceId}`)
      assert.equal(response.status, 401, `${route} must reject a missing session`)
    }
    const unauthenticatedResources = await fetch(`${base}/api/resources`)
    assert.equal(unauthenticatedResources.status, 401, 'host resources and quota reports require a session')

    const get = async (route: string) => {
      const response = await fetch(`${base}/api/swarm/${route}?workspace=${workspaceId}`, {
        headers: { Authorization: `Bearer ${authKey}` },
      })
      assert.equal(response.status, 200)
      return response.json() as Promise<Record<string, any>>
    }
    const [board, turns, messages, approvals, queue] = await Promise.all(routes.map(get))
    const resourcesResponse = await fetch(`${base}/api/resources`, { headers: { Authorization: `Bearer ${authKey}` } })
    assert.equal(resourcesResponse.status, 200)
    const resources = await resourcesResponse.json() as Record<string, any>
    assert.equal(resources.ok, true)
    assert.ok(Array.isArray(resources.host.drives))
    assert.ok(Array.isArray(resources.quotas))
    assert.equal(board.board.agents[0].id, 'worker-a')
    assert.equal(board.board.agents[0].model, 'fixture-model')
    assert.equal('resourceKey' in board.board.agents[0], false, 'resource labels stay private')
    assert.equal(turns.historyAvailable, true)
    assert.equal(turns.turns.length, 1)
    assert.equal(turns.turns[0].state, 'awaiting-commit')
    assert.equal(turns.turns[0].summary, 'Fixture turn summary')
    assert.ok(messages.messages.some((message: { subject: string }) => message.subject === 'Handoff'))
    assert.equal(approvals.approvals.length, 1)
    assert.equal(approvals.approvals[0].agentId, 'worker-a')
    assert.equal(queue.tasks.length, 1)
  } finally {
    await server.close()
    db.close()
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* fixture cleanup */ }
  }
})
