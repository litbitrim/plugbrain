/**
 * PlugBrain HTTP API — one model, many projections.
 *
 * Every surface (Galaxy, Planet, Surface, Explorer, PlugBoard) reads from here
 * rather than keeping its own half-complete copy of the truth, which is
 * invariant 12 of the contract. Agent identity and colour ride along with
 * every projection, so a track is visible in every graph without the client
 * having to correlate anything itself.
 */
import { createHash, randomUUID } from 'node:crypto'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { extname, join, resolve as resolvePath } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import * as access from '../access.ts'
import { buildBriefing, renderBriefing } from '../context/briefing.ts'
import {
  activePlanetFileScope, assertPlanetIndexSelectionConfigured, getPlanetIndexSelection,
  listWorkspaceView, noteRootRows, planetHistory, registerPlanet, setPlanetIndexSelection,
} from '../planet.ts'
import * as notes from '../notes/vault.ts'
import * as attachments from '../notes/attachments.ts'
import { exportNote, exportVault } from '../notes/export.ts'

/**
 * The identity a search is attributed to. A read is a read: the provenance
 * records who looked, even when nobody typed a command.
 */
const NOTES_READ_AGENT = 'notes-search'

/**
 * Make sure the agent a READ is attributed to exists.
 *
 * A read route cannot close the loop the way a write does: there is no claim to
 * take and no lease to fence, only "who looked". What it needs is a *known*
 * identity, and that identity is created only by the explicit, authenticated
 * `/api/agent/attach` — never by a read (FO-3). A read that invented an agent id
 * would let any caller mint identities in the ledger for free, which is the one
 * thing the access layer may not allow.
 *
 * The local UI therefore attaches its own agent once at startup; see
 * `ensureAgentAttached` in the browser client. Until then a read of an unknown
 * id is refused with 403 instead of being silently conceded.
 */
function knownAgent(db: DatabaseSync, agentId: string): void {
  access.requireAgent(db, agentId)
}

/**
 * Serve the browser shell with the daemon's own session already in it.
 *
 * The server binds 127.0.0.1 only and sends no CORS headers, so a foreign page
 * cannot read this body. Handing the local page its token is what makes the
 * vault work the instant it opens, instead of asking the operator to copy a key
 * out of a log into a dialog — the step at which "click a file" used to answer
 * `unauthorized`.
 *
 * The page's own stored/localStorage token still wins: this only fills in what
 * the shell has not been configured with.
 */
function withLocalSession(html: string, ctx: Ctx): string {
  const token = ctx.authKey ?? process.env.PLUG_BRAIN_AUTH_KEY
  if (!token) return html
  const script = `<script>window.__PLUGBRAIN__=${JSON.stringify({ token })}</script>`
  return html.includes('</head>')
    ? html.replace('</head>', `  ${script}\n</head>`)
    : `${script}\n${html}`
}
import * as missions from '../missions.ts'
import * as queue from '../queue.ts'
import { createAwarenessPort, type TaskAwarenessPack } from '../projections/awareness.ts'
import { cityDelta, citySnapshot } from '../projections/city.ts'
import { evaluateClaim } from '../projections/conflicts.ts'
import { meshSnapshot, meshTimeline } from '../projections/mesh.ts'
import { searchWorkspace } from '../store/search.ts'
import { ingestTraceEvents, ensureTraceSchema } from '../trace.ts'
import { buildContextPack, packStaleness } from '../chronicle.ts'
import * as intel from '../intel/index.ts'
import * as coord from '../coord/index.ts'
import { homedir } from 'node:os'
import { backupStore, verifyBackupFile } from '../store/backup.ts'
import { IndexRunBusy, IndexWorkerUnavailable, startIndexRun } from '../index/runner.ts'
import {
  appraiseRun, describeRun, listRunStates, readPendingReindex, readRunState,
  type RunAppraisal, type RunState,
} from '../index/runs.ts'
import { refreshDaemon } from '../daemon.ts'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
}

export class AuthenticationRequired extends Error {}

export interface Ctx {
  db: DatabaseSync
  uiRoot: string | null
  /**
   * The store file. An index run happens in a worker thread with its own
   * connection, and a worker cannot ask a `DatabaseSync` where it came from —
   * so the path is configuration, not something to guess.
   */
  dbFile?: string | null
  authKey?: string | null
  requireAuth?: boolean
  instanceId?: string | null
}

const json = (res: ServerResponse, body: unknown, status = 200): void => {
  const payload = JSON.stringify(body)
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(payload)
}

const binary = (res: ServerResponse, body: Buffer, filename: string, type = 'application/octet-stream'): void => {
  const safe = filename.replace(/[\r\n"]/g, '_')
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': String(body.byteLength),
    'Content-Disposition': `attachment; filename="${safe}"`,
  })
  res.end(body)
}

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  if (chunks.length === 0) return {}
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { return {} }
}

/** Agent roster with colours — the legend every other projection is read against. */
function agentsOf(db: DatabaseSync, workspaceId: string) {
  return db.prepare(
    `SELECT a.id, a.name, a.color, a.hue, a.first_seen AS firstSeen, a.last_seen AS lastSeen,
            (SELECT COUNT(*) FROM activity ac
              WHERE ac.agent_id = a.id AND ac.workspace_id = ?) AS actions,
            (SELECT COUNT(DISTINCT ac.path) FROM activity ac
              WHERE ac.agent_id = a.id AND ac.workspace_id = ?
                AND ac.action IN ('write','create')) AS filesTouched
       FROM agents a
      WHERE EXISTS (SELECT 1 FROM activity ac WHERE ac.agent_id = a.id AND ac.workspace_id = ?)
      ORDER BY a.first_seen`
  ).all(workspaceId, workspaceId, workspaceId)
}

/**
 * Upper bound on files in one snapshot. Not a product limit — a refusal of an
 * absurd request. See the note at the snapshot route for the measurements.
 */
const MAX_SNAPSHOT_FILES = 20000

/**
 * Read a positive integer query parameter, falling back to `fallback` for
 * anything missing or unparseable. A bare `Number(...)` returns NaN for junk,
 * and NaN survives Math.max/Math.min unchanged — it would reach SQLite as a
 * bound parameter and silently return nothing.
 */
function clampLimit(raw: string | null, fallback: number, ceiling: number): number {
  const parsed = Number(raw)
  if (raw === null || raw === '' || !Number.isFinite(parsed)) return fallback
  return Math.min(ceiling, Math.max(1, Math.floor(parsed)))
}

/**
 * Scope a live file projection to an operator's persisted Planet selection.
 * Plain workspaces have no Planet inventory and retain their single-root
 * behavior. For an unconfigured or notes-only Planet, only unattributed notes
 * are live; stale rows from discovered Code checkouts remain inventory, never
 * projection data.
 */
function liveFileScope(
  db: DatabaseSync, workspaceId: string, checkoutColumn = 'checkout_id', pathColumn = 'path',
) {
  return activePlanetFileScope(db, workspaceId, checkoutColumn, pathColumn)
}

/** Counts for all externally visible live projections, never raw store totals. */
function liveProjectionCounts(db: DatabaseSync, workspaceId: string): {
  files: number; symbols: number; edges: number; stale: number
} {
  const files = liveFileScope(db, workspaceId, 'f.checkout_id', 'f.path')
  const source = liveFileScope(db, workspaceId, 'src.checkout_id', 'src.path')
  const destination = liveFileScope(db, workspaceId, 'dst.checkout_id', 'dst.path')
  const count = (sql: string, ...params: unknown[]): number => Number(
    (db.prepare(sql).get(...params) as { c: number } | undefined)?.c ?? 0)
  return {
    files: count(`SELECT COUNT(*) c FROM files f WHERE f.workspace_id = ? AND ${files.sql}`,
      workspaceId, ...files.params),
    symbols: count(
      `SELECT COUNT(*) c FROM symbols s JOIN files f ON f.id = s.file_id
        WHERE f.workspace_id = ? AND ${files.sql}`,
      workspaceId, ...files.params),
    edges: count(
      `SELECT COUNT(*) c FROM edges e
        JOIN files src ON src.id = e.src_file
        LEFT JOIN files dst ON dst.id = e.dst_file
       WHERE e.workspace_id = ? AND ${source.sql}
         AND (e.dst_file IS NULL OR (${destination.sql}))`,
      workspaceId, ...source.params, ...destination.params),
    stale: count(
      `SELECT COUNT(*) c FROM files f
        WHERE f.workspace_id = ? AND f.indexed_at IS NULL AND ${files.sql}`,
      workspaceId, ...files.params),
  }
}

/** Resolve a read's workspace only when that answer is genuinely unambiguous. */
function requiredIntelWorkspace(db: DatabaseSync, requested: string): string | null {
  const explicit = requested.trim()
  if (explicit) {
    access.requireWorkspace(db, explicit)
    return explicit
  }
  const known = db.prepare('SELECT id FROM workspaces ORDER BY created_at LIMIT 2').all() as
    Array<{ id: string }>
  if (known.length === 1) return known[0].id
  return null
}

/**
 * The index state a reader may act on, in the Board contract's own words.
 *
 * Read routes must answer DURING a run, so every fact here is cheap: two small
 * queries and one run-state file, never a count over the whole store. The word
 * is derived in this order and the reason names the fact that produced it, so a
 * caller never has to guess why it was told `stale`:
 *
 *   1. a run is active (running, or quiet while its owner still holds SQLite)
 *   2. no complete generation was ever published
 *   3. the newest outcome is a failure
 *   4. a filesystem change is retained but not yet indexed
 *   5. a complete generation is published and nothing is retained
 *
 * "Active" deliberately includes a QUIET run whose recorded owner is still
 * alive: it still holds the writer lock, and calling that `ready` would invite
 * a caller to write into a database that cannot take it.
 */
export type IndexState = 'unindexed' | 'indexing' | 'ready' | 'stale' | 'error'

export interface IndexStateReport {
  indexState: IndexState
  /** The fact behind the word, as a sentence. */
  indexReason: string
  indexGeneration: number
  indexLastSuccessAt: string | null
  indexFailure: { at: string | null; reason: string | null } | null
  indexProgress: Record<string, unknown> | null
}

function runProgress(appraisal: RunAppraisal): Record<string, unknown> {
  const state = appraisal.state as RunState
  return {
    jobId: state.runId,
    workspaceId: state.workspaceId,
    phase: state.phase,
    mode: state.mode,
    processed: state.processed,
    total: state.total,
    scanned: state.scanned,
    symbols: state.symbols,
    edges: state.edges,
    generation: state.generation,
    fraction: appraisal.fraction,
    runningSince: state.startedAt,
    heartbeatAt: state.heartbeatAt,
    quiet: appraisal.quiet,
    ownerAlive: appraisal.ownerAlive,
  }
}

/**
 * Does this store have that table at all?
 *
 * `git_state` is created lazily by the indexer's git pass, so a store that has
 * never run one has no such table — and a plain `SELECT` from it answers 500
 * where the honest answer is "nothing captured yet".
 */
