'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './TrueFocus.css';

export interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  borderColor = '#38bdf8',
  animationDuration = 0.3,
  className = '',
  style,
}) => {
  const words = sentence.split(separator);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const updateRect = () => {
      const targetIdx = hoveredIndex !== null ? hoveredIndex : 1; // Default frame highlights surname
      if (!wordRefs.current[targetIdx] || !containerRef.current) return;

      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = wordRefs.current[targetIdx]!.getBoundingClientRect();

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [hoveredIndex, words.length]);

  return (
    <div
      className={`focus-container ${className}`.trim()}
      style={style}
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isGradient = word.toLowerCase().includes('camiguing');
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${isGradient ? 'gradient-text' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: focusRect.width > 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={
          {
            '--border-color': borderColor,
          } as React.CSSProperties
        }
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;
