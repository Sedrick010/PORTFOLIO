'use client';

import React from 'react';
import { skillCategories } from '@/data/skills';
import SpotlightCard from './SpotlightCard';

export default function TechStack() {
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

  return (
    <section id="tech-stack">
      <div className="section-header">
        <div className="section-tag">// 02. TECH STACK &amp; TOOLS</div>
        <h2 className="section-title">Core Technologies &amp; Tooling</h2>
        <p className="section-desc">
          The languages, frameworks, databases, and architectural tools leveraged
          across my production software and systems.
        </p>
      </div>

      <div className="skills-matrix-wrapper">
        {skillCategories.map((category) => (
          <SpotlightCard
            key={category.title}
            className="skill-category-card"
            spotlightColor="rgba(56, 189, 248, 0.16)"
          >
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
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
