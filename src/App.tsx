import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from 'sonner'; // ✅ جديد
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';
import CookieBanner from '@/components/shared/CookieBanner';
import { Spinner } from '@/components/ui/spinner';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const TemplatesPage = lazy(() => import('@/pages/TemplatesPage'));
const TemplateDetailPage = lazy(() => import('@/pages/TemplateDetailPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const AcademyPage = lazy(() => import('@/pages/AcademyPage'));
const CommunityPage = lazy(() => import('@/pages/CommunityPage'));
const AIAssistantPage = lazy(() => import('@/pages/AIAssistantPage'));
const StorePage = lazy(() => import('@/pages/StorePage'));
const ConsultationsPage = lazy(() => import('@/pages/ConsultationsPage'));
const CustomOrderPage = lazy(() => import('@/pages/CustomOrderPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Spinner className="w-10 h-10 text-brand-red mx-auto mb-4" />
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  );
}

// ✅ Protected Route - يتحقق من isAuthenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Toaster position="top-center" richColors /> {/* ✅ جديد */}
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-background text-foreground font-cairo">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/templates/:slug" element={<TemplateDetailPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/academy" element={<AcademyPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/consultations" element={<ConsultationsPage />} />
                <Route path="/custom-order" element={<CustomOrderPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                
                {/* ✅ Protected Routes - يحتاج تسجيل دخول */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}