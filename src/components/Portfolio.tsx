import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Award, 
  Cpu, 
  ExternalLink, 
  Sparkles, 
  FolderKanban,
  FileCode2,
  Database,
  Layers,
  Server,
  Cloud,
  Terminal,
  Zap,
  Flame,
  Layout,
  Send,
  Laptop,
  Box,
  GitBranch,
  Code2,
  Network,
  HardDrive
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { 
  certificatesData, 
  techStackData, 
} from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import { getMergedProjectsData } from '../lib/supabase';

// Map icon strings to Lucide icon components
const iconMap: Record<string, React.ElementType> = {
  Atom: Code2,
  FileCode2: FileCode2,
  Palette: Layout,
  Layers: Layers,
  Sparkles: Sparkles,
  Zap: Zap,
  Code2: Code2,
  Server: Server,
  Cpu: Cpu,
  Network: Network,
  Terminal: Terminal,
  Database: Database,
  HardDrive: HardDrive,
  Flame: Flame,
  Cloud: Cloud,
  GitBranch: GitBranch,
  Laptop: Laptop,
  Layout: Layout,
  Send: Send,
  Box: Box,
};

interface PortfolioProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'techstack'>('projects');
  const [projectCategory, setProjectCategory] = useState<string>('Semua');
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(() => getMergedProjectsData());

  useEffect(() => {
    const handleProjectsUpdate = () => {
      setProjectsList(getMergedProjectsData());
    };
    window.addEventListener('projects-updated', handleProjectsUpdate);
    return () => window.removeEventListener('projects-updated', handleProjectsUpdate);
  }, []);

  // Filter projects by category
  const filteredProjects = projectCategory === 'Semua' 
    ? projectsList 
    : projectsList.filter((p) => p.category === projectCategory);

  const categories = ['Semua', 'Full-Stack', 'Data & AI', 'Game & STEM'];

  // Group tech stack by category
  const techCategories = ['Programming Languages', 'Web Development', 'Data & Analytics', 'Tools & Platforms'] as const;

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#2c67ed]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3"
        >
          <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
          Karya & Eksplorasi
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk',sans-serif]"
        >
          Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Showcase</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-slate-400 text-base sm:text-lg"
        >
          Koleksi proyek pilihan, sertifikasi resmi terverifikasi, dan teknologi yang saya gunakan dalam membangun ekosistem digital.
        </motion.p>
      </div>

      {/* Main Tab Navigation Buttons */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl sm:rounded-full bg-[#060b1e]/90 border border-blue-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(44,103,237,0.25)] gap-1">
          <button
            onClick={() => setActiveTab('projects')}
            className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${
                activeTab === 'projects'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {activeTab === 'projects' && (
              <motion.div
                layoutId="portfolioActiveTab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.6)]"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Projects
            </span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${
                activeTab === 'certificates'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {activeTab === 'certificates' && (
              <motion.div
                layoutId="portfolioActiveTab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.6)]"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificates
            </span>
          </button>

          <button
            onClick={() => setActiveTab('techstack')}
            className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${
                activeTab === 'techstack'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {activeTab === 'techstack' && (
              <motion.div
                layoutId="portfolioActiveTab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.6)]"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Tech Stack
            </span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {/* ================= TAB 1: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border
                    ${
                      projectCategory === cat
                        ? 'bg-[#2c67ed]/30 border-[#2c67ed] text-white shadow-[0_0_15px_rgba(44,103,237,0.4)]'
                        : 'bg-slate-900/60 border-blue-500/20 text-slate-400 hover:text-white hover:border-blue-400/40'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl bg-[#070d22]/90 border border-blue-500/25 hover:border-blue-400/60 overflow-hidden shadow-[0_4px_25px_rgba(44,103,237,0.15)] hover:shadow-[0_0_30px_rgba(44,103,237,0.35)] backdrop-blur-xl flex flex-col transition-all duration-300"
                >
                  {/* Top Image Preview */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d22] via-transparent to-transparent opacity-90" />
                    
                    {/* Badge Category */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-blue-500/40 text-cyan-300 backdrop-blur-md">
                      {project.category}
                    </span>

                    {/* Quick View Button on Image */}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-[#2c67ed] text-white border border-blue-500/40 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
                      title="Lihat Detail Proyek"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => onSelectProject(project)}
                        className="text-lg sm:text-xl font-bold text-white mb-2 font-['Space_Grotesk',sans-serif] hover:text-[#38bdf8] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md bg-blue-950/60 border border-blue-500/20 text-[11px] font-medium text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="pt-4 border-t border-blue-500/15 flex items-center justify-between">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        Detail Lengkap &rarr;
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-blue-500/20 transition-colors"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-[#2c67ed] hover:bg-blue-600 text-white shadow-[0_0_12px_rgba(44,103,237,0.5)] transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= TAB 2: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          <motion.div
            key="tab-certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#080f26]/90 to-[#040816]/90 border border-blue-500/25 hover:border-blue-400/60 shadow-[0_4px_25px_rgba(44,103,237,0.15)] hover:shadow-[0_0_30px_rgba(44,103,237,0.35)] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-[#2c67ed] flex items-center justify-center text-white shadow-[0_0_20px_rgba(44,103,237,0.6)] shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-300">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 font-['Space_Grotesk',sans-serif]">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-300 mb-4">
                    Penerbit: <strong className="text-white">{cert.issuer}</strong>
                  </p>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-500/15 mb-4">
                    <span className="text-xs text-slate-400 block mb-1">ID Kredensial:</span>
                    <span className="text-xs font-mono text-slate-200 font-semibold select-all">
                      {cert.credentialId}
                    </span>
                  </div>

                  {/* Skills Learned */}
                  <div className="mb-4">
                    <span className="text-xs text-slate-400 block mb-2 font-medium">Keahlian Teruji:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-blue-950/50 border border-blue-500/20 text-xs text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <div className="pt-4 border-t border-blue-500/15">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verifikasi Kredensial Resmi &rarr;
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= TAB 3: TECH STACK ================= */}
        {activeTab === 'techstack' && (
          <motion.div
            key="tab-techstack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12 max-w-6xl mx-auto"
          >
            {techCategories.map((category) => {
              const skills = techStackData.filter((s) => s.category === category);
              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-['Space_Grotesk',sans-serif] border-b border-blue-500/20 pb-2">
                    <Sparkles className="w-4 h-4 text-[#2c67ed]" />
                    {category}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {skills.map((skill) => {
                      const IconComponent = iconMap[skill.iconName] || Code2;
                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="p-4 rounded-2xl bg-[#080f28]/80 border border-blue-500/20 hover:border-blue-400/60 shadow-[0_2px_15px_rgba(44,103,237,0.1)] hover:shadow-[0_0_20px_rgba(44,103,237,0.3)] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-cyan-300">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                              <span className="text-xs text-slate-400 font-mono">{skill.level}%</span>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full bg-gradient-to-r from-[#2c67ed] to-cyan-400 shadow-[0_0_10px_#2c67ed]"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
