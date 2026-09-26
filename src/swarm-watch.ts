import { readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { admitWork, hostSnapshot } from './coord/resources.ts'

export interface WatchEvent {
  type: string
  data: unknown
  timestamp: string
}

export interface SwarmWatchOptions {
  forAgent?: string
  agents?: string[]
  dirs?: string[]
  timeoutMs: number
  json?: boolean
  subscribe: (listener: (event: WatchEvent) => void, onError: (error: Error) => void) => () => void
  emit?: (events: WatchEvent[], timedOut: boolean) => void
  now?: () => number
  pollMs?: number
  batchMs?: number
  snapshotFiles?: (roots: string[]) => Promise<Map<string, string>>
  sampleAdmission?: () => Record<string, boolean>
}

const POLL_MS = 30_000
const BATCH_MS = 5_000
const WORK_KINDS = ['test', 'build', 'worktree'] as const

function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function watched(event: WatchEvent, options: SwarmWatchOptions): boolean {
  const data = record(event.data)
  if (event.type === 'file.changed' || event.type === 'admission.changed') return true
  const agents = options.agents?.length ? options.agents : options.forAgent ? [options.forAgent] : null
  if (event.type === 'agent.turn') {
    return (agents === null || agents.includes(String(data.agentId))) && data.previousState !== data.state
  }
  if (event.type === 'message.sent' || event.type === 'message.delivered') {
    return options.forAgent !== undefined && (data.toAgent === options.forAgent || data.agentId === options.forAgent)
  }
  if (event.type === 'task.enqueued') {
    return options.forAgent !== undefined && (data.addressedTo === null || data.addressedTo === undefined || data.addressedTo === options.forAgent)
  }
  if (event.type === 'watchdog.silent') {
    return options.forAgent === undefined ? agents === null || agents.includes(String(data.agentId)) : data.agentId === options.forAgent
  }
  return false
}

async function markdownSnapshot(roots: string[]): Promise<Map<string, string>> {
  const found = new Map<string, string>()
  const visit = async (directory: string): Promise<void> => {
    let entries
    try { entries = await readdir(directory, { withFileTypes: true }) } catch { return }
    for (const entry of entries) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await visit(path)
      else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        try {
          const info = await stat(path)
          found.set(path, `${info.mtimeMs}:${info.size}`)
        } catch { /* A concurrently removed file is absent from this snapshot. */ }
      }
    }
  }
  await Promise.all(roots.map(root => visit(resolve(root))))
  return found
}

function admissionSnapshot(): Record<string, boolean> {
  const host = hostSnapshot()
  return Object.fromEntries(WORK_KINDS.map(kind => [kind, admitWork(kind, host).allowed]))
}

function humanSummary(events: WatchEvent[]): string {
  return events.map(event => {
    const data = record(event.data)
    if (event.type === 'agent.turn') return `Turn ${String(data.agentId)}: ${String(data.previousState ?? 'unbekannt')} → ${String(data.state)}${data.summary ? ` — ${String(data.summary)}` : ''}`
    if (event.type === 'message.sent' || event.type === 'message.delivered') return `Nachricht ${String(data.subject ?? data.messageId ?? '')} an ${String(data.toAgent ?? data.agentId ?? '')}`
    if (event.type === 'task.enqueued') return `Neue Aufgabe ${String(data.taskId)}: ${String(data.title)}`
    if (event.type === 'watchdog.silent') return `still? ${String(data.agentId)} seit ${String(data.minutes)} min ohne Kontakt`
    if (event.type === 'file.changed') return `Markdown geändert: ${String(data.path)}`
    if (event.type === 'admission.changed') return `Zulassung ${String(data.kind)}: ${String(data.allowed)}`
    return `${event.type}`
  }).join('\n')
}

export function formatWatchResult(events: WatchEvent[], timedOut: boolean, json = false): string {
  return json ? JSON.stringify({ events, timedOut }) : timedOut ? 'Zeitlimit ohne Ereignis.' : humanSummary(events)
}

