/**
 * PlugBrain CLI.
 *
 *   plugbrain register <path> [name]   register a folder as a workspace
 *   plugbrain index [workspaceId]      (re)index one or every workspace
 *   plugbrain status                   what the brain currently holds
 *   plugbrain search <query>           find code without touching the disk
 *   plugbrain serve [port]             run the API + UI daemon
 */
import { createHash } from 'node:crypto'
import { existsSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { openStore } from './store/schema.ts'
import { indexWorkspace } from './indexer/index.ts'
import * as access from './access.ts'
import { ensureAgent } from './access.ts'
import { buildBriefing, renderBriefing } from './context/briefing.ts'
import { startServer } from './server/api.ts'

const HOME = process.env.PLUGBRAIN_HOME ?? join(homedir(), '.plugbrain')
const DB_FILE = join(HOME, 'plugbrain.db')

const db = openStore(DB_FILE)

const workspaceIdFor = (root: string): string =>
  `ws-${createHash('sha256').update(resolve(root).toLowerCase()).digest('hex').slice(0, 12)}`

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

function indexAll(only?: string): void {
  const rows = only
    ? db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').all(only)
    : db.prepare('SELECT id, name, root FROM workspaces').all()
  if (rows.length === 0) { console.log('no workspaces registered'); return }
  for (const row of rows as { id: string; name: string; root: string }[]) {
    process.stdout.write(`indexing ${row.name} …\n`)
    const r = indexWorkspace(db, row.id, row.root)
    console.log(
      `  files ${r.files} (parsed ${r.parsed}, skipped ${r.skipped})\n` +
      `  symbols ${r.symbols}  edges ${r.edges}  unresolved ${r.unresolved}\n` +
      `  ${r.ms} ms`)
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
  const r = access.writeFile(db, workspaceId, agentId, path, content)
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
  case 'serve': {
    const port = Number(args[0] ?? 4310)
    const uiRoot = join(import.meta.dirname, '..', 'ui-dist')
    startServer({ db, uiRoot }, port).then(actual => {
      console.log(`PlugBrain serving on http://127.0.0.1:${actual}`)
      console.log(`  UI       http://127.0.0.1:${actual}/`)
      console.log(`  Galaxy   http://127.0.0.1:${actual}/api/galaxy`)
    })
    break
  }
  default:
    console.log('usage: plugbrain <register|index|status|search|attach|read|write|who|agents|serve> …')
    process.exit(1)
}
} catch (error) {
  // A refused access is a normal answer, not a crash: report it as one line.
  if (error instanceof access.AccessDenied) {
    console.error(`refused: ${error.message}`)
    process.exit(3)
  }
  throw error
}
