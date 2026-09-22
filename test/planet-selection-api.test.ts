/**
 * Active Planet selection is a product boundary, not just an indexer option.
 * These routes exercise the same HTTP calls the local Brain UI/CLI consumer
 * uses: inventory first, explicit checkout IDs second, then scan.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import {
  indexPlanetWorkspace, listPlanet, registerPlanet, setPlanetIndexSelection,
} from '../src/planet.ts'
import { detectChanges } from '../src/intel/changes.ts'
import { getIntelStatus } from '../src/intel/status.ts'

const HAS_GIT = (() => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore', windowsHide: true }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string => execFileSync(
  'git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain', ...args],
  { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true },
).trim()

function makeRepo(codeDir: string, name: string, sourceName: string): string {
  const root = join(codeDir, name)
  mkdirSync(join(root, 'src'), { recursive: true })
  git(root, ['init', '-q'])
  writeFileSync(join(root, 'src', sourceName), `export const ${name.replace(/[^a-zA-Z0-9]/g, '')} = true\n`)
  git(root, ['add', '.'])
  git(root, ['commit', '-q', '-m', 'init'])
  git(root, ['branch', '-M', 'main'])
  return root
}

function authPost(baseUrl: string, token: string, path: string, body: unknown): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  })
}

async function close(handle: ServerHandle | null, db: ReturnType<typeof openStore>, dir: string): Promise<void> {
  try { await handle?.close() } catch { /* best effort test cleanup */ }
  try { db.close() } catch { /* already closed */ }
  try { rmSync(dir, { recursive: true, force: true, maxRetries: 8 }) } catch { /* worker-free fixture */ }
}

