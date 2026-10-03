/**
 * `plugbrain swarm …` — the fleet's check-in desk on the command line.
 *
 * Every worker, whatever hosts it (a Freebuff tab, AGY, the Codex app, Claude
 * Code), can run a command, so this is the one channel all of them share. It
 * works on the local store directly: a worker never needs the Core's HTTP key.
 *
 *   plugbrain swarm register <agent> --surface <s> --account <label> [--quota-pool <pool>] [--key <resource>]
 *                            [--model <m>] [--name <n>] [--worktree <path>]... [--takeover]
 *   plugbrain swarm turn <agent> start [--claim]
 *   plugbrain swarm turn <agent> end --state needs-task|awaiting-commit|blocked|paused [--summary <s>]
 *   plugbrain swarm ack <agent> <messageId>
 *   plugbrain swarm retire <agent> --note <reason>
 *   plugbrain swarm claim <agent> <path>... [--task <id>] [--ttl-min <n>]   write lease, shown on the board
 *   plugbrain swarm release <agent> [<path>...] [--task <id>]
 *   plugbrain swarm board [--git] [--json]
 *   plugbrain swarm reap [--dry-run] [--repo <path>] [--target <branch>] [--apply]
 *   plugbrain swarm reap --auto on|off
 *   plugbrain swarm send <agent> --subject <s> --body <b> [--from <agent>]
 *   plugbrain swarm enqueue <title> [--body <b>] [--to <agent>] [--plan <M00>] [--by <agent>] [--after <taskId>]
 *   plugbrain swarm supersede <task> [--by <task>] --note <reason>
 *   plugbrain swarm reassign <task> --to <agent>
 *   plugbrain swarm priority <task> <n>
 *   plugbrain swarm deliver <agent> <taskId> --path <evidence>   hand in a claimed task's candidate
 *   plugbrain swarm wave-done <waveId>                         record a wave only when evidence is complete
 *   plugbrain swarm approve <agent> [--note <n>] [--by <agent>]
 *   plugbrain swarm resources [--json]
 *   plugbrain swarm quota <account> <remaining> <percent|credits|requests|rpm|tokens> [--resets <iso>] [--note <n>]
 *   plugbrain swarm quota-pool set <pool> --max-concurrent <n> [--rpm <n>] | quota-pool show
 *   plugbrain swarm admit <edit|test|index|build|install|worktree>   exit 0 = room, 5 = no room
 *   plugbrain swarm watchdog [--json] [--dry-run] | watchdog silent-after <minutes>
 *   plugbrain swarm review-pool set <agent>... | review-pool auto on|off | review-pool show
 *   plugbrain swarm runner set <agent> --cmd <exe> [--model <m>] [--effort <e>] [--sandbox <s>] [--search]
 *   plugbrain swarm runner show <agent>
 *   plugbrain swarm run <agent> [--once|--status|--stop]  refill the worker's queue headless
 *
 * Every command takes `--workspace <id>`; without it the single planet is used.
 */
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireWorkspace } from './access.ts'
import { enqueueTask, prioritizeTask, reassignTask, supersedeTask } from './queue.ts'
import {
  ensureWaveDoneSchema, recordWaveDone,
  type WaveManifestEvidence, type WaveTaskEvidence,
} from './coord/wave-done.ts'
import { PLAN_REF, setPlanRef } from './plan.ts'
import { buildSwarmChronicle, formatSwarmChronicleMarkdown } from './coord/chronicle.ts'
import { getSwarmNextActions, type SwarmNextAction } from './coord/next-actions.ts'
import { currentTaskForTurnDelivery, deliverTaskAtTurnEnd, deliverTaskWithEvidence } from './coord/turn-delivery.ts'
import {
  acquireLease, admitWork, agentsBoard, approveCommit, confirmDelivery, ensureIntegrator, ensureSwarmOpsSchema,
  configureQuotaPool, getRunnerProfile, hostSnapshot, listQuotaPools, listQuotas, quotaPoolSummary, readReviewPool, reconcileWorkerRuns, recordTurn, releaseLease,
  reapWorktrees, setReapAuto,
  registerSwarmAgent, registerWorkerProfile, reportQuota, retireWorker, scanWatchdog, sendMessage,
  setReviewAuto, setReviewPool, setRunnerProfile, setSilentAfterMinutes, startWorkerRun, stopWorkerRun,
  assertActiveSupervisorAttempt, runSupervisorLoop, startSupervisor, stopSupervisor,
  touchAgentContact, watchdogSettings, workerRunStatus,
  TURN_END_STATES, WORK_KINDS, WORKER_SURFACES,
  type QuotaUnit, type RunnerProfile, type SwarmBoard, type TurnEndState, type TurnPing, type WorkerRun, type WorkKind, type WorkerSurface,
} from './coord/index.ts'

/** Swarm workers check in at turn boundaries, which can be hours apart. */
const WORKER_HEARTBEAT_TTL_MS = 6 * 60 * 60_000
const INTEGRATOR = 'integrator'
const GB = 1024 ** 3

const flag = (args: string[], name: string): string | null => {
  const inline = args.find(arg => arg.startsWith(`${name}=`))
  if (inline !== undefined) return inline.slice(name.length + 1)
  const at = args.indexOf(name)
  return at === -1 ? null : args[at + 1] ?? null
}

const numberFlag = (args: string[], name: string): number | undefined => {
  const value = flag(args, name)
  if (value === null) return undefined
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) throw new AccessDenied(`${name} must be a finite number`)
  return parsed
}

const flags = (args: string[], name: string): string[] => {
  const values: string[] = []
  args.forEach((arg, index) => {
    if (arg === name && args[index + 1] !== undefined) values.push(args[index + 1]!)
    else if (arg.startsWith(`${name}=`)) values.push(arg.slice(name.length + 1))
  })
  return values
}

/** Positional arguments: everything that is neither a flag nor a flag's value. */
const positionals = (args: string[], valued: string[]): string[] => {
  const out: string[] = []
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]!
    if (valued.includes(arg)) { index += 1; continue }
    if (arg.startsWith('--')) continue
    out.push(arg)
  }
  return out
}

