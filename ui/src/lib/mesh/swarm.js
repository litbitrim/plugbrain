/* Swarm simulation engine. The two canvases, the roster's per-frame mini-orbs,
   and the tally / stats / verdict readouts all write to the DOM every frame (or
   at high frequency) and manage themselves here; React renders the shell and the
   inspect card, fed via emit.*. */
import {createMeshBridge} from './meshBridge.js';

export function createSwarm({els, emit}) {
const ac = new AbortController();
const {signal} = ac;
const bind = (t, ev, fn, o) => t.addEventListener(ev, fn, {...o, signal});

const TAU = Math.PI * 2;

/* ═══════════════════════════════════════════════════════════════════════
   1. The state-animation engine

   Geometry is a pure function (size, t, opts) → one frame of dots; the painter
   only draws what it is given, and neither knows about the other. Hold that
   boundary: the same geometry is rendered at two sizes (58px on the field,
   20px in the roster), and those two sizes are two separately tuned designs,
   not a scale factor.
   ═══════════════════════════════════════════════════════════════════════ */

const lerp = (a, b, f) => a + (b - a) * f;
const frac = x => x - Math.floor(x);
const hashD = (a, b) => { const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453; return h - Math.floor(h) };
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  let fx = x - xi, fy = y - yi;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const a = hashD(xi, yi), b = hashD(xi + 1, yi), c = hashD(xi, yi + 1), d = hashD(xi + 1, yi + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function fibDir(i, n) {                       // the most evenly distributed set of directions on a sphere
  const g = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (2 * (i + 0.5)) / n, rad = Math.sqrt(1 - y * y), a = i * g;
  return [rad * Math.cos(a), y, rad * Math.sin(a)];
}
const angleDelta = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
function makeProj(yaw, tilt, cx, cy, scale) { // spin + tilt + orthographic projection
  const st = Math.sin(tilt), ct = Math.cos(tilt), sy = Math.sin(yaw), cw = Math.cos(yaw);
  return (x, y, z) => {
    const x1 = x * cw + z * sy, z1 = -x * sy + z * cw;
    return [cx + x1 * scale, cy - (y * ct - z1 * st) * scale, y * st + z1 * ct];
  };
}
const radiusScale = (size, pow) => (size / 300) ** pow;

/* A frame is a fire-and-forget instruction set: dots already sorted by z,
   radii already clamped — the painter has nothing left to interpret.
   That is what makes it portable to another renderer. */
function finalize(dots, lines, rMin) {
  const vis = [];
  for (const d of dots) { if ((d.a ?? 1) < 0.02) continue; d.r = Math.max(rMin, d.r); vis.push(d) }
  vis.sort((a, b) => a.z - b.z);
  return {dots: vis, lines: lines.filter(l => (l.a ?? 1) >= 0.02)};
}

/* ── Geometry of the nine states ────────────────────────────────────── */

// Execute: particles running on tilted orbits
function frameOrbits(size, t, o) {
  const c = size / 2, R = c * 0.82, pt = makeProj(t * 0.12, 0.3, c, c, 1);
  const rs = radiusScale(size, o.rsPow), dots = [];
  for (let orb = 0; orb < o.orbitN; orb++) {
    const h1 = hashD(orb, 1.7), h2 = hashD(orb, 5.2), h3 = hashD(orb, 8.9);
    const ro = R * (0.45 + 0.52 * h1), th = h1 * TAU, phi = Math.acos(2 * h2 - 1);
    const nx = Math.sin(phi) * Math.cos(th), ny = Math.cos(phi), nz = Math.sin(phi) * Math.sin(th);
    let ux = -ny, uy = nx; const uz = 0;
    const ul = Math.max(1e-6, Math.hypot(ux, uy)); ux /= ul; uy /= ul;
    const vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux;
    const sp = (0.25 + 0.55 * h3) * (h3 > 0.5 ? 1 : -1);
    for (let k = 0; k < o.ghostN; k++) {          // the orbit itself (dim)
      const a = (k / o.ghostN) * TAU, ca = Math.cos(a), sa = Math.sin(a);
      const [px, py, z] = pt((ux * ca + vx * sa) * ro, (uy * ca + vy * sa) * ro, (uz * ca + vz * sa) * ro);
      dots.push({x: px, y: py, z, r: o.ghostR * rs, white: 0.72, a: o.ghostA * (0.4 + 0.6 * ((z / ro + 1) / 2))});
    }
    for (let m = 0; m < o.particles; m++) {       // the working particles (bright)
      const a = t * sp + (m / o.particles) * TAU + h2 * 6, ca = Math.cos(a), sa = Math.sin(a);
      const [px, py, z] = pt((ux * ca + vx * sa) * ro, (uy * ca + vy * sa) * ro, (uz * ca + vz * sa) * ro);
      const dp = (z / ro + 1) / 2;
      dots.push({x: px, y: py, z, r: (o.partR + o.partRDepth * dp) * rs, white: 0.3 - 0.22 * dp});
    }
  }
  return finalize(dots, [], o.rMin);
}

// Retrieve: a scanning meridian sweeps across a dot-matrix globe
function frameGlobe(size, t, o) {
  const spin = 0.5, c = size / 2, R = c * 0.82;
  const pt = makeProj(t * spin, 0.4 + 0.06 * Math.sin(t * 0.35), c, c, R);
  const scan = t * (spin + (1.7 - spin) * o.scanMul), rs = radiusScale(size, o.rsPow), dots = [];
  for (let li = 0; li <= o.latRings; li++) {
    const lat = -Math.PI / 2 + (li / o.latRings) * Math.PI;
    const cl = Math.cos(lat), sl = Math.sin(lat);
    const n = Math.max(1, Math.round(Math.abs(cl) * o.lonDensity));
    for (let lj = 0; lj < n; lj++) {
      const lon = (lj / n) * TAU;
      const [px, py, z] = pt(cl * Math.cos(lon), sl, cl * Math.sin(lon));
      const dp = (z + 1) / 2;
      // the scan line reads as "dots grow", not "dots brighten" — brightening smears into a haze on a dark ground
      const d = angleDelta(lon + t * spin, scan);
      const boost = Math.exp(-(d * d) / 0.18) * Math.max(0, z);
      dots.push({x: px, y: py, z, r: (o.rBase + o.rDepth * dp + o.rBoost * boost) * rs,
        white: o.inkFar - o.inkSpan * dp, a: o.dimBase + (1 - o.dimBase) * Math.min(1, boost)});
    }
  }
  return finalize(dots, [], o.rMin);
}

// Debug: twist layer by layer, then twist all the way back (a palindrome), settle, pause, repeat
function frameRubik(size, t, o) {
  const c = size / 2, R = c * 0.82;
  const pt = makeProj(t * 0.55, 0.35 + 0.1 * Math.sin(t * 0.9), c, c, R);
  const rs = radiusScale(size, o.rsPow), N = o.moveCount, moves = [];
  for (let i = 0; i < N; i++) {
    const axis = Math.min(2, Math.floor(hashD(i, 2.3) * 3));
    const lo = -1 + 0.5 * Math.min(3, Math.floor(hashD(i, 5.9) * 4));
    moves.push({axis, lo, hi: lo + 0.5, ang: (hashD(i, 7.7) < 0.5 ? 1 : -1) * Math.PI / 2});
  }
  const slot = 0.42, rest = 1.2, cyc = 2 * N * slot + rest, tc = t % cyc;
  const amt = new Array(N).fill(0); let active = -1;
  if (tc < 2 * N * slot) {
    const s = Math.floor(tc / slot), p = (tc - s * slot) / slot;
    const ep = 1 - (1 - Math.min(1, p / 0.7)) ** 3;      // a mechanical ease-out
    if (s < N) { for (let i = 0; i < s; i++) amt[i] = 1; amt[s] = ep; active = s }
    else { const u = 2 * N - 1 - s; for (let i = 0; i < u; i++) amt[i] = 1; amt[u] = 1 - ep; active = u }
  }
  const dots = [];
  for (let li = 0; li <= o.latRings; li++) {
    const lat = -Math.PI / 2 + (li / o.latRings) * Math.PI;
    const cl = Math.cos(lat), sl = Math.sin(lat);
    const n = Math.max(1, Math.round(Math.abs(cl) * o.lonDensity));
    for (let lj = 0; lj < n; lj++) {
      const lon = (lj / n) * TAU;
      let x = cl * Math.cos(lon), y = sl, z = cl * Math.sin(lon), inAct = false;
      for (let i = 0; i < N; i++) {
        if (amt[i] <= 0) continue;
        const mv = moves[i], co = mv.axis === 0 ? x : mv.axis === 1 ? y : z;
        if (co < mv.lo || co >= mv.hi) continue;
        if (i === active) inAct = true;
        const a = mv.ang * amt[i], ca = Math.cos(a), sa = Math.sin(a);
        if (mv.axis === 0) { const y2 = y * ca - z * sa; z = y * sa + z * ca; y = y2 }
        else if (mv.axis === 1) { const x2 = x * ca + z * sa; z = -x * sa + z * ca; x = x2 }
        else { const x2 = x * ca - y * sa; y = x * sa + y * ca; x = x2 }
      }
      const [px, py, zr] = pt(x, y, z), dp = (zr + 1) / 2;
      dots.push({x: px, y: py, z: zr, r: (o.rBase + o.rDepth * dp + (inAct ? o.rActive : 0)) * rs,
        white: o.inkFar - o.inkSpan * dp - (inAct ? 0.14 : 0)});
    }
  }
  return finalize(dots, [], o.rMin);
}

// Receive: a wave rolls through the ring
function frameWave(size, t, o) {
  const c = size / 2, R = c * 0.874, pt = makeProj(t * 0.18, 0.38, c, c, 1);
  const rs = radiusScale(size, o.rsPow), dots = [];
  for (let ri = 0; ri <= o.rings; ri++) {
    const lat = -Math.PI / 2 + (ri / o.rings) * Math.PI;
    const cl = Math.cos(lat), sl = Math.sin(lat);
    // two off-beat waves, so it never quite repeats
    const w = 0.62 * Math.sin(t * 2.1 - ri * 0.52) + 0.38 * Math.sin(t * 1.27 + ri * 0.83);
    const rr = R * (0.88 + 0.105 * w), n = Math.max(1, Math.round(Math.abs(cl) * o.lonDensity));
    for (let lj = 0; lj < n; lj++) {
      const lon = (lj / n) * TAU;
      const [px, py, z] = pt(cl * Math.cos(lon) * rr, sl * rr, cl * Math.sin(lon) * rr);
      const dp = (z / R + 1) / 2, crest = Math.max(0, w);
      dots.push({x: px, y: py, z, r: (o.rBase + o.rDepth * dp) * (1 + 0.4 * crest) * rs,
        white: 0.66 - 0.56 * dp - 0.1 * crest});
    }
  }
  return finalize(dots, [], o.rMin);
}

// Coordinate: a constellation of nodes wires itself up, bright packets running along the links
function frameWeb(size, t, o) {
  const c = size / 2, R = c * 0.8, pt = makeProj(t * 0.12, 0.32, c, c, R);
  const rs = radiusScale(size, o.rsPow), N = o.nodeN, nodes = [];
  for (let i = 0; i < N; i++) {
    const d = fibDir(i, N);
    const x = d[0] + 0.6 * (vnoise(i * 0.31 + 9, t * 0.24) - 0.5);
    const y = d[1] + 0.6 * (vnoise(i * 0.53 + 27, t * 0.21) - 0.5);
    const z = d[2] + 0.6 * (vnoise(i * 0.77 + 55, t * 0.27) - 0.5);
    const l = Math.hypot(x, y, z); nodes.push([x / l, y / l, z / l]);
  }
  const lines = [], dots = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const dist = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1], nodes[i][2] - nodes[j][2]);
    if (dist >= o.thr) continue;
    const [x1, y1, z1] = pt(nodes[i][0], nodes[i][1], nodes[i][2]);
    const [x2, y2, z2] = pt(nodes[j][0], nodes[j][1], nodes[j][2]);
    lines.push({x1, y1, x2, y2, white: 0.42,
      a: (1 - dist / o.thr) * (0.3 + 0.55 * (((z1 + z2) / 2 + 1) / 2)), w: Math.max(0.6, o.lineW * rs)});
  }
  for (let i = 0; i < N; i++) {
    const [px, py, z] = pt(nodes[i][0], nodes[i][1], nodes[i][2]), dp = (z + 1) / 2;
    dots.push({x: px, y: py, z, r: (o.nodeR + o.nodeRDepth * dp) * (1 + 0.25 * Math.sin(t * 1.4 + i * 2.7)) * rs,
      white: 0.55 - 0.45 * dp});
  }
  for (let s = 0; s < o.signals; s++) {
    const seg = Math.floor(t * 0.55 + s * 7.31);
    const a = Math.floor(hashD(seg, s * 3.1 + 1.7) * N), b = Math.floor(hashD(seg, s * 5.7 + 4.2) * N);
    if (a === b) continue;
    const f = frac(t * 0.55 + s * 7.31);
    const x = lerp(nodes[a][0], nodes[b][0], f), y = lerp(nodes[a][1], nodes[b][1], f), z = lerp(nodes[a][2], nodes[b][2], f);
    const l = Math.max(1e-6, Math.hypot(x, y, z));
    const [px, py, zr] = pt(x / l, y / l, z / l), dp = (zr + 1) / 2;
    dots.push({x: px, y: py, z: zr, r: (o.nodeR * 1.5 + o.nodeRDepth * dp) * rs, white: 0.05, a: 0.5 + 0.5 * dp});
  }
  return finalize(dots, lines, o.rMin);
}

