'use client';

import React, { useEffect, useRef } from 'react';
import './InteractiveBackground.css';

// Luxury visual and physical tuning parameters
export const BACKGROUND_CONFIG = {
  // Spring physics and pointer damping
  physics: {
    stiffness: 0.065,        // Spring responsiveness (lower = more viscous weight)
    damping: 0.84,           // Velocity dissipation rate (higher = smoother glide)
    maxVelocity: 1.8,        // Clamps extreme mouse flicks
  },
  // Lighting and atmospheric balance
  lighting: {
    ambientCaustic: 0.28,    // Fluid caustic brightness
    specularSheen: 0.42,     // Directional cursor velocity sheen intensity
    vignetteDepth: 0.88,     // Radial corner darkening factor
    grainIntensity: 0.022,   // High-frequency film grain to prevent 8-bit banding
    waveSpeed: 0.22,         // Ambient fluid circulation speed
  },
  // Deep obsidian luxury palette (Normalized 0.0 - 1.0 RGB vectors)
  palettes: {
    dark: {
      base: [0.027, 0.039, 0.063] as const,       // Deep obsidian (#070a10)
      surface: [0.055, 0.078, 0.125] as const,    // Brushed titanium undertone (#0e1420)
      caustic: [0.18, 0.16, 0.15] as const,       // Subtle neutral refraction
      sheen: [0.78, 0.61, 0.38] as const,         // Champagne / amber specular sheen (#c89c61)
    },
    light: {
      base: [0.972, 0.980, 0.988] as const,       // Frosted alabaster (#f8fafc)
      surface: [0.925, 0.945, 0.965] as const,    // Light titanium stone (#edf2f7)
      caustic: [0.82, 0.86, 0.90] as const,       // Soft refractive refraction
      sheen: [0.74, 0.65, 0.52] as const,         // Muted champagne pearl
    },
  },
  // Section-specific mood shifts (subtly tints specular caustics)
  sectionAccents: {
    home: [0.85, 0.58, 0.32] as const,         // Warm amber champagne
    about: [0.45, 0.58, 0.72] as const,        // Cool slate titanium
    'tech-stack': [0.28, 0.75, 0.68] as const, // Refined teal prism
    projects: [0.24, 0.32, 0.44] as const,     // Deep quiet obsidian (minimal distraction)
    certifications: [0.82, 0.70, 0.36] as const,// Fine gold
    contact: [0.88, 0.52, 0.28] as const,      // Warm ember titanium
  },
};

type Vec3 = [number, number, number];

const SECTION_IDS = ['home', 'about', 'tech-stack', 'projects', 'certifications', 'contact'] as const;

const VERTEX_SHADER_SOURCE = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uIsLight;
uniform float uReducedMotion;

uniform vec3 uColorBase;
uniform vec3 uColorSurface;
uniform vec3 uColorCaustic;
uniform vec3 uColorSheen;

