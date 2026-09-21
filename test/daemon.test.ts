/**
 * The daemon has to notice a vault that is opened while it is already running.
 *
 * The observed defect: the workspace list was read once at startup, so a folder
 * registered a minute later was never watched and never swept — the brain went
 * quietly stale for exactly the vault the human had just opened. Watchers and
 * the sweep now come from a list that is re-read, and this test holds that.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { isNoisePath, startDaemon } from '../src/daemon.ts'
import {
  IndexRunBusy, beginRun, failRun, finishRun, readPendingReindex, readRunState, removePendingReindex, removeRunState,
} from '../src/index/runs.ts'
import { IndexRunStartFailed } from '../src/index/runner.ts'
import { workspaceIdFor } from '../src/planet.ts'

/** Run states of these tests belong to a throwaway store home, not to a real one. */
const home = mkdtempSync(join(tmpdir(), 'plugbrain-daemon-home-'))
process.env.PLUGBRAIN_HOME = home

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

async function eventually(assertion: () => boolean, timeoutMs = 1_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (assertion()) return
    await sleep(10)
  }
  assert.ok(assertion(), `condition did not become true within ${timeoutMs} ms`)
}

interface Fixture { dir: string; dbFile: string; db: ReturnType<typeof openStore>; cleanup: () => void }

function fixture(): Fixture {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-daemon-'))
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  return {
    dir, dbFile, db,
    cleanup: () => {
      try { db.close() } catch { /* ignore */ }
      try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* ignore */ }
    },
  }
}

function addWorkspace(fx: Fixture, name: string): string {
  const root = join(fx.dir, name)
  mkdirSync(root, { recursive: true })
  writeFileSync(join(root, 'note.md'), `# ${name}\n`)
  const id = workspaceIdFor(root)
  fx.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(id, name, root, new Date().toISOString())
  return id
}

test('a workspace registered after the daemon started is watched, without a restart', () => {
  const fx = fixture()
  const lines: string[] = []
  try {
    const daemon = startDaemon(fx.db, { timers: false, log: line => lines.push(line) })
    try {
      assert.deepEqual(daemon.watching(), [], 'nothing registered yet means nothing to watch')

      const late = addWorkspace(fx, 'late-vault')
      daemon.refresh()
      assert.deepEqual(daemon.watching().map(ws => ws.id), [late],
        'the vault that was just opened must be watched')
      assert.ok(lines.some(line => line.includes('watching late-vault')),
        `expected a watching note, saw: ${lines.join(' | ')}`)

      // A second refresh must not open a second watcher on the same folder.
      daemon.refresh()
      assert.equal(daemon.watching().length, 1)

      const second = addWorkspace(fx, 'second-vault')
      daemon.refresh()
      assert.equal(daemon.watching().length, 2)
      assert.ok(daemon.watching().some(ws => ws.id === second))
    } finally { daemon.stop() }
  } finally { fx.cleanup() }
})

test('the watcher ignores exactly what the indexer never reads', () => {
  // The leading-segment case is the one that was wrong: a watcher event for
  // `.plugbrain-test\...` has no separator in front of the name, and the old
  // regular expression therefore let the brain re-index itself in a loop.
  const cases: Array<[string, boolean]> = [
    ['.plugbrain-test\\fb-brain-03\\runs', true],
    ['C:\\PLUG\\plugpt\\.plugbrain-test\\fb-brain-03\\runs\\x.json', true],
    ['C:\\PLUG\\plugpt\\.plugbrain\\plugbrain.db', true],
    ['.git\\HEAD', true],
    ['Code\\PlugHarness\\node_modules\\x\\y.js', true],
    ['Roadmap\\Gates\\R12-ECON-001.md', false],
    ['Code\\PlugHarness\\src\\index.ts', false],
    ['00 Übersicht.md', false],
  ]
  for (const [path, noise] of cases) {
    assert.equal(isNoisePath(path, 'C:\\PLUG\\plugpt\\.plugbrain-test\\fb-brain-03'), noise, path)
  }
  assert.equal(isNoisePath('\\plugpt\\.plugbrain-test\\fb-brain-03\\a.json',
    'C:\\PLUG\\plugpt\\.plugbrain-test\\fb-brain-03'), true,
  'a path inside the store home is noise even when its segments look ordinary')
})

