/**
 * PlugBrain CLI.
 *
 *   plugbrain register <path> [name]   register a folder as a workspace
 *   plugbrain index [workspaceId]      (re)index one or every workspace
 *   plugbrain status                   what the brain currently holds
 *   plugbrain search <query>           find code without touching the disk
 *   plugbrain serve [port]             run the API + UI daemon
 *
 *   plugbrain planet register [path] [name]   register a planet, discover its repos
 *   plugbrain planet scan [workspaceId]       refresh revisions, then index
 *   plugbrain planet status [workspaceId]     repos, checkouts, revisions, counts
 *   plugbrain planet history [workspaceId]    files the planet no longer has
 *
 *   plugbrain notes query <filter>            property query, e.g. typ=gate UND stand=offen
 *   plugbrain notes search <text>             prose search across the vault, with snippets
 *   plugbrain notes read <path>               one note with links, backlinks and properties
 *   plugbrain notes write <path> --from <f>   save with a version check
 *   plugbrain notes graph [--focus <path>]    the note graph with type colour groups
 *   plugbrain notes backlinks <path>          who points at this note
 */
import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { openStore } from './store/schema.ts'
import {
  indexPlanetWorkspace, listPlanet, noteRootRows, planetHistory, registerPlanet, workspaceIdFor,
} from './planet.ts'
import {
  backlinksOf, listNotes, noteGraph, queryNotes, readNote, writeNote,
} from './notes/vault.ts'
import { searchNotes } from './notes/search.ts'
import * as access from './access.ts'
import { ensureAgent } from './access.ts'
import * as intel from './intel/index.ts'
import { buildBriefing, renderBriefing } from './context/briefing.ts'
import { startServer } from './server/api.ts'
import { startDaemon } from './daemon.ts'
import { startMcpServer } from './mcp/server.ts'

const HOME = process.env.PLUGBRAIN_HOME ?? join(homedir(), '.plugbrain')
const DB_FILE = join(HOME, 'plugbrain.db')

const db = openStore(DB_FILE)

function register(path: string, name?: string): void {
  const root = resolve(path)
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`not a directory: ${root}`)
    process.exit(2)
  }
  const id = workspaceIdFor(root)
  const label = name ?? root.split(/[\\/]/).filter(Boolean).pop() ?? id
  db.prepare(
    `INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(root) DO UPDATE SET name = excluded.name`
  ).run(id, label, root, new Date().toISOString())
  console.log(`registered ${label}  ${id}\n  ${root}`)
}

function reportIndex(name: string, r: ReturnType<typeof indexPlanetWorkspace>): void {
  console.log(
    `${name}: ${r.mode}  generation ${r.generation}  ${r.ms} ms\n` +
    `  scanned ${r.scanned}  files ${r.files}  parsed ${r.parsed}  skipped ${r.skipped}\n` +
    `  changed  added ${r.changed.added}  modified ${r.changed.modified}` +
    `  renamed ${r.changed.renamed}  deleted ${r.changed.deleted}  unchanged ${r.changed.unchanged}\n` +
    `  reparsed ${r.reparsed}  reresolved ${r.reresolved}\n` +
    `  symbols ${r.symbols}  edges ${r.edges}  unresolved ${r.unresolved}  ambiguous ${r.ambiguous}`)
}

function indexAll(only?: string): void {
  const rows = only
    ? db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').all(only)
    : db.prepare('SELECT id, name, root FROM workspaces').all()
  if (rows.length === 0) { console.log('no workspaces registered'); return }
  for (const row of rows as { id: string; name: string; root: string }[]) {
    process.stdout.write(`indexing ${row.name} …\n`)
    reportIndex(row.name, indexPlanetWorkspace(db, row.id))
  }
}

/** Register a planet and everything inside it, then say what was found. */
function planetRegister(path?: string, name?: string): void {
  const root = resolve(path ?? process.cwd())
  const registered = registerPlanet(db, root, name)
  console.log(
    `${registered.created ? 'registered' : 'already known'} planet ${registered.name}\n` +
    `  planet    ${registered.planetId}\n` +
    `  workspace ${registered.workspaceId}\n` +
    `  root      ${registered.root}\n` +
    `  repos     ${registered.repos}\n` +
    `  checkouts ${registered.checkouts}`)
}

