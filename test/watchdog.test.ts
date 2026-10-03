/**
 * BR-2a: the watchdog — still detection, task dependencies, review routing and
 * the sender of a message.
 *
 * Every case here runs on an injected clock: the timestamps are written into
 * the store and handed to the reading as `now`, so nothing waits 45 real
 * minutes for a worker to look quiet.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import * as coord from '../src/coord/index.ts'
import { enqueueTask } from '../src/queue.ts'
import { addTaskDependency } from '../src/coord/dependencies.ts'
import { runSwarmCli } from '../src/swarm-cli.ts'

interface Fixture {
  dir: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  cleanup: () => void
}

function createFixture(): Fixture {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-watchdog-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-watchdog'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Watchdog Test', dir, new Date().toISOString())
  return { dir, db, workspaceId, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

/** A host snapshot that is never out of room — admission is not under test here. */
const HOST: coord.HostSnapshot = {
  measuredAt: new Date().toISOString(),
  drives: [],
  memory: { freeBytes: 1e12, totalBytes: 1e12 },
  cpuBusyFraction: null,
}

function register(f: Fixture, agentId: string, account: string, model?: string): void {
  coord.registerSwarmAgent(f.db, { agentId, workspaceId: f.workspaceId, heartbeatTtlMs: 6 * 60 * 60_000 })
  coord.registerWorkerProfile(f.db, { agentId, surface: 'freebuff', account, ...(model === undefined ? {} : { model }) })
}

const minutesAgo = (now: Date, minutes: number): Date => new Date(now.getTime() - minutes * 60_000)
const minutesAfter = (now: Date, minutes: number): Date => new Date(now.getTime() + minutes * 60_000)

/** Pretend the worker started its turn (and last touched the Brain) at that time. */
function backdate(f: Fixture, agentId: string, iso: string): void {
  f.db.prepare('UPDATE agents SET turn_state_at = ?, last_contact_at = ? WHERE id = ?').run(iso, iso, agentId)
}

const messagesTo = (f: Fixture, agentId: string): Array<{ subject: string; from_agent: string; body: string }> =>
  f.db.prepare('SELECT subject, from_agent, body FROM inbox_messages WHERE workspace_id = ? AND to_agent = ? ORDER BY created_at')
    .all(f.workspaceId, agentId) as unknown as Array<{ subject: string; from_agent: string; body: string }>

const queueTask = (f: Fixture, id: string): { id: string; title: string; addressed_to: string | null; state: string; claimed_by: string | null } =>
  f.db.prepare('SELECT id, title, addressed_to, state, claimed_by FROM queue_tasks WHERE id = ?').get(id) as unknown as
  { id: string; title: string; addressed_to: string | null; state: string; claimed_by: string | null }

const reviewTaskCount = (f: Fixture): number =>
  Number((f.db.prepare(`SELECT COUNT(*) AS n FROM queue_tasks WHERE workspace_id = ? AND title LIKE 'Review:%'`)
    .get(f.workspaceId) as { n: number }).n)

