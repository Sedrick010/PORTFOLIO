'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import CertificateModal from '@/components/CertificateModal';
import ResumeModal from '@/components/ResumeModal';
import Toast, { ToastMessage } from '@/components/Toast';
import { Project } from '@/types';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleShowToast = (text: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero onOpenCV={() => setIsCVOpen(true)} />
        <About />
        <Projects onSelectProject={(p) => setSelectedProject(p)} />
        <Certifications onSelectCertificate={(img) => setSelectedCertificate(img)} />
        <Contact onShowToast={handleShowToast} />
      </main>

      <Footer />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        imageSrc={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <ResumeModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />

      {/* Global Toast Notification System */}
      <Toast toasts={toasts} />
    </>
  );
}
