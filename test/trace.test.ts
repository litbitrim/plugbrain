/**
 * Trace ingestion gates.
 *
 * These cover the properties a shared agent memory has to hold before anything
 * is drawn on top of it: a restarted runtime must not double a track, a late
 * event must not change the answer, an event this workspace cannot place must
 * not be quietly reshaped into one it can, and a credential must never land in
 * an append-only table.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import {
  ingestTraceEvents, readTrace, redactPayload, redactText, REDACTED,
  type AgentTraceEvent,
} from '../src/trace.ts'
import { projectChronicleFromTrace } from '../src/chronicle.ts'

// Synthetic credential-shaped canaries, generated at run time so that no
// key-like string is ever stored in this repository.
const FAKE_OPENAI_KEY = 'sk-' + 'x'.repeat(36)
const FAKE_GITHUB_TOKEN = 'ghp_' + 'x'.repeat(36)
const FAKE_GOOGLE_KEY = 'AIza' + 'x'.repeat(36)
const FAKE_NVIDIA_KEY = 'nvapi-' + 'x'.repeat(36)
const FAKE_JWT = ['eyJ' + 'x'.repeat(30), 'canary' + 'p'.repeat(14), 'sig' + 'n'.repeat(16)].join('.')

const RUNTIME = 'fcae1c74-99c3-4c7b-ba07-8aabf42b4ffe'
const WORKSPACE = 'ws-d177a599'

function withDb(run: (db: ReturnType<typeof openStore>) => void): void {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-trace-'))
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WORKSPACE, 'test', join(dir, 'ws'), new Date().toISOString())
  try { run(db) } finally {
    try { db.close() } catch { /* already closed */ }
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }) } catch { /* windows lock */ }
  }
}

function event(overrides: Partial<AgentTraceEvent> & Pick<AgentTraceEvent, 'eventId' | 'type'>): AgentTraceEvent {
  return {
    schema: 1,
    source: 'operator',
    runtimeInstanceId: RUNTIME,
    workspaceId: WORKSPACE,
    occurredAt: '2026-09-05T12:00:00.000Z',
    observedAt: '2026-09-05T12:00:01.000Z',
    provenance: { mode: 'live', authorityRef: 'operator:/v1/events#1', confidence: 'authoritative' },
    ...overrides,
  }
}

const known = new Set([WORKSPACE])

test('exactly-once: re-ingesting the same batch inserts nothing the second time', () => {
  withDb(db => {
    const batch = [
      event({ eventId: 'e1', type: 'worker.started', sourceSequence: 1, workerId: 'w-1' }),
      event({ eventId: 'e2', type: 'worker.completed', sourceSequence: 2, workerId: 'w-1' }),
    ]
    const first = ingestTraceEvents(db, batch, { knownWorkspaceIds: known })
    assert.equal(first.inserted, 2)
    assert.equal(first.duplicates, 0)

    // A reconnecting client replays the same log.
    const second = ingestTraceEvents(db, batch, { knownWorkspaceIds: known })
    assert.equal(second.inserted, 0, 'a replayed log created new rows')
    assert.equal(second.duplicates, 2)
    assert.equal(readTrace(db, WORKSPACE).length, 2, 'the workspace grew a second track')
  })
})

test('a runtime restart under the same event ids does not duplicate a track', () => {
  withDb(db => {
    ingestTraceEvents(db, [
      event({ eventId: 'e1', type: 'worker.started', workerId: 'w-1' }),
    ], { knownWorkspaceIds: known })

    // Recovery re-reports the same operator event; only the mode differs.
    ingestTraceEvents(db, [
      event({
        eventId: 'e1', type: 'worker.started', workerId: 'w-1',
        provenance: { mode: 'recovered', authorityRef: 'operator:/v1/events#1', confidence: 'authoritative' },
      }),
    ], { knownWorkspaceIds: known })

    const rows = readTrace(db, WORKSPACE)
    assert.equal(rows.length, 1, 'restart recovery duplicated the track')
    assert.equal(rows[0].provenance.mode, 'live', 'the first authoritative observation was overwritten')
  })
})

