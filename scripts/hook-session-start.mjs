#!/usr/bin/env node
/**
 * Claude Code SessionStart hook for PlugBrain.
 *
 * Contract (see hooks/hooks.json, timeout is 2 s):
 *  - probe /api/health on the default port;
 *  - if the brain is not running, start `plugbrain serve` detached in the
 *    background (never awaited);
 *  - print exactly one line with the UI URL and exit 0 — the session must
 *    never be blocked by this hook.
 */
import { spawn } from 'node:child_process'
import { request } from 'node:http'

const PORT = process.env.PLUGBRAIN_PORT ?? 4310
const BASE = `http://127.0.0.1:${PORT}`
const PROBE_TIMEOUT_MS = 1500

function probeHealth() {
  return new Promise((resolve) => {
    const req = request(`${BASE}/api/health`, { method: 'GET' }, (res) => {
      res.resume()
      resolve(res.statusCode === 200)
    })
    req.setTimeout(PROBE_TIMEOUT_MS, () => {
      req.destroy()
      resolve(false)
    })
    req.on('error', () => resolve(false))
    req.end()
  })
}

function startBrain() {
  try {
    const child = spawn('plugbrain', ['serve', String(PORT)], {
      detached: true,
      stdio: 'ignore',
      shell: process.platform === 'win32',
    })
    child.unref()
    return true
  } catch {
    return false
  }
}

const healthy = await probeHealth()
if (!healthy) {
  startBrain()
  // Give the daemon a short grace period so the first MCP call does not race
  // the listener, but never exceed the hook budget.
  await new Promise((resolve) => setTimeout(resolve, 400))
}

console.log(`PlugBrain: http://127.0.0.1:${PORT}/`)
process.exit(0)
