/**
 * Hardware awareness, step 1: what this machine is doing right now.
 *
 * On 25.09.2026 C: ran from 17 GB free to 0.5 GB in a single session — games
 * ballooned the pagefile to 31 GB and nobody saw the wall coming until a build
 * failed. This module is the half of PlugBrain that watches the host itself:
 * free and total space per drive, the pagefile, RAM and CPU load, and a free
 * space series that is honest enough to answer the only question that matters
 * before it is too late — "when will this disk be full?"
 *
 * Three rules, the same ones the git guard follows:
 *
 *   - MEASURE, DO NOT GUESS. Every number here comes from `node:os` or
 *     `statfs`; whatever cannot be read is `null` and named in `unavailable`.
 *   - NO ADMIN. `pagefile.sys` is only `stat`ed, never opened, and a refusal is
 *     a fact to report rather than a crash.
 *   - BOUNDED. The series keeps 24 h at a five-minute cadence and the forecast
 *     looks at at most the last hour, so the cost never grows with uptime.
 */
import { existsSync, statSync } from 'node:fs'
import type { DatabaseSync } from 'node:sqlite'
import { hostSnapshot, type DriveSnapshot } from '../coord/resources.ts'

const GB = 1024 ** 3

/** Worst-first level of a machine finding. */
export type MachineLevel = 'ok' | 'attention' | 'risk'

export interface MachineDrive {
  mount: string
  freeGb: number
  totalGb: number
  level: MachineLevel
}

/** One projected crossing of a free-space trend. */
export interface MachineForecast {
  mount: string
  /** Hours until the drive is full at the current rate; null when it is not falling. */
  fullInHours: number | null
  /** Free-space change per hour; negative means it is filling up. */
  trendGbPerHour: number
  /** Which window the regression used, e.g. "last 60 min". */
  basis: string
}

export interface MachineFinding {
  level: MachineLevel
  text: string
  fix: string
  paths: string[]
}

export interface MachineReport {
  checkedAt: string
  drives: MachineDrive[]
  pagefile: { sizeGb: number | null }
  memory: { freeGb: number | null; totalGb: number | null }
  cpu: { load: number | null }
  forecast: MachineForecast[]
  findings: MachineFinding[]
  unavailable: string[]
}

/** One recorded free-space point. Stored so a forecast can outlive one process. */
export interface MachineSample {
  mount: string
  at: string
  freeGb: number
}

export interface MachineOptions {
  /** Which volumes to measure. Defaults to the system drive plus any lettered drive. */
  roots?: string[]
  /** Injection points, so tests do not depend on this host's real hardware. */
  snapshot?: () => { drives: DriveSnapshot[]; memory: { freeBytes: number; totalBytes: number }; cpuBusyFraction: number | null }
  pagefileGb?: () => number | null
  now?: Date
  /** How far back the forecast looks; 60 min by construction of the owner's case. */
  forecastWindowMs?: number
}

/** Thresholds from the brief: < 20 GB attention, < 10 GB risk, < 2 h to full risk. */
export const FREE_ATTENTION_GB = 20
export const FREE_RISK_GB = 10
export const FORECAST_RISK_HOURS = 2
export const SAMPLE_INTERVAL_MS = 5 * 60 * 1000
export const SAMPLE_RETENTION_MS = 24 * 60 * 60 * 1000

const round1 = (value: number): number => Math.round(value * 10) / 10

/**
 * Every drive letter that answers, on Windows; `/` elsewhere.
 *
 * `node:os` does not enumerate volumes, so the honest way is to ask each mount
 * and keep the ones `statfs` can read. A: and B: are historically floppies and
 * are skipped; a network drive that hangs is not statfs'ed because Windows
 * reports it as a remote type we filter by trying, which is bounded by the
 * filesystem call itself.
 */
export function defaultDriveRoots(): string[] {
  if (process.platform !== 'win32') return ['/']
  const roots: string[] = []
  for (let code = 'C'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code += 1) {
    const root = `${String.fromCharCode(code)}:\\`
    if (existsSync(root)) roots.push(root)
  }
  return roots
}

