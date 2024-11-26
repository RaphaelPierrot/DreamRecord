const CACHE_NAME = "dreamrecord-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/index.js",
  "/assets/index.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/assets/index-BLA_cTkl.css",
  "/assets/index-C7UP8tpL.js",
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation et Gestion des Anciennes Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interception des Requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
