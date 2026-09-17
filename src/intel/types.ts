/**
 * Types and contracts for Code Intelligence (M3: GitNexus Parity).
 */

export interface IntelSymbol {
  id: number
  name: string
  kind: string
  file: string
  line: number
  endLine: number | null
  exported: boolean
  container: string | null
  repoId: string | null
  checkoutId: string | null
  isVendor?: boolean
  vendorReason?: string
}

export interface SymbolCall {
  id?: number | null
  name: string
  kind: string
  file: string
  line: number
  rawTarget?: string | null
  isVendor?: boolean
  vendorReason?: string
}

export interface ExecutionFlow {
  id: string
  label: string
  processType: 'intra_community' | 'cross_community'
  stepCount: number
  steps: Array<{
    step: number
    symbolName: string
    file: string
    kind: string
  }>
}

export interface SymbolContextResult {
  status: 'found' | 'not_found' | 'ambiguous'
  candidates?: IntelSymbol[]
  symbol: IntelSymbol | null
  incoming: {
    calls: SymbolCall[]
    references: SymbolCall[]
  }
  outgoing: {
    calls: SymbolCall[]
    references: SymbolCall[]
  }
  processes: ExecutionFlow[]
}

export interface ImpactNode {
  depth: number
  id: number
  name: string
  kind: string
  file: string
  repoId: string | null
  checkoutId: string | null
  relationType: string
  confidence: number
}

export interface BlastRadiusResult {
  target: {
    name: string
    file?: string
    id?: number
  }
  direction: 'upstream' | 'downstream' | 'both'
  maxDepth: number
  totalImpacted: number
  nodes: Record<number, ImpactNode[]>
  risk: 'low' | 'medium' | 'high'
}

export interface ConceptSearchResult {
  query: string
  symbols: IntelSymbol[]
  notes: Array<{
    path: string
    title: string
    snippet: string | null
  }>
  flows: ExecutionFlow[]
  total: number
  timingMs: number
}

export interface DiffSymbolChange {
  symbolId: number
  name: string
  kind: string
  file: string
  line: number
  changeType: 'modified' | 'added' | 'deleted'
}

export interface DetectChangesResult {
  checkoutId: string | null
  repoId: string | null
  changedFiles: number
  changedSymbols: DiffSymbolChange[]
  affectedFlows: Array<{
    flow: string
    affectedBy: string[]
  }>
  riskLevel: 'low' | 'medium' | 'high'
}

export interface CypherQueryResult {
  columns: string[]
  rows: Array<Record<string, unknown>>
  markdown: string
  rowCount: number
  timingMs: number
}

export interface IntelStatusResult {
  planetId: string
  workspaceId: string
  repos: number
  checkouts: number
  files: number
  symbols: number
  edges: number
  dirtyCheckouts: number
  staleness: {
    isStale: boolean
    dirtyFiles: number
    untrackedFiles: number
  }
}
