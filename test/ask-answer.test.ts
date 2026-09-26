/**
 * Answer construction (ASK-01, milestone A2).
 *
 * These tests ask a real question against a real planet that was indexed from a
 * real git repository. Nothing is stubbed: the router, the tools and the store
 * all run, so what is pinned here is the promise the UI builds against —
 *
 *   - the intent and the tool that served it;
 *   - the sources a reader can click, pointing at REAL indexed rows;
 *   - honesty when the index holds nothing under the name that was asked for.
 *
 * The last test is the one that matters most: a question naming a symbol that
 * does not exist must come back low-confidence with no invented source, because
 * a confident-sounding wrong answer is the failure mode this feature exists to
 * avoid.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import {
  discoverCheckouts, indexPlanetWorkspace, registerPlanet, setPlanetIndexSelection, workspaceIdFor,
} from '../src/planet.ts'
import { askQuestion, type AskResponse } from '../src/ask/answer.ts'
import { detectIntent, extractSubject, INTENT_TOOL, type AskIntent } from '../src/ask/router.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const skipGit = HAS_GIT ? false : 'git is not available on this machine'

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

const LIB_TS = [
  'export function makeWidget(name: string): string {',
  '  return `widget:${name}`',
  '}',
  '',
].join('\n')

const APP_TS = [
  "import { makeWidget } from './lib.ts'",
  '',
  'export function buildApp(): string {',
  "  return makeWidget('app')",
  '}',
  '',
].join('\n')

const README_MD = [
  '# Fixture',
  '',
  "A tiny fixture project used to test PlugBrain's plain-language ask routing.",
  '',
].join('\n')

const NOTE_MD = [
  '---',
  'typ: "notiz"',
  '---',
  '',
  'Design note: the PluginX integration lands through the widget layer.',
  '',
].join('\n')

interface Fixture {
  dir: string
  root: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  checkoutId: string
  cleanup: () => void
}

let shared: Fixture | null = null

/** Build the planet once; every test reads the same real index. */
function fixture(): Fixture {
  if (shared !== null) return shared
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-ask-answer-'))
  const root = join(dir, 'plugpt')
  const repo = join(root, 'Code', 'fixture')
  const write = (base: string, rel: string, content: string): void => {
    const abs = join(base, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content, 'utf8')
  }
  write(root, 'README.md', README_MD)
  write(root, 'Master/Design.md', NOTE_MD)
  mkdirSync(repo, { recursive: true })
  git(repo, ['init', '-q'])
  write(repo, 'src/lib.ts', LIB_TS)
  write(repo, 'src/app.ts', APP_TS)
  git(repo, ['add', '.'])
  git(repo, ['commit', '-q', '-m', 'init'])
  git(repo, ['branch', '-M', 'main'])

  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = workspaceIdFor(root)
  const registered = registerPlanet(db, root, 'plugpt')
  const checkoutId = discoverCheckouts(join(root, 'Code'), registered.planetId)[0]!.checkoutId
  setPlanetIndexSelection(db, registered.workspaceId, [checkoutId])
  indexPlanetWorkspace(db, workspaceId, { full: true })

  shared = {
    dir, root, db, workspaceId, checkoutId,
    cleanup: () => {
      try { db.close() } catch { /* already closed */ }
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
  return shared
}

after(() => { shared?.cleanup(); shared = null })

const ask = (question: string): AskResponse => {
  const fx = fixture()
  return askQuestion(fx.db, { workspaceId: fx.workspaceId, question })
}

/** Every field the UI contract promises must be present, whatever the intent. */
function assertShape(response: AskResponse, question: string): void {
  assert.equal(response.question, question)
  assert.ok(['high', 'medium', 'low'].includes(response.confidence))
  assert.ok(Array.isArray(response.sources))
  assert.ok(Array.isArray(response.followUps))
  assert.ok(Array.isArray(response.unavailable))
  assert.equal(typeof response.answer, 'string')
  assert.ok(response.answer.length > 0, 'an answer is always a readable sentence')
  for (const source of response.sources) {
    assert.equal(typeof source.path, 'string')
    assert.equal(typeof source.line, 'number')
    assert.equal(typeof source.symbol, 'string')
    assert.equal(typeof source.why, 'string')
  }
}

test('a definition question names the real file the symbol lives in', { skip: skipGit }, () => {
  const question = 'where is makeWidget defined?'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.intent, 'definition')
  assert.equal(response.tool, 'context')
  assert.equal(response.confidence, 'high')
  assert.equal(response.sources[0]?.path, 'Code/fixture/src/lib.ts')
  assert.match(response.answer, /makeWidget/)
})

test('the same definition question in German routes identically', { skip: skipGit }, () => {
  const question = 'wo wird makeWidget definiert?'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.intent, 'definition')
  assert.equal(response.tool, 'context')
  assert.equal(response.sources[0]?.path, 'Code/fixture/src/lib.ts')
})

