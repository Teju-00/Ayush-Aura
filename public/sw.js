const CACHE_NAME = 'ayush-herbal-plants-v1';
const STATIC_CACHE = 'static-v1';
const IMAGE_CACHE = 'images-v1';
const MODEL_CACHE = 'models-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

const ALLOWED_CACHES = [CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, MODEL_CACHE];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  const request = event.request;

  // HTML navigation requests: network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('/', copy));
          return response;
        })
        .catch(() => caches.match('/') || caches.match('/index.html'))
    );
    return;
  }

  // JS and CSS: stale-while-revalidate
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Images: stale-while-revalidate
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // GLB/GLTF models: stale-while-revalidate
  const url = new URL(request.url);
  if (url.pathname.endsWith('.glb') || url.pathname.endsWith('.gltf')) {
    event.respondWith(staleWhileRevalidate(request, MODEL_CACHE));
    return;
  }

  // Default: try cache, then network
  event.respondWith(
    caches.match(request).then(response => response || fetch(request))
  );
});

function staleWhileRevalidate(request, cacheName) {
  return caches.open(cacheName).then(cache =>
    cache.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => cachedResponse);
      return cachedResponse || fetchPromise;
    })
  );
}

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!ALLOWED_CACHES.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Enable manual skipWaiting from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});