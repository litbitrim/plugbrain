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
import { serve, type ServerHandle } from '../src/server/api.ts'
import {
  collectMachine, defaultDriveRoots, driveLevel, forecastFrom, linearTrend, pruneSamples,
  recordSamples, seriesSince, type MachineReport,
} from '../src/machine/collect.ts'
import { driveRoots, hostSnapshot } from '../src/coord/resources.ts'
import { McpServer } from '../src/mcp/server.ts'
import {
  gitCensus, gitCensusCached, registeredCheckoutPaths, resetCensusCache, scanGitRepos,
  type CensusRepo, type CensusReport,
} from '../src/machine/git-census.ts'
import { withMachineFindings } from '../src/machine/findings.ts'
import { snapshotRepo } from '../src/hygiene/snapshot.ts'

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

test('gitCensusCached answers at once on a cold cache instead of blocking', () => {
  const fx = tempHome('cached')
  try {
    resetCensusCache()
    const cold = gitCensusCached(fx.db, { roots: [fx.dir], budgetMs: 5_000 })
    assert.equal(cold.complete, false)
    assert.deepEqual(cold.unavailable, ['census'])
    assert.deepEqual(cold.repos, [])
  } finally {
    resetCensusCache()
    fx.cleanup()
  }
})

// ---------------------------------------------------------------------------
// M3 — findings, the sentences a human acts on
// ---------------------------------------------------------------------------

const censusOf = (repos: Partial<CensusRepo>[]): CensusReport => ({
  scannedAt: '2026-09-26T12:00:00Z',
  roots: ['C:\\'],
  complete: true,
  repos: repos.map(repo => ({
    path: 'C:\\x', registered: false, branch: 'main', dirtyFiles: 0, untrackedFiles: 0,
    unpushed: [], worktrees: 1, orphanWorktrees: 0, stashes: 0, lastCommitDays: 1,
    gitSizeMb: 1, workTreeSizeMb: 1, ...repo,
  })),
  totals: { repos: repos.length, dirty: 0, unpushedBranches: 0, orphanWorktrees: 0 },
  unavailable: [],
})

const baseReport = (overrides: Partial<MachineReport> = {}): MachineReport => ({
  checkedAt: '2026-09-26T12:00:00Z',
  drives: [{ mount: 'C:\\', freeGb: 48.5, totalGb: 1862, level: 'ok' }],
  pagefile: { sizeGb: 24 },
  memory: { freeGb: 6, totalGb: 32 },
  cpu: { load: 0.42 },
  forecast: [{ mount: 'C:\\', fullInHours: 3.2, trendGbPerHour: -14.1, basis: 'last 60 min' }],
  findings: [],
  unavailable: [],
  ...overrides,
})

test('a drive under two hours from full is a risk; three hours is attention', () => {
  const acute = withMachineFindings(
    baseReport({ forecast: [{ mount: 'C:\\', fullInHours: 1.2, trendGbPerHour: -40, basis: 'last 60 min' }] }),
    censusOf([]),
  )
  const first = acute.findings[0]
  assert.equal(first?.level, 'risk')
  assert.match(first?.text ?? '', /full in about 1 hour/)
  assert.match(first?.text ?? '', /40 GB per hour/)

  // 3.2 h is real but not yet acute: the brief reserves risk for < 2 h.
  const soon = withMachineFindings(
    baseReport({ forecast: [{ mount: 'C:\\', fullInHours: 3.2, trendGbPerHour: -14.1, basis: 'last 60 min' }] }),
    censusOf([]),
  )
  assert.equal(soon.findings[0]?.level, 'attention')
  assert.match(soon.findings[0]?.text ?? '', /full in about 3 hours/)
})

test('a healthy machine with a clean census has no findings', () => {
  const calm = baseReport({
    pagefile: { sizeGb: 8 },
    forecast: [{ mount: 'C:\\', fullInHours: null, trendGbPerHour: 0, basis: 'last 60 min' }],
  })
  assert.equal(withMachineFindings(calm, censusOf([])).findings.length, 0)
})

test('a pagefile larger than half the RAM is named as RAM pressure', () => {
  const merged = withMachineFindings(
    baseReport({ pagefile: { sizeGb: 31 }, forecast: [{ mount: 'C:\\', fullInHours: null, trendGbPerHour: 0, basis: 'last 60 min' }] }),
    censusOf([]),
  )
  assert.equal(merged.findings.length, 1)
  assert.equal(merged.findings[0]?.level, 'attention')
  assert.match(merged.findings[0]?.text ?? '', /31 GB on a 32 GB machine/)
})

