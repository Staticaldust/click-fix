import { simulateDelay, PaginatedResponse, PaginationParams } from './client';
import { mockProfessionals, mockProfessionalStats } from './mock';
import type {
  Professional,
  ProfessionalStats,
  ProfessionalRegisterData,
  WorkingHours,
  ServicePrice,
} from '../types/professional.types';

// API Endpoints (for when server is ready)
const ENDPOINTS = {
  LIST: '/professionals',
  GET_BY_ID: '/professionals/:id',
  SEARCH: '/professionals/search',
  REGISTER: '/professionals/register',
  UPDATE_PROFILE: '/professionals/profile',
  UPLOAD_CERTIFICATE: '/professionals/certificates',
  DELETE_CERTIFICATE: '/professionals/certificates/:id',
  STATS: '/professionals/stats',
  UPDATE_WORKING_HOURS: '/professionals/working-hours',
  UPDATE_SERVICES: '/professionals/services',
  BY_CATEGORY: '/professionals/category/:categoryId',
};

export interface SearchFilters {
  categoryId?: string;
  city?: string;
  minRating?: number;
  verified?: boolean;
  query?: string;
}

// Professional API Service
export const professionalApi = {
  /**
   * Get paginated list of professionals
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Professional>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Professional>>(ENDPOINTS.LIST, { params });
    // return response.data;

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = mockProfessionals.slice(start, start + limit);

    return {
      data: paginatedData,
      total: mockProfessionals.length,
      page,
      limit,
      totalPages: Math.ceil(mockProfessionals.length / limit),
    };
  },

  /**
   * Get professional by ID
   */
  async getById(id: string): Promise<Professional> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<Professional>(ENDPOINTS.GET_BY_ID.replace(':id', id));
    // return response.data;

    const professional = mockProfessionals.find((p) => p.id === id);
    if (!professional) {
      throw new Error('Professional not found');
    }
    return professional;
  },

  /**
   * Search professionals with filters
   */
  async search(filters: SearchFilters, pagination?: PaginationParams): Promise<PaginatedResponse<Professional>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Professional>>(ENDPOINTS.SEARCH, {
    //   params: { ...filters, ...pagination }
    // });
    // return response.data;

    let filtered = [...mockProfessionals];

    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    }
    if (filters.city) {
      filtered = filtered.filter((p) => p.serviceAreas.includes(filters.city!));
    }
    if (filters.minRating) {
      filtered = filtered.filter((p) => p.rating.overall >= filters.minRating!);
    }
    if (filters.verified !== undefined) {
      filtered = filtered.filter((p) => p.isVerified === filters.verified);
    }
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.firstName.toLowerCase().includes(query) ||
          p.lastName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
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
   * Get professionals by category
   */
  async getByCategory(categoryId: string, pagination?: PaginationParams): Promise<PaginatedResponse<Professional>> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<PaginatedResponse<Professional>>(
    //   ENDPOINTS.BY_CATEGORY.replace(':categoryId', categoryId),
    //   { params: pagination }
    // );
    // return response.data;

    return this.search({ categoryId }, pagination);
  },

  /**
   * Register as professional
   */
  async register(data: ProfessionalRegisterData): Promise<Professional> {
    await simulateDelay(1000);

    // TODO: Replace with actual API call when server is ready
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   if (key === 'certificates') {
    //     data.certificates.forEach((cert, i) => {
    //       formData.append(`certificates[${i}].name`, cert.name);
    //       formData.append(`certificates[${i}].file`, cert.file);
    //     });
    //   } else {
    //     formData.append(key, JSON.stringify(value));
    //   }
    // });
    // const response = await apiClient.post<Professional>(ENDPOINTS.REGISTER, formData);
    // return response.data;

    const newProfessional: Professional = {
      id: 'pro-' + Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: 'professional',
      status: 'pending',
      categoryId: data.categoryId,
      categoryName: 'קטגוריה חדשה',
      description: data.description || '',
      yearsOfExperience: data.yearsOfExperience,
      serviceAreas: data.serviceAreas,
      workingHours: data.workingHours,
      services: data.services.map((s, i) => ({ ...s, id: `service-${i}` })),
      certificates: [],
      rating: {
        overall: 0,
        reliability: 0,
        service: 0,
        availability: 0,
        price: 0,
        professionalism: 0,
      },
      reviewCount: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newProfessional;
  },

  /**
   * Update professional profile
   */
  async updateProfile(data: Partial<Professional>): Promise<Professional> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.patch<Professional>(ENDPOINTS.UPDATE_PROFILE, data);
    // return response.data;

    const professional = mockProfessionals[0];
    return { ...professional, ...data, updatedAt: new Date() };
  },

  /**
   * Upload certificate
   */
  async uploadCertificate(_name: string, _file: File): Promise<{ id: string; url: string }> {
    await simulateDelay(1000);

    // TODO: Replace with actual API call when server is ready
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('file', file);
    // const response = await apiClient.post(ENDPOINTS.UPLOAD_CERTIFICATE, formData);
    // return response.data;

    return {
      id: 'cert-' + Date.now(),
      url: '/certificates/new-cert.pdf',
    };
  },

  /**
   * Delete certificate
   */
  async deleteCertificate(_certificateId: string): Promise<void> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // await apiClient.delete(ENDPOINTS.DELETE_CERTIFICATE.replace(':id', certificateId));
  },

  /**
   * Get professional statistics
   */
  async getStats(): Promise<ProfessionalStats> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.get<ProfessionalStats>(ENDPOINTS.STATS);
    // return response.data;

    return mockProfessionalStats;
  },

  /**
   * Update working hours
   */
  async updateWorkingHours(hours: WorkingHours[]): Promise<WorkingHours[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.patch(ENDPOINTS.UPDATE_WORKING_HOURS, { workingHours: hours });
    // return response.data;

    return hours;
  },

  /**
   * Update services
   */
  async updateServices(services: ServicePrice[]): Promise<ServicePrice[]> {
    await simulateDelay();

    // TODO: Replace with actual API call when server is ready
    // const response = await apiClient.patch(ENDPOINTS.UPDATE_SERVICES, { services });
    // return response.data;

    return services;
  },
};

// Export endpoints for reference
export { ENDPOINTS as PROFESSIONAL_ENDPOINTS };
