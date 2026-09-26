/**
 * AST extraction for TypeScript / JavaScript.
 *
 * This is the part that separates a brain from a file listing. The previous
 * generation of this indexer matched symbols with line-by-line regexes and
 * called itself "AST symbol indexing"; it produced zero call edges, which is
 * why the graph could not answer a single question about behaviour. Here the
 * TypeScript compiler parses the file and we walk the real tree, so a symbol
 * inside a string, a comment, or a multi-line signature is handled correctly.
 *
 * Deliberately NOT type-checked: a full TypeChecker needs the whole program
 * plus node_modules and turns a 4000-file workspace into minutes per pass.
 * Parsing alone gives symbols, imports, calls, extends/implements — resolution
 * happens later against the symbol table, and anything unresolved is KEPT and
 * flagged rather than dropped.
 */
import ts from 'typescript'
import type { EdgeKind, SymbolKind } from '../store/schema.ts'

export interface ExtractedSymbol {
  name: string
  kind: SymbolKind
  line: number
  endLine: number
  exported: boolean
  container: string | null
}

export interface ExtractedRef {
  kind: EdgeKind
  /** Name of the symbol being referenced; resolved against the index later. */
  target: string
  /**
   * For `receiver.target(...)`, the text left of the dot. This is the single
   * most important disambiguator a parser can hand the resolver: `db.run` and
   * `server.run` share the name `run`, and without the receiver the only way
   * to pick between two modules that both export `run` is to guess.
   * `null` for a bare `target(...)` call.
   */
  receiver: string | null
  /** Enclosing symbol name, so a call edge starts at the right node. */
  from: string | null
  line: number
}

/** One name a module brings into this file's scope. */
export interface ImportBinding {
  /** The name as used in THIS file. */
  local: string
  /**
   * The name as exported by the target module: an export name, `default`, or
   * `*` for a namespace import. This is what turns a local alias back into a
   * real symbol in another file.
   */
  imported: string
}

export interface ExtractedImport {
  /** Raw module specifier exactly as written. */
  specifier: string
  /** Names this import binds into local scope. Empty for a side-effect import. */
  bindings: ImportBinding[]
  line: number
}

export interface FileExtract {
  symbols: ExtractedSymbol[]
  refs: ExtractedRef[]
  imports: ExtractedImport[]
  loc: number
}

/** Language label for an extension, or null when we cannot parse it. */
export function languageOf(ext: string): string | null {
  switch (ext.toLowerCase()) {
    case '.ts': return 'typescript'
    case '.tsx': return 'tsx'
    case '.mts': case '.cts': return 'typescript'
    case '.js': case '.mjs': case '.cjs': return 'javascript'
    case '.jsx': return 'jsx'
    case '.py': return 'python'
    case '.rs': return 'rust'
    case '.sql': return 'sql'
    case '.java': return 'java'
    case '.go': return 'go'
    default: return null
  }
}

/**
 * These extractors intentionally recognise only syntax whose target is written
 * down in the source. Python/Rust/SQL all have dynamic forms which must remain
 * unresolved instead of being turned into plausible-looking graph edges.
 */
function foreignExtract(path: string, content: string, ext: string): FileExtract | null {
  const lang = languageOf(ext)
  if (lang === 'python') return extractPython(content)
  if (lang === 'rust') return extractRust(content)
  if (lang === 'sql') return extractSql(content)
  if (lang === 'java') return extractJava(content)
  if (lang === 'go') return extractGo(content)
  return null
}

const foreignBase = (content: string): FileExtract => ({
  symbols: [], refs: [], imports: [], loc: content.length === 0 ? 0 : content.split('\n').length,
})

/** Remove comments and string literals before looking for executable names. */
function codeOnly(line: string, comment: RegExp): string {
  const withoutComment = line.replace(comment, '')
  return withoutComment
    .replace(/'(?:\\.|[^'\\])*'/g, "''")
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
}

