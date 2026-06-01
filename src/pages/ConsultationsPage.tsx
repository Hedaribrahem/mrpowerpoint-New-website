import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Video, Users, Clock, Check } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const sessionTypes = [
  {
    id: 'review',
    title: 'مراجعة عرض تقديمي',
    description: 'سنراجع عرضك الحالي ونقدم توصيات مفصلة للتحسين',
    duration: '45 دقيقة',
    price: 200,
    icon: MessageCircle,
  },
  {
    id: 'training',
    title: 'تدريب شخصي',
    description: 'جلسة تدريبية مخصصة لتعلم مهارات جديدة',
    duration: '60 دقيقة',
    price: 300,
    icon: Video,
  },
  {
    id: 'design',
    title: 'استشارة تصميم',
    description: 'نصائح احترافية لتصميم عروض مؤثرة',
    duration: '30 دقيقة',
    price: 150,
    icon: Users,
  },
];

const timeSlots = [
  '9:00 ص', '10:00 ص', '11:00 ص', '12:00 م',
  '1:00 م', '2:00 م', '3:00 م', '4:00 م',
];

export default function ConsultationsPage() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const selectedSession = sessionTypes.find((s) => s.id === selectedType);

  return (
    <>
      <Helmet>
        <title>حجز استشارات | Mr PowerPoint</title>
        <meta name="description" content="احجز جلسة استشارية مع خبرائنا في تصميم العروض التقديمية." />
      </Helmet>

      <div className="pt-[72px] bg-gradient-to-b from-brand-red-transparent to-background">
        <div className="relative bg-gradient-to-b from-brand-red-transparent to-background py-12">
          <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">حجز استشارة</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              احجز جلسة استشارية مع خبرائنا لتحسين عروضك التقديمية
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s <= step ? 'bg-brand-red text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {s < step ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-brand-red' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">تم الحجز بنجاح!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                سنتواصل معك قريباً لتأكيد الموعد. شكراً لاختيارك Mr PowerPoint.
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Session Type */}
              {step === 1 && (
                <div>
                  <SectionHeading title="اختر نوع الجلسة" centered />
                  <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {sessionTypes.map((session) => {
                      const Icon = session.icon;
                      return (
                        <button
                          key={session.id}
                          onClick={() => setSelectedType(session.id)}
                          className={`glass-card rounded-2xl p-6 text-right transition-all ${
                            selectedType === session.id
                              ? 'ring-2 ring-brand-red shadow-card-hover'
                              : 'card-hover'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                            selectedType === session.id ? 'bg-brand-red text-white' : 'bg-brand-red-transparent text-brand-red'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold mb-2">{session.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{session.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {session.duration}
                            </span>
                            <span className="font-bold text-brand-red">{session.price} ر.س</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <SectionHeading title="اختر الموعد" centered />
                  <div className="max-w-2xl mx-auto">
                    <div className="glass-card rounded-2xl p-6 mb-6">
                      <h3 className="font-bold mb-4">التاريخ</h3>
                      <div className="grid grid-cols-7 gap-2">
                        {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map((day, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(day)}
                            className={`p-3 rounded-xl text-center transition-colors ${
                              selectedDate === day
                                ? 'bg-brand-red text-white'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            <div className="text-xs opacity-80">{day}</div>
                            <div className="font-bold">{29 + i}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedDate && (
                      <div className="glass-card rounded-2xl p-6">
                        <h3 className="font-bold mb-4">الوقت</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-xl text-center transition-colors ${
                                selectedTime === time
                                  ? 'bg-brand-red text-white'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && selectedSession && (
                <div className="max-w-md mx-auto">
                  <SectionHeading title="تأكيد الحجز" centered />
                  <div className="glass-card rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">نوع الجلسة</span>
                      <span className="font-medium">{selectedSession.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المدة</span>
                      <span className="font-medium">{selectedSession.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">التاريخ</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الوقت</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <span className="font-bold">الإجمالي</span>
                      <span className="font-bold text-brand-red">{selectedSession.price} ر.س</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between max-w-md mx-auto mt-8">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="btn-ghost">
                    السابق
                  </button>
                ) : (
                  <div />
                )}
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && !selectedType || step === 2 && (!selectedDate || !selectedTime)}
                    className="btn-primary disabled:opacity-50"
                  >
                    التالي
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="btn-primary">
                    تأكيد الحجز
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
