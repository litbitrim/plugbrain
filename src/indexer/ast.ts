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
  /** Enclosing symbol name, so a call edge starts at the right node. */
  from: string | null
  line: number
}

export interface ExtractedImport {
  /** Raw module specifier exactly as written. */
  specifier: string
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
    default: return null
  }
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

/**
 * Parse one file and pull out everything the graph needs.
 * Throws nothing: an unparseable file yields empty results, because one bad
 * file must never abort a workspace index.
 */
export function extractFromSource(path: string, content: string, ext: string): FileExtract {
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
      out.imports.push({ specifier: node.moduleSpecifier.text, line: lineOf(node.getStart(source)) })
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      out.imports.push({ specifier: node.moduleSpecifier.text, line: lineOf(node.getStart(source)) })
    }
    // require('x') and dynamic import('x')
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      const isRequire = ts.isIdentifier(callee) && callee.text === 'require'
      const isDynamicImport = callee.kind === ts.SyntaxKind.ImportKeyword
      const first = node.arguments[0]
      if ((isRequire || isDynamicImport) && first && ts.isStringLiteral(first)) {
        out.imports.push({ specifier: first.text, line: lineOf(node.getStart(source)) })
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
          if (text) out.refs.push({ kind, target: text, from: node.name.text, line: lineOf(t.getStart(source)) })
        }
      }
      containerStack.push(node.name.text); pushedContainer = true
    } else if (ts.isInterfaceDeclaration(node)) {
      push(node.name.text, 'interface', node, hasExport(node))
      for (const clause of node.heritageClauses ?? []) {
        for (const t of clause.types) {
          const text = t.expression.getText(source)
          if (text) out.refs.push({ kind: 'extends', target: text, from: node.name.text, line: lineOf(t.getStart(source)) })
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
    }

    // ── calls ────────────────────────────────────────────────────────────
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      let target: string | null = null
      if (ts.isIdentifier(callee)) target = callee.text
      else if (ts.isPropertyAccessExpression(callee)) target = callee.name.text
      if (target && target !== 'require') {
        out.refs.push({ kind: 'calls', target, from: currentContainer(), line: lineOf(node.getStart(source)) })
      }
    }
    // `new Foo()` is a reference to Foo
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression)) {
      out.refs.push({ kind: 'references', target: node.expression.text, from: currentContainer(), line: lineOf(node.getStart(source)) })
    }

    ts.forEachChild(node, visit)
    if (pushedContainer) containerStack.pop()
  }

  try { ts.forEachChild(source, visit) } catch { /* keep whatever we got */ }
  return out
}
