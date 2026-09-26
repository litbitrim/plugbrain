/**
 * Planets — one brain, many repositories, many worktrees.
 *
 * The workspace model in `schema.ts` predates the real thing it describes. A
 * planet here is not an abstract grouping: one parent folder can hold a dozen
 * git repositories and more checkouts than that, several of which are worktrees
 * of a single project. The contract forbids a second brain per worktree, so all
 * of them have to live in ONE database and be told apart by identity rather
 * than by having been written somewhere else.
 *
 * Three things make that work:
 *
 *   1. IDENTITY IS DERIVED, NOT MINTED.  A workspace id comes from its
 *      canonical root, a repo id from the git COMMON directory (so nine
 *      worktrees are one repo), a checkout id from its absolute path. Register
 *      the same folder twice and you get the same three strings back, which is
 *      what makes registration idempotent instead of duplicating.
 *
 *   2. THE CHECKOUT CARRIES A REVISION VECTOR.  Branch, HEAD and a hash of the
 *      uncommitted patch. Two checkouts on the same commit are still two
 *      different states if one of them is dirty, and the brain has to be able
 *      to say which one it is looking at.
 *
 *   3. THE WALK IS ONE WALK.  Every selected, non-retired checkout becomes an
 *      index root with a planet-relative prefix; `indexWorkspace` then produces a single
 *      generation over all of them. Same transaction, same publish, same
 *      incremental cost — a planet is not a federation of separate indexes.
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync, type Dirent } from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'
import type { DatabaseSync, SQLInputValue, SQLOutputValue } from 'node:sqlite'
import { gitText } from './indexer/git.ts'
import { indexWorkspace, type IndexProgress, type IndexResult } from './indexer/index.ts'
import type { IndexRoot } from './indexer/scan.ts'
import { cachedOnce, generationCache, publishedGeneration } from './store/count-cache.ts'

/**
 * The physical path is the identity boundary. `resolve()` alone preserves a
 * Junction/symlink spelling, so the same writable directory could otherwise
 * become two workspaces. Missing paths retain their lexical form for callers
 * that are only preparing an error message; registration itself requires one.
 */
export const canonicalPath = (path: string): string => {
  const absolute = resolve(path)
  let existing = absolute
  const suffix: string[] = []
  while (!existsSync(existing)) {
    const parent = dirname(existing)
    if (parent === existing) return absolute
    suffix.unshift(relative(parent, existing))
    existing = parent
  }
  try {
    const real = realpathSync.native(existing)
    return suffix.length === 0 ? real : join(real, ...suffix)
  } catch {
    return absolute
  }
}

const WORKSPACE_ID_MARKER = 'plugbrain-workspace-id'

/**
 * The git COMMON directory of a checkout, resolved without spawning git
 * because this sits on the identity path and is called constantly.
 * `<root>/.git` is a directory for a main worktree and a `gitdir:` pointer
 * file for a linked one; a linked worktree's git dir lives at
 * `<common>/worktrees/<name>`, so the common dir is two levels above it.
 * Returns null for a folder that is not a git checkout at all.
 */
function commonGitDir(root: string): string | null {
  const dotGit = join(resolve(root), '.git')
  if (!existsSync(dotGit)) return null
  if (statSync(dotGit).isDirectory()) return dotGit
  const pointer = readFileSync(dotGit, 'utf8').trim()
  if (!pointer.startsWith('gitdir:')) return null
  const gitDir = pointer.slice('gitdir:'.length).trim()
  const abs = isAbsolute(gitDir) ? gitDir : resolve(root, gitDir)
  return resolve(abs, '..', '..')
}

/**
 * The identity a folder was MINTED with, if it carries one.
 *
 * Deriving identity from the path alone cannot satisfy the contract, and no
 * amount of care makes it: a `git clone` is byte-identical to its origin in
 * everything git can see, so nothing derivable tells a clone apart from a
 * folder that merely moved. Only something `git clone` does not copy can, and
 * the git common directory is exactly that — a clone builds a fresh one, while
 * a move carries the old one along, and every worktree of one repository
 * shares it.
 *
 * This is a pure read. It never writes, because a lookup that mints identity
 * as a side effect would hand out a new id to anything that merely asked.
 * Registration mints; see {@link pinWorkspaceId}.
 */
function pinnedWorkspaceId(root: string): string | null {
  const common = commonGitDir(root)
  if (common === null) return null
  const marker = join(common, WORKSPACE_ID_MARKER)
  if (!existsSync(marker)) return null
  const value = readFileSync(marker, 'utf8').trim()
  return /^ws-[0-9a-f]{12}$/.test(value) ? value : null
}

/**
 * Record the identity this folder is to keep. Called on registration only.
 *
 * The value written is whatever the folder resolves to TODAY, which for an
 * already-known workspace is its existing path-derived id. That is what keeps
 * this change backward compatible: nothing is renumbered, every existing row
 * keeps the id it has, and the marker simply pins it so the next move cannot
 * take it away. Failure to write is not fatal — a read-only or exotic git dir
 * degrades to the old path-derived behaviour rather than refusing to register.
 */
export function pinWorkspaceId(root: string, id: string): void {
  const common = commonGitDir(root)
  if (common === null) return
  try {
    writeFileSync(join(common, WORKSPACE_ID_MARKER), `${id}\n`, 'utf8')
  } catch {
    // Identity stays path-derived for this folder; registration still succeeds.
  }
}

/**
 * The workspace id of a folder: the pinned marker when the folder carries one,
 * otherwise the canonical-path hash. Deliberately the SAME derivation the CLI
 * and the HTTP API both use — a folder registered from either side must land
 * on one row, and an id that changed shape would silently re-register every
 * existing workspace under a new name.
 */
export const workspaceIdFor = (root: string): string =>
  pinnedWorkspaceId(root)
  ?? `ws-${createHash('sha256').update(canonicalPath(root).toLowerCase()).digest('hex').slice(0, 12)}`

