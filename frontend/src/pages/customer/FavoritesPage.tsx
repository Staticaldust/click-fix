import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Trash2 } from 'lucide-react';
import { Card, Button, ProfessionalCard, Modal } from '../../components/common';
import type { Professional } from '../../types/professional.types';

// Mock data - in production this would come from API/store
const mockFavorites: Professional[] = [
  {
    id: '1',
    email: 'david@example.com',
    firstName: 'דוד',
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
    ],
    certificates: [],
    rating: { overall: 4.8, reliability: 4.9, service: 4.7, availability: 4.6, price: 4.8, professionalism: 4.9 },
    reviewCount: 127,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'yossi@example.com',
    firstName: 'יוסי',
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
    ],
    certificates: [],
    rating: { overall: 4.5, reliability: 4.6, service: 4.4, availability: 4.5, price: 4.5, professionalism: 4.5 },
    reviewCount: 89,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Professional[]>(mockFavorites);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const handleRemoveClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = () => {
    if (selectedProfessional) {
      setFavorites(favorites.filter((f) => f.id !== selectedProfessional.id));
      setShowRemoveModal(false);
      setSelectedProfessional(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <Heart className="w-7 h-7 inline ml-2 text-primary-500" />
          המועדפים שלי
        </h1>
        <p className="text-secondary-600">
          בעלי מקצוע ששמרת לגישה מהירה
        </p>
      </div>

      {favorites.length === 0 ? (
        <Card className="text-center py-12">
          <Heart className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-800 mb-2">
            אין מועדפים עדיין
          </h2>
          <p className="text-secondary-600 mb-6">
            חפשו בעלי מקצוע ושמרו אותם למועדפים לגישה מהירה
          </p>
          <Link to="/search">
            <Button>
              <Search className="w-5 h-5" />
              חפש בעל מקצוע
            </Button>
          </Link>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-secondary-600">
              {favorites.length} בעלי מקצוע במועדפים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((professional) => (
              <div key={professional.id} className="relative">
                <ProfessionalCard professional={professional} />
                <button
                  onClick={() => handleRemoveClick(professional)}
                  className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-secondary-400 hover:text-error transition-colors"
                  title="הסר ממועדפים"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        title="הסרה ממועדפים"
      >
        <p className="text-secondary-600 mb-6">
          האם להסיר את {selectedProfessional?.firstName} {selectedProfessional?.lastName} מרשימת המועדפים?
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleConfirmRemove} fullWidth>
            הסר ממועדפים
          </Button>
          <Button variant="outline" onClick={() => setShowRemoveModal(false)} fullWidth>
            ביטול
          </Button>
        </div>
      </Modal>
    </div>
  );
}
