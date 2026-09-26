# PlugBrain CLI Reference

The `plugbrain` Command Line Interface provides local administration, code indexing, question answering, multi-client configuration, hardware inspection, and MCP integration.

```text
usage: plugbrain <command> [options]
```

---

## Workspace Setup and Client Configuration

### `init`
Initialize PlugBrain in the current directory or specified path with a single command.

Discovers the git repository root (or uses the directory path), registers the workspace, executes initial code indexing with a live progress report, prints the local web UI URL, and detects installed AI coding assistants (Claude Code, Codex, Cursor, Windsurf, Hermes, AGY, OpenCode) to enroll PlugBrain into their MCP client configurations. Running `init` multiple times is idempotent.

```bash
plugbrain init [path] [--no-clients] [--dry-run]
```

**Flags:**
- `[path]`: Directory path to initialize (defaults to the current working directory).
- `--dry-run`: Preview planning actions without making any changes to disk.
- `--no-clients`: Skip detecting and updating AI coding assistant client configurations.

**Behavior of `--dry-run`:**
- Does not create or modify `plugbrain.db` on disk. If a database file already exists, it opens it strictly read-only; if no database exists, it uses an in-memory database (`:memory:`).
- Evaluates workspace registration using `planWorkspaceRoot` instead of inserting records, reporting whether the folder would register or is already known.
- Bypasses index scanning (outputs `would index <workspace>`).
- Inspects client configurations and outputs a unified diff (`renderEntryDiff`) showing exact lines that would be added to each detected client, without touching any configuration files.

**Example:**
```bash
plugbrain init --dry-run
```

---

### `setup`
Configure local AI coding clients to use PlugBrain via MCP stdio (`plugbrain mcp`).

Discovers supported client configurations in the user profile directory (or `PLUGBRAIN_CONFIG_HOME`), updates their configuration files (JSON, TOML, or YAML) to include the `plugbrain` MCP server entry, and maintains automatic timestamped backups.

```bash
plugbrain setup [--all|<client_name>] [--dry-run] [--undo]
```

**Supported Client Names:**
`claude`, `codex`, `cursor`, `windsurf`, `hermes`, `agy`, `opencode` (or `--all`).

**Flags:**
- `--all`: Target all detected client configurations (default if no specific client is provided).
- `--dry-run`: Display a unified diff of proposed configuration changes without modifying files.
- `--undo`: Revert the last applied setup modifications.

**Behavior of `--undo`:**
- Reverts client configuration files to their state prior to PlugBrain setup.
- If a client configuration file was newly created by `setup`, undo removes the `plugbrain` entry. If no other user entries exist, the file is safely deleted and reported as `restored`. If the user added custom settings after setup, the file is preserved and only the `plugbrain` section is removed.
- For pre-existing configuration files, undo restores the configuration from the latest setup backup (`<file>.plugbrain-backup-<timestamp>`).
- Before restoring or modifying any file, undo writes a counter-backup (`<file>.plugbrain-undobackup-<timestamp>`) of the current state, ensuring subsequent user edits are never lost.
- If no backup is found and no entry exists, undo safely reports the file as `skipped` without errors.

**Example:**
```bash
plugbrain setup --all
plugbrain setup --undo
```

---

## MCP Server and Daemon

### `mcp`
Start the Model Context Protocol (MCP) JSON-RPC 2.0 stdio server for client integration.

When invoked without `--workspace`, the server resolves the workspace context automatically from the current working directory:
1. Respects `PLUGBRAIN_WORKSPACE` if set.
2. Matches registered workspace roots containing the current directory (longest match wins).
3. If inside an unregistered git repository, automatically registers the git root and warms the index in the background.

```bash
plugbrain mcp [--workspace <id>] [--auth-key <key>]
```

**Flags:**
- `--workspace <id>`: Explicitly bind the MCP server to a specific workspace ID.
- `--auth-key <key>`: Provide authentication token for mutating tools.

**Example:**
```bash
plugbrain mcp
```

---

### `serve`
Start the local HTTP API and serve the embedded web dashboard.

Binds exclusively to `127.0.0.1` (default port 4310) and launches the background file-watcher daemon (unless disabled with `PLUGBRAIN_NO_DAEMON=1`). Automatically generates and persists an authentication token in `~/.plugbrain/auth.token` if not present.

```bash
plugbrain serve [port]
```

**Arguments:**
- `[port]`: Local TCP port to bind (default 4310).

**Example:**
```bash
plugbrain serve 4310
```

---

## Search and Natural-Language Question Answering

### `ask`
Ask questions about the project codebase in plain language (English or German).

