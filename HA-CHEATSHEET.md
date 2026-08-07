# Home Assistant Development Cheat Sheet

## ⌨️ VS Code (Mac)

```text
⌘S              Speichern
⌘P              Datei öffnen
⌘⇧P             Command Palette
⌘K              Terminal löschen
⌃`              Neues Terminal
⌥⌘←             Zurück
⌘/              Zeile aus-/einkommentieren
⇧⌥F             Dokument formatieren
```

## 🐙 Git

```text
git status                 	Status anzeigen
git add .                  	Alle Änderungen vormerken
git commit -m "..."        	Commit erstellen
git commit --amend -m "..." Letzte Commit-Nachricht ändern
git log --oneline           Kurze Historie
git log --oneline -5        Letzte fünf Commits anzeigen
git diff                    Änderungen anzeigen
git diff --staged           Vorgemerkte Änderungen anzeigen
git mv <alt> <neu>          Datei umbenennen/verschieben
git restore <Datei>         Änderungen verwerfen
git pull                    Änderungen von GitHub holen
git push                    Änderungen zu GitHub senden
git remote -v               Verbundene Repositories anzeigen
git branch                  Branch anzeigen
```

## 🏠 Home Assistant

```text
⌘⇧R                        Browser hart neu laden
?v=0.1.0                   Browser-Cache umgehen
Einstellungen → System → Alle YAML-Konfigurationen prüfen
Einstellungen → System → Neustart

www/community/energy-value-card/
```

## 🖥️ Terminal

```text
clear                      Bildschirm löschen
pwd                        Aktuelles Verzeichnis
ls                         Dateien anzeigen
cd                         Verzeichnis wechseln

↑                          Letzten Befehl holen
Tab                        Autovervollständigung
⌃C                         Befehl abbrechen

⌃R                         Suche in der Befehls-Verlauf
→                          Gefundenen Befehl übernehmen
↩︎                         Gefundenen Befehl ausführen
⌃G                         Suche abbrechen
```

## 💡 Lessons Learned

```text
Brave cached Custom Cards sehr aggressiv.
→ Versionsparameter ?v=... erhöhen.

Nach Änderungen an Custom Cards Browser neu laden.
Nur eine Änderung gleichzeitig durchführen.
Nach jeder Änderung testen.

VS Code Remote Extension Host kann nach längerer
VPN-Unterbrechung abstürzen.
→ VS Code neu starten.

Home Assistant Backups ersetzen kein Git.
Git dient der Versionsverwaltung.

Vor jeder Änderung:
git status

Nach jeder abgeschlossenen Funktion:
git add .
git commit -m "..."
```

## 📁 Projektstruktur

```text
energy-value-card/
├── energy-value-card.js
├── README.md
├── CHANGELOG.md
├── HA-CHEATSHEET.md
├── LICENSE
└── .gitignore
```

## 🚀 Entwicklungsablauf

```text
1. git status

2. Änderungen programmieren

3. In Home Assistant testen

3a. Browser hart neu laden (⌘⇧R), falls die Änderung nicht sichtbar ist

4. git add .

5. git commit -m "Beschreibung"

6. git push   (wenn GitHub eingerichtet ist)
```
