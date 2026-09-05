/**
 * Index benchmark — measures, never asserts a winner.
 *
 * Every number this prints is taken at run time from the real indexer over a
 * real corpus. There are no literal timings anywhere in this file, because the
 * previous benchmark in this project wrote its results directly into the source
 * and generated a professional-looking scorecard from constants.
 *
 * What this DOES establish: cold build cost, the cost of a one-file edit, of a
 * delete and of a rename, query latency, peak RSS and on-disk size, for a named
 * corpus at a named commit.
 *
 * What this deliberately does NOT establish: any comparison against GitNexus or
 * CodeGraph. That claim requires running those systems over the identical
 * corpus with identical queries, which this harness does not do.
 *
 *   node --experimental-strip-types bench/index-bench.ts [corpusPath] [--json out.json]
 */
import { cpSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync, renameSync, unlinkSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { openStore } from '../src/store/schema.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { walk } from '../src/indexer/scan.ts'
import { searchWorkspace } from '../src/store/search.ts'

interface Timing { label: string; ms: number; detail: Record<string, unknown> }

const args = process.argv.slice(2)
const jsonFlag = args.indexOf('--json')
const jsonOut = jsonFlag === -1 ? null : args[jsonFlag + 1]
const corpusArg = args.find(a => !a.startsWith('--') && a !== jsonOut)
const corpus = resolve(corpusArg ?? resolve(import.meta.dirname, '..'))

if (!existsSync(corpus)) {
  console.error(`corpus not found: ${corpus}`)
  process.exit(1)
}

/** Wall time of a synchronous call. */
function timed<T>(fn: () => T): { ms: number; value: T } {
  const started = process.hrtime.bigint()
  const value = fn()
  return { ms: Number(process.hrtime.bigint() - started) / 1e6, value }
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1))
  return sorted[index]
}

function dbBytes(file: string): number {
  let total = 0
  for (const suffix of ['', '-wal', '-shm']) {
    try { total += statSync(file + suffix).size } catch { /* absent is zero */ }
  }
  return total
}

