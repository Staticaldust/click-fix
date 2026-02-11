import apiClient from './client';
import type { Complaint } from '../types/complaint.types';

const ENDPOINTS = {
  LIST: '/complaints',
  GET_BY_ID: '/complaints/:id',
};

// Complaint API Service
export const complaintApi = {
  /**
   * Get all complaints for current user
   * GET /api/complaints
   */
  async getAll(): Promise<Complaint[]> {
    const response = await apiClient.get<Complaint[]>(ENDPOINTS.LIST);
    return response.data;
  },

  /**
   * Get complaint by ID
   * GET /api/complaints/:id
   */
  async getById(id: string): Promise<Complaint> {
    const response = await apiClient.get<Complaint>(
      ENDPOINTS.GET_BY_ID.replace(':id', id)
    );
    return response.data;
  },

  /**
   * Create new complaint
   * POST /api/complaints
   */
  async create(data: {
    type: Complaint['type'];
    targetProfessionalId?: string;
    subject: string;
    content: string;
  }): Promise<Complaint> {
    const response = await apiClient.post<Complaint>(ENDPOINTS.LIST, data);
    return response.data;
  },

  /**
   * Update complaint (admin)
   * PUT /api/complaints/:id
   */
  async update(id: string, data: {
    status?: Complaint['status'];
    adminNotes?: string;
    resolvedBy?: string;
  }): Promise<Complaint> {
    const response = await apiClient.put<Complaint>(
      ENDPOINTS.GET_BY_ID.replace(':id', id),
      data
    );
    return response.data;
  },
};