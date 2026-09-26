import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import test from 'node:test'
import { indexWorkspace } from '../src/indexer/index.ts'
import { openStore } from '../src/store/schema.ts'

function withTempDir(run: (dir: string) => void): void {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-fts-'))
  try { run(dir) } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}

test('openStore migrates legacy FTS rows once and keeps them searchable', () => {
  withTempDir(dir => {
    const file = join(dir, 'brain.db')
    const legacy = new DatabaseSync(file)
    legacy.exec(`
      CREATE VIRTUAL TABLE search USING fts5(
        name, path, kind, workspace_id UNINDEXED, symbol_id UNINDEXED, file_id UNINDEXED,
        tokenize = 'unicode61'
      );
      INSERT INTO search (name, path, kind, workspace_id, symbol_id, file_id)
      VALUES ('needleSymbol', 'src/needle.ts', 'function', 'ws-test', 7, 3);
    `)
    legacy.close()

    for (let open = 0; open < 2; open += 1) {
      const db = openStore(file)
      try {
        const rows = db.prepare(
          `SELECT r.name, r.path FROM search f
           JOIN search_rows r ON r.id = f.rowid
           WHERE f.search MATCH ? AND r.workspace_id = ?`
        ).all('needle*', 'ws-test') as { name: string; path: string }[]
        assert.equal(rows.length, 1)
        assert.equal(rows[0]?.name, 'needleSymbol')
        assert.equal(rows[0]?.path, 'src/needle.ts')
        assert.equal(
          (db.prepare('SELECT COUNT(*) count FROM search_rows').get() as { count: number }).count,
          1,
        )
        const schema = db.prepare(
          "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'search'"
        ).get() as { sql: string }
        assert.match(schema.sql, /content\s*=\s*'search_rows'/i)
      } finally {
        db.close()
      }
    }
  })
})

test('failed reindex rolls back deletion of the previous graph and FTS rows', () => {
  withTempDir(dir => {
    const workspace = join(dir, 'workspace')
    const db = openStore(join(dir, 'brain.db'))
    // The indexer only requires a readable root; keep the fixture deliberately
    // tiny so this test isolates transaction behavior.
    mkdirSync(workspace)
    writeFileSync(join(workspace, 'stable.ts'), 'export function stable() { return 1 }\n')
    db.prepare(
      'INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)'
    ).run('ws-test', 'test', workspace, new Date(0).toISOString())
    indexWorkspace(db, 'ws-test', workspace)

    const beforeFile = db.prepare(
      "SELECT path, hash FROM files WHERE workspace_id = 'ws-test' AND path = 'stable.ts'"
    ).get()
    const beforeSearch = db.prepare(
      "SELECT COUNT(*) count FROM search_rows WHERE workspace_id = 'ws-test'"
    ).get() as { count: number }
    assert.ok(beforeFile)
    assert.ok(beforeSearch.count > 0)

    db.exec(`
      CREATE TRIGGER reject_reindex BEFORE INSERT ON files BEGIN
        SELECT RAISE(ABORT, 'forced reindex failure');
      END;
    `)
    writeFileSync(join(workspace, 'stable.ts'), 'export function changed() { return 2 }\n')
    // A NEW path is what forces an INSERT into the files table. Since indexing
    // became incremental, editing an existing file UPDATEs its row in place -
    // that is what keeps its id, and therefore its owner - so an insert trigger
    // alone would no longer fire and this test would silently stop exercising
    // the rollback it exists to prove.
    writeFileSync(join(workspace, 'appears.ts'), 'export function appears() { return 3 }' + String.fromCharCode(10))
    assert.throws(() => indexWorkspace(db, 'ws-test', workspace), /forced reindex failure/)

    assert.deepEqual(
      db.prepare("SELECT path, hash FROM files WHERE workspace_id = 'ws-test' AND path = 'stable.ts'").get(),
      beforeFile,
    )
    assert.equal(
      (db.prepare("SELECT COUNT(*) count FROM search_rows WHERE workspace_id = 'ws-test'").get() as { count: number }).count,
      beforeSearch.count,
    )
    db.close()
  })
})
