/** Standalone knowledge commands use registered workspaces without requiring a Planet. */
import { strict as assert } from 'node:assert'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { workspaceIdFor } from '../src/planet.ts'

test('notes CLI selects one workspace, rejects ambiguity, and never searches the selector as text', () => {
  const root = mkdtempSync(join(tmpdir(), 'plugbrain-notes-cli-'))
  const home = join(root, 'home')
  const first = join(root, 'first')
  const second = join(root, 'second')
  for (const dir of [home, first, second]) mkdirSync(dir)
  writeFileSync(join(first, 'Checkout.md'), '# Checkout\n\nCheckout calculates the total.\n')
  writeFileSync(join(second, 'Private.md'), '# Other project\n\nCheckout belongs to another workspace.\n')
  const run = (...args: string[]) => spawnSync(process.execPath, [
    '--experimental-strip-types', join(import.meta.dirname, '../src/cli.ts'), ...args,
  ], {
    cwd: root, encoding: 'utf8', windowsHide: true,
    env: { ...process.env, PLUGBRAIN_HOME: home, PLUGBRAIN_CONFIG_HOME: home, HOME: home, USERPROFILE: home },
  })
  try {
    assert.equal(run('init', first, '--no-clients', '--no-agents-file').status, 0)
    const implicit = run('notes', 'search', 'Checkout', '--json')
    assert.equal(implicit.status, 0, implicit.stderr)
    assert.equal(JSON.parse(implicit.stdout).total, 1)
    assert.equal(run('notes', 'read', 'Checkout.md', '--json').status, 0)
    assert.equal(run('init', second, '--no-clients', '--no-agents-file').status, 0)
    assert.equal(run('notes', 'list', '--json').status, 2)
    const id = workspaceIdFor(first)
    for (const selector of [['--workspace', id], [`--workspace=${id}`]]) {
      const scoped = run('notes', 'search', 'Checkout', ...selector, '--json')
      assert.equal(scoped.status, 0, scoped.stderr)
      const result = JSON.parse(scoped.stdout) as { total: number; query: string; hits: Array<{ path: string }> }
      assert.equal(result.total, 1)
      assert.equal(result.query, 'Checkout')
      assert.equal(result.hits[0]?.path, 'Checkout.md')
      for (const command of ['list', 'query', 'graph', 'backlinks', 'read']) {
        const positional = ['read', 'backlinks'].includes(command) ? ['Checkout.md'] : command === 'query' ? ['typ=guide'] : []
        const selected = run('notes', command, ...positional, ...selector, '--json')
        assert.equal(selected.status, 0, `${command}: ${selected.stderr}`)
      }
    }
    for (const selector of [
      ['--workspace', 'ws-not-registered'], ['--workspace'], ['--workspace='],
      ['--workspace', '--json'], ['--workspace', id, '--workspace', id],
    ]) assert.equal(run('notes', 'search', 'Checkout', ...selector).status, 2)
    assert.equal(run('notes', 'write', 'Added.md', '--content', '# Added\n', '--workspace', id, '--json').status, 0)
    const added = run('notes', 'read', 'Added.md', '--workspace', id, '--json')
    assert.equal(added.status, 0, added.stderr)
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
  }
})
