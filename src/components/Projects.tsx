'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/types';
import { projects } from '@/data/projects';
import DepthCarousel, { DepthCarouselItem } from './DepthCarousel';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'web'>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filter === 'all') return true;
      return p.category === filter;
    });
  }, [filter]);

  const carouselItems: DepthCarouselItem[] = useMemo(() => {
    return filteredProjects.map((project) => ({
      image: project.images[0],
      alt: project.title,
      title: project.title,
      project,
      onSelect: () => onSelectProject(project),
    }));
  }, [filteredProjects, onSelectProject]);

  return (
    <section id="projects">
      <div className="section-header">
        <div className="section-tag">// 03. PROJECTS &amp; SYSTEMS</div>
        <h2 className="section-title">Production Systems &amp; Architecture</h2>
        <p className="section-desc">
          Interactive showcase of production-grade administrative platforms,
          clinical workflows, and multi-tenant architectures.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="projects-header-actions">
        <button
          type="button"
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Systems
        </button>
        <button
          type="button"
          className={`filter-pill ${filter === 'web' ? 'active' : ''}`}
          onClick={() => setFilter('web')}
        >
          Production Platforms
        </button>
      </div>

      {/* 3D Depth Carousel */}
      <div
        className="projects-carousel-container"
        style={{
          height: '520px',
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <DepthCarousel
          items={carouselItems}
          depth={260}
          spread={120}
          tilt={18}
          tiltDirection="right"
          perspective={1400}
          visibleCards={3}
          falloff={0.22}
          blur={5}
          autoplay={false}
          loop={true}
          cardWidth={480}
          cardHeight={360}
          radius={20}
          tint="#05060a"
          duration={750}
          showControls={true}
          showIndicators={true}
        />
      </div>
    </section>
  );
}
