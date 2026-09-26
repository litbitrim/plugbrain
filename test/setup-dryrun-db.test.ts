/**
 * SETUP-02 fix 3: `init --dry-run` plans only — it must not create
 * plugbrain.db. It opens the real store read-only when one exists (so
 * "already known" stays honest) and an in-memory store when none does.
 *
 * Every case runs against a temp HOME: PLUGBRAIN_HOME and PLUGBRAIN_CONFIG_HOME
 * always point inside the temp folder, so the owner's real configs and store
 * are never read or written.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { openStore } from '../src/store/schema.ts'

const CLI = join(import.meta.dirname, '..', 'src', 'cli.ts')

function makeFixture() {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-dryrun-home-'))
  const repo = mkdtempSync(join(tmpdir(), 'plugbrain-dryrun-repo-'))
  execFileSync('git', ['init', '-q', repo], { stdio: 'ignore' })
  const file = join(repo, 'src', 'zebra.ts')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, [
    '/** A canary symbol the query must find. */',
    'export function zebraFunction(value: number): number {',
    '  return value * 2',
    '}',
    '',
  ].join('\n'))
  return {
    home, repo,
    cleanup: () => {
      const opts = { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }
      try { rmSync(home, opts) } catch { /* a locked temp dir is left to the OS */ }
      try { rmSync(repo, opts) } catch { /* ditto */ }
    },
  }
}

/** Env that keeps the whole run inside `home` — store AND client configs. */
function tempEnv(home: string): NodeJS.ProcessEnv {
  return {
    ...process.env,
    PLUGBRAIN_HOME: home,
    PLUGBRAIN_CONFIG_HOME: home,
    HOME: home,
    USERPROFILE: home,
  }
}

function runCli(args: string[], env: NodeJS.ProcessEnv, cwd: string): string {
  return execFileSync(process.execPath, ['--experimental-strip-types', CLI, ...args], {
    cwd, env: { ...process.env, ...env }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
  })
}

test('init --dry-run creates no plugbrain.db', () => {
  const f = makeFixture()
  const env = tempEnv(f.home)
  try {
    const dbFile = join(f.home, 'plugbrain.db')
    assert.equal(existsSync(dbFile), false, 'fixture must start without a store')
    const out = runCli(['init', f.repo, '--dry-run'], env, f.repo)
    assert.match(out, /dry run \(nothing is written\)/)
    assert.equal(existsSync(dbFile), false, 'a dry run must not create the database file')
  } finally {
    f.cleanup()
  }
})

test('init --dry-run opens an existing store read-only and leaves it intact', () => {
  const f = makeFixture()
  const env = tempEnv(f.home)
  try {
    runCli(['init', f.repo, '--no-clients'], env, f.repo)
    const dbFile = join(f.home, 'plugbrain.db')
    assert.equal(existsSync(dbFile), true, 'the real init created the store')

    const out = runCli(['init', f.repo, '--dry-run'], env, f.repo)
    assert.match(out, /already known|registered workspace/)
    // The store survived the dry run with its workspace intact.
    const db = openStore(dbFile)
    try {
      const rows = db.prepare('SELECT id FROM workspaces').all() as Array<{ id: string }>
      assert.equal(rows.length, 1)
    } finally {
      db.close()
    }
  } finally {
    f.cleanup()
  }
})
