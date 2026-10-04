# Documentation

Choose the page matching the work you want to do. PlugBrain can be used as a local knowledge browser before connecting any coding agent.

| Goal | Start here |
| --- | --- |
| Install prerequisites, index one project, open the UI | [Quickstart](quickstart.md) |
| Understand available source, previews and downloads | [Channels and downloads](channels.md) |
| Connect Claude Code, Codex, Cursor or another MCP client | [Client guides](agents/README.md) |
| Coordinate workers without overlapping edits | [Agent protocol](agent-protocol.md), [CLI](cli.md#swarm) |
| Call the local service or inspect MCP tools | [HTTP API](http-api.md), [MCP tools](mcp-tools.md) |
| Contribute code and tests | [Contributor guide](../CONTRIBUTING.md), [security](../SECURITY.md) |
| Read the German entry | [Deutsch](../README.de.md) |

## Troubleshooting

Node below 24 is unsupported by the current source. If `plugbrain` is not on PATH, use the explicit Node command from the quickstart; cloning a repository does not install an executable globally. An occupied loopback port belongs to another service until its identity is verified: choose another port for a trial instead of killing it. A source ZIP is not an installer. Keep `PLUGBRAIN_HOME` separate from a checkout and back it up before a version change.

The [channel table](channels.md) identifies unverified builds and remaining platform checks. An unavailable agent, missing credentials, historical benchmark or local candidate screenshot does not establish a working installed product.
