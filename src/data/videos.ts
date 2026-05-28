export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
  level: 'beginner' | 'advanced' | 'tips' | 'theory';
  isVip: boolean;
  youtubeId: string;
  dateAdded: string;
}

export const videoCategories = [
  { id: 'all', name: 'الكل' },
  { id: 'beginner', name: 'مبتدئين' },
  { id: 'advanced', name: 'متقدم' },
  { id: 'tips', name: 'نصائح وحيل' },
  { id: 'theory', name: 'نظريات التصميم' },
  { id: 'vip', name: 'حصرية VIP' },
];

export const videos: Video[] = [
  {
    id: 1,
    title: 'أساسيات PowerPoint للمبتدئين',
    description: 'تعلم الأساسيات من الصفر',
    thumbnail: '/videos/thumb1.jpg',
    duration: '15:30',
    views: 45000,
    category: 'مبتدئين',
    level: 'beginner',
    isVip: false,
    youtubeId: 'dQw4w9WgXcQ',
    dateAdded: '2025-05-20',
  },
  {
    id: 2,
    title: 'تصميم شرائح احترافية',
    description: 'أسرار تصميم شرائح مذهلة',
    thumbnail: '/videos/thumb2.jpg',
    duration: '22:15',
    views: 32000,
    category: 'متقدم',
    level: 'advanced',
    isVip: false,
    youtubeId: 'dQw4w9WgXcQ',
    dateAdded: '2025-05-18',
  },
  {
    id: 3,
    title: '10 حيل سحرية في PowerPoint',
    description: 'حيل ستغير طريقة عملك',
    thumbnail: '/videos/thumb3.jpg',
    duration: '12:45',
    views: 67000,
    category: 'نصائح وحيل',
    level: 'tips',
    isVip: false,
    youtubeId: 'dQw4w9WgXcQ',
    dateAdded: '2025-05-15',
  },
  {
    id: 4,
    title: 'نظرية الألوان في العروض',
    description: 'ك تختار الألوان المناسبة',
    thumbnail: '/videos/thumb4.jpg',
    duration: '18:20',
    views: 28000,
    category: 'نظريات التصميم',
    level: 'theory',
    isVip: false,
    youtubeId: 'dQw4w9WgXcQ',
    dateAdded: '2025-05-12',
  },
  {
    id: 5,
    title: 'رسوم بيانية احترافية',
    description: 'تصميم رسوم بيانية مؤثرة',
    thumbnail: '/videos/thumb5.jpg',
    duration: '25:10',
    views: 19000,
    category: 'متقدم',
    level: 'advanced',
    isVip: true,
    youtubeId: 'dQw4w9WgXcQ',
    dateAdded: '2025-05-10',
  },
  {
    id: 6,
    title: 'animation وانتقالات سلسة',
    description: 'أضف الحركة لعروضك',
    thumbnail: '/videos/thumb6.jpg',
    duration: '20:00',
    views: 24000,
    category: 'نصائح وحيل',
    level: 'tips',
    isVip: false,
    youtubeId: 'dQw4w9WgXcQ',
    dateAdded: '2025-05-08',
  },
];
