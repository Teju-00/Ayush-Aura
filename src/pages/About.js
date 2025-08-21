import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
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
  color: #2c3e50;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Text = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
`;

const ListItem = styled.li`
  color: #7f8c8d;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  
  &:before {
    content: "•";
    color: #27ae60;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }
`;

function About() {
  return (
    <PageContainer>
      <Title>About AYUSH Herbal Plants</Title>

      <Section>
        <Subtitle>What is AYUSH?</Subtitle>
        <Text>
          AYUSH is an acronym for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.
          These are the traditional systems of medicine practiced in India and other parts of the world.
          Each system has its unique approach to health and healing, with a rich history of using medicinal plants.
        </Text>
      </Section>

      <Section>
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

      <Section>
        <Subtitle>Disclaimer</Subtitle>
        <Text>
          The information provided on this website is for educational purposes only. It is not intended to be a substitute
          for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other
          qualified health provider with any questions you may have regarding a medical condition.
        </Text>
      </Section>
    </PageContainer>
  );
}

export default About; 