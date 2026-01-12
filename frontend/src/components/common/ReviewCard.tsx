import { useState } from 'react';
import { ThumbsUp, Flag, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { classNames, formatDate } from '../../utils/helpers';
import { Avatar } from './Avatar';
import { RatingStars } from './RatingStars';
import { Button } from './Button';
import type { Review } from '../../types/review.types';
import { RATING_LABELS } from '../../utils/constants';

interface ReviewCardProps {
  review: Review;
  showDetailedRating?: boolean;
  onReport?: (reviewId: string) => void;
  onHelpful?: (reviewId: string) => void;
  helpfulCount?: number;
  className?: string;
}

export function ReviewCard({
  review,
  showDetailedRating = false,
  onReport,
  onHelpful,
  helpfulCount = 0,
  className,
}: ReviewCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const {
    id,
    customerName,
    ratings,
    overallRating,
    content,
    createdAt,
    response,
    isVerified,
  } = review;

  const ratingCategories = Object.entries(ratings) as [keyof typeof RATING_LABELS, number][];

  return (
    <div
      className={classNames(
        'bg-white rounded-lg border border-secondary-200 p-5',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={customerName} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-secondary-800">{customerName}</span>
              {isVerified && (
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                  רכישה מאומתת
                </span>
              )}
            </div>
            <span className="text-sm text-secondary-500">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
        <RatingStars rating={overallRating} size="sm" showValue={false} />
      </div>

      {/* Review content */}
      <p className="text-secondary-700 mb-4 leading-relaxed">{content}</p>

      {/* Detailed ratings */}
      {showDetailedRating && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
          >
            {showDetails ? (
              <>
                <ChevronUp className="w-4 h-4" />
                הסתר פירוט דירוגים
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                הצג פירוט דירוגים
              </>
            )}
          </button>
          {showDetails && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-secondary-50 rounded-lg">
              {ratingCategories.map(([key, value]) => (
                <div key={key}>
                  <span className="text-xs text-secondary-500">
                    {RATING_LABELS[key]}
                  </span>
                  <RatingStars rating={value} size="sm" showValue />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Professional response */}
      {response && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowResponse(!showResponse)}
            className="flex items-center gap-1 text-sm text-secondary-600 hover:text-secondary-700"
          >
            <MessageCircle className="w-4 h-4" />
            תגובת בעל המקצוע
            {showResponse ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showResponse && (
            <div className="mt-2 mr-4 p-3 bg-primary-50 rounded-lg border-r-2 border-primary-500">
              <p className="text-secondary-700 text-sm">{response.content}</p>
              {response.createdAt && (
                <span className="text-xs text-secondary-500 mt-2 block">
                  {formatDate(response.createdAt)}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onHelpful?.(id)}
            className="flex items-center gap-1 text-sm text-secondary-500 hover:text-secondary-700"
          >
            <ThumbsUp className="w-4 h-4" />
            מועיל ({helpfulCount})
          </button>
        </div>
        {onReport && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport(id)}
            className="text-secondary-400 hover:text-error"
          >
            <Flag className="w-4 h-4" />
            דווח
          </Button>
        )}
      </div>
    </div>
  );
}
