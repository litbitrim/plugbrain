/**
 * Plain-language router (ASK-01, milestone A1).
 *
 * A question a human types — German or English — names an intent and a
 * subject: "wo wird `resolveBrainHome` definiert?" asks for a definition of
 * `resolveBrainHome`. Nothing here calls a model. The intent is decided by
 * ordered pattern matching and the subject is pulled out of the text itself,
 * because the downstream tools (query, context, impact, detect_changes,
 * briefing, notes) need a literal thing to look up, not a paraphrase.
 *
 * The order of the patterns is the contract: "what calls X" is a usage
 * question even though it contains "what", and "what breaks if I change X"
 * is an impact question even though it contains "change". More specific
 * patterns therefore come before more general ones.
 */

export type AskIntent =
  | 'definition'
  | 'usage'
  | 'impact'
  | 'changes'
  | 'overview'
  | 'notes'
  | 'search'

export type AskTool =
  | 'query'
  | 'context'
  | 'impact'
  | 'detect_changes'
  | 'briefing'
  | 'notes_search'
  | 'search'

/**
 * Which existing tool answers which intent. `usage` and `definition` both go
 * through `context`, which returns the definition site AND the callers; the
 * answer builder picks the part the intent asked about. `overview` and
 * `changes` have dedicated tools. Anything the router cannot place becomes a
 * plain `search`, and honesty about that is the answer builder's job.
 */
export const INTENT_TOOL: Record<AskIntent, AskTool> = {
  definition: 'context',
  usage: 'context',
  impact: 'impact',
  changes: 'detect_changes',
  overview: 'briefing',
  notes: 'notes_search',
  search: 'search',
}

interface IntentRule {
  intent: AskIntent
  /** Matched against the lowercased, trimmed question. */
  pattern: RegExp
}

/**
 * Ordered, most specific first. German and English alternatives sit in the
 * same rule so the two languages cannot drift apart.
 */
