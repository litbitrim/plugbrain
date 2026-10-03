/**
 * CLI worker runners — the Brain starts and watches a worker process itself.
 *
 * Until now the integrator started the three Codex tabs by hand: one prompt
 * template, `gpt-6-luna`, a JSONL log each, and `codexstatus.sh` to read the
 * log back. A lane hosted that way costs the integrator handwork at every turn
 * boundary, and the fleet has no independent way to say whether the process is
 * still alive. This module closes that loop: a runner profile per worker in the
 * store, `swarm run <agent>` to start it detached, and the board showing pid,
 * start time and the last log event.
 *
 * Three rules shape the code:
 *
 *   1. THE BRAIN NEVER GUESSES LIVENESS. `process.kill(pid, 0)` is the only
 *      answer to "is it still there". Nothing is inferred from a quiet log: a
 *      worker reasoning for ten minutes writes nothing and is not dead.
 *   2. THE PROCESS, NOT THE PROMPT, DECIDES THE TURN. A run that disappears
 *      while the worker has not ended its turn is that worker's problem, and
 *      the Brain books it as `blocked` with the log tail — it does not invent
 *      a `needs-task` for a worker that never came back.
 *   3. NO SECRETS IN THE STORE. A profile holds a program, a model and flags.
 *      Codex brings its own login, and BYOK keys stay out of the database.
 */
import { execFileSync, spawn } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, readdirSync, readSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { basename, delimiter, isAbsolute, join, relative, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireAgent, requireWorkspace } from '../access.ts'
import { resolveBrainHome } from '../home.ts'
import { assertNotCredential } from './resources.ts'
import { ensureIntegrator, sendMessage } from './inbox.ts'
import { RUNNER_PROMPT_TEMPLATE } from './runner-prompt.ts'

/** The one worker the Brain reports a broken run to. */
const INTEGRATOR = 'integrator'
/** A turn that ended within this window of the run start still counts as this run's. */
const TURN_END_SLACK_MS = 1000
/** An argv that cannot fit comfortably in a Windows command line is a mistaken prompt. */
const MAX_PROMPT_CHARS = 24_000
/** How much of a log is read to find its last event, and how much is quoted into a summary. */
const LOG_TAIL_BYTES = 64 * 1024
const SUMMARY_LINES = 8
const EVENT_TEXT_CHARS = 200

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

/**
 * One profile per worker and at most one run per worker. History lives in the
 * log files: the row is the live handle the board reads, not an archive.
 */
export function ensureRunnerSchema(db: DatabaseSync): void {
  db.exec(`
CREATE TABLE IF NOT EXISTS worker_runners (
  agent_id   TEXT PRIMARY KEY,
  cmd        TEXT NOT NULL,
  args       TEXT NOT NULL DEFAULT '[]',
  model      TEXT,
  effort     TEXT,
  sandbox    TEXT,
  search     INTEGER NOT NULL DEFAULT 0,
  cwd        TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS worker_runs (
  agent_id        TEXT PRIMARY KEY,
  run_id          TEXT NOT NULL,
  pid             INTEGER,
  started_at      TEXT NOT NULL,
  cwd             TEXT NOT NULL,
  log_path        TEXT NOT NULL,
  last_doc_path   TEXT,
  prompt_path     TEXT,
  command_text    TEXT NOT NULL,
  via_comspec     INTEGER NOT NULL DEFAULT 0,
  log_mtime_ms    INTEGER,
  log_size        INTEGER,
  last_event_at   TEXT,
  last_event_kind TEXT,
  last_event_text TEXT,
  ended_at        TEXT,
  ended_reason    TEXT,
  stopped_at      TEXT,
  blocked_at      TEXT
);
`)
  const columns = db.prepare('PRAGMA table_info(worker_runs)').all() as unknown as Array<{ name: string }>
  if (!columns.some(column => column.name === 'process_started_at')) {
    db.exec('ALTER TABLE worker_runs ADD COLUMN process_started_at TEXT')
  }
  if (!columns.some(column => column.name === 'task_id')) db.exec('ALTER TABLE worker_runs ADD COLUMN task_id TEXT')
  if (!columns.some(column => column.name === 'attempt_token')) db.exec('ALTER TABLE worker_runs ADD COLUMN attempt_token TEXT')
}

// ---------------------------------------------------------------------------
// Runner profile
// ---------------------------------------------------------------------------

export type RunnerSandbox = 'bypass' | 'workspace-write' | 'read-only' | 'danger-full-access'
export const RUNNER_SANDBOXES: readonly RunnerSandbox[] = ['bypass', 'workspace-write', 'read-only', 'danger-full-access']
/** Programs the fleet may launch. `node` is retained for the documented fake-worker harness. */
export const RUNNER_COMMANDS = ['codex', 'claude', 'gemini', 'node'] as const

export interface RunnerProfile {
  agentId: string
  /** The program to start, e.g. `codex` or `node`. */
  cmd: string
  /** Argument template for a non-Codex command; `{prompt}` and `{log}` are filled in. */
  args: string[]
  model: string | null
  effort: string | null
  sandbox: RunnerSandbox | null
  search: boolean
  cwd: string | null
  updatedAt: string
}

interface ProfileDbRow {
  agent_id: string
  cmd: string
  args: string
  model: string | null
  effort: string | null
  sandbox: string | null
  search: number
  cwd: string | null
  updated_at: string
}

