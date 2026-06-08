import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, X, Crown, Zap, Star, CreditCard, Apple } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AnimatedRibbon from '@/components/shared/AnimatedRibbon';

const plans = [
  {
    name: 'المجانية',
    price: 'مجاناً',
    period: '',
    description: 'ابدأ رحلتك معنا مجاناً',
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    features: [
      { text: '5 نماذج شهرياً', included: true },
      { text: 'نماذج مجانية فقط', included: true },
      { text: 'دعم عبر البريد', included: true },
      { text: 'وصول للأكاديمية الأساسية', included: true },
      { text: 'إعلانات', included: false },
      { text: 'نماذج حصرية', included: false },
      { text: 'دعم مباشر', included: false },
      { text: 'جلسة تصميم شهرياً', included: false },
    ],
    cta: 'ابدأ مجاناً',
    href: '/register',
    popular: false,
  },
  {
    name: 'VIP',
    price: '$9.99',
    period: '/شهر',
    description: 'الوصول الكامل لجميع النماذج',
    icon: Crown,
    color: 'from-brand-red to-brand-red-dark',
    features: [
      { text: 'نماذج غير محدودة', included: true },
      { text: 'جميع النماذج المجانية والحصرية', included: true },
      { text: 'دعم مباشر Priority', included: true },
      { text: 'وصول كامل للأكاديمية', included: true },
      { text: 'فيديوهات حصرية', included: true },
      { text: 'بدون إعلانات', included: true },
      { text: 'شارة VIP على الحساب', included: true },
      { text: 'جلسة تصميم شهرياً', included: false },
    ],
    cta: 'اشترك الآن',
    href: '/register',
    popular: true,
  },
  {
    name: 'VIP Plus',
    price: '$99',
    period: '/سنة',
    description: 'أفضل قيمة مع خصم 17%',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    features: [
      { text: 'كل مميزات VIP', included: true },
      { text: 'خصم 17% على الاشتراك', included: true },
      { text: 'جلسة تصميم شهرياً', included: true },
      { text: 'أولوية في الطلبات المخصصة', included: true },
      { text: 'وصول مبكر للنماذج الجديدة', included: true },
      { text: 'تقارير شهرية', included: true },
      { text: 'بدون إعلانات', included: true },
      { text: 'دعم VIP مخصص', included: true },
    ],
    cta: 'اشترك سنوياً',
    href: '/register',
    popular: false,
  },
];

const paymentMethods = [
  { name: 'Visa', icon: CreditCard },
  { name: 'Apple Pay', icon: Apple },
  { name: 'مدى', icon: CreditCard },
  { name: 'STC Pay', icon: CreditCard },
  { name: 'PayPal', icon: CreditCard },
];

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>الباقات المدفوعة | Mr PowerPoint</title>
        <meta name="description" content="اختر الباقة المناسبة لك. باقة مجانية، شهرية، وسنوية مع مميزات حصرية." />
      </Helmet>

      {/* ✅ نفس طريقة النماذج */}
      <div className="pt-[72px] relative bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">اختر باقتك</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              باقات مرنة تناسب جميع الاحتياجات مع مميزات حصرية للمشتركين
            </p>
          </div>
        </div>
      </div>

      <AnimatedRibbon variant="divider" />

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="باقات الاشتراك"
            subtitle="قارن بين الباقات واختر ما يناسبك"
          />

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl overflow-hidden ${
                    plan.popular
                      ? 'ring-2 ring-brand-red shadow-card-hover scale-105 z-10'
                      : 'glass-card'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-l from-brand-red to-brand-red-dark text-white text-center py-2 text-sm font-bold">
                      الأكثر شعبية
                    </div>
                  )}
                  <div className={`p-6 ${plan.popular ? 'pt-14' : ''}`}>
                    {/* Header */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-black">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground/50'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={plan.href}
                      className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                        plan.popular
                          ? 'bg-brand-red hover:bg-brand-red-dark text-white'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="mt-16 text-center">
            <h3 className="font-bold text-lg mb-6">طرق الدفع المدعومة</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="font-bold text-2xl text-center mb-8">أسئلة شائعة</h3>
            <div className="space-y-4">
              {[
                { q: 'هل يمكنني تغيير باقتي لاحقاً؟', a: 'نعم، يمكنك الترقية أو التخفيض في أي وقت. الفروقات تحسب بشكل تناسبي.' },
                { q: 'هل هناك فترة تجريبية؟', a: 'نعم، الباقة المجانية متاحة للاستخدام بدون حد زمني.' },
                { q: 'كيف يمكنني إلغاء الاشتراك؟', a: 'يمكنك إلغاء الاشتراك في أي وقت من لوحة التحكم. سيبقى لك الوصول حتى نهاية الفترة المدفوعة.' },
              ].map((faq, i) => (
                <div key={i} className="glass-card rounded-xl p-5">
                  <h4 className="font-bold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}