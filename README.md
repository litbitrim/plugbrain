# PlugBrain V1

> **Autonome Wissens- und Koordinations-Engine für Code- und Wissens-Planeten**

PlugBrain V1 ist ein Standalone-Dienst für Software-Monorepos, Multi-Repo-Planeten und Wissensarchive (wie Obsidian-Vaults). Es indiziert Quellcode (TypeScript, JavaScript, Python, Go, Rust, Markdown), löst statische und dynamische Abhängigkeiten auf, verwaltet Vault-Notizen (Frontmatter, Wiki-Links, Volltext) und koordiniert Multi-Agenten-Schwärme in Echtzeit über Claims, Leases, Inboxes und Server-Sent Events (SSE).

---

## Inhaltsverzeichnis

1. [Features](#features)
2. [Schnellstart & Launcher](#schnellstart--launcher)
3. [Drei interaktive Benutzeroberflächen](#drei-interaktive-benutzeroberflächen)
4. [Getestete CLI-Befehle](#getestete-cli-befehle)
5. [HTTP REST API](#http-rest-api)
6. [Model Context Protocol (MCP)](#model-context-protocol-mcp)
7. [Agenten-Koordination & Schwarm-Integration](#agenten-koordination--schwarm-integration)
8. [Persistenz, Backup & Wiederherstellung](#persistenz-backup--wiederherstellung)
9. [Tests & Benchmarks](#tests--benchmarks)

---

## Features

- **Planet-Verwaltung:** Multi-Repository-Unterstützung (Repositories, Git-Worktrees und Checkouts) kombiniert mit Obsidian-Notes-Vaults unter einem einheitlichen Planeten-Namespace.
- **Tiefgehende Code-Analyse:** AST-Parser für TypeScript, JavaScript, Python, Go und Rust. Extraktion von Symbolen, Importen, Referenzen und Definitionen mit generationsbasierter Inkrementeller Reindizierung.
- **Notes & Vault-Engine:** Vollständige Unterstützung von Markdown-Notizen, Frontmatter-Attributen, hierarchischen Tags, Wiki-Links (`[[Ziel]]`) mit Ambiguitätsprüfung und Rückverweisen (Backlinks).
- **Bases Query Engine:** Abfrage von Notiz-Metadaten via SQL-ähnlicher Filterausdrücke (z. B. `typ=gate UND stand=offen`).
- **Swarm Mesh Coordination:**
  - Agenten-Registrierung mit Heartbeats und Liveness-Erkennung.
  - Exklusive Leases und Claim-Fencing (Pfad-basierte Locks zur Vermeidung von Schreibkollisionen).
  - Agent-to-Agent Inbox & Handoff-Messaging mit garantierter Zustellung und Quittierung.
  - Echtzeit-Event-Stream via Server-Sent Events (`/api/live/events`).
- **Web-Dashboard (Port 4310):**
  - **Atlas:** Wissens- & Code-Graph, Explorer, semantische Suche (Code + Bases-Property-Query) und Quellansicht mit Backlinks.
  - **City:** 3D-/2.5D-Code-Metropole (Distrikte = Repositories, Straßen = Ordner, Gebäude = Dateien, Höhe = Zeilenzahl, Farbe = Aktivität/Provenance).
  - **Agent Mesh:** Live-Schwarm-Dashboard mit aktiven Leases, Event-Ticker und Detail-Inspector (Task, Checkout, Claims, Dateiereignisse, Tools).
- **Robuste Persistenz:** SQLite-basierter Graph mit Write-Ahead Logging (WAL). Konsistente Online-Backups mittels `VACUUM INTO` ohne Risiko von korrupten Snapshot-Kopien.

---

## Schnellstart & Launcher

PlugBrain läuft unter Node.js (v22+) und erfordert keine externen Datenbankserver.

### 1. Abhängigkeiten installieren & UI bauen
```powershell
npm install
npm run build:ui
```

### 2. Server starten
Der Server startet standardmäßig auf Port `4310`:
```powershell
# Direkt per npm Script
npm run serve

# Oder über die mitgelieferten Launcher-Skripte (Windows)
.\bin\serve.cmd
.\bin\plugbrain.cmd serve 4310
.\bin\plugbrain.ps1 serve 4310
```

### 3. Datenverzeichnis konfigurieren
Standardmäßig speichert PlugBrain seine Datenbank unter `~/.plugbrain/plugbrain.db`.
Über die Umgebungsvariable `PLUGBRAIN_HOME` kann ein alternativer Pfad gewählt werden:
```powershell
$env:PLUGBRAIN_HOME = "C:\PLUG\plugpt\.plugbrain"
.\bin\plugbrain.cmd serve 4310
```

---

## Drei interaktive Benutzeroberflächen

Öffnen Sie im Browser: `http://localhost:4310`

### 1. Atlas
- **Galaxy & Planet Graph:** Visualisierung von Repositories, Checkouts und Modulen.
- **Explorer:** Dateibaum mit Metadaten (LOC, Sprache, Modifikationszeit, Symbolanzahl).
- **Dual-Mode Suche:**
  - *Code & Symbole:* Sucht über Klassen, Funktionen, Variablen und Dateien.
  - *Bases Notiz-Abfrage:* Sucht mit Struktur-Filtern wie `typ=gate UND stand=offen` oder `bereich=brain`.
- **Quellcodeansicht:** Zeilennummern, Syntax-Highlighting, Provenance (wer hat die Datei zuletzt bearbeitet) und **Backlinks** (Notizen und Dokumente, die auf diese Datei verlinken).

### 2. City
- **Metapher:**
  - Distrikte (Stadtteile) = Repositories
  - Straßen / Blöcke = Ordnerstrukturen
  - Gebäude = Dateien
  - Gebäudehöhe = Lines of Code (LOC)
  - Farbe = Letzte Agenten-Aktivität / Provenance
- **Interaktivität:** Klick auf ein Gebäude öffnet die Datei direkt in der echten Quellansicht.

### 3. Agent Mesh
- **Live-Schwarm:** Zeigt alle registrierten Agenten, ihren aktuellen Status (`active`, `idle`, `dead`) und Heartbeat-Timer.
- **Claim-Fencing:** Zeigt alle gesperrten Verzeichnisse und Dateien mit Lease-Dauer und Owner.
- **Live Event Stream:** SSE-Empfänger zeigt Ereignisse (`agent.registered`, `lease.acquired`, `lease.released`, `message.sent`) in Echtzeit.
- **Agent Inspector:** Klick auf einen Agenten öffnet ein Panel mit:
  - Aktuelle Aufgabe (Task) & Checkout-Pfad
  - Aktive Claims / Sperren
  - Dateiereignisse (erstellte/bearbeitete Dateien)
  - Toolereignisse (ausgeführte Befehle & Tools)
  - Inbox-Nachrichtenverlauf

---

## Getestete CLI-Befehle

Alle CLI-Befehle können direkt über `node --experimental-strip-types src/cli.ts <befehl>` oder über die Launcher in `bin/` ausgeführt werden.

### Planet & Workspace-Verwaltung
```powershell
# Registriert einen Planeten und erkennt Repositories und Obsidian-Roots
plugbrain planet register "C:\PLUG\plugpt" "plugpt"

# Scannt Revisionsvektoren und indiziert geänderte Dateien
plugbrain planet scan

# Zeigt Status: Repos, Checkouts, Revisions, Symbol- und Kantenanzahl
plugbrain planet status

# Zeigt Historie gelöschter/verschobener Dateien (Tombstones)
plugbrain planet history
```

### Indizierung & Graph
```powershell
# Vollständige Indizierung aller registrierten Workspaces
plugbrain index

# Statusübersicht der Indizes, Sprachen und Agenten
plugbrain status

# Symbol- und Volltextsuche über den Codebestand
plugbrain search "indexPlanetWorkspace"
```

### Notes & Vault
```powershell
# Abfrage von Notiz-Eigenschaften (Bases Query)
plugbrain notes query "typ=gate UND stand=offen"
plugbrain notes query "prioritaet=hoch"

# Volltextsuche über Obsidian-Notizen mit Text-Snippets
plugbrain notes search "PlugBrain"

# Notiz lesen mit aufgelösten Links, Backlinks und Properties
plugbrain notes read "Master/PLUGPT-MASTER-01.md"

# Notiz atomar mit Versionsprüfung schreiben
plugbrain notes write "Notizen/Test.md" --from "C:\temp\test.md"

# Rückverweise (Backlinks) einer Notiz anzeigen
plugbrain notes backlinks "Master/PLUGPT-MASTER-01.md"
```

### Kontext & Impact-Analyse
```powershell
# Erstellt ein semantisches Kontext-Briefing für eine Programmieraufgabe
plugbrain context "Implementiere atomic backup with vacuum into"

# Berechnet den Auswirkungs-Radius einer Dateiänderung
plugbrain impact "src/store/backup.ts"
```

### Backup & Restore
```powershell
# Erstellt ein atomares Online-Backup mittels SQLite VACUUM INTO
plugbrain backup "C:\backups\plugbrain-backup.db"

# Stellt eine Datenbank aus einem Backup wieder her (bereinigt alte WAL/SHM)
plugbrain restore "C:\backups\plugbrain-backup.db"
```

---

## HTTP REST API

PlugBrain stellt eine umfassende REST-Schnittstelle auf Port 4310 bereit:

### System & Health
- `GET /api/health` — Status und Uptime.
- `GET /api/planet` — Vollständige Planet-Topologie (Repos, Checkouts, Notizen, Metriken).
- `POST /api/reindex` — Triggert eine Reindizierung (`{"full": false}`).

### Suche & Code-Navigation
- `POST /api/agent/search` — Symbol- und Volltextsuche: `{"query": "searchNotes", "limit": 20}`.
- `GET /api/provenance?path=src/cli.ts` — Letzte Bearbeiter und Revisionshistorie.
- `GET /api/timeline` — Chronik der letzten Änderungen im Planeten.

### Notizen & Vault
- `GET /api/notes/query?filter=typ=gate UND stand=offen` — Bases-Property-Query.
- `GET /api/notes/search?q=Architektur` — Prose-Suche in Notizen.
- `GET /api/notes/read?path=Master/PLUGPT-MASTER-01.md` — Notizinhalt mit Frontmatter und Links.
- `GET /api/notes/backlinks?path=Master/PLUGPT-MASTER-01.md` — Eingehende Links auf eine Notiz.
- `POST /api/notes/write` — Schreibt eine Notiz mit Versionsprüfung.

### Schwarm & Koordination
- `POST /api/agent/register` — Registriert einen Agenten mit Task und Checkout.
- `POST /api/agent/heartbeat` — Sendet einen Lebenszeichen-Ping.
- `POST /api/agent/claim` — Fordert eine exklusive Pfadsperre (Lease) an.
- `POST /api/agent/release` — Gibt eine Pfadsperre frei.
- `GET /api/agent/presence` — Liste aller registrierten Agenten und ihres Status.
- `GET /api/agent/leases` — Liste aller aktuell aktiven Leases.
- `POST /api/agent/inspect` — Detaildaten eines Agenten (Task, Checkout, Claims, Events, Inbox).
- `POST /api/agent/inbox/send` — Sendet eine Nachricht an die Inbox eines anderen Agenten.
- `GET /api/agent/inbox?agentId=...` — Liest ungelesene Nachrichten einer Agenten-Inbox.
- `GET /api/live/events` — Server-Sent Events (SSE) Stream für Live-Aktualisierungen.

### Backup & Integrität
- `POST /api/backup` — Erstellt ein atomares Online-Backup: `{"targetPath": "C:\\backups\\snap.db"}`.
- `POST /api/backup/verify` — Prüft die SQLite-Integrität einer Backup-Datei: `{"backupPath": "C:\\backups\\snap.db"}`.

---

## Model Context Protocol (MCP)

PlugBrain bietet einen vollwertigen MCP-Server (`stdio`), der von KI-Assistenten (z. B. Claude, Gemini, Antigravity) direkt eingebunden werden kann:

```powershell
plugbrain mcp
```

### Verfügbare MCP-Tools:
1. `plugbrain_search` — Suche nach Code, Symbolen und Dateien.
2. `plugbrain_get_symbol` — Symboldefinition mit Kontext abrufen.
3. `plugbrain_get_file` — Quellcode einer Datei lesen.
4. `plugbrain_impact` — Abhängigkeits- und Re-Resolve-Radius einer Änderung ermitteln.
5. `plugbrain_briefing` — Automatisches Kontextpaket für einen Entwicklungsauftrag.
6. `plugbrain_query_notes` — Obsidian-Notizen nach Frontmatter-Attributen filtern.
7. `plugbrain_search_notes` — Notiz-Volltextsuche mit Snippets.
8. `plugbrain_read_note` — Notiz mit Wiki-Links und Backlinks lesen.
9. `plugbrain_write_note` — Notiz atomar mit Optimistic Locking schreiben.
10. `plugbrain_register_agent` — Agent im Schwarm registrieren.
11. `plugbrain_claim_scope` — Exklusive Datei- oder Ordnersperre anfordern.
12. `plugbrain_release_scope` — Sperre nach Abschluss der Arbeit freigeben.
13. `plugbrain_send_message` — Nachricht an einen Kollegen-Agenten übergeben.
14. `plugbrain_read_inbox` — Eigene Agenten-Inbox abrufen.

---

## Agenten-Koordination & Schwarm-Integration

PlugBrain wurde speziell entwickelt, um Flotten autonomer Agenten (wie den Key-Swarm unter `C:\PLUG\coordination\plugpt-0.1-20260905\fleet`) vor gegenseitigem Überschreiben zu schützen.

### Registrierung & Claim-Lebenszyklus:
1. **Registrieren:** Der Agent meldet sich beim Start an:
   ```json
   POST /api/agent/register
   { "agentId": "agent-01", "role": "developer", "task": "Refactor Backup", "checkout": "C:\\PLUG\\plugpt\\Code\\PlugBrain-Core--v1" }
   ```
2. **Claim anfordern (Fencing):** Bevor eine Datei verändert wird, fordert der Agent eine Lease an:
   ```json
   POST /api/agent/claim
   { "agentId": "agent-01", "scope": "src/store/backup.ts", "ttlSeconds": 120 }
   ```
   Wenn ein anderer Agent denselben Pfad gesperrt hat, wird der Claim mit Status `conflict` abgewiesen.
3. **Heartbeat:** Der Agent sendet alle 30 Sekunden einen Ping (`POST /api/agent/heartbeat`). Bleibt der Heartbeat länger als 60 Sekunden aus, gilt der Agent als `dead` und seine Sperren können übernommen werden.
4. **Freigabe:** Nach erfolgreichem Commit gibt der Agent die Lease frei (`POST /api/agent/release`).

---

## Persistenz, Backup & Wiederherstellung

SQLite im WAL-Modus erlaubt gleichzeitige Lese- und Schreibzugriffe. Ein einfaches Kopieren der `.db`-Datei im laufenden Betrieb führt jedoch häufig zu inkonsistenten oder unvollständigen Snapshots.

PlugBrain löst dies über den nativen SQLite-Befehl `VACUUM INTO`:
- **Atomarer Snapshot:** `VACUUM INTO` erzeugt eine eigenständige, defragmentierte `.db`-Datei, die alle bis zu diesem Moment committeten Transaktionen (auch jene im WAL) enthält.
- **Sicherer Restore:** Beim Einspielen eines Backups werden verwaiste `-wal` und `-shm`-Dateien automatisch gelöscht, um eine Replay-Verfälschung durch veraltete Log-Segmente auszuschließen.
- **Integritätsprüfung:** `PRAGMA integrity_check` stellt sicher, dass Backups vor der Archivierung vollständig und unbeschädigt sind.

---

## Tests & Benchmarks

Das Test-Suite umfasst Unit- und Integrationstests für alle Teilsysteme:
```powershell
# Alle Tests ausführen (347 Tests)
npm test
```

### Unabhängiger Vergleich: PlugBrain vs. GitNexus vs. CodeGraph (BENCH-03)

In einem unabhängigen Benchmark über **120 Fragen** (80 historische Fragen und 40 vorab eingefrorene Holdout-Fragen) auf vier fremden Codebasen (`mcpz`, `plugmedia`, `cowork`, `plugengine`) erzielt PlugBrain im warmen Daemon-Betrieb **90,0% Gesamtgenauigkeit (108/120 Treffer)** und im kalten CLI-Betrieb **87,5% (105/120)**, gegenüber **76,7% / 54,2% bei CodeGraph** und **57,5% / 41,7% bei GitNexus**. Auf den ungesehenen Holdout-Fragen generalisiert PlugBrain mit **97,5% Treffsicherheit (39/40)** ohne Overfitting.

Mit einer Gesamtdurchlaufzeit von **22,3 Sekunden** für alle vier Repositories indiziert PlugBrain **7,7-mal schneller als CodeGraph** (172,0 s) und **21-mal schneller als GitNexus** (482,5 s), während der Speicherplatzbedarf auf der Festplatte bei schlanken **108,4 MB** liegt (GitNexus: 3,4 GB; CodeGraph: 335,6 MB).

| Werkzeug & Modus | Historisch (80) | Holdout (40) | Gesamt (120) | Latenz p50 | Index-Zeit | Index-Größe |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **PlugBrain (Warm Daemon)** | **69 / 80 (86,3%)** | **39 / 40 (97,5%)** | **108 / 120 (90,0%)** | 23,3 ms | **22,3 s** | **108,4 MB** |
| **PlugBrain (Cold CLI)** | 66 / 80 (82,5%) | **39 / 40 (97,5%)** | **105 / 120 (87,5%)** | 268,3 ms | **22,3 s** | **108,4 MB** |
| CodeGraph (Cold CLI) | 57 / 80 (71,3%) | 35 / 40 (87,5%) | 92 / 120 (76,7%) | 281,8 ms | 172,0 s | 335,6 MB |
| GitNexus (Cold CLI) | 39 / 80 (48,8%) | 30 / 40 (75,0%) | 69 / 120 (57,5%) | 1.279,2 ms | 482,5 s | 3.400+ MB |
| CodeGraph (Warm SDK) | 36 / 80 (45,0%) | 29 / 40 (72,5%) | 65 / 120 (54,2%) | **0,7 ms** | 172,0 s | 335,6 MB |
| GitNexus (Warm Server) | 23 / 80 (28,8%) | 27 / 40 (67,5%) | 50 / 120 (41,7%) | 56,3 ms | 482,5 s | 3.400+ MB |

**Ehrliche Einordnung:** PlugBrain führt deutlich bei Indexierungsdurchsatz, Speicherökonomie, Volltext-Symbolauflösung und Blast-Radius-Analysen über unaufgelöste Aufrufketten. Bei tiefen, stark verschachtelten Klassen- und Typvererbungshierarchien behält CodeGraphs vollständige AST-Semantik noch selektive Vorteile bei polymorphen Überschreibungen.

