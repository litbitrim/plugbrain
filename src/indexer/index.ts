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
import { readFileSync, statSync } from 'node:fs'
import { extname, resolve as resolvePath } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { readGit, storeGit } from './git.ts'
import { resolveMarkdownTarget } from './markdown.ts'
import {
  classify, everyNth, hashOf, insideNoteRoot, PARSE_VERSION, parseFile, resolveImport, walk, walkRoots,
  type IndexResult, type IndexRoot, type ParsedFile, type ScanProgress, type StoredFile,
} from './scan.ts'
import {
  resolveReference,
  type ResolveContext, type ResolvedBinding, type SymbolRow,
} from './resolve.ts'

export type { ChangeCounts, IndexResult, IndexRoot } from './scan.ts'

/**
 * One progress tick from a running index.
 *
 * A tick is a fact about work already done, never a prediction: `total` is 0
 * while the walk still does not know how many files there are, and `symbols`
 * and `edges` stay null until the database has actually been asked. A progress
 * display that invents a percentage from nothing is worse than no display.
 */
export interface IndexTick {
  phase: 'scan' | 'classify' | 'write' | 'resolve' | 'publish'
  scanned: number
  total: number
  /** Files written into this generation so far. */
  processed: number
  symbols: number | null
  edges: number | null
  generation: number
  mode: 'full' | 'incremental'
}

/** Called by `indexWorkspace` as it moves through its phases. */
export type IndexProgress = (tick: IndexTick) => void

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

/**
 * A planet inventories every discovered checkout, but only explicitly selected
 * checkout IDs participate in its live graph. Keep this lookup local instead
 * of importing `planet.ts`: planet registration already imports this indexer,
 * and a runtime cycle would make a safety boundary depend on module order.
 *
 * `null` means a plain (non-planet) workspace, whose whole root remains in
 * scope. `[]` means a planet with no persisted selection (or an older database
 * before that metadata is created), and is intentionally fail-closed.
 */
