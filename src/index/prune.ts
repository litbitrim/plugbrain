/**
 * Pruning: removing the rows of checkouts that are no longer indexed.
 *
 * A planet keeps the rows of every checkout it ever indexed. When an operator
 * narrows the selection, or a worktree vanishes and its checkout is retired,
 * those rows leave every projection at once (the active file scope filters
 * them), but they stay on disk and every later write pays for them. On the
 * live planet that was 260 000 files, 4.7 million symbols and 16.4 million
 * edges from 66 checkouts, 7.3 GB for a handful of current ones.
 *
 * The indexer is the wrong tool for this cleanup, for two reasons:
 *
 *   - It deletes one file row at a time and lets the foreign keys cascade.
 *     `edges.src_file` and `edges.dst_file` are indexed only behind
 *     `workspace_id`, and a cascade looks a child up by the key alone, so every
 *     deleted file paid two scans of the edge table: 700 ms each on the live
 *     store, about four days for the backlog.
 *   - It writes a tombstone per file. A tombstone says "this file was
 *     deleted", and these files were not deleted: they stopped being part of
 *     the view. A quarter of a million tombstones would also flood every city
 *     payload, which ships the tombstone list.
 *
 * So pruning deletes set-wise, one bounded batch per transaction, and truncates
 * the WAL between batches so the disk never has to hold a second copy of the
 * index. Foreign-key enforcement is off for the run and the actions the schema
 * declares (cascade, set null) are replayed explicitly. They are read from
 * `PRAGMA foreign_key_list`, not copied into this file, so a table added later
 * is covered without anybody remembering it here. Every child lookup must go
 * through an index that leads with the key, or with the workspace and then the
 * key; the query plan is checked before the first batch, and a child that would
 * be scanned is refused, because that is the four-day problem again.
 * `PRAGMA foreign_key_check` over every child table closes the run, and an
 * orphan fails it loudly.
 *
 * Ownership survives, as it does in the indexer: `file_owner` is mirrored onto
 * `path_owner` before a file row goes, so a checkout that is selected again
 * gets its attribution back.
 */
import { statSync, statfsSync } from 'node:fs'
import { dirname } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { getPlanetIndexSelection } from '../planet.ts'
import { beginRun, readRunState, removeRunState, writeRunState } from './runs.ts'

/** Why a group of rows is prunable. */
export type PruneReason = 'deselected' | 'retired' | 'unregistered' | 'outside-note-roots'

export interface PruneCandidate {
  /** null for rows without a checkout that lie outside every note root. */
  checkoutId: string | null
  relPrefix: string | null
  reason: PruneReason
  files: number
}

export interface PrunePlan {
  workspaceId: string
  keptCheckouts: string[]
  candidates: PruneCandidate[]
  files: number
}

export interface PruneTick {
  checkoutId: string | null
  relPrefix: string | null
  /** Files of this group removed so far, and the group's size. */
  done: number
  total: number
  /** Files removed across all groups, and the plan's total. */
  overallDone: number
  overallTotal: number
}

export interface PruneOptions {
  /** Files per transaction. Small enough to keep the WAL small. */
  batchFiles?: number
  onProgress?: (tick: PruneTick) => void
  /**
   * An explicitly empty selection means "notes only". Pruning under it removes
   * every code row, so it has to be asked for, not reached by accident.
   */
  allowEmptySelection?: boolean
}

export interface PruneResult {
  workspaceId: string
  files: number
  /** Rows removed, per table. */
  deleted: Record<string, number>
  /** References set to NULL, per `table.column`. */
  nulled: Record<string, number>
  groups: Array<PruneCandidate & { ms: number }>
  /** Violations `PRAGMA foreign_key_check` found afterwards. Always 0 on success. */
  orphans: number
  ms: number
}

export const DEFAULT_PRUNE_BATCH = 1000

/** One foreign key into `files` or `symbols`, with the index its lookup uses. */
interface ChildKey {
  child: string
  column: string
  onDelete: string
  /** The lookup has to name the workspace to reach its index. */
  scoped: boolean
  /** The key is the table's rowid, so the plan names `rowid`, not the column. */
  rowid: boolean
}

