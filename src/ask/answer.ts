/**
 * Answer construction (ASK-01, milestone A2).
 *
 * The router decided WHAT is being asked; this file turns the tools' results
 * into the sentence a person reads. Two rules govern every branch:
 *
 *   1. THE SENTENCE MAY ONLY RESTATE THE SOURCES. If the model here cannot
 *      point at a row the store returned, it does not say it. A question about
 *      a symbol that does not exist is answered with "nothing is indexed under
 *      that name", not with a plausible-sounding guess.
 *   2. CONFIDENCE IS MEASURED, NOT FELT. It comes from the shape of the result:
 *      an exact symbol is high, a partial name match is medium, a text search
 *      that only found lookalikes is low.
 *
 * Nothing here calls a model. The same question over the same index yields the
 * same bytes.
 */
import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'
import { getSymbolContext } from '../intel/context.ts'
import { getBlastRadius } from '../intel/impact.ts'
import { conceptSearch } from '../intel/query.ts'
import { detectChanges } from '../intel/changes.ts'
import { searchNotes } from '../notes/search.ts'
import type { IntelSymbol, SymbolContextResult } from '../intel/types.ts'
import { detectIntent, extractSubject, INTENT_TOOL, type AskIntent, type AskTool } from './router.ts'
import { buildProjectBriefing } from './briefing.ts'

export interface AskSource {
  path: string
  line: number
  symbol: string
  why: string
}

export type AskConfidence = 'high' | 'medium' | 'low'

export interface AskResponse {
  question: string
  intent: AskIntent
  answer: string
  sources: AskSource[]
  tool: AskTool
  confidence: AskConfidence
  followUps: string[]
  unavailable: string[]
}

export interface AskOptions {
  workspaceId: string
  question: string
  /** Maximum sources returned. Clamped to 1..25; the default is 5. */
  limit?: number
}

const DEFAULT_LIMIT = 5

const clampLimit = (limit: number | undefined): number =>
  Math.min(Math.max(1, Math.trunc(limit ?? DEFAULT_LIMIT) || DEFAULT_LIMIT), 25)

const symbolSource = (symbol: IntelSymbol, why: string): AskSource => ({
  path: symbol.file,
  line: symbol.line,
  symbol: symbol.name,
  why,
})

