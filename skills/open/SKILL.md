---
name: open
description: Open the PlugBrain UI (Atlas graph, City map, Agent Mesh, notes) in the browser. Use when the user wants to see the code graph, the city view or the live agent board.
---

# Open the PlugBrain UI

The user wants to look at the brain in the browser.

1. Determine the UI URL. The default is `http://127.0.0.1:4310/`.
   To confirm the actual port, run `plugbrain status` or check the output of
   `plugbrain serve` (it prints `PlugBrain serving on http://127.0.0.1:<port>`).
   If nothing is listening, start the brain with `plugbrain serve` in the
   background first.
2. Open the URL in the browser (`start <url>` on Windows, `open <url>` on
   macOS, `xdg-open <url>` on Linux).
3. Say what the user will see: the Atlas graph of repositories and modules,
   the City map, the Agent Mesh with live claims and heartbeats, and the
   notes. The UI may ask for a bearer token — it is stored in
   `<PLUGBRAIN_HOME>/auth.token` and is normally filled in automatically.

Keep this skill short: it opens the UI, it does not explain the data model.
