/**
 * The vault — notes as a product, not as files that happen to end in .md.
 *
 * M2 has to answer four questions well, and each of them has a failure mode
 * that looks fine in a demo and is wrong on a real vault:
 *
 *   1. WHAT DOES THIS NOTE SAY?  Content comes from the file, not from a copy
 *      in the database, because a copy is a second truth. The version hash is
 *      what makes that safe: it is the same hash the index computed, so a
 *      caller can tell whether the note it just read is the note the graph
 *      knows about.
 *
 *   2. WHAT DOES IT LINK TO, AND WHO LINKS BACK?  Links carry the alias and the
 *      section, and the resolution status is reported rather than hidden: a
 *      link to a note that does not exist is information, not an error.
 *
 *   3. WHICH NOTES ARE GATES THAT ARE STILL OPEN?  Property queries run on
 *      normalised values, in the vault's own language (`typ=gate UND
 *      stand=offen`), and return the evidence of which value matched.
 *
 *   4. CAN TWO AGENTS EDIT AT ONCE?  No — and the second one is told why.
 *      Writes are optimistic: the caller sends the version it read, and a file
 *      that changed underneath is refused with both versions named. A write
 *      that succeeds refreshes its own file in the index, so the very next
 *      query sees the new text instead of waiting for a full pass.
 */
import type { DatabaseSync } from 'node:sqlite'
import * as access from '../access.ts'
import { refreshFile } from '../indexer/index.ts'
import { hashOf, insideNoteRoot } from '../indexer/scan.ts'
import {
  conditionsOf, loadFacts, matches, parseQuery, QueryError, renderQuery, type Predicate,
} from './query.ts'
import { lineOf, searchNotes, type NoteHit, type NoteSearchResult } from './search.ts'

/** A write was refused because the note changed after it was read. */
export class NoteConflictError extends Error {
  readonly detail: {
    path: string
    expected: string
    actual: string
    bytes: number
    mtime: string
    indexedHash: string | null
    indexStale: boolean
  }

  constructor(detail: NoteConflictError['detail']) {
    super(
      `note conflict on '${detail.path}': the file is ${detail.actual} but the edit expected ` +
      `${detail.expected} — it changed ${detail.indexStale ? 'externally and is not yet indexed' : 'on disk'}`)
    this.detail = detail
    this.name = 'NoteConflictError'
  }
}

/** A write aimed at a path that is not part of the note scope. */
export class NoteScopeError extends Error {
  readonly path: string

  constructor(path: string) {
    super(
      `'${path}' is outside the note scope — it would be written into a folder the ` +
      'indexer does not walk (or a dot-folder inside one), so it could never be read back')
    this.path = path
    this.name = 'NoteScopeError'
  }
}

/**
 * A note that declares itself machine-generated, refused by default.
 *
 * The tracker in this workspace regenerates a large part of the vault on every
 * run and prints that fact into the note. Accepting an edit to one of those is
 * accepting work that will be deleted without warning, so the refusal is the
 * default and the override is explicit.
 */
export class NoteGeneratedError extends Error {
  readonly path: string

  constructor(path: string) {
    super(
      `note '${path}' is machine-generated (its own header says so) — an edit would be ` +
      'overwritten by the next tracker run; pass allowGenerated to write anyway')
    this.name = 'NoteGeneratedError'
  }
}

/**
 * Prose search plus the line of the first match.
 *
 * The search itself answers "which notes talk about this"; the line is what
 * makes the answer clickable. It costs one read per returned hit, which is why
 * it is opt-in and capped: a caller that only wants to know WHICH notes matched
 * should not pay for opening them.
 */
export function searchNotesWithLines(
  db: DatabaseSync, workspaceId: string, agentId: string, query: string,
  options: { limit?: number; lines?: boolean } = {},
): NoteSearchResult {
  const result = searchNotes(db, workspaceId, query, { ...(options.limit === undefined ? {} : { limit: options.limit }) })
  if (options.lines !== true) return result
  const hits: NoteHit[] = result.hits.map(hit => {
    try {
      const content = access.readFile(db, workspaceId, agentId, hit.path).content
      return { ...hit, line: lineOf(content, query) }
    } catch {
      // A note the search knows and the disk no longer has is not a reason to
      // fail the whole search; the hit simply has no line.
      return hit
    }
  })
  return { ...result, hits }
}

