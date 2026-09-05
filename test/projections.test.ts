/**
 * Projection gates: City, Mesh, Awareness and the conflict rules.
 *
 * These run the real indexer over a real workspace and the real trace store.
 * The recurring theme is that a projection must never be more confident than
 * its source: a registry reference is not a running worker, a same-module edit
 * is not a conflict, and a pack that dropped half its content must say so.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, unlinkSync, renameSync, utimesSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { ingestTraceEvents, type AgentTraceEvent } from '../src/trace.ts'
import { evaluateClaim, liveClaims, pathOwnership } from '../src/projections/conflicts.ts'
import { buildAwarenessPack, createAwarenessPort } from '../src/projections/awareness.ts'
import { citySnapshot, cityDelta } from '../src/projections/city.ts'
import { meshSnapshot, meshTimeline } from '../src/projections/mesh.ts'

const WS = 'ws-proj'
const RUNTIME = 'fcae1c74-99c3-4c7b-ba07-8aabf42b4ffe'

interface Fixture {
  root: string
  db: ReturnType<typeof openStore>
  cleanup: () => void
}

function fixture(name: string): Fixture {
  const dir = mkdtempSync(join(tmpdir(), `plugbrain-${name}-`))
  const root = join(dir, 'ws')
  mkdirSync(root, { recursive: true })
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(WS, name, root, new Date().toISOString())
  return {
    root, db,
    cleanup: () => {
      try { db.close() } catch { /* already closed */ }
      try { rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }) } catch { /* lock */ }
    },
  }
}

function write(root: string, rel: string, content: string): void {
  const abs = join(root, rel)
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, content)
  const future = new Date(Date.now() + 2000)
  utimesSync(abs, future, future)
}

let seq = 0
function ev(overrides: Partial<AgentTraceEvent> & Pick<AgentTraceEvent, 'eventId' | 'type'>): AgentTraceEvent {
  seq += 1
  return {
    schema: 1,
    source: 'operator',
    sourceSequence: seq,
    runtimeInstanceId: RUNTIME,
    workspaceId: WS,
    occurredAt: new Date(Date.UTC(2026, 8, 5, 12, 0, seq)).toISOString(),
    observedAt: new Date(Date.UTC(2026, 8, 5, 12, 0, seq)).toISOString(),
    provenance: { mode: 'live', authorityRef: `operator:/v1/events#${seq}`, confidence: 'authoritative' },
    ...overrides,
  }
}
const known = new Set([WS])

// ---------------------------------------------------------------------------
// Conflict and ownership gates
// ---------------------------------------------------------------------------

test('conflicts: the three degrees of overlap are distinguished, not collapsed', () => {
  const fx = fixture('conflict-degrees')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'c1', type: 'file.claimed', taskId: 'task-a', agentId: 'agent-a',
        worktreeId: 'wt-a', fileRefs: ['src/core/engine.ts'], payload: { mode: 'write' } }),
      ev({ eventId: 'c2', type: 'file.claimed', taskId: 'task-b', agentId: 'agent-b',
        fileRefs: ['src/core/sibling.ts'], payload: { mode: 'write' } }),
      ev({ eventId: 'c3', type: 'file.claimed', taskId: 'task-c', agentId: 'agent-c',
        fileRefs: ['src/other/reader.ts'], payload: { mode: 'read' } }),
    ], { knownWorkspaceIds: known })

    const verdict = evaluateClaim(fx.db, WS, {
      taskId: 'task-mine', paths: ['src/core/engine.ts', 'src/other/reader.ts'], mode: 'write',
    })

    assert.equal(verdict.admissible, false, 'a hard conflict did not block')
    assert.equal(verdict.hardConflicts.length, 1)
    assert.equal(verdict.hardConflicts[0].path, 'src/core/engine.ts')
    assert.match(verdict.hardConflicts[0].reason, /task-a is already writing/)
    assert.equal(verdict.softOverlaps.length, 1, 'the same-module sibling was not a soft overlap')
    assert.equal(verdict.softOverlaps[0].path, 'src/core/sibling.ts')
    assert.equal(verdict.readOnlyOverlaps.length, 1)
    assert.equal(verdict.readOnlyOverlaps[0].path, 'src/other/reader.ts')
    assert.deepEqual(verdict.involvedTaskIds, ['task-a', 'task-b', 'task-c'])
    assert.deepEqual(verdict.involvedAgentIds, ['agent-a', 'agent-b', 'agent-c'])
  } finally { fx.cleanup() }
})

