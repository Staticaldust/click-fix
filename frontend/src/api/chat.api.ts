import { simulateDelay, PaginatedResponse, PaginationParams } from './client';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  CONVERSATIONS: '/chat/conversations',
  CONVERSATION_BY_ID: '/chat/conversations/:id',
  MESSAGES: '/chat/conversations/:id/messages',
  SEND_MESSAGE: '/chat/conversations/:id/messages',
  MARK_READ: '/chat/conversations/:id/read',
  START_CONVERSATION: '/chat/conversations',
  DELETE_CONVERSATION: '/chat/conversations/:id',
  UNREAD_COUNT: '/chat/unread-count',
};

// Types
export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'professional';
  isOnline: boolean;
}

export interface Conversation {
  id: string;
  participant: ChatParticipant;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  quoteRequestId?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
  size: number;
}

export interface SendMessageData {
  content: string;
  attachments?: File[];
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      id: 'user-1',
      name: 'ישראל כהן',
      role: 'customer',
      isOnline: true,
    },
    lastMessage: 'תודה רבה, אשמח לתאם פגישה',
    lastMessageTime: new Date('2024-01-12T14:30:00'),
    unreadCount: 2,
    quoteRequestId: 'quote-1',
  },
  {
    id: 'conv-2',
    participant: {
      id: 'user-2',
      name: 'רחל לוי',
      role: 'customer',
      isOnline: false,
    },
    lastMessage: 'מתי תוכל להגיע?',
    lastMessageTime: new Date('2024-01-12T10:15:00'),
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participant: {
      id: 'user-3',
      name: 'משה גולד',
      role: 'customer',
      isOnline: true,
    },
    lastMessage: 'המחיר מקובל עליי',
    lastMessageTime: new Date('2024-01-11T18:45:00'),
    unreadCount: 0,
  },
];

const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'ישראל כהן',
      content: 'שלום, ראיתי את הפרופיל שלך ואני מעוניין בהתקנת נקודות חשמל',
      timestamp: new Date('2024-01-12T10:00:00'),
      isRead: true,
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'pro-1',
      senderName: 'דוד כהן',
      content: 'שלום! אשמח לעזור. כמה נקודות אתה צריך?',
      timestamp: new Date('2024-01-12T10:05:00'),
      isRead: true,
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'ישראל כהן',
      content: 'אני צריך 5 נקודות בסלון ו-3 בחדר שינה',
      timestamp: new Date('2024-01-12T10:10:00'),
      isRead: true,
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      senderId: 'pro-1',
      senderName: 'דוד כהן',
      content: 'מעולה. המחיר יהיה בין 800 ל-1200 ש"ח תלוי בסוג התקנה. מתי נוח לך שאגיע לבדוק?',
      timestamp: new Date('2024-01-12T10:15:00'),
      isRead: true,
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'ישראל כהן',
      content: 'תודה רבה, אשמח לתאם פגישה',
      timestamp: new Date('2024-01-12T14:30:00'),
      isRead: false,
    },
  ],
  'conv-2': [
    {
      id: 'msg-6',
      conversationId: 'conv-2',
      senderId: 'user-2',
      senderName: 'רחל לוי',
      content: 'שלום, יש לי בעיה עם הכיור',
      timestamp: new Date('2024-01-12T09:00:00'),
      isRead: true,
    },
    {
      id: 'msg-7',
      conversationId: 'conv-2',
      senderId: 'pro-1',
      senderName: 'דוד כהן',
      content: 'מה הבעיה בדיוק?',
      timestamp: new Date('2024-01-12T09:30:00'),
      isRead: true,
    },
    {
      id: 'msg-8',
      conversationId: 'conv-2',
      senderId: 'user-2',
      senderName: 'רחל לוי',
      content: 'מתי תוכל להגיע?',
      timestamp: new Date('2024-01-12T10:15:00'),
      isRead: true,
    },
  ],
};

