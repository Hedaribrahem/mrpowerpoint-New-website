import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

// ✅ Interceptor عشان نمسح localStorage token فوراً
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key: string, value: string) {
  // إذا Supabase يخزن token و"تذكرني" = false، نمنعه
  if (key.startsWith('sb-') && key.includes('auth-token')) {
    const remember = localStorage.getItem('auth_remember');
    if (remember === 'false') {
      // ❌ نمنع التخزين في localStorage
      console.log('Blocked localStorage token storage (remember me = false)');
      return;
    }
  }
  originalSetItem.apply(this, [key, value]);
};