// Merge: three strands braid around the sphere, trading places through a radial breathing term — "over / around"
function frameBraid(size, t, o) {
  const c = size / 2, R = c * 0.76, pt = makeProj(t * 0.4, 0.3, c, c, 1);
  const rs = radiusScale(size, o.rsPow), dots = [];
  for (let i = 0; i < o.ghostN; i++) {
    const d = fibDir(i, o.ghostN), [px, py, z] = pt(d[0] * R, d[1] * R, d[2] * R);
    dots.push({x: px, y: py, z, r: 0.8 * rs, white: 0.78, a: 0.1 + 0.22 * ((z / R + 1) / 2)});
  }
  for (let s = 0; s < 3; s++) {
    const ph = (s / 3) * TAU;
    for (let i = 0; i < o.strandN; i++) {
      const u = (frac(i / o.strandN + t * 0.045) * 2 - 1) * 0.96;
      const surf = Math.sqrt(Math.max(0, 1 - u * u)), fade = Math.min(1, (1 - Math.abs(u)) / 0.1);
      const a = u * Math.PI * o.turns + ph;
      const weave = 1 + 0.075 * Math.sin(u * Math.PI * o.turns * 2 + ph * 2 + t * 0.8);
      const rr = surf * R * weave;
      const [px, py, zr] = pt(Math.cos(a) * rr, u * R * weave, Math.sin(a) * rr);
      const dp = (zr / R + 1) / 2;
      dots.push({x: px, y: py, z: zr, r: (o.rBase + o.rDepth * dp) * rs,
        white: 0.55 - 0.45 * dp, a: fade * (0.45 + 0.55 * dp)});
    }
  }
  return finalize(dots, [], o.rMin);
}

/* Compose (ribbon) and Idle (ring) share this block: faceOn cancels the camera
   tilt and moves the wobble from an out-of-plane offset into the radius — so it
   reads as a slowly deforming ring, not a ribbon hanging at an angle.
   Out-of-plane wobble would be cancelled by the normalization step anyway. */
