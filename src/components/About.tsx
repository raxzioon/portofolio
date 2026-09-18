import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  TrendingUp
} from 'lucide-react';
import { 
  personalData, 
  educationData, 
  experienceData, 
  statsData 
} from '../data/portfolioData';
import { getCustomAvatar } from '../lib/supabase';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return getCustomAvatar() || personalData.avatarUrl;
  });

  useEffect(() => {
    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      if (customEvent.detail) {
        setAvatarUrl(customEvent.detail);
      } else {
        setAvatarUrl(getCustomAvatar() || personalData.avatarUrl);
      }
    };
    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, []);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2c67ed]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Mengenal Lebih Dekat
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk',sans-serif]"
        >
          Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Saya</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-slate-400 text-base sm:text-lg"
        >
          Perjalanan, dedikasi, dan hasrat untuk membangun solusi digital berstandar industri dengan teknologi terkini.
        </motion.p>
      </div>

      {/* Profile & Bio Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center mb-16 sm:mb-20">
        {/* Profile Photo with Cosmic Neon Glow Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative px-2"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72">
            {/* Spinning neon cosmic gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#2c67ed] via-cyan-400 to-indigo-600 blur-md opacity-75 animate-pulse" />
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-60 animate-[spin_10s_linear_infinite]" />
            
            {/* Photo Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border-2 border-blue-400/40 p-1.5 shadow-[0_0_30px_rgba(44,103,237,0.5)]">
              <img
                src={avatarUrl}
                alt={personalData.name}
                className="w-full h-full object-cover rounded-2xl filter brightness-105 contrast-105 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Cosmic Badge 1 */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-3 left-0 sm:-bottom-4 sm:-left-4 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-slate-900/90 border border-blue-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(44,103,237,0.4)] flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-white"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/30 flex items-center justify-center text-cyan-300">
                <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span>Web Explorer</span>
            </motion.div>

            {/* Floating Cosmic Badge 2 */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -top-2.5 right-0 sm:-top-3 sm:-right-3 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-cyan-300"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400" />
              <span>Full-Stack Passion</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bio Description Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-4 sm:gap-5"
        >
          <div className="space-y-3 sm:space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
            {personalData.aboutDetailed.map((paragraph, index) => (
              <p key={index} className="text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 border-t border-blue-500/20 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Lokasi: <strong className="text-white">{personalData.location}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Status: <strong className="text-emerald-300">Tersedia untuk Kontrak / Fulltime</strong></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Statistics Section (Counters/Cards) */}
      <div className="mb-16 sm:mb-24">
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center justify-center gap-2 font-['Space_Grotesk',sans-serif]">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c67ed]" />
            Statistik & Metrik Kinerja
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative p-3.5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#09112a]/90 to-[#040816]/90 border border-blue-500/25 hover:border-blue-400/60 shadow-[0_4px_20px_rgba(44,103,237,0.15)] hover:shadow-[0_0_25px_rgba(44,103,237,0.35)] backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Glow Accent Top Bar */}
              <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-[2px] bg-gradient-to-r from-transparent via-[#2c67ed] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-baseline gap-1 mb-1 sm:mb-2">
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 font-['Space_Grotesk',sans-serif]">
                    {stat.value}
                  </span>
                  <span className="text-lg sm:text-3xl font-extrabold text-[#2c67ed]">
                    {stat.suffix}
                  </span>
                </div>
                <h4 className="text-xs sm:text-base font-bold text-slate-200 mb-1">
                  {stat.label}
                </h4>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 leading-snug line-clamp-2 sm:line-clamp-none">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience & Education Timelines */}
      <div>
        {/* Toggle Switch */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-slate-950/80 border border-blue-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(44,103,237,0.2)]">
            <button
              onClick={() => setActiveTab('experience')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2
                ${
                  activeTab === 'experience'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {activeTab === 'experience' && (
                <motion.div
                  layoutId="activeAboutSubTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] shadow-[0_0_18px_rgba(44,103,237,0.6)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Pengalaman Kerja
              </span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2
                ${
                  activeTab === 'education'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {activeTab === 'education' && (
                <motion.div
                  layoutId="activeAboutSubTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] shadow-[0_0_18px_rgba(44,103,237,0.6)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Riwayat Pendidikan
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience-timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {experienceData.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/30 hover:border-[#2c67ed] transition-colors pb-8 last:pb-0"
                >
                  {/* Timeline Dot with Glow */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#060b1e] border-2 border-[#2c67ed] shadow-[0_0_12px_#2c67ed]" />

                  {/* Experience Card */}
                  <div className="p-6 rounded-2xl bg-[#080e24]/80 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk',sans-serif]">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-medium text-cyan-300">
                          {exp.company} • <span className="text-slate-400">{exp.location}</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-300 self-start sm:self-auto">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements List */}
                    <div className="space-y-2 mb-4">
                      {exp.achievements.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-blue-500/15">
                      {exp.techUsed.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/20 text-xs font-medium text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education-timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-400 transition-colors pb-8 last:pb-0"
                >
                  {/* Timeline Dot with Glow */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#060b1e] border-2 border-cyan-400 shadow-[0_0_12px_#38bdf8]" />

                  {/* Education Card */}
                  <div className="p-6 rounded-2xl bg-[#080e24]/80 border border-blue-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk',sans-serif]">
                          {edu.degree}
                        </h4>
                        <p className="text-sm font-medium text-cyan-300">
                          {edu.institution} • <span className="text-slate-400">{edu.location}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        {edu.score && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-300">
                            {edu.score}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-300">
                          <Calendar className="w-3 h-3" />
                          {edu.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                      {edu.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2">
                      {edu.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
