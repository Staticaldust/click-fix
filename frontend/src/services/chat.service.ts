import api from './api';

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  senderType: 'customer' | 'professional';
  type: 'text' | 'quote' | 'image';
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatPreview {
  id: number;
  customerId: number;
  professionalId: number;
  customer?: { id: number; firstName: string; lastName: string };
  professional?: { id: number; firstName: string; lastName: string };
  lastMessage?: ChatMessage;
  updatedAt: string;
}

export const chatService = {
  getChats: async (): Promise<ChatPreview[]> => {
    const response = await api.get<ChatPreview[]>('/chats');
    return response.data;
  },

  getChatById: async (chatId: number): Promise<any> => {
    const response = await api.get(`/chats/${chatId}`);
    return response.data;
  },

  sendMessage: async (chatId: number, content: string): Promise<ChatMessage> => {
    const response = await api.post<ChatMessage>(`/chats/${chatId}/messages`, {
      chatId,
      content,
      type: 'text',
    });
    return response.data;
  },

  createChat: async (customerId: number, professionalId: number, quoteRequestId?: number): Promise<any> => {
    const response = await api.post('/chats', { customerId, professionalId, quoteRequestId });
    return response.data;
  },
};

export default chatService;
