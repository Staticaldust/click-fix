import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (professionalId: string) => void;
  removeFavorite: (professionalId: string) => void;
  isFavorite: (professionalId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (professionalId: string) => {
        const { favoriteIds } = get();
        if (!favoriteIds.includes(professionalId)) {
          set({ favoriteIds: [...favoriteIds, professionalId] });
        }
      },

      removeFavorite: (professionalId: string) => {
        const { favoriteIds } = get();
        set({ favoriteIds: favoriteIds.filter((id) => id !== professionalId) });
      },

      isFavorite: (professionalId: string) => {
        return get().favoriteIds.includes(professionalId);
      },

      clearFavorites: () => {
        set({ favoriteIds: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
