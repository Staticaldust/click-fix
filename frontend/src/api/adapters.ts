/**
 * Adapters - Translation layer between Server API and Frontend UI
 *
 * The server returns data in a specific format, but the UI expects different structures.
 * These adapters convert server responses to UI-compatible formats.
 */

import type { User, UserRole } from '../types/user.types';
import type { Professional, RatingBreakdown } from '../types/professional.types';
import type { Review } from '../types/review.types';
import type { Category } from '../types/category.types';
import type {
  ServerUser,
  ServerEmployee,
  ServerReview,
  ServerCategory,
  ServerAuthResponse,
} from '../types/server.types';

// ============================================
// User Adapters
// ============================================

/**
 * Convert server auth response user to frontend User format
 */
export const adaptServerAuthToUser = (
  serverAuth: ServerAuthResponse,
  role: UserRole = 'customer'
): { user: User; token: string } => {
  const nameParts = (serverAuth.user.name || '').split(' ');

  return {
    token: serverAuth.token,
    user: {
      id: serverAuth.user.id.toString(),
      email: serverAuth.user.email,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      phone: '',
      role,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
};

/**
 * Convert full server user to frontend User
 */
export const adaptServerUserToUser = (serverUser: ServerUser, role: UserRole = 'customer'): User => {
  const nameParts = (serverUser.name || '').split(' ');

  return {
    id: serverUser.id.toString(),
    email: serverUser.email,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    phone: '',
    city: serverUser.address || undefined,
    role,
    status: 'active',
    createdAt: new Date(serverUser.createdAt),
    updatedAt: new Date(serverUser.updatedAt),
  };
};

// ============================================
// Employee to Professional Adapters
// ============================================

/**
 * Convert server Employee to frontend Professional format
 */
export const adaptEmployeeToProfessional = (employee: ServerEmployee): Professional => {
  const rating = calculateRatingFromServerReviews(employee.reviews || []);
  const nameParts = (employee.name || '').split(' ');
  const category = employee.categories?.[0];

  return {
    id: employee.id.toString(),
    email: employee.email || '',
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    phone: employee.phone,
    city: employee.area || undefined,
    role: 'professional',
    status: 'approved',
    categoryId: category?.id?.toString() || '',
    categoryName: category?.name || '',
    description: category?.description || '',
    yearsOfExperience: undefined,
    serviceAreas: employee.area ? [employee.area] : [],
    workingHours: [],
    services: [],
    certificates: [],
    profileImage: undefined,
    rating,
    reviewCount: employee.reviews?.length || 0,
    isVerified: true,
    createdAt: new Date(employee.createdAt),
    updatedAt: new Date(employee.updatedAt),
  };
};

/**
 * Calculate rating breakdown from server reviews
 */
const calculateRatingFromServerReviews = (reviews: ServerReview[]): RatingBreakdown => {
  if (!reviews || reviews.length === 0) {
    return {
      overall: 0,
      reliability: 0,
      service: 0,
      availability: 0,
      price: 0,
      professionalism: 0,
    };
  }

  const totals = reviews.reduce(
    (acc, review) => ({
      price: acc.price + (review.priceRate || 0),
      service: acc.service + (review.serviceRate || 0),
      performance: acc.performance + (review.performanceRate || 0),
    }),
    { price: 0, service: 0, performance: 0 }
  );

  const count = reviews.length;
  const priceAvg = totals.price / count;
  const serviceAvg = totals.service / count;
  const performanceAvg = totals.performance / count;
  const overall = (priceAvg + serviceAvg + performanceAvg) / 3;

  return {
    overall: Math.round(overall * 10) / 10,
    reliability: Math.round(performanceAvg * 10) / 10,
    service: Math.round(serviceAvg * 10) / 10,
    availability: Math.round(serviceAvg * 10) / 10,
    price: Math.round(priceAvg * 10) / 10,
    professionalism: Math.round(performanceAvg * 10) / 10,
  };
};

// ============================================
// Review Adapters
// ============================================

/**
 * Convert server Review to frontend Review format
 */
export const adaptServerReviewToReview = (serverReview: ServerReview): Review => {
  const avgRating = calculateServerReviewAverage(serverReview);

  return {
    id: serverReview.id.toString(),
    professionalId: serverReview.employeeId?.toString() || '',
    customerId: serverReview.userId?.toString() || '',
    customerName: serverReview.user?.name || 'משתמש אנונימי',
    ratings: {
      reliability: serverReview.performanceRate || 0,
      service: serverReview.serviceRate || 0,
      availability: serverReview.serviceRate || 0,
      price: serverReview.priceRate || 0,
      professionalism: serverReview.performanceRate || 0,
    },
    overallRating: avgRating,
    content: serverReview.comment || '',
    isVerified: true,
    createdAt: new Date(serverReview.createdAt),
    updatedAt: serverReview.updatedAt ? new Date(serverReview.updatedAt) : undefined,
  };
};

const calculateServerReviewAverage = (review: ServerReview): number => {
  const ratings = [review.priceRate, review.serviceRate, review.performanceRate].filter(
    (r): r is number => r !== null && r !== undefined
  );
  if (ratings.length === 0) return 0;
  return Math.round((ratings.reduce((sum, r) => sum + r, 0) / ratings.length) * 10) / 10;
};

// ============================================
// Category Adapters
// ============================================

// Map father categories to icons
const categoryIconMap: Record<string, string> = {
  'חשמל ואלקטרוניקה': 'Zap',
  'שירותים כלליים': 'Wrench',
  'קוסמטיקה וטיפוח': 'Sparkles',
  'מבנה ואינסטלציה': 'Droplet',
  'עיצוב ןאדריכלות': 'Paintbrush',
};

/**
 * Convert server Category to frontend Category format
 */
export const adaptServerCategoryToCategory = (serverCategory: ServerCategory): Category => {
  return {
    id: serverCategory.id.toString(),
    name: serverCategory.name,
    icon: categoryIconMap[serverCategory.fatherCategory || ''] || 'Briefcase',
    description: serverCategory.description,
    defaultQuestions: [],
    isActive: true,
    order: serverCategory.id,
    professionalCount: 0,
  };
};
