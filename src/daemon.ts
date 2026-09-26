/**
 * The maintenance daemon — invariant 6 ("after every agent turn the brain is
 * current") made real.
 *
 * A brain that is only correct when someone remembers to re-index is not a
 * system of record. This watches every registered workspace and re-indexes
 * what changed, so an agent attaching at any moment inherits the truth rather
 * than a snapshot from whenever a human last ran a command.
 *
 * Four deliberate properties:
 *  - Debounced. An agent turn writes many files in a burst; re-indexing on
 *    every event would spend the whole budget on the same workspace.
 *  - Honest about lag. `files.indexed_at` is NULL from the moment a file is
 *    written until the pass that re-reads it, and the briefing reports that
 *    count. The daemon shrinks the window; it never hides it.
 *  - The workspace list is re-read, not remembered. A vault opened while the
 *    brain is already running is a normal thing to do, and a daemon that only
 *    ever watched what existed at its own start would silently never keep that
 *    vault up to date.
 *  - It does not index in its own event loop. On a real planet a run is
 *    minutes long; doing it in line would take the API down with it.
 */
import { watch, type FSWatcher } from 'node:fs'
import { resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { canonicalPath, indexPlanetWorkspace } from './planet.ts'
import { IndexRunBusy, IndexRunStartFailed, startIndexRun } from './index/runner.ts'
import { isNeverIndexedDir } from './indexer/scan.ts'
import {
  appraiseRun, readPendingReindex, removePendingReindex, storeHome, writePendingReindex,
} from './index/runs.ts'

/** Wait this long after the last change before re-indexing a workspace. */
const DEBOUNCE_MS = 4000
/** Never re-index the same workspace more often than this, however busy it is. */
const MIN_INTERVAL_MS = 20_000
/** Catch anything the OS watcher missed (network drives, editors that swap files). */
const SWEEP_MS = 5 * 60_000
/** How often to look for workspaces registered while this daemon was running. */
const DISCOVERY_MS = 15_000
/** When another run holds the lock, perform one deferred recheck. */
const BUSY_RETRY_MS = 10_000
/** Poll a retained dirty request without repeatedly probing SQLite's writer lock. */
const BUSY_MONITOR_MS = 30_000
/** Do not turn a persistent worker failure into an autonomous start loop. */
const MAX_PENDING_FAILURES = 2

/**
 * Is this watcher event about something the indexer would never read?
 *
 * The rule is the INDEXER's own `isNeverIndexedDir`, applied per path segment,
 * so the watcher and the walk can never disagree about what counts as noise.
 * The earlier version was a regular expression that required a separator IN
 * FRONT of the name, which quietly failed for the very first segment — and the
 * first segment is exactly where a brain store inside the planet lives
 * (`.plugbrain-test\...`). The consequence was a brain that re-indexed all
 * 183 000 files every time it wrote its own progress file: a loop that never
 * ended and blamed nobody.
 *
 * The store home is excluded explicitly as well, because it can be called
 * anything at all: wherever the brain keeps its data, writing that data is not
 * a change to the vault.
 */
export function isNoisePath(filename: string | null, home = storeHome()): boolean {
  if (filename === null) return false
  const segments = filename.split(/[\\/]+/).filter(segment => segment !== '')
  if (segments.some(segment => isNeverIndexedDir(segment))) return true
  const abs = canonicalPath(filename)
  const store = canonicalPath(home)
  return abs === store || abs.startsWith(store + '\\') || abs.startsWith(store + '/')
}

export interface DaemonHandle {
  stop(): void
  /** Look again for registered workspaces, right now. */
  refresh(): void
  /** What the daemon is currently watching, for diagnostics. */
  watching(): Array<{ id: string; name: string; root: string }>
}

export interface DaemonDelays {
  debounceMs: number
  minIntervalMs: number
  busyRetryMs: number
  busyMonitorMs: number
}

export type StartBackgroundIndexRun = (
  workspaceId: string,
  options: { dbFile: string },
) => Pick<ReturnType<typeof startIndexRun>, 'state' | 'done'>

export interface DaemonOptions {
  /** The store file, so a run can happen in a worker instead of in line. */
  dbFile?: string | null
  log?: (line: string) => void
  /** Disable the background timers (tests drive `refresh`/`sweep` directly). */
  timers?: boolean
  /** Test-only delay overrides; production retains the constants above. */
  delays?: Partial<DaemonDelays>
  /** Test-only background runner override; production always uses the worker. */
  startRun?: StartBackgroundIndexRun
}

interface Tracked { id: string; name: string; root: string }

interface BusyPending {
  /** The owner that had the write lock when this dirty request arrived. */
  runId: string
  /** Keep the real change/sweep reason until it has actually been indexed. */
  reason: string
  /** Exactly one start recheck is allowed for the same owner. */
  rechecked: boolean
  /** Another filesystem event arrived while this owner was already running. */
  followUp: boolean
  /** Automatic post-owner attempts that have failed for this retained change. */
  failureCount: number
}

/**
 * The daemon this process is running, so a registration that happens through
 * the HTTP API can be picked up immediately instead of at the next tick.
 */
let running: { refresh(): void } | null = null

/** Ask the running daemon to look for new workspaces now. */
export function refreshDaemon(): void {
  running?.refresh()
}

export function startDaemon(db: DatabaseSync, options: DaemonOptions = {}): DaemonHandle {
  const log = options.log ?? console.log
  const watchers = new Map<string, FSWatcher>()
  const timers = new Map<string, NodeJS.Timeout>()
  const lastRun = new Map<string, number>()
  // A particular holder gets one deferred start recheck.  The dirty request is
  // then retained and monitored, rather than either hammering SQLite forever
  // or forgetting a filesystem change that landed during that holder's scan.
  const busyPending = new Map<string, BusyPending>()
  const busyMonitors = new Map<string, NodeJS.Timeout>()
  const delays: DaemonDelays = {
    debounceMs: options.delays?.debounceMs ?? DEBOUNCE_MS,
    minIntervalMs: options.delays?.minIntervalMs ?? MIN_INTERVAL_MS,
    busyRetryMs: options.delays?.busyRetryMs ?? BUSY_RETRY_MS,
    busyMonitorMs: options.delays?.busyMonitorMs ?? BUSY_MONITOR_MS,
  }
  const startRun = options.startRun ?? startIndexRun
  let stopped = false

  const workspaces = (): Tracked[] =>
    db.prepare('SELECT id, name, root FROM workspaces').all() as unknown as Tracked[]

  const reindex = (ws: Tracked, reason: string): void => {
    if (stopped) return
    const since = Date.now() - (lastRun.get(ws.id) ?? 0)
    if (since < delays.minIntervalMs) {
      // Too soon: re-arm rather than drop, or a busy workspace would go stale
      // exactly when it is changing fastest.
      schedule(ws, reason, delays.minIntervalMs - since)
      return
    }
    lastRun.set(ws.id, Date.now())

    const report = (line: string): void => log(`[daemon] ${ws.name}: ${line}`)
    const dbFile = options.dbFile
    if (dbFile !== undefined && dbFile !== null && dbFile !== '') {
      try {
        const { state, done } = startRun(ws.id, { dbFile })
        const pending = busyPending.get(ws.id)
        if (pending !== undefined) {
          // Keep the marker through this run's outcome.  A worker can still
          // fail after it accepted the start, and deleting it at spawn would
          // lose the original filesystem event across a normal restart.
          pending.runId = state.runId
          pending.rechecked = true
          pending.followUp = false
          persistBusyPending(ws.id, pending)
          clearBusyMonitor(ws.id)
        }
        void done.then(outcome => {
          if (outcome.result !== null) {
            report(`${reason} → ${outcome.result.scanned} scanned, ${outcome.result.files} files, ` +
              `${outcome.result.symbols} symbols, ${outcome.result.edges} edges (${outcome.result.ms} ms)`)
          }
          completeOrResumePending(ws, state.runId, outcome.state.ok === true, report)
        }).catch(error => {
          report(`re-index FAILED — ${error instanceof Error ? error.message : String(error)}`)
          completeOrResumePending(ws, state.runId, false, report)
        })
      } catch (error) {
        if (error instanceof IndexRunBusy) {
          const existing = busyPending.get(ws.id)
          if (existing?.runId === error.state.runId) {
            // The deferred start recheck has already happened.  Keep the real
            // filesystem change until the owner reaches a terminal state, but
            // only monitor the state file from here — never hammer SQLite with
            // another 10-second start attempt for the same run id.
            existing.reason = reason
            existing.followUp = true
            existing.failureCount = 0
            persistBusyPending(ws.id, existing)
            if (!existing.rechecked) {
              existing.rechecked = true
              report(`another run is still in progress (${error.state.phase}, ${error.state.runId}); retaining this change until it ends`)
            } else {
              report(`another run is still in progress (${error.state.phase}, ${error.state.runId}); change already retained`)
            }
            monitorBusyOwner(ws)
            return
          }
          clearBusyPending(ws.id)
          const pending = {
            runId: error.state.runId,
            reason,
            rechecked: false,
            followUp: true,
            failureCount: 0,
          }
          busyPending.set(ws.id, pending)
          persistBusyPending(ws.id, pending)
          report(`another run is in progress (${error.state.phase}, ${error.state.runId}); rechecking once`)
          schedule(ws, reason, delays.busyRetryMs)
          return
        }
        if (error instanceof IndexRunStartFailed) {
          const pending = busyPending.get(ws.id)
          if (pending !== undefined) {
            // `beginRun` acquired and terminally failed this new run before
            // returning from startIndexRun.  Point the retained change at the
            // terminal replacement so it follows the same bounded recovery
            // path as an asynchronously failed worker.
            pending.runId = error.state.runId
            pending.rechecked = true
            pending.followUp = false
            persistBusyPending(ws.id, pending)
            report(`re-index FAILED — ${error.message}`)
            completeOrResumePending(ws, error.state.runId, false, report)
            return
          }
        }
        report(`re-index FAILED — ${error instanceof Error ? error.message : String(error)}`)
      }
      return
    }

    try {
      // No store path configured: index in line. Correct, just not concurrent.
      const r = indexPlanetWorkspace(db, ws.id)
      report(`${reason} → ${r.scanned} scanned, ${r.files} files, ${r.symbols} symbols, ${r.edges} edges (${r.ms} ms)`)
    } catch (error) {
      report(`re-index FAILED — ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const schedule = (ws: Tracked, reason: string, delay = delays.debounceMs): void => {
    const existing = timers.get(ws.id)
    if (existing) clearTimeout(existing)
    timers.set(ws.id, setTimeout(() => { timers.delete(ws.id); reindex(ws, reason) }, delay))
  }

  const clearBusyMonitor = (workspaceId: string): void => {
    const timer = busyMonitors.get(workspaceId)
    if (timer) clearTimeout(timer)
    busyMonitors.delete(workspaceId)
  }

  const clearBusyPending = (workspaceId: string, forget = false): void => {
    busyPending.delete(workspaceId)
    clearBusyMonitor(workspaceId)
    if (forget) removePendingReindex(workspaceId)
  }

  const persistBusyPending = (workspaceId: string, pending: BusyPending): void => {
    writePendingReindex({
      workspaceId,
      runId: pending.runId,
      reason: pending.reason,
      recordedAt: new Date().toISOString(),
      followUp: pending.followUp,
      failureCount: pending.failureCount,
    })
  }

  const resumePendingAfterOwner = (ws: Tracked, ownerRunId: string): void => {
    const pending = busyPending.get(ws.id)
    if (pending?.runId !== ownerRunId) return
    // Keep the durable marker through the scheduled replacement's successful
    // completion; a normal restart or worker failure must still recover the
    // filesystem change that arrived during the previous run.
    clearBusyMonitor(ws.id)
    schedule(ws, pending.reason, 0)
  }

  const completeOrResumePending = (
    ws: Tracked, ownerRunId: string, succeeded: boolean, report: (line: string) => void,
  ): void => {
    const pending = busyPending.get(ws.id)
    if (pending?.runId !== ownerRunId) return
    if (succeeded && !pending.followUp) {
      clearBusyPending(ws.id, true)
      return
    }
    if (!succeeded) {
      pending.failureCount += 1
      persistBusyPending(ws.id, pending)
      if (pending.failureCount >= MAX_PENDING_FAILURES) {
        report(`re-index remains pending after ${pending.failureCount} failed recovery attempts; waiting for a new change or explicit re-index`)
        clearBusyMonitor(ws.id)
        return
      }
    }
    // A failure leaves the durable marker in place, and a new event that
    // arrived while this owner ran gets its own follow-up pass.
    resumePendingAfterOwner(ws, ownerRunId)
  }

  const monitorBusyOwner = (ws: Tracked, immediate = false): void => {
    if (stopped || busyMonitors.has(ws.id)) return
    const pending = busyPending.get(ws.id)
    if (pending === undefined) return

    const observe = (): void => {
      busyMonitors.delete(ws.id)
      if (stopped) return
      const current = busyPending.get(ws.id)
      if (current === undefined) return
      const appraisal = appraiseRun(ws.id)
      // The holder either completed, disappeared, or was replaced by another
      // owner.  In all three cases, retry the retained change through normal
      // locking rules; it is never silently lost.
      if (appraisal.state === null || appraisal.state.runId !== current.runId ||
        appraisal.finished || appraisal.recoverable) {
        if (current.failureCount >= MAX_PENDING_FAILURES && appraisal.finished &&
          appraisal.state?.runId === current.runId && appraisal.state.ok === false) {
          log(`[daemon] ${ws.name}: retained change is paused after ${current.failureCount} failed recovery attempts`)
          return
        }
        clearBusyMonitor(ws.id)
        schedule(ws, current.reason, 0)
        return
      }
      busyMonitors.set(ws.id, setTimeout(observe, delays.busyMonitorMs))
    }

    if (immediate) observe()
    else busyMonitors.set(ws.id, setTimeout(observe, delays.busyMonitorMs))
  }

  const restoreBusyPending = (ws: Tracked): void => {
    if (busyPending.has(ws.id)) return
    const saved = readPendingReindex(ws.id)
    if (saved === null) return
    // A restart may happen before the one allowed recheck.  Do not turn that
    // into a new immediate start attempt; observe the recorded owner first and
    // preserve the marker until normal locking says a replacement is safe.
    busyPending.set(ws.id, {
      runId: saved.runId,
      reason: saved.reason,
      rechecked: true,
      followUp: saved.followUp,
      failureCount: saved.failureCount,
    })
    monitorBusyOwner(ws, true)
  }

  const list = (): Tracked[] => {
    try { return workspaces() } catch { return [] }
  }

  const refresh = (): void => {
    if (stopped) return
    const known = list()
    const ids = new Set(known.map(ws => ws.id))
    for (const ws of known) {
      if (watchers.has(ws.id)) continue
      try {
        const watcher = watch(ws.root, { recursive: true }, (_event, filename) => {
          if (isNoisePath(filename === null ? null : String(filename))) return
          const reason = `changed: ${filename ?? 'unknown'}`
          const pending = busyPending.get(ws.id)
          if (pending !== undefined) {
            // This event may land after a replacement worker has snapshotted
            // disk but before its debounced callback runs.  Record it before
            // scheduling so a successful replacement or normal daemon restart
            // cannot erase the only evidence that a follow-up pass is needed.
            pending.reason = reason
            pending.followUp = true
            pending.failureCount = 0
            persistBusyPending(ws.id, pending)
          }
          schedule(ws, reason)
        })
        watcher.on('error', err => log(`[daemon] watch error on ${ws.name}: ${err.message}`))
        watchers.set(ws.id, watcher)
        log(`[daemon] watching ${ws.name} at ${ws.root}`)
      } catch (error) {
        log(`[daemon] cannot watch ${ws.name} — ${error instanceof Error ? error.message : String(error)}`)
      }
      restoreBusyPending(ws)
    }
    // A workspace that is no longer registered is no longer ours to watch.
    for (const [id, watcher] of [...watchers]) {
      if (ids.has(id)) continue
      try { watcher.close() } catch { /* already gone */ }
      watchers.delete(id)
      timers.delete(id)
      lastRun.delete(id)
      clearBusyPending(id)
    }
  }

  const sweep = (): void => {
    if (stopped) return
    refresh()
    for (const ws of list()) {
      const stale = (db.prepare(
        'SELECT COUNT(*) c FROM files WHERE workspace_id = ? AND indexed_at IS NULL')
        .get(ws.id) as { c: number }).c
      if (stale > 0) schedule(ws, `sweep found ${stale} stale file(s)`, 0)
    }
  }

  refresh()
  const sweepTimer = options.timers === false ? null : setInterval(sweep, SWEEP_MS)
  const discoverTimer = options.timers === false ? null : setInterval(refresh, DISCOVERY_MS)
  const handle: DaemonHandle = {
    refresh,
    watching: () => list()
      .filter(ws => watchers.has(ws.id))
      .map(ws => ({ id: ws.id, name: ws.name, root: ws.root })),
    stop() {
      stopped = true
      if (sweepTimer !== null) clearInterval(sweepTimer)
      if (discoverTimer !== null) clearInterval(discoverTimer)
      for (const timer of timers.values()) clearTimeout(timer)
      timers.clear()
      for (const timer of busyMonitors.values()) clearTimeout(timer)
      busyMonitors.clear()
      busyPending.clear()
      for (const watcher of watchers.values()) { try { watcher.close() } catch { /* already gone */ } }
      watchers.clear()
      if (running === handle) running = null
      log('[daemon] stopped')
    },
  }
  running = handle
  return handle
}
