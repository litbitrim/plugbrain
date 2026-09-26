import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { resolveBrainHome } from '../src/home.ts'

test('resolveBrainHome: prefers process.env.PLUGBRAIN_HOME when present', () => {
  let regCalled = false
  const mockReg = (): string | null => {
    regCalled = true
    return 'C:\\registry\\plugbrain'
  }
  const result = resolveBrainHome(
    { PLUGBRAIN_HOME: 'C:\\env\\plugbrain' } as NodeJS.ProcessEnv,
    mockReg
  )
  assert.equal(result, 'C:\\env\\plugbrain')
  assert.equal(regCalled, false, 'registry should not be queried when env var is present')
})

test('resolveBrainHome: reads Windows registry when env lacks PLUGBRAIN_HOME', () => {
  let regCalled = false
  const mockReg = (): string | null => {
    regCalled = true
    return 'C:\\registry\\plugbrain'
  }
  const result = resolveBrainHome(
    {} as NodeJS.ProcessEnv,
    mockReg
  )
  assert.equal(result, 'C:\\registry\\plugbrain')
  assert.equal(regCalled, true, 'registry must be queried when env var is missing')
})

test('resolveBrainHome: falls back to ~/.plugbrain when both env and registry are empty', () => {
  let regCalled = false
  const mockReg = (): string | null => {
    regCalled = true
    return null
  }
  const result = resolveBrainHome(
    {} as NodeJS.ProcessEnv,
    mockReg
  )
  assert.equal(result, join(homedir(), '.plugbrain'))
  assert.equal(regCalled, true, 'registry was checked before falling back')
})
