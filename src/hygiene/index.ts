/**
 * Git-Chaos-Schutz — the public surface of the hygiene lane.
 *
 * Two layers, deliberately separate: `collectHygiene` reads facts and never
 * decides anything, `withFindings` turns facts into sentences. Keeping them
 * apart means the API can be tested without a filesystem and the collector
 * without opinions.
 */
import type { DatabaseSync } from 'node:sqlite'
import { collectHygiene, type CollectOptions, type HygieneReport } from './collect.ts'
import { withFindings } from './findings.ts'

export * from './collect.ts'
export { withFindings } from './findings.ts'
export {
  createWipSnapshots, snapshotRepo, type WipSnapshotEntry, type WipSnapshotResult,
} from './snapshot.ts'

/** Collect and judge in one call — what every surface actually wants. */
export function hygieneReport(
  db: DatabaseSync,
  workspaceId: string,
  options: CollectOptions = {},
): HygieneReport {
  return withFindings(collectHygiene(db, workspaceId, options))
}
