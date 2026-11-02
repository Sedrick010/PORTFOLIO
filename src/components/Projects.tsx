'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Project } from '@/types';
import { projects } from '@/data/projects';
import './Projects.css';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'system' | 'web'>('all');
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxScrollXRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filter === 'all') return true;
      return p.category === filter;
    });
  }, [filter]);

  // Check for mobile breakpoint (< 768px) and prefers-reduced-motion
  useEffect(() => {
    const checkState = () => {
      const isMobile = window.innerWidth < 768;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobileOrReduced(isMobile || reduced);
    };

    checkState();
    window.addEventListener('resize', checkState);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkState);

    return () => {
      window.removeEventListener('resize', checkState);
      mediaQuery.removeEventListener('change', checkState);
    };
  }, []);

  // Measure the total horizontal overflow (1:1 vertical scroll distance)
  const measure = useCallback(() => {
    if (isMobileOrReduced) {
      maxScrollXRef.current = 0;
      setScrollDistance(0);
      return;
    }

    const track = trackRef.current;
    const trackWrapper = trackWrapperRef.current;
    if (!track || !trackWrapper) return;

    const overflow = track.scrollWidth - trackWrapper.clientWidth;
    const maxScroll = Math.max(0, overflow);
    maxScrollXRef.current = maxScroll;
    setScrollDistance(maxScroll);
  }, [isMobileOrReduced]);

  useEffect(() => {
    measure();
  }, [filteredProjects, measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(track);

    if (trackWrapperRef.current) {
      ro.observe(trackWrapperRef.current);
    }

    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Update horizontal position 1:1 with vertical page scroll
  const updateScroll = useCallback(() => {
    if (isMobileOrReduced) {
      if (trackRef.current) {
        trackRef.current.style.transform = '';
      }
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const rect = container.getBoundingClientRect();
    const totalVertical = container.offsetHeight - window.innerHeight;

    if (totalVertical <= 0 || maxScrollXRef.current <= 0) {
      track.style.transform = 'translate3d(0px, 0, 0)';
      setScrollProgress(0);
      return;
    }

    const scrolled = -rect.top;
    const rawProgress = scrolled / totalVertical;
    const progress = Math.min(Math.max(rawProgress, 0), 1);

    const translateX = -progress * maxScrollXRef.current;
    track.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0)`;
    setScrollProgress(progress);
  }, [isMobileOrReduced]);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateScroll();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateScroll]);

  // Handle image load to ensure accurate scrollWidth
  const handleImageLoad = () => {
    measure();
    updateScroll();
  };

  // Keyboard accessibility: when tabbing to a card, smoothly bring it into view
  const handleCardFocus = (index: number) => {
    if (isMobileOrReduced || maxScrollXRef.current <= 0) return;
    const container = containerRef.current;
    if (!container) return;
    const targetProgress = index / Math.max(1, filteredProjects.length - 1);
    const containerTop = container.offsetTop;
    const totalVertical = container.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + targetProgress * totalVertical;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const currentProjectIndex = Math.min(
    filteredProjects.length - 1,
    Math.floor(scrollProgress * filteredProjects.length)
  );

  const wrapperHeight = isMobileOrReduced || scrollDistance <= 0
    ? 'auto'
    : `calc(100vh + ${scrollDistance}px)`;

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`pinned-projects-wrapper ${isMobileOrReduced ? 'is-mobile-or-reduced' : ''}`}
      style={{ minHeight: wrapperHeight }}
    >
      <div ref={stickyRef} className="pinned-projects-sticky">
        <div className="section-header pinned-projects-header">
          <div className="section-tag">Featured Systems</div>
          <h2 className="section-title">Production Systems &amp; Architecture</h2>
          <p className="section-desc">
            Interactive showcase of production-grade administrative platforms,
            clinical workflows, and multi-tenant architectures.
          </p>
        </div>

        <div className="projects-header-actions pinned-projects-actions">
          <button
            type="button"
            data-hover-fx
            data-hover-accent="blue"
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setFilter('all');
            }}
          >
            All Systems ({projects.length})
          </button>
          <button
            type="button"
            data-hover-fx
            data-hover-accent="blue"
            className={`filter-pill ${filter === 'system' ? 'active' : ''}`}
            onClick={() => {
              setFilter('system');
            }}
          >
            Enterprise Platforms (2)
          </button>
          <button
            type="button"
            data-hover-fx
            data-hover-accent="blue"
            className={`filter-pill ${filter === 'web' ? 'active' : ''}`}
            onClick={() => {
              setFilter('web');
            }}
          >
            Clinical Web Apps (1)
          </button>
        </div>

        <div ref={trackWrapperRef} className="pinned-projects-track-container">
          <div ref={trackRef} className="pinned-projects-track">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-pinned-card"
                data-hover-fx
                data-hover-accent="orange"
                onClick={() => onSelectProject(project)}
                onFocus={() => handleCardFocus(index)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
              >
                <div className="project-card-image-wrapper">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="project-card-img"
                    loading="lazy"
                    onLoad={handleImageLoad}
                  />
                  <div className="project-card-gradient" />
                </div>

                <div className="project-card-top-bar">
                  <div className="project-card-badges">
                    {project.badges?.map((b, bi) => (
                      <span key={bi} className={`project-badge badge-${b.type}`}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                  <span className="project-card-index">0{index + 1}</span>
                </div>

                <div className="project-card-bottom">
                  <span className="project-card-role">{project.role}</span>
                  <h3 className="project-card-title">{project.title}</h3>

                  <div className="project-card-tech-preview">
                    {project.tech?.slice(0, 3).map((t, ti) => (
                      <span key={ti} className="project-tech-pill">
                        {t}
                      </span>
                    ))}
                    {project.tech && project.tech.length > 3 && (
                      <span className="project-tech-more">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="project-card-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    aria-label={`View full details for ${project.title}`}
                  >
                    <span>View Details</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isMobileOrReduced && scrollDistance > 0 && (
          <div className="pinned-projects-footer" aria-hidden="true">
            <div className="pinned-progress-track">
              <div
                className="pinned-progress-bar"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <div className="pinned-scroll-counter">
              <span className="pinned-active-num">0{currentProjectIndex + 1}</span>
              <span className="pinned-divider">/</span>
              <span className="pinned-total-num">0{filteredProjects.length}</span>
              <span className="pinned-scroll-hint">• Scroll to explore systems</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
