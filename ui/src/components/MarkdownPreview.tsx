import React, { useMemo, useState } from 'react'

export interface MarkdownPreviewProps {
  content: string
  onNavigateNote?: (noteName: string) => void
  onOpenSource?: (codePathWithLine: string) => void
  className?: string
}

type CalloutType = 'note' | 'important' | 'warning' | 'tip' | 'caution'

interface CalloutMeta {
  type: CalloutType
  title: string
  color: string
  border: string
  bg: string
  glyph: string
}

const CALLOUT_MAP: Record<CalloutType, CalloutMeta> = {
  note: {
    type: 'note',
    title: 'HINWEIS',
    color: 'var(--info)',
    border: 'var(--info)',
    bg: 'color-mix(in srgb, var(--info) 8%, transparent)',
    glyph: 'ℹ️',
  },
  important: {
    type: 'important',
    title: 'WICHTIG',
    color: 'var(--accent)',
    border: 'var(--accent)',
    bg: 'var(--accent-soft)',
    glyph: '📌',
  },
  warning: {
    type: 'warning',
    title: 'WARNUNG',
    color: 'var(--warn)',
    border: 'var(--warn)',
    bg: 'color-mix(in srgb, var(--warn) 8%, transparent)',
    glyph: '⚠️',
  },
  tip: {
    type: 'tip',
    title: 'TIPP',
    color: 'var(--pos)',
    border: 'var(--pos)',
    bg: 'var(--accent-soft)',
    glyph: '💡',
  },
  caution: {
    type: 'caution',
    title: 'ACHTUNG',
    color: 'var(--neg)',
    border: 'var(--neg)',
    bg: 'color-mix(in srgb, var(--neg) 8%, transparent)',
    glyph: '🛑',
  },
}

// Tokenizer for syntax highlighting in code blocks
interface Token {
  type: 'keyword' | 'string' | 'comment' | 'number' | 'type' | 'fn' | 'text'
  text: string
}

