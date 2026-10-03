/**
 * `swarm run` end to end: the Brain starts a CLI worker itself and watches it.
 *
 * The worker is `test/fixtures/fake-worker.mjs`, not Codex — starting Codex
 * would spend the owner's quota and needs a login. Everything else is real: a
 * detached OS process, a JSONL log on disk, a store in a temp home, and the
 * board reading the run back. The fake even checks in and ends its turn through
 * the same CLI a Codex tab would call, so the turn semantics under test are the
 * ones the fleet actually has.
 */
// First, before anything that could open a store: this test process must never
// read the owner's live brain home.
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { DatabaseSync } from 'node:sqlite'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { workspaceIdFor } from '../src/planet.ts'
import { buildRunnerArgv, discoverProtocolDocs, isOwnedProcess, renderRunnerPrompt, summarizeLogEvent, type RunnerProfile } from '../src/coord/runner.ts'
import { assertActiveSupervisorAttempt, classifySupervisorFailure } from '../src/coord/supervisor.ts'

const CLI = fileURLToPath(new URL('../src/cli.ts', import.meta.url))
const FAKE = fileURLToPath(new URL('./fixtures/fake-worker.mjs', import.meta.url))
const nativeRunnerOnly = process.platform === 'win32' ? {} : { skip: 'native runner requires Windows process-tree identity' }

interface Brain {
  home: string
  root: string
  ws: string
  run: (...args: string[]) => { code: number | null; out: string; err: string }
  cleanup: () => void
}

function brain(): Brain {
  const home = mkdtempSync(join(tmpdir(), 'plugbrain-swarm-run-'))
  const root = join(home, 'root')
  // The workspace configuration the prompt is derived from: a coordination
  // folder with the protocol, a lane's rules and the Brain's own wrapper.
  mkdirSync(join(root, 'koordination', 'bin'), { recursive: true })
  writeFileSync(join(root, 'koordination', 'BRAIN-PROTOKOLL.md'), '# protocol\n')
  writeFileSync(join(root, 'koordination', 'bin', 'plugbrain'), '#!/bin/sh\n')
  // Two lanes on purpose: the newer one sorts EARLIER by name, so a comparison
  // of full paths would pick the wrong rules.
  mkdirSync(join(root, 'koordination', 'closeout', 'lane-new-20260101', 'briefs'), { recursive: true })
  writeFileSync(join(root, 'koordination', 'closeout', 'lane-new-20260101', 'briefs', '_REGELN.md'), '# rules of the new lane\n')
  mkdirSync(join(root, 'koordination', 'closeout', 'zulu-old-20251231', 'briefs'), { recursive: true })
  writeFileSync(join(root, 'koordination', 'closeout', 'zulu-old-20251231', 'briefs', '_REGELN.md'), '# rules of the old lane\n')
  const run = (...args: string[]) => {
    const result = spawnSync(process.execPath, ['--experimental-strip-types', '--no-warnings', CLI, ...args], {
      env: { ...process.env, PLUGBRAIN_HOME: home, PLUGBRAIN_NO_DAEMON: '1' },
      encoding: 'utf8',
      timeout: 120_000,
    })
    return { code: result.status, out: result.stdout ?? '', err: result.stderr ?? '' }
  }
  assert.equal(run('register', root, 'swarm-runner').code, 0)
  return { home, root, ws: workspaceIdFor(root), run, cleanup: () => rmSync(home, { recursive: true, force: true }) }
}

/** The `--args` template that points the fake worker at the real store. */
const fakeArgs = (b: Brain, mode: string): string =>
  `${FAKE} --mode ${mode} --agent fake-01 --workspace ${b.ws} --cli ${CLI} ` +
  `--prompt-file {promptFile} --last {last}`

interface RunJson {
  pid: number | null
  runId: string
  alive: boolean
  logPath: string
  lastDocPath: string | null
  promptPath: string | null
  commandText: string
  endedAt: string | null
  endedReason: string | null
  stoppedAt: string | null
  lastEventKind: string | null
  lastEventText: string | null
}

