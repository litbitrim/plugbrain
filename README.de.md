# PlugBrain

[English](README.md) | Deutsch

Ein lokaler Projektindex für Code, Markdown-Wissen und die Koordination vorhandener Coding-Agenten. PlugBrain läuft ohne PlugPT, Freebuff, API-Schlüssel oder Cloud-Login. Es hostet selbst kein Sprachmodell.

**Aktueller Einstieg:** [aus dem Quellcode starten](docs/quickstart.md), [Dokumentation](docs/index.md), [Agenten anbinden](docs/agents/README.md). Node.js 24+, npm und Git werden benötigt. Der öffentliche Source-Stand meldet 0.5.0-dev.1. Release 0.3.1 besitzt keine Installer-Assets; [PR 6](https://github.com/litbitrim/plugbrain/pull/6) ist ein offener 0.6-Kandidat. Die Produktbilder zeigen einen lokalen, unsignierten 0.7.0-rc.2-Test mit reinen Beispieldaten. Versions- und Downloadgrenzen stehen unter [Channels](docs/channels.md).

Starte mit einem Projekt, lies Notizen und Code, verbinde danach einen bestehenden MCP-Client. Mehrere Worker teilen dieselbe Task- und Claim-Autorität. Ein Taskstatus beweist keine Ausführung; Lieferung, unabhängiges Review und Integration bleiben getrennt. Die deutsche Oberfläche kann direkt genutzt werden, auch wenn kein Agent läuft.
