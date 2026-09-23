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
    return `process priority unavailable: ${error instanceof Error ? error.code ?? error.message : String(error)}`
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

/** Warm two calls, then retain an odd number of independent loaded samples. */
export async function measureWarmMedian(
  operation: () => Promise<void>,
  options: { warmups?: number; samples?: number } = {},
): Promise<{ samples: number[]; median: number }> {
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
