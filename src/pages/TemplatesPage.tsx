import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Download, Star, X, Crown } from 'lucide-react';
import { templates, categories, styles, fields } from '@/data/templates';
import AnimatedRibbon from '@/components/shared/AnimatedRibbon';

type BadgeType = 'free' | 'vip' | 'new';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedField, setSelectedField] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...templates];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (selectedStyle !== 'all') {
      result = result.filter((t) => t.style === selectedStyle);
    }
    if (selectedField !== 'all') {
      result = result.filter((t) => t.field === selectedField);
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedStyle, selectedField, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedStyle !== 'all',
    selectedField !== 'all',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedField('all');
    setSearchQuery('');
  };

  const getBadgeConfig = (badge: BadgeType | null) => {
    switch (badge) {
      case 'free':
        return { text: 'مجاني', className: 'bg-green-500/20 text-green-600' };
      case 'vip':
        return { text: 'VIP', className: 'bg-yellow-500/20 text-yellow-600' };
      case 'new':
        return { text: 'جديد', className: 'bg-brand-red-transparent text-brand-red' };
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>النماذج المجانية | Mr PowerPoint</title>
        <meta name="description" content="اكتشف مكتبتنا الغنية من قوالب PowerPoint الاحترافية المجانية. تصفح حسب الفئة، الأسلوب، والمجال." />
      </Helmet>

      {/* Hero */}
      <div className="pt-[72px] relative bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">مركز تحميل النماذج</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              مكتبة غنية بقوالب PowerPoint الاحترافية الجاهزة للتحميل
            </p>
          </div>
        </div>
      </div>

      <AnimatedRibbon variant="divider" />

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في النماذج..."
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30 text-sm"
              >
                <option value="newest">الأحدث</option>
                <option value="popular">الأكثر شيوعاً</option>
                <option value="rated">الأعلى تقييماً</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors text-sm ${
                  showFilters || activeFiltersCount > 0
                    ? 'border-brand-red bg-brand-red-transparent text-brand-red'
                    : 'border-input bg-background'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                فلترة
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-red text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-8">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  >
                    <option value="all">الكل</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الأسلوب</label>
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  >
                    <option value="all">الكل</option>
                    {styles.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">المجال</label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  >
                    <option value="all">الكل</option>
                    {fields.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-brand-red hover:underline"
                >
                  مسح جميع الفلاتر
                </button>
              )}
            </div>
          )}

          {/* Active Filters */}
          {activeFiltersCount > 0 && !showFilters && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-red-transparent text-brand-red text-sm">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedStyle !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-red-transparent text-brand-red text-sm">
                  {selectedStyle}
                  <button onClick={() => setSelectedStyle('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedField !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-red-transparent text-brand-red text-sm">
                  {selectedField}
                  <button onClick={() => setSelectedField('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} نموذج متاح
          </p>

          {/* Templates Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((template) => {
                const badge = getBadgeConfig(template.badge);
                return (
                  <Link to={`/templates/${template.id}`} key={template.id}>
                    <div className="glass-card rounded-2xl overflow-hidden card-hover group">
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-brand-red/15 to-brand-red/5 flex items-center justify-center overflow-hidden">
                        <div className="text-center p-4 transition-transform duration-500 group-hover:scale-110">
                          <div className="text-6xl mb-2">
                            {categories.find((c) => c.id === template.category)?.icon}
                          </div>
                          <div className="text-sm font-bold">{template.title}</div>
                        </div>
                        {badge && (
                          <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${badge.className}`}>
                            {badge.text}
                          </span>
                        )}
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-brand-red transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{categories.find((c) => c.id === template.category)?.name}</span>
                          <span>{template.slides} شريحة</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{template.rating}</span>
                            <span className="text-xs text-muted-foreground">({template.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Download className="w-4 h-4" />
                            <span className="text-xs">{(template.downloads / 1000).toFixed(1)}K</span>
                          </div>
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-medium transition-colors">
                          <Download className="w-4 h-4" />
                          تحميل النموذج
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-4">جرب تغيير معايير البحث أو الفلاتر</p>
              <button onClick={clearFilters} className="btn-primary">
                مسح الفلاتر
              </button>
            </div>
          )}

          {/* VIP Callout */}
          <div className="mt-16 glass-card rounded-2xl p-8 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-xl font-bold mb-2">انضم إلى عالم VIP</h3>
                <p className="text-muted-foreground">
                  احصل على نماذج حصرية غير محدودة، بدون إعلانات، مع دعم مباشرPriority.
                </p>
              </div>
              <Link to="/pricing" className="btn-primary shrink-0">
                اكتشف الباقات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
