/**
 * Host resources and account quotas for the swarm (Swarm-Ops).
 *
 * Running a fleet on one workstation is resource management first. On
 * 23.09.2026 the host ran out of disk (2.3 GB free) while eight workers built
 * and installed, and two account windows ran out mid-wave. The Brain therefore
 * measures the host, keeps the quota each account reported, and answers one
 * question before heavy work starts: is there room for it?
 *
 * Quotas are reported, not scraped: no provider exposes a subscription window
 * to a local process, so the integrator or the worker records what the app
 * shows. Labels and notes are names, never credentials.
 */
import { existsSync, statfsSync } from 'node:fs'
import { cpus, freemem, totalmem } from 'node:os'
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied } from '../access.ts'

const GB = 1024 ** 3

export interface DriveSnapshot { root: string; freeBytes: number; totalBytes: number }

export interface HostSnapshot {
  measuredAt: string
  drives: DriveSnapshot[]
  memory: { freeBytes: number; totalBytes: number }
  /** Share of CPU time spent busy since the previous sample; null on the first sample. */
  cpuBusyFraction: number | null
}

export type WorkKind = 'edit' | 'test' | 'index' | 'build' | 'install' | 'worktree'

/** Headroom each kind of work needs. Writing code never needs any. */
export const ADMISSION_LIMITS: Record<WorkKind, { minFreeDiskGb: number; minFreeMemoryFraction: number }> = {
  edit: { minFreeDiskGb: 0, minFreeMemoryFraction: 0 },
  test: { minFreeDiskGb: 5, minFreeMemoryFraction: 0.05 },
  index: { minFreeDiskGb: 10, minFreeMemoryFraction: 0.1 },
  build: { minFreeDiskGb: 20, minFreeMemoryFraction: 0.1 },
  install: { minFreeDiskGb: 20, minFreeMemoryFraction: 0.1 },
  worktree: { minFreeDiskGb: 20, minFreeMemoryFraction: 0 },
}

export const WORK_KINDS = Object.keys(ADMISSION_LIMITS) as WorkKind[]

let previousCpu: { idle: number; total: number } | null = null

function cpuTotals(): { idle: number; total: number } {
  let idle = 0
  let total = 0
  for (const cpu of cpus()) {
    const times = cpu.times
    idle += times.idle
    total += times.user + times.nice + times.sys + times.idle + times.irq
  }
  return { idle, total }
}

/**
 * Every drive that answers, on Windows; `/` elsewhere.
 *
 * The machine lane and admission must look at the same volumes, or admission
 * would call a build safe while `D:` is the disk that is actually full. So this
 * is the one place that decides what "the host's drives" means: `C:`..`Z:`
 * when the letter exists, and `/` on POSIX.
 */
export function driveRoots(): string[] {
  if (process.platform !== 'win32') return ['/']
  const roots: string[] = []
  for (let code = 'C'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code += 1) {
    const root = `${String.fromCharCode(code)}:\\`
    if (existsSync(root)) roots.push(root)
  }
  return roots
}

/** Measure the host now. Unreadable drives are skipped rather than guessed. */
export function hostSnapshot(roots: string[] = driveRoots()): HostSnapshot {
  const drives: DriveSnapshot[] = []
  for (const root of roots) {
    try {
      const stats = statfsSync(root)
      drives.push({ root, freeBytes: stats.bavail * stats.bsize, totalBytes: stats.blocks * stats.bsize })
    } catch {
      // A drive that cannot be read is absent from the snapshot, not zero.
    }
  }
  const current = cpuTotals()
  let cpuBusyFraction: number | null = null
  if (previousCpu !== null && current.total > previousCpu.total) {
    const idle = current.idle - previousCpu.idle
    const total = current.total - previousCpu.total
    cpuBusyFraction = Math.min(1, Math.max(0, 1 - idle / total))
  }
  previousCpu = current
  return {
    measuredAt: new Date().toISOString(),
    drives,
    memory: { freeBytes: freemem(), totalBytes: totalmem() },
    cpuBusyFraction,
  }
}

export interface Admission { kind: WorkKind; allowed: boolean; reasons: string[] }

/** Is there room on this host for this kind of work? */
export function admitWork(kind: WorkKind, host: HostSnapshot): Admission {
  const limits = ADMISSION_LIMITS[kind]
  const reasons: string[] = []
  if (limits.minFreeDiskGb > 0 && host.drives.length > 0) {
    const tightest = host.drives.reduce((low, drive) => drive.freeBytes < low.freeBytes ? drive : low)
    const freeGb = tightest.freeBytes / GB
    if (freeGb < limits.minFreeDiskGb) {
      reasons.push(`${tightest.root} has ${freeGb.toFixed(1)} GB free; ${kind} needs ${limits.minFreeDiskGb} GB`)
    }
  }
  if (limits.minFreeMemoryFraction > 0 && host.memory.totalBytes > 0) {
    const freeFraction = host.memory.freeBytes / host.memory.totalBytes
    if (freeFraction < limits.minFreeMemoryFraction) {
      reasons.push(`${Math.round(freeFraction * 100)} % RAM free; ${kind} needs ${Math.round(limits.minFreeMemoryFraction * 100)} %`)
    }
  }
  return { kind, allowed: reasons.length === 0, reasons }
}