test('conflicts: a soft overlap does NOT block; parallel worktrees stay possible', () => {
  const fx = fixture('conflict-soft')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 's1', type: 'file.claimed', taskId: 'task-a', agentId: 'agent-a',
        fileRefs: ['src/core/a.ts'], payload: { mode: 'write' } }),
    ], { knownWorkspaceIds: known })

    const verdict = evaluateClaim(fx.db, WS, {
      taskId: 'task-b', paths: ['src/core/b.ts'], mode: 'write',
    })

    assert.equal(verdict.admissible, true, 'a same-module edit blocked parallel work')
    assert.equal(verdict.hardConflicts.length, 0)
    assert.equal(verdict.softOverlaps.length, 1)
  } finally { fx.cleanup() }
})

test('conflicts: a finished task releases its claims', () => {
  const fx = fixture('conflict-release')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'r1', type: 'file.claimed', taskId: 'task-a', agentId: 'agent-a',
        workerId: 'w-a', fileRefs: ['src/x.ts'], payload: { mode: 'write' } }),
    ], { knownWorkspaceIds: known })
    assert.equal(liveClaims(fx.db, WS).length, 1)
    assert.equal(evaluateClaim(fx.db, WS, { taskId: 'task-b', paths: ['src/x.ts'], mode: 'write' }).admissible, false)

    ingestTraceEvents(fx.db, [
      ev({ eventId: 'r2', type: 'worker.completed', taskId: 'task-a', workerId: 'w-a' }),
    ], { knownWorkspaceIds: known })

    assert.equal(liveClaims(fx.db, WS).length, 0, 'a completed worker still held its claim')
    assert.equal(evaluateClaim(fx.db, WS, { taskId: 'task-b', paths: ['src/x.ts'], mode: 'write' }).admissible, true)
  } finally { fx.cleanup() }
})

test('conflicts: rename carries ownership to the new path and does not invent a new owner', () => {
  const fx = fixture('conflict-rename')
  try {
    write(fx.root, 'old.ts', 'export function keep() { return 1 }\n')
    indexWorkspace(fx.db, WS, fx.root)
    fx.db.prepare('INSERT INTO agents (id,name,color,hue,first_seen,last_seen) VALUES (?,?,?,?,?,?)')
      .run('agent-owner', 'owner', '#123456', 200, '2026-09-05', '2026-09-05')
    const fileId = (fx.db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
      .get(WS, 'old.ts') as { id: number }).id
    fx.db.prepare('INSERT INTO file_owner (file_id, agent_id, action, at) VALUES (?,?,?,?)')
      .run(fileId, 'agent-owner', 'write', '2026-09-05T10:00:00.000Z')

    renameSync(join(fx.root, 'old.ts'), join(fx.root, 'new.ts'))
    const future = new Date(Date.now() + 2000)
    utimesSync(join(fx.root, 'new.ts'), future, future)
    indexWorkspace(fx.db, WS, fx.root)

    const owners = pathOwnership(fx.db, WS)
    const paths = owners.map(row => row.path)
    assert.ok(paths.includes('new.ts'), 'ownership did not follow the rename')
    assert.ok(!paths.includes('old.ts'), 'the pre-rename path kept a stale owner')
    assert.equal(owners.find(row => row.path === 'new.ts')?.agentId, 'agent-owner')
  } finally { fx.cleanup() }
})

// ---------------------------------------------------------------------------
// Awareness pack
// ---------------------------------------------------------------------------

