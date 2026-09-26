/**
 * The ask surfaces (ASK-01, milestones A4 and A5).
 *
 * `POST /api/ask` and `GET /api/briefing` are the two routes the UI builds
 * against, so their RESPONSE SHAPE is a contract, not an implementation detail.
 * This file checks three things over a real index served by the real server:
 *
 *   1. the shape — every field the contract names, present and of the right
 *      kind, on every intent;
 *   2. the routing — a table of 20+ German and English questions, each with the
 *      intent it must land on and, where the answer is stable, the top source
 *      it must point at;
 *   3. the honesty — an unknown name comes back `confidence: low` with a text
 *      search rather than a confident guess, and a bad request is refused.
 *
 * Nothing is stubbed and no model is called: the router, the tools, the store
 * and the HTTP layer all run.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'
import {
  discoverCheckouts, indexPlanetWorkspace, registerPlanet, setPlanetIndexSelection, workspaceIdFor,
} from '../src/planet.ts'
import { removeRunState } from '../src/index/runs.ts'
import type { AskIntent } from '../src/ask/router.ts'
import type { AskResponse } from '../src/ask/answer.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

interface Fixture {
  dir: string
  root: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  handle: ServerHandle
  baseUrl: string
  cleanup: () => Promise<void>
}

let shared: Fixture | null = null

async function fixture(): Promise<Fixture> {
  if (shared !== null) return shared
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-ask-routes-'))
  const root = join(dir, 'plugpt')
  const repo = join(root, 'Code', 'fixture')
  const write = (base: string, rel: string, content: string): void => {
    const abs = join(base, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content, 'utf8')
  }
  write(root, 'README.md', '# Fixture\n\nA tiny fixture project used to test the ask routes.\n')
  write(root, 'Master/Design.md',
    '---\ntyp: "notiz"\n---\n\nDesign note: the PluginX integration lands through the widget layer.\n')
  mkdirSync(repo, { recursive: true })
  git(repo, ['init', '-q'])
  write(repo, 'src/lib.ts',
    'export function makeWidget(name: string): string {\n  return `widget:${name}`\n}\n')
  write(repo, 'src/app.ts',
    "import { makeWidget } from './lib.ts'\n\nexport function buildApp(): string {\n  return makeWidget('app')\n}\n")
  git(repo, ['add', '.'])
  git(repo, ['commit', '-q', '-m', 'init'])
  git(repo, ['branch', '-M', 'main'])

  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = workspaceIdFor(root)
  const registered = registerPlanet(db, root, 'plugpt')
  const checkoutId = discoverCheckouts(join(root, 'Code'), registered.planetId)[0]!.checkoutId
  setPlanetIndexSelection(db, registered.workspaceId, [checkoutId])
  indexPlanetWorkspace(db, workspaceId, { full: true })

  const handle = await serve({ db, uiRoot: null }, 0)
  shared = {
    dir, root, db, workspaceId, handle,
    baseUrl: `http://127.0.0.1:${handle.port}`,
    cleanup: async () => {
      await handle.close()
      try { db.close() } catch { /* already closed */ }
      removeRunState(workspaceId)
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
  return shared
}

after(async () => { await shared?.cleanup(); shared = null })

