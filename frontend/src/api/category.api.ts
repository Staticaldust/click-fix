import apiClient from './client';
import { adaptServerCategoryToCategory } from './adapters';
import type { Category } from '../types/category.types';
import type { ServerCategory, ServerFatherCategory } from '../types/server.types';

// API Endpoints
const ENDPOINTS = {
  LIST: '/categories',
  GET_BY_ID: '/categories/:id',
};

// Category API Service - Returns UI-compatible Category types
export const categoryApi = {
  /**
   * Get all categories
   * GET /api/categories
   */
  async getAll(): Promise<Category[]> {
    const response = await apiClient.get<ServerCategory[]>(ENDPOINTS.LIST);
    return response.data.map(adaptServerCategoryToCategory);
  },

  /**
   * Get category by ID
   * GET /api/categories/:id
   */
  async getById(id: number | string): Promise<Category> {
    const response = await apiClient.get<ServerCategory>(
      ENDPOINTS.GET_BY_ID.replace(':id', id.toString())
    );
    return adaptServerCategoryToCategory(response.data);
  },

  /**
   * Get categories by father category
   */
  async getByFatherCategory(fatherCategory: ServerFatherCategory): Promise<Category[]> {
    const categories = await this.getAll();
    // We need to get raw data to filter by fatherCategory
    const response = await apiClient.get<ServerCategory[]>(ENDPOINTS.LIST);
    const matchingIds = response.data
      .filter((cat) => cat.fatherCategory === fatherCategory)
      .map((cat) => cat.id.toString());

    return categories.filter((cat) => matchingIds.includes(cat.id));
  },

  /**
   * Search categories by name
   */
  async searchByName(query: string): Promise<Category[]> {
    const categories = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(lowerQuery) ||
        cat.description?.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get raw server category data
   */
  async getRawAll(): Promise<ServerCategory[]> {
    const response = await apiClient.get<ServerCategory[]>(ENDPOINTS.LIST);
    return response.data;
  },
};

// Export endpoints for reference
export { ENDPOINTS as CATEGORY_ENDPOINTS };
