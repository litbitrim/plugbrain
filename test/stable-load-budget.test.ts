import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { classifyHostLoad } from './helpers/stable-load-budget.ts'

test('stable load budget: classifies a sustained scheduler stall as HOST_OVERLOADED', () => {
  const state = classifyHostLoad({ samples: [240, 270, 310, 290, 260], median: 270 })
  assert.equal(state.status, 'HOST_OVERLOADED')
  assert.match(state.reason, /HOST_OVERLOADED/)
})

test('stable load budget: keeps a single scheduler outlier out of the overload classification', () => {
  const state = classifyHostLoad({ samples: [1, 3, 280, 4, 2], median: 3 })
  assert.equal(state.status, 'HOST_READY')
})