/** Refresh the revision vectors, then index: the honest "is this current" verb. */
function planetScan(only?: string): void {
  const planet = only ?? singlePlanetId()
  const row = db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').get(planet) as
    { id: string; name: string; root: string } | undefined
  if (!row) { console.error(`unknown workspace: ${planet}`); process.exit(2) }
  const registered = registerPlanet(db, row.root, row.name)
  console.log(`planet ${registered.name}: ${registered.repos} repos, ${registered.checkouts} checkouts`)
  reportIndex(row.name, indexPlanetWorkspace(db, row.id))
}

/** The planet a bare command should act on: the only one, or a clear refusal. */
function singlePlanetId(): string {
  const rows = db.prepare('SELECT workspace_id AS id FROM planets ORDER BY name').all() as
    Array<{ id: string }>
  if (rows.length === 0) { console.error('no planet registered'); process.exit(2) }
  if (rows.length > 1) {
    console.error('several planets registered — name one:')
    for (const row of rows) console.error(`  ${row.id}`)
    process.exit(2)
  }
  return rows[0].id
}

function planetStatus(only?: string): void {
  const id = only ?? singlePlanetId()
  const view = listPlanet(db, id)
  console.log(`\n${view.name}  ${view.planetId}`)
  console.log(`  workspace ${view.workspaceId}`)
  console.log(`  root      ${view.root}`)
  console.log(`  indexed   ${view.indexedAt ?? 'never'}  generation ${view.index.generation}`)
  console.log(
    `  totals    repos ${view.totals.repos}  checkouts ${view.totals.activeCheckouts} active` +
    ` (${view.totals.checkouts} known)  files ${view.totals.files}` +
    `  symbols ${view.totals.symbols}  edges ${view.totals.edges}` +
    `  unattributed ${view.unattributedFiles}`)
  if (view.notes.roots.length > 0) {
    console.log(
      `  notes     ${view.notes.files} notes in ${view.notes.roots.length} roots` +
      `  properties ${view.notes.properties}  links ${view.notes.links}` +
      ` (resolved ${view.notes.resolvedLinks}, ambiguous ${view.notes.ambiguousLinks},` +
      ` missing ${view.notes.missingLinks})`)
  }
  if (view.index.lastFailureAt) {
    console.log(`  last failure ${view.index.lastFailureAt}: ${view.index.failureReason ?? ''}`)
  }
  for (const repo of view.repos) {
    console.log(`\n  ${repo.name}  ${repo.id}`)
    if (repo.remoteUrl) console.log(`    origin ${repo.remoteUrl}`)
    for (const co of view.checkouts.filter(c => c.repoId === repo.id)) {
      const dirty = co.dirtyHash === null ? 'clean' : `dirty ${co.dirtyCount}`
      console.log(
        `    ${co.relPrefix}  ${co.branch ?? '(detached)'} ${(co.head ?? '').slice(0, 10)}` +
        `  ${dirty}  ${co.revision ?? ''}  files ${co.files}  symbols ${co.symbols}` +
        (co.retiredAt ? '  [retired]' : ''))
    }
  }
}

/* ── notes: the Obsidian replacement ────────────────────────────────────── */

/**
 * The identity a CLI read or edit is attributed to.
 *
 * Reads and writes go through the access layer, which records who did them, so
 * the CLI cannot be anonymous: an unattributed edit to the knowledge base is
 * exactly the thing the provenance exists to prevent.
 */
const NOTES_AGENT = 'notes-cli'
const notesAgent = (): string => {
  access.registerAgent(db, NOTES_AGENT, 'PlugBrain notes CLI')
  return NOTES_AGENT
}

const flagValue = (args: string[], name: string): string | null => {
  const inline = args.find(arg => arg.startsWith(`${name}=`))
  if (inline !== undefined) return inline.slice(name.length + 1)
  const at = args.indexOf(name)
  return at === -1 ? null : args[at + 1] ?? null
}

function notesQuery(args: string[]): void {
  const asJson = args.includes('--json')
  const text = args.filter(arg => !arg.startsWith('--') && !/^\d+$/.test(arg)).join(' ')
  const limit = Number(flagValue(args, '--limit') ?? 200)
  const result = queryNotes(db, singlePlanetId(), text, { limit })
  if (asJson) return jsonOut(result)
  console.log(`${result.total} note(s) match  ${result.parsed}`)
  for (const note of result.notes) {
    console.log(`  ${(note.typ ?? '-').padEnd(13)} ${(note.stand ?? '-').padEnd(10)} ` +
      `${note.title.padEnd(32)} ${note.path}`)
  }
}

