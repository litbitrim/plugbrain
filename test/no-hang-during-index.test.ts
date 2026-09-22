/**
 * No API route may hang while an index run works.
 *
 * The defect this pins down was measured on a real planet: `curl -m 2
 * /api/health` answered `000` (timeout) for fifty minutes while a run held the
 * server, and a store-writing route waited out `busy_timeout` for 15 s and then
 * returned 500 without a reason (bench/obsidian-parity.md, F-01/F-06).
 *
 * Three separate promises are tested from the outside, over HTTP:
 *
 *   1. READS ANSWER, fast, and say that an index is running.
 *   2. WRITES ARE REFUSED AT ONCE with the holder named, instead of waiting.
 *   3. A SECOND REINDEX is answered with the run that already exists — by the
 *      same idempotency key, or by its job id — and never starts another one.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { workspaceIdFor } from '../src/planet.ts'
import { removeRunState } from '../src/index/runs.ts'

/** Run states and the store of this suite live under a throwaway home. */
const home = mkdtempSync(join(tmpdir(), 'plugbrain-nohang-home-'))
process.env.PLUGBRAIN_HOME = home

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
const AUTH = 'test-token-no-hang'

interface Fixture {
  dir: string
  workspaceId: string
  handle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

/**
 * A workspace big enough that a run is observable for more than a second. 3000
 * tiny modules is minutes of work for the parser only on a real planet; here it
 * is the smallest size that still outlives the requests made against it.
 */
async function createFixture(files: number): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-nohang-'))
  const root = join(dir, 'ws')
  mkdirSync(join(root, 'src'), { recursive: true })
  for (let i = 0; i < files; i += 1) {
    writeFileSync(join(root, 'src', `mod${i}.ts`),
      `import { v${Math.max(0, i - 1)} } from './mod${Math.max(0, i - 1)}'\n` +
      `export const v${i} = ${i}\nexport function f${i}(x: number): number { return x + ${i} + v${Math.max(0, i - 1)} }\n`,
      'utf8')
  }
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = workspaceIdFor(root)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'no-hang', root, new Date().toISOString())

  const handle = await serve({ db, dbFile, uiRoot: null, authKey: AUTH, requireAuth: true }, 0)
  return {
    dir, workspaceId, handle,
    baseUrl: `http://127.0.0.1:${handle.port}`,
    cleanup: async () => {
      await handle.close()
      try { db.close() } catch { /* ignore */ }
      removeRunState(workspaceId)
      try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* ignore */ }
    },
  }
}

const post = (fx: Fixture, path: string, body: unknown): Promise<Response> =>
  fetch(`${fx.baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${AUTH}` },
    body: JSON.stringify(body),
  })

async function waitForRun(fx: Fixture, timeoutMs = 120_000): Promise<Record<string, unknown>> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const report = await (await fetch(
      `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`))
      .json() as { running: boolean; run: Record<string, unknown> | null }
    if (!report.running) {
      assert.equal(report.run?.ok, true, `run failed: ${String(report.run?.error ?? '')}`)
      return report.run ?? {}
    }
    await sleep(100)
  }
  throw new Error('the index run did not finish in time')
}

test('reads answer within 500 ms while an index run works, and say so', async () => {
  const fx = await createFixture(3000)
  try {
    const started = await post(fx, '/api/reindex', { workspace: fx.workspaceId })
    const startedBody = await started.json() as { ok: boolean; started: boolean; jobId: string }
    assert.equal(started.status, 202)
    assert.equal(startedBody.started, true)
    assert.ok(startedBody.jobId.length > 0)

    let observedIndexing = false
    // Every round trip below is made WHILE the run is in flight. A single
    // slow answer would mean the event loop was blocked, which is the defect.
    for (let round = 0; round < 60; round += 1) {
      const healthStart = Date.now()
      const health = await fetch(`${fx.baseUrl}/api/health`)
      const healthMs = Date.now() - healthStart
      const healthBody = await health.json() as { ok: boolean; indexState: string; indexing: unknown }
      assert.equal(health.status, 200)
      assert.ok(healthMs < 500, `/api/health took ${healthMs} ms during a run`)
      if (healthBody.indexState === 'indexing') observedIndexing = true

      const planetStart = Date.now()
      const planet = await fetch(`${fx.baseUrl}/api/planet?workspace=${encodeURIComponent(fx.workspaceId)}`)
      const planetMs = Date.now() - planetStart
      assert.ok(planetMs < 500, `/api/planet took ${planetMs} ms during a run`)
      assert.equal(planet.status, 200)
      const planetBody = await planet.json() as { ok: boolean; indexState: string; planet: { workspaceId: string } }
      assert.equal(planetBody.ok, true, 'a read must answer even while an index runs')
      assert.equal(planetBody.planet.workspaceId, fx.workspaceId)
      assert.ok(['indexing', 'unindexed', 'ready'].includes(planetBody.indexState),
        `unexpected indexState '${planetBody.indexState}'`)

      // The new read routes answer under the same condition; they are the ones
      // the Board projection polls.
      for (const path of [
        `/api/files?workspace=${encodeURIComponent(fx.workspaceId)}&limit=5`,
        `/api/changes?workspace=${encodeURIComponent(fx.workspaceId)}&from=0`,
        `/api/city?workspace=${encodeURIComponent(fx.workspaceId)}`,
      ]) {
        const readStart = Date.now()
        const response = await fetch(`${fx.baseUrl}${path}`)
        const readMs = Date.now() - readStart
        assert.equal(response.status, 200,
          `${path} answered ${response.status} during a run: ${(await response.text()).slice(0, 200)}`)
        assert.ok(readMs < 500, `${path} took ${readMs} ms during a run`)
      }

      const progress = await (await fetch(
        `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`))
        .json() as { running: boolean }
      if (!progress.running) break
      await sleep(50)
    }
    assert.equal(observedIndexing, true, 'a read must name the running index, not hide it')

    const finished = await waitForRun(fx)
    assert.equal((finished.result as { files: number }).files, 3000)
    // Once the run is over the same routes report a published generation.
    const after = await (await fetch(
      `${fx.baseUrl}/api/planet?workspace=${encodeURIComponent(fx.workspaceId)}`))
      .json() as { indexState: string; indexGeneration: number; planet: { totals: { files: number } } }
    assert.equal(after.indexState, 'ready')
    assert.equal(after.indexGeneration, 1)
    assert.equal(after.planet.totals.files, 3000)
  } finally { await fx.cleanup() }
})

