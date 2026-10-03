/**
 * The report is a fixture-DB contract test: every section is fed synthetic,
 * clearly labelled rows (workspace `ws-report`, workers `lane-a`…) so the test
 * never touches the live store. A second test runs the real CLI twice against a
 * throwaway store to pin the `--json` shape.
 */
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'
import test from 'node:test'
import { buildSwarmReport } from '../src/coord/report.ts'
import { ensureSupervisorSchema } from '../src/coord/supervisor.ts'
import { ensureSwarmOpsSchema } from '../src/coord/swarm-ops.ts'
import { workspaceIdFor } from '../src/planet.ts'
import { openStore } from '../src/store/schema.ts'

const WS = 'ws-report'
const NOW = new Date('2026-10-03T12:00:00.000Z')
const SINCE = '2026-10-03T11:00:00.000Z'

function fixture(): DatabaseSync {
  const db = openStore(':memory:')
  ensureSwarmOpsSchema(db)
  ensureSupervisorSchema(db)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'Report fixture', 'C:/fixture/report', '2026-10-03T09:00:00.000Z')

  const agent = db.prepare(`INSERT INTO agents (id, name, color, hue, first_seen, last_seen, workspace_id, turn_state, turn_summary, retired_at)
    VALUES (?, ?, 'grey', 0, ?, ?, ?, ?, ?, ?)`)
  agent.run('lane-a', 'Lane A', '2026-10-03T09:00:00.000Z', '2026-10-03T11:59:00.000Z', WS, 'working', null, null)
  agent.run('lane-b', 'Lane B', '2026-10-03T09:00:00.000Z', '2026-10-03T11:59:00.000Z', WS, 'needs-task', null, null)
  agent.run('lane-c', 'Lane C', '2026-10-03T09:00:00.000Z', '2026-10-03T11:59:00.000Z', WS, 'blocked', 'Runner exit 3\nmore', null)
  agent.run('lane-d', 'Lane D', '2026-10-03T09:00:00.000Z', '2026-10-03T11:59:00.000Z', WS, 'offline', null, '2026-10-03T10:00:00.000Z')
  agent.run('integrator', 'Integrator', '2026-10-03T09:00:00.000Z', '2026-10-03T11:59:00.000Z', WS, 'offline', null, '2026-10-03T09:30:00.000Z')

  const task = db.prepare(`INSERT INTO queue_tasks
    (id, workspace_id, title, body, addressed_to, requested_by, state, claimed_by, claimed_at,
     delivered_path, delivered_summary, created_at, updated_at, priority, superseded_by)
    VALUES (?, ?, ?, '', ?, 'integrator', ?, ?, ?, ?, null, ?, ?, ?, null)`)
  task.run('task-run', WS, 'Laufende Aufgabe', 'lane-a', 'claimed', 'lane-a', '2026-10-03T10:00:00.000Z', null, '2026-10-03T10:00:00.000Z', '2026-10-03T10:00:00.000Z', 0)
  task.run('task-ready', WS, 'Bereite Aufgabe', 'lane-b', 'pending', null, null, null, '2026-10-03T10:01:00.000Z', '2026-10-03T10:01:00.000Z', 0)
  task.run('task-blocked', WS, 'Wartende Aufgabe', 'lane-c', 'pending', null, null, null, '2026-10-03T10:02:00.000Z', '2026-10-03T10:02:00.000Z', 3)
  task.run('task-next', WS, 'Nächste Aufgabe', null, 'pending', null, null, null, '2026-10-03T10:03:00.000Z', '2026-10-03T10:03:00.000Z', 5)
  task.run('task-delivered', WS, 'Geliefert ohne Review', null, 'delivered', 'lane-b', '2026-10-03T10:04:00.000Z', 'out/delivered.md', '2026-10-03T10:04:00.000Z', '2026-10-03T11:10:00.000Z', 0)
  task.run('task-reviewed', WS, 'Geliefert mit PASS', null, 'delivered', 'lane-b', '2026-10-03T10:05:00.000Z', 'out/reviewed.md', '2026-10-03T10:05:00.000Z', '2026-10-03T11:45:00.000Z', 0)

  db.prepare(`INSERT INTO task_dependencies (task_id, after_task_id, released_at, announced_at, created_at)
    VALUES ('task-blocked', 'task-run', NULL, NULL, '2026-10-03T10:02:30.000Z')`).run()

  const delivery = db.prepare(`INSERT INTO queue_deliveries
    (task_id, delivered_by, delivery_attempt, source_revision, delivered_path, delivered_sha256, review_judgment, reviewed_commit, delivered_at)
    VALUES (?, 'lane-b', 1, ?, ?, ?, ?, ?, ?)`)
  delivery.run('task-delivered', 'a'.repeat(40), 'out/delivered.md', 'hash-a', null, null, '2026-10-03T11:10:00.000Z')
  delivery.run('task-reviewed', 'b'.repeat(40), 'out/reviewed.md', 'hash-b', 'PASS', 'b'.repeat(40), '2026-10-03T11:45:00.000Z')

  db.prepare(`INSERT INTO queue_task_events (id, workspace_id, task_id, operation, by_agent, old_value, new_value, note, occurred_at)
    VALUES ('qevent-1', ?, 'task-next', 'priority', 'integrator', '0', '5', 'Bitte zuerst', '2026-10-03T11:00:00.000Z')`).run(WS)

  db.prepare(`INSERT INTO worker_supervisors
    (agent_id, supervisor_id, pid, started_at, active, current_task_id, attempt, last_failure, updated_at)
    VALUES ('lane-a', 'sup-test', 4242, '2026-10-03T10:00:00.000Z', 1, 'task-run', 2, null, '2026-10-03T11:59:00.000Z')`).run()
  db.prepare(`INSERT INTO worker_task_attempts
    (task_id, agent_id, attempt, attempt_token, run_id, started_at, ended_at, outcome)
    VALUES ('task-run', 'lane-a', 2, 'tok-2', 'run-2', '2026-10-03T11:20:00.000Z', null, null)`).run()
  // Outside the window: must not be counted.
  db.prepare(`INSERT INTO worker_task_attempts
    (task_id, agent_id, attempt, attempt_token, run_id, started_at, ended_at, outcome)
    VALUES ('task-delivered', 'lane-b', 2, 'tok-old', 'run-old', '2026-10-03T09:00:00.000Z', '2026-10-03T09:05:00.000Z', 'crash')`).run()

  return db
}

