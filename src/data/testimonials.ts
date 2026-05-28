export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد الشمري',
    role: 'مدير تسويق',
    company: 'شركة النور التقنية',
    content: 'تعاملت مع Mr PowerPoint لعرض استثماري وكانت النتيجة مذهلة. العرض لفت انتباه جميع المستثمرين وساهم في إغلاق الصفقة بنجاح. أنصح الجميع بالتعامل معهم.',
    rating: 5,
    avatar: '/avatars/avatar1.jpg',
  },
  {
    id: 2,
    name: 'سارة العتيبي',
    role: 'مدربة معتمدة',
    company: 'أكاديمية التطوير',
    content: 'منذ اكتشفت Mr PowerPoint، تحولت عروضي التدريبية بالكامل. القوالب سهلة الاستخدام والفريق متعاون جداً. شكراً لكم على الإبداع المستمر.',
    rating: 5,
    avatar: '/avatars/avatar2.jpg',
  },
  {
    id: 3,
    name: 'محمد القحطاني',
    role: 'رائد أعمال',
    company: 'ناشئ تك',
    content: 'النماذج المجانية وحدها رائعة، لكن الباقة المدفوعة تفتح عالماً آخر من الإمكانيات. استثمار يستحق كل ريال.',
    rating: 5,
    avatar: '/avatars/avatar3.jpg',
  },
  {
    id: 4,
    name: 'نورة الدوسري',
    role: 'طبيبة استشارية',
    company: 'مستشفى الملك فهد',
    content: 'صمموا لي عرضاً لمؤتمر طبي دولي والنتيجة كانت احترافية بمعنى الكلمة. رسومهم البيانية واضحة والتصميم أنيق جداً.',
    rating: 4,
    avatar: '/avatars/avatar4.jpg',
  },
  {
    id: 5,
    name: 'خالد الزهراني',
    role: 'مدير عام',
    company: 'مجموعة البستان',
    content: 'خدمة ممتازة وسرعة في التنفيذ. العرض التقديمي الذي صمموه لنا تجاوز توقعاتنا بكثير. سنتعامل معهم مرة أخرى بالتأكيد.',
    rating: 5,
    avatar: '/avatars/avatar5.jpg',
  },
];
