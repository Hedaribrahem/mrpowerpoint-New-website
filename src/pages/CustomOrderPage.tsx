import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Save, Check, FileText, Palette, Calendar, DollarSign, Upload, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const steps = [
  { id: 1, title: 'نوع العرض', icon: FileText },
  { id: 2, title: 'التفاصيل', icon: FileText },
  { id: 3, title: 'الأسلوب', icon: Palette },
  { id: 4, title: 'الألوان', icon: Palette },
  { id: 5, title: 'الموعد', icon: Calendar },
  { id: 6, title: 'الميزانية', icon: DollarSign },
  { id: 7, title: 'المرفقات', icon: Upload },
  { id: 8, title: 'التواصل', icon: MessageCircle },
];

const presentationTypes = [
  { id: 'full', name: 'عرض تقديمي كامل', desc: 'تصميم عرض من الصفر' },
  { id: 'edit', name: 'تعديل عرض موجود', desc: 'تحسين عرضك الحالي' },
  { id: 'template', name: 'قالب مخصص', desc: 'قالب reusable خاص بك' },
  { id: 'branding', name: 'هوية بصرية', desc: 'هوية متكاملة للعروض' },
];

const styles = [
  { id: 'classic', name: 'كلاسيكي', icon: '🏛️' },
  { id: 'modern', name: 'عصري', icon: '🚀' },
  { id: 'creative', name: 'إبداعي', icon: '🎨' },
  { id: 'minimal', name: 'مينيمالي', icon: '◻️' },
  { id: 'luxury', name: 'فاخر', icon: '💎' },
];

const budgets = [
  { id: '500-1000', range: '500 - 1,000 ر.س', desc: 'مناسب للعروض البسيطة' },
  { id: '1000-3000', range: '1,000 - 3,000 ر.س', desc: 'الأكثر شيوعاً' },
  { id: '3000-5000', range: '3,000 - 5,000 ر.س', desc: 'للعروض المتقدمة' },
  { id: '5000+', range: '5,000+ ر.س', desc: 'للعروض المؤسسية' },
];

