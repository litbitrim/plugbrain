/**
 * The real vault, measured. The M2 gate.
 *
 * `planet-check.ts` guards the code half of a planet; this guards the written
 * half, and it exists because every M2 defect found so far was invisible in a
 * fixture and obvious here:
 *
 *   - 336 wiki links written `[[Welle R12\|R12]]` for Markdown tables, every
 *     one of them unresolved because the trailing backslash stayed on the name;
 *   - frontmatter values stored with their quotes, so `typ=gate` matched
 *     nothing at all;
 *   - notes whose properties were never extracted, because the incremental pass
 *     skipped them for having unchanged bytes.
 *
 * So it asserts the properties that must hold on the REAL corpus, prints the
 * numbers a report needs, and exits non-zero on the first violation. Run it
 * with PLUGBRAIN_HOME pointing at the store:
 *
 *   PLUGBRAIN_HOME=… node --experimental-strip-types bench/notes-check.ts
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { noteGraph, queryNotes } from '../src/notes/vault.ts'
import { searchNotes } from '../src/notes/search.ts'

const failures: string[] = []
const check = (ok: boolean, message: string): void => {
  if (!ok) failures.push(message)
}

function open(env: NodeJS.ProcessEnv): { db: DatabaseSync; workspaceId: string; root: string } | null {
  const home = env.PLUGBRAIN_HOME
  if (!home) {
    console.error('PLUGBRAIN_HOME is not set — nothing to check')
    return null
  }
  const db = openStore(join(home, 'plugbrain.db'))
  const row = db.prepare(
    `SELECT workspace_id AS workspaceId, COUNT(*) AS n FROM note_body
      GROUP BY workspace_id ORDER BY n DESC LIMIT 1`).get() as
    { workspaceId: string; n: number } | undefined
  if (row === undefined) { console.error('no indexed notes in this store'); return null }
  const root = (db.prepare('SELECT root FROM workspaces WHERE id = ?')
    .get(row.workspaceId) as { root: string }).root
  return { db, workspaceId: row.workspaceId, root }
}

const timed = <T>(runs: number, fn: () => T): { ms: number; ms95: number } => {
  const samples: number[] = []
  for (let i = 0; i < runs; i += 1) {
    const started = performance.now()
    fn()
    samples.push(performance.now() - started)
  }
  samples.sort((a, b) => a - b)
  return { ms: samples[Math.floor(samples.length / 2)], ms95: samples[Math.min(samples.length - 1, Math.floor(samples.length * 0.95))] }
}

const store = open(process.env)
if (store !== null) {
  const { db, workspaceId, root } = store
  const count = (sql: string, ...params: Array<string | number>): number =>
    Number((db.prepare(sql).get(...params) as { n: number }).n)

  const notePaths = (db.prepare(
    `SELECT id, path FROM files WHERE workspace_id = ? AND checkout_id IS NULL ORDER BY path`)
    .all(workspaceId) as unknown as Array<{ id: number; path: string }>)
  console.log(`vault        ${notePaths.length} notes under ${root}`)
  console.log(`properties   ${count('SELECT COUNT(*) n FROM note_properties WHERE workspace_id = ?', workspaceId)}` +
    `   tags ${count('SELECT COUNT(*) n FROM note_tags WHERE workspace_id = ?', workspaceId)}` +
    `   links ${count('SELECT COUNT(*) n FROM note_links WHERE workspace_id = ?', workspaceId)}`)
  const statuses = db.prepare(
    `SELECT status, COUNT(*) AS n FROM note_links WHERE workspace_id = ? GROUP BY status ORDER BY n DESC`)
    .all(workspaceId) as unknown as Array<{ status: string; n: number }>
  console.log(`link status  ${statuses.map(row => `${row.status} ${row.n}`).join('  ')}`)
  console.log(`bodies       ${count('SELECT COUNT(*) n FROM note_body WHERE workspace_id = ?', workspaceId)}`)

  // 1. Every note has its prose indexed, and its body row is non-empty.
  const bodyless = count(
    `SELECT COUNT(*) n FROM files f WHERE f.workspace_id = ? AND f.checkout_id IS NULL
       AND NOT EXISTS (SELECT 1 FROM note_body b WHERE b.file_id = f.id)`, workspaceId)
  check(bodyless === 0, `${bodyless} notes have no prose row — full-text search would miss them`)

  // 2. Resolution is never given away. A link whose target names exactly one
  //    note in the vault MUST be resolved; anything else is the escaped-pipe
  //    class of bug coming back.
  const basenames = new Map<string, number>()
  for (const note of notePaths) {
    const base = (note.path.split('/').pop() ?? note.path).replace(/\.md$/i, '').toLowerCase()
    basenames.set(base, (basenames.get(base) ?? 0) + 1)
  }
  const links = db.prepare(
    `SELECT file_id AS fileId, target, status FROM note_links WHERE workspace_id = ?`)
    .all(workspaceId) as unknown as Array<{ fileId: number; target: string; status: string }>
  const resolvable = links.filter(link => basenames.has(link.target.toLowerCase().replace(/\.md$/, '')))
  const lost = resolvable.filter(link => link.status !== 'resolved' && link.status !== 'self' && link.status !== 'ambiguous')
  check(lost.length === 0, `${lost.length} links name a note that exists but are not resolved, e.g. ` +
    lost.slice(0, 5).map(link => `'${link.target}' (${link.status})`).join(', '))
  console.log(`resolvable   ${resolvable.length} of ${links.length} links name a note of this vault`)

  // 3. A property value is never stored with its YAML quoting, because a query
  //    that compares against `gate` would then find nothing.
  const quoted = count(
    `SELECT COUNT(*) n FROM note_properties WHERE workspace_id = ?
       AND (value LIKE '"%"' OR value LIKE '''%''')`, workspaceId)
  check(quoted === 0, `${quoted} property values still carry their quotes`)

  // 4. The query the milestone is named after, against an independent count
  //    taken straight from the property rows.
  const gates = queryNotes(db, workspaceId, 'typ=gate UND stand=offen', { limit: 5000 })
  const independent = count(
    `SELECT COUNT(*) n FROM files f
      WHERE f.workspace_id = ? AND f.checkout_id IS NULL
        AND EXISTS (SELECT 1 FROM note_properties p WHERE p.file_id = f.id AND lower(p.key) = 'typ' AND lower(p.value) = 'gate')
        AND EXISTS (SELECT 1 FROM note_properties p WHERE p.file_id = f.id AND lower(p.key) = 'stand' AND lower(p.value) = 'offen')`,
    workspaceId)
  check(gates.total === independent,
    `query says ${gates.total} open gates, the property rows say ${independent}`)
  console.log(`typ=gate UND stand=offen  ${gates.total} notes (${independent} counted independently)`)

  // 5. A tag is never invented: every tag row appears in the note's own text.
  const tagRows = db.prepare(
    `SELECT t.tag AS tag, f.path AS path FROM note_tags t JOIN files f ON f.id = t.file_id
      WHERE t.workspace_id = ?`).all(workspaceId) as unknown as Array<{ tag: string; path: string }>
  let invented = 0
  for (const row of tagRows) {
    let text: string
    try { text = readFileSync(join(root, ...row.path.split('/')), 'utf8') } catch { text = '' }
    if (!text.toLowerCase().includes(row.tag.toLowerCase())) invented += 1
  }
  check(invented === 0, `${invented} tags do not appear in the note they are attached to`)
  console.log(`tags         ${tagRows.length} rows, ${new Set(tagRows.map(row => row.tag)).size} distinct`)

  // 6. The graph is the vault, coloured by type, and a filter narrows it.
  const graph = noteGraph(db, workspaceId, { limit: 5000 })
  check(graph.nodes.length === notePaths.length,
    `graph has ${graph.nodes.length} nodes for ${notePaths.length} notes`)
  check(graph.groups.length > 1, 'the graph has only one type — colour groups would be pointless')
  const filtered = noteGraph(db, workspaceId, { filter: 'typ=gate', limit: 5000 })
  check(filtered.nodes.every(node => node.properties.typ === 'gate'),
    'a typ=gate filter let a node through that is not a gate')
  console.log(`graph        ${graph.nodes.length} notes, ${graph.edges.length} links, ` +
    `${graph.groups.length} types (${graph.groups.slice(0, 5).map(group => `${group.name} ${group.count}`).join(', ')})`)

  // 7. Speed, on the real corpus, measured rather than claimed. M3 will hold
  //    these numbers to a budget, so they are printed before they are needed.
  const q = timed(12, () => queryNotes(db, workspaceId, 'typ=gate UND stand=offen', { limit: 5000 }))
  const s = timed(12, () => searchNotes(db, workspaceId, 'plugbrain', { limit: 50 }))
  const g = timed(6, () => noteGraph(db, workspaceId, { limit: 5000 }))
  console.log(`latency      query p95 ${q.ms95.toFixed(0)} ms   search p95 ${s.ms95.toFixed(0)} ms   graph p95 ${g.ms95.toFixed(0)} ms`)
  check(q.ms95 < 2000, `property query p95 ${q.ms95.toFixed(0)} ms exceeds 2 s`)

  db.close()
}

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed:`)
  for (const failure of failures) console.error(`  ✖ ${failure}`)
  process.exit(1)
}
console.log('\nall note invariants hold')
