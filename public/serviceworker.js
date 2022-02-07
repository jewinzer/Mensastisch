"use strict";

// import Workbox, Dexie.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
importScripts('../js/dexie.min.js');

//define offlinefallback resources
const pageFallback = '/offline';

//finalize indexedDB creation on sw activation
self.addEventListener('activate', async event => {
    event.waitUntil(
        createDB()
    );
});


self.addEventListener('install', event => {
  const files = [pageFallback];
  event.waitUntil(self.caches.open('workbox-offline-fallbacks')
    .then(cache => cache.addAll(files)));
});

const handler = async (options) => {
    const cache = await self.caches.open('workbox-offline-fallbacks');
    if(options.request.destination === 'document') {
        return (await cache.match(pageFallback)) || Response.error();
    }
    return Response.error();
};





//register click events for scheduled notifications
self.addEventListener('notificationclick', event => {
    if (event.action === 'close') {
      event.notification.close();
    } else {
      self.clients.openWindow('/');
    }
});

// precache files vital for offline use
workbox.precaching.precacheAndRoute([
    {url: '/', revision: null },
    {url: '/canteen/search', revision: null },
    {url: '/canteen/locate', revision: null },
    {url: '/calendar', revision: null },
    {url: '/diet', revision: null },
    {url: '/allergies', revision: null },
    {url: '/additives', revision: null },
    {url: '/preferences', revision: null },
    {url: '/css/materialize.css', revision: null },
    {url: '/img/sprite.svg', revision: null },
    {url: '/js/dexie.min.js', revision: null }
    // ... other entries ...
  ]);

workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkOnly()
  );

workbox.routing.setCatchHandler(handler);

//cache css, js resources, serve from cache if available, update cache from network
workbox.routing.registerRoute(
    /\.(?:css|js|json)$/,
    new workbox.strategies.StaleWhileRevalidate({
      "cacheName": "static-resources",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        })
      ]
    })
);


//cache images, cache first, if !cache, fill cache, then serve from cache
workbox.routing.registerRoute(
    /\.(?:png|svg)$/,
    new workbox.strategies.CacheFirst({
        "cacheName": "images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            }),
        ],
    })
);


//cache external api requests: network first
workbox.routing.registerRoute(
    new RegExp('https:\/\/openmensa.org\/api\/v2\/canteens\/.*'),
    new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 2,
        cacheName: 'api-requests',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 2000,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
            }),
        ],
    })
);

/*
//manage fetch requests online/offline
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
*/

//populate indexedDB, finalize indexedDB creation
async function createDB() {
    await initCanteensStore();
    await initUserStore();
};


//initialiaze canteens table in indb
async function initCanteensStore() {
    getCanteens().then(canteens => {
        canteens.forEach(canteen => {
            db.canteensStore.put({
                id: canteen.id,
                name: canteen.name,
                city: canteen.city,
                address: canteen.address,
                coordinates: checkCoords(canteen.coordinates),
                distance: 999
            });
        });
    }).then(() => {
        return db.canteensStore;
    }).catch(err => {
        console.warn(`Oops... ${err}`);
    });
};


//initialize user table in indb
async function initUserStore() {
    db.userStore.put({
        id: 1,
        lastVisitedCanteen: '',
        favouriteCanteens: [],
        userDiet: [],
        userAllergies: [],
        userAdditives: [],
        plannedMeals: [],
        userRoles: [],
        notifyUser: false
    }).then(() => {
        return db.userStore;
    }).catch(err => {
        console.warn(`Oops... ${err}`);
    });
};


//return JSON of all listed canteens
async function getCanteens() {
    const url = 'https://openmensa.org/api/v2/canteens';
    const response = await fetch(url);
    const canteens = await response.json();
    return canteens;
};


//check coords data in canteens
function checkCoords(data) {
    if (data != null) {
        return data;
    } else return [0, 0];
};