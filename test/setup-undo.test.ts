/**
 * SETUP-02: honest undo.
 *
 * 1. When setup CREATED a config file (empty marker backup), undo removes only
 *    our plugbrain entry — or the file itself when nothing of the user's
 *    remains — and says so, instead of reporting 'unchanged'.
 * 2. Before undo restores a backup it writes a counter-backup of the current
 *    stand, so user edits made after setup are never lost.
 *
 * Every case runs against a temp home, so the owner's real client configs are
 * never read or written.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import { buildEntry, setupClients, undoBackupPathFor } from '../src/setup/clients.ts'

function fixture() {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-setup-undo-'))
  const entry = buildEntry(join(home, 'cli.ts'))
  const cleanup = () => rmSync(home, { recursive: true, force: true })
  const mkdir = (rel: string) => {
    const path = join(home, rel)
    mkdirSync(path, { recursive: true })
    return path
  }
  const write = (rel: string, text: string) => {
    const path = join(home, rel)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, text)
    return path
  }
  const backups = (path: string) =>
    readdirSync(dirname(path)).filter(name => name.startsWith(`${basename(path)}.plugbrain-backup-`))
  const undobackups = (path: string) =>
    readdirSync(dirname(path)).filter(name => name.startsWith(`${basename(path)}.plugbrain-undobackup-`))
  return { home, entry, cleanup, mkdir, write, backups, undobackups }
}

/** Results cover every client; pick the one under test by id. */
function pick<T extends { id: string }>(results: T[], id: string): T {
  const found = results.find(result => result.id === id)
  assert.ok(found, `no result for ${id}`)
  return found
}

test('undo rolls back a file setup created: entry removed, empty file deleted', () => {
  const f = fixture()
  try {
    const path = join(f.mkdir('.gemini/antigravity'), 'mcp_config.json')
    const results = setupClients({ home: f.home, entry: f.entry, only: ['agy'] })
    assert.equal(pick(results, 'agy').action, 'created')
    // The creation is recorded by an empty marker backup.
    const marker = f.backups(path)
    assert.equal(marker.length, 1)
    assert.equal(readFileSync(join(dirname(path), marker[0]!), 'utf8'), '')

    const undo = setupClients({ home: f.home, entry: f.entry, undo: true, only: ['agy'] })
    const result = pick(undo, 'agy')
    assert.equal(result.action, 'undone')
    assert.equal(result.note, 'file was created by setup: plugbrain entry removed, empty file deleted')
    assert.equal(existsSync(path), false)
    // Nothing is lost: the pre-undo stand was kept as a counter-backup.
    assert.ok(result.counterBackupPath)
    assert.match(readFileSync(result.counterBackupPath!, 'utf8'), /plugbrain/)
    assert.equal(f.undobackups(path).length, 1)
  } finally {
    f.cleanup()
  }
})

test('undo of a created file keeps user content added after setup', () => {
  const f = fixture()
  try {
    const path = join(f.mkdir('.cursor'), 'mcp.json')
    setupClients({ home: f.home, entry: f.entry, only: ['cursor'] })
    // The user adds their own server to the file setup created.
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as { mcpServers: Record<string, unknown> }
    parsed.mcpServers.acme = { command: 'acme' }
    const edited = `${JSON.stringify(parsed, null, 2)}\n`
    writeFileSync(path, edited)

    const undo = setupClients({ home: f.home, entry: f.entry, undo: true, only: ['cursor'] })
    const result = pick(undo, 'cursor')
    assert.equal(result.action, 'undone')
    assert.equal(result.note, 'file was created by setup: only the plugbrain entry was removed')
    const after = JSON.parse(readFileSync(path, 'utf8')) as { mcpServers: Record<string, unknown> }
    assert.equal(after.mcpServers.plugbrain, undefined)
    assert.equal((after.mcpServers.acme as { command: string }).command, 'acme')
    assert.ok(result.counterBackupPath)
    assert.equal(readFileSync(result.counterBackupPath!, 'utf8'), edited)
  } finally {
    f.cleanup()
  }
})

