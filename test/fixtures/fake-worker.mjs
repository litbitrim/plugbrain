#!/usr/bin/env node
/**
 * A stand-in for a CLI worker in the runner tests.
 *
 * `swarm run` must start a real process, so the tests need a real process to
 * start — but starting Codex would spend the owner's quota and needs a login.
 * This script IS the worker: it writes the same JSONL shape `codex exec --json`
 * writes to stdout, and it talks to the same brain store through the same CLI,
 * so the whole loop (process, log, turn end, board) is exercised for real.
 *
 * Modes:
 *   ok    - check in, claim, write the last message, end the turn, exit 0
 *   die   - write two events and exit 3 without ever ending the turn
 *   hang  - write one event and stay alive until the Brain stops it
 *
 * Everything is passed in, nothing is hard-coded: the argv template that
 * `swarm runner set --args` stores is what points this script at the log, the
 * prompt file and the CLI.
 */
import { spawn, spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const argv = process.argv.slice(2)
const value = (name) => {
  const at = argv.indexOf(name)
  return at === -1 ? null : argv[at + 1] ?? null
}

const mode = value('--mode') ?? 'ok'
const agent = value('--agent')
const workspace = value('--workspace')
const cli = value('--cli')
const promptFile = value('--prompt-file')
const lastDoc = value('--last')

const emit = (event) => { process.stdout.write(`${JSON.stringify(event)}\n`) }

const brain = (...args) => {
  const result = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--no-warnings', cli, ...args],
    { encoding: 'utf8', timeout: 60_000 },
  )
  return { status: result.status, out: result.stdout ?? '', err: result.stderr ?? '' }
}

const firstLine = (() => {
  if (promptFile === null) return 'no prompt file was passed'
  try { return readFileSync(promptFile, 'utf8').split('\n')[0] } catch { return 'prompt file was unreadable' }
})()

if (mode === 'ok') {
  emit({ type: 'item.completed', item: { type: 'agent_message', text: `prompt: ${firstLine}` } })
  const start = brain('swarm', 'turn', agent, 'start', '--claim', '--workspace', workspace)
  emit({
    type: 'item.completed',
    item: { type: 'command_execution', command: `plugbrain swarm turn ${agent} start --claim`, exit_code: start.status },
  })
  if (lastDoc !== null) writeFileSync(lastDoc, 'fake worker finished its turn\n')
  const end = brain('swarm', 'turn', agent, 'end', '--state', 'needs-task', '--summary', 'fake worker done', '--workspace', workspace)
  emit({
    type: 'item.completed',
    item: { type: 'command_execution', command: `plugbrain swarm turn ${agent} end --state needs-task`, exit_code: end.status },
  })
  emit({ type: 'turn.completed', usage: { input_tokens: 1, output_tokens: 2 } })
  process.exit(0)
}

if (mode === 'die') {
  const start = brain('swarm', 'turn', agent, 'start', '--claim', '--workspace', workspace)
  emit({
    type: 'item.completed',
    item: { type: 'command_execution', command: `plugbrain swarm turn ${agent} start --claim`, exit_code: start.status },
  })
  emit({ type: 'item.completed', item: { type: 'agent_message', text: 'about to die without a turn end' } })
  emit({ type: 'item.completed', item: { type: 'command_execution', command: 'node --run build', exit_code: 1 } })
  process.exit(3)
}

if (mode === 'tree') {
  const child = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' })
  if (lastDoc !== null) writeFileSync(lastDoc, String(child.pid ?? ''))
  emit({ type: 'item.completed', item: { type: 'agent_message', text: 'parent and child are running' } })
  setInterval(() => {}, 1000)
}

emit({ type: 'item.completed', item: { type: 'agent_message', text: 'hanging on purpose' } })
setInterval(() => {}, 1000)
