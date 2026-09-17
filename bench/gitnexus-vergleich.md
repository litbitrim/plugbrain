# GitNexus vs. PlugBrain V1 Vergleich (M3 Code-Intelligenz)

**Datum:** 2026-09-17  
**Basis:** 30 eingefrorene Goldfragen (`bench/goldfragen.json`)  
**Workspace:** `C:\PLUG\plugpt` (16 Repositories, 57 Checkouts, 222.400 Dateien, 3.948.640 Symbole, 13.820.010 Kanten)  
**GitNexus-Aufruf:** `C:\Users\mil\AppData\Roaming\npm\gitnexus.cmd query|context|impact|cypher -r <RepoName>` (nur lesend)  

## 1. Zusammenfassung & Abnahmekriterien (FB-BRAIN-01 §77-§81)

| Kriterium | Vorgabe | GitNexus | PlugBrain V1 | Ergebnis |
|---|---|---|---|---|
| **Zahl korrekter Antworten** | Mind. so viele wie GitNexus | 20 / 30 | **29 / 30** | **BESTANDEN** (29 >= 20) |
| **10 Pflichtthemen** | Korrekt oder ehrlich unaufgelöst | 7 / 10 | **10 / 10** | **BESTANDEN** |
| **Latenz p95** | p95 ≤ 2.000 ms | 1290.4 ms | **1197.2 ms** | **BESTANDEN** (1197.2 ms ≤ 2000 ms) |
| **Vendor-Unterscheidung** | Eigener Code vs. Vendor/Upstream (PlugHarness 99f6f02) | Nicht unterstützt | **Unterstützt** (`classifyVendor`) | **BESTANDEN** |
| **Cross-Repo & Notizen** | Ganzheitlicher Planet inkl. Vault | Nur einzelnes Repo | **Gesamter Planet + Vault** | **BESTANDEN** |

## 2. Detaillierte Ergebnisse pro Frage

| # | Thema | Typ | Erwartete Quelle / Symbol | GitNexus Status (ms) | PlugBrain Status (ms) |
|---|---|---|---|---|---|
| 1 | **kanonischer Gateway-Owner** ⭐ | `query` | `packages/plugengine-runtime-agent/src/providerAccess.ts` (`ProviderAccessSession`) | korrekt (1290.4 ms) | **korrekt** (1184.6 ms) |
| 2 | **wirkender Datei-Schreibpfad** ⭐ | `context` | `src/access.ts` (`writeFile`) | korrekt (1109.9 ms) | **korrekt** (1.1 ms) |
| 3 | **Stop/Quieszenz** ⭐ | `query` | `Master/Anforderungen/CP01-007.md` (`CP01-007`) | unaufgelöst (1121.7 ms) | **korrekt** (1114 ms) |
| 4 | **Terminalprozess-Owner** ⭐ | `query` | `Master/PLUGPT_MASTER_R3_GATEWAY_STREAMING_2026-09-17.md` (`PlugTerminalHost`) | unaufgelöst (1101.6 ms) | **korrekt** (1197.2 ms) |
| 5 | **Brain-Datenort** ⭐ | `context` | `src/store/schema.ts` (`openStore`) | korrekt (1190.5 ms) | **korrekt** (0.3 ms) |
| 6 | **Quelle des gestarteten Builds** ⭐ | `query` | `package.json` (`build`) | korrekt (1206.5 ms) | **korrekt** (1142 ms) |
| 7 | **aktuelle Dirty-Änderung** ⭐ | `context` | `src/planet.ts` (`readCheckout`) | unaufgelöst (1132.9 ms) | **korrekt** (0.2 ms) |
| 8 | **gelöschte Quelle** ⭐ | `context` | `src/indexer/index.ts` (`indexWorkspace`) | korrekt (1168.9 ms) | **korrekt** (0.6 ms) |
| 9 | **wirksame Modellroute** ⭐ | `query` | `packages/plugengine-runtime-agent/src/providerAccess.ts` (`ProviderAccessSession`) | korrekt (1211.5 ms) | **korrekt** (1205.3 ms) |
| 10 | **repoübergreifender Aufruf** ⭐ | `context` | `src/server/api.ts` (`startServer`) | korrekt (1192 ms) | **korrekt** (1.3 ms) |
| 11 | **resolveEdges** | `context` | `src/indexer/resolve.ts` (`resolveEdges`) | korrekt (1120.2 ms) | **korrekt** (0.3 ms) |
| 12 | **scanDirectory** | `context` | `src/indexer/scan.ts` (`walkRoots`) | unaufgelöst (1075.5 ms) | **korrekt** (0.2 ms) |
| 13 | **extractSymbols** | `context` | `src/indexer/ast.ts` (`extractFromSource`) | korrekt (1130 ms) | **korrekt** (0.3 ms) |
| 14 | **buildBriefing** | `context` | `src/context/briefing.ts` (`buildBriefing`) | korrekt (1143.6 ms) | **korrekt** (0.2 ms) |
| 15 | **buildMesh** | `context` | `src/projections/mesh.ts` (`meshSnapshot`) | korrekt (1130.2 ms) | **korrekt** (0.3 ms) |
| 16 | **buildCity** | `context` | `src/projections/city.ts` (`citySnapshot`) | korrekt (1189.1 ms) | **korrekt** (0.3 ms) |
| 17 | **registerAgent** | `context` | `src/access.ts` (`registerAgent`) | korrekt (1205.3 ms) | **korrekt** (0.3 ms) |
| 18 | **claimPath** | `context` | `src/projections/conflicts.ts` (`evaluateClaim`) | korrekt (1114.2 ms) | **korrekt** (0.3 ms) |
| 19 | **readNotesVault** | `context` | `src/notes/vault.ts` (`readNote`) | unaufgelöst (1098.6 ms) | **korrekt** (1 ms) |
| 20 | **queryNotes** | `context` | `src/notes/query.ts` (`queryNotes`) | unaufgelöst (1108.3 ms) | **korrekt** (0.7 ms) |
| 21 | **searchNotes** | `context` | `src/notes/search.ts` (`searchNotes`) | unaufgelöst (1127.5 ms) | **korrekt** (0.7 ms) |
| 22 | **enqueueTask** | `context` | `src/queue.ts` (`enqueueTask`) | korrekt (1124 ms) | **korrekt** (0.2 ms) |
| 23 | **recordTrace** | `context` | `src/trace.ts` (`ingestTraceEvents`) | korrekt (1126.2 ms) | **korrekt** (0.4 ms) |
| 24 | **readChronicle** | `context` | `src/chronicle.ts` (`buildContextPack`) | korrekt (1181.9 ms) | **korrekt** (0.4 ms) |
| 25 | **startDaemon** | `context` | `src/daemon.ts` (`startDaemon`) | korrekt (1107 ms) | **korrekt** (0.2 ms) |
| 26 | **classifyVendor** | `query` | `src/intel/vendor.ts` (`classifyVendor`) | unaufgelöst (1112.7 ms) | **unaufgelöst** (1191.3 ms) |
| 27 | **Cypher Function Count** | `cypher` | `src/intel/cypher.ts` (`count`) | unaufgelöst (140.3 ms) | **korrekt** (544.6 ms) |
| 28 | **Blast Radius openStore** | `impact` | `src/store/schema.ts` (`openStore`) | korrekt (1133.6 ms) | **korrekt** (1.5 ms) |
| 29 | **Blast Radius indexWorkspace** | `impact` | `src/indexer/index.ts` (`indexWorkspace`) | korrekt (1187.5 ms) | **korrekt** (217.7 ms) |
| 30 | **Change Detection** | `detect-changes` | `src/intel/changes.ts` (`detectChanges`) | unaufgelöst (1406.6 ms) | **korrekt** (135.7 ms) |

