/**
 * Plain-language project overview (ASK-01, milestone A4).
 *
 * `buildBriefing` in src/context/briefing.ts answers "what is happening RIGHT
 * NOW" — who else is live, what they hold, what just changed. The question this
 * file answers is the one a newcomer asks first:
 *
 *   was ist dieses Projekt / what does this repo do?
 *
 * The answer is assembled, never generated: the README's first paragraph, the
 * package description, the languages the index counted, the entry points it can
 * name, the files the ledger recorded and the files the graph leans on. If a
 * piece is missing it is named in `unavailable` instead of guessed, because an
 * overview that invents scale is worse than one that admits it does not know.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'

export interface LanguageStat { name: string; files: number }

export interface ProjectStats {
  repos: number
  files: number
  symbols: number
  notes: number
  languages: LanguageStat[]
}

export interface EntrypointRef { path: string; why: string }
export interface RecentChangeRef { path: string; when: string; kind: string }
export interface HotspotRef { path: string; degree: number }

export interface ProjectBriefing {
  workspace: string
  name: string
  summary: string
  stats: ProjectStats
  entrypoints: EntrypointRef[]
  recentChanges: RecentChangeRef[]
  hotspots: HotspotRef[]
  unavailable: string[]
}

/** Display names for the language slugs the indexer stores. */
const LANGUAGE_NAMES: Record<string, string> = {
  typescript: 'TypeScript', javascript: 'JavaScript', tsx: 'TypeScript', jsx: 'JavaScript',
  python: 'Python', rust: 'Rust', go: 'Go', java: 'Java', kotlin: 'Kotlin', swift: 'Swift',
  ruby: 'Ruby', php: 'PHP', c: 'C', cpp: 'C++', csharp: 'C#', markdown: 'Markdown',
  json: 'JSON', yaml: 'YAML', toml: 'TOML', shell: 'Shell', bash: 'Shell', powershell: 'PowerShell',
  css: 'CSS', scss: 'SCSS', html: 'HTML', sql: 'SQL', vue: 'Vue', svelte: 'Svelte', dart: 'Dart',
}

const displayLanguage = (slug: string): string =>
  LANGUAGE_NAMES[slug.toLowerCase()] ?? slug.charAt(0).toUpperCase() + slug.slice(1)

/**
 * Well-known entry-point basenames and the reason each is worth naming. Ordered
 * so that a curated path (`src/cli.ts`) outranks a generic one (`index.ts`).
 */
const ENTRYPOINT_NAMES: Array<{ name: string; why: string }> = [
  { name: 'cli.ts', why: 'CLI entry' },
  { name: 'cli.js', why: 'CLI entry' },
  { name: 'main.py', why: 'Python entry' },
  { name: '__main__.py', why: 'Python module entry' },
  { name: 'manage.py', why: 'Django management entry' },
  { name: 'main.rs', why: 'Rust binary entry' },
  { name: 'lib.rs', why: 'Rust library entry' },
  { name: 'server.ts', why: 'server entry' },
  { name: 'server.js', why: 'server entry' },
  { name: 'app.ts', why: 'app entry' },
  { name: 'app.js', why: 'app entry' },
  { name: 'main.ts', why: 'program entry' },
  { name: 'main.js', why: 'program entry' },
  { name: 'index.ts', why: 'module entry' },
  { name: 'index.js', why: 'module entry' },
  { name: 'package.json', why: 'package manifest' },
  { name: 'pyproject.toml', why: 'package manifest' },
  { name: 'Cargo.toml', why: 'package manifest' },
]

const EXCLUDED_PATH = /(^|\/)(node_modules|dist|build|out|\.git|vendor|coverage)\//

