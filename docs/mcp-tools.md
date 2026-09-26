# PlugBrain MCP Tools Reference

PlugBrain exposes 27 tools over the Model Context Protocol (MCP) JSON-RPC 2.0 stdio transport (`plugbrain mcp`).

When invoked via `plugbrain mcp` without `--workspace`, the server automatically resolves the workspace from the current working directory. Tool parameters accept an explicit `workspaceId` when multiple workspaces exist or to override the binding.

All tool executions return JSON objects conforming to `{ ok: boolean, ... }`. On error, `{ ok: false, error: string }` is returned.

---

## Code Intelligence and Search

### `ask`
Ask the project a question in plain language (German or English) and receive a synthesized single-sentence answer with exact source citations.

Routes deterministically to the right underlying tool (definitions, usages, impact, git diffs, project overview, or vault notes) without invoking an external LLM.

**Parameters:**
- `question` (`string`, required): The natural-language query (e.g., `"where is the brain home resolved?"` or `"what breaks if I change X"`).
- `workspaceId` (`string`, optional): Target workspace ID.
- `limit` (`number`, optional): Maximum source citations returned (clamped between 1 and 25, default 5).

**Example Request:**
```json
{
  "name": "ask",
  "arguments": {
    "question": "where is the brain home resolved?"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "question": "where is the brain home resolved?",
  "intent": "definition",
  "answer": "resolveBrainHome is defined in src/home.ts:18.",
  "sources": [
    {
      "path": "src/home.ts",
      "line": 18,
      "symbol": "resolveBrainHome",
      "why": "exact symbol match"
    }
  ],
  "tool": "context",
  "confidence": "high",
  "followUps": [
    "who calls resolveBrainHome",
    "what does resolveBrainHome call"
  ],
  "unavailable": []
}
```

---

### `context_pack`
Generate a goal-oriented context pack combining relevant source files, symbols, definitions, and dependencies.

**Parameters:**
- `goal` (`string`, required): The task goal or query description.
- `workspaceId` (`string`, optional): Target workspace ID.
- `agentId` (`string`, optional): Attributing agent ID.
- `missionId` (`string`, optional): Optional mission ID.

**Example Request:**
```json
{
  "name": "context_pack",
  "arguments": {
    "goal": "understand MCP server request dispatching"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "id": "pack-a1b2c3d4",
  "version": 1,
  "sources": [
    { "path": "src/mcp/server.ts", "reason": "symbol match" }
  ],
  "body": "# Context Pack: understand MCP server request dispatching\n\n..."
}
```

---

### `query`
Concept and keyword search across indexed AST symbols, file paths, and notes.

**Parameters:**
- `query` (`string`, required): Concept query (e.g., `"gateway owner"` or `"stop flow"`).
- `repoId` (`string`, optional): Filter by repository ID.
- `checkoutId` (`string`, optional): Filter by checkout ID.
- `workspaceId` (`string`, optional): Filter by workspace ID.
- `limit` (`number`, optional): Maximum results returned (default 25).

**Example Request:**
```json
{
  "name": "query",
  "arguments": {
    "query": "startMcpServer"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "result": {
    "query": "startMcpServer",
    "symbols": [
      {
        "id": 142,
        "name": "startMcpServer",
        "kind": "function",
        "file": "src/mcp/server.ts",
        "line": 858,
        "endLine": 862,
        "exported": true,
        "container": null,
        "repoId": "repo-core",
        "checkoutId": "chk-main"
      }
    ],
    "notes": [],
    "flows": [],
    "total": 1,
    "timingMs": 4.2
  },
  "provenance": {
    "tool": "query",
    "indexedAt": "2026-09-26T08:00:00.000Z"
  }
}
```

---

### `context`
360-degree context of a code symbol, including callers, callees, and execution flow memberships.

