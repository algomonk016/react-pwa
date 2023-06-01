const CACHE_NAME = 'shirorororo';

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/index.html',
        '/',
        '/static/css/main.css', // Add CSS files
        '/static/images/logo.png', // Add image files
        '/static/fonts/font.woff', // Add font files
      ]);
    })
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});