function frameRibbon(size, t, o) {
  const c = size / 2, R = c * 0.78, spin = o.spin, camTilt = 0.3;
  const pt = makeProj(t * 0.1 * spin, camTilt, c, c, 1);
  const rs = radiusScale(size, o.rsPow), dots = [];
  for (let i = 0; i < o.ghostN; i++) {
    const d = fibDir(i, o.ghostN), [px, py, z] = pt(d[0] * R, d[1] * R, d[2] * R);
    dots.push({x: px, y: py, z, r: 0.8 * rs, white: 0.78, a: 0.1 + 0.22 * ((z / R + 1) / 2)});
  }
  const ya = t * 0.24 * spin, ta = o.faceOn ? -camTilt : 0.55 + 0.3 * Math.sin(t * 0.18) * spin;
  const ux = Math.cos(ya), uy = 0, uz = Math.sin(ya);
  const vx = -uz * Math.sin(ta), vy = Math.cos(ta), vz = ux * Math.sin(ta);
  const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const wobAmp = 0.23 * o.wobMul, baseR = o.faceOn ? R / (1 + 0.85 * wobAmp) : R;
  const lanes = Math.max(1, Math.round(o.lanes * o.bandMul));
  for (let w = 0; w < lanes; w++) {
    const off0 = (w - (lanes - 1) / 2) * 0.075;
    const edge = Math.abs(w - (lanes - 1) / 2) / Math.max(1, (lanes - 1) / 2);
    for (let k = 0; k < o.segs; k++) {
      const a = (k / o.segs) * TAU;
      const wob = (0.16 * Math.sin(a * 3 - t * 1.7 + w * 0.22) + 0.07 * Math.sin(a * 5 + t * 1.1)) * o.wobMul;
      const radial = o.faceOn ? 1 + wob : 1, off = o.faceOn ? off0 : off0 + wob;
      const ca = Math.cos(a), sa = Math.sin(a);
      const x = ux * ca + vx * sa + nx * off, y = uy * ca + vy * sa + ny * off, z = uz * ca + vz * sa + nz * off;
      const l = Math.hypot(x, y, z), rr = baseR * radial;
      const [px, py, zr] = pt((x / l) * rr, (y / l) * rr, (z / l) * rr);
      const dp = (zr / R + 1) / 2;
      dots.push({x: px, y: py, z: zr, r: (o.rBase + o.rDepth * dp) * (1 - 0.25 * edge) * rs,
        white: 0.52 - 0.44 * dp + 0.18 * edge, a: 0.4 + 0.6 * dp});
    }
  }
  return finalize(dots, [], o.rMin);
}

/* Plan: a dotted line cycling through circle → triangle → square. After blending
   the two paths the dots are **redistributed by arc length**, so spacing stays
   even through the whole morph — interpolating vertices directly would pile
   them up at the corners. */
const polyPath = vs => {
  const V = vs.length, L = []; let total = 0;
  for (let i = 0; i < V; i++) {
    const l = Math.hypot(vs[(i + 1) % V][0] - vs[i][0], vs[(i + 1) % V][1] - vs[i][1]);
    L.push(l); total += l;
  }
  return f => {
    let tgt = f * total, i = 0;
    while (tgt > L[i] && i < V - 1) { tgt -= L[i]; i++ }
    const a = vs[i], b = vs[(i + 1) % V], ff = L[i] ? Math.min(1, tgt / L[i]) : 0;
    return [a[0] + (b[0] - a[0]) * ff, a[1] + (b[1] - a[1]) * ff];
  };
};
const CYCLE = [
  f => { const a = -Math.PI / 2 + f * TAU; return [Math.cos(a) * 0.24, Math.sin(a) * 0.24] },
  polyPath([[0, -0.26], [0.24, 0.16], [-0.24, 0.16]]),
  // five vertices, so the path starts straight up like the other two shapes
  polyPath([[0, -0.2], [0.2, -0.2], [0.2, 0.2], [-0.2, 0.2], [-0.2, -0.2]]),
];
function frameMorph(size, t, o) {
  const HOLD = 1.4, MORPH = 0.9, SEG = HOLD + MORPH, K = CYCLE.length;
  const tc = t % (SEG * K), k = Math.floor(tc / SEG), local = tc - k * SEG;
  const x0 = local > HOLD ? (local - HOLD) / MORPH : 0, m = x0 * x0 * (3 - 2 * x0);
  const pA = CYCLE[k], pB = CYCLE[(k + 1) % K], M = 160, pts = [], L = [];
  for (let i = 0; i < M; i++) {
    const a = pA(i / M), b = pB(i / M);
    pts.push([(a[0] + (b[0] - a[0]) * m) * o.spread, (a[1] + (b[1] - a[1]) * m) * o.spread]);
  }
  let total = 0;
  for (let i = 0; i < M; i++) {
    const l = Math.hypot(pts[(i + 1) % M][0] - pts[i][0], pts[(i + 1) % M][1] - pts[i][1]);
    L.push(l); total += l;
  }
  const n = Math.max(6, Math.round(34 * o.iconD)), re = o.rDot * 1.35 * o.spread;
  const pulse = 1 + 0.02 * Math.sin(local * 3.1), c2 = size / 2, dots = [];
  let seg = 0, acc = 0;
  for (let i = 0; i < n; i++) {
    const tgt = (i / n) * total;
    while (acc + L[seg] < tgt && seg < M - 1) { acc += L[seg]; seg++ }
    const a = pts[seg], b = pts[(seg + 1) % M], f = L[seg] ? Math.min(1, (tgt - acc) / L[seg]) : 0;
    dots.push({x: c2 + (a[0] + (b[0] - a[0]) * f) * pulse * size,
      y: c2 + (a[1] + (b[1] - a[1]) * f) * pulse * size,
      z: 0, r: Math.max(0.35, re * size), white: 0.1});
  }
  return finalize(dots, [], o.rMin);
}

/* ── Density tiers + tuning for the two sizes ───────────────────────────
   2D dot grids (rings × dots per ring) scale as a pair, each by √scale, so the
   total dot count follows scale; 1D counts scale linearly. 64 and 20 are two
   separately tuned sets of numbers — don't interpolate between them. */
const BASE = {
  globe:  {latRings:17, lonDensity:44, rBase:.6, rDepth:1.7, rBoost:1, inkFar:.62, inkSpan:.54, rsPow:.6, rMin:.3},
  orbits: {orbitN:12, ghostN:40, ghostR:.9, ghostA:.5, particles:3, partR:1.2, partRDepth:1.6, rsPow:.6, rMin:.3},
  rubik:  {latRings:15, lonDensity:40, moveCount:14, rBase:.6, rDepth:1.7, rActive:.3, inkFar:.62, inkSpan:.54, rsPow:.6, rMin:.3},
  wave:   {rings:15, lonDensity:40, rBase:.6, rDepth:1.7, rsPow:.6, rMin:.3},
  web:    {nodeN:30, thr:.72, signals:5, nodeR:1.4, nodeRDepth:1.8, lineW:.8, rsPow:.6, rMin:.3},
  braid:  {strandN:52, turns:3, ghostN:150, rBase:1.2, rDepth:1.8, rsPow:.6, rMin:.3},
  ribbon: {lanes:5, segs:88, ghostN:150, rBase:1.1, rDepth:1.7, rsPow:.6, rMin:.3},
  ring:   {lanes:5, segs:88, ghostN:0, faceOn:1, rBase:1.1, rDepth:1.7, rsPow:.6, rMin:.3},
  morph:  {rDot:.021, iconD:1, rMin:.25},
};
const PRESET = {
  orbits: {64:{speed:1.885, count:1,    size:1},      20:{speed:3.9,   count:.238,  size:2.4}},
  globe:  {64:{speed:2.015, count:.42,  size:1.15, x:{scanMul:4.08, dimBase:.45}},
           20:{speed:2.665, count:.105, size:1.75, x:{scanMul:4.335, dimBase:.45}}},
  rubik:  {64:{speed:1.82,  count:.35,  size:1.05},   20:{speed:1.95,  count:.088,  size:1.9}},
  wave:   {64:{speed:4.388, count:.341, size:1},      20:{speed:3.998, count:.105,  size:1.6}},
  web:    {64:{speed:3.315, count:1.35, size:.95},    20:{speed:6.63,  count:.25,   size:1.52}},
  braid:  {64:{speed:1.625, count:.5,   size:1},      20:{speed:2.75,  count:.1125, size:1.36}},
  ribbon: {64:{speed:2.34,  count:.25,  size:.85,  x:{spin:0, bandMul:3.9, wobMul:1}},
           20:{speed:3.12,  count:.051, size:1.073, x:{spin:0, bandMul:4.94, wobMul:1}}},
  ring:   {64:{speed:3.24,  count:.25,  size:.956, x:{spin:0, bandMul:3.627, wobMul:.368}},
           20:{speed:3.78,  count:.028, size:1.622, x:{spin:0, bandMul:3.968, wobMul:.565}}},
  morph:  {64:{speed:2.405, count:.702, size:.395, x:{spread:1.45}},
           20:{speed:2.08,  count:.53,  size:1.011, x:{spread:1.45}}},
};
const PAIRS = [['latRings','lonDensity'], ['rings','lonDensity'], ['lanes','segs']];
const CKEYS = ['orbitN','ghostN','nodeN','strandN','signals'];
const RKEYS = ['rBase','rDepth','rActive','rDot','ghostR','partR','partRDepth','nodeR','nodeRDepth'];
const FRAMES = {orbits:frameOrbits, globe:frameGlobe, rubik:frameRubik, wave:frameWave,
  web:frameWeb, braid:frameBraid, ribbon:frameRibbon, ring:frameRibbon, morph:frameMorph};

