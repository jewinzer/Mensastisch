"use strict";

// import Workbox, Dexie.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
importScripts('../js/dexie.min.js');


//define offline fallback pages
const pageFallback = '/offline';


//populate cache on sw installation
self.addEventListener('install', event => {
  const files = [pageFallback];
  event.waitUntil(self.caches.open('workbox-offline-fallbacks')
    .then(cache => cache.addAll(files)));
});


//finalize indexedDB creation on sw activation
self.addEventListener('activate', event => {
    event.waitUntil(
        createDB()
    );
});


// precache files vital for offline use
workbox.precaching.precacheAndRoute([
    {url: '/', revision: null },
    {url: '/canteen/search', revision: null },
    {url: '/calendar', revision: null },
    {url: '/diet', revision: null },
    {url: '/diet/allergies', revision: null },
    {url: '/diet/additives', revision: null },
    {url: '/preferences', revision: null }
  ]);



// default routing  
workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst()
    );



// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);



// Cache the Google Font font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
            })
        ]
    })
);



//cache css, js resources, serve from cache if available, update cache from network
workbox.routing.registerRoute(
    /\.(?:css|js|json)$/,
    new workbox.strategies.StaleWhileRevalidate({
      'cacheName': 'static-resources',
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
    /\.(?:png|jpg|svg)$/,
    new workbox.strategies.CacheFirst({
        'cacheName': 'images',
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
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
            }),
        ],
    })
);



//offline handler
const offlineHandler = async (options) => {
    const cache = await self.caches.open('workbox-offline-fallbacks');
    if(options.request.destination === 'document') {
        return (await cache.match(pageFallback)) || Response.error();
    }
    return Response.error();
};



//offline fallback routing
workbox.routing.setCatchHandler(offlineHandler);



//register click events for scheduled notifications
self.addEventListener('notificationclick', event => {
    if (event.action === 'close') {
      event.notification.close();
    } else {
      self.clients.openWindow('/');
    }
});


//populate indexedDB, finalize indexedDB creation
async function createDB() {
    await initCanteensStore();
    await initUserStore();
};


//initialize canteens table in indb
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
        userRoles: [{de: "Studierende", en: "students"}],
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