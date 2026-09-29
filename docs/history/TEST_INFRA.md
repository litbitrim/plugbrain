# E2E Test Infra: PlugBrain Standalone Windows Desktop Application

## Test Philosophy
- Opaque-box, requirement-driven. Derived from ORIGINAL_REQUEST.md and user acceptance criteria, independent of internal module implementation.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Interaction Testing + Real-World Workload Testing.

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|----------------------|:------:|:------:|:------:|
| F1 | Notes Markdown Editing & Persistence | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| F2 | Debounced Autosave & Conflict/Undo | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| F3 | Wiki-Links ([[Note]]) & Live Backlinks | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| F4 | Structured Frontmatter & Real Code Binding | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| F5 | Instant Text & Symbol Search | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| F6 | Explorer Sidebar Tree & Filtering | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| F7 | Seamless "Quelle öffnen" Line Highlighting | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| F8 | Dark Command-Center Tokens & Mono Status Pills | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| F9 | Viewport Defect Elimination (8 Core Views) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| F10 | Standalone Portable Runtime (node.exe+CLI+UI) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| F11 | Automated Standalone Smoke Verification | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| F12 | NSIS Installer Packaging (0.2.4-win-x64.exe) | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| F13 | Provenance & SHA-256 Manifest Generation | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| F14 | Silent & Interactive Install & Desktop Launch | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |

## Test Architecture
- **E2E Test Runner**: Standalone runner script `scripts/verify-standalone.mjs` executing Playwright headless browser against production runtime in `dist/`.
- **Unit & Integration Suite**: Node test runner via `npm test` (`node --experimental-strip-types --test test/*.test.ts`).
- **Compilation Checks**: `npm --prefix ui run typecheck` and `npm --prefix ui run build`.
- **Installer Checks**: `node scripts/package-nsis.mjs` verifying exit code 0, file existence of executable, SHA-256 integrity, and provenance JSON.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| S1 | Knowledge Vault Initialization & Linked Decisions | F1, F3, F4, F7, F8 | High |
| S2 | Code Navigation from Architectural Contradictions | F3, F4, F6, F7 | High |
| S3 | Real-Time Multi-Agent Tracking in Mesh & Graph Views | F8, F9, F10 | Medium |
| S4 | Full Standalone Build, Pack, & Smoke Verification Cycle | F10, F11, F12, F13 | High |
| S5 | Clean Machine Installer Deployment & Interactive Startup | F12, F13, F14 | High |

## Coverage Thresholds
- Tier 1: ≥5 test cases per feature (70 total)
- Tier 2: ≥5 boundary/edge test cases per feature (70 total)
- Tier 3: Pairwise cross-feature interaction coverage
- Tier 4: ≥5 end-to-end realistic application workflows
