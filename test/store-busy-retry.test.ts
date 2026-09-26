/**
 * The busy brain: a writer that arrives while another connection holds the
 * write transaction waits and succeeds instead of crashing the CLI.
 *
 * The case it exists for happened on 25.09.2026, 23:47: `plugbrain swarm admit
 * build` died with "database is locked" while the daemon incrementally
 * indexed. Every connection waits (`busy_timeout`), writes retry bounded, and
 * a holder that outlasts both still fails honestly instead of hanging forever.
 */
import { strict as assert } from 'node:assert'
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore, sleepSync, withBusyRetry, WRITER_GENERATION } from '../src/store/schema.ts'

function home() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-busy-'))
  // Best-effort cleanup, the repo convention: a locked temp dir is left to the OS.
  return { dir, cleanup: () => { try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* ignore */ } } }
}

test('a second connection writes while the first holds the write transaction, and waits instead of throwing', () => {
  const h = home()
  const file = join(h.dir, 'brain.db')
  const marker = join(h.dir, 'held.marker')
  try {
    const seed = openStore(file)
    seed.close()

    // A separate process — the way the daemon and the CLI actually race —
    // opens an explicit write transaction and holds it for a moment. It marks
    // a file as soon as the transaction is open, so the waiting side never
    // races the setup.
    // The script goes through a temp file: with `-e`, process.argv shifts and
    // the holder would point at the wrong path (it once opened its database
    // AT the marker path and the signal meant nothing).
    const holderFile = join(h.dir, 'holder.cjs')
    writeFileSync(holderFile, `
      const { DatabaseSync } = require('node:sqlite')
      const fs = require('node:fs')
      const db = new DatabaseSync(process.argv[2])
      db.exec('PRAGMA busy_timeout = 15000;')
      db.exec('BEGIN IMMEDIATE')
      db.prepare("INSERT INTO store_meta (key, value) VALUES ('busy_probe', 'held')").run()
      fs.writeFileSync(process.argv[3], 'held')
      setTimeout(() => { db.exec('COMMIT'); db.close(); process.exit(0) }, 700)
    `)
    const child = spawn(process.execPath, [holderFile, file, marker], { stdio: 'ignore' })
    child.unref()

    const deadline = Date.now() + 10_000
    while (!existsSync(marker) && Date.now() < deadline) sleepSync(20)
    assert.ok(existsSync(marker), 'the holder process began its write transaction')

    // The second connection writes (a real generation bump) while the holder
    // is open: it waits for the held transaction instead of throwing.
    const started = Date.now()
    const second = openStore(file, { writerGeneration: WRITER_GENERATION + 1 })
    const waitedMs = Date.now() - started
    second.close()
    assert.ok(waitedMs >= 500, `the second connection waited ${waitedMs}ms for the held transaction`)

    // The holder's transaction committed — nothing was lost to the race.
    const after = openStore(file)
    const row = after.prepare("SELECT value FROM store_meta WHERE key = 'busy_probe'").get() as
      { value: string } | undefined
    after.close()
    assert.equal(row?.value, 'held', 'the holder committed its transaction')
  } finally { h.cleanup() }
})

test('a busy write retries a bounded number of times and then gives up honestly', () => {
  const busyError = (): Error => Object.assign(new Error('database is locked'), { errcode: 5 })
  let attempts = 0

  const recovers = (): number => {
    attempts += 1
    if (attempts < 3) throw busyError()
    return 42
  }
  assert.equal(withBusyRetry(recovers), 42, 'a busy write that recovers succeeds')
  assert.equal(attempts, 3)

  attempts = 0
  const foreign = (): number => { attempts += 1; throw new Error('not a sqlite error') }
  assert.throws(() => withBusyRetry(foreign), /not a sqlite error/, 'a non-busy error is never retried')
  assert.equal(attempts, 1, 'a non-busy error never got a second attempt')

  attempts = 0
  const alwaysBusy = (): number => { attempts += 1; throw busyError() }
  assert.throws(() => withBusyRetry(alwaysBusy), /database is locked/, 'the bound holds')
  assert.equal(attempts, 4, 'four attempts, no more')
})

test('statements from openStore keep their plain contract while their writes retry', () => {
  const h = home()
  try {
    const db = openStore(join(h.dir, 'brain.db'))
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run('ws-x', 'ws-x', 'C:\\x', new Date().toISOString())
    const row = db.prepare('SELECT id FROM workspaces WHERE id = ?').get('ws-x') as { id: string }
    assert.equal(row.id, 'ws-x', 'get still works through the wrapped statement')

    const rows = db.prepare('SELECT 1 AS one').all() as { one: number }[]
    assert.deepEqual(rows.map(one => one.one), [1], 'all still works through the wrapped statement')
    db.close()
  } finally { h.cleanup() }
})