const parseJsonArray = (raw: string): string[] => {
  try {
    const value = JSON.parse(raw) as unknown
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch { return [] }
}

const profileOf = (row: ProfileDbRow): RunnerProfile => ({
  agentId: row.agent_id,
  cmd: row.cmd,
  args: parseJsonArray(row.args),
  model: row.model,
  effort: row.effort,
  sandbox: row.sandbox as RunnerSandbox | null,
  search: row.search !== 0,
  cwd: row.cwd,
  updatedAt: row.updated_at,
})

export interface SetRunnerInput {
  agentId: string
  cmd: string
  args?: string[]
  model?: string
  effort?: string
  sandbox?: string
  search?: boolean
  /** Working directory for the process; defaults to the workspace root. */
  cwd?: string
}

const shortField = (name: string, value: string | undefined, max: number): string | null => {
  if (value === undefined) return null
  const trimmed = value.trim()
  if (trimmed === '') return null
  if (trimmed.length > max) throw new AccessDenied(`${name} needs at most ${max} characters`)
  assertNotCredential(name, trimmed)
  return trimmed
}

/** Store the runner profile for a worker. Replaces the previous one. */
export function setRunnerProfile(db: DatabaseSync, input: SetRunnerInput): RunnerProfile {
  ensureRunnerSchema(db)
  requireAgent(db, input.agentId)
  const cmd = shortField('cmd', input.cmd, 200)
  if (cmd === null) throw new AccessDenied('a runner profile needs a program: --cmd <exe>')
  assertAllowedCommand(cmd)
  const sandbox = shortField('sandbox', input.sandbox, 40)
  if (sandbox !== null && !RUNNER_SANDBOXES.includes(sandbox as RunnerSandbox)) {
    throw new AccessDenied(`unknown sandbox: ${sandbox} (${RUNNER_SANDBOXES.join(', ')})`)
  }
  const args = (input.args ?? []).map(token => {
    const trimmed = token.trim()
    if (trimmed.length > 2000) throw new AccessDenied('runner args need at most 2000 characters per token')
    assertNotCredential('args', trimmed)
    return trimmed
  }).filter(token => token !== '')
  const cwd = input.cwd === undefined ? null : resolve(input.cwd)
  if (cwd !== null) {
    const agent = db.prepare('SELECT workspace_id, worktrees FROM agents WHERE id = ?').get(input.agentId) as
      { workspace_id: string; worktrees: string | null } | undefined
    if (agent === undefined) throw new AccessDenied(`unknown agent: ${input.agentId}`)
    validateRunnerCwd(db, agent.workspace_id, agent.worktrees, cwd)
  }
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO worker_runners (agent_id, cmd, args, model, effort, sandbox, search, cwd, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(agent_id) DO UPDATE SET
      cmd = excluded.cmd, args = excluded.args, model = excluded.model, effort = excluded.effort,
      sandbox = excluded.sandbox, search = excluded.search, cwd = excluded.cwd,
      updated_at = excluded.updated_at
  `).run(
    input.agentId, cmd, JSON.stringify(args),
    shortField('model', input.model, 120), shortField('effort', input.effort, 40), sandbox,
    input.search === true ? 1 : 0,
    cwd,
    now,
  )
  return getRunnerProfile(db, input.agentId)!
}

function assertAllowedCommand(cmd: string): void {
  if (/\.(?:cmd|bat)$/i.test(cmd)) throw new AccessDenied(`batch shims are not supported by swarm run: ${cmd}`)
  if (cmd.includes('/') || cmd.includes('\\') || cmd.includes(':')) {
    throw new AccessDenied('runner command must be a known executable name from PATH, not a file path')
  }
  const name = basename(cmd).replace(/\.(?:exe|com|cmd|bat)$/i, '').toLowerCase()
  if (!RUNNER_COMMANDS.includes(name as typeof RUNNER_COMMANDS[number])) {
    throw new AccessDenied(`not an allowed worker command: ${cmd} (allowed: ${RUNNER_COMMANDS.join(', ')})`)
  }
}

function within(root: string, path: string): boolean {
  const rel = relative(root, path)
  return rel === '' || (!rel.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) && rel !== '..' && !isAbsolute(rel))
}

function validateRunnerCwd(db: DatabaseSync, workspaceId: string, worktreesJson: string | null, candidate: string): string {
  const workspace = requireWorkspace(db, workspaceId)
  let actual: string
  try { actual = realpathSync(candidate) } catch { throw new AccessDenied(`runner cwd does not exist: ${candidate}`) }
  let registered: string[] = [workspace.root]
  try {
    const values = worktreesJson === null ? [] : JSON.parse(worktreesJson) as unknown
    if (Array.isArray(values)) registered.push(...values.filter((item): item is string => typeof item === 'string'))
  } catch { /* malformed legacy metadata grants no extra roots */ }
  const accepted = registered.some(root => {
    try { return within(realpathSync(root), actual) } catch { return false }
  })
  if (!accepted) throw new AccessDenied(`runner cwd is outside registered workspace/worktrees: ${candidate}`)
  return actual
}

export function getRunnerProfile(db: DatabaseSync, agentId: string): RunnerProfile | null {
  ensureRunnerSchema(db)
  const row = db.prepare('SELECT * FROM worker_runners WHERE agent_id = ?').get(agentId) as unknown as ProfileDbRow | undefined
  return row === undefined ? null : profileOf(row)
}

export function listRunnerProfiles(db: DatabaseSync): RunnerProfile[] {
  ensureRunnerSchema(db)
  const rows = db.prepare('SELECT * FROM worker_runners ORDER BY agent_id').all() as unknown as ProfileDbRow[]
  return rows.map(profileOf)
}

// ---------------------------------------------------------------------------
// Prompt and command line
// ---------------------------------------------------------------------------

export interface ProtocolDocs {
  /** `<workspaceRoot>/koordination`, when it exists. */
  coordinationDir: string | null
  protocolPath: string | null
  /** The newest `closeout/<lane>/briefs/_REGELN.md`, when there is one. */
  rulesPath: string | null
}

/**
 * Rules that live beside the brief, newest lane first.
 *
 * Lane folders carry the date of their closeout somewhere in the name — at the
 * end (`brain-standalone-20260926`) as often as at the start (`r3-finish-20260922`)
 * — so the date is compared, not the path. Sorting the whole paths picked the
 * older lane whenever its name happened to sort later, which is how the owner's
 * fleet got `r3-finish-20260922` rules into a 26.09. prompt. Guessing wrong here
 * is visible rather than harmful: the prompt names the file it read.
 */
function newestRulesFile(closeoutDir: string): string | null {
  if (!existsSync(closeoutDir)) return null
  const found: Array<{ lane: string; path: string; date: string }> = []
  for (const lane of readdirSync(closeoutDir, { withFileTypes: true })) {
    if (!lane.isDirectory()) continue
    const candidate = join(closeoutDir, lane.name, 'briefs', '_REGELN.md')
    if (existsSync(candidate)) found.push({ lane: lane.name, path: candidate, date: /\d{8}/.exec(lane.name)?.[0] ?? '' })
  }
  found.sort((left, right) => left.date === right.date
    ? left.lane.localeCompare(right.lane)
    : left.date.localeCompare(right.date))
  return found.at(-1)?.path ?? null
}

export function discoverProtocolDocs(workspaceRoot: string): ProtocolDocs {
  const coordinationDir = join(workspaceRoot, 'koordination')
  const protocolPath = join(coordinationDir, 'BRAIN-PROTOKOLL.md')
  return {
    coordinationDir: existsSync(coordinationDir) ? coordinationDir : null,
    protocolPath: existsSync(protocolPath) ? protocolPath : null,
    rulesPath: newestRulesFile(join(coordinationDir, 'closeout')),
  }
}

/** The Brain's own wrapper under the coordination folder, or the bare command. */
function brainCommand(workspaceRoot: string): string {
  const bin = join(workspaceRoot, 'koordination', 'bin')
  for (const name of ['plugbrain', 'plugbrain.cmd']) {
    const candidate = join(bin, name)
    if (existsSync(candidate)) return candidate
  }
  return 'plugbrain'
}

/** `a, b and c` — a prompt sentence must read as a sentence when a doc is missing. */
function joinClause(parts: string[]): string {
  if (parts.length === 1) return parts[0]!
  return `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)!}`
}

export interface PromptInput {
  agentId: string
  workspaceRoot: string
  docs: ProtocolDocs
  task?: { id: string; title: string; body: string }
}

/** Fill the template. The brief is named by the task, so the prompt cannot point at one. */
export function renderRunnerPrompt(input: PromptInput): string {
  const named = ['the brief named by your task']
  if (input.docs.protocolPath !== null) named.push(input.docs.protocolPath)
  if (input.docs.rulesPath !== null) named.push(input.docs.rulesPath)
  const values: Record<string, string> = {
    agentId: input.agentId,
    workspaceRoot: input.workspaceRoot,
    plugbrain: brainCommand(input.workspaceRoot),
    protocolDocs: joinClause(named),
    claimFlag: input.task === undefined ? '--claim' : '',
    taskContext: input.task === undefined ? '' :
      `\nAssigned queue task (already atomically claimed): ${input.task.id}\nTitle: ${input.task.title}\nBrief/body:\n${input.task.body}\n` +
      `Do not claim a second task. Finish this task, deliver it, and end the turn once.`,
  }
  return RUNNER_PROMPT_TEMPLATE.replace(/\{\{(\w+)\}\}/g, (whole, key: string) => values[key] ?? whole)
}

export interface ArgvContext {
  prompt: string
  promptPath: string
  logPath: string
  lastDocPath: string
  cwd: string
}

export interface RunnerArgv {
  file: string
  args: string[]
  /** True when the command is a Windows batch shim and has to go through `cmd.exe`. */
  viaComspec: boolean
  /** What the board shows. The prompt is a file path here, never the prompt text. */
  commandText: string
}

/**
 * `codex exec` for a Codex tab. The flag set matches codex-cli 0.156.1.
 *
 * `--search` is a flag of the INTERACTIVE Codex CLI; `codex exec` does not
 * accept it, so live web search goes in as the documented config override
 * instead of a flag that would make the process die on startup.
 */
function codexArgs(profile: RunnerProfile, context: ArgvContext): string[] {
  const args = ['exec']
  if (profile.model !== null) args.push('-m', profile.model)
  if (profile.effort !== null) args.push('-c', `model_reasoning_effort=${profile.effort}`)
  if (profile.sandbox === 'bypass') args.push('--dangerously-bypass-approvals-and-sandbox')
  else if (profile.sandbox !== null) args.push('--sandbox', profile.sandbox)
  if (profile.search) args.push('-c', 'tools.web_search=true')
  args.push('--json', '-o', context.lastDocPath, context.prompt)
  return args
}

/**
 * A `{placeholder}` template, for every CLI that is not Codex. A token that is
 * empty after substitution is dropped, so an unset `{model}` does not leave a
 * bare flag behind; write `--model={model}` to keep a flag and its value in one
 * token.
 */
function templateArgs(profile: RunnerProfile, context: ArgvContext): string[] {
  const values: Record<string, string> = {
    prompt: context.prompt,
    promptFile: context.promptPath,
    log: context.logPath,
    last: context.lastDocPath,
    cwd: context.cwd,
    model: profile.model ?? '',
    effort: profile.effort ?? '',
    sandbox: profile.sandbox ?? '',
  }
  return profile.args
    .map(token => token.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole))
    .filter(token => token !== '')
}

/**
 * PATH + PATHEXT resolution, done here rather than by the shell.
 *
 * `spawn('codex')` cannot start the `codex.cmd` that an npm install leaves
 * behind, and a shell would put a quoting layer between the prompt and the
 * program. Resolving the executable up front also turns "no such program" into
 * a refusal before a run row exists, instead of a process that dies silently.
 */
export function resolveExecutable(cmd: string): string {
  if (cmd.includes('/') || cmd.includes('\\')) return cmd
  const path = process.env.PATH ?? process.env.Path ?? ''
  const exts = process.platform === 'win32'
    ? ['', ...(process.env.PATHEXT ?? '.COM;.EXE;.BAT;.CMD').split(';').filter(ext => ext !== '')]
    : ['']
  for (const dir of path.split(delimiter)) {
    if (dir === '') continue
    for (const ext of exts) {
      const candidate = join(dir, `${cmd}${ext}`)
      if (existsSync(candidate)) return candidate
    }
  }
  return cmd
}

/** Every token quoted, `%` doubled: `cmd.exe` expands `%VAR%` even inside quotes. */
export function buildRunnerArgv(profile: RunnerProfile, context: ArgvContext): RunnerArgv {
  assertAllowedCommand(profile.cmd)
  const args = basename(profile.cmd).replace(/\.exe$/i, '').toLowerCase() === 'codex'
    ? codexArgs(profile, context) : templateArgs(profile, context)
  const file = resolveExecutable(profile.cmd)
  if (/\.(cmd|bat)$/i.test(file)) throw new AccessDenied(`batch shims are not supported by swarm run: ${file}`)
  const plan = { file, args }
  const shown = plan.args.map(arg => (arg === context.prompt ? context.promptPath : arg))
  return { ...plan, viaComspec: false, commandText: [plan.file, ...shown].join(' ') }
}

// ---------------------------------------------------------------------------
// Log reading
// ---------------------------------------------------------------------------

/** Read at most the last `maxBytes` of a file, dropping the partial first line. */
function readTail(path: string, maxBytes: number): { text: string; mtimeMs: number; size: number } | null {
  let size: number
  let mtimeMs: number
  try {
    const stats = statSync(path)
    size = stats.size
    mtimeMs = stats.mtimeMs
  } catch { return null }
  if (size === 0) return { text: '', mtimeMs, size }
  const start = Math.max(0, size - maxBytes)
  const length = size - start
  const buffer = Buffer.alloc(length)
  let fd: number
  try { fd = openSync(path, 'r') } catch { return null }
  try {
    readSync(fd, buffer, 0, length, start)
  } finally { closeSync(fd) }
  const raw = buffer.toString('utf8')
  const text = start === 0 ? raw : raw.slice(Math.max(0, raw.indexOf('\n') + 1))
  return { text, mtimeMs, size }
}

export interface LogEvent {
  at: string | null
  kind: string
  text: string
}

const text = (value: unknown): string | null => (typeof value === 'string' && value.trim() !== '' ? value : null)
const collapse = (value: string, max = EVENT_TEXT_CHARS): string => {
  const one = value.replace(/\s+/g, ' ').trim()
  return one.length > max ? `${one.slice(0, max - 1)}…` : one
}

/**
 * One JSONL line as the board should show it: what kind of event, and enough
 * text to recognise it. Codex wraps most events in `item`, so both levels are
 * read; an unparsable line is still shown rather than dropped.
 */
export function summarizeLogEvent(line: string): LogEvent | null {
  const trimmed = line.trim()
  if (trimmed === '') return null
  let parsed: unknown
  try { parsed = JSON.parse(trimmed) } catch { return { at: null, kind: 'raw', text: collapse(trimmed) } }
  if (parsed === null || typeof parsed !== 'object') return { at: null, kind: 'raw', text: collapse(trimmed) }
  const event = parsed as Record<string, unknown>
  const item = (event.item !== null && typeof event.item === 'object' ? event.item : {}) as Record<string, unknown>
  const kind = text(item.type) ?? text(event.type) ?? 'event'
  const at = text(event.timestamp) ?? text(event.ts) ?? text(event.time) ?? text(item.timestamp)

  let body: string | null = null
  if (kind === 'command_execution') {
    const command = text(item.command) ?? ''
    body = item.exit_code === undefined || item.exit_code === null
      ? `CMD ${command}`
      : `CMD ${command} -> exit ${String(item.exit_code)}`
  } else if (kind === 'agent_message') {
    body = text(item.text) ?? text(event.text)
  } else if (kind === 'file_change') {
    body = `FILE ${JSON.stringify(item.changes ?? item)}`
  } else if (kind === 'error') {
    body = text(item.message) ?? text(event.message)
  } else if (kind === 'turn.completed' || kind === 'turn_completed') {
    body = `DONE usage ${JSON.stringify(event.usage ?? {})}`
  } else if (kind === 'plugbrain.run.spawn_error') {
    body = text(event.message)
  }
  return { at, kind, text: collapse(body ?? text(event.message) ?? text(event.text) ?? trimmed) }
}

/** The last events and a readable tail of the log, for `--status` and for a blocked summary. */
export function tailOfLog(path: string, lines = SUMMARY_LINES): string[] {
  const tail = readTail(path, LOG_TAIL_BYTES)
  if (tail === null) return []
  return tail.text.split('\n').map(line => line.trim()).filter(line => line !== '').slice(-lines)
    .map(line => collapse(line, 300))
}

// ---------------------------------------------------------------------------
// Starting a run
// ---------------------------------------------------------------------------

export interface WorkerRun {
  agentId: string
  runId: string
  pid: number | null
  startedAt: string
  cwd: string
  logPath: string
  lastDocPath: string | null
  promptPath: string | null
  commandText: string
  lastEventAt: string | null
  lastEventKind: string | null
  lastEventText: string | null
  endedAt: string | null
  endedReason: string | null
  stoppedAt: string | null
  /**
   * Observed from the process, never inferred from the log — and latched: once
   * the run is settled this stays false, whatever a recycled pid claims.
   */
  alive: boolean
}

interface RunDbRow {
  agent_id: string
  run_id: string
  pid: number | null
  process_started_at: string | null
  started_at: string
  cwd: string
  log_path: string
  last_doc_path: string | null
  prompt_path: string | null
  command_text: string
  via_comspec: number
  log_mtime_ms: number | null
  log_size: number | null
  last_event_at: string | null
  last_event_kind: string | null
  last_event_text: string | null
  ended_at: string | null
  ended_reason: string | null
  stopped_at: string | null
  blocked_at: string | null
}

const runOf = (row: RunDbRow): WorkerRun => ({
  agentId: row.agent_id,
  runId: row.run_id,
  pid: row.pid,
  startedAt: row.started_at,
  cwd: row.cwd,
  logPath: row.log_path,
  lastDocPath: row.last_doc_path,
  promptPath: row.prompt_path,
  commandText: row.command_text,
  lastEventAt: row.last_event_at,
  lastEventKind: row.last_event_kind,
  lastEventText: row.last_event_text,
  endedAt: row.ended_at,
  endedReason: row.ended_reason,
  stoppedAt: row.stopped_at,
  alive: runAlive(row),
})

const loadRunRow = (db: DatabaseSync, agentId: string): RunDbRow | null =>
  (db.prepare('SELECT * FROM worker_runs WHERE agent_id = ?').get(agentId) as unknown as RunDbRow | undefined) ?? null

/**
 * Is the process there? Signal 0 asks the operating system and nothing else.
 * A PID can be reused after a reboot; the start time in the run row is what
 * keeps that from being mistaken for a live worker.
 */
function getProcessStartTime(pid: number): string | null {
  if (!Number.isInteger(pid) || pid <= 0 || process.platform !== 'win32') return null
  try {
    const command = `$p = Get-Process -Id ${pid} -ErrorAction SilentlyContinue; if ($p) { $p.StartTime.ToUniversalTime().ToString('o') }`
    const value = execFileSync('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', command], {
      encoding: 'utf8', windowsHide: true, timeout: 3000, stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null
  } catch { return null }
}

function processExists(pid: number): boolean {
  try { process.kill(pid, 0); return true } catch (error: unknown) {
    return (error as NodeJS.ErrnoException).code === 'EPERM'
  }
}

/** True only when both the PID and its operating-system creation time match this run. */
export function isOwnedProcess(pid: number | null, processStartedAt: string | null): boolean {
  if (pid === null || !Number.isInteger(pid) || pid <= 0 || processStartedAt === null) return false
  const actual = getProcessStartTime(pid)
  if (actual === null || !Number.isFinite(Date.parse(processStartedAt))) return false
  return Math.abs(Date.parse(actual) - Date.parse(processStartedAt)) <= 100
}

export function isAlive(pid: number | null, processStartedAt: string | null = null): boolean {
  if (!isOwnedProcess(pid, processStartedAt)) return false
  try { process.kill(pid!, 0); return true } catch { return false }
}

/**
 * A run is live while it is open AND its process answers.
 *
 * `ended_at` latches the answer, and that latch is not cosmetic: Windows hands
 * a freed pid straight to the next process, so a pid re-checked after the run
 * was settled can belong to a completely different program wearing the same
 * number. A test caught exactly that — a settled run reported as running again
 * a few hundred milliseconds later. Once the Brain has seen a run end, it does
 * not un-see it; the remaining window (a process that exits and has its pid
 * reused before the Brain ever looks) is small and cannot be closed from a pid
 * alone.
 */
export function runAlive(row: { pid: number | null; process_started_at?: string | null; ended_at: string | null }): boolean {
  return row.ended_at === null && isAlive(row.pid, row.process_started_at ?? null)
}

export function getWorkerRun(db: DatabaseSync, agentId: string): WorkerRun | null {
  ensureRunnerSchema(db)
  const row = loadRunRow(db, agentId)
  return row === null ? null : runOf(row)
}

/** `<agent>-<stamp>`, sortable and collision-free enough for one worker. */
function stampOf(now: Date): string {
  const pad = (value: number, width = 2) => String(value).padStart(width, '0')
  return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}` +
    `-${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}${pad(now.getUTCMilliseconds(), 3)}`
}