type Row = Record<string, unknown>

const quote = (name: string): string => `"${name.replace(/"/g, '""')}"`

const BATCH_TABLE = 'temp.prune_batch'
const BATCH_IDS = `SELECT id FROM ${BATCH_TABLE}`

/** The note-root predicate for a checkout-less row, as in `activePlanetFileScope`. */
const OUTSIDE_NOTE_ROOTS = `NOT EXISTS (
  SELECT 1 FROM note_roots n
   WHERE n.planet_id = ?
     AND (f.path = n.rel_path OR
       (n.kind <> 'file' AND substr(f.path, 1, length(n.rel_path) + 1) = n.rel_path || '/')))`

function planetIdOf(db: DatabaseSync, workspaceId: string): string {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (planet === undefined) throw new Error(`workspace is not a planet: ${workspaceId}`)
  return planet.id
}

/**
 * What a prune would remove, without removing anything.
 *
 * Refuses when no selection was ever persisted: an unconfigured planet has no
 * selected checkouts, and treating that as "prune everything" would turn a
 * missing decision into data loss.
 */
export function planPrune(
  db: DatabaseSync, workspaceId: string, options: Pick<PruneOptions, 'allowEmptySelection'> = {},
): PrunePlan {
  const planetId = planetIdOf(db, workspaceId)
  const selection = getPlanetIndexSelection(db, workspaceId)
  if (!selection.configured) {
    throw new Error(
      `planet ${workspaceId} has no persisted selection — select the checkouts to keep before pruning`)
  }
  if (selection.checkoutIds.length === 0 && options.allowEmptySelection !== true) {
    throw new Error(
      `planet ${workspaceId} selects no checkout (notes only); pruning now would remove every code row`)
  }
  const kept = new Set(selection.checkoutIds)
  const groups = db.prepare(
    `SELECT f.checkout_id AS checkoutId, COUNT(*) AS files
       FROM files f WHERE f.workspace_id = ? AND f.checkout_id IS NOT NULL
      GROUP BY f.checkout_id`).all(workspaceId) as unknown as Array<{ checkoutId: string; files: number }>
  const describe = db.prepare('SELECT rel_prefix AS relPrefix, retired_at AS retiredAt FROM checkouts WHERE id = ?')
  const candidates: PruneCandidate[] = []
  for (const group of groups) {
    if (kept.has(group.checkoutId)) continue
    const known = describe.get(group.checkoutId) as { relPrefix: string; retiredAt: string | null } | undefined
    candidates.push({
      checkoutId: group.checkoutId,
      relPrefix: known?.relPrefix ?? null,
      reason: known === undefined ? 'unregistered' : known.retiredAt !== null ? 'retired' : 'deselected',
      files: Number(group.files),
    })
  }
  const legacy = Number((db.prepare(
    `SELECT COUNT(*) AS n FROM files f
      WHERE f.workspace_id = ? AND f.checkout_id IS NULL AND ${OUTSIDE_NOTE_ROOTS}`)
    .get(workspaceId, planetId) as { n: number }).n)
  if (legacy > 0) {
    candidates.push({ checkoutId: null, relPrefix: null, reason: 'outside-note-roots', files: legacy })
  }
  candidates.sort((a, b) => (a.relPrefix ?? '~').localeCompare(b.relPrefix ?? '~'))
  return {
    workspaceId,
    keptCheckouts: [...kept],
    candidates,
    files: candidates.reduce((sum, candidate) => sum + candidate.files, 0),
  }
}

/** The columns of a table. */
function columnsOf(db: DatabaseSync, table: string): Array<{ name: string; pk: number; type: string }> {
  return db.prepare(`PRAGMA table_info(${quote(table)})`).all() as unknown as
    Array<{ name: string; pk: number; type: string }>
}

/**
 * How a child row is found by its key: through an index that leads with the
 * key, as the rowid itself, or behind `workspace_id`. null when none exists.
 */