test('out-of-order arrival produces the same deterministic ordering as in-order', () => {
  const ordered: string[] = []
  const shuffled: string[] = []
  const batch = [
    event({ eventId: 'a', type: 'task.assigned', sourceSequence: 1, occurredAt: '2026-09-05T12:00:00.000Z' }),
    event({ eventId: 'b', type: 'worktree.leased', sourceSequence: 2, occurredAt: '2026-09-05T12:00:01.000Z' }),
    event({ eventId: 'c', type: 'worker.started', sourceSequence: 3, occurredAt: '2026-09-05T12:00:02.000Z' }),
    event({ eventId: 'd', type: 'worker.completed', sourceSequence: 4, occurredAt: '2026-09-05T12:00:03.000Z' }),
  ]
  withDb(db => {
    ingestTraceEvents(db, batch, { knownWorkspaceIds: known })
    ordered.push(...readTrace(db, WORKSPACE).map(row => row.eventId))
  })
  withDb(db => {
    // Same events, reversed arrival, and the middle two ingested twice.
    ingestTraceEvents(db, [batch[3], batch[1]], { knownWorkspaceIds: known })
    ingestTraceEvents(db, [batch[2], batch[1], batch[0], batch[3]], { knownWorkspaceIds: known })
    shuffled.push(...readTrace(db, WORKSPACE).map(row => row.eventId))
  })
  assert.deepEqual(shuffled, ordered, 'arrival order changed the projection')
  assert.deepEqual(ordered, ['a', 'b', 'c', 'd'])
})

test('an event for an unknown workspace is quarantined, never silently accepted', () => {
  withDb(db => {
    const result = ingestTraceEvents(db, [
      event({ eventId: 'x1', type: 'file.changed', workspaceId: 'ws-someone-else' }),
    ], { knownWorkspaceIds: known })

    assert.equal(result.inserted, 0, 'a foreign workspace event was accepted')
    assert.equal(result.quarantined, 1)
    assert.equal(readTrace(db, 'ws-someone-else').length, 0)
    const held = db.prepare('SELECT workspace_id, reason FROM trace_quarantine')
      .all() as unknown as Array<{ workspace_id: string; reason: string }>
    assert.equal(held.length, 1, 'the rejected event was dropped instead of quarantined')
    assert.match(held[0].reason, /unknown workspaceId/)
  })
})

test('a malformed event is quarantined with a reason and does not abort the batch', () => {
  withDb(db => {
    const result = ingestTraceEvents(db, [
      event({ eventId: 'ok', type: 'worker.started' }),
      event({ eventId: 'bad-type', type: 'worker.exploded' as never }),
      event({ eventId: 'bad-time', type: 'worker.completed', occurredAt: 'not-a-date' }),
      // A fact with no authority is not a fact.
      event({
        eventId: 'no-authority', type: 'commit.created',
        provenance: { mode: 'live', authorityRef: '', confidence: 'authoritative' },
      }),
    ], { knownWorkspaceIds: known })

    assert.equal(result.inserted, 1, 'a malformed sibling blocked a valid event')
    assert.equal(result.quarantined, 3)
    assert.equal(readTrace(db, WORKSPACE).length, 1)
  })
})

test('historical imports are stored and readable as distinctly non-live', () => {
  withDb(db => {
    ingestTraceEvents(db, [
      event({ eventId: 'live-1', type: 'commit.created' }),
      event({
        eventId: 'old-1', type: 'commit.created', source: 'import',
        provenance: {
          mode: 'historical-import',
          authorityRef: 'git:c3c5a6acc09a3b9c0343ebc6a693366804406d0f',
          confidence: 'derived',
        },
      }),
    ], { knownWorkspaceIds: known })

    const rows = readTrace(db, WORKSPACE)
    assert.equal(rows.length, 2)
    const imported = rows.find(row => row.eventId === 'old-1')
    const live = rows.find(row => row.eventId === 'live-1')
    assert.equal(imported?.provenance.mode, 'historical-import')
    assert.equal(imported?.provenance.confidence, 'derived')
    assert.equal(imported?.source, 'import')
    assert.equal(live?.provenance.mode, 'live')
    assert.equal(live?.provenance.confidence, 'authoritative')
  })
})

// ---------------------------------------------------------------------------
// Canary secrets must not survive ingestion
// ---------------------------------------------------------------------------

test('canary credentials never reach the trace table, in values or in named keys', () => {
  // Synthetic canaries built from the run-time fakes above. None of these is
  // a real credential and none of them is stored in the repository.
  const canaries = [
    FAKE_OPENAI_KEY,
    FAKE_GITHUB_TOKEN,
    FAKE_GOOGLE_KEY,
    FAKE_NVIDIA_KEY,
    FAKE_JWT,
  ]
  withDb(db => {
    ingestTraceEvents(db, [
      event({
        eventId: 'leaky', type: 'worker.started',
        payload: {
          command: `curl -H "authorization: Bearer ${canaries[0]}" https://example.invalid`,
          env: { OPENAI_API_KEY: canaries[0], GITHUB_TOKEN: canaries[1] },
          token: canaries[2],
          nested: { deep: { apiKey: canaries[3], note: `jwt ${canaries[4]}` } },
        },
      }),
    ], { knownWorkspaceIds: known })

    const stored = db.prepare('SELECT payload FROM trace_events').get() as { payload: string }
    for (const canary of canaries) {
      assert.ok(!stored.payload.includes(canary), `canary survived ingestion: ${canary.slice(0, 12)}...`)
    }
    // The structure is preserved so the event stays useful.
    const parsed = JSON.parse(stored.payload) as Record<string, unknown>
    assert.ok('command' in parsed && 'env' in parsed && 'nested' in parsed)
    assert.equal((parsed as { token: string }).token, REDACTED)

    // And nothing leaked into the whole-database text either.
    const dump = db.prepare(
      'SELECT group_concat(payload, char(10)) AS all_text FROM trace_events').get() as { all_text: string | null }
    for (const canary of canaries) {
      assert.ok(!String(dump.all_text ?? '').includes(canary), 'a canary was reachable in a bulk read')
    }
  })
})