test('unsaved and unpushed work outside the brain is a risk finding', () => {
  const census = censusOf([
    { path: 'C:\\a', dirtyFiles: 2, registered: false },
    { path: 'C:\\b', untrackedFiles: 1, registered: false },
    { path: 'C:\\c', unpushed: [{ branch: 'feat/x', ahead: 3, upstream: null }], registered: false },
    // Registered repos are the brain's own business and never named here.
    { path: 'C:\\d', dirtyFiles: 4, registered: true },
  ])
  const merged = withMachineFindings(
    baseReport({ forecast: [{ mount: 'C:\\', fullInHours: null, trendGbPerHour: 0, basis: 'last 60 min' }] }),
    census,
  )
  const unsaved = merged.findings.find(finding => finding.text.includes('unsaved work'))
  assert.equal(unsaved?.level, 'risk')
  assert.match(unsaved?.text ?? '', /^2 repositories outside the brain/)
  assert.deepEqual(unsaved?.paths, ['C:\\a', 'C:\\b'])
  assert.equal(unsaved?.fix, 'plugbrain hygiene --wip-snapshot --repo <path>')
  assert.ok(merged.findings.some(finding => finding.text.includes('never pushed anywhere')))
})

test('dangling worktrees are a risk finding with the prune command', () => {
  const census = censusOf([
    { path: 'C:\\a', orphanWorktrees: 1 },
    { path: 'C:\\b', orphanWorktrees: 1 },
  ])
  const merged = withMachineFindings(
    baseReport({ forecast: [{ mount: 'C:\\', fullInHours: null, trendGbPerHour: 0, basis: 'last 60 min' }] }),
    census,
  )
  const orphans = merged.findings.find(finding => finding.text.includes('dangling'))
  assert.equal(orphans?.level, 'risk')
  assert.match(orphans?.text ?? '', /^2 worktrees are dangling/)
  assert.equal(orphans?.fix, 'git worktree prune (in the base repo), after checking the worktree is really gone')
})

// ---------------------------------------------------------------------------
// M4 — surfaces: /api/machine, /api/repos, and the single-repo rescue
// ---------------------------------------------------------------------------

test('GET /api/machine answers the contract shape', async () => {
  const fx = tempHome('api-machine')
  let handle: ServerHandle | null = null
  try {
    // Warm a tiny, bounded census so the route does not start a whole-disk walk
    // (and so no background scan outlives this test into the repos one).
    resetCensusCache()
    gitCensus(fx.db, { roots: [fx.dir], budgetMs: 5_000 })
    const token = 'machine-api-token'
    handle = await serve(
      { db: fx.db, dbFile: join(fx.dir, 'brain.db'), uiRoot: null, authKey: token, requireAuth: true }, 0)
    const res = await fetch(`http://127.0.0.1:${handle.port}/api/machine`,
      { headers: { Authorization: `Bearer ${token}` } })
    assert.equal(res.status, 200)
    const body = await res.json() as Record<string, unknown> & {
      drives: Array<{ mount: string; freeGb: number; totalGb: number; level: string }>
      pagefile: { sizeGb: number | null }
      memory: { freeGb: number | null; totalGb: number | null }
      cpu: { load: number | null }
      forecast: unknown[]
      findings: unknown[]
      unavailable: string[]
    }
    assert.equal(body.ok, true)
    assert.equal(typeof body.checkedAt, 'string')
    assert.ok(Array.isArray(body.drives))
    assert.ok(Array.isArray(body.forecast))
    assert.ok(Array.isArray(body.findings))
    assert.ok(Array.isArray(body.unavailable))
    assert.ok(!('data' in body), 'fields sit beside ok, never under data')
    for (const drive of body.drives) {
      assert.equal(typeof drive.mount, 'string')
      assert.ok(['ok', 'attention', 'risk'].includes(drive.level))
    }
  } finally {
    try { await handle?.close() } catch { /* best effort */ }
    fx.cleanup()
  }
})

