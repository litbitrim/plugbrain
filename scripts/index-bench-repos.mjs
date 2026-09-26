import { spawnSync } from 'node:child_process';
import { readFileSync, statSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const BENCH_DIR = 'C:/PLUG/bench';
const TEMP_HOME = join(BENCH_DIR, '_plugbrain-home');
const WORKTREE = 'C:/PLUG/plugpt/Code/PlugBrain-Core--bench';
const REPOS_FILE = join(WORKTREE, 'bench/v2/repos.json');
const DIST_CLI = join(WORKTREE, 'dist/plugbrain.mjs');

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

const repos = JSON.parse(readFileSync(REPOS_FILE, 'utf8')).repos;
const indexStats = {};

for (const repo of repos) {
  console.log(`\n========================================`);
  console.log(`PlugBrain: Registering & Indexing ${repo.name} at ${repo.path}`);
  console.log(`========================================`);

  const regRes = spawnSync('node', [DIST_CLI, 'register', repo.path, repo.name], {
    cwd: WORKTREE,
    env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME },
    encoding: 'utf8'
  });
  console.log(regRes.stdout.trim());

  const wsMatch = (regRes.stdout || '').match(/ws-[a-f0-9]{12}/);
  const wsId = wsMatch ? wsMatch[0] : null;

  const t0 = performance.now();
  const idxArgs = wsId ? [DIST_CLI, 'index', wsId] : [DIST_CLI, 'index'];
  const idxRes = spawnSync('node', idxArgs, {
    cwd: WORKTREE,
    env: { ...process.env, PLUGBRAIN_HOME: TEMP_HOME },
    encoding: 'utf8'
  });
  const indexTimeMs = Math.round(performance.now() - t0);
  console.log(idxRes.stdout.trim());
  console.log(`Index time for ${repo.name}: ${indexTimeMs} ms`);

  indexStats[repo.name] = {
    indexTimeMs,
    wsId
  };
}

const totalSize = getDirSize(TEMP_HOME);
console.log(`\nTotal PlugBrain index size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
