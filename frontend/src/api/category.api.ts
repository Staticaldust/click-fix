import { simulateDelay } from './client';
import type { Category } from '../types/category.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  LIST: '/categories',
  GET_BY_ID: '/categories/:id',
  POPULAR: '/categories/popular',
};

// Mock data
const mockCategories: Category[] = [
  {
    id: 'electrician',
    name: 'חשמלאי',
    icon: 'Zap',
    description: 'עבודות חשמל, תיקונים והתקנות',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'מה סוג העבודה הנדרשת?',
        type: 'select',
        options: ['תיקון תקלה', 'התקנה חדשה', 'בדיקה', 'שדרוג מערכת'],
        required: true,
      },
      {
        id: 'q2',
        question: 'תאר את העבודה בקצרה',
        type: 'text',
        required: true,
      },
    ],
    isActive: true,
    order: 1,
    professionalCount: 45,
  },
  {
    id: 'plumber',
    name: 'אינסטלטור',
    icon: 'Droplet',
    description: 'עבודות אינסטלציה ותיקוני צנרת',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'מה סוג הבעיה?',
        type: 'select',
        options: ['סתימה', 'נזילה', 'התקנה', 'תחזוקה'],
        required: true,
      },
      {
        id: 'q2',
        question: 'היכן הבעיה?',
        type: 'select',
        options: ['מטבח', 'אמבטיה', 'שירותים', 'חצר', 'אחר'],
        required: true,
      },
    ],
    isActive: true,
    order: 2,
    professionalCount: 38,
  },
  {
    id: 'ac',
    name: 'מזגנים',
    icon: 'Wind',
    description: 'התקנה, תיקון ותחזוקת מזגנים',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'מה השירות הנדרש?',
        type: 'select',
        options: ['התקנה', 'תיקון', 'ניקוי', 'מילוי גז'],
        required: true,
      },
      {
        id: 'q2',
        question: 'סוג המזגן',
        type: 'select',
        options: ['מיני מרכזי', 'עילי', 'מרכזי', 'לא יודע'],
        required: true,
      },
    ],
    isActive: true,
    order: 3,
    professionalCount: 28,
  },
  {
    id: 'painter',
    name: 'צבעי',
    icon: 'Paintbrush',
    description: 'צביעה פנימית וחיצונית',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'סוג העבודה',
        type: 'select',
        options: ['צביעה פנימית', 'צביעה חיצונית', 'תיקון טיח'],
        required: true,
      },
      {
        id: 'q2',
        question: 'גודל השטח בערך (מ"ר)',
        type: 'number',
        required: true,
      },
    ],
    isActive: true,
    order: 4,
    professionalCount: 35,
  },
  {
    id: 'locksmith',
    name: 'מנעולן',
    icon: 'Key',
    description: 'פתיחת דלתות, התקנה והחלפת מנעולים',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'מה נדרש?',
        type: 'select',
        options: ['פתיחת דלת', 'החלפת מנעול', 'שכפול מפתחות', 'התקנת מנעול חדש'],
        required: true,
      },
    ],
    isActive: true,
    order: 5,
    professionalCount: 22,
  },
  {
    id: 'carpenter',
    name: 'נגר',
    icon: 'Hammer',
    description: 'עבודות עץ ונגרות',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'סוג העבודה',
        type: 'select',
        options: ['ריהוט בהזמנה', 'תיקון ריהוט', 'מטבח', 'ארון', 'אחר'],
        required: true,
      },
    ],
    isActive: true,
    order: 6,
    professionalCount: 18,
  },
  {
    id: 'cleaning',
    name: 'ניקיון',
    icon: 'Sparkles',
    description: 'שירותי ניקיון לבית ולעסק',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'סוג הניקיון',
        type: 'select',
        options: ['ניקיון שוטף', 'ניקיון יסודי', 'ניקיון אחרי שיפוץ', 'ניקיון משרדים'],
        required: true,
      },
      {
        id: 'q2',
        question: 'תדירות',
        type: 'select',
        options: ['חד פעמי', 'שבועי', 'דו-שבועי', 'חודשי'],
        required: true,
      },
    ],
    isActive: true,
    order: 7,
    professionalCount: 42,
  },
  {
    id: 'moving',
    name: 'הובלות',
    icon: 'Truck',
    description: 'שירותי הובלה ומעבר דירה',
    defaultQuestions: [
      {
        id: 'q1',
        question: 'סוג ההובלה',
        type: 'select',
        options: ['מעבר דירה', 'הובלת פריטים בודדים', 'הובלת משרד'],
        required: true,
      },
      {
        id: 'q2',
        question: 'מוצא',
        type: 'text',
        required: true,
      },
      {
        id: 'q3',
        question: 'יעד',
        type: 'text',
        required: true,
      },
    ],
    isActive: true,
    order: 8,
    professionalCount: 25,
  },
];

// Category API Service
export const categoryApi = {
  /**
   * Get all active categories
   */
  async getAll(): Promise<Category[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Category[]>(ENDPOINTS.LIST);
    // return response.data;

    return mockCategories.filter((c) => c.isActive).sort((a, b) => a.order - b.order);
  },

  /**
   * Get category by ID
   */
  async getById(id: string): Promise<Category> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Category>(ENDPOINTS.GET_BY_ID.replace(':id', id));
    // return response.data;

    const category = mockCategories.find((c) => c.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  },

  /**
   * Get popular categories
   */
  async getPopular(limit: number = 6): Promise<Category[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Category[]>(ENDPOINTS.POPULAR, { params: { limit } });
    // return response.data;

    return mockCategories
      .filter((c) => c.isActive)
      .sort((a, b) => b.professionalCount - a.professionalCount)
      .slice(0, limit);
  },

  /**
   * Get category by slug/name
   */
  async getBySlug(slug: string): Promise<Category | null> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Category>(`${ENDPOINTS.LIST}/slug/${slug}`);
    // return response.data;

    return mockCategories.find((c) => c.id === slug || c.name === slug) || null;
  },
};

// Export endpoints for reference
export { ENDPOINTS as CATEGORY_ENDPOINTS };