test('awareness: names the conflicting task, forbids the path, and cites its evidence', () => {
  const fx = fixture('aware-conflict')
  try {
    write(fx.root, 'src/core/engine.ts', 'export function run() { return 1 }\n')
    write(fx.root, 'src/core/user.ts', 'import { run } from "./engine.ts"\nexport function go() { return run() }\n')
    indexWorkspace(fx.db, WS, fx.root)
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'a1', type: 'file.claimed', taskId: 'task-other', agentId: 'agent-other',
        worktreeId: 'wt-other', fileRefs: ['src/core/engine.ts'], payload: { mode: 'write' } }),
    ], { knownWorkspaceIds: known })

    const pack = buildAwarenessPack(fx.db, {
      workspaceId: WS, taskId: 'task-mine', intendedPaths: ['src/core/engine.ts'], mode: 'write',
    })

    assert.equal(pack.verdict.admissible, false)
    assert.deepEqual(pack.forbiddenPaths, ['src/core/engine.ts'])
    assert.ok(pack.collisionWarnings.some(w => w.startsWith('HARD:') && w.includes('task-other')))
    assert.equal(pack.fileClaims.length, 1)
    assert.equal(pack.fileClaims[0].taskId, 'task-other')
    assert.equal(pack.fileClaims[0].worktreeId, 'wt-other')
    assert.ok(pack.activeRelatedTasks.some(t => t.taskId === 'task-other' && t.dependencyRelation === 'same-file'))
    assert.ok(pack.evidenceRefs.includes('trace:a1'), 'the pack did not cite the claim event')
    assert.ok(pack.evidenceRefs.some(ref => ref.startsWith('brain:generation:')))
    // A dependant symbol is included, because changing engine.ts breaks it.
    assert.ok(pack.relevantSymbols.some(s => s.path === 'src/core/user.ts'),
      'a dependant of the intended file was not surfaced')
  } finally { fx.cleanup() }
})

test('awareness: identical inputs produce an identical digest; the pack is deterministic', () => {
  const fx = fixture('aware-determinism')
  try {
    write(fx.root, 'src/a.ts', 'export const a = 1\n')
    indexWorkspace(fx.db, WS, fx.root)
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'd1', type: 'file.claimed', taskId: 'task-x', agentId: 'agent-x',
        fileRefs: ['src/a.ts'], payload: { mode: 'write' } }),
    ], { knownWorkspaceIds: known })

    const clock = () => new Date('2026-09-05T00:00:00.000Z')
    const first = buildAwarenessPack(fx.db, {
      workspaceId: WS, taskId: 'task-mine', intendedPaths: ['src/a.ts'], now: clock,
    })
    const second = buildAwarenessPack(fx.db, {
      workspaceId: WS, taskId: 'task-mine', intendedPaths: ['src/a.ts'], now: clock,
    })

    assert.equal(first.packDigest, second.packDigest, 'the pack is not deterministic')
    assert.deepEqual(JSON.parse(JSON.stringify(first)), JSON.parse(JSON.stringify(second)))
  } finally { fx.cleanup() }
})

test('awareness: is bounded and reports exactly what it dropped', () => {
  const fx = fixture('aware-bounded')
  try {
    write(fx.root, 'src/big.ts', 'export const big = 1\n')
    indexWorkspace(fx.db, WS, fx.root)
    const many: AgentTraceEvent[] = []
    for (let i = 0; i < 60; i += 1) {
      many.push(ev({
        eventId: `claim-${i}`, type: 'file.claimed', taskId: `task-${i}`, agentId: `agent-${i}`,
        fileRefs: [`src/f${i}.ts`], payload: { mode: 'write' },
      }))
    }
    ingestTraceEvents(fx.db, many, { knownWorkspaceIds: known })

    const pack = buildAwarenessPack(fx.db, {
      workspaceId: WS, taskId: 'task-mine',
      intendedPaths: ['src/big.ts'],
      limits: { maxFileClaims: 10, maxRelatedTasks: 5 },
    })

    assert.equal(pack.fileClaims.length, 10, 'the claim list was not capped')
    assert.ok((pack.truncated.fileClaims ?? 0) > 0, 'a truncated list did not report the overflow')
    assert.ok(pack.activeRelatedTasks.length <= 5)
    // Bounded means bounded: the whole pack has to stay small.
    assert.ok(JSON.stringify(pack).length < 60_000, 'the pack is an unbounded dump')
  } finally { fx.cleanup() }
})

