import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
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
  padding: 5rem 2rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(39, 174, 96, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 1024px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin-bottom: 2rem;
    border-radius: 1rem;
  }

  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #16a085 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #5a6c5d;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out 0.2s both;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out 0.4s both;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1.1rem 2.5rem;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
  position: relative;
  overflow: hidden;

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
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.4);
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(1);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 640px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
  }
`;

const DownloadAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.1rem 2.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #27ae60;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #27ae60;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    transition: width 0.3s ease;
    z-index: 0;
  }

  span {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
    border-color: #2ecc71;
  }

  &:hover::before {
    width: 100%;
  }

  &:hover span {
    color: white;
  }

  &:active {
    transform: translateY(-1px) scale(1);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 640px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
  }
`;


const MobileNotice = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0.5rem;
  }

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const PlantCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    background: linear-gradient(135deg, rgba(39, 174, 96, 0.05) 0%, rgba(46, 204, 113, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 32px rgba(39, 174, 96, 0.25);
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
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
    // Since the mobile app hasn't been created yet, show helpful information
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/android/i.test(userAgent)) {
      alert('📱 Mobile App Coming Soon!\n\nWe\'re currently developing the AYUSH Herbal Plants mobile app.\n\nFor now, you can:\n• Use this website (works great on mobile!)\n• Add to home screen for app-like experience\n• Get notified when the app launches\n\nExpected launch: Coming Soon!');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      alert('📱 Mobile App Coming Soon!\n\nWe\'re currently developing the AYUSH Herbal Plants mobile app.\n\nFor now, you can:\n• Use this website (works great on mobile!)\n• Add to home screen for app-like experience\n• Get notified when the app launches\n\nExpected launch: Coming Soon!');
    } else {
      // Desktop - show both options
      alert('📱 Mobile App Coming Soon!\n\nWe\'re currently developing the AYUSH Herbal Plants mobile app.\n\nFor now, you can:\n• Use this website (works great on mobile!)\n• Add to home screen for app-like experience\n• Get notified when the app launches\n\nExpected launch: Coming Soon!');
    }
  };

  return (
    <HomeContainer>
      <SEO
        title="Discover the Power of AYUSH Herbal Plants"
        description="Explore our comprehensive collection of 100 medicinal plants, each with detailed 3D models and traditional healing properties."
        image="https://ybouzuswyfixyzyewepw.supabase.co/storage/v1/object/public/images/tulsi.jpg"
      />
      <HeroSection>
        <Title>Discover the Power of AYUSH Herbal Plants</Title>
        <Subtitle>
          Explore our comprehensive collection of 100 medicinal plants, each with detailed 3D models
          and traditional healing properties.
        </Subtitle>
        <ButtonGroup>
          <CTAButton to="/plants">Explore Plants</CTAButton>
          <DownloadAppButton onClick={handleDownloadClick}>
            <span>Mobile App Coming Soon</span>
          </DownloadAppButton>
        </ButtonGroup>
        
        <MobileNotice>
          📱 <strong>Mobile Tip:</strong> This website works great on mobile! You can add it to your home screen for an app-like experience.
        </MobileNotice>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Featured Plants</SectionTitle>
        <PlantGrid>
          {featuredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <OptimizedImage 
                src={plant.image} 
                alt={plant.name} 
                height="200px"
                borderRadius="1rem 1rem 0 0"
                hoverZoom={true}
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