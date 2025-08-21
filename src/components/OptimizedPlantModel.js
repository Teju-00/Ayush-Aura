import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, Center, Preload } from '@react-three/drei';
import styled from 'styled-components';

const ModelContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #f8f9fa;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
`;

const LoadingText = styled.div`
  color: #666;
  font-size: 1.2rem;
  background: rgba(255,255,255,0.9);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #27ae60;
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

// Model cache to prevent re-loading the same models
const modelCache = new Map();

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

// Preload component for better performance
function ModelPreloader({ modelPath }) {
  useGLTF.preload(modelPath);
  return null;
}

function OptimizedPlantModel({ modelPath, scale = 1, position = [0, 0, 0] }) {
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Preload the model
    if (modelPath && !modelCache.has(modelPath)) {
      modelCache.set(modelPath, true);
    }
  }, [modelPath]);

  // Detect mobile devices to avoid heavy 3D rendering on low-end devices
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

  // Preflight check to fail fast if the GLB URL is not reachable (avoids infinite loading)
  useEffect(() => {
    let aborted = false;
    if (!modelPath) return;

    fetch(modelPath, { method: 'HEAD' })
      .then((response) => {
        if (aborted) return;
        if (!response.ok) {
          setHasError(true);
        }
      })
      .catch(() => {
        if (!aborted) setHasError(true);
      });

    return () => {
      aborted = true;
    };
  }, [modelPath]);

  const handleModelError = () => {
    setHasError(true);
  };

  // Fallback for mobile devices or if model errors out
  if (hasError || isMobile) {
    return (
      <ModelContainer>
        <LoadingContainer>
          <LoadingText>{isMobile ? '3D model view is optimized for desktop devices' : 'Failed to load 3D model'}</LoadingText>
        </LoadingContainer>
      </ModelContainer>
    );
  }

  return (
    <ModelContainer>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }} 
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, Math.min((window.devicePixelRatio || 1), 2)]}
        onCreated={({ gl }) => {
          gl.setClearColor(0xf8f9fa, 1);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = 2; // PCFSoftShadowMap
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight
          position={[-5, -2, -7.5]}
          intensity={0.7}
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
              onError={handleModelError}
            />
          </Center>
          <OrbitControls 
            enablePan 
            enableZoom 
            enableRotate 
            maxDistance={10}
            minDistance={2}
            dampingFactor={0.05}
          />
          <Environment preset="apartment" background={false} />
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Preload the model for better performance */}
      <ModelPreloader modelPath={modelPath} />
    </ModelContainer>
  );
}

export default OptimizedPlantModel; 