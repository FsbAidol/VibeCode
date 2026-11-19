/**
 * Java Bean Catcher Mini-Game
 * Catch falling coffee beans & SVG emojis with a Java Mug!
 */

import { sound } from '../audio.js';
import { triggerEmojiConfetti } from '../utils/confetti.js';

export class BeanCatcherGame {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.isPlaying = false;
    this.score = 0;
    this.highScore = 0;
    this.lives = 3;
    this.caffeine = 0; // 0 to 100
    this.basketX = 200;
    this.basketWidth = 80;
    this.basketHeight = 45;
    this.items = [];
    this.spawnTimer = 0;
    this.keys = {};

    try {
      this.highScore = parseInt(localStorage.getItem('vibecode_game_high') || '0', 10);
    } catch (e) {}

    this.init();
  }

  init() {
    this.renderLayout();
    this.setupCanvas();
    this.bindEvents();
    this.drawStartScreen();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="game-card">
        <div class="game-hud">
          <div class="hud-stat">
            <span class="hud-label">Счёт:</span>
            <span class="hud-value" id="gameScore">0</span>
          </div>
          <div class="hud-stat">
            <span class="hud-label">Рекорд:</span>
            <span class="hud-value" id="gameHighScore">${this.highScore}</span>
          </div>
          <div class="hud-stat">
            <span class="hud-label">Жизни:</span>
            <span class="hud-value" id="gameLives">❤️❤️❤️</span>
          </div>
          <div class="hud-stat caffeine-meter-box">
            <span class="hud-label">Кофеин:</span>
            <div class="caffeine-bar">
              <div class="caffeine-fill" id="caffeineFill" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <div class="game-canvas-wrapper">
          <canvas id="gameCanvas"></canvas>
          <div class="game-start-overlay" id="gameStartOverlay">
            <div class="overlay-content">
              <h3>☕ Ловец Зёрен Java</h3>
              <p>Управляйте кружкой мышью или стрелками. Ловите бобы и звёзды, избегайте багов!</p>
              <button class="btn btn-primary" id="startGameBtn">
                <span>▶ Начать Игру</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupCanvas() {
    this.canvas = this.container.querySelector('#gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    const width = parent.clientWidth || 600;
    const height = 360;

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.width = width;
    this.height = height;
    this.basketX = width / 2 - this.basketWidth / 2;
  }

  bindEvents() {
    const startBtn = this.container.querySelector('#startGameBtn');
    startBtn.addEventListener('click', () => {
      this.startGame();
    });

    // Mouse movement
    this.canvas.addEventListener('mousemove', e => {
      if (!this.isPlaying) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.basketX = Math.max(10, Math.min(this.width - this.basketWidth - 10, mouseX - this.basketWidth / 2));
    });

    // Touch
    this.canvas.addEventListener('touchmove', e => {
      if (!this.isPlaying) return;
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      this.basketX = Math.max(10, Math.min(this.width - this.basketWidth - 10, touchX - this.basketWidth / 2));
    }, { passive: false });

    // Keyboard
    window.addEventListener('keydown', e => {
      this.keys[e.key] = true;
    });
    window.addEventListener('keyup', e => {
      this.keys[e.key] = false;
    });
  }

  startGame() {
    sound.playPowerUp();
    this.score = 0;
    this.lives = 3;
    this.caffeine = 0;
    this.items = [];
    this.isPlaying = true;
    this.container.querySelector('#gameStartOverlay').style.display = 'none';
    this.updateHud();

    if (this.animId) cancelAnimationFrame(this.animId);
    this.loop();
  }

  updateHud() {
    this.container.querySelector('#gameScore').textContent = this.score;
    this.container.querySelector('#gameHighScore').textContent = this.highScore;

    let hearts = '';
    for (let i = 0; i < this.lives; i++) hearts += '❤️';
    for (let i = this.lives; i < 3; i++) hearts += '🖤';
    this.container.querySelector('#gameLives').textContent = hearts;

    const fill = this.container.querySelector('#caffeineFill');
    fill.style.width = `${Math.min(this.caffeine, 100)}%`;
  }

  spawnItem() {
    const types = [
      { type: 'bean', symbol: '☕', points: 10, color: '#D97706', speed: 3.5, size: 28 },
      { type: 'bean', symbol: '☕', points: 10, color: '#D97706', speed: 3.8, size: 28 },
      { type: 'star', symbol: '⭐', points: 25, color: '#FBBF24', speed: 4.2, size: 30 },
      { type: 'fire', symbol: '🔥', points: 30, color: '#EF4444', speed: 4.5, size: 32 },
      { type: 'bug', symbol: '🐛', points: -20, isHazard: true, color: '#10B981', speed: 3.2, size: 30 }
    ];

    const itemTemplate = types[Math.floor(Math.random() * types.length)];
    const x = 30 + Math.random() * (this.width - 60);

    this.items.push({
      x,
      y: -20,
      ...itemTemplate,
      angle: 0,
      rotSpeed: (Math.random() - 0.5) * 0.1
    });
  }

  updateGame() {
    // Arrow keys
    if (this.keys['ArrowLeft'] || this.keys['a']) {
      this.basketX = Math.max(10, this.basketX - 9);
    }
    if (this.keys['ArrowRight'] || this.keys['d']) {
      this.basketX = Math.min(this.width - this.basketWidth - 10, this.basketX + 9);
    }

    // Spawn items
    this.spawnTimer++;
    if (this.spawnTimer % 45 === 0) {
      this.spawnItem();
    }

    const basketY = this.height - this.basketHeight - 12;

    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.y += it.speed;
      it.angle += it.rotSpeed;

      // Check collision with basket
      if (
        it.y + it.size / 2 >= basketY &&
        it.y - it.size / 2 <= basketY + this.basketHeight &&
        it.x >= this.basketX - 10 &&
        it.x <= this.basketX + this.basketWidth + 10
      ) {
        // Caught!
        if (it.isHazard) {
          // Bug caught!
          sound.playJavaBuzzer();
          this.lives--;
          this.caffeine = Math.max(0, this.caffeine - 20);
          if (this.lives <= 0) {
            this.gameOver();
            return;
          }
        } else {
          // Point scored
          sound.playCoin();
          this.score += it.points;
          this.caffeine += 8;

          if (this.caffeine >= 100) {
            // Caffeine rush!
            sound.playPowerUp();
            this.score += 50;
            this.caffeine = 0;
            const rect = this.canvas.getBoundingClientRect();
            triggerEmojiConfetti(rect.left + this.basketX, rect.top + basketY, ['⚡', '☕', '🚀', '🔥']);
          }

          if (this.score > this.highScore) {
            this.highScore = this.score;
            try {
              localStorage.setItem('vibecode_game_high', this.highScore);
            } catch (e) {}
          }
        }

        this.updateHud();
        this.items.splice(i, 1);
        continue;
      }

      // Fell off bottom
      if (it.y > this.height + 30) {
        this.items.splice(i, 1);
      }
    }
  }

  drawGame() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Background gradient / subtle grid
    const bgGrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
    bgGrad.addColorStop(1, 'rgba(30, 41, 59, 0.6)');
    this.ctx.fillStyle = bgGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw falling items
    this.ctx.font = '26px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    for (const it of this.items) {
      this.ctx.save();
      this.ctx.translate(it.x, it.y);
      this.ctx.rotate(it.angle);

      // Glow circle
      this.ctx.beginPath();
      this.ctx.arc(0, 0, it.size * 0.7, 0, Math.PI * 2);
      this.ctx.fillStyle = it.isHazard ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)';
      this.ctx.fill();

      this.ctx.fillText(it.symbol, 0, 2);
      this.ctx.restore();
    }

    // Draw basket (Java Cup)
    const bx = this.basketX;
    const by = this.height - this.basketHeight - 12;
    const bw = this.basketWidth;
    const bh = this.basketHeight;

    // Cup Shadow
    this.ctx.beginPath();
    this.ctx.ellipse(bx + bw / 2, by + bh + 4, bw * 0.45, 6, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    this.ctx.fill();

    // Cup Handle
    this.ctx.beginPath();
    this.ctx.arc(bx + bw - 6, by + bh * 0.5, 14, -Math.PI * 0.4, Math.PI * 0.6);
    this.ctx.strokeStyle = '#CBD5E1';
    this.ctx.lineWidth = 6;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Cup Body
    this.ctx.fillStyle = '#E2E8F0';
    this.ctx.beginPath();
    this.ctx.roundRect(bx, by, bw - 12, bh, [4, 4, 18, 18]);
    this.ctx.fill();

    // Java Red Ribbon Band
    this.ctx.fillStyle = '#EF4444';
    this.ctx.fillRect(bx, by + 16, bw - 12, 10);

    // Inner Coffee Rim
    this.ctx.fillStyle = '#78350F';
    this.ctx.beginPath();
    this.ctx.ellipse(bx + (bw - 12) / 2, by + 6, (bw - 18) / 2, 6, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Steam particles over mug
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.lineWidth = 2.5;
    this.ctx.lineCap = 'round';
    const now = Date.now() * 0.005;
    const sx = bx + (bw - 12) / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(sx - 8, by - 2);
    this.ctx.quadraticCurveTo(sx - 12 + Math.sin(now) * 4, by - 12, sx - 8, by - 20);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(sx + 8, by - 2);
    this.ctx.quadraticCurveTo(sx + 12 + Math.cos(now) * 4, by - 14, sx + 8, by - 24);
    this.ctx.stroke();
  }

  loop() {
    if (!this.isPlaying) return;
    this.updateGame();
    this.drawGame();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  gameOver() {
    this.isPlaying = false;
    sound.playJavaBuzzer();
    const overlay = this.container.querySelector('#gameStartOverlay');
    overlay.style.display = 'flex';
    overlay.querySelector('h3').textContent = '💀 Game Over!';
    overlay.querySelector('p').textContent = `Ваш счёт: ${this.score} очков. Рекорд: ${this.highScore}`;
    overlay.querySelector('button span').textContent = '🔄 Играть Снова';
  }

  drawStartScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