function jsonOut(value: unknown): void {
  console.log(JSON.stringify(value, null, 2))
}

function notesSearch(args: string[]): void {
  const asJson = args.includes('--json')
  const text = args.filter(arg => !arg.startsWith('--') && !/^\d+$/.test(arg)).join(' ')
  if (text.trim() === '') {
    console.error('usage: plugbrain notes search <text> [--limit <n>] [--json]')
    process.exit(1)
  }
  const result = searchNotes(db, singlePlanetId(), text, {
    limit: Number(flagValue(args, '--limit') ?? 50),
  })
  if (asJson) return jsonOut(result)
  console.log(`${result.total} note(s) contain '${result.query}'`)
  for (const hit of result.hits) {
    console.log(`  ${hit.path}`)
    if (hit.snippet !== null) console.log(`      ${hit.snippet}`)
  }
}

function notesRead(args: string[]): void {
  const relPath = args.find(arg => !arg.startsWith('--'))
  if (!relPath) { console.error('usage: plugbrain notes read <path> [--json]'); process.exit(1) }
  const note = readNote(db, singlePlanetId(), notesAgent(), relPath)
  if (args.includes('--json')) return jsonOut(note)
  console.log(`${note.title}  (${note.path})`)
  console.log(`  version ${note.hash}  ${note.bytes} bytes  ${note.indexStale ? 'STALE in index' : 'indexed'}`)
  if (note.generated) console.log('  machine-generated: an edit will be overwritten by the tracker')
  const keys = new Map<string, string[]>()
  for (const property of note.properties) {
    const list = keys.get(property.key)
    if (list) list.push(property.value); else keys.set(property.key, [property.value])
  }
  for (const [key, values] of keys) console.log(`  ${key.padEnd(18)} ${values.filter(Boolean).join(', ')}`)
  console.log(`  links ${note.links.length}  backlinks ${note.backlinks.length}`)
  for (const backlink of note.backlinks) console.log(`    ← ${backlink.path}:${backlink.line}`)
  for (const link of note.links) {
    console.log(`    → ${link.target}${link.alias ? ` (${link.alias})` : ''}  [${link.status}]`)
  }
}

function notesBacklinks(args: string[]): void {
  const relPath = args.find(arg => !arg.startsWith('--'))
  if (!relPath) { console.error('usage: plugbrain notes backlinks <path>'); process.exit(1) }
  const rows = backlinksOf(db, singlePlanetId(), relPath)
  if (args.includes('--json')) return jsonOut(rows)
  if (rows.length === 0) { console.log('nobody links here'); return }
  for (const row of rows) console.log(`  ${row.path}:${row.line}${row.alias ? ` (${row.alias})` : ''}`)
}

function notesGraph(args: string[]): void {
  const graph = noteGraph(db, singlePlanetId(), {
    focus: flagValue(args, '--focus'),
    depth: Number(flagValue(args, '--depth') ?? 1),
    filter: flagValue(args, '--filter'),
    limit: Number(flagValue(args, '--limit') ?? 600),
  })
  if (args.includes('--json')) return jsonOut(graph)
  console.log(`${graph.nodes.length} of ${graph.coverage.notesInScope} notes` +
    `  ${graph.edges.length} links` + (graph.focus ? `  focus ${graph.focus} depth ${graph.depth}` : ''))
  for (const group of graph.groups) {
    console.log(`  ${group.name.padEnd(16)} ${String(group.count).padStart(4)}  hue ${String(group.hue).padStart(3)}  ${group.color}`)
  }
  if (graph.coverage.truncated) console.log(`  TRUNCATED at ${graph.nodes.length}`)
}

function notesWrite(args: string[]): void {
  const relPath = args.find(arg => !arg.startsWith('--'))
  if (!relPath) {
    console.error('usage: plugbrain notes write <path> --from <file>|--content <text> [--expect <hash>] [--allow-generated]')
    process.exit(1)
  }
  const from = flagValue(args, '--from')
  const inline = flagValue(args, '--content')
  if (from === null && inline === null) {
    console.error('refusing to write an empty note: pass --from <file> or --content <text>')
    process.exit(1)
  }
  const content = from === null ? String(inline) : readFileSync(from, 'utf8')
  const expected = flagValue(args, '--expect')
  const result = writeNote(db, singlePlanetId(), notesAgent(), relPath, content, {
    ...(expected === null ? {} : { expectedHash: expected }),
    allowGenerated: args.includes('--allow-generated'),
  })
  if (args.includes('--json')) return jsonOut(result)
  console.log(`${result.created ? 'created' : 'wrote'} ${result.path}`)
  console.log(`  version ${result.hash}  ${result.bytes} bytes  by ${result.agent}`)
  console.log(`  ${result.indexed ? 'indexed immediately' : 'not part of the index'}`)
}

