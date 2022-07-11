Mensastisch is a Node.js-based Progressive Web App (PWA) with offline-functionality.

Data:
- Open Mensa API

Technologies used include:
- Routing: Express
- Templates: EJS
- SCSS: Materialize
– Service Worker: Workbox
- IndexedDB: Dexie.js
- Notification Triggers API
– Geolocation API
– Deployment: Heroku

To schedule our notifications, we rely on the (experimental) Notification Triggers API, which can be enabled in Chrome's
#enable-experimental-web-platform-features flag via about://flags.

To see the Mensastisch App in action, visit https://mensastisch05.herokuapp.com/