Evaluates the question intent deterministically and queries code intelligence, git status, architecture overview, or vault notes without invoking an external model.

```bash
plugbrain ask "<question>" [--workspace <id>] [--limit <n>] [--json]
```

**Flags:**
- `--workspace <id>`: Specify workspace ID (required only if multiple workspaces exist).
- `--limit <n>`: Maximum number of sources cited (default 5, max 25).
- `--json`: Output raw JSON response conforming to `AskResponse`.

**Example:**
```bash
plugbrain ask "where is the brain home resolved?"
```

---

### `search`
Fast full-text token search over symbols and files in the database.

```bash
plugbrain search <query>
```

**Example:**
```bash
plugbrain search resolveBrainHome
```

---

## Code Intelligence (`intel`)

### `query`
Search AST symbols, file paths, and notes by concept or keyword.

```bash
plugbrain query <search_query> [--repo <name>] [--limit <n>] [--json]
```

**Example:**
```bash
plugbrain query "openStore" --limit 10
```

---

### `context`
Inspect 360-degree context of a code symbol, including callers, callees, and test references.

```bash
plugbrain context <symbol_name> [--file <path>] [--repo <id>] [--json]
```

**Example:**
```bash
plugbrain context openStore --file src/store/schema.ts
```

---

### `impact`
Perform blast radius analysis upstream, downstream, or bidirectionally for a symbol or file.

```bash
plugbrain impact <symbol_or_path> [--direction upstream|downstream|both] [--depth <n>] [--json]
```

**Example:**
```bash
plugbrain impact src/store/schema.ts --direction upstream --depth 2
```

---

### `detect-changes`
Map git diff hunks to affected code symbols and execution flows.

```bash
plugbrain detect-changes [--path <checkout_dir>] [--workspace <id>] [--json]
```

**Example:**
```bash
plugbrain detect-changes
```

---

### `cypher`
Execute graph queries against the indexed symbol dependency graph.

```bash
plugbrain cypher "<query>" [--limit <n>] [--json]
```

**Example:**
```bash
plugbrain cypher "MATCH (f:File)-[:CONTAINS]->(s:Symbol) WHERE s.name = 'openStore' RETURN f.path, s.name"
```

---

### `intel-status`
Display code intelligence index health, symbol/edge counts, and staleness metrics.

```bash
plugbrain intel-status [--workspace <id>] [--json]
```

**Example:**
```bash
plugbrain intel-status
```

---

## System Health, Hygiene, and Census

### `hygiene`
Check git repository hygiene across all checkouts: uncommitted files, unpushed branches, stashes, and orphaned worktrees.

```bash
plugbrain hygiene [--workspace <id>] [--json] [--wip-snapshot] [--repo <path>]
```

**Flags:**
- `--workspace <id>`: Specify workspace ID.
- `--wip-snapshot`: Save uncommitted working tree changes into temporary git refs (`refs/wip/<date>/<name>`).
- `--repo <path>`: Rescue a specific standalone repository not registered in PlugBrain.
- `--json`: Output structured JSON report.

**Example:**
```bash
plugbrain hygiene
plugbrain hygiene --wip-snapshot
```

---

### `machine`
Inspect hardware resources: disk space per volume, pagefile size, RAM, CPU usage, and capacity forecast.

```bash
plugbrain machine [--json]
```

**Example:**
```bash
plugbrain machine
```

---

### `repos`
Machine-wide git repository census: discover registered and unregistered git checkouts.

```bash
plugbrain repos [--dirty] [--refresh] [--json]
```

**Flags:**
- `--dirty`: Filter only repositories with uncommitted or untracked changes.
- `--refresh`: Force a fresh disk walk ignoring cached census data.
- `--json`: Output structured JSON report.

**Example:**
```bash
plugbrain repos --dirty
```

---

## Workspace and Index Lifecycle

### `register`
Register a directory path as a workspace.

```bash
plugbrain register <path> [name]
```

**Example:**
```bash
plugbrain register C:/code/my-project my-project
```

---

### `index`
Trigger incremental or full reindexing for one or all registered workspaces.

```bash
plugbrain index [workspaceId]
```

**Example:**
```bash
plugbrain index
```

---

### `progress`
View progress and status of active or recent background indexing runs.

```bash
plugbrain progress [workspaceId]
```

**Example:**
```bash
plugbrain progress
```

---

### `status`
Summarize all registered workspaces, indexed files, symbol counts by kind, edge relations, and database size.

```bash
plugbrain status
```

**Example:**
```bash
plugbrain status
```

---

