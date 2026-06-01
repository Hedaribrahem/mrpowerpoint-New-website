import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Star, Eye } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { templates, categories } from '@/data/templates';

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>معرض الأعمال | Mr PowerPoint</title>
        <meta name="description" content="شاهد أمثلة من أعمالنا في تصميم العروض التقديمية." />
      </Helmet>

      <div className="pt-[72px] bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">معرض الأعمال</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              أمثلة من أعمالنا التي نفخر بها
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="أعمالنا المميزة" subtitle="تصفح مجموعة من أبرز أعمالنا" />

          {/* Before/After */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-6 text-center">قبل وبعد</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-700">عرض عادي</h4>
                    <p className="text-gray-600">قبل التصميم الاحترافي</p>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-sm">قبل</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-brand-red/20 via-background to-brand-red/10 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-20 h-20 text-brand-red mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-brand-red">عرض احترافي</h4>
                    <p className="text-muted-foreground">بعد التصميم الاحترافي</p>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <span className="px-3 py-1 bg-brand-red text-white rounded-full text-sm">بعد</span>
                </div>
              </div>
            </div>
          </div>

          {/* Works Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.slice(0, 6).map((template) => (
              <div key={template.id} className="glass-card rounded-2xl overflow-hidden card-hover group">
                <div className="h-48 bg-gradient-to-br from-brand-red/15 to-brand-red/5 flex items-center justify-center relative">
                  <span className="text-6xl transition-transform group-hover:scale-110">
                    {categories.find((c) => c.id === template.category)?.icon}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{template.rating}</span>
                    <span className="text-muted-foreground">• {template.slides} شريحة</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="mt-16">
            <SectionHeading title="قصص نجاح" subtitle="كيف ساعدنا عملاءنا في تحقيق أهدافهم" />
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'عرض استثماري ينجح في جذب 5 ملايين ريال', client: 'شركة ناشئة تقنية', result: '95% نسبة رضا المستثمرين' },
                { title: 'تحويل عرض تدريبي لأكاديمية دولية', client: 'أكاديمية التطوير', result: '200% زيادة في التسجيل' },
              ].map((study, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <h4 className="font-bold text-lg mb-2">{study.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">العميل: {study.client}</p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-sm">
                    {study.result}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link to="/custom-order" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              ابدأ مشروعك معنا
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
