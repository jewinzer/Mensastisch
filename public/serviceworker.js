//imports indexedDB script, initilializes indexedDB schema
importScripts('../js/dexie.min.js');

//set up cache, define files to cach
const CACHE = "mensastischCache";
const filesToCache = [
    '/',
    '/css/materialize.css'
  ];

// populate cache on installing sw
self.addEventListener("install", async event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(filesToCache)));
  console.log('sw:cache populated');
});

//complete indexedDB creation on sw activation
self.addEventListener('activate', function(event) {
  event.waitUntil(
    createDB()
  );
});

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

// populate indexedDB, finalize indexedDB creation
async function createDB(){
  getCanteens().then(canteens =>{
      canteens.forEach(canteen =>{
          db.canteensStore.put({
              id:canteen.id,
              name: canteen.name,
              city: canteen.city,
              address: canteen.address,
              coordinates: checkCoords(canteen.coordinates),
              distance: 999
          });
      })
  }).then(() => {
          return db.canteensStore;
  }).catch(err => {
          console.warn("Oops... " + err);
  });
};

//returns JSON of all listed canteens
async function getCanteens() {
  const url = 'https://openmensa.org/api/v2/canteens';
  const response = await fetch(url);
  const canteens = await response.json();
  return canteens;
};

//checkCoords data in Canteens
function checkCoords(data){
  if (data != null){
      return data;
  } else return [0,0];
}