export interface StartRunInput {
  workspaceId: string
  agentId: string
  /** Working directory; defaults to the profile's, then the workspace root. */
  cwd?: string
  home?: string
  now?: Date
  /** A task preclaimed by the persistent supervisor. */
  task?: { id: string; title: string; body: string }
  /** Fences Brain commands made by a stale retry attempt. */
  attemptToken?: string
}

/**
 * Start the worker's process detached and record the run.
 *
 * Detached is the point: the Brain is a CLI that answers and exits, so the
 * worker cannot be its child in any meaningful sense. stdin is empty (a worker
 * that waits for input would never finish), stdout and stderr go to the log,
 * and the run row is written BEFORE the process starts — otherwise a process
 * that dies instantly would leave nothing to reconcile.
 */
export function startWorkerRun(db: DatabaseSync, input: StartRunInput): WorkerRun {
  ensureRunnerSchema(db)
  if (process.platform !== 'win32') throw new AccessDenied('swarm run is not supported on this platform; Windows process-tree identity is required')
  const workspace = requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.agentId)
  const profile = getRunnerProfile(db, input.agentId)
  if (profile === null) {
    throw new AccessDenied(
      `no runner profile for ${input.agentId}; set one first:\n` +
      `  plugbrain swarm runner set ${input.agentId} --cmd codex --model <model>`,
    )
  }
  // A dead run has to be booked before it is replaced, or the worker that never
  // came back keeps a clean-looking board row.
  reconcileWorkerRuns(db, input.workspaceId, { now: input.now })
  const previous = getWorkerRun(db, input.agentId)
  if (previous !== null && previous.alive) {
    throw new AccessDenied(
      `${input.agentId} already has a live run (pid ${previous.pid}, started ${previous.startedAt}); ` +
      `stop it with: plugbrain swarm run ${input.agentId} --stop`,
    )
  }

  const now = input.now ?? new Date()
  const nowIso = now.toISOString()
  const workspaceRoot = resolve(workspace.root)
  const cwd = resolve(input.cwd ?? profile.cwd ?? workspaceRoot)
  const agent = db.prepare('SELECT worktrees FROM agents WHERE id = ?').get(input.agentId) as { worktrees: string | null } | undefined
  const verifiedCwd = validateRunnerCwd(db, workspace.id, agent?.worktrees ?? null, cwd)
  const home = input.home ?? resolveBrainHome()
  const stamp = stampOf(now)
  const workersDir = join(home, 'runs', 'workers')
  const logPath = join(workersDir, `${input.agentId}-${stamp}.jsonl`)
  const lastDocPath = join(workersDir, `${input.agentId}-${stamp}-last.md`)
  const promptPath = join(workersDir, `${input.agentId}-${stamp}-prompt.md`)

  if (input.task !== undefined) {
    assertNotCredential('task title', input.task.title)
    assertNotCredential('task body', input.task.body)
  }
  const prompt = renderRunnerPrompt({ agentId: input.agentId, workspaceRoot, docs: discoverProtocolDocs(workspaceRoot), task: input.task })
  if (prompt.length > MAX_PROMPT_CHARS) {
    throw new AccessDenied(`the rendered prompt is ${prompt.length} characters; the limit is ${MAX_PROMPT_CHARS}`)
  }
  const plan = buildRunnerArgv(profile, { prompt, promptPath, logPath, lastDocPath, cwd })
  if (!existsSync(plan.file)) {
    throw new AccessDenied(`command not found: ${profile.cmd} (resolved to ${plan.file}); check the --cmd on the runner profile`)
  }

  mkdirSync(workersDir, { recursive: true })
  // The prompt is kept, not just passed: a worker whose log shows the wrong
  // brief is otherwise impossible to explain after the fact.
  writeFileSync(promptPath, prompt, 'utf8')

  const runId = `${input.agentId}-${stamp}`
  db.prepare(`
    INSERT INTO worker_runs (agent_id, run_id, pid, started_at, cwd, log_path, last_doc_path, prompt_path,
                             command_text, via_comspec, log_mtime_ms, log_size, ended_at, ended_reason, stopped_at, blocked_at,
                             task_id, attempt_token)
    VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?)
    ON CONFLICT(agent_id) DO UPDATE SET
      run_id = excluded.run_id, pid = NULL, started_at = excluded.started_at, cwd = excluded.cwd,
      log_path = excluded.log_path, last_doc_path = excluded.last_doc_path, prompt_path = excluded.prompt_path,
      command_text = excluded.command_text, via_comspec = excluded.via_comspec,
      log_mtime_ms = NULL, log_size = NULL, last_event_at = NULL, last_event_kind = NULL, last_event_text = NULL,
      ended_at = NULL, ended_reason = NULL, stopped_at = NULL, blocked_at = NULL,
      task_id = excluded.task_id, attempt_token = excluded.attempt_token
  `).run(
    input.agentId, runId, nowIso, verifiedCwd, logPath, lastDocPath, promptPath, plan.commandText,
    plan.viaComspec ? 1 : 0, input.task?.id ?? null, input.attemptToken ?? null,
  )

  let pid: number | null = null
  try {
    const logFd = openSync(logPath, 'a')
    const errPath = `${logPath.slice(0, -'.jsonl'.length)}.stderr.log`
    const errFd = openSync(errPath, 'a')
    try {
      const child = spawn(plan.file, plan.args, {
        cwd: verifiedCwd,
        detached: true,
        windowsHide: true,
        stdio: ['ignore', logFd, errFd],
        env: { ...process.env, PLUGBRAIN_HOME: home,
          ...(input.attemptToken === undefined ? {} : {
            PLUGBRAIN_ATTEMPT_TOKEN: input.attemptToken, PLUGBRAIN_SUPERVISED_AGENT: input.agentId,
          }),
        },
        ...(plan.viaComspec ? { windowsVerbatimArguments: true } : {}),
      })
      pid = child.pid ?? null
      if (pid !== null) {
        const processStartedAt = getProcessStartTime(pid)
        if (processStartedAt === null && child.exitCode === null && processExists(pid)) {
          child.kill()
          throw new AccessDenied(`could not verify process start time for worker ${input.agentId}; process stopped`)
        }
        if (processStartedAt !== null) {
          db.prepare('UPDATE worker_runs SET process_started_at = ? WHERE agent_id = ?').run(processStartedAt, input.agentId)
        }
      }
      // Best effort: a spawn failure that arrives after this process exits would
      // otherwise leave an empty log and no explanation for it.
      child.on('error', (error: Error) => {
        try { writeFileSync(logPath, `${JSON.stringify({ type: 'plugbrain.run.spawn_error', message: error.message })}\n`, { flag: 'a' }) } catch { /* the log is a courtesy here */ }
      })
      child.unref()
    } finally {
      closeSync(logFd)
      closeSync(errFd)
    }
  } catch (error: unknown) {
    db.prepare('DELETE FROM worker_runs WHERE agent_id = ?').run(input.agentId)
    throw error
  }
  if (pid !== null) db.prepare('UPDATE worker_runs SET pid = ? WHERE agent_id = ?').run(pid, input.agentId)
  return getWorkerRun(db, input.agentId)!
}

