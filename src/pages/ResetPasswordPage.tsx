import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Supabase client منفصل تماماً
const resetSupabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function initSession() {
      try {
        // ✅ نقرأ الـ hash من الـ URL
        const hash = window.location.hash;
        console.log('URL hash:', hash); // للتصحيح

        if (!hash || hash.length < 10) {
          setErrorMessage('رابط غير صالح أو منتهي الصلاحية');
          return;
        }

        // ✅ نحول الـ hash لـ params
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');

        console.log('Token:', accessToken ? 'موجود' : 'فاضي');
        console.log('Type:', type);

        if (!accessToken || type !== 'recovery') {
          setErrorMessage('رابط غير صالح أو منتهي الصلاحية');
          return;
        }

        // ✅ نعين الـ session يدوياً
        const { data, error } = await resetSupabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });

        if (error) {
          console.error('setSession error:', error);
          setErrorMessage('رابط منتهي الصلاحية');
          return;
        }

        if (!data.session) {
          setErrorMessage('رابط غير صالح');
          return;
        }

        console.log('Session set successfully!');
        setIsReady(true);

      } catch (err) {
        console.error('Init error:', err);
        setErrorMessage('حدث خطأ غير متوقع');
      }
    }

    initSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('كلمات المرور غير متطابقة');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await resetSupabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error('updateUser error:', error);
        throw error;
      }

      setSuccessMessage('تم تغيير كلمة المرور بنجاح! سيتم تحويلك...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setErrorMessage(error.message || 'حدث خطأ أثناء تغيير كلمة المرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>إعادة تعيين كلمة المرور | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-red-transparent flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-brand-red" />
              </div>
              <h1 className="text-2xl font-bold">إعادة تعيين كلمة المرور</h1>
              <p className="text-muted-foreground text-sm mt-1">
                أدخل كلمة المرور الجديدة
              </p>
            </div>

            {successMessage && (
              <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">تم التغيير!</p>
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">خطأ</p>
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              </div>
            )}

            {isReady && !errorMessage && !successMessage && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="w-full pr-10 pl-12 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
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

                <div>
                  <label className="block text-sm font-medium mb-1">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full btn-primary py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}