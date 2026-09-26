# Code Intelligence Benchmark Report (v3.2 / BENCH-05)
**PlugBrain vs. CodeGraph vs. GitNexus on Real-World Projects**

- **Date**: September 26, 2026
- **Benchmark Version**: 3.2 (BENCH-05 Fair Evaluation Alignment)
- **Worker-ID**: `e1-eval`
- **Methodology & Ground Truth**:
  - Evaluated on **120 questions** across four of the author's own projects (not PlugBrain itself): `mcpz` (Java Fabric mod), `plugmedia` (TypeScript/Fastify/SQL runtime), `cowork` (Python/Shell/Markdown monorepo), and `plugengine` (TypeScript/Three.js engine).
  - Questions written by us: **80 historical questions** (from BENCH-02) and **40 holdout questions** (10 per repository) strictly frozen in `bench/v2/questions/*.holdout.json` under commit `7715c3f` **before** any engine improvements were implemented.
  - **Standard of Fairness**:
    - Full raw outputs are evaluated across all tools; truncation to 400 characters is applied strictly for audit storage in `rawAnswer`.
    - Canonical tool interface per question type: Definition queries in GitNexus route to `context <name>` for exact symbol inspection, while CodeGraph routes to `query <name> --json` and `callers <name> --json`.
    - Unified candidate parsing across all response schemas (`candidates[].filePath`, `target.filePath`, `symbol.filePath`, `affected[].filePath`, `callers[].filePath`, `incoming.*`, `definitions[].filePath`), applying the identical top-3 ranking rule to all tools.
    - Cold vs. Warm parity verified: PlugBrain Cold CLI and Warm Daemon achieve **100% identical accuracy (106 / 120)**. Competitor warm modes are omitted from comparison because CodeGraph has no public daemon (CLI-only) and GitNexus's `eval-server` formats markdown text rather than structured JSON, creating unfair harness drift.
  - **Auditability**: Every question recorded in `bench/v2/raw/v3-*.json` includes latency, hit, rank, explicit `error` field, and the first 400 characters of `rawAnswer`.

---

## README Summary

> [!NOTE]
> Evaluated on 120 questions across four of the author's own projects (not PlugBrain itself; 80 initial questions + 40 holdout questions frozen before any tuning). Questions were written by us; the primary benchmark standard is generalization on the unseen holdout questions.

Across 120 questions on four real-world codebases (`mcpz`, `plugmedia`, `cowork`, `plugengine`), PlugBrain scores **88.3% overall accuracy (106 / 120)** and **95.0% (38 / 40)** on unseen holdout questions, leading CodeGraph (**85.8% overall / 95.0% holdout**) and GitNexus (**75.0% overall / 90.0% holdout**). PlugBrain delivers identical accuracy in both its bundled Cold CLI (`dist/plugbrain.mjs`) and Warm Daemon HTTP mode, with query latency dropping from 265.2 ms to 33.0 ms p50. Additionally, PlugBrain indexes all four repositories in **22.3 seconds** total (CodeGraph: 172.0 s, GitNexus: 482.5 s) with a disk footprint of **108.4 MB** (CodeGraph: 335.6 MB, GitNexus: 3,400+ MB).

| Tool & Mode | Holdout (40) | Full Suite (120) | Latency p50 | Latency p95 | Index Time | Index Size | Error Rate |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm Daemon)** | **38 / 40 (95.0%)** | **106 / 120 (88.3%)** | **33.0 ms** | **274.8 ms** | **22.3 s** | **108.4 MB** | 0.0% |
| **PlugBrain (Cold CLI)** | **38 / 40 (95.0%)** | **106 / 120 (88.3%)** | 265.2 ms | 478.1 ms | **22.3 s** | **108.4 MB** | 0.0% |
| CodeGraph (Cold CLI) | **38 / 40 (95.0%)** | 103 / 120 (85.8%) | 279.7 ms | 311.3 ms | 172.0 s | 335.6 MB | 0.0% |
| GitNexus (Cold CLI) | 36 / 40 (90.0%) | 90 / 120 (75.0%) | 1,133.9 ms | 3,465.1 ms | 482.5 s | 3,400+ MB | 0.0% |