test('BR-2a: a working worker without contact is still, and the board shows the minutes', () => {
  const f = createFixture()
  try {
    register(f, 'w-quiet', 'freebuff:quiet')
    register(f, 'w-fresh', 'nvidia:key-01')
    // The clock is injected in the readings below; the store timestamps are
    // written relative to the real now because the board reads it itself.
    const now = new Date()
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-quiet', phase: 'start' })
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-fresh', phase: 'start' })
    backdate(f, 'w-quiet', minutesAgo(now, 50.5).toISOString())
    backdate(f, 'w-fresh', minutesAgo(now, 10).toISOString())

    const silent = coord.silentWorkers(f.db, f.workspaceId, { now })
    assert.deepEqual(silent.map(reading => [reading.agentId, reading.minutes]), [['w-quiet', 50]],
      'only the worker past the threshold and without contact is still')

    // A claim five minutes ago is Brain contact: the worker is not still.
    coord.touchAgentContact(f.db, 'w-quiet', minutesAgo(now, 5))
    assert.equal(coord.silentWorkers(f.db, f.workspaceId, { now }).length, 0,
      'contact inside the working turn clears the reading')

    // The board carries the same reading, with minutes, for whoever looks.
    backdate(f, 'w-quiet', minutesAgo(new Date(), 50.5).toISOString())
    const board = coord.agentsBoard(f.db, f.workspaceId, { host: HOST })
    const quiet = board.agents.find(agent => agent.id === 'w-quiet')
    const fresh = board.agents.find(agent => agent.id === 'w-fresh')
    assert.equal(quiet?.silentMinutes, 50)
    assert.ok(quiet?.attention.includes('silent'))
    assert.equal(fresh?.silentMinutes, null)

    // The threshold is a per-workspace setting.
    coord.setSilentAfterMinutes(f.db, f.workspaceId, 60)
    assert.equal(coord.silentWorkers(f.db, f.workspaceId, { now }).length, 0,
      'a 50-minute silence is not still once the workspace says 60 minutes')
    assert.equal(coord.watchdogSettings(f.db, f.workspaceId).silentAfterMinutes, 60)
  } finally {
    f.cleanup()
  }
})

test('BR-2a: the integrator is told once per case, and again only after new contact', () => {
  const f = createFixture()
  try {
    register(f, 'w-quiet', 'freebuff:quiet')
    const now = new Date('2026-09-26T20:00:00.000Z')
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-quiet', phase: 'start' })
    backdate(f, 'w-quiet', minutesAgo(now, 50).toISOString())
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Quiet worker task', addressedTo: 'w-quiet' })
    f.db.prepare("UPDATE queue_tasks SET state = 'claimed', claimed_by = 'w-quiet', claimed_at = ? WHERE id = ?")
      .run(minutesAgo(now, 50).toISOString(), task.id)

    // A dry run observes without telling anybody.
    const dry = coord.scanWatchdog(f.db, f.workspaceId, { now, alert: false })
    assert.equal(dry.silent.length, 1)
    assert.equal(dry.alerted.length, 0)
    assert.equal(messagesTo(f, 'integrator').length, 0)

    const first = coord.scanWatchdog(f.db, f.workspaceId, { now })
    assert.deepEqual(first.alerted, ['w-quiet'])
    assert.equal(first.silent[0]?.alerted, true)
    const told = messagesTo(f, 'integrator')
    assert.equal(told.length, 1)
    assert.match(told[0]!.subject, /Silent work needs decision: Quiet worker task/)
    assert.match(told[0]!.body, /holding task/)

    // The same case is never reported twice.
    const second = coord.scanWatchdog(f.db, f.workspaceId, { now })
    assert.deepEqual(second.alerted, [])
    assert.equal(messagesTo(f, 'integrator').length, 1, 'no repeat while the case is the same')

    // Contact opens no new case while the worker stays in touch…
    coord.touchAgentContact(f.db, 'w-quiet', minutesAfter(now, 5))
    assert.deepEqual(coord.scanWatchdog(f.db, f.workspaceId, { now }).alerted, [])
    assert.equal(messagesTo(f, 'integrator').length, 1)

    // …but going quiet again after that contact is a new case.
    const later = minutesAfter(now, 60)
    const third = coord.scanWatchdog(f.db, f.workspaceId, { now: later })
    assert.deepEqual(third.alerted, ['w-quiet'])
    assert.equal(messagesTo(f, 'integrator').length, 2)
  } finally {
    f.cleanup()
  }
})

