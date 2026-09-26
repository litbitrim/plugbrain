/**
 * M16 language gold corpus. Each labelled assertion comes from a syntax form
 * present in the PLUG corpus; the fixture keeps the test portable while the
 * source column in L1-brain/INVENTAR.md records the originating file.
 */
import { strict as assert } from 'node:assert'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
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

const java = parseFile('src/main/java/net/mcpz/module/ModuleRegistry.java', '.java', `
package net.mcpz.module;

import net.mcpz.log.McpzLog;
import org.slf4j.Logger;
import java.util.ArrayList;
import java.util.LinkedHashMap;

public final class ModuleRegistry extends BaseRegistry implements IRegistry {
    private static final Logger LOG = McpzLog.get("modules");
    public static final int MAX_MODULES = 64;

    private ModuleRegistry() {}

    public static void register(Module module) {
        if (MODULES.containsKey(module.id())) {
            throw new IllegalArgumentException("Duplicate module id: " + module.id());
        }
        MODULES.put(module.id(), module);
        LOG.info("Registered module [{}]", module.id());
    }

    public static void initializeAll() {
        for (Module m : MODULES.values()) {
            m.onInitialize();
            LOG.info("Initialized module [{}]", m.id());
        }
    }
}
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
  // Java: 1 class, 2 methods, 1 constant, 4 imports, extends, implements, calls.
  ['java definition class', java, 'symbols', 'name', 'ModuleRegistry'],
  ['java definition method register', java, 'symbols', 'name', 'register'],
  ['java definition method initializeAll', java, 'symbols', 'name', 'initializeAll'],
  ['java constant MAX_MODULES', java, 'symbols', 'name', 'MAX_MODULES'],
  ['java import McpzLog', java, 'imports', 'local', 'McpzLog'],
  ['java import Logger', java, 'imports', 'local', 'Logger'],
  ['java import ArrayList', java, 'imports', 'local', 'ArrayList'],
  ['java reference extends', java, 'refs', 'target', 'BaseRegistry'],
  ['java reference implements', java, 'refs', 'target', 'IRegistry'],
  ['java call receiver get', java, 'refs', 'target', 'get'],
  ['java call receiver onInitialize', java, 'refs', 'target', 'onInitialize'],
]
const gold = goldRows.map(([label, extract, collection, key, value]) => ({ label, extract, collection, key, value }))

for (const item of gold) {
  test(`M16 gold ${item.label}`, () => {
    assert.equal(has(item.extract[item.collection] as Array<Record<string, string | null>>, item.key, item.value), true)
  })
}

/** The portable fixture above mirrors these 45 snapshot-labelled PLUG cases. */
const codeRoot = process.env.PLUGPT_CODE_ROOT
const actualInputs = codeRoot === undefined ? null : [
  ['PlugHub/apps/backend/main.py', '.py'],
  ['PlugBoard/packages/plug-launcher/src-tauri/src/commands.rs', '.rs'],
  ['PlugMedia/migrations/0001_init.sql', '.sql'],
] as const
const actual = actualInputs !== null && actualInputs.every(([path]) => existsSync(join(codeRoot as string, path)))
  ? actualInputs.map(([path, ext]) => parseFile(path, ext, readFileSync(join(codeRoot as string, path), 'utf8')))
  : null
const actualRows: Array<[string, number, 'symbols' | 'imports' | 'refs', string, string]> = [
  // Python, Code/PlugHub/apps/backend/main.py: definitions and direct calls.
  ['py actual root definition', 0, 'symbols', 'name', 'root'], ['py actual class definition', 0, 'symbols', 'name', 'RateLimiter'], ['py actual method definition', 0, 'symbols', 'name', '__init__'],
  ['py actual method definition allowed', 0, 'symbols', 'name', 'is_allowed'], ['py actual route definition', 0, 'symbols', 'name', 'get_lan_base_url'], ['py actual route definition secure', 0, 'symbols', 'name', 'is_request_secure'],
  ['py actual route definition client', 0, 'symbols', 'name', 'get_client_ip'], ['py actual route definition local', 0, 'symbols', 'name', 'is_local_ip'], ['py actual route definition auth', 0, 'symbols', 'name', 'authenticate_admin'],
  ['py actual route definition audit', 0, 'symbols', 'name', 'log_audit'], ['py actual startup call init', 0, 'refs', 'target', 'init_db'], ['py actual startup call seed', 0, 'refs', 'target', 'seed_preset_nodes'],
  ['py actual startup call key', 0, 'refs', 'target', 'get_admin_key'], ['py actual startup call telemetry', 0, 'refs', 'target', 'record_local_telemetry'], ['py actual startup call version', 0, 'refs', 'target', 'record_node_version'],
  // Rust, Code/PlugBoard/.../commands.rs: definitions, uses, and direct calls.
  ['rs actual struct launcher paths', 1, 'symbols', 'name', 'LauncherPaths'], ['rs actual struct stage', 1, 'symbols', 'name', 'LauncherStage'], ['rs actual struct result', 1, 'symbols', 'name', 'GetStartedResult'],
  ['rs actual function renderer', 1, 'symbols', 'name', 'renderer_path'], ['rs actual function paths', 1, 'symbols', 'name', 'get_launcher_paths'], ['rs actual import request', 1, 'imports', 'local', 'LauncherRequest'],
  ['rs actual import response', 1, 'imports', 'local', 'LauncherResponse'], ['rs actual import app paths', 1, 'imports', 'local', 'AppPaths'], ['rs actual import serialize', 1, 'imports', 'local', 'Serialize'],
  ['rs actual import fs', 1, 'imports', 'local', 'fs'], ['rs actual call renderer', 1, 'refs', 'target', 'renderer_path'], ['rs actual call guard', 1, 'refs', 'target', 'is_contained_path'],
  ['rs actual call roots', 1, 'refs', 'target', 'approved_roots'], ['rs actual call format', 1, 'refs', 'target', 'format'], ['rs actual call join', 1, 'refs', 'target', 'join'],
  // SQL, Code/PlugMedia/migrations/0001_init.sql: schema definitions and FK references.
  ['sql actual table migrations', 2, 'symbols', 'name', 'schema_migrations'], ['sql actual table tenants', 2, 'symbols', 'name', 'tenants'], ['sql actual table workspaces', 2, 'symbols', 'name', 'workspaces'],
  ['sql actual table brands', 2, 'symbols', 'name', 'brands'], ['sql actual table versions', 2, 'symbols', 'name', 'brand_versions'], ['sql actual table sources', 2, 'symbols', 'name', 'sources'],
  ['sql actual table claims', 2, 'symbols', 'name', 'claims'], ['sql actual table rights', 2, 'symbols', 'name', 'rights_records'], ['sql actual table campaigns', 2, 'symbols', 'name', 'campaigns'],
  ['sql actual table content', 2, 'symbols', 'name', 'content_items'], ['sql actual reference tenant', 2, 'refs', 'target', 'tenants'], ['sql actual reference workspace', 2, 'refs', 'target', 'workspaces'],
  ['sql actual reference brand', 2, 'refs', 'target', 'brands'], ['sql actual reference source', 2, 'refs', 'target', 'sources'], ['sql actual reference campaign', 2, 'refs', 'target', 'campaigns'],
]
for (const [label, input, collection, key, value] of actualRows) {
  test(`M16 corpus ${label}`, { skip: actual === null ? 'set PLUGPT_CODE_ROOT to run against the PLUG corpus' : false }, () => {
    assert.equal(has(actual![input][collection] as Array<Record<string, string | null>>, key, value), true)
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
