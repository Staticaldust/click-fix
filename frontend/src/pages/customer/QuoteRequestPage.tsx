import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ChevronLeft,
  MessageSquare,
  Phone,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  Button,
  Card,
  Input,
  Select,
  Avatar,
  RatingStars,
  PageLoader,
} from '../../components/common';
import { URGENCY_LEVELS } from '../../utils/constants';
import { classNames } from '../../utils/helpers';
import { quoteService } from '../../services/quote.service';
import { professionalService } from '../../services/professional.service';
import { useAuthStore } from '../../store/authStore';
import type { Professional } from '../../types/professional.types';
import type { QuoteQuestion } from '../../types/quote.types';

interface FormData {
  guestName?: string;
  guestEmail?: string;
  answers: Record<string, string | number>;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  responseMethod: 'system' | 'phone';
}

export default function QuoteRequestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [questions, setQuestions] = useState<QuoteQuestion[]>([]);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const proData = await professionalService.getById(id);
        setProfessional(proData);

        // Try to fetch questions for the professional's category
        const proAny = proData as any;
        const categoryId = proAny.categories?.[0]?.id ? String(proAny.categories[0].id) : proData.categoryId;
        if (categoryId) {
          try {
            const questionsData = await quoteService.getQuestions(categoryId);
            setQuestions(questionsData);
          } catch {
            // Questions endpoint may not exist yet, that's ok
          }
        }
      } catch (error) {
        console.error('Failed to fetch professional:', error);
        toast.error('שגיאה בטעינת הנתונים');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      guestName: '',
      guestEmail: '',
      answers: {},
      description: '',
      urgency: 'medium',
      responseMethod: 'system',
    },
  });

  const responseMethod = watch('responseMethod');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Transform answers to array format
      const answersArray = Object.entries(data.answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        }),
      );

      const requestData: any = {
        professionalId: id!,
        answers: answersArray,
        description: data.description,
        urgency: data.urgency,
        responseMethod: data.responseMethod,
      };

      // Add guest info if user is not authenticated
      if (!isAuthenticated) {
        requestData.guestName = data.guestName;
        requestData.guestEmail = data.guestEmail;
      }

      await quoteService.create(requestData);

      toast.success('בקשת הצעת המחיר נשלחה בהצלחה!');

      // If guest, redirect to home with message
      if (!isAuthenticated) {
        toast.info('תקבל תשובה למייל שהזנת');
        navigate('/', { state: { success: true } });
      } else {
        navigate('/quotes', { state: { success: true } });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'שגיאה בשליחת הבקשה. אנא נסה שוב.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <PageLoader />;

  if (!professional) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <h1 className='text-2xl font-bold text-secondary-800 mb-4'>
          בעל מקצוע לא נמצא
        </h1>
        <Link to='/search'>
          <Button>חזרה לחיפוש</Button>
        </Link>
      </div>
    );
  }

  const proAny = professional as any;
  const categoryName = professional.categoryName || proAny.categories?.[0]?.name || '';
  const rating = professional.rating?.overall || 0;
  const reviewCount = professional.reviewCount || proAny.reviews?.length || 0;

  return (
    <div className='container mx-auto px-4 py-8 max-w-3xl'>
      {/* Back link */}
      <Link
        to={`/professional/${id}`}
        className='inline-flex items-center gap-1 text-secondary-600 hover:text-primary-600 mb-6'
      >
        <ChevronLeft className='w-4 h-4' />
        חזרה לפרופיל
      </Link>

      <h1 className='text-2xl font-bold text-secondary-800 mb-6'>
        בקשת הצעת מחיר
      </h1>

      {/* Professional Info */}
      <Card className='mb-6'>
        <div className='flex items-center gap-4'>
          <Avatar
            src={professional.profileImage}
            name={`${professional.firstName} ${professional.lastName}`}
            size='lg'
          />
          <div className='flex-1'>
            <h2 className='font-semibold text-secondary-800'>
              {professional.firstName} {professional.lastName}
            </h2>
            <p className='text-secondary-600'>{categoryName}</p>
            <RatingStars
              rating={rating}
              reviewCount={reviewCount}
              size='sm'
            />
          </div>
        </div>
      </Card>

      {/* Quote Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Guest User Fields - only show if not authenticated */}
        {!isAuthenticated && (
          <Card className='mb-6'>
            <h3 className='text-lg font-semibold text-secondary-800 mb-4'>
              פרטי קשר שלך
            </h3>
            <div className='space-y-4'>
              <Input
                label='שם מלא'
                placeholder='הזן את שמך המלא'
                required
                error={errors.guestName?.message}
                {...register('guestName', {
                  required: !isAuthenticated && 'שדה חובה',
                })}
              />
              <Input
                label='אימייל'
                type='email'
                placeholder='example@email.com'
                required
                error={errors.guestEmail?.message}
                {...register('guestEmail', {
                  required: !isAuthenticated && 'שדה חובה',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'כתובת אימייל לא תקינה',
                  },
                })}
              />
            </div>
          </Card>
        )}

        <Card className='mb-6'>
          <h3 className='text-lg font-semibold text-secondary-800 mb-4'>
            פרטי הבקשה
          </h3>

          <div className='space-y-6'>
            {/* Dynamic Questions */}
            {questions.map((question) => (
              <div key={question.id}>
                {question.type === 'select' && question.options ? (
                  <Select
                    label={question.question}
                    required={question.required}
                    options={question.options.map((opt) => ({
                      value: opt,
                      label: opt,
                    }))}
                    placeholder='בחר אפשרות'
                    {...register(`answers.${question.id}` as const, {
                      required: question.required && 'שדה חובה',
                    })}
                    error={
                      (
                        errors.answers as Record<string, { message?: string }>
                      )?.[question.id]?.message
                    }
                  />
                ) : question.type === 'number' ? (
                  <Input
                    type='number'
                    label={question.question}
                    required={question.required}
                    {...register(`answers.${question.id}` as const, {
                      required: question.required && 'שדה חובה',
                      valueAsNumber: true,
                    })}
                    error={
                      (
                        errors.answers as Record<string, { message?: string }>
                      )?.[question.id]?.message
                    }
                  />
                ) : (
                  <div>
                    <label className='block text-sm font-medium text-secondary-700 mb-2'>
                      {question.question}
                      {question.required && (
                        <span className='text-error mr-1'>*</span>
                      )}
                    </label>
                    <textarea
                      rows={3}
                      className={classNames(
                        'w-full px-4 py-3 border rounded-lg text-base transition-colors duration-200 resize-none',
                        'focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20',
                        'border-secondary-300',
                      )}
                      {...register(`answers.${question.id}` as const, {
                        required: question.required && 'שדה חובה',
                      })}
                    />
                    {(errors.answers as Record<string, { message?: string }>)?.[
                      question.id
                    ]?.message && (
                      <p className='mt-1 text-sm text-error'>
                        {
                          (
                            errors.answers as Record<
                              string,
                              { message?: string }
                            >
                          )[question.id].message
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Additional Description */}
            <div>
              <label className='block text-sm font-medium text-secondary-700 mb-2'>
                {questions.length > 0 ? 'הערות נוספות' : 'תיאור הבקשה'}
              </label>
              <textarea
                rows={3}
                placeholder='פרטים נוספים שחשוב שבעל המקצוע ידע...'
                className='w-full px-4 py-3 border border-secondary-300 rounded-lg text-base transition-colors duration-200 resize-none focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20'
                {...register('description')}
              />
            </div>
          </div>
        </Card>

        {/* Urgency and Response Method */}
        <Card className='mb-6'>
          <h3 className='text-lg font-semibold text-secondary-800 mb-4'>
            העדפות
          </h3>

          <div className='space-y-6'>
            {/* Urgency */}
            <div>
              <label className='block text-sm font-medium text-secondary-700 mb-3'>
                <Clock className='w-4 h-4 inline ml-1' />
                דחיפות
              </label>
              <div className='flex flex-wrap gap-3'>
                {URGENCY_LEVELS.map((level) => (
                  <label
                    key={level.value}
                    className={classNames(
                      'flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors',
                      watch('urgency') === level.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300',
                    )}
                  >
                    <input
                      type='radio'
                      value={level.value}
                      className='hidden'
                      {...register('urgency')}
                    />
                    <span className={level.color}>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Response Method */}
            <div>
              <label className='block text-sm font-medium text-secondary-700 mb-3'>
                אופן קבלת התגובה
              </label>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <label
                  className={classNames(
                    'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors',
                    responseMethod === 'system'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300',
                  )}
                >
                  <input
                    type='radio'
                    value='system'
                    className='hidden'
                    {...register('responseMethod')}
                  />
                  <MessageSquare className='w-5 h-5 text-primary-600' />
                  <div>
                    <div className='font-medium text-secondary-800'>במערכת</div>
                    <div className='text-sm text-secondary-500'>
                      קבל תגובה דרך האזור האישי
                    </div>
                  </div>
                </label>
                <label
                  className={classNames(
                    'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors',
                    responseMethod === 'phone'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300',
                  )}
                >
                  <input
                    type='radio'
                    value='phone'
                    className='hidden'
                    {...register('responseMethod')}
                  />
                  <Phone className='w-5 h-5 text-primary-600' />
                  <div>
                    <div className='font-medium text-secondary-800'>טלפון</div>
                    <div className='text-sm text-secondary-500'>
                      בעל המקצוע יתקשר אליך
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Form Errors */}
        {Object.keys(errors).length > 0 && (
          <div className='flex items-start gap-3 p-4 bg-red-50 rounded-lg mb-6'>
            <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
            <div className='text-sm text-red-700'>
              <p className='font-medium mb-1'>יש שגיאות בטופס:</p>
              <ul className='list-disc list-inside'>
                {Object.entries(errors).map(([key, error]: [string, any]) => (
                  <li key={key}>
                    {key}: {error?.message || 'שדה חובה'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Notice */}
        <div className='flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-6'>
          <AlertCircle className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
          <div className='text-sm text-blue-700'>
            <p className='font-medium mb-1'>שימו לב:</p>
            <p>
              שליחת בקשה להצעת מחיר היא ללא התחייבות. בעל המקצוע יחזור אליכם עם
              הצעה מפורטת.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className='flex gap-3'>
          <Button
            type='submit'
            isLoading={isSubmitting}
            fullWidth
            size='lg'
          >
            שלח בקשה
          </Button>
          <Link to={`/professional/${id}`}>
            <Button type='button' variant='outline' size='lg'>
              ביטול
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
