/**
 * Pomodoro Focus Timer with Circular SVG Progress Ring
 */

import { sound } from '../audio.js';
import { triggerCelebration } from '../utils/confetti.js';

export class PomodoroTimer {
  constructor(containerEl) {
    this.container = containerEl;
    this.totalSeconds = 25 * 60;
    this.remainingSeconds = 25 * 60;
    this.isRunning = false;
    this.intervalId = null;
    this.circumference = 2 * Math.PI * 72; // r=72 => 452.389

    this.init();
  }

  init() {
    this.renderLayout();
    this.bindEvents();
    this.updateDisplay();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="pomodoro-card">
        <div class="pomodoro-header">
          <span class="pomodoro-badge">Фокус & Таймер</span>
          <div class="pomodoro-modes" id="pomodoroModes">
            <button class="pill-btn-sm active" data-mins="25">25м Фокус</button>
            <button class="pill-btn-sm" data-mins="5">5м Кофе</button>
            <button class="pill-btn-sm" data-mins="15">15м Отдых</button>
            <button class="pill-btn-sm" data-mins="1">1м Тест</button>
          </div>
        </div>

        <div class="pomodoro-ring-container">
          <svg viewBox="0 0 180 180" class="svg-ring-timer">
            <defs>
              <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00F0FF" />
                <stop offset="100%" stop-color="#8B5CF6" />
              </linearGradient>
            </defs>
            <!-- Background circle -->
            <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10" />
            <!-- Active progress ring -->
            <circle id="timerProgressRing" cx="90" cy="90" r="72" fill="none" stroke="url(#timerGrad)" stroke-width="10"
              stroke-linecap="round" stroke-dasharray="${this.circumference}" stroke-dashoffset="0"
              transform="rotate(-90 90 90)" />
          </svg>

          <div class="timer-center-text">
            <span class="timer-digits" id="timerDigits">25:00</span>
            <span class="timer-subtext" id="timerSubtext">Код в процессе...</span>
          </div>
        </div>

        <div class="pomodoro-controls">
          <button class="btn btn-primary btn-sm" id="timerToggleBtn">
            <span id="timerBtnText">▶ Старт</span>
          </button>
          <button class="btn btn-secondary btn-sm" id="timerResetBtn">
            <span>🔄 Сброс</span>
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Modes
    this.container.querySelectorAll('[data-mins]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('[data-mins]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mins = parseInt(btn.dataset.mins, 10);
        sound.playClick();
        this.setTimer(mins);
      });
    });

    // Start / Pause
    const toggleBtn = this.container.querySelector('#timerToggleBtn');
    toggleBtn.addEventListener('click', () => {
      this.toggleTimer();
    });

    // Reset
    this.container.querySelector('#timerResetBtn').addEventListener('click', () => {
      sound.playClick();
      this.resetTimer();
    });
  }

  setTimer(mins) {
    this.pauseTimer();
    this.totalSeconds = mins * 60;
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
      sound.playPop(500);
    } else {
      this.startTimer();
      sound.playCoin();
    }
  }

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    const btnText = this.container.querySelector('#timerBtnText');
    btnText.textContent = '⏸ Пауза';

    this.intervalId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDisplay();
      } else {
        this.timerComplete();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    const btnText = this.container.querySelector('#timerBtnText');
    btnText.textContent = '▶ Старт';
  }

  resetTimer() {
    this.pauseTimer();
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
  }

  timerComplete() {
    this.pauseTimer();
    sound.playChime();
    triggerCelebration();

    const subtext = this.container.querySelector('#timerSubtext');
    subtext.textContent = '🎉 Сессия завершена!';
  }

  updateDisplay() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const digits = this.container.querySelector('#timerDigits');
    digits.textContent = formatted;

    const ring = this.container.querySelector('#timerProgressRing');
    const ratio = this.remainingSeconds / this.totalSeconds;
    const offset = this.circumference * (1 - ratio);
    ring.style.strokeDashoffset = offset;

    const subtext = this.container.querySelector('#timerSubtext');
    if (this.isRunning) {
      subtext.textContent = '⚡ Поток кодинга...';
    } else {
      subtext.textContent = 'Готов к старту';
    }
  }
}