// ---------------------------------------------------------------------------
// Watching a run
// ---------------------------------------------------------------------------

function refreshRunLog(db: DatabaseSync, row: RunDbRow): void {
  const tail = readTail(row.log_path, LOG_TAIL_BYTES)
  if (tail === null) return
  if (row.log_mtime_ms === tail.mtimeMs && row.log_size === tail.size) return
  const lines = tail.text.split('\n').map(line => line.trim()).filter(line => line !== '')
  const last = lines.length === 0 ? null : summarizeLogEvent(lines.at(-1)!)
  db.prepare(`
    UPDATE worker_runs
       SET log_mtime_ms = ?, log_size = ?, last_event_at = COALESCE(?, last_event_at), last_event_kind = ?, last_event_text = ?
     WHERE agent_id = ?
  `).run(tail.mtimeMs, tail.size, last?.at ?? new Date(tail.mtimeMs).toISOString(), last?.kind ?? null, last?.text ?? null, row.agent_id)
}

interface TurnRow { turn_state: string | null; turn_state_at: string | null }

const TURN_ENDED = new Set(['needs-task', 'awaiting-commit', 'blocked', 'paused', 'commit-approved'])

function turnOf(db: DatabaseSync, agentId: string): TurnRow {
  const row = db.prepare('SELECT turn_state, turn_state_at FROM agents WHERE id = ?').get(agentId) as unknown as TurnRow | undefined
  return row ?? { turn_state: null, turn_state_at: null }
}

