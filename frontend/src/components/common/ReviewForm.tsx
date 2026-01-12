import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './Button';
import { RatingStars } from './RatingStars';
import { reviewSchema, type ReviewFormData } from '../../utils/validators';
import { RATING_LABELS } from '../../utils/constants';
import { classNames } from '../../utils/helpers';

interface ReviewFormProps {
  professionalId: string;
  professionalName: string;
  onSubmit: (data: ReviewFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

const ratingKeys = ['reliability', 'service', 'availability', 'price', 'professionalism'] as const;

export function ReviewForm({
  professionalName,
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      ratings: {
        reliability: 0,
        service: 0,
        availability: 0,
        price: 0,
        professionalism: 0,
      },
      content: '',
    },
  });

  const ratings = watch('ratings');

  const handleRatingChange = (key: keyof typeof ratings, value: number) => {
    setValue(`ratings.${key}`, value);
  };

  // Calculate overall rating as average
  const overallRating = ratingKeys.reduce((sum, key) => sum + (ratings[key] || 0), 0) / ratingKeys.length;

  const handleFormSubmit = async (data: ReviewFormData) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={classNames('bg-white rounded-xl p-6 shadow-sm', className)}
    >
      <h3 className="text-lg font-semibold text-secondary-800 mb-6">
        כתיבת ביקורת על {professionalName}
      </h3>

      {/* Rating categories */}
      <div className="space-y-4 mb-6">
        {ratingKeys.map((key) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-secondary-700">{RATING_LABELS[key]}</label>
            <RatingStars
              rating={ratings[key] || 0}
              interactive
              onChange={(value) => handleRatingChange(key, value)}
              showValue={false}
            />
          </div>
        ))}
        {errors.ratings && (
          <p className="text-sm text-error">יש לדרג את כל הקטגוריות</p>
        )}
      </div>

      {/* Overall rating display */}
      <div className="flex items-center justify-center gap-3 p-4 bg-primary-50 rounded-lg mb-6">
        <span className="text-secondary-700 font-medium">דירוג כולל:</span>
        <RatingStars rating={overallRating} size="lg" />
      </div>

      {/* Review content */}
      <div className="mb-6">
        <label htmlFor="review-content" className="block text-sm font-medium text-secondary-700 mb-2">
          תיאור החוויה שלך
        </label>
        <textarea
          id="review-content"
          rows={4}
          placeholder="ספרו על החוויה שלכם עם בעל המקצוע..."
          className={classNames(
            'w-full px-4 py-3 border rounded-lg text-base transition-colors duration-200 resize-none',
            'focus:outline-none focus:ring-2',
            errors.content
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500/20'
          )}
          {...register('content')}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-error">{errors.content.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" isLoading={isLoading} fullWidth>
          שלח ביקורת
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
}
