/**
 * Index runs: the lock, the progress, and the promise that a run does not stop
 * the process that started it.
 *
 * Every case here is a defect that was observed on the real vault first:
 *   - a whole vault that looked empty for the length of a run (no progress),
 *   - a server that answered nothing at all while indexing (blocked loop),
 *   - a second run that scanned everything again instead of saying "busy".
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import {
  IndexRunBusy, appraiseRun, beginRun, describeRun, failRun, finishRun, listRunStates,
  readRunState, removeRunState, runDir, writeRunState,
} from '../src/index/runs.ts'
import { runIndexInProcess, startIndexRun } from '../src/index/runner.ts'
import { workspaceIdFor } from '../src/planet.ts'

/** Every run state of this test run lives under a throwaway PLUGBRAIN_HOME. */
const home = mkdtempSync(join(tmpdir(), 'plugbrain-runs-home-'))
process.env.PLUGBRAIN_HOME = home

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

interface Fixture { dir: string; root: string; dbFile: string; workspaceId: string; cleanup: () => void }

/** A workspace with `files` small TypeScript modules in it. */
function makeWorkspace(files: number, label: string): Fixture {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-${label}-`))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  for (let i = 0; i < files; i += 1) {
    writeFileSync(join(root, `mod${i}.ts`),
      `export const v${i} = ${i}\nexport function f${i}(x: number): number { return x + ${i} }\n`, 'utf8')
  }
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const workspaceId = workspaceIdFor(root)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, label, root, new Date().toISOString())
  db.close()
  return {
    dir, root, dbFile, workspaceId,
    cleanup: () => { try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* ignore */ } },
  }
}

test('a begun run is running, and its state file is the only place it lives', () => {
  const state = beginRun('ws-run-unit-1')
  const appraisal = appraiseRun('ws-run-unit-1')
  assert.equal(appraisal.running, true)
  assert.equal(appraisal.finished, false)
  assert.equal(appraisal.stale, false)
  assert.equal(appraisal.state?.runId, state.runId)
  assert.equal(appraisal.fraction, null, 'without a total there is no percentage to show')
  removeRunState('ws-run-unit-1')
  assert.equal(appraiseRun('ws-run-unit-1').state, null)
})

test('a second run is refused with the holder and how far it has got', () => {
  const first = beginRun('ws-run-unit-2')
  writeRunState({ ...first, phase: 'write', processed: 40, total: 100, scanned: 120 })
  let refused: IndexRunBusy | null = null
  try { beginRun('ws-run-unit-2') } catch (error) { refused = error as IndexRunBusy }
  assert.ok(refused instanceof IndexRunBusy, 'a running index must not be started twice')
  assert.equal(refused?.state.processed, 40)
  assert.match(refused.message, /already in progress/)
  assert.match(refused.message, /40/)
  removeRunState('ws-run-unit-2')
})

test('a quiet run whose owner is gone is recoverable and can be taken over', () => {
  const stale = beginRun('ws-run-unit-3')
  writeRunState({
    ...stale,
    heartbeatAt: new Date(Date.now() - 10 * 60_000).toISOString(),
    phase: 'write',
  })
  const appraisal = appraiseRun('ws-run-unit-3', { isProcessAlive: () => false })
  assert.equal(appraisal.running, false)
  assert.equal(appraisal.stale, true)
  assert.equal(appraisal.ownerAlive, false)
  assert.equal(appraisal.recoverable, true)
  assert.match(describeRun(appraisal), /went quiet/)
  // A dead process must not lock the vault forever.
  const taken = beginRun('ws-run-unit-3', { isProcessAlive: () => false })
  assert.notEqual(taken.runId, stale.runId)
  removeRunState('ws-run-unit-3')
})

test('a quiet run whose owner is alive stays visible and cannot be clobbered', () => {
  const quiet = beginRun('ws-run-unit-live-owner')
  writeRunState({
    ...quiet,
    heartbeatAt: new Date(Date.now() - 10 * 60_000).toISOString(),
    phase: 'classify',
  })
  // `beginRun` records this test process as owner, so this exercises the real
  // operating-system liveness check rather than only a test double.
  const appraisal = appraiseRun('ws-run-unit-live-owner')
  assert.equal(appraisal.running, false, 'quiet is not reported as forward progress')
  assert.equal(appraisal.stale, true, 'the UI must show that progress went quiet')
  assert.equal(appraisal.quiet, true)
  assert.equal(appraisal.ownerAlive, true)
  assert.equal(appraisal.recoverable, false)
  assert.match(describeRun(appraisal), /retaining its lock/)
  assert.throws(
    () => beginRun('ws-run-unit-live-owner'),
    IndexRunBusy,
    'a live process remains the owner even when its last progress tick is old',
  )
  removeRunState('ws-run-unit-live-owner')
})

test('a finished run keeps its result readable, and a failed one keeps its reason', () => {
  const state = beginRun('ws-run-unit-4')
  finishRun(state, {
    scanned: 12, files: 12, parsed: 12, symbols: 24, edges: 3, unresolved: 1, ambiguous: 0,
    skipped: 0, ms: 5, generation: 7, mode: 'incremental',
    changed: { added: 1, modified: 0, renamed: 0, deleted: 0, unchanged: 11 },
    reparsed: 1, reresolved: 1,
  })
  const done = appraiseRun('ws-run-unit-4')
  assert.equal(done.running, false)
  assert.equal(done.finished, true)
  assert.equal(done.state?.ok, true)
  assert.equal(done.state?.result?.files, 12)
  assert.match(describeRun(done), /incremental/)
  assert.match(describeRun(done), /12 files/)

  const broken = beginRun('ws-run-unit-5')
  failRun(broken, new Error('database is locked'))
  const failed = appraiseRun('ws-run-unit-5')
  assert.equal(failed.state?.ok, false)
  assert.equal(failed.running, false, 'a failed run is over, however it ended')
  assert.match(describeRun(failed), /database is locked/)
  removeRunState('ws-run-unit-4')
  removeRunState('ws-run-unit-5')
})

test('a workspace id that looks like a path cannot escape the run directory', () => {
  const hostile = '../../etc/passwd'
  beginRun(hostile)
  const entries = readdirSync(runDir())
  assert.equal(entries.length, 1, `expected exactly one state file, saw ${entries.join(', ')}`)
  assert.equal(entries[0].includes('/'), false)
  assert.equal(entries[0].includes('\\'), false)
  assert.ok(readRunState(hostile) !== null, 'the state is still readable under its own id')
  removeRunState(hostile)
})

test('an index run reports progress ticks that match what it finally reports', async () => {
  const fx = makeWorkspace(40, 'runs-progress')
  try {
    const db = openStore(fx.dbFile)
    const phases: string[] = []
    const seen: number[] = []
    let last = 0
    const result = runIndexInProcess(db, fx.workspaceId, {
      onProgress: tick => {
        phases.push(tick.phase)
        if (tick.phase !== 'write') return
        assert.ok(tick.processed >= last, 'progress must never go backwards')
        last = tick.processed
        seen.push(tick.processed)
        assert.ok(tick.total > 0, 'the write phase knows how many files it has to write')
      },
    })
    db.close()
    assert.deepEqual([...new Set(phases)], ['scan', 'classify', 'write', 'resolve', 'publish'])
    assert.equal(seen.at(-1), result.changed.added, 'the ticks add up to the files that were added')
    assert.equal(result.files, 40)

    // And the state file says the same thing the caller was told.
    const appraisal = appraiseRun(fx.workspaceId)
    assert.equal(appraisal.running, false)
    assert.equal(appraisal.state?.result?.files, 40)
    assert.equal(appraisal.state?.result?.mode, 'full')
    removeRunState(fx.workspaceId)
  } finally { fx.cleanup() }
})

test('indexing refuses to start when a live run already holds the lock', () => {
  const fx = makeWorkspace(3, 'runs-busy')
  try {
    const db = openStore(fx.dbFile)
    beginRun(fx.workspaceId)
    assert.throws(() => runIndexInProcess(db, fx.workspaceId), /already in progress/)
    db.close()
    removeRunState(fx.workspaceId)
  } finally { fx.cleanup() }
})

test('a worker run keeps the caller free and publishes progress while it works', async () => {
  const fx = makeWorkspace(600, 'runs-worker')
  try {
    const { done } = startIndexRun(fx.workspaceId, { dbFile: fx.dbFile, throttleMs: 0 })
    let ticksWhileRunning = 0
    const observed: string[] = []
    for (let i = 0; i < 4000; i += 1) {
      await sleep(10)
      const appraisal = appraiseRun(fx.workspaceId)
      if (appraisal.running) {
        ticksWhileRunning += 1
        const phase = appraisal.state?.phase ?? ''
        if (observed.at(-1) !== phase) observed.push(phase)
        continue
      }
      if (appraisal.finished) break
    }
    const outcome = await done

    // The point of the worker: the loop that serves the vault kept running, so
    // a watcher saw the run in progress instead of staring at a frozen process.
    assert.ok(ticksWhileRunning >= 3,
      `expected to observe the run in progress, saw it ${ticksWhileRunning} time(s)`)
    const order = ['starting', 'scan', 'classify', 'write', 'resolve', 'publish']
    for (const phase of observed) assert.ok(order.includes(phase), `unexpected phase '${phase}'`)
    assert.ok(observed.some(p => ['scan', 'classify', 'write'].includes(p)),
      `expected to see real work phases, saw ${observed.join(' → ')}`)
    assert.equal(outcome.result?.files, 600)
    assert.equal(outcome.state.ok, true)
    removeRunState(fx.workspaceId)
  } finally { fx.cleanup() }
})

test('a worker that cannot do the run records why, instead of failing silently', async () => {
  // The worker opens its OWN connection, so this store has the schema but not
  // the workspace row: the state a wrong path or a fresh store is in.
  // Unique per run: a fixed path left behind by an aborted or concurrent run
  // already holds the workspace row and fails the INSERT below.
  const scratch = mkdtempSync(join(tmpdir(), 'plugbrain-no-such-store-'))
  const missRoot = join(scratch, 'ws')
  mkdirSync(missRoot, { recursive: true })
  const db = openStore(join(scratch, 'other.db'))
  const workspaceId = workspaceIdFor(missRoot)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'missing', missRoot, new Date().toISOString())
  db.close()

  const { done } = startIndexRun(workspaceId, { dbFile: join(scratch, 'brain.db'), throttleMs: 0 })
  await assert.rejects(done, /unknown workspace/)
  const appraisal = appraiseRun(workspaceId)
  assert.equal(appraisal.state?.ok, false, 'a failed run must be readable as failed')
  assert.match(appraisal.state?.error ?? '', /unknown workspace/, 'and it must say why')
  assert.equal(appraisal.running, false, 'a failed run must not look busy forever')
  removeRunState(workspaceId)
  rmSync(scratch, { recursive: true, force: true, maxRetries: 10 })
})

test('a synchronous worker-construction failure terminally releases its acquired lock', () => {
  const workspaceId = 'ws-run-worker-construction-failure'
  try {
    assert.throws(
      () => startIndexRun(workspaceId, {
        dbFile: join(tmpdir(), 'unused-brain.db'),
        workerFactory: () => { throw new Error('simulated worker construction failure') },
      }),
      /simulated worker construction failure/,
    )
    const failed = readRunState(workspaceId)
    assert.equal(failed?.ok, false)
    assert.ok(failed?.finishedAt, 'the acquired run must be terminal before startIndexRun throws')
    assert.match(failed?.error ?? '', /simulated worker construction failure/)
    assert.equal(appraiseRun(workspaceId).finished, true)
    assert.doesNotThrow(() => beginRun(workspaceId),
      'the live daemon PID must not retain a lock after worker construction fails')
  } finally {
    removeRunState(workspaceId)
  }
})

test('a second run over an unchanged workspace does no work and says so', () => {
  const fx = makeWorkspace(6, 'runs-unchanged')
  try {
    const db = openStore(fx.dbFile)
    const first = runIndexInProcess(db, fx.workspaceId)
    assert.equal(first.mode, 'full')
    const second = runIndexInProcess(db, fx.workspaceId)
    assert.equal(second.mode, 'unchanged')
    assert.equal(second.changed.added, 0)
    assert.equal(second.generation, first.generation, 'no work means no new generation')
    db.close()
    removeRunState(fx.workspaceId)
  } finally { fx.cleanup() }
})

test('the run states of a home are listable, newest first', () => {
  const older = beginRun('ws-run-unit-6')
  writeRunState({ ...older, heartbeatAt: new Date(Date.now() - 5000).toISOString() })
  const newer = beginRun('ws-run-unit-7')
  const listed = listRunStates().map(state => state.workspaceId)
  assert.equal(listed[0], newer.workspaceId)
  assert.ok(listed.includes('ws-run-unit-6'))
  removeRunState('ws-run-unit-6')
  removeRunState('ws-run-unit-7')
})
