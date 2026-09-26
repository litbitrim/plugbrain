/**
 * The master as the fleet sees it: a live projection of the ledger.
 *
 * The master ledger (`koordination/roadmap/PROGRESS-STATE.json` under the planet
 * root) is the one record of what the product must do and how far it is. The
 * brain never keeps a second copy: it reads the file when asked and joins it
 * with what only the brain knows, which queued task belongs to which master
 * task and which worker holds it. That answers the three questions a planner
 * asks every round: how far are we, what can start now, and who is on what.
 *
 * Two readings of "can start" are kept apart on purpose. A task is `ready` when
 * every dependency is done. It is `startable` when every dependency has at
 * least started: the fleet rule is that a DAG edge orders completion, not
 * work, and a planner that only offered ready tasks would idle every lane
 * behind the first unfinished one.
 *
 * The ledger's age is part of the answer. A board that says "39 of 40 not
 * started" after a day of merged work is not a planning tool but a stale
 * report, and the reader has to see that before trusting any number here.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'

/** Master task states that count as finished. The ledger's own verified codes are accepted too. */
const DONE_TASK = /^(DONE|VERIFIED|MERGED|CLOSED)/
/** Gate states that count as fully verified; the partial ones are reported separately. */
const GATE_VERIFIED = new Set(['VERIFIED_LOCAL'])
const GATE_PARTIAL = new Set(['VERIFIED_PARTIAL', 'VERIFIED_UNIT_ONLY'])
/** Queue states that mean a task is still waiting or being worked (see QueueState in queue.ts). */
const OPEN_QUEUE = new Set(['pending', 'claimed'])

export const PLAN_REF = /\b(M\d{2})\b/

interface LedgerTask {
  id: string
  title: string
  packageGate?: string
  requirementIds?: string[]
  dependsOn?: string[]
  priority?: string
  ownerRole?: string
  status: string
  ledgerGates?: string[]
  evidence?: string[]
}

interface LedgerGate {
  id: string
  wave?: string
  title: string
  requirementIds?: string[]
  status: string
  owner?: string
  evidence?: string[]
  dependsOn?: string[]
  updated?: string
  note?: string
}

interface Ledger {
  updated?: string
  updatedBy?: string
  statusOverall?: string
  master?: { id?: string; version?: string }
  gates?: LedgerGate[]
  nextActions?: Array<{ step: number; state: string; action: string; source?: string }>
  ownerDecisions?: Array<{ ref: string; decision: string; status: string }>
  statusDimensions?: Array<{ dimension: string; current: string }>
  masterTasks?: { source?: string; tasks?: LedgerTask[] }
}

export interface QueueRef {
  taskId: string
  title: string
  state: string
  claimedBy: string | null
  addressedTo: string | null
}

export interface PlanTask {
  id: string
  title: string
  status: string
  priority: string | null
  ownerRole: string | null
  packageGate: string | null
  dependsOn: string[]
  /** Dependencies that are not done yet. */
  blockedBy: string[]
  done: boolean
  ready: boolean
  startable: boolean
  requirementIds: string[]
  ledgerGates: string[]
  evidence: string[]
  /** Brain queue tasks that name this master task, open ones first. */
  queue: QueueRef[]
}

export interface PlanView {
  ledger: {
    path: string
    updated: string | null
    updatedBy: string | null
    ageHours: number | null
    statusOverall: string | null
    master: string | null
  }
  progress: {
    tasksDone: number
    tasksTotal: number
    tasksInProgress: number
    gatesVerified: number
    gatesPartial: number
    gatesTotal: number
  }
  tasksByStatus: Record<string, number>
  gatesByStatus: Record<string, number>
  tasks: PlanTask[]
  /** Startable, not done, MUST before OPTIONAL, then by id. */
  next: PlanTask[]
  gates: Array<Pick<LedgerGate, 'id' | 'wave' | 'title' | 'status' | 'owner'> & { dependsOn: string[] }>
  openDecisions: Array<{ ref: string; decision: string }>
  dimensions: Array<{ dimension: string; current: string }>
  /** Queue tasks that name no master task: work the plan cannot account for. */
  unplanned: QueueRef[]
}

