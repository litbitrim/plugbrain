/**
 * Workspace indexing: walk a registered folder, parse what we can, and write
 * the resulting graph into the store.
 *
 * Resolution happens in two passes because a call can precede its definition
 * and an import can point at a file indexed later. Pass 1 records every file
 * and symbol; pass 2 turns names into edges. Anything that still cannot be
 * resolved is stored with `resolved = 0` and its raw text intact — an agent
 * asking "what does this import?" deserves "an external module we do not
 * index" rather than silence.
 */
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, posix, relative, resolve as resolvePath, dirname } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { extractFromSource, languageOf } from './ast.ts'
import { extractFromMarkdown, resolveMarkdownTarget } from './markdown.ts'

/** Directories never worth indexing. Skipped by name at any depth. */
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', 'out', 'coverage', '.next', '.turbo',
  '.cache', '__pycache__', '.venv', 'venv', 'target', '.pnpm', 'release',
  '.codegraph', '.plugbrain',
])

/** Extensions we record as files even when we cannot parse them. */
const TEXTUAL = new Set([
  '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.md', '.yml', '.yaml', '.css', '.html', '.py', '.rs', '.go', '.sql', '.sh',
])

const MAX_BYTES = 2_000_000   // a 2 MB source file is generated; parsing it helps nobody

export interface IndexResult {
  files: number
  parsed: number
  symbols: number
  edges: number
  unresolved: number
  skipped: number
  ms: number
}

interface WalkedFile { abs: string; rel: string; ext: string; size: number; mtime: string }

