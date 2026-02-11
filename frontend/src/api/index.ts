// API Client
export { default as apiClient, getErrorMessage } from './client';
export type { ApiError } from './client';

// Auth API
export { authApi, AUTH_ENDPOINTS } from './auth.api';

// Users API
export { usersApi, USERS_ENDPOINTS } from './users.api';

// Employee API (service providers / professionals)
export { employeeApi, EMPLOYEE_ENDPOINTS } from './employee.api';

// Category API
export { categoryApi, CATEGORY_ENDPOINTS } from './category.api';

// Review API
export { reviewApi, REVIEW_ENDPOINTS } from './review.api';

// Chat API
export { chatApi } from './chat.api';

// Notification API
export { notificationApi } from './notification.api';

// Complaint API
export { complaintApi } from './complaint.api';

// Adapters - for direct use when needed
export {
  adaptServerAuthToUser,
  adaptServerUserToUser,
  adaptEmployeeToProfessional,
  adaptServerReviewToReview,
  adaptServerCategoryToCategory,
} from './adapters';
