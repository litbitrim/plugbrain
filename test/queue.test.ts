/**
 * The workspace task queue.
 *
 * The model this serves: agents are interchangeable generalists that each take
 * one big task through every stage themselves, in their own session. So work
 * is *pulled*, not routed — the first free agent grabs the next task — and
 * addressing is an optional narrowing for the cases where capability genuinely
 * differs (a Freebuff-only job), not a second mechanism.
 *
 * The property everything else rests on is that a claim is atomic. Two idle
 * agents must never both grab the same task.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerAgent } from '../src/access.ts'
import {
  claimNextTask, deliverTask, enqueueTask, listQueue, queueDepth,
} from '../src/queue.ts'

const WS = 'ws-queue-test'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-queue-'))
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'queue-demo', join(dir, 'root'), new Date().toISOString())
  registerAgent(db, 'agent-nvidia', 'nvidia')
  registerAgent(db, 'agent-gemini', 'gemini')
  return { dir, db, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('an enqueued task is pending and belongs to nobody', () => {
  const f = fixture()
  try {
    const task = enqueueTask(f.db, WS, { title: 'Build the parser', body: '# Goal\nParse it.' })
    assert.equal(task.state, 'pending')
    assert.equal(task.claimed_by, null)
    assert.equal(task.addressed_to, null)
    assert.equal(queueDepth(f.db, WS), 1)
  } finally { f.cleanup() }
})

test('the first free agent grabs the task, and the second gets nothing', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'only one' })

    const first = claimNextTask(f.db, WS, 'agent-nvidia')
    const second = claimNextTask(f.db, WS, 'agent-gemini')

    assert.ok(first, 'the first agent should have claimed it')
    assert.equal(first.claimed_by, 'agent-nvidia')
    assert.equal(first.state, 'claimed')
    // The whole point. Without a compare-and-set both agents take the same
    // task and duplicate every write that follows.
    assert.equal(second, null, 'the second agent must not get the same task')
    assert.equal(queueDepth(f.db, WS), 0)
  } finally { f.cleanup() }
})

test('claiming is first-in-first-out, so nothing starves', () => {
  const f = fixture()
  try {
    const a = enqueueTask(f.db, WS, { title: 'first' })
    enqueueTask(f.db, WS, { title: 'second' })
    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.equal(claimed?.id, a.id)
  } finally { f.cleanup() }
})

test('an addressed task is claimable only by its addressee', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'freebuff only', addressedTo: 'agent-gemini' })

    // Routing is explicit. A non-addressee must not be handed it merely
    // because it asked first — that would be guessing at intent.
    assert.equal(claimNextTask(f.db, WS, 'agent-nvidia'), null)

    const mine = claimNextTask(f.db, WS, 'agent-gemini')
    assert.ok(mine)
    assert.equal(mine.claimed_by, 'agent-gemini')
  } finally { f.cleanup() }
})

test('an addressed task does not block the unaddressed one behind it', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'for gemini', addressedTo: 'agent-gemini' })
    const open = enqueueTask(f.db, WS, { title: 'for anyone' })

    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.equal(claimed?.id, open.id)
  } finally { f.cleanup() }
})

test('an empty queue is an honest null, never a fabricated task', () => {
  const f = fixture()
  try {
    assert.equal(claimNextTask(f.db, WS, 'agent-nvidia'), null)
  } finally { f.cleanup() }
})

test('an unregistered agent cannot claim', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'work' })
    assert.throws(() => claimNextTask(f.db, WS, 'agent-invented'), /agent/i)
  } finally { f.cleanup() }
})

test('delivery records where the output landed and by whom', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'work' })
    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(claimed)

    const done = deliverTask(f.db, claimed.id, 'agent-nvidia', 'deliveries/work.md')
    assert.equal(done.state, 'delivered')
    assert.equal(done.delivered_path, 'deliveries/work.md')
  } finally { f.cleanup() }
})

test('only the holder may deliver a task', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'work' })
    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(claimed)
    assert.throws(() => deliverTask(f.db, claimed.id, 'agent-gemini', 'x.md'), /held by/i)
  } finally { f.cleanup() }
})

test('a stale claim is reported, never reaped', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'work' })
    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(claimed)

    // Backdate the claim as if the agent had gone quiet an hour ago.
    const old = new Date(Date.now() - 60 * 60_000).toISOString()
    f.db.prepare('UPDATE queue_tasks SET claimed_at = ? WHERE id = ?').run(old, claimed.id)

    const rows = listQueue(f.db, WS, { staleAfterMs: 15 * 60_000 })
    const row = rows.find(r => r.id === claimed.id)
    assert.ok(row)
    assert.equal(row.stale, true)
    // PlugBrain does not own leases (see projections/conflicts.ts). It reports
    // that a claim has gone quiet; deciding an agent is dead is somebody
    // else's judgement, and reaping here would be exactly the liveness
    // inference the Brain avoids everywhere else.
    assert.equal(row.state, 'claimed')
    assert.equal(row.claimed_by, 'agent-nvidia')
  } finally { f.cleanup() }
})

test('the queue is scoped to its workspace', () => {
  const f = fixture()
  try {
    f.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run('ws-other', 'other', join(f.dir, 'other'), new Date().toISOString())
    enqueueTask(f.db, 'ws-other', { title: 'not ours' })
    assert.equal(queueDepth(f.db, WS), 0)
    assert.equal(claimNextTask(f.db, WS, 'agent-nvidia'), null)
  } finally { f.cleanup() }
})
