/**
 * Exact in-process memo for projections derived from append-only trace facts.
 *
 * A trace snapshot is immutable until ingestion commits new rows. The cache is
 * therefore keyed by the database connection and a per-workspace revision,
 * not by a timeout: a hit is an exact projection of the current trace, while
 * a restart simply starts cold. Keeping it connection-local prevents one
 * temporary test store or another Planet from ever receiving a stale snapshot.
 */
import type { DatabaseSync } from 'node:sqlite'

interface Entry<T> {
  revision: number
  value: T
}

const revisions = new WeakMap<DatabaseSync, Map<string, number>>()
const entries = new WeakMap<DatabaseSync, Map<string, Entry<unknown>>>()

function revisionMap(db: DatabaseSync): Map<string, number> {
  let map = revisions.get(db)
  if (map === undefined) {
    map = new Map()
    revisions.set(db, map)
  }
  return map
}

function entryMap(db: DatabaseSync): Map<string, Entry<unknown>> {
  let map = entries.get(db)
  if (map === undefined) {
    map = new Map()
    entries.set(db, map)
  }
  return map
}

/** Mark a trace-derived projection stale only after its SQLite transaction committed. */
export function invalidateTraceProjection(db: DatabaseSync, workspaceId: string): void {
  const revisionsHere = revisionMap(db)
  revisionsHere.set(workspaceId, (revisionsHere.get(workspaceId) ?? 0) + 1)
}

/** Return an exact trace projection until the same store ingests a new event. */
export function cachedTraceProjection<T>(
  db: DatabaseSync, workspaceId: string, build: () => T,
): T {
  const revision = revisionMap(db).get(workspaceId) ?? 0
  const cache = entryMap(db)
  const prior = cache.get(workspaceId) as Entry<T> | undefined
  if (prior !== undefined && prior.revision === revision) return prior.value
  const value = build()
  cache.set(workspaceId, { revision, value })
  return value
}