const rcache = new Map();
function resolve(mode, size) {
  const key = mode + size, hit = rcache.get(key); if (hit) return hit;
  const p = PRESET[mode][size], o = {...BASE[mode]}, rt = Math.sqrt(p.count), done = new Set();
  for (const [a, b] of PAIRS) if (o[a] != null && o[b] != null && !done.has(a) && !done.has(b)) {
    o[a] = Math.max(2, Math.round(o[a] * rt)); o[b] = Math.max(2, Math.round(o[b] * rt));
    done.add(a); done.add(b);
  }
  // 0 means this mode deliberately skips the layer (ring has no ghost sphere); scaling must not resurrect it as a lone dot
  for (const k of CKEYS) if (o[k] != null && o[k] !== 0 && !done.has(k)) o[k] = Math.max(1, Math.round(o[k] * p.count));
  if (o.iconD != null) o.iconD = Math.max(0.02, o.iconD * p.count);
  for (const k of RKEYS) if (o[k] != null) o[k] = o[k] * p.size;
  const r = {fn: FRAMES[mode], speed: p.speed,
    opts: Object.assign({spin:1, faceOn:0, bandMul:1, wobMul:1, spread:1, scanMul:1, dimBase:1}, o, p.x || {})};
  rcache.set(key, r); return r;
}

/* painter: on a dark background the ink value is inverted — nearer dots read as
   brighter. The selected orb gets a slight warm tint; everything else stays
   strictly monochrome. */
function paintOrb(ctx, mode, size, t, tint, dim) {
  const r = resolve(mode, size), fr = r.fn(size, t * r.speed, r.opts);
  const [tr, tg, tb] = tint;
  for (const l of fr.lines) {
    const g = 1 - Math.min(1, Math.max(0, l.white));
    ctx.strokeStyle = `rgba(${(g * tr) | 0},${(g * tg) | 0},${(g * tb) | 0},${(l.a ?? 1) * dim})`;
    ctx.lineWidth = l.w;
    ctx.beginPath(); ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2); ctx.stroke();
  }
  for (const d of fr.dots) {
    const g = 1 - Math.min(1, Math.max(0, d.white));
    ctx.fillStyle = `rgba(${(g * tr) | 0},${(g * tg) | 0},${(g * tb) | 0},${(d.a ?? 1) * dim})`;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, TAU); ctx.fill();
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   2. What this production line is
   ═══════════════════════════════════════════════════════════════════════ */

/* State → which animation. Nine states, exactly nine animations, one-to-one,
   none shared: the difference between states must be legible at a glance, and
   sharing an animation would merge two states into one. */
const STATES = {
  IDLE: {mode:'ring',   cn:'Idle'},
  RECV: {mode:'wave',   cn:'Receive'},
  PLAN: {mode:'morph',  cn:'Plan'},
  SCAN: {mode:'globe',  cn:'Retrieve'},
  EXEC: {mode:'orbits', cn:'Execute'},
  DBUG: {mode:'rubik',  cn:'Debug'},
  SYNC: {mode:'web',    cn:'Coordinate'},
  MERG: {mode:'braid',  cn:'Merge'},
  WRIT: {mode:'ribbon', cn:'Compose'},
};

/* A role is one stage of the production line, in array order.
   prog is the stage's **state program**: which states one job passes through,
   in order, and for how long (seconds).
   rework is the probability of bouncing the task back to the previous stage —
   that is where an agent system's real cost lives, not in how fast one call is. */
const ROLES = [
  {id:'plan', cn:'Planning', tag:'PLAN', color:'#d6dee8', prog:[['PLAN',0.8],['SYNC',0.5]], rework:0},
  {id:'find', cn:'Research', tag:'FIND', color:'#9db6cc', prog:[['SCAN',1.6],['WRIT',0.8]], rework:0},
  {id:'code', cn:'Coding', tag:'CODE', color:'#9ec4b8', prog:[['EXEC',2.9],['DBUG',1.4]], rework:0.10},
  {id:'crit', cn:'Review', tag:'CRIT', color:'#b4aac8', prog:[['SCAN',0.8],['MERG',1.2]], rework:0.18},
  {id:'ship', cn:'Delivery', tag:'SHIP', color:'#c8ab9e', prog:[['MERG',0.7],['WRIT',0.7]], rework:0},
];
/* These five sets of numbers are tuned, with one goal: the default screen should
   have **one** clearly busiest stage, not five stages all at seventy percent —
   if all five look the same, "where do I add people?" has no answer and this
   page is wasted. With RECV at 0.34s plus each state's duration, per-agent
   capacity (tasks/min) comes out at Planning 36.6 / Research 21.9 / Coding 12.9 /
   Review 25.6 / Delivery 34.5; times the opening headcount 1/2/3/1/1, plus
   rework flowing back, at 20 tasks/min the busiest stage is Review.
   Push the arrival rate past 24 and it crosses the 86% line, and the verdict
   in the corner changes its tune. */
const START = {plan:1, find:2, code:3, crit:1, ship:1};   // opening headcount: 8 agents

const WIPCAP = 16;      // WIP cap (pull-based release). Without it, work piles up without bound the moment arrivals outrun capacity
const PKT_SPD = 210;    // message flight speed (px/s) — communication is not free, and this page draws it
const CMD_R = 128;      // command-ring radius
const ORB = 64;         // orb diameter on the field. Must be exactly 64 — dot spacing and depth are tuned for this size
const HOLD_MS = 620;    // how long a long-press counts as an "interrupt"
const LINK_R = 178;     // how close two agents get before a dashed link appears
const MAXN = 16;        // max agents on the field (the base-field shader's uA array is exactly this long)

let agents = [], loose = [], packets = [], shocks = [], done = [];
let clock = 0, seq = 0, aseq = 0, lam = 20, speed = 1, sel = null, nextIn = 0, delivered = 0;
const mouse = {x: -9999, y: -9999, in: false};

// fixed seed: the same actions replay the same sequence, so changing one parameter gives a fair comparison
let seed = 20260418;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

const {field, glow} = els;
const fctx = field.getContext('2d');
let W = innerWidth, H = innerHeight;

/* Each role's home patch: one column per role, left to right in the direction
   of flow. Room on the left for the roster, on the right for the inspect card.

   The right margin moves: when the inspect card opens it would cover the
   rightmost column — and what it covers is precisely "who is in what state",
   the page's only readout. So when the card opens, the columns press left.
   The press is eased (rightPad interpolates toward its target every frame),
   and the agents are already drifting toward their home patches, so the whole
   thing reads as the columns stepping aside, not as the picture jumping. */
let rightPad = 46;
function homeOf(ri) {
  // on narrow screens the roster is hidden but the HUD is still there — the left edge must clear it, or the first column's header lands on the HUD
  const L = W > 1080 ? 268 : 240, R = W - rightPad, n = ROLES.length;
  return {x: L + (ri + 0.5) / n * (R - L), y: H * 0.5 - 16,
    rx: Math.max(40, (R - L) / n * 0.33), ry: Math.max(60, H * 0.28)};
}
const pickWp = a => {
  const h = homeOf(a.ri);
  return {x: h.x + (rnd() - .5) * h.rx * 2, y: h.y + (rnd() - .5) * h.ry * 2};
};

function makeAgent(ri) {
  const h = homeOf(ri);
  const a = {n: ++aseq, ri, x: h.x + (rnd() - .5) * h.rx * 2, y: h.y + (rnd() - .5) * h.ry * 2,
    head: rnd() * TAU, wp: null, phase: rnd() * 40,
    state: 'IDLE', task: null, step: 0, left: 0, queue: [], off: false,
    busy: 0, span: 0, pulse: 0, hist: new Array(28).fill(0), histT: 0};
  a.wp = pickWp(a); return a;
}
/* ── PlugBrain live fleet ─────────────────────────────────────────────────
   When the runtime hands over a real PlugBoard roster the simulated arrival
   stream is switched off and every orb's identity, stage and state come from
   the ledger. With no roster the page keeps running its own simulation, so
   the view is never blank — `live` records which of the two is on screen and
   the caller shows that plainly rather than passing a simulation off as real
   fleet state. */
