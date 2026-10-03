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
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerAgent } from '../src/access.ts'
import { ensureLeaseSchema } from '../src/coord/leases.ts'
import { ensureQueueSchema } from '../src/queue.ts'
import {
  claimNextTask, deliverTask, enqueueTask, listQueue, queueDepth,
  listQueueEvents, prioritizeTask, reassignTask, supersedeTask,
} from '../src/queue.ts'

const WS = 'ws-queue-test'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-queue-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceRoot = join(dir, 'root')
  mkdirSync(workspaceRoot, { recursive: true })
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'queue-demo', workspaceRoot, new Date().toISOString())
  registerAgent(db, 'agent-nvidia', 'nvidia')
  registerAgent(db, 'agent-gemini', 'gemini')

  // Create a minimal ledger with M01 so unaddressed tasks with planRef: 'M01' are claimable
  const ledgerDir = join(workspaceRoot, 'koordination', 'roadmap')
  mkdirSync(ledgerDir, { recursive: true })
  const ledger = {
    updated: new Date().toISOString(),
    masterTasks: {
      source: 'test',
      tasks: [
        { id: 'M01', title: 'Master Task 1', status: 'IN_PROGRESS', priority: 'MUST', dependsOn: [], requirementIds: [], ownerRole: 'dev', packageGate: null, ledgerGates: [], evidence: [] },
      ],
    },
    gates: [],
  } as any
  writeFileSync(join(ledgerDir, 'PROGRESS-STATE.json'), JSON.stringify(ledger, null, 2))

  return { dir, db, workspaceRoot, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('an enqueued task is pending and belongs to nobody', () => {
  const f = fixture()
  try {
    const task = enqueueTask(f.db, WS, { title: 'Build the parser', body: '# Goal\nParse it.', planRef: 'M01' })
    assert.equal(task.state, 'pending')
    assert.equal(task.claimed_by, null)
    assert.equal(task.addressed_to, null)
    assert.equal(queueDepth(f.db, WS), 1)
  } finally { f.cleanup() }
})

test('the first free agent grabs the task, and the second gets nothing', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'only one', planRef: 'M01' })

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
    const a = enqueueTask(f.db, WS, { title: 'first', planRef: 'M01' })
    enqueueTask(f.db, WS, { title: 'second', planRef: 'M01' })
    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.equal(claimed?.id, a.id)
  } finally { f.cleanup() }
})

test('queue operations are audited, visible, and affect future offers', () => {
  const f = fixture()
  try {
    const replaced = enqueueTask(f.db, WS, { title: 'old task', planRef: 'M01' })
    const ordinary = enqueueTask(f.db, WS, { title: 'ordinary task', planRef: 'M01' })
    const urgent = enqueueTask(f.db, WS, { title: 'urgent task', planRef: 'M01' })

    const superseded = supersedeTask(f.db, WS, replaced.id, {
      byAgent: 'agent-nvidia', byTaskId: urgent.id, note: 'replaced by the current brief',
    })
    assert.equal(superseded.state, 'superseded')
    assert.equal(superseded.superseded_by, urgent.id)
    assert.equal(reassignTask(f.db, WS, ordinary.id, { byAgent: 'agent-nvidia', addressedTo: 'agent-gemini' }).addressed_to, 'agent-gemini')
    assert.equal(prioritizeTask(f.db, WS, urgent.id, { byAgent: 'agent-nvidia', priority: 8 }).priority, 8)

    assert.equal(claimNextTask(f.db, WS, 'agent-nvidia')?.id, urgent.id)
    assert.equal(claimNextTask(f.db, WS, 'agent-nvidia'), null, 'reassigned work is not offered to another worker')
    assert.equal(claimNextTask(f.db, WS, 'agent-gemini')?.id, ordinary.id)

    const rows = listQueue(f.db, WS)
    assert.equal(rows.find(row => row.id === replaced.id)?.state, 'superseded')
    assert.equal(rows.find(row => row.id === urgent.id)?.priority, 8)
    const events = listQueueEvents(f.db, WS, { taskId: replaced.id })
    assert.deepEqual(events.map(event => event.operation), ['supersede'])
    assert.equal(events[0]?.by_agent, 'agent-nvidia')
    assert.equal(events[0]?.note, 'replaced by the current brief')
    assert.equal(listQueueEvents(f.db, WS).length, 3)
  } finally { f.cleanup() }
})

