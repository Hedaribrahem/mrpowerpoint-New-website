import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Sparkles, Type, Layout, Palette, FileText, Wand2, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  tool?: string;
}

const quickTools = [
  { id: 'title', name: 'مولد عناوين', icon: Type, description: 'أنشئ عناوين جذابة' },
  { id: 'layout', name: 'اقتراح تخطيط', icon: Layout, description: 'تخطيطات شريحة مثالية' },
  { id: 'grammar', name: 'تصحيح نحوي', icon: FileText, description: 'صحح نصوصك العربية' },
  { id: 'colors', name: 'اقتراح ألوان', icon: Palette, description: 'لوحات ألوان متناسقة' },
  { id: 'content', name: 'توليد نصوص', icon: Wand2, description: 'نصوص مقترحة للشرائح' },
];

const sampleResponses: Record<string, string> = {
  title: 'إليك بعض العناوين المقترحة:\n\n1. "رؤية 2025: استراتيجية النجاح"\n2. "من الفكرة إلى الواقع"\n3. "الابتكار في عالم الأعمال"\n4. "مستقبل التحول الرقمي"\n5. "قوة البيانات: قرارات أذكى"',
  layout: 'لعرضك التقديمي، أنصحك بهذا التخطيط:\n\n• الشريحة 1: عنوان رئيسي مع صورة\n• الشريحة 2: مقدمة ومشكلة\n• الشريحة 3-5: البيانات والرسوم البيانية\n• الشريحة 6: الحلول المقترحة\n• الشريحة 7: خطة التنفيذ\n• الشريحة 8: الخلاصة والدعوة للعمل',
  grammar: 'تم مراجعة النص وإليك النسخة المصححة:\n\n"نحن نسعى جاهدين لتحقيق أهدافنا من خلال العمل الجماعي والإبداع المستمر."\n\nملاحظة: تم تصحيح علامات الترقيم وتوحيد الألفاظ.',
  colors: 'إليك لوحة ألوان مقترحة:\n\n🔴 اللون الأساسي: #E31E24 (أحمر نابض)\n🔵 اللون الثانوي: #0066CC (أزرق عميق)\n⚪ الخلفية: #F8F9FA (رمادي فاتح)\n⚫ النص: #1A1A2E (أسود داكن)\n🟡 التأكيد: #FFC107 (ذهبي)',
  content: 'إليك نصاً مقترحاً لشريحة المقدمة:\n\n"في عالم يتغير بسرعة غير مسبوقة، أصبح التكيف والابتكار ضرورة حتمية. اليوم سنأخذكم في رحلة لاستكشاف كيف يمكننا مواجهة هذه التحديات وتحويلها إلى فرص للنمو والتميز."',
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: 'مرحباً! أنا مساعد Mr PowerPoint الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنني مساعدتك في:\n\n• توليد عناوين جذابة\n• اقتراح تخطيطات للشرائح\n• تصحيح النصوص العربية\n• اقتراح لوحات ألوان\n• كتابة محتوى للشرائح',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (content: string, tool?: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
      tool,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: tool && sampleResponses[tool]
          ? sampleResponses[tool]
          : 'شكراً لسؤالك! أنا هنا لمساعدتك في تحسين عروضك التقديمية. يمكنك استخدام الأدوات السريعة على اليمين أو كتابة سؤالك مباشرة.',
        tool,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <Helmet>
        <title>مساعد AI | Mr PowerPoint</title>
        <meta name="description" content="مساعد Mr PowerPoint الذكي - مولد عناوين، اقتراح تخطيطات، تصحيح نحوي، وأكثر." />
      </Helmet>

      <div className="pt-[72px] h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-b from-brand-red-transparent to-background py-6">
          <div className="container-main mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red-transparent text-brand-red text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              مدعوم بالذكاء الاصطناعي
            </div>
            <h1 className="text-2xl font-bold">مساعد Mr PowerPoint الذكي</h1>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex overflow-hidden container-main mx-auto px-4 w-full">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-brand-red text-white'
                      : 'bg-muted text-brand-red'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-brand-red text-white rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}>
                    <pre className="whitespace-pre-wrap font-cairo text-sm">{msg.content}</pre>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-brand-red flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="py-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Tools */}
          <div className="hidden lg:block w-72 shrink-0 pr-6 py-4">
            <h3 className="font-bold mb-4">الأدوات السريعة</h3>
            <div className="space-y-2">
              {quickTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => sendMessage(`استخدم أداة: ${tool.name}`, tool.id)}
                    className="w-full text-right glass-card rounded-xl p-3 hover:border-brand-red/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-red-transparent flex items-center justify-center group-hover:bg-brand-red transition-colors">
                        <Icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