const VALUED = [
  '--workspace', '--surface', '--account', '--quota-pool', '--key', '--model', '--name', '--worktree', '--state', '--summary', '--deliver', '--since',
  '--subject', '--body', '--from', '--to', '--by', '--note', '--resets', '--task', '--ttl-min', '--plan', '--path',
  '--repo', '--target', '--auto', '--after',
  '--cmd', '--args', '--effort', '--sandbox', '--cwd', '--max-concurrent', '--rpm',
]

function need(value: string | null | undefined, usage: string): string {
  if (value === null || value === undefined || value.trim() === '') throw new AccessDenied(`usage: ${usage}`)
  return value
}

function printPing(ping: TurnPing): void {
  console.log(`${ping.agentId}: ${ping.state}`)
  if (ping.inbox.length === 0) console.log('  keine neuen Nachrichten')
  for (const message of ping.inbox) {
    console.log(`  NACHRICHT ${message.id} von ${message.fromAgent}: ${message.subject}`)
    for (const line of message.body.split('\n')) console.log(`    ${line}`)
  }
  if (ping.currentTask) console.log(`  AKTUELLE AUFGABE ${ping.currentTask.id}: ${ping.currentTask.title}`)
  if (ping.claimedTask) console.log(`  GENOMMEN ${ping.claimedTask.id}: ${ping.claimedTask.title}\n    ${ping.claimedTask.body.split('\n').join('\n    ')}`)
  if (ping.nextTask) console.log(`  NÄCHSTE AUFGABE ${ping.nextTask.id}: ${ping.nextTask.title} (nehmen mit: turn <agent> start --claim)`)
  for (const admission of ping.admission) {
    if (!admission.allowed) console.log(`  KEIN PLATZ für ${admission.kind}: ${admission.reasons.join('; ')}`)
  }
  if (ping.inbox.length > 0) console.log('  gelesen quittieren: plugbrain swarm ack <agent> <messageId>')
}

function printNextActions(actions: SwarmNextAction[]): void {
  console.log('Als Nächstes')
  if (actions.length === 0) console.log('  Keine offenen Handlungsvorschläge.')
  for (const action of actions) {
    console.log(`- [${action.priority}] ${action.title}: ${action.reason}`)
    console.log(`  ${action.command}`)
  }
}

function printBoard(board: SwarmBoard, nextActions: SwarmNextAction[]): void {
  const drives = board.host.drives.map(drive => `${drive.root} ${(drive.freeBytes / GB).toFixed(1)} GB frei`).join(', ')
  const ram = `${Math.round((board.host.memory.freeBytes / board.host.memory.totalBytes) * 100)} % RAM frei`
  console.log(`Fleet ${board.workspaceId} · ${board.agents.filter(row => !row.retired).length} Worker · ${drives} · ${ram}`)
  const pending = board.queue.tasks.filter(task => task.state === 'pending').length
  const claimed = board.queue.tasks.filter(task => task.state === 'claimed').length
  const superseded = board.queue.tasks.filter(task => task.state === 'superseded').length
  console.log(`Queue: ${pending} pending · ${claimed} claimed · ${superseded} superseded`)
  for (const task of board.queue.tasks.filter(task => task.state === 'claimed')) {
    console.log(`  Claimed ${task.id} by ${task.claimedBy ?? 'unknown'}: ${task.title}`)
  }
  for (const change of board.queue.recentChanges.slice(0, 10)) {
    console.log(`  Queue ${change.operation} ${change.taskId} by ${change.byAgent}${change.note ? `: ${change.note}` : ''}`)
  }
  for (const admission of board.admission) {
    if (!admission.allowed) console.log(`  KEIN PLATZ für ${admission.kind}: ${admission.reasons.join('; ')}`)
  }
  for (const row of board.agents) {
    if (row.retired) continue
    const flagsText = row.attention.length > 0 ? ` !! ${row.attention.join(', ')}` : ''
    console.log(`- ${row.id.padEnd(18)} ${(row.surface ?? '?').padEnd(11)} ${(row.account ?? '-').padEnd(20)} ` +
      `${(row.turnState ?? 'unbekannt').padEnd(15)} ungelesen ${row.unread}${flagsText}`)
    if (row.task) console.log(`    Aufgabe ${row.task.id}: ${row.task.title}`)
    if (row.silentMinutes !== null) console.log(`    still? seit ${row.silentMinutes} min ohne Kontakt`)
    if (row.turnSummary) console.log(`    zuletzt: ${row.turnSummary.split('\n')[0]}`)
    for (const lease of row.leases) console.log(`    schreibt (Lease): ${lease.paths.join(', ')}`)
    for (const worktree of row.worktrees) {
      const detail = worktree.error !== null ? `Fehler: ${worktree.error}`
        : worktree.branch === null ? '' : `${worktree.branch} @ ${worktree.head} · ${worktree.dirtyFiles} uncommitted`
      console.log(`    Worktree ${worktree.path} ${detail}`)
    }
    if (row.runner !== null) {
      const runner = row.runner
      const life = runner.alive
        ? `pid ${runner.pid} running since ${runner.startedAt}`
        : `pid ${runner.pid ?? '?'} gone${runner.endedAt === null ? '' : ` at ${runner.endedAt}`}${runner.endedReason === null ? '' : ` (${runner.endedReason})`}`
      console.log(`    runner: ${life}`)
      if (runner.lastEventKind !== null) {
        console.log(`    last log event ${runner.lastEventAt ?? '?'} ${runner.lastEventKind}: ${runner.lastEventText ?? ''}`)
      }
      if (runner.blockedAt !== null) console.log(`    runner died mid-turn; worker booked blocked at ${runner.blockedAt}`)
    }
  }
  for (const overlap of board.overlaps) console.log(`  ÜBERLAPPUNG ${overlap.worktree}: ${overlap.agents.join(', ')}`)
  console.log()
  printNextActions(nextActions)
}

