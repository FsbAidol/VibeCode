/**
 * SVG Emoji Studio Widget
 * Interactive vector emoji builder with real-time morphing and gaze tracking
 */

import { STUDIO_PARTS } from '../emoji-data.js';
import { sound } from '../audio.js';
import { triggerEmojiConfetti } from '../utils/confetti.js';

export class EmojiStudio {
  constructor(containerEl, onSpawnToPhysics = null) {
    this.container = containerEl;
    this.onSpawnToPhysics = onSpawnToPhysics;

    this.state = {
      headShape: 'circle',
      skinColor: '#FBBF24',
      eyes: 'sunglasses',
      mouth: 'smile',
      accessory: 'partyHat',
      squash: 1,
      eyeSize: 1,
      glow: 0,
      lookX: 0,
      lookY: 0
    };

    this.init();
  }

  init() {
    this.renderLayout();
    this.bindEvents();
    this.updatePreview();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="studio-wrapper">
        <div class="studio-preview-col">
          <div class="studio-preview-box" id="studioPreviewBox">
            <div class="studio-glow-effect" id="studioGlow"></div>
            <div class="studio-svg-viewport" id="studioSvgViewport">
              <!-- SVG generated here -->
            </div>
            <div class="studio-badges">
              <span class="badge-tag">SVG Vector</span>
              <span class="badge-tag live-badge">● Live</span>
            </div>
          </div>

          <div class="studio-quick-actions">
            <button class="btn btn-secondary btn-sm" id="studioRandomBtn">
              <span>🎲 Рандом</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="studioCopyBtn">
              <span>📋 Копировать SVG</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="studioDownloadBtn">
              <span>💾 Скачать .svg</span>
            </button>
            <button class="btn btn-primary btn-sm" id="studioLaunchBtn">
              <span>🚀 В песочницу</span>
            </button>
          </div>
        </div>

        <div class="studio-controls-col">
          <!-- Skin Color Selector -->
          <div class="control-group">
            <label class="control-label">Цвет и стиль основы</label>
            <div class="color-swatches" id="skinSwatches">
              ${STUDIO_PARTS.skinColors.map(c => `
                <button type="button" class="color-swatch ${c.color === this.state.skinColor ? 'active' : ''}" 
                  data-color="${c.color}" style="--swatch-color: ${c.color};" title="${c.label}">
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Head Shape Selector -->
          <div class="control-group">
            <label class="control-label">Форма головы</label>
            <div class="pill-selectors" id="headShapeGroup">
              ${Object.entries(STUDIO_PARTS.headShapes).map(([key, val]) => `
                <button type="button" class="pill-btn ${key === this.state.headShape ? 'active' : ''}" data-shape="${key}">
                  ${val.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Eyes Selector -->
          <div class="control-group">
            <label class="control-label">Глаза & Выражение</label>
            <div class="pill-selectors" id="eyesGroup">
              ${Object.entries(STUDIO_PARTS.eyes).map(([key, val]) => `
                <button type="button" class="pill-btn ${key === this.state.eyes ? 'active' : ''}" data-eyes="${key}">
                  ${val.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Mouth Selector -->
          <div class="control-group">
            <label class="control-label">Рот & Улыбка</label>
            <div class="pill-selectors" id="mouthGroup">
              ${Object.entries(STUDIO_PARTS.mouths).map(([key, val]) => `
                <button type="button" class="pill-btn ${key === this.state.mouth ? 'active' : ''}" data-mouth="${key}">
                  ${val.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Accessories Selector -->
          <div class="control-group">
            <label class="control-label">Аксессуар / Головной убор</label>
            <div class="pill-selectors" id="accessoryGroup">
              ${Object.entries(STUDIO_PARTS.accessories).map(([key, val]) => `
                <button type="button" class="pill-btn ${key === this.state.accessory ? 'active' : ''}" data-accessory="${key}">
                  ${val.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Sliders -->
          <div class="control-sliders">
            <div class="slider-row">
              <span class="slider-title">Сжатие головы (Squash):</span>
              <input type="range" id="squashSlider" min="0.7" max="1.3" step="0.05" value="1" class="custom-slider" />
              <span class="slider-val" id="squashVal">1.0</span>
            </div>
            <div class="slider-row">
              <span class="slider-title">Размер глаз:</span>
              <input type="range" id="eyeSizeSlider" min="0.7" max="1.4" step="0.05" value="1" class="custom-slider" />
              <span class="slider-val" id="eyeSizeVal">1.0</span>
            </div>
            <div class="slider-row">
              <span class="slider-title">Неоновое свечение:</span>
              <input type="range" id="glowSlider" min="0" max="30" step="2" value="0" class="custom-slider" />
              <span class="slider-val" id="glowVal">0px</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Skin colors
    const skinGroup = this.container.querySelector('#skinSwatches');
    skinGroup.addEventListener('click', e => {
      const btn = e.target.closest('.color-swatch');
      if (!btn) return;
      skinGroup.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.state.skinColor = btn.dataset.color;
      sound.playClick();
      this.updatePreview();
    });

    // Head shapes
    const headGroup = this.container.querySelector('#headShapeGroup');
    headGroup.addEventListener('click', e => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      headGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.state.headShape = btn.dataset.shape;
      sound.playClick();
      this.updatePreview();
    });

    // Eyes
    const eyesGroup = this.container.querySelector('#eyesGroup');
    eyesGroup.addEventListener('click', e => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      eyesGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.state.eyes = btn.dataset.eyes;
      sound.playPop(520);
      this.updatePreview();
    });

    // Mouth
    const mouthGroup = this.container.querySelector('#mouthGroup');
    mouthGroup.addEventListener('click', e => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      mouthGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.state.mouth = btn.dataset.mouth;
      sound.playPop(620);
      this.updatePreview();
    });

    // Accessories
    const accGroup = this.container.querySelector('#accessoryGroup');
    accGroup.addEventListener('click', e => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      accGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.state.accessory = btn.dataset.accessory;
      sound.playPop(750);
      this.updatePreview();
    });

    // Sliders
    const squash = this.container.querySelector('#squashSlider');
    const squashVal = this.container.querySelector('#squashVal');
    squash.addEventListener('input', e => {
      this.state.squash = parseFloat(e.target.value);
      squashVal.textContent = this.state.squash.toFixed(2);
      this.updatePreview();
    });

    const eyeSize = this.container.querySelector('#eyeSizeSlider');
    const eyeSizeVal = this.container.querySelector('#eyeSizeVal');
    eyeSize.addEventListener('input', e => {
      this.state.eyeSize = parseFloat(e.target.value);
      eyeSizeVal.textContent = this.state.eyeSize.toFixed(2);
      this.updatePreview();
    });

    const glow = this.container.querySelector('#glowSlider');
    const glowVal = this.container.querySelector('#glowVal');
    glow.addEventListener('input', e => {
      this.state.glow = parseInt(e.target.value, 10);
      glowVal.textContent = `${this.state.glow}px`;
      this.updatePreview();
    });

    // Mouse pupil tracking in preview
    const previewBox = this.container.querySelector('#studioPreviewBox');
    previewBox.addEventListener('mousemove', e => {
      const rect = previewBox.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.state.lookX = x * 15;
      this.state.lookY = y * 15;
      this.updatePreview(false);
    });

    previewBox.addEventListener('mouseleave', () => {
      this.state.lookX = 0;
      this.state.lookY = 0;
      this.updatePreview(false);
    });

    // Random button
    this.container.querySelector('#studioRandomBtn').addEventListener('click', () => {
      this.randomize();
    });

    // Copy SVG button
    this.container.querySelector('#studioCopyBtn').addEventListener('click', () => {
      this.copySvg();
    });

    // Download SVG button
    this.container.querySelector('#studioDownloadBtn').addEventListener('click', () => {
      this.downloadSvg();
    });

    // Launch to Physics button
    this.container.querySelector('#studioLaunchBtn').addEventListener('click', (e) => {
      sound.playCoin();
      const rect = e.target.getBoundingClientRect();
      triggerEmojiConfetti(rect.left + rect.width / 2, rect.top, ['🚀', '✨', '⚡']);
      if (this.onSpawnToPhysics) {
        this.onSpawnToPhysics(this.generateSvgString());
      }
    });
  }

  generateSvgString() {
    const headObj = STUDIO_PARTS.headShapes[this.state.headShape] || STUDIO_PARTS.headShapes.circle;
    const eyesObj = STUDIO_PARTS.eyes[this.state.eyes] || STUDIO_PARTS.eyes.normal;
    const mouthObj = STUDIO_PARTS.mouths[this.state.mouth] || STUDIO_PARTS.mouths.smile;
    const accObj = STUDIO_PARTS.accessories[this.state.accessory] || STUDIO_PARTS.accessories.none;

    const headMarkup = headObj.render(this.state.skinColor, this.state.squash);
    const eyesMarkup = eyesObj.render(this.state.lookX, this.state.lookY, this.state.eyeSize);
    const mouthMarkup = mouthObj.render();
    const accMarkup = accObj.render();

    const glowFilter = this.state.glow > 0 
      ? `filter="drop-shadow(0 0 ${this.state.glow}px ${this.state.skinColor})"` 
      : '';

    return `<svg viewBox="0 0 200 200" class="studio-generated-svg" ${glowFilter} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="studioShine" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.1" />
        </radialGradient>
      </defs>
      <g class="emoji-face-group">
        ${headMarkup}
        ${eyesMarkup}
        ${mouthMarkup}
        ${accMarkup}
      </g>
    </svg>`;
  }

  updatePreview(animate = true) {
    const viewport = this.container.querySelector('#studioSvgViewport');
    const glowEl = this.container.querySelector('#studioGlow');

    viewport.innerHTML = this.generateSvgString();

    if (this.state.glow > 0) {
      glowEl.style.boxShadow = `0 0 ${this.state.glow * 2}px ${this.state.skinColor}`;
      glowEl.style.opacity = '0.6';
    } else {
      glowEl.style.boxShadow = 'none';
      glowEl.style.opacity = '0';
    }

    if (animate) {
      const svg = viewport.querySelector('svg');
      if (svg) {
        svg.style.transform = 'scale(0.96)';
        requestAnimationFrame(() => {
          svg.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
          svg.style.transform = 'scale(1)';
        });
      }
    }
  }

  randomize() {
    sound.playPowerUp();
    const headKeys = Object.keys(STUDIO_PARTS.headShapes);
    const eyesKeys = Object.keys(STUDIO_PARTS.eyes);
    const mouthKeys = Object.keys(STUDIO_PARTS.mouths);
    const accKeys = Object.keys(STUDIO_PARTS.accessories);
    const colors = STUDIO_PARTS.skinColors;

    this.state.headShape = headKeys[Math.floor(Math.random() * headKeys.length)];
    this.state.eyes = eyesKeys[Math.floor(Math.random() * eyesKeys.length)];
    this.state.mouth = mouthKeys[Math.floor(Math.random() * mouthKeys.length)];
    this.state.accessory = accKeys[Math.floor(Math.random() * accKeys.length)];
    this.state.skinColor = colors[Math.floor(Math.random() * colors.length)].color;
    this.state.squash = parseFloat((0.85 + Math.random() * 0.3).toFixed(2));
    this.state.eyeSize = parseFloat((0.85 + Math.random() * 0.35).toFixed(2));
    this.state.glow = Math.random() > 0.5 ? Math.floor(Math.random() * 20) : 0;

    // Sync UI elements
    this.container.querySelectorAll('#skinSwatches .color-swatch').forEach(b => {
      b.classList.toggle('active', b.dataset.color === this.state.skinColor);
    });
    this.container.querySelectorAll('#headShapeGroup .pill-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.shape === this.state.headShape);
    });
    this.container.querySelectorAll('#eyesGroup .pill-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.eyes === this.state.eyes);
    });
    this.container.querySelectorAll('#mouthGroup .pill-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mouth === this.state.mouth);
    });
    this.container.querySelectorAll('#accessoryGroup .pill-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.accessory === this.state.accessory);
    });

    const squashSlider = this.container.querySelector('#squashSlider');
    squashSlider.value = this.state.squash;
    this.container.querySelector('#squashVal').textContent = this.state.squash.toFixed(2);

    const eyeSizeSlider = this.container.querySelector('#eyeSizeSlider');
    eyeSizeSlider.value = this.state.eyeSize;
    this.container.querySelector('#eyeSizeVal').textContent = this.state.eyeSize.toFixed(2);

    const glowSlider = this.container.querySelector('#glowSlider');
    glowSlider.value = this.state.glow;
    this.container.querySelector('#glowVal').textContent = `${this.state.glow}px`;

    this.updatePreview(true);
  }

  copySvg() {
    const svgCode = this.generateSvgString();
    navigator.clipboard.writeText(svgCode).then(() => {
      sound.playCoin();
      const btn = this.container.querySelector('#studioCopyBtn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>✅ Скопировано!</span>';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 1600);
    }).catch(err => {
      console.error('Failed to copy', err);
    });
  }

  downloadSvg() {
    sound.playPop();
    const svgCode = this.generateSvgString();
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `javaverse-emoji-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
