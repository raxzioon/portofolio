import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Send, 
  Terminal, 
  Code2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
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
      className="relative min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Cosmic Glow Spots */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] bg-[#2c67ed]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
      
      {/* Orbit Rings (Aesthetic SVG Background) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[450px] h-[450px] sm:w-[750px] sm:h-[750px] rounded-full border border-blue-500/30 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-cyan-400/20 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center w-full">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-blue-500/30 text-[11px] sm:text-xs text-blue-300 mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(44,103,237,0.25)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-300 tracking-wide">{personalData.status}</span>
        </motion.div>

        {/* Large Name with Cosmic Glow */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2 font-['Space_Grotesk',sans-serif] px-2"
        >
          Hi, Saya{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#2c67ed] to-cyan-300 drop-shadow-[0_0_20px_rgba(44,103,237,0.7)]">
            {personalData.name}
          </span>
        </motion.h1>

        {/* Stable Height Typewriter Container (Zero Layout Shift) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-1.5 mb-3 px-2 text-center"
        >
          <span className="text-base sm:text-2xl md:text-3xl font-semibold text-slate-300 flex items-center flex-wrap justify-center">
            Seorang{' '}
            <span className="text-[#38bdf8] font-bold ml-2 font-mono drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
              {currentText}
            </span>
            <span className="inline-block w-0.5 sm:w-1 h-5 sm:h-7 bg-[#2c67ed] ml-1 animate-pulse shadow-[0_0_8px_#2c67ed]" />
          </span>
        </motion.div>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-2xl text-xs sm:text-base text-slate-400 leading-relaxed mb-7 px-3 sm:px-0"
        >
          {personalData.bio}
        </motion.p>

        {/* Action Buttons: Mobile-First Precision Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-none mb-8 px-2"
        >
          {/* Primary Glow Button */}
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] text-white font-semibold text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] hover:shadow-[0_0_30px_rgba(44,103,237,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <span>Jelajahi Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary Buttons Row on Mobile */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-blue-500/30 hover:border-blue-400/60 flex items-center justify-center gap-2 backdrop-blur-md shadow-[0_0_12px_rgba(44,103,237,0.15)] active:scale-95 transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hubungi Saya</span>
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-blue-950/40 hover:bg-blue-900/40 text-blue-300 font-medium text-xs sm:text-sm border border-blue-500/20 hover:border-blue-400/40 flex items-center justify-center gap-1.5 active:scale-95 transition-all duration-300"
              title="Download CV"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Unduh CV</span>
            </a>
          </div>
        </motion.div>

        {/* Quick Social & Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-blue-500/15 w-full max-w-lg"
        >
          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-500 font-medium">Follow:</span>
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-blue-500/20 text-slate-400 hover:text-white hover:border-blue-400 hover:shadow-[0_0_12px_rgba(44,103,237,0.5)] transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-blue-500/20 text-slate-400 hover:text-white hover:border-blue-400 hover:shadow-[0_0_12px_rgba(44,103,237,0.5)] transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href={personalData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-blue-500/20 text-slate-400 hover:text-white hover:border-blue-400 hover:shadow-[0_0_12px_rgba(44,103,237,0.5)] transition-all"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>

          <div className="hidden sm:block w-px h-5 bg-blue-500/20" />

          {/* Quick Cosmic Highlights */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#2c67ed]" />
              Laravel & Docker
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Data Science & ML
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
