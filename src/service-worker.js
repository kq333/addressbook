// Define the cache name
const cacheName = 'my-vue-app-cache-v1';

// List of assets to cache
const assetsToCache = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/addressbook/src/App.vue'
  // Add paths to other static assets like images, fonts, etc.
];

// Install event
self.addEventListener('install', event => {
  // Perform installation steps
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Opened cache');
        // Cache static assets
        return cache.addAll(assetsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response
            const responseToCache = response.clone();

            // Open the cache and add the response
            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old cache
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
////