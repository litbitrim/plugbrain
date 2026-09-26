# Changelog

All notable changes to PlugBrain are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the
project adheres to [Semantic Versioning](https://semver.org/).

## [0.3.0] — 2026-09-26

First public release (MIT), first release prepared for Windows, macOS and
Linux.

### Added

- Claude Code plugin: `.claude-plugin/plugin.json`, marketplace entry,
  `.mcp.json`, the `brain` and `open` skills, and a session-start hook that
  makes sure the brain is running and prints the UI URL.
- Portable builds for macOS and Linux (`plugbrain-<version>-<os>-<arch>.tar.gz`)
  alongside the Windows NSIS installer; CI and release workflows for all
  three platforms with SHA-256 checksums and per-OS `verify:standalone`.
- `scripts/secret-scan.mjs` plus a `secret:scan` npm script guarding the
  repository against credential-shaped content.
- `DEVLOG.md` — the running development log of the project.

### Changed

- Repository metadata is public-facing: English description, MIT license,
  repository/homepage/keywords in `package.json`.
- Internal planning documents moved to `docs/history/` with a notice; the
  README is rewritten in English for the public release.

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
