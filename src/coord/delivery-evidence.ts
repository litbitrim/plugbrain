import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { realpathSync, readFileSync, statSync } from 'node:fs'
import { isAbsolute, relative, resolve, sep } from 'node:path'
import { AccessDenied } from '../access.ts'

const MAX_EVIDENCE_BYTES = 10 * 1024 * 1024
const JUDGMENT = /^\s*(?:#{1,6}\s*)?(?:[-*]\s*)?(?:urteil|verdict)\s*:\s*(PASS_MIT_AUFLAGEN|PASS|FAIL)\s*$/im
const COMMIT = /^\s*(?:[-*]\s*)?(?:geprüfte revision|reviewed commit)\s*:\s*(?:commit\s+)?`?([0-9a-f]{40})`?\s*$/im

export interface DeliveryEvidence {
  path: string
  sha256: string
  reviewJudgment: string | null
  reviewedCommit: string | null
}

export function inspectDeliveryEvidence(
  workspaceRoot: string,
  evidencePath: string,
  options: { reviewRequired?: boolean } = {},
): DeliveryEvidence {
  const root = realpathSync.native(resolve(workspaceRoot))
  const candidate = isAbsolute(evidencePath) ? resolve(evidencePath) : resolve(root, evidencePath)
  let actual: string
  try { actual = realpathSync.native(candidate) } catch { throw new AccessDenied(`delivery evidence does not exist: ${evidencePath}`) }
  const rel = relative(root, actual)
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new AccessDenied('delivery evidence must be inside the workspace')
  }
  const info = statSync(actual)
  if (!info.isFile()) throw new AccessDenied('delivery evidence must be a file')
  if (info.size === 0) throw new AccessDenied('delivery evidence file is empty')
  if (info.size > MAX_EVIDENCE_BYTES) throw new AccessDenied('delivery evidence file exceeds 10 MiB')
  const bytes = readFileSync(actual)
  const text = bytes.toString('utf8')
  const reviewText = text.replace(/\*\*/g, '')
  const judgment = options.reviewRequired ? JUDGMENT.exec(reviewText)?.[1] ?? null : null
  const commit = options.reviewRequired ? COMMIT.exec(reviewText)?.[1] ?? null : null
  if (options.reviewRequired && (!judgment || !commit)) {
    throw new AccessDenied('review evidence must include a PASS/PASS_MIT_AUFLAGEN/FAIL judgment and a 40-character commit hash')
  }
  return {
    path: rel.split(sep).join('/'),
    sha256: createHash('sha256').update(bytes).digest('hex'),
    reviewJudgment: judgment,
    reviewedCommit: commit,
  }
}

export function sourceRevision(repoPath: string): string | null {
  try {
    return execFileSync('git', ['-C', repoPath, 'rev-parse', 'HEAD'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 3000,
    }).trim() || null
  } catch { return null }
}
