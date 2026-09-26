/**
 * Structured Graph Query Engine (Cypher & JSON-DSL).
 *
 * Requirement M3 §71:
 * "strukturierte Graph-Abfrage (Cypher-artig oder ein dokumentiertes JSON-DSL)"
 */
import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import type { CypherQueryResult } from './types.ts'

export interface JsonGraphQuery {
  match?: {
    source?: {
      type: string
      alias?: string
      where?: Record<string, unknown>
    }
    relation?: string
    direction?: 'out' | 'in' | 'both'
    target?: {
      type: string
      alias?: string
      where?: Record<string, unknown>
    }
  }
  where?: Record<string, unknown> | string
  return?: string[] | string
  limit?: number
  orderBy?: string
}

function formatMarkdownTable(columns: string[], rows: Array<Record<string, unknown>>): string {
  if (columns.length === 0) return ''
  const header = `| ${columns.join(' | ')} |`
  const separator = `| ${columns.map(() => '---').join(' | ')} |`
  const dataRows = rows.map(
    row => `| ${columns.map(c => String(row[c] ?? '')).join(' | ')} |`
  )
  return [header, separator, ...dataRows].join('\n')
}

/**
 * Translates and executes a Cypher or JSON-DSL graph query against the SQLite database.
 */
export function executeCypherQuery(
  db: DatabaseSync,
  queryOrDsl: string | JsonGraphQuery,
  options?: { limit?: number; workspaceId?: string }
): CypherQueryResult {
  const start = performance.now()

  // Handle JSON-DSL if passed as object or JSON string
  if (typeof queryOrDsl === 'object' || (typeof queryOrDsl === 'string' && queryOrDsl.trim().startsWith('{'))) {
    const dsl: JsonGraphQuery = typeof queryOrDsl === 'object'
      ? queryOrDsl
      : (JSON.parse(queryOrDsl) as JsonGraphQuery)
    return executeJsonDsl(db, dsl, start, options?.limit, options?.workspaceId)
  }

  // Parse Cypher query string
  const cypher = queryOrDsl.trim()
  return executeCypherString(db, cypher, start, options?.limit, options?.workspaceId)
}

