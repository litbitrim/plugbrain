/**
 * Force-directed graph on a 2D canvas, modelled on how Obsidian's graph view
 * reads and behaves:
 *
 *   - 2D with pan and cursor-anchored zoom. The earlier 3D orbit made a planet
 *     of thousands of files unreadable: depth hides structure instead of
 *     showing it.
 *   - Node size follows how connected a node is; edges are hairlines that stay
 *     quiet until something is in focus.
 *   - Labels fade in with zoom and are placed greedily by importance, so they
 *     never pile on top of each other.
 *   - Hover lifts a node and its neighbours and dims everything else.
 *   - The simulation settles and then STOPS. Nothing is drawn while nothing
 *     changes, so the view is calm and costs no CPU when idle.
 *
 * Framework-free on purpose: React owns the chrome around the canvas, this
 * module owns the canvas. They talk through the small interface below.
 */
import {
  forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY,
  type Simulation, type SimulationLinkDatum, type SimulationNodeDatum,
} from 'd3-force'
import type { GraphModel, GraphNode } from './model'

export type LabelMode = 'auto' | 'always' | 'off'

export interface GraphTransform { x: number; y: number; k: number }

export interface GraphEngineCallbacks {
  onHover(id: string | null): void
  onSelect(id: string | null): void
  onOpen(id: string): void
  onZoom(k: number): void
}

export interface GraphEngine {
  setModel(model: GraphModel): void
  setHidden(isHidden: (node: GraphNode) => boolean): void
  setQuery(matches: ReadonlySet<string>): void
  setLabelMode(mode: LabelMode): void
  setSelected(id: string | null): void
  setHovered(id: string | null): void
  focusNode(id: string): void
  fit(): void
  zoomBy(factor: number): void
  resize(): void
  refreshColours(): void
  dispose(): void
}

interface SimNode extends SimulationNodeDatum {
  id: string
  r: number
  group: string
  node: GraphNode
}

type SimLink = SimulationLinkDatum<SimNode>

interface Palette {
  bg: string
  edge: string
  accent: string
  label: string
  labelHalo: string
  other: string
  groups: string[]
  /** Resolved font family; canvas cannot read CSS custom properties. */
  font: string
}

/* ── Tuning. Each value is named for what it controls. ─────────────────── */

const MIN_ZOOM = 0.04
const MAX_ZOOM = 6
/** Wheel delta to zoom factor. Small enough that a notch is a nudge. */
const WHEEL_ZOOM_RATE = 0.0016
/** Movement below this many pixels is a click, not a drag. */
const DRAG_THRESHOLD_PX = 4
/** Extra pick radius around a node, in screen pixels. */
const HIT_SLOP_PX = 4

const NODE_BASE_RADIUS = 2.6
const NODE_DEGREE_SCALE = 1.35
const NODE_MAX_RADIUS = 13
/** A node never shrinks below this on screen, however far out the view is. */
const NODE_MIN_SCREEN_RADIUS = 1.4

const EDGE_ALPHA = 0.13
const EDGE_DIMMED_ALPHA = 0.035
const EDGE_FOCUS_ALPHA = 0.8
const NODE_DIMMED_ALPHA = 0.13
/** Edge width in screen pixels; constant across zoom so lines stay hairlines. */
const EDGE_WIDTH_PX = 0.7
const EDGE_FOCUS_WIDTH_PX = 1.3

const LABEL_FONT_PX = 12
/** In "auto", labels start to appear at this zoom and are fully opaque at the next. */
const LABEL_ZOOM_START = 0.75
const LABEL_ZOOM_FULL = 1.25
/** Labels of well-connected nodes appear earlier: their radius counts as extra zoom. */
const LABEL_RADIUS_BONUS = 0.06
const MAX_LABELS = 280
const LABEL_GAP_PX = 3
const LABEL_OFFSET_PX = 4

/** Ticks run before the first paint so the opening frame is not an explosion. */
const WARMUP_TICKS = 40
/** Padding around the content when fitting it to the view. */
const FIT_PADDING_PX = 56
/** Zoom used when centring on a single node that is currently smaller than this. */
const FOCUS_ZOOM = 1.6
/** Camera move duration and easing, matching the design system's motion token. */
const CAMERA_MS = 260

