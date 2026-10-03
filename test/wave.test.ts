import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { checkWave, workerKey } from '../src/coord/wave.ts'

/**
 * Synthetic wave fixtures. They carry no real paths, worker names from the
 * live fleet, or credentials — only the shape `enqueue-wave.mjs` consumes.
 */
function card(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'T-1', plan: 'M18', goal: 'Ziel', scope: 'ein Pfad', accept: 'test exit 0', steps: 'CR',
    ...overrides,
  }
}

function wave(cards: Array<Record<string, unknown>>): Record<string, unknown> {
  return { wave: 'TEST-01', profiles: { brain: {}, doc: {} }, cards }
}

test('a well-formed wave passes with no errors', () => {
  const report = checkWave(wave([
    card({ id: 'A', steps: 'CR', to: { C: 'x-nv01a', R: 'x-nv02b' } }),
    card({ id: 'B', steps: 'CR', after: 'A' }),
    card({ id: 'C', plan: 'M18', scope: '-', accept: '-', steps: 'R', hold: true }),
  ]))
  assert.equal(report.ok, true)
  assert.equal(report.errorCount, 0)
  assert.equal(report.cardCount, 3)
  assert.equal(report.wave, 'TEST-01')
  assert.deepEqual(report.infos.map(issue => issue.code), ['card.hold'])
})

test('missing Pflichtfelder are reported per card', () => {
  const report = checkWave(wave([
    card({ id: 'A', goal: '', scope: null, accept: undefined, steps: '' }),
  ]))
  assert.equal(report.ok, false)
  const fields = report.errors.filter(issue => issue.code === 'card.missing-field').map(issue => issue.message)
  for (const field of ['goal', 'scope', 'accept', 'steps']) {
    assert.ok(fields.some(message => message.includes(`"${field}"`)), `missing ${field} reported`)
  }
  assert.deepEqual(report.errors.find(issue => issue.code === 'card.missing-field')?.cardId, 'A')
})

test('a missing id and duplicate ids are errors', () => {
  const report = checkWave(wave([
    card({ id: 'A' }),
    card({ id: 'A' }),
    card({ id: '' }),
  ]))
  assert.equal(report.errorCount, 2)
  assert.equal(report.errors.filter(issue => issue.code === 'card.duplicate-id').length, 1)
  assert.equal(report.errors.filter(issue => issue.code === 'card.missing-id').length, 1)
})

test('unknown and self after references are errors', () => {
  const report = checkWave(wave([
    card({ id: 'A', after: 'GHOST' }),
    card({ id: 'B', after: 'B' }),
  ]))
  assert.equal(report.ok, false)
  assert.ok(report.errors.some(issue => issue.code === 'card.after-unknown' && issue.cardId === 'A'))
  assert.ok(report.errors.some(issue => issue.code === 'card.after-self' && issue.cardId === 'B'))
})

test('a cyclic after chain is reported once', () => {
  const report = checkWave(wave([
    card({ id: 'A', after: 'C' }),
    card({ id: 'B', after: 'A' }),
    card({ id: 'C', after: 'B' }),
  ]))
  const cycles = report.errors.filter(issue => issue.code === 'card.after-cycle')
  assert.equal(cycles.length, 1)
  assert.equal(report.ok, false)
})

test('a reviewer sharing the coder key pool is an error, a different pool is not', () => {
  const collision = checkWave(wave([card({ id: 'A', steps: 'CR', to: { C: 'x-nv01a', R: 'x-nv01b' } })]))
  assert.ok(collision.errors.some(issue => issue.code === 'card.reviewer-key-collision'))
  const safe = checkWave(wave([card({ id: 'A', steps: 'CR', to: { C: 'x-nv01a', R: 'x-nv02b' } })]))
  assert.equal(safe.ok, true)
  assert.equal(safe.errorCount, 0)
})

test('an explicit reviewer with an automatically assigned coder is a warning', () => {
  const report = checkWave(wave([card({ id: 'A', steps: 'CR', to: { R: 'x-nv01b' } })]))
  assert.equal(report.ok, true)
  assert.deepEqual(report.warnings.map(issue => issue.code), ['card.coder-key-unpinned'])
})

test('a card waiting for a hold card can never run', () => {
  const report = checkWave(wave([
    card({ id: 'HELD', hold: true, scope: '-', accept: '-' }),
    card({ id: 'WAITS', after: 'HELD' }),
  ]))
  assert.ok(report.errors.some(issue => issue.code === 'card.after-hold' && issue.cardId === 'WAITS'))
})

test('steps and profile are checked', () => {
  const report = checkWave(wave([
    card({ id: 'A', steps: 'CX' }),
    card({ id: 'B', profile: 'missing-profile' }),
  ]))
  assert.ok(report.errors.some(issue => issue.code === 'card.steps-unknown'))
  assert.ok(report.warnings.some(issue => issue.code === 'card.profile-unknown'))
})

test('workerKey follows the enqueuer rule and honours an explicit keys map', () => {
  assert.equal(workerKey('x-nv01b'), 'x-nv01')
  assert.equal(workerKey('x-nv01a'), workerKey('x-nv01b'))
  assert.equal(workerKey('x-nv01a', { 'x-nv01a': 'pool-x' }), 'pool-x')
})

test('a non-object wave is refused instead of throwing', () => {
  const cases: unknown[] = [null, 42, 'wave', []]
  for (const input of cases) {
    const report = checkWave(input)
    assert.equal(report.ok, false)
    assert.equal(report.errors[0]?.code, 'wave.not-object')
  }
})
