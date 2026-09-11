import React from 'react';
import { certifications } from '@/data/certifications';

interface CertificationsProps {
  onSelectCertificate: (imageSrc: string) => void;
}

export default function Certifications({ onSelectCertificate }: CertificationsProps) {
  const getCertIcon = (id: string) => {
    switch (id) {
      case 'topcit':
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
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        );
      case 'cyber':
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'dict':
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
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
        );
      case 'cisco1':
      case 'cisco2':
      case 'cisco3':
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
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
    }
  };

  return (
    <section id="certifications">
      <div className="section-header">
        <div className="section-tag">// 03. CREDENTIALS &amp; INDUSTRY STANDARDS</div>
        <h2 className="section-title">Certifications &amp; Competencies</h2>
        <p className="section-desc">
          Validated technical competencies in software development, computer
          networking, and cybersecurity.
        </p>
      </div>

      <div className="cert-grid">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="cert-card"
            onClick={() => onSelectCertificate(cert.image)}
            role="button"
            tabIndex={0}
            aria-label={`View certificate for ${cert.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectCertificate(cert.image);
              }
            }}
          >
            <div className="cert-header">
              <div className="cert-icon">{getCertIcon(cert.id)}</div>
              <div className="cert-title-group">
                <h3>{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
            </div>
            <p>{cert.description}</p>
            <span className="cert-view-link">View Certificate &rarr;</span>
          </div>
        ))}
      </div>
    </section>
  );
}