const askHttp = async (question: string, limit = 5): Promise<{ status: number; body: AskResponse & { ok: boolean; workspace: string } }> => {
  const fx = await fixture()
  const res = await fetch(`${fx.baseUrl}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspace: fx.workspaceId, question, limit }),
  })
  return { status: res.status, body: await res.json() as never }
}

/** The exact contract shape, asserted on every intent. */
function assertAskContract(response: AskResponse & { ok: boolean; workspace: string }, question: string): void {
  assert.equal(response.ok, true)
  assert.ok(typeof response.workspace === 'string' && response.workspace.length > 0)
  assert.equal(response.question, question)
  assert.ok(['definition', 'usage', 'impact', 'changes', 'overview', 'notes', 'search'].includes(response.intent))
  assert.ok(['query', 'context', 'impact', 'detect_changes', 'briefing', 'notes_search', 'search'].includes(response.tool))
  assert.ok(['high', 'medium', 'low'].includes(response.confidence))
  assert.equal(typeof response.answer, 'string')
  assert.ok(response.answer.length > 0, 'an answer is always a readable sentence')
  assert.ok(Array.isArray(response.sources))
  assert.ok(Array.isArray(response.followUps))
  assert.ok(Array.isArray(response.unavailable))
  for (const source of response.sources) {
    assert.equal(typeof source.path, 'string')
    assert.equal(typeof source.line, 'number')
    assert.equal(typeof source.symbol, 'string')
    assert.equal(typeof source.why, 'string')
    assert.ok(source.path.length > 0, 'a source points at a real place, never at nothing')
  }
}

interface QuestionCase {
  question: string
  intent: AskIntent
  /** When the answer is stable, the path the FIRST source must point at. */
  topPath?: string
}

/**
 * More than twenty questions, German and English mixed, each naming the intent
 * it must route to. The two languages are interleaved on purpose: a rule that
 * only works in one of them has to fail here.
 */
const QUESTIONS: QuestionCase[] = [
  { question: 'where is makeWidget defined?', intent: 'definition', topPath: 'Code/fixture/src/lib.ts' },
  { question: 'wo wird makeWidget definiert?', intent: 'definition', topPath: 'Code/fixture/src/lib.ts' },
  { question: 'where is buildApp defined?', intent: 'definition', topPath: 'Code/fixture/src/app.ts' },
  { question: 'wo ist buildApp definiert?', intent: 'definition', topPath: 'Code/fixture/src/app.ts' },
  { question: 'definition of makeWidget', intent: 'definition', topPath: 'Code/fixture/src/lib.ts' },
  { question: 'wo liegt buildApp?', intent: 'definition', topPath: 'Code/fixture/src/app.ts' },
  { question: 'who calls makeWidget?', intent: 'usage' },
  { question: 'wer ruft makeWidget auf?', intent: 'usage' },
  { question: 'who uses buildApp?', intent: 'usage' },
  { question: 'wer nutzt makeWidget?', intent: 'usage' },
  { question: 'callers of makeWidget', intent: 'usage' },
  { question: 'what breaks if I change makeWidget?', intent: 'impact' },
  { question: 'was bricht, wenn ich makeWidget ändere?', intent: 'impact' },
  { question: 'who depends on makeWidget?', intent: 'impact' },
  { question: 'was passiert, wenn ich buildApp ändere?', intent: 'impact' },
  { question: 'what changed?', intent: 'changes' },
  { question: 'was hat sich geändert?', intent: 'changes' },
  { question: 'letzte änderungen', intent: 'changes' },
  { question: 'what is this project?', intent: 'overview' },
  { question: 'was ist dieses projekt?', intent: 'overview' },
  { question: 'überblick', intent: 'overview' },
  { question: 'notes about PluginX', intent: 'notes', topPath: 'Master/Design.md' },
  { question: 'notizen zu PluginX', intent: 'notes', topPath: 'Master/Design.md' },
  { question: 'PluginX widget layer', intent: 'search' },
]

test('every question in the table over HTTP lands on its intent', { skip: skipGit }, async () => {
  for (const { question, intent, topPath } of QUESTIONS) {
    const { status, body } = await askHttp(question)
    assert.equal(status, 200, `question: ${question}`)
    assertAskContract(body, question)
    assert.equal(body.intent, intent, `intent for: ${question}`)
    if (topPath !== undefined) {
      assert.equal(body.sources[0]?.path, topPath,
        `top source for "${question}": ${JSON.stringify(body.sources)}`)
    }
  }
})

test('an unknown name is answered honestly over HTTP, not guessed', { skip: skipGit }, async () => {
  const question = 'where is zzzNoSuchSymbolQq defined?'
  const { body } = await askHttp(question)
  assertAskContract(body, question)
  assert.equal(body.intent, 'definition')
  assert.equal(body.tool, 'search')
  assert.equal(body.confidence, 'low')
  assert.equal(body.sources.length, 0, 'no invented source for a name the index never saw')
  assert.match(body.answer, /zzzNoSuchSymbolQq/)
})

test('GET /api/briefing publishes the contract shape', { skip: skipGit }, async () => {
  const fx = await fixture()
  const res = await fetch(`${fx.baseUrl}/api/briefing?workspace=${encodeURIComponent(fx.workspaceId)}`)
  assert.equal(res.status, 200)
  const body = await res.json() as {
    ok: boolean
    workspace: string; name: string; summary: string
    stats: { repos: number; files: number; symbols: number; notes: number; languages: Array<{ name: string; files: number }> }
    entrypoints: Array<{ path: string; why: string }>
    recentChanges: Array<{ path: string; when: string; kind: string }>
    hotspots: Array<{ path: string; degree: number }>
    unavailable: string[]
  }
  assert.equal(body.ok, true)
  assert.equal(body.workspace, fx.workspaceId)
  assert.equal(body.name, 'plugpt')
  assert.equal(typeof body.summary, 'string')
  assert.ok(body.summary.length > 0, 'the summary is assembled, never empty')
  assert.ok(body.stats.files > 0)
  assert.ok(body.stats.symbols > 0)
  assert.ok(Array.isArray(body.stats.languages))
  assert.ok(body.stats.languages.some(language => language.name === 'TypeScript'))
  assert.ok(Array.isArray(body.entrypoints))
  assert.ok(Array.isArray(body.recentChanges))
  assert.ok(Array.isArray(body.hotspots))
  assert.ok(Array.isArray(body.unavailable))
})

test('the ask routes refuse what they cannot answer', { skip: skipGit }, async () => {
  const fx = await fixture()
  const missing = await fetch(`${fx.baseUrl}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspace: fx.workspaceId, question: '   ' }),
  })
  assert.equal(missing.status, 400)
  assert.match(String((await missing.json() as { error: string }).error), /question parameter required/)

  const foreign = await fetch(`${fx.baseUrl}/api/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspace: 'ws-not-registered', question: 'what is this project?' }),
  })
  assert.equal(foreign.status, 403, 'another workspace is not asked about')

  // With exactly one registered workspace an unnamed briefing is unambiguous,
  // so it is answered rather than refused — the refusal is for the ambiguous
  // case, which a second registered workspace would create.
  const unnamed = await fetch(`${fx.baseUrl}/api/briefing`)
  assert.equal(unnamed.status, 200)
  assert.equal((await unnamed.json() as { workspace: string }).workspace, fx.workspaceId)
})