test('writing into the brain store does not schedule a re-index, a real note does', async () => {
  const fx = fixture()
  const lines: string[] = []
  try {
    const root = join(fx.dir, 'vault')
    mkdirSync(join(root, '.plugbrain-test', 'store', 'runs'), { recursive: true })
    const id = workspaceIdFor(root)
    fx.db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(id, 'vault', root, new Date().toISOString())
    process.env.PLUGBRAIN_HOME = join(root, '.plugbrain-test', 'store')

    const daemon = startDaemon(fx.db, { timers: false, log: line => lines.push(line) })
    try {
      writeFileSync(join(root, '.plugbrain-test', 'store', 'runs', 'state.json'), '{}')
      await sleep(4600)
      assert.deepEqual(lines.filter(line => line.includes('changed:')), [],
        `the brain must not index itself: ${lines.join(' | ')}`)

      writeFileSync(join(root, 'Notiz.md'), '# eine echte Notiz\n')
      await sleep(4600)
      assert.ok(lines.some(line => line.includes('changed: Notiz.md')),
        `a real note must still trigger a re-index, saw: ${lines.join(' | ')}`)
    } finally { daemon.stop() }
  } finally {
    process.env.PLUGBRAIN_HOME = home
    fx.cleanup()
  }
})

test('a workspace that is no longer registered is no longer watched', () => {
  const fx = fixture()
  try {
    const id = addWorkspace(fx, 'gone-vault')
    const daemon = startDaemon(fx.db, { timers: false, log: () => {} })
    try {
      assert.deepEqual(daemon.watching().map(ws => ws.id), [id])
      fx.db.prepare('DELETE FROM workspaces WHERE id = ?').run(id)
      daemon.refresh()
      assert.deepEqual(daemon.watching(), [], 'a deleted workspace must not stay watched')
    } finally { daemon.stop() }
  } finally { fx.cleanup() }
})

test('the daemon can be asked to look again from another module, and stops cleanly', () => {
  const fx = fixture()
  try {
    const daemon = startDaemon(fx.db, { timers: false, log: () => {} })
    const id = addWorkspace(fx, 'refresh-vault')
    // This is what the HTTP routes call after registering a planet.
    daemon.refresh()
    assert.deepEqual(daemon.watching().map(ws => ws.id), [id])
    daemon.stop()
    daemon.refresh()
    assert.deepEqual(daemon.watching(), [],
      'a stopped daemon must not reopen a watcher when it is refreshed')
  } finally { fx.cleanup() }
})

test('a busy owner gets one recheck, then retains the change until it ends', async () => {
  const fx = fixture()
  const lines: string[] = []
  try {
    const id = addWorkspace(fx, 'busy-vault')
    const holder = beginRun(id)
    let attempts = 0
    let releaseHolder = false
    const result = {
      scanned: 1, files: 1, parsed: 1, symbols: 0, edges: 0, unresolved: 0, ambiguous: 0,
      skipped: 0, ms: 1, generation: 1, mode: 'incremental' as const,
      changed: { added: 0, modified: 1, renamed: 0, deleted: 0, unchanged: 0 },
      reparsed: 1, reresolved: 0,
    }
    const daemon = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: line => lines.push(line),
      delays: { debounceMs: 5, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => {
        attempts += 1
        if (!releaseHolder) throw new IndexRunBusy(holder, 0)
        const replacement = beginRun(id)
        finishRun(replacement, result)
        return { state: replacement, done: Promise.resolve({ state: replacement, result }) }
      },
    })
    try {
      writeFileSync(join(fx.dir, 'busy-vault', 'trigger.md'), '# trigger\n')
      await eventually(() => lines.some(line => line.includes('rechecking once')))
      await eventually(() => lines.some(line => line.includes('retaining this change until it ends')))
      await sleep(50)
      const attemptsBeforeRelease = attempts
      assert.equal(lines.filter(line => line.includes('rechecking once')).length, 1,
        `same run must be rechecked only once: ${lines.join(' | ')}`)
      assert.ok(attemptsBeforeRelease >= 2,
        `expected the original attempt and one recheck, saw ${attemptsBeforeRelease}`)

      // A file event may land after the owner has already snapshotted disk.
      // It must not be forgotten just because the bounded recheck found the
      // same owner still holding SQLite.
      releaseHolder = true
      finishRun(holder, result)
      await eventually(() => attempts > attemptsBeforeRelease)
      assert.equal(attempts, attemptsBeforeRelease + 1,
        `owner completion must trigger exactly one retained re-index, saw ${attempts}`)
    } finally { daemon.stop() }
    removeRunState(id)
    removePendingReindex(id)
  } finally { fx.cleanup() }
})

