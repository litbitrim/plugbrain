import { strict as assert } from 'node:assert'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, realpathSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { inspectDeliveryEvidence } from '../src/coord/delivery-evidence.ts'

function fixture() {
  const home = realpathSync.native(mkdtempSync(join(tmpdir(), 'plugbrain-delivery-evidence-')))
  const root = join(home, 'workspace-with-long-name')
  const outside = join(home, 'workspace-with-long-name-outside')
  mkdirSync(root)
  mkdirSync(outside)
  writeFileSync(join(root, 'DONE.md'), 'real evidence\n')
  writeFileSync(join(outside, 'DONE.md'), 'outside evidence\n')
  return { home, root, outside }
}

test('evidence identity uses the physical workspace and rejects sibling and junction escapes', () => {
  const { home, root, outside } = fixture()
  const alias = join(home, 'workspace-alias')
  symlinkSync(root, alias, process.platform === 'win32' ? 'junction' : 'dir')
  const evidence = inspectDeliveryEvidence(alias, join(root, 'DONE.md'))
  assert.equal(evidence.path, 'DONE.md')
  assert.equal(evidence.sha256, createHash('sha256').update('real evidence\n').digest('hex'))
  assert.throws(() => inspectDeliveryEvidence(root, join(outside, 'DONE.md')), /inside the workspace/)
  const escape = join(root, 'escape')
  symlinkSync(outside, escape, process.platform === 'win32' ? 'junction' : 'dir')
  assert.throws(() => inspectDeliveryEvidence(root, join(escape, 'DONE.md')), /inside the workspace/)
})

test('Windows short and long names identify the same evidence boundary', {
  skip: process.platform !== 'win32' ? 'Windows short path aliases' : false,
}, t => {
  const { root, outside } = fixture()
  const shortPath = spawnSync('cmd.exe', ['/d', '/c', `for %I in ("${root}") do @echo %~sI`], {
    encoding: 'utf8', windowsVerbatimArguments: true, windowsHide: true, timeout: 10_000,
  })
  assert.equal(shortPath.status, 0, shortPath.error?.message ?? shortPath.stderr)
  const shortRoot = shortPath.stdout.trim()
  if (shortRoot.toLowerCase() === root.toLowerCase()) {
    t.skip('this volume does not provide short path aliases')
    return
  }
  assert.equal(realpathSync.native(shortRoot), root)
  assert.equal(inspectDeliveryEvidence(root, join(shortRoot, 'DONE.md')).path, 'DONE.md')
  assert.equal(inspectDeliveryEvidence(shortRoot, join(root, 'DONE.md')).path, 'DONE.md')
  assert.throws(() => inspectDeliveryEvidence(shortRoot, join(outside, 'DONE.md')), /inside the workspace/)
})
