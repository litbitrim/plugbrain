/**
 * The endpoint file: `<PLUGBRAIN_HOME>/core.json`.
 *
 * `serve` writes where it listens — atomically, temp file + rename, so a
 * reader never sees a half-written file or has to guess a port — and removes
 * the file on the way down. A reader trusts the file only while its `pid` is
 * alive: a file left behind by a crashed serve is a leftover, not a live
 * endpoint, and no consumer (the PlugHarness operator, the desktop shell) may
 * point at a look-alike service that is already gone.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export interface CoreEndpoint {
  /** The full base URL the server answers on, e.g. `http://127.0.0.1:4310`. */
  url: string
  /** The serving process — the liveness a reader checks. */
  pid: number
  /** The package version of the build that serves. */
  version: string
  /** ISO timestamp of when this serve started listening. */
  startedAt: string
}

export function coreEndpointFile(home: string): string {
  return join(home, 'core.json')
}

/** The package version, by candidate: next to src/, next to a built bundle. */
export function packageVersion(): string {
  for (const candidate of [
    join(import.meta.dirname, '..', '..', 'package.json'),
    join(import.meta.dirname, '..', 'package.json'),
  ]) {
    try {
      const parsed = JSON.parse(readFileSync(candidate, 'utf8')) as { version?: string }
      if (typeof parsed.version === 'string' && parsed.version) return parsed.version
    } catch { /* next candidate */ }
  }
  return 'unknown'
}

/**
 * Write the endpoint file atomically: a temp file beside the target, then a
 * rename. On one file system the rename is atomic, so a concurrent reader
 * sees either the old file or the new one — never a half one.
 */
export function writeCoreEndpoint(home: string, endpoint: CoreEndpoint): void {
  mkdirSync(home, { recursive: true })
  const file = coreEndpointFile(home)
  const tmp = `${file}.tmp-${process.pid}`
  writeFileSync(tmp, JSON.stringify(endpoint, null, 2) + '\n')
  renameSync(tmp, file)
}

function pidAlive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    // EPERM means the process exists but may not be signalled: alive.
    return (error as { code?: string }).code === 'EPERM'
  }
}

/**
 * Read the endpoint file, or null. A file whose pid is no longer alive is
 * stale — the serve that wrote it is gone — and a reader must treat it as
 * missing rather than point at a dead url. A file that does not parse is
 * treated the same way.
 */
export function readCoreEndpoint(home: string): CoreEndpoint | null {
  const file = coreEndpointFile(home)
  if (!existsSync(file)) return null
  let parsed: Partial<CoreEndpoint>
  try {
    parsed = JSON.parse(readFileSync(file, 'utf8')) as Partial<CoreEndpoint>
  } catch { return null }
  if (typeof parsed.url !== 'string' || typeof parsed.pid !== 'number' ||
      Number.isInteger(parsed.pid) === false) return null
  if (!pidAlive(parsed.pid)) return null
  return parsed as CoreEndpoint
}

/**
 * Remove the endpoint file — but only when it belongs to `pid`. A serve that
 * shuts down cleanly takes its own file with it; a file another serve has
 * already replaced (the same home, a second instance) is not ours to remove.
 */
export function removeCoreEndpoint(home: string, pid: number): void {
  const file = coreEndpointFile(home)
  if (!existsSync(file)) return
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as Partial<CoreEndpoint>
    if (parsed.pid !== pid) return
  } catch { /* a half-written file of a dying writer: ours to clean up */ }
  try { unlinkSync(file) } catch { /* already gone */ }
}
