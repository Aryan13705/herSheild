const CACHE_NAME = 'hershield-offline-cache-v1';
const MAPBOX_CACHE = 'mapbox-tiles-cache-v1';

// Assets to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/dashboard',
  '/map',
  '/manifest.json',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== MAPBOX_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Mapbox Tile & API Caching Strategy (Cache First, falling back to Network)
  if (
    url.hostname.includes('api.mapbox.com') ||
    url.hostname.includes('tiles.mapbox.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          // Only cache successful GET responses
          if (event.request.method === 'GET' && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(MAPBOX_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If offline and not in cache, let it fail gracefully
          return new Response(null, { status: 404, statusText: 'Offline' });
        });
      })
    );
    return;
  }

  // Next.js static assets and pages (Network First, falling back to Cache)
  if (event.request.mode === 'navigate' || url.hostname === self.location.hostname) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
});