test('the report reads every section from a synthetic fixture store', () => {
  const db = fixture()
  try {
    const report = buildSwarmReport(db, WS, { since: SINCE, now: NOW })

    assert.equal(report.workspaceId, WS)
    assert.equal(report.generatedAt, NOW.toISOString())
    assert.equal(report.since, SINCE)

    assert.equal(report.lastDelivery?.taskId, 'task-reviewed')
    assert.equal(report.lastDelivery?.reviewJudgment, 'PASS')
    assert.equal(report.lastDelivery?.deliveredBy, 'lane-b')

    assert.equal(report.nextTask?.id, 'task-next', 'highest-priority unblocked pending task wins')
    assert.equal(report.nextTask?.priority, 5)

    assert.deepEqual(report.openReviews.map(row => row.taskId), ['task-delivered'])
    assert.equal(report.openReviews[0]?.reviewJudgment, null)
    assert.deepEqual(report.integrationBacklog.map(row => row.id), ['task-delivered', 'task-reviewed'])
    assert.deepEqual(report.integrationBacklog.map(row => row.waitingOn), [[], []])

    assert.equal(report.automaticReruns.length, 1)
    assert.equal(report.automaticReruns[0]?.taskId, 'task-run')
    assert.equal(report.automaticReruns[0]?.attempt, 2)
    assert.equal(report.counts.automaticReruns, 1, 'older attempts outside the window are not counted')

    assert.equal(report.lastManualInput.operation, 'priority')
    assert.equal(report.lastManualInput.byAgent, 'integrator')
    assert.equal(report.lastManualInput.ageMinutes, 60)

    assert.deepEqual(report.counts, {
      pending: 3, claimed: 1, delivered: 2, openReviews: 1, integrationBacklog: 2, automaticReruns: 1,
    })

    const lanes = Object.fromEntries(report.lanes.map(lane => [lane.agentId, lane]))
    assert.deepEqual(Object.keys(lanes).sort(), ['lane-a', 'lane-b', 'lane-c'], 'retired lane-d is not a lane')
    assert.equal(lanes['lane-a']?.reason, 'arbeitet an task-run')
    assert.equal(lanes['lane-a']?.waiting, false)
    assert.equal(lanes['lane-a']?.readyTasks, 0)
    assert.equal(lanes['lane-b']?.reason, '1 bereite Aufgabe(n) warten')
    assert.equal(lanes['lane-b']?.readyTasks, 1)
    assert.equal(lanes['lane-c']?.reason, 'blockiert: Runner exit 3')
    assert.equal(lanes['lane-c']?.blockedTasks, 1)
    assert.equal(lanes['lane-c']?.turnSummary?.split('\n').length, 2, 'the full summary is kept, only the reason is trimmed')
  } finally { db.close() }
})

