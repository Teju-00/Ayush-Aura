import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, Center } from '@react-three/drei';
import styled from 'styled-components';

const ModelContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #f8f9fa;
  border-radius: 1rem;
  overflow: hidden;
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    height: 300px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const LoadingText = styled.div`
  color: #666;
  font-size: 1.2rem;
  background: rgba(255,255,255,0.8);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  
  /* Mobile text sizing */
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const MobileFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f8f9fa;
  color: #666;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
`;

function Model({ modelPath, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} position={position} castShadow receiveShadow />;
}

function PlantModel({ modelPath, scale = 1, position = [0, 0, 0] }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Error boundary for 3D models
  const handleError = (error) => {
    console.warn('3D Model loading error:', error);
    setHasError(true);
  };

  // Show fallback on mobile or if there's an error
  if (isMobile || hasError) {
    return (
      <ModelContainer>
        <MobileFallback>
          <div>
            <h3>Plant Model</h3>
            <p>3D model view optimized for desktop</p>
            <p>Switch to desktop for full 3D experience</p>
          </div>
        </MobileFallback>
      </ModelContainer>
    );
  }

  return (
    <ModelContainer>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }} 
        shadows
        onError={handleError}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Fill light for softer shadows */}
        <directionalLight
          position={[-5, -2, -7.5]}
          intensity={0.7}
          color="#b0c4de"
        />
        <Suspense fallback={
          <Html center>
            <LoadingText>Loading 3D Model...</LoadingText>
          </Html>
        }>
          <Center>
            <Model modelPath={modelPath} scale={scale} position={position} />
          </Center>
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            enableRotate={true}
            maxDistance={20}
            minDistance={2}
          />
          <Environment preset="apartment" background={false} />
        </Suspense>
      </Canvas>
    </ModelContainer>
  );
}

export default PlantModel; 