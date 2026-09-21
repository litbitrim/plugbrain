import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import {
  describeProgress, nextDaemonProgress, normalizeWorkspaceRoot, reindexWorkspace, watchIndexRun,
  workspaceIdForRoot,
} from '../ui/src/lib/workspaces.js'

const quietLiveReport = {
  running: false,
  stale: true,
  quiet: true,
  ownerAlive: true,
  recoverable: false,
  finished: false,
  summary: 'index run for ws-ui is quiet in phase classify (pid 1 is still alive)',
  run: {
    phase: 'classify', mode: 'incremental', processed: 0, total: 0, scanned: 42,
    startedAt: new Date(Date.now() - 10 * 60_000).toISOString(), finishedAt: null,
    ok: null, error: null, result: null,
  },
}

test('the UI calls a quiet live index protected, not dead', () => {
  const line = describeProgress(quietLiveReport)
  assert.match(line, /Owner-Prozess läuft noch/)
  assert.doesNotMatch(line, /kein Lebenszeichen/i)
})

test('a resolved daemon status clears the prior quiet-owner warning', () => {
  const quietLine = describeProgress(quietLiveReport)
  assert.match(quietLine, /Owner-Prozess läuft noch/)
  assert.equal(nextDaemonProgress({ running: false, stale: false }, quietLine), '')
  assert.equal(nextDaemonProgress({ running: false, stale: false }, 'Indexlauf wird vorbereitet …'),
    'Indexlauf wird vorbereitet …', 'a user-started status remains owned by that request')
})

test('a URL workspace root resolves only to an exact normalized registered id', () => {
  const planets = [
    { id: 'ws-plugpt', root: 'C:\\PLUG\\plugpt\\Code\\' },
    { id: 'ws-unix', root: '/srv/Brain/' },
    { id: 'ws-unc', root: '\\\\server\\Share\\Brain\\' },
  ]
  assert.equal(normalizeWorkspaceRoot(' C:/plugpt//Code/ '), 'c:/plugpt/code')
  assert.equal(normalizeWorkspaceRoot('/'), '/')
  assert.equal(workspaceIdForRoot(planets, 'c:/PLUG/plugpt/code'), 'ws-plugpt')
  assert.equal(workspaceIdForRoot(planets, '/srv/Brain'), 'ws-unix')
  assert.equal(workspaceIdForRoot(planets, '/srv/brain'), '',
    'POSIX roots preserve case instead of selecting a different vault')
  assert.equal(workspaceIdForRoot(planets, '//SERVER/share/brain/'), 'ws-unc')
  assert.equal(workspaceIdForRoot(planets, 'C:/PLUG/plugpt'), '',
    'a prefix is not a workspace id and must not select a nearby planet')
  assert.equal(workspaceIdForRoot(planets, 'C:/unknown'), '',
    'an unknown root remains on the known-vault landing state')
})

test('watching a quiet live index reports protected ownership', async () => {
  const originalFetch = globalThis.fetch
  const originalSetTimeout = globalThis.setTimeout
  try {
    globalThis.fetch = async () => new Response(JSON.stringify(quietLiveReport), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
    globalThis.setTimeout = ((callback: () => void) => {
      queueMicrotask(callback)
      return 0 as unknown as ReturnType<typeof setTimeout>
    }) as typeof setTimeout
    await assert.rejects(
      watchIndexRun('ws-ui'),
      /Owner-Prozess läuft noch.*Sperre bleibt geschützt/i,
    )
  } finally {
    globalThis.fetch = originalFetch
    globalThis.setTimeout = originalSetTimeout
  }
})

test('manual re-index preserves a quiet live owner explanation from a 409', async () => {
  const originalFetch = globalThis.fetch
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({
      ok: false,
      busy: true,
      ownerAlive: true,
      recoverable: false,
      stale: true,
      summary: quietLiveReport.summary,
    }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    })
    await assert.rejects(
      reindexWorkspace('ws-ui'),
      /lebenden Owner-Prozess.*Sperre bleibt geschützt/i,
    )
  } finally {
    globalThis.fetch = originalFetch
  }
})
