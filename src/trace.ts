/**
 * The agent trace log: append-only, exactly-once, and never invented.
 *
 * PlugBrain does not own tasks, worktrees or file leases — the Operator and
 * `@plug/work` do. This module ingests what those authorities CONFIRMED and
 * makes it queryable. That distinction is the whole design: every row here
 * names the authority it came from, and a row whose identity chain does not
 * resolve is quarantined rather than guessed into shape.
 *
 * Three properties the callers depend on:
 *
 *   EXACTLY ONCE. `(source, runtime_instance_id, event_id)` is unique, so a
 *   replayed operator log, a reconnecting client and a restarted runtime all
 *   converge on the same row count instead of duplicating tracks.
 *
 *   ORDER-INDEPENDENT. Events may arrive late or out of order. Nothing is
 *   derived at insert time; projections are rebuilt deterministically by
 *   ordering on (occurred_at, source_sequence, event_id), so the same set of
 *   events in any arrival order produces byte-identical views.
 *
 *   NO SECRETS. Payloads pass through a redaction gate before they are stored.
 *   A trace log is exactly the kind of place a token leaks into and then gets
 *   copied into a screenshot, an export and a bug report.
 */
import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import { invalidateTraceProjection } from './store/projection-cache.ts'
import { rowsAs } from './store/rows.ts'

/** Where a fact came from. `import` is historical and always marked as such. */
export type TraceSource = 'operator' | 'work' | 'brain' | 'git' | 'receipt' | 'import'

/** How much the row can be trusted, and whether it was observed live. */
export type ProvenanceMode = 'live' | 'recovered' | 'historical-import'
export type Confidence = 'authoritative' | 'derived'

export const TRACE_EVENT_TYPES = [
  'agent.registered',
  'task.assigned',
  'context.pack.created',
  'context.pack.consumed',
  'worktree.leased',
  'worktree.recovered',
  'file.claimed',
  'file.claim.denied',
  'file.read',
  'file.changed',
  'file.renamed',
  'file.deleted',
  'symbol.changed',
  'artifact.created',
  'work.prepared_for',
  'handoff.requested',
  'handoff.accepted',
  'review.requested',
  'review.completed',
  'test.started',
  'test.completed',
  'commit.created',
  'integration.queued',
  'integration.accepted',
  'integration.rejected',
  'worker.started',
  'worker.heartbeat',
  'worker.backoff',
  'worker.completed',
  'worker.failed',
  'worker.cancelled',
] as const
export type TraceEventType = (typeof TRACE_EVENT_TYPES)[number]

export interface TraceProvenance {
  mode: ProvenanceMode
  /** The authority record this was read from. Never a free-text claim. */
  authorityRef: string
  confidence: Confidence
}