function printRunnerProfile(profile: RunnerProfile): void {
  const parts = [`program ${profile.cmd}`]
  if (profile.model !== null) parts.push(`model ${profile.model}`)
  if (profile.effort !== null) parts.push(`effort ${profile.effort}`)
  if (profile.sandbox !== null) parts.push(`sandbox ${profile.sandbox}`)
  if (profile.search) parts.push('web search')
  if (profile.cwd !== null) parts.push(`cwd ${profile.cwd}`)
  console.log(`${profile.agentId}: ${parts.join(' · ')}`)
  if (profile.args.length > 0) console.log(`  args: ${profile.args.join(' ')}`)
}

function printRunStatus(db: DatabaseSync, workspaceId: string, agentId: string, asJson: boolean): number {
  const status = workerRunStatus(db, workspaceId, agentId)
  if (asJson) { console.log(JSON.stringify(status, null, 2)); return 0 }
  if (status.run === null) {
    console.error(`no run recorded for ${agentId}`)
    return 3
  }
  const { run } = status
  console.log(`${agentId}: ${run.alive ? `running (pid ${run.pid})` : 'not running'}`)
  console.log(`  run       ${run.runId}`)
  console.log(`  started   ${run.startedAt}`)
  console.log(`  cwd       ${run.cwd}`)
  console.log(`  command   ${run.commandText}`)
  console.log(`  log       ${run.logPath}`)
  if (run.lastDocPath !== null) console.log(`  last msg  ${run.lastDocPath}`)
  if (run.endedAt !== null) console.log(`  ended     ${run.endedAt} (${run.endedReason ?? 'unknown'})`)
  if (run.stoppedAt !== null) console.log(`  stopped   ${run.stoppedAt}`)
  console.log(`  last event ${run.lastEventAt ?? 'none'} ${run.lastEventKind ?? ''}${
    run.lastEventText === null ? '' : `: ${run.lastEventText}`}`)
  console.log(`  turn      ${status.turnState ?? 'unset'}${status.turnStateAt === null ? '' : ` at ${status.turnStateAt}`}`)
  if (status.tail.length > 0) {
    console.log('  log tail:')
    for (const line of status.tail) console.log(`    ${line}`)
  }
  return 0
}

