const CACHE = "pwa-cache";
const filesToCache = [
    '/',
    '/css/materialize.css'
];

self.addEventListener("install", async event => {
  // store offline.html to cache
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
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })()
    );
  }
});