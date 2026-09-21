/**
 * Run bookkeeping for the indexer: what is indexing right now, how far it has
 * got, and whether a second run may start.
 *
 * WHY THIS IS NOT IN THE DATABASE.  The indexer builds a whole generation in
 * one transaction, so it holds the write lock for the entire run. A progress
 * row inside that transaction would be invisible until the very end — which is
 * exactly the state this file exists to end. So the run lives on disk next to
 * the store, as one small JSON file per workspace, updated by an atomic
 * rename: a reader sees the previous complete state or the next complete
 * state, never half of either.
 *
 * WHAT IT IS FOR.  Two questions a user asks in the first minute of using this:
 * "is it doing anything?" (progress) and "can I start indexing too?" (lock).
 * Both have to be answerable from a SECOND process — the CLI while the server
 * runs — which is the other reason this cannot live in process memory.
 *
 * A quiet heartbeat alone does not prove that an owner died.  Long synchronous
 * classify/commit work can be unable to publish a tick for minutes while the
 * owning process still holds SQLite's write lock.  A quiet run is therefore
 * only recoverable once its owner is gone; otherwise it stays visibly quiet
 * and protected instead of being overwritten by a second writer.  Quiet is
 * never presented as forward progress.
 */
import {
  existsSync, mkdirSync, readdirSync, readFileSync, renameSync, unlinkSync, writeFileSync,
} from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { IndexResult } from './../indexer/scan.ts'

/** Where a run is in its life. Ordered as the work happens. */
export type RunPhase =
  | 'starting' | 'scan' | 'classify' | 'write' | 'resolve' | 'publish' | 'done' | 'failed'

export interface RunChanged {
  added: number
  modified: number
  renamed: number
  deleted: number
}

export interface RunState {
  workspaceId: string
  runId: string
  /** Who runs it: the process that owns the lock. */
  pid: number
  startedAt: string
  heartbeatAt: string
  phase: RunPhase
  mode: 'full' | 'incremental' | 'unchanged' | 'unknown'
  /** Files the walk has seen so far / the total once the walk is done. */
  scanned: number
  total: number
  /** Files already written into this generation. */
  processed: number
  changed: RunChanged
  symbols: number
  edges: number
  generation: number
  finishedAt: string | null
  /** null while it runs; true/false once it ended. */
  ok: boolean | null
  error: string | null
  /** The full result, published with the final state. */
  result: IndexResult | null
}

/**
 * How long without a heartbeat before a run counts as quiet, per phase.
 *
 * A heartbeat only happens when the indexer reports progress, and the indexer
 * is synchronous — during the final COMMIT nothing can report anything at all.
 * On a planet whose previous generation left a multi-gigabyte WAL that commit
 * includes a full checkpoint and takes minutes. Calling such a run dead after
 * two quiet minutes lets a second run start, which then fails with "database is
 * locked" and hides the state of the one that is still working.
 * So the window follows the phase: the quiet phases get the long one.  The
 * recorded owner still has to be absent before quiet becomes recoverable.
 */
export const STALE_AFTER_MS = 300_000

/** Quiet phases: publishing commits, and there is nothing to report while it does. */
export const STALE_AFTER_PUBLISH_MS = 20 * 60_000

export function staleAfterFor(phase: RunPhase): number {
  return phase === 'publish' || phase === 'done' || phase === 'failed'
    ? STALE_AFTER_PUBLISH_MS
    : STALE_AFTER_MS
}

export class IndexRunBusy extends Error {
  readonly state: RunState
  readonly heartbeatAgeMs: number

  constructor(state: RunState, heartbeatAgeMs: number) {
    super(
      `an index run for ${state.workspaceId} is already in progress ` +
      `(phase ${state.phase}, ${state.processed}/${state.total || '?'} files, ` +
      `pid ${state.pid}, started ${state.startedAt}, last sign of life ` +
      `${Math.round(heartbeatAgeMs / 1000)} s ago)`)
    this.name = 'IndexRunBusy'
    this.state = state
    this.heartbeatAgeMs = heartbeatAgeMs
  }
}

