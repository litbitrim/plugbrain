import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { openStore } from '../src/store/schema.ts'
import { serve } from '../src/server/api.ts'
import { registerSwarmAgent } from '../src/coord/registry.ts'
import { registerWorkerProfile, recordTurn } from '../src/coord/swarm-ops.ts'

test('Turns renders an authenticated fixture timeline and opens turn details', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-ui-turns-'))
  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = 'ws-ui-turns'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(workspaceId, 'UI Turns Fixture', join(dir, 'workspace'), new Date().toISOString())
  registerSwarmAgent(db, { agentId: 'fixture-worker', name: 'Fixture Worker', model: 'fixture-model', workspaceId })
  registerWorkerProfile(db, { agentId: 'fixture-worker', surface: 'other', account: 'fixture-account', model: 'fixture-model' })
  recordTurn(db, { workspaceId, agentId: 'fixture-worker', phase: 'start' })
  db.prepare('UPDATE swarm_turn_history SET started_at = ? WHERE agent_id = ?')
    .run(new Date(Date.now() - 31 * 60_000).toISOString(), 'fixture-worker')
    db.prepare('UPDATE agents SET turn_state_at = ?, last_heartbeat = ? WHERE id = ?')
      .run(new Date(Date.now() - 31 * 60_000).toISOString(), new Date(Date.now() - 31 * 60_000).toISOString(), 'fixture-worker')

  const authKey = 'fixture-ui-' + 'x'.repeat(24)
  const server = await serve({ db, uiRoot: join(process.cwd(), 'ui-dist'), authKey, requireAuth: true }, 0)
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' })
    const evidenceDir = process.env.PLUGBRAIN_UI_MESH_EVIDENCE_DIR ?? dir
    mkdirSync(evidenceDir, { recursive: true })
    await page.goto(`http://127.0.0.1:${server.port}/?view=turns&workspace=${workspaceId}`, { waitUntil: 'networkidle' })
    await page.getByRole('heading', { name: 'Turns' }).waitFor()
    await page.getByText('Fixture Worker').waitFor()
    const block = page.getByRole('button', { name: /Fixture Worker, Läuft, still\?/ })
    await block.waitFor()
    await block.click()
    await page.getByText('Keine aktiven Claims.').waitFor()
    await page.getByText('Beginn', { exact: true }).waitFor()
    await page.locator('.turns-still-label').getByText(/still\? seit 31 min/).waitFor()
    await page.screenshot({ path: join(evidenceDir, 'candidate-turns-fixture.png'), fullPage: true })
    assert.equal(await page.locator('.turns-block[data-state="running"]').count(), 1)
    assert.equal(await page.locator('.turns-block[data-still="true"]').count(), 1)
    assert.equal(await page.getByRole('button', { name: '0 ungelesen' }).getAttribute('aria-pressed'), 'false')
    await page.getByRole('button', { name: '0 ungelesen' }).click()
    await page.getByText('Keine registrierten Worker in diesem Workspace.').waitFor()
    await page.getByRole('button', { name: '0 ungelesen' }).click()
    await block.waitFor()
  } finally {
    await browser.close()
    await server.close()
    db.close()
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10 }) } catch { /* fixture cleanup */ }
  }
})
