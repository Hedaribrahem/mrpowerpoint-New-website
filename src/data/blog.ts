export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  avatar: string;
}

export const blogCategories = [
  { id: 'all', name: 'الكل' },
  { id: 'tips', name: 'نصائح تصميم' },
  { id: 'trends', name: 'اتجاهات' },
  { id: 'tools', name: 'أدوات' },
  { id: 'tutorials', name: 'دروس' },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 أخطاء شائعة في تصميم العروض التقديمية',
    excerpt: 'تجنب هذه الأخطاء لتحسين عروضك التقديمية بشكل فوري',
    content: 'المقال الكامل هنا...',
    image: '/blog/blog1.jpg',
    category: 'tips',
    date: '2025-05-25',
    readTime: '5 دقائق',
    author: 'فريق Mr PowerPoint',
    avatar: '/avatars/team1.jpg',
  },
  {
    id: 2,
    title: 'اتجاهات تصميم العروض لعام 2025',
    excerpt: 'اكتشف أحدث الاتجاهات في عالم تصميم العروض التقديمية',
    content: 'المقال الكامل هنا...',
    image: '/blog/blog2.jpg',
    category: 'trends',
    date: '2025-05-22',
    readTime: '7 دقائق',
    author: 'فريق Mr PowerPoint',
    avatar: '/avatars/team1.jpg',
  },
  {
    id: 3,
    title: 'كيف تختار الخط المناسب لعرضك',
    excerpt: 'دليلك الشامل لاختيار الخطوط العربية والإنجليزية',
    content: 'المقال الكامل هنا...',
    image: '/blog/blog3.jpg',
    category: 'tutorials',
    date: '2025-05-20',
    readTime: '4 دقائق',
    author: 'فريق Mr PowerPoint',
    avatar: '/avatars/team1.jpg',
  },
  {
    id: 4,
    title: 'أفضل أدوات AI لتصميم العروض',
    excerpt: 'استكشف كيف يمكن للذكاء الاصطناعي مساعدتك',
    content: 'المقال الكامل هنا...',
    image: '/blog/blog4.jpg',
    category: 'tools',
    date: '2025-05-18',
    readTime: '6 دقائق',
    author: 'فريق Mr PowerPoint',
    avatar: '/avatars/team1.jpg',
  },
  {
    id: 5,
    title: 'دليل الألوان الكامل للمبتدئين',
    excerpt: 'تعلم كيف تنسق الألوان في عروضك التقديمية',
    content: 'المقال الكامل هنا...',
    image: '/blog/blog5.jpg',
    category: 'tutorials',
    date: '2025-05-15',
    readTime: '8 دقائق',
    author: 'فريق Mr PowerPoint',
    avatar: '/avatars/team1.jpg',
  },
  {
    id: 6,
    title: 'نصائح لعرض ناجح أمام الجمهور',
    excerpt: 'أسرار الإلقاء المؤثر والثقة على المسرح',
    content: 'المقال الكامل هنا...',
    image: '/blog/blog6.jpg',
    category: 'tips',
    date: '2025-05-12',
    readTime: '5 دقائق',
    author: 'فريق Mr PowerPoint',
    avatar: '/avatars/team1.jpg',
  },
];
