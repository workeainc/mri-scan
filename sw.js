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
  '/css/bootstrap.min.css',
  '/css/font-display-optimization.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/performance-monitor.js',
  '/images/logo.webp',
  '/images/logo.png',
  '/doctor.webp',
  '/doctor.png',
  '/images/mri.png',
  '/images/discount.png',
  '/images/guarantee.png',
  '/img1.webp',
  '/img2.webp'
];

// Large CSS assets to cache on-demand only
const LARGE_CSS_ASSETS = [
  '/css/style.css',
  '/css/all.css',
  '/css/font-awesome.min.css',
  '/css/jquery.fancybox.css',
  '/css/swiper.min.css',
  '/css/swiper-bundle.min.css',
  '/css/slick.css',
  '/css/slick-theme.css',
  '/css/rs-spacing-min.css',
  '/css/owl.carousel.min.css',
  '/css/jquery-ui.min.css',
  '/css/animate.min.css',
  '/css/uicons-solid-rounded.min.css',
  '/css/style.ultra-min.css'
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
    caches.open(STATIC_CACHE).then(cache => {
      console.log('Service Worker: Caching static assets');
      // Cache only existing files to avoid errors
      const existingAssets = STATIC_ASSETS.filter(asset => {
        // Skip assets that might not exist
        return !asset.includes('logo.webp') && 
               !asset.includes('fa-solid-900.woff2') && 
               !asset.includes('fa-brands-400.woff2');
      });
      return cache.addAll(existingAssets).catch(err => {
        console.log('Service Worker: Some assets failed to cache', err);
        // Continue even if some assets fail
        return Promise.resolve();
      });
    })
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
  
  // Skip problematic requests that cause errors
  if (url.protocol === 'chrome-extension:' || 
      url.hostname === 'ipapi.co' ||
      url.hostname === 'www.googletagmanager.com') {
    return; // Skip these requests entirely
  }
  
  // Handle different types of requests with appropriate caching
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Fetch and cache with error handling
        return fetch(event.request)
          .then(fetchResponse => {
            // Don't cache if not a valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            // Clone the response
            const responseToCache = fetchResponse.clone();
            
            // Cache the response with error handling
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => {
                console.log('Service Worker: Cache put failed', err);
              });
            
            return fetchResponse;
          })
          .catch(err => {
            console.log('Service Worker: Fetch failed', err);
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            throw err;
          });
      })
      .catch(err => {
        console.log('Service Worker: Cache match failed', err);
        // Return offline page for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        throw err;
      })
  );
});

// Helper function to determine if request is for large CSS asset
function isLargeCSSAsset(request) {
  const url = new URL(request.url);
  return LARGE_CSS_ASSETS.some(asset => url.pathname.includes(asset));
}

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
