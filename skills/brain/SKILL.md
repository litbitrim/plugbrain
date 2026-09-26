---
name: brain
description: Ask the PlugBrain first - context packs, impact analysis and project notes before writing code in this repository. Use when exploring the codebase, planning edits, renaming symbols or looking for recorded decisions.
---

# Ask the brain first

This repository has a **local brain**: an indexed map of the code (symbols,
callers, impact) plus the project's notes. Ask it before you work — it is
faster and more accurate than re-reading files, and it knows decisions that
are written down nowhere else.

The brain runs locally; its MCP tools are available in this session. If a
call fails with a connection error, tell the user to run `plugbrain serve`.

## Order of operations

1. **Before editing or planning:** call `context_pack` with the goal or the
   paths you intend to touch. It returns files, symbols and dependencies that
   belong to the task.
2. **Before claiming or writing files:** call `awareness` for your intended
   paths. It shows live claims of other agents and conflict warnings. Claim
   with `claim` if you will write; release with `release` when done.
3. **Before a rename or a cross-file change:** call `impact` for the symbol or
   file. Let the blast radius shape your plan; use `rename_preview` to show a
   rename without writing anything.
4. **For "how does X work" and "where is Y":** call `query` (concept search
   across symbols and notes) or `search` (full-text). Use `context` for the
   360-degree view of one symbol (callers, callees, flows).
5. **Before answering questions about the project:** check the notes first —
   `notes_query` (property queries like `typ=gate AND stand=offen`),
   `notes_search` (prose), `notes_read` (one note with links),
   `notes_backlinks` (what references it). Decisions, gates and reasons live
   there; do not re-derive what is already written down.
6. **After a change:** `detect_changes` maps your diff to affected symbols and
   flows — useful for the summary and for reviewers.

## Practical rules

- `query`/`context`/`impact` answer *code* questions; `notes_*` answer
  *project* questions. When unsure which one fits, start with `query` — it
  searches both.
- One claim per task. Include the paths you will actually write, not the
  whole tree. Release promptly.
- The brain is local and attributed: your reads and writes are logged under
  your agent id, which keeps the fleet board honest.
- Never bypass the brain's answers with guesses about the codebase when a
  tool exists for the question.
