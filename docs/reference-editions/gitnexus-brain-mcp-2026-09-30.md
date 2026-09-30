# GitNexus vs Brain MCP Tool Reference — 2026-09-30

**Document date:** 2026-09-30. The GitNexus tool capture is from 2026-09-28; the Brain 0.5 source snapshot is merged commit `567e9e647a71893449d0401f482847238353a627`.

**Source evidence paths:**
- GitNexus MCP tool list: `koordination/masterplan/inputs/GITNEXUS-V05-COMPARE-28/gitnexus-mcp-tools.json` (lines 1–439, captured 2026-09-28T02:05:55.807Z, version 1.6.7)
- Brain MCP tool list: `src/mcp/server.ts` (lines 37–458, `MCP_TOOLS` constant in the cited commit)
- Comparison narrative: `koordination/masterplan/inputs/GITNEXUS-V05-COMPARE-28/UMSETZUNG.md` (lines 1–69)

---

## 1. Exact Observed GitNexus MCP Tool List (13 tools)

From `gitnexus-mcp-tools.json` (tools array, lines 5–436):

| # | Tool Name | Purpose (from description) |
|---|-----------|----------------------------|
| 1 | `list_repos` | List indexed repositories (paginated) |
| 2 | `query` | Query code knowledge graph for execution flows |
| 3 | `cypher` | Execute Cypher query against code knowledge graph |
| 4 | `context` | 360-degree view of a single code symbol |
| 5 | `detect_changes` | Analyze uncommitted git changes → affected execution flows |
| 6 | `rename` | Multi-file coordinated rename (graph + text search) |
| 7 | `impact` | Blast radius analysis for a code symbol |
| 8 | `route_map` | HTTP route map for a repository |
| 9 | `tool_map` | MCP tool map for a repository |
| 10 | `shape_check` | API shape check (contract validation) |
| 11 | `api_impact` | API impact analysis for contract changes |
| 12 | `group_list` | List configured repository groups |
| 13 | `group_sync` | Rebuild Contract Registry for a group |

**Observation:** UMSETZUNG.md line 11 confirms "GitNexus `initialize` + `tools/list` liefert 13 Tools" (measured via stdio, no config change).

---

## 2. Brain MCP 0.5 Source-Defined Tool List (31 tools)

From `src/mcp/server.ts` lines 37–458 (`MCP_TOOLS` constant at commit `567e9e6`):

| # | Tool Name | Category |
|---|-----------|----------|
| 1 | `search` | Full-text search |
| 2 | `read` | File read with access logging |
| 3 | `context_pack` | Goal-oriented context pack |
| 4 | `ask` | Plain-language question router |
| 5 | `query` | Concept search (Code Intelligence) |
| 6 | `context` | 360° symbol context |
| 7 | `impact` | Blast radius analysis |
| 8 | `detect_changes` | Git diff → affected symbols/flows |
| 9 | `cypher` | Bounded graph query |
| 10 | `rename_preview` | Read-only rename preview |
| 11 | `claim` | Mutual exclusion lease |
| 12 | `release` | Release lease |
| 13 | `awareness` | Task awareness pack |
| 14 | `inbox_read` | Read agent messages |
| 15 | `message_send` | Send agent message |
| 16 | `heartbeat` | Agent heartbeat |
| 17 | `reap` | Worktree preview or guarded removal; exposes `apply` and `auto` |
| 18 | `swarm_turn` | Turn boundary check-in |
| 19 | `swarm_supersede` | Supersede queue task |
| 20 | `swarm_reassign` | Reassign queue task |
| 21 | `swarm_priority` | Set task priority |
| 22 | `swarm_board` | Fleet board |
| 23 | `swarm_resources` | Host resources |
| 24 | `plan` | Master ledger + queue views |
| 25 | `notes_search` | Vault notes search |
| 26 | `notes_read` | Read single note |
| 27 | `notes_query` | Property query over notes |
| 28 | `notes_backlinks` | Note backlinks |
| 29 | `hygiene` | Git chaos guard |
| 30 | `machine` | Hardware awareness |
| 31 | `repos` | Git repository inventory |

**Installed 0.3.0 observation (2026-09-28):** UMSETZUNG.md line 11 records a live Brain handshake with 27 tools. The report does not give that handshake the same timestamp as the GitNexus JSON capture. This is a different installed revision from the 31-tool source snapshot above.

**Test expectation vs. source:** The test at `test/coordination.test.ts` lines 438–446 enumerates 30 explicit tool names in its `expected` array (omitting `reap`), but the assertion at line 436 checks `tools.length === MCP_TOOLS.length`. The `MCP_TOOLS` constant in `server.ts` has 31 entries. The source of truth for the 0.5 source-defined list is the `MCP_TOOLS` constant (31 tools).

---