test('the report JSON shape is stable and round-trips', () => {
  const db = fixture()
  try {
    const report = buildSwarmReport(db, WS, { since: SINCE, now: NOW })
    const json = JSON.stringify(report, null, 2)
    assert.deepEqual(JSON.parse(json), report)
    assert.deepEqual(Object.keys(report), [
      'workspaceId', 'generatedAt', 'since', 'lastDelivery', 'nextTask', 'lanes',
      'openReviews', 'integrationBacklog', 'automaticReruns', 'lastManualInput', 'counts',
    ])
    const again = buildSwarmReport(db, WS, { since: SINCE, now: NOW })
    assert.deepEqual(JSON.parse(JSON.stringify(again)), report, 'the same store answers identically')
  } finally { db.close() }
})

const CLI = fileURLToPath(new URL('../src/cli.ts', import.meta.url))

test('swarm report --json is stable through the real CLI', () => {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-swarm-report-'))
  const root = join(home, 'root')
  mkdirSync(root)
  const run = (...args: string[]): { code: number | null; out: string; err: string } => {
    const result = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', CLI, ...args], {
      env: { ...process.env, PLUGBRAIN_HOME: home, PLUGBRAIN_NO_DAEMON: '1' },
      encoding: 'utf8', timeout: 60_000, windowsHide: true,
    })
    return { code: result.status, out: result.stdout, err: result.stderr }
  }
  try {
    const ws = workspaceIdFor(root)
    assert.equal(run('register', root, 'swarm-report').code, 0)
    assert.equal(run('swarm', 'report', '--workspace', ws, '--json').code, 0)
    const first = run('swarm', 'report', '--workspace', ws, '--json')
    const second = run('swarm', 'report', '--workspace', ws, '--json')
    assert.equal(first.code, 0, first.err)
    assert.equal(second.code, 0, second.err)
    const a = JSON.parse(first.out) as Record<string, unknown>
    const b = JSON.parse(second.out) as Record<string, unknown>
    assert.deepEqual(Object.keys(a), Object.keys(b), 'the JSON shape does not drift between runs')
    assert.equal(a.workspaceId, ws)
    assert.equal(a.lastDelivery, null)
    assert.equal(a.nextTask, null)
    assert.deepEqual(a.counts, { pending: 0, claimed: 0, delivered: 0, openReviews: 0, integrationBacklog: 0, automaticReruns: 0 })
    assert.equal(typeof a.lastManualInput, 'object')
    assert.equal(run('swarm', 'report', '--workspace', ws).code, 0, 'the human view renders too')
  } finally { rmSync(home, { recursive: true, force: true }) }
})
