import api from './api';
import type { Review } from '../types/review.types';
import type { RatingBreakdown } from '../types/professional.types';

export interface CreateReviewData {
  professionalId: string;
  ratings: RatingBreakdown;
  text: string;
}

export interface ReviewResponse {
  review: Review;
}

export const reviewService = {
  create: async (data: CreateReviewData): Promise<Review> => {
    const response = await api.post<ReviewResponse>('/reviews', data);
    return response.data.review;
  },

  getByProfessional: async (
    professionalId: string,
    page = 1,
    limit = 10
  ): Promise<{ reviews: Review[]; total: number; page: number; totalPages: number }> => {
    const response = await api.get(`/professionals/${professionalId}/reviews`, {
      params: { page, limit },
    });
    return response.data;
  },

  getMyReviews: async (): Promise<Review[]> => {
    const response = await api.get<{ reviews: Review[] }>('/reviews/my');
    return response.data.reviews;
  },

  addResponse: async (reviewId: string, response: string): Promise<Review> => {
    const res = await api.post<ReviewResponse>(`/reviews/${reviewId}/response`, {
      response,
    });
    return res.data.review;
  },

  report: async (reviewId: string, reason: string): Promise<void> => {
    await api.post(`/reviews/${reviewId}/report`, { reason });
  },
};

export default reviewService;
