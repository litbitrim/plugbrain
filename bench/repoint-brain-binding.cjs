#!/usr/bin/env node
/**
 * FB-BRAIN-04 (b): re-point the ACTIVE brain binding to the canonical planet.
 *
 * The wrong binding is NOT in the 5.85 GB PLUGBRAIN_HOME store (proved: zero
 * rows there mention the legacy tree, and every primary checkout is under
 * C:\PLUG\plugpt\Code). It is one durable row in the runtime operator's
 * `<PLUG home>/brain/index-rows.json`, read by `@plug/store#loadBrainIndexRows`
 * and served as GET /v1/brain by the PlugHarness runtime operator
 * (packages/plug/operator/src/web-projection.ts).
 *
 * What this does, and only this:
 *   1. Back the rows file up verbatim.
 *   2. Write one row per canonical component that REALLY has a GitNexus index,
 *      with state, commits and time read from that workspace's own
 *      `.gitnexus/meta.json` and its real `git rev-parse HEAD`. Nothing is
 *      invented and no index is (re)built.
 *   3. Retire the legacy row to `brain/index-rows.provenance.json` — moved, not
 *      dropped — so history stays and an abandoned checkout can no longer be
 *      shown as the active brain.
 *   4. Every other existing row is left exactly as it was.
 *
 * Dry run by default. Pass --apply to write.
 */
const { createHash } = require('node:crypto')
const { existsSync, readFileSync, writeFileSync, renameSync, mkdirSync, copyFileSync } = require('node:fs')
const { execFileSync } = require('node:child_process')
const { join } = require('node:path')

const HOME = process.env.PLUG_HOME || 'C:/Users/mil/.plug'
const CODE = 'C:/PLUG/plugpt/Code'
const ROWS = join(HOME, 'brain', 'index-rows.json')
const PROVENANCE = join(HOME, 'brain', 'index-rows.provenance.json')
const LEGACY_ROOT = 'plug-restored-20260829'
const SURFACE = 'brain-repoint'
const apply = process.argv.includes('--apply')

// Verbatim from packages/plug/brain/src/index-lifecycle.ts.
const canonicalWorkspace = p => p.replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
const gitNexusIndexId = p => 'gx-' + createHash('sha256').update(canonicalWorkspace(p), 'utf8').digest('hex').slice(0, 8)

