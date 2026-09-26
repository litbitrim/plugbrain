/**
 * S3 acceptance: `plugbrain setup` writes one MCP entry per client, keeps every
 * other entry intact, backs the file up once, is idempotent and can undo.
 *
 * Every case runs against a temp home, so the owner's real client configs are
 * never read or written.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import {
  buildEntry, findLatestBackup, parseClientSelection, renderClientConfig,
  resolveClientTargets, setupClients, CLIENTS,
} from '../src/setup/clients.ts'

function fixture() {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-setup-home-'))
  const entry = buildEntry(join(home, 'cli.ts'))
  const cleanup = () => rmSync(home, { recursive: true, force: true })
  const write = (rel: string, text: string) => {
    const path = join(home, rel)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, text)
    return path
  }
  const backups = (path: string) =>
    readdirSync(dirname(path)).filter(name => name.startsWith(`${basename(path)}.plugbrain-backup-`))
  return { home, entry, cleanup, write, backups }
}

/** Results cover every client; pick the one under test by id. */
function pick<T extends { id: string }>(results: T[], id: string): T {
  const found = results.find(result => result.id === id)
  assert.ok(found, `no result for ${id}`)
  return found
}

test('buildEntry names an absolute node, the absolute CLI, and the mcp verb', () => {
  const entry = buildEntry('C:/work/cli.ts', 'C:/node/node.exe')
  assert.equal(entry.command, 'C:/node/node.exe')
  assert.equal(entry.args[0], '--experimental-strip-types')
  assert.equal(entry.args[entry.args.length - 1], 'mcp')
  assert.ok(entry.args.some(arg => arg.endsWith('cli.ts')))
  assert.equal(entry.args.filter(arg => arg.startsWith('--workspace')).length, 0)
})

