import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, FileText } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.id === Number(slug));

  if (!post) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">المقال غير موجود</h1>
          <Link to="/blog" className="text-brand-red hover:underline">
            العودة للمدونة
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{post.title} | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] relative bg-gradient-to-b from-brand-red-transparent to-background">
        <article className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/blog" className="hover:text-brand-red transition-colors">المدونة</Link>
            <span>/</span>
            <span>{post.title}</span>
          </div>

          {/* Header */}
          <div className="max-w-3xl mx-auto">
            <div className="h-64 md:h-80 bg-gradient-to-br from-brand-red/20 to-brand-red/5 rounded-2xl flex items-center justify-center mb-8">
              <FileText className="w-24 h-24 text-brand-red/20" />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="px-3 py-1 bg-brand-red-transparent text-brand-red rounded-full text-xs">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold">
                م
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-muted-foreground">فريق Mr PowerPoint</div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert leading-relaxed">
              <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
              <p className="mb-4">
                يعتبر تصميم العروض التقديمية من المهارات الأساسية في عالم الأعمال اليوم. 
                سواء كنت تقدم لمستثمرين، طلاب، أو فريق العمل، فإن عرضك التقديمي هو انعكاس 
                لاحترافيتك واهتمامك بالتفاصيل.
              </p>
              <p className="mb-4">
                في هذا المقال، سنستكشف أهم النصائح والاستراتيجيات التي تساعدك على إنشاء 
                عروض تقديمية مؤثرة تجذب انتباه جمهورك وتترك انطباعاً دائماً.
              </p>
              <h2 className="text-2xl font-bold mt-8 mb-4">أهمية التصميم الاحترافي</h2>
              <p className="mb-4">
                العرض التقديمي الجيد ليس مجرد مجموعة شرائح. إنه أداة تواصل قوية تساعدك 
                على نقل رسالتك بفعالية. تشير الدراسات إلى أن 65% من الناس هم متعلمون بصريون، 
                مما يعني أن التصميم الجيد يلعب دوراً حاسماً في فهم واستيعاب المعلومات.
              </p>
              <h2 className="text-2xl font-bold mt-8 mb-4">العناصر الأساسية</h2>
              <p className="mb-4">
                لإنشاء عرض تقديمي ناجح، ركز على هذه العناصر الأساسية: وضوح الرسالة، 
                التصميم البصري المتناسق، استخدام البيانات والرسوم البيانية، والتفاعل مع الجمهور.
              </p>
              <p className="mb-4">
                تذكر دائماً أن العرض التقديمي هو أداة دعم لكلمتك، وليس بديلاً عنها. 
                حافظ على بساطة الشرائح ودع شخصيتك تشرح التفاصيل.
              </p>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-xl font-bold mb-6">مقالات ذات صلة</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link to={`/blog/${r.id}`} key={r.id} className="glass-card rounded-xl p-4 card-hover">
                      <h4 className="font-bold mb-1 hover:text-brand-red transition-colors">{r.title}</h4>
                      <p className="text-sm text-muted-foreground">{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
