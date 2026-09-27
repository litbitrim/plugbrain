# PlugBrain 0.3.1 Release Notes (candidate)

**Release status:** Candidate; not published  
**Version:** 0.3.1

PlugBrain 0.3.1 is intended as the first published build. The earlier 0.3.0 tag was not released after cross-platform verification failed.

## Fixed

- **Awareness performance under load:** awareness generation reuses one live-claim snapshot for conflict evaluation and related-task projection instead of scanning claims repeatedly. Claim decisions and the 500 ms timing budget are unchanged.
- **Timing-budget verification:** CI runs the awareness, Board-read and no-hang budget tests serially in a dedicated step on Linux, macOS and Windows. The ordinary parallel suite visibly skips these tests.
- **Linked-path vault access:** canonical path handling allows a vault opened through a junction or symlink to read its own notes while still refusing traversal outside the vault.
- **Agent attach during indexing:** the local UI waits and retries when the daemon temporarily refuses store writes during an index run.
- **Test portability and cleanup:** tests no longer depend on private Git history or PowerShell on non-Windows systems, and UI tests close resources when Chromium is unavailable.

## Changed

- The release workflow supports dry runs on branches. Publishing remains tied to version tags.
- README and CLI documentation describe the standalone Brain and its actual swarm command signatures.
- The agent protocol is documented in `docs/agent-protocol.md`.

## Known issues

- On macOS, placing `PLUGBRAIN_HOME` inside a watched vault can trigger a redundant re-index. The default Brain home is outside a vault and is unaffected; the related test remains skipped on macOS.

## Release assets

No installers, archives, tag, or published release exist yet. Add verified platform assets and SHA-256 values after the final tagged release workflow succeeds.
