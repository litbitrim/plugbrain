# Project: PlugBrain Standalone Windows Desktop Application

## Architecture
PlugBrain is a local-first desktop application combining AST code intelligence, an Obsidian-class Markdown knowledge base, multi-agent activity tracking, and a standalone portable Node.js runtime with an NSIS installer.

- **Frontend (`ui/`)**: React 19 + TypeScript + Vite cockpit interface. Provides 8 core views: Graph (Atlas), Wissen (Notes), Explorer, Suche, Packs, City, Mesh, and Queue. Communicates with backend via REST endpoints (`/api/notes`, `/api/agent`, `/api/symbols`, `/api/files`, `/api/meta`).
- **Backend Core (`src/`)**: Node.js core running directly with `--experimental-strip-types`. Manages AST indexing (Tree-sitter / Babel / TypeScript parser), graph relationships, full-text search, and multi-agent coordination.
- **Standalone Runtime (`scripts/build-standalone.mjs` -> `dist/`)**: Self-contained runtime bundling portable `node.exe`, CLI daemon `plugbrain.mjs`, background worker `worker.mjs`, static UI assets `ui-dist/`, and SHA-256 release manifest `release.json`.
- **Desktop Packaging (`scripts/package-nsis.mjs` -> `release/`)**: Production Windows NSIS installer (`PlugBrain-0.2.4-win-x64.exe`) with silent/interactive install modes, desktop shortcuts, uninstaller, SHA-256 hash, and provenance metadata.

