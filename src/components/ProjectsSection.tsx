import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 block mb-2">
            03 // SELECTED WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>
        <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase max-w-xs">
          Select any case study to review architecture blueprints, benchmarks, and outcomes.
        </p>
      </div>

      {/* Grid of Cards Showing Strictly: Thumbnail, Title, and One-Line Tagline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="flex flex-col"
          >
            <button
              onClick={() => setSelectedProject(project)}
              className="group text-left w-full h-full flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-teal-500/50 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-haspopup="dialog"
              aria-label={`Inspect case study for ${project.title}`}
            >
              {/* 1. Thumbnail Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#12151e]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-80" />

                {/* Subtle Hover Action Indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-zinc-300 opacity-0 group-hover:opacity-100 group-hover:text-teal-300 transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text block showing strictly Title and Tagline */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* 2. Title */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-teal-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* 3. One-line Tagline */}
                  <p className="mt-2 text-sm text-zinc-400 font-body leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Subtle read cue */}
                <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-teal-400 transition-colors">
                  <span>Read Full Case Study</span>
                  <span>→</span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Accessible Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
