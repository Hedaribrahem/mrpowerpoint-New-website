import { Helmet } from 'react-helmet-async';
import { Target, Eye, Award, Users, FileText, Play } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import CountUp from '@/components/shared/CountUp';

const stats = [
  { icon: FileText, value: 500, suffix: '+', label: 'نموذج مجاني' },
  { icon: Play, value: 150, suffix: '+', label: 'فيديو تعليمي' },
  { icon: Users, value: 50000, suffix: '+', label: 'عميل سعيد' },
  { icon: Award, value: 200, suffix: '+', label: 'مشروع مخصص' },
];

const team = [
  { name: 'محمد العلي', role: 'المؤسس والمدير', initial: 'م' },
  { name: 'سارة الأحمد', role: 'رئيسة التصميم', initial: 'س' },
  { name: 'خالد العمري', role: 'مدير الأكاديمية', initial: 'خ' },
  { name: 'نورة السعيد', role: 'مديرة التسويق', initial: 'ن' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>من نحن | Mr PowerPoint</title>
        <meta name="description" content="تعرف على قصة Mr PowerPoint، رؤيتنا، وفريقنا." />
      </Helmet>

      <div className="pt-[72px]">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">من نحن</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              قصة شغف تحولت إلى منصة رائدة في تصميم العروض التقديمية
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Story */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">قصتنا</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              بدأت رحلة Mr PowerPoint عام 2020 برؤية بسيطة: مساعدة المحترفين العرب على إنشاء عروض تقديمية 
              استثنائية تلقي بظلالها في كل قاعة. منذ ذلك الحين، نمونا لنصبح المنصة الأولى للعروض 
              التقديمية الاحترافية في العالم العربي.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              نؤمن بأن العرض التقديمي الجيد ليس مجرد شرائح، بل هو قصة تُروى بإتقان. 
              فريقنا من المصممين والمدربين المتخصصين يعملون بشغف لتحويل أفكاركم إلى واقع بصري مؤثر.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-red-transparent flex items-center justify-center mx-auto mb-4">
                <Eye className="w-7 h-7 text-brand-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">رؤيتنا</h3>
              <p className="text-muted-foreground">
                أن نكون المنصة الرائدة عربياً في تمكين المحترفين من إنشاء عروض تقديمية 
                تلهم الجمهور وتُحدث تأثيراً حقيقياً.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-red-transparent flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-brand-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">رسالتنا</h3>
              <p className="text-muted-foreground">
                توفير أدوات وموارد وتدريب عالمي المستوى للناطقين بالعربية، 
                مع الحفاظ على الهوية العربية ومعايير الاحترافية العالمية.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-red to-brand-red-dark" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center text-white">
                    <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                    <div className="text-3xl font-black mb-1">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team */}
          <SectionHeading title="فريقنا" subtitle="نخبة من المحترفين المبدعين" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="glass-card rounded-2xl p-6 text-center card-hover">
                <div className="w-20 h-20 rounded-full bg-brand-red/20 flex items-center justify-center mx-auto mb-4 text-brand-red text-2xl font-bold">
                  {member.initial}
                </div>
                <h4 className="font-bold mb-1">{member.name}</h4>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
