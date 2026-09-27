import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { openStore } from '../src/store/schema.ts'
import { workspaceIdFor } from '../src/planet.ts'
import { acquireLease, registerSwarmAgent, releaseLease, sendMessage } from '../src/coord/index.ts'
import { recordTurn, registerWorkerProfile } from '../src/coord/swarm-ops.ts'
import { reportQuota } from '../src/coord/resources.ts'
import { claimNextTask, deliverTask, enqueueTask, ensureQueueSchema } from '../src/queue.ts'
import { buildSwarmChronicle, formatSwarmChronicleMarkdown } from '../src/coord/chronicle.ts'
import { getSwarmNextActions } from '../src/coord/next-actions.ts'

const WS = 'ws-swarm-chronicle'
const GB = 1024 ** 3
const roomy = {
  measuredAt: new Date().toISOString(),
  drives: [{ root: 'C:\\', freeBytes: 120 * GB, totalBytes: 900 * GB }],
  memory: { freeBytes: 12 * GB, totalBytes: 32 * GB },
  cpuBusyFraction: 0,
}
const CLI = fileURLToPath(new URL('../src/cli.ts', import.meta.url))

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-chronicle-'))
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'chronicle-demo', join(dir, 'root'), new Date().toISOString())
  const worker = (id: string, account = 'owner:chatgpt') => {
    registerSwarmAgent(db, { agentId: id, name: id, workspaceId: WS })
    return registerWorkerProfile(db, { agentId: id, surface: 'freebuff', account })
  }
  return { dir, db, worker, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('swarm chronicle orders stored queue, message, lease, and quota events and names missing turn history', () => {
  const f = fixture()
  try {
    f.worker('worker-a')
    registerSwarmAgent(f.db, { agentId: 'integrator', workspaceId: WS })
    const task = enqueueTask(f.db, WS, { title: 'Build chronicle', requestedBy: 'integrator' })
    const credentialLikeTitle = 'Imported record sk-' + 'x'.repeat(36)
    enqueueTask(f.db, WS, { title: credentialLikeTitle, requestedBy: 'integrator' })
    assert.ok(claimNextTask(f.db, WS, 'worker-a'))
    deliverTask(f.db, task.id, 'worker-a', 'closeout/chronicle.md', 'Finished the chronicle implementation')
    sendMessage(f.db, { workspaceId: WS, fromAgent: 'integrator', toAgent: 'worker-a', subject: 'Review', body: 'Please review' })
    recordTurn(f.db, { workspaceId: WS, agentId: 'worker-a', phase: 'start' })
    const lease = acquireLease(f.db, WS, { agentId: 'worker-a', taskId: task.id, paths: ['src/a.ts'] })
    assert.equal(lease.acquired, true)
    if (lease.lease) releaseLease(f.db, { agentId: 'worker-a', workspaceId: WS, leaseId: lease.lease.id })
    reportQuota(f.db, { account: 'owner:chatgpt', remaining: 10, unit: 'percent', reportedBy: 'integrator' })

    const chronicle = buildSwarmChronicle(f.db, WS, { since: '2h' })
    for (const type of ['task.enqueued', 'task.claimed', 'task.delivered', 'message.sent', 'message.delivered',
      'lease.acquired', 'lease.released', 'quota.reported']) {
      assert.ok(chronicle.events.some(event => event.type === type), `missing ${type}`)
    }
    assert.equal(chronicle.events.find(event => event.type === 'task.delivered')?.summary, 'Finished the chronicle implementation')
    assert.ok(chronicle.events.some(event => event.type === 'task.enqueued' && event.title === 'Imported record [REDACTED]'))
    assert.equal(JSON.stringify(chronicle).includes('sk-' + 'x'.repeat(36)), false)
    assert.deepEqual(chronicle.events.map(event => Date.parse(event.at)),
      [...chronicle.events.map(event => Date.parse(event.at))].sort((a, b) => a - b))
    assert.ok((chronicle.events.find(event => event.type === 'task.claimed')?.waitMs ?? -1) >= 0)
    assert.ok(chronicle.missingSources.some(source => /turn/i.test(source)))
  } finally { f.cleanup() }
})

test('swarm chronicle caps source reads and reports omitted history', () => {
  const f = fixture()
  try {
    ensureQueueSchema(f.db)
    const now = new Date().toISOString()
    const insert = f.db.prepare(`INSERT INTO queue_tasks
      (id, workspace_id, title, body, state, created_at, updated_at)
      VALUES (?, ?, ?, '', 'pending', ?, ?)`)
    for (let index = 0; index < 520; index += 1) {
      insert.run(`task-cap-${index}`, WS, `Task ${index}`, now, now)
    }
    const chronicle = buildSwarmChronicle(f.db, WS, { since: '365d' })
    assert.ok(chronicle.events.length <= 1000)
    assert.equal(chronicle.truncated, true)
    assert.equal(chronicle.sourceRowCapReached, true)
    assert.match(formatSwarmChronicleMarkdown(chronicle), /Weitere Ereignisse ausgelassen/)
  } finally { f.cleanup() }
})

test('swarm next actions suggest review, offer, delivery, integrator inbox, disk, and quota work by urgency', () => {
  const f = fixture()
  try {
    f.worker('review-waiter')
    f.worker('idle-worker')
    f.worker('stale-holder')
    registerSwarmAgent(f.db, { agentId: 'integrator', workspaceId: WS })
    recordTurn(f.db, { workspaceId: WS, agentId: 'review-waiter', phase: 'end', state: 'awaiting-commit', summary: 'Ready' })
    recordTurn(f.db, { workspaceId: WS, agentId: 'idle-worker', phase: 'end', state: 'needs-task', summary: 'Free' })
    const held = enqueueTask(f.db, WS, { title: 'Finish implementation' })
    assert.ok(claimNextTask(f.db, WS, 'stale-holder'))
    recordTurn(f.db, { workspaceId: WS, agentId: 'stale-holder', phase: 'end', state: 'needs-task', summary: 'Done' })
    enqueueTask(f.db, WS, { title: 'Next queued work' })
    sendMessage(f.db, { workspaceId: WS, fromAgent: 'review-waiter', toAgent: 'integrator', subject: 'Need review', body: 'Ready' })
    reportQuota(f.db, { account: 'owner:chatgpt', remaining: 0, unit: 'percent', reportedBy: 'integrator' })

    const tightHost = { ...roomy, drives: [{ root: 'C:\\', freeBytes: 3 * GB, totalBytes: 900 * GB }] }
    const actions = getSwarmNextActions(f.db, WS, { host: tightHost })
    const ids = actions.map(action => action.id)
    for (const id of ['review:review-waiter', 'offer:idle-worker', `deliver:${held.id}`, 'inbox:integrator', 'admission:test', 'quota:owner:chatgpt']) {
      assert.ok(ids.includes(id), `missing ${id}`)
    }
    assert.deepEqual(actions.map(action => action.priority), [...actions.map(action => action.priority)].sort((a, b) => a - b))
    assert.ok(actions.every(action => action.command.trim().length > 0 && action.reason.trim().length > 0))
  } finally { f.cleanup() }
})

test('swarm next actions omit rules whose conditions are absent', () => {
  const f = fixture()
  try {
    f.worker('quiet-worker')
    f.worker('reviewer')
    f.worker('other-worker')
    f.worker('holder')
    f.worker('needs-no-match')
    registerSwarmAgent(f.db, { agentId: 'integrator', workspaceId: WS })
    recordTurn(f.db, { workspaceId: WS, agentId: 'reviewer', phase: 'end', state: 'awaiting-commit' })
    enqueueTask(f.db, WS, { title: 'Review reviewer change', addressedTo: 'quiet-worker' })
    recordTurn(f.db, { workspaceId: WS, agentId: 'holder', phase: 'start' })
    const held = enqueueTask(f.db, WS, { title: 'Held task', addressedTo: 'holder' })
    assert.ok(claimNextTask(f.db, WS, 'holder'))
    recordTurn(f.db, { workspaceId: WS, agentId: 'needs-no-match', phase: 'end', state: 'needs-task' })
    enqueueTask(f.db, WS, { title: 'Not for this worker', addressedTo: 'other-worker' })
    sendMessage(f.db, { workspaceId: WS, fromAgent: 'reviewer', toAgent: 'integrator', subject: 'Already handled', body: 'Read' })
    f.db.prepare('UPDATE inbox_messages SET read_at = ? WHERE to_agent = ?').run(new Date().toISOString(), 'integrator')
    reportQuota(f.db, { account: 'owner:chatgpt', remaining: 50, unit: 'percent', reportedBy: 'integrator' })
    const actions = getSwarmNextActions(f.db, WS, { host: roomy })
    assert.deepEqual(actions, [])
    assert.equal(f.db.prepare('SELECT state FROM queue_tasks WHERE id = ?').get(held.id)?.state, 'claimed')
  } finally { f.cleanup() }
})

test('turn end delivers a claimed task only when --deliver is supplied', () => {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-turn-deliver-'))
  const root = join(home, 'root')
  mkdirSync(root)
  const workspace = workspaceIdFor(root)
  const run = (...args: string[]) => {
    const result = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', CLI, ...args], {
      env: { ...process.env, PLUGBRAIN_HOME: home, PLUGBRAIN_NO_DAEMON: '1' },
      encoding: 'utf8', timeout: 60_000,
    })
    return { code: result.status, out: result.stdout, err: result.stderr }
  }
  try {
    assert.equal(run('register', root, 'swarm-deliver').code, 0)
    for (const agent of ['worker-deliver', 'worker-keep']) {
      const registration = run('swarm', 'register', agent, '--surface', 'freebuff', '--account', 'owner:chatgpt', '--workspace', workspace)
      assert.equal(registration.code, 0, registration.err || registration.out)
    }
    const deliveredTask = run('swarm', 'enqueue', 'Delivered work', '--to', 'worker-deliver', '--workspace', workspace)
    assert.equal(deliveredTask.code, 0, deliveredTask.err)
    const keptTask = run('swarm', 'enqueue', 'Still claimed work', '--to', 'worker-keep', '--workspace', workspace)
    assert.equal(keptTask.code, 0, keptTask.err)
    assert.equal(run('swarm', 'turn', 'worker-deliver', 'start', '--claim', '--workspace', workspace).code, 0)
    assert.equal(run('swarm', 'turn', 'worker-keep', 'start', '--claim', '--workspace', workspace).code, 0)
    mkdirSync(join(root, 'closeout'), { recursive: true })
    writeFileSync(join(root, 'closeout', 'DELIVER.md'), 'Finished.\n')
    const delivered = run('swarm', 'turn', 'worker-deliver', 'end', '--state', 'awaiting-commit', '--summary', 'Finished', '--deliver', 'closeout/DELIVER.md', '--workspace', workspace, '--json')
    assert.equal(delivered.code, 0, delivered.err)
    const kept = run('swarm', 'turn', 'worker-keep', 'end', '--state', 'needs-task', '--summary', 'No evidence yet', '--workspace', workspace, '--json')
    assert.equal(kept.code, 0, kept.err)
    const chronicle = run('swarm', 'chronik', '--since', '2h', '--workspace', workspace, '--json')
    assert.equal(chronicle.code, 0, chronicle.err)
    const events = (JSON.parse(chronicle.out) as { events: Array<{ type: string; title?: string; evidence?: string; summary?: string }> }).events
    assert.ok(events.some(event => event.type === 'task.delivered' && event.evidence === 'closeout/DELIVER.md' && event.summary === 'Finished'))
    assert.ok(!events.some(event => event.type === 'task.delivered' && event.title === 'Still claimed work'))
    const next = run('swarm', 'board', '--next', '--workspace', workspace, '--json')
    assert.equal(next.code, 0, next.err)
    const actions = JSON.parse(next.out) as Array<{ id: string }>
    const keptId = /eingereiht (task-[0-9a-f-]+)/.exec(keptTask.out)?.[1]
    assert.ok(keptId)
    assert.ok(actions.some(action => action.id === `deliver:${keptId}`))
    assert.ok(!actions.some(action => action.id === `deliver:${/eingereiht (task-[0-9a-f-]+)/.exec(deliveredTask.out)?.[1]}`))
    const board = run('swarm', 'board', '--workspace', workspace, '--json')
    assert.equal(board.code, 0, board.err)
    assert.ok(Array.isArray((JSON.parse(board.out) as { nextActions?: unknown }).nextActions))
    const markdown = run('swarm', 'chronik', '--since', '2h', '--workspace', workspace)
    assert.equal(markdown.code, 0, markdown.err)
    assert.match(markdown.out, /^# Swarm-Chronik/)
    assert.match(markdown.out, /Turn-Verlauf erst ab Version mit Turn-Historie/)
  } finally { rmSync(home, { recursive: true, force: true }) }
})
