/**
 * Wave-file validator (M18, step 1 of "night shift as a product feature").
 *
 * A wave file is the hand-written plan an integrator/lead feeds to
 * `enqueue-wave.mjs`: a list of cards, each with the fields a brief needs
 * (`id`, `plan`, `goal`, `scope`, `accept`, `steps`), an optional `after` that
 * chains it behind another card, and `to` naming the concrete workers. The
 * enqueuer trusts that file completely — a typo in `after` silently strands a
 * card, a duplicate `id` loses a card, and a reviewer on the same key as its
 * coder makes the review worthless. This module checks the file *before*
 * enqueueing so those failures surface where a human can still fix them.
 *
 * The format follows the wave enqueuer used to drive the fleet (a JSON file
 * with a `cards` array): required card fields, `steps` drawn from
 * `S`/`C`/`A`/`R`, `after` as a card id, `hold` cards that are never enqueued.
 * The key pool of a worker follows the enqueuer's `keyOf` rule — an agent id
 * such as `n-nv01b` shares its key with `n-nv01a` (`n-nv01`) — and can be
 * overridden with a wave-level `keys` map when a fleet names workers
 * differently.
 *
 * The validator never touches the store: it takes the parsed JSON and returns
 * a report, so the same check runs from the CLI and from a test.
 */

/** Fields every card must carry, in the order a brief reads them. */
export const WAVE_REQUIRED_FIELDS = ['id', 'plan', 'goal', 'scope', 'accept', 'steps'] as const
export type WaveRequiredField = (typeof WAVE_REQUIRED_FIELDS)[number]

/** The four card steps: Scout, Coder, Autor, Reviewer. */
export const WAVE_STEP_CODES = ['S', 'C', 'A', 'R'] as const
export type WaveStepCode = (typeof WAVE_STEP_CODES)[number]

export type WaveIssueLevel = 'error' | 'warning' | 'info'

export interface WaveIssue {
  level: WaveIssueLevel
  code: string
  cardId: string | null
  message: string
}

export interface WaveCheckReport {
  wave: string | null
  cardCount: number
  errorCount: number
  warningCount: number
  issues: WaveIssue[]
  errors: WaveIssue[]
  warnings: WaveIssue[]
  infos: WaveIssue[]
  ok: boolean
}

