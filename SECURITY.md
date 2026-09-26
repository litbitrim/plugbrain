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

Development-only dependencies in the `ui` package currently report four advisories in `npm audit --prefix ui` affecting local development mode only:
- **esbuild <=0.24.2 (GHSA-67mh-4wv8-2f99, moderate):** Development server request exposure.
- **vite <=6.4.1 (GHSA-4w7w-66w2-5vf9, moderate):** Path traversal in optimized deps `.map` handling.
- **vite <=6.4.2 (GHSA-v6wh-96g9-6wx3, moderate):** Windows UNC path handling in launch-editor.
- **vite <=6.4.2 (GHSA-fx2h-pf6j-xcff, high):** `server.fs.deny` bypass on Windows alternate paths.

None of these issues affect production builds or the shipped standalone distributions, which serve pre-compiled static assets and run without the Vite development server. An upgrade is planned for the next release cycle.
