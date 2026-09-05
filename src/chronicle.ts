/**
 * Chronicle, compression snapshots and context packs (Vertical 4).
 *
 * Three invariants live here:
 *   6. after every agent turn the brain is current
 *   7. context compression never destroys history
 *   8. every derived memory cites its sources
 *
 * The shape that makes 7 true is not "summarise better". It is: write the
 * FULL state to durable markdown BEFORE the compression happens, so a later
 * agent can rehydrate the exact situation instead of guessing from a lossy
 * summary. The raw chronicle is append-only and is never rewritten by
 * anything derived from it.
 *
 *   raw turn chronicle
 *     -> pre-compression snapshot
 *       -> compressed continuation context
 *         -> further events
 *           -> next snapshot
 *             -> mission closeout
 */
import { randomUUID } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { readTrace, type StoredTraceEvent, type TraceEventType } from './trace.ts'
import { requireWorkspace } from './access.ts'

const SCHEMA = `
-- Append-only. Nothing derived may UPDATE or DELETE a row here; that is the
-- whole guarantee behind invariant 7.
CREATE TABLE IF NOT EXISTS chronicle (
  id           INTEGER PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  turn_id      TEXT NOT NULL,
  mission_id   TEXT,
  agent_id     TEXT REFERENCES agents(id) ON DELETE SET NULL,
  kind         TEXT NOT NULL,      -- instruction | response | tool_call | command | error | note
  body         TEXT NOT NULL,
  at           TEXT NOT NULL,
  -- The identity chain, carried rather than re-invented. These are the SAME
  -- ids the Operator and @plug/work use; chronicle never mints its own.
  runtime_instance_id TEXT,
  task_id             TEXT,
  worker_id           TEXT,
  trace_event_id      TEXT,
  source              TEXT NOT NULL DEFAULT 'local'
);
CREATE INDEX IF NOT EXISTS idx_chronicle_turn ON chronicle(workspace_id, turn_id, id);
-- Every chronicle row names the runtime and work it belongs to, and the trace
-- event it was projected from. A row with no trace_event_id is a direct local
-- note; a row with one is a PROJECTION of an authority-confirmed fact, not a
-- second private history of the same thing. The unique index is what makes
-- projecting the same trace twice a no-op.
CREATE UNIQUE INDEX IF NOT EXISTS idx_chronicle_event
  ON chronicle(workspace_id, trace_event_id) WHERE trace_event_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS snapshots (
  id           TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  turn_id      TEXT NOT NULL,
  mission_id   TEXT,
  agent_id     TEXT,
  reason       TEXT NOT NULL,      -- pre_compression | closeout
  path         TEXT NOT NULL,      -- the durable markdown on disk
  entries      INTEGER NOT NULL,
  at           TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_snapshots_turn ON snapshots(workspace_id, turn_id);

-- A context pack is an OUTPUT of the brain, never the brain itself. It cites
-- what it was built from and goes stale when those sources move.
CREATE TABLE IF NOT EXISTS context_packs (
  id            TEXT PRIMARY KEY,
  workspace_id  TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  version       INTEGER NOT NULL,
  built_for     TEXT,              -- agent id
  mission_id    TEXT,
  goal          TEXT NOT NULL,
  body          TEXT NOT NULL,
  sources_json  TEXT NOT NULL,     -- [{path, hash}] — the provenance
  workspace_head TEXT,             -- git sha the pack describes
  built_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_packs_ws ON context_packs(workspace_id, version DESC);
`

export type ChronicleKind = 'instruction' | 'response' | 'tool_call' | 'command' | 'error' | 'note'

export function ensureChronicleSchema(db: DatabaseSync): void { db.exec(SCHEMA) }

const homeFor = (root: string): string => join(root, '.plugbrain')