function lookupFor(db: DatabaseSync, table: string, column: string): { scoped: boolean; rowid: boolean } | null {
  const columns = columnsOf(db, table)
  const pk = columns.filter(col => col.pk > 0)
  if (pk.length === 1 && pk[0]!.name === column && pk[0]!.type.toUpperCase() === 'INTEGER') {
    return { scoped: false, rowid: true }
  }
  let scoped: { scoped: boolean; rowid: boolean } | null = null
  const indexes = db.prepare(`PRAGMA index_list(${quote(table)})`).all() as unknown as
    Array<{ name: string; partial: number }>
  for (const index of indexes) {
    if (index.partial) continue
    const cols = (db.prepare(`PRAGMA index_info(${quote(index.name)})`).all() as unknown as
      Array<{ seqno: number; name: string | null }>)
      .sort((a, b) => a.seqno - b.seqno).map(col => col.name)
    if (cols[0] === column) return { scoped: false, rowid: false }
    if (cols[0] === 'workspace_id' && cols[1] === column) scoped = { scoped: true, rowid: false }
  }
  return scoped
}

/** Every foreign key that points at `parent`, read from the schema itself. */
function childKeysOf(db: DatabaseSync, parent: string): ChildKey[] {
  const tables = db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    .all() as unknown as Array<{ name: string }>
  const keys: ChildKey[] = []
  for (const { name } of tables) {
    let fks: Array<{ id: number; seq: number; table: string; from: string; to: string | null; on_delete: string }>
    try {
      fks = db.prepare(`PRAGMA foreign_key_list(${quote(name)})`).all() as unknown as typeof fks
    } catch { continue }
    for (const fk of fks) {
      if (fk.table !== parent) continue
      if (fks.some(other => other.id === fk.id && other.seq > 0)) {
        throw new Error(`composite foreign key ${name} → ${parent} is not supported by pruning`)
      }
      if (fk.to !== null && fk.to !== 'id') {
        throw new Error(`foreign key ${name}.${fk.from} → ${parent}.${fk.to} is not supported by pruning`)
      }
      const lookup = lookupFor(db, name, fk.from)
      if (lookup === null) {
        throw new Error(
          `${name}.${fk.from} has no index that leads with it, or with workspace_id and it; ` +
          `pruning would scan ${name} once per batch`)
      }
      keys.push({ child: name, column: fk.from, onDelete: fk.on_delete.toUpperCase(), ...lookup })
    }
  }
  return keys
}

interface Statement {
  sql: string
  params: string[]
  /** The table the statement writes, and the key its plan must search it by. */
  target: string
  key: string
  count: { table: string; kind: 'deleted' | 'nulled' }
}

/**
 * The statements that remove one batch, children before parents.
 *
 * `ids` selects the parent ids of the batch. Rows of `symbols` are reached
 * through their file, so the edges pointing at a pruned symbol go before the
 * symbol does, exactly as the cascade would have ordered it.
 */
function statementsFor(
  keys: Map<string, ChildKey[]>, parent: string, ids: string, workspaceId: string,
): Statement[] {
  const out: Statement[] = []
  for (const key of keys.get(parent) ?? []) {
    const match = key.scoped
      ? `workspace_id = ? AND ${quote(key.column)} IN (${ids})`
      : `${quote(key.column)} IN (${ids})`
    const params = key.scoped ? [workspaceId] : []
    const searched = key.rowid ? 'rowid' : key.column
    if (key.onDelete === 'CASCADE') {
      if (keys.has(key.child)) {
        out.push(...statementsFor(keys, key.child, `SELECT id FROM ${quote(key.child)} WHERE ${match}`, workspaceId)
          .map(statement => ({ ...statement, params: [...statement.params, ...params] })))
      }
      out.push({
        sql: `DELETE FROM ${quote(key.child)} WHERE ${match}`,
        params, target: key.child, key: searched, count: { table: key.child, kind: 'deleted' },
      })
    } else if (key.onDelete === 'SET NULL') {
      out.push({
        sql: `UPDATE ${quote(key.child)} SET ${quote(key.column)} = NULL WHERE ${match}`,
        params, target: key.child, key: searched,
        count: { table: `${key.child}.${key.column}`, kind: 'nulled' },
      })
    } else {
      // NO ACTION, RESTRICT, SET DEFAULT: the schema says a reference must stop
      // the delete, so a remaining one is a refusal rather than a rewrite.
      out.push({
        sql: `SELECT COUNT(*) AS n FROM ${quote(key.child)} WHERE ${match}`,
        params, target: key.child, key: searched,
        count: { table: `${key.child}.${key.column}`, kind: 'deleted' },
      })
    }
  }
  return out
}

