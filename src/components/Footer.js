import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  padding: 3rem 2rem 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(39, 174, 96, 0.5), transparent);
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 1.5rem;
    margin-top: 3rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Role = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
  margin: 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const BrandName = styled.span`
  color: #27ae60;
  font-weight: 600;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: ${props => props.$center ? 'center' : 'flex-start'};

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${props => props.$color || 'rgba(39, 174, 96, 0.3)'};
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.1);
    border-color: ${props => props.$color || '#27ae60'};
    box-shadow: 0 8px 20px ${props => props.$color ? `${props.$color}40` : 'rgba(39, 174, 96, 0.4)'};
  }

  &:hover::before {
    width: 100%;
    height: 100%;
  }

  svg, span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 640px) {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.85rem;
  }
`;

const IconWrapper = styled.span`
  display: inline-block;
  line-height: 1;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Name>Kothuru Tarakeswar</Name>
          <Role>
            Developer / Creator — <BrandName>Ayush Aura</BrandName>
          </Role>
        </FooterSection>
        
        <FooterSection>
          <SocialLinks $center={false}>
            <SocialLink
              href="https://linkedin.com/in/kothuru-tejashwar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              $color="#0077b5"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </IconWrapper>
            </SocialLink>
            
            <SocialLink
              href="https://github.com/Teju-00"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              $color="#333"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconWrapper>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </IconWrapper>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Ayush Aura. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