export interface NotePropertyView { key: string; value: string; raw: string; isLink: boolean; line: number }
export interface NoteLinkView {
  target: string
  alias: string | null
  section: string | null
  embed: boolean
  source: string
  line: number
  status: string
  /** Resolved planet-relative path, or null when it points nowhere. */
  path: string | null
}
export interface BacklinkView {
  path: string
  title: string
  alias: string | null
  section: string | null
  line: number
}

export interface NoteView {
  workspace: string
  path: string
  title: string
  content: string
  bytes: number
  /** Version of the content on disk right now. Send it back to write safely. */
  hash: string
  mtime: string
  properties: NotePropertyView[]
  tags: string[]
  /** Which tags came from the frontmatter and which from the prose. */
  tagSources: Array<{ tag: string; source: string }>
  links: NoteLinkView[]
  backlinks: BacklinkView[]
  generated: boolean
  /** The disk no longer matches the index — a reindex is due for this note. */
  indexStale: boolean
  indexed: { hash: string | null; generation: number; loc: number; indexedAt: string | null } | null
}

const titleOf = (path: string): string => (path.split('/').pop() ?? path).replace(/\.md$/i, '')

function indexedRow(db: DatabaseSync, workspaceId: string, relPath: string): {
  id: number; hash: string | null; loc: number; mtime: string; indexedAt: string | null
} | undefined {
  return db.prepare(
    `SELECT id, hash, loc, mtime, indexed_at AS indexedAt FROM files
      WHERE workspace_id = ? AND path = ?`)
    .get(workspaceId, relPath) as
    { id: number; hash: string | null; loc: number; mtime: string; indexedAt: string | null } | undefined
}

const generationOf = (db: DatabaseSync, workspaceId: string): number =>
  Number((db.prepare('SELECT generation FROM workspace_index_state WHERE workspace_id = ?')
    .get(workspaceId) as { generation: number } | undefined)?.generation ?? 0)

/** Who links TO this note, and how they wrote it. */
export function backlinksOf(db: DatabaseSync, workspaceId: string, relPath: string): BacklinkView[] {
  const row = indexedRow(db, workspaceId, relPath)
  if (row === undefined) return []
  return (db.prepare(
    `SELECT f.path AS path, l.alias AS alias, l.section AS section, l.line AS line
       FROM note_links l JOIN files f ON f.id = l.file_id
      WHERE l.workspace_id = ? AND l.dst_file = ? AND l.file_id <> ?
      ORDER BY f.path, l.line`).all(workspaceId, row.id, row.id) as unknown as
    Array<{ path: string; alias: string | null; section: string | null; line: number }>)
    .map(backlink => ({ ...backlink, title: titleOf(backlink.path) }))
}

/**
 * Read one note.
 *
 * The content comes through the access layer, which is the only sanctioned way
 * to touch a workspace: it enforces containment and records the read, so a
 * human opening a note is as visible in the provenance as an agent editing one.
 */
