import { Link } from 'react-router-dom';
import { Youtube, Instagram, Linkedin, Twitter, Send, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const quickLinks = [
  { name: 'النماذج المجانية', href: '/templates' },
  { name: 'الباقات المدفوعة', href: '/pricing' },
  { name: 'الأكاديمية', href: '/academy' },
  { name: 'المتجر', href: '/store' },
  { name: 'الخدمات', href: '/services' },
];

const serviceLinks = [
  { name: 'تصميم عروض مخصصة', href: '/services' },
  { name: 'استشارات', href: '/consultations' },
  { name: 'طلب مخصص', href: '/custom-order' },
  { name: 'المدونة', href: '/blog' },
  { name: 'المنتدى', href: '/community' },
];

const socialLinks = [
  { name: 'يوتيوب', icon: Youtube, href: '#' },
  { name: 'إنستقرام', icon: Instagram, href: '#' },
  { name: 'لينكدإن', icon: Linkedin, href: '#' },
  { name: 'تويتر', icon: Twitter, href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Ribbon Divider */}
      <div className="relative h-16 overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z"
            fill="#1A1A2E"
          />
          <path
            d="M0,30 Q360,0 720,30 T1440,30"
            fill="none"
            stroke="#E31E24"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <defs>
                  <linearGradient id="footerLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E31E24" />
                    <stop offset="100%" stopColor="#FF3B41" />
                  </linearGradient>
                </defs>
                <path
                  d="M5,20 Q10,5 20,10 Q30,15 35,20 Q30,25 20,30 Q10,35 5,20"
                  fill="url(#footerLogo)"
                />
              </svg>
              <span className="font-bold text-xl">Mr PowerPoint</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              نحوّل أفكارك إلى عروض تقديمية احترافية تخطف الأنظار وتترك انطباعاً لا يُنسى.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-brand-red" />
                <span>+966 50 000 0000</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-brand-red" />
                <span>info@mrpowerpoint.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">النشرة البريدية</h3>
            <p className="text-gray-400 text-sm mb-4">
              اشترك للحصول على أحدث النماذج والنصائح مباشرة إلى بريدك.
            </p>
            {subscribed ? (
              <div className="bg-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
                تم الاشتراك بنجاح! شكراً لك.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-brand-red text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-red hover:bg-brand-red-dark rounded-xl transition-colors text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  اشترك الآن
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Mr PowerPoint. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/10 hover:bg-brand-red transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