test('a retained direct filesystem change survives a daemon restart', async () => {
  const fx = fixture()
  const lines: string[] = []
  try {
    const id = addWorkspace(fx, 'restart-busy-vault')
    const holder = beginRun(id)
    const result = {
      scanned: 1, files: 1, parsed: 1, symbols: 0, edges: 0, unresolved: 0, ambiguous: 0,
      skipped: 0, ms: 1, generation: 1, mode: 'incremental' as const,
      changed: { added: 0, modified: 1, renamed: 0, deleted: 0, unchanged: 0 },
      reparsed: 1, reresolved: 0,
    }
    const first = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: line => lines.push(line),
      delays: { debounceMs: 5, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => { throw new IndexRunBusy(holder, 0) },
    })
    try {
      writeFileSync(join(fx.dir, 'restart-busy-vault', 'trigger.md'), '# trigger\n')
      await eventually(() => lines.some(line => line.includes('retaining this change until it ends')))
    } finally { first.stop() }

    assert.equal(readPendingReindex(id)?.runId, holder.runId,
      'stopping the daemon must not erase a direct filesystem change held behind a live owner')

    let releaseHolder = false
    let replacementAttempts = 0
    const second = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: line => lines.push(line),
      delays: { debounceMs: 5, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => {
        replacementAttempts += 1
        if (!releaseHolder) throw new IndexRunBusy(holder, 0)
        const replacement = beginRun(id)
        finishRun(replacement, result)
        return { state: replacement, done: Promise.resolve({ state: replacement, result }) }
      },
    })
    try {
      await sleep(30)
      assert.equal(replacementAttempts, 0, 'restart observes the owner before it attempts another writer')
      releaseHolder = true
      finishRun(holder, result)
      await eventually(() => replacementAttempts === 1)
      await eventually(() => readPendingReindex(id) === null)
    } finally { second.stop() }
    removeRunState(id)
    removePendingReindex(id)
  } finally { fx.cleanup() }
})

test('a direct event during a replacement survives its success and a normal restart', async () => {
  const fx = fixture()
  try {
    const id = addWorkspace(fx, 'replacement-event-vault')
    const holder = beginRun(id)
    const result = {
      scanned: 1, files: 1, parsed: 1, symbols: 0, edges: 0, unresolved: 0, ambiguous: 0,
      skipped: 0, ms: 1, generation: 1, mode: 'incremental' as const,
      changed: { added: 0, modified: 1, renamed: 0, deleted: 0, unchanged: 0 },
      reparsed: 1, reresolved: 0,
    }
    let holderReleased = false
    let firstAttempts = 0
    let replacement: ReturnType<typeof beginRun> | null = null
    let resolveReplacement: ((outcome: { state: ReturnType<typeof beginRun>; result: typeof result }) => void) | null = null
    const first = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: () => {},
      delays: { debounceMs: 100, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => {
        firstAttempts += 1
        if (!holderReleased) throw new IndexRunBusy(holder, 0)
        replacement = beginRun(id)
        const done = new Promise<{ state: ReturnType<typeof beginRun>; result: typeof result }>(resolve => {
          resolveReplacement = resolve
        })
        return { state: replacement, done }
      },
    })
    try {
      writeFileSync(join(fx.dir, 'replacement-event-vault', 'initial.md'), '# initial\n')
      await eventually(() => firstAttempts >= 2)
      holderReleased = true
      finishRun(holder, result)
      await eventually(() => replacement !== null)
      const b = replacement
      assert.ok(b !== null)

      // B has accepted the original retained change. This second write happens
      // after B could have snapshotted disk and must be durable before its
      // debounced callback gets a chance to start C.
      writeFileSync(join(fx.dir, 'replacement-event-vault', 'after-b.md'), '# after B\n')
      await eventually(() => {
        const pending = readPendingReindex(id)
        return pending?.runId === b.runId && pending.followUp === true
      })
      finishRun(b, result)
      resolveReplacement?.({ state: b, result })
      // Let the completion handler schedule C, but stop before the zero-delay
      // timer runs. A normal restart must still discover the durable marker.
      await Promise.resolve()
    } finally { first.stop() }

    const pending = readPendingReindex(id)
    assert.equal(pending?.runId, replacement?.runId)
    assert.equal(pending?.followUp, true,
      'a change received during B must outlive B success and daemon shutdown')
    assert.equal(firstAttempts, 3, 'C must not have begun before the normal restart')

    let recoveryAttempts = 0
    const second = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: () => {},
      delays: { debounceMs: 5, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => {
        recoveryAttempts += 1
        const replacement = beginRun(id)
        finishRun(replacement, result)
        return { state: replacement, done: Promise.resolve({ state: replacement, result }) }
      },
    })
    try {
      await eventually(() => recoveryAttempts === 1)
      await eventually(() => readPendingReindex(id) === null)
    } finally { second.stop() }
    removeRunState(id)
    removePendingReindex(id)
  } finally { fx.cleanup() }
})

