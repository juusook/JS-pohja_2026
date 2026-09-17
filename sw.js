
const cacheName = 'hello-pwa';
const filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
const cacheResources = async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(filesToCache);
};

self.addEventListener('install', (e) => {
  e.waitUntil(cacheResources());
});


/* Serve cached content when offline */
const handleFetch = async (request) => {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
};

self.addEventListener('fetch', (e) => {
  e.respondWith(handleFetch(e.request));
});
