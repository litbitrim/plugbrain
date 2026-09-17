/**
 * Planet check — the M1 invariants, asserted against a REAL planet.
 *
 * The unit tests prove each property on a fixture they build themselves. This
 * exists to ask the same questions of the planet that actually ships: 16
 * repositories, 33 checkouts, ~100 000 files on one disk. A fixture cannot grow
 * the twenty-third worktree, the `.agents` notes tree, or the junction someone
 * left in a checkout — and those are exactly where a one-brain-many-worktrees
 * design comes apart.
 *
 * It asserts, and exits non-zero when an invariant is violated:
 *   1. every indexed file is attributed to a known repo AND a known checkout,
 *      and its path starts with that checkout's prefix;
 *   2. equal symbol names in different repos are different rows (structural
 *      separateness, not a claim about the resolver);
 *   3. nothing that the walker refuses to index is in the store anyway:
 *      no credential or key name, no node_modules/.git/.plugbrain segment;
 *   4. no indexed path escapes the planet, textually or through a realpath;
 *   5. every active checkout carries a revision vector.
 *
 * What this does NOT establish: that the index is COMPLETE (a file the walker
 * legitimately skips is invisible here), that the graph is CORRECT (only that
 * it is attributed and separated), or any comparison with another tool. Those
 * need their own evidence.
 *
 *   PLUGBRAIN_HOME=<home> node --experimental-strip-types bench/planet-check.ts [workspaceId] [--sample N]
 */
import { realpathSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve, sep } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { isSecretPath } from '../src/indexer/scan.ts'

const args = process.argv.slice(2).filter(a => !a.startsWith('--'))
const sampleFlag = process.argv.indexOf('--sample')
const SAMPLE = sampleFlag === -1 ? 500 : Number(process.argv[sampleFlag + 1])

const HOME = process.env.PLUGBRAIN_HOME ?? join(homedir(), '.plugbrain')
const DB_FILE = join(HOME, 'plugbrain.db')
const db: DatabaseSync = openStore(DB_FILE)

