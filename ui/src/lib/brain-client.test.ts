/// <reference types="node" />
import { describe, test, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import {
  fetchBriefing,
  askQuestion,
  fetchHygiene,
  fetchMachine,
  fetchRepos,
  attachAgent,
  enqueueSwarmTask,
  sendSwarmMessage,
} from './brain-client.ts'

// While an index run holds the store's writer lock, the daemon refuses every
// store-writing route with 503 and says when to ask again (api.ts,
// refuseWhileStoreIsBusy). A page that opens a note during a reindex must wait
// for that, not give up: a failed attach makes the following read anonymous.
describe('attachAgent waits out a running index (v0.3.1)', () => {
  const originalFetch = globalThis.fetch
  const busy = (retryAfterMs: number) => ({
    ok: false,
    status: 503,
    json: async () => ({ ok: false, status: 'busy', busy: true, retryAfterMs, reason: 'an index run for ws-test is already in progress' }),
  } as unknown as Response)
  const attached = {
    ok: true,
    status: 200,
    json: async () => ({ ok: true, agent: { id: 'portable-ui' } }),
  } as unknown as Response

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  test('retries after retryAfterMs and resolves once the index run is done', async () => {
    const answers = [busy(5), busy(5), attached]
    const fetchMock = mock.fn(async () => answers.shift()!)
    globalThis.fetch = fetchMock as unknown as typeof fetch

    const res = await attachAgent('ws-test', 'portable-ui', 'Portable UI')

    assert.equal(fetchMock.mock.callCount(), 3)
    assert.equal(res.ok, true)
  })

  test('gives up after its wait budget and reports the daemon\'s reason', async () => {
    const fetchMock = mock.fn(async () => busy(5))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await assert.rejects(
      attachAgent('ws-test', 'portable-ui', 'Portable UI', { maxWaitMs: 40 }),
      /index run for ws-test is already in progress/,
    )
    assert.ok(fetchMock.mock.callCount() >= 2, 'it asked again at least once before giving up')
  })

  test('does not retry a refusal that is not a busy store', async () => {
    const fetchMock = mock.fn(async () => ({
      ok: false,
      status: 401,
      json: async () => ({ ok: false, error: 'missing or wrong token' }),
    } as unknown as Response))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await assert.rejects(attachAgent('ws-test', 'portable-ui'), /missing or wrong token/)
    assert.equal(fetchMock.mock.callCount(), 1)
  })
})

describe('API envelope and discriminator tests (_API-VERTRAG / UX-03)', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  test('successful response with unavailable: [] returns data, NOT routeMissing', async () => {
    const mockBriefing = {
      ok: true,
      workspace: 'ws-test',
      name: 'Test Project',
      summary: 'A test project.',
      stats: { repos: 1, files: 10, symbols: 50, notes: 5, languages: [] },
      entrypoints: [],
      recentChanges: [],
      hotspots: [],
      unavailable: [],
    }

    globalThis.fetch = mock.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => mockBriefing,
    } as unknown as Response)) as unknown as typeof fetch

    const res = await fetchBriefing('ws-test')

    // Must not be flagged as routeMissing
    assert.equal('routeMissing' in res, false)
    assert.equal((res as typeof mockBriefing).summary, 'A test project.')
    assert.deepEqual((res as typeof mockBriefing).unavailable, [])
  })

  test('successful response with unavailable containing missing parts returns data', async () => {
    const mockHygiene = {
      ok: true,
      workspace: 'ws-test',
      checkedAt: '2026-09-26T06:00:00Z',
      diskFreeGb: 40,
      summary: { level: 'ok', text: 'All clean' },
      checkouts: [],
      findings: [],
      unavailable: ['machine_forecast'],
    }

    globalThis.fetch = mock.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => mockHygiene,
    } as unknown as Response)) as unknown as typeof fetch

    const res = await fetchHygiene('ws-test')

    assert.equal('routeMissing' in res, false)
    assert.deepEqual((res as typeof mockHygiene).unavailable, ['machine_forecast'])
  })

  test('HTTP 404 returns { routeMissing: true } for unmounted routes', async () => {
    globalThis.fetch = mock.fn(async () => ({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not Found' }),
    } as unknown as Response)) as unknown as typeof fetch

    const briefingRes = await fetchBriefing('ws-test')
    assert.equal('routeMissing' in briefingRes, true)
    if ('routeMissing' in briefingRes) {
      assert.equal(briefingRes.routeMissing, true)
    }

    const askRes = await askQuestion('ws-test', 'Where is main?')
    assert.equal('routeMissing' in askRes, true)
    if ('routeMissing' in askRes) {
      assert.equal(askRes.routeMissing, true)
    }

    const hygieneRes = await fetchHygiene('ws-test')
    assert.equal('routeMissing' in hygieneRes, true)

    const machineRes = await fetchMachine()
    assert.equal('routeMissing' in machineRes, true)

    const reposRes = await fetchRepos()
    assert.equal('routeMissing' in reposRes, true)
  })

  test('HTTP 501 returns { routeMissing: true } for unimplemented routes', async () => {
    globalThis.fetch = mock.fn(async () => ({
      ok: false,
      status: 501,
      json: async () => ({ error: 'Not Implemented' }),
    } as unknown as Response)) as unknown as typeof fetch

    const briefingRes = await fetchBriefing('ws-test')
    assert.equal('routeMissing' in briefingRes, true)
    if ('routeMissing' in briefingRes) {
      assert.equal(briefingRes.routeMissing, true)
    }
  })
})

