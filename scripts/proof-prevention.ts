/**
 * P1 / NS22-030 proof: two real agent processes, two linked worktrees, one
 * live local Brain server, and a machine-readable prevention receipt.
 */
import { execFileSync, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { discoverCheckouts, indexPlanetWorkspace, listPlanet, registerPlanet, setPlanetIndexSelection } from '../src/planet.ts'
import { serve, type ServerHandle } from '../src/server/api.ts'

export interface PreventionReceipt {
  schema: 1
  proof: 'P1-prevention-proof'
  createdAt: string
  server: { port: number; runtime: string; home: string }
  workspaceId: string
  target: { logicalPath: string; firstWorktreePath: string; secondWorktreePath: string }
  checkouts: Array<{ id: string; branch: string | null; revision: string | null }>
  fenceTokens: { first: { leaseId: string; epoch: number }; second: { leaseId: string; epoch: number } }
  context: { packId: string; generation: number | null; checkoutRevision: string | null }
  events: Array<Record<string, unknown>>
  assertions: { firstWrite: boolean; secondPreventedBeforeEffect: boolean; staleWriterPrevented: boolean; contextStale: boolean }
  artifact: { receipt: string; retainedTempPlanet: string }
}

interface Agent {
  child: ChildProcessWithoutNullStreams
  events: Array<Record<string, any>>
  errors: string[]
}

const args = process.argv.slice(2)
const flag = (name: string): string | undefined => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined }
const git = (cwd: string, args: string[]): string => execFileSync('git', ['-c', 'user.email=p1@proof.local', '-c', 'user.name=P1 Prevention Proof', '-c', 'commit.gpgsign=false', ...args], { cwd, encoding: 'utf8', windowsHide: true }).trim()
const write = (root: string, relative: string, body: string): void => {
  const file = join(root, relative); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, body, 'utf8')
  const future = new Date(Date.now() + 2_000); utimesSync(file, future, future)
}
const defaultReceipt = resolve(import.meta.dirname, '../../..', 'koordination', 'closeout', 'native-orch-20260923', 'P1', 'prevention-receipt.json')

function spawnAgent(input: { url: string; auth: string; workspace: string; agent: string; task: string; path: string; checkout: string; role: 'first' | 'second' }): Agent {
  const child = spawn(process.execPath, ['--experimental-strip-types', join(import.meta.dirname, 'prevention-agent.ts'),
    '--url', input.url, '--auth', input.auth, '--workspace', input.workspace, '--agent', input.agent,
    '--task', input.task, '--path', input.path, '--checkout', input.checkout, '--role', input.role,
  ], { stdio: 'pipe', windowsHide: true })
  const agent: Agent = { child, events: [], errors: [] }
  let buffered = ''
  child.stdout.on('data', data => {
    buffered += String(data)
    const lines = buffered.split(/\r?\n/); buffered = lines.pop() ?? ''
    for (const line of lines) { if (line.trim() !== '') { try { agent.events.push(JSON.parse(line)) } catch { agent.errors.push(`non-json stdout: ${line}`) } } }
  })
  child.stderr.on('data', data => agent.errors.push(String(data)))
  return agent
}

async function waitFor(agent: Agent, event: string, timeoutMs = 10_000): Promise<Record<string, any>> {
  const end = Date.now() + timeoutMs
  while (Date.now() < end) {
    const found = agent.events.find(entry => entry.event === event)
    if (found) return found
    if (agent.child.exitCode !== null) throw new Error(`agent exited before ${event}: ${agent.errors.join(' ')}`)
    await new Promise(resolve => setTimeout(resolve, 20))
  }
  throw new Error(`timed out waiting for ${event}: ${agent.errors.join(' ')}`)
}

async function command(agent: Agent, line: string, event: string): Promise<Record<string, any>> {
  const before = agent.events.length
  agent.child.stdin.write(`${line}\n`)
  const end = Date.now() + 10_000
  while (Date.now() < end) {
    const found = agent.events.slice(before).find(entry => entry.event === event)
    if (found) return found
    if (agent.child.exitCode !== null) throw new Error(`agent exited after ${line}: ${JSON.stringify(agent.events.slice(before))} ${agent.errors.join(' ')}`)
    await new Promise(resolve => setTimeout(resolve, 20))
  }
  throw new Error(`timed out after ${line}: ${agent.errors.join(' ')}`)
}

async function stop(agent: Agent): Promise<void> {
  if (agent.child.exitCode !== null) return
  agent.child.stdin.write('exit\n'); agent.child.stdin.end()
  await new Promise<void>(resolve => agent.child.once('exit', () => resolve()))
}

