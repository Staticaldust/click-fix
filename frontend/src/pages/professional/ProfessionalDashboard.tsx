import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Eye,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  ChevronLeft,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Card, Button, Avatar, RatingStars, PageLoader } from '../../components/common';
import { useAuthStore } from '../../store/authStore';
import { formatDate, classNames } from '../../utils/helpers';
import { URGENCY_COLORS } from '../../utils/constants';
import { professionalService } from '../../services/professional.service';
import type { QuoteRequest } from '../../types/quote.types';
import type { ProfessionalStats } from '../../types/professional.types';

export default function ProfessionalDashboard() {
  const { user } = useAuthStore();
  const [professionalStats, setProfessionalStats] = useState<ProfessionalStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const [statsData, requestsData] = await Promise.all([
          professionalService.getStats(String(user.id)),
          professionalService.getRecentRequests(String(user.id), 5),
        ]);
        setProfessionalStats(statsData);
        setRecentRequests(requestsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('שגיאה בטעינת נתוני הדשבורד');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (isLoading) return <PageLoader />;

  const stats = professionalStats ? [
    {
      icon: Eye,
      label: 'צפיות היום',
      value: professionalStats.profileViews.today,
      subtext: `${professionalStats.profileViews.week} השבוע`,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: FileText,
      label: 'בקשות חדשות',
      value: professionalStats.requests.new,
      subtext: `${professionalStats.requests.inProgress} בטיפול`,
      color: 'bg-yellow-100 text-yellow-600',
      href: '/pro/requests',
    },
    {
      icon: CheckCircle,
      label: 'עבודות שהושלמו',
      value: professionalStats.requests.completed,
      subtext: 'סה"כ',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: TrendingUp,
      label: 'אחוז המרה',
      value: `${professionalStats.conversionRate}%`,
      subtext: 'מבקשות לעבודות',
      color: 'bg-purple-100 text-purple-600',
    },
  ] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          שלום, {user?.firstName || 'בעל מקצוע'}
        </h1>
        <p className="text-secondary-600">
          הנה סיכום הפעילות שלך
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const content = (
            <Card className="hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={classNames('w-12 h-12 rounded-lg flex items-center justify-center', stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-800">{stat.value}</div>
                  <div className="text-sm text-secondary-600">{stat.label}</div>
                  <div className="text-xs text-secondary-400">{stat.subtext}</div>
                </div>
              </div>
            </Card>
          );
          return stat.href ? (
            <Link key={stat.label} to={stat.href}>{content}</Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New Requests */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-secondary-800">
                בקשות חדשות
                {professionalStats && professionalStats.requests.new > 0 && (
                  <span className="mr-2 px-2 py-0.5 bg-primary-100 text-primary-700 text-sm rounded-full">
                    {professionalStats.requests.new}
                  </span>
                )}
              </h2>
              <Link to="/pro/requests" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                צפה בהכל
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {recentRequests.length === 0 ? (
              <div className="text-center py-8 text-secondary-500">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>אין בקשות חדשות</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar name={request.customerName} size="md" />
                        <div>
                          <h3 className="font-medium text-secondary-800">
                            {request.customerName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-secondary-500">
                            <Clock className="w-4 h-4" />
                            {formatDate(request.createdAt)}
                          </div>
                        </div>
                      </div>
                      <span className={classNames('text-xs font-medium', URGENCY_COLORS[request.urgency])}>
                        {request.urgency === 'high' ? 'דחוף' : request.urgency === 'medium' ? 'בינוני' : 'רגיל'}
                      </span>
                    </div>
                    {request.description && (
                      <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                        {request.description}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Link to={`/pro/requests/${request.id}`}>
                        <Button size="sm">צפה בבקשה</Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                        שלח הודעה
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <h2 className="text-lg font-semibold text-secondary-800 mb-4">הפרופיל שלי</h2>
            <div className="text-center mb-4">
              <Avatar name={`${user?.firstName} ${user?.lastName}`} size="xl" className="mx-auto mb-3" />
              <h3 className="font-medium text-secondary-800">
                {user?.firstName} {user?.lastName}
              </h3>
              <RatingStars rating={0} reviewCount={0} className="justify-center mt-2" />
            </div>
            <Link to="/pro/profile/edit">
              <Button variant="outline" fullWidth size="sm">
                ערוך פרופיל
              </Button>
            </Link>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold text-secondary-800 mb-4">פעולות מהירות</h2>
            <div className="space-y-2">
              <Link to="/pro/requests">
                <Button variant="outline" fullWidth size="sm" className="justify-start">
                  <FileText className="w-4 h-4" />
                  בקשות הצעת מחיר
                </Button>
              </Link>
              <Link to="/pro/statistics">
                <Button variant="outline" fullWidth size="sm" className="justify-start">
                  <TrendingUp className="w-4 h-4" />
                  סטטיסטיקות
                </Button>
              </Link>
              <Link to="/pro/settings">
                <Button variant="outline" fullWidth size="sm" className="justify-start">
                  <Star className="w-4 h-4" />
                  הגדרות
                </Button>
              </Link>
            </div>
          </Card>

          {/* Tips */}
          <Card className="bg-primary-50 border-primary-200">
            <h2 className="text-lg font-semibold text-secondary-800 mb-2">טיפ היום</h2>
            <p className="text-sm text-secondary-600">
              הוספת תמונות עבודה לפרופיל מגדילה את הסיכוי לקבל פניות ב-40%!
            </p>
            <Link to="/pro/profile/edit" className="text-sm text-primary-600 hover:underline mt-2 block">
              עדכן את הפרופיל שלך
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
