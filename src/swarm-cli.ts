/**
 * `plugbrain swarm …` — the fleet's check-in desk on the command line.
 *
 * Every worker, whatever hosts it (a Freebuff tab, AGY, the Codex app, Claude
 * Code), can run a command, so this is the one channel all of them share. It
 * works on the local store directly: a worker never needs the Core's HTTP key.
 *
 *   plugbrain swarm register <agent> --surface <s> --account <label> [--key <resource>]
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
 *   plugbrain swarm deliver <agent> <taskId> --path <evidence>   hand in a claimed task's candidate
 *   plugbrain swarm approve <agent> [--note <n>] [--by <agent>]
 *   plugbrain swarm resources [--json]
 *   plugbrain swarm quota <account> <remaining> <percent|credits|requests|rpm|tokens> [--resets <iso>] [--note <n>]
 *   plugbrain swarm admit <edit|test|index|build|install|worktree>   exit 0 = room, 5 = no room
 *   plugbrain swarm watchdog [--json] [--dry-run] | watchdog silent-after <minutes>
 *   plugbrain swarm review-pool set <agent>... | review-pool auto on|off | review-pool show
 *
 * Every command takes `--workspace <id>`; without it the single planet is used.
 */
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, registerAgent } from './access.ts'
import { deliverTask, enqueueTask } from './queue.ts'
import { PLAN_REF, setPlanRef } from './plan.ts'
import {
  acquireLease, admitWork, agentsBoard, approveCommit, confirmDelivery, ensureSwarmOpsSchema, hostSnapshot, listQuotas,
  readReviewPool, recordTurn, releaseLease,
  reapWorktrees, setReapAuto, synchronizeMissingWorktrees,
  registerSwarmAgent, registerWorkerProfile, reportQuota, retireWorker, scanWatchdog, sendMessage,
  setReviewAuto, setReviewPool, setSilentAfterMinutes, touchAgentContact, watchdogSettings,
  TURN_END_STATES, WORK_KINDS, WORKER_SURFACES,
  type QuotaUnit, type SwarmBoard, type TurnEndState, type TurnPing, type WorkKind, type WorkerSurface,
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
  '--workspace', '--surface', '--account', '--key', '--model', '--name', '--worktree', '--state', '--summary',
  '--subject', '--body', '--from', '--to', '--by', '--note', '--resets', '--task', '--ttl-min', '--plan', '--path',
  '--repo', '--target', '--auto', '--after',
]

function need(value: string | null | undefined, usage: string): string {
  if (value === null || value === undefined || value.trim() === '') throw new AccessDenied(`usage: ${usage}`)
  return value
}

function ensureIntegrator(db: DatabaseSync, workspaceId: string, id: string): void {
  registerAgent(db, id, id === INTEGRATOR ? 'Integrator' : id)
  db.prepare('UPDATE agents SET workspace_id = COALESCE(workspace_id, ?) WHERE id = ?').run(workspaceId, id)
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

function printBoard(board: SwarmBoard): void {
  const drives = board.host.drives.map(drive => `${drive.root} ${(drive.freeBytes / GB).toFixed(1)} GB frei`).join(', ')
  const ram = `${Math.round((board.host.memory.freeBytes / board.host.memory.totalBytes) * 100)} % RAM frei`
  console.log(`Fleet ${board.workspaceId} · ${board.agents.filter(row => !row.retired).length} Worker · ${drives} · ${ram}`)
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
  }
  for (const overlap of board.overlaps) console.log(`  ÜBERLAPPUNG ${overlap.worktree}: ${overlap.agents.join(', ')}`)
}

