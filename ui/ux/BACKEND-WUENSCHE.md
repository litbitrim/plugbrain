# Backend-Wünsche aus der UX-Entwicklung (BRAIN-UX-01)

Stand: 26.09.2026 (Worker: agy)

### 1. `POST /api/notes/rename` (Notiz-Umbenennung mit Wiki-Link-Refactoring)
- **Problem:** Notizen können im Frontend unter neuem Namen angelegt werden, aber die alte Datei verbleibt und bestehende `[[NotizName]]` in anderen Notizen verweisen noch auf den alten Namen.
- **Wunsch:** Ein atomarer Endpunkt `POST /api/notes/rename` mit `{ workspace, oldPath, newPath, updateLinks: true }`:
  1. Benennt die Datei auf dem Dateisystem um.
  2. Aktualisiert alle Wiki-Links `[[Alt]]` in anderen Notizen des Vaults atomar auf `[[Neu]]`.
  3. Aktualisiert den Index ohne vollen Re-Scan.

### 2. Schnelle Schnellwechsler-Suche für große Vaults
- **Problem:** Bei Vaults mit > 10.000 Notizen ist die clientseitige Filterung der Notizenliste speicherintensiv.
- **Wunsch:** `GET /api/notes/quick?q=...&limit=20`, der nur `{ path, title, tags }` aus dem SQLite FTS/Titel-Index zurückliefert.
