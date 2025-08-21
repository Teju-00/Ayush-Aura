import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  &:hover {
    color: #27ae60;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  &:hover {
    color: #27ae60;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    text-align: center;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #2c3e50;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prefetch route bundles on intent (hover/focus)
  const prefetchRoute = (route) => () => {
    try {
      switch (route) {
        case 'home':
          import('../pages/Home');
          break;
        case 'plants':
          import('../pages/PlantList');
          break;
        case 'about':
          import('../pages/About');
          break;
        default:
          break;
      }
    } catch {}
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/" onClick={closeMenu}>AYUSH Herbal Plants</Logo>
        <MobileMenuButton 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        <NavLinks id="primary-navigation" isOpen={isMenuOpen}>
          <NavLink 
            to="/" 
            onClick={closeMenu}
            onMouseEnter={prefetchRoute('home')} 
            onFocus={prefetchRoute('home')}
          >Home</NavLink>
          <NavLink 
            to="/plants" 
            onClick={closeMenu}
            onMouseEnter={prefetchRoute('plants')} 
            onFocus={prefetchRoute('plants')}
          >Plants</NavLink>
          <NavLink 
            to="/about" 
            onClick={closeMenu}
            onMouseEnter={prefetchRoute('about')} 
            onFocus={prefetchRoute('about')}
          >About</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 