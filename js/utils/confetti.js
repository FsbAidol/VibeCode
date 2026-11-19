/**
 * Particle & SVG Emoji Blast Engine
 */

export function triggerEmojiConfetti(x, y, emojiList = ['☕', '⚡', '🚀', '✨', '🔥', '🎉']) {
  const container = document.body;
  const count = 28;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-emoji-particle';
    const chosen = emojiList[Math.floor(Math.random() * emojiList.length)];
    el.textContent = chosen;

    const angle = Math.random() * Math.PI * 2;
    const velocity = 80 + Math.random() * 220;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 100;
    const rot = (Math.random() - 0.5) * 720;
    const scale = 0.8 + Math.random() * 0.8;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--vx', `${vx}px`);
    el.style.setProperty('--vy', `${vy}px`);
    el.style.setProperty('--rot', `${rot}deg`);
    el.style.setProperty('--scale', scale);

    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1200);
  }
}

export function triggerCelebration() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  triggerEmojiConfetti(width * 0.2, height * 0.5, ['☕', '🚀', '🔥', '⭐']);
  triggerEmojiConfetti(width * 0.8, height * 0.5, ['🎉', '✨', '💯', '👾']);
  triggerEmojiConfetti(width * 0.5, height * 0.3, ['❤️', '☕', '🌟', '🚀']);
}