/**
 * Return whether a process still owns a run.
 *
 * `kill(pid, 0)` asks the operating system without delivering a signal.  An
 * access-denied answer is deliberately treated as alive: a process we cannot
 * inspect is not evidence that it died, and taking its SQLite writer lock
 * would be the unsafe direction.  Only an explicit ESRCH permits recovery.
 */
export function isProcessAlive(pid: number): boolean {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return (error as NodeJS.ErrnoException).code !== 'ESRCH'
  }
}

/** The store home, resolved the same way the CLI resolves it. */
export function storeHome(): string {
  return process.env.PLUGBRAIN_HOME ?? join(homedir(), '.plugbrain')
}

export function runDir(): string {
  return join(storeHome(), 'runs')
}

const safeWorkspaceId = (workspaceId: string): string =>
  workspaceId.replace(/[^a-zA-Z0-9._-]/g, '_')

const statePath = (workspaceId: string): string =>
  join(runDir(), `${safeWorkspaceId(workspaceId)}.json`)

// A `.pending` sidecar is deliberately not a `.json` file: listRunStates()
// enumerates the latter for user-visible run history, and a retained change is
// control state rather than a completed/running index run.
const pendingPath = (workspaceId: string): string =>
  join(runDir(), `${safeWorkspaceId(workspaceId)}.pending`)

/** A real filesystem change that arrived while another run held SQLite. */
export interface PendingReindex {
  workspaceId: string
  runId: string
  reason: string
  recordedAt: string
  /** A filesystem event arrived after this owner began its own replacement. */
  followUp: boolean
  /** Automatic post-owner attempts that ended in failure. */
  failureCount: number
}

/** Read one run state, or null when there is none or it is unreadable. */
export function readRunState(workspaceId: string): RunState | null {
  try {
    return JSON.parse(readFileSync(statePath(workspaceId), 'utf8')) as RunState
  } catch {
    return null
  }
}

/** Every known run state, newest heartbeat first. */
export function listRunStates(): RunState[] {
  let names: string[]
  try { names = readdirSync(runDir()) } catch { return [] }
  const states: RunState[] = []
  for (const name of names) {
    if (!name.endsWith('.json')) continue
    try {
      states.push(JSON.parse(readFileSync(join(runDir(), name), 'utf8')) as RunState)
    } catch { /* an unreadable state file is skipped, not invented */ }
  }
  return states.sort((a, b) => b.heartbeatAt.localeCompare(a.heartbeatAt))
}

/**
 * Write the state atomically: a reader never sees a half-written run.
 *
 * The rename is retried, because on Windows replacing a file that another
 * process is reading fails with EPERM often enough to matter — and a run state
 * is read EXACTLY while it is being written; that is the whole point of it. The
 * first attempt wins in the normal case and the loop costs nothing then.
 *
 * Only if every attempt fails does the write go straight to the target: a
 * briefly partial file beats a lost result, and a reader that cannot parse a
 * state treats it as unknown rather than inventing one.
 */
export function writeRunState(state: RunState): void {
  const target = statePath(state.workspaceId)
  mkdirSync(runDir(), { recursive: true })
  writeJsonAtomically(target, state)
}

/** Persist a dirty-while-busy marker so a daemon restart cannot lose it. */
export function writePendingReindex(pending: PendingReindex): void {
  mkdirSync(runDir(), { recursive: true })
  writeJsonAtomically(pendingPath(pending.workspaceId), pending)
}

/** Forget the marker only after its replacement run completed successfully. */
export function removePendingReindex(workspaceId: string): void {
  try { unlinkSync(pendingPath(workspaceId)) } catch { /* nothing to remove */ }
}

