import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const Nav = styled.nav`
  background: ${props => props.$scrolled 
    ? 'var(--bg-glass)' 
    : 'var(--bg-secondary)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: ${props => props.$scrolled 
    ? 'var(--shadow-md)' 
    : 'var(--shadow-sm)'};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid var(--border-color);

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
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
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
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-gradient);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
  }
  
  &:hover {
    color: var(--accent-primary);
  }
  
  &:hover::after {
    width: 100%;
  }
  
  &.active {
    color: var(--accent-primary);
  }
  
  &.active::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    font-size: 1.1rem;
    
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

const ThemeToggle = styled.button`
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 1rem;
  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--accent-light);
    border-color: var(--accent-primary);
    transform: scale(1.1) rotate(15deg);
    box-shadow: var(--shadow-glow);
  }

  &:active {
    transform: scale(0.95) rotate(15deg);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
    margin-left: 0.5rem;
  }
`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
          <MobileMenuButton 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </div>
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