let live = false;
const liveByKey = new Map();               // ledger task id -> the orb showing it

/** PlugBoard task status -> one of the nine rendered states. */
const STATE_BY_STATUS = {
  PLANNED: 'IDLE', RUNNING: 'EXEC', BLOCKED: 'DBUG', REVIEW: 'SCAN',
  REPAIR: 'DBUG', VERIFIED: 'MERG', MERGED: 'MERG', DONE: 'WRIT',
};
/** PlugBoard task status -> the production-line stage that owns it. */
const ROLE_BY_STATUS = {
  PLANNED: 'plan', RUNNING: 'code', BLOCKED: 'code', REVIEW: 'crit',
  REPAIR: 'code', VERIFIED: 'crit', MERGED: 'ship', DONE: 'ship',
};

function reset() {
  agents = []; loose = []; packets = []; shocks = []; done = [];
  clock = 0; seq = 0; aseq = 0; delivered = 0;
  ROLES.forEach((r, ri) => { for (let k = 0; k < START[r.id]; k++) agents.push(makeAgent(ri)) });
  /* Pre-run 90 seconds before first paint. A cold-started line has nothing: for
     the first twenty seconds there is not a single work item on screen,
     throughput is 0, and the verdict can only say "warming up". The page should
     open on a line that is already running.
     90 rather than 40 because throughput is a rolling 60-second window —
     with only 40 pre-run seconds, half the window is the cold-start stretch
     with zero output, and the reading comes out half low. */
  for (let i = 0; i < 90 * 30; i++) sim(1 / 30);
}

/* ── Dispatch ─────────────────────────────────────────────────────────
   Which downstream agent: pick an idle one first; if none are idle, pick the
   shortest queue. A trivial policy, but it must be **a definite policy** —
   otherwise "the bottleneck is X" in the corner means nothing: a reading has
   to be attributable to a rule. */
function dispatch(ri) {
  const pool = agents.filter(a => a.ri === ri && !a.off);
  if (!pool.length) return null;
  const idle = pool.filter(a => a.state === 'IDLE' && !a.task && !a.queue.length);
  if (idle.length) return idle[Math.floor(rnd() * idle.length)];
  return pool.reduce((m, a) => (a.queue.length < m.queue.length ? a : m));
}
function handIn(t, ri) {                       // hand into this stage; if nobody can take it, park it off-field for now
  const to = dispatch(ri);
  if (to) { to.queue.push(t); to.pulse = 1; return true }
  loose.push({t, ri}); return false;
}
function send(from, t, toRi) {
  const to = dispatch(toRi);
  if (!to) { loose.push({t, ri: toRi}); return }
  packets.push({from, to, task: t, f: 0, back: toRi < from.ri});
}

function beginStep(a) {
  const [st, dur] = ROLES[a.ri].prog[a.step];
  a.state = st;
  a.left = dur * (0.75 + rnd() * 0.5);         // a single call never takes a constant time
}

/* Utilization is an exponentially weighted average over the **last thirty
   seconds**, not a cumulative value since boot. A cumulative value is wrong on
   this page: after you add an agent, that stage's cumulative utilization takes
   minutes to come down, and what you want to see is exactly "did that just help". */
const U_TAU = 30;
function stepAgent(a, dt) {
  if (a.off) { a.state = 'IDLE'; return }
  const decay = Math.exp(-dt / U_TAU);
  a.span = a.span * decay + dt; if (a.task) a.busy = a.busy * decay + dt; else a.busy *= decay;
  if (!a.task) {                               // empty-handed: take the next task from its own queue
    if (!a.queue.length) { a.state = 'IDLE'; return }
    a.task = a.queue.shift(); a.state = 'RECV'; a.left = 0.34; a.step = -1;
  }
  a.left -= dt;
  if (a.left > 0) return;
  if (a.step < 0) { a.step = 0; beginStep(a); return }        // RECV done → first state
  a.step++;
  if (a.step < ROLES[a.ri].prog.length) { beginStep(a); return }

  const role = ROLES[a.ri], t = a.task;        // this stage is done
  a.task = null; a.step = 0; a.state = 'IDLE'; t.hops++;
  if (a.ri > 0 && rnd() < role.rework) { t.rework++; send(a, t, a.ri - 1); return }
  // done keeps only the last 80 tasks (throughput / lead time are rolling windows); cumulative deliveries are counted separately —
  // using the array length as "delivered" would freeze at 80 forever
  if (a.ri === ROLES.length - 1) {
    t.doneAt = clock; delivered++; done.push(t); if (done.length > 80) done.shift(); return;
  }
  send(a, t, a.ri + 1);
}

/* ── Motion ─────────────────────────────────────────────────────────────
   Not boids. The agents each do their own work; the point is not flocking —
   it is "the busy one is nearly pinned in place, the idle one drifts around
   its patch". So there are only three forces: waypoint, command ring, home pull.
   Turning is rate-limited (at most TURN radians per frame). Remove that and
   they snap around instantly, degrading from "machines" to "particles being
   sucked toward a target". */
const TURN = 0.055;
const SEP = ORB * 1.42;
function move(a, dt) {
  const busy = !!a.task;
  if (!a.wp || Math.hypot(a.wp.x - a.x, a.wp.y - a.y) < 16) a.wp = pickWp(a);
  let tx = a.wp.x, ty = a.wp.y;
  if (mouse.in) {                              // command ring: nearby agents are called over
    const d = Math.hypot(mouse.x - a.x, mouse.y - a.y);
    if (d < CMD_R) { const k = 1 - d / CMD_R; tx = lerp(tx, mouse.x, k * 0.85); ty = lerp(ty, mouse.y, k * 0.85) }
  }
  a.head += Math.max(-TURN, Math.min(TURN, angleDelta(Math.atan2(ty - a.y, tx - a.x), a.head)));
  const sp = (busy ? 7 : 30) * dt;             // once busy, an agent is nearly pinned in place
  a.x += Math.cos(a.head) * sp; a.y += Math.sin(a.head) * sp;
  /* Separation. The only "swarm" rule, and it is not for looks: once two orbs
     overlap, their labels overlap too, and the page's only readout — "who is
     in what state" — breaks instantly.
     Applied straight to position, not through steering — with steering, the
     busy one (nearly motionless) could never be pushed apart. */
  for (const b of agents) {
    if (b === a) continue;
    const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
    if (d2 > SEP * SEP) continue;
    const d = Math.max(1e-3, Math.sqrt(d2)), k = (1 - d / SEP) * 34 * dt;
    /* Push harder vertically than horizontally: the column is tall and narrow,
       so a sideways push hits the column's soft wall at once and gets nowhere,
       leaving the two orbs stuck together. Exactly side by side (dy≈0), pick
       a direction by id — otherwise neither moves. */
    const ny = Math.abs(dy) < 1 ? (a.n < b.n ? -SEP : SEP) : dy;
    const nl = Math.max(1e-3, Math.hypot(dx, ny));
    a.x += (dx / nl) * k * 0.5; a.y += (ny / nl) * k * 1.5;
  }
  const h = homeOf(a.ri);                      // home pull: a soft wall, not a hard clamp
  a.x = lerp(a.x, Math.max(h.x - h.rx * 1.5, Math.min(h.x + h.rx * 1.5, a.x)), 0.08);
  a.y = lerp(a.y, Math.max(h.y - h.ry * 1.2, Math.min(h.y + h.ry * 1.2, a.y)), 0.08);
  if (a.pulse > 0) a.pulse -= dt * 1.6;
  a.histT += dt;
  if (a.histT > 1) { a.histT = 0; a.hist.push(busy ? 1 : 0); a.hist.shift() }
}

function wip() {
  return loose.length + packets.length + agents.reduce((s, a) => s + a.queue.length + (a.task ? 1 : 0), 0);
}

