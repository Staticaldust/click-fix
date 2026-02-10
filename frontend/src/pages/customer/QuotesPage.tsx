import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, ChevronLeft, Search } from 'lucide-react';
import { Card, Button, Select, Avatar, PageLoader } from '../../components/common';
import { formatDate, classNames } from '../../utils/helpers';
import { QUOTE_STATUS_LABELS, URGENCY_LEVELS } from '../../utils/constants';
import { quoteService } from '../../services/quote.service';
import type { QuoteRequest, QuoteStatus } from '../../types/quote.types';

// Mock data
const mockQuotes: QuoteRequest[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'ישראל כהן',
    professionalId: 'p1',
    professionalName: 'דוד כהן',
    categoryId: 'electrician',
    answers: [
      { questionId: 'q1', question: 'סוג העבודה', answer: 'תיקון תקלה' },
      { questionId: 'q2', question: 'תיאור הבעיה', answer: 'נפלו חשמלים בחדר שינה' },
    ],
    description: 'צריך תיקון דחוף של חשמל בחדר שינה',
    urgency: 'high',
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
    urgency: 'medium',
    responseMethod: 'phone',
    status: 'pending',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    customerId: 'c1',
    customerName: 'ישראל כהן',
    professionalId: 'p3',
    professionalName: 'משה גולן',
    categoryId: 'ac',
    answers: [],
    urgency: 'low',
    responseMethod: 'system',
    status: 'accepted',
    createdAt: new Date('2024-01-05'),
    respondedAt: new Date('2024-01-06'),
  },
];

const statusColors: Record<QuoteStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-green-100 text-green-700',
  accepted: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-gray-100 text-gray-700',
};

const urgencyColors: Record<string, string> = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export default function QuotesPage() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await quoteService.getMyQuotes();
        setQuotes(data.quotes);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
        // Fallback to mock data if API fails
        setQuotes(mockQuotes);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const filteredQuotes = statusFilter
    ? quotes.filter((q) => q.status === statusFilter)
    : quotes;

  if (isLoading) return <PageLoader />;

  const statusOptions = [
    { value: '', label: 'כל הסטטוסים' },
    ...Object.entries(QUOTE_STATUS_LABELS).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <FileText className="w-7 h-7 inline ml-2 text-primary-500" />
          בקשות הצעת מחיר
        </h1>
        <p className="text-secondary-600">
          עקבו אחר הבקשות שלכם וקבלו הצעות מבעלי מקצוע
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48"
        />
        <Link to="/search" className="sm:mr-auto">
          <Button>
            <Search className="w-5 h-5" />
            בקשה חדשה
          </Button>
        </Link>
      </div>

      {filteredQuotes.length === 0 ? (
        <Card className="text-center py-12">
          <FileText className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-800 mb-2">
            {statusFilter ? 'אין בקשות בסטטוס זה' : 'אין בקשות הצעת מחיר'}
          </h2>
          <p className="text-secondary-600 mb-6">
            חפשו בעל מקצוע ושלחו בקשה להצעת מחיר
          </p>
          <Link to="/search">
            <Button>
              <Search className="w-5 h-5" />
              חפש בעל מקצוע
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <Link key={quote.id} to={`/quotes/${quote.id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Professional Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar name={quote.professionalName} size="lg" />
                    <div>
                      <h3 className="font-semibold text-secondary-800">
                        {quote.professionalName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-secondary-500">
                        <Clock className="w-4 h-4" />
                        {formatDate(quote.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Status and Urgency */}
                  <div className="flex items-center gap-3">
                    <span className={classNames(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      urgencyColors[quote.urgency]
                    )}>
                      {URGENCY_LEVELS.find((u) => u.value === quote.urgency)?.label}
                    </span>
                    <span className={classNames(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      statusColors[quote.status]
                    )}>
                      {QUOTE_STATUS_LABELS[quote.status]}
                    </span>
                    <ChevronLeft className="w-5 h-5 text-secondary-400" />
                  </div>
                </div>

                {/* Description preview */}
                {quote.description && (
                  <p className="mt-3 text-sm text-secondary-600 line-clamp-2">
                    {quote.description}
                  </p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
