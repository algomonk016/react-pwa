const CACHE_NAME = 'shirorororo'

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll([
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/index.html',
        '/',
      ])
    })
  )
})