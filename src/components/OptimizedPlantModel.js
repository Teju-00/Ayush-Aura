import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, Center } from '@react-three/drei';
import styled from 'styled-components';

const ModelContainer = styled.div`
  width: 100%;
  height: 400px;
  background: var(--bg-tertiary);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
`;

const LoadingText = styled.div`
  color: var(--text-secondary);
  font-size: 1.1rem;
  background: var(--bg-secondary);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
`;

const ErrorText = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const ErrorSubtext = styled.div`
  font-size: 0.9rem;
  color: var(--text-tertiary);
`;

function Model({ modelPath, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to prevent issues with multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  return (
    <primitive 
      object={clonedScene} 
      scale={scale} 
      position={position} 
      castShadow 
      receiveShadow 
    />
  );
}

function OptimizedPlantModel({ modelPath, scale = 1, position = [0, 0, 0], fallbackImage }) {
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // 👇 Detect placeholder (missing) 3D models
  const isPlaceholderModel =
  !modelPath ||
  (typeof modelPath === 'string' && modelPath.includes('example.com'));


  // Validate model path on mount and changes
  useEffect(() => {
    if (!modelPath || typeof modelPath !== 'string' || !modelPath.trim() || 
        modelPath === 'undefined' || modelPath === 'null') {
      console.warn('Invalid or missing model path:', modelPath);
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Reset error state when path changes
    setHasError(false);
    setIsLoading(true);
  }, [modelPath]);

  // Detect mobile devices for optimization
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test((userAgent || '').toLowerCase());
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Timeout fallback - if model doesn't load in 8 seconds, show error
  useEffect(() => {
    if (!modelPath || hasError || !isLoading) return;

    const timeout = setTimeout(() => {
      console.warn('3D Model loading timeout after 8 seconds:', modelPath);
      setHasError(true);
      setIsLoading(false);
    }, 8000);

    return () => {
      clearTimeout(timeout);
    };
  }, [modelPath, hasError, isLoading]);

// 🚫 If model is a placeholder → DO NOT load Canvas
if (isPlaceholderModel) {
  return (
    <ModelContainer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.95rem'
      }}
    >
      3D model not available
    </ModelContainer>
  );
}

  // Show error state with fallback image if available
  if (hasError) {
    if (fallbackImage) {
      return (
        <ModelContainer>
          <img 
            src={fallbackImage} 
            alt="Plant image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
          />
        </ModelContainer>
      );
    }
    
    return (
      <ModelContainer>
        <ErrorMessage>
          <ErrorText>3D model unavailable</ErrorText>
          <ErrorSubtext>Unable to load the 3D model at this time.</ErrorSubtext>
        </ErrorMessage>
      </ModelContainer>
    );
  }

  if (!modelPath || typeof modelPath !== 'string' || !modelPath.trim()) {
    return (
      <ModelContainer>
        <ErrorMessage>
          <ErrorText>3D model unavailable</ErrorText>
        </ErrorMessage>
      </ModelContainer>
    );
  }

  return (
    <ModelContainer>
      <Canvas 
        camera={{ 
          position: [0, 0, 5], 
          fov: isMobile ? 50 : 45,
          near: 0.1, 
          far: 1000 
        }} 
        shadows={!isMobile}
        gl={{ 
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={isMobile ? 1 : [1, Math.min((window.devicePixelRatio || 1), 2)]}
        onCreated={({ gl }) => {
          gl.setClearColor(0xf8f9fa, 1);
          if (!isMobile) {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = 2; // PCFSoftShadowMap
          }
          if (isMobile) {
            gl.setPixelRatio(1);
            gl.powerPreference = "default";
          }
        }}
      >
        <ambientLight intensity={isMobile ? 1.5 : 1.2} />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={isMobile ? 2.0 : 2.5}
          castShadow={!isMobile}
          shadow-mapSize-width={isMobile ? 512 : 1024}
          shadow-mapSize-height={isMobile ? 512 : 1024}
          shadow-camera-far={isMobile ? 25 : 50}
          shadow-camera-left={isMobile ? -5 : -10}
          shadow-camera-right={isMobile ? 5 : 10}
          shadow-camera-top={isMobile ? 5 : 10}
          shadow-camera-bottom={isMobile ? -5 : -10}
        />
        <directionalLight
          position={[-5, -2, -7.5]}
          intensity={isMobile ? 0.5 : 0.7}
          color="#b0c4de"
        />
        
        <Suspense fallback={
          <Html center>
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>Loading 3D Model...</LoadingText>
            </LoadingContainer>
          </Html>
        }>
          <Center>
            <Model 
              modelPath={modelPath} 
              scale={scale} 
              position={position}
            />
          </Center>
          <OrbitControls 
            enablePan={!isMobile}
            enableZoom 
            enableRotate 
            maxDistance={isMobile ? 8 : 10}
            minDistance={isMobile ? 1.5 : 2}
            dampingFactor={isMobile ? 0.1 : 0.05}
            rotateSpeed={isMobile ? 0.5 : 1}
            zoomSpeed={isMobile ? 0.8 : 1}
          />
          <Environment preset="apartment" background={false} />
        </Suspense>
      </Canvas>
    </ModelContainer>
  );
}

export default OptimizedPlantModel;
