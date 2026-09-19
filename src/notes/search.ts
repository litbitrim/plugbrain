/**
 * Prose search over the vault.
 *
 * `searchWorkspace` answers "which file or symbol is called X" — it indexes
 * names and paths, which is exactly right for finding code you can already
 * name and useless for the question a vault is asked:
 *
 *   where did we write down that the gateway owner moved?
 *
 * The answer to that is a sentence inside a note whose title says nothing about
 * it, so the note bodies are indexed too (`note_body` + `note_search`, the same
 * external-content FTS5 shape as `search_rows`, for the same reason).
 *
 * Two properties are not incidental:
 *
 *   - THE MATCH DRIVES THE QUERY. Filtering by workspace after a full scan of
 *     the FTS table is orders of magnitude slower; the rowids come from the
 *     index and everything else is applied to the small set they name.
 *   - A HIT CARRIES ITS EVIDENCE. A result with a snippet shows the sentence
 *     that matched, so a reader can judge the hit without opening the note —
 *     and a match that turns out to be in a code fence is visible as such
 *     rather than silently trusted.
 */
import type { DatabaseSync } from 'node:sqlite'
import { toMatchExpression } from '../store/search.ts'

export interface NoteHit {
  path: string
  fileId: number
  title: string
  /** The matching text with the terms marked by `[...]`, or null. */
  snippet: string | null
  /** FTS5 bm25: lower is a better match. Reported, never asserted to be sane. */
  score: number
  /**
   * Line of the first matching passage, 1-based, or null when it was not
   * asked for (the file has to be read for this, and reading is not free).
   */
  line: number | null
}

export interface NoteSearchResult {
  query: string
  total: number
  returned: number
  hits: NoteHit[]
}

const SNIPPET_MARK = ['\u0002', '\u0003']

const titleOf = (path: string): string => (path.split('/').pop() ?? path).replace(/\.md$/i, '')

/**
 * The literal terms of a search, in the form that can be found in the file.
 *
 * A hit with a snippet tells a reader WHAT matched but not WHERE, and "open the
 * note at the passage" needs the line. The terms are lowercased and split the
 * same way a reader would read them, so the text the index matched can be found
 * again in the file itself instead of in a copy.
 */
export function termsOf(query: string): string[] {
  const cleaned = query.replace(/["']/g, ' ').trim().toLowerCase()
  const candidates: string[] = []
  for (const token of cleaned.split(/\s+/)) {
    if (token.length === 0) continue
    // The token itself first: `path/to/note.md:12` is found as written when the
    // file contains it, and only then does a looser reading get a chance.
    candidates.push(token)
    for (const part of token.split(/[^\p{L}\p{N}_.\-]+/u)) {
      if (part.length >= 2 && part !== token) candidates.push(part)
    }
  }
  // One-letter terms are dropped: they match nearly every line, so a "line"
  // derived from one would be a guess dressed up as a location.
  return [...new Set(candidates.filter(term => term.length >= 2))]
}

/**
 * Search the prose of a planet's notes.
 *
 * Terms are quoted and prefix-matched by the same helper the code search uses,
 * so `foo(` and `a-b` are literal text rather than FTS5 syntax, and an empty
 * query matches nothing instead of everything.
 */
export function searchNotes(
  db: DatabaseSync, workspaceId: string, query: string, options: { limit?: number } = {},
): NoteSearchResult {
  const match = toMatchExpression(query)
  if (match === null) return { query, total: 0, returned: 0, hits: [] }
  const limit = Math.min(Math.max(1, options.limit ?? 50), 500)

  const rows = db.prepare(
    `SELECT b.path AS path, b.file_id AS fileId,
            snippet(note_search, 1, ?, ?, ' … ', 18) AS snippet,
            bm25(note_search) AS score
       FROM note_body b JOIN note_search ON note_search.rowid = b.id
      WHERE note_search MATCH ? AND b.workspace_id = ?
      ORDER BY score, b.path
      LIMIT ?`).all(SNIPPET_MARK[0], SNIPPET_MARK[1], match, workspaceId, limit) as
    unknown as Array<{ path: string; fileId: number; snippet: string | null; score: number }>

  const total = Number((db.prepare(
    `SELECT COUNT(*) AS n FROM note_body b JOIN note_search ON note_search.rowid = b.id
      WHERE note_search MATCH ? AND b.workspace_id = ?`).get(match, workspaceId) as { n: number }).n)

  return {
    query,
    total,
    returned: rows.length,
    hits: rows.map(row => ({
      path: row.path,
      fileId: row.fileId,
      title: titleOf(row.path),
      // The markers are control characters so that no real note text can forge
      // a hit boundary; the caller decides how to render them.
      snippet: row.snippet === null ? null : row.snippet
        .split(SNIPPET_MARK[0]).join('[').split(SNIPPET_MARK[1]).join(']')
        .split(/\s+/).join(' ')
        .trim(),
      score: row.score,
      line: null,
    })),
  }
}

/** Where the first matching term sits in a note, 1-based, or null. */
export function lineOf(content: string, query: string): number | null {
  const terms = termsOf(query)
  if (terms.length === 0) return null
  const lines = content.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const lower = lines[index].toLowerCase()
    for (const term of terms) if (lower.includes(term)) return index + 1
  }
  return null
}
