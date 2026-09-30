# M18: 30 Goldfragen, Entwurf vom 30.09.2026

**Status: Messplan, kein Paritätsnachweis.** Dieser Korpus ersetzt für die nächste
Messung die alte `goldfragen.json`-Auswahl mit 28 Brain- und zwei PlugEngine-Fällen.
Jede Frage muss mit der rohen Antwort von Brain und GitNexus gegen denselben
Quellstand bewertet werden. Ein `found`-Status allein ist keine richtige Antwort.

## Eingefrorene Kandidaten vor Messbeginn

| Kürzel | Checkout | beobachteter Commit |
| --- | --- | --- |
| H | `Code/PlugHarness--int-orch` | `9f90dcf` |
| B | `Code/PlugBoard--dag` | `9165be2` |
| S | `Code/PlugPT-Shell--suite` | `7cd326b` |

Die drei Commits sind Vorschläge für die Messung. Vor dem Lauf müssen Branch,
HEAD, Dirty-Vektor, Brain-Auswahl und GitNexus-Index für **denselben** Stand
nachgewiesen werden. Die `changes`-Fragen verwenden eingefrorene synthetische
Diffs; sie ändern keine dieser Checkouts.

## Fragen und Quell-Oracle

Pfade sind relativ zum jeweiligen Checkout. Zeilen und Bezeichner sind ein
Startpunkt für das Oracle und werden beim Einfrieren des Korpus erneut geprüft.

