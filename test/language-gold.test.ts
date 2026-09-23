/**
 * M16 language gold corpus. Each labelled assertion comes from a syntax form
 * present in the PLUG corpus; the fixture keeps the test portable while the
 * source column in L1-brain/INVENTAR.md records the originating file.
 */
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { parseFile } from '../src/indexer/scan.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { openStore } from '../src/store/schema.ts'

const has = (items: Array<{ name?: string; target?: string; local?: string | null; kind?: string }>, key: string, value: string): boolean =>
  items.some(item => item[key as keyof typeof item] === value)

const python = parseFile('apps/backend/workers.py', '.py', `
from .engine import boot as start, record
import logger as log
class Worker(BaseWorker):
    def run(self):
        return start()
async def fetch():
    return log.send()
def invoke():
    client.run()
    factory.build()
    return fetch()
def main():
    return invoke()
`)

const rust = parseFile('src/worker.rs', '.rs', `
use crate::engine::{boot as start, Record};
use crate::log::send;
pub struct Worker;
pub enum State { Ready }
pub trait Job {}
pub fn invoke() {
    start();
    send();
    Worker::new();
    factory();
    make();
}
pub fn make() {}
impl Worker {
    pub fn run() {
        invoke();
    }
}
`)

const sql = parseFile('migrations/0001.sql', '.sql', `
CREATE TABLE jobs (id INTEGER);
CREATE TABLE logs (id INTEGER);
CREATE VIEW active_jobs AS SELECT * FROM jobs;
CREATE FUNCTION enqueue() RETURNS void AS $$ SELECT 1; $$;
CREATE PROCEDURE refresh() AS $$ SELECT 1; $$;
INSERT INTO jobs VALUES (1);
UPDATE jobs SET id = 2;
SELECT * FROM jobs JOIN logs ON logs.id = jobs.id;
DELETE FROM logs;
ALTER TABLE logs ADD CONSTRAINT fk_job FOREIGN KEY (id) REFERENCES jobs(id);
CALL refresh();
SOURCE seed.sql;
\\i helpers.sql
`)

const goldRows: Array<[string, typeof python, 'symbols' | 'imports' | 'refs', string, string]> = [
  // Python: 5 definitions, 3 imports, 1 inheritance reference, 6 calls.
  ['py definition class', python, 'symbols', 'name', 'Worker'], ['py definition method', python, 'symbols', 'name', 'run'],
  ['py definition async function', python, 'symbols', 'name', 'fetch'], ['py definition function', python, 'symbols', 'name', 'invoke'], ['py definition entry', python, 'symbols', 'name', 'main'],
  ['py import alias', python, 'imports', 'local', 'start'], ['py import named', python, 'imports', 'local', 'record'], ['py import module', python, 'imports', 'local', 'log'],
  ['py reference inheritance', python, 'refs', 'target', 'BaseWorker'], ['py call imported', python, 'refs', 'target', 'start'], ['py call receiver', python, 'refs', 'target', 'send'],
  ['py call method', python, 'refs', 'target', 'run'], ['py call factory', python, 'refs', 'target', 'build'], ['py call local async', python, 'refs', 'target', 'fetch'], ['py call entry', python, 'refs', 'target', 'invoke'],
  // Rust: 6 definitions, 3 imports, 6 explicit calls.
  ['rs definition struct', rust, 'symbols', 'name', 'Worker'], ['rs definition enum', rust, 'symbols', 'name', 'State'], ['rs definition trait', rust, 'symbols', 'name', 'Job'],
  ['rs definition function', rust, 'symbols', 'name', 'invoke'], ['rs definition helper', rust, 'symbols', 'name', 'make'], ['rs definition method', rust, 'symbols', 'name', 'run'],
  ['rs import alias', rust, 'imports', 'local', 'start'], ['rs import named', rust, 'imports', 'local', 'Record'], ['rs import leaf', rust, 'imports', 'local', 'send'],
  ['rs call import', rust, 'refs', 'target', 'start'], ['rs call imported leaf', rust, 'refs', 'target', 'send'], ['rs call associated', rust, 'refs', 'target', 'new'],
  ['rs call bare', rust, 'refs', 'target', 'factory'], ['rs call helper', rust, 'refs', 'target', 'make'], ['rs call local', rust, 'refs', 'target', 'invoke'],
  // SQL: 5 definitions, 6 table references, 1 procedure call, 2 includes.
  ['sql definition table jobs', sql, 'symbols', 'name', 'jobs'], ['sql definition table logs', sql, 'symbols', 'name', 'logs'], ['sql definition view', sql, 'symbols', 'name', 'active_jobs'],
  ['sql definition function', sql, 'symbols', 'name', 'enqueue'], ['sql definition procedure', sql, 'symbols', 'name', 'refresh'],
  ['sql reference insert', sql, 'refs', 'target', 'jobs'], ['sql reference update', sql, 'refs', 'target', 'jobs'], ['sql reference from', sql, 'refs', 'target', 'jobs'],
  ['sql reference join', sql, 'refs', 'target', 'logs'], ['sql reference delete', sql, 'refs', 'target', 'logs'], ['sql reference foreign key', sql, 'refs', 'target', 'jobs'],
  ['sql call procedure', sql, 'refs', 'target', 'refresh'], ['sql import source', sql, 'imports', 'specifier', 'seed.sql'], ['sql import psql', sql, 'imports', 'specifier', 'helpers.sql'],
]
const gold = goldRows.map(([label, extract, collection, key, value]) => ({ label, extract, collection, key, value }))

for (const item of gold) {
  test(`M16 gold ${item.label}`, () => {
    assert.equal(has(item.extract[item.collection] as Array<Record<string, string | null>>, item.key, item.value), true)
  })
}

test('M16 language files persist parsed status while unsupported text is inventory-only', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-languages-'))
  const root = join(dir, 'workspace')
  const db = openStore(join(dir, 'brain.db'))
  try {
    mkdirSync(root, { recursive: true })
    writeFileSync(join(root, 'worker.py'), 'def work():\n    return 1\n')
    writeFileSync(join(root, 'worker.rs'), 'pub fn work() {}\n')
    writeFileSync(join(root, 'schema.sql'), 'CREATE TABLE work (id INTEGER);\n')
    writeFileSync(join(root, 'config.json'), '{"mode":"test"}\n')
    const workspaceId = 'm16-language-status'
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(workspaceId, 'M16', root, new Date().toISOString())
    indexWorkspace(db, workspaceId, root)
    const rows = db.prepare('SELECT path, lang, processing_status AS status, processing_reason AS reason FROM files ORDER BY path')
      .all() as Array<{ path: string; lang: string | null; status: string; reason: string | null }>
    assert.deepEqual(rows.map(row => ({ ...row })), [
      { path: 'config.json', lang: null, status: 'inventoried', reason: 'no semantic extractor for extension' },
      { path: 'schema.sql', lang: 'sql', status: 'parsed', reason: null },
      { path: 'worker.py', lang: 'python', status: 'parsed', reason: null },
      { path: 'worker.rs', lang: 'rust', status: 'parsed', reason: null },
    ])
  } finally {
    db.close()
    rmSync(dir, { recursive: true, force: true })
  }
})
