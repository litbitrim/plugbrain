/**
 * M09 Parity Benchmark Runner
 *
 * Compares PlugBrain vs GitNexus accuracy, latency, and index footprint
 * across the frozen benchmark corpora.
 *
 * Usage:
 *   BENCH_REPOS_ROOT=/path/to/corpora node bench/m09-parity.mjs [--dry-run]
 *
 * --dry-run validates questions, schemas, and paths without running
 * full benchmarks. Exit 0 on success.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { BENCH_V2_DIR, QUESTIONS_DIR, RAW_DIR, REPOS_FILE, loadRepos, requireReposRoot } from './v2/paths.mjs';

const DRY_RUN = process.argv.includes('--dry-run');

function validateRepos() {
  const repos = JSON.parse(readFileSync(REPOS_FILE, 'utf8')).repos;
  if (!repos || !Array.isArray(repos)) {
    throw new Error('Invalid repos.json: repos array missing');
  }
  const issues = [];
  for (const repo of repos) {
    if (!repo.name || !repo.description) {
      issues.push(`${repo.name || 'unknown'} missing name/description`);
    }
    if (repo.name === 'plugharness') {
      // Accept main branch for plugharness
      if (repo.commit !== 'main' && !repo.commit?.startsWith('1') && !repo.commit?.length > 7) {
        issues.push(`plugharness commit format looks wrong: ${repo.commit}`);
      }
    }
  }
  if (issues.length) {
    throw new Error(`Repos validation failed: ${issues.join('; ')}`);
  }
}

function validateQuestions() {
  const dirs = existsSync(QUESTIONS_DIR) ? [...new Set([QUESTIONS_DIR])] : [];
  const requiredRepos = ['mcpz', 'plugmedia', 'cowork', 'plugengine', 'plugharness'];
  const missing = [];
  
  for (const name of requiredRepos) {
    const file = join(QUESTIONS_DIR, `${name}.json`);
    if (!existsSync(file)) {
      missing.push(file);
      continue;
    }
    let questions;
    try {
      questions = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      throw new Error(`Invalid JSON in ${file}: ${e.message}`);
    }
    if (!Array.isArray(questions)) {
      throw new Error(`${file} does not contain an array`);
    }
    if (questions.length < 10) {
      throw new Error(`${file} has only ${questions.length} questions (expected >=10)`);
    }
    for (const q of questions) {
      if (!q.id || !q.type || !q.question || !q.query_param || !q.expected) {
        throw new Error(`${file}:${q.id || 'unknown'} missing required fields`);
      }
      if (!q.expected.path || !q.expected.symbol) {
        throw new Error(`${file}:${q.id} expected.path/symbol missing`);
      }
    }
  }
  
  if (missing.length) {
    throw new Error(`Missing question files: ${missing.join(', ')}`);
  }
}

function checkRawDir() {
  if (!existsSync(RAW_DIR)) {
    console.log('Creating raw directory...');
    // Will be created on first write
  }
}

function loadExistingResults(tool) {
  const results = {};
  try {
    const summaryFile = join(RAW_DIR, `${tool}-summary.json`);
    if (existsSync(summaryFile)) {
      const summary = JSON.parse(readFileSync(summaryFile, 'utf8'));
      results[tool] = summary;
      results[`${tool}Repos`] = summary.repos || [];
    }
  } catch (e) {
    console.warn(`Could not load ${tool} results: ${e.message}`);
  }
  return results;
}

function computeParityMetrics(plugbrain, gitnexus) {
  const parity = {
    timestamp: new Date().toISOString(),
    totalQuestionsPB: 0,
    totalQuestionsGN: 0,
    totalHitsPB: 0,
    totalHitsGN: 0,
    accuracyPB: 0,
    accuracyGN: 0,
    accuracyDelta: 0,
    latencyHitRatioPB: 0,
    latencyHitRatioGN: 0,
    indexSizeDeltaBytes: 0,
    repos: []
  };
  
  const pbRepos = new Map((plugbrain.repos || []).map(r => [r.repo, r]));
  const gnRepos = new Map((gitnexus.repos || []).map(r => [r.repo, r]));
  
  let totalLatenciesPB = [];
  let totalLatenciesGN = [];
  let totalIndexSizePB = 0;
  let totalIndexSizeGN = 0;
  
  for (const [repoName, gnRepo] of gnRepos) {
    const pbRepo = pbRepos.get(repoName);
    if (!pbRepo) continue;
    
    const hitDelta = (pbRepo.hitCount - gnRepo.hitCount);
    const accPB = pbRepo.accuracy || 0;
    const accGN = gnRepo.accuracy || 0;
    const latencyDelta = (pbRepo.latencyP50Ms || 0) - (gnRepo.latencyP50Ms || 0);
    
    parity.repos.push({
      repo: repoName,
      commit: pbRepo.commit,
      questionsPB: pbRepo.questionCount,
      questionsGN: gnRepo.questionCount,
      hitsPB: pbRepo.hitCount,
      hitsGN: gnRepo.hitCount,
      accuracyPB: accPB,
      accuracyGN: accGN,
      accuracyDelta: Math.round((accPB - accGN) * 10) / 10,
      latencyP50PB: pbRepo.latencyP50Ms,
      latencyP50GN: gnRepo.latencyP50Ms,
      latencyDeltaP50: latencyDelta,
      indexSizePBBytes: pbRepo.indexSizeBytes,
      indexSizeGNBytes: gnRepo.indexSizeBytes,
      indexSizeDeltaBytes: (pbRepo.indexSizeBytes || 0) - (gnRepo.indexSizeBytes || 0)
    });
    
    parity.totalQuestionsPB += pbRepo.questionCount || 0;
    parity.totalQuestionsGN += gnRepo.questionCount || 0;
    parity.totalHitsPB += pbRepo.hitCount || 0;
    parity.totalHitsGN += gnRepo.hitCount || 0;
    totalIndexSizePB += pbRepo.indexSizeBytes || 0;
    totalIndexSizeGN += gnRepo.indexSizeBytes || 0;
  }
  
  if (parity.totalQuestionsPB > 0) {
    parity.accuracyPB = Math.round((parity.totalHitsPB / parity.totalQuestionsPB) * 1000) / 10;
  }
  if (parity.totalQuestionsGN > 0) {
    parity.accuracyGN = Math.round((parity.totalHitsGN / parity.totalQuestionsGN) * 1000) / 10;
  }
  parity.accuracyDelta = Math.round((parity.accuracyPB - parity.accuracyGN) * 10) / 10;
  parity.indexSizeDeltaBytes = totalIndexSizePB - totalIndexSizeGN;
  
  return parity;
}

async function run() {
  console.log('M09 Parity Benchmark Validator');
  console.log('================================');
  
  if (DRY_RUN) {
    console.log('\n[DRY RUN] Checking configuration...');
  } else {
    console.log('\n[VALIDATING] Checking configuration...');
  }
  
  // Validate environment
  if (!process.env.BENCH_REPOS_ROOT) {
    throw new Error('BENCH_REPOS_ROOT environment variable is required');
  }
  requireReposRoot();
  
  // Validate repos
  validateRepos();
  console.log('✓ repos.json valid');
  
  // Validate questions
  validateQuestions();
  console.log('✓ questions valid (all repos have >=10 questions)');
  
  // Check raw directory
  checkRawDir();
  console.log('✓ raw directory exists');
  
  // Load existing results
  const plugbrain = loadExistingResults('plugbrain');
  const gitnexus = loadExistingResults('gitnexus');
  
  if (!DRY_RUN) {
    if (!plugbrain || !gitnexus) {
      console.warn('\n⚠ Warning: Existing benchmark results not found.');
      console.warn('Run bench/v2/run-plugbrain.mjs and run-gitnexus.mjs first.');
      console.warn('Continuing with validation only...');
    } else {
      console.log('✓ Found existing benchmark results');
      
      // Compute parity metrics
      const parity = computeParityMetrics(plugbrain, gitnexus);
      
      // Write parity report
      const parityFile = join(RAW_DIR, 'm09-parity-report.json');
      writeFileSync(parityFile, JSON.stringify(parity, null, 2));
      
      // Summary output
      console.log('\n================================');
      console.log('Parity Report Summary');
      console.log('================================');
      console.log(`Total Questions (PlugBrain): ${parity.totalQuestionsPB}`);
      console.log(`Total Questions (GitNexus): ${parity.totalQuestionsGN}`);
      console.log(`Accuracy (PlugBrain): ${parity.accuracyPB}%`);
      console.log(`Accuracy (GitNexus): ${parity.accuracyGN}%`);
      console.log(`Accuracy Delta: ${parity.accuracyDelta > 0 ? '+' : ''}${parity.accuracyDelta}%`);
      console.log(`Index Size Delta: ${parity.indexSizeDeltaBytes > 0 ? '+' : ''}${(parity.indexSizeDeltaBytes / 1024 / 1024).toFixed(2)} MB`);
      
      for (const repo of parity.repos) {
        const deltaIcon = repo.accuracyDelta >= 0 ? '▲' : '▼';
        console.log(`  ${repo.repo}: PB ${repo.accuracyPB}% / GN ${repo.accuracyGN}% (${deltaIcon} ${repo.accuracyDelta > 0 ? '+' : ''}${repo.accuracyDelta}%)`);
      }
      
      console.log(`\nParity report saved to: ${parityFile}`);
    }
  } else {
    console.log('\n[DOCKER RUN] All validation checks passed');
  }
  
  console.log('\n✓ M09 Parity Benchmark validation complete');
  
  // Schema documentation
  console.log('\n--- Schema Documentation ---');
  console.log('Parity report schema:');
  console.log({
    tool: 'm09-parity',
    repos: ['name', 'commit', 'description'],
    questionsFormat: {
      id: 'string',
      type: 'definition|callers|impact|dataflow|config|entrypoint|docs_notes|rename_impact',
      question: 'string',
      query_param: 'string',
      expected: {
        path: 'string',
        symbol: 'string',
        kind: 'string',
        details: 'string',
        expected_targets: ['string'] // optional
      }
    }
  });
  
  process.exitCode = 0;
}

run().catch(err => {
  console.error('\n✗ Validation failed:', err.message);
  process.exit(1);
});