function tableExists(db: DatabaseSync, name: string): boolean {
  return db.prepare(
    "SELECT 1 AS present FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(name) !== undefined
}

/** The run that currently owns this store, or null. Cheap and store-wide. */
function activeWriterRun(): { state: RunState; appraisal: RunAppraisal } | null {
  for (const state of listRunStates()) {
    const appraisal = appraiseRun(state.workspaceId)
    if (appraisal.state === null || appraisal.finished) continue
    // A quiet run whose owner is gone no longer holds the lock, so it is not a
    // reason to refuse anything.
    if (appraisal.recoverable) continue
    return { state: appraisal.state, appraisal }
  }
  return null
}

export function indexStateOf(db: DatabaseSync, workspaceId: string): IndexStateReport {
  const active = activeWriterRun()
  const row = db.prepare(
    `SELECT generation, last_success_at AS lastSuccessAt, last_failure_at AS lastFailureAt,
            failure_reason AS failureReason
       FROM workspace_index_state WHERE workspace_id = ?`)
    .get(workspaceId) as {
      generation: number; lastSuccessAt: string | null
      lastFailureAt: string | null; failureReason: string | null
    } | undefined
  const generation = Number(row?.generation ?? 0)
  const failure = row?.lastFailureAt === null || row?.lastFailureAt === undefined
    ? null
    : { at: row.lastFailureAt, reason: row.failureReason ?? null }
  const base = {
    indexGeneration: generation,
    indexLastSuccessAt: row?.lastSuccessAt ?? null,
    indexFailure: failure,
  }

  if (active !== null) {
    const same = active.state.workspaceId === workspaceId
    return {
      ...base,
      indexState: same ? 'indexing' : (generation === 0 ? 'unindexed' : 'ready'),
      indexReason: same
        ? 'an index run for this workspace is in progress; these are the last published numbers'
        : `an index run for ${active.state.workspaceId} holds the store's writer lock; these are the last published numbers for this workspace`,
      indexProgress: runProgress(active.appraisal),
    }
  }
  if (generation === 0) {
    return {
      ...base,
      indexState: 'unindexed',
      indexReason: failure === null
        ? 'no complete generation has been published for this workspace'
        : `no complete generation has been published; the last attempt failed: ${failure.reason ?? 'unknown reason'}`,
      indexProgress: null,
    }
  }
  if (failure !== null && (base.indexLastSuccessAt === null || failure.at !== null && failure.at > base.indexLastSuccessAt)) {
    return {
      ...base,
      indexState: 'error',
      indexReason: `the last index attempt failed (${failure.reason ?? 'unknown reason'}); the previous complete generation still stands`,
      indexProgress: null,
    }
  }
  const pending = readPendingReindex(workspaceId)
  if (pending !== null) {
    return {
      ...base,
      indexState: 'stale',
      indexReason: `a filesystem change (${pending.reason}) arrived while a run held the store and is not indexed yet`,
      indexProgress: null,
    }
  }
  return {
    ...base,
    indexState: 'ready',
    indexReason: 'a complete generation is published and no change is waiting to be indexed',
    indexProgress: null,
  }
}

/**
 * Refuse a store-writing request instead of waiting on SQLite's writer lock.
 *
 * An index run is one transaction, so it holds that lock for its whole length —
 * on a real planet, minutes. `busy_timeout` is 15 s, so today such a request
 * hangs for 15 s and then answers 500 without a reason. Answering 503 at once,
 * with the holder named and the progress attached, is both faster and honest.
 *
 * Read routes are deliberately NOT gated: WAL lets them read the last committed
 * generation while the writer works.
 */
function refuseWhileStoreIsBusy(res: ServerResponse): boolean {
  const active = activeWriterRun()
  if (active === null) return false
  const appraisal = active.appraisal
  json(res, {
    ok: false,
    status: 'busy',
    busy: true,
    jobId: active.state.runId,
    runningSince: active.state.startedAt,
    workspace: active.state.workspaceId,
    reason: `an index run for ${active.state.workspaceId} is already in progress ` +
      `(phase ${active.state.phase}, ${active.state.processed}/${active.state.total || '?'} files, ` +
      `job ${active.state.runId}); this request would wait for that run's writer lock`,
    progress: runProgress(appraisal),
    retryAfterMs: 1000,
  }, 503)
  return true
}

/**
 * Routes whose handler writes to SQLite. `/api/reindex` and `/api/planet/scan`
 * are absent on purpose: they have their own, richer busy contract (409 with
 * the holder and its progress) and must keep it.
 */
const STORE_WRITING_ROUTES = new Set([
  '/api/notes/write',
  '/api/planet/register',
  '/api/planet/selection',
  '/api/awareness',
  '/api/agent/awareness',
  '/api/context/pack',
  '/api/mission/context-pack',
  '/api/agent/attach',
  '/api/agent/read',
  '/api/agent/write',
  '/api/agent/register',
  '/api/agent/heartbeat',
  '/api/agent/claim',
  '/api/agent/release',
  '/api/agent/message',
  '/api/agent/inbox',
  '/api/agent/inbox/ack',
  '/api/agent/search',
  '/api/backup',
  '/api/queue',
  '/api/queue/claim',
  '/api/queue/deliver',
  '/api/workspaces',
])

function isStoreWritingRequest(method: string | undefined, path: string): boolean {
  if (method !== 'POST') return false
  return STORE_WRITING_ROUTES.has(path) || path.startsWith('/api/mission/')
}

/** Refuse before a background index worker is created when selection is absent. */
function ensurePlanetIndexCanStart(db: DatabaseSync, workspaceId: string, res: ServerResponse): boolean {
  try {
    assertPlanetIndexSelectionConfigured(db, workspaceId)
    return true
  } catch (error) {
    json(res, {
      ok: false,
      workspace: workspaceId,
      error: error instanceof Error ? error.message : String(error),
      planet: listWorkspaceView(db, workspaceId),
    }, 409)
    return false
  }
}

/**
 * The unified graph projection. Nodes carry the colour of the agent that owns
 * them, so agent tracks are visible in the Atlas, the City and the Planet
 * without any of them re-deriving attribution.
 */
function graphOf(db: DatabaseSync, workspaceId: string, limit: number, until?: string | null) {
  // All ranking and graph queries share this scope. A selection change takes
  // effect before the next scan tombstones old rows, so a historical checkout
  // cannot remain visible just because its last graph is still stored.
  const filesScope = liveFileScope(db, workspaceId, 'f.checkout_id', 'f.path')
  const sourceScope = liveFileScope(db, workspaceId, 'src.checkout_id', 'src.path')
  const destinationScope = liveFileScope(db, workspaceId, 'dst.checkout_id', 'dst.path')

  const all = db.prepare(
    `SELECT f.id, f.path, f.lang, f.loc, f.ext,
            o.agent_id AS agentId, a.color AS agentColor, a.name AS agentName, o.at AS ownedAt
       FROM files f
       LEFT JOIN file_owner o ON o.file_id = f.id
       LEFT JOIN agents a ON a.id = o.agent_id
      WHERE f.workspace_id = ? AND ${filesScope.sql}`
  ).all(workspaceId, ...filesScope.params) as {
    id: number; path: string; lang: string | null; loc: number; ext: string
    agentId: string | null; agentColor: string | null; agentName: string | null; ownedAt: string | null
  }[]

  // Selection is assembled from indexed queries and ranked in JS. Doing this
  // with correlated subqueries in ORDER BY re-scans the edge set once per file
  // and hangs the request outright on a real Planet.
  const touched = new Set(
    (db.prepare(
      `SELECT DISTINCT ac.path FROM activity ac
        JOIN files f ON f.workspace_id = ac.workspace_id AND f.path = ac.path
       WHERE ac.workspace_id = ? AND ac.agent_id IS NOT NULL AND ${filesScope.sql}
         AND (? IS NULL OR ac.at <= ?)`
    ).all(workspaceId, ...filesScope.params, until ?? null, until ?? null) as
      { path: string }[]).map(row => row.path))

  const imports = db.prepare(
    `SELECT e.src_file AS src, e.dst_file AS dst FROM edges e
      JOIN files src ON src.id = e.src_file
      JOIN files dst ON dst.id = e.dst_file
     WHERE e.workspace_id = ? AND e.kind = 'imports' AND e.resolved = 1
       AND ${sourceScope.sql} AND ${destinationScope.sql}`
  ).all(workspaceId, ...sourceScope.params, ...destinationScope.params) as
    Array<{ src: number; dst: number }>
  const degree = new Map<number, number>()
  for (const edge of imports) {
    degree.set(edge.src, (degree.get(edge.src) ?? 0) + 1)
    degree.set(edge.dst, (degree.get(edge.dst) ?? 0) + 1)
  }

  // Rank: agent-owned first, then anything an agent touched, then real code by
  // how connected it is. A slice full of untouched markdown has no edges and
  // teaches nobody anything.
  const rank = (f: (typeof all)[number]): number =>
    (f.agentId ? 0 : touched.has(f.path) ? 1 : f.lang ? 2 : 3)
  const files = all
    .sort((x, y) => rank(x) - rank(y)
      || (degree.get(y.id) ?? 0) - (degree.get(x.id) ?? 0)
      || x.path.localeCompare(y.path))
    .slice(0, limit)

  // Readers are a track too: the contract asks to see everywhere an agent has
  // been, not only what it changed.
  const readerRows = db.prepare(
    `SELECT ac.path, ac.agent_id AS agentId, ag.color, ag.name, MAX(ac.at) AS at
       FROM activity ac
       JOIN agents ag ON ag.id = ac.agent_id
       JOIN files f ON f.workspace_id = ac.workspace_id AND f.path = ac.path
      WHERE ac.workspace_id = ? AND ac.action = 'read' AND ${filesScope.sql}
        AND (? IS NULL OR ac.at <= ?)
      GROUP BY ac.path, ac.agent_id`
  ).all(workspaceId, ...filesScope.params, until ?? null, until ?? null) as
    { path: string; agentId: string; color: string; name: string; at: string }[]
  const readersByPath = new Map<string, { id: string; name: string; color: string; at: string }[]>()
  for (const r of readerRows) {
    const entry = { id: r.agentId, name: r.name, color: r.color, at: r.at }
    const list = readersByPath.get(r.path)
    if (list) list.push(entry); else readersByPath.set(r.path, [entry])
  }

  const ids = new Set(files.map(f => f.id))
  const edges = imports.filter(edge => ids.has(edge.src) && ids.has(edge.dst))

  return {
    truncated: all.length > files.length,
    nodes: files.map(f => ({
      id: `file:${f.id}`,
      type: 'file',
      label: f.path.split('/').pop() ?? f.path,
      path: f.path,
      lang: f.lang,
      loc: f.loc,
      agent: f.agentId ? { id: f.agentId, name: f.agentName, color: f.agentColor, at: f.ownedAt } : null,
      readers: readersByPath.get(f.path) ?? [],
    })),
    edges: edges.map(e => ({ source: `file:${e.src}`, target: `file:${e.dst}`, kind: 'imports' })),
  }
}

/**
 * Symbol-level graph for one file — the Surface level of the contract.
 *
 * A file may be named by its workspace-relative `path` or by its stable
 * `fileId`. The id is what a caller that already read `/api/files` holds, and
 * it survives a rename, so it is the better handle for a projection that
 * remembers what it was looking at.
 */
function symbolsOf(
  db: DatabaseSync, workspaceId: string, path: string, fileId: number | null = null,
) {
  const scope = liveFileScope(db, workspaceId)
  const file = fileId === null
    ? db.prepare(`SELECT id, path FROM files WHERE workspace_id = ? AND ${scope.sql} AND path = ?`)
      .get(workspaceId, ...scope.params, path) as { id: number; path: string } | undefined
    : db.prepare(`SELECT id, path FROM files WHERE workspace_id = ? AND ${scope.sql} AND id = ?`)
      .get(workspaceId, ...scope.params, fileId) as { id: number; path: string } | undefined
  if (!file) {
    // An id that names no file is not the same answer as a file without
    // symbols: say so, instead of returning an empty file that looks indexed.
    return fileId === null
      ? { path, fileId: null, known: false, symbols: [], calls: [] }
      : { path: null, fileId, known: false, symbols: [], calls: [] }
  }
  const symbols = db.prepare(
    `SELECT id, name, kind, line, end_line AS endLine, exported, container
       FROM symbols WHERE file_id = ? ORDER BY line`).all(file.id)
  const calls = db.prepare(
    `SELECT e.kind, e.raw_target AS target, e.line, e.resolved,
            s.name AS fromName
       FROM edges e LEFT JOIN symbols s ON s.id = e.src_symbol
      WHERE e.workspace_id = ? AND e.src_file = ? AND e.kind IN ('calls','references','extends','implements')
      ORDER BY e.line LIMIT 500`).all(workspaceId, file.id)
  return { path: file.path, fileId: file.id, known: true, symbols, calls }
}

/**
 * The file inventory of a workspace, paginated and scoped, with the LOC the
 * index measured — the `BrainFiles` projection of the Board contract.
 *
 * Only rows inside the active Planet selection are listed, through the same
 * `liveFileScope` every other projection uses: a stale checkout the operator
 * deselected must not reappear here just because its rows are still stored.
 */
function filesOf(
  db: DatabaseSync, workspaceId: string,
  options: { prefix: string; limit: number; offset: number },
) {
  const scope = liveFileScope(db, workspaceId, 'f.checkout_id', 'f.path')
  // `LIKE` with an escaped prefix, so a path containing `%` or `_` is matched
  // literally instead of turning into a wildcard.
  const escaped = options.prefix.replace(/[\\%_]/g, character => `\\${character}`)
  const filter = options.prefix === '' ? '' : " AND f.path LIKE ? ESCAPE '\\'"
  const params: unknown[] = [workspaceId, ...scope.params]
  if (options.prefix !== '') params.push(`${escaped}%`)

  const total = Number((db.prepare(
    `SELECT COUNT(*) AS c FROM files f WHERE f.workspace_id = ? AND ${scope.sql}${filter}`)
    .get(...params) as { c: number }).c)

  const entries = db.prepare(
    `SELECT f.id AS fileId, f.path, f.ext, f.lang, f.loc, f.generation,
            f.repo_id AS repoId, f.checkout_id AS checkoutId,
            o.agent_id AS ownerAgentId
       FROM files f
       LEFT JOIN file_owner o ON o.file_id = f.id
      WHERE f.workspace_id = ? AND ${scope.sql}${filter}
      ORDER BY f.path ASC LIMIT ? OFFSET ?`)
    .all(...params, options.limit, options.offset)

  const tombstones = db.prepare(
    `SELECT path, reason, generation, deleted_at AS deletedAt FROM file_tombstones
      WHERE workspace_id = ? ORDER BY path ASC`).all(workspaceId)

  return {
    prefix: options.prefix,
    limit: options.limit,
    offset: options.offset,
    total,
    returned: entries.length,
    truncated: options.offset + entries.length < total,
    entries,
    tombstones,
  }
}

/**
 * Every edge touching one file, in the shape `BrainEdge` asks for.
 *
 * `direction` is `out` (this file is the source), `in` (this file is the
 * target) or `both`, and the scope is applied to BOTH ends: an edge that points
 * into a deselected checkout is not part of this planet's graph, which is the
 * same rule `/api/graph` applies.
 */
function edgesOf(
  db: DatabaseSync, workspaceId: string,
  options: {
    fileId: number | null; path: string; direction: 'in' | 'out' | 'both'
    kind: string | null; resolved: boolean | null; limit: number; offset: number
  },
) {
  const sourceScope = liveFileScope(db, workspaceId, 'src.checkout_id', 'src.path')
  const destinationScope = liveFileScope(db, workspaceId, 'dst.checkout_id', 'dst.path')

  let fileId = options.fileId
  let path = options.path
  if (fileId === null) {
    const scope = liveFileScope(db, workspaceId)
    const row = db.prepare(
      `SELECT id, path FROM files WHERE workspace_id = ? AND ${scope.sql} AND path = ?`)
      .get(workspaceId, ...scope.params, path) as { id: number; path: string } | undefined
    if (row === undefined) return { fileId: null, path, known: false, edges: [], total: 0 }
    fileId = row.id
    path = row.path
  } else {
    const scope = liveFileScope(db, workspaceId)
    const row = db.prepare(
      `SELECT id, path FROM files WHERE workspace_id = ? AND ${scope.sql} AND id = ?`)
      .get(workspaceId, ...scope.params, fileId) as { id: number; path: string } | undefined
    if (row === undefined) return { fileId, path: null, known: false, edges: [], total: 0 }
    path = row.path
  }

  const direction = options.direction === 'in'
    ? 'e.dst_file = ?'
    : options.direction === 'out'
      ? 'e.src_file = ?'
      : '(e.src_file = ? OR e.dst_file = ?)'
  const directionParams = options.direction === 'both' ? [fileId, fileId] : [fileId]
  const kindFilter = options.kind === null ? '' : ' AND e.kind = ?'
  const resolvedFilter = options.resolved === null ? '' : ' AND e.resolved = ?'
  const params: unknown[] = [workspaceId, ...sourceScope.params, ...destinationScope.params]
  params.push(...directionParams)
  if (options.kind !== null) params.push(options.kind)
  if (options.resolved !== null) params.push(options.resolved ? 1 : 0)

  const where = `e.workspace_id = ? AND ${sourceScope.sql}
      AND (e.dst_file IS NULL OR (${destinationScope.sql}))
      AND ${direction}${kindFilter}${resolvedFilter}`
  const joins = `FROM edges e
      JOIN files src ON src.id = e.src_file
      LEFT JOIN files dst ON dst.id = e.dst_file`
  const total = Number((db.prepare(`SELECT COUNT(*) AS c ${joins} WHERE ${where}`)
    .get(...params) as { c: number }).c)
  const edges = db.prepare(
    `SELECT e.id AS edgeId, e.kind, e.src_symbol AS srcSymbol, e.src_file AS srcFile,
            e.dst_symbol AS dstSymbol, e.dst_file AS dstFile, e.raw_target AS rawTarget,
            e.resolved, e.ambiguous, e.candidates, e.line
       ${joins} WHERE ${where}
      ORDER BY e.line IS NULL, e.line ASC, e.id ASC LIMIT ? OFFSET ?`)
    .all(...params, options.limit, options.offset)
  return {
    fileId,
    path,
    known: true,
    direction: options.direction,
    total,
    returned: edges.length,
    truncated: options.offset + edges.length < total,
    edges,
  }
}

/**
 * What changed between two published generations.
 *
 * `changed` is exact: a file row records the generation that wrote it, so
 * `files.generation > from` names every path the walk re-read. Deletions and
 * renames come from the tombstone table, which records the reason. A rename's
 * destination is only reported when exactly ONE changed file carries that
 * tombstone's content hash; when several do, the answer is `to: null` with
 * `resolved: false`, because guessing would invent a move that did not happen.
 *
 * What the store CANNOT say is whether a changed path is new or edited: a row
 * is UPDATEd in place, which is exactly what preserves its id and therefore its
 * owner. `added`/`modified` are therefore reported as `null` under
 * `unavailable`, never as two plausible-looking lists.
 */
function changesOf(db: DatabaseSync, workspaceId: string, fromGeneration: number) {
  const scope = liveFileScope(db, workspaceId, 'f.checkout_id', 'f.path')
  const state = db.prepare(
    'SELECT generation FROM workspace_index_state WHERE workspace_id = ?')
    .get(workspaceId) as { generation: number } | undefined
  const toGeneration = Number(state?.generation ?? 0)

  const changed = db.prepare(
    `SELECT f.id AS fileId, f.path, f.ext, f.lang, f.loc, f.generation, f.hash
       FROM files f
      WHERE f.workspace_id = ? AND ${scope.sql} AND f.generation > ?
      ORDER BY f.path ASC`)
    .all(workspaceId, ...scope.params, fromGeneration) as Array<{
      fileId: number; path: string; ext: string; lang: string | null
      loc: number; generation: number; hash: string | null
    }>

  const tombstones = db.prepare(
    `SELECT path, reason, generation, deleted_at AS deletedAt FROM file_tombstones
      WHERE workspace_id = ? AND generation > ? ORDER BY path ASC`)
    .all(workspaceId, fromGeneration) as Array<{
      path: string; reason: string; generation: number; deletedAt: string
    }>

  const livePaths = new Set((db.prepare(
    'SELECT path FROM files WHERE workspace_id = ?').all(workspaceId) as
    Array<{ path: string }>).map(row => row.path))
  const byHash = new Map<string, string[]>()
  for (const row of changed) {
    if (row.hash === null) continue
    const list = byHash.get(row.hash)
    if (list === undefined) byHash.set(row.hash, [row.path])
    else list.push(row.path)
  }

  const deleted: string[] = []
  const renamed: Array<{ from: string; to: string | null; resolved: boolean; at: string }> = []
  for (const tomb of tombstones) {
    if (tomb.reason === 'renamed') {
      const candidates = (db.prepare(
        'SELECT hash FROM file_tombstones WHERE workspace_id = ? AND path = ?')
        .get(workspaceId, tomb.path) as { hash: string | null } | undefined)?.hash ?? null
      const matches = candidates === null ? undefined : byHash.get(candidates)
      renamed.push({
        from: tomb.path,
        to: matches?.length === 1 ? matches[0] : null,
        resolved: matches?.length === 1,
        at: tomb.deletedAt,
      })
      continue
    }
    if (!livePaths.has(tomb.path)) deleted.push(tomb.path)
  }

  return {
    fromGeneration,
    toGeneration,
    changed: changed.map(({ hash: _hash, ...rest }) => rest),
    deleted,
    renamed,
    tombstones,
    unavailable: {
      added: null,
      modified: null,
      reason: 'a changed row is updated in place, so the store records WHICH generation wrote a path, ' +
        'not whether the path is new; /api/files (prefix + tombstones) is the honest source for that',
    },
  }
}

/** The temporal projection: the swarm's activity as an ordered track. */
function tracksOf(db: DatabaseSync, workspaceId: string, limit: number) {
  return db.prepare(
    `SELECT ac.id, ac.path, ac.action, ac.at, ac.detail,
            ac.agent_id AS agentId, ag.name AS agentName, ag.color AS agentColor
       FROM activity ac LEFT JOIN agents ag ON ag.id = ac.agent_id
      WHERE ac.workspace_id = ?
      ORDER BY ac.id DESC LIMIT ?`
  ).all(workspaceId, limit)
}

function checkAuth(req: IncomingMessage, ctx: Ctx): void {
  const expectedKey = ctx.authKey ?? process.env.PLUG_BRAIN_AUTH_KEY
  if (!expectedKey) {
    // REV2-D01: Unconfigured service must default-deny mutating routes
    throw new AuthenticationRequired('authentication required: server running without configured auth credentials; mutating operations are rejected')
  }
  const auth = req.headers['authorization']
  const xToken = req.headers['x-plug-auth-token']

  let bearerToken: string | undefined
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    bearerToken = auth.slice('Bearer '.length).trim()
  }

  const matches = (bearerToken !== undefined && bearerToken === expectedKey) ||
    (typeof xToken === 'string' && xToken === expectedKey)

  if (!matches) {
    throw new AuthenticationRequired('unauthorized: valid auth token required')
  }
}