/** Strip the markdown that would read as noise in a one-sentence summary. */
function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')          // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')       // links keep their text
    .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')         // inline code
    .replace(/[*_>#]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * The first readable paragraph of a README, or null. Headings, badges, HTML and
 * code fences are skipped; the first paragraph that survives is the project's
 * own one-line description.
 */
function readmeParagraph(root: string): string | null {
  for (const name of ['README.md', 'README', 'readme.md', 'Readme.md', 'README.rst']) {
    let content: string
    try {
      content = readFileSync(join(root, name), 'utf8')
    } catch {
      continue
    }
    const blocks = content.split(/\n\s*\n/)
    for (const block of blocks) {
      const trimmed = block.trim()
      if (trimmed === '') continue
      if (trimmed.startsWith('#')) continue
      if (trimmed.startsWith('<!--') || trimmed.startsWith('<')) continue
      if (trimmed.startsWith('---') || trimmed.startsWith('===')) continue
      if (trimmed.startsWith('```') || trimmed.startsWith('    ')) continue
      if (/^\[!\[/.test(trimmed)) continue
      const text = plainText(trimmed)
      if (text.length < 20) continue
      return text.length > 400 ? `${text.slice(0, 397)}…` : text
    }
  }
  return null
}

/** The `description` of the root package.json, if it has one. */
function packageDescription(root: string): string | null {
  try {
    const parsed = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { description?: unknown }
    if (typeof parsed.description === 'string' && parsed.description.trim() !== '') {
      return plainText(parsed.description)
    }
  } catch { /* no package.json, or not JSON — nothing to add */ }
  return null
}

const CHANGE_KIND: Record<string, string> = { write: 'modified', create: 'added', delete: 'deleted' }

/**
 * Assemble the overview. Every number comes from a COUNT the store can defend;
 * nothing is scaled, sampled or estimated.
 */
export function buildProjectBriefing(db: DatabaseSync, workspaceId: string): ProjectBriefing {
  const ws = requireWorkspace(db, workspaceId)
  const unavailable: string[] = []

  const files = Number((db.prepare('SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
    .get(workspaceId) as { n: number }).n)
  const symbols = Number((db.prepare(
    `SELECT COUNT(*) AS n FROM symbols s JOIN files f ON f.id = s.file_id WHERE f.workspace_id = ?`)
    .get(workspaceId) as { n: number }).n)
  const notes = Number((db.prepare('SELECT COUNT(*) AS n FROM note_body WHERE workspace_id = ?')
    .get(workspaceId) as { n: number }).n)

  // Repos: prefer the planet's repo rows (a linked worktree is not a repo of its
  // own); fall back to the distinct repo ids the files carry.
  let repos = 0
  try {
    repos = Number((db.prepare(
      `SELECT COUNT(DISTINCT r.id) AS n FROM repos r JOIN planets p ON p.id = r.planet_id
        WHERE p.workspace_id = ?`).get(workspaceId) as { n: number }).n)
  } catch { repos = 0 }
  if (repos === 0) {
    repos = Number((db.prepare(
      `SELECT COUNT(DISTINCT repo_id) AS n FROM files
        WHERE workspace_id = ? AND repo_id IS NOT NULL`).get(workspaceId) as { n: number }).n)
  }

  const languages = (db.prepare(
    `SELECT lang AS name, COUNT(*) AS files FROM files
      WHERE workspace_id = ? AND lang IS NOT NULL AND lang <> ''
      GROUP BY lang ORDER BY files DESC, lang LIMIT 12`)
    .all(workspaceId) as Array<{ name: string; files: number }>)
    .map(row => ({ name: displayLanguage(row.name), files: Number(row.files) }))

  // ── entry points ────────────────────────────────────────────────────────
  const entrypoints: EntrypointRef[] = []
  const seen = new Set<string>()
  for (const candidate of ENTRYPOINT_NAMES) {
    const rows = db.prepare(
      `SELECT path FROM files
        WHERE workspace_id = ? AND lower(path) LIKE ?
        ORDER BY length(path), path LIMIT 5`)
      .all(workspaceId, `%${candidate.name.toLowerCase()}`) as Array<{ path: string }>
    for (const row of rows) {
      const normalized = row.path.replace(/\\/g, '/')
      if (EXCLUDED_PATH.test(`/${normalized}`)) continue
      if (!normalized.toLowerCase().endsWith(candidate.name.toLowerCase())) continue
      if (seen.has(normalized)) continue
      seen.add(normalized)
      entrypoints.push({ path: normalized, why: candidate.why })
      break
    }
  }

  // ── what the ledger recorded recently ───────────────────────────────────
  const recentChanges = (db.prepare(
    `SELECT path, action, at FROM activity
      WHERE workspace_id = ? AND action IN ('write','create','delete')
      ORDER BY id DESC LIMIT 20`).all(workspaceId) as Array<{ path: string; action: string; at: string }>)
    .map(row => ({ path: row.path, when: row.at, kind: CHANGE_KIND[row.action] ?? row.action }))
  const distinctRecent = new Set(recentChanges.map(row => row.path))

  // ── hotspots: the files the graph leans on most ─────────────────────────
  const hotspots = (db.prepare(
    `SELECT f.path AS path, COUNT(*) AS degree
       FROM (
         SELECT src_file AS fid FROM edges WHERE workspace_id = ? AND src_file IS NOT NULL
         UNION ALL
         SELECT dst_file AS fid FROM edges WHERE workspace_id = ? AND dst_file IS NOT NULL
       ) e JOIN files f ON f.id = e.fid
      GROUP BY e.fid ORDER BY degree DESC, f.path LIMIT 10`)
    .all(workspaceId, workspaceId) as Array<{ path: string; degree: number }>)
    .map(row => ({ path: row.path, degree: Number(row.degree) }))

  // ── honesty about what is missing ───────────────────────────────────────
  const indexedAt = (db.prepare('SELECT indexed_at FROM workspaces WHERE id = ?')
    .get(workspaceId) as { indexed_at: string | null }).indexed_at
  if (indexedAt === null) unavailable.push('this workspace has never been indexed')
  if (files === 0) unavailable.push('no files are indexed')
  if (symbols === 0) unavailable.push('no symbols are indexed')
  if (notes === 0) unavailable.push('no notes are indexed')

  // ── the summary, assembled from the project's own words ─────────────────
  const sentences: string[] = []
  const description = readmeParagraph(ws.root) ?? packageDescription(ws.root)
  if (description !== null) sentences.push(description.endsWith('.') ? description : `${description}.`)

  let scale = `\`${ws.name}\` has ${files} indexed file${files === 1 ? '' : 's'} and ${symbols} symbol${symbols === 1 ? '' : 's'}`
  if (repos > 0) scale += ` across ${repos} repositor${repos === 1 ? 'y' : 'ies'}`
  if (languages.length > 0) scale += `, mostly ${languages.slice(0, 3).map(language => language.name).join(', ')}`
  scale += '.'
  sentences.push(scale)

  if (entrypoints.length > 0) {
    sentences.push(`Entry points: ${entrypoints.slice(0, 3).map(entry => `\`${entry.path}\` (${entry.why})`).join(', ')}.`)
  }
  if (distinctRecent.size > 0) {
    sentences.push(`${distinctRecent.size} file${distinctRecent.size === 1 ? '' : 's'} changed recently.`)
  }
  if (notes > 0) sentences.push(`${notes} note${notes === 1 ? '' : 's'} are indexed.`)

  return {
    workspace: ws.id,
    name: ws.name,
    summary: sentences.join(' '),
    stats: { repos, files, symbols, notes, languages },
    entrypoints,
    recentChanges,
    hotspots,
    unavailable,
  }
}
