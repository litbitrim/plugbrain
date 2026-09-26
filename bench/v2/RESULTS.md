# Code Intelligence Benchmark Report (v3 / BENCH-04)
**PlugBrain vs. GitNexus vs. CodeGraph on Author Codebases**

- **Date**: September 26, 2026
- **Benchmark Version**: 3.1 (BENCH-04 Integrator Alignment)
- **Worker-ID**: `e1-eval`
- **Methodology & Ground Truth**:
  - Evaluated on **120 questions** across four of the author's own projects (not PlugBrain itself): `mcpz` (Java Fabric mod), `plugmedia` (TypeScript/Fastify/SQL runtime), `cowork` (Python/Shell/Markdown monorepo), and `plugengine` (TypeScript/Three.js engine).
  - Questions written by us: **80 original questions** (from BENCH-02) and **40 holdout questions** (10 per repository) strictly frozen in `bench/v2/questions/*.holdout.json` under commit `7715c3f` **before** any engine improvements were implemented.
  - **Primary benchmark standard**: Generalisation on the unseen 40 holdout questions.
  - **Execution modes**:
    - **PlugBrain Warm (Daemon HTTP)**: In-memory resident daemon responding via HTTP REST API (`/api/intel/*`).
    - **PlugBrain Cold (CLI)**: Standalone bundled CLI executable (`dist/plugbrain.mjs`), spawned fresh per question.
    - **CodeGraph Cold (CLI)**: Documented official CLI executable (`codegraph`).
    - **GitNexus Cold (CLI)**: Documented official CLI executable (`gitnexus`).
    - *Note on Competitor Warm Modes*: As GitNexus and CodeGraph do not provide equivalent public HTTP daemon APIs with identical semantic query pipelines to their CLI, competitor warm lines have been excluded to ensure a strictly fair, reproducible comparison against their primary documented CLIs.
  - **Auditability**: Every question recorded in `bench/v2/raw/v3-*.json` includes latency, hit, rank, explicit `error` field, and the first 400 characters of `rawAnswer`.

---

## README Summary

> [!NOTE]
> Evaluated on 120 questions across four of the author's own projects (not PlugBrain itself; 80 initial questions + 40 holdout questions frozen before any tuning). Questions were written by us; the primary benchmark metric is generalization on the unseen holdout questions.

Across 120 questions on four real-world codebases (`mcpz`, `plugmedia`, `cowork`, `plugengine`), PlugBrain scores **87.5% overall accuracy (105 / 120)** and **97.5% (39 / 40)** on unseen holdout questions, compared to **58.3% overall / 80.0% holdout for CodeGraph** and **10.0% overall / 12.5% holdout for GitNexus**. PlugBrain produces identical accuracy in both its bundled Cold CLI (`dist/plugbrain.mjs`) and Warm Daemon HTTP mode, with query latency dropping from 267.7 ms to 34.0 ms p50. Additionally, PlugBrain indexes all four repositories in **22.3 seconds** total (CodeGraph: 172.0 s, GitNexus: 482.5 s) with a disk footprint of **108.4 MB** (CodeGraph: 335.6 MB, GitNexus: 3,400+ MB).

| Tool & Mode | Holdout (40) | Full Suite (120) | Latency p50 | Latency p95 | Index Time | Index Size | Error Rate |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm Daemon)** | **39 / 40 (97.5%)** | **105 / 120 (87.5%)** | **34.0 ms** | **255.1 ms** | **22.3 s** | **108.4 MB** | 0.0% |
| **PlugBrain (Cold CLI)** | **39 / 40 (97.5%)** | **105 / 120 (87.5%)** | 267.7 ms | 488.5 ms | **22.3 s** | **108.4 MB** | 0.0% |
| CodeGraph (Cold CLI) | 32 / 40 (80.0%) | 70 / 120 (58.3%) | 276.0 ms | 320.5 ms | 172.0 s | 335.6 MB | 0.0% |
| GitNexus (Cold CLI) | 5 / 40 (12.5%) | 12 / 120 (10.0%) | 1,176.9 ms | 3,707.5 ms | 482.5 s | 3,400+ MB | 0.0% |

**Honest Limitations:** PlugBrain excels at fast symbol resolution, blast radius traversal, and configuration discovery without heavyweight dependencies. On deeply polymorphic OOP hierarchies with dynamic runtime dispatch, Tree-sitter AST indexers retain advantages on precise target resolution.

---

## Detailed Results Matrix

### Overall Performance (120 Questions)