function planetLog(only?: string, limit = 50): void {
  const id = only ?? singlePlanetId()
  const rows = planetHistory(db, id, limit)
  if (rows.length === 0) { console.log('nothing deleted or renamed yet'); return }
  for (const row of rows) {
    console.log(`  ${row.deletedAt}  ${row.reason.padEnd(8)} gen ${row.generation}  ${row.path}`)
  }
}

function intelQuery(args: string[]): void {
  const query = args.filter(a => !a.startsWith('--')).join(' ')
  if (!query) {
    console.error('usage: plugbrain query <search_query> [--repo <name>] [--limit <n>] [--json]')
    process.exit(1)
  }
  const repo = flagValue(args, '--repo') ?? undefined
  const limit = Number(flagValue(args, '--limit') ?? 25)
  const result = intel.conceptSearch(db, query, { limit, repoId: repo })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(`Query: "${result.query}" (${result.timingMs} ms, ${result.total} total hits)\n`)
    if (result.symbols.length > 0) {
      console.log(`Symbols (${result.symbols.length}):`)
      for (const s of result.symbols) {
        const v = s.isVendor ? ` [vendor: ${s.vendorReason ?? 'external'}]` : ''
        console.log(`  ${s.kind.padEnd(12)} ${s.name.padEnd(28)} ${s.file}:${s.line}${v}`)
      }
      console.log('')
    }
    if (result.notes.length > 0) {
      console.log(`Notes (${result.notes.length}):`)
      for (const n of result.notes) {
        console.log(`  ${n.title} (${n.path})`)
        if (n.snippet) console.log(`    ${n.snippet}`)
      }
      console.log('')
    }
    if (result.flows.length > 0) {
      console.log(`Execution Flows (${result.flows.length}):`)
      for (const f of result.flows) {
        console.log(`  [${f.processType}] ${f.label}`)
      }
      console.log('')
    }
  }
}

function intelContext(args: string[]): void {
  const name = args.find(a => !a.startsWith('--'))
  if (!name) {
    console.error('usage: plugbrain context <symbol_name> [--file <path>] [--repo <id>] [--json]')
    process.exit(1)
  }
  const file = flagValue(args, '--file') ?? undefined
  const repo = flagValue(args, '--repo') ?? undefined
  const result = intel.getSymbolContext(db, name, { file, repoId: repo })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    if (result.status === 'not_found') {
      console.log(`Symbol '${name}' not found.`)
    } else if (result.status === 'ambiguous') {
      console.log(`Ambiguous symbol '${name}' (${result.candidates?.length} candidates):`)
      for (const c of result.candidates ?? []) {
        console.log(`  ${c.kind} in ${c.file}:${c.line}`)
      }
    } else if (result.symbol) {
      const s = result.symbol
      const v = s.isVendor ? ` [vendor: ${s.vendorReason ?? 'external'}]` : ''
      console.log(`Symbol: ${s.name} (${s.kind}) in ${s.file}:${s.line}${v}\n`)
      console.log(`Incoming Calls (${result.incoming.calls.length}):`)
      for (const c of result.incoming.calls) {
        console.log(`  <- ${c.name} (${c.kind}) in ${c.file}:${c.line}`)
      }
      console.log(`\nOutgoing Calls (${result.outgoing.calls.length}):`)
      for (const c of result.outgoing.calls) {
        console.log(`  -> ${c.name} (${c.kind}) in ${c.file}:${c.line}`)
      }
      if (result.processes.length > 0) {
        console.log(`\nExecution Flows (${result.processes.length}):`)
        for (const p of result.processes) {
          console.log(`  [${p.processType}] ${p.label}`)
        }
      }
    }
  }
}

