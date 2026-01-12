import api from './api';
import type { Professional, ProfessionalStats } from '../types/professional.types';
import type { Review } from '../types/review.types';
import type { Gender } from '../types/user.types';

export interface SearchParams {
  query?: string;
  category?: string;
  city?: string;
  gender?: Gender;
  minRating?: number;
  sortBy?: 'rating' | 'reviews' | 'price';
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  professionals: Professional[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProfessionalReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
}

export const professionalService = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    const response = await api.get<SearchResponse>('/professionals/search', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Professional> => {
    const response = await api.get<Professional>(`/professionals/${id}`);
    return response.data;
  },

  getFeatured: async (limit = 4): Promise<Professional[]> => {
    const response = await api.get<{ professionals: Professional[] }>('/professionals/featured', {
      params: { limit },
    });
    return response.data.professionals;
  },

  getReviews: async (
    professionalId: string,
    page = 1,
    limit = 10
  ): Promise<ProfessionalReviewsResponse> => {
    const response = await api.get<ProfessionalReviewsResponse>(
      `/professionals/${professionalId}/reviews`,
      { params: { page, limit } }
    );
    return response.data;
  },

  getStats: async (professionalId: string): Promise<ProfessionalStats> => {
    const response = await api.get<ProfessionalStats>(
      `/professionals/${professionalId}/stats`
    );
    return response.data;
  },

  updateProfile: async (
    professionalId: string,
    data: Partial<Professional>
  ): Promise<Professional> => {
    const response = await api.put<Professional>(
      `/professionals/${professionalId}`,
      data
    );
    return response.data;
  },

  uploadCertificate: async (
    professionalId: string,
    file: File,
    name: string
  ): Promise<{ id: string; fileUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    const response = await api.post<{ id: string; fileUrl: string }>(
      `/professionals/${professionalId}/certificates`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  deleteCertificate: async (
    professionalId: string,
    certificateId: string
  ): Promise<void> => {
    await api.delete(`/professionals/${professionalId}/certificates/${certificateId}`);
  },
};

export default professionalService;
