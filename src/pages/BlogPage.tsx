import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, FileText } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blog';
import SectionHeading from '@/components/shared/SectionHeading';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>المدونة | Mr PowerPoint</title>
        <meta name="description" content="نصائح، دروس، ورؤى من عالم تصميم العروض التقديمية." />
      </Helmet>

      <div className="pt-[72px]">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">المدونة</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              نصائح، دروس، واتجاهات من عالم تصميم العروض التقديمية
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="أحدث المقالات" subtitle="تعلم واستلهم من محتوانا المتجدد" />

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center">
            {blogCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="group">
                <div className="glass-card rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-brand-red/30 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-brand-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-brand-red text-sm font-medium">
                      اقرأ المزيد
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
