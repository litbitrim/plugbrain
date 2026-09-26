# Windsurf

Windsurf keeps its MCP servers in a `mcpServers` map in
`~/.codeium/windsurf/mcp_config.json`. PlugBrain is added there as one more
server.

## Prerequisite

- PlugBrain, either the installed product or a checkout. A checkout entry runs
  the TypeScript CLI directly and therefore needs Node.js 24 or newer
  (the `engines` field in `package.json`).
- The `~/.codeium/windsurf` folder must exist; `mcp_config.json` inside it may be
  missing. Detection counts the folder as installed (`resolveClientTargets` in
  `src/setup/clients.ts`).

## Setup

```bash
plugbrain setup windsurf
```

## What is written

In `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "plugbrain": {
      "command": "<node>",
      "args": ["<path to the PlugBrain CLI>", "mcp"]
    }
  }
}
```

- `command` is the node binary that ran the setup; `args` ends in `mcp`.
  From a checkout the CLI is still a `.ts` file, so `args` starts with
  `--experimental-strip-types` (`buildEntry` in `src/setup/clients.ts`).
- Every other server in the map is kept. The file is re-serialised with
  two-space indentation, so its layout may change even where the content does
  not.
- If the file is not valid JSON, setup refuses to rewrite it and reports an
  error instead.

## Check

1. `plugbrain setup windsurf --dry-run` prints `unchanged` for Windsurf when the
   entry is already there — that is the cheap proof it was written as intended.
2. Start Windsurf inside your project and ask the agent to call a PlugBrain tool,
   for example `search` with a word from your code, or `swarm_board` for the
   fleet view. The workspace comes from the folder Windsurf starts PlugBrain in,
   so it must be a registered and indexed project (`plugbrain init` does both).
3. If no tool answers, run `plugbrain mcp` by hand in that folder: it speaks
   stdio, and a folder with no workspace gets a clear refusal rather than a
   crash.

## Undo

```bash
plugbrain setup windsurf --undo
```

Restores the newest `<file>.plugbrain-backup-<stamp>` next to the file. Your
current state is kept as `<file>.plugbrain-undobackup-<stamp>` first. If setup
created the file, undo removes only the `plugbrain` entry and deletes the file
when nothing of yours is left in it.

## Agent protocol

The per-turn rules belong in the project's `AGENTS.md`:
[agent-protocol.md](../agent-protocol.md).