### `planet`
Manage multi-repository workspace planets, checkouts, pruning, and deletion history.

```bash
plugbrain planet <step> [args]
```

**Subcommands:**
- `planet register [path] [name]`: Register a multi-repo planet directory and discover checkouts.
- `planet select [workspaceId] --checkout <id>`: Persist explicit active checkout roots.
- `planet scan [workspaceId]`: Refresh git revisions across checkouts and trigger index.
- `planet status [workspaceId]`: Show repository counts, checkout branches, and revisions.
- `planet history [workspaceId]`: View historical files deleted or renamed from the planet.
- `planet prune [workspaceId] [--apply] [--compact] [--batch <n>]`: Remove indexed rows of checkouts no longer selected.

**Example:**
```bash
plugbrain planet status
```

---

### `compact`
Reclaim free SQLite database pages on disk using `VACUUM`.

```bash
plugbrain compact
```

**Example:**
```bash
plugbrain compact
```

---

## Planning and Master Spec (`plan`)

### `plan`
Inspect master specification ledgers, progress calculations, gate checklists, and task dependencies.

```bash
plugbrain plan [status|next|task <task_id>|gates] [--json]
```

**Subcommands:**
- `plan status`: Show overall progress percentage, task status counts, and open decisions (default).
- `plan next`: List immediately startable unblocked tasks.
- `plan task <task_id>`: Show detail, requirements, gates, and dependencies for a task (e.g., `M12`).
- `plan gates`: View the list of all specification gates.

**Example:**
```bash
plugbrain plan status
plugbrain plan next
```

---

## Vault and Notes Management (`notes`)

### `notes`
Manage Obsidian-compatible markdown notes and knowledge graphs.

```bash
plugbrain notes <subcommand> [args]
```

**Subcommands:**
- `notes list [--limit <n>] [--json]`: List notes with title, type, and link counts.
- `notes query <filter>`: Property query over frontmatter (e.g., `"typ=gate UND stand=offen"`).
- `notes search <text> [--limit <n>] [--json]`: Search note prose text with context snippets.
- `notes read <path>`: Read note body, frontmatter properties, outgoing links, and backlinks.
- `notes write <path> --from <file>|--content <text> [--expect <hash>]`: Write note with version concurrency check.
- `notes graph [--focus <path>] [--depth <n>] [--filter <expr>]`: Compute note relation graph with color groups.
- `notes backlinks <path>`: List all notes linking to the target note.

**Example:**
```bash
plugbrain notes search "architecture"
plugbrain notes read "docs/quickstart.md"
```

---

## Database Backup and Recovery

### `backup`
Create an online SQLite backup of the PlugBrain database.

```bash
plugbrain backup [target_path]
```

**Example:**
```bash
plugbrain backup
```

---

### `restore`
Restore the database from a verified backup file.

```bash
plugbrain restore <backup_path>
```

**Example:**
```bash
plugbrain restore ~/.plugbrain/backups/plugbrain-backup-1727337600000.db
```

---

## Multi-Agent Swarm and Access Layer

### `attach`
Attach an agent identity to a workspace and output the session briefing.

```bash
plugbrain attach <workspaceId> <agentId>
```

---

### `read`
Read a file through the audited agent access layer.

```bash
plugbrain read <workspaceId> <agentId> <path>
```

---

### `write`
Write file content with attribution to the active agent.

```bash
plugbrain write <workspaceId> <agentId> <path> <content>
```

---

### `who`
Display file provenance, current owner, and edit history.

```bash
plugbrain who <workspaceId> <path>
```

---

### `agents`
List all registered agents and their last active timestamps.

```bash
plugbrain agents
```

---

### `swarm`
Multi-agent coordination desk for managing leases, turn checkpoints, admissions, and messaging.

```bash
plugbrain swarm <subcommand> [args]
```

**Subcommands:**
- `swarm register <agentId> [name]`: Register a new agent worker.
- `swarm turn <agentId> <start|end>`: Check in at a turn boundary.
- `swarm claim <agentId> <path> --task <taskId>`: Acquire mutual exclusion lease on a path.
- `swarm release <agentId> <leaseId>`: Release held lease.
- `swarm board`: View active fleet status, unread messages, and worktrees.
- `swarm send <fromAgent> <toAgent> --body <text>`: Send peer message.
- `swarm resources`: Display host CPU, RAM, disk quotas, and admission decisions.
- `swarm admit <test|build|install>`: Check admission gate for hardware-intensive actions.

**Example:**
```bash
plugbrain swarm turn worker-1 start
plugbrain swarm board
```
