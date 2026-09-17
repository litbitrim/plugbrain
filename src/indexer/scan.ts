/**
 * Workspace indexing: keep the stored graph equal to what is on disk, doing
 * only the work the disk actually changed.
 *
 * Three properties matter more than raw speed here, because each of them was
 * a real defect before:
 *
 *   1. ATTRIBUTION SURVIVES.  `file_owner` hangs off `files(id)` with a
 *      cascade, so the old "delete every row, insert them again" rebuild
 *      destroyed ownership on every successful index. Unchanged and modified
 *      files now keep their row id, renames move the row instead of replacing
 *      it, and any row that genuinely has to be recreated has its owner
 *      restored from `path_owner` inside the same transaction.
 *
 *   2. BUILD AND PUBLISH ARE SEPARATE.  Everything happens inside one
 *      BEGIN IMMEDIATE ... COMMIT. Under WAL a reader that arrives mid-build
 *      keeps seeing the previous COMPLETE generation, and a failure rolls the
 *      whole thing back, so the active index is never partially updated.
 *      The generation counter is incremented by the same commit, which is why
 *      a generation number always names a graph that was finished.
 *
 *   3. RESOLUTION IS SCOPED.  A name is resolved against the file that used
 *      it, the imports that file declares, and - only when that is
 *      unambiguous - the workspace. Two modules that both export `run` produce
 *      an AMBIGUOUS edge, not a coin flip. The previous resolver took
 *      `list[0]`, which manufactured confident edges pointing at the wrong
 *      module.
 *
 * Parse output is persisted (`file_refs`, `file_imports`) so re-resolving a
 * file costs a query rather than a re-parse. That split is what makes editing
 * one file cost one parse instead of a whole workspace.
 */
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, posix, relative } from 'node:path'
import { extractFromSource, languageOf } from './ast.ts'
import { extractFromMarkdown } from './markdown.ts'

/**
 * Directories that are never part of a planet's source, at ANY depth.
 *
 * The list is the mandated exclusion set plus tool debris, and it is
 * deliberately not "every dot-folder". Measured on the real planet, a blanket
 * dot-rule hid 19 169 files of genuine content — `.agents/notes/**`, the
 * written reasoning of every agent that worked here — while the same rule left
 * `lib/` (real source in PlugMil-Web and PlugBoard) subject to a name that
 * means "build output" in exactly one repository layout.
 *
 *   node_modules .git .pnpm        dependency and version-control trees
 *   dist ui-dist .output coverage  build output that masquerades as source: a
 *                                  minified bundle matches every search term
 *   .cache .next .turbo .nuxt
 *   .svelte-kit                    framework and tool caches
 *   .venv venv target __pycache__  language environments, not code
 *   .codegraph                     a second brain's store
 *
 * `.plugbrain*` is handled by prefix (see `isNeverIndexedDir`): brain data
 * belongs in PLUGBRAIN_HOME and never inside a repository.
 */
export const NEVER_INDEX_DIRS: ReadonlySet<string> = new Set([
  'node_modules', '.git', '.pnpm',
  'dist', 'ui-dist', '.output', 'coverage',
  '.cache', '.next', '.turbo', '.nuxt', '.svelte-kit',
  '.venv', 'venv', 'target', '__pycache__',
  '.codegraph',
])

/**
 * Output folders that are only output at a CHECKOUT ROOT.
 *
 * `build/` at the root of an Electron app is its packaging resources; the same
 * name three levels down is a source folder. Checking the depth is what lets
 * one rule cover both without lying about either. `lib` is deliberately NOT
 * here any more: PlugMil-Web keeps real TypeScript in a root `lib/`.
 */
export const ROOT_OUTPUT_DIRS: ReadonlySet<string> = new Set(['build', 'out', 'release'])

/** True for a directory that is never indexed, whatever its depth. */
export const isNeverIndexedDir = (name: string): boolean =>
  NEVER_INDEX_DIRS.has(name) || name.startsWith('.plugbrain')

/** True for a directory the indexer refuses to descend into. */
export const isSkippedDir = (name: string, depth: number): boolean =>
  isNeverIndexedDir(name) || (depth === 1 && ROOT_OUTPUT_DIRS.has(name))

/** Extensions we record as files even when we cannot parse them. */
export const TEXTUAL: ReadonlySet<string> = new Set([
  '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.md', '.yml', '.yaml', '.css', '.html', '.py', '.rs', '.go', '.sql', '.sh',
])

