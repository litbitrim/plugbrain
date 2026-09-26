import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'

// release/ is exclusively package output.  It is deliberately outside the
// source-dirty predicate so that a candidate does not make itself look like
// uncommitted source work.
const GENERATED_RELEASE_PATHSPEC = ':(exclude)release/**'

export function captureSourceState(root) {
  const git = args => execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
  }).trim()

  const porcelain = git(['status', '--porcelain=v1', '-uall', '--', '.', GENERATED_RELEASE_PATHSPEC])
  const entries = porcelain === '' ? [] : porcelain.split(/\r?\n/).filter(Boolean)

  return {
    head: git(['rev-parse', 'HEAD']),
    dirty: entries.length > 0,
    dirtyEntryCount: entries.length,
    dirtyPorcelainSha256: createHash('sha256').update(porcelain, 'utf8').digest('hex'),
    generatedOutputExcluded: 'release/**',
  }
}
