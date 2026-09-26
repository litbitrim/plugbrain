/**
 * PlugBrain CLI.
 *
 *   plugbrain register <path> [name]   register a folder as a workspace
 *   plugbrain index [workspaceId]      (re)index one or every workspace
 *   plugbrain status                   what the brain currently holds
 *   plugbrain search <query>           find code without touching the disk
 *   plugbrain ask "<question>" [--json]  ask in plain language; the brain picks the tool
 *   plugbrain serve [port]             run the API + UI daemon
 *
 *   plugbrain planet register [path] [name]   register a planet, discover its repos
 *   plugbrain planet select [workspaceId] --checkout <checkoutId> [--checkout <checkoutId>]
 *                                             persist the explicit active Code roots
 *   plugbrain planet scan [workspaceId]       refresh revisions, then index
 *   plugbrain planet status [workspaceId]     repos, checkouts, revisions, counts
 *   plugbrain planet history [workspaceId]    files the planet no longer has
 *   plugbrain planet prune [workspaceId] [--apply] [--compact] [--batch <n>]
 *                                             remove the rows of checkouts the selection does not keep
 *   plugbrain compact                         give freed pages back to the disk (VACUUM)
 *
 *   plugbrain plan [status|next|task <M00>|gates]   the master ledger joined with the brain's queue
 *
 *   plugbrain notes query <filter>            property query, e.g. typ=gate UND stand=offen
 *   plugbrain notes search <text> [--lines]   prose search across the vault, with snippets
 *   plugbrain notes read <path>               one note with links, backlinks and properties
 *   plugbrain notes write <path> --from <f>   save with a version check
 *   plugbrain notes graph [--focus <path>]    the note graph with type colour groups
 *   plugbrain notes backlinks <path>          who points at this note
 *
 *   plugbrain swarm <register|turn|ack|board|send|enqueue|deliver|approve|resources|quota|admit|watchdog|review-pool> …
 *                                             the fleet's check-in desk (see src/swarm-cli.ts)
 *
 *   plugbrain hygiene [--workspace <id>] [--json]   what git work sits on exactly one disk
 *   plugbrain hygiene --wip-snapshot [--json]       save uncommitted work into refs/wip/<date>/<name>
 *   plugbrain hygiene --wip-snapshot --repo <path>  rescue one repository the brain never registered
 *
 *   plugbrain machine [--json]                      drives, pagefile, RAM, CPU and when a disk fills
 *   plugbrain repos [--dirty] [--json]              every git repository on this machine
 */
import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { openStore } from './store/schema.ts'
import {
  assertPlanetIndexSelectionConfigured, listPlanet, planetHistory, registerPlanet,
  setPlanetIndexSelection, workspaceIdFor, pinWorkspaceId,
} from './planet.ts'
import {
  backlinksOf, listNotes, noteGraph, queryNotes, readNote, searchNotesWithLines, writeNote,
} from './notes/vault.ts'
import * as access from './access.ts'
import { ensureAgent } from './access.ts'
import * as intel from './intel/index.ts'
import { buildBriefing, renderBriefing } from './context/briefing.ts'
import { askQuestion } from './ask/index.ts'
import { startServer } from './server/api.ts'
import { startDaemon } from './daemon.ts'
import { IndexRunBusy, runIndexInProcess, startIndexRun } from './index/runner.ts'
import { appraiseRun, describeRun, listRunStates } from './index/runs.ts'
import type { IndexProgress } from './indexer/index.ts'
import type { IndexResult } from './indexer/scan.ts'
import { startMcpServer } from './mcp/server.ts'
import { backupStore, restoreStore } from './store/backup.ts'
import {
  createWipSnapshots, hygieneReport, snapshotRepo, type HygieneReport,
  type WipSnapshotEntry, type WipSnapshotResult,
} from './hygiene/index.ts'
import { machineReport, type MachineReport } from './machine/index.ts'
import { gitCensus, type CensusReport } from './machine/git-census.ts'
import { runSwarmCli } from './swarm-cli.ts'
import { compactStore, planPrune, prunePlanet } from './index/prune.ts'
import { planTask, planView, type PlanTask } from './plan.ts'
import { resolveBrainHome } from './home.ts'
import {
  findGitRoot, planWorkspaceRoot, registerWorkspaceRoot, resolveMcpWorkspace,
} from './setup/workspace-from-cwd.ts'
import {
  buildEntry, CLIENTS, parseClientSelection, setupClients, type ClientSetupResult,
} from './setup/clients.ts'

const HOME = resolveBrainHome()

/**
 * Where the served UI lives. A source run has it at ../ui-dist relative to
 * src/; a standalone bundle has it beside the bundle itself.
 */
function resolveUiRoot(): string {
  const candidates = [
    join(import.meta.dirname, 'ui-dist'),
    join(import.meta.dirname, '..', 'ui-dist'),
  ]
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }
  return candidates[candidates.length - 1]!
}
const DB_FILE = join(HOME, 'plugbrain.db')

/**
 * `init --dry-run` plans only: it opens the real store read-only when one
 * exists (so "already known" stays honest) and an in-memory store when none
 * does, so a dry run creates no database file at all.
 */
const DRY_RUN_INIT = process.argv[2] === 'init' && process.argv.includes('--dry-run')

const db = DRY_RUN_INIT
  ? (existsSync(DB_FILE) ? openStore(DB_FILE, { readOnly: true }) : openStore(':memory:'))
  : openStore(DB_FILE)

function register(path: string, name?: string): void {
  const root = resolve(path)
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`not a directory: ${root}`)
    process.exit(2)
  }
  const id = workspaceIdFor(root)
  const label = name ?? root.split(/[\\/]/).filter(Boolean).pop() ?? id
  db.prepare(
    `INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(root) DO UPDATE SET name = excluded.name`
  ).run(id, label, root, new Date().toISOString())
  // Registration mints identity: pin it so a later move cannot take it away.
  pinWorkspaceId(root, id)
  console.log(`registered ${label}  ${id}\n  ${root}`)
}

function reportIndex(name: string, r: IndexResult): void {
  console.log(
    `${name}: ${r.mode}  generation ${r.generation}  ${r.ms} ms\n` +
    `  scanned ${r.scanned}  files ${r.files}  parsed ${r.parsed}  skipped ${r.skipped}\n` +
    `  changed  added ${r.changed.added}  modified ${r.changed.modified}` +
    `  renamed ${r.changed.renamed}  deleted ${r.changed.deleted}  unchanged ${r.changed.unchanged}\n` +
    `  reparsed ${r.reparsed}  reresolved ${r.reresolved}\n` +
    `  symbols ${r.symbols}  edges ${r.edges}  unresolved ${r.unresolved}  ambiguous ${r.ambiguous}`)
}

/**
 * A progress line a human can watch.
 *
 * A planet takes minutes, and for all of that time the only honest thing to
 * show is work already done: files seen, files written, the phase, the elapsed
 * time. Phase changes print at once; everything else at most every two seconds
 * so the terminal stays readable.
 */
function progressPrinter(label: string): IndexProgress {
  const started = Date.now()
  let lastPhase = ''
  let lastPrinted = 0
  return tick => {
    const now = Date.now()
    const phaseChanged = tick.phase !== lastPhase
    if (!phaseChanged && now - lastPrinted < 2000) return
    lastPhase = tick.phase
    lastPrinted = now
    const seconds = Math.round((now - started) / 1000)
    const percent = tick.total > 0 ? ` ${Math.round((Math.min(tick.processed, tick.total) / tick.total) * 100)}%` : ''
    const counts = tick.phase === 'scan'
      ? `${tick.scanned} file(s) seen`
      : tick.total > 0 ? `${tick.processed}/${tick.total} file(s)${percent}` : `${tick.processed} file(s)`
    process.stdout.write(`  ${label}  ${tick.phase}  ${counts}  ${seconds}s\n`)
  }
}

function indexAll(only?: string): void {
  const rows = only
    ? db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').all(only)
    : db.prepare('SELECT id, name, root FROM workspaces').all()
  if (rows.length === 0) { console.log('no workspaces registered'); return }
  for (const row of rows as { id: string; name: string; root: string }[]) {
    process.stdout.write(`indexing ${row.name} …\n`)
    reportIndex(row.name, runIndexInProcess(db, row.id, { onProgress: progressPrinter(row.name) }))
  }
}