/**
 * Did the worker end its turn DURING this run? A state left over from an
 * earlier turn is not an answer: when it predates the start, the process that
 * just died never got to speak.
 */
function endedTurnWithin(row: RunDbRow, turn: TurnRow): boolean {
  if (turn.turn_state === null || !TURN_ENDED.has(turn.turn_state)) return false
  const at = turn.turn_state_at === null ? Number.NaN : Date.parse(turn.turn_state_at)
  const started = Date.parse(row.started_at)
  return Number.isFinite(at) && at >= started - TURN_END_SLACK_MS
}

export interface RunReconcileEvent {
  agentId: string
  runId: string
  /** `ended-without-turn-end` is the one the Brain has to act on. */
  reason: 'ended-without-turn-end' | 'ended-after-turn-end'
  summary: string
  /** The message the integrator received, when one was sent. */
  messageId: string | null
}

export interface ReconcileOptions {
  now?: Date
  /** Send the integrator a message when a run died mid-turn. Default true. */
  notify?: boolean
}

/**
 * Look at every run and settle the ones whose process is gone.
 *
 * Called before a run is replaced and from `swarm board`, so the fleet state
 * heals whenever somebody looks at it. It is idempotent: a concluded run is
 * left alone, and a live one only gets its log tail refreshed.
 */
