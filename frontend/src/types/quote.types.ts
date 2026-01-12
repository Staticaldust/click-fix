import { Professional } from './professional.types';

export type QuoteStatus = 'pending' | 'responded' | 'accepted' | 'rejected' | 'expired';
export type ResponseMethod = 'system' | 'phone';

export interface QuoteQuestion {
  id: string;
  question: string;
  type: 'text' | 'select' | 'multiselect' | 'number';
  options?: string[];
  required: boolean;
}

export interface QuoteAnswer {
  questionId: string;
  question: string;
  answer: string | string[] | number;
}

export interface QuoteRequest {
  id: string;
  customerId: string;
  customerName: string;
  professionalId: string;
  professionalName: string;
  categoryId: string;
  answers: QuoteAnswer[];
  description?: string;
  urgency: 'low' | 'medium' | 'high';
  responseMethod: ResponseMethod;
  status: QuoteStatus;
  createdAt: Date;
  respondedAt?: Date;
}

export interface QuoteResponse {
  id: string;
  quoteRequestId: string;
  professionalId: string;
  price: number;
  availability: string;
  notes?: string;
  validUntil: Date;
  createdAt: Date;
}

export interface QuoteComparison {
  requestId: string;
  responses: Array<{
    response: QuoteResponse;
    professional: Professional;
  }>;
}

export interface QuoteRequestFormData {
  professionalId: string;
  answers: Array<{
    questionId: string;
    answer: string | string[] | number;
  }>;
  description?: string;
  urgency: 'low' | 'medium' | 'high';
  responseMethod: ResponseMethod;
}
