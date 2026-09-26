/**
 * Projection benchmark — measures ingest, city, mesh and awareness.
 *
 * Same rule as the index benchmark: no literal timings live in this file, and
 * it states what it does NOT establish. The question here is not "is this
 * fast" in the abstract, it is "does a trace that keeps growing keep the
 * projections bounded", because an agent memory that degrades with history is
 * an agent memory nobody can leave running.
 *
 *   node --experimental-strip-types bench/projections-bench.ts [--events N] [--json out.json]
 */
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { ingestTraceEvents, type AgentTraceEvent, type TraceEventType } from '../src/trace.ts'
import { citySnapshot, cityDelta } from '../src/projections/city.ts'
import { meshSnapshot, meshTimeline } from '../src/projections/mesh.ts'
import { buildAwarenessPack } from '../src/projections/awareness.ts'
import { evaluateClaim } from '../src/projections/conflicts.ts'

const args = process.argv.slice(2)
const jsonFlag = args.indexOf('--json')
const jsonOut = jsonFlag === -1 ? null : args[jsonFlag + 1]
const eventsFlag = args.indexOf('--events')
const EVENT_COUNT = eventsFlag === -1 ? 20_000 : Number(args[eventsFlag + 1] ?? 20_000)
const FILE_COUNT = 400
const WS = 'ws-bench'
const RUNTIME = '00000000-1111-2222-3333-444444444444'

function timed<T>(fn: () => T): { ms: number; value: T } {
  const started = process.hrtime.bigint()
  const value = fn()
  return { ms: Number(process.hrtime.bigint() - started) / 1e6, value }
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1))
  return sorted[index] as number
}

function dbBytes(file: string): number {
  let total = 0
  for (const suffix of ['', '-wal', '-shm']) {
    try { total += statSync(file + suffix).size } catch { /* absent */ }
  }
  return total
}

const scratch = mkdtempSync(join(tmpdir(), 'plugbrain-proj-bench-'))
const root = join(scratch, 'ws')
const dbFile = join(scratch, 'bench.db')
const timings: Array<{ label: string; ms: number; detail: Record<string, unknown> }> = []

