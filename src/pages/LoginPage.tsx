import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Chrome, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await signIn(email, password, remember); // ✅ أضفنا remember هنا
      navigate('/dashboard');
    } catch (error: any) {
      let message = 'حدث خطأ أثناء تسجيل الدخول';
      
      if (error?.message) {
        const msg = error.message.toLowerCase();
        
        if (msg.includes('invalid login credentials')) {
          message = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        } else if (msg.includes('email not confirmed')) {
          message = 'يرجى تأكيد بريدك الإلكتروني أولاً';
        } else if (msg.includes('user not found')) {
          message = 'هذا البريد الإلكتروني غير مسجل';
        } else if (msg.includes('invalid email')) {
          message = 'البريد الإلكتروني غير صالح';
        } else if (msg.includes('network')) {
          message = 'مشكلة في الاتصال بالإنترنت';
        } else {
          message = error.message;
        }
      }
      
      setErrorMessage(message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setErrorMessage(error.message || 'خطأ في تسجيل الدخول عبر Google');
    }
  };

  return (
    <>
      <Helmet>
        <title>تسجيل الدخول | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-red-transparent flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-brand-red" />
              </div>
              <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
              <p className="text-muted-foreground text-sm mt-1">أهلاً بك مجدداً في Mr PowerPoint</p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">خطأ في تسجيل الدخول</p>
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                      errorMessage ? 'border-red-300' : 'border-input'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className={`w-full pr-10 pl-12 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30 ${
                      errorMessage ? 'border-red-300' : 'border-input'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-input"
                  />
                  تذكرني
                </label>
                <Link to="#" className="text-brand-red hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary py-3"
                disabled={isLoading}
              >
                {isLoading ? 'جاري الدخول...' : 'دخول'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">أو</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-3 border border-input rounded-xl hover:bg-muted transition-colors"
              disabled={isLoading}
            >
              <Chrome className="w-5 h-5" />
              تسجيل الدخول عبر Google
            </button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-brand-red hover:underline font-medium">
                سجّل الآن
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}