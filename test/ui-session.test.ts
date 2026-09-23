/**
 * The browser shell must arrive with the daemon's own session already in it.
 *
 * Why this is a product requirement and not a convenience: `/api/agent/read`
 * demands a token (FO-3), so a vault whose operator had not pasted a key into
 * the dialog answered `unauthorized` the moment they clicked a file — the one
 * thing a vault has to do. The daemon serves the page itself, over loopback,
 * without CORS headers, so it can hand that page its token.
 *
 * These tests pin the whole handoff, not just the string: the injected token is
 * fed back to a mutating route and must actually be accepted.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'

const SHELL = '<!doctype html><html><head><title>PlugBrain</title></head><body><div id="root"></div></body></html>'

interface Fixture {
  dir: string
  root: string
  db: DatabaseSync
  workspaceId: string
  uiRoot: string
  serverHandle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

async function createFixture(authKey?: string): Promise<Fixture> {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-session-'))
  const root = join(dir, 'ws')
  const uiRoot = join(dir, 'ui')
  mkdirSync(root, { recursive: true })
  mkdirSync(uiRoot, { recursive: true })
  writeFileSync(join(uiRoot, 'index.html'), SHELL)
  writeFileSync(join(uiRoot, 'app.js'), 'console.log("app")\n')

  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-session-test'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'Session Test', root, new Date().toISOString())

  const serverHandle = await serve({ db, uiRoot, authKey }, 0)
  return {
    dir,
    root,
    db,
    workspaceId,
    uiRoot,
    serverHandle,
    baseUrl: `http://127.0.0.1:${serverHandle.port}`,
    cleanup: async () => {
      await serverHandle.close()
      try { db.close() } catch { /* ignore */ }
      try { rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }) } catch { /* ignore */ }
    },
  }
}

function injectedToken(html: string): string | undefined {
  const match = html.match(/window\.__PLUGBRAIN__=(\{.*?\})<\/script>/)
  if (!match) return undefined
  return (JSON.parse(match[1]) as { token?: string }).token
}

test('the served shell carries the daemon session, and that token really authorizes', async () => {
  const fx = await createFixture('session-key-123')
  try {
    const res = await fetch(`${fx.baseUrl}/`)
    assert.strictEqual(res.status, 200)
    const html = await res.text()
    assert.match(html, /<div id="root">/, 'the shell is still served')
    assert.strictEqual(injectedToken(html), 'session-key-123', 'the shell carries the real token')

    // The handoff must be real: the very token from the page opens a mutating route.
    const attach = await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${injectedToken(html)}` },
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agy' }),
    })
    assert.strictEqual(attach.status, 200, 'the injected token is accepted by a protected route')

    // Same route without the token: refused, and no identity minted.
    const anonymous = await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'anon' }),
    })
    assert.strictEqual(anonymous.status, 401)
    const minted = (fx.db.prepare('SELECT COUNT(*) c FROM agents WHERE id = ?').get('anon') as { c: number }).c
    assert.strictEqual(minted, 0, 'an unauthenticated attach mints nothing')
  } finally {
    await fx.cleanup()
  }
})

test('a deep-linked shell route carries the session too, and assets stay byte-identical', async () => {
  const fx = await createFixture('session-key-123')
  try {
    // Any unknown path falls back to the shell (SPA routing), which is the same
    // page the operator lands on via a link.
    const deep = await fetch(`${fx.baseUrl}/workspace/ws-session-test`)
    assert.strictEqual(deep.status, 200)
    assert.strictEqual(injectedToken(await deep.text()), 'session-key-123')

    const asset = await fetch(`${fx.baseUrl}/app.js`)
    assert.strictEqual(asset.status, 200)
    assert.strictEqual(await asset.text(), 'console.log("app")\n', 'a script is not rewritten')
    assert.ok(!(await fetch(`${fx.baseUrl}/app.js`)).headers.get('content-type')?.includes('html'))
  } finally {
    await fx.cleanup()
  }
})

test('with no configured token nothing is injected, and the vault route still refuses', async () => {
  const fx = await createFixture(undefined)
  try {
    const html = await (await fetch(`${fx.baseUrl}/`)).text()
    assert.strictEqual(injectedToken(html), undefined, 'no secret to hand over means no script')

    const res = await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agy', path: 'a.md' }),
    })
    assert.strictEqual(res.status, 401, 'an unconfigured service default-denies instead of conceding')
  } finally {
    await fx.cleanup()
  }
})

test('a read names a registered agent: invented ids are 403 and never minted', async () => {
  const fx = await createFixture('session-key-123')
  const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer session-key-123' }
  try {
    writeFileSync(join(fx.root, 'a.md'), '# a\n')

    const ghost = await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'ghost', path: 'a.md' }),
    })
    assert.strictEqual(ghost.status, 403)
    assert.match((await ghost.json() as { error: string }).error, /unknown or unauthorized agent/)
    const minted = (fx.db.prepare('SELECT COUNT(*) c FROM agents WHERE id = ?').get('ghost') as { c: number }).c
    assert.strictEqual(minted, 0, 'a read may not mint the identity it is refused for')

    const search = await fetch(`${fx.baseUrl}/api/agent/search`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'ghost', query: 'a' }),
    })
    assert.strictEqual(search.status, 403, 'search is held to the same rule as read')

    await fetch(`${fx.baseUrl}/api/agent/attach`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agy' }),
    })
    const ok = await fetch(`${fx.baseUrl}/api/agent/read`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ workspace: fx.workspaceId, agentId: 'agy', path: 'a.md' }),
    })
    assert.strictEqual(ok.status, 200, 'the attached agent reads the file')
    assert.match((await ok.json() as { content: string }).content, /# a/)
  } finally {
    await fx.cleanup()
  }
})
