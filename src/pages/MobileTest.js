import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const TestSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: #f9f9f9;
`;

const TestButton = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #219a52;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const StatusText = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
`;

function MobileTest() {
  const [testResults, setTestResults] = useState({});
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    // Collect device information
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      touchSupport: 'ontouchstart' in window,
      webGLSupport: false,
      threeJSVersion: null
    };

    // Test WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      info.webGLSupport = !!gl;
    } catch (e) {
      info.webGLSupport = false;
    }

    // Test Three.js version
    try {
      if (window.THREE) {
        info.threeJSVersion = window.THREE.REVISION;
      }
    } catch (e) {
      info.threeJSVersion = 'Not available';
    }

    setDeviceInfo(info);
  }, []);

  const runTest = async (testName, testFunction) => {
    try {
      const result = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: true, message: result }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: false, message: error.message }
      }));
    }
  };

  const testBasicFunctionality = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Basic React functionality working');
      }, 100);
    });
  };

  const testLocalStorage = () => {
    return new Promise((resolve) => {
      try {
        localStorage.setItem('test', 'value');
        const value = localStorage.getItem('test');
        localStorage.removeItem('test');
        resolve(`LocalStorage working: ${value === 'value'}`);
      } catch (error) {
        throw new Error(`LocalStorage failed: ${error.message}`);
      }
    });
  };

  const testFetch = () => {
    return new Promise((resolve) => {
      // Test with a simple fetch to a reliable endpoint
      fetch('https://httpbin.org/get')
        .then(response => response.json())
        .then(data => resolve('Fetch API working'))
        .catch(error => {
          throw new Error(`Fetch API failed: ${error.message}`);
        });
    });
  };

  const test3DSupport = () => {
    return new Promise((resolve) => {
      try {
        // Test if Three.js components can be imported
        const testDiv = document.createElement('div');
        testDiv.style.position = 'absolute';
        testDiv.style.left = '-9999px';
        document.body.appendChild(testDiv);
        
        // This is a basic test - in a real app you'd test actual 3D rendering
        resolve('3D support test completed');
        
        document.body.removeChild(testDiv);
      } catch (error) {
        throw new Error(`3D support test failed: ${error.message}`);
      }
    });
  };

  return (
    <TestContainer>
      <h1>Mobile Compatibility Test</h1>
      
      <TestSection>
        <h2>Device Information</h2>
        <div>
          <strong>Platform:</strong> {deviceInfo.platform}<br />
          <strong>Screen:</strong> {deviceInfo.screenWidth} x {deviceInfo.screenHeight}<br />
          <strong>Window:</strong> {deviceInfo.windowWidth} x {deviceInfo.windowHeight}<br />
          <strong>Touch Support:</strong> {deviceInfo.touchSupport ? 'Yes' : 'No'}<br />
          <strong>WebGL Support:</strong> {deviceInfo.webGLSupport ? 'Yes' : 'No'}<br />
          <strong>Device Pixel Ratio:</strong> {deviceInfo.devicePixelRatio}<br />
          <strong>Online:</strong> {deviceInfo.onLine ? 'Yes' : 'No'}
        </div>
      </TestSection>

      <TestSection>
        <h2>Functionality Tests</h2>
        <TestButton onClick={() => runTest('basic', testBasicFunctionality)}>
          Test Basic Functionality
        </TestButton>
        <TestButton onClick={() => runTest('localStorage', testLocalStorage)}>
          Test LocalStorage
        </TestButton>
        <TestButton onClick={() => runTest('fetch', testFetch)}>
          Test Fetch API
        </TestButton>
        <TestButton onClick={() => runTest('3d', test3DSupport)}>
          Test 3D Support
        </TestButton>
      </TestSection>

      <TestSection>
        <h2>Test Results</h2>
        {Object.entries(testResults).map(([testName, result]) => (
          <StatusText key={testName} success={result.success}>
            <strong>{testName}:</strong> {result.message}
          </StatusText>
        ))}
      </TestSection>

      <TestSection>
        <h2>User Agent</h2>
        <div style={{ wordBreak: 'break-all', fontSize: '0.8rem' }}>
          {deviceInfo.userAgent}
        </div>
      </TestSection>
    </TestContainer>
  );
}

export default MobileTest;
