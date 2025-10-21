/**
 * Service Worker for Berserk Tattoos
 * BMad Method Stage 6: Advanced Optimizations
 * 
 * Features:
 * - Offline support for critical pages
 * - Aggressive caching of images
 * - Network-first for HTML
 * - Cache-first for static assets
 * - Background sync ready
 */

const CACHE_VERSION = 'berserk-v1.0.0';
const CACHE_NAME = `berserk-tattoos-${CACHE_VERSION}`;

// Assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/artists.html',
  '/book.html',
  '/404.html',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/manifest.json'
];

// Cache-first resources (images, fonts, CSS, JS)
const CACHE_FIRST_PATTERNS = [
  /\/portfolio\//,
  /\/images\//,
  /\/fonts\//,
  /\.(?:jpg|jpeg|webp|png|gif|svg|ico)$/,
  /\.(?:woff|woff2|ttf|eot)$/,
  /\.(?:css|js)$/
];

// Network-first resources (HTML pages, API calls)
const NETWORK_FIRST_PATTERNS = [
  /\.html$/,
  /\/api\//
];

/**
 * Install Event - Precache critical assets
 */
self.addEventListener('install', event => {
  // Service Worker installing
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Precaching assets
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Installed successfully
        return self.skipWaiting();
      })
      .catch(error => {
        // Installation failed - handled silently
      })
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', event => {
  // Service Worker activating
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              // Delete old versions
              return cacheName.startsWith('berserk-') && cacheName !== CACHE_NAME;
            })
            .map(cacheName => {
              // Deleting old cache
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Activated successfully
        return self.clients.claim();
      })
  );
});

/**
 * Fetch Event - Implement caching strategies
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except fonts from Google)
  if (url.origin !== location.origin && !url.origin.includes('fonts.g')) {
    return;
  }
  
  // Determine caching strategy
  if (shouldUseCacheFirst(request)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (shouldUseNetworkFirst(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(networkFirstStrategy(request));
  }
});

/**
 * Check if request should use cache-first strategy
 */
function shouldUseCacheFirst(request) {
  const url = new URL(request.url);
  return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname));
}

/**
 * Check if request should use network-first strategy
 */
function shouldUseNetworkFirst(request) {
  const url = new URL(request.url);
  return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname));
}

/**
 * Cache-First Strategy
 * Try cache first, fallback to network
 * Good for: Images, fonts, static assets
 */
async function cacheFirstStrategy(request) {
  try {
    // Check cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Cache hit
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    // Cache miss, fetching
    const networkResponse = await fetch(request);
    
    // Cache the response for future use
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Cache-first failed
    // Could return a fallback image here
    throw error;
  }
}

/**
 * Network-First Strategy
 * Try network first, fallback to cache
 * Good for: HTML pages, API calls
 */
async function networkFirstStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, trying cache
    
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Serving from cache
      return cachedResponse;
    }
    
    // Both failed, return offline page
    if (request.destination === 'document') {
      const offlineResponse = await caches.match('/404.html');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

/**
 * Background Sync Event (for future form submissions)
 */
self.addEventListener('sync', event => {
  if (event.tag === 'booking-form-sync') {
    event.waitUntil(syncBookingForm());
  }
});

/**
 * Sync booking form submissions when back online
 */
async function syncBookingForm() {
  // Syncing booking forms
  // Future implementation for offline form submissions
  // Would retrieve submissions from IndexedDB and POST to server
}

/**
 * Push Notification Event (for future notifications)
 */
self.addEventListener('push', event => {
  // Push notification received
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Berserk Tattoos',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/android-chrome-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon-32x32.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Berserk Tattoos', options)
  );
});

/**
 * Notification Click Event
 */
self.addEventListener('notificationclick', event => {
  // Notification clicked
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

/**
 * Message Event (for cache control from main thread)
 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(event.data.urls))
    );
  }
});

// Service Worker loaded and ready

