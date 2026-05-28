import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[450px] z-50 bg-card border border-border rounded-2xl shadow-2xl p-4 animate-slide-in-up">
      <div className="flex items-start gap-3">
        <Cookie className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-foreground mb-3">
            نستخدم ملفات الارتباط لتحسين تجربتك. بالاستمرار في استخدام الموقع، فإنك توافق على استخدامنا لملفات الارتباط.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={accept} className="btn-primary text-sm py-2 px-4">
              موافق
            </button>
            <button onClick={accept} className="btn-ghost text-sm py-2 px-4">
              رفض
            </button>
          </div>
        </div>
        <button onClick={accept} className="p-1 hover:bg-muted rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