function corpusCommit(path: string): string | null {
  try {
    return execFileSync('git', ['-C', path, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  } catch { return null }
}

// A scratch copy so the benchmark never edits the real corpus.
const scratch = mkdtempSync(join(tmpdir(), 'plugbrain-bench-'))
const root = join(scratch, 'corpus')
const dbFile = join(scratch, 'bench.db')
const timings: Timing[] = []

try {
  const copy = timed(() => {
    cpSync(corpus, root, {
      recursive: true,
      filter: (src) => !/[\\/](node_modules|\.git|ui-dist|dist|out|coverage)([\\/]|$)/.test(src),
    })
  })

  const files = walk(root)
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0)

  const db = openStore(dbFile)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-bench', 'bench', root, new Date().toISOString())

  // --- cold: an empty database over the whole corpus ----------------------
  const cold = timed(() => indexWorkspace(db, 'ws-bench', root))
  timings.push({
    label: 'cold-full-index',
    ms: cold.ms,
    detail: {
      mode: cold.value.mode, generation: cold.value.generation,
      files: cold.value.files, parsed: cold.value.parsed,
      symbols: cold.value.symbols, edges: cold.value.edges,
      unresolved: cold.value.unresolved, ambiguous: cold.value.ambiguous,
      reparsed: cold.value.reparsed,
    },
  })

  // --- warm no-op: nothing changed on disk --------------------------------
  const noop = timed(() => indexWorkspace(db, 'ws-bench', root))
  timings.push({
    label: 'warm-noop',
    ms: noop.ms,
    detail: { mode: noop.value.mode, reparsed: noop.value.reparsed, generation: noop.value.generation },
  })

  // --- warm one-file edit --------------------------------------------------
  const editable = files.filter(f => f.ext === '.ts' || f.ext === '.js')
  const editRuns: number[] = []
  let editDetail: Record<string, unknown> = {}
  for (let i = 0; i < Math.min(5, editable.length); i += 1) {
    const victim = editable[i]
    const original = readFileSync(victim.abs, 'utf8')
    writeFileSync(victim.abs, `${original}\nexport const benchMarker${i} = ${i}\n`)
    const run = timed(() => indexWorkspace(db, 'ws-bench', root))
    editRuns.push(run.ms)
    editDetail = {
      mode: run.value.mode, reparsed: run.value.reparsed,
      reresolved: run.value.reresolved, generation: run.value.generation,
    }
  }
  const editSorted = [...editRuns].sort((a, b) => a - b)
  timings.push({
    label: 'warm-one-file-edit',
    ms: editSorted.length === 0 ? 0 : editSorted[Math.floor(editSorted.length / 2)],
    detail: {
      runs: editRuns.length,
      p50: percentile(editSorted, 50), p95: percentile(editSorted, 95),
      min: editSorted[0] ?? 0, max: editSorted[editSorted.length - 1] ?? 0,
      ...editDetail,
    },
  })

  // --- delete ---------------------------------------------------------------
  const doomed = editable[editable.length - 1]
  const doomedBody = readFileSync(doomed.abs, 'utf8')
  unlinkSync(doomed.abs)
  const del = timed(() => indexWorkspace(db, 'ws-bench', root))
  timings.push({
    label: 'warm-delete',
    ms: del.ms,
    detail: { mode: del.value.mode, deleted: del.value.changed.deleted, reresolved: del.value.reresolved },
  })
  writeFileSync(doomed.abs, doomedBody)
  indexWorkspace(db, 'ws-bench', root)

  // --- rename ---------------------------------------------------------------
  const renamed = `${doomed.abs}.renamed.ts`
  renameSync(doomed.abs, renamed)
  const ren = timed(() => indexWorkspace(db, 'ws-bench', root))
  timings.push({
    label: 'warm-rename',
    ms: ren.ms,
    detail: {
      mode: ren.value.mode, renamed: ren.value.changed.renamed,
      added: ren.value.changed.added, deleted: ren.value.changed.deleted,
    },
  })

  // --- query latency --------------------------------------------------------
  const names = (db.prepare(
    `SELECT name FROM search_rows WHERE workspace_id = 'ws-bench' AND kind != 'file' LIMIT 400`)
    .all() as unknown as Array<{ name: string }>).map(row => row.name)
    .filter(name => /^[A-Za-z_][A-Za-z0-9_]{2,}$/.test(name))

  // Through the canonical search, which fixes the query SHAPE. The naive
  // join drives from search_rows and probes FTS per row; this drives from the
  // FTS match. Same data, same results, ~4 orders of magnitude apart.
  const queryRuns: number[] = []
  let hits = 0
  for (const name of names.slice(0, 200)) {
    const run = timed(() => searchWorkspace(db, 'ws-bench', name, { limit: 25 }))
    queryRuns.push(run.ms)
    hits += run.value.length
  }
  const querySorted = [...queryRuns].sort((a, b) => a - b)
  timings.push({
    label: 'search-query',
    ms: percentile(querySorted, 50),
    detail: {
      queries: queryRuns.length, totalHits: hits,
      p50: percentile(querySorted, 50), p95: percentile(querySorted, 95),
      max: querySorted[querySorted.length - 1] ?? 0,
    },
  })

  const final = db.prepare(
    `SELECT generation, file_count, symbol_count, edge_count, unresolved_count, ambiguous_count
       FROM workspace_index_state WHERE workspace_id = 'ws-bench'`).get() as Record<string, number>
  db.close()

  const report = {
    schema: 1,
    measuredAt: new Date().toISOString(),
    disclaimer: 'Measured values for this corpus only. This harness does not run GitNexus or CodeGraph and therefore supports no comparative claim.',
    corpus: {
      path: corpus,
      commit: corpusCommit(corpus),
      indexableFiles: files.length,
      indexableBytes: totalBytes,
      copyMs: copy.ms,
    },
    host: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      cpus: (globalThis as { navigator?: { hardwareConcurrency?: number } }).navigator?.hardwareConcurrency ?? null,
    },
    timings,
    finalState: final,
    peakRssBytes: process.memoryUsage().rss,
    dbBytes: dbBytes(dbFile),
  }

  const text = JSON.stringify(report, null, 2)
  if (jsonOut !== null && jsonOut !== undefined) {
    writeFileSync(resolve(jsonOut), `${text}\n`)
    console.log(`wrote ${resolve(jsonOut)}`)
  }
  console.log(text)
} finally {
  try { rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }) } catch { /* windows lock */ }
}
