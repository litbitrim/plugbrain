/* Agent-Mesh bridge. Sits inside the engine's closure, so it sees live agent
   objects; the module outside (mesh.js) only ever talks to this surface —
   never to engine internals.

   Owns exactly three things the engine itself does not know about:
     1. per-agent hue assignment (stable via the palette ring buffer),
     2. the fading trail buffer per agent (capped at TRAIL_MAX points),
     3. a snapshotter that hands a plain-data view of the field to the panel.

   Trails are pushed at most every TRAIL_DT seconds and only while the agent
   moved — an idle agent drifting around its patch should not paint a knot. */
export function createMeshBridge({getAgents, ROLES, STATES, LINK_R}) {

  /* Same family as the reference palette used for roles, but one full ring —
     the trail has to tell agents apart, not teams. Order is deliberate:
     neighbours on the ring are maximally different in hue. */
  const HUES = [
    '#8ab2d1', '#aaf7b3', '#ffc09a', '#c6a1ce', '#efedbd',
    '#8ac1a0', '#d6dee8', '#e0a355', '#9ec4b8', '#b4aac8',
    '#9db6cc', '#c8ab9e', '#7f9db8', '#a8c8a0', '#d1a3a3', '#a3a3c8',
  ];
  const byAgent = new Map();   // agent -> {hue, rgb, trail:[{x,y,t}], last:{x,y,t}}

  let clock = 0;

  function register(a) {
    if (byAgent.has(a)) return byAgent.get(a);
    const hue = HUES[(a.n - 1) % HUES.length];
    const rec = {
      hue,
      rgb: hue.match(/[0-9a-f]{2}/gi).map(h => parseInt(h, 16)).join(','),
      trail: [],
      last: null,
    };
    byAgent.set(a, rec);
    return rec;
  }

  function forget(a) { byAgent.delete(a) }

  /* ── trails ─────────────────────────────────────────────────────────────── */
  const TRAIL_DT = 0.45;    // seconds between samples
  const TRAIL_MAX = 42;     // points per agent — at 0.45s that's ~19s of path
  const MIN_STEP = 26;      // px — don't sample while the agent barely moved

  function step(dt) {
    clock += dt;
    for (const a of getAgents()) {
      const rec = register(a);
      if (a.off) continue;
      const last = rec.last;
      const moved = !last || Math.hypot(a.x - last.x, a.y - last.y) > MIN_STEP;
      const due = !last || clock - last.t > TRAIL_DT;
      if (moved && due) {
        rec.trail.push({x: a.x, y: a.y, t: clock, busy: a.task ? 1 : 0});
        if (rec.trail.length > TRAIL_MAX) rec.trail.shift();
        rec.last = {x: a.x, y: a.y, t: clock};
      }
    }
    // prune agents that were removed from the field
    for (const a of [...byAgent.keys()]) if (!getAgents().includes(a)) forget(a);
  }

  /* ── overlay: drawn after the orbs, before labels — a trail is a shadow of
        the orb, so it must sit under the label, never over it ────────────── */
  function draw(ctx) {
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const a of getAgents()) {
      const rec = byAgent.get(a);
      if (!rec || rec.trail.length < 2) continue;
      const tr = rec.trail;
      // walk newest→oldest in segments so alpha can decay along the path;
      // one gradient per trail would bend the alpha at the wrong end on curves
      for (let i = tr.length - 1; i > 0; i--) {
        const p = tr[i], q = tr[i - 1];
        const age = (clock - p.t) / (TRAIL_MAX * TRAIL_DT);      // 0 fresh … 1 old
        const alpha = Math.max(0, (1 - age) * 0.34) * (p.busy ? 1 : 0.55);
        if (alpha < 0.015) continue;
        ctx.strokeStyle = `rgba(${rec.rgb},${alpha.toFixed(3)})`;
        ctx.lineWidth = p.busy ? 1.6 : 1.0;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* ── snapshot for the registry panel — plain data, no engine objects ────── */
  function snapshot() {
    const list = [];
    for (const a of getAgents()) {
      const rec = byAgent.get(a) || register(a);
      const role = ROLES[a.ri];
      const st = STATES[a.state];
      let links = 0;
      for (const b of getAgents()) {
        if (b === a) continue;
        if (Math.hypot(a.x - b.x, a.y - b.y) < LINK_R) links++;
      }
      list.push({
        n: a.n, hue: rec.hue,
        role: role.cn, tag: role.tag, roleColor: role.color,
        state: a.off ? 'OFFLINE' : a.state, stateCn: a.off ? 'Offline' : st.cn,
        task: a.task ? '#' + a.task.id : null,
        queue: a.queue.length,
        util: a.span > 0 ? a.busy / a.span : 0,
        trail: rec.trail.length, links,
        pos: [Math.round(a.x), Math.round(a.y)],
      });
    }
    list.sort((x, y) => x.n - y.n);
    return list;
  }

  return {step, draw, snapshot, register, forget,
    hueOf: a => (byAgent.get(a) || register(a)).hue};
}
