import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Download,
  MessageCircle,
  Palette,
  FileText,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react';
import AnimatedRibbon from '@/components/shared/AnimatedRibbon';
import ParticleBackground from '@/components/shared/ParticleBackground';
import TypewriterText from '@/components/shared/TypewriterText';
import CountUp from '@/components/shared/CountUp';
import SectionHeading from '@/components/shared/SectionHeading';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { blogPosts } from '@/data/blog';


gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !slidesRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );

    gsap.fromTo(
      slidesRef.current.children,
      { x: -50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-brand-red-transparent" />
      <ParticleBackground />
      <AnimatedRibbon variant="hero" />

      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div ref={textRef} className="order-2 lg:order-1 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red-transparent text-brand-red text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              أكثر من 500 نموذج مجاني متاح الآن
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="text-foreground">عروض تقديمية</span>
              <br />
              <TypewriterText
                text="تُلهم. أفكار تُؤثر."
                className="text-gradient"
              />
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              نحوّل أفكارك إلى عروض تقديمية احترافية تخطف الأنظار وتترك انطباعاً لا يُنسى
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/templates" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                <Download className="w-5 h-5" />
                استكشف النماذج المجانية
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                <MessageCircle className="w-5 h-5" />
                تواصل معنا
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-red">500+</div>
                <div className="text-sm text-muted-foreground">نموذج مجاني</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-red">50K+</div>
                <div className="text-sm text-muted-foreground">عميل سعيد</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-red">4.9</div>
                <div className="text-sm text-muted-foreground">متوسط التقييم</div>
              </div>
            </div>
          </div>

          {/* Floating Slides */}
          <div ref={slidesRef} className="order-1 lg:order-2 relative h-[400px] lg:h-[500px]">
            <div className="absolute top-4 right-4 w-64 h-44 rounded-2xl bg-gradient-to-br from-brand-red/20 to-brand-red/5 border border-brand-red/20 shadow-xl animate-float backdrop-blur-sm flex items-center justify-center">
              <div className="text-center p-4">
                <FileText className="w-12 h-12 text-brand-red mx-auto mb-2" />
                <div className="text-sm font-bold">عرض تسويقي</div>
                <div className="text-xs text-muted-foreground">25 شريحة</div>
              </div>
            </div>
            <div className="absolute top-20 left-4 w-60 h-40 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 shadow-xl animate-float-slow backdrop-blur-sm flex items-center justify-center" style={{ animationDelay: '1s' }}>
              <div className="text-center p-4">
                <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-bold">عرض تعليمي</div>
                <div className="text-xs text-muted-foreground">30 شريحة</div>
              </div>
            </div>
            <div className="absolute bottom-16 right-16 w-56 h-36 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 shadow-xl animate-float backdrop-blur-sm flex items-center justify-center" style={{ animationDelay: '2s' }}>
              <div className="text-center p-4">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-bold">عرض استثماري</div>
                <div className="text-xs text-muted-foreground">35 شريحة</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-12 w-52 h-32 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 shadow-xl animate-float-slow backdrop-blur-sm flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
              <div className="text-center p-4">
                <Palette className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <div className="text-sm font-bold">عرض إبداعي</div>
                <div className="text-xs text-muted-foreground">22 شريحة</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.service-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const icons = [Palette, FileText, GraduationCap, Sparkles];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-main mx-auto">
        <SectionHeading
          title="خدماتنا المتميزة"
          subtitle="حلول متكاملة لجميع احتياجاتك في تصميم العروض التقديمية"
        />
        <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={service.id}
                className="service-card glass-card rounded-2xl p-6 card-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-red-transparent flex items-center justify-center mb-4 group-hover:bg-brand-red transition-colors">
                  <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-brand-red text-sm font-medium hover:gap-2 transition-all"
                >
                  اكتشف المزيد
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="section-padding">
      <div className="container-main mx-auto">
        <SectionHeading
          title="قبل وبعد"
          subtitle="شاهد الفرق بين العرض العادي والعرض الاحترافي"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">عرض عادي</h3>
                <p className="text-gray-600">تصميم بسيط بدون هوية بصرية</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-gray-600 text-white text-sm rounded-full">
              قبل
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-background to-brand-red/10 flex items-center justify-center">
              <div className="text-center p-8">
                <Sparkles className="w-20 h-20 text-brand-red mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-red mb-2">عرض احترافي</h3>
                <p className="text-muted-foreground">تصميم مخصص بهوية بصرية متكاملة</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-brand-red text-white text-sm rounded-full">
              بعد
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: FileText, value: 500, suffix: '+', label: 'نموذج مجاني' },
    { icon: Download, value: 1200000, suffix: '+', label: 'تحميل' },
    { icon: Play, value: 150, suffix: '+', label: 'فيديو تعليمي' },
    { icon: Users, value: 50000, suffix: '+', label: 'عميل سعيد' },
    { icon: Award, value: 200, suffix: '+', label: 'مشروع مخصص' },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-red to-brand-red-dark" />
      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center text-white">
                <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-black mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-main mx-auto">
        <SectionHeading
          title="آراء عملائنا"
          subtitle="ماذا يقول عملاؤنا عن تجربتهم معنا"
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="w-full shrink-0 px-4"
                >
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-lg mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role} — {t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 right-0 p-2 rounded-full bg-white dark:bg-dark-card shadow-lg hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 left-0 p-2 rounded-full bg-white dark:bg-dark-card shadow-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-brand-red' : 'bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreviewSection() {
  return (
    <section className="section-padding">
      <div className="container-main mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">أحدث المقالات</h2>
            <p className="text-muted-foreground mt-2">نصائح ورؤى من عالم تصميم العروض التقديمية</p>
          </div>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-1 text-brand-red font-medium hover:gap-2 transition-all">
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group">
              <div className="glass-card rounded-2xl overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-brand-red/20 to-brand-red/5 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-brand-red/40" />
                </div>
                <div className="p-5">
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
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red via-brand-red to-brand-red-dark" />
      <AnimatedRibbon variant="cta" />
      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          جاهز لعروض تقديمية استثنائية؟
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          انضم إلى آلاف العملاء الذين يثقون بنا في تصميم عروضهم التقديمية
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/templates" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-red rounded-xl font-bold text-lg hover:bg-white/90 transition-colors shadow-xl">
            تصفح النماذج المجانية
          </Link>
          <Link to="/custom-order" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
            اطلب تصميماً مخصصاً
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Mr PowerPoint | عروض تقديمية احترافية</title>
        <meta name="description" content="Mr PowerPoint - عروض تقديمية تُلهم. أفكار تُؤثر. نماذج مجانية، تصميم مخصص، أكاديمية تدريبية." />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <BeforeAfterSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  );
}
