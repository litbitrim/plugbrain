# Dauermodus — PlugBrain 0.6

Der Dauermodus ermöglicht es PlugBrain, Aufgaben ohne manuellen Eingriff und ohne dauerhaft offene Chat-Sitzungen kontinuierlich abzuarbeiten. Die Verarbeitungskette lautet:

**Scout → Coder → Reviewer → begrenztes Rework → Integration / wartender Integrationskandidat → nächste Aufgabe**

---

## 1. Supervisor

Der Supervisor ist ein persistenter, kopfloser Refill-Loop für einen registrierten Worker. Er besitzt genau einen Task-Versuch zur Zeit und steuert dessen Lebenszyklus.

### Verantwortlichkeiten

| Aufgabe | Beschreibung |
|---------|--------------|
| **Task-Claiming** | Holt den nächsten `pending`-Task über compare-and-set aus der Queue |
| **Runner-Start** | Startet den konfigurierten Runner mit einem pro Versuch eindeutigen Token |
| **Prozess-Überwachung** | Wartet, bis der Worker-Prozess beendet ist, bevor ein neuer Versuch gestartet wird |
| **Versuchs-Zählung** | Zählt Versuche pro Task persistent (über Neustarts hinweg) |
| **Fehler-Klassifikation** | Unterscheidet `clean`, `quota`, `auth`, `crash` anhand der CLI-Ausgabe |
| **Quota-Backoff** | Respektiert `Retry-After`-Header und wendet exponentielles Backoff an |
| **Idle-Verhalten** | Bleibt im Leerlauf bei leerer Queue (konfigurierbar), statt nach fester Poll-Anzahl zu stoppen |

### Konfiguration (CLI)

```bash
plugbrain swarm run <agent-id> \
  --supervisor-child \
  --workspace <workspace-id> \
  --idle-ms 300000 \
  --max-idle-checks 24 \
  --max-attempts 2 \
  --poll-ms 1000
```

| Parameter | Standard | Bedeutung |
|-----------|----------|-----------|
| `--idle-ms` | 300000 | Wartezeit bei leerer Queue (ms) |
| `--max-idle-checks` | 24 | Anzahl Leerlaufzyklen vor Stopp (0 = unendlich) |
| `--max-attempts` | 2 | Maximale Versuche pro Task (1–5) |
| `--poll-ms` | 1000 | Poll-Intervall für Prozess-Status (ms) |

### Datenmodell

- `worker_supervisors` — ein aktiver Supervisor pro Agent
- `worker_task_attempts` — Historie aller Versuche pro Task (Token, Run-ID, Outcome)

### Fencing

Jeder `swarm`-Befehl eines Workers wird gegen den aktuellen Attempt-Token geprüft. Veraltete Versuche dürfen keinen Brain-State mehr ändern (`assertActiveSupervisorAttempt`).

---

## 2. Runner-Vertrag

**Modell = Fachaufgabe, Runner = Protokoll**

Der Runner ist die Ausführungsumgebung für einen Worker. Er kennt die Fachaufgabe nicht; er stellt nur das Protokoll bereit: Claim → Arbeit → Lieferung → Turn-Ende.

### Runner-Profil

Jeder Agent benötigt ein Runner-Profil (gesetzt via `plugbrain swarm runner set`):

```bash
plugbrain swarm runner set <agent-id> --profile <name> \
  --cmd "plugbrain swarm worker" \
  --args "--workspace=<id> --task=<id>"
```

| Feld | Zweck |
|------|-------|
| `account` | Identität für Quotenpool und Auth |
| `quota_pool` | Logischer Pool für Rate-Limits (optional, fällt auf `account` zurück) |
| `command` / `args` | Startbefehl für den Worker-Prozess |

### Protokoll-Ablauf

1. Supervisor reserviert Quota im Pool
2. Supervisor startet Runner mit `PLUGBRAIN_ATTEMPT_TOKEN` und `PLUGBRAIN_SUPERVISED_AGENT`
3. Worker führt Fachaufgabe aus, schreibt Ergebnis in `queue_tasks.delivered_path`
4. Worker beendet Turn mit `plugbrain swarm turn <id> end --deliver ...`
5. Supervisor erkennt `delivered`-State, markiert Attempt als `delivered`
6. Bei Fehlschlag: Klassifikation, Quota-Settlement, Entscheidung über Retry / Stopp

---

## 3. Quotenpools

Quotenpools begrenzen die gleichzeitige Nutzung externer APIs (z. B. Modell-Gateways) pro logischem Konto.

### Eigenschaften

| Eigenschaft | Beschreibung |
|-------------|--------------|
| `maxConcurrent` | Maximale parallele Reservierungen (Default: 1) |
| `cooldown` | Wartezeit nach Rate-Limit (ms, Default: 30 min, Max: 30 min) |
| `retryAt` | Geplanter Wiederholungszeitpunkt nach `429` / `Retry-After` |

