import { useState, useEffect } from 'react';
import {
  UserCheck,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, Button, Avatar, Modal, PageLoader } from '../../components/common';
import { formatDate } from '../../utils/helpers';
import { adminService, PendingProfessional } from '../../services/admin.service';
import { toast } from 'react-toastify';

export default function ApprovalsPage() {
  const [professionals, setProfessionals] = useState<PendingProfessional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<PendingProfessional | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        const data = await adminService.getPendingApprovals();
        setProfessionals(data);
      } catch (error) {
        console.error('Failed to fetch pending approvals:', error);
        toast.error('שגיאה בטעינת בקשות הממתינות לאישור');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingApprovals();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApprove = async (professional: PendingProfessional) => {
    setIsProcessing(true);
    try {
      await adminService.approveProfessional(professional.id);
      setProfessionals(professionals.filter((p) => p.id !== professional.id));
      toast.success(`${professional.firstName} ${professional.lastName} אושר בהצלחה!`);
    } catch (error) {
      console.error('Failed to approve:', error);
      toast.error('שגיאה באישור בעל המקצוע');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedProfessional || !rejectReason) return;
    setIsProcessing(true);
    try {
      await adminService.rejectProfessional(selectedProfessional.id, rejectReason);
      setProfessionals(professionals.filter((p) => p.id !== selectedProfessional.id));
      toast.success(`הבקשה של ${selectedProfessional.firstName} ${selectedProfessional.lastName} נדחתה`);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedProfessional(null);
    } catch (error) {
      console.error('Failed to reject:', error);
      toast.error('שגיאה בדחיית בעל המקצוע');
    } finally {
      setIsProcessing(false);
    }
  };

  const openRejectModal = (professional: PendingProfessional) => {
    setSelectedProfessional(professional);
    setShowRejectModal(true);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <UserCheck className="w-7 h-7 inline ml-2 text-primary-500" />
          אישור בעלי מקצוע
          {professionals.length > 0 && (
            <span className="mr-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-sm rounded-full">
              {professionals.length} ממתינים
            </span>
          )}
        </h1>
        <p className="text-secondary-600">
          בדקו ואשרו בקשות הצטרפות של בעלי מקצוע חדשים
        </p>
      </div>

      {professionals.length === 0 ? (
        <Card className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-800 mb-2">
            אין בקשות ממתינות
          </h2>
          <p className="text-secondary-600">
            כל הבקשות טופלו. בקשות חדשות יופיעו כאן.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {professionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden">
              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar
                  name={`${professional.firstName} ${professional.lastName}`}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-secondary-800">
                      {professional.firstName} {professional.lastName}
                    </h3>
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-sm rounded-full">
                      {professional.categoryName}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-secondary-500 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(professional.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {professional.serviceAreas.slice(0, 2).join(', ')}
                      {professional.serviceAreas.length > 2 && ` +${professional.serviceAreas.length - 2}`}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(professional)}
                    disabled={isProcessing}
                  >
                    <CheckCircle className="w-4 h-4" />
                    אשר
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openRejectModal(professional)}
                    disabled={isProcessing}
                  >
                    <XCircle className="w-4 h-4" />
                    דחה
                  </Button>
                </div>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => toggleExpand(professional.id)}
                className="w-full mt-4 pt-4 border-t border-secondary-100 flex items-center justify-center gap-2 text-sm text-secondary-500 hover:text-primary-600"
              >
                <Eye className="w-4 h-4" />
                {expandedId === professional.id ? 'הסתר פרטים' : 'הצג פרטים'}
                {expandedId === professional.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Expanded Details */}
              {expandedId === professional.id && (
                <div className="mt-4 pt-4 border-t border-secondary-100 space-y-4">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-secondary-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${professional.email}`} className="hover:text-primary-600">
                        {professional.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-600">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${professional.phone}`} className="hover:text-primary-600">
                        {professional.phone}
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-medium text-secondary-700 mb-1">תיאור:</h4>
                    <p className="text-secondary-600">{professional.description}</p>
                  </div>

                  {/* Experience & Areas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-secondary-700 mb-1">שנות ניסיון:</h4>
                      <p className="text-secondary-600">{professional.yearsOfExperience} שנים</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-secondary-700 mb-1">אזורי שירות:</h4>
                      <p className="text-secondary-600">{professional.serviceAreas.join(', ')}</p>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div>
                    <h4 className="text-sm font-medium text-secondary-700 mb-2">תעודות והסמכות:</h4>
                    {professional.certificates.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {professional.certificates.map((cert, index) => (
                          <a
                            key={index}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-secondary-100 rounded-lg text-sm text-secondary-700 hover:bg-secondary-200"
                          >
                            <FileText className="w-4 h-4" />
                            {cert.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary-500 text-sm">לא הועלו תעודות</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setRejectReason('');
          setSelectedProfessional(null);
        }}
        title="דחיית בקשה"
      >
        {selectedProfessional && (
          <div className="space-y-4">
            <p className="text-secondary-600">
              האם אתה בטוח שברצונך לדחות את הבקשה של{' '}
              <span className="font-medium text-secondary-800">
                {selectedProfessional.firstName} {selectedProfessional.lastName}
              </span>
              ?
            </p>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                סיבת הדחייה <span className="text-error">*</span>
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 resize-none"
                placeholder="נא לפרט את סיבת הדחייה..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="danger"
                onClick={handleReject}
                isLoading={isProcessing}
                disabled={!rejectReason}
                fullWidth
              >
                דחה בקשה
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                  setSelectedProfessional(null);
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
