/**
 * Git-Chaos-Schutz, step 2: findings a human understands.
 *
 * The collector reports facts; this module turns them into sentences with a
 * level and a command that fixes them. The level is what makes the report
 * actionable — `ok` means nothing to do, `attention` means look soon, `risk`
 * means work exists on exactly one disk and could vanish with the next reset.
 *
 * Every sentence names the count and the concrete next step, because the whole
 * point of the feature is a vibe-coder reading one line and knowing what to do.
 */
import type {
  HygieneCheckout, HygieneFinding, HygieneLevel, HygieneReport,
} from './collect.ts'

const LEVEL_RANK: Record<HygieneLevel, number> = { ok: 0, attention: 1, risk: 2 }

const worst = (levels: HygieneLevel[]): HygieneLevel =>
  levels.reduce<HygieneLevel>((acc, level) => (LEVEL_RANK[level] > LEVEL_RANK[acc] ? level : acc), 'ok')

/** A short phrase for the one-sentence summary. */
interface Phrase { level: HygieneLevel; text: string }

const plural = (n: number, one: string, many: string): string => (n === 1 ? one : many)

/** Paths of the checkouts a predicate selects. */
const pathsWhere = (checkouts: HygieneCheckout[], predicate: (c: HygieneCheckout) => boolean): string[] =>
  checkouts.filter(predicate).map(c => c.path)

function unsavedWork(checkouts: HygieneCheckout[]): { findings: HygieneFinding[]; phrases: Phrase[] } {
  // Dirt and untracked files are one finding, not two: from the human's point of
  // view it is the same problem — work that exists on this disk only — and
  // listing it once is what makes the sentence act as a to-do.
  const affected = checkouts.filter(c => (c.dirtyFiles ?? 0) > 0 || (c.untrackedFiles ?? 0) > 0)
  if (affected.length === 0) return { findings: [], phrases: [] }

  const dirty = affected.reduce((sum, c) => sum + (c.dirtyFiles ?? 0), 0)
  const untracked = affected.reduce((sum, c) => sum + (c.untrackedFiles ?? 0), 0)
  const anyTracked = dirty > 0
  const parts: string[] = []
  if (dirty > 0) parts.push(`${dirty} changed ${plural(dirty, 'file', 'files')}`)
  if (untracked > 0) parts.push(`${untracked} untracked ${plural(untracked, 'file', 'files')}`)
  const tail = anyTracked
    ? 'A reset or a lost disk erases them.'
    : 'Git does not track untracked files at all.'

  return {
    findings: [{
      level: anyTracked ? 'risk' : 'attention',
      text: `${affected.length} ${plural(affected.length, 'checkout has', 'checkouts have')} unsaved work (`
        + `${parts.join(' and ')}). ${tail}`,
      fix: 'plugbrain hygiene --wip-snapshot',
      paths: pathsWhere(checkouts, c => (c.dirtyFiles ?? 0) > 0 || (c.untrackedFiles ?? 0) > 0),
    }],
    phrases: [{
      level: anyTracked ? 'risk' : 'attention',
      text: `${affected.length} ${plural(affected.length, 'checkout has', 'checkouts have')} unsaved work`,
    }],
  }
}

function unpushedWork(checkouts: HygieneCheckout[]): { findings: HygieneFinding[]; phrases: Phrase[] } {
  const withUnpushed = checkouts.filter(c => c.unpushed.length > 0)
  if (withUnpushed.length === 0) return { findings: [], phrases: [] }
  const branches = withUnpushed.reduce((sum, c) => sum + c.unpushed.length, 0)
  const never = withUnpushed.reduce(
    (sum, c) => sum + c.unpushed.filter(b => b.upstream === null).length, 0)
  const detail = never > 0
    ? `${never} of them ${plural(never, 'was', 'were')} never pushed anywhere.`
    : 'Their commits exist only in this checkout.'
  return {
    findings: [{
      level: 'attention',
      text: `${branches} ${plural(branches, 'branch is', 'branches are')} ahead of or without an upstream. ${detail}`,
      fix: 'push the branch, e.g. git push -u origin <branch>',
      paths: pathsWhere(checkouts, c => c.unpushed.length > 0),
    }],
    phrases: [{ level: 'attention', text: `${branches} ${plural(branches, 'branch was', 'branches were')} never pushed` }],
  }
}

function stashedWork(checkouts: HygieneCheckout[]): { findings: HygieneFinding[]; phrases: Phrase[] } {
  const withStash = checkouts.filter(c => (c.stashes ?? 0) > 0)
  if (withStash.length === 0) return { findings: [], phrases: [] }
  const count = withStash.reduce((sum, c) => sum + (c.stashes ?? 0), 0)
  return {
    findings: [{
      level: 'attention',
      text: `${count} ${plural(count, 'stash holds', 'stashes hold')} work that is not on any branch. `
        + 'Git keeps it, but nobody will look unless told to.',
      fix: 'git stash list',
      paths: pathsWhere(checkouts, c => (c.stashes ?? 0) > 0),
    }],
    phrases: [{ level: 'attention', text: `${count} ${plural(count, 'stash is', 'stashes are')} unmerged` }],
  }
}