export function readNote(
  db: DatabaseSync, workspaceId: string, agentId: string, relPath: string,
): NoteView {
  const rel = relPath.split('\\').join('/')
  const file = access.readFile(db, workspaceId, agentId, rel)
  const hash = hashOf(file.content)
  const indexed = indexedRow(db, workspaceId, rel)

  const properties = (db.prepare(
    `SELECT key, value, raw, is_link AS isLink, line FROM note_properties
      WHERE workspace_id = ? AND file_id = ? ORDER BY ordinal`).all(workspaceId, indexed?.id ?? -1) as
    unknown as Array<{ key: string; value: string; raw: string; isLink: number; line: number }>)
    .map(row => ({ ...row, isLink: row.isLink === 1 }))

  const links = (db.prepare(
    `SELECT l.target, l.alias, l.section, l.embed, l.source, l.line, l.status, d.path AS dstPath
       FROM note_links l LEFT JOIN files d ON d.id = l.dst_file
      WHERE l.workspace_id = ? AND l.file_id = ? ORDER BY l.line, l.id`).all(workspaceId, indexed?.id ?? -1) as
    unknown as Array<{
      target: string; alias: string | null; section: string | null; embed: number
      source: string; line: number; status: string; dstPath: string | null
    }>).map(row => ({
      target: row.target, alias: row.alias, section: row.section,
      embed: row.embed === 1, source: row.source, line: row.line,
      status: row.status, path: row.dstPath,
    }))

  // Tags come from their own table, which holds BOTH the frontmatter list and
  // the `#tags` written in the prose. Reading them back out of the `tags`
  // property would report only half of what a note is tagged with.
  const tagRows = db.prepare(
    `SELECT tag, source FROM note_tags WHERE workspace_id = ? AND file_id = ? ORDER BY tag`)
    .all(workspaceId, indexed?.id ?? -1) as unknown as Array<{ tag: string; source: string }>
  const tags = tagRows.map(row => row.tag)

  return {
    workspace: workspaceId,
    path: rel,
    title: /^#\s+(.+)$/m.exec(file.content)?.[1]?.trim() ?? titleOf(rel),
    content: file.content,
    bytes: file.bytes,
    hash,
    tagSources: tagRows.map(row => ({ tag: row.tag, source: row.source })),
    // The mtime the INDEX holds. The disk's own mtime is not reported here on
    // purpose: `indexStale` is the honest answer to "has this changed", and a
    // raw filesystem timestamp invites comparing it against the wrong clock.
    mtime: indexed?.mtime ?? '',
    properties,
    tags,
    links,
    backlinks: backlinksOf(db, workspaceId, rel),
    generated: /%%\s*Automatisch erzeugt von/i.test(file.content),
    indexStale: indexed === undefined || indexed.hash !== hash,
    indexed: indexed === undefined ? null : {
      hash: indexed.hash, generation: generationOf(db, workspaceId),
      loc: indexed.loc, indexedAt: indexed.indexedAt,
    },
  }
}

export interface NoteWriteResult {
  path: string
  hash: string
  bytes: number
  created: boolean
  agent: string
  /** False when the note is not part of the index, so nothing was refreshed. */
  indexed: boolean
}

/**
 * Save a note, refusing to overwrite a version the caller did not see.
 *
 * `expectedHash` is the version returned by `readNote`. Omitting it means "write
 * whatever is there now", which is a deliberate choice a caller has to make
 * explicitly rather than a default that quietly loses someone's edit.
 */
export function writeNote(
  db: DatabaseSync, workspaceId: string, agentId: string, relPath: string, content: string,
  options: { expectedHash?: string; taskId?: string; allowGenerated?: boolean; createOnly?: boolean } = {},
): NoteWriteResult {
  const rel = relPath.split('\\').join('/')
  // Refuse a path the walker would never index BEFORE touching the disk. The
  // HTTP route checks this too; doing it here as well means the CLI and any
  // future caller cannot create an invisible file by forgetting to ask.
  if (!isNotePath(db, workspaceId, rel)) {
    throw new NoteScopeError(rel)
  }
  const indexed = indexedRow(db, workspaceId, rel)

  // Read the CURRENT bytes before writing. The index's hash is not enough: a
  // file edited a second ago is exactly the case this guard exists for.
  let current: string | null = null
  try { current = access.readFile(db, workspaceId, agentId, rel).content } catch { current = null }
  const actual = current === null ? null : hashOf(current)

  if (actual !== null) {
    // Creation gets its own optimistic fence.  A client must never turn a
    // friendly default name into an implicit overwrite simply because it had
    // not read a file at that path yet.
    if (options.createOnly === true) {
      throw new NoteConflictError({
        path: rel,
        expected: 'missing',
        actual,
        bytes: Buffer.byteLength(current ?? '', 'utf8'),
        mtime: indexed?.mtime ?? '',
        indexedHash: indexed?.hash ?? null,
        indexStale: indexed !== undefined && indexed.hash !== actual,
      })
    }
    if (/%%\s*Automatisch erzeugt von/i.test(current ?? '') && options.allowGenerated !== true) {
      throw new NoteGeneratedError(rel)
    }
    if (options.expectedHash !== undefined && options.expectedHash !== actual) {
      throw new NoteConflictError({
        path: rel,
        expected: options.expectedHash,
        actual,
        bytes: Buffer.byteLength(current ?? '', 'utf8'),
        mtime: indexed?.mtime ?? '',
        indexedHash: indexed?.hash ?? null,
        indexStale: indexed !== undefined && indexed.hash !== actual,
      })
    }
  } else if (options.expectedHash !== undefined) {
    // The caller thinks the note exists and it does not: that is a conflict too,
    // not a licence to create it.
    throw new NoteConflictError({
      path: rel,
      expected: options.expectedHash,
      actual: 'missing',
      bytes: 0,
      mtime: '',
      indexedHash: indexed?.hash ?? null,
      indexStale: indexed !== undefined,
    })
  }

  const written = access.writeFile(
    db, workspaceId, agentId, rel, content, options.taskId ?? `task-note-${agentId}`)

  // Publish immediately: a save whose result is invisible until the next full
  // pass is a save the next reader cannot trust.
  const refreshed = refreshFile(db, workspaceId, rel)

  return {
    path: rel,
    hash: hashOf(content),
    bytes: written.bytes,
    created: written.created,
    agent: written.agent.id,
    indexed: refreshed,
  }
}

