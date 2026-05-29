import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ custom storage عشان نتحكم في "تذكرني"
const customStorage = {
  getItem: (key: string) => {
    const remember = localStorage.getItem('auth_remember');
    // إذا "تذكرني" = false، نستخدم sessionStorage (ينتهي لما تقفل المتصفح)
    if (remember === 'false') {
      return sessionStorage.getItem(key);
    }
    // إذا "تذكرني" = true أو null، نستخدم localStorage (يبقى للأبد)
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    const remember = localStorage.getItem('auth_remember');
    if (remember === 'false') {
      sessionStorage.setItem(key, value);
      return;
    }
    localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});