export function reconcileWorkerRuns(db: DatabaseSync, workspaceId: string, options: ReconcileOptions = {}): RunReconcileEvent[] {
  ensureRunnerSchema(db)
  const rows = db.prepare(`
    SELECT worker_runs.* FROM worker_runs
    JOIN agents ON agents.id = worker_runs.agent_id
    WHERE agents.workspace_id = ? AND agents.retired_at IS NULL
  `).all(workspaceId) as unknown as RunDbRow[]
  const now = options.now ?? new Date()
  const nowIso = now.toISOString()
  const events: RunReconcileEvent[] = []

  for (const row of rows) {
    if (runAlive(row)) { refreshRunLog(db, row); continue }
    if (row.ended_at !== null) continue
    refreshRunLog(db, row)
    const refreshed = loadRunRow(db, row.agent_id) ?? row
    const turn = turnOf(db, row.agent_id)
    const endedCleanly = endedTurnWithin(row, turn)
    const tail = tailOfLog(refreshed.log_path)
    const summary = `${row.agent_id}: runner exited without a turn end (pid ${row.pid ?? '?'}, started ${row.started_at})` +
      (tail.length === 0 ? '\nno log output' : `\n${tail.join('\n')}`)
    db.exec('BEGIN IMMEDIATE')
    try {
      const current = loadRunRow(db, row.agent_id)
      if (current === null || current.ended_at !== null) { db.exec('COMMIT'); continue }
      if (runAlive(current)) { db.exec('COMMIT'); refreshRunLog(db, current); continue }
      const currentTurn = turnOf(db, row.agent_id)
      const clean = endedTurnWithin(current, currentTurn)
      if (clean) {
        db.prepare('UPDATE worker_runs SET ended_at = ?, ended_reason = ? WHERE agent_id = ? AND ended_at IS NULL')
          .run(nowIso, 'turn-end', row.agent_id)
        db.exec('COMMIT')
        events.push({
          agentId: row.agent_id, runId: row.run_id, reason: 'ended-after-turn-end',
          summary: `${row.agent_id}: runner exited after a turn end (${currentTurn.turn_state})`, messageId: null,
        })
        continue
      }
      // Check if the agent has a current task
      const agentTask = db.prepare('SELECT task_id FROM agents WHERE id = ?').get(row.agent_id) as { task_id: string | null } | undefined
      const hasCurrentTask = agentTask?.task_id !== null && agentTask?.task_id !== ''
      
      if (!hasCurrentTask) {
        // No current task: mark as needs-task, no blocked booking, no integrator notification
        ensureIntegrator(db, workspaceId)
        db.prepare(`
          UPDATE agents SET turn_state = 'needs-task', turn_state_at = ?, turn_summary = ?,
                              last_heartbeat = ?, last_seen = ?
         WHERE id = ?
        `).run(nowIso, summary.slice(0, 2000), nowIso, nowIso, row.agent_id)
        db.prepare('UPDATE worker_runs SET ended_at = ?, ended_reason = ? WHERE agent_id = ? AND ended_at IS NULL')
          .run(nowIso, 'process-gone', row.agent_id)
        db.exec('COMMIT')
        events.push({ agentId: row.agent_id, runId: row.run_id, reason: 'ended-without-turn-end', summary, messageId: null })
        continue
      }
      // Has a current task: mark as blocked and notify integrator
      db.prepare(`
        UPDATE agents SET turn_state = 'blocked', turn_state_at = ?, turn_summary = ?,
                          last_heartbeat = ?, last_seen = ?
         WHERE id = ?
      `).run(nowIso, summary.slice(0, 2000), nowIso, nowIso, row.agent_id)
      db.prepare('UPDATE worker_runs SET blocked_at = ?, ended_at = ?, ended_reason = ? WHERE agent_id = ? AND ended_at IS NULL')
        .run(nowIso, nowIso, 'process-gone', row.agent_id)
      let messageId: string | null = null
      if (options.notify !== false) {
        ensureIntegrator(db, workspaceId)
        messageId = sendMessage(db, {
          workspaceId,
          fromAgent: row.agent_id,
          toAgent: INTEGRATOR,
          subject: `swarm run: ${row.agent_id} exited without a turn end`,
          body: `Worker ${row.agent_id} was started by the Brain and its process is gone before the turn ended.\n` +
            `Command: ${row.command_text}\nLog: ${row.log_path}\n\nLast log lines:\n${tail.length === 0 ? '(empty)' : tail.join('\n')}`,
        }).id
      }
      db.exec('COMMIT')
      events.push({ agentId: row.agent_id, runId: row.run_id, reason: 'ended-without-turn-end', summary, messageId })
    } catch (error: unknown) {
      db.exec('ROLLBACK')
      throw error
    }
  }
  return events
}

