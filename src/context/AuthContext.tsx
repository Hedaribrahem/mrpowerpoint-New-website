import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ReactNode } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null); // ✅ تتبع الـ session
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
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

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'خطأ في تسجيل الدخول');
    }
    
    // ✅ Session will be set by onAuthStateChange listener
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
    
    if (error) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'خطأ في إنشاء الحساب');
    }
    
    // ✅ Create profile in database
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
            role: 'user',
            subscription_type: 'free',
          },
        ]);
      
      if (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }
    
    // ❌ لا تسجل دخول تلقائياً - المستخدم لازم يسجل دخول يدوياً
    // نمسح الـ user المؤقت اللي ممكن onAuthStateChange يعينه
    setTimeout(() => {
      setUser(null);
      setSession(null);
    }, 100);
    
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'خطأ في تسجيل الخروج');
    }
    setUser(null);
    setSession(null);
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    
    if (error) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'خطأ في تسجيل الدخول عبر Google');
    }
  }

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session && !!user, // ✅ true فقط لما يكون فيه session + user
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