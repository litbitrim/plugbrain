/**
 * The daemon must keep serving while it indexes.
 *
 * This is the defect the owner hit first: opening a vault made the whole
 * product unreachable for the length of the run — no health check, no UI, no
 * progress, no counters. The tests below hold that line from the outside, over
 * HTTP, exactly as a browser would meet it.
 *
 * The last test pins the daemon routes the local web UI depends on, so a
 * repair for one of them cannot quietly take another one's data away.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { workspaceIdFor } from '../src/planet.ts'
import { beginRun, removeRunState, writeRunState } from '../src/index/runs.ts'

/** Run states of these tests live under a throwaway PLUGBRAIN_HOME. */
const home = mkdtempSync(join(tmpdir(), 'plugbrain-api-run-home-'))
process.env.PLUGBRAIN_HOME = home

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

interface Fixture {
  dir: string
  root: string
  dbFile: string
  workspaceId: string
  handle: ServerHandle
  baseUrl: string
  authKey: string
  cleanup: () => Promise<void>
}

async function createFixture(files: number): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-api-run-'))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  // Enough files that a run is observable: a run that finishes in 20 ms cannot
  // prove that the server stayed up during one.
  for (let i = 0; i < files; i += 1) {
    writeFileSync(join(root, `mod${i}.ts`),
      `export const v${i} = ${i}\nexport function f${i}(x: number): number { return x + ${i} }\n`, 'utf8')
  }
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = workspaceIdFor(root)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'api-index-run', root, new Date().toISOString())

  const authKey = 'test-token-index-run'
  const handle = await serve({ db, dbFile, uiRoot: null, authKey, requireAuth: true }, 0)
  return {
    dir, root, dbFile, workspaceId, handle, authKey,
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
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${fx.authKey}` },
    body: JSON.stringify(body),
  })

test('indexing a vault does not take the server down with it', async () => {
  const fx = await createFixture(600)
  try {
    // A run held by somebody else is refused, with the holder named.
    beginRun(fx.workspaceId)
    const busy = await post(fx, '/api/reindex', { workspace: fx.workspaceId })
    const busyBody = await busy.json() as { ok: boolean; busy?: boolean; error?: string }
    assert.equal(busy.status, 409, 'a second run must not silently start')
    assert.equal(busyBody.busy, true)
    assert.match(busyBody.error ?? '', /already in progress/)
    removeRunState(fx.workspaceId)

    const started = await post(fx, '/api/reindex', { workspace: fx.workspaceId })
    const startedBody = await started.json() as { ok: boolean; started?: boolean; run?: { phase: string } }
    assert.equal(started.status, 202, 'starting a run is accepted, not waited for')
    assert.equal(startedBody.ok, true)
    assert.equal(startedBody.started, true, 'the daemon must not index in its own request')
    assert.ok(startedBody.run !== undefined)

    // The point of all of it: while the run works, the server answers.
    let observedRunning = false
    let sawCounters = 0
    for (let i = 0; i < 40; i += 1) {
      const healthStart = Date.now()
      const health = await fetch(`${fx.baseUrl}/api/health`)
      const healthMs = Date.now() - healthStart
      assert.equal(health.status, 200, 'health must answer during a run')
      assert.ok(healthMs < 1000, `health took ${healthMs} ms during a run`)

      const progress = await fetch(
        `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`)
      const report = await progress.json() as {
        running: boolean; summary: string
        run: { phase: string; processed: number; total: number; scanned: number } | null
      }
      assert.equal(progress.status, 200)
      if (report.running && report.run !== null) {
        observedRunning = true
        // A counter of work already done: files seen by the walk, files
        // written, or a known total. A phase name alone is not progress.
        if (report.run.processed > 0 || report.run.scanned > 0 || report.run.total > 0) sawCounters += 1
        assert.ok(['starting', 'scan', 'classify', 'write', 'resolve', 'publish']
          .includes(report.run.phase), `unexpected phase '${report.run.phase}'`)
      }
      if (!report.running) break
      await sleep(50)
    }
    assert.equal(observedRunning, true, 'the run must be visible while it happens')
    assert.ok(sawCounters > 0, 'the progress must show real counters, not only a phase')

    // Wait for the end and check the run reports what the index actually did.
    let finished: { ok: boolean | null; error: string | null; result: { files: number } | null } | null = null
    for (let i = 0; i < 600; i += 1) {
      const report = await (await fetch(
        `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`))
        .json() as { running: boolean; run: typeof finished }
      if (!report.running) { finished = report.run; break }
      await sleep(100)
    }
    assert.ok(finished !== null, 'the run must reach an end')
    assert.equal(finished?.ok, true, `run failed: ${finished?.error ?? ''}`)
    assert.equal(finished?.result?.files, 600)
  } finally { await fx.cleanup() }
})

test('the routes the local UI depends on all answer with real data', async () => {
  const fx = await createFixture(5)
  try {
    // One small, complete run so the routes have something true to read.
    const started = await post(fx, '/api/reindex', { workspace: fx.workspaceId })
    assert.equal(started.status, 202)
    for (let i = 0; i < 400; i += 1) {
      const report = await (await fetch(
        `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`))
        .json() as { running: boolean; run: { ok: boolean | null; error: string | null } | null }
      if (!report.running) {
        assert.equal(report.run?.ok, true, `run failed: ${report.run?.error ?? ''}`)
        break
      }
      await sleep(50)
    }

    const workspace = `workspace=${encodeURIComponent(fx.workspaceId)}`

    const health = await (await fetch(`${fx.baseUrl}/api/health`)).json() as { ok: boolean }
    assert.equal(health.ok, true)

    const planet = await (await fetch(`${fx.baseUrl}/api/planet?${workspace}`)).json() as
      { ok: boolean; planet: { workspaceId: string; totals: { files: number } } }
    assert.equal(planet.ok, true)
    assert.equal(planet.planet.workspaceId, fx.workspaceId)
    assert.equal(planet.planet.totals.files, 5, 'the planet route must count the indexed files')
    assert.equal(planet.planet.workspaceId, fx.workspaceId)

    // A planet route asked without a workspace, when exactly ONE workspace is
    // registered, answers for it: a client that opened one vault asks "what does
    // my vault hold", and making it pass an id it never chose is a rule the user
    // has to learn for no reason.
    const unnamed = await fetch(`${fx.baseUrl}/api/planet`)
    assert.equal(unnamed.status, 200)
    const inferred = await unnamed.json() as { ok: boolean; planet: { workspaceId: string } }
    assert.equal(inferred.ok, true)
    assert.equal(inferred.planet.workspaceId, fx.workspaceId)

    // With a SECOND workspace registered the same route must refuse to guess and
    // name the candidates instead — guessing would answer about the wrong vault.
    const otherRoot = mkdtempSync(join(tmpdir(), 'plugbrain-second-'))
    try {
      writeFileSync(join(otherRoot, 'other.ts'), 'export const other = 1\n', 'utf8')
      const second = await post(fx, '/api/workspaces', { root: otherRoot, name: 'second' })
      assert.equal(second.status, 200)
      const ambiguous = await fetch(`${fx.baseUrl}/api/planet`)
      assert.equal(ambiguous.status, 400)
      const body = await ambiguous.json() as { error: string }
      assert.match(body.error, /workspace required — 2 are registered/)
    } finally { rmSync(otherRoot, { recursive: true, force: true }) }

    const registered = await post(fx, '/api/agent/register', {
      workspaceId: fx.workspaceId, agentId: 'api-run-agent', name: 'Run Agent',
    })
    assert.equal(registered.status, 200, `register failed: ${JSON.stringify(await registered.clone().json())}`)

    const search = await (await post(fx, '/api/agent/search', {
      workspace: fx.workspaceId, agentId: 'api-run-agent', query: 'mod3',
    })).json() as { ok: boolean; hits: unknown[] }
    assert.equal(search.ok, true)
    assert.ok(Array.isArray(search.hits), '/api/agent/search must return hits')

    const provenance = await (await fetch(
      `${fx.baseUrl}/api/provenance?${workspace}&path=mod1.ts`)).json() as
      { ok: boolean; path?: string }
    assert.equal(provenance.ok, true)
    assert.equal(provenance.path, 'mod1.ts')

    const timeline = await (await fetch(`${fx.baseUrl}/api/timeline?${workspace}`)).json() as
      { ok: boolean; events: unknown[]; bounds: unknown }
    assert.equal(timeline.ok, true)
    assert.ok(Array.isArray(timeline.events))
    assert.ok(timeline.bounds !== undefined)
  } finally { await fx.cleanup() }
})

test('index progress distinguishes a quiet live owner from a recoverable dead owner', async () => {
  const fx = await createFixture(1)
  try {
    const heartbeatAt = new Date(Date.now() - 10 * 60_000).toISOString()
    const live = beginRun(fx.workspaceId)
    writeRunState({ ...live, phase: 'classify', heartbeatAt })

    const liveReport = await (await fetch(
      `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`,
    )).json() as {
      running: boolean; stale: boolean; quiet: boolean; ownerAlive: boolean; recoverable: boolean; summary: string
    }
    assert.equal(liveReport.running, false, 'quiet work is not presented as forward progress')
    assert.equal(liveReport.stale, true)
    assert.equal(liveReport.quiet, true)
    assert.equal(liveReport.ownerAlive, true, 'the current test process owns this run')
    assert.equal(liveReport.recoverable, false, 'a live SQLite owner cannot be replaced')
    assert.match(liveReport.summary, /still alive/)

    const liveBusy = await post(fx, '/api/reindex', { workspace: fx.workspaceId })
    const liveBusyReport = await liveBusy.json() as {
      busy: boolean; running: boolean; stale: boolean; quiet: boolean; ownerAlive: boolean; recoverable: boolean; summary: string
    }
    assert.equal(liveBusy.status, 409)
    assert.equal(liveBusyReport.busy, true)
    assert.equal(liveBusyReport.running, false)
    assert.equal(liveBusyReport.stale, true)
    assert.equal(liveBusyReport.quiet, true)
    assert.equal(liveBusyReport.ownerAlive, true)
    assert.equal(liveBusyReport.recoverable, false)
    assert.match(liveBusyReport.summary, /still alive/)

    const livePlanetBusy = await post(fx, '/api/planet/scan', { workspace: fx.workspaceId })
    const livePlanetBusyReport = await livePlanetBusy.json() as {
      busy: boolean; quiet: boolean; ownerAlive: boolean; recoverable: boolean; summary: string
    }
    assert.equal(livePlanetBusy.status, 409)
    assert.equal(livePlanetBusyReport.busy, true)
    assert.equal(livePlanetBusyReport.quiet, true)
    assert.equal(livePlanetBusyReport.ownerAlive, true)
    assert.equal(livePlanetBusyReport.recoverable, false)
    assert.match(livePlanetBusyReport.summary, /still alive/)

    removeRunState(fx.workspaceId)
    const dead = beginRun(fx.workspaceId)
    writeRunState({ ...dead, phase: 'classify', heartbeatAt, pid: 999_999_999 })
    const deadReport = await (await fetch(
      `${fx.baseUrl}/api/index/progress?workspace=${encodeURIComponent(fx.workspaceId)}`,
    )).json() as {
      running: boolean; stale: boolean; ownerAlive: boolean; recoverable: boolean
    }
    assert.equal(deadReport.running, false)
    assert.equal(deadReport.stale, true)
    assert.equal(deadReport.ownerAlive, false)
    assert.equal(deadReport.recoverable, true, 'a quiet owner that exited can be replaced')
  } finally { await fx.cleanup() }
})
