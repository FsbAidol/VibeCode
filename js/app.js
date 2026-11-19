/**
 * JavaVerse 3D Main Application Controller
 * Handles SPA navigation, theme switching, widgets orchestration, and sound effects
 */

import { sound } from './audio.js';
import { SVG_EMOJIS } from './emoji-data.js';
import { EmojiStudio } from './widgets/emoji-studio.js';
import { EmojiPhysicsSandbox } from './widgets/physics.js';
import { Scene3D } from './widgets/scene-3d.js';
import { JavaRunner } from './widgets/java-runner.js';
import { LoFiPlayer } from './widgets/lofi-player.js';
import { PomodoroTimer } from './widgets/pomodoro.js';
import { WeatherClock } from './widgets/weather-clock.js';
import { BeanCatcherGame } from './widgets/bean-catcher.js';
import { NotesWidget } from './widgets/notes.js';
import { triggerCelebration, triggerEmojiConfetti } from './utils/confetti.js';
import { init3DTilt } from './utils/tilt.js';

// Expose globals for the interactive terminal & user scripts
window.soundEngine = sound;
window.javaverseSound = sound;
window.triggerCelebration = triggerCelebration;
window.triggerEmojiConfetti = triggerEmojiConfetti;

class App {
  constructor() {
    this.currentTheme = 'cyber';
    this.currentTab = 'scene3dTab';
    this.scene3DInstance = null;
    this.physicsInstance = null;
    this.studioInstance = null;
    this.javaRunnerInstance = null;
    this.loFiInstance = null;
    this.pomodoroInstance = null;
    this.weatherInstance = null;
    this.gameInstance = null;
    this.notesInstance = null;

    this.init();
  }

  init() {
    this.initTheme();
    this.renderHeaderAndNav();
    this.initSoundToggle();
    this.initTabs();
    this.initWidgets();
    this.initGlobalInteractions();
    init3DTilt('.tilt-card');
  }

  /* ================= THEME MANAGEMENT ================= */