// Chat API Service
export const chatApi = {
  /**
   * Get all conversations
   */
  async getConversations(pagination?: PaginationParams): Promise<PaginatedResponse<Conversation>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Conversation>>(ENDPOINTS.CONVERSATIONS, {
    //   params: pagination
    // });
    // return response.data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const start = (page - 1) * limit;
    const paginatedData = mockConversations.slice(start, start + limit);

    return {
      data: paginatedData,
      total: mockConversations.length,
      page,
      limit,
      totalPages: Math.ceil(mockConversations.length / limit),
    };
  },

  /**
   * Get conversation by ID
   */
  async getConversationById(id: string): Promise<Conversation> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Conversation>(ENDPOINTS.CONVERSATION_BY_ID.replace(':id', id));
    // return response.data;

    const conversation = mockConversations.find((c) => c.id === id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return conversation;
  },

  /**
   * Get messages for a conversation
   */
  async getMessages(
    conversationId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Message>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Message>>(
    //   ENDPOINTS.MESSAGES.replace(':id', conversationId),
    //   { params: pagination }
    // );
    // return response.data;

    const messages = mockMessages[conversationId] || [];
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 50;
    const start = (page - 1) * limit;
    const paginatedData = messages.slice(start, start + limit);

    return {
      data: paginatedData,
      total: messages.length,
      page,
      limit,
      totalPages: Math.ceil(messages.length / limit),
    };
  },

  /**
   * Send a message
   */
  async sendMessage(conversationId: string, data: SendMessageData): Promise<Message> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const formData = new FormData();
    // formData.append('content', data.content);
    // if (data.attachments) {
    //   data.attachments.forEach((file, i) => {
    //     formData.append(`attachments[${i}]`, file);
    //   });
    // }
    // const response = await apiClient.post<Message>(
    //   ENDPOINTS.SEND_MESSAGE.replace(':id', conversationId),
    //   formData
    // );
    // return response.data;

    const newMessage: Message = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId: 'pro-1', // Current user ID
      senderName: 'דוד כהן',
      content: data.content,
      timestamp: new Date(),
      isRead: false,
    };

    return newMessage;
  },

  /**
   * Mark conversation as read
   */
  async markAsRead(_conversationId: string): Promise<void> {
    await simulateDelay(200);

    // TODO: Replace with actual API call when server is ready
    // await apiClient.post(ENDPOINTS.MARK_READ.replace(':id', conversationId));
  },

  /**
   * Start a new conversation
   */
  async startConversation(
    participantId: string,
    initialMessage: string,
    quoteRequestId?: string
  ): Promise<Conversation> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<Conversation>(ENDPOINTS.START_CONVERSATION, {
    //   participantId,
    //   initialMessage,
    //   quoteRequestId,
    // });
    // return response.data;

    const newConversation: Conversation = {
      id: 'conv-' + Date.now(),
      participant: {
        id: participantId,
        name: 'לקוח חדש',
        role: 'customer',
        isOnline: false,
      },
      lastMessage: initialMessage,
      lastMessageTime: new Date(),
      unreadCount: 0,
      quoteRequestId,
    };

    return newConversation;
  },

  /**
   * Delete conversation
   */
  async deleteConversation(_conversationId: string): Promise<void> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.delete(ENDPOINTS.DELETE_CONVERSATION.replace(':id', conversationId));
  },

  /**
   * Get total unread count
   */
  async getUnreadCount(): Promise<number> {
    await simulateDelay(200);

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<{ count: number }>(ENDPOINTS.UNREAD_COUNT);
    // return response.data.count;

    return mockConversations.reduce((total, conv) => total + conv.unreadCount, 0);
  },

  /**
   * Search conversations
   */
  async searchConversations(query: string): Promise<Conversation[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Conversation[]>(`${ENDPOINTS.CONVERSATIONS}/search`, {
    //   params: { query }
    // });
    // return response.data;

    return mockConversations.filter((conv) =>
      conv.participant.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};

// Export endpoints for reference
export { ENDPOINTS as CHAT_ENDPOINTS };