**Honest Limitations:** PlugBrain excels at high-speed symbol retrieval, blast radius exploration, notes search, and compact index footprints without native toolchains. On deeply polymorphic OOP hierarchies with dynamic runtime dispatch, CodeGraph's Tree-sitter AST indexer retains advantages on call edge completeness.

---

## Detailed Performance Matrix

### Overall Performance (120 Questions)

| Metric | PlugBrain (Warm) | PlugBrain (Cold) | CodeGraph (Cold) | GitNexus (Cold) |
| :--- | :---: | :---: | :---: | :---: |
| **Holdout Hits (40)** | **38 / 40 (95.0%)** | **38 / 40 (95.0%)** | **38 / 40 (95.0%)** | 36 / 40 (90.0%) |
| **Old Hits (80)** | **68 / 80 (85.0%)** | **68 / 80 (85.0%)** | 65 / 80 (81.3%) | 54 / 80 (67.5%) |
| **Total Hits (120)** | **106 / 120 (88.3%)** | **106 / 120 (88.3%)** | 103 / 120 (85.8%) | 90 / 120 (75.0%) |
| **Execution Errors** | **0 / 120 (0.0%)** | **0 / 120 (0.0%)** | **0 / 120 (0.0%)** | **0 / 120 (0.0%)** |
| **Latency (p50)** | **33.0 ms** | 265.2 ms | 279.7 ms | 1,133.9 ms |
| **Latency (p95)** | **274.8 ms** | 478.1 ms | 311.3 ms | 3,465.1 ms |
| **Index Time (4 Repos)**| **22.3 s** | **22.3 s** | 172.0 s | 482.5 s |
| **Disk Footprint** | **108.4 MB** | **108.4 MB** | 335.6 MB | 3,400+ MB |

---

## Repository Breakdowns (30 Questions Each: 20 Historical + 10 Holdout)

### 1. MCPZ (`mcpz`)
- **Language / Domain**: Java Fabric Mod (Minecraft 1.21), Python tools, Markdown notes
- **Commit**: `1b35b03d53` (916 files)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **CodeGraph (Cold)** | **15 / 20** | **9 / 10** | **24 / 30** | **80.0%** | 0 (0%) | 287.0 ms |
| **PlugBrain (Warm)** | **15 / 20** | 8 / 10 | 23 / 30 | 76.7% | 0 (0%) | **50.6 ms** |
| **PlugBrain (Cold)** | **15 / 20** | 8 / 10 | 23 / 30 | 76.7% | 0 (0%) | 280.2 ms |
| GitNexus (Cold) | 12 / 20 | 8 / 10 | 20 / 30 | 66.7% | 0 (0%) | 1,120.4 ms |

---

### 2. PlugMedia (`plugmedia`)
- **Language / Domain**: TypeScript, Fastify REST runtime, PostgreSQL schemas, SQL migrations
- **Commit**: `6748e6f448` (136 files)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **19 / 20** | **10 / 10** | **29 / 30** | **96.7%** | 0 (0%) | **13.1 ms** |
| **PlugBrain (Cold)** | **19 / 20** | **10 / 10** | **29 / 30** | **96.7%** | 0 (0%) | 246.1 ms |
| CodeGraph (Cold) | 18 / 20 | **10 / 10** | 28 / 30 | 93.3% | 0 (0%) | 239.4 ms |
| GitNexus (Cold) | 16 / 20 | **10 / 10** | 26 / 30 | 86.7% | 0 (0%) | 1,102.1 ms |

---

### 3. Cowork (`cowork`)
- **Language / Domain**: Python multi-agent runtime, Shell tools, Monorepo orchestration
- **Commit**: `5c2b2addb1` (325 clean files after debris exclusion)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 0 (0%) | **20.9 ms** |
| **PlugBrain (Cold)** | **18 / 20** | **10 / 10** | **28 / 30** | **93.3%** | 0 (0%) | 250.7 ms |
| CodeGraph (Cold) | 17 / 20 | **10 / 10** | 27 / 30 | 90.0% | 0 (0%) | 302.7 ms |
| GitNexus (Cold) | 12 / 20 | 9 / 10 | 21 / 30 | 70.0% | 0 (0%) | 1,360.3 ms |

---

### 4. PlugEngine (`plugengine`)
- **Language / Domain**: TypeScript 3D Engine monorepo, Three.js bindings, Command bus, Shader math
- **Commit**: `c6c5d98b57` (1,199 files)

