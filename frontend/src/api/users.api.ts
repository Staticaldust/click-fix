import apiClient from './client';
import { adaptServerUserToUser } from './adapters';
import type { User } from '../types/user.types';
import type { ServerUser } from '../types/server.types';

// API Endpoints
const ENDPOINTS = {
  LIST: '/users',
  GET_BY_ID: '/users/:id',
};

// Users API Service - Returns UI-compatible User types
export const usersApi = {
  /**
   * Get all users
   * GET /api/users
   */
  async getAll(): Promise<User[]> {
    const response = await apiClient.get<ServerUser[]>(ENDPOINTS.LIST);
    return response.data.map((user) => adaptServerUserToUser(user, 'customer'));
  },

  /**
   * Get user by ID
   * GET /api/users/:id
   */
  async getById(id: number | string): Promise<User> {
    const response = await apiClient.get<ServerUser>(
      ENDPOINTS.GET_BY_ID.replace(':id', id.toString())
    );
    return adaptServerUserToUser(response.data, 'customer');
  },

  /**
   * Search users by name
   */
  async searchByName(query: string): Promise<User[]> {
    const users = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Search users by email
   */
  async searchByEmail(email: string): Promise<User[]> {
    const users = await this.getAll();
    const lowerEmail = email.toLowerCase();
    return users.filter((user) => user.email.toLowerCase().includes(lowerEmail));
  },

  /**
   * Get raw server user data
   */
  async getRawAll(): Promise<ServerUser[]> {
    const response = await apiClient.get<ServerUser[]>(ENDPOINTS.LIST);
    return response.data;
  },
};

// Export endpoints for reference
export { ENDPOINTS as USERS_ENDPOINTS };
