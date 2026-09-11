'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Project } from '@/types';
import { projects } from '@/data/projects';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'web'>('all');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    });
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [filter, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section id="projects">
      <div className="section-header">
        <div className="section-tag">// 02. CASE STUDIES &amp; SYSTEMS</div>
        <h2 className="section-title">Production Systems &amp; Architecture</h2>
        <p className="section-desc">
          Detailed engineering breakdowns of production administrative systems,
          clinical platforms, and multi-tenant architectures.
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

      {/* Embla Carousel */}
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {filteredProjects.map((project) => (
              <div key={project.id} className="embla__slide">
                <div className="project-card">
                  <div
                    className="card-media"
                    onClick={() => onSelectProject(project)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${project.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectProject(project);
                      }
                    }}
                  >
                    <div className="card-badge-overlay">
                      {project.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`badge-tag badge-${badge.type}`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={600}
                      height={340}
                      className="project-cover-img"
                    />
                  </div>

                  <div className="card-content">
                    <h3>{project.title}</h3>
                    <ul className="engineering-breakdown">
                      <li className="breakdown-item">
                        <span className="breakdown-label">Context &amp; Problem</span>
                        {project.problem}
                      </li>
                      <li className="breakdown-item">
                        <span className="breakdown-label">
                          Technical Architecture
                        </span>
                        {project.architecture}
                      </li>
                      <li className="breakdown-item">
                        <span className="breakdown-label">Impact &amp; Access</span>
                        {project.impact}
                      </li>
                    </ul>

                    <div className="card-tech-stack">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="btn-card-action"
                      onClick={() => onSelectProject(project)}
                    >
                      View Architecture &amp; Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embla Navigation Controls */}
        <div className="embla-controls">
          <button
            type="button"
            className="embla-nav-btn embla__prev"
            aria-label="Previous project slide"
            onClick={scrollPrev}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="embla-dots embla__dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`embla-dot ${index === selectedIndex ? 'is-active' : ''}`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="embla-nav-btn embla__next"
            aria-label="Next project slide"
            onClick={scrollNext}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