/**
 * Refuse a statement unless its plan searches the table it writes by the key.
 *
 * "No SCAN" is not enough: `workspace_id = ? AND src_file IN (…)` can also be
 * answered by searching the workspace index, which is a search in name and a
 * walk over every edge of the planet in fact.
 */
function assertIndexed(db: DatabaseSync, statement: Statement): void {
  const plan = (db.prepare(`EXPLAIN QUERY PLAN ${statement.sql}`).all(...statement.params) as unknown as
    Array<{ detail: string }>).map(row => row.detail)
  const byKey = plan.some(detail =>
    detail.startsWith(`SEARCH ${statement.target} `) && detail.includes(`${statement.key}=?`))
  const scans = plan.some(detail =>
    detail === `SCAN ${statement.target}` || detail.startsWith(`SCAN ${statement.target} `))
  if (!byKey || scans) {
    throw new Error(
      `pruning would not reach ${statement.target} by ${statement.key}: ${plan.join(' | ')}\n  ${statement.sql}`)
  }
}

/** The groups' batch selector: the next `limit` file ids of one group. */
function batchSelect(workspaceId: string, planetId: string, candidate: PruneCandidate): { sql: string; params: string[] } {
  return candidate.checkoutId === null
    ? {
        sql: `SELECT f.id FROM files f
               WHERE f.workspace_id = ? AND f.checkout_id IS NULL AND ${OUTSIDE_NOTE_ROOTS} LIMIT ?`,
        params: [workspaceId, planetId],
      }
    : {
        sql: 'SELECT f.id FROM files f WHERE f.workspace_id = ? AND f.checkout_id = ? LIMIT ?',
        params: [workspaceId, candidate.checkoutId],
      }
}

