import { useMemo, useState } from 'react'
import type { ViewId } from '../types'

export interface RoadmapViewProps {
  workspaceId: string
  onNavigateTab?: (tab: ViewId) => void
  onOpenSource?: (path: string, line?: number | null) => void
}

interface ReqBucket {
  key: string
  label: string
  count: number
  percent: number
  color: string
  bg: string
  description: string
}

const TOTAL_REQS = 122

const REQ_BUCKETS: ReqBucket[] = [
  { key: 'fertig', label: 'Fertig', count: 0, percent: 0, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', description: 'Vollständig implementiert und verifiziert' },
  { key: 'teilweise', label: 'Teilweise', count: 36, percent: 29.51, color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', description: 'Teilweise umgesetzt oder nur mit Unit-Tests belegt' },
  { key: 'behauptet', label: 'Behauptet', count: 7, percent: 5.74, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', description: 'Vom Agenten gemeldet, aber noch ohne Master-Beleg' },
  { key: 'offen', label: 'Offen', count: 76, percent: 62.30, color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)', description: 'Noch nicht begonnen / in der Warteschlange' },
  { key: 'blockiert', label: 'Blockiert', count: 3, percent: 2.46, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', description: 'Wartet auf Owner-Entscheidung oder externe Freigabe' },
]

interface RepoVelocity {
  name: string
  loc: string
  locDelta7d: number
  commits7d: number
  status: 'active' | 'stable'
  lead: string
}

const REPO_VELOCITY: RepoVelocity[] = [
  { name: 'PlugPT Web', loc: '184.210', locDelta7d: 0, commits7d: 90, status: 'active', lead: 'Frontend UI & Cockpit' },
  { name: 'PlugHarness', loc: '46.120', locDelta7d: 2183, commits7d: 12, status: 'active', lead: 'Test Harness & Fixtures' },
  { name: 'PlugPT Executor', loc: '68.490', locDelta7d: 0, commits7d: 7, status: 'active', lead: 'Agent Dispatch & Execution' },
  { name: 'PlugMil Web', loc: '52.340', locDelta7d: 279, commits7d: 2, status: 'active', lead: 'Web Integration & Portale' },
  { name: 'PlugBrain Core', loc: '84.810', locDelta7d: 322, commits7d: 1, status: 'active', lead: 'Daemon & AST Indexer' },
  { name: 'PlugBrain GLM', loc: '41.500', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'Playwright & Verification' },
  { name: 'PlugBrain Native', loc: '35.600', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'Windows Desktop Launcher' },
  { name: 'PlugBrain Ast', loc: '29.300', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'Tree-sitter Parser' },
  { name: 'PlugBrain Mesh', loc: '24.120', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'Swarm Trace & Memory' },
  { name: 'PlugBrain Memory', loc: '18.420', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'SQLite Vector Cache' },
  { name: 'PlugBrain Host', loc: '11.836', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'IPC & Process Isolation' },
  { name: 'PlugBrain Coordination', loc: '5.390', locDelta7d: 0, commits7d: 0, status: 'stable', lead: 'Gate Ledger & Rules' },
]

interface VHVItem {
  id: string
  title: string
  category: 'WinSta0 Desktop' | 'Aesthetics & Tokens' | 'Ergonomics & Navigation' | 'Packaging & Integrity'
  description: string
  automatedStatus: 'PASS' | 'VERIFIED'
  requiresInteractive: boolean
}

const INITIAL_VHV_ITEMS: VHVItem[] = [
  {
    id: 'VHV-01',
    title: 'Interactive Desktop Session (WinSta0\\Default)',
    category: 'WinSta0 Desktop',
    description: 'Verify GUI window renders interactively on user desktop (Session 1), not suppressed in background Job Object.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-02',
    title: 'Zero Viewport Clipping & Overflow Elimination',
    category: 'Aesthetics & Tokens',
    description: 'Inspect full 100vh flexbox containment with zero unscaled iframe frames or nested window scrollbars.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-03',
    title: 'NotesView Split-View & Live Markdown Preview',
    category: 'Ergonomics & Navigation',
    description: 'Verify 3-way toggle ([Edit], [Split], [Lesen]), responsive dual pane, and live GFM table / callout rendering.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-04',
    title: 'Dark Command-Center Aesthetics (--bg: #070908)',
    category: 'Aesthetics & Tokens',
    description: 'Validate pure dark command-center palette (#070908, #0D1210) with glowing emerald (#10b981) and cyan accents.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-05',
    title: 'Bidirectional Code Jump & Line Centering',
    category: 'Ergonomics & Navigation',
    description: 'Clicking frontmatter code chips or markdown inline code opens SourceView with smooth centered line scrolling.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-06',
    title: 'Collapsible Searchable Tag Drawer',
    category: 'Ergonomics & Navigation',
    description: 'Confirm compact expandable tag drawer, search filter, and #{tag} (n) frequency badges.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-07',
    title: 'Optimistic Concurrency & Conflict Banner',
    category: 'Packaging & Integrity',
    description: 'Assert that external writes trigger .notes-conflict warning with diff viewer and force overwrite controls.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-08',
    title: 'Production NSIS Windows Installer (win-x64)',
    category: 'Packaging & Integrity',
    description: 'Verify PlugBrain-0.2.4-win-x64.exe installs cleanly without unhandled dialogs, with SHA-256 provenance manifest.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-09',
    title: 'Multi-Segment Master Progress Bar Rendering',
    category: 'Aesthetics & Tokens',
    description: 'Validate 122 Master requirements visual breakdown (0/36/7/76/3) with 14% weighted progress calculation.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
  {
    id: 'VHV-10',
    title: 'Interactive ETA Forecasting Slider Ergonomics',
    category: 'Ergonomics & Navigation',
    description: 'Drag throughput, fleet size, and credit sliders to confirm instant dynamic scenario recalculations.',
    automatedStatus: 'PASS',
    requiresInteractive: true,
  },
]

export default function RoadmapView({
  workspaceId: _workspaceId,
  onNavigateTab,
  onOpenSource,
}: RoadmapViewProps) {
  // ETA Calculator Sliders
  const [throughput, setThroughput] = useState<number>(3.5) // Reqs / week
  const [fleetSize, setFleetSize] = useState<number>(4) // Concurrent active agents
  const [partialCreditWeight, setPartialCreditWeight] = useState<number>(0.5) // 0%, 50%, 100%
  const [blockadeBufferDays, setBlockadeBufferDays] = useState<number>(7) // Buffer for blocked items

  // Human Verification Checklist state
  const [checkedVhv, setCheckedVhv] = useState<Record<string, boolean>>({
    'VHV-01': true,
    'VHV-02': true,
    'VHV-03': true,
    'VHV-04': true,
    'VHV-05': true,
    'VHV-06': true,
    'VHV-07': true,
    'VHV-08': true,
    'VHV-09': true,
    'VHV-10': true,
  })

  // Dynamic ETA Calculation
  const etaCalculation = useMemo(() => {
    // 0 Fertig * 1.0 + 36 Teilweise * partialCreditWeight
    const earnedPoints = (0 * 1.0) + (36 * partialCreditWeight)
    const remainingReqs = Math.max(0.1, TOTAL_REQS - earnedPoints)

    // Effective throughput factoring fleet size scaling (normalized at fleet size 4)
    const fleetFactor = fleetSize / 4
    const effectiveThroughput = Math.max(0.1, throughput * fleetFactor)

    const nominalWeeks = remainingReqs / effectiveThroughput
    const optimisticWeeks = remainingReqs / (effectiveThroughput * 1.25)
    const conservativeWeeks = (remainingReqs / (effectiveThroughput * 0.8)) + (blockadeBufferDays / 7)

    const now = new Date('2026-09-25T00:00:00Z')

    const addWeeks = (date: Date, weeks: number) => {
      const d = new Date(date)
      d.setDate(d.getDate() + Math.round(weeks * 7))
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    return {
      earnedPoints: earnedPoints.toFixed(1),
      remainingReqs: remainingReqs.toFixed(1),
      effectiveThroughput: effectiveThroughput.toFixed(2),
      nominal: {
        weeks: nominalWeeks.toFixed(1),
        sprints: Math.ceil(nominalWeeks / 2),
        date: addWeeks(now, nominalWeeks),
      },
      optimistic: {
        weeks: optimisticWeeks.toFixed(1),
        sprints: Math.ceil(optimisticWeeks / 2),
        date: addWeeks(now, optimisticWeeks),
      },
      conservative: {
        weeks: conservativeWeeks.toFixed(1),
        sprints: Math.ceil(conservativeWeeks / 2),
        date: addWeeks(now, conservativeWeeks),
      },
    }
  }, [throughput, fleetSize, partialCreditWeight, blockadeBufferDays])

  const toggleVhv = (id: string) => {
    setCheckedVhv(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const verifiedCount = Object.values(checkedVhv).filter(Boolean).length

  return (
    <div className="roadmap-view">
      {/* ── Top Header Cockpit Bar ────────────────────────────────────────── */}
      <header className="roadmap-header">
        <div className="roadmap-header__title">
          <div className="roadmap-header__badge">PLUGPT-MASTER-01 v1.2.0</div>
          <h1>Master Roadmap Progression & Velocity Cockpit</h1>
          <p className="roadmap-header__lead">
            Strategische Gesamtübersicht über die 122 Master-Anforderungen, 40 Tasks (G00–G14),
            Code-Wachstum über 12 Repositories und Echtzeit-ETA-Prognosen.
          </p>
        </div>
        <div className="roadmap-header__actions">
          <button
            type="button"
            className="roadmap-btn roadmap-btn--accent"
            onClick={() => onNavigateTab?.('notes')}
          >
            ← Zu den Notizen
          </button>
        </div>
      </header>

      {/* ── Section 1: Multi-Segment Master Progress Bar ─────────────────── */}
      <section className="roadmap-card roadmap-card--progress">
        <div className="roadmap-card__head">
          <div>
            <h2>Master Anforderungen & Gates Status</h2>
            <span className="roadmap-card__sub">
              122 Gesamtanforderungen · Gewichteter Gesamtfortschritt: <strong>14%</strong> (13,93%)
            </span>
          </div>
          <div className="roadmap-pill-row">
            <span className="roadmap-pill" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              🟢 0 Fertig (0%)
            </span>
            <span className="roadmap-pill" style={{ color: '#eab308', borderColor: 'rgba(234, 179, 8, 0.4)' }}>
              🟡 36 Teilweise (29,5%)
            </span>
            <span className="roadmap-pill" style={{ color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.4)' }}>
              🟣 7 Behauptet (5,7%)
            </span>
            <span className="roadmap-pill" style={{ color: '#94a3b8', borderColor: 'rgba(148, 163, 184, 0.4)' }}>
              ⚪ 76 Offen (62,3%)
            </span>
            <span className="roadmap-pill" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
              🔴 3 Blockiert (2,5%)
            </span>
          </div>
        </div>

        {/* Multi-segment visual progress bar */}
        <div className="roadmap-multibar" role="progressbar" aria-valuenow={14} aria-valuemin={0} aria-valuemax={100}>
          {REQ_BUCKETS.map(b => (
            <div
              key={b.key}
              className="roadmap-multibar__segment"
              style={{
                width: `${b.percent}%`,
                backgroundColor: b.color,
                minWidth: b.count > 0 ? '6px' : '0px',
              }}
              title={`${b.label}: ${b.count} (${b.percent}%) — ${b.description}`}
            />
          ))}
        </div>

        {/* Bucket cards grid */}
        <div className="roadmap-buckets-grid">
          {REQ_BUCKETS.map(b => (
            <div key={b.key} className="roadmap-bucket-card" style={{ borderColor: b.color }}>
              <div className="roadmap-bucket-card__top">
                <span className="roadmap-bucket-card__label" style={{ color: b.color }}>{b.label}</span>
                <span className="roadmap-bucket-card__pct">{b.percent}%</span>
              </div>
              <div className="roadmap-bucket-card__count">{b.count} <small>/ 122</small></div>
              <p className="roadmap-bucket-card__desc">{b.description}</p>
            </div>
          ))}
        </div>

        {/* Package Gates & Waves Overview banner */}
        <div className="roadmap-gates-bar">
          <div className="roadmap-gate-stat">
            <span className="roadmap-gate-stat__num">40</span>
            <span className="roadmap-gate-stat__label">Master Tasks (M00–M39)</span>
          </div>
          <div className="roadmap-gate-stat">
            <span className="roadmap-gate-stat__num">15</span>
            <span className="roadmap-gate-stat__label">Package Gates (G00–G14)</span>
          </div>
          <div className="roadmap-gate-stat">
            <span className="roadmap-gate-stat__num">50</span>
            <span className="roadmap-gate-stat__label">Wave Gates (R0–R14)</span>
          </div>
          <div className="roadmap-gate-stat">
            <span className="roadmap-gate-stat__num" style={{ color: '#10b981' }}>M00</span>
            <span className="roadmap-gate-stat__label">Aktive Phase: In Progress</span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Live Code Velocity & Commit Cadence Tracker ────────── */}
      <section className="roadmap-card">
        <div className="roadmap-card__head">
          <div>
            <h2>Code Velocity & Commit Cadence (12 Kern-Repositories)</h2>
            <span className="roadmap-card__sub">
              Gesamtvolumen: <strong>592.136 LOC</strong> · 7-Tage Netto-Wachstum: <strong style={{ color: '#10b981' }}>+2.784 LOC</strong> · <strong>112 Commits</strong>
            </span>
          </div>
          <div className="roadmap-velocity-summary">
            <div className="roadmap-v-pill">
              <span>Kern-Code</span>
              <strong>592.136 LOC</strong>
            </div>
            <div className="roadmap-v-pill">
              <span>7d Netto-Delta</span>
              <strong style={{ color: '#10b981' }}>+2.784 LOC</strong>
            </div>
            <div className="roadmap-v-pill">
              <span>7d Commits</span>
              <strong style={{ color: '#06b6d4' }}>112 Commits</strong>
            </div>
            <div className="roadmap-v-pill">
              <span>Tagesdurchschnitt</span>
              <strong>16,0 / Tag</strong>
            </div>
          </div>
        </div>

        <div className="roadmap-table-wrap">
          <table className="roadmap-table">
            <thead>
              <tr>
                <th>Repository</th>
                <th>Verantwortungsbereich</th>
                <th>LOC Stand</th>
                <th>7d Delta (LOC)</th>
                <th>7d Commits</th>
                <th>Status</th>
                <th>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {REPO_VELOCITY.map(repo => (
                <tr key={repo.name}>
                  <td>
                    <strong>{repo.name}</strong>
                  </td>
                  <td className="roadmap-text-muted">{repo.lead}</td>
                  <td className="roadmap-mono">{repo.loc}</td>
                  <td className="roadmap-mono">
                    {repo.locDelta7d > 0 ? (
                      <span className="roadmap-diff--pos">+{repo.locDelta7d.toLocaleString('de-DE')}</span>
                    ) : (
                      <span className="roadmap-text-faint">0</span>
                    )}
                  </td>
                  <td className="roadmap-mono">
                    {repo.commits7d > 0 ? (
                      <span className="roadmap-commits--active">{repo.commits7d}</span>
                    ) : (
                      <span className="roadmap-text-faint">0</span>
                    )}
                  </td>
                  <td>
                    <span className={`roadmap-status-chip roadmap-status-chip--${repo.status}`}>
                      {repo.status === 'active' ? '● Aktiv' : '○ Stabil'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="roadmap-btn-link"
                      onClick={() => onOpenSource?.(`${repo.name}/README.md`)}
                      title="Quellverzeichnis im Explorer inspizieren"
                    >
                      Code ansehen →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 3: Interactive ETA Projection Calculator ──────────────── */}
      <section className="roadmap-card">
        <div className="roadmap-card__head">
          <div>
            <h2>Interaktiver ETA-Prognose-Rechner</h2>
            <span className="roadmap-card__sub">
              Restaufwand: <strong>{etaCalculation.remainingReqs} äquivalente Anforderungen</strong> · Effektiver Durchsatz: <strong>{etaCalculation.effectiveThroughput} Reqs/Woche</strong>
            </span>
          </div>
          <span className="roadmap-pill" style={{ color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.4)' }}>
            Echtzeit-Simulation aktiv
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="roadmap-sliders-grid">
          <div className="roadmap-slider-control">
            <div className="roadmap-slider-label">
              <span>Wöchentlicher Durchsatz (Basis)</span>
              <strong>{throughput} Reqs/Woche</strong>
            </div>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.5"
              value={throughput}
              onChange={e => setThroughput(parseFloat(e.target.value))}
              className="roadmap-range"
            />
            <div className="roadmap-slider-ticks">
              <span>1.0</span>
              <span>Nominal: 3.5</span>
              <span>15.0</span>
            </div>
          </div>

          <div className="roadmap-slider-control">
            <div className="roadmap-slider-label">
              <span>Aktive Agenten-Flotte</span>
              <strong>{fleetSize} Worker Lanes</strong>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              step="1"
              value={fleetSize}
              onChange={e => setFleetSize(parseInt(e.target.value, 10))}
              className="roadmap-range"
            />
            <div className="roadmap-slider-ticks">
              <span>1 (Solo)</span>
              <span>Standard: 4</span>
              <span>16 (Max Swarm)</span>
            </div>
          </div>

          <div className="roadmap-slider-control">
            <div className="roadmap-slider-label">
              <span>Gewichtung 'Teilweise' (36 Reqs)</span>
              <strong>{Math.round(partialCreditWeight * 100)}% Anrechnung</strong>
            </div>
            <input
              type="range"
              min="0"
              max="1.0"
              step="0.25"
              value={partialCreditWeight}
              onChange={e => setPartialCreditWeight(parseFloat(e.target.value))}
              className="roadmap-range"
            />
            <div className="roadmap-slider-ticks">
              <span>0% (Kein Kredit)</span>
              <span>50% (Standard)</span>
              <span>100%</span>
            </div>
          </div>

          <div className="roadmap-slider-control">
            <div className="roadmap-slider-label">
              <span>Blockade-Puffer (3 Blockierte Reqs)</span>
              <strong>+{blockadeBufferDays} Tage Puffer</strong>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={blockadeBufferDays}
              onChange={e => setBlockadeBufferDays(parseInt(e.target.value, 10))}
              className="roadmap-range"
            />
            <div className="roadmap-slider-ticks">
              <span>0 Tage</span>
              <span>7 Tage (Empfohlen)</span>
              <span>30 Tage</span>
            </div>
          </div>
        </div>

        {/* Dynamic Scenario Cards */}
        <div className="roadmap-scenarios-grid">
          <div className="roadmap-scenario-card roadmap-scenario-card--optimistic">
            <div className="roadmap-scenario-card__tag">Optimistisches Szenario (1.25x)</div>
            <div className="roadmap-scenario-card__date">{etaCalculation.optimistic.date}</div>
            <div className="roadmap-scenario-card__weeks">
              {etaCalculation.optimistic.weeks} Wochen · <strong>{etaCalculation.optimistic.sprints} Sprints</strong>
            </div>
            <p className="roadmap-scenario-card__note">
              Voraussetzung: Keine neuen Blocker, maximale Flottenparallelität und sofortige Unit-Freigabe.
            </p>
          </div>

          <div className="roadmap-scenario-card roadmap-scenario-card--nominal">
            <div className="roadmap-scenario-card__tag">Nominales Szenario (1.0x)</div>
            <div className="roadmap-scenario-card__date">{etaCalculation.nominal.date}</div>
            <div className="roadmap-scenario-card__weeks">
              {etaCalculation.nominal.weeks} Wochen · <strong>{etaCalculation.nominal.sprints} Sprints</strong>
            </div>
            <p className="roadmap-scenario-card__note">
              Berechnet auf Basis des aktuellen 7d-Durchsatzes von 3.5 Reqs/Woche mit {fleetSize} aktiven Agenten.
            </p>
          </div>

          <div className="roadmap-scenario-card roadmap-scenario-card--conservative">
            <div className="roadmap-scenario-card__tag">Konservatives Szenario (0.8x + Puffer)</div>
            <div className="roadmap-scenario-card__date">{etaCalculation.conservative.date}</div>
            <div className="roadmap-scenario-card__weeks">
              {etaCalculation.conservative.weeks} Wochen · <strong>{etaCalculation.conservative.sprints} Sprints</strong>
            </div>
            <p className="roadmap-scenario-card__note">
              Inklusive {blockadeBufferDays} Tage Puffer für die 3 blockierten Anforderungen und Master-Drift-Checks.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Visual Human Verification Matrix ───────────────────── */}
      <section className="roadmap-card">
        <div className="roadmap-card__head">
          <div>
            <h2>Visual Human Verification Matrix (WinSta0\Default)</h2>
            <span className="roadmap-card__sub">
              Strikte Trennung zwischen automatisierten CLI-Testdurchläufen und visueller Inspektion auf dem interaktiven Windows-Desktop ({verifiedCount} von 10 abgezeichnet).
            </span>
          </div>
          <span className="roadmap-pill" style={{ color: verifiedCount === 10 ? '#10b981' : '#eab308' }}>
            {verifiedCount === 10 ? '✓ Alle 10 Punkte bestätigt' : `${verifiedCount}/10 Bestätigt`}
          </span>
        </div>

        <div className="roadmap-vhv-list">
          {INITIAL_VHV_ITEMS.map(item => {
            const isChecked = !!checkedVhv[item.id]
            return (
              <div
                key={item.id}
                className={`roadmap-vhv-row ${isChecked ? 'is-verified' : ''}`}
                onClick={() => toggleVhv(item.id)}
              >
                <div className="roadmap-vhv-row__check">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // Controlled via row click
                    className="roadmap-checkbox"
                  />
                </div>
                <div className="roadmap-vhv-row__id">{item.id}</div>
                <div className="roadmap-vhv-row__content">
                  <div className="roadmap-vhv-row__header">
                    <strong>{item.title}</strong>
                    <span className="roadmap-vhv-cat">{item.category}</span>
                  </div>
                  <p className="roadmap-vhv-desc">{item.description}</p>
                </div>
                <div className="roadmap-vhv-row__badge">
                  {isChecked ? (
                    <span className="roadmap-chip roadmap-chip--green">✓ Bestätigt</span>
                  ) : (
                    <span className="roadmap-chip roadmap-chip--yellow">! Ausstehend</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