/** Where the ledger of this workspace lives. An explicit override wins. */
export function ledgerPath(db: DatabaseSync, workspaceId: string, env: NodeJS.ProcessEnv = process.env): string {
  const explicit = env.PLUGBRAIN_LEDGER?.trim()
  if (explicit) return explicit
  const row = db.prepare('SELECT root FROM workspaces WHERE id = ?').get(workspaceId) as { root: string } | undefined
  if (row === undefined) throw new Error(`unknown workspace: ${workspaceId}`)
  return join(row.root, 'koordination', 'roadmap', 'PROGRESS-STATE.json')
}

function readLedger(path: string): Ledger {
  if (!existsSync(path)) throw new Error(`no master ledger at ${path}`)
  return JSON.parse(readFileSync(path, 'utf8')) as Ledger
}

/** The plan reference of a queue task: its own column, else the first M-id in its title. */
function planRefOf(title: string, stored: string | null): string | null {
  if (stored) return stored
  return PLAN_REF.exec(title)?.[1] ?? null
}

function queueRefs(db: DatabaseSync, workspaceId: string): Array<QueueRef & { planRef: string | null }> {
  const hasQueue = db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'queue_tasks'").get()
  if (hasQueue === undefined) return []
  const columns = new Set((db.prepare('PRAGMA table_info(queue_tasks)').all() as Array<{ name: string }>)
    .map(column => column.name))
  const rows = db.prepare(
    `SELECT id, title, state, claimed_by AS claimedBy, addressed_to AS addressedTo,
            ${columns.has('plan_ref') ? 'plan_ref' : 'NULL'} AS planRef
       FROM queue_tasks WHERE workspace_id = ? ORDER BY created_at`).all(workspaceId) as
    Array<{ id: string; title: string; state: string; claimedBy: string | null; addressedTo: string | null; planRef: string | null }>
  return rows.map(row => ({
    taskId: row.id, title: row.title, state: row.state, claimedBy: row.claimedBy, addressedTo: row.addressedTo,
    planRef: planRefOf(row.title, row.planRef),
  }))
}

const count = <T>(items: T[], key: (item: T) => string): Record<string, number> => {
  const out: Record<string, number> = {}
  for (const item of items) out[key(item)] = (out[key(item)] ?? 0) + 1
  return out
}

