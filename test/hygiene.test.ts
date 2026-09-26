/**
 * H5 — Git-Chaos-Schutz against real git repositories on a real disk.
 *
 * The point of this feature is that it is honest about what is on the disk, so
 * the tests are too: no stub stands in for git, every case builds the situation
 * it claims (a dirty file, an unpushed branch, an orphaned worktree) and then
 * asks the collector. If the collector ever guesses instead of reading, one of
 * these goes red.
 *
 * The baseline is deliberately an `ok` checkout: a real bare remote, `main`
 * pushed with an upstream. Without that, "no upstream" would be true of every
 * fresh repo and the word `ok` would never be reachable.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import { discoverCheckouts, registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'
import { collectHygiene } from '../src/hygiene/collect.ts'
import { withFindings } from '../src/hygiene/findings.ts'
import { createWipSnapshots, hygieneReport, snapshotRepo, type HygieneCheckout } from '../src/hygiene/index.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

interface Fx {
  dir: string
  codeDir: string
  dbFile: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  cleanup: () => void
}

function fixture(name: string): Fx {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-hyg-${name}-`))
  const planetRoot = join(dir, 'plugpt')
  const codeDir = join(planetRoot, 'Code')
  mkdirSync(codeDir, { recursive: true })
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  return {
    dir, codeDir, dbFile, db, workspaceId: '',
    cleanup: () => { try { db.close() } catch { /* already closed */ } rmSync(dir, { recursive: true, force: true }) },
  }
}

/** Register the planet once its repos exist, then select every checkout. */
function register(fx: Fx): void {
  const registered = registerPlanet(fx.db, join(fx.dir, 'plugpt'))
  fx.workspaceId = registered.workspaceId
  setPlanetIndexSelection(fx.db, registered.workspaceId,
    discoverCheckouts(fx.codeDir, registered.planetId).map(checkout => checkout.checkoutId))
}

/**
 * A committed repo whose `main` is pushed to a real bare remote, so it starts
 * clean AND pushed — the only state in which `ok` is the honest answer.
 */
function repo(fx: Fx, name: string): string {
  const bare = join(fx.dir, `${name}-remote.git`)
  const root = join(fx.codeDir, name)
  git(fx.dir, ['init', '--bare', '-q', bare])
  mkdirSync(join(root, 'src'), { recursive: true })
  git(root, ['init', '-q'])
  writeFileSync(join(root, 'a.txt'), 'a\n')
  writeFileSync(join(root, 'src', 'b.ts'), 'export const b = 1\n')
  git(root, ['add', '.'])
  git(root, ['commit', '-q', '-m', 'init'])
  git(root, ['branch', '-M', 'main'])
  git(root, ['remote', 'add', 'origin', bare])
  git(root, ['push', '-q', '-u', 'origin', 'main'])
  return root
}

const checkoutAt = (fx: Fx, path: string): HygieneCheckout => {
  const found = hygieneReport(fx.db, fx.workspaceId).checkouts.find(c => c.path === path)
  assert.ok(found, `checkout not reported: ${path}`)
  return found
}

test('a clean, pushed checkout is ok', { skip: skipGit }, () => {
  const fx = fixture('ok')
  try {
    repo(fx, 'alpha')
    register(fx)
    const report = hygieneReport(fx.db, fx.workspaceId)
    const checkout = report.checkouts[0]!
    assert.equal(checkout.dirtyFiles, 0)
    assert.equal(checkout.untrackedFiles, 0)
    assert.equal(checkout.stashes, 0)
    assert.deepEqual(checkout.unpushed, [], 'main is pushed and clean')
    assert.equal(checkout.orphan, false)
    assert.equal(report.summary.level, 'ok')
    assert.deepEqual(report.findings, [], 'nothing to fix')
  } finally { fx.cleanup() }
})

