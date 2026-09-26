# PlugBrain HTTP API Reference

PlugBrain provides a local HTTP API (`plugbrain serve`) that exposes code intelligence, repository hygiene, hardware awareness, and Obsidian-compatible note graphs.

All requests are served by the built-in HTTP server defined in `src/server/api.ts`.

---

## Architecture and Security Model

- **Localhost Only:** The server exclusively binds to `127.0.0.1`. It never listens on `0.0.0.0` or public network interfaces.
- **No CORS:** The server does not send `Access-Control-Allow-Origin` headers. Foreign web pages in external browsers cannot access the API.
- **Local Authentication Token:**
  - Read routes for public projections can be accessed locally.
  - Mutating operations (and protected agent calls) require a valid authentication token.
  - Clients send the token either as `Authorization: Bearer <token>` or via the header `x-plug-auth-token: <token>`.
  - The token is configured via `ctx.authKey` or the `PLUG_BRAIN_AUTH_KEY` environment variable.
  - A server running without configured credentials rejects mutating requests with HTTP 401 (`AuthenticationRequired`).
  - When serving the browser UI, the local daemon automatically injects its session token into `window.__PLUGBRAIN__.token`.

---

## Response Envelope and Error Contract

Every endpoint returns a consistent JSON envelope:

### Success Envelope
```json
{
  "ok": true,
  "...additionalFields": "values"
}
```

### Error Envelope
On failure, HTTP status codes (400, 401, 403, 404, 500, or 503) are returned with:
```json
{
  "ok": false,
  "error": "Descriptive reason for failure"
}
```

When the SQLite database is currently locked by a background indexer run, store-writing requests immediately fail with HTTP 503 instead of hanging:
```json
{
  "ok": false,
  "error": "store is busy: indexer is running",
  "holder": "index-run-worker",
  "progress": { "filesDone": 120, "filesTotal": 450 }
}
```

### The `unavailable` Invariant
Whenever an endpoint reports system measurements, environment scans, or multi-repo states (e.g., `/api/ask`, `/api/hygiene`, `/api/machine`, `/api/repos`), the response **always** contains an `unavailable` field of type `string[]`.
- If all metrics and files were successfully read, `unavailable: []`.
- If an unreadable filesystem path, missing permission, or timeout prevented measuring part of the state, the missing item is appended to `unavailable`.
- The `unavailable` property is never `null` or omitted.

---

## User-Facing Endpoints

### 1. Health and Status

#### `GET /api/health`
Check server availability and whether a background indexing task is currently locking the store.

**Query Parameters:** None.

**Response:**
```json
{
  "ok": true,
  "at": "2026-09-26T10:00:00.000Z",
  "indexState": "idle",
  "indexing": null
}
```

---

### 2. Natural-Language Question Answering

