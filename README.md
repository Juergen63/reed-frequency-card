# reed-frequency-card

Analoges Reed Frequency Meter für Home Assistant zur Visualisierung der europäischen Netzfrequenz.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-blue)
![HACS](https://img.shields.io/badge/HACS-Custom%20Card-orange)
![GitHub release](https://img.shields.io/github/v/release/Juergen63/reed-frequency-card?display_name=tag)

![Reed Frequency Card](docs/images/reed-frequency-card.png)

## Status

✅ Erste stabile Version (0.4.0)

---

## Beschreibung

Die **Reed Frequency Card** visualisiert die Netzfrequenz des europäischen Stromnetzes in Anlehnung an ein klassisches Reed Frequency Meter (Zungenfrequenzmesser).

Die Resonanz der 41 Frequenzzungen wird als SVG-Grafik dargestellt. Die aktuell angeregte Zunge wird abhängig von der gemessenen Netzfrequenz hervorgehoben. Zusätzlich wird die Frequenz digital angezeigt.

Optional können die Spannungen und Ströme aller drei Netzphasen eingeblendet werden.

---

## Technische Voraussetzungen

- Home Assistant
- HACS
- SENEC Home V3 (getestet)
- ABB EnFluRi Netzsensor (getestet)

Aktuell werden folgende Sensoren verwendet:

- Netzfrequenz
- Spannung L1 / L2 / L3
- Strom L1 / L2 / L3

---

## Datenquelle Netzfrequenz

Die aktuelle Netzfrequenz wird über die öffentliche API von **Netzfrequenzmessung.de** bezogen.

Die Messwerte werden als gleitender 3-Sekunden-Mittelwert bereitgestellt und alle drei Sekunden aktualisiert.

**API:**

https://dat.netzfrequenzmessung.de:9080/frequenz.xml

Die API liefert die Frequenz im XML-Format:

```xml
<r>
  <f>50.003</f>
  <z>2026-08-12T07:45:18+00:00</z>
</r>
```

Die Einbindung in Home Assistant erfolgt über einen REST-Sensor.

---

## Home Assistant REST-Sensor

Beispiel:

```yaml
rest:
  - resource: https://dat.netzfrequenzmessung.de:9080/frequenz.xml
    scan_interval: 3
    sensor:
      - name: Netzfrequenz API
        unique_id: netzfrequenz_api
        value_template: "{{ value_json.f }}"
        unit_of_measurement: "Hz"
```

---

## Installation

1. Repository über HACS als benutzerdefiniertes Repository hinzufügen.
2. Die Reed Frequency Card über HACS installieren.
3. Home Assistant neu starten oder die Ressourcen neu laden.
4. Einen REST-Sensor für die Netzfrequenz anlegen.
5. Die Karte zum Dashboard hinzufügen.

---

## YAML

```yaml
type: custom:reed-frequency-card

title: Netzfrequenz

entity: sensor.netzfrequenz_api

show_version: false
show_phase_values: true

voltage_l1: sensor.senec_enfluri_net_potential_p1
current_l1: sensor.senec_enfluri_net_current_p1

voltage_l2: sensor.senec_enfluri_net_potential_p2
current_l2: sensor.senec_enfluri_net_current_p2

voltage_l3: sensor.senec_enfluri_net_potential_p3
current_l3: sensor.senec_enfluri_net_current_p3
```

---

## YAML Optionen

| Option            | Beschreibung                       | Standard     |
| ----------------- | ---------------------------------- | ------------ |
| entity            | Frequenzsensor                     | erforderlich |
| title             | Kartentitel                        | Netzfrequenz |
| show_version      | Versionsnummer anzeigen            | true         |
| show_phase_values | Spannungs- und Stromwerte anzeigen | false        |
| voltage_l1        | Spannung Phase 1                   | -            |
| current_l1        | Strom Phase 1                      | -            |
| voltage_l2        | Spannung Phase 2                   | -            |
| current_l2        | Strom Phase 2                      | -            |
| voltage_l3        | Spannung Phase 3                   | -            |
| current_l3        | Strom Phase 3                      | -            |

---

## Funktionen

- Analoge Darstellung der Netzfrequenz
- Live-Darstellung der europäischen Netzfrequenz
- 41 Frequenzzungen als SVG
- Digitale Frequenzanzeige
- Optionaler Kartentitel
- Optionale Anzeige der Spannungen und Ströme aller drei Phasen
- Optionale Anzeige der Version
- Vollständig über YAML konfigurierbar

---

## Changelog

siehe CHANGELOG.md
