/**
 * Hardware awareness, step 3: the sentences a human acts on.
 *
 * The machine report and the git census are facts; this module is the opinion.
 * It turns them into the four things the owner asked to see coming — a disk
 * that will be full in hours, a pagefile eating the RAM it was meant to back,
 * unsaved work outside the brain, and dangling worktrees — each with the exact
 * command that fixes it. Nothing here deletes, prunes or pushes.
 */
import type { MachineFinding, MachineLevel, MachineReport } from './collect.ts'
import { FORECAST_RISK_HOURS } from './collect.ts'
import type { CensusReport } from './git-census.ts'

const RANK: Record<MachineLevel, number> = { ok: 0, attention: 1, risk: 2 }

const plural = (n: number, one: string, many: string): string => (n === 1 ? one : many)

/** How close a falling disk must be to empty before we say so. */
const FORECAST_ATTENTION_HOURS = 24

function forecastFindings(report: MachineReport): MachineFinding[] {
  const findings: MachineFinding[] = []
  for (const forecast of report.forecast) {
    if (forecast.fullInHours === null) continue
    if (forecast.fullInHours > FORECAST_ATTENTION_HOURS) continue
    const hours = forecast.fullInHours
    const level: MachineLevel = hours <= FORECAST_RISK_HOURS ? 'risk' : 'attention'
    const when = hours < 1 ? 'less than an hour' : `about ${Math.round(hours)} ${plural(Math.round(hours), 'hour', 'hours')}`
    findings.push({
      level,
      text: `${forecast.mount} will be full in ${when} at the current rate `
        + `(${forecast.trendGbPerHour} GB per hour, ${forecast.basis}).`,
      fix: `free space on ${forecast.mount}; PlugBrain deletes nothing on its own`,
      paths: [forecast.mount],
    })
  }
  return findings
}

function driveFindings(report: MachineReport): MachineFinding[] {
  const findings: MachineFinding[] = []
  for (const drive of report.drives) {
    if (drive.level === 'ok') continue
    findings.push({
      level: drive.level,
      text: `Only ${drive.freeGb} GB free of ${drive.totalGb} GB on ${drive.mount}.`,
      fix: `free space on ${drive.mount}; PlugBrain deletes nothing on its own`,
      paths: [drive.mount],
    })
  }
  return findings
}

/**
 * A pagefile larger than half the installed RAM is the 25.09. signature: the
 * machine was so short on memory that Windows pushed tens of GB to disk, which
 * in turn ate the disk. Reported as attention, never as a fix on its own,
 * because the pagefile is a symptom of RAM pressure.
 */
function pagefileFindings(report: MachineReport): MachineFinding[] {
  const size = report.pagefile.sizeGb
  const total = report.memory.totalGb
  if (size === null || total === null || total <= 0 || size <= total * 0.5) return []
  return [{
    level: 'attention',
    text: `The pagefile is ${size} GB on a ${total} GB machine — RAM pressure is spilling to disk.`,
    fix: 'close heavy apps or add RAM; PlugBrain deletes nothing on its own',
    paths: [],
  }]
}

function outsideBrainFindings(census: CensusReport): MachineFinding[] {
  const outside = census.repos.filter(repo => !repo.registered)
  const unsaved = outside.filter(repo => (repo.dirtyFiles ?? 0) > 0 || (repo.untrackedFiles ?? 0) > 0)
  const neverPushed = outside.filter(repo => repo.unpushed.length > 0)
  const findings: MachineFinding[] = []

  if (unsaved.length > 0) {
    findings.push({
      level: 'risk',
      text: `${unsaved.length} ${plural(unsaved.length, 'repository', 'repositories')} outside the brain `
        + `${plural(unsaved.length, 'has', 'have')} unsaved work. Nothing is watching it.`,
      fix: 'plugbrain hygiene --wip-snapshot --repo <path>',
      paths: unsaved.map(repo => repo.path),
    })
  }
  if (neverPushed.length > 0) {
    const branches = neverPushed.reduce((sum, repo) => sum + repo.unpushed.length, 0)
    findings.push({
      level: 'attention',
      text: `${branches} ${plural(branches, 'branch', 'branches')} in repositories outside the brain `
        + `${plural(branches, 'was', 'were')} never pushed anywhere.`,
      fix: 'plugbrain repos --dirty',
      paths: neverPushed.map(repo => repo.path),
    })
  }
  return findings
}

function orphanFindings(census: CensusReport): MachineFinding[] {
  const withOrphans = census.repos.filter(repo => repo.orphanWorktrees > 0)
  if (withOrphans.length === 0) return []
  const total = withOrphans.reduce((sum, repo) => sum + repo.orphanWorktrees, 0)
  return [{
    level: 'risk',
    text: `${total} ${plural(total, 'worktree is', 'worktrees are')} dangling: their directory is gone, `
      + `so their registration would be pruned and their files forgotten.`,
    fix: 'git worktree prune (in the base repo), after checking the worktree is really gone',
    paths: withOrphans.map(repo => repo.path),
  }]
}

/**
 * Fill `findings` on a machine report from the machine facts and the census.
 * Worst-first, so the first line is the one that stops the work soonest.
 */
export function withMachineFindings(report: MachineReport, census: CensusReport): MachineReport {
  const findings = [
    ...forecastFindings(report),
    ...driveFindings(report),
    ...pagefileFindings(report),
    ...orphanFindings(census),
    ...outsideBrainFindings(census),
  ]
  findings.sort((a, b) => RANK[b.level] - RANK[a.level])
  return { ...report, findings }
}