export interface AgentTraceEvent {
  schema: 1
  eventId: string
  source: TraceSource
  sourceSequence?: number
  runtimeInstanceId: string
  workspaceId: string
  repositoryId?: string
  missionId?: string
  goalId?: string
  taskId?: string
  taskVersion?: number
  worktreeId?: string
  workerId?: string
  attempt?: number
  agentId?: string
  profileId?: string
  resourceId?: string
  deploymentId?: string
  routeId?: string
  sessionId?: string
  turnId?: string
  type: TraceEventType
  occurredAt: string
  observedAt: string
  fileRefs?: string[]
  symbolRefs?: string[]
  artifactRefs?: string[]
  receiptRefs?: string[]
  payload?: Record<string, unknown>
  provenance: TraceProvenance
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS trace_events (
  id                  INTEGER PRIMARY KEY,
  schema_version      INTEGER NOT NULL DEFAULT 1,
  event_id            TEXT NOT NULL,
  source              TEXT NOT NULL,
  source_sequence     INTEGER,
  runtime_instance_id TEXT NOT NULL,
  workspace_id        TEXT NOT NULL,
  repository_id       TEXT,
  mission_id          TEXT,
  goal_id             TEXT,
  task_id             TEXT,
  task_version        INTEGER,
  worktree_id         TEXT,
  worker_id           TEXT,
  attempt             INTEGER,
  agent_id            TEXT,
  profile_id          TEXT,
  resource_id         TEXT,
  deployment_id       TEXT,
  route_id            TEXT,
  session_id          TEXT,
  turn_id             TEXT,
  type                TEXT NOT NULL,
  occurred_at         TEXT NOT NULL,
  observed_at         TEXT NOT NULL,
  file_refs           TEXT NOT NULL DEFAULT '[]',
  symbol_refs         TEXT NOT NULL DEFAULT '[]',
  artifact_refs       TEXT NOT NULL DEFAULT '[]',
  receipt_refs        TEXT NOT NULL DEFAULT '[]',
  payload             TEXT NOT NULL DEFAULT '{}',
  provenance_mode     TEXT NOT NULL,
  authority_ref       TEXT NOT NULL,
  confidence          TEXT NOT NULL,
  -- Exactly-once. A replayed log, a reconnecting client and a restarted
  -- runtime all collapse onto the same row instead of growing a second track.
  UNIQUE (source, runtime_instance_id, event_id)
);
CREATE INDEX IF NOT EXISTS idx_trace_ws ON trace_events(workspace_id, occurred_at);
-- Mesh orders every trace deterministically by this complete key. Without the
-- expression index SQLite read the workspace range efficiently but still built
-- a temporary B-tree for source sequence and event id on every cold snapshot.
CREATE INDEX IF NOT EXISTS idx_trace_ws_order
  ON trace_events(workspace_id, occurred_at, COALESCE(source_sequence, 0), event_id);
CREATE INDEX IF NOT EXISTS idx_trace_task ON trace_events(workspace_id, task_id);
CREATE INDEX IF NOT EXISTS idx_trace_agent ON trace_events(workspace_id, agent_id);
CREATE INDEX IF NOT EXISTS idx_trace_worker ON trace_events(workspace_id, worker_id);
CREATE INDEX IF NOT EXISTS idx_trace_type ON trace_events(workspace_id, type);
CREATE INDEX IF NOT EXISTS idx_trace_ws_type_occurred ON trace_events(workspace_id, type, occurred_at);

-- An event whose identity chain does not resolve is NOT dropped and NOT
-- guessed into shape: it is kept here with the reason, so an operator can see
-- that something real arrived that this workspace could not place.
CREATE TABLE IF NOT EXISTS trace_quarantine (
  id           INTEGER PRIMARY KEY,
  event_id     TEXT NOT NULL,
  source       TEXT NOT NULL,
  workspace_id TEXT,
  reason       TEXT NOT NULL,
  raw          TEXT NOT NULL,
  at           TEXT NOT NULL
);
`

export function ensureTraceSchema(db: DatabaseSync): void { db.exec(SCHEMA) }

/**
 * Patterns that must never reach the trace log. Deliberately broad: a false
 * positive costs a redacted string in a debug payload, a false negative puts a
 * live credential into an append-only table that is later exported.
 */
const SECRET_PATTERNS: RegExp[] = [
  /\bsk-[A-Za-z0-9_-]{16,}/g,
  /\bghp_[A-Za-z0-9]{20,}/g,
  /\bgithub_pat_[A-Za-z0-9_]{20,}/g,
  /\bAIza[A-Za-z0-9_-]{20,}/g,
  /\bnvapi-[A-Za-z0-9_-]{16,}/g,
  /\bxox[abprs]-[A-Za-z0-9-]{10,}/g,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g,
  /\b[A-Fa-f0-9]{32,}\b/g,
  /(?<=(?:token|secret|password|api[_-]?key|authorization|bearer)["'\s:=]{1,4})[^\s"',}]{12,}/gi,
]

export const REDACTED = '[redacted]'

/** Replace anything that looks like a credential. Structure is preserved. */
export function redactText(text: string): string {
  let out = text
  for (const pattern of SECRET_PATTERNS) out = out.replace(pattern, REDACTED)
  return out
}

/** Deep-redact a payload. Non-serialisable values are dropped, not stringified. */
export function redactPayload(value: unknown, depth = 0): unknown {
  if (depth > 8) return REDACTED
  if (typeof value === 'string') return redactText(value)
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return value
  if (Array.isArray(value)) return value.slice(0, 200).map(item => redactPayload(item, depth + 1))
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      // A key that NAMES a credential is redacted whatever its shape.
      if (/^(token|secret|password|api[_-]?key|authorization|bearer|credential)$/i.test(key)) {
        out[key] = REDACTED
        continue
      }
      out[key] = redactPayload(inner, depth + 1)
    }
    return out
  }
  return undefined
}

export interface IngestResult {
  inserted: number
  /** Already present under the same (source, runtime, eventId). */
  duplicates: number
  /** Kept in trace_quarantine with a reason. */
  quarantined: number
  reasons: string[]
}

interface IngestOptions {
  /**
   * Workspace ids this database may accept. An event for an unknown workspace
   * is quarantined: silently accepting it is how a trace log ends up mixing
   * two projects.
   */
  knownWorkspaceIds?: ReadonlySet<string>
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

/** Structural validation. Returns a reason string, or null when the event is usable. */
function validate(event: AgentTraceEvent, options: IngestOptions): string | null {
  if (event.schema !== 1) return `unsupported schema ${String(event.schema)}`
  if (typeof event.eventId !== 'string' || event.eventId === '') return 'missing eventId'
  if (typeof event.runtimeInstanceId !== 'string' || event.runtimeInstanceId === '') {
    return 'missing runtimeInstanceId'
  }
  if (typeof event.workspaceId !== 'string' || event.workspaceId === '') return 'missing workspaceId'
  if (!(TRACE_EVENT_TYPES as readonly string[]).includes(event.type)) {
    return `unknown event type ${String(event.type)}`
  }
  if (!isIsoDate(event.occurredAt)) return 'occurredAt is not an ISO timestamp'
  if (!isIsoDate(event.observedAt)) return 'observedAt is not an ISO timestamp'
  const mode = event.provenance?.mode
  if (mode !== 'live' && mode !== 'recovered' && mode !== 'historical-import') {
    return 'provenance.mode must be live, recovered or historical-import'
  }
  if (typeof event.provenance.authorityRef !== 'string' || event.provenance.authorityRef === '') {
    return 'provenance.authorityRef is required: a fact with no authority is not a fact'
  }
  if (event.provenance.confidence !== 'authoritative' && event.provenance.confidence !== 'derived') {
    return 'provenance.confidence must be authoritative or derived'
  }
  const known = options.knownWorkspaceIds
  if (known !== undefined && !known.has(event.workspaceId)) {
    return `unknown workspaceId ${event.workspaceId}`
  }
  return null
}

const list = (value: string[] | undefined): string =>
  JSON.stringify(Array.isArray(value) ? value.slice(0, 500).map(String) : [])

/**
 * Ingest a batch. Idempotent: re-ingesting the same batch inserts nothing and
 * reports the events as duplicates. The whole batch is one transaction, so a
 * malformed tail cannot leave a half-applied prefix.
 */
export function ingestTraceEvents(
  db: DatabaseSync,
  events: readonly AgentTraceEvent[],
  options: IngestOptions = {},
): IngestResult {
  ensureTraceSchema(db)
  const result: IngestResult = { inserted: 0, duplicates: 0, quarantined: 0, reasons: [] }
  if (events.length === 0) return result

  const insert = db.prepare(
    `INSERT OR IGNORE INTO trace_events (
       schema_version, event_id, source, source_sequence, runtime_instance_id, workspace_id,
       repository_id, mission_id, goal_id, task_id, task_version, worktree_id, worker_id,
       attempt, agent_id, profile_id, resource_id, deployment_id, route_id, session_id, turn_id,
       type, occurred_at, observed_at, file_refs, symbol_refs, artifact_refs, receipt_refs,
       payload, provenance_mode, authority_ref, confidence)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const quarantine = db.prepare(
    `INSERT INTO trace_quarantine (event_id, source, workspace_id, reason, raw, at)
     VALUES (?, ?, ?, ?, ?, ?)`)

