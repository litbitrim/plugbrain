/**
 * B-MCP evidence runner. GitNexus is deliberately a comparison input only;
 * the production MCP server does not import, start, or require it.
 */
import { createHash } from 'node:crypto'
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { openStore } from '../src/store/schema.ts'
import { indexWorkspace } from '../src/indexer/index.ts'
import { workspaceIdFor } from '../src/planet.ts'
import { McpServer } from '../src/mcp/server.ts'

export interface GitNexusComparisonReceipt {
  schema: 1
  corpus: { path: string; gitHead: string }
  gitNexus: { binary: string; status: 'indexed' }
  questions: Array<{
    name: 'query' | 'context' | 'impact' | 'detect_changes' | 'cypher' | 'rename_preview'
    brain: { ok: boolean; digest: string; provenance: unknown }
    gitNexus: { supported: boolean; exitCode: number; digest: string | null; reason?: string }
  }>
  assertions: { sameQuestionsExecuted: boolean; brainProvenanceComplete: boolean; renamePreviewReadOnly: boolean }
  generatedAt: string
}

const digest = (value: string): string => createHash('sha256').update(value).digest('hex')

function command(commandPath: string, args: string[], cwd: string): { status: number; output: string } {
  // npm exposes Windows CLIs as .cmd files, which Node cannot execute directly
  // with shell:false. Invoke the command processor explicitly, retaining a
  // quoted argument boundary instead of relying on Node's shell option.
  const shimTarget = process.platform === 'win32' && commandPath.toLowerCase().endsWith('.cmd')
    ? join(dirname(commandPath), 'node_modules', 'gitnexus', 'dist', 'cli', 'index.js')
    : null
  const executable = shimTarget !== null && existsSync(shimTarget) ? process.execPath : commandPath
  const directArgs = shimTarget !== null && existsSync(shimTarget) ? [shimTarget, ...args] : args
  // This runner's CLI vocabulary is deliberately token-only: paths, symbols,
  // and the compact Cypher query below contain no shell metacharacters. Refuse
  // anything else rather than trying to quote untrusted input through cmd.exe.
  if (process.platform === 'win32' && commandPath.toLowerCase().endsWith('.cmd') && executable === commandPath
      && [...args, commandPath].some(value => /[\s"&|<>^]/.test(value))) {
    return { status: 1, output: 'GitNexus comparison command contains unsupported shell characters' }
  }
  const commandLine = [commandPath, ...args].join(' ')
  const executableArgs = executable === commandPath
    ? directArgs
    : directArgs
  const result = spawnSync(executable, executableArgs, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
  })
  return {
    status: result.status ?? 1,
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`.trim(),
  }
}

function gitNexusRepoAlias(binary: string, repo: string): string {
  const listing = command(binary, ['list'], repo)
  if (listing.status !== 0) throw new Error(`could not list GitNexus repositories: ${listing.output}`)
  const lines = listing.output.split(/\r?\n/)
  const expected = resolve(repo).toLowerCase()
  for (let i = 0; i < lines.length; i++) {
    const path = lines[i].trim().replace(/^Path:\s*/, '')
    if (!lines[i].trimStart().startsWith('Path:') || resolve(path).toLowerCase() !== expected) continue
    for (let j = i - 1; j >= 0; j--) {
      const label = lines[j].trim()
      if (label === '') continue
      return label.replace(/\s+\(.+\)$/, '')
    }
  }
  throw new Error(`GitNexus has no registered alias for comparison corpus: ${repo}`)
}

function git(repo: string, args: string[]): string {
  return execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', windowsHide: true }).trim()
}

function hasProvenance(value: any): boolean {
  const provenance = value?.provenance
  return provenance?.source?.system === 'plugbrain'
    && provenance?.source?.corpus === 'indexed-workspace'
    && Array.isArray(provenance?.scope?.workspaceIds)
    && Array.isArray(provenance?.revisionVector)
}

/** Run both implementations against the same checked-out Brain repository. */
export async function runGitNexusComparison(options: {
  repo?: string
  gitNexusBinary?: string
  gitNexusRepo?: string
  receiptPath?: string
} = {}): Promise<GitNexusComparisonReceipt> {
  const repo = resolve(options.repo ?? process.cwd())
  if (!existsSync(join(repo, '.git'))) throw new Error(`comparison corpus is not a git checkout: ${repo}`)
  const gitNexusBinary = options.gitNexusBinary ?? process.env.GITNEXUS_BIN
    ?? (process.platform === 'win32' && process.env.APPDATA
      ? join(process.env.APPDATA, 'npm', 'gitnexus.cmd')
      : 'gitnexus')
  const status = command(gitNexusBinary, ['status'], repo)
  if (status.status !== 0) {
    throw new Error(`GitNexus corpus is not indexed: ${status.output || 'gitnexus status failed'}`)
  }
  const gitNexusRepo = options.gitNexusRepo ?? process.env.GITNEXUS_REPO ?? gitNexusRepoAlias(gitNexusBinary, repo)

  const temp = mkdtempSync(join(tmpdir(), 'plugbrain-gitnexus-compare-'))
  const db = openStore(join(temp, 'brain.db'))
  try {
    const workspaceId = workspaceIdFor(repo)
    db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
      .run(workspaceId, basename(repo), repo, new Date().toISOString())
    indexWorkspace(db, workspaceId, repo, { full: true })
    const mcp = new McpServer({ db, workspaceId })
    const gitHead = git(repo, ['rev-parse', 'HEAD'])
    const sourceFile = 'src/mcp/server.ts'
    const diffText = git(repo, ['diff', '--no-ext-diff', '--unified=0', 'HEAD~1', 'HEAD'])
    const symbolQuery = 'McpServer'
    const query = await mcp.executeTool('query', { workspaceId, query: symbolQuery, limit: 5 })
    const symbol = ((query.result as { symbols?: Array<{ id: number; name: string }> }).symbols ?? [])
      .find(row => row.name === symbolQuery)
    if (!symbol) throw new Error(`Brain index did not expose ${symbolQuery} in ${sourceFile}`)
    const calls: Array<{
      name: GitNexusComparisonReceipt['questions'][number]['name']
      brain: Promise<{ ok: boolean; [key: string]: unknown }>
      gitNexus: string[] | null
    }> = [
      { name: 'query', brain: Promise.resolve(query), gitNexus: ['query', symbolQuery, '--limit', '5', '--repo', gitNexusRepo] },
      { name: 'context', brain: mcp.executeTool('context', { workspaceId, name: symbolQuery, file: sourceFile }), gitNexus: ['context', symbolQuery, '--file', sourceFile, '--repo', gitNexusRepo] },
      { name: 'impact', brain: mcp.executeTool('impact', { workspaceId, target: symbolQuery, direction: 'upstream', maxDepth: 2 }), gitNexus: ['impact', symbolQuery, '--file', sourceFile, '--direction', 'upstream', '--depth', '2', '--repo', gitNexusRepo] },
      { name: 'detect_changes', brain: mcp.executeTool('detect_changes', { workspaceId, diffText }), gitNexus: ['detect-changes', '--scope', 'compare', '--base-ref', 'HEAD~1', '--repo', gitNexusRepo] },
      { name: 'cypher', brain: mcp.executeTool('cypher', { workspaceId, query: 'MATCH (n:Function) RETURN count(n)' }), gitNexus: ['cypher', 'MATCH (n:Function) RETURN count(n)', '--repo', gitNexusRepo] },
      // GitNexus has no rename-preview CLI/MCP command. The explicit unsupported
      // entry makes this Brain-only read feature visible instead of fabricated.
      { name: 'rename_preview', brain: mcp.executeTool('rename_preview', { workspaceId, symbolId: symbol.id, newName: 'McpServerPreview' }), gitNexus: null },
    ]
    const questions: GitNexusComparisonReceipt['questions'] = []
    for (const call of calls) {
      const brain = await call.brain
      if (!hasProvenance(brain)) throw new Error(`Brain ${call.name} omitted source, scope, or revision vector`)
      const compared = call.gitNexus === null ? null : command(gitNexusBinary, call.gitNexus, repo)
      questions.push({
        name: call.name,
        brain: { ok: brain.ok, digest: digest(JSON.stringify(brain.result ?? brain)), provenance: brain.provenance },
        gitNexus: compared === null
          ? { supported: false, exitCode: 0, digest: null, reason: 'GitNexus exposes no rename-preview command' }
          : { supported: true, exitCode: compared.status, digest: digest(compared.output) },
      })
    }
    const receipt: GitNexusComparisonReceipt = {
      schema: 1,
      corpus: { path: repo, gitHead },
      gitNexus: { binary: gitNexusBinary, status: 'indexed' },
      questions,
      assertions: {
        sameQuestionsExecuted: questions.filter(question => question.gitNexus.supported).length === 5
          && questions.filter(question => question.gitNexus.supported).every(question => question.gitNexus.exitCode === 0),
        brainProvenanceComplete: questions.every(question => hasProvenance({ provenance: question.brain.provenance })),
        renamePreviewReadOnly: questions.find(question => question.name === 'rename_preview')?.brain.ok === true,
      },
      generatedAt: new Date().toISOString(),
    }
    if (!receipt.assertions.sameQuestionsExecuted || !receipt.assertions.brainProvenanceComplete || !receipt.assertions.renamePreviewReadOnly) {
      throw new Error('B-MCP comparison assertions failed')
    }
    if (options.receiptPath) {
      mkdirSync(dirname(options.receiptPath), { recursive: true })
      writeFileSync(options.receiptPath, JSON.stringify(receipt, null, 2) + '\n')
    }
    return receipt
  } finally {
    db.close()
    rmSync(temp, { recursive: true, force: true })
  }
}

const invoked = process.argv[1] !== undefined && resolve(process.argv[1]) === resolve(import.meta.filename)
if (invoked) {
  // Without --receipt the receipt stays inside the checkout: release/ is gitignored.
  const receiptFlag = process.argv.indexOf('--receipt')
  const evidencePath = receiptFlag >= 0 && process.argv[receiptFlag + 1] !== undefined
    ? resolve(process.argv[receiptFlag + 1])
    : resolve(import.meta.dirname, '..', 'release', 'evidence', 'gitnexus-comparison-receipt.json')
  runGitNexusComparison({ receiptPath: evidencePath })
    .then(receipt => process.stdout.write(`B-MCP comparison passed: ${receipt.questions.length} questions\n`))
    .catch(error => { process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`); process.exitCode = 1 })
}
