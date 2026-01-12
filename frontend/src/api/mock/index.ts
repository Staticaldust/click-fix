// Auth mock data
export { mockUser, mockProfessionalUser, mockAdminUser } from './auth.mock';

// Professional mock data
export { mockProfessionals, mockProfessionalStats } from './professional.mock';

// Quote mock data
export { mockQuoteRequests, mockQuoteResponses, mockQuoteQuestions } from './quote.mock';

// Review mock data
export { mockReviews } from './review.mock';

// Admin mock data
export {
  mockDashboardStats,
  mockRecentActivity,
  mockAdminUsers,
  mockPendingProfessionals,
  mockReportedReviews,
} from './admin.mock';
export type { DashboardStats, RecentActivity } from './admin.mock';

// Chat mock data
export { mockConversations, mockMessages } from './chat.mock';

// Category mock data
export { mockCategories } from './category.mock';

// Favorites mock data
export {
  mockFavoriteIds,
  mockFavoriteProfessionals,
  addToMockFavorites,
  removeFromMockFavorites,
  resetMockFavorites,
} from './favorites.mock';