### CLI

```bash
# Pool anlegen / konfigurieren
plugbrain swarm quota-pool set <pool-id> --max-concurrent 1

# Pool-Status anzeigen
plugbrain swarm quota-pool show
```

### Verhalten im Supervisor

- Vor jedem Versuch: `reserveQuota` — blockiert bis Slot frei oder Cooldown abgelaufen
- Nach Versuch: `settleQuota` mit Outcome (`clean`, `quota`, `auth`, `crash`, `launch-error`)
- Bei `quota`: `noteQuotaRateLimit` setzt `retryAt` basierend auf `Retry-After` oder Default

---

## 4. Kette: Scout → Coder → Reviewer

Die Standard-Kette für Coding-Aufgaben besteht aus drei spezialisierten Rollen.

### Rollen

| Rolle | Aufgabe | Typische Karten |
|-------|---------|-----------------|
| **Scout** | Codebasis analysieren, Änderungen planen, Karte schreiben | `SCOUT-*` |
| **Coder** | Implementierung laut Karte, Tests ergänzen | `CODER-*` |
| **Reviewer** | Fachliche Prüfung, PASS/FAIL, Fix-Anforderung | `REVIEWER-*` |

### Einreihung (Lead-Takt)

```bash
# Kette anlegen (nach Task-ID des vorherigen Schritts)
plugbrain swarm enqueue "Reviewer: <Titel>" \ 
  --body "<Karteninhalt>" \
  --to <reviewer-agent> \
  --after <coder-task-id>
```

### Abhängigkeiten

- Reviewer-Task startet erst nach `delivered` des Coder-Tasks
- Coder-Task startet erst nach `delivered` des Scout-Tasks
- Bei FAIL: Reviewer fordert Fix an → neuer Coder-Versuch → erneuter Review

---

## 5. FIX1 — Automatischer Fix-Zyklus

Ein `FAIL` im Review löst genau **einen** automatischen Fix-Versuch aus.

### Ablauf

1. Reviewer liefert `FAIL` mit Begründung
2. Supervisor erstellt Follow-up-Task für denselben Coder (oder qualifizierten Ersatz)
3. Karte enthält: Original-Karte, Reviewer-Begründung, Diff des fehlgeschlagenen Commits
4. Coder liefert Fix → Reviewer prüft erneut (unabhängig)
5. Bei zweitem FAIL → Quarantäne-Notiz an Owner, Lane frei für andere Arbeit

### Regeln

- Maximal **ein** Fix-Versuch pro Review (konfigurierbar über `maxAttempts` des Supervisors)
- Artefakt-Bindung: Fix-Commit muss zu Task, Attempt, Worktree und Basis-Commit passen
- Ein Rest aus früherem Versuch schließt neuen Versuch nicht ab

---

## 6. Owner-Stopp

Der Owner-Stopp ist ein dauerhaftes Halt-Signal, das Neustarts und Watchdogs überlebt.

### Aktivierung

```bash
plugbrain swarm stop <agent-id> --owner-stop
```

### Eigenschaften

- Setzt `worker_supervisors.active = 0` persistent
- Watchdog hebt den Stopp **nicht** auf
- Nur Owner (oder Lead mit Freigabe) kann per `plugbrain swarm run` neu starten
- Bestehende Attempts laufen zu Ende, neue Tasks werden nicht geclaimt

---

## 7. Bericht (modellfrei)

Berichte werden ohne Modell-Unterstützung erzeugt und versendet.

### CLI

```bash
# Nachtbericht / Statusbericht erzeugen
plugbrain report night --workspace <id> --output <pfad>

# Lead-Digest für Takt
node Code/tools/wave-plan/lead-digest.mjs --workspace <id>
```

### Bericht-Inhalt

| Abschnitt | Quelle |
|-----------|--------|
| Letzte gültige Lieferung + nächste ausführbare Task | `queue_tasks` + `worker_task_attempts` |
| Grund für jede wartende Lane | `worker_supervisors.last_failure`, Quota-Status |
| Offene Reviews + Integrationsrückstand | Tasks mit `state = 'delivered'` ohne Merge |
| Automatische Wiederanläufe | `worker_task_attempts` mit `attempt > 1` |
| Zeit seit letztem manuellen Eingriff | `worker_supervisors.updated_at` vs. jetzt |

---

## 8. Schreibgrenzen (Isolation)

Arbeitsverzeichnis, Werkzeugrechte und erlaubte Schreibpfade sind technisch an die Rolle gebunden (opencode `permission`: `edit`, `bash`, `external_directory` je Rolle).

- **Negativtest**: In Testumgebung müssen verbotene Schreibversuche scheitern
- **Bestand**: Betroffene Änderungen werden inventarisiert, nicht automatisch gelöscht
- **Kein unbeaufsichtigter Schreibzugriff** ohne bestandenen Isolationstest

---

## 9. Flotte & Kapazität

