'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ParticleWave = dynamic(() => import('@/components/ParticleWave'), {
  ssr: false,
  loading: () => <div className="hero-canvas-loading" aria-hidden="true" />,
});

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <ParticleWave />
    </div>
  );
}