test('a synchronous replacement start failure keeps the retained change recoverable', async () => {
  const fx = fixture()
  const lines: string[] = []
  try {
    const id = addWorkspace(fx, 'construction-failure-vault')
    const holder = beginRun(id)
    const result = {
      scanned: 1, files: 1, parsed: 1, symbols: 0, edges: 0, unresolved: 0, ambiguous: 0,
      skipped: 0, ms: 1, generation: 1, mode: 'incremental' as const,
      changed: { added: 0, modified: 1, renamed: 0, deleted: 0, unchanged: 0 },
      reparsed: 1, reresolved: 0,
    }
    let holderReleased = false
    let attempts = 0
    let startFailures = 0
    const daemon = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: line => lines.push(line),
      delays: { debounceMs: 5, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => {
        attempts += 1
        if (!holderReleased) throw new IndexRunBusy(holder, 0)
        if (startFailures === 0) {
          startFailures += 1
          const failed = beginRun(id)
          const error = new Error('simulated worker construction failure')
          failRun(failed, error)
          throw new IndexRunStartFailed(failed, error)
        }
        const replacement = beginRun(id)
        finishRun(replacement, result)
        return { state: replacement, done: Promise.resolve({ state: replacement, result }) }
      },
    })
    try {
      writeFileSync(join(fx.dir, 'construction-failure-vault', 'trigger.md'), '# trigger\n')
      await eventually(() => attempts >= 2)
      await eventually(() => lines.some(line => line.includes('retaining this change until it ends')))
      holderReleased = true
      finishRun(holder, result)
      assert.equal(readRunState(id)?.finishedAt !== null, true)
      await eventually(() => attempts >= 4)
      assert.ok(attempts >= 4, 'the construction failure must schedule one bounded retained recovery')
      await eventually(() => readPendingReindex(id) === null)
    } finally { daemon.stop() }
    removeRunState(id)
    removePendingReindex(id)
  } finally { fx.cleanup() }
})

test('a failed post-owner replacement retains the change for one bounded recovery', async () => {
  const fx = fixture()
  try {
    const id = addWorkspace(fx, 'failed-replacement-vault')
    const holder = beginRun(id)
    const result = {
      scanned: 1, files: 1, parsed: 1, symbols: 0, edges: 0, unresolved: 0, ambiguous: 0,
      skipped: 0, ms: 1, generation: 1, mode: 'incremental' as const,
      changed: { added: 0, modified: 1, renamed: 0, deleted: 0, unchanged: 0 },
      reparsed: 1, reresolved: 0,
    }
    let stage: 'busy' | 'fail' | 'succeed' = 'busy'
    let attempts = 0
    let rejectReplacement: ((error: Error) => void) | null = null
    let failedState: ReturnType<typeof beginRun> | null = null
    const daemon = startDaemon(fx.db, {
      dbFile: fx.dbFile,
      timers: false,
      log: () => {},
      delays: { debounceMs: 5, minIntervalMs: 0, busyRetryMs: 5, busyMonitorMs: 5 },
      startRun: () => {
        attempts += 1
        if (stage === 'busy') throw new IndexRunBusy(holder, 0)
        if (stage === 'fail') {
          failedState = beginRun(id)
          const done = new Promise<never>((_resolve, reject) => { rejectReplacement = reject })
          return { state: failedState, done }
        }
        const replacement = beginRun(id)
        finishRun(replacement, result)
        return { state: replacement, done: Promise.resolve({ state: replacement, result }) }
      },
    })
    try {
      writeFileSync(join(fx.dir, 'failed-replacement-vault', 'trigger.md'), '# trigger\n')
      await eventually(() => attempts >= 2)
      stage = 'fail'
      finishRun(holder, result)
      await eventually(() => failedState !== null)
      assert.equal(readPendingReindex(id)?.runId, failedState?.runId,
        'the marker must remain while the post-owner worker has only accepted, not completed')
      stage = 'succeed'
      failRun(failedState as ReturnType<typeof beginRun>, new Error('simulated worker failure'))
      rejectReplacement?.(new Error('simulated worker failure'))
      await eventually(() => attempts >= 4)
      await eventually(() => readPendingReindex(id) === null)
    } finally { daemon.stop() }
    removeRunState(id)
    removePendingReindex(id)
  } finally { fx.cleanup() }
})
