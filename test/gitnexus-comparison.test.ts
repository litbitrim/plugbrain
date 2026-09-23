/** The external comparison is opt-in because it requires a real local GitNexus index. */
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { runGitNexusComparison } from '../scripts/compare-gitnexus-parity.ts'

const enabled = process.env.PLUG_GITNEXUS_COMPARE === '1'

test('B-MCP: the Brain corpus receives the same GitNexus comparison questions', { skip: !enabled }, async () => {
  const receipt = await runGitNexusComparison({ repo: process.cwd() })
  assert.equal(receipt.assertions.sameQuestionsExecuted, true)
  assert.equal(receipt.assertions.brainProvenanceComplete, true)
  assert.equal(receipt.assertions.renamePreviewReadOnly, true)
  assert.equal(receipt.questions.filter(question => question.gitNexus.supported).length, 5)
  assert.equal(receipt.questions.find(question => question.name === 'rename_preview')?.gitNexus.supported, false)
})
