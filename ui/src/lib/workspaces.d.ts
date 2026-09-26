/**
 * Types for the plain-JS UI module `ui/src/lib/workspaces.js`.
 *
 * The root typecheck keeps allowJs off, so this sibling declaration gives the
 * test import its names without pulling the DOM-touching body into the
 * Node-side program. Mirrors the JSDoc and exports of the .js file.
 */

/** The result of a finished index run, as the progress route reports it. */
export interface IndexRunResult {
  files: number
  symbols: number
  edges: number
  ms: number
}

/** What `/api/index/progress` answers, as far as the UI reads it. */
export interface IndexReport {
  running: boolean
  stale: boolean
  quiet: boolean
  ownerAlive: boolean
  recoverable: boolean
  finished: boolean
  summary: string
  run: null | {
    phase: string
    mode: string
    processed: number
    total: number
    scanned: number
    startedAt: string
    finishedAt: string | null
    ok: boolean | null
    error: string | null
    result: null | IndexRunResult
  }
}

/** One planet of the galaxy route: the durable identity the UI lists. */
export interface GalaxyPlanet {
  id: string
  name: string
  root: string
  indexedAt: string | null
}

/**
 * The narrow view describeProgress and nextDaemonProgress actually read.
 *
 * Callers keep their own richer report types; both functions only look at
 * the flags and the run's phase and timestamps, so this stays honest without
 * forcing a shape the caller must know about.
 */
export interface ProgressView {
  running?: boolean
  stale?: boolean
  quiet?: boolean
  ownerAlive?: boolean
  recoverable?: boolean
  finished?: boolean
  summary?: string
  run?: {
    phase: string
    startedAt: string
    finishedAt: string | null
    ok: boolean | null
    mode?: string
    processed?: number
    total?: number
    scanned?: number
    error?: string | null
    result?: unknown
  } | null
}

export function lastWorkspace(): string
export function rememberWorkspace(id: string): void
export function galaxy(): Promise<GalaxyPlanet[]>
export function normalizeWorkspaceRoot(root: string): string
/** Return a registered workspace id for an exact normalized root, or empty. */
export function workspaceIdForRoot(
  planets: Array<{ id?: string; root?: string }>,
  requestedRoot: string,
): string
/** Make a folder a vault and give it a first index; returns the workspace id. */
export function openVault(
  root: string,
  name?: string,
  onProgress?: (report: IndexReport) => void,
): Promise<string>
/** One progress line a person can read while the brain works. */
export function describeProgress(report: ProgressView): string
/** The next progress line for the daemon panel, or empty when nothing changed. */
export function nextDaemonProgress(report: ProgressView, current: string): string
export function indexProgress(id: string): Promise<IndexReport | null>
/** Watch a started run until it ends; resolves to the run's result. */
export function watchIndexRun(
  id: string,
  onProgress?: (report: IndexReport) => void,
): Promise<IndexRunResult | null>
/** Start an index run and, if the daemon took it, follow it to the end. */
export function reindexWorkspace(
  id: string,
  onProgress?: (report: IndexReport) => void,
): Promise<IndexRunResult | null>
