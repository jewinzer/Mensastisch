"use strict";

// import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

//import indexedDB script, initilialize indexedDB schema
importScripts('../js/dexie.min.js');

/*
//set up cache
const CACHE = "mensastischCache";

//define files to be cached
const filesToCache = [
    '/',
    '/css/materialize.css',
    '/js/script.js',
    'js/dexie.min.js',
    'js/manifest.json',
    'img/mensastisch-192.png',
    'img/mensastisch-512.png',
    'img/mensastisch.svg'
  ];

//populate cache on sw installation
self.addEventListener("install", async event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(filesToCache)));
});
*/

//finalize indexedDB creation on sw activation
self.addEventListener('activate', async event => {
    event.waitUntil(
        createDB()
    );
});
/*
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
);*/
//cache css, js resources, serve from cache if available, update cache from network
workbox.routing.registerRoute(
    new RegExp('http:\/\/localhost:3000\/.*'),
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
    /\.(?:png|jpg|jpeg|svg|html)$/,
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
        networkTimeoutSeconds: 3,
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

//inititaliaze Canteens Table in indb
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

//initialize user Table in indb
async function initUserStore() {
    db.userStore.put({
        id: 1,
        lastVisitedCanteen: '',
        favouriteCanteens: [],
        userDiet: '',
        userAllergies: [],
        userAdditives: [],
        plannedMeals: [],
        notify: false
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

//check Coords data in Canteens
function checkCoords(data) {
    if (data != null) {
        return data;
    } else return [0, 0];
};