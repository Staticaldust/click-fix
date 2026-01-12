import { QuoteResponse } from './quote.types';

export type MessageType = 'text' | 'quote' | 'image' | 'system';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderType: 'customer' | 'professional';
  type: MessageType;
  content: string;
  quoteData?: QuoteResponse;
  imageUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Chat {
  id: string;
  customerId: string;
  customerName: string;
  professionalId: string;
  professionalName: string;
  professionalImage?: string;
  quoteRequestId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}
