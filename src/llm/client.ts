export type LlmProviderId = 'gemini' | 'nvidia'

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LlmProviderConfig {
  id: LlmProviderId
  baseUrl: string
  keyEnvNames: readonly string[]
  pricing?: {
    inputUsdPerMillion: number
    outputUsdPerMillion: number
  }
}

export interface LlmCredential {
  keyName: string
  value: string
}

export type LlmCredentialResolver = (
  provider: LlmProviderId,
  keyEnvNames: readonly string[],
) => LlmCredential | Promise<LlmCredential>

export interface LlmUsage {
  provider: LlmProviderId
  model: string
  inputTokens: number | null
  outputTokens: number | null
  costUsd: number | null
}

export interface LlmCompletionRequest {
  provider: LlmProviderId
  model: string
  messages: readonly LlmMessage[]
  temperature?: number
  maxTokens?: number
}

export interface LlmCompletion {
  content: string
  usage: LlmUsage
}

export interface LlmClientOptions {
  providers: readonly LlmProviderConfig[]
  resolveCredential?: LlmCredentialResolver
  fetchImpl?: typeof fetch
  maxRetries?: number
  retryBaseMs?: number
  maxRetryDelayMs?: number
  timeoutMs?: number
  sleep?: (milliseconds: number) => Promise<void>
  onUsage?: (usage: LlmUsage) => void | Promise<void>
}

const PROVIDER_DEFAULTS: Record<LlmProviderId, { baseUrl: string; keyPrefix: string; keyCount: number }> = {
  gemini: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    keyPrefix: 'GEMINI_API_KEY_',
    keyCount: 5,
  },
  nvidia: {
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    keyPrefix: 'NVIDIA_API_KEY_',
    keyCount: 4,
  },
}

export class LlmAuthError extends Error {
  constructor(provider: LlmProviderId) {
    super(`LLM provider ${provider} rejected credentials`)
    this.name = 'LlmAuthError'
  }
}

export class LlmQuotaError extends Error {
  constructor(provider: LlmProviderId) {
    super(`LLM provider ${provider} quota is unavailable after bounded retries`)
    this.name = 'LlmQuotaError'
  }
}

export function loadLlmProviders(env: NodeJS.ProcessEnv = process.env): LlmProviderConfig[] {
  return (Object.keys(PROVIDER_DEFAULTS) as LlmProviderId[]).flatMap(id => {
    const defaults = PROVIDER_DEFAULTS[id]
    const keyEnvNames = Array.from({ length: defaults.keyCount }, (_, index) => `${defaults.keyPrefix}${String(index + 1).padStart(2, '0')}`)
      .filter(name => Boolean(env[name]?.trim()))
    if (keyEnvNames.length === 0) return []
    return [{
      id,
      baseUrl: env[`${id.toUpperCase()}_OPENAI_BASE_URL`]?.trim() || defaults.baseUrl,
      keyEnvNames,
    }]
  })
}

export function environmentCredentialResolver(env: NodeJS.ProcessEnv = process.env): LlmCredentialResolver {
  return (provider, keyEnvNames) => {
    const validNames = keyEnvNames.filter(name => isProviderKeyName(provider, name))
    if (validNames.length !== keyEnvNames.length || validNames.length === 0) {
      throw new Error(`LLM provider ${provider} has an invalid key name configuration`)
    }
    const configured = validNames.flatMap(keyName => {
      const value = env[keyName]?.trim()
      return value ? [{ keyName, value }] : []
    })
    if (configured.length === 0) throw new Error(`LLM provider ${provider} has no key configured in the environment`)
    if (configured.length > 1) {
      throw new Error(`LLM provider ${provider} has multiple keys; a QUOTA-01 credential pool is required`)
    }
    return configured[0]!
  }
}