describe('API error classes: unreachable vs server errors (UX-04)', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  test('HTTP 500 returns { serverError: true, status, error } and NOT routeMissing', async () => {
    globalThis.fetch = mock.fn(async () => ({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    } as unknown as Response)) as unknown as typeof fetch

    const briefingRes = await fetchBriefing('ws-test')
    assert.equal('routeMissing' in briefingRes, false)
    assert.equal('unreachable' in briefingRes, false)
    assert.equal('serverError' in briefingRes, true)
    if ('serverError' in briefingRes) {
      assert.equal(briefingRes.status, 500)
      assert.equal(briefingRes.error, 'Internal Server Error')
    }

    for (const res of [
      await askQuestion('ws-test', 'Where is main?'),
      await fetchHygiene('ws-test'),
      await fetchMachine(),
      await fetchRepos(),
    ]) {
      assert.equal('routeMissing' in res, false)
      assert.equal('unreachable' in res, false)
      assert.equal('serverError' in res, true)
    }
  })

  test('network failure (fetch throws) returns { unreachable: true, error } and NOT routeMissing', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new TypeError('fetch failed: ECONNREFUSED')
    }) as unknown as typeof fetch

    const briefingRes = await fetchBriefing('ws-test')
    assert.equal('routeMissing' in briefingRes, false)
    assert.equal('serverError' in briefingRes, false)
    assert.equal('unreachable' in briefingRes, true)
    if ('unreachable' in briefingRes) {
      assert.equal(briefingRes.unreachable, true)
      assert.equal(briefingRes.error, 'fetch failed: ECONNREFUSED')
    }

    for (const res of [
      await askQuestion('ws-test', 'Where is main?'),
      await fetchHygiene('ws-test'),
      await fetchMachine(),
      await fetchRepos(),
    ]) {
      assert.equal('routeMissing' in res, false)
      assert.equal('serverError' in res, false)
      assert.equal('unreachable' in res, true)
    }
  })

  test('404 and 501 results never carry unreachable or serverError', async () => {
    globalThis.fetch = mock.fn(async () => ({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not Found' }),
    } as unknown as Response)) as unknown as typeof fetch

    const res404 = await fetchBriefing('ws-test')
    assert.equal('routeMissing' in res404, true)
    assert.equal('unreachable' in res404, false)
    assert.equal('serverError' in res404, false)

    globalThis.fetch = mock.fn(async () => ({
      ok: false,
      status: 501,
      json: async () => ({ error: 'Not Implemented' }),
    } as unknown as Response)) as unknown as typeof fetch

    const res501 = await fetchBriefing('ws-test')
    assert.equal('routeMissing' in res501, true)
    assert.equal('unreachable' in res501, false)
    assert.equal('serverError' in res501, false)
  })
})

describe('enqueueSwarmTask dispatch contract', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  test('sends the stored actor and selected lane and returns the Brain task identity', async () => {
    let sent: unknown
    globalThis.fetch = mock.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      sent = JSON.parse(String(init?.body))
      return {
        ok: true,
        status: 200,
        json: async () => ({ ok: true, task: { id: 'task-abc123', title: 'Fix queue dispatch', state: 'pending', addressed_to: 'cx07' } }),
      } as unknown as Response
    }) as unknown as typeof fetch

    const task = await enqueueSwarmTask({ workspace: 'ws-test', requestedBy: 'shell-actor', addressedTo: 'cx07', title: 'Fix queue dispatch', body: 'Details' })

    assert.deepEqual(sent, { workspace: 'ws-test', requestedBy: 'shell-actor', addressedTo: 'cx07', title: 'Fix queue dispatch', body: 'Details' })
    assert.deepEqual(task, { id: 'task-abc123', title: 'Fix queue dispatch', state: 'pending', addressed_to: 'cx07' })
  })

  test('reports Brain errors and rejects success envelopes without a real task id or state', async () => {
    globalThis.fetch = mock.fn(async () => ({
      ok: false,
      status: 409,
      json: async () => ({ ok: false, error: 'Unknown target lane' }),
    } as unknown as Response)) as unknown as typeof fetch
    await assert.rejects(enqueueSwarmTask({ workspace: 'ws-test', requestedBy: 'shell-actor', addressedTo: 'missing', title: 'Task', body: '' }), /Unknown target lane/)

    globalThis.fetch = mock.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, task: { title: 'Task' } }),
    } as unknown as Response)) as unknown as typeof fetch
    await assert.rejects(enqueueSwarmTask({ workspace: 'ws-test', requestedBy: 'shell-actor', addressedTo: 'cx07', title: 'Task', body: '' }), /Task-ID oder Status fehlt/)
  })

  test('keeps the existing message action addressed from the Shell profile', async () => {
    let sent: unknown
    globalThis.fetch = mock.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      sent = JSON.parse(String(init?.body))
      return { ok: true, status: 200 } as unknown as Response
    }) as unknown as typeof fetch

    await sendSwarmMessage({ workspace: 'ws-test', fromAgent: 'shell-actor', toAgent: 'cx07', subject: 'Hello', body: 'Message' })

    assert.deepEqual(sent, { workspace: 'ws-test', fromAgent: 'shell-actor', toAgent: 'cx07', subject: 'Hello', body: 'Message' })
  })
})