try {
  // A real workspace on disk: the city and awareness read the actual index.
  mkdirSync(root, { recursive: true })
  for (let i = 0; i < FILE_COUNT; i += 1) {
    const module = `mod${i % 20}`
    mkdirSync(join(root, 'src', module), { recursive: true })
    writeFileSync(
      join(root, 'src', module, `file${i}.ts`),
      `import { helper${(i + 1) % FILE_COUNT} } from '../mod${(i + 1) % 20}/file${(i + 1) % FILE_COUNT}.ts'\n`
      + `export function helper${i}() { return helper${(i + 1) % FILE_COUNT}() }\n`
      + `export const value${i} = ${i}\n`)
  }

  const db = openStore(dbFile)
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, 'bench', root, new Date().toISOString())

  const cold = timed(() => indexWorkspace(db, WS, root))
  timings.push({
    label: 'index-cold', ms: cold.ms,
    detail: { files: cold.value.files, symbols: cold.value.symbols, edges: cold.value.edges },
  })

  // --- trace ingest, in realistic batches --------------------------------
  const TYPES: TraceEventType[] = [
    'task.assigned', 'worktree.leased', 'file.claimed', 'file.read', 'file.changed',
    'worker.started', 'worker.heartbeat', 'test.completed', 'commit.created', 'worker.completed',
  ]
  const BATCH = 500
  const batchTimings: number[] = []
  let ingested = 0
  for (let start = 0; start < EVENT_COUNT; start += BATCH) {
    const batch: AgentTraceEvent[] = []
    for (let i = start; i < Math.min(start + BATCH, EVENT_COUNT); i += 1) {
      const agent = `agent-${i % 15}`
      const task = `task-${i % 200}`
      batch.push({
        schema: 1,
        eventId: `e-${i}`,
        source: 'operator',
        sourceSequence: i,
        runtimeInstanceId: RUNTIME,
        workspaceId: WS,
        taskId: task,
        agentId: agent,
        workerId: `w-${i % 200}`,
        worktreeId: `wt-${i % 200}`,
        type: TYPES[i % TYPES.length] as TraceEventType,
        occurredAt: new Date(Date.UTC(2026, 8, 5, 0, 0, 0, i)).toISOString(),
        observedAt: new Date(Date.UTC(2026, 8, 5, 0, 0, 0, i)).toISOString(),
        fileRefs: [`src/mod${i % 20}/file${i % FILE_COUNT}.ts`],
        payload: { summary: `synthetic event ${i}` },
        provenance: { mode: 'live', authorityRef: `operator:/v1/events#${i}`, confidence: 'authoritative' },
      })
    }
    const run = timed(() => ingestTraceEvents(db, batch, { knownWorkspaceIds: new Set([WS]) }))
    ingested += run.value.inserted
    batchTimings.push(run.ms)
  }
  const batchSorted = [...batchTimings].sort((a, b) => a - b)
  timings.push({
    label: 'trace-ingest', ms: batchTimings.reduce((sum, ms) => sum + ms, 0),
    detail: {
      events: ingested, batches: batchTimings.length, batchSize: BATCH,
      batchP50: percentile(batchSorted, 50), batchP95: percentile(batchSorted, 95),
      eventsPerSecond: Math.round(ingested / (batchTimings.reduce((s, m) => s + m, 0) / 1000)),
    },
  })

  // Re-ingesting the same log must be cheap AND insert nothing.
  const replayBatch: AgentTraceEvent[] = []
  for (let i = 0; i < BATCH; i += 1) {
    replayBatch.push({
      schema: 1, eventId: `e-${i}`, source: 'operator', sourceSequence: i,
      runtimeInstanceId: RUNTIME, workspaceId: WS,
      type: TYPES[i % TYPES.length] as TraceEventType,
      occurredAt: new Date(Date.UTC(2026, 8, 5, 0, 0, 0, i)).toISOString(),
      observedAt: new Date(Date.UTC(2026, 8, 5, 0, 0, 0, i)).toISOString(),
      provenance: { mode: 'live', authorityRef: 'replay', confidence: 'authoritative' },
    })
  }
  const replay = timed(() => ingestTraceEvents(db, replayBatch, { knownWorkspaceIds: new Set([WS]) }))
  timings.push({
    label: 'trace-replay-dedup', ms: replay.ms,
    detail: { inserted: replay.value.inserted, duplicates: replay.value.duplicates },
  })

  // --- projections --------------------------------------------------------
  const city = timed(() => citySnapshot(db, WS))
  timings.push({
    label: 'city-snapshot', ms: city.ms,
    detail: {
      buildings: city.value.buildings.length, districts: city.value.districts.length,
      roads: city.value.roads.length, bytes: JSON.stringify(city.value).length,
    },
  })

  // One file changes; the delta must be tiny.
  writeFileSync(join(root, 'src', 'mod3', 'file3.ts'), 'export const value3 = 3333\n')
  const reindex = timed(() => indexWorkspace(db, WS, root))
  const delta = timed(() => cityDelta(db, WS, city.value.generation))
  timings.push({
    label: 'city-delta-one-file', ms: delta.ms,
    detail: {
      reindexMs: Math.round(reindex.ms), reparsed: reindex.value.reparsed,
      changed: delta.value.changed.length, unchanged: delta.value.unchangedBuildings,
      bytes: JSON.stringify(delta.value).length,
      snapshotBytes: JSON.stringify(city.value).length,
    },
  })

  const mesh = timed(() => meshSnapshot(db, WS))
  timings.push({
    label: 'mesh-snapshot', ms: mesh.ms,
    detail: {
      nodes: mesh.value.nodes.length, edges: mesh.value.edges.length,
      unprovenWorkers: mesh.value.unprovenWorkers.length,
      bytes: JSON.stringify(mesh.value).length,
    },
  })

  const timelineRuns: number[] = []
  for (let i = 0; i < 50; i += 1) {
    timelineRuns.push(timed(() => meshTimeline(db, WS, { taskId: `task-${i}`, limit: 200 })).ms)
  }
  const timelineSorted = [...timelineRuns].sort((a, b) => a - b)
  timings.push({
    label: 'mesh-timeline', ms: percentile(timelineSorted, 50),
    detail: { queries: timelineRuns.length, p50: percentile(timelineSorted, 50), p95: percentile(timelineSorted, 95) },
  })

  const conflictRuns: number[] = []
  for (let i = 0; i < 50; i += 1) {
    conflictRuns.push(timed(() => evaluateClaim(db, WS, {
      taskId: `probe-${i}`, paths: [`src/mod${i % 20}/file${i}.ts`], mode: 'write',
    })).ms)
  }
  const conflictSorted = [...conflictRuns].sort((a, b) => a - b)
  timings.push({
    label: 'conflict-evaluate', ms: percentile(conflictSorted, 50),
    detail: { queries: conflictRuns.length, p50: percentile(conflictSorted, 50), p95: percentile(conflictSorted, 95) },
  })

  const packRuns: number[] = []
  let packBytes = 0
  let packTruncated: Record<string, number> = {}
  for (let i = 0; i < 25; i += 1) {
    const run = timed(() => buildAwarenessPack(db, {
      workspaceId: WS, taskId: `probe-${i}`,
      intendedPaths: [`src/mod${i % 20}/file${i}.ts`, `src/mod${i % 20}/file${i + 20}.ts`],
    }))
    packRuns.push(run.ms)
    packBytes = JSON.stringify(run.value).length
    packTruncated = run.value.truncated
  }
  const packSorted = [...packRuns].sort((a, b) => a - b)
  timings.push({
    label: 'awareness-pack', ms: percentile(packSorted, 50),
    detail: {
      packs: packRuns.length, p50: percentile(packSorted, 50), p95: percentile(packSorted, 95),
      lastPackBytes: packBytes, truncated: packTruncated,
    },
  })

  const traceRows = Number((db.prepare(
    'SELECT COUNT(*) AS n FROM trace_events').get() as { n: number }).n)
  db.close()

  const report = {
    schema: 1,
    measuredAt: new Date().toISOString(),
    disclaimer: 'Measured on a synthetic corpus and a synthetic trace. This harness does not run '
      + 'GitNexus or CodeGraph and therefore supports no comparative claim.',
    corpus: { files: FILE_COUNT, modules: 20, traceEvents: traceRows },
    host: { platform: process.platform, arch: process.arch, nodeVersion: process.version },
    timings,
    peakRssBytes: process.memoryUsage().rss,
    dbBytes: dbBytes(dbFile),
    bytesPer10kEvents: Math.round((dbBytes(dbFile) / Math.max(1, traceRows)) * 10_000),
  }
  const text = JSON.stringify(report, null, 2)
  if (jsonOut != null) {
    writeFileSync(resolve(jsonOut), `${text}\n`)
    console.log(`wrote ${resolve(jsonOut)}`)
  }
  console.log(text)
} finally {
  try { rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }) } catch { /* lock */ }
}
