import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useFavorites } from '../contexts/FavoritesContext';
import plants from '../data/plants';
import LazyPlantCard from '../components/LazyPlantCard';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-secondary);
  border-radius: 1.5rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);

  h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--accent-gradient);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-glow);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(39, 174, 96, 0.4);
  }
`;

function MyGarden() {
  const { favorites } = useFavorites();
  const favoritePlants = plants.filter(plant => favorites.includes(plant.id));

  return (
    <PageContainer>
      <SEO
        title="My Garden"
        description={`Your personal collection of ${favoritePlants.length} favorite AYUSH medicinal plants.`}
      />
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Title>My Garden</Title>
        <Subtitle>
          {favoritePlants.length > 0 
            ? `You have ${favoritePlants.length} ${favoritePlants.length === 1 ? 'plant' : 'plants'} in your garden`
            : 'Your personal collection of favorite plants'}
        </Subtitle>
      </Header>

      {favoritePlants.length > 0 ? (
        <PlantGrid>
          {favoritePlants.map((plant, index) => (
            <LazyPlantCard
              key={plant.id}
              plant={plant}
              index={index}
            />
          ))}
        </PlantGrid>
      ) : (
        <EmptyState
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌱</div>
          <h3>Your garden is empty</h3>
          <p>Start building your collection by favoriting plants you love!</p>
          <CTAButton to="/plants">Explore Plants</CTAButton>
        </EmptyState>
      )}
    </PageContainer>
  );
}

export default MyGarden;