export const MAX_BYTES = 2_000_000   // a 2 MB source file is generated; parsing it helps nobody

/**
 * File names that are secrets and are NEVER indexed, whatever they contain.
 *
 * The rule is by NAME, not by content: a private key is a private key even
 * when it is two lines long, and `node_modules` is not the only place people
 * park one. An allow-list of "safe" extensions would be the wrong shape here —
 * `.json` is both `package.json` and `service-account.json`.
 *
 * Each entry earns its place: `.env*` (all dotenv variants), `.netrc`/
 * `.pgpass`/`.npmrc`/`.htpasswd` (stored credentials), `id_rsa` family (SSH
 * keys; the `.pub` half is public but has no business in a code index),
 * `credentials.*` (blocked only in its credential SHAPES, so `credentials.ts`
 * — real source — still indexes), service-account JSON, and the key/cert
 * container extensions.
 */
const SECRET_NAME = /^(?:\.env(?:\..+)?|\.netrc|\.pgpass|\.npmrc|\.htpasswd|id_(?:rsa|dsa|ecdsa|ed25519)(?:\.pub)?|credentials(?:\.(?:json|ya?ml|ini|toml|txt))?|service[_-]?account(?:\.[\w-]+)?\.json|.*\.(?:pem|key|pfx|p12|jks|keystore|ppk|kdbx|crt|cer|asc|gpg))$/i

/** True for a path whose file name is a credential or a key. */
export const isSecretPath = (rel: string): boolean =>
  SECRET_NAME.test(rel.split('/').pop() ?? rel)

/**
 * One root of a planet's index: a folder to walk, the planet-relative prefix
 * its files are stored under, and the repository/checkout they belong to.
 *
 * A plain workspace has exactly one root with an empty prefix, which is why
 * this is a superset of the old single-folder walk rather than a second code
 * path: the same walker, the same hashing, the same generation.
 */
export interface IndexRoot {
  abs: string
  /** Planet-relative prefix, forward slashes, no trailing slash. '' for a bare workspace. */
  prefix: string
  /**
   * `checkout` is a repository, `notes` is a written-knowledge folder and
   * `file` is a single note registered on its own. The kind changes ONE rule:
   * a notes root skips every dot-folder, because the note scope is defined as
   * "these folders, without the dot-folders inside them" — while a checkout
   * indexes `.agents` and `.github`, which are genuine content there.
   */
  kind: 'checkout' | 'notes' | 'file' | 'root'
  repoId: string | null
  checkoutId: string | null
}

export interface ChangeCounts {
  added: number
  modified: number
  renamed: number
  deleted: number
  unchanged: number
}

export interface IndexResult {
  /** Files seen on disk this pass, before any of them were classified. */
  scanned: number
  files: number
  parsed: number
  symbols: number
  edges: number
  unresolved: number
  /** Edges with several plausible targets. Counted separately from unresolved. */
  ambiguous: number
  skipped: number
  ms: number
  /** The completed generation a reader may now see. */
  generation: number
  /** `unchanged` means nothing on disk moved and no work was done. */
  mode: 'full' | 'incremental' | 'unchanged'
  changed: ChangeCounts
  /** Files actually re-parsed this run. */
  reparsed: number
  /** Files whose edges were recomputed without re-parsing. */
  reresolved: number
}

export interface WalkedFile {
  abs: string
  /** Workspace/planet-relative, forward slashes. */
  rel: string
  ext: string
  size: number
  mtime: string
  repoId: string | null
  checkoutId: string | null
}

/** Which checkout a file belongs to, for rename matching and attribution. */
const groupKey = (item: { repoId: string | null; checkoutId: string | null }): string =>
  `${item.repoId ?? ''}\u0000${item.checkoutId ?? ''}`

/**
 * Depth-first walk of ONE root, mapping every file to its planet-relative path.
 *
 * Three exclusions are enforced here rather than later, because a file that is
 * never walked is a file that can never be indexed by accident:
 *   - directories that are never source, by name and depth (isSkippedDir),
 *   - any file name that is a credential or a key (see SECRET_NAME),
 *   - a symlink or junction at all: a checkout linked to a folder outside the
 *     planet is not a way into that folder.
 * Everything else IS indexed, including dot-folders like `.agents` and
 * `.github` — they are written content, not noise.
 */