function tokenizeLine(line: string, _lang: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  const KEYWORDS = new Set([
    'import', 'export', 'from', 'default', 'const', 'let', 'var', 'function',
    'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
    'continue', 'try', 'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof',
    'async', 'await', 'yield', 'class', 'extends', 'interface', 'type', 'enum',
    'implements', 'public', 'private', 'protected', 'readonly', 'static', 'as',
    'is', 'keyof', 'in', 'of', 'void', 'any', 'never', 'unknown', 'null',
    'undefined', 'true', 'false', 'super', 'this', 'debugger',
  ])

  const TYPES = new Set([
    'string', 'number', 'boolean', 'symbol', 'bigint', 'object', 'Array',
    'Record', 'Promise', 'Map', 'Set', 'Date', 'RegExp', 'Error', 'Function',
    'React', 'Node', 'HTMLElement', 'Partial', 'Required', 'Readonly',
  ])

  while (i < line.length) {
    // Single-line comment // or #
    if (line.slice(i, i + 2) === '//' || (line[i] === '#' && (i === 0 || /\s/.test(line[i - 1])))) {
      tokens.push({ type: 'comment', text: line.slice(i) })
      break
    }

    // Strings
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i]
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') {
          j += 2
        } else if (line[j] === quote) {
          j++
          break
        } else {
          j++
        }
      }
      tokens.push({ type: 'string', text: line.slice(i, j) })
      i = j
      continue
    }

    // Numbers
    if (/\d/.test(line[i]) && (i === 0 || /[^\w$]/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.xXbBoOa-fA-F_]/.test(line[j])) j++
      tokens.push({ type: 'number', text: line.slice(i, j) })
      i = j
      continue
    }

    // Identifiers & Keywords
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++
      const word = line.slice(i, j)
      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', text: word })
      } else if (TYPES.has(word) || /^[A-Z][a-zA-Z0-9_$]*$/.test(word)) {
        tokens.push({ type: 'type', text: word })
      } else if (j < line.length && line[j] === '(') {
        tokens.push({ type: 'fn', text: word })
      } else {
        tokens.push({ type: 'text', text: word })
      }
      i = j
      continue
    }

    // Single character or symbol
    tokens.push({ type: 'text', text: line[i] })
    i++
  }

  return tokens
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  const lines = code.split('\n')

  return (
    <div className="md-code-block">
      <div className="md-code-header">
        <span className="md-code-lang">{language || 'text'}</span>
        <button type="button" className="md-code-copy" onClick={handleCopy}>
          {copied ? '✓ Kopiert' : 'Kopieren'}
        </button>
      </div>
      <pre className="md-code-pre">
        <code>
          {lines.map((line, lineIdx) => {
            const tokens = tokenizeLine(line, language)
            return (
              <div key={lineIdx} className="md-code-line">
                <span className="md-line-num">{lineIdx + 1}</span>
                <span className="md-line-code">
                  {tokens.map((tok, tokIdx) => (
                    <span key={tokIdx} className={`md-tok md-tok--${tok.type}`}>
                      {tok.text}
                    </span>
                  ))}
                  {tokens.length === 0 && ' '}
                </span>
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}

function isCodePath(text: string): boolean {
  return /^[a-zA-Z0-9_.-]+(?:\/[a-zA-Z0-9_.-]+)+\.[a-zA-Z0-9]+(?::\d+)?$/.test(text) ||
    /^[a-zA-Z0-9_.-]+\.(?:ts|tsx|js|mjs|cjs|json|css|html|rs|go|py|sh|nsi|nsh)(?::\d+)?$/.test(text)
}

// Inline renderer: Wiki-links, backticks (code/code-jump), bold, italic, links
function renderInline(
  text: string,
  onNavigateNote?: (note: string) => void,
  onOpenSource?: (path: string) => void,
  keyPrefix = 'inline'
): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let pos = 0
  let nodeCount = 0

  // Combined regex for inline features
  // 1: Wiki-link: [[Target(|Alias)?]]
  // 2: Standard link: [Text](URL)
  // 3: Inline code: `Code`
  // 4: Bold: **Bold**
  // 5: Italic: *Italic* or _Italic_
  // 6: Strikethrough: ~~Strikethrough~~
  const inlineRegex = /(\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\])|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(__([^_]+)__)|(_([^_]+)_)|(~~([^~]+)~~)/g

  let match: RegExpExecArray | null
  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > pos) {
      nodes.push(text.slice(pos, match.index))
    }

    const key = `${keyPrefix}-${nodeCount++}`

    if (match[1]) {
      // Wiki-link [[Target|Alias]]
      const target = match[2].trim()
      const alias = match[3]?.trim() || target
      nodes.push(
        <button
          key={key}
          type="button"
          className="md-wikilink"
          onClick={() => onNavigateNote?.(target)}
          title={`Notiz öffnen: ${target}`}
        >
          <span className="md-wikilink__brackets">[[</span>
          <span className="md-wikilink__text">{alias}</span>
          <span className="md-wikilink__brackets">]]</span>
          <span className="md-wikilink__arrow" aria-hidden="true">↗</span>
        </button>
      )
    } else if (match[4]) {
      // Standard markdown link [Text](URL) — allowlist: http, https, mailto, relative, #anchor
      const label = match[5]
      const url = match[6]
      const isAllowed = (
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('mailto:') ||
        url.startsWith('#') ||
        url.startsWith('/') ||
        url.startsWith('./') ||
        url.startsWith('../') ||
        (!url.includes(':'))  // relative path without scheme
      )
      const isExternal = url.startsWith('http://') || url.startsWith('https://')
      if (isAllowed) {
        nodes.push(
          <a
            key={key}
            href={url}
            className="md-link"
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {label}
          </a>
        )
      } else {
        // Unsafe scheme — render as plain text
        nodes.push(<span key={key} className="md-link-blocked">{label}</span>)
      }
    } else if (match[7]) {
      // Inline code `Code`
      const codeText = match[8]
      if (isCodePath(codeText) && onOpenSource) {
        nodes.push(
          <button
            key={key}
            type="button"
            className="md-code-link"
            onClick={() => onOpenSource(codeText)}
            title={`Quelle öffnen: ${codeText}`}
          >
            <code>{codeText}</code>
            <span className="md-code-link__glyph" aria-hidden="true">↗</span>
          </button>
        )
      } else {
        nodes.push(<code key={key} className="md-inline-code">{codeText}</code>)
      }
    } else if (match[9]) {
      // Bold **text**
      nodes.push(<strong key={key}>{renderInline(match[10], onNavigateNote, onOpenSource, `${key}-b`)}</strong>)
    } else if (match[11]) {
      // Italic *text*
      nodes.push(<em key={key}>{renderInline(match[12], onNavigateNote, onOpenSource, `${key}-i`)}</em>)
    } else if (match[13]) {
      // Bold __text__
      nodes.push(<strong key={key}>{renderInline(match[14], onNavigateNote, onOpenSource, `${key}-b2`)}</strong>)
    } else if (match[15]) {
      // Italic _text_
      nodes.push(<em key={key}>{renderInline(match[16], onNavigateNote, onOpenSource, `${key}-i2`)}</em>)
    } else if (match[17]) {
      // Strikethrough ~~text~~
      nodes.push(<del key={key}>{renderInline(match[18], onNavigateNote, onOpenSource, `${key}-s`)}</del>)
    }

    pos = match.index + match[0].length
  }

  if (pos < text.length) {
    nodes.push(text.slice(pos))
  }

  return nodes
}

