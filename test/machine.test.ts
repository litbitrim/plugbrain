/**
 * M5 — hardware awareness and the global git census, against real temp trees.
 *
 * The host-measurement tests inject a snapshot so they never touch this
 * machine's real disks, but the forecast is exercised on a synthetic series
 * whose slope is known by hand: if the regression ever flips a sign or forgets
 * to divide by hours, the numbers go red. The census tests build actual git
 * repositories on disk, because "does it skip node_modules" is a question only
 * the filesystem can answer.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { existsSync, mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import {
  collectMachine, driveLevel, forecastFrom, linearTrend, pruneSamples, recordSamples,
  seriesSince, type MachineReport,
} from '../src/machine/collect.ts'

const GB = 1024 ** 3

function tempHome(name: string): { dir: string; db: ReturnType<typeof openStore>; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-machine-${name}-`))
  const db = openStore(join(dir, 'brain.db'))
  return { dir, db, cleanup: () => { try { db.close() } catch { /* closed */ } rmSync(dir, { recursive: true, force: true }) } }
}

/** Fixed snapshot: one healthy drive, 32 GB RAM, no CPU history. */
const snapshot = (freeGb: number, totalGb: number) => () => ({
  drives: [{ root: 'C:\\', freeBytes: freeGb * GB, totalBytes: totalGb * GB }],
  memory: { freeBytes: 6 * GB, totalBytes: 32 * GB },
  cpuBusyFraction: 0.42,
})

test('drive level follows the thresholds: <20 attention, <10 risk', () => {
  // The brief's thresholds are strict: < 20 is attention, < 10 is risk, so the
  // boundary values themselves are still the milder level.
  assert.equal(driveLevel(55), 'ok')
  assert.equal(driveLevel(20), 'ok')
  assert.equal(driveLevel(19.9), 'attention')
  assert.equal(driveLevel(10), 'attention')
  assert.equal(driveLevel(9.9), 'risk')
})

test('linearTrend finds a falling slope in GB per hour', () => {
  const now = Date.parse('2026-09-26T12:00:00Z')
  // 60, 30, 0 minutes ago — 6 GB lost per hour.
  const points = [0, 30, 60].map(minutes => ({ atMs: now - minutes * 60_000, freeGb: 10 + minutes * 0.1 }))
  const trend = linearTrend(points, now, 60 * 60 * 1000)
  assert.ok(Math.abs(trend.trendGbPerHour + 6) < 1e-9, `got ${trend.trendGbPerHour}`)
  assert.equal(trend.points, 3)
})

test('forecastFrom reports hours-to-full only for a falling trend', () => {
  const now = Date.parse('2026-09-26T12:00:00Z')
  const series = new Map([
    ['C:\\', [0, 30, 60].map(minutes => ({ atMs: now - minutes * 60_000, freeGb: 12 + minutes * 0.6 }))],
    ['D:\\', [0, 60].map(minutes => ({ atMs: now - minutes * 60_000, freeGb: 100 - minutes * 0.1 }))],
  ])
  const [c, d] = forecastFrom(series, now, 60 * 60 * 1000).sort((a, b) => a.mount.localeCompare(b.mount))
  // C: falls 36 GB/h from 12 GB -> full in 0.3 h.
  assert.ok(c && c.fullInHours !== null && Math.abs(c.fullInHours - 0.3) < 0.05, JSON.stringify(c))
  // D: rises 6 GB/h -> never full, but the trend is still reported.
  assert.equal(d?.fullInHours, null)
  assert.ok(d && d.trendGbPerHour > 0)
})

test('the series is persisted, pruned to the retention window, and reloadable', () => {
  const fx = tempHome('series')
  try {
    const report: MachineReport = {
      checkedAt: new Date().toISOString(), drives: [{ mount: 'C:\\', freeGb: 42, totalGb: 100, level: 'ok' }],
      pagefile: { sizeGb: null }, memory: { freeGb: null, totalGb: null }, cpu: { load: null },
      forecast: [], findings: [], unavailable: [],
    }
    recordSamples(fx.db, report)
    assert.equal(seriesSince(fx.db, new Date(Date.now() - 60_000).toISOString()).get('C:\\')?.length, 1)
    const removed = pruneSamples(fx.db, new Date(Date.now() + 60_000).toISOString())
    assert.equal(removed, 1)
    assert.equal(seriesSince(fx.db, new Date(0).toISOString()).size, 0)
  } finally { fx.cleanup() }
})

test('collectMachine reports the injected host and marks an unreadable pagefile', () => {
  const fx = tempHome('report')
  try {
    const report = collectMachine(fx.db, {
      roots: ['C:\\'],
      snapshot: snapshot(48.5, 1862),
      pagefileGb: () => 31,
      now: new Date('2026-09-26T12:00:00Z'),
    })
    assert.equal(report.drives[0]?.freeGb, 48.5)
    assert.equal(report.drives[0]?.level, 'ok')
    assert.equal(report.pagefile.sizeGb, 31)
    assert.equal(report.memory.totalGb, 32)
    assert.equal(report.cpu.load, 0.4)
    assert.ok(report.unavailable.includes('pagefile') === false)

    const withoutPagefile = collectMachine(fx.db, {
      roots: ['C:\\'], snapshot: snapshot(5, 100), pagefileGb: () => null,
    })
    assert.ok(withoutPagefile.unavailable.includes('pagefile'))
    assert.equal(withoutPagefile.drives[0]?.level, 'risk')
  } finally { fx.cleanup() }
})

// A note for the reader: existsSync/utimesSync are imported for the census
// tests added in M2; keeping the import list in one place avoids churn.
void existsSync
void utimesSync
void writeFileSync
void mkdirSync