test('a client is detected by its config file or its folder', () => {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-detect-'))
  try {
    mkdirSync(join(home, '.cursor'), { recursive: true })
    writeFileSync(join(home, '.claude.json'), '{}')
    const targets = new Map(resolveClientTargets(home).map(t => [t.def.id, t]))
    assert.equal(targets.get('claude')!.detected, true, 'claude detects only by its file')
    assert.equal(targets.get('cursor')!.detected, true, 'cursor detects by its folder')
    assert.equal(targets.get('hermes')!.detected, false)
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('JSON clients keep other entries and gain plugbrain with a backup', () => {
  const f = fixture()
  try {
    const path = f.write('.cursor/mcp.json', JSON.stringify({ mcpServers: { other: { command: 'x' } } }, null, 2) + '\n')
    const results = setupClients({ home: f.home, entry: f.entry, only: ['cursor'] })
    assert.equal(pick(results, 'cursor').action, 'updated')

    const after = JSON.parse(readFileSync(path, 'utf8'))
    assert.deepEqual(after.mcpServers.other, { command: 'x' })
    assert.equal(after.mcpServers.plugbrain.command, f.entry.command)
    assert.deepEqual(after.mcpServers.plugbrain.args, f.entry.args)
    assert.equal(f.backups(path).length, 1)

    const again = setupClients({ home: f.home, entry: f.entry, only: ['cursor'] })
    assert.equal(pick(again, 'cursor').action, 'unchanged')
    assert.equal(f.backups(path).length, 1, 'a no-op run must not add a backup')

    const undone = setupClients({ home: f.home, entry: f.entry, only: ['cursor'], undo: true })
    assert.equal(pick(undone, 'cursor').action, 'undone')
    assert.deepEqual(JSON.parse(readFileSync(path, 'utf8')), { mcpServers: { other: { command: 'x' } } })
  } finally {
    f.cleanup()
  }
})

test('a fresh JSON config is created with just the plugbrain entry', () => {
  const f = fixture()
  try {
    const path = f.write('.gemini/antigravity/mcp_config.json', '{}\n')
    const results = setupClients({ home: f.home, entry: f.entry, only: ['agy'] })
    assert.equal(pick(results, 'agy').action, 'updated')
    const after = JSON.parse(readFileSync(path, 'utf8'))
    assert.equal(after.mcpServers.plugbrain.command, f.entry.command)
    assert.equal(f.backups(path).length, 1)
  } finally {
    f.cleanup()
  }
})

test('Codex TOML keeps comments and unrelated tables', () => {
  const f = fixture()
  try {
    const before = [
      '# my codex config',
      'model = "gpt-5"',
      '',
      '[mcp_servers.other]',
      'command = "other"',
      '',
    ].join('\n')
    const path = f.write('.codex/config.toml', before)
    const results = setupClients({ home: f.home, entry: f.entry, only: ['codex'] })
    assert.equal(pick(results, 'codex').action, 'updated')

    const after = readFileSync(path, 'utf8')
    assert.match(after, /# my codex config/)
    assert.match(after, /model = "gpt-5"/)
    assert.match(after, /\[mcp_servers\.other\]/)
    assert.match(after, /\[mcp_servers\.plugbrain\]/)
    assert.match(after, /args = \[[^\]]*mcp[^\]]*\]/)

    const twice = setupClients({ home: f.home, entry: f.entry, only: ['codex'] })
    assert.equal(pick(twice, 'codex').action, 'unchanged')
    assert.equal(f.backups(path).length, 1)
  } finally {
    f.cleanup()
  }
})

test('Hermes YAML keeps other servers and is idempotent', () => {
  const f = fixture()
  try {
    const before = ['theme: dark', 'mcp_servers:', '  other:', "    command: 'other'", ''].join('\n')
    const path = f.write('.hermes/config.yaml', before)
    const results = setupClients({ home: f.home, entry: f.entry, only: ['hermes'] })
    assert.equal(pick(results, 'hermes').action, 'updated')

    const after = readFileSync(path, 'utf8')
    assert.match(after, /^theme: dark$/m)
    assert.match(after, /^ {2}other:$/m)
    assert.match(after, /^ {2}plugbrain:$/m)
    assert.match(after, /^ {4}command: /m)

    const twice = setupClients({ home: f.home, entry: f.entry, only: ['hermes'] })
    assert.equal(pick(twice, 'hermes').action, 'unchanged')
  } finally {
    f.cleanup()
  }
})

test('--dry-run shows the change but writes nothing', () => {
  const f = fixture()
  try {
    const original = JSON.stringify({ mcpServers: {} }, null, 2) + '\n'
    const path = f.write('.claude.json', original)
    const results = setupClients({ home: f.home, entry: f.entry, only: ['claude'], dryRun: true })
    const claude = pick(results, 'claude')
    assert.equal(claude.action, 'dry-run')
    assert.equal(readFileSync(path, 'utf8'), original, 'dry-run must not touch the file')
    assert.equal(f.backups(path).length, 0, 'dry-run must not leave a backup')
    assert.notEqual(claude.before, claude.after)
  } finally {
    f.cleanup()
  }
})

test('undo with no backup is a no-op, not an error', () => {
  const f = fixture()
  try {
    const path = f.write('.cursor/mcp.json', '{}\n')
    assert.equal(findLatestBackup(path), null)
    const results = setupClients({ home: f.home, entry: f.entry, only: ['cursor'], undo: true })
    assert.equal(pick(results, 'cursor').action, 'unchanged')
    assert.equal(readFileSync(path, 'utf8'), '{}\n')
  } finally {
    f.cleanup()
  }
})

test('an empty home reports every client as skipped', () => {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-empty-'))
  try {
    const results = setupClients({ home, entry: buildEntry(join(home, 'cli.ts')) })
    assert.equal(results.length, CLIENTS.length)
    assert.ok(results.every(r => r.action === 'skipped' && r.detected === false))
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
})

test('parseClientSelection understands --all, ids and unknown names', () => {
  assert.deepEqual(parseClientSelection(['--all']), { only: null, unknown: [] })
  assert.deepEqual(parseClientSelection([]), { only: null, unknown: [] })
  assert.deepEqual(parseClientSelection(['cursor', 'codex']), { only: ['cursor', 'codex'], unknown: [] })
  assert.deepEqual(parseClientSelection(['--dry-run', 'nope']), { only: null, unknown: ['nope'] })
})

test('renderClientConfig refuses to rewrite invalid JSON', () => {
  const cursor = CLIENTS.find(c => c.id === 'cursor')!
  assert.throws(() => renderClientConfig(cursor, '{ not json', buildEntry('cli.ts')), /not valid JSON/)
})
