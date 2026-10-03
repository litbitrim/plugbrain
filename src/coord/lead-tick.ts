/**
 * Lead tick — the decisions one lead cycle would make, computed, never applied.
 *
 * The nightly NVIDIA lead lane watches a heterogeneous fleet that cannot be
 * pushed to. Before it can decide anything it has to answer the same five
 * questions every cycle:
 *
 *   1. which worker has no ready task to claim (feed it),
 *   2. which worker ended a turn blocked and why (unblock it),
 *   3. which review failed *after* the first fix round (quarantine it),
 *   4. which PASS delivery is a merge candidate, with branch and full commit
 *      read from the delivered result file,
 *   5. which cards of a wave file come next, in dependency order.
 *
 * This module computes that picture from the Brain store and writes nothing.
 * It is deterministic for a given store and clock: the lead lane can render
 * `plugbrain swarm lead-tick --dry-run --json` and then decide, and a test can
 * hold it against a synthetic store. Reading the delivered result files is the
 * only out-of-database access, and a missing file degrades to the receipt's
 * recorded source revision instead of failing.
 */
import { readFileSync } from 'node:fs'
import { isAbsolute, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'
import { ensureQueueSchema } from '../queue.ts'
import { ensureDependencySchema, UNBLOCKED_TASK_SQL } from './dependencies.ts'
import { ensureSwarmOpsSchema } from './swarm-ops.ts'

export interface LeadTickWaveCard {
  id: string
  plan?: string | null
  after?: string | null
  afterTask?: string | null
  hold?: boolean
  steps?: string
  goal?: string
}

export interface LeadTickWave {
  wave?: string
  cards?: LeadTickWaveCard[]
}

export interface LeadTickOptions {
  /** Injectable clock keeps the report reproducible in tests. */
  now?: Date
  /** Parsed wave file; the CLI reads and validates the file, this stays pure. */
  wave?: LeadTickWave | null
  /** Optional cap on the ready cards reported from the wave. */
  waveNext?: number
  /** Base for relative delivered_path values, normally the workspace root. */
  workspaceRoot?: string | null
  /** Injectable result-file reader; defaults to the filesystem. */
  readResult?: (path: string) => string | null
}

export interface StarvingWorker {
  agentId: string
  turnState: string | null
  readyTasks: number
  reason: string
}

export interface BlockedWorker {
  agentId: string
  reason: string
  heldTask: string | null
  heldTitle: string | null
}

export interface QuarantineProposal {
  sourceTaskId: string
  authorId: string
  fixRound: number
  caseState: string
  reviewTaskId: string | null
  judgment: string | null
  reason: string
}

export interface MergeCandidate {
  taskId: string
  title: string
  branch: string | null
  commit: string | null
  commitSource: 'result-file' | 'receipt' | 'none'
  deliveredPath: string | null
  deliveredBy: string | null
  judgment: string | null
}

export interface NextCard {
  cardId: string
  plan: string | null
  ready: boolean
  reason: string | null
}

export interface LeadTickDecision {
  kind: 'quarantine' | 'blocked' | 'merge' | 'refill' | 'next-card'
  priority: number
  summary: string
  agentId?: string
  taskId?: string
  cardId?: string
}

export interface LeadTickReport {
  workspaceId: string
  generatedAt: string
  dryRun: true
  waveId: string | null
  starvingWorkers: StarvingWorker[]
  blockedWorkers: BlockedWorker[]
  quarantineProposals: QuarantineProposal[]
  mergeCandidates: MergeCandidate[]
  nextCards: NextCard[]
  decisions: LeadTickDecision[]
}

interface AgentRow {
  id: string
  turn_state: string | null
  turn_summary: string | null
}

interface TaskRow {
  id: string
  title: string
  addressed_to: string | null
  state: string
  delivered_path: string | null
}

const PASS = /^PASS/

function tableExists(db: DatabaseSync, name: string): boolean {
  return db.prepare("SELECT 1 AS found FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) !== undefined
}

/**
 * A full 40-hex commit is only a commit when the result file names it; a bare
 * hash in prose would be a guess. The receipt's recorded revision is the
 * fallback and is labelled as such.
 */
function commitFrom(text: string | null, receiptRevision: string | null): { commit: string | null; source: 'result-file' | 'receipt' | 'none' } {
  if (text !== null) {
    const named = /(?:commit|sha|revision)\s*:?\s*\**\s*`?([0-9a-f]{40})`?/i.exec(text)?.[1]
    if (named !== undefined) return { commit: named, source: 'result-file' }
    const bare = /\b[0-9a-f]{40}\b/.exec(text)?.[0]
    if (bare !== undefined) return { commit: bare, source: 'result-file' }
  }
  if (receiptRevision !== null && /^[0-9a-f]{40}$/.test(receiptRevision)) return { commit: receiptRevision, source: 'receipt' }
  return { commit: null, source: 'none' }
}

function branchFrom(text: string | null): string | null {
  if (text === null) return null
  return /branch\s*:?\s*\**\s*`?([A-Za-z0-9._/-]+)`?/i.exec(text)?.[1] ?? null
}

function starvingWorkers(db: DatabaseSync, workspaceId: string): StarvingWorker[] {
  const workers = db.prepare(`SELECT id, turn_state, turn_summary FROM agents
    WHERE workspace_id = ? AND retired_at IS NULL AND turn_state = 'needs-task' ORDER BY id`)
    .all(workspaceId) as unknown as AgentRow[]
  const ready = db.prepare(`SELECT id, title, addressed_to, state, delivered_path FROM queue_tasks
    WHERE workspace_id = ? AND state = 'pending' AND superseded_by IS NULL
      AND ${UNBLOCKED_TASK_SQL}`).all(workspaceId) as unknown as TaskRow[]
  return workers
    .map(worker => {
      const claimable = ready.filter(task => task.addressed_to === null || task.addressed_to === worker.id)
      if (claimable.length > 0) return null
      return {
        agentId: worker.id,
        turnState: worker.turn_state,
        readyTasks: 0,
        reason: 'keine bereite Aufgabe in der Queue',
      } satisfies StarvingWorker
    })
    .filter((row): row is StarvingWorker => row !== null)
}

function blockedWorkers(db: DatabaseSync, workspaceId: string): BlockedWorker[] {
  const workers = db.prepare(`SELECT id, turn_state, turn_summary FROM agents
    WHERE workspace_id = ? AND retired_at IS NULL AND turn_state = 'blocked' ORDER BY id`)
    .all(workspaceId) as unknown as AgentRow[]
  return workers.map(worker => {
    const held = db.prepare(`SELECT id, title FROM queue_tasks
      WHERE workspace_id = ? AND claimed_by = ? AND state = 'claimed'
      ORDER BY claimed_at DESC, created_at DESC LIMIT 1`).get(workspaceId, worker.id) as
      { id: string; title: string } | undefined
    return {
      agentId: worker.id,
      reason: worker.turn_summary?.trim() || 'kein Grund im Turn-Ende angegeben',
      heldTask: held?.id ?? null,
      heldTitle: held?.title ?? null,
    } satisfies BlockedWorker
  })
}

function quarantineProposals(db: DatabaseSync, workspaceId: string): QuarantineProposal[] {
  if (!tableExists(db, 'fleet_automation_cases') || !tableExists(db, 'fleet_automation_tasks')) return []
  const cases = db.prepare(`SELECT source_task_id, author_id, fix_round, state FROM fleet_automation_cases
    WHERE workspace_id = ? ORDER BY source_task_id`).all(workspaceId) as unknown as
    Array<{ source_task_id: string; author_id: string; fix_round: number; state: string }>
  const proposals: QuarantineProposal[] = []
  for (const entry of cases) {
    const latest = db.prepare(`SELECT t.task_id, d.review_judgment, d.delivered_at
      FROM fleet_automation_tasks t
      LEFT JOIN queue_deliveries d ON d.task_id = t.task_id
      WHERE t.workspace_id = ? AND t.source_task_id = ? AND t.role = 'review'
      ORDER BY d.delivered_at DESC, t.rowid DESC LIMIT 1`).get(workspaceId, entry.source_task_id) as
      { task_id: string; review_judgment: string | null; delivered_at: string | null } | undefined
    const judgment = latest?.review_judgment?.toUpperCase() ?? null
    // A FAIL before any fix round is the normal first bounce. A FAIL that comes
    // back after FIX1 (fix_round >= 1) is the case the lead quarantines.
    if (judgment !== 'FAIL' || Number(entry.fix_round) < 1) continue
    proposals.push({
      sourceTaskId: entry.source_task_id,
      authorId: entry.author_id,
      fixRound: Number(entry.fix_round),
      caseState: entry.state,
      reviewTaskId: latest?.task_id ?? null,
      judgment,
      reason: `Review-FAIL nach FIX${Number(entry.fix_round)} (Fix-Runden ${Number(entry.fix_round)} von 2)`,
    })
  }
  return proposals
}

function mergeCandidates(
  db: DatabaseSync,
  workspaceId: string,
  readResult: (path: string) => string | null,
): MergeCandidate[] {
  const rows = db.prepare(`SELECT q.id, q.title, q.delivered_path, q.claimed_by,
      d.delivered_by, d.review_judgment, d.source_revision
    FROM queue_tasks q JOIN queue_deliveries d ON d.task_id = q.id
    WHERE q.workspace_id = ? AND q.state = 'delivered' AND d.review_judgment IS NOT NULL
    ORDER BY q.id`).all(workspaceId) as unknown as Array<{
      id: string; title: string; delivered_path: string | null; claimed_by: string | null
      delivered_by: string | null; review_judgment: string | null; source_revision: string | null
    }>
  const candidates: MergeCandidate[] = []
  for (const row of rows) {
    if (!PASS.test(row.review_judgment?.toUpperCase() ?? '')) continue
    // A review task's own delivery carries PASS too; only the work being
    // integrated is a merge candidate, not the receipt about it.
    if (/^(review|integrate|fix):/i.test(row.title)) continue
    const text = row.delivered_path === null ? null : readResult(row.delivered_path)
    const { commit, source } = commitFrom(text, row.source_revision)
    candidates.push({
      taskId: row.id,
      title: row.title,
      branch: branchFrom(text),
      commit,
      commitSource: source,
      deliveredPath: row.delivered_path,
      deliveredBy: row.delivered_by ?? row.claimed_by,
      judgment: row.review_judgment,
    })
  }
  return candidates
}

function nextCards(db: DatabaseSync, workspaceId: string, wave: LeadTickWave, cap: number | undefined): NextCard[] {
  const cards = (wave.cards ?? []).filter((card): card is LeadTickWaveCard =>
    typeof card === 'object' && card !== null && typeof card.id === 'string' && card.id.trim() !== '')
  const queued = db.prepare(`SELECT id, title, state FROM queue_tasks
    WHERE workspace_id = ? AND superseded_by IS NULL`).all(workspaceId) as unknown as
    Array<{ id: string; title: string; state: string }>
  const forCard = (cardId: string) => queued.filter(task =>
    task.title === cardId || task.title.startsWith(`${cardId}/`) || task.title.startsWith(`${cardId} `))
  const result: NextCard[] = []
  let readyCount = 0
  for (const card of cards) {
    if (card.hold === true) {
      result.push({ cardId: card.id, plan: card.plan ?? null, ready: false, reason: 'hold-Karte wird nicht eingereiht' })
      continue
    }
    const own = forCard(card.id)
    if (own.length > 0) {
      result.push({ cardId: card.id, plan: card.plan ?? null, ready: false, reason: 'bereits eingereiht' })
      continue
    }
    let reason: string | null = null
    if (typeof card.after === 'string' && card.after.trim() !== '') {
      const dependency = forCard(card.after)
      if (dependency.length === 0) reason = `wartet auf ${card.after} (noch nicht eingereiht)`
      else if (!dependency.every(task => task.state === 'delivered')) reason = `wartet auf ${card.after} (noch nicht geliefert)`
    }
    if (reason === null && typeof card.afterTask === 'string' && card.afterTask.trim() !== '') {
      const dependency = queued.find(task => task.id === card.afterTask)
      if (dependency === undefined) reason = `wartet auf Task ${card.afterTask} (unbekannt)`
      else if (dependency.state !== 'delivered') reason = `wartet auf Task ${card.afterTask} (${dependency.state})`
    }
    if (reason !== null) {
      result.push({ cardId: card.id, plan: card.plan ?? null, ready: false, reason })
      continue
    }
    if (cap !== undefined && readyCount >= cap) {
      result.push({ cardId: card.id, plan: card.plan ?? null, ready: false, reason: 'Kappung erreicht' })
      continue
    }
    readyCount += 1
    result.push({ cardId: card.id, plan: card.plan ?? null, ready: true, reason: null })
  }
  return result
}

/** Compute the whole lead-tick picture. Read-only by construction. */
export function computeLeadTick(
  db: DatabaseSync,
  workspaceId: string,
  options: LeadTickOptions = {},
): LeadTickReport {
  ensureSwarmOpsSchema(db)
  ensureQueueSchema(db)
  ensureDependencySchema(db)
  requireWorkspace(db, workspaceId)
  const now = options.now ?? new Date()
  const readResult = options.readResult ?? ((path: string): string | null => {
    try {
      const base = options.workspaceRoot ?? process.cwd()
      const full = isAbsolute(path) ? path : resolve(base, path)
      return readFileSync(full, 'utf8')
    } catch { return null }
  })

  const starving = starvingWorkers(db, workspaceId)
  const blocked = blockedWorkers(db, workspaceId)
  const quarantine = quarantineProposals(db, workspaceId)
  const merge = mergeCandidates(db, workspaceId, readResult)
  const cards = options.wave ? nextCards(db, workspaceId, options.wave, options.waveNext) : []

  const decisions: LeadTickDecision[] = []
  for (const proposal of quarantine) decisions.push({
    kind: 'quarantine', priority: 1,
    summary: `${proposal.reason}: ${proposal.sourceTaskId} (Autor ${proposal.authorId})`,
    taskId: proposal.sourceTaskId, agentId: proposal.authorId,
  })
  for (const worker of blocked) decisions.push({
    kind: 'blocked', priority: 2,
    summary: `blockiert: ${worker.agentId} — ${worker.reason}`,
    agentId: worker.agentId, taskId: worker.heldTask ?? undefined,
  })
  for (const candidate of merge) decisions.push({
    kind: 'merge', priority: 3,
    summary: `Merge-Kandidat: ${candidate.taskId} @ ${candidate.branch ?? '?'} ${candidate.commit ?? '?'}`,
    taskId: candidate.taskId,
  })
  for (const worker of starving) decisions.push({
    kind: 'refill', priority: 4,
    summary: `${worker.agentId} braucht eine Aufgabe (${worker.reason})`,
    agentId: worker.agentId,
  })
  for (const card of cards.filter(entry => entry.ready)) decisions.push({
    kind: 'next-card', priority: 5,
    summary: `naechste Karte: ${card.cardId}${card.plan ? ` [${card.plan}]` : ''}`,
    cardId: card.cardId,
  })
  decisions.sort((left, right) =>
    left.priority - right.priority || (left.taskId ?? left.cardId ?? left.agentId ?? '').localeCompare(
      right.taskId ?? right.cardId ?? right.agentId ?? ''))

  return {
    workspaceId,
    generatedAt: now.toISOString(),
    dryRun: true,
    waveId: options.wave?.wave ?? null,
    starvingWorkers: starving,
    blockedWorkers: blocked,
    quarantineProposals: quarantine,
    mergeCandidates: merge,
    nextCards: cards,
    decisions,
  }
}
