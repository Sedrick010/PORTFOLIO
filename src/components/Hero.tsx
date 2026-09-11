'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenCV: () => void;
}

export default function Hero({ onOpenCV }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full-Stack Software Engineer';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setTypedText(fullText);
      return;
    }

    let index = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const typeLoop = () => {
      setTypedText(fullText.substring(0, index));

      if (!isDeleting && index < fullText.length) {
        index += 1;
        timer = setTimeout(typeLoop, 65);
      } else if (!isDeleting && index === fullText.length) {
        isDeleting = true;
        timer = setTimeout(typeLoop, 2200);
      } else if (isDeleting && index > 0) {
        index -= 1;
        timer = setTimeout(typeLoop, 35);
      } else {
        isDeleting = false;
        timer = setTimeout(typeLoop, 600);
      }
    };

    typeLoop();
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-split">
      <div className="hero-text">
        {/* Availability Status Pill */}
        <div className="status-pill">
          <span className="beacon">
            <span className="beacon-ping"></span>
            <span className="beacon-dot"></span>
          </span>
          <span>Available for full-time &amp; remote roles</span>
        </div>

        <div className="hero-greeting">// SOFTWARE ENGINEER &amp; SYSTEMS DEVELOPER</div>
        <h1 className="hero-name">
          Sedrick James
          <br />
          <span className="gradient-text">Camiguing</span>
        </h1>

        <div className="hero-role-wrapper">
          <span className="typing-text">{typedText}</span>
          <span className="typing-caret" aria-hidden="true"></span>
        </div>

        <p className="hero-desc">
          Full-stack developer specializing in <strong>React</strong>,{' '}
          <strong>Node.js</strong>, and <strong>Laravel</strong>. I build
          production-ready administrative systems, clinical workflows, and
          scalable multi-tenant platforms.
        </p>

        <div className="hero-badges">
          <span className="metadata-badge">
            <svg
              width="15"
              height="15"
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
            Cum Laude, IT (BukSU)
          </span>
          <span className="metadata-badge">
            <svg
              width="15"
              height="15"
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
            Web Systems OJT Experience
          </span>
          <span className="metadata-badge">
            <svg
              width="15"
              height="15"
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
            Multi-Tenant Architecture
          </span>
        </div>

        <div className="btn-group">
          <button onClick={onOpenCV} className="btn-primary" type="button">
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
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            View Resume
          </button>
          <a href="#contact" onClick={scrollToContact} className="btn-outline">
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Get In Touch
          </a>
        </div>
      </div>

      <div className="hero-image-container">
        <div className="photo-wrapper">
          <div className="photo-glow"></div>
          <Image
            src="/images/pic.png"
            alt="Sedrick James Camiguing"
            width={480}
            height={560}
            priority
            className="profile-photo"
          />
        </div>
      </div>
    </section>
  );
}
