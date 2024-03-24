const cacheName = 'my-vue-app-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/addressbook/src/App.vue'
];

self.addEventListener('install', event => {

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Opened cache');

        return cache.addAll(assetsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {

        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {

            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});