function activeCheckoutIds(db: DatabaseSync, workspaceId: string): string[] | null {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (planet === undefined) return null
  const tableRows = db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (?, ?)")
    .all('planet_index_selections', 'planet_index_checkout_selections') as
    unknown as Array<{ name: string }>
  const tableNames = new Set(tableRows.map(row => row.name))
  if (!tableNames.has('planet_index_selections') || !tableNames.has('planet_index_checkout_selections')) {
    return []
  }
  const configured = db.prepare(
    'SELECT 1 AS present FROM planet_index_selections WHERE planet_id = ?').get(planet.id)
  if (configured === undefined) return []
  return (db.prepare(
    `SELECT c.id FROM checkouts c
       JOIN planet_index_checkout_selections s
         ON s.planet_id = c.planet_id AND s.checkout_id = c.id
      WHERE c.planet_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(planet.id) as unknown as Array<{ id: string }>)
    .map(row => row.id)
}

function activeFileScope(
  db: DatabaseSync,
  workspaceId: string,
  checkoutIds: string[] | null,
  checkoutColumn = 'checkout_id',
  pathColumn = 'path',
): { sql: string; params: string[] } {
  if (checkoutIds === null) return { sql: '1 = 1', params: [] }
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (planet === undefined) return { sql: '1 = 1', params: [] }
  // A pre-Planet whole-root index may have left Code rows unattributed. Null
  // attribution is live only for registered note roots, never a blanket pass
  // for historical Code paths that have not been tombstoned yet.
  const notes = `(${checkoutColumn} IS NULL AND EXISTS (
    SELECT 1 FROM note_roots n
     WHERE n.planet_id = ?
       AND (${pathColumn} = n.rel_path OR
         (n.kind <> 'file' AND substr(${pathColumn}, 1, length(n.rel_path) + 1) = n.rel_path || '/'))
  ))`
  if (checkoutIds.length === 0) return { sql: notes, params: [planet.id] }
  return {
    sql: `(${checkoutColumn} IN (${checkoutIds.map(() => '?').join(', ')}) OR ${notes})`,
    params: [...checkoutIds, planet.id],
  }
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
  options: { full?: boolean; roots?: IndexRoot[]; onProgress?: IndexProgress } = {},
): IndexResult {
  const started = Date.now()
  const progress = options.onProgress
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

  const scanned: ScanProgress = (seen, total) => progress?.({
    phase: 'scan', scanned: seen, total, processed: 0, symbols: null, edges: null,
    generation: state.generation, mode: forceFull ? 'full' : 'incremental',
  })
  const disk = options.roots === undefined
    ? walk(absRoot, { onProgress: scanned })
    : walkRoots(options.roots, { onProgress: scanned })
  progress?.({
    phase: 'scan', scanned: disk.length, total: disk.length, processed: 0,
    symbols: null, edges: null, generation: state.generation,
    mode: forceFull ? 'full' : 'incremental',
  })
  const stored = forceFull
    ? []
    : db.prepare(
        `SELECT id, path, size, mtime, hash, repo_id AS repoId, checkout_id AS checkoutId,
                parse_version AS parseVersion
           FROM files WHERE workspace_id = ?`)
        .all(workspaceId) as unknown as StoredFile[]

  const change = classify(disk, stored, {
    onProgress: (seen, total) => progress?.({
      phase: 'classify', scanned: seen, total, processed: 0, symbols: null, edges: null,
      generation: state.generation, mode: forceFull ? 'full' : 'incremental',
    }),
  })
  const touched = change.added.length + change.modified.length
    + change.renamed.length + change.deleted.length

  // The basenames that appeared or vanished. A wiki link addresses a note by
  // NAME, so these are exactly the names whose resolvability changed.
  const noteNameDelta = new Set<string>()
  for (const rel of [
    ...change.added.map(file => file.rel),
    ...change.renamed.map(item => item.file.rel),
    ...change.deleted.map(row => row.path),
  ]) {
    if (!rel.toLowerCase().endsWith('.md')) continue
    noteNameDelta.add((rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase())
  }

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

  const writers = writersFor(db, workspaceId)

  // Everything that will be written this generation. Known before the write
  // phase begins, so a percentage is a division and not a guess.
  const writeTotal = change.added.length + change.renamed.length + change.modified.length
  let written = 0
  const writeTick = (): void => {
    written += 1
    everyNth(written, writeTotal, (done, total) => progress?.({
      phase: 'write',
      scanned: disk.length,
      total,
      processed: done,
      symbols: null,
      edges: null,
      generation,
      mode: forceFull ? 'full' : 'incremental',
    }))
  }

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
    // Writes parse output directly into SQLite without buffering in memory,
    // so indexing a 100,000+ file workspace runs in constant heap space.
    const newNames = new Set<string>()

    for (const file of change.added) {
      let content: string
      try { content = readFileSync(file.abs, 'utf8') } catch { result.skipped += 1; continue }
      const parsed = parseFile(file.rel, file.ext, content)
      const info = writers.insertFile.run(
        workspaceId, file.rel, file.repoId, file.checkoutId, file.ext, parsed.lang,
        file.size, file.mtime, file.hash, parsed.loc, now, generation, PARSE_VERSION,
        parsed.processingStatus, parsed.processingReason)
      const fileId = Number(info.lastInsertRowid)
      const noteText = file.checkoutId === null ? content : null
      writers.writeParse({ ...parsed, fileId }, workspaceId, noteText)
      for (const sym of parsed.symbols) newNames.add(sym.name)
      affected.add(fileId)
      result.reparsed += 1
      if (parsed.lang !== null) result.parsed += 1
      writeTick()
    }

    for (const item of change.renamed) {
      let content: string
      try { content = readFileSync(item.file.abs, 'utf8') } catch { result.skipped += 1; continue }
      const parsed = parseFile(item.file.rel, item.file.ext, content)
      writers.updateFile.run(
        item.file.rel, item.file.repoId, item.file.checkoutId, item.file.ext, parsed.lang,
        item.file.size, item.file.mtime, item.hash, parsed.loc, now, generation,
        PARSE_VERSION, parsed.processingStatus, parsed.processingReason, item.id)
      writers.clearFileGraph(item.id)
      const noteText = item.file.checkoutId === null ? content : null
      writers.writeParse({ ...parsed, fileId: item.id }, workspaceId, noteText)
      for (const sym of parsed.symbols) newNames.add(sym.name)
      affected.add(item.id)
      result.reparsed += 1
      if (parsed.lang !== null) result.parsed += 1
    }

    for (const item of change.modified) {
      if (!item.reparse) {
        // Byte-identical, only touched: refresh stat fields. No re-parse. The
        // parse version is restated because reaching this branch means it is
        // already current.
        db.prepare('UPDATE files SET size = ?, mtime = ?, generation = ?, parse_version = ? WHERE id = ?')
          .run(item.file.size, item.file.mtime, generation, PARSE_VERSION, item.id)
        writeTick()
        continue
      }
      let content: string
      try { content = readFileSync(item.file.abs, 'utf8') } catch { result.skipped += 1; continue }
      const parsed = parseFile(item.file.rel, item.file.ext, content)
      writers.updateFile.run(
        item.file.rel, item.file.repoId, item.file.checkoutId, item.file.ext, parsed.lang,
        item.file.size, item.file.mtime, item.hash, parsed.loc, now, generation,
        PARSE_VERSION, parsed.processingStatus, parsed.processingReason, item.id)
      writers.clearFileGraph(item.id)
      const noteText = item.file.checkoutId === null ? content : null
      writers.writeParse({ ...parsed, fileId: item.id }, workspaceId, noteText)
      for (const sym of parsed.symbols) newNames.add(sym.name)
      affected.add(item.id)
      result.reparsed += 1
      if (parsed.lang !== null) result.parsed += 1
    }

    // -- 6. Widen the affected set by the NAME delta only -------------------
    // A file is only re-resolved when this generation added or removed a
    // definition of a name it actually references.
    if (!forceFull) {
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
    progress?.({
      phase: 'resolve', scanned: disk.length, total: writeTotal, processed: writeTotal,
      symbols: null, edges: null, generation, mode: forceFull ? 'full' : 'incremental',
    })
    resolveEdges(db, workspaceId, affected)
    result.reresolved = affected.size

    // -- 8b. Resolve note links ---------------------------------------------
    // A note appearing or disappearing changes whether OTHER notes' wiki links
    // point anywhere, so this looks at the changed files AND at every link whose
    // target name was added or removed this generation.
    resolveNoteLinks(db, workspaceId, affected, noteNameDelta)

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

    progress?.({
      phase: 'publish', scanned: disk.length, total: writeTotal, processed: writeTotal,
      symbols: result.symbols, edges: result.edges, generation,
      mode: forceFull ? 'full' : 'incremental',
    })
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

/**
 * Resolve every wiki link that could have changed meaning this generation.
 *
 * Two buckets, and both are needed:
 *   - links WRITTEN BY a changed file (its own text moved),
 *   - links ANYWHERE whose target name appeared or disappeared (a note that
 *     now exists turns every `[[it]]` in the vault into a real edge).
 *
 * Resolution prefers a NOTE over any other document of the same name. A wiki
 * link is a note-to-note reference first; `[[index]]` must not silently bind to
 * some bundled README inside a checkout. When several notes share the name, the
 * link is marked `ambiguous` and points nowhere — refusing to guess is the
 * whole reason the status is a column rather than a boolean.
 */
function resolveNoteLinks(
  db: DatabaseSync, workspaceId: string,
  affected: Set<number>, nameDelta: Set<string>, corpus?: FileCorpusRow[],
): void {
  const rows = corpus ?? loadCorpus(db, workspaceId)
  if (rows.length === 0) return
  const idByRel = new Map(rows.map(row => [row.path, row.id]))

  // Every file with no checkout IS a note: the note scope is the only index
  // root that does not belong to a repository. One pass builds both buckets —
  // notes first, then all documents as the fallback.
  const noteBasenames = new Map<string, string[]>()
  const anyBasenames = new Map<string, string[]>()
  const noteIdByBasename = new Map<string, number>()
  const addTo = (bucket: Map<string, string[]>, key: string, rel: string): void => {
    const list = bucket.get(key)
    if (list) list.push(rel); else bucket.set(key, [rel])
  }
  for (const row of rows) {
    if (!row.path.toLowerCase().endsWith('.md')) continue
    const base = (row.path.split('/').pop() ?? row.path).replace(/\.md$/i, '').toLowerCase()
    addTo(anyBasenames, base, row.path)
    if (row.checkoutId === null) {
      addTo(noteBasenames, base, row.path)
      noteIdByBasename.set(base, row.id)
    }
  }

  const want = [...affected]
  for (const name of nameDelta) {
    const id = noteIdByBasename.get(name)
    if (id !== undefined) want.push(id)
  }
  if (want.length === 0) return

  const update = db.prepare('UPDATE note_links SET status = ?, dst_file = ? WHERE id = ?')
  const seen = new Set<number>()
  const wanted = [...new Set(want)]
  for (let i = 0; i < wanted.length; i += 400) {
    const chunk = wanted.slice(i, i + 400)
    const holes = chunk.map(() => '?').join(',')
    const links = db.prepare(
      `SELECT id, file_id AS fileId, target FROM note_links
        WHERE workspace_id = ? AND file_id IN (${holes})`).all(workspaceId, ...chunk) as
      unknown as Array<{ id: number; fileId: number; target: string }>
    for (const link of links) {
      if (seen.has(link.id)) continue
      seen.add(link.id)
      const key = link.target.toLowerCase().replace(/\.md$/, '')
      const preferred = noteBasenames.get(key) ?? []
      const hits = preferred.length > 0 ? preferred : (anyBasenames.get(key) ?? [])
      const dstRel = hits.length === 0 ? null : hits[0]
      const dstId = dstRel === null ? null : idByRel.get(dstRel) ?? null
      const status = dstId === null ? 'missing'
        : dstId === link.fileId ? 'self'
        : hits.length > 1 ? 'ambiguous'
        : 'resolved'
      update.run(status, status === 'resolved' || status === 'self' ? dstId : null, link.id)
    }
  }
}

/** The prepared statements that write one file's graph. */
interface FileWriters {
  insertFile: ReturnType<DatabaseSync['prepare']>
  updateFile: ReturnType<DatabaseSync['prepare']>
  clearFileGraph: (fileId: number) => void
  writeParse: (parsed: ParsedFile, workspaceId: string, noteText: string | null) => void
}

/**
 * All the statements that put ONE parsed file into the store.
 *
 * They live in a function rather than inside `indexWorkspace` because a second
 * caller needs exactly the same writes: saving a note has to refresh that one
 * note, and a copy of these statements would be a copy that can drift.
 */
function writersFor(db: DatabaseSync, workspaceId: string): FileWriters {
  const insertFile = db.prepare(
    `INSERT INTO files (workspace_id, path, repo_id, checkout_id, ext, lang, size, mtime, hash, loc, indexed_at, generation, parse_version, processing_status, processing_reason)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const updateFile = db.prepare(
    `UPDATE files SET path = ?, repo_id = ?, checkout_id = ?, ext = ?, lang = ?, size = ?, mtime = ?, hash = ?,
            loc = ?, indexed_at = ?, generation = ?, parse_version = ?, processing_status = ?, processing_reason = ? WHERE id = ?`)
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
  const insertProperty = db.prepare(
    `INSERT INTO note_properties (workspace_id, file_id, key, value, raw, ordinal, is_link, line)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
  const insertNoteLink = db.prepare(
    `INSERT INTO note_links (workspace_id, file_id, target, alias, section, embed, source, status, dst_file, line)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'missing', NULL, ?)`)
  const insertNoteTag = db.prepare(
    `INSERT INTO note_tags (workspace_id, file_id, tag, source) VALUES (?, ?, ?, ?)
     ON CONFLICT(file_id, tag) DO UPDATE SET source = excluded.source`)
  const insertNoteBody = db.prepare(
    `INSERT INTO note_body (workspace_id, file_id, path, text) VALUES (?, ?, ?, ?)
     ON CONFLICT(file_id) DO UPDATE SET path = excluded.path, text = excluded.text`)

  const clearFileGraph = (fileId: number): void => {
    db.prepare('DELETE FROM symbols WHERE file_id = ?').run(fileId)
    db.prepare('DELETE FROM file_refs WHERE file_id = ?').run(fileId)
    db.prepare('DELETE FROM file_imports WHERE file_id = ?').run(fileId)
    db.prepare('DELETE FROM note_properties WHERE file_id = ?').run(fileId)
    db.prepare('DELETE FROM note_links WHERE file_id = ?').run(fileId)
    db.prepare('DELETE FROM note_tags WHERE file_id = ?').run(fileId)
    db.prepare('DELETE FROM search_rows WHERE workspace_id = ? AND file_id = ?')
      .run(workspaceId, fileId)
    // Explicit, and not left to the file's ON DELETE CASCADE: this runs for a
    // RE-parse too, where the file row survives. A stale body row would keep
    // answering prose searches with text that no longer exists anywhere.
    db.prepare('DELETE FROM note_body WHERE file_id = ?').run(fileId)
  }

  /**
   * Symbols, refs, imports, frontmatter, links and prose for one parsed file.
   *
   * `noteText` is non-null only for a file that IS a note — a path owned by no
   * checkout. The prose of 100 000 source files is not worth storing, and the
   * prose of the vault is the whole point of M2, so the caller decides and
   * passes the text only in the case that matters.
   */
  const writeParse = (parsed: ParsedFile, workspace: string, noteText: string | null): void => {
    insertSearch.run(
      parsed.rel.split('/').pop() ?? parsed.rel, parsed.rel, 'file',
      workspace, null, parsed.fileId)
    for (const sym of parsed.symbols) {
      const info = insertSymbol.run(
        parsed.fileId, sym.name, sym.kind, sym.line, sym.endLine,
        sym.exported ? 1 : 0, sym.container)
      insertSearch.run(
        sym.name, parsed.rel, sym.kind, workspace,
        Number(info.lastInsertRowid), parsed.fileId)
    }
    for (const ref of parsed.refs) {
      insertRef.run(
        workspace, parsed.fileId, ref.kind, ref.target,
        ref.receiver, ref.from, ref.scope, ref.line)
    }
    for (const imp of parsed.imports) {
      insertImport.run(
        workspace, parsed.fileId, imp.specifier, imp.local, imp.imported, imp.line)
    }
    // Frontmatter and wiki links are written here and resolved later in the same
    // transaction: a link's target may be a file written a moment ago.
    for (const property of parsed.properties) {
      insertProperty.run(
        workspace, parsed.fileId, property.key, property.value, property.raw,
        property.ordinal, property.isLink ? 1 : 0, property.line)
    }
    for (const link of parsed.links) {
      insertNoteLink.run(
        workspace, parsed.fileId, link.target, link.alias, link.section,
        link.embed ? 1 : 0, link.source, link.line)
    }
    for (const tag of parsed.tags) {
      insertNoteTag.run(workspace, parsed.fileId, tag.tag, tag.source)
    }
    if (noteText !== null) {
      insertNoteBody.run(workspace, parsed.fileId, parsed.rel, noteText)
    }
  }

  return { insertFile, updateFile, clearFileGraph, writeParse }
}

/**
 * Re-index ONE file, in place.
 *
 * A saved note must be current by the time the save returns, and a full planet
 * pass costs tens of seconds. This does the same work as a full pass for a
 * single path — same writes, same resolution, same transaction — and moves the
 * generation, because the graph it publishes really is a new complete graph.
 *
 * Returns false when the path is not indexed yet, so a caller can never mistake
 * "not tracked" for "refreshed".
 */
/**
 * Which index root owns a planet-relative path, or `null` when none does.
 *
 * Read straight from the tables rather than from `planet.ts`, which would make
 * the indexer depend on the module that already depends on it. Longest prefix
 * wins, so a checkout inside a note folder is still attributed to the checkout.
 */
function ownerOf(db: DatabaseSync, workspaceId: string, rel: string):
{ repoId: string | null; checkoutId: string | null } | null {
  const selectedIds = activeCheckoutIds(db, workspaceId)
  const checkouts = selectedIds === null || selectedIds.length === 0 ? [] : db.prepare(
    `SELECT c.id, c.repo_id AS repoId, c.rel_prefix AS relPrefix
       FROM checkouts c JOIN planets p ON p.id = c.planet_id
      WHERE p.workspace_id = ? AND c.retired_at IS NULL
        AND c.id IN (${selectedIds.map(() => '?').join(', ')})`)
    .all(workspaceId, ...selectedIds) as unknown as Array<{ id: string; repoId: string; relPrefix: string }>
  let best: { id: string; repoId: string; relPrefix: string } | null = null
  for (const checkout of checkouts) {
    if (rel !== checkout.relPrefix && !rel.startsWith(`${checkout.relPrefix}/`)) continue
    if (best === null || checkout.relPrefix.length > best.relPrefix.length) best = checkout
  }
  if (best !== null) return { repoId: best.repoId, checkoutId: best.id }

  const notes = db.prepare(
    `SELECT n.rel_path AS relPath, n.kind AS kind
       FROM note_roots n JOIN planets p ON p.id = n.planet_id
      WHERE p.workspace_id = ?`).all(workspaceId) as unknown as
    Array<{ relPath: string; kind: string }>
  // A single-file root is matched exactly; a folder root uses the shared rule,
  // so a dot-folder inside it is NOT owned — the walker would never index a
  // file written there, and a write that lands outside the index is worse than
  // a refused one.
  const owned = notes.some(root => root.kind === 'file'
    ? rel === root.relPath
    : insideNoteRoot(root.relPath, rel))
  return owned ? { repoId: null, checkoutId: null } : null
}

export function refreshFile(db: DatabaseSync, workspaceId: string, relPath: string): boolean {
  const rel = relPath.split('\\').join('/')
  const workspace = db.prepare('SELECT root FROM workspaces WHERE id = ?').get(workspaceId) as
    { root: string } | undefined
  if (workspace === undefined) return false
  const existing = db.prepare(
    'SELECT id, repo_id AS repoId, checkout_id AS checkoutId FROM files WHERE workspace_id = ? AND path = ?')
    .get(workspaceId, rel) as
    { id: number; repoId: string | null; checkoutId: string | null } | undefined

  // A note that does not exist yet in the graph is a normal case: saving a new
  // one must make it visible immediately, not on the next full pass. Resolve
  // ownership even for an existing row: a selection can change after an older
  // full index, and that historic row must not become live again through this
  // narrow refresh path.
  const owner = ownerOf(db, workspaceId, rel)
  if (owner === null) return false

  const abs = resolvePath(workspace.root, ...rel.split('/'))
  let content: string
  let stats: ReturnType<typeof statSync>
  try {
    content = readFileSync(abs, 'utf8')
    stats = statSync(abs)
  } catch {
    // The file is gone: leave the graph alone rather than inventing a deletion
    // here. The next full pass is the place that tombstones it, with the
    // generation and the chronicle entry that a deletion deserves.
    return false
  }

  const now = new Date().toISOString()
  const parsed = parseFile(rel, extname(rel), content)
  const hash = hashOf(content)
  const state = readState(db, workspaceId)
  const generation = state.generation + 1
  const writers = writersFor(db, workspaceId)
  // Counters for THIS file only, before and after. The planet-wide totals are
  // then moved by the difference instead of being recounted: `COUNT(*)` over
  // 183 429 files, 3.2 million symbols and 11.1 million edges costs ~0.8 s and
  // a note is saved by a human waiting for it. A save that changes one note
  // changes the totals by the size of one note.
  //
  // Nothing here has to be exact forever: the next index run publishes its
  // counts from the same three queries, so any drift is corrected by the pass
  // that follows. A counter that is briefly one off beats a save that hangs.
  const countSymbols = db.prepare('SELECT COUNT(*) AS c FROM symbols WHERE file_id = ?')
  const countEdges = db.prepare('SELECT COUNT(*) AS c FROM edges WHERE workspace_id = ? AND src_file = ?')
  const beforeSymbols = existing === undefined ? 0 : Number((countSymbols.get(existing.id) as { c: number }).c)
  const beforeEdges = existing === undefined ? 0 : Number((countEdges.get(workspaceId, existing.id) as { c: number }).c)
  // The corpus is read once and shared by both resolvers below (see loadCorpus).
  const corpus = loadCorpus(db, workspaceId)

  db.exec('BEGIN IMMEDIATE')
  try {
    let row: { id: number; repoId: string | null; checkoutId: string | null }
    if (existing === undefined) {
      const info = writers.insertFile.run(
        workspaceId, rel, owner?.repoId ?? null, owner?.checkoutId ?? null, extname(rel),
        parsed.lang, stats.size, stats.mtime.toISOString(), hash, parsed.loc, now, generation,
        PARSE_VERSION, parsed.processingStatus, parsed.processingReason)
      row = { id: Number(info.lastInsertRowid), repoId: owner?.repoId ?? null, checkoutId: owner?.checkoutId ?? null }
    } else {
      writers.updateFile.run(
        rel, existing.repoId, existing.checkoutId, extname(rel), parsed.lang, stats.size,
        stats.mtime.toISOString(), hash, parsed.loc, now, generation, PARSE_VERSION,
        parsed.processingStatus, parsed.processingReason, existing.id)
      row = existing
    }
    writers.clearFileGraph(row.id)
    writers.writeParse({ ...parsed, fileId: row.id }, workspaceId,
      row.checkoutId === null ? content : null)
    const affected = new Set<number>([row.id])
    resolveEdges(db, workspaceId, affected, corpus)
    const basename = (rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase()
    resolveNoteLinks(db, workspaceId, affected, new Set([basename]), corpus)

    const afterSymbols = Number((countSymbols.get(row.id) as { c: number }).c)
    const afterEdges = Number((countEdges.get(workspaceId, row.id) as { c: number }).c)
    db.prepare(
      `INSERT INTO workspace_index_state
              (workspace_id, generation, last_success_at, file_count, symbol_count, edge_count)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(workspace_id) DO UPDATE SET
              generation = excluded.generation,
              last_success_at = excluded.last_success_at,
              file_count = file_count + excluded.file_count,
              symbol_count = symbol_count + excluded.symbol_count,
              edge_count = edge_count + excluded.edge_count`)
      .run(workspaceId, generation, now,
        existing === undefined ? 1 : 0,
        afterSymbols - beforeSymbols,
        afterEdges - beforeEdges)
    db.prepare('UPDATE workspaces SET indexed_at = ? WHERE id = ?').run(now, workspaceId)
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
  return true
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
/**
 * The workspace's files, as the link resolvers need them: id, path, and whether
 * the path belongs to a note (no checkout).
 *
 * Loaded ONCE per refresh and handed to both resolvers. On a planet this is
 * 183 000 rows and about 350 ms; loading it twice — once per resolver — was a
 * third of the cost of saving a single note.
 */
export interface FileCorpusRow { id: number; path: string; checkoutId: string | null }

function loadCorpus(db: DatabaseSync, workspaceId: string): FileCorpusRow[] {
  const scope = activeFileScope(db, workspaceId, activeCheckoutIds(db, workspaceId))
  return db.prepare(
    `SELECT id, path, checkout_id AS checkoutId FROM files
      WHERE workspace_id = ? AND ${scope.sql}`)
    .all(workspaceId, ...scope.params) as unknown as FileCorpusRow[]
}

function resolveEdges(
  db: DatabaseSync, workspaceId: string, affected: Set<number>, corpus?: FileCorpusRow[],
): void {
  // Prune ids that no longer exist. A targeted query, not the whole id column:
  // this runs once per save and the workspace may hold 183 000 files.
  const ids = [...affected]
  for (let i = 0; i < ids.length; i += 400) {
    const chunk = ids.slice(i, i + 400)
    const present = new Set((db.prepare(
      `SELECT id FROM files WHERE workspace_id = ? AND id IN (${chunk.map(() => '?').join(',')})`)
      .all(workspaceId, ...chunk) as unknown as Array<{ id: number }>).map(row => row.id))
    for (const id of chunk) if (!present.has(id)) affected.delete(id)
  }
  if (affected.size === 0) return

  const fileRows = corpus ?? loadCorpus(db, workspaceId)
  const relById = new Map(fileRows.map(row => [row.id, row.path]))
  const idByRel = new Map(fileRows.map(row => [row.path, row.id]))
  const known = new Set(idByRel.keys())

  // Markdown link resolution needs the document basename map.
  const byBasename = new Map<string, string[]>()
  for (const rel of known) {
    if (!rel.toLowerCase().endsWith('.md')) continue
    const base = (rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase()
    const bucket = byBasename.get(base)
    if (bucket) bucket.push(rel); else byBasename.set(base, [rel])
  }

  const insertEdge = db.prepare(
    `INSERT INTO edges (workspace_id, kind, src_symbol, src_file, dst_symbol, dst_file,
                        raw_target, resolved, line, ambiguous, candidates)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)

  const fileScope = activeFileScope(
    db, workspaceId, activeCheckoutIds(db, workspaceId), 'f.checkout_id', 'f.path')
  const globalLookupStmt = db.prepare(
    `SELECT COUNT(*) AS count, MIN(s.id) AS symbolId, MIN(s.file_id) AS fileId
       FROM symbols s JOIN files f ON f.id = s.file_id
       WHERE f.workspace_id = ? AND s.name = ? AND ${fileScope.sql}`)

  const globalCache = new Map<string, { count: number; symbolId: number; fileId: number }>()
  const getGlobal = (name: string) => {
    let hit = globalCache.get(name)
    if (hit === undefined) {
      const row = globalLookupStmt.get(workspaceId, name, ...fileScope.params) as
        { count: number; symbolId: number | null; fileId: number | null } | undefined
      hit = {
        count: Number(row?.count ?? 0),
        symbolId: row?.symbolId ?? 0,
        fileId: row?.fileId ?? 0,
      }
      globalCache.set(name, hit)
    }
    return hit
  }
  const globalByNameProxy = {
    get: (target: string) => {
      const g = getGlobal(target)
      return g.count === 0 ? undefined : g
    },
  } as unknown as Map<string, { count: number; symbolId: number; fileId: number }>

  const tagIds = new Map<string, number>()
  const targetOf = (fileId: number, specifier: string): number | null => {
    const fromRel = relById.get(fileId)
    if (fromRel === undefined) return null
    const targetRel = resolveImport(fromRel, specifier, known)
    return targetRel === null ? null : idByRel.get(targetRel) ?? null
  }

  const affectedList = [...affected]
  for (let c = 0; c < affectedList.length; c += 200) {
    const chunk = affectedList.slice(c, c + 200)
    const list = chunk.join(',')

    db.prepare(`DELETE FROM edges WHERE workspace_id = ? AND src_file IN (${list})`).run(workspaceId)

    // Import bindings for the chunk
    const importRows = db.prepare(
      `SELECT file_id, specifier, local_name, imported_name, line FROM file_imports
        WHERE workspace_id = ? AND file_id IN (${list})`)
      .all(workspaceId) as unknown as ImportRow[]
    const bindingsByFile = new Map<number, Map<string, ResolvedBinding>>()
    const importTargets = new Set<number>()
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

    // Symbols loaded only for chunk files and their direct import targets
    const needed = new Set<number>([...chunk, ...importTargets])
    const symbolsByFile = new Map<number, Map<string, SymbolRow[]>>()
    if (needed.size > 0) {
      const neededList = [...needed].join(',')
      for (const row of db.prepare(
        `SELECT id, file_id, line, name, exported, container FROM symbols
          WHERE file_id IN (${neededList})`).all() as unknown as
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

    const context: ResolveContext = { symbolsByFile, bindingsByFile, globalByName: globalByNameProxy }

    // `defines`: file -> its own symbols
    for (const fileId of chunk) {
      const byName = symbolsByFile.get(fileId)
      if (byName === undefined) continue
      for (const bucket of byName.values()) {
        for (const symbol of bucket) {
          insertEdge.run(workspaceId, 'defines', null, fileId, symbol.id, null, null, 1, symbol.line, 0, 1)
        }
      }
    }

    // `imports`: one edge per (file, specifier)
    const emitted = new Set<string>()
    for (const row of importRows) {
      const key = `${row.file_id}\u0000${row.specifier}`
      if (emitted.has(key)) continue
      emitted.add(key)
      const targetId = targetOf(row.file_id, row.specifier)
      insertEdge.run(
        workspaceId, 'imports', null, row.file_id, null, targetId,
        row.specifier, targetId === null ? 0 : 1, row.line, 0, targetId === null ? 0 : 1)
    }

    // Reference edges
    const refRows = db.prepare(
      `SELECT file_id, kind, target, receiver, from_name, scope, line FROM file_refs
        WHERE workspace_id = ? AND file_id IN (${list})`)
      .all(workspaceId) as unknown as RefRow[]

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
}
