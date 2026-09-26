/**
 * BENCH-05 Unified Benchmark Suite
 *
 * Runs 120 questions (80 historical + 40 frozen holdout) across PlugBrain, CodeGraph, and GitNexus.
 *
 * Rules:
 * 1) Full raw output is evaluated; truncation to 400 chars is only for rawAnswer storage.
 * 2) Documented CLI interfaces per question type (e.g. definitions via context in GitNexus).
 * 3) Unified top-3 candidate extraction across all JSON response forms.
 * 4) PlugBrain evaluated in both Warm Daemon and Cold CLI modes (cold/warm parity verified).
 * 5) Competitors evaluated via their canonical CLI interface.
 * 6) Storing latency, hit, rank, error status, and first 400 chars of rawAnswer.
 */
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { QUESTIONS_DIR, RAW_DIR, WORKTREE, loadRepos, requireReposRoot } from './paths.mjs';

const TEMP_HOME = join(requireReposRoot(), '_plugbrain-home');
const DIST_CLI = join(WORKTREE, 'dist/plugbrain.mjs');
const GITNEXUS_BIN = 'gitnexus';
const CODEGRAPH_BIN = 'codegraph';

const PLUGBRAIN_PORT = 4392;

function percentile(arr, p) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return Math.round(sorted[idx] * 10) / 10;
}

function normalizePath(p) {
  return (p || '').replace(/\\/g, '/').toLowerCase();
}

function loadAllQuestions(repoName) {
  const oldFile = join(QUESTIONS_DIR, `${repoName}.json`);
  const holdoutFile = join(QUESTIONS_DIR, `${repoName}.holdout.json`);
  const oldQ = JSON.parse(readFileSync(oldFile, 'utf8')).map(q => ({ ...q, isHoldout: false }));
  const holdoutQ = JSON.parse(readFileSync(holdoutFile, 'utf8')).map(q => ({ ...q, isHoldout: true }));
  return [...oldQ, ...holdoutQ];
}

// Map repo names to PlugBrain workspace IDs
const WS_IDS = {
  mcpz: 'ws-b130556e3a03',
  plugmedia: 'ws-d8cd162a40b5',
  cowork: 'ws-48ebc9403171',
  plugengine: 'ws-e4319fc99372'
};