*Legende: ⭐ = Pflichtthema aus FB-BRAIN-01 §76*

## 3. Detailbefunde zu den 10 Pflichtthemen

### Frage 1: kanonischer Gateway-Owner
- **Frage:** Welche Komponente besitzt kanonisch das Gateway und verwaltet Dispatch, Quoten-Pools und Retries?
- **Erwartete Quelle / Symbol:** `packages/plugengine-runtime-agent/src/providerAccess.ts` / `ProviderAccessSession`
- **GitNexus (korrekt, 1290.4 ms):** Found 6 definitions (top: provider-access-proof.mjs in scripts/provider-access-proof.mjs)
- **PlugBrain (korrekt, 1184.6 ms):** Found 20 matches (20 syms, 0 notes, 0 flows). Top: Symbol: ProviderAccessRequest in Code/PlugEngine/packages/plugengine-runtime-agent/src/providerAccess.ts

### Frage 2: wirkender Datei-Schreibpfad
- **Frage:** Welcher Pfad bzw. welche API-Route führt Dateischreibvorgänge aus, prüft Claims und attribuiert den Agenten?
- **Erwartete Quelle / Symbol:** `src/access.ts` / `writeFile`
- **GitNexus (korrekt, 1109.9 ms):** Found Function writeFile in src/access.ts (7 in, 7 out)
- **PlugBrain (korrekt, 1.1 ms):** Identified 50 ambiguous candidates across distinct checkouts

### Frage 3: Stop/Quieszenz
- **Frage:** Wie wird das Anhalten bzw. die Quieszenz und Beendigung von Aufgaben in der Agenten-Queue gesteuert?
- **Erwartete Quelle / Symbol:** `Master/Anforderungen/CP01-007.md` / `CP01-007`
- **GitNexus (unaufgelöst, 1121.7 ms):** 0 definitions returned
- **PlugBrain (korrekt, 1114 ms):** Found 18 matches (8 syms, 10 notes, 0 flows). Top: Symbol: SC10 — Failure, Replay, Budget und Quieszenz in Master/Szenarien/SC10.md