function executeCypherString(
  db: DatabaseSync,
  cypher: string,
  start: number,
  overrideLimit?: number,
  workspaceId?: string,
): CypherQueryResult {
  const defaultLimit = overrideLimit ?? 50
  let sql = ''
  let columns: string[] = []

  // Extract LIMIT if present
  let limit = defaultLimit
  const limitMatch = cypher.match(/\bLIMIT\s+(\d+)\b/i)
  if (limitMatch) {
    limit = parseInt(limitMatch[1], 10)
  }

  // Extract RETURN clause
  const returnMatch = cypher.match(/\bRETURN\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/i)
  const returnClause = returnMatch ? returnMatch[1].trim() : '*'

  // Extract WHERE clause
  const whereMatch = cypher.match(/\bWHERE\s+(.+?)(?:\s+RETURN|\s+ORDER\s+BY|\s+LIMIT|$)/i)
  const whereClause = whereMatch ? whereMatch[1].trim() : ''

  // Pattern 1: Edge traversal (a)-[:REL]->(b) or (a)<-[:REL]-(b)
  const edgeMatch = cypher.match(
    /\(([\w]+)(?::([\w]+))?(?:\s*\{([^}]+)\})?\)\s*-\s*\[:?([\w]+)?\]\s*->\s*\(([\w]+)(?::([\w]+))?(?:\s*\{([^}]+)\})?\)/i
  )

  const reverseEdgeMatch = !edgeMatch && cypher.match(
    /\(([\w]+)(?::([\w]+))?(?:\s*\{([^}]+)\})?\)\s*<-\s*\[:?([\w]+)?\]\s*-\s*\(([\w]+)(?::([\w]+))?(?:\s*\{([^}]+)\})?\)/i
  )

  if (edgeMatch || reverseEdgeMatch) {
    const m = edgeMatch || reverseEdgeMatch!
    const isReverse = Boolean(reverseEdgeMatch)
    const srcAlias = isReverse ? m[5] : m[1]
    const srcType = (isReverse ? m[6] : m[2]) ?? 'Symbol'
    const relType = (m[4] ?? 'CALLS').toUpperCase()
    const dstAlias = isReverse ? m[1] : m[5]
    const dstType = (isReverse ? m[2] : m[6]) ?? 'Symbol'

    if (relType === 'CONTAINS') {
      sql = `
        SELECT f.path as "${srcAlias}.path", s.name as "${dstAlias}.name", s.kind as "${dstAlias}.kind"
          FROM files f
          JOIN symbols s ON s.file_id = f.id
      `
      columns = [`${srcAlias}.path`, `${dstAlias}.name`, `${dstAlias}.kind`]
    } else if (relType === 'LINKS_TO') {
      sql = `
        SELECT f1.path as "${srcAlias}.path", nl.target as "${dstAlias}.path"
          FROM note_links nl
          JOIN files f1 ON nl.file_id = f1.id
      `
      columns = [`${srcAlias}.path`, `${dstAlias}.path`]
    } else {
      // Default: CALLS or REFERENCES
      const kindFilter = relType === 'REFERENCES' ? "('references', 'imports')" : "('calls')"
      sql = `
        SELECT src.name as "${srcAlias}.name", src.kind as "${srcAlias}.kind",
               dst.name as "${dstAlias}.name", dst.kind as "${dstAlias}.kind",
               e.kind as relation
          FROM edges e
          JOIN symbols src ON e.src_symbol = src.id
          JOIN symbols dst ON e.dst_symbol = dst.id
         WHERE e.kind IN ${kindFilter}
      `
      columns = [`${srcAlias}.name`, `${dstAlias}.name`]
    }
  } else {
    // Pattern 2: Single node match (n:Label) or (n:Label {prop: 'val'})
    const nodeMatch = cypher.match(/\(([\w]+)(?::([\w]+))?(?:\s*\{([^}]+)\})?\)/i)
    const alias = nodeMatch ? nodeMatch[1] : 'n'
    const label = nodeMatch && nodeMatch[2] ? nodeMatch[2].toLowerCase() : 'symbol'
    const props = nodeMatch && nodeMatch[3] ? nodeMatch[3] : ''

    if (label === 'file') {
      sql = `SELECT f.path as "${alias}.path", f.size as "${alias}.size", f.loc as "${alias}.loc" FROM files f WHERE 1=1`
      columns = [`${alias}.path`]
    } else if (label === 'note') {
      sql = `SELECT f.path as "${alias}.path", nb.text as "${alias}.text" FROM files f JOIN note_body nb ON f.id = nb.file_id WHERE 1=1`
      columns = [`${alias}.path`]
    } else if (label === 'repo') {
      sql = `SELECT r.name as "${alias}.name", r.remote_url as "${alias}.remote_url" FROM repos r WHERE 1=1`
      columns = [`${alias}.name`]
    } else {
      // Symbol or specific symbol kind (Function, Class, Interface, Method, etc.)
      const kindFilter =
        ['function', 'class', 'interface', 'method', 'typealias', 'variable'].includes(label)
          ? ` AND LOWER(s.kind) = '${label}'`
          : ''
      sql = `
        SELECT s.name as "${alias}.name", s.kind as "${alias}.kind",
               f.path as "${alias}.filePath", s.line as "${alias}.startLine", s.end_line as "${alias}.endLine"
          FROM symbols s
          JOIN files f ON s.file_id = f.id
         WHERE 1=1${kindFilter}
      `
      columns = [`${alias}.name`, `${alias}.kind`, `${alias}.filePath`]
    }

    if (props) {
      const propPairs = props.split(',').map(p => p.trim())
      for (const pair of propPairs) {
        const [k, v] = pair.split(':').map(x => x.trim().replace(/^['"]|['"]$/g, ''))
        if (k === 'name') {
          sql += ` AND s.name = '${v.replace(/'/g, "''")}'`
        } else if (k === 'file' || k === 'path' || k === 'filePath') {
          sql += ` AND f.path LIKE '%${v.replace(/'/g, "''")}%'`
        }
      }
    }
  }

  // Apply WHERE conditions if present
  if (whereClause) {
    const translatedWhere = whereClause
      .replace(/\b(\w+)\.filePath\b/g, 'f.path')
      .replace(/\b(\w+)\.path\b/g, 'f.path')
      .replace(/\b(\w+)\.name\b/g, 's.name')
      .replace(/\b(\w+)\.kind\b/g, 's.kind')
      .replace(/\b(\w+)\.line\b/g, 's.line')
      .replace(/\b(\w+)\.exported\b/g, 's.exported')
    sql += ` AND (${translatedWhere})`
  }

  // Scope before wrapping a count query: the aliases live inside its subquery.
  const scoped = scopeSql(sql, workspaceId)
  sql = scoped.sql

  // Handle custom RETURN projection if simple
  if (returnClause.toLowerCase().includes('count(')) {
    sql = `SELECT count(*) as count FROM (${sql})`
    columns = ['count']
  } else if (returnClause !== '*' && !returnClause.includes(',')) {
    columns = [returnClause]
  }

  sql += ` LIMIT ${limit}`

  let rows: Array<Record<string, unknown>> = []
  try {
    rows = db.prepare(sql).all(...scoped.params) as Array<Record<string, unknown>>
    if (rows.length > 0 && columns.length === 0) {
      columns = Object.keys(rows[0])
    }
  } catch (err) {
    // If SQL fails, return honest error
    return {
      columns: ['error'],
      rows: [{ error: String(err) }],
      markdown: `| error |\n| --- |\n| ${String(err).replace(/\|/g, '\\|')} |`,
      rowCount: 0,
      timingMs: Math.round((performance.now() - start) * 10) / 10,
    }
  }

  const markdown = formatMarkdownTable(columns, rows)
  return {
    columns,
    rows,
    markdown,
    rowCount: rows.length,
    timingMs: Math.round((performance.now() - start) * 10) / 10,
  }
}

function executeJsonDsl(
  db: DatabaseSync,
  dsl: JsonGraphQuery,
  start: number,
  overrideLimit?: number,
  workspaceId?: string,
): CypherQueryResult {
  const limit = overrideLimit ?? dsl.limit ?? 50
  const match = dsl.match
  let sql = ''
  let columns: string[] = []

  if (match?.source && match?.target) {
    const rel = (match.relation ?? 'CALLS').toUpperCase()
    const kindFilter = rel === 'REFERENCES' ? "('references', 'imports')" : "('calls')"
    sql = `
      SELECT src.name as source_name, src.kind as source_kind,
             dst.name as target_name, dst.kind as target_kind,
             e.kind as relation
        FROM edges e
        JOIN symbols src ON e.src_symbol = src.id
        JOIN symbols dst ON e.dst_symbol = dst.id
       WHERE e.kind IN ${kindFilter}
    `
    columns = ['source_name', 'target_name', 'relation']
    if (match.source.where?.name) {
      sql += ` AND src.name = '${String(match.source.where.name).replace(/'/g, "''")}'`
    }
    if (match.target.where?.name) {
      sql += ` AND dst.name = '${String(match.target.where.name).replace(/'/g, "''")}'`
    }
  } else {
    sql = `
      SELECT s.name, s.kind, f.path as file, s.line
        FROM symbols s
        JOIN files f ON s.file_id = f.id
       WHERE 1=1
    `
    columns = ['name', 'kind', 'file', 'line']
    if (dsl.where && typeof dsl.where === 'object') {
      for (const [k, v] of Object.entries(dsl.where)) {
        if (k === 'name') sql += ` AND s.name = '${String(v).replace(/'/g, "''")}'`
        if (k === 'kind') sql += ` AND LOWER(s.kind) = LOWER('${String(v).replace(/'/g, "''")}')`
        if (k === 'file') sql += ` AND f.path LIKE '%${String(v).replace(/'/g, "''")}%'`
      }
    }
  }

  const scoped = scopeSql(sql, workspaceId)
  sql = scoped.sql + ` LIMIT ${limit}`

  let rows: Array<Record<string, unknown>> = []
  try {
    rows = db.prepare(sql).all(...scoped.params) as Array<Record<string, unknown>>
    if (rows.length > 0 && columns.length === 0) {
      columns = Object.keys(rows[0])
    }
  } catch (err) {
    return {
      columns: ['error'],
      rows: [{ error: String(err) }],
      markdown: `| error |\n| --- |\n| ${String(err)} |`,
      rowCount: 0,
      timingMs: Math.round((performance.now() - start) * 10) / 10,
    }
  }

  const markdown = formatMarkdownTable(columns, rows)
  return {
    columns,
    rows,
    markdown,
    rowCount: rows.length,
    timingMs: Math.round((performance.now() - start) * 10) / 10,
  }
}

/** Every generated query anchors its rows in one of these workspace-aware aliases. */
function scopeSql(sql: string, workspaceId?: string): { sql: string; params: SQLInputValue[] } {
  if (!workspaceId) return { sql, params: [] }
  if (/\bFROM repos r\b/i.test(sql)) {
    return { sql: `${sql} AND r.planet_id IN (SELECT id FROM planets WHERE workspace_id = ?)`, params: [workspaceId] }
  }
  if (/\bFROM note_links nl\b/i.test(sql)) {
    return { sql: `${sql} AND f1.workspace_id = ?`, params: [workspaceId] }
  }
  if (/\bFROM edges e\b/i.test(sql)) {
    return { sql: `${sql} AND e.workspace_id = ?`, params: [workspaceId] }
  }
  return { sql: `${sql} AND f.workspace_id = ?`, params: [workspaceId] }
}
