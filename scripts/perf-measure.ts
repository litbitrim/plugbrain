/**
 * BRAIN-BE-01 / B5-H: Messwerte in PERF.json.
 *
 *   - Vollindex des Brain-Repos (Zeit, DB-Größe)
 *   - Inkrementell nach einer geänderten Datei
 *   - Suche p50/p95 über 50 Anfragen
 *
 * Run: node --experimental-strip-types scripts/perf-measure.ts <targetPath>
 *
 * Isoliertes Home (Temp-Dir), nie das Live-Home. Für die Inkrementalmessung
 * wird eine echte Änderung an einer src/-Datei vorgenommen und im finally
 * byte-identisch zurückgeschrieben — der Checkout bleibt unverändert.
 */
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { indexPlanetWorkspace } from '../src/planet.ts'
import { refreshFile } from '../src/indexer/index.ts'
import * as access from '../src/access.ts'
import { serve } from '../src/server/api.ts'

const repoRoot = resolve(import.meta.dirname, '..')
const target = process.argv[2]
if (target === undefined || target.trim() === '') {
  console.error('usage: node scripts/perf-measure.ts <targetPath>')
  process.exit(2)
}

const dir = mkdtempSync(join(tmpdir(), 'plugbrain-perf-'))
const dbFile = join(dir, 'brain.db')
const db = openStore(dbFile)
try {
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-perf', 'Perf Measure', repoRoot, new Date().toISOString())
  access.registerAgent(db, 'perf-agent', 'Measure')

  // ── Vollindex des Brain-Repos (Zeit, DB-Größe) ─────────────────────────
  const t0 = Date.now()
  const full = indexPlanetWorkspace(db, 'ws-perf', { full: true })
  const fullMs = Date.now() - t0
  // WAL first: data may sit in the -wal file, and a size read over the main
  // file alone would under-report what the store really occupies.
  try { db.exec('PRAGMA wal_checkpoint(TRUNCATE)') } catch { /* best effort */ }
  const dbBytes = statSync(dbFile).size

  // ── Inkrementell nach einer geänderten Datei ───────────────────────────
  // One REAL content change to a src/ file (this checkout's own zone), the
  // incremental scan re-parses exactly that file, and the original bytes are
  // restored in a finally — the checkout is left byte-identical. A forced
  // refresh would not do: classify treats a byte-identical touch as
  // unchanged, so only a real change measures this cost honestly.
  const probe = 'src/planet.ts'
  const probeAbs = join(repoRoot, 'src', 'planet.ts')
  const original = readFileSync(probeAbs, 'utf8')
  writeFileSync(probeAbs, original + '\n// perf-probe: temporarily appended for the incremental measurement\n')
  let incrMs: number
  let deltaMode: string
  let deltaParsed: number
  try {
    const t1 = Date.now()
    const delta = indexPlanetWorkspace(db, 'ws-perf', {})
    incrMs = Date.now() - t1
    deltaMode = delta.mode
    deltaParsed = delta.parsed
  } finally {
    writeFileSync(probeAbs, original)
  }

  // ── Suche p50/p95 über 50 Anfragen (HTTP) ──────────────────────────────
  const handle = await serve({ db, uiRoot: null, authKey: 'perf-token' }, 0)
  const base = `http://127.0.0.1:${handle.port}`
  const latencies: number[] = []
  try {
    for (let i = 0; i < 50; i++) {
      const query = ['planet', 'workspace', 'queue', 'index', 'busy'][i % 5]
      const started = Date.now()
      const res = await fetch(`${base}/api/agent/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer perf-token' },
        body: JSON.stringify({ workspace: 'ws-perf', agentId: 'perf-agent', query }),
      })
      await res.json()
      latencies.push(Date.now() - started)
    }
  } finally {
    await handle.close()
  }
  latencies.sort((a, b) => a - b)
  const p50 = latencies[Math.floor(latencies.length * 0.5)]
  const p95 = latencies[Math.min(latencies.length - 1, Math.floor(latencies.length * 0.95))]

  const result = {
    generatedAt: new Date().toISOString(),
    repo: 'PlugBrain-Core--backend',
    repoRoot,
    note: 'Isoliertes Home; für die Inkrementalmessung wird eine echte Änderung an src/planet.ts vorgenommen und im finally byte-identisch zurückgeschrieben — der Checkout bleibt unverändert. Suche über 50 HTTP-Anfragen gegen den lokalen Server.',
    fullIndex: {
      ms: fullMs,
      files: full.files,
      symbols: full.symbols,
      edges: full.edges,
      dbBytes,
      dbMB: Math.round(dbBytes / (1024 * 1024) * 10) / 10,
    },
    incremental: { ms: incrMs, file: probe, mode: deltaMode, parsed: deltaParsed },
    search: { requests: 50, p50Ms: p50, p95Ms: p95 },
  }
  writeFileSync(target, JSON.stringify(result, null, 2) + '\n')
  console.log(JSON.stringify(result))
} finally {
  try { db.close() } catch { /* ignore */ }
  try { rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }) } catch { /* best effort */ }
}
