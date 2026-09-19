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
import { workspaceIdFor } from '../src/planet.ts'

/** Run states of these tests belong to a throwaway store home, not to a real one. */
const home = mkdtempSync(join(tmpdir(), 'plugbrain-daemon-home-'))
process.env.PLUGBRAIN_HOME = home

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

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
