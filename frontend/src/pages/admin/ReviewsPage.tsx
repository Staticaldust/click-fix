import { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle,
  XCircle,
  Flag,
  MessageSquare,
} from 'lucide-react';
import { Card, Button, Avatar, Modal, RatingStars, PageLoader } from '../../components/common';
import { formatDate, classNames } from '../../utils/helpers';
import { adminService, AdminReview } from '../../services/admin.service';
import { REVIEW_STATUS_LABELS, REVIEW_STATUS_COLORS } from '../../utils/constants';
import { toast } from 'react-toastify';

type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [filter, setFilter] = useState<ReviewStatus | 'all'>('all');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await adminService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        toast.error('שגיאה בטעינת הביקורות');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter((r) => r.status === filter);

  const handleApprove = async (review: AdminReview) => {
    setIsProcessing(true);
    try {
      console.log('Approving review:', review.id);
      // In production: await adminService.approveReview(review.id);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReviews(
        reviews.map((r) =>
          r.id === review.id ? { ...r, status: 'approved' as ReviewStatus } : r
        )
      );
    } catch (error) {
      console.error('Failed to approve:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedReview) return;
    setIsProcessing(true);
    try {
      console.log('Rejecting review:', selectedReview.id, rejectReason);
      // In production: await adminService.rejectReview(selectedReview.id, rejectReason);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReviews(
        reviews.map((r) =>
          r.id === selectedReview.id ? { ...r, status: 'rejected' as ReviewStatus } : r
        )
      );
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedReview(null);
    } catch (error) {
      console.error('Failed to reject:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const openRejectModal = (review: AdminReview) => {
    setSelectedReview(review);
    setShowRejectModal(true);
  };

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const flaggedCount = reviews.filter((r) => r.status === 'flagged').length;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <Star className="w-7 h-7 inline ml-2 text-primary-500" />
          ניהול ביקורות
          {(pendingCount > 0 || flaggedCount > 0) && (
            <span className="mr-2">
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-sm rounded-full ml-2">
                  {pendingCount} ממתינים
                </span>
              )}
              {flaggedCount > 0 && (
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-sm rounded-full">
                  {flaggedCount} מסומנים
                </span>
              )}
            </span>
          )}
        </h1>
        <p className="text-secondary-600">
          בדיקה ואישור ביקורות משתמשים
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { value: 'all', label: 'הכל' },
          { value: 'pending', label: 'ממתין' },
          { value: 'flagged', label: 'מסומן' },
          { value: 'approved', label: 'אושר' },
          { value: 'rejected', label: 'נדחה' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as ReviewStatus | 'all')}
            className={classNames(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
              filter === tab.value
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card className="text-center py-12">
          <Star className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-800 mb-2">
            אין ביקורות להצגה
          </h2>
          <p className="text-secondary-600">
            {filter === 'all' ? 'אין ביקורות במערכת' : `אין ביקורות בסטטוס "${REVIEW_STATUS_LABELS[filter as ReviewStatus]}"`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={review.customerName} size="md" />
                  <div>
                    <div className="font-medium text-secondary-800">
                      {review.customerName}
                    </div>
                    <div className="text-sm text-secondary-500">
                      על {review.professionalName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={classNames(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      REVIEW_STATUS_COLORS[review.status]
                    )}
                  >
                    {REVIEW_STATUS_LABELS[review.status]}
                  </span>
                  <span className="text-sm text-secondary-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <RatingStars rating={review.overallRating} size="md" />
              </div>

              {/* Content */}
              <p className="text-secondary-700 mb-4">{review.content}</p>

              {/* Flag Reason */}
              {review.status === 'flagged' && review.flagReason && (
                <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg mb-4">
                  <Flag className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800">סיבת הסימון:</p>
                    <p className="text-sm text-orange-700">{review.flagReason}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              {(review.status === 'pending' || review.status === 'flagged') && (
                <div className="flex gap-2 pt-4 border-t border-secondary-100">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(review)}
                    disabled={isProcessing}
                  >
                    <CheckCircle className="w-4 h-4" />
                    אשר ביקורת
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openRejectModal(review)}
                    disabled={isProcessing}
                  >
                    <XCircle className="w-4 h-4" />
                    דחה ביקורת
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                    צור קשר עם הלקוח
                  </Button>
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
          setSelectedReview(null);
        }}
        title="דחיית ביקורת"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="p-3 bg-secondary-50 rounded-lg">
              <p className="text-sm text-secondary-500">ביקורת מאת:</p>
              <p className="font-medium text-secondary-800">{selectedReview.customerName}</p>
              <p className="text-sm text-secondary-600 mt-2">"{selectedReview.content}"</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                סיבת הדחייה <span className="text-error">*</span>
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 resize-none"
                placeholder="נא לפרט את סיבת דחיית הביקורת..."
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
                דחה ביקורת
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                  setSelectedReview(null);
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