test('BR-2a: silence notice and case latch commit together', () => {
  const f = createFixture()
  try {
    register(f, 'w-quiet', 'freebuff:quiet')
    const now = new Date('2026-09-26T20:00:00.000Z')
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-quiet', phase: 'start' })
    backdate(f, 'w-quiet', minutesAgo(now, 50).toISOString())
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Quiet worker task', addressedTo: 'w-quiet' })
    f.db.prepare("UPDATE queue_tasks SET state = 'claimed', claimed_by = 'w-quiet', claimed_at = ? WHERE id = ?")
      .run(minutesAgo(now, 50).toISOString(), task.id)
    f.db.exec(`CREATE TRIGGER fail_silence_latch BEFORE UPDATE OF silence_alerted_at ON agents
      BEGIN SELECT RAISE(ABORT, 'simulated crash before latch'); END`)
    assert.throws(() => coord.scanWatchdog(f.db, f.workspaceId, { now }), /simulated crash/)
    assert.equal(messagesTo(f, 'integrator').length, 0, 'the message rolls back with the failed latch')
    assert.equal((f.db.prepare("SELECT silence_alerted_at FROM agents WHERE id = 'w-quiet'").get() as { silence_alerted_at: string | null }).silence_alerted_at, null)
    f.db.exec('DROP TRIGGER fail_silence_latch')
    assert.deepEqual(coord.scanWatchdog(f.db, f.workspaceId, { now }).alerted, ['w-quiet'])
    assert.equal(messagesTo(f, 'integrator').length, 1)
  } finally { f.cleanup() }
})

test('BR-2a: unknown reviewer accounts do not count as independent', () => {
  const f = createFixture()
  try {
    register(f, 'w-author', 'freebuff:freebucks')
    register(f, 'w-unknown', 'unknown')
    f.db.prepare("UPDATE agents SET account = NULL WHERE id = 'w-unknown'").run()
    coord.setReviewPool(f.db, f.workspaceId, ['w-unknown'])
    coord.setReviewAuto(f.db, f.workspaceId, true)
    assert.equal(coord.routeReviewForAuthor(f.db, f.workspaceId, 'w-author').routed, false)
    assert.equal(reviewTaskCount(f), 0)
  } finally { f.cleanup() }
})

test('AP03: same model family with different accounts is not independent', () => {
  const f = createFixture()
  try {
    register(f, 'w-author', 'account-a', 'gpt-6-luna')
    register(f, 'w-reviewer', 'account-b', 'gpt-5.4')
    coord.setReviewPool(f.db, f.workspaceId, ['w-reviewer'])
    coord.setReviewAuto(f.db, f.workspaceId, true)

    const result = coord.routeReviewForAuthor(f.db, f.workspaceId, 'w-author')
    assert.equal(result.routed, false)
    assert.match(result.reason, /known different model family/)
    assert.equal(reviewTaskCount(f), 0)
  } finally { f.cleanup() }
})

test('AP03: different registered model families route, while unknown and changed metadata fail closed', () => {
  const f = createFixture()
  try {
    register(f, 'w-author', 'account-a', 'gpt-6-luna')
    register(f, 'w-reviewer', 'account-b', 'claude-sonnet-4')
    coord.setReviewPool(f.db, f.workspaceId, ['w-reviewer'])
    coord.setReviewAuto(f.db, f.workspaceId, true)

    const routed = coord.routeReviewForAuthor(f.db, f.workspaceId, 'w-author')
    assert.equal(routed.routed, true)
    const queued = f.db.prepare('SELECT body FROM queue_tasks WHERE id = ?').get(routed.taskId) as { body: string }
    assert.match(queued.body, /openai \(gpt-6-luna\) -> anthropic \(claude-sonnet-4\)/)

    f.db.prepare("UPDATE agents SET model = 'custom-deployment-model' WHERE id = 'w-reviewer'").run()
    assert.deepEqual(coord.resolveReviewIndependence(f.db, 'w-author', 'w-reviewer'), {
      independent: false, reason: 'unknown-model',
    })

    f.db.prepare("UPDATE agents SET model = 'gpt-6-pro' WHERE id = 'w-reviewer'").run()
    assert.deepEqual(coord.resolveReviewIndependence(f.db, 'w-author', 'w-reviewer'), {
      independent: false, reason: 'same-model-family',
    })
  } finally { f.cleanup() }
})

