# PlugBrain

[![CI](https://github.com/litbitrim/plugbrain/actions/workflows/ci.yml/badge.svg)](https://github.com/litbitrim/plugbrain/actions/workflows/ci.yml)

**One local brain for all the coding agents working on your project.**

Claude Code, Codex, Gemini, GLM, a local model, several of each: any agent that
can run a shell command can join the same PlugBrain. Agents take tasks from a
shared queue, claim the files they are about to change, check in at the start
and end of every turn, message each other and wait for a commit approval.
Underneath sits one index of the project's code and notes, so every agent starts
from the same knowledge instead of re-reading the repository.

The aim is simple: more agents should mean more work done, not overwritten
files, duplicated tasks or an agent silently stuck for an hour.

Everything runs on your machine: one SQLite file, a daemon on `127.0.0.1`, no
cloud, no telemetry. MIT licensed.

## Status

- 0.3.1 is the first published release. It is developed on Windows; macOS and
  Linux run the same tests and packaging checks in CI.
- PlugBrain's own development runs on it. On 26 September 2026 one board
  coordinated Claude Code, three Codex CLI workers and four Freebuff workers on
  this repository.
- The web UI and the output of `plugbrain swarm` are in German for now. The
  other commands, the MCP tools and all documentation are in English.
- Not there yet: the store keeps only each agent's latest turn, so there is no
  turn history to replay, and worktrees of merged branches are not removed
  automatically. Both are being built.

## How agents work together

```bash
# Once per agent: who it is and which account it spends
plugbrain swarm register codex-1 --surface other --account openai --model gpt-6-luna
plugbrain swarm register claude-1 --surface claude-code --account anthropic

# Whoever plans, a person or an agent, queues work, optionally for one agent
plugbrain swarm enqueue "Fix the flaky login test" --body "Repro in issue #12" --to codex-1

# Every agent, at the start of every turn: read messages, take the offered task
plugbrain swarm turn codex-1 start --claim

# Before writing: claim the paths. A path another agent holds is refused.
plugbrain swarm claim codex-1 src/auth/login.ts --task <task-id>

# Before tests, builds or new worktrees: is there room? Exit 5 means no.
plugbrain swarm admit test

# At the end of every turn: exactly one state and a short summary
plugbrain swarm turn codex-1 end --state awaiting-commit --summary "Fixed the race, login tests pass"
plugbrain swarm release codex-1 --task <task-id>

# The integrator looks, approves, and sends the next hint
plugbrain swarm board --git
plugbrain swarm approve codex-1 --note "Reviewed. Commit it."
plugbrain swarm send codex-1 --subject "Next" --body "Rebase on main after your commit" --from integrator
```

A turn ends in one of four states: `needs-task` (done, give me work),
`awaiting-commit` (a tested change is ready), `blocked` (a real blocker, named in
the summary) or `paused`. `plugbrain swarm board` lists every agent once with its
account, turn state, unread messages, task, claims and worktree; with `--git` it
adds branch, head and uncommitted files, and it flags two agents writing in the
same worktree.

Agents that speak MCP find the board, turns, claims and messages as tools
(`swarm_board`, `swarm_turn`, `claim`, `release`, `message_send`, `inbox_read`,
`heartbeat`, `awareness`). Queueing, approving and admission are CLI-only today.

The per-turn rules for agents are written down so you can paste them into your
project's `AGENTS.md` or `CLAUDE.md`: [docs/agent-protocol.md](docs/agent-protocol.md).
All `swarm` commands: [docs/cli.md](docs/cli.md#swarm).

## The index underneath

The index answers the questions agents ask all day: where is this defined, who
calls it, what breaks if I change it, and what did we decide about it. The goal
is to match or beat GitNexus and CodeGraph on code questions and Obsidian on
project notes, in one index every agent shares.

**Code.** Symbols, callers and callees, impact of a change, changed files since a
revision, graph queries in Cypher, and `ask` for plain-language questions with
cited sources.

We compared PlugBrain with CodeGraph and GitNexus on 120 questions (definitions,
callers, impact, config keys, docs) across four of the author's own projects;
PlugBrain itself is not one of them. We wrote the questions ourselves. 40 were
frozen before any tuning and serve as the holdout. Every tool was driven through
its documented command-line interface, and every raw answer is stored with the
results.

| Tool | Holdout (40) | All questions (120) | Latency p50 | Latency p95 |
| :--- | :---: | :---: | :---: | :---: |
| PlugBrain | 38 / 40 | 106 / 120 | 265 ms (33 ms with the daemon running) | 478 ms |
| CodeGraph | 38 / 40 | 103 / 120 | 280 ms | 311 ms |
| GitNexus | 36 / 40 | 90 / 120 | 1,134 ms | 3,465 ms |

PlugBrain ties CodeGraph on the holdout and answers three more of all 120
questions. CodeGraph's call edges are still more complete on deeply polymorphic
class hierarchies. Method, raw answers, hand-checked misses and how to rerun it:
[bench/v2/RESULTS.md](bench/v2/RESULTS.md).

**Notes.** A Markdown vault with wiki-links, backlinks, tags, properties and
full-text search, in the same index as the code. A note can point at a file
(`code:`), a revision (`revision:`) and an agent run (`agentenlauf:`). Compared
with Obsidian there is no canvas, no mobile app and no plugin ecosystem.

## Quickstart

**Windows:** download `PlugBrain-<version>-win-x64.exe` from
[Releases](https://github.com/litbitrim/plugbrain/releases) and run it. The
installer brings its own Node.js runtime.

**macOS / Linux:** download `plugbrain-<version>-<os>-<arch>.tar.gz` from the same
page, unpack it and put `bin/plugbrain` on your `PATH`.

Then, inside your project folder:

```bash
plugbrain init     # register this folder, index it, add PlugBrain to your MCP clients
plugbrain serve    # the local daemon: web UI and API on http://127.0.0.1:4310
```

`plugbrain setup --all` (or `claude`, `codex`, `cursor`, `windsurf`, `hermes`,
`agy`, `opencode`) adds PlugBrain to an MCP client later. It backs up the
client's config first; `--undo` restores it. The data directory defaults to
`~/.plugbrain`; set `PLUGBRAIN_HOME` to choose another one. One page per client,
with the file it writes, how to check it took effect and how to remove it again:
[docs/agents/](docs/agents/).

### Claude Code plugin

```
/plugin marketplace add litbitrim/plugbrain
/plugin install plugbrain@plugbrain
```

The plugin starts the brain when a session needs it and gives Claude a skill that
asks the brain first: context before edits, impact before renames, notes before
re-deriving a decision.

## Privacy

- The store is one SQLite database under `PLUGBRAIN_HOME`. Indexing runs locally
  and the UI is served locally.
- No telemetry, no analytics, no phone-home. The only network listener is the
  local HTTP server on `127.0.0.1`.
- The HTTP API requires a bearer token that is generated on first start and kept
  in `<PLUGBRAIN_HOME>/auth.token`. The `swarm` commands work on the local store
  directly and need no token.

## Development

```bash
git clone https://github.com/litbitrim/plugbrain
cd plugbrain
npm install
npm test          # unit and integration tests (node:test)
npm run serve     # start the brain against the current folder
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE) — Copyright (c) 2026 litbitrim
