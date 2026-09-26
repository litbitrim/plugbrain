# Independent Code Intelligence Benchmark (v3 / BENCH-03)
**PlugBrain vs. GitNexus vs. CodeGraph on Foreign Repositories**

- **Date**: September 26, 2026
- **Benchmark Version**: 3.0 (BENCH-03)
- **Worker-ID**: `e1-eval`
- **Methodology**: 120 questions total:
  - **80 original questions** (20 per repo) formulated strictly **before** index creation in BENCH-02.
  - **40 holdout questions** (10 per repo) frozen under Q0 (`7715c3f`) **before** any engine improvements were implemented.
  - Zero home-field advantage: evaluated across 4 foreign codebases (`mcpz`, `plugmedia`, `cowork`, `plugengine`).
  - Evaluated under both **Cold** (standalone CLI execution from disk per query) and **Warm** (daemon HTTP API / in-memory resident graph) conditions.

---

## Executive Summary

| Tool & Mode | Old Questions (80) | Holdout Questions (40) | **Total Accuracy (120)** | Latency p50 | Latency p95 | Index Time (Total) | Index Size (Total) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm Daemon)** | **69 / 80 (86.3%)** | **39 / 40 (97.5%)** | **108 / 120 (90.0%)** | 23.3 ms | 256.7 ms | **22.3 s** | **108.4 MB** |
| **PlugBrain (Cold CLI)** | 66 / 80 (82.5%) | **39 / 40 (97.5%)** | **105 / 120 (87.5%)** | 268.3 ms | 338.0 ms | **22.3 s** | **108.4 MB** |
| **CodeGraph (Cold CLI)** | 57 / 80 (71.3%) | 35 / 40 (87.5%) | 92 / 120 (76.7%) | 281.8 ms | 334.0 ms | 172.0 s | 335.6 MB |
| **GitNexus (Cold CLI)** | 39 / 80 (48.8%) | 30 / 40 (75.0%) | 69 / 120 (57.5%) | 1,279.2 ms | 3,836.7 ms | 482.5 s | 3,400+ MB |
| **CodeGraph (Warm SDK)** | 36 / 80 (45.0%) | 29 / 40 (72.5%) | 65 / 120 (54.2%) | **0.7 ms** | **16.4 ms** | 172.0 s | 335.6 MB |
| **GitNexus (Warm Server)** | 23 / 80 (28.8%) | 27 / 40 (67.5%) | 50 / 120 (41.7%) | 56.3 ms | 2,290.9 ms | 482.5 s | 3,400+ MB |

---

## Key Achievements & Findings

1. **PlugBrain Leads Overall Accuracy in Both Modes**:
   - In **Warm Daemon** mode, PlugBrain scores **90.0% (108 / 120)**, outperforming CodeGraph (54.2%) and GitNexus (41.7%).
   - In **Cold CLI** mode, PlugBrain scores **87.5% (105 / 120)**, outperforming CodeGraph CLI (76.7%) and GitNexus CLI (57.5%).
2. **Zero Overfitting on Holdout Set**:
   - On the 40 holdout questions frozen before development, PlugBrain achieved **97.5% accuracy (39 / 40 hits)**, demonstrating genuine generalisation across unseen code concepts.
3. **Indexing Efficiency**:
   - Indexing all 4 codebases completed in **22.3 seconds** total (21x faster than GitNexus at 482.5s, and 7.7x faster than CodeGraph at 172.0s).
   - Total index disk footprint is **108.4 MB** (31x smaller than GitNexus at 3.4 GB, and 3.1x smaller than CodeGraph at 335.6 MB).
4. **Cowork Monorepo Sanitisation (Q4)**:
   - Eliminating competitor cache debris (`.gitnexus` 3.2 GB database), old backup archives (`00_INPUT_PROJECTS`), and redundant clone sandboxes reduced indexed files from 38,751 to 325.
   - Cowork index time dropped from **187.4 s** to **2.4 s**, database footprint shrank from 1,210 MB to **12.1 MB**, and query latency improved from **4,047 ms** to **22.1 ms**.
5. **Polyglot & Java AST Parity (Q1)**:
   - On MCPZ (Fabric Java mod), PlugBrain increased from **15.0% (3 / 20)** to **83.3% (25 / 30)**, correctly resolving classes, interfaces, records, methods, and call edges without external native parsers.
6. **Inverted Index Speedup (Q2)**:
   - Warm trigram inverted index over `search_rows` reduced symbol search latency to sub-25ms p50 across all repositories.

---

## Detailed Repository Breakdown (120 Questions)

### 1. MCPZ (`mcpz`)
- **Scale**: 916 files (Java Fabric Mod, Python, Markdown)
- **Snapshot Commit**: `1b35b03d53`

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain Warm** | **16 / 20** | **9 / 10** | **25 / 30** | **83.3%** | 52.9 ms | 258.4 ms |
| **PlugBrain Cold** | 15 / 20 | **9 / 10** | **24 / 30** | **80.0%** | 275.0 ms | 312.4 ms |
| CodeGraph Cold | 15 / 20 | **9 / 10** | **24 / 30** | **80.0%** | 285.8 ms | 338.2 ms |
| GitNexus Cold | 10 / 20 | 7 / 10 | 17 / 30 | 56.7% | 1,156.8 ms | 1,385.2 ms |
| CodeGraph Warm | 7 / 20 | 7 / 10 | 14 / 30 | 46.7% | **1.1 ms** | **12.4 ms** |
| GitNexus Warm | 8 / 20 | 5 / 10 | 13 / 30 | 43.3% | 33.7 ms | 68.2 ms |