interface StatusJson { run: RunJson | null; turnState: string | null; tail: string[] }

const delay = (ms: number) => new Promise<void>(resolve => { setTimeout(resolve, ms) })

/** Poll `--status` (which settles dead runs) until the run has an end. */
async function settle(b: Brain, agent: string, ms = 90_000): Promise<StatusJson> {
  const deadline = Date.now() + ms
  for (;;) {
    const status = b.run('swarm', 'run', agent, '--status', '--workspace', b.ws, '--json')
    assert.equal(status.code, 0, status.err)
    const parsed = JSON.parse(status.out) as StatusJson
    if (parsed.run !== null && parsed.run.endedAt !== null) return parsed
    if (Date.now() > deadline) assert.fail(`run never settled: ${status.out}`)
    await delay(200)
  }
}

interface BoardJson {
  agents: Array<{ id: string; turnState: string; turnSummary: string | null; unread: number; runner: { pid: number; alive: boolean; lastEventKind: string } | null }>
  settled: Array<{ agentId: string; reason: string; messageId: string | null; summary: string }>
}

/**
 * Poll the board itself until it has booked the worker.
 *
 * Deliberately not `--status`: the board is the path under test here, and it is
 * the call that has to notice a process that never came back.
 */
async function settleBoard(b: Brain, agent: string, ms = 90_000): Promise<BoardJson> {
  const deadline = Date.now() + ms
  for (;;) {
    const board = b.run('swarm', 'board', '--workspace', b.ws, '--json')
    assert.equal(board.code, 0, board.err)
    const parsed = JSON.parse(board.out) as BoardJson
    if (parsed.agents.find(row => row.id === agent)?.turnState === 'blocked') return parsed
    if (Date.now() > deadline) assert.fail(`the board never booked the dead run: ${board.out}`)
    await delay(200)
  }
}

test('a runner profile is stored and read back, and a bad sandbox is refused', () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'cx01', '--surface', 'other', '--account', 'owner:chatgpt', '--workspace', b.ws).code, 0)
    const set = b.run('swarm', 'runner', 'set', 'cx01', '--cmd', 'codex', '--model', 'gpt-6-luna',
      '--effort', 'high', '--sandbox', 'bypass', '--search', '--workspace', b.ws, '--json')
    assert.equal(set.code, 0, set.err)
    const profile = JSON.parse(set.out) as RunnerProfile
    assert.equal(profile.cmd, 'codex')
    assert.equal(profile.model, 'gpt-6-luna')
    assert.equal(profile.effort, 'high')
    assert.equal(profile.sandbox, 'bypass')
    assert.equal(profile.search, true)

    const show = b.run('swarm', 'runner', 'show', 'cx01', '--workspace', b.ws, '--json')
    assert.equal(show.code, 0, show.err)
    assert.deepEqual(JSON.parse(show.out), profile)

    const bad = b.run('swarm', 'runner', 'set', 'cx01', '--cmd', 'codex', '--sandbox', 'yolo', '--workspace', b.ws)
    assert.equal(bad.code, 3)
    assert.match(bad.err, /unknown sandbox: yolo/)

    const unknown = b.run('swarm', 'runner', 'show', 'nobody', '--workspace', b.ws)
    assert.equal(unknown.code, 3)
    assert.match(unknown.err, /no runner profile for nobody/)
  } finally { b.cleanup() }
})