export interface NoteListView {
  /** The file id, so a caller can follow up without re-resolving the path. */
  id: number
  path: string
  title: string
  typ: string | null
  stand: string | null
  tags: string[]
  /** How many notes this one links to, and how many link here. */
  outLinks: number
  inLinks: number
  /** The property values that make this note a match, for the explanation. */
  matched: string[]
}

/** The stored property values of one note, as a plain map. */
function propertiesOf(db: DatabaseSync, workspaceId: string, fileId: number):
Map<string, string[]> {
  const rows = db.prepare(
    'SELECT key, value FROM note_properties WHERE workspace_id = ? AND file_id = ? ORDER BY ordinal')
    .all(workspaceId, fileId) as unknown as Array<{ key: string; value: string }>
  const map = new Map<string, string[]>()
  for (const row of rows) {
    const key = row.key.toLowerCase()
    const list = map.get(key)
    if (list === undefined) map.set(key, [row.value])
    else list.push(row.value)
  }
  return map
}

/**
 * The SQL predicate that identifies a workspace's notes, and its parameters.
 *
 * In a PLANET the indexer has already answered this question: every file the
 * walker attributed to no checkout came from a note root, so "no checkout" IS
 * the note scope, and that is the one definition all three readers share.
 *
 * A plain workspace has no such split — it existed before note roots did — and
 * there every markdown file is the vault. Without the second clause, `plugbrain
 * notes list` on such a workspace would present every .ts file as a note, which
 * is precisely the confusion this milestone exists to remove.
 */
function noteScope(workspaceId: string): { sql: string; params: unknown[] } {
  return {
    sql: `workspace_id = ? AND checkout_id IS NULL AND (EXISTS (
            SELECT 1 FROM planets p WHERE p.workspace_id = files.workspace_id
          ) OR lower(path) LIKE '%.md')`,
    params: [workspaceId],
  }
}

/**
 * Is this path inside the note scope?
 *
 * Uses the SAME rule as the walker (`insideNoteRoot`), including its refusal of
 * dot-folders at any depth: a guard that accepted `Master/.trash/x.md` would
 * happily write a note the indexer never walks, so the file would exist, be
 * invisible, and look like a bug in search later.
 *
 * A workspace with no note roots at all has no separate note scope — there,
 * the whole workspace is the vault, which is the behaviour that predates the
 * planet and is what a plain `plugbrain register` still gets.
 */
export function isNotePath(db: DatabaseSync, workspaceId: string, relPath: string): boolean {
  const rel = relPath.split('\\').join('/')
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (!planet) return true
  const roots = db.prepare(
    'SELECT rel_path AS relPath, kind FROM note_roots WHERE planet_id = ? ORDER BY rel_path')
    .all(planet.id) as unknown as Array<{ relPath: string; kind: string }>
  if (roots.length === 0) return true
  return roots.some(root => root.kind === 'file'
    ? rel.toLowerCase() === root.relPath.toLowerCase()
    : insideNoteRoot(root.relPath, rel))
}

