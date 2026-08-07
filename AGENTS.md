# AGENTS.md

# Energy Value Card

Dieses Repository enthält die Entwicklung einer performanten Home Assistant
Custom Card zur Darstellung einzelner Energiewerte.

## Entwicklungsprinzipien

- Kleine, nachvollziehbare Änderungen.
- Ein Patch = eine Änderung.
- Keine Sammeländerungen.
- Nach jedem Patch testen.
- Erst nach Abschluss eines Themenblocks committen.
- Keine automatischen Commits oder Pushes.

## Approval Policy / Freigaberegeln

### English

Source code must never be modified without explicit user approval.

The following workflow is mandatory:

1. Explain the planned change.
2. List every file that will be modified.
3. Wait for explicit user approval.
4. Create exactly one patch.
5. Wait for review before continuing.

Never assume approval.

Silence is never approval.

Do not continue with additional changes automatically.

If more than one solution is possible, explain the alternatives first and wait for the user's decision.

Only implement the requested change.
Do not refactor, optimize or improve unrelated code.

### Deutsch

Quellcode darf nur nach einer ausdrücklichen Freigabe des Benutzers geändert werden.

Folgender Ablauf ist verpflichtend:

1. Geplante Änderung erklären.
2. Alle betroffenen Dateien nennen.
3. Auf die ausdrückliche Freigabe warten.
4. Genau einen Patch erstellen.
5. Nach der Prüfung erneut auf die nächste Freigabe warten.

Eine Freigabe darf niemals vorausgesetzt werden.

Schweigen oder ausbleibende Antworten gelten niemals als Freigabe.

Nicht selbstständig mit weiteren Änderungen fortfahren.

Gibt es mehrere mögliche Lösungen, müssen diese zunächst vorgestellt werden.
Erst nach der Entscheidung des Benutzers darf die ausgewählte Lösung umgesetzt werden.

Es darf ausschließlich die beauftragte Änderung umgesetzt werden.

Keine Refactorings, Optimierungen oder zusätzlichen Änderungen ohne ausdrücklichen Auftrag.

## Keine stillen Änderungen

Der Agent darf niemals zusätzliche Änderungen durchführen,
die nicht ausdrücklich beauftragt wurden.

Jede funktionale Änderung erfolgt in einem eigenen Patch.

## Rückwärtskompatibilität

Neue Funktionen dürfen bestehende YAML-Konfigurationen
nicht verändern oder inkompatibel machen.

## Zusammenarbeit

Vor jeder Änderung:

1. Kurz beschreiben, was geändert werden soll.
2. Nur die angeforderte Änderung durchführen.
3. Keine zusätzlichen Refactorings.
4. Nach Möglichkeit Syntax prüfen.
5. Auf den Diff warten.

## Versionierung

Entwicklung erfolgt mit Zwischenversionen:

```
0.1.2a
0.1.2b
0.1.2c
```

Nach Abschluss eines Themenblocks erfolgt ein Git-Commit:

```
v0.1.2 Improve ...
```

Die Versionshistorie im Header der JavaScript-Datei ist bei jeder Version zu aktualisieren.

## Coding Style

- Kommentare in deutscher Sprache.
- Benutzertexte und Fehlermeldungen auf Deutsch.
- Committexte auf Englisch.
- Einrückung mit zwei Leerzeichen.
- Keine externen Bibliotheken.
- Verständliche Variablennamen.
- Verständliche Kommentare.

## Home Assistant

Die Card soll sich wie eine native Home Assistant Card verhalten.

Deshalb:

- YAML-Konfiguration sauber validieren.
- Verständliche Fehlermeldungen erzeugen.
- Home Assistant Theme-Variablen verwenden.
- Hohe Performance.
- Möglichst wenige DOM-Änderungen.

## Qualität

Vor jedem Patch prüfen:

- Ist die Änderung wirklich erforderlich?
- Bleibt das bisherige Verhalten erhalten?
- Kann die Änderung kleiner umgesetzt werden?

Bei Unsicherheit immer nachfragen.

## Agent-Verhalten

Nicht automatisch:

- Git Commit
- Git Push
- Git Reset
- Löschen von Dateien

Erlaubt:

- Syntaxprüfung
- git diff
- git status

## Ziel

Die Energy Value Card soll langfristig:

- HACS-tauglich sein.
- Leicht verständlich bleiben.
- Performant sein.
- Sauber dokumentiert sein.
- Einfach konfigurierbar sein.
