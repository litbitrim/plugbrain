/**
 * Question-by-question analysis across all 3 tools
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const WORKTREE = 'C:/PLUG/plugpt/Code/PlugBrain-Core--bench';
const RAW_DIR = join(WORKTREE, 'bench/v2/raw');
const QUESTIONS_DIR = join(WORKTREE, 'bench/v2/questions');

const repos = ['mcpz', 'plugmedia', 'cowork', 'plugengine'];
const tools = ['plugbrain', 'gitnexus', 'codegraph'];

const data = {};
for (const t of tools) {
  data[t] = {};
  for (const r of repos) {
    data[t][r] = JSON.parse(readFileSync(join(RAW_DIR, `${t}-${r}.json`), 'utf8'));
  }
}

const matrix = [];

for (const r of repos) {
  const questions = JSON.parse(readFileSync(join(QUESTIONS_DIR, `${r}.json`), 'utf8'));
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const pbQ = data.plugbrain[r].questions.find(x => x.id === q.id);
    const gnQ = data.gitnexus[r].questions.find(x => x.id === q.id);
    const cgQ = data.codegraph[r].questions.find(x => x.id === q.id);

    matrix.push({
      repo: r,
      id: q.id,
      type: q.type,
      question: q.question,
      query_param: q.query_param,
      expected: q.expected,
      plugbrain: {
        hit: pbQ?.hit ?? false,
        rank: pbQ?.rank ?? -1,
        latencyMs: pbQ?.latencyMs ?? 0
      },
      gitnexus: {
        hit: gnQ?.hit ?? false,
        rank: gnQ?.rank ?? -1,
        latencyMs: gnQ?.latencyMs ?? 0
      },
      codegraph: {
        hit: cgQ?.hit ?? false,
        rank: cgQ?.rank ?? -1,
        latencyMs: cgQ?.latencyMs ?? 0
      }
    });
  }
}

writeFileSync(join(RAW_DIR, 'matrix.json'), JSON.stringify(matrix, null, 2));

console.log(`Generated matrix for ${matrix.length} questions.`);
let pbOnly = 0, cgOnly = 0, gnOnly = 0, allThree = 0, none = 0;
for (const m of matrix) {
  const p = m.plugbrain.hit;
  const g = m.gitnexus.hit;
  const c = m.codegraph.hit;
  if (p && g && c) allThree++;
  else if (!p && !g && !c) none++;
  else if (p && !g && !c) pbOnly++;
  else if (!p && !g && c) cgOnly++;
  else if (!p && g && !c) gnOnly++;
}

console.log(`All three right: ${allThree}`);
console.log(`None right: ${none}`);
console.log(`PlugBrain only: ${pbOnly}`);
console.log(`CodeGraph only: ${cgOnly}`);
console.log(`GitNexus only: ${gnOnly}`);