// -------------------------------------------------------------
// EVALUATION LOGIC
// -------------------------------------------------------------
function evaluateResult(q, parsed, rawText) {
  let hit = false;
  let rank = -1;
  const expPath = normalizePath(q.expected.path);
  const expSym = (q.expected.symbol || '').toLowerCase();
  const expTargets = (q.expected.expected_targets || [q.expected.path]).map(normalizePath);

  if (parsed) {
    if (q.type === 'impact' || q.type === 'rename_impact') {
      let impacted = [];
      if (Array.isArray(parsed)) impacted = parsed;
      else if (Array.isArray(parsed.impacted)) impacted = parsed.impacted;
      else if (Array.isArray(parsed.affected)) impacted = parsed.affected;
      else if (Array.isArray(parsed.nodes)) impacted = parsed.nodes;
      else if (parsed.nodes && typeof parsed.nodes === 'object') impacted = Object.values(parsed.nodes).flat();
      else if (parsed.byDepth && typeof parsed.byDepth === 'object') impacted = Object.values(parsed.byDepth).flat();
      if (parsed.target) impacted.push(parsed.target);

      const targets = expTargets;
      const retrieved = impacted.map(i => normalizePath(i?.node?.filePath || i?.filePath || i?.file || i?.path || i?.name || ''));
      let matchCount = 0;
      for (const t of targets) {
        if (retrieved.some(p => p.includes(t) || t.includes(p))) {
          matchCount++;
        }
      }
      hit = targets.length > 0 ? matchCount / targets.length > 0.3 || matchCount > 0 : retrieved.some(p => p.includes(expPath));
      if (hit) rank = 1;
    } else if (q.type === 'callers') {
      let callers = [];
      if (Array.isArray(parsed)) callers = parsed;
      else if (Array.isArray(parsed.callers)) callers = parsed.callers;
      else if (Array.isArray(parsed.incoming?.calls)) callers = parsed.incoming.calls;
      else if (parsed.incoming && typeof parsed.incoming === 'object') {
        callers = Object.values(parsed.incoming).flat();
      } else if (Array.isArray(parsed.candidates)) callers = parsed.candidates;
      else if (Array.isArray(parsed.nodes)) callers = parsed.nodes;

      const top3 = callers.slice(0, 3);
      for (let i = 0; i < top3.length; i++) {
        const item = top3[i];
        const node = item.node || item;
        const p = normalizePath(node.filePath || node.file || node.path || '');
        if (expTargets.some(t => p.includes(t) || t.includes(p))) {
          hit = true;
          rank = i + 1;
          break;
        }
      }
      if (!hit && parsed.symbol) {
        const p = normalizePath(parsed.symbol.filePath || parsed.symbol.file || parsed.symbol.path || '');
        if (expTargets.some(t => p.includes(t) || t.includes(p))) {
          hit = true;
          rank = 1;
        }
      }
      if (!hit && Array.isArray(parsed.candidates)) {
        for (let i = 0; i < Math.min(3, parsed.candidates.length); i++) {
          const p = normalizePath(parsed.candidates[i].filePath || parsed.candidates[i].file || parsed.candidates[i].path || '');
          if (expTargets.some(t => p.includes(t) || t.includes(p))) {
            hit = true;
            rank = i + 1;
            break;
          }
        }
      }
    } else {
      let items = [];
      if (Array.isArray(parsed)) items = parsed;
      else if (Array.isArray(parsed.symbols)) items = parsed.symbols;
      else if (Array.isArray(parsed.definitions)) items = parsed.definitions;
      else if (Array.isArray(parsed.candidates)) items = parsed.candidates;
      else if (Array.isArray(parsed.results)) items = parsed.results;
      else if (Array.isArray(parsed.nodes)) items = parsed.nodes;
      else if (Array.isArray(parsed.process_symbols)) items = parsed.process_symbols;
      else if (parsed.symbol) items = [parsed.symbol];
      if (Array.isArray(parsed.notes)) items = [...items, ...parsed.notes];

      const top3 = items.slice(0, 3);
      for (let i = 0; i < top3.length; i++) {
        const item = top3[i];
        const node = item.node || item;
        const p = normalizePath(node.filePath || node.file || node.path || '');
        const name = (node.name || node.id || node.title || '').toLowerCase();
        if ((p.includes(expPath) || expPath.includes(p)) && (!expSym || name.includes(expSym) || expSym.includes(name) || p.includes(expPath))) {
          hit = true;
          rank = i + 1;
          break;
        }
      }
    }
  }

  // Fallback to text parsing on full raw output
  if (!hit && rawText) {
    const textLower = rawText.toLowerCase();
    if (q.type === 'impact' || q.type === 'rename_impact') {
      const targets = expTargets;
      let matchCount = 0;
      for (const t of targets) {
        if (textLower.includes(t)) matchCount++;
      }
      hit = targets.length > 0 ? matchCount / targets.length > 0.3 || matchCount > 0 : textLower.includes(expPath);
    } else if (q.type === 'callers') {
      hit = expTargets.some(t => textLower.includes(t));
    } else {
      hit = textLower.includes(expPath) && (!expSym || textLower.includes(expSym));
    }
  }

  return { hit, rank };
}

// -------------------------------------------------------------
// RUNNER IMPLEMENTATIONS
// -------------------------------------------------------------

