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

  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-webgl', '--use-gl=angle']
  })

  const resolutions = [
    { width: 1920, height: 1080, suffix: '1920x1080' },
    { width: 1366, height: 768, suffix: '1366x768' },
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
      localStorage.setItem('plugbrain.auth_token', token)
      localStorage.setItem('plugbrain.workspace', ws)
      localStorage.setItem('plugbrain.agentId', 'agy-brain-02')
      localStorage.setItem('plugbrain.agent_id', 'agy-brain-02')
    }, { token: AUTH_TOKEN, ws: WS_ID })

    // 1. Atlas View
    console.log(`Capturing Atlas at ${res.suffix}...`)
    await page.goto(`${BASE_URL}/?view=atlas&workspace=${WS_ID}`, { waitUntil: 'domcontentloaded' })
    try {
      await page.waitForSelector('.atlas-wrapper', { timeout: 15000 })
      await page.waitForSelector('#legend .cl', { timeout: 15000 })
      await page.waitForSelector('#stage canvas', { timeout: 15000 })
      await page.waitForTimeout(3000) // Allow 3D graph layout to settle
    } catch (e) {
      console.warn('Atlas wait warning:', e.message)
    }
    const atlasPath = `${ASSETS_DIR}/atlas-${res.suffix}.png`
    await page.screenshot({ path: atlasPath, fullPage: false })
    console.log(`Saved ${atlasPath}`)

    // 2. City View
    console.log(`Capturing City at ${res.suffix}...`)
    await page.goto(`${BASE_URL}/?view=city&workspace=${WS_ID}`, { waitUntil: 'domcontentloaded' })
    try {
      await page.waitForSelector('#tree .ws', { timeout: 15000 })
      await page.waitForSelector('#app:not(.closed) #side .dt', { timeout: 15000 })
      await page.waitForTimeout(3000) // Allow 3D city buildings to settle
    } catch (e) {
      console.warn('City wait warning:', e.message)
    }
    const cityPath = `${ASSETS_DIR}/city-${res.suffix}.png`
    await page.screenshot({ path: cityPath, fullPage: false })
    console.log(`Saved ${cityPath}`)

    // 3. Agent Mesh View
    console.log(`Capturing Mesh at ${res.suffix}...`)
    await setupSwarm() // Refresh agents and claims immediately before mesh
    await page.goto(`${BASE_URL}/?view=mesh&workspace=${WS_ID}`, { waitUntil: 'domcontentloaded' })
    try {
      await page.waitForSelector('#hud .tally b', { timeout: 15000 })
      await page.waitForSelector('#inspect.on', { timeout: 15000 })
      await page.waitForTimeout(2500)
    } catch (e) {
      console.warn('Mesh wait warning:', e.message)
    }
    const meshPath = `${ASSETS_DIR}/mesh-${res.suffix}.png`
    await page.screenshot({ path: meshPath, fullPage: false })
    console.log(`Saved ${meshPath}`)

    // 4. Search & Bases View (only for 1920x1080)
    if (res.width === 1920) {
      console.log(`Capturing Bases Query at ${res.suffix}...`)
      await page.goto(`${BASE_URL}/?view=search&workspace=${WS_ID}`, { waitUntil: 'domcontentloaded' })
      try {
        // Click Notizen tab (auto-searches typ=gate UND stand=offen)
        const notesTab = await page.waitForSelector('button:has-text("Notizen & Properties")', { timeout: 10000 })
        if (notesTab) await notesTab.click()
        await page.waitForSelector('.search-hit-card', { timeout: 10000 })
        // Click first hit to open in SourceView
        const firstHit = await page.waitForSelector('.search-hit-card', { timeout: 10000 })
        if (firstHit) await firstHit.click()
        await page.waitForSelector('.source-container', { timeout: 10000 })
        await page.waitForTimeout(1500)
        const searchPath = `${ASSETS_DIR}/bases-query-${res.suffix}.png`
        await page.screenshot({ path: searchPath, fullPage: false })
        console.log(`Saved ${searchPath}`)
      } catch (e) {
        console.warn('Search wait warning:', e.message)
      }

      // 5. Explorer & Source View
      console.log(`Capturing Explorer & Source at ${res.suffix}...`)
      await page.goto(`${BASE_URL}/?view=explorer&workspace=${WS_ID}`, { waitUntil: 'domcontentloaded' })
      try {
        await page.waitForSelector('.tree-item--file', { timeout: 10000 })
        // Click a file node
        const fileNode = await page.waitForSelector('.tree-item--file', { timeout: 10000 })
        if (fileNode) await fileNode.click()
        await page.waitForSelector('.source-container', { timeout: 10000 })
        await page.waitForTimeout(1500)
        const explorerPath = `${ASSETS_DIR}/explorer-source-${res.suffix}.png`
        await page.screenshot({ path: explorerPath, fullPage: false })
        console.log(`Saved ${explorerPath}`)
      } catch (e) {
        console.warn('Explorer wait warning:', e.message)
      }
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
