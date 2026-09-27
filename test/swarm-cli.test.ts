/**
 * `plugbrain swarm` end to end: every call is a real CLI process against a
 * throwaway store, the way a Freebuff, AGY or Codex worker would run it.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { workspaceIdFor } from '../src/planet.ts'
import { openStore } from '../src/store/schema.ts'
import { AGENT_PROTOCOL_BLOCK } from '../src/setup/agent-protocol.ts'
import { deliverTaskWithEvidence } from '../src/coord/turn-delivery.ts'

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
      windowsHide: true,
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
    assert.equal(b.run('swarm', 'send', 'nv01', '--subject', 'Hallo', '--body', 'Bitte starten', '--from', 'cx03', '--workspace', b.ws).code, 0)

    const end = b.run('swarm', 'turn', 'nv01', 'end', '--state', 'needs-task', '--summary', 'R1 fertig', '--workspace', b.ws, '--json')
    assert.equal(end.code, 0, end.err)
    const ping = JSON.parse(end.out) as { state: string; inbox: Array<{ id: string; subject: string; fromAgent: string }>; nextTask: { title: string } | null }
    assert.equal(ping.state, 'needs-task')
    assert.deepEqual(ping.inbox.map(message => message.subject), ['Hallo'])
    assert.equal(ping.inbox[0]?.fromAgent, 'cx03', 'the sender is the worker that wrote it, not the integrator')
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

test('queue supersede, reassign and priority commands persist audit history and show on the board', () => {
  const b = brain()
  try {
    for (const id of ['cx11', 'nv01']) {
      assert.equal(b.run('swarm', 'register', id, '--surface', 'other', '--account', 'test', '--workspace', b.ws).code, 0)
    }
    const old = /eingereiht (task-[0-9a-f-]+)/.exec(b.run('swarm', 'enqueue', 'Old task', '--workspace', b.ws).out)?.[1]
    const next = /eingereiht (task-[0-9a-f-]+)/.exec(b.run('swarm', 'enqueue', 'Replacement', '--workspace', b.ws).out)?.[1]
    const routed = /eingereiht (task-[0-9a-f-]+)/.exec(b.run('swarm', 'enqueue', 'Routed', '--workspace', b.ws).out)?.[1]
    assert.ok(old && next && routed)

    assert.equal(b.run('swarm', 'supersede', old, '--by', next, '--note', 'replaced brief', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'reassign', routed, '--to', 'nv01', '--workspace', b.ws).code, 0)
    assert.equal(b.run('swarm', 'priority', next, '10', '--workspace', b.ws).code, 0)

    const board = JSON.parse(b.run('swarm', 'board', '--workspace', b.ws, '--json').out) as {
      queue: { tasks: Array<{ id: string; state: string; priority: number; addressedTo: string | null; supersededBy: string | null }>; recentChanges: Array<{ taskId: string; operation: string }> }
    }
    assert.equal(board.queue.tasks.find(task => task.id === old)?.state, 'superseded')
    assert.equal(board.queue.tasks.find(task => task.id === old)?.supersededBy, next)
    assert.equal(board.queue.tasks.find(task => task.id === routed)?.addressedTo, 'nv01')
    assert.equal(board.queue.tasks.find(task => task.id === next)?.priority, 10)
    assert.deepEqual(board.queue.recentChanges.map(change => change.operation), ['priority', 'reassign', 'supersede'])

    const claimed = JSON.parse(b.run('swarm', 'turn', 'cx11', 'start', '--claim', '--workspace', b.ws, '--json').out) as {
      claimedTask: { id: string } | null
    }
    assert.equal(claimed.claimedTask?.id, next, 'priority controls order and superseded work is never offered')
  } finally { b.cleanup() }
})

test('a worker hands in its claimed task with the evidence path, and only the holder can', () => {
  const b = brain()
  try {
    for (const id of ['wf-m15', 'wf-m16']) {
      assert.equal(b.run('swarm', 'register', id, '--surface', 'claude-code', '--account', 'owner:anthropic', '--workspace', b.ws).code, 0)
    }
    assert.equal(b.run('swarm', 'enqueue', 'M15: Overlays', '--to', 'wf-m15', '--workspace', b.ws).code, 0)
    const start = b.run('swarm', 'turn', 'wf-m15', 'start', '--claim', '--workspace', b.ws, '--json')
    const taskId = (JSON.parse(start.out) as { claimedTask: { id: string } }).claimedTask.id
    const evidenceDir = join(b.home, 'root', 'closeout', 'M15')
    mkdirSync(evidenceDir, { recursive: true })
    const evidence = join(evidenceDir, 'DONE.md')
    writeFileSync(evidence, 'Implementation complete.\n')
    const stranger = b.run('swarm', 'deliver', 'wf-m16', taskId, '--path', evidence, '--workspace', b.ws)
    assert.equal(stranger.code, 3)
    assert.match(stranger.err, /held by wf-m15/)
    const repo = join(b.home, 'repo')
    mkdirSync(repo)
    execFileSync('git', ['init', '-b', 'main', repo], { windowsHide: true })
    execFileSync('git', ['-C', repo, 'config', 'user.email', 'delivery@test.invalid'], { windowsHide: true })
    execFileSync('git', ['-C', repo, 'config', 'user.name', 'Delivery Test'], { windowsHide: true })
    writeFileSync(join(repo, 'source.txt'), 'source\n')
    execFileSync('git', ['-C', repo, 'add', '.'], { windowsHide: true })
    execFileSync('git', ['-C', repo, 'commit', '-m', 'source revision'], { windowsHide: true })
    const sourceRevision = execFileSync('git', ['-C', repo, 'rev-parse', 'HEAD'], { encoding: 'utf8', windowsHide: true }).trim()
    const delivered = b.run('swarm', 'deliver', 'wf-m15', taskId, '--path', evidence, '--repo', repo, '--workspace', b.ws)
    assert.equal(delivered.code, 0, delivered.err)
    assert.match(delivered.out, /geliefert task-[0-9a-f-]+: M15: Overlays/)
    const db = openStore(join(b.home, 'plugbrain.db'))
    try {
      const receipt = db.prepare('SELECT task_id, delivered_by, delivery_attempt, source_revision, delivered_path, delivered_sha256 FROM queue_deliveries WHERE task_id = ?')
        .get(taskId) as { task_id: string; delivered_by: string; delivery_attempt: number; source_revision: string; delivered_path: string; delivered_sha256: string }
      assert.deepEqual({ ...receipt }, {
        task_id: taskId,
        delivered_by: 'wf-m15',
        delivery_attempt: 1,
        source_revision: sourceRevision,
        delivered_path: 'closeout/M15/DONE.md',
        delivered_sha256: createHash('sha256').update('Implementation complete.\n').digest('hex'),
      })
    } finally { db.close() }
  } finally { b.cleanup() }
})

test('delivery rejects missing, empty, outside-workspace, and incomplete review evidence', () => {
  const b = brain()
  try {
    for (const [agent, title] of [['reviewer-missing', 'Missing artifact'], ['reviewer-review', 'R- Review result']] as const) {
      assert.equal(b.run('swarm', 'register', agent, '--surface', 'other', '--account', 'test', '--workspace', b.ws).code, 0)
      const enqueue = b.run('swarm', 'enqueue', title, '--to', agent, '--workspace', b.ws)
      const taskId = /eingereiht (task-[0-9a-f-]+)/.exec(enqueue.out)?.[1]
      assert.ok(taskId)
      assert.equal(b.run('swarm', 'turn', agent, 'start', '--claim', '--workspace', b.ws).code, 0)
      const missing = b.run('swarm', 'deliver', agent, taskId, '--path', 'missing.md', '--workspace', b.ws)
      assert.equal(missing.code, 3)
      assert.match(missing.err, /does not exist/i)
      const emptyPath = join(b.home, 'root', 'empty.md')
      writeFileSync(emptyPath, '')
      const empty = b.run('swarm', 'deliver', agent, taskId, '--path', emptyPath, '--workspace', b.ws)
      assert.equal(empty.code, 3)
      assert.match(empty.err, /empty/i)
      const outside = join(b.home, 'outside.md')
      writeFileSync(outside, 'outside workspace')
      const rejected = b.run('swarm', 'deliver', agent, taskId, '--path', outside, '--workspace', b.ws)
      assert.equal(rejected.code, 3)
      assert.match(rejected.err, /workspace/i)
      if (title.startsWith('R-')) {
        const review = join(b.home, 'root', 'review.md')
        writeFileSync(review, `This review says it is not PASS.\nReviewed commit: \`${'a'.repeat(40)}\`\n`)
        const incomplete = b.run('swarm', 'deliver', agent, taskId, '--path', review, '--workspace', b.ws)
        assert.equal(incomplete.code, 3)
        assert.match(incomplete.err, /review.*judgment.*commit hash/i)
        writeFileSync(review, `Verdict: PASS\nReviewed commit: \`${'a'.repeat(40)}\`\n`)
        const complete = b.run('swarm', 'deliver', agent, taskId, '--path', review, '--workspace', b.ws)
        assert.equal(complete.code, 0, complete.err)
        const db = openStore(join(b.home, 'plugbrain.db'))
        try {
          const receipt = db.prepare('SELECT review_judgment, reviewed_commit FROM queue_deliveries WHERE task_id = ?').get(taskId) as
            { review_judgment: string; reviewed_commit: string }
          assert.equal(receipt.review_judgment, 'PASS')
          assert.equal(receipt.reviewed_commit, 'a'.repeat(40))
        } finally { db.close() }
      }
    }
  } finally { b.cleanup() }
})

test('delivery cannot use a task from a different selected workspace', () => {
  const b = brain()
  const db = openStore(join(b.home, 'plugbrain.db'))
  try {
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run('ws-other', 'Other workspace', join(b.home, 'other'), new Date().toISOString())
    const queued = b.run('swarm', 'enqueue', 'Scoped task', '--workspace', b.ws)
    const taskId = /eingereiht (task-[0-9a-f-]+)/.exec(queued.out)?.[1]
    assert.ok(taskId)
    const evidence = join(b.home, 'root', 'evidence.md')
    writeFileSync(evidence, 'evidence\n')
    assert.throws(() => deliverTaskWithEvidence(db, taskId, 'some-agent', evidence, undefined, {
      workspaceId: 'ws-other', workspaceRoot: join(b.home, 'other'),
    }), /unknown task/i)
  } finally { db.close(); b.cleanup() }
})

test('swarm delivery is documented in the generated agent block and CLI reference', () => {
  const protocol = readFileSync(new URL('../docs/agent-protocol.md', import.meta.url), 'utf8')
  const cliHelp = readFileSync(new URL('../docs/cli.md', import.meta.url), 'utf8')
  const commandHelp = readFileSync(new URL('../src/cli.ts', import.meta.url), 'utf8')
  for (const text of [protocol, AGENT_PROTOCOL_BLOCK]) {
    assert.match(text, /plugbrain swarm deliver <id> <taskId> --path/)
    assert.match(text, /needs-task.*or.*awaiting-commit/s)
  }
  assert.match(cliHelp, /swarm deliver <agent> <taskId> --path/)
  assert.match(commandHelp, /swarm <register\|turn\|ack\|board\|chronik\|send\|enqueue\|deliver/)
})

test('waiting tasks, the reviewer pool and the watchdog cycle all work through the CLI', () => {
  const b = brain()
  try {
    for (const [id, account] of [['cx01', 'owner:chatgpt'], ['nv03', 'nvidia:key-03'], ['nv04', 'nvidia:key-04']] as const) {
      assert.equal(b.run('swarm', 'register', id, '--surface', 'freebuff', '--account', account, '--workspace', b.ws).code, 0)
    }

    // A task with --after stays out of reach until its predecessor arrives.
    const basis = b.run('swarm', 'enqueue', 'Basis', '--to', 'cx01', '--workspace', b.ws)
    assert.equal(basis.code, 0, basis.err)
    const basisId = /eingereiht (task-[0-9a-f-]+)/.exec(basis.out)?.[1]
    assert.ok(basisId, basis.out)
    assert.equal(b.run('swarm', 'enqueue', 'Nachlauf', '--to', 'nv03', '--after', basisId, '--workspace', b.ws).code, 0)

    const blocked = b.run('swarm', 'turn', 'nv03', 'start', '--claim', '--workspace', b.ws, '--json')
    assert.equal(blocked.code, 0, blocked.err)
    assert.equal((JSON.parse(blocked.out) as { claimedTask: unknown }).claimedTask, null)

    const claimed = b.run('swarm', 'turn', 'cx01', 'start', '--claim', '--workspace', b.ws, '--json')
    const claimedTask = (JSON.parse(claimed.out) as { claimedTask: { id: string; title: string } }).claimedTask
    assert.equal(claimedTask.title, 'Basis')

    // The reviewer pool routes a finished turn to another account.
    assert.match(b.run('swarm', 'review-pool', 'set', 'nv03', 'nv04', '--workspace', b.ws).out, /Reviewer: nv03, nv04/)
    assert.match(b.run('swarm', 'review-pool', 'auto', 'on', '--workspace', b.ws).out, /Review-Routing: an/)
    assert.equal(b.run('swarm', 'turn', 'cx01', 'end', '--state', 'awaiting-commit', '--summary', 'fertig', '--workspace', b.ws).code, 0)

    const waiting = b.run('swarm', 'turn', 'nv03', 'start', '--claim', '--workspace', b.ws, '--json')
    assert.equal((JSON.parse(waiting.out) as { claimedTask: { title: string } }).claimedTask.title, 'Nachlauf')
    const review = b.run('swarm', 'turn', 'nv04', 'start', '--claim', '--workspace', b.ws, '--json')
    assert.equal((JSON.parse(review.out) as { claimedTask: unknown }).claimedTask, null,
      'a review addressed to nv03 is not offered to nv04')

    // The workspace threshold is a setting, and the scan reads it.
    assert.match(b.run('swarm', 'watchdog', 'silent-after', '30', '--workspace', b.ws).out, /ab 30 min/)
    const scan = JSON.parse(b.run('swarm', 'watchdog', '--workspace', b.ws, '--json').out) as
      { silentAfterMinutes: number; silent: unknown[]; alerted: unknown[] }
    assert.equal(scan.silentAfterMinutes, 30)
    assert.deepEqual(scan.silent, [])
    assert.deepEqual(scan.alerted, [])
    const show = JSON.parse(b.run('swarm', 'review-pool', 'show', '--workspace', b.ws, '--json').out) as
      { reviewAuto: boolean; silentAfterMinutes: number; pool: Array<{ agentId: string }> }
    assert.equal(show.reviewAuto, true)
    assert.equal(show.silentAfterMinutes, 30)
    assert.deepEqual(show.pool.map(entry => entry.agentId), ['nv03', 'nv04'])
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
    const setPool = b.run('swarm', 'quota-pool', 'set', 'nvidia:project-a', '--max-concurrent', '3', '--rpm', '20', '--workspace', b.ws)
    assert.equal(setPool.code, 0, setPool.err)
    assert.match(b.run('swarm', 'quota-pool', 'show', '--workspace', b.ws).out, /nvidia:project-a: concurrency=3, rpm=20/)
    const register = b.run('swarm', 'register', 'nv01', '--surface', 'freebuff', '--account', 'nvidia:key-01',
      '--quota-pool', 'nvidia:project-a', '--workspace', b.ws)
    assert.equal(register.code, 0, register.err)
    const bad = b.run('swarm', 'quota', 'nvidia:key-02', '5', 'rpm', '--note', 'nvapi-' + 'x'.repeat(36), '--workspace', b.ws)
    assert.equal(bad.code, 3)
    assert.match(bad.err, /looks like a credential/)
  } finally { b.cleanup() }
})

test('workers claim the paths they write, and a second writer is refused until release', () => {
  const b = brain()
  try {
    for (const id of ['o2-lanes', 'o4-mission']) {
      assert.equal(b.run('swarm', 'register', id, '--surface', 'freebuff', '--account', 'owner:chatgpt', '--workspace', b.ws).code, 0)
    }
    const first = b.run('swarm', 'claim', 'o2-lanes', 'packages/plug/swarm/src/client-lane-executor.ts', '--task', 'dog-run-2', '--workspace', b.ws)
    assert.equal(first.code, 0, first.err)
    const second = b.run('swarm', 'claim', 'o4-mission', 'packages/plug/swarm/src/client-lane-executor.ts', '--workspace', b.ws)
    assert.equal(second.code, 3)
    assert.match(second.err, /gehört o2-lanes \(dog-run-2\)/)
    const board = JSON.parse(b.run('swarm', 'board', '--workspace', b.ws, '--json').out) as { agents: Array<{ id: string; leases: Array<{ paths: string[] }> }> }
    assert.deepEqual(board.agents.find(agent => agent.id === 'o2-lanes')?.leases.map(lease => lease.paths).flat(), ['packages/plug/swarm/src/client-lane-executor.ts'])
    assert.match(b.run('swarm', 'release', 'o2-lanes', '--task', 'dog-run-2', '--workspace', b.ws).out, /freigegeben: 1/)
    assert.equal(b.run('swarm', 'claim', 'o4-mission', 'packages/plug/swarm/src/client-lane-executor.ts', '--workspace', b.ws).code, 0)
  } finally { b.cleanup() }
})

test('swarm reap defaults to a read-only plan and persists the automatic setting', () => {
  const b = brain()
  try {
    const repo = join(b.home, 'reap-repo')
    mkdirSync(repo)
    execFileSync('git', ['init', '-b', 'main', repo], { windowsHide: true })
    execFileSync('git', ['-C', repo, 'config', 'user.email', 'cli-reaper@test.invalid'], { windowsHide: true })
    execFileSync('git', ['-C', repo, 'config', 'user.name', 'CLI Reaper Test'], { windowsHide: true })
    writeFileSync(join(repo, 'base.txt'), 'base\n')
    execFileSync('git', ['-C', repo, 'add', '.'], { windowsHide: true })
    execFileSync('git', ['-C', repo, 'commit', '-m', 'base'], { windowsHide: true })
    const preview = b.run('swarm', 'reap', '--repo', repo, '--workspace', b.ws, '--json')
    assert.equal(preview.code, 0, preview.err)
    const result = JSON.parse(preview.out) as { dryRun: boolean; removed: unknown[]; candidates: Array<{ reason: string }> }
    assert.equal(result.dryRun, true)
    assert.equal(result.removed.length, 0)
    assert.match(result.candidates[0]?.reason ?? '', /primary checkout/)
    assert.match(b.run('swarm', 'reap', '--auto', 'on', '--workspace', b.ws).out, /reap.auto on/)
    assert.match(b.run('swarm', 'reap', '--auto', 'off', '--workspace', b.ws).out, /reap.auto off/)
  } finally { b.cleanup() }
})