/**
 * Stop the worker's process and pause its turn.
 *
 * A worker that already ended its turn keeps that state: `awaiting-commit` must
 * survive its process being stopped, or the integrator's approval would arrive
 * at an agent that no longer looks like it is waiting for one.
 */
export function stopWorkerRun(db: DatabaseSync, input: { agentId: string; workspaceId: string; now?: Date }): WorkerRun {
  ensureRunnerSchema(db)
  requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.agentId)
  const row = loadRunRow(db, input.agentId)
  if (row === null) throw new AccessDenied(`${input.agentId} has no recorded run to stop`)
  const now = input.now ?? new Date()
  const nowIso = now.toISOString()
  const turn = turnOf(db, input.agentId)
  const hadEndedTurn = endedTurnWithin(row, turn)

  if (runAlive(row)) {
    if (process.platform === 'win32') {
      if (!isOwnedProcess(row.pid, row.process_started_at)) {
        throw new AccessDenied(`${input.agentId} pid ${row.pid} no longer matches the recorded process start time`)
      }
      try {
        execFileSync('taskkill.exe', ['/PID', String(row.pid), '/T', '/F'], {
          windowsHide: true, timeout: 5000, stdio: 'ignore',
        })
      } catch { /* a concurrent process exit is confirmed by the identity check below */ }
    } else {
      try { process.kill(-row.pid!, 'SIGTERM') } catch { /* already gone */ }
    }
    const deadline = Date.now() + 3000
    while (isAlive(row.pid, row.process_started_at) && Date.now() < deadline) {
      // A short, bounded wait: `--stop` must not hang because a worker ignores
      // the signal, and the state written below depends on the process being gone.
      try { execSleep(50) } catch { break }
    }
    if (isAlive(row.pid, row.process_started_at)) {
      throw new AccessDenied(`${input.agentId} (pid ${row.pid}) ignored the stop; its turn stays ${turn.turn_state ?? 'unset'}`)
    }
  }
  db.prepare('UPDATE worker_runs SET stopped_at = ?, ended_at = COALESCE(ended_at, ?), ended_reason = COALESCE(ended_reason, ?) WHERE agent_id = ?')
    .run(nowIso, nowIso, 'stopped', input.agentId)
  if (!hadEndedTurn) {
    db.prepare('UPDATE agents SET turn_state = ?, turn_state_at = ?, turn_summary = ? WHERE id = ?')
      .run('paused', nowIso, `run stopped by request (${row.command_text})`.slice(0, 2000), input.agentId)
  }
  return getWorkerRun(db, input.agentId)!
}

