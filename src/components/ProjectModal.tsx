'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import hljs from 'highlight.js';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const codeRef = useRef<HTMLElement>(null);

  // Reset active image on project change
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Run highlight.js on code snippet
  useEffect(() => {
    if (project?.codeSnippet && codeRef.current) {
      codeRef.current.removeAttribute('data-highlighted');
      hljs.highlightElement(codeRef.current);
    }
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="modal active"
      style={{ display: 'flex' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="projectTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-container project-modal-container">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="project-modal-split">
          {/* Gallery Column */}
          <div className="modal-gallery">
            <div className="modal-main-img-frame">
              <Image
                src={project.images[activeImageIndex] || project.images[0]}
                alt={`${project.title} Preview ${activeImageIndex + 1}`}
                width={700}
                height={400}
                className="modal-main-image"
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </div>
            {project.images.length > 1 && (
              <div className="modal-thumb-strip">
                {project.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`modal-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Show image ${idx + 1}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      width={90}
                      height={60}
                      className={`modal-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="modal-details">
            <h2 id="projectTitle">{project.title}</h2>
            <div className="modal-role-badge">{project.role}</div>

            <div className="modal-section">
              <h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Problem &amp; Operational Context
              </h3>
              <p>{project.problem}</p>
            </div>

            <div className="modal-section">
              <h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
                System Architecture
              </h3>
              <p>{project.architecture}</p>
            </div>

            <div className="modal-section">
              <h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Key Technical Features
              </h3>
              <ul className="modal-features-list">
                {project.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Technologies Used
              </h3>
              <div className="modal-tags">
                {project.tech.map((t) => (
                  <span key={t} className="skill-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.codeSnippet && (
              <div className="modal-section">
                <h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  Architectural Code Implementation
                </h3>
                <pre style={{ marginTop: '8px' }}>
                  <code
                    ref={codeRef}
                    className={`language-${project.codeSnippet.language}`}
                  >
                    {project.codeSnippet.code}
                  </code>
                </pre>
              </div>
            )}

            <div className="modal-actions">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View Source Repository
                </a>
              ) : (
                <div
                  className="metadata-badge"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '10px 18px',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Private Enterprise Repository (Protected Institutional IP)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