| Tool / Run | Old (20) | Holdout (10) | Total (30) | Accuracy | Errors | Latency p50 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm)** | **16 / 20** | **10 / 10** | **26 / 30** | **86.7%** | 0 (0%) | **70.5 ms** |
| **PlugBrain (Cold)** | **16 / 20** | **10 / 10** | **26 / 30** | **86.7%** | 0 (0%) | 299.3 ms |
| CodeGraph (Cold) | 15 / 20 | 9 / 10 | 24 / 30 | 80.0% | 0 (0%) | 272.0 ms |
| GitNexus (Cold) | 14 / 20 | 9 / 10 | 23 / 30 | 76.7% | 0 (0%) | 1,128.2 ms |

---

## Manual Verification of Misses (Sample of 10 per Tool)

To verify evaluation honesty and eliminate harness bias, 10 sampled misses per tool were manually inspected against the ground truth definitions and raw CLI outputs:

### 1. PlugBrain Sample Misses (10 of 14)

1. **`mcpz-03`** (Callers): *Which method initializes the client runtime McpzRuntime.init?*
   - **Expected**: `src/client/java/net/mcpz/client/McpzClient.java` (`onInitializeClient`)
   - **Delivered**: `status: "ambiguous"` with candidates `McpzSaveData.init`, `McpzRuntime.init`, `McpzBodyScreen.init`.
   - **Root Cause**: `init` is overloaded across dozens of classes; without namespace-qualified context, the caller target was not in the top 3 candidates.
2. **`mcpz-05`** (Impact): *What is impacted if McpzConstants.FLOOR_HEIGHT_BLOCKS is changed?*
   - **Expected**: `src/main/java/net/mcpz/McpzConstants.java` (targets: `McpzMod.java`, `McpzCameraController.java`)
   - **Delivered**: `totalImpacted: 0`
   - **Root Cause**: Static field references without explicit invocation AST edges resulted in an empty blast radius.
3. **`mcpz-07`** (Dataflow): *How do camera configuration values flow from config files into runtime camera behavior?*
   - **Expected**: `src/client/java/net/mcpz/client/McpzClient.java`
   - **Delivered**: `CameraConfig.java` (rank 1), `McpzConfig.java` (rank 2).
   - **Root Cause**: Concept search returned the data definitions rather than the runtime consumer file.
4. **`mcpz-18`** (Impact): *What is impacted if McpzControlMap.ROTATE_LEFT key name is changed?*
   - **Expected**: `src/client/java/net/mcpz/client/input/McpzControlMap.java`
   - **Delivered**: `totalImpacted: 0`
   - **Root Cause**: Static keybinding mapping field has no outgoing call edges in the AST.
5. **`mcpz-20`** (Callers): *Where is McpzLog.get called to obtain subsystem loggers?*
   - **Expected**: `src/main/java/net/mcpz/log/McpzLog.java`
   - **Delivered**: Definition of `McpzLog` class, but `incoming.calls` list did not rank the caller files in top 3.
   - **Root Cause**: Static factory methods with hundreds of callers require broader candidate rank limits.
6. **`mcpz-holdout-05`** (Callers): *Where is ModuleRegistry.initializeAll called during server/mod initialization?*
   - **Expected**: `src/main/java/net/mcpz/module/ModuleRegistry.java`
   - **Delivered**: `incoming.calls: []`
   - **Root Cause**: Called via dynamic mod lifecycle dispatch, missing from direct static AST edges.
7. **`mcpz-holdout-07`** (Definition): *Where is AimTargetSnapshot defined for raycast hit results?*
   - **Expected**: `src/main/java/net/mcpz/target/AimTargetSnapshot.java`
   - **Delivered**: Found mentions in test note `McpzPlacementAssistTest.java`, but skipped target class.
   - **Root Cause**: Record class declaration formatting caused regex AST extractor to miss the type token.
8. **`plugmedia-13`** (Entrypoint): *Where is the CLI command entrypoint for PlugMedia?*
   - **Expected**: `apps/cli/src/index.ts`
   - **Delivered**: `main` functions in `workers/media/d1_characters.py` (rank 1–2).
   - **Root Cause**: Python worker `main()` functions ranked ahead of TypeScript CLI entrypoint.
