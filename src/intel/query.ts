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

/** The words of an identifier or path: camelCase, PascalCase, snake_case, kebab-case and folders. */
export function identifierWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

const DEFINITION_KINDS = new Set(['function', 'class', 'interface', 'method', 'type_alias', 'enum'])
const TEST_PATH = /(^|\/)(tests?|__tests__|spec|fixtures?)\/|\.(test|spec)\.[a-z]+$|(^|\/)test_[^/]*$/

/**
 * Rank candidates the way a reader weighs a hit: a query term that IS a word of
 * the name beats one that starts a word, which beats one merely contained in
 * it. Covering every term, being a definition, being exported and living in
 * source rather than a test all count; an import binding never outranks the
 * thing it imports.
 */
function rankByWords<T extends { name: string; kind: string; file: string; exported: number; container: string | null }>(
  rows: T[], query: string, terms: string[],
): T[] {
  const whole = query.toLowerCase()
  const scored = rows.map((row, order) => {
    const name = row.name.toLowerCase()
    const nameWords = identifierWords(row.name)
    const containerWords = row.container === null ? [] : identifierWords(row.container)
    const pathWords = identifierWords(row.file)
    let score = name === whole ? 100 : name.startsWith(whole) ? 60 : 0
    let covered = 0
    for (const term of terms) {
      const inName = nameWords.includes(term) ? 12 : nameWords.some(word => word.startsWith(term)) ? 7
        : name.includes(term) ? 2 : 0
      const inContainer = containerWords.includes(term) ? 5 : containerWords.some(word => word.startsWith(term)) ? 3 : 0
      const inPath = pathWords.includes(term) ? 4 : pathWords.some(word => word.startsWith(term)) ? 2 : 0
      if (inName >= 7 || inContainer >= 3 || inPath >= 2) covered += 1
      score += inName + inContainer + inPath
    }
    if (terms.length > 1 && covered === terms.length) score += 10
    if (DEFINITION_KINDS.has(row.kind)) score += 3
    if (row.exported) score += 1
    if (row.kind === 'import') score -= 50
    // A local constant named like the query is almost never what was asked for.
    if (!row.exported && (row.kind === 'constant' || row.kind === 'variable' || row.kind === 'property')) score -= 3
    if (TEST_PATH.test(row.file.toLowerCase())) score -= 4

    // Boost entrypoints & barrels: index.*, main.*, server.*, cli.*, mod.*
    const fileName = row.file.split('/').pop()?.toLowerCase() ?? ''
    const isEntrypoint = /^(index|main|server|cli|mod|app|default)\.[a-z]+$/.test(fileName)
    if (isEntrypoint) score += 15
    if (fileName === whole || fileName.startsWith(whole)) score += 40
    if (isEntrypoint && row.kind === 'file') score += 20
    return { row, score, order }
  })
  scored.sort((a, b) => b.score - a.score || a.row.name.length - b.row.name.length || a.order - b.order)
  return scored.map(item => item.row)
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
  //
  // A concept is several words ("brain core supervisor start"), and matching
  // the whole phrase as one substring found no symbol at all: no identifier
  // contains spaces. Each term is scored on its own instead, the way a reader
  // expects: a term inside the NAME counts most (ensureBrainCore holds "brain"
  // and "core"), inside the container less, inside the path least. The whole
  // query as the exact name or a name prefix still wins outright, so a query
  // that IS an identifier ranks exactly as before. Import bindings are the
  // noise of every module and never outrank a definition.
  const terms = [...new Set(cleanQuery.toLowerCase().split(/[\s,;]+/).filter(term => term.length > 1))]
    .slice(0, 8)
  const pattern = `%${cleanQuery.replace(/\\/g, '/')}%`
  const like = (term: string): string => `%${term.replace(/[\\%_]/g, '')}%`
  const termScore = terms.map(() =>
    `(CASE WHEN LOWER(s.name) LIKE ? THEN 10 ELSE 0 END
      + CASE WHEN LOWER(COALESCE(s.container, '')) LIKE ? THEN 4 ELSE 0 END
      + CASE WHEN LOWER(f.path) LIKE ? THEN 2 ELSE 0 END)`).join(' + ') || '0'
  const termMatch = terms.map(() => '(LOWER(s.name) LIKE ? OR LOWER(f.path) LIKE ?)').join(' OR ') || '0'

  let symbolSql = `
    SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
           s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId,
           (CASE
              WHEN LOWER(s.name) = LOWER(?) THEN 100
              WHEN LOWER(s.name) LIKE LOWER(?) || '%' THEN 80
              WHEN LOWER(s.name) LIKE LOWER(?) THEN 60
              ELSE 0
            END
            + ${termScore}
            + CASE WHEN s.kind IN ('function', 'class', 'interface', 'method', 'type_alias', 'enum') THEN 3 ELSE 0 END
            + CASE WHEN s.exported = 1 THEN 1 ELSE 0 END
            - CASE WHEN s.kind = 'import' THEN 50 ELSE 0 END) as relevance
      FROM symbols s
      JOIN files f ON s.file_id = f.id
     WHERE (s.name LIKE ? OR s.container LIKE ? OR f.path LIKE ? OR ${termMatch})
  `
  const params: unknown[] = [
    cleanQuery,
    cleanQuery,
    pattern,
    ...terms.flatMap(term => [like(term), like(term), like(term)]),
    pattern,
    pattern,
    pattern,
    ...terms.flatMap(term => [like(term), like(term)]),
  ]

  if (options?.repoId) {
    symbolSql += ' AND f.repo_id = ?'
    params.push(options.repoId)
  }
  if (options?.workspaceId) {
    symbolSql += ' AND f.workspace_id = ?'
    params.push(options.workspaceId)
  }
  if (options?.checkoutId) {
    symbolSql += ' AND f.checkout_id = ?'
    params.push(options.checkoutId)
  }

  // SQL can only score substrings, and a substring is a weak signal: "ping"
  // sits inside "stripping", "turn" inside "returns". It fetches a generous
  // candidate set; the ranking that decides is done below on identifier words.
  symbolSql += ' ORDER BY relevance DESC, length(s.name) ASC, s.id ASC LIMIT ?'
  params.push(Math.max(200, limit * 10))

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

  // Fast-path: Index-driven symbol candidate search.
  // 1. Exact & prefix match via B-tree index idx_symbols_name (< 0.5 ms).
  // 2. Substring & trigram candidate search via search_trigram FTS5 (< 2 ms on 500k symbols).
  // Avoids catastrophic multi-second full table scans over hundreds of thousands of rows.
  const fastCandidates: typeof rawSymbols = []
  const seenCandidateIds = new Set<number>()

  try {
    let exactSql = `
      SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
             s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId
        FROM symbols s
        JOIN files f ON s.file_id = f.id
       WHERE (s.name = ? OR s.name LIKE ? || '%')
    `
    const exactParams: unknown[] = [cleanQuery, cleanQuery]
    if (options?.repoId) { exactSql += ' AND f.repo_id = ?'; exactParams.push(options.repoId) }
    if (options?.workspaceId) { exactSql += ' AND f.workspace_id = ?'; exactParams.push(options.workspaceId) }
    if (options?.checkoutId) { exactSql += ' AND f.checkout_id = ?'; exactParams.push(options.checkoutId) }
    exactSql += ' LIMIT 100'
    const exactHits = db.prepare(exactSql).all(...exactParams) as typeof rawSymbols
    for (const h of exactHits) {
      if (!seenCandidateIds.has(h.id)) {
        seenCandidateIds.add(h.id)
        fastCandidates.push(h)
      }
    }

    const hasTrigram = Boolean(db.prepare(
      "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'search_trigram'"
    ).get())
    if (hasTrigram) {
      const searchTerms = [cleanQuery, ...terms].filter(t => t.length >= 3).slice(0, 4)
      for (const term of searchTerms) {
        const safe = `"${term.replace(/"/g, '""')}"`
        let triSql = `
          WITH hits AS MATERIALIZED (
            SELECT rowid FROM search_trigram WHERE search_trigram MATCH ? LIMIT 150
          )
          SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
                 s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId
            FROM hits h
            JOIN search_rows r ON r.id = h.rowid
            JOIN symbols s ON s.id = r.symbol_id
            JOIN files f ON s.file_id = f.id
           WHERE r.symbol_id IS NOT NULL
        `
        const triParams: unknown[] = [safe]
        if (options?.repoId) { triSql += ' AND f.repo_id = ?'; triParams.push(options.repoId) }
        if (options?.workspaceId) { triSql += ' AND f.workspace_id = ?'; triParams.push(options.workspaceId) }
        if (options?.checkoutId) { triSql += ' AND f.checkout_id = ?'; triParams.push(options.checkoutId) }
        triSql += ' LIMIT 100'
        const triHits = db.prepare(triSql).all(...triParams) as typeof rawSymbols
        for (const h of triHits) {
          if (!seenCandidateIds.has(h.id)) {
            seenCandidateIds.add(h.id)
            fastCandidates.push(h)
          }
        }
      }
    }

    // Direct file & markdown match (universal document/barrel lookup)
    let fileSql = `
      SELECT -f.id as id, f.path as name, 'file' as kind, f.path as file,
             1 as line, 1 as endLine, 1 as exported, NULL as container,
             f.repo_id as repoId, f.checkout_id as checkoutId
        FROM files f
       WHERE (f.path = ? OR f.path LIKE '%' || ? OR f.path LIKE ? || '%')
    `
    const fileParams: unknown[] = [cleanQuery, cleanQuery, cleanQuery]
    if (options?.repoId) { fileSql += ' AND f.repo_id = ?'; fileParams.push(options.repoId) }
    if (options?.workspaceId) { fileSql += ' AND f.workspace_id = ?'; fileParams.push(options.workspaceId) }
    if (options?.checkoutId) { fileSql += ' AND f.checkout_id = ?'; fileParams.push(options.checkoutId) }
    fileSql += ' LIMIT 20'
    const fileHits = db.prepare(fileSql).all(...fileParams) as typeof rawSymbols
    for (const fh of fileHits) {
      if (!seenCandidateIds.has(fh.id)) {
        seenCandidateIds.add(fh.id)
        fastCandidates.push(fh)
      }
    }
  } catch {}

  if (fastCandidates.length > 0) {
    rawSymbols = fastCandidates
  } else {
    try {
      rawSymbols = db.prepare(symbolSql).all(...params) as typeof rawSymbols
    } catch {
      // If the ranking CASE statement fails on any platform, fallback to simple query
      const fallbackSql = `
        SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
               s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId
          FROM symbols s
          JOIN files f ON s.file_id = f.id
         WHERE (s.name LIKE ? OR f.path LIKE ?)` + (options?.workspaceId ? ' AND f.workspace_id = ?' : '') + `
         LIMIT ?
      `
      rawSymbols = db.prepare(fallbackSql).all(pattern, pattern, ...(options?.workspaceId ? [options.workspaceId] : []), limit) as typeof rawSymbols
    }
  }

  const ranked = rankByWords(rawSymbols, cleanQuery, terms).slice(0, limit)
  const symbols: IntelSymbol[] = ranked.map(s =>
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
      const ctx = getSymbolContext(db, sym.name, { file: sym.file, workspaceId: options?.workspaceId })
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
