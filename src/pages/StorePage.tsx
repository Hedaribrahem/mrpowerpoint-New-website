import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Star, Download, Package, Check } from 'lucide-react';
import { products, productCategories } from '@/data/products';

interface CartItem {
  productId: number;
  quantity: number;
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Helmet>
        <title>المتجر | Mr PowerPoint</title>
        <meta name="description" content="أيقونات، مخططات بيانية، خطوط عربية، وحزم ألوان احترافية." />
      </Helmet>

      {/* ✅ نفس طريقة النماذج - Hero يبدأ من فوق */}
      <div className="pt-[72px] relative bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="text-gradient">Mr Store</span>
                </h1>
                <p className="text-muted-foreground">موارد احترافية لتصميم عروضك</p>
              </div>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-red text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-brand-red text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              الكل
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="glass-card rounded-2xl overflow-hidden card-hover group">
                <div className="relative h-48 bg-gradient-to-br from-brand-red/15 to-brand-red/5 flex items-center justify-center">
                  <Package className="w-16 h-16 text-brand-red/30" />
                  {product.badge && (
                    <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${
                      product.badge === 'free'
                        ? 'bg-green-500/20 text-green-600'
                        : product.badge === 'new'
                        ? 'bg-brand-red-transparent text-brand-red'
                        : 'bg-yellow-500/20 text-yellow-600'
                    }`}>
                      {product.badge === 'bestseller' ? 'الأكثر مبيعاً' : product.badge === 'new' ? 'جديد' : 'مجاني'}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-brand-red text-white text-xs rounded-lg">
                      خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.downloads} تحميل)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.price === 0 ? (
                        <span className="text-green-600 font-bold">مجاني</span>
                      ) : (
                        <>
                          <span className="font-bold text-lg">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
                          )}
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        addedToCart === product.id
                          ? 'bg-green-500 text-white'
                          : 'bg-brand-red hover:bg-brand-red-dark text-white'
                      }`}
                    >
                      {addedToCart === product.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          تمت الإضافة
                        </>
                      ) : product.price === 0 ? (
                        <>
                          <Download className="w-4 h-4" />
                          تحميل
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          أضف للسلة
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-96 max-w-[90vw] bg-background shadow-2xl overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">سلة المشتريات</h2>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">السلة فارغة</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => {
                      const product = products.find((p) => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <div key={item.productId} className="flex items-center gap-3 glass-card rounded-xl p-3">
                          <div className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                            <Package className="w-6 h-6 text-brand-red" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              ${product.price} × {item.quantity}
                            </p>
                          </div>
                          <div className="font-bold text-sm">
                            ${(product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold">الإجمالي</span>
                      <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full btn-primary py-3">إتمام الشراء</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}