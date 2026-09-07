/* ═══════════════════════════════════════════════════════════════════════
   PlugBrain City — runtime model (dynamic)

   This module is the addon's data plane. Workspaces register from the
   PlugBrain runtime via window.PlugBrainCity and the city grows while you
   watch: every workspace is a district (plot), every module it touches is a
   building, and activity makes buildings rise.

     PlugBrainCity.register({ id:'ws-core', name:'plugbrain-core' })
     PlugBrainCity.grow('ws-core', { path:'mesh/orb.ts', loc:220 })
     PlugBrainCity.event('ws-core', 'checkpoint written')
     PlugBrainCity.unregister('ws-core')

   The map is deliberately empty until the real PlugBrain adapter registers a
   workspace. A product surface must never turn missing index data into a
   convincing demo city; the empty state is the evidence-bearing state.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── live collections (mutated in place; city.js reads them every frame) ── */
export const files = [];        // buildings: {path,name,dir,top,loc,deps,usedBy,note,x,z,tx,tz,h,pulse,dying}
export const edges = [];        // {from,to} — references between buildings
export const plots = [];        // districts: {dir,x,z,w,h,tx,tz,tw,th}
export const dirs = [];         // workspace ids, in registration order
export const TOPS = dirs;       // hue comes from the workspace
export const FMAP = {};         // path → file
export const workspaces = [];   // {id,name,ki,load,events,createdAt,dying,sim}
export const feed = [];         // {t,ws,msg,kind} newest first, capped

export const CELL = 7.2, STREET = 6;
export const KVARS = ['--k1', '--k2', '--k3', '--k4', '--k5', '--k6'];
export const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
/* A building wears the colour of the agent that last WROTE it; a building an
   agent only read wears its reader's colour at reduced weight (set by the
   feed). Only when no agent has been near it does it fall back to the
   workspace hue — so colour on this map always answers "who was here". */
export const colorOf = f => f.agentColor || cssv(KVARS[(f.ki ?? 0) % KVARS.length]);
export const wsColor = ws => cssv(KVARS[ws.ki % KVARS.length]);
export const shadeOf = new Map();

let heightMode = 'loc';
export function setHeightMode(v) { heightMode = v }
export const getHeightMode = () => heightMode;
export const hOf = f => {
  const maxLoc = Math.max(1, ...files.map(x => x.loc));
  const maxUse = Math.max(1, ...files.map(x => x.usedBy.length));
  return f.dying ? 0 : heightMode === 'loc'
    ? 1.5 + f.loc / maxLoc * 26
    : 1.5 + f.usedBy.length / maxUse * 26;
};

/* ── subscribers (React panels re-render on notify) ────────────────────── */
const subs = new Set();
export const subscribe = fn => { subs.add(fn); return () => subs.delete(fn) };
const notify = () => subs.forEach(fn => fn());

/* ── feed ──────────────────────────────────────────────────────────────── */
function log(ws, msg, kind = 'ok') {
  feed.unshift({ t: new Date(), ws, msg, kind, id: Math.random().toString(36).slice(2) });
  if (feed.length > 60) feed.pop();
}

/* ── layout: one plot per workspace, buildings in a near-square grid ────── */
function rebuildLayout() {
  const MAXW = 74;
  let row = 0, rowW = 0, rowH = 0;
  const live = dirs.filter(d => workspaces.find(w => w.id === d));
  const seen = new Set();
  // pass 1: raw (un-centred) targets per plot
  for (const d of live) {
    const fs = files.filter(f => f.dir === d && !f.dying);
    if (!fs.length && workspaces.find(w => w.id === d)?.dying) continue;
    const n = Math.max(1, Math.ceil(Math.sqrt(Math.max(1, fs.length))));
    const w = n * CELL + STREET, h = Math.max(1, Math.ceil(Math.max(1, fs.length) / n)) * CELL + STREET;
    if (rowW + w > MAXW && rowW > 0) { row += rowH; rowW = 0; rowH = 0 }
    let p = plots.find(p => p.dir === d);
    if (!p) {
      p = { dir: d, x: rowW + w / 2, z: row + h / 2, w: 0.01, h: 0.01 };
      plots.push(p);
    }
    Object.assign(p, { tx: rowW, tz: row, tw: w, th: h, cols: n });
    seen.add(d);
    rowW += w; rowH = Math.max(rowH, h);
  }
  const ps = plots.filter(p => seen.has(p.dir));
  // pass 2: centre, then hand every building its target grid cell
  if (ps.length) {
    const offX = Math.max(...ps.map(p => p.tx + p.tw)) / 2;
    const offZ = Math.max(...ps.map(p => p.tz + p.th)) / 2;
    for (const p of ps) { p.tx -= offX; p.tz -= offZ }
    for (const p of ps) {
      const fs = files.filter(f => f.dir === p.dir);
      fs.forEach((f, k) => {
        f.tx = p.tx + STREET / 2 + (k % p.cols) * CELL + CELL / 2;
        f.tz = p.tz + STREET / 2 + Math.floor(k / p.cols) * CELL + CELL / 2;
        if (f.x === undefined) { f.x = f.tx; f.z = f.tz }
      });
    }
  }
  // drop plots whose workspace is gone
  for (let i = plots.length - 1; i >= 0; i--) {
    if (!seen.has(plots[i].dir) && !files.some(f => f.dir === plots[i].dir)) plots.splice(i, 1);
  }
  for (const d of live) shadeOf.set(d, 0.5);
}

