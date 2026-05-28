import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, fullName);
      
      toast.success('🎉 تم إنشاء الحساب بنجاح!', {
        duration: 3000,
      });
      
      setIsSuccess(true);
      
      // ❌ محذوف: الانتقال التلقائي - المستخدم يضغط الزر بنفسه
      
    } catch (error: any) {
      let errorMessage = 'حدث خطأ أثناء إنشاء الحساب';
      
      if (error.message?.includes('User already registered')) {
        errorMessage = 'هذا البريد الإلكتروني مسجل بالفعل';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'البريد الإلكتروني غير صالح';
      } else if (error.message?.includes('Password should be')) {
        errorMessage = 'كلمة المرور ضعيفة، يجب أن تكون 6 أحرف على الأقل';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ شاشة النجاح - بدون انتقال تلقائي
  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>تم التسجيل بنجاح | Mr PowerPoint</title>
        </Helmet>

        <div className="pt-[72px] min-h-screen flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md text-center">
            <div className="glass-card rounded-2xl p-8">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">تم التسجيل بنجاح! 🎉</h1>
              <p className="text-muted-foreground mb-6">
                تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.
              </p>
              
              {/* ✅ زر وحيد - المستخدم يضغط عليه بنفسه */}
              <button 
                onClick={() => navigate('/login')}
                className="w-full btn-primary py-3"
              >
                تسجيل الدخول الآن
              </button>
              
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>إنشاء حساب | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-red-transparent flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-brand-red" />
              </div>
              <h1 className="text-2xl font-bold">إنشاء حساب</h1>
              <p className="text-muted-foreground text-sm mt-1">انضم إلى Mr PowerPoint اليوم</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="محمد أحمد"
                    required
                    disabled={isLoading}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
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
                {isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-brand-red hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}