test('AP03: conflicting current agent and runner model metadata is treated as stale', () => {
  const f = createFixture()
  try {
    register(f, 'w-author', 'account-a', 'gpt-6-luna')
    register(f, 'w-reviewer', 'account-b', 'claude-sonnet-4')
    coord.setRunnerProfile(f.db, { agentId: 'w-reviewer', cmd: 'node', model: 'gpt-6-luna' })
    assert.deepEqual(coord.resolveReviewIndependence(f.db, 'w-author', 'w-reviewer'), {
      independent: false, reason: 'stale-model-metadata',
    })
    coord.setReviewPool(f.db, f.workspaceId, ['w-reviewer'])
    coord.setReviewAuto(f.db, f.workspaceId, true)
    assert.equal(coord.routeReviewForAuthor(f.db, f.workspaceId, 'w-author').routed, false)
    assert.equal(reviewTaskCount(f), 0)
  } finally { f.cleanup() }
})

test('BR-2a: --after blocks a task until its predecessor is delivered, then tells the addressee', () => {
  const f = createFixture()
  try {
    register(f, 'w-one', 'freebuff:one')
    register(f, 'w-two', 'nvidia:key-01')
    const cli = (args: string[]): number => runSwarmCli(f.db, [...args, '--workspace', f.workspaceId], () => f.workspaceId)

    assert.equal(cli(['enqueue', 'Basis', '--to', 'w-one']), 0)
    const basis = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Basis'`).get() as { id: string }
    assert.equal(cli(['enqueue', 'Darauf aufbauen', '--to', 'w-two', '--after', basis.id]), 0)
    const dependent = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Darauf aufbauen'`).get() as { id: string }

    const first = coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-one', phase: 'start', claimNext: true })
    assert.equal(first.claimedTask?.id, basis.id)

    // Blocked: no offer and no claim while the predecessor is still running.
    const blocked = coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-two', phase: 'start', claimNext: true })
    assert.equal(blocked.claimedTask, null)
    assert.equal(blocked.nextTask, null, 'a blocked task must not be offered either')
    assert.equal(messagesTo(f, 'w-two').length, 0)

    // Delivery is the moment it arrives — with exactly one notice.
    mkdirSync(join(f.dir, 'review'), { recursive: true })
    writeFileSync(join(f.dir, 'review', 'BASIS.md'), 'Basis delivery evidence.\n')
    assert.equal(cli(['deliver', 'w-one', basis.id, '--path', 'review/BASIS.md']), 0)
    const told = messagesTo(f, 'w-two')
    assert.equal(told.length, 1)
    assert.match(told[0]!.subject, /Deine Aufgabe ist jetzt frei/)
    assert.match(told[0]!.body, /Darauf aufbauen/)
    assert.equal(coord.syncDependencies(f.db, f.workspaceId).length, 0, 'the release is not announced again')
    assert.equal(messagesTo(f, 'w-two').length, 1)

    const claimed = coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-two', phase: 'start', claimNext: true })
    assert.equal(claimed.claimedTask?.id, dependent.id)
    assert.equal(queueTask(f, dependent.id).state, 'claimed')
  } finally {
    f.cleanup()
  }
})

