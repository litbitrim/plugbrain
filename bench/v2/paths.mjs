/**
 * Shared location helpers for the bench scripts.
 *
 * This repository contains no private paths: the benchmark corpora live
 * outside the repo. Their location comes from the BENCH_REPOS_ROOT
 * environment variable — one subdirectory per repo, matching the names in
 * bench/v2/repos.json (e.g. <BENCH_REPOS_ROOT>/mcpz). Temporary benchmark
 * homes are also created under this directory.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** The PlugBrain checkout this bench directory belongs to (the repo root). */
export const WORKTREE = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

/** The bench/v2 data directory. */
export const BENCH_V2_DIR = join(WORKTREE, 'bench/v2');

/** Frozen ground-truth questions. */
export const QUESTIONS_DIR = join(BENCH_V2_DIR, 'questions');

/** Raw benchmark results. */
export const RAW_DIR = join(BENCH_V2_DIR, 'raw');

/** The corpus list: names, snapshot commits, descriptions. */
export const REPOS_FILE = join(BENCH_V2_DIR, 'repos.json');

/**
 * Root directory of the benchmark corpora (BENCH_REPOS_ROOT). Throws with a
 * clear message when the variable is missing, so scripts fail before any work.
 */
export function requireReposRoot() {
  const root = process.env.BENCH_REPOS_ROOT;
  if (!root) {
    throw new Error(
      'BENCH_REPOS_ROOT is not set. Point it at the directory holding the benchmark ' +
      'corpora — one subdirectory per repo, matching bench/v2/repos.json ' +
      '(e.g. BENCH_REPOS_ROOT=/path/to/corpora with <root>/mcpz inside). ' +
      'Temporary benchmark homes are also created under this directory.'
    );
  }
  return root;
}

/**
 * Corpus entries from bench/v2/repos.json with their local directory
 * attached: <BENCH_REPOS_ROOT>/<name>. Fails when BENCH_REPOS_ROOT is unset.
 */
export function loadRepos() {
  const root = requireReposRoot();
  const repos = JSON.parse(readFileSync(REPOS_FILE, 'utf8')).repos;
  return repos.map((repo) => ({ ...repo, path: join(root, repo.name) }));
}