**Parameters:**
- `name` (`string`, required): Identifier of the target symbol.
- `file` (`string`, optional): File path hint to disambiguate identical names.
- `repoId` (`string`, optional): Repository ID hint.
- `checkoutId` (`string`, optional): Checkout ID hint.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "context",
  "arguments": {
    "name": "openStore",
    "file": "src/store/schema.ts"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "result": {
    "symbol": {
      "id": 88,
      "name": "openStore",
      "kind": "function",
      "file": "src/store/schema.ts",
      "line": 747
    },
    "callers": [
      { "id": 12, "name": "indexWorkspace", "file": "src/indexer/index.ts", "line": 45 }
    ],
    "callees": [
      { "id": 91, "name": "migrateAddedColumns", "file": "src/store/schema.ts", "line": 630 }
    ],
    "processes": [],
    "testCoverage": []
  },
  "provenance": {
    "tool": "context"
  }
}
```

---

### `impact`
Blast radius analysis calculating affected dependencies and symbols upstream, downstream, or bidirectionally.

**Parameters:**
- `target` (`string`, required): Target symbol name or workspace-relative file path.
- `direction` (`string`, optional): Analysis traversal direction (`"upstream"`, `"downstream"`, or `"both"`, default `"both"`).
- `maxDepth` (`number`, optional): Graph traversal depth 1 to 5 (default 3).
- `repoId` (`string`, optional): Repository scope.
- `checkoutId` (`string`, optional): Checkout scope.
- `workspaceId` (`string`, optional): Workspace ID.

**Example Request:**
```json
{
  "name": "impact",
  "arguments": {
    "target": "src/store/schema.ts",
    "direction": "upstream",
    "maxDepth": 2
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "result": {
    "target": "src/store/schema.ts",
    "direction": "upstream",
    "maxDepth": 2,
    "affectedFiles": ["src/cli.ts", "src/server/api.ts", "src/mcp/server.ts"],
    "affectedSymbols": ["openStore", "startMcpServer"],
    "riskScore": "medium"
  },
  "provenance": {
    "tool": "impact"
  }
}
```

---

### `search`
Full-text search for code tokens and symbols across indexed workspace files.

**Parameters:**
- `query` (`string`, required): Search string.
- `workspaceId` (`string`, optional): Target workspace ID.
- `agentId` (`string`, optional): Attributing agent ID (default `"mcp-agent"`).
- `limit` (`number`, optional): Max results (default 40).

**Example Request:**
```json
{
  "name": "search",
  "arguments": {
    "query": "PLUGBRAIN_HOME",
    "limit": 10
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "hits": [
    {
      "file": "src/home.ts",
      "line": 19,
      "snippet": "const env = process.env.PLUGBRAIN_HOME"
    }
  ]
}
```

---

### `read`
Read workspace files through the audited access layer with attribution and token estimation.

**Parameters:**
- `path` (`string`, required): Workspace-relative file path to read.
- `workspaceId` (`string`, optional): Target workspace ID.
- `agentId` (`string`, optional): Attributing agent ID (default `"mcp-agent"`).

**Example Request:**
```json
{
  "name": "read",
  "arguments": {
    "path": "package.json"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "path": "package.json",
  "content": "{\n  \"name\": \"plugbrain\"...\n}",
  "bytes": 2002,
  "lang": "json"
}
```

---

### `detect_changes`
Map git diff hunk changes to affected symbols and known execution flows.

**Parameters:**
- `workspaceId` (`string`, optional): Target workspace ID.
- `diffText` (`string`, optional): Unified diff text to analyze.
- `checkoutId` (`string`, optional): Checkout identifier.
- `checkoutPath` (`string`, optional): On-disk checkout directory path.

**Example Request:**
```json
{
  "name": "detect_changes",
  "arguments": {
    "diffText": "--- a/src/home.ts\n+++ b/src/home.ts\n@@ -20,2 +20,3 @@\n+  if (custom) return custom\n"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "result": {
    "affectedSymbols": ["resolveBrainHome"],
    "affectedFiles": ["src/home.ts"],
    "impactedFlows": []
  },
  "provenance": {
    "tool": "detect_changes"
  }
}
```

---

### `cypher`
Run bounded graph queries or JSON graph DSL queries against the indexed code graph.

**Parameters:**
- `query` (`string` or `object`, required): Graph query expression or JSON DSL object.
- `workspaceId` (`string`, optional): Target workspace ID.
- `limit` (`number`, optional): Maximum rows returned (default 50).

**Example Request:**
```json
{
  "name": "cypher",
  "arguments": {
    "query": "MATCH (f:File)-[:CONTAINS]->(s:Symbol) WHERE s.name = 'openStore' RETURN f.path, s.name",
    "limit": 10
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "result": {
    "nodes": [
      { "id": 1, "labels": ["File"], "properties": { "path": "src/store/schema.ts" } }
    ],
    "edges": []
  },
  "provenance": {
    "tool": "cypher"
  }
}
```

---

### `rename_preview`
Preview the blast radius and text edits of renaming an identifier without writing to disk.

**Parameters:**
- `newName` (`string`, required): Replacement identifier name.
- `symbolId` (`number`, optional): Specific indexed symbol identifier.
- `name` (`string`, optional): Symbol name when unambiguous in scope.
- `repoId` (`string`, optional): Scope repository ID.
- `checkoutId` (`string`, optional): Scope checkout ID.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "rename_preview",
  "arguments": {
    "name": "oldHelper",
    "newName": "newHelper"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "result": {
    "symbol": "oldHelper",
    "newName": "newHelper",
    "filesChanged": ["src/utils.ts"],
    "occurrences": 3,
    "diffPreview": "--- src/utils.ts\n+++ src/utils.ts\n..."
  },
  "provenance": {
    "tool": "rename_preview"
  }
}
```

---

## Knowledge Base and Notes

### `notes_search`
Search the text content of vault markdown notes with optional line excerpts.

**Parameters:**
- `query` (`string`, required): Text terms to locate.
- `lines` (`boolean`, optional): When `true`, returns the matching line content.
- `limit` (`number`, optional): Max notes returned (default 20).
- `agentId` (`string`, optional): Attributing agent ID.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "notes_search",
  "arguments": {
    "query": "architecture boundary",
    "lines": true
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "query": "architecture boundary",
  "total": 1,
  "returned": 1,
  "hits": [
    {
      "path": "docs/architecture.md",
      "title": "Architecture Boundary",
      "snippet": "...core boundary between indexer and store...",
      "line": 42
    }
  ]
}
```

---

### `notes_read`
Read a vault markdown note with parsed frontmatter properties, outgoing links, and backlinks.

**Parameters:**
- `path` (`string`, required): Note path relative to the workspace/vault root.
- `agentId` (`string`, optional): Attributing agent ID.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "notes_read",
  "arguments": {
    "path": "docs/quickstart.md"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "note": {
    "path": "docs/quickstart.md",
    "title": "Quickstart Guide",
    "body": "# Quickstart\n\n...",
    "frontmatter": {},
    "links": ["docs/mcp-tools.md"],
    "backlinks": []
  }
}
```

---

### `notes_query`
Evaluate property filters over frontmatter and note metadata (e.g., `"typ=gate UND stand=offen"`).

**Parameters:**
- `filter` (`string`, required): Property query expression.
- `limit` (`number`, optional): Maximum notes returned (default 200).
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "notes_query",
  "arguments": {
    "filter": "status=active"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "total": 2,
  "notes": [
    {
      "path": "Roadmap/Gates/G1.md",
      "title": "Gate 1",
      "properties": { "status": "active" }
    }
  ]
}
```

---

### `notes_backlinks`
List all notes that link to the specified target note path.

**Parameters:**
- `path` (`string`, required): Target note path.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "notes_backlinks",
  "arguments": {
    "path": "Master/Spec.md"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "backlinks": [
    {
      "path": "Roadmap/Gates/G1.md",
      "title": "Gate 1",
      "context": "implements [[Master/Spec.md]]"
    }
  ]
}
```

---

## System and Repository Awareness

### `hygiene`
Inspect git repository health and uncommitted changes across all checkouts in the workspace.

**Parameters:**
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "hygiene",
  "arguments": {}
}
```

**Response Shape:**
```json
{
  "ok": true,
  "status": "clean",
  "checkouts": [
    {
      "path": "C:/PLUG/plugpt/Code/PlugBrain-Core",
      "branch": "main",
      "head": "a1b2c3d",
      "dirtyFiles": 0,
      "untrackedFiles": 0,
      "unpushedCommits": 0,
      "stashes": 0
    }
  ],
  "risks": [],
  "warnings": []
}
```

---

### `machine`
Hardware awareness: disk storage, pagefile, RAM, CPU load, and capacity forecasts.

**Parameters:** None (empty object `{}`).

**Example Request:**
```json
{
  "name": "machine",
  "arguments": {}
}
```

**Response Shape:**
```json
{
  "ok": true,
  "drives": [
    {
      "mount": "C:",
      "freeBytes": 45000000000,
      "totalBytes": 512000000000,
      "forecast": "ample"
    }
  ],
  "memory": {
    "freeBytes": 8589934592,
    "totalBytes": 34359738368
  },
  "cpu": {
    "cores": 16,
    "model": "AMD Ryzen"
  }
}
```

---

### `repos`
Machine-wide git repository census: discover registered and unregistered repositories, dirty worktrees, and branch tracking status.

**Parameters:**
- `dirty` (`boolean`, optional): When `true`, filters only to repositories with unsaved work or untracked files.
- `refresh` (`boolean`, optional): When `true`, forces a fresh filesystem scan ignoring cached results.

**Example Request:**
```json
{
  "name": "repos",
  "arguments": {
    "dirty": true
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "scannedAt": "2026-09-26T08:00:00.000Z",
  "roots": ["C:/PLUG"],
  "complete": true,
  "dirty": true,
  "repos": [],
  "totals": {
    "total": 4,
    "dirty": 0
  },
  "unavailable": []
}
```

---

### `plan`
Inspect master ledger progress, startable tasks, gate checklists, and queue states.

**Parameters:**
- `view` (`string`, optional): View mode (`"status"`, `"next"`, `"task"`, or `"gates"`, default `"status"`).
- `id` (`string`, optional): Task identifier when `view="task"` (e.g., `"M12"`).
- `status` (`string`, optional): Filter gate status when `view="gates"` (e.g., `"OPEN"`).
- `limit` (`number`, optional): Maximum tasks returned when `view="next"` (default 10).
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "plan",
  "arguments": {
    "view": "status"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "ledger": "PLUGPT_MASTER_SPEC",
  "progress": 0.85,
  "tasksByStatus": { "DONE": 24, "IN_PROGRESS": 2, "OPEN": 4 },
  "gatesByStatus": { "PASS": 18, "OPEN": 2 },
  "next": [
    { "id": "M25", "title": "Documentation Release", "status": "OPEN", "queue": "ready" }
  ],
  "openDecisions": [],
  "dimensions": {},
  "unplanned": []
}
```

---

## Multi-Agent Coordination

These tools coordinate multi-agent swarms with non-overlapping leases, distributed inbox messaging, and turn checkpoints.

### `claim`
Acquire a mutual-exclusion lease on workspace paths or symbols with time-to-live (TTL) and fencing tokens.

**Parameters:**
- `agentId` (`string`, required): Claiming agent ID.
- `taskId` (`string`, required): Active task identifier.
- `paths` (`string[]`, optional): Workspace-relative paths to lock.
- `symbols` (`string[]`, optional): Symbol names to lock.
- `mode` (`string`, optional): Claim mode (`"write"` or `"read"`, default `"write"`).
- `ttlMs` (`number`, optional): Lease duration in milliseconds.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "claim",
  "arguments": {
    "agentId": "worker-1",
    "taskId": "TASK-DOCS",
    "paths": ["docs/mcp-tools.md"]
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "lease": {
    "id": "lease-12345",
    "agentId": "worker-1",
    "taskId": "TASK-DOCS",
    "paths": ["docs/mcp-tools.md"],
    "symbols": [],
    "mode": "write",
    "expiresAt": "2026-09-26T09:00:00.000Z",
    "epoch": 3
  }
}
```

---

### `release`
Release an existing lease held by an agent.

**Parameters:**
- `agentId` (`string`, required): Holding agent ID.
- `leaseId` (`string`, optional): Specific lease identifier to release.
- `taskId` (`string`, optional): Release all leases for this task.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "release",
  "arguments": {
    "agentId": "worker-1",
    "leaseId": "lease-12345"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "released": 1
}
```

---

### `awareness`
Verify live claims, conflicts, and dependency overlaps for intended file touches before making edits.

**Parameters:**
- `taskId` (`string`, required): Current task identifier.
- `intendedPaths` (`string[]`, optional): File paths the task plans to modify.
- `agentId` (`string`, optional): Agent identifier.
- `workspaceId` (`string`, optional): Target workspace ID.
- `mode` (`string`, optional): Intended mode (`"write"` or `"read"`).

**Example Request:**
```json
{
  "name": "awareness",
  "arguments": {
    "taskId": "TASK-DOCS",
    "intendedPaths": ["docs/mcp-tools.md"]
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "pack": {
    "taskId": "TASK-DOCS",
    "conflicts": [],
    "activeClaims": [],
    "dependencies": [],
    "warnings": []
  }
}
```

---

### `inbox_read`
Retrieve messages for an agent with optional long-polling wait.

**Parameters:**
- `agentId` (`string`, required): Recipient agent identifier.
- `workspaceId` (`string`, optional): Target workspace ID.
- `channel` (`string`, optional): Filter messages by channel topic.
- `missionId` (`string`, optional): Filter messages by mission ID.
- `unreadOnly` (`boolean`, optional): Return only unread messages.
- `waitMs` (`number`, optional): Long-polling wait time in milliseconds (0 for immediate).

**Example Request:**
```json
{
  "name": "inbox_read",
  "arguments": {
    "agentId": "worker-1",
    "unreadOnly": true
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "messages": [
    {
      "id": "msg-987",
      "fromAgent": "integrator",
      "channel": "coordination",
      "subject": "task approved",
      "body": "Proceed with commit.",
      "sentAt": "2026-09-26T08:15:00.000Z"
    }
  ]
}
```

---

### `message_send`
Send a peer message to an agent inbox or broadcast to a mission topic channel.

**Parameters:**
- `fromAgent` (`string`, required): Sender agent ID.
- `body` (`string`, required): Message body text.
- `toAgent` (`string`, optional): Direct recipient agent ID.
- `channel` (`string`, optional): Broadcast topic/channel name.
- `missionId` (`string`, optional): Related mission identifier.
- `subject` (`string`, optional): Message subject header.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "message_send",
  "arguments": {
    "fromAgent": "worker-1",
    "toAgent": "integrator",
    "subject": "review ready",
    "body": "Completed docs/mcp-tools.md."
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "message": {
    "id": "msg-988",
    "fromAgent": "worker-1",
    "toAgent": "integrator",
    "channel": null,
    "subject": "review ready",
    "body": "Completed docs/mcp-tools.md.",
    "sentAt": "2026-09-26T08:20:00.000Z"
  }
}
```

---

### `heartbeat`
Maintain agent presence and renew active lease expirations.

**Parameters:**
- `agentId` (`string`, required): Active agent identifier.
- `taskId` (`string`, optional): Current task identifier.

**Example Request:**
```json
{
  "name": "heartbeat",
  "arguments": {
    "agentId": "worker-1",
    "taskId": "TASK-DOCS"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "agentId": "worker-1",
  "lastSeen": "2026-09-26T08:25:00.000Z",
  "renewedLeases": 1
}
```

---

### `swarm_turn`
Turn boundary checkpoint: check in at turn start or submit a turn summary at turn end.

**Parameters:**
- `agentId` (`string`, required): Registered worker ID.
- `phase` (`string`, required): Boundary phase (`"start"` or `"end"`).
- `state` (`string`, optional): Turn end state reason (`"needs-task"`, `"awaiting-commit"`, `"blocked"`, or `"paused"`).
- `summary` (`string`, optional): Turn accomplishment summary.
- `claimNext` (`boolean`, optional): When `true`, claims the next task available for this worker.
- `workspaceId` (`string`, optional): Target workspace ID.

**Example Request:**
```json
{
  "name": "swarm_turn",
  "arguments": {
    "agentId": "worker-1",
    "phase": "end",
    "state": "awaiting-commit",
    "summary": "Completed docs/mcp-tools.md reference"
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "ping": {
    "agentId": "worker-1",
    "phase": "end",
    "state": "awaiting-commit",
    "unreadCount": 0,
    "admission": "admitted"
  }
}
```

---

### `swarm_board`
Fleet overview showing every worker's status, unread messages, active leases, worktrees, and attention flags.

**Parameters:**
- `workspaceId` (`string`, optional): Target workspace ID.
- `git` (`boolean`, optional): When `true`, inspects git branch, HEAD, and dirty file status across all registered worktrees.

**Example Request:**
```json
{
  "name": "swarm_board",
  "arguments": {
    "git": true
  }
}
```

**Response Shape:**
```json
{
  "ok": true,
  "board": {
    "workers": [
      {
        "agentId": "worker-1",
        "surface": "cli",
        "state": "working",
        "unreadMessages": 0,
        "activeTask": "TASK-DOCS",
        "worktrees": [
          {
            "path": "C:/PLUG/plugpt/Code/PlugBrain-Core--docs",
            "branch": "docs/reference-20260926",
            "dirtyFiles": 1
          }
        ]
      }
    ],
    "host": {
      "freeMemoryBytes": 8589934592,
      "freeDiskBytes": 45000000000
    }
  }
}
```

---

### `swarm_resources`
Host hardware status (disk, RAM, CPU) and admission gate checking if sufficient resources exist for builds, tests, or checkouts.

**Parameters:** None (empty object `{}`).

**Example Request:**
```json
{
  "name": "swarm_resources",
  "arguments": {}
}
```

**Response Shape:**
```json
{
  "ok": true,
  "host": {
    "freeDiskBytes": 45000000000,
    "freeMemoryBytes": 8589934592,
    "cpuUsage": 0.15
  },
  "quotas": [],
  "admission": [
    { "kind": "test", "admitted": true, "reason": "5 GB memory available" },
    { "kind": "build", "admitted": true, "reason": "20 GB disk available" }
  ]
}
```
