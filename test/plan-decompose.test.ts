import { strict as assert } from 'node:assert'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { ensureAgent } from '../src/access.ts'
import { enqueueTask, ensureQueueSchema } from '../src/queue.ts'
import { decomposeLedgerTarget, applyDecomposedTask, type DecompositionLedger } from '../src/plan-decompose.ts'

const ledger: DecompositionLedger = {
  gates: [{
    id: 'R1-TEST-001', title: 'Ship a safe change', category: 'tests',
    brief: 'Add regression coverage for the referenced gate.',
    acceptance: ['A failing case is reproduced before the fix.', 'All relevant checks pass.'],
    reviewerRole: 'independent-reviewer', dependsOn: ['R0-BASE-001'], evidence: ['evidence/R1-TEST-001.md'],
  }],
  requirements: [{ id: 'REQ-UNKNOWN', title: 'Unknown work', category: 'experimental', brief: 'Do work.', acceptance: ['Done'], reviewerRole: 'reviewer', evidence: ['proof.md'] }],
}

test('decompose emits an executable spec for allowlisted categories with evidence and dependency refs', () => {
  const result = decomposeLedgerTarget(ledger, 'R1-TEST-001')
  assert.equal(result.state, 'executable')
  assert.equal(result.spec?.category, 'tests')
  assert.deepEqual(result.spec?.dependsOn, ['R0-BASE-001'])
  assert.deepEqual(result.spec?.evidence, ['evidence/R1-TEST-001.md'])
})

test('unknown categories stay waiting-for-lead', () => {
  const result = decomposeLedgerTarget(ledger, 'REQ-UNKNOWN')
  assert.equal(result.state, 'waiting-for-lead')
  assert.match(result.reason, /allowlist/i)
})

test('missing evidence blocks executable status without inventing proof', () => {
  const noEvidence = { ...ledger, gates: [{ ...ledger.gates![0]!, evidence: [] as string[] }] }
  const result = decomposeLedgerTarget(noEvidence, 'R1-TEST-001')
  assert.equal(result.state, 'waiting-for-lead')
  assert.match(result.reason, /evidence/i)
  assert.deepEqual(result.spec?.evidence, [])
})

test('dependencies must resolve to existing queue tasks before apply', () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-decompose-'))
  const dbPath = join(root, 'brain.sqlite')
  const db = openStore(dbPath)
  try {
    ensureQueueSchema(db)
    db.exec("INSERT INTO workspaces (id, name, root, created_at) VALUES ('ws', 'fixture', '/', '2026-01-01')")
    ensureAgent(db, 'lead')
    const result = decomposeLedgerTarget(ledger, 'R1-TEST-001')
    assert.throws(() => applyDecomposedTask(db, 'ws', result, 'lead'), /dependency/i)
    assert.equal((db.prepare('SELECT COUNT(*) AS n FROM queue_tasks').get() as { n: number }).n, 0)
  } finally { db.close(); rmSync(root, { recursive: true, force: true }) }
})

test('repeating an apply for the same source is idempotent', () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-decompose-'))
  const db = openStore(join(root, 'brain.sqlite'))
  try {
    ensureQueueSchema(db)
    db.exec("INSERT INTO workspaces (id, name, root, created_at) VALUES ('ws', 'fixture', '/', '2026-01-01')")
    ensureAgent(db, 'lead')
    const noDependencies = { ...ledger, gates: [{ ...ledger.gates![0]!, dependsOn: [] as string[] }] }
    const result = decomposeLedgerTarget(noDependencies, 'R1-TEST-001')
    const first = applyDecomposedTask(db, 'ws', result, 'lead')
    const second = applyDecomposedTask(db, 'ws', result, 'lead')
    assert.equal(first.id, second.id)
    assert.equal((db.prepare('SELECT COUNT(*) AS n FROM queue_tasks').get() as { n: number }).n, 1)
  } finally { db.close(); rmSync(root, { recursive: true, force: true }) }
})
