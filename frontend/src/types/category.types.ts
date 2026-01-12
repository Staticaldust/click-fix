import { QuoteQuestion } from './quote.types';

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  defaultQuestions: QuoteQuestion[];
  isActive: boolean;
  order: number;
  professionalCount: number;
}
