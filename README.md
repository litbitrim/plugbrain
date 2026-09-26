# PlugBrain

[![CI](https://github.com/litbitrim/plugbrain/actions/workflows/ci.yml/badge.svg)](https://github.com/litbitrim/plugbrain/actions/workflows/ci.yml)

**PlugBrain is a local project and code memory for AI agents** — real AST-based
code intelligence over your repositories plus an Obsidian-style note vault,
exposed to Claude Code (and any MCP client) as one set of tools. Everything
runs on your machine. No cloud, no telemetry.

![Briefing — project summary, entry points and hotspots](docs/images/briefing.png)
![Ask — query the knowledge graph and code symbols](docs/images/ask.png)
![Graph — interactive knowledge graph and dependencies](docs/images/graph.png)
![Notes — Obsidian-style markdown vault with backlinks](docs/images/notes.png)
![Cleanup — git hygiene and uncommitted work protection](docs/images/cleanup.png)

## Why PlugBrain?

Code assistants forget. Every session starts from zero: the agent re-reads
files it has already read, misses the note where you wrote down *why* a
decision was made, and steps on other agents editing the same files.
Existing code-graph tools help with the code half of that problem:

- **GitNexus** indexes one repository into a graph you can query — but it has
  no notes, no agent coordination, and no MCP surface for your daily driver.
- **CodeGraph** maps symbols and dependencies well, but is a library you wire
  up yourself rather than a product an agent can talk to.

PlugBrain combines both halves in one local brain:

| | GitNexus | CodeGraph | PlugBrain |
| --- | --- | --- | --- |
| AST code intelligence (symbols, callers, impact) | ✓ | ✓ | ✓ |
| Obsidian-style notes with code bindings | – | – | ✓ |
| Multi-agent leases, fencing and awareness | – | – | ✓ |
| MCP server for Claude Code & friends | – | – | ✓ |
| Fully local, single binary, no account | – | – | ✓ |

<!-- BENCH -->
<!-- The integrator fills this section with the measured numbers from BENCH-02
     (indexing speed, query latency, memory) once that benchmark lane reports. -->

## Quickstart

**Windows:** download `PlugBrain-<version>-win-x64.exe` from
[Releases](https://github.com/litbitrim/plugbrain/releases) and run it. The
installer bundles a portable Node.js runtime — nothing else to install.

**macOS / Linux:** grab `plugbrain-<version>-<os>-<arch>.tar.gz` from the same
releases page, unpack it and put `bin/plugbrain` on your `PATH`.

Then, inside your project folder:

```bash
# One-time: create the brain store and register this folder as a workspace
plugbrain init

# Start the local brain (UI + API + MCP transport)
plugbrain serve
```

Open `http://localhost:4310` for the cockpit. The data directory defaults to
`~/.plugbrain`; set `PLUGBRAIN_HOME` to choose another location.

### Use it from Claude Code

PlugBrain ships as a Claude Code plugin with its own marketplace entry:

```
/plugin marketplace add litbitrim/plugbrain
/plugin install plugbrain@plugbrain
```

The plugin starts the brain when needed (session hook), and gives Claude the
`skills/brain` skill: *ask the brain first* — context packs before edits,
impact analysis before renames, notes before re-deriving decisions.

## MCP tools

`plugbrain mcp` speaks the Model Context Protocol over stdio, giving agents instant access to code intelligence and knowledge:

- `ask` — Ask in plain language; routes to the right tool and returns one clear sentence with source citations.
- `context_pack` — Build goal-oriented context packs with relevant files, symbols, and dependencies.
- `query` — Concept search across indexed AST symbols, file paths, and notes.
- `context` — 360-degree symbol context: callers, callees, and execution flow memberships.
- `impact` — Blast-radius analysis showing upstream and downstream dependency changes before editing.

For the full reference of all tools (including search, notes, git hygiene, and multi-agent coordination), see [MCP Tools Reference](docs/mcp-tools.md).

## Privacy

- Everything stays on your machine: the store is a single SQLite database
  under `PLUGBRAIN_HOME`, indexing runs locally, the UI is served locally.
- No telemetry, no analytics, no phone-home. The only network traffic is the
  local HTTP server on `127.0.0.1`.
- The HTTP API requires a bearer token that is generated on first start and
  kept in `<PLUGBRAIN_HOME>/auth.token`.

## Development

```bash
git clone https://github.com/litbitrim/plugbrain
cd plugbrain
npm install
npm test          # unit + integration tests (node:test)
npm run serve     # start the brain against the current folder
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE) — Copyright (c) 2026 litbitrim
