/**
 * Hardware awareness — the public surface of the machine lane.
 *
 * Same split as the git guard: `collectMachine` measures, `gitCensus` walks, and
 * the findings layer turns both into sentences. `machineReport` is what every
 * surface actually wants — measurement, census and opinion in one call.
 */
import type { DatabaseSync } from 'node:sqlite'
import { collectMachine, type MachineOptions, type MachineReport } from './collect.ts'
import { gitCensus, type CensusOptions, type CensusReport } from './git-census.ts'
import { withMachineFindings } from './findings.ts'

export * from './collect.ts'
export { withMachineFindings } from './findings.ts'
export * from './git-census.ts'

/** Measure the host, walk the census, and judge both in one call. */
export function machineReport(
  db: DatabaseSync,
  options: MachineOptions & CensusOptions = {},
): MachineReport {
  const report = collectMachine(db, options)
  const census = gitCensus(db, options)
  return withMachineFindings(report, census)
}
