import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Briefcase,
  Star,
  AlertTriangle,
  TrendingUp,
  FileText,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { Card } from '../../components/common';
import { classNames } from '../../utils/helpers';

interface DashboardStat {
  label: string;
  value: number;
  change?: number;
  icon: React.ElementType;
  color: string;
  href: string;
}

const stats: DashboardStat[] = [
  {
    label: 'משתמשים רשומים',
    value: 1247,
    change: 12,
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    href: '/admin/users',
  },
  {
    label: 'בעלי מקצוע',
    value: 342,
    change: 8,
    icon: Briefcase,
    color: 'bg-green-100 text-green-600',
    href: '/admin/professionals',
  },
  {
    label: 'ממתינים לאישור',
    value: 15,
    icon: UserCheck,
    color: 'bg-yellow-100 text-yellow-600',
    href: '/admin/approvals',
  },
  {
    label: 'ביקורות להתייחסות',
    value: 7,
    icon: Star,
    color: 'bg-purple-100 text-purple-600',
    href: '/admin/reviews',
  },
  {
    label: 'תלונות פתוחות',
    value: 3,
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-600',
    href: '/admin/complaints',
  },
  {
    label: 'הצעות מחיר החודש',
    value: 523,
    change: 15,
    icon: FileText,
    color: 'bg-indigo-100 text-indigo-600',
    href: '/admin',
  },
];

interface RecentActivity {
  id: string;
  type: 'registration' | 'review' | 'complaint' | 'approval';
  title: string;
  description: string;
  time: string;
}

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'registration',
    title: 'בעל מקצוע חדש נרשם',
    description: 'יוסי לוי - חשמלאי',
    time: 'לפני 5 דקות',
  },
  {
    id: '2',
    type: 'review',
    title: 'ביקורת חדשה דורשת בדיקה',
    description: 'דירוג 1 כוכב על דוד כהן',
    time: 'לפני 15 דקות',
  },
  {
    id: '3',
    type: 'complaint',
    title: 'תלונה חדשה',
    description: 'לקוח מתלונן על שירות',
    time: 'לפני שעה',
  },
  {
    id: '4',
    type: 'approval',
    title: 'בעל מקצוע אושר',
    description: 'משה גולד - אינסטלטור',
    time: 'לפני 2 שעות',
  },
];

const activityColors: Record<RecentActivity['type'], string> = {
  registration: 'bg-blue-100 text-blue-600',
  review: 'bg-yellow-100 text-yellow-600',
  complaint: 'bg-red-100 text-red-600',
  approval: 'bg-green-100 text-green-600',
};

const activityIcons: Record<RecentActivity['type'], React.ElementType> = {
  registration: UserCheck,
  review: Star,
  complaint: AlertTriangle,
  approval: Briefcase,
};

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <Settings className="w-7 h-7 inline ml-2 text-primary-500" />
          פאנל ניהול
        </h1>
        <p className="text-secondary-600">
          סקירה כללית של המערכת
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={classNames('p-3 rounded-lg', stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-secondary-500">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-secondary-800">
                      {stat.value.toLocaleString()}
                    </span>
                    {stat.change && (
                      <span className="flex items-center text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 ml-1" />
                        +{stat.change}%
                      </span>
                    )}
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-secondary-400" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">
            פעולות מהירות
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/approvals"
              className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <UserCheck className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium text-secondary-800">אישור בעלי מקצוע</div>
                <div className="text-sm text-secondary-500">15 ממתינים</div>
              </div>
            </Link>
            <Link
              to="/admin/reviews"
              className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Star className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium text-secondary-800">ביקורות</div>
                <div className="text-sm text-secondary-500">7 לבדיקה</div>
              </div>
            </Link>
            <Link
              to="/admin/complaints"
              className="flex items-center gap-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-medium text-secondary-800">תלונות</div>
                <div className="text-sm text-secondary-500">3 פתוחות</div>
              </div>
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-secondary-800">קטגוריות</div>
                <div className="text-sm text-secondary-500">ניהול</div>
              </div>
            </Link>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-lg font-semibold text-secondary-800 mb-4">
            פעילות אחרונה
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activityIcons[activity.type];
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg"
                >
                  <div className={classNames('p-2 rounded-lg', activityColors[activity.type])}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary-800">{activity.title}</p>
                    <p className="text-sm text-secondary-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-secondary-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
