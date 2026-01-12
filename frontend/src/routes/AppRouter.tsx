import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { MainLayout, ProtectedRoute } from '../components/layout';
import { PageLoader } from '../components/common';
import { useAuthStore } from '../store/authStore';

// Public Pages
const HomePage = lazy(() => import('../pages/public/HomePage'));
const SearchPage = lazy(() => import('../pages/public/SearchPage'));
const ProfessionalProfilePage = lazy(() => import('../pages/public/ProfessionalProfilePage'));
const LoginPage = lazy(() => import('../pages/public/LoginPage'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

// Customer Pages
const CustomerDashboard = lazy(() => import('../pages/customer/CustomerDashboard'));
const FavoritesPage = lazy(() => import('../pages/customer/FavoritesPage'));
const QuotesPage = lazy(() => import('../pages/customer/QuotesPage'));
const QuoteRequestPage = lazy(() => import('../pages/customer/QuoteRequestPage'));
const SettingsPage = lazy(() => import('../pages/customer/SettingsPage'));

// Professional Pages
const ProfessionalRegisterPage = lazy(() => import('../pages/professional/ProfessionalRegisterPage'));
const ProfessionalDashboard = lazy(() => import('../pages/professional/ProfessionalDashboard'));
const ProfessionalProfileEdit = lazy(() => import('../pages/professional/ProfessionalProfileEdit'));
const IncomingRequestsPage = lazy(() => import('../pages/professional/IncomingRequestsPage'));
const ProfessionalSettingsPage = lazy(() => import('../pages/professional/ProfessionalSettingsPage'));
const ChatsPage = lazy(() => import('../pages/professional/ChatsPage'));
const StatisticsPage = lazy(() => import('../pages/professional/StatisticsPage'));

// Admin Pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ApprovalsPage = lazy(() => import('../pages/admin/ApprovalsPage'));
const UsersPage = lazy(() => import('../pages/admin/UsersPage'));
const ReviewsPage = lazy(() => import('../pages/admin/ReviewsPage'));
const CategoriesPage = lazy(() => import('../pages/admin/CategoriesPage'));

function AppContent() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:category" element={<SearchPage />} />
          <Route path="/professional/:id" element={<ProfessionalProfilePage />} />
        </Route>

        {/* Auth routes without main layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/quotes/:id" element={<QuotesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Quote request route (needs auth but accessible from professional page) */}
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route element={<MainLayout />}>
            <Route path="/professional/:id/quote" element={<QuoteRequestPage />} />
          </Route>
        </Route>

        {/* Professional registration (public) */}
        <Route element={<MainLayout />}>
          <Route path="/pro/register" element={<ProfessionalRegisterPage />} />
        </Route>

        {/* Professional protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['professional']} />}>
          <Route element={<MainLayout />}>
            <Route path="/pro/dashboard" element={<ProfessionalDashboard />} />
            <Route path="/pro/profile/edit" element={<ProfessionalProfileEdit />} />
            <Route path="/pro/requests" element={<IncomingRequestsPage />} />
            <Route path="/pro/chats" element={<ChatsPage />} />
            <Route path="/pro/chats/:id" element={<ChatsPage />} />
            <Route path="/pro/statistics" element={<StatisticsPage />} />
            <Route path="/pro/settings" element={<ProfessionalSettingsPage />} />
          </Route>
        </Route>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/approvals" element={<ApprovalsPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/professionals" element={<UsersPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/reviews" element={<ReviewsPage />} />
            <Route path="/admin/complaints" element={<ReviewsPage />} />
          </Route>
        </Route>

        {/* 404 with layout */}
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
