/**
 * SVG Emoji Physics Sandbox
 * 2D rigid-body particle simulation with gravity, elastic collisions, and vector SVG rendering
 */

import { SVG_EMOJIS } from '../emoji-data.js';
import { sound } from '../audio.js';

export class EmojiPhysicsSandbox {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.cachedImages = new Map();
    this.gravity = 0.65;
    this.bounciness = 0.75;
    this.friction = 0.99;
    this.cursorMode = 'fling'; // 'fling' | 'repel' | 'attract'
    this.selectedParticle = null;
    this.dragOffset = { x: 0, y: 0 };
    this.mouse = { x: -1000, y: -1000, isDown: false, prevX: 0, prevY: 0, vx: 0, vy: 0 };
    this.animId = null;
    this.lastTime = 0;

    this.init();
  }

  init() {
    this.renderLayout();
    this.setupCanvas();
    this.preloadEmojis();
    this.bindEvents();
    this.spawnInitialSet();
    this.startLoop();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="physics-panel">
        <div class="physics-toolbar">
          <div class="toolbar-group">
            <span class="toolbar-title">Гравитация:</span>
            <button class="pill-btn-sm" data-gravity="0">В невесомости</button>
            <button class="pill-btn-sm" data-gravity="0.3">Луна</button>
            <button class="pill-btn-sm active" data-gravity="0.65">Земля</button>
            <button class="pill-btn-sm" data-gravity="1.4">Юпитер</button>
          </div>

          <div class="toolbar-group">
            <span class="toolbar-title">Режим курсора:</span>
            <button class="pill-btn-sm active" data-mode="fling">✋ Хватать & Бросать</button>
            <button class="pill-btn-sm" data-mode="repel">💨 Отталкивать</button>
            <button class="pill-btn-sm" data-mode="attract">🧲 Притягивать</button>
          </div>

          <div class="toolbar-group toolbar-actions">
            <button class="btn btn-secondary btn-sm" id="spawnBeansBtn">
              <span>☕ +10 Кофе-бобов</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="spawnDukeBtn">
              <span>🐧 Спавн Duke</span>
            </button>
            <button class="btn btn-outline-danger btn-sm" id="clearPhysicsBtn">
              <span>🧹 Очистить</span>
            </button>
          </div>
        </div>

        <div class="canvas-container" id="physicsCanvasContainer">
          <canvas id="physicsCanvas"></canvas>
          <div class="physics-overlay-hint">Кликайте или бросайте эмодзи!</div>
        </div>
      </div>
    `;
  }

  setupCanvas() {
    this.canvas = this.container.querySelector('#physicsCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    const width = parent.clientWidth || 800;
    const height = Math.max(parent.clientHeight || 480, 420);

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.width = width;
    this.height = height;
  }

  preloadEmojis() {
    Object.entries(SVG_EMOJIS).forEach(([key, item]) => {
      this.createImageFromSvg(key, item.svg);
    });
  }

  createImageFromSvg(key, svgString) {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    this.cachedImages.set(key, img);
    return img;
  }

  spawnInitialSet() {
    const keys = Object.keys(SVG_EMOJIS);
    for (let i = 0; i < 12; i++) {
      const key = keys[i % keys.length];
      const x = 60 + Math.random() * (this.width - 120);
      const y = 40 + Math.random() * 120;
      this.addParticle(x, y, key);
    }
  }

  addParticle(x, y, emojiKey, customImg = null, radius = 32) {
    const vx = (Math.random() - 0.5) * 8;
    const vy = (Math.random() - 0.5) * 4;

    this.particles.push({
      x,
      y,
      vx,
      vy,
      radius: radius || (28 + Math.random() * 12),
      mass: (radius || 30) / 10,
      angle: (Math.random() - 0.5) * 0.5,
      vAngular: (Math.random() - 0.5) * 0.08,
      emojiKey,
      customImg,
      squashX: 1,
      squashY: 1
    });

    if (this.particles.length > 55) {
      this.particles.shift(); // keep performance smooth
    }
  }

  addCustomSvgParticle(svgString) {
    const tempKey = `custom_${Date.now()}`;
    const img = this.createImageFromSvg(tempKey, svgString);
    const x = this.width / 2 + (Math.random() - 0.5) * 60;
    const y = 50;
    this.addParticle(x, y, tempKey, img, 38);
  }

  bindEvents() {
    // Gravity buttons
    this.container.querySelectorAll('[data-gravity]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('[data-gravity]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.gravity = parseFloat(btn.dataset.gravity);
        sound.playClick();
      });
    });

    // Mode buttons
    this.container.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.cursorMode = btn.dataset.mode;
        sound.playClick();
      });
    });

    // Clear
    this.container.querySelector('#clearPhysicsBtn').addEventListener('click', () => {
      this.particles = [];
      sound.playPop(300);
    });

    // Spawn Beans
    this.container.querySelector('#spawnBeansBtn').addEventListener('click', () => {
      sound.playCoin();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          this.addParticle(
            this.width / 2 + (Math.random() - 0.5) * 140,
            30,
            'coffee-bean',
            null,
            24
          );
          sound.playBounce(0.3);
        }, i * 60);
      }
    });

    // Spawn Duke
    this.container.querySelector('#spawnDukeBtn').addEventListener('click', () => {
      sound.playPowerUp();
      this.addParticle(this.width / 2, 60, 'duke', null, 46);
    });

    // Canvas Pointer Events
    const getPos = e => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    this.canvas.addEventListener('mousedown', e => {
      const pos = getPos(e);
      this.mouse.isDown = true;
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
      this.mouse.prevX = pos.x;
      this.mouse.prevY = pos.y;

      // Find clicked particle
      if (this.cursorMode === 'fling') {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          const dist = Math.hypot(p.x - pos.x, p.y - pos.y);
          if (dist <= p.radius * 1.2) {
            this.selectedParticle = p;
            this.dragOffset.x = p.x - pos.x;
            this.dragOffset.y = p.y - pos.y;
            sound.playPop(700);
            return;
          }
        }

        // Otherwise spawn random emoji at click point
        const keys = Object.keys(SVG_EMOJIS);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.addParticle(pos.x, pos.y, randomKey);
        sound.playPop(850);
      }
    });

    window.addEventListener('mousemove', e => {
      if (!this.canvas) return;
      const pos = getPos(e);
      this.mouse.vx = pos.x - this.mouse.x;
      this.mouse.vy = pos.y - this.mouse.y;
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;

      if (this.selectedParticle && this.mouse.isDown) {
        this.selectedParticle.x = pos.x + this.dragOffset.x;
        this.selectedParticle.y = pos.y + this.dragOffset.y;
        this.selectedParticle.vx = this.mouse.vx * 0.8;
        this.selectedParticle.vy = this.mouse.vy * 0.8;
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.selectedParticle) {
        this.selectedParticle.vx = Math.max(-25, Math.min(25, this.mouse.vx * 1.2));
        this.selectedParticle.vy = Math.max(-25, Math.min(25, this.mouse.vy * 1.2));
        sound.playBounce(0.5);
      }
      this.selectedParticle = null;
      this.mouse.isDown = false;
    });

    // Touch support
    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const pos = { x: t.clientX - rect.left, y: t.clientY - rect.top };
      this.mouse.isDown = true;
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        if (Math.hypot(p.x - pos.x, p.y - pos.y) <= p.radius * 1.3) {
          this.selectedParticle = p;
          this.dragOffset.x = p.x - pos.x;
          this.dragOffset.y = p.y - pos.y;
          sound.playPop(700);
          return;
        }
      }

      const keys = Object.keys(SVG_EMOJIS);
      this.addParticle(pos.x, pos.y, keys[Math.floor(Math.random() * keys.length)]);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const pos = { x: t.clientX - rect.left, y: t.clientY - rect.top };
      this.mouse.vx = pos.x - this.mouse.x;
      this.mouse.vy = pos.y - this.mouse.y;
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;

      if (this.selectedParticle) {
        this.selectedParticle.x = pos.x + this.dragOffset.x;
        this.selectedParticle.y = pos.y + this.dragOffset.y;
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      if (this.selectedParticle) {
        this.selectedParticle.vx = this.mouse.vx || 0;
        this.selectedParticle.vy = this.mouse.vy || 0;
      }
      this.selectedParticle = null;
      this.mouse.isDown = false;
    });
  }

  updatePhysics() {
    const w = this.width;
    const h = this.height;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // If dragged by hand, skip gravity
      if (p === this.selectedParticle) continue;

      // Gravity
      p.vy += this.gravity;

      // Friction
      p.vx *= this.friction;
      p.vy *= this.friction;
      p.vAngular *= 0.98;

      // Repel / Attract Modes
      if (this.mouse.isDown && (this.cursorMode === 'repel' || this.cursorMode === 'attract')) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        const maxDist = 260;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * (this.cursorMode === 'repel' ? 1.6 : -1.6);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngular;

      // Wall Collisions
      // Floor
      if (p.y + p.radius > h) {
        p.y = h - p.radius;
        if (Math.abs(p.vy) > 2) {
          sound.playBounce(Math.abs(p.vy) / 12);
        }
        p.vy = -p.vy * this.bounciness;
        p.vx *= 0.94;
        p.vAngular = p.vx * 0.04;
      }
      // Ceiling
      if (p.y - p.radius < 0) {
        p.y = p.radius;
        p.vy = -p.vy * this.bounciness;
      }
      // Right wall
      if (p.x + p.radius > w) {
        p.x = w - p.radius;
        p.vx = -p.vx * this.bounciness;
        sound.playBounce(Math.abs(p.vx) / 12);
      }
      // Left wall
      if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx = -p.vx * this.bounciness;
        sound.playBounce(Math.abs(p.vx) / 12);
      }

      // Particle-to-particle collisions
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.hypot(dx, dy);
        const minDist = p.radius + p2.radius;

        if (dist < minDist && dist > 0) {
          // Normal vector
          const nx = dx / dist;
          const ny = dy / dist;

          // Separate overlap
          const overlap = (minDist - dist) * 0.5;
          p.x -= nx * overlap;
          p.y -= ny * overlap;
          p2.x += nx * overlap;
          p2.y += ny * overlap;

          // Relative velocity
          const kx = p.vx - p2.vx;
          const ky = p.vy - p2.vy;
          const pSpeed = 2 * (nx * kx + ny * ky) / (p.mass + p2.mass);

          p.vx -= pSpeed * p2.mass * nx * this.bounciness;
          p.vy -= pSpeed * p2.mass * ny * this.bounciness;
          p2.vx += pSpeed * p.mass * nx * this.bounciness;
          p2.vy += pSpeed * p.mass * ny * this.bounciness;

          p.vAngular = (Math.random() - 0.5) * 0.05;
          p2.vAngular = (Math.random() - 0.5) * 0.05;

          if (Math.abs(pSpeed) > 3) {
            sound.playBounce(Math.min(Math.abs(pSpeed) / 10, 0.6));
          }
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw subtle grid
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Draw cursor aura if repel/attract
    if (this.mouse.isDown && (this.cursorMode === 'repel' || this.cursorMode === 'attract')) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 160, 0, Math.PI * 2);
      this.ctx.fillStyle = this.cursorMode === 'repel' 
        ? 'rgba(239, 68, 68, 0.12)' 
        : 'rgba(56, 189, 248, 0.12)';
      this.ctx.strokeStyle = this.cursorMode === 'repel' ? '#EF4444' : '#38BDF8';
      this.ctx.setLineDash([6, 6]);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.restore();
    }

    // Draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const img = p.customImg || this.cachedImages.get(p.emojiKey);

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);

      // Shadow under emoji
      this.ctx.beginPath();
      this.ctx.ellipse(0, p.radius * 0.9, p.radius * 0.75, p.radius * 0.25, 0, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      this.ctx.fill();

      if (img && img.complete) {
        const d = p.radius * 2;
        this.ctx.drawImage(img, -p.radius, -p.radius, d, d);
      } else {
        // Fallback circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#F59E0B';
        this.ctx.fill();
      }

      this.ctx.restore();
    }
  }

  startLoop() {
    const loop = (time) => {
      this.updatePhysics();
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }
}
