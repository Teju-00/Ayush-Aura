// Invisible utility component: performance monitoring + SW update banner handler
import React, { useEffect, useState } from 'react';

const bannerStyle = {
  position: 'fixed',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
  color: '#fff',
  padding: '0.75rem 1rem',
  borderRadius: '999px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  zIndex: 2000,
  boxShadow: '0 6px 20px rgba(39, 174, 96, 0.35)'
};

const buttonStyle = {
  background: '#ffffff',
  color: '#27ae60',
  border: 'none',
  borderRadius: '999px',
  padding: '0.5rem 0.9rem',
  cursor: 'pointer',
  fontWeight: 600,
  boxShadow: '0 2px 10px rgba(255,255,255,0.25)'
};

const PerformanceMonitor = () => {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    // Performance monitoring (silent)
    if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
      try {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        window.pageLoadTime = loadTime;
      } catch {}
    }

    // Listen for SW update availability event from index.html
    const onUpdate = () => setUpdateReady(true);
    window.addEventListener('sw-update-available', onUpdate);
    return () => window.removeEventListener('sw-update-available', onUpdate);
  }, []);

  const activateUpdate = () => {
    try {
      if (window.__SW_WAITING) {
        window.__SW_WAITING.postMessage({ type: 'SKIP_WAITING' });
      }
    } catch {}
  };

  if (!updateReady) return null;

  return (
    <div style={bannerStyle} role="status" aria-live="polite">
      <span>New version available</span>
      <button style={buttonStyle} onClick={activateUpdate}>Update</button>
    </div>
  );
};

export default PerformanceMonitor;
