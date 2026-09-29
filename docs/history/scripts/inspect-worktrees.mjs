import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const codeDir = 'C:\\PLUG\\plugpt\\Code';
const entries = fs.readdirSync(codeDir, { withFileTypes: true });
const mainRepos = entries.filter(e => e.isDirectory() && !e.name.includes('--') && !e.name.startsWith('.'));

console.log(`Found ${mainRepos.length} main repositories in Code/`);

for (const repo of mainRepos) {
  const p = path.join(codeDir, repo.name);
  try {
    const wtList = execSync('git worktree list --porcelain', { cwd: p, encoding: 'utf8' });
    const lines = wtList.split('\n');
    const wts = [];
    let cur = {};
    for (const l of lines) {
      if (l.startsWith('worktree ')) {
        if (cur.path) wts.push(cur);
        cur = { path: l.substring(9).trim() };
      } else if (l.startsWith('branch ')) {
        cur.branch = l.substring(7).trim().replace('refs/heads/', '');
      } else if (l.startsWith('HEAD ')) {
        cur.head = l.substring(5).trim();
      } else if (l.startsWith('bare')) {
        cur.bare = true;
      }
    }
    if (cur.path) wts.push(cur);

    if (wts.length > 1) {
      console.log(`\n=== ${repo.name} (${wts.length} worktrees) ===`);
      for (const wt of wts) {
        let dirty = 'unknown';
        try {
          const st = execSync('git status --porcelain', { cwd: wt.path, encoding: 'utf8', timeout: 5000 });
          dirty = st.trim() ? `${st.trim().split('\n').length} dirty files` : 'clean';
        } catch (e) {
          dirty = 'error/inaccessible';
        }
        console.log(`  ${path.basename(wt.path).padEnd(65)} [${(wt.branch || 'detached').padEnd(35)}] (${dirty})`);
      }
    }
  } catch (e) {}
}
