import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createLlmClient,
  environmentCredentialResolver,
  loadLlmProviders,
  LlmAuthError,
  LlmQuotaError,
} from '../src/llm/client.ts'

function jsonResponse(body: unknown, status = 200, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })
}

const providerKeys = ['NVIDIA_API_KEY_01', 'NVIDIA_API_KEY_02'] as const

test('provider configuration keeps only environment variable names, never values', () => {
  const providers = loadLlmProviders({
    GEMINI_API_KEY_02: 'gemini-value',
    GEMINI_API_KEY: 'ignored-single-key',
    NVIDIA_API_KEY_01: 'nvidia-value',
  })

  assert.deepEqual(providers.map(provider => provider.id), ['gemini', 'nvidia'])
  assert.deepEqual(providers[0]?.keyEnvNames, ['GEMINI_API_KEY_02'])
  assert.deepEqual(providers[1]?.keyEnvNames, ['NVIDIA_API_KEY_01'])
  assert.equal(providers[0]?.baseUrl, 'https://generativelanguage.googleapis.com/v1beta/openai')
  assert.equal(providers[1]?.baseUrl, 'https://integrate.api.nvidia.com/v1')
  assert.equal(JSON.stringify(providers).includes('nvidia-value'), false)
})

test('credential pooling is delegated to an injected resolver and usage includes token cost', async () => {
  const seenKeys: string[] = []
  const usage: unknown[] = []
  let selection = 0
  const client = createLlmClient({
    providers: [{
      id: 'nvidia', baseUrl: 'https://example.invalid/v1', keyEnvNames: providerKeys,
      pricing: { inputUsdPerMillion: 2, outputUsdPerMillion: 6 },
    }],
    resolveCredential: () => {
      const keyName = providerKeys[selection++ % providerKeys.length]!
      return { keyName, value: `value-${selection}` }
    },
    fetchImpl: async (_input, init) => {
      seenKeys.push(new Headers(init?.headers).get('authorization') ?? '')
      return jsonResponse({
        choices: [{ message: { role: 'assistant', content: 'hello' } }],
        usage: { prompt_tokens: 1000, completion_tokens: 500 },
      })
    },
    onUsage: event => { usage.push(event) },
  })

  const first = await client.complete({ provider: 'nvidia', model: 'model-a', messages: [{ role: 'user', content: 'one' }] })
  const second = await client.complete({ provider: 'nvidia', model: 'model-a', messages: [{ role: 'user', content: 'two' }] })

  assert.equal(first.content, 'hello')
  assert.equal(second.content, 'hello')
  assert.deepEqual(seenKeys, ['Bearer value-1', 'Bearer value-2'])
  assert.deepEqual(usage[0], {
    provider: 'nvidia', model: 'model-a', inputTokens: 1000, outputTokens: 500,
    costUsd: 0.005,
  })
})

test('429 honors Retry-After and clamps the wait to the configured retry bound', async () => {
  let calls = 0
  const sleeps: number[] = []
  const client = createLlmClient({
    providers: [{ id: 'gemini', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['GEMINI_API_KEY_01'] }],
    resolveCredential: () => ({ keyName: 'GEMINI_API_KEY_01', value: 'synthetic-value' }),
    maxRetries: 1,
    maxRetryDelayMs: 500,
    fetchImpl: async () => {
      calls += 1
      return calls === 1
        ? jsonResponse({ error: { message: 'try later' } }, 429, { 'retry-after': '2' })
        : jsonResponse({ choices: [{ message: { content: 'ok' } }] })
    },
    sleep: async milliseconds => { sleeps.push(milliseconds) },
  })

  const response = await client.complete({ provider: 'gemini', model: 'flash', messages: [{ role: 'user', content: 'hi' }] })
  assert.equal(response.content, 'ok')
  assert.equal(calls, 2)
  assert.deepEqual(sleeps, [500])
})

