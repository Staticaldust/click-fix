import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  MessageSquare,
  ChevronLeft,
} from 'lucide-react';
import {
  Button,
  Avatar,
  RatingStars,
  ReviewCard,
  Card,
  PageLoader,
} from '../../components/common';
import { RATING_LABELS, DAYS_OF_WEEK } from '../../utils/constants';
import { classNames } from '../../utils/helpers';
import type { Professional } from '../../types/professional.types';
import type { Review } from '../../types/review.types';

// Mock data - in production this would come from API
const mockProfessional: Professional = {
  id: '1',
  email: 'david@example.com',
  firstName: 'דוד',
  lastName: 'כהן',
  phone: '050-1234567',
  role: 'professional',
  status: 'approved',
  categoryId: 'electrician',
  categoryName: 'חשמלאי',
  description: 'חשמלאי מוסמך עם ניסיון של מעל 15 שנה. מתמחה בהתקנות חשמל ביתיות ומסחריות, תיקון תקלות, והתקנת מערכות חכמות. עבודה מקצועית, אמינה ובמחירים הוגנים.',
  yearsOfExperience: 15,
  serviceAreas: ['ירושלים', 'בית שמש', 'מודיעין', 'בני ברק'],
  workingHours: [
    { day: 'sunday', isWorking: true, startTime: '08:00', endTime: '18:00' },
    { day: 'monday', isWorking: true, startTime: '08:00', endTime: '18:00' },
    { day: 'tuesday', isWorking: true, startTime: '08:00', endTime: '18:00' },
    { day: 'wednesday', isWorking: true, startTime: '08:00', endTime: '18:00' },
    { day: 'thursday', isWorking: true, startTime: '08:00', endTime: '16:00' },
    { day: 'friday', isWorking: true, startTime: '08:00', endTime: '13:00' },
    { day: 'saturday', isWorking: false },
  ],
  services: [
    { id: '1', name: 'תיקון תקלות חשמל', minPrice: 150, maxPrice: 350 },
    { id: '2', name: 'התקנת נקודות חשמל', minPrice: 100, maxPrice: 200 },
    { id: '3', name: 'החלפת לוח חשמל', minPrice: 800, maxPrice: 2500 },
    { id: '4', name: 'התקנת תאורה', minPrice: 80, maxPrice: 250 },
  ],
  certificates: [
    { id: '1', name: 'תעודת חשמלאי מוסמך', fileUrl: '#', fileType: 'pdf', uploadedAt: new Date() },
    { id: '2', name: 'רישיון עבודה בגובה', fileUrl: '#', fileType: 'pdf', uploadedAt: new Date() },
  ],
  rating: {
    overall: 4.8,
    reliability: 4.9,
    service: 4.7,
    availability: 4.6,
    price: 4.8,
    professionalism: 4.9,
  },
  reviewCount: 127,
  isVerified: true,
  createdAt: new Date('2020-01-15'),
  updatedAt: new Date(),
};

const mockReviews: Review[] = [
  {
    id: '1',
    professionalId: '1',
    customerId: 'c1',
    customerName: 'יוסי לוי',
    ratings: {
      reliability: 5,
      service: 5,
      availability: 5,
      price: 5,
      professionalism: 5,
    },
    overallRating: 5,
    content: 'שירות מעולה! דוד הגיע בזמן, איבחן את הבעיה במהירות ותיקן אותה ביעילות. מחיר הוגן ועבודה מקצועית. ממליץ בחום!',
    createdAt: new Date('2024-01-10'),
    isVerified: true,
  },
  {
    id: '2',
    professionalId: '1',
    customerId: 'c2',
    customerName: 'רחל כהן',
    ratings: {
      reliability: 5,
      service: 4,
      availability: 4,
      price: 5,
      professionalism: 5,
    },
    overallRating: 4.6,
    content: 'עבודה מצוינת. התקין לנו לוח חשמל חדש והעבודה הייתה נקייה ומסודרת. המחיר היה סביר מאוד.',
    createdAt: new Date('2024-01-05'),
    isVerified: true,
    response: {
      content: 'תודה רבה רחל! שמחתי לעזור.',
      createdAt: new Date('2024-01-06'),
    },
  },
];

