import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import OptimizedPlantModel from '../components/OptimizedPlantModel';
import FavoriteButton from '../components/FavoriteButton';
import plants from '../data/plants';

const PageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--accent-primary);
  padding: 0.6rem 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  gap: 0.5rem;
  min-width: auto;
  min-height: auto;

  &:hover {
    background: var(--accent-light);
    border-color: var(--accent-primary);
    transform: translateX(-4px);
    box-shadow: var(--shadow-md);
  }

  &:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
`;

const BackIcon = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
`;

const PlantHeader = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const PlantName = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const PlantCategory = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--accent-gradient);
  color: white;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: var(--shadow-glow);

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ModelSection = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 1rem;
  }
`;

const StructuredSection = styled(motion.section)`
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`;

const SectionHeading = styled.h3`
  font-size: 1.3rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '🌿';
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.5rem 0;
    color: var(--text-secondary);
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent-primary);
      font-weight: bold;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }
`;

const InfoSection = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    border-radius: 1rem;
    padding: 1.5rem;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled(motion.li)`
  margin-bottom: 1rem;
  padding: 1.2rem;
  background: var(--bg-tertiary);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-light);
    transform: translateX(4px);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 0.8rem;
  }
`;

const InfoLabel = styled.strong`
  display: block;
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const InfoValue = styled.p`
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

function PlantDetail() {
  const { id } = useParams();
  const plant = plants.find(p => p.id === Number(id));
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id]);

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/plants');
    }
  };

  if (!plant) {
    return (
      <PageContainer
        initial="initial"
        animate="animate"
        variants={pageVariants}
        style={{ textAlign: 'center', padding: '4rem 2rem' }}
      >
        <h2>Plant not found</h2>
        <p>The plant you're looking for doesn't exist.</p>
        <BackButton onClick={() => navigate('/plants')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          ← Back to Plants
        </BackButton>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      <BackButton 
        onClick={handleBackNavigation} 
        aria-label="Go back" 
        title="Back"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </BackButton>
      
      <SEO
        title={plant.name}
        description={plant.description}
        image={plant.image}
        type="article"
      />
      <PlantHeader>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <PlantName
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {plant.name}
            </PlantName>
            <PlantCategory
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {plant.category}
            </PlantCategory>
          </div>
          <FavoriteButton plantId={plant.id} />
        </div>
      </PlantHeader>

      <ContentGrid>
        <ModelSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionTitle>3D Model</SectionTitle>
          <OptimizedPlantModel 
            modelPath={plant.model} 
            scale={plant.scale || 1} 
            position={plant.position || [0, 0, 0]}
            fallbackImage={plant.image}
          />
        </ModelSection>

        <InfoSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle>Overview</SectionTitle>
          <InfoList>
            <InfoItem
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <InfoLabel>Scientific Name</InfoLabel>
              <InfoValue>{plant.scientificName}</InfoValue>
            </InfoItem>
            <InfoItem
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              <InfoLabel>Description</InfoLabel>
              <InfoValue>{plant.description}</InfoValue>
            </InfoItem>
          </InfoList>
        </InfoSection>
      </ContentGrid>

      {plant.medicinalProperties && (
        <StructuredSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <SectionHeading>Medicinal Properties</SectionHeading>
          <BulletList>
            {plant.medicinalProperties.map((prop, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                {prop}
              </motion.li>
            ))}
          </BulletList>
        </StructuredSection>
      )}

      {plant.uses && (
        <StructuredSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <SectionHeading>Traditional Uses</SectionHeading>
          <BulletList>
            {plant.uses.map((use, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + idx * 0.1 }}
              >
                {use}
              </motion.li>
            ))}
          </BulletList>
        </StructuredSection>
      )}

      {plant.funFacts && (
        <StructuredSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <SectionHeading>Interesting Facts</SectionHeading>
          <BulletList>
            {plant.funFacts.map((fact, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
              >
                {fact}
              </motion.li>
            ))}
          </BulletList>
        </StructuredSection>
      )}
    </PageContainer>
  );
}

export default PlantDetail; 