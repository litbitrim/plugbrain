/**
 * The maintenance daemon — invariant 6 ("after every agent turn the brain is
 * current") made real.
 *
 * A brain that is only correct when someone remembers to re-index is not a
 * system of record. This watches every registered workspace and re-indexes
 * what changed, so an agent attaching at any moment inherits the truth rather
 * than a snapshot from whenever a human last ran a command.
 *
 * Two deliberate properties:
 *  - Debounced. An agent turn writes many files in a burst; re-indexing on
 *    every event would spend the whole budget on the same workspace.
 *  - Honest about lag. `files.indexed_at` is NULL from the moment a file is
 *    written until the pass that re-reads it, and the briefing reports that
 *    count. The daemon shrinks the window; it never hides it.
 */
import { watch, type FSWatcher } from 'node:fs'
import type { DatabaseSync } from 'node:sqlite'
import { indexPlanetWorkspace } from './planet.ts'

/** Wait this long after the last change before re-indexing a workspace. */
const DEBOUNCE_MS = 4000
/** Never re-index the same workspace more often than this, however busy it is. */
const MIN_INTERVAL_MS = 20_000
/** Catch anything the OS watcher missed (network drives, editors that swap files). */
const SWEEP_MS = 5 * 60_000

const NOISE = /[\\/](node_modules|\.git|dist|build|out|coverage|\.plugbrain|\.codegraph|\.env)[\\/]?/

export interface DaemonHandle { stop(): void }

interface Tracked { id: string; name: string; root: string }

export function startDaemon(db: DatabaseSync, log: (line: string) => void = console.log): DaemonHandle {
  const watchers: FSWatcher[] = []
  const timers = new Map<string, NodeJS.Timeout>()
  const lastRun = new Map<string, number>()
  let stopped = false

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
    try {
      // A planet re-indexes through its checkout roots; a plain workspace
      // through its own. Same call, so the daemon cannot drift from the CLI.
      const r = indexPlanetWorkspace(db, ws.id)
      log(`[daemon] ${ws.name}: ${reason} → ${r.scanned} scanned, ${r.files} files, ${r.symbols} symbols, ${r.edges} edges (${r.ms} ms)`)
    } catch (error) {
      log(`[daemon] ${ws.name}: re-index FAILED — ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const schedule = (ws: Tracked, reason: string, delay = DEBOUNCE_MS): void => {
    const existing = timers.get(ws.id)
    if (existing) clearTimeout(existing)
    timers.set(ws.id, setTimeout(() => { timers.delete(ws.id); reindex(ws, reason) }, delay))
  }

  const tracked = db.prepare('SELECT id, name, root FROM workspaces').all() as Tracked[]
  for (const ws of tracked) {
    try {
      const watcher = watch(ws.root, { recursive: true }, (_event, filename) => {
        if (filename && NOISE.test(String(filename))) return
        schedule(ws, `changed: ${filename ?? 'unknown'}`)
      })
      watcher.on('error', err => log(`[daemon] watch error on ${ws.name}: ${err.message}`))
      watchers.push(watcher)
      log(`[daemon] watching ${ws.name} at ${ws.root}`)
    } catch (error) {
      log(`[daemon] cannot watch ${ws.name} — ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // The sweep is the safety net, and it only touches workspaces the ledger says
  // are actually behind.
  const sweep = setInterval(() => {
    if (stopped) return
    for (const ws of tracked) {
      const stale = (db.prepare(
        'SELECT COUNT(*) c FROM files WHERE workspace_id = ? AND indexed_at IS NULL')
        .get(ws.id) as { c: number }).c
      if (stale > 0) schedule(ws, `sweep found ${stale} stale file(s)`, 0)
    }
  }, SWEEP_MS)

  return {
    stop() {
      stopped = true
      clearInterval(sweep)
      for (const timer of timers.values()) clearTimeout(timer)
      timers.clear()
      for (const watcher of watchers) { try { watcher.close() } catch { /* already gone */ } }
      log('[daemon] stopped')
    },
  }
}