/** Every note of the planet, with the properties a reader browses by. */
export function listNotes(
  db: DatabaseSync, workspaceId: string, options: { limit?: number; offset?: number } = {},
): { total: number; returned: number; notes: NoteListView[] } {
  const limit = Math.max(1, Math.min(options.limit ?? 200, 5000))
  const offset = Math.max(0, options.offset ?? 0)
  const scope = noteScope(workspaceId)
  const rows = db.prepare(
    `SELECT id, path FROM files WHERE ${scope.sql} ORDER BY path`)
    .all(...(scope.params as string[])) as unknown as Array<{ id: number; path: string }>
  const outLinks = new Map<number, number>()
  for (const row of db.prepare(
    'SELECT file_id AS id, COUNT(*) AS n FROM note_links WHERE workspace_id = ? GROUP BY file_id')
    .all(workspaceId) as unknown as Array<{ id: number; n: number }>) {
    outLinks.set(row.id, Number(row.n))
  }
  const inLinks = new Map<number, number>()
  for (const row of db.prepare(
    `SELECT dst_file AS id, COUNT(*) AS n FROM note_links
      WHERE workspace_id = ? AND dst_file IS NOT NULL GROUP BY dst_file`)
    .all(workspaceId) as unknown as Array<{ id: number; n: number }>) {
    inLinks.set(row.id, Number(row.n))
  }
  const notes: NoteListView[] = rows.slice(offset, offset + limit).map(row => {
    const properties = propertiesOf(db, workspaceId, row.id)
    return {
      id: row.id,
      path: row.path,
      title: titleOf(row.path),
      typ: (properties.get('typ') ?? [])[0] ?? null,
      stand: (properties.get('stand') ?? [])[0] ?? null,
      // `note_tags` is the canonical union of frontmatter and prose tags.
      // Listing from the frontmatter property alone made inline #tags vanish
      // from filters even though a read of the same note showed them.
      tags: (db.prepare(
        'SELECT tag FROM note_tags WHERE workspace_id = ? AND file_id = ? ORDER BY tag')
        .all(workspaceId, row.id) as unknown as Array<{ tag: string }>).map(tag => tag.tag),
      outLinks: outLinks.get(row.id) ?? 0,
      inLinks: inLinks.get(row.id) ?? 0,
      matched: [],
    }
  })
  return { total: rows.length, returned: notes.length, notes }
}

export interface NoteQueryResult {
  query: string
  parsed: string
  total: number
  returned: number
  truncated: boolean
  notes: NoteListView[]
}

/**
 * Run a property query over the notes of a planet.
 *
 * Scope is the note scope by definition: a property query is a question about
 * written knowledge, and sweeping 100 000 source files in would answer a
 * different question than the one asked.
 */
