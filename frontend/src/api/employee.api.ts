import apiClient from './client';
import { adaptEmployeeToProfessional } from './adapters';
import type { Professional } from '../types/professional.types';
import type { ServerEmployee } from '../types/server.types';

// API Endpoints
const ENDPOINTS = {
  LIST: '/employees',
  GET_BY_ID: '/employees/:id',
};

// Employee API Service - Returns Professional types for UI compatibility
export const employeeApi = {
  /**
   * Get all employees as Professionals
   * GET /api/employees
   */
  async getAll(): Promise<Professional[]> {
    const response = await apiClient.get<ServerEmployee[]>(ENDPOINTS.LIST);
    return response.data.map(adaptEmployeeToProfessional);
  },

  /**
   * Get employee by ID as Professional
   * GET /api/employees/:id
   */
  async getById(id: number | string): Promise<Professional> {
    const response = await apiClient.get<ServerEmployee>(
      ENDPOINTS.GET_BY_ID.replace(':id', id.toString())
    );
    return adaptEmployeeToProfessional(response.data);
  },

  /**
   * Search professionals by category
   */
  async getByCategory(categoryId: number | string): Promise<Professional[]> {
    const professionals = await this.getAll();
    return professionals.filter(
      (pro) => pro.categoryId === categoryId.toString()
    );
  },

  /**
   * Search professionals by area
   */
  async getByArea(area: string): Promise<Professional[]> {
    const professionals = await this.getAll();
    return professionals.filter((pro) =>
      pro.serviceAreas.some((a) => a.includes(area))
    );
  },

  /**
   * Search professionals by name
   */
  async searchByName(query: string): Promise<Professional[]> {
    const professionals = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return professionals.filter(
      (pro) =>
        pro.firstName.toLowerCase().includes(lowerQuery) ||
        pro.lastName.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get raw server employee data (for advanced use cases)
   */
  async getRawById(id: number | string): Promise<ServerEmployee> {
    const response = await apiClient.get<ServerEmployee>(
      ENDPOINTS.GET_BY_ID.replace(':id', id.toString())
    );
    return response.data;
  },
};

// Export endpoints for reference
export { ENDPOINTS as EMPLOYEE_ENDPOINTS };
