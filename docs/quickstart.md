# Quickstart

PlugBrain gives your AI coding client a brain for the project you are already
standing in. You type **one** command inside your project folder, and from then
on Claude Code, Codex, Cursor and friends know that project through PlugBrain —
no workspace id, no token, no copy-pasting paths between config files.

The current source requires **Node.js 24+, npm and Git**. The graph lives in a single SQLite file, with no database server. Public release 0.3.1 has no installer assets; use the source path below. [Channels](channels.md) distinguishes source and local candidates.

## Source checkout

The source commands select the entry candidate branch, including the initialization and standalone-notes fixes. Main remains a separate development channel until review and integration. Install the dependencies in a fresh checkout:

```sh
git clone --branch codex/brain-public-entry-20261004 --single-branch https://github.com/litbitrim/plugbrain.git
cd plugbrain
npm ci
node --experimental-strip-types src/cli.ts init ../my-project --no-clients --no-agents-file
node --experimental-strip-types src/cli.ts serve
```

Replace `../my-project` with a real project folder. Open the printed loopback URL. For an isolated trial, set `PLUGBRAIN_HOME` to a new local directory before these commands: PowerShell uses `$env:PLUGBRAIN_HOME = "$env:TEMP/plugbrain-trial"`; a POSIX shell uses `export PLUGBRAIN_HOME="$HOME/.plugbrain-trial"`. Keep that choice consistent for the whole trial.

The examples below use the short name `plugbrain` for an installed CLI. In this source checkout, replace it with `node --experimental-strip-types src/cli.ts`. Run commands from the checkout and pass the intended project path explicitly. Installing dependencies does not put a global `plugbrain` command on PATH. Client setup is optional and can be previewed before it changes config files.

## 1. One command

From your project folder:

```sh
plugbrain init
```

That is the whole setup. It

1. registers the folder (its git root, when it is a repository),
2. indexes it, printing progress as it goes,
3. prints the URL of the local dashboard,
4. adds a `plugbrain` MCP entry to every client it finds installed.
5. adds the PlugBrain agent instructions to `AGENTS.md` (and to an unlinked `CLAUDE.md`, when present).

Run it twice and nothing changes the second time — `init` is idempotent.

Not inside a git repository? Point it at any folder explicitly:

```sh
plugbrain init ./my-notes --no-clients
```

`--no-clients` registers and indexes without touching any client config.
Use `--no-agents-file` to skip the managed agent-instructions block.

The managed block sits between `<!-- plugbrain:agent-protocol:start -->` and
`<!-- plugbrain:agent-protocol:end -->`; text outside it stays intact. Preview,
target, or undo it with:

```sh
plugbrain agents-file --dry-run
plugbrain agents-file --target both
plugbrain agents-file --undo
```

To check client setup without changing files or starting services, run
`plugbrain doctor --agents` (or add `--json` for machine-readable output).

## 2. See what would happen first

`--dry-run` reports exactly what `init` would do — including the client config
diff — and writes **nothing**: no workspace row, no client file, no index.

```sh
plugbrain init --dry-run
```

Real output against a throwaway folder and a temporary config home (the CLI's
own path is abbreviated here):

```text
dry run (nothing is written):
would register workspace my-app
  workspace ws-4e5477b5c7e3
  root      /home/you/projects/my-app
  would index my-app

UI: http://127.0.0.1:4310/  (start it with: plugbrain serve)

clients:
  Cursor       would change /tmp/tmp.1FV57ZcB7e/.cursor/mcp.json
      - {}
      + {
      +   "mcpServers": {
      +     "plugbrain": {
      +       "command": "/usr/bin/node",
      +       "args": [
      +         "--experimental-strip-types",
      +         "/path/to/plugbrain/src/cli.ts",
      +         "mcp"
      +       ]
      +     }
      +   }
      + }
  (6 client(s) not installed — nothing written for them)
```

Every client that is not installed is reported as skipped, so you always see
which files were considered.

## 3. Start the dashboard (optional)

```sh
plugbrain serve
```

Then open <http://127.0.0.1:4310/>. **Atlas** shows the knowledge graph,
**City** the code metropolis, **Agent Mesh** the live swarm.

## 4. Point your client at it

`init` already did this for every detected client. To manage it yourself:

```sh
plugbrain setup                 # every detected client
plugbrain setup cursor          # just one: claude | codex | cursor | windsurf |
                                #            hermes | agy | opencode
plugbrain setup --all --dry-run # show the diff, write nothing
plugbrain setup --all --undo    # restore each file's newest backup
```

Before a config file changes at all, a copy named
`<file>.plugbrain-backup-<stamp>` is written next to it. Every other entry in
the file — and its comments and formatting — is left untouched.

The entry it writes is deliberately dumb: an absolute `node` and an absolute
path to the PlugBrain CLI, running the `mcp` verb. The workspace is not baked
in; the server reads it from the folder your client starts it in.

## Supported clients

| Client | Config file |
| --- | --- |
| Claude Code | `~/.claude.json` → `mcpServers` |
| Codex | `~/.codex/config.toml` → `[mcp_servers.plugbrain]` |
| Cursor | `~/.cursor/mcp.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Hermes | `~/.hermes/config.yaml` → `mcp_servers` |
| AGY | `~/.gemini/antigravity/mcp_config.json` → `mcpServers` |
| OpenCode | `~/.config/opencode/opencode.json` → `mcp` |

JSON, TOML and YAML are each written the way the client reads them. In a
sandbox or a test you can redirect all of them with `PLUGBRAIN_CONFIG_HOME=<dir>`
(the brain store itself is separate, under `PLUGBRAIN_HOME`).

## 5. Done

Ask your client to use PlugBrain — for example *"use PlugBrain to find where
authentication is handled"*. The server starts itself in your project folder and
knows which workspace that is.