export function queryNotes(
  db: DatabaseSync, workspaceId: string, text: string, options: { limit?: number } = {},
): NoteQueryResult {
  const predicate: Predicate = parseQuery(text)
  const limit = Math.max(1, Math.min(options.limit ?? 200, 5000))
  const facts = loadFacts(db, workspaceId)
  const noteScopeSql = noteScope(workspaceId)
  const scope = db.prepare(
    `SELECT id, path FROM files WHERE ${noteScopeSql.sql} ORDER BY path`)
    .all(...(noteScopeSql.params as string[])) as unknown as Array<{ id: number; path: string }>

  const degree = db.prepare(
    `SELECT file_id AS id, COUNT(*) AS out_ FROM note_links WHERE workspace_id = ? GROUP BY file_id`)
    .all(workspaceId) as unknown as Array<{ id: number; out_: number }>
  const outBy = new Map(degree.map(row => [row.id, Number(row.out_)]))
  const inRows = db.prepare(
    `SELECT dst_file AS id, COUNT(*) AS in_ FROM note_links
      WHERE workspace_id = ? AND dst_file IS NOT NULL GROUP BY dst_file`).all(workspaceId) as
    unknown as Array<{ id: number; in_: number }>
  const inBy = new Map(inRows.map(row => [row.id, Number(row.in_)]))

  // The conditions that actually decided the answer, evaluated one by one. A
  // result that cannot say WHY it matched cannot be checked by a human, and
  // "which of my filters caught this row" is the first question asked of one.
  const deciding = conditionsOf(predicate)
  const matchedNotes: NoteListView[] = []
  for (const file of scope) {
    const own = facts.get(file.id)
    if (own === undefined) continue
    if (!matches(own, predicate)) continue
    const properties = propertiesOf(db, workspaceId, file.id)
    const hit: string[] = []
    for (const condition of deciding) {
      if (!matches(own, { type: 'condition', condition })) continue
      const values = own.properties.get(condition.key) ?? []
      hit.push(condition.op === 'exists' ? condition.key : `${condition.key}=${values.join('|')}`)
    }
    matchedNotes.push({
      id: file.id,
      path: file.path,
      title: titleOf(file.path),
      typ: (properties.get('typ') ?? [])[0] ?? null,
      stand: (properties.get('stand') ?? [])[0] ?? null,
      tags: (db.prepare(
        'SELECT tag FROM note_tags WHERE workspace_id = ? AND file_id = ? ORDER BY tag')
        .all(workspaceId, file.id) as unknown as Array<{ tag: string }>).map(tag => tag.tag),
      outLinks: outBy.get(file.id) ?? 0,
      inLinks: inBy.get(file.id) ?? 0,
      matched: hit,
    })
  }

  return {
    query: text,
    parsed: renderQuery(predicate),
    total: matchedNotes.length,
    returned: Math.min(matchedNotes.length, limit),
    truncated: matchedNotes.length > limit,
    notes: matchedNotes.slice(0, limit),
  }
}

export interface NoteGraphGroup { name: string; hue: number; color: string; count: number }
export interface NoteGraphNode {
  id: string
  path: string
  title: string
  group: string
  properties: { typ: string | null; stand: string | null; tags: string[] }
  outLinks: number
  inLinks: number
  /** Distance from the focus note; 0 is the focus itself. */
  depth: number
  focus: boolean
}
export interface NoteGraphEdge {
  source: string
  target: string
  kind: 'references'
  count: number
  /** 1 for a link from the focus note, 2 for a link into it. */
  direction: number
}

export interface NoteGraph {
  nodes: NoteGraphNode[]
  edges: NoteGraphEdge[]
  groups: NoteGraphGroup[]
  focus: string | null
  depth: number
  coverage: {
    notesInScope: number
    selected: number
    truncated: boolean
    filter: string | null
    /**
     * True when the focus note was found. A focus that names nothing yields an
     * EMPTY graph with this flag false, never the whole vault: a caller that
     * mistypes a path must not be handed 400 notes that look like a successful
     * focus, because then the mistake is invisible.
     */
    focusFound: boolean
  }
}

/**
 * A stable colour per note type.
 *
 * Derived from the name, not assigned round-robin: the same `gate` is the same
 * colour in every rendering and after every restart, which is what makes a
 * legend something a reader can remember.
 */
export function groupColor(name: string): { hue: number; color: string } {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) % 360
  const hue = hash
  return { hue, color: `hsl(${hue} 68% 55%)` }
}

