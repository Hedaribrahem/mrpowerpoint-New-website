import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Download,
  GraduationCap,
  ShoppingBag,
  MessageCircle,
  Layout,
  Star,
  Sparkles,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';

const navLinks = [
  { name: 'الرئيسية', href: '/', icon: Layout },
  { name: 'النماذج', href: '/templates', icon: Download },
  { name: 'الباقات', href: '/pricing', icon: Star },
  { name: 'الأكاديمية', href: '/academy', icon: GraduationCap },
  { name: 'المتجر', href: '/store', icon: ShoppingBag },
  { name: 'الخدمات', href: '/services', icon: Sparkles },
  { name: 'المنتدى', href: '/community', icon: MessageCircle },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E31E24" />
                      <stop offset="100%" stopColor="#C41A1F" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M5,20 Q10,5 20,10 Q30,15 35,20 Q30,25 20,30 Q10,35 5,20"
                    fill="url(#logoGrad)"
                  />
                  <path
                    d="M8,20 Q12,12 20,15 Q28,18 32,20 Q28,22 20,25 Q12,28 8,20"
                    fill="white"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg leading-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-foreground'}`}>
                  Mr PowerPoint
                </span>
                <span className={`text-[10px] leading-tight transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  عروض تقديمية احترافية
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-red bg-brand-red-transparent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-1 h-1 rounded-full bg-brand-red" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="تبديل الوضع"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* ✅ User Section - يتغير حسب حالة تسجيل الدخول */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted">
                    <User className="w-4 h-4 text-brand-red" />
                    <span className="text-sm font-medium">{user.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-brand-red hover:bg-brand-red-dark rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  دخول
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="القائمة"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="container-main mx-auto px-4 py-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث في النماذج، الفيديوهات، المقالات..."
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-input bg-muted focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg">القائمة</span>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive(link.href)
                        ? 'text-brand-red bg-brand-red-transparent font-medium'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              
              {/* ✅ Mobile User Section */}
              <div className="pt-4 border-t border-border mt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
                      <User className="w-5 h-5 text-brand-red" />
                      <span className="font-medium">{user.full_name || user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 w-full mt-1"
                    >
                      <LogOut className="w-5 h-5" />
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-red bg-brand-red-transparent font-medium"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    تسجيل الدخول
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}