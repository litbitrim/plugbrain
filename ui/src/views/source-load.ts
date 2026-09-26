/**
 * A source pane must not become a permanent spinner when a concurrent Core
 * writer holds the metadata database. The underlying request is not cancelled
 * here—the daemon may still complete it—but the visible user action receives a
 * concrete, retryable failure instead of silently waiting forever.
 */
export const SOURCE_READ_TIMEOUT_MS = 8_000

export function sourceReadWithin<T>(read: Promise<T>, timeoutMs = SOURCE_READ_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = globalThis.setTimeout(() => {
      reject(new Error(`Brain-Dateiabruf hat nach ${timeoutMs / 1000} Sekunden nicht geantwortet. Bitte nach dem Indexlauf erneut versuchen.`))
    }, timeoutMs)
    read.then(
      value => {
        globalThis.clearTimeout(timer)
        resolve(value)
      },
      reason => {
        globalThis.clearTimeout(timer)
        reject(reason)
      },
    )
  })
}
