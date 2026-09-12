'use client';

import React from 'react';

export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <div className="section-tag">// 01. ABOUT ME</div>
        <h2 className="section-title">Background &amp; Profile Summary</h2>
        <p className="section-desc">
          Academic foundation, software engineering philosophy, and hands-on systems background.
        </p>
      </div>

      <div className="about-summary-layout">
        {/* Main Narrative Card */}
        <div className="about-bio-card">
          <p className="about-bio-lead">
            I am a <strong>Full-Stack Software Engineer</strong> and recent{' '}
            <strong>IT graduate (Cum Laude)</strong> from{' '}
            <strong>Bukidnon State University</strong>. I specialize in architecting
            production-ready web applications, scalable database systems, and robust
            administrative platforms.
          </p>

          <p className="about-bio-text">
            My development background focuses on engineering mission-critical software:
            from dynamic multi-tenant schema isolation in veterinary clinic systems, to
            atomic slot-reservation algorithms with strict conflict detection for
            university health services, and row-level concurrency locking for provincial
            property assessment filing.
          </p>

          <p className="about-bio-text">
            I bridge clean frontend engineering in <strong>React</strong> and{' '}
            <strong>Next.js</strong> with battle-tested backend services in{' '}
            <strong>Node.js</strong> and <strong>Laravel</strong>. Committed to
            high-integrity code, scalable relational architectures, and dependable user
            outcomes.
          </p>
        </div>

        {/* Structured Highlight Stats */}
        <div className="about-highlights-grid">
          <div className="about-stat-card">
            <div className="about-stat-icon">
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
            </div>
            <h3 className="about-stat-title">Cum Laude Honor</h3>
            <p className="about-stat-desc">
              Graduated with academic distinction (BS in Information Technology) from Bukidnon State University.
            </p>
          </div>

          <div className="about-stat-card">
            <div className="about-stat-icon">
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
            </div>
            <h3 className="about-stat-title">Full-Stack Development</h3>
            <p className="about-stat-desc">
              Extensive hands-on experience building reactive UIs and production APIs with Next.js, Node, and Laravel.
            </p>
          </div>

          <div className="about-stat-card">
            <div className="about-stat-icon">
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
            </div>
            <h3 className="about-stat-title">Multi-Tenant Systems</h3>
            <p className="about-stat-desc">
              Designed isolated database schema middleware, optimistic concurrency control, and audit-ready pipelines.
            </p>
          </div>

          <div className="about-stat-card">
            <div className="about-stat-icon">
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h3 className="about-stat-title">Ready for Opportunities</h3>
            <p className="about-stat-desc">
              Actively available for full-time and remote software engineering positions locally and globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