export default function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type: '',
    slides: 20,
    topic: '',
    audience: '',
    purpose: '',
    style: '',
    colors: '',
    deadline: '',
    budget: '',
    files: [] as File[],
    contactMethod: 'email',
    email: '',
    whatsapp: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | number | File[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canNext = () => {
    switch (step) {
      case 1: return !!form.type;
      case 2: return !!form.topic && !!form.audience;
      case 3: return !!form.style;
      case 4: return !!form.colors;
      case 5: return !!form.deadline;
      case 6: return !!form.budget;
      case 7: return true;
      case 8: return !!form.email;
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const estimatedPrice = form.budget ? budgets.find((b) => b.id === form.budget)?.range : '---';

  if (submitted) {
    return (
      <>
        <Helmet><title>تم إرسال الطلب | Mr PowerPoint</title></Helmet>
        <div className="pt-[72px] min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-3">تم إرسال طلبك بنجاح!</h1>
            <p className="text-muted-foreground mb-6">
              سنراجع طلبك ونتواصل معك خلال 24 ساعة. رقم الطلب: #ORD-{Date.now().toString().slice(-6)}
            </p>
            <div className="glass-card rounded-2xl p-4 mb-6 text-right">
              <h3 className="font-bold mb-2">ملخص الطلب</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">النوع</span><span>{presentationTypes.find((t) => t.id === form.type)?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">الموضوع</span><span>{form.topic}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">التقدير</span><span className="text-brand-red font-bold">{estimatedPrice}</span></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>طلب تصميم مخصص | Mr PowerPoint</title></Helmet>

      <div className="pt-[72px]">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">طلب تصميم مخصص</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              أخبرنا عما تحتاج وسنقوم بتحويله إلى عرض تقديمي استثنائي
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-3xl mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-brand-red -translate-y-1/2 transition-all"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    s.id <= step ? 'bg-brand-red text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s.id < step ? <Check className="w-5 h-5" /> : s.id}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-3xl mx-auto mt-2">
              {steps.map((s) => (
                <span key={s.id} className={`text-xs ${s.id <= step ? 'text-brand-red font-medium' : 'text-muted-foreground'}`}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Type */}
            {step === 1 && (
              <div>
                <SectionHeading title="ما نوع العرض الذي تحتاجه؟" centered />
                <div className="grid sm:grid-cols-2 gap-4">
                  {presentationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => update('type', type.id)}
                      className={`glass-card rounded-2xl p-6 text-right transition-all ${
                        form.type === type.id ? 'ring-2 ring-brand-red' : 'card-hover'
                      }`}
                    >
                      <h3 className="font-bold mb-1">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div>
                <SectionHeading title="تفاصيل العرض" centered />
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">عدد الشرائح</label>
                    <input
                      type="number"
                      value={form.slides}
                      onChange={(e) => update('slides', Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الموضوع *</label>
                    <input
                      type="text"
                      value={form.topic}
                      onChange={(e) => update('topic', e.target.value)}
                      placeholder="مثال: عرض استثماري لمشروع تقني"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الجمهور المستهدف *</label>
                    <input
                      type="text"
                      value={form.audience}
                      onChange={(e) => update('audience', e.target.value)}
                      placeholder="مثال: مستثمرون، طلاب، عملاء"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الغرض من العرض</label>
                    <select
                      value={form.purpose}
                      onChange={(e) => update('purpose', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    >
                      <option value="">اختر الغرض</option>
                      <option value="marketing">تسويقي</option>
                      <option value="educational">تعليمي</option>
                      <option value="investment">استثماري</option>
                      <option value="technical">تقني</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Style */}
            {step === 3 && (
              <div>
                <SectionHeading title="اختر الأسلوب" centered />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => update('style', s.id)}
                      className={`glass-card rounded-2xl p-6 text-center transition-all ${
                        form.style === s.id ? 'ring-2 ring-brand-red' : 'card-hover'
                      }`}
                    >
                      <span className="text-4xl mb-3 block">{s.icon}</span>
                      <h3 className="font-bold">{s.name}</h3>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Colors */}
            {step === 4 && (
              <div>
                <SectionHeading title="اختر ألوان العرض" centered />
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">لوحة ألوان جاهزة</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['أحمر وأزرق', 'أخضر وذهبي', 'بنفسجي ووردي', 'أزرق ورمادي', 'أسود وأحمر', 'متعدد الألوان'].map((palette) => (
                        <button
                          key={palette}
                          onClick={() => update('colors', palette)}
                          className={`p-4 rounded-xl border transition-colors ${
                            form.colors === palette ? 'border-brand-red bg-brand-red-transparent' : 'border-input hover:border-muted-foreground'
                          }`}
                        >
                          {palette}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">أو حدد ألوانك المخصصة</label>
                    <input
                      type="text"
                      onChange={(e) => update('colors', e.target.value)}
                      placeholder="مثال: #E31E24, #0066CC"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Deadline */}
            {step === 5 && (
              <div>
                <SectionHeading title="موعد التسليم" centered />
                <div>
                  <label className="block text-sm font-medium mb-1">تاريخ التسليم المطلوب</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => update('deadline', e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    💡 تلميح: عرض 20 شريحة يحتاج عادةً 3–5 أيام عمل.
                  </p>
                </div>
              </div>
            )}

            {/* Step 6: Budget */}
            {step === 6 && (
              <div>
                <SectionHeading title="الميزانية المتوقعة" centered />
                <div className="space-y-3">
                  {budgets.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => update('budget', b.id)}
                      className={`w-full glass-card rounded-2xl p-5 text-right flex items-center justify-between transition-all ${
                        form.budget === b.id ? 'ring-2 ring-brand-red' : 'card-hover'
                      }`}
                    >
                      <div>
                        <h3 className="font-bold">{b.range}</h3>
                        <p className="text-sm text-muted-foreground">{b.desc}</p>
                      </div>
                      <DollarSign className="w-6 h-6 text-brand-red" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Attachments */}
            {step === 7 && (
              <div>
                <SectionHeading title="المرفقات" centered />
                <div className="glass-card rounded-2xl p-8 text-center border-dashed border-2 border-border hover:border-brand-red/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold mb-2">اسحب الملفات هنا أو انقر للاختيار</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    يمكنك رفع الشعارات، الصور، أو عروض سابقة للتعديل
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, PPTX, JPG, PNG (Max 50MB)</p>
                </div>
              </div>
            )}

            {/* Step 8: Contact */}
            {step === 8 && (
              <div>
                <SectionHeading title="معلومات التواصل" centered />
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">طريقة التواصل المفضلة</label>
                    <div className="flex gap-3">
                      {[
                        { id: 'email', label: 'البريد' },
                        { id: 'whatsapp', label: 'واتساب' },
                        { id: 'meeting', label: 'اجتماع أونلاين' },
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => update('contactMethod', method.id)}
                          className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                            form.contactMethod === method.id ? 'bg-brand-red text-white' : 'bg-muted'
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">رقم الواتساب</label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => update('whatsapp', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Calculator */}
          <div className="max-w-2xl mx-auto mt-8 glass-card rounded-2xl p-4 bg-gradient-to-br from-brand-red-transparent to-brand-red/5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">التقدير المبدئي:</span>
              <span className="text-xl font-black text-brand-red">{estimatedPrice}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mt-8">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-ghost inline-flex items-center gap-1">
                <ChevronRight className="w-4 h-4" />
                السابق
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => step < 8 ? setStep(step + 1) : handleSubmit()}
              disabled={!canNext()}
              className="btn-primary inline-flex items-center gap-1 disabled:opacity-50"
            >
              {step === 8 ? 'إرسال الطلب' : 'التالي'}
              {step < 8 && <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Save Draft */}
          <div className="text-center mt-4">
            <button className="text-sm text-muted-foreground hover:text-brand-red transition-colors inline-flex items-center gap-1">
              <Save className="w-4 h-4" />
              حفظ كمسودة
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
