import apiClient from './client';
import type { Chat, Message } from '../types/chat.types';

const ENDPOINTS = {
  LIST: '/chats',
  GET_BY_ID: '/chats/:id',
  MESSAGES: '/chats/:id/messages',
};

// Chat API Service
export const chatApi = {
  /**
   * Get all chats for current user
   * GET /api/chats
   */
  async getAll(): Promise<Chat[]> {
    const response = await apiClient.get<Chat[]>(ENDPOINTS.LIST);
    return response.data;
  },

  /**
   * Get chat by ID
   * GET /api/chats/:id
   */
  async getById(id: string): Promise<Chat> {
    const response = await apiClient.get<Chat>(
      ENDPOINTS.GET_BY_ID.replace(':id', id)
    );
    return response.data;
  },

  /**
   * Create new chat
   * POST /api/chats
   */
  async create(data: { customerId: string; professionalId: string; quoteRequestId?: string }): Promise<Chat> {
    const response = await apiClient.post<Chat>(ENDPOINTS.LIST, data);
    return response.data;
  },

  /**
   * Send message in chat
   * POST /api/chats/:id/messages
   */
  async sendMessage(chatId: string, data: {
    content: string;
    type?: 'text' | 'quote' | 'image' | 'system';
    quoteData?: any;
    imageUrl?: string;
  }): Promise<Message> {
    const response = await apiClient.post<Message>(
      ENDPOINTS.MESSAGES.replace(':id', chatId),
      data
    );
    return response.data;
  },
};