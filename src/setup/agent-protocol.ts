import {
  existsSync, readFileSync, readdirSync, writeFileSync, unlinkSync,
} from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { homedir } from 'node:os'
import { resolveClientTargets, type ClientDefinition, type SetupEntry } from './clients.ts'

export const START_MARKER = '<!-- plugbrain:agent-protocol:start -->'
export const END_MARKER = '<!-- plugbrain:agent-protocol:end -->'

// Kept in sync with the fenced block in docs/agent-protocol.md. The installed
// CLI can therefore initialize a project without shipping the documentation.
export const AGENT_PROTOCOL_BLOCK = `## Working with PlugBrain

You are one agent in a team coordinated by PlugBrain. Your agent id is \`<id>\`.

1. **Start of every turn:** run \`plugbrain swarm turn <id> start\`. Read every
   message it prints and acknowledge each one with
   \`plugbrain swarm ack <id> <messageId>\`. If a task is offered to you, take it
   with \`plugbrain swarm turn <id> start --claim\`.
2. **Before you write:** claim the paths you will change:
   \`plugbrain swarm claim <id> <path>... --task <taskId>\`. If the claim is
   refused, another agent owns the path. Message that agent
   (\`plugbrain swarm send <agent> --subject "..." --body "..."\`) instead of
   writing anyway.
3. **Before tests, builds, installs or new worktrees:** run
   \`plugbrain swarm admit test|build|install|worktree\`. Exit code 5 means the
   machine has no room. Do not start the work; end the turn as \`blocked\`.
4. **Hand in completed work:** run
   \`plugbrain swarm deliver <id> <taskId> --path <evidence> [--repo <worktree>]\`.
   The evidence must be a non-empty file inside the workspace. The receipt stores
   its SHA-256, your agent id, attempt, and source revision when available. Review
   tasks (title starts with \`R-\` or \`--review\`) also need a verdict and reviewed commit hash.
5. **End of every turn,** with exactly one state:
   \`plugbrain swarm turn <id> end --state <state> --summary "<one or two sentences>"\`
   - \`needs-task\`: you are done and need new work
   - \`awaiting-commit\`: a tested change is ready; wait for approval
   - \`blocked\`: a real blocker, named in the summary
   - \`paused\`: you were told to stop
   Then release your claims: \`plugbrain swarm release <id> --task <taskId>\`.
   Ending with \`needs-task\` without a delivery leaves the task claimed and visible
   under \`plugbrain swarm board --next\`.
6. **Commit only after approval.** Approval arrives as a message with the
   subject "Commit freigegeben". Commit, then end the turn with \`needs-task\`.
7. **Report limits, never secrets.** If your tool shows a quota, report the
   number: \`plugbrain swarm quota <account> <remaining> percent|credits|requests|rpm|tokens\`.
   Never put keys or tokens into commands, summaries, messages or notes.`

const backupPrefix = '.plugbrain-agent-protocol-backup-'
const emptyBackup = '.plugbrain-agent-protocol-created'

export type AgentFileTarget = 'AGENTS.md' | 'CLAUDE.md' | 'both'

export function selectAgentFiles(root: string, target?: AgentFileTarget): string[] {
  const base = resolve(root)
  const agents = join(base, 'AGENTS.md')
  const claude = join(base, 'CLAUDE.md')
  if (target === 'both') return [agents, claude]
  if (target === 'AGENTS.md') return [agents]
  if (target === 'CLAUDE.md') return [claude]
  const selected = [agents]
  if (existsSync(claude)) {
    const text = readFileSync(claude, 'utf8')
    if (!/\bAGENTS\.md\b/i.test(text)) selected.push(claude)
  }
  return selected
}

function markerRange(text: string): { start: number; end: number } | null {
  const starts = text.split(START_MARKER).length - 1
  const ends = text.split(END_MARKER).length - 1
  if (starts === 0 && ends === 0) return null
  if (starts !== 1 || ends !== 1) throw new Error('invalid or duplicate PlugBrain markers; repair the markers and retry')
  const start = text.indexOf(START_MARKER)
  const end = text.indexOf(END_MARKER)
  if (end < start + START_MARKER.length) throw new Error('invalid PlugBrain marker order; repair the markers and retry')
  return { start, end: end + END_MARKER.length }
}

