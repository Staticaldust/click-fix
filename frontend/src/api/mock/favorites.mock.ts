import type { Professional } from '../../types/professional.types';

// Mock data - professional IDs in favorites
export let mockFavoriteIds: string[] = ['pro-1', 'pro-2'];

// Mock professional data for favorites
export const mockFavoriteProfessionals: Professional[] = [
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

// Helper functions to modify favorites (for mock purposes)
export const addToMockFavorites = (id: string) => {
  if (!mockFavoriteIds.includes(id)) {
    mockFavoriteIds.push(id);
  }
};

export const removeFromMockFavorites = (id: string) => {
  mockFavoriteIds = mockFavoriteIds.filter((fId) => fId !== id);
};

export const resetMockFavorites = () => {
  mockFavoriteIds = ['pro-1', 'pro-2'];
};
