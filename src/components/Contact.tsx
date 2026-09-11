'use client';

import React from 'react';

interface ContactProps {
  onShowToast: (message: string) => void;
}

const PRIMARY_EMAIL = 'camiguingsedrick0@gmail.com';

export default function Contact({ onShowToast }: ContactProps) {
  const handleCopyEmail = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(PRIMARY_EMAIL)
        .then(() => {
          onShowToast(`Copied ${PRIMARY_EMAIL} to clipboard! 📋`);
        })
        .catch(() => {
          fallbackCopy(PRIMARY_EMAIL);
        });
    } else {
      fallbackCopy(PRIMARY_EMAIL);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      onShowToast(`Copied ${PRIMARY_EMAIL} to clipboard! 📋`);
    } catch {
      onShowToast(`Email: ${PRIMARY_EMAIL}`);
    }
    document.body.removeChild(textArea);
  };

  return (
    <section id="contact">
      <div className="section-header">
        <div className="section-tag">// 04. GET IN TOUCH</div>
        <h2 className="section-title">Let&apos;s Connect &amp; Build</h2>
        <p className="section-desc">
          I am actively seeking{' '}
          <strong>
            full-time full-stack and backend software engineer opportunities
          </strong>{' '}
          (local or remote).
        </p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-card">
          <div
            className="contact-row"
            onClick={handleCopyEmail}
            role="button"
            tabIndex={0}
            aria-label="Copy professional email address"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCopyEmail();
              }
            }}
          >
            <div className="contact-row-left">
              <div className="contact-icon-box">
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <span className="contact-label">Direct Email</span>
                <span className="contact-value">{PRIMARY_EMAIL}</span>
              </div>
            </div>
            <span className="contact-copy-btn">
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
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Click to Copy
            </span>
          </div>
        </div>

        <div className="contact-actions">
          <a
            href="https://github.com/Sedrick010"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
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
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub Profile
          </a>
          <a
            href="https://www.linkedin.com/in/sedrick-james-camiguing-a7076639b"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
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
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn Profile
          </a>
          <a
            href={`mailto:${PRIMARY_EMAIL}`}
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Send an Email
          </a>
        </div>
      </div>
    </section>
  );
}