test('BR-2a: dependencies reject cross-workspace predecessors and cycles', () => {
  const f = createFixture()
  try {
    const otherWorkspace = 'ws-other'
    const otherRoot = join(f.dir, 'other')
    const first = enqueueTask(f.db, f.workspaceId, { title: 'first' })
    const second = enqueueTask(f.db, f.workspaceId, { title: 'second' })
    f.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(otherWorkspace, 'Other', otherRoot, new Date().toISOString())
    const foreignTask = enqueueTask(f.db, otherWorkspace, { title: 'foreign' })
    assert.throws(() => addTaskDependency(f.db, first.id, foreignTask.id), /same workspace/)
    addTaskDependency(f.db, second.id, first.id)
    assert.throws(() => addTaskDependency(f.db, first.id, second.id), /cycle/)
    const legacyTime = new Date().toISOString()
    f.db.prepare('INSERT INTO task_dependencies (task_id, after_task_id, created_at) VALUES (?, ?, ?)')
      .run(first.id, foreignTask.id, legacyTime)
    coord.syncDependencies(f.db, f.workspaceId)
    assert.equal(queueTask(f, first.id).state, 'cancelled', 'legacy cross-workspace edges are failed closed too')
    assert.match((f.db.prepare('SELECT body FROM queue_tasks WHERE id = ?').get(first.id) as { body: string }).body, /another workspace/i)

    const legacyA = enqueueTask(f.db, f.workspaceId, { title: 'legacy cycle A' })
    const legacyB = enqueueTask(f.db, f.workspaceId, { title: 'legacy cycle B' })
    const now = new Date().toISOString()
    f.db.prepare('INSERT INTO task_dependencies (task_id, after_task_id, created_at) VALUES (?, ?, ?)')
      .run(legacyA.id, legacyB.id, now)
    f.db.prepare('INSERT INTO task_dependencies (task_id, after_task_id, created_at) VALUES (?, ?, ?)')
      .run(legacyB.id, legacyA.id, now)
    coord.syncDependencies(f.db, f.workspaceId)
    assert.equal(queueTask(f, legacyA.id).state, 'cancelled')
    assert.equal(queueTask(f, legacyB.id).state, 'cancelled')
  } finally { f.cleanup() }
})

test('BR-2a: a deleted predecessor becomes a visible cancelled task', () => {
  const f = createFixture()
  try {
    register(f, 'w-waiter', 'freebuff:waiter')
    const predecessor = enqueueTask(f.db, f.workspaceId, { title: 'predecessor' })
    const dependent = enqueueTask(f.db, f.workspaceId, { title: 'dependent', addressedTo: 'w-waiter', afterTaskId: predecessor.id })
    f.db.prepare('DELETE FROM queue_tasks WHERE id = ?').run(predecessor.id)
    coord.syncDependencies(f.db, f.workspaceId)
    const task = f.db.prepare('SELECT state, body FROM queue_tasks WHERE id = ?').get(dependent.id) as { state: string; body: string }
    assert.equal(task.state, 'cancelled')
    assert.match(task.body, /predecessor .* no longer exists/i)
    assert.match(messagesTo(f, 'w-waiter')[0]?.body ?? '', /no longer exists/i)
  } finally { f.cleanup() }
})

