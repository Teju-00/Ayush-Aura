import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #27ae60;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const DownloadAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
    background: linear-gradient(135deg, #27ae60, #219a52);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const DownloadText = styled.span`
  font-weight: 600;
`;

const FeaturedSection = styled.section`
  margin-top: 4rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0.5rem;
  }
`;

const PlantCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    border-radius: 0.5rem;
  }
`;

const PlantInfo = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PlantName = styled.h3`
  margin: 0 0 0.5rem;
  color: #2c3e50;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PlantDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

function Home() {
  const featuredPlants = [
    {
      id: 1,
      name: 'Tulsi (Holy Basil)',
      description: 'Known for its medicinal properties and spiritual significance in Ayurveda.',
      image: "https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/tulsi.jpg"
    },
    {
      id: 2,
      name: 'Ashwagandha',
      description: 'An adaptogenic herb used for stress relief and vitality.',
      image: 'https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/ashwagandha.jpg'
    },
    {
      id: 3,
      name: 'Neem',
      description: 'A versatile medicinal plant with powerful antibacterial properties.',
      image: 'https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/neem.jpg'
    }
  ];

  const handleDownloadClick = () => {
    // Detect platform and redirect to appropriate app store
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/android/i.test(userAgent)) {
      // Redirect to Google Play Store (replace with actual app link)
      window.open('https://play.google.com/store/apps/details?id=com.ayush.herbalplants', '_blank');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      // Redirect to Apple App Store (replace with actual app link)
      window.open('https://apps.apple.com/app/ayush-herbal-plants/id123456789', '_blank');
    } else {
      // Desktop - show both options
      alert('Download AYUSH Herbal Plants App:\n\nAndroid: Google Play Store\niOS: Apple App Store');
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <Title>Discover the Power of AYUSH Herbal Plants</Title>
        <Subtitle>
          Explore our comprehensive collection of 100 medicinal plants, each with detailed 3D models
          and traditional healing properties.
        </Subtitle>
        <ButtonGroup>
          <CTAButton to="/plants">Explore Plants</CTAButton>
          <DownloadAppButton onClick={handleDownloadClick}>
            <DownloadText>Download Mobile App</DownloadText>
          </DownloadAppButton>
        </ButtonGroup>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Featured Plants</SectionTitle>
        <PlantGrid>
          {featuredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <OptimizedImage 
              src={plant.image} 
              alt={plant.name} 
              height="200px"
              borderRadius="1rem 1rem 0 0"
            />
              <PlantInfo>
                <PlantName>{plant.name}</PlantName>
                <PlantDescription>{plant.description}</PlantDescription>
              </PlantInfo>
            </PlantCard>
          ))}
        </PlantGrid>
      </FeaturedSection>
    </HomeContainer>
  );
}

export default Home; 