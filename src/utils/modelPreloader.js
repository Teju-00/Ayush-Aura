import { useGLTF } from '@react-three/drei';

// Cache for preloaded models
const preloadedModels = new Set();

// Preload a model
export const preloadModel = (modelPath) => {
  // 🚫 Skip fake / placeholder models
  if (
    !modelPath ||
    typeof modelPath !== 'string' ||
    modelPath.includes('example.com')
  ) {
    console.warn('Skipping preload for placeholder model:', modelPath);
    return;
  }

  if (!preloadedModels.has(modelPath)) {
    useGLTF.preload(modelPath);
    preloadedModels.add(modelPath);
    console.log(`Preloaded model: ${modelPath}`);
  }
};

// Preload multiple models
export const preloadModels = (modelPaths) => {
  modelPaths.forEach(preloadModel);
};

// Clear preloaded models (useful for cleanup)
export const clearPreloadedModels = () => {
  preloadedModels.clear();
};

// Get preloaded models count
export const getPreloadedModelsCount = () => {
  return preloadedModels.size;
};

// Check if a model is preloaded
export const isModelPreloaded = (modelPath) => {
  return preloadedModels.has(modelPath);
}; 