/** Record one observable event. Never rewritten, only appended. */
export function record(
  db: DatabaseSync, workspaceId: string, turnId: string,
  kind: ChronicleKind, body: string,
  opts: { agentId?: string; missionId?: string } = {},
): void {
  ensureChronicleSchema(db)
  db.prepare(
    `INSERT INTO chronicle (workspace_id, turn_id, mission_id, agent_id, kind, body, at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(workspaceId, turnId, opts.missionId ?? null, opts.agentId ?? null, kind, body, new Date().toISOString())
}

export interface SnapshotState {
  mission?: string
  goal?: string
  acceptance?: string[]
  plan?: string[]
  done?: string[]
  open?: string[]
  filesRead?: string[]
  filesChanged?: string[]
  lastCommands?: string[]
  testResults?: string[]
  blockers?: string[]
  decisions?: string[]
  constraints?: string[]
  assumptions?: string[]
  openQuestions?: string[]
  nextAction?: string
}

/**
 * Write the pre-compression checkpoint. Called BEFORE context is compressed,
 * which is the only moment at which the full state still exists.
 *
 * Returns the path of the durable markdown, so the caller can cite it.
 */
export function writeSnapshot(
  db: DatabaseSync, workspaceId: string, turnId: string,
  reason: 'pre_compression' | 'closeout', state: SnapshotState,
  opts: { agentId?: string; missionId?: string } = {},
): { id: string; path: string; entries: number } {
  ensureChronicleSchema(db)
  const ws = requireWorkspace(db, workspaceId)
  const entries = db.prepare(
    `SELECT kind, agent_id, body, at FROM chronicle
      WHERE workspace_id = ? AND turn_id = ? ORDER BY id`).all(workspaceId, turnId) as
    { kind: string; agent_id: string | null; body: string; at: string }[]

  const id = `snap-${randomUUID().slice(0, 8)}`
  const dir = join(homeFor(ws.root), 'snapshots')
  mkdirSync(dir, { recursive: true })
  const file = join(dir, `${turnId}-${reason}-${id}.md`)

  const section = (title: string, items?: string[]): string[] =>
    !items || items.length === 0 ? [] : [`## ${title}`, ...items.map(i => `- ${i}`), '']

  const lines: string[] = [
    `# Turn snapshot — ${reason.replace('_', ' ')}`,
    '',
    `Workspace: ${ws.name} (\`${ws.root}\`)`,
    `Turn: \`${turnId}\``,
    opts.missionId ? `Mission: \`${opts.missionId}\`` : '',
    opts.agentId ? `Agent: \`${opts.agentId}\`` : '',
    `Written: ${new Date().toISOString()}`,
    '',
    state.goal ? `## Goal\n\n${state.goal}\n` : '',
    ...section('Acceptance criteria', state.acceptance),
    ...section('Plan', state.plan),
    ...section('Done', state.done),
    ...section('Still open', state.open),
    ...section('Files read', state.filesRead),
    ...section('Files changed', state.filesChanged),
    ...section('Last commands', state.lastCommands),
    ...section('Test results', state.testResults),
    ...section('Blockers', state.blockers),
    ...section('Decisions', state.decisions),
    ...section('Constraints', state.constraints),
    ...section('Assumptions', state.assumptions),
    ...section('Open questions', state.openQuestions),
    state.nextAction ? `## Exact next action\n\n${state.nextAction}\n` : '',
    '## Full turn chronicle',
    '',
    'Verbatim and append-only. Everything above is derived FROM this; if the',
    'two ever disagree, this is what actually happened.',
    '',
    ...entries.map(e =>
      `### ${e.at} · ${e.kind}${e.agent_id ? ` · ${e.agent_id}` : ''}\n\n${e.body}\n`),
  ].filter(line => line !== '')

  writeFileSync(file, lines.join('\n'), 'utf8')
  db.prepare(
    `INSERT INTO snapshots (id, workspace_id, turn_id, mission_id, agent_id, reason, path, entries, at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, workspaceId, turnId, opts.missionId ?? null, opts.agentId ?? null,
    reason, file, entries.length, new Date().toISOString())

  return { id, path: file, entries: entries.length }
}

/**
 * Build a context pack for a goal. Every pack cites the exact files and their
 * content hashes, so `packStaleness` can later say precisely what moved —
 * invariant 8 is a column here, not a promise.
 */
export function buildContextPack(
  db: DatabaseSync, workspaceId: string, goal: string,
  opts: { agentId?: string; missionId?: string; limit?: number } = {},
): { id: string; version: number; sources: number; body: string } {
  ensureChronicleSchema(db)
  requireWorkspace(db, workspaceId)
  const limit = opts.limit ?? 12

  // Relevance is the index's answer, not a guess: symbols and paths matching
  // the goal, ranked by how connected their file is.
  const terms = goal.toLowerCase().split(/[^a-z0-9_]+/i).filter(t => t.length > 2).slice(0, 6)
  const hits = new Map<string, { path: string; hash: string | null; why: string[] }>()
  for (const term of terms) {
    const rows = db.prepare(
      `SELECT r.path, r.name, r.kind, fi.hash
         FROM search m
         JOIN search_rows r ON r.id = m.rowid
         LEFT JOIN files fi ON fi.id = r.file_id
        WHERE m.search MATCH ? AND r.workspace_id = ? LIMIT 40`
    ).all(`${term}*`, workspaceId) as { path: string; name: string; kind: string; hash: string | null }[]
    for (const row of rows) {
      const entry = hits.get(row.path) ?? { path: row.path, hash: row.hash, why: [] }
      if (entry.why.length < 4) entry.why.push(`${row.kind} ${row.name}`)
      hits.set(row.path, entry)
    }
  }
  const sources = [...hits.values()].slice(0, limit)

  const head = (db.prepare('SELECT head FROM git_state WHERE workspace_id = ?')
    .get(workspaceId) as { head: string } | undefined)?.head ?? null

  const version = ((db.prepare(
    'SELECT MAX(version) v FROM context_packs WHERE workspace_id = ?').get(workspaceId) as { v: number | null }).v ?? 0) + 1

  const body = [
    `# Context pack v${version} — ${goal}`,
    '',
    head ? `Workspace state: \`${head.slice(0, 12)}\`` : 'Workspace state: not a git repository',
    `Built: ${new Date().toISOString()}`,
    '',
    '## Sources',
    '',
    'Each entry is why the brain thinks this file matters for the goal. A pack',
    'never replaces reading the file; it says where to look and why.',
    '',
    ...sources.map(s => `- \`${s.path}\` — ${s.why.join(', ')}`),
    '',
    sources.length === 0
      ? '_The index matched nothing for this goal. That is a real answer: either the goal names something that does not exist yet, or the workspace is not indexed._'
      : '',
  ].filter(Boolean).join('\n')

  const id = `pack-${randomUUID().slice(0, 8)}`
  db.prepare(
    `INSERT INTO context_packs
       (id, workspace_id, version, built_for, mission_id, goal, body, sources_json, workspace_head, built_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, workspaceId, version, opts.agentId ?? null, opts.missionId ?? null, goal, body,
    JSON.stringify(sources.map(s => ({ path: s.path, hash: s.hash }))), head, new Date().toISOString())

  return { id, version, sources: sources.length, body }
}

/** Which of a pack's sources have changed since it was built. */
export function packStaleness(db: DatabaseSync, packId: string): {
  packId: string; stale: boolean; changed: string[]; missing: string[]
} {
  const pack = db.prepare('SELECT workspace_id, sources_json FROM context_packs WHERE id = ?')
    .get(packId) as { workspace_id: string; sources_json: string } | undefined
  if (!pack) throw new Error(`unknown context pack: ${packId}`)
  const sources = JSON.parse(pack.sources_json) as { path: string; hash: string | null }[]
  const changed: string[] = []
  const missing: string[] = []
  for (const source of sources) {
    const row = db.prepare('SELECT hash FROM files WHERE workspace_id = ? AND path = ?')
      .get(pack.workspace_id, source.path) as { hash: string | null } | undefined
    if (!row) { missing.push(source.path); continue }
    if (source.hash && row.hash && row.hash !== source.hash) changed.push(source.path)
  }
  return { packId, stale: changed.length > 0 || missing.length > 0, changed, missing }
}


// ---------------------------------------------------------------------------
// Trace projection
// ---------------------------------------------------------------------------

interface ChronicleColumnRow { name: string }

/** Widen a chronicle table created by an older version. */
function ensureChronicleColumns(db: DatabaseSync): void {
  const columns = db.prepare('PRAGMA table_info(chronicle)').all() as unknown as ChronicleColumnRow[]
  if (columns.length === 0) return
  const have = new Set(columns.map(row => row.name))
  const additions: Array<[string, string]> = [
    ['runtime_instance_id', 'TEXT'],
    ['task_id', 'TEXT'],
    ['worker_id', 'TEXT'],
    ['trace_event_id', 'TEXT'],
    ['source', "TEXT NOT NULL DEFAULT 'local'"],
  ]
  for (const [name, definition] of additions) {
    if (!have.has(name)) db.exec('ALTER TABLE chronicle ADD COLUMN ' + name + ' ' + definition)
  }
  db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_chronicle_event
             ON chronicle(workspace_id, trace_event_id) WHERE trace_event_id IS NOT NULL`)
}

/** Which chronicle kind an authority-confirmed event reads as. */
function kindForTraceType(type: TraceEventType): ChronicleKind {
  if (type === 'worker.failed' || type === 'integration.rejected' || type === 'file.claim.denied') return 'error'
  if (type === 'test.started' || type === 'test.completed' || type === 'commit.created') return 'command'
  if (type === 'context.pack.created' || type === 'context.pack.consumed') return 'instruction'
  if (type.startsWith('file.') || type === 'symbol.changed' || type === 'artifact.created') return 'tool_call'
  return 'note'
}

/** A short, already-redacted line describing what the authority reported. */
function bodyForTrace(event: StoredTraceEvent): string {
  const parts: string[] = [event.type]
  if (event.fileRefs.length > 0) parts.push(`files=${event.fileRefs.slice(0, 8).join(',')}`)
  if (event.symbolRefs.length > 0) parts.push(`symbols=${event.symbolRefs.slice(0, 8).join(',')}`)
  if (event.receiptRefs.length > 0) parts.push(`receipts=${event.receiptRefs.slice(0, 4).join(',')}`)
  const summary = event.payload.summary
  if (typeof summary === 'string' && summary !== '') parts.push(summary.slice(0, 400))
  parts.push(`via ${event.provenance.mode}:${event.provenance.authorityRef}`)
  return parts.join(' | ')
}

export interface ProjectionResult {
  projected: number
  /** Already present: projecting the same trace twice is a no-op. */
  alreadyPresent: number
}

/**
 * Project authority-confirmed trace events into the chronicle.
 *
 * Chronicle used to be written only by whatever happened to call `record()`,
 * which made it a private second history that could disagree with the Operator
 * about what occurred. It is now a PROJECTION: every projected row carries the
 * runtime, task, worker and turn ids the authority used, plus the id of the
 * trace event it came from, and re-running this inserts nothing new.
 *
 * A turn boundary, a worker event and a receipt therefore all reach the
 * chronicle through the same door, and none of them can invent an id.
 */
export function projectChronicleFromTrace(
  db: DatabaseSync,
  workspaceId: string,
  filter: { taskId?: string; limit?: number } = {},
): ProjectionResult {
  ensureChronicleSchema(db)
  ensureChronicleColumns(db)
  const events = readTrace(db, workspaceId, filter)
  const result: ProjectionResult = { projected: 0, alreadyPresent: 0 }
  if (events.length === 0) return result

  const insert = db.prepare(
    `INSERT OR IGNORE INTO chronicle
       (workspace_id, turn_id, mission_id, agent_id, kind, body, at,
        runtime_instance_id, task_id, worker_id, trace_event_id, source)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)

  db.exec('BEGIN IMMEDIATE')
  try {
    for (const event of events) {
      // An agent id that this workspace has never seen would violate the
      // agents foreign key. Attribution is dropped to null rather than
      // inventing an agent row for a name we cannot vouch for.
      const knownAgent = event.agentId !== undefined && db.prepare(
        'SELECT 1 AS present FROM agents WHERE id = ?').get(event.agentId) !== undefined
      const info = insert.run(
        workspaceId,
        event.turnId ?? event.taskId ?? event.workerId ?? event.eventId,
        event.missionId ?? null,
        knownAgent ? event.agentId ?? null : null,
        kindForTraceType(event.type),
        bodyForTrace(event),
        event.occurredAt,
        event.runtimeInstanceId,
        event.taskId ?? null,
        event.workerId ?? null,
        event.eventId,
        event.source)
      if (Number(info.changes) === 0) result.alreadyPresent += 1
      else result.projected += 1
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
  return result
}
