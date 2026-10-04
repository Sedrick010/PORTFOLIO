'use client';

import React, { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#tech-stack', label: 'Tech Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const navRef = useRef<HTMLElement>(null);

  // Initialize theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  };

  // Close mobile menu on Escape key and outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Active section scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute('id');
        if (id && scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={navRef}>
      <div className="nav-container">
        <a
          href="#home"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          aria-label="Sedrick James Camiguing Home"
        >
          <span className="logo-bracket">&lt;</span>SJC
          <span className="logo-bracket"> /&gt;</span>
        </a>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-right-actions">
          {/* Theme Mode Toggle (R-21 / R-34) */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Mobile Hamburger Toggle (44x44px touch target) */}
          <button
            className="menu-toggle"
            id="mobile-menu"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
