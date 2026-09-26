/* ── PlugBrain Agent Mesh — extension module ─────────────────────────────────
   Drop-in module for the agent-swarm dashboard. It does not change the
   engine; it observes it through the mesh bridge (src/lib/meshBridge.js).

   What the module adds:
     · a registry of named, colour-coded agents (window.PlugBrainMesh),
     · persistent colour trails on the field (drawn by the bridge),
     · a live event feed (registrations, state changes, runtime notes),
     · a registry panel (toggle: button top-right or key "m").

   Runtime wiring — from your plugbrain runtime, after the page loads:

     PlugBrainMesh.register({id: 'agy-impl', name: 'Implementation Agent'})
     PlugBrainMesh.note('agy-impl', 'MISSION-31 · writeCheckpoint()', 'ok')
     PlugBrainMesh.note('agy-impl', 'gate failed: MISSION-32', 'bad')
     PlugBrainMesh.unregister('agy-impl')

   Until a runtime registers, the simulated fleet stands in: every simulated
   agent is auto-registered as A<n> so trails and the panel are alive from the
   first frame. Registering a real id re-binds that colour to your agent.
   ─────────────────────────────────────────────────────────────────────────── */

const LEVELS = ['info', 'ok', 'warn', 'bad'];

export function createAgentMesh({mesh}) {
  const listeners = new Map();          // evt -> Set<cb>
  const registry = new Map();           // id -> {id, name, n, hue, ts}
  const feed = [];                      // {ts, level, text, id?}  newest first
  let bound = new Map();                // id -> field agent number n
  let prevStates = new Map();           // n -> state string

  /* ── events ─────────────────────────────────────────────────────────────── */
  const emit = (evt, data) => (listeners.get(evt) || []).forEach(cb => cb(data));
  function push(level, text, id) {
    feed.unshift({ts: new Date(), level: LEVELS.includes(level) ? level : 'info', text, id});
    if (feed.length > 60) feed.pop();
    paintFeed();
    emit('note', feed[0]);
  }

  /* ── registry ───────────────────────────────────────────────────────────── */
  function register({id, name, n} = {}) {
    if (!id) throw new Error('PlugBrainMesh.register: {id} is required');
    const snap = mesh.snapshot();
    let nn = n;
    if (nn == null) {
      // take the first field agent that is not yet bound to an external id
      const free = snap.find(s => ![...bound.values()].includes(s.n));
      nn = free ? free.n : null;
    }
    if (nn == null) { push('warn', `register ${id}: no free field agent left`); return null; }
    bound.set(id, nn);
    const hue = (snap.find(s => s.n === nn) || {}).hue || '#8ab2d1';
    const rec = {id, name: name || id, n: nn, hue, ts: Date.now()};
    registry.set(id, rec);
    push('ok', `registered ${rec.name} → field agent A${nn}`, id);
    emit('register', rec);
    paintPanel(snap);
    return rec;
  }

  function unregister(id) {
    if (!registry.delete(id)) return false;
    const nn = bound.get(id); bound.delete(id);
    push('info', `unregistered ${id} (A${nn} returns to the pool)`, id);
    emit('unregister', {id, n: nn});
    paintPanel();
    return true;
  }

  function note(id, text, level = 'info') { push(level, text, id) }

  /* ── DOM ────────────────────────────────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'mesh-root';
  root.innerHTML = `
    <button id="mesh-toggle" type="button" title="Agent registry (m)">◈ mesh</button>
    <div id="mesh-panel" aria-hidden="true">
      <div class="mp-head">
        <h3>Agent Registry</h3><span class="mp-count"></span>
        <button class="mp-x" type="button" title="close">✕</button>
      </div>
      <div class="mp-list"></div>
      <div class="mp-foot">PlugBrainMesh · register() · note() · unregister()</div>
    </div>
    <div id="mesh-feed"></div>`;
  document.body.appendChild(root);

  const panel = root.querySelector('#mesh-panel');
  const listEl = root.querySelector('.mp-list');
  const feedEl = root.querySelector('#mesh-feed');
  const toggle = root.querySelector('#mesh-toggle');

  const setOpen = open => {
    panel.setAttribute('aria-hidden', String(!open));
    toggle.classList.toggle('on', open);
    if (open) paintPanel();
  };
  toggle.addEventListener('click', () => setOpen(panel.getAttribute('aria-hidden') === 'true'));
  root.querySelector('.mp-x').addEventListener('click', () => setOpen(false));
  window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'm' && !e.target.closest('input,button'))
      setOpen(panel.getAttribute('aria-hidden') === 'true');
  });

  /* ── registry panel ───────────────────────────────────────────────────────── */
  function paintPanel(snap = mesh.snapshot()) {
    root.querySelector('.mp-count').textContent =
      `${snap.length} on field · ${registry.size} registered`;
    listEl.innerHTML = snap.map(s => {
      const ext = [...registry.values()].find(r => r.n === s.n);
      const name = ext ? ext.name : `A${s.n}`;
      const util = Math.round(s.util * 100);
      return `<div class="mp-row" data-n="${s.n}">
        <i class="mp-hue" style="background:${s.hue}"></i>
        <span class="mp-name">${name}${ext ? ` <s>A${s.n}</s>` : ''}</span>
        <span class="mp-state ${s.state === 'OFFLINE' ? 'off' : ''}">${s.stateCn}</span>
        <span class="mp-task">${s.task || ''}</span>
        <span class="mp-bar"><i style="width:${util}%;background:${
          util > 86 ? 'var(--bad)' : util > 75 ? 'var(--warn)' : s.hue}"></i></span>
      </div>`;
    }).join('');
  }

  /* ── event feed ───────────────────────────────────────────────────────────── */
  const fmt = d => d.toTimeString().slice(0, 8);
  function paintFeed() {
    feedEl.innerHTML = feed.slice(0, 9).map((f, i) =>
      `<div class="mf-line" style="opacity:${1 - i * 0.1}">
        <s>${fmt(f.ts)}</s><i class="mf-${f.level}"></i><span>${f.text}</span>
      </div>`).join('');
  }

  /* ── watch state changes → feed (this is the "who did what" tape) ────────── */
  let watch = setInterval(() => {
    const snap = mesh.snapshot();
    for (const s of snap) {
      const prev = prevStates.get(s.n);
      if (prev && prev !== s.state) {
        const ext = [...registry.values()].find(r => r.n === s.n);
        const name = ext ? ext.name : `A${s.n}`;
        const lvl = s.state === 'DBUG' ? 'warn' : s.state === 'EXEC' ? 'ok' : 'info';
        push(lvl, `${name} · ${prev} → ${s.state}${s.task ? ' · ' + s.task : ''}`, ext?.id);
      }
      prevStates.set(s.n, s.state);
    }
    if (panel.getAttribute('aria-hidden') === 'false') paintPanel(snap);
  }, 800);

  /* ── public api ───────────────────────────────────────────────────────────── */
  const api = {
    register, unregister, note,
    list: () => [...registry.values()],
    feed: () => [...feed],
    on: (evt, cb) => {
      if (!listeners.has(evt)) listeners.set(evt, new Set());
      listeners.get(evt).add(cb);
      return () => listeners.get(evt).delete(cb);
    },
    dispose: () => { clearInterval(watch); root.remove() },
  };
  window.PlugBrainMesh = api;
  push('ok', 'agent mesh module online — simulated fleet auto-registered');
  return api;
}
