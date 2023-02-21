const cacheName = 'my-pwa-cache';
const cacheAssets = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './images/unnamed.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
