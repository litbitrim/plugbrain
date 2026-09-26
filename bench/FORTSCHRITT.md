# BENCH-03 Fortschritt

| Meilenstein | Status | Commit | Notiz |
|---|---|---|---|
| Q0 — 40 Holdout-Fragen eingefroren | ✅ | `7715c3f` | 4×10 Fragen, nie angepasst |
| Q1 — Java/Polyglot AST | ✅ | `ad61f14` | Java/Go-Extraktor mit Records, Interfaces, Enums, Imports, Calls; npm test 343/343 (296 pass, 0 fail, 47 skip) |
| Q2 — Symbol FTS5/Trigram | ✅ | `cecf32d` | FTS5 Trigram + B-Tree Fast-Path; warme Latenz 10.61 ms auf 50k Symbolen (< 50 ms Ziel); npm test 344/344 (297 pass, 0 fail, 47 skip) |
| Q3 — Hebel 3–6 | ✅ | pending | Impact-Fallback (raw_target & import-graph), Config/Env-Schlüssel (process.env & JSON-Keys), Markdown-Dateisuche, Entrypoint/Barrel-Boosting; npm test 347/347 (300 pass, 0 fail, 47 skip) |
| Q4 — Cowork schlank | ⏳ | — | — |
| Q5 — Neu messen kalt+warm | — | — | — |
| Q6 — README-Fazit + Closeout | — | — | — |
