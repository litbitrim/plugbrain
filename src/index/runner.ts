/**
 * Index runs: the lock, the progress, and the two ways to execute one.
 *
 *   runIndexInProcess — for the CLI, where blocking IS the command.
 *   startIndexRun    — for the server, where blocking the event loop means the
 *                      vault goes dark for the length of the run.
 *
 * Both take the same lock first (`beginRun`), so a second caller gets an honest
 * "already running since …, phase …, 40 % done" instead of silently scanning
 * the same 150 000 files a second time.
 */
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Worker, type WorkerOptions } from 'node:worker_threads'
import type { DatabaseSync } from 'node:sqlite'
import { indexPlanetWorkspace } from '../planet.ts'
import type { IndexProgress } from '../indexer/index.ts'
import type { IndexResult } from '../indexer/scan.ts'
import {
  beginRun, failRun, finishRun, readRunState, touchRun, writeRunState, IndexRunBusy,
  type RunState,
} from './runs.ts'

export { IndexRunBusy }
export type { RunState }

/**
 * Where the worker entry can live, in the order it is looked for.
 *
 * The bundled product and the TypeScript source need different files, and the
 * URL is resolved against `import.meta.url`, which points at `dist/plugbrain.mjs`
 * in a build and at `src/index/runner.ts` in a checkout. The first candidate is
 * the BUNDLED worker (build-standalone.mjs emits it), the last one is the source
 * file. Without this list a packaged Core built its runs against a path that was
 * never produced — `Cannot find module …\dist\worker.ts` — which is a run that
 * silently does nothing while the product looks healthy.
 */
export const WORKER_CANDIDATES = ['worker.mjs', 'worker.js', 'worker.ts'] as const

export interface WorkerResolution {
  /** The worker entry to run, or null when no candidate exists. */
  url: URL | null
  /** Every path that was looked at, so a refusal can name them all. */
  tried: string[]
}

/**
 * Find the index worker. `$PLUGBRAIN_WORKER` wins, then the candidates beside
 * this module. Pure filesystem probing: nothing is constructed or executed here,
 * so the caller can refuse BEFORE it takes the run lock.
 */
export function resolveIndexWorker(override = process.env.PLUGBRAIN_WORKER): WorkerResolution {
  const tried: string[] = []
  const named = override?.trim()
  if (named !== undefined && named !== '') {
    const url = new URL(`file://${named.replace(/\\/g, '/')}`)
    tried.push(named)
    if (existsSync(fileURLToPath(url))) return { url, tried }
  }
  for (const candidate of WORKER_CANDIDATES) {
    const url = new URL(`./${candidate}`, import.meta.url)
    const path = fileURLToPath(url)
    tried.push(path)
    if (existsSync(path)) return { url, tried }
  }
  return { url: null, tried }
}

/**
 * No worker entry could be found, so no run may be started in one.
 *
 * This is deliberately NOT the same answer as "the run failed": it is a
 * packaging fault, nothing was attempted, and the lock was never taken. A
 * caller must be able to tell the two apart, or a broken payload looks like a
 * busy brain.
 */
export class IndexWorkerUnavailable extends Error {
  readonly tried: string[]

  constructor(tried: string[]) {
    super(
      'index worker not found: no background indexer is packaged next to this build\n' +
      tried.map(path => `  looked for ${path}`).join('\n'),
    )
    this.name = 'IndexWorkerUnavailable'
    this.tried = tried
  }
}

/** How often a running index rewrites its state file. */
export const DEFAULT_THROTTLE_MS = 400

export interface RunOptions {
  full?: boolean
  /** The store file. Without it a worker cannot open its own connection. */
  dbFile?: string
  throttleMs?: number
  /**
   * A caller-chosen job name. A repeat with the same key must not start a
   * second run: the route is idempotent, and the key is written into the run
   * state so the answer survives a restart.
   */
  idempotencyKey?: string
  /** Where the worker entry is, when it is not the packaged default. */
  workerPath?: string
  /**
   * A resolution the caller already made, so a test (or an embedder) can state
   * what the platform found instead of re-probing the filesystem.
   */
  workerResolution?: WorkerResolution
  /** A second listener, for a caller that wants to print progress as it runs. */
  onProgress?: IndexProgress
  /** Test seam for a synchronous worker-construction failure. */
  workerFactory?: (filename: URL, options: WorkerOptions) => Worker
}

export interface RunOutcome {
  state: RunState
  result: IndexResult | null
}

/** A worker could not be constructed after this run acquired its lock. */
export class IndexRunStartFailed extends Error {
  readonly state: RunState

  constructor(state: RunState, cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause))
    this.name = 'IndexRunStartFailed'
    this.state = state
  }
}

/**
 * Copy a tick onto the run state and write it out.
 *
 * Shared by both execution paths so the CLI and the server cannot report
 * different progress for the same run.
 */
