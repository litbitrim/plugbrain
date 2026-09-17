/**
 * Property queries — the Obsidian Bases question, in the small.
 *
 * "Which notes are gates that are still open?" is the question this whole
 * milestone exists to answer, and it is asked in the vault's own vocabulary:
 *
 *   typ=gate UND stand=offen
 *   typ=gate AND stand=offen
 *   typ = "gate" && (stand = "offen" || stand = "teilweise")
 *   tags=plugpt/gate AND NOT owner=OWNER
 *   nachweise_fehlen
 *
 * Design notes that matter for correctness on the real vault:
 *
 *   - VALUES ARE COMPARED NORMALISED.  The vault writes `typ: "gate"`, and a
 *     comparison against `"gate"` including quotes finds nothing. Extraction
 *     already unquotes, and the query unquotes its own literals too, so
 *     `typ=gate`, `typ="gate"` and `typ='gate'` are the same question.
 *   - `AND` HAS NO SPECIAL POWER OVER `OR` BEYOND PRECEDENCE.  `a AND b OR c`
 *     is `(a AND b) OR c`, as in every other language, and parentheses are
 *     supported so the reader never has to guess.
 *   - A BARE KEY MEANS "exists".  `nachweise_fehlen` matches notes that carry
 *     the key at all, which is how an empty list is told apart from an absent
 *     key.
 *   - AN ABSENT KEY IS NOT AN ERROR.  Most notes have no `welle`; asking about
 *     it is a legitimate question with the answer "none of them".
 */
import type { DatabaseSync } from 'node:sqlite'

export class QueryError extends Error {}

export type Comparison = '=' | '!=' | '=~' | '!~' | 'exists'

export interface Condition { key: string; op: Comparison; value: string }

export type Predicate =
  | { type: 'condition'; condition: Condition }
  | { type: 'and'; left: Predicate; right: Predicate }
  | { type: 'or'; left: Predicate; right: Predicate }
  | { type: 'not'; inner: Predicate }

/** Facts about one note that a query is evaluated against. */
export interface NoteFacts {
  /** Every value of every key, normalised. Key is lowercased. */
  properties: Map<string, string[]>
  /** Tags from the `tags` property, lowercased, for `tag=...` shorthand. */
  tags: Set<string>
}

const TOKEN = /\s*(\(|\)|!=|=~|!~|==|=|&&|\|\||!|-(?=\s*\()|[^\s()!=&|]+)/
const KEYWORD_AND = new Set(['and', 'und', '&&'])
const KEYWORD_OR = new Set(['or', 'oder', '||'])
const KEYWORD_NOT = new Set(['not', 'nicht', '!'])

interface Token { text: string; at: number }

function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  let at = 0
  while (at < text.length) {
    const match = TOKEN.exec(text.slice(at))
    if (!match) break
    const raw = match[1]
    if (raw === undefined || raw === '') break
    tokens.push({ text: raw, at })
    at += match[0].length
  }
  return tokens
}

/** Strip the quotes from a query literal; `"gate"` and `gate` mean the same. */
function unquote(text: string): string {
  if (text.length >= 2) {
    const first = text[0]
    const last = text[text.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return text.slice(1, -1)
    }
  }
  return text
}

/**
 * Parse a query into a predicate tree.
 * Throws `QueryError` with the offending token, because a silently empty result
 * for a typo is the worst possible answer to "which gates are open?".
 */