test('redaction preserves shape and redacts credential-named keys whatever their value', () => {
  const out = redactPayload({
    password: 'short',                       // key name alone is enough
    harmless: 'a normal sentence',
    list: ['plain', FAKE_OPENAI_KEY],
  }) as Record<string, unknown>
  assert.equal(out.password, REDACTED)
  assert.equal(out.harmless, 'a normal sentence')
  assert.deepEqual(out.list, ['plain', REDACTED])
  assert.equal(redactText('no secrets here'), 'no secrets here')
})

test('quarantined raw payloads are redacted too', () => {
  withDb(db => {
    ingestTraceEvents(db, [
      event({
        eventId: 'bad', type: 'nope' as never,
        payload: { token: FAKE_OPENAI_KEY },
      }),
    ], { knownWorkspaceIds: known })
    const held = db.prepare('SELECT raw FROM trace_quarantine').get() as { raw: string }
    assert.ok(!held.raw.includes(FAKE_OPENAI_KEY),
      'a credential reached the quarantine table unredacted')
  })
})


// ---------------------------------------------------------------------------
// Chronicle is a PROJECTION of the trace, not a second history
// ---------------------------------------------------------------------------

test('chronicle projects trace events once, carrying the authority ids', () => {
  withDb(db => {
    ingestTraceEvents(db, [
      event({
        eventId: 'ev-1', type: 'worker.started', sourceSequence: 1,
        taskId: 'task-42', taskVersion: 3, workerId: 'w-7', turnId: 'turn-9',
        agentId: 'agent-unknown-to-this-workspace',
        payload: { summary: 'started the coding child' },
      }),
      event({
        eventId: 'ev-2', type: 'test.completed', sourceSequence: 2,
        taskId: 'task-42', workerId: 'w-7', turnId: 'turn-9',
        receiptRefs: ['receipt-abc'], payload: { summary: '16 passed' },
      }),
    ], { knownWorkspaceIds: known })

    const first = projectChronicleFromTrace(db, WORKSPACE)
    assert.equal(first.projected, 2)
    assert.equal(first.alreadyPresent, 0)

    // Re-projecting must not grow a second history.
    const second = projectChronicleFromTrace(db, WORKSPACE)
    assert.equal(second.projected, 0, 'chronicle grew a duplicate history')
    assert.equal(second.alreadyPresent, 2)

    const rows = db.prepare(
      `SELECT turn_id, task_id, worker_id, trace_event_id, runtime_instance_id, kind, body, agent_id, source
         FROM chronicle WHERE workspace_id = ? ORDER BY id`).all(WORKSPACE) as unknown as Array<Record<string, unknown>>
    assert.equal(rows.length, 2)
    // The SAME ids the authority used, not chronicle-local ones.
    assert.equal(rows[0].runtime_instance_id, RUNTIME)
    assert.equal(rows[0].task_id, 'task-42')
    assert.equal(rows[0].worker_id, 'w-7')
    assert.equal(rows[0].turn_id, 'turn-9')
    assert.equal(rows[0].trace_event_id, 'ev-1')
    assert.equal(rows[0].source, 'operator')
    // An agent this workspace cannot vouch for is dropped, not invented.
    assert.equal(rows[0].agent_id, null)
    assert.equal(rows[1].kind, 'command')
    assert.match(String(rows[1].body), /receipts=receipt-abc/)
    assert.match(String(rows[1].body), /via live:operator/)
  })
})

test('a quarantined event never reaches the chronicle', () => {
  withDb(db => {
    ingestTraceEvents(db, [
      event({ eventId: 'good', type: 'commit.created', taskId: 't-1' }),
      event({ eventId: 'foreign', type: 'commit.created', workspaceId: 'ws-other' }),
    ], { knownWorkspaceIds: known })
    projectChronicleFromTrace(db, WORKSPACE)
    const bodies = (db.prepare('SELECT trace_event_id FROM chronicle WHERE workspace_id = ?')
      .all(WORKSPACE) as unknown as Array<{ trace_event_id: string }>).map(r => r.trace_event_id)
    assert.deepEqual(bodies, ['good'], 'a quarantined event was projected into the chronicle')
  })
})
