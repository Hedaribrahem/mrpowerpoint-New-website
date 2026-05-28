import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Palette, FileText, Sparkles, GraduationCap, ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { services } from '@/data/services';
import SectionHeading from '@/components/shared/SectionHeading';

const icons = [Palette, FileText, Sparkles, GraduationCap];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>خدماتنا | Mr PowerPoint</title>
        <meta name="description" content="تصميم عروض مخصصة، تخصيص قوالب، هويات بصرية، ودورات تدريبية." />
      </Helmet>

      <div className="pt-[72px]">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">خدماتنا المتميزة</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              حلول متكاملة لجميع احتياجاتك في تصميم العروض التقديمية
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="كيف يمكننا مساعدتك"
            subtitle="اختر الخدمة التي تناسبك واترك الباقي علينا"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, i) => {
              const Icon = icons[i];
              return (
                <div key={service.id} className="glass-card rounded-2xl p-6 lg:p-8 card-hover">
                  <div className="w-16 h-16 rounded-2xl bg-brand-red-transparent flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-5">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-red font-bold">{service.price}</span>
                    <Link
                      to="/custom-order"
                      className="flex items-center gap-1 text-sm font-medium text-brand-red hover:gap-2 transition-all"
                    >
                      اطلب الخدمة
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto bg-gradient-to-br from-brand-red-transparent to-brand-red/5">
              <h3 className="text-xl font-bold mb-3">لم تجد ما تبحث عنه؟</h3>
              <p className="text-muted-foreground mb-6">
                يمكننا تصميم حل مخصص يناسب احتياجاتك الفريدة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/custom-order" className="btn-primary inline-flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  طلب تصميم مخصص
                </Link>
                <Link to="/consultations" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  حجز استشارة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