/** The note graph: nodes coloured by type, filtered, optionally focused. */
export function noteGraph(
  db: DatabaseSync, workspaceId: string,
  options: { focus?: string | null; depth?: number; filter?: string | null; limit?: number } = {},
): NoteGraph {
  const limit = Math.max(1, Math.min(options.limit ?? 600, 5000))
  const depth = Math.max(0, Math.min(options.depth ?? 1, 6))

  const allowed: Set<number> | null = ((): Set<number> | null => {
    if (!options.filter) return null
    return new Set(queryNotes(db, workspaceId, options.filter, { limit: 5000 })
      .notes.map(note => note.id))
  })()

  const graphScope = noteScope(workspaceId)
  const scope = db.prepare(
    `SELECT id, path FROM files WHERE ${graphScope.sql} ORDER BY path`)
    .all(...(graphScope.params as string[])) as unknown as Array<{ id: number; path: string }>
  const idByPath = new Map(scope.map(row => [row.path, row.id]))
  const pathById = new Map(scope.map(row => [row.id, row.path]))

  // Undirected adjacency over resolved links, so focus can walk both ways.
  const links = db.prepare(
    `SELECT file_id AS src, dst_file AS dst FROM note_links
      WHERE workspace_id = ? AND dst_file IS NOT NULL`).all(workspaceId) as
    unknown as Array<{ src: number; dst: number }>
  const adjacency = new Map<number, Set<number>>()
  const degrees = new Map<number, { out_: number; in_: number }>()
  for (const link of links) {
    const bump = (id: number, key: 'out_' | 'in_'): void => {
      const entry = degrees.get(id) ?? { out_: 0, in_: 0 }
      entry[key] += 1
      degrees.set(id, entry)
    }
    bump(link.src, 'out_')
    if (link.dst !== link.src) bump(link.dst, 'in_')
    const list = adjacency.get(link.src) ?? new Set<number>()
    list.add(link.dst)
    adjacency.set(link.src, list)
    const back = adjacency.get(link.dst) ?? new Set<number>()
    back.add(link.src)
    adjacency.set(link.dst, back)
  }

  // Focus: breadth-first from the named note over the undirected graph. A named
  // focus that does not exist cuts the result to nothing, it does not fall back
  // to "no focus at all".
  const focusWanted = options.focus !== undefined && options.focus !== null
  const focusId = focusWanted ? idByPath.get(String(options.focus).split('\\').join('/')) ?? null : null
  let distance: Map<number, number> | null = null
  if (focusWanted && focusId === null) distance = new Map()
  if (focusId !== null && focusId !== undefined) {
    distance = new Map([[focusId, 0]])
    let frontier = [focusId]
    for (let step = 0; step < depth; step += 1) {
      const next: number[] = []
      for (const id of frontier) {
        for (const neighbour of adjacency.get(id) ?? []) {
          if (distance.has(neighbour)) continue
          distance.set(neighbour, step + 1)
          next.push(neighbour)
        }
      }
      frontier = next
      if (frontier.length === 0) break
    }
  }

  const selected: NoteGraphNode[] = []
  for (const file of scope) {
    if (allowed !== null && !allowed.has(file.id)) continue
    if (distance !== null && !distance.has(file.id)) continue
    const properties = propertiesOf(db, workspaceId, file.id)
    const typ = (properties.get('typ') ?? [])[0] ?? 'untyped'
    const degree = degrees.get(file.id) ?? { out_: 0, in_: 0 }
    selected.push({
      id: `note:${file.id}`,
      path: file.path,
      title: titleOf(file.path),
      group: typ,
      properties: {
        typ: (properties.get('typ') ?? [])[0] ?? null,
        stand: (properties.get('stand') ?? [])[0] ?? null,
        tags: properties.get('tags') ?? [],
      },
      outLinks: degree.out_,
      inLinks: degree.in_,
      depth: distance?.get(file.id) ?? -1,
      focus: focusId === file.id,
    })
  }

  const truncated = selected.length > limit
  const nodes = selected.slice(0, limit)
  const kept = new Set(nodes.map(node => node.id))
  const edges: NoteGraphEdge[] = []
  const seen = new Set<string>()
  for (const link of links) {
    if (!pathById.has(link.src) || !pathById.has(link.dst)) continue
    const source = `note:${link.src}`
    const target = `note:${link.dst}`
    if (!kept.has(source) || !kept.has(target)) continue
    const key = `${source}|>${target}`
    if (seen.has(key)) continue
    seen.add(key)
    edges.push({
      source, target, kind: 'references', count: 1,
      direction: focusId === null || focusId === undefined ? 0
        : link.src === focusId ? 1 : link.dst === focusId ? 2 : 0,
    })
  }

  const groupCounts = new Map<string, number>()
  for (const node of nodes) groupCounts.set(node.group, (groupCounts.get(node.group) ?? 0) + 1)
  const groups: NoteGraphGroup[] = [...groupCounts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count, ...groupColor(name) }))

  return {
    nodes,
    edges,
    groups,
    focus: options.focus ?? null,
    depth,
    coverage: {
      notesInScope: scope.length,
      selected: nodes.length,
      truncated,
      filter: options.filter ?? null,
      focusFound: !focusWanted || focusId !== null,
    },
  }
}

export { QueryError }