test('a stale claim can be atomically rerouted, but an active lease blocks queue mutation', () => {
  const f = fixture()
  try {
    const claimed = enqueueTask(f.db, WS, { title: 'claimed task', planRef: 'M01' })
    assert.ok(claimNextTask(f.db, WS, 'agent-nvidia'))
    const rerouted = reassignTask(f.db, WS, claimed.id, { byAgent: 'agent-gemini', addressedTo: 'agent-gemini' })
    assert.equal(rerouted.state, 'pending')
    assert.equal(rerouted.claimed_by, null)
    assert.equal(rerouted.claimed_at, null)
    assert.equal(rerouted.addressed_to, 'agent-gemini')
    assert.equal(listQueueEvents(f.db, WS, { taskId: claimed.id })[0]?.old_value, 'claimed:agent-nvidia')
    assert.equal(claimNextTask(f.db, WS, 'agent-gemini')?.id, claimed.id)
    const superseded = supersedeTask(f.db, WS, claimed.id, {
      byAgent: 'agent-nvidia', note: 'duplicate without a started lease or worktree',
    })
    assert.equal(superseded.state, 'superseded')
    assert.equal(superseded.claimed_by, null)
    assert.equal(listQueueEvents(f.db, WS, { taskId: claimed.id })[0]?.old_value, 'claimed:agent-gemini')

    const leased = enqueueTask(f.db, WS, { title: 'leased task', planRef: 'M01' })
    assert.ok(claimNextTask(f.db, WS, 'agent-nvidia'))
    ensureLeaseSchema(f.db)
    f.db.prepare(`INSERT INTO leases
      (id, workspace_id, agent_id, task_id, paths_json, symbols_json, mode, epoch, created_at, expires_at, released_at, ttl_ms)
      VALUES (?, ?, ?, ?, '[]', '[]', 'write', 1, ?, ?, NULL, 60000)`)
      .run('lease-active', WS, 'agent-nvidia', leased.id, new Date().toISOString(), new Date(Date.now() + 60000).toISOString())
    assert.throws(() => supersedeTask(f.db, WS, leased.id, { byAgent: 'agent-gemini', note: 'obsolete' }), /active lease/i)
    assert.equal(listQueue(f.db, WS).find(row => row.id === leased.id)?.state, 'claimed')
  } finally { f.cleanup() }
})

test('queue mutations reject invalid addressees, bad priorities, and cross-workspace tasks', () => {
  const f = fixture()
  try {
    const pending = enqueueTask(f.db, WS, { title: 'pending task', planRef: 'M01' })
    f.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run('ws-other', 'other', join(f.dir, 'other'), new Date().toISOString())
    assert.throws(() => reassignTask(f.db, WS, pending.id, { byAgent: 'agent-gemini', addressedTo: 'missing-agent' }), /agent/i)
    assert.throws(() => prioritizeTask(f.db, WS, pending.id, { byAgent: 'agent-gemini', priority: 1.5 }), /integer/i)
    assert.throws(() => supersedeTask(f.db, 'ws-other', pending.id, { byAgent: 'agent-gemini', note: 'obsolete' }), /another workspace/i)
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
    const open = enqueueTask(f.db, WS, { title: 'for anyone', planRef: 'M01' })

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
    enqueueTask(f.db, WS, { title: 'work', planRef: 'M01' })
    assert.throws(() => claimNextTask(f.db, WS, 'agent-invented'), /agent/i)
  } finally { f.cleanup() }
})

test('delivery records where the output landed and by whom', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'work', planRef: 'M01' })
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
    enqueueTask(f.db, WS, { title: 'work', planRef: 'M01' })
    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(claimed)
    assert.throws(() => deliverTask(f.db, claimed.id, 'agent-gemini', 'x.md'), /held by/i)
  } finally { f.cleanup() }
})

test('a stale claim is reported, never reaped', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, WS, { title: 'work', planRef: 'M01' })
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

