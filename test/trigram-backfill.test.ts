/**
 * Regression test for the trigram backfill on stores that predate the
 * search_trigram table (BENCH-06, review BENCH finding MITTEL).
 *
 * A 0.2.6 store has search_rows but no search_trigram. openStore runs
 * db.exec(SCHEMA) first, which creates the table AND its triggers via
 * IF NOT EXISTS — so a backfill keyed on table existence (or nested inside
 * the create block, as it was) never runs, and the substring index of every
 * migrated brain stays empty until each file happens to be re-written.
 * Reproduced on a real 0.2.6 brain: MATCH 'login' returned 0 rows while
 * search_rows held the symbols.
 *
 * What this pins: the backfill is keyed on the INDEX being empty while
 * search_rows has content; a migrated store answers a trigram MATCH on the
 * first open; a second open does not rebuild again.
 */
import { strict as assert } from 'node:assert'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { test } from 'node:test'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'

/** The 0.2.6 schema this repo actually shipped (commit 1dc5638,
 *  src/store/schema.ts, blob f0e626b), kept byte for byte rather than
 *  reinvented: the migration has to be tested against the real bytes. A file
 *  and not `git show`, because the public repository starts with a fresh
 *  history that does not contain that commit. `.txt` keeps tsc away from it. */
const LEGACY_SCHEMA = join(import.meta.dirname, 'fixtures', 'legacy-schema-1dc5638.ts.txt')

/** Materialize the historical schema module into a temp dir and import it. */
async function legacySchemaModule(dir: string): Promise<{ openStore: typeof openStore }> {
  const source = readFileSync(LEGACY_SCHEMA, 'utf8')
  const file = join(dir, 'legacy-schema.ts')
  writeFileSync(file, source)
  const mod = await import(pathToFileURL(file).href) as { openStore: typeof openStore }
  // The ESM cache keeps the module; on Windows the file itself can stay
  // locked a moment longer, which must not fail the test's cleanup later.
  try { rmSync(file, { force: true }) } catch { /* best effort */ }
  return mod
}

test('a store that predates search_trigram answers a trigram MATCH on its first open', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-tri-'))
  try {
    const legacy = await legacySchemaModule(dir)
    const dbFile = join(dir, 'brain.db')

    // Build the 0.2.6 store the way the old indexer did: a workspace, a file,
    // a symbol, and search_rows referencing it. The legacy unicode61 index
    // fills via its own triggers; search_trigram does not exist yet.
    const oldDb = legacy.openStore(dbFile)
    oldDb.prepare(
      `INSERT INTO workspaces (id, name, root, created_at) VALUES ('ws-old', 'old', ?, ?)`,
    ).run(dir, new Date().toISOString())
    const fileId = Number(oldDb.prepare(
      `INSERT INTO files (workspace_id, path, ext, size, mtime) VALUES ('ws-old', 'src/login.ts', 'ts', 10, ?)`,
    ).run(new Date().toISOString()).lastInsertRowid)
    const symbolId = Number(oldDb.prepare(
      `INSERT INTO symbols (file_id, name, kind, line, exported) VALUES (?, 'login', 'function', 1, 1)`,
    ).run(fileId).lastInsertRowid)
    oldDb.prepare(
      `INSERT INTO search_rows (workspace_id, name, path, kind, symbol_id, file_id)
       VALUES ('ws-old', 'login', 'src/login.ts', 'function', ?, ?)`,
    ).run(symbolId, fileId)
    oldDb.close()

    // The bug this pins: SCHEMA creates search_trigram (IF NOT EXISTS), so
    // ensureSearchTrigram saw the table as present and skipped the rebuild —
    // MATCH 'login' found nothing while search_rows held the symbol. A
    // COUNT(*) on the fts5 table cannot detect this: on an external-content
    // table it mirrors search_rows and stays > 0 while the index is empty.
    // The honest probe is the %_docsize shadow table, which reflects the index.
    const db = openStore(dbFile)
    const docRows = (db.prepare('SELECT COUNT(*) c FROM search_trigram_docsize').get() as { c: number }).c
    assert.ok(docRows > 0, 'the trigram index was backfilled on the first open (docsize, not the content-backed COUNT)')
    const hits = db.prepare(
      `SELECT rowid FROM search_trigram WHERE search_trigram MATCH '"login"'`,
    ).all() as Array<{ rowid: number }>
    assert.equal(hits.length, 1, "MATCH 'login' finds the migrated row")
    assert.equal(
      (db.prepare('SELECT COUNT(*) c FROM search_rows').get() as { c: number }).c, 1,
      'the migration is additive: search_rows is preserved')
    db.close()

    // A second open must not rebuild again: the guard is the index being
    // empty. The exec patch proves the rebuild really is skipped rather than
    // merely harmless when repeated.
    let rebuilds = 0
    let execs = 0
    const origExec = DatabaseSync.prototype.exec
    DatabaseSync.prototype.exec = function (sql: string, ...rest: unknown[]) {
      execs++
      // Count only the actual trigram rebuild statement, not any SQL that
      // merely mentions the word: SCHEMA's own comments legitimately say
      // "rebuild" (the path_owner block), so a substring check would count
      // every open as a rebuild.
      if (/INSERT INTO search_trigram\(search_trigram\)/.test(String(sql))) rebuilds++
      return origExec.call(this, sql, ...rest)
    }
    let docRowsAfter = -1
    try {
      const again = openStore(dbFile)
      docRowsAfter = (again.prepare('SELECT COUNT(*) c FROM search_trigram_docsize').get() as { c: number }).c
      again.close()
    } finally {
      DatabaseSync.prototype.exec = origExec
    }
    assert.ok(execs > 0, 'the exec patch really intercepted openStore (sanity)')
    assert.equal(rebuilds, 0, 'the second open does not rebuild the trigram index again')
    assert.equal(docRowsAfter, docRows, 'the second open leaves the index untouched (docsize unchanged)')
  } finally {
    // Best effort: a locked file (Windows ESM handle) must not turn a green
    // regression test red — the OS temp dir outlives the leftover.
    try { rmSync(dir, { recursive: true, force: true }) }
    catch (e) {
      process.stderr.write(
        `PlugBrain: test temp dir not removed (${e instanceof Error ? e.message : String(e)}): ${dir}\n`)
    }
  }
})