function writeJsonAtomically(target: string, value: unknown): void {
  const payload = JSON.stringify(value, null, 2)
  const tmp = `${target}.${process.pid}.tmp`
  for (let attempt = 0; attempt < 12; attempt += 1) {
    writeFileSync(tmp, payload, 'utf8')
    try {
      renameSync(tmp, target)
      return
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      // A reader holding the target open is not a failure of this write.
      if (code !== 'EPERM' && code !== 'EBUSY' && code !== 'EACCES') throw error
      pause(2 + attempt * 4)
    }
  }
  writeFileSync(target, payload, 'utf8')
  try { unlinkSync(tmp) } catch { /* best effort */ }
}

/** A short synchronous pause, for a retry that has to happen in place. */
function pause(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

export function removeRunState(workspaceId: string): void {
  try { unlinkSync(statePath(workspaceId)) } catch { /* nothing to remove */ }
}

export interface RunAppraisal {
  state: RunState | null
  /** A heartbeat recent enough that the process is still working. */
  running: boolean
  /** A run that ended (ok or failed) — kept so its result stays readable. */
  finished: boolean
  /** A run that claims to be active but has gone quiet. */
  stale: boolean
  /** The recorded owner is still present, even if its heartbeat is quiet. */
  ownerAlive: boolean
  /** Progress has gone quiet, but recovery may still be unsafe. */
  quiet: boolean
  /** The owner is absent, so replacing this quiet run is safe. */
  recoverable: boolean
  heartbeatAgeMs: number
  /** 0..1 while the total is known; null when it is not. */
  fraction: number | null
}

/** Read a retained filesystem change, if a previous daemon persisted one. */
export function readPendingReindex(workspaceId: string): PendingReindex | null {
  try {
    const pending = JSON.parse(readFileSync(pendingPath(workspaceId), 'utf8')) as PendingReindex
    if (pending.workspaceId !== workspaceId || typeof pending.runId !== 'string' ||
      typeof pending.reason !== 'string' || typeof pending.recordedAt !== 'string') return null
    // Markers written before `followUp` existed already mean "an event arrived
    // during this owner", so treating the missing field as true is conservative
    // and keeps an upgrade/restart from dropping that event.
    return {
      ...pending,
      followUp: pending.followUp !== false,
      failureCount: Number.isSafeInteger(pending.failureCount) && pending.failureCount >= 0
        ? pending.failureCount : 0,
    }
  } catch {
    return null
  }
}

export interface RunAppraisalOptions {
  now?: number
  staleAfterMs?: number
  /** Injectable only so regression tests never need to manufacture a PID. */
  isProcessAlive?: (pid: number) => boolean
}

/** Read the state and say honestly what it means. */
export function appraiseRun(
  workspaceId: string, options: RunAppraisalOptions = {},
): RunAppraisal {
  const now = options.now ?? Date.now()
  const state = readRunState(workspaceId)
  if (state === null) {
    return {
      state: null, running: false, finished: false, stale: false,
      ownerAlive: false, quiet: false, recoverable: false, heartbeatAgeMs: -1, fraction: null,
    }
  }
  const heartbeatAgeMs = now - Date.parse(state.heartbeatAt)
  const finished = state.finishedAt !== null
  const quiet = !finished && heartbeatAgeMs > (options.staleAfterMs ?? staleAfterFor(state.phase))
  const ownerAlive = !finished && (options.isProcessAlive ?? isProcessAlive)(state.pid)
  // A quiet file remains visibly stale, but only becomes recoverable after its
  // recorded owner is gone.  Otherwise a second run could clobber a long
  // commit/classify phase that still holds the database writer lock.
  const stale = quiet
  const recoverable = quiet && !ownerAlive
  const fraction = state.total > 0 ? Math.min(1, state.processed / state.total) : null
  return {
    state,
    // Quiet is not forward progress.  Callers get an explicit stale result
    // rather than a false "running" success while the lock stays protected.
    running: !finished && !quiet,
    finished,
    stale,
    ownerAlive,
    quiet,
    recoverable,
    heartbeatAgeMs,
    fraction,
  }
}

/** Take the lock for a run, or refuse with the reason it is already taken. */
export function beginRun(
  workspaceId: string,
  options: { full?: boolean } & RunAppraisalOptions = {},
): RunState {
  const appraisal = appraiseRun(workspaceId, options)
  // A fresh heartbeat or a quiet but still-live owner keeps the lock.  Only a
  // quiet state whose owner has exited is safe for a replacement run.
  if (appraisal.state !== null && !appraisal.finished && !appraisal.recoverable) {
    throw new IndexRunBusy(appraisal.state, appraisal.heartbeatAgeMs)
  }
  const now = new Date(options.now ?? Date.now()).toISOString()
  const state: RunState = {
    workspaceId,
    runId: `run-${randomUUID().slice(0, 12)}`,
    pid: process.pid,
    startedAt: now,
    heartbeatAt: now,
    phase: 'starting',
    mode: options.full === true ? 'full' : 'unknown',
    scanned: 0,
    total: 0,
    processed: 0,
    changed: { added: 0, modified: 0, renamed: 0, deleted: 0 },
    symbols: 0,
    edges: 0,
    generation: 0,
    finishedAt: null,
    ok: null,
    error: null,
    result: null,
  }
  writeRunState(state)
  return state
}

/** A heartbeat. Cheap enough to call often, safe to call in any phase. */
export function touchRun(state: RunState, patch: Partial<RunState> = {}): void {
  Object.assign(state, patch)
  state.heartbeatAt = new Date().toISOString()
}

/** Publish the finished run, keeping its result readable afterwards. */
export function finishRun(state: RunState, result: IndexResult): void {
  const now = new Date().toISOString()
  Object.assign(state, {
    phase: 'done' as RunPhase,
    mode: result.mode,
    scanned: result.scanned,
    processed: result.reparsed,
    total: result.scanned,
    changed: {
      added: result.changed.added, modified: result.changed.modified,
      renamed: result.changed.renamed, deleted: result.changed.deleted,
    },
    symbols: result.symbols,
    edges: result.edges,
    generation: result.generation,
    finishedAt: now,
    heartbeatAt: now,
    ok: true,
    error: null,
    result,
  })
  writeRunState(state)
}

/** Publish a failed run. The store itself is unchanged; say so. */
export function failRun(state: RunState, error: unknown): void {
  const now = new Date().toISOString()
  Object.assign(state, {
    phase: 'failed' as RunPhase,
    finishedAt: now,
    heartbeatAt: now,
    ok: false,
    error: String(error instanceof Error ? error.message : error).slice(0, 500),
  })
  writeRunState(state)
}

/** One line a human can read in a terminal. */
export function describeRun(appraisal: RunAppraisal): string {
  const { state } = appraisal
  if (state === null) return 'no index run recorded'
  if (appraisal.running) {
    const pct = appraisal.fraction === null ? '' : ` ${Math.round(appraisal.fraction * 100)}%`
    return `indexing ${state.workspaceId}: ${state.phase} ${state.processed}/${state.total || '?'}${pct}`
  }
  if (appraisal.stale) {
    if (appraisal.ownerAlive) {
      return `index run for ${state.workspaceId} went quiet in phase ${state.phase} ` +
        `(pid ${state.pid} is still alive; retaining its lock until that owner finishes or stops)`
    }
    return `index run for ${state.workspaceId} went quiet in phase ${state.phase} ` +
      `(pid ${state.pid}, last sign of life ${Math.round(appraisal.heartbeatAgeMs / 1000)} s ago)`
  }
  if (state.ok === true && state.result !== null) {
    return `last index run for ${state.workspaceId}: ${state.result.mode}, ` +
      `${state.result.files} files, ${state.result.symbols} symbols in ${state.result.ms} ms`
  }
  return `last index run for ${state.workspaceId} FAILED: ${state.error ?? 'unknown reason'}`
}

/** True when the directory holds nothing worth reporting. */
export const runDirExists = (): boolean => existsSync(runDir())
