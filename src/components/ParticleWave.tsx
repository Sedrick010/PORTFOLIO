'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shaders for the cybernetic particle wave
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute float aScale;

  varying vec3 vPosition;
  varying float vElevation;
  varying float vDistance;

  void main() {
    vec3 pos = position;

    // Organic cybernetic wave harmonics with pronounced 3D amplitude
    float wave1 = sin(pos.x * 0.25 + uTime * 0.85) * cos(pos.z * 0.22 + uTime * 0.65) * 2.1;
    float wave2 = sin(pos.x * 0.13 - uTime * 0.45 + pos.z * 0.18) * 1.4;
    float wave3 = cos(length(pos.xz) * 0.16 - uTime * 1.0) * 0.85;

    // Interactive mouse ripple displacement
    vec2 mouseWorld = uMouse * vec2(15.0, 10.0);
    float distToMouse = length(pos.xz - mouseWorld);
    float mouseRipple = sin(distToMouse * 0.7 - uTime * 2.4) * exp(-distToMouse * 0.2) * 2.0;

    float elevation = wave1 + wave2 + wave3 + mouseRipple;
    pos.y += elevation;

    vElevation = elevation;
    vPosition = pos;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float distToCam = -mvPosition.z;
    vDistance = distToCam;

    // Crisp glowing point size with high DPI compensation
    gl_PointSize = (40.0 * aScale * uPixelRatio) / distToCam;
    gl_PointSize = clamp(gl_PointSize, 2.5, 48.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorBase;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorAccent;
  uniform vec3 uColorHighlight;
  uniform float uIsLight;

  varying vec3 vPosition;
  varying float vElevation;
  varying float vDistance;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Dual-tier soft glow point: bright crisp nucleus + ethereal aura
    float core = smoothstep(0.26, 0.0, dist);
    float aura = smoothstep(0.5, 0.04, dist);

    // Height-based color interpolation
    float normElevation = clamp((vElevation + 2.5) / 5.2, 0.0, 1.0);

    vec3 color = mix(uColorBase, uColorPrimary, smoothstep(0.08, 0.52, normElevation));
    color = mix(color, uColorAccent, smoothstep(0.52, 0.85, normElevation));
    color = mix(color, uColorHighlight, smoothstep(0.85, 1.0, normElevation) * core);

    // Distance attenuation
    float depthFade = smoothstep(1.5, 6.0, vDistance) * (1.0 - smoothstep(26.0, 44.0, vDistance));

    // Gentle central readability attenuation
    float centerDist = length(vPosition.xz * vec2(0.38, 0.82));
    float centerFactor = mix(0.48, 1.0, smoothstep(0.0, 6.8, centerDist));

    float finalAlpha = (core * 0.95 + aura * 0.6) * depthFade * centerFactor;

    if (uIsLight > 0.5) {
      gl_FragColor = vec4(color, finalAlpha * 0.82);
    } else {
      gl_FragColor = vec4(color, finalAlpha * 1.15);
    }
  }
`;

function WaveMesh({
  reducedMotion,
  isLight,
  mousePos,
}: {
  reducedMotion: boolean;
  isLight: boolean;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const currentMouse = useRef({ x: 0, y: 0 });

  // Grid dimensions: 104 cols x 72 rows = 7,488 particles for rich fluid terrain
  const { positions, scales, count } = useMemo(() => {
    const cols = 104;
    const rows = 72;
    const total = cols * rows;

    const pos = new Float32Array(total * 3);
    const sc = new Float32Array(total);

    const width = 38;
    const depth = 26;

    let idx = 0;
    let sIdx = 0;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const u = i / (cols - 1);
        const v = j / (rows - 1);

        const x = (u - 0.5) * width;
        const z = (v - 0.5) * depth;
        const y = -1.2;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        // Subtle scale variation per particle
        sc[sIdx] = 0.85 + Math.random() * 0.35;

        idx++;
        sIdx++;
      }
    }

    return { positions: pos, scales: sc, count: total };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
      uIsLight: { value: isLight ? 1.0 : 0.0 },
      uColorBase: { value: new THREE.Color(isLight ? '#64748b' : '#0369a1') },
      uColorPrimary: { value: new THREE.Color(isLight ? '#0284c7' : '#38bdf8') },
      uColorAccent: { value: new THREE.Color(isLight ? '#6366f1' : '#818cf8') },
      uColorHighlight: { value: new THREE.Color(isLight ? '#0f172a' : '#f0f9ff') },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    if (!mat || !mat.uniforms) return;

    mat.uniforms.uIsLight.value = isLight ? 1.0 : 0.0;
    mat.uniforms.uColorBase.value.set(isLight ? '#64748b' : '#0369a1');
    mat.uniforms.uColorPrimary.value.set(isLight ? '#0284c7' : '#38bdf8');
    mat.uniforms.uColorAccent.value.set(isLight ? '#6366f1' : '#818cf8');
    mat.uniforms.uColorHighlight.value.set(isLight ? '#0f172a' : '#f0f9ff');

    mat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
    mat.needsUpdate = true;
  }, [isLight]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    if (!mat || !mat.uniforms) return;

    // Time increment (slowed down if reduced motion is requested)
    const speed = reducedMotion ? 0.08 : 1.0;
    mat.uniforms.uTime.value += delta * speed;

    // Read shared mouse position from custom cursor pipeline when available
    const shared =
      typeof window !== 'undefined'
        ? (window as unknown as { __portfolioMouse?: { normX: number; normY: number } }).__portfolioMouse
        : undefined;
    const targetX = shared ? shared.normX : mousePos.current.x;
    const targetY = shared ? shared.normY : mousePos.current.y;

    // Smooth lerp mouse coordinates
    const lerpFactor = reducedMotion ? 0.02 : 0.06;
    currentMouse.current.x += (targetX - currentMouse.current.x) * lerpFactor;
    currentMouse.current.y += (targetY - currentMouse.current.y) * lerpFactor;

    mat.uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);

    // Subtle gentle camera tilt/parallax
    if (!reducedMotion) {
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        currentMouse.current.x * 2.2,
        0.035
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        6.5 + currentMouse.current.y * 1.0,
        0.035
      );
      state.camera.lookAt(0, -0.6, 0);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleWave() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMotionChange);

    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsLight(theme === 'light');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Fallback pointer tracking when custom cursor is unmounted
    const onPointerMove = (e: PointerEvent) => {
      if ((window as unknown as { __portfolioMouse?: { normX: number; normY: number } }).__portfolioMouse) {
        return;
      }
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      mq.removeEventListener('change', onMotionChange);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 5.2, 12.0], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      <WaveMesh reducedMotion={reducedMotion} isLight={isLight} mousePos={mousePos} />
    </Canvas>
  );
}
