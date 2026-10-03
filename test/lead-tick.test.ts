/**
 * `plugbrain swarm lead-tick` on a synthetic store.
 *
 * Every worker, task and receipt here is invented and labelled; the store is a
 * throwaway temp database, never the live Brain. The last test also runs the
 * real CLI process so the dispatch and the `--json` contract are covered.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { openStore } from '../src/store/schema.ts'
import { enqueueTask } from '../src/queue.ts'
import { registerSwarmAgent } from '../src/coord/registry.ts'
import { registerWorkerProfile } from '../src/coord/swarm-ops.ts'
import { handleFleetAutomationEvent } from '../src/coord/fleet-automation.ts'
import { computeLeadTick, type LeadTickWave } from '../src/coord/lead-tick.ts'

const CLI = fileURLToPath(new URL('../src/cli.ts', import.meta.url))
const SHA = 'a1b2c3d4e5f60718293a4b5c6d7e8f9012345678'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-lead-tick-'))
  const db = openStore(join(dir, 'plugbrain.db'))
  const workspaceId = 'ws-lead-tick'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'LEAD-TICK', dir, new Date().toISOString())
  const register = (agentId: string, account: string) => {
    registerSwarmAgent(db, { agentId, workspaceId })
    registerWorkerProfile(db, { agentId, surface: 'native', account })
  }
  register('author-1', 'pool-author')
  register('reviewer-2', 'pool-review')
  register('idle-3', 'pool-idle')
  register('blocked-4', 'pool-blocked')
  handleFleetAutomationEvent(db, workspaceId, { type: 'noop', data: {} }) // create the automation tables
  const setTurn = (agentId: string, state: string, summary: string) => db
    .prepare('UPDATE agents SET turn_state = ?, turn_summary = ? WHERE id = ?').run(state, summary, agentId)
  return {
    dir, db, workspaceId, register, setTurn,
    close: () => { db.close(); rmSync(dir, { recursive: true, force: true }) },
  }
}

/** A deterministic dump of every user table — the no-write proof. */
function dumpAll(db: ReturnType<typeof openStore>): string {
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    .all() as unknown as Array<{ name: string }>
  const out: Record<string, unknown[]> = {}
  for (const { name } of tables) {
    // Some tables are WITHOUT ROWID and ordering therefore has to happen in JS.
    const rows = db.prepare(`SELECT * FROM "${name}"`).all() as unknown as unknown[]
    out[name] = rows.slice().sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)))
  }
  return JSON.stringify(out)
}

test('a needs-task worker without a claimable task is reported and disappears once work is queued', () => {
  const f = fixture()
  try {
    f.setTurn('idle-3', 'needs-task', 'fertig')
    const before = computeLeadTick(f.db, f.workspaceId)
    assert.deepEqual(before.starvingWorkers.map(row => row.agentId), ['idle-3'])

    enqueueTask(f.db, f.workspaceId, { title: 'Open task', addressedTo: 'idle-3' })
    const after = computeLeadTick(f.db, f.workspaceId)
    assert.deepEqual(after.starvingWorkers, [])
  } finally { f.close() }
})

test('a task addressed to nobody still counts as ready work for every idle worker', () => {
  const f = fixture()
  try {
    f.setTurn('idle-3', 'needs-task', 'fertig')
    enqueueTask(f.db, f.workspaceId, { title: 'Unaddressed work' })
    assert.deepEqual(computeLeadTick(f.db, f.workspaceId).starvingWorkers, [])
  } finally { f.close() }
})

test('a blocked worker is reported with its turn reason and the held task', () => {
  const f = fixture()
  try {
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Stalled', addressedTo: 'blocked-4' })
    f.db.prepare("UPDATE queue_tasks SET state = 'claimed', claimed_by = 'blocked-4', claimed_at = ? WHERE id = ?")
      .run(new Date().toISOString(), task.id)
    f.setTurn('blocked-4', 'blocked', 'Runner exited without a turn end')
    const blocked = computeLeadTick(f.db, f.workspaceId).blockedWorkers
    assert.equal(blocked.length, 1)
    assert.equal(blocked[0]!.agentId, 'blocked-4')
    assert.equal(blocked[0]!.reason, 'Runner exited without a turn end')
    assert.equal(blocked[0]!.heldTask, task.id)
  } finally { f.close() }
})

