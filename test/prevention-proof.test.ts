/** P1 acceptance: the repeatable proof produces a receipt from two processes. */
import { strict as assert } from 'node:assert'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { runPreventionProof } from '../scripts/proof-prevention.ts'

test('P1: prevention proof rejects a competing and a stale writer before their writes take effect', async () => {
  const receiptPath = join(mkdtempSync(join(tmpdir(), 'plugbrain-p1-receipt-')), 'receipt.json')
  const receipt = await runPreventionProof(receiptPath)
  assert.deepEqual(receipt.assertions, {
    firstWrite: true,
    secondPreventedBeforeEffect: true,
    staleWriterPrevented: true,
    contextStale: true,
  })
  assert.equal(receipt.fenceTokens.first.epoch, 1)
  assert.equal(receipt.fenceTokens.second.epoch, 2)
  const persisted = JSON.parse(readFileSync(receiptPath, 'utf8')) as typeof receipt
  assert.equal(persisted.context.packId, receipt.context.packId)
  assert.ok(persisted.events.some(event => event.event === 'write.prevented' && event.beforeEffect === true))
  assert.ok(persisted.events.some(event => event.event === 'write.stale-denied' && event.status === 409))
})
