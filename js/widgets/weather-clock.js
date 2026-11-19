/**
 * Dynamic Weather & Animated Atmosphere Widget
 * Live clock and animated SVG weather graphics
 */

import { sound } from '../audio.js';

export class WeatherClock {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentWeather = 'sunny';
    this.timezone = 'Europe/Paris';
    this.clockInterval = null;

    this.weatherGraphics = {
      sunny: {
        title: 'Ясно & Тепло',
        temp: '+24°C',
        desc: 'Идеально для прогулки и чашечки эспрессо',
        svg: `<svg viewBox="0 0 120 120" class="weather-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunCore" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FEF08A" />
              <stop offset="60%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#D97706" />
            </radialGradient>
          </defs>
          <g class="sun-rays-rotating">
            ${Array.from({ length: 8 }).map((_, i) => `
              <line x1="60" y1="12" x2="60" y2="24" stroke="#FBBF24" stroke-width="4.5" stroke-linecap="round"
                transform="rotate(${i * 45} 60 60)" />
            `).join('')}
          </g>
          <circle cx="60" cy="60" r="28" fill="url(#sunCore)" stroke="#F59E0B" stroke-width="2" />
          <circle cx="54" cy="52" r="6" fill="#FFFFFF" opacity="0.4" />
        </svg>`
      },

      rainy: {
        title: 'Уютный дождь',
        temp: '+16°C',
        desc: 'Слушайте капли и пишите код',
        svg: `<svg viewBox="0 0 120 120" class="weather-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#94A3B8" />
              <stop offset="100%" stop-color="#475569" />
            </linearGradient>
          </defs>
          <!-- Rain streaks -->
          <g class="rain-streaks">
            <line x1="38" y1="74" x2="30" y2="98" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.8" />
            <line x1="56" y1="78" x2="48" y2="104" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.8" />
            <line x1="74" y1="72" x2="66" y2="96" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.8" />
            <line x1="90" y1="76" x2="82" y2="102" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.8" />
          </g>
          <!-- Cloud -->
          <path d="M35 68 C 22 68, 14 56, 24 44 C 24 30, 42 22, 54 32 C 62 20, 84 20, 92 34 C 104 36, 108 52, 98 64 C 98 68, 35 68, 35 68 Z"
            fill="url(#cloudGrad1)" stroke="#334155" stroke-width="2" />
        </svg>`
      },

      thunder: {
        title: 'Гроза с молниями',
        temp: '+14°C',
        desc: 'Высокая энергия, заряжайтесь!',
        svg: `<svg viewBox="0 0 120 120" class="weather-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cloudDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#475569" />
              <stop offset="100%" stop-color="#1E293B" />
            </linearGradient>
          </defs>
          <path d="M35 60 C 22 60, 14 48, 24 36 C 24 22, 42 14, 54 24 C 62 12, 84 12, 92 26 C 104 28, 108 44, 98 56 C 98 60, 35 60, 35 60 Z"
            fill="url(#cloudDark)" stroke="#0F172A" stroke-width="2" />
          <!-- Animated Lightning Bolt -->
          <polygon points="62,50 48,72 60,72 46,104 74,68 62,68 76,50" fill="#FDE047" stroke="#F59E0B" stroke-width="2" class="lightning-flash" />
        </svg>`
      },

      night: {
        title: 'Звёздная ночь',
        temp: '+12°C',
        desc: 'Ночное вдохновение и тишина',
        svg: `<svg viewBox="0 0 120 120" class="weather-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="70%" stop-color="#E2E8F0" />
              <stop offset="100%" stop-color="#CBD5E1" />
            </radialGradient>
          </defs>
          <!-- Twinkling stars -->
          <circle cx="20" cy="30" r="2" fill="#FFFFFF" class="star-twinkle" />
          <circle cx="95" cy="22" r="2.5" fill="#FDE047" class="star-twinkle delay-1" />
          <circle cx="85" cy="88" r="1.8" fill="#FFFFFF" class="star-twinkle delay-2" />
          <circle cx="28" cy="85" r="2" fill="#FDE047" class="star-twinkle delay-3" />
          <!-- Crescent Moon -->
          <path d="M72 26 C 50 26, 36 44, 36 66 C 36 88, 54 102, 74 98 C 56 94, 48 76, 52 56 C 56 40, 68 30, 72 26 Z"
            fill="url(#moonGrad)" stroke="#94A3B8" stroke-width="1.5" />
          <circle cx="48" cy="58" r="3" fill="#94A3B8" opacity="0.3" />
        </svg>`
      },

      snow: {
        title: 'Пушистый снег',
        temp: '-2°C',
        desc: 'Зимняя сказка и горячий шоколад',
        svg: `<svg viewBox="0 0 120 120" class="weather-svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 58 C 22 58, 14 46, 24 34 C 24 20, 42 12, 54 22 C 62 10, 84 10, 92 24 C 104 26, 108 42, 98 54 C 98 58, 35 58, 35 58 Z"
            fill="#CBD5E1" stroke="#94A3B8" stroke-width="2" />
          <g class="snow-flakes">
            <circle cx="36" cy="74" r="3" fill="#FFFFFF" />
            <circle cx="58" cy="88" r="4" fill="#FFFFFF" />
            <circle cx="82" cy="76" r="3.5" fill="#FFFFFF" />
            <circle cx="46" cy="102" r="3" fill="#FFFFFF" />
            <circle cx="72" cy="104" r="2.5" fill="#FFFFFF" />
          </g>
        </svg>`
      }
    };

