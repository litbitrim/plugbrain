/**
 * Aggregate benchmark results across PlugBrain, GitNexus, and CodeGraph
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAW_DIR, QUESTIONS_DIR } from './paths.mjs';

const repos = ['mcpz', 'plugmedia', 'cowork', 'plugengine'];
const tools = ['plugbrain', 'gitnexus', 'codegraph'];

const summaries = {
  plugbrain: JSON.parse(readFileSync(join(RAW_DIR, 'plugbrain-summary.json'), 'utf8')),
  gitnexus: JSON.parse(readFileSync(join(RAW_DIR, 'gitnexus-summary.json'), 'utf8')),
  codegraph: JSON.parse(readFileSync(join(RAW_DIR, 'codegraph-summary.json'), 'utf8')),
};

console.log('=== OVERALL SUMMARY ===');
console.log('Tool       | Hits / 80 | Accuracy | Total Index Time | Total Index Size');
for (const t of tools) {
  const s = summaries[t];
  const sizeMb = Math.round((s.totalIndexSizeBytes / 1024 / 1024) * 10) / 10;
  const timeS = Math.round(s.totalIndexTimeMs / 100) / 10;
  console.log(`${t.padEnd(10)} | ${s.totalHits.toString().padStart(4)} / 80 | ${s.overallAccuracy.toString().padStart(6)}%  | ${timeS.toString().padStart(8)} s     | ${sizeMb.toString().padStart(6)} MB`);
}

console.log('\n=== PER-REPOSITORY BREAKDOWN ===');
for (const r of repos) {
  console.log(`\n--- ${r.toUpperCase()} ---`);
  console.log('Tool       | Hits / 20 | Accuracy | Index Time (s) | Index Size (MB) | Latency p50 (ms) | Latency p95 (ms)');
  for (const t of tools) {
    const s = summaries[t].repos.find(x => x.repo === r);
    const sizeMb = Math.round((s.indexSizeBytes / 1024 / 1024) * 10) / 10;
    const timeS = Math.round(s.indexTimeMs / 100) / 10;
    console.log(`${t.padEnd(10)} | ${s.hitCount.toString().padStart(4)} / 20 | ${s.accuracy.toString().padStart(6)}%  | ${timeS.toString().padStart(11)} s  | ${sizeMb.toString().padStart(12)} MB  | ${s.latencyP50Ms.toString().padStart(13)} ms  | ${s.latencyP95Ms.toString().padStart(13)} ms`);
  }
}
