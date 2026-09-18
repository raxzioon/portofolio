import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Database, 
  Users, 
  Key, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle,
  Eye,
  Upload,
  User,
  Sparkles,
  FolderKanban
} from 'lucide-react';
import { 
  fetchContactMessages, 
  markMessageAsRead, 
  deleteContactMessage, 
  fetchVisitorLogs,
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  isSupabaseConnected,
  getSupabaseClient,
  getCustomAvatar,
  saveCustomAvatar,
  resetCustomAvatar,
  compressImage,
  getCustomProjectImages,
  saveCustomProjectImage,
  resetCustomProjectImage
} from '../lib/supabase';
import { personalData, projectsData } from '../data/portfolioData';
import type { ContactMessage, VisitorLog } from '../lib/supabase';

export const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'inbox' | 'profile' | 'projects' | 'visitors' | 'settings'>('inbox');

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Visitors state
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);

  // Supabase Settings state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [configSource, setConfigSource] = useState<string>('none');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  // Avatar / Profile Photo state
  const [avatarPreview, setAvatarPreview] = useState<string>(() => {
    return getCustomAvatar() || personalData.avatarUrl;
  });
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [avatarSuccessMsg, setAvatarSuccessMsg] = useState('');
  const [avatarErrorMsg, setAvatarErrorMsg] = useState('');

  const defaultPin = import.meta.env.VITE_ADMIN_PIN || '1234';

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarErrorMsg('File harus berupa gambar (PNG, JPG, WebP, dll.)');
      return;
    }

    setIsCompressing(true);
    setAvatarErrorMsg('');
    setAvatarSuccessMsg('');

    try {
      const compressed = await compressImage(file, 800, 800, 0.88);
      setAvatarPreview(compressed);
      await saveCustomAvatar(compressed);
      setAvatarSuccessMsg('Foto profil berhasil diunggah dan disinkronkan ke database!');
      setTimeout(() => setAvatarSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setAvatarErrorMsg('Gagal memproses gambar. Silakan coba file lain.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleApplyUrl = async () => {
    if (!avatarUrlInput.trim()) return;
    const url = avatarUrlInput.trim();
    setAvatarPreview(url);
    await saveCustomAvatar(url);
    setAvatarSuccessMsg('Tautan foto profil berhasil disimpan dan disinkronkan ke database!');
    setAvatarUrlInput('');
    setTimeout(() => setAvatarSuccessMsg(''), 5000);
  };

  const handleResetAvatar = async () => {
    if (confirm('Kembalikan foto profil ke foto awal?')) {
      await resetCustomAvatar();
      setAvatarPreview(personalData.avatarUrl);
      setAvatarSuccessMsg('Foto profil berhasil dikembalikan ke foto bawaan.');
      setTimeout(() => setAvatarSuccessMsg(''), 4000);
    }
  };

  // Project photos state
  const [customProjectImages, setCustomProjectImages] = useState<Record<string, string>>(() => getCustomProjectImages());
  const [projectSuccessMsg, setProjectSuccessMsg] = useState('');
  const [projectErrorMsg, setProjectErrorMsg] = useState('');
  const [projectLoadingId, setProjectLoadingId] = useState<string | null>(null);
  const [projectUrlInputs, setProjectUrlInputs] = useState<Record<string, string>>({});

  const handleProjectFileSelect = async (projectId: string, projectTitle: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProjectErrorMsg('File harus berupa gambar (PNG, JPG, WebP, dll.)');
      return;
    }

    setProjectLoadingId(projectId);
    setProjectErrorMsg('');
    setProjectSuccessMsg('');

    try {
      const compressed = await compressImage(file, 1000, 600, 0.88);
      await saveCustomProjectImage(projectId, compressed);
      setCustomProjectImages((prev) => ({ ...prev, [projectId]: compressed }));
      setProjectSuccessMsg(`Foto untuk proyek "${projectTitle}" berhasil disimpan dan disinkronkan ke database!`);
      setTimeout(() => setProjectSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setProjectErrorMsg('Gagal memproses gambar. Silakan coba file lain.');
    } finally {
      setProjectLoadingId(null);
    }
  };

  const handleProjectUrlApply = async (projectId: string, projectTitle: string) => {
    const url = projectUrlInputs[projectId]?.trim();
    if (!url) return;

    await saveCustomProjectImage(projectId, url);
    setCustomProjectImages((prev) => ({ ...prev, [projectId]: url }));
    setProjectSuccessMsg(`Foto untuk proyek "${projectTitle}" berhasil disimpan ke database dari URL!`);
    setProjectUrlInputs((prev) => ({ ...prev, [projectId]: '' }));
    setTimeout(() => setProjectSuccessMsg(''), 5000);
  };

  const handleResetProject = async (projectId: string, projectTitle: string) => {
    if (confirm(`Kembalikan foto proyek "${projectTitle}" ke foto awal?`)) {
      await resetCustomProjectImage(projectId);
      setCustomProjectImages((prev) => {
        const copy = { ...prev };
        delete copy[projectId];
        return copy;
      });
      setProjectSuccessMsg(`Foto proyek "${projectTitle}" berhasil dikembalikan ke bawaan.`);
      setTimeout(() => setProjectSuccessMsg(''), 4000);
    }
  };

  const loadData = useCallback(async () => {
    setIsLoadingMessages(true);
    setIsLoadingVisitors(true);

    try {
      const msgs = await fetchContactMessages();
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMessages(false);
    }

    try {
      const vists = await fetchVisitorLogs();
      setVisitors(vists);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingVisitors(false);
    }
  }, []);

  // Check URL hash (#admin or ?admin=true) and custom event
  useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsOpen(true);
      }
    };
    checkAdminRoute();

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('open-admin-modal', handleCustomOpen);

    // Keyboard shortcut (Alt+A or Ctrl+Shift+A) to open admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('open-admin-modal', handleCustomOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync settings when opened
  useEffect(() => {
    const cfg = getSupabaseConfig();
    setSupabaseUrl(cfg.url);
    setSupabaseKey(cfg.key);
    setConfigSource(cfg.source);
    loadData();
  }, [loadData]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === defaultPin) {
      setIsAuthenticated(true);
      setPinError('');
      loadData();
    } else {
      setPinError('PIN salah! Default PIN adalah: 1234');
    }
  };

  const handleMarkRead = async (id: string) => {
    await markMessageAsRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Yakin ingin menghapus pesan ini?')) {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      alert('Mohon isi URL dan Anon Key Supabase.');
      return;
    }
    saveSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    setConfigSource('localStorage');
    setTestStatus('idle');
    setTestMessage('Pengaturan berhasil disimpan!');
    loadData();
  };

  const handleResetConfig = () => {
    if (confirm('Reset konfigurasi Supabase ke default?')) {
      clearSupabaseConfig();
      setSupabaseUrl('');
      setSupabaseKey('');
      setConfigSource('none');
      setTestStatus('idle');
      loadData();
    }
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Menguji koneksi ke Supabase...');

    const client = getSupabaseClient();
    if (!client) {
      setTestStatus('failed');
      setTestMessage('Klien Supabase belum dikonfigurasi dengan URL & Key.');
      return;
    }

    try {
      const { error } = await client.from('contact_messages').select('id').limit(1);
      if (error) {
        setTestStatus('failed');
        setTestMessage(`Koneksi berhasil ke URL, tetapi query gagal: ${error.message}. Pastikan Anda sudah menjalankan SQL Table di Supabase.`);
      } else {
        setTestStatus('success');
        setTestMessage('Koneksi Supabase Sukses! Tabel `contact_messages` aktif dan siap menerima data.');
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setTestStatus('failed');
      setTestMessage(`Gagal terhubung: ${errMsg}`);
    }
  };

  const sqlSnippet = `-- 1. Buat Tabel Pesan Kontak
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false
);

-- 2. Buat Tabel Log Pengunjung
CREATE TABLE IF NOT EXISTS visitor_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  screen_size TEXT
);

-- 3. Buat Tabel Foto & Pengaturan Portofolio (Sinkronisasi Semua Perangkat)
CREATE TABLE IF NOT EXISTS portfolio_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Kebijakan Keamanan (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select messages" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Public update messages" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Public delete messages" ON contact_messages FOR DELETE USING (true);

ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert visitors" ON visitor_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select visitors" ON visitor_logs FOR SELECT USING (true);

ALTER TABLE portfolio_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public select settings" ON portfolio_settings FOR SELECT USING (true);
CREATE POLICY "Public insert settings" ON portfolio_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update settings" ON portfolio_settings FOR UPDATE USING (true);
CREATE POLICY "Public delete settings" ON portfolio_settings FOR DELETE USING (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <>
      {/* Modal Dialog (Hidden by default, triggered via Alt+A or #admin) */}

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#060b1e] border border-blue-500/40 rounded-3xl shadow-[0_0_50px_rgba(44,103,237,0.35)] overflow-hidden z-10 my-6 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-blue-500/20 bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk',sans-serif] flex items-center gap-2">
                      Dashboard Admin razxs_
                      {isSupabaseConnected() ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Supabase Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Local Database
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Authentication check */}
              {!isAuthenticated ? (
                <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-[#2c67ed] flex items-center justify-center text-white shadow-[0_0_25px_rgba(44,103,237,0.5)] mb-6">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk',sans-serif]">
                    Autentikasi Akses Admin
                  </h4>
                  <p className="text-sm text-slate-400 max-w-sm mb-6">
                    Masukkan PIN keamanan untuk mengakses database pesan masuk dan konfigurasi Supabase. (Default PIN: <code className="text-cyan-300 font-mono">1234</code>)
                  </p>

                  <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
                    <div>
                      <input
                        type="password"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Masukkan PIN (1234)"
                        autoFocus
                        className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-xl bg-slate-950/80 border border-blue-500/30 text-white focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/30 outline-none"
                      />
                      {pinError && (
                        <p className="text-xs text-rose-400 mt-2">{pinError}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#2c67ed] hover:bg-blue-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all"
                    >
                      Buka Panel Admin
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Admin Views */
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Tabs Nav */}
                  <div className="flex border-b border-blue-500/20 bg-slate-950/40 px-6 gap-2 pt-2">
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all
                        ${
                          activeTab === 'inbox'
                            ? 'border-[#2c67ed] text-cyan-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }
                      `}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Pesan Masuk ({messages.length})</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                          {unreadCount} baru
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all
                        ${
                          activeTab === 'profile'
                            ? 'border-[#2c67ed] text-cyan-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }
                      `}
                    >
                      <User className="w-4 h-4" />
                      <span>Foto Profil</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all
                        ${
                          activeTab === 'projects'
                            ? 'border-[#2c67ed] text-cyan-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }
                      `}
                    >
                      <FolderKanban className="w-4 h-4" />
                      <span>Foto Proyek</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('visitors')}
                      className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all
                        ${
                          activeTab === 'visitors'
                            ? 'border-[#2c67ed] text-cyan-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }
                      `}
                    >
                      <Users className="w-4 h-4" />
                      <span>Pengunjung ({visitors.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all
                        ${
                          activeTab === 'settings'
                            ? 'border-[#2c67ed] text-cyan-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }
                      `}
                    >
                      <Database className="w-4 h-4" />
                      <span>Koneksi Supabase</span>
                    </button>

                    <div className="ml-auto pb-2">
                      <button
                        onClick={loadData}
                        className="p-1.5 rounded-lg bg-blue-950/60 border border-blue-500/20 text-slate-300 hover:text-white"
                        title="Segarkan Data"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tab Body */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* ========== TAB 1: INBOX ========== */}
                    {activeTab === 'inbox' && (
                      <div className="space-y-4">
                        {isLoadingMessages ? (
                          <div className="py-12 text-center text-slate-400">
                            <Clock className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
                            <span>Memuat pesan masuk...</span>
                          </div>
                        ) : messages.length === 0 ? (
                          <div className="py-16 text-center text-slate-400">
                            <Mail className="w-12 h-12 mx-auto mb-3 opacity-30 text-blue-400" />
                            <h4 className="text-base font-semibold text-slate-300">Belum Ada Pesan Masuk</h4>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                              Ketika pengunjung mengisi form kontak di website, pesan akan langsung muncul di panel ini dan tersimpan di database.
                            </p>
                          </div>
                        ) : (
                          messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`p-5 rounded-2xl border transition-all ${
                                !msg.is_read
                                  ? 'bg-[#091438] border-blue-500/50 shadow-[0_0_15px_rgba(44,103,237,0.2)]'
                                  : 'bg-[#070c20]/80 border-blue-500/15'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-base font-bold text-white">{msg.name}</h4>
                                    {!msg.is_read && (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white">
                                        BARU
                                      </span>
                                    )}
                                  </div>
                                  <a
                                    href={`mailto:${msg.email}`}
                                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                                  >
                                    <Mail className="w-3 h-3" />
                                    {msg.email}
                                  </a>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-auto">
                                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{new Date(msg.created_at).toLocaleString('id-ID')}</span>
                                </div>
                              </div>

                              {msg.subject && (
                                <p className="text-xs font-semibold text-slate-200 mb-2 bg-blue-950/40 px-3 py-1.5 rounded-lg border border-blue-500/15">
                                  Topik: {msg.subject}
                                </p>
                              )}

                              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed mb-4">
                                {msg.message}
                              </p>

                              <div className="flex items-center justify-between pt-3 border-t border-blue-500/15 text-xs">
                                <a
                                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Balasan Portofolio Adzka Arroya')}`}
                                  className="px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition-colors"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Balas via Email
                                </a>

                                <div className="flex items-center gap-2">
                                  {!msg.is_read && (
                                    <button
                                      onClick={() => handleMarkRead(msg.id)}
                                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                      Tandai Dibaca
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                    title="Hapus Pesan"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* ========== TAB: PROFILE PHOTO ========== */}
                    {activeTab === 'profile' && (
                      <div className="space-y-6 max-w-2xl mx-auto py-2">
                        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                          <div className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-white block mb-1">Ganti Foto Bagian 'Tentang Saya'</strong>
                            Upload foto Anda langsung dari komputer (PNG, JPG, WebP) atau masukkan URL gambar. Foto akan otomatis dioptimasi dan langsung aktif di halaman portfolio Anda.
                          </div>
                        </div>

                        {/* Live Preview & Upload Area */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl bg-slate-950/60 border border-blue-500/25">
                          <div className="relative w-44 h-44 shrink-0">
                            {/* Cosmic ring matching About.tsx */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#2c67ed] via-cyan-400 to-indigo-600 blur-sm opacity-75 animate-pulse" />
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-blue-400/50 p-1 shadow-[0_0_25px_rgba(44,103,237,0.5)]">
                              <img
                                src={avatarPreview}
                                alt="Preview Foto Profil"
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </div>
                          </div>

                          <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                            <h4 className="text-sm font-bold text-white">Preview Foto Profil</h4>
                            <p className="text-xs text-slate-400">
                              Foto ini akan ditampilkan di bingkai neon kosmik pada section Tentang Saya.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-2 justify-center sm:justify-start">
                              <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-[#2c67ed] hover:from-blue-500 hover:to-[#2c67ed] text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(44,103,237,0.4)] transition-all">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{isCompressing ? 'Mengoptimasi Foto...' : 'Pilih Foto dari Komputer'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  disabled={isCompressing}
                                  className="hidden"
                                  onChange={handleFileSelect}
                                />
                              </label>

                              <button
                                type="button"
                                onClick={handleResetAvatar}
                                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/30 text-rose-300 text-xs font-medium transition-colors"
                              >
                                Reset ke Foto Default
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* URL Option */}
                        <div className="p-5 rounded-2xl bg-slate-950/40 border border-blue-500/20 space-y-3">
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Atau Gunakan Tautan URL Gambar
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={avatarUrlInput}
                              onChange={(e) => setAvatarUrlInput(e.target.value)}
                              placeholder="https://example.com/foto-anda.jpg"
                              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-blue-500/25 text-white text-xs font-mono outline-none focus:border-[#2c67ed]"
                            />
                            <button
                              type="button"
                              onClick={handleApplyUrl}
                              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-blue-500/30 transition-colors"
                            >
                              Terapkan URL
                            </button>
                          </div>
                        </div>

                        {/* Feedback Alerts */}
                        {avatarSuccessMsg && (
                          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{avatarSuccessMsg}</span>
                          </div>
                        )}

                        {avatarErrorMsg && (
                          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{avatarErrorMsg}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ========== TAB: PROJECT PHOTOS ========== */}
                    {activeTab === 'projects' && (
                      <div className="space-y-6 max-w-3xl mx-auto py-2">
                        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                          <div className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-white block mb-1">Ganti Foto Portfolio Proyek</strong>
                            Anda dapat mengganti foto thumbnail untuk masing-masing proyek di bawah ini. Cukup upload foto dari komputer (PNG, JPG, WebP) atau masukkan URL gambar. Perubahan akan langsung tersimpan dan tampil di section Portfolio.
                          </div>
                        </div>

                        {/* Alerts */}
                        {projectSuccessMsg && (
                          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{projectSuccessMsg}</span>
                          </div>
                        )}

                        {projectErrorMsg && (
                          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{projectErrorMsg}</span>
                          </div>
                        )}

                        {/* Project Cards List */}
                        <div className="space-y-5">
                          {projectsData.map((project) => {
                            const currentImg = customProjectImages[project.id] || project.image;
                            const isCustom = Boolean(customProjectImages[project.id]);
                            const isLoading = projectLoadingId === project.id;

                            return (
                              <div
                                key={project.id}
                                className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-blue-500/20 hover:border-blue-500/40 transition-all flex flex-col md:flex-row gap-5 items-center"
                              >
                                {/* Image Thumbnail Preview */}
                                <div className="relative w-full md:w-56 h-36 rounded-xl overflow-hidden bg-slate-900 border border-blue-500/30 shrink-0">
                                  <img
                                    src={currentImg}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-950/80 border border-blue-500/40 text-cyan-300 backdrop-blur-md">
                                    {project.category}
                                  </span>
                                  {isCustom && (
                                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white shadow">
                                      Foto Kustom
                                    </span>
                                  )}
                                </div>

                                {/* Content & Actions */}
                                <div className="flex-1 space-y-3 w-full">
                                  <div>
                                    <h4 className="text-base font-bold text-white font-['Space_Grotesk',sans-serif]">
                                      {project.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                      {project.description}
                                    </p>
                                  </div>

                                  {/* Upload Button & Reset */}
                                  <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-[#2c67ed] hover:from-blue-500 hover:to-[#2c67ed] text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_12px_rgba(44,103,237,0.3)] transition-all">
                                      <Upload className="w-3.5 h-3.5" />
                                      <span>{isLoading ? 'Mengoptimasi...' : 'Ganti Foto dari Komputer'}</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        disabled={isLoading}
                                        className="hidden"
                                        onChange={(e) => handleProjectFileSelect(project.id, project.title, e)}
                                      />
                                    </label>

                                    {isCustom && (
                                      <button
                                        type="button"
                                        onClick={() => handleResetProject(project.id, project.title)}
                                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/30 text-rose-300 text-xs font-medium transition-colors"
                                      >
                                        Reset ke Bawaan
                                      </button>
                                    )}
                                  </div>

                                  {/* URL Input */}
                                  <div className="flex gap-2 pt-1">
                                    <input
                                      type="url"
                                      value={projectUrlInputs[project.id] || ''}
                                      onChange={(e) => setProjectUrlInputs((prev) => ({ ...prev, [project.id]: e.target.value }))}
                                      placeholder="Atau tempel URL gambar..."
                                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-blue-500/20 text-white text-xs font-mono outline-none focus:border-[#2c67ed]"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleProjectUrlApply(project.id, project.title)}
                                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-blue-500/20 transition-colors"
                                    >
                                      Terapkan URL
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ========== TAB 4: VISITORS ========== */}
                    {activeTab === 'visitors' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                            <span className="text-xs text-slate-400 block mb-1">Total Kunjungan Terekam</span>
                            <span className="text-2xl font-bold text-white">{visitors.length}</span>
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                            <span className="text-xs text-slate-400 block mb-1">Status Pelacak</span>
                            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                              Aktif Real-time
                            </span>
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20">
                            <span className="text-xs text-slate-400 block mb-1">Sinkronisasi Database</span>
                            <span className="text-sm font-bold text-cyan-300">
                              {isSupabaseConnected() ? 'Supabase & Local' : 'Local Storage Only'}
                            </span>
                          </div>
                        </div>

                        {isLoadingVisitors ? (
                          <div className="py-12 text-center text-slate-400">
                            <Clock className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
                            <span>Memuat log pengunjung...</span>
                          </div>
                        ) : visitors.length === 0 ? (
                          <div className="py-12 text-center text-slate-400">
                            <Eye className="w-12 h-12 mx-auto mb-3 opacity-30 text-blue-400" />
                            <p>Belum ada data kunjungan yang tersimpan.</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-blue-500/10 rounded-2xl border border-blue-500/20 bg-slate-950/40 overflow-hidden">
                            {visitors.map((v) => (
                              <div key={v.id} className="p-3.5 flex items-center justify-between text-xs gap-4">
                                <div>
                                  <p className="text-slate-200 font-medium truncate max-w-md">
                                    {v.user_agent || 'Unknown Device / Browser'}
                                  </p>
                                  <div className="flex items-center gap-3 text-slate-500 mt-0.5 text-[11px]">
                                    <span>Referrer: {v.referrer || 'Langsung'}</span>
                                    <span>Layar: {v.screen_size || 'N/A'}</span>
                                  </div>
                                </div>
                                <span className="text-slate-400 shrink-0">
                                  {new Date(v.created_at).toLocaleString('id-ID')}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ========== TAB 3: SUPABASE CONFIG ========== */}
                    {activeTab === 'settings' && (
                      <div className="space-y-6 max-w-3xl mx-auto">
                        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                          <Database className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                          <div className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-white block mb-1">Hubungkan Proyek Supabase Anda</strong>
                            Cukup masukkan <strong>Project URL</strong> dan <strong>Anon Public Key</strong> dari dashboard Supabase Anda (buka di Supabase: <em>Project Settings &rarr; API</em>). Data akan tersimpan di browser Anda atau dapat diset melalui file <code className="text-cyan-300 font-mono">.env</code>.
                          </div>
                        </div>

                        <form onSubmit={handleSaveConfig} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Key className="w-3.5 h-3.5 text-[#2c67ed]" />
                              Supabase Project URL
                            </label>
                            <input
                              type="text"
                              value={supabaseUrl}
                              onChange={(e) => setSupabaseUrl(e.target.value)}
                              placeholder="https://xyzproject.supabase.co"
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-blue-500/30 text-white font-mono text-xs focus:border-[#2c67ed] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Key className="w-3.5 h-3.5 text-[#2c67ed]" />
                              Supabase Anon Public Key
                            </label>
                            <input
                              type="password"
                              value={supabaseKey}
                              onChange={(e) => setSupabaseKey(e.target.value)}
                              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-blue-500/30 text-white font-mono text-xs focus:border-[#2c67ed] outline-none"
                            />
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                              type="submit"
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-[#2c67ed] text-white text-xs font-semibold shadow-[0_0_15px_rgba(44,103,237,0.4)] hover:shadow-[0_0_20px_rgba(44,103,237,0.6)] transition-all"
                            >
                              Simpan Pengaturan
                            </button>

                            <button
                              type="button"
                              onClick={handleTestConnection}
                              disabled={testStatus === 'testing'}
                              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-blue-500/30 hover:border-blue-400 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                              Uji Koneksi Supabase
                            </button>

                            {configSource === 'localStorage' && (
                              <button
                                type="button"
                                onClick={handleResetConfig}
                                className="px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-medium ml-auto"
                              >
                                Reset Konfigurasi
                              </button>
                            )}
                          </div>
                        </form>

                        {/* Test Status Banner */}
                        {testMessage && (
                          <div
                            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                              testStatus === 'success'
                                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                                : testStatus === 'failed'
                                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                                : 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
                            }`}
                          >
                            {testStatus === 'success' ? (
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 shrink-0" />
                            )}
                            <span>{testMessage}</span>
                          </div>
                        )}

                        {/* SQL Schema helper */}
                        <div className="pt-4 border-t border-blue-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                              Skrip SQL Supabase (Jalankan di SQL Editor Supabase):
                            </h5>
                            <button
                              type="button"
                              onClick={copySql}
                              className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-500/30 text-[11px] text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors"
                            >
                              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiedSql ? 'Tersalin!' : 'Salin SQL'}
                            </button>
                          </div>
                          <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-300 text-[11px] font-mono overflow-x-auto max-h-48 border border-blue-500/20">
                            {sqlSnippet}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
