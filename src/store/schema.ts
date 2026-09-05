/**
 * PlugBrain store — the runtime's single source of truth about workspaces.
 *
 * Agents never touch the raw filesystem: every read, write and search goes
 * through this store, which is why attribution is a first-class column here
 * rather than a log bolted on afterwards. If a file exists in a PlugBrain
 * workspace, this database knows what it contains, what it references, and
 * which agent last touched it.
 *
 * SQLite via node:sqlite (Node >= 22 built-in). WAL so the indexer can keep
 * writing while the UI and the agent API read concurrently.
 */
import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

/** Node kinds the indexer can produce. Kept narrow on purpose — a kind that
 *  nothing emits is a lie in the schema. */
export const SYMBOL_KINDS = [
  'file', 'class', 'interface', 'function', 'method', 'type_alias',
  'enum', 'enum_member', 'constant', 'variable', 'property', 'import',
] as const
export type SymbolKind = (typeof SYMBOL_KINDS)[number]

/** Edge kinds. `calls` and `references` are what make this a graph rather
 *  than a file listing. */
export const EDGE_KINDS = [
  'defines', 'imports', 'calls', 'references', 'extends', 'implements', 'contains',
] as const
export type EdgeKind = (typeof EDGE_KINDS)[number]

/** What an agent did to a file. Reads are recorded too: knowing which agent
 *  even LOOKED at a file is half of understanding a swarm's behaviour. */
export const ACTIONS = ['read', 'write', 'create', 'delete', 'search'] as const
export type Action = (typeof ACTIONS)[number]

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
-- The server, the daemon, the CLI and every agent share this database. Without
-- a busy timeout a writer that arrives while another holds the lock fails
-- instantly with SQLITE_BUSY instead of waiting a moment, which showed up as
-- "database is locked" the first time a re-index raced the daemon.
PRAGMA busy_timeout = 15000;

-- A workspace is a folder that has been registered. Nothing outside a
-- registered workspace is reachable through this store, by design.
CREATE TABLE IF NOT EXISTS workspaces (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  root        TEXT NOT NULL UNIQUE,
  created_at  TEXT NOT NULL,
  indexed_at  TEXT
);

CREATE TABLE IF NOT EXISTS files (
  id           INTEGER PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  path         TEXT NOT NULL,          -- workspace-relative, forward slashes
  ext          TEXT NOT NULL,
  lang         TEXT,
  size         INTEGER NOT NULL,
  mtime        TEXT NOT NULL,
  hash         TEXT,                   -- content hash, so re-index can skip
  loc          INTEGER NOT NULL DEFAULT 0,
  indexed_at   TEXT,
  UNIQUE (workspace_id, path)
);
CREATE INDEX IF NOT EXISTS idx_files_ws ON files(workspace_id);

CREATE TABLE IF NOT EXISTS symbols (
  id        INTEGER PRIMARY KEY,
  file_id   INTEGER NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  name      TEXT NOT NULL,
  kind      TEXT NOT NULL,
  line      INTEGER NOT NULL,
  end_line  INTEGER,
  exported  INTEGER NOT NULL DEFAULT 0,
  container TEXT                       -- enclosing class/interface, if any
);
CREATE INDEX IF NOT EXISTS idx_symbols_file ON symbols(file_id);
CREATE INDEX IF NOT EXISTS idx_symbols_name ON symbols(name);
CREATE INDEX IF NOT EXISTS idx_symbols_kind ON symbols(kind);

-- Edges reference symbols by id where resolved, and carry the raw target
-- text when they could not be resolved. An unresolved edge is kept and
-- marked, never silently dropped -- "we could not resolve this import" is
-- information an agent needs.
CREATE TABLE IF NOT EXISTS edges (
  id         INTEGER PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,
  src_symbol INTEGER REFERENCES symbols(id) ON DELETE CASCADE,
  src_file   INTEGER REFERENCES files(id) ON DELETE CASCADE,
  dst_symbol INTEGER REFERENCES symbols(id) ON DELETE CASCADE,
  dst_file   INTEGER REFERENCES files(id) ON DELETE CASCADE,
  raw_target TEXT,
  resolved   INTEGER NOT NULL DEFAULT 0,
  line       INTEGER
);
CREATE INDEX IF NOT EXISTS idx_edges_ws ON edges(workspace_id);
CREATE INDEX IF NOT EXISTS idx_edges_src ON edges(src_symbol);
CREATE INDEX IF NOT EXISTS idx_edges_dst ON edges(dst_symbol);
CREATE INDEX IF NOT EXISTS idx_edges_kind ON edges(kind);

-- Every agent that has ever touched a workspace, and the colour the views
-- paint its files in. The colour is assigned once and never reused, so a
-- file's colour identifies its author across all three renderings.
CREATE TABLE IF NOT EXISTS agents (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  color      TEXT NOT NULL,
  hue        INTEGER NOT NULL,
  first_seen TEXT NOT NULL,
  last_seen  TEXT NOT NULL
);

-- The attribution ledger: who did what to which file, when. This is append
-- only; it is the evidence trail behind every colour on screen.
CREATE TABLE IF NOT EXISTS activity (
  id           INTEGER PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  file_id      INTEGER REFERENCES files(id) ON DELETE SET NULL,
  path         TEXT NOT NULL,
  agent_id     TEXT REFERENCES agents(id) ON DELETE SET NULL,
  action       TEXT NOT NULL,
  detail       TEXT,
  at           TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_activity_ws ON activity(workspace_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_activity_file ON activity(file_id);
CREATE INDEX IF NOT EXISTS idx_activity_agent ON activity(agent_id);

-- Denormalised "who owns this file right now", so the city can colour 15k
-- buildings without a join per building.
CREATE TABLE IF NOT EXISTS file_owner (
  file_id    INTEGER PRIMARY KEY REFERENCES files(id) ON DELETE CASCADE,
  agent_id   TEXT REFERENCES agents(id) ON DELETE SET NULL,
  action     TEXT NOT NULL,
  at         TEXT NOT NULL
);

-- Full-text search over symbol names and file paths: this is how an agent
-- finds code without grepping a disk.
CREATE VIRTUAL TABLE IF NOT EXISTS search USING fts5(
  name, path, kind, workspace_id UNINDEXED, symbol_id UNINDEXED, file_id UNINDEXED,
  tokenize = 'unicode61'
);
`

/** Open (creating if needed) the PlugBrain database at `file`. */
export function openStore(file: string): DatabaseSync {
  mkdirSync(dirname(file), { recursive: true })
  const db = new DatabaseSync(file)
  db.exec(SCHEMA)
  return db
}
