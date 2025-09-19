// Service Worker for True Reports MRI Scan Website
// Version 2.0 - Enhanced Cache Optimization

const CACHE_NAME = 'truereports-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const LONG_TERM_CACHE = 'longterm-v2';

// Cache lifetime configurations
const CACHE_LIFETIMES = {
  STATIC: 365 * 24 * 60 * 60 * 1000, // 1 year for static assets
  DYNAMIC: 7 * 24 * 60 * 60 * 1000,   // 1 week for dynamic content
  LONG_TERM: 30 * 24 * 60 * 60 * 1000 // 30 days for long-term assets
};

// Critical resources to cache immediately with long-term caching
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/critical.css',
  '/css/style.min.css',
  '/css/uicons-solid-rounded.min.css',
  '/css/font-display-optimization.css',
  '/css/bootstrap.min.css',
  '/css/style.css',
  '/css/responsive.css',
  '/js/jquery-3.6.4.min.js',
  '/js/bootstrap.bundle.min.js',
  '/js/main.js',
  '/images/logo.png',
  '/doctor.png',
  '/images/mri.png',
  '/images/discount.png',
  '/images/guarantee.png',
  '/img1.webp',
  '/img2.webp'
];

// Long-term cacheable assets (fonts, images, etc.)
const LONG_TERM_ASSETS = [
  '/css/fonts/',
  '/images/',
  '/fonts/'
];

// Install event - cache static assets with optimized strategy
self.addEventListener('install', event => {
  console.log('Service Worker: Installing with enhanced caching...');
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache long-term assets
      caches.open(LONG_TERM_CACHE).then(cache => {
        console.log('Service Worker: Preparing long-term cache');
        return Promise.resolve();
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Handle different types of requests with appropriate caching
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          // Check cache age for dynamic content
          if (response.headers.get('sw-cache-date')) {
            const cacheDate = new Date(response.headers.get('sw-cache-date'));
            const now = new Date();
            const age = now - cacheDate;
            
            // For dynamic content, check if cache is still valid
            if (age > CACHE_LIFETIMES.DYNAMIC && url.pathname.includes('api')) {
              // Cache expired, fetch fresh content
              return fetchAndCache(event.request);
            }
          }
          return response;
        }
        
        // Determine caching strategy based on request type
        if (isStaticAsset(event.request)) {
          return fetchAndCache(event.request, STATIC_CACHE);
        } else if (isLongTermAsset(event.request)) {
          return fetchAndCache(event.request, LONG_TERM_CACHE);
        } else {
          return fetchAndCache(event.request, DYNAMIC_CACHE);
        }
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Helper function to determine if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$/);
}

// Helper function to determine if request is for long-term asset
function isLongTermAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/fonts/') || 
         url.pathname.includes('/images/') ||
         url.pathname.includes('/css/fonts/');
}

// Helper function to fetch and cache with appropriate strategy
function fetchAndCache(request, cacheName = DYNAMIC_CACHE) {
  return fetch(request)
    .then(fetchResponse => {
      // Don't cache if not a valid response
      if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
        return fetchResponse;
      }
      
      // Clone the response
      const responseToCache = fetchResponse.clone();
      
      // Add cache timestamp header
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', new Date().toISOString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      // Cache the response
      caches.open(cacheName)
        .then(cache => {
          cache.put(request, cachedResponse);
        });
      
      return fetchResponse;
    });
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'form-submission') {
    event.waitUntil(
      // Handle offline form submissions
      console.log('Service Worker: Background sync for form submission')
    );
  }
});

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New MRI scan offers available!',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('True Reports', options)
  );
});
