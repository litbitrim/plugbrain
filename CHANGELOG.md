# Changelog

All notable changes to PlugBrain are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the
project adheres to [Semantic Versioning](https://semver.org/).

## [0.3.0] — 2026-09-26

First public release (MIT), first release prepared for Windows, macOS and
Linux.

### Added

- **Natural-language project Q&A (`ask`):** Plain-language question answering across
  the codebase and documentation via `POST /api/ask`, the MCP tool `ask`, and the
  CLI command `plugbrain ask`, returning cited source locations and honest
  confidence levels.
- **Project Briefing:** Automatic project overview via `GET /api/briefing` and
  the web UI home view, synthesizing active repositories, languages, dirty state,
  and key symbols.
- **Automated MCP setup and client onboarding:** `plugbrain init` (including `--dry-run`),
  and `plugbrain setup` supporting seven MCP clients: Claude Code (`claude`),
  Codex (`codex`), Cursor (`cursor`), Windsurf (`windsurf`), Hermes (`hermes`),
  Antigravity (`agy`), and OpenCode (`opencode`), with automatic client configuration
  backups and `--undo`.
- **MCP stdio server and tools:** Full 27-tool MCP server exposed over stdio
  (`plugbrain mcp`) with automatic workspace resolution from the current directory,
  `PLUGBRAIN_WORKSPACE` environment variable, or explicit `--workspace`.
- **Git hygiene and host awareness:** `plugbrain hygiene`, `GET /api/hygiene`,
  `GET /api/machine`, `GET /api/repos`, and the `hygiene`, `machine`, and `repos` MCP tools.
  Includes non-destructive WIP snapshots (`--wip-snapshot`) to rescue uncommitted
  work outside the brain, disk capacity depletion forecasts via linear trend
  analysis, and machine-wide git repository discovery.
- **Polyglot AST extraction:** Language extractors for Python, Rust, SQL, Java, and Go,
  alongside TypeScript and JavaScript.
- **Trigram symbol search:** SQLite FTS5 trigram search (`search_trigram`) for
  sub-identifier and concept matching, with automatic non-destructive backfill for
  pre-existing databases.
- **Web UI enhancements:** Project briefing landing page, keyboard Ask bar (`Ctrl+K`),
  Hygiene/Cleanup view (`Aufräumen`), "Copy as Context" action, and honest route
  states distinguishing missing routes (HTTP 404/501) from server or network errors.
- **Reference documentation:** Complete reference documentation for all 27 MCP tools
  (`docs/mcp-tools.md`), HTTP API endpoints (`docs/http-api.md`), and CLI commands
  (`docs/cli.md`), guarded by automated consistency tests (`test/docs-consistency.test.ts`).
- **Claude Code plugin:** `.claude-plugin/plugin.json`, marketplace entry,
  `.mcp.json`, the `brain` and `open` skills, and a session-start hook that
  ensures the brain daemon is running and prints the UI URL.
- **Portable builds for macOS and Linux:** Standalone tarballs
  (`plugbrain-<version>-<os>-<arch>.tar.gz`) alongside the Windows NSIS installer;
  CI and release workflows for all three platforms with SHA-256 checksums and
  per-OS `verify:standalone`.
- **Secret scanning:** `scripts/secret-scan.mjs` and `npm run secret:scan` guarding
  the repository against credential-shaped content in CI.
- **Reproducible benchmark suite v2:** Comprehensive evaluation framework in
  `bench/v2/` testing 120 questions across four real-world codebases with frozen
  holdout sets.
- `DEVLOG.md` — the running development log of the project.

### Changed

- Repository metadata is public-facing: English description, MIT license,
  repository/homepage/keywords in `package.json`.
- Internal planning documents moved to `docs/history/` with a notice; the
  README is rewritten in English for the public release.
- **Workspace and repository identity:** Repository identity is derived from the Git
  common directory, ensuring multiple linked worktrees share a single canonical
  repository identity without duplicate indexing.
- **SQLite concurrency and robustness:** Enabled `busy_timeout` and bounded write
  retries across database connections to avoid `SQLITE_BUSY` contention between
  concurrent CLI, UI, and background indexing tasks.
- **Core endpoint discovery:** Atomic `<PLUGBRAIN_HOME>/core.json` endpoint state file
  published on daemon startup and cleaned up on shutdown.

### Fixed

- **FTS5 table migration:** Atomic migration in `migrateLegacySearch` prevents schema
  conflicts while upgrading legacy database search tables.
- **Single-repo WIP snapshots:** `singleRepoSnapshot` populates the required `workspace`
  field and defers workspace validation when snapshotting an unregistered external repo.
- **Client setup safety:** Atomic writes and counter-backups preserve user configuration
  files during setup and rollbacks.
- **Route error discrimination:** Fixed discriminators in UI fetch wrappers and views
  to distinguish missing routes (HTTP 404/501) from unreachable brain servers or internal
  500 errors, avoiding false "not implemented" banners.
- **Strict TypeScript type checking:** Clean separation of UI and Node compilation
  boundaries, reducing root typecheck errors and ensuring strict typing across core modules.

### Known Issues

- The web interface is currently in German (localization into English is planned for a future release).
- The Vite 5 development server has four known security advisories affecting local development mode only (`npm run dev`; see `npm audit --prefix ui`): `GHSA-67mh-4wv8-2f99` (esbuild dev-server request exposure, moderate), `GHSA-4w7w-66w2-5vf9` (Vite path traversal in optimized deps `.map` handling, moderate), `GHSA-v6wh-96g9-6wx3` (Windows UNC path handling in launch-editor, moderate), and `GHSA-fx2h-pf6j-xcff` (Vite `server.fs.deny` bypass on Windows alternate paths, high). The built standalone application is unaffected.
- Initial load of the Hygiene view on large machines with dozens of repositories can take up to ~20 seconds while performing the cold git census.
- The project briefing view currently reports TypeScript twice under language breakdowns.
- The Windows NSIS installer is unsigned (Windows SmartScreen may present an unknown publisher warning upon first run).

## [0.2.6] — 2026-09-25

### Fixed

- Notes with many links keep their editor: bound meta panels can no longer
  squeeze the editor below 50% of the pane or overlap the header.

## [0.2.5] — 2026-09-25

### Fixed

- Rebuilt the shipped UI bundle without the roadmap mock leaking into the
  release.

## [0.2.4] — 2026-09-25

### Added

- Obsidian live markdown preview, tag drawer and roadmap velocity cockpit in
  the UI.
- Honest UI and reliable brain-home resolution (registry, env, fallback).

## [0.2.3] — 2026-09-24

### Added

- `swarm deliver`: a worker hands in its claimed task with an evidence path;
  only the lease holder can deliver.

## [0.2.2] — 2026-09-23

### Fixed

- Silent installer dialogs: NSIS installation works unattended.

## [0.2.1] — 2026-09-23

### Fixed

- Writer fence: concurrent writers can no longer interleave on the same file.
