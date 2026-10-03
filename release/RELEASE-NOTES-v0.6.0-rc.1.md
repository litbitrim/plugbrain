# PlugBrain 0.6.0-rc.1 — release candidate

**Status:** release candidate for review. Not tagged and not published as a
build yet; the installed runtime on the author's machine is still 0.5.0-dev.1.

0.6 is about **continuous mode**: a fleet of headless coding agents works
through a prepared queue overnight (scout → coder → reviewer → rework →
integration → next task) without an open chat session per agent. This
candidate collects the parts of that loop that have been built and tested.

## Added

- **`plugbrain swarm report [--since <iso>] [--json]`** — a model-free fleet
  report: last valid delivery, next runnable task, why each waiting lane waits,
  open reviews, integration backlog, automatic restarts.
- **`plugbrain swarm wave check <file>`** — validates a wave file before it is
  enqueued: required card fields, duplicate ids, unknown or cyclic `after`
  references, a reviewer on the same key as its coder.
- **`plugbrain swarm lead-tick [--dry-run] [--json]`** — computes the
  decisions of one lead cycle deterministically from the store: idle workers,
  blocked workers with their reason, failed reviews that need rework.
- **`plugbrain swarm quota-pool show [<pool>]`** — shows the effective pool
  policy (concurrency, rate) and every holder and reservation of a pool.
- **Owner stop** — `plugbrain swarm stop <agent|--all> --owner` survives
  restarts and is never lifted by the watchdog; the board shows it.
- **Opt-in mandate scheduling** — `claimNextTask` can be asked to hand out
  only unaddressed tasks whose plan reference is in the ledger
  (`requireMandate`) and to keep one claim per agent (`singleClaim`). The
  default behaviour is unchanged.
- **Continuous-mode guide** (`docs/dauermodus.md`, German; an English version
  follows) and the **GitNexus / Brain MCP reference slice**
  (`docs/reference-editions/gitnexus-brain-mcp-2026-09-30.md`).
- **`bench/m09-parity.mjs`** — a reproducible latency and answer comparison of
  PlugBrain and GitNexus on ten fixed questions.

## Fixed

- **Idempotent delivery.** Delivering the same task twice with the same
  evidence records one delivery and releases dependents once; a delivery with
  different or missing evidence on a delivered task is rejected.
- **Launch errors no longer release dependents.** A task whose launch failed
  does not count as arrived for the tasks waiting on it.
- **A worker without a current task is not booked as blocked.** When a run
  ends mid-turn and the agent holds no task, it is set to `needs-task` and no
  integrator alert is raised; the supervisor keeps running.
- **Deliveries are bound to their artifact.** A delivery counts only when its
  evidence is bound to the task, the attempt, the worktree and the full commit
  hash; a leftover from an earlier attempt cannot complete a new one.
- **Supervisor failures are classified from structured signals** instead of
  searching the whole log for words such as `429` or `unauthorized`.
- **Model family of NVIDIA-hosted models** (`nemotron-*`, `nvidia/*`) is
  recognised, so review independence can be checked for them.
- **CLI usage** lists every `swarm` subcommand again.

## Tests

On Windows (author's machine), full suite: 589 tests, 534 passed. Two failures,
neither caused by this candidate:

- `notes.test.ts` M2 reads the author's real vault and fails when a referenced
  file is missing locally; CI skips it without that vault.
- `city-big-planet.test.ts` failed once under four-way parallel load and passes
  alone (3/3) on this candidate and on its base.

Cross-platform results come from CI on the pull request.

## Not in this candidate

- Strict dependency release (dependents released only by a delivery) — in
  review; its CLI test still describes the old rule.
- Persistent supervisor idle (no exit after 24 empty polls) — being rebased.
- Attempt counters that survive a supervisor restart, staged dependency
  release, and automatic rework after a failed review — open.
