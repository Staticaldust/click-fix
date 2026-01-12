import api from './api';
import type { Category } from '../types/category.types';

export interface CategoriesResponse {
  categories: Category[];
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<CategoriesResponse>('/categories');
    return response.data.categories;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
