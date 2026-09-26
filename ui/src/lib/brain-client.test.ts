import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  fetchBriefing,
  askQuestion,
  fetchHygiene,
  fetchMachine,
  fetchRepos,
} from './brain-client'

describe('API envelope and discriminator tests (_API-VERTRAG / UX-03)', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('successful response with unavailable: [] returns data, NOT routeMissing', async () => {
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

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockBriefing,
    } as unknown as Response)

    const res = await fetchBriefing('ws-test')

    // Must not be flagged as routeMissing
    expect('routeMissing' in res).toBe(false)
    expect((res as typeof mockBriefing).summary).toBe('A test project.')
    expect((res as typeof mockBriefing).unavailable).toEqual([])
  })

  it('successful response with unavailable containing missing parts returns data', async () => {
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

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockHygiene,
    } as unknown as Response)

    const res = await fetchHygiene('ws-test')

    expect('routeMissing' in res).toBe(false)
    expect((res as typeof mockHygiene).unavailable).toEqual(['machine_forecast'])
  })

  it('HTTP 404 returns { routeMissing: true } for unmounted routes', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not Found' }),
    } as unknown as Response)

    const briefingRes = await fetchBriefing('ws-test')
    expect('routeMissing' in briefingRes).toBe(true)
    if ('routeMissing' in briefingRes) {
      expect(briefingRes.routeMissing).toBe(true)
    }

    const askRes = await askQuestion('ws-test', 'Where is main?')
    expect('routeMissing' in askRes).toBe(true)
    if ('routeMissing' in askRes) {
      expect(askRes.routeMissing).toBe(true)
    }

    const hygieneRes = await fetchHygiene('ws-test')
    expect('routeMissing' in hygieneRes).toBe(true)

    const machineRes = await fetchMachine()
    expect('routeMissing' in machineRes).toBe(true)

    const reposRes = await fetchRepos()
    expect('routeMissing' in reposRes).toBe(true)
  })

  it('HTTP 501 returns { routeMissing: true } for unimplemented routes', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 501,
      json: async () => ({ error: 'Not Implemented' }),
    } as unknown as Response)

    const briefingRes = await fetchBriefing('ws-test')
    expect('routeMissing' in briefingRes).toBe(true)
    if ('routeMissing' in briefingRes) {
      expect(briefingRes.routeMissing).toBe(true)
    }
  })
})