async function queryPlugBrainCold(repo, q) {
  const wsId = WS_IDS[repo.name];
  let cliArgs = [];
  if (q.type === 'callers') {
    cliArgs = [DIST_CLI, 'context', q.query_param, '--workspace', wsId, '--json'];
  } else if (q.type === 'impact' || q.type === 'rename_impact') {
    cliArgs = [DIST_CLI, 'impact', q.query_param, '--workspace', wsId, '--json'];
  } else {
    cliArgs = [DIST_CLI, 'query', q.query_param, '--workspace', wsId, '--json'];
  }
  const t0 = performance.now();
  const res = spawnSync('node', cliArgs, {
    cwd: WORKTREE,
    env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME },
    encoding: 'utf8',
    timeout: 10000
  });
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  let parsed = null;
  let error = null;
  if (res.error) error = res.error.message;
  else if (res.status !== 0) error = `exit code ${res.status}: ${(res.stderr || res.stdout || '').slice(0, 100)}`;
  try {
    parsed = JSON.parse(res.stdout);
  } catch (e) {
    if (!error) error = `json parse error: ${e.message}`;
  }
  return { latency, parsed, raw: res.stdout || res.stderr || '', error };
}

async function queryPlugBrainWarm(repo, q) {
  const wsId = WS_IDS[repo.name];
  let url = '';
  if (q.type === 'callers') {
    url = `http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/context?name=${encodeURIComponent(q.query_param)}&workspace=${wsId}`;
  } else if (q.type === 'impact' || q.type === 'rename_impact') {
    url = `http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/impact?target=${encodeURIComponent(q.query_param)}&workspace=${wsId}`;
  } else {
    url = `http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/query?q=${encodeURIComponent(q.query_param)}&workspace=${wsId}`;
  }
  const t0 = performance.now();
  let parsed = null;
  let raw = '';
  let error = null;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      error = `http ${res.status}: ${res.statusText}`;
      raw = await res.text();
    } else {
      const json = await res.json();
      parsed = json.result || json;
      raw = JSON.stringify(json);
    }
  } catch (e) {
    error = e.message;
    raw = String(e);
  }
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  return { latency, parsed, raw, error };
}

async function queryCodeGraphCold(repo, q) {
  let args = [];
  if (q.type === 'callers') {
    args = ['callers', q.query_param, '--json'];
  } else if (q.type === 'impact' || q.type === 'rename_impact') {
    args = ['impact', q.query_param, '--json'];
  } else {
    args = ['query', q.query_param, '--json'];
  }
  const t0 = performance.now();
  const res = spawnSync(CODEGRAPH_BIN, args, {
    cwd: repo.path,
    encoding: 'utf8',
    shell: true,
    timeout: 15000
  });
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  let parsed = null;
  let error = null;
  const raw = res.stdout || '';
  if (res.error) error = res.error.message;
  else if (res.status !== 0) error = `exit code ${res.status}: ${(res.stderr || res.stdout || '').slice(0, 100)}`;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const jsonStart = raw.indexOf('{');
    const jsonArrStart = raw.indexOf('[');
    const start = jsonStart >= 0 && jsonArrStart >= 0 ? Math.min(jsonStart, jsonArrStart) : Math.max(jsonStart, jsonArrStart);
    if (start >= 0) {
      try { parsed = JSON.parse(raw.slice(start)); } catch (e) { if (!error) error = `json parse error: ${e.message}`; }
    } else {
      if (!error) error = 'no json output';
    }
  }
  return { latency, parsed, raw: raw || res.stderr || '', error };
}

async function queryGitNexusCold(repo, q) {
  let args = [];
  if (q.type === 'callers' || q.type === 'definition') {
    args = ['context', q.query_param, '-r', repo.path];
  } else if (q.type === 'impact' || q.type === 'rename_impact') {
    args = ['impact', q.query_param, '-r', repo.path];
  } else {
    args = ['query', q.query_param, '-r', repo.path];
  }
  const t0 = performance.now();
  const res = spawnSync(GITNEXUS_BIN, args, {
    cwd: repo.path,
    encoding: 'utf8',
    shell: true,
    timeout: 15000
  });
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  let parsed = null;
  let error = null;
  const raw = res.stdout || '';
  if (res.error) error = res.error.message;
  else if (res.status !== 0) error = `exit code ${res.status}: ${(res.stderr || res.stdout || '').slice(0, 100)}`;
  try { parsed = JSON.parse(raw); } catch {}
  return { latency, parsed, raw: raw || res.stderr || '', error };
}

// -------------------------------------------------------------
// BENCHMARK SUITE EXECUTION
// -------------------------------------------------------------

