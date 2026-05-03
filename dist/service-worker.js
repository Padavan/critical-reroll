const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  '192.png',
  '512.png',
  'app.css',
  'app.js',
  'critical-reroll.png',
  'i18n',
  "icon-d20s.svg",

  "i18n/en/app.json",
  "i18n/en/help.json",
  "i18n/en/settings.json",
  "i18n/en/critical-bludgeoning.dnd3.json",
  "i18n/en/critical-magic.dnd3.json",
  "i18n/en/critical-piercing.dnd3.json",
  "i18n/en/critical-slashing.dnd3.json",
  "i18n/en/fumble-magic.dnd3.json",
  "i18n/en/fumble-melee.dnd3.json",
  "i18n/en/fumble-natural.dnd3.json",
  "i18n/en/fumble-ranged.dnd3.json",
  "i18n/en/dnd3/critical-bludgeoning.json",
  "i18n/en/dnd3/critical-magic.json",
  "i18n/en/dnd3/critical-piercing.json",
  "i18n/en/dnd3/critical-slashing.json",
  "i18n/en/dnd3/fumble-magic.json",
  "i18n/en/dnd3/fumble-melee.json",
  "i18n/en/dnd3/fumble-natural.json",
  "i18n/en/dnd3/fumble-ranged.json",
  "i18n/en/dnd3/ruletips.json",
  "i18n/en/dnd5/critical-bludgeoning.json",
  "i18n/en/dnd5/critical-magic.json",
  "i18n/en/dnd5/critical-piercing.json",
  "i18n/en/dnd5/critical-slashing.json",
  "i18n/en/dnd5/fumble-magic.json",
  "i18n/en/dnd5/fumble-melee.json",
  "i18n/en/dnd5/fumble-natural.json",
  "i18n/en/dnd5/fumble-ranged.json",
  "i18n/en/dnd5/ruletips.json",
  "i18n/en/pfrpg/critical-magic.json",
  "i18n/en/pfrpg/critical-piercing.json",
  "i18n/en/pfrpg/critical-slashing.json",
  "i18n/en/pfrpg/critical-bludgeoning.json",
  "i18n/en/pfrpg/fumble-magic.json",
  "i18n/en/pfrpg/fumble-melee.json",
  "i18n/en/pfrpg/fumble-natural.json",
  "i18n/en/pfrpg/fumble-ranged.json",
  "i18n/en/pfrpg/ruletips.json",


  "i18n/es/app.json",
  "i18n/es/help.json",
  "i18n/es/settings.json",
  "i18n/es/critical-bludgeoning.dnd3.json",
  "i18n/es/critical-magic.dnd3.json",
  "i18n/es/critical-piercing.dnd3.json",
  "i18n/es/critical-slashing.dnd3.json",
  "i18n/es/fumble-magic.dnd3.json",
  "i18n/es/fumble-melee.dnd3.json",
  "i18n/es/fumble-natural.dnd3.json",
  "i18n/es/fumble-ranged.dnd3.json",
  "i18n/es/dnd3/critical-bludgeoning.json",
  "i18n/es/dnd3/critical-magic.json",
  "i18n/es/dnd3/critical-piercing.json",
  "i18n/es/dnd3/critical-slashing.json",
  "i18n/es/dnd3/fumble-magic.json",
  "i18n/es/dnd3/fumble-melee.json",
  "i18n/es/dnd3/fumble-natural.json",
  "i18n/es/dnd3/fumble-ranged.json",
  "i18n/es/dnd3/ruletips.json",
  "i18n/es/dnd5/critical-bludgeoning.json",
  "i18n/es/dnd5/critical-magic.json",
  "i18n/es/dnd5/critical-piercing.json",
  "i18n/es/dnd5/critical-slashing.json",
  "i18n/es/dnd5/fumble-magic.json",
  "i18n/es/dnd5/fumble-melee.json",
  "i18n/es/dnd5/fumble-natural.json",
  "i18n/es/dnd5/fumble-ranged.json",
  "i18n/es/dnd5/ruletips.json",
  "i18n/es/pfrpg/critical-magic.json",
  "i18n/es/pfrpg/critical-piercing.json",
  "i18n/es/pfrpg/critical-slashing.json",
  "i18n/es/pfrpg/critical-bludgeoning.json",
  "i18n/es/pfrpg/fumble-magic.json",
  "i18n/es/pfrpg/fumble-melee.json",
  "i18n/es/pfrpg/fumble-natural.json",
  "i18n/es/pfrpg/fumble-ranged.json",
  "i18n/es/pfrpg/ruletips.json",

  "manifest.json"
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});