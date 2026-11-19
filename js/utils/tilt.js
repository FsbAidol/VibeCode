/**
 * 3D Card Tilt with Specular Glare & Smooth Interpolation
 */

export function init3DTilt(selector = '.tilt-card') {
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    let bounds;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let rafId = null;

    // Create glare overlay if not present
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    function onMouseEnter(e) {
      isHovering = true;
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease-out';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      mouseX = x / bounds.width - 0.5;
      mouseY = y / bounds.height - 0.5;

      const tiltX = (mouseY * -14).toFixed(2);
      const tiltY = (mouseX * 14).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
      
      const glareX = (x / bounds.width) * 100;
      const glareY = (y / bounds.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`;
      glare.style.opacity = '1';
    }

    function onMouseLeave() {
      isHovering = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease-out';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}