test('Planet API requires an authenticated explicit checkout selection before scan, then hides deselected graph rows',
  { skip: skipGit }, async () => {
    const dir = mkdtempSync(join(tmpdir(), 'plugbrain-selection-api-'))
    const planetRoot = join(dir, 'planet')
    const codeDir = join(planetRoot, 'Code')
    const dbFile = join(dir, 'brain.db')
    const db = openStore(dbFile)
    const token = 'selection-api-token'
    let workerHandle: ServerHandle | null = null
    let syncHandle: ServerHandle | null = null
    try {
      mkdirSync(codeDir, { recursive: true })
      const current = makeRepo(codeDir, 'alpha', 'current.ts')
      const historic = join(codeDir, 'alpha--historic')
      git(current, ['worktree', 'add', '-q', '-b', 'historic', historic])

      // This server has a dbFile, so a bad implementation would answer 202 and
      // leave the worker to fail. The refusal has to happen in this request.
      workerHandle = await serve({ db, dbFile, uiRoot: null, authKey: token, requireAuth: true }, 0)
      const workerBase = `http://127.0.0.1:${workerHandle.port}`
      const registered = await authPost(workerBase, token, '/api/planet/register', { root: planetRoot })
      assert.equal(registered.status, 200)
      const registeredBody = await registered.json() as { workspaceId: string; checkouts: number; selectionConfigured: boolean }
      assert.equal(registeredBody.checkouts, 2, 'inventory retains both current and historical checkouts')
      assert.equal(registeredBody.selectionConfigured, false)

      const inventoryRes = await fetch(`${workerBase}/api/planet?workspace=${encodeURIComponent(registeredBody.workspaceId)}`)
      assert.equal(inventoryRes.status, 200)
      const inventory = await inventoryRes.json() as {
        planet: { indexSelection: { configured: boolean }; checkouts: Array<{ id: string; relPrefix: string; indexSelected: boolean }> }
      }
      assert.equal(inventory.planet.indexSelection.configured, false)
      const currentId = inventory.planet.checkouts.find(row => row.relPrefix === 'Code/alpha')?.id
      const historicId = inventory.planet.checkouts.find(row => row.relPrefix === 'Code/alpha--historic')?.id
      assert.ok(currentId && historicId)
      assert.equal(inventory.planet.checkouts.every(row => !row.indexSelected), true)

      const noSelectionScan = await authPost(workerBase, token, '/api/planet/scan', {
        workspace: registeredBody.workspaceId,
      })
      const noSelectionBody = await noSelectionScan.json() as { ok: boolean; error: string; started?: boolean }
      assert.equal(noSelectionScan.status, 409, 'unconfigured worker-backed scan must not claim it started')
      assert.equal(noSelectionBody.ok, false)
      assert.equal(noSelectionBody.started, undefined)
      assert.match(noSelectionBody.error, /no persisted canonical selection/)

      const anonymousSelection = await fetch(`${workerBase}/api/planet/selection`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspace: registeredBody.workspaceId, checkoutIds: [currentId] }),
      })
      assert.equal(anonymousSelection.status, 401, 'selection is a protected mutation')

      const invalidPath = await authPost(workerBase, token, '/api/planet/selection', {
        workspace: registeredBody.workspaceId, checkoutIds: [historic],
      })
      assert.equal(invalidPath.status, 400, 'the selection API accepts inventory IDs, never arbitrary roots')

      // Deliberately select both once so the historic checkout creates stored
      // graph rows. We will narrow before another scan to prove live reads use
      // the persisted vector rather than stale database rows.
      const selectBoth = await authPost(workerBase, token, '/api/planet/selection', {
        workspace: registeredBody.workspaceId, checkoutIds: [currentId, historicId],
      })
      assert.equal(selectBoth.status, 200)
      const selected = await selectBoth.json() as { selection: { configured: boolean; checkoutIds: string[] } }
      assert.equal(selected.selection.configured, true)
      assert.deepEqual(new Set(selected.selection.checkoutIds), new Set([currentId, historicId]))

      await workerHandle.close()
      workerHandle = null
      // This fixture runs WITHOUT a store path, and a request may no longer
      // index in line there: doing so blocks the whole event loop for the
      // length of the run, which is the defect the busy contract fixes. The
      // scan is therefore run through the same entry point the worker uses and
      // then read back over HTTP, which is what this test is about.
      syncHandle = await serve({ db, uiRoot: null, authKey: token, requireAuth: true }, 0)
      const base = `http://127.0.0.1:${syncHandle.port}`
      assert.equal(
        (await authPost(base, token, '/api/planet/scan', { workspace: registeredBody.workspaceId })).status,
        501, 'a request must refuse to index in line instead of blocking every route',
      )
      const indexed = indexPlanetWorkspace(db, registeredBody.workspaceId)
      assert.equal(indexed.files, 2)

      // Simulate a pre-Planet whole-root generation: it did not know checkout
      // attribution and left a historical Code path as NULL. A selection scope
      // must not mistake every NULL for a note and re-expose this stale row.
      db.prepare(
        `INSERT INTO files (workspace_id, path, repo_id, checkout_id, ext, size, mtime, loc)
         VALUES (?, ?, NULL, NULL, '.ts', 1, ?, 1)`,
      ).run(
        registeredBody.workspaceId, 'Code/alpha--historic/legacy-null.ts', new Date().toISOString(),
      )

      const narrow = await authPost(base, token, '/api/planet/selection', {
        workspace: registeredBody.workspaceId, checkoutIds: [currentId],
      })
      assert.equal(narrow.status, 200)

      const graph = await (await fetch(
        `${base}/api/graph?workspace=${encodeURIComponent(registeredBody.workspaceId)}&limit=20`)).json() as {
        nodes: Array<{ path: string }>
      }
      assert.deepEqual(graph.nodes.map(node => node.path), ['Code/alpha/src/current.ts'])

      const atlas = await (await fetch(
        `${base}/api/atlas/snapshot?workspace=${encodeURIComponent(registeredBody.workspaceId)}&limit=20`)).json() as {
        graph: { nodes: Array<{ properties: { path: string } }> }
        coverage: { totalFiles: number }
      }
      assert.equal(atlas.coverage.totalFiles, 1)
      assert.equal(atlas.graph.nodes.some(node => node.properties.path.includes('alpha--historic')), false)

      const galaxy = await (await fetch(`${base}/api/galaxy`)).json() as {
        planets: Array<{ id: string; files: number; symbols: number; edges: number }>
      }
      const galaxyPlanet = galaxy.planets.find(row => row.id === registeredBody.workspaceId)
      assert.ok(galaxyPlanet)
      assert.equal(galaxyPlanet!.files, 1)

      const hiddenSymbols = await (await fetch(
        `${base}/api/symbols?workspace=${encodeURIComponent(registeredBody.workspaceId)}` +
        `&path=${encodeURIComponent('Code/alpha--historic/src/current.ts')}`,
      )).json() as { symbols: unknown[] }
      assert.deepEqual(hiddenSymbols.symbols, [])
    } finally {
      await close(syncHandle ?? workerHandle, db, dir)
    }
  })