interface WaveCardShape {
  id?: unknown
  plan?: unknown
  goal?: unknown
  scope?: unknown
  accept?: unknown
  steps?: unknown
  after?: unknown
  afterTask?: unknown
  hold?: unknown
  profile?: unknown
  to?: unknown
  [key: string]: unknown
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const nonEmptyString = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : null

/**
 * The key pool of a worker. Workers that name the same physical key/account
 * must never author and review the same card, because their reviews would
 * share the same failure modes. Mirrors `keyOf` in `enqueue-wave.mjs`
 * (`w.slice(0, 6)`, so `n-nv01a` and `n-nv01b` share `n-nv01`); a wave-level
 * `keys` map wins when present so a differently named fleet stays checkable.
 */
export function workerKey(agentId: string, keys?: Record<string, string>): string {
  const id = agentId.trim()
  const explicit = keys?.[id]
  if (typeof explicit === 'string' && explicit.trim() !== '') return explicit.trim()
  return id.slice(0, 6)
}

/** Cycle over the valid `after` edges; each cycle is returned once, closed. */
function findDependencyCycles(edges: Map<string, string>): string[][] {
  const cycles: string[][] = []
  const done = new Set<string>()
  const inStack = new Set<string>()
  const stack: string[] = []
  const visit = (node: string): void => {
    if (done.has(node)) return
    inStack.add(node)
    stack.push(node)
    const next = edges.get(node)
    if (next !== undefined) {
      if (inStack.has(next)) {
        const at = stack.indexOf(next)
        if (at >= 0) cycles.push([...stack.slice(at), next])
      } else if (!done.has(next)) {
        visit(next)
      }
    }
    stack.pop()
    inStack.delete(node)
    done.add(node)
  }
  for (const node of edges.keys()) visit(node)
  return cycles
}

/**
 * Check one parsed wave file. Pure and total: any JSON value is accepted and
 * answered with a report instead of an exception, so a caller can print it.
 */
export function checkWave(input: unknown): WaveCheckReport {
  const issues: WaveIssue[] = []
  const add = (level: WaveIssueLevel, code: string, cardId: string | null, message: string): void => {
    issues.push({ level, code, cardId, message })
  }

  if (!isObject(input)) {
    add('error', 'wave.not-object', null, 'die Wellen-Datei muss ein JSON-Objekt sein')
    return buildReport(null, 0, issues)
  }

  const waveId = nonEmptyString(input.wave)
  if (waveId === null) add('error', 'wave.missing-id', null, 'Pflichtfeld "wave" fehlt oder ist leer')

  const rawKeys = isObject(input.keys) ? input.keys : undefined
  const keys: Record<string, string> | undefined = rawKeys === undefined
    ? undefined
    : Object.fromEntries(Object.entries(rawKeys)
      .map(([agent, key]) => [agent, nonEmptyString(key)])
      .filter((entry): entry is [string, string] => entry[1] !== null))

  const rawProfiles = isObject(input.profiles) ? input.profiles : undefined
  const knownProfiles = rawProfiles === undefined ? null : new Set(Object.keys(rawProfiles))

  if (!Array.isArray(input.cards)) {
    add('error', 'wave.cards-missing', null, 'Pflichtfeld "cards" fehlt oder ist keine Liste')
    return buildReport(waveId, 0, issues)
  }
  const cards = input.cards as unknown[]

  // Pass 1: identity. A duplicate id loses the earlier card, so it is an error,
  // and the ids seen here are the universe every `after` may point at.
  const ids = new Set<string>()
  const holdById = new Map<string, boolean>()
  const shaped: Array<{ card: WaveCardShape; id: string | null }> = []
  cards.forEach((raw, index) => {
    if (!isObject(raw)) {
      add('error', 'card.not-object', null, `Karte ${index + 1} ist kein Objekt`)
      shaped.push({ card: {}, id: null })
      return
    }
    const card = raw as WaveCardShape
    const id = nonEmptyString(card.id)
    if (id === null) {
      add('error', 'card.missing-id', null, `Karte ${index + 1}: Pflichtfeld "id" fehlt oder ist leer`)
    } else if (ids.has(id)) {
      add('error', 'card.duplicate-id', id, `doppelte Karten-ID "${id}"`)
    } else {
      ids.add(id)
      holdById.set(id, card.hold === true)
    }
    shaped.push({ card, id })
  })

  // Pass 2: per-card fields, then the cross-card rules.
  const edges = new Map<string, string>()
  for (const { card, id } of shaped) {
    for (const field of WAVE_REQUIRED_FIELDS) {
      if (field === 'id') continue
      if (nonEmptyString(card[field]) === null) {
        add('error', 'card.missing-field', id, `Pflichtfeld "${field}" fehlt oder ist leer`)
      }
    }

    const steps = nonEmptyString(card.steps)
    if (steps !== null) {
      const unknown = [...steps].filter(char => !(WAVE_STEP_CODES as readonly string[]).includes(char))
      if (unknown.length > 0) {
        add('error', 'card.steps-unknown', id,
          `unbekannte Schrittkürzel "${unknown.join('')}" (erlaubt: ${WAVE_STEP_CODES.join('')})`)
      }
      if (steps.includes('R') || steps.includes('C') || steps.includes('A')) {
        validateReviewerKey(keys, card, id, steps, add)
      }
    }

    if (card.after !== undefined && card.after !== null) {
      const after = nonEmptyString(card.after)
      if (after === null) {
        add('error', 'card.after-invalid', id, '"after" muss eine nicht-leere Karten-ID sein')
      } else if (id !== null && after === id) {
        add('error', 'card.after-self', id, `"after" verweist auf die Karte selbst (${id})`)
      } else if (!ids.has(after)) {
        add('error', 'card.after-unknown', id, `"after" verweist auf unbekannte Karte "${after}"`)
      } else {
        if (holdById.get(after) === true && card.hold !== true) {
          add('error', 'card.after-hold', id,
            `"after" verweist auf die hold-Karte "${after}", die nie eingereiht wird`)
        }
        if (id !== null) edges.set(id, after)
      }
    }

    const profile = nonEmptyString(card.profile)
    if (profile !== null && knownProfiles !== null && !knownProfiles.has(profile)) {
      add('warning', 'card.profile-unknown', id, `Profil "${profile}" ist nicht in "profiles" definiert`)
    }

    if (card.hold === true && id !== null) {
      add('info', 'card.hold', id, 'hold-Karte wird nicht eingereiht (nur der Lead/Owner löst sie)')
    }
  }

  for (const cycle of findDependencyCycles(edges)) {
    add('error', 'card.after-cycle', cycle[0] ?? null,
      `zyklische after-Abhängigkeit: ${cycle.join(' -> ')}`)
  }

  return buildReport(waveId, cards.length, issues)
}

/** Reviewer and coder must not share a key pool; an unpinned coder is at risk. */
function validateReviewerKey(
  keys: Record<string, string> | undefined,
  card: WaveCardShape,
  id: string | null,
  steps: string,
  add: (level: WaveIssueLevel, code: string, cardId: string | null, message: string) => void,
): void {
  const to = isObject(card.to) ? card.to : {}
  const coder = nonEmptyString(to.C)
  const reviewer = nonEmptyString(to.R)
  if (!steps.includes('R') || !steps.includes('C')) return
  if (coder !== null && reviewer !== null) {
    if (workerKey(coder, keys) === workerKey(reviewer, keys)) {
      add('error', 'card.reviewer-key-collision', id,
        `Reviewer ${reviewer} und Coder ${coder} teilen den Schlüsselpool "${workerKey(coder, keys)}"`)
    }
    return
  }
  if (coder === null && reviewer !== null) {
    add('warning', 'card.coder-key-unpinned', id,
      `Reviewer ${reviewer} ist fest, der Coder wird automatisch vergeben — der Schlüsselpool kann kollidieren`)
  }
}

function buildReport(wave: string | null, cardCount: number, issues: WaveIssue[]): WaveCheckReport {
  const errors = issues.filter(issue => issue.level === 'error')
  const warnings = issues.filter(issue => issue.level === 'warning')
  const infos = issues.filter(issue => issue.level === 'info')
  return {
    wave, cardCount,
    errorCount: errors.length, warningCount: warnings.length,
    issues, errors, warnings, infos,
    ok: errors.length === 0,
  }
}
