/** Shared, transactional quota pools for supervised fleet runs. */
import { randomUUID } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied } from '../access.ts'

export interface QuotaPool {
  id: string
  maxConcurrent: number
  maxRequestsPerMinute: number | null
  blockedUntil: string | null
  updatedAt: string
}

export interface QuotaReservation {
  id: string
  poolId: string
  attemptId: string
  reservedAt: string
  settledAt: string | null
  usage: number | null
  outcome: string | null
}

export interface QuotaAdmission { allowed: boolean; reason?: 'concurrency' | 'rpm' | 'cooldown'; retryAt?: string }
export interface QuotaPoolSummary extends QuotaPool {
  activeReservations: number
  settledAttempts: number
  attemptsWithUnknownUsage: number
  reportedUsage: number
}

export function ensureQuotaPoolSchema(db: DatabaseSync): void {
  db.exec(`
CREATE TABLE IF NOT EXISTS quota_pools (
  id TEXT PRIMARY KEY, max_concurrent INTEGER NOT NULL CHECK(max_concurrent > 0),
  max_requests_per_minute INTEGER CHECK(max_requests_per_minute IS NULL OR max_requests_per_minute > 0),
  blocked_until TEXT, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS quota_reservations (
  id TEXT PRIMARY KEY, pool_id TEXT NOT NULL REFERENCES quota_pools(id), attempt_id TEXT NOT NULL UNIQUE,
  reserved_at TEXT NOT NULL, settled_at TEXT, usage REAL, outcome TEXT
);
CREATE INDEX IF NOT EXISTS idx_quota_reservations_pool_active ON quota_reservations(pool_id, settled_at);
CREATE INDEX IF NOT EXISTS idx_quota_reservations_pool_time ON quota_reservations(pool_id, reserved_at);
`)
}

export function configureQuotaPool(db: DatabaseSync, input: {
  id: string; maxConcurrent: number; maxRequestsPerMinute?: number | null; now?: Date
}): QuotaPool {
  ensureQuotaPoolSchema(db)
  const id = input.id.trim()
  if (id === '' || id.length > 80) throw new AccessDenied('quota pool id must contain 1 to 80 characters')
  if (!Number.isInteger(input.maxConcurrent) || input.maxConcurrent < 1 || input.maxConcurrent > 1000) {
    throw new AccessDenied('maxConcurrent must be an integer from 1 to 1000')
  }
  const rpm = input.maxRequestsPerMinute ?? null
  if (rpm !== null && (!Number.isInteger(rpm) || rpm < 1 || rpm > 1_000_000)) {
    throw new AccessDenied('maxRequestsPerMinute must be null or an integer from 1 to 1000000')
  }
  const updatedAt = (input.now ?? new Date()).toISOString()
  db.prepare(`INSERT INTO quota_pools (id, max_concurrent, max_requests_per_minute, blocked_until, updated_at)
    VALUES (?, ?, ?, NULL, ?) ON CONFLICT(id) DO UPDATE SET
    max_concurrent=excluded.max_concurrent, max_requests_per_minute=excluded.max_requests_per_minute,
    updated_at=excluded.updated_at`).run(id, input.maxConcurrent, rpm, updatedAt)
  return getQuotaPool(db, id)!
}

export function getQuotaPool(db: DatabaseSync, id: string): QuotaPool | null {
  ensureQuotaPoolSchema(db)
  const row = db.prepare('SELECT * FROM quota_pools WHERE id = ?').get(id) as
    { id: string; max_concurrent: number; max_requests_per_minute: number | null; blocked_until: string | null; updated_at: string } | undefined
  return row ? { id: row.id, maxConcurrent: row.max_concurrent, maxRequestsPerMinute: row.max_requests_per_minute,
    blockedUntil: row.blocked_until, updatedAt: row.updated_at } : null
}

export function listQuotaPools(db: DatabaseSync): QuotaPool[] {
  ensureQuotaPoolSchema(db)
  return (db.prepare('SELECT * FROM quota_pools ORDER BY id').all() as Array<{
    id: string; max_concurrent: number; max_requests_per_minute: number | null; blocked_until: string | null; updated_at: string
  }>).map(row => ({ id: row.id, maxConcurrent: row.max_concurrent, maxRequestsPerMinute: row.max_requests_per_minute,
    blockedUntil: row.blocked_until, updatedAt: row.updated_at }))
}

export function quotaPoolSummary(db: DatabaseSync, id: string): QuotaPoolSummary | null {
  const pool = getQuotaPool(db, id)
  if (!pool) return null
  const counts = db.prepare(`SELECT
    SUM(CASE WHEN settled_at IS NULL THEN 1 ELSE 0 END) AS active,
    SUM(CASE WHEN settled_at IS NOT NULL THEN 1 ELSE 0 END) AS settled,
    SUM(CASE WHEN settled_at IS NOT NULL AND usage IS NULL THEN 1 ELSE 0 END) AS unknown_usage,
    SUM(COALESCE(usage, 0)) AS reported_usage
    FROM quota_reservations WHERE pool_id = ?`).get(id) as
    { active: number | null; settled: number | null; unknown_usage: number | null; reported_usage: number | null }
  return { ...pool, activeReservations: counts.active ?? 0, settledAttempts: counts.settled ?? 0,
    attemptsWithUnknownUsage: counts.unknown_usage ?? 0, reportedUsage: counts.reported_usage ?? 0 }
}

