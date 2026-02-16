export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

export const MAX_FILE_SIZE = Number(import.meta.env.VITE_MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = (import.meta.env.VITE_ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp').split(',');
export const ALLOWED_DOC_TYPES = (import.meta.env.VITE_ALLOWED_DOC_TYPES || 'application/pdf,image/jpeg,image/png').split(',');

export const DAYS_OF_WEEK = [
  { value: 'sunday', label: 'ראשון' },
  { value: 'monday', label: 'שני' },
  { value: 'tuesday', label: 'שלישי' },
  { value: 'wednesday', label: 'רביעי' },
  { value: 'thursday', label: 'חמישי' },
  { value: 'friday', label: 'שישי' },
  { value: 'saturday', label: 'שבת' },
] as const;

export const URGENCY_LEVELS = [
  { value: 'low', label: 'נמוכה', color: 'text-green-600' },
  { value: 'medium', label: 'בינונית', color: 'text-yellow-600' },
  { value: 'high', label: 'גבוהה', color: 'text-red-600' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'גבר' },
  { value: 'female', label: 'אישה' },
  { value: 'other', label: 'אחר' },
] as const;

export const ISRAELI_CITIES = [
  'ירושלים',
  'תל אביב',
  'חיפה',
  'ראשון לציון',
  'פתח תקווה',
  'אשדוד',
  'נתניה',
  'באר שבע',
  'בני ברק',
  'חולון',
  'רמת גן',
  'אשקלון',
  'רחובות',
  'בת ים',
  'הרצליה',
  'כפר סבא',
  'חדרה',
  'מודיעין',
  'לוד',
  'רעננה',
  'רמלה',
  'נהריה',
  'גבעתיים',
  'הוד השרון',
  'עכו',
  'אילת',
  'צפת',
  'טבריה',
  'קריית גת',
  'אופקים',
  'ביתר עילית',
  'מודיעין עילית',
  'אלעד',
];

export const RATING_LABELS = {
  reliability: 'אמינות',
  service: 'שירות',
  availability: 'זמינות',
  price: 'מחיר',
  professionalism: 'מקצועיות',
} as const;

export const USER_STATUS_LABELS = {
  active: 'פעיל',
  pending: 'ממתין',
  blocked: 'חסום',
} as const;

export const PROFESSIONAL_STATUS_LABELS = {
  pending: 'ממתין לאישור',
  approved: 'מאושר',
  rejected: 'נדחה',
  suspended: 'מושעה',
} as const;

export const QUOTE_STATUS_LABELS = {
  pending: 'ממתין לתגובה',
  responded: 'התקבלה תגובה',
  accepted: 'התקבל',
  rejected: 'נדחה',
  expired: 'פג תוקף',
} as const;

export const COMPLAINT_STATUS_LABELS = {
  open: 'פתוח',
  in_progress: 'בטיפול',
  resolved: 'נפתר',
  closed: 'סגור',
} as const;

// === Color mappings for status/urgency badges ===

export const QUOTE_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-green-100 text-green-700',
  accepted: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-gray-100 text-gray-700',
};

export const URGENCY_COLORS: Record<string, string> = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export const URGENCY_BG_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export const URGENCY_LABELS: Record<string, string> = {
  low: 'רגיל',
  medium: 'בינוני',
  high: 'דחוף',
};

export const REVIEW_STATUS_LABELS: Record<string, string> = {
  pending: 'ממתין לבדיקה',
  approved: 'אושר',
  rejected: 'נדחה',
  flagged: 'מסומן',
};

export const REVIEW_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  flagged: 'bg-orange-100 text-orange-700',
};

export const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  active: 'פעיל',
  suspended: 'מושעה',
  pending: 'ממתין',
};

export const CUSTOMER_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  suspended: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

export const CATEGORIES = [
  { id: 'electrician', name: 'חשמלאי', icon: 'Zap' },
  { id: 'plumber', name: 'אינסטלטור', icon: 'Droplet' },
  { id: 'computer', name: 'טכנאי מחשבים', icon: 'Monitor' },
  { id: 'ac', name: 'מיזוג אוויר', icon: 'Wind' },
  { id: 'locksmith', name: 'מנעולן', icon: 'Key' },
  { id: 'painter', name: 'צבעי', icon: 'Paintbrush' },
  { id: 'carpenter', name: 'נגר', icon: 'Hammer' },
  { id: 'gardener', name: 'גנן', icon: 'TreeDeciduous' },
  { id: 'mover', name: 'מוביל', icon: 'Truck' },
  { id: 'mechanic', name: 'מכונאי', icon: 'Wrench' },
  { id: 'cleaner', name: 'ניקיון', icon: 'Sparkles' },
  { id: 'appliances', name: 'מכשירי חשמל', icon: 'Microwave' },
] as const;
