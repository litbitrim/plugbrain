/**
 * The index worker: one generation, off the server's event loop.
 *
 * The indexer is synchronous from top to bottom — `node:sqlite` is synchronous,
 * the walk is synchronous, the TypeScript parser is synchronous. Run inside the
 * server that means the whole daemon stops answering for the length of the run,
 * which on a real planet is tens of minutes: no health check, no UI, no API.
 *
 * A worker thread with its own connection is the honest fix. The write lock is
 * still held by exactly one writer (SQLite enforces that), the published
 * generation is still published by exactly one COMMIT, and the event loop that
 * serves the vault stays free the whole time.
 *
 * The outcome is written to the run state FILE, not posted as a message: a
 * worker that exits immediately after `postMessage` can lose the message, and a
 * run whose result is lost is a run nobody can trust. The file is the same one
 * the progress goes into, so what the parent reads is what happened.
 */
import { workerData } from 'node:worker_threads'
import { openStore } from '../store/schema.ts'
import { indexPlanetWorkspace } from '../planet.ts'
import { failRun, finishRun, writeRunState, type RunState } from './runs.ts'

export interface WorkerPayload {
  workspaceId: string
  /** The store file, so this thread can open its own connection. */
  dbFile: string
  full: boolean
  /** The run state the parent already wrote; this thread keeps it current. */
  state: RunState
  throttleMs: number
}

const payload = workerData as WorkerPayload
const state: RunState = payload.state

try {
  const db = openStore(payload.dbFile)
  let lastWritten = 0

  const result = indexPlanetWorkspace(db, payload.workspaceId, {
    ...(payload.full ? { full: true } : {}),
    onProgress: tick => {
      const now = Date.now()
      if (now - lastWritten < payload.throttleMs) return
      lastWritten = now
      Object.assign(state, {
        phase: tick.phase,
        mode: tick.mode,
        scanned: tick.scanned,
        total: tick.total,
        processed: tick.processed,
        generation: tick.generation,
        heartbeatAt: new Date(now).toISOString(),
      })
      if (tick.symbols !== null) state.symbols = tick.symbols
      if (tick.edges !== null) state.edges = tick.edges
      writeRunState(state)
    },
  })

  db.close()
  finishRun(state, result)
} catch (error) {
  // The reason a run failed is the most valuable thing it produces; it goes to
  // the same place the progress went, so no caller has to guess.
  state.error = error instanceof Error
    ? `${error.message}${error.stack ? `\n${error.stack.split('\n').slice(0, 4).join('\n')}` : ''}`
    : String(error)
  failRun(state, error)
}
