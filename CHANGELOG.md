# Changelog

## v0.4.1

- Nichtlineare Frequenzskala für 49-51 Hz implementiert
- Skalenauflösung um 50 Hz erhöht
- Frequenzzungen reagieren empfindlicher im Nennbereich
- Frequenzanzeige auf drei Nachkommastellen erweitert
- Skala und Zungenposition synchronisiert
-

## [0.4.0] - 2026-08-13

### Added

- Automatische Versionsanzeige über GitHub Release Badge
- Verbesserte Dokumentation
- Stabiler Release-Stand der Reed Frequency Card

## v0.3.14

- Added comprehensive project documentation
- Added installation instructions
- Added Home Assistant REST sensor example
- Added complete YAML configuration example
- Added configuration reference table
- Added project screenshot to the README
- Improved project structure and documentation

## v0.3.13

- Added configurable card title (`title`)
- Added optional display of three-phase voltage and current values (`show_phase_values`)
- Added configurable Home Assistant entities for L1/L2/L3 voltage and current
- Added `renderPhaseValues()` for modular rendering of phase values
- Added monospace formatting for improved readability of live measurement values
- Improved card configurability through YAML options

## v0.3.12

- Reduced spacing below the analog instrument

## v0.3.11

- Reduced spacing between analog instrument and live frequency display

## v0.3.10

- Added YAML option `show_version` for optional version display

## v0.3.9

- Added 49 Hz and 51 Hz scale labels

## v0.3.8

- Removed local test slider
- Restored live Home Assistant frequency display

## v0.3.7

- Added local test slider for frequency preview
- Added frequency-dependent highlighting of the active reed

## v0.3.6

- Implemented symmetrical reed movement
- Changed reeds from lines to rectangular elements
- Optimized reed width to 14 px
- Removed baseline
- Added fixed 50 Hz center label
- Simplified SVG geometry

## v0.3.5

- Implemented SVG reed elements
- Automatically distributed all 41 reeds across the instrument width
- Removed reed support plate/baseline
- Added fixed 50 Hz reference label
- Added version display to the card
- Modularized SVG rendering (`renderReeds()`)

## v0.3.4

- Implemented basic reed framework
- Added first resonance visualization with variable reed lengths
- Split SVG rendering into dedicated functions
- Introduced modular instrument structure

## v0.3.3

- Added `renderReeds()` as preparation for SVG reed rendering

## v0.3.2

- Centralized geometry constants
- Prepared modular SVG components

## v0.3.1

- Initial project structure
- Shadow DOM implementation
- SVG rendering engine
- Instrument frame

## v0.3.0

- Initial import into GitHub
- Project initialized with Git, VS Code and HACS metadata