/** Shared by the directory walk and the single-file root: is this file in? */
function acceptFile(root: IndexRoot, abs: string, rel: string, found: WalkedFile[]): void {
  const name = rel.split('/').pop() ?? rel
  const ext = extname(name)
  if (!TEXTUAL.has(ext.toLowerCase())) return
  if (isSecretPath(rel)) return
  let st: ReturnType<typeof statSync>
  try { st = statSync(abs) } catch { return }
  if (!st.isFile() || st.size > MAX_BYTES) return
  found.push({
    abs, rel, ext, size: st.size, mtime: st.mtime.toISOString(),
    repoId: root.repoId, checkoutId: root.checkoutId,
  })
}

function walkInto(root: IndexRoot, found: WalkedFile[]): void {
  // A note registered on its own (`00 Übersicht.md`) has no directory to walk.
  if (root.kind === 'file') {
    acceptFile(root, root.abs, root.prefix, found)
    return
  }
  const stack: Array<{ dir: string; depth: number }> = [{ dir: root.abs, depth: 0 }]
  while (stack.length > 0) {
    const { dir, depth } = stack.pop() as { dir: string; depth: number }
    let entries: ReturnType<typeof readdirSync>
    try { entries = readdirSync(dir, { withFileTypes: true }) } catch { continue }
    for (const entry of entries) {
      const abs = join(dir, entry.name)
      if (entry.isSymbolicLink()) continue          // junction or symlink out
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.') && root.kind === 'notes') continue
        if (isSkippedDir(entry.name, depth + 1)) continue
        stack.push({ dir: abs, depth: depth + 1 })
        continue
      }
      if (!entry.isFile()) continue
      const inside = relative(root.abs, abs).split('\\').join('/')
      const rel = root.prefix === '' ? inside : `${root.prefix}/${inside}`
      acceptFile(root, abs, rel, found)
    }
  }
}

/** Depth-first walk of a single folder (a bare, non-planet workspace). */
export function walk(root: string): WalkedFile[] {
  const found: WalkedFile[] = []
  walkInto({ abs: root, prefix: '', kind: 'root', repoId: null, checkoutId: null }, found)
  return found
}

/**
 * Walk several roots into ONE namespace. Files from different checkouts are
 * therefore distinct rows even when their paths inside the checkout are
 * identical, which is what keeps two repos' `run()` symbols apart.
 */
export function walkRoots(roots: IndexRoot[]): WalkedFile[] {
  const found: WalkedFile[] = []
  for (const root of roots) walkInto(root, found)
  return found
}

/** Resolve a relative import specifier to a workspace-relative file path. */
export function resolveImport(fromRel: string, spec: string, known: Set<string>): string | null {
  if (!spec.startsWith('.')) return null            // bare specifier => external package
  const base = posix.normalize(posix.join(posix.dirname(fromRel), spec))
  const candidates = [
    base,
    base + '.ts', base + '.tsx', base + '.js', base + '.jsx', base + '.mts', base + '.cts',
    posix.join(base, 'index.ts'), posix.join(base, 'index.tsx'),
    posix.join(base, 'index.js'), posix.join(base, 'index.jsx'),
    // TS source often imports its own emitted .js
    base.replace(/\.js$/, '.ts'), base.replace(/\.js$/, '.tsx'),
  ]
  for (const candidate of candidates) if (known.has(candidate)) return candidate
  return null
}

export const hashOf = (content: string): string =>
  createHash('sha256').update(content).digest('hex').slice(0, 16)

export interface StoredFile {
  id: number
  path: string
  size: number
  mtime: string
  hash: string | null
  repoId: string | null
  checkoutId: string | null
  /** Extractor version that wrote this row; 0 means "older than the column". */
  parseVersion: number
}

/**
 * The extraction contract this build writes into `files.parse_version`.
 *
 * Bump it whenever the SHAPE of what an extractor stores changes — a new
 * table, a fixed link syntax, an added field. Without the bump an incremental
 * pass skips every file whose bytes are unchanged, which is all of them, and
 * the new extraction stays empty until each file happens to be edited: the
 * index would claim to know something it has never looked at. The cost of a
 * bump is one full re-parse per workspace, which is the honest price of
 * changing what "parsed" means.
 *
 *   1 — symbols, refs, imports, search rows, FTS.
 *   2 — frontmatter properties and note links, and the table-escaped
 *       `[[note\|alias]]` fix that made 336 wiki links resolvable.
 *   3 — tags as their own rows (frontmatter tags and `#tags` in prose), and
 *       note prose in `note_body` for full-text search.
 */
