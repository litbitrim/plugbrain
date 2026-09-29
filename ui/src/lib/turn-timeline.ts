import type { SwarmWorker } from '../types'

export type TurnState = 'working' | 'needs-task' | 'awaiting-commit' | 'blocked' | 'paused' | 'commit-approved' | 'offline'
export type TimelineBucket = 'blocked' | 'still' | 'awaiting-commit' | 'working' | 'needs-task' | 'resting'

const PRIORITY: TimelineBucket[] = ['blocked', 'still', 'awaiting-commit', 'working', 'needs-task', 'resting']

export function contactInWindow(worker: SwarmWorker, start: number, end: number): boolean {
  const contact = worker.lastHeartbeat === null ? Number.NaN : Date.parse(worker.lastHeartbeat)
  return Number.isFinite(contact) && contact >= start && contact <= end
}

export function isWorkerStill(worker: SwarmWorker, now = Date.now()): boolean {
  if (worker.turnState !== 'working') return false
  const contact = worker.lastHeartbeat === null ? Number.NaN : Date.parse(worker.lastHeartbeat)
  return Number.isFinite(contact) && now - contact > 30 * 60_000
}

export function timelineBucket(worker: SwarmWorker, start: number, end: number, now = Date.now()): TimelineBucket {
  if (worker.retired || worker.turnState === 'paused' || worker.turnState === 'offline' || !contactInWindow(worker, start, end)) return 'resting'
  if (worker.turnState === 'blocked') return 'blocked'
  if (isWorkerStill(worker, now)) return 'still'
  if (worker.turnState === 'awaiting-commit') return 'awaiting-commit'
  if (worker.turnState === 'working') return 'working'
  if (worker.turnState === 'needs-task') return 'needs-task'
  return 'resting'
}

export function sortTimelineWorkers(workers: SwarmWorker[], start: number, end: number, now = Date.now()): SwarmWorker[] {
  return [...workers].sort((a, b) => {
    const priority = PRIORITY.indexOf(timelineBucket(a, start, end, now)) - PRIORITY.indexOf(timelineBucket(b, start, end, now))
    return priority || (a.account ?? '').localeCompare(b.account ?? '') || a.name.localeCompare(b.name)
  })
}

export function staleDuration(value: string | null, now = Date.now()): string {
  const since = value === null ? Number.NaN : Date.parse(value)
  if (!Number.isFinite(since)) return 'unbekannt'
  const minutes = Math.max(0, Math.floor((now - since) / 60_000))
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 48) return `${hours} Std.`
  const days = Math.floor(hours / 24)
  return days === 1 ? '1 Tag' : `${days} Tagen`
}

export function timelineCounts(workers: SwarmWorker[], start: number, end: number, now = Date.now()) {
  return workers.reduce((counts, worker) => {
    const bucket = timelineBucket(worker, start, end, now)
    if (bucket === 'working') counts.working++
    if (bucket === 'still') counts.still++
    if (worker.turnState === 'awaiting-commit' && bucket !== 'resting') counts.awaiting++
    counts.unread += worker.unread
    return counts
  }, { working: 0, awaiting: 0, still: 0, unread: 0 })
}

export function workerMatchesFilters(worker: SwarmWorker, filters: Set<'working' | 'awaiting' | 'still' | 'unread'>, start: number, end: number, now = Date.now()): boolean {
  if (filters.size === 0) return true
  const bucket = timelineBucket(worker, start, end, now)
  return (filters.has('working') && bucket === 'working')
    || (filters.has('awaiting') && worker.turnState === 'awaiting-commit' && bucket !== 'resting')
    || (filters.has('still') && bucket === 'still')
    || (filters.has('unread') && worker.unread > 0)
}

export function turnColor(state: string | null): string {
  switch (state) {
    case 'working': return 'running'
    case 'needs-task': return 'needs-task'
    case 'awaiting-commit': return 'awaiting-commit'
    case 'blocked': return 'blocked'
    case 'paused': return 'paused'
    case 'commit-approved': return 'approved'
    default: return 'unknown'
  }
}

export function isTurnStill(lastContact: string | null, endedAt: string | null, now = Date.now()): boolean {
  const contact = lastContact === null ? Number.NaN : Date.parse(lastContact)
  return endedAt === null && Number.isFinite(contact) && now - contact > 30 * 60_000
}

export function percentAt(value: string, start: number, end: number): number {
  const at = Date.parse(value)
  if (!Number.isFinite(at) || end <= start) return 0
  return Math.min(100, Math.max(0, ((at - start) / (end - start)) * 100))
}
