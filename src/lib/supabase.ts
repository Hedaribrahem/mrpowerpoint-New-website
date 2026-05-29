import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ memory storage - يمسح لما تقفل المتصفح
const memoryStorage = {
  data: new Map(),
  getItem: (key: string) => {
    return memoryStorage.data.get(key) || null;
  },
  setItem: (key: string, value: string) => {
    memoryStorage.data.set(key, value);
  },
  removeItem: (key: string) => {
    memoryStorage.data.delete(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: memoryStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});