  initTheme() {
    const savedTheme = localStorage.getItem('javaverse_theme') || 'cyber';
    this.setTheme(savedTheme);

    const themeSelect = document.getElementById('themeSelector');
    if (themeSelect) {
      themeSelect.value = savedTheme;
      themeSelect.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
        sound.playPop(600);
      });
    }
  }

  setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    this.currentTheme = themeName;
    try {
      localStorage.setItem('javaverse_theme', themeName);
    } catch (e) {}
  }

  /* ================= HEADER & NAV ================= */

  renderHeaderAndNav() {
    // Duke mascot in header
    const dukeBox = document.getElementById('headerDukeLogo');
    if (dukeBox && SVG_EMOJIS['duke']) {
      dukeBox.innerHTML = SVG_EMOJIS['duke'].svg;
      dukeBox.addEventListener('click', (e) => {
        sound.playPowerUp();
        const rect = dukeBox.getBoundingClientRect();
        triggerEmojiConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, ['☕', '🐧', '⚡', '🎉']);
      });
    }

    // Steaming coffee logo
    const coffeeIcon = document.getElementById('headerCoffeeIcon');
    if (coffeeIcon && SVG_EMOJIS['java-coffee']) {
      coffeeIcon.innerHTML = SVG_EMOJIS['java-coffee'].svg;
    }

    // Emoji Cannon button in header
    const cannonBtn = document.getElementById('emojiCannonBtn');
    if (cannonBtn) {
      cannonBtn.addEventListener('click', (e) => {
        sound.playCoin();
        const rect = cannonBtn.getBoundingClientRect();
        triggerEmojiConfetti(rect.left + rect.width / 2, rect.top + rect.height, ['🚀', '☕', '🔥', '✨', '⚡', '🎉']);
      });
    }
  }

  /* ================= SOUND TOGGLE ================= */

  initSoundToggle() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (!soundBtn) return;

    const updateLabel = (muted) => {
      soundBtn.innerHTML = muted 
        ? '<span class="icon">🔇</span><span>Звук: Выкл</span>' 
        : '<span class="icon">🔊</span><span>Звук: Вкл</span>';
      soundBtn.classList.toggle('muted', muted);
    };

    updateLabel(sound.isMuted);

    soundBtn.addEventListener('click', () => {
      const muted = sound.toggleMute();
      updateLabel(muted);
      if (!muted) sound.playClick();
    });
  }

  /* ================= TAB NAVIGATION ================= */

  initTabs() {
    const navTabs = document.querySelectorAll('.nav-tab-item');
    const tabPanes = document.querySelectorAll('.tab-view-pane');
    const activePill = document.querySelector('.tab-active-pill');

    const updatePill = (targetTab) => {
      if (!activePill || !targetTab) return;
      const rect = targetTab.getBoundingClientRect();
      const parentRect = targetTab.parentElement.getBoundingClientRect();
      activePill.style.width = `${rect.width}px`;
      activePill.style.left = `${rect.left - parentRect.left}px`;
    };

    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        if (targetId === this.currentTab) return;

        sound.playClick();
        this.currentTab = targetId;

        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updatePill(tab);

        tabPanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active');
            pane.style.opacity = '0';
            pane.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              pane.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
              pane.style.opacity = '1';
              pane.style.transform = 'translateY(0)';
            });
          } else {
            pane.classList.remove('active');
          }
        });

        // Trigger resizes on canvas widgets when tabs become visible
        if (targetId === 'scene3dTab' && this.scene3DInstance) {
          setTimeout(() => this.scene3DInstance.onWindowResize(), 50);
        }
        if (targetId === 'physicsTab' && this.physicsInstance) {
          setTimeout(() => this.physicsInstance.resizeCanvas(), 50);
        }
        if (targetId === 'gameTab' && this.gameInstance) {
          setTimeout(() => this.gameInstance.resizeCanvas(), 50);
        }
      });
    });

    const initialActive = document.querySelector('.nav-tab-item.active');
    if (initialActive) {
      setTimeout(() => updatePill(initialActive), 80);
      window.addEventListener('resize', () => {
        const curr = document.querySelector('.nav-tab-item.active');
        if (curr) updatePill(curr);
      });
    }
  }

  /* ================= WIDGETS INITIALIZATION ================= */

  initWidgets() {
    // 0. 3D WebGL Graphics Universe (Three.js)
    const scene3dBox = document.getElementById('scene3dWidgetContainer');
    if (scene3dBox) {
      this.scene3DInstance = new Scene3D(scene3dBox);
    }

    // 1. Physics Sandbox
    const physicsBox = document.getElementById('physicsWidgetContainer');
    if (physicsBox) {
      this.physicsInstance = new EmojiPhysicsSandbox(physicsBox);
    }

    // 2. SVG Emoji Studio
    const studioBox = document.getElementById('studioWidgetContainer');
    if (studioBox) {
      this.studioInstance = new EmojiStudio(studioBox, (customSvg) => {
        // Switch to physics tab and inject emoji
        if (this.physicsInstance) {
          this.physicsInstance.addCustomSvgParticle(customSvg);
          const physicsTabBtn = document.querySelector('[data-target="physicsTab"]');
          if (physicsTabBtn) physicsTabBtn.click();
        }
      });
    }

    // 3. Java & JS Runner
    const runnerBox = document.getElementById('runnerWidgetContainer');
    if (runnerBox) {
      this.javaRunnerInstance = new JavaRunner(runnerBox);
    }

    // 4. Lo-Fi Beats & Synthesizer Station
    const lofiBox = document.getElementById('lofiWidgetContainer');
    if (lofiBox) {
      this.loFiInstance = new LoFiPlayer(lofiBox);
    }

    // 5. Pomodoro Timer
    const pomodoroBox = document.getElementById('pomodoroWidgetContainer');
    if (pomodoroBox) {
      this.pomodoroInstance = new PomodoroTimer(pomodoroBox);
    }

    // 6. Weather & Clock
    const weatherBox = document.getElementById('weatherWidgetContainer');
    if (weatherBox) {
      this.weatherInstance = new WeatherClock(weatherBox);
    }

    // 7. Java Bean Catcher Game
    const gameBox = document.getElementById('gameWidgetContainer');
    if (gameBox) {
      this.gameInstance = new BeanCatcherGame(gameBox);
    }

    // 8. Notes & Kanban Scratchpad
    const notesBox = document.getElementById('notesWidgetContainer');
    if (notesBox) {
      this.notesInstance = new NotesWidget(notesBox);
    }

    // 9. Soundboard FX buttons
    this.initSoundboard();
  }

  /* ================= SOUNDBOARD FX ================= */

  initSoundboard() {
    const soundButtons = document.querySelectorAll('[data-sound]');
    soundButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.dataset.sound;
        if (type === 'coin') sound.playCoin();
        else if (type === 'laser') sound.playLaser();
        else if (type === 'powerup') sound.playPowerUp();
        else if (type === 'pop') sound.playPop(650);
        else if (type === 'chime') sound.playChime();
        else if (type === 'buzzer') sound.playJavaBuzzer();
        else sound.playClick();

        const rect = btn.getBoundingClientRect();
        triggerEmojiConfetti(rect.left + rect.width / 2, rect.top, ['🎵', '✨', '⚡']);
      });
    });
  }

  /* ================= GLOBAL INTERACTIONS ================= */

  initGlobalInteractions() {
    // Click ripples / micro bursts
    document.addEventListener('click', (e) => {
      // First click initializes AudioContext if not started
      sound.ensureContext();
    }, { once: true });
  }
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
