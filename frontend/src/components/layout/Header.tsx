import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Search, Heart, Settings, FileText, MessageSquare, BarChart3, Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'professional':
        return '/pro/dashboard';
      case 'admin':
        return '/admin';
      default:
        return '/dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">אנשי שלומנו</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/search"
              className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <Search className="w-4 h-4" />
              חיפוש
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  {user?.firstName || 'החשבון שלי'}
                </Link>

                {user?.role === 'customer' && (
                  <>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      מועדפים
                    </Link>
                    <Link
                      to="/quotes"
                      className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      הצעות מחיר
                    </Link>
                  </>
                )}

                {user?.role === 'professional' && (
                  <>
                    <Link
                      to="/pro/requests"
                      className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      בקשות
                    </Link>
                    <Link
                      to="/pro/chats"
                      className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      הודעות
                    </Link>
                  </>
                )}

                {user?.role === 'admin' && (
                  <>
                    <Link
                      to="/admin/approvals"
                      className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <Briefcase className="w-4 h-4" />
                      אישורים
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-secondary-600 hover:text-error transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  התנתקות
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    התחברות
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">הרשמה</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-secondary-600 hover:text-secondary-800"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-secondary-200">
            <div className="flex flex-col gap-2">
              <Link
                to="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
              >
                <Search className="w-5 h-5" />
                חיפוש
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                  >
                    <User className="w-5 h-5" />
                    {user?.firstName || 'החשבון שלי'}
                  </Link>

                  {user?.role === 'customer' && (
                    <>
                      <Link
                        to="/favorites"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                      >
                        <Heart className="w-5 h-5" />
                        מועדפים
                      </Link>
                      <Link
                        to="/quotes"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                      >
                        <FileText className="w-5 h-5" />
                        הצעות מחיר
                      </Link>
                    </>
                  )}

                  {user?.role === 'professional' && (
                    <>
                      <Link
                        to="/pro/requests"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                      >
                        <FileText className="w-5 h-5" />
                        בקשות
                      </Link>
                      <Link
                        to="/pro/chats"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                      >
                        <MessageSquare className="w-5 h-5" />
                        הודעות
                      </Link>
                      <Link
                        to="/pro/statistics"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                      >
                        <BarChart3 className="w-5 h-5" />
                        סטטיסטיקות
                      </Link>
                    </>
                  )}

                  {user?.role === 'admin' && (
                    <>
                      <Link
                        to="/admin/approvals"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                      >
                        <Briefcase className="w-5 h-5" />
                        אישורים
                      </Link>
                    </>
                  )}

                  <Link
                    to={user?.role === 'professional' ? '/pro/settings' : user?.role === 'admin' ? '/admin' : '/settings'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                  >
                    <Settings className="w-5 h-5" />
                    הגדרות
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-error hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    התנתקות
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-secondary-600 hover:bg-secondary-50 rounded-lg"
                  >
                    התחברות
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-primary-600 bg-primary-50 rounded-lg"
                  >
                    הרשמה
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