/**
 * Fold a path for identity: absolute, forward slashes, no trailing separator,
 * lowercase. Windows paths are case-insensitive, so `C:\code\workspace` and
 * `c:/code/workspace` are the same folder and must not be two repos.
 */
export const foldPath = (path: string): string =>
  canonicalPath(path).split('\\').join('/').replace(/\/+$/, '').toLowerCase()

const shortHash = (value: string): string =>
  createHash('sha256').update(value).digest('hex').slice(0, 12)

/** A planet is a workspace; the two ids name the same row from two angles. */
export const planetIdFor = (root: string): string =>
  `pl-${shortHash('planet\u0000' + foldPath(root))}`

/** One repository: identified by its git COMMON directory, never by a folder. */
export const repoIdFor = (planetId: string, commonDir: string): string =>
  `repo-${shortHash('repo\u0000' + planetId + '\u0000' + foldPath(commonDir))}`

/** One checkout: a main worktree or a linked worktree, at one absolute path. */
export const checkoutIdFor = (planetId: string, path: string): string =>
  `co-${shortHash('checkout\u0000' + planetId + '\u0000' + foldPath(path))}`

/** What git says about one checkout right now. */
export interface CheckoutFacts {
  path: string
  name: string
  commonDir: string | null
  mainWorktree: string | null
  branch: string | null
  head: string | null
  /** Hash of the uncommitted patch; null when the working tree is clean. */
  dirtyHash: string | null
  /** All changed paths, including untracked paths. */
  dirtyCount: number
  /** Untracked paths inside dirtyCount. */
  untrackedCount: number
  /** branch | head | dirty, folded into one string a caller can compare. */
  revision: string
  remoteUrl: string | null
}

/**
 * Read one checkout's revision vector.
 *
 * `--path-format=absolute` is asked for first because `--git-common-dir`
 * answers relative to the checkout (`./.git` for a main worktree, an absolute
 * path under the *main* checkout for a linked one), and only `--path-format`
 * makes those two comparable. The fallback keeps older git working.
 *
 * The dirty hash covers the tracked diff AND the porcelain status, so a new
 * untracked file moves it. It does NOT cover the CONTENT of an untracked file
 * whose name is unchanged; that case is caught by the index itself, which
 * hashes every file's bytes.
 */
export function readCheckout(path: string): CheckoutFacts {
  const abs = resolve(path)
  const real = canonicalPath(abs)
  const toplevel = gitText(real, ['rev-parse', '--show-toplevel'])
  const rawCommon = gitText(real, ['rev-parse', '--path-format=absolute', '--git-common-dir'])
    ?? gitText(real, ['rev-parse', '--git-common-dir'])
  const commonDir = rawCommon === null || rawCommon === ''
    ? null
    : canonicalPath(isAbsolute(rawCommon) ? rawCommon : resolve(real, rawCommon))

  const branch = gitText(real, ['rev-parse', '--abbrev-ref', 'HEAD'])
  const head = gitText(real, ['rev-parse', 'HEAD'])

  // The first entry of `git worktree list` is the main worktree; its folder
  // name is the repository's own name, which is the one a human uses.
  const worktreeList = gitText(real, ['worktree', 'list', '--porcelain']) ?? ''
  const mainWorktree = worktreeList.split('\n').find(line => line.startsWith('worktree '))
    ?.slice('worktree '.length).trim() ?? toplevel

  const porcelain = gitText(real, ['status', '--porcelain']) ?? ''
  const changed = porcelain.split('\n').filter(Boolean)
  const untrackedCount = changed.filter(line => line.startsWith('??')).length
  const diff = gitText(real, ['diff', 'HEAD', '--no-color', '--no-ext-diff', '--unified=0'])
    ?? (gitText(real, ['diff', '--cached', '--no-color', '--unified=0']) ?? '')
      + (gitText(real, ['diff', '--no-color', '--unified=0']) ?? '')
  const dirtyHash = changed.length === 0 ? null : `d-${shortHash(porcelain + '\n' + diff)}`

  return {
    path: abs,
    name: basename(abs),
    commonDir,
    mainWorktree,
    branch,
    head,
    dirtyHash,
    dirtyCount: changed.length,
    untrackedCount,
    revision: `rev-${shortHash(`${branch ?? ''}|${head ?? ''}|${dirtyHash ?? 'clean'}`)}`,
    remoteUrl: gitText(real, ['remote', 'get-url', 'origin']),
  }
}

export interface DiscoveredCheckout extends CheckoutFacts {
  checkoutId: string
  repoId: string
  /** Planet-relative prefix the checkout's files are stored under. */
  relPrefix: string
}

/**
 * The tables below deliberately separate two facts that used to be conflated:
 * a checkout discovered under `Code/` is inventory, while a checkout selected
 * by an operator is an active index root. `retired_at` remains reserved for a
 * checkout that disappeared from disk; it must never be used as a shortcut for
 * hiding an old-but-still-present worktree.
 *
 * This lives beside planet registration rather than in the initial schema so
 * an older store widens safely on its next registration. Until that happens a
 * missing selection table is interpreted as *no selected code roots*, never as
 * permission to resume indexing every historical checkout.
 */
const INDEX_SELECTION_CONFIG_TABLE = 'planet_index_selections'
const INDEX_SELECTION_CHECKOUT_TABLE = 'planet_index_checkout_selections'

interface IndexSelectionState {
  configured: boolean
  updatedAt: string | null
  selectedAtByCheckoutId: Map<string, string>
}

function hasIndexSelectionTables(db: DatabaseSync): boolean {
  const rows = db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (?, ?)")
    .all(INDEX_SELECTION_CONFIG_TABLE, INDEX_SELECTION_CHECKOUT_TABLE) as
    unknown as Array<{ name: string }>
  const names = new Set(rows.map(row => row.name))
  return names.has(INDEX_SELECTION_CONFIG_TABLE) && names.has(INDEX_SELECTION_CHECKOUT_TABLE)
}

