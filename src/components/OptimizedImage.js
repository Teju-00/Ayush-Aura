import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || '200px'};
  background: #f0f0f0;
  border-radius: ${props => props.borderRadius || '0.5rem'};
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease;
  border-radius: ${props => props.borderRadius || '0.5rem'};
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: ${props => props.borderRadius || '0.5rem'};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
  font-size: 0.9rem;
  border-radius: ${props => props.borderRadius || '0.5rem'};
`;

const OptimizedImage = ({ 
  src, 
  alt, 
  height = '200px', 
  borderRadius = '0.5rem',
  className,
  onLoad,
  onError 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (src && src.trim() !== '') {
      setImageSrc(src);
      setLoaded(false);
      setError(false);
    } else {
      setImageSrc('');
      setLoaded(false);
      setError(true);
    }
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  return (
    <ImageContainer height={height} borderRadius={borderRadius} className={className}>
      {!error && imageSrc && imageSrc.trim() !== '' && (
        <StyledImage
          src={imageSrc}
          alt={alt}
          $loaded={loaded}
          borderRadius={borderRadius}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
      {!loaded && !error && (
        <LoadingPlaceholder borderRadius={borderRadius}>
          <span>Loading...</span>
        </LoadingPlaceholder>
      )}
      {error && (
        <ErrorPlaceholder borderRadius={borderRadius}>
          <span>Image not available</span>
        </ErrorPlaceholder>
      )}
    </ImageContainer>
  );
};

export default OptimizedImage; 