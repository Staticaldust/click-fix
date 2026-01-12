import { User } from './user.types';

export type ProfessionalStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface WorkingHours {
  day: DayOfWeek;
  isWorking: boolean;
  startTime?: string; // "09:00"
  endTime?: string;   // "17:00"
}

export interface ServicePrice {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  description?: string;
}

export interface Certificate {
  id: string;
  name: string;
  fileUrl: string;
  fileType: 'image' | 'pdf';
  uploadedAt: Date;
}

export interface RatingBreakdown {
  overall: number;
  reliability: number;    // אמינות
  service: number;        // שירות
  availability: number;   // זמינות
  price: number;          // מחיר
  professionalism: number;// מקצועיות
}

export interface Professional extends Omit<User, 'status'> {
  role: 'professional';
  status: ProfessionalStatus;
  categoryId: string;
  categoryName: string;
  description: string;
  yearsOfExperience?: number;
  serviceAreas: string[]; // city names
  workingHours: WorkingHours[];
  services: ServicePrice[];
  certificates: Certificate[];
  profileImage?: string;
  rating: RatingBreakdown;
  reviewCount: number;
  isVerified: boolean;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface ProfessionalStats {
  profileViews: {
    today: number;
    week: number;
    month: number;
  };
  requests: {
    new: number;
    inProgress: number;
    completed: number;
  };
  conversionRate: number;
}

export interface ProfessionalRegisterData {
  // Personal details (Step 1)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  // Professional details (Step 2)
  categoryId: string;
  yearsOfExperience?: number;
  description?: string;
  serviceAreas: string[];

  // Certificates (Step 3)
  certificates: Array<{
    name: string;
    file: File;
  }>;

  // Pricing and hours (Step 4)
  workingHours: WorkingHours[];
  services: Omit<ServicePrice, 'id'>[];

  // Terms (Step 5)
  acceptTerms: boolean;
}
