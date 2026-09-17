/**
 * Workspace indexing: keep the stored graph equal to what is on disk, doing
 * only the work the disk actually changed.
 *
 * Three properties matter more than raw speed here, because each was a real
 * defect before:
 *
 *   1. ATTRIBUTION SURVIVES.  `file_owner` hangs off `files(id)` with a
 *      cascade, so the old "delete every row, insert them again" rebuild
 *      destroyed ownership on every successful index. Unchanged and modified
 *      files now keep their row id, renames move the row instead of replacing
 *      it, and any row that genuinely has to be recreated has its owner
 *      replayed from `path_owner` inside the same transaction.
 *
 *   2. BUILD AND PUBLISH ARE SEPARATE.  Everything happens inside one
 *      BEGIN IMMEDIATE ... COMMIT. Under WAL a reader that arrives mid-build
 *      keeps seeing the previous COMPLETE generation, and a failure rolls the
 *      whole thing back, so the active index is never partially updated. The
 *      generation counter is incremented by that same commit, which is why a
 *      generation number always names a graph that was finished.
 *
 *   3. RESOLUTION IS SCOPED.  See `resolve.ts` — a name is resolved against
 *      the file that used it and the imports that file declares, and only a
 *      UNIQUE workspace-wide match is accepted. Two modules that both export
 *      `run` produce an ambiguous edge, not a coin flip.
 *
 * Parse output is persisted (`file_refs`, `file_imports`) so re-resolving a
 * file costs a query rather than a re-parse. That split is what makes editing
 * one file cost one parse instead of a whole workspace.
 */
import { resolve as resolvePath } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { readGit, storeGit } from './git.ts'
import { resolveMarkdownTarget } from './markdown.ts'
import {
  classify, parseFile, resolveImport, walk, walkRoots,
  type IndexResult, type IndexRoot, type ParsedFile, type StoredFile,
} from './scan.ts'
import {
  resolveReference,
  type ResolveContext, type ResolvedBinding, type SymbolRow,
} from './resolve.ts'

export type { ChangeCounts, IndexResult, IndexRoot } from './scan.ts'

/** The stored checkpoint for a workspace, or a zeroed one on first index. */
interface IndexState {
  generation: number
  git_head: string | null
  file_count: number
  symbol_count: number
  edge_count: number
  unresolved_count: number
  ambiguous_count: number
}

function readState(db: DatabaseSync, workspaceId: string): IndexState {
  const row = db.prepare(
    `SELECT generation, git_head, file_count, symbol_count, edge_count,
            unresolved_count, ambiguous_count
       FROM workspace_index_state WHERE workspace_id = ?`)
    .get(workspaceId) as IndexState | undefined
  return row ?? {
    generation: 0, git_head: null, file_count: 0, symbol_count: 0,
    edge_count: 0, unresolved_count: 0, ambiguous_count: 0,
  }
}

/**
 * Index (or re-index) a workspace, doing only the work the disk changed.
 *
 * Pass `full: true` to force a complete rebuild. Even then ownership is
 * preserved: `path_owner` is refreshed from the live `file_owner` rows before
 * anything is deleted, and replayed onto the new rows before the commit.
 *
 * Pass `roots` to index a PLANET: several checkout folders walked into one
 * namespace, each file carrying the repository and checkout it came from. The
 * generation, the transaction and the publish stay single, which is what makes
 * "one brain, many worktrees" true rather than aspirational.
 */