test('runner profiles reject credential-like args, unknown commands, and cwd outside the workspace', () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'cx01', '--surface', 'other', '--account', 'owner:chatgpt', '--workspace', b.ws).code, 0)
    const credential = 'ghp_' + 'x'.repeat(36)
    const secret = b.run('swarm', 'runner', 'set', 'cx01', '--cmd', 'node', '--args', `--token ${credential}`, '--workspace', b.ws)
    assert.notEqual(secret.code, 0)
    assert.doesNotMatch(secret.err + secret.out, new RegExp(credential))

    const badCommand = b.run('swarm', 'runner', 'set', 'cx01', '--cmd', 'powershell.exe', '--workspace', b.ws)
    assert.notEqual(badCommand.code, 0)
    assert.match(badCommand.err, /not an allowed worker command/)
    const pathCommand = b.run('swarm', 'runner', 'set', 'cx01', '--cmd', 'C:\\Temp\\codex.exe', '--workspace', b.ws)
    assert.notEqual(pathCommand.code, 0)
    assert.match(pathCommand.err, /known executable name from PATH/)

    const outsidePath = join(b.home, 'outside')
    mkdirSync(outsidePath)
    const outside = b.run('swarm', 'runner', 'set', 'cx01', '--cmd', 'node', '--cwd', outsidePath, '--workspace', b.ws)
    assert.notEqual(outside.code, 0)
    assert.match(outside.err, /outside registered workspace/i)
  } finally { b.cleanup() }
})

test('swarm run starts the worker detached, keeps its log, and the board shows pid and last event', nativeRunnerOnly, async () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    const set = b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'ok'), '--workspace', b.ws)
    assert.equal(set.code, 0, set.err)

    const started = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws, '--json')
    assert.equal(started.code, 0, started.err)
    const run = JSON.parse(started.out) as RunJson
    assert.ok(Number.isInteger(run.pid) && (run.pid ?? 0) > 0, `expected a pid, got ${started.out}`)
    assert.match(run.logPath, /runs[\\/]workers[\\/]fake-01-\d{8}-\d{9}\.jsonl$/)
    assert.ok(run.commandText.includes(FAKE))

    const status = await settle(b, 'fake-01')
    assert.equal(status.run?.alive, false)
    // The worker ended its own turn, so the end of the process is not a failure.
    assert.equal(status.run?.endedReason, 'turn-end')
    assert.equal(status.turnState, 'needs-task')
    assert.ok(existsSync(status.run!.logPath), 'the log file must exist')
    const log = readFileSync(status.run!.logPath, 'utf8')
    assert.match(log, /"turn\.completed"/)
    assert.match(log, /"command_execution"/)

    const lastDoc = status.run!.lastDocPath!
    assert.match(readFileSync(lastDoc, 'utf8'), /fake worker finished its turn/)

    // The prompt is derived from the workspace configuration, not hard-coded.
    const prompt = readFileSync(status.run!.promptPath!, 'utf8')
    assert.ok(!prompt.includes('{{'), 'every placeholder must be filled')
    assert.match(prompt, /fake-01/)
    assert.match(prompt, /BRAIN-PROTOKOLL\.md/)
    assert.match(prompt, /_REGELN\.md/)
    assert.match(prompt, /koordination[\\/]bin[\\/]plugbrain/)

    const board = JSON.parse(b.run('swarm', 'board', '--workspace', b.ws, '--json').out) as {
      agents: Array<{ id: string; turnState: string; runner: { pid: number; alive: boolean; lastEventKind: string; lastEventText: string } | null }>
      settled: unknown[]
    }
    const row = board.agents.find(agent => agent.id === 'fake-01')
    assert.equal(row?.turnState, 'needs-task')
    assert.ok((row?.runner?.pid ?? 0) > 0)
    assert.equal(row?.runner?.alive, false)
    assert.equal(row?.runner?.lastEventKind, 'turn.completed')
    assert.match(row?.runner?.lastEventText ?? '', /DONE usage/)
    assert.deepEqual(board.settled, [])
  } finally { b.cleanup() }
})

