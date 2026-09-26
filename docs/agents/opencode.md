# OpenCode

OpenCode is the one client whose server map is not called `mcpServers`. It keeps
its MCP servers in a `mcp` map in `~/.config/opencode/opencode.json`, and
PlugBrain is added there as one more server.

## Prerequisite

- PlugBrain, either the installed product or a checkout. A checkout entry runs
  the TypeScript CLI directly and therefore needs Node.js 24 or newer
  (the `engines` field in `package.json`).
- The `~/.config/opencode` folder must exist; `opencode.json` inside it may be
  missing. Detection counts the folder as installed (`resolveClientTargets` in
  `src/setup/clients.ts`).

## Setup

```bash
plugbrain setup opencode
```

## What is written

In `~/.config/opencode/opencode.json`:

```json
{
  "mcp": {
    "plugbrain": {
      "command": "<node>",
      "args": ["<path to the PlugBrain CLI>", "mcp"]
    }
  }
}
```

- The map key is `mcp`, not `mcpServers`; that is the one difference from the
  other JSON clients (`CLIENTS` in `src/setup/clients.ts`).
- `command` is the node binary that ran the setup; `args` ends in `mcp`.
  From a checkout the CLI is still a `.ts` file, so `args` starts with
  `--experimental-strip-types` (`buildEntry`).
- Every other entry in the file is kept. The file is re-serialised with
  two-space indentation, so its layout may change even where the content does
  not.
- If the file is not valid JSON, setup refuses to rewrite it and reports an
  error instead.

## Check

1. `plugbrain setup opencode --dry-run` prints `unchanged` for OpenCode when the
   entry is already there — that is the cheap proof it was written as intended.
2. Start OpenCode inside your project and ask the agent to call a PlugBrain tool,
   for example `search` with a word from your code, or `swarm_board` for the
   fleet view. The workspace comes from the folder OpenCode starts PlugBrain in,
   so it must be a registered and indexed project (`plugbrain init` does both).
3. If no tool answers, run `plugbrain mcp` by hand in that folder: it speaks
   stdio, and a folder with no workspace gets a clear refusal rather than a
   crash.

## Undo

```bash
plugbrain setup opencode --undo
```

Restores the newest `<file>.plugbrain-backup-<stamp>` next to the file. Your
current state is kept as `<file>.plugbrain-undobackup-<stamp>` first. If setup
created the file, undo removes only the `plugbrain` entry and deletes the file
when nothing of yours is left in it.

## Agent protocol

OpenCode reads a project's `AGENTS.md`, which is also where the PlugBrain turn
rules belong: [agent-protocol.md](../agent-protocol.md).