export function runSwarmCli(db: DatabaseSync, args: string[], defaultWorkspace: () => string): number {
  const [step, ...rest] = args
  // Every command may be the first one a fresh store sees: `enqueue` used to
  // fail with "no such column: workspace_id" until some `register` had widened
  // the agents table.
  ensureSwarmOpsSchema(db)
  const workspaceId = flag(rest, '--workspace') ?? defaultWorkspace()
  const asJson = rest.includes('--json')
  const pos = positionals(rest, VALUED)

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
        resourceKey: flag(rest, '--key') ?? undefined,
        model: flag(rest, '--model') ?? undefined,
        worktrees: flags(rest, '--worktree'),
        takeover: rest.includes('--takeover'),
      })
      if (asJson) console.log(JSON.stringify(profile, null, 2))
      else console.log(`registriert: ${profile.agentId} (${profile.surface}, ${profile.account}${profile.resourceKey ? `, Schlüssel ${profile.resourceKey}` : ''})`)
      return 0
    }
    case 'turn': {
      const usage = 'plugbrain swarm turn <agent> start|end [--state needs-task|awaiting-commit|blocked|paused] [--summary <s>] [--claim]'
      const agentId = need(pos[0], usage)
      const phase = need(pos[1], usage)
      if (phase !== 'start' && phase !== 'end') throw new AccessDenied(`usage: ${usage}`)
      const state = flag(rest, '--state') as TurnEndState | null
      if (state !== null && !TURN_END_STATES.includes(state)) throw new AccessDenied(`unknown state: ${state} (${TURN_END_STATES.join(', ')})`)
      const ping = recordTurn(db, {
        workspaceId, agentId, phase,
        state: state ?? undefined,
        summary: flag(rest, '--summary') ?? undefined,
        claimNext: rest.includes('--claim'),
      })
      if (asJson) console.log(JSON.stringify(ping, null, 2))
      else printPing(ping)
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
      const missing = synchronizeMissingWorktrees(db, workspaceId)
      const reaper = reapWorktrees(db, workspaceId)
      reaper.missing = missing
      const board = agentsBoard(db, workspaceId, { gitStatus: rest.includes('--git') })
      const summary = { eligible: reaper.candidates.filter(row => row.eligible).length,
        retained: reaper.candidates.filter(row => !row.eligible).length,
        reasons: reaper.candidates.filter(row => !row.eligible).map(row => ({ path: row.path, reason: row.reason })),
        missing: reaper.missing }
      if (asJson) console.log(JSON.stringify({ ...board, reaper: summary }, null, 2))
      else { printBoard(board); console.log(`Reaper: ${summary.eligible} reapable, ${summary.retained} retained`)
        for (const row of summary.reasons) console.log(`  retained ${row.path}: ${row.reason}`)
        for (const row of reaper.missing) console.log(`  missing ${row.path}${row.quarantinedAt ? ` (quarantine: ${row.quarantinedAt})` : ''}`) }
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
    case 'deliver': {
      // The worker that holds a task hands in its candidate: the queue row
      // moves to `delivered` and points at the evidence. Acceptance is not
      // decided here — that is the review and the integrator's approval.
      const usage = 'plugbrain swarm deliver <agent> <taskId> --path <evidence>'
      const deliveredBy = need(pos[0], usage)
      const task = deliverTask(db, need(pos[1], usage), deliveredBy, need(flag(rest, '--path'), usage))
      touchAgentContact(db, deliveredBy)
      console.log(`geliefert ${task.id}: ${task.title} → ${task.delivered_path}`)
      return 0
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
      const admission = WORK_KINDS.map(kind => admitWork(kind, host))
      if (asJson) { console.log(JSON.stringify({ host, quotas, admission }, null, 2)); return 0 }
      for (const drive of host.drives) console.log(`${drive.root} ${(drive.freeBytes / GB).toFixed(1)} von ${(drive.totalBytes / GB).toFixed(0)} GB frei`)
      console.log(`RAM ${(host.memory.freeBytes / GB).toFixed(1)} von ${(host.memory.totalBytes / GB).toFixed(0)} GB frei`)
      for (const entry of admission) console.log(`  ${entry.kind.padEnd(8)} ${entry.allowed ? 'ok' : `NEIN: ${entry.reasons.join('; ')}`}`)
      for (const quota of quotas) {
        console.log(`  Kontingent ${quota.account}: ${quota.remaining} ${quota.unit}${quota.exhausted ? ' (erschöpft)' : ''}` +
          `${quota.resetsAt ? `, zurück ${quota.resetsAt}` : ''} · ${quota.updatedAt}`)
      }
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
      throw new AccessDenied('usage: plugbrain swarm <register|turn|ack|retire|claim|release|board|reap|send|enqueue|deliver|approve|resources|quota|admit|watchdog|review-pool> …')
  }
}