test('a process that dies mid-turn without a current task is booked needs-task, no integrator message', nativeRunnerOnly, async () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'die'), '--workspace', b.ws).code, 0)
    const started = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws)
    assert.equal(started.code, 0, started.err)

    // Wait for the run to be settled
    const status = await settle(b, 'fake-01')
    assert.equal(status.run?.alive, false)
    assert.equal(status.run?.endedReason, 'process-gone')
    // No current task -> needs-task, not blocked
    assert.equal(status.turnState, 'needs-task')

    // No blocked booking on the board
    const board = JSON.parse(b.run('swarm', 'board', '--workspace', b.ws, '--json').out) as BoardJson
    const worker = board.agents.find(agent => agent.id === 'fake-01')
    assert.equal(worker?.turnState, 'needs-task')
    // No settled entry because there was no current task
    assert.deepEqual(board.settled, [])

    // The integrator was NOT notified because there was no current task
    const integrator = board.agents.find(agent => agent.id === 'integrator')
    assert.equal(integrator?.unread, 0)
  } finally { b.cleanup() }
})

test('blocked booking, run latch, and notification reconcile atomically and retry exactly once', nativeRunnerOnly, async () => {
  const b = brain()
  let db: DatabaseSync | null = null
  try {
    // Enqueue a task so the worker has a current task when it dies
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'enqueue', 'task for blocked test', '--to', 'fake-01', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'die'), '--workspace', b.ws).code, 0)
    const started = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws)
    assert.equal(started.code, 0, started.err)
    db = new DatabaseSync(join(b.home, 'plugbrain.db'))
    const run = db.prepare("SELECT pid, process_started_at FROM worker_runs WHERE agent_id = 'fake-01'")
      .get() as { pid: number; process_started_at: string }
    const exitDeadline = Date.now() + 15_000
    while (isOwnedProcess(run.pid, run.process_started_at)) {
      if (Date.now() >= exitDeadline) assert.fail('fake worker did not exit before blocked booking')
      await delay(50)
    }
    db.exec(`CREATE TRIGGER fail_blocked_booking BEFORE UPDATE OF turn_state ON agents
      WHEN NEW.turn_state = 'blocked' BEGIN SELECT RAISE(ABORT, 'simulated crash before blocked booking'); END`)
    const failed = b.run('swarm', 'board', '--workspace', b.ws, '--json')
    assert.notEqual(failed.code, 0)
    const afterFailure = db.prepare("SELECT ended_at, blocked_at FROM worker_runs WHERE agent_id = 'fake-01'").get() as { ended_at: string | null; blocked_at: string | null }
    assert.equal(afterFailure.ended_at, null, 'the run latch rolls back with the failed turn update')
    assert.equal(afterFailure.blocked_at, null)
    assert.equal(Number((db.prepare("SELECT COUNT(*) AS n FROM inbox_messages WHERE to_agent = 'integrator'").get() as { n: number }).n), 0)
    db.exec('DROP TRIGGER fail_blocked_booking')
    db.close()
    db = null

    const settled = await settleBoard(b, 'fake-01')
    assert.equal(settled.settled.length, 1)
    assert.equal(settled.settled[0]!.reason, 'ended-without-turn-end')
    const verify = new DatabaseSync(join(b.home, 'plugbrain.db'))
    try {
      assert.equal(Number((verify.prepare("SELECT COUNT(*) AS n FROM inbox_messages WHERE to_agent = 'integrator'").get() as { n: number }).n), 1)
      assert.equal(Number((verify.prepare("SELECT COUNT(*) AS n FROM worker_runs WHERE agent_id = 'fake-01' AND blocked_at IS NOT NULL").get() as { n: number }).n), 1)
    } finally { verify.close() }
  } finally { db?.close(); b.cleanup() }
})

test('swarm run --stop ends a hanging worker and pauses its turn', nativeRunnerOnly, async () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'hang'), '--workspace', b.ws).code, 0)
    const started = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws, '--json')
    assert.equal(started.code, 0, started.err)
    const run = JSON.parse(started.out) as RunJson

    // Give the process a moment to write its first event, then stop it.
    const deadline = Date.now() + 30_000
    while (Date.now() < deadline && !existsSync(run.logPath)) await delay(100)
    const stopped = b.run('swarm', 'run', 'fake-01', '--stop', '--workspace', b.ws)
    assert.equal(stopped.code, 0, stopped.err)
    assert.match(stopped.out, /stopped fake-01 \(pid \d+\); turn paused/)

    const status = JSON.parse(b.run('swarm', 'run', 'fake-01', '--status', '--workspace', b.ws, '--json').out) as StatusJson
    assert.equal(status.run?.alive, false)
    assert.equal(status.run?.stoppedAt !== null, true)
    assert.equal(status.run?.endedReason, 'stopped')
    assert.equal(status.turnState, 'paused')
    // A deliberately stopped worker is not a failure: no blocked booking.
    assert.ok(!readFileSync(status.run!.logPath, 'utf8').includes('spawn_error'))
  } finally { b.cleanup() }
})

