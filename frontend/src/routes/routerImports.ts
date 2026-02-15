import { lazy } from 'react';

// Public Pages
export const HomePage = lazy(() => import('../pages/public/HomePage'));
export const SearchPage = lazy(() => import('../pages/public/SearchPage'));
export const ProfessionalProfilePage = lazy(
  () => import('../pages/public/ProfessionalProfilePage'),
);
export const LoginPage = lazy(() => import('../pages/public/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/public/RegisterPage'));
export const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

// Customer Pages
export const CustomerDashboard = lazy(
  () => import('../pages/customer/CustomerDashboard'),
);
export const FavoritesPage = lazy(
  () => import('../pages/customer/FavoritesPage'),
);
export const QuotesPage = lazy(() => import('../pages/customer/QuotesPage'));
export const QuoteRequestPage = lazy(
  () => import('../pages/customer/QuoteRequestPage'),
);
export const SettingsPage = lazy(
  () => import('../pages/customer/SettingsPage'),
);

// Professional Pages
export const ProfessionalRegisterPage = lazy(
  () => import('../pages/professional/ProfessionalRegisterPage'),
);
export const ProfessionalDashboard = lazy(
  () => import('../pages/professional/ProfessionalDashboard'),
);
export const ProfessionalProfileEdit = lazy(
  () => import('../pages/professional/ProfessionalProfileEdit'),
);
export const IncomingRequestsPage = lazy(
  () => import('../pages/professional/IncomingRequestsPage'),
);
export const ProfessionalSettingsPage = lazy(
  () => import('../pages/professional/ProfessionalSettingsPage'),
);
export const ChatsPage = lazy(() => import('../pages/professional/ChatsPage'));
export const StatisticsPage = lazy(
  () => import('../pages/professional/StatisticsPage'),
);

// Admin Pages
export const AdminDashboard = lazy(
  () => import('../pages/admin/AdminDashboard'),
);
export const ApprovalsPage = lazy(() => import('../pages/admin/ApprovalsPage'));
export const UsersPage = lazy(() => import('../pages/admin/UsersPage'));
export const ReviewsPage = lazy(() => import('../pages/admin/ReviewsPage'));
export const CategoriesPage = lazy(
  () => import('../pages/admin/CategoriesPage'),
);
