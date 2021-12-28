const CACHE = "mensastischCache";
const filesToCache = [
    '/',
    '/css/materialize.css',
    '/js/indb.js'
];

self.addEventListener("install", async event => {
  // populate cache
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(filesToCache)));
});


self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;
          if (preloadResp) {
            return preloadResp;
          }
          const networkResp = await fetch(event.request);
          return networkResp;
        }
        catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(filesToCache);
          return cachedResp;
        }
      })()
    );
  }
});
