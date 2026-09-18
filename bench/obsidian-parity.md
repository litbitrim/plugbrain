# Obsidian-Parität — ehrliche Fehlerliste

Auftrag: FB-BRAIN-03. Arbeitsort `C:\PLUG\plugpt\Code\PlugBrain-Core--v1`, Branch `brain/v1-standalone`,
Basis `018b926`. Brain-Daten ausschließlich unter `PLUGBRAIN_HOME=C:\PLUG\plugpt\.plugbrain-test\fb-brain-03`.

Vorgehen: Produkt wie ein Nutzer gestartet (`node --experimental-strip-types src/cli.ts serve 4310`,
Launcher-Weg: `npm run serve`), echten Vault `C:\PLUG\plugpt` registriert und indexiert, dann mit
dem laufenden Produkt über UI und API gearbeitet. Jeder Eintrag ist eine tatsächlich beobachtete
Handlung mit Kommando und Ausgabe, keine Vermutung aus dem Code.

Legende: **Blocker** = Produkt in dieser Form unbenutzbar, **Hoch** = Kernversprechen verletzt,
**Mittel** = falsche oder irreführende Anzeige, **Niedrig** = Politur.

---

## F-01 — Der laufende Daemon ist während des Indexierens vollständig tot (Blocker)

| | |
| --- | --- |
| Schritt | `serve` starten, Planet registrieren, `POST /api/reindex`, dann `GET /api/health` |
| Erwartung | Die Oberfläche bleibt bedienbar, der Indexlauf meldet Fortschritt |
| Beobachtung | Keine einzige HTTP-Antwort für die Dauer des Laufs. `curl -m 2 http://127.0.0.1:4310/api/health` liefert 50 Minuten lang `000` (Exit 28, Zeitüberschreitung), danach wieder 200 |
| Beleg | Messreihe unten; `netstat` zeigte den Listener in `CLOSE_WAIT`/`SYN_SENT`, die Verbindung wurde angenommen und nie beantwortet |
| Ursache | `indexPlanetWorkspace` ist vollständig synchron (`node:sqlite` synchron, `readFileSync`, TypeScript-Parser) und läuft im Event-Loop des Servers. `POST /api/reindex` ruft ihn direkt auf |
| Datei:Zeile | `src/server/api.ts:1229` (Handler `POST /api/reindex` → `indexPlanetWorkspace(db, id)`), `src/indexer/index.ts:82` (`indexWorkspace`) |

Messreihe (`curl -m 2 -o /dev/null -w "%{http_code}" .../api/health`, WAL-Größe in Byte):

```
15:13:33 health=000 wal=2426712        (Lauf gestartet 15:12:30)
15:16:47 health=000 wal=148019272
15:20:18 health=000 wal=1285736672
15:24:31 health=000 wal=2588628992
15:28:48 health=000 wal=2784057072
15:33:03 health=000 wal=2938429352
15:41:33 health=000 wal=3121641632
16:00:56 health=000 wal=3716915712
```

Konsequenz für einen Obsidian-Nutzer: Er öffnet seinen Vault, die Oberfläche bleibt weiß, jeder
Klick läuft in einen Timeout, und es gibt keinen Hinweis, dass überhaupt etwas passiert.

## F-02 — Kein Fortschritt, keine Zähler, kein „läuft gerade" (Blocker)

| | |
| --- | --- |
| Schritt | Während des Laufs `plugbrain status` und `plugbrain planet status` |
| Erwartung | Sichtbarer Fortschritt und Zähler |
| Beobachtung | `indexed: never`, `files 0  symbols 0  edges 0` — das gesamte Produkt sieht leer aus, obwohl seit 20 Minuten indiziert wird |
| Beleg | `time node --experimental-strip-types src/cli.ts status` → `real 0m1.005s`, Ausgabe „indexed: never … files 0" |
| Ursache | Es gibt keinen Fortschrittszustand: Der Indexlauf veröffentlicht erst mit dem `COMMIT`, und es existiert keine Route, kein Feld und keine Anzeige für „läuft gerade / wie weit" |
| Datei:Zeile | `src/cli.ts:357` (`status`), `src/server/api.ts` (keine `/api/index/progress`-Route) |

## F-03 — Ein Indexlauf ist genau eine Transaktion; die WAL wächst auf mehrere GB (Hoch)

