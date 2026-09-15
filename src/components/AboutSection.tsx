import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Layers, ShieldCheck, Zap, SlidersHorizontal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [duotoneMode, setDuotoneMode] = useState<'duotone' | 'natural'>('duotone');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalized tilt angles
    setTilt({
      x: -(y / rect.height) * 14,
      y: (x / rect.width) * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 block mb-2">
            01 // BACKGROUND & CRAFT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            About Me
          </h2>
        </div>
        <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase max-w-xs">
          Role: {PERSONAL_INFO.title}
        </p>
      </div>

      {/* Main Grid: Photo with interactive tilt + Editorial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Photo Column with Interactive 3D Tilt & Duotone Mode */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-md aspect-[4/5] rounded-2xl cursor-pointer group select-none"
            style={{ perspective: 1000 }}
          >
            {/* Animated tilt container */}
            <motion.div
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative w-full h-full rounded-2xl overflow-hidden border border-teal-500/30 shadow-2xl shadow-black/50 bg-[#12151e]"
            >
              {/* Profile Image with lazy load */}
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  duotoneMode === 'duotone'
                    ? 'grayscale contrast-125 brightness-90 mix-blend-luminosity'
                    : 'brightness-100 contrast-100'
                }`}
              />

              {/* Duotone Accent Layer (Teal & Amber overlay) */}
              {duotoneMode === 'duotone' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/80 via-transparent to-amber-700/60 mix-blend-color pointer-events-none transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-teal-500/15 mix-blend-screen pointer-events-none" />
                </>
              )}

              {/* Border glow shine on hover */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-teal-400/50 transition-colors" />

              {/* Bottom Card Pill Over Image */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#090b10]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-display font-bold text-white tracking-wide">
                    {PERSONAL_INFO.name}
                  </div>
                  <div className="text-[11px] font-mono text-teal-300">
                    {PERSONAL_INFO.title.split('&')[0]}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-[10px] font-mono text-teal-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Behind ambient glow aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Interactive photo treatment toggle button */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setDuotoneMode(duotoneMode === 'duotone' ? 'natural' : 'duotone')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-teal-300 transition-colors"
              title="Toggle photo aesthetic filter"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
              <span>Aesthetic: {duotoneMode === 'duotone' ? 'Editorial Duotone' : 'Natural Color'}</span>
            </button>
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
              [Hover card to tilt 3D]
            </span>
          </div>
        </div>

        {/* Editorial Text Column */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white leading-snug">
              {PERSONAL_INFO.title}
            </h3>
          </div>

          {/* 2-3 sentence summary as requested */}
          <div className="text-zinc-300 text-lg leading-relaxed font-body space-y-4">
            <p>
              {PERSONAL_INFO.shortBio}
            </p>
          </div>

          {/* Key Architectural Philosophy Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">Latency Budget</h4>
              <p className="text-xs text-zinc-400 font-body leading-relaxed">
                Zero gratuitous renders. Memory-mapped I/O and P99 sub-millisecond discipline.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">Deterministic State</h4>
              <p className="text-xs text-zinc-400 font-body leading-relaxed">
                Immutable event streams, explicit error boundaries, and idempotent ledger architecture.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-300 mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-1">Editorial Precision</h4>
              <p className="text-xs text-zinc-400 font-body leading-relaxed">
                Refined typography pairing, fluid physics motion, and WCAG AAA accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
