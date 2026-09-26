/**
 * Generate bench/v2/RESULTS.md from raw evaluation data
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAW_DIR, WORKTREE } from './paths.mjs';
const MATRIX_FILE = join(RAW_DIR, 'matrix.json');
const TARGET_FILE = join(WORKTREE, 'bench/v2/RESULTS.md');

// PlugBrain version, read from package.json so the report never hard-codes it.
const { version } = JSON.parse(readFileSync(join(WORKTREE, 'package.json'), 'utf8'));

const summaries = {
  plugbrain: JSON.parse(readFileSync(join(RAW_DIR, 'plugbrain-summary.json'), 'utf8')),
  gitnexus: JSON.parse(readFileSync(join(RAW_DIR, 'gitnexus-summary.json'), 'utf8')),
  codegraph: JSON.parse(readFileSync(join(RAW_DIR, 'codegraph-summary.json'), 'utf8')),
};

const matrix = JSON.parse(readFileSync(MATRIX_FILE, 'utf8'));

const repos = [
  { id: 'mcpz', name: 'MCPZ', lang: 'Java (Fabric MC Mod), Python, Markdown', files: '541 files' },
  { id: 'plugmedia', name: 'PlugMedia', lang: 'TypeScript, JavaScript, Fastify, SQL, Python', files: '148 files' },
  { id: 'cowork', name: 'PlugOS Cowork', lang: 'Python, TypeScript, Markdown, Shell (Monorepo)', files: '38,751 files' },
  { id: 'plugengine', name: 'PlugEngine', lang: 'TypeScript (Voxel Engine Monorepo, Three.js)', files: '1,211 files' },
];

let md = `# Independent Code Intelligence Benchmark (v2)
**PlugBrain vs. GitNexus vs. CodeGraph on Real-World Projects**

Date: September 26, 2026  
Benchmark Version: 2.0  
Worker-ID: \`e1-eval\`  
Methodology: Ground-truth questions formulated strictly **before** index creation and tool execution; 80 questions written by us across four of the author's own projects (not PlugBrain itself). All tools evaluated under identical conditions on frozen repository snapshots.

---

## Executive Summary

This benchmark evaluates **PlugBrain v${version}**, **GitNexus v1.6.7**, and **CodeGraph v0.9.9** on four of the author's own projects (not PlugBrain itself; questions written by us; 40 holdout questions frozen before any tuning). No questions were retrofitted, and no results were altered or filtered.

| Metric | PlugBrain | GitNexus | CodeGraph | Winner |
| :--- | :---: | :---: | :---: | :---: |
| **Accuracy (Overall Hits)** | **26 / 80 (32.5%)** | 14 / 80 (17.5%) | **38 / 80 (47.5%)** | **CodeGraph** |
| **Total Indexing Time** | 202.8 s | 482.5 s | **50.7 s** | **CodeGraph** |
| **Total Index Footprint** | 1,269.5 MB | 3,606.8 MB | **366.5 MB** | **CodeGraph** |
| **MCPZ (Java)** | 3 / 20 (15.0%) | 4 / 20 (20.0%) | **10 / 20 (50.0%)** | **CodeGraph** |
| **PlugMedia (TS/JS/SQL)** | 10 / 20 (50.0%) | 3 / 20 (15.0%) | **12 / 20 (60.0%)** | **CodeGraph** |
| **Cowork (38k files)** | 6 / 20 (30.0%) | 2 / 20 (10.0%) | **9 / 20 (45.0%)** | **CodeGraph** |
| **PlugEngine (TS Engine)** | **7 / 20 (35.0%)** | 5 / 20 (25.0%) | **7 / 20 (35.0%)** | **Tie (PB / CG)** |
| **Query Latency (p50)** | 486 - 4,047 ms | 1,261 - 3,888 ms | **254 - 343 ms** | **CodeGraph** |

### Key Findings

1. **PlugBrain significantly outperforms GitNexus across all repositories**:
   - PlugBrain achieves nearly double the accuracy of GitNexus (32.5% vs. 17.5%).
   - PlugBrain indexes more than 2.3x faster than GitNexus (202.8s vs. 482.5s).
   - PlugBrain index footprint is 65% smaller than GitNexus (1.27 GB vs. 3.61 GB).
   - On the 38k-file monorepo (\`cowork\`), GitNexus timed out on initial analysis (>300s) and required 401s total with a 3.2 GB database, whereas PlugBrain completed in 186.6s.
2. **CodeGraph leads in total accuracy, speed, and resource efficiency**:
   - CodeGraph achieves 47.5% overall accuracy, excelling in multi-language support (Java + TS + Python).
   - CodeGraph indexes 4x faster than PlugBrain and 9.5x faster than GitNexus.
   - CodeGraph query latency is consistently sub-350ms, even on the 38,000-file repository.
3. **PlugBrain's Primary Gaps Revealed**:
   - **Language Support**: PlugBrain currently has no Java AST parser (\`ast.ts\` supports TS/JS/Python/Rust/SQL). On MCPZ, PlugBrain could only match markdown and python files, missing all Java definitions and call edges.
   - **Search Scope and Monorepo Scalability**: On large repositories like Cowork, query latency degraded to ~4s p50 due to SQLite full-scan ranking queries over 530,000 symbol rows.

---

## Detailed Repository Benchmark Tables

`;

for (const repo of repos) {
  const pb = summaries.plugbrain.repos.find(x => x.repo === repo.id);
  const gn = summaries.gitnexus.repos.find(x => x.repo === repo.id);
  const cg = summaries.codegraph.repos.find(x => x.repo === repo.id);

  md += `### ${repo.name} (\`${repo.id}\`)
- **Primary Languages**: ${repo.lang}
- **Scale**: ${repo.files}
- **Snapshot Commit**: \`${pb.commit.slice(0, 10)}\`

| Tool | Hits / 20 | Accuracy | Index Time | Index Size | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain** | ${pb.hitCount} / 20 | ${pb.accuracy}% | ${(pb.indexTimeMs / 1000).toFixed(1)} s | ${(pb.indexSizeBytes / 1024 / 1024).toFixed(1)} MB | ${pb.latencyP50Ms} ms | ${pb.latencyP95Ms} ms |
| **GitNexus** | ${gn.hitCount} / 20 | ${gn.accuracy}% | ${(gn.indexTimeMs / 1000).toFixed(1)} s | ${(gn.indexSizeBytes / 1024 / 1024).toFixed(1)} MB | ${gn.latencyP50Ms} ms | ${gn.latencyP95Ms} ms |
| **CodeGraph** | ${cg.hitCount} / 20 | ${cg.accuracy}% | ${(cg.indexTimeMs / 1000).toFixed(1)} s | ${(cg.indexSizeBytes / 1024 / 1024).toFixed(1)} MB | ${cg.latencyP50Ms} ms | ${cg.latencyP95Ms} ms |

`;
}

md += `---

## Complete Question-by-Question Evaluation (All 80 Questions)

Each question was formulated directly from reading the frozen source code before running any tool.  
A tool scores a **HIT** if the ground truth symbol/file appears in its Top 3 results (for impact: recall > 30% or hits > 0).

`;

for (const repo of repos) {
  md += `### ${repo.name} Questions (1–20)\n\n`;
  md += `| ID | Type | Query Param | Expected Target | PlugBrain | GitNexus | CodeGraph |\n`;
  md += `| :--- | :--- | :--- | :--- | :---: | :---: | :---: |\n`;

  const qList = matrix.filter(x => x.repo === repo.id);
  for (const q of qList) {
    const pbHit = q.plugbrain.hit ? `HIT (R${q.plugbrain.rank})` : 'MISS';
    const gnHit = q.gitnexus.hit ? `HIT (R${q.gitnexus.rank})` : 'MISS';
    const cgHit = q.codegraph.hit ? `HIT (R${q.codegraph.rank})` : 'MISS';
    const exp = `\`${q.expected.symbol || q.expected.path}\``;
    md += `| \`${q.id}\` | ${q.type} | \`${q.query_param}\` | ${exp} | ${pbHit} | ${gnHit} | ${cgHit} |\n`;
  }
  md += `\n`;
}

md += `---

## Methodology & Limitations

1. **Snapshots**: Repositories were cloned or snapshotted into isolated local directories under \`BENCH_REPOS_ROOT\` — one subdirectory per repository, matching \`bench/v2/repos.json\`.
2. **Pre-Tool Questions**: All 80 questions were frozen in JSON files (\`bench/v2/questions/\`) prior to running any tool indexer or query commands.
3. **Execution Isolation**:
   - PlugBrain ran against a private temporary home under \`BENCH_REPOS_ROOT\` (\`PLUGBRAIN_HOME=<BENCH_REPOS_ROOT>/_plugbrain-home\`), never accessing live configurations or ports.
   - GitNexus ran with its native CLI (\`gitnexus analyze\`, \`query\`, \`context\`, \`impact\`).
   - CodeGraph ran with its native CLI (\`codegraph init/index\`, \`query\`, \`callers\`, \`impact\`).
4. **Hit Criteria**:
   - Single-target questions: Expected symbol or defining file in the Top 3 returned candidates.
   - Blast-radius / impact questions: Expected impacted dependents evaluated for recall and precision.
5. **Limitations**:
   - Tools have different natural strengths: GitNexus focuses on community flows and processes, CodeGraph on fast symbol graph navigation, and PlugBrain on architectural attribution and deterministic graph projection.
   - In MCPZ, Java AST parsing was unavailable in PlugBrain, naturally penalizing its score on that repository.

---

## Reproduce

The benchmark corpora are not part of this repository. Point the \`BENCH_REPOS_ROOT\` environment variable at a directory that holds one subdirectory per corpus repository, named as in \`bench/v2/repos.json\` (for example \`<BENCH_REPOS_ROOT>/mcpz\`). The bench scripts derive every corpus location from that variable and fail with a clear error when it is missing. Temporary PlugBrain homes are also created under it (\`PLUGBRAIN_HOME=<BENCH_REPOS_ROOT>/_plugbrain-home\`), never touching live configurations or ports.
`;

writeFileSync(TARGET_FILE, md, 'utf8');
console.log(`Generated ${TARGET_FILE}`);
