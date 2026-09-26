import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { fetchMesh, fetchMeshTimeline, getStoredToken } from './brain-client.ts'

const UI_ROOT = join(import.meta.dirname, '..')

const emptyMesh = {
  schema: 1,
  workspaceId: 'ws-mesh',
  nodes: [],
  edges: [],
  totals: { nodes: 0, edges: 0 },
  unprovenWorkers: [],
  legend: {},
} as const

test('the UI Mesh client accepts only an exact, complete Core projection', async () => {
  const originalFetch = globalThis.fetch
  try {
    let requested = ''
    globalThis.fetch = async (input) => {
      requested = String(input)
      return new Response(JSON.stringify({ ok: true, mesh: emptyMesh }), { status: 200 })
    }
    const mesh = await fetchMesh('ws-mesh')
    assert.equal(mesh.workspaceId, 'ws-mesh')
    assert.match(requested, /\/api\/mesh\?workspace=ws-mesh/)

    globalThis.fetch = async () => new Response(JSON.stringify({
      ok: true, mesh: { ...emptyMesh, workspaceId: 'ws-somewhere-else' },
    }), { status: 200 })
    await assert.rejects(fetchMesh('ws-mesh'), /anderen Workspace/)

    globalThis.fetch = async (input) => {
      requested = String(input)
      return new Response(JSON.stringify({
        ok: true,
        timeline: [{ eventId: 'trace-1', type: 'worker.started', occurredAt: '2026-09-21T00:00:00.000Z' }],
      }), { status: 200 })
    }
    const timeline = await fetchMeshTimeline('ws-mesh', { workerId: 'worker-1', limit: 12 })
    assert.equal(timeline[0].eventId, 'trace-1')
    assert.match(requested, /\/api\/mesh\/timeline\?/)
    assert.match(requested, /workspace=ws-mesh/)
    assert.match(requested, /workerId=worker-1/)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('a current daemon session preempts a stale local browser token', () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const storage = new Map<string, string>([['plugbrain.auth_token', 'stale-browser-token']])
  const localStorage = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => { storage.set(key, value) },
  }
  const setWindow = (search: string, token?: string) => {
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { location: { search }, __PLUGBRAIN__: token ? { token } : undefined },
    })
  }
  try {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: localStorage })

    setWindow('', 'current-daemon-session')
    assert.equal(getStoredToken(), 'current-daemon-session')

    setWindow('?token=explicit-url-token', 'current-daemon-session')
    assert.equal(getStoredToken(), 'explicit-url-token')
    assert.equal(storage.get('plugbrain.auth_token'), 'explicit-url-token')

    setWindow('', undefined)
    storage.clear()
    assert.equal(getStoredToken(), '')
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
    else Reflect.deleteProperty(globalThis, 'window')
    if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})

test('the visible Mesh route contains no simulator or historical agent fallback', () => {
  const app = readFileSync(join(UI_ROOT, 'App.tsx'), 'utf8')
  const view = readFileSync(join(UI_ROOT, 'views', 'MeshView.tsx'), 'utf8')

  assert.match(app, /fetchMesh\(requested\)/)
  assert.doesNotMatch(app, /\/api\/agents/)
  assert.match(view, /fetchMeshTimeline/)
  assert.match(view, /trace-gestützte Arbeit/)
  assert.match(view, /Keine simulierten Agenten, keine Roster-Fallbacks/)
  assert.doesNotMatch(view, /createSwarm/)
  assert.doesNotMatch(view, /createAgentMesh/)
  assert.doesNotMatch(view, /fetchAgentPresence/)
  assert.doesNotMatch(view, /fetchActiveLeases/)
  assert.doesNotMatch(view, /fetchAgentInspect/)
  assert.doesNotMatch(view, /<canvas/)
})

test('Mesh does not share Atlas and City\'s historical timelapse cursor', () => {
  const app = readFileSync(join(UI_ROOT, 'App.tsx'), 'utf8')

  assert.match(app, /view === 'atlas' \|\| view === 'city'/)
  assert.doesNotMatch(app, /view === 'atlas' \|\| view === 'city' \|\| view === 'mesh'/)
  assert.match(
    app,
    /if \(view !== 'mesh'\) return[\s\S]*?setPlaying\(false\)[\s\S]*?setUntil\(null\)/,
  )
})
