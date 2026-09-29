# Agent setup

One page per client: what it needs, the one command that configures it, what
lands in which file, how to check that it worked, and how to take it back out.

| Client | Page | Config file (under your home) | Format, map key |
| --- | --- | --- | --- |
| Claude Code | [claude-code.md](claude-code.md) | `.claude.json` | JSON, `mcpServers` |
| Codex | [codex.md](codex.md) | `.codex/config.toml` | TOML, `mcp_servers` |
| Cursor | [cursor.md](cursor.md) | `.cursor/mcp.json` | JSON, `mcpServers` |
| Windsurf | [windsurf.md](windsurf.md) | `.codeium/windsurf/mcp_config.json` | JSON, `mcpServers` |
| OpenCode | [opencode.md](opencode.md) | `.config/opencode/opencode.json` | JSON, `mcp` |
| Hermes | [hermes.md](hermes.md) | `.hermes/config.yaml` | YAML, `mcp_servers` |
| AGY | [agy.md](agy.md) | `.gemini/antigravity/mcp_config.json` | JSON, `mcpServers` |

The seven ids, paths, formats and map keys are `CLIENTS` in
[`src/setup/clients.ts`](../../src/setup/clients.ts).

## What every setup does

- **One command.** `plugbrain setup <id>`, or `plugbrain setup --all` for every
  client that is installed. An unknown id is refused (exit code 1) and the known
  ones are listed.
- **One entry, nothing else.** It writes a server named `plugbrain` into the
  client's own config file and changes no other entry's content.
- **No ids, no tokens.** The entry is only *the node binary*, *the PlugBrain CLI*
  and the argument `mcp`.
- **The workspace comes from the folder.** PlugBrain takes the project from the
  directory the client starts it in: `PLUGBRAIN_WORKSPACE` if set, else the
  registered root that contains the folder, else the folder's git root
  ([`src/setup/workspace-from-cwd.ts`](../../src/setup/workspace-from-cwd.ts)).
  So the same entry works in every project, and no workspace id has to be
  written anywhere.
- **A backup before the first real change.** A copy named
  `<file>.plugbrain-backup-<stamp>` lands next to the file. If setup created the
  file, the backup is an empty marker instead, so `--undo` can tell a creation
  from an update.
- **Idempotent.** A second run that would write the same entry writes nothing and
  takes no backup.
- **`--dry-run` writes nothing at all** — no file, no backup — and prints only
  the changed lines.
- **`--undo` takes it back out.** For a file setup created it removes just the
  `plugbrain` entry (and the file, when nothing of yours remains); for an
  existing file it restores the newest backup. Either way the state it replaces
  is kept as `<file>.plugbrain-undobackup-<stamp>` first, so edits you made after
  setup are not lost.
- **A client that is not installed is skipped**, and the report says how many
  were. Nothing is written for them.
- **Errors stay local.** A client whose config cannot be parsed is reported as an
  `error`; the other clients are still configured.
- `PLUGBRAIN_CONFIG_HOME` moves where the client config files are looked for.
  That is not `PLUGBRAIN_HOME`, which is the brain's own data directory.

Run `plugbrain setup --dry-run` first if you want to see the change before it
happens.

## After setup: the per-turn rules

Setup teaches a client how to *reach* PlugBrain. What an agent should do on every
turn — check in, claim paths, admit work, end the turn with a state — is the
agent protocol block in [agent-protocol.md](../agent-protocol.md). Paste it into
the project's `AGENTS.md` or `CLAUDE.md`, and give every agent its own id.

## See also

- [`plugbrain setup`](../cli.md#setup) — the command and its flags
- [MCP tools](../mcp-tools.md) — what an agent can call once the server runs
- [agent-protocol.md](../agent-protocol.md) — the turn rules
