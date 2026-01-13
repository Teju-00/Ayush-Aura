const CACHE_NAME = 'ayush-herbal-plants-v2';
const STATIC_CACHE = 'static-v2';
const IMAGE_CACHE = 'images-v2';
const MODEL_CACHE = 'models-v2';
const OFFLINE_CACHE = 'offline-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

const ALLOWED_CACHES = [CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, MODEL_CACHE, OFFLINE_CACHE];

// Install event - cache static assets and offline page
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
      caches.open(OFFLINE_CACHE).then(cache => 
        cache.addAll([
          '/offline.html',
          '/static/css/main.css',
          '/static/js/bundle.js'
        ])
      )
    ])
  );
  self.skipWaiting();
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // HTML navigation requests: network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          // Return offline page if navigation fails
          return caches.match('/offline.html') || caches.match('/');
        })
    );
    return;
  }

  // JS and CSS: stale-while-revalidate
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Images: cache-first with network fallback
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // GLB/GLTF models: cache-first with network fallback
  if (url.pathname.endsWith('.glb') || url.pathname.endsWith('.gltf')) {
    event.respondWith(cacheFirst(request, MODEL_CACHE));
    return;
  }

  // API calls: network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  // Default: try cache, then network
  event.respondWith(
    caches.match(request).then(response => response || fetch(request))
  );
});

// Cache-first strategy for static assets
function cacheFirst(request, cacheName) {
  return caches.open(cacheName).then(cache =>
    cache.match(request).then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(networkResponse => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      });
    })
  );
}

// Network-first strategy for dynamic content
function networkFirst(request, cacheName) {
  return fetch(request)
    .then(response => {
      const copy = response.clone();
      caches.open(cacheName).then(cache => cache.put(request, copy));
      return response;
    })
    .catch(() => caches.match(request));
}

// Stale-while-revalidate strategy for scripts/styles
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

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle any background sync tasks
  return Promise.resolve();
}