import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { AGENT_PROTOCOL_BLOCK, doctorAgents, manageAgentFile, renderAgentFile, selectAgentFiles } from '../src/setup/agent-protocol.ts'

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
    assert.equal(manageAgentFile(agents, { undo: true }).action, 'undone')
    assert.equal(readFileSync(agents, 'utf8'), 'custom')
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
