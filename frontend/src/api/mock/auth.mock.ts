import type { User } from '../../types/user.types';

export const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  firstName: 'ישראל',
  lastName: 'כהן',
  phone: '050-1234567',
  city: 'ירושלים',
  role: 'customer',
  status: 'active',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

export const mockProfessionalUser: User = {
  id: 'pro-1',
  email: 'pro@example.com',
  firstName: 'משה',
  lastName: 'לוי',
  phone: '050-9876543',
  city: 'בני ברק',
  role: 'professional',
  status: 'active',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

export const mockAdminUser: User = {
  id: 'admin-1',
  email: 'admin@example.com',
  firstName: 'אברהם',
  lastName: 'גולד',
  phone: '050-5555555',
  city: 'תל אביב',
  role: 'admin',
  status: 'active',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};
