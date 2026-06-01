import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MessageSquare, Eye, Crown, Target, Award, Clock } from 'lucide-react';
import { forumSections, forumTopics } from '@/data/forum';
import SectionHeading from '@/components/shared/SectionHeading';

export default function CommunityPage() {
  return (
    <>
      <Helmet>
        <title>المجتمع | Mr PowerPoint</title>
        <meta name="description" content="انضم لمجتمع مصممي العروض التقديمية. استفسر، شارك أعمالك، واطلب تصاميم." />
      </Helmet>

      <div className="pt-[72px] bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-gradient">مجتمع المصممين</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                انضم لمجتمعنا النشط من مصممي العروض التقديمية
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-red">1,200+</div>
                  <div className="text-sm text-muted-foreground">عضو</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-red">3,400+</div>
                  <div className="text-sm text-muted-foreground">موضوع</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-red">12K+</div>
                  <div className="text-sm text-muted-foreground">رد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Forum Sections */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {forumSections.map((section) => (
              <Link to={`/community?section=${section.id}`} key={section.id}>
                <div className="glass-card rounded-2xl p-5 card-hover group h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${section.color}20` }}
                  >
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-brand-red transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{section.description}</p>
                  <span className="text-sm text-muted-foreground">{section.topics} موضوع</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Topics List */}
            <div className="lg:col-span-2">
              <SectionHeading title="آخر المواضيع" centered={false} />
              <div className="space-y-3">
                {forumTopics.map((topic) => (
                  <div key={topic.id} className="glass-card rounded-xl p-4 hover:border-brand-red/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold shrink-0">
                        {topic.author.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {topic.isPinned && (
                            <span className="px-2 py-0.5 bg-brand-red-transparent text-brand-red text-xs rounded">
                              مثبت
                            </span>
                          )}
                          <h4 className="font-bold truncate">{topic.title}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{topic.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {topic.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {topic.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {topic.lastReplyDate}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {topic.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weekly Poll */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-bold">تصويت الأسبوع</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">أفضل عرض تقديمي لهذا الأسبوع؟</p>
                <div className="space-y-2">
                  {['عرض تسويقي', 'عرض تعليمي', 'عرض استثماري'].map((option) => (
                    <button
                      key={option}
                      className="w-full text-right px-4 py-2.5 rounded-xl bg-muted hover:bg-brand-red-transparent hover:text-brand-red transition-colors text-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Challenge */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-brand-red" />
                  <h3 className="font-bold">تحدي الشهر</h3>
                </div>
                <p className="text-sm mb-3">صمم عرضاً تقديمياً عن "المستقبل الرقمي"</p>
                <div className="text-xs text-muted-foreground mb-3">الجائزة: اشتراك VIP لمدة 3 أشهر</div>
                <button className="btn-primary w-full text-sm py-2">شارك الآن</button>
              </div>

              {/* Top Contributors */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-brand-red" />
                  <h3 className="font-bold">الأعضاء الأكثر نشاطاً</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'أحمد المبدع', points: 2450 },
                    { name: 'نورة المصممة', points: 1890 },
                    { name: 'محمد التقني', points: 1560 },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red text-sm font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{user.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{user.points} نقطة</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