test('a usage question is answered from the call graph, never from prose', { skip: skipGit }, () => {
  for (const question of ['who calls makeWidget?', 'wer ruft makeWidget auf?']) {
    const response = ask(question)
    assertShape(response, question)
    assert.equal(response.intent, 'usage')
    assert.equal(response.tool, 'context')
    // Every returned source must be a real indexed row, so it can be clicked.
    assert.ok(response.sources.every(source => source.path !== ''))
    assert.match(response.answer, /makeWidget/)
  }
})

test('an impact question reports a measured blast radius', { skip: skipGit }, () => {
  const question = 'what breaks if I change makeWidget?'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.intent, 'impact')
  assert.equal(response.tool, 'impact')
  assert.match(response.answer, /makeWidget/)
})

test('an overview question is answered from the project\u2019s own README', { skip: skipGit }, () => {
  for (const question of ['what is this project?', 'was ist dieses projekt?']) {
    const response = ask(question)
    assertShape(response, question)
    assert.equal(response.intent, 'overview')
    assert.equal(response.tool, 'briefing')
    assert.equal(response.confidence, 'high')
    assert.match(response.answer, /fixture project/i)
  }
})

test('a notes question finds the note that mentions the term', { skip: skipGit }, () => {
  for (const question of ['notes about PluginX', 'notizen zu PluginX']) {
    const response = ask(question)
    assertShape(response, question)
    assert.equal(response.intent, 'notes')
    assert.equal(response.tool, 'notes_search')
    assert.ok(response.sources.some(source => source.path === 'Master/Design.md'),
      `the design note is the source: ${JSON.stringify(response.sources)}`)
  }
})

test('a question about a symbol that does not exist stays honest and low-confidence', { skip: skipGit }, () => {
  const question = 'where is zzzNoSuchSymbolQq defined?'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.intent, 'definition')
  // The router still understood the SHAPE of the question, but the answer had
  // to fall back to a text search, and it says so.
  assert.equal(response.tool, 'search')
  assert.equal(response.confidence, 'low')
  assert.equal(response.sources.length, 0, 'no invented source for a name the index never saw')
  assert.match(response.answer, /zzzNoSuchSymbolQq/)
})

test('an unmatchable question is low-confidence and carries follow-up questions', { skip: skipGit }, () => {
  const question = 'tell me about zzzNoSuchSymbolQq'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.confidence, 'low')
  assert.ok(response.followUps.length > 0)
})

test('a question with no subject at all asks for one instead of guessing', { skip: skipGit }, () => {
  const question = 'where is defined?'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.confidence, 'low')
  assert.match(response.answer, /could not tell what to look up/i)
})

test('a change question reflects an uncommitted edit in the selected checkout', { skip: skipGit }, () => {
  const fx = fixture()
  writeFileSync(join(fx.root, 'Code', 'fixture', 'src', 'lib.ts'),
    LIB_TS.replace('return `widget:${name}`', 'return `widget-2:${name}`'), 'utf8')

  const question = 'what changed?'
  const response = ask(question)
  assertShape(response, question)
  assert.equal(response.intent, 'changes')
  assert.equal(response.tool, 'detect_changes')
  assert.ok(response.sources.some(source => source.path === 'Code/fixture/src/lib.ts'),
    `the edited file is reported: ${JSON.stringify(response.sources)}`)
  assert.match(response.answer, /changed/i)
})

test('every intent the router can name has a serving tool', () => {
  const intents: AskIntent[] = ['definition', 'usage', 'impact', 'changes', 'overview', 'notes', 'search']
  for (const intent of intents) {
    assert.equal(typeof INTENT_TOOL[intent], 'string')
  }
  // The router and the answer builder agree on the sentence shapes.
  assert.equal(detectIntent('where is makeWidget defined?'), 'definition')
  assert.equal(extractSubject('where is makeWidget defined?'), 'makeWidget')
  assert.equal(extractSubject('was ist dieses projekt?'), null)
})
