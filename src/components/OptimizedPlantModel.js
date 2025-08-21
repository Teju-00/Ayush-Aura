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

const MobileOptimizationNotice = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(39, 174, 96, 0.9);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  z-index: 10;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload the model
    if (modelPath && !modelCache.has(modelPath)) {
      modelCache.set(modelPath, true);
    }
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

  // Preflight check to fail fast if the GLB URL is not reachable
  useEffect(() => {
    let aborted = false;
    if (!modelPath) return;

    setIsLoading(true);
    fetch(modelPath, { method: 'HEAD' })
      .then((response) => {
        if (aborted) return;
        if (!response.ok) {
          setHasError(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (!aborted) setHasError(true);
        setIsLoading(false);
      });

    return () => {
      aborted = true;
    };
  }, [modelPath]);

  const handleModelError = () => {
    setHasError(true);
  };

  // Only show error if model actually failed to load
  if (hasError) {
    return (
      <ModelContainer>
        <LoadingContainer>
          <LoadingText>Failed to load 3D model</LoadingText>
        </LoadingContainer>
      </ModelContainer>
    );
  }

  return (
    <ModelContainer>
      {isMobile && (
        <MobileOptimizationNotice>
          📱 Mobile Optimized
        </MobileOptimizationNotice>
      )}
      
      <Canvas 
        camera={{ 
          position: [0, 0, 5], 
          fov: isMobile ? 50 : 45, // Slightly wider FOV for mobile
          near: 0.1, 
          far: 1000 
        }} 
        shadows={!isMobile} // Disable shadows on mobile for better performance
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
          stencil: false, // Disable stencil buffer on mobile
          depth: true
        }}
        dpr={isMobile ? 1 : [1, Math.min((window.devicePixelRatio || 1), 2)]} // Lower DPR on mobile
        onCreated={({ gl }) => {
          gl.setClearColor(0xf8f9fa, 1);
          if (!isMobile) {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = 2; // PCFSoftShadowMap
          }
          // Optimize for mobile
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
              onError={handleModelError}
            />
          </Center>
          <OrbitControls 
            enablePan={!isMobile} // Disable pan on mobile for better touch experience
            enableZoom 
            enableRotate 
            maxDistance={isMobile ? 8 : 10}
            minDistance={isMobile ? 1.5 : 2}
            dampingFactor={isMobile ? 0.1 : 0.05}
            rotateSpeed={isMobile ? 0.5 : 1} // Slower rotation on mobile
            zoomSpeed={isMobile ? 0.8 : 1} // Slower zoom on mobile
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