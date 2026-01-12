import { simulateDelay, PaginatedResponse, PaginationParams } from './client';
import type { User } from '../types/user.types';
import type { Professional, ProfessionalStatus } from '../types/professional.types';
import type { Category } from '../types/category.types';
import type { Review } from '../types/review.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  // Dashboard
  DASHBOARD_STATS: '/admin/dashboard/stats',
  RECENT_ACTIVITY: '/admin/dashboard/activity',

  // Users
  USERS: '/admin/users',
  USER_BY_ID: '/admin/users/:id',
  SUSPEND_USER: '/admin/users/:id/suspend',
  ACTIVATE_USER: '/admin/users/:id/activate',

  // Professionals
  PROFESSIONALS: '/admin/professionals',
  PROFESSIONAL_BY_ID: '/admin/professionals/:id',
  APPROVE_PROFESSIONAL: '/admin/professionals/:id/approve',
  REJECT_PROFESSIONAL: '/admin/professionals/:id/reject',
  SUSPEND_PROFESSIONAL: '/admin/professionals/:id/suspend',

  // Categories
  CATEGORIES: '/admin/categories',
  CATEGORY_BY_ID: '/admin/categories/:id',
  REORDER_CATEGORIES: '/admin/categories/reorder',

  // Reviews
  REVIEWS: '/admin/reviews',
  REVIEW_BY_ID: '/admin/reviews/:id',
  DELETE_REVIEW: '/admin/reviews/:id',
  APPROVE_REVIEW: '/admin/reviews/:id/approve',
  COMPLAINTS: '/admin/complaints',
};

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

// Mock data
const mockDashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalProfessionals: 342,
  pendingApprovals: 15,
  totalReviews: 1823,
  newUsersThisMonth: 156,
  newProfessionalsThisMonth: 23,
};

