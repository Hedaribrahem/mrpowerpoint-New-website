export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
  price: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: 'تصميم عروض تقديمية مخصصة',
    description: 'نصمم عروضاً تقديمية فريدة من الصفر تناسب علامتك التجارية وأهدافك',
    features: [
      'تصميم فريد من الصفر',
      'رسوم بيانية مخصصة',
      'أيقونات احترافية',
      'تنسيق عربي/إنجليزي',
      'تعديلات حتى الرضا التام',
    ],
    icon: '🎨',
    price: 'يبدأ من 500 ر.س',
    image: '/services/custom-design.jpg',
  },
  {
    id: 2,
    title: 'تخصيص قوالب جاهزة',
    description: 'نخصص قوالبنا الاحترافية لتناسب هويتك البصرية ومحتواك',
    features: [
      'اختيار من مكتبتنا',
      'تغيير الألوان والخطوط',
      'إضافة المحتوى الخاص بك',
      'تعديل الشرائح',
      'تسليم سريع',
    ],
    icon: '📑',
    price: 'يبدأ من 200 ر.س',
    image: '/services/template-custom.jpg',
  },
  {
    id: 3,
    title: 'هويات بصرية للعروض',
    description: 'ننشئ هوية بصرية متكاملة لعروضك التقديمية بما في ذلك الألوان والخطوط',
    features: [
      'لوحة ألوان مخصصة',
      'خطوط احترافية',
      'قوالب رئيسية',
      'دليل استخدام',
      'ملفات المصدر',
    ],
    icon: '✨',
    price: 'يبدأ من 1000 ر.س',
    image: '/services/visual-identity.jpg',
  },
  {
    id: 4,
    title: 'دورات تدريبية وورش عمل',
    description: 'تعلم أسرار تصميم العروض التقديمية الاحترافية مع خبرائنا',
    features: [
      'ورش تفاعلية',
      'محتوى عملي',
      'شهادة إتمام',
      'دعم ما بعد التدريب',
      'مواد تعليمية',
    ],
    icon: '🎓',
    price: 'يبدأ من 300 ر.س',
    image: '/services/training.jpg',
  },
];