test('unsaved work is a risk with a concrete command', { skip: skipGit }, () => {
  const fx = fixture('dirty')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    writeFileSync(join(root, 'a.txt'), 'a changed\n')
    writeFileSync(join(root, 'fresh.txt'), 'never committed\n')

    const report = hygieneReport(fx.db, fx.workspaceId)
    const checkout = checkoutAt(fx, root)
    assert.equal(checkout.dirtyFiles, 1)
    assert.equal(checkout.untrackedFiles, 1)
    assert.equal(report.summary.level, 'risk')

    const dirty = report.findings.find(finding => finding.text.includes('unsaved'))
    assert.ok(dirty, 'the dirty file is named')
    assert.equal(dirty.fix, 'plugbrain hygiene --wip-snapshot')
    assert.ok(dirty.paths.includes(root), 'the finding points at the checkout')

    const untracked = report.findings.find(finding => finding.text.includes('untracked'))
    assert.ok(untracked, 'the untracked file is named too')
    assert.match(report.summary.text, /unsaved/)
  } finally { fx.cleanup() }
})

test('a branch with no upstream is attention, not risk', { skip: skipGit }, () => {
  const fx = fixture('noupstream')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    git(root, ['checkout', '-q', '-b', 'feat/explore'])
    writeFileSync(join(root, 'wip.txt'), 'exploring\n')
    git(root, ['add', 'wip.txt'])
    git(root, ['commit', '-q', '-m', 'explore'])

    const checkout = checkoutAt(fx, root)
    const branch = checkout.unpushed.find(entry => entry.branch === 'feat/explore')
    assert.ok(branch, 'the branch is reported')
    assert.equal(branch.upstream, null)
    assert.equal(checkout.dirtyFiles, 0)

    const report = hygieneReport(fx.db, fx.workspaceId)
    assert.equal(report.summary.level, 'attention')
    assert.match(report.findings.find(f => f.text.includes('never pushed'))?.text ?? '', /never pushed/)
  } finally { fx.cleanup() }
})

test('commits ahead of the upstream are reported with their count', { skip: skipGit }, () => {
  const fx = fixture('ahead')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    writeFileSync(join(root, 'a.txt'), 'ahead\n')
    git(root, ['add', 'a.txt'])
    git(root, ['commit', '-q', '-m', 'ahead'])

    const checkout = checkoutAt(fx, root)
    const branch = checkout.unpushed.find(entry => entry.branch === 'main')
    assert.ok(branch, 'main is ahead of origin/main')
    assert.equal(branch.ahead, 1)
    assert.equal(branch.upstream, 'origin/main')
  } finally { fx.cleanup() }
})

test('a stash counts as work that is on no branch', { skip: skipGit }, () => {
  const fx = fixture('stash')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    writeFileSync(join(root, 'a.txt'), 'stashed\n')
    git(root, ['stash', 'push', '-q', '-m', 'later'])

    const checkout = checkoutAt(fx, root)
    assert.equal(checkout.stashes, 1)
    assert.equal(checkout.dirtyFiles, 0, 'a stash leaves the tree clean')

    const report = hygieneReport(fx.db, fx.workspaceId)
    assert.ok(report.findings.some(f => f.text.includes('stash')), 'the stash is named')
  } finally { fx.cleanup() }
})

test('an orphaned worktree whose git directory is gone is a risk', { skip: skipGit }, () => {
  const fx = fixture('orphan')
  try {
    const root = repo(fx, 'alpha')
    const worktree = join(fx.codeDir, 'alpha-wt')
    git(root, ['worktree', 'add', '-q', worktree, '-b', 'wt'])
    register(fx)

    const before = hygieneReport(fx.db, fx.workspaceId)
    const linked = before.checkouts.find(c => c.path === worktree)
    assert.ok(linked, 'the linked worktree is a checkout')
    assert.equal(linked.orphan, false, 'while it exists it is healthy')

    // Remove the working copy but not the main repo's bookkeeping: exactly the
    // half-deleted state that made 49 checkouts invisible on 25.09.
    rmSync(worktree, { recursive: true, force: true })
    const after = hygieneReport(fx.db, fx.workspaceId)
    const gone = after.checkouts.find(c => c.path === worktree)
    assert.ok(gone, 'the checkout is still registered')
    assert.equal(gone.orphan, true)
    assert.equal(after.summary.level, 'risk')
    assert.ok(after.findings.some(f => f.text.includes('orphan')), 'the orphan is named')
  } finally { fx.cleanup() }
})