export function renderAgentFile(existing: string | null): { text: string; changed: boolean } {
  const before = existing ?? ''
  const current = markerRange(before)
  const block = `${START_MARKER}\n${AGENT_PROTOCOL_BLOCK}\n${END_MARKER}`
  let text: string
  if (current) text = `${before.slice(0, current.start)}${block}${before.slice(current.end)}`
  else text = `${before}${before.length > 0 && !before.endsWith('\n') ? '\n' : ''}${block}\n`
  return { text, changed: text !== before }
}

export function validateAgentFiles(files: string[], undo = false): void {
  for (const file of files) {
    if (!existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    if (undo) markerRange(text)
    else renderAgentFile(text)
  }
}

function latestBackup(file: string): string | null {
  const folder = dirname(file)
  if (!existsSync(folder)) return null
  const prefix = `${file.split(/[\\/]/).pop()}${backupPrefix}`
  const files = readdirSync(folder).filter(name => name.startsWith(prefix)).sort()
  return files.length ? join(folder, files[files.length - 1]!) : null
}

function backupPath(file: string): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  return `${file}${backupPrefix}${stamp}`
}

export interface AgentFileResult {
  path: string
  action: 'created' | 'updated' | 'unchanged' | 'dry-run' | 'undone'
  before: string | null
  after: string | null
  backup: string | null
}

export function manageAgentFile(file: string, options: { dryRun?: boolean; undo?: boolean } = {}): AgentFileResult {
  const before = existsSync(file) ? readFileSync(file, 'utf8') : null
  if (options.undo) {
    const backup = latestBackup(file)
    if (backup !== null) {
      const saved = readFileSync(backup, 'utf8')
      if (saved === '') {
        if (before === null) return { path: file, action: 'unchanged', before, after: before, backup }
        const range = markerRange(before)
        if (!range) return { path: file, action: 'unchanged', before, after: before, backup }
        const reduced = `${before.slice(0, range.start)}${before.slice(range.end)}`
        if (reduced.trim() === '') { unlinkSync(file); return { path: file, action: 'undone', before, after: null, backup } }
        writeFileSync(file, reduced)
        return { path: file, action: 'undone', before, after: reduced, backup }
      }
      if (before !== null && markerRange(saved) === null && before === renderAgentFile(saved).text) {
        writeFileSync(file, saved)
        return { path: file, action: 'undone', before, after: saved, backup }
      }
      if (before === null) return { path: file, action: 'unchanged', before, after: before, backup }
      const range = markerRange(before)
      if (!range) return { path: file, action: 'unchanged', before, after: before, backup }
      const after = `${before.slice(0, range.start)}${before.slice(range.end)}`
      writeFileSync(file, after)
      return { path: file, action: 'undone', before, after, backup }
    }
    if (before === null) return { path: file, action: 'unchanged', before, after: before, backup: null }
    const range = markerRange(before)
    if (!range) return { path: file, action: 'unchanged', before, after: before, backup: null }
    const after = `${before.slice(0, range.start)}${before.slice(range.end)}`
    if (!options.dryRun) writeFileSync(file, after)
    return { path: file, action: options.dryRun ? 'dry-run' : 'undone', before, after, backup: null }
  }
  const rendered = renderAgentFile(before)
  if (!rendered.changed) return { path: file, action: 'unchanged', before, after: before, backup: null }
  if (options.dryRun) return { path: file, action: 'dry-run', before, after: rendered.text, backup: null }
  const backup = backupPath(file)
  writeFileSync(backup, before ?? '')
  writeFileSync(file, rendered.text)
  return { path: file, action: before === null ? 'created' : 'updated', before, after: rendered.text, backup }
}

export interface DoctorAgentRow {
  client: string
  installed: 'ok' | 'missing'
  mcp: 'ok' | 'missing' | 'wrong'
  daemon: 'ok' | 'missing'
  workspace: 'ok' | 'missing'
  agentBlock: 'ok' | 'missing' | 'wrong'
  fix: string
}