function ensureIndexSelectionTables(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ${INDEX_SELECTION_CONFIG_TABLE} (
      planet_id     TEXT PRIMARY KEY REFERENCES planets(id) ON DELETE CASCADE,
      configured_at TEXT NOT NULL,
      updated_at    TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ${INDEX_SELECTION_CHECKOUT_TABLE} (
      planet_id  TEXT NOT NULL REFERENCES planets(id) ON DELETE CASCADE,
      checkout_id TEXT NOT NULL REFERENCES checkouts(id) ON DELETE CASCADE,
      selected_at TEXT NOT NULL,
      PRIMARY KEY (planet_id, checkout_id)
    );
    CREATE INDEX IF NOT EXISTS idx_planet_index_checkout_selections_checkout
      ON ${INDEX_SELECTION_CHECKOUT_TABLE}(checkout_id);
  `)
}

function indexSelectionState(db: DatabaseSync, planetId: string): IndexSelectionState {
  if (!hasIndexSelectionTables(db)) {
    return { configured: false, updatedAt: null, selectedAtByCheckoutId: new Map() }
  }
  const config = db.prepare(
    `SELECT updated_at AS updatedAt FROM ${INDEX_SELECTION_CONFIG_TABLE} WHERE planet_id = ?`)
    .get(planetId) as { updatedAt: string } | undefined
  if (config === undefined) {
    return { configured: false, updatedAt: null, selectedAtByCheckoutId: new Map() }
  }
  const selectedAtByCheckoutId = new Map<string, string>()
  for (const row of db.prepare(
    `SELECT checkout_id AS checkoutId, selected_at AS selectedAt
       FROM ${INDEX_SELECTION_CHECKOUT_TABLE} WHERE planet_id = ? ORDER BY checkout_id`)
    .all(planetId) as unknown as Array<{ checkoutId: string; selectedAt: string }>) {
    selectedAtByCheckoutId.set(row.checkoutId, row.selectedAt)
  }
  return { configured: true, updatedAt: config.updatedAt, selectedAtByCheckoutId }
}

export interface PlanetIndexSelection {
  /** False until an operator explicitly persisted a canonical selection. */
  configured: boolean
  /** Only on-disk (non-retired) selected checkout ids are returned here. */
  checkoutIds: string[]
  updatedAt: string | null
}

function selectionForPlanet(db: DatabaseSync, planetId: string): PlanetIndexSelection {
  const state = indexSelectionState(db, planetId)
  if (!state.configured) return { configured: false, checkoutIds: [], updatedAt: null }
  const active = db.prepare(
    `SELECT c.id FROM checkouts c
       JOIN ${INDEX_SELECTION_CHECKOUT_TABLE} s
         ON s.planet_id = c.planet_id AND s.checkout_id = c.id
      WHERE c.planet_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(planetId) as unknown as Array<{ id: string }>
  return { configured: true, checkoutIds: active.map(row => row.id), updatedAt: state.updatedAt }
}

/** Read the persisted canonical selection without mutating an older database. */
export function getPlanetIndexSelection(db: DatabaseSync, workspaceId: string): PlanetIndexSelection {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (!planet) throw new Error(`workspace is not a planet: ${workspaceId}`)
  return selectionForPlanet(db, planet.id)
}

/**
 * The live Code scope for one workspace.
 *
 * `null` means the workspace is not a Planet and retains the legacy whole-root
 * scope. An empty array means it is a Planet but has no active code checkout:
 * either no operator has configured it yet, or the operator explicitly chose
 * notes-only indexing. Consumers that project files must keep those two cases
 * apart so a historical checkout cannot become visible merely because its old
 * rows have not been tombstoned by the next scan.
 */
export function selectedCheckoutIdsForWorkspace(
  db: DatabaseSync,
  workspaceId: string,
): string[] | null {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  return planet === undefined ? null : selectionForPlanet(db, planet.id).checkoutIds
}

export interface ActivePlanetFileScope {
  sql: string
  params: string[]
}

/**
 * SQL predicate for a live Planet projection.
 *
 * A legacy pre-Planet whole-root index can contain Code rows with
 * `checkout_id IS NULL`. Treating every null row as a note would leak those
 * historical files after an operator narrows selection. Null rows are live
 * only when their path is inside a currently registered note root. The column
 * names are supplied by internal callers only; all values remain bound.
 */
export function activePlanetFileScope(
  db: DatabaseSync,
  workspaceId: string,
  checkoutColumn = 'checkout_id',
  pathColumn = 'path',
): ActivePlanetFileScope {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (planet === undefined) return { sql: '1 = 1', params: [] }
  const selection = selectionForPlanet(db, planet.id)
  const notes = `(${checkoutColumn} IS NULL AND EXISTS (
    SELECT 1 FROM note_roots n
     WHERE n.planet_id = ?
       AND (${pathColumn} = n.rel_path OR
         (n.kind <> 'file' AND substr(${pathColumn}, 1, length(n.rel_path) + 1) = n.rel_path || '/'))
  ))`
  if (selection.checkoutIds.length === 0) return { sql: notes, params: [planet.id] }
  return {
    sql: `(${checkoutColumn} IN (${selection.checkoutIds.map(() => '?').join(', ')}) OR ${notes})`,
    params: [...selection.checkoutIds, planet.id],
  }
}

/**
 * Refuse an index start before a worker is created when a Planet has never had
 * an explicit operator decision. An explicitly empty selection is valid: it
 * says "notes only" and may still index registered note roots. Plain
 * workspaces return null because they have no checkout inventory to select.
 */
export function assertPlanetIndexSelectionConfigured(
  db: DatabaseSync,
  workspaceId: string,
): PlanetIndexSelection | null {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (planet === undefined) return null
  const selection = selectionForPlanet(db, planet.id)
  if (!selection.configured) {
    throw new Error(
      `planet ${workspaceId} has no persisted canonical selection — select checkout IDs before indexing it`)
  }
  // A deliberate notes-only selection is valid, but it is not enough to start
  // a worker if this Planet has no note roots either. Detect it here, before a
  // queue-backed caller can honestly answer 202.
  if (scopeRoots(db, workspaceId)?.length === 0) {
    throw new Error(
      `planet ${workspaceId} has no selected checkouts or note roots — select checkout IDs before indexing it`)
  }
  return selection
}

/**
 * Replace a planet's canonical code roots with explicit checkout IDs.
 *
 * A caller must register first, list the inventory, and choose from that list.
 * We accept an empty list as an explicit "notes only for now" choice, but never
 * infer a replacement from checkout names or from whatever happens to be under
 * `Code/`. The function only changes selection metadata; it never starts an
 * index run or deletes any existing graph data.
 */
export function setPlanetIndexSelection(
  db: DatabaseSync,
  workspaceId: string,
  checkoutIds: readonly string[],
): PlanetIndexSelection {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (!planet) throw new Error(`workspace is not a planet: ${workspaceId}`)
  ensureIndexSelectionTables(db)

  const unique = [...new Set(checkoutIds)]
  if (unique.length > 900) throw new Error('too many checkout ids in one selection')
  if (unique.some(id => id.trim() === '')) throw new Error('checkout ids must not be empty')
  if (unique.length > 0) {
    const placeholders = unique.map(() => '?').join(', ')
    const active = db.prepare(
      `SELECT id FROM checkouts
        WHERE planet_id = ? AND retired_at IS NULL AND id IN (${placeholders})`)
      .all(planet.id, ...unique) as unknown as Array<{ id: string }>
    if (active.length !== unique.length) {
      const known = new Set(active.map(row => row.id))
      const invalid = unique.filter(id => !known.has(id))
      throw new Error(`selection contains unknown or retired checkout ids: ${invalid.join(', ')}`)
    }
  }

  const now = new Date().toISOString()
  db.exec('SAVEPOINT replace_planet_index_selection')
  try {
    db.prepare(
      `INSERT INTO ${INDEX_SELECTION_CONFIG_TABLE} (planet_id, configured_at, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(planet_id) DO UPDATE SET updated_at = excluded.updated_at`)
      .run(planet.id, now, now)
    db.prepare(`DELETE FROM ${INDEX_SELECTION_CHECKOUT_TABLE} WHERE planet_id = ?`).run(planet.id)
    const insert = db.prepare(
      `INSERT INTO ${INDEX_SELECTION_CHECKOUT_TABLE} (planet_id, checkout_id, selected_at)
       VALUES (?, ?, ?)`)
    for (const checkoutId of unique) insert.run(planet.id, checkoutId, now)
    db.exec('RELEASE SAVEPOINT replace_planet_index_selection')
  } catch (error) {
    db.exec('ROLLBACK TO SAVEPOINT replace_planet_index_selection')
    db.exec('RELEASE SAVEPOINT replace_planet_index_selection')
    throw error
  }
  return selectionForPlanet(db, planet.id)
}

/**
 * Every git checkout directly under `codeDir`, one entry per folder.
 *
 * `.git` may be a directory (a clone) or a file (a linked worktree); both mean
 * "this folder is a checkout", and the common dir then says which repository it
 * belongs to. Folders without either are not checkouts and are skipped
 * silently — a planet's `Code/` folder legitimately holds work in progress.
 */
export function discoverCheckouts(codeDir: string, planetId: string): DiscoveredCheckout[] {
  let entries: Dirent<string>[]
  try { entries = readdirSync(codeDir, { withFileTypes: true }) } catch { return [] }
  const found: DiscoveredCheckout[] = []
  const seenPhysicalCheckouts = new Set<string>()
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue
    const abs = join(codeDir, entry.name)
    if (!existsSync(join(abs, '.git'))) continue
    const facts = readCheckout(abs)
    if (facts.commonDir === null) continue
    const checkoutId = checkoutIdFor(planetId, facts.path)
    // A Junction or alias directory can name the same writable checkout. Keep
    // the first canonical inventory row; it is the only row allowed to write
    // revision overlays for that physical checkout.
    if (seenPhysicalCheckouts.has(checkoutId)) continue
    seenPhysicalCheckouts.add(checkoutId)
    found.push({
      ...facts,
      checkoutId,
      repoId: repoIdFor(planetId, facts.commonDir),
      relPrefix: `Code/${entry.name}`,
    })
  }
  return found.sort((a, b) => a.relPrefix.localeCompare(b.relPrefix))
}

