import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ModelViewerContainer = styled.div`
  width: 100%;
  height: 400px;
  background: var(--bg-tertiary);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
`;

const StyledModelViewer = styled('model-viewer')`
  width: 100%;
  height: 100%;
  background: transparent;
  --poster-color: transparent;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  z-index: ${props => props.$loading ? 10 : -1};
  opacity: ${props => props.$loading ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FullscreenButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: var(--accent-gradient);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: var(--shadow-glow);
  z-index: 5;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(39, 174, 96, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ModelViewer = ({ 
  src, 
  alt = '3D Plant Model',
  poster,
  fallbackImage,
  ...props 
}) => {
  const modelViewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Load model-viewer script if not already loaded
    if (!window.customElements?.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
      script.onerror = () => {
        console.warn('Failed to load model-viewer, using fallback');
        setHasError(true);
      };
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('error', handleError);

    return () => {
      modelViewer.removeEventListener('load', handleLoad);
      modelViewer.removeEventListener('error', handleError);
    };
  }, []);

  const handleFullscreen = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.requestFullscreen?.() || 
      modelViewerRef.current.webkitRequestFullscreen?.() ||
      modelViewerRef.current.mozRequestFullScreen?.() ||
      modelViewerRef.current.msRequestFullscreen?.();
    }
  };

  if (hasError && fallbackImage) {
    return (
      <ModelViewerContainer>
        <img 
          src={fallbackImage} 
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </ModelViewerContainer>
    );
  }

  return (
    <ModelViewerContainer>
      <LoadingOverlay $loading={isLoading}>
        <LoadingSpinner />
        <div>Loading 3D Model...</div>
      </LoadingOverlay>
      
      <StyledModelViewer
        ref={modelViewerRef}
        src={src}
        alt={alt}
        poster={poster}
        camera-controls
        auto-rotate
        auto-rotate-delay="1000"
        interaction-policy="allow-when-focused"
        ar
        ar-modes="webxr scene-viewer quick-look"
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        {...props}
      />
      
      <FullscreenButton
        onClick={handleFullscreen}
        aria-label="View in fullscreen"
        title="Fullscreen"
      >
        ⛶
      </FullscreenButton>
    </ModelViewerContainer>
  );
};

export default ModelViewer;
