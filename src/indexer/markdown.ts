/**
 * Knowledge extraction for Markdown — the Obsidian half of the contract.
 *
 * A workspace's real knowledge does not live only in code: decisions, specs and
 * chronicles live in .md, and an agent that cannot follow a wiki-link is missing
 * the half of the project a human would read first. Headings become navigable
 * symbols, `[[wiki links]]` and `](relative.md)` links become edges, frontmatter
 * becomes queryable properties, and `#tags` become concepts other documents
 * attach to.
 *
 * Fenced code blocks are stripped before matching so a `[[x]]` inside an
 * example is not mistaken for a real link, and the frontmatter block is scanned
 * by the property parser rather than the body scanner so a link in a property
 * is counted once, not twice.
 *
 * Three details of the REAL corpus shaped this file, and each of them was a
 * defect before:
 *
 *   1. TABLES ESCAPE THE PIPE.  278 of the 406 notes in this workspace write
 *      `[[Welle R12\|R12]]`, because an unescaped `|` inside a Markdown table
 *      cell breaks the table. The old scanner took the target to be everything
 *      up to the first `|`, which left a trailing backslash on the name —
 *      so every one of those links was unresolved. The target is now trimmed of
 *      trailing separators, and the alias is read from the same split.
 *
 *   2. PROPERTY VALUES ARE QUOTED AND OFTEN LINKS.  `typ: "gate"`,
 *      `komponenten: ["[[PlugPT Shell]]"]`. A property query that compares
 *      against `"gate"` including the quote marks finds nothing, so values are
 *      normalized at extraction time (quotes stripped, whitespace trimmed) while
 *      the raw text is kept for display.
 *
 *   3. SOME NOTES ARE GENERATED.  The tracker regenerates a large part of this
 *      vault, and says so in a `%% ... %%` marker. Editing one of those is work
 *      that will be overwritten, so the fact is extracted rather than guessed at
 *      later by whoever tries to save.
 */
import type { EdgeKind, SymbolKind } from '../store/schema.ts'

export interface MdSymbol { name: string; kind: SymbolKind; line: number; container: string | null }
export interface MdRef { kind: EdgeKind; target: string; line: number; wiki: boolean }

/** A wiki link, with the alias and the part of the note it came from. */
export interface MdLink {
  /** The note name a link points at, cleaned: no pipe, no alias, no trailing `\`, no `#section`. */
  target: string
  /** `[[x|y]]` and `[[x\|y]]` both alias to `y`; null when the link has none. */
  alias: string | null
  /** `[[x#Section]]` — the section asked for, if any. */
  section: string | null
  /** True for `![[x]]`, a transclusion: a dependency, drawn differently. */
  embed: boolean
  /** Where the link was written. A property value is a link too. */
  from: 'body' | 'property'
  line: number
}

/** One frontmatter property value. A list yields one row per item. */
export interface MdProperty {
  key: string
  /** Normalized for comparison: unquoted, trimmed. */
  value: string
  /** Exactly as written, for display. */
  raw: string
  /** True when the value is a `[[wiki link]]` — a property that is a link. */
  isLink: boolean
  ordinal: number
  line: number
}

export interface MarkdownExtract {
  symbols: MdSymbol[]
  refs: MdRef[]
  tags: string[]
  title: string | null
  loc: number
  properties: MdProperty[]
  links: MdLink[]
  /** The note says it is machine-generated, so an edit to it will be lost. */
  generated: boolean
}

