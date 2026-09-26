/**
 * The plan view: the master ledger joined with the brain's queue, and the MCP
 * tools that give an agent the plan and the notes without a second tool.
 *
 * The ledger here is a small real file in the shape of
 * koordination/roadmap/PROGRESS-STATE.json; the queue is the real queue table.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { ensureAgent } from '../src/access.ts'
import { ensureQueueSchema, enqueueTask } from '../src/queue.ts'
import { planTask, planView, setPlanRef } from '../src/plan.ts'
import { runSwarmCli } from '../src/swarm-cli.ts'
import { McpServer } from '../src/mcp/server.ts'
import { indexPlanetWorkspace, registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'

const home = mkdtempSync(join(tmpdir(), 'plugbrain-plan-home-'))
process.env.PLUGBRAIN_HOME = home
process.on('exit', () => { rmSync(home, { recursive: true, force: true }) })

interface ProgressStateFile {
  updated: string
  updatedBy: string
  statusOverall: string
  master: { id: string; version: string }
  gates: Array<{ id: string; wave: string; title: string; status: string; owner: string; dependsOn?: string[] }>
  ownerDecisions: Array<{ ref: string; decision: string; status: string }>
  statusDimensions: Array<{ dimension: string; current: string }>
  masterTasks: {
    tasks: Array<{ id: string; title: string; dependsOn: string[]; priority: string; status: string; ledgerGates?: string[]; evidence?: string[] }>
  }
}

const LEDGER: ProgressStateFile = {
  updated: '2026-09-22T21:50:58.623Z',
  updatedBy: 'integrator',
  statusOverall: 'PARTIAL',
  master: { id: 'PLUGPT-MASTER-01', version: '1.2.0' },
  gates: [
    { id: 'R0-GOVD-001', wave: 'R0', title: 'Norm', status: 'VERIFIED_LOCAL', owner: 'INTEGRATOR' },
    { id: 'R7-BRAIN-001', wave: 'R7', title: 'Brain live', status: 'VERIFIED_PARTIAL', owner: 'INTEGRATOR' },
    { id: 'R8-SURF-001', wave: 'R8', title: 'Board', status: 'OPEN', owner: 'INTEGRATOR', dependsOn: ['R7-BRAIN-001'] },
  ],
  ownerDecisions: [
    { ref: 'OD-1', decision: 'Public launch date', status: 'OPEN' },
    { ref: 'OD-2', decision: 'Brain first', status: 'DECIDED' },
  ],
  statusDimensions: [{ dimension: 'PRIVATE_WORKBENCH_READY', current: 'NOT_REACHED' }],
  masterTasks: {
    tasks: [
      { id: 'M00', title: 'Norm übernehmen', dependsOn: [], priority: 'MUST', status: 'IN_PROGRESS', ledgerGates: ['R0-GOVD-001'] },
      { id: 'M01', title: 'Backup', dependsOn: ['M00'], priority: 'MUST', status: 'NOT_STARTED' },
      { id: 'M02', title: 'Runtime', dependsOn: ['M01'], priority: 'MUST', status: 'NOT_STARTED' },
      { id: 'M03', title: 'Inventar', dependsOn: [], priority: 'OPTIONAL', status: 'DONE', evidence: ['closeout/x.json'] },
    ],
  },
}

function workspace() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-plan-'))
  const root = join(dir, 'plugpt')
  mkdirSync(join(root, 'koordination', 'roadmap'), { recursive: true })
  writeFileSync(join(root, 'koordination', 'roadmap', 'PROGRESS-STATE.json'), JSON.stringify(LEDGER))
  const db = openStore(join(dir, 'brain.db'))
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run('ws-plan', 'plugpt', root, new Date().toISOString())
  ensureQueueSchema(db)
  ensureAgent(db, 'integrator')
  return { dir, root, db, cleanup: () => { db.close(); rmSync(dir, { recursive: true, force: true }) } }
}

test('the plan counts honestly, offers what can start, and says how old the ledger is', () => {
  const w = workspace()
  try {
    const view = planView(w.db, 'ws-plan', { now: Date.parse('2026-09-23T21:50:58.623Z') })
    assert.equal(view.ledger.master, 'PLUGPT-MASTER-01 1.2.0')
    assert.equal(view.ledger.ageHours, 24, 'the reader sees that the ledger is a day old')
    assert.deepEqual(view.progress, {
      tasksDone: 1, tasksTotal: 4, tasksInProgress: 1, gatesVerified: 1, gatesPartial: 1, gatesTotal: 3,
    })
    assert.deepEqual(view.next.map(task => task.id), ['M00', 'M01'],
      'M01 may start while M00 runs; M02 waits for M01 to start')
    const m01 = view.tasks.find(task => task.id === 'M01')!
    assert.equal(m01.ready, false)
    assert.equal(m01.startable, true)
    assert.deepEqual(m01.blockedBy, ['M00'])
    assert.equal(view.tasks.find(task => task.id === 'M03')!.done, true)
    assert.deepEqual(view.openDecisions.map(decision => decision.ref), ['OD-1'])
    assert.deepEqual(view.gatesByStatus, { VERIFIED_LOCAL: 1, VERIFIED_PARTIAL: 1, OPEN: 1 })
  } finally { w.cleanup() }
})

test('queued work is joined to its master task by title or by an explicit link, and the rest is flagged', () => {
  const w = workspace()
  try {
    enqueueTask(w.db, 'ws-plan', { title: 'M01: Datenbank sichern', body: '', requestedBy: 'integrator' })
    const linked = enqueueTask(w.db, 'ws-plan', { title: 'Laufzeit umstellen', body: '', requestedBy: 'integrator' })
    setPlanRef(w.db, linked.id, 'M02')
    enqueueTask(w.db, 'ws-plan', { title: 'Aufräumen', body: '', requestedBy: 'integrator' })
    const m01 = planTask(w.db, 'ws-plan', 'm01')
    assert.deepEqual(m01.queue.map(ref => ref.title), ['M01: Datenbank sichern'])
    assert.deepEqual(planTask(w.db, 'ws-plan', 'M02').queue.map(ref => ref.title), ['Laufzeit umstellen'])
    assert.deepEqual(planView(w.db, 'ws-plan').unplanned.map(ref => ref.title), ['Aufräumen'],
      'work the plan cannot account for is visible')
    assert.throws(() => setPlanRef(w.db, linked.id, 'G12'), /not a master task id/)
    assert.throws(() => planTask(w.db, 'ws-plan', 'M99'), /no master task M99/)
  } finally { w.cleanup() }
})

test('swarm enqueue --plan links the task, and the MCP plan tool answers all four views', async () => {
  const w = workspace()
  const out: string[] = []
  const log = console.log
  console.log = (...parts: unknown[]) => { out.push(parts.join(' ')) }
  try {
    const code = runSwarmCli(w.db, ['enqueue', 'Brain', 'ausbauen', '--plan', 'M02', '--workspace', 'ws-plan'], () => 'ws-plan')
    assert.equal(code, 0)
  } finally { console.log = log }
  try {
    assert.match(out.join('\n'), /\[M02\]/)
    const mcp = new McpServer({ db: w.db, workspaceId: 'ws-plan', authKey: null })
    const status = await mcp.executeTool('plan', {}) as { ok: boolean; progress: { tasksTotal: number }; next: Array<{ id: string }> }
    assert.equal(status.ok, true)
    assert.equal(status.progress.tasksTotal, 4)
    assert.deepEqual(status.next.map(task => task.id), ['M00', 'M01'])
    const taskResult = await mcp.executeTool('plan', { view: 'task', id: 'M02' })
    const task = taskResult.task as { queue: Array<{ title: string }> }
    assert.deepEqual(task.queue.map(ref => ref.title), ['Brain ausbauen'])
    const gatesResult = await mcp.executeTool('plan', { view: 'gates', status: 'OPEN' })
    const gates = gatesResult.gates as Array<{ id: string }>
    assert.deepEqual(gates.map(gate => gate.id), ['R8-SURF-001'])
    const nextResult = await mcp.executeTool('plan', { view: 'next', limit: 1 })
    const next = nextResult.next as Array<{ id: string }>
    assert.deepEqual(next.map(t => t.id), ['M00'])
  } finally { w.cleanup() }
})

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()

test('the notes tools answer search, read, property query and backlinks over MCP', { skip: HAS_GIT ? false : 'git missing' }, async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-plan-notes-'))
  const root = join(dir, 'plugpt')
  const note = (rel: string, content: string): void => {
    const abs = join(root, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content)
    const future = new Date(Date.now() + 2000)
    utimesSync(abs, future, future)
  }
  mkdirSync(join(root, 'Code'), { recursive: true })
  note('Roadmap/Gates/R7.md', '---\ntyp: gate\nstand: offen\n---\n# R7\nDas Brain läuft als Dienst. Siehe [[Ziel]].\n')
  note('Planung/Ziel.md', '# Ziel\nDie Leitstelle der Flotte.\n')
  const db = openStore(join(dir, 'brain.db'))
  try {
    const planet = registerPlanet(db, root)
    setPlanetIndexSelection(db, planet.workspaceId, [])
    indexPlanetWorkspace(db, planet.workspaceId)
    const mcp = new McpServer({ db, workspaceId: planet.workspaceId, authKey: null })
    const queryResult = await mcp.executeTool('notes_query', { filter: 'typ=gate UND stand=offen' })
    const query = queryResult.notes as Array<{ path: string }>
    assert.deepEqual(query.map(n => n.path), ['Roadmap/Gates/R7.md'])
    const searchResult = await mcp.executeTool('notes_search', { query: 'Leitstelle', lines: true })
    const search = searchResult.hits as Array<{ path: string; line?: number }>
    assert.deepEqual(search.map(hit => hit.path), ['Planung/Ziel.md'])
    assert.equal(search[0]!.line, 2)
    const read = await mcp.executeTool('notes_read', { path: 'Roadmap/Gates/R7.md' }) as { ok: boolean; note: { properties: Array<{ key: string }> } }
    assert.equal(read.ok, true)
    assert.ok(read.note.properties.some(property => property.key === 'typ'))
    const backResult = await mcp.executeTool('notes_backlinks', { path: 'Planung/Ziel.md' })
    const back = backResult.backlinks as Array<{ path: string }>
    assert.deepEqual(back.map(link => link.path), ['Roadmap/Gates/R7.md'])
  } finally { db.close(); rmSync(dir, { recursive: true, force: true }) }
})
