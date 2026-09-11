'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal active"
      style={{ display: 'flex' }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Preview Modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-container cv-modal-container">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close resume viewer"
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
        <div className="cv-scroll-area">
          <Image
            src="/images/resume.png"
            alt="Sedrick James Camiguing Resume Preview"
            width={850}
            height={1100}
            className="cv-preview-img"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div className="cv-download-bar">
          <a
            href="/resume.pdf"
            download="Sedrick_Camiguing_CV.pdf"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