9. **`cowork-18`** (Callers): *Where is synth_voiceover called in the shorts pipeline?*
   - **Expected**: `shortsfactory/pipeline/run.py`
   - **Delivered**: Definition in `tts.py`, but `incoming.calls: []`.
   - **Root Cause**: Called dynamically inside thread worker executor.
10. **`cowork-20`** (Impact): *What is impacted if KEY_ALIAS mapping is altered in server.cjs?*
    - **Expected**: `cockpit/server.cjs`
    - **Delivered**: `KEY_ALIAS` target resolved to `cockpit/fleet-direct.cjs`.
    - **Root Cause**: Multiple identical symbol names in the same folder; lexical resolver picked sibling file.

---

### 2. CodeGraph Sample Misses (10 of 17)

1. **`mcpz-05`** (Impact): *What is impacted if McpzConstants.FLOOR_HEIGHT_BLOCKS is changed?*
   - **Expected**: `src/main/java/net/mcpz/McpzConstants.java` (targets: `McpzMod.java`, `McpzCameraController.java`)
   - **Delivered**: Affected list contained `MOD_ID`, `MOD_NAME`, `BUILD_SHA` in same file, but missed `McpzMod.java`.
   - **Root Cause**: Graph traversal stopped at class boundary without resolving cross-file field reads.
2. **`mcpz-07`** (Dataflow): *How do camera configuration values flow from config files into runtime camera behavior?*
   - **Expected**: `src/client/java/net/mcpz/client/McpzClient.java`
   - **Delivered**: `CameraConfig.java` and `CameraProjection.java`.
   - **Root Cause**: Did not traverse dataflow to consumer class.
3. **`mcpz-08`** (Config): *Which config key controls the default isometric camera yaw?*
   - **Expected**: `src/main/java/net/mcpz/camera/CameraConfig.java`
   - **Delivered**: Empty results `[]`.
   - **Root Cause**: Query for `cameraYawDefaultDegrees` did not match record components in Java.
4. **`mcpz-11`** (Docs/Notes): *Where are core design decisions for Northstar tracked?*
   - **Expected**: `MASTER_NORTHSTAR.md`
   - **Delivered**: `[]`
   - **Root Cause**: CodeGraph does not index Markdown documentation files.
5. **`mcpz-12`** (Docs/Notes): *Where is the camera refactor plan documented?*
   - **Expected**: `MASTER_CAMERA_PLAN.md`
   - **Delivered**: `[]`
   - **Root Cause**: CodeGraph does not index Markdown documentation files.
6. **`plugmedia-08`** (Impact): *What is impacted if media-worker queue handler changes?*
   - **Expected**: `services/runtime/src/queue.ts`
   - **Delivered**: Missed downstream queue consumers.
   - **Root Cause**: String-based queue topic references not linked in AST.
7. **`plugmedia-13`** (Entrypoint): *Where is the CLI command entrypoint for PlugMedia?*
   - **Expected**: `apps/cli/src/index.ts`
   - **Delivered**: `tools/d1/gate-surfaces.mjs` (`main` function).
   - **Root Cause**: Tool script matched lexical `main` before `apps/cli/src/index.ts`.
8. **`cowork-09`** (Config): *Where are the active swarm chain configuration rules defined?*
   - **Expected**: `ruflo-workers/swarm-chain.config.json`
   - **Delivered**: `cockpit/cowork-host.cjs` (`listLanes`).
   - **Root Cause**: CodeGraph does not index `.json` configuration files as symbol nodes.
9. **`cowork-13`** (Docs/Notes): *Which document outlines the core CANON principles of the workspace?*
   - **Expected**: `CANON.md`
   - **Delivered**: `[]`
   - **Root Cause**: Markdown files excluded from indexing.
10. **`plugengine-11`** (Config): *Where are npm workspaces declared for the engine monorepo?*
    - **Expected**: `package.json`
    - **Delivered**: `packages/plugengine-core/src/index.ts`.
    - **Root Cause**: Root `package.json` workspace definitions are not parsed into CodeGraph graph nodes.

---

### 3. GitNexus Sample Misses (10 of 30)

1. **`mcpz-02`** (Definition): *Where are the default camera settings defined in CameraConfig?*
   - **Expected**: `src/main/java/net/mcpz/camera/CameraConfig.java`
   - **Delivered**: `error: "Symbol 'CameraConfig' not found"`
   - **Root Cause**: Java record class was not extracted into the symbol table during `gitnexus analyze`.