test('a store-writing route is refused at once with the holder named', async () => {
  const fx = await createFixture(3000)
  try {
    const started = await post(fx, '/api/reindex', { workspace: fx.workspaceId })
    const startedBody = await started.json() as { jobId: string }
    assert.equal(started.status, 202)

    // Wait until the run is genuinely in flight before writing.
    for (let i = 0; i < 200; i += 1) {
      const report = await (await fetch(
        `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`))
        .json() as { running: boolean }
      if (report.running) break
      await sleep(20)
    }

    const writeStart = Date.now()
    const refused = await post(fx, '/api/workspaces', { root: fx.dir, name: 'while-busy' })
    const writeMs = Date.now() - writeStart
    const body = await refused.json() as {
      ok: boolean; status: string; busy: boolean; jobId: string; runningSince: string
      reason: string; progress: { phase: string } | null; retryAfterMs: number
    }
    assert.equal(refused.status, 503, 'a write must not wait out SQLite busy_timeout')
    assert.ok(writeMs < 500, `the refusal took ${writeMs} ms`)
    assert.equal(body.ok, false)
    assert.equal(body.status, 'busy')
    assert.equal(body.busy, true)
    assert.equal(body.jobId, startedBody.jobId, 'the refusal must name the run that holds the store')
    assert.ok(typeof body.runningSince === 'string' && body.runningSince.length > 0)
    assert.match(body.reason, /already in progress/)
    assert.ok(body.progress !== null && typeof body.progress.phase === 'string')
    assert.equal(body.retryAfterMs, 1000)

    await waitForRun(fx)
  } finally { await fx.cleanup() }
})

test('a second reindex is answered with the run that exists, never a second one', async () => {
  const fx = await createFixture(3000)
  try {
    const first = await post(fx, '/api/reindex', {
      workspace: fx.workspaceId, idempotencyKey: 'board:rebuild:1',
    })
    const firstBody = await first.json() as { jobId: string }
    assert.equal(first.status, 202)

    const replay = await post(fx, '/api/reindex', {
      workspace: fx.workspaceId, idempotencyKey: 'board:rebuild:1',
    })
    const replayBody = await replay.json() as {
      ok: boolean; started: boolean; idempotent: boolean; status: string
      jobId: string; runningSince: string; run: { runId: string }
    }
    assert.equal(replay.status, 409, 'a replay while the run is live is busy, not a second run')
    assert.equal(replayBody.started, false)
    assert.equal(replayBody.idempotent, true)
    assert.equal(replayBody.status, 'busy')
    assert.equal(replayBody.jobId, firstBody.jobId)
    assert.equal(replayBody.run.runId, firstBody.jobId)
    assert.ok(replayBody.runningSince.length > 0)

    // A DIFFERENT key is a different job and gets the ordinary busy contract.
    const other = await post(fx, '/api/reindex', {
      workspace: fx.workspaceId, idempotencyKey: 'board:rebuild:2',
    })
    const otherBody = await other.json() as {
      status: string; jobId: string; progress: { processed: number } | null
    }
    assert.equal(other.status, 409)
    assert.equal(otherBody.status, 'busy')
    assert.equal(otherBody.jobId, firstBody.jobId, 'the refused start names the run that holds the lock')
    assert.ok(otherBody.progress !== null)

    const finished = await waitForRun(fx)
    assert.equal(finished.runId, firstBody.jobId)

    // The same key after the end is the same job: it answers, it does not start.
    const afterEnd = await post(fx, '/api/reindex', {
      workspace: fx.workspaceId, idempotencyKey: 'board:rebuild:1',
    })
    const afterBody = await afterEnd.json() as {
      ok: boolean; started: boolean; idempotent: boolean; run: { runId: string; ok: boolean }
    }
    assert.equal(afterEnd.status, 200)
    assert.equal(afterBody.ok, true)
    assert.equal(afterBody.started, false)
    assert.equal(afterBody.idempotent, true)
    assert.equal(afterBody.run.runId, firstBody.jobId)
    assert.equal(afterBody.run.ok, true)
  } finally { await fx.cleanup() }
})
