import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { sourceReadWithin } from '../ui/src/views/source-load.ts'

test('a primary source read completes independently of metadata work', async () => {
  assert.equal(await sourceReadWithin(Promise.resolve('source bytes'), 50), 'source bytes')
})

test('a blocked primary source read becomes a retryable error instead of a permanent spinner', async () => {
  await assert.rejects(
    sourceReadWithin(new Promise<never>(() => {}), 5),
    /Brain-Dateiabruf hat nach 0\.005 Sekunden nicht geantwortet/,
  )
})
