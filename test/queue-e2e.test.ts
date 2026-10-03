/**
 * BRAIN-BE-01 / B4: The Q-chain end to end against an isolated home, using
 * only the existing contract.
 *
 * What the existing contract provides (verified, nothing invented):
 * - `POST /api/queue`        → queue.enqueueTask    (src/server/api.ts, "Workspace task queue")
 * - `GET  /api/queue`        → queue.queueDepth + listQueue (same block)
 * - `POST /api/queue/claim`  → queue.claimNextTask, CAS compare-and-set (same block)
 * - `POST /api/queue/deliver` → queue.deliverTask (same block)
 * - the worker-takes-task CLI side: `swarm turn <agent> start --claim` →
 *   recordTurn({ claimNext: true }) (src/swarm-cli.ts, case 'turn')
 * - the review/receipt side that exists: approveCommit
 *   (src/coord/swarm-ops.ts, "Commit freigegeben") moves a turn from
 *   `awaiting-commit` to `commit-approved`.
 *
 * What the existing contract is MISSING — named per the brief, not invented:
 * a final "integriert" state for delivered queue work. The queue state
 * machine (src/queue.ts, QueueState) is `pending | claimed | delivered |
 * cancelled` and deliverTask ends at `delivered` with no review/receipt
 * transition; the mission machine (src/missions.ts, MissionState) ends at
 * `merged`; the swarm turn states (src/coord/swarm-ops.ts, TURN_END_STATES)
 * end at `commit-approved`. No link connects a delivered task to any
 * "integrated" state.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import * as swarmOps from '../src/coord/swarm-ops.ts'

interface Reply {
  status: number
  data: Record<string, unknown> & { ok?: boolean; error?: string }
}

async function post(base: string, path: string, body: Record<string, unknown>): Promise<Reply> {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer qe2e-token' },
    body: JSON.stringify(body),
  })
  return { status: res.status, data: (await res.json()) as Reply['data'] }
}

async function getInbox(base: string): Promise<Reply> {
  const res = await fetch(`${base}/api/queue?workspace=ws-qe2e`, {
    headers: { Authorization: 'Bearer qe2e-token' },
  })
  return { status: res.status, data: (await res.json()) as Reply['data'] }
}

test('B4: Q-chain E2E — enqueue, claim (HTTP + turn --claim), restart, deliver, idempotent double deliver, existing receipt', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-qe2e-'))
  const dbFile = join(dir, 'brain.db')
  const workspaceRoot = join(dir, 'ws')
  mkdirSync(join(workspaceRoot, 'out'), { recursive: true })
  writeFileSync(join(workspaceRoot, 'out', 'result.md'), 'Q-chain delivery proof.\n')

  // Create a minimal ledger with M01 so unaddressed tasks with planRef are claimable
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

  let db: DatabaseSync = openStore(dbFile)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-qe2e', 'Q-chain E2E', workspaceRoot, new Date().toISOString())
  let handle: ServerHandle = await serve({ db, uiRoot: null, authKey: 'qe2e-token' }, 0)
  let base = `http://127.0.0.1:${handle.port}`

  try {
    // Two agents attach (identity creation is the authorized registration op).
    const attachA = await post(base, '/api/agent/attach', { workspace: 'ws-qe2e', agentId: 'owner-a', name: 'Owner' })
    assert.strictEqual(attachA.status, 200, `attach owner-a: ${JSON.stringify(attachA.data)}`)
    const attachB = await post(base, '/api/agent/attach', { workspace: 'ws-qe2e', agentId: 'worker-b', name: 'Worker' })
    assert.strictEqual(attachB.status, 200, `attach worker-b: ${JSON.stringify(attachB.data)}`)

    // ── 1. Aufgabe einstellen ────────────────────────────────────────────
    const enq = await post(base, '/api/queue', {
      workspace: 'ws-qe2e',
      title: 'Portiere die Workspace-Identität',
      body: 'B3-Arbeit: Marker, pin, workspaceIdFor.',
      addressedTo: 'worker-b',
      requestedBy: 'owner-a',
    })
    assert.strictEqual(enq.status, 200, `enqueue: ${JSON.stringify(enq.data)}`)
    const task = enq.data.task as { id: string; state: string; claimed_by: string | null }
    assert.strictEqual(task.state, 'pending')
    assert.strictEqual(task.claimed_by, null)

    // ── 2. Worker nimmt sie (HTTP claim, CAS) ────────────────────────────
    const claim = await post(base, '/api/queue/claim', { workspace: 'ws-qe2e', agentId: 'worker-b' })
    assert.strictEqual(claim.status, 200, `claim: ${JSON.stringify(claim.data)}`)
    const claimed = claim.data.task as { id: string; state: string; claimed_by: string | null } | null
    assert.ok(claimed, 'the worker must take the pending task')
    assert.strictEqual(claimed.id, task.id)
    assert.strictEqual(claimed.state, 'claimed')
    assert.strictEqual(claimed.claimed_by, 'worker-b')

    // The CAS holds: the second idle agent gets an honest empty answer.
    const race = await post(base, '/api/queue/claim', { workspace: 'ws-qe2e', agentId: 'owner-a' })
    assert.strictEqual(race.status, 200)
    assert.strictEqual(race.data.task, null, 'a second claim on a claimed queue must answer null')

    // ── 3. Daemon-Neustart mitten in der Kette ───────────────────────────
    await handle.close()
    try { db.close() } catch { /* already closed */ }
    db = openStore(dbFile)
    handle = await serve({ db, uiRoot: null, authKey: 'qe2e-token' }, 0)
    base = `http://127.0.0.1:${handle.port}`

    const afterRestart = await getInbox(base)
    assert.strictEqual(afterRestart.status, 200)
    const restarted = (afterRestart.data.tasks as Array<{ id: string; state: string; claimed_by: string | null }>)
      .find((t) => t.id === task.id)
    assert.ok(restarted, 'the claimed task must survive the daemon restart')
    assert.strictEqual(restarted.state, 'claimed')
    assert.strictEqual(restarted.claimed_by, 'worker-b')

    // ── 4. Worker liefert ────────────────────────────────────────────────
    const missingEvidence = await post(base, '/api/queue/deliver', {
      workspace: 'ws-qe2e', taskId: task.id, agentId: 'worker-b', deliveredPath: 'out/missing.md',
    })
    assert.strictEqual(missingEvidence.status, 403)
    assert.match(String(missingEvidence.data.error), /does not exist/i)
    const deliver = await post(base, '/api/queue/deliver', {
      workspace: 'ws-qe2e', taskId: task.id, agentId: 'worker-b', deliveredPath: 'out/result.md', repoPath: process.cwd(),
    })
    assert.strictEqual(deliver.status, 200, `deliver: ${JSON.stringify(deliver.data)}`)
    const delivered = deliver.data.task as { state: string; delivered_path: string | null; updated_at: string }
    assert.strictEqual(delivered.state, 'delivered')
    assert.strictEqual(delivered.delivered_path, 'out/result.md')
    const deliveryReceipt = db.prepare(`SELECT delivered_by, delivery_attempt, source_revision, delivered_path, delivered_sha256
      FROM queue_deliveries WHERE task_id = ?`).get(task.id) as {
        delivered_by: string; delivery_attempt: number; source_revision: string | null; delivered_path: string; delivered_sha256: string
      }
    assert.equal(deliveryReceipt.delivered_by, 'worker-b')
    assert.equal(deliveryReceipt.delivery_attempt, 1)
    assert.match(deliveryReceipt.source_revision, /^[0-9a-f]{40}$/i)
    assert.equal(deliveryReceipt.delivered_path, 'out/result.md')
    assert.equal(deliveryReceipt.delivered_sha256, createHash('sha256').update('Q-chain delivery proof.\n').digest('hex'))

    // ── 5. Doppeltes deliver-Event, das idempotent bleiben muss ─────────
    const deliverAgain = await post(base, '/api/queue/deliver', {
      workspace: 'ws-qe2e', taskId: task.id, agentId: 'worker-b', deliveredPath: 'out/result.md', repoPath: process.cwd(),
    })
    assert.strictEqual(deliverAgain.status, 403, 'a duplicate deliver must be refused, not silently re-applied')
    assert.strictEqual(deliverAgain.data.ok, false)
    assert.match(String(deliverAgain.data.error), /delivered, not claimed/)

    // Idempotent in effect: no state regression, no path overwrite, no
    // second row, and the delivered timestamp is the first deliver's.
    const afterDouble = await getInbox(base)
    const rows = afterDouble.data.tasks as Array<{ id: string; state: string; delivered_path: string | null; updated_at: string }>
    const matches = rows.filter((t) => t.id === task.id)
    assert.strictEqual(matches.length, 1, 'a duplicate deliver must not create a second row')
    assert.strictEqual(matches[0].state, 'delivered')
    assert.strictEqual(matches[0].delivered_path, 'out/result.md')
    assert.strictEqual(matches[0].updated_at, delivered.updated_at)

    // The inbox answers honestly: nothing pending is left.
    const depth = afterDouble.data.depth as number
    assert.strictEqual(depth, 0)

    // ── 6. Review/Quittung — der Glied, der existiert ────────────────────
    // The turn-side receipt: `swarm turn <agent> end --state awaiting-commit`
    // then `swarm approve` (approveCommit) → `commit-approved`. The chain
    // ends HERE: no "integriert" state exists (see the header note).
    const second = await post(base, '/api/queue', { workspace: 'ws-qe2e', title: 'Zweite Aufgabe', planRef: 'M01' })
    assert.strictEqual(second.status, 200)
    const secondTask = second.data.task as { id: string }

    // The worker-takes-task CLI side: swarm turn … --claim (recordTurn).
    const ping = swarmOps.recordTurn(db, {
      workspaceId: 'ws-qe2e', agentId: 'worker-b', phase: 'start', claimNext: true,
    })
    assert.ok(ping.claimedTask, 'turn --claim must take the next pending task')
    assert.strictEqual((ping.claimedTask as { id: string }).id, secondTask.id)

    swarmOps.recordTurn(db, {
      workspaceId: 'ws-qe2e', agentId: 'worker-b', phase: 'end',
      state: 'awaiting-commit', summary: 'Zweite Aufgabe geliefert',
    })
    const receipt = swarmOps.approveCommit(db, {
      workspaceId: 'ws-qe2e', agentId: 'worker-b', by: 'owner-a', note: 'Quittung: Arbeit integriert.',
    })
    assert.ok(receipt, 'the receipt must be an inbox message to the worker')
    const turnState = (db.prepare('SELECT turn_state FROM agents WHERE id = ?').get('worker-b') as { turn_state: string }).turn_state
    assert.strictEqual(turnState, 'commit-approved',
      'the existing receipt chain ends at commit-approved — there is no integrated state')
  } finally {
    await handle.close()
    try { db.close() } catch { /* ignore */ }
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }) } catch { /* best effort on Windows */ }
  }
})
