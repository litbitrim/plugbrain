/**
 * Swarm operations: one row per real worker, pinged at its turn boundaries.
 *
 * The owner runs a mixed fleet — Freebuff tabs (Codex subscription, NVIDIA and
 * Gemini keys, built-in GLM), AGY, the Codex app and Claude Code. None of them
 * can be pushed to, so the Brain is the place every worker checks in at the
 * start and end of a turn. These tests pin the contract that makes that work:
 *
 *  - every worker is exactly one agent, whatever surface hosts it;
 *  - a BYOK key carries one active worker (a subscription may carry many);
 *  - a turn boundary returns what is waiting: messages, the next task, and
 *    whether the host has room for the work;
 *  - the board says who is writing where and who needs the integrator.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { registerSwarmAgent, sendMessage, acquireLease } from '../src/coord/index.ts'
import { enqueueTask } from '../src/queue.ts'
import {
  agentsBoard, approveCommit, recordTurn, registerWorkerProfile, retireWorker,
} from '../src/coord/swarm-ops.ts'
import { admitWork, reportQuota, listQuotas, type HostSnapshot } from '../src/coord/resources.ts'

const WS = 'ws-swarm-ops'
const GB = 1024 ** 3

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-swarm-ops-'))
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'swarm-demo', join(dir, 'root'), new Date().toISOString())
  const worker = (id: string, extra: Record<string, unknown> = {}) => {
    registerSwarmAgent(db, { agentId: id, name: id, workspaceId: WS })
    return registerWorkerProfile(db, {
      agentId: id, surface: 'freebuff', account: 'owner:chatgpt', ...extra,
    })
  }
  return { dir, db, worker, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

function gitRepo(dir: string): string {
  const repo = join(dir, 'repo')
  mkdirSync(repo, { recursive: true })
  execFileSync('git', ['init', '-b', 'feat/demo', repo])
  execFileSync('git', ['-C', repo, 'config', 'user.email', 'swarm@plug.local'])
  execFileSync('git', ['-C', repo, 'config', 'user.name', 'Swarm Test'])
  writeFileSync(join(repo, 'a.txt'), 'one\n')
  execFileSync('git', ['-C', repo, 'add', 'a.txt'])
  execFileSync('git', ['-C', repo, 'commit', '-m', 'base'])
  return repo
}

const roomy: HostSnapshot = {
  measuredAt: new Date().toISOString(),
  drives: [{ root: 'C:\\', freeBytes: 120 * GB, totalBytes: 900 * GB }],
  memory: { freeBytes: 12 * GB, totalBytes: 32 * GB },
  cpuBusyFraction: 0.2,
}

test('every worker is one agent: two Codex tabs may share the subscription account', () => {
  const f = fixture()
  try {
    const a = f.worker('o3-review', { surface: 'freebuff', account: 'owner:chatgpt', model: 'gpt-5.6-terra' })
    const b = f.worker('o4-mission', { surface: 'freebuff', account: 'owner:chatgpt', model: 'gpt-5.6-terra' })
    assert.equal(a.account, 'owner:chatgpt')
    assert.equal(b.account, 'owner:chatgpt')
    const board = agentsBoard(f.db, WS, { host: roomy })
    assert.deepEqual(board.agents.map(row => row.id).sort(), ['o3-review', 'o4-mission'])
  } finally { f.cleanup() }
})

test('a BYOK key carries exactly one active worker; a takeover retires the old holder', () => {
  const f = fixture()
  try {
    f.worker('nv01', { account: 'nvidia:key-01', resourceKey: 'nvidia-01', surface: 'freebuff' })
    registerSwarmAgent(f.db, { agentId: 'nv01-second', workspaceId: WS })
    assert.throws(
      () => registerWorkerProfile(f.db, { agentId: 'nv01-second', surface: 'native', account: 'nvidia:key-01', resourceKey: 'nvidia-01' }),
      /nvidia-01 is already carried by nv01/,
    )
    const taken = registerWorkerProfile(f.db, {
      agentId: 'nv01-second', surface: 'native', account: 'nvidia:key-01', resourceKey: 'nvidia-01', takeover: true,
    })
    assert.equal(taken.resourceKey, 'nvidia-01')
    const board = agentsBoard(f.db, WS, { host: roomy })
    const old = board.agents.find(row => row.id === 'nv01')
    assert.equal(old?.retired, true)
    assert.equal(old?.resourceKey, null)
  } finally { f.cleanup() }
})

test('account labels are names, never credentials', () => {
  const f = fixture()
  try {
    registerSwarmAgent(f.db, { agentId: 'leaky', workspaceId: WS })
    assert.throws(
      () => registerWorkerProfile(f.db, { agentId: 'leaky', surface: 'freebuff', account: 'nvapi-AbCdEf0123456789AbCdEf0123456789xyz' }),
      /looks like a credential/,
    )
    assert.throws(
      () => registerWorkerProfile(f.db, { agentId: 'leaky', surface: 'teleport' as never, account: 'owner:x' }),
      /unknown surface/,
    )
  } finally { f.cleanup() }
})

test('a turn boundary pings the worker with waiting messages and the next task', () => {
  const f = fixture()
  try {
    f.worker('nv02', { account: 'nvidia:key-02', resourceKey: 'nvidia-02' })
    registerSwarmAgent(f.db, { agentId: 'integrator', workspaceId: WS })
    sendMessage(f.db, { workspaceId: WS, fromAgent: 'integrator', toAgent: 'nv02', subject: 'Review', body: 'Bitte K5 prüfen' })
    enqueueTask(f.db, WS, { title: 'Lint ratchet Harness' })

    const ping = recordTurn(f.db, { workspaceId: WS, agentId: 'nv02', phase: 'end', state: 'needs-task', summary: 'R1 fertig' }, { host: roomy })
    assert.equal(ping.state, 'needs-task')
    assert.equal(ping.inbox.length, 1)
    assert.equal(ping.inbox[0]?.subject, 'Review')
    assert.equal(ping.nextTask?.title, 'Lint ratchet Harness')
    assert.equal(ping.claimedTask, null, 'a ping only offers the task; claiming is explicit')

    const claimed = recordTurn(f.db, { workspaceId: WS, agentId: 'nv02', phase: 'start', claimNext: true }, { host: roomy })
    assert.equal(claimed.state, 'working')
    assert.equal(claimed.claimedTask?.title, 'Lint ratchet Harness')
    assert.equal(claimed.inbox.length, 1, 'an unread message keeps pinging until it is acknowledged')
  } finally { f.cleanup() }
})

test('awaiting-commit waits for the integrator, and approval reaches the worker as a message', () => {
  const f = fixture()
  try {
    f.worker('o5-coord')
    registerSwarmAgent(f.db, { agentId: 'integrator', workspaceId: WS })
    assert.throws(() => approveCommit(f.db, { workspaceId: WS, agentId: 'o5-coord', by: 'integrator' }), /not awaiting a commit/)

    recordTurn(f.db, { workspaceId: WS, agentId: 'o5-coord', phase: 'end', state: 'awaiting-commit', summary: 'M26 green' }, { host: roomy })
    const before = agentsBoard(f.db, WS, { host: roomy })
    assert.deepEqual(before.agents.find(row => row.id === 'o5-coord')?.attention, ['awaiting-commit'])

    approveCommit(f.db, { workspaceId: WS, agentId: 'o5-coord', by: 'integrator', note: 'merge-ready' })
    const ping = recordTurn(f.db, { workspaceId: WS, agentId: 'o5-coord', phase: 'start' }, { host: roomy })
    assert.equal(ping.inbox.some(message => message.subject === 'Commit freigegeben'), true)
    const after = agentsBoard(f.db, WS, { host: roomy })
    assert.equal(after.agents.find(row => row.id === 'o5-coord')?.turnState, 'working')
  } finally { f.cleanup() }
})

test('the board says who writes where: leases, worktree branch and uncommitted files', () => {
  const f = fixture()
  try {
    const repo = gitRepo(f.dir)
    f.worker('l1-indexer', { worktrees: [repo] })
    writeFileSync(join(repo, 'a.txt'), 'two\n')
    writeFileSync(join(repo, 'b.txt'), 'new\n')
    acquireLease(f.db, WS, { agentId: 'l1-indexer', taskId: 'task-m16', paths: ['src/impact.ts'], symbols: [], mode: 'write' })

    const board = agentsBoard(f.db, WS, { host: roomy, gitStatus: true })
    const row = board.agents.find(agent => agent.id === 'l1-indexer')
    assert.ok(row)
    assert.deepEqual(row.leases.map(lease => lease.paths).flat(), ['src/impact.ts'])
    assert.equal(row.worktrees[0]?.branch, 'feat/demo')
    assert.equal(row.worktrees[0]?.dirtyFiles, 2)
    assert.equal(board.overlaps.length, 0)
  } finally { f.cleanup() }
})

test('two workers in one worktree are reported as an overlap', () => {
  const f = fixture()
  try {
    const repo = gitRepo(f.dir)
    f.worker('o2-lanes', { worktrees: [repo] })
    f.worker('o4-mission', { worktrees: [repo.toUpperCase()] })
    const board = agentsBoard(f.db, WS, { host: roomy })
    assert.equal(board.overlaps.length, 1)
    assert.deepEqual([...board.overlaps[0]!.agents].sort(), ['o2-lanes', 'o4-mission'])
  } finally { f.cleanup() }
})

test('admission follows the hardware: no builds under 20 GB free, no tests under 5 GB', () => {
  const tight: HostSnapshot = { ...roomy, drives: [{ root: 'C:\\', freeBytes: 9 * GB, totalBytes: 900 * GB }] }
  const full: HostSnapshot = { ...roomy, drives: [{ root: 'C:\\', freeBytes: 3 * GB, totalBytes: 900 * GB }] }
  const lowRam: HostSnapshot = { ...roomy, memory: { freeBytes: 1 * GB, totalBytes: 32 * GB } }

  assert.equal(admitWork('build', roomy).allowed, true)
  const build = admitWork('build', tight)
  assert.equal(build.allowed, false)
  assert.match(build.reasons.join(' '), /20 GB/)
  assert.equal(admitWork('test', tight).allowed, true)
  assert.equal(admitWork('test', full).allowed, false)
  assert.equal(admitWork('build', lowRam).allowed, false)
  assert.equal(admitWork('edit', full).allowed, true, 'writing code never needs disk headroom')
})

test('quota reports are stored per account and refuse credential-looking notes', () => {
  const f = fixture()
  try {
    reportQuota(f.db, { account: 'owner:chatgpt', remaining: 2, unit: 'percent', resetsAt: '2026-09-30T02:02:00+02:00', reportedBy: 'integrator' })
    reportQuota(f.db, { account: 'freebuff:freebucks', remaining: 25, unit: 'credits', reportedBy: 'integrator' })
    const quotas = listQuotas(f.db)
    assert.deepEqual(quotas.map(row => row.account).sort(), ['freebuff:freebucks', 'owner:chatgpt'])
    assert.equal(quotas.find(row => row.account === 'owner:chatgpt')?.exhausted, true)
    assert.throws(
      () => reportQuota(f.db, { account: 'nvidia:key-03', remaining: 10, unit: 'rpm', note: 'sk-live-0123456789abcdef0123456789abcdef', reportedBy: 'x' }),
      /looks like a credential/,
    )
  } finally { f.cleanup() }
})

test('a worker on an exhausted account is flagged on the board', () => {
  const f = fixture()
  try {
    f.worker('o6-vision', { account: 'owner:chatgpt' })
    reportQuota(f.db, { account: 'owner:chatgpt', remaining: 0, unit: 'percent', reportedBy: 'integrator' })
    const board = agentsBoard(f.db, WS, { host: roomy })
    assert.deepEqual(board.agents.find(row => row.id === 'o6-vision')?.attention, ['quota-exhausted'])
  } finally { f.cleanup() }
})

test('the HTTP API carries the same contract: profile, turn, board, approval and resources', async () => {
  const { serve } = await import('../src/server/api.ts')
  const f = fixture()
  const authKey = 'swarm-ops-test-key'
  const handle = await serve({ db: f.db, uiRoot: null, authKey }, 0)
  const base = `http://127.0.0.1:${handle.port}`
  const post = async (path: string, body: unknown) => {
    const response = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authKey}` },
      body: JSON.stringify(body),
    })
    return { status: response.status, body: await response.json() as Record<string, unknown> }
  }
  try {
    assert.equal((await post('/api/agent/register', { agentId: 'agy-sonnet', workspaceId: WS })).status, 200)
    assert.equal((await post('/api/agent/register', { agentId: 'integrator', workspaceId: WS })).status, 200)
    const profile = await post('/api/agent/profile', { agentId: 'agy-sonnet', surface: 'agy', account: 'owner:google', model: 'claude-sonnet-4.6' })
    assert.equal(profile.status, 200)
    const leaky = await post('/api/agent/profile', { agentId: 'agy-sonnet', surface: 'agy', account: 'sk-live-0123456789abcdefABCDEF0123456789' })
    assert.equal(leaky.status, 403)

    const turn = await post('/api/agent/turn', { agentId: 'agy-sonnet', workspaceId: WS, phase: 'end', state: 'awaiting-commit', summary: 'EP-M17 fertig' })
    assert.equal(turn.status, 200)
    assert.equal((turn.body.ping as { state: string }).state, 'awaiting-commit')

    const boardResponse = await fetch(`${base}/api/agents/board?workspace=${WS}`)
    const board = (await boardResponse.json() as { board: { agents: Array<{ id: string; attention: string[]; surface: string }> } }).board
    const row = board.agents.find(agent => agent.id === 'agy-sonnet')
    assert.equal(row?.surface, 'agy')
    assert.deepEqual(row?.attention, ['awaiting-commit'])

    assert.equal((await post('/api/agent/approve-commit', { agentId: 'agy-sonnet', by: 'integrator', workspaceId: WS })).status, 200)
    const resources = await (await fetch(`${base}/api/resources`)).json() as { admission: unknown[] }
    assert.equal(resources.admission.length, 6)
  } finally {
    await handle.close()
    f.cleanup()
  }
})

test('a retired worker keeps its history but frees its key and leaves the fleet count', () => {
  const f = fixture()
  try {
    f.worker('legacy-coordinator', { account: 'owner:anthropic', resourceKey: 'claude-legacy' })
    assert.throws(() => retireWorker(f.db, { agentId: 'legacy-coordinator', reason: ' ' }), /needs a reason/)
    const retired = retireWorker(f.db, { agentId: 'legacy-coordinator', reason: 'Altagent aus Mission 21.09.' })
    assert.equal(retired.retired, true)
    assert.equal(retired.resourceKey, null)
    const board = agentsBoard(f.db, WS, { host: roomy })
    const row = board.agents.find(agent => agent.id === 'legacy-coordinator')
    assert.equal(row?.retired, true)
    assert.deepEqual(row?.attention, [])
    f.worker('new-coordinator', { account: 'owner:anthropic', resourceKey: 'claude-legacy' })
  } finally { f.cleanup() }
})
