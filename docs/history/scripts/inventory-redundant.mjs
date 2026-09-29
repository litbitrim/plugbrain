import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:\\PLUG\\plugpt';
const codeDir = path.join(root, 'Code');

function getFolderSize(dir) {
  let bytes = 0;
  let files = 0;
  let stack = [dir];
  while (stack.length > 0) {
    const cur = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch { continue; }
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) {
        stack.push(full);
      } else if (e.isFile()) {
        try {
          bytes += fs.statSync(full).size;
          files++;
        } catch {}
      }
    }
  }
  return { bytes, files };
}

console.log('=== DETAILED INVENTORY OF DEAD / REDUNDANT CANDIDATES ===\n');

// 1. .plugbrain-test
const testDbDir = path.join(root, '.plugbrain-test');
if (fs.existsSync(testDbDir)) {
  const { bytes, files } = getFolderSize(testDbDir);
  console.log(`[CATEGORY 1: TEST DATABASES]`);
  console.log(`  Path: ${testDbDir}`);
  console.log(`  Size: ${(bytes / 1e9).toFixed(2)} GB (${files} files)`);
  const sub = fs.readdirSync(testDbDir);
  for (const s of sub) {
    const sp = path.join(testDbDir, s);
    const sz = getFolderSize(sp);
    console.log(`    - ${s.padEnd(25)} ${(sz.bytes / 1e9).toFixed(2)} GB (${(sz.bytes / 1e6).toFixed(1)} MB)`);
  }
}

// 2. Swarm Worktrees in Code/
console.log(`\n[CATEGORY 2: SWARM WORKTREES (EPHEMERAL SUBAGENTS)]`);
const entries = fs.readdirSync(codeDir, { withFileTypes: true });
const swarmWts = entries.filter(e => e.isDirectory() && e.name.includes('--swarm-'));
let swarmTotalBytes = 0;
for (const s of swarmWts) {
  const p = path.join(codeDir, s.name);
  const sz = getFolderSize(p);
  swarmTotalBytes += sz.bytes;
  let status = 'unknown';
  try {
    const st = execSync('git status --porcelain', { cwd: p, encoding: 'utf8', timeout: 5000 });
    status = st.trim() ? `${st.trim().split('\n').length} dirty files` : 'clean';
  } catch {
    status = 'err';
  }
  console.log(`  ${s.name.padEnd(65)} ${(sz.bytes / 1e9).toFixed(2)} GB (${(sz.bytes / 1e6).toFixed(1)} MB) [${status}]`);
}
console.log(`  --> TOTAL SWARM WORKTREES: ${(swarmTotalBytes / 1e9).toFixed(2)} GB across ${swarmWts.length} worktrees`);

// 3. Obsolete / Completed Mission Worktrees
console.log(`\n[CATEGORY 3: OBSOLETE / INACTIVE MISSION WORKTREES]`);
const missionWts = entries.filter(e => e.isDirectory() && e.name.includes('--') && !e.name.includes('--swarm-'));
let missionTotalBytes = 0;
for (const m of missionWts) {
  const p = path.join(codeDir, m.name);
  const sz = getFolderSize(p);
  missionTotalBytes += sz.bytes;
  let status = 'unknown';
  let branch = '';
  try {
    const b = execSync('git rev-parse --abbrev-ref HEAD', { cwd: p, encoding: 'utf8', timeout: 5000 }).trim();
    branch = b;
    const st = execSync('git status --porcelain', { cwd: p, encoding: 'utf8', timeout: 5000 });
    status = st.trim() ? `${st.trim().split('\n').length} dirty files` : 'clean';
  } catch {
    status = 'err';
  }
  console.log(`  ${m.name.padEnd(45)} ${(sz.bytes / 1e9).toFixed(2)} GB [${branch.padEnd(30)}] (${status})`);
}
console.log(`  --> TOTAL MISSION WORKTREES: ${(missionTotalBytes / 1e9).toFixed(2)} GB across ${missionWts.length} worktrees`);