export default function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'services'>('overview');

  // In production, fetch data using React Query
  const professional = mockProfessional;
  const reviews = mockReviews;
  const isLoading = false;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!professional) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-secondary-800 mb-4">בעל מקצוע לא נמצא</h1>
        <Link to="/search">
          <Button>חזרה לחיפוש</Button>
        </Link>
      </div>
    );
  }

  const ratingCategories = Object.entries(professional.rating).filter(
    ([key]) => key !== 'overall'
  ) as [keyof typeof RATING_LABELS, number][];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/search"
            className="inline-flex items-center gap-1 text-secondary-600 hover:text-primary-600 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            חזרה לתוצאות החיפוש
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile image and basic info */}
            <div className="flex items-start gap-4">
              <Avatar
                src={professional.profileImage}
                name={`${professional.firstName} ${professional.lastName}`}
                size="xl"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-secondary-800">
                    {professional.firstName} {professional.lastName}
                  </h1>
                  {professional.isVerified && (
                    <CheckCircle className="w-6 h-6 text-success" />
                  )}
                </div>
                <p className="text-lg text-secondary-600 mb-2">{professional.categoryName}</p>
                <RatingStars
                  rating={professional.rating.overall}
                  reviewCount={professional.reviewCount}
                  size="md"
                />
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex-1 flex flex-wrap gap-4 md:justify-end items-start">
              {professional.yearsOfExperience && (
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-secondary-500" />
                  <span className="text-secondary-700">
                    {professional.yearsOfExperience} שנות ניסיון
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary-100 rounded-lg">
                <MapPin className="w-5 h-5 text-secondary-500" />
                <span className="text-secondary-700">
                  {professional.serviceAreas.slice(0, 2).join(', ')}
                  {professional.serviceAreas.length > 2 && ` +${professional.serviceAreas.length - 2}`}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            <Link to={`/professional/${id}/quote`}>
              <Button size="lg">
                <MessageSquare className="w-5 h-5" />
                בקש הצעת מחיר
              </Button>
            </Link>
            <a href={`tel:${professional.phone}`}>
              <Button variant="outline" size="lg">
                <Phone className="w-5 h-5" />
                התקשר עכשיו
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-secondary-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {[
              { key: 'overview', label: 'סקירה כללית' },
              { key: 'services', label: 'שירותים ומחירים' },
              { key: 'reviews', label: `ביקורות (${professional.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={classNames(
                  'py-4 border-b-2 font-medium transition-colors',
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* About */}
                <Card>
                  <h2 className="text-lg font-semibold text-secondary-800 mb-4">אודות</h2>
                  <p className="text-secondary-700 leading-relaxed">{professional.description}</p>
                </Card>

                {/* Rating breakdown */}
                <Card>
                  <h2 className="text-lg font-semibold text-secondary-800 mb-4">פירוט דירוגים</h2>
                  <div className="space-y-3">
                    {ratingCategories.map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-secondary-600">{RATING_LABELS[key]}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-secondary-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${(value / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-secondary-700 w-8">
                            {value.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent reviews */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-secondary-800">ביקורות אחרונות</h2>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      צפה בכל הביקורות
                    </button>
                  </div>
                  <div className="space-y-4">
                    {reviews.slice(0, 2).map((review) => (
                      <ReviewCard key={review.id} review={review} showDetailedRating />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'services' && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-4">שירותים ומחירים</h2>
                <div className="divide-y divide-secondary-100">
                  {professional.services.map((service) => (
                    <div key={service.id} className="py-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-secondary-800">{service.name}</h3>
                        {service.description && (
                          <p className="text-sm text-secondary-500 mt-1">{service.description}</p>
                        )}
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-primary-600">
                          {service.minPrice === service.maxPrice
                            ? `${service.minPrice} ש"ח`
                            : `${service.minPrice} - ${service.maxPrice} ש"ח`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-secondary-800">
                    כל הביקורות ({professional.reviewCount})
                  </h2>
                  {/* Add sorting/filtering here */}
                </div>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showDetailedRating />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact info */}
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">פרטי קשר</h2>
              <div className="space-y-3">
                <a
                  href={`tel:${professional.phone}`}
                  className="flex items-center gap-3 text-secondary-700 hover:text-primary-600"
                >
                  <Phone className="w-5 h-5" />
                  {professional.phone}
                </a>
                <a
                  href={`mailto:${professional.email}`}
                  className="flex items-center gap-3 text-secondary-700 hover:text-primary-600"
                >
                  <Mail className="w-5 h-5" />
                  {professional.email}
                </a>
              </div>
            </Card>

            {/* Working hours */}
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">
                <Clock className="w-5 h-5 inline ml-2" />
                שעות פעילות
              </h2>
              <div className="space-y-2">
                {professional.workingHours.map((wh) => {
                  const dayLabel = DAYS_OF_WEEK.find((d) => d.value === wh.day)?.label;
                  return (
                    <div key={wh.day} className="flex justify-between text-sm">
                      <span className="text-secondary-600">{dayLabel}</span>
                      <span className={wh.isWorking ? 'text-secondary-800' : 'text-secondary-400'}>
                        {wh.isWorking ? `${wh.startTime} - ${wh.endTime}` : 'סגור'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Service areas */}
            <Card>
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">
                <MapPin className="w-5 h-5 inline ml-2" />
                אזורי שירות
              </h2>
              <div className="flex flex-wrap gap-2">
                {professional.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-secondary-100 rounded-full text-sm text-secondary-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>

            {/* Certificates */}
            {professional.certificates.length > 0 && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-4">
                  <FileText className="w-5 h-5 inline ml-2" />
                  תעודות והסמכות
                </h2>
                <div className="space-y-2">
                  {professional.certificates.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-secondary-700 hover:text-primary-600"
                    >
                      <FileText className="w-4 h-4" />
                      {cert.name}
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
