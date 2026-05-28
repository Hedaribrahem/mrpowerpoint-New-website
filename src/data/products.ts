export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge: 'free' | 'new' | 'bestseller' | null;
  image: string;
  rating: number;
  downloads: number;
}

export const productCategories = [
  { id: 'icons', name: 'أيقونات', icon: '🎯' },
  { id: 'infographics', name: 'مخططات بيانية', icon: '📊' },
  { id: 'shapes', name: 'عناصر جرافيكية', icon: '🔷' },
  { id: 'fonts', name: 'خطوط عربية', icon: '🔤' },
  { id: 'colors', name: 'حزم ألوان', icon: '🎨' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'مجموعة أيقونات أعمال 500+',
    description: 'أيقونات احترافية قابلة للتخصيص لعروض الأعمال',
    price: 29,
    originalPrice: 49,
    category: 'icons',
    badge: 'bestseller',
    image: '/products/icons1.jpg',
    rating: 4.8,
    downloads: 3200,
  },
  {
    id: 2,
    name: 'مخططات بيانية تفاعلية',
    description: '50 مخططاً بيانياً جاهزاً للتعديل',
    price: 0,
    category: 'infographics',
    badge: 'free',
    image: '/products/infographic1.jpg',
    rating: 4.5,
    downloads: 5600,
  },
  {
    id: 3,
    name: 'عناصر جرافيكية إبداعية',
    description: 'أشكال وتصاميم جرافيكية فريدة',
    price: 19,
    category: 'shapes',
    badge: 'new',
    image: '/products/shapes1.jpg',
    rating: 4.7,
    downloads: 1800,
  },
  {
    id: 4,
    name: 'خط Cairo Pro للعروض',
    description: 'خط عربي احترافي مُحسّن للعروض',
    price: 0,
    category: 'fonts',
    badge: 'free',
    image: '/products/font1.jpg',
    rating: 4.9,
    downloads: 8900,
  },
  {
    id: 5,
    name: 'حزمة ألوان العام 2025',
    description: '10 تركيبات ألوان احترافية',
    price: 9,
    originalPrice: 15,
    category: 'colors',
    badge: 'new',
    image: '/products/colors1.jpg',
    rating: 4.6,
    downloads: 2100,
  },
  {
    id: 6,
    name: 'أيقونات طبية متخصصة',
    description: '200+ أيقونة للمجال الطبي',
    price: 24,
    category: 'icons',
    badge: null,
    image: '/products/icons2.jpg',
    rating: 4.4,
    downloads: 1200,
  },
];
