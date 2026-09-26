/**
 * BENCH-03 Unified Benchmark Suite
 *
 * Runs 120 questions (80 old + 40 holdout) across PlugBrain, GitNexus, and CodeGraph
 * under both COLD (CLI start) and WARM (daemon / resident memory) conditions.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, statSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { CodeGraph } = require('C:/Users/mil/AppData/Roaming/npm/node_modules/@colbymchenry/codegraph/npm-sdk.js');

const WORKTREE = 'C:/PLUG/plugpt/Code/PlugBrain-Core--bench';
const BENCH_DIR = 'C:/PLUG/bench';
const TEMP_HOME = join(BENCH_DIR, '_plugbrain-home');
const REPOS_FILE = join(WORKTREE, 'bench/v2/repos.json');
const QUESTIONS_DIR = join(WORKTREE, 'bench/v2/questions');
const RAW_DIR = join(WORKTREE, 'bench/v2/raw');
const DIST_CLI = join(WORKTREE, 'dist/plugbrain.mjs');
const GITNEXUS_BIN = 'C:/Users/mil/AppData/Roaming/npm/gitnexus.cmd';
const CODEGRAPH_BIN = 'C:/Users/mil/AppData/Roaming/npm/codegraph.cmd';

const PLUGBRAIN_PORT = 4392;
const GITNEXUS_PORT = 4848;

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
  let recall = 0;
  let precision = 0;
  const expPath = normalizePath(q.expected.path);
  const expSym = (q.expected.symbol || '').toLowerCase();

  if (parsed) {
    if (q.type === 'impact' || q.type === 'rename_impact') {
      let impacted = [];
      if (Array.isArray(parsed)) impacted = parsed;
      else if (Array.isArray(parsed.impacted)) impacted = parsed.impacted;
      else if (Array.isArray(parsed.nodes)) impacted = parsed.nodes;
      else if (parsed.nodes && typeof parsed.nodes === 'object') impacted = Object.values(parsed.nodes).flat();
      const targets = (q.expected.expected_targets || []).map(normalizePath);
      const retrieved = impacted.map(i => normalizePath(i?.node?.filePath || i?.filePath || i?.file || i?.path || i?.name || ''));
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
      const incoming = Array.isArray(parsed)
        ? parsed
        : (parsed.incoming?.calls || parsed.callers || parsed.incoming || parsed.nodes || []);
      const top3 = incoming.slice(0, 3);
      const expTargets = (q.expected.expected_targets || [q.expected.path]).map(normalizePath);
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
        const p = normalizePath(parsed.symbol.file || parsed.symbol.path || '');
        if (p.includes(expPath)) {
          hit = true;
          rank = 1;
        }
      }
    } else {
      // Symbols
      const symbols = Array.isArray(parsed) ? parsed : (parsed.symbols || parsed.results || parsed.nodes || []);
      const top3Syms = symbols.slice(0, 3);
      for (let i = 0; i < top3Syms.length; i++) {
        const item = top3Syms[i];
        const node = item.node || item;
        const p = normalizePath(node.filePath || node.file || node.path || '');
        const name = (node.name || node.id || '').toLowerCase();
        if ((p.includes(expPath) || expPath.includes(p)) && (!expSym || name.includes(expSym) || expSym.includes(name))) {
          hit = true;
          rank = i + 1;
          break;
        }
      }
      // Notes / file search
      if (!hit && parsed.notes) {
        const top3Notes = (parsed.notes || []).slice(0, 3);
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

  // Text-based fallback (for GitNexus text output)
  if (!hit && rawText) {
    const textLower = rawText.toLowerCase();
    if (q.type === 'impact' || q.type === 'rename_impact') {
      const targets = (q.expected.expected_targets || []).map(normalizePath);
      let matchCount = 0;
      for (const t of targets) {
        if (textLower.includes(t)) matchCount++;
      }
      hit = targets.length > 0 ? matchCount / targets.length > 0.3 || matchCount > 0 : textLower.includes(expPath);
    } else if (q.type === 'callers') {
      const expTargets = (q.expected.expected_targets || [q.expected.path]).map(normalizePath);
      hit = expTargets.some(t => textLower.includes(t));
    } else {
      hit = textLower.includes(expPath) && (!expSym || textLower.includes(expSym));
    }
  }

  return { hit, rank, recall, precision };
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
    cliArgs = [DIST_CLI, 'impact', q.query_param, '--json'];
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
  try { parsed = JSON.parse(res.stdout); } catch {}
  return { latency, parsed, raw: res.stdout || '' };
}

async function queryPlugBrainWarm(repo, q) {
  const wsId = WS_IDS[repo.name];
  let url = '';
  if (q.type === 'callers') {
    url = `http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/context?name=${encodeURIComponent(q.query_param)}`;
  } else if (q.type === 'impact' || q.type === 'rename_impact') {
    url = `http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/impact?target=${encodeURIComponent(q.query_param)}`;
  } else {
    url = `http://127.0.0.1:${PLUGBRAIN_PORT}/api/intel/query?q=${encodeURIComponent(q.query_param)}&workspace=${wsId}`;
  }
  const t0 = performance.now();
  let parsed = null;
  let raw = '';
  try {
    const res = await fetch(url);
    const json = await res.json();
    parsed = json.result || json;
    raw = JSON.stringify(json);
  } catch (e) {
    raw = String(e);
  }
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  return { latency, parsed, raw };
}

async function queryGitNexusCold(repo, q) {
  let args = [];
  if (q.type === 'callers') {
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
  const raw = res.stdout || '';
  try { parsed = JSON.parse(raw); } catch {}
  return { latency, parsed, raw };
}

async function queryGitNexusWarm(repo, q) {
  let endpoint = '';
  let body = {};
  if (q.type === 'callers') {
    endpoint = '/tool/context';
    body = { name: q.query_param, repo: repo.path };
  } else if (q.type === 'impact' || q.type === 'rename_impact') {
    endpoint = '/tool/impact';
    body = { target: q.query_param, repo: repo.path };
  } else {
    endpoint = '/tool/query';
    body = { query: q.query_param, repo: repo.path };
  }
  const t0 = performance.now();
  let raw = '';
  let parsed = null;
  try {
    const res = await fetch(`http://127.0.0.1:${GITNEXUS_PORT}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    raw = await res.text();
    try { parsed = JSON.parse(raw); } catch {}
  } catch (e) {
    raw = String(e);
  }
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  return { latency, parsed, raw };
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
  const raw = res.stdout || '';
  try {
    parsed = JSON.parse(raw);
  } catch {
    const jsonStart = raw.indexOf('{');
    const jsonArrStart = raw.indexOf('[');
    const start = jsonStart >= 0 && jsonArrStart >= 0 ? Math.min(jsonStart, jsonArrStart) : Math.max(jsonStart, jsonArrStart);
    if (start >= 0) {
      try { parsed = JSON.parse(raw.slice(start)); } catch {}
    }
  }
  return { latency, parsed, raw };
}

const warmCodeGraphs = {};
function getWarmCodeGraph(repoPath) {
  if (!warmCodeGraphs[repoPath]) {
    warmCodeGraphs[repoPath] = CodeGraph.openSync(repoPath);
  }
  return warmCodeGraphs[repoPath];
}

async function queryCodeGraphWarm(repo, q) {
  const cg = getWarmCodeGraph(repo.path);
  const t0 = performance.now();
  let parsed = null;
  let raw = '';
  try {
    if (q.type === 'callers') {
      parsed = cg.getCallers(q.query_param);
    } else if (q.type === 'impact' || q.type === 'rename_impact') {
      const imp = cg.getImpactRadius(q.query_param);
      parsed = imp?.nodes ? Array.from(imp.nodes.values()) : [];
    } else {
      parsed = cg.searchNodes(q.query_param);
    }
    raw = JSON.stringify(parsed);
  } catch (e) {
    raw = String(e);
  }
  const latency = Math.round((performance.now() - t0) * 10) / 10;
  return { latency, parsed, raw };
}

// -------------------------------------------------------------
// BENCHMARK SUITE EXECUTION
// -------------------------------------------------------------

async function runBenchmark(name, runnerFn) {
  console.log(`\n======================================================`);
  console.log(`RUNNING BENCHMARK: ${name}`);
  console.log(`======================================================`);

  const repos = JSON.parse(readFileSync(REPOS_FILE, 'utf8')).repos;
  const repoResults = [];

  for (const repo of repos) {
    console.log(`  Processing ${repo.name} (${loadAllQuestions(repo.name).length} questions)...`);
    const questions = loadAllQuestions(repo.name);
    const questionResults = [];
    const latenciesOld = [];
    const latenciesHoldout = [];
    const latenciesAll = [];

    for (const q of questions) {
      const { latency, parsed, raw } = await runnerFn(repo, q);
      const evalRes = evaluateResult(q, parsed, raw);

      latenciesAll.push(latency);
      if (q.isHoldout) latenciesHoldout.push(latency);
      else latenciesOld.push(latency);

      questionResults.push({
        id: q.id,
        isHoldout: q.isHoldout,
        type: q.type,
        question: q.question,
        query_param: q.query_param,
        expected: q.expected,
        hit: evalRes.hit,
        rank: evalRes.rank,
        latencyMs: latency
      });
    }

    const oldHits = questionResults.filter(q => !q.isHoldout && q.hit).length;
    const oldTotal = questionResults.filter(q => !q.isHoldout).length;
    const holdoutHits = questionResults.filter(q => q.isHoldout && q.hit).length;
    const holdoutTotal = questionResults.filter(q => q.isHoldout).length;
    const totalHits = questionResults.filter(q => q.hit).length;
    const totalCount = questionResults.length;

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
      latencyOldP50: percentile(latenciesOld, 50),
      latencyOldP95: percentile(latenciesOld, 95),
      latencyHoldoutP50: percentile(latenciesHoldout, 50),
      latencyHoldoutP95: percentile(latenciesHoldout, 95),
      latencyAllP50: percentile(latenciesAll, 50),
      latencyAllP95: percentile(latenciesAll, 95),
      questions: questionResults
    });

    console.log(`    ${repo.name}: Old ${oldHits}/${oldTotal} (${repoResults[repoResults.length-1].oldAccuracy}%), Holdout ${holdoutHits}/${holdoutTotal} (${repoResults[repoResults.length-1].holdoutAccuracy}%), Total ${totalHits}/${totalCount} (${repoResults[repoResults.length-1].totalAccuracy}%), p50: ${percentile(latenciesAll, 50)}ms`);
  }

  const grandOldHits = repoResults.reduce((a, r) => a + r.oldHits, 0);
  const grandOldTotal = repoResults.reduce((a, r) => a + r.oldTotal, 0);
  const grandHoldoutHits = repoResults.reduce((a, r) => a + r.holdoutHits, 0);
  const grandHoldoutTotal = repoResults.reduce((a, r) => a + r.holdoutTotal, 0);
  const grandTotalHits = repoResults.reduce((a, r) => a + r.totalHits, 0);
  const grandTotal = repoResults.reduce((a, r) => a + r.totalCount, 0);

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
    latencyP50: percentile(allLatencies, 50),
    latencyP95: percentile(allLatencies, 95),
    repos: repoResults
  };

  writeFileSync(join(RAW_DIR, `v3-${name}.json`), JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  console.log('Starting BENCH-03 full benchmark suite (120 questions across 3 tools, Cold & Warm)...');

  const suite = {};

  // 1. PlugBrain Warm
  suite['plugbrain-warm'] = await runBenchmark('plugbrain-warm', queryPlugBrainWarm);

  // 2. PlugBrain Cold
  suite['plugbrain-cold'] = await runBenchmark('plugbrain-cold', queryPlugBrainCold);

  // 3. GitNexus Warm
  suite['gitnexus-warm'] = await runBenchmark('gitnexus-warm', queryGitNexusWarm);

  // 4. GitNexus Cold
  suite['gitnexus-cold'] = await runBenchmark('gitnexus-cold', queryGitNexusCold);

  // 5. CodeGraph Warm
  suite['codegraph-warm'] = await runBenchmark('codegraph-warm', queryCodeGraphWarm);

  // 6. CodeGraph Cold
  suite['codegraph-cold'] = await runBenchmark('codegraph-cold', queryCodeGraphCold);

  // Close warm code graphs
  for (const cg of Object.values(warmCodeGraphs)) {
    try { cg.close(); } catch {}
  }

  writeFileSync(join(RAW_DIR, 'v3-all-summary.json'), JSON.stringify(suite, null, 2));

  console.log('\n======================================================');
  console.log('FINAL BENCH-03 SUMMARY');
  console.log('======================================================');
  console.log('Tool                 | Old (80)     | Holdout (40) | Total (120)  | Latency p50 | Latency p95');
  console.log('---------------------+--------------+--------------+--------------+-------------+------------');
  for (const [key, s] of Object.entries(suite)) {
    const name = key.padEnd(20);
    const oldStr = `${s.grandOldHits}/${s.grandOldTotal} (${s.grandOldAccuracy}%)`.padEnd(12);
    const holdoutStr = `${s.grandHoldoutHits}/${s.grandHoldoutTotal} (${s.grandHoldoutAccuracy}%)`.padEnd(12);
    const totStr = `${s.grandTotalHits}/${s.grandTotal} (${s.grandTotalAccuracy}%)`.padEnd(12);
    const p50 = `${s.latencyP50} ms`.padEnd(11);
    const p95 = `${s.latencyP95} ms`;
    console.log(`${name} | ${oldStr} | ${holdoutStr} | ${totStr} | ${p50} | ${p95}`);
  }
}

main().catch(console.error);