function orphans(checkouts: HygieneCheckout[]): { findings: HygieneFinding[]; phrases: Phrase[] } {
  const broken = checkouts.filter(c => c.orphan)
  if (broken.length === 0) return { findings: [], phrases: [] }
  return {
    findings: [{
      level: 'risk',
      text: `${broken.length} ${plural(broken.length, 'checkout is', 'checkouts are')} orphaned: `
        + 'their .git points at a git directory that no longer exists, so git cannot read them.',
      fix: 'git worktree prune (in the base repo)',
      paths: broken.map(c => c.path),
    }],
    phrases: [{ level: 'risk', text: `${broken.length} ${plural(broken.length, 'checkout is', 'checkouts are')} orphaned` }],
  }
}

function staleness(checkouts: HygieneCheckout[], attentionDays = 30, riskDays = 90): { findings: HygieneFinding[]; phrases: Phrase[] } {
  const old = checkouts.filter(c => c.staleDays !== null && c.staleDays >= attentionDays && !c.orphan)
  if (old.length === 0) return { findings: [], phrases: [] }
  const oldest = Math.max(...old.map(c => c.staleDays ?? 0))
  const level: HygieneLevel = oldest >= riskDays ? 'risk' : 'attention'
  return {
    findings: [{
      level,
      text: `${old.length} ${plural(old.length, 'checkout was', 'checkouts were')} not touched for `
        + `${attentionDays}+ days (oldest ${oldest}).`,
      fix: 'review and archive the checkout',
      paths: pathsWhere(checkouts, c => c.staleDays !== null && c.staleDays >= attentionDays && !c.orphan),
    }],
    phrases: [{ level, text: `${old.length} ${plural(old.length, 'checkout is', 'checkouts are')} stale` }],
  }
}

function claimConflicts(checkouts: HygieneCheckout[]): { findings: HygieneFinding[]; phrases: Phrase[] } {
  const contested = checkouts.filter(c => c.claims.some(claim => claim.conflictsWith.length > 0))
  if (contested.length === 0) return { findings: [], phrases: [] }
  const pairs = contested.flatMap(c => c.claims.filter(claim => claim.conflictsWith.length > 0))
  return {
    findings: [{
      level: 'attention',
      text: `${contested.length} ${plural(contested.length, 'checkout has', 'checkouts have')} `
        + `${pairs.length} ${plural(pairs.length, 'claim', 'claims')} held by two agents on the same paths.`,
      fix: 'plugbrain swarm board',
      paths: contested.map(c => c.path),
    }],
    phrases: [{ level: 'attention', text: `${contested.length} ${plural(contested.length, 'checkout is', 'checkouts are')} doubly claimed` }],
  }
}

function diskSpace(report: HygieneReport): { findings: HygieneFinding[]; phrases: Phrase[] } {
  const free = report.diskFreeGb
  if (free === null || free >= 10) return { findings: [], phrases: [] }
  const level: HygieneLevel = free < 2 ? 'risk' : 'attention'
  return {
    findings: [{
      level,
      text: `Only ${free} GB free on the fullest disk holding a checkout.`,
      fix: 'free space; PlugBrain deletes nothing on its own',
      paths: [],
    }],
    phrases: [{ level, text: `${free} GB disk free` }],
  }
}

/**
 * Evaluate a collected report: fill `findings` and the one-sentence `summary`.
 *
 * Findings are ordered worst-first so the first line a human reads is the one
 * that matters most.
 */
export function withFindings(report: HygieneReport): HygieneReport {
  const parts = [
    unsavedWork(report.checkouts),
    unpushedWork(report.checkouts),
    stashedWork(report.checkouts),
    orphans(report.checkouts),
    staleness(report.checkouts),
    claimConflicts(report.checkouts),
    diskSpace(report),
  ]
  const findings = parts.flatMap(part => part.findings)
  findings.sort((a, b) => LEVEL_RANK[b.level] - LEVEL_RANK[a.level])

  const phrases = parts.flatMap(part => part.phrases)
  const level = worst(findings.map(f => f.level))
  const text = phrases.length === 0
    ? `All ${report.checkouts.length} ${plural(report.checkouts.length, 'checkout is', 'checkouts are')} clean and pushed.`
    : `${phrases.map(p => p.text).join('; ')}.`

  return { ...report, summary: { level, text }, findings }
}