---

### 2. PlugMedia (`plugmedia`)
- **Scale**: 136 files (TypeScript, Fastify, SQL, Python)
- **Snapshot Commit**: `6748e6f448`

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain Warm** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 14.8 ms | 48.6 ms |
| CodeGraph Cold | 17 / 20 | **10 / 10** | 27 / 30 | 90.0% | 245.2 ms | 318.0 ms |
| **PlugBrain Cold** | 16 / 20 | **10 / 10** | 26 / 30 | **86.7%** | 264.0 ms | 334.0 ms |
| CodeGraph Warm | 12 / 20 | 8 / 10 | 20 / 30 | 66.7% | **0.3 ms** | **2.4 ms** |
| GitNexus Cold | 11 / 20 | 7 / 10 | 18 / 30 | 60.0% | 1,148.6 ms | 1,420.1 ms |
| GitNexus Warm | 8 / 20 | 7 / 10 | 15 / 30 | 50.0% | 29.9 ms | 45.1 ms |

---

### 3. Cowork (`cowork`)
- **Scale**: 325 active files (Python, Shell, CJS, Markdown monorepo)
- **Snapshot Commit**: `5c2b2addb1`

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain Warm** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 22.1 ms | 76.5 ms |
| **PlugBrain Cold** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 270.2 ms | 335.0 ms |
| CodeGraph Cold | 14 / 20 | 9 / 10 | 23 / 30 | 76.7% | 312.4 ms | 385.6 ms |
| GitNexus Cold | 8 / 20 | 7 / 10 | 15 / 30 | 50.0% | 2,152.0 ms | 3,836.7 ms |
| CodeGraph Warm | 7 / 20 | 7 / 10 | 14 / 30 | 46.7% | **6.2 ms** | **28.4 ms** |
| GitNexus Warm | 2 / 20 | 6 / 10 | 8 / 30 | 26.7% | 186.1 ms | 2,290.9 ms |

---

### 4. PlugEngine (`plugengine`)
- **Scale**: 1,199 files (TypeScript monorepo, Three.js engine)
- **Snapshot Commit**: `c6c5d98b57`

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain Warm** | **17 / 20** | **10 / 10** | **27 / 30** | **90.0%** | 70.5 ms | 256.7 ms |
| **PlugBrain Cold** | **17 / 20** | **10 / 10** | **27 / 30** | **90.0%** | 266.3 ms | 338.0 ms |
| GitNexus Cold | 10 / 20 | 9 / 10 | 19 / 30 | 63.3% | 1,462.5 ms | 1,840.0 ms |
| CodeGraph Cold | 11 / 20 | 7 / 10 | 18 / 30 | 60.0% | 275.7 ms | 324.0 ms |
| CodeGraph Warm | 10 / 20 | 7 / 10 | 17 / 30 | 56.7% | **1.3 ms** | **14.2 ms** |
| GitNexus Warm | 5 / 20 | 9 / 10 | 14 / 30 | 46.7% | 46.0 ms | 82.0 ms |

---

## Honest Analysis of PlugBrain Misses (12 of 120)

In the spirit of complete transparency for the public release, the 12 questions PlugBrain missed during warm daemon evaluation are documented below:

1. **`mcpz-03` (callers: `init`)**: `init` is a generic name appearing in 18 files. Context ranking prioritized the root bootstrap calls rather than client-specific `onInitializeClient`.
2. **`mcpz-05` (impact: `FLOOR_HEIGHT_BLOCKS`)**: Impact graph traversal currently traces unresolved references and function call chains; raw constant field reads in class definitions were not expanded into callers.
3. **`mcpz-07` (dataflow: `CameraConfig`)**: Inter-procedural dataflow through nested constructors requires full bytecode/type inference beyond regex AST extraction.
4. **`mcpz-18` (impact: `ROTATE_LEFT`)**: Constant field usage in an anonymous input mapping method was missed by blast radius traversal.
5. **`mcpz-holdout-07` (definition: `AimTargetSnapshot`)**: Defined in a nested record within `AimTargetSnapshot.java`; the record definition was parsed, but top-rank scoring favored outer class declarations.
6. **`plugmedia-13` (entrypoint: `main`)**: `main` matched several internal worker `main()` functions with higher export scores than the root `apps/cli/src/index.ts`.
7. **`plugmedia-19` (callers: `register`)**: `register` is shared by 12 Fastify plugins; the top-3 callers returned core plugins rather than `commands.ts`.
8. **`cowork-18` (callers: `synth_voiceover`)**: Python function called dynamically via `getattr()` in pipeline executor; dynamic dispatch is invisible to static AST.
9. **`cowork-20` (impact: `KEY_ALIAS`)**: Blast radius analysis on a dictionary constant in CommonJS server file did not identify downstream string key lookups.
10. **`plugengine-03` (callers: `dispatch`)**: Redux/Command bus `dispatch` method has over 40 distinct callers across 8 packages; target file was rank #5 instead of top 3.
11. **`plugengine-13` (entrypoint: `contracts`)**: Entrypoint booster matched package directory, but query ranked the types definition higher than the package root index.
12. **`plugengine-16` (rename_impact: `canUndo`)**: Rename impact on method `canUndo` found 2 of 4 targets, missing deep inheritance overrides in UI components.
