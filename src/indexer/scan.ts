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

/** Directories never worth indexing. Skipped by name at any depth. */
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', 'out', 'coverage', '.next', '.turbo',
  '.cache', '__pycache__', '.venv', 'venv', 'target', '.pnpm', 'release',
  '.codegraph', '.plugbrain',
  // Build output masquerades as source: a minified bundle matches every search
  // term and would crowd real files out of context packs.
  'ui-dist', 'lib', '.output', '.svelte-kit', '.nuxt',
])

/** Extensions we record as files even when we cannot parse them. */
const TEXTUAL = new Set([
  '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.md', '.yml', '.yaml', '.css', '.html', '.py', '.rs', '.go', '.sql', '.sh',
])

const MAX_BYTES = 2_000_000   // a 2 MB source file is generated; parsing it helps nobody

export interface ChangeCounts {
  added: number
  modified: number
  renamed: number
  deleted: number
  unchanged: number
}

export interface IndexResult {
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

export interface WalkedFile { abs: string; rel: string; ext: string; size: number; mtime: string }

/** Depth-first walk yielding indexable files, skipping known noise. */
export function walk(root: string): WalkedFile[] {
  const found: WalkedFile[] = []
  const stack: string[] = [root]
  while (stack.length > 0) {
    const dir = stack.pop() as string
    let entries: ReturnType<typeof readdirSync>
    try { entries = readdirSync(dir, { withFileTypes: true }) } catch { continue }
    for (const entry of entries) {
      const abs = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue
        // A junction/symlink out of the workspace is not part of it.
        if (entry.isSymbolicLink()) continue
        stack.push(abs)
        continue
      }
      if (!entry.isFile()) continue
      const ext = extname(entry.name)
      if (!TEXTUAL.has(ext.toLowerCase())) continue
      let st: ReturnType<typeof statSync>
      try { st = statSync(abs) } catch { continue }
      if (st.size > MAX_BYTES) continue
      found.push({
        abs,
        rel: relative(root, abs).split('\\').join('/'),
        ext,
        size: st.size,
        mtime: st.mtime.toISOString(),
      })
    }
  }
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

export interface StoredFile { id: number; path: string; size: number; mtime: string; hash: string | null }

export interface Classified {
  added: WalkedFile[]
  /** `content === null` means the bytes are identical; only stat fields moved. */
  modified: Array<{ file: WalkedFile; id: number; content: string | null; hash: string }>
  renamed: Array<{ file: WalkedFile; id: number; fromPath: string; content: string; hash: string }>
  deleted: StoredFile[]
  unchanged: number
  addedContent: Map<string, { content: string; hash: string }>
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
 */
export function classify(disk: WalkedFile[], stored: StoredFile[]): Classified {
  const out: Classified = {
    added: [], modified: [], renamed: [], deleted: [],
    unchanged: 0, addedContent: new Map(), skipped: 0,
  }
  const storedByPath = new Map(stored.map(row => [row.path, row]))
  const seen = new Set<string>()
  const candidateAdded: Array<{ file: WalkedFile; content: string; hash: string }> = []

  for (const file of disk) {
    seen.add(file.rel)
    const row = storedByPath.get(file.rel)
    if (row !== undefined && row.size === file.size && row.mtime === file.mtime) {
      out.unchanged += 1
      continue
    }
    let content: string
    try { content = readFileSync(file.abs, 'utf8') } catch { out.skipped += 1; continue }
    const hash = hashOf(content)
    if (row === undefined) {
      candidateAdded.push({ file, content, hash })
      continue
    }
    if (row.hash === hash) {
      // Touched but byte-identical: refresh the stat fields, do not re-parse.
      out.unchanged += 1
      out.modified.push({ file, id: row.id, content: null, hash })
      continue
    }
    out.modified.push({ file, id: row.id, content, hash })
  }

  const candidateDeleted = stored.filter(row => !seen.has(row.path))

  // Rename detection: an added path and a deleted path with identical content
  // are the same file. Moving the row keeps its id, and therefore keeps its
  // owner, its activity history and every edge that points at it.
  const deletedByHash = new Map<string, StoredFile[]>()
  for (const row of candidateDeleted) {
    if (row.hash === null) continue
    const list = deletedByHash.get(row.hash)
    if (list) list.push(row); else deletedByHash.set(row.hash, [row])
  }
  const consumed = new Set<number>()
  for (const candidate of candidateAdded) {
    const pool = deletedByHash.get(candidate.hash)
    const match = pool?.find(row => !consumed.has(row.id))
    if (match !== undefined) {
      consumed.add(match.id)
      out.renamed.push({
        file: candidate.file, id: match.id, fromPath: match.path,
        content: candidate.content, hash: candidate.hash,
      })
    } else {
      out.added.push(candidate.file)
      out.addedContent.set(candidate.file.rel, { content: candidate.content, hash: candidate.hash })
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
}

/** Parse one file into the shape the tables expect. Never throws. */
export function parseFile(rel: string, ext: string, content: string): Omit<ParsedFile, 'fileId'> {
  const lang = languageOf(ext)
  const isMarkdown = ext.toLowerCase() === '.md'
  if (lang !== null) {
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
    }
  }
  if (isMarkdown) {
    const md = extractFromMarkdown(content)
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
    }
  }
  return {
    rel, ext, lang: null, loc: content.split('\n').length,
    symbols: [], refs: [], imports: [],
  }
}
