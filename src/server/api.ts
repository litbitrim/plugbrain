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
  indexPlanetWorkspace, listPlanet, planetHistory, registerPlanet,
} from '../planet.ts'
import * as missions from '../missions.ts'
import * as queue from '../queue.ts'
import { createAwarenessPort, type TaskAwarenessPack } from '../projections/awareness.ts'
import { evaluateClaim } from '../projections/conflicts.ts'
import { ingestTraceEvents } from '../trace.ts'
import { buildContextPack, packStaleness } from '../chronicle.ts'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
}

export class AuthenticationRequired extends Error {}

export interface Ctx {
  db: DatabaseSync
  uiRoot: string | null
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
  const serverInstanceId = ctx.instanceId ?? ('inst-' + randomUUID().slice(0, 12))

  const server = createServer((req, res) => {
    // A thrown handler must never take the brain down: this is the kernel of
    // the runtime, and one bad request cannot be allowed to stop every agent.
    void handle(req, res).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      const status = error instanceof AuthenticationRequired ? 401
        : error instanceof access.WriteConflictError ? 409
        : error instanceof access.AccessDenied ? 403
        : error instanceof missions.MissionError ? 409 : 500
      const body = error instanceof access.WriteConflictError
        ? { ok: false, error: message, hardConflicts: error.verdict.hardConflicts, verdict: error.verdict }
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
        coverage: {
          complete: g.nodes.length >= (db.prepare(
            'SELECT COUNT(*) c FROM files WHERE workspace_id = ?').get(ws) as { c: number }).c,
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

    // ── planet: repos, checkouts, revision vectors ───────────────────────
    // One planet is one workspace with many repos and checkouts inside it. The
    // UI never guesses which worktree a file came from: the ids are here.
    if (p === '/api/planet' && req.method === 'GET') {
      if (!ws) return json(res, { ok: false, error: 'workspace required' }, 400)
      try {
        return json(res, { ok: true, planet: listPlanet(db, ws) })
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
      const result = indexPlanetWorkspace(db, id, { full: body.full === true })
      return json(res, { ok: true, registered, result })
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

    if (p === '/api/agent/read' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const relPath = String(body.path ?? '').trim()
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      if (!relPath) return json(res, { ok: false, error: 'path required' }, 400)

      access.requireWorkspace(db, workspaceId)
      access.requireAgent(db, agentId)

      return json(res, {
        ok: true,
        ...access.readFile(db, workspaceId, agentId, relPath),
      })
    }

    if (p === '/api/agent/write' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const relPath = String(body.path ?? '').trim()
      const content = typeof body.content === 'string' ? body.content : ''
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      if (!relPath) return json(res, { ok: false, error: 'path required' }, 400)

      access.requireWorkspace(db, workspaceId)
      access.requireAgent(db, agentId)

      // FO-4 Hard conflict gate: evaluate intended write against active claims
      const taskId = String(body.taskId ?? `task-${agentId}`).trim() || `task-${agentId}`
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
        ...access.writeFile(db, workspaceId, agentId, relPath, content, taskId),
      })
    }

    if (p === '/api/agent/search' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const workspaceId = String(body.workspace ?? ws).trim()
      const agentId = String(body.agentId ?? '').trim()
      const query = String(body.query ?? '')
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)

      access.requireWorkspace(db, workspaceId)
      access.requireAgent(db, agentId)

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
      return json(res, { ok: true, workspace: { id, name, root } })
    }

    if (p === '/api/reindex' && req.method === 'POST') {
      checkAuth(req, ctx)
      const body = await readBody(req)
      const id = String(body.workspace ?? ws).trim()
      access.requireWorkspace(db, id)
      // A planet reindexes through its checkout roots, never by walking the
      // whole planet folder — that would pull in every worktree unlabelled.
      return json(res, { ok: true, result: indexPlanetWorkspace(db, id) })
    }

    // ── static UI ────────────────────────────────────────────────────────
    if (ctx.uiRoot) {
      const rel = p === '/' ? 'index.html' : p.replace(/^\/+/, '')
      const file = join(ctx.uiRoot, rel)
      if (!file.startsWith(ctx.uiRoot)) return json(res, { ok: false, error: 'bad path' }, 400)
      try {
        const body = readFileSync(file)
        res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
        return void res.end(body)
      } catch { /* fall through to 404 */ }
      try {
        const shell = readFileSync(join(ctx.uiRoot, 'index.html'))
        res.writeHead(200, { 'Content-Type': MIME['.html'] })
        return void res.end(shell)
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
