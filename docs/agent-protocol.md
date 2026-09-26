# Agent protocol

PlugBrain only coordinates agents that check in. This page holds the rules an
agent follows on every turn. Paste the block below into your project's
`AGENTS.md` (Codex, Cursor, OpenCode and others read it) or `CLAUDE.md`
(Claude Code), and give every agent its own id.

Commands are the `plugbrain swarm` CLI, so any agent that can run a shell
command can take part. See [cli.md](cli.md#swarm) for every option, and
[agents/](agents/README.md) for teaching a client to reach PlugBrain in the
first place.

## Before the first turn

Register each agent once. The account label tells the board which quota the
agent spends; one key or subscription can carry several agents.

```bash
plugbrain swarm register codex-1 --surface other --account openai --model gpt-6-luna
plugbrain swarm register claude-1 --surface claude-code --account anthropic
```

Surfaces are `claude-code`, `codex-app`, `freebuff`, `agy`, `native` and `other`.

## Block for AGENTS.md / CLAUDE.md

```markdown
## Working with PlugBrain

You are one agent in a team coordinated by PlugBrain. Your agent id is `<id>`.

1. **Start of every turn:** run `plugbrain swarm turn <id> start`. Read every
   message it prints and acknowledge each one with
   `plugbrain swarm ack <id> <messageId>`. If a task is offered to you, take it
   with `plugbrain swarm turn <id> start --claim`.
2. **Before you write:** claim the paths you will change:
   `plugbrain swarm claim <id> <path>... --task <taskId>`. If the claim is
   refused, another agent owns the path. Message that agent
   (`plugbrain swarm send <agent> --subject "..." --body "..." --from <your id>`) instead of
   writing anyway. Set `PLUGBRAIN_AGENT=<your id>` once in your shell and every
   message is signed with your id; a message without a sender is refused.
3. **Before tests, builds, installs or new worktrees:** run
   `plugbrain swarm admit test|build|install|worktree`. Exit code 5 means the
   machine has no room. Do not start the work; end the turn as `blocked`.
4. **End of every turn,** with exactly one state:
   `plugbrain swarm turn <id> end --state <state> --summary "<one or two sentences>"`
   - `needs-task`: you are done and need new work
   - `awaiting-commit`: a tested change is ready; wait for approval
   - `blocked`: a real blocker, named in the summary
   - `paused`: you were told to stop
   Then release your claims: `plugbrain swarm release <id> --task <taskId>`.
   If you hold exactly one queue task and are handing in its result, add
   `--deliver <evidence-path>` with `needs-task` or `awaiting-commit`. This records
   the task as delivered. If you omit it, the task stays claimed and appears in
   `plugbrain swarm board --next` as a possible missing delivery.
5. **Commit only after approval.** Approval arrives as a message with the
   subject "Commit freigegeben". Commit, then end the turn with `needs-task`.
6. **Report limits, never secrets.** If your tool shows a quota, report the
   number: `plugbrain swarm quota <account> <remaining> percent|credits|requests|rpm|tokens`.
   Never put keys or tokens into commands, summaries, messages or notes.
```

## For the integrator

The integrator is whoever plans and merges: a person, or an agent given that
role.

| Task | Command |
| --- | --- |
| See every agent, its turn, task, claims and worktree | `plugbrain swarm board --git` |
| Queue work, optionally for one agent, optionally after another task | `plugbrain swarm enqueue "<title>" --body "<brief>" [--to <id>] [--after <taskId>]` |
| Send a message | `plugbrain swarm send <id> --subject "<s>" --body "<b>" --from integrator` |
| See who is still, and release arrivals | `plugbrain swarm watchdog` |
| Reviewer list and automatic review routing | `plugbrain swarm review-pool set <id>... && plugbrain swarm review-pool auto on` |
| Let an agent commit | `plugbrain swarm approve <id> [--note "<n>"]` |
| Machine room and quotas | `plugbrain swarm resources` |
| Take an agent off the board | `plugbrain swarm retire <id> --note "<reason>"` |

Two habits pay off: give every change an independent reviewer that runs on a
different model or key than its author, and write the brief into a file and
queue a pointer to it, so every agent can be restarted with the same one-line
prompt ("start your turn and take the offered task").
