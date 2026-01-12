export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface SearchParams {
  query?: string;
  category?: string;
  city?: string;
  gender?: 'male' | 'female';
  minRating?: number;
  maxPrice?: number;
  available?: 'today' | 'week';
  sort?: 'rating' | 'price' | 'distance' | 'relevance';
  page?: number;
  limit?: number;
}