## 3. Mapping of User Capabilities (from UMSETZUNG.md lines 13–21)

| User Function | GitNexus MCP | Brain MCP 0.3.0 | Status |
|---------------|--------------|-----------------|--------|
| Repos auswählen | `list_repos` | `repos` | Named differently; both list repositories |
| Code suchen / Kontext / Auswirkungen | `query`, `context`, `impact` | `query`, `context`, `impact` | Same names; quality not proven equal (UMSETZUNG.md line 16) |
| Graph abfragen / Änderungen | `cypher`, `detect_changes` | `cypher`, `detect_changes` | Same names; schemas, scope, error returns need comparison (line 17) |
| Umbenennung | `rename` | `rename_preview` | Preview vs. write separated in Brain (line 18) |
| Routen-/Tool-/API-Sicht | `route_map`, `tool_map`, `shape_check`, `api_impact` | **No dedicated MCP tool observed** | Gap: Brain has no named equivalents (line 19) |
| Repo-Gruppen | `group_list`, `group_sync` | **No dedicated MCP tool observed** | Gap: Workspace/repo grouping not directly exposed (line 20) |
| Wissen / Planung / Fleet | **None in this list** | `notes_*`, `plan`, `swarm_*`, `claim/release`, `inbox/message`, `awareness` | Brain-only additions (line 21) |

---

## 4. Explicit Gaps

1. **API/Route/Tool surface tools missing in Brain MCP** — GitNexus exposes `route_map`, `tool_map`, `shape_check`, `api_impact`; Brain has no MCP tools with these names or equivalent dedicated surface (UMSETZUNG.md line 19).

2. **Repo-group management missing in Brain MCP** — GitNexus has `group_list`, `group_sync`; Brain has no named MCP equivalents (UMSETZUNG.md line 20).

3. **Rename semantics differ** — GitNexus `rename` performs coordinated multi-file edits (graph + text search, preview by default). Brain `rename_preview` is read-only preview only; no write-phase tool exposed via MCP (UMSETZUNG.md line 18).

4. **Fleet/Planning/Knowledge tools are Brain-only** — `notes_*`, `plan`, `swarm_*`, `claim/release`, `inbox/message`, `awareness`, `heartbeat`, `reap`, `hygiene`, `machine`, `repos` have no GitNexus counterparts in the observed 13-tool list.

5. **Tool count asymmetry** — GitNexus: 13 tools. Brain 0.5 source (`MCP_TOOLS`): 31 tools. Test expected array: 30 explicit names (omits `reap`). Installed 0.3.0 live handshake (2026-09-28): 27 tools returned at runtime per UMSETZUNG.md line 11. The test assertion at `coordination.test.ts:436` checks `tools.length === MCP_TOOLS.length` (31), but the explicit `expected` array has 30 entries.

6. **Parity not measured** — UMSETZUNG.md line 23: "Toolzahlen werden nicht als Paritätsprozent oder Produktabnahme gewertet." Line 27: "Vollständige Funktionsgleichheit und der installierte v0.5-Ablauf sind noch nicht abgenommen." Line 63: "Noch kein Prozentwert für Gesamtparität."

---

## 5. M09 / M18 Parity Status

**UNVERIFIED.**

- This M09 reference slice uses Brain source commit `567e9e647a71893449d0401f482847238353a627`; the GitNexus observation is the separate 2026-09-28 capture.
- M18 parity measurement is tracked in `task-6a92fa89-c89` (UMSETZUNG.md line 42) with 44 matrix lines in `MATRIX.md` — but the matrix is a "Startstruktur" (line 63), not a completed parity run.
- UMSETZUNG.md line 42 requires "Mindestens 95% Precision UND Recall, p95 ≤ 2 s, kritische Identitäts-/Scope-/Revisions-/Restorefälle vollständig. Erst danach Ersatz-Gate schließen."
- No evidence in the provided sources that M18 parity gate has been executed or passed against this M09 reference slice.

---

## 6. Sources Cited

| Source | Path | Lines |
|--------|------|-------|
| GitNexus MCP tool list (raw) | `koordination/masterplan/inputs/GITNEXUS-V05-COMPARE-28/gitnexus-mcp-tools.json` | 1–439 |
| Brain MCP tool list (source) | `src/mcp/server.ts` at `567e9e6` | 37–458 |
| Comparison narrative (UMSETZUNG) | `koordination/masterplan/inputs/GITNEXUS-V05-COMPARE-28/UMSETZUNG.md` | 1–69 |
| Brain MCP test expectation | `test/coordination.test.ts` at `567e9e6` | 432–449 |

---

**End of reference document.** This document combines a GitNexus capture from 2026-09-28 with the merged Brain source snapshot reviewed on 2026-09-30. It does not claim parity, all references frozen, or completed M18 validation.
