import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { configureQuotaPool, noteQuotaRateLimit, reserveQuota, settleQuota } from '../src/coord/quota-pools.ts'

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-quota-pool-'))
  const db = openStore(join(dir, 'brain.db'))
  return { db, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('pool reservations share concurrency and rpm limits and usage settlement remains separate', () => {
  const f = fixture()
  try {
    configureQuotaPool(f.db, { id: 'nvidia:project-a', maxConcurrent: 1, maxRequestsPerMinute: 2 })
    const first = reserveQuota(f.db, { poolId: 'nvidia:project-a', attemptId: 'task-a:1' })
    assert.equal(first.allowed, true)
    assert.equal(reserveQuota(f.db, { poolId: 'nvidia:project-a', attemptId: 'task-b:1' }).reason, 'concurrency')
    const settled = settleQuota(f.db, { reservationId: first.reservation!.id, outcome: 'clean' })
    assert.equal(settled.usage, null, 'unknown usage must not be represented as zero')
    assert.equal(settled.settledAt !== null, true)
    const second = reserveQuota(f.db, { poolId: 'nvidia:project-a', attemptId: 'task-b:1' })
    assert.equal(second.allowed, true, 'separate key aliases configured to this project share the same pool')
    settleQuota(f.db, { reservationId: second.reservation!.id, outcome: 'quota' })
    assert.equal(reserveQuota(f.db, { poolId: 'nvidia:project-a', attemptId: 'task-c:1' }).reason, 'rpm')
  } finally { f.cleanup() }
})

test('Retry-After cooldown is pool-wide and capped; attempt settlement is idempotent', () => {
  const f = fixture()
  try {
    const now = new Date('2026-09-27T03:00:00.000Z')
    configureQuotaPool(f.db, { id: 'freebuff:freebucks', maxConcurrent: 2, now })
    const reservation = reserveQuota(f.db, { poolId: 'freebuff:freebucks', attemptId: 'task-a:1', now })
    const settled = settleQuota(f.db, { reservationId: reservation.reservation!.id, outcome: 'quota', now })
    assert.equal(noteQuotaRateLimit(f.db, 'freebuff:freebucks', 60_000_000, { now }), '2026-09-27T03:30:00.000Z')
    assert.equal(reserveQuota(f.db, { poolId: 'freebuff:freebucks', attemptId: 'task-b:1', now }).reason, 'cooldown')
    assert.equal(settleQuota(f.db, { reservationId: settled.id, outcome: 'duplicate', usage: 4, now }).usage, null)
  } finally { f.cleanup() }
})