test('Intel status and change detection are scoped to the requested Planet workspace',
  { skip: skipGit }, async () => {
    const dir = mkdtempSync(join(tmpdir(), 'plugbrain-intel-workspace-scope-'))
    const db = openStore(join(dir, 'brain.db'))
    let handle: ServerHandle | null = null
    try {
      const rootA = join(dir, 'planet-a')
      const rootB = join(dir, 'planet-b')
      const codeA = join(rootA, 'Code')
      const codeB = join(rootB, 'Code')
      mkdirSync(codeA, { recursive: true })
      mkdirSync(codeB, { recursive: true })
      makeRepo(codeA, 'alpha', 'a.ts')
      makeRepo(codeB, 'beta', 'b.ts')

      const a = registerPlanet(db, rootA)
      const b = registerPlanet(db, rootB)
      const aId = listPlanet(db, a.workspaceId).checkouts[0].id
      const bId = listPlanet(db, b.workspaceId).checkouts[0].id
      setPlanetIndexSelection(db, a.workspaceId, [aId])
      setPlanetIndexSelection(db, b.workspaceId, [bId])
      indexPlanetWorkspace(db, a.workspaceId)
      indexPlanetWorkspace(db, b.workspaceId)

      assert.equal(getIntelStatus(db, a.workspaceId).workspaceId, a.workspaceId)
      assert.equal(getIntelStatus(db, b.workspaceId).workspaceId, b.workspaceId)
      assert.throws(() => detectChanges(db, {} as never), /workspaceId is required/)

      const bDiff = 'diff --git a/src/b.ts b/src/b.ts\n@@ -1 +1 @@\n-export const beta = false\n+export const beta = true\n'
      const crossPlanet = detectChanges(db, {
        workspaceId: a.workspaceId, checkoutId: bId, diffText: bDiff,
      })
      assert.equal(crossPlanet.changedFiles, 0)
      assert.equal(crossPlanet.checkoutId, null)

      handle = await serve({ db, uiRoot: null }, 0)
      const base = `http://127.0.0.1:${handle.port}`
      const bStatus = await (await fetch(
        `${base}/api/intel/status?workspace=${encodeURIComponent(b.workspaceId)}`)).json() as {
        ok: boolean; status: { workspaceId: string }
      }
      assert.equal(bStatus.ok, true)
      assert.equal(bStatus.status.workspaceId, b.workspaceId)

      const ambiguousStatus = await fetch(`${base}/api/intel/status`)
      assert.equal(ambiguousStatus.status, 400, 'multi-Planet status cannot silently choose the first workspace')

      const crossResponse = await fetch(
        `${base}/api/intel/detect-changes?workspace=${encodeURIComponent(a.workspaceId)}`,
        {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutId: bId, diffText: bDiff }),
        },
      )
      assert.equal(crossResponse.status, 200)
      const crossBody = await crossResponse.json() as { ok: boolean; result: { changedFiles: number; checkoutId: string | null } }
      assert.equal(crossBody.ok, true)
      assert.equal(crossBody.result.changedFiles, 0)
      assert.equal(crossBody.result.checkoutId, null)

      const ambiguousChanges = await fetch(`${base}/api/intel/detect-changes`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ diffText: bDiff }),
      })
      assert.equal(ambiguousChanges.status, 400, 'multi-Planet change detection requires workspace authority')
    } finally {
      await close(handle, db, dir)
    }
  })
