'use client';

import React from 'react';
import SpotlightCard from './SpotlightCard';

export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <div className="section-tag">About</div>
        <h2 className="section-title">Background &amp; Profile Summary</h2>
        <p className="section-desc">
          Academic distinction in Information Technology paired with hands-on systems architecture, multi-tenant databases, and full-stack engineering.
        </p>
      </div>

      <div className="about-cards-grid">
        {/* Featured Academic & Systems Background Card */}
        <SpotlightCard
          className="about-card about-card--featured"
          spotlightColor="rgba(56, 189, 248, 0.1)"
          style={{ gridColumn: 'span 2' }}
        >
          <div className="about-card-header">
            <div className="about-card-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div className="about-card-title-group">
              <h3>Cum Laude Academic Distinction</h3>
              <span className="about-card-subtitle">Bukidnon State University &bull; BS Information Technology</span>
            </div>
          </div>
          <p className="about-card-desc">
            Graduated with university honors with comprehensive coursework across software engineering, computer networking (Cisco CCNA 1&ndash;3), relational database management, and cybersecurity fundamentals.
          </p>
        </SpotlightCard>

        {/* Full-Stack Competency Card */}
        <SpotlightCard
          className="about-card"
          spotlightColor="rgba(56, 189, 248, 0.1)"
        >
          <div className="about-card-header">
            <div className="about-card-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div className="about-card-title-group">
              <h3>Full-Stack Application Development</h3>
              <span className="about-card-subtitle">React &bull; Next.js &bull; Node.js &bull; Laravel</span>
            </div>
          </div>
          <p className="about-card-desc">
            Building responsive client interfaces and robust server endpoints using modern component architectures, TypeScript typing, and REST API conventions.
          </p>
        </SpotlightCard>

        {/* Systems & Architecture Card */}
        <SpotlightCard
          className="about-card"
          spotlightColor="rgba(56, 189, 248, 0.1)"
        >
          <div className="about-card-header">
            <div className="about-card-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </div>
            <div className="about-card-title-group">
              <h3>Systems Architecture &amp; Data Isolation</h3>
              <span className="about-card-subtitle">MySQL &bull; MongoDB &bull; Redis &bull; Concurrency</span>
            </div>
          </div>
          <p className="about-card-desc">
            Hands-on implementation of dynamic multi-tenant schema isolation, row-level concurrency locking for multi-departmental document routing, and structured RBAC security.
          </p>
        </SpotlightCard>
      </div>
    </section>
  );
}