function extractPython(content: string): FileExtract {
  const out = foreignBase(content)
  const stack: Array<{ indent: number; name: string }> = []
  const lines = content.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index]
    const lineNo = index + 1
    const indent = raw.match(/^\s*/)?.[0].replace(/\t/g, '    ').length ?? 0
    const line = codeOnly(raw, /\s+#.*$/)
    if (line.trim() === '') continue
    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) stack.pop()
    const container = stack.at(-1)?.name ?? null

    const fromImport = line.match(/^\s*from\s+([.\w]+)\s+import\s+(.+)$/)
    if (fromImport) {
      const specifier = fromImport[1]
      for (const part of fromImport[2].replace(/[()]/g, '').split(',')) {
        const binding = part.trim().match(/^([A-Za-z_]\w*)(?:\s+as\s+([A-Za-z_]\w*))?$/)
        if (binding) out.imports.push({ specifier, bindings: [{ local: binding[2] ?? binding[1], imported: binding[1] }], line: lineNo })
      }
      continue // import-list parentheses are declarations, never calls
    } else {
      const imported = line.match(/^\s*import\s+(.+)$/)
      if (imported) for (const part of imported[1].split(',')) {
        const binding = part.trim().match(/^([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)(?:\s+as\s+([A-Za-z_]\w*))?$/)
        if (binding) {
          const local = binding[2] ?? binding[1].split('.')[0]
          out.imports.push({ specifier: binding[1], bindings: [{ local, imported: '*' }], line: lineNo })
        }
      }
      if (imported) continue // import-list parentheses are declarations, never calls
    }

    const declaration = line.match(/^\s*(?:async\s+)?(def|class)\s+([A-Za-z_]\w*)/)
    if (declaration) {
      const kind: SymbolKind = declaration[1] === 'class' ? 'class' : container === null ? 'function' : 'method'
      const name = declaration[2]
      out.symbols.push({ name, kind, line: lineNo, endLine: lineNo, exported: !name.startsWith('_'), container })
      if (declaration[1] === 'class') {
        const bases = line.match(/^\s*class\s+\w+\s*\(([^)]*)\)/)?.[1] ?? ''
        for (const base of bases.split(',')) {
          const target = base.trim().match(/^([A-Za-z_]\w*)(?:\.[A-Za-z_]\w*)?$/)?.[1]
          if (target) out.refs.push({ kind: 'extends', target, receiver: null, from: name, line: lineNo })
        }
      }
      stack.push({ indent, name })
      continue
    }

    const constMatch = container === null && line.match(/^([A-Z][A-Z0-9_]{2,})\s*(?::[^=]+)?=/)
    if (constMatch) {
      out.symbols.push({ name: constMatch[1], kind: 'constant', line: lineNo, endLine: lineNo, exported: true, container: null })
    }

    const envMatch = raw.match(/\b(?:os\.environ(?:\[\s*['"]([A-Z0-9_]+)['"]\s*\]|\.get\(\s*['"]([A-Z0-9_]+)['"])|os\.getenv\(\s*['"]([A-Z0-9_]+)['"])/)
    if (envMatch) {
      const envName = envMatch[1] || envMatch[2] || envMatch[3]
      if (envName) out.symbols.push({ name: envName, kind: 'constant', line: lineNo, endLine: lineNo, exported: true, container: null })
    }

    const calls = codeOnly(line, /\s+#.*$/).matchAll(/\b([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)?)\s*\(/g)
    for (const hit of calls) {
      const full = hit[1]
      if (['if', 'for', 'while', 'with', 'except', 'return', 'print'].includes(full)) continue
      const dot = full.lastIndexOf('.')
      out.refs.push({ kind: 'calls', target: dot === -1 ? full : full.slice(dot + 1), receiver: dot === -1 ? null : full.slice(0, dot), from: container, line: lineNo })
    }
  }
  return out
}

function extractRust(content: string): FileExtract {
  const out = foreignBase(content)
  const lines = content.split('\n')
  let container: string | null = null
  for (let index = 0; index < lines.length; index += 1) {
    const lineNo = index + 1
    const line = codeOnly(lines[index], /\/\/.*$/)
    if (/^\s*#\[/.test(line)) continue // attributes/macros are not function calls
    const use = line.match(/^\s*use\s+([^;]+);/)
    if (use) {
      const path = use[1].trim()
      const leafs = path.match(/^(.*)::\{([^}]+)\}$/)
      if (leafs) for (const item of leafs[2].split(',')) {
        const binding = item.trim().match(/^([A-Za-z_]\w*)(?:\s+as\s+([A-Za-z_]\w*))?$/)
        if (binding) out.imports.push({ specifier: leafs[1], bindings: [{ local: binding[2] ?? binding[1], imported: binding[1] }], line: lineNo })
      } else {
        const binding = path.match(/^(.*)::([A-Za-z_]\w*)(?:\s+as\s+([A-Za-z_]\w*))?$/)
        if (binding) out.imports.push({ specifier: binding[1], bindings: [{ local: binding[3] ?? binding[2], imported: binding[2] }], line: lineNo })
      }
    }
    const impl = line.match(/^\s*impl(?:<[^>]*>)?\s+(?:[\w:]+\s+for\s+)?([A-Za-z_]\w*)/)
    if (impl) { container = impl[1]; continue }
    const declaration = line.match(/^\s*(?:pub(?:\([^)]*\))?\s+)?(?:async\s+)?(fn|struct|enum|trait)\s+([A-Za-z_]\w*)/)
    if (declaration) {
      const type = declaration[1]
      const name = declaration[2]
      const kind: SymbolKind = type === 'fn' ? (container === null ? 'function' : 'method') : type === 'trait' ? 'interface' : type === 'enum' ? 'enum' : 'class'
      out.symbols.push({ name, kind, line: lineNo, endLine: lineNo, exported: /^\s*pub\b/.test(line), container: type === 'fn' ? container : null })
      continue
    }
    for (const hit of line.matchAll(/\b([A-Za-z_]\w*(?:(?:::|\.)[A-Za-z_]\w*)?)\s*!?\s*\(/g)) {
      const full = hit[1]
      if (['if', 'while', 'match', 'loop', 'for'].includes(full)) continue
      const separator = Math.max(full.lastIndexOf('::'), full.lastIndexOf('.'))
      const separatorSize = full.slice(separator, separator + 2) === '::' ? 2 : 1
      out.refs.push({ kind: 'calls', target: separator === -1 ? full : full.slice(separator + separatorSize), receiver: separator === -1 ? null : full.slice(0, separator), from: container, line: lineNo })
    }
  }
  return out
}

function extractSql(content: string): FileExtract {
  const out = foreignBase(content)
  const lines = content.split('\n')
  for (let index = 0; index < lines.length; index += 1) {
    const lineNo = index + 1
    const line = codeOnly(lines[index], /--.*$/)
    const definition = line.match(/^\s*CREATE\s+(?:OR\s+REPLACE\s+)?(?:TABLE|VIEW|FUNCTION|PROCEDURE)\s+(?:IF\s+NOT\s+EXISTS\s+)?([A-Za-z_]\w*)/i)
    if (definition) {
      const word = line.match(/^\s*CREATE\s+(?:OR\s+REPLACE\s+)?(TABLE|VIEW|FUNCTION|PROCEDURE)/i)?.[1].toLowerCase()
      const kind: SymbolKind = word === 'function' || word === 'procedure' ? 'function' : 'class'
      out.symbols.push({ name: definition[1], kind, line: lineNo, endLine: lineNo, exported: true, container: null })
    }
    const source = /\b(?:FROM|JOIN|UPDATE|INTO|REFERENCES|DELETE\s+FROM)\s+([A-Za-z_]\w*)/ig
    for (const hit of line.matchAll(source)) out.refs.push({ kind: 'references', target: hit[1], receiver: null, from: null, line: lineNo })
    for (const hit of line.matchAll(/\bCALL\s+([A-Za-z_]\w*)\s*\(/ig)) out.refs.push({ kind: 'calls', target: hit[1], receiver: null, from: null, line: lineNo })
    const include = line.match(/^\s*(?:\\i|SOURCE)\s+([^\s;]+)\s*;?\s*$/i)
    if (include) out.imports.push({ specifier: include[1], bindings: [], line: lineNo })
  }
  return out
}

/**
 * Java extractor: classes, records, interfaces, enums, methods, fields, imports, extends/implements.
 * Regex-based (no tree-sitter required). Handles single-line class/method/field bodies; multi-line
 * javadoc and annotations are skipped. Same approach as Python/Rust: no type resolution, but
 * real symbol names and real call edges for the graph.
 */
function extractJava(content: string): FileExtract {
  const out = foreignBase(content)
  // Strip block comments (javadocs) while strictly preserving line numbers
  const clean = content.replace(/\/\*[\s\S]*?\*\//g, m => '\n'.repeat((m.match(/\n/g) ?? []).length))
  const lines = clean.split('\n')
  const containerStack: Array<{ name: string; depth: number }> = []
  let braceDepth = 0
  let pendingContainer: string | null = null

  for (let index = 0; index < lines.length; index += 1) {
    const lineNo = index + 1
    const raw = lines[index]
    const withoutComment = raw.replace(/\/\/.*$/, '')
    if (withoutComment.trim() === '') continue

    // import statement: `import [static] a.b.c.Name;`
    const importMatch = withoutComment.match(/^\s*import\s+(?:static\s+)?([a-zA-Z_][\w.]+)\.([A-Za-z_\d*]+)\s*;/)
    if (importMatch) {
      out.imports.push({ specifier: importMatch[1], bindings: [{ local: importMatch[2], imported: importMatch[2] }], line: lineNo })
      continue
    }

    if (/^\s*@[A-Za-z]/.test(withoutComment)) continue

    // Type declarations: class, record, interface, enum
    const typeDecl = withoutComment.match(
      /^\s*(?:(?:public|private|protected|static|final|abstract|sealed|non-sealed)\s+)*(class|interface|enum|record|@interface)\s+([A-Za-z_]\w*)(?:<[^>]*>)?(?:\s+extends\s+([\w.<>, ]+?))?(?:\s+implements\s+([\w.<>, ]+?))?\s*(?:\{|$|\()/
    )
    if (typeDecl) {
      const keyword = typeDecl[1]
      const name = typeDecl[2]
      const kind: SymbolKind = keyword === 'interface' || keyword === '@interface' ? 'interface'
        : keyword === 'enum' ? 'enum'
        : 'class'
      const isPublic = /\bpublic\b/.test(withoutComment)
      out.symbols.push({ name, kind, line: lineNo, endLine: lineNo, exported: isPublic, container: containerStack.at(-1)?.name ?? null })
      if (typeDecl[3]) {
        for (const base of typeDecl[3].split(',')) {
          const target = base.trim().replace(/<.*>/, '').trim()
          if (target) out.refs.push({ kind: 'extends', target, receiver: null, from: name, line: lineNo })
        }
      }
      if (typeDecl[4]) {
        for (const iface of typeDecl[4].split(',')) {
          const target = iface.trim().replace(/<.*>/, '').trim()
          if (target) out.refs.push({ kind: 'implements', target, receiver: null, from: name, line: lineNo })
        }
      }
      pendingContainer = name
    }

    // Strip strings so braces/calls inside strings don't pollute AST
    const code = withoutComment
      .replace(/'(?:\\.|[^'\\])*'/g, "''")
      .replace(/"(?:\\.|[^"\\])*"/g, '""')

    // Track braces on this line
    for (let c = 0; c < code.length; c += 1) {
      if (code[c] === '{') {
        braceDepth += 1
        if (pendingContainer !== null) {
          containerStack.push({ name: pendingContainer, depth: braceDepth })
          pendingContainer = null
        }
      } else if (code[c] === '}') {
        if (containerStack.length > 0 && containerStack[containerStack.length - 1].depth === braceDepth) {
          containerStack.pop()
        }
        braceDepth -= 1
      }
    }

    const currentContainer = containerStack.at(-1)?.name ?? null

    // Methods
    const methodDecl = code.match(
      /^\s*(?:(?:public|private|protected|static|final|abstract|synchronized|default|native|strictfp)\s+)*(?:<[^>]*>\s+)?(?:[\w.<>\[\]]+\s+)+([A-Za-z_]\w*)\s*\([^)]*\)\s*(?:throws\s+[\w., ]+\s*)?\s*(?:\{|;)/
    )
    let declaredMethod: string | null = null
    if (methodDecl && currentContainer !== null) {
      const name = methodDecl[1]
      if (!['if', 'while', 'for', 'switch', 'catch', 'return', 'new'].includes(name) && name !== currentContainer) {
        const isPublic = /\bpublic\b/.test(withoutComment)
        out.symbols.push({ name, kind: 'method', line: lineNo, endLine: lineNo, exported: isPublic, container: currentContainer })
        declaredMethod = name
      }
    }

    // Constants
    const fieldDecl = code.match(
      /^\s*(?:public|private|protected)\s+(?:static\s+)?(?:final\s+)?(?:[\w.<>\[\]]+\s+)([A-Z][A-Z_0-9]*)\s*=/
    )
    if (fieldDecl && currentContainer !== null) {
      out.symbols.push({ name: fieldDecl[1], kind: 'constant', line: lineNo, endLine: lineNo, exported: /\bpublic\b/.test(withoutComment), container: currentContainer })
    }

    const envJava = code.match(/System\.getenv\(\s*"([A-Z0-9_]+)"\s*\)/)
    if (envJava && envJava[1]) {
      out.symbols.push({ name: envJava[1], kind: 'constant', line: lineNo, endLine: lineNo, exported: true, container: currentContainer })
    }

    // Calls
    for (const hit of code.matchAll(/\b([A-Za-z_]\w*)(?:\.([A-Za-z_]\w*))?\s*\(/g)) {
      const receiver = hit[2] ? hit[1] : null
      const target = hit[2] ?? hit[1]
      if (['if', 'while', 'for', 'switch', 'catch', 'new', 'return', 'class', 'record', 'interface', 'enum'].includes(target)) continue
      if (target === declaredMethod) continue
      out.refs.push({ kind: 'calls', target, receiver, from: currentContainer, line: lineNo })
    }
  }
  return out
}

/**
 * Go extractor: packages, imports, func, type (struct/interface), var/const.
 * Regex-based, same approach as Python/Rust.
 */
function extractGo(content: string): FileExtract {
  const out = foreignBase(content)
  const lines = content.split('\n')
  let container: string | null = null

  for (let index = 0; index < lines.length; index += 1) {
    const lineNo = index + 1
    const line = lines[index].replace(/\/\/.*$/, '')

    // import block: import "pkg/path" or import ( "a" \n "b" )
    const singleImport = line.match(/^\s*import\s+"([^"]+)"/)
    if (singleImport) {
      const parts = singleImport[1].split('/')
      const local = parts[parts.length - 1]
      out.imports.push({ specifier: singleImport[1], bindings: [{ local, imported: '*' }], line: lineNo })
      continue
    }
    const aliasImport = line.match(/^\s*([A-Za-z_]\w*)\s+"([^"]+)"/)
    if (aliasImport) {
      out.imports.push({ specifier: aliasImport[2], bindings: [{ local: aliasImport[1], imported: '*' }], line: lineNo })
      continue
    }
    const bareImport = line.match(/^\s*"([^"]+)"/)
    if (bareImport) {
      const parts = bareImport[1].split('/')
      const local = parts[parts.length - 1]
      out.imports.push({ specifier: bareImport[1], bindings: [{ local, imported: '*' }], line: lineNo })
      continue
    }

    // func declaration
    const funcDecl = line.match(/^\s*func\s+(?:\([^)]+\)\s+)?([A-Za-z_]\w*)\s*\(/)
    if (funcDecl) {
      const name = funcDecl[1]
      const isExported = /^[A-Z]/.test(name)
      const kind: SymbolKind = container !== null ? 'method' : 'function'
      out.symbols.push({ name, kind, line: lineNo, endLine: lineNo, exported: isExported, container })
      continue
    }

    // type declaration
    const typeDecl = line.match(/^\s*type\s+([A-Za-z_]\w*)\s+(struct|interface)/)
    if (typeDecl) {
      const name = typeDecl[1]
      const kind: SymbolKind = typeDecl[2] === 'interface' ? 'interface' : 'class'
      out.symbols.push({ name, kind, line: lineNo, endLine: lineNo, exported: /^[A-Z]/.test(name), container: null })
      container = name
      continue
    }

    // const / var at package level
    const constDecl = line.match(/^\s*(?:const|var)\s+([A-Za-z_]\w*)\s*=/)
    if (constDecl) {
      const name = constDecl[1]
      out.symbols.push({ name, kind: 'constant', line: lineNo, endLine: lineNo, exported: /^[A-Z]/.test(name), container: null })
      continue
    }

    // Calls: Receiver.Method(...) or Method(...)
    for (const hit of line.matchAll(/\b([A-Za-z_]\w*)(?:\.([A-Za-z_]\w*))?\s*\(/g)) {
      const receiver = hit[2] ? hit[1] : null
      const target = hit[2] ?? hit[1]
      if (['if', 'for', 'switch', 'select', 'go', 'defer', 'func', 'return', 'type'].includes(target)) continue
      out.refs.push({ kind: 'calls', target, receiver, from: container, line: lineNo })
    }
  }
  return out
}

function scriptKindOf(ext: string): ts.ScriptKind {
  switch (ext.toLowerCase()) {
    case '.tsx': return ts.ScriptKind.TSX
    case '.jsx': return ts.ScriptKind.JSX
    case '.js': case '.mjs': case '.cjs': return ts.ScriptKind.JS
    default: return ts.ScriptKind.TS
  }
}

const hasExport = (node: ts.Node): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node) ?? []).some(m =>
    m.kind === ts.SyntaxKind.ExportKeyword || m.kind === ts.SyntaxKind.DefaultKeyword)