/** Collapse duplicate (path, line, symbol) findings while keeping first order. */
function dedupeSources(sources: AskSource[], limit: number): AskSource[] {
  const out: AskSource[] = []
  const seen = new Set<string>()
  for (const source of sources) {
    const key = `${source.path}\u0000${source.line}\u0000${source.symbol}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(source)
    if (out.length >= limit) break
  }
  return out
}

/** Does the index hold a symbol by exactly this name in this workspace? */
function symbolExists(db: DatabaseSync, workspaceId: string, name: string): boolean {
  const row = db.prepare(
    `SELECT 1 AS one FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE s.name = ? AND f.workspace_id = ? LIMIT 1`).get(name, workspaceId)
  return row !== undefined
}

const listNames = (names: string[], cap = 3): string =>
  names.slice(0, cap).map(name => `\`${name}\``).join(', ')

const plural = (count: number, one: string, many: string): string => `${count} ${count === 1 ? one : many}`

/** Follow-up questions a human is likely to ask next, phrased as real questions. */
function followUpsFor(intent: AskIntent, subject: string | null): string[] {
  if (subject === null) {
    switch (intent) {
      case 'overview': return ['what changed recently?', 'where is the CLI entry defined?']
      case 'changes': return ['what is this project?']
      default: return ['what is this project?', 'what changed recently?']
    }
  }
  switch (intent) {
    case 'definition': return [`who calls ${subject}?`, `what breaks if I change ${subject}?`]
    case 'usage': return [`where is ${subject} defined?`, `what breaks if I change ${subject}?`]
    case 'impact': return [`who calls ${subject}?`, `where is ${subject} defined?`]
    case 'notes': return [`where is ${subject} defined?`, 'what changed recently?']
    default: return [`where is ${subject} defined?`, `who calls ${subject}?`]
  }
}

/** The result every branch starts from; each branch overrides what it knows. */
function emptyResponse(question: string, intent: AskIntent): AskResponse {
  return {
    question,
    intent,
    answer: '',
    sources: [],
    tool: INTENT_TOOL[intent],
    confidence: 'low',
    followUps: followUpsFor(intent, extractSubject(question)),
    unavailable: [],
  }
}

/**
 * Answer a question about one workspace. Throws AccessDenied only for a
 * workspace the registry does not know — an unanswerable QUESTION is answered
 * with low confidence, never with an error.
 */
export function askQuestion(db: DatabaseSync, options: AskOptions): AskResponse {
  const { workspaceId, question } = options
  requireWorkspace(db, workspaceId)
  const limit = clampLimit(options.limit)

  const intent = detectIntent(question)
  const subject = extractSubject(question)
  const response = emptyResponse(question, intent)
  const available = (): string[] => {
    const files = Number((db.prepare('SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
      .get(workspaceId) as { n: number }).n)
    return files === 0 ? ['no files are indexed for this workspace'] : []
  }

  // ── overview: no subject needed ─────────────────────────────────────────
  if (intent === 'overview') {
    const briefing = buildProjectBriefing(db, workspaceId)
    return {
      ...response,
      answer: briefing.summary,
      sources: dedupeSources(briefing.entrypoints.map(entry => ({
        path: entry.path, line: 1, symbol: entry.path, why: entry.why.toLowerCase(),
      })), limit),
      tool: 'briefing',
      confidence: briefing.stats.files > 0 ? 'high' : 'low',
      unavailable: briefing.unavailable,
    }
  }

  // ── changes: no subject needed ──────────────────────────────────────────
  if (intent === 'changes') {
    const changes = detectChanges(db, { workspaceId })
    const sources = dedupeSources(changes.changedSymbols.map(change => ({
      path: change.file, line: change.line, symbol: change.name,
      why: `${change.changeType} in the working tree`,
    })), limit)
    const answer = changes.changedSymbols.length > 0
      ? `${plural(changes.changedFiles, 'file', 'files')} changed, touching ${plural(changes.changedSymbols.length, 'indexed symbol', 'indexed symbols')}: ${listNames(changes.changedSymbols.map(change => change.name))} (risk ${changes.riskLevel}).`
      : changes.changedFiles > 0
        ? `${plural(changes.changedFiles, 'file', 'files')} changed, but no indexed symbol overlaps the diff.`
        : 'No changes were detected against the current index.'
    return {
      ...response,
      answer,
      sources,
      tool: 'detect_changes',
      confidence: changes.changedSymbols.length > 0 ? 'high' : changes.changedFiles > 0 ? 'medium' : 'low',
      unavailable: available(),
    }
  }

  // ── everything below needs a subject ────────────────────────────────────
  if (subject === null) {
    return {
      ...response,
      answer: 'I could not tell what to look up. Name a symbol, a file or a path — for example "where is resolveBrainHome defined?".',
      tool: 'search',
      confidence: 'low',
      unavailable: available(),
    }
  }

  // ── definition ──────────────────────────────────────────────────────────
  if (intent === 'definition') {
    const context = getSymbolContext(db, subject, { workspaceId })
    if (context.status === 'found' && context.symbol !== null) {
      const symbol = context.symbol
      const callers = context.incoming.calls.length
      const answer = `\`${subject}\` is defined as a ${symbol.kind} in ${symbol.file}:${symbol.line}` +
        (callers > 0 ? ` and called from ${plural(callers, 'place', 'places')}.` : '. No callers were found.')
      return {
        ...response,
        answer,
        sources: dedupeSources([
          symbolSource(symbol, 'defines it'),
          ...context.incoming.calls.map(call => ({ path: call.file, line: call.line, symbol: call.name, why: 'calls it' })),
        ], limit),
        tool: 'context',
        confidence: 'high',
        unavailable: available(),
      }
    }
    if (context.status === 'ambiguous' && context.candidates !== undefined && context.candidates.length > 0) {
      const first = context.candidates[0]
      return {
        ...response,
        answer: `\`${subject}\` matches ${plural(context.candidates.length, 'symbol', 'symbols')}; the closest is a ${first.kind} in ${first.file}:${first.line}.`,
        sources: dedupeSources(context.candidates.map(candidate => symbolSource(candidate, 'same name')), limit),
        tool: 'context',
        confidence: 'medium',
        unavailable: available(),
      }
    }
    return fallbackSearch(db, workspaceId, subject, limit, response,
      `Nothing in this workspace defines \`${subject}\`.`)
  }

  // ── usage: who calls / who uses X ───────────────────────────────────────
  if (intent === 'usage') {
    const context = getSymbolContext(db, subject, { workspaceId })
    if (context.status === 'found' && context.symbol !== null) {
      const callers = context.incoming.calls
      const answer = callers.length > 0
        ? `\`${subject}\` is called from ${plural(callers.length, 'place', 'places')}: ${listNames(callers.map(call => call.name))}.`
        : `\`${subject}\` exists (${context.symbol.file}:${context.symbol.line}) but has no recorded callers in this workspace.`
      return {
        ...response,
        answer,
        sources: dedupeSources([
          ...callers.map(call => ({ path: call.file, line: call.line, symbol: call.name, why: 'calls it' })),
          symbolSource(context.symbol, 'defines it'),
        ], limit),
        tool: 'context',
        confidence: callers.length > 0 ? 'high' : 'medium',
        unavailable: available(),
      }
    }
    return fallbackSearch(db, workspaceId, subject, limit, response,
      `No indexed symbol is named \`${subject}\`, so there are no callers to list.`)
  }

  // ── impact: what breaks if I change X ───────────────────────────────────
  if (intent === 'impact') {
    const radius = getBlastRadius(db, subject, { workspaceId, direction: 'upstream', maxDepth: 3 })
    const nodes = Object.keys(radius.nodes).length > 0
      ? Object.keys(radius.nodes).map(Number).sort((a, b) => a - b).flatMap(depth => radius.nodes[depth] ?? [])
      : []
    if (radius.totalImpacted === 0 && !symbolExists(db, workspaceId, subject)) {
      return fallbackSearch(db, workspaceId, subject, limit, response,
        `No indexed symbol is named \`${subject}\`, so there is no impact to report.`)
    }
    const answer = radius.totalImpacted > 0
      ? `Changing \`${subject}\` reaches ${plural(radius.totalImpacted, 'symbol', 'symbols')} that depend on it (risk ${radius.risk}): ${listNames(nodes.map(node => node.name))}.`
      : `Nothing in this workspace depends on \`${subject}\`; a change stays local.`
    return {
      ...response,
      answer,
      sources: dedupeSources(nodes.map(node => ({
        path: node.file, line: 1, symbol: node.name, why: 'depends on it',
      })), limit),
      tool: 'impact',
      confidence: radius.totalImpacted > 0 ? 'high' : 'medium',
      unavailable: available(),
    }
  }

  // ── notes: what do we know about X ──────────────────────────────────────
  if (intent === 'notes') {
    const result = searchNotes(db, workspaceId, subject, { limit })
    if (result.hits.length === 0) {
      return fallbackSearch(db, workspaceId, subject, limit, response,
        `No notes mention \`${subject}\`.`)
    }
    return {
      ...response,
      answer: `Found ${plural(result.total, 'note', 'notes')} about \`${subject}\`: ${listNames(result.hits.map(hit => hit.title))}.`,
      sources: dedupeSources(result.hits.map(hit => ({
        path: hit.path, line: hit.line ?? 1, symbol: hit.title, why: 'note mentions it',
      })), limit),
      tool: 'notes_search',
      confidence: 'high',
      unavailable: available(),
    }
  }

  // ── search: the honest fallback ─────────────────────────────────────────
  return fallbackSearch(db, workspaceId, subject, limit, response, null)
}

/**
 * Answer from concept search. Used directly for the `search` intent and as the
 * honest fallback when a more specific question names something the index does
 * not hold under that exact name: the reader still gets the closest real rows,
 * clearly labelled as matches rather than as the answer they asked for.
 */
function fallbackSearch(
  db: DatabaseSync,
  workspaceId: string,
  subject: string,
  limit: number,
  response: AskResponse,
  prefix: string | null,
): AskResponse {
  const result = conceptSearch(db, subject, { workspaceId, limit })
  const sources = dedupeSources([
    ...result.symbols.map(symbol => symbolSource(symbol, 'matches the question')),
    ...result.notes.map(note => ({ path: note.path, line: 1, symbol: note.title, why: 'note matches the question' })),
  ], limit)

  if (result.total === 0 || sources.length === 0) {
    return {
      ...response,
      answer: `${prefix ?? `Nothing in this workspace matches \`${subject}\`.`} Nothing similar is indexed either.`,
      sources: [],
      tool: 'search',
      confidence: 'low',
      unavailable: ['no matching symbol, note or flow is indexed'],
    }
  }

  const names = result.symbols.length > 0
    ? listNames(result.symbols.map(symbol => symbol.name), 3)
    : listNames(result.notes.map(note => note.title), 3)
  return {
    ...response,
    answer: `${prefix ?? `No exact symbol named \`${subject}\` —`} the closest matches are ${names}.`,
    sources,
    tool: 'search',
    confidence: 'low',
    unavailable: prefix === null ? [] : ['the exact name is not indexed'],
  }
}
