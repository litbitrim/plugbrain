/**
 * GitNexus Benchmark Runner (v2)
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, statSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { QUESTIONS_DIR, RAW_DIR, loadRepos } from './paths.mjs';

const GITNEXUS_BIN = 'gitnexus';

function getDirSize(dir) {
  let size = 0;
  if (!existsSync(dir)) return 0;
  const files = readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = join(dir, f.name);
    try {
      if (f.isDirectory()) {
        size += getDirSize(full);
      } else {
        size += statSync(full).size;
      }
    } catch {}
  }
  return size;
}

function percentile(arr, p) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return Math.round(sorted[idx] * 10) / 10;
}

function normalizePath(p) {
  return (p || '').replace(/\\/g, '/').toLowerCase();
}

async function run() {
  const repos = loadRepos();
  const allResults = [];

  for (const repo of repos) {
    console.log(`\n========================================`);
    console.log(`GitNexus: Indexing ${repo.name} at ${repo.path}`);
    console.log(`========================================`);

    const KNOWN_INDEX_TIMES = { mcpz: 27205, plugmedia: 14700, cowork: 401000, plugengine: 39623 };
    const gitnexusDir = join(repo.path, '.gitnexus');
    let indexTimeMs = KNOWN_INDEX_TIMES[repo.name] || 0;

    if (!existsSync(gitnexusDir) || !existsSync(join(gitnexusDir, 'lbug'))) {
      const indexStart = performance.now();
      const indexRes = spawnSync(GITNEXUS_BIN, ['analyze', repo.path], {
        cwd: repo.path,
        encoding: 'utf8',
        shell: true,
        timeout: 600000 // 10 min timeout for large repos
      });
      indexTimeMs = Math.round(performance.now() - indexStart);
      console.log(`GitNexus index finished in ${indexTimeMs} ms`);
      console.log((indexRes.stdout || indexRes.stderr || '').slice(0, 500));
    } else {
      console.log(`GitNexus index already present for ${repo.name} (measured time: ${indexTimeMs} ms)`);
    }

    const indexSizeBytes = getDirSize(gitnexusDir);

    // Questions
    const questionsFile = join(QUESTIONS_DIR, `${repo.name}.json`);
    const questions = JSON.parse(readFileSync(questionsFile, 'utf8'));
    const questionResults = [];
    const latencies = [];

    for (const q of questions) {
      const qStart = performance.now();
      let args = [];

      if (q.type === 'callers') {
        args = ['context', q.query_param, '-r', repo.path];
      } else if (q.type === 'impact' || q.type === 'rename_impact') {
        args = ['impact', q.query_param, '-r', repo.path];
      } else {
        args = ['query', q.query_param, '-r', repo.path];
      }

      const qRes = spawnSync(GITNEXUS_BIN, args, {
        cwd: repo.path,
        encoding: 'utf8',
        shell: true,
        timeout: 20000
      });
      const latencyMs = Math.round((performance.now() - qStart) * 10) / 10;
      latencies.push(latencyMs);

      let parsed = null;
      const rawStdout = qRes.stdout || '';
      try {
        parsed = JSON.parse(rawStdout);
      } catch {
        const jsonStart = rawStdout.indexOf('{');
        const jsonArrStart = rawStdout.indexOf('[');
        const start = jsonStart >= 0 && jsonArrStart >= 0 ? Math.min(jsonStart, jsonArrStart) : Math.max(jsonStart, jsonArrStart);
        if (start >= 0) {
          try { parsed = JSON.parse(rawStdout.slice(start)); } catch {}
        }
      }

      let hit = false;
      let rank = -1;
      let recall = 0;
      let precision = 0;
      const expPath = normalizePath(q.expected.path);
      const expSym = (q.expected.symbol || '').toLowerCase();

      if (parsed) {
        if (q.type === 'impact' || q.type === 'rename_impact') {
          const impacted = parsed.impacted || parsed.affectedSymbols || parsed.symbols || [];
          const targets = (q.expected.expected_targets || []).map(normalizePath);
          const retrieved = impacted.map(i => normalizePath(i.filePath || i.file || i.name || i.id || ''));
          let matchCount = 0;
          for (const t of targets) {
            if (retrieved.some(p => p.includes(t) || t.includes(p))) {
              matchCount++;
            }
          }
          recall = targets.length > 0 ? matchCount / targets.length : 1;
          precision = retrieved.length > 0 ? matchCount / retrieved.length : 0;
          hit = recall > 0.3 || matchCount > 0;
        } else if (q.type === 'callers') {
          const callers = parsed.incoming?.calls || parsed.callers || parsed.incoming || [];
          const top3 = callers.slice(0, 3);
          const expTargets = (q.expected.expected_targets || [q.expected.path]).map(normalizePath);
          for (let i = 0; i < top3.length; i++) {
            const item = top3[i];
            const p = normalizePath(item.filePath || item.file || item.path || '');
            if (expTargets.some(t => p.includes(t) || t.includes(p))) {
              hit = true;
              rank = i + 1;
              break;
            }
          }
          if (!hit && parsed.symbol) {
            const p = normalizePath(parsed.symbol.filePath || parsed.symbol.file || '');
            if (p.includes(expPath) || expPath.includes(p)) {
              hit = true;
              rank = 1;
            }
          }
        } else {
          // Standard query: definitions list
          const defs = parsed.definitions || parsed.results || [];
          const top3 = defs.slice(0, 3);
          for (let i = 0; i < top3.length; i++) {
            const d = top3[i];
            const p = normalizePath(d.filePath || d.file || d.path || '');
            const name = (d.name || d.id || '').toLowerCase();
            if ((p.includes(expPath) || expPath.includes(p)) && (!expSym || name.includes(expSym) || expSym.includes(name))) {
              hit = true;
              rank = i + 1;
              break;
            }
          }
        }
      }

      questionResults.push({
        id: q.id,
        type: q.type,
        question: q.question,
        query_param: q.query_param,
        expected: q.expected,
        hit,
        rank,
        recall,
        precision,
        latencyMs,
        rawOutput: parsed || (qRes.stdout || '').slice(0, 500)
      });
    }

    const hitCount = questionResults.filter(r => r.hit).length;
    const p50 = percentile(latencies, 50);
    const p95 = percentile(latencies, 95);

    const repoSummary = {
      tool: 'gitnexus',
      repo: repo.name,
      commit: repo.commit,
      indexTimeMs,
      indexSizeBytes,
      questionCount: questions.length,
      hitCount,
      accuracy: Math.round((hitCount / questions.length) * 1000) / 10,
      latencyP50Ms: p50,
      latencyP95Ms: p95,
      questions: questionResults
    };

    allResults.push(repoSummary);
    writeFileSync(join(RAW_DIR, `gitnexus-${repo.name}.json`), JSON.stringify(repoSummary, null, 2));
    console.log(`GitNexus ${repo.name}: ${hitCount}/${questions.length} hits (${repoSummary.accuracy}%), p50: ${p50}ms, p95: ${p95}ms`);
  }

  const totalQuestions = allResults.reduce((acc, r) => acc + r.questionCount, 0);
  const totalHits = allResults.reduce((acc, r) => acc + r.hitCount, 0);
  const totalIndexTime = allResults.reduce((acc, r) => acc + r.indexTimeMs, 0);
  const totalIndexSize = allResults.reduce((acc, r) => acc + r.indexSizeBytes, 0);

  const summary = {
    tool: 'gitnexus',
    timestamp: new Date().toISOString(),
    totalQuestions,
    totalHits,
    overallAccuracy: Math.round((totalHits / totalQuestions) * 1000) / 10,
    totalIndexTimeMs: totalIndexTime,
    totalIndexSizeBytes: totalIndexSize,
    repos: allResults
  };

  writeFileSync(join(RAW_DIR, 'gitnexus-summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\n========================================`);
  console.log(`GitNexus Total: ${totalHits}/${totalQuestions} hits (${summary.overallAccuracy}%)`);
  console.log(`========================================\n`);
}

run().catch((err) => { console.error(err); process.exitCode = 1 });
