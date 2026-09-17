/**
 * Concept Search across Symbols, Notes, and Execution Flows.
 *
 * Requirement M3 §67:
 * "query: Konzeptsuche liefert Symbole und Abläufe"
 */
import type { DatabaseSync } from 'node:sqlite'
import type { ConceptSearchResult, ExecutionFlow, IntelSymbol } from './types.ts'
import { annotateSymbolVendor } from './vendor.ts'
import { getSymbolContext } from './context.ts'
import { searchNotes } from '../notes/search.ts'

export interface ConceptSearchOptions {
  limit?: number
  repoId?: string
  checkoutId?: string
  workspaceId?: string
}

/**
 * Searches the knowledge graph for symbols, notes, and execution flows matching a concept.
 */
export function conceptSearch(
  db: DatabaseSync,
  queryText: string,
  options?: ConceptSearchOptions
): ConceptSearchResult {
  const start = performance.now()
  const limit = Math.max(1, Math.min(100, options?.limit ?? 25))
  const cleanQuery = queryText.trim()

  if (!cleanQuery) {
    return {
      query: queryText,
      symbols: [],
      notes: [],
      flows: [],
      total: 0,
      timingMs: 0,
    }
  }

  // 1. Search symbols
  const terms = cleanQuery.split(/\s+/).filter(Boolean)
  const pattern = `%${cleanQuery.replace(/\\/g, '/')}%`

  let symbolSql = `
    SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
           s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId,
           CASE
             WHEN LOWER(s.name) = LOWER(?) THEN 100
             WHEN LOWER(s.name) LIKE LOWER(?) || '%' THEN 80
             WHEN LOWER(s.name) LIKE LOWER(?) THEN 60
             WHEN LOWER(f.path) LIKE LOWER(?) THEN 40
             ELSE 20
           END as relevance
      FROM symbols s
      JOIN files f ON s.file_id = f.id
     WHERE (s.name LIKE ? OR s.container LIKE ? OR f.path LIKE ?)
  `
  const params: unknown[] = [
    cleanQuery,
    cleanQuery,
    pattern,
    pattern,
    pattern,
    pattern,
    pattern,
  ]

  if (options?.repoId) {
    symbolSql += ' AND f.repo_id = ?'
    params.push(options.repoId)
  }
  if (options?.checkoutId) {
    symbolSql += ' AND f.checkout_id = ?'
    params.push(options.checkoutId)
  }

  symbolSql += ' ORDER BY relevance DESC, s.id ASC LIMIT ?'
  params.push(limit)

  let rawSymbols: Array<{
    id: number
    name: string
    kind: string
    file: string
    line: number
    endLine: number | null
    exported: number
    container: string | null
    repoId: string | null
    checkoutId: string | null
  }> = []

  try {
    rawSymbols = db.prepare(symbolSql).all(...params) as typeof rawSymbols
  } catch {
    // If the ranking CASE statement fails on any platform, fallback to simple query
    const fallbackSql = `
      SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
             s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId
        FROM symbols s
        JOIN files f ON s.file_id = f.id
       WHERE s.name LIKE ? OR f.path LIKE ?
       LIMIT ?
    `
    rawSymbols = db.prepare(fallbackSql).all(pattern, pattern, limit) as typeof rawSymbols
  }

  const symbols: IntelSymbol[] = rawSymbols.map(s =>
    annotateSymbolVendor({
      id: s.id,
      name: s.name,
      kind: s.kind,
      file: s.file,
      line: s.line,
      endLine: s.endLine,
      exported: Boolean(s.exported),
      container: s.container,
      repoId: s.repoId,
      checkoutId: s.checkoutId,
    })
  )

  // 2. Search notes
  const notes: Array<{ path: string; title: string; snippet: string | null }> = []
  try {
    // Determine target workspace ID
    let wsId = options?.workspaceId
    if (!wsId) {
      const wsRow = db.prepare('SELECT id FROM workspaces LIMIT 1').get() as
        | { id: string }
        | undefined
      wsId = wsRow?.id
    }

    if (wsId) {
      const noteResult = searchNotes(db, wsId, cleanQuery, { limit: 10 })
      for (const hit of noteResult.hits) {
        notes.push({
          path: hit.path,
          title: hit.title,
          snippet: hit.snippet,
        })
      }
    }
  } catch {
    // Graceful fallback if note_search table is absent or query unparseable
  }

  // 3. Execution flows around top symbols
  const flows: ExecutionFlow[] = []
  const flowIds = new Set<string>()

  for (const sym of symbols.slice(0, 3)) {
    try {
      const ctx = getSymbolContext(db, sym.name, { file: sym.file })
      for (const flow of ctx.processes) {
        if (!flowIds.has(flow.id)) {
          flowIds.add(flow.id)
          flows.push(flow)
        }
      }
    } catch {
      // Ignore flow retrieval failure for individual symbol
    }
  }

  const timingMs = Math.round((performance.now() - start) * 10) / 10
  const total = symbols.length + notes.length + flows.length

  return {
    query: cleanQuery,
    symbols,
    notes,
    flows,
    total,
    timingMs,
  }
}
