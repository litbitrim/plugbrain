import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { resolveModelFamily } from '../src/coord/model-family.ts'

test('registered model IDs resolve to a recognized model family', () => {
  assert.deepEqual(resolveModelFamily(' GPT-6-Luna '), { family: 'openai', modelId: 'gpt-6-luna' })
  assert.deepEqual(resolveModelFamily('claude-sonnet-4'), { family: 'anthropic', modelId: 'claude-sonnet-4' })
  assert.deepEqual(resolveModelFamily('gemini-2.5-pro'), { family: 'google', modelId: 'gemini-2.5-pro' })
  assert.deepEqual(resolveModelFamily('nemotron-3-super-120b-a12b'), { family: 'nvidia', modelId: 'nemotron-3-super-120b-a12b' })
  assert.deepEqual(resolveModelFamily('nvidia/nemotron-3-ultra'), { family: 'nvidia', modelId: 'nvidia/nemotron-3-ultra' })
})

test('missing and unknown or stale deployment model labels do not infer a family', () => {
  assert.deepEqual(resolveModelFamily(null), { family: null, modelId: null, reason: 'missing-model' })
  assert.deepEqual(resolveModelFamily('custom-deployment-2026-09'), {
    family: null, modelId: 'custom-deployment-2026-09', reason: 'unknown-model',
  })
})