/** Read the ledger and project it for the planner. */
export function planView(
  db: DatabaseSync, workspaceId: string, options: { path?: string; now?: number } = {},
): PlanView {
  const path = options.path ?? ledgerPath(db, workspaceId)
  const ledger = readLedger(path)
  const tasks = ledger.masterTasks?.tasks ?? []
  const gates = ledger.gates ?? []
  const byId = new Map(tasks.map(task => [task.id, task]))
  const isDone = (id: string): boolean => DONE_TASK.test(byId.get(id)?.status ?? '')
  const hasStarted = (id: string): boolean => isDone(id) || /IN_PROGRESS|REVIEW|PARTIAL/.test(byId.get(id)?.status ?? '')

  const queue = queueRefs(db, workspaceId)
  const queueFor = (id: string): QueueRef[] => queue
    .filter(ref => ref.planRef === id)
    .sort((a, b) => Number(OPEN_QUEUE.has(b.state)) - Number(OPEN_QUEUE.has(a.state)))
    .map(({ planRef: _planRef, ...ref }) => ref)

  const projected: PlanTask[] = tasks.map(task => {
    const dependsOn = task.dependsOn ?? []
    const blockedBy = dependsOn.filter(dep => !isDone(dep))
    const done = isDone(task.id)
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority ?? null,
      ownerRole: task.ownerRole ?? null,
      packageGate: task.packageGate ?? null,
      dependsOn,
      blockedBy,
      done,
      ready: !done && blockedBy.length === 0,
      startable: !done && dependsOn.every(hasStarted),
      requirementIds: task.requirementIds ?? [],
      ledgerGates: task.ledgerGates ?? [],
      evidence: task.evidence ?? [],
      queue: queueFor(task.id),
    }
  })

  const rank = (task: PlanTask): number => (task.priority === 'MUST' ? 0 : 1)
  const next = projected
    .filter(task => task.startable)
    .sort((a, b) => rank(a) - rank(b) || a.id.localeCompare(b.id))

  const planned = new Set(tasks.map(task => task.id))
  const unplanned = queue
    .filter(ref => OPEN_QUEUE.has(ref.state) && (ref.planRef === null || !planned.has(ref.planRef)))
    .map(({ planRef: _planRef, ...ref }) => ref)

  const updated = ledger.updated ?? null
  const now = options.now ?? Date.now()
  const ageSource = updated !== null && !Number.isNaN(Date.parse(updated))
    ? Date.parse(updated)
    : (() => { try { return statSync(path).mtimeMs } catch { return null } })()
  return {
    ledger: {
      path,
      updated,
      updatedBy: ledger.updatedBy ?? null,
      ageHours: ageSource === null ? null : Math.round(((now - ageSource) / 3_600_000) * 10) / 10,
      statusOverall: ledger.statusOverall ?? null,
      master: ledger.master?.id ? `${ledger.master.id} ${ledger.master.version ?? ''}`.trim() : null,
    },
    progress: {
      tasksDone: projected.filter(task => task.done).length,
      tasksTotal: projected.length,
      tasksInProgress: projected.filter(task => !task.done && /IN_PROGRESS|REVIEW|PARTIAL/.test(task.status)).length,
      gatesVerified: gates.filter(gate => GATE_VERIFIED.has(gate.status)).length,
      gatesPartial: gates.filter(gate => GATE_PARTIAL.has(gate.status)).length,
      gatesTotal: gates.length,
    },
    tasksByStatus: count(projected, task => task.status),
    gatesByStatus: count(gates, gate => gate.status),
    tasks: projected,
    next,
    gates: gates.map(gate => ({
      id: gate.id, wave: gate.wave, title: gate.title, status: gate.status, owner: gate.owner,
      dependsOn: gate.dependsOn ?? [],
    })),
    openDecisions: (ledger.ownerDecisions ?? [])
      .filter(decision => decision.status !== 'DECIDED')
      .map(decision => ({ ref: decision.ref, decision: decision.decision })),
    dimensions: (ledger.statusDimensions ?? []).map(({ dimension, current }) => ({ dimension, current })),
    unplanned,
  }
}

/** One master task with everything the planner and the worker need to start it. */
export function planTask(db: DatabaseSync, workspaceId: string, id: string, options: { path?: string } = {}): PlanTask {
  const view = planView(db, workspaceId, options)
  const task = view.tasks.find(candidate => candidate.id.toLowerCase() === id.toLowerCase())
  if (task === undefined) throw new Error(`no master task ${id} in ${view.ledger.path}`)
  return task
}

/**
 * Link queue tasks to master tasks. Adds the column on first use, so an older
 * store widens itself the moment a planner starts tagging work.
 */
export function ensurePlanColumns(db: DatabaseSync): void {
  const hasQueue = db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'queue_tasks'").get()
  if (hasQueue === undefined) return
  const columns = new Set((db.prepare('PRAGMA table_info(queue_tasks)').all() as Array<{ name: string }>)
    .map(column => column.name))
  if (!columns.has('plan_ref')) db.exec('ALTER TABLE queue_tasks ADD COLUMN plan_ref TEXT')
}

export function setPlanRef(db: DatabaseSync, taskId: string, planRef: string): void {
  if (!/^M\d{2}$/.test(planRef)) throw new Error(`not a master task id: ${planRef} (expected M00..M99)`)
  ensurePlanColumns(db)
  const changed = db.prepare('UPDATE queue_tasks SET plan_ref = ? WHERE id = ?').run(planRef, taskId).changes
  if (Number(changed) === 0) throw new Error(`unknown queue task: ${taskId}`)
}
