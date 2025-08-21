import { useGLTF } from '@react-three/drei';

// Cache for preloaded models
const preloadedModels = new Set();

// Preload a model
export const preloadModel = (modelPath) => {
  if (!preloadedModels.has(modelPath)) {
    try {
      useGLTF.preload(modelPath);
      preloadedModels.add(modelPath);
      console.log(`Preloaded model: ${modelPath}`);
    } catch (error) {
      console.warn(`Failed to preload model: ${modelPath}`, error);
    }
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