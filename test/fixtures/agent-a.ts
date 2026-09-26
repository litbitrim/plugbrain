/**
 * Test Fixture: Agent A (deterministischer Agenten-Prozess fuer M4-Abnahmetest)
 * Beansprucht src/x.ts, liest im laufenden Turn per Long-Poll eingehende Nachrichten
 * und gibt nach Empfang der Aufforderung den Claim frei.
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

async function run() {
  // 1. Register agent A
  const reg = await post('/api/agent/register', {
    agentId: 'agent-a',
    name: 'Agent Alpha (Fixture)',
    model: 'fixture-alpha',
    host: 'localhost',
    workspaceId: ws,
    taskId: 'task-a',
    heartbeatTtlMs: 30000,
  })
  if (!reg.ok) {
    console.error('AGENT_A_ERROR: registration failed', reg.data)
    process.exit(1)
  }
  console.log('AGENT_A_REGISTERED')

  // 2. Claim src/x.ts
  const claimRes = await post('/api/agent/claim', {
    workspaceId: ws,
    agentId: 'agent-a',
    taskId: 'task-a',
    paths: ['src/x.ts'],
    mode: 'write',
    ttlMs: 30000,
  })
  if (!claimRes.ok) {
    console.error('AGENT_A_ERROR: claim failed', claimRes.data)
    process.exit(1)
  }
  console.log('AGENT_A_CLAIMED: src/x.ts')

  // 3. Heartbeat
  await post('/api/agent/heartbeat', { agentId: 'agent-a', taskId: 'task-a' })

  // 4. Read inbox in the same running loop without ending turn (wait up to 10s)
  console.log('AGENT_A_WAITING_FOR_MESSAGE')
  const inboxRes = await post('/api/agent/inbox/read', {
    workspaceId: ws,
    agentId: 'agent-a',
    waitMs: 10000,
  })

  const messages = (inboxRes.data as { messages?: Array<{ id: string; fromAgent: string; body: string }> })?.messages ?? []
  const releaseRequest = messages.find(m => m.fromAgent === 'agent-b')

  if (!releaseRequest) {
    console.error('AGENT_A_ERROR: no message received from agent-b within timeout')
    process.exit(1)
  }

  console.log(`AGENT_A_MESSAGE_RECEIVED: ${releaseRequest.body}`)

  // 5. Release claim on src/x.ts
  const releaseRes = await post('/api/agent/release', {
    workspaceId: ws,
    agentId: 'agent-a',
    taskId: 'task-a',
  })
  if (!releaseRes.ok) {
    console.error('AGENT_A_ERROR: release failed', releaseRes.data)
    process.exit(1)
  }
  console.log('AGENT_A_RELEASED: src/x.ts')

  // 6. Confirm message delivery
  await post('/api/agent/inbox/ack', {
    agentId: 'agent-a',
    messageId: releaseRequest.id,
  })

  console.log('AGENT_A_DONE')
  process.exit(0)
}

run().catch(err => {
  console.error('AGENT_A_FATAL', err)
  process.exit(1)
})
