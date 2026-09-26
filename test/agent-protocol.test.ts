import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { AGENT_PROTOCOL_BLOCK, doctorAgents, manageAgentFile, renderAgentFile, selectAgentFiles } from '../src/setup/agent-protocol.ts'

const CLI = join(import.meta.dirname, '..', 'src', 'cli.ts')

test('agent block is inserted, replaced, byte-preserving outside markers and undoable', () => {
  const before = 'first\r\n\r\nlast\n'
  const rendered = renderAgentFile(before)
  assert.equal(rendered.changed, true)
  assert.ok(rendered.text.startsWith(before), 'all original bytes stay before the appended managed block')
  assert.ok(renderAgentFile(rendered.text).text.includes(AGENT_PROTOCOL_BLOCK))
  const replaced = renderAgentFile(rendered.text.replace('are one agent', 'are one worker'))
  assert.ok(replaced.text.includes('are one agent'))
  assert.ok(replaced.text.startsWith('first\r\n\r\n'))
  assert.ok(replaced.text.startsWith(before))
  assert.throws(() => renderAgentFile('<!-- plugbrain:agent-protocol:start --> only'), /repair the markers/)
  assert.throws(() => renderAgentFile('<!-- plugbrain:agent-protocol:start --><!-- plugbrain:agent-protocol:start --><!-- plugbrain:agent-protocol:end -->'), /duplicate/)

  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-agent-file-'))
  try {
    const file = join(dir, 'AGENTS.md')
    const first = manageAgentFile(file)
    assert.equal(first.action, 'created')
    assert.ok(first.backup)
    const dry = manageAgentFile(file, { dryRun: true })
    assert.equal(dry.action, 'unchanged')
    assert.equal(readFileSync(file, 'utf8'), first.after)
    assert.equal(manageAgentFile(file, { undo: true }).action, 'undone')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('dry-run and undo preserve existing content and select the expected files', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-agent-target-'))
  try {
    const agents = join(dir, 'AGENTS.md')
    const claude = join(dir, 'CLAUDE.md')
    writeFileSync(agents, 'custom')
    writeFileSync(claude, 'custom')
    assert.deepEqual(selectAgentFiles(dir).map(p => p.split(/[\\/]/).pop()), ['AGENTS.md', 'CLAUDE.md'])
    writeFileSync(claude, 'See AGENTS.md')
    assert.deepEqual(selectAgentFiles(dir).map(p => p.split(/[\\/]/).pop()), ['AGENTS.md'])
    const preview = manageAgentFile(agents, { dryRun: true })
    assert.equal(preview.action, 'dry-run')
    assert.equal(readFileSync(agents, 'utf8'), 'custom')
    manageAgentFile(agents)
    const managed = readFileSync(agents, 'utf8')
    const directoryBeforePreview = readdirSync(dir).sort()
    const undoPreview = manageAgentFile(agents, { undo: true, dryRun: true })
    assert.equal(undoPreview.action, 'dry-run')
    assert.equal(undoPreview.after, 'custom')
    assert.equal(readFileSync(agents, 'utf8'), managed, 'undo --dry-run must not change the file')
    assert.deepEqual(readdirSync(dir).sort(), directoryBeforePreview, 'undo --dry-run must not remove or create backups')
    assert.equal(manageAgentFile(agents, { undo: true }).action, 'undone')
    assert.equal(readFileSync(agents, 'utf8'), 'custom')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('undo --dry-run keeps a newly created managed file and its marker backup', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-agent-undo-created-'))
  try {
    const file = join(dir, 'AGENTS.md')
    manageAgentFile(file)
    const managed = readFileSync(file, 'utf8')
    const filesBeforePreview = readdirSync(dir).sort()
    const preview = manageAgentFile(file, { undo: true, dryRun: true })
    assert.equal(preview.action, 'dry-run')
    assert.equal(preview.after, null)
    assert.equal(readFileSync(file, 'utf8'), managed, 'undo --dry-run must not unlink the managed file')
    assert.deepEqual(readdirSync(dir).sort(), filesBeforePreview, 'undo --dry-run must preserve the creation marker backup')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('doctor reports missing, wrong and valid client state without writes', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-doctor-'))
  const config = join(dir, '.claude.json')
  const install = join(dir, 'Programs', 'PlugBrain')
  const cli = join(install, 'plugbrain.js')
  try {
    mkdirSync(install, { recursive: true })
    mkdirSync(join(dir, 'project'), { recursive: true })
    writeFileSync(cli, '// fake installed CLI')
    const db = { prepare: () => ({ all: () => [{ root: join(dir, 'project') }] }) }
    const options = {
      db, cwd: join(dir, 'project'), home: dir, installRoot: install, port: 9,
      fetcher: async () => new Response('', { status: 503 }),
    }
    const initial = await doctorAgents(options)
    const claude = initial.find(row => row.client === 'Claude Code')!
    assert.equal(claude.installed, 'missing')
    assert.equal(claude.mcp, 'missing')
    assert.equal(claude.workspace, 'ok')
    assert.equal(claude.agentBlock, 'missing')
    assert.match(claude.fix, /install.*claude code.*plugbrain setup claude/i)

    writeFileSync(config, JSON.stringify({ mcpServers: { plugbrain: { command: process.execPath, args: [cli, 'mcp'] } } }))
    const valid = await doctorAgents({ ...options, fetcher: async () => new Response('{}', { status: 200 }) })
    const good = valid.find(row => row.client === 'Claude Code')!
    assert.equal(good.installed, 'ok')
    assert.equal(good.mcp, 'ok')
    assert.equal(good.daemon, 'ok')
    assert.equal(readFileSync(config, 'utf8').includes('plugbrain'), true)

    writeFileSync(config, '{broken')
    const wrong = await doctorAgents(options)
    assert.equal(wrong.find(row => row.client === 'Claude Code')!.mcp, 'wrong')
    assert.equal(readFileSync(config, 'utf8'), '{broken')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('embedded agent protocol stays synchronized with the documentation block', () => {
  const docs = readFileSync(join(import.meta.dirname, '..', 'docs', 'agent-protocol.md'), 'utf8')
  const normalizedDocs = docs.replace(/\r\n/g, '\n')
  assert.ok(normalizedDocs.includes(AGENT_PROTOCOL_BLOCK.replace(/\r\n/g, '\n').trim()),
    'docs/agent-protocol.md must contain the same block as the embedded CLI copy')
})

test('malformed agent markers produce a concise CLI error and exit code 2', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-agent-invalid-markers-'))
  try {
    writeFileSync(join(dir, 'AGENTS.md'), '<!-- plugbrain:agent-protocol:start -->\nincomplete')
    const result = spawnSync(process.execPath, ['--experimental-strip-types', CLI, 'agents-file'], {
      cwd: dir, encoding: 'utf8', env: { ...process.env },
    })
    assert.equal(result.status, 2, result.stderr)
    assert.match(result.stderr, /invalid or duplicate PlugBrain markers; repair the markers and retry/)
    assert.doesNotMatch(result.stderr, /\n\s+at /, 'expected a one-line refusal without a stack trace')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})
