import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OfflineBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  transform: translateY(${props => props.$isVisible ? '0' : '-100%'});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }
`;

const OfflineIcon = styled.span`
  font-size: 1rem;
`;

const OfflineText = styled.span`
  flex: 1;
`;

const RetryButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setIsVisible(false);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setIsVisible(true);
    };

    // Check initial status
    if (!navigator.onLine) {
      setIsOffline(true);
      setIsVisible(true);
    }

    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (!isOffline) return null;

  return (
    <OfflineBanner $isVisible={isVisible}>
      <OfflineIcon>📶</OfflineIcon>
      <OfflineText>You're offline. Some features may be limited.</OfflineText>
      <RetryButton onClick={handleRetry}>Retry</RetryButton>
    </OfflineBanner>
  );
};

export default OfflineIndicator;