export function startServer(ctx: Ctx, port: number): Promise<number> {
  return serve(ctx, port).then(h => h.port)
}

export interface ServerHandle {
  port: number
  server: ReturnType<typeof createServer>
  close(): Promise<void>
}

export function serve(ctx: Ctx, port = 0): Promise<ServerHandle> {
  const { db } = ctx
  ensureTraceSchema(db)
  const serverInstanceId = ctx.instanceId ?? ('inst-' + randomUUID().slice(0, 12))

  /** The same lock truth for every endpoint that can start an index run. */
  function busyIndexResponse(error: IndexRunBusy): Record<string, unknown> {
    const appraisal = appraiseRun(error.state.workspaceId)
    return {
      ok: false,
      status: 'busy',
      busy: true,
      // The three fields a caller needs to be idempotent without guessing:
      // which run holds the lock, since when, and how far it has got.
      jobId: error.state.runId,
      runningSince: error.state.startedAt,
      reason: error.message,
      progress: appraisal.state === null ? null : runProgress(appraisal),
      retryAfterMs: 1000,
      error: error.message,
      run: error.state,
      running: appraisal.running,
      stale: appraisal.stale,
      quiet: appraisal.quiet,
      ownerAlive: appraisal.ownerAlive,
      recoverable: appraisal.recoverable,
      summary: describeRun(appraisal),
    }
  }

  /**
   * Start an index run and answer at once.
   *
   * Indexing a real planet is minutes of CPU work, so the request must not be
   * the thing that waits: the run writes its own state file, and
   * `GET /api/index/progress` reports it. A run without a store path to open a
   * worker connection on cannot be started at all — see below.
   */
  function startIndex(
    workspaceId: string, full: boolean, res: ServerResponse, idempotencyKey = '',
  ): void {
    if (!ensurePlanetIndexCanStart(db, workspaceId, res)) return
    const dbFile = ctx.dbFile
    if (dbFile === undefined || dbFile === null || dbFile === '') {
      // No store path: a worker has nowhere to open its own connection. This
      // used to index IN LINE, which takes the event loop down for the whole
      // run — the very hang this work exists to end. It now refuses, typed,
      // before anything is touched.
      json(res, {
        ok: false,
        status: 'unavailable',
        started: false,
        error: 'no store path configured for this server: a background index run needs a "dbFile", ' +
          'and indexing in the request loop would make every route unreachable for the length of the run. ' +
          'Start the daemon with a store path (the CLI always has one), or index from the CLI.',
      }, 501)
      return
    }
    try {
      const run = startIndexRun(workspaceId, {
        dbFile, full, ...(idempotencyKey === '' ? {} : { idempotencyKey }),
      })
      json(res, { ok: true, started: true, jobId: run.state.runId, run: run.state }, 202)
    } catch (error) {
      if (error instanceof IndexRunBusy) {
        // Not an error the caller caused: say who holds the lock and how far
        // the other run has got, so the answer is actionable.
        json(res, busyIndexResponse(error), 409)
        return
      }
      if (error instanceof IndexWorkerUnavailable) {
        // A packaging fault, not a busy brain and not a failed run: nothing was
        // attempted and no lock was taken.
        json(res, {
          ok: false,
          status: 'unavailable',
          started: false,
          error: error.message,
          tried: error.tried,
        }, 501)
        return
      }
      throw error
    }
  }

  const server = createServer((req, res) => {
    // A thrown handler must never take the brain down: this is the kernel of
    // the runtime, and one bad request cannot be allowed to stop every agent.
    void handle(req, res).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      const status = error instanceof AuthenticationRequired ? 401
        : error instanceof notes.NoteConflictError ? 409
        : error instanceof notes.NoteGeneratedError ? 409
        : error instanceof notes.QueryError ? 400
        : error instanceof coord.ClaimConflictError ? 409
        : error instanceof coord.FencingError ? 409
        : error instanceof access.WriteConflictError ? 409
        : error instanceof access.AccessDenied ? 403
        : error instanceof missions.MissionError ? 409 : 500
      const body = error instanceof coord.ClaimConflictError
        ? { ok: false, error: message, conflict: error.conflict }
        : error instanceof coord.FencingError
          ? { ok: false, error: message, fencing: true, leaseId: error.leaseId }
          : error instanceof access.WriteConflictError
            ? { ok: false, error: message, hardConflicts: error.verdict.hardConflicts, verdict: error.verdict }
            : error instanceof notes.NoteConflictError
              ? { ok: false, error: message, conflict: error.detail }
              : { ok: false, error: message }
      if (!res.headersSent) json(res, body, status)
      else res.end()
    })
  })

  async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    const p = url.pathname
    const q = url.searchParams
    const ws = q.get('workspace') ?? ''

    // A store-writing request must not queue up behind an index run's writer
    // lock: it answers 503 with the holder and the progress instead of hanging
    // in `busy_timeout` and then failing without a reason.
    if (isStoreWritingRequest(req.method, p) && refuseWhileStoreIsBusy(res)) return

    if (p === '/api/health') {
      // The one route that must answer no matter what: it says whether an index
      // run is holding the store, so a caller can tell "busy" from "gone".
      const active = activeWriterRun()
      return json(res, {
        ok: true,
        at: new Date().toISOString(),
        indexState: active === null ? 'idle' : 'indexing',
        indexing: active === null ? null : runProgress(active.appraisal),
      })
    }

    // ── Live mesh events (SSE stream) ────────────────────────────────────
    if (p === '/api/live/events' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      })
      res.write(': connected\n\n')
      const unsubscribe = coord.coordEvents.onLive((evt) => {
        res.write(`event: ${evt.type}\ndata: ${JSON.stringify(evt.data)}\n\n`)
      })
      req.on('close', () => {
        unsubscribe()
      })
      return
    }

    // ── Galaxy: every workspace as a planet ──────────────────────────────
    if (p === '/api/galaxy') {
      const rows = db.prepare('SELECT id, name, root, indexed_at AS indexedAt FROM workspaces').all() as
        { id: string; name: string; root: string; indexedAt: string | null }[]
      // One shared answer for the whole store: whether the store is being
      // written, and by which workspace. Asking per planet would re-read every
      // run state file once per planet.
      const active = activeWriterRun()
      return json(res, {
        ok: true,
        indexState: active === null ? 'idle' : 'indexing',
        indexing: active === null ? null : runProgress(active.appraisal),
        planets: rows.map(w => {
          const counts = liveProjectionCounts(db, w.id)
          return {
            ...w,
            ...counts,
            ...indexStateOf(db, w.id),
            agents: agentsOf(db, w.id),
          }
        }),
      })
    }

    // ── Planet: one workspace, coloured by agent ─────────────────────────
    if (p === '/api/graph') {
      access.requireWorkspace(db, ws)
      return json(res, {
        ok: true,
        workspace: ws,
        ...indexStateOf(db, ws),
        ...graphOf(db, ws, Number(q.get('limit') ?? 1200)),
      })
    }

    if (p === '/api/agents') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, agents: agentsOf(db, ws) })
    }

    // ── Agent Mesh: one trace-backed projection, never a registry fallback ──
    //
    // The registry can describe a configured identity, but it cannot prove a
    // process ran. The Mesh intentionally reads only the append-only trace so
    // it either names the evidence behind an edge/node or has nothing to show.
    if (p === '/api/mesh') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, ...indexStateOf(db, ws), mesh: meshSnapshot(db, ws) })
    }

    if (p === '/api/mesh/timeline') {
      access.requireWorkspace(db, ws)
      // Number(null) is 0, which would accidentally reduce an omitted limit to
      // one entry after meshTimeline's lower-bound clamp.
      const rawLimit = q.get('limit')
      const parsedLimit = rawLimit === null || rawLimit.trim() === '' ? Number.NaN : Number(rawLimit)
      const value = (name: 'agentId' | 'taskId' | 'workerId'): string | undefined => {
        const raw = q.get(name)?.trim()
        return raw === undefined || raw === '' ? undefined : raw
      }
      return json(res, {
        ok: true,
        ...indexStateOf(db, ws),
        timeline: meshTimeline(db, ws, {
          agentId: value('agentId'),
          taskId: value('taskId'),
          workerId: value('workerId'),
          limit: Number.isFinite(parsedLimit) ? parsedLimit : undefined,
        }),
      })
    }

    if (p === '/api/tracks') {
      access.requireWorkspace(db, ws)
      return json(res, {
        ok: true, ...indexStateOf(db, ws), tracks: tracksOf(db, ws, Number(q.get('limit') ?? 200)),
      })
    }

    // ── Atlas/City snapshot ──────────────────────────────────────────────
    // Same envelope the three ported engines already speak, but the nodes are
    // the REAL graph: files AND code symbols, with the owning agent's colour
    // carried on every node so a track shows up in whichever view is open.
    if (p === '/api/atlas/snapshot') {
      const w = access.requireWorkspace(db, ws)
      const counts = liveProjectionCounts(db, ws)
      const totalFiles = counts.files
      // Files written but not yet re-read: the honest measure of "how far behind
      // is the brain", the same one the daemon's sweep and the briefing use.
      const staleFiles = counts.stale
      // The City draws the whole workspace, so the file scan must not stay at a
      // demo-sized number. Measured on plugharness (7 800 files, 132 954
      // symbols): limit=900 → 67 ms, limit=8000 → 111 ms. The file scan is not
      // what costs; the symbol join is, and it stays bounded independently
      // below. This ceiling only refuses an absurd request — it is not a
      // product limit, and the honest `coverage` fields still report any
      // shortfall rather than presenting a partial city as complete.
      const limit = clampLimit(q.get('limit'), 900, MAX_SNAPSHOT_FILES)
      const until = q.get('until')            // timelapse: state as of this instant
      const g = graphOf(db, ws, limit, until)

      const symbolCap = Math.max(0, Number(q.get('symbols') ?? 400))
      // Match symbols by file id, never by path: symbols(file_id) is indexed,
      // and a 600-way string IN over 188k symbols hangs the request outright.
      // The candidate list is capped for the same reason.
      const sliceFileIds = g.nodes
        .map(n => Number(n.id.slice('file:'.length)))
        .filter(n => Number.isFinite(n))
        .slice(0, 200)
      const holes = sliceFileIds.map(() => '?').join(',')
      const syms = (symbolCap === 0 || sliceFileIds.length === 0) ? [] : db.prepare(
        `SELECT sy.id, sy.name, sy.kind, sy.line, f.path
           FROM symbols sy JOIN files f ON f.id = sy.file_id
          WHERE sy.exported = 1 AND sy.file_id IN (${holes})
          ORDER BY (sy.kind <> 'class'), (sy.kind <> 'interface'), sy.name
          LIMIT ?`).all(...sliceFileIds, symbolCap) as
        { id: number; name: string; kind: string; line: number; path: string }[]

      const nodes: unknown[] = g.nodes.map(n => ({
        id: n.id, type: 'file', name: n.label, label: n.label,
        uri: `file://${n.path}`,
        properties: {
          path: n.path, lines: n.loc, lang: n.lang,
          agentId: n.agent?.id ?? null,
          agentColor: n.agent?.color ?? null,
          agentName: n.agent?.name ?? null,
          readers: n.readers.map(r => r.name).join(', '),
          // A reader's colour so a visit is paintable, and marked as a read so
          // no surface mistakes browsing for authorship.
          readerColor: n.readers[0]?.color ?? null,
          readerName: n.readers[0]?.name ?? null,
          status: n.agent ? `written by ${n.agent.name}` : n.readers.length ? `read by ${n.readers.map(r => r.name).join(', ')}` : 'untouched',
        },
        updatedAt: n.agent?.at ?? null,
      }))
      const edges: unknown[] = g.edges.map((e, i) => ({
        id: `e${i}`, type: e.kind, sourceId: e.source, targetId: e.target,
      }))

      const filePathToId = new Map(g.nodes.map(n => [n.path, n.id]))
      for (const sy of syms) {
        const owner = filePathToId.get(sy.path)
        if (!owner) continue
        const id = `sym:${sy.id}`
        nodes.push({
          id, type: sy.kind, name: sy.name, label: sy.name,
          uri: `symbol://${sy.path}#${sy.name}`,
          properties: { path: sy.path, line: sy.line, status: sy.kind },
          updatedAt: null,
        })
        edges.push({ id: `d${sy.id}`, type: 'defines', sourceId: owner, targetId: id })
      }

      return json(res, {
        ...indexStateOf(db, ws),
        workspace: { id: w.id, name: w.name, canonicalPath: w.root },
        graph: { nodes, edges },
        // Two different facts, kept apart on purpose.
        //
        // `complete` is about THIS SNAPSHOT: does it show every file the index
        // holds, or a sample of it? On a planet with 183 000 files the answer is
        // "a sample", and calling that an incomplete INDEX — which the header
        // used to do — tells the reader the brain is broken when it is only the
        // picture that is cropped.
        //
        // `indexComplete` is about the INDEX: is every file it holds actually
        // indexed? That is the question a user asking "is the brain current?"
        // means, and it is answered by the files that are waiting to be read.
        coverage: {
          totalFiles,
          shownFiles: g.nodes.length,
          complete: g.nodes.length >= totalFiles,
          indexComplete: staleFiles === 0,
          staleFiles,
          truncated: g.truncated,
          errors: [],
        },
        updatedAt: new Date().toISOString(),
      })
    }

    // ── missions: isolation and the verified change pipeline ─────────────
    if (p === '/api/missions') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, missions: missions.listMissions(db, ws) })
    }
    if (p.startsWith('/api/mission/') && p !== '/api/mission/context-pack' && req.method === 'POST') {
      checkAuth(req, ctx)
      const step = p.slice('/api/mission/'.length)
      const body = await readBody(req)
      const id = String(body.missionId ?? '').trim()
      const actor = String(body.agentId ?? '').trim()
      switch (step) {
        case 'start': {
          const workspaceId = String(body.workspace ?? ws).trim()
          access.requireWorkspace(db, workspaceId)
          if (!actor) return json(res, { ok: false, error: 'agentId required' }, 400)
          access.requireAgent(db, actor)
          return json(res, { ok: true, mission: missions.startMission(
            db, workspaceId, actor, String(body.title ?? 'untitled'),
            Array.isArray(body.acceptance) ? body.acceptance.map(String) : []) })
        }
        case 'submit': {
          if (!id) return json(res, { ok: false, error: 'missionId required' }, 400)
          return json(res, { ok: true, mission: missions.submitForReview(db, id) })
        }
        case 'review': {
          if (!id) return json(res, { ok: false, error: 'missionId required' }, 400)
          if (!actor) return json(res, { ok: false, error: 'agentId required' }, 400)
          access.requireAgent(db, actor)
          if (typeof body.passed !== 'boolean') {
            return json(res, { ok: false, error: 'passed must be a strict boolean; string-false rejected' }, 400)
          }
          return json(res, { ok: true, mission: missions.review(
            db, id, actor, body.passed, String(body.notes ?? '')) })
        }
        case 'commit': {
          if (!id) return json(res, { ok: false, error: 'missionId required' }, 400)
          return json(res, { ok: true, mission: missions.commitMission(db, id, String(body.message ?? '')) })
        }
        case 'verify': {
          if (!id) return json(res, { ok: false, error: 'missionId required' }, 400)
          if (!actor) return json(res, { ok: false, error: 'agentId required' }, 400)
          access.requireAgent(db, actor)
          if (typeof body.passed !== 'boolean') {
            return json(res, { ok: false, error: 'passed must be a strict boolean; string-false rejected' }, 400)
          }
          return json(res, { ok: true, mission: missions.verify(
            db, id, actor, body.passed, String(body.notes ?? '')) })
        }
        case 'merge': {
          if (!id) return json(res, { ok: false, error: 'missionId required' }, 400)
          return json(res, { ok: true, mission: missions.merge(db, id) })
        }
        case 'close': {
          if (!id) return json(res, { ok: false, error: 'missionId required' }, 400)
          missions.closeMission(db, id)
          return json(res, { ok: true })
        }
        default:
          return json(res, { ok: false, error: `unknown mission step: ${step}` }, 404)
      }
    }

    // ── notes: the Obsidian replacement ─────────────────────────────────
    // Read routes are open the way /api/graph is; every mutation goes through
    // checkAuth, and every read and write is attributed to a real agent.
    if (p === '/api/notes' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      return json(res, {
        ok: true,
        ...notes.listNotes(db, ws, {
          limit: clampLimit(q.get('limit'), 200, 5000),
          offset: clampLimit(q.get('offset'), 0, 200000),
        }),
        scope: noteRootRows(db, ws),
      })
    }

    if (p === '/api/notes/query' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const text = String(q.get('q') ?? q.get('query') ?? '').trim()
      if (text === '') return json(res, { ok: false, error: 'q is required, e.g. typ=gate UND stand=offen' }, 400)
      try {
        return json(res, {
          ok: true,
          ...notes.queryNotes(db, ws, text, { limit: clampLimit(q.get('limit'), 200, 5000) }),
        })
      } catch (error) {
        if (error instanceof notes.QueryError) return json(res, { ok: false, error: error.message }, 400)
        throw error
      }
    }

    if (p === '/api/notes/search' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const text = String(q.get('q') ?? q.get('query') ?? '').trim()
      if (text === '') return json(res, { ok: false, error: 'q is required' }, 400)
      // `lines=1` turns each hit into something to click: the search finds the
      // note, the line says where in it the reader should land. It costs a read
      // per hit, so the call that does not need it does not ask for it.
      const withLines = q.get('lines') === '1'
      // Register once, never on every search: registering touches `last_seen`, a
      // write, and an index run holds the write lock — a read route must not
      // depend on being able to write.
      const known = db.prepare('SELECT id FROM agents WHERE id = ?').get(NOTES_READ_AGENT) !== undefined
      if (withLines && !known) access.registerAgent(db, NOTES_READ_AGENT, 'PlugBrain note search')
      const agentId = NOTES_READ_AGENT
      return json(res, {
        ok: true,
        ...notes.searchNotesWithLines(db, ws, agentId, text, {
          limit: clampLimit(q.get('limit'), 50, 500),
          lines: withLines,
        }),
      })
    }

    if (p === '/api/notes/graph' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      try {
        return json(res, {
          ok: true,
          graph: notes.noteGraph(db, ws, {
            focus: q.get('focus'),
            depth: clampLimit(q.get('depth'), 1, 6),
            filter: q.get('filter'),
            limit: clampLimit(q.get('limit'), 600, 5000),
          }),
        })
      } catch (error) {
        if (error instanceof notes.QueryError) return json(res, { ok: false, error: error.message }, 400)
        throw error
      }
    }

    if (p === '/api/notes/read' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const relPath = String(q.get('path') ?? '').trim()
      const agentId = String(q.get('agentId') ?? '').trim()
      if (!relPath) return json(res, { ok: false, error: 'path is required' }, 400)
      if (!agentId) return json(res, { ok: false, error: 'agentId is required: a read is attributed' }, 400)
      access.requireAgent(db, agentId)
      return json(res, { ok: true, note: notes.readNote(db, ws, agentId, relPath) })
    }

    if (p === '/api/notes/backlinks' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const relPath = String(q.get('path') ?? '').trim()
      if (!relPath) return json(res, { ok: false, error: 'path is required' }, 400)
      return json(res, { ok: true, backlinks: notes.backlinksOf(db, ws, relPath) })
    }

    if (p === '/api/notes/attachments' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const note = String(q.get('note') ?? '').trim()
      if (!note) return json(res, { ok: false, error: 'note is required' }, 400)
      return json(res, { ok: true, attachments: attachments.listAttachments(db, ws, note) })
    }

    if (p === '/api/notes/attachment' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const note = String(q.get('note') ?? '').trim()
      const name = String(q.get('name') ?? '').trim()
      const agentId = String(q.get('agentId') ?? '').trim()
      if (!note || !name || !agentId) return json(res, { ok: false, error: 'note, name and agentId are required' }, 400)
      const file = attachments.readAttachment(db, ws, agentId, note, name)
      return binary(res, file.content, file.name)
    }

    if (p === '/api/notes/attachment' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const note = String(body.note ?? '').trim()
      const name = String(body.name ?? '').trim()
      const base64 = String(body.base64 ?? '')
      if (!agentId || !note || !name) return json(res, { ok: false, error: 'agentId, note and name are required' }, 400)
      access.requireWorkspace(db, workspaceId)
      access.requireAgent(db, agentId)
      return json(res, { ok: true, attachment: attachments.writeAttachment(db, workspaceId, agentId, note, name, base64) })
    }

    if (p === '/api/notes/export' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const agentId = String(q.get('agentId') ?? '').trim()
      const note = String(q.get('note') ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId is required' }, 400)
      access.requireAgent(db, agentId)
      const archive = note ? exportNote(db, ws, agentId, note) : exportVault(db, ws, agentId)
      return binary(res, archive, note ? `${note.split('/').pop()?.replace(/\.md$/i, '') || 'note'}.zip` : 'plugbrain-vault.zip', 'application/zip')
    }

    if (p === '/api/notes/write' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const relPath = String(body.path ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      if (!relPath) return json(res, { ok: false, error: 'path required' }, 400)
      access.requireWorkspace(db, workspaceId)
      access.requireAgent(db, agentId)
      // This endpoint edits KNOWLEDGE, not source. Writing a source file through
      // it would bypass the mission/claim pipeline that guards code.
      if (!notes.isNotePath(db, workspaceId, relPath)) {
        return json(res, {
          ok: false,
          error: `'${relPath}' is outside the note scope — use the agent write path for source`,
        }, 400)
      }
      try {
        const result = notes.writeNote(db, workspaceId, agentId, relPath, String(body.content ?? ''), {
          ...(typeof body.expectedHash === 'string' ? { expectedHash: body.expectedHash } : {}),
          ...(typeof body.taskId === 'string' ? { taskId: body.taskId } : {}),
          allowGenerated: body.allowGenerated === true,
        })
        return json(res, { ok: true, ...result })
      } catch (error) {
        if (error instanceof notes.NoteConflictError) {
          return json(res, { ok: false, error: error.message, conflict: error.detail }, 409)
        }
        if (error instanceof notes.NoteGeneratedError) {
          return json(res, { ok: false, error: error.message, generated: true }, 409)
        }
        throw error
      }
    }

    // ── planet: repos, checkouts, revision vectors ───────────────────────
    // One planet is one workspace with many repos and checkouts inside it. The
    // UI never guesses which worktree a file came from: the ids are here.
    if (p === '/api/planet' && req.method === 'GET') {
      // A brain with exactly one workspace does not need to be told which one
      // it is: "the planet" is unambiguous, and a client that opens one vault
      // asks exactly that. With several registered, guessing would be worse
      // than asking, so the answer names the candidates.
      let target = ws
      if (!target) {
        const known = db.prepare('SELECT id FROM workspaces ORDER BY created_at').all() as { id: string }[]
        if (known.length === 1) target = known[0].id
        else if (known.length === 0) return json(res, { ok: false, error: 'no workspace registered' }, 404)
        else {
          return json(res, {
            ok: false,
            error: `workspace required — ${known.length} are registered: ${known.map(w => w.id).join(', ')}`,
          }, 400)
        }
      }
      try {
        // Every registered workspace answers here, planet or not: a vault that
        // is one plain folder has counts too, and "not a planet" is not an
        // answer to "what does this workspace hold".
        return json(res, {
          ok: true,
          ...indexStateOf(db, target),
          planet: listWorkspaceView(db, target),
        })
      } catch (error) {
        return json(res, {
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }, 404)
      }
    }

    if (p === '/api/planet/history' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      return json(res, {
        ok: true,
        history: planetHistory(db, ws, clampLimit(q.get('limit'), 200, 5000)),
      })
    }

    if (p === '/api/planet/register' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const raw = String(body.root ?? '').trim()
      if (raw === '') return json(res, { ok: false, error: 'root is required' }, 400)
      try {
        const registered = registerPlanet(db, raw, body.name ? String(body.name) : undefined)
        // A vault that was just opened must be watched from now on, not from
        // the next daemon tick five minutes away.
        refreshDaemon()
        return json(res, { ok: true, ...registered })
      } catch (error) {
        return json(res, {
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }, 400)
      }
    }

    // Inventory is not activation. The operator must choose checkout IDs from
    // `/api/planet` and persist that exact vector before Code enters the live
    // Brain. This mutation is authenticated and deliberately accepts IDs only:
    // a path cannot be smuggled in as a second, untracked root.
    if (p === '/api/planet/selection' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const id = String(body.workspace ?? ws).trim()
      if (!id) return json(res, { ok: false, error: 'workspace is required' }, 400)
      access.requireWorkspace(db, id)
      if (!Array.isArray(body.checkoutIds) || body.checkoutIds.some(value => typeof value !== 'string')) {
        return json(res, { ok: false, error: 'checkoutIds must be an array of checkout IDs' }, 400)
      }
      try {
        const selection = setPlanetIndexSelection(
          db, id, body.checkoutIds.map(value => value.trim()))
        return json(res, {
          ok: true,
          workspace: id,
          selection,
          // Return current inventory in the same authoritative reply so a UI
          // can paint exactly what became active without making up state.
          planet: listWorkspaceView(db, id),
        })
      } catch (error) {
        return json(res, {
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }, 400)
      }
    }

    if (p === '/api/planet/scan' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const id = String(body.workspace ?? ws).trim()
      const w = access.requireWorkspace(db, id)
      const isPlanet = db.prepare('SELECT 1 AS present FROM planets WHERE workspace_id = ?').get(id) !== undefined
      // A caller that deliberately registered a Planet gets a refreshed vector
      // before each scan. A plain workspace remains plain: silently converting
      // every old vault into an unconfigured Planet would make this compatibility
      // route refuse work that has no checkout inventory to select.
      const registered = isPlanet ? registerPlanet(db, w.root, w.name) : null
      if (isPlanet && !ensurePlanetIndexCanStart(db, id, res)) return
      if (ctx.dbFile === undefined || ctx.dbFile === null || ctx.dbFile === '') {
        // Same refusal as `/api/reindex`: a request may not index in line, or
        // the whole surface is dark for the length of the run.
        return json(res, {
          ok: false,
          status: 'unavailable',
          registered,
          started: false,
          error: 'no store path configured for this server: a background index run needs a "dbFile", ' +
            'and indexing in the request loop would make every route unreachable for the length of the run.',
        }, 501)
      }
      try {
        const run = startIndexRun(id, { dbFile: ctx.dbFile, full: body.full === true })
        return json(res, { ok: true, registered, started: true, jobId: run.state.runId, run: run.state }, 202)
      } catch (error) {
        if (error instanceof IndexRunBusy) {
          return json(res, { ...busyIndexResponse(error), registered }, 409)
        }
        if (error instanceof IndexWorkerUnavailable) {
          return json(res, {
            ok: false, status: 'unavailable', registered, started: false,
            error: error.message, tried: error.tried,
          }, 501)
        }
        throw error
      }
    }

    // ── git: branch, worktrees, commits ──────────────────────────────────
    if (p === '/api/git') {
      access.requireWorkspace(db, ws)
      const row = tableExists(db, 'git_state')
        ? db.prepare('SELECT * FROM git_state WHERE workspace_id = ?').get(ws) as
          Record<string, unknown> | undefined
        : undefined
      if (!row) return json(res, { ok: true, isRepo: false, note: 'no git state captured yet' })
      return json(res, {
        ok: true,
        isRepo: Boolean(row.is_repo),
        isRepoRoot: Boolean(row.is_repo_root),
        // Stated plainly: this workspace lives inside someone else's repository.
        contractWarning: row.is_repo && !row.is_repo_root
          ? 'This workspace is not the repository root — one workspace must be one repository with one authoritative main.'
          : null,
        root: row.root, branch: row.branch, head: row.head,
        dirtyCount: row.dirty_count,
        worktrees: JSON.parse(String(row.worktrees_json ?? '[]')),
        commits: JSON.parse(String(row.commits_json ?? '[]')),
        error: row.error, readAt: row.read_at,
      })
    }

    // ── timelapse: the ordered growth of this workspace ──────────────────
    if (p === '/api/timeline') {
      access.requireWorkspace(db, ws)
      const events = db.prepare(
        `SELECT ac.at, ac.path, ac.action, ac.agent_id AS agentId,
                ag.name AS agentName, ag.color AS agentColor
           FROM activity ac LEFT JOIN agents ag ON ag.id = ac.agent_id
          WHERE ac.workspace_id = ? AND ac.action IN ('create','write','read')
          ORDER BY ac.id ASC LIMIT ?`
      ).all(ws, Number(q.get('limit') ?? 5000))
      const bounds = db.prepare(
        `SELECT MIN(at) AS first, MAX(at) AS last FROM activity WHERE workspace_id = ?`).get(ws)
      return json(res, { ok: true, ...indexStateOf(db, ws), events, bounds })
    }

    // ── Surface: one artifact, all the way down ──────────────────────────
    if (p === '/api/symbols') {
      access.requireWorkspace(db, ws)
      const fileIdRaw = Number(q.get('fileId'))
      const fileId = Number.isSafeInteger(fileIdRaw) && fileIdRaw > 0 ? fileIdRaw : null
      return json(res, {
        ok: true,
        ...indexStateOf(db, ws),
        ...symbolsOf(db, ws, q.get('path') ?? '', fileId),
      })
    }

    if (p === '/api/provenance') {
      return json(res, {
        ok: true,
        ...(ws === '' ? {} : indexStateOf(db, ws)),
        ...access.fileProvenance(db, ws, q.get('path') ?? ''),
      })
    }

    // ── Awareness & Context Pack endpoints (FO-4 & CP01-014) ────────────
    if ((p === '/api/awareness' || p === '/api/agent/awareness') && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      access.requireWorkspace(db, workspaceId)
      const taskId = String(body.taskId ?? '').trim()
      if (!taskId) return json(res, { ok: false, error: 'taskId required' }, 400)
      const agentId = body.agentId ? String(body.agentId).trim() : undefined
      if (agentId) access.requireAgent(db, agentId)
      const intendedPaths = Array.isArray(body.intendedPaths) ? body.intendedPaths.map(String) : []
      const mode = body.mode === 'read' ? 'read' : 'write'
      const port = createAwarenessPort(db)
      const pack = port({
        workspaceId,
        taskId,
        agentId,
        intendedPaths,
        mode,
        limits: typeof body.limits === 'object' && body.limits !== null ? body.limits as any : undefined,
      })

      // Ingest trace event context.pack.created (bounded, no secrets)
      try {
        ingestTraceEvents(db, [{
          schema: 1,
          eventId: `evt-pack-${pack.packDigest.slice(0, 8)}-${Date.now()}`,
          source: 'brain',
          runtimeInstanceId: serverInstanceId,
          workspaceId,
          taskId,
          agentId,
          type: 'context.pack.created',
          occurredAt: pack.generatedAt,
          observedAt: new Date().toISOString(),
          fileRefs: intendedPaths,
          payload: { digest: pack.packDigest, brainGeneration: pack.brainGeneration, admissible: pack.verdict.admissible },
          provenance: { mode: 'live', authorityRef: 'brain:createAwarenessPort', confidence: 'authoritative' },
        }])
      } catch {
        // Trace logging should not break awareness pack return
      }

      return json(res, { ok: true, pack })
    }

    if (p === '/api/context/pack' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      access.requireWorkspace(db, workspaceId)
      const goal = String(body.goal ?? '').trim()
      if (!goal) return json(res, { ok: false, error: 'goal required' }, 400)
      const agentId = body.agentId ? String(body.agentId).trim() : undefined
      if (agentId) access.requireAgent(db, agentId)
      const pack = buildContextPack(db, workspaceId, goal, {
        agentId,
        missionId: body.missionId ? String(body.missionId) : undefined,
      })
      return json(res, { ok: true, ...pack })
    }

    // Harness-bound task context: Brain projects workspace knowledge but does
    // not create a mission, schedule a lane, or mutate Harness task state.
    if (p === '/api/mission/context-pack' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      const taskId = String(body.taskId ?? '').trim()
      const scopePaths = Array.isArray(body.scopePaths) ? body.scopePaths.map(String) : []
      const requirementIds = Array.isArray(body.requirementIds) ? body.requirementIds.map(String) : []
      if (!taskId || scopePaths.length === 0) return json(res, { ok: false, error: 'taskId and scopePaths required' }, 400)
      try {
        const pack = coord.createTaskContextPack(db, {
          workspaceId, taskId, scopePaths, requirementIds,
          agentId: typeof body.agentId === 'string' ? body.agentId : undefined,
          checkoutId: typeof body.checkoutId === 'string' ? body.checkoutId : undefined,
          tokenBudget: typeof body.tokenBudget === 'number' ? body.tokenBudget : undefined,
        })
        return json(res, { ok: true, pack })
      } catch (err) {
        return json(res, { ok: false, error: err instanceof Error ? err.message : String(err) }, 400)
      }
    }

    if (p.startsWith('/api/mission/context-pack/') && p.endsWith('/changes') && req.method === 'GET') {
      const packId = p.slice('/api/mission/context-pack/'.length, -'/changes'.length)
      try {
        return json(res, { ok: true, changes: coord.changesSinceTaskContextPack(db, packId) })
      } catch (err) {
        return json(res, { ok: false, error: err instanceof Error ? err.message : String(err) }, 404)
      }
    }

    if (p.startsWith('/api/context/pack/') && p.endsWith('/staleness') && req.method === 'GET') {
      const packId = p.slice('/api/context/pack/'.length, -'/staleness'.length)
      try {
        const result = packStaleness(db, packId)
        return json(res, { ok: true, ...result })
      } catch (err: unknown) {
        return json(res, { ok: false, error: err instanceof Error ? err.message : String(err) }, 404)
      }
    }

    // ── Agent-facing surface: the only sanctioned way in ─────────────────
    if (p === '/api/agent/attach' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const agentId = String(body.agentId ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const workspaceId = String(body.workspace ?? ws).trim()
      access.requireWorkspace(db, workspaceId)

      // Identity creation is an explicit, authorized registration operation (FO-3)
      access.registerAgent(db, agentId, body.name ? String(body.name) : undefined)
      const briefing = buildBriefing(db, workspaceId, agentId)

      let awareness: TaskAwarenessPack | undefined
      if (body.taskId || Array.isArray(body.intendedPaths)) {
        const port = createAwarenessPort(db)
        awareness = port({
          workspaceId,
          taskId: String(body.taskId ?? `task-${agentId}`),
          agentId,
          intendedPaths: Array.isArray(body.intendedPaths) ? body.intendedPaths.map(String) : [],
          mode: body.mode === 'read' ? 'read' : 'write',
        })
      }

      return json(res, {
        ok: true,
        briefing,
        markdown: renderBriefing(briefing),
        ...(awareness ? { awareness } : {}),
      })
    }

    // A READ: it demands the token like every other agent route (FO-3) and a
    // *registered* agent. The local UI gets both automatically — the daemon
    // injects its token into the served shell and the client attaches its agent
    // once at startup — so a vault still opens without anyone typing a token.
    if (p === '/api/agent/read' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const relPath = String(body.path ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      if (!relPath) return json(res, { ok: false, error: 'path required' }, 400)

      access.requireWorkspace(db, workspaceId)
      knownAgent(db, agentId)

      return json(res, {
        ok: true,
        ...access.readFile(db, workspaceId, agentId, relPath),
      })
    }

    if (p === '/api/agent/write' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? body.workspaceId ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const relPath = String(body.path ?? '').trim()
      const content = typeof body.content === 'string' ? body.content : ''
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      if (!relPath) return json(res, { ok: false, error: 'path required' }, 400)

      access.requireWorkspace(db, workspaceId)
      access.requireAgent(db, agentId)

      const taskId = String(body.taskId ?? `task-${agentId}`).trim() || `task-${agentId}`
      const leaseId = typeof body.leaseId === 'string' ? body.leaseId.trim() : undefined
      const epoch = typeof body.epoch === 'number' ? body.epoch : undefined

      // Fencing and lease checks
      try {
        coord.checkWriteFencing(db, workspaceId, agentId, relPath, { taskId, leaseId, epoch })
      } catch (err) {
        if (err instanceof coord.ClaimConflictError) {
          return json(res, {
            ok: false,
            error: err.message,
            conflict: err.conflict,
            hardConflicts: [{
              kind: 'hard-conflict',
              path: relPath,
              requestedPath: relPath,
              holder: {
                taskId: err.conflict.holder.taskId,
                agentId: err.conflict.holder.agentId,
                workerId: null,
                worktreeId: null,
                path: relPath,
                mode: 'write',
                eventId: 'coord:lease',
                claimedAt: err.conflict.holder.claimedAt,
                lastHeartbeat: err.conflict.holder.lastHeartbeat,
              },
              reason: err.conflict.reason,
            }],
          }, 409)
        }
        if (err instanceof coord.FencingError) {
          return json(res, {
            ok: false,
            error: err.message,
            fencing: true,
            leaseId: err.leaseId,
          }, 409)
        }
        throw err
      }

      // FO-4 Hard conflict gate: evaluate intended write against active claims
      const claimVerdict = evaluateClaim(db, workspaceId, {
        taskId,
        agentId,
        paths: [relPath],
        mode: 'write',
      })
      if (!claimVerdict.admissible && claimVerdict.hardConflicts.length > 0) {
        return json(res, {
          ok: false,
          error: `hard conflict: path '${relPath}' is held by another active task`,
          hardConflicts: claimVerdict.hardConflicts,
          verdict: claimVerdict,
        }, 409)
      }

      return json(res, {
        ok: true,
        ...access.writeFile(db, workspaceId, agentId, relPath, content, taskId, { leaseId, epoch }),
      })
    }

    // ── Swarm Coordination (M4): Agent Register, Heartbeat, Presence ─────
    if (p === '/api/agent/register' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const agentId = String(body.agentId ?? body.id ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      if (!workspaceId) return json(res, { ok: false, error: 'workspaceId required' }, 400)

      const registration = coord.registerSwarmAgent(db, {
        agentId,
        name: body.name ? String(body.name) : undefined,
        model: body.model ? String(body.model) : undefined,
        host: body.host ? String(body.host) : undefined,
        workspaceId,
        checkoutId: body.checkoutId ? String(body.checkoutId) : undefined,
        taskId: body.taskId ? String(body.taskId) : undefined,
        missionId: body.missionId ? String(body.missionId) : undefined,
        heartbeatTtlMs: typeof body.heartbeatTtlMs === 'number' ? body.heartbeatTtlMs : undefined,
      })
      return json(res, { ok: true, registration })
    }

    if (p === '/api/agent/heartbeat' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const agentId = String(body.agentId ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const taskId = body.taskId ? String(body.taskId) : undefined
      const hb = coord.heartbeatAgent(db, agentId, taskId)
      return json(res, { ok: true, ...hb })
    }

    if (p === '/api/agent/presence' && req.method === 'GET') {
      const workspaceId = q.get('workspace') ?? q.get('workspaceId') ?? undefined
      const agentId = q.get('agentId') ?? undefined
      const agents = coord.getAgentPresence(db, { workspaceId: workspaceId || undefined, agentId: agentId || undefined })
      return json(res, { ok: true, agents })
    }

    // ── Swarm Coordination (M4): Claims & Leases with TTL & Fencing ──────
    if (p === '/api/agent/claim' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const taskId = String(body.taskId ?? `task-${agentId}`).trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      if (!workspaceId) return json(res, { ok: false, error: 'workspaceId required' }, 400)
      const paths = Array.isArray(body.paths) ? body.paths.map(String) : []
      const symbols = Array.isArray(body.symbols) ? body.symbols.map(String) : []
      const mode = body.mode === 'read' ? 'read' : 'write'
      const ttlMs = typeof body.ttlMs === 'number' ? body.ttlMs : undefined

      const result = coord.acquireLease(db, workspaceId, {
        agentId,
        taskId,
        paths,
        symbols,
        mode,
        ttlMs,
      })

      if (!result.acquired && result.conflict) {
        return json(res, { ok: false, error: 'claim conflict', conflict: result.conflict }, 409)
      }
      return json(res, { ok: true, lease: result.lease })
    }

    if (p === '/api/agent/release' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const agentId = String(body.agentId ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const leaseId = body.leaseId ? String(body.leaseId) : undefined
      const workspaceId = body.workspaceId || body.workspace ? String(body.workspaceId ?? body.workspace) : undefined
      const taskId = body.taskId ? String(body.taskId) : undefined

      const result = coord.releaseLease(db, {
        leaseId,
        agentId,
        workspaceId,
        taskId,
      })
      return json(res, { ok: true, ...result })
    }

    if (p === '/api/agent/leases' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, leases: coord.listActiveLeases(db, ws) })
    }

    // ── Swarm Coordination (M4): Agent Inbox & Messaging ─────────────────
    if (p === '/api/agent/message' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      const fromAgent = String(body.fromAgent ?? body.agentId ?? '').trim()
      if (!workspaceId) return json(res, { ok: false, error: 'workspaceId required' }, 400)
      if (!fromAgent) return json(res, { ok: false, error: 'fromAgent required' }, 400)
      const toAgent = body.toAgent ? String(body.toAgent).trim() : null
      const channel = body.channel ? String(body.channel).trim() : null
      const missionId = body.missionId ? String(body.missionId) : null
      const subject = body.subject ? String(body.subject).trim() : ''
      const text = String(body.body ?? body.message ?? body.text ?? '')
      if (!text) return json(res, { ok: false, error: 'message body required' }, 400)

      const message = coord.sendMessage(db, {
        workspaceId,
        fromAgent,
        toAgent,
        channel,
        missionId,
        subject,
        body: text,
      })
      return json(res, { ok: true, message })
    }

    if ((p === '/api/agent/inbox' || p === '/api/agent/inbox/read') && (req.method === 'GET' || req.method === 'POST')) {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? q.get('agentId') ?? '').trim()
      if (!workspaceId) return json(res, { ok: false, error: 'workspaceId required' }, 400)
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const channel = (body.channel as string | undefined) ?? q.get('channel') ?? undefined
      const missionId = (body.missionId as string | undefined) ?? q.get('missionId') ?? undefined
      const unreadOnly = body.unreadOnly === true || q.get('unreadOnly') === 'true'
      const waitMs = typeof body.waitMs === 'number' ? body.waitMs : Number(q.get('waitMs') ?? 0)

      const messages = await coord.readInbox(db, {
        workspaceId,
        agentId,
        channel,
        missionId,
        unreadOnly,
        waitMs: Number.isFinite(waitMs) ? waitMs : 0,
      })
      return json(res, { ok: true, messages })
    }

    if (p === '/api/agent/inbox/ack' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const messageId = String(body.messageId ?? '').trim()
      const agentId = String(body.agentId ?? '').trim()
      if (!messageId || !agentId) return json(res, { ok: false, error: 'messageId and agentId required' }, 400)
      const acked = coord.confirmDelivery(db, messageId, agentId)
      return json(res, { ok: true, acked })
    }

    // ── Swarm Agent Inspect (M5: Mesh Inspection) ───────────────────────
    if (p === '/api/agent/inspect' && (req.method === 'GET' || req.method === 'POST')) {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const agentId = String(body.agentId ?? q.get('agentId') ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const workspaceId = String(body.workspaceId ?? body.workspace ?? ws ?? q.get('workspace') ?? '').trim() || undefined

      const agentRow = db.prepare(`
        SELECT id, name, color, hue, model, host, workspace_id, checkout_id, task_id, mission_id,
               first_seen, last_seen, last_heartbeat, heartbeat_ttl_ms
          FROM agents WHERE id = ?
      `).get(agentId) as any

      if (!agentRow) {
        return json(res, { ok: false, error: `agent '${agentId}' not found` }, 404)
      }

      // Use the registry's heartbeat-only result. `last_seen` is not a
      // heartbeat and must not turn an old row into a plausible active/idle
      // process in an inspection response.
      const presence = coord.getAgentPresence(db, { workspaceId, agentId })[0]
      const state = presence?.presence ?? 'unproven'

      const leases = coord.listActiveLeases(db, workspaceId, agentId)

      const dateiereignisse = db.prepare(`
        SELECT ac.id, ac.path, ac.action, ac.at, ac.detail
          FROM activity ac
         WHERE ac.agent_id = ?
         ORDER BY ac.id DESC LIMIT 15
      `).all(agentId)

      const toolereignisse = db.prepare(`
        SELECT te.id, te.type, te.occurred_at, te.task_id, te.file_refs, te.payload
          FROM trace_events te
         WHERE te.agent_id = ?
         ORDER BY te.id DESC LIMIT 15
      `).all(agentId)

      coord.ensureInboxSchema(db)
      const messages = db.prepare(`
        SELECT m.id, m.from_agent AS fromAgent, m.to_agent AS toAgent, m.channel, m.subject, m.body,
               m.created_at AS createdAt, m.delivered_at AS deliveredAt, m.read_at AS readAt
          FROM inbox_messages m
         WHERE m.from_agent = ? OR m.to_agent = ? OR m.to_agent IS NULL
         ORDER BY m.created_at DESC LIMIT 15
      `).all(agentId, agentId)

      return json(res, {
        ok: true,
        agent: {
          id: agentRow.id,
          name: agentRow.name,
          color: agentRow.color,
          hue: agentRow.hue,
          model: agentRow.model,
          host: agentRow.host,
          workspaceId: agentRow.workspace_id,
          checkoutId: agentRow.checkout_id,
          taskId: agentRow.task_id,
          missionId: agentRow.mission_id,
          state,
          lastHeartbeat: agentRow.last_heartbeat,
          heartbeatTtlMs: agentRow.heartbeat_ttl_ms,
        },
        claims: leases,
        dateiereignisse,
        toolereignisse,
        messages,
      })
    }

    // ── Online Backup & Restore (M5) ────────────────────────────────────
    if (p === '/api/backup' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const targetPath = String(body.targetPath ?? body.path ?? '').trim() ||
        join(process.env.PLUGBRAIN_HOME ?? join(homedir(), '.plugbrain'), 'backups', `plugbrain-backup-${Date.now()}.db`)
      try {
        const result = backupStore(db, targetPath)
        return json(res, { ok: true, ...result })
      } catch (err: unknown) {
        return json(res, { ok: false, error: (err as Error).message }, 500)
      }
    }

    if (p === '/api/backup/verify' && (req.method === 'GET' || req.method === 'POST')) {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const path = String(body.path ?? q.get('path') ?? '').trim()
      if (!path) return json(res, { ok: false, error: 'path required' }, 400)
      const verified = verifyBackupFile(path)
      return json(res, { ok: verified.valid, ...verified })
    }

    // Also a read: searching the index changes nothing. The agent is required
    // and the search is attributed to it, exactly like the file read above.
    if (p === '/api/agent/search' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const query = String(body.query ?? '')
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)

      access.requireWorkspace(db, workspaceId)
      knownAgent(db, agentId)

      return json(res, {
        ok: true,
        hits: access.search(db, workspaceId, agentId, query),
      })
    }

    // ── workspace registration ───────────────────────────────────────────
    // A client that can open a folder must be able to make it a workspace
    // without shelling out to the CLI. The id is derived from the canonical
    // root exactly as `plugbrain register` derives it, so registering the same
    // folder twice is one workspace, whichever side asked for it.
    // ── Workspace task queue ─────────────────────────────────────────────
    // Work is pulled, not routed: the first free agent claims the next task.
    // Reading the queue is open; changing it is a mutation like any other.
    if (p === '/api/queue' && req.method === 'GET') {
      access.requireWorkspace(db, ws)
      const staleAfterMs = Number(q.get('staleAfterMs'))
      return json(res, {
        ok: true,
        depth: queue.queueDepth(db, ws),
        tasks: queue.listQueue(db, ws, Number.isFinite(staleAfterMs) ? { staleAfterMs } : {}),
      })
    }

    if (p === '/api/queue' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      return json(res, {
        ok: true,
        task: queue.enqueueTask(db, workspaceId, {
          title: String(body.title ?? ''),
          ...(body.body === undefined ? {} : { body: String(body.body) }),
          ...(body.addressedTo === undefined ? {} : { addressedTo: String(body.addressedTo) }),
          ...(body.requestedBy === undefined ? {} : { requestedBy: String(body.requestedBy) }),
        }),
      })
    }

    if (p === '/api/queue/claim' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      const task = queue.claimNextTask(db, workspaceId, agentId)
      // An empty queue is an honest answer, not an error: there is simply
      // nothing to do, and an idle agent must be able to tell the difference.
      return json(res, { ok: true, task })
    }

    if (p === '/api/queue/deliver' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const taskId = String(body.taskId ?? '').trim()
      const agentId = String(body.agentId ?? '').trim()
      const path = String(body.deliveredPath ?? '').trim()
      if (!taskId || !agentId || !path) {
        return json(res, { ok: false, error: 'taskId, agentId and deliveredPath required' }, 400)
      }
      return json(res, { ok: true, task: queue.deliverTask(db, taskId, agentId, path) })
    }

    if (p === '/api/workspaces' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const raw = String(body.root ?? '').trim()
      if (raw === '') return json(res, { ok: false, error: 'root is required' }, 400)
      const root = resolvePath(raw)
      if (!existsSync(root) || !statSync(root).isDirectory()) {
        return json(res, { ok: false, error: `not a directory: ${root}` }, 400)
      }
      const id = `ws-${createHash('sha256').update(root.toLowerCase()).digest('hex').slice(0, 12)}`
      // Both separators: a Windows root splits on backslashes, and a class of
      // only `/` leaves the whole path as the workspace name.
      const fallback = root.split(/[\\/]/).filter(Boolean).pop() ?? id
      const name = String(body.name ?? '').trim() || fallback
      db.prepare(
        `INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)
         ON CONFLICT(root) DO UPDATE SET name = excluded.name`
      ).run(id, name, root, new Date().toISOString())
      refreshDaemon()
      return json(res, { ok: true, workspace: { id, name, root } })
    }

    if (p === '/api/reindex' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const id = String(body.workspace ?? ws).trim()
      access.requireWorkspace(db, id)
      // Idempotency, when the caller names the job. A replay of the same key
      // must never start a second run: it is answered with the run that key
      // already refers to, which is why the key lives in the run state file
      // and survives a restart of the daemon.
      const key = typeof body.idempotencyKey === 'string' ? body.idempotencyKey.trim() : ''
      if (key !== '') {
        const prior = readRunState(id)
        if (prior !== null && prior.idempotencyKey === key) {
          const appraisal = appraiseRun(id)
          return json(res, {
            ok: appraisal.finished,
            started: false,
            idempotent: true,
            status: appraisal.finished ? 'finished' : 'busy',
            jobId: prior.runId,
            runningSince: prior.startedAt,
            reason: `idempotency key '${key}' already names run ${prior.runId}`,
            summary: describeRun(appraisal),
            run: prior,
            progress: appraisal.finished ? null : runProgress(appraisal),
          }, appraisal.finished ? 200 : 409)
        }
      }
      // A planet reindexes through its checkout roots, never by walking the
      // whole planet folder — that would pull in every worktree unlabelled.
      return startIndex(id, body.full === true, res, key)
    }

    // ── Index runs: is anything happening, and how far has it got? ─────────
    // Read from the run state on disk, so this answer is available while the
    // writer still holds its transaction — the one moment it matters.
    if (p === '/api/index/progress' && req.method === 'GET') {
      const target = String(q.get('workspace') ?? '').trim()
      if (target === '') {
        const runs = listRunStates().map(state => appraiseRun(state.workspaceId))
        const active = runs.find(appraisal =>
          appraisal.state !== null && !appraisal.finished && !appraisal.recoverable)
        return json(res, {
          ok: true,
          indexState: active === undefined ? 'idle' : 'indexing',
          indexing: active === undefined || active.state === null
            ? null : runProgress(active),
          runs,
        })
      }
      const appraisal = appraiseRun(target)
      return json(res, {
        ok: true,
        ...indexStateOf(db, target),
        workspace: target,
        // The job name a second caller needs to recognise this run as its own.
        jobId: appraisal.state?.runId ?? null,
        runningSince: appraisal.state?.startedAt ?? null,
        running: appraisal.running,
        stale: appraisal.stale,
        quiet: appraisal.quiet,
        ownerAlive: appraisal.ownerAlive,
        recoverable: appraisal.recoverable,
        finished: appraisal.finished,
        heartbeatAgeMs: appraisal.heartbeatAgeMs,
        fraction: appraisal.fraction,
        // A sentence that is safe to show as-is, next to the numbers.
        summary: describeRun(appraisal),
        run: appraisal.state,
      })
    }

    // ── Brain read routes (0.1.1) ────────────────────────────────────────
    // What the Board contract asks for and the Core did not publish: the file
    // inventory with LOC, the edges of one file, an open search, the delta
    // between two generations and the City projection. All of them are reads,
    // all of them are scoped by the active Planet selection, and all of them
    // answer while an index run works.
    if (p === '/api/files' && req.method === 'GET') {
      const w = access.requireWorkspace(db, ws)
      const limit = clampLimit(q.get('limit'), 200, 5000)
      const offsetRaw = Number(q.get('offset'))
      const offset = Number.isFinite(offsetRaw) && offsetRaw > 0 ? Math.floor(offsetRaw) : 0
      const files = filesOf(db, w.id, {
        prefix: String(q.get('prefix') ?? '').trim().replace(/^\/+/, ''),
        limit, offset,
      })

      // The git facts a file list is read against. `gitMainCommit` is the
      // primary checkout's head when the workspace is a Planet, otherwise the
      // workspace's own repository head; both are absent rather than guessed
      // when the folder is not a repository.
      const gitState = tableExists(db, 'git_state') ? db.prepare(
        'SELECT is_repo AS isRepo, head, branch FROM git_state WHERE workspace_id = ?')
        .get(w.id) as { isRepo: number; head: string | null; branch: string | null } | undefined
        : undefined
      const primary = db.prepare(
        `SELECT c.path, c.branch, c.head FROM checkouts c
           JOIN planets pl ON pl.id = c.planet_id
          WHERE pl.workspace_id = ? AND c.is_primary = 1 AND c.retired_at IS NULL
          LIMIT 1`).get(w.id) as
        { path: string; branch: string | null; head: string | null } | undefined
      // A workspace that is one plain folder is not a planet and has no
      // selection; asking for one throws, and "not a planet" is a fact, not an
      // error, so it is answered as `planet: false`.
      const isPlanet = db.prepare('SELECT 1 AS present FROM planets WHERE workspace_id = ?').get(w.id) !== undefined
      const selection = isPlanet
        ? { planet: true, ...getPlanetIndexSelection(db, w.id) }
        : { planet: false, configured: false, checkoutIds: [] as string[], updatedAt: null }
      const checkouts = selection.checkoutIds.length === 0 ? [] : db.prepare(
        `SELECT id, path, branch, head FROM checkouts
          WHERE id IN (${selection.checkoutIds.map(() => '?').join(',')})
          ORDER BY rel_prefix ASC`)
        .all(...selection.checkoutIds) as Array<{ id: string; path: string; branch: string | null; head: string | null }>

      return json(res, {
        ok: true,
        workspace: w.id,
        workspaceRoot: w.root,
        ...indexStateOf(db, w.id),
        files: {
          ...files,
          gitMainCommit: primary?.head ?? (gitState?.isRepo === 1 ? gitState.head : null),
          activeWorktree: checkouts.length === 1
            ? { path: checkouts[0].path, branch: checkouts[0].branch, head: checkouts[0].head }
            : null,
          selection,
        },
      })
    }

    if (p === '/api/edges' && req.method === 'GET') {
      const w = access.requireWorkspace(db, ws)
      const fileIdRaw = Number(q.get('fileId'))
      const fileId = Number.isSafeInteger(fileIdRaw) && fileIdRaw > 0 ? fileIdRaw : null
      const path = String(q.get('path') ?? '').trim()
      if (fileId === null && path === '') {
        return json(res, { ok: false, error: 'fileId or path is required' }, 400)
      }
      const directionRaw = q.get('direction')
      const direction = directionRaw === 'in' || directionRaw === 'out' ? directionRaw : 'both'
      const resolvedRaw = q.get('resolved')
      const resolved = resolvedRaw === '1' || resolvedRaw === 'true' ? true
        : resolvedRaw === '0' || resolvedRaw === 'false' ? false : null
      const limit = clampLimit(q.get('limit'), 200, 2000)
      const offsetRaw = Number(q.get('offset'))
      const offset = Number.isFinite(offsetRaw) && offsetRaw > 0 ? Math.floor(offsetRaw) : 0
      return json(res, {
        ok: true,
        workspace: w.id,
        ...indexStateOf(db, w.id),
        edges: edgesOf(db, w.id, {
          fileId, path, direction, kind: q.get('kind')?.trim() || null, resolved, limit, offset,
        }),
      })
    }

    if (p === '/api/search' && req.method === 'GET') {
      const w = access.requireWorkspace(db, ws)
      const query = String(q.get('q') ?? q.get('query') ?? '').trim()
      if (query === '') return json(res, { ok: false, error: 'q is required' }, 400)
      const kinds = (q.get('kind') ?? '').split(',').map(kind => kind.trim()).filter(Boolean)
      const limit = clampLimit(q.get('limit'), 50, 500)
      // The canonical search (store/search.ts) keeps the FTS match first; this
      // route only narrows the ANSWER to the active Planet selection, so a hit
      // in a deselected checkout cannot leak into the planet's surface.
      const hits = searchWorkspace(db, w.id, query, { limit, ...(kinds.length === 0 ? {} : { kinds }) })
      const scope = liveFileScope(db, w.id, 'f.checkout_id', 'f.path')
      const ids = hits.map(hit => hit.fileId).filter((id): id is number => id !== null)
      const allowed = new Set<number>(ids.length === 0 ? [] : (db.prepare(
        `SELECT f.id FROM files f WHERE f.workspace_id = ? AND ${scope.sql}
          AND f.id IN (${ids.map(() => '?').join(',')})`)
        .all(w.id, ...scope.params, ...ids) as Array<{ id: number }>).map(row => row.id))
      return json(res, {
        ok: true,
        workspace: w.id,
        ...indexStateOf(db, w.id),
        query,
        hits: hits.filter(hit => hit.fileId === null || allowed.has(hit.fileId)),
      })
    }

    if (p === '/api/changes' && req.method === 'GET') {
      const w = access.requireWorkspace(db, ws)
      const state = db.prepare(
        'SELECT generation FROM workspace_index_state WHERE workspace_id = ?')
        .get(w.id) as { generation: number } | undefined
      const toGeneration = Number(state?.generation ?? 0)
      const fromRaw = Number(q.get('from') ?? q.get('fromGeneration'))
      if (q.get('from') === null && q.get('fromGeneration') === null && toGeneration === 0) {
        return json(res, {
          ok: false,
          error: 'this workspace has no published generation yet; pass ?from=<generation> or index it first',
        }, 409)
      }
      const from = Number.isFinite(fromRaw) && fromRaw >= 0
        ? Math.floor(fromRaw)
        : Math.max(0, toGeneration - 1)
      return json(res, {
        ok: true,
        workspace: w.id,
        ...indexStateOf(db, w.id),
        changes: changesOf(db, w.id, from),
      })
    }

    if (p === '/api/city' && req.method === 'GET') {
      const w = access.requireWorkspace(db, ws)
      const heightMetric = q.get('height') === 'loc' ? 'loc' as const : 'symbols' as const
      return json(res, {
        ok: true,
        workspace: w.id,
        ...indexStateOf(db, w.id),
        city: citySnapshot(db, w.id, { heightMetric }),
      })
    }

    if (p === '/api/city/delta' && req.method === 'GET') {
      const w = access.requireWorkspace(db, ws)
      // `Number(null)` is 0, so an omitted `from` would silently mean "since the
      // beginning" and answer a delta nobody asked for.
      const raw = q.get('from') ?? q.get('fromGeneration')
      const from = raw === null || raw.trim() === '' ? Number.NaN : Number(raw)
      if (!Number.isFinite(from) || from < 0) {
        return json(res, { ok: false, error: 'from=<generation> is required' }, 400)
      }
      return json(res, {
        ok: true,
        workspace: w.id,
        ...indexStateOf(db, w.id),
        delta: cityDelta(db, w.id, Math.floor(from)),
      })
    }

    // ── Code Intelligence (M3: GitNexus Parity) ──────────────────────────
    if (p === '/api/intel/status') {
      const workspaceId = requiredIntelWorkspace(db, ws)
      if (workspaceId === null) {
        return json(res, {
          ok: false,
          error: 'workspace is required for Intel status when zero or multiple workspaces are registered',
        }, 400)
      }
      return json(res, {
        ok: true,
        ...indexStateOf(db, workspaceId),
        status: intel.getIntelStatus(db, workspaceId),
      })
    }

    if (p === '/api/intel/context') {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const name = String(body.name ?? q.get('name') ?? '').trim()
      if (!name) return json(res, { ok: false, error: 'name parameter required' }, 400)
      const repoId = (body.repoId as string | undefined) ?? q.get('repo') ?? undefined
      const checkoutId = (body.checkoutId as string | undefined) ?? q.get('checkout') ?? undefined
      const file = (body.file as string | undefined) ?? q.get('file') ?? undefined
      return json(res, { ok: true, result: intel.getSymbolContext(db, name, { repoId, checkoutId, file }) })
    }

    if (p === '/api/intel/impact') {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const target = String(body.target ?? q.get('target') ?? '').trim()
      if (!target) return json(res, { ok: false, error: 'target parameter required' }, 400)
      const direction = ((body.direction ?? q.get('direction') ?? 'both') as 'upstream' | 'downstream' | 'both')
      const maxDepth = Number(body.maxDepth ?? q.get('maxDepth') ?? 3)
      const repoId = (body.repoId as string | undefined) ?? q.get('repo') ?? undefined
      const file = (body.file as string | undefined) ?? q.get('file') ?? undefined
      return json(res, { ok: true, result: intel.getBlastRadius(db, target, { direction, maxDepth, repoId, file }) })
    }

    if (p === '/api/intel/query') {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const query = String(body.query ?? body.q ?? q.get('q') ?? q.get('query') ?? '').trim()
      if (!query) return json(res, { ok: false, error: 'query parameter required' }, 400)
      const limit = Number(body.limit ?? q.get('limit') ?? 25)
      const repoId = (body.repoId as string | undefined) ?? q.get('repo') ?? undefined
      const checkoutId = (body.checkoutId as string | undefined) ?? q.get('checkout') ?? undefined
      const workspaceId = ((body.workspace as string | undefined) ?? ws) || undefined
      return json(res, {
        ok: true,
        ...(workspaceId === undefined || workspaceId === '' ? {} : indexStateOf(db, workspaceId)),
        result: intel.conceptSearch(db, query, { limit, repoId, checkoutId, workspaceId }),
      })
    }

    if (p === '/api/intel/detect_changes' || p === '/api/intel/detect-changes') {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const workspaceId = requiredIntelWorkspace(db, String(body.workspace ?? ws))
      if (workspaceId === null) {
        return json(res, {
          ok: false,
          error: 'workspace is required for change detection when zero or multiple workspaces are registered',
        }, 400)
      }
      const checkoutId = (body.checkoutId as string | undefined) ?? q.get('checkout') ?? undefined
      const repoId = (body.repoId as string | undefined) ?? q.get('repo') ?? undefined
      const checkoutPath = (body.checkoutPath as string | undefined) ?? q.get('path') ?? undefined
      const diffText = (body.diffText as string | undefined)
      return json(res, {
        ok: true,
        ...indexStateOf(db, workspaceId),
        result: intel.detectChanges(db, { workspaceId, checkoutId, repoId, checkoutPath, diffText }),
      })
    }

    if (p === '/api/intel/cypher' && (req.method === 'POST' || req.method === 'GET')) {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const query = (body.query ?? body.dsl ?? q.get('q') ?? q.get('query')) as string | object
      if (!query) return json(res, { ok: false, error: 'query or dsl required' }, 400)
      const limit = Number(body.limit ?? q.get('limit') ?? 50)
      return json(res, { ok: true, result: intel.executeCypherQuery(db, query, { limit }) })
    }

    // An unknown API path is a 404 in JSON. Falling through to the UI shell
    // answered a missing route with 200 HTML, which makes a client's
    // `response.json()` throw and hides the fact that nothing was wired.
    if (p.startsWith('/api/')) return json(res, { ok: false, error: `no route: ${p}` }, 404)

    // ── static UI ────────────────────────────────────────────────────────
    if (ctx.uiRoot) {
      const rel = p === '/' ? 'index.html' : p.replace(/^\/+/, '')
      const file = join(ctx.uiRoot, rel)
      if (!file.startsWith(ctx.uiRoot)) return json(res, { ok: false, error: 'bad path' }, 400)
      try {
        const body = readFileSync(file)
        if (extname(file) === '.html') {
          res.writeHead(200, { 'Content-Type': MIME['.html'] })
          return void res.end(withLocalSession(body.toString('utf8'), ctx))
        }
        res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
        return void res.end(body)
      } catch { /* fall through to 404 */ }
      try {
        const shell = readFileSync(join(ctx.uiRoot, 'index.html'), 'utf8')
        res.writeHead(200, { 'Content-Type': MIME['.html'] })
        return void res.end(withLocalSession(shell, ctx))
      } catch { /* no UI built */ }
    }

    json(res, { ok: false, error: `no route: ${p}` }, 404)
  }

  return new Promise((resolve, reject) => {
    server.on('error', reject)
    server.listen(port, '127.0.0.1', () => {
      const address = server.address()
      const actualPort = typeof address === 'object' && address ? address.port : port
      resolve({
        port: actualPort,
        server,
        close: () => new Promise<void>((res, rej) => {
          server.close(err => (err ? rej(err) : res()))
        }),
      })
    })
  })
}