test('GET /api/repos serves the census and honours ?dirty=1', { skip: skipGit }, async () => {
  const fx = tempHome('api-repos')
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-repos-api-'))
  let handle: ServerHandle | null = null
  try {
    const clean = join(root, 'clean')
    const dirty = join(root, 'dirty')
    makeRepo(clean)
    const origin = join(root, 'origin.git')
    git(root, ['init', '-q', '--bare', origin])
    git(clean, ['remote', 'add', 'origin', origin])
    git(clean, ['push', '-q', '-u', 'origin', 'main'])
    makeRepo(dirty)
    writeFileSync(join(dirty, 'a.ts'), 'work\n')

    // Warm the module cache with a bounded scan, so the route answers from it
    // instead of walking the whole machine.
    resetCensusCache()
    gitCensus(fx.db, { roots: [root], budgetMs: 30_000 })

    const token = 'repos-api-token'
    handle = await serve(
      { db: fx.db, dbFile: join(fx.dir, 'brain.db'), uiRoot: null, authKey: token, requireAuth: true }, 0)
    const all = await (await fetch(`http://127.0.0.1:${handle.port}/api/repos`,
      { headers: { Authorization: `Bearer ${token}` } })).json() as {
        ok: boolean; repos: Array<{ path: string }>; totals: { repos: number }; complete: boolean
      }
    assert.equal(all.ok, true)
    assert.equal(all.repos.length, 2)
    assert.equal(all.totals.repos, 2)

    const dirtyOnly = await (await fetch(`http://127.0.0.1:${handle.port}/api/repos?dirty=1`,
      { headers: { Authorization: `Bearer ${token}` } })).json() as {
        dirty: boolean; repos: Array<{ path: string; dirtyFiles: number | null }>
      }
    assert.equal(dirtyOnly.dirty, true)
    assert.equal(dirtyOnly.repos.length, 1)
    assert.ok(dirtyOnly.repos[0]!.path.endsWith('dirty'))
  } finally {
    try { await handle?.close() } catch { /* best effort */ }
    fx.cleanup()
    rmSync(root, { recursive: true, force: true })
  }
})

test('--wip-snapshot --repo rescues an unregistered repo without moving tree, index or HEAD', { skip: skipGit }, () => {
  const fx = tempHome('repo-snapshot')
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-repo-snap-'))
  try {
    const repo = join(root, 'outside')
    makeRepo(repo)
    writeFileSync(join(repo, 'a.txt'), 'tracked, unsaved\n')
    writeFileSync(join(repo, 'fresh.txt'), 'untracked, unsaved\n')
    const gitDir = gitOut(repo, ['rev-parse', '--absolute-git-dir'])
    const beforeStatus = gitOut(repo, ['status', '--porcelain=v1', '--untracked-files=all'])
    const beforeHead = gitOut(repo, ['rev-parse', 'HEAD'])

    const entry = snapshotRepo(repo)
    assert.ok(entry.ref !== null, entry.error ?? 'snapshot failed')
    assert.equal(entry.treeUnchanged, true)
    assert.equal(entry.indexUnchanged, true)
    assert.equal(entry.headUnchanged, true)
    assert.equal(entry.files, 2)
    assert.equal(gitOut(repo, ['status', '--porcelain=v1', '--untracked-files=all']), beforeStatus)
    assert.equal(gitOut(repo, ['rev-parse', 'HEAD']), beforeHead)
    assert.equal(existsSync(join(gitDir, 'index')), true)
    void fx
  } finally {
    fx.cleanup()
    rmSync(root, { recursive: true, force: true })
  }
})

// ---------------------------------------------------------------------------
// M5 — the shared measurement and the MCP surfaces
// ---------------------------------------------------------------------------

test('admission and the machine report look at the same drives', () => {
  // `swarm admit` measures through hostSnapshot, the machine lane through
  // collectMachine. If they ever enumerated different volumes, admission could
  // call a build safe on a disk that is actually the one filling up.
  assert.deepEqual(defaultDriveRoots(), driveRoots(), 'one source of truth for the drives')
  const drives = hostSnapshot().drives.map(drive => drive.root)
  for (const root of drives) {
    assert.ok(driveRoots().includes(root), `${root} came from the shared enumeration`)
  }
})

test('the MCP tools machine and repos answer the contract shape', async () => {
  const fx = tempHome('mcp')
  try {
    // Warm a bounded census so the tools answer instantly and this test never
    // walks the real machine.
    resetCensusCache()
    gitCensus(fx.db, { roots: [fx.dir], budgetMs: 5_000 })
    const mcp = new McpServer({ db: fx.db, workspaceId: 'ws-machine', authKey: null })

    const machine = await mcp.executeTool('machine', {}) as {
      ok: boolean; drives: unknown[]; pagefile: { sizeGb: number | null }; findings: unknown[]
    }
    assert.equal(machine.ok, true)
    assert.ok(Array.isArray(machine.drives))
    assert.ok(Array.isArray(machine.findings))
    assert.ok('sizeGb' in machine.pagefile)

    const repos = await mcp.executeTool('repos', {}) as { ok: boolean; repos: unknown[]; total?: number }
    assert.equal(repos.ok, true)
    assert.ok(Array.isArray(repos.repos))
  } finally {
    resetCensusCache()
    fx.cleanup()
  }
})

/** Read-only git, returning trimmed stdout for the proofs above. */
function gitOut(cwd: string, args: string[]): string {
  return execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain', '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()
}

// existsSync/utimesSync are kept for later census fixtures that touch mtimes.
void existsSync
void utimesSync
