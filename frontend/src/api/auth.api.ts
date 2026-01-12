import { simulateDelay } from './client';
import type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse
} from '../types/user.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  UPDATE_PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
};

// Mock data
const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  firstName: 'ישראל',
  lastName: 'כהן',
  phone: '050-1234567',
  city: 'ירושלים',
  role: 'customer',
  status: 'active',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

const mockProfessionalUser: User = {
  id: 'pro-1',
  email: 'pro@example.com',
  firstName: 'משה',
  lastName: 'לוי',
  phone: '050-9876543',
  city: 'בני ברק',
  role: 'professional',
  status: 'active',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

const mockAdminUser: User = {
  id: 'admin-1',
  email: 'admin@example.com',
  firstName: 'אברהם',
  lastName: 'גולד',
  phone: '050-5555555',
  city: 'תל אביב',
  role: 'admin',
  status: 'active',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

// Auth API Service
export const authApi = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<AuthResponse>(ENDPOINTS.LOGIN, credentials);
    // return response.data;

    // Mock implementation
    let user = mockUser;
    if (credentials.email.includes('pro')) {
      user = mockProfessionalUser;
    } else if (credentials.email.includes('admin')) {
      user = mockAdminUser;
    }

    return {
      user,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  },

  /**
   * Register new customer
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<AuthResponse>(ENDPOINTS.REGISTER, data);
    // return response.data;

    // Mock implementation
    const newUser: User = {
      id: 'user-' + Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      city: data.city,
      gender: data.gender,
      role: 'customer',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await simulateDelay(200);

    // TODO: Replace with actual API call when server is ready
    // await apiClient.post(ENDPOINTS.LOGOUT);

    // Mock implementation - just clear tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<User>(ENDPOINTS.ME);
    // return response.data;

    // Mock implementation
    return mockUser;
  },

  /**
   * Request password reset
   */
  async forgotPassword(_email: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(ENDPOINTS.FORGOT_PASSWORD, { email });
    // return response.data;

    return { message: 'קישור לאיפוס סיסמה נשלח לכתובת האימייל שלך' };
  },

  /**
   * Reset password with token
   */
  async resetPassword(_token: string, _newPassword: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(ENDPOINTS.RESET_PASSWORD, { token, newPassword });
    // return response.data;

    return { message: 'הסיסמה עודכנה בהצלחה' };
  },

  /**
   * Verify email with token
   */
  async verifyEmail(_token: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(ENDPOINTS.VERIFY_EMAIL, { token });
    // return response.data;

    return { message: 'האימייל אומת בהצלחה' };
  },

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.patch<User>(ENDPOINTS.UPDATE_PROFILE, data);
    // return response.data;

    return { ...mockUser, ...data, updatedAt: new Date() };
  },

  /**
   * Change password
   */
  async changePassword(_currentPassword: string, _newPassword: string): Promise<{ message: string }> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post(ENDPOINTS.CHANGE_PASSWORD, { currentPassword, newPassword });
    // return response.data;

    return { message: 'הסיסמה עודכנה בהצלחה' };
  },
};

// Export endpoints for reference
export { ENDPOINTS as AUTH_ENDPOINTS };
