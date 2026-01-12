import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Settings, Lock, Bell, Shield, Check, Eye, EyeOff } from 'lucide-react';
import { Button, Card, Input } from '../../components/common';
import { classNames } from '../../utils/helpers';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'שדה חובה'),
  newPassword: z.string()
    .min(8, 'סיסמה חייבת להכיל לפחות 8 תווים')
    .regex(/[A-Z]/, 'סיסמה חייבת להכיל לפחות אות גדולה באנגלית')
    .regex(/[0-9]/, 'סיסמה חייבת להכיל לפחות מספר אחד'),
  confirmPassword: z.string().min(1, 'שדה חובה'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'הסיסמאות אינן תואמות',
  path: ['confirmPassword'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;
type SettingsTab = 'password' | 'notifications' | 'privacy' | 'visibility';

const tabs = [
  { id: 'password' as const, label: 'סיסמה', icon: Lock },
  { id: 'notifications' as const, label: 'התראות', icon: Bell },
  { id: 'visibility' as const, label: 'נראות פרופיל', icon: Eye },
  { id: 'privacy' as const, label: 'פרטיות', icon: Shield },
];

export default function ProfessionalSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('password');
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profileVisible, setProfileVisible] = useState(true);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [notifications, setNotifications] = useState({
    newRequests: true,
    messages: true,
    reviews: true,
    marketing: false,
    sms: true,
    email: true,
  });

  const onPasswordSubmit = async (_data: PasswordFormData) => {
    setIsPasswordSaving(true);
    setSuccessMessage(null);
    try {
      // In production: await authService.changePassword(_data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetPassword();
      setSuccessMessage('הסיסמה שונתה בהצלחה');
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setIsPasswordSaving(false);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    // In production: save to server
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <Settings className="w-7 h-7 inline ml-2 text-primary-500" />
          הגדרות
        </h1>
        <p className="text-secondary-600">
          נהלו את הגדרות החשבון והעדפות ההתראות
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <Check className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'password' && (
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-6">
                שינוי סיסמה
              </h2>
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6 max-w-md">
                <Input
                  label="סיסמה נוכחית"
                  type="password"
                  required
                  {...registerPassword('currentPassword')}
                  error={passwordErrors.currentPassword?.message}
                />
                <Input
                  label="סיסמה חדשה"
                  type="password"
                  required
                  helperText="לפחות 8 תווים, אות גדולה באנגלית ומספר"
                  {...registerPassword('newPassword')}
                  error={passwordErrors.newPassword?.message}
                />
                <Input
                  label="אימות סיסמה חדשה"
                  type="password"
                  required
                  {...registerPassword('confirmPassword')}
                  error={passwordErrors.confirmPassword?.message}
                />

                <div className="pt-4">
                  <Button type="submit" isLoading={isPasswordSaving}>
                    שנה סיסמה
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-6">
                הגדרות התראות
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-secondary-800 mb-4">סוגי התראות</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'newRequests' as const, label: 'בקשות חדשות', description: 'קבל התראה על בקשות הצעת מחיר חדשות' },
                      { key: 'messages' as const, label: 'הודעות', description: 'קבל התראה על הודעות חדשות מלקוחות' },
                      { key: 'reviews' as const, label: 'ביקורות', description: 'קבל התראה כאשר לקוח כותב ביקורת' },
                      { key: 'marketing' as const, label: 'עדכונים שיווקיים', description: 'קבל מידע על מבצעים ושירותים חדשים' },
                    ].map((notification) => (
                      <label
                        key={notification.key}
                        className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100"
                      >
                        <div>
                          <div className="font-medium text-secondary-800">{notification.label}</div>
                          <div className="text-sm text-secondary-500">{notification.description}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications[notification.key]}
                          onChange={() => toggleNotification(notification.key)}
                          className="w-5 h-5 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-secondary-800 mb-4">אמצעי קבלת התראות</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100">
                      <div>
                        <div className="font-medium text-secondary-800">SMS</div>
                        <div className="text-sm text-secondary-500">קבל התראות בהודעת טקסט</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => toggleNotification('sms')}
                        className="w-5 h-5 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg cursor-pointer hover:bg-secondary-100">
                      <div>
                        <div className="font-medium text-secondary-800">אימייל</div>
                        <div className="text-sm text-secondary-500">קבל התראות באימייל</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => toggleNotification('email')}
                        className="w-5 h-5 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'visibility' && (
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-6">
                נראות פרופיל
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-secondary-800">הצג פרופיל בחיפוש</h3>
                      <p className="text-sm text-secondary-500 mt-1">
                        כאשר מופעל, הפרופיל שלך יופיע בתוצאות החיפוש
                      </p>
                    </div>
                    <button
                      onClick={() => setProfileVisible(!profileVisible)}
                      className={classNames(
                        'relative w-14 h-7 rounded-full transition-colors',
                        profileVisible ? 'bg-primary-500' : 'bg-secondary-300'
                      )}
                    >
                      <span
                        className={classNames(
                          'absolute top-1 w-5 h-5 bg-white rounded-full transition-transform',
                          profileVisible ? 'right-1' : 'left-1'
                        )}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex gap-3">
                    <EyeOff className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">השהיית פרופיל זמנית</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        ניתן להשהות את הפרופיל זמנית ללא מחיקה. הפרופיל לא יופיע בחיפוש עד להפעלה מחדש.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-6">
                פרטיות
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h3 className="font-medium text-secondary-800 mb-2">מחיקת חשבון</h3>
                  <p className="text-sm text-secondary-600 mb-4">
                    מחיקת החשבון תסיר את כל הנתונים שלך מהמערכת כולל ביקורות והיסטוריית עבודות. פעולה זו אינה הפיכה.
                  </p>
                  <Button variant="danger" size="sm">
                    מחק חשבון
                  </Button>
                </div>

                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h3 className="font-medium text-secondary-800 mb-2">ייצוא נתונים</h3>
                  <p className="text-sm text-secondary-600 mb-4">
                    הורד עותק של כל הנתונים שלך מהמערכת.
                  </p>
                  <Button variant="outline" size="sm">
                    הורד נתונים
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