const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

function nodeRadius(degree: number): number {
  return Math.min(NODE_MAX_RADIUS, NODE_BASE_RADIUS + NODE_DEGREE_SCALE * Math.sqrt(degree))
}

/** cubic-bezier(0.2, 0, 0, 1) is close enough to this ease-out for a camera. */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function readPalette(element: Element): Palette {
  const style = getComputedStyle(element)
  const read = (name: string, fallback: string): string => style.getPropertyValue(name).trim() || fallback
  const groups: string[] = []
  for (let index = 0; index < 8; index += 1) groups.push(read(`--graph-g${index}`, read('--graph-other', '#6b6e76')))
  return {
    bg: read('--graph-bg', '#0b0c0e'),
    edge: read('--graph-edge', '#8b8e96'),
    accent: read('--graph-accent', '#9dc4ff'),
    label: read('--graph-label', '#d6d8dd'),
    labelHalo: read('--graph-label-halo', '#0b0c0e'),
    other: read('--graph-other', '#6b6e76'),
    groups,
    font: style.fontFamily || 'ui-sans-serif, system-ui, sans-serif',
  }
}

export function createGraphEngine(canvas: HTMLCanvasElement, callbacks: GraphEngineCallbacks): GraphEngine {
  const context = canvas.getContext('2d')
  if (context === null) throw new Error('Canvas 2D ist in diesem Browser nicht verfügbar.')
  const ctx: CanvasRenderingContext2D = context

  let palette = readPalette(canvas.parentElement ?? canvas)
  let model: GraphModel | null = null
  let simNodes: SimNode[] = []
  let simById = new Map<string, SimNode>()
  let links: SimLink[] = []
  let slotOf = new Map<string, number>()
  let simulation: Simulation<SimNode, SimLink> | null = null

  let hidden: (node: GraphNode) => boolean = () => false
  let matches: ReadonlySet<string> = new Set()
  let labelMode: LabelMode = 'auto'
  let selectedId: string | null = null
  let hoveredId: string | null = null

  const view: GraphTransform = { x: 0, y: 0, k: 1 }
  let width = 0
  let height = 0
  let dpr = 1

  let frame = 0
  let dirty = true
  let userMoved = false
  let fittedAfterSettle = false
  let camera: { from: GraphTransform; to: GraphTransform; start: number } | null = null
  let lastReportedZoom = -1

  /* ── Coordinates ─────────────────────────────────────────────────────── */

  const toWorld = (sx: number, sy: number): [number, number] => [(sx - view.x) / view.k, (sy - view.y) / view.k]

  const colourOf = (node: SimNode): string => {
    const slot = slotOf.get(node.group) ?? -1
    return slot >= 0 ? palette.groups[slot] ?? palette.other : palette.other
  }

  const isVisible = (node: SimNode): boolean => !hidden(node.node)

  /** The node under a screen point, nearest first, or null. */
  function pick(sx: number, sy: number): SimNode | null {
    const [wx, wy] = toWorld(sx, sy)
    let best: SimNode | null = null
    let bestDistance = Infinity
    for (const node of simNodes) {
      if (!isVisible(node) || node.x === undefined || node.y === undefined) continue
      const reach = Math.max(node.r, NODE_MIN_SCREEN_RADIUS / view.k) + HIT_SLOP_PX / view.k
      const dx = node.x - wx
      const dy = node.y - wy
      const distance = dx * dx + dy * dy
      if (distance <= reach * reach && distance < bestDistance) {
        best = node
        bestDistance = distance
      }
    }
    return best
  }

  /* ── Focus: what hover or selection lifts out of the crowd ───────────── */

  function focusSet(): Set<string> | null {
    const anchor = hoveredId ?? selectedId
    // A search with nothing selected lifts its hits the same way hover does.
    if (anchor === null && matches.size > 0) return new Set(matches)
    if (anchor === null || model === null) return null
    const set = new Set<string>([anchor])
    for (const id of model.neighbours.get(anchor) ?? []) set.add(id)
    return set
  }

  /* ── Drawing ─────────────────────────────────────────────────────────── */

  function draw(): void {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = palette.bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (simNodes.length === 0) return

    ctx.setTransform(dpr * view.k, 0, 0, dpr * view.k, dpr * view.x, dpr * view.y)
    const focus = focusSet()

    // Edges: one batched path for the quiet majority, a second for the lit ones.
    ctx.lineCap = 'round'
    ctx.strokeStyle = palette.edge
    ctx.globalAlpha = focus ? EDGE_DIMMED_ALPHA : EDGE_ALPHA
    ctx.lineWidth = EDGE_WIDTH_PX / view.k
    ctx.beginPath()
    const lit: SimLink[] = []
    for (const link of links) {
      const a = link.source as SimNode
      const b = link.target as SimNode
      if (!isVisible(a) || !isVisible(b)) continue
      if (focus && (a.id === (hoveredId ?? selectedId) || b.id === (hoveredId ?? selectedId))) {
        lit.push(link)
        continue
      }
      ctx.moveTo(a.x ?? 0, a.y ?? 0)
      ctx.lineTo(b.x ?? 0, b.y ?? 0)
    }
    ctx.stroke()

    if (lit.length > 0) {
      ctx.strokeStyle = palette.accent
      ctx.globalAlpha = EDGE_FOCUS_ALPHA
      ctx.lineWidth = EDGE_FOCUS_WIDTH_PX / view.k
      ctx.beginPath()
      for (const link of lit) {
        const a = link.source as SimNode
        const b = link.target as SimNode
        ctx.moveTo(a.x ?? 0, a.y ?? 0)
        ctx.lineTo(b.x ?? 0, b.y ?? 0)
      }
      ctx.stroke()
    }

    // Nodes.
    const minWorldRadius = NODE_MIN_SCREEN_RADIUS / view.k
    for (const node of simNodes) {
      if (!isVisible(node)) continue
      const r = Math.max(node.r, minWorldRadius)
      ctx.globalAlpha = focus && !focus.has(node.id) ? NODE_DIMMED_ALPHA : 1
      ctx.fillStyle = colourOf(node)
      ctx.beginPath()
      ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Rings: selection, hover and search hits.
    ctx.globalAlpha = 1
    ctx.strokeStyle = palette.accent
    for (const node of simNodes) {
      if (!isVisible(node)) continue
      const ring = node.id === selectedId ? 2.2 : node.id === hoveredId ? 1.6 : matches.has(node.id) ? 1.4 : 0
      if (ring === 0) continue
      ctx.lineWidth = ring / view.k
      ctx.beginPath()
      ctx.arc(node.x ?? 0, node.y ?? 0, Math.max(node.r, minWorldRadius) + 3 / view.k, 0, Math.PI * 2)
      ctx.stroke()
    }

    drawLabels(focus)
  }

  function drawLabels(focus: Set<string> | null): void {
    const anchor = hoveredId ?? selectedId
    const priority = (node: SimNode): number => {
      if (node.id === selectedId) return 4
      if (node.id === hoveredId) return 4
      if (focus?.has(node.id)) return 3
      if (matches.has(node.id)) return 2
      return 0
    }

    const candidates: { node: SimNode; alpha: number; rank: number }[] = []
    for (const node of simNodes) {
      if (!isVisible(node)) continue
      const rank = priority(node)
      let alpha = 0
      if (rank > 0) alpha = 1
      // While something is in focus, the crowd stays quiet: faint background
      // labels were the clutter that made the old view unreadable.
      else if (focus) alpha = 0
      else if (labelMode === 'always') alpha = 1
      else if (labelMode === 'auto') {
        const effectiveZoom = view.k + node.r * LABEL_RADIUS_BONUS
        alpha = Math.max(0, Math.min(1, (effectiveZoom - LABEL_ZOOM_START) / (LABEL_ZOOM_FULL - LABEL_ZOOM_START)))
      }
      if (alpha <= 0.02) continue
      const sx = (node.x ?? 0) * view.k + view.x
      const sy = (node.y ?? 0) * view.k + view.y
      if (sx < -200 || sx > width + 200 || sy < -40 || sy > height + 40) continue
      candidates.push({ node, alpha, rank: rank * 100000 + node.node.degree })
    }
    candidates.sort((a, b) => b.rank - a.rank)

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.font = `500 ${LABEL_FONT_PX}px ${palette.font}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.lineJoin = 'round'
    const placed: { x0: number; y0: number; x1: number; y1: number }[] = []
    let drawn = 0

    for (const { node, alpha } of candidates) {
      if (drawn >= MAX_LABELS) break
      const text = node.node.label
      const textWidth = ctx.measureText(text).width
      const r = Math.max(node.r, NODE_MIN_SCREEN_RADIUS / view.k) * view.k
      const cx = (node.x ?? 0) * view.k + view.x
      const top = (node.y ?? 0) * view.k + view.y + r + LABEL_OFFSET_PX
      const box = {
        x0: cx - textWidth / 2 - LABEL_GAP_PX, y0: top - LABEL_GAP_PX,
        x1: cx + textWidth / 2 + LABEL_GAP_PX, y1: top + LABEL_FONT_PX + LABEL_GAP_PX,
      }
      const forced = node.id === anchor
      if (!forced && placed.some(p => box.x0 < p.x1 && box.x1 > p.x0 && box.y0 < p.y1 && box.y1 > p.y0)) continue
      placed.push(box)
      drawn += 1
      ctx.globalAlpha = alpha
      ctx.lineWidth = 3
      ctx.strokeStyle = palette.labelHalo
      ctx.strokeText(text, cx, top)
      ctx.fillStyle = node.id === selectedId || node.id === hoveredId ? palette.accent : palette.label
      ctx.fillText(text, cx, top)
    }
    ctx.globalAlpha = 1
  }

  /* ── Loop: tick while settling or animating, otherwise sleep ─────────── */

  function loop(now: number): void {
    frame = 0
    let active = false

    if (camera !== null) {
      const t = Math.min(1, (now - camera.start) / CAMERA_MS)
      const e = easeOut(t)
      view.x = camera.from.x + (camera.to.x - camera.from.x) * e
      view.y = camera.from.y + (camera.to.y - camera.from.y) * e
      view.k = camera.from.k + (camera.to.k - camera.from.k) * e
      if (t >= 1) camera = null
      dirty = true
      active = true
    }

    if (simulation !== null && simulation.alpha() > simulation.alphaMin()) {
      simulation.tick()
      dirty = true
      active = true
    } else if (simulation !== null && !fittedAfterSettle) {
      fittedAfterSettle = true
      if (!userMoved) fit()
      active = true
    }

    if (dirty) {
      draw()
      dirty = false
      if (view.k !== lastReportedZoom) {
        lastReportedZoom = view.k
        callbacks.onZoom(view.k)
      }
    }
    if (active) wake()
  }

  function wake(): void {
    if (frame === 0) frame = requestAnimationFrame(loop)
  }

  function redraw(): void {
    dirty = true
    wake()
  }

  /* ── Camera ──────────────────────────────────────────────────────────── */

  function moveCamera(to: GraphTransform): void {
    if (REDUCED_MOTION) {
      view.x = to.x; view.y = to.y; view.k = to.k
      camera = null
      redraw()
      return
    }
    camera = { from: { ...view }, to, start: performance.now() }
    wake()
  }

  function fit(instant = false): void {
    let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity
    for (const node of simNodes) {
      if (!isVisible(node) || node.x === undefined || node.y === undefined) continue
      x0 = Math.min(x0, node.x - node.r); y0 = Math.min(y0, node.y - node.r)
      x1 = Math.max(x1, node.x + node.r); y1 = Math.max(y1, node.y + node.r)
    }
    if (!Number.isFinite(x0) || width === 0 || height === 0) return
    const k = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM,
      Math.min((width - FIT_PADDING_PX * 2) / Math.max(1, x1 - x0), (height - FIT_PADDING_PX * 2) / Math.max(1, y1 - y0))))
    const target = { k, x: width / 2 - ((x0 + x1) / 2) * k, y: height / 2 - ((y0 + y1) / 2) * k }
    if (instant) {
      view.x = target.x; view.y = target.y; view.k = target.k
      camera = null
      redraw()
      return
    }
    moveCamera(target)
  }

  function zoomAround(sx: number, sy: number, factor: number): void {
    const k = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, view.k * factor))
    const [wx, wy] = toWorld(sx, sy)
    view.x = sx - wx * k
    view.y = sy - wy * k
    view.k = k
    camera = null
    userMoved = true
    redraw()
  }

  /* ── Pointer and wheel ───────────────────────────────────────────────── */

  let press: { x: number; y: number; node: SimNode | null; moved: boolean; pointerId: number } | null = null

  const local = (event: { clientX: number; clientY: number }): [number, number] => {
    const rect = canvas.getBoundingClientRect()
    return [event.clientX - rect.left, event.clientY - rect.top]
  }

  function onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return
    const [sx, sy] = local(event)
    press = { x: sx, y: sy, node: pick(sx, sy), moved: false, pointerId: event.pointerId }
    canvas.setPointerCapture(event.pointerId)
    camera = null
  }

  function onPointerMove(event: PointerEvent): void {
    const [sx, sy] = local(event)
    if (press === null) {
      const node = pick(sx, sy)
      const id = node?.id ?? null
      canvas.style.cursor = node ? 'pointer' : 'grab'
      if (id !== hoveredId) {
        hoveredId = id
        callbacks.onHover(id)
        redraw()
      }
      return
    }
    const dx = sx - press.x
    const dy = sy - press.y
    if (!press.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return
    press.moved = true
    userMoved = true
    canvas.style.cursor = 'grabbing'
    if (press.node !== null && simulation !== null) {
      const [wx, wy] = toWorld(sx, sy)
      press.node.fx = wx
      press.node.fy = wy
      simulation.alphaTarget(0.25)
      if (simulation.alpha() < 0.25) simulation.alpha(0.25)
      redraw()
    } else {
      view.x += event.movementX
      view.y += event.movementY
      redraw()
    }
  }

  function onPointerUp(event: PointerEvent): void {
    if (press === null) return
    const wasDrag = press.moved
    const node = press.node
    if (canvas.hasPointerCapture(press.pointerId)) canvas.releasePointerCapture(press.pointerId)
    press = null
    canvas.style.cursor = node ? 'pointer' : 'grab'
    if (node !== null && simulation !== null) {
      node.fx = null
      node.fy = null
      simulation.alphaTarget(0)
    }
    if (!wasDrag) {
      const [sx, sy] = local(event)
      const hit = pick(sx, sy)
      selectedId = hit?.id ?? null
      callbacks.onSelect(selectedId)
    }
    redraw()
  }

  function onDoubleClick(event: MouseEvent): void {
    const [sx, sy] = local(event)
    const hit = pick(sx, sy)
    if (hit !== null) callbacks.onOpen(hit.id)
  }

  function onWheel(event: WheelEvent): void {
    event.preventDefault()
    const [sx, sy] = local(event)
    zoomAround(sx, sy, Math.exp(-event.deltaY * WHEEL_ZOOM_RATE))
  }

  function onLeave(): void {
    if (press !== null) return
    if (hoveredId !== null) {
      hoveredId = null
      callbacks.onHover(null)
      redraw()
    }
  }

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  canvas.addEventListener('pointerleave', onLeave)
  canvas.addEventListener('dblclick', onDoubleClick)
  canvas.addEventListener('wheel', onWheel, { passive: false })
  canvas.style.cursor = 'grab'
  canvas.style.touchAction = 'none'

  /* ── Data ────────────────────────────────────────────────────────────── */

  function setModel(next: GraphModel): void {
    model = next
    slotOf = new Map(next.groups.map(group => [group.name, group.slot]))
    const previous = simById
    const fresh = previous.size === 0

    // Seed each group on a ring so clusters form from the start instead of
    // untangling out of a random cloud.
    const groupNames = next.groups.map(group => group.name)
    const ringRadius = 18 * Math.sqrt(next.nodes.length)
    const seed = new Map<string, [number, number]>()
    groupNames.forEach((name, index) => {
      const angle = (index / Math.max(1, groupNames.length)) * Math.PI * 2
      const r = index === 0 ? 0 : ringRadius
      seed.set(name, [Math.cos(angle) * r, Math.sin(angle) * r])
    })

    const nodes: SimNode[] = next.nodes.map(node => {
      const old = previous.get(node.id)
      const base: SimNode = { id: node.id, r: nodeRadius(node.degree), group: node.group, node }
      if (old?.x !== undefined && old.y !== undefined) {
        base.x = old.x; base.y = old.y; base.vx = old.vx ?? 0; base.vy = old.vy ?? 0
      } else {
        const [gx, gy] = seed.get(node.group) ?? [0, 0]
        const spread = 6 * Math.sqrt(next.nodes.length / Math.max(1, groupNames.length))
        base.x = gx + (Math.random() - 0.5) * spread
        base.y = gy + (Math.random() - 0.5) * spread
      }
      return base
    })
    simNodes = nodes
    simById = new Map(nodes.map(node => [node.id, node]))
    links = next.edges
      .filter(edge => simById.has(edge.source) && simById.has(edge.target))
      .map(edge => ({ source: edge.source, target: edge.target }))

    simulation?.stop()
    simulation = forceSimulation<SimNode, SimLink>(nodes)
      .force('link', forceLink<SimNode, SimLink>(links).id(node => node.id).distance(30))
      .force('charge', forceManyBody<SimNode>().strength(-42).distanceMax(420).theta(0.9))
      .force('x', forceX<SimNode>(0).strength(0.04))
      .force('y', forceY<SimNode>(0).strength(0.04))
      .force('collide', forceCollide<SimNode>(node => node.r + 1.5).strength(0.7).iterations(1))
      .stop()

    if (REDUCED_MOTION) {
      // No animated settling: compute the layout up front and show it once.
      const ticks = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()))
      simulation.tick(ticks)
    } else if (fresh) {
      simulation.tick(WARMUP_TICKS)
    } else {
      simulation.alpha(0.3)
    }

    if (selectedId !== null && !simById.has(selectedId)) {
      selectedId = null
      callbacks.onSelect(null)
    }
    if (fresh) {
      userMoved = false
      fittedAfterSettle = false
      fit(true)
    }
    redraw()
  }

  /* ── Public surface ──────────────────────────────────────────────────── */

  function resize(): void {
    const rect = canvas.getBoundingClientRect()
    dpr = window.devicePixelRatio || 1
    const hadSize = width > 0
    width = rect.width
    height = rect.height
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    if (!hadSize && simNodes.length > 0) fit(true)
    redraw()
  }

  return {
    setModel,
    setHidden(next) { hidden = next; redraw() },
    setQuery(next) { matches = next; redraw() },
    setLabelMode(next) { labelMode = next; redraw() },
    setSelected(id) { selectedId = id; redraw() },
    setHovered(id) { hoveredId = id; redraw() },
    focusNode(id) {
      const node = simById.get(id)
      if (node?.x === undefined || node.y === undefined) return
      userMoved = true
      const k = Math.max(view.k, FOCUS_ZOOM)
      moveCamera({ k, x: width / 2 - node.x * k, y: height / 2 - node.y * k })
    },
    fit() { userMoved = true; fit() },
    zoomBy(factor) { zoomAround(width / 2, height / 2, factor) },
    resize,
    refreshColours() { palette = readPalette(canvas.parentElement ?? canvas); redraw() },
    dispose() {
      if (frame !== 0) cancelAnimationFrame(frame)
      simulation?.stop()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('dblclick', onDoubleClick)
      canvas.removeEventListener('wheel', onWheel)
    },
  }
}
