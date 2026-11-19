/**
 * Lo-Fi & Synth Beats Music Station
 * Real-time procedural audio synthesis with dynamic SVG frequency visualizer
 */

import { sound } from '../audio.js';

export class LoFiPlayer {
  constructor(containerEl) {
    this.container = containerEl;
    this.isPlaying = false;
    this.rafId = null;

    this.init();
  }

  init() {
    this.renderLayout();
    this.bindEvents();
    this.startVisualizerLoop();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="lofi-card">
        <div class="lofi-header">
          <div class="lofi-title-group">
            <span class="lofi-badge">Web Audio Synth</span>
            <h3 class="lofi-title">☕ Lo-Fi Java Beats & Ambient</h3>
          </div>
          <div class="lofi-state-indicator" id="lofiStatus">
            <span class="status-dot"></span>
            <span class="status-text">Остановлено</span>
          </div>
        </div>

        <!-- SVG Equalizer Visualizer -->
        <div class="lofi-visualizer-box">
          <svg viewBox="0 0 320 80" class="svg-visualizer" id="svgVisualizer" preserveAspectRatio="none">
            <defs>
              <linearGradient id="eqGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="#00F0FF" />
                <stop offset="50%" stop-color="#8B5CF6" />
                <stop offset="100%" stop-color="#EC4899" />
              </linearGradient>
            </defs>
            <g id="eqBarsGroup">
              <!-- Dynamic bars will be updated -->
              ${Array.from({ length: 16 }).map((_, i) => `
                <rect x="${i * 20 + 2}" y="74" width="16" height="6" rx="3" fill="url(#eqGrad)" opacity="0.85" />
              `).join('')}
            </g>
          </svg>
        </div>

        <div class="lofi-controls-grid">
          <button class="btn btn-primary btn-play" id="lofiPlayBtn">
            <span id="playBtnIcon">▶</span>
            <span id="playBtnText">Включить Lo-Fi</span>
          </button>

          <div class="lofi-bpm-control">
            <span class="ctrl-label">Темп (BPM): <strong id="bpmVal">80</strong></span>
            <input type="range" id="bpmSlider" min="65" max="115" value="80" class="custom-slider" />
          </div>

          <div class="lofi-presets">
            <button class="pill-btn-sm active" data-preset="chill">☕ Coffee Chill</button>
            <button class="pill-btn-sm" data-preset="night">🌙 Night Coding</button>
            <button class="pill-btn-sm" data-preset="cyber">⚡ Cyber Focus</button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const playBtn = this.container.querySelector('#lofiPlayBtn');
    const playIcon = this.container.querySelector('#playBtnIcon');
    const playText = this.container.querySelector('#playBtnText');
    const statusEl = this.container.querySelector('#lofiStatus');
    const statusText = statusEl.querySelector('.status-text');

    playBtn.addEventListener('click', () => {
      this.isPlaying = sound.toggleLoFi();

      if (this.isPlaying) {
        sound.playCoin();
        playIcon.textContent = '⏸';
        playText.textContent = 'Пауза';
        playBtn.classList.add('playing');
        statusEl.classList.add('active');
        statusText.textContent = 'Играет генеративный бит';
      } else {
        sound.playPop(400);
        playIcon.textContent = '▶';
        playText.textContent = 'Включить Lo-Fi';
        playBtn.classList.remove('playing');
        statusEl.classList.remove('active');
        statusText.textContent = 'Остановлено';
      }
    });

    const bpmSlider = this.container.querySelector('#bpmSlider');
    const bpmVal = this.container.querySelector('#bpmVal');
    bpmSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      bpmVal.textContent = val;
      sound.bpm = val;
    });

    // Presets
    this.container.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sound.playClick();
        const preset = btn.dataset.preset;
        if (preset === 'chill') {
          sound.bpm = 76;
        } else if (preset === 'night') {
          sound.bpm = 68;
        } else if (preset === 'cyber') {
          sound.bpm = 96;
        }
        bpmSlider.value = sound.bpm;
        bpmVal.textContent = sound.bpm;
      });
    });
  }

  startVisualizerLoop() {
    const bars = this.container.querySelectorAll('#eqBarsGroup rect');

    const update = () => {
      if (this.isPlaying) {
        const freqData = sound.getVisualizerData();
        bars.forEach((bar, idx) => {
          const val = freqData[idx] || 0;
          const h = Math.max(6, (val / 255) * 70);
          const y = 80 - h;
          bar.setAttribute('y', y);
          bar.setAttribute('height', h);
          bar.setAttribute('opacity', (0.5 + (val / 255) * 0.5).toFixed(2));
        });
      } else {
        // Idle gentle wave
        const now = Date.now() * 0.003;
        bars.forEach((bar, idx) => {
          const wave = (Math.sin(now + idx * 0.4) + 1) * 0.5;
          const h = 4 + wave * 8;
          const y = 80 - h;
          bar.setAttribute('y', y);
          bar.setAttribute('height', h);
          bar.setAttribute('opacity', '0.4');
        });
      }

      this.rafId = requestAnimationFrame(update);
    };

    this.rafId = requestAnimationFrame(update);
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    sound.stopLoFi();
  }
}
