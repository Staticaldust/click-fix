/**
 * Server Types - These match the actual API responses from the backend
 * Do not modify these to match UI - use adapters instead
 */

// ============================================
// Enums from Server
// ============================================

export type ServerFatherCategory =
  | 'חשמל ואלקטרוניקה'      // ELECTRONICS
  | 'שירותים כלליים'        // GENERAL
  | 'קוסמטיקה וטיפוח'       // COSMETICS
  | 'מבנה ואינסטלציה'       // STRUCTURE_AND_INSTALLATION
  | 'עיצוב ןאדריכלות';      // DESIGN

export type ServerArea =
  | 'צפון'           // NORTH
  | 'דרום'           // SOUTH
  | 'מרכז'           // CENTER
  | 'ירושלים'        // JERUSALEM
  | 'יהודה ושומרון'; // JUDEA_AND_SAMARIA

// ============================================
// Server Models
// ============================================

/**
 * User from server (customer)
 */
export interface ServerUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password?: string;
  address: string | null;
  lastEntrance: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations
  reviews?: ServerReview[];
}

/**
 * Employee from server (service provider / professional)
 */
export interface ServerEmployee {
  id: number;
  firstName: string;
  lastName: string;
  area: ServerArea | string | null;
  gender: string | null;
  email: string | null;
  password?: string;
  phone: string;
  lastEntrance: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations
  categories?: ServerCategory[];
  reviews?: ServerReview[];
}

/**
 * Category from server
 */
export interface ServerCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  fatherCategory: ServerFatherCategory | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Review from server
 */
export interface ServerReview {
  id: number;
  userId: number | null;
  employeeId: number | null;
  categoryId: number | null;
  priceRate: number | null;
  serviceRate: number | null;
  performanceRate: number | null;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations
  user?: ServerUser;
  employee?: ServerEmployee;
}

/**
 * Chat from server
 */
export interface ServerChat {
  id: number;
  customerId: number;
  professionalId: number;
  quoteRequestId: number | null;
  lastMessageId: number | null;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  // Relations
  customer?: ServerUser;
  professional?: ServerEmployee;
  lastMessage?: ServerMessage;
  messages?: ServerMessage[];
}

/**
 * Message from server
 */
export interface ServerMessage {
  id: number;
  chatId: number;
  senderId: number;
  senderType: 'customer' | 'professional';
  type: 'text' | 'quote' | 'image' | 'system';
  content: string;
  quoteData: any | null;
  imageUrl: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Notification from server
 */
export interface ServerNotification {
  id: number;
  userId: number;
  type: 'new_quote_request' | 'quote_response' | 'new_message' | 'new_review' | 'approval_status' | 'system';
  title: string;
  content: string;
  link: string | null;
  channels: string[];
  isRead: boolean;
  createdAt: string;
}

/**
 * Complaint from server
 */
export interface ServerComplaint {
  id: number;
  userId: number;
  type: 'professional' | 'system' | 'other';
  targetProfessionalId: number | null;
  subject: string;
  content: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  adminNotes: string | null;
  resolvedAt: string | null;
  resolvedBy: number | null;
  createdAt: string;
  updatedAt: string;
  // Relations
  user?: ServerUser;
  targetProfessional?: ServerEmployee;
  resolvedByUser?: ServerUser;
}

// ============================================
// Auth Response
// ============================================

export interface ServerAuthResponse {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface ServerLoginRequest {
  email: string;
  password: string;
}

export interface ServerRegisterRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  address?: string;
}
