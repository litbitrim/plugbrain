import * as THREE from 'three';
import { toAtlasData } from './live-graph.js';

export function createAtlasModel(graph) {
const { CLUSTERS, NODES, EDGES, META } = toAtlasData(graph);
let THEME = 'dark';
for (const c of CLUSTERS) c.color = c[THEME];
const CMAP = Object.fromEntries(CLUSTERS.map(c => [c.id, c]));
const nodes = NODES.map(([id, cid, w, desc], i) => ({
  i, id, name: META[id].label, cid, w, desc, cluster: CMAP[cid],
  out: [], in: [], rel: [],
  x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
  sx: 0, sy: 0, sz: 0, vis: true, alpha: 1, scale: 1,
}));
const byName = Object.fromEntries(nodes.map(n => [n.id, n]));
for (const n of nodes) n.meta = META[n.id] || {};

const edges = [];
for (const [a, b, kind] of EDGES) {
  const s = byName[a], t = byName[b];
  if (!s || !t) { console.warn('[atlas] Dropped invalid edge:', a, '→', b); continue }
  edges.push({s, t, kind, i: edges.length, alpha: 1});
  if (kind === 'pre') { s.out.push(t); t.in.push(s) }
  else { s.rel.push(t); t.rel.push(s) }
}
const deg = n => n.out.length + n.in.length + n.rel.length;
const adj = nodes.map(() => []);
for (const e of edges) { adj[e.s.i].push(e.t.i); adj[e.t.i].push(e.s.i) }

/* ═══════════════════════════════════════════════════════════════════════
   Layout — three views sharing one set of forces, differing only in the
   "anchor". Atlas: anchored on cluster bearings. Shell: anchored in bands
   on a sphere by cluster. Tiers: anchored by topological depth.
   ═══════════════════════════════════════════════════════════════════════ */

const R = 42;
for (const c of CLUSTERS) {
  const [x, y, z] = c.anchor, l = Math.hypot(x, y, z) || 1;
  c.dir = [x / l, y / l, z / l];
}

// Topological depth: concepts with no prerequisites are tier 0, the rest take
// "longest prerequisite chain + 1". Used by the tier view.
const depth = new Array(nodes.length).fill(-1);
(function computeDepth() {
  let changed = true, guard = 0;
  for (const n of nodes) if (!n.in.length) depth[n.i] = 0;
  while (changed && guard++ < 40) {
    changed = false;
    for (const n of nodes) {
      let d = n.in.length ? -1 : 0;
      for (const p of n.in) if (depth[p.i] >= 0) d = Math.max(d, depth[p.i] + 1);
      if (d >= 0 && d !== depth[n.i]) { depth[n.i] = d; changed = true }
    }
  }
  for (let i = 0; i < depth.length; i++) if (depth[i] < 0) depth[i] = 2;
})();
const maxDepth = Math.max(1, ...depth);

const anchors = {atlas: [], shell: [], tier: []};
nodes.forEach((n, i) => {
  const d = n.cluster.dir;
  // Atlas: cluster bearing × radius, high-degree nodes pulled inward — hub
  // concepts naturally land at the center of their sky region.
  const pull = 1 - Math.min(deg(n), 12) / 26;
  anchors.atlas.push([d[0] * R * pull, d[1] * R * pull, d[2] * R * pull]);

  // Shell: every node spread over one shell, clusters occupying longitude
  // bands — for reading overall density.
  const ci = CLUSTERS.indexOf(n.cluster);
  const within = nodes.filter(m => m.cid === n.cid).indexOf(n);
  const cnt = nodes.filter(m => m.cid === n.cid).length;
  const lon = (ci / CLUSTERS.length + within / cnt / CLUSTERS.length) * Math.PI * 2;
  const lat = (within / cnt - 0.5) * 1.5;
  anchors.shell.push([
    R * 0.95 * Math.cos(lat) * Math.cos(lon),
    R * 0.95 * Math.sin(lat),
    R * 0.95 * Math.cos(lat) * Math.sin(lon),
  ]);

  // Tiers: the Y axis is topological depth, basics at the bottom and
  // applications at the top; XZ still separates the clusters.
  anchors.tier.push([
    d[0] * R * 0.72, (depth[i] / maxDepth - 0.5) * R * 1.5, d[2] * R * 0.72,
  ]);
});

let view = 'atlas';
nodes.forEach((n, i) => {
  const a = anchors.atlas[i];
  n.x = a[0] + (Math.random() - .5) * 16;
  n.y = a[1] + (Math.random() - .5) * 16;
  n.z = a[2] + (Math.random() - .5) * 16;
});

/* The balance of these three coefficients is everything about whether the
   map reads well. Too much repulsion → the graph balloons out of frame and
   clusters lose meaning; too much anchor pull → the topology flattens into
   seven discs. Tune only the KR/KA ratio; REST sets the apparent spacing
   between neighboring concepts. */
let alpha = 1;                       // force-layout "temperature"; stops once converged
const REST = 9, KS = 0.04, KR = 130, KA = 0.05;

function layout() {
  if (alpha < 0.004) return;
  const a = anchors[view];
  // O(n²) repulsion. 81 nodes = 3240 pairs — cheaper than one getComputedStyle.
  for (let i = 0; i < nodes.length; i++) {
    const p = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const q = nodes[j];
      let dx = p.x - q.x, dy = p.y - q.y, dz = p.z - q.z;
      let d2 = dx * dx + dy * dy + dz * dz + 0.6;
      const f = KR / d2;
      const d = Math.sqrt(d2);
      dx /= d; dy /= d; dz /= d;
      p.vx += dx * f; p.vy += dy * f; p.vz += dz * f;
      q.vx -= dx * f; q.vy -= dy * f; q.vz -= dz * f;
    }
  }
  for (const e of edges) {
    const p = e.s, q = e.t;
    let dx = q.x - p.x, dy = q.y - p.y, dz = q.z - p.z;
    const d = Math.hypot(dx, dy, dz) || 1;
    const f = (d - REST) * KS;
    dx /= d; dy /= d; dz /= d;
    p.vx += dx * f; p.vy += dy * f; p.vz += dz * f;
    q.vx -= dx * f; q.vy -= dy * f; q.vz -= dz * f;
  }
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i], an = a[i];
    n.vx += (an[0] - n.x) * KA; n.vy += (an[1] - n.y) * KA; n.vz += (an[2] - n.z) * KA;
    const damp = 0.82;
    n.vx *= damp; n.vy *= damp; n.vz *= damp;
    n.x += n.vx * alpha; n.y += n.vy * alpha; n.z += n.vz * alpha;
  }
  alpha *= 0.988;
}
// Run a batch up front so the first frame is already converged, instead of
// making the user watch a blob crawl apart.
for (let k = 0; k < 220; k++) layout();

