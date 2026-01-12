import { simulateDelay, PaginatedResponse, PaginationParams } from './client';
import type {
  QuoteRequest,
  QuoteResponse,
  QuoteStatus,
  QuoteRequestFormData,
  QuoteQuestion,
} from '../types/quote.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  LIST: '/quotes',
  GET_BY_ID: '/quotes/:id',
  CREATE: '/quotes',
  RESPOND: '/quotes/:id/respond',
  ACCEPT: '/quotes/:id/accept',
  REJECT: '/quotes/:id/reject',
  CANCEL: '/quotes/:id/cancel',
  CUSTOMER_QUOTES: '/quotes/customer',
  PROFESSIONAL_QUOTES: '/quotes/professional',
  GET_QUESTIONS: '/quotes/questions/:categoryId',
};

// Mock data
const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 'quote-1',
    customerId: 'user-1',
    customerName: 'ישראל כהן',
    professionalId: 'pro-1',
    professionalName: 'דוד כהן',
    categoryId: 'electrician',
    answers: [
      { questionId: 'q1', question: 'מה סוג העבודה?', answer: 'התקנת נקודות חשמל' },
      { questionId: 'q2', question: 'כמה נקודות?', answer: '5' },
    ],
    description: 'צריך להתקין 5 נקודות חשמל בסלון',
    urgency: 'medium',
    responseMethod: 'system',
    status: 'pending',
    createdAt: new Date('2024-01-12T10:00:00'),
  },
  {
    id: 'quote-2',
    customerId: 'user-1',
    customerName: 'ישראל כהן',
    professionalId: 'pro-2',
    professionalName: 'יוסף לוי',
    categoryId: 'plumber',
    answers: [
      { questionId: 'q1', question: 'מה הבעיה?', answer: 'נזילה במטבח' },
    ],
    description: 'יש נזילה מתחת לכיור במטבח',
    urgency: 'high',
    responseMethod: 'phone',
    status: 'responded',
    createdAt: new Date('2024-01-10T14:30:00'),
    respondedAt: new Date('2024-01-10T16:00:00'),
  },
  {
    id: 'quote-3',
    customerId: 'user-2',
    customerName: 'רחל לוי',
    professionalId: 'pro-1',
    professionalName: 'דוד כהן',
    categoryId: 'electrician',
    answers: [
      { questionId: 'q1', question: 'מה סוג העבודה?', answer: 'בדיקת לוח חשמל' },
    ],
    description: 'יש קפיצות בלוח חשמל',
    urgency: 'high',
    responseMethod: 'system',
    status: 'accepted',
    createdAt: new Date('2024-01-08T09:00:00'),
    respondedAt: new Date('2024-01-08T11:00:00'),
  },
];

const mockQuoteResponses: QuoteResponse[] = [
  {
    id: 'response-1',
    quoteRequestId: 'quote-2',
    professionalId: 'pro-2',
    price: 350,
    availability: 'יום ראשון או שני בבוקר',
    notes: 'המחיר כולל חומרים',
    validUntil: new Date('2024-01-17'),
    createdAt: new Date('2024-01-10T16:00:00'),
  },
  {
    id: 'response-2',
    quoteRequestId: 'quote-3',
    professionalId: 'pro-1',
    price: 250,
    availability: 'מחר בבוקר',
    notes: 'בדיקה מקיפה של כל הלוח',
    validUntil: new Date('2024-01-15'),
    createdAt: new Date('2024-01-08T11:00:00'),
  },
];

const mockQuestions: QuoteQuestion[] = [
  {
    id: 'q1',
    question: 'מה סוג העבודה הנדרשת?',
    type: 'select',
    options: ['תיקון תקלה', 'התקנה חדשה', 'בדיקה', 'אחר'],
    required: true,
  },
  {
    id: 'q2',
    question: 'תאר את העבודה בקצרה',
    type: 'text',
    required: true,
  },
  {
    id: 'q3',
    question: 'מתי נוח לך שנגיע?',
    type: 'multiselect',
    options: ['בוקר', 'צהריים', 'ערב', 'גמיש'],
    required: false,
  },
];

export interface QuoteFilters {
  status?: QuoteStatus;
  startDate?: Date;
  endDate?: Date;
}

