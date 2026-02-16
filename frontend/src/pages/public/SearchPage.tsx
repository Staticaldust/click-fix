import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button, Select, Card, ProfessionalCard, Loader } from '../../components/common';
import { ISRAELI_CITIES, GENDER_OPTIONS, CATEGORIES } from '../../utils/constants';
import { professionalService } from '../../services/professional.service';
import type { Professional } from '../../types/professional.types';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

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

  useEffect(() => {
    const fetchProfessionals = async () => {
      setIsLoading(true);
      try {
        const result = await professionalService.search({});
        setProfessionals(result.professionals);
      } catch (error) {
        console.error('Failed to fetch professionals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

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

  // Filter professionals based on current filters (client-side filtering on fetched data)
  const filteredProfessionals = professionals.filter((p: any) => {
    if (category) {
      const cats = p.categories || [];
      const matchesCat = cats.some((c: any) => String(c.id) === category);
      if (!matchesCat) return false;
    }
    if (city && p.area !== city) return false;
    if (gender && p.gender !== gender) return false;
    if (query) {
      const searchLower = query.toLowerCase();
      const matches =
        (p.firstName || '').toLowerCase().includes(searchLower) ||
        (p.lastName || '').toLowerCase().includes(searchLower) ||
        (p.description || '').toLowerCase().includes(searchLower);
      if (!matches) return false;
    }
    return true;
  });

  // Sort professionals
  const sortedProfessionals = [...filteredProfessionals].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'rating': {
        const aRating = a.reviews?.length ? a.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / a.reviews.length : 0;
        const bRating = b.reviews?.length ? b.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / b.reviews.length : 0;
        return bRating - aRating;
      }
      case 'reviews':
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
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
