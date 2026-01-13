import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoriteBtn = styled(motion.button)`
  background: ${props => props.$isFavorite 
    ? 'var(--accent-gradient)' 
    : 'var(--bg-tertiary)'};
  border: 1px solid ${props => props.$isFavorite 
    ? 'var(--accent-primary)' 
    : 'var(--border-color)'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.$isFavorite ? 'white' : 'var(--text-primary)'};
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.$isFavorite ? 'var(--shadow-glow)' : 'none'};

  &:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-glow);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
`;

const FavoriteButton = ({ plantId, size = 'normal' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(plantId);

  return (
    <FavoriteBtn
      $isFavorite={favorite}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(plantId);
      }}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {favorite ? '❤️' : '🤍'}
    </FavoriteBtn>
  );
};

export default FavoriteButton;
