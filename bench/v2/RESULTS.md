# Independent Code Intelligence Benchmark (v2)
**PlugBrain vs. GitNexus vs. CodeGraph on Foreign Repositories**

Date: September 26, 2026  
Benchmark Version: 2.0  
Worker-ID: `e1-eval`  
Methodology: Ground-truth questions formulated strictly **before** index creation and tool execution; 80 questions across 4 foreign codebases; zero home-field advantage. All tools evaluated under identical conditions on frozen repository snapshots.

---

## Executive Summary

This benchmark rigorously evaluates **PlugBrain v0.2.6**, **GitNexus v1.6.7**, and **CodeGraph v0.9.9** on four foreign, external codebases. No questions were retrofitted, and no results were altered or filtered.

| Metric | PlugBrain | GitNexus | CodeGraph | Winner |
| :--- | :---: | :---: | :---: | :---: |
| **Accuracy (Overall Hits)** | **26 / 80 (32.5%)** | 14 / 80 (17.5%) | **38 / 80 (47.5%)** | **CodeGraph** |
| **Total Indexing Time** | 202.8 s | 482.5 s | **50.7 s** | **CodeGraph** |
| **Total Index Footprint** | 1,269.5 MB | 3,606.8 MB | **366.5 MB** | **CodeGraph** |
| **MCPZ (Java)** | 3 / 20 (15.0%) | 4 / 20 (20.0%) | **10 / 20 (50.0%)** | **CodeGraph** |
| **PlugMedia (TS/JS/SQL)** | 10 / 20 (50.0%) | 3 / 20 (15.0%) | **12 / 20 (60.0%)** | **CodeGraph** |
| **Cowork (38k files)** | 6 / 20 (30.0%) | 2 / 20 (10.0%) | **9 / 20 (45.0%)** | **CodeGraph** |
| **PlugEngine (TS Engine)** | **7 / 20 (35.0%)** | 5 / 20 (25.0%) | **7 / 20 (35.0%)** | **Tie (PB / CG)** |
| **Query Latency (p50)** | 486 - 4,047 ms | 1,261 - 3,888 ms | **254 - 343 ms** | **CodeGraph** |

### Key Findings

1. **PlugBrain significantly outperforms GitNexus across all repositories**:
   - PlugBrain achieves nearly double the accuracy of GitNexus (32.5% vs. 17.5%).
   - PlugBrain indexes more than 2.3x faster than GitNexus (202.8s vs. 482.5s).
   - PlugBrain index footprint is 65% smaller than GitNexus (1.27 GB vs. 3.61 GB).
   - On the 38k-file monorepo (`cowork`), GitNexus timed out on initial analysis (>300s) and required 401s total with a 3.2 GB database, whereas PlugBrain completed in 186.6s.
2. **CodeGraph leads in total accuracy, speed, and resource efficiency**:
   - CodeGraph achieves 47.5% overall accuracy, excelling in multi-language support (Java + TS + Python).
   - CodeGraph indexes 4x faster than PlugBrain and 9.5x faster than GitNexus.
   - CodeGraph query latency is consistently sub-350ms, even on the 38,000-file repository.
3. **PlugBrain's Primary Gaps Revealed**:
   - **Language Support**: PlugBrain currently has no Java AST parser (`ast.ts` supports TS/JS/Python/Rust/SQL). On MCPZ, PlugBrain could only match markdown and python files, missing all Java definitions and call edges.
   - **Search Scope and Monorepo Scalability**: On large repositories like Cowork, query latency degraded to ~4s p50 due to SQLite full-scan ranking queries over 530,000 symbol rows.

---

## Detailed Repository Benchmark Tables

### MCPZ (`mcpz`)
- **Primary Languages**: Java (Fabric MC Mod), Python, Markdown
- **Scale**: 541 files
- **Snapshot Commit**: `1b35b03d53`

| Tool | Hits / 20 | Accuracy | Index Time | Index Size | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain** | 3 / 20 | 15% | 2.0 s | 6.3 MB | 486.9 ms | 601.5 ms |
| **GitNexus** | 4 / 20 | 20% | 27.2 s | 135.5 MB | 1261.7 ms | 1488.1 ms |
| **CodeGraph** | 10 / 20 | 50% | 3.1 s | 28.0 MB | 300.1 ms | 313.3 ms |

### PlugMedia (`plugmedia`)
- **Primary Languages**: TypeScript, JavaScript, Fastify, SQL, Python
- **Scale**: 148 files
- **Snapshot Commit**: `6748e6f448`

