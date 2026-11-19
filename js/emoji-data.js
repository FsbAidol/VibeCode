/**
 * SVG Emoji Library & Morphing Components
 * Pure vector SVG definitions for Duke, Java Coffee, Expressive Emojis & Studio Parts
 */

export const SVG_EMOJIS = {
  'java-coffee': {
    name: 'Java Coffee',
    category: 'java',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E2E8F0" />
          <stop offset="100%" stop-color="#94A3B8" />
        </linearGradient>
        <linearGradient id="coffeeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#78350F" />
          <stop offset="100%" stop-color="#451A03" />
        </linearGradient>
        <linearGradient id="redAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#EF4444" />
          <stop offset="100%" stop-color="#DC2626" />
        </linearGradient>
        <filter id="steamBlur">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <!-- Steam Trails -->
      <g class="steam-group" filter="url(#steamBlur)">
        <path class="steam-path steam-1" d="M38 35 C 34 26, 42 18, 36 10" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round" opacity="0.75" />
        <path class="steam-path steam-2" d="M50 34 C 45 23, 56 16, 50 6" fill="none" stroke="#F8FAFC" stroke-width="3.5" stroke-linecap="round" opacity="0.85" />
        <path class="steam-path steam-3" d="M62 35 C 66 25, 58 17, 64 8" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round" opacity="0.7" />
      </g>
      <!-- Saucer -->
      <ellipse cx="50" cy="85" rx="42" ry="9" fill="#64748B" />
      <ellipse cx="50" cy="83" rx="40" ry="8" fill="#CBD5E1" />
      <ellipse cx="50" cy="82" rx="36" ry="6" fill="#F1F5F9" />
      <!-- Cup Handle -->
      <path d="M66 48 C 84 48, 86 70, 68 73" fill="none" stroke="url(#cupGrad)" stroke-width="8" stroke-linecap="round" />
      <path d="M66 50 C 79 50, 81 68, 68 70" fill="none" stroke="#64748B" stroke-width="2.5" />
      <!-- Cup Body -->
      <path d="M22 42 L28 78 C 30 83, 70 83, 72 78 L78 42 Z" fill="url(#cupGrad)" />
      <!-- Inner Coffee Surface -->
      <ellipse cx="50" cy="42" rx="28" ry="8" fill="#CBD5E1" />
      <ellipse cx="50" cy="42.5" rx="25" ry="6.5" fill="url(#coffeeGrad)" />
      <!-- Coffee Swirl Reflection -->
      <path d="M38 41 C 45 44, 55 44, 62 41" fill="none" stroke="#D97706" stroke-width="1.8" stroke-linecap="round" opacity="0.8" />
      <!-- Java Red Wave Emblem -->
      <path d="M36 57 C 44 52, 56 65, 64 58" fill="none" stroke="url(#redAccent)" stroke-width="3.5" stroke-linecap="round" />
      <path d="M38 64 C 44 60, 56 71, 62 65" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" />
      <!-- Specular Highlight -->
      <path d="M26 46 L30 74" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.6" />
    </svg>`
  },

  'duke': {
    name: 'Java Duke',
    category: 'java',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dukeNose" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF5252" />
          <stop offset="60%" stop-color="#DC2626" />
          <stop offset="100%" stop-color="#991B1B" />
        </radialGradient>
        <linearGradient id="dukeBody" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="50%" stop-color="#F1F5F9" />
          <stop offset="100%" stop-color="#94A3B8" />
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="50" cy="92" rx="34" ry="6" fill="rgba(0,0,0,0.25)" />
      <!-- Feet -->
      <ellipse cx="38" cy="88" rx="12" ry="5" fill="#334155" />
      <ellipse cx="62" cy="88" rx="12" ry="5" fill="#334155" />
      <!-- Body Triangle (Duke shape) -->
      <path d="M50 16 C 53 16, 74 68, 74 80 C 74 87, 26 87, 26 80 C 26 68, 47 16, 50 16 Z" fill="url(#dukeBody)" stroke="#334155" stroke-width="2.5" stroke-linejoin="round" />
      <!-- Left Hand (waving) -->
      <g class="waving-hand">
        <path d="M26 58 C 15 50, 10 38, 14 32 C 18 26, 26 34, 28 46" fill="#F8FAFC" stroke="#334155" stroke-width="2" />
        <circle cx="15" cy="32" r="5" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
      </g>
      <!-- Right Arm holding coffee -->
      <path d="M72 60 C 80 62, 85 70, 78 78" fill="none" stroke="#F8FAFC" stroke-width="5" stroke-linecap="round" />
      <!-- Mini Coffee Cup held by Duke -->
      <rect x="76" y="66" width="12" height="13" rx="2" fill="#DC2626" stroke="#991B1B" stroke-width="1.2" />
      <path d="M88 69 C 91 69, 91 75, 88 75" fill="none" stroke="#DC2626" stroke-width="1.5" />
      <!-- Big Iconic Red Nose -->
      <ellipse cx="50" cy="46" rx="17" ry="14" fill="url(#dukeNose)" stroke="#7F1D1D" stroke-width="1.5" />
      <ellipse cx="46" cy="41" rx="6" ry="4" fill="#FFFFFF" opacity="0.6" />
      <!-- Expressive Eyes -->
      <ellipse cx="40" cy="30" rx="4.5" ry="6" fill="#0284C7" />
      <ellipse cx="60" cy="30" rx="4.5" ry="6" fill="#0284C7" />
      <circle cx="41.5" cy="28.5" r="2" fill="#FFFFFF" />
      <circle cx="61.5" cy="28.5" r="2" fill="#FFFFFF" />
      <!-- Cheerful Smile under nose -->
      <path d="M42 66 Q 50 73 58 66" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
    </svg>`
  },

  'sunglasses-cool': {
    name: 'Cool Sunglasses',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad1" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="60%" stop-color="#0F172A" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <!-- Base Face -->
      <circle cx="50" cy="50" r="44" fill="url(#faceGrad1)" stroke="#B45309" stroke-width="2.5" />
      <!-- Eyebrows -->
      <path d="M22 30 Q 32 25 42 30" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round" />
      <path d="M58 30 Q 68 25 78 30" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round" />
      <!-- Sunglasses Frame -->
      <path d="M16 38 Q 50 37 84 38 L82 43 Q 50 41 18 43 Z" fill="#020617" />
      <!-- Left Lens -->
      <path d="M19 40 H45 C 45 54, 38 60, 26 59 C 19 58, 17 50, 19 40 Z" fill="url(#lensGrad)" stroke="#020617" stroke-width="2" />
      <!-- Right Lens -->
      <path d="M55 40 H81 C 83 50, 81 58, 74 59 C 62 60, 55 54, 55 40 Z" fill="url(#lensGrad)" stroke="#020617" stroke-width="2" />
      <!-- Sunglasses Bridge -->
      <rect x="44" y="41" width="12" height="3" fill="#020617" rx="1.5" />
      <!-- Lens Reflections -->
      <path d="M24 43 L36 53" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" opacity="0.65" />
      <path d="M29 43 L39 51" fill="none" stroke="#F8FAFC" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
      <path d="M60 43 L72 53" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" opacity="0.65" />
      <path d="M65 43 L75 51" fill="none" stroke="#F8FAFC" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
      <!-- Sly Smirk -->
      <path d="M34 72 Q 54 82 70 70" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" />
      <path d="M70 70 C 72 68, 74 69, 73 73" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round" />
    </svg>`
  },

  'laughing-crying': {
    name: 'Joy Laugh',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad2" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
        <linearGradient id="tearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
      </defs>
      <!-- Base Face -->
      <circle cx="50" cy="50" r="44" fill="url(#faceGrad2)" stroke="#B45309" stroke-width="2.5" />
      <!-- Laughing squint eyes (rotated arches) -->
      <path d="M22 38 Q 32 26 42 38" fill="none" stroke="#78350F" stroke-width="4.5" stroke-linecap="round" />
      <path d="M58 38 Q 68 26 78 38" fill="none" stroke="#78350F" stroke-width="4.5" stroke-linecap="round" />
      <!-- Eyebrows -->
      <path d="M22 28 Q 32 20 40 26" fill="none" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" />
      <path d="M60 26 Q 68 20 78 28" fill="none" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" />
      <!-- Huge Open Laugh Mouth -->
      <path d="M26 54 Q 50 56 74 54 C 74 76, 26 76, 26 54 Z" fill="#641E16" stroke="#78350F" stroke-width="2.5" stroke-linejoin="round" />
      <!-- Upper Teeth -->
      <path d="M27 54 Q 50 56 73 54 C 72 60, 28 60, 27 54 Z" fill="#FFFFFF" />
      <!-- Tongue -->
      <path d="M38 72 C 44 65, 56 65, 62 72 Q 50 76 38 72 Z" fill="#EF4444" />
      <!-- Left Tear Stream & Drop -->
      <path d="M18 42 C 10 44, 4 52, 6 62 C 8 70, 16 72, 20 64 C 22 60, 22 46, 18 42 Z" fill="url(#tearGrad)" opacity="0.9" />
      <ellipse cx="14" cy="56" rx="2.5" ry="4" fill="#FFFFFF" opacity="0.6" />
      <!-- Right Tear Stream & Drop -->
      <path d="M82 42 C 90 44, 96 52, 94 62 C 92 70, 84 72, 80 64 C 78 60, 78 46, 82 42 Z" fill="url(#tearGrad)" opacity="0.9" />
      <ellipse cx="86" cy="56" rx="2.5" ry="4" fill="#FFFFFF" opacity="0.6" />
    </svg>`
  },

  'star-eyes': {
    name: 'Star Struck',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad3" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EF4444" />
          <stop offset="100%" stop-color="#9333EA" />
        </linearGradient>
      </defs>
      <!-- Base Face -->
      <circle cx="50" cy="50" r="44" fill="url(#faceGrad3)" stroke="#B45309" stroke-width="2.5" />
      <!-- Left Star Eye -->
      <polygon points="32,24 35,32 44,33 37,39 39,47 32,42 25,47 27,39 20,33 29,32" fill="url(#starGrad)" stroke="#7E22CE" stroke-width="1.5" />
      <!-- Right Star Eye -->
      <polygon points="68,24 71,32 80,33 73,39 75,47 68,42 61,47 63,39 56,33 65,32" fill="url(#starGrad)" stroke="#7E22CE" stroke-width="1.5" />
      <!-- Rosy Cheeks -->
      <ellipse cx="22" cy="56" rx="8" ry="5" fill="#F43F5E" opacity="0.5" />
      <ellipse cx="78" cy="56" rx="8" ry="5" fill="#F43F5E" opacity="0.5" />
      <!-- Beaming Wide Smile -->
      <path d="M26 56 Q 50 58 74 56 C 74 78, 26 78, 26 56 Z" fill="#641E16" stroke="#78350F" stroke-width="2.5" />
      <!-- Upper Teeth -->
      <path d="M27 56 Q 50 58 73 56 C 72 63, 28 63, 27 56 Z" fill="#FFFFFF" />
      <!-- Big Tongue -->
      <ellipse cx="50" cy="71" rx="14" ry="7" fill="#EF4444" />
    </svg>`
  },

  'heart-eyes': {
    name: 'In Love',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad4" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF3366" />
          <stop offset="100%" stop-color="#DC2626" />
        </linearGradient>
      </defs>
      <!-- Base Face -->
      <circle cx="50" cy="50" r="44" fill="url(#faceGrad4)" stroke="#B45309" stroke-width="2.5" />
      <!-- Left Heart Eye -->
      <path d="M32 28 C 30 22, 22 22, 20 28 C 17 35, 32 47, 32 47 C 32 47, 47 35, 44 28 C 42 22, 34 22, 32 28 Z" fill="url(#heartGrad)" stroke="#991B1B" stroke-width="1.5" />
      <!-- Right Heart Eye -->
      <path d="M68 28 C 66 22, 58 22, 56 28 C 53 35, 68 47, 68 47 C 68 47, 83 35, 80 28 C 78 22, 70 22, 68 28 Z" fill="url(#heartGrad)" stroke="#991B1B" stroke-width="1.5" />
      <!-- Cheeks -->
      <ellipse cx="20" cy="57" rx="7" ry="4" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="80" cy="57" rx="7" ry="4" fill="#F43F5E" opacity="0.6" />
      <!-- Warm Smile -->
      <path d="M28 58 Q 50 78 72 58" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" />
      <path d="M26 58 Q 28 64 32 60" fill="none" stroke="#78350F" stroke-width="2" />
      <path d="M74 58 Q 72 64 68 60" fill="none" stroke="#78350F" stroke-width="2" />
    </svg>`
  },

  'fire': {
    name: 'Super Fire',
    category: 'symbols',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fireOuter" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#DC2626" />
          <stop offset="45%" stop-color="#EA580C" />
          <stop offset="85%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#FDE047" />
        </linearGradient>
        <linearGradient id="fireInner" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="70%" stop-color="#FEF08A" />
          <stop offset="100%" stop-color="#FFFFFF" />
        </linearGradient>
      </defs>
      <!-- Outer Flame -->
      <path d="M50 8 C 56 22, 68 28, 70 38 C 72 46, 68 50, 72 56 C 77 62, 86 64, 84 76 C 81 90, 68 96, 50 96 C 32 96, 18 88, 16 74 C 14 62, 23 54, 28 46 C 32 38, 28 30, 36 20 C 40 28, 44 32, 44 24 C 44 16, 48 10, 50 8 Z" fill="url(#fireOuter)" />
      <!-- Mid Flame -->
      <path d="M50 34 C 55 42, 62 48, 62 58 C 62 70, 55 76, 50 78 C 45 76, 38 70, 38 58 C 38 48, 45 42, 50 34 Z" fill="#FB923C" />
      <!-- Inner White/Yellow Core Flame -->
      <path d="M50 48 C 54 54, 58 60, 58 68 C 58 78, 54 84, 50 84 C 46 84, 42 78, 42 68 C 42 60, 46 54, 50 48 Z" fill="url(#fireInner)" />
      <!-- Sparkles -->
      <circle cx="28" cy="24" r="2" fill="#FEF08A" />
      <circle cx="76" cy="32" r="2.5" fill="#FEF08A" />
      <circle cx="52" cy="4" r="1.5" fill="#FFFFFF" />
    </svg>`
  },

  'rocket': {
    name: 'Rocket Launch',
    category: 'symbols',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="50%" stop-color="#E2E8F0" />
          <stop offset="100%" stop-color="#94A3B8" />
        </linearGradient>
        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EF4444" />
          <stop offset="100%" stop-color="#991B1B" />
        </linearGradient>
      </defs>
      <!-- Exhaust Flame -->
      <path d="M30 68 C 22 76, 12 84, 6 92 C 14 86, 22 76, 30 68 Z" fill="#EF4444" opacity="0.8" />
      <path d="M26 72 C 16 80, 8 92, 4 96 C 10 90, 20 80, 26 72 Z" fill="#FBBF24" />
      <path d="M22 76 C 16 82, 10 90, 8 94 C 12 90, 18 84, 22 76 Z" fill="#FFFFFF" />
      <!-- Left Fin -->
      <path d="M36 50 L20 62 L32 74 L42 66 Z" fill="url(#finGrad)" stroke="#7F1D1D" stroke-width="1.5" />
      <!-- Right Fin -->
      <path d="M50 36 L62 20 L74 32 L66 42 Z" fill="url(#finGrad)" stroke="#7F1D1D" stroke-width="1.5" />
      <!-- Rocket Body -->
      <path d="M82 18 C 58 10, 36 34, 30 60 L40 70 C 66 64, 90 42, 82 18 Z" fill="url(#hullGrad)" stroke="#475569" stroke-width="2" />
      <!-- Rocket Red Nose Cone -->
      <path d="M82 18 C 76 16, 68 20, 64 24 L76 36 C 80 32, 84 24, 82 18 Z" fill="url(#finGrad)" />
      <!-- Porthole Window -->
      <circle cx="56" cy="44" r="9" fill="#0284C7" stroke="#38BDF8" stroke-width="2.5" />
      <circle cx="54" cy="42" r="7" fill="#0369A1" />
      <ellipse cx="53" cy="40" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.75" />
      <!-- Center Fin -->
      <path d="M34 66 L26 74 L32 80 L40 72 Z" fill="url(#finGrad)" />
    </svg>`
  },

  'mind-blown': {
    name: 'Mind Blown',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad5" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EC4899" />
          <stop offset="40%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#3B82F6" />
        </linearGradient>
      </defs>
      <!-- Brain / Cosmic Explosion Cloud -->
      <path d="M26 28 C 14 26, 12 14, 24 8 C 30 4, 36 8, 40 4 C 48 -2, 58 -2, 64 6 C 70 2, 78 4, 82 12 C 88 18, 86 28, 76 30 Z" fill="url(#cloudGrad)" stroke="#6D28D9" stroke-width="1.5" />
      <circle cx="34" cy="14" r="3" fill="#FDE047" />
      <circle cx="66" cy="12" r="2.5" fill="#FEF08A" />
      <circle cx="50" cy="8" r="3.5" fill="#F43F5E" />
      <!-- Base Head (top flattened/opened) -->
      <path d="M14 48 C 14 74, 30 92, 50 92 C 70 92, 86 74, 86 48 C 86 36, 76 34, 50 34 C 24 34, 14 36, 14 48 Z" fill="url(#faceGrad5)" stroke="#B45309" stroke-width="2.5" />
      <!-- Stunned Eyes (wide white circles, tiny pupils) -->
      <circle cx="34" cy="50" r="9" fill="#FFFFFF" stroke="#78350F" stroke-width="2" />
      <circle cx="66" cy="50" r="9" fill="#FFFFFF" stroke="#78350F" stroke-width="2" />
      <circle cx="34" cy="50" r="3.5" fill="#1E293B" />
      <circle cx="66" cy="50" r="3.5" fill="#1E293B" />
      <!-- Open Gap Mouth (speechless) -->
      <ellipse cx="50" cy="74" rx="10" ry="12" fill="#451A03" stroke="#78350F" stroke-width="2" />
      <ellipse cx="50" cy="80" rx="7" ry="5" fill="#DC2626" />
    </svg>`
  },

  'robot': {
    name: 'Cyber Bot',
    category: 'tech',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#94A3B8" />
          <stop offset="50%" stop-color="#64748B" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>
      </defs>
      <!-- Antenna -->
      <rect x="48" y="8" width="4" height="14" fill="#94A3B8" />
      <circle cx="50" cy="8" r="6" fill="#00F0FF" stroke="#0284C7" stroke-width="1.5" />
      <!-- Ears / Bolts -->
      <rect x="10" y="44" width="6" height="14" rx="2" fill="#E2E8F0" />
      <rect x="84" y="44" width="6" height="14" rx="2" fill="#E2E8F0" />
      <!-- Head -->
      <rect x="16" y="22" width="68" height="58" rx="14" fill="url(#botGrad)" stroke="#1E293B" stroke-width="2.5" />
      <!-- Eye Visor Screen -->
      <rect x="24" y="34" width="52" height="20" rx="6" fill="#0F172A" stroke="#1E293B" stroke-width="1.5" />
      <!-- Glowing Eyes -->
      <circle cx="38" cy="44" r="6" fill="#00F0FF" />
      <circle cx="62" cy="44" r="6" fill="#00F0FF" />
      <circle cx="39" cy="43" r="2" fill="#FFFFFF" />
      <circle cx="63" cy="43" r="2" fill="#FFFFFF" />
      <!-- Grid Mouth -->
      <rect x="30" y="62" width="40" height="10" rx="3" fill="#0F172A" />
      <line x1="38" y1="62" x2="38" y2="72" stroke="#00F0FF" stroke-width="2" />
      <line x1="46" y1="62" x2="46" y2="72" stroke="#00F0FF" stroke-width="2" />
      <line x1="54" y1="62" x2="54" y2="72" stroke="#00F0FF" stroke-width="2" />
      <line x1="62" y1="62" x2="62" y2="72" stroke="#00F0FF" stroke-width="2" />
    </svg>`
  },

  'party-popper': {
    name: 'Party Popper',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad6" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
      </defs>
      <!-- Base Head -->
      <circle cx="48" cy="54" r="40" fill="url(#faceGrad6)" stroke="#B45309" stroke-width="2.5" />
      <!-- Party Cone Hat -->
      <polygon points="56,8 86,40 40,32" fill="#EC4899" stroke="#BE185D" stroke-width="2" />
      <circle cx="56" cy="8" r="5" fill="#FBBF24" />
      <line x1="48" y1="20" x2="72" y2="36" stroke="#38BDF8" stroke-width="3" />
      <!-- Cheerful squint eyes -->
      <path d="M24 48 Q 32 40 40 48" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" />
      <path d="M52 52 Q 60 44 68 52" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" />
      <!-- Party Horn / Mouth -->
      <path d="M38 68 Q 48 76 58 68" fill="none" stroke="#78350F" stroke-width="3" />
      <path d="M30 68 L12 78 L10 70 L28 64 Z" fill="#10B981" stroke="#047857" stroke-width="1.5" />
      <!-- Confetti Streamers -->
      <circle cx="16" cy="24" r="3" fill="#EF4444" />
      <circle cx="28" cy="14" r="2.5" fill="#3B82F6" />
      <circle cx="86" cy="68" r="3" fill="#10B981" />
      <circle cx="78" cy="82" r="2.5" fill="#F59E0B" />
      <path d="M12 36 Q 20 44 14 52" fill="none" stroke="#A855F7" stroke-width="2" stroke-linecap="round" />
      <path d="M82 22 Q 92 30 84 38" fill="none" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },

  'wizard': {
    name: 'Magic Wizard',
    category: 'faces',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGrad7" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="70%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
      </defs>
      <!-- Base Head -->
      <circle cx="50" cy="56" r="38" fill="url(#faceGrad7)" stroke="#B45309" stroke-width="2.5" />
      <!-- Wizard Hat Cone -->
      <polygon points="50,4 20,42 80,42" fill="#7C3AED" stroke="#4C1D95" stroke-width="2" />
      <ellipse cx="50" cy="42" rx="36" ry="7" fill="#6D28D9" stroke="#4C1D95" stroke-width="2" />
      <!-- Hat Gold Stars & Moon -->
      <path d="M48 20 C 44 20, 42 16, 44 14 C 48 14, 52 18, 48 20 Z" fill="#FBBF24" />
      <circle cx="58" cy="28" r="3" fill="#FBBF24" />
      <!-- Eyes with sparkle -->
      <circle cx="36" cy="54" r="5" fill="#1E293B" />
      <circle cx="64" cy="54" r="5" fill="#1E293B" />
      <circle cx="38" cy="52" r="2" fill="#FFFFFF" />
      <circle cx="66" cy="52" r="2" fill="#FFFFFF" />
      <!-- Beard -->
      <path d="M32 68 C 36 86, 50 94, 50 94 C 50 94, 64 86, 68 68 C 60 74, 40 74, 32 68 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
      <!-- Smile -->
      <path d="M42 66 Q 50 72 58 66" fill="none" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" />
    </svg>`
  },

  'coffee-bean': {
    name: 'Java Bean',
    category: 'java',
    svg: `<svg viewBox="0 0 100 100" class="svg-emoji" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="beanGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#92400E" />
          <stop offset="60%" stop-color="#78350F" />
          <stop offset="100%" stop-color="#451A03" />
        </radialGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="50" cy="85" rx="30" ry="8" fill="rgba(0,0,0,0.3)" />
      <!-- Bean Body -->
      <path d="M50 14 C 70 14, 82 28, 82 50 C 82 72, 70 86, 50 86 C 30 86, 18 72, 18 50 C 18 28, 30 14, 50 14 Z" fill="url(#beanGrad)" stroke="#291205" stroke-width="3" />
      <!-- Center Curving Creep / Groove -->
      <path d="M50 18 Q 42 36 54 50 Q 64 64 50 82" fill="none" stroke="#291205" stroke-width="5" stroke-linecap="round" />
      <path d="M49 20 Q 43 36 53 50 Q 63 64 49 80" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
      <!-- Bean Highlight -->
      <path d="M26 30 C 24 40, 24 60, 28 68" fill="none" stroke="#D97706" stroke-width="3.5" stroke-linecap="round" opacity="0.6" />
    </svg>`
  }
};

/**
 * Building blocks for the Interactive SVG Emoji Builder
 */
export const STUDIO_PARTS = {
  headShapes: {
    circle: {
      name: 'Классический круг',
      render: (color, scaleY = 1) => 
        `<ellipse cx="100" cy="100" rx="80" ry="${80 * scaleY}" fill="${color}" stroke="#000000" stroke-width="4" stroke-opacity="0.2" />`
    },
    squircle: {
      name: 'Мягкий квадрат',
      render: (color, scaleY = 1) =>
        `<rect x="25" y="${25 + (1 - scaleY) * 40}" width="150" height="${150 * scaleY}" rx="40" fill="${color}" stroke="#000000" stroke-width="4" stroke-opacity="0.2" />`
    },
    javaCup: {
      name: 'Кружка Java',
      render: (color, scaleY = 1) => `
        <ellipse cx="100" cy="${165 * scaleY}" rx="70" ry="15" fill="#475569" />
        <path d="M140 85 C 175 85, 175 135, 140 140" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" />
        <path d="M45 65 L55 155 C 60 168, 140 168, 145 155 L155 65 Z" fill="${color}" stroke="#000000" stroke-width="4" stroke-opacity="0.2" />
        <ellipse cx="100" cy="65" rx="55" ry="16" fill="#451A03" />
      `
    },
    alien: {
      name: 'Пришелец',
      render: (color, scaleY = 1) => `
        <path d="M100 20 C 155 20, 175 70, 160 120 C 145 165, 120 185, 100 185 C 80 185, 55 165, 40 120 C 25 70, 45 20, 100 20 Z" fill="${color}" stroke="#000000" stroke-width="4" stroke-opacity="0.2" />
      `
    }
  },

  skinColors: [
    { id: 'yellow', label: 'Classic Gold', color: '#FBBF24', accent: '#D97706' },
    { id: 'coffee', label: 'Java Coffee', color: '#B45309', accent: '#78350F' },
    { id: 'cyan', label: 'Cyber Cyan', color: '#06B6D4', accent: '#0891B2' },
    { id: 'violet', label: 'Neon Purple', color: '#A855F7', accent: '#7C3AED' },
    { id: 'green', label: 'Matrix Lime', color: '#22C55E', accent: '#15803D' },
    { id: 'pink', label: 'Bubblegum', color: '#F472B6', accent: '#DB2777' },
    { id: 'dark', label: 'Onyx Dark', color: '#334155', accent: '#0F172A' }
  ],

  eyes: {
    normal: {
      name: 'Обычные',
      render: (dx = 0, dy = 0, size = 1) => `
        <ellipse cx="${68 + dx * 0.4}" cy="${85 + dy * 0.4}" rx="${12 * size}" ry="${16 * size}" fill="#1E293B" />
        <ellipse cx="${132 + dx * 0.4}" cy="${85 + dy * 0.4}" rx="${12 * size}" ry="${16 * size}" fill="#1E293B" />
        <circle cx="${66 + dx * 0.6}" cy="${80 + dy * 0.6}" r="${4.5 * size}" fill="#FFFFFF" />
        <circle cx="${130 + dx * 0.6}" cy="${80 + dy * 0.6}" r="${4.5 * size}" fill="#FFFFFF" />
      `
    },
    sunglasses: {
      name: 'Очки крутого',
      render: (dx = 0, dy = 0, size = 1) => `
        <path d="M30 65 Q 100 60 170 65 L166 76 Q 100 70 34 76 Z" fill="#0F172A" />
        <path d="M36 70 H90 C 90 98, 76 110, 50 108 C 36 106, 32 92, 36 70 Z" fill="#0F172A" />
        <path d="M110 70 H164 C 168 92, 164 106, 150 108 C 124 110, 110 98, 110 70 Z" fill="#0F172A" />
        <rect x="88" y="72" width="24" height="6" fill="#0F172A" rx="3" />
        <path d="M48 76 L70 96" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round" opacity="0.75" />
        <path d="M122 76 L144 96" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round" opacity="0.75" />
      `
    },
    stars: {
      name: 'Звёзды',
      render: (dx = 0, dy = 0, size = 1) => `
        <g transform="translate(${68}, ${85}) scale(${size}) translate(-32, -32)">
          <polygon points="32,8 38,24 56,26 42,38 46,54 32,44 18,54 22,38 8,26 26,24" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
        </g>
        <g transform="translate(${132}, ${85}) scale(${size}) translate(-32, -32)">
          <polygon points="32,8 38,24 56,26 42,38 46,54 32,44 18,54 22,38 8,26 26,24" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
        </g>
      `
    },
    hearts: {
      name: 'Сердечки',
      render: (dx = 0, dy = 0, size = 1) => `
        <path d="M68 76 C 64 64, 48 64, 44 76 C 38 90, 68 114, 68 114 C 68 114, 98 90, 92 76 C 88 64, 72 64, 68 76 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2" transform="translate(-14, -14) scale(${size * 0.9})" />
        <path d="M132 76 C 128 64, 112 64, 108 76 C 102 90, 132 114, 132 114 C 132 114, 162 90, 156 76 C 152 64, 136 64, 132 76 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2" transform="translate(-6, -14) scale(${size * 0.9})" />
      `
    },
    wink: {
      name: 'Подмигивание',
      render: (dx = 0, dy = 0, size = 1) => `
        <ellipse cx="${68 + dx * 0.3}" cy="${85 + dy * 0.3}" rx="${12 * size}" ry="${16 * size}" fill="#1E293B" />
        <circle cx="${66 + dx * 0.5}" cy="${80 + dy * 0.5}" r="${4.5 * size}" fill="#FFFFFF" />
        <path d="M115 88 Q 132 70 149 88" fill="none" stroke="#1E293B" stroke-width="6" stroke-linecap="round" />
      `
    },
    laser: {
      name: 'Лазерные глаза',
      render: (dx = 0, dy = 0, size = 1) => `
        <rect x="36" y="78" width="128" height="18" rx="9" fill="#0F172A" />
        <rect x="42" y="82" width="116" height="10" rx="5" fill="#EF4444" />
        <line x1="42" y1="87" x2="10" y2="105" stroke="#FF0055" stroke-width="4" stroke-linecap="round" opacity="0.8" />
        <line x1="158" y1="87" x2="190" y2="105" stroke="#FF0055" stroke-width="4" stroke-linecap="round" opacity="0.8" />
      `
    }
  },

  mouths: {
    smile: {
      name: 'Широкая улыбка',
      render: () => `
        <path d="M55 125 Q 100 130 145 125 C 145 168, 55 168, 55 125 Z" fill="#641E16" stroke="#451A03" stroke-width="3" />
        <path d="M58 125 Q 100 130 142 125 C 140 138, 60 138, 58 125 Z" fill="#FFFFFF" />
        <ellipse cx="100" cy="154" rx="28" ry="14" fill="#EF4444" />
      `
    },
    grin: {
      name: 'Лёгкая улыбка',
      render: () => `
        <path d="M60 130 Q 100 162 140 130" fill="none" stroke="#1E293B" stroke-width="7" stroke-linecap="round" />
      `
    },
    tongue: {
      name: 'Язык',
      render: () => `
        <path d="M55 126 Q 100 132 145 126 C 145 164, 55 164, 55 126 Z" fill="#451A03" />
        <path d="M82 142 C 82 170, 118 170, 118 142 Z" fill="#F43F5E" stroke="#BE185D" stroke-width="2.5" />
        <line x1="100" y1="144" x2="100" y2="162" stroke="#BE185D" stroke-width="2" />
      `
    },
    shock: {
      name: 'Шок O',
      render: () => `
        <ellipse cx="100" cy="144" rx="20" ry="24" fill="#1E293B" stroke="#0F172A" stroke-width="3" />
        <ellipse cx="100" cy="156" rx="14" ry="10" fill="#EF4444" />
      `
    },
    mustache: {
      name: 'Джентльмен с усами',
      render: () => `
        <path d="M64 140 Q 100 165 136 140" fill="none" stroke="#1E293B" stroke-width="5" stroke-linecap="round" />
        <path d="M100 128 C 86 112, 54 122, 48 138 C 66 142, 84 134, 100 128 C 116 134, 134 142, 152 138 C 146 122, 114 112, 100 128 Z" fill="#334155" />
      `
    },
    coffeeSip: {
      name: 'Глоток кофе',
      render: () => `
        <path d="M68 135 Q 92 148 116 135" fill="none" stroke="#1E293B" stroke-width="5" stroke-linecap="round" />
        <rect x="110" y="122" width="28" height="28" rx="4" fill="#DC2626" stroke="#991B1B" stroke-width="2" />
        <path d="M138 128 C 146 128, 146 142, 138 142" fill="none" stroke="#DC2626" stroke-width="3" stroke-linecap="round" />
        <path d="M118 115 C 115 106, 122 100, 117 92" fill="none" stroke="#E2E8F0" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
      `
    }
  },

  accessories: {
    none: {
      name: 'Без аксессуара',
      render: () => ''
    },
    partyHat: {
      name: 'Праздничный колпак',
      render: () => `
        <polygon points="100,2 144,55 56,48" fill="#EC4899" stroke="#9D174D" stroke-width="3" />
        <circle cx="100" cy="4" r="8" fill="#FBBF24" />
        <line x1="72" y1="28" x2="124" y2="52" stroke="#38BDF8" stroke-width="5" />
        <line x1="84" y1="12" x2="136" y2="36" stroke="#34D399" stroke-width="5" />
      `
    },
    halo: {
      name: 'Нимб ангела',
      render: () => `
        <ellipse cx="100" cy="22" rx="55" ry="14" fill="none" stroke="#FBBF24" stroke-width="8" />
        <ellipse cx="100" cy="22" rx="55" ry="14" fill="none" stroke="#FEF08A" stroke-width="3" opacity="0.9" />
      `
    },
    fireCrown: {
      name: 'Огненная корона',
      render: () => `
        <path d="M100 0 C 110 22, 130 25, 135 40 C 140 30, 155 35, 145 50 L55 50 C 45 35, 60 30, 65 40 C 70 25, 90 22, 100 0 Z" fill="#EF4444" stroke="#DC2626" stroke-width="2" />
        <path d="M100 14 C 106 28, 120 30, 124 45 L76 45 C 80 30, 94 28, 100 14 Z" fill="#FBBF24" />
      `
    },
    headphones: {
      name: 'DJ Наушники',
      render: () => `
        <path d="M25 100 C 25 35, 175 35, 175 100" fill="none" stroke="#0F172A" stroke-width="12" stroke-linecap="round" />
        <rect x="12" y="80" width="22" height="42" rx="8" fill="#00F0FF" stroke="#0284C7" stroke-width="3" />
        <rect x="166" y="80" width="22" height="42" rx="8" fill="#00F0FF" stroke="#0284C7" stroke-width="3" />
        <line x1="50" y1="42" x2="150" y2="42" stroke="#EC4899" stroke-width="4" stroke-linecap="round" />
      `
    },
    javaBeans: {
      name: 'Кофейная корона Java',
      render: () => `
        <g transform="translate(100, 25)">
          <ellipse cx="-45" cy="0" rx="14" ry="20" fill="#78350F" transform="rotate(-25 -45 0)" />
          <ellipse cx="0" cy="-8" rx="16" ry="22" fill="#92400E" />
          <ellipse cx="45" cy="0" rx="14" ry="20" fill="#78350F" transform="rotate(25 45 0)" />
          <path d="M-45 -14 Q -48 0 -43 14" stroke="#291205" stroke-width="2" fill="none" />
          <path d="M0 -22 Q -4 -8 2 8" stroke="#291205" stroke-width="2.5" fill="none" />
          <path d="M45 -14 Q 48 0 43 14" stroke="#291205" stroke-width="2" fill="none" />
        </g>
      `
    }
  }
};
