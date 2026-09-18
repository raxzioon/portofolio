import React, { useState } from 'react';
import { Rocket, Heart } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [isLaunching, setIsLaunching] = useState(false);

  const scrollToTop = () => {
    setIsLaunching(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  return (
    <footer className="relative border-t border-blue-500/20 bg-[#02040b] pt-16 pb-12 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2c67ed] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-blue-500/15">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-white font-['Space_Grotesk',sans-serif] tracking-wider">
                razxs<span className="text-[#2c67ed] drop-shadow-[0_0_12px_rgba(44,103,237,0.9)] animate-pulse">_</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Membangun pengalaman web modern dan futuristik dengan ketelitian kode dan hasrat eksplorasi teknologi.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium">
            <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">About Me</a>
            <a href="#portfolio" className="hover:text-cyan-300 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Kontak</a>
          </div>

          {/* Back to Top Rocket Button */}
          <div>
            <button
              onClick={scrollToTop}
              className="px-5 py-2.5 rounded-full bg-[#09122c] hover:bg-blue-900/60 border border-blue-500/30 hover:border-blue-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(44,103,237,0.2)] hover:shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all group"
              title="Kembali ke Atas"
            >
              <Rocket className={`w-4 h-4 text-cyan-400 transition-transform duration-500 ${isLaunching ? '-translate-y-2 rotate-45 text-yellow-300' : 'group-hover:-translate-y-0.5'}`} />
              <span>Kembali ke Atas</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p className="flex items-center gap-1 select-none">
            <span 
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-modal'))}
              className="cursor-default"
            >
              © {new Date().getFullYear()} {personalData.name}.
            </span>
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500 animate-pulse" />
            <span>menggunakan React + Tailwind CSS + Framer Motion.</span>
          </p>

          <div className="flex items-center gap-4">
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personalData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