export function indexWorkspace(
  db: DatabaseSync,
  workspaceId: string,
  root: string,
  options: { full?: boolean; roots?: IndexRoot[] } = {},
): IndexResult {
  const started = Date.now()
  const now = new Date().toISOString()
  const absRoot = resolvePath(root)

  if (Array.isArray(options.roots) && options.roots.length === 0) {
    // An empty root set is not "index nothing", it is "everything on disk just
    // disappeared": every stored file would tombstone and the graph would be
    // wiped by a configuration mistake. Refuse instead of destroying.
    throw new Error('refusing to index with an empty root set — that would tombstone every file')
  }

  let gitHead: string | null = null
  try { gitHead = readGit(absRoot, 1).head } catch { gitHead = null }

  const state = readState(db, workspaceId)
  const forceFull = options.full === true || state.generation === 0

  const disk = options.roots === undefined ? walk(absRoot) : walkRoots(options.roots)
  const stored = forceFull
    ? []
    : db.prepare(
        `SELECT id, path, size, mtime, hash, repo_id AS repoId, checkout_id AS checkoutId
           FROM files WHERE workspace_id = ?`)
        .all(workspaceId) as unknown as StoredFile[]

  const change = classify(disk, stored)
  const touched = change.added.length + change.modified.length
    + change.renamed.length + change.deleted.length

  if (touched === 0 && !forceFull && state.git_head === gitHead) {
    // Nothing moved. An unchanged workspace must not pay for a reindex, and
    // must not burn a generation number either.
    return {
      scanned: disk.length,
      files: state.file_count, parsed: 0, symbols: state.symbol_count,
      edges: state.edge_count, unresolved: state.unresolved_count,
      ambiguous: state.ambiguous_count, skipped: change.skipped,
      ms: Date.now() - started, generation: state.generation, mode: 'unchanged',
      changed: { added: 0, modified: 0, renamed: 0, deleted: 0, unchanged: change.unchanged },
      reparsed: 0, reresolved: 0,
    }
  }

  const generation = state.generation + 1
  const result: IndexResult = {
    scanned: disk.length,
    files: 0, parsed: 0, symbols: 0, edges: 0, unresolved: 0, ambiguous: 0,
    skipped: change.skipped, ms: 0, generation,
    mode: forceFull ? 'full' : 'incremental',
    changed: {
      added: change.added.length, modified: change.modified.length,
      renamed: change.renamed.length, deleted: change.deleted.length,
      unchanged: change.unchanged,
    },
    reparsed: 0, reresolved: 0,
  }

  const insertFile = db.prepare(
    `INSERT INTO files (workspace_id, path, repo_id, checkout_id, ext, lang, size, mtime, hash, loc, indexed_at, generation)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const updateFile = db.prepare(
    `UPDATE files SET path = ?, repo_id = ?, checkout_id = ?, ext = ?, lang = ?, size = ?, mtime = ?, hash = ?,
            loc = ?, indexed_at = ?, generation = ? WHERE id = ?`)
  const insertSymbol = db.prepare(
    `INSERT INTO symbols (file_id, name, kind, line, end_line, exported, container)
     VALUES (?, ?, ?, ?, ?, ?, ?)`)
  const insertRef = db.prepare(
    `INSERT INTO file_refs (workspace_id, file_id, kind, target, receiver, from_name, scope, line)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
  const insertImport = db.prepare(
    `INSERT INTO file_imports (workspace_id, file_id, specifier, local_name, imported_name, line)
     VALUES (?, ?, ?, ?, ?, ?)`)
  const insertSearch = db.prepare(
    `INSERT INTO search_rows (name, path, kind, workspace_id, symbol_id, file_id)
     VALUES (?, ?, ?, ?, ?, ?)`)

  db.exec('BEGIN IMMEDIATE')
  try {
    // -- 0. Snapshot ownership by PATH -------------------------------------
    // file_owner.file_id cascades away with its file row. Mirroring it onto a
    // path key BEFORE any delete is what lets attribution survive a rebuild.
    db.prepare(
      `INSERT INTO path_owner (workspace_id, path, agent_id, action, at)
       SELECT ?, f.path, o.agent_id, o.action, o.at
         FROM file_owner o JOIN files f ON f.id = o.file_id
        WHERE f.workspace_id = ?
       ON CONFLICT(workspace_id, path) DO UPDATE SET
         agent_id = excluded.agent_id, action = excluded.action, at = excluded.at`)
      .run(workspaceId, workspaceId)

    // -- 1. Which files need their edges recomputed? -------------------------
    // Computed BEFORE anything is deleted: an edge from an untouched file into
    // a changed file is destroyed by the symbols cascade, so that untouched
    // file must be re-resolved or it silently loses the edge.
    const changedIds = [
      ...change.modified.filter(item => item.content !== null).map(item => item.id),
      ...change.renamed.map(item => item.id),
    ]
    const deletedIds = change.deleted.map(row => row.id)
    const affected = new Set<number>(changedIds)
    const impacted = [...changedIds, ...deletedIds]
    if (impacted.length > 0) {
      const list = impacted.join(',')
      const viaSymbol = db.prepare(
        `SELECT DISTINCT e.src_file AS id FROM edges e
           JOIN symbols s ON s.id = e.dst_symbol
          WHERE e.workspace_id = ? AND s.file_id IN (${list}) AND e.src_file IS NOT NULL`)
        .all(workspaceId) as unknown as Array<{ id: number }>
      const viaFile = db.prepare(
        `SELECT DISTINCT src_file AS id FROM edges
          WHERE workspace_id = ? AND dst_file IN (${list}) AND src_file IS NOT NULL`)
        .all(workspaceId) as unknown as Array<{ id: number }>
      for (const row of [...viaSymbol, ...viaFile]) affected.add(row.id)
    }
    // Which symbol NAMES this generation adds or removes. Re-examining every
    // file that merely holds an unresolved edge sounds safe, but on a real
    // workspace most edges are unresolved (external packages, builtins), so it
    // dragged in essentially the whole repository for a one-file edit. A
    // reference can only change meaning when a definition of THAT name appears
    // or disappears, so the name delta is both narrower and complete.
    const oldNames = new Set<string>()
    if (impacted.length > 0) {
      for (const row of db.prepare(
        `SELECT DISTINCT name FROM symbols WHERE file_id IN (${impacted.join(',')})`)
        .all() as unknown as Array<{ name: string }>) oldNames.add(row.name)
    }

    // -- 2. Forced rebuild drops the old graph inside this transaction -------
    if (forceFull) {
      db.prepare('DELETE FROM edges WHERE workspace_id = ?').run(workspaceId)
      db.prepare('DELETE FROM search_rows WHERE workspace_id = ?').run(workspaceId)
      db.prepare('DELETE FROM files WHERE workspace_id = ?').run(workspaceId)
      affected.clear()
    }

    // -- 3. Deletions become tombstones --------------------------------------
    const tombstone = db.prepare(
      `INSERT INTO file_tombstones (workspace_id, path, hash, generation, deleted_at, reason)
       VALUES (?, ?, ?, ?, ?, 'deleted')
       ON CONFLICT(workspace_id, path) DO UPDATE SET
         hash = excluded.hash, generation = excluded.generation,
         deleted_at = excluded.deleted_at, reason = 'deleted'`)
    for (const row of change.deleted) {
      tombstone.run(workspaceId, row.path, row.hash, generation, now)
      db.prepare('DELETE FROM search_rows WHERE workspace_id = ? AND file_id = ?')
        .run(workspaceId, row.id)
      db.prepare('DELETE FROM files WHERE id = ?').run(row.id)   // cascades the rest
      affected.delete(row.id)
    }

    // -- 4. Renames move the row; the id, and so the owner, stays ------------
    for (const item of change.renamed) {
      db.prepare('DELETE FROM path_owner WHERE workspace_id = ? AND path = ?')
        .run(workspaceId, item.file.rel)
      db.prepare('UPDATE path_owner SET path = ? WHERE workspace_id = ? AND path = ?')
        .run(item.file.rel, workspaceId, item.fromPath)
      db.prepare(
        `INSERT INTO file_tombstones (workspace_id, path, hash, generation, deleted_at, reason)
         VALUES (?, ?, ?, ?, ?, 'renamed')
         ON CONFLICT(workspace_id, path) DO UPDATE SET
           hash = excluded.hash, generation = excluded.generation,
           deleted_at = excluded.deleted_at, reason = 'renamed'`)
        .run(workspaceId, item.fromPath, item.hash, generation, now)
    }

    // -- 5. Write file rows; re-parse only what actually changed -------------
    const parsedFiles: ParsedFile[] = []
    const clearFileGraph = (fileId: number): void => {
      db.prepare('DELETE FROM symbols WHERE file_id = ?').run(fileId)
      db.prepare('DELETE FROM file_refs WHERE file_id = ?').run(fileId)
      db.prepare('DELETE FROM file_imports WHERE file_id = ?').run(fileId)
      db.prepare('DELETE FROM search_rows WHERE workspace_id = ? AND file_id = ?')
        .run(workspaceId, fileId)
    }

    for (const file of change.added) {
      const payload = change.addedContent.get(file.rel)
      if (payload === undefined) { result.skipped += 1; continue }
      const parsed = parseFile(file.rel, file.ext, payload.content)
      const info = insertFile.run(
        workspaceId, file.rel, file.repoId, file.checkoutId, file.ext, parsed.lang,
        file.size, file.mtime, payload.hash, parsed.loc, now, generation)
      const fileId = Number(info.lastInsertRowid)
      parsedFiles.push({ ...parsed, fileId })
      result.reparsed += 1
      if (parsed.lang !== null) result.parsed += 1
      affected.add(fileId)
    }

    for (const item of change.renamed) {
      const parsed = parseFile(item.file.rel, item.file.ext, item.content)
      updateFile.run(
        item.file.rel, item.file.repoId, item.file.checkoutId, item.file.ext, parsed.lang,
        item.file.size, item.file.mtime, item.hash, parsed.loc, now, generation, item.id)
      clearFileGraph(item.id)
      parsedFiles.push({ ...parsed, fileId: item.id })
      result.reparsed += 1
      if (parsed.lang !== null) result.parsed += 1
      affected.add(item.id)
    }

    for (const item of change.modified) {
      if (item.content === null) {
        // Byte-identical, only touched: refresh stat fields. No re-parse.
        db.prepare('UPDATE files SET size = ?, mtime = ?, generation = ? WHERE id = ?')
          .run(item.file.size, item.file.mtime, generation, item.id)
        continue
      }
      const parsed = parseFile(item.file.rel, item.file.ext, item.content)
      updateFile.run(
        item.file.rel, item.file.repoId, item.file.checkoutId, item.file.ext, parsed.lang,
        item.file.size, item.file.mtime, item.hash, parsed.loc, now, generation, item.id)
      clearFileGraph(item.id)
      parsedFiles.push({ ...parsed, fileId: item.id })
      result.reparsed += 1
      if (parsed.lang !== null) result.parsed += 1
      affected.add(item.id)
    }

    // -- 6. Symbols, refs, imports and search rows for the parsed files ------
    for (const parsed of parsedFiles) {
      insertSearch.run(
        parsed.rel.split('/').pop() ?? parsed.rel, parsed.rel, 'file',
        workspaceId, null, parsed.fileId)
      for (const sym of parsed.symbols) {
        const info = insertSymbol.run(
          parsed.fileId, sym.name, sym.kind, sym.line, sym.endLine,
          sym.exported ? 1 : 0, sym.container)
        insertSearch.run(
          sym.name, parsed.rel, sym.kind, workspaceId,
          Number(info.lastInsertRowid), parsed.fileId)
      }
      for (const ref of parsed.refs) {
        insertRef.run(
          workspaceId, parsed.fileId, ref.kind, ref.target,
          ref.receiver, ref.from, ref.scope, ref.line)
      }
      for (const imp of parsed.imports) {
        insertImport.run(
          workspaceId, parsed.fileId, imp.specifier, imp.local, imp.imported, imp.line)
      }
    }

    // -- 6b. Widen the affected set by the NAME delta only -------------------
    // A file is only re-resolved when this generation added or removed a
    // definition of a name it actually references.
    if (!forceFull) {
      const newNames = new Set<string>()
      for (const parsed of parsedFiles) for (const sym of parsed.symbols) newNames.add(sym.name)
      const delta: string[] = []
      for (const name of oldNames) if (!newNames.has(name)) delta.push(name)
      for (const name of newNames) if (!oldNames.has(name)) delta.push(name)
      // Chunked: SQLite caps host parameters, and a large rename can move many
      // names at once.
      for (let i = 0; i < delta.length; i += 400) {
        const chunk = delta.slice(i, i + 400)
        const holes = chunk.map(() => '?').join(',')
        for (const row of db.prepare(
          `SELECT DISTINCT src_file AS id FROM edges
            WHERE workspace_id = ? AND src_file IS NOT NULL AND raw_target IN (${holes})`)
          .all(workspaceId, ...chunk) as unknown as Array<{ id: number }>) affected.add(row.id)
      }
    }

    // -- 7. Replay ownership onto any row that had to be recreated -----------
    db.prepare(
      `INSERT INTO file_owner (file_id, agent_id, action, at)
       SELECT f.id, p.agent_id, p.action, p.at
         FROM path_owner p JOIN files f
           ON f.workspace_id = p.workspace_id AND f.path = p.path
        WHERE p.workspace_id = ?
          AND f.id NOT IN (SELECT file_id FROM file_owner)`)
      .run(workspaceId)

    // -- 8. Recompute edges for the affected set -----------------------------
    resolveEdges(db, workspaceId, affected)
    result.reresolved = affected.size

    // -- 9. Reconcile search rows whose owner no longer exists ---------------
    // Legacy migration deliberately preserved historical rows; this is where
    // the ones whose file or symbol has since disappeared are removed for real.
    db.prepare(
      `DELETE FROM search_rows
        WHERE workspace_id = ?
          AND ((file_id IS NOT NULL AND file_id NOT IN (SELECT id FROM files))
            OR (symbol_id IS NOT NULL AND symbol_id NOT IN (SELECT id FROM symbols)))`)
      .run(workspaceId)

    result.files = Number((db.prepare(
      'SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
      .get(workspaceId) as { n: number }).n)
    result.symbols = Number((db.prepare(
      `SELECT COUNT(*) AS n FROM symbols s JOIN files f ON f.id = s.file_id
        WHERE f.workspace_id = ?`).get(workspaceId) as { n: number }).n)
    const totals = db.prepare(
      `SELECT COUNT(*) AS edges,
              SUM(CASE WHEN resolved = 0 AND ambiguous = 0 THEN 1 ELSE 0 END) AS unresolved,
              SUM(CASE WHEN ambiguous = 1 THEN 1 ELSE 0 END) AS ambiguous
         FROM edges WHERE workspace_id = ?`).get(workspaceId) as
      { edges: number; unresolved: number | null; ambiguous: number | null }
    result.edges = Number(totals.edges)
    result.unresolved = Number(totals.unresolved ?? 0)
    result.ambiguous = Number(totals.ambiguous ?? 0)

    db.prepare('UPDATE workspaces SET indexed_at = ? WHERE id = ?').run(now, workspaceId)
    db.prepare(
      `INSERT INTO workspace_index_state
         (workspace_id, generation, git_head, last_success_at, last_failure_at, failure_reason,
          file_count, symbol_count, edge_count, unresolved_count, ambiguous_count)
       VALUES (?, ?, ?, ?, NULL, NULL, ?, ?, ?, ?, ?)
       ON CONFLICT(workspace_id) DO UPDATE SET
         generation = excluded.generation, git_head = excluded.git_head,
         last_success_at = excluded.last_success_at,
         last_failure_at = NULL, failure_reason = NULL,
         file_count = excluded.file_count, symbol_count = excluded.symbol_count,
         edge_count = excluded.edge_count, unresolved_count = excluded.unresolved_count,
         ambiguous_count = excluded.ambiguous_count`)
      .run(workspaceId, generation, gitHead, now,
        result.files, result.symbols, result.edges, result.unresolved, result.ambiguous)

    // The COMMIT is the publish. Until it returns every reader still sees
    // generation N-1 in full; after it returns they all see generation N.
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    // Recorded OUTSIDE the rolled-back transaction, so the checkpoint honestly
    // reports the last good generation plus why the newer attempt did not
    // publish. The active index is unchanged.
    try {
      db.prepare(
        `INSERT INTO workspace_index_state (workspace_id, generation, last_failure_at, failure_reason)
         VALUES (?, 0, ?, ?)
         ON CONFLICT(workspace_id) DO UPDATE SET
           last_failure_at = excluded.last_failure_at,
           failure_reason = excluded.failure_reason`)
        .run(workspaceId, now, String(error instanceof Error ? error.message : error).slice(0, 500))
    } catch { /* the checkpoint note is best effort; the throw below is not */ }
    throw error
  }

  // The git view is read after the graph commits: a workspace's branch,
  // worktrees and dirty set are part of what "current" means.
  try { storeGit(db, workspaceId, readGit(absRoot)) } catch { /* not a repo, or git absent */ }

  result.ms = Date.now() - started
  return result
}

interface RefRow {
  file_id: number
  kind: string
  target: string
  receiver: string | null
  from_name: string | null
  scope: string
  line: number
}

interface ImportRow {
  file_id: number
  specifier: string
  local_name: string | null
  imported_name: string | null
  line: number
}

/**
 * Recompute every edge whose source file is in `affected`, from the PERSISTED
 * parse output. Nothing is read from disk and nothing is re-parsed here — that
 * is the entire reason `file_refs` and `file_imports` exist.
 */
function resolveEdges(db: DatabaseSync, workspaceId: string, affected: Set<number>): void {
  const live = new Set((db.prepare('SELECT id FROM files WHERE workspace_id = ?')
    .all(workspaceId) as unknown as Array<{ id: number }>).map(row => row.id))
  for (const id of [...affected]) if (!live.has(id)) affected.delete(id)
  if (affected.size === 0) return

  const list = [...affected].join(',')
  db.prepare(`DELETE FROM edges WHERE workspace_id = ? AND src_file IN (${list})`).run(workspaceId)

  const insertEdge = db.prepare(
    `INSERT INTO edges (workspace_id, kind, src_symbol, src_file, dst_symbol, dst_file,
                        raw_target, resolved, line, ambiguous, candidates)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)

  const fileRows = db.prepare('SELECT id, path FROM files WHERE workspace_id = ?')
    .all(workspaceId) as unknown as Array<{ id: number; path: string }>
  const relById = new Map(fileRows.map(row => [row.id, row.path]))
  const idByRel = new Map(fileRows.map(row => [row.path, row.id]))
  const known = new Set(idByRel.keys())

  // Import bindings for the affected files, pointed at real file ids.
  const importRows = db.prepare(
    `SELECT file_id, specifier, local_name, imported_name, line FROM file_imports
      WHERE workspace_id = ? AND file_id IN (${list})`)
    .all(workspaceId) as unknown as ImportRow[]
  const bindingsByFile = new Map<number, Map<string, ResolvedBinding>>()
  const importTargets = new Set<number>()
  const targetOf = (fileId: number, specifier: string): number | null => {
    const fromRel = relById.get(fileId)
    if (fromRel === undefined) return null
    const targetRel = resolveImport(fromRel, specifier, known)
    return targetRel === null ? null : idByRel.get(targetRel) ?? null
  }
  for (const row of importRows) {
    const targetFileId = targetOf(row.file_id, row.specifier)
    if (targetFileId !== null) importTargets.add(targetFileId)
    if (row.local_name === null) continue
    let map = bindingsByFile.get(row.file_id)
    if (map === undefined) { map = new Map(); bindingsByFile.set(row.file_id, map) }
    map.set(row.local_name, {
      local: row.local_name,
      imported: row.imported_name ?? row.local_name,
      targetFileId,
    })
  }

  // Symbols are loaded only for files resolution can actually reach: the
  // affected files and the modules they import.
  const needed = new Set<number>([...affected, ...importTargets])
  const symbolsByFile = new Map<number, Map<string, SymbolRow[]>>()
  if (needed.size > 0) {
    for (const row of db.prepare(
      `SELECT id, file_id, line, name, exported, container FROM symbols
        WHERE file_id IN (${[...needed].join(',')})`).all() as unknown as
      Array<{ id: number; file_id: number; line: number; name: string; exported: number; container: string | null }>) {
      let byName = symbolsByFile.get(row.file_id)
      if (byName === undefined) { byName = new Map(); symbolsByFile.set(row.file_id, byName) }
      const entry: SymbolRow = {
        id: row.id, fileId: row.file_id, line: row.line, name: row.name,
        exported: row.exported === 1, container: row.container,
      }
      const bucket = byName.get(row.name)
      if (bucket) bucket.push(entry); else byName.set(row.name, [entry])
    }
  }

  // Workspace-wide UNIQUENESS only. One aggregate query, and deliberately not
  // a list: uniqueness is the single global fact the resolver may act on.
  const globalByName = new Map<string, { count: number; symbolId: number; fileId: number }>()
  for (const row of db.prepare(
    `SELECT s.name AS name, COUNT(*) AS count, MIN(s.id) AS symbolId, MIN(s.file_id) AS fileId
       FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE f.workspace_id = ? GROUP BY s.name`).all(workspaceId) as unknown as
    Array<{ name: string; count: number; symbolId: number; fileId: number }>) {
    globalByName.set(row.name, {
      count: Number(row.count), symbolId: row.symbolId, fileId: row.fileId,
    })
  }
  const context: ResolveContext = { symbolsByFile, bindingsByFile, globalByName }

  // Markdown link resolution needs the document basename map.
  const byBasename = new Map<string, string[]>()
  for (const rel of known) {
    if (!rel.toLowerCase().endsWith('.md')) continue
    const base = (rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase()
    const bucket = byBasename.get(base)
    if (bucket) bucket.push(rel); else byBasename.set(base, [rel])
  }

  // `defines`: file -> its own symbols.
  for (const fileId of affected) {
    const byName = symbolsByFile.get(fileId)
    if (byName === undefined) continue
    for (const bucket of byName.values()) {
      for (const symbol of bucket) {
        insertEdge.run(workspaceId, 'defines', null, fileId, symbol.id, null, null, 1, symbol.line, 0, 1)
      }
    }
  }

  // `imports`: one edge per (file, specifier), not per bound name.
  const emitted = new Set<string>()
  for (const row of importRows) {
    const key = `${row.file_id} ${row.specifier}`
    if (emitted.has(key)) continue
    emitted.add(key)
    const targetId = targetOf(row.file_id, row.specifier)
    insertEdge.run(
      workspaceId, 'imports', null, row.file_id, null, targetId,
      row.specifier, targetId === null ? 0 : 1, row.line, 0, targetId === null ? 0 : 1)
  }

  // Reference edges, scope by scope.
  const refRows = db.prepare(
    `SELECT file_id, kind, target, receiver, from_name, scope, line FROM file_refs
      WHERE workspace_id = ? AND file_id IN (${list})`)
    .all(workspaceId) as unknown as RefRow[]
  const tagIds = new Map<string, number>()

  for (const ref of refRows) {
    if (ref.scope === 'md-link') {
      const fromRel = relById.get(ref.file_id)
      if (fromRel === undefined) continue
      const targetRel = resolveMarkdownTarget(
        fromRel, ref.target, ref.receiver === 'wiki', known, byBasename)
      const targetId = targetRel === null ? null : idByRel.get(targetRel) ?? null
      insertEdge.run(
        workspaceId, 'references', null, ref.file_id, null, targetId,
        ref.target, targetId === null ? 0 : 1, ref.line, 0, targetId === null ? 0 : 1)
      continue
    }
    if (ref.scope === 'md-tag') {
      // A tag is a shared concept node: one symbol, many documents attached.
      const name = `#${ref.target}`
      let tagId = tagIds.get(ref.target)
      if (tagId === undefined) {
        const existing = db.prepare(
          `SELECT s.id AS id FROM symbols s JOIN files f ON f.id = s.file_id
            WHERE f.workspace_id = ? AND s.name = ? LIMIT 1`)
          .get(workspaceId, name) as { id: number } | undefined
        tagId = existing !== undefined
          ? existing.id
          : Number(db.prepare(
              `INSERT INTO symbols (file_id, name, kind, line, end_line, exported, container)
               VALUES (?, ?, 'constant', 1, 1, 1, NULL)`).run(ref.file_id, name).lastInsertRowid)
        tagIds.set(ref.target, tagId)
      }
      insertEdge.run(
        workspaceId, 'references', null, ref.file_id, tagId, null, name, 1, ref.line, 0, 1)
      continue
    }
    const resolution = resolveReference(context, {
      fileId: ref.file_id, target: ref.target,
      receiver: ref.receiver, from: ref.from_name,
    })
    // The edge STARTS at the enclosing symbol when we can name it in this file.
    const source = ref.from_name === null ? null : resolveReference(context, {
      fileId: ref.file_id, target: ref.from_name, receiver: null, from: null,
    })
    insertEdge.run(
      workspaceId, ref.kind,
      source?.symbolId ?? null, ref.file_id,
      resolution.symbolId, null,
      ref.target,
      resolution.symbolId === null ? 0 : 1,
      ref.line,
      resolution.kind === 'ambiguous' ? 1 : 0,
      resolution.candidates)
  }
}