test('only a FAIL that returns after FIX1 becomes a quarantine proposal', () => {
  const f = fixture()
  try {
    const source = enqueueTask(f.db, f.workspaceId, { title: 'Source work', addressedTo: 'author-1' })
    const review = enqueueTask(f.db, f.workspaceId, { title: 'Review: Source work', addressedTo: 'reviewer-2' })
    f.db.prepare(`INSERT INTO fleet_automation_cases
      (workspace_id, source_task_id, author_id, fix_round, state, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .run(f.workspaceId, source.id, 'author-1', 1, 'awaiting-lead', new Date().toISOString(), new Date().toISOString())
    f.db.prepare(`INSERT INTO fleet_automation_tasks (workspace_id, task_id, source_task_id, role) VALUES (?, ?, ?, 'review')`)
      .run(f.workspaceId, review.id, source.id)
    f.db.prepare(`INSERT INTO queue_deliveries
      (task_id, delivered_by, delivery_attempt, delivered_path, delivered_sha256, review_judgment, delivered_at)
      VALUES (?, 'reviewer-2', 1, 'review.md', 'hash', 'FAIL', ?)`).run(review.id, new Date().toISOString())

    const proposals = computeLeadTick(f.db, f.workspaceId).quarantineProposals
    assert.equal(proposals.length, 1)
    assert.equal(proposals[0]!.sourceTaskId, source.id)
    assert.equal(proposals[0]!.authorId, 'author-1')
    assert.equal(proposals[0]!.fixRound, 1)
    assert.equal(proposals[0]!.reviewTaskId, review.id)

    // The same FAIL before any fix round is the normal first bounce, not a quarantine.
    f.db.prepare('UPDATE fleet_automation_cases SET fix_round = 0 WHERE source_task_id = ?').run(source.id)
    assert.deepEqual(computeLeadTick(f.db, f.workspaceId).quarantineProposals, [])
  } finally { f.close() }
})

test('a PASS delivery becomes a merge candidate with branch and full commit from the result file', () => {
  const f = fixture()
  try {
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Ship feature', addressedTo: 'author-1' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author-1', delivered_path = 'result.md' WHERE id = ?")
      .run(task.id)
    f.db.prepare(`INSERT INTO queue_deliveries
      (task_id, delivered_by, delivery_attempt, source_revision, delivered_path, delivered_sha256, review_judgment, delivered_at)
      VALUES (?, 'author-1', 1, NULL, 'result.md', 'hash', 'PASS', ?)`).run(task.id, new Date().toISOString())
    writeFileSync(join(f.dir, 'result.md'), `# Result\n\nBranch: w01/ship-feature-20261003\nCommit: **${SHA}**\nUrteil: PASS\n`)

    const candidates = computeLeadTick(f.db, f.workspaceId, { workspaceRoot: f.dir }).mergeCandidates
    assert.equal(candidates.length, 1)
    assert.equal(candidates[0]!.taskId, task.id)
    assert.equal(candidates[0]!.branch, 'w01/ship-feature-20261003')
    assert.equal(candidates[0]!.commit, SHA)
    assert.equal(candidates[0]!.commitSource, 'result-file')

    // A missing result file falls back to the receipt's recorded revision, clearly labelled.
    f.db.prepare("UPDATE queue_tasks SET delivered_path = 'gone.md' WHERE id = ?").run(task.id)
    f.db.prepare("UPDATE queue_deliveries SET delivered_path = 'gone.md', source_revision = ? WHERE task_id = ?").run(SHA, task.id)
    const fallback = computeLeadTick(f.db, f.workspaceId, { workspaceRoot: f.dir }).mergeCandidates
    assert.equal(fallback[0]!.commit, SHA)
    assert.equal(fallback[0]!.commitSource, 'receipt')
  } finally { f.close() }
})

test('a review receipt with PASS is not itself a merge candidate', () => {
  const f = fixture()
  try {
    const review = enqueueTask(f.db, f.workspaceId, { title: 'Review: something', addressedTo: 'reviewer-2' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'reviewer-2' WHERE id = ?").run(review.id)
    f.db.prepare(`INSERT INTO queue_deliveries
      (task_id, delivered_by, delivery_attempt, delivered_path, delivered_sha256, review_judgment, delivered_at)
      VALUES (?, 'reviewer-2', 1, 'review.md', 'hash', 'PASS', ?)`).run(review.id, new Date().toISOString())
    assert.deepEqual(computeLeadTick(f.db, f.workspaceId).mergeCandidates, [])
  } finally { f.close() }
})

test('the wave reports the next ready cards and why the others wait', () => {
  const f = fixture()
  try {
    enqueueTask(f.db, f.workspaceId, { title: 'CARD-A/CODE' })
    const wave: LeadTickWave = {
      wave: 'W-TEST',
      cards: [
        { id: 'CARD-A' },
        { id: 'CARD-B', after: 'CARD-A' },
        { id: 'CARD-C', after: 'CARD-B' },
        { id: 'CARD-D', hold: true },
        { id: 'CARD-E' },
      ],
    }
    const cards = computeLeadTick(f.db, f.workspaceId, { wave }).nextCards
    const byId = new Map(cards.map(card => [card.cardId, card]))
    assert.equal(byId.get('CARD-A')!.ready, false)
    assert.match(byId.get('CARD-A')!.reason ?? '', /bereits eingereiht/)
    assert.equal(byId.get('CARD-B')!.ready, false, 'predecessor is pending, not delivered')
    assert.equal(byId.get('CARD-C')!.reason !== null, true)
    assert.match(byId.get('CARD-D')!.reason ?? '', /hold/)
    assert.equal(byId.get('CARD-E')!.ready, true)

    const capped = computeLeadTick(f.db, f.workspaceId, { wave, waveNext: 0 }).nextCards
    assert.equal(capped.find(card => card.cardId === 'CARD-E')!.ready, false)
  } finally { f.close() }
})

test('lead-tick is deterministic and leaves every table byte-identical', () => {
  const f = fixture()
  try {
    f.setTurn('idle-3', 'needs-task', 'fertig')
    f.setTurn('blocked-4', 'blocked', 'gone')
    const task = enqueueTask(f.db, f.workspaceId, { title: 'Work', addressedTo: 'author-1' })
    f.db.prepare("UPDATE queue_tasks SET state = 'delivered', claimed_by = 'author-1', delivered_path = 'r.md' WHERE id = ?").run(task.id)
    f.db.prepare(`INSERT INTO queue_deliveries
      (task_id, delivered_by, delivery_attempt, delivered_path, delivered_sha256, review_judgment, delivered_at)
      VALUES (?, 'author-1', 1, 'r.md', 'hash', 'PASS', ?)`).run(task.id, new Date().toISOString())

    const before = dumpAll(f.db)
    const first = computeLeadTick(f.db, f.workspaceId, { now: new Date('2026-10-03T02:00:00.000Z') })
    const second = computeLeadTick(f.db, f.workspaceId, { now: new Date('2026-10-03T02:00:00.000Z') })
    const after = dumpAll(f.db)
    assert.equal(after, before, 'no table may change')
    assert.deepEqual(first, second, 'same store and clock give the same report')
    assert.equal(first.dryRun, true)
  } finally { f.close() }
})

test('the real CLI dispatch renders --dry-run --json and does not change the store', () => {
  const f = fixture()
  try {
    f.setTurn('idle-3', 'needs-task', 'fertig')
    const before = dumpAll(f.db)
    const result = spawnSync(process.execPath, [
      '--experimental-strip-types', '--no-warnings', CLI,
      'swarm', 'lead-tick', '--dry-run', '--json', '--workspace', f.workspaceId,
    ], {
      env: { ...process.env, PLUGBRAIN_HOME: f.dir, PLUGBRAIN_NO_DAEMON: '1' },
      encoding: 'utf8', timeout: 60_000, windowsHide: true,
    })
    assert.equal(result.status, 0, result.stderr)
    const report = JSON.parse(result.stdout) as { dryRun: boolean; decisions: unknown[]; starvingWorkers: Array<{ agentId: string }> }
    assert.equal(report.dryRun, true)
    assert.ok(Array.isArray(report.decisions))
    assert.deepEqual(report.starvingWorkers.map(row => row.agentId), ['idle-3'])
    assert.equal(dumpAll(f.db), before)
  } finally { f.close() }
})