function intelImpact(args: string[]): void {
  const target = args.find(a => !a.startsWith('--'))
  if (!target) {
    console.error('usage: plugbrain impact <symbol_name> [--direction upstream|downstream|both] [--depth <n>] [--json]')
    process.exit(1)
  }
  const direction = (flagValue(args, '--direction') ?? 'both') as 'upstream' | 'downstream' | 'both'
  const maxDepth = Number(flagValue(args, '--depth') ?? 3)
  const result = intel.getBlastRadius(db, target, { direction, maxDepth })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(`Blast Radius for: ${result.target.name} (${result.target.file ?? ''})`)
    console.log(`Direction: ${result.direction} | Max Depth: ${result.maxDepth} | Total Impacted: ${result.totalImpacted} | Risk: ${result.risk.toUpperCase()}\n`)
    for (const [depth, nodes] of Object.entries(result.nodes)) {
      console.log(`Depth ${depth} (${nodes.length} nodes):`)
      for (const n of nodes) {
        console.log(`  ${n.relationType} ${n.name} (${n.kind}) in ${n.file} (conf: ${n.confidence})`)
      }
    }
  }
}

function intelDetectChanges(args: string[]): void {
  const path = flagValue(args, '--path') ?? undefined
  const result = intel.detectChanges(db, { checkoutPath: path })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(`Changed Files: ${result.changedFiles} | Changed Symbols: ${result.changedSymbols.length} | Risk: ${result.riskLevel.toUpperCase()}`)
    if (result.changedSymbols.length > 0) {
      console.log('\nAffected Symbols:')
      for (const s of result.changedSymbols) {
        console.log(`  [${s.changeType}] ${s.name} (${s.kind}) in ${s.file}:${s.line}`)
      }
    }
    if (result.affectedFlows.length > 0) {
      console.log('\nAffected Flows:')
      for (const f of result.affectedFlows) {
        console.log(`  ${f.flow} (affected by: ${f.affectedBy.join(', ')})`)
      }
    }
  }
}

function intelCypher(args: string[]): void {
  const query = args.filter(a => !a.startsWith('--')).join(' ')
  if (!query) {
    console.error('usage: plugbrain cypher <query> [--limit <n>] [--json]')
    process.exit(1)
  }
  const limit = Number(flagValue(args, '--limit') ?? 50)
  const result = intel.executeCypherQuery(db, query, { limit })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(result.markdown)
    console.log(`\n(${result.rowCount} row(s), ${result.timingMs} ms)`)
  }
}

function intelStatus(args: string[]): void {
  const result = intel.getIntelStatus(db)
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log('PlugBrain Code Intelligence Status:')
    console.log(`  Planet:          ${result.planetId}`)
    console.log(`  Workspace:       ${result.workspaceId}`)
    console.log(`  Repositories:    ${result.repos}`)
    console.log(`  Checkouts:       ${result.checkouts} (${result.dirtyCheckouts} dirty)`)
    console.log(`  Files:           ${result.files}`)
    console.log(`  Symbols:         ${result.symbols}`)
    console.log(`  Edges:           ${result.edges}`)
    console.log(`  Staleness:       ${result.staleness.isStale ? 'STALE' : 'CLEAN'} (${result.staleness.dirtyFiles} dirty files, ${result.staleness.untrackedFiles} untracked)`)
  }
}

function status(): void {
  const ws = db.prepare('SELECT id, name, root, indexed_at FROM workspaces').all() as
    { id: string; name: string; root: string; indexed_at: string | null }[]
  if (ws.length === 0) { console.log('no workspaces registered'); return }
  for (const w of ws) {
    const files = db.prepare('SELECT COUNT(*) c FROM files WHERE workspace_id = ?').get(w.id) as { c: number }
    const syms = db.prepare(
      'SELECT COUNT(*) c FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)').get(w.id) as { c: number }
    const edges = db.prepare('SELECT COUNT(*) c FROM edges WHERE workspace_id = ?').get(w.id) as { c: number }
    console.log(`\n${w.name}  ${w.id}`)
    console.log(`  ${w.root}`)
    console.log(`  indexed: ${w.indexed_at ?? 'never'}`)
    console.log(`  files ${files.c}  symbols ${syms.c}  edges ${edges.c}  → nodes ${files.c + syms.c}`)
    const byKind = db.prepare(
      `SELECT kind, COUNT(*) c FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)
       GROUP BY kind ORDER BY c DESC`).all(w.id) as { kind: string; c: number }[]
    if (byKind.length > 0) console.log('  symbols by kind: ' + byKind.map(k => `${k.kind} ${k.c}`).join(', '))
    const byEdge = db.prepare(
      `SELECT kind, COUNT(*) c FROM edges WHERE workspace_id = ? GROUP BY kind ORDER BY c DESC`).all(w.id) as
      { kind: string; c: number }[]
    if (byEdge.length > 0) console.log('  edges by kind:   ' + byEdge.map(k => `${k.kind} ${k.c}`).join(', '))
    const langs = db.prepare(
      `SELECT lang, COUNT(*) c FROM files WHERE workspace_id = ? AND lang IS NOT NULL GROUP BY lang ORDER BY c DESC`)
      .all(w.id) as { lang: string; c: number }[]
    if (langs.length > 0) console.log('  languages:       ' + langs.map(l => `${l.lang} ${l.c}`).join(', '))
  }
}