| | |
| --- | --- |
| Schritt | Vollen Planeten indexieren und die Dateigrößen beobachten |
| Erwartung | Platzbedarf in der Größenordnung des Index, kein Risiko für die Platte |
| Beobachtung | Die Hauptdatei bleibt bei 4096 Byte, die WAL wächst auf 3 722 803 192 Byte (3,7 GB) |
| Beleg | `stat -c "%s %y" plugbrain.db plugbrain.db-wal` — `plugbrain.db` 4096 Byte seit 15:10:54, `plugbrain.db-wal` 3,7 GB und steigend |
| Ursache | `BEGIN IMMEDIATE` vor der Schreibphase, `COMMIT` erst am Ende: Alles landet in einer Transaktion. Ein Fehler in Minute 50 kostet den ganzen Lauf |
| Datei:Zeile | `src/indexer/index.ts:156` (`BEGIN IMMEDIATE`), `src/indexer/index.ts:410` (`COMMIT`) |

## F-04 — Nach dem Start registrierte Workspaces werden nie überwacht (Hoch)

| | |
| --- | --- |
| Schritt | `serve` starten (DB noch leer), danach `plugbrain planet register C:\PLUG\plugpt plugpt` |
| Erwartung | Der Daemon überwacht den neuen Planeten und hält ihn aktuell |
| Beobachtung | Keine Zeile `[daemon] watching plugpt …`; der Planet wird weder beobachtet noch vom Sweep erfasst |
| Beleg | `/tmp/serve.log` enthält nur die vier Startzeilen; die Startzeile `[daemon] watching …` erschien nie, obwohl der Planet 74 s nach dem Start registriert wurde |
| Ursache | `const tracked = db.prepare('SELECT … FROM workspaces').all()` wird einmal beim Start gelesen; Watcher **und** Sweep arbeiten für immer mit dieser Liste |
| Datei:Zeile | `src/daemon.ts:75` (`tracked`), `src/daemon.ts:96` (Sweep über `tracked`) |

## F-05 — Zwei Indexläufe können gleichzeitig starten (Hoch)

| | |
| --- | --- |
| Schritt | Indexlauf über die API starten und parallel `plugbrain planet scan` im Terminal |
| Erwartung | Der zweite Aufruf sagt „läuft schon" |
| Beobachtung | Der zweite Aufruf scannt mit, läuft minutenlang durch die Dateien und scheitert erst am `BEGIN IMMEDIATE` mit `database is locked` (busy_timeout 15 s) |
| Beleg | `src/store/schema.ts:44` setzt `busy_timeout = 15000`; die Sperre wirkt erst beim Schreiben, nicht beim Scannen |
| Ursache | Es gibt keine Lauf-Sperre. Der Scan (Minuten, viel I/O) ist ungeschützt, die Schreibsperre greift zu spät |
| Datei:Zeile | `src/indexer/index.ts:88` (Scan vor der Transaktion), `src/indexer/index.ts:156` |

## F-06 — Schreibende Routen hängen während des Laufs 15 s und scheitern dann (Hoch)

| | |
| --- | --- |
| Schritt | Während des Laufs `POST /api/notes/write` bzw. `plugbrain notes write` |
| Erwartung | Klare Antwort oder kurzes Warten |
| Beobachtung | Die Anfrage hängt im `busy_timeout` und endet als 500/SQLITE_BUSY, ohne „warum" |
| Ursache | Die Schreibsperre wird für die Dauer der ganzen Transaktion gehalten (F-03), die Route kennt den Zustand nicht |
| Datei:Zeile | `src/store/schema.ts:44`, `src/server/api.ts:555` |

---

## Offen zu prüfen (Durchlauf läuft noch)

- Atlas/City/Mesh mit echten Daten: leere Ansichten, Fehlermeldungen, Knäuel.
- Volltextsuche < 1 s mit Kontext und Klick auf die Fundstelle.
- Notizliste/Backlinks/Property-Abfrage im UI: Der Client hat `queryNotes` (Suchansicht) und `fetchBacklinks` (Quellansicht), aber keine eigene Vault-Ansicht.
- Graph-Filter, Fokus, Typ-Farben.
- Notiz bearbeiten und speichern mit erkanntem Konflikt.
- Neustart: Identität, Index und Chronik.
- Die im Auftrag geforderten Routen (`/api/health`, `/api/planet`, `/api/agent/search`, `/api/reindex`, `/api/provenance`, `/api/timeline`).
