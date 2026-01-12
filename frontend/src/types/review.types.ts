export interface Review {
  id: string;
  professionalId: string;
  customerId: string;
  customerName: string;
  ratings: {
    reliability: number;
    service: number;
    availability: number;
    price: number;
    professionalism: number;
  };
  overallRating: number;
  content: string;
  isVerified: boolean; // had chat/quote with professional
  createdAt: Date;
  updatedAt?: Date;
  response?: {
    content: string;
    createdAt: Date;
  };
}

export interface ReviewFormData {
  ratings: {
    reliability: number;
    service: number;
    availability: number;
    price: number;
    professionalism: number;
  };
  content: string;
}