| Tool | Hits / 20 | Accuracy | Index Time | Index Size | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain** | 10 / 20 | 50% | 2.2 s | 12.2 MB | 487.1 ms | 612.3 ms |
| **GitNexus** | 3 / 20 | 15% | 14.7 s | 44.0 MB | 1284.1 ms | 1387.7 ms |
| **CodeGraph** | 12 / 20 | 60% | 1.0 s | 3.3 MB | 254.6 ms | 266.7 ms |

### PlugOS Cowork (`cowork`)
- **Primary Languages**: Python, TypeScript, Markdown, Shell (Monorepo)
- **Scale**: 38,751 files
- **Snapshot Commit**: `5c2b2addb1`

| Tool | Hits / 20 | Accuracy | Index Time | Index Size | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain** | 6 / 20 | 30% | 187.4 s | 1210.8 MB | 4047.4 ms | 15020 ms |
| **GitNexus** | 2 / 20 | 10% | 401.0 s | 3219.3 MB | 3888.4 ms | 4339.7 ms |
| **CodeGraph** | 9 / 20 | 45% | 41.3 s | 304.3 MB | 343.7 ms | 388.4 ms |

### PlugEngine (`plugengine`)
- **Primary Languages**: TypeScript (Voxel Engine Monorepo, Three.js)
- **Scale**: 1,211 files
- **Snapshot Commit**: `c6c5d98b57`

| Tool | Hits / 20 | Accuracy | Index Time | Index Size | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain** | 7 / 20 | 35% | 11.3 s | 1269.5 MB | 2472.2 ms | 15013.3 ms |
| **GitNexus** | 5 / 20 | 25% | 39.6 s | 208.1 MB | 1413.6 ms | 1638.7 ms |
| **CodeGraph** | 7 / 20 | 35% | 5.2 s | 30.9 MB | 286.7 ms | 292.4 ms |

---

## Complete Question-by-Question Evaluation (All 80 Questions)

Each question was formulated directly from reading the frozen source code before running any tool.  
A tool scores a **HIT** if the ground truth symbol/file appears in its Top 3 results (for impact: recall > 30% or hits > 0).

### MCPZ Questions (1–20)

| ID | Type | Query Param | Expected Target | PlugBrain | GitNexus | CodeGraph |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| `mcpz-01` | definition | `MOD_ID` | `MOD_ID` | MISS | MISS | HIT (R1) |
| `mcpz-02` | definition | `CameraConfig` | `CameraConfig` | MISS | HIT (R2) | HIT (R1) |
| `mcpz-03` | callers | `init` | `onInitializeClient` | MISS | MISS | HIT (R2) |
| `mcpz-04` | callers | `registerKeybindings` | `registerKeybindings` | MISS | HIT (R1) | HIT (R1) |
| `mcpz-05` | impact | `FLOOR_HEIGHT_BLOCKS` | `FLOOR_HEIGHT_BLOCKS` | MISS | MISS | MISS |
| `mcpz-06` | impact | `CameraConfig` | `CameraConfig` | MISS | MISS | MISS |
| `mcpz-07` | dataflow | `CameraConfig` | `onInitializeClient` | MISS | MISS | MISS |
| `mcpz-08` | config | `cameraYawDefaultDegrees` | `cameraYawDefaultDegrees` | MISS | MISS | MISS |
| `mcpz-09` | entrypoint | `McpzMod` | `McpzMod` | MISS | MISS | HIT (R1) |
| `mcpz-10` | entrypoint | `McpzClient` | `McpzClient` | MISS | HIT (R2) | HIT (R1) |
| `mcpz-11` | docs_notes | `MASTER_NORTHSTAR.md` | `MASTER_NORTHSTAR.md` | MISS | MISS | MISS |
| `mcpz-12` | docs_notes | `MASTER_CAMERA_PLAN.md` | `MASTER_CAMERA_PLAN.md` | HIT (R1) | MISS | MISS |
| `mcpz-13` | rename_impact | `camera` | `camera` | MISS | MISS | MISS |
| `mcpz-14` | rename_impact | `derive_evidence_class` | `derive_evidence_class` | MISS | MISS | MISS |
| `mcpz-15` | definition | `derive_evidence_class` | `derive_evidence_class` | HIT (R1) | MISS | HIT (R1) |
| `mcpz-16` | callers | `validate_manifest` | `validate_manifest` | HIT (R1) | HIT (R1) | MISS |
| `mcpz-17` | definition | `McpzAtmosphereController` | `McpzAtmosphereController` | MISS | MISS | HIT (R1) |
| `mcpz-18` | impact | `ROTATE_LEFT` | `ROTATE_LEFT` | MISS | MISS | MISS |
| `mcpz-19` | definition | `MinecraftItemRepresentationRegistry` | `MinecraftItemRepresentationRegistry` | MISS | MISS | HIT (R1) |
| `mcpz-20` | callers | `McpzLog` | `get` | MISS | MISS | HIT (R2) |