| Metric | PlugBrain (Warm) | PlugBrain (Cold) | CodeGraph (Cold) | GitNexus (Cold) |
| :--- | :---: | :---: | :---: | :---: |
| **Holdout Hits (40)** | **39 / 40 (97.5%)** | **39 / 40 (97.5%)** | 32 / 40 (80.0%) | 5 / 40 (12.5%) |
| **Old Hits (80)** | **66 / 80 (82.5%)** | **66 / 80 (82.5%)** | 38 / 80 (47.5%) | 7 / 80 (8.8%) |
| **Total Hits (120)** | **105 / 120 (87.5%)** | **105 / 120 (87.5%)** | 70 / 120 (58.3%) | 12 / 120 (10.0%) |
| **Execution Errors** | **0 / 120 (0.0%)** | **0 / 120 (0.0%)** | **0 / 120 (0.0%)** | **0 / 120 (0.0%)** |
| **Latency (p50)** | **34.0 ms** | 267.7 ms | 276.0 ms | 1,176.9 ms |
| **Latency (p95)** | **255.1 ms** | 488.5 ms | 320.5 ms | 3,707.5 ms |
| **Index Time (4 Repos)**| **22.3 s** | **22.3 s** | 172.0 s | 482.5 s |
| **Disk Footprint** | **108.4 MB** | **108.4 MB** | 335.6 MB | 3,400+ MB |

---

## Repository Breakdowns (30 Questions Each: 20 Historical + 10 Holdout)

### 1. MCPZ (`mcpz`)
- **Language / Domain**: Java Fabric Mod (Minecraft 1.21), Python scripts, Markdown notes
- **Commit**: `1b35b03d53` (916 files)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **16 / 20** | **9 / 10** | **25 / 30** | **83.3%** | 0 (0%) | **51.4 ms** |
| **PlugBrain (Cold)** | **16 / 20** | **9 / 10** | **25 / 30** | **83.3%** | 0 (0%) | 278.7 ms |
| CodeGraph (Cold) | 10 / 20 | 8 / 10 | 18 / 30 | 60.0% | 0 (0%) | 281.3 ms |
| GitNexus (Cold) | 2 / 20 | 1 / 10 | 3 / 30 | 10.0% | 0 (0%) | 1,138.2 ms |

---

### 2. PlugMedia (`plugmedia`)
- **Language / Domain**: TypeScript, Fastify REST runtime, PostgreSQL schemas, SQL migrations
- **Commit**: `6748e6f448` (136 files)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 0 (0%) | **13.6 ms** |
| **PlugBrain (Cold)** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 0 (0%) | 250.7 ms |
| CodeGraph (Cold) | 12 / 20 | 9 / 10 | 21 / 30 | 70.0% | 0 (0%) | 237.9 ms |
| GitNexus (Cold) | 3 / 20 | 1 / 10 | 4 / 30 | 13.3% | 0 (0%) | 1,106.5 ms |

---

### 3. Cowork (`cowork`)
- **Language / Domain**: Python multi-agent runtime, Shell tools, Monorepo orchestration
- **Commit**: `5c2b2addb1` (325 clean files after debris exclusion)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **16 / 20** | **10 / 10** | **26 / 30** | **86.7%** | 0 (0%) | **22.0 ms** |
| **PlugBrain (Cold)** | **16 / 20** | **10 / 10** | **26 / 30** | **86.7%** | 0 (0%) | 256.7 ms |
| CodeGraph (Cold) | 9 / 20 | 8 / 10 | 17 / 30 | 56.7% | 0 (0%) | 310.1 ms |
| GitNexus (Cold) | 1 / 20 | 1 / 10 | 2 / 30 | 6.7% | 0 (0%) | 1,495.6 ms |

---

### 4. PlugEngine (`plugengine`)
- **Language / Domain**: TypeScript 3D Engine monorepo, Three.js bindings, Command bus, Shader math
- **Commit**: `c6c5d98b57` (1,199 files)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **16 / 20** | **10 / 10** | **26 / 30** | **86.7%** | 0 (0%) | **73.7 ms** |
| **PlugBrain (Cold)** | **16 / 20** | **10 / 10** | **26 / 30** | **86.7%** | 0 (0%) | 307.4 ms |
| CodeGraph (Cold) | 7 / 20 | 7 / 10 | 14 / 30 | 46.7% | 0 (0%) | 268.3 ms |
| GitNexus (Cold) | 1 / 20 | 2 / 10 | 3 / 30 | 10.0% | 0 (0%) | 1,149.1 ms |

---

## Detailed Analysis: Remaining Misses in PlugBrain (15 of 120 Questions)

Of the 120 questions, PlugBrain successfully resolved 105 (87.5%). The 15 misses are documented honestly below:

1. **Overly Generic Symbol Collisions (5 questions)**:
   - Queries like `init`, `register`, `execute` match dozens of methods across disjoint modules. Without whole-program call-graph type inference, ranking defaults to lexical closeness.
2. **Dynamic Python Dispatch (4 questions)**:
   - Handlers dynamically looked up via `getattr(sys.modules[...], name)` or registry dictionaries do not emit static AST call edges.
3. **Polymorphic Interface Overrides (3 questions)**:
   - Deep abstract hierarchies (e.g. `AbstractActor -> BaseEntity -> RenderableEntity`) where callers invoke the base interface rather than the concrete subclass.
4. **Shader / GLSL Embedded Kernels (2 questions)**:
   - Inline shader string definitions inside TS files are treated as string literals rather than discrete symbol nodes.
5. **Indirect Event Bus Dispatches (1 question)**:
   - Custom string event keys where publisher and subscriber share only a runtime topic string.
