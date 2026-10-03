import type { DatabaseSync } from 'node:sqlite'

export type ModelFamily =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'zhipu'
  | 'deepseek'
  | 'moonshot'
  | 'alibaba'
  | 'meta'
  | 'xai'
  | 'mistral'
  | 'nvidia'

export type ModelFamilyResolution =
  | { family: ModelFamily; modelId: string }
  | { family: null; modelId: string | null; reason: 'missing-model' | 'unknown-model' }

export type ReviewIndependence =
  | { independent: true; authorFamily: ModelFamily; reviewerFamily: ModelFamily; authorModel: string; reviewerModel: string }
  | { independent: false; reason: 'missing-model' | 'unknown-model' | 'stale-model-metadata' | 'same-model-family' }

type RegisteredModelResolution = ModelFamilyResolution
  | { family: null; modelId: null; reason: 'stale-model-metadata' }

const FAMILY_PREFIXES: ReadonlyArray<readonly [ModelFamily, readonly string[]]> = [
  ['openai', ['gpt-', 'o1-', 'o3-', 'o4-', 'codex-', 'chatgpt-']],
  ['anthropic', ['claude-']],
  ['google', ['gemini-']],
  ['zhipu', ['glm-']],
  ['deepseek', ['deepseek-']],
  ['moonshot', ['kimi-', 'moonshot-']],
  ['alibaba', ['qwen-']],
  ['meta', ['llama-']],
  ['xai', ['grok-']],
  ['mistral', ['mistral-']],
  ['nvidia', ['nemotron-', 'nvidia/']],
]

/** Resolve only recognizable model IDs; account, surface, and provider labels are not inputs. */
export function resolveModelFamily(modelId: string | null | undefined): ModelFamilyResolution {
  const normalized = typeof modelId === 'string' ? modelId.trim().toLowerCase() : ''
  if (normalized === '') return { family: null, modelId: null, reason: 'missing-model' }

  for (const [family, prefixes] of FAMILY_PREFIXES) {
    if (prefixes.some(prefix => normalized.startsWith(prefix))) {
      return { family, modelId: normalized }
    }
  }
  return { family: null, modelId: normalized, reason: 'unknown-model' }
}

interface ModelMetadataRow { model: string | null }

function readRegisteredModels(db: DatabaseSync, agentId: string): Array<string | null> {
  const profile = db.prepare('SELECT model FROM agents WHERE id = ?').get(agentId) as unknown as ModelMetadataRow | undefined
  if (profile === undefined) return []

  const models: Array<string | null> = [profile.model]
  const hasRunnerTable = db.prepare(`SELECT 1 AS yes FROM sqlite_master
    WHERE type = 'table' AND name = 'worker_runners'`).get() !== undefined
  if (hasRunnerTable) {
    const runner = db.prepare('SELECT model FROM worker_runners WHERE agent_id = ?').get(agentId) as unknown as ModelMetadataRow | undefined
    if (runner !== undefined && runner.model !== null && runner.model.trim() !== '') models.push(runner.model)
  }
  return models
}

/**
 * Resolve the current registered model metadata for both workers on every call.
 * If the agent registration and an installed runner profile disagree, callers
 * must fail closed until their model metadata is reconciled.
 */
export function resolveReviewIndependence(
  db: DatabaseSync,
  authorId: string,
  reviewerId: string,
): ReviewIndependence {
  const resolveAgent = (agentId: string): RegisteredModelResolution => {
    const raw = readRegisteredModels(db, agentId)
    if (raw.length === 0) return { family: null, modelId: null, reason: 'missing-model' }

    const nonEmpty = raw.filter((model): model is string => typeof model === 'string' && model.trim() !== '')
    if (nonEmpty.length === 0) return { family: null, modelId: null, reason: 'missing-model' }

    const ids = new Set(nonEmpty.map(model => model.trim().toLowerCase()))
    if (ids.size > 1) return { family: null, modelId: null, reason: 'stale-model-metadata' }
    return resolveModelFamily(nonEmpty[0])
  }

  const author = resolveAgent(authorId)
  const reviewer = resolveAgent(reviewerId)
  if ('reason' in author) return { independent: false, reason: author.reason }
  if ('reason' in reviewer) return { independent: false, reason: reviewer.reason }
  if (author.family === reviewer.family) return { independent: false, reason: 'same-model-family' }
  return {
    independent: true,
    authorFamily: author.family,
    reviewerFamily: reviewer.family,
    authorModel: author.modelId,
    reviewerModel: reviewer.modelId,
  }
}
