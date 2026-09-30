# Hermes

Hermes keeps its MCP servers in an `mcp_servers` mapping in
`~/.hermes/config.yaml`. PlugBrain is added there as one more server. Hermes is
the only client of the seven whose config is YAML.

## Prerequisite

- PlugBrain, either the installed product or a checkout. A checkout entry runs
  the TypeScript CLI directly and therefore needs Node.js 24 or newer
  (the `engines` field in `package.json`).
- The `~/.hermes` folder must exist; `config.yaml` inside it may be missing.
  Detection counts the folder as installed (`resolveClientTargets` in
  `src/setup/clients.ts`).

## Setup

```bash
plugbrain setup hermes
```

## What is written

In `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  plugbrain:
    command: '<node>'
    args:
      - '<path to the PlugBrain CLI>'
      - 'mcp'
```

- Scalars are written in single quotes with literal backslashes, so a Windows
  path needs no escaping (`yamlScalar` in `src/setup/clients.ts`).
- The block is inserted into the existing `mcp_servers` mapping, or the mapping
  is created at the end of the file. Comments and the layout of your other
  keys survive (`renderYaml`).

## Check

1. `plugbrain setup hermes --dry-run` prints `unchanged` for Hermes when the
   entry is already there — that is the cheap proof it was written as intended.
2. Start Hermes inside your project and ask the agent to call a PlugBrain tool,
   for example `search` with a word from your code, or `swarm_board` for the
   fleet view. The workspace comes from the folder Hermes starts PlugBrain in,
   so it must be a registered and indexed project (`plugbrain init` does both).
3. If no tool answers, run `plugbrain mcp` by hand in that folder: it speaks
   stdio, and a folder with no workspace gets a clear refusal rather than a
   crash.

## Undo

```bash
plugbrain setup hermes --undo
```

Restores the newest `<file>.plugbrain-backup-<stamp>` next to the file. Your
current state is kept as `<file>.plugbrain-undobackup-<stamp>` first. If setup
created the file, undo removes only the `plugbrain` entry and deletes the file
when nothing of yours is left in it.

## Agent protocol

The per-turn rules belong in the project's `AGENTS.md`:
[agent-protocol.md](../agent-protocol.md).
