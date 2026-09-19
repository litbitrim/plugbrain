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
import { indexPlanetWorkspace } from './planet.ts'
import { IndexRunBusy, startIndexRun } from './index/runner.ts'
import { isNeverIndexedDir } from './indexer/scan.ts'
import { storeHome } from './index/runs.ts'

/** Wait this long after the last change before re-indexing a workspace. */
const DEBOUNCE_MS = 4000
/** Never re-index the same workspace more often than this, however busy it is. */
const MIN_INTERVAL_MS = 20_000
/** Catch anything the OS watcher missed (network drives, editors that swap files). */
const SWEEP_MS = 5 * 60_000
/** How often to look for workspaces registered while this daemon was running. */
const DISCOVERY_MS = 15_000
/** When another run holds the lock, come back in this long. */
const BUSY_RETRY_MS = 10_000

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
  const abs = resolve(filename)
  const store = resolve(home)
  return abs === store || abs.startsWith(store + '\\') || abs.startsWith(store + '/')
}

export interface DaemonHandle {
  stop(): void
  /** Look again for registered workspaces, right now. */
  refresh(): void
  /** What the daemon is currently watching, for diagnostics. */
  watching(): Array<{ id: string; name: string; root: string }>
}

export interface DaemonOptions {
  /** The store file, so a run can happen in a worker instead of in line. */
  dbFile?: string | null
  log?: (line: string) => void
  /** Disable the background timers (tests drive `refresh`/`sweep` directly). */
  timers?: boolean
}

interface Tracked { id: string; name: string; root: string }

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
  let stopped = false

  const workspaces = (): Tracked[] =>
    db.prepare('SELECT id, name, root FROM workspaces').all() as unknown as Tracked[]

  const reindex = (ws: Tracked, reason: string): void => {
    if (stopped) return
    const since = Date.now() - (lastRun.get(ws.id) ?? 0)
    if (since < MIN_INTERVAL_MS) {
      // Too soon: re-arm rather than drop, or a busy workspace would go stale
      // exactly when it is changing fastest.
      schedule(ws, reason, MIN_INTERVAL_MS - since)
      return
    }
    lastRun.set(ws.id, Date.now())

    const report = (line: string): void => log(`[daemon] ${ws.name}: ${line}`)
    const dbFile = options.dbFile
    if (dbFile !== undefined && dbFile !== null && dbFile !== '') {
      try {
        const { done } = startIndexRun(ws.id, { dbFile })
        void done.then(outcome => {
          if (outcome.result === null) return
          report(`${reason} → ${outcome.result.scanned} scanned, ${outcome.result.files} files, ` +
            `${outcome.result.symbols} symbols, ${outcome.result.edges} edges (${outcome.result.ms} ms)`)
        }).catch(error => {
          report(`re-index FAILED — ${error instanceof Error ? error.message : String(error)}`)
        })
      } catch (error) {
        if (error instanceof IndexRunBusy) {
          // Someone else is already indexing this workspace — that is the
          // outcome we wanted, so wait rather than start a second run.
          report(`another run is in progress (${error.state.phase}), waiting`)
          schedule(ws, reason, BUSY_RETRY_MS)
          return
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

  const schedule = (ws: Tracked, reason: string, delay = DEBOUNCE_MS): void => {
    const existing = timers.get(ws.id)
    if (existing) clearTimeout(existing)
    timers.set(ws.id, setTimeout(() => { timers.delete(ws.id); reindex(ws, reason) }, delay))
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
          schedule(ws, `changed: ${filename ?? 'unknown'}`)
        })
        watcher.on('error', err => log(`[daemon] watch error on ${ws.name}: ${err.message}`))
        watchers.set(ws.id, watcher)
        log(`[daemon] watching ${ws.name} at ${ws.root}`)
      } catch (error) {
        log(`[daemon] cannot watch ${ws.name} — ${error instanceof Error ? error.message : String(error)}`)
      }
    }
    // A workspace that is no longer registered is no longer ours to watch.
    for (const [id, watcher] of [...watchers]) {
      if (ids.has(id)) continue
      try { watcher.close() } catch { /* already gone */ }
      watchers.delete(id)
      timers.delete(id)
      lastRun.delete(id)
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
      for (const watcher of watchers.values()) { try { watcher.close() } catch { /* already gone */ } }
      watchers.clear()
      if (running === handle) running = null
      log('[daemon] stopped')
    },
  }
  running = handle
  return handle
}