const INTENT_RULES: IntentRule[] = [
  // ── impact: what breaks / what depends on X ──────────────────────────────
  {
    intent: 'impact',
    pattern: /\b(what breaks|what will break|who depends|what depends|what is affected|blast radius|impact of|auswirkungen?|was (bricht|passiert|ist betroffen)|wer (ist|wäre) betroffen|wenn ich .* (ändere|aendere)|was bricht)\b/,
  },
  // ── usage: who calls / who uses X ────────────────────────────────────────
  {
    intent: 'usage',
    pattern: /\b(who calls|who uses|who is using|what calls|what uses|called by|used by|usages? of|references? to|callers? of|wer (ruft|nutzt|verwendet|benutzt)|wer (greift|zugriff)|aufgerufen von|verwendet von|welche aufrufer)\b/,
  },
  // ── definition: where is X defined ───────────────────────────────────────
  {
    intent: 'definition',
    pattern: /\b(where is|where are|where's|where is .* defined|definition of|defined in|declared in|declaration of|define|definiert|wo (wird|ist|liegt|findet|befindet)|deklariert|definition von|wie ist .* definiert)\b/,
  },
  // ── changes: what changed ────────────────────────────────────────────────
  // No outer `\b`: JavaScript's `\b` treats umlauts as non-word characters,
  // so a boundary before "änderungen" would never match.
  {
    intent: 'changes',
    pattern: /(what changed|what has changed|what'?s changed|recent changes|latest changes|what is new|was hat sich ge(ä|a)ndert|was ist neu|letzte (ä|a)nderungen|neueste (ä|a)nderungen|änderungen|aenderungen)/,
  },
  // ── overview: what is this project ───────────────────────────────────────
  {
    intent: 'overview',
    pattern: /(what is this (project|repo|repository|codebase)|what does this (project|repo|repository|codebase) do|what'?s in this (project|repo|repository)|describe (the|this) (project|repo|repository|codebase)|project overview|repo overview|was ist dieses (projekt|repo)|worum geht|überblick|ueberblick|was macht dieses (projekt|repo))/,
  },
  // ── notes: notes about X ─────────────────────────────────────────────────
  {
    intent: 'notes',
    pattern: /\b(notes? (about|on|zu|for)|notizen? (zu|über|ueber)|dokumentation zu|documented about|what do we know about|was wissen wir über|gibt es notizen)\b/,
  },
]

/**
 * Decide what the question is asking for. Never throws; an unrecognised
 * question is an honest `search`.
 */
export function detectIntent(question: string): AskIntent {
  const text = question.toLowerCase().replace(/\s+/g, ' ').trim()
  if (text === '') return 'search'
  for (const rule of INTENT_RULES) {
    if (rule.pattern.test(text)) return rule.intent
  }
  return 'search'
}

/** Words that describe the question rather than name the subject. */
const STOPWORDS = new Set<string>([
  // English question words
  'where', 'what', 'who', 'whom', 'whose', 'which', 'when', 'why', 'how',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'the', 'a', 'an', 'this', 'that', 'these', 'those',
  'do', 'does', 'did', 'can', 'could', 'should', 'would', 'will', 'shall',
  'has', 'have', 'had', 'give', 'gives', 'gib',
  'in', 'on', 'at', 'to', 'for', 'of', 'by', 'with', 'from', 'about', 'into',
  'and', 'or', 'but', 'if', 'then', 'than', 'so', 'as', 'it', 'its',
  'me', 'my', 'we', 'our', 'you', 'your', 'they', 'their', 'there', 'here',
  // English verbs that occur in the question, not the identifier
  'define', 'defined', 'defines', 'declaration', 'declared', 'declares',
  'call', 'calls', 'called', 'calling', 'use', 'uses', 'used', 'using', 'usage', 'usages',
  'reference', 'references', 'referenced', 'caller', 'callers', 'depends', 'depend', 'dependency',
  'change', 'changes', 'changed', 'changing', 'break', 'breaks', 'broken', 'impact', 'affects', 'affected',
  'note', 'notes', 'documented', 'documentation', 'about',
  'project', 'repo', 'repository', 'codebase', 'overview', 'work', 'works', 'function', 'functions',
  'class', 'classes', 'method', 'methods', 'symbol', 'symbols', 'file', 'files', 'code',
  'please', 'show', 'tell', 'find', 'lookup', 'search', 'list', 'get',
  // German question words
  'wo', 'was', 'wer', 'wem', 'wen', 'wessen', 'welche', 'welcher', 'welches', 'wann', 'warum', 'wie',
  'ist', 'sind', 'war', 'waren', 'wird', 'werden', 'wurde', 'wurden', 'würde', 'wuerde',
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'eines', 'einer',
  'dieser', 'diese', 'dieses', 'diesem', 'diesen', 'sich', 'es', 'sie', 'er',
  'zu', 'zum', 'zur', 'in', 'im', 'an', 'am', 'auf', 'für', 'fuer', 'von', 'mit', 'bei', 'aus', 'über', 'ueber',
  'und', 'oder', 'aber', 'wenn', 'dann', 'als', 'so', 'auch', 'nur', 'noch',
  'ich', 'mir', 'mich', 'wir', 'uns', 'unser', 'mein', 'meine',
  // German verbs / nouns that occur in the question
  'definiert', 'definieren', 'deklariert', 'ruft', 'rufen', 'aufgerufen', 'aufrufer',
  'verwendet', 'verwenden', 'benutzt', 'benutzen', 'nutzt', 'nutzen', 'greift', 'zugriff',
  'ändere', 'aendere', 'ändern', 'aendern', 'geändert', 'geaendert', 'änderungen', 'aenderungen',
  'bricht', 'kaputt', 'passiert', 'betroffen', 'auswirkungen',
  'notiz', 'notizen', 'dokumentiert', 'dokumentation',
  // German helper verbs / temporal words that never name the subject
  'gab', 'gibt', 'geben', 'gegeben', 'hat', 'habe', 'haben', 'hatte',
  'letzte', 'letzter', 'letztes', 'neueste', 'neuester', 'neuestes', 'neu', 'recently',
  'projekt', 'repo', 'repository', 'codebasis', 'überblick', 'ueberblick', 'funktioniert', 'macht',
  'funktion', 'funktionen', 'klasse', 'klassen', 'methode', 'methoden', 'symbol', 'symbole', 'datei', 'dateien',
  'bitte', 'zeig', 'zeige', 'sag', 'finde', 'suche', 'liste',
])

/** A code span in backticks, or a single- or double-quoted phrase. */
const CODE_SPAN = /`([^`]+)`|"([^"]+)"|'([^']+)'|\u2018([^\u2019]+)\u2019|\u201c([^\u201d]+)\u201d/

/**
 * Does this token look like a code identifier rather than prose? camelCase,
 * PascalCase, snake_case, a dotted/slashed path, or a name with a non-leading
 * uppercase. `resolveBrainHome`, `brain_home`, `src/home.ts` all qualify.
 */
function looksLikeIdentifier(token: string): boolean {
  if (/^[A-Za-z_$][\w$]*(?:[./\\][\w$]+)+$/.test(token)) return true   // path / dotted
  if (/[a-z0-9][A-Z]/.test(token)) return true                          // camelCase
  if (/^[A-Z][a-z0-9]/.test(token) && token.length > 1) return true     // PascalCase
  if (/_/.test(token) && /[A-Za-z]/.test(token)) return true            // snake_case
  if (/-/.test(token) && /[A-Za-z]/.test(token)) return true            // kebab-case
  return false
}

/**
 * Pull the thing the question is about out of the sentence.
 *
 * Priority: an explicit code span (backticks/quotes) always wins, then any
 * identifier-shaped token, then the leftover words once the question's own
 * vocabulary is removed. Returns `null` when nothing substantive remains —
 * an overview question or "what changed" legitimately has no subject.
 */
export function extractSubject(question: string): string | null {
  const trimmed = question.trim()
  if (trimmed === '') return null

  // 1. An explicit code span is unambiguous.
  const span = trimmed.match(CODE_SPAN)
  if (span) {
    const value = (span[1] ?? span[2] ?? span[3] ?? span[4] ?? span[5] ?? '').trim()
    if (value !== '') return value
  }

  const tokens = trimmed
    .replace(/[?!.,;:()[\]{}]+$/g, '')
    .split(/[\s,;:()[\]{}?!]+/)
    .map(token => token.replace(/^[^\p{L}\p{N}_$./\\-]+|[^\p{L}\p{N}_$./\\-]+$/gu, ''))
    .filter(token => token.length > 0)

  // 2. Identifier-shaped tokens beat prose. If several appear, the first
  //    non-stopword one is the subject the reader emphasised.
  const identifiers = tokens.filter(token => !STOPWORDS.has(token.toLowerCase()) && looksLikeIdentifier(token))
  if (identifiers.length > 0) return identifiers[0]

  // 3. Otherwise the remaining meaningful words, in order.
  const words = tokens.filter(token => !STOPWORDS.has(token.toLowerCase()) && token.length > 1)
  if (words.length > 0) return words.join(' ')

  // 4. Nothing but question vocabulary is left — the intent was carried by
  //    the whole sentence ("what changed?"), so there is no subject at all.
  return null
}
