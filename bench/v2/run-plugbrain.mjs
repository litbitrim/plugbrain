/**
 * PlugBrain Benchmark Runner (v2)
 *
 * Runs against frozen snapshots in C:/PLUG/bench/ with isolated PLUGBRAIN_HOME
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, statSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const BENCH_DIR = 'C:/PLUG/bench';
const TEMP_HOME = join(BENCH_DIR, '_plugbrain-home');
const WORKTREE = 'C:/PLUG/plugpt/Code/PlugBrain-Core--bench';
const REPOS_FILE = join(WORKTREE, 'bench/v2/repos.json');
const QUESTIONS_DIR = join(WORKTREE, 'bench/v2/questions');
const RAW_DIR = join(WORKTREE, 'bench/v2/raw');

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
  const repos = JSON.parse(readFileSync(REPOS_FILE, 'utf8')).repos;
  const allResults = [];

  for (const repo of repos) {
    console.log(`\n========================================`);
    console.log(`PlugBrain: Indexing ${repo.name} at ${repo.path}`);
    console.log(`========================================`);

    // 1. Register
    const regStart = performance.now();
    const regRes = spawnSync('node', ['--experimental-strip-types', 'src/cli.ts', 'register', repo.path, repo.name], {
      cwd: WORKTREE,
      env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME },
      encoding: 'utf8'
    });
    console.log(regRes.stdout || regRes.stderr);

    // Extract ws-id from output or query
    const wsMatch = (regRes.stdout || '').match(/ws-[a-f0-9]{12}/);
    const wsId = wsMatch ? wsMatch[0] : null;

    // 2. Index
    const indexStart = performance.now();
    const indexRes = spawnSync('node', ['--experimental-strip-types', 'src/cli.ts', 'index', wsId || repo.name], {
      cwd: WORKTREE,
      env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME },
      encoding: 'utf8'
    });
    const indexTimeMs = Math.round(performance.now() - indexStart);
    console.log(`Index completed in ${indexTimeMs} ms`);
    console.log(indexRes.stdout || indexRes.stderr);

    // Index size
    const indexSizeBytes = getDirSize(TEMP_HOME);

    // 3. Questions
    const questionsFile = join(QUESTIONS_DIR, `${repo.name}.json`);
    const questions = JSON.parse(readFileSync(questionsFile, 'utf8'));
    const questionResults = [];
    const latencies = [];

    for (const q of questions) {
      const qStart = performance.now();
      let cliArgs = [];

      if (q.type === 'callers') {
        cliArgs = ['--experimental-strip-types', 'src/cli.ts', 'context', q.query_param, '--json'];
        if (wsId) cliArgs.push('--workspace', wsId);
      } else if (q.type === 'impact' || q.type === 'rename_impact') {
        cliArgs = ['--experimental-strip-types', 'src/cli.ts', 'impact', q.query_param, '--json'];
      } else {
        cliArgs = ['--experimental-strip-types', 'src/cli.ts', 'query', q.query_param, '--json'];
        if (wsId) cliArgs.push('--workspace', wsId);
      }

      const qRes = spawnSync('node', cliArgs, {
        cwd: WORKTREE,
        env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME },
        encoding: 'utf8',
        timeout: 15000
      });
      const latencyMs = Math.round((performance.now() - qStart) * 10) / 10;
      latencies.push(latencyMs);

      let parsed = null;
      try {
        parsed = JSON.parse(qRes.stdout);
      } catch {
        // Fallback if stdout has prefix or not valid JSON
        const jsonStart = qRes.stdout.indexOf('{');
        const jsonArrStart = qRes.stdout.indexOf('[');
        const start = jsonStart >= 0 && jsonArrStart >= 0 ? Math.min(jsonStart, jsonArrStart) : Math.max(jsonStart, jsonArrStart);
        if (start >= 0) {
          try { parsed = JSON.parse(qRes.stdout.slice(start)); } catch {}
        }
      }

      // Evaluate hit
      let hit = false;
      let rank = -1;
      let recall = 0;
      let precision = 0;
      const expPath = normalizePath(q.expected.path);
      const expSym = (q.expected.symbol || '').toLowerCase();

      if (parsed) {
        if (q.type === 'impact' || q.type === 'rename_impact') {
          // Check blast radius
          const impacted = parsed.impacted || [];
          const targets = (q.expected.expected_targets || []).map(normalizePath);
          const retrievedPaths = impacted.map(i => normalizePath(i.file || i.path || i.name));
          let matchCount = 0;
          for (const t of targets) {
            if (retrievedPaths.some(p => p.includes(t) || t.includes(p))) {
              matchCount++;
            }
          }
          recall = targets.length > 0 ? matchCount / targets.length : 1;
          precision = retrievedPaths.length > 0 ? matchCount / retrievedPaths.length : 0;
          hit = recall > 0.3 || matchCount > 0;
        } else if (q.type === 'callers') {
          // Check incoming edges / callers in context
          const incoming = Array.isArray(parsed.incoming) ? parsed.incoming : (parsed.incoming?.calls || parsed.callers || []);
          const top3 = incoming.slice(0, 3);
          const expTargets = (q.expected.expected_targets || [q.expected.path]).map(normalizePath);
          for (let i = 0; i < top3.length; i++) {
            const item = top3[i];
            const p = normalizePath(item.file || item.path || '');
            if (expTargets.some(t => p.includes(t) || t.includes(p))) {
              hit = true;
              rank = i + 1;
              break;
            }
          }
          // Also check symbol definition if context resolved the symbol
          if (!hit && parsed.symbol) {
            const p = normalizePath(parsed.symbol.file || parsed.symbol.path || '');
            if (p.includes(expPath)) {
              hit = true;
              rank = 1;
            }
          }
        } else {
          // Standard query: symbols list or notes list
          const symbols = parsed.symbols || [];
          const top3Syms = symbols.slice(0, 3);
          for (let i = 0; i < top3Syms.length; i++) {
            const s = top3Syms[i];
            const p = normalizePath(s.file || s.path || '');
            const name = (s.name || '').toLowerCase();
            if ((p.includes(expPath) || expPath.includes(p)) && (!expSym || name.includes(expSym) || expSym.includes(name))) {
              hit = true;
              rank = i + 1;
              break;
            }
          }
          if (!hit) {
            const notes = parsed.notes || [];
            const top3Notes = notes.slice(0, 3);
            for (let i = 0; i < top3Notes.length; i++) {
              const n = top3Notes[i];
              const p = normalizePath(n.path || '');
              if (p.includes(expPath) || expPath.includes(p)) {
                hit = true;
                rank = i + 1;
                break;
              }
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
        rawOutput: parsed || qRes.stdout.slice(0, 500)
      });
    }

    const hitCount = questionResults.filter(r => r.hit).length;
    const p50 = percentile(latencies, 50);
    const p95 = percentile(latencies, 95);

    const repoSummary = {
      tool: 'plugbrain',
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
    writeFileSync(join(RAW_DIR, `plugbrain-${repo.name}.json`), JSON.stringify(repoSummary, null, 2));
    console.log(`PlugBrain ${repo.name}: ${hitCount}/${questions.length} hits (${repoSummary.accuracy}%), p50: ${p50}ms, p95: ${p95}ms`);
  }

  const totalQuestions = allResults.reduce((acc, r) => acc + r.questionCount, 0);
  const totalHits = allResults.reduce((acc, r) => acc + r.hitCount, 0);
  const totalIndexTime = allResults.reduce((acc, r) => acc + r.indexTimeMs, 0);
  const totalIndexSize = allResults[allResults.length - 1].indexSizeBytes; // Cumulative home size

  const summary = {
    tool: 'plugbrain',
    timestamp: new Date().toISOString(),
    totalQuestions,
    totalHits,
    overallAccuracy: Math.round((totalHits / totalQuestions) * 1000) / 10,
    totalIndexTimeMs: totalIndexTime,
    totalIndexSizeBytes: totalIndexSize,
    repos: allResults
  };

  writeFileSync(join(RAW_DIR, 'plugbrain-summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\n========================================`);
  console.log(`PlugBrain Total: ${totalHits}/${totalQuestions} hits (${summary.overallAccuracy}%)`);
  console.log(`========================================\n`);
}

run().catch(console.error);
