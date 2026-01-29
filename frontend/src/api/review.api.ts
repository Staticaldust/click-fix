import apiClient from './client';
import { adaptServerReviewToReview } from './adapters';
import type { Review } from '../types/review.types';
import type { ServerReview } from '../types/server.types';

// API Endpoints
const ENDPOINTS = {
  LIST: '/reviews',
  GET_BY_ID: '/reviews/:id',
};

// Review API Service - Returns UI-compatible Review types
export const reviewApi = {
  /**
   * Get all reviews
   * GET /api/reviews
   */
  async getAll(): Promise<Review[]> {
    const response = await apiClient.get<ServerReview[]>(ENDPOINTS.LIST);
    return response.data.map(adaptServerReviewToReview);
  },

  /**
   * Get review by ID
   * GET /api/reviews/:id
   */
  async getById(id: number | string): Promise<Review> {
    const response = await apiClient.get<ServerReview>(
      ENDPOINTS.GET_BY_ID.replace(':id', id.toString())
    );
    return adaptServerReviewToReview(response.data);
  },

  /**
   * Get reviews for a specific professional/employee
   */
  async getByProfessional(professionalId: number | string): Promise<Review[]> {
    const reviews = await this.getAll();
    return reviews.filter(
      (review) => review.professionalId === professionalId.toString()
    );
  },

  /**
   * Get reviews by a specific user/customer
   */
  async getByCustomer(customerId: number | string): Promise<Review[]> {
    const reviews = await this.getAll();
    return reviews.filter(
      (review) => review.customerId === customerId.toString()
    );
  },

  /**
   * Calculate average ratings for a professional from their reviews
   */
  calculateAverageRatings(reviews: Review[]): {
    overall: number;
    reliability: number;
    service: number;
    availability: number;
    price: number;
    professionalism: number;
  } {
    if (reviews.length === 0) {
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
        reliability: acc.reliability + review.ratings.reliability,
        service: acc.service + review.ratings.service,
        availability: acc.availability + review.ratings.availability,
        price: acc.price + review.ratings.price,
        professionalism: acc.professionalism + review.ratings.professionalism,
      }),
      { reliability: 0, service: 0, availability: 0, price: 0, professionalism: 0 }
    );

    const count = reviews.length;
    const reliability = totals.reliability / count;
    const service = totals.service / count;
    const availability = totals.availability / count;
    const price = totals.price / count;
    const professionalism = totals.professionalism / count;
    const overall = (reliability + service + availability + price + professionalism) / 5;

    return {
      overall: Math.round(overall * 10) / 10,
      reliability: Math.round(reliability * 10) / 10,
      service: Math.round(service * 10) / 10,
      availability: Math.round(availability * 10) / 10,
      price: Math.round(price * 10) / 10,
      professionalism: Math.round(professionalism * 10) / 10,
    };
  },

  /**
   * Get raw server review data
   */
  async getRawAll(): Promise<ServerReview[]> {
    const response = await apiClient.get<ServerReview[]>(ENDPOINTS.LIST);
    return response.data;
  },
};

// Export endpoints for reference
export { ENDPOINTS as REVIEW_ENDPOINTS };
