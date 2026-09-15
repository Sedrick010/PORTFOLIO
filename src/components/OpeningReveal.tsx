import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface OpeningRevealProps {
  onComplete?: () => void;
}

export const OpeningReveal: React.FC<OpeningRevealProps> = ({ onComplete }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleDismiss = useCallback(() => {
    if (!isRevealed) {
      setIsRevealed(true);
      if (onComplete) onComplete();
    }
  }, [isRevealed, onComplete]);

  useEffect(() => {
    // Auto complete under 1.4s
    const timer = setTimeout(() => {
      handleDismiss();
    }, 1300);

    // Dismiss on scroll
    const onScroll = () => {
      if (window.scrollY > 10) {
        handleDismiss();
      }
    };

    // Dismiss on keydown (Esc / Space / Enter)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleDismiss]);

  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          id="opening-reveal"
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden select-none"
          onClick={handleDismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
          title="Click or scroll to skip"
        >
          {/* Top Panel Wipe */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#08090d] border-b border-teal-500/20"
            initial={{ y: '0%' }}
            exit={{ y: '-100%', transition: { duration: 0.65, ease: [0.77, 0, 0.175, 1] } }}
          />

          {/* Bottom Panel Wipe */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#08090d] border-t border-amber-500/20"
            initial={{ y: '0%' }}
            exit={{ y: '100%', transition: { duration: 0.65, ease: [0.77, 0, 0.175, 1] } }}
          />

          {/* Center Content: Monogram & Stroke Draw Animation */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center p-6 text-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
            exit={{ scale: 1.08, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
          >
            {/* SVG Logo Stroke-Draw */}
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Background glow circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(20, 184, 166, 0.15)"
                  strokeWidth="2"
                />
                {/* Animated draw border circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#reveal-grad)"
                  strokeWidth="2.5"
                  strokeDasharray="280"
                  initial={{ strokeDashoffset: 280 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.95, ease: 'easeInOut' }}
                />
                {/* SVG Geometric Monogram */}
                <motion.path
                  d="M32 70 L50 28 L68 70 M38 56 L62 56"
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="reveal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#facc15" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Title / Name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="space-y-1"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase font-display">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-xs tracking-[0.25em] text-teal-400/90 font-mono uppercase">
                Portfolio // 2026 Edition
              </p>
            </motion.div>

            {/* Skip Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-6 flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Tap anywhere or scroll to enter</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
