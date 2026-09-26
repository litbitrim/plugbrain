import assert from 'node:assert/strict'
import test from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { coordEvents } from '../src/coord/events.ts'
import { registerSwarmAgent } from '../src/coord/registry.ts'
import { registerWorkerProfile, recordTurn } from '../src/coord/swarm-ops.ts'
import { formatWatchResult, runSwarmWatch, type WatchEvent } from '../src/swarm-watch.ts'

const event = (type: string, data: unknown): WatchEvent => ({ type, data, timestamp: '2026-09-26T20:00:00.000Z' })

function subscribeAfter(...events: WatchEvent[]) {
  return (listener: (value: WatchEvent) => void) => {
    const timer = setTimeout(() => events.forEach(listener), 1)
    return () => clearTimeout(timer)
  }
}

test('swarm watch wakes for turn, targeted message, queued task, and still readings', async () => {
  const examples = [
    event('agent.turn', { agentId: 'a1', previousState: 'working', state: 'blocked', summary: 'stuck' }),
    event('message.sent', { toAgent: 'a1', subject: 'hello' }),
    event('task.enqueued', { taskId: 'task-1', title: 'review', addressedTo: 'a1' }),
    event('watchdog.silent', { agentId: 'a1', minutes: 46 }),
  ]
  for (const value of examples) {
    let result: WatchEvent[] = []
    const output = await runSwarmWatch({
      forAgent: 'a1', timeoutMs: 200, batchMs: 2, pollMs: 100,
      subscribe: subscribeAfter(value), emit: events => { result = events },
      sampleAdmission: () => ({ test: true, build: true, worktree: true }),
      snapshotFiles: async () => new Map(),
    })
    assert.equal(output.code, 0, value.type)
    assert.deepEqual(result.map(row => row.type), [value.type])
  }
})

test('swarm watch filters unchanged and unobserved turns', async () => {
  const events = [
    event('agent.turn', { agentId: 'a1', previousState: 'working', state: 'working' }),
    event('agent.turn', { agentId: 'a2', previousState: 'working', state: 'needs-task' }),
  ]
  const result = await runSwarmWatch({
    forAgent: 'a1', timeoutMs: 12, pollMs: 100,
    subscribe: subscribeAfter(...events), emit: () => undefined,
    sampleAdmission: () => ({ test: true, build: true, worktree: true }),
    snapshotFiles: async () => new Map(),
  })
  assert.equal(result.code, 3)
  assert.deepEqual(result.events, [])
})

test('swarm watch reports new and changed Markdown paths', async () => {
  let scans = 0
  const result = await runSwarmWatch({
    dirs: ['ignored-by-injected-scanner'], timeoutMs: 300, pollMs: 5, batchMs: 25,
    subscribe: () => () => undefined,
    snapshotFiles: async () => ++scans === 1 ? new Map([['a.md', 'one']]) : new Map([['a.md', 'two'], ['b.md', 'one']]),
    sampleAdmission: () => ({ test: true, build: true, worktree: true }),
  })
  assert.deepEqual(result.events.filter(row => row.type === 'file.changed').map(row => (row.data as { path: string }).path), ['a.md', 'b.md'])
})

test('swarm watch reports admission changes and batches arrivals for one five-second window', async () => {
  let samples = 0
  let emitted = 0
  const result = await runSwarmWatch({
    timeoutMs: 300, pollMs: 5, batchMs: 25,
    subscribe: listener => {
      setTimeout(() => listener(event('agent.turn', { agentId: 'a1', previousState: 'working', state: 'needs-task' })), 1)
      setTimeout(() => listener(event('agent.turn', { agentId: 'a2', previousState: 'working', state: 'blocked' })), 3)
      return () => undefined
    },
    sampleAdmission: () => ({ test: ++samples === 1, build: true, worktree: true }),
    snapshotFiles: async () => new Map(),
    emit: () => { emitted += 1 },
  })
  assert.equal(emitted, 1)
  assert.deepEqual(result.events.map(row => row.type), ['agent.turn', 'agent.turn', 'admission.changed'])
  assert.equal((result.events[2]!.data as { kind: string }).kind, 'test')
})

test('swarm watch receives turn transitions emitted from a test Brain store', async () => {
  const db = openStore(':memory:')
  const workspaceId = 'ws-swarm-watch-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Swarm Watch Test', 'C:/fixture/swarm-watch', new Date().toISOString())
  registerSwarmAgent(db, { agentId: 'watch-fixture', name: 'Watch Fixture', workspaceId })
  registerWorkerProfile(db, { agentId: 'watch-fixture', surface: 'other', account: 'fixture' })
  try {
    const watching = runSwarmWatch({
      forAgent: 'watch-fixture', timeoutMs: 200, batchMs: 2, pollMs: 100,
      subscribe: listener => coordEvents.onLive(listener),
      snapshotFiles: async () => new Map(),
      sampleAdmission: () => ({ test: true, build: true, worktree: true }),
      emit: () => undefined,
    })
    setTimeout(() => recordTurn(db, { workspaceId, agentId: 'watch-fixture', phase: 'start' }), 1)
    const result = await watching
    assert.equal(result.code, 0)
    assert.equal(result.events[0]?.type, 'agent.turn')
    const payload = result.events[0]!.data as Record<string, unknown>
    assert.equal(payload.previousState, null)
    assert.equal(payload.state, 'working')
  } finally {
    db.close()
  }
})

test('swarm watch timeout is exit 3 and JSON output has a stable machine-readable envelope', async () => {
  const result = await runSwarmWatch({
    timeoutMs: 5, pollMs: 100, subscribe: () => () => undefined,
    sampleAdmission: () => ({ test: true, build: true, worktree: true }),
    snapshotFiles: async () => new Map(), emit: () => undefined,
  })
  assert.equal(result.code, 3)
  assert.equal(result.timedOut, true)
  assert.deepEqual(JSON.parse(formatWatchResult(result.events, result.timedOut, true)), { events: [], timedOut: true })
})
