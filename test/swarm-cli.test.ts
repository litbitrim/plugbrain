/**
 * `plugbrain swarm` end to end: every call is a real CLI process against a
 * throwaway store, the way a Freebuff, AGY or Codex worker would run it.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { workspaceIdFor } from '../src/planet.ts'

const CLI = fileURLToPath(new URL('../src/cli.ts', import.meta.url))

function brain() {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-swarm-cli-'))
  const root = join(home, 'root')
  mkdirSync(root)
  const run = (...args: string[]) => {
    const result = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', CLI, ...args], {
      env: { ...process.env, PLUGBRAIN_HOME: home, PLUGBRAIN_NO_DAEMON: '1' },
      encoding: 'utf8',
      timeout: 60_000,
    })
    return { code: result.status, out: result.stdout, err: result.stderr }
  }
  assert.equal(run('register', root, 'swarm-cli').code, 0)
  return { home, ws: workspaceIdFor(root), run, cleanup: () => rmSync(home, { recursive: true, force: true }) }
}

test('a worker registers, gets pinged at its turn end, claims work and shows on the board', () => {
  const b = brain()
  try {
    const reg = b.run('swarm', 'register', 'nv01', '--surface', 'freebuff', '--account', 'nvidia:key-01',
      '--key', 'nvidia-01', '--model', 'z-ai/glm-5.3-flash', '--workspace', b.ws)
    assert.equal(reg.code, 0, reg.err)
    assert.match(reg.out, /registriert: nv01 \(freebuff, nvidia:key-01, Schlüssel nvidia-01\)/)

    const clash = b.run('swarm', 'register', 'nv01-copy', '--surface', 'native', '--account', 'nvidia:key-01',
      '--key', 'nvidia-01', '--workspace', b.ws)
    assert.equal(clash.code, 3)
    assert.match(clash.err, /already carried by nv01/)

    assert.equal(b.run('swarm', 'enqueue', 'Lint', 'ratchet', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'send', 'nv01', '--subject', 'Hallo', '--body', 'Bitte starten', '--workspace', b.ws).code, 0)

    const end = b.run('swarm', 'turn', 'nv01', 'end', '--state', 'needs-task', '--summary', 'R1 fertig', '--workspace', b.ws, '--json')
    assert.equal(end.code, 0, end.err)
    const ping = JSON.parse(end.out) as { state: string; inbox: Array<{ id: string; subject: string }>; nextTask: { title: string } | null }
    assert.equal(ping.state, 'needs-task')
    assert.deepEqual(ping.inbox.map(message => message.subject), ['Hallo'])
    assert.equal(ping.nextTask?.title, 'Lint ratchet')

    const start = b.run('swarm', 'turn', 'nv01', 'start', '--claim', '--workspace', b.ws)
    assert.equal(start.code, 0, start.err)
    assert.match(start.out, /GENOMMEN task-[0-9a-f-]+: Lint ratchet/)
    assert.match(start.out, /NACHRICHT msg-/)

    assert.equal(b.run('swarm', 'ack', 'nv01', ping.inbox[0]!.id, '--workspace', b.ws).code, 0)
    const board = b.run('swarm', 'board', '--workspace', b.ws, '--json')
    const parsed = JSON.parse(board.out) as { agents: Array<{ id: string; unread: number; task: { title: string } | null; turnState: string }> }
    const row = parsed.agents.find(agent => agent.id === 'nv01')
    assert.equal(row?.unread, 0)
    assert.equal(row?.task?.title, 'Lint ratchet')
    assert.equal(row?.turnState, 'working')
  } finally { b.cleanup() }
})

test('quotas, resources and admission are available to every worker', () => {
  const b = brain()
  try {
    const quota = b.run('swarm', 'quota', 'owner:chatgpt', '2', 'percent', '--resets', '2026-09-30T02:02:00+02:00', '--workspace', b.ws)
    assert.equal(quota.code, 0, quota.err)
    assert.match(quota.out, /owner:chatgpt: 2 percent \(erschöpft\)/)
    const resources = b.run('swarm', 'resources', '--workspace', b.ws, '--json')
    const parsed = JSON.parse(resources.out) as { quotas: Array<{ account: string }>; admission: Array<{ kind: string }> }
    assert.deepEqual(parsed.quotas.map(row => row.account), ['owner:chatgpt'])
    assert.deepEqual(parsed.admission.map(row => row.kind), ['edit', 'test', 'index', 'build', 'install', 'worktree'])
    assert.equal(b.run('swarm', 'admit', 'edit', '--workspace', b.ws).code, 0)
    const bad = b.run('swarm', 'quota', 'nvidia:key-02', '5', 'rpm', '--note', 'nvapi-AbCdEf0123456789AbCdEf0123456789xyz', '--workspace', b.ws)
    assert.equal(bad.code, 3)
    assert.match(bad.err, /looks like a credential/)
  } finally { b.cleanup() }
})
