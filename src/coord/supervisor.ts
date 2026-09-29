/**
 * Persistent, headless refill loop for one registered worker.
 *
 * The supervisor owns one task attempt at a time. It claims through the same
 * compare-and-set queue path as a human worker, starts the configured runner,
 * waits for its process to settle, and only retries a task after its previous
 * process has exited. A per-attempt token is passed to the worker and checked
 * on every subsequent `swarm` command, fencing a stale process from Brain
 * state changes after a newer attempt has started.
 */
import { randomUUID } from 'node:crypto'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireAgent, requireWorkspace } from '../access.ts'
import { claimNextTask } from '../queue.ts'
import { ensureIntegrator, sendMessage } from './inbox.ts'
import { getRunnerProfile, getWorkerRun, reconcileWorkerRuns, startWorkerRun } from './runner.ts'
import { configureQuotaPool, ensureQuotaPoolSchema, getQuotaPool, noteQuotaRateLimit, reserveQuota, settleQuota } from './quota-pools.ts'

const DEFAULT_IDLE_MS = 5 * 60_000
const DEFAULT_MAX_IDLE_CHECKS = 24
const DEFAULT_POLL_MS = 1000
const DEFAULT_MAX_ATTEMPTS = 2
const DEFAULT_QUOTA_BACKOFF_MS = 30 * 60_000
const MAX_QUOTA_BACKOFF_MS = 30 * 60_000

export type SupervisorFailure = 'clean' | 'quota' | 'auth' | 'crash'

/** Classify only explicit CLI errors. Quiet logs and arbitrary nonzero exits are crashes. */
export function classifySupervisorFailure(input: { exitCode: number | null; output: string }): SupervisorFailure {
  const text = input.output.toLowerCase()
  if (/usage limit|hit your .*limit|insufficient_quota|rate.?limit|retry-after|too many requests|\b429\b/.test(text)) return 'quota'
  if (/unauthorized|authentication failed|invalid api key|token expired|login required|http 401|http 403|\b401\b/.test(text)) return 'auth'
  return input.exitCode === 0 ? 'clean' : 'crash'
}

function quotaBackoffMs(output: string, now = Date.now()): number {
  const value = /retry-after\s*:\s*([^\r\n]+)/i.exec(output)?.[1]?.trim()
  if (value === undefined) return DEFAULT_QUOTA_BACKOFF_MS
  const seconds = Number(value)
  const delay = Number.isFinite(seconds) && seconds >= 0 ? seconds * 1000 : Date.parse(value) - now
  if (!Number.isFinite(delay)) return DEFAULT_QUOTA_BACKOFF_MS
  return Math.max(1000, Math.min(MAX_QUOTA_BACKOFF_MS, delay))
}

export function ensureSupervisorSchema(db: DatabaseSync): void {
  ensureQuotaPoolSchema(db)
  db.exec(`
CREATE TABLE IF NOT EXISTS worker_supervisors (
  agent_id TEXT PRIMARY KEY,
  supervisor_id TEXT NOT NULL,
  pid INTEGER,
  started_at TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  current_task_id TEXT,
  attempt INTEGER NOT NULL DEFAULT 0,
  last_failure TEXT,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS worker_task_attempts (
  task_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  attempt INTEGER NOT NULL,
  attempt_token TEXT NOT NULL,
  run_id TEXT,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  outcome TEXT,
  PRIMARY KEY(task_id, attempt)
);
`)
}

export interface StartSupervisorInput {
  workspaceId: string
  agentId: string
  /** Used by deterministic fake-worker tests; production values are clamped. */
  idleMs?: number
  maxIdleChecks?: number
  maxAttempts?: number
  pollMs?: number
}

function processAlive(pid: number | null): boolean {
  if (pid === null || !Number.isInteger(pid) || pid <= 0) return false
  try { process.kill(pid, 0); return true } catch { return false }
}