function fixtureWithLedger() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-queue-ledger-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceRoot = join(dir, 'root')
  mkdirSync(workspaceRoot, { recursive: true })
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'queue-demo', workspaceRoot, new Date().toISOString())
  registerAgent(db, 'agent-nvidia', 'nvidia')
  registerAgent(db, 'agent-gemini', 'gemini')

  // Ensure queue schema is created
  ensureQueueSchema(db)

  // Create a ledger with master tasks M01 and M02
  const ledgerDir = join(workspaceRoot, 'koordination', 'roadmap')
  mkdirSync(ledgerDir, { recursive: true })
  const ledger = {
    updated: new Date().toISOString(),
    masterTasks: {
      source: 'test',
      tasks: [
        { id: 'M01', title: 'Master Task 1', status: 'IN_PROGRESS', priority: 'MUST', dependsOn: [], requirementIds: [], ownerRole: 'dev', packageGate: null, ledgerGates: [], evidence: [] },
        { id: 'M02', title: 'Master Task 2', status: 'TODO', priority: 'OPTIONAL', dependsOn: ['M01'], requirementIds: [], ownerRole: 'dev', packageGate: null, ledgerGates: [], evidence: [] },
      ],
    },
    gates: [],
  } as any
  writeFileSync(join(ledgerDir, 'PROGRESS-STATE.json'), JSON.stringify(ledger, null, 2))

  return { dir, db, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('T1: worker without addressed task claims pending task with valid plan_ref in ledger', () => {
  const f = fixtureWithLedger()
  try {
    // Task with plan_ref M01 (exists in ledger)
    enqueueTask(f.db, WS, { title: 'Task for M01', planRef: 'M01' })

    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(claimed, 'worker should claim task with valid plan_ref')
    assert.equal(claimed.plan_ref, 'M01')
    assert.equal(claimed.claimed_by, 'agent-nvidia')
  } finally { f.cleanup() }
})

test('T2: worker without addressed task gets null for pending task without plan_ref', () => {
  const f = fixtureWithLedger()
  try {
    // Task without plan_ref
    enqueueTask(f.db, WS, { title: 'Task without plan_ref' })

    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.equal(claimed, null, 'worker should not claim task without plan_ref')
  } finally { f.cleanup() }
})

test('T3: worker without addressed task gets null for pending task with plan_ref not in ledger', () => {
  const f = fixtureWithLedger()
  try {
    // Task with plan_ref M99 (not in ledger)
    enqueueTask(f.db, WS, { title: 'Task for M99', planRef: 'M99' })

    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.equal(claimed, null, 'worker should not claim task with invalid plan_ref')
  } finally { f.cleanup() }
})

test('T4: worker claims explicitly addressed task regardless of plan_ref', () => {
  const f = fixtureWithLedger()
  try {
    // Task addressed to agent-nvidia, no plan_ref (or invalid plan_ref)
    enqueueTask(f.db, WS, { title: 'Addressed task', addressedTo: 'agent-nvidia' })

    const claimed = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(claimed, 'worker should claim explicitly addressed task')
    assert.equal(claimed.addressed_to, 'agent-nvidia')
    assert.equal(claimed.claimed_by, 'agent-nvidia')
  } finally { f.cleanup() }
})

test('T5: worker with existing claim gets no second claim', () => {
  const f = fixtureWithLedger()
  try {
    enqueueTask(f.db, WS, { title: 'Task 1', planRef: 'M01' })
    enqueueTask(f.db, WS, { title: 'Task 2', planRef: 'M02' })

    const first = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.ok(first, 'first claim should succeed')

    const second = claimNextTask(f.db, WS, 'agent-nvidia')
    assert.equal(second, null, 'worker with existing claim should not get second task')
  } finally { f.cleanup() }
})

test('T6: no second queue table introduced - only queue_tasks used', () => {
  const f = fixtureWithLedger()
  try {
    // Verify only queue_tasks table exists for queue operations
    const tables = f.db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`).all() as Array<{ name: string }>
    const queueTables = tables.map(t => t.name).filter(name => name.startsWith('queue')).sort()
    // Should have queue_tasks, queue_deliveries, queue_task_events - no second queue table
    assert.ok(queueTables.includes('queue_tasks'), `queue_tables found: ${queueTables.join(', ')}`)
    assert.ok(queueTables.includes('queue_deliveries'))
    assert.ok(queueTables.includes('queue_task_events'))
    // No other queue_* tables
    const expectedTables = ['queue_deliveries', 'queue_task_events', 'queue_tasks']
    const extraQueueTables = queueTables.filter(name => !expectedTables.includes(name))
    assert.equal(extraQueueTables.length, 0, `Unexpected queue tables: ${extraQueueTables.join(', ')}`)
  } finally { f.cleanup() }
})
