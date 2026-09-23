/** Validate the M18a corpus without pretending an unavailable E1 run happened. */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type GoldCase = { id: string; class: string; repository: string; target: string; question: string; expected: { path: string; kind: string; symbol?: string; script?: string; error?: string; failureMode?: string } }
type Corpus = { schema: number; measurement: { tool: string; status: string; reason: string }; cases: GoldCase[] }
const root = resolve(import.meta.dirname, '..')
const corpus = JSON.parse(readFileSync(resolve(root, 'bench', 'gold-corpus-v2.json'), 'utf8')) as Corpus
const required = ['code', 'build', 'notes', 'cross-repo', 'rename', 'delete', 'branch-error', 'rights-error']
if (corpus.schema !== 2) throw new Error('gold corpus v2 schema must equal 2')
if (corpus.measurement.tool !== 'E1' || corpus.measurement.status !== 'PENDING_E1' || corpus.measurement.reason.trim() === '') {
  throw new Error('corpus must report the unavailable E1 measurement honestly')
}
for (const category of required) if (!corpus.cases.some(entry => entry.class === category)) throw new Error(`missing required gold class: ${category}`)
const ids = new Set<string>()
for (const entry of corpus.cases) {
  if (!entry.id || ids.has(entry.id)) throw new Error(`invalid or duplicate gold id: ${entry.id}`)
  ids.add(entry.id)
  if (!entry.question || !entry.target || !entry.repository || !entry.expected.path) throw new Error(`incomplete gold case: ${entry.id}`)
  if (entry.repository === 'PlugBrain-Core' && !existsSync(resolve(root, entry.expected.path))) throw new Error(`Brain target does not exist: ${entry.id}`)
}
process.stdout.write(`Gold corpus v2 valid: ${corpus.cases.length} cases; E1 measurement ${corpus.measurement.status}\n`)
