/**
 * 3D Graphics Universe (Three.js WebGL Engine)
 * High-performance 3D scene with interactive Coffee Mug, orbiting beans, crystal hologram, and particles
 */

import * as THREE from '../libs/three.module.js';
import { sound } from '../audio.js';

export class Scene3D {
  constructor(containerEl) {
    this.container = containerEl;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animId = null;

    // Groups
    this.mainGroup = null;
    this.coffeeGroup = null;
    this.crystalGroup = null;
    this.starfieldGroup = null;
    this.steamParticles = null;
    this.beans = [];

    // State
    this.currentMode = 'coffee'; // 'coffee' | 'crystal' | 'starfield'
    this.isWireframe = false;
    this.isAutoRotate = true;
    this.rotateSpeed = 0.008;

    // Interaction
    this.isDragging = false;
    this.prevMouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0.2, y: 0.4 };
    this.currentRotation = { x: 0.2, y: 0.4 };

    this.init();
  }

  init() {
    this.renderLayout();
    this.setupThreeScene();
    this.createCoffeeScene();
    this.createCrystalScene();
    this.createStarfieldScene();
    this.bindEvents();
    this.switchMode('coffee');
    this.animate();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="scene3d-panel">
        <div class="scene3d-toolbar">
          <div class="toolbar-group">
            <span class="toolbar-title">3D Сцена:</span>
            <button class="pill-btn-sm active" data-3dmode="coffee">☕ 3D Java Кружка</button>
            <button class="pill-btn-sm" data-3dmode="crystal">💎 3D Кристалл-Голограмма</button>
            <button class="pill-btn-sm" data-3dmode="starfield">🌌 Гипер-Варп</button>
          </div>

          <div class="toolbar-group">
            <button class="btn btn-secondary btn-sm" id="toggleWireframeBtn">
              <span>🕸️ Сетка: Выкл</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="toggleAutoSpinBtn">
              <span>🔄 Вращение: Вкл</span>
            </button>
            <button class="btn btn-secondary btn-sm" id="reset3DCameraBtn">
              <span>🎯 Центрировать</span>
            </button>
          </div>
        </div>

        <div class="canvas-3d-wrapper" id="canvas3DWrapper">
          <canvas id="threeCanvas"></canvas>
          <div class="canvas-3d-hint">Управляйте сценой: зажмите ЛКМ и крутите в 360°</div>
        </div>
      </div>
    `;
  }

  setupThreeScene() {
    const canvas = this.container.querySelector('#threeCanvas');
    const wrapper = this.container.querySelector('#canvas3DWrapper');

    const width = wrapper.clientWidth || 800;
    const height = Math.max(wrapper.clientHeight || 460, 420);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 3, 10);
    this.camera.lookAt(0, 0, 0);

    // Renderer with antialias and alpha for glassmorphic transparency
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    dirLight.position.set(5, 10, 7);
    this.scene.add(dirLight);

    // Colored accent point lights
    this.cyanLight = new THREE.PointLight(0x00F0FF, 3.5, 20);
    this.cyanLight.position.set(-6, 4, 3);
    this.scene.add(this.cyanLight);

    this.amberLight = new THREE.PointLight(0xF59E0B, 4.0, 20);
    this.amberLight.position.set(6, -2, 4);
    this.scene.add(this.amberLight);

    // Main group container
    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  /* ================= 3D JAVA COFFEE SCENE ================= */

  createCoffeeScene() {
    this.coffeeGroup = new THREE.Group();

    // Ceramic Cup Material
    const cupMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      roughness: 0.25,
      metalness: 0.1
    });

    // Outer Mug Body (Cylinder)
    const cupGeo = new THREE.CylinderGeometry(1.6, 1.3, 2.8, 36);
    const cupMesh = new THREE.Mesh(cupGeo, cupMat);
    cupMesh.position.y = 0;
    this.coffeeGroup.add(cupMesh);

    // Cup Rim Ring
    const rimGeo = new THREE.TorusGeometry(1.6, 0.08, 16, 36);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, cupMat);
    rimMesh.position.y = 1.4;
    this.coffeeGroup.add(rimMesh);

    // Inner Coffee Liquid Surface
    const liquidGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 36);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x451A03,
      roughness: 0.15,
      metalness: 0.4
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 1.15;
    this.coffeeGroup.add(liquidMesh);

    // Java Red Ribbon Band on Cup
    const bandGeo = new THREE.CylinderGeometry(1.61, 1.48, 0.55, 36);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xDC2626,
      roughness: 0.3,
      metalness: 0.2
    });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    bandMesh.position.y = 0.2;
    this.coffeeGroup.add(bandMesh);

    // Cup Handle (Torus)
    const handleGeo = new THREE.TorusGeometry(0.85, 0.2, 16, 32, Math.PI * 1.1);
    const handleMesh = new THREE.Mesh(handleGeo, cupMat);
    handleMesh.position.set(1.55, 0.1, 0);
    handleMesh.rotation.z = -Math.PI / 2;
    this.coffeeGroup.add(handleMesh);

    // Saucer / Plate under cup
    const plateGeo = new THREE.CylinderGeometry(2.7, 1.8, 0.25, 40);
    const plateMesh = new THREE.Mesh(plateGeo, cupMat);
    plateMesh.position.y = -1.45;
    this.coffeeGroup.add(plateMesh);

    // 3D Steam Particles rising
    const particleCount = 60;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      steamPositions[i] = (Math.random() - 0.5) * 1.2;
      steamPositions[i + 1] = 1.4 + Math.random() * 2.5;
      steamPositions[i + 2] = (Math.random() - 0.5) * 1.2;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xF8FAFC,
      size: 0.16,
      transparent: true,
      opacity: 0.65
    });

    this.steamParticles = new THREE.Points(steamGeo, steamMat);
    this.coffeeGroup.add(this.steamParticles);

    // Orbiting 3D Roasted Coffee Beans
    const beanCount = 10;
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x78350F,
      roughness: 0.35,
      metalness: 0.1
    });

    for (let i = 0; i < beanCount; i++) {
      const beanGeo = new THREE.SphereGeometry(0.35, 16, 12);
      beanGeo.scale(1.4, 0.85, 0.95);
      const bean = new THREE.Mesh(beanGeo, beanMat);

      const angle = (i / beanCount) * Math.PI * 2;
      const radius = 3.6 + (i % 3) * 0.4;
      const height = (i % 4 - 1.5) * 0.7;

      bean.userData = {
        angle,
        radius,
        speed: 0.012 + (i % 3) * 0.005,
        height,
        rotSpeedX: 0.02 + Math.random() * 0.02,
        rotSpeedY: 0.03 + Math.random() * 0.02
      };

      bean.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      this.beans.push(bean);
      this.coffeeGroup.add(bean);
    }

    this.mainGroup.add(this.coffeeGroup);
  }

  /* ================= 3D HOLOGRAM CRYSTAL SCENE ================= */

  createCrystalScene() {
    this.crystalGroup = new THREE.Group();

    // Outer Faceted Icosahedron Crystal
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x00F0FF,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    this.crystalGroup.add(icoMesh);

    // Inner Glowing Core (Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xEC4899,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.crystalGroup.add(coreMesh);

    // Orbiting Golden Rings
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.06, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      metalness: 0.8,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    this.crystalGroup.add(ring1);

    const ring2 = new THREE.Mesh(ring1Geo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 4;
    this.crystalGroup.add(ring2);

    this.crystalGroup.userData = { ring1, ring2, coreMesh };
    this.crystalGroup.visible = false;
    this.mainGroup.add(this.crystalGroup);
  }

  /* ================= 3D STARFIELD HYPER-WARP SCENE ================= */

  createStarfieldScene() {
    this.starfieldGroup = new THREE.Group();

    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 50;
      starPositions[i + 1] = (Math.random() - 0.5) * 50;
      starPositions[i + 2] = (Math.random() - 0.5) * 50;

      // Cyan / Amber / Violet stars
      const colorType = Math.random();
      if (colorType > 0.6) {
        starColors[i] = 0; starColors[i + 1] = 0.94; starColors[i + 2] = 1.0; // Cyan
      } else if (colorType > 0.3) {
        starColors[i] = 0.96; starColors[i + 1] = 0.62; starColors[i + 2] = 0.04; // Amber
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.24; starColors[i + 2] = 0.37; // Magenta
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starMesh = new THREE.Points(starGeo, starMat);
    this.starfieldGroup.add(starMesh);

    this.starfieldGroup.userData = { starPositions, starMesh };
    this.starfieldGroup.visible = false;
    this.mainGroup.add(this.starfieldGroup);
  }

  /* ================= EVENTS & CONTROLS ================= */

  bindEvents() {
    // Mode switcher buttons
    this.container.querySelectorAll('[data-3dmode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('[data-3dmode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sound.playCoin();
        this.switchMode(btn.dataset['3dmode']);
      });
    });

    // Wireframe toggle
    const wireframeBtn = this.container.querySelector('#toggleWireframeBtn');
    wireframeBtn.addEventListener('click', () => {
      sound.playClick();
      this.isWireframe = !this.isWireframe;
      wireframeBtn.innerHTML = this.isWireframe 
        ? '<span>🕸️ Сетка: Вкл</span>' 
        : '<span>🕸️ Сетка: Выкл</span>';

      this.scene.traverse(obj => {
        if (obj.isMesh && obj.material) {
          obj.material.wireframe = this.isWireframe;
        }
      });
    });

    // Auto-spin toggle
    const autoSpinBtn = this.container.querySelector('#toggleAutoSpinBtn');
    autoSpinBtn.addEventListener('click', () => {
      sound.playClick();
      this.isAutoRotate = !this.isAutoRotate;
      autoSpinBtn.innerHTML = this.isAutoRotate 
        ? '<span>🔄 Вращение: Вкл</span>' 
        : '<span>⏸ Вращение: Пауза</span>';
    });

    // Reset camera
    this.container.querySelector('#reset3DCameraBtn').addEventListener('click', () => {
      sound.playPop(550);
      this.targetRotation = { x: 0.2, y: 0.4 };
      this.camera.position.set(0, 3, 10);
      this.camera.lookAt(0, 0, 0);
    });

    // Mouse drag rotation
    const canvas = this.container.querySelector('#threeCanvas');

    canvas.addEventListener('mousedown', e => {
      this.isDragging = true;
      this.prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', e => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      this.prevMouse = { x: e.clientX, y: e.clientY };

      this.targetRotation.y += dx * 0.008;
      this.targetRotation.x += dy * 0.008;
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch controls
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', e => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - this.prevMouse.x;
      const dy = e.touches[0].clientY - this.prevMouse.y;
      this.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      this.targetRotation.y += dx * 0.01;
      this.targetRotation.x += dy * 0.01;
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Mouse Wheel Zoom
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      this.camera.position.z = Math.max(5, Math.min(20, this.camera.position.z + e.deltaY * 0.01));
    }, { passive: false });
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.coffeeGroup.visible = (mode === 'coffee');
    this.crystalGroup.visible = (mode === 'crystal');
    this.starfieldGroup.visible = (mode === 'starfield');

    if (mode === 'starfield') {
      this.camera.position.set(0, 0, 12);
    } else {
      this.camera.position.set(0, 3, 10);
    }
    this.camera.lookAt(0, 0, 0);
  }

  onWindowResize() {
    const wrapper = this.container.querySelector('#canvas3DWrapper');
    if (!wrapper || !this.renderer || !this.camera) return;

    const width = wrapper.clientWidth;
    const height = Math.max(wrapper.clientHeight, 420);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    // Auto rotate when not actively dragging
    if (this.isAutoRotate && !this.isDragging) {
      this.targetRotation.y += this.rotateSpeed;
    }

    // Smooth rotation damping
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    this.mainGroup.rotation.x = this.currentRotation.x;
    this.mainGroup.rotation.y = this.currentRotation.y;

    // Orbit colored lights
    const time = Date.now() * 0.0015;
    this.cyanLight.position.x = Math.sin(time) * 7;
    this.cyanLight.position.z = Math.cos(time) * 7;
    this.amberLight.position.x = Math.cos(time) * 7;
    this.amberLight.position.z = -Math.sin(time) * 7;

    // Update Coffee mode animations
    if (this.currentMode === 'coffee') {
      // Orbit beans
      for (const bean of this.beans) {
        bean.userData.angle += bean.userData.speed;
        bean.position.x = Math.cos(bean.userData.angle) * bean.userData.radius;
        bean.position.z = Math.sin(bean.userData.angle) * bean.userData.radius;
        bean.rotation.x += bean.userData.rotSpeedX;
        bean.rotation.y += bean.userData.rotSpeedY;
      }

      // Steam rise
      if (this.steamParticles) {
        const positions = this.steamParticles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.02;
          if (positions[i] > 4.2) {
            positions[i] = 1.4;
          }
        }
        this.steamParticles.geometry.attributes.position.needsUpdate = true;
      }
    }

    // Update Crystal mode animations
    if (this.currentMode === 'crystal') {
      const { ring1, ring2, coreMesh } = this.crystalGroup.userData;
      if (ring1) ring1.rotation.z += 0.015;
      if (ring2) ring2.rotation.z -= 0.012;
      if (coreMesh) {
        coreMesh.rotation.x += 0.02;
        coreMesh.rotation.y += 0.03;
      }
    }

    // Update Starfield Hyper-warp mode
    if (this.currentMode === 'starfield') {
      const { starPositions, starMesh } = this.starfieldGroup.userData;
      for (let i = 2; i < starPositions.length; i += 3) {
        starPositions[i] += 0.25;
        if (starPositions[i] > 25) {
          starPositions[i] = -25;
        }
      }
      starMesh.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