/**
 * The note scope — the part of a planet that is written knowledge (M2).
 *
 * Notes are registered separately from checkouts because they are not code and
 * must not be treated as such: a wiki link and a source import are different
 * statements, and the Obsidian replacement needs to know which folders it owns
 * before it can say what a backlink is. The list is the mission's, not a guess:
 * the doc folders plus the single overview note.
 */
export const NOTE_ROOTS: ReadonlyArray<{ relPath: string; kind: 'folder' | 'file' }> = [
  { relPath: 'Master', kind: 'folder' },
  { relPath: 'Roadmap', kind: 'folder' },
  { relPath: 'Codebasis', kind: 'folder' },
  { relPath: 'Wachstum', kind: 'folder' },
  { relPath: 'Planung', kind: 'folder' },
  { relPath: 'Auftrag', kind: 'folder' },
  { relPath: 'Aufräumen', kind: 'folder' },
  { relPath: 'PLUG-Ordner', kind: 'folder' },
  { relPath: '00 Übersicht.md', kind: 'file' },
]

/** Which of the note roots actually exist in this planet, as they are on disk. */
export function noteRootsUnder(planetRoot: string): Array<{ relPath: string; kind: 'folder' | 'file' }> {
  const found: Array<{ relPath: string; kind: 'folder' | 'file' }> = []
  for (const root of NOTE_ROOTS) {
    const abs = join(planetRoot, ...root.relPath.split('/'))
    if (!existsSync(abs)) continue
    found.push({ relPath: root.relPath, kind: statSync(abs).isDirectory() ? 'folder' : 'file' })
  }
  return found
}

