import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button, Select, Card, ProfessionalCard, Loader } from '../../components/common';
import { ISRAELI_CITIES, GENDER_OPTIONS, CATEGORIES } from '../../utils/constants';
import type { Professional } from '../../types/professional.types';

// Mock data - in production this would come from API
const mockProfessionals: Professional[] = [
  {
    id: '1',
    email: 'yossi@example.com',
    firstName: 'יוסי',
    lastName: 'כהן',
    phone: '050-1234567',
    role: 'professional',
    status: 'approved',
    categoryId: 'electrician',
    categoryName: 'חשמלאי',
    description: 'חשמלאי מוסמך עם ניסיון של מעל 15 שנה',
    yearsOfExperience: 15,
    serviceAreas: ['ירושלים', 'בית שמש', 'מודיעין'],
    workingHours: [],
    services: [
      { id: '1', name: 'תיקון תקלות', minPrice: 150, maxPrice: 350 },
      { id: '2', name: 'התקנת נקודות', minPrice: 100, maxPrice: 200 },
    ],
    certificates: [],
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'david@example.com',
    firstName: 'דוד',
    lastName: 'לוי',
    phone: '052-9876543',
    role: 'professional',
    status: 'approved',
    categoryId: 'plumber',
    categoryName: 'אינסטלטור',
    description: 'אינסטלטור מקצועי לכל סוגי העבודות',
    yearsOfExperience: 10,
    serviceAreas: ['בני ברק', 'רמת גן', 'פתח תקווה'],
    workingHours: [],
    services: [
      { id: '1', name: 'תיקון נזילות', minPrice: 200, maxPrice: 400 },
      { id: '2', name: 'פתיחת סתימות', minPrice: 150, maxPrice: 300 },
    ],
    certificates: [],
    rating: {
      overall: 4.5,
      reliability: 4.6,
      service: 4.4,
      availability: 4.5,
      price: 4.5,
      professionalism: 4.5,
    },
    reviewCount: 89,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'miriam@example.com',
    firstName: 'מרים',
    lastName: 'שרון',
    phone: '054-5555555',
    gender: 'female',
    role: 'professional',
    status: 'approved',
    categoryId: 'computer',
    categoryName: 'טכנאית מחשבים',
    description: 'מומחית לתיקון מחשבים וטאבלטים',
    yearsOfExperience: 8,
    serviceAreas: ['תל אביב', 'רמת גן', 'גבעתיים'],
    workingHours: [],
    services: [
      { id: '1', name: 'תיקון מחשבים', minPrice: 120, maxPrice: 250 },
      { id: '2', name: 'התקנת תוכנות', minPrice: 80, maxPrice: 150 },
    ],
    certificates: [],
    rating: {
      overall: 4.9,
      reliability: 5,
      service: 4.9,
      availability: 4.8,
      price: 4.9,
      professionalism: 5,
    },
    reviewCount: 234,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading] = useState(false);

  // Filter states
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'relevance');

  const categories = CATEGORIES.map((c) => ({ value: c.id, label: c.name }));
  const cityOptions = ISRAELI_CITIES.map((c) => ({ value: c, label: c }));
  const genderOptions = GENDER_OPTIONS.map((g) => ({ value: g.value, label: g.label }));
  const ratingOptions = [
    { value: '4', label: '4 כוכבים ומעלה' },
    { value: '3', label: '3 כוכבים ומעלה' },
    { value: '2', label: '2 כוכבים ומעלה' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (category) params.set('category', category);
    if (city) params.set('city', city);
    if (gender) params.set('gender', gender);
    if (minRating) params.set('minRating', minRating);
    if (sortBy && sortBy !== 'relevance') params.set('sortBy', sortBy);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('');
    setCity('');
    setGender('');
    setMinRating('');
    setSortBy('relevance');
    setSearchParams({});
  };

  const removeFilter = (filterKey: string) => {
    switch (filterKey) {
      case 'category':
        setCategory('');
        break;
      case 'city':
        setCity('');
        break;
      case 'gender':
        setGender('');
        break;
      case 'minRating':
        setMinRating('');
        break;
    }
    handleSearch();
  };

  const hasActiveFilters = category || city || gender || minRating;

  // Filter professionals based on current filters
  const filteredProfessionals = mockProfessionals.filter((p) => {
    if (category && p.categoryId !== category) return false;
    if (city && !p.serviceAreas.includes(city)) return false;
    if (gender && p.gender !== gender) return false;
    if (minRating && p.rating.overall < Number(minRating)) return false;
    if (query) {
      const searchLower = query.toLowerCase();
      const matches =
        p.firstName.toLowerCase().includes(searchLower) ||
        p.lastName.toLowerCase().includes(searchLower) ||
        p.categoryName.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower);
      if (!matches) return false;
    }
    return true;
  });

  // Sort professionals
  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating.overall - a.rating.overall;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'price':
        const aMin = Math.min(...a.services.map((s) => s.minPrice));
        const bMin = Math.min(...b.services.map((s) => s.minPrice));
        return aMin - bMin;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Search Header */}
      <div className="bg-white border-b border-secondary-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                placeholder="חפש בעל מקצוע או שירות..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pr-12 pl-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="w-5 h-5" />
              חיפוש
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="w-5 h-5" />
              סינון
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'
            } md:static md:block md:w-72 flex-shrink-0`}
          >
            {/* Mobile close button */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h3 className="font-semibold text-secondary-800">סינון תוצאות</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Card className="md:sticky md:top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-secondary-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  סינון תוצאות
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    נקה הכל
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <Select
                  label="קטגוריה"
                  options={categories}
                  placeholder="בחר קטגוריה"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <Select
                  label="עיר"
                  options={cityOptions}
                  placeholder="בחר עיר"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <Select
                  label="מגדר בעל המקצוע"
                  options={genderOptions}
                  placeholder="לא משנה"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />

                <Select
                  label="דירוג מינימלי"
                  options={ratingOptions}
                  placeholder="כל הדירוגים"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                />

                <Button fullWidth onClick={handleSearch}>
                  החל סינון
                </Button>
              </div>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-secondary-600">
                נמצאו{' '}
                <span className="font-semibold text-secondary-800">
                  {sortedProfessionals.length}
                </span>{' '}
                תוצאות
              </p>
              <Select
                options={[
                  { value: 'relevance', label: 'רלוונטיות' },
                  { value: 'rating', label: 'דירוג גבוה' },
                  { value: 'reviews', label: 'מספר ביקורות' },
                  { value: 'price', label: 'מחיר נמוך' },
                ]}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-44"
              />
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {categories.find((c) => c.value === category)?.label}
                    <button onClick={() => removeFilter('category')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {city && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {city}
                    <button onClick={() => removeFilter('city')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {gender && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {genderOptions.find((g) => g.value === gender)?.label}
                    <button onClick={() => removeFilter('gender')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {minRating && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {ratingOptions.find((r) => r.value === minRating)?.label}
                    <button onClick={() => removeFilter('minRating')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader size="lg" />
              </div>
            )}

            {/* Professional Cards */}
            {!isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sortedProfessionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && sortedProfessionals.length === 0 && (
              <Card className="text-center py-12">
                <Search className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  לא נמצאו תוצאות
                </h3>
                <p className="text-secondary-600 mb-4">
                  נסו לשנות את מילות החיפוש או להסיר חלק מהסינונים
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  נקה סינונים
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
