#!/usr/bin/env node
/**
 * Builds PlugBrain's productive entry.
 *
 * Until this existed the package declared `bin: ./src/cli.ts` and every script
 * ran `node --experimental-strip-types src/cli.ts`, so the daemon only ever
 * started from TypeScript source. That works on a developer machine and is not
 * something you can ship: it makes the runtime depend on the checkout.
 *
 * Bundling is cheap here because the brain has no native dependencies at all --
 * its only imports are node builtins, including node:sqlite, so there is no
 * prebuild to carry and nothing to mark external.
 *
 * ui-dist is copied next to the bundle because the served UI is read from disk;
 * resolveUiRoot() in src/cli.ts looks beside the bundle first for exactly this.
 */
import { build } from 'esbuild'
import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const here = dirname(fileURLToPath(import.meta.url))
const packageRoot = join(here, '..')
const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'))
const dist = join(packageRoot, 'dist')
mkdirSync(dist, { recursive: true })

await build({
  entryPoints: [join(packageRoot, 'src', 'cli.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  outfile: join(dist, 'plugbrain.mjs'),
  banner: {
    // The brain parses TypeScript when it indexes, so src/indexer/ast.ts pulls in
    // the real TS compiler -- a CommonJS bundle that reads __filename and
    // __dirname. Those do not exist in ESM scope, and without them the daemon
    // dies at startup with ReferenceError: __filename is not defined.
    js: [
      "import { createRequire as __pbCreateRequire } from 'node:module';",
      "import { fileURLToPath as __pbFileURLToPath } from 'node:url';",
      "import { dirname as __pbDirname } from 'node:path';",
      'const require = __pbCreateRequire(import.meta.url);',
      'const __filename = __pbFileURLToPath(import.meta.url);',
      'const __dirname = __pbDirname(__filename);',
    ].join(' '),
  },
})

// Recursive copy: ui-dist carries assets/ and fonts/ subdirectories.
function copyTree(from, to) {
  mkdirSync(to, { recursive: true })
  const copied = []
  for (const name of readdirSync(from)) {
    if (name.startsWith('.')) continue
    const source = join(from, name)
    const destination = join(to, name)
    if (statSync(source).isDirectory()) copied.push(...copyTree(source, destination))
    else { copyFileSync(source, destination); copied.push(destination) }
  }
  return copied
}

const uiSource = join(packageRoot, 'ui-dist')
const uiOut = join(dist, 'ui-dist')
const uiFiles = copyTree(uiSource, uiOut)
if (uiFiles.length === 0) throw new Error('ui-dist is empty; the served UI would be blank')

const digest = path => createHash('sha256').update(readFileSync(path)).digest('hex')
const WIN_SEP = String.fromCharCode(92) // this toolchain collapses escaped backslashes
const releasePaths = ['plugbrain.mjs', ...uiFiles.map(f => relative(dist, f).split(WIN_SEP).join('/'))]
writeFileSync(join(dist, 'release.json'), `${JSON.stringify({
  schema: 1,
  releaseId: `plugbrain-${manifest.version}`,
  version: manifest.version,
  platform: process.platform,
  arch: process.arch,
  files: Object.fromEntries(releasePaths.map(p => [p, { sha256: digest(join(dist, p)) }])),
  signature: { type: 'none', status: 'UNSIGNED_NOT_FOR_PUBLIC_RELEASE' },
}, null, 2)}\n`)
console.log(`plugbrain bundle + ${uiFiles.length} ui files`)
