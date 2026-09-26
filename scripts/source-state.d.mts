/**
 * Types for the plain-JS helper `scripts/source-state.mjs`.
 *
 * The root typecheck keeps allowJs off, so this sibling declaration gives the
 * test import its names without pulling the JS body into the program.
 * Mirrors the exports of the .mjs file exactly.
 */

/** One durable snapshot of the working tree the packager compares against. */
export interface SourceState {
  /** The commit the snapshot was taken on. */
  head: string
  /** Whether any non-release working-tree entry is modified or untracked. */
  dirty: boolean
  /** How many entries made the tree look dirty. */
  dirtyEntryCount: number
  /** A stable fingerprint of the porcelain output for exact comparisons. */
  dirtyPorcelainSha256: string
  /** The pathspec that keeps generated release output out of the predicate. */
  generatedOutputExcluded: string
}

export function captureSourceState(root: string): SourceState
