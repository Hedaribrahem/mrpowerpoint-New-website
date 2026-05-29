import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccessMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    } catch (error: any) {
      setErrorMessage(error.message || 'حدث خطأ أثناء إرسال الرابط');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>نسيت كلمة المرور | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-red-transparent flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-brand-red" />
              </div>
              <h1 className="text-2xl font-bold">نسيت كلمة المرور</h1>
              <p className="text-muted-foreground text-sm mt-1">
                أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
              </p>
            </div>

            {/* ✅ رسالة نجاح */}
            {successMessage && (
              <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">تم الإرسال!</p>
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              </div>
            )}

            {/* ❌ رسالة خطأ */}
            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">خطأ</p>
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
                      setSuccessMessage('');
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

              <button 
                type="submit" 
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
                {isLoading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-brand-red hover:underline">
                <ArrowLeft className="w-4 h-4" />
                العودة لتسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}