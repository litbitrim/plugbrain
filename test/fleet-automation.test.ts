import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { enqueueTask } from '../src/queue.ts'
import * as coord from '../src/coord/index.ts'
import { handleFleetAutomationEvent } from '../src/coord/fleet-automation.ts'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-ap03-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-ap03'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'AP-03', dir, new Date().toISOString())
  const register = (agentId: string, account: string) => {
    coord.registerSwarmAgent(db, { agentId, workspaceId })
    const model = agentId === 'reviewer' ? 'claude-sonnet-4' : agentId === 'integrator' ? 'gemini-2.5-pro' : 'gpt-6-luna'
    coord.registerWorkerProfile(db, { agentId, surface: 'codex-app', account, model })
  }
  register('author', 'account-author')
  register('same-account', 'account-author')
  register('reviewer', 'account-reviewer')
  register('integrator', 'account-integrator')
  coord.setReviewPool(db, workspaceId, ['same-account', 'reviewer'])
  coord.setReviewAuto(db, workspaceId, true)
  return { dir, db, workspaceId, register, close: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

const rows = (db: ReturnType<typeof openStore>, workspaceId: string) => db.prepare(
  'SELECT id, title, body, addressed_to, state FROM queue_tasks WHERE workspace_id = ? ORDER BY rowid',
).all(workspaceId) as unknown as Array<{ id: string; title: string; body: string; addressed_to: string | null; state: string }>

test('task delivery queues one independent review and repeated events are idempotent', () => {
  const f = fixture()
  try {
    const source = enqueueTask(f.db, f.workspaceId, { title: 'Implement feature', addressedTo: 'author' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author', claimed_at = ?, delivered_path = 'result.md' WHERE id = ?").run(new Date().toISOString(), source.id)
    const event = { id: '100', type: 'task.delivered', data: { taskId: source.id } }
    const first = handleFleetAutomationEvent(f.db, f.workspaceId, event)
    const repeated = handleFleetAutomationEvent(f.db, f.workspaceId, event)
    assert.equal(first.action, 'review-queued')
    assert.equal(repeated.action, 'duplicate')
    const review = rows(f.db, f.workspaceId).filter(row => row.title.startsWith('Review:'))
    assert.equal(review.length, 1)
    assert.equal(review[0]!.addressed_to, 'reviewer')
    assert.match(review[0]!.body, /Author: author/)
  } finally { f.close() }
})

test('delivery with review routing disabled raises a lead decision instead of disappearing', () => {
  const f = fixture()
  try {
    coord.setReviewAuto(f.db, f.workspaceId, false)
    const source = enqueueTask(f.db, f.workspaceId, { title: 'Implement feature', addressedTo: 'author' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author', claimed_at = ? WHERE id = ?")
      .run(new Date().toISOString(), source.id)
    const event = { id: '110', type: 'task.delivered', data: { taskId: source.id } }
    assert.equal(handleFleetAutomationEvent(f.db, f.workspaceId, event).action, 'lead-decision-required')
    assert.equal(handleFleetAutomationEvent(f.db, f.workspaceId, event).action, 'duplicate')
    assert.equal(rows(f.db, f.workspaceId).filter(row => row.title.startsWith('Review:')).length, 0)
    assert.equal(f.db.prepare('SELECT COUNT(*) AS n FROM inbox_messages WHERE workspace_id = ? AND to_agent = ?')
      .get(f.workspaceId, 'integrator')?.n, 1)
  } finally { f.close() }
})

test('review PASS creates an integration task for the integrator', () => {
  const f = fixture()
  try {
    const source = enqueueTask(f.db, f.workspaceId, { title: 'Implement feature', addressedTo: 'author' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author', claimed_at = ? WHERE id = ?").run(new Date().toISOString(), source.id)
    handleFleetAutomationEvent(f.db, f.workspaceId, { id: '101', type: 'task.delivered', data: { taskId: source.id } })
    const review = rows(f.db, f.workspaceId).find(row => row.title.startsWith('Review:'))!
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'reviewer' WHERE id = ?").run(review.id)
    f.db.prepare("INSERT INTO queue_deliveries (task_id, delivered_by, delivery_attempt, delivered_path, delivered_sha256, review_judgment, reviewed_commit, delivered_at) VALUES (?, 'reviewer', 1, 'review.md', 'hash', 'PASS', 'aabbcc', ?)")
      .run(review.id, new Date().toISOString())
    const result = handleFleetAutomationEvent(f.db, f.workspaceId, { id: '102', type: 'task.delivered', data: { taskId: review.id } })
    assert.equal(result.action, 'integration-queued')
    const integration = rows(f.db, f.workspaceId).find(row => row.title.startsWith('Integrate:'))
    assert.equal(integration?.addressed_to, 'integrator')
    assert.match(integration?.body ?? '', /reviewer/)
  } finally { f.close() }
})

test('a model-family change after routing blocks an automatic integration PASS', () => {
  const f = fixture()
  try {
    const source = enqueueTask(f.db, f.workspaceId, { title: 'Review-family drift', addressedTo: 'author' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author', claimed_at = ?, delivered_path = 'result.md' WHERE id = ?")
      .run(new Date().toISOString(), source.id)
    assert.equal(handleFleetAutomationEvent(f.db, f.workspaceId, {
      id: 'drift-source', type: 'task.delivered', data: { taskId: source.id },
    }).action, 'review-queued')

    const review = rows(f.db, f.workspaceId).find(row => row.title.startsWith('Review:'))!
    f.db.prepare("UPDATE agents SET model = 'gpt-5.4' WHERE id = 'reviewer'").run()
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'reviewer', claimed_at = ? WHERE id = ?")
      .run(new Date(Date.now() + 1000).toISOString(), review.id)
    f.db.prepare("INSERT INTO queue_deliveries (task_id, delivered_by, delivery_attempt, delivered_path, delivered_sha256, review_judgment, reviewed_commit, delivered_at) VALUES (?, 'reviewer', 1, 'review.md', 'hash', 'PASS', 'aabbcc', ?)")
      .run(review.id, new Date().toISOString())

    const result = handleFleetAutomationEvent(f.db, f.workspaceId, {
      id: 'drift-review', type: 'task.delivered', data: { taskId: review.id },
    })
    assert.equal(result.action, 'lead-decision-required')
    assert.equal(rows(f.db, f.workspaceId).some(row => row.title.startsWith('Integrate:')), false)
    assert.equal((f.db.prepare(`SELECT state FROM fleet_automation_cases WHERE workspace_id = ? AND source_task_id = ?`)
      .get(f.workspaceId, source.id) as { state: string }).state, 'awaiting-lead')
  } finally { f.close() }
})

test('blocking FAIL routes no more than two fix rounds to the author', () => {
  const f = fixture()
  try {
    const source = enqueueTask(f.db, f.workspaceId, { title: 'Implement feature', addressedTo: 'author' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author', claimed_at = ? WHERE id = ?").run(new Date().toISOString(), source.id)
    handleFleetAutomationEvent(f.db, f.workspaceId, { id: '201', type: 'task.delivered', data: { taskId: source.id } })
    let review = rows(f.db, f.workspaceId).find(row => row.title.startsWith('Review:'))!
    for (let round = 1; round <= 3; round++) {
      f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'reviewer', claimed_at = ? WHERE id = ?").run(new Date(Date.now() + round * 1000).toISOString(), review.id)
      f.db.prepare("INSERT OR REPLACE INTO queue_deliveries (task_id, delivered_by, delivery_attempt, delivered_path, delivered_sha256, review_judgment, reviewed_commit, delivered_at) VALUES (?, 'reviewer', 1, 'review.md', 'hash', 'FAIL', 'aabbcc', ?)")
        .run(review.id, new Date().toISOString())
      const result = handleFleetAutomationEvent(f.db, f.workspaceId, { id: String(201 + round), type: 'task.delivered', data: { taskId: review.id } })
      if (round < 3) {
        assert.equal(result.action, 'fix-queued')
        const fix = rows(f.db, f.workspaceId).find(row => row.title.includes(`round ${round} of 2`))!
        f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author', claimed_at = ? WHERE id = ?").run(new Date(Date.now() + round * 1000 + 1).toISOString(), fix.id)
        assert.equal(handleFleetAutomationEvent(f.db, f.workspaceId, {
          id: `fix-${round}`, type: 'task.delivered', data: { taskId: fix.id },
        }).action, 'review-queued')
        review = rows(f.db, f.workspaceId).filter(row => row.title.startsWith('Review:')).at(-1)!
      } else assert.equal(result.action, 'lead-decision-required')
    }
    const fixes = rows(f.db, f.workspaceId).filter(row => row.title.startsWith('Fix:'))
    assert.equal(fixes.length, 2)
    assert.ok(fixes.every(row => row.addressed_to === 'author'))
  } finally { f.close() }
})

test('ordinary silence is ignored and a blocked turn with held work wakes the lead once', () => {
  const f = fixture()
  try {
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Blocked task', addressedTo: 'author' })
    const quiet = handleFleetAutomationEvent(f.db, f.workspaceId, {
      id: '301', type: 'watchdog.silent', data: { agentId: 'author' },
    })
    assert.equal(quiet.action, 'ignored')
    assert.equal(handleFleetAutomationEvent(f.db, f.workspaceId, {
      id: '301', type: 'watchdog.silent', data: { agentId: 'author' },
    }).action, 'duplicate')
    f.db.prepare("UPDATE queue_tasks SET state = 'claimed', claimed_by = 'author', claimed_at = ? WHERE id = ?").run(new Date().toISOString(), task.id)
    const blocked = handleFleetAutomationEvent(f.db, f.workspaceId, {
      id: '302', type: 'agent.turn', data: { agentId: 'author', state: 'blocked', taskId: task.id },
    })
    assert.equal(blocked.action, 'lead-decision-required')
    assert.equal(handleFleetAutomationEvent(f.db, f.workspaceId, {
      id: '302', type: 'agent.turn', data: { agentId: 'author', state: 'blocked', taskId: task.id },
    }).action, 'duplicate')
    const messages = f.db.prepare('SELECT subject FROM inbox_messages WHERE workspace_id = ? AND to_agent = ?')
      .all(f.workspaceId, 'integrator') as Array<{ subject: string }>
    assert.equal(messages.length, 1)
  } finally { f.close() }
})

test('watchdog silence wakes the lead only when work is held and does so once per quiet case', () => {
  const f = fixture()
  try {
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Stalled task', addressedTo: 'author' })
    const now = new Date('2026-09-27T12:00:00.000Z')
    f.db.prepare("UPDATE agents SET turn_state = 'working', turn_state_at = ?, last_contact_at = NULL WHERE id = 'author'")
      .run(new Date(now.getTime() - 60 * 60_000).toISOString())
    assert.deepEqual(coord.scanWatchdog(f.db, f.workspaceId, { now }).alerted, [])
    assert.equal(rows(f.db, f.workspaceId).filter(row => row.state === 'claimed').length, 0)
    const claimAt = new Date(now.getTime() - 60 * 60_000).toISOString()
    f.db.prepare("UPDATE queue_tasks SET state = 'claimed', claimed_by = 'author', claimed_at = ? WHERE id = ?")
      .run(claimAt, task.id)
    f.db.prepare("UPDATE agents SET turn_state = 'working', turn_state_at = ?, last_contact_at = NULL, silence_alerted_at = NULL WHERE id = 'author'")
      .run(claimAt)
    assert.deepEqual(coord.scanWatchdog(f.db, f.workspaceId, { now }).alerted, ['author'])
    assert.deepEqual(coord.scanWatchdog(f.db, f.workspaceId, { now: new Date(now.getTime() + 1_000) }).alerted, [])
    const messages = f.db.prepare('SELECT subject FROM inbox_messages WHERE workspace_id = ? AND to_agent = ?')
      .all(f.workspaceId, 'integrator') as Array<{ subject: string }>
    assert.equal(messages.length, 1)
    assert.match(messages[0]!.subject, /Stalled task/)
  } finally { f.close() }
})
