/**
 * Procedural Web Audio Engine
 * Pure synthesized sound FX, Lo-Fi beats, and audio visualizer
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.analyser = null;
    this.isLoFiPlaying = false;
    this.loFiTimer = null;
    this.loFiStep = 0;
    this.bpm = 80;
    this.ambientNodes = [];
    
    // Lo-Fi Chord progressions
    this.chords = [
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [392.00, 493.88, 587.33, 698.46], // G7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00]  // Am7
    ];
    this.currentChordIndex = 0;

    // Load mute preference
    try {
      this.isMuted = localStorage.getItem('javaverse_muted') === 'true';
    } catch (e) {}
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio not supported or blocked', e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('javaverse_muted', this.isMuted);
    } catch (e) {}

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  // Quick UI click
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Playful Pop (buttons, emoji spawn)
  playPop(freq = 600) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.7, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.06);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Arcade Coin / Success
  playCoin() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.setValueAtTime(0.3, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Laser pew
  playLaser() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Level Up / Power Up
  playPowerUp() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C major arpeggio
    notes.forEach((freq, idx) => {
      const startTime = this.ctx.currentTime + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.16);
    });
  }

  // Physics bounce
  playBounce(intensity = 0.5) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const freq = 180 + Math.min(intensity, 1) * 350;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.06);

    const vol = Math.min(Math.max(intensity * 0.3, 0.05), 0.35);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Java Error Buzzer
  playJavaBuzzer() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(140, now);
    osc2.frequency.setValueAtTime(147, now); // Dissonant minor second

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.32);
    osc2.stop(now + 0.32);
  }

  // Bell chime (for Pomodoro finish)
  playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.2, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 1.3);
    });
  }

  /* ================= LO-FI PROCEDURAL MUSIC ENGINE ================= */

  // Drum Synthesizers
  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.15);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  playSnare(time) {
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }

  playHiHat(time) {
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(8000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }

  playWarmChord(freqs, time, duration = 1.6) {
    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, time);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  startLoFi() {
    this.ensureContext();
    if (this.isLoFiPlaying) return;
    this.isLoFiPlaying = true;
    this.loFiStep = 0;

    const stepInterval = (60 / this.bpm / 4) * 1000; // 16th notes

    const tick = () => {
      if (!this.isLoFiPlaying || !this.ctx) return;
      const now = this.ctx.currentTime + 0.02;

      // Hi-hat on every 2nd 16th
      if (this.loFiStep % 2 === 0) {
        this.playHiHat(now);
      }

      // Kick on 0, 10
      if (this.loFiStep === 0 || this.loFiStep === 10) {
        this.playKick(now);
      }

      // Snare on 4, 12
      if (this.loFiStep === 4 || this.loFiStep === 12) {
        this.playSnare(now);
      }

      // Warm chord on start of bar (0 and 8)
      if (this.loFiStep === 0) {
        const chord = this.chords[this.currentChordIndex];
        this.playWarmChord(chord, now, (60 / this.bpm) * 3.5);
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      }

      this.loFiStep = (this.loFiStep + 1) % 16;
      this.loFiTimer = setTimeout(tick, stepInterval);
    };

    tick();
  }

  stopLoFi() {
    this.isLoFiPlaying = false;
    if (this.loFiTimer) {
      clearTimeout(this.loFiTimer);
      this.loFiTimer = null;
    }
  }

  toggleLoFi() {
    if (this.isLoFiPlaying) {
      this.stopLoFi();
      return false;
    } else {
      this.startLoFi();
      return true;
    }
  }

  // Get live visualizer frequency data
  getVisualizerData() {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

export const sound = new SoundEngine();
