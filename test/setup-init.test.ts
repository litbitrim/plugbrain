/**
 * S2 + S4 acceptance, end to end and out of process.
 *
 *   init on a temp repo  ->  `mcp` over stdio  ->  tools/list  ->  query
 *
 * Every case runs against a temp home and a temp repository: the owner's brain
 * and client configs are never touched.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { execFileSync, spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import type { ChildProcess } from 'node:child_process'
import { openStore } from '../src/store/schema.ts'

const CLI = join(import.meta.dirname, '..', 'src', 'cli.ts')

function makeFixture() {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-init-home-'))
  const repo = mkdtempSync(join(tmpdir(), 'plugbrain-init-repo-'))
  execFileSync('git', ['init', '-q', repo], { stdio: 'ignore' })
  const file = join(repo, 'src', 'zebra.ts')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, [
    '/** A canary symbol the query must find. */',
    'export function zebraFunction(value: number): number {',
    '  return value * 2',
    '}',
    '',
    'export const zebraConstant = 41',
    '',
  ].join('\n'))
  return {
    home, repo,
    cleanup: () => {
      // Windows keeps the child's SQLite file locked for a moment after exit.
      const opts = { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }
      try { rmSync(home, opts) } catch { /* a locked temp dir is left to the OS */ }
      try { rmSync(repo, opts) } catch { /* a locked temp dir is left to the OS */ }
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

test('S2: init registers once, indexes, and enrolls a detected client', () => {
  const f = makeFixture()
  // PLUGBRAIN_CONFIG_HOME is the temp home for CLIENT files, so the owner's
  // real ~/.claude.json etc. are never opened. HOME/USERPROFILE are set too as
  // a second belt: homedir() must resolve inside the temp folder.
  const env = tempEnv(f.home)
  try {
    // A client that is "installed" because its config file exists.
    writeFileSync(join(f.home, '.claude.json'), '{}\n')

    const first = runCli(['init', f.repo], env, f.repo)
    assert.match(first, /registered workspace/)
    assert.match(first, /generation/)
    assert.match(first, /clients:/)
    assert.match(first, /Claude Code/)
    assert.match(first, /agent instructions:/)
    const agentFile = readFileSync(join(f.repo, 'AGENTS.md'), 'utf8')
    assert.match(agentFile, /<!-- plugbrain:agent-protocol:start -->/)
    assert.match(agentFile, /<!-- plugbrain:agent-protocol:end -->/)
    assert.match(agentFile, /agent id is `<id>`/)
    assert.doesNotMatch(first, /PlugBrain-Core--setup/, 'the entry must name this CLI, not the owner install')

    const enrolled = JSON.parse(readFileSync(join(f.home, '.claude.json'), 'utf8'))
    assert.equal(enrolled.mcpServers.plugbrain.args.at(-1), 'mcp')

    const second = runCli(['init', f.repo], env, f.repo)
    assert.match(second, /already known/)

    const db = openStore(join(f.home, 'plugbrain.db'))
    try {
      const rows = db.prepare('SELECT id FROM workspaces').all() as Array<{ id: string }>
      assert.equal(rows.length, 1, 'two runs must yield one workspace')
    } finally {
      db.close()
    }
  } finally {
    f.cleanup()
  }
})

/** A line-oriented JSON-RPC client over a child's stdio. */
function rpc(child: ChildProcess) {
  const pending = new Map<number | string, (message: Record<string, unknown>) => void>()
  let buffered = ''
  child.stdout!.on('data', chunk => {
    buffered += String(chunk)
    let nl = buffered.indexOf('\n')
    while (nl >= 0) {
      const line = buffered.slice(0, nl).trim()
      buffered = buffered.slice(nl + 1)
      if (line !== '') {
        try {
          const message = JSON.parse(line)
          const waiter = pending.get(message.id)
          if (waiter && message.id !== undefined) { pending.delete(message.id); waiter(message) }
        } catch { /* not a JSON-RPC line (a log line); ignore */ }
      }
      nl = buffered.indexOf('\n')
    }
  })
  const request = (id: number, method: string, params: Record<string, unknown> = {}) =>
    new Promise<Record<string, unknown>>((resolve, reject) => {
      pending.set(id, resolve)
      child.stdin!.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`)
      setTimeout(() => reject(new Error(`timed out waiting for ${method}`)), 30_000).unref()
    })
  const notify = (method: string, params: Record<string, unknown> = {}) =>
    child.stdin!.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`)
  return { request, notify }
}

test('S5: init --dry-run reports but writes neither a workspace nor a client', () => {
  const f = makeFixture()
  const env = tempEnv(f.home)
  try {
    writeFileSync(join(f.home, '.claude.json'), '{}\n')
    const out = runCli(['init', f.repo, '--dry-run'], env, f.repo)
    assert.match(out, /dry run \(nothing is written\)/)
    assert.match(out, /would register workspace/)
    assert.match(out, /would index/)
    assert.match(out, /would change/)
    assert.match(out, /agent instructions:/)
    assert.match(out, /dry-run/)

    assert.equal(readFileSync(join(f.home, '.claude.json'), 'utf8'), '{}\n')
    assert.equal(existsSync(join(f.repo, 'AGENTS.md')), false)
    const db = openStore(join(f.home, 'plugbrain.db'))
    try {
      const rows = db.prepare('SELECT id FROM workspaces').all() as Array<{ id: string }>
      assert.equal(rows.length, 0, 'a dry run must not register a workspace')
    } finally {
      db.close()
    }
  } finally {
    f.cleanup()
  }
})

test('doctor --agents --json is read-only when no Brain store exists', () => {
  const f = makeFixture()
  try {
    const env = { ...tempEnv(f.home), PLUGBRAIN_DOCTOR_PORT: '9' }
    const out = runCli(['doctor', '--agents', '--json'], env, f.repo)
    const rows = JSON.parse(out) as Array<{ client: string; fix: string }>
    assert.equal(rows.length, 7)
    assert.ok(rows.every(row => typeof row.fix === 'string' && row.fix.length > 0))
    assert.equal(existsSync(join(f.home, 'plugbrain.db')), false)
    assert.deepEqual(readdirSync(f.home), [])
  } finally {
    f.cleanup()
  }
})

test('S4: init then mcp over stdio answers tools/list and finds the symbol', async () => {
  const f = makeFixture()
  const env = tempEnv(f.home)
  let child: ChildProcess | null = null
  const stopped = () => new Promise<void>(resolve => {
    if (child === null || child.exitCode !== null) { resolve(); return }
    child.once('exit', () => resolve())
    child.kill()
  })
  try {
    runCli(['init', f.repo, '--no-clients'], env, f.repo)

    child = spawn(process.execPath, ['--experimental-strip-types', CLI, 'mcp'], {
      cwd: f.repo, env, stdio: ['pipe', 'pipe', 'pipe'],
    })
    const { request, notify } = rpc(child)

    const init = await request(1, 'initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'plugbrain-test', version: '0' },
    })
    assert.ok(init.result, `initialize failed: ${JSON.stringify(init)}`)
    notify('notifications/initialized')

    const list = await request(2, 'tools/list')
    const names = (list.result as { tools: Array<{ name: string }> }).tools.map(tool => tool.name)
    assert.ok(names.includes('query'), `query missing from ${names.join(', ')}`)

    const query = await request(3, 'tools/call', { name: 'query', arguments: { query: 'zebraFunction' } })
    assert.ok(JSON.stringify(query).includes('zebraFunction'),
      `query did not return the symbol: ${JSON.stringify(query).slice(0, 400)}`)
  } finally {
    await stopped()
    f.cleanup()
  }
})
