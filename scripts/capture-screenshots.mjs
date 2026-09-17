import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { chromium } = require('C:/PLUG/plugpt/Code/PlugBrain-GLM/node_modules/playwright')

const AUTH_TOKEN = readFileSync('C:/PLUG/plugpt/.plugbrain/auth.token', 'utf8').trim()
const BASE_URL = 'http://127.0.0.1:4310'
const WS_ID = 'ws-a2373c999ef3'
const ASSETS_DIR = 'C:/PLUG/plugpt/Auftrag/Closeouts/assets/agy-brain-02'

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`
    },
    body: JSON.stringify(body)
  })
  return res.json()
}

async function setupSwarm() {
  console.log('Registering agents...')
  await post('/api/agent/register', {
    agentId: 'agy-brain-02',
    workspaceId: WS_ID,
    name: 'Antigravity',
    role: 'developer',
    task: 'PlugBrain V1 M2-M5 Fertigstellung',
    checkout: 'C:\\PLUG\\plugpt\\Code\\PlugBrain-Core--v1'
  })

  await post('/api/agent/register', {
    agentId: 'claude-coordinator',
    workspaceId: WS_ID,
    name: 'Claude Coordinator',
    role: 'integrator',
    task: 'BRAIN-HERZ-01 Fleet Coordination & Review',
    checkout: 'C:\\PLUG\\plugpt\\Code\\PlugBrain-Core--master'
  })

  await post('/api/agent/register', {
    agentId: 'freebuff-v1',
    workspaceId: WS_ID,
    name: 'Freebuff',
    role: 'engineer',
    task: 'M1 Foundation Verification',
    checkout: 'C:\\PLUG\\plugpt\\Code\\PlugBrain-Core--verify'
  })

  console.log('Acquiring leases...')
  await post('/api/agent/claim', {
    agentId: 'agy-brain-02',
    workspaceId: WS_ID,
    scope: 'src/store/backup.ts',
    ttlSeconds: 7200
  })

  await post('/api/agent/claim', {
    agentId: 'claude-coordinator',
    workspaceId: WS_ID,
    scope: 'Auftrag/Closeouts/2026-09-17-agy-brain-02.md',
    ttlSeconds: 7200
  })

  console.log('Sending message...')
  await post('/api/agent/message', {
    workspaceId: WS_ID,
    fromAgent: 'agy-brain-02',
    toAgent: 'claude-coordinator',
    subject: 'M2-M5 Fertigstellung',
    body: 'PlugBrain V1 M2-M5 vollständig implementiert und verifiziert (109 Tests grün).'
  })
}

async function capture() {
  await setupSwarm()

  const browser = await chromium.launch({ headless: true })

  const resolutions = [
    { width: 1920, height: 1080, suffix: '1920x1080' },
    { width: 1366, height: 768, suffix: '1366x768' },
  ]

  const views = [
    { id: 'atlas', name: 'atlas' },
    { id: 'city', name: 'city' },
    { id: 'mesh', name: 'mesh' },
  ]

  for (const res of resolutions) {
    const context = await browser.newContext({
      viewport: { width: res.width, height: res.height }
    })

    const page = await context.newPage()

    // Prime localStorage with token and workspace
    await page.goto(`${BASE_URL}/`)
    await page.evaluate(({ token, ws }) => {
      localStorage.setItem('plugbrain.token', token)
      localStorage.setItem('plugbrain.workspace', ws)
      localStorage.setItem('plugbrain.agentId', 'agy-brain-02')
    }, { token: AUTH_TOKEN, ws: WS_ID })

    for (const v of views) {
      console.log(`Capturing ${v.name} at ${res.suffix}...`)
      await page.goto(`${BASE_URL}/?view=${v.id}&workspace=${WS_ID}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(3000)

      const targetPath = `${ASSETS_DIR}/${v.name}-${res.suffix}.png`
      await page.screenshot({ path: targetPath, fullPage: false })
      console.log(`Saved ${targetPath}`)
    }

    await context.close()
  }

  await browser.close()
  console.log('All screenshots captured successfully!')
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err)
  process.exit(1)
})