/** Register a planet and everything inside it, then say what was found. */
function planetRegister(path?: string, name?: string): void {
  const root = resolve(path ?? process.cwd())
  const registered = registerPlanet(db, root, name)
  console.log(
    `${registered.created ? 'registered' : 'already known'} planet ${registered.name}\n` +
    `  planet    ${registered.planetId}\n` +
    `  workspace ${registered.workspaceId}\n` +
    `  root      ${registered.root}\n` +
    `  repos     ${registered.repos}\n` +
    `  checkouts ${registered.checkouts}`)
}

/** Refresh the revision vectors, then index: the honest "is this current" verb. */
function planetScan(only?: string): void {
  const planet = only ?? singlePlanetId()
  const row = db.prepare('SELECT id, name, root FROM workspaces WHERE id = ?').get(planet) as
    { id: string; name: string; root: string } | undefined
  if (!row) { console.error(`unknown workspace: ${planet}`); process.exit(2) }
  const registered = registerPlanet(db, row.root, row.name)
  console.log(`planet ${registered.name}: ${registered.repos} repos, ${registered.checkouts} checkouts`)
  try {
    assertPlanetIndexSelectionConfigured(db, row.id)
  } catch (error) {
    console.error(
      `refusing to scan ${row.id}: ${error instanceof Error ? error.message : String(error)}\n` +
      `  plugbrain planet select ${row.id} --checkout <checkoutId>`)
    process.exit(2)
  }
  reportIndex(row.name, runIndexInProcess(db, row.id, { onProgress: progressPrinter(row.name) }))
}

/** What every known index run is doing, across processes. */
function progressReport(only?: string): void {
  const states = listRunStates()
  const wanted = only === undefined ? states : states.filter(state => state.workspaceId === only)
  if (wanted.length === 0) {
    console.log(only === undefined
      ? 'no index run recorded yet'
      : `no index run recorded for ${only}`)
    return
  }
  for (const state of wanted) {
    const appraisal = appraiseRun(state.workspaceId)
    console.log(`${describeRun(appraisal)}`)
    console.log(`  run ${state.runId}  pid ${state.pid}  started ${state.startedAt}`)
    console.log(`  scanned ${state.scanned}  processed ${state.processed}` +
      (state.total > 0 ? `/${state.total}` : '') + `  generation ${state.generation}`)
    if (state.symbols > 0 || state.edges > 0) {
      console.log(`  symbols ${state.symbols}  edges ${state.edges}`)
    }
  }
}

/** The planet a bare command should act on: the only one, or a clear refusal. */
function singlePlanetId(): string {
  const rows = db.prepare('SELECT workspace_id AS id FROM planets ORDER BY name').all() as
    Array<{ id: string }>
  if (rows.length === 0) { console.error('no planet registered'); process.exit(2) }
  if (rows.length > 1) {
    console.error('several planets registered — name one:')
    for (const row of rows) console.error(`  ${row.id}`)
    process.exit(2)
  }
  return rows[0].id
}

/** A non-Planet Intel command still needs one explicit workspace authority. */
function singleWorkspaceId(): string {
  const rows = db.prepare('SELECT id FROM workspaces ORDER BY created_at LIMIT 2').all() as
    Array<{ id: string }>
  if (rows.length === 0) { console.error('no workspace registered'); process.exit(2) }
  if (rows.length > 1) {
    console.error('several workspaces registered — pass --workspace <workspaceId>:')
    for (const row of rows) console.error(`  ${row.id}`)
    process.exit(2)
  }
  return rows[0].id
}

/** Persist only inventory IDs — never a path or inferred all-checkouts vector. */
function planetSelect(args: string[]): void {
  const first = args[0]
  const workspaceId = first !== undefined && !first.startsWith('--') ? first : singlePlanetId()
  const rest = first !== undefined && !first.startsWith('--') ? args.slice(1) : args
  const checkoutIds: string[] = []
  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i]
    if (arg === '--json') continue
    if (arg.startsWith('--checkout=')) {
      const id = arg.slice('--checkout='.length).trim()
      if (id) checkoutIds.push(id)
      continue
    }
    if (arg === '--checkout') {
      const id = rest[i + 1]?.trim()
      if (!id || id.startsWith('--')) {
        console.error('usage: plugbrain planet select [workspaceId] --checkout <checkoutId> [--checkout <checkoutId>]')
        process.exit(1)
      }
      checkoutIds.push(id)
      i += 1
      continue
    }
    console.error(`unknown planet select argument: ${arg}`)
    process.exit(1)
  }
  if (checkoutIds.length === 0) {
    console.error('refusing to infer Code roots; pass one or more inventory checkout IDs with --checkout')
    process.exit(1)
  }
  const selection = setPlanetIndexSelection(db, workspaceId, checkoutIds)
  if (args.includes('--json')) return jsonOut({ workspace: workspaceId, selection })
  console.log(`selected ${selection.checkoutIds.length} canonical checkout(s) for ${workspaceId}`)
  for (const id of selection.checkoutIds) console.log(`  ${id}`)
}

/* ── plan: the master as the fleet sees it ──────────────────────────────── */

function printPlanTask(task: PlanTask, detail = false): void {
  const queue = task.queue.length === 0 ? '' : `  Queue: ${task.queue.map(ref =>
    `${ref.state}${ref.claimedBy ? ` (${ref.claimedBy})` : ref.addressedTo ? ` → ${ref.addressedTo}` : ''}`).join(', ')}`
  console.log(`  ${task.id}  ${task.status.padEnd(12)} ${task.title}${queue}`)
  if (!detail) return
  console.log(`    Priorität ${task.priority ?? '-'}  Rolle ${task.ownerRole ?? '-'}  Paket-Gate ${task.packageGate ?? '-'}`)
  console.log(`    hängt ab von: ${task.dependsOn.join(', ') || '-'}` +
    (task.blockedBy.length > 0 ? `  (offen: ${task.blockedBy.join(', ')})` : ''))
  console.log(`    ${task.ready ? 'bereit' : task.startable ? 'startbar (Abhängigkeiten laufen)' : task.done ? 'fertig' : 'wartet'}`)
  console.log(`    Anforderungen: ${task.requirementIds.join(', ') || '-'}`)
  console.log(`    Ledger-Gates: ${task.ledgerGates.join(', ') || '-'}`)
  for (const evidence of task.evidence) console.log(`    Beleg: ${evidence}`)
  for (const ref of task.queue) console.log(`    Queue ${ref.taskId}: ${ref.state}  ${ref.title}`)
}

function planCommand(args: string[]): void {
  const [step = 'status', ...rest] = args
  const workspaceId = flagValue(rest, '--workspace') ?? singlePlanetId()
  const json = args.includes('--json')
  if (step === 'task') {
    const id = rest.find(arg => !arg.startsWith('--'))
    if (id === undefined) { console.error('usage: plugbrain plan task <M00>'); process.exit(1) }
    const task = planTask(db, workspaceId, id)
    if (json) return jsonOut(task)
    printPlanTask(task, true)
    return
  }
  const view = planView(db, workspaceId)
  if (step === 'next') {
    const limit = Number(flagValue(rest, '--limit') ?? 10)
    const next = view.next.slice(0, limit)
    if (json) return jsonOut(next)
    console.log(`${view.next.length} startbare Master-Aufgabe(n), die ersten ${next.length}:`)
    for (const task of next) printPlanTask(task)
    return
  }
  if (step === 'gates') {
    const status = flagValue(rest, '--status')
    const gates = status === null ? view.gates : view.gates.filter(gate => gate.status === status)
    if (json) return jsonOut(gates)
    for (const gate of gates) console.log(`  ${gate.id.padEnd(14)} ${gate.status.padEnd(18)} ${gate.title}`)
    return
  }
  if (step !== 'status') {
    console.error('usage: plugbrain plan [status|next|task <M00>|gates] [--json]')
    process.exit(1)
  }
  if (json) return jsonOut(view)
  const p = view.progress
  console.log(`${view.ledger.master ?? 'Master'}  Ledger ${view.ledger.updated ?? '?'}` +
    `${view.ledger.ageHours === null ? '' : ` (vor ${view.ledger.ageHours} h, ${view.ledger.updatedBy ?? '?'})`}`)
  console.log(`  Master-Aufgaben: ${p.tasksDone}/${p.tasksTotal} fertig, ${p.tasksInProgress} in Arbeit` +
    `  ${Object.entries(view.tasksByStatus).map(([s, n]) => `${s} ${n}`).join(', ')}`)
  console.log(`  Gates: ${p.gatesVerified}/${p.gatesTotal} voll verifiziert, ${p.gatesPartial} teilweise` +
    `  ${Object.entries(view.gatesByStatus).map(([s, n]) => `${s} ${n}`).join(', ')}`)
  for (const dimension of view.dimensions) console.log(`  ${dimension.dimension.padEnd(52)} ${dimension.current}`)
  console.log(`\nStartbar (${view.next.length}):`)
  for (const task of view.next.slice(0, 8)) printPlanTask(task)
  if (view.openDecisions.length > 0) {
    console.log(`\nOffene Owner-Entscheidungen (${view.openDecisions.length}):`)
    for (const decision of view.openDecisions) console.log(`  ${decision.ref}  ${decision.decision.slice(0, 110)}`)
  }
  if (view.unplanned.length > 0) {
    console.log(`\nQueue ohne Master-Aufgabe (${view.unplanned.length}):`)
    for (const ref of view.unplanned) console.log(`  ${ref.taskId}  ${ref.state}  ${ref.title}`)
  }
}