/**
 * Size of the Windows pagefile, from its metadata only.
 *
 * Opening `pagefile.sys` would need admin and would read 30 GB we do not want;
 * `stat` reports its size without either. On any other platform, and whenever
 * the file is not there, the answer is null and the caller marks it unavailable.
 */
export function pagefileSizeGb(): number | null {
  if (process.platform !== 'win32') return null
  const drive = process.env.SystemDrive ?? 'C:'
  try {
    const stats = statSync(`${drive}\\pagefile.sys`)
    return round1(stats.size / GB)
  } catch {
    return null
  }
}

/** Level for a drive by its free space alone. */
export function driveLevel(freeGb: number): MachineLevel {
  if (freeGb < FREE_RISK_GB) return 'risk'
  if (freeGb < FREE_ATTENTION_GB) return 'attention'
  return 'ok'
}

export interface TrendPoint {
  atMs: number
  freeGb: number
}

/**
 * Least-squares slope of a free-space series, in GB per hour.
 *
 * Only points inside the window are used, and a slope that is zero or positive
 * is a flat or recovering disk — returned as a trend, never as a fake
 * "full in 0 h". The caller decides whether a falling trend deserves a forecast.
 */
export function linearTrend(
  points: TrendPoint[],
  nowMs: number,
  windowMs: number,
): { trendGbPerHour: number; latestFreeGb: number | null; points: number } {
  const inWindow = points
    .filter(point => point.atMs >= nowMs - windowMs && point.atMs <= nowMs)
    .sort((a, b) => a.atMs - b.atMs)
  if (inWindow.length < 2) {
    const latest = inWindow.length === 1 ? inWindow[0]!.freeGb : null
    return { trendGbPerHour: 0, latestFreeGb: latest, points: inWindow.length }
  }
  const hours = inWindow.map(point => (point.atMs - nowMs) / 3_600_000)
  const meanX = hours.reduce((sum, x) => sum + x, 0) / hours.length
  const meanY = inWindow.reduce((sum, point) => sum + point.freeGb, 0) / inWindow.length
  let numerator = 0
  let denominator = 0
  for (let index = 0; index < inWindow.length; index += 1) {
    const dx = hours[index]! - meanX
    numerator += dx * (inWindow[index]!.freeGb - meanY)
    denominator += dx * dx
  }
  const slope = denominator === 0 ? 0 : numerator / denominator
  return { trendGbPerHour: slope, latestFreeGb: inWindow[inWindow.length - 1]!.freeGb, points: inWindow.length }
}

/** Turn a series per mount into the contract's `forecast` array. */
export function forecastFrom(
  series: Map<string, TrendPoint[]>,
  nowMs: number,
  windowMs: number,
): MachineForecast[] {
  const basisMinutes = Math.round(windowMs / 60_000)
  const result: MachineForecast[] = []
  for (const [mount, points] of series) {
    const { trendGbPerHour, latestFreeGb, points: count } = linearTrend(points, nowMs, windowMs)
    if (count < 2) continue
    const falling = trendGbPerHour < 0 && latestFreeGb !== null
    const fullInHours = falling && latestFreeGb !== null && latestFreeGb > 0
      ? round1(latestFreeGb / -trendGbPerHour)
      : null
    result.push({
      mount,
      fullInHours,
      trendGbPerHour: round1(trendGbPerHour),
      basis: `last ${basisMinutes} min`,
    })
  }
  return result.sort((a, b) => a.mount.localeCompare(b.mount))
}

// ---------------------------------------------------------------------------
// The free-space series, persisted so a forecast survives a restart
// ---------------------------------------------------------------------------

const SAMPLES_SCHEMA = `
CREATE TABLE IF NOT EXISTS machine_samples (
  mount   TEXT NOT NULL,
  at      TEXT NOT NULL,
  free_gb REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_machine_samples_mount_at ON machine_samples(mount, at);
`

export function ensureMachineSchema(db: DatabaseSync): void {
  db.exec(SAMPLES_SCHEMA)
}

