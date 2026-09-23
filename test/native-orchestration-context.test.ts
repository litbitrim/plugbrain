/** Native orchestration contract: one temp planet, two real linked worktrees. */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve } from '../src/server/api.ts'
import { discoverCheckouts, indexPlanetWorkspace, listPlanet, registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'
import { acquireLease, FencingError, checkWriteFencing } from '../src/coord/leases.ts'
import { registerSwarmAgent } from '../src/coord/registry.ts'
import { changesSinceTaskContextPack, createTaskContextPack } from '../src/coord/task-context.ts'

const HAS_GIT = (() => { try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false } })()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'
const git = (cwd: string, args: string[]): string => execFileSync('git', [
  '-c', 'user.email=brain@test', '-c', 'user.name=brain', '-c', 'commit.gpgsign=false', ...args,
], { cwd, encoding: 'utf8', windowsHide: true }).trim()
const write = (root: string, path: string, body: string): void => {
  const file = join(root, path); mkdirSync(join(file, '..'), { recursive: true }); writeFileSync(file, body)
  const future = new Date(Date.now() + 2_000); utimesSync(file, future, future)
}

test('NATIVE-ORCH: a task context refuses an unscoped request instead of inventing a whole-workspace pack', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-context-scope-')); const root = join(dir, 'ws'); mkdirSync(root, { recursive: true })
  const db = openStore(join(dir, 'brain.db'))
  try {
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)').run('ws-scope', 'scope', root, new Date().toISOString())
    assert.throws(() => createTaskContextPack(db, { workspaceId: 'ws-scope', taskId: 'task-a', scopePaths: [], requirementIds: [] }), /scopePaths required/)
  } finally { db.close(); rmSync(dir, { recursive: true, force: true }) }
})

test('NATIVE-ORCH: an explicit fence token cannot be replayed for another task or path', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-fence-token-')); const root = join(dir, 'ws'); mkdirSync(join(root, 'src'), { recursive: true })
  const db = openStore(join(dir, 'brain.db'))
  try {
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)').run('ws-fence', 'fence', root, new Date().toISOString())
    registerSwarmAgent(db, { agentId: 'writer', workspaceId: 'ws-fence', taskId: 'task-a' })
    const lease = acquireLease(db, 'ws-fence', { agentId: 'writer', taskId: 'task-a', paths: ['src/owned.ts'] }).lease!
    assert.throws(() => checkWriteFencing(db, 'ws-fence', 'writer', 'src/owned.ts', { leaseId: lease.id, epoch: lease.epoch, taskId: 'task-b' }), /belongs to task/)
    assert.throws(() => checkWriteFencing(db, 'ws-fence', 'writer', 'src/not-owned.ts', { leaseId: lease.id, epoch: lease.epoch, taskId: 'task-a' }), /does not fence/)
  } finally { db.close(); rmSync(dir, { recursive: true, force: true }) }
})

test('NATIVE-ORCH: mission context API keeps the pack identity for its changes feed', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-context-api-')); const root = join(dir, 'ws'); mkdirSync(join(root, 'src'), { recursive: true })
  writeFileSync(join(root, 'src', 'task.ts'), 'export const task = true\n')
  const db = openStore(join(dir, 'brain.db')); const authKey = 'test-native-orch-token'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)').run('ws-api', 'api', root, new Date().toISOString())
  const handle = await serve({ db, uiRoot: null, authKey }, 0)
  try {
    const response = await fetch(`http://127.0.0.1:${handle.port}/api/mission/context-pack`, {
      method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${authKey}` },
      body: JSON.stringify({ workspaceId: 'ws-api', taskId: 'task-api', scopePaths: ['src/task.ts'], requirementIds: ['NS22-024'], tokenBudget: 512 }),
    })
    assert.equal(response.status, 200, await response.clone().text())
    const body = await response.json() as { ok: boolean; pack: { id: string; tokenBudget: number; requirementIds: string[] } }
    assert.equal(body.ok, true); assert.equal(body.pack.tokenBudget, 512); assert.deepEqual(body.pack.requirementIds, ['NS22-024'])
    const changes = await (await fetch(`http://127.0.0.1:${handle.port}/api/mission/context-pack/${body.pack.id}/changes`)).json() as { ok: boolean; changes: { packId: string; stale: boolean } }
    assert.equal(changes.ok, true); assert.equal(changes.changes.packId, body.pack.id); assert.equal(changes.changes.stale, false)
  } finally { await handle.close(); db.close(); rmSync(dir, { recursive: true, force: true }) }
})

