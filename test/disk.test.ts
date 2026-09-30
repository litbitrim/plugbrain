import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, utimes, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import type { CensusReport } from '../src/machine/git-census.ts'
import { openStore } from '../src/store/schema.ts'
import { diskRecommendations, diskWipeCheck } from '../src/disk/analysis.ts'
import { currentDiskScan, diskScanHistory, diskTree, largestDiskFiles, scanDisk } from '../src/disk/scan.ts'

test('disk scan records directory totals, categories, lockfile duplicate groups and largest files', async () => {
  const root = await mkdtemp(join(tmpdir(), 'plugbrain-disk-'))
  const db = openStore(':memory:')
  try {
    for (const project of ['alpha', 'beta']) {
      await mkdir(join(root, project, 'node_modules', 'pkg'), { recursive: true })
      await writeFile(join(root, project, 'package-lock.json'), '{"lockfileVersion":3}')
      await writeFile(join(root, project, 'node_modules', 'pkg', 'data.bin'), Buffer.alloc(256, 65))
    }
    await mkdir(join(root, 'cache'), { recursive: true })
    await mkdir(join(root, 'target'), { recursive: true })
    await mkdir(join(root, 'models'), { recursive: true })
    await mkdir(join(root, 'Downloads'), { recursive: true })
    await mkdir(join(root, 'Steam', 'steamapps'), { recursive: true })
    await mkdir(join(root, 'Music'), { recursive: true })
    await mkdir(join(root, 'Program Files'), { recursive: true })
    await mkdir(join(root, 'VMs'), { recursive: true })
    await writeFile(join(root, 'cache', 'entry'), 'cache')
    await writeFile(join(root, 'target', 'artifact'), 'build')
    await writeFile(join(root, 'models', 'model.gguf'), 'model')
    await writeFile(join(root, 'Downloads', 'installer.exe'), 'installer')
    await writeFile(join(root, 'VMs', 'machine.vhdx'), 'vm')

    const report = await scanDisk(db, { roots: [root], concurrency: 2 })
    assert.equal(report.running, false)
    assert.equal(report.complete, true)
    assert.equal(report.inaccessible, 0)
    assert.equal(report.files, 9)
    const top = diskTree(db, root)
    assert.equal(top.find(row => row.name === 'alpha')?.category, 'other')
    assert.equal(top.find(row => row.name === 'cache')?.category, 'cache')
    assert.equal(top.find(row => row.name === 'target')?.category, 'build')
    assert.equal(top.find(row => row.name === 'models')?.category, 'models')
    assert.equal(top.find(row => row.name === 'Music')?.category, 'media')
    assert.equal(top.find(row => row.name === 'Program Files')?.category, 'system')
    assert.equal(top.find(row => row.name === 'Downloads')?.category, 'downloads')
    assert.equal(top.find(row => row.name === 'VMs')?.category, 'virtual-machines')
    assert.equal(diskTree(db, join(root, 'Steam')).find(row => row.name === 'steamapps')?.category, 'games')
    const alphaDeps = diskTree(db, join(root, 'alpha')).find(row => row.name === 'node_modules')!
    const betaDeps = diskTree(db, join(root, 'beta')).find(row => row.name === 'node_modules')!
    assert.ok(alphaDeps.duplicateGroup)
    assert.equal(alphaDeps.duplicateGroup, betaDeps.duplicateGroup)
    assert.equal(alphaDeps.files, 1)
    assert.equal(alphaDeps.bytes, 256)
    assert.equal(largestDiskFiles(db, 1)[0]?.bytes, 256)
    assert.equal(currentDiskScan(db)?.scanId, report.scanId)
    const recommendations = diskRecommendations(db)
    assert.equal(recommendations.recommendations.some(item => item.risk === 'recoverable'), true)
    assert.equal(recommendations.recommendations.some(item => item.risk === 'review'), false)
    assert.equal(recommendations.recommendations.some(item => item.risk === 'keep'), false)
    assert.equal(recommendations.totalsGb.recoverable, recommendations.recommendations
      .filter(item => item.risk === 'recoverable').reduce((sum, item) => sum + item.gb, 0))
  } finally {
    db.close()
    await rm(root, { recursive: true, force: true })
  }
})

