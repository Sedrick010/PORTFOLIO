import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight, Copy, Check, Terminal, Send } from 'lucide-react';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryText, setInquiryText] = useState('');

  const handleCopy = (handle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(handle);
    setCopiedHandle(handle);
    setTimeout(() => {
      setCopiedHandle(null);
    }, 2000);
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryText('');
    }, 3500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-6 h-6" />;
      case 'Github':
        return <Github className="w-6 h-6" />;
      case 'Linkedin':
        return <Linkedin className="w-6 h-6" />;
      case 'Instagram':
        return <Instagram className="w-6 h-6" />;
      default:
        return <Mail className="w-6 h-6" />;
    }
  };

  return (
    <footer id="contact" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 inline-block mb-3">
          05 // INITIATE DIALOGUE
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Let’s build something <span className="text-teal-300">exceptional</span> together.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 font-body max-w-2xl mx-auto">
          Currently exploring high-leverage Staff/Principal engineering roles, architectural advisory, and selective enterprise contracts.
        </p>
      </div>

      {/* Social Links with Interactive Handle Hover Reveal & Copy */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SOCIAL_LINKS.map((link) => {
            const isHovered = hoveredPlatform === link.platform;
            const isCopied = copiedHandle === link.handle;

            return (
              <div
                key={link.platform}
                onMouseEnter={() => setHoveredPlatform(link.platform)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="relative flex flex-col items-center"
              >
                {/* Main clickable link card */}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-teal-500/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#12151e] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-teal-300 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300 mb-3 shadow-lg shadow-black/40">
                    {getIcon(link.iconName)}
                  </div>

                  <span className="font-display font-bold text-sm text-white group-hover:text-teal-200 transition-colors">
                    {link.platform}
                  </span>

                  <span className="text-[10px] font-mono text-zinc-500 mt-1 flex items-center gap-1 group-hover:text-zinc-300">
                    <span>Connect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>

                {/* Small Interactive Detail: Floating handle reveal pill on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute -top-12 z-20 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#0f121a] border border-teal-500/40 text-[11px] font-mono text-teal-200 shadow-xl shadow-black/80 flex items-center gap-2"
                    >
                      <span>{link.handle}</span>
                      <button
                        onClick={(e) => handleCopy(link.handle, e)}
                        className="hover:text-white p-0.5 rounded transition-colors"
                        title="Copy handle to clipboard"
                      >
                        {isCopied ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Global Active Handle Indicator Bar */}
        <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-zinc-500 uppercase tracking-wider">Active Channel:</span>
            <span className="text-teal-300 font-semibold">
              {hoveredPlatform
                ? SOCIAL_LINKS.find((s) => s.platform === hoveredPlatform)?.handle
                : 'alex.vance.dev@gmail.com (Hover any platform above)'}
            </span>
          </div>
          <button
            onClick={(e) =>
              handleCopy(
                hoveredPlatform
                  ? SOCIAL_LINKS.find((s) => s.platform === hoveredPlatform)?.handle || ''
                  : 'alex.vance.dev@gmail.com',
                e
              )
            }
            className="hover:text-white flex items-center gap-1.5 text-zinc-400 text-[11px] transition-colors"
          >
            {copiedHandle ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-teal-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Inquiry Terminal Card */}
      <div className="max-w-2xl mx-auto mb-20 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.07]">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 mb-3">
          <Terminal className="w-4 h-4" />
          <span>INSTANT MESSAGE DISPATCH</span>
        </div>
        <p className="text-sm text-zinc-300 font-body mb-4">
          Drop a quick note or proposal directly into the engineering inbox:
        </p>

        {inquirySent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-200 text-sm font-mono flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-teal-400 shrink-0" />
            <span>Message queued for transmission. Alex will follow up within 24 hours.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleQuickInquiry} className="space-y-3">
            <textarea
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              placeholder="Hi Alex, we are scaling an event-driven platform and would love your insight on..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#090b10] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-teal-400 transition-colors font-body resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95"
              >
                <span>Transmit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Footer Details */}
      <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Tailwind & Framer Motion.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>SF Hub (UTC-7)</span>
          </span>
          <span className="text-zinc-700">•</span>
          <a
            href="#hero"
            className="hover:text-teal-300 transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