const mockRecentActivity: RecentActivity[] = [
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

const mockUsers: User[] = [
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

const mockPendingProfessionals: Professional[] = [
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

const mockCategories: Category[] = [
  {
    id: 'electrician',
    name: 'חשמלאי',
    icon: 'Zap',
    description: 'עבודות חשמל, תיקונים והתקנות',
    defaultQuestions: [],
    isActive: true,
    order: 1,
    professionalCount: 45,
  },
  {
    id: 'plumber',
    name: 'אינסטלטור',
    icon: 'Droplet',
    description: 'עבודות אינסטלציה ותיקוני צנרת',
    defaultQuestions: [],
    isActive: true,
    order: 2,
    professionalCount: 38,
  },
  {
    id: 'ac',
    name: 'מזגנים',
    icon: 'Wind',
    description: 'התקנה, תיקון ותחזוקת מזגנים',
    defaultQuestions: [],
    isActive: true,
    order: 3,
    professionalCount: 28,
  },
];

const mockReportedReviews: (Review & { reportReason?: string })[] = [
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

export interface UserFilters {
  role?: 'customer' | 'professional' | 'admin';
  status?: 'active' | 'suspended' | 'pending';
  search?: string;
}

export interface ProfessionalFilters {
  status?: ProfessionalStatus;
  categoryId?: string;
  search?: string;
}

// Admin API Service
export const adminApi = {
  // Dashboard
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<DashboardStats>(ENDPOINTS.DASHBOARD_STATS);
    // return response.data;

    return mockDashboardStats;
  },

  /**
   * Get recent activity
   */
  async getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<RecentActivity[]>(ENDPOINTS.RECENT_ACTIVITY, { params: { limit } });
    // return response.data;

    return mockRecentActivity.slice(0, limit);
  },

  // Users
  /**
   * Get users list
   */
  async getUsers(
    filters?: UserFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<User>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<User>>(ENDPOINTS.USERS, {
    //   params: { ...filters, ...pagination }
    // });
    // return response.data;

    let filtered = [...mockUsers];

    if (filters?.role) {
      filtered = filtered.filter((u) => u.role === filters.role);
    }
    if (filters?.status) {
      filtered = filtered.filter((u) => u.status === filters.status);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search) ||
          u.lastName.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<User>(ENDPOINTS.USER_BY_ID.replace(':id', id));
    // return response.data;

    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  /**
   * Suspend user
   */
  async suspendUser(id: string, _reason: string): Promise<User> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<User>(ENDPOINTS.SUSPEND_USER.replace(':id', id), { reason });
    // return response.data;

    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user, status: 'blocked' };
  },

  /**
   * Activate user
   */
  async activateUser(id: string): Promise<User> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<User>(ENDPOINTS.ACTIVATE_USER.replace(':id', id));
    // return response.data;

    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user, status: 'active' };
  },

  // Professionals
  /**
   * Get professionals list
   */
  async getProfessionals(
    filters?: ProfessionalFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Professional>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Professional>>(ENDPOINTS.PROFESSIONALS, {
    //   params: { ...filters, ...pagination }
    // });
    // return response.data;

    let filtered = [...mockPendingProfessionals];

    if (filters?.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters?.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  /**
   * Approve professional
   */
  async approveProfessional(id: string): Promise<Professional> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Professional>(ENDPOINTS.APPROVE_PROFESSIONAL.replace(':id', id));
    // return response.data;

    const professional = mockPendingProfessionals.find((p) => p.id === id);
    if (!professional) {
      throw new Error('Professional not found');
    }
    return { ...professional, status: 'approved', approvedAt: new Date(), approvedBy: 'admin-1' };
  },

  /**
   * Reject professional
   */
  async rejectProfessional(id: string, _reason: string): Promise<Professional> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Professional>(
    //   ENDPOINTS.REJECT_PROFESSIONAL.replace(':id', id),
    //   { reason }
    // );
    // return response.data;

    const professional = mockPendingProfessionals.find((p) => p.id === id);
    if (!professional) {
      throw new Error('Professional not found');
    }
    return { ...professional, status: 'rejected' };
  },

  /**
   * Suspend professional
   */
  async suspendProfessional(id: string, _reason: string): Promise<Professional> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Professional>(
    //   ENDPOINTS.SUSPEND_PROFESSIONAL.replace(':id', id),
    //   { reason }
    // );
    // return response.data;

    const professional = mockPendingProfessionals.find((p) => p.id === id);
    if (!professional) {
      throw new Error('Professional not found');
    }
    return { ...professional, status: 'suspended' };
  },

  // Categories
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Category[]>(ENDPOINTS.CATEGORIES);
    // return response.data;

    return mockCategories;
  },

  /**
   * Create category
   */
  async createCategory(data: Omit<Category, 'id' | 'professionalCount'>): Promise<Category> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Category>(ENDPOINTS.CATEGORIES, data);
    // return response.data;

    return {
      ...data,
      id: 'cat-' + Date.now(),
      professionalCount: 0,
    };
  },

  /**
   * Update category
   */
  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.patch<Category>(ENDPOINTS.CATEGORY_BY_ID.replace(':id', id), data);
    // return response.data;

    const category = mockCategories.find((c) => c.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category, ...data };
  },

  /**
   * Delete category
   */
  async deleteCategory(_id: string): Promise<void> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.delete(ENDPOINTS.CATEGORY_BY_ID.replace(':id', id));
  },

  /**
   * Reorder categories
   */
  async reorderCategories(categoryIds: string[]): Promise<Category[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Category[]>(ENDPOINTS.REORDER_CATEGORIES, { categoryIds });
    // return response.data;

    return mockCategories.map((cat) => ({
      ...cat,
      order: categoryIds.indexOf(cat.id) + 1,
    }));
  },

  // Reviews
  /**
   * Get all reviews (for moderation)
   */
  async getReviews(pagination?: PaginationParams): Promise<PaginatedResponse<Review>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Review>>(ENDPOINTS.REVIEWS, {
    //   params: pagination
    // });
    // return response.data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;

    return {
      data: mockReportedReviews,
      total: mockReportedReviews.length,
      page,
      limit,
      totalPages: 1,
    };
  },

  /**
   * Get reported reviews / complaints
   */
  async getComplaints(pagination?: PaginationParams): Promise<PaginatedResponse<Review & { reportReason?: string }>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Review>>(ENDPOINTS.COMPLAINTS, {
    //   params: pagination
    // });
    // return response.data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;

    return {
      data: mockReportedReviews,
      total: mockReportedReviews.length,
      page,
      limit,
      totalPages: 1,
    };
  },

  /**
   * Delete review
   */
  async deleteReview(_id: string): Promise<void> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.delete(ENDPOINTS.DELETE_REVIEW.replace(':id', id));
  },

  /**
   * Approve review (dismiss complaint)
   */
  async approveReview(id: string): Promise<Review> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Review>(ENDPOINTS.APPROVE_REVIEW.replace(':id', id));
    // return response.data;

    const review = mockReportedReviews.find((r) => r.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  },
};

// Export endpoints for reference
export { ENDPOINTS as ADMIN_ENDPOINTS };
