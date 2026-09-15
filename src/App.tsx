import React from 'react';
import { OpeningReveal } from './components/OpeningReveal';
import { BackgroundMotion } from './components/BackgroundMotion';
import Navbar from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#090b10] text-[#e2e8f0] font-body selection:bg-teal-500/30 selection:text-teal-200">
      {/* 1. OPENING REVEAL (Skippable, under 1.5s, split-panel curtain wipe) */}
      <OpeningReveal />

      {/* Motion Canvas Background (Teal/Orange/Gold particles & ambient radial light) */}
      <BackgroundMotion />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Single-Page Scroll Content (Rendered immediately underneath) */}
      <main className="relative z-10">
        {/* 2. HERO SECTION */}
        <HeroSection />

        {/* 3. ABOUT ME SECTION */}
        <AboutSection />

        {/* 4. TECH STACK SECTION */}
        <TechStackSection />

        {/* 5. PROJECTS SECTION */}
        <ProjectsSection />

        {/* 6. CREDENTIALS SECTION */}
        <CredentialsSection />

        {/* 7. CONTACT SECTION */}
        <ContactSection />
      </main>
    </div>
  );
}
