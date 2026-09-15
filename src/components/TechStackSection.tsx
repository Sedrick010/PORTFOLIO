import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Terminal, Database, Sparkles, Filter } from 'lucide-react';
import { TECH_STACK_DATA } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { TechItem } from '../types';

type CategoryFilter = 'All' | 'Frontend' | 'Backend' | 'Database' | 'AI Tools';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const categories: { id: CategoryFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Disciplines', icon: <Filter className="w-3.5 h-3.5" /> },
    { id: 'Frontend', label: 'Frontend', icon: <Layers className="w-3.5 h-3.5 text-teal-400" /> },
    { id: 'Backend', label: 'Backend', icon: <Terminal className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'Database', label: 'Database', icon: <Database className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'AI Tools', label: 'AI Tools', icon: <Sparkles className="w-3.5 h-3.5 text-teal-300" /> },
  ];

  const filteredTools =
    activeCategory === 'All'
      ? TECH_STACK_DATA
      : TECH_STACK_DATA.filter((tool) => tool.category === activeCategory);

  const getCategoryColor = (category: TechItem['category']) => {
    switch (category) {
      case 'Frontend':
        return 'text-teal-400 border-teal-500/30 bg-teal-500/10';
      case 'Backend':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'Database':
        return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'AI Tools':
        return 'text-teal-300 border-teal-400/30 bg-teal-400/10';
    }
  };

  return (
    <section id="tech-stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 block mb-2">
            02 // ARSENAL & PROFICIENCIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Tech Stack
          </h2>
        </div>
        <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase max-w-sm">
          Core toolchain evaluated by production reliability, latency profiles, and developer ergonomics.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                isActive
                  ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm shadow-teal-500/20'
                  : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.07] hover:text-zinc-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className="text-[10px] text-zinc-500 ml-1">
                (
                {cat.id === 'All'
                  ? TECH_STACK_DATA.length
                  : TECH_STACK_DATA.filter((t) => t.category === cat.id).length}
                )
              </span>
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => {
            const isHovered = hoveredTool === tool.name;

            return (
              <motion.div
                layout
                key={tool.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Glow on Hover */}
                <div
                  className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ backgroundColor: tool.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Tool Logo / Icon with light hover animation (scale and color-fill) */}
                    <div
                      className="relative w-12 h-12 rounded-xl bg-[#12141c] border border-white/10 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:border-teal-500/50"
                      style={{
                        boxShadow: isHovered
                          ? `0 0 16px ${tool.accentColor}33`
                          : 'none',
                      }}
                    >
                      <TechIcon
                        name={tool.iconSvg}
                        className="w-full h-full text-zinc-300 transition-colors duration-300 group-hover:text-white"
                        color={isHovered ? tool.accentColor : undefined}
                      />
                    </div>

                    {/* Category Pill */}
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-md border uppercase tracking-wider ${getCategoryColor(
                        tool.category
                      )}`}
                    >
                      {tool.category}
                    </span>
                  </div>

                  {/* Tool Title */}
                  <h3 className="text-base font-display font-bold text-white group-hover:text-teal-200 transition-colors mb-1">
                    {tool.name}
                  </h3>

                  {/* Tool Description */}
                  <p className="text-xs text-zinc-400 font-body leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom accent indicator */}
                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>PRODUCTION TESTED</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