/** A blocking sleep without a dependency; `Atomics.wait` needs a typed array to wait on. */
function execSleep(ms: number): void {
  const shared = new Int32Array(new SharedArrayBuffer(4))
  Atomics.wait(shared, 0, 0, ms)
}

// ---------------------------------------------------------------------------
// `swarm run <agent> --status`
// ---------------------------------------------------------------------------

export interface WorkerRunStatus {
  agentId: string
  profile: RunnerProfile | null
  run: WorkerRun | null
  turnState: string | null
  turnStateAt: string | null
  /** The last log lines, so a status call needs no second command. */
  tail: string[]
}

/**
 * Everything known about a worker's run. Settles a dead run first, so asking
 * for the status is also the moment the Brain books a process that never
 * finished its turn — the one place a worker's absence would otherwise go
 * unnoticed until somebody reads the log by hand.
 */
export function workerRunStatus(db: DatabaseSync, workspaceId: string, agentId: string): WorkerRunStatus {
  ensureRunnerSchema(db)
  reconcileWorkerRuns(db, workspaceId)
  const run = getWorkerRun(db, agentId)
  const turn = turnOf(db, agentId)
  return {
    agentId,
    profile: getRunnerProfile(db, agentId),
    run,
    turnState: turn.turn_state,
    turnStateAt: turn.turn_state_at,
    tail: run === null ? [] : tailOfLog(run.logPath),
  }
}

// ---------------------------------------------------------------------------
// The board's view
// ---------------------------------------------------------------------------

export interface RunnerBoardState {
  runId: string
  pid: number | null
  alive: boolean
  startedAt: string
  command: string
  logPath: string
  lastDocPath: string | null
  lastEventAt: string | null
  lastEventKind: string | null
  lastEventText: string | null
  endedAt: string | null
  endedReason: string | null
  stoppedAt: string | null
  /** Set when the run died mid-turn and the Brain booked the worker `blocked`. */
  blockedAt: string | null
}

/** Read-only: the board shows the runner, it does not settle runs. */
export function runnerBoardStates(db: DatabaseSync): Map<string, RunnerBoardState> {
  ensureRunnerSchema(db)
  const rows = db.prepare('SELECT * FROM worker_runs').all() as unknown as RunDbRow[]
  const states = new Map<string, RunnerBoardState>()
  for (const row of rows) {
    states.set(row.agent_id, {
      runId: row.run_id,
      pid: row.pid,
      alive: runAlive(row),
      startedAt: row.started_at,
      command: row.command_text,
      logPath: row.log_path,
      lastDocPath: row.last_doc_path,
      lastEventAt: row.last_event_at,
      lastEventKind: row.last_event_kind,
      lastEventText: row.last_event_text,
      endedAt: row.ended_at,
      endedReason: row.ended_reason,
      stoppedAt: row.stopped_at,
      blockedAt: row.blocked_at,
    })
  }
  return states
}