test('swarm run --stop kills only the verified worker process tree', nativeRunnerOnly, async () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'tree'), '--workspace', b.ws).code, 0)
    const started = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws, '--json')
    assert.equal(started.code, 0, started.err)
    const run = JSON.parse(started.out) as RunJson
    const deadline = Date.now() + 10_000
    let childPid = 0
    while (Date.now() < deadline) {
      try { childPid = Number(readFileSync(run.lastDocPath!, 'utf8')); if (childPid > 0) break } catch { /* child not started yet */ }
      await delay(50)
    }
    assert.ok(childPid > 0, 'fake worker must start its child')
    const stopped = b.run('swarm', 'run', 'fake-01', '--stop', '--workspace', b.ws)
    assert.equal(stopped.code, 0, stopped.err)
    assert.throws(() => process.kill(childPid, 0), 'the descendant must not survive the stop')
  } finally { b.cleanup() }
})

test('swarm run refuses a worker without a profile and refuses a second live run', nativeRunnerOnly, async () => {
  const b = brain()
  try {
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    const missing = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws)
    assert.equal(missing.code, 3)
    assert.match(missing.err, /no runner profile for fake-01/)

    assert.equal(b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'hang'), '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws).code, 0)
    const second = b.run('swarm', 'run', 'fake-01', '--once', '--workspace', b.ws)
    assert.equal(second.code, 3)
    assert.match(second.err, /already has a live run/)
    assert.equal(b.run('swarm', 'run', 'fake-01', '--stop', '--workspace', b.ws).code, 0)

    // A missing program is a refusal, not a run that dies silently.
    const disallowed = b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'no-such-program-xyz', '--workspace', b.ws)
    assert.equal(disallowed.code, 3)
    assert.match(disallowed.err, /not an allowed worker command/)
  } finally { b.cleanup() }
})

test('the Codex command line and the log summarizer are what they claim to be', () => {
  const codex: RunnerProfile = {
    agentId: 'cx01', cmd: 'codex', args: [], model: 'gpt-6-luna', effort: 'high', sandbox: 'bypass',
    search: true, cwd: null, updatedAt: '2026-09-26T00:00:00.000Z',
  }
  const context = { prompt: 'DO IT', promptPath: 'p.md', logPath: 'l.jsonl', lastDocPath: 'last.md', cwd: 'C:/w' }
  const plan = buildRunnerArgv(codex, context)
  assert.deepEqual(plan.args, [
    'exec', '-m', 'gpt-6-luna', '-c', 'model_reasoning_effort=high',
    '--dangerously-bypass-approvals-and-sandbox', '-c', 'tools.web_search=true',
    '--json', '-o', 'last.md', 'DO IT',
  ])
  assert.equal(plan.viaComspec, false)
  assert.ok(plan.commandText.includes('p.md'), 'the prompt is shown as its file, never as its text')

  assert.throws(() => buildRunnerArgv({ ...codex, cmd: 'C:\\worker.cmd' }, context), /batch shims are not supported/i)
  assert.equal(isOwnedProcess(process.pid, '2000-01-01T00:00:00.000Z'), false, 'a reused pid with a different start time is not owned')

  const sandboxed = buildRunnerArgv({ ...codex, sandbox: 'workspace-write', search: false }, context)
  assert.deepEqual(sandboxed.args, [
    'exec', '-m', 'gpt-6-luna', '-c', 'model_reasoning_effort=high', '--sandbox', 'workspace-write',
    '--json', '-o', 'last.md', 'DO IT',
  ])

  // A template token that resolves to nothing is dropped, so an unset model
  // cannot leave a flag without its value behind.
  const template = buildRunnerArgv(
    { ...codex, cmd: 'node', args: ['worker.mjs', '--last={last}', '--prompt', '{prompt}', '{model}'], model: null },
    context,
  )
  assert.deepEqual(template.args, ['worker.mjs', '--last=last.md', '--prompt', 'DO IT'])

  assert.deepEqual(summarizeLogEvent('{"type":"item.completed","item":{"type":"command_execution","command":"npm test","exit_code":0}}'),
    { at: null, kind: 'command_execution', text: 'CMD npm test -> exit 0' })
  assert.deepEqual(summarizeLogEvent('{"type":"turn.completed","timestamp":"2026-09-26T10:00:00Z","usage":{"input_tokens":1}}'),
    { at: '2026-09-26T10:00:00Z', kind: 'turn.completed', text: 'DONE usage {"input_tokens":1}' })
  assert.deepEqual(summarizeLogEvent('not json at all'), { at: null, kind: 'raw', text: 'not json at all' })
  assert.equal(summarizeLogEvent('   '), null)
})