function search(query: string): void {
  const rows = db.prepare(
    `SELECT name, path, kind FROM search WHERE search MATCH ? LIMIT 25`).all(`${query}*`) as
    { name: string; path: string; kind: string }[]
  if (rows.length === 0) { console.log('no matches'); return }
  for (const r of rows) console.log(`  ${r.kind.padEnd(12)} ${r.name.padEnd(34)} ${r.path}`)
}

/** Agent-facing commands. These are the only sanctioned way to touch a workspace. */
function attach(workspaceId: string, agentId: string): void {
  ensureAgent(db, agentId)
  console.log(renderBriefing(buildBriefing(db, workspaceId, agentId)))
}

function agentRead(workspaceId: string, agentId: string, path: string): void {
  const r = access.readFile(db, workspaceId, agentId, path)
  console.log(`--- ${r.path} (${r.bytes} bytes, ${r.lang ?? 'unknown'}) ---`)
  console.log(r.content.length > 4000 ? r.content.slice(0, 4000) + '\n… truncated' : r.content)
}

function agentWrite(workspaceId: string, agentId: string, path: string, content: string): void {
  const r = access.writeFile(db, workspaceId, agentId, path, content, `task-${agentId}`)
  console.log(`${r.created ? 'created' : 'wrote'} ${r.path} (${r.bytes} bytes) as ${r.agent.name} ${r.agent.color}`)
}

function who(workspaceId: string, path: string): void {
  const p = access.fileProvenance(db, workspaceId, path)
  console.log(`${p.path}`)
  console.log(`  owner: ${p.owner ? JSON.stringify(p.owner) : 'unattributed'}`)
  for (const h of p.history as { action: string; at: string; name: string | null }[]) {
    console.log(`  ${h.at}  ${h.action.padEnd(7)} ${h.name ?? '(no agent)'}`)
  }
}

function agents(): void {
  const rows = db.prepare('SELECT id, name, color, first_seen, last_seen FROM agents ORDER BY first_seen').all() as
    { id: string; name: string; color: string; last_seen: string }[]
  if (rows.length === 0) { console.log('no agents yet'); return }
  for (const a of rows) console.log(`  ${a.color.padEnd(20)} ${a.name.padEnd(24)} last seen ${a.last_seen}`)
}