/** Re-count the published totals the way the indexer does at the end of a run. */
function refreshIndexState(db: DatabaseSync, workspaceId: string): void {
  const files = Number((db.prepare('SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
    .get(workspaceId) as { n: number }).n)
  const symbols = Number((db.prepare(
    'SELECT COUNT(*) AS n FROM symbols s JOIN files f ON f.id = s.file_id WHERE f.workspace_id = ?')
    .get(workspaceId) as { n: number }).n)
  const totals = db.prepare(
    `SELECT COUNT(*) AS edges,
            SUM(CASE WHEN resolved = 0 AND ambiguous = 0 THEN 1 ELSE 0 END) AS unresolved,
            SUM(CASE WHEN ambiguous = 1 THEN 1 ELSE 0 END) AS ambiguous
       FROM edges WHERE workspace_id = ?`).get(workspaceId) as
    { edges: number; unresolved: number | null; ambiguous: number | null }
  db.prepare(
    `UPDATE workspace_index_state
        SET file_count = ?, symbol_count = ?, edge_count = ?, unresolved_count = ?, ambiguous_count = ?
      WHERE workspace_id = ?`)
    .run(files, symbols, Number(totals.edges), Number(totals.unresolved ?? 0), Number(totals.ambiguous ?? 0),
      workspaceId)
}

function ensurePruneLog(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS index_prunes (
      id           INTEGER PRIMARY KEY,
      workspace_id TEXT NOT NULL,
      pruned_at    TEXT NOT NULL,
      files        INTEGER NOT NULL,
      detail       TEXT NOT NULL
    );
  `)
}

/**
 * Remove the rows of every checkout the selection does not keep.
 *
 * Holds the planet's index-run lock for the whole prune, so neither the daemon
 * nor a CLI scan can write the same tables in between batches.
 */
export function prunePlanet(db: DatabaseSync, workspaceId: string, options: PruneOptions = {}): PruneResult {
  const started = Date.now()
  const batch = Math.max(1, Math.floor(options.batchFiles ?? DEFAULT_PRUNE_BATCH))
  const planetId = planetIdOf(db, workspaceId)
  const plan = planPrune(db, workspaceId, options)
  const keys = new Map<string, ChildKey[]>()
  for (const parent of ['files', 'symbols']) keys.set(parent, childKeysOf(db, parent))

  db.exec(`CREATE TEMP TABLE IF NOT EXISTS prune_batch (id INTEGER PRIMARY KEY)`)
  db.exec(`DELETE FROM ${BATCH_TABLE}`)
  const statements: Statement[] = [
    {
      sql: `DELETE FROM search_rows WHERE workspace_id = ? AND file_id IN (${BATCH_IDS})`,
      params: [workspaceId], target: 'search_rows', key: 'file_id',
      count: { table: 'search_rows', kind: 'deleted' },
    },
    ...statementsFor(keys, 'files', BATCH_IDS, workspaceId),
  ]
  for (const statement of statements) assertIndexed(db, statement)

  const previous = readRunState(workspaceId)
  const run = beginRun(workspaceId)
  const beat = (): void => {
    run.heartbeatAt = new Date().toISOString()
    run.phase = 'write'
    writeRunState(run)
  }
  const deleted: Record<string, number> = {}
  const nulled: Record<string, number> = {}
  const groups: PruneResult['groups'] = []
  let overallDone = 0
  db.exec('PRAGMA foreign_keys = OFF')
  try {
    const mirrorOwners = db.prepare(
      `INSERT INTO path_owner (workspace_id, path, agent_id, action, at)
       SELECT f.workspace_id, f.path, o.agent_id, o.action, o.at
         FROM file_owner o JOIN files f ON f.id = o.file_id
        WHERE o.file_id IN (${BATCH_IDS})
       ON CONFLICT(workspace_id, path) DO UPDATE SET
         agent_id = excluded.agent_id, action = excluded.action, at = excluded.at`)
    const dropFiles = db.prepare(`DELETE FROM files WHERE id IN (${BATCH_IDS})`)
    const prepared = statements.map(statement => ({ statement, stmt: db.prepare(statement.sql) }))
    for (const candidate of plan.candidates) {
      const groupStarted = Date.now()
      const select = batchSelect(workspaceId, planetId, candidate)
      const fill = db.prepare(`INSERT INTO ${BATCH_TABLE} (id) ${select.sql}`)
      let done = 0
      for (;;) {
        db.exec('BEGIN IMMEDIATE')
        try {
          db.exec(`DELETE FROM ${BATCH_TABLE}`)
          const size = Number(fill.run(...select.params, batch).changes)
          if (size === 0) { db.exec('COMMIT'); break }
          mirrorOwners.run()
          for (const { statement, stmt } of prepared) {
            if (statement.sql.startsWith('SELECT')) {
              const left = Number((stmt.get(...statement.params) as { n: number }).n)
              if (left > 0) throw new Error(`${statement.count.table} still references ${left} pruned row(s)`)
              continue
            }
            const changes = Number(stmt.run(...statement.params).changes)
            const bucket = statement.count.kind === 'deleted' ? deleted : nulled
            bucket[statement.count.table] = (bucket[statement.count.table] ?? 0) + changes
          }
          const removed = Number(dropFiles.run().changes)
          deleted.files = (deleted.files ?? 0) + removed
          db.exec('COMMIT')
          done += size
          overallDone += size
        } catch (error) {
          try { db.exec('ROLLBACK') } catch { /* nothing open */ }
          throw error
        }
        try { db.exec('PRAGMA wal_checkpoint(TRUNCATE)') } catch { /* a busy checkpoint is not a failure */ }
        beat()
        options.onProgress?.({
          checkoutId: candidate.checkoutId, relPrefix: candidate.relPrefix,
          done, total: candidate.files, overallDone, overallTotal: plan.files,
        })
      }
      groups.push({ ...candidate, ms: Date.now() - groupStarted })
    }
  } finally {
    try { db.exec(`DELETE FROM ${BATCH_TABLE}`) } catch { /* the temp table goes with the connection */ }
    db.exec('PRAGMA foreign_keys = ON')
    if (previous === null) removeRunState(workspaceId)
    else writeRunState(previous)
  }

  const orphanTables = new Set<string>()
  for (const list of keys.values()) for (const key of list) orphanTables.add(key.child)
  let orphans = 0
  for (const table of orphanTables) {
    orphans += (db.prepare(`PRAGMA foreign_key_check(${quote(table)})`).all() as unknown[]).length
  }
  orphans += Number((db.prepare(
    `SELECT COUNT(*) AS n FROM search_rows
      WHERE workspace_id = ? AND file_id IS NOT NULL AND file_id NOT IN (SELECT id FROM files)`)
    .get(workspaceId) as { n: number }).n)

  ensurePruneLog(db)
  refreshIndexState(db, workspaceId)
  db.prepare('INSERT INTO index_prunes (workspace_id, pruned_at, files, detail) VALUES (?, ?, ?, ?)')
    .run(workspaceId, new Date().toISOString(), overallDone,
      JSON.stringify({ groups: groups.map(({ checkoutId, relPrefix, reason, files }) =>
        ({ checkoutId, relPrefix, reason, files })), deleted, nulled, orphans }))
  if (orphans > 0) {
    throw new Error(`prune left ${orphans} orphaned reference(s); run PRAGMA foreign_key_check to see them`)
  }
  return { workspaceId, files: overallDone, deleted, nulled, groups, orphans, ms: Date.now() - started }
}

export interface CompactResult {
  beforeBytes: number
  afterBytes: number
  ms: number
}

const sizeOf = (file: string): number => { try { return statSync(file).size } catch { return 0 } }

/**
 * Give the pages a prune freed back to the disk.
 *
 * VACUUM rebuilds the file from its live pages, so it needs room for a copy of
 * the live data in the temp directory and again in the WAL; it is refused when
 * the disk does not have that plus a margin. The FTS indexes are merged first,
 * so the deleted entries a prune leaves in their segments go too.
 */
export function compactStore(db: DatabaseSync, dbFile: string, marginBytes = 1024 ** 3): CompactResult {
  const started = Date.now()
  const before = sizeOf(dbFile) + sizeOf(`${dbFile}-wal`)
  const page = db.prepare('PRAGMA page_size').get() as { page_size: number }
  const pages = db.prepare('PRAGMA page_count').get() as { page_count: number }
  const free = db.prepare('PRAGMA freelist_count').get() as { freelist_count: number }
  const live = (Number(pages.page_count) - Number(free.freelist_count)) * Number(page.page_size)
  const disk = statfsSync(dirname(dbFile))
  const available = Number(disk.bavail) * Number(disk.bsize)
  if (available < 2 * live + marginBytes) {
    throw new Error(
      `compaction needs about ${Math.ceil((2 * live + marginBytes) / 1024 ** 3)} GB free next to the store, ` +
      `${(available / 1024 ** 3).toFixed(1)} GB are`)
  }
  for (const fts of ['search', 'note_search']) {
    const exists = db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(fts)
    if (exists !== undefined) db.exec(`INSERT INTO ${fts}(${fts}) VALUES('optimize')`)
  }
  try { db.exec('PRAGMA wal_checkpoint(TRUNCATE)') } catch { /* retried after the vacuum */ }
  db.exec('VACUUM')
  try { db.exec('PRAGMA wal_checkpoint(TRUNCATE)') } catch { /* a reader holds a mark; the space returns later */ }
  return { beforeBytes: before, afterBytes: sizeOf(dbFile) + sizeOf(`${dbFile}-wal`), ms: Date.now() - started }
}