test('the prompt names the protocol documents the workspace actually has', () => {
  const b = brain()
  try {
    const docs = discoverProtocolDocs(b.root)
    assert.match(docs.rulesPath ?? '', /lane-new-20260101/, 'the newest lane wins, not the last name')
    const prompt = renderRunnerPrompt({ agentId: 'x1', workspaceRoot: b.root, docs })
    assert.ok(!prompt.includes('{{'))
    assert.match(prompt, /worker x1/)
    assert.match(prompt, /BRAIN-PROTOKOLL\.md/)
    assert.match(prompt, /lane-new-20260101[\\/]briefs[\\/]_REGELN\.md/)
    assert.ok(!prompt.includes('zulu-old-20251231'))

    const bare = renderRunnerPrompt({
      agentId: 'x2', workspaceRoot: b.root,
      docs: { coordinationDir: null, protocolPath: null, rulesPath: null },
    })
    assert.ok(!bare.includes('{{'))
    assert.match(bare, /Read in full: the brief named by your task\./)
  } finally { b.cleanup() }
})

test('swarm run supervisor claims the next task, runs a fake worker and stops for a lead decision after the retry limit', nativeRunnerOnly, async () => {
  const b = brain()
  let db: DatabaseSync | null = null
  let supervisorPid: number | null = null
  try {
    assert.equal(b.run('swarm', 'register', 'fake-01', '--surface', 'other', '--account', 'test:fake', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'enqueue', 'supervised task', '--to', 'fake-01', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'runner', 'set', 'fake-01', '--cmd', 'node', '--args', fakeArgs(b, 'die'), '--workspace', b.ws).code, 0)
    const launched = b.run('swarm', 'run', 'fake-01', '--workspace', b.ws,
      '--max-attempts', '2', '--max-idle-checks', '1', '--idle-ms', '50', '--poll-ms', '50', '--json')
    assert.equal(launched.code, 0, launched.err)
    const supervisor = JSON.parse(launched.out) as { pid: number; supervisorId: string }
    supervisorPid = supervisor.pid
    assert.ok(supervisor.pid > 0)

    const deadline = Date.now() + 30_000
    let state: { active: number; last_failure: string | null } | undefined
    while (Date.now() < deadline) {
      db ??= new DatabaseSync(join(b.home, 'plugbrain.db'))
      state = db.prepare("SELECT active, last_failure FROM worker_supervisors WHERE agent_id = 'fake-01'").get() as
        { active: number; last_failure: string | null } | undefined
      if (state?.active === 0) break
      await delay(100)
    }
    assert.equal(state?.active, 0, 'supervisor stops after a bounded unsuccessful attempt')
    assert.equal(state?.last_failure, 'crash')
    const attempts = db!.prepare("SELECT attempt, attempt_token, outcome, ended_at FROM worker_task_attempts WHERE agent_id = 'fake-01' ORDER BY attempt")
      .all() as Array<{ attempt: number; attempt_token: string; outcome: string; ended_at: string | null }>
    assert.equal(attempts.length, 2, 'the crash is retried once, then reaches the configured bound')
    assert.equal(attempts[0]?.outcome, 'crash')
    assert.equal(attempts[0]?.ended_at !== null, true)
    assert.equal(attempts[1]?.outcome, 'crash')
    const reservations = db!.prepare('SELECT pool_id, attempt_id, settled_at, usage, outcome FROM quota_reservations ORDER BY reserved_at')
      .all() as Array<{ pool_id: string; attempt_id: string; settled_at: string | null; usage: number | null; outcome: string | null }>
    assert.equal(reservations.length, 2, 'every launched attempt reserves one shared account-pool slot')
    assert.deepEqual(reservations.map(row => row.pool_id), ['test:fake', 'test:fake'])
    assert.ok(reservations.every(row => row.settled_at !== null && row.usage === null && row.outcome === 'crash'))
    const promptPath = (db!.prepare("SELECT prompt_path FROM worker_runs WHERE agent_id = 'fake-01'").get() as { prompt_path: string }).prompt_path
    const assignedPrompt = readFileSync(promptPath, 'utf8')
    assert.match(assignedPrompt, /Assigned queue task \(already atomically claimed\)/)
    assert.match(assignedPrompt, /supervised task/)
    assert.doesNotMatch(assignedPrompt, /swarm turn fake-01 start --claim/)
    const task = db!.prepare("SELECT state, claimed_by FROM queue_tasks WHERE title = 'supervised task'").get() as
      { state: string; claimed_by: string | null } | undefined
    assert.equal(task?.state, 'pending')
    assert.equal(task?.claimed_by, null)
    const leadMessage = db!.prepare("SELECT COUNT(*) AS n FROM inbox_messages WHERE to_agent = 'integrator'").get() as { n: number }
    assert.equal(Number(leadMessage.n), 1)
    const oldToken = process.env.PLUGBRAIN_ATTEMPT_TOKEN
    const oldAgent = process.env.PLUGBRAIN_SUPERVISED_AGENT
    try {
      process.env.PLUGBRAIN_ATTEMPT_TOKEN = attempts[0]!.attempt_token
      process.env.PLUGBRAIN_SUPERVISED_AGENT = 'fake-01'
      assert.throws(() => assertActiveSupervisorAttempt(db!), /stale supervisor attempt is fenced/)
    } finally {
      if (oldToken === undefined) delete process.env.PLUGBRAIN_ATTEMPT_TOKEN
      else process.env.PLUGBRAIN_ATTEMPT_TOKEN = oldToken
      if (oldAgent === undefined) delete process.env.PLUGBRAIN_SUPERVISED_AGENT
      else process.env.PLUGBRAIN_SUPERVISED_AGENT = oldAgent
    }
    assert.equal(classifySupervisorFailure({ exitCode: 1, output: 'HTTP 429: rate limit; Retry-After: 2' }), 'quota')
    assert.equal(classifySupervisorFailure({ exitCode: 1, output: 'authentication failed' }), 'auth')
    assert.equal(classifySupervisorFailure({ exitCode: 3, output: 'worker exited' }), 'crash')
    const exitDeadline = Date.now() + 10_000
    for (;;) {
      try { process.kill(supervisor.pid, 0) } catch { break }
      if (Date.now() >= exitDeadline) assert.fail(`supervisor process ${supervisor.pid} did not exit`)
      await delay(50)
    }
    supervisorPid = null
  } finally {
    if (supervisorPid !== null) {
      const exitDeadline = Date.now() + 10_000
      while (Date.now() < exitDeadline) {
        try { process.kill(supervisorPid, 0); await delay(50) } catch { break }
      }
    }
    db?.close()
    b.cleanup()
  }
})
