'use client';

import React from 'react';
import SpotlightCard from './SpotlightCard';

export default function About() {
  const profileCards = [
    {
      title: 'Cum Laude Honors',
      subtitle: 'Bukidnon State University',
      desc: 'Graduated with academic distinction in IT, grounded in software engineering and database systems.',
      icon: (
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
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
    },
    {
      title: 'Full-Stack Engineering',
      subtitle: 'React • Next.js • Node • Laravel',
      desc: 'Building responsive user interfaces and production APIs with modern web frameworks.',
      icon: (
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
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      title: 'Systems & Architecture',
      subtitle: 'Relational Schemas & APIs',
      desc: 'Experience with multi-tenant schema isolation, concurrency control, and secure data pipelines.',
      icon: (
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
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
    },
    {
      title: 'Production Focus',
      subtitle: 'High-Integrity Code',
      desc: 'Dedicated to clean architecture, reliable performance, and dependable user outcomes.',
      icon: (
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="about">
      <div className="section-header">
        <div className="section-tag">// 01. ABOUT ME</div>
        <h2 className="section-title">Background &amp; Profile Summary</h2>
        <p className="section-desc">
          Academic distinction, software engineering philosophy, and hands-on systems background.
        </p>
      </div>

      <div className="about-cards-grid">
        {profileCards.map((card, idx) => (
          <SpotlightCard
            key={idx}
            className="about-card"
            spotlightColor="rgba(56, 189, 248, 0.16)"
          >
            <div className="about-card-header">
              <div className="about-card-icon">{card.icon}</div>
              <div className="about-card-title-group">
                <h3>{card.title}</h3>
                <span className="about-card-subtitle">{card.subtitle}</span>
              </div>
            </div>
            <p className="about-card-desc">{card.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
