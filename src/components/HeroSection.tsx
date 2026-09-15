import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Code2, Terminal, Cpu, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  // Split words for stagger animation
  const statementWords = PERSONAL_INFO.statement.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Top Meta Eyebrow Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span>{PERSONAL_INFO.title.toUpperCase()}</span>
        </div>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="font-mono text-xs text-zinc-400 tracking-wider">
          {PERSONAL_INFO.location}
        </span>
      </motion.div>

      {/* Bold Personal Statement Tagline with Word Stagger Effect */}
      <div className="max-w-5xl mb-8">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.12]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statementWords.map((word, idx) => {
            // Emphasize key accent words with teal/orange/gold highlights
            const isTeal = word.toLowerCase().includes('resilient') || word.toLowerCase().includes('systems');
            const isOrange = word.toLowerCase().includes('sub-millisecond') || word.toLowerCase().includes('data');
            const isGold = word.toLowerCase().includes('editorial') || word.toLowerCase().includes('precision');

            let spanClass = 'inline-block mr-[0.25em]';
            if (isTeal) {
              spanClass += ' text-teal-300 drop-shadow-[0_0_24px_rgba(45,212,191,0.25)]';
            } else if (isOrange) {
              spanClass += ' text-amber-400 drop-shadow-[0_0_24px_rgba(245,158,11,0.25)]';
            } else if (isGold) {
              spanClass += ' text-orange-400 drop-shadow-[0_0_24px_rgba(249,115,22,0.25)]';
            }

            return (
              <motion.span key={idx} variants={wordVariants} className={spanClass}>
                {word}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>

      {/* Short Sub-narrative / Anchor */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="max-w-2xl text-base sm:text-lg text-zinc-400 font-body leading-relaxed mb-10"
      >
        Bridging high-concurrency cloud backend pipelines, memory-mapped data architectures, and
        expressive, fluid web applications with meticulous typographic design.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap items-center gap-4 mb-16"
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-display font-bold text-sm tracking-wide transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          View Case Studies
        </a>
        <a
          href="#tech-stack"
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs tracking-wider transition-all hover:border-teal-500/40 hover:-translate-y-0.5"
        >
          Inspect Tech Stack
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-zinc-400 hover:text-amber-400 font-mono text-xs tracking-wider transition-colors"
        >
          <span>Direct Inquiries</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Hero Performance Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]"
      >
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-teal-500/30 transition-colors"
          >
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              <span className={idx % 2 === 0 ? 'text-teal-300' : 'text-amber-400'}>
                {stat.value}
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400 tracking-wider mt-1 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Subtle Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="hidden lg:flex items-center gap-2 mt-12 text-zinc-400 font-mono text-[11px] tracking-widest uppercase"
      >
        <div className="w-4 h-7 rounded-full border border-zinc-700 flex justify-center pt-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-teal-400"
          />
        </div>
        <span>Scroll to continue</span>
      </motion.div>
    </section>
  );
};