test('exhausted quota and auth errors are distinct and auth failures do not retry', async () => {
  let quotaCalls = 0
  const quotaClient = createLlmClient({
    providers: [{ id: 'nvidia', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['NVIDIA_API_KEY_01'] }],
    resolveCredential: () => ({ keyName: 'NVIDIA_API_KEY_01', value: 'synthetic-value' }),
    maxRetries: 1,
    fetchImpl: async () => { quotaCalls += 1; return jsonResponse({}, 429) },
    sleep: async () => {},
  })
  await assert.rejects(
    quotaClient.complete({ provider: 'nvidia', model: 'model', messages: [] }),
    error => error instanceof LlmQuotaError,
  )
  assert.equal(quotaCalls, 2)

  let authCalls = 0
  const authClient = createLlmClient({
    providers: [{ id: 'nvidia', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['NVIDIA_API_KEY_01'] }],
    resolveCredential: () => ({ keyName: 'NVIDIA_API_KEY_01', value: 'synthetic-value' }),
    maxRetries: 3,
    fetchImpl: async () => { authCalls += 1; return jsonResponse({}, 401) },
  })
  await assert.rejects(
    authClient.complete({ provider: 'nvidia', model: 'model', messages: [] }),
    error => error instanceof LlmAuthError,
  )
  assert.equal(authCalls, 1)
})

test('timeout retries are bounded and failures never include credential values', async () => {
  let calls = 0
  const waits: number[] = []
  const client = createLlmClient({
    providers: [{ id: 'gemini', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['GEMINI_API_KEY_01'] }],
    resolveCredential: () => ({ keyName: 'GEMINI_API_KEY_01', value: 'synthetic-value' }),
    maxRetries: 1,
    retryBaseMs: 10,
    maxRetryDelayMs: 20,
    fetchImpl: async () => { calls += 1; throw new DOMException('aborted', 'TimeoutError') },
    sleep: async milliseconds => { waits.push(milliseconds) },
  })
  await assert.rejects(
    client.complete({ provider: 'gemini', model: 'flash', messages: [] }),
    error => error instanceof Error && !error.message.includes('synthetic-value'),
  )
  assert.equal(calls, 2)
  assert.deepEqual(waits, [10])
})

test('invalid provider or key names fail closed; multiple env keys require QUOTA resolver', async () => {
  assert.throws(() => createLlmClient({
    providers: [{ id: 'gemini', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['NVIDIA_API_KEY_01'] },
    ] as never,
  }), /invalid key name configuration/)
  assert.throws(() => createLlmClient({
    providers: [{ id: 'gemini', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['GEMINI_API_KEY_01'], pricing: { inputUsdPerMillion: -1, outputUsdPerMillion: 1 } }],
  }), /invalid pricing configuration/)

  const client = createLlmClient({
    providers: [{ id: 'gemini', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['GEMINI_API_KEY_01'] }],
    resolveCredential: () => ({ keyName: 'NVIDIA_API_KEY_01', value: 'synthetic-value' }),
    fetchImpl: async () => jsonResponse({ choices: [{ message: { content: 'unreachable' } }] }),
  })
  await assert.rejects(
    client.complete({ provider: 'unknown' as never, model: 'flash', messages: [] }),
    /not configured/,
  )
  await assert.rejects(client.complete({ provider: 'gemini', model: 'flash', messages: [] }), /invalid credential/)

  const resolver = environmentCredentialResolver({
    GEMINI_API_KEY_01: 'value-one',
    GEMINI_API_KEY_02: 'value-two',
  })
  assert.throws(
    () => resolver('gemini', ['GEMINI_API_KEY_01', 'GEMINI_API_KEY_02']),
    /QUOTA-01 credential pool is required/,
  )
})

test('provider endpoints require HTTPS before a bearer credential can be sent', () => {
  assert.throws(() => createLlmClient({
    providers: [{ id: 'nvidia', baseUrl: 'http://provider.example/v1', keyEnvNames: ['NVIDIA_API_KEY_01'] }],
  }), /invalid base URL/)
})

test('usage stays explicit when pricing or token counts are unavailable', async () => {
  const usage: unknown[] = []
  const client = createLlmClient({
    providers: [{ id: 'gemini', baseUrl: 'https://example.invalid/v1', keyEnvNames: ['GEMINI_API_KEY_01'] }],
    resolveCredential: () => ({ keyName: 'GEMINI_API_KEY_01', value: 'synthetic-value' }),
    fetchImpl: async () => jsonResponse({ choices: [{ message: { content: 'ok' } }], usage: { total_tokens: 4 } }),
    onUsage: event => { usage.push(event) },
  })

  await client.complete({ provider: 'gemini', model: 'flash', messages: [{ role: 'user', content: 'hi' }] })
  assert.deepEqual(usage[0], {
    provider: 'gemini', model: 'flash', inputTokens: null, outputTokens: null, costUsd: null,
  })
})
