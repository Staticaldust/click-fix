import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Ban,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, Button, Input, Avatar, Modal, Select, PageLoader } from '../../components/common';
import { formatDate, classNames } from '../../utils/helpers';
import { adminService, AdminUser } from '../../services/admin.service';
import { CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_COLORS } from '../../utils/constants';
import { toast } from 'react-toastify';

type CustomerStatus = 'active' | 'suspended' | 'pending';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('שגיאה בטעינת המשתמשים');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === '' ||
      `${user.firstName} ${user.lastName}`.includes(searchQuery) ||
      user.email.includes(searchQuery) ||
      user.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSuspend = async () => {
    if (!selectedUser) return;
    setIsProcessing(true);
    try {
      // Suspend user - visual only for now
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, status: 'suspended' as CustomerStatus } : u
        )
      );
      toast.success(`${selectedUser.firstName} ${selectedUser.lastName} הושעה`);
      setShowSuspendModal(false);
      setSuspendReason('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to suspend:', error);
      toast.error('שגיאה בהשעיית המשתמש');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActivate = async (user: AdminUser) => {
    setIsProcessing(true);
    try {
      // Activate user - visual only for now
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, status: 'active' as CustomerStatus } : u
        )
      );
      toast.success(`${user.firstName} ${user.lastName} הופעל`);
    } catch (error) {
      console.error('Failed to activate:', error);
      toast.error('שגיאה בהפעלת המשתמש');
    } finally {
      setIsProcessing(false);
    }
  };

  const openSuspendModal = (user: AdminUser) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  const statusOptions = [
    { value: '', label: 'כל הסטטוסים' },
    { value: 'active', label: 'פעיל' },
    { value: 'suspended', label: 'מושעה' },
    { value: 'pending', label: 'ממתין' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <Users className="w-7 h-7 inline ml-2 text-primary-500" />
          ניהול משתמשים
        </h1>
        <p className="text-secondary-600">
          צפייה וניהול משתמשי המערכת
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <Input
                placeholder="חיפוש לפי שם, אימייל או טלפון..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">משתמש</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">יצירת קשר</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">סטטוס</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">הצעות מחיר</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">כניסה אחרונה</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-secondary-600">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-secondary-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={`${user.firstName} ${user.lastName}`} size="sm" />
                      <div>
                        <div className="font-medium text-secondary-800">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-secondary-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          הצטרף {formatDate(user.createdAt)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1 text-secondary-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1 text-secondary-600">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={classNames(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        CUSTOMER_STATUS_COLORS[user.status]
                      )}
                    >
                      {CUSTOMER_STATUS_LABELS[user.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-secondary-600">
                    {user.quotesCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary-500">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'מעולם לא התחבר'}
                  </td>
                  <td className="px-4 py-3">
                    {user.status === 'active' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSuspendModal(user)}
                        disabled={isProcessing}
                      >
                        <Ban className="w-4 h-4" />
                        השעה
                      </Button>
                    ) : user.status === 'suspended' ? (
                      <Button
                        size="sm"
                        onClick={() => handleActivate(user)}
                        disabled={isProcessing}
                      >
                        הפעל
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-secondary-100">
            <div className="text-sm text-secondary-500">
              מציג {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} מתוך{' '}
              {filteredUsers.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Suspend Modal */}
      <Modal
        isOpen={showSuspendModal}
        onClose={() => {
          setShowSuspendModal(false);
          setSuspendReason('');
          setSelectedUser(null);
        }}
        title="השעיית משתמש"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-secondary-600">
              האם אתה בטוח שברצונך להשעות את המשתמש{' '}
              <span className="font-medium text-secondary-800">
                {selectedUser.firstName} {selectedUser.lastName}
              </span>
              ?
            </p>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                סיבת ההשעיה
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 resize-none"
                placeholder="נא לפרט את סיבת ההשעיה..."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="danger"
                onClick={handleSuspend}
                isLoading={isProcessing}
                fullWidth
              >
                השעה משתמש
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason('');
                  setSelectedUser(null);
                }}
              >
                ביטול
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
