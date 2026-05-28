export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  avatar: string;
  section: string;
  replies: number;
  views: number;
  lastReply: string;
  lastReplyDate: string;
  isPinned: boolean;
  tags: string[];
}

export interface ForumSection {
  id: string;
  name: string;
  description: string;
  icon: string;
  topics: number;
  color: string;
}

export const forumSections: ForumSection[] = [
  {
    id: 'questions',
    name: 'استفسارات',
    description: 'اسأل مجتمعنا عن أي شيء يتعلق بالعروض التقديمية',
    icon: '❓',
    topics: 456,
    color: '#0066CC',
  },
  {
    id: 'showcase',
    name: 'مشاركة أعمال',
    description: 'شارك أعمالك واحصل على ت feedback من المجتمع',
    icon: '🎨',
    topics: 234,
    color: '#E31E24',
  },
  {
    id: 'requests',
    name: 'طلبات التصميم',
    description: 'اطلب تصميماً مخصصاً من مصممينا المبدعين',
    icon: '📝',
    topics: 189,
    color: '#28A745',
  },
  {
    id: 'tips',
    name: 'نصائح وأدوات',
    description: 'شارك النصائح والأدوات التي تستخدمها',
    icon: '💡',
    topics: 312,
    color: '#FFC107',
  },
];

export const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: 'كيف أضيف animation احترافية للشرائح؟',
    author: 'أحمد المبدع',
    avatar: '/avatars/user1.jpg',
    section: 'questions',
    replies: 23,
    views: 456,
    lastReply: 'محمد التقني',
    lastReplyDate: 'منذ ساعة',
    isPinned: true,
    tags: ['powerpoint', 'animation'],
  },
  {
    id: 2,
    title: 'عرضي التقديمي لمشروع التخرج - أرجو تقييمكم',
    author: 'سارة الطالبة',
    avatar: '/avatars/user2.jpg',
    section: 'showcase',
    replies: 45,
    views: 1200,
    lastReply: 'د. خالد',
    lastReplyDate: 'منذ 3 ساعات',
    isPinned: false,
    tags: ['تخرج', 'تقييم'],
  },
  {
    id: 3,
    title: 'طلب تصميم عرض استثماري عاجل',
    author: 'فهد الريادي',
    avatar: '/avatars/user3.jpg',
    section: 'requests',
    replies: 12,
    views: 234,
    lastReply: 'Mr PowerPoint',
    lastReplyDate: 'منذ 5 ساعات',
    isPinned: false,
    tags: ['استثماري', 'عاجل'],
  },
  {
    id: 4,
    title: 'أفضل 5 مواقع لأيقونات مجانية',
    author: 'نورة المصممة',
    avatar: '/avatars/user4.jpg',
    section: 'tips',
    replies: 67,
    views: 3400,
    lastReply: 'أحمد المبدع',
    lastReplyDate: 'منذ يوم',
    isPinned: true,
    tags: ['أيقونات', 'موارد'],
  },
  {
    id: 5,
    title: 'مشكلة في تحميل خطوط عربية على الماك',
    author: 'عمر المستخدم',
    avatar: '/avatars/user5.jpg',
    section: 'questions',
    replies: 8,
    views: 156,
    lastReply: 'التقني سامي',
    lastReplyDate: 'منذ يومين',
    isPinned: false,
    tags: ['mac', 'خطوط'],
  },
];
