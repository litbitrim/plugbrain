import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import test from 'node:test'
import { coordEvents } from '../src/coord/events.ts'
import {
  ensureWaveDoneSchema, recordWaveDone, type WaveManifestEvidence, type WaveTaskEvidence,
} from '../src/coord/wave-done.ts'

const evidence = (overrides: Partial<WaveTaskEvidence> = {}): WaveTaskEvidence => ({
  taskId: 'task-a',
  title: 'A task',
  state: 'delivered',
  claimedBy: 'worker-a',
  reviewJudgment: 'PASS',
  sourceRevision: 'abc123',
  reviewedCommit: 'abc123',
  independentReview: {
    source: 'operator', reviewerId: 'reviewer-b', authorityRef: 'operator:review:abc123',
    confidence: 'authoritative', judgment: 'PASS', commit: 'abc123',
  },
  integration: {
    source: 'git', authorityRef: 'git:commit:abc123', confidence: 'authoritative', commit: 'abc123',
  },
  ownerDecision: null,
  ...overrides,
})

const database = (): DatabaseSync => {
  const db = new DatabaseSync(':memory:')
  ensureWaveDoneSchema(db)
  return db
}

const manifest = (waveId: string, taskIds: string[] = ['task-a']): WaveManifestEvidence => ({
  waveId, taskIds, source: 'operator', authorityRef: `operator:manifest:${waveId}`, confidence: 'authoritative',
})

const record = (db: DatabaseSync, waveId: string, tasks: WaveTaskEvidence[]) =>
  recordWaveDone(db, 'ws-test', waveId, manifest(waveId, tasks.map(task => task.taskId)), tasks)

test('wave done is recorded and announced only when every task has delivery, independent review, and integration proof', () => {
  const db = database()
  try {
    const before = coordEvents.latestEventId()
    const result = record(db, 'wave-3', [evidence()])
    assert.equal(result.status, 'DONE')
    assert.equal(result.blockers.length, 0)
    assert.equal(coordEvents.latestEventId(), before + 1)
    assert.equal(coordEvents.replaySince(before)[0]?.type, 'WAVE-DONE')
  } finally { db.close() }
})

test('an open review prevents a completion event', () => {
  const db = database()
  try {
    const before = coordEvents.latestEventId()
    const result = record(db, 'wave-open-review', [evidence({ reviewJudgment: null, reviewedCommit: null })])
    assert.equal(result.status, 'BLOCKED')
    assert.ok(result.blockers.some(blocker => blocker.includes('review')))
    assert.equal(coordEvents.latestEventId(), before)
  } finally { db.close() }
})

test('a review from the task owner is not independent', () => {
  const db = database()
  try {
    const result = record(db, 'wave-self-review', [evidence({
      independentReview: {
        source: 'operator', reviewerId: 'worker-a', authorityRef: 'operator:review:self',
        confidence: 'authoritative', judgment: 'PASS', commit: 'abc123',
      },
    })])
    assert.equal(result.status, 'BLOCKED')
    assert.ok(result.blockers.some(blocker => blocker.includes('independent review')))
  } finally { db.close() }
})

test('missing integration proof prevents a completion event', () => {
  const db = database()
  try {
    const before = coordEvents.latestEventId()
    const result = record(db, 'wave-no-merge', [evidence({ integration: null })])
    assert.equal(result.status, 'BLOCKED')
    assert.ok(result.blockers.some(blocker => blocker.includes('integration')))
    assert.equal(coordEvents.latestEventId(), before)
  } finally { db.close() }
})

test('an explicit authoritative owner decision can resolve the integration requirement', () => {
  const db = database()
  try {
    const result = record(db, 'wave-decision', [evidence({
      integration: null,
      ownerDecision: { source: 'operator', authorityRef: 'operator:decision:42', confidence: 'authoritative', decision: 'defer integration' },
    })])
    assert.equal(result.status, 'DONE')
    assert.equal(result.tasks[0]?.resolution, 'owner-decision')
  } finally { db.close() }
})

test('a duplicate trigger returns the first report without emitting another event', () => {
  const db = database()
  try {
    const first = record(db, 'wave-idempotent', [evidence()])
    const afterFirst = coordEvents.latestEventId()
    const second = record(db, 'wave-idempotent', [evidence()])
    assert.equal(second.status, 'DONE')
    assert.equal(second.eventId, first.eventId)
    assert.equal(coordEvents.latestEventId(), afterFirst)
  } finally { db.close() }
})

test('a missing or incomplete authoritative manifest blocks completion', () => {
  const db = database()
  try {
    const missing = recordWaveDone(db, 'ws-test', 'wave-no-manifest', null, [evidence()])
    assert.equal(missing.status, 'BLOCKED')
    assert.ok(missing.blockers.some(blocker => blocker.includes('manifest')))

    const omitted = recordWaveDone(db, 'ws-test', 'wave-omitted-task', manifest('wave-omitted-task', ['task-a', 'task-b']), [evidence()])
    assert.equal(omitted.status, 'BLOCKED')
    assert.ok(omitted.blockers.some(blocker => blocker.includes('task-b')))
  } finally { db.close() }
})
