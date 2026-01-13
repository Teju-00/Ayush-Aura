import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('ayush-aura-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ayush-aura-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addFavorite = (plantId) => {
    setFavorites(prev => {
      if (prev.includes(plantId)) return prev;
      return [...prev, plantId];
    });
  };

  const removeFavorite = (plantId) => {
    setFavorites(prev => prev.filter(id => id !== plantId));
  };

  const toggleFavorite = (plantId) => {
    setFavorites(prev => {
      if (prev.includes(plantId)) {
        return prev.filter(id => id !== plantId);
      }
      return [...prev, plantId];
    });
  };

  const isFavorite = (plantId) => {
    return favorites.includes(plantId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