export function runSwarmCli(db: DatabaseSync, args: string[], defaultWorkspace: () => string): number {
  const [step, ...rest] = args
  // Every command may be the first one a fresh store sees: `enqueue` used to
  // fail with "no such column: workspace_id" until some `register` had widened
  // the agents table.
  if (step !== 'chronik') ensureSwarmOpsSchema(db)
  assertActiveSupervisorAttempt(db)
  const workspaceId = flag(rest, '--workspace') ?? defaultWorkspace()
  const asJson = rest.includes('--json')
  const pos = positionals(rest, VALUED)
  const byAgent = (process.env.PLUGBRAIN_AGENT ?? '').trim()

  switch (step) {
    case 'register': {
      const usage = 'plugbrain swarm register <agent> --surface <s> --account <label> [--key <resource>] [--model <m>] [--worktree <path>]...'
      const agentId = need(pos[0], usage)
      const surface = need(flag(rest, '--surface'), usage) as WorkerSurface
      if (!WORKER_SURFACES.includes(surface)) throw new AccessDenied(`unknown surface: ${surface} (${WORKER_SURFACES.join(', ')})`)
      registerSwarmAgent(db, {
        agentId,
        name: flag(rest, '--name') ?? agentId,
        model: flag(rest, '--model') ?? undefined,
        workspaceId,
        heartbeatTtlMs: WORKER_HEARTBEAT_TTL_MS,
      })
      const profile = registerWorkerProfile(db, {
        agentId,
        surface,
        account: need(flag(rest, '--account'), usage),
        quotaPool: flag(rest, '--quota-pool') ?? undefined,
        resourceKey: flag(rest, '--key') ?? undefined,
        model: flag(rest, '--model') ?? undefined,
        worktrees: flags(rest, '--worktree'),
        takeover: rest.includes('--takeover'),
      })
      if (asJson) console.log(JSON.stringify(profile, null, 2))
      else console.log(`registriert: ${profile.agentId} (${profile.surface}, ${profile.account}${profile.resourceKey ? `, Schlüssel ${profile.resourceKey}` : ''})`)
      return 0
    }
    case 'runner': {
      const usage = 'plugbrain swarm runner set <agent> --cmd <exe> [--model <m>] [--effort <e>] ' +
        '[--sandbox bypass|workspace-write|read-only|danger-full-access] [--search] [--args "<template>"] [--cwd <dir>] ' +
        '| plugbrain swarm runner show <agent>'
      const action = need(pos[0], usage)
      const agentId = need(pos[1], usage)
      if (action === 'show') {
        const profile = getRunnerProfile(db, agentId)
        if (profile === null) { console.error(`no runner profile for ${agentId}`); return 3 }
        if (asJson) console.log(JSON.stringify(profile, null, 2))
        else printRunnerProfile(profile)
        return 0
      }
      if (action !== 'set') throw new AccessDenied(`usage: ${usage}`)
      // `--args` is one string so the template can hold spaces; it is split here
      // rather than by a shell, which the Brain never involves.
      const argTemplate = flag(rest, '--args')
      const profile = setRunnerProfile(db, {
        agentId,
        cmd: need(flag(rest, '--cmd'), usage),
        args: argTemplate === null ? undefined : argTemplate.split(/\s+/).filter(token => token !== ''),
        model: flag(rest, '--model') ?? undefined,
        effort: flag(rest, '--effort') ?? undefined,
        sandbox: flag(rest, '--sandbox') ?? undefined,
        search: rest.includes('--search'),
        cwd: flag(rest, '--cwd') ?? undefined,
      })
      if (asJson) console.log(JSON.stringify(profile, null, 2))
      else printRunnerProfile(profile)
      return 0
    }
    case 'run': {
      const usage = 'plugbrain swarm run <agent> [--once|--status|--stop|--stop-supervisor] [--json]'
      const agentId = need(pos[0], usage)
      if (rest.includes('--supervisor-child')) throw new AccessDenied('supervisor child must use the internal async dispatch')
      if (!rest.includes('--once') && !rest.includes('--status') && !rest.includes('--stop') && !rest.includes('--stop-supervisor')) {
        const supervisor = startSupervisor(db, {
          workspaceId, agentId,
          idleMs: numberFlag(rest, '--idle-ms'),
          maxIdleChecks: numberFlag(rest, '--max-idle-checks'),
          maxAttempts: numberFlag(rest, '--max-attempts'),
          pollMs: numberFlag(rest, '--poll-ms'),
        })
        if (asJson) console.log(JSON.stringify(supervisor, null, 2))
        else console.log(`supervising ${agentId}: pid ${supervisor.pid} (${supervisor.supervisorId})`)
        return 0
      }
      if (rest.includes('--stop-supervisor')) {
        stopSupervisor(db, agentId)
        console.log(`supervisor stop requested for ${agentId}`)
        return 0
      }
      if (rest.includes('--status')) return printRunStatus(db, workspaceId, agentId, asJson)
      if (rest.includes('--stop')) {
        const run = stopWorkerRun(db, { agentId, workspaceId })
        // A worker that already ended its turn keeps that state; the stop only
        // pauses one that was still working.
        const turn = workerRunStatus(db, workspaceId, agentId).turnState
        if (asJson) { console.log(JSON.stringify({ ...run, turnState: turn }, null, 2)); return 0 }
        console.log(`stopped ${agentId} (pid ${run.pid ?? '?'}); turn ${turn ?? 'unset'}`)
        return 0
      }
      const run = startWorkerRun(db, { workspaceId, agentId })
      if (asJson) { console.log(JSON.stringify(run, null, 2)); return 0 }
      console.log(`started ${agentId}: pid ${run.pid ?? '?'} (${run.runId})`)
      console.log(`  cwd      ${run.cwd}`)
      console.log(`  command  ${run.commandText}`)
      console.log(`  log      ${run.logPath}`)
      console.log(`  prompt   ${run.promptPath ?? '-'}`)
      console.log('  the Brain watches it: plugbrain swarm run ' + agentId + ' --status')
      return 0
    }
    case 'turn': {
      const usage = 'plugbrain swarm turn <agent> start|end [--state needs-task|awaiting-commit|blocked|paused] [--summary <s>] [--claim] [--deliver <evidence>] [--repo <worktree>] [--review]'
      const agentId = need(pos[0], usage)
      const phase = need(pos[1], usage)
      if (phase !== 'start' && phase !== 'end') throw new AccessDenied(`usage: ${usage}`)
      const state = flag(rest, '--state') as TurnEndState | null
      if (state !== null && !TURN_END_STATES.includes(state)) throw new AccessDenied(`unknown state: ${state} (${TURN_END_STATES.join(', ')})`)
      const deliveryPath = flag(rest, '--deliver')
      let deliveryTaskId: string | null = null
      if (deliveryPath !== null) {
        const endState = state ?? 'needs-task'
        if (phase !== 'end' || (endState !== 'needs-task' && endState !== 'awaiting-commit')) {
          throw new AccessDenied('--deliver is only valid when ending with needs-task or awaiting-commit')
        }
        if (deliveryPath.trim() === '') throw new AccessDenied('deliver evidence path cannot be empty')
        deliveryTaskId = currentTaskForTurnDelivery(db, workspaceId, agentId)
      }
      const ping = recordTurn(db, {
        workspaceId, agentId, phase,
        state: state ?? undefined,
        summary: flag(rest, '--summary') ?? undefined,
        claimNext: rest.includes('--claim'),
      })
      let delivery: { taskId: string; evidence: string } | null = null
      if (deliveryPath !== null) {
        const task = deliverTaskAtTurnEnd(db, deliveryTaskId!, agentId, deliveryPath, flag(rest, '--summary') ?? undefined, {
          workspaceId,
          workspaceRoot: requireWorkspace(db, workspaceId).root,
          repoPath: flag(rest, '--repo') ?? undefined,
          reviewRequired: rest.includes('--review'),
        })
        delivery = { taskId: task.id, evidence: task.delivered_path ?? deliveryPath }
        ping.currentTask = null
      }
      if (asJson) console.log(JSON.stringify({ ...ping, ...(delivery === null ? {} : { delivery }) }, null, 2))
      else {
        printPing(ping)
        if (delivery) console.log(`  GELIEFERT ${delivery.taskId}: ${delivery.evidence}`)
      }
      return 0
    }
    case 'stop': {
      const usage = 'plugbrain swarm stop <agent|--all> [--owner] [--note <reason>] [--global]'
      const target = need(pos[0], usage)
      const owner = rest.includes('--owner')
      const global = rest.includes('--global')
      const note = need(flag(rest, '--note'), usage)
      if (byAgent === '') { console.error('refused: no sender — set PLUGBRAIN_AGENT'); return 2 }
      if (!owner) throw new AccessDenied('stop requires --owner for this card')
      if (target === '--all' || global) {
        const count = ownerStopGlobal(db, { workspaceId, by: byAgent, note })
        console.log(`global stop: ${count} agents paused`)
        if (asJson) console.log(JSON.stringify({ type: 'global', count, by: byAgent, note }, null, 2))
        return 0
      }
      const profile = ownerStopAgent(db, { workspaceId, agentId: target, by: byAgent, note })
      console.log(`owner-stopped: ${profile.agentId}`)
      if (asJson) console.log(JSON.stringify({ type: 'agent', agentId: profile.agentId, by: byAgent, note }, null, 2))
      return 0
    }
    case 'resume': {
      const usage = 'plugbrain swarm resume <agent|--all> [--global]'
      const target = need(pos[0], usage)
      const global = rest.includes('--global')
      if (byAgent === '') { console.error('refused: no sender — set PLUGBRAIN_AGENT'); return 2 }
      if (target === '--all' || global) {
        const count = ownerResumeGlobal(db, { workspaceId, by: byAgent })
        console.log(`global resume: ${count} agents resumed`)
        if (asJson) console.log(JSON.stringify({ type: 'global', count, by: byAgent }, null, 2))
        return 0
      }
      const profile = ownerResumeAgent(db, { workspaceId, agentId: target, by: byAgent })
      console.log(`owner-resumed: ${profile.agentId}`)
      if (asJson) console.log(JSON.stringify({ type: 'agent', agentId: profile.agentId, by: byAgent }, null, 2))
      return 0
    }
    case 'retire': {
      const usage = 'plugbrain swarm retire <agent> --note <reason>'
      const profile = retireWorker(db, { agentId: need(pos[0], usage), reason: need(flag(rest, '--note'), usage) })
      console.log(`abgemeldet: ${profile.agentId}`)
      return 0
    }
    case 'claim': {
      const usage = 'plugbrain swarm claim <agent> <path>... [--task <id>] [--ttl-min <n>]'
      const agentId = need(pos[0], usage)
      const paths = pos.slice(1)
      if (paths.length === 0) throw new AccessDenied(`usage: ${usage}`)
      const ttlMin = flag(rest, '--ttl-min')
      const result = acquireLease(db, workspaceId, {
        agentId, taskId: flag(rest, '--task') ?? `task-${agentId}`, paths, symbols: [], mode: 'write',
        ttlMs: ttlMin === null ? 4 * 60 * 60_000 : Number(ttlMin) * 60_000,
      })
      touchAgentContact(db, agentId)
      if (!result.acquired) {
        const holder = result.conflict?.holder
        console.error(`refused: ${result.conflict?.path ?? paths.join(', ')} gehört ${holder?.agentId ?? '?'} (${holder?.taskId ?? '?'}): ${result.conflict?.reason ?? ''}`)
        return 3
      }
      console.log(`Lease ${result.lease?.id}: ${paths.join(', ')} bis ${result.lease?.expiresAt}`)
      return 0
    }
    case 'release': {
      const usage = 'plugbrain swarm release <agent> [<path>...] [--task <id>]'
      const agentId = need(pos[0], usage)
      const paths = pos.slice(1)
      const result = releaseLease(db, {
        agentId, workspaceId, taskId: flag(rest, '--task') ?? undefined, paths: paths.length > 0 ? paths : undefined,
      })
      touchAgentContact(db, agentId)
      console.log(result.released ? `freigegeben: ${result.count} Lease(s)` : 'nichts freizugeben')
      return 0
    }
    case 'ack': {
      const usage = 'plugbrain swarm ack <agent> <messageId>'
      const agentId = need(pos[0], usage)
      const read = confirmDelivery(db, need(pos[1], usage), agentId)
      touchAgentContact(db, agentId)
      console.log(read ? 'quittiert' : 'nichts zu quittieren')
      return 0
    }
    case 'board': {
      const reaper = reapWorktrees(db, workspaceId)
      const settled = reconcileWorkerRuns(db, workspaceId).filter(event => event.reason === 'ended-without-turn-end')
      const board = agentsBoard(db, workspaceId, { gitStatus: rest.includes('--git') })
      const nextActions = getSwarmNextActions(db, workspaceId)
      const summary = {
        eligible: reaper.candidates.filter(row => row.eligible).length,
        retained: reaper.candidates.filter(row => !row.eligible).length,
        reasons: reaper.candidates.filter(row => !row.eligible).map(row => ({ path: row.path, reason: row.reason })),
        missing: reaper.missing,
      }
      if (rest.includes('--next')) {
        if (asJson) console.log(JSON.stringify(nextActions, null, 2))
        else printNextActions(nextActions)
      } else if (asJson) console.log(JSON.stringify({ ...board, nextActions, reaper: summary, settled }, null, 2))
      else {
        for (const event of settled) console.log(`!! ${event.summary.split('\n')[0]}`)
        printBoard(board, nextActions)
        console.log(`Reaper: ${summary.eligible} reapable, ${summary.retained} retained`)
        for (const row of summary.reasons) console.log(`  retained ${row.path}: ${row.reason}`)
        for (const row of reaper.missing) console.log(`  missing ${row.path}${row.quarantinedAt ? ` (quarantine: ${row.quarantinedAt})` : ''}`)
      }
      return 0
    }
    case 'reap': {
      const auto = flag(rest, '--auto')
      if (auto !== null) {
        if (auto !== 'on' && auto !== 'off') throw new AccessDenied('usage: plugbrain swarm reap --auto on|off')
        setReapAuto(db, workspaceId, auto === 'on')
        console.log(`reap.auto ${auto}`)
        return 0
      }
      const result = reapWorktrees(db, workspaceId, {
        repo: flag(rest, '--repo') ?? undefined, target: flag(rest, '--target') ?? undefined,
        apply: rest.includes('--apply'),
      })
      if (asJson) console.log(JSON.stringify(result, null, 2))
      else {
        for (const row of result.candidates) console.log(`${row.eligible ? 'reapable' : 'retained'} ${row.path}: ${row.reason}`)
        for (const row of result.removed) console.log(`removed ${row.path}; restore with: ${row.restoreCommand}`)
        for (const row of result.missing) console.log(`missing ${row.path}${row.quarantinedAt ? ` (quarantine: ${row.quarantinedAt})` : ''}`)
        if (result.pruneCommand) {
          console.log(`prune dry run only: ${result.pruneCommand}`)
          for (const line of result.pruneReport) console.log(`  ${line}`)
        }
      }
      return 0
    }
    case 'chronik': {
      const usage = 'plugbrain swarm chronik [--since <iso|2h>] [--json|--md]'
      const chronicle = buildSwarmChronicle(db, workspaceId, { since: flag(rest, '--since') ?? undefined })
      if (rest.includes('--json')) console.log(JSON.stringify(chronicle, null, 2))
      else if (rest.includes('--md') || !rest.includes('--json')) console.log(formatSwarmChronicleMarkdown(chronicle))
      else throw new AccessDenied(`usage: ${usage}`)
      return 0
    }
    case 'send': {
      const usage = 'plugbrain swarm send <agent> --subject <s> --body <b> [--from <agent>]'
      // The sender is the author of the message. Defaulting it to the integrator
      // made every message in the inbox look like it came from the integrator,
      // even when cx01, cx03 or nv03 wrote it. An unnamed sender is refused
      // rather than misattributed.
      const from = (flag(rest, '--from') ?? process.env.PLUGBRAIN_AGENT ?? '').trim()
      if (from === '') {
        console.error('refused: no sender — pass --from <agent> or set PLUGBRAIN_AGENT')
        return 2
      }
      ensureIntegrator(db, workspaceId, from)
      const message = sendMessage(db, {
        workspaceId, fromAgent: from, toAgent: need(pos[0], usage),
        subject: need(flag(rest, '--subject'), usage), body: need(flag(rest, '--body'), usage),
      })
      touchAgentContact(db, from)
      console.log(`gesendet ${message.id}`)
      return 0
    }
    case 'enqueue': {
      const usage = 'plugbrain swarm enqueue <title> [--body <b>] [--to <agent>] [--plan <M00>] [--by <agent>] [--after <taskId>]'
      const by = flag(rest, '--by') ?? INTEGRATOR
      const afterTaskId = flag(rest, '--after') ?? undefined
      ensureIntegrator(db, workspaceId, by)
      const title = need(pos.join(' '), usage)
      // A master task named in the title counts as the link too, so a planner
      // who writes "M12: …" does not have to repeat it as a flag.
      const planRef = flag(rest, '--plan') ?? PLAN_REF.exec(title)?.[1] ?? null
      const task = enqueueTask(db, workspaceId, {
        title, body: flag(rest, '--body') ?? '',
        addressedTo: flag(rest, '--to') ?? undefined, requestedBy: by, afterTaskId,
      })
      if (planRef !== null) setPlanRef(db, task.id, planRef)
      console.log(`eingereiht ${task.id}: ${task.title}${task.addressed_to ? ` → ${task.addressed_to}` : ''}` +
        (afterTaskId === undefined ? '' : `  nach ${afterTaskId}`) +
        (planRef === null ? '' : `  [${planRef}]`))
      return 0
    }
    case 'supersede': {
      const usage = 'plugbrain swarm supersede <task> [--by <task>] --note <reason>'
      const task = supersedeTask(db, workspaceId, need(pos[0], usage), {
        byAgent: (process.env.PLUGBRAIN_AGENT ?? INTEGRATOR).trim(),
        byTaskId: flag(rest, '--by') ?? undefined,
        note: need(flag(rest, '--note'), usage),
      })
      if (asJson) console.log(JSON.stringify(task, null, 2))
      else console.log(`superseded ${task.id}${task.superseded_by ? ` by ${task.superseded_by}` : ''}`)
      return 0
    }
    case 'reassign': {
      const usage = 'plugbrain swarm reassign <task> --to <agent>'
      const task = reassignTask(db, workspaceId, need(pos[0], usage), {
        byAgent: (process.env.PLUGBRAIN_AGENT ?? INTEGRATOR).trim(),
        addressedTo: need(flag(rest, '--to'), usage),
      })
      if (asJson) console.log(JSON.stringify(task, null, 2))
      else console.log(`reassigned ${task.id} → ${task.addressed_to}`)
      return 0
    }
    case 'priority': {
      const usage = 'plugbrain swarm priority <task> <n>'
      const priority = Number(need(pos[1], usage))
      const task = prioritizeTask(db, workspaceId, need(pos[0], usage), {
        byAgent: (process.env.PLUGBRAIN_AGENT ?? INTEGRATOR).trim(), priority,
      })
      if (asJson) console.log(JSON.stringify(task, null, 2))
      else console.log(`priority ${task.id}: ${task.priority}`)
      return 0
    }
    case 'deliver': {
      // The worker that holds a task hands in its candidate: the queue row
      // moves to `delivered` and points at the evidence. Acceptance is not
      // decided here — that is the review and the integrator's approval.
      const usage = 'plugbrain swarm deliver <agent> <taskId> --path <evidence> [--repo <worktree>] [--review]'
      const deliveredBy = need(pos[0], usage)
      const task = deliverTaskWithEvidence(db, need(pos[1], usage), deliveredBy, need(flag(rest, '--path'), usage), undefined, {
        workspaceId,
        workspaceRoot: requireWorkspace(db, workspaceId).root,
        repoPath: flag(rest, '--repo') ?? undefined,
        reviewRequired: rest.includes('--review'),
      })
      touchAgentContact(db, deliveredBy)
      console.log(`geliefert ${task.id}: ${task.title} → ${task.delivered_path}`)
      return 0
    }
    case 'wave-done': {
      const usage = 'plugbrain swarm wave-done <waveId> [--json]'
      const waveId = need(pos[0], usage)
      const manifestRows = db.prepare(`SELECT source, authority_ref, confidence, payload
        FROM trace_events WHERE workspace_id = ? AND type = 'wave.manifest'
        ORDER BY occurred_at DESC, id DESC`).all(workspaceId) as
        Array<{ source: string; authority_ref: string; confidence: string; payload: string }>
      let manifest: WaveManifestEvidence | null = null
      for (const row of manifestRows) {
        const payload = JSON.parse(row.payload) as Record<string, unknown>
        if (payload.waveId !== waveId) continue
        manifest = {
          source: row.source,
          authorityRef: row.authority_ref,
          confidence: row.confidence,
          waveId,
          taskIds: Array.isArray(payload.taskIds) ? payload.taskIds.filter((id): id is string => typeof id === 'string') : [],
        }
        break
      }
      const taskIds = manifest?.taskIds ?? []
      const evidence: WaveTaskEvidence[] = taskIds.map(taskId => {
        const task = db.prepare(`SELECT id, title, state, claimed_by FROM queue_tasks
          WHERE workspace_id = ? AND id = ?`).get(workspaceId, taskId) as
          { id: string; title: string; state: string; claimed_by: string | null } | undefined
        const delivery = db.prepare(`SELECT review_judgment, source_revision, reviewed_commit
          FROM queue_deliveries WHERE task_id = ?`).get(taskId) as
          { review_judgment: string | null; source_revision: string | null; reviewed_commit: string | null } | undefined
        const reviews = db.prepare(`SELECT source, agent_id, authority_ref, confidence, payload
          FROM trace_events WHERE workspace_id = ? AND task_id = ? AND type = 'review.completed'
          ORDER BY occurred_at DESC, id DESC`).all(workspaceId, taskId) as
          Array<{ source: string; agent_id: string | null; authority_ref: string; confidence: string; payload: string }>
        const integration = db.prepare(`SELECT source, authority_ref, confidence, payload
          FROM trace_events WHERE workspace_id = ? AND task_id = ? AND type = 'integration.accepted'
          ORDER BY occurred_at DESC, id DESC LIMIT 1`).get(workspaceId, taskId) as
          { source: string; authority_ref: string; confidence: string; payload: string } | undefined
        const ownerDecision = db.prepare(`SELECT source, authority_ref, confidence, payload
          FROM trace_events WHERE workspace_id = ? AND task_id = ? AND type = 'wave.owner-decision'
          ORDER BY occurred_at DESC, id DESC LIMIT 1`).get(workspaceId, taskId) as
          { source: string; authority_ref: string; confidence: string; payload: string } | undefined
        const integratedPayload = integration ? JSON.parse(integration.payload) as Record<string, unknown> : null
        const decisionPayload = ownerDecision ? JSON.parse(ownerDecision.payload) as Record<string, unknown> : null
        const independentReview = reviews.map(review => ({
          source: review.source,
          reviewerId: review.agent_id ?? '',
          authorityRef: review.authority_ref,
          confidence: review.confidence,
          payload: JSON.parse(review.payload) as Record<string, unknown>,
        })).find(review => review.reviewerId !== '' && review.reviewerId !== task?.claimed_by
          && review.payload.verdict === 'PASS' && review.payload.commit === delivery?.source_revision
          && review.confidence === 'authoritative' && review.authorityRef.trim() !== '')
        return {
          taskId,
          title: task?.title ?? '(unknown task)',
          state: task?.state ?? 'missing',
          claimedBy: task?.claimed_by ?? null,
          reviewJudgment: delivery?.review_judgment ?? null,
          sourceRevision: delivery?.source_revision ?? null,
          reviewedCommit: delivery?.reviewed_commit ?? null,
          independentReview: independentReview ? {
            source: independentReview.source,
            reviewerId: independentReview.reviewerId,
            authorityRef: independentReview.authorityRef,
            confidence: independentReview.confidence,
            judgment: String(independentReview.payload.verdict),
            commit: String(independentReview.payload.commit),
          } : null,
          integration: integration ? {
            source: integration.source,
            authorityRef: integration.authority_ref,
            confidence: integration.confidence,
            commit: typeof integratedPayload?.commit === 'string' ? integratedPayload.commit : null,
          } : null,
          ownerDecision: ownerDecision ? {
            source: ownerDecision.source,
            authorityRef: ownerDecision.authority_ref,
            confidence: ownerDecision.confidence,
            decision: typeof decisionPayload?.decision === 'string' ? decisionPayload.decision : '',
          } : null,
        }
      })
      ensureWaveDoneSchema(db)
      const report = recordWaveDone(db, workspaceId, waveId, manifest, evidence)
      if (asJson) console.log(JSON.stringify(report, null, 2))
      else {
        console.log(`${report.status} ${report.waveId}${report.alreadyRecorded ? ' (bereits gemeldet)' : ''}`)
        for (const blocker of report.blockers) console.log(`- ${blocker}`)
      }
      return report.status === 'DONE' ? 0 : 1
    }
    case 'approve': {
      const usage = 'plugbrain swarm approve <agent> [--note <n>] [--by <agent>]'
      const by = flag(rest, '--by') ?? INTEGRATOR
      ensureIntegrator(db, workspaceId, by)
      const message = approveCommit(db, { workspaceId, agentId: need(pos[0], usage), by, note: flag(rest, '--note') ?? undefined })
      console.log(`Commit freigegeben (${message.id})`)
      return 0
    }
    case 'resources': {
      const host = hostSnapshot()
      const quotas = listQuotas(db)
      const quotaPools = listQuotaPools(db)
      const admission = WORK_KINDS.map(kind => admitWork(kind, host))
      if (asJson) { console.log(JSON.stringify({ host, quotas, quotaPools, admission }, null, 2)); return 0 }
      for (const drive of host.drives) console.log(`${drive.root} ${(drive.freeBytes / GB).toFixed(1)} von ${(drive.totalBytes / GB).toFixed(0)} GB frei`)
      console.log(`RAM ${(host.memory.freeBytes / GB).toFixed(1)} von ${(host.memory.totalBytes / GB).toFixed(0)} GB frei`)
      for (const entry of admission) console.log(`  ${entry.kind.padEnd(8)} ${entry.allowed ? 'ok' : `NEIN: ${entry.reasons.join('; ')}`}`)
      for (const quota of quotas) {
        console.log(`  Kontingent ${quota.account}: ${quota.remaining} ${quota.unit}${quota.exhausted ? ' (erschöpft)' : ''}` +
          `${quota.resetsAt ? `, zurück ${quota.resetsAt}` : ''} · ${quota.updatedAt}`)
      }
      for (const pool of quotaPools) console.log(`  Quota-Pool ${pool.id}: concurrency=${pool.maxConcurrent}, rpm=${pool.maxRequestsPerMinute ?? 'unlimited'}${pool.blockedUntil ? `, bis ${pool.blockedUntil}` : ''}`)
      return 0
    }
    case 'quota': {
      const usage = 'plugbrain swarm quota <account> <remaining> <percent|credits|requests|rpm|tokens> [--resets <iso>] [--note <n>]'
      const reportedBy = flag(rest, '--by') ?? INTEGRATOR
      const report = reportQuota(db, {
        account: need(pos[0], usage), remaining: Number(need(pos[1], usage)), unit: need(pos[2], usage) as QuotaUnit,
        resetsAt: flag(rest, '--resets') ?? undefined, note: flag(rest, '--note') ?? undefined,
        reportedBy,
      })
      touchAgentContact(db, reportedBy)
      console.log(`${report.account}: ${report.remaining} ${report.unit}${report.exhausted ? ' (erschöpft)' : ''}`)
      return 0
    }
    case 'quota-pool': {
      const action = pos[0]
      if (action === 'show') {
        const pools = listQuotaPools(db)
        const summaries = pools.map(pool => quotaPoolSummary(db, pool.id)!).filter(Boolean)
        if (asJson) console.log(JSON.stringify(summaries, null, 2))
        else for (const pool of summaries) console.log(`${pool.id}: concurrency=${pool.maxConcurrent}, rpm=${pool.maxRequestsPerMinute ?? 'unlimited'}, active=${pool.activeReservations}, settled=${pool.settledAttempts}, usage=${pool.reportedUsage} across ${pool.attemptsWithUnknownUsage} unknown${pool.blockedUntil ? `, blocked until ${pool.blockedUntil}` : ''}`)
        return 0
      }
      if (action !== 'set') throw new AccessDenied('usage: plugbrain swarm quota-pool set <pool> --max-concurrent <n> [--rpm <n>] | quota-pool show')
      const usage = 'plugbrain swarm quota-pool set <pool> --max-concurrent <n> [--rpm <n>]'
      const pool = configureQuotaPool(db, { id: need(pos[1], usage), maxConcurrent: numberFlag(rest, '--max-concurrent') ?? 1,
        maxRequestsPerMinute: numberFlag(rest, '--rpm') ?? null })
      console.log(`${pool.id}: concurrency=${pool.maxConcurrent}, rpm=${pool.maxRequestsPerMinute ?? 'unlimited'}`)
      return 0
    }
    case 'admit': {
      const kind = need(pos[0], 'plugbrain swarm admit <kind>') as WorkKind
      if (!WORK_KINDS.includes(kind)) throw new AccessDenied(`unknown work kind: ${kind} (${WORK_KINDS.join(', ')})`)
      const admission = admitWork(kind, hostSnapshot())
      console.log(admission.allowed ? `ok: ${kind}` : `kein Platz für ${kind}: ${admission.reasons.join('; ')}`)
      return admission.allowed ? 0 : 5
    }
    case 'watchdog': {
      const usage = 'plugbrain swarm watchdog [--json] [--dry-run] | plugbrain swarm watchdog silent-after <minutes>'
      if (pos[0] === 'silent-after') {
        const settings = setSilentAfterMinutes(db, workspaceId, Number(need(pos[1], usage)))
        console.log(`Still-Erkennung: working ohne Kontakt ab ${settings.silentAfterMinutes} min`)
        return 0
      }
      const report = scanWatchdog(db, workspaceId, { alert: !rest.includes('--dry-run') })
      if (asJson) { console.log(JSON.stringify(report, null, 2)); return 0 }
      console.log(`Watchdog ${report.workspaceId} · still ab ${report.silentAfterMinutes} min · ` +
        `${report.silent.length} still · ${report.alerted.length} gemeldet · ${report.released.length} freigegeben`)
      for (const row of report.silent) {
        console.log(`- ${row.agentId} still seit ${row.minutes} min${row.alerted ? ' (jetzt gemeldet)' : ''}`)
      }
      for (const id of report.released) console.log(`  freigegeben: ${id}`)
      return 0
    }
    case 'review-pool': {
      const usage = 'plugbrain swarm review-pool set <agent>... | plugbrain swarm review-pool auto on|off | review-pool show'
      const verb = pos[0]
      if (verb === 'set') {
        const pool = setReviewPool(db, workspaceId, pos.slice(1))
        console.log(pool.length === 0 ? 'Reviewer: keine' : `Reviewer: ${pool.map(entry => entry.agentId).join(', ')}`)
        return 0
      }
      if (verb === 'auto') {
        const mode = need(pos[1], usage)
        if (mode !== 'on' && mode !== 'off') throw new AccessDenied(`usage: ${usage}`)
        const settings = setReviewAuto(db, workspaceId, mode === 'on')
        console.log(`Review-Routing: ${settings.reviewAuto ? 'an' : 'aus'}`)
        return 0
      }
      if (verb === 'show' || verb === undefined) {
        const settings = watchdogSettings(db, workspaceId)
        const pool = readReviewPool(db, workspaceId)
        if (asJson) { console.log(JSON.stringify({ ...settings, pool }, null, 2)); return 0 }
        console.log(`Review-Routing: ${settings.reviewAuto ? 'an' : 'aus'} · Still-Erkennung ab ${settings.silentAfterMinutes} min`)
        for (const entry of pool) {
          console.log(`- ${entry.agentId} (${entry.account ?? 'Konto unbekannt'}${entry.retired ? ', abgemeldet' : ''})`)
        }
        return 0
      }
      throw new AccessDenied(`usage: ${usage}`)
    }
    default:
      throw new AccessDenied('usage: plugbrain swarm <register|turn|ack|retire|claim|release|board|reap|chronik|send|enqueue|supersede|reassign|priority|deliver|wave-done|approve|resources|quota|admit|watchdog|review-pool|runner|run> …')
  }
}

/** Internal entry point used only by the detached supervisor child. */
export async function runSwarmSupervisorChild(
  db: DatabaseSync, args: string[], defaultWorkspace: () => string,
): Promise<number> {
  const [step, ...rest] = args
  const agentId = need(positionals(rest, VALUED)[0], 'internal supervisor needs an agent id')
  if (step !== 'run' || !rest.includes('--supervisor-child')) throw new AccessDenied('invalid internal supervisor invocation')
  const supervisorId = process.env.PLUGBRAIN_SUPERVISOR_ID
  if (!supervisorId) throw new AccessDenied('internal supervisor identity is missing')
  await runSupervisorLoop(db, {
    workspaceId: flag(rest, '--workspace') ?? defaultWorkspace(), agentId, supervisorId,
    idleMs: numberFlag(rest, '--idle-ms'),
    maxIdleChecks: numberFlag(rest, '--max-idle-checks'),
    maxAttempts: numberFlag(rest, '--max-attempts'),
    pollMs: numberFlag(rest, '--poll-ms'),
  })
  return 0
}