/** Reserve under BEGIN IMMEDIATE so simultaneous workers cannot pass the same slot. */
export function reserveQuota(db: DatabaseSync, input: { poolId: string; attemptId: string; now?: Date }): QuotaAdmission & { reservation?: QuotaReservation } {
  ensureQuotaPoolSchema(db)
  const now = input.now ?? new Date()
  const nowIso = now.toISOString()
  db.exec('BEGIN IMMEDIATE')
  try {
    const pool = getQuotaPool(db, input.poolId)
    if (!pool) throw new AccessDenied(`quota pool is not configured: ${input.poolId}`)
    const duplicate = db.prepare('SELECT * FROM quota_reservations WHERE attempt_id = ?').get(input.attemptId) as unknown as ReservationRow | undefined
    if (duplicate) {
      db.exec('COMMIT')
      return { allowed: duplicate.settled_at === null, ...(duplicate.settled_at === null ? { reservation: reservationOf(duplicate) } : { reason: 'concurrency' as const }) }
    }
    if (pool.blockedUntil !== null && Date.parse(pool.blockedUntil) > now.getTime()) {
      db.exec('COMMIT'); return { allowed: false, reason: 'cooldown', retryAt: pool.blockedUntil }
    }
    const active = Number((db.prepare('SELECT COUNT(*) AS n FROM quota_reservations WHERE pool_id = ? AND settled_at IS NULL')
      .get(input.poolId) as { n: number }).n)
    if (active >= pool.maxConcurrent) { db.exec('COMMIT'); return { allowed: false, reason: 'concurrency' } }
    if (pool.maxRequestsPerMinute !== null) {
      const recent = Number((db.prepare('SELECT COUNT(*) AS n FROM quota_reservations WHERE pool_id = ? AND reserved_at >= ?')
        .get(input.poolId, new Date(now.getTime() - 60_000).toISOString()) as { n: number }).n)
      if (recent >= pool.maxRequestsPerMinute) { db.exec('COMMIT'); return { allowed: false, reason: 'rpm' } }
    }
    const row: ReservationRow = { id: `qres-${randomUUID()}`, pool_id: input.poolId, attempt_id: input.attemptId,
      reserved_at: nowIso, settled_at: null, usage: null, outcome: null }
    db.prepare('INSERT INTO quota_reservations (id,pool_id,attempt_id,reserved_at) VALUES (?,?,?,?)')
      .run(row.id, row.pool_id, row.attempt_id, row.reserved_at)
    db.exec('COMMIT')
    return { allowed: true, reservation: reservationOf(row) }
  } catch (error) { db.exec('ROLLBACK'); throw error }
}

interface ReservationRow { id: string; pool_id: string; attempt_id: string; reserved_at: string; settled_at: string | null; usage: number | null; outcome: string | null }
const reservationOf = (row: ReservationRow): QuotaReservation => ({ id: row.id, poolId: row.pool_id,
  attemptId: row.attempt_id, reservedAt: row.reserved_at, settledAt: row.settled_at, usage: row.usage, outcome: row.outcome })

/** Usage is nullable: missing provider usage is unknown and is never recorded as zero. */
export function settleQuota(db: DatabaseSync, input: { reservationId: string; outcome: string; usage?: number | null; now?: Date }): QuotaReservation {
  ensureQuotaPoolSchema(db)
  const usage = input.usage ?? null
  if (usage !== null && (!Number.isFinite(usage) || usage < 0)) throw new AccessDenied('quota usage must be null or a non-negative number')
  const row = db.prepare('SELECT * FROM quota_reservations WHERE id = ?').get(input.reservationId) as unknown as ReservationRow | undefined
  if (!row) throw new AccessDenied('quota reservation not found')
  if (row.settled_at === null) db.prepare('UPDATE quota_reservations SET settled_at = ?, usage = ?, outcome = ? WHERE id = ? AND settled_at IS NULL')
    .run((input.now ?? new Date()).toISOString(), usage, input.outcome, row.id)
  return reservationOf(db.prepare('SELECT * FROM quota_reservations WHERE id = ?').get(row.id) as unknown as ReservationRow)
}

/** Provider 429 state is shared by every worker using this pool and always bounded. */
export function noteQuotaRateLimit(db: DatabaseSync, poolId: string, retryAfterMs: number, options: { now?: Date; maxBackoffMs?: number } = {}): string {
  ensureQuotaPoolSchema(db)
  if (!Number.isFinite(retryAfterMs) || retryAfterMs < 0) throw new AccessDenied('retry delay must be a non-negative number')
  const delay = Math.min(options.maxBackoffMs ?? 30 * 60_000, Math.max(1000, retryAfterMs))
  const until = new Date((options.now ?? new Date()).getTime() + delay).toISOString()
  const result = db.prepare('UPDATE quota_pools SET blocked_until = ?, updated_at = ? WHERE id = ?').run(until, (options.now ?? new Date()).toISOString(), poolId)
  if (Number(result.changes) !== 1) throw new AccessDenied(`quota pool is not configured: ${poolId}`)
  return until
}

export function noteQuotaAuthFailure(db: DatabaseSync, poolId: string, now = new Date()): void {
  ensureQuotaPoolSchema(db)
  const result = db.prepare('UPDATE quota_pools SET blocked_until = ?, updated_at = ? WHERE id = ?')
    .run('9999-12-31T23:59:59.999Z', now.toISOString(), poolId)
  if (Number(result.changes) !== 1) throw new AccessDenied(`quota pool is not configured: ${poolId}`)
}