export async function runPreventionProof(receiptPath = flag('--receipt') ?? defaultReceipt): Promise<PreventionReceipt> {
  const tempRoot = mkdtempSync(join(tmpdir(), 'plugbrain-p1-prevention-'))
  const planet = join(tempRoot, 'planet'); const code = join(planet, 'Code'); const firstRoot = join(code, 'fence-repo'); const secondRoot = join(code, 'fence-repo--second')
  mkdirSync(firstRoot, { recursive: true })
  git(firstRoot, ['init', '-q']); write(firstRoot, 'src/shared.ts', "export const owner = 'seed'\n"); git(firstRoot, ['add', '.']); git(firstRoot, ['commit', '-q', '-m', 'seed']); git(firstRoot, ['branch', '-M', 'main'])
  git(firstRoot, ['worktree', 'add', '-q', '-b', 'proof-second', secondRoot])
  const dbFile = join(tempRoot, 'proof-brain.db'); const proofHome = join(tempRoot, 'brain-home'); mkdirSync(proofHome, { recursive: true })
  const oldHome = process.env.PLUGBRAIN_HOME; process.env.PLUGBRAIN_HOME = proofHome
  const db = openStore(dbFile); let server: ServerHandle | null = null; let first: Agent | null = null; let second: Agent | null = null
  try {
    const registered = registerPlanet(db, planet, 'p1-prevention')
    const checkoutIds = discoverCheckouts(code, registered.planetId).map(checkout => checkout.checkoutId)
    setPlanetIndexSelection(db, registered.workspaceId, checkoutIds); indexPlanetWorkspace(db, registered.workspaceId)
    const inventory = listPlanet(db, registered.workspaceId)
    const firstCheckout = inventory.checkouts.find(checkout => checkout.relPrefix === 'Code/fence-repo')
    const secondCheckout = inventory.checkouts.find(checkout => checkout.relPrefix === 'Code/fence-repo--second')
    if (!firstCheckout || !secondCheckout) throw new Error('proof worktrees were not registered')
    const auth = `p1-${Math.random().toString(36).slice(2)}-${Date.now()}`
    server = await serve({ db, dbFile, uiRoot: null, authKey: auth }, 0)
    const url = `http://127.0.0.1:${server.port}`
    first = spawnAgent({ url, auth, workspace: registered.workspaceId, agent: 'agent-p1-first', task: 'task-p1-first', path: 'Code/fence-repo/src/shared.ts', checkout: firstCheckout.id, role: 'first' })
    const firstFence = await waitFor(first, 'fence.acquired')
    second = spawnAgent({ url, auth, workspace: registered.workspaceId, agent: 'agent-p1-second', task: 'task-p1-second', path: 'Code/fence-repo--second/src/shared.ts', checkout: secondCheckout.id, role: 'second' })
    const context = await waitFor(second, 'context.created')
    await waitFor(second, 'ready')
    const prevented = await command(second, 'attempt', 'write.prevented')
    const secondBefore = readFileSync(join(secondRoot, 'src/shared.ts'), 'utf8')
    await command(first, 'write', 'write.accepted')
    // Filesystem clock granularity can otherwise make a just-written fixture
    // indistinguishable from its initial index pass. The agent write remains the
    // mutation under test; this only advances the observable file timestamp.
    const changedFile = join(firstRoot, 'src/shared.ts'); const later = new Date(Date.now() + 4_000); utimesSync(changedFile, later, later)
    indexPlanetWorkspace(db, registered.workspaceId)
    const stale = await command(second, `feed ${context.packId}`, 'context.stale')
    await command(first, 'release', 'fence.released')
    const secondWritten = await command(second, 'acquire-write', 'write.accepted')
    const staleDenied = await command(first, 'stale', 'write.stale-denied')
    const receipt: PreventionReceipt = {
      schema: 1, proof: 'P1-prevention-proof', createdAt: new Date().toISOString(),
      server: { port: server.port, runtime: process.version, home: 'temp PLUGBRAIN_HOME' }, workspaceId: registered.workspaceId,
      target: { logicalPath: 'src/shared.ts', firstWorktreePath: 'Code/fence-repo/src/shared.ts', secondWorktreePath: 'Code/fence-repo--second/src/shared.ts' },
      checkouts: [firstCheckout, secondCheckout].map(checkout => ({ id: checkout.id, branch: checkout.branch, revision: checkout.revision })),
      fenceTokens: { first: { leaseId: String(firstFence.leaseId), epoch: Number(firstFence.epoch) }, second: { leaseId: String(secondWritten.leaseId), epoch: Number(secondWritten.epoch) } },
      context: { packId: String(context.packId), generation: context.generation === null ? null : Number(context.generation), checkoutRevision: context.checkoutRevision === null ? null : String(context.checkoutRevision) },
      events: [...first.events, ...second.events].filter(event => event.event !== 'ready'),
      assertions: { firstWrite: true, secondPreventedBeforeEffect: prevented.status === 409 && secondBefore.includes("owner = 'seed'"), staleWriterPrevented: staleDenied.status === 409, contextStale: stale.stale === true },
      artifact: { receipt: receiptPath, retainedTempPlanet: planet },
    }
    if (!Object.values(receipt.assertions).every(Boolean)) throw new Error('prevention assertions did not all hold')
    mkdirSync(dirname(receiptPath), { recursive: true }); writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n', 'utf8')
    return receipt
  } finally {
    if (first) await stop(first); if (second) await stop(second); if (server) await server.close(); db.close()
    if (oldHome === undefined) delete process.env.PLUGBRAIN_HOME; else process.env.PLUGBRAIN_HOME = oldHome
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  runPreventionProof().then(receipt => process.stdout.write(JSON.stringify({ ok: true, receipt: receipt.artifact.receipt, assertions: receipt.assertions }) + '\n'))
    .catch(error => { process.stderr.write(`proof:prevention failed: ${error instanceof Error ? error.stack ?? error.message : String(error)}\n`); process.exitCode = 1 })
}