test('the collector never invents a number it could not read', { skip: skipGit }, () => {
  const fx = fixture('unknown')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    // A checkout whose path is gone cannot answer for dirt or size. The fields
    // must be null (and the read named in `unavailable`), never 0 — "clean" is
    // the one lie this feature cannot afford.
    rmSync(root, { recursive: true, force: true })
    const report = hygieneReport(fx.db, fx.workspaceId)
    const checkout = report.checkouts[0]!
    assert.equal(checkout.dirtyFiles, null)
    assert.equal(checkout.sizeMb, null)
    assert.equal(checkout.orphan, true)
    assert.equal(checkout.staleDays, null)
    assert.ok(report.unavailable.length > 0, 'the unreadable reads are admitted')
  } finally { fx.cleanup() }
})

test('GET /api/hygiene answers the contract shape', { skip: skipGit }, async () => {
  const fx = fixture('api')
  let handle: ServerHandle | null = null
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    writeFileSync(join(root, 'a.txt'), 'dirty\n')

    const token = 'hygiene-api-token'
    handle = await serve({ db: fx.db, dbFile: fx.dbFile, uiRoot: null, authKey: token, requireAuth: true }, 0)
    const res = await fetch(
      `http://127.0.0.1:${handle.port}/api/hygiene?workspace=${encodeURIComponent(fx.workspaceId)}`,
      { headers: { Authorization: `Bearer ${token}` } })
    assert.equal(res.status, 200)
    const body = await res.json() as {
      workspace: string
      checkedAt: string
      diskFreeGb: number | null
      summary: { level: string; text: string }
      checkouts: Array<{ path: string; dirtyFiles: number | null; repo: string }>
      findings: Array<{ level: string; text: string; fix: string; paths: string[] }>
      unavailable: string[]
    }
    assert.equal(body.workspace, fx.workspaceId)
    assert.equal(typeof body.checkedAt, 'string')
    assert.equal(body.summary.level, 'risk')
    assert.equal(body.checkouts[0]!.dirtyFiles, 1)
    assert.equal(body.checkouts[0]!.repo.length > 0, true, 'the repo name rides along')
    assert.equal(body.findings[0]!.fix, 'plugbrain hygiene --wip-snapshot')
    assert.ok(body.findings[0]!.paths.includes(root))
    assert.deepEqual(body.unavailable, [])
  } finally {
    try { await handle?.close() } catch { /* best effort */ }
    fx.cleanup()
  }
})