async function runBenchmark(name, runnerFn) {
  console.log(`\n======================================================`);
  console.log(`RUNNING BENCHMARK: ${name}`);
  console.log(`======================================================`);

  const repos = loadRepos();
  const repoResults = [];

  for (const repo of repos) {
    console.log(`  Processing ${repo.name} (${loadAllQuestions(repo.name).length} questions)...`);
    const questions = loadAllQuestions(repo.name);
    const questionResults = [];
    const latenciesOld = [];
    const latenciesHoldout = [];
    const latenciesAll = [];

    for (const q of questions) {
      const { latency, parsed, raw, error } = await runnerFn(repo, q);
      const evalRes = evaluateResult(q, parsed, raw);

      latenciesAll.push(latency);
      if (q.isHoldout) latenciesHoldout.push(latency);
      else latenciesOld.push(latency);

      const rawStr = typeof raw === 'string' ? raw : JSON.stringify(raw);

      questionResults.push({
        id: q.id,
        isHoldout: q.isHoldout,
        type: q.type,
        question: q.question,
        query_param: q.query_param,
        expected: q.expected,
        hit: evalRes.hit,
        rank: evalRes.rank,
        latencyMs: latency,
        error: error || null,
        rawAnswer: rawStr.slice(0, 400)
      });
    }

    const oldHits = questionResults.filter(q => !q.isHoldout && q.hit).length;
    const oldTotal = questionResults.filter(q => !q.isHoldout).length;
    const holdoutHits = questionResults.filter(q => q.isHoldout && q.hit).length;
    const holdoutTotal = questionResults.filter(q => q.isHoldout).length;
    const totalHits = questionResults.filter(q => q.hit).length;
    const totalCount = questionResults.length;
    const errorCount = questionResults.filter(q => q.error !== null).length;
    const errorRate = Math.round((errorCount / totalCount) * 1000) / 10;

    repoResults.push({
      repo: repo.name,
      oldHits,
      oldTotal,
      oldAccuracy: Math.round((oldHits / oldTotal) * 1000) / 10,
      holdoutHits,
      holdoutTotal,
      holdoutAccuracy: Math.round((holdoutHits / holdoutTotal) * 1000) / 10,
      totalHits,
      totalCount,
      totalAccuracy: Math.round((totalHits / totalCount) * 1000) / 10,
      errorCount,
      errorRate,
      latencyOldP50: percentile(latenciesOld, 50),
      latencyOldP95: percentile(latenciesOld, 95),
      latencyHoldoutP50: percentile(latenciesHoldout, 50),
      latencyHoldoutP95: percentile(latenciesHoldout, 95),
      latencyAllP50: percentile(latenciesAll, 50),
      latencyAllP95: percentile(latenciesAll, 95),
      questions: questionResults
    });

    console.log(`    ${repo.name}: Old ${oldHits}/${oldTotal} (${repoResults[repoResults.length-1].oldAccuracy}%), Holdout ${holdoutHits}/${holdoutTotal} (${repoResults[repoResults.length-1].holdoutAccuracy}%), Total ${totalHits}/${totalCount} (${repoResults[repoResults.length-1].totalAccuracy}%), errors ${errorCount}, p50: ${percentile(latenciesAll, 50)}ms`);
  }

  const grandOldHits = repoResults.reduce((a, r) => a + r.oldHits, 0);
  const grandOldTotal = repoResults.reduce((a, r) => a + r.oldTotal, 0);
  const grandHoldoutHits = repoResults.reduce((a, r) => a + r.holdoutHits, 0);
  const grandHoldoutTotal = repoResults.reduce((a, r) => a + r.holdoutTotal, 0);
  const grandTotalHits = repoResults.reduce((a, r) => a + r.totalHits, 0);
  const grandTotal = repoResults.reduce((a, r) => a + r.totalCount, 0);
  const grandErrorCount = repoResults.reduce((a, r) => a + r.errorCount, 0);
  const grandErrorRate = Math.round((grandErrorCount / grandTotal) * 1000) / 10;

  const allLatencies = repoResults.flatMap(r => r.questions.map(q => q.latencyMs));

  const result = {
    benchmark: name,
    timestamp: new Date().toISOString(),
    grandOldHits,
    grandOldTotal,
    grandOldAccuracy: Math.round((grandOldHits / grandOldTotal) * 1000) / 10,
    grandHoldoutHits,
    grandHoldoutTotal,
    grandHoldoutAccuracy: Math.round((grandHoldoutHits / grandHoldoutTotal) * 1000) / 10,
    grandTotalHits,
    grandTotal,
    grandTotalAccuracy: Math.round((grandTotalHits / grandTotal) * 1000) / 10,
    grandErrorCount,
    grandErrorRate,
    latencyP50: percentile(allLatencies, 50),
    latencyP95: percentile(allLatencies, 95),
    repos: repoResults
  };

  writeFileSync(join(RAW_DIR, `v3-${name}.json`), JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  console.log('Starting BENCH-05 full benchmark suite (120 questions across 4 modes)...');

  const suite = {};

  // Start PlugBrain warm daemon on PLUGBRAIN_PORT
  console.log(`Starting isolated PlugBrain daemon on port ${PLUGBRAIN_PORT}...`);
  const daemonProc = spawn('node', [DIST_CLI, 'serve', '--port', String(PLUGBRAIN_PORT)], {
    cwd: WORKTREE,
    env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME, PLUGBRAIN_NO_DAEMON: '1' },
    stdio: 'ignore'
  });

  // Wait for daemon to be ready
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/query?q=health&workspace=ws-b130556e3a03`);
      if (res.ok) { ready = true; break; }
    } catch {}
  }
  if (!ready) {
    console.error('Failed to start PlugBrain warm daemon on port ' + PLUGBRAIN_PORT);
    daemonProc.kill();
    process.exit(1);
  }
  console.log('PlugBrain warm daemon ready.');

  try {
    // 1. PlugBrain Warm (Daemon HTTP)
    suite['plugbrain-warm'] = await runBenchmark('plugbrain-warm', queryPlugBrainWarm);

    // 2. PlugBrain Cold (CLI)
    suite['plugbrain-cold'] = await runBenchmark('plugbrain-cold', queryPlugBrainCold);

    // 3. CodeGraph Cold (CLI)
    suite['codegraph-cold'] = await runBenchmark('codegraph-cold', queryCodeGraphCold);

    // 4. GitNexus Cold (CLI)
    suite['gitnexus-cold'] = await runBenchmark('gitnexus-cold', queryGitNexusCold);
  } finally {
    daemonProc.kill();
    console.log('Terminated PlugBrain warm daemon.');
  }

  writeFileSync(join(RAW_DIR, 'v3-all-summary.json'), JSON.stringify(suite, null, 2));

  console.log('\n======================================================');
  console.log('FINAL BENCH-05 SUMMARY');
  console.log('======================================================');
  console.log('Tool                 | Old (80)     | Holdout (40) | Total (120)  | Errors | Latency p50 | Latency p95');
  console.log('---------------------+--------------+--------------+--------------+--------+-------------+------------');
  for (const [key, s] of Object.entries(suite)) {
    const name = key.padEnd(20);
    const oldStr = `${s.grandOldHits}/${s.grandOldTotal} (${s.grandOldAccuracy}%)`.padEnd(12);
    const holdoutStr = `${s.grandHoldoutHits}/${s.grandHoldoutTotal} (${s.grandHoldoutAccuracy}%)`.padEnd(12);
    const totStr = `${s.grandTotalHits}/${s.grandTotal} (${s.grandTotalAccuracy}%)`.padEnd(12);
    const errStr = `${s.grandErrorCount} (${s.grandErrorRate}%)`.padEnd(6);
    const p50 = `${s.latencyP50} ms`.padEnd(11);
    const p95 = `${s.latencyP95} ms`;
    console.log(`${name} | ${oldStr} | ${holdoutStr} | ${totStr} | ${errStr} | ${p50} | ${p95}`);
  }
}

main().catch((err) => { console.error(err); process.exitCode = 1 });
