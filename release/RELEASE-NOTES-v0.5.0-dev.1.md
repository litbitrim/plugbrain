# PlugBrain 0.5.0-dev.1 — development candidate

**Status:** source candidate for review; not installed or published.

This branch starts at public `litbitrim/plugbrain` main `0ab6f50` and applies
the current local integration tree `c8f9861` as a reviewable source delta.
The public release workflow's Authenticode verification and the existing
0.3.1 release notes are retained.

## Included source work

- Planet and checkout selection now scope Code Intelligence requests in the
  HTTP and MCP surfaces. Ambiguous selections return an explicit result.
- Import impact resolves names through their target modules, follows
  unshadowed star re-exports, and deduplicates file results.
- The UI provides responsive navigation, clearer search failures, and a
  timeline of durable agent turns.
- The source tree contains coordination, fleet automation, model-family and
  quota-pool work for further qualification.

## Verification still required

- The 30-question M18 comparison with GitNexus over PlugHarness, PlugBoard,
  and PlugPT-Shell has a draft corpus only. Accuracy and p95 have not been
  measured on the same frozen revision.
- Cross-platform CI, independent review, installer signing, upgrade backup,
  live smoke test, and rollback proof are required before a local upgrade.
- Provider and model cards remain paused until the separate Gateway governor
  and Paperclip paths have passed integrated tests.

Do not tag or publish this development candidate as a stable 0.5 release.
