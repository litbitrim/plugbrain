# PlugBrain CLI Reference

The `plugbrain` Command Line Interface provides local administration, code indexing, question answering, multi-client configuration, hardware inspection, and MCP integration.

```text
usage: plugbrain <command> [options]
```

---

## Workspace Setup and Client Configuration

### `init`
Initialize PlugBrain in the current directory or specified path with a single command.

Discovers the git repository root (or uses the directory path), registers the workspace, executes initial code indexing with a live progress report, prints the local web UI URL, detects installed AI coding assistants (Claude Code, Codex, Cursor, Windsurf, Hermes, AGY, OpenCode) to enroll PlugBrain into their MCP client configurations, and adds the PlugBrain agent-protocol block to `AGENTS.md` (plus `CLAUDE.md` when present and not already referencing `AGENTS.md`). Running `init` multiple times is idempotent.

```bash
plugbrain init [path] [--no-clients] [--no-agents-file] [--dry-run]
```

**Flags:**
- `[path]`: Directory path to initialize (defaults to the current working directory).
- `--dry-run`: Preview planning actions without making any changes to disk.
- `--no-clients`: Skip detecting and updating AI coding assistant client configurations.
- `--no-agents-file`: Skip adding or updating the agent-protocol block.

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

### `agents-file`

Add or refresh the instructions from `docs/agent-protocol.md` between managed markers. Text outside those markers is preserved. The default writes `AGENTS.md` and also `CLAUDE.md` when that file exists without an `AGENTS.md` reference.

```bash
plugbrain agents-file [--target AGENTS.md|CLAUDE.md|both] [--dry-run] [--undo]
```

`--dry-run` prints the proposed content without writing. `--undo` restores the pre-change backup, or removes the managed block when no backup exists. Duplicate or incomplete markers are refused with a repair hint.

### `doctor`

`doctor --agents` performs read-only checks for each supported client: installation, PlugBrain MCP config, the local daemon health endpoint, current-directory workspace registration, and the managed agent block. Each row includes a repair command. Use `--json` for machine-readable rows. Doctor never starts the daemon or edits configuration.