test('awareness: surfaces a handoff prepared for this task, and no other', () => {
  const fx = fixture('aware-handoff')
  try {
    write(fx.root, 'src/h.ts', 'export const h = 1\n')
    indexWorkspace(fx.db, WS, fx.root)
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'h1', type: 'work.prepared_for', taskId: 'task-upstream', agentId: 'agent-a',
        artifactRefs: ['artifact-1'], payload: { intendedTaskId: 'task-mine', targetAgentId: 'agent-b' } }),
      ev({ eventId: 'h2', type: 'work.prepared_for', taskId: 'task-other', agentId: 'agent-c',
        artifactRefs: ['artifact-2'], payload: { intendedTaskId: 'task-somebody-else' } }),
    ], { knownWorkspaceIds: known })

    const pack = buildAwarenessPack(fx.db, {
      workspaceId: WS, taskId: 'task-mine', intendedPaths: ['src/h.ts'],
    })

    assert.equal(pack.availableHandoffs.length, 1, 'a handoff for another task leaked in')
    assert.equal(pack.availableHandoffs[0].handoffId, 'h1')
    assert.deepEqual(pack.availableHandoffs[0].artifactRefs, ['artifact-1'])
    assert.ok(pack.activeRelatedTasks.some(
      t => t.taskId === 'task-upstream' && t.dependencyRelation === 'handoff-upstream'))
  } finally { fx.cleanup() }
})

test('awareness: the port is the seam a spawn gate calls', () => {
  const fx = fixture('aware-port')
  try {
    write(fx.root, 'src/p.ts', 'export const p = 1\n')
    indexWorkspace(fx.db, WS, fx.root)
    const port = createAwarenessPort(fx.db)
    const pack = port({ workspaceId: WS, taskId: 'task-mine', intendedPaths: ['src/p.ts'] })
    assert.equal(pack.taskId, 'task-mine')
    assert.equal(pack.verdict.admissible, true)
    assert.ok(pack.brainGeneration >= 1, 'the pack did not carry the brain generation')
  } finally { fx.cleanup() }
})

// ---------------------------------------------------------------------------
// City
// ---------------------------------------------------------------------------

test('city: building ids are stable across an edit and survive a rename', () => {
  const fx = fixture('city-stable')
  try {
    write(fx.root, 'src/alpha.ts', 'export const alpha = 1\n')
    // NOT lib/: the indexer skips it as build output, correctly.
    write(fx.root, 'pkg/beta.ts', 'export const beta = 2\n')
    indexWorkspace(fx.db, WS, fx.root)
    const before = citySnapshot(fx.db, WS)
    const alphaId = before.buildings.find(b => b.path === 'src/alpha.ts')?.id
    assert.ok(alphaId)
    assert.deepEqual(before.districts.map(d => d.name).sort(), ['pkg', 'src'])

    write(fx.root, 'src/alpha.ts', 'export const alpha = 111\nexport const extra = 2\n')
    indexWorkspace(fx.db, WS, fx.root)
    assert.equal(citySnapshot(fx.db, WS).buildings.find(b => b.path === 'src/alpha.ts')?.id, alphaId,
      'an edit changed the building id, so the renderer would drop and re-add it')

    renameSync(join(fx.root, 'src/alpha.ts'), join(fx.root, 'src/renamed.ts'))
    const future = new Date(Date.now() + 2000)
    utimesSync(join(fx.root, 'src/renamed.ts'), future, future)
    indexWorkspace(fx.db, WS, fx.root)
    const after = citySnapshot(fx.db, WS)
    assert.equal(after.buildings.find(b => b.path === 'src/renamed.ts')?.id, alphaId,
      'a rename replaced the building instead of moving it')
    assert.ok(!after.buildings.some(b => b.path === 'src/alpha.ts'))
  } finally { fx.cleanup() }
})

test('city: a delta repaints only what changed and lists real tombstones', () => {
  const fx = fixture('city-delta')
  try {
    for (let i = 0; i < 8; i += 1) write(fx.root, `src/m${i}.ts`, `export const v${i} = ${i}\n`)
    write(fx.root, 'src/doomed.ts', 'export const doomed = 1\n')
    indexWorkspace(fx.db, WS, fx.root)
    const base = citySnapshot(fx.db, WS)
    assert.equal(base.buildings.length, 9)

    write(fx.root, 'src/m3.ts', 'export const v3 = 333\n')
    unlinkSync(join(fx.root, 'src/doomed.ts'))
    indexWorkspace(fx.db, WS, fx.root)

    const delta = cityDelta(fx.db, WS, base.generation)
    assert.equal(delta.fromGeneration, base.generation)
    assert.equal(delta.toGeneration, base.generation + 1)
    assert.equal(delta.changed.length, 1, 'a one-file edit repainted more than one building')
    assert.equal(delta.changed[0].path, 'src/m3.ts')
    assert.equal(delta.unchangedBuildings, 7)
    assert.deepEqual(delta.removed, ['path:src/doomed.ts'])
    assert.ok(delta.tombstones.some(t => t.path === 'src/doomed.ts' && t.reason === 'deleted'))
  } finally { fx.cleanup() }
})

