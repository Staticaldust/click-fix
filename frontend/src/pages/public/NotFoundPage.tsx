import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '../../components/common';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-800 mb-4">
          הדף לא נמצא
        </h2>
        <p className="text-secondary-600 mb-8 max-w-md mx-auto">
          מצטערים, הדף שחיפשת לא קיים. ייתכן שהקישור שגוי או שהדף הועבר.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button>
              <Home className="w-5 h-5" />
              חזרה לדף הבית
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline">
              <Search className="w-5 h-5" />
              חיפוש בעלי מקצוע
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
