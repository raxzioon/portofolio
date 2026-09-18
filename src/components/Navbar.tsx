import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Menu, 
  X, 
  Sparkles
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
  { name: 'Kontak', href: '#contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scroll spy
      const sections = ['home', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(targetId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Center Top Navbar */}
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[92%] max-w-4xl transition-all duration-300">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`relative px-3.5 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-between border transition-all duration-300
            ${
              isScrolled 
                ? 'bg-[#060b1e]/85 backdrop-blur-xl border-blue-500/40 shadow-[0_0_25px_rgba(44,103,237,0.4)]' 
                : 'bg-[#060b1e]/70 backdrop-blur-lg border-blue-500/25 shadow-[0_0_20px_rgba(44,103,237,0.25)]'
            }
          `}
        >
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center text-white font-semibold tracking-wide group py-1"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-['Space_Grotesk',sans-serif] group-hover:scale-105 transition-transform duration-300">
              razxs<span className="text-[#2c67ed] drop-shadow-[0_0_12px_rgba(44,103,237,0.9)] animate-pulse">_</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/40 px-2 py-1 rounded-full border border-blue-500/15">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                    ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/80 to-[#2c67ed] shadow-[0_0_18px_rgba(44,103,237,0.7)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Action Button (Explore / Hire Me) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-[#2c67ed] to-cyan-400 group-hover:from-blue-600 group-hover:to-cyan-400 hover:text-white text-white shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all duration-300 active:scale-95"
            >
              <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-[#080f28] rounded-full group-hover:bg-opacity-0 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:text-white" />
                <span>Mari Berkolaborasi</span>
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-blue-600/20 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 p-4 rounded-2xl bg-[#060b1e]/95 backdrop-blur-2xl border border-blue-500/40 shadow-[0_0_25px_rgba(44,103,237,0.35)] flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                      ${
                        isActive
                          ? 'bg-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]'
                          : 'text-slate-300 hover:bg-blue-500/10 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-blue-500/20">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-[#2c67ed] text-white text-sm font-semibold shadow-[0_0_15px_rgba(44,103,237,0.4)]"
                >
                  <Sparkles className="w-4 h-4" />
                  Hubungi Sekarang
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