// Quote API Service
export const quoteApi = {
  /**
   * Get customer's quotes
   */
  async getCustomerQuotes(
    filters?: QuoteFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<QuoteRequest>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<QuoteRequest>>(ENDPOINTS.CUSTOMER_QUOTES, {
    //   params: { ...filters, ...pagination }
    // });
    // return response.data;

    let filtered = mockQuoteRequests.filter((q) => q.customerId === 'user-1');

    if (filters?.status) {
      filtered = filtered.filter((q) => q.status === filters.status);
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  /**
   * Get professional's quote requests
   */
  async getProfessionalQuotes(
    filters?: QuoteFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<QuoteRequest>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<QuoteRequest>>(ENDPOINTS.PROFESSIONAL_QUOTES, {
    //   params: { ...filters, ...pagination }
    // });
    // return response.data;

    let filtered = mockQuoteRequests.filter((q) => q.professionalId === 'pro-1');

    if (filters?.status) {
      filtered = filtered.filter((q) => q.status === filters.status);
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  /**
   * Get quote by ID
   */
  async getById(id: string): Promise<QuoteRequest> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<QuoteRequest>(ENDPOINTS.GET_BY_ID.replace(':id', id));
    // return response.data;

    const quote = mockQuoteRequests.find((q) => q.id === id);
    if (!quote) {
      throw new Error('Quote not found');
    }
    return quote;
  },

  /**
   * Create new quote request
   */
  async create(data: QuoteRequestFormData): Promise<QuoteRequest> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<QuoteRequest>(ENDPOINTS.CREATE, data);
    // return response.data;

    const newQuote: QuoteRequest = {
      id: 'quote-' + Date.now(),
      customerId: 'user-1',
      customerName: 'ישראל כהן',
      professionalId: data.professionalId,
      professionalName: 'בעל מקצוע',
      categoryId: 'electrician',
      answers: data.answers.map((a) => ({
        questionId: a.questionId,
        question: 'שאלה',
        answer: a.answer,
      })),
      description: data.description,
      urgency: data.urgency,
      responseMethod: data.responseMethod,
      status: 'pending',
      createdAt: new Date(),
    };

    return newQuote;
  },

  /**
   * Respond to quote request (professional)
   */
  async respond(
    quoteId: string,
    response: { price: number; availability: string; notes?: string; validUntil: Date }
  ): Promise<QuoteResponse> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const apiResponse = await apiClient.post<QuoteResponse>(ENDPOINTS.RESPOND.replace(':id', quoteId), response);
    // return apiResponse.data;

    const newResponse: QuoteResponse = {
      id: 'response-' + Date.now(),
      quoteRequestId: quoteId,
      professionalId: 'pro-1',
      price: response.price,
      availability: response.availability,
      notes: response.notes,
      validUntil: response.validUntil,
      createdAt: new Date(),
    };

    return newResponse;
  },

  /**
   * Accept quote response (customer)
   */
  async accept(quoteId: string): Promise<QuoteRequest> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<QuoteRequest>(ENDPOINTS.ACCEPT.replace(':id', quoteId));
    // return response.data;

    const quote = mockQuoteRequests.find((q) => q.id === quoteId);
    if (!quote) {
      throw new Error('Quote not found');
    }
    return { ...quote, status: 'accepted' };
  },

  /**
   * Reject quote response (customer)
   */
  async reject(quoteId: string, _reason?: string): Promise<QuoteRequest> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.post<QuoteRequest>(ENDPOINTS.REJECT.replace(':id', quoteId), { reason });
    // return response.data;

    const quote = mockQuoteRequests.find((q) => q.id === quoteId);
    if (!quote) {
      throw new Error('Quote not found');
    }
    return { ...quote, status: 'rejected' };
  },

  /**
   * Cancel quote request (customer)
   */
  async cancel(_quoteId: string): Promise<void> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.post(ENDPOINTS.CANCEL.replace(':id', quoteId));
  },

  /**
   * Get quote response for a request
   */
  async getResponse(quoteId: string): Promise<QuoteResponse | null> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<QuoteResponse>(`${ENDPOINTS.GET_BY_ID.replace(':id', quoteId)}/response`);
    // return response.data;

    return mockQuoteResponses.find((r) => r.quoteRequestId === quoteId) || null;
  },

  /**
   * Get questions for category
   */
  async getQuestions(_categoryId: string): Promise<QuoteQuestion[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<QuoteQuestion[]>(ENDPOINTS.GET_QUESTIONS.replace(':categoryId', categoryId));
    // return response.data;

    return mockQuestions;
  },
};

// Export endpoints for reference
export { ENDPOINTS as QUOTE_ENDPOINTS };
