import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerAgent } from '../src/access.ts'
import { claimNextTask, deliverTask, enqueueTask } from '../src/queue.ts'
import { syncDependencies } from '../src/coord/dependencies.ts'
import { ensureSwarmOpsSchema } from '../src/coord/swarm-ops.ts'
import {
  confirmDelivery, getConsumerCursor, getMessageDeliveryState, markMessageProcessed,
  readInbox, sendMessage,
} from '../src/coord/inbox.ts'

const WS = 'ws-durable-test'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-durable-'))
  const dbPath = join(dir, 'brain.db')
  let db = openStore(dbPath)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'durable-delivery-test', dir, new Date().toISOString())
  ensureSwarmOpsSchema(db)
  for (const agent of ['sender', 'recipient-a', 'recipient-b', 'unrelated']) registerAgent(db, agent, agent)
  return {
    dir,
    get db() { return db },
    restart() { db.close(); db = openStore(dbPath) },
    cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) },
  }
}

test('durable message delivery deduplicates an event identity and persists receipt separately from processing', async () => {
  const f = fixture()
  try {
    const first = sendMessage(f.db, {
      workspaceId: WS, fromAgent: 'sender', toAgent: 'recipient-a', subject: 'handoff', body: 'first payload',
      deliveryKey: 'event:task.delivered:task-a:attempt-1',
    })
    const duplicate = sendMessage(f.db, {
      workspaceId: WS, fromAgent: 'sender', toAgent: 'recipient-a', subject: 'duplicate', body: 'must not replace payload',
      deliveryKey: 'event:task.delivered:task-a:attempt-1',
    })
    assert.equal(duplicate.id, first.id)
    assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM inbox_messages').get()!.n, 1)

    const received = await readInbox(f.db, { workspaceId: WS, agentId: 'recipient-a', unreadOnly: true })
    assert.equal(received.length, 1)
    assert.equal(received[0]!.id, first.id)

    assert.equal(markMessageProcessed(f.db, first.id, 'recipient-a'), true)
    assert.equal(getMessageDeliveryState(f.db, first.id, 'recipient-a')?.acknowledgedAt, null,
      'processing must not imply receipt ACK')
    assert.equal(getConsumerCursor(f.db, WS, 'recipient-a'), null,
      'processing must not advance the consumer ACK cursor')

    assert.equal(confirmDelivery(f.db, first.id, 'recipient-a'), true)
    const state = getMessageDeliveryState(f.db, first.id, 'recipient-a')
    assert.ok(state?.acknowledgedAt)
    assert.ok(state?.processedAt, 'the earlier processing record must remain independent')
    assert.equal(getConsumerCursor(f.db, WS, 'recipient-a')?.messageId, first.id)
    assert.equal((await readInbox(f.db, { workspaceId: WS, agentId: 'recipient-a', unreadOnly: true })).length, 0)
  } finally { f.cleanup() }
})

test('consumer cursor advances contiguously, resumes after restart, and does not skip reordered ACKs', async () => {
  const f = fixture()
  try {
    const first = sendMessage(f.db, {
      workspaceId: WS, fromAgent: 'sender', toAgent: 'recipient-a', body: 'first', deliveryKey: 'event:first',
    })
    const second = sendMessage(f.db, {
      workspaceId: WS, fromAgent: 'sender', toAgent: 'recipient-a', body: 'second', deliveryKey: 'event:second',
    })
    await readInbox(f.db, { workspaceId: WS, agentId: 'recipient-a' })
    assert.equal(confirmDelivery(f.db, second.id, 'recipient-a'), true)
    assert.equal(getConsumerCursor(f.db, WS, 'recipient-a'), null,
      'an out-of-order ACK cannot skip an earlier unacknowledged message')
    assert.equal(confirmDelivery(f.db, first.id, 'recipient-a'), true)
    assert.equal(getConsumerCursor(f.db, WS, 'recipient-a')?.messageId, second.id)

    f.restart()
    assert.equal(getConsumerCursor(f.db, WS, 'recipient-a')?.messageId, second.id,
      'the cursor must survive reopening the store')
    assert.equal((await readInbox(f.db, { workspaceId: WS, agentId: 'recipient-a', afterCursor: true })).length, 0)
  } finally { f.cleanup() }
})

test('broadcast delivery and ACK state are isolated per consumer', async () => {
  const f = fixture()
  try {
    const message = sendMessage(f.db, {
      workspaceId: WS, fromAgent: 'sender', channel: 'ops', body: 'fleet notice', deliveryKey: 'event:fleet-notice',
    })
    assert.equal((await readInbox(f.db, { workspaceId: WS, agentId: 'recipient-a', unreadOnly: true })).length, 1)
    assert.equal(confirmDelivery(f.db, message.id, 'recipient-a'), true)
    assert.equal((await readInbox(f.db, { workspaceId: WS, agentId: 'recipient-a', unreadOnly: true })).length, 0)
    assert.equal((await readInbox(f.db, { workspaceId: WS, agentId: 'unrelated', unreadOnly: true })).length, 1,
      'one consumer ACK must not hide a broadcast from other consumers')
  } finally { f.cleanup() }
})

test('task delivery notifies only addressed dependent-task recipients once', () => {
  const f = fixture()
  try {
    const predecessor = enqueueTask(f.db, WS, { title: 'produce shared result' })
    const dependentA = enqueueTask(f.db, WS, { title: 'review result A', addressedTo: 'recipient-a', afterTaskId: predecessor.id })
    const dependentB = enqueueTask(f.db, WS, { title: 'consume result B', addressedTo: 'recipient-b', afterTaskId: predecessor.id })
    enqueueTask(f.db, WS, { title: 'unrelated task', addressedTo: 'unrelated' })
    const claimed = claimNextTask(f.db, WS, 'sender')
    assert.equal(claimed?.id, predecessor.id)

    deliverTask(f.db, predecessor.id, 'sender', 'review/result.md')
    const messages = f.db.prepare(`SELECT to_agent, body FROM inbox_messages WHERE workspace_id = ? ORDER BY rowid`)
      .all(WS) as Array<{ to_agent: string | null; body: string }>
    assert.deepEqual(messages.map(message => message.to_agent).sort(), ['recipient-a', 'recipient-b'])
    assert.ok(messages.every(message => message.body.includes(predecessor.id)))

    // Reconciliation on a repeated event must not notify again.
    syncDependencies(f.db, WS)
    assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM inbox_messages WHERE workspace_id = ?').get(WS)!.n, 2)
    assert.equal(dependentA.addressed_to, 'recipient-a')
    assert.equal(dependentB.addressed_to, 'recipient-b')
  } finally { f.cleanup() }
})
