/**
 * Test Fixture: Agent B (deterministischer Agenten-Prozess fuer M4-Abnahmetest)
 * Erhaelt 409 bei Schreibversuch auf src/x.ts (Halter Agent A),
 * sendet Nachricht an Agent A, wartet auf Freigabe, schreibt erfolgreich
 * und markiert den Auftrag in der Queue als delivered.
 */
const args = process.argv.slice(2)
const flag = (name: string): string => {
  const idx = args.indexOf(name)
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : ''
}

const baseUrl = flag('--url') || 'http://127.0.0.1:4310'
const ws = flag('--workspace') || 'ws-coord-test'
const authKey = flag('--auth') || 'secret-token'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authKey}`,
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const text = await res.text()
  try {
    return { status: res.status, ok: res.ok, data: JSON.parse(text) }
  } catch {
    return { status: res.status, ok: res.ok, data: text }
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function run() {
  // 1. Register agent B
  const reg = await post('/api/agent/register', {
    agentId: 'agent-b',
    name: 'Agent Beta (Fixture)',
    model: 'fixture-beta',
    host: 'localhost',
    workspaceId: ws,
    taskId: 'task-b',
    heartbeatTtlMs: 30000,
  })
  if (!reg.ok) {
    console.error('AGENT_B_ERROR: registration failed', reg.data)
    process.exit(1)
  }
  console.log('AGENT_B_REGISTERED')

  // 2. Enqueue task in queue
  const enqueueRes = await post('/api/queue', {
    workspace: ws,
    title: 'Update src/x.ts module',
    addressedTo: 'agent-b',
  })
  const queuedTask = (enqueueRes.data as { task: { id: string } }).task
  console.log(`AGENT_B_TASK_ENQUEUED: ${queuedTask.id}`)

  // Claim queued task
  const claimTaskRes = await post('/api/queue/claim', {
    workspace: ws,
    agentId: 'agent-b',
  })
  const claimedQueueTask = (claimTaskRes.data as { task: { id: string } }).task
  console.log(`AGENT_B_QUEUE_CLAIMED: ${claimedQueueTask.id}`)

  // 3. Attempt to write src/x.ts -> expect 409 Conflict
  const writeAttempt1 = await post('/api/agent/write', {
    workspaceId: ws,
    agentId: 'agent-b',
    taskId: claimedQueueTask.id,
    path: 'src/x.ts',
    content: 'export const x = 42\n',
  })

  if (writeAttempt1.status !== 409) {
    console.error('AGENT_B_ERROR: expected 409 conflict, got status', writeAttempt1.status, writeAttempt1.data)
    process.exit(1)
  }

  const conflictData = writeAttempt1.data as {
    conflict?: { holder?: { agentId: string; taskId: string; claimedAt: string; lastHeartbeat: string } }
    hardConflicts?: Array<{ holder?: { agentId: string; taskId: string; claimedAt: string; lastHeartbeat: string } }>
  }
  const holder = conflictData.conflict?.holder ?? conflictData.hardConflicts?.[0]?.holder

  if (!holder || holder.agentId !== 'agent-a') {
    console.error('AGENT_B_ERROR: conflict does not name agent-a as holder', writeAttempt1.data)
    process.exit(1)
  }

  if (!holder.lastHeartbeat || !holder.claimedAt) {
    console.error('AGENT_B_ERROR: conflict holder missing claimedAt or lastHeartbeat', holder)
    process.exit(1)
  }

  console.log(`AGENT_B_CONFLICT_VERIFIED: holder ${holder.agentId} task ${holder.taskId} heartbeat ${holder.lastHeartbeat}`)

  // 4. Send message to Agent A asking to yield
  const msgRes = await post('/api/agent/message', {
    workspaceId: ws,
    fromAgent: 'agent-b',
    toAgent: 'agent-a',
    subject: 'Requesting release of src/x.ts',
    body: 'Please release src/x.ts for task-b',
  })
  if (!msgRes.ok) {
    console.error('AGENT_B_ERROR: message send failed', msgRes.data)
    process.exit(1)
  }
  console.log('AGENT_B_MESSAGE_SENT: to agent-a')

  // 5. Retry writing src/x.ts until success (waiting for Agent A to release)
  let writeSuccess = false
  for (let i = 0; i < 20; i++) {
    await sleep(250)
    const retryRes = await post('/api/agent/write', {
      workspaceId: ws,
      agentId: 'agent-b',
      taskId: claimedQueueTask.id,
      path: 'src/x.ts',
      content: 'export const x = 42\n// updated by agent-b\n',
    })
    if (retryRes.status === 200 && retryRes.ok) {
      writeSuccess = true
      break
    }
  }

  if (!writeSuccess) {
    console.error('AGENT_B_ERROR: write did not succeed after wait')
    process.exit(1)
  }
  console.log('AGENT_B_WRITE_SUCCESS: src/x.ts')

  // 6. Deliver the queue task
  const deliverRes = await post('/api/queue/deliver', {
    workspace: ws,
    taskId: claimedQueueTask.id,
    agentId: 'agent-b',
    deliveredPath: 'src/x.ts',
  })
  if (!deliverRes.ok) {
    console.error('AGENT_B_ERROR: queue deliver failed', deliverRes.data)
    process.exit(1)
  }
  console.log(`AGENT_B_DELIVERED: task ${claimedQueueTask.id}`)

  console.log('AGENT_B_DONE')
  process.exit(0)
}

run().catch(err => {
  console.error('AGENT_B_FATAL', err)
  process.exit(1)
})
