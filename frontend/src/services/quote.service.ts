import api from './api';
import type {
  QuoteRequest,
  QuoteResponse,
  QuoteRequestFormData,
  QuoteQuestion,
} from '../types/quote.types';

export interface QuotesListResponse {
  quotes: QuoteRequest[];
  total: number;
  page: number;
  totalPages: number;
}

export interface QuoteDetailResponse {
  quote: QuoteRequest;
  response?: QuoteResponse;
}

export const quoteService = {
  // Get quote questions for a category
  getQuestions: async (categoryId: string): Promise<QuoteQuestion[]> => {
    const response = await api.get<{ questions: QuoteQuestion[] }>(
      `/categories/${categoryId}/questions`
    );
    return response.data.questions;
  },

  // Create a new quote request
  create: async (data: QuoteRequestFormData): Promise<QuoteRequest> => {
    const response = await api.post<{ quote: QuoteRequest }>('/quotes', data);
    return response.data.quote;
  },

  // Get all quotes for current user (customer)
  getMyQuotes: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<QuotesListResponse> => {
    const response = await api.get<QuotesListResponse>('/quotes/my', {
      params: { page, limit, status },
    });
    return response.data;
  },

  // Get single quote details
  getById: async (quoteId: string): Promise<QuoteDetailResponse> => {
    const response = await api.get<QuoteDetailResponse>(`/quotes/${quoteId}`);
    return response.data;
  },

  // Accept a quote response
  accept: async (quoteId: string): Promise<QuoteRequest> => {
    const response = await api.post<{ quote: QuoteRequest }>(
      `/quotes/${quoteId}/accept`
    );
    return response.data.quote;
  },

  // Reject a quote response
  reject: async (quoteId: string): Promise<QuoteRequest> => {
    const response = await api.post<{ quote: QuoteRequest }>(
      `/quotes/${quoteId}/reject`
    );
    return response.data.quote;
  },

  // Professional: Get incoming quote requests
  getIncomingRequests: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<QuotesListResponse> => {
    const response = await api.get<QuotesListResponse>('/quotes/incoming', {
      params: { page, limit, status },
    });
    return response.data;
  },

  // Professional: Respond to a quote request
  respond: async (
    quoteId: string,
    data: {
      price: number;
      availability: string;
      notes?: string;
      validUntil: Date;
    }
  ): Promise<QuoteResponse> => {
    const response = await api.post<{ response: QuoteResponse }>(
      `/quotes/${quoteId}/respond`,
      data
    );
    return response.data.response;
  },
};

export default quoteService;
