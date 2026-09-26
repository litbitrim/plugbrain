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
const TOKEN_KEY = 'plugbrain.auth_token'

/** Mutating vault operations use the same local daemon session as the rest of
 * the UI.  Registration and reindex are the first actions on a fresh install,
 * so omitting this header made a correctly injected session look unusable. */
function mutationHeaders() {
  let token = ''
  try {
    token = new URLSearchParams(window.location.search).get('token')?.trim()
      || window.__PLUGBRAIN__?.token?.trim()
      || localStorage.getItem(TOKEN_KEY)?.trim()
      || ''
  } catch { /* static tests and private storage simply have no session */ }
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}`, 'x-plug-auth-token': token } : {}),
  }
}

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
 * Make a URL-supplied filesystem root comparable with a registered planet.
 *
 * Brain's UI is deliberately the only place a `workspaceRoot` URL parameter
 * is translated into an API workspace id. Every API call below receives the
 * durable id, never a filesystem path.
 */
export function normalizeWorkspaceRoot(root) {
  if (typeof root !== 'string') return ''
  const supplied = root.trim()
  if (supplied === '') return ''
  // Windows drive and UNC roots are case-insensitive. Preserve POSIX spelling
  // and case: `/srv/Brain` and `/srv/brain` can legitimately be distinct.
  const windows = /^[a-zA-Z]:[\\/]/.test(supplied) || /^[\\/]{2}/.test(supplied)
  if (windows) {
    const slashed = supplied.replace(/\\/g, '/')
    // Keep UNC's leading `//` intact instead of turning it into a POSIX root.
    const compact = slashed.startsWith('//')
      ? `//${slashed.slice(2).replace(/\/{2,}/g, '/')}`
      : slashed.replace(/\/{2,}/g, '/')
    const rootPath = compact === '//' || /^[a-zA-Z]:\/$/.test(compact)
      ? compact
      : compact.replace(/\/+$/, '')
    return rootPath.toLowerCase()
  }
  return supplied === '/' ? supplied : supplied.replace(/\/+$/, '')
}

/** Return a registered workspace id for an exact normalized root, or empty. */
export function workspaceIdForRoot(planets, requestedRoot) {
  const normalized = normalizeWorkspaceRoot(requestedRoot)
  if (!normalized || !Array.isArray(planets)) return ''
  return planets.find(planet =>
    typeof planet?.id === 'string' && normalizeWorkspaceRoot(planet.root) === normalized,
  )?.id ?? ''
}

/**
 * What `/api/index/progress` answers, as far as the UI reads it.
 *
 * Typed here because the progress line is the only thing a user sees while a
 * vault indexes, and an untyped callback made the caller pass `any` into it.
 *
 * @typedef {{ running: boolean, stale: boolean, quiet: boolean, ownerAlive: boolean,
 *   recoverable: boolean, finished: boolean, summary: string,
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
    headers: mutationHeaders(),
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
  if (report.stale) {
    if (report.ownerAlive && !report.recoverable) {
      return 'Indexlauf ohne neuen Fortschritt; der Owner-Prozess läuft noch. Die Sperre bleibt geschützt.'
    }
    return 'Indexlauf ohne neuen Fortschritt; der frühere Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.'
  }
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
 * Merge a daemon poll into the status line without leaving a resolved quiet
 * warning visible forever. User-started progress lines keep ownership until
 * their own request finishes.
 */
export function nextDaemonProgress(report, current) {
  if (report?.running || report?.stale) return describeProgress(report)
  return current.startsWith('Indexiert:') || current.startsWith('Indexlauf ohne neuen Fortschritt;')
    ? ''
    : current
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
 * A run that went quiet is never reported as forward progress.  A live owner
 * remains protected because it can still hold SQLite during a long synchronous
 * phase; a quiet dead owner is explicitly recoverable instead.
 */
export async function watchIndexRun(id, onProgress) {
  for (;;) {
    await sleep(900)
    const report = await indexProgress(id)
    if (report === null) throw new Error('Der Fortschritt ist nicht abrufbar.')
    onProgress?.(report)
    if (report.running) continue
    if (report.stale) {
      if (report.ownerAlive && !report.recoverable) {
        throw new Error('Der Indexlauf meldet keinen neuen Fortschritt, aber der Owner-Prozess läuft noch. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren.')
      }
      throw new Error('Der Indexlauf ist verstummt und sein Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.')
    }
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
    headers: mutationHeaders(),
    body: JSON.stringify({ workspace: id }),
  })
  const payload = await response.json().catch(() => null)
  if (response.status === 409 && payload?.busy) {
    if (payload.ownerAlive && !payload.recoverable) {
      throw new Error('Ein stiller Indexlauf gehört noch einem lebenden Owner-Prozess. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren.')
    }
    if (payload.recoverable) {
      throw new Error('Der vorherige Index-Owner ist nicht mehr aktiv. Der Lauf kann erneut gestartet werden.')
    }
    throw new Error(payload.error ?? 'Ein Indexlauf ist bereits unterwegs.')
  }
  if (!response.ok) throw new Error(`Indizieren: HTTP ${response.status}`)
  if (!payload?.ok) throw new Error('Indizieren: unvollständige Antwort.')
  if (payload.result !== undefined && payload.result !== null) return payload.result
  return watchIndexRun(id, onProgress)
}
