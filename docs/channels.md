# Channels and downloads

Checked on **4 October 2026** against the public repository, release metadata and candidate PRs. This reference does not promote a local build or authorize installation.

| Version / location | Status | Distribution |
| --- | --- | --- |
| main, package 0.5.0-dev.1 | Public development source | Git checkout; Node.js 24+, npm and Git |
| tag 0.3.1 | Published GitHub release | Source archives only; release assets list is empty |
| 0.6.0-rc.1, [PR 6](https://github.com/litbitrim/plugbrain/pull/6) | Open candidate, not merged | Review source; no asserted public installer |
| 0.7.0-rc.2 | Local candidate with Windows QA evidence | Not shipped by this documentation branch; unsigned and not a public release |

## Start from source

Follow the [quickstart](quickstart.md). The CLI uses native TypeScript support under Node.js 24+. Runtime `npm ci` installs the pinned dependencies. The repository includes its web UI output; UI development additionally uses the nested UI dependencies and `npm run build:ui`. The source path requires no PlugPT app, model credentials or hosted account.

## Platform evidence

| Platform | Source prerequisites | Current evidence / limit |
| --- | --- | --- |
| Windows x64 | Node.js 24+, npm, Git | Source quickstart and local candidate UI checked; no public signed installer |
| macOS | Node.js 24+, npm, Git | CI owns platform validation; not exercised in this local Windows run |
| Linux | Node.js 24+, npm, Git | CI owns platform validation; not exercised in this local Windows run |

GitHub's generated source archives contain repository files, not a packaged executable with its own Node runtime. Only a named release asset with a verified digest and applicable signature is a binary distribution. A build script, candidate commit, green subset of tests or screenshot does not establish release acceptance.

## Product images

The images use a real local 0.7.0-rc.2 candidate and an isolated three-file example project. They show existing knowledge and agent coordination screens. The agent is only registered, and its review task is queued; no external worker execution is claimed. [Capture metadata](images/showcase.json) records the version and source revision without publishing a data-home path or token.