export default function MarkdownPreview({
  content,
  onNavigateNote,
  onOpenSource,
  className = '',
}: MarkdownPreviewProps) {
  // Strip YAML frontmatter from markdown body for preview
  const body = useMemo(() => {
    if (!content) return ''
    return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  }, [content])

  // Block parser
  const elements = useMemo(() => {
    if (!body.trim()) {
      return [<p key="empty" className="md-empty">Leere Notiz</p>]
    }

    const lines = body.split(/\r?\n/)
    const output: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Blank line
      if (!line.trim()) {
        i++
        continue
      }

      // Fenced Code Block: ```lang
      if (line.trim().startsWith('```')) {
        const lang = line.trim().slice(3).trim()
        const codeLines: string[] = []
        i++
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        if (i < lines.length) i++ // Skip closing ```
        output.push(
          <CodeBlock
            key={`code-${output.length}`}
            code={codeLines.join('\n')}
            language={lang}
          />
        )
        continue
      }

      // GitHub Callout: > [!type] or regular Blockquote: > text
      if (line.trim().startsWith('>')) {
        const quoteLines: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
          i++
        }

        const first = quoteLines[0] || ''
        const calloutMatch = first.match(/^\[!(note|important|warning|tip|caution)\]/i)

        if (calloutMatch) {
          const type = calloutMatch[1].toLowerCase() as CalloutType
          const meta = CALLOUT_MAP[type] || CALLOUT_MAP.note
          const calloutBody = quoteLines.slice(1).join('\n')

          output.push(
            <div
              key={`callout-${output.length}`}
              className={`md-callout md-callout--${meta.type}`}
              style={{
                borderLeft: `4px solid ${meta.border}`,
                backgroundColor: meta.bg,
              }}
            >
              <div className="md-callout-header" style={{ color: meta.color }}>
                <span className="md-callout-glyph">{meta.glyph}</span>
                <span className="md-callout-title">{meta.title}</span>
              </div>
              {calloutBody && (
                <div className="md-callout-content">
                  {calloutBody.split('\n').map((cl, clIdx) => (
                    <p key={clIdx}>
                      {renderInline(cl, onNavigateNote, onOpenSource, `callout-${output.length}-${clIdx}`)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )
        } else {
          output.push(
            <blockquote key={`bq-${output.length}`} className="md-blockquote">
              {quoteLines.map((ql, qlIdx) => (
                <p key={qlIdx}>
                  {renderInline(ql, onNavigateNote, onOpenSource, `bq-${output.length}-${qlIdx}`)}
                </p>
              ))}
            </blockquote>
          )
        }
        continue
      }

      // Tables: lines with |
      if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('|') && /[-:]+/.test(lines[i + 1])) {
        const tableLines: string[] = []
        while (i < lines.length && lines[i].includes('|')) {
          tableLines.push(lines[i])
          i++
        }

        const parseRow = (rowText: string): string[] => {
          let trimmed = rowText.trim()
          if (trimmed.startsWith('|')) trimmed = trimmed.slice(1)
          if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1)
          return trimmed.split('|').map(c => c.trim())
        }

        const headers = parseRow(tableLines[0])
        const alignLine = parseRow(tableLines[1])
        const alignments = alignLine.map(cell => {
          const l = cell.startsWith(':')
          const r = cell.endsWith(':')
          if (l && r) return 'center'
          if (r) return 'right'
          return 'left'
        })
        const rows = tableLines.slice(2).map(parseRow)

        output.push(
          <div key={`table-${output.length}`} className="md-table-wrap">
            <table className="md-table">
              <thead>
                <tr>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} style={{ textAlign: alignments[hIdx] || 'left' }}>
                      {renderInline(h, onNavigateNote, onOpenSource, `th-${output.length}-${hIdx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ textAlign: alignments[cIdx] || 'left' }}>
                        {renderInline(cell, onNavigateNote, onOpenSource, `td-${output.length}-${rIdx}-${cIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        continue
      }

      // Headings: # H1 to ###### H6
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const headingText = headingMatch[2]
        const inlineNodes = renderInline(headingText, onNavigateNote, onOpenSource, `h-${output.length}`)
        const hKey = `h-${output.length}`
        switch (level) {
          case 1: output.push(<h1 key={hKey} className="md-heading md-heading--1">{inlineNodes}</h1>); break
          case 2: output.push(<h2 key={hKey} className="md-heading md-heading--2">{inlineNodes}</h2>); break
          case 3: output.push(<h3 key={hKey} className="md-heading md-heading--3">{inlineNodes}</h3>); break
          case 4: output.push(<h4 key={hKey} className="md-heading md-heading--4">{inlineNodes}</h4>); break
          case 5: output.push(<h5 key={hKey} className="md-heading md-heading--5">{inlineNodes}</h5>); break
          default: output.push(<h6 key={hKey} className="md-heading md-heading--6">{inlineNodes}</h6>); break
        }
        i++
        continue
      }

      // Horizontal rule: ---, ***, ___
      if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
        output.push(<hr key={`hr-${output.length}`} className="md-hr" />)
        i++
        continue
      }

      // Checklists: - [ ] or - [x] or * [ ] or * [x]
      if (/^\s*[-*]\s+\[([ xX])\]\s+(.*)$/.test(line)) {
        const listItems: { checked: boolean; text: string }[] = []
        while (i < lines.length && /^\s*[-*]\s+\[([ xX])\]\s+(.*)$/.test(lines[i])) {
          const m = lines[i].match(/^\s*[-*]\s+\[([ xX])\]\s+(.*)$/)!
          listItems.push({ checked: m[1].toLowerCase() === 'x', text: m[2] })
          i++
        }
        output.push(
          <ul key={`checklist-${output.length}`} className="md-checklist">
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx} className={`md-checklist-item ${item.checked ? 'is-checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="md-checkbox"
                />
                <span className="md-checklist-label">
                  {renderInline(item.text, onNavigateNote, onOpenSource, `check-${output.length}-${itemIdx}`)}
                </span>
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Standard Unordered list: - item or * item
      if (/^\s*[-*+]\s+(.*)$/.test(line)) {
        const items: string[] = []
        while (i < lines.length && /^\s*[-*+]\s+(.*)$/.test(lines[i]) && !/^\s*[-*+]\s+\[[ xX]\]/.test(lines[i])) {
          const m = lines[i].match(/^\s*[-*+]\s+(.*)$/)!
          items.push(m[1])
          i++
        }
        output.push(
          <ul key={`ul-${output.length}`} className="md-ul">
            {items.map((it, itIdx) => (
              <li key={itIdx}>
                {renderInline(it, onNavigateNote, onOpenSource, `ul-${output.length}-${itIdx}`)}
              </li>
            ))}
          </ul>
        )
        continue
      }

      // Standard Ordered list: 1. item
      if (/^\s*\d+\.\s+(.*)$/.test(line)) {
        const items: string[] = []
        while (i < lines.length && /^\s*\d+\.\s+(.*)$/.test(lines[i])) {
          const m = lines[i].match(/^\s*\d+\.\s+(.*)$/)!
          items.push(m[1])
          i++
        }
        output.push(
          <ol key={`ol-${output.length}`} className="md-ol">
            {items.map((it, itIdx) => (
              <li key={itIdx}>
                {renderInline(it, onNavigateNote, onOpenSource, `ol-${output.length}-${itIdx}`)}
              </li>
            ))}
          </ol>
        )
        continue
      }

      // Paragraph: collect consecutive non-empty lines
      const paragraphLines: string[] = []
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].trim().startsWith('#') &&
        !lines[i].trim().startsWith('```') &&
        !lines[i].trim().startsWith('>') &&
        !/^(\*{3,}|-{3,}|_{3,})$/.test(lines[i].trim()) &&
        !/^\s*[-*+]\s+/.test(lines[i]) &&
        !/^\s*\d+\.\s+/.test(lines[i]) &&
        !(lines[i].includes('|') && i + 1 < lines.length && /[-:]+/.test(lines[i + 1]))
      ) {
        paragraphLines.push(lines[i])
        i++
      }

      if (paragraphLines.length > 0) {
        output.push(
          <p key={`p-${output.length}`} className="md-paragraph">
            {paragraphLines.map((pl, plIdx) => (
              <React.Fragment key={plIdx}>
                {renderInline(pl, onNavigateNote, onOpenSource, `p-${output.length}-${plIdx}`)}
                {plIdx < paragraphLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        )
      }
    }

    return output
  }, [body, onNavigateNote, onOpenSource])

  return (
    <article className={`markdown-preview ${className}`}>
      {elements}
    </article>
  )
}