/* The framing distance is derived from the converged bounding sphere, never
   hard-coded. A hard-coded number is guaranteed to be wrong after any data
   or repulsion change — wrong in the "half the graph is off-screen" way. */
const FOV = 46;
function fitDist() {
  let r = 0;
  for (const n of nodes) r = Math.max(r, Math.hypot(n.x, n.y, n.z));
  return Math.max(10, r) / Math.sin(FOV * Math.PI / 360) * 0.88;
}

/* ═══════════════════════════════════════════════════════════════════════
   3D
   ═══════════════════════════════════════════════════════════════════════ */

/* The atlas engine. 3D, per-frame label projection and the force layout all
   live outside React; React only renders the sidebar, drawer and toolbar,
   receiving list, selection and toggle state through emit.*.
   The HUD, breadcrumb and footer readouts are pure readouts, written
   directly by the engine into the shells React hands over. */
function createAtlas({els, emit}) {
  const ac = new AbortController();
  const {signal} = ac;
  const bind = (t, ev, fn, o) => t.addEventListener(ev, fn, {...o, signal});
  let raf = 0;

  const {stage} = els;
  let renderer, scene, camera, glowPts, corePts, lineSeg;
  let ok = true;
  try {
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: false, powerPreference: 'high-performance'});
  } catch (err) { ok = false }
  if (!renderer) ok = false;

  if (!ok) { emit.gate(true); return {dispose() {}} }
  {
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  stage.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050507, 0.0068);
  camera = new THREE.PerspectiveCamera(FOV, 1, 1, 1400);

  const hex = h => {const c = new THREE.Color(h); return [c.r, c.g, c.b]};

  /* ── Nodes: two layers of Points, both additively blended.
        The glow layer is large and faint (atmosphere); the core layer is
        small and bright ("this is a sphere"). ── */
  const N = nodes.length;
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const siz = new Float32Array(N), alp = new Float32Array(N), scl = new Float32Array(N);
  nodes.forEach((n, i) => {
    const c = hex(n.cluster.color);
    col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    // Diameter in world units, not pixels. The shader converts to pixels
    // with perspective, so size relations between nodes stay true while
    // zooming instead of everything ending up the same size.
    siz[i] = n.size = 0.95 + n.w * 0.40;
    alp[i] = 1; scl[i] = 1;
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alp, 1));
  geo.setAttribute('aScale', new THREE.BufferAttribute(scl, 1));

  const NODE_VERT = /* glsl */`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`;

  // uPx = h / (2·tan(fov/2)) — "how many pixels one world unit covers at
  // unit distance". Get this right and node sizes match real spheres,
  // near-large far-small with no hand tuning.
  const glowMat = new THREE.ShaderMaterial({
    uniforms: {uPx: {value: 300}, uMul: {value: 2.7}, uLight: {value: 0}},
    vertexShader: NODE_VERT,
    fragmentShader: /* glsl */`
      varying vec3 vColor; varying float vAlpha;
      uniform float uLight;
      void main(){
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        // Cubic falloff instead of gaussian: the edge dies away cleaner and
        // never smears into a square blob up close.
        float halo = pow(1.0 - d, 3.0);
        if (uLight > 0.5) {
          // On white paper this layer is not "glow" but a ring of ink bleeding
          // into the paper — it only darkens, never brightens.
          gl_FragColor = vec4(vColor * 0.62, halo * 0.16 * vAlpha);
        } else {
          gl_FragColor = vec4(vColor * halo, halo * 0.34 * vAlpha);
        }
      }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const coreMat = new THREE.ShaderMaterial({
    uniforms: {uPx: {value: 300}, uMul: {value: 1.0}, uLight: {value: 0}},
    vertexShader: NODE_VERT,
    fragmentShader: /* glsl */`
      varying vec3 vColor; varying float vAlpha;
      uniform float uLight;
      void main(){
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        if (uLight > 0.5) {
          // Solid bead: darkening the rim acts as self-shadowing and gives
          // the bead volume on white paper
          float disc = smoothstep(1.0, 0.84, d);
          float edge = smoothstep(0.40, 1.0, d);
          gl_FragColor = vec4(mix(vColor, vColor * 0.58, edge), disc * 0.95 * vAlpha);
        } else {
          float core = smoothstep(1.0, 0.28, d);
          float rim  = smoothstep(1.0, 0.82, d) * smoothstep(0.55, 0.80, d);
          vec3 c = vColor * (0.45 + 0.85 * core) + vec3(rim * 0.55);
          gl_FragColor = vec4(c, (core * 0.92 + rim * 0.75) * vAlpha);
        }
      }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });

  glowPts = new THREE.Points(geo, glowMat);
  corePts = new THREE.Points(geo, coreMat);
  glowPts.frustumCulled = false; corePts.frustumCulled = false;
  scene.add(glowPts, corePts);

  /* ── Edges: a pulse of light travels along each edge from source to
        target. Direction needs no arrowheads — arrowheads in 3D always end
        up facing away from the camera. ── */
  const E = edges.length;
  const epos = new Float32Array(E * 6), ecol = new Float32Array(E * 6);
  const et = new Float32Array(E * 2), eseed = new Float32Array(E * 2);
  const ealp = new Float32Array(E * 2), edir = new Float32Array(E * 2);
  edges.forEach((e, i) => {
    const a = hex(e.s.cluster.color), b = hex(e.t.cluster.color);
    ecol.set(a, i * 6); ecol.set(b, i * 6 + 3);
    et[i * 2] = 0; et[i * 2 + 1] = 1;
    const sd = (i * 0.6180339887) % 1;
    eseed[i * 2] = sd; eseed[i * 2 + 1] = sd;
    ealp[i * 2] = ealp[i * 2 + 1] = 1;
    edir[i * 2] = edir[i * 2 + 1] = e.kind === 'pre' ? 1 : 0;
  });
  const egeo = new THREE.BufferGeometry();
  egeo.setAttribute('position', new THREE.BufferAttribute(epos, 3));
  egeo.setAttribute('aColor', new THREE.BufferAttribute(ecol, 3));
  egeo.setAttribute('aT', new THREE.BufferAttribute(et, 1));
  egeo.setAttribute('aSeed', new THREE.BufferAttribute(eseed, 1));
  egeo.setAttribute('aAlpha', new THREE.BufferAttribute(ealp, 1));
  egeo.setAttribute('aDir', new THREE.BufferAttribute(edir, 1));

  const lineMat = new THREE.ShaderMaterial({
    uniforms: {uTime: {value: 0}, uFlow: {value: 1}, uLight: {value: 0}},
    vertexShader: /* glsl */`
      attribute vec3 aColor; attribute float aT, aSeed, aAlpha, aDir;
      varying vec3 vColor; varying float vT, vSeed, vAlpha, vDir;
      void main(){
        vColor = aColor; vT = aT; vSeed = aSeed; vAlpha = aAlpha; vDir = aDir;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      precision mediump float;
      varying vec3 vColor; varying float vT, vSeed, vAlpha, vDir;
      uniform float uTime, uFlow, uLight;
      void main(){
        // The pulse position loops over 0..1; brightness uses the shortest
        // distance on the ring, otherwise it flickers at the wrap seam.
        float head = fract(vSeed + uTime * 0.16);
        float d = abs(vT - head);
        d = min(d, 1.0 - d);
        float pulse = exp(-pow(d * 7.0, 2.0)) * vDir * uFlow;
        if (uLight > 0.5) {
          gl_FragColor = vec4(mix(vColor * 0.42, vColor, pulse), vAlpha * (0.20 + 0.55 * pulse));
        } else {
          gl_FragColor = vec4(vColor * (0.55 + 1.10 * pulse), vAlpha * (0.13 + 0.80 * pulse));
        }
      }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  lineSeg = new THREE.LineSegments(egeo, lineMat);
  lineSeg.frustumCulled = false;
  scene.add(lineSeg);

  /* ── Camera control: written by hand, one less vendor file.
        Damping is the only thing that turns the feel from "toy" into
        "instrument", so it is not optional. ── */
  const D0 = fitDist();
  const cam = {
    theta: 0.7, phi: 1.15, dist: D0,
    tTheta: 0.7, tPhi: 1.15, tDist: D0,
    tx: 0, ty: 0, tz: 0, cx: 0, cy: 0, cz: 0,
  };
  let dragging = false, lastX = 0, lastY = 0, moved = 0;
  const el = renderer.domElement;

  bind(el, 'pointerdown', e => {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    el.setPointerCapture(e.pointerId);
  });
  bind(el, 'pointerup', e => { dragging = false; el.releasePointerCapture(e.pointerId) });
  bind(el, 'pointermove', e => {
    const r = el.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.live = true;
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    moved += Math.abs(dx) + Math.abs(dy);
    lastX = e.clientX; lastY = e.clientY;
    cam.tTheta -= dx * 0.0052;
    cam.tPhi = Math.max(0.12, Math.min(Math.PI - 0.12, cam.tPhi - dy * 0.0052));
    spin = false; syncTools();
  });
  bind(el, 'pointerleave', () => { mouse.live = false });
  // Zooming in means a smaller distance, so the "＋" button maps to dolly(1/1.18).
  const zlvl = els.zlvl;
  const syncZoom = () => { zlvl.textContent = Math.round(D0 / cam.tDist * 100) + '%' };
  const dolly = f => {
    cam.tDist = Math.max(D0 * 0.22, Math.min(D0 * 2.6, cam.tDist * f));
    syncZoom();
  };
  bind(el, 'wheel', e => {
    e.preventDefault();
    dolly(1 + Math.sign(e.deltaY) * 0.11);
  }, {passive: false});
  const zoomReset = () => { cam.tDist = D0; syncZoom() };
  syncZoom();

  /* ── Picking: no Raycaster.
        Every frame already projects all nodes to screen coordinates for the
        labels; reusing those coordinates to find the nearest one is far more
        reliable than tuning a raycaster threshold for variably sized
        Points. ── */
  const mouse = {x: -1, y: -1, live: false};
  let hover = null, selected = null, pathSet = null;
  // Spin on open. A static 3D graph doesn't read as 3D at first glance — let
  // it turn, and hand control back the moment the user drags (the
  // spin = false in pointermove).
  let spin = true, showLabels = true, flow = true;
  const off = new Set();                 // clusters switched off in the legend
  const DIM = 0.12;

  const v3 = new THREE.Vector3();
  function project(w, h) {
    const px = coreMat.uniforms.uPx.value;
    for (const n of nodes) {
      v3.set(n.x, n.y, n.z);
      const dist = camera.position.distanceTo(v3);
      v3.project(camera);
      n.sx = (v3.x * 0.5 + 0.5) * w;
      n.sy = (-v3.y * 0.5 + 0.5) * h;
      n.sz = v3.z;
      // The picking radius is derived from the rendered size rather than a
      // second guessed constant — a guessed one always disagrees with the
      // eye after some resize.
      n.sr = n.size * n.scale * px / Math.max(dist, 1) * 0.5;
    }
  }

  bind(el, 'click', e => {
    if (moved > 5) return;               // the end of a drag must not count as a click
    if (!hover) { if (!e.shiftKey) clearSel(); return }
    if (e.shiftKey && selected && hover !== selected) { makePath(selected, hover); return }
    select(hover);
  });

  /* ── State: selection / neighborhood / path decide the target alpha of
        every node and edge. Real animation is left to per-frame exponential
        approach, so state changes always fade. ── */
  // Three arrays computed every frame, allocated once and kept forever —
  // allocating per frame would make the GC hiccup within a minute.
  const nT = new Float32Array(nodes.length), sT = new Float32Array(nodes.length), eT = new Float32Array(edges.length);
  let query = '';
  function targets() {
    nT.fill(1); sT.fill(1); eT.fill(1);
    const q = query;
    const hit = n => !q || n.name.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)
      || (n.meta.path || '').toLowerCase().includes(q) || (n.meta.kind || '').toLowerCase().includes(q);

    for (const n of nodes) {
      n.vis = !off.has(n.cid) && hit(n);
      if (!n.vis) { nT[n.i] = 0; sT[n.i] = 0.6 }
    }
    for (const e of edges) if (!e.s.vis || !e.t.vis) eT[e.i] = 0;

    if (pathSet) {
      for (const n of nodes) if (n.vis) { nT[n.i] = pathSet.has(n.i) ? 1 : DIM; sT[n.i] = pathSet.has(n.i) ? 1.25 : 0.8 }
      for (const e of edges) if (eT[e.i]) eT[e.i] = (pathSet.has(e.s.i) && pathSet.has(e.t.i)) ? 1.35 : DIM * 0.5;
    } else if (selected) {
      const near = new Set([selected.i, ...adj[selected.i]]);
      for (const n of nodes) if (n.vis) { nT[n.i] = near.has(n.i) ? 1 : DIM; sT[n.i] = n === selected ? 1.75 : near.has(n.i) ? 1.15 : 0.75 }
      for (const e of edges) if (eT[e.i]) eT[e.i] = (e.s === selected || e.t === selected) ? 1.4 : DIM * 0.45;
    }
    if (hover && hover.vis) { nT[hover.i] = 1; sT[hover.i] = Math.max(sT[hover.i], 1.6) }
    return {nT, sT, eT};
  }

  function select(n) {
    selected = n; pathSet = null;
    els.pathbar.classList.remove('on');
    // Bring the target into the camera's center without changing distance —
    // a sudden zoom-in makes people lose their bearings.
    cam.tx = n.x; cam.ty = n.y; cam.tz = n.z;
    cam.tDist = Math.min(cam.tDist, D0 * 0.72);
    drawDrawer(n); drawList(); syncHud();
  }
  function clearSel() {
    selected = null; pathSet = null;
    cam.tx = cam.ty = cam.tz = 0;
    els.pathbar.classList.remove('on');
    drawDrawer(null); drawList(); syncHud();
  }

  function makePath(a, b) {
    // BFS: every edge in this graph has weight 1, so Dijkstra would only
    // make the code longer.
    const prev = new Array(nodes.length).fill(-1), seen = new Set([a.i]);
    const q = [a.i];
    while (q.length) {
      const cur = q.shift();
      if (cur === b.i) break;
      for (const nx of adj[cur]) if (!seen.has(nx) && nodes[nx].vis) { seen.add(nx); prev[nx] = cur; q.push(nx) }
    }
    if (!seen.has(b.i)) { els.chain.textContent = 'Keine Kausalkette zwischen diesen Objekten'; els.pathbar.classList.add('on'); return }
    const chain = []; let cur = b.i;
    while (cur !== -1) { chain.unshift(cur); if (cur === a.i) break; cur = prev[cur] }
    pathSet = new Set(chain);
    els.chain.textContent = chain.map(i => nodes[i].name).join(' → ');
    els.pathbar.classList.add('on');
    syncHud();
  }
  function clearPath() { pathSet = null; els.pathbar.classList.remove('on'); syncHud() }

  /* ── Label pool: a fixed number of divs, reused.
        Creating nodes every frame would make the GC hiccup within forty
        seconds. ── */
  const labelHost = els.labels;
  const LABEL_BUDGET = 14;
  const pool = Array.from({length: 44}, () => {
    const d = document.createElement('div');
    d.className = 'lab'; d.style.opacity = 0;
    labelHost.appendChild(d); return d;
  });
  const topDeg = [...nodes].sort((a, b) => deg(b) - deg(a)).slice(0, LABEL_BUDGET).map(n => n.i);

  function drawLabels(w, h) {
    let k = 0;
    const want = new Set();
    if (showLabels) topDeg.forEach(i => want.add(i));
    if (selected) { want.add(selected.i); adj[selected.i].forEach(i => want.add(i)) }
    if (pathSet) pathSet.forEach(i => want.add(i));
    if (hover) want.add(hover.i);

    const list = [...want].map(i => nodes[i])
      .filter(n => n.vis && n.sz < 1 && n.sx > -60 && n.sx < w + 60 && n.sy > -20 && n.sy < h + 20)
      .sort((a, b) => a.sz - b.sz);

    const taken = [];
    for (const n of list) {
      if (k >= pool.length) break;
      // Crude but sufficient avoidance: skip when the bounding boxes
      // overlap. Labels are wide; better to draw fewer.
      const wpx = n.name.length * 11.5 + 8;
      const box = [n.sx - wpx / 2, n.sy - 18, wpx, 16];
      if (taken.some(t => box[0] < t[0] + t[2] && box[0] + box[2] > t[0] && box[1] < t[1] + t[3] && box[1] + box[3] > t[1])) continue;
      taken.push(box);
      const d = pool[k++];
      d.textContent = n.name;
      d.className = 'lab' + (n === hover || n === selected ? '' : ' sm');
      d.style.transform = `translate(-50%,-50%) translate(${n.sx.toFixed(1)}px,${(n.sy - 17).toFixed(1)}px)`;
      d.style.opacity = Math.min(1, n.alpha * 1.3);
      d.style.color = (n === hover || n === selected) ? n.cluster.color : '';
    }
    for (; k < pool.length; k++) pool[k].style.opacity = 0;
  }

  /* ── Main loop ───────────────────────────────────────────────────── */
  let last = performance.now(), fpsAcc = 0, fpsN = 0;
  const posAttr = geo.getAttribute('position'), alpAttr = geo.getAttribute('aAlpha'), sclAttr = geo.getAttribute('aScale');
  const eposAttr = egeo.getAttribute('position'), ealpAttr = egeo.getAttribute('aAlpha');

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    if (renderer.domElement.width !== Math.round(w * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      glowMat.uniforms.uPx.value = coreMat.uniforms.uPx.value =
        h / (2 * Math.tan(camera.fov * Math.PI / 360));
    }

    layout();

    if (spin) cam.tTheta += dt * 0.09;
    const k = 1 - Math.pow(0.0016, dt);      // frame-rate independent exponential approach
    cam.theta += (cam.tTheta - cam.theta) * k;
    cam.phi   += (cam.tPhi   - cam.phi)   * k;
    cam.dist  += (cam.tDist  - cam.dist)  * k;
    cam.cx += (cam.tx - cam.cx) * k; cam.cy += (cam.ty - cam.cy) * k; cam.cz += (cam.tz - cam.cz) * k;
    camera.position.set(
      cam.cx + cam.dist * Math.sin(cam.phi) * Math.cos(cam.theta),
      cam.cy + cam.dist * Math.cos(cam.phi),
      cam.cz + cam.dist * Math.sin(cam.phi) * Math.sin(cam.theta),
    );
    camera.lookAt(cam.cx, cam.cy, cam.cz);

    project(w, h);

    // Picking: nearest on screen within a threshold. Depth breaks ties in
    // favor of the node closer to the camera.
    if (mouse.live && !dragging) {
      let best = null;
      for (const n of nodes) {
        if (!n.vis || n.sz > 1) continue;
        const dx = n.sx - mouse.x, dy = n.sy - mouse.y;
        // +7px of slack: a small node judged by its own radius alone is
        // nearly unclickable.
        const r = n.sr + 7;
        if (dx * dx + dy * dy > r * r) continue;
        if (!best || n.sz < best.sz) best = n;      // on overlap prefer the nearer one
      }
      if (best !== hover) { hover = best; el.style.cursor = best ? 'pointer' : 'grab'; syncHud() }
    }

    const {nT, sT, eT} = targets();
    const ka = 1 - Math.pow(0.002, dt);
    for (const n of nodes) {
      n.alpha += (nT[n.i] - n.alpha) * ka;
      n.scale += (sT[n.i] - n.scale) * ka;
      posAttr.array[n.i * 3] = n.x; posAttr.array[n.i * 3 + 1] = n.y; posAttr.array[n.i * 3 + 2] = n.z;
      alpAttr.array[n.i] = n.alpha; sclAttr.array[n.i] = n.scale;
    }
    posAttr.needsUpdate = alpAttr.needsUpdate = sclAttr.needsUpdate = true;

    for (const e of edges) {
      e.alpha += (eT[e.i] - e.alpha) * ka;
      const o = e.i * 6;
      eposAttr.array[o] = e.s.x; eposAttr.array[o + 1] = e.s.y; eposAttr.array[o + 2] = e.s.z;
      eposAttr.array[o + 3] = e.t.x; eposAttr.array[o + 4] = e.t.y; eposAttr.array[o + 5] = e.t.z;
      ealpAttr.array[e.i * 2] = ealpAttr.array[e.i * 2 + 1] = e.alpha;
    }
    eposAttr.needsUpdate = ealpAttr.needsUpdate = true;

    lineMat.uniforms.uTime.value = now / 1000;
    lineMat.uniforms.uFlow.value += ((flow ? 1 : 0) - lineMat.uniforms.uFlow.value) * ka;

    drawLabels(w, h);
    renderer.render(scene, camera);

    fpsAcc += 1 / Math.max(dt, 1e-4); fpsN++;
    if (fpsN >= 30) { els.sFps.textContent = Math.round(fpsAcc / fpsN); fpsAcc = fpsN = 0 }
  }
  raf = requestAnimationFrame(frame);

  /* ── Controls ────────────────────────────────────────────────────── */
  function reheat(t = 0.55) { alpha = Math.max(alpha, t) }

  function setView(v) {
    view = v;
    els.hudMode.textContent =
      ({atlas: 'GALAXIE · FREIER ORBIT', shell: 'PLANET · OBERFLÄCHE', tier: 'PIPELINE · KAUSALKETTE'})[view];
    reheat(1);
  }
  const toggleFlow = () => { flow = !flow; syncTools() };
  const toggleLabel = () => { showLabels = !showLabels; syncTools() };
  const toggleSpin = () => { spin = !spin; syncTools() };
  function reset() {
    cam.tTheta = 0.7; cam.tPhi = 1.15; cam.tDist = fitDist(); clearSel(); reheat(0.8); syncZoom();
  }
  function syncTools() { emit.tools({flow, label: showLabels, spin}) }

  /* ── Theme ────────────────────────────────────────────────────────────
     Switching themes touches four places; miss one and it shows: CSS
     tokens, cluster colors, the color buffers on the GPU, and the blending
     mode. The blending mode is the easiest to forget — additive blending on
     white paper burns every node into a gray smear and looks broken. */
  function applyTheme(mode) {
    THEME = mode;
    document.documentElement.dataset.theme = mode;
    emit.theme(mode);
    const light = mode === 'light';

    for (const c of CLUSTERS) c.color = c[mode];
    nodes.forEach((n, i) => {
      const c = hex(n.cluster.color);
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    });
    geo.getAttribute('aColor').needsUpdate = true;
    edges.forEach((e, i) => {
      ecol.set(hex(e.s.cluster.color), i * 6);
      ecol.set(hex(e.t.cluster.color), i * 6 + 3);
    });
    egeo.getAttribute('aColor').needsUpdate = true;

    const blend = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    for (const m of [glowMat, coreMat, lineMat]) {
      m.uniforms.uLight.value = light ? 1 : 0;
      m.blending = blend;
      m.needsUpdate = true;
    }
    const bg = light ? 0xf4f4f1 : 0x050507;
    renderer.setClearColor(bg, 1);
    scene.fog.color.setHex(bg);
    scene.fog.density = light ? 0.0042 : 0.0068;   // fog running too far on white washes the distance into a blank sheet

    drawList();
    if (selected) drawDrawer(selected);
  }
  const toggleTheme = () => applyTheme(THEME === 'light' ? 'dark' : 'light');

  bind(window, 'keydown', e => {
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) { if (e.key === 'Escape') e.target.blur(); return }
    if (e.key === 'Escape') clearSel();
    else if (e.key === 'l' || e.key === 'L') { showLabels = !showLabels; syncTools() }
    else if (e.key === 'r' || e.key === 'R') reset();
    else if (e.key === ' ') { e.preventDefault(); spin = !spin; syncTools() }
    else if (e.key === '/') { e.preventDefault(); els.q.focus() }
    else if (e.key === '=' || e.key === '+') dolly(1 / 1.18);
    else if (e.key === '-' || e.key === '_') dolly(1.18);
  });

  function syncHud() {
    els.hudSel.textContent =
      pathSet ? `Kausalkette · ${pathSet.size} Stationen` : selected ? selected.name : hover ? hover.name : 'Nichts ausgewählt';
  }

  /* ── Sidebar and drawer ──────────────────────────────────────────── */
  function toggleCluster(id) {
    off.has(id) ? off.delete(id) : off.add(id);
    drawList(); reheat(0.4);
  }

  function drawList() {
    const q = els.q.value.trim().toLowerCase();
    const rows = nodes
      .filter(n => !off.has(n.cid) && (!q || n.name.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)))
      .sort((a, b) => deg(b) - deg(a));
    emit.list({
      q,
      rows: rows.map(n => ({i: n.i, name: n.name, color: n.cluster.color, deg: deg(n), on: n === selected})),
    });
    els.sNode.textContent = rows.length;
    const ec = edges.filter(e => rows.includes(e.s) && rows.includes(e.t)).length;
    els.sEdge.textContent = ec;
    els.sDeg.textContent = rows.length ? (ec * 2 / rows.length).toFixed(1) : '0';
  }
  const selectAt = i => select(nodes[i]);
  const hoverAt = i => { hover = i === null ? null : nodes[i] };

  function setQuery(v) {
    query = v.trim().toLowerCase();
    drawList(); reheat(0.25);
  }

  function drawDrawer(n) {
    emit.drawer(n && {
      i: n.i, name: n.name, desc: n.desc, cname: n.cluster.name, color: n.cluster.color,
      deg: deg(n), depth: depth[n.i],
      kind: n.meta.kind || '', path: n.meta.path || '', status: n.meta.status || '', prov: n.meta.prov || '',
      groups: [['Ursache · eingehend', n.in, 'IN'], ['Wirkung · ausgehend', n.out, 'OUT'], ['Assoziiert · Backlinks', n.rel, 'REL']]
        .filter(([, arr]) => arr.length)
        .map(([title, arr, tag]) => ({
          title, tag, items: arr.map(m => ({i: m.i, name: m.name, color: m.cluster.color})),
        })),
    });
  }
  /* "Center here": move this node's anchor to the origin and let everything
     else re-converge around it. */
  function centerOn(i) {
    const n = nodes[i], a = anchors[view], base = a[n.i].slice();
    for (let k = 0; k < a.length; k++) { a[k][0] -= base[0]; a[k][1] -= base[1]; a[k][2] -= base[2] }
    cam.tx = cam.ty = cam.tz = 0; reheat(1);
  }
  function startPath(i) {
    const n = nodes[i];
    els.chain.textContent = "Start bei " + n.name + " — Shift+Klick auf das Zielobjekt";
    els.pathbar.classList.add('on');
  }

  applyTheme(THEME);
  drawList(); drawDrawer(null); syncTools(); syncHud();

  return {
    setView, toggleFlow, toggleLabel, toggleSpin, reset, toggleTheme,
    dolly, zoomReset, toggleCluster, selectAt, hoverAt, setQuery,
    clearPath, centerOn, startPath,
    dispose() { ac.abort(); cancelAnimationFrame(raf); geo.dispose(); egeo.dispose(); glowMat.dispose(); coreMat.dispose(); lineMat.dispose(); renderer.dispose(); el.remove(); els.labels.replaceChildren() },
  };
  }
}

return { CLUSTERS, nodes, edges, deg, createAtlas };
}