const gb = (bytes: number): string => `${(bytes / 1024 ** 3).toFixed(2)} GB`

/** Give the pages a prune freed back to the disk. */
function compact(): void {
  process.stdout.write('compacting the store (VACUUM) …\n')
  const result = compactStore(db, DB_FILE)
  console.log(`compacted: ${gb(result.beforeBytes)} → ${gb(result.afterBytes)} in ${Math.round(result.ms / 1000)} s`)
}

/**
 * Show what a prune would remove, or remove it with --apply.
 *
 * A dry run is the default because the plan is the thing to read first: it
 * names every checkout whose rows go and why, and nothing is touched until the
 * operator has seen it.
 */
function planetPrune(args: string[]): void {
  const first = args[0]
  const workspaceId = first !== undefined && !first.startsWith('--') ? first : singlePlanetId()
  const allowEmptySelection = args.includes('--allow-empty')
  const plan = planPrune(db, workspaceId, { allowEmptySelection })
  if (!args.includes('--apply')) {
    if (args.includes('--json')) return jsonOut(plan)
    console.log(`prune plan for ${workspaceId}: ${plan.files} file row(s) in ${plan.candidates.length} group(s)`)
    console.log(`  kept checkouts: ${plan.keptCheckouts.length}`)
    for (const candidate of plan.candidates) {
      console.log(`  ${candidate.reason.padEnd(18)} ${String(candidate.files).padStart(7)}  ` +
        `${candidate.relPrefix ?? '(rows outside every note root)'}`)
    }
    console.log('\nnothing removed; run again with --apply')
    return
  }
  let lastPrinted = 0
  const batch = flagValue(args, '--batch')
  const result = prunePlanet(db, workspaceId, {
    allowEmptySelection,
    batchFiles: batch === null ? undefined : Number(batch),
    onProgress: tick => {
      const now = Date.now()
      if (now - lastPrinted < 2000 && tick.done < tick.total) return
      lastPrinted = now
      const percent = tick.overallTotal > 0 ? Math.round((tick.overallDone / tick.overallTotal) * 100) : 100
      process.stdout.write(`  ${tick.relPrefix ?? '(outside note roots)'}  ${tick.done}/${tick.total}` +
        `  overall ${tick.overallDone}/${tick.overallTotal} ${percent}%\n`)
    },
  })
  if (args.includes('--json') && !args.includes('--compact')) return jsonOut(result)
  console.log(`pruned ${result.files} file row(s) in ${Math.round(result.ms / 1000)} s, orphans ${result.orphans}`)
  for (const [table, rows] of Object.entries(result.deleted).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${table.padEnd(18)} ${rows}`)
  }
  for (const [column, rows] of Object.entries(result.nulled)) console.log(`  ${column.padEnd(18)} ${rows} set to NULL`)
  if (args.includes('--compact')) compact()
}

function planetStatus(only?: string): void {
  const id = only ?? singlePlanetId()
  const view = listPlanet(db, id)
  console.log(`\n${view.name}  ${view.planetId}`)
  console.log(`  workspace ${view.workspaceId}`)
  console.log(`  root      ${view.root}`)
  console.log(`  indexed   ${view.indexedAt ?? 'never'}  generation ${view.index.generation}`)
  console.log(
    `  selection ${view.indexSelection.configured
      ? `${view.indexSelection.checkoutIds.length} explicit checkout(s)`
      : 'UNCONFIGURED — inventory is not active Code'}`)
  console.log(
    `  totals    repos ${view.totals.repos}  checkouts ${view.totals.activeCheckouts} active` +
    ` (${view.totals.checkouts} known)  files ${view.totals.files}` +
    `  symbols ${view.totals.symbols}  edges ${view.totals.edges}` +
    `  unattributed ${view.unattributedFiles}`)
  if (view.notes.roots.length > 0) {
    console.log(
      `  notes     ${view.notes.files} notes in ${view.notes.roots.length} roots` +
      `  properties ${view.notes.properties}  links ${view.notes.links}` +
      ` (resolved ${view.notes.resolvedLinks}, ambiguous ${view.notes.ambiguousLinks},` +
      ` missing ${view.notes.missingLinks})`)
  }
  if (view.index.lastFailureAt) {
    console.log(`  last failure ${view.index.lastFailureAt}: ${view.index.failureReason ?? ''}`)
  }
  for (const repo of view.repos) {
    console.log(`\n  ${repo.name}  ${repo.id}`)
    if (repo.remoteUrl) console.log(`    origin ${repo.remoteUrl}`)
    for (const co of view.checkouts.filter(c => c.repoId === repo.id)) {
      const dirty = co.dirtyHash === null ? 'clean' : `dirty ${co.dirtyCount}`
      console.log(
        `    ${co.relPrefix}  ${co.branch ?? '(detached)'} ${(co.head ?? '').slice(0, 10)}` +
        `  ${dirty}  ${co.revision ?? ''}  files ${co.files}  symbols ${co.symbols}` +
        (co.retiredAt ? '  [retired]' : co.indexSelected ? '  [selected]' : '  [inventory]'))
    }
  }
}

/* ── notes: the Obsidian replacement ────────────────────────────────────── */

/**
 * The identity a CLI read or edit is attributed to.
 *
 * Reads and writes go through the access layer, which records who did them, so
 * the CLI cannot be anonymous: an unattributed edit to the knowledge base is
 * exactly the thing the provenance exists to prevent.
 */
const NOTES_AGENT = 'notes-cli'
const notesAgent = (): string => {
  access.registerAgent(db, NOTES_AGENT, 'PlugBrain notes CLI')
  return NOTES_AGENT
}

const flagValue = (args: string[], name: string): string | null => {
  const inline = args.find(arg => arg.startsWith(`${name}=`))
  if (inline !== undefined) return inline.slice(name.length + 1)
  const at = args.indexOf(name)
  return at === -1 ? null : args[at + 1] ?? null
}

function notesQuery(args: string[]): void {
  const asJson = args.includes('--json')
  const text = args.filter(arg => !arg.startsWith('--') && !/^\d+$/.test(arg)).join(' ')
  const limit = Number(flagValue(args, '--limit') ?? 200)
  const result = queryNotes(db, singlePlanetId(), text, { limit })
  if (asJson) return jsonOut(result)
  console.log(`${result.total} note(s) match  ${result.parsed}`)
  for (const note of result.notes) {
    console.log(`  ${(note.typ ?? '-').padEnd(13)} ${(note.stand ?? '-').padEnd(10)} ` +
      `${note.title.padEnd(32)} ${note.path}`)
  }
}

function jsonOut(value: unknown): void {
  console.log(JSON.stringify(value, null, 2))
}

/* ── hygiene: what git work sits on exactly one disk ────────────────────── */

const HYGIENE_MARK: Record<HygieneReport['summary']['level'], string> = {
  ok: 'ok  ', attention: '!!  ', risk: 'XX  ',
}

/**
 * One screen a human can act on: the verdict first, then each finding with the
 * command that fixes it, then the inventory behind it.
 */
function renderHygiene(report: HygieneReport): void {
  console.log(`${HYGIENE_MARK[report.summary.level]}${report.summary.text}`)
  for (const finding of report.findings) {
    console.log(`\n    ${LEVEL_WORD[finding.level]}: ${finding.text}`)
    console.log(`    fix: ${finding.fix}`)
    for (const path of finding.paths.slice(0, 5)) console.log(`      ${path}`)
    if (finding.paths.length > 5) console.log(`      … and ${finding.paths.length - 5} more`)
  }
  const free = report.diskFreeGb === null ? 'unknown' : `${report.diskFreeGb} GB`
  console.log(`\n${report.checkouts.length} checkout(s), ${free} free`)
  for (const checkout of report.checkouts) {
    const flags = [
      (checkout.dirtyFiles ?? 0) > 0 ? `${checkout.dirtyFiles} dirty` : null,
      (checkout.untrackedFiles ?? 0) > 0 ? `${checkout.untrackedFiles} untracked` : null,
      (checkout.stashes ?? 0) > 0 ? `${checkout.stashes} stash` : null,
      checkout.unpushed.length > 0 ? `${checkout.unpushed.length} unpushed` : null,
      checkout.orphan ? 'orphan' : null,
      checkout.staleDays !== null ? `${checkout.staleDays}d old` : null,
      checkout.sizeMb !== null ? `${checkout.sizeMb} MB` : null,
    ].filter((flag): flag is string => flag !== null)
    console.log(`  ${(checkout.branch ?? '-').padEnd(28)} ${checkout.path}` +
      (flags.length > 0 ? `\n      ${flags.join('   ')}` : ''))
  }
  if (report.unavailable.length > 0) {
    console.log(`\n${report.unavailable.length} reading(s) unavailable: ${report.unavailable.slice(0, 3).join('; ')}` +
      (report.unavailable.length > 3 ? ' …' : ''))
  }
}

const LEVEL_WORD: Record<HygieneReport['summary']['level'], string> = {
  ok: 'ok', attention: 'attention', risk: 'risk',
}

/**
 * The rescue is a separate verb for a reason: it is the only hygiene action
 * that writes, so it happens only when a human types it. It prints exactly what
 * the W1 method promises — the ref, the commit, and the proof that neither the
 * working tree nor the real index nor HEAD moved.
 */
function renderSnapshots(result: WipSnapshotResult): void {
  console.log(`wip-snapshot ${result.date}: ${result.created} rescued, ${result.skipped} had nothing to save`)
  for (const entry of result.entries) {
    if (entry.ref === null) {
      console.log(`\n    FAILED: ${entry.checkout}`)
      if (entry.error !== null) console.log(`      ${entry.error}`)
      continue
    }
    console.log(`\n    ${entry.branch ?? '(detached)'}  ${entry.checkout}`)
    console.log(`      ${entry.ref}  ${entry.commit?.slice(0, 12)}  ${entry.files} file(s)`)
    const proofs = [
      entry.treeUnchanged ? 'tree unchanged' : 'TREE CHANGED',
      entry.indexUnchanged ? 'index unchanged' : 'INDEX CHANGED',
      entry.headUnchanged ? 'HEAD unchanged' : 'HEAD MOVED',
    ]
    console.log(`      ${proofs.join('   ')}`)
  }
  if (result.unavailable.length > 0) {
    console.log(`\n${result.unavailable.length} rescue(s) did not complete: ${result.unavailable.slice(0, 3).join('; ')}` +
      (result.unavailable.length > 3 ? ' …' : ''))
  }
}

function hygieneCommand(args: string[]): void {
  const repo = flagValue(args, '--repo')
  if (args.includes('--wip-snapshot') && repo !== null) {
    // `--repo <path>` rescues one repository the brain never registered — the
    // fix the machine-wide census names for work outside the brain. Only ever
    // reached because a human typed the command.
    const result = singleRepoSnapshot(resolve(repo))
    if (args.includes('--json')) return jsonOut(result)
    renderSnapshots(result)
    return
  }
  const workspaceId = flagValue(args, '--workspace') ?? singleWorkspaceId()
  if (args.includes('--wip-snapshot')) {
    const result = createWipSnapshots(db, workspaceId)
    if (args.includes('--json')) return jsonOut(result)
    renderSnapshots(result)
    return
  }
  const report = hygieneReport(db, workspaceId)
  if (args.includes('--json')) return jsonOut(report)
  renderHygiene(report)
}

/** Wrap one repository's rescue in the same result shape the batch prints. */
function singleRepoSnapshot(path: string): WipSnapshotResult {
  const entries: WipSnapshotEntry[] = [snapshotRepo(path)]
  return {
    workspace: workspaceIdFor(path),
    date: new Date().toISOString().slice(0, 10),
    created: entries.filter(entry => entry.ref !== null).length,
    skipped: entries.filter(entry => entry.ref === null && entry.error === null).length,
    entries,
    unavailable: [],
  }
}

/* ── machine / repos: the hardware and every git repository ─────────────── */

function renderMachine(report: MachineReport): void {
  console.log(`machine checked ${report.checkedAt}`)
  for (const drive of report.drives) {
    console.log(`  ${LEVEL_WORD[drive.level].padEnd(9)} ${drive.mount.padEnd(4)} ` +
      `${drive.freeGb} GB free of ${drive.totalGb} GB`)
  }
  const pagefile = report.pagefile.sizeGb === null ? 'unavailable' : `${report.pagefile.sizeGb} GB`
  const ram = report.memory.freeGb === null || report.memory.totalGb === null
    ? 'unavailable'
    : `${report.memory.freeGb} GB free of ${report.memory.totalGb} GB`
  const cpu = report.cpu.load === null ? 'unavailable' : `${Math.round(report.cpu.load * 100)} % busy`
  console.log(`  pagefile  ${pagefile}`)
  console.log(`  memory    ${ram}`)
  console.log(`  cpu       ${cpu}`)
  for (const forecast of report.forecast) {
    const full = forecast.fullInHours === null
      ? `steady (${forecast.trendGbPerHour} GB/h)`
      : `full in ~${forecast.fullInHours} h (${forecast.trendGbPerHour} GB/h)`
    console.log(`  forecast  ${forecast.mount} ${full}, ${forecast.basis}`)
  }
  for (const finding of report.findings) {
    console.log(`\n    ${LEVEL_WORD[finding.level]}: ${finding.text}`)
    console.log(`    fix: ${finding.fix}`)
  }
  if (report.unavailable.length > 0) console.log(`\nunavailable: ${report.unavailable.join(', ')}`)
}

function machineCommand(args: string[]): void {
  const report = machineReport(db)
  if (args.includes('--json')) return jsonOut(report)
  renderMachine(report)
}

function renderRepos(census: CensusReport, dirtyOnly: boolean): void {
  console.log(`${census.repos.length} repo(s)${dirtyOnly ? ' with unsaved work' : ''}` +
    `${census.complete ? '' : ' (scan hit its limit; run again with --json to see the roots)'}`)
  for (const repo of census.repos) {
    const flags = [
      repo.registered ? 'registered' : 'outside brain',
      (repo.dirtyFiles ?? 0) > 0 ? `${repo.dirtyFiles} dirty` : null,
      (repo.untrackedFiles ?? 0) > 0 ? `${repo.untrackedFiles} untracked` : null,
      repo.unpushed.length > 0 ? `${repo.unpushed.length} unpushed` : null,
      repo.orphanWorktrees > 0 ? `${repo.orphanWorktrees} orphan worktree(s)` : null,
      repo.stashes !== null && repo.stashes > 0 ? `${repo.stashes} stash` : null,
      repo.lastCommitDays !== null ? `${repo.lastCommitDays}d old` : null,
      repo.gitSizeMb !== null ? `${repo.gitSizeMb} MB` : null,
    ].filter((flag): flag is string => flag !== null)
    console.log(`  ${(repo.branch ?? '-').padEnd(24)} ${repo.path}`)
    console.log(`      ${flags.join('   ')}`)
  }
  if (census.unavailable.length > 0) console.log(`\nunavailable: ${census.unavailable.join(', ')}`)
}

function reposCommand(args: string[]): void {
  const dirtyOnly = args.includes('--dirty')
  const census = gitCensus(db, args.includes('--refresh') ? { refresh: true } : {})
  const repos = dirtyOnly
    ? census.repos.filter(repo => (repo.dirtyFiles ?? 0) > 0 || (repo.untrackedFiles ?? 0) > 0)
    : census.repos
  const view: CensusReport = { ...census, repos }
  if (args.includes('--json')) return jsonOut(view)
  renderRepos(view, dirtyOnly)
}

function notesSearch(args: string[]): void {
  const asJson = args.includes('--json')
  const text = args.filter(arg => !arg.startsWith('--') && !/^\d+$/.test(arg)).join(' ')
  if (text.trim() === '') {
    console.error('usage: plugbrain notes search <text> [--limit <n>] [--json]')
    process.exit(1)
  }
  // `--lines` opens each hit so the reader can be sent to the passage, not
  // just to the file: that is the difference between a search and a search you
  // can act on.
  const withLines = args.includes('--lines')
  const result = searchNotesWithLines(db, singlePlanetId(), notesAgent(), text, {
    limit: Number(flagValue(args, '--limit') ?? 50),
    lines: withLines,
  })
  if (asJson) return jsonOut(result)
  console.log(`${result.total} note(s) contain '${result.query}'`)
  for (const hit of result.hits) {
    console.log(`  ${hit.path}${hit.line === null ? '' : `:${hit.line}`}`)
    if (hit.snippet !== null) console.log(`      ${hit.snippet}`)
  }
}

function notesRead(args: string[]): void {
  const relPath = args.find(arg => !arg.startsWith('--'))
  if (!relPath) { console.error('usage: plugbrain notes read <path> [--json]'); process.exit(1) }
  const note = readNote(db, singlePlanetId(), notesAgent(), relPath)
  if (args.includes('--json')) return jsonOut(note)
  console.log(`${note.title}  (${note.path})`)
  console.log(`  version ${note.hash}  ${note.bytes} bytes  ${note.indexStale ? 'STALE in index' : 'indexed'}`)
  if (note.generated) console.log('  machine-generated: an edit will be overwritten by the tracker')
  const keys = new Map<string, string[]>()
  for (const property of note.properties) {
    const list = keys.get(property.key)
    if (list) list.push(property.value); else keys.set(property.key, [property.value])
  }
  for (const [key, values] of keys) console.log(`  ${key.padEnd(18)} ${values.filter(Boolean).join(', ')}`)
  console.log(`  links ${note.links.length}  backlinks ${note.backlinks.length}`)
  for (const backlink of note.backlinks) console.log(`    ← ${backlink.path}:${backlink.line}`)
  for (const link of note.links) {
    console.log(`    → ${link.target}${link.alias ? ` (${link.alias})` : ''}  [${link.status}]`)
  }
}

function notesBacklinks(args: string[]): void {
  const relPath = args.find(arg => !arg.startsWith('--'))
  if (!relPath) { console.error('usage: plugbrain notes backlinks <path>'); process.exit(1) }
  const rows = backlinksOf(db, singlePlanetId(), relPath)
  if (args.includes('--json')) return jsonOut(rows)
  if (rows.length === 0) { console.log('nobody links here'); return }
  for (const row of rows) console.log(`  ${row.path}:${row.line}${row.alias ? ` (${row.alias})` : ''}`)
}

function notesGraph(args: string[]): void {
  const graph = noteGraph(db, singlePlanetId(), {
    focus: flagValue(args, '--focus'),
    depth: Number(flagValue(args, '--depth') ?? 1),
    filter: flagValue(args, '--filter'),
    limit: Number(flagValue(args, '--limit') ?? 600),
  })
  if (args.includes('--json')) return jsonOut(graph)
  console.log(`${graph.nodes.length} of ${graph.coverage.notesInScope} notes` +
    `  ${graph.edges.length} links` + (graph.focus ? `  focus ${graph.focus} depth ${graph.depth}` : ''))
  for (const group of graph.groups) {
    console.log(`  ${group.name.padEnd(16)} ${String(group.count).padStart(4)}  hue ${String(group.hue).padStart(3)}  ${group.color}`)
  }
  if (graph.coverage.truncated) console.log(`  TRUNCATED at ${graph.nodes.length}`)
}

function notesWrite(args: string[]): void {
  const relPath = args.find(arg => !arg.startsWith('--'))
  if (!relPath) {
    console.error('usage: plugbrain notes write <path> --from <file>|--content <text> [--expect <hash>] [--allow-generated]')
    process.exit(1)
  }
  const from = flagValue(args, '--from')
  const inline = flagValue(args, '--content')
  if (from === null && inline === null) {
    console.error('refusing to write an empty note: pass --from <file> or --content <text>')
    process.exit(1)
  }
  const content = from === null ? String(inline) : readFileSync(from, 'utf8')
  const expected = flagValue(args, '--expect')
  const result = writeNote(db, singlePlanetId(), notesAgent(), relPath, content, {
    ...(expected === null ? {} : { expectedHash: expected }),
    allowGenerated: args.includes('--allow-generated'),
  })
  if (args.includes('--json')) return jsonOut(result)
  console.log(`${result.created ? 'created' : 'wrote'} ${result.path}`)
  console.log(`  version ${result.hash}  ${result.bytes} bytes  by ${result.agent}`)
  console.log(`  ${result.indexed ? 'indexed immediately' : 'not part of the index'}`)
}

function planetLog(only?: string, limit = 50): void {
  const id = only ?? singlePlanetId()
  const rows = planetHistory(db, id, limit)
  if (rows.length === 0) { console.log('nothing deleted or renamed yet'); return }
  for (const row of rows) {
    console.log(`  ${row.deletedAt}  ${row.reason.padEnd(8)} gen ${row.generation}  ${row.path}`)
  }
}

/** The free text of a command: every argument that is neither a flag nor a flag's value. */
function textArgs(args: string[], valued: string[]): string[] {
  const out: string[] = []
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]!
    if (valued.includes(arg)) { index += 1; continue }
    if (arg.startsWith('--')) continue
    out.push(arg)
  }
  return out
}

function intelQuery(args: string[]): void {
  // `query brain core --limit 6` used to search for "brain core 6".
  const query = textArgs(args, ['--repo', '--limit', '--workspace']).join(' ')
  if (!query) {
    console.error('usage: plugbrain query <search_query> [--repo <name>] [--limit <n>] [--json]')
    process.exit(1)
  }
  const repo = flagValue(args, '--repo') ?? undefined
  const workspace = flagValue(args, '--workspace') ?? undefined
  const limit = Number(flagValue(args, '--limit') ?? 25)
  const result = intel.conceptSearch(db, query, { limit, repoId: repo, workspaceId: workspace })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(`Query: "${result.query}" (${result.timingMs} ms, ${result.total} total hits)\n`)
    if (result.symbols.length > 0) {
      console.log(`Symbols (${result.symbols.length}):`)
      for (const s of result.symbols) {
        const v = s.isVendor ? ` [vendor: ${s.vendorReason ?? 'external'}]` : ''
        console.log(`  ${s.kind.padEnd(12)} ${s.name.padEnd(28)} ${s.file}:${s.line}${v}`)
      }
      console.log('')
    }
    if (result.notes.length > 0) {
      console.log(`Notes (${result.notes.length}):`)
      for (const n of result.notes) {
        console.log(`  ${n.title} (${n.path})`)
        if (n.snippet) console.log(`    ${n.snippet}`)
      }
      console.log('')
    }
    if (result.flows.length > 0) {
      console.log(`Execution Flows (${result.flows.length}):`)
      for (const f of result.flows) {
        console.log(`  [${f.processType}] ${f.label}`)
      }
      console.log('')
    }
  }
}

/**
 * `plugbrain ask "where is X defined?"` — the same plain-language answer the
 * HTTP route and the MCP tool give, printed for a human or emitted as JSON.
 * One workspace has to be named when several are registered, exactly as for the
 * read routes: guessing which project a question is about would be a lie.
 */
function askCommand(args: string[]): void {
  const question = textArgs(args, ['--workspace', '--limit']).join(' ').trim()
  if (!question) {
    console.error('usage: plugbrain ask "<question>" [--workspace <id>] [--limit <n>] [--json]')
    process.exit(1)
  }
  let workspaceId = flagValue(args, '--workspace')
  if (!workspaceId) {
    const rows = db.prepare('SELECT id FROM workspaces ORDER BY created_at LIMIT 2').all() as
      Array<{ id: string }>
    if (rows.length !== 1) {
      console.error(rows.length === 0
        ? 'no workspace registered'
        : 'several workspaces registered — name one with --workspace <id>')
      process.exit(2)
    }
    workspaceId = rows[0].id
  }
  const limit = Number(flagValue(args, '--limit') ?? 5)
  const answer = askQuestion(db, { workspaceId, question, limit })
  if (args.includes('--json')) {
    jsonOut(answer)
    return
  }
  console.log(answer.answer)
  if (answer.sources.length > 0) {
    console.log('')
    for (const source of answer.sources) {
      console.log(`  ${source.path}:${source.line}  ${source.symbol}  (${source.why})`)
    }
  }
  console.log('')
  console.log(`intent ${answer.intent} · tool ${answer.tool} · confidence ${answer.confidence}`)
  if (answer.unavailable.length > 0) console.log(`unavailable: ${answer.unavailable.join('; ')}`)
  if (answer.followUps.length > 0) console.log(`follow-ups: ${answer.followUps.join(' · ')}`)
}

function intelContext(args: string[]): void {
  const name = args.find(a => !a.startsWith('--'))
  if (!name) {
    console.error('usage: plugbrain context <symbol_name> [--file <path>] [--repo <id>] [--workspace <id>] [--json]')
    process.exit(1)
  }
  const file = flagValue(args, '--file') ?? undefined
  const repo = flagValue(args, '--repo') ?? undefined
  const workspace = flagValue(args, '--workspace') ?? undefined
  const result = intel.getSymbolContext(db, name, { file, repoId: repo, workspaceId: workspace })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    if (result.status === 'not_found') {
      console.log(`Symbol '${name}' not found.`)
    } else if (result.status === 'ambiguous') {
      console.log(`Ambiguous symbol '${name}' (${result.candidates?.length} candidates):`)
      for (const c of result.candidates ?? []) {
        console.log(`  ${c.kind} in ${c.file}:${c.line}`)
      }
    } else if (result.symbol) {
      const s = result.symbol
      const v = s.isVendor ? ` [vendor: ${s.vendorReason ?? 'external'}]` : ''
      console.log(`Symbol: ${s.name} (${s.kind}) in ${s.file}:${s.line}${v}\n`)
      console.log(`Incoming Calls (${result.incoming.calls.length}):`)
      for (const c of result.incoming.calls) {
        console.log(`  <- ${c.name} (${c.kind}) in ${c.file}:${c.line}`)
      }
      console.log(`\nOutgoing Calls (${result.outgoing.calls.length}):`)
      for (const c of result.outgoing.calls) {
        console.log(`  -> ${c.name} (${c.kind}) in ${c.file}:${c.line}`)
      }
      if (result.processes.length > 0) {
        console.log(`\nExecution Flows (${result.processes.length}):`)
        for (const p of result.processes) {
          console.log(`  [${p.processType}] ${p.label}`)
        }
      }
    }
  }
}

function intelImpact(args: string[]): void {
  const target = args.find(a => !a.startsWith('--'))
  if (!target) {
    console.error('usage: plugbrain impact <symbol_name> [--direction upstream|downstream|both] [--depth <n>] [--workspace <id>] [--json]')
    process.exit(1)
  }
  const direction = (flagValue(args, '--direction') ?? 'both') as 'upstream' | 'downstream' | 'both'
  const maxDepth = Number(flagValue(args, '--depth') ?? 3)
  const result = intel.getBlastRadius(db, target, {
    direction,
    maxDepth,
    workspaceId: flagValue(args, '--workspace') ?? undefined,
    repoId: flagValue(args, '--repo') ?? undefined,
  })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(`Blast Radius for: ${result.target.name} (${result.target.file ?? ''})`)
    console.log(`Direction: ${result.direction} | Max Depth: ${result.maxDepth} | Total Impacted: ${result.totalImpacted} | Risk: ${result.risk.toUpperCase()}\n`)
    for (const [depth, nodes] of Object.entries(result.nodes)) {
      console.log(`Depth ${depth} (${nodes.length} nodes):`)
      for (const n of nodes) {
        console.log(`  ${n.relationType} ${n.name} (${n.kind}) in ${n.file} (conf: ${n.confidence})`)
      }
    }
  }
}

function intelDetectChanges(args: string[]): void {
  const path = flagValue(args, '--path') ?? undefined
  const workspaceId = flagValue(args, '--workspace') ?? singleWorkspaceId()
  const result = intel.detectChanges(db, { workspaceId, checkoutPath: path })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(`Changed Files: ${result.changedFiles} | Changed Symbols: ${result.changedSymbols.length} | Risk: ${result.riskLevel.toUpperCase()}`)
    if (result.changedSymbols.length > 0) {
      console.log('\nAffected Symbols:')
      for (const s of result.changedSymbols) {
        console.log(`  [${s.changeType}] ${s.name} (${s.kind}) in ${s.file}:${s.line}`)
      }
    }
    if (result.affectedFlows.length > 0) {
      console.log('\nAffected Flows:')
      for (const f of result.affectedFlows) {
        console.log(`  ${f.flow} (affected by: ${f.affectedBy.join(', ')})`)
      }
    }
  }
}

function intelCypher(args: string[]): void {
  const query = args.filter(a => !a.startsWith('--')).join(' ')
  if (!query) {
    console.error('usage: plugbrain cypher <query> [--limit <n>] [--json]')
    process.exit(1)
  }
  const limit = Number(flagValue(args, '--limit') ?? 50)
  const result = intel.executeCypherQuery(db, query, { limit })
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log(result.markdown)
    console.log(`\n(${result.rowCount} row(s), ${result.timingMs} ms)`)
  }
}

function intelStatus(args: string[]): void {
  const workspaceId = flagValue(args, '--workspace') ?? singleWorkspaceId()
  const result = intel.getIntelStatus(db, workspaceId)
  if (args.includes('--json')) {
    jsonOut(result)
  } else {
    console.log('PlugBrain Code Intelligence Status:')
    console.log(`  Planet:          ${result.planetId}`)
    console.log(`  Workspace:       ${result.workspaceId}`)
    console.log(`  Repositories:    ${result.repos}`)
    console.log(`  Checkouts:       ${result.checkouts} (${result.dirtyCheckouts} dirty)`)
    console.log(`  Files:           ${result.files}`)
    console.log(`  Symbols:         ${result.symbols}`)
    console.log(`  Edges:           ${result.edges}`)
    console.log(`  Staleness:       ${result.staleness.isStale ? 'STALE' : 'CLEAN'} (${result.staleness.dirtyFiles} dirty files, ${result.staleness.untrackedFiles} untracked)`)
  }
}

function status(): void {
  const ws = db.prepare('SELECT id, name, root, indexed_at FROM workspaces').all() as
    { id: string; name: string; root: string; indexed_at: string | null }[]
  if (ws.length === 0) { console.log('no workspaces registered'); return }
  for (const w of ws) {
    const files = db.prepare('SELECT COUNT(*) c FROM files WHERE workspace_id = ?').get(w.id) as { c: number }
    const syms = db.prepare(
      'SELECT COUNT(*) c FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)').get(w.id) as { c: number }
    const edges = db.prepare('SELECT COUNT(*) c FROM edges WHERE workspace_id = ?').get(w.id) as { c: number }
    console.log(`\n${w.name}  ${w.id}`)
    console.log(`  ${w.root}`)
    console.log(`  indexed: ${w.indexed_at ?? 'never'}`)
    console.log(`  files ${files.c}  symbols ${syms.c}  edges ${edges.c}  → nodes ${files.c + syms.c}`)
    const byKind = db.prepare(
      `SELECT kind, COUNT(*) c FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)
       GROUP BY kind ORDER BY c DESC`).all(w.id) as { kind: string; c: number }[]
    if (byKind.length > 0) console.log('  symbols by kind: ' + byKind.map(k => `${k.kind} ${k.c}`).join(', '))
    const byEdge = db.prepare(
      `SELECT kind, COUNT(*) c FROM edges WHERE workspace_id = ? GROUP BY kind ORDER BY c DESC`).all(w.id) as
      { kind: string; c: number }[]
    if (byEdge.length > 0) console.log('  edges by kind:   ' + byEdge.map(k => `${k.kind} ${k.c}`).join(', '))
    const langs = db.prepare(
      `SELECT lang, COUNT(*) c FROM files WHERE workspace_id = ? AND lang IS NOT NULL GROUP BY lang ORDER BY c DESC`)
      .all(w.id) as { lang: string; c: number }[]
    if (langs.length > 0) console.log('  languages:       ' + langs.map(l => `${l.lang} ${l.c}`).join(', '))
  }
}

function search(query: string): void {
  const rows = db.prepare(
    `SELECT name, path, kind FROM search WHERE search MATCH ? LIMIT 25`).all(`${query}*`) as
    { name: string; path: string; kind: string }[]
  if (rows.length === 0) { console.log('no matches'); return }
  for (const r of rows) console.log(`  ${r.kind.padEnd(12)} ${r.name.padEnd(34)} ${r.path}`)
}

/** Agent-facing commands. These are the only sanctioned way to touch a workspace. */
function attach(workspaceId: string, agentId: string): void {
  ensureAgent(db, agentId)
  console.log(renderBriefing(buildBriefing(db, workspaceId, agentId)))
}

function agentRead(workspaceId: string, agentId: string, path: string): void {
  const r = access.readFile(db, workspaceId, agentId, path)
  console.log(`--- ${r.path} (${r.bytes} bytes, ${r.lang ?? 'unknown'}) ---`)
  console.log(r.content.length > 4000 ? r.content.slice(0, 4000) + '\n… truncated' : r.content)
}

function agentWrite(workspaceId: string, agentId: string, path: string, content: string): void {
  const r = access.writeFile(db, workspaceId, agentId, path, content, `task-${agentId}`)
  console.log(`${r.created ? 'created' : 'wrote'} ${r.path} (${r.bytes} bytes) as ${r.agent.name} ${r.agent.color}`)
}

function who(workspaceId: string, path: string): void {
  const p = access.fileProvenance(db, workspaceId, path)
  console.log(`${p.path}`)
  console.log(`  owner: ${p.owner ? JSON.stringify(p.owner) : 'unattributed'}`)
  for (const h of p.history as { action: string; at: string; name: string | null }[]) {
    console.log(`  ${h.at}  ${h.action.padEnd(7)} ${h.name ?? '(no agent)'}`)
  }
}

function agents(): void {
  const rows = db.prepare('SELECT id, name, color, first_seen, last_seen FROM agents ORDER BY first_seen').all() as
    { id: string; name: string; color: string; last_seen: string }[]
  if (rows.length === 0) { console.log('no agents yet'); return }
  for (const a of rows) console.log(`  ${a.color.padEnd(20)} ${a.name.padEnd(24)} last seen ${a.last_seen}`)
}

/** The default port `serve` binds and `init` prints. */
const UI_PORT_DEFAULT = 4310

/** The CLI file named in a client entry: whatever node was asked to run. */
function selfCliPath(): string {
  return process.argv[1] ?? import.meta.filename
}

/**
 * Where the clients' config files live.
 *
 * Normally the user's home, but `PLUGBRAIN_CONFIG_HOME` overrides it so a test
 * (or a sandboxed run) can point at a temp folder and never touch the owner's
 * real configuration. This is separate from `PLUGBRAIN_HOME`, which is the
 * brain STORE, not the clients.
 */
function clientHome(): string {
  const override = process.env.PLUGBRAIN_CONFIG_HOME?.trim()
  return override !== undefined && override !== '' ? override : homedir()
}

/**
 * A compact before/after diff for `setup --dry-run`.
 *
 * Config files change in one place, so a full diff engine would be noise. The
 * common head and tail are skipped and only the changed lines are shown, which
 * is exactly the paragraph a human wants to approve.
 */
function renderEntryDiff(before: string | null, after: string | null): string {
  const a = (before ?? '').split(/\r?\n/)
  const b = (after ?? '').split(/\r?\n/)
  if (a[a.length - 1] === '') a.pop()
  if (b[b.length - 1] === '') b.pop()
  let start = 0
  while (start < a.length && start < b.length && a[start] === b[start]) start += 1
  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) { endA -= 1; endB -= 1 }
  const lines: string[] = []
  for (let i = start; i < endA; i += 1) lines.push(`      - ${a[i]}`)
  for (let i = start; i < endB; i += 1) lines.push(`      + ${b[i]}`)
  return lines.length === 0 ? '      (only whitespace differs)' : lines.join('\n')
}

/** One line per detected client plus its backup, so the human sees every touch. */
function printClientResults(results: ClientSetupResult[], home: string = homedir()): void {
  const verbs: Record<string, string> = {
    created: 'added', updated: 'updated', unchanged: 'unchanged', 'dry-run': 'would change',
    undone: 'restored', skipped: 'skipped', error: 'error',
  }
  const detected = results.filter(r => r.detected)
  for (const r of detected) {
    const verb = verbs[r.action] ?? r.action
    const detail = r.action === 'error' ? `  ${r.error}` : ''
    console.log(`  ${r.label.padEnd(12)} ${verb.padEnd(12)} ${r.path}${detail}`)
    if (r.action === 'dry-run') console.log(renderEntryDiff(r.before, r.after))
    if (r.backupPath) console.log(`      backup: ${r.backupPath}`)
    if (r.restoredFrom) console.log(`      from:   ${r.restoredFrom}`)
    if (r.counterBackupPath) console.log(`      kept:   ${r.counterBackupPath}`)
    if (r.note) console.log(`      note:  ${r.note}`)
  }
  if (detected.length === 0) {
    console.log(`  no supported client found under ${home}`)
  } else {
    const missing = results.length - detected.length
    if (missing > 0) console.log(`  (${missing} client(s) not installed — nothing written for them)`)
  }
}

/**
 * `plugbrain init [path]` — one command from nothing to a usable brain.
 *
 * A vibe coder stands in a project folder and types one word. This registers
 * the folder (its git root when it is a repository), indexes it where they can
 * watch, prints where the UI will be, and teaches every client it can find to
 * start us. Running it twice changes nothing.
 */
function initCommand(args: string[]): void {
  const dryRun = args.includes('--dry-run')
  const given = args.find(arg => !arg.startsWith('--'))
  const dir = resolve(given ?? process.cwd())
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    console.error(`not a directory: ${dir}`)
    process.exit(2)
  }
  const root = findGitRoot(dir) ?? dir
  if (dryRun) console.log('dry run (nothing is written):')
  const record = dryRun ? planWorkspaceRoot(db, root) : registerWorkspaceRoot(db, root)
  const state = record.created
    ? (dryRun ? 'would register' : 'registered')
    : 'already known'
  console.log(`${state} workspace ${record.name}`)
  console.log(`  workspace ${record.id}`)
  console.log(`  root      ${resolve(root)}`)
  if (dryRun) {
    console.log(`  would index ${record.name}`)
  } else {
    process.stdout.write(`indexing ${record.name} …\n`)
    reportIndex(record.name, runIndexInProcess(db, record.id, { onProgress: progressPrinter(record.name) }))
  }

  console.log(`\nUI: http://127.0.0.1:${UI_PORT_DEFAULT}/  (start it with: plugbrain serve)`)

  if (args.includes('--no-clients')) return
  const home = clientHome()
  const entry = buildEntry(selfCliPath())
  const results = setupClients({ home, entry, dryRun })
  console.log('\nclients:')
  printClientResults(results, home)
  console.log(`\nOpen your project in a client above and ask it to use PlugBrain.`)
}

