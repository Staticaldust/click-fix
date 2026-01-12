import type { User } from '../../types/user.types';
import type { Professional } from '../../types/professional.types';
import type { Review } from '../../types/review.types';

// Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  totalProfessionals: number;
  pendingApprovals: number;
  totalReviews: number;
  newUsersThisMonth: number;
  newProfessionalsThisMonth: number;
  revenue?: number;
}

export interface RecentActivity {
  id: string;
  type: 'user_registered' | 'professional_registered' | 'review_submitted' | 'quote_created';
  description: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export const mockDashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalProfessionals: 342,
  pendingApprovals: 15,
  totalReviews: 1823,
  newUsersThisMonth: 156,
  newProfessionalsThisMonth: 23,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'professional_registered',
    description: 'בעל מקצוע חדש נרשם - יוסף כהן (חשמלאי)',
    timestamp: new Date('2024-01-12T14:30:00'),
    userId: 'pro-new-1',
    userName: 'יוסף כהן',
  },
  {
    id: 'act-2',
    type: 'review_submitted',
    description: 'ביקורת חדשה נשלחה על דוד לוי',
    timestamp: new Date('2024-01-12T13:15:00'),
    userId: 'user-1',
  },
  {
    id: 'act-3',
    type: 'user_registered',
    description: 'משתמש חדש נרשם - רחל גולד',
    timestamp: new Date('2024-01-12T11:00:00'),
    userId: 'user-new-1',
    userName: 'רחל גולד',
  },
];

export const mockAdminUsers: User[] = [
  {
    id: 'user-1',
    email: 'israel@example.com',
    firstName: 'ישראל',
    lastName: 'כהן',
    phone: '050-1234567',
    city: 'ירושלים',
    role: 'customer',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    email: 'rachel@example.com',
    firstName: 'רחל',
    lastName: 'לוי',
    phone: '050-2345678',
    city: 'בני ברק',
    role: 'customer',
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
  },
];

export const mockPendingProfessionals: Professional[] = [
  {
    id: 'pro-pending-1',
    email: 'new-pro@example.com',
    firstName: 'אברהם',
    lastName: 'גולדשטיין',
    phone: '050-9999999',
    city: 'ירושלים',
    role: 'professional',
    status: 'pending',
    categoryId: 'electrician',
    categoryName: 'חשמלאי',
    description: 'חשמלאי מוסמך עם 5 שנות ניסיון',
    yearsOfExperience: 5,
    serviceAreas: ['ירושלים', 'בית שמש'],
    workingHours: [],
    services: [],
    certificates: [
      {
        id: 'cert-1',
        name: 'תעודת חשמלאי',
        fileUrl: '/certs/cert1.pdf',
        fileType: 'pdf',
        uploadedAt: new Date(),
      },
    ],
    rating: { overall: 0, reliability: 0, service: 0, availability: 0, price: 0, professionalism: 0 },
    reviewCount: 0,
    isVerified: false,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
  },
];

export const mockReportedReviews: (Review & { reportReason?: string })[] = [
  {
    id: 'review-reported-1',
    professionalId: 'pro-1',
    customerId: 'user-bad',
    customerName: 'משתמש בעייתי',
    ratings: { reliability: 1, service: 1, availability: 1, price: 1, professionalism: 1 },
    overallRating: 1,
    content: 'ביקורת שלילית לא הוגנת',
    isVerified: false,
    createdAt: new Date('2024-01-10'),
    reportReason: 'ביקורת מזויפת',
  },
];
