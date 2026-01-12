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