/** Wait for one relevant Brain event, while sparsely sampling files and host admission. */
export async function runSwarmWatch(options: SwarmWatchOptions): Promise<{ code: 0 | 3 | 1; events: WatchEvent[]; timedOut: boolean }> {
  const emit = options.emit ?? ((events, timedOut) => {
    console.log(formatWatchResult(events, timedOut, options.json))
    if (timedOut && !options.json) {
      const targets = options.forAgent ?? options.agents?.join(', ') ?? 'alle Worker'
      const folders = options.dirs?.length ? `${options.dirs.length} Verzeichnis(se)` : 'keine Verzeichnisse'
      console.log(`Lage: beobachtet wurden ${targets} und ${folders}; geprüft bis zum Zeitlimit von ${Math.ceil(options.timeoutMs / 60_000)} min.`)
    }
  })
  const now = options.now ?? Date.now
  const pollMs = options.pollMs ?? POLL_MS
  const batchMs = options.batchMs ?? BATCH_MS
  const started = now()
  const snapshotFiles = options.snapshotFiles ?? markdownSnapshot
  const sampleAdmission = options.sampleAdmission ?? admissionSnapshot
  let baselineFiles = await snapshotFiles(options.dirs ?? [])
  let baselineAdmission = sampleAdmission()

  return await new Promise((resolveResult) => {
    let finished = false
    let batchTimer: ReturnType<typeof setTimeout> | undefined
    const events: WatchEvent[] = []
    const cleanup = () => {
      if (finished) return
      finished = true
      clearTimeout(timeoutTimer)
      clearInterval(pollTimer)
      if (batchTimer) clearTimeout(batchTimer)
      unsubscribe()
    }
    const finish = (timedOut: boolean, code: 0 | 3 | 1) => {
      if (finished) return
      const resultEvents = events.splice(0)
      cleanup()
      emit(resultEvents, timedOut)
      resolveResult({ code, events: resultEvents, timedOut })
    }
    const onEvent = (event: WatchEvent) => {
      if (!watched(event, options)) return
      events.push(event)
      if (!batchTimer) batchTimer = setTimeout(() => finish(false, 0), batchMs)
    }
    const onError = (error: Error) => {
      const event: WatchEvent = { type: 'watch.error', data: { message: error.message }, timestamp: new Date(now()).toISOString() }
      events.push(event)
      finish(false, 1)
    }
    const unsubscribe = options.subscribe(onEvent, onError)
    const timeoutTimer = setTimeout(() => finish(true, 3), Math.max(0, options.timeoutMs - (now() - started)))
    const pollTimer = setInterval(() => {
      void (async () => {
        const files = await snapshotFiles(options.dirs ?? [])
        for (const [path, signature] of files) {
          if (baselineFiles.get(path) !== signature) onEvent({ type: 'file.changed', data: { path }, timestamp: new Date(now()).toISOString() })
        }
        baselineFiles = files

        const admission = sampleAdmission()
        for (const kind of WORK_KINDS) {
          if (admission[kind] !== baselineAdmission[kind]) onEvent({ type: 'admission.changed', data: { kind, previousAllowed: baselineAdmission[kind], allowed: admission[kind] }, timestamp: new Date(now()).toISOString() })
        }
        baselineAdmission = admission
      })().catch(error => onError(error instanceof Error ? error : new Error(String(error))))
    }, pollMs)
  })
}

function parseDuration(value: string): number | null {
  const match = /^(\d+)(ms|s|m|h)$/.exec(value)
  if (!match) return null
  const scale: Record<string, number> = { ms: 1, s: 1_000, m: 60_000, h: 3_600_000 }
  return Number(match[1]) * scale[match[2]!]!
}

function flagValue(args: string[], name: string): string | undefined {
  const index = args.indexOf(name)
  if (index >= 0) return args[index + 1]
  return args.find(arg => arg.startsWith(`${name}=`))?.slice(name.length + 1)
}

function listFlag(args: string[], name: string): string[] {
  return args.flatMap((arg, index) => arg === name ? (args[index + 1] ?? '').split(',') : arg.startsWith(`${name}=`) ? arg.slice(name.length + 1).split(',') : [])
    .map(item => item.trim()).filter(Boolean)
}

function sseSubscribe(url: string, listener: (event: WatchEvent) => void, onError: (error: Error) => void): () => void {
  const controller = new AbortController()
  let closed = false
  void (async () => {
    try {
      const response = await fetch(url, { headers: { accept: 'text/event-stream' }, signal: controller.signal })
      if (!response.ok || !response.body) throw new Error(`Live-Eventquelle antwortete mit HTTP ${response.status}`)
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let type = 'message'
      while (!closed) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        let boundary = buffer.indexOf('\n\n')
        while (boundary >= 0) {
          const block = buffer.slice(0, boundary).replace(/\r/g, '')
          buffer = buffer.slice(boundary + 2)
          let data = ''
          for (const line of block.split('\n')) {
            if (line.startsWith('event:')) type = line.slice(6).trim()
            else if (line.startsWith('data:')) data += line.slice(5).trim()
          }
          if (data) {
            try { listener({ type, data: JSON.parse(data) as unknown, timestamp: new Date().toISOString() }) }
            catch { /* Ignore malformed or keepalive frames. */ }
          }
          type = 'message'
          boundary = buffer.indexOf('\n\n')
        }
      }
      if (!closed) onError(new Error('Live-Eventquelle wurde geschlossen'))
    } catch (error) {
      if (!closed) onError(error instanceof Error ? error : new Error(String(error)))
    }
  })()
  return () => { closed = true; controller.abort() }
}

export async function runSwarmWatchCli(args: string[]): Promise<number> {
  const forAgent = flagValue(args, '--for')
  const agents = listFlag(args, '--agents')
  const dirs = listFlag(args, '--dirs')
  const timeoutText = flagValue(args, '--timeout') ?? '20m'
  const timeoutMs = parseDuration(timeoutText)
  if (timeoutMs === null || timeoutMs < 0) {
    console.error('usage: plugbrain swarm watch [--for <agent>] [--agents <id,…>] [--dirs <path,…>] [--timeout 20m] [--json]')
    return 2
  }
  const baseUrl = (process.env.PLUGBRAIN_URL ?? 'http://127.0.0.1:4310').replace(/\/$/, '')
  const result = await runSwarmWatch({
    forAgent, agents, dirs, timeoutMs, json: args.includes('--json'),
    subscribe: (listener, onError) => sseSubscribe(`${baseUrl}/api/live/events`, listener, onError),
  })
  return result.code
}