test('undo restores the pre-setup stand and keeps the post-setup stand as a counter-backup', () => {
  const f = fixture()
  try {
    const before = '{\n  "mcpServers": {\n    "acme": {"command": "acme"}\n  }\n}\n'
    const path = f.write('.claude.json', before)
    setupClients({ home: f.home, entry: f.entry, only: ['claude'] })

    const undo = setupClients({ home: f.home, entry: f.entry, undo: true, only: ['claude'] })
    const result = pick(undo, 'claude')
    assert.equal(result.action, 'undone')
    assert.equal(readFileSync(path, 'utf8'), before)
    // The counter-backup holds the stand undo replaced.
    assert.ok(result.counterBackupPath)
    assert.match(readFileSync(result.counterBackupPath!, 'utf8'), /plugbrain/)
    assert.equal(f.undobackups(path).length, 1)
  } finally {
    f.cleanup()
  }
})

test('undo never loses user edits made after setup', () => {
  const f = fixture()
  try {
    const before = '{\n  "mcpServers": {\n    "acme": {"command": "acme"}\n  }\n}\n'
    const path = f.write('.claude.json', before)
    setupClients({ home: f.home, entry: f.entry, only: ['claude'] })
    // The user edits the file while plugbrain's entry is in it.
    const edited = `${readFileSync(path, 'utf8').trimEnd()},\n"user": {"command": "mine"}\n`
    writeFileSync(path, edited)

    const undo = setupClients({ home: f.home, entry: f.entry, undo: true, only: ['claude'] })
    assert.equal(pick(undo, 'claude').action, 'undone')
    assert.equal(readFileSync(path, 'utf8'), before)
    // The user's edited stand survived in the counter-backup.
    const kept = f.undobackups(path)
    assert.equal(kept.length, 1)
    assert.equal(readFileSync(join(dirname(path), kept[0]!), 'utf8'), edited)
  } finally {
    f.cleanup()
  }
})

test('a second undo picks the setup backup again, not the counter-backup', () => {
  const f = fixture()
  try {
    const before = '{\n  "mcpServers": {}\n}\n'
    const path = f.write('.claude.json', before)
    setupClients({ home: f.home, entry: f.entry, only: ['claude'] })
    const first = pick(setupClients({ home: f.home, entry: f.entry, undo: true, only: ['claude'] }), 'claude')
    assert.equal(first.action, 'undone')
    assert.ok(first.counterBackupPath)

    const second = pick(setupClients({ home: f.home, entry: f.entry, undo: true, only: ['claude'] }), 'claude')
    assert.equal(second.action, 'undone')
    assert.equal(readFileSync(path, 'utf8'), before)
    // No new counter-backup: the current stand already matched the backup.
    assert.equal(second.counterBackupPath, null)
    assert.equal(f.undobackups(path).length, 1)
  } finally {
    f.cleanup()
  }
})

test('undo of a created TOML file deletes it when nothing remains', () => {
  const f = fixture()
  try {
    const path = join(f.mkdir('.codex'), 'config.toml')
    const results = setupClients({ home: f.home, entry: f.entry, only: ['codex'] })
    assert.equal(pick(results, 'codex').action, 'created')

    const undo = setupClients({ home: f.home, entry: f.entry, undo: true, only: ['codex'] })
    const result = pick(undo, 'codex')
    assert.equal(result.action, 'undone')
    assert.equal(existsSync(path), false)
  } finally {
    f.cleanup()
  }
})

test('undo of a created YAML file deletes it when nothing remains', () => {
  const f = fixture()
  try {
    const path = join(f.mkdir('.hermes'), 'config.yaml')
    const results = setupClients({ home: f.home, entry: f.entry, only: ['hermes'] })
    assert.equal(pick(results, 'hermes').action, 'created')

    const undo = setupClients({ home: f.home, entry: f.entry, undo: true, only: ['hermes'] })
    const result = pick(undo, 'hermes')
    assert.equal(result.action, 'undone')
    assert.equal(existsSync(path), false)
  } finally {
    f.cleanup()
  }
})

test('undoBackupPathFor uses a name findLatestBackup never picks', () => {
  const f = fixture()
  try {
    const path = f.write('.claude.json', '{}\n')
    const p = undoBackupPathFor(path)
    assert.match(basename(p), /\.plugbrain-undobackup-/)
    assert.equal(f.backups(path).length, 0)
  } finally {
    f.cleanup()
  }
})
