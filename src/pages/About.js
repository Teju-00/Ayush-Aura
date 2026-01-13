import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import FeedbackForm from '../components/FeedbackForm';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = styled(motion.section)`
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Text = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const CreatorCard = styled(motion.div)`
  background: var(--accent-gradient);
  color: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-glow);
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 1rem;
  }
`;

const CreatorName = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CreatorRole = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid var(--border-color);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
`;

const ListItem = styled.li`
  color: var(--text-secondary);
  padding: 0.6rem 0;
  display: flex;
  align-items: flex-start;
  line-height: 1.6;
  transition: color 0.3s ease;
  
  &:before {
    content: "🌿";
    margin-right: 0.75rem;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  &:hover {
    color: var(--accent-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
`;

function About() {
  return (
    <PageContainer>
      <SEO
        title="About Ayush Aura"
        description="Learn about Ayush Aura, a comprehensive platform for exploring AYUSH medicinal plants. Created by Kothuru Tarakeswar."
      />
      <Title>About Ayush Aura</Title>

      <CreatorCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CreatorName>Kothuru Tarakeswar</CreatorName>
        <CreatorRole>Creator & Developer</CreatorRole>
        <Text style={{ color: 'rgba(255, 255, 255, 0.95)', marginBottom: '1rem' }}>
          Ayush Aura is a passion project dedicated to preserving and sharing the rich knowledge of 
          traditional AYUSH medicinal plants. Combining modern web technologies with ancient wisdom, 
          this platform aims to make herbal knowledge accessible to everyone.
        </Text>
        <SocialLinks>
          <SocialLink
            href="https://linkedin.com/in/kothuru-tejashwar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </SocialLink>
          <SocialLink
            href="https://github.com/Teju-00"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </SocialLink>
        </SocialLinks>
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <strong>Tech Stack:</strong>
          </Text>
          <TechStack>
            <TechTag>React</TechTag>
            <TechTag>Three.js</TechTag>
            <TechTag>Framer Motion</TechTag>
            <TechTag>Styled Components</TechTag>
            <TechTag>React Router</TechTag>
            <TechTag>PWA</TechTag>
          </TechStack>
        </div>
      </CreatorCard>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Subtitle>What is AYUSH?</Subtitle>
        <Text>
          AYUSH is an acronym for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.
          These are the traditional systems of medicine practiced in India and other parts of the world.
          Each system has its unique approach to health and healing, with a rich history of using medicinal plants.
        </Text>
      </Section>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Subtitle>Our Mission</Subtitle>
        <Text>
          Our mission is to create a comprehensive digital repository of medicinal plants used in AYUSH systems,
          making this valuable knowledge accessible to everyone. We combine traditional wisdom with modern technology
          through interactive 3D models and detailed information about each plant.
        </Text>
      </Section>

      <Section>
        <Subtitle>What We Offer</Subtitle>
        <List>
          <ListItem>Interactive 3D models of 100 medicinal plants</ListItem>
          <ListItem>Detailed information about each plant's medicinal properties</ListItem>
          <ListItem>Traditional uses and applications in AYUSH systems</ListItem>
          <ListItem>Cultivation guidelines and precautions</ListItem>
          <ListItem>Search and filter functionality to find specific plants</ListItem>
        </List>
      </Section>

      <Section>
        <Subtitle>Traditional Systems</Subtitle>
        <Text>
          Our collection covers plants from all five traditional systems:
        </Text>
        <List>
          <ListItem>
            <strong>Ayurveda:</strong> The ancient Indian system of medicine that emphasizes balance and natural healing
          </ListItem>
          <ListItem>
            <strong>Unani:</strong> A traditional system of medicine that originated in Greece and was developed in the Middle East
          </ListItem>
          <ListItem>
            <strong>Siddha:</strong> One of the oldest systems of medicine, originating in South India
          </ListItem>
          <ListItem>
            <strong>Homeopathy:</strong> A system of alternative medicine based on the principle of "like cures like"
          </ListItem>
          <ListItem>
            <strong>Yoga & Naturopathy:</strong> Holistic approaches to health and wellness
          </ListItem>
        </List>
      </Section>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Subtitle>Disclaimer</Subtitle>
        <Text>
          The information provided on this website is for educational purposes only. It is not intended to be a substitute
          for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other
          qualified health provider with any questions you may have regarding a medical condition.
        </Text>
      </Section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '3rem' }}
      >
        <FeedbackForm />
      </motion.div>
    </PageContainer>
  );
}

export default About; 