const [command, ...args] = process.argv.slice(2)
try {
switch (command) {
  case 'register': register(args[0], args[1]); break
  case 'index': indexAll(args[0]); break
  case 'status': status(); break
  case 'search': search(args.join(' ')); break
  case 'attach': attach(args[0], args[1]); break
  case 'read': agentRead(args[0], args[1], args[2]); break
  case 'write': agentWrite(args[0], args[1], args[2], args.slice(3).join(' ')); break
  case 'who': who(args[0], args[1]); break
  case 'agents': agents(); break
  case 'planet': {
    const [step, ...rest] = args
    if (step === 'register') planetRegister(rest[0], rest[1])
    else if (step === 'scan') planetScan(rest[0])
    else if (step === 'status') planetStatus(rest[0])
    else if (step === 'history') planetLog(rest[0])
    else {
      console.error('usage: plugbrain planet <register|scan|status|history> [path|workspaceId]')
      process.exit(1)
    }
    break
  }
  case 'notes': {
    const [step, ...rest] = args
    if (step === 'query') notesQuery(rest)
    else if (step === 'search') notesSearch(rest)
    else if (step === 'read') notesRead(rest)
    else if (step === 'write') notesWrite(rest)
    else if (step === 'graph') notesGraph(rest)
    else if (step === 'backlinks') notesBacklinks(rest)
    else if (step === 'list') {
      const result = listNotes(db, singlePlanetId(), { limit: Number(flagValue(rest, '--limit') ?? 200) })
      if (rest.includes('--json')) jsonOut(result)
      else {
        console.log(`${result.total} note(s)`)
        for (const note of result.notes) {
          console.log(`  ${(note.typ ?? '-').padEnd(13)} ${(note.stand ?? '-').padEnd(10)} ` +
            `${note.title.padEnd(32)} →${note.outLinks} ←${note.inLinks}`)
        }
      }
    } else {
      console.error('usage: plugbrain notes <list|query|search|read|write|graph|backlinks> …')
      process.exit(1)
    }
    break
  }
  case 'query': intelQuery(args); break
  case 'context': intelContext(args); break
  case 'impact': intelImpact(args); break
  case 'detect-changes':
  case 'detect_changes': intelDetectChanges(args); break
  case 'cypher': intelCypher(args); break
  case 'intel-status': intelStatus(args); break
  case 'intel': {
    const [step, ...rest] = args
    if (step === 'query') intelQuery(rest)
    else if (step === 'context') intelContext(rest)
    else if (step === 'impact') intelImpact(rest)
    else if (step === 'detect-changes' || step === 'detect_changes') intelDetectChanges(rest)
    else if (step === 'cypher') intelCypher(rest)
    else if (step === 'status') intelStatus(rest)
    else {
      console.error('usage: plugbrain intel <query|context|impact|detect-changes|cypher|status> …')
      process.exit(1)
    }
    break
  }
  case 'serve': {
    const port = Number(args[0] ?? 4310)
    const uiRoot = join(import.meta.dirname, '..', 'ui-dist')
    // The daemon runs inside serve by default: a brain that is only correct
    // when a human remembers to re-index is not a system of record.
    if (process.env.PLUGBRAIN_NO_DAEMON !== '1') startDaemon(db)
    const tokenFile = join(HOME, 'auth.token')
    let authKey = process.env.PLUG_BRAIN_AUTH_KEY
    if (!authKey) {
      if (existsSync(tokenFile)) {
        authKey = readFileSync(tokenFile, 'utf8').trim()
      } else {
        authKey = `plug-${randomUUID().replace(/-/g, '')}`
        try {
          writeFileSync(tokenFile, authKey, { mode: 0o600 })
        } catch (err) {
          console.error(`warning: could not write auth token file: ${(err as Error).message}`)
        }
      }
    }
    startServer({ db, uiRoot, authKey, requireAuth: true }, port).then(actual => {
      console.log(`PlugBrain serving on http://127.0.0.1:${actual}`)
      console.log(`  UI       http://127.0.0.1:${actual}/`)
      console.log(`  Galaxy   http://127.0.0.1:${actual}/api/galaxy`)
      console.log(`  Auth     Bearer token configured (${tokenFile})`)
    })
    break
  }
  case 'mcp': {
    const ws = flagValue(args, '--workspace') ?? undefined
    const authKey = flagValue(args, '--auth-key') ?? process.env.PLUG_BRAIN_AUTH_KEY ?? null
    startMcpServer({ db, workspaceId: ws, authKey })
    break
  }
  default:
    console.log(
      'usage: plugbrain <register|index|status|search|attach|read|write|who|agents|serve|planet|notes|query|context|impact|detect-changes|cypher|intel-status|mcp> …\n' +
      '       plugbrain planet <register|scan|status|history> [path|workspaceId]\n' +
      '       plugbrain notes <list|query|search|read|write|graph|backlinks> …\n' +
      '       plugbrain intel <query|context|impact|detect-changes|cypher|status> …\n' +
      '       plugbrain mcp [--workspace <ws>] [--auth-key <key>]')
    process.exit(1)
}
} catch (error) {
  // A refused access is a normal answer, not a crash: report it as one line.
  if (error instanceof access.WriteConflictError) {
    console.error(`refused: ${error.message}`)
    for (const conflict of error.verdict.hardConflicts) {
      console.error(`  holder ${conflict.holder.taskId} (${conflict.holder.agentId ?? 'unknown agent'}) → ${conflict.path}`)
    }
    process.exit(3)
  }
  if (error instanceof access.AccessDenied) {
    console.error(`refused: ${error.message}`)
    process.exit(3)
  }
  throw error
}
