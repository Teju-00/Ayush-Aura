import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import PerformanceMonitor from './src/components/PerformanceMonitor';
import OfflineIndicator from './src/components/OfflineIndicator';
import { preloadModels } from './src/utils/modelPreloader';
import plants from './src/data/plants';

// Lazy load pages for code splitting
const Home = lazy(() => import('./src/pages/Home'));
const PlantList = lazy(() => import('./src/pages/PlantList'));
const PlantDetail = lazy(() => import('./src/pages/PlantDetail'));
const About = lazy(() => import('./src/pages/About'));
const MobileTest = lazy(() => import('./src/pages/MobileTest'));

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Preload the first few models for better performance (only on desktop)
    if (!isMobile) {
      try {
        const firstModels = plants
          .slice(0, 5)
          .map((p) => p.model)
          .filter(Boolean);
        preloadModels(firstModels);
      } catch (error) {
        console.warn('Model preloading failed:', error);
      }
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <Router>
      <div className="App">
        <OfflineIndicator />
        <Navbar />
        <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plants" element={<PlantList />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/mobile-test" element={<MobileTest />} />
          </Routes>
        </Suspense>
        <PerformanceMonitor />
      </div>
    </Router>
  );
}

export default App;