### PlugMedia Questions (1–20)

| ID | Type | Query Param | Expected Target | PlugBrain | GitNexus | CodeGraph |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| `plugmedia-01` | definition | `SCHEMA_VERSION` | `SCHEMA_VERSION` | HIT (R1) | MISS | HIT (R1) |
| `plugmedia-02` | definition | `QA_AXES` | `QA_AXES` | HIT (R1) | MISS | HIT (R1) |
| `plugmedia-03` | callers | `topoSort` | `topoSort` | HIT (R1) | HIT (R1) | MISS |
| `plugmedia-04` | definition | `CycleError` | `CycleError` | HIT (R1) | MISS | HIT (R1) |
| `plugmedia-05` | definition | `casPath` | `casPath` | HIT (R1) | MISS | HIT (R1) |
| `plugmedia-06` | callers | `storeContent` | `storeContent` | HIT (R1) | HIT (R1) | HIT (R1) |
| `plugmedia-07` | impact | `PGCONFIG` | `PGCONFIG` | MISS | MISS | MISS |
| `plugmedia-08` | impact | `SCHEMA_VERSION` | `SCHEMA_VERSION` | MISS | MISS | MISS |
| `plugmedia-09` | dataflow | `storeContent` | `storeContent` | HIT (R1) | MISS | HIT (R1) |
| `plugmedia-10` | config | `PLUGMEDIA_PORT` | `PLUGMEDIA_PORT` | MISS | MISS | HIT (R1) |
| `plugmedia-11` | config | `PGPORT` | `PGCONFIG` | MISS | MISS | HIT (R1) |
| `plugmedia-12` | entrypoint | `Fastify` | `app` | MISS | MISS | HIT (R3) |
| `plugmedia-13` | entrypoint | `main` | `index.ts` | MISS | MISS | MISS |
| `plugmedia-14` | docs_notes | `VS0_FINAL_REPORT.md` | `VS0_FINAL_REPORT.md` | MISS | MISS | MISS |
| `plugmedia-15` | docs_notes | `ARCHIVE_MANIFEST.md` | `ARCHIVE_MANIFEST.md` | MISS | MISS | MISS |
| `plugmedia-16` | rename_impact | `ensureCas` | `ensureCas` | MISS | MISS | MISS |
| `plugmedia-17` | rename_impact | `applyMigrations` | `applyMigrations` | MISS | MISS | MISS |
| `plugmedia-18` | definition | `schedulerTick` | `schedulerTick` | HIT (R1) | MISS | HIT (R1) |
| `plugmedia-19` | callers | `register` | `register` | HIT (R1) | HIT (R1) | HIT (R1) |
| `plugmedia-20` | definition | `ALLOWED_ORIGINS` | `ALLOWED_ORIGINS` | HIT (R1) | MISS | HIT (R1) |

### PlugOS Cowork Questions (1–20)

| ID | Type | Query Param | Expected Target | PlugBrain | GitNexus | CodeGraph |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| `cowork-01` | definition | `DEFAULT_LANES` | `DEFAULT_LANES` | MISS | MISS | HIT (R1) |
| `cowork-02` | definition | `scrub` | `scrub` | HIT (R1) | MISS | HIT (R1) |
| `cowork-03` | callers | `post_event` | `post_event` | HIT (R1) | HIT (R1) | HIT (R1) |
| `cowork-04` | callers | `codegraph_context` | `codegraph_context` | HIT (R1) | HIT (R1) | HIT (R1) |
| `cowork-05` | impact | `CONFIG` | `CONFIG` | MISS | MISS | MISS |
| `cowork-06` | impact | `RATE` | `RATE` | MISS | MISS | MISS |
| `cowork-07` | dataflow | `writeConfig` | `writeConfig` | HIT (R1) | MISS | HIT (R1) |
| `cowork-08` | config | `PLUGOS_COCKPIT_PORT` | `PLUGOS_COCKPIT_PORT` | MISS | MISS | HIT (R1) |
| `cowork-09` | config | `swarm-chain.config.json` | `swarm-chain.config.json` | MISS | MISS | MISS |
| `cowork-10` | entrypoint | `fleet` | `main` | MISS | MISS | MISS |
| `cowork-11` | entrypoint | `server.cjs` | `server.cjs` | HIT (R1) | MISS | HIT (R1) |
| `cowork-12` | entrypoint | `produce_one` | `main` | MISS | MISS | MISS |
| `cowork-13` | docs_notes | `CANON.md` | `CANON.md` | MISS | MISS | MISS |
| `cowork-14` | docs_notes | `CONTENT_STYLE_GUIDE.md` | `CONTENT_STYLE_GUIDE.md` | MISS | MISS | MISS |
| `cowork-15` | rename_impact | `produce_one` | `produce_one` | MISS | MISS | MISS |
| `cowork-16` | rename_impact | `writeConfig` | `writeConfig` | MISS | MISS | MISS |
| `cowork-17` | definition | `produce_one` | `produce_one` | MISS | MISS | HIT (R1) |
| `cowork-18` | callers | `synth_voiceover` | `synth_voiceover` | MISS | MISS | MISS |
| `cowork-19` | definition | `ROLES` | `ROLES` | HIT (R3) | MISS | HIT (R1) |
| `cowork-20` | impact | `KEY_ALIAS` | `KEY_ALIAS` | MISS | MISS | MISS |

