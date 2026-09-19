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
  indexPlanetWorkspace, listWorkspaceView, noteRootRows, planetHistory, registerPlanet,
} from '../planet.ts'
import * as notes from '../notes/vault.ts'

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
import { evaluateClaim } from '../projections/conflicts.ts'
import { ingestTraceEvents, ensureTraceSchema } from '../trace.ts'
import { buildContextPack, packStaleness } from '../chronicle.ts'
import * as intel from '../intel/index.ts'
import * as coord from '../coord/index.ts'
import { homedir } from 'node:os'
import { backupStore, verifyBackupFile } from '../store/backup.ts'
import { IndexRunBusy, startIndexRun } from '../index/runner.ts'
import { appraiseRun, describeRun, listRunStates, readRunState } from '../index/runs.ts'
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
 * The unified graph projection. Nodes carry the colour of the agent that owns
 * them, so agent tracks are visible in the Atlas, the City and the Planet
 * without any of them re-deriving attribution.
 */
function graphOf(db: DatabaseSync, workspaceId: string, limit: number, until?: string | null) {
  // Selection is assembled from three cheap indexed queries and ranked in JS.
  // Doing it with correlated subqueries in ORDER BY re-scans 630k edges once
  // per file and hangs the request outright — measured, not theorised.
  const touched = new Set(
    (db.prepare(
      `SELECT DISTINCT path FROM activity
        WHERE workspace_id = ? AND agent_id IS NOT NULL AND (? IS NULL OR at <= ?)`
    ).all(workspaceId, until ?? null, until ?? null) as { path: string }[]).map(r => r.path))

  const degree = new Map<number, number>()
  for (const row of db.prepare(
    `SELECT src_file AS f, COUNT(*) c FROM edges
      WHERE workspace_id = ? AND kind = 'imports' AND src_file IS NOT NULL GROUP BY src_file`
  ).all(workspaceId) as { f: number; c: number }[]) degree.set(row.f, row.c)
  for (const row of db.prepare(
    `SELECT dst_file AS f, COUNT(*) c FROM edges
      WHERE workspace_id = ? AND kind = 'imports' AND dst_file IS NOT NULL GROUP BY dst_file`
  ).all(workspaceId) as { f: number; c: number }[]) degree.set(row.f, (degree.get(row.f) ?? 0) + row.c)

  const all = db.prepare(
    `SELECT f.id, f.path, f.lang, f.loc, f.ext,
            o.agent_id AS agentId, a.color AS agentColor, a.name AS agentName, o.at AS ownedAt
       FROM files f
       LEFT JOIN file_owner o ON o.file_id = f.id
       LEFT JOIN agents a ON a.id = o.agent_id
      WHERE f.workspace_id = ?`
  ).all(workspaceId) as {
    id: number; path: string; lang: string | null; loc: number; ext: string
    agentId: string | null; agentColor: string | null; agentName: string | null; ownedAt: string | null
  }[]

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
       FROM activity ac JOIN agents ag ON ag.id = ac.agent_id
      WHERE ac.workspace_id = ? AND ac.action = 'read' AND (? IS NULL OR ac.at <= ?)
      GROUP BY ac.path, ac.agent_id`
  ).all(workspaceId, until ?? null, until ?? null) as
    { path: string; agentId: string; color: string; name: string; at: string }[]
  const readersByPath = new Map<string, { id: string; name: string; color: string; at: string }[]>()
  for (const r of readerRows) {
    const entry = { id: r.agentId, name: r.name, color: r.color, at: r.at }
    const list = readersByPath.get(r.path)
    if (list) list.push(entry); else readersByPath.set(r.path, [entry])
  }

  const ids = new Set(files.map(f => f.id))
  const edges = (db.prepare(
    `SELECT kind, src_file AS src, dst_file AS dst FROM edges
      WHERE workspace_id = ? AND kind = 'imports' AND resolved = 1 AND dst_file IS NOT NULL`
  ).all(workspaceId) as { kind: string; src: number; dst: number }[])
    .filter(e => ids.has(e.src) && ids.has(e.dst))

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
    edges: edges.map(e => ({ source: `file:${e.src}`, target: `file:${e.dst}`, kind: e.kind })),
  }
}

/** Symbol-level graph for one file — the Surface level of the contract. */
function symbolsOf(db: DatabaseSync, workspaceId: string, path: string) {
  const file = db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
    .get(workspaceId, path) as { id: number } | undefined
  if (!file) return { path, symbols: [], calls: [] }
  const symbols = db.prepare(
    `SELECT id, name, kind, line, end_line AS endLine, exported, container
       FROM symbols WHERE file_id = ? ORDER BY line`).all(file.id)
  const calls = db.prepare(
    `SELECT e.kind, e.raw_target AS target, e.line, e.resolved,
            s.name AS fromName
       FROM edges e LEFT JOIN symbols s ON s.id = e.src_symbol
      WHERE e.workspace_id = ? AND e.src_file = ? AND e.kind IN ('calls','references','extends','implements')
      ORDER BY e.line LIMIT 500`).all(workspaceId, file.id)
  return { path, symbols, calls }
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

  /**
   * Start an index run and answer at once.
   *
   * Indexing a real planet is minutes of CPU work, so the request must not be
   * the thing that waits: the run writes its own state file, and
   * `GET /api/index/progress` reports it. Without a configured store path (a
   * library or test context) there is nowhere for a worker to open its own
   * connection, so that case indexes in line — correct, just not concurrent.
   */
  function startIndex(
    workspaceId: string, full: boolean, res: ServerResponse,
  ): void {
    const dbFile = ctx.dbFile
    if (dbFile === undefined || dbFile === null || dbFile === '') {
      json(res, { ok: true, started: false, result: indexPlanetWorkspace(db, workspaceId, { full }) })
      return
    }
    try {
      const run = startIndexRun(workspaceId, { dbFile, full })
      json(res, { ok: true, started: true, run: run.state }, 202)
    } catch (error) {
      if (error instanceof IndexRunBusy) {
        // Not an error the caller caused: say who holds the lock and how far
        // the other run has got, so the answer is actionable.
        json(res, { ok: false, busy: true, error: error.message, run: error.state }, 409)
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

    if (p === '/api/health') return json(res, { ok: true, at: new Date().toISOString() })

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
      return json(res, {
        ok: true,
        planets: rows.map(w => {
          const files = (db.prepare('SELECT COUNT(*) c FROM files WHERE workspace_id = ?').get(w.id) as { c: number }).c
          const symbols = (db.prepare(
            'SELECT COUNT(*) c FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)')
            .get(w.id) as { c: number }).c
          const edges = (db.prepare('SELECT COUNT(*) c FROM edges WHERE workspace_id = ?').get(w.id) as { c: number }).c
          const stale = (db.prepare(
            'SELECT COUNT(*) c FROM files WHERE workspace_id = ? AND indexed_at IS NULL').get(w.id) as { c: number }).c
          return { ...w, files, symbols, edges, stale, agents: agentsOf(db, w.id) }
        }),
      })
    }

    // ── Planet: one workspace, coloured by agent ─────────────────────────
    if (p === '/api/graph') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, workspace: ws, ...graphOf(db, ws, Number(q.get('limit') ?? 1200)) })
    }

    if (p === '/api/agents') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, agents: agentsOf(db, ws) })
    }

    if (p === '/api/tracks') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, tracks: tracksOf(db, ws, Number(q.get('limit') ?? 200)) })
    }

    // ── Atlas/City snapshot ──────────────────────────────────────────────
    // Same envelope the three ported engines already speak, but the nodes are
    // the REAL graph: files AND code symbols, with the owning agent's colour
    // carried on every node so a track shows up in whichever view is open.
    if (p === '/api/atlas/snapshot') {
      const w = access.requireWorkspace(db, ws)
      const totalFiles = Number((db.prepare(
        'SELECT COUNT(*) c FROM files WHERE workspace_id = ?').get(ws) as { c: number }).c)
      // Files written but not yet re-read: the honest measure of "how far behind
      // is the brain", the same one the daemon's sweep and the briefing use.
      const staleFiles = Number((db.prepare(
        'SELECT COUNT(*) c FROM files WHERE workspace_id = ? AND indexed_at IS NULL')
        .get(ws) as { c: number }).c)
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
    if (p.startsWith('/api/mission/') && req.method === 'POST') {
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
        return json(res, { ok: true, planet: listWorkspaceView(db, target) })
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

    if (p === '/api/planet/scan' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const id = String(body.workspace ?? ws).trim()
      const w = access.requireWorkspace(db, id)
      // Refresh the revision vectors first: a scan IS the act of looking again,
      // and reporting yesterday's branch beside today's index would be a lie.
      const registered = registerPlanet(db, w.root, w.name)
      if (ctx.dbFile === undefined || ctx.dbFile === null || ctx.dbFile === '') {
        const result = indexPlanetWorkspace(db, id, { full: body.full === true })
        return json(res, { ok: true, registered, started: false, result })
      }
      try {
        const run = startIndexRun(id, { dbFile: ctx.dbFile, full: body.full === true })
        return json(res, { ok: true, registered, started: true, run: run.state }, 202)
      } catch (error) {
        if (error instanceof IndexRunBusy) {
          return json(res, { ok: false, busy: true, error: error.message, run: error.state }, 409)
        }
        throw error
      }
    }

    // ── git: branch, worktrees, commits ──────────────────────────────────
    if (p === '/api/git') {
      access.requireWorkspace(db, ws)
      const row = db.prepare('SELECT * FROM git_state WHERE workspace_id = ?').get(ws) as
        Record<string, unknown> | undefined
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
      return json(res, { ok: true, events, bounds })
    }

    // ── Surface: one artifact, all the way down ──────────────────────────
    if (p === '/api/symbols') {
      access.requireWorkspace(db, ws)
      return json(res, { ok: true, ...symbolsOf(db, ws, q.get('path') ?? '') })
    }

    if (p === '/api/provenance') {
      return json(res, { ok: true, ...access.fileProvenance(db, ws, q.get('path') ?? '') })
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

      const isDead = coord.isAgentDead(db, agentId)
      const lastHbMs = agentRow.last_heartbeat ? new Date(agentRow.last_heartbeat).getTime() : 0
      const isIdle = (Date.now() - lastHbMs) > 15000 && !isDead
      const state = isDead ? 'dead' : isIdle ? 'idle' : 'active'

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
      // A planet reindexes through its checkout roots, never by walking the
      // whole planet folder — that would pull in every worktree unlabelled.
      return startIndex(id, body.full === true, res)
    }

    // ── Index runs: is anything happening, and how far has it got? ─────────
    // Read from the run state on disk, so this answer is available while the
    // writer still holds its transaction — the one moment it matters.
    if (p === '/api/index/progress' && req.method === 'GET') {
      const target = String(q.get('workspace') ?? '').trim()
      if (target === '') {
        return json(res, { ok: true, runs: listRunStates().map(state => appraiseRun(state.workspaceId)) })
      }
      const appraisal = appraiseRun(target)
      return json(res, {
        ok: true,
        workspace: target,
        running: appraisal.running,
        stale: appraisal.stale,
        finished: appraisal.finished,
        heartbeatAgeMs: appraisal.heartbeatAgeMs,
        fraction: appraisal.fraction,
        // A sentence that is safe to show as-is, next to the numbers.
        summary: describeRun(appraisal),
        run: appraisal.state,
      })
    }

    // ── Code Intelligence (M3: GitNexus Parity) ──────────────────────────
    if (p === '/api/intel/status') {
      return json(res, { ok: true, status: intel.getIntelStatus(db) })
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
      return json(res, { ok: true, result: intel.conceptSearch(db, query, { limit, repoId, checkoutId, workspaceId }) })
    }

    if (p === '/api/intel/detect_changes' || p === '/api/intel/detect-changes') {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const checkoutId = (body.checkoutId as string | undefined) ?? q.get('checkout') ?? undefined
      const repoId = (body.repoId as string | undefined) ?? q.get('repo') ?? undefined
      const checkoutPath = (body.checkoutPath as string | undefined) ?? q.get('path') ?? undefined
      const diffText = (body.diffText as string | undefined)
      return json(res, { ok: true, result: intel.detectChanges(db, { checkoutId, repoId, checkoutPath, diffText }) })
    }

    if (p === '/api/intel/cypher' && (req.method === 'POST' || req.method === 'GET')) {
      const body = req.method === 'POST' ? await readBody(req) : {}
      const query = (body.query ?? body.dsl ?? q.get('q') ?? q.get('query')) as string | object
      if (!query) return json(res, { ok: false, error: 'query or dsl required' }, 400)
      const limit = Number(body.limit ?? q.get('limit') ?? 50)
      return json(res, { ok: true, result: intel.executeCypherQuery(db, query, { limit }) })
    }

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