#### `POST /api/ask`
Ask the project a question in natural language (English or German) and receive a one-sentence factual answer with exact file/line source citations.

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "question": "where is the brain home resolved?",
  "workspace": "ws-plugbrain",
  "limit": 5
}
```
*(Note: If only one workspace is registered, `workspace` is optional.)*

**Response:**
```json
{
  "ok": true,
  "workspace": "ws-plugbrain",
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

### 3. Project Overview and Briefing

#### `GET /api/briefing`
Retrieve a structured summary of the workspace: project name, key files, entry points, language statistics, and high-level architecture notes.

**Query Parameters:**
- `workspace` (`string`, optional if exactly one workspace is registered): Workspace ID.

**Response:**
```json
{
  "ok": true,
  "workspaceId": "ws-plugbrain",
  "project": {
    "name": "plugbrain",
    "root": "C:/PLUG/plugpt/Code/PlugBrain-Core",
    "indexedAt": "2026-09-26T08:00:00.000Z"
  },
  "summary": "Local project and code memory for AI agents...",
  "entryPoints": [
    { "path": "src/cli.ts", "type": "cli" },
    { "path": "src/server/api.ts", "type": "server" },
    { "path": "src/mcp/server.ts", "type": "mcp" }
  ],
  "languages": { "TypeScript": 180, "Markdown": 45 },
  "unavailable": []
}
```

---

### 4. Git Repository Hygiene

#### `GET /api/hygiene`
Check git health across all checkouts registered in the workspace: unsaved files, uncommitted stashes, unpushed branches, and orphaned worktrees.

**Query Parameters:**
- `workspace` (`string`, required): Target workspace ID.

**Response:**
```json
{
  "ok": true,
  "workspace": "ws-plugbrain",
  "checkedAt": "2026-09-26T10:00:00.000Z",
  "diskFreeGb": 42.5,
  "summary": {
    "level": "ok",
    "text": "all checkouts clean and pushed"
  },
  "checkouts": [
    {
      "path": "C:/PLUG/plugpt/Code/PlugBrain-Core",
      "repo": "PlugBrain-Core",
      "branch": "main",
      "dirtyFiles": 0,
      "untrackedFiles": 0,
      "stashes": 0,
      "unpushed": [],
      "staleDays": 0,
      "sizeMb": 12.4,
      "orphan": false,
      "claims": []
    }
  ],
  "findings": [],
  "unavailable": []
}
```

---

### 5. Host and Machine Awareness

#### `GET /api/machine`
Inspect hardware metrics across all local drives, pagefile, RAM, and CPU, including disk exhaustion forecasts.

**Query Parameters:** None.

**Response:**
```json
{
  "ok": true,
  "checkedAt": "2026-09-26T10:00:00.000Z",
  "drives": [
    {
      "mount": "C:",
      "freeGb": 42.5,
      "totalGb": 476.8,
      "level": "ok"
    }
  ],
  "pagefile": { "sizeGb": 4.0 },
  "memory": { "freeGb": 8.2, "totalGb": 32.0 },
  "cpu": { "load": 0.12 },
  "forecast": [
    {
      "mount": "C:",
      "fullInHours": null,
      "trendGbPerHour": 0.0,
      "basis": "last 60 min"
    }
  ],
  "findings": [],
  "unavailable": []
}
```

---

### 6. Machine-Wide Git Census

#### `GET /api/repos`
Discover all git repositories on the local host machine, whether registered in PlugBrain or not.

**Query Parameters:**
- `dirty` (`boolean` or `1`/`0`, optional): Filter only repositories with uncommitted or untracked changes.
- `refresh` (`boolean` or `1`/`0`, optional): Ignore cached census and force a fresh disk scan.
- `page` (`number`, optional, default 1): Page number.
- `limit` (`number`, optional, default 100, max 500): Repositories per page.

**Response:**
```json
{
  "ok": true,
  "scannedAt": "2026-09-26T10:00:00.000Z",
  "roots": ["C:/PLUG"],
  "complete": true,
  "dirty": false,
  "repos": [
    {
      "path": "C:/PLUG/plugpt/Code/PlugBrain-Core",
      "registered": true,
      "dirtyFiles": 0,
      "untrackedFiles": 0,
      "unpushedCommits": 0,
      "sizeMb": 12.4
    }
  ],
  "totals": {
    "total": 1,
    "dirty": 0
  },
  "unavailable": []
}
```

---

### 7. Code Intelligence and Symbol Search

#### `GET /api/search`
Full-text token search over indexed workspace files.

**Query Parameters:**
- `q` (`string`, required): Search string.
- `workspace` (`string`, required): Target workspace ID.
- `limit` (`number`, optional, default 40): Max results.

**Response:**
```json
{
  "ok": true,
  "hits": [
    {
      "file": "src/home.ts",
      "line": 18,
      "snippet": "export function resolveBrainHome(): string {"
    }
  ]
}
```

#### `GET /api/intel/query`
Concept and AST symbol search.

**Query Parameters:**
- `q` (`string`, required): Search query.
- `workspace` (`string`, optional): Target workspace ID.
- `limit` (`number`, optional, default 25): Result limit.

**Response:**
```json
{
  "ok": true,
  "result": {
    "query": "resolveBrainHome",
    "symbols": [
      {
        "id": 18,
        "name": "resolveBrainHome",
        "kind": "function",
        "file": "src/home.ts",
        "line": 18,
        "endLine": 35,
        "exported": true
      }
    ],
    "notes": [],
    "flows": [],
    "total": 1,
    "timingMs": 2.1
  }
}
```

#### `GET /api/intel/context`
360-degree context of an AST symbol (callers, callees, test coverage).

**Query Parameters:**
- `name` (`string`, required): Target symbol name.
- `file` (`string`, optional): File hint.
- `workspace` (`string`, optional): Target workspace ID.

**Response:**
```json
{
  "ok": true,
  "result": {
    "symbol": { "id": 18, "name": "resolveBrainHome", "kind": "function", "file": "src/home.ts" },
    "callers": [],
    "callees": [],
    "processes": [],
    "testCoverage": []
  }
}
```

#### `GET /api/intel/impact`
Blast radius analysis for a modified symbol or file path.

**Query Parameters:**
- `target` (`string`, required): Symbol name or file path.
- `direction` (`upstream` | `downstream` | `both`, optional, default `both`).
- `maxDepth` (`number`, optional, default 3).
- `workspace` (`string`, optional): Target workspace ID.

**Response:**
```json
{
  "ok": true,
  "result": {
    "target": "src/home.ts",
    "direction": "both",
    "depth": 3,
    "affectedFiles": ["src/cli.ts", "src/server/api.ts"],
    "affectedSymbols": ["resolveBrainHome"],
    "riskScore": "low"
  }
}
```

---

### 8. Notes and Knowledge Graph

#### `GET /api/notes/search`
Search markdown notes by prose text.

**Query Parameters:**
- `q` (`string`, required): Search query.
- `workspace` (`string`, required): Workspace ID.
- `lines` (`1`/`0`, optional): Return matching line content.
- `limit` (`number`, optional, default 20): Max results.

#### `GET /api/notes/read`
Read note body, frontmatter properties, and bidirectional links.

**Query Parameters:**
- `path` (`string`, required): Note path.
- `workspace` (`string`, required): Workspace ID.

#### `GET /api/notes/query`
Filter notes by frontmatter attributes (`?filter=status=active`).

#### `GET /api/notes/backlinks`
Find all notes referencing the target note (`?path=docs/spec.md`).

---

## Internal or Coordination Routes (Subject to Change)

The following routes coordinate multi-agent fleets and UI visualizations. They are internal and may change between minor versions:

- **Agent Fleet Coordination:**
  - `POST /api/agent/attach`: Attach agent identity to session.
  - `POST /api/agent/register`: Register fleet worker.
  - `POST /api/agent/heartbeat`: Send heartbeat to renew leases.
  - `POST /api/agent/turn`: Record turn start/end boundaries.
  - `POST /api/agent/claim`: Acquire path/symbol exclusion lease.
  - `POST /api/agent/release`: Free active lease.
  - `GET /api/agent/leases`: List active leases.
  - `POST /api/agent/message`: Send inbox message.
  - `POST /api/agent/inbox/ack`: Acknowledge message receipt.
  - `GET /api/agents/board`: Multi-agent fleet board.
  - `GET /api/resources`: Host resource quotas and admission.
- **Visualizations and Projections:**
  - `GET /api/live/events`: Server-Sent Events (SSE) stream for live updates.
  - `GET /api/galaxy`: All registered workspaces as planets.
  - `GET /api/graph`: Workspace symbol graph projection.
  - `GET /api/mesh`, `GET /api/mesh/timeline`: Agent collaboration trails.
  - `GET /api/city`, `GET /api/city/delta`: 3D code-city visual representation.
  - `GET /api/atlas/snapshot`: System dependency atlas snapshot.
- **Store & Queue Administration:**
  - `POST /api/workspaces`: Register new workspace root.
  - `POST /api/reindex`: Trigger incremental or full reindexing.
  - `GET /api/index/progress`: Stream indexing run progress.
  - `GET /api/queue`, `POST /api/queue/claim`, `POST /api/queue/deliver`: Distributed task queue.
  - `POST /api/backup`, `POST /api/backup/verify`: Database backup creation and verification.
