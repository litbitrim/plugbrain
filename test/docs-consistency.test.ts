import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { MCP_TOOLS } from '../src/mcp/server.ts'

test('docs-consistency: all registered MCP tools are documented in docs/mcp-tools.md', () => {
  const root = join(import.meta.dirname, '..')
  const mcpDoc = readFileSync(join(root, 'docs', 'mcp-tools.md'), 'utf8')

  // Extract all tool headings of the form `### `tool_name``
  const docToolMatches = Array.from(mcpDoc.matchAll(/^###\s+`([a-z0-9_]+)`/gm), m => m[1]!)
  const docToolSet = new Set(docToolMatches)

  const serverToolNames = MCP_TOOLS.map(t => t.name)
  const serverToolSet = new Set<string>(serverToolNames)

  assert.equal(
    docToolMatches.length,
    docToolSet.size,
    `Duplicate tool headings in docs/mcp-tools.md: ${docToolMatches.filter((item, index) => docToolMatches.indexOf(item) !== index).join(', ')}`
  )

  // Verify that every tool registered in MCP_TOOLS is in the documentation
  const missingFromDocs: string[] = []
  for (const name of serverToolNames) {
    if (!docToolSet.has(name)) {
      missingFromDocs.push(name)
    }
  }
  assert.deepEqual(
    missingFromDocs,
    [],
    `Tools in src/mcp/server.ts missing from docs/mcp-tools.md: ${missingFromDocs.join(', ')}`
  )

  // Verify that every tool in docs/mcp-tools.md is actually in MCP_TOOLS
  const extraInDocs: string[] = []
  for (const name of docToolMatches) {
    if (!serverToolSet.has(name)) {
      extraInDocs.push(name)
    }
  }
  assert.deepEqual(
    extraInDocs,
    [],
    `Tools in docs/mcp-tools.md not registered in src/mcp/server.ts: ${extraInDocs.join(', ')}`
  )

  assert.equal(docToolSet.size, MCP_TOOLS.length, 'Exact tool count match')
})

test('docs-consistency: all CLI help commands are documented in docs/cli.md', () => {
  const root = join(import.meta.dirname, '..')
  const cliSrc = readFileSync(join(root, 'src', 'cli.ts'), 'utf8')
  const cliDoc = readFileSync(join(root, 'docs', 'cli.md'), 'utf8')

  // Extract commands from the usage help text in src/cli.ts
  // Matching: usage: plugbrain <init|setup|register|...
  const usageMatch = cliSrc.match(/usage:\s*plugbrain\s*<([a-z0-9_\-|]+)>/i)
  assert.ok(usageMatch, 'Could not find usage string in src/cli.ts')

  const baseCommands = usageMatch[1]!.split('|').map(c => c.trim())

  // Also extract sub-lines from the usage block in cli.ts (e.g. plugbrain hygiene, plugbrain machine, ...)
  const linesMatch = Array.from(cliSrc.matchAll(/plugbrain\s+([a-z0-9_-]+)/g), m => m[1]!)
  const expectedCommands = new Set([
    ...baseCommands,
    'hygiene', 'machine', 'repos', 'plan', 'compact', 'ask',
  ])

  // Extract documented command headings `### `command``
  const docCmdMatches = Array.from(cliDoc.matchAll(/^###\s+`([a-z0-9_\-]+)`/gm), m => m[1]!)
  const docCmdSet = new Set(docCmdMatches)

  const missingCommands: string[] = []
  for (const cmd of expectedCommands) {
    if (!docCmdSet.has(cmd)) {
      missingCommands.push(cmd)
    }
  }

  assert.deepEqual(
    missingCommands,
    [],
    `CLI commands from help missing from docs/cli.md: ${missingCommands.join(', ')}`
  )
})
