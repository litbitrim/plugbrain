# Codex

Codex keeps its MCP servers in the `mcp_servers` table of
`~/.codex/config.toml`. PlugBrain is added as one TOML table named `plugbrain`.

## Prerequisite

- PlugBrain, either the installed product or a checkout. A checkout entry runs
  the TypeScript CLI directly and therefore needs Node.js 24 or newer
  (the `engines` field in `package.json`).
- The `~/.codex` folder must exist; `config.toml` inside it may be missing.
  Detection counts the folder as installed (`resolveClientTargets` in
  `src/setup/clients.ts`).

## Setup

```bash
plugbrain setup codex
```

## What is written

In `~/.codex/config.toml`:

```toml
[mcp_servers.plugbrain]
command = "<node>"
args = ["<path to the PlugBrain CLI>", "mcp"]
```

- `command` is the node binary that ran the setup; `args` ends in `mcp`.
  From a checkout the CLI is still a `.ts` file, so `args` starts with
  `--experimental-strip-types` (`buildEntry` in `src/setup/clients.ts`).
- The file is edited in place: if the table exists it is replaced, otherwise the
  block is appended. Comments and the layout of your other tables survive
  (`renderToml`).
- A file that does not exist yet is created with only this block in it.

## Check

1. `plugbrain setup codex --dry-run` prints `unchanged` for Codex when the entry
   is already there — that is the cheap proof it was written as intended.
2. Start Codex inside your project and ask it to call a PlugBrain tool, for
   example `search` with a word from your code, or `swarm_board` for the fleet
   view. The workspace comes from the folder Codex starts PlugBrain in, so it
   must be a registered and indexed project (`plugbrain init` does both).
3. If no tool answers, run `plugbrain mcp` by hand in that folder: it speaks
   stdio, and a folder with no workspace gets a clear refusal rather than a
   crash.

## Undo

```bash
plugbrain setup codex --undo
```

Restores the newest `<file>.plugbrain-backup-<stamp>` next to the file. Your
current state is kept as `<file>.plugbrain-undobackup-<stamp>` first. If setup
created the file, undo removes only the `plugbrain` entry and deletes the file
when nothing of yours is left in it.

## Agent protocol

Codex reads a project's `AGENTS.md`, which is also where the PlugBrain turn
rules belong: [agent-protocol.md](../agent-protocol.md).