function sim(dt) {
  clock += dt;
  /* Inter-arrival times are exponential, not uniform. Uniform arrivals never
     form a queue, and the queue is exactly the reading this page exists to give. */
  if (!live) {
    nextIn -= dt;
    if (nextIn <= 0) {
      nextIn = -Math.log(1 - rnd()) * (60 / lam);
      if (wip() < WIPCAP) handIn({id: ++seq, at: clock, hops: 0, rework: 0}, 0);
    }
  }
  for (let i = loose.length - 1; i >= 0; i--) {          // parked off-field: put them back in once someone is available
    const to = dispatch(loose[i].ri);
    if (to) { to.queue.push(loose[i].t); to.pulse = 1; loose.splice(i, 1) }
  }
  for (const a of agents) { if (!live) stepAgent(a, dt); move(a, dt) }
  for (let i = packets.length - 1; i >= 0; i--) {
    const p = packets[i];
    // distance is recomputed every frame: both ends are moving, and using the departure distance would arrive early or late
    const d = Math.max(1, Math.hypot(p.to.x - p.from.x, p.to.y - p.from.y));
    p.f += (PKT_SPD * dt) / d;
    if (p.f >= 1) {
      if (agents.includes(p.to) && !p.to.off) { p.to.queue.push(p.task); p.to.pulse = 1 }
      else loose.push({t: p.task, ri: p.to.ri});         // the recipient was removed mid-flight
      packets.splice(i, 1);
    }
  }
  for (let i = shocks.length - 1; i >= 0; i--) { shocks[i].t += dt * 1.6; if (shocks[i].t > 1) shocks.splice(i, 1) }
}

/* ═══════════════════════════════════════════════════════════════════════
   3. Rendering
   ═══════════════════════════════════════════════════════════════════════ */

const INK = [223, 227, 232], SEL = [207, 217, 228];   // the selected orb gets a touch of cool silver; everything else strictly monochrome
const MONO = "ui-monospace, 'Geist Mono Variable', SFMono-Regular, Menlo, monospace";
const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)).join(',');
for (const r of ROLES) r.rgb = hex2rgb(r.color);

function draw(t) {
  fctx.clearRect(0, 0, W, H);

  /* One column per role, left to right in the direction of flow. This page
     expresses a production line, so it needs columns — otherwise dots flying
     around carry no sense of direction. The column spine is dimmed to near
     invisible: it only needs to be findable once you are looking for it. */
  fctx.textAlign = 'center';
  for (let ri = 0; ri < ROLES.length; ri++) {
    const r = ROLES[ri], h = homeOf(ri);
    const n = agents.filter(a => a.ri === ri && !a.off).length;
    const q = agents.filter(a => a.ri === ri).reduce((s, a) => s + a.queue.length, 0);
    fctx.strokeStyle = `rgba(${r.rgb},0.055)`; fctx.lineWidth = 1;
    fctx.beginPath(); fctx.moveTo(h.x, 74); fctx.lineTo(h.x, H - 66); fctx.stroke();
    fctx.strokeStyle = `rgba(${r.rgb},0.16)`;
    fctx.beginPath(); fctx.moveTo(h.x - h.rx * .8, 62); fctx.lineTo(h.x + h.rx * .8, 62); fctx.stroke();
    fctx.font = `10px ${MONO}`;
    fctx.fillStyle = `rgba(${r.rgb},${n ? 0.78 : 0.34})`;
    fctx.fillText(`${ri + 1}. ${r.cn} ${r.tag}`, h.x, 40);
    fctx.font = `9px ${MONO}`;
    fctx.fillStyle = 'rgba(150,160,172,0.5)';
    fctx.fillText(n ? `${n} agents · queue ${q}` : 'No agents', h.x, 53);
  }
  fctx.textAlign = 'left';

  /* Proximity dashes. Not decoration: two agents in the same stage sitting
     close means they are sharing one load; a link across stages means that leg
     is genuinely short and messages cost almost no time. */
  fctx.lineWidth = 0.7; fctx.setLineDash([3, 5]);
  for (let i = 0; i < agents.length; i++) for (let j = i + 1; j < agents.length; j++) {
    const a = agents[i], b = agents[j], d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d > LINK_R) continue;
    fctx.strokeStyle = `rgba(190,200,212,${(0.42 * (1 - d / LINK_R)).toFixed(3)})`;
    fctx.beginPath(); fctx.moveTo(a.x, a.y); fctx.lineTo(b.x, b.y); fctx.stroke();
  }
  fctx.setLineDash([]);

  // messages in transit: a faint track plus a bright head dragging a tail. Ones bounced back upstream go red
  for (const p of packets) {
    const x = lerp(p.from.x, p.to.x, p.f), y = lerp(p.from.y, p.to.y, p.f);
    const c = p.back ? '224,104,95' : '186,203,220';   // the rework red is semantic — keep it
    fctx.strokeStyle = `rgba(${c},0.18)`; fctx.lineWidth = 0.9;
    fctx.beginPath(); fctx.moveTo(p.from.x, p.from.y); fctx.lineTo(p.to.x, p.to.y); fctx.stroke();
    const tl = Math.max(0, p.f - 0.14);
    const sx = lerp(p.from.x, p.to.x, tl), sy = lerp(p.from.y, p.to.y, tl);
    const g = fctx.createLinearGradient(sx, sy, x, y);
    g.addColorStop(0, `rgba(${c},0)`); g.addColorStop(1, `rgba(${c},0.85)`);
    fctx.strokeStyle = g; fctx.lineWidth = 1.6;
    fctx.beginPath(); fctx.moveTo(sx, sy); fctx.lineTo(x, y); fctx.stroke();
    fctx.fillStyle = `rgba(${c},0.95)`;
    fctx.beginPath(); fctx.arc(x, y, 2.3, 0, TAU); fctx.fill();
  }

  fctx.font = `9.5px ${MONO}`;
  fctx.textBaseline = 'middle';
  for (const a of agents) {
    const role = ROLES[a.ri], on = sel === a;
    const hov = mouse.in && Math.hypot(mouse.x - a.x, mouse.y - a.y) < ORB * 0.62;

    // heading tick + waypoint: one says "which way it faces", the other "where it is going"
    if (!a.off) {
      fctx.strokeStyle = 'rgba(150,160,172,0.42)'; fctx.lineWidth = 0.8;
      fctx.beginPath();
      fctx.moveTo(a.x - Math.cos(a.head) * ORB * .40, a.y - Math.sin(a.head) * ORB * .40);
      fctx.lineTo(a.x - Math.cos(a.head) * ORB * .74, a.y - Math.sin(a.head) * ORB * .74);
      fctx.stroke();
      if (a.wp && !a.task) {
        fctx.fillStyle = 'rgba(150,160,172,0.45)';
        fctx.beginPath(); fctx.arc(a.wp.x, a.wp.y, 1.6, 0, TAU); fctx.fill();
      }
    }

    // the orb itself: the way it moves is its state
    fctx.save(); fctx.translate(a.x - ORB / 2, a.y - ORB / 2);
    paintOrb(fctx, STATES[a.state].mode, ORB, t + a.phase, on ? SEL : INK, a.off ? 0.16 : 1);
    fctx.restore();

    if (a.pulse > 0) {                          // flashes a ring when a message arrives
      const k = a.pulse;
      fctx.strokeStyle = `rgba(200,214,228,${(k * 0.7).toFixed(3)})`; fctx.lineWidth = 1;
      fctx.beginPath(); fctx.arc(a.x, a.y, ORB * 0.42 + (1 - k) * 22, 0, TAU); fctx.stroke();
    }
    if (on || hov) {
      fctx.strokeStyle = on ? 'rgba(207,217,228,0.75)' : 'rgba(190,200,212,0.30)';
      fctx.lineWidth = 1; fctx.setLineDash([2, 4]);
      fctx.beginPath(); fctx.arc(a.x, a.y, ORB * 0.60, 0, TAU); fctx.stroke();
      fctx.setLineDash([]);
    }

    // label: role color for id + job, grey for the current state
    const head = `A${a.n} ${role.tag}`, tail = a.off ? ' OFFLINE' : ' ' + a.state;
    const hw = fctx.measureText(head).width, tw = fctx.measureText(tail).width;
    // in the column against the right edge the label flips to the orb's left, or the canvas clips it
    const flip = a.x + ORB * 0.42 + hw + tw > W - 12;
    const lx = flip ? a.x - ORB * 0.42 - hw - tw : a.x + ORB * 0.42, ly = a.y - ORB * 0.30;
    fctx.fillStyle = a.off ? 'rgba(120,128,138,.55)' : role.color;
    fctx.fillText(head, lx, ly);
    fctx.fillStyle = a.off ? 'rgba(100,108,118,.5)' : 'rgba(190,200,212,0.62)';
    fctx.fillText(tail, lx + hw, ly);
    if (a.queue.length) {
      fctx.fillStyle = 'rgba(207,217,228,0.92)';
      fctx.fillText(`+${a.queue.length}`, lx, ly + 12);
    }
  }

  if (mouse.in) {                               // command ring
    fctx.strokeStyle = 'rgba(190,200,212,0.13)'; fctx.lineWidth = 0.5;
    fctx.setLineDash([6, 8]);
    fctx.beginPath(); fctx.arc(mouse.x, mouse.y, CMD_R, 0, TAU); fctx.stroke();
    fctx.setLineDash([]);
  }
  for (const s of shocks) {
    fctx.strokeStyle = `rgba(224,104,95,${((1 - s.t) * 0.75).toFixed(3)})`;
    fctx.lineWidth = 2 * (1 - s.t);
    fctx.beginPath(); fctx.arc(s.x, s.y, 12 + s.t * 150, 0, TAU); fctx.stroke();
  }
}