export function parseQuery(text: string): Predicate {
  const tokens = tokenize(text)
  let position = 0

  const peek = (): Token | undefined => tokens[position]
  const next = (): Token | undefined => tokens[position++]
  const isKeyword = (token: Token | undefined, set: Set<string>): boolean =>
    token !== undefined && set.has(token.text.toLowerCase())

  const describe = (token: Token | undefined): string =>
    token === undefined ? 'end of query' : `'${token.text}'`

  function parseOr(): Predicate {
    let left = parseAnd()
    while (isKeyword(peek(), KEYWORD_OR)) {
      next()
      left = { type: 'or', left, right: parseAnd() }
    }
    return left
  }

  function parseAnd(): Predicate {
    let left = parseNot()
    while (isKeyword(peek(), KEYWORD_AND)) {
      next()
      left = { type: 'and', left, right: parseNot() }
    }
    return left
  }

  function parseNot(): Predicate {
    if (isKeyword(peek(), KEYWORD_NOT)) {
      next()
      return { type: 'not', inner: parseNot() }
    }
    return parsePrimary()
  }

  function parsePrimary(): Predicate {
    const token = peek()
    if (token === undefined) throw new QueryError('query ends where a condition was expected')
    if (token.text === '(') {
      next()
      const inner = parseOr()
      const close = next()
      if (close === undefined || close.text !== ')') {
        throw new QueryError(`missing closing parenthesis (found ${describe(close)})`)
      }
      return inner
    }
    if (token.text === ')') throw new QueryError(`unexpected ')' at ${token.at}`)

    next()
    const key = unquote(token.text).toLowerCase()
    if (key === '') throw new QueryError('empty key')

    const op = peek()
    if (op !== undefined && ['=', '==', '!=', '=~', '!~'].includes(op.text)) {
      next()
      const valueToken = peek()
      if (valueToken === undefined || valueToken.text === ')' || KEYWORD_AND.has(valueToken.text.toLowerCase()) || KEYWORD_OR.has(valueToken.text.toLowerCase())) {
        throw new QueryError(`'${key} ${op.text}' needs a value (found ${describe(valueToken)})`)
      }
      next()
      const value = unquote(valueToken.text)
      const comparison: Comparison = op.text === '!=' ? '!='
        : op.text === '=~' ? '=~'
        : op.text === '!~' ? '!~'
        : '='
      return { type: 'condition', condition: { key, op: comparison, value } }
    }
    return { type: 'condition', condition: { key, op: 'exists', value: '' } }
  }

  if (tokens.length === 0) throw new QueryError('empty query')
  const predicate = parseOr()
  if (position < tokens.length) {
    throw new QueryError(`unexpected ${describe(tokens[position])} after a complete condition`)
  }
  return predicate
}

/** Does one note satisfy the predicate? */
export function matches(facts: NoteFacts, predicate: Predicate): boolean {
  switch (predicate.type) {
    case 'and': return matches(facts, predicate.left) && matches(facts, predicate.right)
    case 'or': return matches(facts, predicate.left) || matches(facts, predicate.right)
    case 'not': return !matches(facts, predicate.inner)
    case 'condition': return matchesCondition(facts, predicate.condition)
  }
}

function matchesCondition(facts: NoteFacts, condition: Condition): boolean {
  const values = facts.properties.get(condition.key)
  if (condition.op === 'exists') return values !== undefined && values.length > 0
  if (values === undefined) {
    // A note that does not carry the key is not a match, and is also not an
    // error: `stand!=offen` must not sweep in every note that never mentions a
    // status. Absence is only visible to `exists` and to an explicit NOT.
    return false
  }
  const wanted = condition.value.toLowerCase()
  if (condition.op === '=') return values.some(value => value.toLowerCase() === wanted)
  if (condition.op === '!=') return values.every(value => value.toLowerCase() !== wanted)
  if (condition.op === '=~') return values.some(value => value.toLowerCase().includes(wanted))
  return values.every(value => !value.toLowerCase().includes(wanted))
}

/** Every condition in the tree, for explaining a result and for SQL pushdown. */
export function conditionsOf(predicate: Predicate): Condition[] {
  switch (predicate.type) {
    case 'condition': return [predicate.condition]
    case 'and':
    case 'or': return [...conditionsOf(predicate.left), ...conditionsOf(predicate.right)]
    case 'not': return conditionsOf(predicate.inner)
  }
}

/** Render a predicate back to text, for echoes and error messages. */
export function renderQuery(predicate: Predicate): string {
  switch (predicate.type) {
    case 'condition': {
      const { key, op, value } = predicate.condition
      return op === 'exists' ? key : `${key} ${op} "${value}"`
    }
    case 'and': return `(${renderQuery(predicate.left)} AND ${renderQuery(predicate.right)})`
    case 'or': return `(${renderQuery(predicate.left)} OR ${renderQuery(predicate.right)})`
    case 'not': return `NOT ${renderQuery(predicate.inner)}`
  }
}

export interface PropertyRow { file_id: number; key: string; value: string }

/** Load every property of a workspace's notes, grouped per file. */
export function loadFacts(db: DatabaseSync, workspaceId: string): Map<number, NoteFacts> {
  const rows = db.prepare(
    'SELECT file_id, key, value FROM note_properties WHERE workspace_id = ? ORDER BY file_id, ordinal')
    .all(workspaceId) as unknown as PropertyRow[]
  const byFile = new Map<number, NoteFacts>()
  for (const row of rows) {
    let facts = byFile.get(row.file_id)
    if (facts === undefined) {
      facts = { properties: new Map(), tags: new Set() }
      byFile.set(row.file_id, facts)
    }
    const key = row.key.toLowerCase()
    const list = facts.properties.get(key)
    if (list === undefined) facts.properties.set(key, [row.value])
    else list.push(row.value)
  }
  for (const facts of byFile.values()) {
    for (const tag of facts.properties.get('tags') ?? []) facts.tags.add(tag.toLowerCase())
  }
  return byFile
}