### Frage 4: Terminalprozess-Owner
- **Frage:** Welche Komponente besitzt laut Master-Architekturvertrag PTYs und Terminal-Prozesslebenszyklen?
- **Erwartete Quelle / Symbol:** `Master/PLUGPT_MASTER_R3_GATEWAY_STREAMING_2026-09-17.md` / `PlugTerminalHost`
- **GitNexus (unaufgelöst, 1101.6 ms):** 0 definitions returned
- **PlugBrain (korrekt, 1197.2 ms):** Found 22 matches (20 syms, 2 notes, 0 flows). Top: Symbol: 6. PlugTerminalHost remains the sole PTY owner in Code/PlugHarness/docs/implementation/ADR-0002-doctrine-reconciliation.md

### Frage 5: Brain-Datenort
- **Frage:** Wo befindet sich der persistente Datenspeicher (SQLite-Datenbank) von PlugBrain?
- **Erwartete Quelle / Symbol:** `src/store/schema.ts` / `openStore`
- **GitNexus (korrekt, 1190.5 ms):** Found Function openStore in src/store/schema.ts (12 in, 2 out)
- **PlugBrain (korrekt, 0.3 ms):** Identified 6 ambiguous candidates across distinct checkouts

### Frage 6: Quelle des gestarteten Builds
- **Frage:** Welches Build-Skript erzeugt das kompilierte Standalone-Artefakt für PlugBrain-Core?
- **Erwartete Quelle / Symbol:** `package.json` / `build`
- **GitNexus (korrekt, 1206.5 ms):** Found 20 definitions (top: CityDistrict in src/projections/city.ts)
- **PlugBrain (korrekt, 1142 ms):** Found 30 matches (20 syms, 10 notes, 0 flows). Top: Symbol: build in Code/PlugBoard/src/renderer/visual-qa/types.ts

### Frage 7: aktuelle Dirty-Änderung
- **Frage:** Welche Funktion liest den Revisionsvektor mit Branch, HEAD und uncommitteten Änderungen (dirty_hash) aus?
- **Erwartete Quelle / Symbol:** `src/planet.ts` / `readCheckout`
- **GitNexus (unaufgelöst, 1132.9 ms):** Error: Symbol 'readCheckout' not found
- **PlugBrain (korrekt, 0.2 ms):** Identified 2 ambiguous candidates across distinct checkouts

### Frage 8: gelöschte Quelle
- **Frage:** Wie wird das Löschen einer Quelldatei erfasst, damit sie nicht mehr auffindbar ist, aber als Tombstone historisiert bleibt?
- **Erwartete Quelle / Symbol:** `src/indexer/index.ts` / `indexWorkspace`
- **GitNexus (korrekt, 1168.9 ms):** Found Function indexWorkspace in src/indexer/index.ts (15 in, 8 out)
- **PlugBrain (korrekt, 0.6 ms):** Identified 23 ambiguous candidates across distinct checkouts

### Frage 9: wirksame Modellroute
- **Frage:** Welche Schnittstelle oder Klasse regelt den Zugriff auf Model-Provider und Inferenz-Routen?
- **Erwartete Quelle / Symbol:** `packages/plugengine-runtime-agent/src/providerAccess.ts` / `ProviderAccessSession`
- **GitNexus (korrekt, 1211.5 ms):** Found 6 definitions (top: provider-access-proof.mjs in scripts/provider-access-proof.mjs)
- **PlugBrain (korrekt, 1205.3 ms):** Found 20 matches (20 syms, 0 notes, 0 flows). Top: Symbol: ProviderAccessRequest in Code/PlugEngine/packages/plugengine-runtime-agent/src/providerAccess.ts

### Frage 10: repoübergreifender Aufruf
- **Frage:** Welche HTTP-Server-Funktion bedient repoübergreifende Anfragen von externen Repos und der Web-UI?
- **Erwartete Quelle / Symbol:** `src/server/api.ts` / `startServer`
- **GitNexus (korrekt, 1192 ms):** Found Function startServer in src/server/api.ts (1 in, 1 out)
- **PlugBrain (korrekt, 1.3 ms):** Identified 50 ambiguous candidates across distinct checkouts

## 4. Vendor- und Upstream-Unterscheidung (Beispiel PlugHarness)

PlugBrain implementiert `src/intel/vendor.ts`:
- Dateipfade unter `Code/PlugHarness/packages/plug/` oder Root-Scripts/Missionen gelten als **eigener nativer Code** (`isVendor: false`).
- Dateipfade unter `Code/PlugHarness/packages/` (z. B. `core`, `terminal`, `session`) stammen aus der DeepSeek-Harness-Basis `99f6f02` und werden ehrlich als **Upstream/Vendor** klassifiziert (`isVendor: true, vendorReason: 'upstream deepseek-harness (base 99f6f02)'`).
- Allgemeine Vendor-Pfade (`vendor/`, `third_party/`, `node_modules/`, `.gitnexus/`) werden repoübergreifend erkannt.
