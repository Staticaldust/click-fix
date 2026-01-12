import type { QuoteRequest, QuoteResponse, QuoteQuestion } from '../../types/quote.types';

export const mockQuoteRequests: QuoteRequest[] = [
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

export const mockQuoteResponses: QuoteResponse[] = [
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

export const mockQuoteQuestions: QuoteQuestion[] = [
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