/**
 * `plugbrain setup [--all|claude|…] [--dry-run] [--undo]` — write the MCP
 * entry into the clients' own config files. `init` calls the same engine.
 */
function setupCommand(args: string[]): void {
  const dryRun = args.includes('--dry-run')
  const undo = args.includes('--undo')
  const { only, unknown } = parseClientSelection(args)
  if (unknown.length > 0) {
    console.error(`unknown client(s): ${unknown.join(', ')}`)
    console.error(`known: ${CLIENTS.map(client => client.id).join(', ')}  (or --all)`)
    process.exit(1)
  }
  const home = clientHome()
  const entry = buildEntry(selfCliPath())
  const results = setupClients({ home, entry, only, dryRun, undo })
  if (undo) console.log('undo:')
  else if (dryRun) console.log('dry run (nothing is written):')
  else console.log('setup:')
  printClientResults(results, home)
}

const [command, ...args] = process.argv.slice(2)
try {
switch (command) {
  case 'register': register(args[0], args[1]); break
  case 'index': indexAll(args[0]); break
  case 'status': status(); break
  case 'search': search(args.join(' ')); break
  case 'attach': attach(args[0], args[1]); break
  case 'read': agentRead(args[0], args[1], args[2]); break
  case 'write': agentWrite(args[0], args[1], args[2], args.slice(3).join(' ')); break
  case 'who': who(args[0], args[1]); break
  case 'agents': agents(); break
  case 'swarm': process.exitCode = runSwarmCli(db, args, singlePlanetId); break
  case 'progress': {
    progressReport(args[0])
    break
  }
  case 'planet': {
    const [step, ...rest] = args
    if (step === 'register') planetRegister(rest[0], rest[1])
    else if (step === 'select') planetSelect(rest)
    else if (step === 'scan') planetScan(rest[0])
    else if (step === 'status') planetStatus(rest[0])
    else if (step === 'history') planetLog(rest[0])
    else if (step === 'prune') planetPrune(rest)
    else {
      console.error('usage: plugbrain planet <register|select|scan|status|history|prune> [path|workspaceId]')
      process.exit(1)
    }
    break
  }
  case 'compact': compact(); break
  case 'plan': planCommand(args); break
  case 'hygiene': hygieneCommand(args); break
  case 'machine': machineCommand(args); break
  case 'repos': reposCommand(args); break
  case 'notes': {
    const [step, ...rest] = args
    if (step === 'query') notesQuery(rest)
    else if (step === 'search') notesSearch(rest)
    else if (step === 'read') notesRead(rest)
    else if (step === 'write') notesWrite(rest)
    else if (step === 'graph') notesGraph(rest)
    else if (step === 'backlinks') notesBacklinks(rest)
    else if (step === 'list') {
      const result = listNotes(db, singlePlanetId(), { limit: Number(flagValue(rest, '--limit') ?? 200) })
      if (rest.includes('--json')) jsonOut(result)
      else {
        console.log(`${result.total} note(s)`)
        for (const note of result.notes) {
          console.log(`  ${(note.typ ?? '-').padEnd(13)} ${(note.stand ?? '-').padEnd(10)} ` +
            `${note.title.padEnd(32)} →${note.outLinks} ←${note.inLinks}`)
        }
      }
    } else {
      console.error('usage: plugbrain notes <list|query|search|read|write|graph|backlinks> …')
      process.exit(1)
    }
    break
  }
  case 'ask': askCommand(args); break
  case 'query': intelQuery(args); break
  case 'context': intelContext(args); break
  case 'impact': intelImpact(args); break
  case 'detect-changes':
  case 'detect_changes': intelDetectChanges(args); break
  case 'cypher': intelCypher(args); break
  case 'intel-status': intelStatus(args); break
  case 'intel': {
    const [step, ...rest] = args
    if (step === 'query') intelQuery(rest)
    else if (step === 'context') intelContext(rest)
    else if (step === 'impact') intelImpact(rest)
    else if (step === 'detect-changes' || step === 'detect_changes') intelDetectChanges(rest)
    else if (step === 'cypher') intelCypher(rest)
    else if (step === 'status') intelStatus(rest)
    else {
      console.error('usage: plugbrain intel <query|context|impact|detect-changes|cypher|status> …')
      process.exit(1)
    }
    break
  }
  case 'serve': {
    const port = Number(flagValue(args, '--port') ?? (args[0] && !args[0].startsWith('--') ? args[0] : 4310))
    // ui-dist has to be found both from src/ (a source run) and from next to a
    // built bundle (a standalone install), so resolve by candidate instead of
    // assuming one layout. Without the first candidate the bundled daemon
    // serves an empty UI, because import.meta.dirname then points at dist/.
    const uiRoot = resolveUiRoot()
    // The daemon runs inside serve by default: a brain that is only correct
    // when a human remembers to re-index is not a system of record. It gets
    // the store path so its runs happen in a worker instead of in the event
    // loop that serves the UI.
    if (process.env.PLUGBRAIN_NO_DAEMON !== '1') startDaemon(db, { dbFile: DB_FILE })
    const tokenFile = join(HOME, 'auth.token')
    let authKey = process.env.PLUG_BRAIN_AUTH_KEY
    if (!authKey) {
      if (existsSync(tokenFile)) {
        authKey = readFileSync(tokenFile, 'utf8').trim()
      } else {
        authKey = `plug-${randomUUID().replace(/-/g, '')}`
        try {
          writeFileSync(tokenFile, authKey, { mode: 0o600 })
        } catch (err) {
          console.error(`warning: could not write auth token file: ${(err as Error).message}`)
        }
      }
    }
    // The home rides along so the server publishes core.json where consumers
    // (the operator, the desktop shell) look for the one canonical endpoint.
    startServer({ db, dbFile: DB_FILE, uiRoot, authKey, requireAuth: true, home: HOME }, port).then(actual => {
      console.log(`PlugBrain serving on http://127.0.0.1:${actual}`)
      console.log(`  UI       http://127.0.0.1:${actual}/`)
      console.log(`  Galaxy   http://127.0.0.1:${actual}/api/galaxy`)
      console.log(`  Auth     Bearer token configured (${tokenFile})`)
    })
    break
  }
  case 'init': initCommand(args); break
  case 'setup': setupCommand(args); break
  case 'mcp': {
    // No `--workspace` is the normal case now: the client starts the server in
    // the project folder, so the folder states the workspace. `--workspace`
    // stays as an explicit override and `PLUGBRAIN_WORKSPACE` as the machine's.
    const override = flagValue(args, '--workspace')
    const authKey = flagValue(args, '--auth-key') ?? process.env.PLUG_BRAIN_AUTH_KEY ?? null
    const resolution = resolveMcpWorkspace({ db, cwd: process.cwd(), override })
    if (resolution.source === 'none') {
      // Start anyway: a refusal must reach the client as a tool error, not as a
      // server that died before it could answer `initialize`.
      console.error(`plugbrain mcp: ${resolution.reason}`)
      startMcpServer({ db, authKey, workspaceError: resolution.reason })
      break
    }
    if (resolution.needsIndex) {
      // A just-registered git root has a cold index; warm it in the background
      // so the server answers at once. Indexing is best-effort: a busy or
      // unpackaged worker is reported, never fatal.
      try {
        startIndexRun(resolution.workspaceId, { dbFile: DB_FILE })
        console.error(`plugbrain mcp: indexing ${resolution.root} in the background …`)
      } catch (error) {
        console.error(`plugbrain mcp: could not start indexing ${resolution.root}: ` +
          `${error instanceof Error ? error.message : String(error)}`)
      }
    }
    startMcpServer({ db, workspaceId: resolution.workspaceId, authKey })
    break
  }
  case 'backup': {
    const target = args[0] ? resolve(args[0]) : join(HOME, 'backups', `plugbrain-backup-${Date.now()}.db`)
    const result = backupStore(db, target)
    console.log(`backup created: ${result.path} (${result.bytes} bytes in ${result.durationMs}ms)`)
    break
  }
  case 'restore': {
    const source = args[0]
    if (!source) {
      console.error('usage: plugbrain restore <path-to-backup-file>')
      process.exit(1)
    }
    try { db.close() } catch { /* ignore */ }
    const result = restoreStore(source, DB_FILE)
    console.log(`restored database from: ${result.sourcePath}`)
    console.log(`  target:     ${result.targetDbPath}`)
    console.log(`  workspaces: ${result.workspaces}`)
    console.log(`  files:      ${result.files}`)
    console.log(`  symbols:    ${result.symbols}`)
    console.log(`  notes:      ${result.notes}`)
    break
  }
  default:
    console.log(
      'usage: plugbrain <init|setup|register|index|progress|status|search|attach|read|write|who|agents|swarm|serve|planet|notes|query|context|impact|detect-changes|cypher|intel-status|mcp|backup|restore> …\n' +
      '       plugbrain init [path] [--no-clients] [--dry-run]  register + index + enroll clients\n' +
      '       plugbrain setup [--all|claude|codex|cursor|windsurf|hermes|agy|opencode] [--dry-run] [--undo]\n' +
      '       plugbrain progress [workspaceId]\n' +
      '       plugbrain planet <register|select|scan|status|history> [path|workspaceId]\n' +
      '       plugbrain planet select [workspaceId] --checkout <checkoutId> [--checkout <checkoutId>]\n' +
      '       plugbrain notes <list|query|search|read|write|graph|backlinks> …\n' +
      '       plugbrain intel <query|context|impact|detect-changes|cypher|status> …\n' +
      '       plugbrain hygiene [--workspace <ws>] [--json] [--wip-snapshot] [--repo <path>]\n' +
      '       plugbrain machine [--json]\n' +
      '       plugbrain repos [--dirty] [--refresh] [--json]\n' +
      '       plugbrain swarm <register|turn|ack|board|send|enqueue|deliver|approve|resources|quota|admit|watchdog|review-pool> …\n' +
      '       plugbrain mcp [--workspace <ws>] [--auth-key <key>]   (workspace from cwd when omitted)\n' +
      '       plugbrain backup [target_path]\n' +
      '       plugbrain restore <backup_path>')
    process.exit(1)
}
} catch (error) {
  // A refused access is a normal answer, not a crash: report it as one line.
  if (error instanceof access.WriteConflictError) {
    console.error(`refused: ${error.message}`)
    for (const conflict of error.verdict.hardConflicts) {
      console.error(`  holder ${conflict.holder.taskId} (${conflict.holder.agentId ?? 'unknown agent'}) → ${conflict.path}`)
    }
    process.exit(3)
  }
  if (error instanceof access.AccessDenied) {
    console.error(`refused: ${error.message}`)
    process.exit(3)
  }
  // Not a failure of the command: another process is already doing this work.
  // A stack trace would suggest a bug where there is only a busy brain.
  if (error instanceof IndexRunBusy) {
    console.error(`not started: ${error.message}`)
    console.error('  wait for it, or watch it with: plugbrain progress')
    process.exit(4)
  }
  throw error
}
