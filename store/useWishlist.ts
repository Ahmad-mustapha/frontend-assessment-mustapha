import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

/**
 * Global State Store using Zustand (Section 3.1 Preference)
 * Handles client-side "Watchlist" persistence across different routes.
 */
export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      toggleFavorite: (id: number) => {
        const { favorites } = get();
        const exists = favorites.includes(id);
        
        if (exists) {
          set({ favorites: favorites.filter((fId) => fId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
      
      isFavorite: (id: number) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: 'streamfix-wishlist',
    }
  )
);
