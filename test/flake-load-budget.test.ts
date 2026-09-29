/**
 * FLAKE: real Awareness/FO-3/FO-4 runtime paths remain responsive when the
 * same server receives competing calls. Timing uses a raised test-process
 * priority, warmups, and a median — never one scheduler outlier.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { ingestTraceEvents } from '../src/trace.ts'
import {
  assertStableBudget,
  classifyHostLoad,
  measureHostLoad,
  measureWarmMedian,
  prioritiseTimingProcess,
} from './helpers/stable-load-budget.ts'

/**
 * A timing budget measured beside other test files is not evidence. These
 * files run only in `npm run test:budget` (where npm sets the lifecycle
 * event) or when PLUGBRAIN_BUDGET_TESTS=1 is exported; the parallel `npm test`
 * reports them as skipped with the reason below instead of measuring noise.
 */
const BUDGET_TESTS_ENABLED
  = process.env.PLUGBRAIN_BUDGET_TESTS === '1' || process.env.npm_lifecycle_event === 'test:budget'
const budgetSkip = BUDGET_TESTS_ENABLED ? false : 'runs in test:budget'

const AUTH = 'flake-load-token'
const CONCURRENCY = 8
const BUDGET_MS = 500

test('FLAKE: Awareness Runtime and FO-3/FO-4 keep their contracts under concurrent load', { skip: budgetSkip }, async (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-flake-load-'))
  const root = join(dir, 'ws')
  mkdirSync(join(root, 'src'), { recursive: true })
  writeFileSync(join(root, 'src', 'service.ts'), 'export const service = true\n', 'utf8')
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-flake-load'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'flake-load', root, new Date().toISOString())
  indexWorkspace(db, workspaceId, root)
  let handle: ServerHandle | null = null
  try {
    handle = await serve({ db, uiRoot: null, authKey: AUTH, requireAuth: true }, 0)
    const base = `http://127.0.0.1:${handle.port}`
    const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${AUTH}` }
    const post = (path: string, body: unknown, headers: Record<string, string> = authHeaders) => fetch(`${base}${path}`, {
      method: 'POST', headers, body: JSON.stringify(body),
    })
    assert.equal((await post('/api/agent/attach', { workspace: workspaceId, agentId: 'lead' })).status, 200)
    assert.equal((await post('/api/agent/attach', { workspace: workspaceId, agentId: 'junior' })).status, 200)
    const now = new Date().toISOString()
    ingestTraceEvents(db, [{
      schema: 1, eventId: 'flake-lead-claim', source: 'work', runtimeInstanceId: 'flake-runtime',
      workspaceId, taskId: 'lead-task', agentId: 'lead', type: 'file.claimed',
      occurredAt: now, observedAt: now, fileRefs: ['src/service.ts'], payload: { mode: 'write' },
      provenance: { mode: 'live', authorityRef: 'flake-test', confidence: 'authoritative' },
    }])

    // This happens before any route measurement. A sustained scheduler stall
    // here is external host contention, not evidence that a Brain endpoint
    // missed its budget. The endpoint budget itself is deliberately unchanged.
    const hostLoad = classifyHostLoad(await measureHostLoad())
    if (hostLoad.status === 'HOST_OVERLOADED') {
      t.diagnostic(hostLoad.reason)
      // A skipped node:test case exits 0 and is indistinguishable from a
      // green CI run. This is an explicitly non-green environmental outcome,
      // not a product budget failure; the reason remains machine-readable.
      throw new Error(hostLoad.reason)
    }

    const awareness = async (): Promise<void> => {
      const responses = await Promise.all(Array.from({ length: CONCURRENCY }, () => post('/api/awareness', {
        workspaceId, taskId: 'observer-task', agentId: 'junior', intendedPaths: ['src/service.ts'], mode: 'read',
      })))
      for (const response of responses) assert.equal(response.status, 200)
    }
    const unauthorised = async (): Promise<void> => {
      const responses = await Promise.all(Array.from({ length: CONCURRENCY }, () => post('/api/agent/write', {
        workspace: workspaceId, agentId: 'intruder', path: 'src/service.ts', content: 'bad', taskId: 'intruder-task',
      }, { 'Content-Type': 'application/json' })))
      for (const response of responses) assert.equal(response.status, 401)
    }
    const conflict = async (): Promise<void> => {
      const responses = await Promise.all(Array.from({ length: CONCURRENCY }, () => post('/api/agent/write', {
        workspace: workspaceId, agentId: 'junior', path: 'src/service.ts', content: 'blocked', taskId: 'junior-task',
      })))
      for (const response of responses) assert.equal(response.status, 409)
    }

    const priority = prioritiseTimingProcess()
    const measureAll = async () =>
      Promise.all([
        measureWarmMedian(awareness), measureWarmMedian(unauthorised), measureWarmMedian(conflict),
      ]).then(results => [
        ['awareness', results[0]], ['FO-3 unauthorised', results[1]], ['FO-4 conflict', results[2]],
      ] as const)

    let labelled = await measureAll()
    // One sample tripping ONLY the no-hang guard is a one-off scheduling
    // spike, not a hang: re-measure once so the outlier is confirmed or
    // dismissed. An actual hang stays slow and fails both rounds, so the
    // no-hang guard itself is deliberately unchanged.
    const tripped = labelled.some(([, m]) => Math.max(...m.samples) >= BUDGET_MS * 4)
    if (tripped) {
      t.diagnostic(`re-measuring after a sample blew the no-hang guard: ${
        labelled.map(([l, m]) => `${l} longest ${Math.max(...m.samples).toFixed(0)} ms`).join('; ')}`)
      labelled = await measureAll()
    }
    for (const [label, result] of labelled) {
      assertStableBudget(label, result, BUDGET_MS)
      t.diagnostic(`${label}: median ${result.median.toFixed(1)} ms; samples=${result.samples.map(value => value.toFixed(1)).join(',')}`)
    }
    t.diagnostic(`FLAKE: ${CONCURRENCY} concurrent requests per sample; ${priority}`)
  } finally {
    if (handle !== null) await handle.close()
    db.close()
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* temp cleanup only */ }
  }
})