export const PARSE_VERSION = 3

/**
 * Is `rel` inside the note scope that `prefix` owns?
 *
 * The note scope is defined as "these folders, without the dot-folders inside
 * them", so a dot-folder is not note scope at ANY depth. This lives beside the
 * walker because three places have to agree about it — the walk that indexes,
 * the attribution that decides whether a not-yet-indexed path may be refreshed,
 * and the write guard — and the moment they disagree, a write can create a note
 * the indexer will never look at.
 */
export function insideNoteRoot(prefix: string, rel: string): boolean {
  if (rel !== prefix && !rel.startsWith(`${prefix}/`)) return false
  const rest = rel.slice(prefix.length).replace(/^\//, '')
  if (rest === '') return false
  return !rest.split('/').some(segment => segment.startsWith('.'))
}

export interface AddedFile extends WalkedFile {
  hash: string
}

export interface Classified {
  added: AddedFile[]
  /** `reparse === false` means the bytes are identical; only stat fields moved. */
  modified: Array<{ file: WalkedFile; id: number; reparse: boolean; hash: string }>
  renamed: Array<{ file: WalkedFile; id: number; fromPath: string; hash: string }>
  deleted: StoredFile[]
  unchanged: number
  skipped: number
}

/**
 * What changed on disk since the stored generation.
 *
 * `size` + `mtime` equality is treated as unchanged WITHOUT reading the file:
 * that is the whole point of persisting them, and it is what makes a no-op
 * index cost a directory walk instead of a full hash of the workspace.
 * Anything that fails that cheap test is read and hashed, so a file merely
 * touched is still recognised as unchanged by content.
 *
 * Rename matching is scoped to ONE checkout. Nine worktrees of the same repo
 * hold near-identical files, so matching purely on content hash would happily
 * "move" a file out of checkout A and into checkout B — a rename that never
 * happened, reported as one.
 */
export function classify(disk: WalkedFile[], stored: StoredFile[]): Classified {
  const out: Classified = {
    added: [], modified: [], renamed: [], deleted: [],
    unchanged: 0, skipped: 0,
  }
  const storedByPath = new Map(stored.map(row => [row.path, row]))
  const seen = new Set<string>()
  const candidateAdded: Array<{ file: WalkedFile; hash: string }> = []

  for (const file of disk) {
    seen.add(file.rel)
    const row = storedByPath.get(file.rel)
    // A row written by an older extractor is stale even when the bytes are
    // identical, so it fails the cheap test and gets read and parsed again.
    const extractorStale = row !== undefined && row.parseVersion !== PARSE_VERSION
    if (row !== undefined && !extractorStale && row.size === file.size && row.mtime === file.mtime) {
      out.unchanged += 1
      continue
    }
    let content: string
    try { content = readFileSync(file.abs, 'utf8') } catch { out.skipped += 1; continue }
    const hash = hashOf(content)
    if (row === undefined) {
      candidateAdded.push({ file, hash })
      continue
    }
    if (extractorStale) {
      // Byte-identical but extracted by an older version: re-parse.
      out.modified.push({ file, id: row.id, reparse: true, hash })
      continue
    }
    if (row.hash === hash) {
      // Touched but byte-identical: refresh the stat fields, do not re-parse.
      out.unchanged += 1
      out.modified.push({ file, id: row.id, reparse: false, hash })
      continue
    }
    out.modified.push({ file, id: row.id, reparse: true, hash })
  }

  const candidateDeleted = stored.filter(row => !seen.has(row.path))

  // Rename detection: an added path and a deleted path with identical content
  // are the same file. Moving the row keeps its id, and therefore keeps its
  // owner, its activity history and every edge that points at it.
  const pairKey = (hash: string, item: { repoId: string | null; checkoutId: string | null }): string =>
    `${groupKey(item)}\u0000${hash}`
  const deletedByHash = new Map<string, StoredFile[]>()
  for (const row of candidateDeleted) {
    if (row.hash === null) continue
    const key = pairKey(row.hash, row)
    const list = deletedByHash.get(key)
    if (list) list.push(row); else deletedByHash.set(key, [row])
  }
  const consumed = new Set<number>()
  for (const candidate of candidateAdded) {
    const pool = deletedByHash.get(pairKey(candidate.hash, candidate.file))
    const match = pool?.find(row => !consumed.has(row.id))
    if (match !== undefined) {
      consumed.add(match.id)
      out.renamed.push({
        file: candidate.file, id: match.id, fromPath: match.path, hash: candidate.hash,
      })
    } else {
      out.added.push({ ...candidate.file, hash: candidate.hash })
    }
  }
  out.deleted = candidateDeleted.filter(row => !consumed.has(row.id))
  return out
}

/** Per-file parse output, ready to be written to the tables. */
export interface ParsedFile {
  fileId: number
  rel: string
  ext: string
  lang: string | null
  loc: number
  symbols: Array<{ name: string; kind: string; line: number; endLine: number; exported: boolean; container: string | null }>
  refs: Array<{ kind: string; target: string; receiver: string | null; from: string | null; scope: string; line: number }>
  imports: Array<{ specifier: string; local: string | null; imported: string | null; line: number }>
  /** Frontmatter facts. Empty for anything that is not a note. */
  properties: Array<{ key: string; value: string; raw: string; ordinal: number; isLink: boolean; line: number }>
  /** Wiki links with alias/section, body and property links alike. */
  links: Array<{ target: string; alias: string | null; section: string | null; embed: boolean; source: string; line: number }>
  /**
   * Tags, deduplicated, with where each came from. A vault tags a note both
   * ways — a `tags:` list in the frontmatter and `#tag` in the prose — and
   * throwing away which is which loses the ability to say why a note matched a
   * tag filter without re-reading the file.
   */
  tags: Array<{ tag: string; source: 'property' | 'body' }>
  /** The note declares itself machine-generated. */
  generated: boolean
}

/** Parse one file into the shape the tables expect. Never throws. */
export function parseFile(rel: string, ext: string, content: string): Omit<ParsedFile, 'fileId'> {
  const lang = languageOf(ext)
  const isMarkdown = ext.toLowerCase() === '.md'
  if (lang !== null) {
    // A code file has no frontmatter and no wiki links; the md fields stay empty
    // so the writer never has to ask what kind of file it is looking at.
    const extract = extractFromSource(rel, content, ext)
    const imports: ParsedFile['imports'] = []
    for (const imp of extract.imports) {
      if (imp.bindings.length === 0) {
        imports.push({ specifier: imp.specifier, local: null, imported: null, line: imp.line })
        continue
      }
      for (const binding of imp.bindings) {
        imports.push({ specifier: imp.specifier, local: binding.local, imported: binding.imported, line: imp.line })
      }
    }
    return {
      rel, ext, lang, loc: extract.loc,
      symbols: extract.symbols.map(s => ({ ...s })),
      refs: extract.refs.map(r => ({
        kind: r.kind, target: r.target, receiver: r.receiver, from: r.from, scope: 'code', line: r.line,
      })),
      imports,
      properties: [], links: [], tags: [], generated: false,
    }
  }
  if (isMarkdown) {
    const md = extractFromMarkdown(content)
    // Which tags were declared in the `tags:` frontmatter property. The body
    // scanner has already merged both sources into one deduplicated list, so
    // the source is recovered from the property values rather than tracked.
    const declared = new Set(md.properties
      .filter(property => property.key.toLowerCase() === 'tags')
      .map(property => property.value.replace(/^#/, '').toLowerCase()))
    return {
      rel, ext, lang: null, loc: md.loc,
      symbols: md.symbols.map(s => ({ ...s, exported: false, endLine: s.line, container: s.container ?? null })),
      refs: [
        ...md.refs.map(r => ({
          kind: 'references', target: r.target, receiver: r.wiki ? 'wiki' : null,
          from: null, scope: 'md-link', line: r.line,
        })),
        ...md.tags.map(tag => ({
          kind: 'references', target: tag, receiver: null, from: null, scope: 'md-tag', line: 1,
        })),
      ],
      imports: [],
      properties: md.properties.map(p => ({
        key: p.key, value: p.value, raw: p.raw, ordinal: p.ordinal, isLink: p.isLink, line: p.line,
      })),
      links: md.links.map(l => ({
        target: l.target, alias: l.alias, section: l.section, embed: l.embed,
        source: l.from, line: l.line,
      })),
      tags: md.tags.map(tag => ({
        tag, source: declared.has(tag) ? 'property' as const : 'body' as const,
      })),
      generated: md.generated,
    }
  }
  return {
    rel, ext, lang: null, loc: content.split('\n').length,
    symbols: [], refs: [], imports: [], properties: [], links: [], tags: [], generated: false,
  }
}
