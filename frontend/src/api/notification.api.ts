import apiClient from './client';
import type { Notification } from '../types/notification.types';

const ENDPOINTS = {
  LIST: '/notifications',
  MARK_READ: '/notifications/:id/read',
};

// Notification API Service
export const notificationApi = {
  /**
   * Get all notifications for current user
   * GET /api/notifications
   */
  async getAll(params?: { page?: number; limit?: number }): Promise<{
    notifications: Notification[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await apiClient.get<{
      notifications: Notification[];
      total: number;
      page: number;
      totalPages: number;
    }>(ENDPOINTS.LIST, { params });
    return response.data;
  },

  /**
   * Mark notification as read
   * PUT /api/notifications/:id/read
   */
  async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.put<Notification>(
      ENDPOINTS.MARK_READ.replace(':id', id)
    );
    return response.data;
  },

  /**
   * Create notification (admin/internal)
   * POST /api/notifications
   */
  async create(data: {
    userId: string;
    type: Notification['type'];
    title: string;
    content: string;
    link?: string;
    channels?: string[];
  }): Promise<Notification> {
    const response = await apiClient.post<Notification>(ENDPOINTS.LIST, data);
    return response.data;
  },
};