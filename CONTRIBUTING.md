# Contributing to PlugBrain

Thanks for considering a contribution. PlugBrain is a young project and the
bar for change is: **prove it works, keep it local, keep it honest.**

## Ground rules

- **Everything stays local.** No feature may add network calls, telemetry or
  accounts. The only listener is the local HTTP server.
- **No secrets, ever.** Never commit keys or token-shaped strings; test
  fixtures that look like credentials are generated at run time (see
  `scripts/secret-scan.mjs`).
- **Tests first for behavior changes.** `npm test` must stay green; new
  behavior needs a test that fails without your change.
- **One idea per pull request.** Keep diffs reviewable.

## Setup

Prerequisites: Node.js 24+.

```bash
git clone https://github.com/litbitrim/plugbrain
cd plugbrain
npm install
npm test
npm run serve    # then open http://localhost:4310
```

The UI lives in `ui/` (React + Vite): `npm run build:ui` rebuilds it.

## Commit style

Small, imperative subjects in English, e.g.
`fix(notes): keep editor focused when a note gains a second link`.

## Pull requests

1. Fork, create a branch from `main`.
2. Make your change with tests.
3. Run `npm test` and `npm run build:ui` (if the UI changed).
4. Open the PR with a short "what and why" — the code review cares about the
   *why* first.
