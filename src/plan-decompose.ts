/** Turn explicit Master-ledger decomposition metadata into an auditable queue spec. */
import { createHash } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { addTaskDependency } from './coord/dependencies.ts'
import { enqueueTask, ensureQueueSchema, type QueueTask } from './queue.ts'

export const AUTO_EXECUTABLE_CATEGORIES = new Set(['bugfix', 'documentation', 'maintenance', 'tests'])

interface LedgerEntry {
  id: string
  title: string
  category?: string
  brief?: string
  acceptance?: string[]
  reviewerRole?: string
  dependsOn?: string[]
  evidence?: string[]
}

export interface DecompositionLedger {
  gates?: LedgerEntry[]
  requirements?: LedgerEntry[]
}

export interface TaskSpec {
  id: string
  title: string
  category: string | null
  brief: string
  acceptance: string[]
  reviewerRole: string | null
  dependsOn: string[]
  evidence: string[]
  sourceHash: string
  idempotencyKey: string
}

export interface DecompositionResult {
  state: 'executable' | 'waiting-for-lead'
  reason: string | null
  spec: TaskSpec
}

const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(text)

export function decomposeLedgerTarget(ledger: DecompositionLedger, target: string): DecompositionResult {
  const entry = [...(ledger.gates ?? []), ...(ledger.requirements ?? [])]
    .find(candidate => candidate.id.toLowerCase() === target.toLowerCase())
  if (!entry) throw new Error(`no gate or requirement ${target} in Master ledger`)

  const canonical = JSON.stringify({
    id: entry.id, title: entry.title, category: entry.category ?? null, brief: entry.brief ?? '',
    acceptance: entry.acceptance ?? [], reviewerRole: entry.reviewerRole ?? null,
    dependsOn: entry.dependsOn ?? [], evidence: entry.evidence ?? [],
  })
  const sourceHash = createHash('sha256').update(canonical).digest('hex')
  const idempotencyKey = `plan:${entry.id.toLowerCase()}:${sourceHash}`
  const spec: TaskSpec = {
    id: entry.id, title: entry.title, category: text(entry.category) ? entry.category.trim().toLowerCase() : null,
    brief: text(entry.brief) ? entry.brief.trim() : '',
    acceptance: strings(entry.acceptance) ? entry.acceptance.map(item => item.trim()) : [],
    reviewerRole: text(entry.reviewerRole) ? entry.reviewerRole.trim() : null,
    dependsOn: strings(entry.dependsOn) ? entry.dependsOn.map(item => item.trim()) : [],
    evidence: strings(entry.evidence) ? entry.evidence.map(item => item.trim()) : [],
    sourceHash, idempotencyKey,
  }

  const missing: string[] = []
  if (!spec.category || !AUTO_EXECUTABLE_CATEGORIES.has(spec.category)) missing.push('category is not on the automatic-execution allowlist')
  if (!spec.brief) missing.push('brief is missing')
  if (spec.acceptance.length === 0) missing.push('acceptance criteria are missing')
  if (!spec.reviewerRole) missing.push('reviewer role is missing')
  if (spec.evidence.length === 0) missing.push('evidence is missing')
  return { state: missing.length === 0 ? 'executable' : 'waiting-for-lead', reason: missing.join('; ') || null, spec }
}

const sourceMarker = (id: string): string => `<!-- plugbrain-plan-source:${id.toLowerCase()} -->`

/** Persist only approved-by-policy specs to the canonical queue; all other results are read-only. */
export function applyDecomposedTask(
  db: DatabaseSync, workspaceId: string, result: DecompositionResult, requestedBy?: string,
): QueueTask {
  if (result.state !== 'executable') throw new Error('decomposition is waiting-for-lead and cannot be applied')
  const { spec } = result
  ensureQueueSchema(db)

  const existing = db.prepare('SELECT * FROM queue_tasks WHERE decomposition_key = ?').get(spec.idempotencyKey) as unknown as QueueTask | undefined
  if (existing) return existing

  const dependencies = spec.dependsOn.map(id => {
    const row = db.prepare('SELECT id FROM queue_tasks WHERE body LIKE ? ORDER BY created_at LIMIT 1')
      .get(`%${sourceMarker(id)}%`) as { id: string } | undefined
    if (!row) throw new Error(`dependency ${id} has no existing decomposed queue task`)
    return row.id
  })
  const body = [
    `Master reference: ${spec.id}`,
    `Category: ${spec.category}`,
    `Brief:\n${spec.brief}`,
    `Acceptance:\n${spec.acceptance.map(item => `- ${item}`).join('\n')}`,
    `Reviewer role: ${spec.reviewerRole}`,
    `Dependencies: ${spec.dependsOn.join(', ') || '(none)'}`,
    `Evidence:\n${spec.evidence.map(item => `- ${item}`).join('\n')}`,
    `Source SHA-256: ${spec.sourceHash}`,
    sourceMarker(spec.id),
  ].join('\n\n')

  db.exec('BEGIN IMMEDIATE')
  try {
    const raced = db.prepare('SELECT * FROM queue_tasks WHERE decomposition_key = ?').get(spec.idempotencyKey) as unknown as QueueTask | undefined
    if (raced) { db.exec('COMMIT'); return raced }
    const task = enqueueTask(db, workspaceId, { title: spec.title, body, requestedBy, decompositionKey: spec.idempotencyKey })
    for (const dependencyId of dependencies) addTaskDependency(db, task.id, dependencyId)
    db.exec('COMMIT')
    return task
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}
