# PlugBrain Devlog

The running development log of PlugBrain: what was built, what broke, and what was learned along the way — newest entries first.

---

## 0.3.0 — September 26, 2026 — Public release, project briefing, natural-language ask, and client setup

PlugBrain is now open-source under the MIT license. This release turns the local code and knowledge graph into a standalone, local-first engine ready for AI coding assistants:
- Natural-language project questions (`ask` / `Ctrl+K`) with cited sources and confidence levels.
- Automated client onboarding (`plugbrain init`, `plugbrain setup`) supporting seven MCP clients with backups and `--undo`.
- Git hygiene and machine awareness (`plugbrain hygiene`, disk depletion forecasts, machine-wide uncommitted work detection).
- Polyglot AST extraction (Python, Rust, SQL, Java) and trigram symbol search (`search_trigram`).
- Portable standalone builds for macOS and Linux alongside an unsigned Windows NSIS installer.
- Full 27-tool MCP server over stdio with automatic workspace detection.

Evidence: merge commits `013dba7` (ask), `574fa5b` (hygiene), `d975923` (setup), `f72dd8c` (store robustness), `3ebec45` (UX), `473fb2e` (polyglot/trigram), `b57e771` (reference docs), `64bda5b` (strict typecheck), `4833025` (0.3.0 release). Full test suite: 464 tests, 417 passed, 0 failed, 47 skipped.

---

## September 26, 2026 — A calmer app: navigation, onboarding, notes, graph, search

The interface was reworked from a heuristic audit that found eight blockers and confusion points. Navigation is now four plain-language tabs instead of nine jargon ones. First start walks you through opening a vault, with honest empty states and readable errors instead of cryptic dumps. Notes are the main workplace: a quick switcher (`Ctrl+O`), wiki-links and renaming built in. The graph got a legend (what the colors and node sizes mean) and an inspector that opens the underlying note or source directly. A new unified search finds notes and code in one place, with a clean file tree that jumps to the exact line on click.

Before/after: `docs/images/landing.png`, `docs/images/notes.png`, `docs/images/graph.png`, `docs/images/search.png`

Evidence: commits `cf18406` (U1), `354861f` (U2), `2919836` (U3), `5636a0c` (U4), `c90b270` (U5), integrated in `3ebec45`. The graph was measured at 2,418 nodes / 3,842 edges: 60 FPS while panning, layout settles in ~320 ms, inspector opens in ~11 ms.

---

## 0.2.6 — September 25, 2026 — Notes with many links keep their editor

If a note had dozens of wiki-links, the link panels used to push the editor down to zero height — the note became unusable exactly when it was most connected. Now the editor always keeps at least half the height, the links/backlinks panel is capped and scrolls internally, it can be collapsed with live counters ("35 links · 5 backlinks"), and long note titles no longer cover the toolbar on small windows.

Before/after: `docs/img/notes-edit-vorher-800x600.png` → `docs/img/notes-edit-nachher-800x600.png` (also captured at 1440×900 and for read/split modes)

Evidence: commit `9413e58`, release build `1dc5638`. UI typecheck exit 0; full suite: 332 tests, 285 passed, 0 failed, 47 skipped.

---

## 0.2.5 — September 25, 2026 — Only real data

The roadmap dashboard used to show invented numbers from a mock — impressive-looking and wrong. The mock is gone; every panel now shows only data the brain actually indexed, with an allow-list for links and honest empty states when there is nothing to show.

Before/after: `docs/img/queue.png` (the empty queue now honestly says it is empty)

Evidence: commits `3b4c219` (mock removal), `32694d1` (release). Standalone verification exit 0; full suite: 0 failed.

---

## 0.2.4 — September 25, 2026 — Notes with live preview (Obsidian-style)

Notes got a real markdown engine: an edit / split / read toggle, GitHub-style callouts, tables, interactive checklists, code blocks with a copy button, clickable `[[wiki-links]]`, a collapsible tag drawer, and frontmatter shown as clickable chips that jump straight to the referenced source line. This release also replaced the old 3D "Atlas" city view with a fast 2D force graph — the atlas was unreadable at scale and constantly reloading, the 2D graph renders in milliseconds and groups your repositories into labeled segments.

Before/after: `docs/img/graph-overview.png` → `docs/img/graph-overview-nachher.png`, `docs/img/notes-split.png` → `docs/img/notes-split-nachher.png`

Evidence: commits `2f1c66a` and `3b4c219`, merged as `74cfc09`. Receipts from the release audit: full suite 329 tests, 282 passed, 0 failed; markdown stress test 5/5 suites; standalone verification tiers 1–4 all green (exit 0); unsigned installer produced for Windows.