/** Record one point per drive. Idempotent enough: duplicates only waste a row. */
export function recordSamples(db: DatabaseSync, report: MachineReport): void {
  ensureMachineSchema(db)
  const insert = db.prepare('INSERT INTO machine_samples (mount, at, free_gb) VALUES (?, ?, ?)')
  for (const drive of report.drives) {
    insert.run(drive.mount, report.checkedAt, drive.freeGb)
  }
}

interface SampleRow { mount: string; at: string; free_gb: number }

/** All samples newer than `sinceIso`, grouped per mount and ready for a trend. */
export function seriesSince(db: DatabaseSync, sinceIso: string): Map<string, TrendPoint[]> {
  ensureMachineSchema(db)
  const rows = db.prepare(
    'SELECT mount, at, free_gb FROM machine_samples WHERE at >= ? ORDER BY mount, at').all(sinceIso) as unknown as SampleRow[]
  const series = new Map<string, TrendPoint[]>()
  for (const row of rows) {
    const point = { atMs: Date.parse(row.at), freeGb: row.free_gb }
    if (!Number.isFinite(point.atMs)) continue
    const list = series.get(row.mount)
    if (list === undefined) series.set(row.mount, [point])
    else list.push(point)
  }
  return series
}

/** Drop points past the 24 h retention, so the table never grows without bound. */
export function pruneSamples(db: DatabaseSync, beforeIso: string): number {
  ensureMachineSchema(db)
  const result = db.prepare('DELETE FROM machine_samples WHERE at < ?').run(beforeIso)
  return Number(result.changes)
}

// ---------------------------------------------------------------------------
// The report
// ---------------------------------------------------------------------------

/**
 * Measure this machine now, add the persisted series and a forecast, and store
 * the new point. The caller (findings) turns this into sentences.
 */
export function collectMachine(db: DatabaseSync, options: MachineOptions = {}): MachineReport {
  const now = options.now ?? new Date()
  const nowMs = now.getTime()
  const windowMs = options.forecastWindowMs ?? 60 * 60 * 1000
  const unavailable: string[] = []

  const roots = options.roots ?? defaultDriveRoots()
  const snapshot = (options.snapshot ?? (() => {
    const host = hostSnapshot(roots.length > 0 ? roots : undefined)
    return { drives: host.drives, memory: host.memory, cpuBusyFraction: host.cpuBusyFraction }
  }))()

  const drives: MachineDrive[] = snapshot.drives.map(drive => {
    const freeGb = round1(drive.freeBytes / GB)
    return {
      mount: drive.root,
      freeGb,
      totalGb: round1(drive.totalBytes / GB),
      level: driveLevel(freeGb),
    }
  })
  if (drives.length === 0) unavailable.push('drives')

  const pagefileRaw = (options.pagefileGb ?? pagefileSizeGb)()
  if (pagefileRaw === null) unavailable.push('pagefile')

  const memoryFreeGb = snapshot.memory.totalBytes > 0 ? round1(snapshot.memory.freeBytes / GB) : null
  const memoryTotalGb = snapshot.memory.totalBytes > 0 ? round1(snapshot.memory.totalBytes / GB) : null
  if (memoryTotalGb === null) unavailable.push('memory')

  const cpuLoad = snapshot.cpuBusyFraction === null ? null : round1(snapshot.cpuBusyFraction)
  if (cpuLoad === null) unavailable.push('cpu')

  const report: MachineReport = {
    checkedAt: now.toISOString(),
    drives,
    pagefile: { sizeGb: pagefileRaw },
    memory: { freeGb: memoryFreeGb, totalGb: memoryTotalGb },
    cpu: { load: cpuLoad },
    forecast: [],
    findings: [],
    unavailable,
  }

  recordSamples(db, report)
  pruneSamples(db, new Date(nowMs - SAMPLE_RETENTION_MS).toISOString())
  report.forecast = forecastFrom(seriesSince(db, new Date(nowMs - windowMs).toISOString()), nowMs, windowMs)

  return report
}

/** Re-export for callers that only need the raw host numbers. */
export { hostSnapshot }
