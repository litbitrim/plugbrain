import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'
import { join } from 'node:path'

export type RegistryHomeReader = () => string | null

/**
 * Reads HKCU\Environment\PLUGBRAIN_HOME on Windows via reg.exe.
 * Returns null if not on Windows, if the value does not exist, or on error.
 */
export function readWindowsRegistryHome(): string | null {
  if (process.platform !== 'win32') return null
  try {
    const out = execFileSync('reg.exe', ['query', 'HKCU\\Environment', '/v', 'PLUGBRAIN_HOME'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 2000,
    })
    const match = out.match(/PLUGBRAIN_HOME\s+REG_\w+\s+(.+)/i)
    return match ? match[1]!.trim() : null
  } catch {
    return null
  }
}

/**
 * Resolves the PlugBrain home directory in order of priority:
 * 1. process.env.PLUGBRAIN_HOME (if set and non-empty)
 * 2. HKCU\Environment\PLUGBRAIN_HOME on Windows
 * 3. ~/.plugbrain
 */
export function resolveBrainHome(
  env: NodeJS.ProcessEnv = process.env,
  regReader: RegistryHomeReader = readWindowsRegistryHome
): string {
  const envVal = env.PLUGBRAIN_HOME
  if (envVal && envVal.trim()) {
    return envVal.trim()
  }
  const regVal = regReader()
  if (regVal && regVal.trim()) {
    return regVal.trim()
  }
  return join(homedir(), '.plugbrain')
}