/**
 * Drop roots that nest inside one another.
 *
 * Two roots sharing a prefix would walk the same file twice under the same
 * planet-relative path, and the second write would collide with the first. The
 * outermost root wins: it is the one that was asked for.
 */
function outermostOnly(roots: IndexRoot[]): IndexRoot[] {
  const sorted = [...roots].sort((a, b) => a.prefix.length - b.prefix.length || a.prefix.localeCompare(b.prefix))
  const kept: IndexRoot[] = []
  for (const root of sorted) {
    if (kept.some(other => root.prefix === other.prefix || root.prefix.startsWith(`${other.prefix}/`))) continue
    kept.push(root)
  }
  return kept
}

export interface RegisteredPlanet {
  planetId: string
  workspaceId: string
  name: string
  root: string
  /** False when this planet already existed — registering twice is one identity. */
  created: boolean
  repos: number
  /** All on-disk checkout rows currently inventoried, selected or not. */
  checkouts: number
  noteRoots: number
  /** False until a caller has persisted a canonical Code selection. */
  selectionConfigured: boolean
  /** Number of selected checkouts that are still present on disk. */
  selectedCheckouts: number
}

/**
 * Register (or re-register) a planet and everything inside it.
 *
 * Idempotent by construction: every id is derived from a path, so a second run
 * updates exactly the rows the first one wrote. Checkouts that vanished from
 * disk are retired rather than deleted — their files tombstone on the next
 * index, and the history of what they once held stays readable.
 */
export function registerPlanet(db: DatabaseSync, root: string, name?: string): RegisteredPlanet {
  const absRoot = canonicalPath(root)
  if (!existsSync(absRoot) || !statSync(absRoot).isDirectory()) {
    throw new Error(`not a directory: ${absRoot}`)
  }
  const workspaceId = workspaceIdFor(absRoot)
  const planetId = planetIdFor(absRoot)
  const label = name?.trim() || (absRoot.split(/[\\/]/).filter(Boolean).pop() ?? planetId)
  const now = new Date().toISOString()

  const created = db.prepare('SELECT id FROM planets WHERE id = ?').get(planetId) === undefined

  db.prepare(
    `INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(root) DO UPDATE SET name = excluded.name`
  ).run(workspaceId, label, absRoot, now)
  db.prepare(
    `INSERT INTO planets (id, workspace_id, name, root, created_at) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET name = excluded.name`
  ).run(planetId, workspaceId, label, absRoot, now)

  // Registering inventories the current filesystem but deliberately does not
  // select any checkout. A caller must make that canonical choice through
  // `setPlanetIndexSelection`; otherwise a stale worktree becomes a live index
  // root merely by still existing under Code/.
  ensureIndexSelectionTables(db)

  // Retain the caller's spelling for display; discovery identities fold every
  // path through canonicalPath, so alternate spellings still register once.
  const discovered = discoverCheckouts(join(resolve(root), 'Code'), planetId)

  const insertRepo = db.prepare(
    `INSERT INTO repos (id, planet_id, name, common_dir, remote_url, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name, common_dir = excluded.common_dir, remote_url = excluded.remote_url`)
  const nameTaken = db.prepare(
    'SELECT id FROM repos WHERE planet_id = ? AND name = ? AND id <> ?')
  const insertCheckout = db.prepare(
    `INSERT INTO checkouts
       (id, planet_id, repo_id, name, path, rel_prefix, branch, head,
        dirty_hash, dirty_count, untracked_count, revision, is_primary, seen_at, retired_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
     ON CONFLICT(id) DO UPDATE SET
       repo_id = excluded.repo_id, name = excluded.name, path = excluded.path,
       rel_prefix = excluded.rel_prefix, branch = excluded.branch, head = excluded.head,
       dirty_hash = excluded.dirty_hash, dirty_count = excluded.dirty_count,
       untracked_count = excluded.untracked_count,
       revision = excluded.revision, is_primary = excluded.is_primary,
       seen_at = excluded.seen_at, retired_at = NULL`)

  const seen = new Set<string>()
  for (const checkout of discovered) {
    // The repo's name is the MAIN worktree's folder name. Two unrelated repos
    // that happen to share a basename are disambiguated instead of failing the
    // whole registration on a UNIQUE constraint.
    const wanted = checkout.mainWorktree ? basename(checkout.mainWorktree) : checkout.name
    const clash = nameTaken.get(planetId, wanted, checkout.repoId) !== undefined
    const repoName = clash ? `${wanted}-${checkout.repoId.slice(-6)}` : wanted
    insertRepo.run(
      checkout.repoId, planetId, repoName, checkout.commonDir, checkout.remoteUrl, now)
    const isPrimary = checkout.mainWorktree !== null
      && foldPath(checkout.mainWorktree) === foldPath(checkout.path)
    insertCheckout.run(
      checkout.checkoutId, planetId, checkout.repoId, checkout.name, checkout.path,
      checkout.relPrefix, checkout.branch, checkout.head, checkout.dirtyHash,
      checkout.dirtyCount, checkout.untrackedCount, checkout.revision, isPrimary ? 1 : 0, now)
    seen.add(checkout.checkoutId)
  }

  for (const row of db.prepare(
    'SELECT id FROM checkouts WHERE planet_id = ? AND retired_at IS NULL').all(planetId) as
    unknown as Array<{ id: string }>) {
    if (!seen.has(row.id)) {
      db.prepare('UPDATE checkouts SET retired_at = ? WHERE id = ?').run(now, row.id)
    }
  }

  // The note scope. Same idempotence as checkouts: the rows are keyed by the
  // planet-relative path, so a second run updates exactly what the first wrote.
  const noteRoots = noteRootsUnder(absRoot)
  const insertNoteRoot = db.prepare(
    `INSERT INTO note_roots (planet_id, rel_path, kind, added_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(planet_id, rel_path) DO UPDATE SET kind = excluded.kind`)
  for (const root of noteRoots) insertNoteRoot.run(planetId, root.relPath, root.kind, now)
  const keepNotes = new Set(noteRoots.map(root => root.relPath))
  for (const row of db.prepare('SELECT rel_path AS relPath FROM note_roots WHERE planet_id = ?')
    .all(planetId) as unknown as Array<{ relPath: string }>) {
    // A folder that was renamed away stops being a note root, so its files
    // tombstone on the next pass instead of lingering as ghost notes.
    if (!keepNotes.has(row.relPath)) {
      db.prepare('DELETE FROM note_roots WHERE planet_id = ? AND rel_path = ?').run(planetId, row.relPath)
    }
  }

  const counts = db.prepare(
    `SELECT (SELECT COUNT(*) FROM repos WHERE planet_id = ?) AS repos,
            (SELECT COUNT(*) FROM checkouts WHERE planet_id = ? AND retired_at IS NULL) AS checkouts`)
    .get(planetId, planetId) as { repos: number; checkouts: number }
  const selection = selectionForPlanet(db, planetId)

  return {
    planetId, workspaceId, name: label, root: absRoot, created,
    repos: Number(counts.repos), checkouts: Number(counts.checkouts),
    noteRoots: noteRoots.length,
    selectionConfigured: selection.configured,
    selectedCheckouts: selection.checkoutIds.length,
  }
}

