import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Trash2 } from 'lucide-react';
import { Card, Button, ProfessionalCard, Modal, PageLoader } from '../../components/common';
import { professionalService } from '../../services/professional.service';
import type { Professional } from '../../types/professional.types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Get favorite IDs from localStorage
        const savedIds: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (savedIds.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        // Fetch each professional's data
        const promises = savedIds.map((id) =>
          professionalService.getById(id).catch(() => null)
        );
        const results = await Promise.all(promises);
        setFavorites(results.filter(Boolean) as Professional[]);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = () => {
    if (selectedProfessional) {
      const newFavorites = favorites.filter((f) => f.id !== selectedProfessional.id);
      setFavorites(newFavorites);
      // Update localStorage
      const savedIds = newFavorites.map((f) => String(f.id));
      localStorage.setItem('favorites', JSON.stringify(savedIds));
      setShowRemoveModal(false);
      setSelectedProfessional(null);
    }
  };

  if (isLoading) return <PageLoader />;

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
