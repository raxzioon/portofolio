import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
}

export interface VisitorLog {
  id: string;
  created_at: string;
  user_agent?: string;
  referrer?: string;
  screen_size?: string;
}

const LOCAL_STORAGE_MESSAGES_KEY = 'razxs_portfolio_messages';
const LOCAL_STORAGE_VISITORS_KEY = 'razxs_portfolio_visitors';
const LOCAL_STORAGE_CONFIG_KEY = 'razxs_supabase_config';
import { projectsData } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';

export const AVATAR_STORAGE_KEY = 'razxs_custom_avatar';
export const PROJECT_IMAGES_STORAGE_KEY = 'razxs_custom_project_images';

export const getCustomProjectImages = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(PROJECT_IMAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveCustomProjectImage = async (projectId: string, imageUrl: string): Promise<void> => {
  const current = getCustomProjectImages();
  current[projectId] = imageUrl;
  localStorage.setItem(PROJECT_IMAGES_STORAGE_KEY, JSON.stringify(current));
  window.dispatchEvent(new CustomEvent('projects-updated', { detail: current }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').upsert({
        key: 'project_images',
        value: JSON.stringify(current),
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to sync project images to Supabase:', err);
    }
  }
};

export const resetCustomProjectImage = async (projectId: string): Promise<void> => {
  const current = getCustomProjectImages();
  delete current[projectId];
  localStorage.setItem(PROJECT_IMAGES_STORAGE_KEY, JSON.stringify(current));
  window.dispatchEvent(new CustomEvent('projects-updated', { detail: current }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').upsert({
        key: 'project_images',
        value: JSON.stringify(current),
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to update project images on Supabase:', err);
    }
  }
};

export const getMergedProjectsData = (): ProjectItem[] => {
  const customImages = getCustomProjectImages();
  return projectsData.map((project) => {
    if (customImages[project.id]) {
      return {
        ...project,
        image: customImages[project.id],
      };
    }
    return project;
  });
};

export const getCustomAvatar = (): string | null => {
  return localStorage.getItem(AVATAR_STORAGE_KEY);
};

export const saveCustomAvatar = async (avatarDataUrl: string): Promise<void> => {
  localStorage.setItem(AVATAR_STORAGE_KEY, avatarDataUrl);
  window.dispatchEvent(new CustomEvent('avatar-updated', { detail: avatarDataUrl }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').upsert({
        key: 'avatar_url',
        value: avatarDataUrl,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to sync avatar to Supabase:', err);
    }
  }
};

export const resetCustomAvatar = async (): Promise<void> => {
  localStorage.removeItem(AVATAR_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('avatar-updated', { detail: null }));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('portfolio_settings').delete().eq('key', 'avatar_url');
    } catch (err) {
      console.error('Failed to reset avatar on Supabase:', err);
    }
  }
};

/**
 * Sync settings (avatar, project images) from Supabase across all devices & visitors
 */
export const syncRemoteSettings = async (): Promise<void> => {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    const { data, error } = await client.from('portfolio_settings').select('*');
    if (!error && data && data.length > 0) {
      for (const item of data) {
        if (item.key === 'avatar_url' && item.value) {
          localStorage.setItem(AVATAR_STORAGE_KEY, item.value);
          window.dispatchEvent(new CustomEvent('avatar-updated', { detail: item.value }));
        } else if (item.key === 'project_images' && item.value) {
          localStorage.setItem(PROJECT_IMAGES_STORAGE_KEY, item.value);
          try {
            const parsed = JSON.parse(item.value);
            window.dispatchEvent(new CustomEvent('projects-updated', { detail: parsed }));
          } catch {
            // ignore
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not sync remote portfolio settings from Supabase:', err);
  }
};

export const compressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

// Retrieve credentials from environment or localStorage
export const getSupabaseConfig = () => {
  const localConfigStr = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
  if (localConfigStr) {
    try {
      const parsed = JSON.parse(localConfigStr);
      if (parsed.url && parsed.key) {
        return { url: parsed.url, key: parsed.key, source: 'localStorage' };
      }
    } catch {
      // ignore
    }
  }

  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey) {
    return { url: envUrl, key: envKey, source: 'env' };
  }

  return { url: '', key: '', source: 'none' };
};

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify({ url, key }));
  supabaseInstance = null; // reset client to reinitialize
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONFIG_KEY);
  supabaseInstance = null;
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseInstance) return supabaseInstance;

  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
};

