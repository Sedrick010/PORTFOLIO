'use client';

import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const TRAIL_COUNT = 10;

const COLORS = {
  orange: '#f97316',
  teal: '#14b8a6',
  gold: '#eab308',
  blue: '#38bdf8',
};

type CursorMode = 'default' | 'interactive' | 'project' | 'cert' | 'teal' | 'text';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const trailPositionsRef = useRef<Array<{ x: number; y: number }>>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const lastMoveTimeRef = useRef(0);
  const rotationAngleRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const coreDotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const cursorModeRef = useRef<CursorMode>('default');
  cursorModeRef.current = cursorMode;
  const isClickingRef = useRef(false);
  isClickingRef.current = isClicking;

  useEffect(() => {
    // Disabled on touch devices and coarse pointers.
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastMoveTimeRef.current = performance.now();

      // Shared with background canvas and particle parallax.
      (window as unknown as { __portfolioMouse?: { x: number; y: number; normX: number; normY: number } }).__portfolioMouse = {
        x: e.clientX,
        y: e.clientY,
        normX: (e.clientX / window.innerWidth) * 2 - 1,
        normY: -(e.clientY / window.innerHeight) * 2 + 1,
      };

      if (!isVisible) {
        setIsVisible(true);
        // Seed positions on first move to prevent jumping from (0, 0).
        ringPosRef.current.x = e.clientX;
        ringPosRef.current.y = e.clientY;
        for (let i = 0; i < TRAIL_COUNT; i++) {
          trailPositionsRef.current[i].x = e.clientX;
          trailPositionsRef.current[i].y = e.clientY;
        }
      }
    };

    const onPointerDown = () => setIsClicking(true);
    const onPointerUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    let activeHoverEl: HTMLElement | null = null;

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = target.closest(
        'input, textarea, select, [contenteditable="true"]'
      );
      if (isText) {
        setCursorMode('text');
        if (activeHoverEl) {
          activeHoverEl.removeAttribute('data-hover-active');
          activeHoverEl = null;
        }
        return;
      }

      const hoverEl = target.closest<HTMLElement>(
        '[data-hover-fx], .hover-fx, .project-pinned-card, .cert-card, .about-card, .btn-primary, .btn-outline, .project-card-cta, .filter-pill, .theme-toggle, .skill-pill, .project-tech-pill, .nav-link, a, button, [role="button"]'
      );

      if (hoverEl) {
        if (activeHoverEl && activeHoverEl !== hoverEl) {
          activeHoverEl.removeAttribute('data-hover-active');
        }
        activeHoverEl = hoverEl;
        hoverEl.setAttribute('data-hover-active', 'true');

        const customAccent = hoverEl.getAttribute('data-hover-accent');
        if (customAccent === 'teal' || hoverEl.closest('.project-tech-pill, .skill-pill')) {
          setCursorMode('teal');
        } else if (customAccent === 'gold' || hoverEl.closest('.cert-card')) {
          setCursorMode('cert');
        } else if (customAccent === 'blue' || hoverEl.closest('.nav-link, .btn-primary')) {
          setCursorMode('interactive');
        } else {
          setCursorMode('project');
        }
        return;
      }

      if (activeHoverEl) {
        activeHoverEl.removeAttribute('data-hover-active');
        activeHoverEl = null;
      }
      setCursorMode('default');
    };

    const onPointerOut = (e: PointerEvent) => {
      if (!activeHoverEl) return;
      const related = e.relatedTarget as Node | null;
      // Ignore transitions between child nodes of the active element.
      if (related && activeHoverEl.contains(related)) {
        return;
      }
      activeHoverEl.removeAttribute('data-hover-active');
      activeHoverEl = null;
      setCursorMode('default');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    const animate = (timestamp: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mode = cursorModeRef.current;
      const clicking = isClickingRef.current;

      let activeColor = COLORS.orange;
      if (mode === 'project') activeColor = COLORS.orange;
      else if (mode === 'cert') activeColor = COLORS.gold;
      else if (mode === 'teal') activeColor = COLORS.teal;
      else if (mode === 'interactive') activeColor = COLORS.blue;

      if (coreDotRef.current) {
        const dotScale = clicking ? 0.75 : 1.0;
        coreDotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        coreDotRef.current.style.setProperty('--cursor-color', activeColor);
      }

      const isHovering = mode !== 'default' && mode !== 'text';
      const ringLerp = reducedMotion ? 1.0 : 0.16;
      ringPosRef.current.x += (mx - ringPosRef.current.x) * ringLerp;
      ringPosRef.current.y += (my - ringPosRef.current.y) * ringLerp;

      if (!reducedMotion) {
        rotationAngleRef.current = (rotationAngleRef.current + 1.2) % 360;
      } else {
        rotationAngleRef.current = 0;
      }

      // Hide ring on hover so element text remains unobstructed.
      const ringScale = isHovering ? 0 : clicking ? 0.72 : 1.0;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%) scale(${ringScale}) rotate(${rotationAngleRef.current.toFixed(1)}deg)`;
        ringRef.current.style.opacity = isHovering ? '0' : '1';
        ringRef.current.style.setProperty('--cursor-color', activeColor);
      }

      const timeSinceMove = timestamp - lastMoveTimeRef.current;
      const isMoving = timeSinceMove < 400;
      const trailFade = isMoving ? Math.max(0, 1 - timeSinceMove / 400) : 0;

      if (!reducedMotion && mode !== 'text') {
        const trailPositions = trailPositionsRef.current;

        trailPositions[0].x += (mx - trailPositions[0].x) * 0.45;
        trailPositions[0].y += (my - trailPositions[0].y) * 0.45;

        for (let i = 1; i < TRAIL_COUNT; i++) {
          trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.38;
          trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.38;
        }

        for (let i = 0; i < TRAIL_COUNT; i++) {
          const dotEl = trailRefs.current[i];
          if (!dotEl) continue;

          const progress = 1 - i / TRAIL_COUNT;
          const scale = (progress * 0.85).toFixed(3);
          const opacity = (progress * 0.55 * trailFade).toFixed(3);

          dotEl.style.transform = `translate3d(${trailPositions[i].x}px, ${trailPositions[i].y}px, 0) translate(-50%, -50%) scale(${scale})`;
          dotEl.style.opacity = opacity;
          dotEl.style.setProperty('--cursor-color', activeColor);
        }
      } else {
        for (let i = 0; i < TRAIL_COUNT; i++) {
          const dotEl = trailRefs.current[i];
          if (dotEl) dotEl.style.opacity = '0';
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // Pause rendering when tab is hidden.
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [mounted, isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`custom-cursor-layer ${!isVisible ? 'is-hidden' : ''} ${
        cursorMode !== 'default' && cursorMode !== 'text' ? 'is-hovering' : ''
      } ${cursorMode === 'text' ? 'is-text-mode' : ''} ${isClicking ? 'is-clicking' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="cursor-trail-dot"
        />
      ))}

      <div ref={ringRef} className="cursor-ring">
        <svg viewBox="0 0 40 40" className="cursor-ring-svg">
          <circle cx="20" cy="20" r="16" className="cursor-ring-circle" />
          <circle cx="20" cy="4" r="1.5" className="cursor-ring-corner" />
          <circle cx="36" cy="20" r="1.5" className="cursor-ring-corner" />
          <circle cx="20" cy="36" r="1.5" className="cursor-ring-corner" />
          <circle cx="4" cy="20" r="1.5" className="cursor-ring-corner" />
        </svg>
      </div>

      <div ref={coreDotRef} className="cursor-core-dot" />
    </div>
  );
}