```bash
plugbrain doctor --agents [--json]
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

### `disk`
Scan directory metadata, inspect the saved directory tree, rank safe-to-review storage recommendations, or create a reinstallation checklist. Scanning never reads file contents except package lockfiles, which are opened only to compute duplicate fingerprints. Links and other reparse points are reported and skipped.

```bash
plugbrain disk scan [<path>...]
plugbrain disk tree [<path>]
plugbrain disk recommend [--json]
plugbrain disk wipe-check [--json]
plugbrain disk largest [n]
```

- `scan` defaults to all fixed drives and replaces the previous scan. Explicit paths are useful for a bounded, read-only inventory.
- `tree` returns immediate children from the last completed scan.
- `recommend` groups recoverable dependency trees, caches and build output; review candidates and work that should be kept are marked separately.
- `wipe-check` lists uncommitted or unpushed Git work, recent user-profile folders and configuration or vault paths to back up before reinstalling.
- `largest` reports the largest files retained in the last scan (maximum 1,000).
- `--json` prints the structured report.

```bash
plugbrain disk scan C:\\Users\\me\\Projects
plugbrain disk recommend --json
plugbrain disk wipe-check
```

The scan and recommendations only report. They do not delete or move files.

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
The coordination desk for a team of agents: registration, turns, the task
queue, messages, path claims, commit approval, quotas and machine admission.
It works on the local store directly, so an agent needs no HTTP token. The
per-turn rules for agents are in [agent-protocol.md](agent-protocol.md).
The command output is in German for now.

```bash
plugbrain swarm <subcommand> [args] [--workspace <id>]
```

Without `--workspace` the single registered workspace is used.

**Subcommands:**
- `swarm watch [--for <agent>] [--agents <id,…>] [--dirs <path,…>] [--timeout 20m] [--json]`: Wait for relevant Brain events and sparse filesystem/resource changes.
- `swarm register <agentId> [name]`: Register a new agent worker.
- `swarm turn <agentId> <start|end>`: Check in at a turn boundary.
- `swarm claim <agentId> <path> --task <taskId>`: Acquire mutual exclusion lease on a path.
- `swarm release <agentId> <leaseId>`: Release held lease.
- `swarm board`: View active fleet status, unread messages, and worktrees.
- `swarm reap [--repo <path>] [--target <branch>] [--apply]`: Preview or safely remove merged, clean linked worktrees; defaults to a read-only dry run.
- `swarm reap --auto on|off`: Enable or disable automatic cleanup for this workspace.
- `swarm send <fromAgent> <toAgent> --body <text>`: Send peer message.
- `swarm resources`: Display host CPU, RAM, disk quotas, and admission decisions.
- `swarm admit <test|build|install>`: Check admission gate for hardware-intensive actions.
**Agents**
- `swarm register <agent> --surface <s> --account <label> [--key <resource>] [--model <m>] [--name <n>] [--worktree <path>]... [--takeover]`:
  register an agent. Surfaces: `claude-code`, `codex-app`, `freebuff`, `agy`, `native`, `other`.
  `--worktree` binds the agent to a checkout so the board can show its branch.
- `swarm turn <agent> start [--claim]`: check in at the start of a turn. Prints
  unread messages and the task offered to this agent; `--claim` takes it.
- `swarm turn <agent> end --state needs-task|awaiting-commit|blocked|paused [--summary <s>] [--deliver <evidence>] [--repo <worktree>] [--review]`:
  check out with exactly one state. `--deliver` hands in the single held task; the
  evidence must be a non-empty file inside the workspace. A delivery records the
  agent, attempt, source revision when available, evidence path and SHA-256. Review
  tasks titled `R-…` (or explicitly marked with `--review`) also need a judgment
  (`PASS`, `PASS_MIT_AUFLAGEN` or `FAIL`) and a 40-character reviewed commit hash.
  Without a delivery, the queue task stays `claimed` and appears under `swarm board --next`.
- `swarm ack <agent> <messageId>`: mark a message as read. Unread messages are
  shown at every turn start until acknowledged.
- `swarm retire <agent> --note <reason>`: take an agent off the board.

**Work**
- `swarm enqueue <title> [--body <b>] [--to <agent>] [--plan <M00>] [--by <agent>] [--after <taskId>]`:
  queue a task, for one agent (`--to`) or for whoever takes it first. `--after`
  makes it wait: it is neither offered nor claimable until the predecessor is
  delivered or its holder has ended a turn with `awaiting-commit` or
  `needs-task`; the addressee then gets one message that the task is free.
- `swarm deliver <agent> <taskId> --path <evidence> [--repo <worktree>] [--review]`:
  hand in a claimed task. The named agent must hold it and the evidence file must
  exist, be non-empty and resolve inside the workspace. The receipt includes the
  task, agent, delivery attempt, source `HEAD` when `--repo` or the selected workspace root
  identifies a Git checkout, normalized evidence path and SHA-256. Review tasks
  titled `R-…` (or passed with `--review`) require a verdict and reviewed commit hash.
- `swarm claim <agent> <path>... [--task <id>] [--ttl-min <n>]`: take a write
  lease on paths. A path another agent holds is refused.
- `swarm release <agent> [<path>...] [--task <id>]`: release leases (all of the agent's, or the given ones).
- `swarm send <agent> --subject <s> --body <b> [--from <agent>]`: message an
  agent. The first argument is the recipient. The sender comes from `--from`
  or from `PLUGBRAIN_AGENT`; with neither, the message is refused (exit 2) —
  the Brain never books a message to the integrator that somebody else wrote.
- `swarm approve <agent> [--note <n>] [--by <agent>]`: let an agent that ended
  with `awaiting-commit` commit. It arrives as a message.

**Overview and machine**
- `swarm board [--git] [--json] [--next]`: every agent once with account, turn state,
  unread messages, task, leases and worktree; `--git` adds branch, head and
  uncommitted files, plus overlaps where two agents write in one worktree. A
  `working` worker without Brain contact is marked `silent` and shown with its
  minutes (`still? seit 47 min ohne Kontakt`).
- `swarm watchdog [--json] [--dry-run]`: one watchdog cycle. It reports every
  silent worker, tells the integrator once per case (`--dry-run` only reads),
  and releases waiting tasks whose predecessor has arrived. A worker is silent
  when it has been `working` longer than the workspace threshold (default 45
  minutes) without any Brain contact — turn, claim, release, ack, message,
  delivery or quota. Contact resets the reading; the Brain never calls a worker
  dead.
- `swarm watchdog silent-after <minutes>`: set that threshold for the workspace.
- `swarm review-pool set <agent>...`: replace the workspace's ordered reviewer
  list.
- `swarm review-pool auto on|off`: switch automatic review routing (default
  off). When on, a turn that ends with `awaiting-commit` queues one review task
  for the first reviewer whose account differs from the author's.
- `swarm review-pool show [--json]`: pool, routing switch and threshold.
  uncommitted files, plus overlaps where two agents write in one worktree. The board
  appends an `Als Nächstes` section with ranked suggestions, reasons and commands;
  `--next` prints just those suggestions.
- `swarm chronik [--since <iso|2h>] [--json|--md]`: show stored queue, message,
  lease and quota events in timestamp order. Markdown is the default and can be used
  as a handoff note. Missing turn history is named explicitly until a version that
  stores turn history is available; the chronicle does not invent events. Reads are
  capped at 500 rows per source and output at 1,000 events; capped results say that
  older events were omitted.
- `swarm resources [--json]`: free disk and RAM, admission per kind of work, reported quotas.
- `swarm quota <account> <remaining> <percent|credits|requests|rpm|tokens> [--resets <iso>] [--note <n>]`:
  report how much of an account's quota is left. Numbers only, never keys.
- `swarm admit <edit|test|index|build|install|worktree>`: exit 0 means there is
  room on this machine for that kind of work, exit 5 means there is not.

**Starting a worker: `swarm run`**

A CLI worker (a Codex tab, any other command-line agent) can be started and
watched by the Brain itself, so a lane needs no handwork at its turn boundary.
- `swarm runner set <agent> --cmd <exe> [--model <m>] [--effort <e>]
  [--sandbox bypass|workspace-write|read-only|danger-full-access] [--search]
  [--args "<template>"] [--cwd <dir>]`: store how this worker is started. No key
  is stored — Codex brings its own login. `--cmd codex` builds the
  `codex exec` command line (`-m`, `-c model_reasoning_effort=`, `--sandbox`,
  `-c tools.web_search=`, `--json`, `-o`); any other program is built from
  `--args`, whose `{prompt}`, `{promptFile}`, `{log}`, `{last}`, `{cwd}`,
  `{model}`, `{effort}` and `{sandbox}` are filled in per run. A token that
  resolves to nothing is dropped.
- `swarm runner show <agent>`: the stored profile.
- `swarm run <agent>`: start the process **detached** with an empty stdin and a
  JSONL log at `<PLUGBRAIN_HOME>/runs/workers/<agent>-<stamp>.jsonl` (stderr
  beside it, the last message at `…-last.md`, the rendered prompt at
  `…-prompt.md`). The prompt comes from a template in the source and names the
  protocol documents the registered workspace actually has — protocol, newest
  lane rules and the Brain's own wrapper under `<workspace>/koordination` — so
  nothing owner-specific is baked in. The run row is written before the process
  starts, and the working directory defaults to the workspace root.
- `swarm run <agent> --status`: pid, start time, log path, last log event and
  the worker's turn state, plus the tail of the log.
- `swarm run <agent> --stop`: stop the process (on Windows the whole process
  tree of a `.cmd` shim) and set the worker's turn to `paused` — unless it had
  already ended its turn, which is kept.
- `swarm board` shows `runner: pid … running since …` and the last log event per
  worker. Looking at the board is also what settles a run whose process is gone:
  a worker that died **without ending its turn** is booked `blocked` with the
  last log lines as its summary, and the integrator gets a message. A worker
  that ended its turn first is left alone. Liveness is only ever
  `process.kill(pid, 0)`; a quiet log never means dead.
- Nothing is committed and no approval is bypassed: a started worker still claims
  its paths, admits its tests and ends its turn with a state like any other.

**Example: one task through one agent**
```bash
plugbrain swarm enqueue "Fix the flaky login test" --body "Repro in issue #12" --to codex-1
plugbrain swarm turn codex-1 start --claim
plugbrain swarm claim codex-1 src/auth/login.ts --task <task-id>
plugbrain swarm admit test && npm test
plugbrain swarm turn codex-1 end --state awaiting-commit --summary "Fixed the race, login tests pass" --deliver closeout/login.md
plugbrain swarm release codex-1 --task <task-id>
plugbrain swarm approve codex-1 --note "Reviewed. Commit it."
```

**Watching coordination**
```bash
plugbrain swarm turn agent-1 start
plugbrain swarm board
plugbrain swarm watch --for agent-1 --dirs ./review --timeout 20m --json
```

`swarm watch` streams coordination events from the local Brain live-event endpoint, batches events for five seconds, and checks watched Markdown directories and resource admission every 30 seconds. It reports turn changes, new messages and queued tasks for the watched agent, task deliveries, the `still?` watchdog, and the file/admission changes it polls itself. It exits with `0` on an event, `3` on timeout, and `1` after the live-event stream keeps failing. Set `PLUGBRAIN_URL` when the local Brain is served on a non-default URL.

The stream carries a monotonic event id and reconnects with bounded backoff on a dropped connection. `swarm watch` remembers the last id it saw in `<store home>/swarm-watch-cursor` and sends it as `Last-Event-ID` on the next (re)connection; the server replays the events still in its bounded buffer after that id. A restart therefore resumes where the previous run stopped — events older than the replay buffer are the only gap.

**Example: let the Brain start the agent**
```bash
plugbrain swarm runner set cx01 --cmd codex --model gpt-6-luna --effort high --sandbox bypass
plugbrain swarm run cx01
plugbrain swarm run cx01 --status     # pid, last log event, turn state
plugbrain swarm board                 # runner column, and settles dead runs
plugbrain swarm run cx01 --stop       # stops it, turn becomes paused
```
