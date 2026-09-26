import { constants, getPriority, setPriority } from 'node:os'
import { strict as assert } from 'node:assert'

/**
 * Make timing evidence less dependent on a busy shared Windows desktop.
 * This changes only the node:test process, never a Brain daemon or service.
 */
export function prioritiseTimingProcess(): string {
  const target = constants.priority.PRIORITY_ABOVE_NORMAL
  try {
    setPriority(process.pid, target)
    return `process priority ${getPriority(process.pid)} (requested ${target})`
  } catch (error) {
    // Some managed Windows sessions refuse priority changes. The measurement
    // remains valid and names that fact instead of silently claiming control.
    return `process priority unavailable: ${error instanceof Error ? (error as NodeJS.ErrnoException).code ?? error.message : String(error)}`
  }
}

export function medianMs(values: readonly number[]): number {
  assert.ok(values.length > 0, 'a timing median needs at least one sample')
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 1
    ? sorted[middle]!
    : (sorted[middle - 1]! + sorted[middle]!) / 2
}

export interface TimingMeasurement {
  samples: number[]
  median: number
}

export type HostLoadClassification =
  | { status: 'HOST_READY' }
  | { status: 'HOST_OVERLOADED'; reason: string }

/**
 * A deliberately separate host probe, run before the product timing starts.
 *
 * It measures the scheduler's delay while the test is otherwise idle. This
 * is not a wider product budget: the product budget below remains unchanged.
 * A sustained delay means a shared desktop cannot fairly distinguish a slow
 * Brain route from CPU contention outside this process.
 */
export const HOST_OVERLOAD_MEDIAN_LAG_MS = 200

export function classifyHostLoad(
  measurement: TimingMeasurement,
  overloadMedianLagMs = HOST_OVERLOAD_MEDIAN_LAG_MS,
): HostLoadClassification {
  if (measurement.median < overloadMedianLagMs) return { status: 'HOST_READY' }
  return {
    status: 'HOST_OVERLOADED',
    reason: `HOST_OVERLOADED: scheduler median lag ${measurement.median.toFixed(1)} ms `
      + `(threshold ${overloadMedianLagMs} ms; samples=${measurement.samples.map(value => value.toFixed(1)).join(',')})`,
  }
}

async function schedulerLag(probeMs: number): Promise<number> {
  const started = performance.now()
  await new Promise<void>(resolve => setTimeout(resolve, probeMs))
  return Math.max(0, performance.now() - started - probeMs)
}

/** Warm an idle scheduler probe, then classify its median delay. */
export async function measureHostLoad(
  options: { warmups?: number; samples?: number; probeMs?: number } = {},
): Promise<TimingMeasurement> {
  const warmups = options.warmups ?? 1
  const sampleCount = options.samples ?? 5
  const probeMs = options.probeMs ?? 50
  for (let i = 0; i < warmups; i += 1) await schedulerLag(probeMs)
  const samples: number[] = []
  for (let i = 0; i < sampleCount; i += 1) samples.push(await schedulerLag(probeMs))
  return { samples, median: medianMs(samples) }
}

/** Warm two calls, then retain an odd number of independent loaded samples. */
export async function measureWarmMedian(
  operation: () => Promise<void>,
  options: { warmups?: number; samples?: number } = {},
): Promise<TimingMeasurement> {
  const warmups = options.warmups ?? 2
  const sampleCount = options.samples ?? 5
  for (let i = 0; i < warmups; i += 1) await operation()
  const samples: number[] = []
  for (let i = 0; i < sampleCount; i += 1) {
    const start = performance.now()
    await operation()
    samples.push(performance.now() - start)
  }
  return { samples, median: medianMs(samples) }
}

/**
 * The stated budget stays the median budget. A separate max guard catches an
 * actual hang without treating a one-off desktop scheduling spike as a product
 * regression.
 */
export function assertStableBudget(
  label: string, measurement: { samples: readonly number[]; median: number }, budgetMs: number,
): void {
  assert.ok(measurement.median < budgetMs,
    `${label} median ${measurement.median.toFixed(1)} ms exceeds ${budgetMs} ms; samples=${measurement.samples.map(v => v.toFixed(1)).join(',')}`)
  const longest = Math.max(...measurement.samples)
  assert.ok(longest < budgetMs * 4,
    `${label} took ${longest.toFixed(1)} ms, exceeding the ${budgetMs * 4} ms no-hang guard`)
}