| ID | Art | Frage und Anker | Zu bewerten |
| --- | --- | --- | --- |
| H01 | query | Wo wird HTTP-Inferenz-Dispatch erzeugt? `packages/plug/gateway/src/server.ts:95#createPlugGateway` | Exakte Definition statt namensähnlicher Operator-Funktion. |
| H02 | context | Welche Prüfungen und Admission-Writes gehören zu `packages/plug/gateway/src/governor.ts:121#Governor.admit`? | Ledger, harte Limits, Parallelität und Cooldown nur soweit quellenbelegt. |
| H03 | impact | Wer hängt von `packages/plug/gateway/src/route-registry.ts:314#materializeRoutes` ab? | Operator-Nutzung um `server.ts:377,390`; Tests getrennt ausweisen. |
| H04 | changes | Hunk in `packages/plug/operator/src/native-admission.ts:62#admitNativeDeployment`. | Exaktes Symbol und Checkout; keine fremden Checkouts. |
| H05 | Cypher | Finde `packages/plug/operator/src/brain-core.ts:123#callBrainCore`. | Scoped Function-Identität und gegen AST geprüfte Anzahl. |
| H06 | query | Wer wählt die installierte Brain-Bindung? `packages/plug/operator/src/brain-core.ts:86#resolvePlugBrainCoreBinding` | Definition von `ensureBrainCore` unterscheiden. |
| H07 | context | Was ruft `packages/plug/operator/src/brain-core.ts:194#ensureBrainCore` auf, und wer ruft es? | `brainCoreIsHealthy`, `brainCoreServiceSpec`, Operator-Server um Zeile 1091. |
| H08 | impact | Wer ruft `packages/plug/gateway/src/ledger.ts:365#RequestLedger.reserveTokens`? | Konkreter Aufruf in `gateway/src/budgets.ts:137`, keine Modul-Import-Inflation. |
| H09 | query | Wo ist Board-Agent-Spawn implementiert? `packages/plug/operator/src/board-agent-spawn.ts:202#spawnBoardResourceAgents` | Exakte Quelle statt generischer Spawn-Helfer. |
| H10 | context | Was prüft `packages/plug/gateway/src/route-registry.ts:768#acquireRouteForAgent`? | `resolveBoundRoute` und belegte Zweige; keine erfundenen Runtime-Caller. |
| B01 | query | Wo liest Board Planet/Galaxy? `src/main/brain/register.ts:145#readGalaxy` | Main-Prozess-Definition statt Renderer-Treffer. |
| B02 | context | Wie registriert und indiziert `src/main/brain/register.ts:187#ensureWorkspace`? | `/api/workspaces`, `/api/reindex`, Handler um Zeile 349, Fehlerpfad. |
| B03 | impact | Welcher Startpfad nutzt `src/main/agents/register.ts:84#registerAgentLaneHandlers`? | `src/main/index.ts:281`; Tests von Runtime trennen. |
| B04 | changes | Hunk in `src/renderer/shell/spawn.ts:152#spawnTerminal`. | Symbol, Zeile, Revision und Checkout exakt zuordnen. |
| B05 | Cypher | Finde `src/renderer/fleet/FleetSurface.tsx:31#FleetSurface`. | Scoped Function/Komponente; Anzahl unabhängig aus AST prüfen. |
| B06 | query | Wo ist das Brain-Workspace-Panel? `src/renderer/brain/BrainWorkspacePanel.tsx:54#BrainWorkspacePanel` | Exakte Komponente und Checkout. |
| B07 | context | Was ruft `src/main/agents/harness-operator-client.ts:529#HarnessOperatorClient.sessionSend`? | `/v1/session/send` und belegter Registry-Consumer. |
| B08 | impact | Wer ruft `src/renderer/terminal/launch.ts:167#startFreebuffInSession`? | Swarm um Zeile 201 und AgentSurface um 606/612; keine anderen Launches. |
| B09 | query | Wo wird City/Mesh gerendert? `src/renderer/brain/CityMeshPanel.tsx:41#CityMeshPanel` | Panel von Core-Projektion unterscheiden. |
| B10 | context | Welchen Endpunkt benutzt `src/main/brain/register.ts:267#attachAgent`? | `/api/agent/attach`, Handler um Zeile 352, Fehler nicht als Erfolg melden. |
| S01 | query | Wo werden Desktop-HostBridge-Operationen gemappt? `apps/desktop/electron/plug-host-bridge.ts:126#routePlugHostBridgeInvocation` | Exakte Map, keine erfundene freie Fetch-Route. |
| S02 | context | Was ruft `apps/desktop/electron/plug-host-bridge.ts:225#createPlugHostBridgeMainClient`? | Mapper um Zeile 357, Identität und Transport; keine Secrets. |
| S03 | impact | Wer registriert `apps/desktop/electron/plug-host-bridge.ts:392#registerPlugHostBridgeIpc`? | `apps/desktop/electron/main.ts:386`; Tests getrennt. |
| S04 | changes | Hunk in `apps/desktop/electron/plug-host-bridge.ts:409#isTrustedPlugDeskRendererUrl`. | Trust-Funktion im richtigen Checkout. |
| S05 | Cypher | Finde `hermes_cli/commands.py:414#resolve_command`. | Python-Definition und AST-Anzahl; Parser-Lücke ehrlich melden. |
| S06 | query | Wo startet PlugDesk-Rendering? `apps/desktop/src/plugdesk/plugdesk-root.tsx:1251#PlugDeskBootstrap` | Definition und Referenzen in `apps/desktop/src/main.tsx`. |
| S07 | context | Wer nutzt `hermes_cli/commands.py:619#gateway_help_lines`? | Direkte Aufrufe in `hermes_cli/slash_exec.py:165,204`. |
| S08 | impact | Welche Caller hängen von `agent/skill_commands.py:655#get_skill_commands` ab? | Belegte CLI- und Slash-Exec-Caller; Dynamik als unaufgelöst. |
| S09 | context | Wo wird `hermes_cli/auth.py:205#normalize_actual_base_url` genutzt? | Referenzen in auth, runtime_provider und auxiliary_client; keine Credential-Inhalte. |
| S10 | query | Wo wird `/skill`-Payload gebaut? `agent/skill_commands.py:766#build_skill_invocation_message` | Exakte Definition statt Helper um Zeile 862. |

## Messregel

Für jeden Fall: Frage, eingefrorener Quellanker, erwartete konkrete Antwort,
Brain- und GitNexus-Rohantwort, richtige/falsche/unaufgelöste Behauptungen,
Latenz und Index-Revision speichern. Precision und Recall auf derselben
bewerteten Faktenmenge rechnen. Zusätzlich die kritischen Identitäts-,
Revisions- und Restorefälle des Masters prüfen. M18 bleibt offen, bis die
30 Fragen mit beiden Werkzeugen auf derselben Revision ausgeführt sind,
Brain mindestens so viele korrekt beantwortet, Precision **und** Recall
jeweils mindestens 95 % betragen und p95 höchstens 2 s ist.