/** `ns.Foo` -> `Foo`; a bare name is returned unchanged. */
function bareName(text: string): string {
  const dot = text.lastIndexOf('.')
  return dot === -1 ? text : text.slice(dot + 1)
}

/** `ns.Foo` -> `ns`; `null` when the name is not qualified. */
function qualifierOf(text: string): string | null {
  const dot = text.lastIndexOf('.')
  return dot === -1 ? null : text.slice(0, dot)
}

/** Every local name an `import` clause introduces, with its exported name. */
function importClauseBindings(clause: ts.ImportClause | undefined): ImportBinding[] {
  const bindings: ImportBinding[] = []
  if (clause === undefined) return bindings          // side-effect-only import
  if (clause.name) bindings.push({ local: clause.name.text, imported: 'default' })
  const named = clause.namedBindings
  if (named === undefined) return bindings
  if (ts.isNamespaceImport(named)) {
    bindings.push({ local: named.name.text, imported: '*' })
    return bindings
  }
  for (const element of named.elements) {
    bindings.push({
      local: element.name.text,
      imported: element.propertyName?.text ?? element.name.text,
    })
  }
  return bindings
}

/**
 * `const x = require('m')` / `const { a: b } = require('m')`.
 * The binding lives on the enclosing variable declaration, so walk up to it.
 */
