/**
 * The endpoint file: `<home>/core.json` is the one place a consumer looks for
 * a running brain. It has to be written atomically (a reader never sees a
 * half file or a leftover temp), trusted only while its pid is alive (a file
 * a crashed serve left behind is a leftover, not an endpoint), and taken with
 * its owner on the way down (a second serve's file is not ours to remove).
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { once } from 'node:events'
import { test } from 'node:test'
import { openStore, sleepSync } from '../src/store/schema.ts'
import { serve } from '../src/server/api.ts'
import {
  coreEndpointFile,
  packageVersion,
  readCoreEndpoint,
  removeCoreEndpoint,
  writeCoreEndpoint,
  type CoreEndpoint,
} from '../src/server/core-endpoint.ts'

function home() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-core-'))
  // Best-effort cleanup, the repo convention: a locked temp dir is left to the OS.
  return { dir, cleanup: () => { try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* ignore */ } } }
}

test('the endpoint file is written atomically and reads back faithfully', () => {
  const h = home()
  try {
    const endpoint: CoreEndpoint = {
      url: 'http://127.0.0.1:45999',
      pid: process.pid,
      version: '0.0.0-test',
      startedAt: new Date().toISOString(),
    }
    writeCoreEndpoint(h.dir, endpoint)
    assert.ok(existsSync(coreEndpointFile(h.dir)), 'the file exists under home')
    assert.equal(existsSync(`${coreEndpointFile(h.dir)}.tmp-${process.pid}`), false,
      'the temp file is gone: the rename took it with it')

    const read = readCoreEndpoint(h.dir)
    assert.ok(read, 'the file reads back')
    assert.equal(read!.url, endpoint.url, 'the url survives the roundtrip')
    assert.equal(read!.pid, endpoint.pid, 'the pid survives the roundtrip')
    assert.equal(read!.version, endpoint.version, 'the version survives the roundtrip')
    assert.equal(read!.startedAt, endpoint.startedAt, 'startedAt survives the roundtrip')
  } finally { h.cleanup() }
})

test('a stale endpoint file (dead pid) and a broken file read as missing', async () => {
  const h = home()
  try {
    // A real process that has exited: its pid is gone, not merely unsignallable.
    const child = spawn(process.execPath, ['-e', 'process.exit(0)'], { stdio: 'ignore' })
    await once(child, 'exit')
    writeCoreEndpoint(h.dir, {
      url: 'http://127.0.0.1:45998',
      pid: child.pid!,
      version: '0.0.0-test',
      startedAt: new Date().toISOString(),
    })
    const deadline = Date.now() + 5_000
    while (readCoreEndpoint(h.dir) !== null && Date.now() < deadline) sleepSync(20)
    assert.equal(readCoreEndpoint(h.dir), null, 'a dead pid is stale, not an endpoint')

    writeFileSync(coreEndpointFile(h.dir), '{ not json')
    assert.equal(readCoreEndpoint(h.dir), null, 'an unparseable file is missing')

    writeFileSync(coreEndpointFile(h.dir), JSON.stringify({ url: 3, pid: 'x' }))
    assert.equal(readCoreEndpoint(h.dir), null, 'malformed fields are missing too')
  } finally { h.cleanup() }
})

test('a missing endpoint file reads as null', () => {
  const h = home()
  try {
    assert.equal(readCoreEndpoint(h.dir), null, 'no file, no endpoint')
  } finally { h.cleanup() }
})

test('removeCoreEndpoint takes its own file and leaves a foreign serve alone', () => {
  const h = home()
  try {
    const foreign: CoreEndpoint = {
      url: 'http://127.0.0.1:45997', pid: 424242, version: '0.0.0-test', startedAt: new Date().toISOString(),
    }
    writeCoreEndpoint(h.dir, foreign)
    removeCoreEndpoint(h.dir, process.pid)
    assert.ok(existsSync(coreEndpointFile(h.dir)), 'a foreign serve file is not ours to remove')

    const own: CoreEndpoint = { ...foreign, pid: process.pid }
    writeCoreEndpoint(h.dir, own)
    removeCoreEndpoint(h.dir, process.pid)
    assert.equal(existsSync(coreEndpointFile(h.dir)), false, 'a serve takes its own file with it')
  } finally { h.cleanup() }
})

test('serve publishes core.json where consumers look, and takes it with it on the way down', async () => {
  const h = home()
  const db = openStore(join(h.dir, 'brain.db'))
  try {
    const handle = await serve({ db, uiRoot: null, authKey: 'test-key', home: h.dir }, 0)
    const file = coreEndpointFile(h.dir)
    assert.ok(existsSync(file), 'core.json exists after listen')

    const read = readCoreEndpoint(h.dir)
    assert.ok(read, 'core.json reads back with a live pid')
    assert.equal(read!.url, `http://127.0.0.1:${handle.port}`, 'the url is where serve actually listens')
    assert.equal(read!.pid, process.pid, 'the pid is the serving process')
    assert.ok(read!.version && read!.version !== 'unknown', `the version is real (${read!.version})`)
    assert.ok(!Number.isNaN(Date.parse(read!.startedAt)), 'startedAt is an ISO timestamp')

    await handle.close()
    assert.equal(existsSync(file), false, 'a clean shutdown takes core.json with it')
  } finally {
    try { db.close() } catch { /* ignore */ }
    h.cleanup()
  }
})
