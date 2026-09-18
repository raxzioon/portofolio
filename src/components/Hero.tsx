import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Send, 
  Phone, 
  Mail, 
  MessageCircle 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export const Hero: React.FC = () => {
  // Typewriter effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const titles = personalData.typingTitles;
    const fullText = titles[currentTextIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText === fullText) {
          // Pause at end
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typingSpeed]);

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="hero-mobile-fullscreen relative w-full flex flex-col justify-between items-center pt-16 pb-4 sm:pt-28 sm:pb-16 px-4 overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background Cosmic Glow Spots */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] h-[300px] sm:h-[650px] bg-[#2c67ed]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[180px] h-[180px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
      
      {/* Orbit Rings (Aesthetic SVG Background) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[420px] h-[420px] sm:w-[750px] sm:h-[750px] rounded-full border border-blue-500/30 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-cyan-400/20 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col justify-between items-center w-full h-full flex-1">
        
        {/* TOP & MIDDLE HERO CONTENT */}
        <div className="flex flex-col items-center w-full my-auto pt-2 sm:pt-0">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-blue-500/30 text-[10px] sm:text-xs text-blue-300 mb-3 sm:mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(44,103,237,0.25)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-300 tracking-wide">{personalData.status}</span>
          </motion.div>

          {/* Eyebrow Text: Hello & Welcome */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-cyan-300 uppercase mb-1 sm:mb-2 font-mono"
          >
            HELLO &amp; WELCOME, I AM
          </motion.div>

          {/* Large Name: Adzka Arroya */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-2 font-['Space_Grotesk',sans-serif] leading-tight"
          >
            <span className="block sm:inline">ADZKA </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#2c67ed] to-cyan-300 drop-shadow-[0_0_20px_rgba(44,103,237,0.7)]">
              ARROYA
            </span>
          </motion.h1>

          {/* Stable Height Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="min-h-[28px] sm:min-h-[38px] flex items-center justify-center mb-3 sm:mb-4 px-2 text-center"
          >
            <span className="text-sm sm:text-xl font-medium text-slate-300 flex items-center flex-wrap justify-center">
              Seorang{' '}
              <span className="text-[#38bdf8] font-bold ml-1.5 font-mono drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
                {currentText}
              </span>
              <span className="inline-block w-0.5 sm:w-1 h-3.5 sm:h-5 bg-[#2c67ed] ml-1 animate-pulse shadow-[0_0_8px_#2c67ed]" />
            </span>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xs sm:max-w-xl text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4 sm:mb-6 px-1 sm:px-0 mx-auto"
          >
            {personalData.bio}
          </motion.p>
        </div>

        {/* BOTTOM CONTENT: ACTION BUTTONS + CONTACT BAR */}
        <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center gap-2.5 sm:gap-3 pb-2 pt-2">
          {/* Primary Button: Full-width on Mobile */}
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            className="w-full py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-[#2c67ed] to-cyan-400 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] hover:shadow-[0_0_30px_rgba(44,103,237,0.8)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
          >
            <span>JELAJAHI PORTFOLIO</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Row: 2 Equal Columns on Mobile */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="py-2.5 px-3 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 font-semibold text-[11px] sm:text-xs uppercase tracking-wide border border-blue-500/30 hover:border-blue-400/60 flex items-center justify-center gap-1.5 backdrop-blur-md shadow-[0_0_12px_rgba(44,103,237,0.15)] active:scale-95 transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hubungi Saya</span>
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="py-2.5 px-3 rounded-full bg-blue-950/40 hover:bg-blue-900/40 text-blue-300 font-medium text-[11px] sm:text-xs uppercase tracking-wide border border-blue-500/25 hover:border-blue-400/40 flex items-center justify-center gap-1.5 active:scale-95 transition-all duration-300"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-300" />
              <span>Unduh CV</span>
            </a>
          </div>

          {/* Bottom Direct Contacts */}
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-3 border-t border-blue-500/15 w-full">
            <span className="font-medium text-slate-400 text-[11px]">Kontak:</span>

            {/* Phone */}
            <a
              href={`tel:${personalData.phone}`}
              className="w-8 h-8 rounded-full bg-slate-900/85 border border-blue-500/30 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(44,103,237,0.5)] flex items-center justify-center active:scale-95 transition-all"
              aria-label="Telepon"
              title="Telepon"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${personalData.email}`}
              className="w-8 h-8 rounded-full bg-slate-900/85 border border-blue-500/30 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(44,103,237,0.5)] flex items-center justify-center active:scale-95 transition-all"
              aria-label="Email"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            {/* WhatsApp */}
            <a
              href={personalData.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-900/85 border border-blue-500/30 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(44,103,237,0.5)] flex items-center justify-center active:scale-95 transition-all"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            {/* LinkedIn */}
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-900/85 border border-blue-500/30 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(44,103,237,0.5)] flex items-center justify-center active:scale-95 transition-all"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            {/* GitHub */}
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-900/85 border border-blue-500/30 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(44,103,237,0.5)] flex items-center justify-center active:scale-95 transition-all"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