test('BR-2a: a turn ended with awaiting-commit frees what waits on it — blocked does not', () => {
  const f = createFixture()
  try {
    register(f, 'w-holder', 'freebuff:holder')
    register(f, 'w-waiter', 'gemini:key-02')
    const cli = (args: string[]): number => runSwarmCli(f.db, [...args, '--workspace', f.workspaceId], () => f.workspaceId)

    assert.equal(cli(['enqueue', 'Vorlauf', '--to', 'w-holder']), 0)
    const pre = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Vorlauf'`).get() as { id: string }
    assert.equal(cli(['enqueue', 'Nachlauf', '--to', 'w-waiter', '--after', pre.id]), 0)
    const after = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Nachlauf'`).get() as { id: string }

    assert.equal(coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-holder', phase: 'start', claimNext: true }).claimedTask?.id, pre.id)

    // A blocked holder is not an arrived predecessor: the task stays out of reach.
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-holder', phase: 'end', state: 'blocked', summary: 'waiting for the owner' })
    assert.equal(coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-waiter', phase: 'start', claimNext: true }).claimedTask, null)
    assert.equal(messagesTo(f, 'w-waiter').length, 0)

    // awaiting-commit is: the holder has done all it can do alone.
    const ended = coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-holder', phase: 'end', state: 'awaiting-commit', summary: 'ready' })
    assert.deepEqual(ended.state, 'awaiting-commit')
    assert.equal(messagesTo(f, 'w-waiter').length, 1)
    assert.equal(coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-waiter', phase: 'start', claimNext: true }).claimedTask?.id, after.id)
    assert.equal(queueTask(f, after.id).claimed_by, 'w-waiter')
  } finally {
    f.cleanup()
  }
})

test('BR-2a: a stale turn end before the claim does not free what waits on it — a fresh one does', () => {
  const f = createFixture()
  try {
    register(f, 'w-holder', 'freebuff:holder')
    register(f, 'w-waiter', 'gemini:key-02')
    const cli = (args: string[]): number => runSwarmCli(f.db, [...args, '--workspace', f.workspaceId], () => f.workspaceId)
    const releasedAt = (taskId: string): string | null =>
      (f.db.prepare('SELECT released_at FROM task_dependencies WHERE task_id = ?').get(taskId) as { released_at: string | null }).released_at

    assert.equal(cli(['enqueue', 'Vorlauf', '--to', 'w-holder']), 0)
    const pre = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Vorlauf'`).get() as { id: string }
    assert.equal(cli(['enqueue', 'Nachlauf', '--to', 'w-waiter', '--after', pre.id]), 0)
    const after = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Nachlauf'`).get() as { id: string }

    // The holder's latest turn is an unrelated `needs-task` from ten minutes ago;
    // a supervisor then claims the predecessor without resetting the turn state.
    // Only the timestamp can tell that turn apart from work on this task.
    const nowMs = Date.now()
    f.db.prepare('UPDATE agents SET turn_state = ?, turn_state_at = ? WHERE id = ?')
      .run('needs-task', new Date(nowMs - 10 * 60_000).toISOString(), 'w-holder')
    const claimedIso = new Date(nowMs).toISOString()
    f.db.prepare("UPDATE queue_tasks SET state = 'claimed', claimed_by = 'w-holder', claimed_at = ?, updated_at = ? WHERE id = ?")
      .run(claimedIso, claimedIso, pre.id)

    assert.deepEqual(coord.syncDependencies(f.db, f.workspaceId), [], 'a stale turn end must not release the dependent')
    assert.equal(releasedAt(after.id), null)

    // A dependent added after the claim is locked for the same reason.
    assert.equal(cli(['enqueue', 'Nachzügler', '--to', 'w-waiter', '--after', pre.id]), 0)
    const late = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Nachzügler'`).get() as { id: string }
    assert.equal(releasedAt(late.id), null)

    // Nothing is offered to the waiter, and it is not told the task is free.
    const ping = coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-waiter', phase: 'start', claimNext: true })
    assert.equal(ping.claimedTask, null)
    assert.equal(ping.nextTask, null, 'a blocked task must not be offered')
    assert.equal(messagesTo(f, 'w-waiter').length, 0)

    // Positive control: a real turn end after the claim still releases.
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-holder', phase: 'end', state: 'awaiting-commit', summary: 'ready' })
    assert.notEqual(releasedAt(after.id), null, 'a fresh turn end after the claim releases the dependent')
  } finally {
    f.cleanup()
  }
})

test('BR-2a: review routing picks a reviewer with another account, once, and only when on', () => {
  const f = createFixture()
  try {
    register(f, 'w-author', 'freebuff:freebucks', 'gpt-6-luna')
    register(f, 'nv-review', 'nvidia:key-01', 'claude-sonnet-4')
    register(f, 'fb-review', 'freebuff:freebucks', 'gpt-5.4')
    register(f, 'owner-review', 'owner:chatgpt', 'gemini-2.5-pro')
    register(f, 'w-author-2', 'gemini:key-03', 'gemini-2.5-pro')
    register(f, 'w-author-3', 'freebuff:freebucks', 'gpt-6-luna')

    const cli = (args: string[]): number => runSwarmCli(f.db, [...args, '--workspace', f.workspaceId], () => f.workspaceId)
    // The first entry shares the author's account and must be skipped.
    assert.equal(cli(['review-pool', 'set', 'fb-review', 'nv-review', 'owner-review']), 0)
    assert.equal(cli(['review-pool', 'auto', 'on']), 0)

    assert.equal(cli(['enqueue', 'Cx01 Aufgabe', '--to', 'w-author']), 0)
    const authored = f.db.prepare(`SELECT id FROM queue_tasks WHERE title = 'Cx01 Aufgabe'`).get() as { id: string }
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author', phase: 'start', claimNext: true })
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author', phase: 'end', state: 'awaiting-commit', summary: 'fertig' })

    const reviews = f.db.prepare(`SELECT id, title, addressed_to, body FROM queue_tasks WHERE workspace_id = ? AND title LIKE 'Review:%'`)
      .all(f.workspaceId) as unknown as Array<{ id: string; title: string; addressed_to: string; body: string }>
    assert.equal(reviews.length, 1)
    assert.equal(reviews[0]!.addressed_to, 'nv-review', 'a review goes to a different account and model family')
    assert.match(reviews[0]!.title, /Review: Cx01 Aufgabe/)
    assert.match(reviews[0]!.body, /w-author/)
    assert.equal(queueTask(f, reviews[0]!.id).state, 'pending')

    // The same finished turn does not pile up review tasks.
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author', phase: 'end', state: 'awaiting-commit', summary: 'fertig' })
    assert.equal(reviewTaskCount(f), 1)

    // Switched off, nothing is routed.
    assert.equal(cli(['review-pool', 'auto', 'off']), 0)
    assert.equal(cli(['enqueue', 'Zweite Aufgabe', '--to', 'w-author-2']), 0)
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author-2', phase: 'start', claimNext: true })
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author-2', phase: 'end', state: 'awaiting-commit', summary: 'fertig' })
    assert.equal(reviewTaskCount(f), 1)

    // A pool in which every remaining reviewer shares the account routes nothing.
    assert.equal(cli(['review-pool', 'set', 'fb-review']), 0)
    assert.equal(cli(['review-pool', 'auto', 'on']), 0)
    assert.equal(cli(['enqueue', 'Dritte Aufgabe', '--to', 'w-author-3']), 0)
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author-3', phase: 'start', claimNext: true })
    coord.recordTurn(f.db, { workspaceId: f.workspaceId, agentId: 'w-author-3', phase: 'end', state: 'awaiting-commit', summary: 'fertig' })
    assert.equal(reviewTaskCount(f), 1, 'the same account cannot give an independent review')
  } finally {
    f.cleanup()
  }
})

test('BR-2a: send without a sender is refused (exit 2) instead of crediting the integrator', () => {
  const f = createFixture()
  const previous = process.env.PLUGBRAIN_AGENT
  try {
    register(f, 'w-sender', 'freebuff:sender')
    register(f, 'w-recipient', 'owner:fleet')
    const cli = (args: string[]): number => runSwarmCli(f.db, [...args, '--workspace', f.workspaceId], () => f.workspaceId)

    delete process.env.PLUGBRAIN_AGENT
    const code = cli(['send', 'w-recipient', '--subject', 'Hallo', '--body', 'ohne Absender'])
    assert.equal(code, 2)
    assert.equal(messagesTo(f, 'w-recipient').length, 0, 'the refused message must not be stored')

    process.env.PLUGBRAIN_AGENT = 'w-sender'
    assert.equal(cli(['send', 'w-recipient', '--subject', 'Hallo', '--body', 'aus der Umgebung']), 0)
    const fromEnv = f.db.prepare(`SELECT from_agent FROM inbox_messages WHERE body = 'aus der Umgebung'`).get() as { from_agent: string }
    assert.equal(fromEnv.from_agent, 'w-sender')

    assert.equal(cli(['send', 'w-recipient', '--subject', 'Hallo', '--body', 'mit Flag', '--from', 'nv-lane']), 0)
    const fromFlag = f.db.prepare(`SELECT from_agent FROM inbox_messages WHERE body = 'mit Flag'`).get() as { from_agent: string }
    assert.equal(fromFlag.from_agent, 'nv-lane', '--from wins over the environment')

    // The sender is contact: a message is proof the process is alive.
    const contact = f.db.prepare('SELECT last_contact_at FROM agents WHERE id = ?').get('w-sender') as { last_contact_at: string | null }
    assert.notEqual(contact.last_contact_at, null)
  } finally {
    if (previous === undefined) delete process.env.PLUGBRAIN_AGENT
    else process.env.PLUGBRAIN_AGENT = previous
    f.cleanup()
  }
})