uniform float uCausticIntensity;
uniform float uSheenIntensity;
uniform float uGrainIntensity;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  
  float speedMultiplier = uReducedMotion > 0.5 ? 0.03 : 1.0;
  float t = uTime * 0.16 * speedMultiplier;
  
  vec2 p = uv * 2.2;
  
  vec2 toMouse = uv - uMouse;
  float mouseDist = length(toMouse);
  float mouseEffect = exp(-mouseDist * 2.6);
  
  if (uReducedMotion < 0.5) {
    p += normalize(toMouse + vec2(0.0001)) * mouseEffect * 0.16;
  }
  
  vec2 warp = p;
  for (int i = 1; i <= 3; i++) {
    float fi = float(i);
    warp += vec2(
      sin(warp.y * (1.2 * fi) + t * 0.75) / fi,
      cos(warp.x * (1.15 * fi) - t * 0.65) / fi
    ) * 0.42;
  }
  
  float waveA = sin(warp.x * 2.8 + warp.y * 2.2 + t);
  float waveB = cos(warp.y * 3.4 - warp.x * 1.9 - t * 0.9);
  float caustic = pow(clamp(abs(waveA * waveB), 0.0, 1.0), 3.0);
  
  float velocityLen = length(uVelocity);
  vec2 velocityDir = velocityLen > 0.001 ? normalize(uVelocity) : vec2(0.0, 0.0);
  float sheenAlignment = dot(normalize(toMouse + vec2(0.0001)), velocityDir);
  
  float specularSheen = 0.0;
  if (uReducedMotion < 0.5) {
    float radialFalloff = exp(-mouseDist * 3.6);
    float directionalFactor = 0.55 + 0.45 * abs(sheenAlignment);
    float velocityInfluence = smoothstep(0.008, 0.28, velocityLen);
    specularSheen = radialFalloff * directionalFactor * (0.3 + 0.7 * velocityInfluence);
  }
  
  float surfaceGrad = clamp(warp.y * 0.4 + 0.5, 0.0, 1.0);
  vec3 col = mix(uColorBase, uColorSurface, surfaceGrad * 0.55);
  
  col += uColorCaustic * caustic * uCausticIntensity;
  col += uColorSheen * specularSheen * uSheenIntensity;
  
  float vignette = smoothstep(1.35, 0.35, length(uv * vec2(0.9, 1.0)));
  col = mix(uColorBase * 0.9, col, vignette);
  
  float grainSeed = dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + fract(uTime * 3.7) * 43.0;
  float grain = (fract(sin(grainSeed) * 43758.5453) - 0.5) * uGrainIntensity;
  col += grain;
  
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertShader: WebGLShader,
  fragShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function lerpVec3(current: Vec3, target: readonly [number, number, number], t: number): Vec3 {
  return [
    current[0] + (target[0] - current[0]) * t,
    current[1] + (target[1] - current[1]) * t,
    current[2] + (target[2] - current[2]) * t,
  ];
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL with hardware-accelerated context settings
    const glOptions: WebGLContextAttributes = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    };

    const gl =
      (canvas.getContext('webgl2', glOptions) as WebGLRenderingContext | null) ||
      (canvas.getContext('webgl', glOptions) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl', glOptions) as WebGLRenderingContext | null);

    if (!gl) return;

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = createProgram(gl, vertShader, fragShader);
    if (!program) return;

    gl.useProgram(program);

    // Quad geometry covering Normalized Device Coordinates [-1, 1]
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Cache uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uVelocityLoc = gl.getUniformLocation(program, 'uVelocity');
    const uIsLightLoc = gl.getUniformLocation(program, 'uIsLight');
    const uReducedMotionLoc = gl.getUniformLocation(program, 'uReducedMotion');
    const uColorBaseLoc = gl.getUniformLocation(program, 'uColorBase');
    const uColorSurfaceLoc = gl.getUniformLocation(program, 'uColorSurface');
    const uColorCausticLoc = gl.getUniformLocation(program, 'uColorCaustic');
    const uColorSheenLoc = gl.getUniformLocation(program, 'uColorSheen');
    const uCausticIntensityLoc = gl.getUniformLocation(program, 'uCausticIntensity');
    const uSheenIntensityLoc = gl.getUniformLocation(program, 'uSheenIntensity');
    const uGrainIntensityLoc = gl.getUniformLocation(program, 'uGrainIntensity');

    // Dynamic state trackers
    const targetGlMouse = { x: 0, y: 0 };
    const currentGlMouse = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    let isLight = document.documentElement.getAttribute('data-theme') === 'light';
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeSection = 'home';

    // Interpolated color state initialized to dark mode defaults
    let curBase: Vec3 = [...BACKGROUND_CONFIG.palettes.dark.base];
    let curSurface: Vec3 = [...BACKGROUND_CONFIG.palettes.dark.surface];
    let curCaustic: Vec3 = [...BACKGROUND_CONFIG.palettes.dark.caustic];
    let curSheen: Vec3 = [...BACKGROUND_CONFIG.palettes.dark.sheen];

    // Responsive canvas dimension management with 1.5x DPR cap for efficiency
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      const physicalWidth = Math.round(width * dpr);
      const physicalHeight = Math.round(height * dpr);

      if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
        canvas.width = physicalWidth;
        canvas.height = physicalHeight;
        gl.viewport(0, 0, physicalWidth, physicalHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Fallback pointer listener for mobile touch or when custom cursor is inactive
    const handlePointerMove = (e: PointerEvent) => {
      const shared = (window as unknown as { __portfolioMouse?: { x: number; y: number } }).__portfolioMouse;
      if (shared) return;

      const normX = (e.clientX - width * 0.5) / Math.min(width, height);
      const normY = -((e.clientY - height * 0.5) / Math.min(width, height));
      targetGlMouse.x = normX;
      targetGlMouse.y = normY;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Active section detection for ambient mood modulation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.45;

      let found = 'home';
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el && viewportMid >= el.offsetTop) {
          found = id;
        }
      }
      activeSection = found;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Theme mutation observer
    const handleThemeChange = () => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light';
    };
    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Reduced motion media query listener
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // High performance render loop with delta-time spring physics
    let lastTime = performance.now();
    let accumulatedTime = 0;

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      accumulatedTime += delta;

      // Ingest shared mouse position if fine pointer is operating
      const shared = (window as unknown as { __portfolioMouse?: { x: number; y: number } }).__portfolioMouse;
      if (shared) {
        targetGlMouse.x = (shared.x - width * 0.5) / Math.min(width, height);
        targetGlMouse.y = -((shared.y - height * 0.5) / Math.min(width, height));
      }

      // Spring physics calculation for viscous pointer inertia
      const stiffness = BACKGROUND_CONFIG.physics.stiffness;
      const damping = BACKGROUND_CONFIG.physics.damping;

      const ax = (targetGlMouse.x - currentGlMouse.x) * stiffness;
      const ay = (targetGlMouse.y - currentGlMouse.y) * stiffness;

      velocity.x = (velocity.x + ax) * damping;
      velocity.y = (velocity.y + ay) * damping;

      const currentSpeed = Math.hypot(velocity.x, velocity.y);
      if (currentSpeed > BACKGROUND_CONFIG.physics.maxVelocity) {
        const factor = BACKGROUND_CONFIG.physics.maxVelocity / currentSpeed;
        velocity.x *= factor;
        velocity.y *= factor;
      }

      currentGlMouse.x += velocity.x;
      currentGlMouse.y += velocity.y;

      // Smooth section and theme palette interpolation
      const activePalette = isLight ? BACKGROUND_CONFIG.palettes.light : BACKGROUND_CONFIG.palettes.dark;
      const accent =
        BACKGROUND_CONFIG.sectionAccents[activeSection as keyof typeof BACKGROUND_CONFIG.sectionAccents] ||
        BACKGROUND_CONFIG.sectionAccents.home;

      const lerpSpeed = 0.045;
      curBase = lerpVec3(curBase, activePalette.base, lerpSpeed);
      curSurface = lerpVec3(curSurface, activePalette.surface, lerpSpeed);
      curCaustic = lerpVec3(curCaustic, activePalette.caustic, lerpSpeed);
      curSheen = lerpVec3(curSheen, accent, lerpSpeed);

      // Upload uniforms
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, accumulatedTime);
      gl.uniform2f(uMouseLoc, currentGlMouse.x, currentGlMouse.y);
      gl.uniform2f(uVelocityLoc, velocity.x, velocity.y);
      gl.uniform1f(uIsLightLoc, isLight ? 1.0 : 0.0);
      gl.uniform1f(uReducedMotionLoc, isReducedMotion ? 1.0 : 0.0);

      gl.uniform3fv(uColorBaseLoc, curBase);
      gl.uniform3fv(uColorSurfaceLoc, curSurface);
      gl.uniform3fv(uColorCausticLoc, curCaustic);
      gl.uniform3fv(uColorSheenLoc, curSheen);

      gl.uniform1f(uCausticIntensityLoc, BACKGROUND_CONFIG.lighting.ambientCaustic);
      gl.uniform1f(uSheenIntensityLoc, BACKGROUND_CONFIG.lighting.specularSheen);
      gl.uniform1f(uGrainIntensityLoc, BACKGROUND_CONFIG.lighting.grainIntensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    // Pause rendering loop on background tabs to eliminate CPU drain
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        lastTime = performance.now();
        rafIdRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionChange);
      themeObserver.disconnect();

      gl.deleteBuffer(vertexBuffer);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="interactive-background" aria-hidden="true">
      <canvas ref={canvasRef} className="interactive-bg-canvas" />
      <div className="interactive-bg-vignette" />
    </div>
  );
}
