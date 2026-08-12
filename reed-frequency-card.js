/*
====================================================

 Reed Frequency Card for Home Assistant

 Authors : Jürgen Zapf + ChatGPT
 Date    : 2026-07-22

  TODO
    - Nichtlineare Skala im Bereich um 50 Hz
    - Einschwing-/Ausschwinganimation der Resonanz

 Changelog
  v0.3.14
    - Added comprehensive project documentation
    - Added installation instructions
    - Added Home Assistant REST sensor example
    - Added complete YAML configuration example
    - Added configuration reference table
    - Added project screenshot to the README
    - Improved project structure and documentation
  0.3.13
   - Kartentitel über YAML konfigurierbar
   - Option show_phase_values ergänzt
   - Spannungs- und Stromwerte der drei Phasen optional eingeblendet
   - Neue Funktion renderPhaseValues() eingeführt
   - Monospace-Darstellung der Phasenwerte für bessere Lesbarkeit
   0.3.12
   - Leerraum unter dem Instrument weiter reduziert
   0.3.11
   - Abstand zwischen Instrument und Live-Frequenz reduziert
   0.3.10
   - YAML-Option show_version für die Versionsanzeige ergänzt
   0.3.9
   - Grenzbeschriftungen für 49 Hz und 51 Hz ergänzt
   0.3.8
   - Test-Schieberegler entfernt
   - Live-Anzeige der Home-Assistant-Entität wieder aktiviert
   0.3.7
   - Test-Schieberegler für lokale Frequenzvorschau ergänzt
   - Aktive Zunge frequenzabhängig markiert
    0.3.6
    - Symmetrische Darstellung der schwingenden Frequenzzungen
    - Rechteckige Zungen (keine Rundungen mehr)
    - Zungenbreite auf 14 px optimiert
    - Baseline entfernt
    - 50-Hz-Mittenmarkierung ergänzt
    - SVG-Geometrie weiter vereinfacht und bereinigt
     0.3.5
    - Frequenzzungen als SVG-Rechtecke umgesetzt
    - Automatische Verteilung der 41 Zungen über die gesamte Breite
    - Halteplatte/Baseline entfernt
    - Feste 50-Hz-Referenzbeschriftung ergänzt
    - Versionsanzeige in der Karte integriert
    - Code weiter modularisiert (renderReeds)
    0.3.4
    - Grundgerüst der Frequenzzungen implementiert
    - Erste Darstellung der Resonanz mit unterschiedlich hohen Zungen
    - renderBase() und renderReeds() als getrennte Funktionen eingeführt
    - Instrument in einzelne SVG-Komponenten aufgeteilt    
    0.3.3
    - Vorbereitung der Frequenzzungen
    - Funktion renderReeds() angelegt
    0.3.2
     - Konstanten zentral definiert
     - Vorbereitung für modulare SVG-Komponenten
    0.3.1
     - Projektgrundgerüst
     - Shadow DOM
     - SVG Engine
     - Instrumentenrahmen

====================================================
*/

const VERSION = "0.3.14";

/******************************************************************************
 * Frequenzbereich
 ******************************************************************************/

const REEDS = 41;

const MIN_FREQ = 49.0;
const NOMINAL_FREQ = 50.0;
const MAX_FREQ = 51.0;

/******************************************************************************
 * SVG-Geometrie
 ******************************************************************************/

const SVG_WIDTH = 800;
const SVG_HEIGHT = 180;

const FRAME_MARGIN = 5;

const REED_BASE_X = 78;
const REED_BASE_Y = 155;

const REED_BASE_WIDTH = 644;

/******************************************************************************
 * Beschriftung
 ******************************************************************************/

const LABEL_CENTER_X = SVG_WIDTH / 2;
const LABEL_CENTER_Y = 35;
const LABEL_FONT_SIZE = 20;
const LABEL_COLOR = "#666666";

/******************************************************************************
 * Frequenzzungen
 ******************************************************************************/

const REED_COUNT = 41;

const REED_START_X = 80;
const REED_SPACING = 9.2; //10

const REED_TOP_Y = 70;
const REED_BOTTOM_Y = REED_BASE_Y;

const REED_STROKE = 14; //8
const REED_RADIUS = 0;

const REED_MIN_LENGTH = 20;
const REED_PEAK_LENGTH = 100;

const REED_REST_HEIGHT = 40;

/******************************************************************************
 * Farben
 ******************************************************************************/

const COLOR_FRAME = "#333333";
const COLOR_BACKGROUND = "#efe8d6";

const COLOR_REED = "#666666";
const COLOR_REED_ACTIVE = "#d4af37";

const COLOR_SCALE = "#222222";
/* const COLOR_BASE = "#999999"; */

const COLOR_TEXT = "#000000";

/******************************************************************************
 * Logging
 ******************************************************************************/

console.info(`Reed Frequency Card v${VERSION} geladen`);

class ReedFrequencyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity fehlt!");
    }

    if (
      config.show_version !== undefined &&
      typeof config.show_version !== "boolean"
    ) {
      throw new Error("show_version muss true oder false sein!");
    }

    if (
      config.show_phase_values !== undefined &&
      typeof config.show_phase_values !== "boolean"
    ) {
      throw new Error("show_phase_values muss true oder false sein!");
    }

    this.config = {
      title: "Netzfrequenz",

      show_version: true,
      show_phase_values: false,

      voltage_l1: null,
      current_l1: null,

      voltage_l2: null,
      current_l2: null,

      voltage_l3: null,
      current_l3: null,

      ...config,
    };
  }

  set hass(hass) {
    const freq = parseFloat(hass.states[this.config.entity]?.state) || 50.0;

    this.renderCard(freq, hass);
  }

  renderCard(freq, hass) {
    this.shadowRoot.innerHTML = `
      <style>

        :host{
          display:block;
        }

        ha-card{
          padding:16px;
        }

        .title{
          text-align:center;
          font-size:24px;
          font-weight:bold;
          margin-bottom:12px;
        }

        .value{
          text-align:center;
          font-size:22px;
          margin-top:12px;
        }

        .phase-values{
          text-align:center;
          font-size:12px;
          font-family: monospace;
          color:#666666;
          margin-top:8px;
        }

        svg{
          width:100%;
          height:auto;
          aspect-ratio:${SVG_WIDTH} / ${SVG_HEIGHT};
          display:block;
        }

      </style>

      <ha-card>

        <div class="title">
          ${this.config.title}
        </div>

        ${this.renderInstrument(freq)}

        <div class="value">
          ${freq.toFixed(2)} Hz
        </div>
        
        ${
          this.config.show_phase_values
            ? `
          <div class="phase-values">
            ${this.renderPhaseValues(hass)}
          </div>
        `
            : ""
        }

        ${
          this.config.show_version
            ? `
          <div class="version">
            v${VERSION}
          </div>
        `
            : ""
        }

      </ha-card>
    `;
  }

  renderInstrument(freq) {
    return `
      <svg
        viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
        width="${SVG_WIDTH}"
        height="${SVG_HEIGHT}">

        <!-- Hintergrund -->

        <rect
          x="${FRAME_MARGIN}"
          y="${FRAME_MARGIN}"
          width="${SVG_WIDTH - FRAME_MARGIN * 2}"
          height="170"
          rx="10"
          fill="${COLOR_BACKGROUND}"
          stroke="${COLOR_FRAME}"
          stroke-width="4"/>

        <!-- Frequenzzungen -->

        <g class="reeds">
          ${this.renderReeds(freq)}
        </g>

        <text
          x="${REED_BASE_X}"
          y="${LABEL_CENTER_Y}"
          text-anchor="middle"
          font-size="${LABEL_FONT_SIZE}"
          font-weight="bold"
          fill="${LABEL_COLOR}">
          49 Hz
        </text>
        
        <text
          x="${LABEL_CENTER_X}"
          y="${LABEL_CENTER_Y}"
          text-anchor="middle"
          font-size="${LABEL_FONT_SIZE}"
          font-weight="bold"
          fill="${LABEL_COLOR}">
          50 Hz
        </text>

        <text
          x="${REED_BASE_X + REED_BASE_WIDTH}"
          y="${LABEL_CENTER_Y}"
          text-anchor="middle"
          font-size="${LABEL_FONT_SIZE}"
          font-weight="bold"
          fill="${LABEL_COLOR}">
          51 Hz
        </text>
        

        
      </svg>
    `;
  }

  renderReeds(freq) {
    const step = REED_BASE_WIDTH / (REED_COUNT - 1);
    const activeIndex = Math.max(
      0,
      Math.min(
        REED_COUNT - 1,
        Math.round(
          ((freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * (REED_COUNT - 1),
        ),
      ),
    );

    return Array.from({ length: REED_COUNT }, (_, i) => {
      const x = REED_BASE_X + i * step;

      let length = REED_MIN_LENGTH;

      const distance = Math.abs(i - activeIndex);

      if (distance === 0) length = 100;
      else if (distance === 1) length = 66;
      else if (distance === 2) length = 44;

      const centerY = REED_BOTTOM_Y - REED_REST_HEIGHT;

      const top = centerY - length / 2;
      const bottom = centerY + length / 2;
      const fill = i === activeIndex ? COLOR_REED_ACTIVE : COLOR_REED;

      return `
          <rect
            x="${x - REED_STROKE / 2}"
            y="${top}"
            width="${REED_STROKE}"
            height="${bottom - top}"
            rx="${REED_RADIUS}"
            fill="${fill}"/>
        `;
    }).join("");
  }

  renderPhaseValues(hass) {
    const getValue = (entity, digits) => {
      if (!entity) return "--";

      const state = hass.states[entity];

      if (!state) return "--";

      const value = parseFloat(state.state);

      if (isNaN(value)) return "--";

      return value.toFixed(digits);
    };

    return `
    ${getValue(this.config.voltage_l1, 1)}V ${getValue(this.config.current_l1, 2)}A
    •
    ${getValue(this.config.voltage_l2, 1)}V ${getValue(this.config.current_l2, 2)}A
    •
    ${getValue(this.config.voltage_l3, 1)}V ${getValue(this.config.current_l3, 2)}A
  `;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("reed-frequency-card", ReedFrequencyCard);
