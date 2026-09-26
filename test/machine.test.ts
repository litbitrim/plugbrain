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
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import {
  collectMachine, driveLevel, forecastFrom, linearTrend, pruneSamples, recordSamples,
  seriesSince, type MachineReport,
} from '../src/machine/collect.ts'
import { registeredCheckoutPaths, scanGitRepos } from '../src/machine/git-census.ts'

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

// ---------------------------------------------------------------------------
// M2 — the global git census, against real repositories
// ---------------------------------------------------------------------------

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): void => {
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  })
}

function makeRepo(path: string): void {
  mkdirSync(path, { recursive: true })
  git(path, ['init', '-q', '-b', 'main'])
  writeFileSync(join(path, 'readme.md'), 'hello\n')
  git(path, ['add', '.'])
  git(path, ['commit', '-q', '-m', 'initial'])
}

test('the census finds real repos, skips node_modules, and tells unsaved and unpushed apart', { skip: skipGit }, () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-census-'))
  const db = openStore(join(root, 'brain.db'))
  try {
    const clean = join(root, 'clean')
    const dirty = join(root, 'dirty')
    const unpushed = join(root, 'unpushed')
    makeRepo(clean)
    // A real remote, so `main` genuinely has an upstream and the word "clean"
    // is reachable instead of every fresh repo counting as never pushed.
    const origin = join(root, 'clean-origin.git')
    git(root, ['init', '-q', '--bare', origin])
    git(clean, ['remote', 'add', 'origin', origin])
    git(clean, ['push', '-q', '-u', 'origin', 'main'])
    makeRepo(dirty)
    writeFileSync(join(dirty, 'hero.ts'), 'unsaved\n')
    makeRepo(unpushed)
    git(unpushed, ['checkout', '-q', '-b', 'feature/local-only'])
    writeFileSync(join(unpushed, 'feature.ts'), 'x\n')
    git(unpushed, ['add', '.'])
    git(unpushed, ['commit', '-q', '-m', 'a branch nobody pushed'])

    // A dependency tree that happens to contain a .git must never be reported.
    const decoy = join(root, 'node_modules', 'left-pad')
    mkdirSync(decoy, { recursive: true })
    writeFileSync(join(decoy, '.git'), 'gitdir: nowhere\n')

    // The clean repo is registered with the brain; the others are not.
    const registered = registeredCheckoutPaths(db)
    registered.add(clean.replace(/\\/g, '/'))

    const { repos, complete } = scanGitRepos(registered, { roots: [root], budgetMs: 30_000 })
    assert.equal(complete, true)
    const byName = new Map(repos.map(repo => [repo.path.split(/[\\/]/).pop(), repo]))
    assert.equal(byName.has('node_modules'), false)
    assert.equal(repos.some(repo => repo.path.includes('left-pad')), false)
    assert.equal(repos.length, 3)

    assert.equal(byName.get('clean')?.registered, true)
    assert.equal(byName.get('clean')?.dirtyFiles, 0)
    assert.equal(byName.get('clean')?.unpushed.length, 0)

    assert.equal(byName.get('dirty')?.registered, false)
    assert.equal(byName.get('dirty')?.untrackedFiles, 1)

    const localOnly = byName.get('unpushed')?.unpushed ?? []
    assert.ok(localOnly.some(branch => branch.branch === 'feature/local-only' && branch.upstream === null))
  } finally {
    try { db.close() } catch { /* closed */ }
    rmSync(root, { recursive: true, force: true })
  }
})

test('the census counts worktrees and flags the orphaned one', { skip: skipGit }, () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-worktree-'))
  const db = openStore(join(root, 'brain.db'))
  try {
    const base = join(root, 'base')
    makeRepo(base)
    const linked = join(root, 'linked')
    git(base, ['worktree', 'add', '-q', '-b', 'side', linked])
    // Remove the directory behind git's back: the registration now dangles.
    rmSync(linked, { recursive: true, force: true })

    const { repos } = scanGitRepos(new Set(), { roots: [root], budgetMs: 30_000 })
    const measured = repos.find(repo => repo.path.endsWith('base'))
    assert.ok(measured, 'the base repo is found')
    assert.equal(measured?.worktrees, 2)
    assert.equal(measured?.orphanWorktrees, 1)
  } finally {
    try { db.close() } catch { /* closed */ }
    rmSync(root, { recursive: true, force: true })
  }
})

test('a tight directory cap reports complete:false instead of a truncated lie', { skip: skipGit }, () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-cap-'))
  const db = openStore(join(root, 'brain.db'))
  try {
    for (let index = 0; index < 30; index += 1) {
      const filler = join(root, `dir-${index}`, 'sub')
      mkdirSync(filler, { recursive: true })
      writeFileSync(join(filler, 'file.txt'), 'x')
    }
    const { complete } = scanGitRepos(new Set(), { roots: [root], maxDirs: 5, budgetMs: 30_000 })
    assert.equal(complete, false)
  } finally {
    try { db.close() } catch { /* closed */ }
    rmSync(root, { recursive: true, force: true })
  }
})

// existsSync/utimesSync are kept for later census fixtures that touch mtimes.
void existsSync
void utimesSync