export interface CheckoutView {
  id: string
  repoId: string
  repoName: string
  name: string
  path: string
  relPrefix: string
  branch: string | null
  head: string | null
  dirtyHash: string | null
  dirtyCount: number
  untrackedCount: number
  revision: string | null
  isPrimary: boolean
  retiredAt: string | null
  /** True only when this on-disk checkout is in the persisted canonical selection. */
  indexSelected: boolean
  /** When this checkout entered the current selection; null after deselection. */
  selectedAt: string | null
  /** Files of this checkout that are in the index. */
  files: number
  symbols: number
}

export interface PlanetView {
  planetId: string
  workspaceId: string
  name: string
  root: string
  createdAt: string
  indexedAt: string | null
  repos: Array<{
    id: string; name: string; commonDir: string | null; remoteUrl: string | null
    checkouts: number; files: number
  }>
  checkouts: CheckoutView[]
  totals: {
    repos: number; checkouts: number; activeCheckouts: number; selectedCheckouts: number
    files: number; symbols: number; edges: number
    unresolved: number; ambiguous: number
  }
  indexSelection: PlanetIndexSelection
  index: {
    generation: number
    lastSuccessAt: string | null
    lastFailureAt: string | null
    failureReason: string | null
  }
  /** Files in this planet that belong to no checkout: the notes of M2. */
  unattributedFiles: number
  notes: {
    roots: Array<{ relPath: string; kind: string; files: number }>
    files: number
    properties: number
    links: number
    resolvedLinks: number
    ambiguousLinks: number
    missingLinks: number
  }
}

/** The whole planet as one readable answer: repos, checkouts, revisions, counts. */
export function listPlanet(db: DatabaseSync, workspaceId: string): PlanetView {
  const ws = readWorkspaceRow(db, workspaceId)
  const planet = db.prepare(
    'SELECT id, name, root, created_at AS createdAt FROM planets WHERE workspace_id = ?')
    .get(workspaceId) as
    { id: string; name: string; root: string; createdAt: string } | undefined
  if (!planet) throw new Error(`workspace is not a planet: ${workspaceId}`)
  return buildPlanetView(db, ws, planet)
}

interface WorkspaceRow {
  id: string; name: string; root: string; createdAt: string; indexedAt: string | null
}

function readWorkspaceRow(db: DatabaseSync, workspaceId: string): WorkspaceRow {
  const row = db.prepare(
    'SELECT id, name, root, created_at AS createdAt, indexed_at AS indexedAt FROM workspaces WHERE id = ?')
    .get(workspaceId)
  if (!row) throw new Error(`unknown workspace: ${workspaceId}`)
  return {
    id: String(row.id),
    name: String(row.name),
    root: String(row.root),
    createdAt: String(row.createdAt),
    indexedAt: row.indexedAt === null || row.indexedAt === undefined ? null : String(row.indexedAt),
  }
}

export interface NoteRootRow {
  relPath: string
  kind: string
}

function parseNoteRootRow(row: Record<string, SQLOutputValue>): NoteRootRow {
  return {
    relPath: typeof row.relPath === 'string' ? row.relPath : String(row.relPath ?? ''),
    kind: typeof row.kind === 'string' ? row.kind : String(row.kind ?? ''),
  }
}

function readNoteRootRows(db: DatabaseSync, planetId: string): NoteRootRow[] {
  return db.prepare(
    'SELECT rel_path AS relPath, kind FROM note_roots WHERE planet_id = ? ORDER BY rel_path'
  ).all(planetId).map(parseNoteRootRow)
}

/**
 * The same view for a workspace that is not a planet.
 *
 * A folder opened as a vault through the UI is a plain workspace: one root,
 * its markdown, no repositories. The route contract is "what does this
 * workspace hold", and answering that with an error because the folder happens
 * not to be a planet leaves every caller with a broken view instead of a short
 * list. The numbers are the same numbers; only the repository half is empty.
 */
