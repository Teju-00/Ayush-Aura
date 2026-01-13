import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { highlightText } from './SearchHighlight';
import FavoriteButton from './FavoriteButton';

const PlantCard = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--accent-light);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    box-shadow: var(--shadow-sm);
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: var(--shadow-md);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const FavoriteButtonContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
`;

const PlantInfo = styled.div`
  padding: 1.5rem;
  background: var(--bg-tertiary);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const PlantName = styled.h3`
  margin: 0 0 0.5rem;
  color: var(--text-primary);
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.2;
    margin: 0;
    text-align: center;
  }
`;

const PlantDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 1rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileHidden = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const LazyPlantCard = ({ plant, index, searchTerm = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const setFlag = () => setIsMobile(mq.matches);
    setFlag();
    mq.addEventListener ? mq.addEventListener('change', setFlag) : mq.addListener(setFlag);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', setFlag) : mq.removeListener(setFlag);
    };
  }, []);

  const handleCardClick = () => {
    if (isMobile) navigate(`/plant/${plant.id}`);
  };

  const handleKeyDown = (e) => {
    if (!isMobile) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/plant/${plant.id}`);
    }
  };

  return (
    <PlantCard
      ref={cardRef}
      $isVisible={isVisible}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={isMobile ? 0 : -1}
      role={isMobile ? 'button' : undefined}
      aria-label={isMobile ? `View details for ${plant.name}` : undefined}
    >
      <ImageContainer>
        <OptimizedImage
          src={plant.image}
          alt={plant.name}
          height="200px"
          borderRadius="1rem 1rem 0 0"
          hoverZoom={true}
        />
        <FavoriteButtonContainer onClick={(e) => e.stopPropagation()}>
          <FavoriteButton plantId={plant.id} />
        </FavoriteButtonContainer>
      </ImageContainer>
      <PlantInfo>
        <PlantName>{searchTerm ? highlightText(plant.name, searchTerm) : plant.name}</PlantName>
        <MobileHidden>
          <PlantDescription>
            {searchTerm ? highlightText(plant.description, searchTerm) : plant.description}
          </PlantDescription>
          <ViewButton to={`/plant/${plant.id}`}>View Details</ViewButton>
        </MobileHidden>
      </PlantInfo>
    </PlantCard>
  );
};

export default LazyPlantCard; 