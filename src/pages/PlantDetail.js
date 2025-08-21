import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OptimizedPlantModel from '../components/OptimizedPlantModel';
import plants from '../data/plants';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #27ae60;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;
  min-width: auto;
  min-height: auto;

  &:hover {
    color: #219a52;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
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

const PlantName = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const PlantCategory = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #27ae60;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.9rem;

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

const ModelSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MobileNotice = styled.div`
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: center;

  strong {
    font-weight: 700;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
  }
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    padding: 1.5rem;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

const InfoLabel = styled.strong`
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const InfoValue = styled.p`
  color: #7f8c8d;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

function PlantDetail() {
  const { id } = useParams();
  const plant = plants.find(p => p.id === Number(id));
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    // Try to go back in history, fallback to plants page
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/plants');
    }
  };

  if (!plant) {
    return <PageContainer>Plant not found.</PageContainer>;
  }

  return (
    <PageContainer>
      <BackButton onClick={handleBackNavigation} aria-label="Go back" title="Back">
        <BackIcon aria-hidden>←</BackIcon>
      </BackButton>
      <PlantHeader>
        <PlantName>{plant.name}</PlantName>
        <PlantCategory>{plant.category}</PlantCategory>
      </PlantHeader>

      <ContentGrid>
        <ModelSection>
          <SectionTitle>3D Model</SectionTitle>
          <MobileNotice>
            📱 <strong>Mobile Tip:</strong> Use touch gestures to rotate, pinch to zoom, and swipe to explore the 3D model
          </MobileNotice>
          <OptimizedPlantModel modelPath={plant.model} scale={plant.scale || 1} position={plant.position || [0, 0, 0]} />
        </ModelSection>

        <InfoSection>
          <SectionTitle>Plant Information</SectionTitle>
          <InfoList>
            <InfoItem>
              <InfoLabel>Scientific Name</InfoLabel>
              <InfoValue>{plant.scientificName}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Description</InfoLabel>
              <InfoValue>{plant.description}</InfoValue>
            </InfoItem>
            {plant.medicinalProperties && (
              <InfoItem>
                <InfoLabel>Medicinal Properties</InfoLabel>
                <InfoValue>
                  {plant.medicinalProperties.map((prop, idx) => (
                    <span key={idx}>{prop}{idx < plant.medicinalProperties.length - 1 ? ', ' : ''}</span>
                  ))}
                </InfoValue>
              </InfoItem>
            )}
            {plant.uses && (
              <InfoItem>
                <InfoLabel>Traditional Uses</InfoLabel>
                <InfoValue>
                  {plant.uses.map((use, idx) => (
                    <span key={idx}>{use}{idx < plant.uses.length - 1 ? ', ' : ''}</span>
                  ))}
                </InfoValue>
              </InfoItem>
            )}
            {plant.funFacts && (
              <InfoItem>
                <InfoLabel>Fun Facts</InfoLabel>
                <InfoValue>
                  <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    {plant.funFacts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </InfoValue>
              </InfoItem>
            )}
          </InfoList>
        </InfoSection>
      </ContentGrid>
    </PageContainer>
  );
}

export default PlantDetail; 