export function listWorkspaceView(db: DatabaseSync, workspaceId: string): PlanetView {
  const ws = readWorkspaceRow(db, workspaceId)
  const planet = db.prepare(
    'SELECT id, name, root, created_at AS createdAt FROM planets WHERE workspace_id = ?')
    .get(workspaceId) as
    { id: string; name: string; root: string; createdAt: string } | undefined
  return buildPlanetView(db, ws, planet ?? null)
}

function buildPlanetView(
  db: DatabaseSync, ws: WorkspaceRow,
  planet: { id: string; name: string; root: string; createdAt: string } | null,
): PlanetView {
  // The queries below are written against the workspace id; it is the row's own
  // id, which is what the caller asked for.
  const workspaceId = ws.id
  const selectionState = planet === null
    ? { configured: false, updatedAt: null, selectedAtByCheckoutId: new Map<string, string>() }
    : indexSelectionState(db, planet.id)
  const indexSelection = planet === null
    ? { configured: false, checkoutIds: [], updatedAt: null }
    : selectionForPlanet(db, planet.id)
  const repoRows = db.prepare(
    `SELECT r.id, r.name, r.common_dir AS commonDir, r.remote_url AS remoteUrl,
            (SELECT COUNT(*) FROM checkouts c WHERE c.repo_id = r.id AND c.retired_at IS NULL) AS checkouts,
            (SELECT COUNT(*) FROM files f WHERE f.repo_id = r.id AND f.workspace_id = ?) AS files
       FROM repos r WHERE r.planet_id = ? ORDER BY r.name`).all(workspaceId, planet?.id ?? '') as
    Array<{ id: string; name: string; commonDir: string | null; remoteUrl: string | null; checkouts: number; files: number }>

  const fileCounts = new Map<string, number>()
  for (const row of db.prepare(
    `SELECT checkout_id AS id, COUNT(*) AS n FROM files
      WHERE workspace_id = ? AND checkout_id IS NOT NULL GROUP BY checkout_id`).all(workspaceId) as
    Array<{ id: string; n: number }>) fileCounts.set(row.id, Number(row.n))

  // Symbols only the indexer writes — the per-checkout GROUP BY over the
  // whole workspace is memoized per generation, so a poll between index runs
  // does not rescan the symbol join. Files stay live: a direct write moves
  // them before any index run does.
  const symbolCounts = cachedOnce(generationCache('planet-symbol-counts'),
    JSON.stringify([workspaceId, publishedGeneration(db, workspaceId)]),
    () => {
      const map = new Map<string, number>()
      for (const row of db.prepare(
        `SELECT f.checkout_id AS id, COUNT(*) AS n FROM symbols s JOIN files f ON f.id = s.file_id
          WHERE f.workspace_id = ? AND f.checkout_id IS NOT NULL GROUP BY f.checkout_id`).all(workspaceId) as
        Array<{ id: string; n: number }>) map.set(row.id, Number(row.n))
      return map
    })

  const checkouts: CheckoutView[] = (db.prepare(
    `SELECT c.id, c.repo_id AS repoId, r.name AS repoName, c.name, c.path,
            c.rel_prefix AS relPrefix, c.branch, c.head, c.dirty_hash AS dirtyHash,
            c.dirty_count AS dirtyCount, c.untracked_count AS untrackedCount,
            c.revision, c.is_primary AS isPrimary,
            c.retired_at AS retiredAt
       FROM checkouts c JOIN repos r ON r.id = c.repo_id
       WHERE c.planet_id = ? ORDER BY r.name, c.rel_prefix`).all(planet?.id ?? '') as
    Array<Omit<CheckoutView, 'isPrimary' | 'indexSelected' | 'selectedAt' | 'files' | 'symbols'> & { isPrimary: number }>)
    .map(row => {
      const selectedAt = selectionState.selectedAtByCheckoutId.get(row.id) ?? null
      return {
        ...row,
        isPrimary: row.isPrimary === 1,
        indexSelected: row.retiredAt === null && selectedAt !== null,
        selectedAt,
        files: fileCounts.get(row.id) ?? 0,
        symbols: symbolCounts.get(row.id) ?? 0,
      }
    })

  const state = db.prepare(
    `SELECT generation, file_count AS fileCount, symbol_count AS symbolCount,
            edge_count AS edgeCount, unresolved_count AS unresolved, ambiguous_count AS ambiguous,
            last_success_at AS lastSuccessAt, last_failure_at AS lastFailureAt,
            failure_reason AS failureReason
       FROM workspace_index_state WHERE workspace_id = ?`).get(workspaceId) as
    { generation: number; fileCount: number; symbolCount: number; edgeCount: number; unresolved: number; ambiguous: number; lastSuccessAt: string | null; lastFailureAt: string | null; failureReason: string | null } | undefined

  const unattributed = Number((db.prepare(
    `SELECT COUNT(*) AS n FROM files WHERE workspace_id = ? AND checkout_id IS NULL`)
    .get(workspaceId) as { n: number }).n)

  // The note scope, told apart from code by the same fact the indexer uses:
  // no checkout means no repository means written knowledge.
  const notePaths = db.prepare(
    'SELECT path FROM files WHERE workspace_id = ? AND checkout_id IS NULL').all(workspaceId) as
    unknown as Array<{ path: string }>
  const noteRootRowsHere = planet === null ? [] : readNoteRootRows(db, planet.id)
  const countSql = (sql: string, ...params: SQLInputValue[]): number =>
    Number((db.prepare(sql).get(...params) as { n: number }).n)
  const linksByStatus = (status: string): number => countSql(
    'SELECT COUNT(*) AS n FROM note_links WHERE workspace_id = ? AND status = ?', workspaceId, status)

  // A workspace that is not a planet has no registered note roots — for it the
  // whole folder is the vault. Saying so with one honest row beats an empty
  // list that reads as "this workspace has no notes".
  const roots = planet === null
    ? (notePaths.length === 0 ? [] : [{ relPath: '', kind: 'workspace', files: notePaths.length }])
    : noteRootRowsHere.map(row => ({
        ...row,
        files: notePaths.filter(file => file.path === row.relPath || file.path.startsWith(`${row.relPath}/`)).length,
      }))

  return {
    planetId: planet?.id ?? '',
    workspaceId: ws.id,
    name: planet?.name ?? ws.name,
    root: planet?.root ?? ws.root,
    createdAt: planet?.createdAt ?? ws.createdAt,
    indexedAt: ws.indexedAt,
    repos: repoRows.map(row => ({
      id: row.id, name: row.name, commonDir: row.commonDir, remoteUrl: row.remoteUrl,
      checkouts: Number(row.checkouts), files: Number(row.files),
    })),
    checkouts,
    totals: {
      repos: repoRows.length,
      checkouts: checkouts.length,
      activeCheckouts: checkouts.filter(c => c.retiredAt === null).length,
      selectedCheckouts: checkouts.filter(c => c.indexSelected).length,
      files: Number(state?.fileCount ?? 0),
      symbols: Number(state?.symbolCount ?? 0),
      edges: Number(state?.edgeCount ?? 0),
      unresolved: Number(state?.unresolved ?? 0),
      ambiguous: Number(state?.ambiguous ?? 0),
    },
    indexSelection,
    index: {
      generation: Number(state?.generation ?? 0),
      lastSuccessAt: state?.lastSuccessAt ?? null,
      lastFailureAt: state?.lastFailureAt ?? null,
      failureReason: state?.failureReason ?? null,
    },
    unattributedFiles: unattributed,
    notes: {
      roots,
      files: unattributed,
      properties: countSql('SELECT COUNT(*) AS n FROM note_properties WHERE workspace_id = ?', workspaceId),
      links: countSql('SELECT COUNT(*) AS n FROM note_links WHERE workspace_id = ?', workspaceId),
      resolvedLinks: linksByStatus('resolved'),
      ambiguousLinks: linksByStatus('ambiguous'),
      missingLinks: linksByStatus('missing'),
    },
  }
}

