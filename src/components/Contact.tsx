import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  Phone, 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2,
  AlertCircle,
  Clock,
  Rocket
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { personalData } from '../data/portfolioData';
import { sendContactMessage } from '../lib/supabase';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Mohon lengkapi nama, email, dan pesan Anda.');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory cosmic confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#2c67ed', '#38bdf8', '#818cf8', '#ffffff']
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage('Terjadi kendala pengiriman pesan. Silakan coba lagi.');
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2c67ed]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Mulai Percakapan
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk',sans-serif]"
        >
          Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Saya</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-slate-400 text-base sm:text-lg"
        >
          Punya ide proyek, tawaran kolaborasi, atau sekadar ingin bertukar sapa seputar teknologi? Pintu transmisi selalu terbuka!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Direct Contact & Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between space-y-8"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk',sans-serif]">
              Mari Berbincang
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Saya selalu tertarik mendengar tentang proyek-proyek inovatif, ide-ide segar, dan peluang baru dalam ekosistem web development.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e26]/80 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(44,103,237,0.25)]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-[#2c67ed] flex items-center justify-center text-white shadow-[0_0_15px_rgba(44,103,237,0.5)] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Email Transmisi</span>
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {personalData.email}
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={personalData.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e26]/80 border border-blue-500/20 hover:border-emerald-400/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">WhatsApp / Telepon</span>
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {personalData.phone}
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e26]/80 border border-blue-500/20">
                <div className="w-12 h-12 rounded-xl bg-cyan-600/80 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Lokasi Orbit</span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {personalData.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="pt-6 border-t border-blue-500/20">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2c67ed]" />
              Saluran Media Sosial
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all flex items-center gap-2 text-xs font-semibold"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-blue-400 hover:shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all flex items-center gap-2 text-xs font-semibold"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all flex items-center gap-2 text-xs font-semibold"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href={personalData.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-slate-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Cosmic Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#080e26]/90 to-[#030612]/95 border border-blue-500/30 shadow-[0_4px_30px_rgba(44,103,237,0.2)] backdrop-blur-xl">
            {/* Top cosmic line */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#2c67ed] to-transparent" />

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-['Space_Grotesk',sans-serif] flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#2c67ed]" />
              Kirim Transmisi Pesan
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Isi form berikut untuk mengirim pesan langsung ke inbox saya. Respon akan dikirim dalam 1x24 jam.
            </p>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success banner */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-[#2c67ed] flex items-center justify-center text-white shadow-[0_0_30px_rgba(44,103,237,0.7)] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white font-['Space_Grotesk',sans-serif]">
                  Pesan Terkirim Melintasi Kosmos!
                </h4>
                <p className="text-slate-300 max-w-md text-sm">
                  Terima kasih banyak telah menghubungi saya! Transmisi Anda telah diterima dan saya akan segera merespon balik melalui email Anda.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Nama Lengkap <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-blue-500/25 focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Alamat Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-blue-500/25 focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Subjek / Topik
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Contoh: Tawaran Kerjasama Proyek Web"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-blue-500/25 focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Pesan Transmisi <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan tentang proyek atau ide yang ingin didiskusikan..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-blue-500/25 focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 text-white placeholder-slate-500 text-sm transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-[#2c67ed] hover:from-blue-500 hover:to-[#2c67ed] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(44,103,237,0.6)] hover:shadow-[0_0_35px_rgba(44,103,237,0.8)] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      Mentransmisikan...
                    </span>
                  ) : (
                    <>
                      <span>Kirim Pesan Sekarang</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
