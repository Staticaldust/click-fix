import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MessageSquare,
  FileText,
  Star,
  ChevronLeft,
  Clock,
} from 'lucide-react';
import { Card, Button } from '../../components/common';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/helpers';
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from '../../utils/constants';
import type { QuoteRequest } from '../../types/quote.types';
import { quoteService } from '../../services/quote.service';
import { toast } from 'react-toastify';

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent quotes (limit to 3 for dashboard)
        const quotesData = await quoteService.getMyQuotes(1, 3);
        setRecentQuotes(quotesData.quotes || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('שגיאה בטעינת נתוני הדשבורד');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { icon: FileText, label: 'בקשות הצעת מחיר', value: recentQuotes.length, href: '/quotes' },
    { icon: Heart, label: 'מועדפים', value: 0, href: '/favorites' }, // Favorites not implemented yet
    { icon: MessageSquare, label: 'שיחות פעילות', value: 0, href: '/chats' },
    { icon: Star, label: 'ביקורות שנכתבו', value: 0, href: '#' },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-secondary-500">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          שלום, {user?.firstName || 'אורח'}
        </h1>
        <p className="text-secondary-600">
          ברוכים הבאים לאזור האישי שלך
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-800">{stat.value}</div>
                  <div className="text-sm text-secondary-500">{stat.label}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-800">בקשות אחרונות</h2>
            <Link to="/quotes" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              צפה בהכל
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <div className="text-center py-8 text-secondary-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>אין בקשות הצעת מחיר</p>
              <Link to="/search">
                <Button variant="outline" size="sm" className="mt-4">
                  חפש בעל מקצוע
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentQuotes.map((quote: QuoteRequest) => (
                <Link
                  key={quote.id}
                  to={`/quotes/${quote.id}`}
                  className="block p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-secondary-800">
                      {quote.professionalName}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${QUOTE_STATUS_COLORS[quote.status]}`}>
                      {QUOTE_STATUS_LABELS[quote.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-500">
                    <Clock className="w-4 h-4" />
                    {formatDate(quote.createdAt)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Favorites */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-800">מועדפים</h2>
            <Link to="/favorites" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              צפה בהכל
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-center py-8 text-secondary-500">
            <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>אין מועדפים</p>
            <Link to="/search">
              <Button variant="outline" size="sm" className="mt-4">
                חפש בעל מקצוע
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <h2 className="text-lg font-semibold text-secondary-800 mb-4">פעולות מהירות</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/search">
            <Button>חפש בעל מקצוע</Button>
          </Link>
          <Link to="/settings">
            <Button variant="outline">עדכן פרטים אישיים</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