export function createLlmClient(options: LlmClientOptions) {
  const providers = new Map<LlmProviderId, LlmProviderConfig>()
  for (const provider of options.providers) {
    if (!PROVIDER_DEFAULTS[provider.id] || provider.keyEnvNames.length === 0
      || provider.keyEnvNames.some(name => !isProviderKeyName(provider.id, name))) {
      throw new Error(`LLM provider ${String(provider.id)} has invalid key name configuration`)
    }
    if (!isHttpsUrl(provider.baseUrl)) throw new Error(`LLM provider ${provider.id} has an invalid base URL`)
    if (provider.pricing && ![provider.pricing.inputUsdPerMillion, provider.pricing.outputUsdPerMillion]
      .every(rate => Number.isFinite(rate) && rate >= 0)) {
      throw new Error(`LLM provider ${provider.id} has invalid pricing configuration`)
    }
    if (providers.has(provider.id)) throw new Error(`LLM provider ${provider.id} is configured more than once`)
    providers.set(provider.id, { ...provider, baseUrl: provider.baseUrl.replace(/\/+$/, '') })
  }

  const resolveCredential = options.resolveCredential ?? environmentCredentialResolver()
  const fetchImpl = options.fetchImpl ?? fetch
  const maxRetries = boundedInteger(options.maxRetries, 2, 0, 8)
  const retryBaseMs = boundedNumber(options.retryBaseMs, 250, 0, 30_000)
  const maxRetryDelayMs = boundedNumber(options.maxRetryDelayMs, 30_000, 0, 60_000)
  const timeoutMs = boundedNumber(options.timeoutMs, 30_000, 1, 120_000)
  const sleep = options.sleep ?? (milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds)))

  async function complete(request: LlmCompletionRequest): Promise<LlmCompletion> {
    const provider = providers.get(request.provider)
    if (!provider) throw new Error(`LLM provider ${request.provider} is not configured`)
    if (!request.model.trim()) throw new Error('LLM model must be specified')
    let sawQuotaFailure = false
    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      const credential = await resolveCredential(provider.id, provider.keyEnvNames)
      if (!isProviderKeyName(provider.id, credential.keyName) || !credential.value.trim()
        || !provider.keyEnvNames.includes(credential.keyName)) {
        throw new Error(`LLM provider ${provider.id} returned an invalid credential`)
      }
      let response: Response
      try {
        response = await fetchImpl(`${provider.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${credential.value}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: request.model,
            messages: request.messages,
            ...(request.temperature === undefined ? {} : { temperature: request.temperature }),
            ...(request.maxTokens === undefined ? {} : { max_tokens: request.maxTokens }),
          }),
          signal: AbortSignal.timeout(timeoutMs),
        })
      } catch {
        if (attempt >= maxRetries) throw new Error('LLM request failed or timed out before receiving a response')
        await sleep(Math.min(maxRetryDelayMs, retryBaseMs * (2 ** attempt)))
        continue
      }

      if (response.status === 401 || response.status === 403) throw new LlmAuthError(provider.id)
      if (response.status === 429) {
        sawQuotaFailure = true
        if (attempt >= maxRetries) throw new LlmQuotaError(provider.id)
        const retryAfterMs = parseRetryAfter(response.headers.get('retry-after'))
        await sleep(Math.min(maxRetryDelayMs, retryAfterMs ?? retryBaseMs * (2 ** attempt)))
        continue
      }
      if (!response.ok) {
        if (response.status >= 500 && attempt < maxRetries) {
          await sleep(Math.min(maxRetryDelayMs, retryBaseMs * (2 ** attempt)))
          continue
        }
        throw new Error(`LLM provider request failed with HTTP ${response.status}`)
      }

      let payload: unknown
      try {
        payload = await response.json()
      } catch {
        throw new Error('LLM provider returned invalid JSON')
      }
      const completion = parseCompletion(payload, provider, request.model)
      await options.onUsage?.(completion.usage)
      return completion
    }
    if (sawQuotaFailure) throw new LlmQuotaError(provider.id)
    throw new Error(`LLM provider ${provider.id} request failed after bounded retries`)
  }

  return { complete }
}

function isProviderKeyName(provider: LlmProviderId, name: string): boolean {
  const prefix = PROVIDER_DEFAULTS[provider]?.keyPrefix
  return typeof name === 'string' && Boolean(prefix) && new RegExp(`^${prefix}\\d{2}$`).test(name)
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function parseRetryAfter(value: string | null, now = Date.now()): number | null {
  if (!value) return null
  const seconds = Number(value)
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000
  const date = Date.parse(value)
  return Number.isNaN(date) ? null : Math.max(0, date - now)
}

function parseCompletion(payload: unknown, provider: LlmProviderConfig, model: string): LlmCompletion {
  if (typeof payload !== 'object' || payload === null) throw new Error('LLM provider returned an invalid response')
  const record = payload as {
    choices?: Array<{ message?: { content?: unknown } }>
    usage?: { prompt_tokens?: unknown; completion_tokens?: unknown }
  }
  const content = normalizeContent(record.choices?.[0]?.message?.content)
  if (content === null) throw new Error('LLM provider response did not include message content')

  const inputTokens = asNonNegativeInteger(record.usage?.prompt_tokens)
  const outputTokens = asNonNegativeInteger(record.usage?.completion_tokens)
  const pricing = provider.pricing
  const costUsd = pricing && inputTokens !== null && outputTokens !== null
    ? inputTokens * pricing.inputUsdPerMillion / 1_000_000 + outputTokens * pricing.outputUsdPerMillion / 1_000_000
    : null

  return { content, usage: { provider: provider.id, model, inputTokens, outputTokens, costUsd } }
}

function normalizeContent(content: unknown): string | null {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return null
  const text = content.flatMap(part => {
    if (typeof part !== 'object' || part === null || !('text' in part)) return []
    return typeof part.text === 'string' ? [part.text] : []
  }).join('')
  return text || null
}

function asNonNegativeInteger(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null
}

function boundedNumber(value: number | undefined, fallback: number, min: number, max: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback
}

function boundedInteger(value: number | undefined, fallback: number, min: number, max: number): number {
  return Math.floor(boundedNumber(value, fallback, min, max))
}
