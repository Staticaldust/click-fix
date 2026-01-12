import { simulateDelay, PaginatedResponse, PaginationParams } from './client';
import type { Review, ReviewFormData } from '../types/review.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  LIST: '/reviews',
  GET_BY_ID: '/reviews/:id',
  CREATE: '/reviews',
  UPDATE: '/reviews/:id',
  DELETE: '/reviews/:id',
  BY_PROFESSIONAL: '/reviews/professional/:professionalId',
  MY_REVIEWS: '/reviews/customer',
  RESPOND: '/reviews/:id/respond',
  REPORT: '/reviews/:id/report',
};

// Mock data
const mockReviews: Review[] = [
  {
    id: 'review-1',
    professionalId: 'pro-1',
    customerId: 'user-1',
    customerName: 'ישראל כהן',
    ratings: {
      reliability: 5,
      service: 5,
      availability: 4,
      price: 5,
      professionalism: 5,
    },
    overallRating: 4.8,
    content: 'עבודה מקצועית ומהירה! הגיע בזמן ותיקן את התקלה במהירות. ממליץ בחום!',
    isVerified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'review-2',
    professionalId: 'pro-1',
    customerId: 'user-2',
    customerName: 'רחל לוי',
    ratings: {
      reliability: 5,
      service: 4,
      availability: 5,
      price: 4,
      professionalism: 5,
    },
    overallRating: 4.6,
    content: 'שירות מעולה! מאוד מקצועי וזמין. המחיר היה הוגן.',
    isVerified: true,
    createdAt: new Date('2024-01-05'),
    response: {
      content: 'תודה רבה על הביקורת החיובית!',
      createdAt: new Date('2024-01-06'),
    },
  },
  {
    id: 'review-3',
    professionalId: 'pro-1',
    customerId: 'user-3',
    customerName: 'משה גולד',
    ratings: {
      reliability: 5,
      service: 5,
      availability: 5,
      price: 5,
      professionalism: 5,
    },
    overallRating: 5.0,
    content: 'פשוט מושלם! הכי טוב שיש!',
    isVerified: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'review-4',
    professionalId: 'pro-2',
    customerId: 'user-1',
    customerName: 'ישראל כהן',
    ratings: {
      reliability: 4,
      service: 4,
      availability: 5,
      price: 3,
      professionalism: 4,
    },
    overallRating: 4.0,
    content: 'עבודה טובה, אבל המחיר היה גבוה יחסית.',
    isVerified: true,
    createdAt: new Date('2023-12-20'),
  },
];

export interface ReviewFilters {
  minRating?: number;
  verified?: boolean;
  hasResponse?: boolean;
}

// Review API Service
export const reviewApi = {
  /**
   * Get reviews for a professional
   */
  async getByProfessional(
    professionalId: string,
    filters?: ReviewFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Review>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Review>>(
    //   ENDPOINTS.BY_PROFESSIONAL.replace(':professionalId', professionalId),
    //   { params: { ...filters, ...pagination } }
    // );
    // return response.data;

    let filtered = mockReviews.filter((r) => r.professionalId === professionalId);

    if (filters?.minRating) {
      filtered = filtered.filter((r) => r.overallRating >= filters.minRating!);
    }
    if (filters?.verified !== undefined) {
      filtered = filtered.filter((r) => r.isVerified === filters.verified);
    }
    if (filters?.hasResponse !== undefined) {
      filtered = filtered.filter((r) => (r.response !== undefined) === filters.hasResponse);
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
   * Get customer's reviews
   */
  async getMyReviews(pagination?: PaginationParams): Promise<PaginatedResponse<Review>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Review>>(ENDPOINTS.MY_REVIEWS, {
    //   params: pagination
    // });
    // return response.data;

    const myReviews = mockReviews.filter((r) => r.customerId === 'user-1');

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = myReviews.slice(start, start + limit);

    return {
      data: paginatedData,
      total: myReviews.length,
      page,
      limit,
      totalPages: Math.ceil(myReviews.length / limit),
    };
  },

  /**
   * Get review by ID
   */
  async getById(id: string): Promise<Review> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Review>(ENDPOINTS.GET_BY_ID.replace(':id', id));
    // return response.data;

    const review = mockReviews.find((r) => r.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  },

  /**
   * Create new review
   */
  async create(professionalId: string, data: ReviewFormData): Promise<Review> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Review>(ENDPOINTS.CREATE, { professionalId, ...data });
    // return response.data;

    const overallRating =
      Object.values(data.ratings).reduce((sum, r) => sum + r, 0) /
      Object.values(data.ratings).length;

    const newReview: Review = {
      id: 'review-' + Date.now(),
      professionalId,
      customerId: 'user-1',
      customerName: 'ישראל כהן',
      ratings: data.ratings,
      overallRating: Math.round(overallRating * 10) / 10,
      content: data.content,
      isVerified: true,
      createdAt: new Date(),
    };

    return newReview;
  },

  /**
   * Update review
   */
  async update(id: string, data: Partial<ReviewFormData>): Promise<Review> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.patch<Review>(ENDPOINTS.UPDATE.replace(':id', id), data);
    // return response.data;

    const review = mockReviews.find((r) => r.id === id);
    if (!review) {
      throw new Error('Review not found');
    }

    const updatedRatings = data.ratings ? { ...review.ratings, ...data.ratings } : review.ratings;
    const overallRating =
      Object.values(updatedRatings).reduce((sum, r) => sum + r, 0) /
      Object.values(updatedRatings).length;

    return {
      ...review,
      ratings: updatedRatings,
      content: data.content || review.content,
      overallRating: Math.round(overallRating * 10) / 10,
      updatedAt: new Date(),
    };
  },

  /**
   * Delete review
   */
  async delete(_id: string): Promise<void> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.delete(ENDPOINTS.DELETE.replace(':id', id));
  },

  /**
   * Respond to review (professional)
   */
  async respond(reviewId: string, content: string): Promise<Review> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Review>(ENDPOINTS.RESPOND.replace(':id', reviewId), { content });
    // return response.data;

    const review = mockReviews.find((r) => r.id === reviewId);
    if (!review) {
      throw new Error('Review not found');
    }

    return {
      ...review,
      response: {
        content,
        createdAt: new Date(),
      },
    };
  },

  /**
   * Report review
   */
  async report(_reviewId: string, _reason: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(ENDPOINTS.REPORT.replace(':id', reviewId), { reason });
    // return response.data;

    return { message: 'הדיווח התקבל ויטופל בהקדם' };
  },
};

// Export endpoints for reference
export { ENDPOINTS as REVIEW_ENDPOINTS };
