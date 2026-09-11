'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface CertificateModalProps {
  imageSrc: string | null;
  onClose: () => void;
}

export default function CertificateModal({
  imageSrc,
  onClose,
}: CertificateModalProps) {
  useEffect(() => {
    if (!imageSrc) return;

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
  }, [imageSrc, onClose]);

  if (!imageSrc) return null;

  return (
    <div
      className="modal active"
      style={{ display: 'flex' }}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate Image Viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-container image-modal-container">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close certificate image"
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
        <Image
          src={imageSrc}
          alt="Credential Certificate"
          width={1000}
          height={750}
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-sm)',
          }}
        />
      </div>
    </div>
  );
}
