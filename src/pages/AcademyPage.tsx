import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Eye, Grid3X3, List, Clock, Crown } from 'lucide-react';
import { videos, videoCategories } from '@/data/videos';

export default function AcademyPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? videos
    : activeCategory === 'vip'
    ? videos.filter((v) => v.isVip)
    : videos.filter((v) => v.level === activeCategory);

  return (
    <>
      <Helmet>
        <title>الأكاديمية | Mr PowerPoint</title>
        <meta name="description" content="دروس وشروحات يوتيوب احترافية في تصميم العروض التقديمية." />
      </Helmet>

      <div className="pt-[72px] bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">أكاديمية Mr PowerPoint</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              تعلم أسرار تصميم العروض التقديمية الاحترافية مع خبرائنا
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
              {videoCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-brand-red text-white'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.id === 'vip' && <Crown className="w-3.5 h-3.5 inline-block ml-1" />}
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-dark-card shadow-sm' : ''}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-dark-card shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Videos */}
          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video.id)}
                  className="text-right group"
                >
                  <div className="glass-card rounded-2xl overflow-hidden card-hover">
                    <div className="relative h-48 bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center">
                      <Play className="w-12 h-12 text-brand-red opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 text-white text-xs rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                      {video.isVip && (
                        <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/20 text-yellow-600 text-xs rounded-lg flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 group-hover:text-brand-red transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(video.views / 1000).toFixed(0)}K
                        </span>
                        <span>{video.category}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video.id)}
                  className="w-full text-right"
                >
                  <div className="glass-card rounded-2xl p-4 flex items-center gap-4 card-hover">
                    <div className="relative w-40 h-24 rounded-xl bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center shrink-0">
                      <Play className="w-8 h-8 text-brand-red" />
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{video.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{video.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(video.views / 1000).toFixed(0)}K مشاهدة
                        </span>
                        <span>{video.category}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold">لا توجد فيديوهات</h3>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedVideo(null)} />
          <div className="relative w-full max-w-4xl bg-dark-card rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
                <p className="text-lg">مشغل يوتيوب مدمج</p>
                <p className="text-sm opacity-60">سيتم فتح الفيديو هنا</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold">{videos.find((v) => v.id === selectedVideo)?.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
