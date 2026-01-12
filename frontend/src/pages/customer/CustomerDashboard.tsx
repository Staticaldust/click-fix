import { Link } from 'react-router-dom';
import {
  Heart,
  MessageSquare,
  FileText,
  Star,
  ChevronLeft,
  Clock,
} from 'lucide-react';
import { Card, Button, Avatar, RatingStars } from '../../components/common';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/helpers';
import type { QuoteRequest } from '../../types/quote.types';
import type { Professional } from '../../types/professional.types';

// Mock data - in production this would come from API
const mockRecentQuotes: QuoteRequest[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'ישראל כהן',
    professionalId: 'p1',
    professionalName: 'דוד כהן',
    categoryId: 'electrician',
    answers: [],
    urgency: 'medium',
    responseMethod: 'system',
    status: 'responded',
    createdAt: new Date('2024-01-10'),
    respondedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    customerId: 'c1',
    customerName: 'ישראל כהן',
    professionalId: 'p2',
    professionalName: 'יוסי לוי',
    categoryId: 'plumber',
    answers: [],
    urgency: 'high',
    responseMethod: 'phone',
    status: 'pending',
    createdAt: new Date('2024-01-12'),
  },
];

const mockFavorites: Professional[] = [
  {
    id: '1',
    email: 'david@example.com',
    firstName: 'דוד',
    lastName: 'כהן',
    phone: '050-1234567',
    role: 'professional',
    status: 'approved',
    categoryId: 'electrician',
    categoryName: 'חשמלאי',
    description: 'חשמלאי מוסמך',
    serviceAreas: ['ירושלים'],
    workingHours: [],
    services: [],
    certificates: [],
    rating: { overall: 4.8, reliability: 4.9, service: 4.7, availability: 4.6, price: 4.8, professionalism: 4.9 },
    reviewCount: 127,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'ממתין לתגובה', color: 'bg-yellow-100 text-yellow-700' },
  responded: { label: 'התקבלה תגובה', color: 'bg-green-100 text-green-700' },
  accepted: { label: 'התקבל', color: 'bg-blue-100 text-blue-700' },
  rejected: { label: 'נדחה', color: 'bg-red-100 text-red-700' },
  expired: { label: 'פג תוקף', color: 'bg-gray-100 text-gray-700' },
};

export default function CustomerDashboard() {
  const { user } = useAuthStore();

  const stats = [
    { icon: FileText, label: 'בקשות הצעת מחיר', value: 5, href: '/quotes' },
    { icon: Heart, label: 'מועדפים', value: mockFavorites.length, href: '/favorites' },
    { icon: MessageSquare, label: 'שיחות פעילות', value: 2, href: '/chats' },
    { icon: Star, label: 'ביקורות שנכתבו', value: 3, href: '#' },
  ];

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

          {mockRecentQuotes.length === 0 ? (
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
              {mockRecentQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  to={`/quotes/${quote.id}`}
                  className="block p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-secondary-800">
                      {quote.professionalName}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabels[quote.status].color}`}>
                      {statusLabels[quote.status].label}
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

          {mockFavorites.length === 0 ? (
            <div className="text-center py-8 text-secondary-500">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>אין מועדפים</p>
              <Link to="/search">
                <Button variant="outline" size="sm" className="mt-4">
                  חפש בעל מקצוע
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {mockFavorites.map((professional) => (
                <Link
                  key={professional.id}
                  to={`/professional/${professional.id}`}
                  className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <Avatar
                    src={professional.profileImage}
                    name={`${professional.firstName} ${professional.lastName}`}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-secondary-800 truncate">
                      {professional.firstName} {professional.lastName}
                    </div>
                    <div className="text-sm text-secondary-500">{professional.categoryName}</div>
                  </div>
                  <RatingStars rating={professional.rating.overall} size="sm" showValue={false} />
                </Link>
              ))}
            </div>
          )}
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
