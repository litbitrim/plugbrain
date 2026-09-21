#!/usr/bin/env node
/**
 * Exercise the portable PlugBrain payload exactly as the NSIS installer
 * delivers it: its copied Node runtime runs the bundled daemon and serves the
 * copied UI from an isolated temporary home. This is a packaging smoke test,
 * not an installer-wizard claim.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { once } from 'node:events'

const root = join(import.meta.dirname, '..')
const runtime = join(root, 'dist', process.platform === 'win32' ? 'node.exe' : 'node')
const bundle = join(root, 'dist', 'plugbrain.mjs')
const home = mkdtempSync(join(tmpdir(), 'plugbrain-portable-'))

async function reservePort() {
  const server = createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  if (address === null || typeof address === 'string') throw new Error('could not reserve a local TCP port')
  const { port } = address
  server.close()
  await once(server, 'close')
  return port
}

async function waitFor(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.status === 200) return response
    } catch { /* child may still be binding */ }
    await new Promise(resolve => setTimeout(resolve, 150))
  }
  throw new Error(`portable PlugBrain did not answer ${url} within ${timeoutMs}ms`)
}

const port = await reservePort()
const child = spawn(runtime, [bundle, 'serve', String(port)], {
  cwd: root,
  env: { ...process.env, PLUGBRAIN_HOME: home, PLUGBRAIN_NO_DAEMON: '1' },
  stdio: 'ignore',
  windowsHide: true,
})

try {
  const health = await waitFor(`http://127.0.0.1:${port}/api/health`)
  if (health.status !== 200) throw new Error(`portable health returned ${health.status}`)
  const shell = await waitFor(`http://127.0.0.1:${port}/`)
  const contentType = shell.headers.get('content-type') ?? ''
  if (!contentType.includes('text/html')) throw new Error(`portable UI had unexpected content type: ${contentType}`)
  const html = await shell.text()
  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(match => match[1])
  if (assetPaths.length === 0) throw new Error('portable UI did not reference a built asset')
  for (const assetPath of assetPaths) {
    const response = await waitFor(`http://127.0.0.1:${port}${assetPath}`)
    if (response.status !== 200) throw new Error(`portable UI asset returned ${response.status}: ${assetPath}`)
    const file = join(root, 'dist', 'ui-dist', assetPath.replace(/^\//, ''))
    if (!existsSync(file)) throw new Error(`served portable UI asset is not in its payload: ${assetPath}`)
  }
  console.log(`portable PlugBrain runtime + UI healthy on 127.0.0.1:${port}`)
} finally {
  if (child.exitCode === null && !child.killed) child.kill()
  if (child.exitCode === null) await once(child, 'exit')
  rmSync(home, { recursive: true, force: true })
}