const failures: string[] = []
const check = (name: string, ok: boolean, detail: string): void => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(46)} ${detail}`)
  if (!ok) failures.push(name)
}

const planetRow = ((): { workspaceId: string; planetId: string; root: string; name: string } => {
  const explicit = args[0]
  const rows = db.prepare(
    `SELECT p.workspace_id AS workspaceId, p.id AS planetId, p.root AS root, p.name AS name
       FROM planets p ${explicit ? 'WHERE p.workspace_id = ? OR p.id = ?' : 'ORDER BY p.name'}`)
    .all(...(explicit ? [explicit, explicit] : [])) as
    Array<{ workspaceId: string; planetId: string; root: string; name: string }>
  if (rows.length === 0) {
    console.error(explicit ? `no planet matches ${explicit}` : 'no planet registered')
    process.exit(2)
  }
  if (rows.length > 1) {
    console.error(`several planets — name one: ${rows.map(r => r.workspaceId).join(', ')}`)
    process.exit(2)
  }
  return rows[0]
})()

const ws = planetRow.workspaceId
console.log(`planet ${planetRow.name}  ${planetRow.planetId}`)
console.log(`  workspace ${ws}`)
console.log(`  root      ${planetRow.root}`)
console.log(`  store     ${DB_FILE}\n`)

const checkouts = db.prepare(
  `SELECT id, repo_id AS repoId, rel_prefix AS relPrefix, path, revision,
          dirty_hash AS dirtyHash, retired_at AS retiredAt
     FROM checkouts WHERE planet_id = ?`).all(planetRow.planetId) as
  Array<{ id: string; repoId: string; relPrefix: string; path: string; revision: string | null; dirtyHash: string | null; retiredAt: string | null }>
const byId = new Map(checkouts.map(c => [c.id, c]))
const repos = new Set(checkouts.map(c => c.repoId))

// ── 1. attribution ──────────────────────────────────────────────────────────
const files = db.prepare(
  'SELECT id, path, repo_id AS repoId, checkout_id AS checkoutId, size FROM files WHERE workspace_id = ?')
  .all(ws) as Array<{ id: number; path: string; repoId: string | null; checkoutId: string | null; size: number }>

const unattributed = files.filter(f => f.checkoutId === null || f.repoId === null)
check('every file belongs to a checkout', unattributed.length === 0,
  `${files.length} files, ${unattributed.length} unattributed`)

const unknownCheckout = files.filter(f => f.checkoutId !== null && !byId.has(f.checkoutId))
check('every checkout id is a registered checkout', unknownCheckout.length === 0,
  `${unknownCheckout.length} dangling`)

const wrongPrefix = files.filter(f => {
  const co = f.checkoutId === null ? null : byId.get(f.checkoutId)
  if (co === null || co === undefined) return false
  return !f.path.startsWith(`${co.relPrefix}/`)
})
check('every path sits under its checkout prefix', wrongPrefix.length === 0,
  `${wrongPrefix.length} mismatched${wrongPrefix[0] ? ` (e.g. ${wrongPrefix[0].path})` : ''}`)

const prefixOwners = new Map<string, string>()
let prefixCollisions = 0
for (const file of files) {
  const co = file.checkoutId === null ? null : byId.get(file.checkoutId)
  if (!co) continue
  const known = prefixOwners.get(co.relPrefix)
  if (known === undefined) prefixOwners.set(co.relPrefix, co.id)
  else if (known !== co.id) prefixCollisions += 1
}
check('no prefix is claimed by two checkouts', prefixCollisions === 0, `${prefixCollisions} collisions`)

// ── 2. separateness ─────────────────────────────────────────────────────────
const shared = db.prepare(
  `SELECT s.name AS name, COUNT(DISTINCT f.repo_id) AS repos, COUNT(*) AS rows_
     FROM symbols s JOIN files f ON f.id = s.file_id
    WHERE f.workspace_id = ? AND f.repo_id IS NOT NULL
    GROUP BY s.name HAVING repos > 1 ORDER BY rows_ DESC LIMIT 1`).get(ws) as
  { name: string; repos: number; rows_: number } | undefined
check('a same-named symbol exists in >1 repo and stays N rows', shared !== undefined,
  shared ? `'${shared.name}' → ${shared.repos} repos, ${shared.rows_} distinct symbol rows` : 'none found')

const crossContaminated = db.prepare(
  `SELECT COUNT(*) AS n FROM (
     SELECT s.id AS sid, COUNT(DISTINCT f.checkout_id) AS checkouts
       FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE f.workspace_id = ? GROUP BY s.id HAVING checkouts <> 1)`).get(ws) as { n: number }
check('no symbol spans two checkouts', Number(crossContaminated.n) === 0,
  `${crossContaminated.n} cross-checkout symbols`)

const duplicateRows = db.prepare(
  `SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?`).get(ws) as { n: number }
check('exactly one row per (checkout, path)',
  Number(duplicateRows.n) === new Set(files.map(f => `${f.checkoutId}\u0000${f.path}`)).size,
  `${duplicateRows.n} rows`)

// ── 3. nothing the walker refuses is in the store ────────────────────────────
const secretLeak = files.filter(f => isSecretPath(f.path))
check('no credential or key name is indexed', secretLeak.length === 0,
  `${secretLeak.length} leaked${secretLeak[0] ? ` (e.g. ${secretLeak[0].path})` : ''}`)

const NOISE = /(^|\/)(node_modules|\.git|\.plugbrain[^/]*|dist|coverage|__pycache__|\.cache|target)(\/|$)/
const noiseLeak = files.filter(f => NOISE.test(f.path))
check('no dependency, VCS, brain or build-output path', noiseLeak.length === 0,
  `${noiseLeak.length} leaked${noiseLeak[0] ? ` (e.g. ${noiseLeak[0].path})` : ''}`)

// ── 4. no path escapes the planet ───────────────────────────────────────────
const suspicious = files.filter(f =>
  f.path.includes('..') || f.path.includes('\\') || f.path.includes(':'))
check('no indexed path is relative, absolute or escaped', suspicious.length === 0,
  `${suspicious.length} suspicious${suspicious[0] ? ` (e.g. ${suspicious[0].path})` : ''}`)

const realRoot = realpathSync(planetRow.root)
let outside: string[] = []
let unreadable = 0
const step = Math.max(1, Math.floor(files.length / Math.max(1, SAMPLE)))
for (let i = 0; i < files.length; i += step) {
  const file = files[i]
  const abs = resolve(planetRow.root, file.path)
  let real: string
  try {
    if (!statSync(abs).isFile()) continue
    real = realpathSync(abs)
  } catch { unreadable += 1; continue }
  if (real !== realRoot && !real.startsWith(realRoot + sep)) outside.push(file.path)
}
check('sampled realpaths stay inside the planet', outside.length === 0,
  `${outside.length} outside${outside[0] ? ` (e.g. ${outside[0]})` : ''}, ${unreadable} unreadable`)

// ── 5. revision vectors ─────────────────────────────────────────────────────
const active = checkouts.filter(c => c.retiredAt === null)
const withoutRevision = active.filter(c => !c.revision)
check('every active checkout has a revision vector', withoutRevision.length === 0,
  `${active.length} active, ${withoutRevision.length} without`)

// "Clean" is `dirty_hash IS NULL` — the revision string is a hash, so looking
// for the word in it reports every checkout as dirty and teaches nothing.
const dirty = active.filter(c => c.dirtyHash !== null)
console.log(`\n  ${active.length} active checkouts of ${repos.size} repos` +
  ` (${checkouts.length - active.length} retired), ${dirty.length} with uncommitted changes`)

// ── report ─────────────────────────────────────────────────────────────────
const state = db.prepare(
  `SELECT generation, file_count AS files, symbol_count AS symbols, edge_count AS edges,
          unresolved_count AS unresolved, ambiguous_count AS ambiguous, last_success_at AS at,
          last_failure_at AS failed, failure_reason AS reason
     FROM workspace_index_state WHERE workspace_id = ?`).get(ws) as
  { generation: number; files: number; symbols: number; edges: number; unresolved: number; ambiguous: number; at: string | null; failed: string | null; reason: string | null } | undefined

console.log(`\ngeneration ${state?.generation ?? 0} at ${state?.at ?? '(never indexed)'}`)
if (state) {
  console.log(`  files ${state.files}  symbols ${state.symbols}  edges ${state.edges}` +
    `  unresolved ${state.unresolved}  ambiguous ${state.ambiguous}`)
}
if (state?.failed) console.log(`  last failure ${state.failed}: ${state.reason ?? ''}`)

const tombstones = db.prepare(
  'SELECT COUNT(*) AS n FROM file_tombstones WHERE workspace_id = ?').get(ws) as { n: number }
console.log(`  tombstones ${tombstones.n}`)

db.close()
if (failures.length > 0) {
  console.error(`\nFAILED: ${failures.join('; ')}`)
  process.exit(1)
}
console.log('\nall invariants hold')
