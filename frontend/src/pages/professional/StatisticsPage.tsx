import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Star,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { Card } from '../../components/common';
import { classNames } from '../../utils/helpers';

interface StatCard {
  label: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: string;
}

const stats: StatCard[] = [
  {
    label: 'צפיות בפרופיל',
    value: 342,
    change: 12,
    icon: Eye,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'בקשות הצעת מחיר',
    value: 28,
    change: 8,
    icon: FileText,
    color: 'bg-green-100 text-green-600',
  },
  {
    label: 'אחוז המרה',
    value: '68%',
    change: 5,
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'דירוג ממוצע',
    value: 4.8,
    change: 2,
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600',
  },
];

interface MonthlyData {
  month: string;
  views: number;
  requests: number;
  completed: number;
}

const monthlyData: MonthlyData[] = [
  { month: 'ינואר', views: 120, requests: 15, completed: 10 },
  { month: 'פברואר', views: 180, requests: 22, completed: 18 },
  { month: 'מרץ', views: 250, requests: 35, completed: 28 },
  { month: 'אפריל', views: 310, requests: 42, completed: 35 },
  { month: 'מאי', views: 280, requests: 38, completed: 32 },
  { month: 'יוני', views: 342, requests: 45, completed: 38 },
];

interface TopService {
  name: string;
  count: number;
  revenue: number;
}

const topServices: TopService[] = [
  { name: 'תיקון תקלות חשמל', count: 45, revenue: 15750 },
  { name: 'התקנת נקודות חשמל', count: 32, revenue: 12800 },
  { name: 'בדיקת לוח חשמל', count: 18, revenue: 5400 },
  { name: 'התקנת תאורה', count: 15, revenue: 6000 },
];

export default function StatisticsPage() {
  const maxViews = Math.max(...monthlyData.map((d) => d.views));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <BarChart3 className="w-7 h-7 inline ml-2 text-primary-500" />
          סטטיסטיקות
        </h1>
        <p className="text-secondary-600">
          מעקב אחר ביצועי הפרופיל והעסק שלך
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={classNames('p-3 rounded-lg', stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-secondary-500">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-secondary-800">
                    {stat.value}
                  </span>
                  <span
                    className={classNames(
                      'flex items-center text-sm',
                      stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 ml-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 ml-1" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-secondary-800">
              <Calendar className="w-5 h-5 inline ml-2 text-primary-500" />
              צפיות חודשיות
            </h2>
          </div>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center gap-4">
                <span className="w-16 text-sm text-secondary-600">{data.month}</span>
                <div className="flex-1">
                  <div className="h-6 bg-secondary-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${(data.views / maxViews) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-12 text-sm font-medium text-secondary-800 text-left">
                  {data.views}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Services */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-secondary-800">
              <DollarSign className="w-5 h-5 inline ml-2 text-primary-500" />
              שירותים מובילים
            </h2>
          </div>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={classNames(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      index === 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : index === 1
                        ? 'bg-secondary-200 text-secondary-700'
                        : index === 2
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-secondary-100 text-secondary-600'
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-secondary-800">{service.name}</p>
                    <p className="text-sm text-secondary-500">{service.count} עבודות</p>
                  </div>
                </div>
                <span className="font-bold text-primary-600">
                  {service.revenue.toLocaleString()} ש"ח
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-800 mb-6">סיכום חודשי</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">חודש</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">צפיות</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">בקשות</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">עבודות שהושלמו</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">אחוז המרה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {monthlyData.map((data) => (
                <tr key={data.month} className="hover:bg-secondary-50">
                  <td className="px-4 py-3 font-medium text-secondary-800">{data.month}</td>
                  <td className="px-4 py-3 text-secondary-600">{data.views}</td>
                  <td className="px-4 py-3 text-secondary-600">{data.requests}</td>
                  <td className="px-4 py-3 text-secondary-600">{data.completed}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {Math.round((data.completed / data.requests) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