test('city: a quiet workspace produces an empty delta', () => {
  const fx = fixture('city-quiet')
  try {
    write(fx.root, 'src/a.ts', 'export const a = 1\n')
    indexWorkspace(fx.db, WS, fx.root)
    const snapshot = citySnapshot(fx.db, WS)
    indexWorkspace(fx.db, WS, fx.root)          // no-op
    const delta = cityDelta(fx.db, WS, snapshot.generation)
    assert.equal(delta.changed.length, 0)
    assert.equal(delta.removed.length, 0)
    assert.equal(delta.toGeneration, snapshot.generation, 'a no-op index advanced the city generation')
  } finally { fx.cleanup() }
})

test('city: roads are real resolved imports and carry a legend', () => {
  const fx = fixture('city-roads')
  try {
    write(fx.root, 'src/target.ts', 'export function target() { return 1 }\n')
    write(fx.root, 'src/caller.ts', 'import { target } from "./target.ts"\nexport const c = target\n')
    indexWorkspace(fx.db, WS, fx.root)
    const snapshot = citySnapshot(fx.db, WS)
    const ids = new Map(snapshot.buildings.map(b => [b.path, b.fileId]))
    assert.ok(snapshot.roads.some(r =>
      r.fromFileId === ids.get('src/caller.ts') && r.toFileId === ids.get('src/target.ts')),
      'a resolved import produced no road')
    assert.ok(Object.keys(snapshot.legend).length > 0, 'the city shipped without a legend')
    assert.equal(snapshot.totals.buildings, 2)
  } finally { fx.cleanup() }
})

// ---------------------------------------------------------------------------
// Mesh
// ---------------------------------------------------------------------------

test('mesh: a worker with no observed start is proof-unavailable, never running', () => {
  const fx = fixture('mesh-proof')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'm1', type: 'task.assigned', taskId: 'task-1', agentId: 'agent-1' }),
      // Referenced by a heartbeat, but never started. A registry row looks
      // exactly like this.
      ev({ eventId: 'm2', type: 'worker.heartbeat', taskId: 'task-1', workerId: 'w-ghost' }),
      ev({ eventId: 'm3', type: 'worker.started', taskId: 'task-2', workerId: 'w-real', agentId: 'agent-2' }),
    ], { knownWorkspaceIds: known })

    const mesh = meshSnapshot(fx.db, WS)
    const ghost = mesh.nodes.find(n => n.id === 'worker:w-ghost')
    const real = mesh.nodes.find(n => n.id === 'worker:w-real')

    assert.equal(ghost?.proof, 'proof-unavailable', 'an unstarted worker was not flagged')
    assert.equal(real?.proof, 'process-started')
    assert.equal(mesh.unprovenWorkers.length, 1)
    assert.equal(mesh.unprovenWorkers[0].workerId, 'w-ghost')
    assert.match(mesh.unprovenWorkers[0].reason, /registry entry is not a running process/)
  } finally { fx.cleanup() }
})

test('mesh: an agent-to-agent handoff becomes a directed edge with evidence', () => {
  const fx = fixture('mesh-handoff')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'p1', type: 'work.prepared_for', agentId: 'agent-a', taskId: 'task-a',
        artifactRefs: ['art-1'], payload: { targetAgentId: 'agent-b' } }),
      ev({ eventId: 'p2', type: 'handoff.accepted', agentId: 'agent-b', taskId: 'task-b' }),
      ev({ eventId: 'p3', type: 'review.completed', agentId: 'agent-r', taskId: 'task-b' }),
    ], { knownWorkspaceIds: known })

    const mesh = meshSnapshot(fx.db, WS)
    const handoff = mesh.edges.find(e => e.kind === 'prepared-for')
    assert.ok(handoff, 'the handoff produced no directed edge')
    assert.equal(handoff.from, 'agent:agent-a')
    assert.equal(handoff.to, 'agent:agent-b')
    assert.deepEqual(handoff.evidence, ['p1'])
    assert.ok(mesh.edges.some(e => e.kind === 'reviewed' && e.from === 'agent:agent-r' && e.to === 'task:task-b'))
  } finally { fx.cleanup() }
})

