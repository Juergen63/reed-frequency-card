/*
====================================================

 Reed Frequency Card for Home Assistant

 Authors : Jürgen Zapf + ChatGPT
 Date    : 2026-07-22

    TODO
    - Rechteckige Zungen statt Linien
    - Ruhelage definieren
    - Symmetrische Schwingung um die Ruhelage
    - Farbänderung entsprechend der Schwingungsamplitude
    - Nur drei aktiv angeregte Zungen

 Changelog
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

const VERSION = "0.3.6";

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
const SVG_HEIGHT = 220;

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

    this.config = config;
  }

  set hass(hass) {

    const freq =
      parseFloat(hass.states[this.config.entity]?.state) || 50.00;

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

        svg{
          width:100%;
          height:180px;
          display:block;
        }

      </style>

      <ha-card>

        <div class="title">
          Reed Frequency Meter
        </div>

        ${this.renderInstrument(freq)}

        <div class="value">
          ${freq.toFixed(2)} Hz
        </div>
        
        <div class="version">
          v${VERSION}
        </div>

      </ha-card>
    `;
  }

  renderInstrument(freq){

    return `
      <svg viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}">

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

        ${this.renderReeds(freq)}
        
        <text
          x="${LABEL_CENTER_X}"
          y="${LABEL_CENTER_Y}"
          text-anchor="middle"
          font-size="${LABEL_FONT_SIZE}"
          font-weight="bold"
          fill="${LABEL_COLOR}">
          50 Hz
        </text> 
        

        
      </svg>
    `;

  }

    renderReeds(freq) {
        const step = REED_BASE_WIDTH / (REED_COUNT - 1);
        return Array.from({ length: REED_COUNT }, (_, i) => {
            const x = REED_BASE_X + i * step;
        
        let length = REED_MIN_LENGTH;
        
        const distance = Math.abs(i - 20);
        
        if (distance === 0) length = 100;
        else if (distance === 1) length = 66;
        else if (distance === 2) length = 44;
        
        const centerY = REED_BOTTOM_Y - REED_REST_HEIGHT;

        const top = centerY - length / 2;
        const bottom = centerY + length / 2;
        
        return `
          <rect
            x="${x - REED_STROKE / 2}"
            y="${top}"
            width="${REED_STROKE}"
            height="${bottom - top}"
            rx="${REED_RADIUS}"
            fill="${COLOR_REED}"/>
        `;
    
      }).join("");
    
    }
    
  getCardSize(){
    return 4;
  }

}

customElements.define(
  "reed-frequency-card",
  ReedFrequencyCard
);