// ---------------------------------------------------------------------------
// Account quotas
// ---------------------------------------------------------------------------

const CREDENTIAL_PATTERNS: RegExp[] = [
  /\b(?:sk|pk|rk)-[A-Za-z0-9_-]{16,}/,
  /\bnvapi-[A-Za-z0-9_-]{16,}/,
  /\bAIza[0-9A-Za-z_-]{20,}/,
  /\bgh[pousr]_[A-Za-z0-9]{20,}/,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/,
  // A long opaque token mixing cases and digits. Git hashes (lower-case hex)
  // and ordinary words do not match.
  /(?=[A-Za-z0-9_-]*[a-z])(?=[A-Za-z0-9_-]*[A-Z])(?=[A-Za-z0-9_-]*\d)[A-Za-z0-9_-]{32,}/,
]

/** Refuse text that looks like a secret. Labels and notes are names only. */
export function assertNotCredential(field: string, value: string): void {
  if (CREDENTIAL_PATTERNS.some(pattern => pattern.test(value))) {
    throw new AccessDenied(`${field} looks like a credential; store a name such as "nvidia:key-03", never the key`)
  }
}

/** Keep historic or imported values safe when they are shown back to a worker. */
export function redactCredentialText(value: string): string {
  return CREDENTIAL_PATTERNS.reduce((safe, pattern) => {
    const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
    return safe.replace(new RegExp(pattern.source, flags), '[REDACTED]')
  }, value)
}

export type QuotaUnit = 'percent' | 'credits' | 'requests' | 'rpm' | 'tokens'
const QUOTA_UNITS = new Set<QuotaUnit>(['percent', 'credits', 'requests', 'rpm', 'tokens'])

/**
 * When a reported remainder counts as spent. Two percent of a subscription
 * window is what a single wave of Codex tabs burns in minutes.
 */
const EXHAUSTED_AT: Record<QuotaUnit, number> = { percent: 2, credits: 0, requests: 0, rpm: 0, tokens: 0 }

export interface QuotaReport {
  account: string
  remaining: number
  unit: QuotaUnit
  resetsAt: string | null
  note: string | null
  reportedBy: string
  updatedAt: string
  exhausted: boolean
}

const QUOTA_SCHEMA = `
CREATE TABLE IF NOT EXISTS resource_quotas (
  account     TEXT PRIMARY KEY,
  remaining   REAL NOT NULL,
  unit        TEXT NOT NULL,
  resets_at   TEXT,
  note        TEXT,
  reported_by TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
`

export function ensureQuotaSchema(db: DatabaseSync): void { db.exec(QUOTA_SCHEMA) }

interface QuotaRow {
  account: string; remaining: number; unit: QuotaUnit; resets_at: string | null
  note: string | null; reported_by: string; updated_at: string
}

const toReport = (row: QuotaRow): QuotaReport => ({
  account: row.account,
  remaining: row.remaining,
  unit: row.unit,
  resetsAt: row.resets_at,
  note: row.note,
  reportedBy: row.reported_by,
  updatedAt: row.updated_at,
  exhausted: row.remaining <= EXHAUSTED_AT[row.unit],
})

export function reportQuota(
  db: DatabaseSync,
  input: { account: string; remaining: number; unit: QuotaUnit; resetsAt?: string; note?: string; reportedBy: string },
): QuotaReport {
  ensureQuotaSchema(db)
  const account = input.account.trim()
  if (account === '' || account.length > 80) throw new AccessDenied('a quota needs an account label of at most 80 characters')
  assertNotCredential('account', account)
  if (!QUOTA_UNITS.has(input.unit)) throw new AccessDenied(`unknown quota unit: ${String(input.unit)}`)
  if (!Number.isFinite(input.remaining) || input.remaining < 0) throw new AccessDenied('remaining must be a number ≥ 0')
  if (input.note !== undefined) assertNotCredential('note', input.note)
  if (input.resetsAt !== undefined && !Number.isFinite(Date.parse(input.resetsAt))) {
    throw new AccessDenied(`resetsAt is not a timestamp: ${input.resetsAt}`)
  }
  const now = new Date().toISOString()
  db.prepare(`
    INSERT INTO resource_quotas (account, remaining, unit, resets_at, note, reported_by, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(account) DO UPDATE SET
      remaining = excluded.remaining, unit = excluded.unit, resets_at = excluded.resets_at,
      note = excluded.note, reported_by = excluded.reported_by, updated_at = excluded.updated_at
  `).run(account, input.remaining, input.unit, input.resetsAt ?? null, input.note ?? null, input.reportedBy, now)
  return toReport(db.prepare('SELECT * FROM resource_quotas WHERE account = ?').get(account) as unknown as QuotaRow)
}

export function listQuotas(db: DatabaseSync): QuotaReport[] {
  ensureQuotaSchema(db)
  const rows = db.prepare('SELECT * FROM resource_quotas ORDER BY account').all() as unknown as QuotaRow[]
  return rows.map(toReport)
}
