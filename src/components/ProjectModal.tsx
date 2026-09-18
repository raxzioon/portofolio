import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-3xl bg-[#080e26] border border-blue-500/40 rounded-3xl shadow-[0_0_50px_rgba(44,103,237,0.35)] overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-blue-500/30 transition-colors"
            aria-label="Tutup Detail Proyek"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Preview Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080e26] via-[#080e26]/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white shadow-md mb-2">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk',sans-serif]">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Tentang Proyek
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Fitur Utama & Keunggulan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-blue-950/30 p-2.5 rounded-xl border border-blue-500/15">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Teknologi yang Digunakan
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-[#0d173b] border border-blue-500/30 text-xs sm:text-sm font-medium text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-blue-500/20">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-[#2c67ed] text-white text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] hover:shadow-[0_0_30px_rgba(44,103,237,0.7)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Lihat Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-blue-500/30 flex items-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  Source Code di GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
