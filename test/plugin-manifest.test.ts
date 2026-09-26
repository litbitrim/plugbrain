/**
 * Claude Code plugin manifests.
 *
 * The repo cannot rely on `claude plugin validate` being installed, so these
 * tests pin the same contract by hand: the plugin manifest, the marketplace
 * entry, the MCP server registration, the hooks wiring and the skills must
 * stay parseable, consistent and pointing at files that exist.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const readJson = (rel: string): Record<string, unknown> =>
  JSON.parse(readFileSync(resolve(ROOT, rel), 'utf8'))

test('plugin.json is a complete, consistent manifest', () => {
  const manifest = readJson('.claude-plugin/plugin.json')
  assert.equal(manifest.name, 'plugbrain')
  assert.match(String(manifest.version), /^\d+\.\d+\.\d+$/)
  assert.ok(String(manifest.description).length > 10, 'description must say what the plugin does')
  assert.equal(manifest.license, 'MIT')
  assert.ok(manifest.author, 'author is required')

  const pkg = readJson('package.json')
  assert.equal(manifest.version, pkg.version, 'plugin version must match package.json')
})

test('marketplace.json lists this repo as the plugin source', () => {
  const market = readJson('.claude-plugin/marketplace.json')
  assert.equal(market.name, 'plugbrain')
  const plugins = market.plugins as Array<Record<string, unknown>>
  assert.ok(Array.isArray(plugins) && plugins.length >= 1)
  const entry = plugins.find(plugin => plugin.name === 'plugbrain')
  assert.ok(entry, 'the marketplace must list the plugbrain plugin')
  assert.equal(entry.source, './', 'the source is this repository itself')
  assert.equal(entry.version, (readJson('.claude-plugin/plugin.json')).version)
})

test('.mcp.json registers the plugbrain stdio server', () => {
  const mcp = readJson('.mcp.json')
  const servers = mcp.mcpServers as Record<string, Record<string, unknown>>
  const server = servers.plugbrain
  assert.ok(server, 'the plugbrain MCP server must be registered')
  assert.equal(server.command, 'plugbrain')
  assert.deepEqual(server.args, ['mcp'])
})

test('hooks/hooks.json wires SessionStart to a fast, existing hook script', () => {
  const hooks = readJson('hooks/hooks.json')
  const sessionStart = (hooks.hooks as Record<string, Array<{ hooks: Array<Record<string, unknown>> }>>).SessionStart
  assert.ok(Array.isArray(sessionStart) && sessionStart.length >= 1)
  const entry = sessionStart[0].hooks[0]
  assert.equal(entry.type, 'command')
  const command = String(entry.command)
  assert.match(command, /hook-session-start\.mjs/)
  const timeout = Number(entry.timeout ?? 60)
  assert.ok(timeout <= 2, 'the hook must never block a session for more than 2 s')
  const script = resolve(ROOT, command.split(' ').at(-1) as string)
  assert.ok(existsSync(script), 'the hook script must exist in the repo')
})

test('session-start hook is cheap, local and non-blocking by construction', () => {
  const script = readFileSync(resolve(ROOT, 'scripts/hook-session-start.mjs'), 'utf8')
  assert.match(script, /\/api\/health/, 'the hook probes the health route')
  assert.match(script, /detached: true/, 'a needed brain is started detached, never awaited')
  assert.match(script, /process\.exit\(0\)/, 'the hook always exits successfully')
})

test('every skill declares name and description and stays brief', () => {
  for (const skill of ['skills/brain/SKILL.md', 'skills/open/SKILL.md']) {
    const content = readFileSync(resolve(ROOT, skill), 'utf8')
    // Windows checkouts with core.autocrlf turn LF into CRLF.
    assert.match(content, /^---\r?\n/, `${skill} must start with YAML frontmatter`)
    assert.match(content, /^name: /m, `${skill} must declare a name`)
    assert.match(content, /^description: /m, `${skill} must declare a description`)
    const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    assert.ok(body.length > 0, `${skill} must have instructions`)
    assert.ok(body.length < 8000, `${skill} should stay compact`)
  }
})

test('the brain skill teaches the ask-the-brain-first order', () => {
  const skill = readFileSync(resolve(ROOT, 'skills/brain/SKILL.md'), 'utf8')
  for (const tool of ['context_pack', 'awareness', 'impact', 'notes_query', 'notes_read']) {
    assert.match(skill, new RegExp(`\`?${tool}\``), `the skill must mention ${tool}`)
  }
  assert.match(skill, /ask the brain first/i)
})
