import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { captureSourceState } from '../scripts/source-state.mjs'

function git(root: string, args: string[]) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true })
}

test('generated NSIS release outputs do not make a clean source checkout dirty', () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-source-state-'))
  try {
    git(root, ['init', '--quiet'])
    git(root, ['config', 'user.email', 'plugbrain-test@localhost.invalid'])
    git(root, ['config', 'user.name', 'PlugBrain source-state test'])
    writeFileSync(join(root, 'README.md'), 'source\n', 'utf8')
    git(root, ['add', 'README.md'])
    git(root, ['commit', '--quiet', '-m', 'fixture'])

    mkdirSync(join(root, 'release'))
    writeFileSync(join(root, 'release', 'PlugBrain-0.1.0-win-x64.exe'), 'generated candidate', 'utf8')
    writeFileSync(join(root, 'release', 'PlugBrain-0.1.0-win-x64.exe.sha256'), 'generated checksum', 'utf8')

    const generatedOnly = captureSourceState(root)
    assert.equal(generatedOnly.dirty, false)
    assert.equal(generatedOnly.dirtyEntryCount, 0)
    assert.match(generatedOnly.dirtyPorcelainSha256, /^[a-f0-9]{64}$/)
    assert.equal(generatedOnly.generatedOutputExcluded, 'release/**')

    writeFileSync(join(root, 'README.md'), 'changed source\n', 'utf8')
    const changedSource = captureSourceState(root)
    assert.equal(changedSource.dirty, true)
    assert.equal(changedSource.dirtyEntryCount, 1)
    assert.notEqual(changedSource.dirtyPorcelainSha256, generatedOnly.dirtyPorcelainSha256)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
