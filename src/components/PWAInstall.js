import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InstallContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

const InstallButton = styled.button`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
    background: linear-gradient(135deg, #219a52, #27ae60);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
    min-width: 120px;
  }
`;

const InstallIcon = styled.span`
  font-size: 16px;
`;

const InstallText = styled.span`
  font-weight: 600;
`;

const InstallHint = styled.div`
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  max-width: 280px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '10px'});
  transition: all 0.3s ease;
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};

  @media (max-width: 768px) {
    max-width: 250px;
    font-size: 12px;
    padding: 10px 14px;
  }
`;

const HintTitle = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  color: #27ae60;
`;

const HintText = styled.div`
  line-height: 1.4;
  opacity: 0.9;
`;

const CloseHint = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 16px;
  padding: 2px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowInstallButton(true);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      // Hide the install button
      setShowInstallButton(false);
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      // Mark as installed
      setIsInstalled(true);
      console.log('PWA was installed');
    };

    // Check if the app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setShowInstallButton(false);
        setIsInstalled(true);
      }
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Check if already installed
    checkIfInstalled();

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
      // Show hint for manual installation
      setShowHint(true);
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
  };

  const handleCloseHint = () => {
    setShowHint(false);
  };

  // Don't show the button if not supported, already installed, or if hint is showing
  if (!showInstallButton || isInstalled) {
    return null;
  }

  return (
    <InstallContainer>
      <InstallButton onClick={handleInstallClick}>
        <InstallIcon>📱</InstallIcon>
        <InstallText>Install App</InstallText>
      </InstallButton>
      
      <InstallButton onClick={handleShowHint} style={{ 
        background: 'rgba(44, 62, 80, 0.8)', 
        fontSize: '12px',
        padding: '8px 16px',
        minWidth: 'auto'
      }}>
        <InstallIcon>❓</InstallIcon>
        <InstallText>How to Install</InstallText>
      </InstallButton>

      {showHint && (
        <InstallHint $isVisible={showHint}>
          <CloseHint onClick={handleCloseHint}>×</CloseHint>
          <HintTitle>📱 Install Instructions</HintTitle>
          <HintText>
            <strong>Android:</strong> Tap menu → "Add to Home Screen"<br/>
            <strong>iPhone:</strong> Tap Share → "Add to Home Screen"<br/>
            <strong>Desktop:</strong> Look for install prompt in address bar
          </HintText>
        </InstallHint>
      )}
    </InstallContainer>
  );
};

export default PWAInstall;
