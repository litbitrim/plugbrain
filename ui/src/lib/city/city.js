import * as THREE from 'three';
import { CELL, KVARS, STREET, colorOf, cssv, edges, files, hOf, plots, removeDead, shadeOf } from './repo.js';

/* ═══════════════════════════════════════════════════════════════════════
   3D — PlugBrain City. The city is alive: workspaces register as districts,
   buildings rise out of the ground as modules appear. GPU buffers start small
   and grow geometrically when a real workspace needs more capacity; the city
   never drops indexed objects just because a demo-sized pool was exhausted.
    ═══════════════════════════════════════════════════════════════════════ */
const INITIAL_BUILDINGS = 1024;
const INITIAL_EDGES = 2048;
const MAXP = 96;                 // current district pool; workspaces are bounded separately

/* Agent attribution beats workspace hue on this map. The brain hands each
   building the colour of the agent that touched it; a file only READ is drawn
   at reduced lightness so a visit never looks like authorship. Colours are
   parsed once and cached — this runs per building per frame. */
const AGENT_COLS = new Map();
function agentColorOf(f) {
  if (!f.agentColor) return null;
  const key = f.agentColor + (f.access || '');
  let c = AGENT_COLS.get(key);
  if (!c) {
    c = new THREE.Color();
    const m = /hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(f.agentColor);
    if (m) {
      const light = f.access === 'read' ? Math.max(0.18, (+m[3] / 100) * 0.55) : (+m[3] / 100);
      c.setHSL(+m[1] / 360, +m[2] / 100, light);
    } else {
      try { c.set(f.agentColor) } catch { c.setHSL(0, 0, 0.5) }
    }
    AGENT_COLS.set(key, c);
  }
  return c;
}

export function createCity(cv, stage, tip, { onSelect, onZoom }) {
let renderer;
try { renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: cv}) } catch (e) {}
if (!renderer) return null;

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
// Orthographic, not perspective: the whole point of an isometric drawing is
// that equal things read as equal.
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -400, 600);

const BOX_VERT = `
  attribute vec3 aColor; attribute vec2 aHi;   // x = highlight, y = fade
  varying vec3 vN, vW, vColor; varying vec2 vHi;
  void main(){
    vColor = aColor; vHi = aHi;
    vec3 tp = position;
    #ifdef USE_INSTANCING
      tp = (instanceMatrix * vec4(position, 1.0)).xyz;
      vN = normalize(mat3(instanceMatrix) * normal);
    #else
      vN = normal;
    #endif
    vW = tp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(tp, 1.0);
  }`;

const BOX_FRAG = `
  precision highp float;
  varying vec3 vN, vW, vColor; varying vec2 vHi;
  uniform float uHatch, uTime;
  void main(){
    vec3 n = normalize(vN);
    // One fixed brightness per axis: an isometric drawing doesn't need real
    // lighting, it needs the three faces instantly distinguishable.
    float f = n.y > 0.5 ? 1.0 : (abs(n.x) > 0.5 ? 0.74 : 0.56);
    vec3 paper = vec3(0.867, 0.827, 0.706);
    vec3 c = mix(paper, vColor, 0.62) * f;

    // Hatching: drawn only on upward faces, in world space, so the lines
    // continue across neighbouring buildings.
    if (n.y > 0.5 && uHatch > 0.5) {
      float s = sin((vW.x + vW.z) * 3.2 + vW.y * 0.4);
      c -= vec3(0.055) * smoothstep(0.72, 1.0, abs(s));
    }
    c = mix(c, vec3(0.98, 0.94, 0.86), vHi.x * 0.42);
    c = mix(paper * 0.94, c, mix(0.30, 1.0, 1.0 - vHi.y));
    gl_FragColor = vec4(c, 1.0);
  }`;

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const boxMat = new THREE.ShaderMaterial({
  uniforms: {uHatch: {value: 1}, uTime: {value: 0}},
  vertexShader: BOX_VERT, fragmentShader: BOX_FRAG,
});
let buildingCapacity = INITIAL_BUILDINGS;
let boxes = new THREE.InstancedMesh(boxGeo, boxMat, buildingCapacity);
boxes.frustumCulled = false;
let bColor = new THREE.InstancedBufferAttribute(new Float32Array(buildingCapacity * 3), 3);
let bHi = new THREE.InstancedBufferAttribute(new Float32Array(buildingCapacity * 2), 2);
boxGeo.setAttribute('aColor', bColor);
boxGeo.setAttribute('aHi', bHi);
scene.add(boxes);