function parseEntry(def: ClientDefinition, text: string): SetupEntry | null {
  if (def.format === 'json') {
    try {
      const root = JSON.parse(text) as Record<string, any>
      const entry = root?.[def.mapKey]?.plugbrain
      if (entry && typeof entry.command === 'string' && Array.isArray(entry.args)) return entry as SetupEntry
    } catch { return null }
    return null
  }
  if (def.format === 'toml') {
    const match = text.match(/\[mcp_servers\.plugbrain\]([\s\S]*?)(?=\n\s*\[|$)/)
    if (!match) return null
    const command = match[1]!.match(/^command\s*=\s*"([^"]+)"/m)?.[1]
    const args = match[1]!.match(/^args\s*=\s*\[([^\]]*)\]/m)?.[1]
      ?.match(/"([^"]*)"/g)?.map(value => JSON.parse(value) as string)
    return command && args ? { command, args } : null
  }
  const nested = text.match(new RegExp(`^${def.mapKey}:\\s*\\n([\\s\\S]*)`, 'm'))?.[1]
  const block = nested?.match(/^  plugbrain:\s*\n((?:^    .*\n?)*)/m)?.[1]
  const command = block?.match(/^    command:\s*(['"])(.*?)\1\s*$/m)?.[2]
  const args = [...(block?.matchAll(/^      -\s*(['"])(.*?)\1\s*$/gm) ?? [])].map(m => m[2]!)
  return command && args.length ? { command, args } : null
}

function installedVersion(entry: SetupEntry | null, installRoot: string): boolean {
  if (!entry || !existsSync(entry.command)) return false
  const cli = entry.args.find(arg => /(?:plugbrain|cli)(?:\.m?js|\.exe)$/i.test(arg))
  if (!cli || !existsSync(cli) || cli.endsWith('.ts')) return false
  const root = resolve(installRoot).toLocaleLowerCase()
  const target = resolve(cli).toLocaleLowerCase()
  return target.startsWith(`${root}${sep}`) || target.startsWith(`${root}/`)
}

function blockStatus(root: string): DoctorAgentRow['agentBlock'] {
  const files = [join(root, 'AGENTS.md'), join(root, 'CLAUDE.md')].filter(existsSync)
  if (!files.length) return 'missing'
  let seen = false
  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    try {
      if (markerRange(text)) seen = true
    } catch { return 'wrong' }
  }
  return seen ? 'ok' : 'missing'
}

export async function doctorAgents(options: {
  db: { prepare(sql: string): { all(): unknown[] } }
  cwd?: string
  home?: string
  installRoot?: string
  port?: number
  fetcher?: typeof fetch
}): Promise<DoctorAgentRow[]> {
  const cwd = resolve(options.cwd ?? process.cwd())
  const home = options.home ?? process.env.PLUGBRAIN_CONFIG_HOME ?? homedir()
  const targets = resolveClientTargets(home)
  const installRoot = options.installRoot ?? join(process.env.LOCALAPPDATA ?? join(homedir(), 'AppData', 'Local'), 'Programs', 'PlugBrain')
  let daemon: DoctorAgentRow['daemon'] = 'missing'
  try {
    const response = await (options.fetcher ?? fetch)(`http://127.0.0.1:${options.port ?? 4310}/api/health`, { signal: AbortSignal.timeout(1500) })
    if (response.ok) daemon = 'ok'
  } catch { /* doctor is read-only and never starts the daemon */ }
  const workspaces = options.db.prepare('SELECT root FROM workspaces').all() as Array<{ root: string }>
  const workspace = workspaces.some(row => {
    const root = resolve(row.root)
    return cwd === root || cwd.startsWith(root + sep)
  }) ? 'ok' : 'missing'
  const workspaceRoot = workspaces
    .map(row => resolve(row.root))
    .filter(root => cwd === root || cwd.startsWith(root + sep))
    .sort((a, b) => b.length - a.length)[0]
  const agents = blockStatus(workspaceRoot ?? cwd)
  return targets.map(target => {
    const installed = target.detected ? 'ok' : 'missing'
    let mcp: DoctorAgentRow['mcp'] = 'missing'
    if (target.detected && existsSync(target.path)) {
      let entry: SetupEntry | null = null
      try { entry = parseEntry(target.def, readFileSync(target.path, 'utf8')) } catch { /* malformed file is wrong */ }
      mcp = entry === null ? 'wrong' : installedVersion(entry, installRoot) ? 'ok' : 'wrong'
    }
    let fix = 'plugbrain init'
    if (installed === 'ok' && mcp !== 'ok') fix = `plugbrain setup ${target.def.id}`
    else if (daemon !== 'ok') fix = 'plugbrain serve'
    else if (workspace !== 'ok') fix = 'plugbrain init'
    else if (agents !== 'ok') fix = 'plugbrain agents-file'
    return { client: target.def.label, installed, mcp, daemon, workspace, agentBlock: agents, fix }
  })
}
