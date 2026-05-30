import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Download, Star, Calendar, FileText } from 'lucide-react';
import { templates, categories } from '@/data/templates';

export default function TemplateDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const template = templates.find((t) => t.id === Number(slug));

  if (!template) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">النموذج غير موجود</h1>
          <Link to="/templates" className="text-brand-red hover:underline">
            العودة للنماذج
          </Link>
        </div>
      </div>
    );
  }

  const related = templates
    .filter((t) => t.id !== template.id && t.category === template.category)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{template.title} | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] relative bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/templates" className="hover:text-brand-red transition-colors">النماذج</Link>
            <span>/</span>
            <span>{template.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Preview */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="h-80 lg:h-96 bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">
                    {categories.find((c) => c.id === template.category)?.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{template.title}</h2>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    template.badge === 'free'
                      ? 'bg-green-500/20 text-green-600'
                      : template.badge === 'vip'
                      ? 'bg-yellow-500/20 text-yellow-600'
                      : 'bg-brand-red-transparent text-brand-red'
                  }`}>
                    {template.badge === 'free' ? 'مجاني' : template.badge === 'vip' ? 'VIP' : 'جديد'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-3">{template.title}</h1>
                <p className="text-muted-foreground">{template.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 text-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mx-auto mb-1" />
                  <div className="font-bold">{template.rating}</div>
                  <div className="text-xs text-muted-foreground">({template.reviewCount} تقييم)</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <Download className="w-5 h-5 text-brand-red mx-auto mb-1" />
                  <div className="font-bold">{(template.downloads / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-muted-foreground">تحميل</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <FileText className="w-5 h-5 text-brand-red mx-auto mb-1" />
                  <div className="font-bold">{template.slides}</div>
                  <div className="text-xs text-muted-foreground">شريحة</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <Calendar className="w-5 h-5 text-brand-red mx-auto mb-1" />
                  <div className="font-bold">{template.dateAdded}</div>
                  <div className="text-xs text-muted-foreground">تاريخ الإضافة</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 btn-primary py-3 inline-flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  تحميل النموذج
                </button>
              </div>

              <div className="glass-card rounded-xl p-4">
                <h3 className="font-bold mb-2">معلومات إضافية</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الفئة</span>
                    <span>{categories.find((c) => c.id === template.category)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الأسلوب</span>
                    <span>{template.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجال</span>
                    <span>{template.field}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">اللون</span>
                    <span>{template.color}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">التقييمات</h2>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-black">{template.rating}</div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(template.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{template.reviewCount} مراجعة</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'أحمد', rating: 5, text: 'نموذج رائع وسهل التعديل. أنصح به بشدة!', date: '2025-05-20' },
                  { name: 'سارة', rating: 4, text: 'تصميم احترافي لكن يحتاج بعض التعديلات البسيطة.', date: '2025-05-18' },
                  { name: 'محمد', rating: 5, text: 'الأفضل في فئته. شكراً لفريق Mr PowerPoint.', date: '2025-05-15' },
                ].map((review, i) => (
                  <div key={i} className="border-t border-border pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red text-sm font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{review.name}</div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="mr-auto text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">نماذج مشابهة</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((t) => (
                  <Link to={`/templates/${t.id}`} key={t.id}>
                    <div className="glass-card rounded-xl p-4 card-hover">
                      <div className="h-32 bg-gradient-to-br from-brand-red/15 to-brand-red/5 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">{categories.find((c) => c.id === t.category)?.icon}</span>
                      </div>
                      <h4 className="font-bold text-sm">{t.title}</h4>
                      <p className="text-xs text-muted-foreground">{t.slides} شريحة</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
