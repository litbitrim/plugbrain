import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import type { SwarmWorker } from '../types.ts'
import { isTurnStill, percentAt, sortTimelineWorkers, staleDuration, timelineBucket, timelineCounts, turnColor, workerMatchesFilters } from './turn-timeline.ts'

test('turn timeline maps end states to stable style classes', () => {
  assert.equal(turnColor('working'), 'running')
  assert.equal(turnColor('awaiting-commit'), 'awaiting-commit')
  assert.equal(turnColor('blocked'), 'blocked')
  assert.equal(turnColor('paused'), 'paused')
  assert.equal(turnColor('needs-task'), 'needs-task')
})

test('turn timeline marks only open turns older than thirty minutes as still', () => {
  const now = Date.parse('2026-09-26T20:00:00.000Z')
  assert.equal(isTurnStill('2026-09-26T19:29:59.000Z', null, now), true)
  assert.equal(isTurnStill('2026-09-26T19:30:01.000Z', null, now), false)
  assert.equal(isTurnStill('2026-09-26T19:00:00.000Z', '2026-09-26T19:20:00.000Z', now), false)
})

function worker(id: string, state: string, lastHeartbeat = '2026-09-26T19:59:00.000Z', account = 'acct'): SwarmWorker {
  return { id, name: id, color: '', surface: null, account, model: null, presence: 'active', lastHeartbeat,
    turnState: state, turnStateAt: lastHeartbeat, turnSummary: null, retired: false, unread: 0, task: null,
    leases: [], worktrees: [] }
}

test('timeline sorts urgent states first, then account and name within a state', () => {
  const now = Date.parse('2026-09-26T20:00:00.000Z')
  const windowStart = now - 60 * 60_000
  const sorted = sortTimelineWorkers([
    worker('working', 'working'), worker('blocked', 'blocked'), worker('waiting', 'awaiting-commit'),
    worker('still', 'working', '2026-09-26T19:00:00.000Z'), worker('needs', 'needs-task'),
    worker('paused', 'paused'),
  ], windowStart, now, now)
  assert.deepEqual(sorted.map(item => item.id), ['blocked', 'still', 'waiting', 'working', 'needs', 'paused'])
})

test('workers without contact in the selected range are folded and old working status is labeled stale', () => {
  const now = Date.parse('2026-09-26T20:00:00.000Z')
  const windowStart = now - 60 * 60_000
  const old = worker('old', 'working', '2026-09-23T20:00:00.000Z')
  assert.equal(timelineBucket(old, windowStart, now, now), 'resting')
  assert.equal(staleDuration(old.lastHeartbeat, now), '3 Tagen')
  assert.equal(timelineBucket(worker('paused', 'paused'), windowStart, now, now), 'resting')
  assert.equal(timelineBucket(worker('fresh', 'working'), windowStart, now, now), 'working')
})

test('summary filters select matching lanes and can be cleared by toggling off', () => {
  const now = Date.parse('2026-09-26T20:00:00.000Z')
  const windowStart = now - 60 * 60_000
  const working = worker('working', 'working')
  const waiting = worker('waiting', 'awaiting-commit')
  const unread = { ...worker('unread', 'needs-task'), unread: 2 }
  assert.equal(workerMatchesFilters(working, new Set(['working']), windowStart, now, now), true)
  assert.equal(workerMatchesFilters(waiting, new Set(['working']), windowStart, now, now), false)
  assert.equal(workerMatchesFilters(waiting, new Set(['awaiting']), windowStart, now, now), true)
  assert.equal(workerMatchesFilters(unread, new Set(['unread']), windowStart, now, now), true)
  assert.equal(workerMatchesFilters(unread, new Set(), windowStart, now, now), true)
  assert.equal(timelineCounts([working, waiting, unread], windowStart, now, now).unread, 2)
})

test('time coordinates stay bounded to the selected window', () => {
  const start = Date.parse('2026-09-26T19:00:00.000Z')
  const end = Date.parse('2026-09-26T20:00:00.000Z')
  assert.equal(percentAt('2026-09-26T18:00:00.000Z', start, end), 0)
  assert.equal(percentAt('2026-09-26T19:30:00.000Z', start, end), 50)
  assert.equal(percentAt('2026-09-26T21:00:00.000Z', start, end), 100)
})
