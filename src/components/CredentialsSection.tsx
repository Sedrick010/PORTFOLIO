import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Award, Shield, Cloud, Terminal, Cpu, CheckCircle } from 'lucide-react';
import { CREDENTIALS_DATA } from '../data/portfolioData';
import { Credential } from '../types';

export const CredentialsSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const getBadgeIcon = (type: Credential['badgeType'], color: string) => {
    switch (type) {
      case 'cloud':
        return <Cloud className="w-6 h-6" style={{ color }} />;
      case 'kubernetes':
        return <Terminal className="w-6 h-6" style={{ color }} />;
      case 'ai':
        return <Cpu className="w-6 h-6" style={{ color }} />;
      case 'award':
        return <Award className="w-6 h-6" style={{ color }} />;
      case 'architecture':
      default:
        return <Shield className="w-6 h-6" style={{ color }} />;
    }
  };

  return (
    <section id="credentials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header with Carousel Navigation Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 block mb-2">
            04 // CERTIFICATIONS & RECOGNITION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Credentials & Honors
          </h2>
        </div>

        {/* Carousel Prev/Next Controls */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-zinc-400 mr-2">
            <span className="text-teal-300 font-bold">0{selectedIndex + 1}</span>
            <span className="text-zinc-600"> / 0{CREDENTIALS_DATA.length}</span>
          </div>

          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
              prevBtnDisabled
                ? 'border-white/[0.05] text-zinc-600 cursor-not-allowed bg-transparent'
                : 'border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-teal-500/40 active:scale-95'
            }`}
            aria-label="Previous Credential"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
              nextBtnDisabled
                ? 'border-white/[0.05] text-zinc-600 cursor-not-allowed bg-transparent'
                : 'border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-teal-500/40 active:scale-95'
            }`}
            aria-label="Next Credential"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex -ml-4 sm:-ml-6 py-2">
          {CREDENTIALS_DATA.map((cred) => (
            <div
              key={cred.id}
              className="flex-[0_0_88%] sm:flex-[0_0_55%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] pl-4 sm:pl-6 min-w-0"
            >
              <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/40 hover:bg-white/[0.04] transition-all duration-300 group">
                <div>
                  {/* Top Badge & Issuer row */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl bg-[#12151e] border border-white/10 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105"
                      style={{ boxShadow: `0 0 20px ${cred.badgeColor}22` }}
                    >
                      {getBadgeIcon(cred.badgeType, cred.badgeColor)}
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-400">
                      <CheckCircle className="w-3 h-3 text-teal-400" />
                      <span>{cred.issueDate}</span>
                    </div>
                  </div>

                  {/* Issuing Organization */}
                  <div className="text-xs font-mono text-teal-300 tracking-wider uppercase mb-1">
                    {cred.issuer}
                  </div>

                  {/* Credential Name */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors mb-3 leading-snug">
                    {cred.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-body leading-relaxed mb-4">
                    {cred.description}
                  </p>
                </div>

                {/* Footer with Credential ID */}
                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>ID: {cred.credentialId}</span>
                  <span className="text-teal-400/80 group-hover:text-teal-300 transition-colors">
                    Verified Credential
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swipe prompt hint on mobile */}
      <div className="flex sm:hidden justify-center items-center gap-2 mt-4 text-[11px] font-mono text-zinc-500">
        <span>← Swipe horizontally to explore credentials →</span>
      </div>
    </section>
  );
};
