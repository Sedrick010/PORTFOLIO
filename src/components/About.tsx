import React from 'react';
import { skillCategories, engineeringFocusList } from '@/data/skills';

export default function About() {
  const renderCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'code':
        return (
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
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'database':
        return (
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
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        );
      case 'cpu':
      default:
        return (
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
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
    }
  };

  const renderFocusIcon = (icon: string) => {
    switch (icon) {
      case 'pulse':
        return (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        );
      case 'layers':
        return (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
      case 'lock':
      default:
        return (
          <svg
            width="22"
            height="22"
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
        );
    }
  };

  return (
    <section id="about">
      <div className="section-header">
        <div className="section-tag">// 01. TECHNICAL EXPERTISE</div>
        <h2 className="section-title">Engineering Architecture &amp; Stack</h2>
        <p className="section-desc">
          Recent <strong>IT graduate (Cum Laude)</strong> from{' '}
          <strong>Bukidnon State University</strong>. Focused on architecting
          scalable web applications, robust database schemas, and dependable
          clinical administrative systems.
        </p>
      </div>

      <div className="about-grid">
        {/* 3-Pillar Skills Matrix */}
        <div className="skills-matrix-wrapper">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category-card">
              <div className="category-header">
                <div className="category-icon">
                  {renderCategoryIcon(category.icon)}
                </div>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-tags-group">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Focus Highlights */}
        <div className="engineering-focus-grid">
          {engineeringFocusList.map((focus) => (
            <div key={focus.title} className="focus-card">
              <div className="focus-card-icon">
                {renderFocusIcon(focus.icon)}
              </div>
              <h4>{focus.title}</h4>
              <p>{focus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