/* ── registry ──────────────────────────────────────────────────────────── */
function addWorkspace(id, name, sim = false) {
  let ws = workspaces.find(w => w.id === id);
  if (ws) return ws;
  ws = { id, name: name || id, ki: workspaces.length, load: 0, events: 0, createdAt: new Date(), dying: false, sim };
  workspaces.push(ws);
  if (!dirs.includes(id)) dirs.push(id);
  log(name || id, 'workspace registered', 'reg');
  rebuildLayout(); notify();
  return ws;
}

function addFile(ws, { path, loc = 40, deps = [], note = '', agentColor = null, agentName = null, access = null }) {
  const name = path.split('/').pop();
  const full = path.includes('/') && path.startsWith(ws.id + '/') ? path : `${ws.id}/${path}`;
  let f = FMAP[full];
  if (f) {                       // existing building grows
    f.loc += Math.max(2, Math.round(loc * 0.25));
    f.pulse = 1;
    if (agentColor) { f.agentColor = agentColor; f.agentName = agentName; f.access = access }
    return f;
  }
  f = {
    path: full, name, dir: ws.id, top: ws.id, ki: ws.ki,
    loc, deps: [], usedBy: [], note,
    agentColor, agentName, access,
    x: undefined, z: undefined, h: 0, pulse: 1, dying: false,
  };
  // resolve deps: bare names point inside the same workspace
  for (let d of deps) {
    if (!d.includes('/')) d = `${ws.id}/${d}`;
    const t = FMAP[d];
    if (t) { f.deps.push(d); edges.push({ from: f, to: t }); t.usedBy.push(full) }
  }
  files.push(f); FMAP[full] = f;
  rebuildLayout(); notify();
  return f;
}

function removeDead() {
  let changed = false;
  for (let i = files.length - 1; i >= 0; i--) {
    const f = files[i];
    if (f.dying && f.h < 0.25) {
      files.splice(i, 1); delete FMAP[f.path]; changed = true;
      for (let j = edges.length - 1; j >= 0; j--)
        if (edges[j].from === f || edges[j].to === f) edges.splice(j, 1);
      for (const o of files) {
        const k = o.deps.indexOf(f.path); if (k >= 0) o.deps.splice(k, 1);
        const k2 = o.usedBy.indexOf(f.path); if (k2 >= 0) o.usedBy.splice(k2, 1);
      }
    }
  }
  for (let i = workspaces.length - 1; i >= 0; i--) {
    const ws = workspaces[i];
    if (ws.dying && !files.some(f => f.dir === ws.id)) {
      workspaces.splice(i, 1);
      const k = dirs.indexOf(ws.id); if (k >= 0) dirs.splice(k, 1);
      changed = true;
    }
  }
  if (changed) { rebuildLayout(); notify() }
}

/* load decay — the registry bars fall back to idle */
setInterval(() => {
  let any = false;
  for (const ws of workspaces) if (ws.load > 0.01) { ws.load *= 0.82; any = true }
  if (any) notify();
}, 600);

/* ═══════════════════════════════════════════════════════════════════════
   Public API — the runtime's attachment point: window.PlugBrainCity
   ═══════════════════════════════════════════════════════════════════════ */
const api = {
  register({ id, name } = {}) {
    if (!id) return console.warn('[PlugBrainCity] register() needs an id');
    return addWorkspace(String(id), name && String(name), false);
  },
  grow(id, { path, loc = 40, deps = [], note = '', agentColor = null, agentName = null, access = null } = {}) {
    const ws = workspaces.find(w => w.id === id);
    if (!ws || !path) return console.warn('[PlugBrainCity] grow() needs a registered workspace id and a path');
    ws.load = Math.min(1, ws.load + 0.3); ws.events++;
    return addFile(ws, { path, loc, deps, note, agentColor, agentName, access });
  },
  event(id, msg) {
    const ws = workspaces.find(w => w.id === id);
    if (!ws) return;
    const own = files.filter(f => f.dir === id && !f.dying);
    if (own.length) own[Math.floor(Math.random() * own.length)].pulse = 1;
    ws.load = Math.min(1, ws.load + 0.25); ws.events++;
    log(ws.name, String(msg || 'event'));
    notify();
  },
  unregister(id) {
    const ws = workspaces.find(w => w.id === id);
    if (!ws) return;
    ws.dying = true;
    files.filter(f => f.dir === id).forEach(f => { f.dying = true });
    log(ws.name, 'workspace unregistered', 'sys');
    rebuildLayout(); notify();
  },
  list: () => workspaces.map(w => ({ id: w.id, name: w.name, buildings: files.filter(f => f.dir === w.id).length })),
  // Kept as a read-only compatibility field for older embedded callers. A
  // false result is the only honest answer: this product has no demo fleet.
  simulated: () => false,
};
window.PlugBrainCity = api;

export { api, removeDead, rebuildLayout, log, notify };