## Feature Inventory
Every feature from the Survey phase is mapped to an assigned milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Notes CRUD & Autosave | Markdown note creation, editing, debounced optimistic autosave, conflict detection, undo in NotesView.tsx | M1 | R1 |
| 2 | Wiki-links & Live Backlinks | Bidirectional [[Note]] parsing, dedicated live backlinks pane, tag filtering in NotesView.tsx | M1 | R1 |
| 3 | Frontmatter Code Binding | Structured frontmatter templates (typ: entscheidung, typ: widerspruch) with clickable code path links | M1 | R1 |
| 4 | Instant Dual Search | As-you-type instant search across note prose and AST symbol definitions | M1 | R1 |
| 5 | Explorer Sidebar Tree | Recursive search filtering (preserving parent paths), collapse/expand all, path normalization | M2 | R2 |
| 6 | "Quelle öffnen" Navigation | Centralized handleOpenSource in App.tsx parsing path:line with centered line highlighting in SourceView | M2 | R2 |
| 7 | Command-Center Design Tokens | Dark palette (--bg: #050706, --panel: #0B0F0D), eliminate amber/orange, mono uppercase status pills | M2 | R2 |
| 8 | Viewport Defect Elimination | Fix CSS layout collisions, eliminate unscaled viewport frames, operationalize all 8 views | M2 | R2 |
| 9 | Standalone Bundling & Build | Compile clean UI assets to ui-dist/ and bundle portable runtime with node.exe into dist/ | M3 | R3 |
| 10 | Standalone Verification Suite | Resolve Playwright strict-mode button ambiguity and execute verify-standalone.mjs smoke verification | M3 | R3 |
| 11 | Unit & Integration Test Green | Fix ui-mesh and ui-atlas-layout test regex assertions, achieve 100% pass on npm test | M3 | R3 |
| 12 | NSIS Installer Packaging | Package release/PlugBrain-0.2.4-win-x64.exe with makensis auto-detection, SHA-256, and provenance | M4 | R4 |
| 13 | Safe Command Chaining & Install | Enforce && chaining, test silent (/S) and interactive installation without unhandled dialogs | M4 | R4 |
| 14 | Desktop Session Launch | Verify interactive desktop launch on WinSta0\Default session | M4 | R4 |
| 15 | E2E Opaque-Box Acceptance Suite | Comprehensive 4-tier E2E testing validating all requirements before victory sign-off | M5 | E2E |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Notes & Knowledge Engine | Features 1-4: NotesView.tsx autosave, live backlinks, dual search, frontmatter code binding, Playwright button fix | None | IN_PROGRESS |
| M2 | Cockpit UI & Viewport Polish | Features 5-8: ExplorerView tree/filter, App.tsx Quelle öffnen navigation, design tokens, 8 views | M1 (interface) | PLANNED |
| M3 | Standalone Runtime & Verification | Features 9-11: UI build, dist/ portable bundling, verify-standalone.mjs, npm test 100% pass | M1, M2 | PLANNED |
| M4 | NSIS Packaging & Desktop Launch | Features 12-14: Version 0.2.4, package-nsis.mjs, SHA-256, provenance, silent/interactive install, WinSta0 launch | M3 | PLANNED |
| M5 | E2E Test Suite & Adversarial Hardening | Feature 15: Opaque-box Tier 1-4 test suite execution, Tier 5 adversarial hardening | M1, M2, M3, M4 | PLANNED |

## Interface Contracts

### NotesView ↔ App (Navigation Contract)
- `onOpenSource(pathWithLine: string)`:
  - Input: `'src/index/worker.ts'` or `'src/index/worker.ts:42'`
  - Action: App extracts `{ path, line }` and renders `SourceView` with centered line highlighting.
- `onNavigateFile(path: string)`:
  - Passed to `SourceView` and `NotesView` to enable bidirectional navigation between notes and source files.

### NotesView ↔ Backend REST APIs
- `GET /api/notes?workspaceId=<id>` -> Returns `NoteSummary[]` with frontmatter metadata.
- `GET /api/notes/content?workspaceId=<id>&path=<path>` -> Returns raw Markdown text and ETag.
- `POST /api/notes/content` -> Body: `{ workspaceId, path, content, expectedEtag? }`. Returns `{ success: true, etag }` or `{ conflict: true }`.
- `GET /api/notes/search?workspaceId=<id>&q=<query>` -> Returns matching notes with snippets.
- `GET /api/agent/search?workspaceId=<id>&q=<query>` -> Returns matching code symbols and definitions.

### ExplorerView ↔ Tree Model
- Recursive directory node representation:
  ```ts
  interface TreeNode {
    name: string;
    path: string;
    isDir: boolean;
    children?: TreeNode[];
  }
  ```
- Filtering rule: A directory is preserved if its name matches OR any descendant matches `filter`.

### Build & Packaging Contracts
- NSIS compiler auto-detection order:
  1. `$env:PLUGBRAIN_MAKENSIS`
  2. `C:\Users\mil\AppData\Local\tauri\NSIS\makensis.exe`
  3. `C:\Users\mil\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\makensis.exe`
  4. System `PATH` (`makensis`)
- Installer artifacts in `release/`:
  - `PlugBrain-0.2.4-win-x64.exe`
  - `PlugBrain-0.2.4-win-x64.exe.sha256`
  - `PlugBrain-0.2.4-win-x64.exe.provenance.json`

## Code Layout
- `ui/src/views/NotesView.tsx`: Notes editor, autosave, backlinks pane, search, frontmatter
- `ui/src/views/ExplorerView.tsx`: File tree, recursive search filter, collapse controls
- `ui/src/views/SourceView.tsx`: Code viewer with line highlighting
- `ui/src/App.tsx`: View routing, source navigation handler, top navigation tabs
- `ui/src/styles/kit.css`: Theme tokens (--bg: #050706, --panel: #0B0F0D, status pills)
- `ui/src/styles/shell.css`: Layout containers, status badges, viewport sizing
- `scripts/build-standalone.mjs`: Bundles portable node runtime + CLI + UI into dist/
- `scripts/verify-standalone.mjs`: Playwright headless verification runner
- `scripts/package-nsis.mjs`: NSIS compilation script
- `desktop/PlugBrain.nsi`: NSIS script template
- `package.json`: Project root configuration (version 0.2.4)
