# Claude Code

Claude Code keeps its MCP servers in a `mcpServers` map in `~/.claude.json`.
PlugBrain is added there as one more server; the optional plugin below is a
second, independent way in.

## Prerequisite

- PlugBrain, either the installed product or a checkout. A checkout entry runs
  the TypeScript CLI directly and therefore needs Node.js 24 or newer
  (the `engines` field in `package.json`).
- `~/.claude.json` must exist. Claude Code writes it on first start, so start
  Claude Code once before running setup.
  Claude Code is the one client whose detection looks at the file only — an
  existing folder is not enough, because its file sits directly in the home
  directory (`resolveClientTargets` in `src/setup/clients.ts`).

## Setup

```bash
plugbrain setup claude
```

## Optional: the plugin

The repository also ships a Claude Code plugin. The plugin starts the brain when
a session needs it and gives Claude a skill that asks the brain first: context
before edits, impact before renames, notes before re-deriving a decision.

```
/plugin marketplace add litbitrim/plugbrain
/plugin install plugbrain@plugbrain
```

## What is written

In `~/.claude.json`:

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

1. `plugbrain setup claude --dry-run` prints `unchanged` for Claude Code when
   the entry is already there — that is the cheap proof it was written as
   intended.
2. Start Claude Code inside your project and ask it to call a PlugBrain tool,
   for example `search` with a word from your code, or `swarm_board` for the
   fleet view. The workspace comes from the folder Claude Code starts PlugBrain
   in, so it must be a registered and indexed project (`plugbrain init` does
   both).
3. If no tool answers, run `plugbrain mcp` by hand in that folder: it speaks
   stdio, and a folder with no workspace gets a clear refusal rather than a
   crash.

## Undo

```bash
plugbrain setup claude --undo
```

Restores the newest `<file>.plugbrain-backup-<stamp>` next to the file. Your
current state is kept as `<file>.plugbrain-undobackup-<stamp>` first. If setup
created the file, undo removes only the `plugbrain` entry and deletes the file
when nothing of yours is left in it.

## Agent protocol

Setup only teaches Claude Code how to reach PlugBrain. The per-turn rules for
the agent go into `CLAUDE.md`: [agent-protocol.md](../agent-protocol.md).
