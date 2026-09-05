/**
 * Knowledge extraction for Markdown — the Obsidian half of the contract.
 *
 * A workspace's real knowledge does not live only in code: decisions, specs
 * and chronicles live in .md, and an agent that cannot follow a wiki-link is
 * missing the half of the project a human would read first. Headings become
 * navigable symbols, `[[wiki links]]` and `](relative.md)` links become edges,
 * and `#tags` become concepts other documents attach to.
 *
 * Fenced code blocks are stripped before matching so a `[[x]]` inside an
 * example is not mistaken for a real link.
 */
import type { EdgeKind, SymbolKind } from '../store/schema.ts'

export interface MdSymbol { name: string; kind: SymbolKind; line: number; container: string | null }
export interface MdRef { kind: EdgeKind; target: string; line: number; wiki: boolean }

export interface MarkdownExtract {
  symbols: MdSymbol[]
  refs: MdRef[]
  tags: string[]
  title: string | null
  loc: number
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

export function extractFromMarkdown(content: string): MarkdownExtract {
  const out: MarkdownExtract = { symbols: [], refs: [], tags: [], title: null, loc: 0 }
  out.loc = content.length === 0 ? 0 : content.split('\n').length

  const lines = blankCode(content).split('\n')
  // The heading stack gives every heading its parent, so a section is
  // addressable as "document → section → subsection" instead of a flat list.
  const stack: { level: number; name: string }[] = []

  lines.forEach((line, i) => {
    const lineNo = i + 1

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

    // [[wiki link]] and [[wiki link|alias]]
    for (const m of line.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) {
      const target = m[1].trim()
      if (target) out.refs.push({ kind: 'references', target, line: lineNo, wiki: true })
    }

    // [text](./relative/path.md) — external URLs are not workspace edges
    for (const m of line.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = m[1].trim()
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) continue
      out.refs.push({ kind: 'references', target, line: lineNo, wiki: false })
    }

    // #tag, but never a heading (handled above) and never inside a word
    for (const m of line.matchAll(/(?:^|\s)#([a-z][a-z0-9_-]{1,40})\b/gi)) {
      const tag = m[1].toLowerCase()
      if (!out.tags.includes(tag)) out.tags.push(tag)
    }
  })

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