test('--wip-snapshot rescues the work and leaves tree, index and HEAD untouched', { skip: skipGit }, () => {
  const fx = fixture('snapshot')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    writeFileSync(join(root, 'a.txt'), 'rescued tracked work\n')
    writeFileSync(join(root, 'fresh.txt'), 'rescued untracked work\n')

    // Fingerprint the three things the method promises not to move. `git
    // rev-parse --absolute-git-dir` is where the REAL index lives; hashing its
    // bytes catches any accidental `git add` against it.
    const gitDir = git(root, ['rev-parse', '--absolute-git-dir'])
    const realIndex = join(gitDir, 'index')
    const beforeStatus = git(root, ['status', '--porcelain=v1', '--untracked-files=all'])
    const beforeHead = git(root, ['rev-parse', 'HEAD'])
    const beforeIndex = createHash('sha1').update(readFileSync(realIndex)).digest('hex')

    const date = '2026-09-26'
    const result = createWipSnapshots(fx.db, fx.workspaceId, { date })
    assert.equal(result.created, 1)
    assert.equal(result.skipped, 0, 'the only checkout was dirty')
    assert.deepEqual(result.unavailable, [])

    const entry = result.entries[0]!
    assert.ok(entry.ref?.startsWith(`refs/wip/${date}/`), `ref is under refs/wip: ${entry.ref}`)
    assert.equal(entry.treeUnchanged, true, 'working tree did not change')
    assert.equal(entry.indexUnchanged, true, 'real index did not change')
    assert.equal(entry.headUnchanged, true, 'HEAD did not move')
    assert.equal(entry.files, 2, 'both the changed and the untracked file are in the commit')

    // The proofs are not self-reported: read the disk back and compare.
    assert.equal(git(root, ['status', '--porcelain=v1', '--untracked-files=all']), beforeStatus)
    assert.equal(git(root, ['rev-parse', 'HEAD']), beforeHead)
    assert.equal(createHash('sha1').update(readFileSync(realIndex)).digest('hex'), beforeIndex)

    // And the rescued object really holds the work that was at risk.
    const refs = git(root, ['for-each-ref', '--format=%(refname)', 'refs/wip/'])
      .split(/\r?\n/).filter(line => line !== '')
    assert.deepEqual(refs, [entry.ref])
    assert.equal(git(root, ['show', `${entry.ref}:a.txt`]), 'rescued tracked work')
    assert.equal(git(root, ['show', `${entry.ref}:fresh.txt`]), 'rescued untracked work')
    assert.equal(git(root, ['rev-parse', `${entry.ref}^`]), beforeHead, 'the WIP commit hangs off HEAD')
  } finally { fx.cleanup() }
})

test('--wip-snapshot skips a clean checkout instead of writing noise refs', { skip: skipGit }, () => {
  const fx = fixture('snapshot-clean')
  try {
    repo(fx, 'alpha')
    register(fx)
    const result = createWipSnapshots(fx.db, fx.workspaceId, { date: '2026-09-26' })
    assert.equal(result.created, 0)
    assert.equal(result.skipped, 1)
    assert.deepEqual(result.entries, [])
  } finally { fx.cleanup() }
})

test('a failed rescue reports the error and never claims its proofs', { skip: skipGit }, () => {
  const fx = fixture('snapshot-fail')
  try {
    // A `.git` *file* pointing at a git directory that does not exist: every git
    // call fails, so nothing can be read and nothing can be written. The entry
    // must say so — an earlier version compared a value against itself and
    // reported "unchanged" as a consequence of the failure.
    const broken = join(fx.dir, 'broken')
    mkdirSync(broken, { recursive: true })
    writeFileSync(join(broken, '.git'), 'gitdir: C:/plugbrain/definitely/missing/gitdir\n')

    const entry = snapshotRepo(broken)
    assert.equal(entry.ref, null, 'no ref was written')
    assert.equal(entry.commit, null, 'no commit was written')
    assert.ok(entry.error !== null, 'the failure is reported, not hidden')
    assert.equal(entry.treeUnchanged, false, 'the tree was never proven unchanged')
    assert.equal(entry.indexUnchanged, false, 'the index was never proven unchanged')
    assert.equal(entry.headUnchanged, false, 'HEAD was never proven unmoved')
  } finally { fx.cleanup() }
})

test('withFindings keeps the collector\'s facts and only adds a verdict', { skip: skipGit }, () => {
  const fx = fixture('shape')
  try {
    const root = repo(fx, 'alpha')
    register(fx)
    const raw = collectHygiene(fx.db, fx.workspaceId)
    const judged = withFindings(raw)
    assert.deepEqual(judged.checkouts, raw.checkouts, 'judging does not change the inventory')
    assert.equal(judged.checkedAt, raw.checkedAt)
    assert.equal(judged.workspace, raw.workspace)
    assert.equal(hygieneReport(fx.db, fx.workspaceId).summary.level, judged.summary.level)
    assert.equal(root.length > 0, true)
  } finally { fx.cleanup() }
})
