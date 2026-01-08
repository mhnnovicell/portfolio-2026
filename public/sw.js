// Service Worker for caching third-party scripts
const CACHE_NAME = 'cookiebot-cache-v1';
const COOKIEBOT_URLS = [
  'https://consent.cookiebot.com/uc.js',
  /consentcdn\.cookiebot\.com\/.*\.js$/,
];

// Install event - pre-cache nothing, we'll cache on fetch
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (name) => name.startsWith('cookiebot-cache-') && name !== CACHE_NAME
          )
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - cache Cookiebot scripts with stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only intercept Cookiebot requests
  const isCookiebotRequest =
    url.hostname === 'consent.cookiebot.com' ||
    url.hostname === 'consentcdn.cookiebot.com';

  if (!isCookiebotRequest) {
    return; // Let the browser handle it
  }

  // Stale-while-revalidate strategy
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            // Cache the new response for 7 days
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse); // Fallback to cache on network error

        // Return cached response immediately, update cache in background
        return cachedResponse || fetchPromise;
      });
    })
  );
});
