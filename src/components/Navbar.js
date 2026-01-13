import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${props => props.$scrolled 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1.25rem 2rem;
  box-shadow: ${props => props.$scrolled 
    ? '0 4px 24px rgba(0, 0, 0, 0.08)' 
    : '0 1px 3px rgba(0, 0, 0, 0.04)'};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid ${props => props.$scrolled 
    ? 'rgba(0, 0, 0, 0.08)' 
    : 'rgba(0, 0, 0, 0.05)'};

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
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
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  letter-spacing: -0.02em;
  
  &:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: ${props => props.isOpen ? '70px' : '-100%'};
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg-secondary);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 2rem 1rem;
    box-shadow: var(--shadow-lg);
    gap: 0;
    transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
`;

const NavLinkWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  padding: 0.5rem 0.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.01em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0.25rem;
    width: 0;
    height: 2.5px;
    background: var(--accent-gradient);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
  }
  
  &:hover {
    color: var(--accent-primary);
  }
  
  &:hover::after {
    width: calc(100% - 0.5rem);
  }
  
  &.active {
    color: var(--accent-primary);
    font-weight: 600;
  }
  
  &.active::after {
    width: calc(100% - 0.5rem);
  }

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    font-size: 1rem;
    
    &::after {
      display: none;
    }
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background: var(--accent-light);
      border-radius: 0.5rem;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--text-primary);
  padding: 0.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
  z-index: 1001;
  
  &:hover {
    color: var(--accent-primary);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

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

  const isActive = (path) => location.pathname === path;

  return (
    <Nav $scrolled={scrolled}>
      <NavContainer>
        <Logo to="/" onClick={closeMenu}>AYUSH Aura</Logo>
        <MobileMenuButton 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        <NavLinks id="primary-navigation" isOpen={isMenuOpen}>
          <NavLinkWrapper>
            <NavLink 
              to="/" 
              onClick={closeMenu}
              onMouseEnter={prefetchRoute('home')} 
              onFocus={prefetchRoute('home')}
              className={isActive('/') ? 'active' : ''}
            >Home</NavLink>
          </NavLinkWrapper>
          <NavLinkWrapper>
            <NavLink 
              to="/plants" 
              onClick={closeMenu}
              onMouseEnter={prefetchRoute('plants')} 
              onFocus={prefetchRoute('plants')}
              className={isActive('/plants') ? 'active' : ''}
            >Plants</NavLink>
          </NavLinkWrapper>
          <NavLinkWrapper>
            <NavLink 
              to="/garden" 
              onClick={closeMenu}
              className={isActive('/garden') ? 'active' : ''}
            >My Garden</NavLink>
          </NavLinkWrapper>
          <NavLinkWrapper>
            <NavLink 
              to="/about" 
              onClick={closeMenu}
              onMouseEnter={prefetchRoute('about')} 
              onFocus={prefetchRoute('about')}
              className={isActive('/about') ? 'active' : ''}
            >About</NavLink>
          </NavLinkWrapper>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 