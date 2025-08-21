import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const PlantCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(39, 174, 96, 0.15);
    border-color: #e8f5e8;
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`;

const PlantInfo = styled.div`
  padding: 1.5rem;
  background: #fafbfc;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const PlantName = styled.h3`
  margin: 0 0 0.5rem;
  color: #2c3e50;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.2;
    margin: 0;
    text-align: center;
  }
`;

const PlantDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 1rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #27ae60;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 1px solid #27ae60;
  
  &:hover {
    background: #219a52;
    border-color: #219a52;
    transform: translateY(-1px);
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

const LazyPlantCard = ({ plant, index }) => {
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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={isMobile ? 0 : -1}
      role={isMobile ? 'button' : undefined}
      aria-label={isMobile ? `View details for ${plant.name}` : undefined}
    >
      <OptimizedImage
        src={plant.image}
        alt={plant.name}
        height="200px"
        borderRadius="1rem 1rem 0 0"
      />
      <PlantInfo>
        <PlantName>{plant.name}</PlantName>
        <MobileHidden>
          <PlantDescription>{plant.description}</PlantDescription>
          <ViewButton to={`/plant/${plant.id}`}>View Details</ViewButton>
        </MobileHidden>
      </PlantInfo>
    </PlantCard>
  );
};

export default LazyPlantCard; 