/** Depth-first walk yielding indexable files, skipping known noise. */
function walk(root: string): WalkedFile[] {
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
function resolveImport(fromRel: string, spec: string, known: Set<string>): string | null {
  if (!spec.startsWith('.')) return null            // bare specifier => external package
  const base = posix.normalize(posix.join(posix.dirname(fromRel), spec))
  const candidates = [
    base,
    `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`, `${base}.mts`, `${base}.cts`,
    posix.join(base, 'index.ts'), posix.join(base, 'index.tsx'),
    posix.join(base, 'index.js'), posix.join(base, 'index.jsx'),
    // TS source often imports its own emitted .js
    base.replace(/\.js$/, '.ts'), base.replace(/\.js$/, '.tsx'),
  ]
  for (const candidate of candidates) if (known.has(candidate)) return candidate
  return null
}

/**
 * Index (or re-index) a whole workspace. Existing rows for the workspace are
 * replaced, so this is idempotent and safe to re-run.
 */
export function indexWorkspace(db: DatabaseSync, workspaceId: string, root: string): IndexResult {
  const started = Date.now()
  const now = new Date().toISOString()
  const absRoot = resolvePath(root)

  const files = walk(absRoot)
  const result: IndexResult = {
    files: files.length, parsed: 0, symbols: 0, edges: 0, unresolved: 0, skipped: 0, ms: 0,
  }

  // Replace the previous graph for this workspace. file_owner/activity survive
  // via their own tables keyed by path, so attribution is not lost on re-index.
  db.prepare('DELETE FROM edges WHERE workspace_id = ?').run(workspaceId)
  db.prepare('DELETE FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)').run(workspaceId)
  db.prepare('DELETE FROM files WHERE workspace_id = ?').run(workspaceId)
  db.prepare('DELETE FROM search WHERE workspace_id = ?').run(workspaceId)

  const insertFile = db.prepare(
    `INSERT INTO files (workspace_id, path, ext, lang, size, mtime, hash, loc, indexed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const insertSymbol = db.prepare(
    `INSERT INTO symbols (file_id, name, kind, line, end_line, exported, container)
     VALUES (?, ?, ?, ?, ?, ?, ?)`)
  const insertEdge = db.prepare(
    `INSERT INTO edges (workspace_id, kind, src_symbol, src_file, dst_symbol, dst_file, raw_target, resolved, line)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const insertSearch = db.prepare(
    `INSERT INTO search (name, path, kind, workspace_id, symbol_id, file_id) VALUES (?, ?, ?, ?, ?, ?)`)

  interface Pending { fileId: number; rel: string; extract: ReturnType<typeof extractFromSource> }
  const pending: Pending[] = []
  /** Markdown knowledge, resolved in pass 2 once every document is known. */
  const markdown: { rel: string; md: ReturnType<typeof extractFromMarkdown> }[] = []
  const fileIdByRel = new Map<string, number>()
  /** name -> symbol ids. A name can be defined in several files; all are kept. */
  const symbolsByName = new Map<string, number[]>()

  db.exec('BEGIN')
  try {
    // ── pass 1: files + symbols ─────────────────────────────────────────
    for (const file of files) {
      let content = ''
      try { content = readFileSync(file.abs, 'utf8') } catch { result.skipped += 1; continue }
      const lang = languageOf(file.ext)
      const hash = createHash('sha256').update(content).digest('hex').slice(0, 16)

      const isMarkdown = file.ext.toLowerCase() === '.md'
      const parseable = lang !== null
      const extract = parseable
        ? extractFromSource(file.rel, content, file.ext)
        : isMarkdown
          ? (() => {
              const md = extractFromMarkdown(content)
              markdown.push({ rel: file.rel, md })
              return {
                symbols: md.symbols.map(sym => ({ ...sym, exported: false, endLine: sym.line })),
                refs: [], imports: [], loc: md.loc,
              }
            })()
          : { symbols: [], refs: [], imports: [], loc: content.split('\n').length }

      const info = insertFile.run(
        workspaceId, file.rel, file.ext, lang, file.size, file.mtime, hash, extract.loc, now)
      const fileId = Number(info.lastInsertRowid)
      fileIdByRel.set(file.rel, fileId)
      insertSearch.run(file.rel.split('/').pop() ?? file.rel, file.rel, 'file', workspaceId, null, fileId)

      if (parseable || isMarkdown) {
        if (parseable) result.parsed += 1
        for (const sym of extract.symbols) {
          const symInfo = insertSymbol.run(
            fileId, sym.name, sym.kind, sym.line, sym.endLine, sym.exported ? 1 : 0, sym.container)
          const symId = Number(symInfo.lastInsertRowid)
          result.symbols += 1
          const list = symbolsByName.get(sym.name)
          if (list) list.push(symId); else symbolsByName.set(sym.name, [symId])
          insertSearch.run(sym.name, file.rel, sym.kind, workspaceId, symId, fileId)
          // file --defines--> symbol
          insertEdge.run(workspaceId, 'defines', null, fileId, symId, null, null, 1, sym.line)
          result.edges += 1
        }
        pending.push({ fileId, rel: file.rel, extract })
      }
    }

    // ── pass 2: imports and references, now that every name is known ────
    const known = new Set(fileIdByRel.keys())
    /** Symbol id for a name defined in a specific file, else any match. */
    const symbolIdFor = (name: string): number | null => {
      const list = symbolsByName.get(name)
      return list && list.length > 0 ? list[0] : null
    }

    for (const item of pending) {
      for (const imp of item.extract.imports) {
        const targetRel = resolveImport(item.rel, imp.specifier, known)
        const targetId = targetRel ? fileIdByRel.get(targetRel) ?? null : null
        insertEdge.run(
          workspaceId, 'imports', null, item.fileId, null, targetId,
          imp.specifier, targetId === null ? 0 : 1, imp.line)
        result.edges += 1
        if (targetId === null) result.unresolved += 1
      }
      for (const ref of item.extract.refs) {
        const dst = symbolIdFor(ref.target)
        const src = ref.from ? symbolIdFor(ref.from) : null
        insertEdge.run(
          workspaceId, ref.kind, src, item.fileId, dst, null,
          ref.target, dst === null ? 0 : 1, ref.line)
        result.edges += 1
        if (dst === null) result.unresolved += 1
      }
    }

    // ── knowledge graph: wiki links, document links, tags ──────────────
    const byBasename = new Map<string, string[]>()
    for (const rel of known) {
      if (!rel.toLowerCase().endsWith('.md')) continue
      const base = (rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase()
      const list = byBasename.get(base)
      if (list) list.push(rel); else byBasename.set(base, [rel])
    }
    const tagIds = new Map<string, number>()
    for (const doc of markdown) {
      const fileId = fileIdByRel.get(doc.rel)
      if (fileId === undefined) continue
      for (const ref of doc.md.refs) {
        const targetRel = resolveMarkdownTarget(doc.rel, ref.target, ref.wiki, known, byBasename)
        const targetId = targetRel ? fileIdByRel.get(targetRel) ?? null : null
        insertEdge.run(
          workspaceId, 'references', null, fileId, null, targetId,
          ref.target, targetId === null ? 0 : 1, ref.line)
        result.edges += 1
        if (targetId === null) result.unresolved += 1
      }
      // A tag is a shared concept: one node, many documents attached to it.
      for (const tag of doc.md.tags) {
        let tagId = tagIds.get(tag)
        if (tagId === undefined) {
          const info = insertSymbol.run(fileId, `#${tag}`, 'constant', 1, 1, 1, null)
          tagId = Number(info.lastInsertRowid)
          tagIds.set(tag, tagId)
          result.symbols += 1
          insertSearch.run(`#${tag}`, doc.rel, 'tag', workspaceId, tagId, fileId)
        }
        insertEdge.run(workspaceId, 'references', null, fileId, tagId, null, `#${tag}`, 1, 1)
        result.edges += 1
      }
    }

    db.prepare('UPDATE workspaces SET indexed_at = ? WHERE id = ?').run(now, workspaceId)
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }

  result.ms = Date.now() - started
  return result
}