/** Replace fenced and inline code with blanks, preserving line numbering. */
function blankCode(content: string): string {
  const lines = content.split('\n')
  let fenced = false
  return lines
    .map(line => {
      if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return '' }
      if (fenced) return ''
      return line.replace(/`[^`]*`/g, '')
    })
    .join('\n')
}

/** The marker the tracker leaves in the notes it owns. */
const GENERATED_MARKER = /%%\s*Automatisch erzeugt von/i

interface Frontmatter {
  present: boolean
  /** Number of lines the block occupies, terminator included. */
  lines: number
  properties: MdProperty[]
  links: MdLink[]
}

/**
 * Split a frontmatter value into its normalised items.
 *
 * Handles the shapes this vault actually uses: a quoted scalar, an unquoted
 * scalar, a number, an inline list (`["a", "b"]`, `[]`), and a wikilink as the
 * whole value. Commas inside quotes do not split, which is why this does not
 * simply call `split(',')`.
 */
function splitValue(raw: string): string[] {
  const text = raw.trim()
  if (text === '' || text === '[]') return []
  if (text.startsWith('[') && text.endsWith(']')) {
    const inner = text.slice(1, -1)
    const items: string[] = []
    let current = ''
    let quote: string | null = null
    for (const char of inner) {
      if (quote !== null) {
        if (char === quote) quote = null
        current += char
        continue
      }
      if (char === '"' || char === "'") { quote = char; current += char; continue }
      if (char === ',') { items.push(current); current = ''; continue }
      current += char
    }
    items.push(current)
    return items.map(item => item.trim()).filter(item => item !== '')
  }
  return [text]
}

/**
 * Strip the quoting and the table escaping from one value, and say whether what
 * is left is a wiki link.
 *
 * The trailing-backslash strip is not cosmetic: it is the fix for the escaped
 * table pipe, and it has to happen before the link body is read or `Welle R12\`
 * is a different note from `Welle R12` forever.
 */
function normalizeValue(item: string): { value: string; isLink: boolean } {
  let text = item.trim()
  // `[[target|alias]]` or `[[target\|alias]]`, and the trailing separator that
  // a table escape leaves behind.
  const link = /^\[\[([\s\S]+?)\]\]$/.exec(text)
  if (link) {
    const body = link[1]
    const pipe = body.indexOf('|')
    let target = (pipe === -1 ? body : body.slice(0, pipe)).trim()
    target = target.replace(/\\+$/, '').trim()
    return { value: target, isLink: true }
  }
  if (text.length >= 2) {
    const first = text[0]
    const last = text[text.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      text = text.slice(1, -1).replace(/\\\|/g, '|')
    }
  }
  return { value: text.trim(), isLink: false }
}

/**
 * Read the frontmatter block at the very top of a note.
 *
 * Block lists (`key:` followed by indented `- item` lines) are supported because
 * YAML permits them and a note that uses one must not silently lose its tags.
 * The `lines` count is what lets the caller scan the BODY without re-reading
 * these lines as prose.
 */
export function parseFrontmatter(content: string): Frontmatter {
  const empty: Frontmatter = { present: false, lines: 0, properties: [], links: [] }
  const lines = content.split('\n')
  if (lines.length === 0) return empty
  const first = lines[0].replace(/^\uFEFF/, '').trim()
  if (first !== '---') return empty

  let end = -1
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i].trim()
    if (line === '---' || line === '...') { end = i; break }
  }
  if (end === -1) return empty

  const out: Frontmatter = { present: true, lines: end + 1, properties: [], links: [] }
  const properties = out.properties
  let ordinal = 0

  const push = (key: string, raw: string, line: number): void => {
    const { value, isLink } = normalizeValue(raw)
    if (value === '' && !isLink) {
      // An empty value (`abhaengig_von: []`) is a real fact — "this key exists
      // and holds nothing" — but it is not a value to match against, so it is
      // recorded once with an empty string and queryable via `key exists`.
      properties.push({ key, value: '', raw: raw.trim(), isLink: false, ordinal: ordinal++, line })
      return
    }
    properties.push({ key, value, raw: raw.trim(), isLink, ordinal: ordinal++, line })
    if (isLink) {
      const { value: target } = normalizeValue(raw)
      out.links.push({
        target, alias: null, section: null, embed: false, from: 'property', line,
      })
    }
  }

  for (let i = 1; i < end; i += 1) {
    const line = lines[i]
    const lineNo = i + 1
    if (line.trim() === '' || line.trim().startsWith('#')) continue
    const kv = /^([A-Za-z0-9_][A-Za-z0-9_\- ]*?):(?:\s+(.*))?$/.exec(line)
    if (!kv) continue
    const key = kv[1].trim()
    const rest = (kv[2] ?? '').trim()

    if (rest === '') {
      // Possibly a block list on the following indented lines.
      const items: string[] = []
      let j = i + 1
      for (; j < end; j += 1) {
        const item = /^\s*-\s+(.*)$/.exec(lines[j])
        if (!item) break
        items.push(item[1].trim())
      }
      if (items.length > 0) {
        for (const item of items) push(key, item, j)
        i = j - 1
        continue
      }
    }
    for (const item of splitValue(rest)) push(key, item, lineNo)
    if (splitValue(rest).length === 0) push(key, rest, lineNo)
  }

  return out
}

/** Split a raw `[[...]]` body into target, alias and section. */
function splitWikiBody(body: string): { target: string; alias: string | null; section: string | null } {
  const pipe = body.indexOf('|')
  const beforePipe = pipe === -1 ? body : body.slice(0, pipe)
  const alias = pipe === -1 ? null : body.slice(pipe + 1).replace(/\\\|/g, '|').trim() || null
  const hash = beforePipe.indexOf('#')
  const noteName = (hash === -1 ? beforePipe : beforePipe.slice(0, hash))
    .replace(/\\+$/, '')
    .trim()
  const section = hash === -1 ? null : beforePipe.slice(hash + 1).trim() || null
  return { target: noteName, alias, section }
}

export function extractFromMarkdown(content: string): MarkdownExtract {
  const frontmatter = parseFrontmatter(content)
  const out: MarkdownExtract = {
    symbols: [], refs: [], tags: [], title: null, loc: 0,
    properties: frontmatter.properties,
    links: [...frontmatter.links],
    generated: GENERATED_MARKER.test(content),
  }
  out.loc = content.length === 0 ? 0 : content.split('\n').length

  // Properties are scanned by the frontmatter parser; the body scanner starts
  // after the block so a link in a property is not also counted as body prose.
  const bodyLines = blankCode(content).split('\n')
  const body = bodyLines.slice(frontmatter.lines)
  // The heading stack gives every heading its parent, so a section is
  // addressable as "document → section → subsection" instead of a flat list.
  const stack: { level: number; name: string }[] = []

  body.forEach((line, index) => {
    const lineNo = index + frontmatter.lines + 1

    const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line)
    if (heading) {
      const level = heading[1].length
      const name = heading[2].replace(/[*_`]/g, '').trim()
      while (stack.length > 0 && stack[stack.length - 1].level >= level) stack.pop()
      const container = stack.length > 0 ? stack[stack.length - 1].name : null
      if (level === 1 && out.title === null) out.title = name
      out.symbols.push({ name, kind: 'property', line: lineNo, container })
      stack.push({ level, name })
      return
    }

    // [[wiki link]], [[wiki link|alias]] and the table-escaped [[wiki link\|alias]]
    for (const match of line.matchAll(/(!?)\[\[([^\]\n]+)\]\]/g)) {
      const embed = match[1] === '!'
      const { target, alias, section } = splitWikiBody(match[2])
      if (!target) continue
      out.links.push({ target, alias, section, embed, from: 'body', line: lineNo })
      out.refs.push({ kind: 'references', target, line: lineNo, wiki: true })
    }

    // [text](./relative/path.md) — external URLs are not workspace edges
    for (const match of line.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = match[1].trim()
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) continue
      out.refs.push({ kind: 'references', target, line: lineNo, wiki: false })
    }

    // #tag, but never a heading (handled above) and never inside a word
    for (const match of line.matchAll(/(?:^|\s)#([a-z][a-z0-9_/-]{1,40})\b/gi)) {
      const tag = match[1].toLowerCase()
      if (!out.tags.includes(tag)) out.tags.push(tag)
    }
  })

  // Frontmatter tags are tags too — in this vault they are the ONLY tags, since
  // the tracker writes them as a list rather than as `#tag` in the prose.
  for (const property of out.properties) {
    if (property.key.toLowerCase() !== 'tags' || property.value === '') continue
    const tag = property.value.replace(/^#/, '').toLowerCase()
    if (!out.tags.includes(tag)) out.tags.push(tag)
  }

  return out
}

/**
 * Resolve a markdown link target to a workspace-relative path.
 * Wiki links address a document by NAME anywhere in the workspace, which is
 * exactly the Obsidian behaviour people expect; relative links resolve against
 * the linking file.
 */
export function resolveMarkdownTarget(
  fromRel: string, target: string, wiki: boolean,
  byPath: Set<string>, byBasename: Map<string, string[]>,
): string | null {
  if (wiki) {
    const key = target.toLowerCase().replace(/\.md$/, '')
    const hits = byBasename.get(key)
    return hits && hits.length > 0 ? hits[0] : null
  }
  const dir = fromRel.includes('/') ? fromRel.slice(0, fromRel.lastIndexOf('/')) : ''
  const joined = dir ? `${dir}/${target}` : target
  const parts: string[] = []
  for (const segment of joined.split('/')) {
    if (segment === '.' || segment === '') continue
    if (segment === '..') { parts.pop(); continue }
    parts.push(segment)
  }
  const normalised = parts.join('/')
  for (const candidate of [normalised, `${normalised}.md`]) {
    if (byPath.has(candidate)) return candidate
  }
  return null
}