- **Qualifikation**: Jede Lane (Modell + Tool-Profil) durchläuft Inferenz → Tool → Fachaufgabe → gültige Lieferung → Review-Fähigkeit
- **Getrennte Nachweise**: Tool-Call-Erfolg ≠ Datei-Erstellung ≠ gültige Lieferung ≠ Review-Qualifikation
- **Context Packs**: Große Prompts werden auf Rollenprofile, kleine Tool-Schemata und begrenzte Context Packs aufgeteilt
- **Budgetierung**: Kontext, RPM, TPM, Tageslimit getrennt pro Pool
- **Sichtbarkeit**: Wirksame Pool-Policy und andere Nutzer desselben Pools sind einsehbar

---

## 10. Nachfüttern (Scheduler)

Nach der letzten vorbereiteten Karte wählt der Scheduler weitere zulässige Master-Aufgaben.

- **Ziele ohne Karten**: Begrenztes Planner-/Scout-Task → deterministische Prüfung (Pflichtfelder, Duplikate, Scope, Budget, Reviewer)
- **Abgrenzung**: Keine zweite Queue, nichts außerhalb des Mandats
- **Leere Queue**: Dienst bleibt im Leerlauf, läuft bei neuer Arbeit automatisch an

---

## 11. CLI-Referenz (Auszug)

Alle unten genannten Befehle existieren im Quellcode unter `src/`.

| Befehl | Datei:Zeile |
|--------|-------------|
| `plugbrain swarm run` | `src/swarm-cli.ts:1050` |
| `plugbrain swarm runner set` | `src/swarm-cli.ts:770` |
| `plugbrain swarm runner show` | `src/swarm-cli.ts:777` |
| `plugbrain swarm quota-pool set` | `src/swarm-cli.ts:1028` |
| `plugbrain swarm quota-pool show` | `src/swarm-cli.ts:1018` |
| `plugbrain swarm enqueue` | `src/swarm-cli.ts:840` |
| `plugbrain swarm deliver` | `src/swarm-cli.ts:900` |
| `plugbrain swarm board` | `src/swarm-cli.ts:670` |
| `plugbrain swarm turn` | `src/swarm-cli.ts:580` |

---

## 12. Beispiel: Supervisor starten

```bash
# Runner-Profil setzen (einmalig)
plugbrain swarm runner set fb-g01 \
  --cmd "plugbrain" --args "swarm worker --workspace=ws-1"

# Quotenpool konfigurieren
plugbrain swarm quota-pool set fb-g01 --max-concurrent 1

# Supervisor starten (detached, läuft im Hintergrund)
plugbrain swarm run fb-g01 --workspace ws-1 \
  --idle-ms 300000 --max-idle-checks 0 --max-attempts 2
```

---

## 13. Beispiel: Scout → Coder → Reviewer einreihen

```bash
# 1. Scout-Task
TASK_SCOUT=$(plugbrain swarm enqueue "Scout: Feature X analysieren" \
  --body "Analysiere src/feature-x/ und schreibe Plan." \
  --to scout-agent \
  --workspace ws-1 --output json | jq -r .id)

# 2. Coder-Task (nach Scout)
TASK_CODER=$(plugbrain swarm enqueue "Coder: Feature X implementieren" \
  --body "Setze Plan aus Task $TASK_SCOUT um. Tests ergänzen." \
  --to coder-agent \
  --after $TASK_SCOUT --workspace ws-1 --output json | jq -r .id)

# 3. Reviewer-Task (nach Coder)
plugbrain swarm enqueue "Reviewer: Feature X prüfen" \
  --body "Prüfe Implementation gegen Plan aus $TASK_SCOUT. PASS/FAIL." \
  --to reviewer-agent \
  --after $TASK_CODER --workspace ws-1
```

---

## 14. Glossar

| Begriff | Bedeutung |
|---------|-----------|
| **Attempt** | Ein einzelner Ausführungsversuch eines Tasks (mit eigenem Token) |
| **Claim** | Atomares Reservieren eines `pending`-Tasks durch einen Worker |
| **Delivered** | Task-State: Worker hat Ergebnis geliefert, wartet auf Review/Integration |
| **Fencing** | Schutz vor State-Änderungen durch veraltete Attempts |
| **Lane** | Eine qualifizierte Worker-Rolle (Modell + Tool-Profil + Berechtigungen) |
| **Owner-Stopp** | Dauerhaftes Halt-Signal, überlebt Neustarts |
| **Quota Pool** | Logische Gruppe für Rate-Limiting (ein oder mehrere Accounts) |
| **Runner** | Protokoll-Komponente: startet Worker, überwacht Prozess, liefert Logs |
| **Supervisor** | Persistenter Loop: claimed Tasks → startet Runner → zählt Versuche → entscheidet über Retry/Stopp |
| **Turn** | Eine Worker-Sitzung: Claim → Arbeit → `turn end` (deliver oder fail) |