test('recommendations separate recoverable, review and keep; wipe checklist catches unpushed refs and config paths', async () => {
  const home = await mkdtemp(join(tmpdir(), 'plugbrain-disk-wipe-'))
  const db = openStore(':memory:')
  try {
    await mkdir(join(home, '.ssh'), { recursive: true })
    await writeFile(join(home, '.ssh', 'config'), 'test-only')
    for (const repo of ['stale-project', 'dirty-project']) {
      await mkdir(join(home, repo, '.git'), { recursive: true })
      await writeFile(join(home, repo, '.git', 'HEAD'), 'ref: refs/heads/main')
    }
    const old = new Date(Date.now() - 400 * 86_400_000)
    await utimes(join(home, 'stale-project', '.git', 'HEAD'), old, old)
    await utimes(join(home, 'stale-project', '.git'), old, old)
    await scanDisk(db, { roots: [home] })
    const census: CensusReport = {
      scannedAt: new Date().toISOString(), roots: [home], complete: true,
      repos: [
        { path: join(home, 'stale-project'), registered: false, branch: 'main', dirtyFiles: 0, untrackedFiles: 0, unpushed: [], worktrees: 0, orphanWorktrees: 0, stashes: 0, lastCommitDays: 400, gitSizeMb: 1, workTreeSizeMb: 0 },
        { path: join(home, 'dirty-project'), registered: false, branch: 'main', dirtyFiles: 0, untrackedFiles: 0, unpushed: [{ branch: 'local-only', ahead: 2, upstream: null }], worktrees: 0, orphanWorktrees: 0, stashes: 0, lastCommitDays: 0, gitSizeMb: 1, workTreeSizeMb: 0 },
      ], totals: { repos: 2, dirty: 0, unpushedBranches: 1, orphanWorktrees: 0 }, unavailable: [],
    }
    const recommendations = diskRecommendations(db, census)
    assert.ok(recommendations.recommendations.some(item => item.risk === 'review'))
    assert.ok(recommendations.recommendations.some(item => item.risk === 'keep'))
    assert.equal(diskTree(db, join(home, 'stale-project')).find(row => row.name === '.git')?.category, 'source')
    const checklist = diskWipeCheck(db, census, new Date(), home)
    assert.ok(checklist.items.some(item => item.path.endsWith('dirty-project')))
    assert.ok(checklist.items.some(item => item.path.endsWith('.ssh')))
    assert.ok(checklist.totalGb >= 0)
  } finally {
    db.close()
    await rm(home, { recursive: true, force: true })
  }
})

test('disk scan records inaccessible paths and does not follow symlinks', async () => {
  const root = await mkdtemp(join(tmpdir(), 'plugbrain-disk-links-'))
  const outside = await mkdtemp(join(tmpdir(), 'plugbrain-disk-outside-'))
  const db = openStore(':memory:')
  try {
    await writeFile(join(outside, 'not-counted.bin'), Buffer.alloc(128))
    let linked = false
    try {
      const { symlink } = await import('node:fs/promises')
      await symlink(outside, join(root, 'link'), process.platform === 'win32' ? 'junction' : 'dir')
      linked = true
    } catch { /* Windows developer mode may disable link creation; other checks still apply. */ }
    const report = await scanDisk(db, { roots: [root, join(root, 'missing')] })
    assert.ok(report.inaccessible >= 1)
    assert.equal(report.files, 0)
    if (linked) assert.equal(Boolean(diskTree(db, root).find(row => row.name === 'link')?.reparsePoint), true)
  } finally {
    db.close()
    await rm(root, { recursive: true, force: true })
    await rm(outside, { recursive: true, force: true })
  }
})

test('disk history retains completed snapshots and reports non-overlapping directory growth', async () => {
  const root = await mkdtemp(join(tmpdir(), 'plugbrain-disk-history-'))
  const db = openStore(':memory:')
  try {
    const growing = join(root, 'growing')
    await mkdir(growing)
    const file = join(growing, 'payload.bin')
    await writeFile(file, Buffer.alloc(100))
    await scanDisk(db, { roots: [root], now: () => new Date('2026-09-27T10:00:00.000Z') })
    await writeFile(file, Buffer.alloc(300))
    await scanDisk(db, { roots: [root], now: () => new Date('2026-09-27T10:05:00.000Z') })

    const history = diskScanHistory(db)
    assert.equal(history.scans.length, 2)
    assert.equal(history.scans.every(scan => scan.complete), true)
    assert.equal(history.largestGrowth[0]?.path, growing)
    assert.equal(history.largestGrowth[0]?.previousBytes, 100)
    assert.equal(history.largestGrowth[0]?.bytes, 300)
    assert.equal(history.largestGrowth[0]?.deltaBytes, 200)
  } finally {
    db.close()
    await rm(root, { recursive: true, force: true })
  }
})

test('interrupted disk scans are marked incomplete and never publish partial recommendations', async () => {
  const root = await mkdtemp(join(tmpdir(), 'plugbrain-disk-abort-'))
  const db = openStore(':memory:')
  try {
    await writeFile(join(root, 'some-file'), 'metadata only')
    const controller = new AbortController()
    controller.abort()
    const report = await scanDisk(db, { roots: [root], signal: controller.signal })
    assert.equal(report.running, false)
    assert.equal(report.complete, false)
    assert.match(report.errors.at(-1) ?? '', /interrupted/)
    assert.equal(diskTree(db, root).length, 0)
    assert.equal(diskRecommendations(db).recommendations.length, 0)
  } finally {
    db.close()
    await rm(root, { recursive: true, force: true })
  }
})
