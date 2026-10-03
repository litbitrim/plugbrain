/**
 * Every test process gets its own PLUGBRAIN_HOME.
 *
 * Run state — the index-run lock and its progress — lives in files under the
 * store home, and the owner's machine exports PLUGBRAIN_HOME for the live
 * planet. A test that started the API without a home of its own read the LIVE
 * run directory: whenever the real brain was indexing or pruning, every
 * store-writing route in the test answered 503 "an index run is already in
 * progress", and the suite looked flaky under load when it was in fact reading
 * the owner's machine.
 *
 * Import this first, before anything that could open a store or read a run.
 */
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const isolatedHome = mkdtempSync(join(tmpdir(), 'plugbrain-test-home-'))
process.env.PLUGBRAIN_HOME = isolatedHome
delete process.env.PLUGBRAIN_ATTEMPT_TOKEN
delete process.env.PLUGBRAIN_SUPERVISED_AGENT
delete process.env.PLUGBRAIN_SUPERVISOR_ID
process.on('exit', () => {
  try { rmSync(isolatedHome, { recursive: true, force: true }) } catch { /* a locked temp dir is left to the OS */ }
})