function requireBindings(call: ts.CallExpression): ImportBinding[] {
  const declaration = call.parent
  if (declaration === undefined || !ts.isVariableDeclaration(declaration)) return []
  if (ts.isIdentifier(declaration.name)) {
    return [{ local: declaration.name.text, imported: '*' }]
  }
  if (ts.isObjectBindingPattern(declaration.name)) {
    const bindings: ImportBinding[] = []
    for (const element of declaration.name.elements) {
      if (!ts.isIdentifier(element.name)) continue
      const imported = element.propertyName !== undefined && ts.isIdentifier(element.propertyName)
        ? element.propertyName.text
        : element.name.text
      bindings.push({ local: element.name.text, imported })
    }
    return bindings
  }
  return []
}

/**
 * Parse one file and pull out everything the graph needs.
 * Throws nothing: an unparseable file yields empty results, because one bad
 * file must never abort a workspace index.
 */
export function extractFromSource(path: string, content: string, ext: string): FileExtract {
  const foreign = foreignExtract(path, content, ext)
  if (foreign !== null) return foreign
  const out: FileExtract = { symbols: [], refs: [], imports: [], loc: 0 }
  out.loc = content.length === 0 ? 0 : content.split('\n').length

  let source: ts.SourceFile
  try {
    source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true, scriptKindOf(ext))
  } catch {
    return out
  }

  const lineOf = (pos: number): number => {
    try { return source.getLineAndCharacterOfPosition(pos).line + 1 } catch { return 1 }
  }

  // The symbol we are currently inside, so a call edge knows its origin.
  const containerStack: string[] = []
  const currentContainer = (): string | null =>
    containerStack.length > 0 ? containerStack[containerStack.length - 1] : null

  const push = (name: string, kind: SymbolKind, node: ts.Node, exported: boolean) => {
    if (!name) return
    out.symbols.push({
      name,
      kind,
      line: lineOf(node.getStart(source)),
      endLine: lineOf(node.getEnd()),
      exported,
      container: currentContainer(),
    })
  }

  const visit = (node: ts.Node): void => {
    // ── imports ──────────────────────────────────────────────────────────
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      out.imports.push({
        specifier: node.moduleSpecifier.text,
        bindings: importClauseBindings(node.importClause),
        line: lineOf(node.getStart(source)),
      })
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      // `export { a as b } from 'x'` re-exports: the local name is what other
      // files in this workspace will import from HERE, so it binds locally too.
      const bindings: ImportBinding[] = []
      const clause = node.exportClause
      if (clause && ts.isNamedExports(clause)) {
        for (const element of clause.elements) {
          bindings.push({
            local: element.name.text,
            imported: element.propertyName?.text ?? element.name.text,
          })
        }
      } else if (clause && ts.isNamespaceExport(clause)) {
        bindings.push({ local: clause.name.text, imported: '*' })
      } else {
        bindings.push({ local: '*', imported: '*' })   // `export * from 'x'`
      }
      out.imports.push({ specifier: node.moduleSpecifier.text, bindings, line: lineOf(node.getStart(source)) })
    }
    // require('x') and dynamic import('x')
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      const isRequire = ts.isIdentifier(callee) && callee.text === 'require'
      const isDynamicImport = callee.kind === ts.SyntaxKind.ImportKeyword
      const first = node.arguments[0]
      if ((isRequire || isDynamicImport) && first && ts.isStringLiteral(first)) {
        // `const { a } = require('x')` / `const ns = require('x')`: the binding
        // lives on the enclosing variable declaration, not on the call.
        out.imports.push({
          specifier: first.text,
          bindings: requireBindings(node),
          line: lineOf(node.getStart(source)),
        })
      }
    }

    // ── declarations ─────────────────────────────────────────────────────
    let pushedContainer = false

    if (ts.isClassDeclaration(node) && node.name) {
      push(node.name.text, 'class', node, hasExport(node))
      // extends / implements are real graph edges, not decoration
      for (const clause of node.heritageClauses ?? []) {
        const kind: EdgeKind = clause.token === ts.SyntaxKind.ExtendsKeyword ? 'extends' : 'implements'
        for (const t of clause.types) {
          const text = t.expression.getText(source)
          if (text) out.refs.push({ kind, target: bareName(text), receiver: qualifierOf(text), from: node.name.text, line: lineOf(t.getStart(source)) })
        }
      }
      containerStack.push(node.name.text); pushedContainer = true
    } else if (ts.isInterfaceDeclaration(node)) {
      push(node.name.text, 'interface', node, hasExport(node))
      for (const clause of node.heritageClauses ?? []) {
        for (const t of clause.types) {
          const text = t.expression.getText(source)
          if (text) out.refs.push({ kind: 'extends', target: bareName(text), receiver: qualifierOf(text), from: node.name.text, line: lineOf(t.getStart(source)) })
        }
      }
      containerStack.push(node.name.text); pushedContainer = true
    } else if (ts.isTypeAliasDeclaration(node)) {
      push(node.name.text, 'type_alias', node, hasExport(node))
    } else if (ts.isEnumDeclaration(node)) {
      push(node.name.text, 'enum', node, hasExport(node))
      for (const member of node.members) {
        const n = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name) ? member.name.text : null
        if (n) push(n, 'enum_member', member, false)
      }
    } else if (ts.isFunctionDeclaration(node) && node.name) {
      push(node.name.text, 'function', node, hasExport(node))
      containerStack.push(node.name.text); pushedContainer = true
    } else if (ts.isMethodDeclaration(node) || ts.isMethodSignature(node)) {
      const n = ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : null
      if (n) { push(n, 'method', node, false); containerStack.push(n); pushedContainer = true }
    } else if (ts.isPropertyDeclaration(node) || ts.isPropertySignature(node)) {
      const n = ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : null
      if (n) push(n, 'property', node, false)
    } else if (ts.isVariableStatement(node)) {
      const exported = hasExport(node)
      const isConst = (node.declarationList.flags & ts.NodeFlags.Const) !== 0
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue
        const name = decl.name.text
        const init = decl.initializer
        // An arrow function or function expression assigned to a const is a
        // function to every reader, so index it as one.
        const isFn = init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
        push(name, isFn ? 'function' : isConst ? 'constant' : 'variable', decl, exported)
        if (isFn) { containerStack.push(name); pushedContainer = true }
      }
    } else if (ts.isPropertyAccessExpression(node)) {
      const expr = node.expression
      if (ts.isPropertyAccessExpression(expr) &&
          ts.isIdentifier(expr.expression) && expr.expression.text === 'process' &&
          expr.name.text === 'env') {
        const envName = node.name.text
        if (envName && /^[A-Z0-9_]+$/.test(envName)) {
          push(envName, 'constant', node, true)
        }
      }
    } else if (ts.isElementAccessExpression(node)) {
      const expr = node.expression
      if (ts.isPropertyAccessExpression(expr) &&
          ts.isIdentifier(expr.expression) && expr.expression.text === 'process' &&
          expr.name.text === 'env' &&
          node.argumentExpression && ts.isStringLiteral(node.argumentExpression)) {
        const envName = node.argumentExpression.text
        if (envName && /^[A-Z0-9_]+$/.test(envName)) {
          push(envName, 'constant', node, true)
        }
      }
    }

    // ── calls ────────────────────────────────────────────────────────────
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      let target: string | null = null
      let receiver: string | null = null
      if (ts.isIdentifier(callee)) {
        target = callee.text
      } else if (ts.isPropertyAccessExpression(callee)) {
        target = callee.name.text
        // Keep the receiver EXACTLY as written. `a.b.c()` has receiver `a.b`;
        // the resolver reduces it to a binding root itself rather than the
        // parser inventing a normalisation the resolver cannot undo.
        receiver = callee.expression.getText(source)
      }
      if (target && target !== 'require') {
        out.refs.push({ kind: 'calls', target, receiver, from: currentContainer(), line: lineOf(node.getStart(source)) })
      }
    }
    // `new Foo()` is a reference to Foo
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression)) {
      out.refs.push({ kind: 'references', target: node.expression.text, receiver: null, from: currentContainer(), line: lineOf(node.getStart(source)) })
    }
    if (ts.isNewExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      out.refs.push({
        kind: 'references',
        target: node.expression.name.text,
        receiver: node.expression.expression.getText(source),
        from: currentContainer(),
        line: lineOf(node.getStart(source)),
      })
    }

    ts.forEachChild(node, visit)
    if (pushedContainer) containerStack.pop()
  }

  try { ts.forEachChild(source, visit) } catch { /* keep whatever we got */ }
  return out
}