export const isSupabaseConnected = (): boolean => {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
};

// Fallback local storage helpers
const getLocalMessages = (): ContactMessage[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalMessages = (messages: ContactMessage[]) => {
  localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(messages));
};

// ================= API METHODS =================

/**
 * Send contact message:
 * Tries Supabase first. If not configured or fails, saves to localStorage.
 */
export const sendContactMessage = async (data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; storage: 'supabase' | 'local'; error?: string }> => {
  const client = getSupabaseClient();
  const timestamp = new Date().toISOString();

  // Always store a copy in localStorage so the admin can always see it locally
  const localId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  const localMsg: ContactMessage = {
    id: localId,
    created_at: timestamp,
    name: data.name,
    email: data.email,
    subject: data.subject || '',
    message: data.message,
    is_read: false,
  };
  const currentLocal = getLocalMessages();
  saveLocalMessages([localMsg, ...currentLocal]);

  if (client) {
    try {
      const { error } = await client.from('contact_messages').insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject || '',
          message: data.message,
          is_read: false,
        },
      ]);

      if (error) {
        console.warn('Supabase insert failed, message kept in local storage:', error.message);
        return { success: true, storage: 'local', error: error.message };
      }

      return { success: true, storage: 'supabase' };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn('Supabase request error:', errorMsg);
      return { success: true, storage: 'local', error: errorMsg };
    }
  }

  return { success: true, storage: 'local' };
};

/**
 * Fetch all contact messages
 */
export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as ContactMessage[];
      }
    } catch (err) {
      console.warn('Failed fetching from Supabase, falling back to local storage:', err);
    }
  }

  // Fallback to local storage
  return getLocalMessages();
};

/**
 * Mark a message as read
 */
export const markMessageAsRead = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();

  // Update local storage
  const current = getLocalMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, is_read: true } : m));
  saveLocalMessages(updated);

  if (client) {
    try {
      await client.from('contact_messages').update({ is_read: true }).eq('id', id);
    } catch (err) {
      console.warn('Error marking read in Supabase:', err);
    }
  }

  return true;
};

/**
 * Delete a message
 */
export const deleteContactMessage = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();

  // Update local storage
  const current = getLocalMessages();
  const updated = current.filter((m) => m.id !== id);
  saveLocalMessages(updated);

  if (client) {
    try {
      await client.from('contact_messages').delete().eq('id', id);
    } catch (err) {
      console.warn('Error deleting message in Supabase:', err);
    }
  }

  return true;
};

/**
 * Record a page visit
 */
export const recordVisitor = async (): Promise<void> => {
  const log: VisitorLog = {
    id: 'vis-' + Date.now(),
    created_at: new Date().toISOString(),
    user_agent: navigator.userAgent,
    referrer: document.referrer || 'Direct Visit',
    screen_size: `${window.innerWidth}x${window.innerHeight}`,
  };

  // Local storage save
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_VISITORS_KEY);
    const logs: VisitorLog[] = raw ? JSON.parse(raw) : [];
    // Keep max 50 recent local logs
    const newLogs = [log, ...logs].slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_VISITORS_KEY, JSON.stringify(newLogs));
  } catch {
    // ignore
  }

  // Supabase save
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('visitor_logs').insert([
        {
          user_agent: log.user_agent,
          referrer: log.referrer,
          screen_size: log.screen_size,
        },
      ]);
    } catch {
      // ignore
    }
  }
};

/**
 * Fetch visitor stats
 */
export const fetchVisitorLogs = async (): Promise<VisitorLog[]> => {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('visitor_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        return data as VisitorLog[];
      }
    } catch {
      // ignore
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_VISITORS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
