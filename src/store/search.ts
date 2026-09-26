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
 * On a real planet the same mistake is not slow, it is a hang: 183 428 files,
 * 3 380 220 rows of `search_rows`, and that plan needs 60 215 ms — a full
 * minute in which the daemon answers nothing at all, because the query runs
 * synchronously in its event loop. The fix that makes the shape impossible to
 * get wrong is the MATERIALIZED CTE below: SQLite is told to evaluate the FTS
 * match first, take at most `candidates` rowids, and only then join the ordinary
 * tables. Measured on the same planet: 19 ms.
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
  /** Line of the definition, when the row is a symbol. Null for a file row. */
  line: number | null
}

export interface SearchOptions {
  limit?: number
  /** Restrict to these row kinds, e.g. only files or only functions. */
  kinds?: readonly string[]
}

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 500
/**
 * Upper bound on the FTS matches a single query may pull before filtering.
 * The match itself is cheap (measured 22 ms for 485 597 hits on the real
 * planet); this only stops a pathological query from materialising millions.
 */
const MAX_CANDIDATES = 20_000

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

  // The FTS subquery is evaluated first and yields a bounded rowid set; the
  // outer query then filters that set. Never the other way round.
  //
  // `MATERIALIZED` is what makes that binding rather than a suggestion: without
  // it SQLite is free to flatten the CTE back into a join and pick the other
  // order, which is the 60-second plan. The candidate window is wider than the
  // answer because the workspace filter is applied AFTER the match — a store
  // with several workspaces must not return short just because another one
  // matched first.
  const candidates = Math.min(MAX_CANDIDATES, Math.max(limit * 8, limit))
  const rows = db.prepare(searchSql(kinds))
    .all(match, candidates, workspaceId, ...kinds, limit) as unknown as SearchHit[]
  return rows
}

/**
 * The one statement every search runs, exposed so a test can ask SQLite how it
 * intends to execute it. The SHAPE is the fix (see the file header), and a test
 * that reads the plan is the only way to keep a later "cleanup" from quietly
 * restoring the 60-second version.
 */
export function searchSql(kinds: readonly string[] = []): string {
  const kindFilter = kinds.length > 0
    ? ` AND r.kind IN (${kinds.map(() => '?').join(',')})`
    : ''
  return (
    `WITH hits AS MATERIALIZED (SELECT rowid FROM search WHERE search MATCH ? LIMIT ?)
     SELECT r.name, r.path, r.kind, r.symbol_id AS symbolId, r.file_id AS fileId,
            sym.line AS line
       FROM hits
       JOIN search_rows r ON r.id = hits.rowid
       LEFT JOIN symbols sym ON sym.id = r.symbol_id
      WHERE r.workspace_id = ?${kindFilter}
      LIMIT ?`)
}
