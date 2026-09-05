/**
 * The canonical workspace search.
 *
 * This exists because the obvious query is catastrophically slow and looks
 * completely reasonable:
 *
 *   SELECT r.path FROM search s JOIN search_rows r ON r.id = s.rowid
 *    WHERE search MATCH ? AND r.workspace_id = ? LIMIT 25
 *
 * SQLite plans that as `SEARCH r USING INDEX idx_search_rows_ws` followed by
 * `SCAN s VIRTUAL TABLE`: it drives from the ordinary table, filtered to every
 * row of the workspace, and probes the FTS index once per row. Measured on a
 * 747-file corpus that is ~169 ms per query. Driving from the FTS match instead
 * and filtering afterwards is ~0.02 ms per query on the same data — about four
 * orders of magnitude, from the query SHAPE alone.
 *
 * So the shape is not left to callers. Every surface that searches a workspace
 * goes through here.
 */
import type { DatabaseSync } from 'node:sqlite'

export interface SearchHit {
  name: string
  path: string
  kind: string
  symbolId: number | null
  fileId: number | null
}

export interface SearchOptions {
  limit?: number
  /** Restrict to these row kinds, e.g. only files or only functions. */
  kinds?: readonly string[]
}

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 500

/**
 * FTS5 treats a bare term with punctuation as syntax. A user typing `foo(` or
 * `a-b` means those characters literally, so the term is quoted and any
 * embedded double quote is escaped. An empty query matches nothing rather than
 * everything, because "" as a MATCH is a syntax error.
 */
export function toMatchExpression(query: string): string | null {
  const terms = query.trim().split(/\s+/).filter(term => term.length > 0)
  if (terms.length === 0) return null
  return terms.map(term => `"${term.replace(/"/g, '""')}"*`).join(' ')
}

/**
 * Search one workspace's symbols and files.
 *
 * The FTS match drives the query and the workspace filter is applied to the
 * matched rows only, which is what keeps this sub-millisecond.
 */
export function searchWorkspace(
  db: DatabaseSync,
  workspaceId: string,
  query: string,
  options: SearchOptions = {},
): SearchHit[] {
  const match = toMatchExpression(query)
  if (match === null) return []
  const limit = Math.min(MAX_LIMIT, Math.max(1, options.limit ?? DEFAULT_LIMIT))
  const kinds = options.kinds ?? []

  // The FTS subquery is evaluated first and yields a small rowid set; the
  // outer query then filters that set. Never the other way round.
  const kindFilter = kinds.length > 0
    ? ` AND kind IN (${kinds.map(() => '?').join(',')})`
    : ''
  const rows = db.prepare(
    `SELECT name, path, kind, symbol_id AS symbolId, file_id AS fileId
       FROM search_rows
      WHERE id IN (SELECT rowid FROM search WHERE search MATCH ?)
        AND workspace_id = ?${kindFilter}
      LIMIT ?`)
    .all(match, workspaceId, ...kinds, limit) as unknown as SearchHit[]
  return rows
}
