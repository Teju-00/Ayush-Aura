import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PerformanceMonitor from './components/PerformanceMonitor';
import OfflineIndicator from './components/OfflineIndicator';
import PWAInstall from './components/PWAInstall';
import { preloadModels } from './utils/modelPreloader';
import plants from './data/plants';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const PlantList = lazy(() => import('./pages/PlantList'));
const PlantDetail = lazy(() => import('./pages/PlantDetail'));
const About = lazy(() => import('./pages/About'));
const MyGarden = lazy(() => import('./pages/MyGarden'));
const MobileTest = lazy(() => import('./pages/MobileTest'));

function App() {
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

  // Error boundary
  if (hasError) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        fontFamily: 'Arial, sans-serif',
        color: '#333'
      }}>
        <h1>Something went wrong</h1>
        <p>Please refresh the page or try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <FavoritesProvider>
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
                <Route path="/garden" element={<MyGarden />} />
                <Route path="/mobile-test" element={<MobileTest />} />
              </Routes>
            </Suspense>
            <Footer />
            <PerformanceMonitor />
            <PWAInstall />
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