2. **`mcpz-03`** (Callers): *Which method initializes the client runtime McpzRuntime.init?*
   - **Expected**: `src/client/java/net/mcpz/client/McpzClient.java`
   - **Delivered**: `status: "ambiguous"` with candidates `McpzSaveData.init`, `McpzRuntime.init`, `McpzBodyScreen.init`.
   - **Root Cause**: Did not disambiguate caller target among common method names.
3. **`mcpz-05`** (Impact): *What is impacted if McpzConstants.FLOOR_HEIGHT_BLOCKS is changed?*
   - **Expected**: `src/main/java/net/mcpz/McpzConstants.java`
   - **Delivered**: `impactedCount: 0`, `affected_processes: []`
   - **Root Cause**: Field reference not linked to downstream processes.
4. **`mcpz-06`** (Impact): *What is impacted if CameraConfig is modified?*
   - **Expected**: `src/main/java/net/mcpz/camera/CameraConfig.java`
   - **Delivered**: `error: "Target 'CameraConfig' not found"`
   - **Root Cause**: Symbol lookup failure in graph store.
5. **`mcpz-11`** (Docs/Notes): *Where are core design decisions for Northstar tracked?*
   - **Expected**: `MASTER_NORTHSTAR.md`
   - **Delivered**: `definitions: []`
   - **Root Cause**: Markdown files are not indexed in knowledge graph.
6. **`mcpz-18`** (Impact): *What is impacted if McpzControlMap.ROTATE_LEFT key name is changed?*
   - **Expected**: `src/client/java/net/mcpz/client/input/McpzControlMap.java`
   - **Delivered**: `impactedCount: 0`
   - **Root Cause**: Static key property has no recorded outgoing impact edges.
7. **`mcpz-holdout-10`** (Impact): *What is impacted if CameraProjection.orthographic projection logic is changed?*
   - **Expected**: `src/main/java/net/mcpz/camera/CameraProjection.java`
   - **Delivered**: `impactedCount: 0`
   - **Root Cause**: Method has no incoming callers indexed in call graph.
8. **`plugmedia-13`** (Entrypoint): *Where is the CLI command entrypoint for PlugMedia?*
   - **Expected**: `apps/cli/src/index.ts`
   - **Delivered**: `processes: [ { summary: "Main → Psql" }, { summary: "Main → Send" } ]`
   - **Root Cause**: Execution flow search ranked database migrations ahead of CLI entrypoint.
9. **`cowork-09`** (Config): *Where are the active swarm chain configuration rules defined?*
   - **Expected**: `ruflo-workers/swarm-chain.config.json`
   - **Delivered**: `definitions: [ { name: "cmd_swarm_status", filePath: ".../swarm_manager.py" } ]`
   - **Root Cause**: JSON config files are not treated as definition targets.
10. **`plugengine-15`** (Docs/Notes): *Which document contains the specification for the creator editor?*
    - **Expected**: `docs/CREATOR_EDITOR_SPEC.md`
    - **Delivered**: `placementStore.ts`
    - **Root Cause**: Markdown specs not in index; fell back to partial word match in code.

---

## Reproduce

The benchmark corpus locations are not hard-coded: every script in `bench/v2/` and `scripts/index-bench-repos.mjs` derives the local path of each repository from the environment variable `BENCH_REPOS_ROOT` plus the repository name (`$BENCH_REPOS_ROOT/<name>`), and fails with a clear error when the variable is missing. To reproduce the numbers above:

1. Check out the four corpus repositories (`mcpz`, `plugmedia`, `cowork`, `plugengine`) into one folder, one subdirectory per repository, named as in `bench/v2/repos.json`.
2. Point `BENCH_REPOS_ROOT` at that folder.
3. Run the harness from the repository root: `node bench/v2/run-bench03.mjs` (question runs), then `node bench/v2/aggregate.mjs` and `node bench/v2/generate-results.mjs` (aggregation and report).

No measurement numbers in this report are affected by that change — it only moves where the corpus is found on disk. Temporary PlugBrain homes are also created under `BENCH_REPOS_ROOT` (`PLUGBRAIN_HOME=<BENCH_REPOS_ROOT>/_plugbrain-home`), never touching live configurations or ports.