function publishTick(
  state: RunState,
  tick: Parameters<NonNullable<Parameters<typeof indexPlanetWorkspace>[2]['onProgress']>>[0],
): void {
  Object.assign(state, {
    phase: tick.phase,
    mode: tick.mode,
    scanned: tick.scanned,
    total: tick.total,
    processed: tick.processed,
    generation: tick.generation,
  })
  if (tick.symbols !== null) state.symbols = tick.symbols
  if (tick.edges !== null) state.edges = tick.edges
  touchRun(state)
  writeRunState(state)
}

/** Index in THIS process, reporting to the state file as it goes. */
export function runIndexInProcess(
  db: DatabaseSync, workspaceId: string, options: RunOptions = {},
): IndexResult {
  const state = beginRun(workspaceId, { ...(options.full === true ? { full: true } : {}) })
  const throttleMs = options.throttleMs ?? DEFAULT_THROTTLE_MS
  let lastWritten = 0
  try {
    const result = indexPlanetWorkspace(db, workspaceId, {
      ...(options.full === true ? { full: true } : {}),
      onProgress: tick => {
        options.onProgress?.(tick)
        const now = Date.now()
        if (now - lastWritten < throttleMs) return
        lastWritten = now
        publishTick(state, tick)
      },
    })
    finishRun(state, result)
    reclaimWal(db)
    return result
  } catch (error) {
    failRun(state, error)
    throw error
  }
}

/**
 * Start an index run in a worker thread and return as soon as it is running.
 *
 * The returned promise resolves when the run ends. A caller that must not wait
 * (an HTTP handler) can ignore it: the outcome, success or failure, is in the
 * run state either way, and a failure is never silent.
 */
export function startIndexRun(
  workspaceId: string, options: RunOptions & { dbFile: string },
): { state: RunState; done: Promise<RunOutcome> } {
  // Resolve the worker BEFORE the lock is taken: a missing payload must not
  // leave a run state behind that a later caller mistakes for a real run.
  // An injected factory is a test seam and supplies its own worker.
  const resolution = options.workerResolution ?? (options.workerFactory !== undefined
    ? { url: new URL('./worker.ts', import.meta.url), tried: [] as string[] }
    : resolveIndexWorker(options.workerPath))
  if (resolution.url === null) throw new IndexWorkerUnavailable(resolution.tried)

  const state = beginRun(workspaceId, {
    ...(options.full === true ? { full: true } : {}),
    ...(options.idempotencyKey === undefined || options.idempotencyKey === ''
      ? {} : { idempotencyKey: options.idempotencyKey }),
  })
  const workerOptions: WorkerOptions = {
    workerData: {
      workspaceId,
      dbFile: options.dbFile,
      full: options.full === true,
      state,
      throttleMs: options.throttleMs ?? DEFAULT_THROTTLE_MS,
    },
  }
  let worker: Worker
  try {
    worker = (options.workerFactory ?? ((filename, config) => new Worker(filename, config)))(
      resolution.url, workerOptions,
    )
  } catch (error) {
    // The state is written before constructing the worker so competing starts
    // cannot race.  Construction can still throw synchronously (for example a
    // loader or resource failure); terminally record that case or this live
    // daemon PID would retain a quiet lock forever.
    failRun(state, error)
    throw new IndexRunStartFailed(state, error)
  }

  const done = new Promise<RunOutcome>((resolve, reject) => {
    // A crash of the worker THREAD itself (a load error, an out-of-memory kill)
    // produces no outcome, so it has to be caught here; everything the run
    // itself produces is written to the state file by the worker.
    let crash: string | null = null
    worker.on('error', error => { crash = error.message })
    worker.on('exit', code => {
      const final = readRunState(workspaceId) ?? state
      if (final.ok === true) {
        resolve({ state: final, result: final.result })
        return
      }
      const reason = final.error ?? crash ?? `index worker exited with code ${code}`
      if (final.ok === null) failRun(state, reason)
      reject(Object.assign(new Error(reason), { state: readRunState(workspaceId) ?? state }))
    })
  })

  // A rejected promise nobody awaits would take the process down. The state
  // file already carries the failure, so the promise is only a convenience.
  done.catch(() => undefined)
  return { state, done }
}

/**
 * Give the disk space back after a run.
 *
 * A full generation is one transaction, so its WAL can be as large as the index
 * itself and stays that size after the commit — the file is reusable but the
 * blocks are not free, and the next commit has to checkpoint through them. A
 * truncating checkpoint after the run drops it back to nothing. If a reader is
 * still holding a read mark the checkpoint simply does not happen, which is not
 * an error and must not fail the run: the space returns at the next chance.
 */
export function reclaimWal(db: DatabaseSync): void {
  try { db.exec('PRAGMA wal_checkpoint(TRUNCATE)') } catch { /* a busy checkpoint is not a failure */ }
}

/** Convenience for a caller that only wants the outcome. */
export async function runIndexInWorker(
  workspaceId: string, options: RunOptions & { dbFile: string },
): Promise<RunOutcome> {
  return startIndexRun(workspaceId, options).done
}