/* ── Base field: a WebGL layer. Where it glows is where the work is — this layer is not mere decoration either ── */
const gl = glow.getContext('webgl', {alpha: false, antialias: false});
let pushGlow = () => {};
if (gl) {
  /* The base field is brushed metal: noise stretched 40× horizontally, two
     layers drifting at offset frequencies, contrast pressed almost invisible.
     It carries no data — it only gives the backdrop a material instead of a
     flat fill. The only data-bearing element is the uA glow — bright spots are
     busy spots. */
  const FS = `precision mediump float;
    uniform vec2 uRes; uniform float uTime, uN; uniform vec3 uA[${MAXN}];
    float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
    float vn(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1,0)), f.x),
                 mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y);
    }
    void main(){
      vec2 p = gl_FragCoord.xy, uv = p / uRes;
      float g = 0.0;
      for (int i = 0; i < ${MAXN}; i++) {
        if (float(i) >= uN) break;
        vec2 d = (p - uA[i].xy) / uRes.y;
        g += uA[i].z * exp(-dot(d, d) * 30.0);
      }
      // brushed: anisotropy is the whole trick — isotropic noise always reads as cloud, never metal
      float sheen = vn(vec2(uv.x * 3.0 + uTime * 0.010, uv.y * 44.0)) * 0.62
                  + vn(vec2(uv.x * 7.0 - uTime * 0.006, uv.y * 96.0)) * 0.38;
      vec3 col = mix(vec3(0.062, 0.067, 0.076), vec3(0.030, 0.032, 0.038), uv.y);
      col += vec3(0.052, 0.057, 0.066) * (sheen - 0.5);
      col += vec3(0.66, 0.74, 0.86) * g * 0.125;
      col *= 1.0 - 0.44 * smoothstep(0.36, 1.0, length(uv - 0.5) * 1.30);
      gl_FragColor = vec4(col, 1.0);
    }`;
  const sh = (ty, s) => { const o = gl.createShader(ty); gl.shaderSource(o, s); gl.compileShader(o); return o };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(pr); gl.useProgram(pr);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const lo = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(lo); gl.vertexAttribPointer(lo, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(pr, n);
  const uRes = U('uRes'), uTime = U('uTime'), uN = U('uN'), uA = U('uA[0]');
  const arr = new Float32Array(MAXN * 3);
  pushGlow = (t, dpr) => {
    const n = Math.min(MAXN, agents.length);
    for (let i = 0; i < n; i++) {
      const a = agents[i];
      // gl_FragCoord's y runs bottom-up; CSS's y runs top-down
      arr[i * 3] = a.x * dpr; arr[i * 3 + 1] = (H - a.y) * dpr;
      arr[i * 3 + 2] = a.off ? 0.05 : (a.task ? 1 : 0.22);
    }
    gl.uniform2f(uRes, glow.width, glow.height);
    gl.uniform1f(uTime, t); gl.uniform1f(uN, n); gl.uniform3fv(uA, arr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   4. Panels
   ═══════════════════════════════════════════════════════════════════════ */

const rosterEl = els.roster;
function buildRoster() {
  const dpr = Math.min(devicePixelRatio, 2);
  rosterEl.innerHTML = ROLES.map((r, ri) => {
    const list = agents.filter(a => a.ri === ri);
    return `<div class="grp"><h2><i style="background:${r.color}"></i>${r.cn} ${r.tag}<span class="sp"></span>
      <button data-sub="${ri}" type="button"${list.length ? '' : ' disabled'}>−</button>
      <button data-add="${ri}" type="button"${agents.length >= MAXN ? ' disabled' : ''}>+</button></h2>
      ${list.map(a => `<div class="ag" data-n="${a.n}"><canvas></canvas>
        <span class="nm">${a.label || ('A' + a.n)}</span><span class="st"></span>
        <span class="q"></span><span class="bar"><i></i></span></div>`).join('')}
    </div>`;
  }).join('');
  for (const c of rosterEl.querySelectorAll('canvas')) {
    c.width = 20 * dpr; c.height = 20 * dpr;
    c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}
bind(rosterEl, 'click', e => {
  const add = e.target.closest('[data-add]'), sub = e.target.closest('[data-sub]');
  if (add) {
    if (agents.length < MAXN) { agents.push(makeAgent(+add.dataset.add)); buildRoster() }
    return;
  }
  if (sub) {
    const ri = +sub.dataset.sub, list = agents.filter(a => a.ri === ri);
    if (!list.length) return;
    const gone = list[list.length - 1];
    agents = agents.filter(a => a !== gone);
    if (sel === gone) { sel = null; showCard() }
    // removing an agent must not make the work in their hands vanish with them
    for (const t of [...(gone.task ? [gone.task] : []), ...gone.queue]) handIn(t, ri);
    buildRoster(); return;
  }
  const row = e.target.closest('[data-n]');
  if (row) { sel = agents.find(a => a.n === +row.dataset.n) || null; showCard(); buildRoster() }
});

function paintRoster(t) {
  for (const row of rosterEl.querySelectorAll('.ag')) {
    const a = agents.find(x => x.n === +row.dataset.n); if (!a) continue;
    const ctx = row.querySelector('canvas').getContext('2d');
    ctx.clearRect(0, 0, 20, 20);
    paintOrb(ctx, STATES[a.state].mode, 20, t + a.phase, sel === a ? SEL : INK, a.off ? 0.2 : 1);
    row.querySelector('.st').textContent = a.off ? 'OFFLINE' : `${a.state} ${STATES[a.state].cn}`;
    row.querySelector('.q').textContent = a.queue.length ? `+${a.queue.length}` : '';
    const u = a.span > 0 ? a.busy / a.span : 0, bar = row.querySelector('.bar i');
    bar.style.width = (u * 100).toFixed(0) + '%';
    bar.style.background = u > 0.86 ? 'var(--bad)' : u > 0.75 ? 'var(--warn)' : 'var(--muted)';
    row.classList.toggle('on', sel === a);
    row.classList.toggle('down', a.off);
  }
}

function cardData() {
  const a = sel, r = ROLES[a.ri], u = a.span > 0 ? a.busy / a.span : 0, S = STATES[a.state];
  return {
    n: a.n, color: r.color, cn: r.cn, prog: r.prog.map(p => p[0]).join(' → '), off: a.off,
    st: `${a.state} ${S.cn}`, md: S.mode, tk: a.task ? '#' + a.task.id : '—',
    q: a.queue.length, u: (u * 100).toFixed(0) + '%', hist: a.hist.map(v => !!v),
  };
}
function showCard() {
  if (!sel || !agents.includes(sel)) { sel = null; emit.card(null); return }
  emit.card(cardData());
}
/* The card is pushed every 0.25s. Only the text changes, never a full rebuild —
   rebuilding would swap the buttons between pointerdown and click, and that
   click would be lost. */
function tickCard() {
  if (!sel || !agents.includes(sel)) return;
  emit.card(cardData());
}
function cardAct(kind) {
  const a = sel; if (!a) return;
  if (kind === 'off') { a.off = !a.off; if (a.off) dropAll(a) } else interrupt(a);
  showCard(); buildRoster();
}
function closeCard() { sel = null; showCard(); buildRoster() }

function dropAll(a) {
  const held = [...(a.task ? [a.task] : []), ...a.queue];
  a.task = null; a.queue = []; a.state = 'IDLE'; a.step = 0;
  for (const t of held) {
    const to = dispatch(a.ri);
    if (to && to !== a) { to.queue.push(t); to.pulse = 1 } else loose.push({t, ri: a.ri});
  }
}
function interrupt(a) {
  if (!a.task && !a.queue.length) return;
  shocks.push({x: a.x, y: a.y, t: 0});
  dropAll(a);
}

/* ── Readouts ─────────────────────────────────────────────────────────
   Throughput is "how much actually finished lately ÷ how much time actually
   passed", not a theoretical value derived from capacity — theory always
   looks good, and the entire point of this page is to see whether theory
   and measurement agree, or don't. */
function stats() {
  const win = Math.min(60, clock);
  const fin = done.filter(t => t.doneAt > clock - 60);
  const leads = done.slice(-20).map(t => t.doneAt - t.at).sort((x, y) => x - y);
  const util = ROLES.map((r, ri) => {
    const p = agents.filter(a => a.ri === ri && !a.off);
    const s = p.reduce((m, a) => m + a.span, 0), b = p.reduce((m, a) => m + a.busy, 0);
    return {r, n: p.length, u: s > 0 ? b / s : 0, q: p.reduce((m, a) => m + a.queue.length, 0)};
  });
  let links = 0;
  for (let i = 0; i < agents.length; i++) for (let j = i + 1; j < agents.length; j++)
    if (Math.hypot(agents[i].x - agents[j].x, agents[i].y - agents[j].y) < LINK_R) links++;
  return {
    thr: win > 3 ? fin.length / win * 60 : 0,
    lead: leads.length ? leads[Math.floor(leads.length / 2)] : 0,
    wip: wip(), fin: delivered, util, links,
  };
}

function paintStats() {
  const s = stats();
  tickCard();
  els.tally.innerHTML =
    `<b>${agents.filter(a => !a.off).length}</b> active · <b>${agents.filter(a => a.task).length}</b> working<br>
     <b>${s.links}</b> links · <b>${packets.length}</b> messages in transit · <b>${s.fin}</b> delivered`;
  els.stats.innerHTML = `
    <div class="m"><u>Throughput</u><b>${s.thr.toFixed(1)}<s>tasks/min</s></b></div>
    <div class="m"><u>Lead time</u><b>${s.lead.toFixed(1)}<s>sec</s></b></div>
    <div class="m"><u>Work in progress</u><b>${s.wip}<s>/${WIPCAP}</s></b></div>
    ${s.util.map(x => `<div class="m"><u>${x.r.cn}</u><b style="color:${
      x.u > .86 ? 'var(--bad)' : x.u > .75 ? 'var(--warn)' : 'var(--ink)'
    }">${(x.u * 100).toFixed(0)}<s>%</s></b></div>`).join('')}`;

  /* The verdict. Order matters: first check for an empty stage (a hard failure
     that distorts every other reading), then utilization, and only then
     queues. The reverse would point people the wrong way — a stage with
     nobody in it has 0% utilization and looks idler than anyone. */
  const empty = s.util.find(x => x.n === 0);
  const hot = s.util.reduce((m, x) => (x.u > m.u ? x : m));
  const qmax = s.util.reduce((m, x) => (x.q > m.q ? x : m));
  els.verdict.innerHTML =
    empty      ? `<b>${empty.r.cn}</b> has no agents; work is blocked upstream.`
  : clock < 15 ? `Warming up: throughput becomes reliable after a full minute of completions.`
  : hot.u > .86 ? `Bottleneck: <b>${hot.r.cn}</b> at ${(hot.u * 100).toFixed(0)}% utilization. Add capacity here first.`
  : qmax.q >= 3 ? `<b>${qmax.r.cn}</b> has ${qmax.q} queued tasks; this is arrival variability, not yet a sustained capacity gap.`
  : `No clear bottleneck. <b>${hot.r.cn}</b> is busiest at ${(hot.u * 100).toFixed(0)}%. Raise arrival rate to stress the system.`;
}

/* ═══════════════════════════════════════════════════════════════════════
   5. Interaction & the main loop
   ═══════════════════════════════════════════════════════════════════════ */

const setLam = v => { lam = +v };
const setSpeed = v => { speed = +v; emit.speed(speed) };

const hit = (x, y) => agents.find(a => Math.hypot(a.x - x, a.y - y) < ORB * 0.62) || null;
let holdT = null, held = false;
bind(field, 'pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.in = true });
bind(field, 'pointerleave', () => { mouse.in = false; mouse.x = mouse.y = -9999 });
bind(field, 'pointerdown', e => {
  const a = hit(e.clientX, e.clientY);
  held = false;
  if (a) holdT = setTimeout(() => { held = true; interrupt(a); buildRoster() }, HOLD_MS);
});
bind(window, 'pointerup', e => {
  clearTimeout(holdT);
  if (held || e.target !== field) return;
  sel = hit(e.clientX, e.clientY); showCard(); buildRoster();
});
bind(window, 'keydown', e => {
  if (e.key === 'Escape') { sel = null; showCard(); buildRoster() }
  // when a button has focus, space already means "press this button"; handling it again here would double-fire
  if (e.key === ' ' && !e.target.closest('button,input')) {
    e.preventDefault();
    setSpeed(speed ? 0 : 1);
  }
});

function fit() {
  const dpr = Math.min(devicePixelRatio, 2);
  W = innerWidth; H = innerHeight;
  for (const c of [field, glow]) {
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      if (c === field) fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      else if (gl) gl.viewport(0, 0, c.width, c.height);
    }
  }
  return dpr;
}

const RM = matchMedia('(prefers-reduced-motion: reduce)');
const mesh = createMeshBridge({getAgents: () => agents, ROLES, STATES, LINK_R});
let last = 0, statT = 1;
fit(); reset(); buildRoster();
let raf = 0;
(function loop(now) {
  raf = requestAnimationFrame(loop);
  const dpr = fit();
  const raw = Math.min(0.05, (now - last) / 1000); last = now;
  rightPad = lerp(rightPad, sel && W > 1080 ? 300 : 46, 1 - Math.exp(-raw * 5));
  if (speed) sim(raw * speed);
  const t = RM.matches ? 0 : clock;
  if (gl) pushGlow(now / 1000, dpr);
  mesh.step(raw * speed || 0);
  draw(t); mesh.draw(fctx); paintRoster(t);
  statT += raw;
  if (statT > 0.25) { statT = 0; paintStats() }
})(0);

/**
 * Adopt a real PlugBoard roster. Passing an empty roster hands the field back
 * to the simulation. Orbs are keyed by ledger id so a poll that returns the
 * same tasks keeps their positions instead of scattering the field.
 */
function setFleet(roster) {
  if (!Array.isArray(roster) || roster.length === 0) {
    if (live) { live = false; liveByKey.clear(); reset(); buildRoster() }
    return { live: false, agents: 0 };
  }
  live = true;
  const seen = new Set();
  const next = [];
  for (const entry of roster.slice(0, MAXN)) {
    const key = String(entry.id);
    if (seen.has(key)) continue;
    seen.add(key);
    const roleId = ROLE_BY_STATUS[entry.status] || 'code';
    const ri = Math.max(0, ROLES.findIndex(r => r.id === roleId));
    let a = liveByKey.get(key);
    if (!a) { a = makeAgent(ri); liveByKey.set(key, a) }
    a.ri = ri;
    a.label = entry.label || key;
    a.state = STATE_BY_STATUS[entry.status] || 'IDLE';
    a.task = null; a.queue = []; a.off = false;
    next.push(a);
  }
  for (const key of [...liveByKey.keys()]) if (!seen.has(key)) liveByKey.delete(key);
  agents = next; loose = []; packets = [];
  buildRoster();
  return { live: true, agents: agents.length };
}

return {
  setLam, setSpeed, cardAct, closeCard, mesh, setFleet,
  dispose() { ac.abort(); cancelAnimationFrame(raf); clearTimeout(holdT) },
};

}