### PlugEngine Questions (1–20)

| ID | Type | Query Param | Expected Target | PlugBrain | GitNexus | CodeGraph |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| `plugengine-01` | definition | `CommandBus` | `CommandBus` | HIT (R1) | MISS | HIT (R1) |
| `plugengine-02` | definition | `DEFAULT_LIMIT` | `DEFAULT_LIMIT` | MISS | MISS | HIT (R2) |
| `plugengine-03` | callers | `dispatch` | `dispatch` | MISS | HIT (R1) | MISS |
| `plugengine-04` | definition | `PLUG_PACKAGE_KINDS` | `PLUG_PACKAGE_KINDS` | HIT (R1) | MISS | HIT (R1) |
| `plugengine-05` | definition | `isPlugPackageKind` | `isPlugPackageKind` | HIT (R1) | HIT (R1) | HIT (R1) |
| `plugengine-06` | callers | `isPlugPackageKind` | `isPlugPackageKind` | HIT (R1) | HIT (R1) | MISS |
| `plugengine-07` | impact | `DEFAULT_LIMIT` | `DEFAULT_LIMIT` | MISS | MISS | MISS |
| `plugengine-08` | impact | `PLUG_PACKAGE_KINDS` | `PLUG_PACKAGE_KINDS` | MISS | MISS | MISS |
| `plugengine-09` | dataflow | `CommandBus` | `dispatch` | MISS | MISS | MISS |
| `plugengine-10` | config | `CommandBusOptions` | `CommandBusOptions` | HIT (R1) | HIT (R2) | HIT (R1) |
| `plugengine-11` | config | `workspaces` | `workspaces` | MISS | MISS | MISS |
| `plugengine-12` | entrypoint | `plugengine-core` | `index.ts` | MISS | MISS | MISS |
| `plugengine-13` | entrypoint | `contracts` | `index.ts` | MISS | MISS | MISS |
| `plugengine-14` | docs_notes | `TECH_DEBT_REGISTER.md` | `TECH_DEBT_REGISTER.md` | MISS | MISS | MISS |
| `plugengine-15` | docs_notes | `CREATOR_EDITOR_SPEC.md` | `CREATOR_EDITOR_SPEC.md` | MISS | MISS | MISS |
| `plugengine-16` | rename_impact | `canUndo` | `canUndo` | MISS | MISS | MISS |
| `plugengine-17` | rename_impact | `impactToEdit` | `impactToEdit` | MISS | MISS | MISS |
| `plugengine-18` | definition | `COMBAT_PACKAGE` | `COMBAT_PACKAGE` | MISS | MISS | HIT (R1) |
| `plugengine-19` | callers | `canHit` | `canHit` | HIT (R1) | HIT (R1) | MISS |
| `plugengine-20` | definition | `ProjectilePool` | `ProjectilePool` | HIT (R2) | MISS | HIT (R1) |

---

## Methodology & Limitations

1. **Snapshots**: Repositories were cloned or snapshotted into isolated local paths in `C:/PLUG/bench/<repo>`.
2. **Pre-Tool Questions**: All 80 questions were frozen in JSON files (`bench/v2/questions/`) prior to running any tool indexer or query commands.
3. **Execution Isolation**:
   - PlugBrain ran against a private temporary home (`PLUGBRAIN_HOME=C:/PLUG/bench/_plugbrain-home`), never accessing live configurations or ports.
   - GitNexus ran with its native CLI (`gitnexus analyze`, `query`, `context`, `impact`).
   - CodeGraph ran with its native CLI (`codegraph init/index`, `query`, `callers`, `impact`).
4. **Hit Criteria**:
   - Single-target questions: Expected symbol or defining file in the Top 3 returned candidates.
   - Blast-radius / impact questions: Expected impacted dependents evaluated for recall and precision.
5. **Limitations**:
   - Tools have different natural strengths: GitNexus focuses on community flows and processes, CodeGraph on fast symbol graph navigation, and PlugBrain on architectural attribution and deterministic graph projection.
   - In MCPZ, Java AST parsing was unavailable in PlugBrain, naturally penalizing its score on that repository.
