import React, { useState, useEffect } from 'react';
import { StarfieldBackground } from './components/StarfieldBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminPanel } from './components/AdminPanel';
import { recordVisitor } from './lib/supabase';
import type { ProjectItem } from './data/portfolioData';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Record visitor session on page load
  useEffect(() => {
    recordVisitor();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 selection:bg-[#2c67ed] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Interactive 60fps HTML5 Canvas Cosmic Starfield & Meteors */}
      <StarfieldBackground />

      {/* Floating Center Top Navbar with Blue Glow Effect */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section with Big Name and Dynamic Typewriter Effect */}
        <Hero />

        {/* Section About Me: Photo, Education, Experience, and Project Stats */}
        <About />

        {/* Section Portfolio with Interactive Tabs: Projects, Certificates, Tech Stack */}
        <Portfolio onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section Kontak with Form and Social Links */}
        <Contact />
      </main>

      {/* Cosmic Footer */}
      <Footer />

      {/* Project Detail Pop-up Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Admin Panel & Supabase Database Viewer (Hidden by default) */}
      <AdminPanel />
    </div>
  );
};

export default App;
