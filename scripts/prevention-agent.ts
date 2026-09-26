/**
 * One real local agent process used by the prevention proof.
 *
 * It deliberately talks only to the proof server passed on the command line;
 * there is no fallback to the live Core or an ambient PLUGBRAIN_HOME.
 */
import { createInterface } from 'node:readline'

const args = process.argv.slice(2)
const flag = (name: string): string => {
  const index = args.indexOf(name)
  return index >= 0 ? (args[index + 1] ?? '') : ''
}

const baseUrl = flag('--url')
const authKey = flag('--auth')
const workspaceId = flag('--workspace')
const agentId = flag('--agent')
const taskId = flag('--task')
const path = flag('--path')
const checkoutId = flag('--checkout')
const role = flag('--role')

if (!baseUrl || !authKey || !workspaceId || !agentId || !taskId || !path || !role) {
  throw new Error('proof agent requires url, auth, workspace, agent, task, path, and role')
}

const headers = { 'content-type': 'application/json', authorization: `Bearer ${authKey}` }
const emit = (event: string, data: Record<string, unknown> = {}): void => {
  // Fence IDs/epochs are proof artifacts. Never emit the auth credential.
  process.stdout.write(JSON.stringify({ event, agentId, taskId, ...data }) + '\n')
}

async function request(pathname: string, method: 'GET' | 'POST' = 'POST', body?: unknown): Promise<{ status: number; data: any }> {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: method === 'POST' ? headers : undefined,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })
  const text = await response.text()
  let data: unknown = text
  try { data = JSON.parse(text) } catch { /* report status only */ }
  return { status: response.status, data }
}

let lease: { id: string; epoch: number } | null = null

async function register(): Promise<void> {
  const response = await request('/api/agent/register', 'POST', {
    workspaceId, agentId, taskId, checkoutId, name: `P1 ${agentId}`,
    model: role === 'first' ? 'proof-nvidia-slot-a' : 'proof-nvidia-slot-b',
    host: 'local-prevention-proof', heartbeatTtlMs: 60_000,
  })
  if (response.status !== 200) throw new Error(`registration failed (${response.status})`)
  emit('registered', { checkoutId })
}

async function acquire(): Promise<void> {
  const response = await request('/api/agent/claim', 'POST', {
    workspaceId, agentId, taskId, paths: [path], mode: 'write', ttlMs: 60_000,
  })
  if (response.status !== 200 || !response.data?.lease?.id || typeof response.data.lease.epoch !== 'number') {
    throw new Error(`claim failed (${response.status})`)
  }
  lease = { id: response.data.lease.id, epoch: response.data.lease.epoch }
  emit('fence.acquired', { leaseId: lease.id, epoch: lease.epoch, path })
}

async function write(kind: 'write.accepted' | 'write.stale-denied', expectedStatus: number): Promise<void> {
  if (!lease) throw new Error('write requested before a fence was acquired')
  const response = await request('/api/agent/write', 'POST', {
    workspaceId, agentId, taskId, path,
    content: `export const owner = '${agentId}'\n`, leaseId: lease.id, epoch: lease.epoch,
  })
  if (response.status !== expectedStatus) throw new Error(`expected write status ${expectedStatus}, received ${response.status}`)
  emit(kind, { status: response.status, leaseId: lease.id, epoch: lease.epoch, fencing: response.data?.fencing === true })
}

async function attemptWithoutFence(): Promise<void> {
  const response = await request('/api/agent/write', 'POST', {
    workspaceId, agentId, taskId, path, content: `export const owner = '${agentId}'\n`,
  })
  if (response.status !== 409) throw new Error(`expected conflict 409, received ${response.status}`)
  emit('write.prevented', { status: response.status, beforeEffect: true, fencing: response.data?.fencing === true, error: String(response.data?.error ?? '') })
}

async function context(): Promise<void> {
  const response = await request('/api/mission/context-pack', 'POST', {
    workspaceId, taskId, agentId, checkoutId, scopePaths: [path], requirementIds: ['38.4', 'NS22-030'], tokenBudget: 900,
  })
  if (response.status !== 200 || !response.data?.pack?.id) throw new Error(`context pack failed (${response.status})`)
  emit('context.created', {
    packId: response.data.pack.id,
    generation: response.data.pack.revision?.generation ?? null,
    checkoutRevision: response.data.pack.revision?.checkoutRevision ?? null,
  })
}

async function feed(packId: string): Promise<void> {
  const response = await request(`/api/mission/context-pack/${encodeURIComponent(packId)}/changes`, 'GET')
  if (response.status !== 200 || response.data?.changes?.stale !== true) throw new Error(`expected stale changes feed (${response.status} ${JSON.stringify(response.data).slice(0, 600)})`)
  emit('context.stale', { packId, stale: true, changed: response.data.changes.changed?.length ?? 0, checkoutChanged: response.data.changes.checkoutChanged === true })
}

async function release(): Promise<void> {
  if (!lease) throw new Error('release requested before a fence was acquired')
  const response = await request('/api/agent/release', 'POST', { workspaceId, agentId, taskId, leaseId: lease.id })
  if (response.status !== 200) throw new Error(`release failed (${response.status})`)
  emit('fence.released', { leaseId: lease.id, epoch: lease.epoch })
}

async function run(): Promise<void> {
  await register()
  if (role === 'first') await acquire()
  if (role === 'second') await context()
  emit('ready')
  const input = createInterface({ input: process.stdin, crlfDelay: Infinity })
  for await (const line of input) {
    const [command, value = ''] = line.trim().split(' ', 2)
    if (command === 'attempt') await attemptWithoutFence()
    else if (command === 'write') await write('write.accepted', 200)
    else if (command === 'release') await release()
    else if (command === 'stale') await write('write.stale-denied', 409)
    else if (command === 'acquire-write') { await acquire(); await write('write.accepted', 200) }
    else if (command === 'feed') await feed(value)
    else if (command === 'exit') { input.close(); return }
    else throw new Error(`unknown proof command: ${command}`)
  }
}

run().catch(error => { emit('fatal', { message: error instanceof Error ? error.message : String(error) }); process.exit(1) })
