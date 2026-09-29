import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const codeDir = 'C:\\PLUG\\plugpt\\Code';
const plugHarnessDir = path.join(codeDir, 'PlugHarness');
const plugBoardDir = path.join(codeDir, 'PlugBoard');

// 1. PlugBoard Swarm Worktrees (14 worktrees)
const boardSwarm = [
  'PlugBoard--one-runtime--swarm-PB-INTAKE-01-architecture-a1',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-01-architecture-a2',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-01-architecture-a3',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-01-architecture-a4',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-02-runtime-seams-a1',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-02-runtime-seams-a2',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-02-runtime-seams-a3',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-02-runtime-seams-a4',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-02-runtime-seams-a5',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-03-r3-gaps-a1',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-03-r3-gaps-a2',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-03-r3-gaps-a3',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-03-r3-gaps-a4',
  'PlugBoard--one-runtime--swarm-PB-INTAKE-03-r3-gaps-a5',
];

console.log('=== REMOVING PLUGBOARD SWARM WORKTREES ===');
for (const t of boardSwarm) {
  const p = path.join(codeDir, t);
  if (fs.existsSync(p)) {
    try {
      execSync(`git worktree remove --force "${p}"`, { cwd: plugBoardDir, stdio: 'pipe' });
      console.log(`[OK] Removed worktree: ${t}`);
    } catch (e) {
      console.warn(`[WARN] git worktree remove failed for ${t}: ${e.message}, attempting directory cleanup...`);
      try {
        fs.rmSync(p, { recursive: true, force: true });
        execSync(`git worktree prune`, { cwd: plugBoardDir, stdio: 'pipe' });
        console.log(`[OK] Pruned worktree: ${t}`);
      } catch (err) {
        console.error(`[ERR] Failed to delete ${t}: ${err.message}`);
      }
    }
  } else {
    console.log(`[SKIP] Does not exist: ${t}`);
  }
}

// 2. PlugHarness Swarm Worktrees (16 clean worktrees, 24+ GB)
const harnessSwarm = [
  'PlugHarness--runtime--swarm-GW-AUTH-01-admission-seam-a1',
  'PlugHarness--runtime--swarm-GW-AUTH-01-admission-seam-a2',
  'PlugHarness--runtime--swarm-GW-AUTH-01-admission-seam-a3',
  'PlugHarness--runtime--swarm-GW-AUTH-01-admission-seam-a4',
  'PlugHarness--webui--swarm-WEBUI-01-session-port-a1',
  'PlugHarness--webui--swarm-WEBUI-01-session-port-a2',
  'PlugHarness--webui--swarm-WEBUI-01-session-port-a3',
  'PlugHarness--webui--swarm-WEBUI-03-brain-on-plugbrain-core-a1',
  'PlugHarness--webui--swarm-WEBUI-03-brain-on-plugbrain-core-a2',
  'PlugHarness--webui--swarm-WEBUI-03-brain-on-plugbrain-core-a3',
  'PlugHarness--webui--swarm-WEBUI-04-honest-shares-a1',
  'PlugHarness--webui--swarm-WEBUI-04-honest-shares-a2',
  'PlugHarness--webui--swarm-WEBUI-04-honest-shares-a3',
  'PlugHarness--webui--swarm-WEBUI-05-ui-route-regression-a1',
  'PlugHarness--webui--swarm-WEBUI-05-ui-route-regression-a2',
  'PlugHarness--webui--swarm-WEBUI-05-ui-route-regression-a3',
];

console.log('\n=== REMOVING PLUGHARNESS SWARM WORKTREES (24+ GB) ===');
for (const t of harnessSwarm) {
  const p = path.join(codeDir, t);
  if (fs.existsSync(p)) {
    try {
      execSync(`git worktree remove --force "${p}"`, { cwd: plugHarnessDir, stdio: 'pipe' });
      console.log(`[OK] Removed worktree: ${t}`);
    } catch (e) {
      console.warn(`[WARN] git worktree remove failed for ${t}: ${e.message}, attempting directory cleanup...`);
      try {
        fs.rmSync(p, { recursive: true, force: true });
        execSync(`git worktree prune`, { cwd: plugHarnessDir, stdio: 'pipe' });
        console.log(`[OK] Pruned worktree: ${t}`);
      } catch (err) {
        console.error(`[ERR] Failed to delete ${t}: ${err.message}`);
      }
    }
  } else {
    console.log(`[SKIP] Does not exist: ${t}`);
  }
}

// Prune git metadata for both
try { execSync('git worktree prune', { cwd: plugBoardDir }); } catch {}
try { execSync('git worktree prune', { cwd: plugHarnessDir }); } catch {}

console.log('\n=== STAGE 1 CLEANUP COMPLETED ===');