/** Start one detached supervisor process; an SQLite transaction prevents two refill loops per worker. */
export function startSupervisor(db: DatabaseSync, input: StartSupervisorInput): { supervisorId: string; pid: number } {
  if (process.platform !== 'win32') throw new AccessDenied('swarm run is not supported on this platform; Windows process-tree identity is required')
  ensureSupervisorSchema(db)
  const workspace = requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.agentId)
  if (getRunnerProfile(db, input.agentId) === null) {
    throw new AccessDenied(`no runner profile for ${input.agentId}; set one first with swarm runner set`)
  }
  const supervisorId = `sup-${randomUUID()}`
  const now = new Date().toISOString()
  db.exec('BEGIN IMMEDIATE')
  try {
    const current = db.prepare('SELECT supervisor_id, pid, active FROM worker_supervisors WHERE agent_id = ?')
      .get(input.agentId) as { supervisor_id: string; pid: number | null; active: number } | undefined
    if (current?.active === 1 && processAlive(current.pid)) {
      throw new AccessDenied(`${input.agentId} already has a live supervisor (pid ${current.pid})`)
    }
    db.prepare(`INSERT INTO worker_supervisors
      (agent_id, supervisor_id, pid, started_at, active, current_task_id, attempt, last_failure, updated_at)
      VALUES (?, ?, NULL, ?, 1, NULL, 0, NULL, ?)
      ON CONFLICT(agent_id) DO UPDATE SET supervisor_id = excluded.supervisor_id, pid = NULL,
        started_at = excluded.started_at, active = 1, current_task_id = NULL, attempt = 0,
        last_failure = NULL, updated_at = excluded.updated_at`)
      .run(input.agentId, supervisorId, now, now)

    const entry = process.argv[1]
    if (!entry) throw new AccessDenied('cannot locate the PlugBrain CLI entry point for detached supervisor')
    const args = ['--experimental-strip-types', '--no-warnings', entry, 'swarm', 'run', input.agentId, '--supervisor-child', '--workspace', input.workspaceId,
      '--idle-ms', String(input.idleMs ?? DEFAULT_IDLE_MS), '--max-idle-checks', String(input.maxIdleChecks ?? DEFAULT_MAX_IDLE_CHECKS),
      '--max-attempts', String(input.maxAttempts ?? DEFAULT_MAX_ATTEMPTS), '--poll-ms', String(input.pollMs ?? DEFAULT_POLL_MS)]
    const child = spawn(process.execPath, args, {
      cwd: workspace.root,
      detached: true,
      windowsHide: true,
      stdio: 'ignore',
      env: { ...process.env, PLUGBRAIN_SUPERVISOR_ID: supervisorId },
    })
    const pid = child.pid
    if (pid === undefined) throw new AccessDenied('could not start supervisor process')
    db.prepare('UPDATE worker_supervisors SET pid = ?, updated_at = ? WHERE agent_id = ? AND supervisor_id = ?')
      .run(pid, new Date().toISOString(), input.agentId, supervisorId)
    child.unref()
    db.exec('COMMIT')
    return { supervisorId, pid }
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

function supervisorOwns(db: DatabaseSync, agentId: string, supervisorId: string): boolean {
  const row = db.prepare('SELECT active, supervisor_id FROM worker_supervisors WHERE agent_id = ?').get(agentId) as
    { active: number; supervisor_id: string } | undefined
  return row?.active === 1 && row.supervisor_id === supervisorId
}

function setSupervisor(db: DatabaseSync, agentId: string, supervisorId: string, updates: {
  taskId?: string | null; attempt?: number; failure?: string | null; active?: boolean
}): void {
  const now = new Date().toISOString()
  db.prepare(`UPDATE worker_supervisors SET
    current_task_id = CASE WHEN ? = 1 THEN ? ELSE current_task_id END,
    attempt = COALESCE(?, attempt),
    last_failure = CASE WHEN ? = 1 THEN ? ELSE last_failure END,
    active = COALESCE(?, active), updated_at = ?
    WHERE agent_id = ? AND supervisor_id = ?`)
    .run(updates.taskId === undefined ? 0 : 1, updates.taskId ?? null, updates.attempt ?? null,
      updates.failure === undefined ? 0 : 1, updates.failure ?? null,
      updates.active === undefined ? null : updates.active ? 1 : 0,
      now, agentId, supervisorId)
}

function readRunOutput(run: { logPath: string } | null): string {
  if (!run) return ''
  try {
    const stderr = run.logPath.replace(/\.jsonl$/, '.stderr.log')
    return `${readFileSync(run.logPath, 'utf8')}\n${readFileSync(stderr, 'utf8')}`.slice(-64 * 1024)
  } catch { return '' }
}

function releaseTaskForRetry(db: DatabaseSync, taskId: string, agentId: string): boolean {
  db.exec('BEGIN IMMEDIATE')
  try {
    const result = db.prepare(`UPDATE queue_tasks SET state = 'pending', claimed_by = NULL, claimed_at = NULL,
      updated_at = ? WHERE id = ? AND state = 'claimed' AND claimed_by = ?`)
      .run(new Date().toISOString(), taskId, agentId)
    db.exec('COMMIT')
    return Number(result.changes) === 1
  } catch (error) { db.exec('ROLLBACK'); throw error }
}

function notifyLead(db: DatabaseSync, workspaceId: string, agentId: string, subject: string, body: string): void {
  ensureIntegrator(db, workspaceId)
  sendMessage(db, { workspaceId, fromAgent: agentId, toAgent: 'integrator', subject, body })
}

/** Fences every swarm command issued by a worker whose attempt has been superseded. */
export function assertActiveSupervisorAttempt(db: DatabaseSync): void {
  const attemptToken = process.env.PLUGBRAIN_ATTEMPT_TOKEN
  const agentId = process.env.PLUGBRAIN_SUPERVISED_AGENT
  if (!attemptToken || !agentId) return
  ensureSupervisorSchema(db)
  const active = db.prepare('SELECT run_id, ended_at, task_id, attempt_token FROM worker_runs WHERE agent_id = ?').get(agentId) as
    { run_id: string; ended_at: string | null; task_id: string | null; attempt_token: string | null } | undefined
  const attempt = db.prepare('SELECT run_id, ended_at FROM worker_task_attempts WHERE agent_id = ? AND attempt_token = ?')
    .get(agentId, attemptToken) as { run_id: string | null; ended_at: string | null } | undefined
  if (!attempt || attempt.ended_at !== null || active?.ended_at !== null ||
      (attempt.run_id === null ? active?.attempt_token !== attemptToken : attempt.run_id !== active?.run_id) ||
      active?.task_id === null) {
    throw new AccessDenied('stale supervisor attempt is fenced and may not change swarm state')
  }
}

/** Run loop, called only in the detached child started by `startSupervisor`. */
export async function runSupervisorLoop(db: DatabaseSync, input: StartSupervisorInput & { supervisorId: string }): Promise<void> {
  ensureSupervisorSchema(db)
  const idleMs = Math.max(50, Math.floor(input.idleMs ?? DEFAULT_IDLE_MS))
  const maxIdleChecks = Math.max(1, Math.floor(input.maxIdleChecks ?? DEFAULT_MAX_IDLE_CHECKS))
  const maxAttempts = Math.max(1, Math.min(5, Math.floor(input.maxAttempts ?? DEFAULT_MAX_ATTEMPTS)))
  const pollMs = Math.max(50, Math.floor(input.pollMs ?? DEFAULT_POLL_MS))
  let idleChecks = 0
  while (supervisorOwns(db, input.agentId, input.supervisorId)) {
    // A previous supervisor may have exited while its detached worker was still
    // alive. Let that process settle before claiming or launching another run.
    let running = getWorkerRun(db, input.agentId)
    while (running?.alive && supervisorOwns(db, input.agentId, input.supervisorId)) {
      await new Promise(resolve => setTimeout(resolve, pollMs))
      reconcileWorkerRuns(db, input.workspaceId, { notify: false })
      running = getWorkerRun(db, input.agentId)
    }
    if (!supervisorOwns(db, input.agentId, input.supervisorId)) break
    let task: ReturnType<typeof claimNextTask>
    try {
      const claimed = db.prepare(`SELECT id, workspace_id, title, body, addressed_to, requested_by, state, claimed_by,
        claimed_at, delivered_path, delivered_summary, created_at, updated_at FROM queue_tasks
        WHERE workspace_id = ? AND state = 'claimed' AND claimed_by = ? ORDER BY claimed_at ASC LIMIT 1`)
        .get(input.workspaceId, input.agentId)
      task = claimed === undefined
        ? claimNextTask(db, input.workspaceId, input.agentId)
        : claimed as unknown as NonNullable<ReturnType<typeof claimNextTask>>
    }
    catch (error) {
      setSupervisor(db, input.agentId, input.supervisorId, { failure: 'queue-error' })
      notifyLead(db, input.workspaceId, input.agentId, 'swarm run: queue unavailable', String(error))
      break
    }
    if (task === null) {
      idleChecks += 1
      if (idleChecks >= maxIdleChecks) break
      await new Promise(resolve => setTimeout(resolve, idleMs))
      continue
    }
    idleChecks = 0
    let attemptNumber = Number((db.prepare('SELECT COALESCE(MAX(attempt), 0) AS n FROM worker_task_attempts WHERE task_id = ?')
      .get(task.id) as { n: number }).n)
    let finished = false
    while (!finished && attemptNumber < maxAttempts && supervisorOwns(db, input.agentId, input.supervisorId)) {
      const profile = db.prepare('SELECT account, quota_pool FROM agents WHERE id = ?').get(input.agentId) as
        { account: string | null; quota_pool: string | null } | undefined
      const poolId = profile?.quota_pool?.trim() || profile?.account?.trim() || ''
      if (!poolId) throw new AccessDenied(`no quota pool or account is configured for ${input.agentId}`)
      if (!getQuotaPool(db, poolId)) configureQuotaPool(db, { id: poolId, maxConcurrent: 1 })
      const nextAttempt = attemptNumber + 1
      const reservation = reserveQuota(db, { poolId, attemptId: `${task.id}:${nextAttempt}` })
      if (!reservation.allowed) {
        const delay = reservation.reason === 'cooldown' && reservation.retryAt
          ? Math.max(pollMs, Math.min(MAX_QUOTA_BACKOFF_MS, Date.parse(reservation.retryAt) - Date.now()))
          : pollMs
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      attemptNumber = nextAttempt
      const attemptToken = `attempt-${randomUUID()}`
      const startedAt = new Date().toISOString()
      setSupervisor(db, input.agentId, input.supervisorId, { taskId: task.id, attempt: attemptNumber, failure: null })
      db.prepare(`INSERT INTO worker_task_attempts (task_id, agent_id, attempt, attempt_token, run_id, started_at, ended_at, outcome)
        VALUES (?, ?, ?, ?, NULL, ?, NULL, NULL)`)
        .run(task.id, input.agentId, attemptNumber, attemptToken, startedAt)
      try {
        const run = startWorkerRun(db, { workspaceId: input.workspaceId, agentId: input.agentId,
          task: { id: task.id, title: task.title, body: task.body }, attemptToken })
        db.prepare('UPDATE worker_task_attempts SET run_id = ? WHERE task_id = ? AND attempt = ?')
          .run(run.runId, task.id, attemptNumber)
        let current = run
        while (current.endedAt === null) {
          await new Promise(resolve => setTimeout(resolve, pollMs))
          reconcileWorkerRuns(db, input.workspaceId, { notify: false })
          current = getWorkerRun(db, input.agentId)!
        }
        const output = readRunOutput(current)
        const failure = classifySupervisorFailure({ exitCode: current.endedReason === 'turn-end' ? 0 : 1, output })
        if (failure === 'quota') {
          noteQuotaRateLimit(db, poolId, quotaBackoffMs(output))
        }
        settleQuota(db, { reservationId: reservation.reservation!.id, outcome: failure })
        const queue = db.prepare('SELECT state, claimed_by FROM queue_tasks WHERE id = ?').get(task.id) as
          { state: string; claimed_by: string | null } | undefined
        const endedTurn = db.prepare('SELECT turn_state FROM agents WHERE id = ?').get(input.agentId) as { turn_state: string | null }
        const delivered = queue?.state === 'delivered'
        const decision = !delivered && (failure === 'auth' || endedTurn.turn_state === 'awaiting-commit' || attemptNumber >= maxAttempts)
        db.prepare('UPDATE worker_task_attempts SET ended_at = ?, outcome = ? WHERE task_id = ? AND attempt = ?')
          .run(new Date().toISOString(), delivered ? 'delivered' : failure, task.id, attemptNumber)
        if (delivered) {
          finished = true
          setSupervisor(db, input.agentId, input.supervisorId, { taskId: null, failure: null })
          continue
        }
        if (decision) {
          const detail = `task ${task.id} (${task.title}) stopped after attempt ${attemptNumber}; outcome=${failure}; turn=${endedTurn.turn_state ?? 'unset'}.\n` +
            `Run log: ${current.logPath}. Inspect the local log before deciding whether to retry.`
          notifyLead(db, input.workspaceId, input.agentId, `swarm run: decision required for ${task.id}`, detail)
          setSupervisor(db, input.agentId, input.supervisorId, { failure, active: false })
          if (endedTurn.turn_state !== 'awaiting-commit' && queue?.state === 'claimed' && queue.claimed_by === input.agentId) {
            releaseTaskForRetry(db, task.id, input.agentId)
          }
          return
        }
        if (failure === 'quota') await new Promise(resolve => setTimeout(resolve, quotaBackoffMs(output)))
      } catch (error) {
        const message = String(error)
        settleQuota(db, { reservationId: reservation.reservation!.id, outcome: 'launch-error' })
        db.prepare('UPDATE worker_task_attempts SET ended_at = ?, outcome = ? WHERE task_id = ? AND attempt = ?')
          .run(new Date().toISOString(), 'launch-error', task.id, attemptNumber)
        if (attemptNumber >= maxAttempts) {
          notifyLead(db, input.workspaceId, input.agentId, `swarm run: could not start ${task.id}`, message)
          setSupervisor(db, input.agentId, input.supervisorId, { failure: 'launch-error', active: false })
          releaseTaskForRetry(db, task.id, input.agentId)
          return
        }
        await new Promise(resolve => setTimeout(resolve, pollMs))
      }
    }
  }
  setSupervisor(db, input.agentId, input.supervisorId, { active: false, taskId: null })
}

/** Stop is a DB request; the supervisor observes it at its next poll boundary. */
export function stopSupervisor(db: DatabaseSync, agentId: string): void {
  ensureSupervisorSchema(db)
  const result = db.prepare('UPDATE worker_supervisors SET active = 0, updated_at = ? WHERE agent_id = ? AND active = 1')
    .run(new Date().toISOString(), agentId)
  if (Number(result.changes) !== 1) throw new AccessDenied(`${agentId} has no active supervisor`)
}
