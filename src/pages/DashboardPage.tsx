import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Download,
  Heart,
  CreditCard,
  Bell,
  Award,
  FileText,
  Settings,
  Crown,
  ChevronLeft,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { id: 'downloads', name: 'النماذج المحملة', icon: Download },
  { id: 'favorites', name: 'المفضلات', icon: Heart },
  { id: 'subscription', name: 'الاشتراك', icon: Crown },
  { id: 'invoices', name: 'الفواتير', icon: CreditCard },
  { id: 'notifications', name: 'إشعارات المنتدى', icon: Bell },
  { id: 'certificates', name: 'الشهادات', icon: Award },
  { id: 'orders', name: 'طلبات التصميم', icon: FileText },
  { id: 'settings', name: 'إعدادات الحساب', icon: Settings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('downloads');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // ✅ أول حرف من اسم المستخدم
  const getInitial = () => {
    if (user?.full_name) return user.full_name.charAt(0);
    if (user?.email) return user.email.charAt(0);
    return 'م';
  };

  // ✅ اسم العرض
  const getDisplayName = () => {
    return user?.full_name || user?.email || 'مستخدم';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'downloads':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">النماذج المحملة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl p-4">
                  <div className="h-24 bg-gradient-to-br from-brand-red/15 to-brand-red/5 rounded-lg mb-3 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-brand-red/30" />
                  </div>
                  <h4 className="font-medium text-sm">عرض تسويقي احترافي</h4>
                  <p className="text-xs text-muted-foreground">تم التحميل: 2025-05-20</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">المفضلات</h2>
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="w-16 h-16 mx-auto mb-4" />
              <p>لم تضف أي نماذج للمفضلة بعد</p>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">إدارة الاشتراك</h2>
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-yellow-500" />
                <div>
                  <h3 className="font-bold">الباقة الحالية: {user?.subscription_type || 'VIP'}</h3>
                  <p className="text-sm text-muted-foreground">تنتهي في: 2026-05-28</p>
                </div>
              </div>
              <button className="btn-primary text-sm">تجديد الاشتراك</button>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">طلبات التصميم</h2>
            <div className="space-y-3">
              {[
                { id: 'ORD-001', title: 'عرض استثماري', status: 'قيد التنفيذ', date: '2025-05-25' },
                { id: 'ORD-002', title: 'هوية بصرية', status: 'مكتمل', date: '2025-05-10' },
              ].map((order) => (
                <div key={order.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{order.title}</h4>
                    <p className="text-sm text-muted-foreground">{order.id} • {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'مكتمل'
                      ? 'bg-green-500/20 text-green-600'
                      : order.status === 'قيد التنفيذ'
                      ? 'bg-blue-500/20 text-blue-600'
                      : 'bg-yellow-500/20 text-yellow-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12 text-muted-foreground">
            <Settings className="w-16 h-16 mx-auto mb-4" />
            <p>هذا القسم قيد التطوير</p>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>لوحة التحكم | Mr PowerPoint</title>
      </Helmet>

      <div className="pt-[72px] min-h-screen bg-muted/30">
        <div className="container-main mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-72 shrink-0">
              <div className="glass-card rounded-2xl p-4 sticky top-24">
                {/* ✅ User Info - حقيقي من useAuth */}
                <div className="flex items-center gap-3 p-3 mb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold">
                    {getInitial()}
                  </div>
                  <div>
                    <h3 className="font-bold">{getDisplayName()}</h3>
                    <p className="text-xs text-muted-foreground">{user?.role || 'VIP Member'}</p>
                  </div>
                </div>

                {/* Menu */}
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                          activeTab === item.id
                            ? 'bg-brand-red-transparent text-brand-red font-medium'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                        <ChevronLeft className="w-4 h-4 mr-auto" />
                      </button>
                    );
                  })}
                </nav>

                {/* ✅ Logout - شغال الآن */}
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}