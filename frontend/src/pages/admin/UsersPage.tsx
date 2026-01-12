import { useState } from 'react';
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
import { Card, Button, Input, Avatar, Modal, Select } from '../../components/common';
import { formatDate, classNames } from '../../utils/helpers';
import type { User } from '../../types/user.types';

type CustomerStatus = 'active' | 'suspended' | 'pending';

interface CustomerUser extends Omit<User, 'status'> {
  status: CustomerStatus;
  lastLogin?: Date;
  quotesCount: number;
}

const mockUsers: CustomerUser[] = [
  {
    id: '1',
    email: 'israel@example.com',
    firstName: 'ישראל',
    lastName: 'כהן',
    phone: '050-1234567',
    role: 'customer',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-12'),
    quotesCount: 5,
  },
  {
    id: '2',
    email: 'rachel@example.com',
    firstName: 'רחל',
    lastName: 'לוי',
    phone: '052-9876543',
    role: 'customer',
    status: 'active',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15'),
    lastLogin: new Date('2024-01-11'),
    quotesCount: 12,
  },
  {
    id: '3',
    email: 'david@example.com',
    firstName: 'דוד',
    lastName: 'גולד',
    phone: '054-5555555',
    role: 'customer',
    status: 'suspended',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20'),
    quotesCount: 3,
  },
  {
    id: '4',
    email: 'sarah@example.com',
    firstName: 'שרה',
    lastName: 'אברהם',
    phone: '053-1111111',
    role: 'customer',
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    lastLogin: new Date('2024-01-10'),
    quotesCount: 1,
  },
];

const statusLabels: Record<CustomerStatus, string> = {
  active: 'פעיל',
  suspended: 'מושעה',
  pending: 'ממתין',
};

const statusColors: Record<CustomerStatus, string> = {
  active: 'bg-green-100 text-green-700',
  suspended: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

export default function UsersPage() {
  const [users, setUsers] = useState<CustomerUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<CustomerUser | null>(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      console.log('Suspending user:', selectedUser.id, suspendReason);
      // In production: await adminService.suspendUser(selectedUser.id, suspendReason);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, status: 'suspended' as CustomerStatus } : u
        )
      );
      setShowSuspendModal(false);
      setSuspendReason('');
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to suspend:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActivate = async (user: CustomerUser) => {
    setIsProcessing(true);
    try {
      console.log('Activating user:', user.id);
      // In production: await adminService.activateUser(user.id);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, status: 'active' as CustomerStatus } : u
        )
      );
    } catch (error) {
      console.error('Failed to activate:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const openSuspendModal = (user: CustomerUser) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
  };

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
                        statusColors[user.status]
                      )}
                    >
                      {statusLabels[user.status]}
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