    this.init();
  }

  init() {
    this.renderLayout();
    this.bindEvents();
    this.startClock();
    this.updateWeather('sunny');
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="weather-card">
        <div class="weather-top-bar">
          <div class="clock-display">
            <div class="clock-time" id="clockTime">12:00:00</div>
            <div class="clock-date" id="clockDate">Среда, 19 ноября</div>
          </div>
          <div class="timezone-picker">
            <select class="custom-select-sm" id="timezoneSelect">
              <option value="Europe/Paris" selected>Париж (CET)</option>
              <option value="Europe/Moscow">Москва (MSK)</option>
              <option value="Asia/Tokyo">Токио (JST)</option>
              <option value="America/New_York">Нью-Йорк (EST)</option>
            </select>
          </div>
        </div>

        <div class="weather-body">
          <div class="weather-art-viewport" id="weatherArtViewport">
            <!-- Animated SVG weather inserted here -->
          </div>
          <div class="weather-info">
            <div class="weather-temp" id="weatherTemp">+24°C</div>
            <div class="weather-title" id="weatherTitle">Ясно & Тепло</div>
            <div class="weather-desc" id="weatherDesc">Идеально для прогулки и чашечки эспрессо</div>
          </div>
        </div>

        <div class="weather-switcher">
          <button class="pill-btn-sm active" data-weather="sunny">☀️ Солнечно</button>
          <button class="pill-btn-sm" data-weather="rainy">🌧️ Дождь</button>
          <button class="pill-btn-sm" data-weather="thunder">⚡ Гроза</button>
          <button class="pill-btn-sm" data-weather="night">🌙 Ночь</button>
          <button class="pill-btn-sm" data-weather="snow">❄️ Снег</button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('[data-weather]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('[data-weather]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sound.playClick();
        this.updateWeather(btn.dataset.weather);
      });
    });

    const tzSelect = this.container.querySelector('#timezoneSelect');
    tzSelect.addEventListener('change', (e) => {
      this.timezone = e.target.value;
      sound.playClick();
      this.updateClock();
    });
  }

  updateWeather(type) {
    const data = this.weatherGraphics[type] || this.weatherGraphics.sunny;
    this.currentWeather = type;

    const viewport = this.container.querySelector('#weatherArtViewport');
    const temp = this.container.querySelector('#weatherTemp');
    const title = this.container.querySelector('#weatherTitle');
    const desc = this.container.querySelector('#weatherDesc');

    viewport.innerHTML = data.svg;
    temp.textContent = data.temp;
    title.textContent = data.title;
    desc.textContent = data.desc;

    // Smooth subtle pop
    viewport.style.transform = 'scale(0.9)';
    setTimeout(() => {
      viewport.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      viewport.style.transform = 'scale(1)';
    }, 20);
  }

  startClock() {
    this.updateClock();
    this.clockInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const timeEl = this.container.querySelector('#clockTime');
    const dateEl = this.container.querySelector('#clockDate');
    if (!timeEl || !dateEl) return;

    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ru-RU', {
        timeZone: this.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const dateStr = now.toLocaleDateString('ru-RU', {
        timeZone: this.timezone,
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      timeEl.textContent = timeStr;
      dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    } catch (e) {
      console.warn('Clock format error', e);
    }
  }

  destroy() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
}
