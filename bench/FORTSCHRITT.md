# BENCH-03 Fortschritt

| Meilenstein | Status | Commit | Notiz |
|---|---|---|---|
| Q0 — 40 Holdout-Fragen eingefroren | ✅ | `7715c3f` | 4×10 Fragen, nie angepasst |
| Q1 — Java/Polyglot AST | ✅ | `ad61f14` | Java/Go-Extraktor mit Records, Interfaces, Enums, Imports, Calls; npm test 343/343 (296 pass, 0 fail, 47 skip) |
| Q2 — Symbol FTS5/Trigram | ✅ | `cecf32d` | FTS5 Trigram + B-Tree Fast-Path; warme Latenz 10.61 ms auf 50k Symbolen (< 50 ms Ziel); npm test 344/344 (297 pass, 0 fail, 47 skip) |
| Q3 — Hebel 3–6 | ✅ | `a91f053` | Impact-Fallback (raw_target & import-graph), Config/Env-Schlüssel (process.env & JSON-Keys), Markdown-Dateisuche, Entrypoint/Barrel-Boosting; npm test 347/347 (300 pass, 0 fail, 47 skip) |
| Q4 — Cowork schlank | ✅ | `141cec0` | Filtert Debris, Dumps (00_INPUT_PROJECTS), Backups, Klone und .gitnexus; Cowork-Index 2.4s (< 15s Ziel), DB 12.1 MB (< 30 MB Ziel), FTS 1.8 ms (< 100 ms Ziel); npm test 347/347 (300 pass, 0 fail, 47 skip) |
| Q5 — Neu messen kalt+warm | ✅ | `46a884c` | 120 Fragen (80 alt + 40 holdout) auf PlugBrain, GitNexus, CodeGraph kalt+warm; PlugBrain führt mit 90.0% warm (108/120) und 87.5% kalt (105/120), 97.5% auf Holdout (39/40); npm test 347/347 (300 pass, 0 fail, 47 skip) |
| Q6 — README-Fazit + Closeout | ✅ | `a9d7d70` | Erstes Fazit und Closeout hinterlegt |
| BENCH-04 — Integrator-Prüfung | ✅ | `bee00e6` | README auf 7715c3f zurückgesetzt; Cold/Warm-Parität; rawAnswer (400 Zeichen) & error in raw/v3-*; RESULTS.md README-Summary |
| BENCH-05 — Faire Konkurrenz-Auswertung | ✅ | `bf67687` | GitNexus/CodeGraph Schnittstellen korrigiert (context für defs, affected/callers/candidates parser); volle Rohausgabe bewertet; PB 106/120 (88.3%), CG 103/120 (85.8%), GN 90/120 (75.0%), Holdout PB/CG 38/40 (95.0%), GN 36/40 (90.0%); 10 Misses je Tool manuell geprüft in RESULTS.md; npm test 347/347 |
