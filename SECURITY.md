# Security Policy

## Reporting a vulnerability

Please do **not** open a public issue for security problems.

Report privately via GitHub's *Report a vulnerability* on the
[Security tab](https://github.com/litbitrim/plugbrain/security/advisories) of
this repository. You will get a response within a few days.

## Scope

PlugBrain is a **local** application: it stores data in a SQLite database and
serves a UI and HTTP API on `127.0.0.1` only. Of particular interest:

- Anything that lets a remote party reach the HTTP API (it must bind and stay
  local, and require the bearer token from `<PLUGBRAIN_HOME>/auth.token`).
- Path escapes: writes or reads outside the registered workspace roots
  (the claim/lease fencing must not be bypassable).
- Secret handling: the codebase must never store, log or transmit real
  credentials; `scripts/secret-scan.mjs` guards this — keep it green.
- Supply chain: dependencies are intentionally minimal (TypeScript, esbuild,
  playwright-core); adding runtime dependencies deserves scrutiny.

## Supported versions

Only the latest release gets security fixes.

## Known advisories

Development-only dependencies in the `ui` package currently report two advisories in `npm audit`:
- **esbuild (moderate):** Request exposure on the local development server (affects development mode only).
- **vite (high):** Transitive dependency on the affected esbuild version with dev-server path traversal concerns in development mode.

Neither issue affects production builds or the shipped standalone distributions, which serve pre-compiled static assets and run without the Vite development server. An upgrade is planned for the next release cycle.
