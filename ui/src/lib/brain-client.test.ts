/// <reference types="node" />
import { describe, test, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import {
  fetchBriefing,
  askQuestion,
  fetchHygiene,
  fetchMachine,
  fetchRepos,
} from './brain-client.ts'

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