/**
 * The index roots of a planet, or `null` when this workspace is not one.
 *
 * `null` and `[]` are different answers on purpose: `null` means "not a
 * planet, walk the workspace root", `[]` means "a planet without selected
 * checkouts or note roots", which must be refused rather than indexed.
 */
export function scopeRoots(db: DatabaseSync, workspaceId: string): IndexRoot[] | null {
  const planet = db.prepare('SELECT id, root FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string; root: string } | undefined
  if (!planet) return null
  const selection = indexSelectionState(db, planet.id)
  // Inventory stays comprehensive, but Code roots only exist after a caller
  // has persisted an explicit canonical selection. An old database without the
  // selection tables is deliberately equivalent to an unconfigured selection.
  const rows = !selection.configured ? [] : db.prepare(
    `SELECT c.id, c.repo_id AS repoId, c.path, c.rel_prefix AS relPrefix
       FROM checkouts c
       JOIN ${INDEX_SELECTION_CHECKOUT_TABLE} s
         ON s.planet_id = c.planet_id AND s.checkout_id = c.id
      WHERE c.planet_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(planet.id) as
    Array<{ id: string; repoId: string; path: string; relPrefix: string }>
  const checkouts: IndexRoot[] = rows.map(row => ({
    abs: row.path,
    prefix: row.relPrefix,
    kind: 'checkout' as const,
    repoId: row.repoId,
    checkoutId: row.id,
  }))
  const notes: IndexRoot[] = readNoteRootRows(db, planet.id).map((row): IndexRoot => ({
    abs: join(planet.root, ...row.relPath.split('/')),
    prefix: row.relPath,
    kind: row.kind === 'file' ? 'file' as const : 'notes' as const,
    repoId: null,
    checkoutId: null,
  }))
  return outermostOnly([...checkouts, ...notes])
}

/** The note roots of a planet, or `[]` when it has none. */
export function noteRootRows(db: DatabaseSync, workspaceId: string): NoteRootRow[] {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (!planet) return []
  return readNoteRootRows(db, planet.id)
}

/**
 * Index whatever this workspace is: a planet through its checkout roots, a
 * plain workspace through its single root. One entry point, so the CLI, the
 * daemon and the HTTP API cannot disagree about what "index this" means.
 */
export function indexPlanetWorkspace(
  db: DatabaseSync,
  workspaceId: string,
  options: { full?: boolean; onProgress?: IndexProgress } = {},
): IndexResult {
  const ws = db.prepare('SELECT id, root FROM workspaces WHERE id = ?').get(workspaceId) as
    { id: string; root: string } | undefined
  if (!ws) throw new Error(`unknown workspace: ${workspaceId}`)
  assertPlanetIndexSelectionConfigured(db, workspaceId)
  const roots = scopeRoots(db, workspaceId)
  if (roots === null) return indexWorkspace(db, workspaceId, ws.root, options)
  if (roots.length === 0) {
    throw new Error(
      `planet ${workspaceId} has no selected checkouts or note roots — select canonical checkouts before indexing it`)
  }
  return indexWorkspace(db, workspaceId, ws.root, { ...options, roots })
}

/** Everything the planet knows about files it no longer has. */
export function planetHistory(
  db: DatabaseSync, workspaceId: string, limit = 200,
): Array<{ path: string; hash: string | null; generation: number; deletedAt: string; reason: string }> {
  return db.prepare(
    `SELECT path, hash, generation, deleted_at AS deletedAt, reason FROM file_tombstones
      WHERE workspace_id = ? ORDER BY deleted_at DESC, path LIMIT ?`)
    .all(workspaceId, Math.max(1, Math.floor(limit))) as
    Array<{ path: string; hash: string | null; generation: number; deletedAt: string; reason: string }>
}
