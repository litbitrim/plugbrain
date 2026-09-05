/**
 * PlugBrain HTTP API — one model, many projections.
 *
 * Every surface (Galaxy, Planet, Surface, Explorer, PlugBoard) reads from here
 * rather than keeping its own half-complete copy of the truth, which is
 * invariant 12 of the contract. Agent identity and colour ride along with
 * every projection, so a track is visible in every graph without the client
 * having to correlate anything itself.
 */
import { readFileSync } from 'node:fs'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { extname, join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import * as access from '../access.ts'
import { buildBriefing, renderBriefing } from '../context/briefing.ts'
import { indexWorkspace } from '../indexer/index.ts'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
}

interface Ctx { db: DatabaseSync; uiRoot: string | null }

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

export function startServer(ctx: Ctx, port: number): Promise<number> {
  const { db } = ctx

  const server = createServer((req, res) => {
    // A thrown handler must never take the brain down: this is the kernel of
    // the runtime, and one bad request cannot be allowed to stop every agent.
    void handle(req, res).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      const status = error instanceof access.AccessDenied ? 403 : 500
      if (!res.headersSent) json(res, { ok: false, error: message }, status)
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
      const limit = Number(q.get('limit') ?? 900)
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

    // ── Agent-facing surface: the only sanctioned way in ─────────────────
    if (p === '/api/agent/attach' && req.method === 'POST') {
      const body = await readBody(req)
      const agentId = String(body.agentId ?? '')
      if (!agentId) return json(res, { ok: false, error: 'agentId required' }, 400)
      access.ensureAgent(db, agentId, body.name ? String(body.name) : undefined)
      const briefing = buildBriefing(db, String(body.workspace ?? ws), agentId)
      return json(res, { ok: true, briefing, markdown: renderBriefing(briefing) })
    }

    if (p === '/api/agent/read' && req.method === 'POST') {
      const body = await readBody(req)
      return json(res, {
        ok: true,
        ...access.readFile(db, String(body.workspace ?? ws), String(body.agentId ?? ''), String(body.path ?? '')),
      })
    }

    if (p === '/api/agent/write' && req.method === 'POST') {
      const body = await readBody(req)
      return json(res, {
        ok: true,
        ...access.writeFile(db, String(body.workspace ?? ws), String(body.agentId ?? ''),
          String(body.path ?? ''), String(body.content ?? '')),
      })
    }

    if (p === '/api/agent/search' && req.method === 'POST') {
      const body = await readBody(req)
      return json(res, {
        ok: true,
        hits: access.search(db, String(body.workspace ?? ws), String(body.agentId ?? ''), String(body.query ?? '')),
      })
    }

    if (p === '/api/reindex' && req.method === 'POST') {
      const body = await readBody(req)
      const id = String(body.workspace ?? ws)
      const w = access.requireWorkspace(db, id)
      return json(res, { ok: true, result: indexWorkspace(db, id, w.root) })
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

  return new Promise(resolve => {
    server.listen(port, '127.0.0.1', () => {
      const address = server.address()
      resolve(typeof address === 'object' && address ? address.port : port)
    })
  })
}
