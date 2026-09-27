import { randomUUID } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { coordEvents } from './events.ts'

export interface WaveEvidenceRef {
  source: string
  authorityRef: string
  confidence: string
}

export interface WaveTaskEvidence {
  taskId: string
  title: string
  state: string
  claimedBy: string | null
  reviewJudgment: string | null
  sourceRevision: string | null
  reviewedCommit: string | null
  independentReview: (WaveEvidenceRef & { reviewerId: string; judgment: string; commit: string }) | null
  integration: (WaveEvidenceRef & { commit: string | null }) | null
  ownerDecision: (WaveEvidenceRef & { decision: string }) | null
}

export interface WaveManifestEvidence extends WaveEvidenceRef {
  waveId: string
  taskIds: string[]
}

export interface WaveDoneTask {
  taskId: string
  title: string
  resolution: 'integrated' | 'owner-decision' | 'incomplete'
  evidence: string[]
}

export interface WaveDoneReport {
  status: 'DONE' | 'BLOCKED'
  waveId: string
  eventId: string | null
  manifestRef: string | null
  generatedAt: string
  tasks: WaveDoneTask[]
  blockers: string[]
  alreadyRecorded?: boolean
}

export function ensureWaveDoneSchema(db: DatabaseSync): void {
  db.exec(`CREATE TABLE IF NOT EXISTS wave_done_reports (
    workspace_id TEXT NOT NULL,
    wave_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    report_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (workspace_id, wave_id)
  )`)
}

function evaluateWave(
  waveId: string,
  manifest: WaveManifestEvidence | null,
  input: WaveTaskEvidence[],
): Omit<WaveDoneReport, 'eventId' | 'generatedAt'> {
  const blockers: string[] = []
  if (waveId.trim() === '') blockers.push('wave id is missing')
  const validManifest = manifest !== null && manifest.waveId === waveId
    && manifest.source === 'operator' && manifest.confidence === 'authoritative'
    && manifest.authorityRef.trim() !== '' && manifest.taskIds.length > 0
    && manifest.taskIds.every(id => id.trim() !== '')
    && new Set(manifest.taskIds).size === manifest.taskIds.length
  if (!validManifest) blockers.push('authoritative wave manifest is missing or invalid')
  const manifestIds = new Set(validManifest ? manifest!.taskIds : [])
  const inputIds = new Set(input.map(task => task.taskId))
  for (const taskId of manifestIds) {
    if (!inputIds.has(taskId)) blockers.push(`${taskId}: task from the manifest has no task record`)
  }
  for (const taskId of inputIds) {
    if (!manifestIds.has(taskId)) blockers.push(`${taskId}: task is not in the authoritative wave manifest`)
  }
  if (input.length === 0 && !validManifest) blockers.push('wave has no task evidence')
  const seen = new Set<string>()
  const tasks = input.map(task => {
    const taskBlockers: string[] = []
    if (task.taskId.trim() === '' || seen.has(task.taskId)) taskBlockers.push('task id is missing or duplicated')
    seen.add(task.taskId)
    if (task.state !== 'delivered') taskBlockers.push('task is not delivered')
    const validReview = task.reviewJudgment === 'PASS'
      && Boolean(task.reviewedCommit && task.sourceRevision && task.reviewedCommit === task.sourceRevision)
      && task.independentReview !== null
      && task.independentReview.reviewerId !== ''
      && task.independentReview.reviewerId !== task.claimedBy
      && task.independentReview.judgment === 'PASS'
      && task.independentReview.commit === task.sourceRevision
      && task.independentReview.confidence === 'authoritative'
      && task.independentReview.authorityRef.trim() !== ''
    if (!validReview) {
      taskBlockers.push('independent review is missing or does not match the delivered revision')
    }

    const validIntegration = task.integration !== null
      && task.integration.confidence === 'authoritative'
      && task.integration.authorityRef.trim() !== ''
      && task.integration.commit !== null
      && task.integration.commit.trim() !== ''
    const validDecision = task.ownerDecision !== null
      && task.ownerDecision.source === 'operator'
      && task.ownerDecision.confidence === 'authoritative'
      && task.ownerDecision.authorityRef.trim() !== ''
      && task.ownerDecision.decision.trim() !== ''
    if (!validIntegration && !validDecision) taskBlockers.push('integration proof or explicit owner decision is missing')
    blockers.push(...taskBlockers.map(reason => `${task.taskId || '(unknown task)'}: ${reason}`))

    const refs = [
      validReview ? `review:${task.independentReview!.authorityRef}@${task.independentReview!.commit}` : '',
      validIntegration ? task.integration!.authorityRef : '',
      validDecision ? task.ownerDecision!.authorityRef : '',
    ].filter(Boolean)
    return {
      taskId: task.taskId,
      title: task.title,
      resolution: taskBlockers.length > 0 ? 'incomplete' : validIntegration ? 'integrated' : 'owner-decision',
      evidence: refs,
    } satisfies WaveDoneTask
  })
  return {
    status: blockers.length === 0 ? 'DONE' : 'BLOCKED',
    waveId,
    manifestRef: validManifest ? manifest!.authorityRef : null,
    tasks,
    blockers,
  }
}

/** Persist the first complete report and emit exactly one live WAVE-DONE event. */
export function recordWaveDone(
  db: DatabaseSync,
  workspaceId: string,
  waveId: string,
  manifest: WaveManifestEvidence | null,
  evidence: WaveTaskEvidence[],
): WaveDoneReport {
  ensureWaveDoneSchema(db)
  const existing = db.prepare('SELECT report_json FROM wave_done_reports WHERE workspace_id = ? AND wave_id = ?')
    .get(workspaceId, waveId) as { report_json: string } | undefined
  if (existing) return { ...(JSON.parse(existing.report_json) as WaveDoneReport), alreadyRecorded: true }

  const evaluated = evaluateWave(waveId, manifest, evidence)
  const generatedAt = new Date().toISOString()
  if (evaluated.status === 'BLOCKED') return { ...evaluated, eventId: null, generatedAt }

  const report: WaveDoneReport = { ...evaluated, eventId: randomUUID(), generatedAt }
  db.exec('BEGIN IMMEDIATE')
  try {
    const inserted = db.prepare(`INSERT OR IGNORE INTO wave_done_reports
      (workspace_id, wave_id, event_id, report_json, created_at) VALUES (?, ?, ?, ?, ?)`)
      .run(workspaceId, waveId, report.eventId, JSON.stringify(report), generatedAt)
    if (Number(inserted.changes) !== 1) {
      const raced = db.prepare('SELECT report_json FROM wave_done_reports WHERE workspace_id = ? AND wave_id = ?')
        .get(workspaceId, waveId) as { report_json: string } | undefined
      if (!raced) throw new Error('wave completion report was not persisted')
      db.exec('COMMIT')
      return { ...(JSON.parse(raced.report_json) as WaveDoneReport), alreadyRecorded: true }
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
  coordEvents.emitLive('WAVE-DONE', report)
  return report
}
