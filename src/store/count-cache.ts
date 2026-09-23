/**
 * A tiny memo for sums that only the indexer writes.
 *
 * The Board read routes are polled — the UI asks /api/galaxy, /api/intel/status
 * and /api/planet every few seconds — and each poll recounted the same
 * per-generation sums: symbols and edges can only change when an index run
 * publishes a new generation, so recounting them on every request was seconds
 * of nothing on a real Planet. The cached number is not an approximation: a
 * write that is not an index run cannot move these rows, so the memo stays
 * exact until the next generation publishes. The key carries the workspace, the
 * generation and the scope parameters, so a selection change or a different
 * workspace never reads another one's number.
 *
 * The cache is deliberately small and coarse: when it fills, it is cleared.
 * These are whole-workspace sums, not per-row answers, so a clear costs one
 * recount — never correctness.
 */

import type { DatabaseSync } from 'node:sqlite'

const caches = new Map<string, Map<string, unknown>>()

/** One named cache per call site, so a clear at one route cannot drop another's. */
export function generationCache(name: string): Map<string, unknown> {
  let cache = caches.get(name)
  if (cache === undefined) {
    cache = new Map()
    caches.set(name, cache)
  }
  return cache
}

const MAX_ENTRIES = 64

/** Return the memoized value for `key`, computing and storing it on a miss. */
export function cachedOnce<T>(cache: Map<string, unknown>, key: string, compute: () => T): T {
  const hit = cache.get(key)
  if (hit !== undefined) return hit as T
  const value = compute()
  if (cache.size >= MAX_ENTRIES) cache.clear()
  cache.set(key, value)
  return value
}

/** The generation a workspace's index state currently publishes, or -1. */
export function publishedGeneration(db: DatabaseSync, workspaceId: string): number {
  const row = db.prepare(
    'SELECT generation FROM workspace_index_state WHERE workspace_id = ?',
  ).get(workspaceId) as { generation: number } | undefined
  return row === undefined ? -1 : Number(row.generation)
}
