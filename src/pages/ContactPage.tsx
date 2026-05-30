import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>تواصل معنا | Mr PowerPoint</title>
        <meta name="description" content="تواصل مع فريق Mr PowerPoint للاستفسارات والطلبات." />
      </Helmet>

      <div className="pt-[72px] relative bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">تواصل معنا</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              نحن هنا لمساعدتك. لا تتردد في التواصل معنا
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="glass-card rounded-2xl p-5">
                <MapPin className="w-6 h-6 text-brand-red mb-3" />
                <h3 className="font-bold mb-1">العنوان</h3>
                <p className="text-muted-foreground text-sm">الرياض، المملكة العربية السعودية</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <Phone className="w-6 h-6 text-brand-red mb-3" />
                <h3 className="font-bold mb-1">الهاتف</h3>
                <p className="text-muted-foreground text-sm">+966 50 000 0000</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <Mail className="w-6 h-6 text-brand-red mb-3" />
                <h3 className="font-bold mb-1">البريد</h3>
                <p className="text-muted-foreground text-sm">info@mrpowerpoint.com</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <Clock className="w-6 h-6 text-brand-red mb-3" />
                <h3 className="font-bold mb-1">ساعات العمل</h3>
                <p className="text-muted-foreground text-sm">الأحد - الخميس: 9 ص - 6 م</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6 lg:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">تم الإرسال بنجاح!</h3>
                    <p className="text-muted-foreground">سنرد عليك في أقرب وقت ممكن.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-6">أرسل رسالتك</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">الاسم *</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">البريد الإلكتروني *</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">الهاتف</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">الموضوع *</label>
                          <select
                            required
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                          >
                            <option value="">اختر الموضوع</option>
                            <option value="inquiry">استفسار عام</option>
                            <option value="order">طلب تصميم</option>
                            <option value="support">دعم فني</option>
                            <option value="partnership">شراكة</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">الرسالة *</label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30 resize-none"
                        />
                      </div>
                      <button type="submit" className="btn-primary inline-flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        إرسال الرسالة
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