test('mesh: a handoff with no named target produces no invented edge', () => {
  const fx = fixture('mesh-no-target')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'n1', type: 'work.prepared_for', agentId: 'agent-a', taskId: 'task-a' }),
      ev({ eventId: 'n2', type: 'agent.registered', agentId: 'agent-b' }),
    ], { knownWorkspaceIds: known })
    const mesh = meshSnapshot(fx.db, WS)
    assert.equal(mesh.edges.filter(e => e.kind === 'prepared-for').length, 0,
      'a handoff with no target invented a partner')
  } finally { fx.cleanup() }
})

test('mesh: out-of-order and duplicated ingestion produce an identical mesh', () => {
  const batch = [
    ev({ eventId: 'o1', type: 'task.assigned', taskId: 't', agentId: 'a' }),
    ev({ eventId: 'o2', type: 'worktree.leased', taskId: 't', worktreeId: 'wt' }),
    ev({ eventId: 'o3', type: 'worker.started', taskId: 't', workerId: 'w', agentId: 'a' }),
    ev({ eventId: 'o4', type: 'file.changed', taskId: 't', agentId: 'a', fileRefs: ['src/z.ts'] }),
  ]
  let ordered = ''
  let shuffled = ''
  const inOrder = fixture('mesh-order-1')
  try {
    ingestTraceEvents(inOrder.db, batch, { knownWorkspaceIds: known })
    ordered = JSON.stringify(meshSnapshot(inOrder.db, WS))
  } finally { inOrder.cleanup() }
  const outOfOrder = fixture('mesh-order-2')
  try {
    ingestTraceEvents(outOfOrder.db, [batch[3], batch[1]], { knownWorkspaceIds: known })
    ingestTraceEvents(outOfOrder.db, [batch[2], batch[1], batch[0], batch[3]], { knownWorkspaceIds: known })
    shuffled = JSON.stringify(meshSnapshot(outOfOrder.db, WS))
  } finally { outOfOrder.cleanup() }
  assert.equal(shuffled, ordered, 'arrival order changed the mesh')
})

test('mesh: a historical import is never presented as live', () => {
  const fx = fixture('mesh-import')
  try {
    ingestTraceEvents(fx.db, [
      ev({ eventId: 'i1', type: 'commit.created', agentId: 'agent-hist', taskId: 'task-hist',
        source: 'import',
        provenance: { mode: 'historical-import', authorityRef: 'git:abcdef', confidence: 'derived' } }),
      ev({ eventId: 'i2', type: 'commit.created', agentId: 'agent-live', taskId: 'task-live' }),
    ], { knownWorkspaceIds: known })

    const mesh = meshSnapshot(fx.db, WS)
    assert.equal(mesh.nodes.find(n => n.id === 'agent:agent-hist')?.provenance, 'historical-import')
    assert.equal(mesh.nodes.find(n => n.id === 'agent:agent-live')?.provenance, 'live')
  } finally { fx.cleanup() }
})

test('mesh: a timeline is bounded, ordered and filtered to one subject', () => {
  const fx = fixture('mesh-timeline')
  try {
    const events: AgentTraceEvent[] = []
    for (let i = 0; i < 40; i += 1) {
      events.push(ev({
        eventId: `t${i}`, type: 'worker.heartbeat',
        taskId: i % 2 === 0 ? 'task-even' : 'task-odd', workerId: 'w-1',
      }))
    }
    ingestTraceEvents(fx.db, events, { knownWorkspaceIds: known })

    const track = meshTimeline(fx.db, WS, { taskId: 'task-even', limit: 5 })
    assert.equal(track.length, 5, 'the timeline ignored its limit')
    assert.ok(track.every(entry => entry.taskId === 'task-even'), 'the timeline leaked another task')
    for (let i = 1; i < track.length; i += 1) {
      assert.ok(track[i - 1].occurredAt <= track[i].occurredAt, 'the timeline is not ordered')
    }
  } finally { fx.cleanup() }
})