const ROW_STATES = ['FRESH', 'STALE', 'MISSING', 'ERROR', 'GITNEXUS_UNAVAILABLE']

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function gitHead(path) {
  try {
    return execFileSync('git', ['-C', path, 'rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return null
  }
}

/** A row for a workspace whose index we really observed on disk. */
function observedRow(path) {
  const meta = readJson(join(path, '.gitnexus', 'meta.json'))
  const indexedCommit = typeof meta.lastCommit === 'string' ? meta.lastCommit : null
  const headCommit = gitHead(path)
  const indexedAt = typeof meta.indexedAt === 'string' ? Date.parse(meta.indexedAt) : NaN
  if (indexedCommit === null || headCommit === null || Number.isNaN(indexedAt)) return null
  const fresh = indexedCommit === headCommit
  return {
    gitNexusIndexId: gitNexusIndexId(path),
    workspacePath: canonicalWorkspace(path),
    surface: SURFACE,
    state: fresh ? 'FRESH' : 'STALE',
    indexedCommit,
    headCommit,
    detail: fresh
      ? `indexed commit matches HEAD ${indexedCommit.slice(0, 12)}`
      : `workspace moved past the index: indexed ${indexedCommit.slice(0, 12)}, HEAD ${headCommit.slice(0, 12)}`,
    updatedAt: indexedAt,
  }
}

/** The same validation `@plug/store` applies, so a bad row can never be written. */
function validateRows(rows) {
  const seen = new Set()
  for (const row of rows) {
    if (!/^gx-[0-9a-f]{8}$/u.test(row.gitNexusIndexId)) throw new Error(`bad id ${row.gitNexusIndexId}`)
    if (typeof row.workspacePath !== 'string' || row.workspacePath.trim() === '') throw new Error(`no path for ${row.gitNexusIndexId}`)
    if (!ROW_STATES.includes(row.state)) throw new Error(`bad state ${row.state}`)
    const key = row.workspacePath.replace(/\\/gu, '/').replace(/\/+$/u, '').toLowerCase()
    if (seen.has(key)) throw new Error(`duplicate workspacePath ${key}`)
    seen.add(key)
  }
}

// ── read the current state ──────────────────────────────────────────────────
const before = readJson(ROWS)
if (before.schema !== 1 || !Array.isArray(before.rows)) throw new Error(`unexpected rows file shape at ${ROWS}`)

const legacyRows = before.rows.filter(row => String(row.workspacePath).includes(LEGACY_ROOT))
const keptRows = before.rows.filter(row => !String(row.workspacePath).includes(LEGACY_ROOT))

const components = readJson('C:/Users/mil/.gitnexus/registry.json')
  .map(entry => entry.path)
  .filter(path => typeof path === 'string' && path !== '')
  .filter(path => existsSync(join(path, '.gitnexus', 'meta.json')))
  .sort((a, b) => a.localeCompare(b))

const newRows = components.map(observedRow).filter(row => row !== null)

console.log(`home           = ${HOME}`)
console.log(`rows file      = ${ROWS}`)
console.log(`rows before    = ${before.rows.length} (legacy: ${legacyRows.length}, kept: ${keptRows.length})`)
console.log(`canonical rows = ${newRows.length} of ${components.length} registered components with a real index`)
for (const row of newRows) console.log(`  ${row.state.padEnd(5)} ${row.gitNexusIndexId} ${row.workspacePath} @ ${row.indexedCommit.slice(0, 12)} (${new Date(row.updatedAt).toISOString()})`)
for (const row of legacyRows) console.log(`  RETIRE ${row.gitNexusIndexId} ${row.workspacePath} was ${row.state} @ ${String(row.indexedCommit).slice(0, 12)}`)

// Upsert, exactly like `upsertBrainIndexRow`: a row for a workspace this run
// observed replaces the earlier row for that workspace instead of duplicating
// it, so re-running changes nothing. Every other row is kept verbatim.
const reprocessed = new Set(newRows.map(row => row.workspacePath))
const survivors = keptRows.filter(row => !reprocessed.has(canonicalWorkspace(row.workspacePath)))
const next = { schema: 1, rows: [...survivors, ...newRows] }
validateRows(next.rows)
console.log(`kept rows      = ${survivors.length} (of ${keptRows.length} non-legacy)`)

if (!apply) {
  console.log('\ndry run: nothing written. Re-run with --apply to write.')
  process.exit(0)
}

// ── write ───────────────────────────────────────────────────────────────────
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backup = join(HOME, 'brain', `index-rows.backup-${stamp}.json`)
copyFileSync(ROWS, backup)
console.log(`\nbackup         = ${backup}`)

mkdirSync(join(HOME, 'brain'), { recursive: true })
const prov = existsSync(PROVENANCE) ? readJson(PROVENANCE) : { schema: 1, retired: [] }
if (prov.schema !== 1 || !Array.isArray(prov.retired)) throw new Error(`unexpected provenance shape at ${PROVENANCE}`)
for (const row of legacyRows) {
  // Idempotent: re-running must not append the same retirement twice.
  if (prov.retired.some(entry => entry.gitNexusIndexId === row.gitNexusIndexId)) continue
  prov.retired.push({
    ...row,
    retiredAt: Date.now(),
    retiredBy: 'FB-BRAIN-04',
    reason: 'index bound to the frozen checkout C:\\PLUG-RESTORED-20260829; the canonical planet is C:\\PLUG\\plugpt\\Code',
    supersededBy: newRows.map(r => r.gitNexusIndexId),
  })
}
writeFileSync(PROVENANCE, JSON.stringify(prov, null, 2) + '\n', 'utf8')

const tmp = ROWS + '.tmp'
writeFileSync(tmp, JSON.stringify(next, null, 2) + '\n', 'utf8')
renameSync(tmp, ROWS) // atomic replace: a reader never sees a half-written file
console.log(`provenance     = ${PROVENANCE} (${prov.retired.length} retired row(s))`)
console.log(`rows after     = ${next.rows.length}`)
console.log(`canonical id(s) now active: ${newRows.map(row => row.gitNexusIndexId).join(' ')}`)