test('NATIVE-ORCH: task context and path fence span two real worktrees of one repository', { skip: skipGit }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-native-orch-'))
  const planet = join(dir, 'plugpt'); const code = join(planet, 'Code'); const main = join(code, 'repo')
  const linked = join(code, 'repo--worker-b'); const db = openStore(join(dir, 'brain.db'))
  try {
    mkdirSync(main, { recursive: true }); git(main, ['init', '-q'])
    write(main, 'src/shared.ts', 'export const shared = 1\n'); write(main, 'requirements.md', '---\ndecision: one authority\n---\n# Native orchestration\n')
    git(main, ['add', '.']); git(main, ['commit', '-q', '-m', 'init']); git(main, ['branch', '-M', 'main'])
    git(main, ['worktree', 'add', '-q', '-b', 'worker-b', linked])

    const registered = registerPlanet(db, planet)
    const checkoutIds = discoverCheckouts(code, registered.planetId).map(checkout => checkout.checkoutId)
    setPlanetIndexSelection(db, registered.workspaceId, checkoutIds)
    indexPlanetWorkspace(db, registered.workspaceId)
    const inventory = listPlanet(db, registered.workspaceId)
    const mainCheckout = inventory.checkouts.find(checkout => checkout.relPrefix === 'Code/repo')!
    const linkedCheckout = inventory.checkouts.find(checkout => checkout.relPrefix === 'Code/repo--worker-b')!
    assert.ok(mainCheckout && linkedCheckout, 'both real worktrees are registered')

    const pack = createTaskContextPack(db, {
      workspaceId: registered.workspaceId, taskId: 'task-native-a', checkoutId: mainCheckout.id,
      scopePaths: ['Code/repo/src/shared.ts', 'Code/repo/requirements.md'], requirementIds: ['NS22-024', '38.4'], tokenBudget: 900,
    })
    assert.deepEqual(pack.requirementIds, ['38.4', 'NS22-024'])
    assert.equal(pack.revision.checkoutId, mainCheckout.id)
    assert.ok(pack.files.some(file => file.path.endsWith('src/shared.ts')))
    assert.ok(pack.notes.some(note => note.path.endsWith('requirements.md')))
    assert.ok(pack.decisions.some(decision => decision.value === 'one authority'))
    assert.ok(pack.tokenBudget <= 900)

    registerSwarmAgent(db, { agentId: 'agent-a', workspaceId: registered.workspaceId, checkoutId: mainCheckout.id, taskId: 'task-native-a' })
    registerSwarmAgent(db, { agentId: 'agent-b', workspaceId: registered.workspaceId, checkoutId: linkedCheckout.id, taskId: 'task-native-b' })
    const a = acquireLease(db, registered.workspaceId, { agentId: 'agent-a', taskId: 'task-native-a', paths: ['Code/repo/src/shared.ts'] })
    assert.equal(a.acquired, true)
    const b = acquireLease(db, registered.workspaceId, { agentId: 'agent-b', taskId: 'task-native-b', paths: ['Code/repo--worker-b/src/shared.ts'] })
    assert.equal(b.acquired, false, 'the same repository-relative file is fenced across worktrees')
    assert.equal(b.conflict?.holder.agentId, 'agent-a')
    assert.throws(() => checkWriteFencing(db, registered.workspaceId, 'agent-a', 'Code/repo/src/other.ts', {
      leaseId: a.lease!.id, epoch: a.lease!.epoch, taskId: 'task-native-a',
    }), (error: unknown) => error instanceof FencingError && /does not fence/.test(error.message))

    write(main, 'src/shared.ts', 'export const shared = 2\n')
    indexPlanetWorkspace(db, registered.workspaceId)
    const changes = changesSinceTaskContextPack(db, pack.id)
    assert.equal(changes.stale, true)
    assert.ok(changes.changed.some(change => change.path === 'Code/repo/src/shared.ts'))
  } finally {
    try { db.close() } catch { /* fixture cleanup */ }
    rmSync(dir, { recursive: true, force: true })
  }
})