/* Building outlines. In an isometric blueprint the edges matter more than the
   faces — without them, a run of same-coloured boxes blurs into one blob.
   They can't join the instancing: LineSegments ignores instanceMatrix,
   so each building gets its own wireframe from a pre-allocated pool. */
const edgeGeo = new THREE.EdgesGeometry(boxGeo);
const outlineMat = new THREE.LineBasicMaterial({color: 0x3a3527, transparent: true, opacity: 0.30});
let outlinePool = [];
for (let i = 0; i < buildingCapacity; i++) {
  const o = new THREE.LineSegments(edgeGeo, outlineMat);
  o.visible = false;
  outlinePool.push(o);
  scene.add(o);
}

const nextCapacity = (current, required) => {
  let next = Math.max(1, current);
  while (next < required) next *= 2;
  return next;
};

/* Reallocate only when the authoritative feed actually outgrows the current
   capacity. Every frame after that uses the complete `files` collection. */
function ensureBuildingCapacity(required) {
  if (required <= buildingCapacity) return;
  const next = nextCapacity(buildingCapacity, required);
  const oldBoxes = boxes;
  const oldOutlines = outlinePool;
  const nextBoxes = new THREE.InstancedMesh(boxGeo, boxMat, next);
  nextBoxes.frustumCulled = false;
  nextBoxes.count = 0;
  const nextColor = new THREE.InstancedBufferAttribute(new Float32Array(next * 3), 3);
  const nextHi = new THREE.InstancedBufferAttribute(new Float32Array(next * 2), 2);
  boxGeo.setAttribute('aColor', nextColor);
  boxGeo.setAttribute('aHi', nextHi);
  const nextOutlines = [];
  for (let i = 0; i < next; i++) {
    const o = new THREE.LineSegments(edgeGeo, outlineMat);
    o.visible = false;
    nextOutlines.push(o);
    scene.add(o);
  }
  scene.remove(oldBoxes);
  for (const o of oldOutlines) scene.remove(o);
  boxes = nextBoxes;
  bColor = nextColor;
  bHi = nextHi;
  outlinePool = nextOutlines;
  buildingCapacity = next;
}

/* Districts: one thin slab per workspace, pooled and damped toward its
   target size — a registering workspace visibly claims new land. */
const plotMat = () => new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: `varying vec3 vN; varying vec3 vW;
    void main(){ vN = normal; vW = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `precision mediump float; varying vec3 vN; varying vec3 vW;
    void main(){
      float f = vN.y > 0.5 ? 1.0 : 0.78;
      vec3 c = vec3(0.816, 0.776, 0.651) * f;
      if (vN.y > 0.5) {
        // A fine grid on the plot's top face, so it reads as surveyed land.
        vec2 g = abs(fract(vW.xz * 0.5) - 0.5);
        c -= vec3(0.03) * smoothstep(0.46, 0.5, max(g.x, g.y));
      }
      gl_FragColor = vec4(c, 1.0);
    }`,
});
const plotPool = [];
const plotUnit = new THREE.BoxGeometry(1, 1, 1);
for (let i = 0; i < MAXP; i++) {
  const m = new THREE.Mesh(plotUnit, plotMat());
  m.visible = false;
  plotPool.push(m);
  scene.add(m);
}

/* ── Dependency flow: points crawling along the edges.
      More than thirty static lines turn into a hairball; moving points can be
      tracked in peripheral vision, and direction needs no arrows. ── */
const FLOW_PER = 3;
let edgeCapacity = INITIAL_EDGES;
let fPos = new Float32Array(edgeCapacity * FLOW_PER * 3);
let fA = new Float32Array(edgeCapacity * FLOW_PER);
const fGeo = new THREE.BufferGeometry();
fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
fGeo.setAttribute('aA', new THREE.BufferAttribute(fA, 1));
const flow = new THREE.Points(fGeo, new THREE.ShaderMaterial({
  uniforms: {uPx: {value: 4}},
  vertexShader: `attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,
  transparent: true, depthWrite: false,
}));
flow.frustumCulled = false;
scene.add(flow);

