import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ReactNode } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const remember = localStorage.getItem('auth_remember');
    
    // ✅ نتحقق من كل أنواع الـ tokens
    const manualToken = remember === 'true' 
      ? localStorage.getItem('sb-token')
      : sessionStorage.getItem('sb-token');
    
    // ✅ نتحقق إذا Supabase خزن token في localStorage بدون إذن
    const supabaseToken = localStorage.getItem('sb-gkguketffqrigfxphxrt-auth-token');
    if (supabaseToken && remember === 'false') {
      // ❌ نمسح token غير مصرح
      localStorage.removeItem('sb-gkguketffqrigfxphxrt-auth-token');
    }

    if (manualToken) {
      const parsed = JSON.parse(manualToken);
      supabase.auth.setSession({
        access_token: parsed.access_token,
        refresh_token: parsed.refresh_token,
      }).then(({ data: { session } }) => {
        if (session) {
          setSession(session);
          fetchUserProfile(session.user.id);
        } else {
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }

    return () => {};
  }, []);

  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        const fullName = authUser?.user_metadata?.full_name 
          || authUser?.email?.split('@')[0]
          || 'مستخدم';
        
        setUser({
          id: userId,
          email: authUser?.email || '',
          full_name: fullName,
          avatar_url: null,
          role: 'user',
          subscription_type: 'free',
        });
        setIsLoading(false);
        return;
      }

      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      setUser({
        id: userId,
        email: authUser?.email || '',
        full_name: data?.full_name,
        avatar_url: data?.avatar_url,
        role: data?.role || 'user',
        subscription_type: data?.subscription_type || 'free',
      });
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string, rememberMe: boolean = false) {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password,
    });
    
    if (error) throw error;
    
    if (data.session) {
      const token = JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      });
      
      if (rememberMe) {
        localStorage.setItem('auth_remember', 'true');
        localStorage.setItem('sb-token', token);
      } else {
        localStorage.setItem('auth_remember', 'false');
        sessionStorage.setItem('sb-token', token);
        // ✅ نمسح أي token Supabase خزنه في localStorage
        setTimeout(() => {
          localStorage.removeItem('sb-gkguketffqrigfxphxrt-auth-token');
        }, 50);
      }
      
      setSession(data.session);
      fetchUserProfile(data.session.user.id);
    }
    
    return data;
  }

  async function signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    
    if (error) throw error;
    
    if (data.user) {
      await supabase.from('profiles').insert([
        { id: data.user.id, full_name: fullName, role: 'user', subscription_type: 'free' },
      ]);
    }
    
    setUser(null);
    setSession(null);
    
    return data;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    localStorage.removeItem('auth_remember');
    localStorage.removeItem('sb-token');
    localStorage.removeItem('sb-gkguketffqrigfxphxrt-auth-token');
    sessionStorage.removeItem('sb-token');
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    
    if (error) throw error;
  }

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session && !!user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}