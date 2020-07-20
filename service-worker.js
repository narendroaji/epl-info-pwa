const CACHE_NAME = "epl-infov0.1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/team.html",
    "/pages/teams.html",
    "/pages/standings.html",
    "/pages/matches.html",
    "/pages/favorite.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/moment.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/render.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/utility.js",
    "/js/index.js",
    "/js/team.js",
    "/push.js",
    "/manifest.json",
    "/package-lock.json",
    "/img/pl-logo.png",
    "/img/android-icon-192x192.png",
    "/img/apple-icon-57x57.png",
    "/img/apple-icon-60x60.png",
    "/img/apple-icon-72x72.png",
    "/img/apple-icon-76x76.png",
    "/img/apple-icon-114x114.png",
    "/img/apple-icon-120x120.png",
    "/img/apple-icon-144x144.png",
    "/img/apple-icon-152x152.png",
    "/img/apple-icon-180x180.png",
    "/img/favicon-16x16.png",
    "/img/favicon-32x32.png",
    "/img/favicon-96x96.png",
    "/img/icon-36x36.png",
    "/img/icon-48x48.png",
    "/img/icon-72x72.png",
    "/img/icon-96x96.png",
    "/img/icon-144x144.png",
    "/img/icon-192x192.png",
    "/img/icon-512x512.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    const BASE_URL = "https://api.football-data.org/v2";
    if (event.request.url.indexOf(BASE_URL) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                cache.put(event.request.url, response.clone());
                return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '/img/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});