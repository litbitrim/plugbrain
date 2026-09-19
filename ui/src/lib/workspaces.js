/**
 * Vault plumbing for the standalone brain UI.
 *
 * The Brain is the single authority; this module only exposes what the daemon
 * already offers (galaxy listing, register, reindex) and remembers which vault
 * the human last had open — the Obsidian half of "standalone": open a folder,
 * get a graph, come back to it later. No indexer, no store, no second truth.
 *
 * The daemon's own watch loop keeps an open vault fresh (it re-indexes what
 * changed after every burst), so the graph updates itself once a folder is
 * in; the UI only has to make the "open a folder" gesture exist.
 */

const KEY = 'plugbrain.workspace'

export function lastWorkspace() {
  try { return localStorage.getItem(KEY) || '' } catch { return '' }
}

export function rememberWorkspace(id) {
  try { localStorage.setItem(KEY, id) } catch { /* private mode */ }
}

export async function galaxy() {
  const response = await fetch('/api/galaxy')
  if (!response.ok) throw new Error(`Galaxie: HTTP ${response.status}`)
  const payload = await response.json()
  if (!payload?.ok || !Array.isArray(payload.planets)) {
    throw new Error('Die Galaxie antwortet unvollständig.')
  }
  return payload.planets
}

/**
 * What `/api/index/progress` answers, as far as the UI reads it.
 *
 * Typed here because the progress line is the only thing a user sees while a
 * vault indexes, and an untyped callback made the caller pass `any` into it.
 *
 * @typedef {{ running: boolean, stale: boolean, finished: boolean, summary: string,
 *   run: null | { phase: string, mode: string, processed: number, total: number,
 *     scanned: number, startedAt: string, finishedAt: string | null,
 *     ok: boolean | null, error: string | null,
 *     result: null | { files: number, symbols: number, edges: number, ms: number } } }} IndexReport
 */

/**
 * Make a folder a vault and give it a first index.
 *
 * Two calls on purpose: registration is idempotent identity (the same folder
 * is always the same workspace), indexing is work that can fail on its own. A
 * registered-but-unindexed vault is a real state and must not look like one
 * that simply has nothing to show.
 *
 * @param {string} root
 * @param {string | undefined} name
 * @param {(report: IndexReport) => void} [onProgress]
 * @returns {Promise<string>} the workspace id
 */
export async function openVault(root, name, onProgress) {
  const register = await fetch('/api/workspaces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ root, name }),
  })
  if (!register.ok) {
    const body = await register.json().catch(() => null)
    throw new Error(body?.error ?? `Registrieren: HTTP ${register.status}`)
  }
  const created = await register.json()
  if (!created?.ok || !created.workspace?.id) {
    throw new Error('Registrieren: unvollständige Antwort.')
  }
  await reindexWorkspace(created.workspace.id, onProgress)
  return created.workspace.id
}

/**
 * One progress line a person can read while the brain works.
 *
 * The counters come from the daemon, which reads them from the run state the
 * indexer itself keeps current — nothing here estimates, and a phase that has
 * no total yet says so instead of showing a bar that pretends to know.
 *
 * @param {IndexReport} report
 */
export function describeProgress(report) {
  const run = report?.run
  if (!run) return 'Kein Indexlauf bekannt.'
  const seconds = Math.max(0, Math.round((Date.now() - Date.parse(run.startedAt)) / 1000))
  const phase = {
    starting: 'startet', scan: 'sammelt Dateien', classify: 'vergleicht',
    write: 'schreibt', resolve: 'verknüpft', publish: 'veröffentlicht',
    done: 'fertig', failed: 'fehlgeschlagen',
  }[run.phase] ?? run.phase
  if (run.finishedAt) {
    return run.ok
      ? `Fertig: ${run.result?.files ?? run.scanned} Dateien, ` +
        `${run.result?.symbols ?? 0} Symbole, ${run.result?.edges ?? 0} Kanten in ${seconds} s.`
      : `Indexlauf fehlgeschlagen: ${run.error ?? 'unbekannter Grund'}`
  }
  const total = run.total > 0 ? `/${run.total}` : ''
  const percent = run.total > 0 ? ` (${Math.round((run.processed / run.total) * 100)} %)` : ''
  return `Indexiert: ${phase} ${run.processed}${total}${percent} — ${seconds} s`
}

/**
 * Fetch the daemon's view of the current run for one workspace.
 *
 * @param {string} id
 * @returns {Promise<IndexReport | null>}
 */
export async function indexProgress(id) {
  const response = await fetch(`/api/index/progress?workspace=${encodeURIComponent(id)}`)
  if (!response.ok) return null
  return response.json()
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Watch a started run until it ends.
 *
 * A run that went quiet is reported as quiet, never as still working: the
 * daemon writes a heartbeat, and a heartbeat that stopped means the process is
 * gone, not that the work is slow.
 */
export async function watchIndexRun(id, onProgress) {
  for (;;) {
    await sleep(900)
    const report = await indexProgress(id)
    if (report === null) throw new Error('Der Fortschritt ist nicht abrufbar.')
    onProgress?.(report)
    if (report.running) continue
    if (report.stale) throw new Error('Der Indexlauf ist verstummt — kein Lebenszeichen mehr.')
    const run = report.run
    if (!run) throw new Error('Kein Indexlauf bekannt.')
    if (run.ok) return run.result
    throw new Error(run.error ?? 'Indexlauf fehlgeschlagen.')
  }
}

/**
 * Start an index run and, if the daemon took it, follow it to the end.
 *
 * A daemon that answers 202 is saying "started, not finished": the counters
 * then come from the progress route. A daemon that answers with a result has
 * indexed in line (no store path configured) and there is nothing to watch.
 *
 * @param {string} id
 * @param {(report: IndexReport) => void} [onProgress]
 */
export async function reindexWorkspace(id, onProgress) {
  const response = await fetch('/api/reindex', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspace: id }),
  })
  const payload = await response.json().catch(() => null)
  if (response.status === 409 && payload?.busy) {
    throw new Error(payload.error ?? 'Ein Indexlauf ist bereits unterwegs.')
  }
  if (!response.ok) throw new Error(`Indizieren: HTTP ${response.status}`)
  if (!payload?.ok) throw new Error('Indizieren: unvollständige Antwort.')
  if (payload.result !== undefined && payload.result !== null) return payload.result
  return watchIndexRun(id, onProgress)
}