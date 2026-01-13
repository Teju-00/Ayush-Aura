import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, image, type = 'website' }) => {
  const location = useLocation();
  const baseUrl = 'https://ayush-aura.vercel.app';
  const url = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | Ayush Aura` : 'Ayush Aura - Discover AYUSH Herbal Plants';

    // Update or create meta tags
    const updateMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`) || 
                    document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description);
    }

    // OpenGraph tags
    updateMetaTag('og:title', title || 'Ayush Aura - Discover AYUSH Herbal Plants');
    updateMetaTag('og:type', type);
    updateMetaTag('og:url', url);
    
    if (image) {
      updateMetaTag('og:image', image);
    } else {
      updateMetaTag('og:image', `${baseUrl}/logo512.png`);
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || 'Ayush Aura');
    if (description) {
      updateMetaTag('twitter:description', description);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, image, type, url]);

  return null;
};

export default SEO;