  db.exec('BEGIN IMMEDIATE')
  try {
    for (const event of events) {
      const reason = validate(event, options)
      if (reason !== null) {
        result.quarantined += 1
        if (!result.reasons.includes(reason)) result.reasons.push(reason)
        quarantine.run(
          String(event?.eventId ?? ''), String(event?.source ?? 'unknown'),
          typeof event?.workspaceId === 'string' ? event.workspaceId : null,
          reason,
          redactText(JSON.stringify(event ?? null)).slice(0, 4000),
          new Date().toISOString())
        continue
      }
      const info = insert.run(
        event.eventId, event.source, event.sourceSequence ?? null,
        event.runtimeInstanceId, event.workspaceId, event.repositoryId ?? null,
        event.missionId ?? null, event.goalId ?? null, event.taskId ?? null,
        event.taskVersion ?? null, event.worktreeId ?? null, event.workerId ?? null,
        event.attempt ?? null, event.agentId ?? null, event.profileId ?? null,
        event.resourceId ?? null, event.deploymentId ?? null, event.routeId ?? null,
        event.sessionId ?? null, event.turnId ?? null,
        event.type, event.occurredAt, event.observedAt,
        list(event.fileRefs), list(event.symbolRefs),
        list(event.artifactRefs), list(event.receiptRefs),
        JSON.stringify(redactPayload(event.payload ?? {}) ?? {}),
        event.provenance.mode, event.provenance.authorityRef, event.provenance.confidence)
      if (Number(info.changes) === 0) result.duplicates += 1
      else result.inserted += 1
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
  if (result.inserted > 0) {
    for (const workspaceId of new Set(events.map(event => event.workspaceId))) {
      invalidateTraceProjection(db, workspaceId)
    }
  }
  return result
}

export interface StoredTraceEvent extends Omit<AgentTraceEvent, 'payload'> {
  payload: Record<string, unknown>
}

/**
 * Read a workspace's trace in deterministic order.
 *
 * The ordering key is (occurredAt, sourceSequence, eventId) and NOT insertion
 * order, which is what makes a rebuilt projection independent of the order
 * events happened to arrive in.
 */
export function readTrace(
  db: DatabaseSync,
  workspaceId: string,
  filter: { taskId?: string; agentId?: string; workerId?: string; types?: readonly TraceEventType[]; limit?: number } = {},
): StoredTraceEvent[] {
  ensureTraceSchema(db)
  const where: string[] = ['workspace_id = ?']
  const params: SQLInputValue[] = [workspaceId]
  if (filter.taskId !== undefined) { where.push('task_id = ?'); params.push(filter.taskId) }
  if (filter.agentId !== undefined) { where.push('agent_id = ?'); params.push(filter.agentId) }
  if (filter.workerId !== undefined) { where.push('worker_id = ?'); params.push(filter.workerId) }
  if (filter.types !== undefined && filter.types.length > 0) {
    where.push(`type IN (${filter.types.map(() => '?').join(',')})`)
    params.push(...filter.types)
  }
  const limit = Math.min(5000, Math.max(1, filter.limit ?? 1000))
  const rows = rowsAs<Record<string, unknown>>(db.prepare(
    `SELECT * FROM trace_events WHERE ${where.join(' AND ')}
      ORDER BY occurred_at ASC, COALESCE(source_sequence, 0) ASC, event_id ASC
      LIMIT ?`).all(...params, limit))

  return rows.map(row => ({
    schema: 1 as const,
    eventId: String(row.event_id),
    source: String(row.source) as TraceSource,
    ...(row.source_sequence === null ? {} : { sourceSequence: Number(row.source_sequence) }),
    runtimeInstanceId: String(row.runtime_instance_id),
    workspaceId: String(row.workspace_id),
    ...(row.repository_id === null ? {} : { repositoryId: String(row.repository_id) }),
    ...(row.mission_id === null ? {} : { missionId: String(row.mission_id) }),
    ...(row.goal_id === null ? {} : { goalId: String(row.goal_id) }),
    ...(row.task_id === null ? {} : { taskId: String(row.task_id) }),
    ...(row.task_version === null ? {} : { taskVersion: Number(row.task_version) }),
    ...(row.worktree_id === null ? {} : { worktreeId: String(row.worktree_id) }),
    ...(row.worker_id === null ? {} : { workerId: String(row.worker_id) }),
    ...(row.attempt === null ? {} : { attempt: Number(row.attempt) }),
    ...(row.agent_id === null ? {} : { agentId: String(row.agent_id) }),
    ...(row.profile_id === null ? {} : { profileId: String(row.profile_id) }),
    ...(row.resource_id === null ? {} : { resourceId: String(row.resource_id) }),
    ...(row.deployment_id === null ? {} : { deploymentId: String(row.deployment_id) }),
    ...(row.route_id === null ? {} : { routeId: String(row.route_id) }),
    ...(row.session_id === null ? {} : { sessionId: String(row.session_id) }),
    ...(row.turn_id === null ? {} : { turnId: String(row.turn_id) }),
    type: String(row.type) as TraceEventType,
    occurredAt: String(row.occurred_at),
    observedAt: String(row.observed_at),
    fileRefs: JSON.parse(String(row.file_refs)) as string[],
    symbolRefs: JSON.parse(String(row.symbol_refs)) as string[],
    artifactRefs: JSON.parse(String(row.artifact_refs)) as string[],
    receiptRefs: JSON.parse(String(row.receipt_refs)) as string[],
    payload: JSON.parse(String(row.payload)) as Record<string, unknown>,
    provenance: {
      mode: String(row.provenance_mode) as ProvenanceMode,
      authorityRef: String(row.authority_ref),
      confidence: String(row.confidence) as Confidence,
    },
  }))
}