// The dependency lines themselves: barely visible by default, lit on selection.
let lPos = new Float32Array(edgeCapacity * 6);
let lA = new Float32Array(edgeCapacity * 2);
const lGeo = new THREE.BufferGeometry();
lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
lGeo.setAttribute('aA', new THREE.BufferAttribute(lA, 1));
const links = new THREE.LineSegments(lGeo, new THREE.ShaderMaterial({
  vertexShader: `attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,
  transparent: true, depthWrite: false,
}));
links.frustumCulled = false;
scene.add(links);

function ensureEdgeCapacity(required) {
  if (required <= edgeCapacity) return;
  edgeCapacity = nextCapacity(edgeCapacity, required);
  fPos = new Float32Array(edgeCapacity * FLOW_PER * 3);
  fA = new Float32Array(edgeCapacity * FLOW_PER);
  lPos = new Float32Array(edgeCapacity * 6);
  lA = new Float32Array(edgeCapacity * 2);
  fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
  fGeo.setAttribute('aA', new THREE.BufferAttribute(fA, 1));
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
  lGeo.setAttribute('aA', new THREE.BufferAttribute(lA, 1));
}

/* ── Camera: the isometric angle is fixed; only orbiting around Y and zooming
      are allowed. Free pitch would turn it into an ordinary 3D view at once. ── */
const cam = {yaw: Math.PI * 0.25, tYaw: Math.PI * 0.25, zoom: 16, tZoom: 16};
const ISO_PITCH = Math.atan(1 / Math.SQRT2);   // the true isometric angle, ≈ 35.264°
// Orbit from the start. The worst fate for an isometric city is being mistaken
// for a static illustration — so it spins first, and the first drag (see
// pointermove below) stops it and hands control back.

let dragging = false, lastX = 0, moved = 0, spin = true;
const mouse = {x: -1, y: -1, live: false};

cv.addEventListener('pointerdown', e => {
  dragging = true; moved = 0; lastX = e.clientX;
  cv.setPointerCapture(e.pointerId); cv.classList.add('drag');
});
cv.addEventListener('pointerup', e => { dragging = false; cv.classList.remove('drag'); cv.releasePointerCapture(e.pointerId) });
cv.addEventListener('pointermove', e => {
  const r = cv.getBoundingClientRect();
  mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.live = true;
  if (!dragging) return;
  moved += Math.abs(e.clientX - lastX);
  cam.tYaw -= (e.clientX - lastX) * 0.006;
  lastX = e.clientX;
  spin = false; onSpin(false);
});
cv.addEventListener('pointerleave', () => { mouse.live = false });
// tZoom is the half-height of the orthographic frustum: larger means a wider
// view, so "zooming in" multiplies it down.
const ZOOM0 = cam.tZoom;
const syncZoom = () => onZoom(Math.round(ZOOM0 / cam.tZoom * 100));
const dolly = f => { cam.tZoom = Math.max(4, Math.min(60, cam.tZoom * f)); syncZoom() };
cv.addEventListener('wheel', e => {
  e.preventDefault();
  dolly(1 + Math.sign(e.deltaY) * 0.11);   // scroll down = zoom out
}, {passive: false});
syncZoom();

let hover = null, sel = null, railHover = null, query = '', focusTop = null, onSpin = () => {};
cv.addEventListener('click', () => {
  if (moved > 5) return;
  onSelect(hover && sel !== hover ? hover : null);
});

// workspace hues, cached once — getComputedStyle per frame per building is not an option
const KCOLS = KVARS.map(k => new THREE.Color(cssv(k) || '#8a4b2a'));

/* ── Main loop ────────────────────────────────────────────────────── */
const v3 = new THREE.Vector3(), im = new THREE.Matrix4(), tmpC = new THREE.Color();
let showFlow = true, last = performance.now();

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  const w = stage.clientWidth, h = stage.clientHeight;
  if (!w || !h) return;
  if (cv.width !== Math.round(w * renderer.getPixelRatio())) renderer.setSize(w, h, false);

  const k = 1 - Math.pow(0.002, dt);

  // buried first: reap buildings that finished collapsing, drop dead districts
  removeDead();
  ensureBuildingCapacity(files.length);
  ensureEdgeCapacity(edges.length);

  if (spin) cam.tYaw += dt * 0.12;
  cam.yaw += (cam.tYaw - cam.yaw) * k;
  cam.zoom += (cam.tZoom - cam.zoom) * k;

  const halfH = cam.zoom * 4, halfW = halfH * (w / h);
  camera.left = -halfW; camera.right = halfW; camera.top = halfH; camera.bottom = -halfH;
  camera.updateProjectionMatrix();
  const d = 180;
  camera.position.set(
    Math.cos(cam.yaw) * Math.cos(ISO_PITCH) * d,
    Math.sin(ISO_PITCH) * d,
    Math.sin(cam.yaw) * Math.cos(ISO_PITCH) * d,
  );
  camera.lookAt(0, 6, 0);

  // Districts damp toward their targets — registering a workspace reads as
  // the ground itself expanding to make room.
  for (let i = 0; i < MAXP; i++) {
    const m = plotPool[i], p = plots[i];
    if (!p || i >= plots.length) { m.visible = false; continue }
    p.x = p.x === undefined ? p.tx + p.tw / 2 : p.x;
    p.z = p.z === undefined ? p.tz + p.th / 2 : p.z;
    const cx = p.tx + p.tw / 2, cz = p.tz + p.th / 2;
    p.x += (cx - p.x) * k; p.z += (cz - p.z) * k;
    p.w += (p.tw - p.w) * k; p.h += (p.th - p.h) * k;
    m.visible = true;
    m.position.set(p.x, -0.25, p.z);
    m.scale.set(Math.max(0.01, p.w - STREET * 0.45), 0.5, Math.max(0.01, p.h - STREET * 0.45));
  }

  // Highlight set: the selected building plus its up- and downstream neighbours
  const near = sel ? new Set([sel.path, ...sel.deps, ...sel.usedBy]) : null;
  const focus = sel || hover || railHover;

  const N = files.length;
  boxes.count = N;
  for (let i = 0; i < N; i++) {
    const f = files[i];
    if (f.x !== f.tx) f.x += (f.tx - f.x) * k * 0.7;
    if (f.z !== f.tz) f.z += (f.tz - f.z) * k * 0.7;
    const hh = hOf(f);
    f.h = f.h === undefined ? hh : f.h + (hh - f.h) * (f.dying ? k * 1.4 : k * 0.6);
    f.pulse = Math.max(0, (f.pulse || 0) - dt * 1.6);   // activity flash, decaying
    im.makeScale(CELL * 0.68, Math.max(0.01, f.h), CELL * 0.68);
    im.setPosition(f.x, f.h / 2, f.z);
    boxes.setMatrixAt(i, im);
    const o = outlinePool[i];
    o.visible = true;
    o.scale.set(CELL * 0.68, Math.max(0.01, f.h), CELL * 0.68);
    o.position.set(f.x, f.h / 2, f.z);
    const agentCol = agentColorOf(f);
    if (agentCol) tmpC.copy(agentCol);
    else tmpC.copy(KCOLS[(f.ki ?? 0) % KCOLS.length]).offsetHSL(0, 0, (shadeOf.get(f.dir) - 0.5) * 0.17);
    bColor.array[i * 3] = tmpC.r; bColor.array[i * 3 + 1] = tmpC.g; bColor.array[i * 3 + 2] = tmpC.b;
    const hi = f === focus ? 1 : Math.min(0.85, f.pulse || 0);
    let fade = near ? (near.has(f.path) ? 0 : 1) : (query && !f.path.toLowerCase().includes(query) ? 1 : 0);
    if (!near && !query && focusTop) fade = f.top === focusTop ? 0 : 1;
    bHi.array[i * 2] += (hi - bHi.array[i * 2]) * k;
    bHi.array[i * 2 + 1] += (fade - bHi.array[i * 2 + 1]) * k;
  }
  for (let i = N; i < buildingCapacity; i++) outlinePool[i].visible = false;
  boxes.instanceMatrix.needsUpdate = true;
  bColor.needsUpdate = bHi.needsUpdate = true;

  // Dependency lines and flow points
  const E = edges.length;
  lGeo.setDrawRange(0, E * 2);
  fGeo.setDrawRange(0, E * FLOW_PER);
  for (let i = 0; i < E; i++) {
    const e = edges[i];
    const a = e.from, b = e.to;
    const o = i * 6;
    lPos[o] = a.x; lPos[o + 1] = a.h; lPos[o + 2] = a.z;
    lPos[o + 3] = b.x; lPos[o + 4] = b.h; lPos[o + 5] = b.z;
    const on = !near || (near.has(a.path) && near.has(b.path));
    const strong = sel && (a === sel || b === sel);
    const al = strong ? 0.55 : on ? 0.10 : 0.02;
    lA[i * 2] += (al - lA[i * 2]) * k;
    lA[i * 2 + 1] = lA[i * 2];

    for (let j = 0; j < FLOW_PER; j++) {
      const idx = i * FLOW_PER + j;
      const t = ((now / 2600) + (i * 0.37 + j / FLOW_PER)) % 1;
      // Parabola: points hugging the rooftops would clip through buildings;
      // lifted, they stay trackable.
      const lift = Math.sin(t * Math.PI) * Math.hypot(b.x - a.x, b.z - a.z) * 0.22;
      fPos[idx * 3] = a.x + (b.x - a.x) * t;
      fPos[idx * 3 + 1] = a.h + (b.h - a.h) * t + lift + 1.2;
      fPos[idx * 3 + 2] = a.z + (b.z - a.z) * t;
      fA[idx] = (showFlow ? 1 : 0) * (strong ? 1 : on ? 0.45 : 0.06) * Math.sin(t * Math.PI);
    }
  }
  lGeo.getAttribute('position').needsUpdate = true;
  lGeo.getAttribute('aA').needsUpdate = true;
  fGeo.getAttribute('position').needsUpdate = true;
  fGeo.getAttribute('aA').needsUpdate = true;
  flow.material.uniforms.uPx.value = 3.4 * renderer.getPixelRatio();

  // Picking: project each roof centre to screen space and take the nearest.
  // A very accurate approximation under orthographic projection.
  if (mouse.live && !dragging) {
    let best = null, bd = 26 * 26;
    for (let i = 0; i < N; i++) {
      const f = files[i];
      if (f.dying || f.h < 1) continue;
      v3.set(f.x, f.h * 0.6, f.z).project(camera);
      const sx = (v3.x * 0.5 + 0.5) * w, sy = (-v3.y * 0.5 + 0.5) * h;
      const d2 = (sx - mouse.x) ** 2 + (sy - mouse.y) ** 2;
      if (d2 < bd) { bd = d2; best = f; f.sx = sx; f.sy = sy }
    }
    hover = best;
    cv.style.cursor = dragging ? 'grabbing' : best ? 'pointer' : 'grab';
  } else if (!mouse.live) hover = null;

  if (hover) {
    tip.style.display = 'block';
    tip.style.left = hover.sx + 'px'; tip.style.top = hover.sy + 'px';
    tip.innerHTML = `<b>${hover.name}</b> · ${hover.loc} lines<br>${hover.dir} · referenced by ${hover.usedBy.length}`;
  } else tip.style.display = 'none';

  renderer.render(scene, camera);
}
requestAnimationFrame(frame);

return {
  setFlow: v => { showFlow = v },
  setHatch: v => { boxMat.uniforms.uHatch.value = v ? 1 : 0 },
  setSpin: v => { spin = v },
  spinning: () => spin,
  onSpinChange: fn => { onSpin = fn },
  dolly,
  reset: () => { cam.tYaw = Math.PI * 0.25; cam.tZoom = ZOOM0; syncZoom() },
  setSel: f => { sel = f },
  setRailHover: f => { railHover = f },
  setQuery: q => { query = q },
  setFocusTop: t => { focusTop = t },
};
}
