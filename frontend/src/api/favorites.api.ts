import { simulateDelay, PaginatedResponse, PaginationParams } from './client';
import type { Professional } from '../types/professional.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  LIST: '/favorites',
  ADD: '/favorites/:professionalId',
  REMOVE: '/favorites/:professionalId',
  CHECK: '/favorites/:professionalId/check',
};

// Mock data - professional IDs in favorites
let mockFavoriteIds: string[] = ['pro-1', 'pro-2'];

// Mock professional data for favorites
const mockFavoriteProfessionals: Professional[] = [
  {
    id: 'pro-1',
    email: 'electrician1@example.com',
    firstName: 'דוד',
    lastName: 'כהן',
    phone: '050-1234567',
    city: 'ירושלים',
    role: 'professional',
    status: 'approved',
    categoryId: 'electrician',
    categoryName: 'חשמלאי',
    description: 'חשמלאי מוסמך עם 15 שנות ניסיון',
    yearsOfExperience: 15,
    serviceAreas: ['ירושלים', 'בית שמש'],
    workingHours: [],
    services: [],
    certificates: [],
    rating: {
      overall: 4.8,
      reliability: 4.9,
      service: 4.7,
      availability: 4.6,
      price: 4.5,
      professionalism: 5.0,
    },
    reviewCount: 45,
    isVerified: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
    approvedAt: new Date('2023-01-05'),
    approvedBy: 'admin-1',
  },
  {
    id: 'pro-2',
    email: 'plumber1@example.com',
    firstName: 'יוסף',
    lastName: 'לוי',
    phone: '050-2345678',
    city: 'בני ברק',
    role: 'professional',
    status: 'approved',
    categoryId: 'plumber',
    categoryName: 'אינסטלטור',
    description: 'אינסטלטור מנוסה',
    yearsOfExperience: 10,
    serviceAreas: ['בני ברק', 'תל אביב'],
    workingHours: [],
    services: [],
    certificates: [],
    rating: {
      overall: 4.5,
      reliability: 4.4,
      service: 4.6,
      availability: 4.7,
      price: 4.3,
      professionalism: 4.5,
    },
    reviewCount: 32,
    isVerified: true,
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2024-01-10'),
    approvedAt: new Date('2023-03-03'),
    approvedBy: 'admin-1',
  },
];

// Favorites API Service
export const favoritesApi = {
  /**
   * Get user's favorite professionals
   */
  async getFavorites(pagination?: PaginationParams): Promise<PaginatedResponse<Professional>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Professional>>(ENDPOINTS.LIST, {
    //   params: pagination
    // });
    // return response.data;

    const favorites = mockFavoriteProfessionals.filter((p) => mockFavoriteIds.includes(p.id));
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = favorites.slice(start, start + limit);

    return {
      data: paginatedData,
      total: favorites.length,
      page,
      limit,
      totalPages: Math.ceil(favorites.length / limit),
    };
  },

  /**
   * Get favorite IDs only
   */
  async getFavoriteIds(): Promise<string[]> {
    await simulateDelay(200);

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<string[]>(`${ENDPOINTS.LIST}/ids`);
    // return response.data;

    return [...mockFavoriteIds];
  },

  /**
   * Add professional to favorites
   */
  async addFavorite(professionalId: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(ENDPOINTS.ADD.replace(':professionalId', professionalId));
    // return response.data;

    if (!mockFavoriteIds.includes(professionalId)) {
      mockFavoriteIds.push(professionalId);
    }

    return { message: 'נוסף למועדפים' };
  },

  /**
   * Remove professional from favorites
   */
  async removeFavorite(professionalId: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.delete(ENDPOINTS.REMOVE.replace(':professionalId', professionalId));

    mockFavoriteIds = mockFavoriteIds.filter((id) => id !== professionalId);

    return { message: 'הוסר מהמועדפים' };
  },

  /**
   * Toggle favorite status
   */
  async toggleFavorite(professionalId: string): Promise<{ isFavorite: boolean }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(`${ENDPOINTS.ADD.replace(':professionalId', professionalId)}/toggle`);
    // return response.data;

    const isFavorite = mockFavoriteIds.includes(professionalId);
    if (isFavorite) {
      mockFavoriteIds = mockFavoriteIds.filter((id) => id !== professionalId);
    } else {
      mockFavoriteIds.push(professionalId);
    }

    return { isFavorite: !isFavorite };
  },

  /**
   * Check if professional is in favorites
   */
  async isFavorite(professionalId: string): Promise<boolean> {
    await simulateDelay(100);

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<{ isFavorite: boolean }>(
    //   ENDPOINTS.CHECK.replace(':professionalId', professionalId)
    // );
    // return response.data.isFavorite;

    return mockFavoriteIds.includes(professionalId);
  },
};

// Export endpoints for reference
export { ENDPOINTS as FAVORITES_ENDPOINTS };
