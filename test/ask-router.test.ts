/**
 * ASK-01 / A1: the plain-language router.
 *
 * These are unit tests of the pure routing layer — no database, no index. The
 * point is that a question in German or English lands on the right intent and
 * yields the literal subject to look up.
 */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { detectIntent, extractSubject, INTENT_TOOL, type AskIntent } from '../src/ask/router.ts'

interface Case {
  question: string
  intent: AskIntent
  subject: string | null
}

const CASES: Case[] = [
  // ── definition ───────────────────────────────────────────────────────────
  { question: 'where is `resolveBrainHome` defined?', intent: 'definition', subject: 'resolveBrainHome' },
  { question: 'where is resolveBrainHome defined', intent: 'definition', subject: 'resolveBrainHome' },
  { question: 'wo wird resolveBrainHome definiert?', intent: 'definition', subject: 'resolveBrainHome' },
  { question: 'was ist die definition von startGateway?', intent: 'definition', subject: 'startGateway' },
  { question: 'where is the concept search declared?', intent: 'definition', subject: 'concept' },

  // ── usage ────────────────────────────────────────────────────────────────
  { question: 'who calls resolveBrainHome?', intent: 'usage', subject: 'resolveBrainHome' },
  { question: 'what calls `startGateway`', intent: 'usage', subject: 'startGateway' },
  { question: 'wer ruft startGateway auf?', intent: 'usage', subject: 'startGateway' },
  { question: 'what uses sendQuery', intent: 'usage', subject: 'sendQuery' },
  { question: 'wer verwendet handleRequest?', intent: 'usage', subject: 'handleRequest' },

  // ── impact ───────────────────────────────────────────────────────────────
  { question: 'what breaks if I change `startGateway`?', intent: 'impact', subject: 'startGateway' },
  { question: 'was bricht, wenn ich startGateway ändere?', intent: 'impact', subject: 'startGateway' },
  { question: 'what depends on dispatchRequest?', intent: 'impact', subject: 'dispatchRequest' },
  { question: 'blast radius of handleRequest', intent: 'impact', subject: 'handleRequest' },

  // ── changes ──────────────────────────────────────────────────────────────
  { question: 'what changed?', intent: 'changes', subject: null },
  { question: 'what has changed recently?', intent: 'changes', subject: null },
  { question: 'was hat sich geändert?', intent: 'changes', subject: null },
  { question: 'welche änderungen gab es?', intent: 'changes', subject: null },

  // ── overview ─────────────────────────────────────────────────────────────
  { question: 'what is this project?', intent: 'overview', subject: null },
  { question: 'what does this repository do?', intent: 'overview', subject: null },
  { question: 'was ist dieses Projekt?', intent: 'overview', subject: null },
  { question: 'give me a project overview', intent: 'overview', subject: null },

  // ── notes ────────────────────────────────────────────────────────────────
  { question: 'notes about the gateway owner', intent: 'notes', subject: 'gateway owner' },
  { question: 'notizen zu deployment', intent: 'notes', subject: 'deployment' },
  { question: 'gibt es notizen zu brain home?', intent: 'notes', subject: 'brain home' },

  // ── search fallback ──────────────────────────────────────────────────────
  { question: 'gateway', intent: 'search', subject: 'gateway' },
  { question: 'brain core supervisor', intent: 'search', subject: 'brain core supervisor' },
]

test('detectIntent maps German and English questions to the right intent', () => {
  for (const { question, intent } of CASES) {
    assert.equal(detectIntent(question), intent, `intent for: ${question}`)
  }
})

test('extractSubject pulls the literal subject out of the sentence', () => {
  for (const { question, subject } of CASES) {
    assert.equal(extractSubject(question), subject, `subject for: ${question}`)
  }
})

test('code spans and quotes win over prose', () => {
  assert.equal(extractSubject('who calls "resolveBrainHome" here?'), 'resolveBrainHome')
  assert.equal(extractSubject('wo wird `src/home.ts` benutzt'), 'src/home.ts')
  assert.equal(extractSubject("what is 'handleRequest' for"), 'handleRequest')
})

test('an empty question has no intent and no subject', () => {
  assert.equal(detectIntent(''), 'search')
  assert.equal(extractSubject('   '), null)
})

test('every intent has an existing tool behind it', () => {
  const intents: AskIntent[] = ['definition', 'usage', 'impact', 'changes', 'overview', 'notes', 'search']
  for (const intent of intents) {
    assert.ok(INTENT_TOOL[intent], `tool for ${intent}`)
  }
})
