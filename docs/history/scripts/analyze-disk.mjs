import fs from 'node:fs';
import path from 'node:path';

function dirSizeFast(p, skipNodeModules = false) {
  let bytes = 0;
  let files = 0;
  let nodeModulesBytes = 0;
  let gitBytes = 0;
  let stack = [p];

  while (stack.length > 0) {
    const cur = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch { continue; }

    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules') {
          // Measure node_modules quickly
          const nmSize = measureSubdir(full);
          nodeModulesBytes += nmSize.bytes;
          bytes += nmSize.bytes;
          files += nmSize.files;
          continue;
        }
        if (e.name === '.git') {
          const gitSize = measureSubdir(full);
          gitBytes += gitSize.bytes;
          bytes += gitSize.bytes;
          files += gitSize.files;
          continue;
        }
        stack.push(full);
      } else if (e.isFile()) {
        try {
          bytes += fs.statSync(full).size;
          files++;
        } catch {}
      }
    }
  }
  return { bytes, files, nodeModulesBytes, gitBytes };
}

function measureSubdir(p) {
  let bytes = 0;
  let files = 0;
  let stack = [p];
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

const root = 'C:\\PLUG\\plugpt';

console.log('=== 1. TOP-LEVEL DIRECTORIES IN C:\\PLUG\\plugpt ===');
const topEntries = fs.readdirSync(root, { withFileTypes: true });
for (const e of topEntries) {
  if (e.name === 'Code') continue;
  const full = path.join(root, e.name);
  if (e.isDirectory()) {
    const res = dirSizeFast(full);
    const gb = (res.bytes / 1e9).toFixed(2);
    const mb = (res.bytes / 1e6).toFixed(1);
    console.log(`  ${e.name.padEnd(30)} ${gb.padStart(6)} GB (${mb.padStart(8)} MB) [${res.files} files]`);
  } else {
    const st = fs.statSync(full);
    const mb = (st.size / 1e6).toFixed(2);
    console.log(`  ${e.name.padEnd(30)} ${(mb + ' MB').padStart(9)}`);
  }
}

console.log('\n=== 2. WORKTREES IN C:\\PLUG\\plugpt\\Code ===');
const codeDir = path.join(root, 'Code');
const codeEntries = fs.readdirSync(codeDir, { withFileTypes: true });
const worktreeStats = [];

for (const e of codeEntries) {
  const full = path.join(codeDir, e.name);
  if (e.isDirectory()) {
    const res = dirSizeFast(full);
    worktreeStats.push({
      name: e.name,
      totalBytes: res.bytes,
      totalGB: res.bytes / 1e9,
      totalMB: res.bytes / 1e6,
      files: res.files,
      nodeModulesMB: res.nodeModulesBytes / 1e6,
      gitMB: res.gitBytes / 1e6,
      srcMB: (res.bytes - res.nodeModulesBytes - res.gitBytes) / 1e6,
      isWorktree: e.name.includes('--'),
      isSwarm: e.name.includes('--swarm-')
    });
  }
}

worktreeStats.sort((a, b) => b.totalBytes - a.totalBytes);

let totalCodeBytes = 0;
let totalNodeModulesBytes = 0;
let totalGitBytes = 0;
let totalSwarmWorktreeBytes = 0;

console.log('Top 30 heaviest folders in Code/:');
console.log('Name'.padEnd(65) + 'Total GB'.padStart(10) + 'NM (MB)'.padStart(12) + '.git (MB)'.padStart(12) + 'Src (MB)'.padStart(12));
console.log('-'.repeat(115));

for (let i = 0; i < worktreeStats.length; i++) {
  const w = worktreeStats[i];
  totalCodeBytes += w.totalBytes;
  totalNodeModulesBytes += w.nodeModulesMB * 1e6;
  totalGitBytes += w.gitMB * 1e6;
  if (w.isSwarm) totalSwarmWorktreeBytes += w.totalBytes;

  if (i < 30 || w.totalMB > 100) {
    console.log(
      w.name.padEnd(65) +
      w.totalGB.toFixed(2).padStart(10) +
      w.nodeModulesMB.toFixed(1).padStart(12) +
      w.gitMB.toFixed(1).padStart(12) +
      w.srcMB.toFixed(1).padStart(12)
    );
  }
}

console.log('\n=== CODE SUMMARY ===');
console.log(`Total Code/ size:           ${(totalCodeBytes / 1e9).toFixed(2)} GB`);
console.log(`Total node_modules in Code: ${(totalNodeModulesBytes / 1e9).toFixed(2)} GB`);
console.log(`Total .git in Code:         ${(totalGitBytes / 1e9).toFixed(2)} GB`);
console.log(`Total in Swarm worktrees:   ${(totalSwarmWorktreeBytes / 1e9).toFixed(2)} GB`);
console.log(`Total worktrees:            ${worktreeStats.length} (Swarm: ${worktreeStats.filter(w => w.isSwarm).length}, Other worktrees: ${worktreeStats.filter(w => w.isWorktree && !w.isSwarm).length}, Main repos: ${worktreeStats.filter(w => !w.isWorktree).length})`);
